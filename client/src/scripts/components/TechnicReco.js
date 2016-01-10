var React = require('react');
var Radium = require('radium');

var styles = {
	imgStyle: {
		width: "100%",
		
	}
}

var TechnicReco = React.createClass({

  render: function() {
    return (
     <div>
     <p>
     The architecture of AppReco is shown in Figure 1. 
     We could divide architecture into three parts: 
     The first part which is from collecting application to 
     count the possibility to perform the certain behavior is static 
     binary code analyzing in the section IV. It contains downloading apps, 
     installing apps, decrypting apps, disassembling app, malicious behaviors, behaviors count checking; The second part which is from gathering description to app clustering is clustering apps by descriptions in the section V. It contains description preprocess, topic analysis with LDA, GHSOM(The Growing Hierarchical Self-Organizing Map) clustering; The last part which sums the results before and gets recommendation apps is rating apps with behaviors. It contains our rating formula and computation processing. We would elaborate the three parts mentioned above in the following paragraphs.
     </p>
     <div className="col-md-6 col-md-offset-3">
     	<img style={styles.imgStyle} src="http://i.imgur.com/gdE2dpF.png?1" />
     </div>
     </div>
    )
  }
});



module.exports = Radium(TechnicReco);
