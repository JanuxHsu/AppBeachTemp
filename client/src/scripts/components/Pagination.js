var React = require('react');
var Radium = require('radium');

var Pagination = React.createClass({
  pre : function() {
    this.props.previous();
  },
  next : function() {
    this.props.next();
  },
  render: function(){
    return (
      <nav>
  		  <ul className="pagination">
  		    <li className= {(this.props.currentPage < 2) ? "disabled" : "selectable"} onClick = {this.pre}>
            <span aria-hidden="true">&laquo;</span>
          </li>
  		    <li className=""><a href="#"> {this.props.currentPage} <span className="sr-only">(current)</span></a></li>
  		    <li className= {(this.props.isLastPage) ? "disabled" : "selectable"} onClick = {this.next}>
            <span aria-hidden="true">&raquo;</span>
          </li>
  		  </ul>
  		</nav>
    );
  }
});



module.exports = Radium(Pagination);
