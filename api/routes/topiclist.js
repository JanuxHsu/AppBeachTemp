var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var topicSchema = new Schema({
  id : Number,
  UpdatedCount : Number,
  TopicData: 'Mixed',
});

var Topic = mongoose.model('Topic', topicSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/', function (req, res) {
  Topic.find({id:1},function(err, data){
    if(!err){
      res.json(data);
    }
  });
});

router.post('/update', function (req, res) {
  var query = {id: 1};
  var options = {
    new: false,
    upsert: true
  };
  var data = {
    $set: {
      id:1
    },
    $inc: {
      UpdatedCount: 1
    },
    TopicData:req.body
  };
  Topic.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({"count" : result.UpdatedCount || 0});
    }
  });
});




module.exports = router;
