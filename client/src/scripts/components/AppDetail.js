var React = require('react');
var Radium = require('radium');
var LeftImageColumn = require('./LeftImageColumn');
// var appData = require('../stores/appsStore');

var styles = {
  btnWrapper: {
    float: "right",
  },
  btn: {
    marginRight: "10px"
  },
  title : {
    fontWeight : 'bold',
    color: '#268595',
    textShadow: '1px 1px 1px #268595'
  },
  subtitle : {
    fontWeight : 'bold',
    color: '#268595',
    textShadow: '0px 0px 0.5px #268595',
    fontSize : "14px"
  },
  description : {
    color : '#176875',
    textAlign : 'justify',
    lineHeight : '30px',
    fontWeight: "300",
    fontFamily: "Lato, sans-serif",
    fontSize: "1.6rem",
    verticalAalign: "baseline",
    margin : "15px 0px"
  },
  divide : {
    borderTop: '2px solid #27A2AB'
  },
  category: {
    fontWeight: "bold"
  }
};
var AppDetail = React.createClass({

  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <LeftImageColumn data = {this.props.data}/>
          </div>
          <div className="col-md-10">
            <h2 style={styles.title}>{this.props.data.trackName}</h2>
            <div className="row">
              <div className="col-md-12">
                <div style={styles.subtitle}>
                  Category:
                </div>
                    {this.props.data.primaryGenreName}
                <div style={styles.subtitle}>
                Content Advisory Rating :
                </div>
                {this.props.data.contentAdvisoryRating}<i className="fa fa-star fa-fw"></i>
              <div style={styles.subtitle}>
                  User Rating Count For Current Version :
                </div>
                {this.props.data.userRatingCountForCurrentVersion}<i className="fa fa-thumbs-up fa-fw"></i>
              </div>
            </div>
          </div>
        </div>
        <hr style={styles.divide} />

        <div className="row">
          <div className="col-md-12">
            <div style={styles.subtitle}>
                Description:
              </div>
              <p style={styles.description}>
                {this.props.data.description}
              </p>
          </div>
        </div>


      </div>
    );
  }
});

module.exports = Radium(AppDetail);
