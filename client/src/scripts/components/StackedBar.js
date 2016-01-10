var React = require('react');
var Radium = require('radium');
var Highcharts = require('react-highcharts/dist/bundle/highcharts');

var config = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Risk Chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Ad Risk',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Privacy Risk',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Network Risk',
            data: [3, 4, 4, 2, 5]
        }]
    };

var StackedBar = React.createClass({
	fetchCategories: function(){
		var arr = [];
		var categories = [];
		var ad_risk = [];
		var privacy_risk = [];
		var network_risk = [];
		this.props.data.map(function(item){
			categories.push(item.Name);
			ad_risk.push(item.Ad_risk);
			privacy_risk.push(item.Privacy_risk);
			network_risk.push(item.Network_risk);
		});
		arr.push(categories, ad_risk, privacy_risk, network_risk);
		return arr;
	},
	setConfig: function(){
		var data = this.fetchCategories();
		config.xAxis.categories = data[0];
		config.series[0].data = data[1];
		config.series[1].data = data[2];
		config.series[2].data = data[3];
		console.log(this.fetchCategories());
		return config;
	},
	render: function(){
		this.setConfig();
		return <Highcharts config = {this.setConfig()}></Highcharts>
	}
});

module.exports = Radium(StackedBar);
