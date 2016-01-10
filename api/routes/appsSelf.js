var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');

var appSelfSingleCollection = require('../models/AppSelfSingle');
var appSelfDoubleCollection = require('../models/AppSelfDouble');
var appSelfTripleCollection = require('../models/AppSelfTriple');

var errReturn = function (err, res) {
	debug(err);
	res.status(err.code);
	res.json(err);
};

router.get('/:id/privateData', function (req, res) {
  var appId = req.params.id;
	var single = new appSelfSingleCollection({
		appId: appId
	});
	var double = new appSelfDoubleCollection({
		appId: appId
	});
	var triple = new appSelfTripleCollection({
		appId: appId
	});

	double.findByAppId(function (err, double) {
    if (err) {
      errReturn(err, res);
    } else {
      triple.findByAppId(function (err, triple) {
        if (err) {
          errReturn(err, res);
        } else {
          res.json({
            double: convertStructure(double),
            triple: convertStructure(triple)
          });
        }
      });
    }
  });

});


function convertStructure(obj) {
  var retList = [];

  var list = obj[0].data.map(function(method) {
    var methodNames = "";
    method.hotkey.methodNames.forEach(function(methodName) {
      methodNames += methodName + ",";
    });
    var tmp = {
      className : method.hotkey.className,
      name : methodNames.substring(0, methodNames.length-1) + "  counts:"+method.value,
      count : method.value
    };
    return tmp;
  });

  var sortedList = _.groupBy(list, function(ele) {
    return ele.className;
  });

  for (className in sortedList) {
    retList.push({
      name : className,
      children : sortedList[className]
    });
  }
  return retList;
}

module.exports = router;
