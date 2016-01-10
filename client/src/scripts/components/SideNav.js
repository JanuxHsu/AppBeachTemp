var Radium = require('radium');
var React = require('react');

//var color = require('color');
var SideNavUl = require('./SideNavUl');

var styles ={
  sidebar: {
    position: 'fixed',
    top: '51px',
    bottom: 0,
    left: 0,
    zIndex: 1000,
    display: 'block',
    padding: '20px',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #eeeeee'
  }
};
var SideNav = React.createClass({
  render: function(){
    return (
      
        <SideNavUl content={this.props.content} />
     

      );
  }
});



module.exports = Radium(SideNav);

