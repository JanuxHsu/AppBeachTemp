var React = require('react');
var Radium = require('radium');

var List = React.createClass({
  render: function() {
    var styles = {
      area : {
        backgroundColor: "rgba(125, 147, 164, 0.2)",
        border: "none",
        borderRadius: "4px"
      },
      image : {
        ":hover" : {
          filter: "blur(0.5px) brightness(0.8) contrast(2) saturate(2.5)"
        }
      },
      imageGrid : {
        borderRadius: "5px",
        backgroundColor : "rgba(0, 0, 0, 0.075)",
        padding : "0px",
        ":hover" : {
          backgroundColor : "rgba(255,255,255, 0.5)",
        }
      }
    }
    return (
      <div className="well well-lg" style= {styles.area}>
        <div className="row">
          {
            this.props.appList.map(function(app, index) {
              var category = ('primaryGenreName' in app) ? app.primaryGenreName.trim() : '';
              return (
                <div className="col-xs-6 col-md-3">
                  <div key={"imageNail"+index} className="thumbnail" style = {styles.imageGrid}>
                    <a href={"#/applist/detail/"+app.appId} >
                      <img key={"image"+index} style= {styles.image} src={app.artworkUrl512} alt="..." />
                      <div className="caption">
                        <h5 className="text-center">
                          {
                            (app.trackName.length > 9) ? app.trackName.substring(0,9) + '...' : app.trackName
                          }
                        </h5>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
});



module.exports = Radium(List);
