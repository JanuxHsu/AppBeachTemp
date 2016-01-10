var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:AppClassSingle');
var GeneralErrors = require('../errors/General');

var classSingleSchema = new mongoose.Schema({
  appId: {
    type: String,
    index: true
  },
  data: [{
    hotkey: String,
    value: Number
  }]
});

//TODO functions
classSingleSchema.methods.findByAppId = function (cb) {
  return this.model('ApplicationClassSingle').find({
    appId: this.appId
  }, cb);
};

var ApplicationClassSingle = mongoose.model('ApplicationClassSingle', classSingleSchema);

module.exports = ApplicationClassSingle;
