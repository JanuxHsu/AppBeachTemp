var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var debug = require('debug')('Database:Application');
var GeneralErrors = require('../errors/General');

var applicationSchema = new mongoose.Schema({
  appId: {
    type: String,
    index: true
  },
  screenshotUrls: [String],
  ipadScreenshotUrls: [String],
  artworkUrl60: String,
  artworkUrl512: String,
  artistViewUrl: String,
  kind: String,
  features: [String],
  supportedDevices: [String],
  advisories: [String],
  isGameCenterEnabled: Boolean,
  trackCensoredName: String,
  languageCodesISO2A: [String],
  fileSizeBytes: String,
  sellerUrl: String,
  contentAdvisoryRating: String,
  averageUserRatingForCurrentVersion: Number,
  userRatingCountForCurrentVersion: Number,
  artworkUrl100: String,
  trackViewUrl: String,
  trackContentRating: String,
  currency: String,
  wrapperType: String,
  version: String,
  releaseDate: String,
  sellerName: String,
  genreIds: [String],
  artistId: Number,
  artistName: String,
  genres: [String],
  price: Number,
  description: String,
  bundleId: String,
  trackId: Number,
  trackName: String,
  primaryGenreName: String,
  primaryGenreId: Number,
  releaseNotes: String,
  formattedPrice: String,
  minimumOsVersion: String,
  userRatingCount: Number,
  averageUserRating: Number
});

//TODO functions
applicationSchema.methods.findByAppKind = function (kind, skip, limit, cb) {
  return this.model('Application').find({
    genreIds: [kind]
  }).skip(skip)
  .limit(limit)
  .exec(cb);
};

applicationSchema.methods.findByAppId = function (cb) {
  return this.model('Application').find({
    appId: this.appId
  }, cb);
};


applicationSchema.methods.listApp = function (skip,limit,cb) {
  return this.model('Application')
             .find()
             .skip(skip)
             .limit(limit)
             .exec(cb);
};

var Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
