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

var classSingleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});
var classDoubleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});
var classTripleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});
var selfSingleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});
var selfDoubleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});
var selfTripleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});

var Application = mongoose.model('Application', applicationSchema);

var ApplicationClassSingle = mongoose.model('ApplicationClassSingle', classSingleSchema);
var ApplicationClassDouble = mongoose.model('ApplicationClassDouble', classDoubleSchema);
var ApplicationClassTriple = mongoose.model('ApplicationClassTriple', classTripleSchema);

var ApplicationSelfSingle = mongoose.model('ApplicationSelfSingle', selfSingleSchema);
var ApplicationSelfDouble = mongoose.model('ApplicationSelfDouble', selfDoubleSchema);
var ApplicationSelfTriple = mongoose.model('ApplicationSelfTriple', selfTripleSchema);

var queues = [];

//read file dir
function main() {
  var dates = fs.readdirSync("./CallSequenceResults");
  dates = _.filter(dates, function (date) {
    return !date.match(/^\./);
  });
  dates.forEach(function (date) {
    var apps = fs.readdirSync('./CallSequenceResults/' + date);
    apps = _.filter(apps, function (app) {
      return !app.match(/^\./);
    });

    apps.forEach(function (app, appIndex) {
      queues.push(function (cb) {
        var files = fs.readdirSync('./CallSequenceResults/' + date + '/' + app + '/output');

        files = _.filter(files, function (file) {
          return file.match(/(^self)/);
        });

        var collections = {};

        files.forEach(function (file) {
          var data = fs.readFileSync('./CallSequenceResults/' + date + '/' + app + '/output/' + file, {
            encoding: 'utf8'
          });

          var lines = data.split(/\n/);
          lines.pop();

          lines.forEach(function (line, idx) {
            var d = line.split(/\t/);
            var keys = d[0].split(',');

            lines[idx] = {
              hotkey: d[0].split(','),
              value: d[1]
            }
          });
          collections[file] = lines;
        });

        var application = new Application({
          appId: app
        });
        var appSS = new ApplicationSelfSingle({
          appId: app,
          data: collections['selfSingle-m-00000'] || []
        });
        var appSD = new ApplicationSelfDouble({
          appId: app,
          data: collections['selfDouble-m-00000'] || []
        });
        var appST = new ApplicationSelfTriple({
          appId: app,
          data: collections['selfTriple-m-00000'] || []
        });
        var appCS = new ApplicationClassSingle({
          appId: app,
          data: collections['classSingle-m-00000'] || []
        });
        var appCD = new ApplicationClassDouble({
          appId: app,
          data: collections['classDouble-m-00000'] || []
        });
        var appCT = new ApplicationClassTriple({
          appId: app,
          data: collections['classTriple-m-00000'] || []
        });

        console.log('Saving', application.appId, appIndex + '/' + apps.length);
        async.parallel({
          app: application.save,
          appSS: appSS.save,
          appSD: appSD.save,
          appST: appST.save,
          appCS: appCS.save,
          appCD: appCD.save,
          appCT: appCT.save
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

    console.log('Start Handle Queues...');
    async.series(queues, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log('Global Finished:', result);
        queues = [];
      }
    });
  });
}
