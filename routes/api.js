'use strict';
/* global exports,log,console */

//var log = require('winston');

// initialize our faux database
var db = function() {
  var self = this, currentId = 0, posts = [];

  function findPost(id){
    console.log("db.findPost:: Looking for post " + id);
    for (var i = posts.length - 1; i >= 0; i--) {
      if(posts[i].id == id){
        console.log("db.findPost:: Found post " + id);
        console.log(posts[i]);
        return posts[i];
      }
    }
    throw new Error("Post " + id + "not found");
  }

  function findPositionForPost(id){
    console.log("db.findPositionForPost:: Looking for post " + id);
    posts.forEach( function(post, i ){
      if( post.id == id )
        return i;
    });
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
    var pos = findPositionForPost(id);
    posts.splice(pos,1);
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
  console.log("API-GetPost:: Looking for post " + id);
  try{
    foundPost = db.getPost(id);
    console.log("API-GetPost:: Found post " + id);
    console.log(foundPost);
    res.json({
      post: foundPost
    });
  }catch(e){
    console.log(e);
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
    console.log(e);
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
    res.json(false);
  }
};