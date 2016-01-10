var React = require('react');
var Router = require('react-router-component');
var Radium = require('radium');
var $ = require('jquery');


var SideNavUl = React.createClass({
  mixins: [ Router.NavigatableMixin ],

  changePage : function(url) {
    var ctx = this;
    return function() {
      ctx.navigate(url);
      location.reload();
    };
  },
  render: function() {
    var styles = {
      sideBar : {
        position : 'relative',
        top : '30px'
      },
      sidebarGrid : {
        fontSize : "14px",
        fontWeight : "bold",
        padding: "8px 5px 8px 15px",
        ":hover" : {
          backgroundColor : "rgba(125, 147, 164, 0.2)",
          cursor : "pointer",
          color : "rgb(66, 105, 134)",
          boxShadow:"inset 0px -0.5px 1px rgb(66, 105, 134)",
          filter: "opacity(0.5) brightness(0.8) contrast(2) "
        }
      }
    };
    return (
      <ul className="nav nav-sidebar" style = {styles.sideBar}>
        {
          this.props.content.map(function(data, index) {
            return (
              <li style={styles.sidebarGrid} key={"catelog-"+ index} onClick ={this.changePage("#/applist/"+ data.abbr)}>
                <span>
                  <i className="fa fa-chevron-right"></i> {data.catalog}
                </span>
              </li>
            )
          }.bind(this))
        }
      </ul>
      );
  }
});



module.exports = Radium(SideNavUl);
