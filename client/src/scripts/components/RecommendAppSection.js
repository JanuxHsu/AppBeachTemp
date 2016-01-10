var React = require('react');
var Radium = require('radium');
var RadarChart = require("react-chartjs").Radar;
// var appData = require('../stores/appsStore');
var FilterAppList = require("./FilterAppList");

// var RecommendAppList = require("./RecommendAppList");

var styles = {
  	ulWrapper: {
  		listStyleType: "none",
		margin: "2em auto",
		padding: 0,

  	},
  	divWrapper: {
  		marginTop: "2em"
  	}
};

var RecommendAppSection = React.createClass({
	render: function(){
		return (
			<div style={styles.divWrapper} id="recommendation-part" className="recoList row">
				<h2>Other Apps in the cluster</h2>
				<FilterAppList data={this.props.data} />
			</div>
			);
	}
});
module.exports = Radium(RecommendAppSection);
