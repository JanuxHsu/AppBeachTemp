'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var CHANGE_EVENT = 'change';

//private variable
var _app = {};
var _appTree = {};

var AppStore = function () {};
util.inherits(AppStore, EventEmitter);

AppStore.prototype.emitChange = function () {
  this.emit(CHANGE_EVENT);
};

AppStore.prototype.addChangeListener = function (cb) {
  return this.on(CHANGE_EVENT, cb);
};

AppStore.prototype.removeChangeListener = function (listener) {
  return this.removeListener(CHANGE_EVENT, listener);
};

AppStore.prototype.get = function () {
  return _app;
};

AppStore.prototype.getTree = function () {
  return _appTree;
};

var appStore = new AppStore();

// Register callback to handle all updates
AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch (action) {
    case AppConstants.SINGLE_FETCHED:
      _app = payload.app;
      appStore.emitChange();
      break;

    case AppConstants.SINGLE_TREE_FETCHED:
      _appTree = payload.appTree;
      appStore.emitChange();
      break;
    default:
      return true;
  }
});

module.exports = appStore;
