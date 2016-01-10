require('bootstrap-webpack');
require('../assets/stylesheets/style.css');

// TODO: Require assets here.
// require('../assets/images/product.png');

var App = require('./components/App.js');
var React = require('react');

React.render(<App />, document.getElementById('main'));
