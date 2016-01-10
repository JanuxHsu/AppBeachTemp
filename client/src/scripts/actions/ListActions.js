var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ListConstants = require('../constants/ListConstants.js');
var ListStore = require('../stores/ListStore.js');
var $ = require('jquery');
var _ = require('lodash');

var ListActions = {

  fetch: function (category, skip, limit) {
    var categoryList = [
      {
        catalog: "Business",
        catalogId: "6000",
        abbr: "business"
      },
      {
        catalog: "Weather",
        catalogId: "6001",
        abbr: "weather"
      },
      {
        catalog: "Utilities",
        catalogId: "6002",
        abbr: "utilities"
      },
      {
        catalog: "Travel",
        catalogId: "6003",
        abbr: "travel"
      },
      {
        catalog: "Sports",
        catalogId: "6004",
        abbr: "sports"
      },
      {
        catalog: "Social Networking",
        catalogId: "6005",
        abbr: "socialnetworking"
      },
      {
        catalog: "Reference",
        catalogId: "6006",
        abbr: "reference"
      },
      {
        catalog: "Productivity",
        catalogId: "6007",
        abbr: "productivity"
      },
      {
        catalog: "Photo & Video",
        catalogId: "6008",
        abbr: "photo-video"
      },
      {
        catalog: "News",
        catalogId: "6009",
        abbr: "news"
      },
      {
        catalog: "Navigation",
        catalogId: "6010",
        abbr: "navigation"
      },
      {
        catalog: "Music",
        catalogId: "6011",
        abbr: "music"
      },
      {
        catalog: "Lifestyle",
        catalogId: "6012",
        abbr: "lifestyle"
      },
      {
        catalog: "Health & Fitness",
        catalogId: "6013",
        abbr: "health-fitness"
      },
      {
        catalog: "Games",
        catalogId: "6014",
        abbr: "games"
      },
      {
        catalog: "Finance",
        catalogId: "6015",
        abbr: "finance"
      },
      {
        catalog: "Entertainment",
        catalogId: "6016",
        abbr: "entertainment"
      },
      {
        catalog: "Education",
        catalogId: "6017",
        abbr: "education"
      },
      {
        catalog: "Books",
        catalogId: "6018",
        abbr: "books"
      },
      {
        catalog: "Medical",
        catalogId: "6020",
        abbr: "medical"
      },
      {
        catalog: "Catalogs",
        catalogId: "6022",
        abbr: "catalogs"
      },
      {
        catalog: "Food & Drink",
        catalogId: "6023",
        abbr: "food-drink"
      },
      {
        catalog: "Shopping",
        catalogId: "6024",
        abbr: "shopping"
      }
    ];

    if(category === 'all') {
      $.ajax({
        url : "http://140.119.19.90:10080/apps/?skip=" + skip + "&limit=" + limit,
        method : "GET",
        dataType : "json",
        success : function (data) {
          AppDispatcher.handleViewAction( ListConstants.CATEGORY_FETCHED, {
            appList: data
          });
        }
      });
    } else {
      var type = _.find(categoryList, {abbr : category});
      $.ajax({
        url : "http://140.119.19.90:10080/apps/kinds/"+ type.catalogId +"?skip=" + skip + "&limit=" + limit,
        method : "GET",
        dataType : "json",
        success : function (data) {
          AppDispatcher.handleViewAction( ListConstants.CATEGORY_FETCHED, {
            appList: data
          });
        }
      });
    }
  }

};

module.exports = ListActions;
