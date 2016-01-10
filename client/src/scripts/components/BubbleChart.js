var React = require('react');
var Radium = require('radium');
var ReactBubbleChart = require('react-bubble-chart');
// var appData = require('../stores/appsStore');

var colorLegend = [
  //reds from dark to light
  {color: "#67000d", text: 'Negative', textColor: "#ffffff"}, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
  //neutral grey
  {color: "#f0f0f0", text: 'Neutral'},
  // blues from light to dark
  "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", {color: "#08306b", text: 'Positive', textColor: "#ffffff"}
];
var data = [{
		_id : "1",
		value: 10,
		displayText: "q",
		colorValue: "red",
		selected: true
	},{
		_id : "2",
		value: 30,
		displayText: "q",
		colorValue: "#deebf7",
		selected: true
	},{
		_id : "3",
		value: 20,
		displayText: "q",
		colorValue: "#deebf7",
		selected: true
	},{
		_id : "4",
		value: 20,
		displayText: "q",
		colorValue: "#deebf7",
		selected: true
	},{
		_id : "5",
		value: 60,
		displayText: "q",
		colorValue: "#deebf7",
		selected: true
	},{
		_id : "6",
		value: 50,
		displayText: "q",
		colorValue: "#deebf7",
		selected: true
	},{
		_id : "7",
		value: 90,
		displayText: "qa",
		colorValue: "#deebf7",
		selected: true
	},{
		_id : "8",
		value: 200,
		displayText: "qa",
		colorValue: "#deebf7",
		selected: true
	}
];
var tooltipProps = [{
  css: 'symbol',
  prop: '_id'
}, {
  css: 'value',
  prop: 'value',
  display: 'Last Value'
}, {
  css: 'change',
  prop: 'colorValue',
  display: 'Change'
}];

var BubbleChart = React.createClass({
	render: function(){
		return (
			<ReactBubbleChart
			className="my-cool-chart"
			colorLegend={colorLegend}
			data={data}
			selectedColor="#737373"
			selectedTextColor="#d9d9d9"/>
			);
	}
});

module.exports = BubbleChart;
