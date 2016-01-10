var React = require('react');
var Radium = require('radium');



var SearchBar = React.createClass({
  render: function(){
    return (
      <div className="input-group">
            <input type="text" placeholder="Find App" className="form-control" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-default">AppScan</button>
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a href="#">AppScan</a></li>
                <li><a href="#">AppReco</a></li>
                <li><a href="#">AppSync</a></li>
              </ul>
            </div>
          </div>
      )
  }
});




module.exports = Radium(SearchBar);
