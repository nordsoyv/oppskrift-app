'use strict';
/* global exports,require */

var db = require('../db');
var winston = require('winston');


// GET

exports.posts = function (req, res) {
  var posts = db.getAllPosts();
  res.json({
    posts: posts
  });
};

exports.getPost = function (req, res) {
  var id = req.params.id, foundPost;
  winston.debug("API-GetPost:: Looking for post " + id);
  try{
    foundPost = db.getPost(id);
    winston.debug("API-GetPost:: Found post " + id);
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