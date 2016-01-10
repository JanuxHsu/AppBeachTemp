var React = require('react');
var Radium = require('radium');


var ImageBox = React.createClass({

  render: function(){

    var style = {
      imageBoxWrapper : {
        display : 'flex',
        width : '100%'
      },
      imageHandler : {
        marginTop : "20px",
        margin :"0px auto",
        height : '260px',
        textAlign : 'center',
      },

      image : {
        padding : '30px',
        width: '260px',
        height: '100%',
        ':hover' : {
          cursor : 'pointer',
          transform: 'rotate(360deg)',
          transition: 'opacity 1s linear, transform 0.5s ease-out'
        }
      },
      step : {
        color : "#268595",
        width: '220px',
        position: 'absolute',
        transform: 'translate(-240px, 0px)'
      }
    };

    return (

      <div style={style.imageBoxWrapper}>
        <div style={style.imageHandler}>

        {
          this.props.data.map(function(data) {
            return (
              <img key={data.url} style={style.image} src={data.url}>
                <span style={style.step}>{data.step}</span>
              </img>
      			)
          })
        }
        </div>
  		</div>
    )
  }
});



module.exports = Radium(ImageBox);
