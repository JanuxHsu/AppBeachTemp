var React = require('react');
var Radium = require('radium');


var HexTile = React.createClass({
  getInitialState: function() {
		return {
			isSelected: false
		};
	},
  handleClick: function() {
		this.setState({
			isSelected: !this.state.isSelected
		});
    this.props.clickEvent(this.props.memberElements);
	},
	render: function(){
    var styles = {
      selectable : {
        cursor : "pointer"
      }
    };


    return (
      <polyline
        className = "hextile" 
        style={styles.selectable}
        points={makeHexPath(this.props.position.radius || 15, {x:this.props.position.x || 0 , y: this.props.position.y || 0}) }
        stroke="rgb(142, 206, 242)"
        fill={(this.state.isSelected)? "rgb(241, 205, 77)" : "rgba(0, 116, 200,"+ (this.props.memberElements.length/120) +")" }
        onClick = {this.handleClick} />
    );
	}
});
/*
{
  this.props.memberElements.map(function(element, index) {
    return (
      <g>
        <text onClick = {this.handleClick} style={(this.state.isSelected)? styles.show : styles.hide}  text-anchor="middle" y={this.props.position.y - 15*(index)} x={this.props.position.x}>
        {element.appId}
        </text>
      </g>
    )
  }.bind(this))
}
*/
var makeHexPath = function(size, centre) {
	var path = new Path();
	var point = 0;
	var angle = null;
	var x = null;
	var y = null;

	while (point < 7) {
		angle = 2 * Math.PI / 6 * (point + 0.5);
		x = centre.x + size * Math.cos(angle);
		y = centre.y + size * Math.sin(angle);

		path.lineTo(x, y);
		point = point + 1;
	}
	return path.getTrace();
};

var Path = function() {
  var LineStep = [];

   this.lineTo = function (x, y) {
    LineStep.push({x,y});
  };
  this.getPahtPoints = function() {
    return LineStep;
  };
  this.getTrace = function() {
    var path = '';
    LineStep.forEach(function(point) {
      path += point.x + " " + point.y +",";
    });
    return path.substring(0, path.length-1);
  };
};

module.exports = Radium(HexTile);
