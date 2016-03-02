var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var AppInfoSchema = new Schema({
  appId : String,
  clusterId : String,
  behaviorContent : 'mixed'
});

var AppInfo = mongoose.model('appRecoScore', AppInfoSchema);

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};


router.get('/category/:category/:id', function (req, res) {
  var categoryId = req.params.category;
  if (categoryId != '1' && categoryId != '2' && categoryId != '3'){
      var Temp_Data = {
            status : "fail",
            msg : "Category parameter is not found"
        };
        res.json(Temp_Data);
  }else{
  var appId = req.params.id;
  AppInfo.findOne({appId:appId},function(err, data){
    if(!err){
      if(!data){
        var Temp_Data = {
            status : "fail",
            msg : "Data not found"
        };
        res.json(Temp_Data);
      }else{
        var labList = []
        var dataList = []
        var behaviorContent = data.behaviorContent;
        for(var i in behaviorContent){
            //console.log('category_score' + behaviorContent[i].category);
            if (behaviorContent[i].category == categoryId){
                labList.push(behaviorContent[i].name)
                dataList.push(behaviorContent[i].score)
            }
            // Temp_Data['categoryScore_' + behaviorContent[i].category] += parseFloat(behaviorContent[i].score);
            //Temp_Data['category' + behaviorContent[i].category + "_score"] = behaviorContent[i].score;
        }
        var datasetDict = {
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: dataList
        }
        var datasetsList = []
        datasetsList.push(datasetDict)
        var reDict = {
            labels: labList,
            datasets: datasetsList
        }
        res.json(reDict);
        }
        }
    })};
});
router.get('/:id', function (req, res) {
  var appId = req.params.id;
  AppInfo.findOne({appId:appId},function(err, data){
    // if (!data) {
    //     console.log('hello');
    // }
    if(!err){
      if(!data){
        var Temp_Data = {
            status : "fail",
            msg : "Data not found"
        };
        res.json(Temp_Data);
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
