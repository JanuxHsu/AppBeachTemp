var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:AppSelfDouble');
var GeneralErrors = require('../errors/General');

var selfDoubleSchema = new mongoose.Schema({
	appId: {
		type: String,
		index: true
	},
	data: []
});

//TODO functions
selfDoubleSchema.methods.findByAppId = function (cb) {
	return this.model('ApplicationSelfDouble').find({
		appId: this.appId
	}, cb);
};
var ApplicationSelfDouble = mongoose.model('ApplicationSelfDouble', selfDoubleSchema);

module.exports = ApplicationSelfDouble;
