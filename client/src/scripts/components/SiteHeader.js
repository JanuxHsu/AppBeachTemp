var React = require('react');
var Radium = require('radium');
var styles = {
  nav: {
    borderRadius: "0px",
    backgroundColor: "#2A333C",
    borderColor: "#2A333C"
  },
  font: {
  	color: "#ffffff"
  }
};


var SiteHeader = React.createClass({

  render: function() {
    return (
     <nav className="navbar navbar-inverse" style={styles.nav}>
	  <div className="container-fluid">

	    <div className="navbar-header">
	      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span className="sr-only">Toggle navigation</span>
	        <span className="icon-bar"></span>
	        <span className="icon-bar"></span>
	        <span className="icon-bar"></span>
	      </button>
	      <a style={styles.font} className="navbar-brand" href="#">AppBeach</a>
	    </div>

	    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul className="nav navbar-nav">
	        <li><a style={styles.font} href="#/applist/all">Apps</a></li>
	        <li><a style={styles.font} href="#/technic">Technic</a></li>
	        <li><a style={styles.font} href="#/cluster/social">Cluster</a></li>
	        <li><a style={styles.font} href="#/callseq">AppScan - App Sequence Call Analysis</a></li>
	      </ul>
	    </div>
	  </div>
	</nav>
    )
  }
});



module.exports = Radium(SiteHeader);
