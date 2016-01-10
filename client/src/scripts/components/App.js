var React = require('react');
var Router = require('react-router-component');

var index = require('./Index');
var AppList = require('./AppList');
var SiteHeader = require('./SiteHeader');
var Footer = require('./Footer');
var AppPage = require('./AppPage');
var TechnicPage = require('./TechnicPage');
var PrivacyPage = require('./PrivacyPage')
var CallSequencePage = require('./CallSequencePage');
var ClusterPage = require('./ClusterPage');


var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var App = React.createClass({

  render: function() {
    return (
    <div>
    	<SiteHeader />
    	<Locations hash>
		    <Location path="/" handler={index} />
		    <Location path="/applist/:category" handler={AppList}/>
        <Location path="/applist/:category/pages/:pageNum" handler={AppList}/>
		    <Location path="/applist/detail/:appid" handler={AppPage} />
        <Location path="/cluster/:catalog" handler={ClusterPage} />
        <Location path="/callseq" handler={CallSequencePage} />
        <Location path="/technic" handler={TechnicPage} />
        <Location path="/privacy" handler={PrivacyPage} />
        <NotFound handler={index} />
      </Locations>
      <Footer />
    </div>
    );
  }
});



React.render(React.createElement(App), document.body);
//module.exports = App;
