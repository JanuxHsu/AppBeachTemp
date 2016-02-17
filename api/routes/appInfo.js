var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var AppInfoSchema = new Schema({
  appId : String,
  clusterId : Number,
  behaviorContent : 'mixed'
});

var AppInfo = mongoose.model('appRecoScore', AppInfoSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};



router.get('/:id', function (req, res) {
  var appId = req.params.id;
  AppInfo.findOne({appId:appId},function(err, data){
    // if (!data) {
    //     console.log('hello');
    // }
    if(!err){

      if(!data){
            AppInfo.findOne({appId:'284220417'},function(err, data){
        // if (!data) {
        //     console.log('hello');
        // }
        if(!err){
        var test = {
            test:"123"
        };
        var Temp_Data = {
            behaviorContent: data.behaviorContent,
            appId: appId,
            clusterId: data.clusterId,
            categoryScore_1: 0,
            categoryScore_2: 0,
            categoryScore_3: 0,
            categoryScore_4: 0
        };
        var behaviorContent = Temp_Data.behaviorContent;
        for(var i in behaviorContent){
            //console.log('category_score' + behaviorContent[i].category);
            Temp_Data['categoryScore_' + behaviorContent[i].category] += parseFloat(behaviorContent[i].score);
            //Temp_Data['category' + behaviorContent[i].category + "_score"] = behaviorContent[i].score;
        }
        res.json(Temp_Data);
        }
        });
      }else{
        var Temp_Data = {
            behaviorContent: data.behaviorContent,
            appId: data.appId,
            clusterId: data.clusterId,
            categoryScore_1: 0,
            categoryScore_2: 0,
            categoryScore_3: 0,
            categoryScore_4: 0
        };
        var behaviorContent = Temp_Data.behaviorContent;
        for(var i in behaviorContent){
            //console.log('category_score' + behaviorContent[i].category);
            Temp_Data['categoryScore_' + behaviorContent[i].category] += parseFloat(behaviorContent[i].score);
            //Temp_Data['category' + behaviorContent[i].category + "_score"] = behaviorContent[i].score;
        }
        res.json(Temp_Data);
        }
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
