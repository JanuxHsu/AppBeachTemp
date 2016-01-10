var red = "rgb(191,97,106)",
    blue = "rgb(91,144,191)",
    orange = "rgb(208,135,112)",
    yellow = "rgb(235,203,139)",
    green = "rgb(163,190,140)",
    teal = "rgb(150,181,180)",
    pale_blue = "rgb(143,161,179)",
    purple = "rgb(180,142,173)",
    brown = "rgb(180,142,173)",
    gray = "#696969";

var red_h = "rgba(191,97,106, 0.5)",
    blue_h = "rgba(91,144,191, 0.5)",
    orange_h = "rgba(208,135,112, 0.5)",
    yellow_h = "rgba(235,203,139, 0.5)",
    green_h = "rgba(163,190,140, 0.5)",
    teal_h = "rgba(150,181,180, 0.5)",
    pale_blue_h = "rgba(143,161,179, 0.5)",
    purple_h = "rgba(180,142,173, 0.5)",
    brown_h = "rgba(180,142,173, 0.5)";

var colour = {
    "Facebook": blue,
    "Twitter": orange,
    "Weibo": red,
    "Share": yellow,
    "Instagram": green,
    "Line": purple
};
var DoughnutChart = {
    items: [{
        "catalog": "social",
        "content": [{
            "color": colour["Twitter"],
            "highlight": gray,
            "label": "Twitter",
            "value": 15.0
        }, {
            "color": colour["Weibo"],
            "highlight": gray,
            "label": "Weibo",
            "value": 19.0
        }, {
            "color": colour["Share"],
            "highlight": gray,
            "label": "Share",
            "value": 1.0
        }, {
            "color": colour["Instagram"],
            "brown": gray,
            "label": "Instagram",
            "value": 2.0
        }, {
            "color": colour["Line"],
            "highlight": gray,
            "label": "Line",
            "value": 2.0
        }]
    }, {
        "catalog": "sports",
        "content": [{
            "color": colour["Facebook"],
            "highlight": gray,
            "label": "Facebook",
            "value": 30.0
        }, {
            "color": colour["Twitter"],
            "highlight": gray,
            "label": "Twitter",
            "value": 5.0
        }, {
            "color": colour["Weibo"],
            "highlight": gray,
            "label": "Weibo",
            "value": 20.0
        }, {
            "color": colour["Share"],
            "highlight": gray,
            "label": "Share",
            "value": 2.0
        }, {
            "color": colour["Instagram"],
            "brown": gray,
            "label": "Instagram",
            "value": 1.0
        }, {
            "color": colour["Line"],
            "highlight": gray,
            "label": "Line",
            "value": 2.0
        }]
    }, {
        "catalog": "kid",
        "content": [{
            "color": colour["Facebook"],
            "highlight": gray,
            "label": "Facebook",
            "value": 10.0
        }, {
            "color": colour["Twitter"],
            "highlight": gray,
            "label": "Twitter",
            "value": 25.0
        }, {
            "color": colour["Weibo"],
            "highlight": gray,
            "label": "Weibo",
            "value": 10.0
        }, {
            "color": colour["Share"],
            "highlight": gray,
            "label": "Share",
            "value": 10.0
        }, {
            "color": colour["Instagram"],
            "brown": gray,
            "label": "Instagram",
            "value": 1.0
        }, {
            "color": colour["Line"],
            "highlight": gray,
            "label": "Line",
            "value": 3.0
        }]
    }],

    getAll: function(){
        return this.items;
    },

    fetchCertainCategory: function(category){
        var obj;
        this.items.map(function(data){
          if(data.catalog == category){
            obj = data;
          }
        });
        return obj;
    }

};
module.exports = DoughnutChart;
