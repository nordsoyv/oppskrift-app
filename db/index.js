"use strict";
/*globals require, exports */
var winston = require('winston');
var MongoClient = require('mongodb').MongoClient;
var oppskrifterDb,
    oppskrifterCollection,
    countersCollection;

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

    db.createCollection("counters", function(err, collection){
        if (!err) {
            console.log("Found counters collection");
        }
        countersCollection = collection;
    });

});


function getNextSequence(name, callback){
    countersCollection.findAndModify( {_id:name}, [], { $inc: { seq: 1 } } , function(err, doc){
        callback(doc.seq)
    });
}

function getNextGlobalId(callback){
    return getNextSequence("global",callback);
}


exports.addPost = function (post, callback) {
    getNextGlobalId(function(seq){
        post._id  = seq;
        oppskrifterCollection.insert(  post, function(err, doc){
            if(err){
                console.log(err);
                callback(false, null);
                return;
            }
            callback(true, doc);
        });
    });
};

exports.getPost = function (idToFind, callback) {
    oppskrifterCollection.findOne({_id : parseInt(idToFind)}, function(err, doc){
        if(err){
           console.log(err);
        }
        callback(doc);
    });
};

exports.deletePost = function (id, callback) {
    winston.debug("db.deletePost:: Looking for post " + id);
    oppskrifterCollection.remove( {_id : parseInt(id)}, function(err, doc){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        callback(true);
    });

};

exports.editPost = function (post, callback) {
    oppskrifterCollection.save(post, {safe:true}, function (err, doc){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        if(doc === 1){
            //update
            callback(true);
            return;
        }
        callback(true);
    })
};

exports.getAllPosts = function (callback) {
    var posts = [];
    oppskrifterCollection.find({}).toArray(function (err, results) {
        results.forEach(function (item) {
            posts.push(item);
        });
        callback(posts);
    });
};
