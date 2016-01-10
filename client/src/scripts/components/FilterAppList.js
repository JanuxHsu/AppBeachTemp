var React = require('react');
var Radium = require('radium');
var RadarChart = require("react-chartjs").Radar;
// var appData = require('../stores/appsStore');

var Style = Radium.Style;

var styles = {
  	ulWrapper: {
  		listStyleType: "none",
		margin: "2em auto",
		padding: 0,

  	},
  	imgSize: {
  		width: "150px"
  	}
};


var FilterAppList = React.createClass({
	render: function(){
		var items = this.props.data.map(function(item){
			return (
				<li className="liWrapper">
                  <div className="imgWrapper">
                    <img style={styles.imgSize} src={item.image} alt="" />
                  </div>
                  <div className="contentWrapper">
	                  <h4>{item.name}</h4>
	                  <p>Risk rating: 8</p>
                  </div>
                </li>
				);
		});
		// console.log(items);
		return (
			  <ul style={styles.ulWrapper}>
			  <Style scopeSelector=".recoList" rules={{
			  li: {
			    position: "relative",
				overflow: "hidden",
				background: "#eee",
				margin: "0 5px 1em 5px",
				cursor: "pointer",
				borderTop: "3px solid #fbaf5f",
				boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.25)",
				display: "inline-block",
				padding: "0"
			  },
			  img: {
				transition: "all 0.25s linear",
			  },
			  ".imgWrapper": {
			  	overflow: "hidden",
			  	position: "relative",
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
			  	{items}
               </ul>

			);
	}
});

module.exports = Radium(FilterAppList);
