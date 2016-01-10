var React = require('react');
var Radium = require('radium');

var TableHeader = React.createClass({
	render: function(){
		var ths = this.props.data.map(function(data){
			return (
					<th>{data}</th>
				);
		});
		return (
			<thead>
				<tr>
					{ths}
				</tr>
			</thead>
			);
	}
}); 
module.exports = Radium(TableHeader);

