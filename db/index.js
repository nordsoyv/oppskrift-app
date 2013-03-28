"use strict";
/*globals require, exports */
var winston = require('winston');


// initialize our faux database
var currentId = 0, posts = [];

function toStringPost(post){
  var string= "{\n";
  string += "id: " + post.id + "\n";
  string += "title: " + post.title + "\n";
  string += "text: " + post.text + "\n}";
  return string;
}

function findPost(id){
  winston.debug("db.findPost:: Looking for post " + id);
  for (var i = posts.length - 1; i >= 0; i--) {
    if(posts[i].id == id){
      //winston.debug("db.findPost:: Found post " + id);
      //winston.debug(toStringPost(posts[i]));
      return posts[i];
    }
  }
  throw new Error("Post " + id + "not found");
}

function findPositionForPost(id){
  winston.debug("db.findPositionForPost:: Looking for post " + id);
  for (var i = posts.length - 1; i >= 0; i--) {
    if(posts[i].id == id){
      return i;
    }
  }
  throw new Error("Post " + id + "not found");
}

 exports.addPost = function(title,text, steps){
  var currId = currentId++;
  var post = {
    id : currId,
    title : title,
    text : text,
    steps :  steps
  };
  posts.push(post);
  return post;
};

exports.getPost = function(id){
  return findPost(id);
};

exports.deletePost = function(id){
  winston.debug("db.deletePost:: Looking for post "+ id);
  try{
    var pos = findPositionForPost(id);
    winston.debug("db.deletePost:: Found post "+ id + " at position "+ pos);
    posts.splice(pos,1);
  }catch(e){
    winston.debug(e);
    throw e;
  }
};

 exports.editPost = function(id, newTitle, newText, steps){
  var post = findPost(id);
  post.title = newTitle;
  post.text = newText;
  post.steps =  steps;
  return post;
};

exports.getAllPosts = function(){
  var returnPosts = [];
  posts.forEach(function (post, i) {
    returnPosts.push({
      id: post.id,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  return returnPosts;
};

//base data
exports.addPost("Lorem ipsum","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." , ["nr1","nr2"]);
exports.addPost("Sed egestas", "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus.", ["nr3","nr4"]);
