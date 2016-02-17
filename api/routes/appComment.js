var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var appCommentSchema = new Schema({
//   commentId: Number,
  appId: String,
  commentCount: String,
  features : 'mixed',
  score: Number
});

var AppCluster = mongoose.model('appRecoComment', appCommentSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var appId = req.params.id;
  AppCluster.find({appId:appId},function(err, data){
    if(!err){
      res.json(data);
    }
  });
});

router.post('/update', function (req, res) {
  var appId = req.body.appId;
  console.log(appId);

  var query = {
    appId : appId
  };
  var options = {
    new: false,
    upsert: true
  };
  var data = {
    $set: {
      appId : appId
    },
    features : req.body.features,
    commentCount : req.body.commentCount,
    score : req.body.score
  };

  AppCluster.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
