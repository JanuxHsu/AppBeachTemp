var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var appInfoSchema = new Schema({
  appId : String,
  name : String,
  description : String,
  genre : String,
  picUrl : String,
  rating: Number,
  ratingUsers: Number
});

var AppInfo = mongoose.model('appRecoInfo', appInfoSchema);

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
    name : req.body.name,
    description : req.body.description,
    genre : req.body.genre,
    picUrl : req.body.picUrl,
    rating : req.body.rating,
    ratingUsers : req.body.ratingUsers
  };

  AppInfo.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
