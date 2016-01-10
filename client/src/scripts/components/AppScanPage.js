var React = require('react');
var Radium = require('radium');
var RadarChart = require("react-chartjs").Radar;
// var appData = require('../stores/appsStore');
var AppDetail = require('./AppDetail');
var Style = Radium.Style;


var radarData = [{
	id : "id375380948",
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
},{
	id: "id389801252",
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
}];

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
var AppScanPage = React.createClass({
	getInitialState: function() {
	    return {data: appData.fetchCertainApp(this.props.appid) , radar: radarData};
	},
    componentDidMount: function() {

    },
	render: function(){

        var objRadar;
        var appid = this.props.appid;
	    this.state.radar.map(function(data){
	      if(data.id == appid){
	        objRadar = data;
	      };
	    });
        // console.log(appid);
		return (
			<div className="container">
		        <div className="row">
		          <div className="col-md-3">
		            <br />
		            <img src={this.state.data.image} />
		          </div>
		          <div className="col-md-9 ">
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
                      <li><a className="active" style={[styles.tabStyle, styles.active]} href={"/#/applist/"+this.state.data.category+"/"+this.state.data.id+"/appscan"}  key="1">AppScan</a></li>
                      <li><a style={[styles.tabStyle, styles.unactive]} href={"/#/applist/"+this.state.data.category+"/"+this.state.data.id+"/appreco"}  key="2" type="button">AppReco</a></li>

                    </ul>
                    <section style={styles.sectionShadow}>
                        <p style={styles.description} >Donec ullamcorper nulla non metus auctor fringilla. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Sed posuere consectetur est at lobortis.</p>
                        <div style={styles.textCenter}>
                            <h3 style={styles.textCenter}>Behavior Radar Chart</h3>
                            <RadarChart data={objRadar} width="500" height="500"/>
                        </div>
                    </section>
                    <a href={"#/applist/"+this.props.category+"/"+this.props.appid+"/appscan/treemap"}>asd</a>


		          </div>
		        </div>
		      </div>
			);
	}
});

module.exports = Radium(AppScanPage);
