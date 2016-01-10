var React = require('react');
var Radium = require('radium');
var Table = require("./Table");

var styles = {
  	ulWrapper: {
  		listStyleType: "none",
		margin: "2em auto",
		padding: 0,
		
  	},
  	imgStyle: {
  		width: "400px"
  	},
  	divWrapper: {
  		marginTop: "2em"
  	}
};

var AppClusterBubbleChart = React.createClass({
	render: function(){
		return (
			<div style={styles.divWrapper} id="cluster-part" className="reco-bubble-chart row">
				<h2>Bubble Chart</h2>
				
				<div className="col-md-12">
					<Table />
				</div>
				<div>
					<img style={styles.imgStyle} src="http://i.imgur.com/C83PAwg.png?1" />
				</div>
			</div>
			);
	}
}); 
module.exports = Radium(AppClusterBubbleChart);

