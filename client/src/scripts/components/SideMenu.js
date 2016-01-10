var React = require('react');
var Radium = require('radium');

var SideMenu = React.createClass({
	componentDidMount: function() {
      	var $sidebar   = $(".sidebar"), 
	        $window    = $(window),
	        offset     = $sidebar.offset(),
	        topPadding = 15;

	    $window.scroll(function() {
	        if ($window.scrollTop() > offset.top) {
	            $sidebar.stop().animate({
	                marginTop: $window.scrollTop() - offset.top + topPadding
	            }, 100);
	        } else {
	            $sidebar.stop().animate({
	                marginTop: 0
	            });
	        }
	    });
    },
	render: function(){
		var items = this.props.data.map(function(item){
			return (
				<li target={item.id}>{item.name}</li>
				);
		});
		return (
			<ul>
			{items}
			</ul>
			);
	}
});
module.exports = Radium(SideMenu);

