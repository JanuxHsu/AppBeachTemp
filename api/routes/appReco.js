var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var recoSchema = new Schema({
  id : Number,
  appId : String,
  description : String,
  status : String,
  comment : String 
});

var Reco = mongoose.model('appRecoData', recoSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};

router.get('/appReco', function (req, res) {
  Reco.find({},function(err, data){
    if(!err){
      res.json(data);
    }
  });
});
router.get('/appRecoNumber', function (req, res) {
  Reco.count({},function(err, count){
    if(!err){
    //   console.log( "Number of users:", count );
      res.json(count);
    }
  });
});
router.get('/:id', function (req, res) {
  var appId = req.params.id;
  Reco.find({appId:appId},function(err, data){
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
    description : req.body.description,
    status : req.body.status,
    comment : req.body.comment
  };
  Reco.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
        res.json({status:"OK!"});
    }
  });
});




module.exports = router;
