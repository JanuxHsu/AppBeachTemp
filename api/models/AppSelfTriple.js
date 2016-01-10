var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:AppSelfTriple');
var GeneralErrors = require('../errors/General');

var selfTripleSchema = new mongoose.Schema({
	appId: {
		type: String,
		index: true
	},
	data: []
});

//TODO functions
selfTripleSchema.methods.findByAppId = function (cb) {
	return this.model('ApplicationSelfTriple').find({
		appId: this.appId
	}, cb);
};
var ApplicationSelfTriple = mongoose.model('ApplicationSelfTriple', selfTripleSchema);

module.exports = ApplicationSelfTriple;
