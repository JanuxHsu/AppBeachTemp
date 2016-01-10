var crawler = require('crawler');
var request = require('request');
var url = require('url');
var mongoose = require('mongoose');
var _ = require('lodash');


var db = mongoose.connection;
var baseURL = 'https://itunes.apple.com/lookup?id=';

db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', console.info.bind(console, 'connection connected'));

mongoose.connect('mongodb://140.119.19.90:27117/appbeach', function (err) {
	if (err) {
		throw err;
	} else {
		main();
	}
});

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

applicationSchema.statics.findByAppId = function (appId, cb) {
	return this.findOne({
		appId: appId
	}, cb);
};

var Application = mongoose.model('Application', applicationSchema);
var idx;
var appIds;

function itunesCrawler(path, appId) {
	Application.findByAppId(appId, function (err, app) {
		if (err) {
			throw err;
		} else {
			request(path, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					var data = JSON.parse(body).results[0];
					_.assign(app, data);
					app.save(function (err, result) {
						if (err) {
							throw err;
						} else {
							console.log("APP " + app.appId + " UPDATED.");
							setTimeout(function () {
								if (idx < appIds.length) {
									itunesCrawler(baseURL + appIds[idx], appIds[idx]);
									idx += 1;
								} else {
									console.log("FINISH ALL");
								}
							}, 1000);
						}
					});
				}
			});
		}
	});
};

function main() {
	Application
		.find()
		.select("appId -_id")
		.exec(function (err, apps) {
			idx = 0;
			appIds = _.pluck(apps, "appId");
			for (var i = 0; i < 10; i++) {
				if (idx < appIds.length) {
					itunesCrawler(baseURL + appIds[idx], appIds[idx]);
					idx += 1;
				}
			}
		});
};
