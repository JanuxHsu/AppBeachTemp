var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var appClusterSchema = new Schema({
  clusterId: String,
  appIds: 'mixed',
  clusterChart: String,
  topic: 'mixed'
});

var AppCluster = mongoose.model('appRecoCluster', appClusterSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var clusterId = req.params.id;
  AppCluster.find({clusterId:clusterId},function(err, data){
    if(!err){
      res.json(data);
    }
  });
});

router.post('/update', function (req, res) {
  var clusterId = req.body.clusterId;
  console.log(clusterId);

  var query = {
    clusterId : clusterId
  };
  var options = {
    new: false,
    upsert: true
  };
  var data = {
    $set: {
      clusterId : clusterId
    },
    appIds : req.body.appIds,
    clusterChart : req.body.clusterChart,
    topic : req.body.topic
  };

  AppCluster.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
