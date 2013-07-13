"use strict";
/*globals require, exports */
var winston = require('winston');
var MongoClient = require('mongodb').MongoClient;
var oppskrifterDb,
    oppskrifterCollection,
    countersCollection,
    userCollection;

MongoClient.connect("mongodb://localhost:27017/oppskrifter", function (err, db) {
    if (!err) {
        winston.info("Connected to MongoDB")
    }

    oppskrifterDb = db;

    db.createCollection("oppskrifter", function (err, collection) {
        if (!err) {
            winston.info("Found oppskrifter collection")
        }
        oppskrifterCollection = collection;
    });

    db.createCollection("counters", function(err, collection){
        function checkGlobalSequnceExists(collection) {
            collection.findOne({_id : "global"}, function(err, globalSeq){
                if(globalSeq == null){
                    winston.info("Global sequence missing");
                    var seq = { _id:"global", seq : 1  };
                    collection.insert(seq, function(err,seqObj){
                        if(!err){
                            winston.info("Global sequence created");
                        }
                    });
                }
            });
        }
        if (!err) {
            winston.info("Found counters collection")
        }
        countersCollection = collection;

        checkGlobalSequnceExists(countersCollection);
    });

    db.createCollection("users", function(err, collection){
        if (!err) {
            winston.info("Found users collection");
        }
        userCollection = collection;
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

exports.addUser = function(userInfo, callback){
    getNextGlobalId(function(seq){
        userInfo._id = seq;
        userCollection.insert(userInfo, function(err, dbUser){
            if(err){
                winston.error("Could not create user " + userInfo.email);
                callback(false, null);
                return;
            }
            callback(true,dbUser);
        });
    });
};

exports.addOppskrift = function (oppskrift, callback) {
    getNextGlobalId(function(seq){
        oppskrift._id  = seq;
        oppskrifterCollection.insert(  oppskrift, function(err, dbOppskrift){
            if(err){
                winston.error("Could not create oppskrift " + oppskrift._id);
                callback(false, null);
                return;
            }
            callback(true, dbOppskrift);
        });
    });
};

exports.getOppskrift = function (idToFind, callback) {
    oppskrifterCollection.findOne({_id : parseInt(idToFind)}, function(err, dbOppskrift){
        if(err){
           winston.error(err);
        }
        callback(dbOppskrift);
    });
};

exports.deleteOppskrift = function (id, callback) {
    winston.debug("db.deletePost:: Looking for oppskrift " + id);
    oppskrifterCollection.remove( {_id : parseInt(id)}, function(err, numRemoved){
        if(err){
            winston.error(err);
            callback(false);
            return;
        }
        callback(true);
    });

};

exports.updateOppskrift = function (oppskrift, callback) {
    oppskrifterCollection.save(oppskrift, {safe:true}, function (err, numUpdatet){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        if(numUpdatet === 1){
            //update
            callback(true);
            return;
        }
        callback(true);
    })
};

exports.getAllOppskrifter = function (callback) {
    var oppskrifter = [];
    oppskrifterCollection.find({}).toArray(function (err, dbOppskrifter) {
        dbOppskrifter.forEach(function (item) {
            oppskrifter.push(item);
        });
        callback(oppskrifter);
    });
};
