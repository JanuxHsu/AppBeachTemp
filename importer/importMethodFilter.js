var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', console.info.bind(console, 'connection connected'));

mongoose.connect('mongodb://140.119.19.90:27117/appbeach', function (err) {
  if (err) {
    throw err;
  } else {
    main();
  }
});

var Schema = mongoose.Schema;



var selfDoubleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});
var selfTripleSchema = new Schema({
  appId: {
    type: String,
    index: true
  },
  data: []
});



var ApplicationSelfDouble = mongoose.model('ApplicationSelfDouble', selfDoubleSchema);
var ApplicationSelfTriple = mongoose.model('ApplicationSelfTriple', selfTripleSchema);

var queues = [];

//read file dir
function main() {
  var PATH = "/Users/wangweiren/Desktop/import2";
  var apps = fs.readdirSync(PATH);
  apps = _.filter(apps, function (date) {
    return !date.match(/^\./);
  });


  //directory
    apps.forEach(function (app, appIndex) {
      //app directory
      var files = fs.readdirSync( PATH +'/' + app + '/output');

      files = _.filter(files, function (file) {
              return file.match(/(^self)/);
            });

      var collections = {};

      files.forEach(function (file) {
            var data = fs.readFileSync(PATH +'/' + app + '/output/' + file, {
              encoding: 'utf8'
            });


            var lines = data.split(/\n/);
            lines.pop();

            lines.forEach(function (line, idx) {
              var d = line.split(/\t/);
              var keys = JSON.parse(d[0]);

              lines[idx] = {
                hotkey: JSON.parse(d[0]),
                value: d[1]
              }
            });

            collections[file.replace(/-m-[0-9]+/,'')] = lines;

          });


        var appSD = new ApplicationSelfDouble({
          appId: app,
          data: collections.selfDouble || []
        });
        var appST = new ApplicationSelfTriple({
          appId: app,
          data: collections.selfTriple || []
        });

        console.log('Saving', appST.appId, appIndex + '/' + apps.length);
        async.parallel({
          appSD: appSD.save,
          appST: appST.save,
        }, function (err, result) {
          if (err) {
            throw err;
          } else {
            console.log('Saved');
          }
        });
    });

}
