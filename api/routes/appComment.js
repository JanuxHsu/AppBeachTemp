var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var appCommentSchema = new Schema({
//   commentId: Number,
  app_id: String,
  comment_count: String,
  features : 'mixed',
  score: Number
});

var AppCluster = mongoose.model('appComment', appCommentSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var app_id = req.params.id;
  AppCluster.find({app_id:app_id},function(err, data){
    if(!err && data.length > 0){
      res.json(data);
    }else{
        res.json({status:"Fail"});
    }
  });
});

router.post('/update', function (req, res) {
  var app_id = req.body.app_id;
  console.log(app_id);

  var query = {
    app_id : app_id
  };
  var options = {
    new: false,
    upsert: true
  };
  var data = {
    $set: {
      app_id : app_id
    },
    features : req.body.features,
    comment_count : req.body.comment_count,
    score : req.body.score
  };

  AppCluster.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
