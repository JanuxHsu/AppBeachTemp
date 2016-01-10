var React = require('react');
var Radium = require('radium');
var TreeChart = require('d3-state-visualizer').charts;
var d3tooltip = require('d3-state-visualizer').d3tooltip;
// console.log(TreeChart);
var appState = {
  todoStore: {
    todos: [
      { title: 'd3' },
      { title: 'state' },
      { title: 'visualizer' },
      { title: 'tree' }
    ],
    completedCount: 1,
    alphabeticalOrder: true
  },
  someStore: {
    someProperty: 0,
    someObject: {
      anotherProperty: 'value',
      someArray: [0, 1, 2]
    }
  }
};


var CollapsibleTree = React.createClass({
	componentDidMount: function(){
		// this.renderChart = TreeChart(findDOMNode(this), this.props);
    	// this.renderChart();

	},
	render: function(){
    // var doubleData = this.props.double;
    // var tripleData = this.props.triple;
    console.log(this.props.double);
    this.renderChart = TreeChart.tree(document.getElementById('container'),
    {
      state: this.props,
      id: 'treeExample',
      size: 1000,
      aspectRatio: 0.5,
      isSorted: false,
      widthBetweenNodesCoeff: 1.5,
      heightBetweenNodesCoeff: 2,
      style: {
        border : '1px solid black'
      },
      tooltipOptions: {
        offset: {
          left: 30,
          top: 10
        },
        indentationSize: 2
      }
    });

  this.renderChart();
		return (
			 <div>
			 </div>
			);
	}
});
module.exports = Radium(CollapsibleTree);
