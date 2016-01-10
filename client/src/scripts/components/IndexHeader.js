var React = require('react');

var IndexHeader = React.createClass({
  render: function(){
    return (
      <header>
        <h1 className="text-center">AppBeach</h1>
        <h3 className="text-center">Discover behaviors of iOS apps with static binary analysis</h3>
        <br />
        <br />
      </header>

      );
  }
});



module.exports = IndexHeader;
