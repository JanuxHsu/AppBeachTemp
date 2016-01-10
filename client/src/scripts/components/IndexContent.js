var React = require('react');
var ImageBox = require('./ImageBox');
var Radium = require('radium');


var IndexContent = React.createClass({
  render: function(){
    var style = {
      sectionContent : {
        width : '100%'
      },
      imageWrapper : {
        width : '100%',
        pading : '0px',
        margin : '0px'
      },
      title : {
        fontWeight : 'bold',
        color: '#268595',
        textShadow: '1px 1px 1px #268595'
      },
      divide : {
        borderTop: '2px solid #27A2AB'
      },
      description : {
        color : '#176875',
        textAlign : 'justify',
        lineHeight : '30px',
        fontWeight : '200',
        fontSize : '16px'
      }
    };
    return (
      <div className="section-content" data={this.props.data}>
        {
          this.props.data.map(function(data){

            return (
              <div>
                <div>
                  <div style={style.fontColor}>
                    <h2  style={style.title}>{data.title}</h2>
                    <hr style={style.divide} />
                    <p style={style.description}>{data.description}</p>
                    <div style={style.imageWrapper}>
                     <ImageBox data={data.content}/>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      );
  }
});



module.exports = Radium(IndexContent);
