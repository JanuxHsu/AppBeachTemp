var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:AppClassDouble');
var GeneralErrors = require('../errors/General');

var classDoubleSchema = new mongoose.Schema({
	appId: {
		type: String,
		index: true
	},
	data: []
});

//TODO functions
classDoubleSchema.methods.findByAppId = function (cb) {
	return this.model('ApplicationClassDouble').find({
		appId: this.appId
	}, cb);
};

var ApplicationClassDouble = mongoose.model('ApplicationClassDouble', classDoubleSchema);

module.exports = ApplicationClassDouble;
