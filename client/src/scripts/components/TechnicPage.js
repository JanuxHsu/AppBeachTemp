var React = require('react');
var Radium = require('radium');
var Router = require('react-router-component');
var TechnicReco = require('./TechnicReco');
var styles = {
  titleWrapper: {

    textAlign : "center",
    margin: "25px"
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
    textShadow: '1px 1px 1px #268595',
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
    display : "block",

  },
  syn : {
    display : "block",

  },
  scan : {
    display : "block",

  },
  hide : {
    display : "none"
  },
  btnActive : {
    textShadow: '1px 1px 1px #268595',
    color : "#268595",
    fontSize : "16px",
    filter: "opacity(1) brightness(0.8) contrast(1.5) "
  },
  btnCommon : {

  }

};

var TechnicPage = React.createClass({
  mixins: [ Router.NavigatableMixin ],
  getInitialState: function() {
    return {
      isScanShow : true,
      isRecoShow : false,
      isSynShow :false
    };
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
          <div className="col-md-12" style={styles.titleWrapper}>
            <h2 style= {styles.title}>
              iOS Excutable Application Analysis Method And Structure
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs nav-justified" style={styles.tabWrapper}>
              <li style={(this.state.isScanShow)? styles.btnActive : styles.btnCommon} onClick = {this.setShowBlock("scan")}>
                <a key="tab-btn-1" style={styles.btn}>AppScan</a>
              </li>
              <li style={(this.state.isRecoShow)? styles.btnActive : styles.btnCommon} onClick = {this.setShowBlock("reco")}>
                <a key="tab-btn-2" style={styles.btn}>AppReco</a>
              </li>
            </ul>
          </div>
          <div  className="col-md-12">
            <div style = {(this.state.isScanShow)? styles.scan : styles.hide}>
              <img src="http://i.imgur.com/0S8dHuH.png"/>
            </div>
            <div style = {(this.state.isRecoShow)? styles.reco : styles.hide}>
              <TechnicReco/>
            </div>
            <div style = {(this.state.isSynShow)? styles.syn : styles.hide}>
              456
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Radium(TechnicPage);
