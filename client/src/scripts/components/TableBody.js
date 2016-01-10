var React = require('react');
var Radium = require('radium');
var TableInstance = require('./TableInstance');

var TableBody = React.createClass({
	render: function(){
		var tds = this.props.data.map(function(data){
			return (
				
					<TableInstance data={data} />
				
				);
		});
		return (
			<tbody>
				{tds}	
			</tbody>
			);
	}
}); 
module.exports = Radium(TableBody);

