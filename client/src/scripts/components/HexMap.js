var React = require('react');
var Radium = require('radium');
var HexTile = require('./HexTile');
var _ = require('lodash');
var $ = require('jquery');

var HexMap = React.createClass({
  getInitialState: function() {
		return {
      appIdList : [],
		};
	},
  setRowHex : function(initialPosition, distance, lineElementNum, rowNum) {
    var hexList = [];
    for (var j = 0; j < lineElementNum; j++) { //x++
      if (hexList.length === 0) {
        hexList.push(initialPosition);
      } else {
        var last = hexList[hexList.length-1];
        hexList.push({
          x : last.x + distance,
          y : last.y,
          radius : last.radius
        });
      }
    };
    var list = hexList.map(function(hex, index) {
      var x = index+1;
      var y = rowNum;
      var clusterId = x*y;
      var clusterMembers = _.filter(this.props.dataList, function(data) {
        return (data.clusterId == clusterId);
      });
      return(
        <HexTile coordination = {{x:x, y:y }} position={hex} memberElements={clusterMembers} clickEvent={this.onCildUnitClick}/>
      );
    }.bind(this));
    return list;
  },
  onCildUnitClick : function(data) {
    this.setState({
      appIdList : data,
    });
  },
	render: function(){
    var styles = {
      btnStyle : {
        margin : "4px"
      }
    };
    var rowList =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].reverse();
		return (
        <div className="row">
  			  <svg className="hexmap" width = {this.props.mapWidth} height={this.props.mapHeight}>

            <line x1={5} y1={rowList.length*24 + 30} x2={0} y2={0} stroke="rgb(7, 53, 79)" stroke-width="3" />
            <line x1={5} y1={rowList.length*24 + 30} x2={900} y2={rowList.length*24 + 30} stroke="rgb(7, 53, 79)" stroke-width="3" />
            <circle cx={5} cy= {rowList.length*24 + 30} r={5} fill="rgb(7, 53, 79)"/>
            {
              rowList.map(function(rowNum, idx) {
                if(rowNum % 2) {
                  //odd
                  return this.setRowHex({x:50, y:30 + 24*idx , radius:14}, 28, 30, rowNum);
                } else {
                  //even
                  return this.setRowHex({x:35, y:30 + 24*idx, radius:14}, 28, 30, rowNum);
                }
              }.bind(this))
            }
  			  </svg>
          <div className="col-md-12">
            <h4>{(this.state.appIdList.length )? "There are "+ this.state.appIdList.length +" apps in ClusterId " + this.state.appIdList[0].clusterId : "There has no app in this cluster."}</h4>
            {
              this.state.appIdList.map(function(app) {
                return(
                  <a href={"#/applist/detail/"+app.appId}>
                    <button style={styles.btnStyle} type="button" className="btn btn-warning btn-sm">{app.appId}</button>
                  </a>
                );
              })
            }
          </div>
        </div>
			);
	}
});


module.exports = Radium(HexMap);
