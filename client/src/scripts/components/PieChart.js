var React = require('react');

var rd3 = require('react-d3');

var PieChart = React.createClass({
    render: function() {
        return <PieChart data={this.props.data.content} width={500} height={200} fill={'#3182bd'} title='Bar Chart' />;
    }
});





