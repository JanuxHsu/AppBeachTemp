var React = require('react');
var Radium = require('radium');
var TableInstance = require('./TableInstance');

var TableBody = React.createClass({
	
	render: function(){
		var rows = [];
		var row;
		console.log(this.props.data);
		for(key in this.props.data){
			row = this.props.data[key];
			rows.push(row);
		}
		
		var tds = rows.map(function(item){
			return (<td>{item}</td>);
		});
		return (
			<tr>
				{tds}
			</tr>
			);
	}
}); 
module.exports = Radium(TableBody);

