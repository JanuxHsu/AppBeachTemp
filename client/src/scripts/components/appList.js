var React = require('react');
var Radium = require('radium');
var Router = require('react-router-component');

var SideNav = require('./SideNav');
var SideNavUl = require('./SideNavUl');
var List = require('./List');
var SearchBar = require('./SearchBar');
var Pagination = require('./Pagination');
var LeftImageColumn = require("./LeftImageColumn.js");


var ListActions = require('../actions/ListActions.js');
var ListStore = require('../stores/ListStore.js');


var UrlPattern = require('url-pattern');

var sidenav = [{
  "catalog": "Business",
  "catalogId": "6000",
  "abbr": "business"
}, {
  "catalog": "Weather",
  "catalogId": "6001",
  "abbr": "weather"
}, {
  "catalog": "Utilities",
  "catalogId": "6002",
  "abbr": "utilities"
}, {
  "catalog": "Travel",
  "catalogId": "6003",
  "abbr": "travel"
}, {
  "catalog": "Sports",
  "catalogId": "6004",
  "abbr": "sports"
}, {
  "catalog": "Social Networking",
  "catalogId": "6005",
  "abbr": "socialnetworking"
}, {
  "catalog": "Reference",
  "catalogId": "6006",
  "abbr": "reference"
}, {
  "catalog": "Productivity",
  "catalogId": "6007",
  "abbr": "productivity"
}, {
  "catalog": "Photo & Video",
  "catalogId": "6008",
  "abbr": "photo-video"
}, {
  "catalog": "News",
  "catalogId": "6009",
  "abbr": "news"
}, {
  "catalog": "Navigation",
  "catalogId": "6010",
  "abbr": "navigation"
}, {
  "catalog": "Music",
  "catalogId": "6011",
  "abbr": "music"
}, {
  "catalog": "Lifestyle",
  "catalogId": "6012",
  "abbr": "lifestyle"
}, {
  "catalog": "Health & Fitness",
  "catalogId": "6013",
  "abbr": "health-fitness"
}, {
  "catalog": "Games",
  "catalogId": "6014",
  "abbr": "games"
}, {
  "catalog": "Finance",
  "catalogId": "6015",
  "abbr": "finance"
}, {
  "catalog": "Entertainment",
  "catalogId": "6016",
  "abbr": "entertainment"
}, {
  "catalog": "Education",
  "catalogId": "6017",
  "abbr": "education"
}, {
  "catalog": "Books",
  "catalogId": "6018",
  "abbr": "books"
}, {
  "catalog": "Medical",
  "catalogId": "6020",
  "abbr": "medical"
}, {
  "catalog": "Catalogs",
  "catalogId": "6022",
  "abbr": "catalogs"
}, {
  "catalog": "Food & Drink",
  "catalogId": "6023",
  "abbr": "food-drink"
}, {
  "catalog": "Shopping",
  "catalogId": "6024",
  "abbr": "shopping"
}];

var styles ={
  sidebar: {
    position: 'fixed',
    top: '70px',
    bottom: 0,
    left: 0,
    zIndex: 1000,
    display: 'block',
    padding: '20px',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #eeeeee'
  }
};

var pattern = new UrlPattern('/applist/:category');
var patternWithPaged = new UrlPattern('/applist/:category/pages/:pageNum');

var regexPattern = /applist\/[a-z|-]+\/pages\//;

var AppList = React.createClass({
  mixins: [ Router.NavigatableMixin ],

	getInitialState: function() {

    var match = this.getPath().match(regexPattern);
    if (!match) {
      //with category no paged
      var params = pattern.match(this.getPath());

      if(params.category=== "all") {
    	  return {
          category : params.category,
          currentPage : 1,
          isLastPage : false,
          skip : 1060,
          limit : 40,
          data: ListStore.getAll(),
          sidenav: sidenav
        };
      } else {
        return {
          category : params.category,
          currentPage : 1,
          isLastPage : false,
          skip : 0,
          limit : 40,
          data: ListStore.getAll(),
          sidenav: sidenav
        };
      }

    } else {
      var params = patternWithPaged.match(this.getPath());
      var page = (parseInt(params.pageNum, 10) && parseInt(params.pageNum, 10) > 0 ) ? parseInt(params.pageNum, 10)-1 : 0;

      if(params.category=== "all") {
    	  return {
          category : params.category,
          currentPage : page +1,
          isLastPage : false,
          skip : 1060 + 40* page,
          limit : 40,
          data: ListStore.getAll(),
          sidenav: sidenav
        };
      } else {
        return {
          category : params.category,
          currentPage : page +1,
          isLastPage : false,
          skip : 40* page,
          limit : 40,
          data: ListStore.getAll(),
          sidenav: sidenav
        };
      }

    }


	},
	componentDidMount: function() {
      ListStore.addChangeListener(this._onChange);
      ListActions.fetch(this.state.category, this.state.skip, this.state.limit);
  },
  componentWillUnmount: function() {
      ListStore.removeChangeListener(this._onChange);
  },
  nextPage : function() {
    this.navigate('/applist/'+this.state.category+'/pages/'+ parseInt(this.state.currentPage + 1));
    location.reload();
  },
  previousPage : function() {
    this.navigate('/applist/'+this.state.category+'/pages/'+ parseInt(this.state.currentPage - 1));
    location.reload();
  },
  _onChange: function() {
    var data = ListStore.getAll();
    this.setState({
      data: data,
      isLastPage : (data.length < 40) ? true : false,
    });
  },
	render: function(){
    var styles = {
      slelectable : {
        ':hover' : {
          cursor : 'pointer'
        }
      },
      center : {
        'textAlign' : 'center'
      }
    };
		return (
			<div className="container appList">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <SideNavUl content={this.state.sidenav} apps={this.state.data} clickEvent="true" />
            </div>
          </div>
          <div className="col-md-9">
            <section>
              <br />
              <List appList={this.state.data} />
              <nav style={styles.center}>
          		  <ul className="pagination">
          		    <li className= {( this.state.currentPage < 2) ? "disabled" : "slelectable" } onClick = {( this.state.currentPage < 2) ? null : this.previousPage }>
                    <a key = "left" style={( this.state.currentPage < 2) ? null: styles.slelectable }>
                      <i className="fa fa-arrow-left"></i>
                    </a>
                  </li>
          		    <li  className=""><a > {this.state.currentPage} <span className="sr-only">(current)</span></a></li>
          		    <li className= {( this.state.isLastPage ) ? "disabled" : "slelectable" } onClick = { ( this.state.isLastPage ) ? null : this.nextPage}>
                    <a key = "right" style={( this.state.isLastPage ) ? null : styles.slelectable } >
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </li>
          		  </ul>
          		</nav>
             </section>
          </div>
        </div>
      </div>
		);
	}
});



module.exports = Radium(AppList);
