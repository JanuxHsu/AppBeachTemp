var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var appClassListSchema = new Schema({
  appId: Number,
  classList: String,
});

var AppClassList = mongoose.model('appClassList', appClassListSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var appId = req.params.id;
  AppClassList.find({appId:appId},function(err, data){
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
    classList : req.body.classList,
  };

  AppClassList.findOneAndUpdate(query, data, options, function(err, result){
    if(!err){
      res.json({status:"OK!"});
    }
  });
});




module.exports = router;
