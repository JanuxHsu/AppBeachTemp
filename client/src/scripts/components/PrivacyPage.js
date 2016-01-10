var React = require('react');
var Radium = require('radium');

var styles = {
  titleWrapper: {
    textAlign : "center",
    margin: "25px"
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
  }

};

var PrivacyPage = React.createClass({

  render: function(){
    return (
      <div className="container app-page">
        <div className="row">
          <div className="col-md-12" style={styles.titleWrapper}>
            <h2 style= {styles.title}>
              Privacy
            </h2>
          </div>
        </div>
        <div className="row">

          <div  className="col-md-12">

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Radium(PrivacyPage);
