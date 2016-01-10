var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var AppInfoSchema = new Schema({
  appId : Number,
  clusterId : Number,
  behaviorContent : 'mixed'
});

var AppInfo = mongoose.model('AppInfo', AppInfoSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var appId = req.params.id;
  AppInfo.find({appId:appId},function(err, data){
    if(!err){
      res.json(data);
    }
  });
});

router.post('/update', function (req, res) {
  var appId = req.body.appId;
  console.log(appId);
  var clusterId = req.body.clusterId;

  var query = {
    appId : appId
  };
  var options = {
    new: false,
    upsert: true
  };
  var data = {
    $set: {
      appId:appId
    },
    behaviorContent : req.body.behaviorContent,
    clusterId : clusterId
  };

  AppInfo.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
