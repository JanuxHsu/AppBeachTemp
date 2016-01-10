var React = require('react');
var Radium = require('radium');
window.Chart = require('chart.js');
var DoughnutChart = require("react-chartjs").Doughnut;

var Doughnut = React.createClass({
	componentDidMount: function(node){

	},
	render: function(){
		
		var styles = {
			chartWrapper: {
				textAlign: "center"
			},
			listStyle:{
				display: "block",
				paddingLeft: "30px",
				position: "relative",
				marginBottom: "4px",
				borderRadius: "5px",
				padding: "2px 8px 2px 28px",
				fontSize: "14px",
				cursor: "default",	
				transition: "background-color 200ms ease-in-out"
			},
			colorBox: {
				display: "block",
				position: "absolute",
				left: 0,
				top: 0,
				width: "20px",
				height: "20px",
				borderRadius: "5px"
			}
		};
		return (
			<div>
				<div className="col-md-6" style={styles.chartWrapper}>
				<DoughnutChart 
	               data={this.props.data} width="300" height="300" redraw/>
	            </div>
				<div className="col-md-6">
	               <ul className="doughnut-legend">
	             {
                  this.props.data.map(function(data){
                  	var color = {backgroundColor: data.color};
                    return ( 
                        <li style={styles.listStyle}>
	                        <span style={[color, styles.colorBox]}></span>
	                        {data.label} <span>{data.value}%</span>
                        </li>
                      
                    );
                  })
                }
                </ul>
                </div>
            </div>
               
			);
	}
});

module.exports = Radium(Doughnut);