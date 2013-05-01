'use strict';
/* global exports,require */

var db = require('../db');
var winston = require('winston');


// GET

exports.posts = function (req, res) {
    winston.debug("API-Posts:: Looking for all posts ");
    db.getAllPosts(function (posts) {
        winston.debug("API-Posts:: Found " + posts.length);
        res.json(posts);
    });
};

exports.getPost = function (req, res) {
    var id = req.params.id;
    winston.debug("API-GetPost:: Looking for post " + id);
    db.getPost(id, function (post) {
        res.json(post);
    });
};

// POST
exports.addPost = function (req, res) {
    db.addPost(req.body, function (success, post) {
        if (success)
            res.json(post);
        else
            res.json(false);

    });


};

// PUT
exports.editPost = function (req, res) {
    var id = req.params.id;
    winston.debug("API-EditPost:: Looking for post " + id);
    db.editPost(req.body, function (result) {
        res.json(result);
    });
};

// DELETE
exports.deletePost = function (req, res) {
    var id = req.params.id;
    winston.debug("API-DeletePost:: Looking for post " + id);
    db.deletePost(id, function(success){
        if(success)
            res.json(true);
        else
            res.json(false);
    });
};