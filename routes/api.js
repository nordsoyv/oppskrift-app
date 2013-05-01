'use strict';
/* global exports,require */

var db = require('../db');
var winston = require('winston');


// GET

exports.posts = function (req, res) {
  winston.debug("API-Posts:: Looking for all posts ");
  db.getAllPosts(function(posts){
      winston.debug("API-Posts:: Found " + posts.length);
      res.json(posts);
  });
};

exports.getPost = function (req, res) {
  var id = req.params.id, foundPost;
  winston.debug("API-GetPost:: Looking for post " + id);
    foundPost = db.getPost(id, function(foundPost){
        //winston.debug("API-GetPost:: Found post " + foundPost._id);
        res.json(foundPost);
    });
};

// POST
exports.addPost = function (req, res) {
  var savedPost = db.addPost(req.body);
  winston.debug("API-AddPost:: Adding post " + req.body.title);
  res.json(savedPost);
};

// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;
  winston.debug("API-EditPost:: Looking for post " + id);
  db.editPost(req.body, function(result){
      res.json(result);
  });
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;
  winston.debug("API-DeletePost:: Looking for post " + id);
  try{
    db.deletePost(id);
    res.json(true);
  }catch(e){
    winston.debug(e);
    res.json(false);
  }
};