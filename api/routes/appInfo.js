var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var AppInfoSchema = new Schema({
  AppID : Number,
  clusterID : Number,
  behaviorContent : 'mixed'
});

var AppInfo = mongoose.model('AppInfo', AppInfoSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var appID = req.params.id;
  AppInfo.find({AppID:appID},function(err, data){
    if(!err){
      res.json(data);
    }
  });
});

router.post('/update', function (req, res) {
  var AppID = req.body.AppId;
  console.log(AppID);
  var clusterID = req.body.clusterID;

  var query = {
    AppID : AppID
  };
  var options = {
    new: false,
    upsert: true
  };
  var data = {
    $set: {
      AppId:AppID
    },
    behaviorContent : req.body.behaviorContent,
    clusterId : clusterID
  };

  AppInfo.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
