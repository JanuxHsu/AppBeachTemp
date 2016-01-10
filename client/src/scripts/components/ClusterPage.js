var React = require('react');
var Radium = require('radium');
window.Chart = require('chart.js');
var SideNavUl = require('./SideNavUl');
var Doughnut = require('./Doughnut');
var DoughnutChartStore = require('../stores/DoughnutChart');

var sidenav = [
  {"catalog": "Social", "url": "/#/cluster/social"},
  {"catalog": "Sports", "url": "/#/cluster/sports"},
  {"catalog": "Kid", "url": "/#/cluster/kid"},
  {"catalog": "Education", "url": "/#/cluster/education"},
  {"catalog": "Travel", "url": "/#/cluster/travel"},
  {"catalog": "Business", "url": "/#/cluster/business"},
  {"catalog": "Finance", "url": "/#/cluster/finance"},
  {"catalog": "Productivity", "url": "/#/cluster/productivity"}

];
var styles = {
  title : {
    fontWeight : 'bold',
    color: '#268595',
    textShadow: '1px 1px 1px #268595'
  },
  description : {
    color : '#176875',
    textAlign : 'justify',
    lineHeight : '30px',
    fontWeight : '200',
    fontSize : '16px'
  },
  divide : {
    borderTop: '2px solid #27A2AB'
  }
};

var ClusterPage = React.createClass({
  getInitialState: function() {
    return {data: DoughnutChartStore.items, sidenav: sidenav};
  },
  render: function(){
    return (
      <div className="container clusterPage">
        <div className="row">
          <div className="">
            
          </div>
          <div className="col-md-offset-2 col-md-10 ">
            <div className="row">
              <h2 style={styles.title}>{this.props.catalog}</h2>
            </div>
            <div className="row">
                <Doughnut data={DoughnutChartStore.fetchCertainCategory(this.props.catalog).content} />
             </div>

          </div>
        </div>
      </div>
      );
  }
});



module.exports = Radium(ClusterPage);
