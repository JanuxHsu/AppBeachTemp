var React = require('react');
var Radium = require('radium');
var RadarChart = require("react-chartjs").Radar;
// var appData = require('../stores/appData');
var Style = Radium.Style;

var styles = {
  	ulWrapper: {
  		listStyleType: "none",
		margin: "2em auto",
		padding: 0,

  	}
};


var ImageList = React.createClass({
	getInitialState: function() {
	    return {data: appData.fetchCertainApp(this.props.appid)};
	},
	render: function(){
		return (
			<div style={styles.divWrapper} className="recoList">
			<h2>Other Apps in the cluster</h2>
			<Style scopeSelector=".recoList" rules={{
			  li: {
			    position: "relative",
				overflow: "hidden",
				background: "#eee",
				margin: "0 5px 1em 5px",
				height: "150px",
				width: "300px",
				cursor: "pointer",
				borderTop: "3px solid #fbaf5f",
				boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.25)",
				display: "inline-block"
			  },
			  img: {
				transition: "all 0.25s linear",
			  },
			  ".imgWrapper": {
			  	overflow: "hidden",
			  	position: "relative",
			  	float: "right",
			  	width: "150px",
			  	height: "150px"
			  },
			  ".contentWrapper": {
			  	padding: "10px"
			  },
			  a: {
				padding: "6px",
				background: "#b5a7c8",
				borderRadius: "6px",
				color: "#fff",
				position: "absolute",
				bottom: "1em",
				border: "1px solid #a897be"
			  }

			}} />
			<Style scopeSelector=".recoList li:hover" rules={{
				img: {
					transform: "scale(1.25, 1.25)",
			  		boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.25)"
				}
			}} />

			  <ul style={styles.ulWrapper}>
                <li className="liWrapper">
                  <div className="imgWrapper">
                    <img src="http://lorempixel.com/150/150" alt="" />
                  </div>
                  <div className="contentWrapper">
	                  <h4>Instagram</h4>
	                  <p>Risk rating: 8</p>
	                  <a>See more &#187;</a>
                  </div>
                </li>
                <li className="liWrapper">
                  <div className="imgWrapper">
                    <img src="http://lorempixel.com/150/150" alt="" />
                  </div>
                  <div className="contentWrapper">
	                  <h4>Instagram</h4>
	                  <p>Risk rating: 8</p>
	                  <a>See more &#187;</a>
                  </div>
                </li>
               </ul>
			</div>
			);
	}
});

module.exports = Radium(ImageList);
