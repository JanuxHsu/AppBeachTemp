var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:AppClassTriple');
var GeneralErrors = require('../errors/General');

var classTripleSchema = new mongoose.Schema({
	appId: {
		type: String,
		index: true
	},
	data: []
});

//TODO functions
classTripleSchema.methods.findByAppId = function (cb) {
	return this.model('ApplicationClassTriple').find({
		appId: this.appId
	}, cb);
};

var ApplicationClassTriple = mongoose.model('ApplicationClassTriple', classTripleSchema);

module.exports = ApplicationClassTriple;
