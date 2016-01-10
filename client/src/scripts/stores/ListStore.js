'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ListConstants = require('../constants/ListConstants.js');

var _ = require('lodash');

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var CHANGE_EVENT = 'change';

//private variable
var _appList = [];

var ListStore = function () {};
util.inherits(ListStore, EventEmitter);

ListStore.prototype.emitChange = function () {
  this.emit(CHANGE_EVENT);
};

ListStore.prototype.addChangeListener = function (cb) {
  return this.on(CHANGE_EVENT, cb);
};

ListStore.prototype.removeChangeListener = function (listener) {
  return this.removeListener(CHANGE_EVENT, listener);
};

ListStore.prototype.getAll = function () {
  return _appList;
};



var listStore = new ListStore();

// Register callback to handle all updates
AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch (action) {
    case ListConstants.CATEGORY_FETCHED:
      _appList = payload.appList;
      listStore.emitChange();
      break;
    default:
      return true;
  }
});

module.exports = listStore;
