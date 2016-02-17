var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var statSchema = new Schema({
  id : Number,
  updatedCount : Number,
  statData: 'Mixed',
});

var Stat = mongoose.model('appRecoStat', statSchema);

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
    statData:req.body.data
  };
  Stat.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
