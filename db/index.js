"use strict";
/*globals require, exports */
var winston = require('winston');
var MongoClient = require('mongodb').MongoClient;
var oppskrifterDb,
    oppskrifterCollection;

MongoClient.connect("mongodb://localhost:27017/oppskrifter", function (err, db) {
    if (!err) {
        console.log("We are connected");
    }

    oppskrifterDb = db;

    db.createCollection("oppskrifter", function (err, collection) {
        if (!err) {
            console.log("Found oppskrifter collection");
        }
        oppskrifterCollection = collection;
    });

});


// initialize our faux database
var currentId = 0, posts = [];

function toStringPost(post) {
    var string = "{\n";
    string += "id: " + post._id + "\n";
    string += "title: " + post.title + "\n";
    string += "text: " + post.text + "\n}";
    return string;
}

function findPost(id) {
    winston.debug("db.findPost:: Looking for post " + id);
    for (var i = posts.length - 1; i >= 0; i--) {
        if (posts[i].id == id) {
            //winston.debug("db.findPost:: Found post " + id);
            //winston.debug(toStringPost(posts[i]));
            return posts[i];
        }
    }
    throw new Error("Post " + id + "not found");
}

function findPositionForPost(id) {
    winston.debug("db.findPositionForPost:: Looking for post " + id);
    for (var i = posts.length - 1; i >= 0; i--) {
        if (posts[i].id == id) {
            return i;
        }
    }
    throw new Error("Post " + id + "not found");
}

exports.addPost = function (post) {
    post.id = currentId++;
    posts.push(post);
    return post;
};

exports.getPost = function (id) {
    return findPost(id);
};

exports.deletePost = function (id) {
    winston.debug("db.deletePost:: Looking for post " + id);
    try {
        var pos = findPositionForPost(id);
        winston.debug("db.deletePost:: Found post " + id + " at position " + pos);
        posts.splice(pos, 1);
    } catch (e) {
        winston.debug(e);
        throw e;
    }
};

exports.editPost = function (id, post) {
    var pos = findPositionForPost(id);
    posts[pos] = post;
    return posts[pos];
};

//exports.getAllPosts = function(){
//  var returnPosts = [];
//  posts.forEach(function (post, i) {
//    returnPosts.push({
//      id: post.id,
//      title: post.title,
//      text: post.description.substr(0, 50) + '...'
//    });
//  });
//  return returnPosts;
//};

exports.getAllPosts = function (callback) {
    var posts = [];
    oppskrifterCollection.find({}).toArray(function (err, results) {
        results.forEach(function (item) {
            posts.push(item);
        });
        callback(posts);
    });
};
