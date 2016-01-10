var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;


var _riskList = [];
var data = [
	{"No": 0, "TrackId": "313232441", "Name": "Doodle Buddy - Paint Draw Scribble Sketch - It's Addictive!", "Genre": "Productivity", "Rating": 3.5, "Ad_risk": 1.13, "Privacy_risk": 2.19, "Network_risk": 3.74 },
	{"No": 1, "TrackId": "410871280", "Name": "SketchBook Express for iPad", "Genre": "Entertainment", "Rating": 4, "Ad_risk": 0.5, "Privacy_risk": 2.07, "Network_risk": 3.32 },
	{"No": 2, "TrackId": "484604482", "Name": "Photo Reflection", "Genre": "Photo & Video", "Rating": 4.5, "Ad_risk": 1.29, "Privacy_risk": 2.07, "Network_risk": 3.54 },
	{"No": 3, "TrackId": "641389805", "Name": "Wallpaper Photo Frame", "Genre": "Lifestyle", "Rating": null, "Ad_risk": 1.29, "Privacy_risk": 1.93, "Network_risk": 3.99 },
	{"No": 4, "TrackId": "656485997", "Name": "Mirror Effect HD  - Photo Water Reflection Editor & Insta PS Camera", "Genre": "Photo & Video", "Rating": 4, "Ad_risk": 0.67, "Privacy_risk": 1.95, "Network_risk": 3.34 }
];
var RiskStore = {
	getInit: function(){
		_riskList = data;
		return _riskList;
	},
	getAll: function() {
        return _riskList;
    }
};

module.exports = RiskStore;
