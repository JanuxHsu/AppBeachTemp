var React = require('react');
var Radium = require('radium');
var LeftImageColumn = require('./LeftImageColumn');
var AppDetail = require('./AppDetail');
var CollapsibleTree = require('./CollapsibleTree');
// var TreeStore = require('../stores/TreeStore');
// var AppActions = require('../actions/AppActions');

function getTodoState() {
  return {
    data: TreeStore.getData(),
    dataDouble: TreeStore.getDouble(),
    dataTriple: TreeStore.getTriple()
  };
}
var TreeMapPage = React.createClass({
  getInitialState: function() {
    AppActions.fetchtree(this.props.appid);
     return {
        data: TreeStore.getData(),
        dataDouble: {},
        dataTriple: {}
     };
  },
  componentDidMount: function() {
        TreeStore.addChangeListener(this._onChange);
        AppActions.fetchtree(this.props.appid);
  },
  componentWillUnmount: function() {
        TreeStore.removeChangeListener(this._onChange);
  },
  render: function(){
  return (
  <div className="container">

         <div className="row" id="container">
         	<CollapsibleTree data={this.state.data}/>
         </div>
     </div>
    );
    },
  _onChange: function() {
        this.setState(getTodoState());
    },
});
module.exports = Radium(TreeMapPage);
