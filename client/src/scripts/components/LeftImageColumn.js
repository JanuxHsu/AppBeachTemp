var React = require('react');
var Radium = require('radium');
var SideMenu = require('./SideMenu');
var Radium = require('radium');

var styles = {
	imgStyle: {
    width: '180px',
    margin :'35px 15px 0px 0px'
  }
}
var LeftImageColumn = React.createClass({
	render: function(){
		var sideMenu;
		if(this.props.sideMenu){
			sideMenu = <SideMenu data={this.props.sideMenu} />
		}
		return (
			<div className="wrapper sidebar" style={styles.wrapper}>
		        <img src={this.props.data.artworkUrl512} style={styles.imgStyle} />
		        {sideMenu}
		    </div>
			);
	}
});
module.exports = Radium(LeftImageColumn);
