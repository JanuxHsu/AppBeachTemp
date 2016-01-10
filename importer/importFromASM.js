var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', console.info.bind(console, 'connection connected'));

mongoose.connect('mongodb://140.119.19.90:27117/appbeach', function (err) {
  if (err) {
    throw err;
  } else {
    main();
  }
});
//
var Schema = mongoose.Schema;

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
//
var classSingleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});


var Application = mongoose.model('Application', applicationSchema);

var queues = [];

// read file dir

function main() {
  // var dates = fs.readdirSync("/Volumes/Data/AppScan/rawdata/");
  // dates = _.filter(dates, function (date) {
  //   return !date.match(/^\./);
  // });


  var apps = fs.readdirSync('/Volumes/Data/AppScan/rawdata/ASM_First/');
  apps = _.filter(apps, function (app) {
    return !app.match(/^\./);
  });
  console.log(apps);
  apps.forEach(function (app, appIndex) {
    app = app.replace('.armv7.asm','');
    app = app.replace('.armv7s.asm','');
    console.log(app);
    queues.push(function (cb) {
      var application = new Application({
        appId: app
      });

      console.log('Saving', application.appId, appIndex + '/' + apps.length);
      async.parallel({
        app: application.save
      }, function (err, result) {
        if (err) {
          throw err;
        } else {
          console.log('Saved', result.app[0].appId);
          cb(null, result.app[0].appId);
        }
      });
    });
  });
  // //
  console.log('Start Handle Queues...');
  async.series(queues, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log('Global Finished:', result);
      queues = [];
    }
  });

}
