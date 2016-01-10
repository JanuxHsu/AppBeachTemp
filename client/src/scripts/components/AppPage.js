var React = require('react');
var Radium = require('radium');
var Router = require('react-router-component');
var TilfordTree = require('./TilfordTree');
var AppClusterBubbleChart = require("./AppClusterBubbleChart");
var RiskBarSection = require('./RiskBarSection');
var RiskData = require('../stores/RiskStore');

var AppDetail = require('./AppDetail');
var LeftImageColumn = require('./LeftImageColumn');

var SingleStore = require('../stores/SingleStore');
var SingleActions = require('../actions/SingleActions');

var UrlPattern = require('url-pattern');
var pattern = new UrlPattern('/applist/:category/:appid');


var styles = {
  tabWrapper: {

  },
  btn: {
    backgroundColor : "rgba(0,0,0, 0.065)",
    fontSize : "16px",
    fontWeight : "500",
    marginRight: "10px",
    ":hover" : {
      backgroundColor : "rgba(125, 147, 164, 0.2)",
      cursor : "pointer",
      textShadow: '1px 1px 1px #268595',
      color : "#268595",
      boxShadow:"inset 0px -0.5px 1px rgb(66, 105, 134)",
      filter: "opacity(0.5) brightness(0.8) contrast(2) "
    }
  },
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
  reco : {
    display : "block"
  },
  syn : {
    display : "block"
  },
  scan : {
    display : "block"
  },
  hide : {
    display : "none"
  }

};

var AppPage = React.createClass({
  mixins: [ Router.NavigatableMixin ],

  getInitialState: function() {
    var params = pattern.match(this.getPath());

    return {
      category : params.category,
      appId : params.appid,
      data : SingleStore.get(),
      isScanShow : true,
      isRecoShow : false,
      isSynShow :false,
      riskData: RiskData.getInit()
    };
  },
  componentDidMount: function() {
    SingleStore.addChangeListener(this._onChange);
    SingleActions.fetch(this.state.appId);
  },
  componentWillUnmount: function() {
    SingleStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      data: SingleStore.get(),
    });
  },
  setShowBlock : function(area) {
    var ctx = this;
    return function() {
      switch (area) {
      case "reco":
        ctx.setState({
          isScanShow : false,
          isRecoShow : true,
          isSynShow :false
        });
        break;
      case "syn":
        ctx.setState({
          isScanShow : false,
          isRecoShow : false,
          isSynShow :true
        });
        break;
      case "scan":
        ctx.setState({
          isScanShow : true,
          isRecoShow : false,
          isSynShow :false
        });
        break;
      }
    }
  },
  render: function(){

    return (
      <div className="container app-page">
        <div className="row">
          <div className="col-md-12">
            <AppDetail data={this.state.data}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs nav-justified" style={styles.tabWrapper}>
              <li onClick = {this.setShowBlock("scan")}>
                <a key="tab-btn-1" style={styles.btn}>AppScan</a>
              </li>
              <li onClick = {this.setShowBlock("reco")}>
                <a key="tab-btn-2" style={styles.btn}>AppReco</a>
              </li>
            </ul>
          </div>
          <div  className="col-md-12">
            <div style = {(this.state.isScanShow)? styles.scan : styles.hide}>
              <div id="container">
                <h5>Private Data Access Sequence Tree : </h5>
                <TilfordTree treeName="privateDataDouble" treeType ="double" appId = {this.state.appId}/>
                <TilfordTree treeName="privateDataTriple" treeType ="triple" appId = {this.state.appId}/>
              </div>
            </div>
            <div style = {(this.state.isRecoShow)? styles.reco : styles.hide}>
              <div className="col-md-12">
                <AppClusterBubbleChart />
                <RiskBarSection data={this.state.riskData} />
              </div>
            </div>
            <div style = {(this.state.isSynShow)? styles.syn : styles.hide}>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// <CollapsibleTree
//   double = { ("double" in this.state.treeData) ? this.state.treeData.double : {double : {} } }
//   triple = { ("triple" in this.state.treeData) ? this.state.treeData.triple : {triple : {} } }
// />
module.exports = Radium(AppPage);
