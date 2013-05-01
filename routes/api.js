'use strict';
/* global exports,require */

var db = require('../db');
var winston = require('winston');


// GET

exports.posts = function (req, res) {
    winston.debug("API-Posts:: Looking for all posts ");
    db.getAllOppskrifter(function (oppskrifter) {
        winston.debug("API-Posts:: Found " + oppskrifter.length);
        res.json(oppskrifter);
    });
};

exports.getPost = function (req, res) {
    var id = req.params.id;
    winston.debug("API-GetPost:: Looking for post " + id);
    db.getOppskrift(id, function (oppskrift) {
        res.json(oppskrift);
    });
};

// POST
exports.addPost = function (req, res) {
    db.addOppskrift(req.body, function (success, oppskrift) {
        if (success)
            res.json(oppskrift);
        else
            res.json(false);

    });


};

// PUT
exports.editPost = function (req, res) {
    var id = req.params.id;
    winston.debug("API-EditPost:: Looking for post " + id);
    db.updateOppskrift(req.body, function (result) {
        res.json(result);
    });
};

// DELETE
exports.deletePost = function (req, res) {
    var id = req.params.id;
    winston.debug("API-DeletePost:: Looking for post " + id);
    db.deleteOppskrift(id, function(success){
        if(success)
            res.json(true);
        else
            res.json(false);
    });
};