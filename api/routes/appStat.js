var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var statSchema = new Schema({
  id : Number,
  UpdatedCount : Number,
  StatData: 'Mixed',
});

var Stat = mongoose.model('AppStat', statSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/', function (req, res) {
  Stat.find({id:1},function(err, data){
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
    StatData:req.body
  };
  Stat.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({"count" : result.UpdatedCount || 0});
    }
  });
});




module.exports = router;
