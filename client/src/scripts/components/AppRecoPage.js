var React = require('react');
var Radium = require('radium');
var RadarChart = require("react-chartjs").Radar;
// var appData = require('../stores/appsStore');
// var FilterAppList = require("./FilterAppList");
var LeftImageColumn = require("./LeftImageColumn");
var BubbleChart = require('./BubbleChart');
var RecommendAppSection = require("./RecommendAppSection");
var AppClusterBubbleChart = require("./AppClusterBubbleChart");
var AppDetail = require('./AppDetail');
var Style = Radium.Style;
var StackedBar = require('./StackedBar');
// var RiskData = require('../stores/RiskStore');
var RiskBarSection = require('./RiskBarSection');


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
  },
  textCenter: {
    textAlign: "center"
  },
  tabStyle: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "uppercase",
    color: "#888",
    padding: "15px 0",
    borderBottom: "2px solid #525252",
    background: "#f7f7f7",
  },
  sectionShadow: {
    padding: "30px",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
    background: "#ffffff",
  },
  ulNoStyle:{
     listStyleType: "none",
     marginBottom: "0px",
     paddingLeft: "15px",
     marginTop: "30px"
  },
  unactive: {
    ':hover': {
       backgroundColor: "#ddd"
    },
  },
  active: {
    backgroundColor: "#525252",
    color: "#fff"
  }
};
var sideMenu = [
  {name: "Bubble Cluster", id: "cluster-part"} ,
  {name: "Risk Analysis", id: "risk-part"} ,
  {name: "Recommend APP", id: "recommendation-part"} ,
];


var AppRecoPage = React.createClass({
	getInitialState: function() {
	    return {apps: appData.fetchCurrentCategoryApps(this.props.appid), data: appData.fetchCertainApp(this.props.appid),
              riskData: RiskData.getInit()};
	},
  componentDidMount: function() {
    $('li').on('click', function(event) {
        var target = $(this).attr('target');
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $("#"+target).offset().top
            }, 1000);
        }
    });
  },
	render: function(){
		var category = this.state.data.category;
		var filterApps = [];
		appData.items.map(function(item){
			if(item.category == category){
				filterApps.push(item);
			};
		});
		// console.log(filterApps);
		return (

			<div className="container">
		        <div className="row">
              <div className="col-md-3">
                <LeftImageColumn data={this.state.data} sideMenu={sideMenu} />
              </div>
		          <div className="col-md-9">
			          <AppDetail data={this.state.data}/>
	                    <Style scopeSelector=".tab" rules={{
	                        li: {
	                            float: "left",
	                            width: "30%"
	                        },
	                        a: {
	                            background: "#f7f7f7",
	                        }

	                    }} />
	                    <ul className="row link-area tab" style={styles.ulNoStyle}>
	                      <li><a style={[styles.tabStyle, styles.unactive]} href={"/#/applist/"+this.state.data.category+"/"+this.state.data.id+"/appscan"}  key="1">AppScan</a></li>
	                      <li><a className="active" style={[styles.tabStyle, styles.active]} href={"/#/applist/"+this.state.data.category+"/"+this.state.data.id+"/appreco"}  key="2" type="button">AppReco</a></li>
	                    </ul>
	                    <section style={styles.sectionShadow}>
	                        <p style={styles.description} >Donec ullamcorper nulla non metus auctor fringilla. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Sed posuere consectetur est at lobortis.</p>
	                        <AppClusterBubbleChart />
                          <RiskBarSection data={this.state.riskData} />
		                 	    <RecommendAppSection data={filterApps} />
	                    </section>


		          </div>
		        </div>
		      </div>
			);
	}
});

module.exports = Radium(AppRecoPage);
