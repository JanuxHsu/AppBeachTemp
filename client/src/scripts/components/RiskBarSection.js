var React = require('react');
var Radium = require('radium');
var StackedBar = require('./StackedBar');
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

var RiskBarSection = React.createClass({
	render: function(){
		return (
			<div style={styles.divWrapper} id="risk-part" className="recoList row">
				<h2>Risk Analysis</h2>
				<StackedBar data={this.props.data} />
			</div>
			);
	}
}); 
module.exports = Radium(RiskBarSection);

