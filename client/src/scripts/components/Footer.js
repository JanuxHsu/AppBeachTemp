var React = require('react');
var Radium = require('radium');
var $ = require('jquery');
var Footer = React.createClass({
  componentDidMount : function() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
  },
  scrollToTop : function() {
    return function() {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
    };
  },
  render: function(){
    var styles = {
      slelectable : {
        cursor : "pointer"
      }
    }

    return (
      <footer className="container">
      <div className="row">
      		<hr className="featurette-divider" />
	        <p className="pull-right"><a style={styles.slelectable} onClick={this.scrollToTop()}>Back to top</a></p>
	        <p>© 2015 SOSLAB <a href="#/privacy">Privacy</a> · <a href="#/privacy">Terms</a></p>
	        </div>
	   </footer>
    );
  }
});



module.exports = Radium(Footer);
