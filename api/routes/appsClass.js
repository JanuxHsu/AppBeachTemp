var express = require('express');
var router = express.Router();
var debug = require('debug')('Route:Apps');
var _ = require('lodash');
var async = require('async');

var appClassSingleCollection = require('../models/AppClassSingle');
var appClassDoubleCollection = require('../models/AppClassDouble');
var appClassTripleCollection = require('../models/AppClassTriple');
var errReturn = function (err, res) {
	debug(err);
	res.status(err.code);
	res.json(err);
};

router.get('/:id/class', function (req, res) {
	var appId = req.params.id;
	var single = new appClassSingleCollection({
		appId: appId
	});
	var double = new appClassDoubleCollection({
		appId: appId
	});
	var triple = new appClassTripleCollection({
		appId: appId
	});

	single.findByAppId(function (err, single) {
		if (err) {
			errReturn(err, res);
		} else {
			double.findByAppId(function (err, double) {
				if (err) {
					errReturn(err, res);
				} else {
					triple.findByAppId(function (err, triple) {
						if (err) {
							errReturn(err, res);
						} else {
							res.json([{
								single: single
							}, {
								double: double
							}, {
								triple: triple
							}]);
						}
					});
				}
			});
		}
	});
	// single.findByAppId(function (err, single) {
	// 	if (err) {
	// 		errReturn(err, res);
	// 	} else {
	// 		res.json(single);
	// 	}
	// });

});

module.exports = router;
