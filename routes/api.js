'use strict';
/* global exports,require */

var db = require('../db');
var winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { level : "info"  });

// GET

exports.oppskrifter = function (req, res) {
    winston.debug("API-Posts:: Looking for all posts ");
    db.getAllOppskrifter(function (oppskrifter) {
        winston.debug("API-Posts:: Found " + oppskrifter.length);
        res.json(oppskrifter);
    });
};

exports.getOppskrift = function (req, res) {
    var id = req.params.id;
    winston.debug("API-GetPost:: Looking for post " + id);
    db.getOppskrift(id, function (oppskrift) {
        res.json(oppskrift);
    });
};

// POST
exports.addOppskrift = function (req, res) {
    db.addOppskrift(req.body, function (success, oppskrift) {
        if (success)
            res.json(oppskrift);
        else
            res.json(false);

    });


};

// PUT
exports.updateOppskrift = function (req, res) {
    var id = req.params.id;
    winston.debug("API-EditPost:: Looking for post " + id);
    db.updateOppskrift(req.body, function (result) {
        res.json(result);
    });
};

// DELETE
exports.deleteOppskrift = function (req, res) {
    var id = req.params.id;
    winston.debug("API-DeletePost:: Looking for post " + id);
    db.deleteOppskrift(id, function(success){
        if(success)
            res.json(true);
        else
            res.json(false);
    });
};