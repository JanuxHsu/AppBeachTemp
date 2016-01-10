var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants');

var $ = require('jquery');

var AppActions = {

  fetch: function (appId) {
    $.ajax({
      url : "http://140.119.19.90:10080/apps/" + appId,
      method : "GET",
      dataType : "json",
      success : function (data) {
        if(data && data.length) {
          AppDispatcher.handleViewAction( AppConstants.SINGLE_FETCHED, {
            app: data[0]
          });
        } else {
          AppDispatcher.handleViewAction( AppConstants.SINGLE_FETCHED, {
            app: {}
          });
        }
      },
      error : function (err) {
        console.log(err);
      }
    });
  },
  fetchTree : function (appId) {

    $.ajax({
      url : "http://140.119.19.90:10080/apps/" + appId + "/privateData",
      method : "GET",
      dataType : "json",
      success : function (data) {
        AppDispatcher.handleViewAction( AppConstants.SINGLE_TREE_FETCHED, {
          appTree: data
        });
      },
      error : function (err) {
        console.log(err);
      }
    });
  }

};

module.exports = AppActions;
