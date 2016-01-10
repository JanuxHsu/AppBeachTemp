var React = require('react');
var Radium = require('radium');
var RadarChart = require("react-chartjs").Radar;
// var appData = require('../stores/appData');
var FilterAppList = require("./FilterAppList");
var Style = Radium.Style;

var styles = {
  	ulWrapper: {
  		listStyleType: "none",
		margin: "2em auto",
		padding: 0,

  	}
};


var RecommendAppList = React.createClass({
	render: function(){
		return (
			<div style={styles.divWrapper} className="recoList">
				<h2>Other Apps in the cluster</h2>

			</div>
			);
	}
});

module.exports = Radium(RecommendAppList);
