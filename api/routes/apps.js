var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');

var ApplicationCollection = require('../models/Application');

var errReturn = function (err, res) {
  debug(err);
  res.status(err.code);
  res.json(err);
};

router.get('/', function (req, res) {
  var skip = req.query.skip || 0;
  var limit = req.query.limit || 40;
  var app = new ApplicationCollection();
  app.listApp(skip, limit, function (err, apps) {
    if (err){
      errReturn(err, res);
    } else {
      res.json(apps);
    }
  });
});

router.get('/kinds/:kind', function (req, res) {
  var appKind = req.params.kind;
  var skip = req.query.skip || 0;
  var limit = req.query.limit || 40;
  var app = new ApplicationCollection();

  app.findByAppKind(appKind, skip, limit, function (err, app) {
    if (err) {
      errReturn(err, res);
    } else {
      res.json(app);
    }
  });

});


router.get('/:id', function (req, res) {
  var appId = req.params.id;

  var app = new ApplicationCollection({
    appId: appId
  });

  app.findByAppId(function (err, app) {
    if (err) {
      errReturn(err, res);
    } else {
      res.json(app);
    }
  });

});




module.exports = router;
