var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:AppSelfSingle');
var GeneralErrors = require('../errors/General');

var selfSingleSchema = new mongoose.Schema({
	appId: {
		type: String,
		index: true
	},
	data: []
});

//TODO functions
selfSingleSchema.methods.findByAppId = function (cb) {
	return this.model('ApplicationSelfSingle').find({
		appId: this.appId
	}, cb);
};
var ApplicationSelfSingle = mongoose.model('ApplicationSelfSingle', selfSingleSchema);

module.exports = ApplicationSelfSingle;
