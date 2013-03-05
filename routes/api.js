'use strict';
/* global exports,require */

var winston = require('winston');

// initialize our faux database
var db = function() {
  var self = this, currentId = 0, posts = [];

  function findPost(id){
    winston.debug("db.findPost:: Looking for post " + id);
    for (var i = posts.length - 1; i >= 0; i--) {
      if(posts[i].id == id){
        winston.debug("db.findPost:: Found post " + id);
        winston.debug(posts[i]);
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

   function addPost(title,text){
    var currId = currentId++;
    var post = {
      id : currId,
      title : title,
      text : text
    };
    posts.push(post);
    return post;
  }

  function getPost(id){
    return findPost(id);
  }

  function deletePost(id){
    winston.debug("db.deletePost:: Looking for post "+ id);
    try{
      var pos = findPositionForPost(id);
      winston.debug("db.deletePost:: Found post "+ id + " at position "+ pos);
      posts.splice(pos,1);
    }catch(e){
      winston.debug(e);
      throw e;
    }
  }

   function editPost(id, newTitle, newText){
    var post = findPost(id);
    post.title = newTitle;
    post.text = newText;
    return post;
  }

  function getAllPosts(){
    var returnPosts = [];
    posts.forEach(function (post, i) {
      returnPosts.push({
        id: post.id,
        title: post.title,
        text: post.text.substr(0, 50) + '...'
      });
    });
    return returnPosts;
  }

  //base data
  addPost("Lorem ipsum","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." );
  addPost("Sed egestas", "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus.");

  return {
    addPost : addPost,
    getPost : getPost,
    editPost : editPost,
    deletePost : deletePost,
    getAllPosts : getAllPosts
  };

}();

// GET

exports.posts = function (req, res) {
  var posts = db.getAllPosts();
  res.json({
    posts: posts
  });
};

exports.post = function (req, res) {
  var id = req.params.id, foundPost;
  winston.debug("API-GetPost:: Looking for post " + id);
  try{
    foundPost = db.getPost(id);
    winston.debug("API-GetPost:: Found post " + id);
    winston.debug(foundPost);
    res.json({
      post: foundPost
    });
  }catch(e){
    winston.debug(e);
    res.json(false);
  }
};

// POST
exports.addPost = function (req, res) {
  var savedPost = db.addPost(req.body.title, req.body.text);
  res.json(savedPost);
};

// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;
  try{
    db.editPost(id, req.body.title, req.body.text);
    res.json(true);
  }catch(e){
    winston.debug(e);
    res.json(false);
  }
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;
  try{
    db.deletePost(id);
    res.json(true);
  }catch(e){
    winston.debug(e);
    res.json(false);
  }
};