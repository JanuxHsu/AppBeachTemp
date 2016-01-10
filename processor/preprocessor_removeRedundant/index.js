var fs = require('fs');
var _ = require('lodash');
var async = require('async');


var directories = fs.readdirSync(__dirname);

directories = _.filter(directories, function (date) {
  return !date.match(/^\./) && !date.match(".json") && !date.match(".js") && !date.match("node_modules");
});

directories.forEach(function(directory) {
  var currentDirPath = __dirname + '/' + directory + '/output';
  var apps = fs.readdirSync(currentDirPath);
  doubleApps = _.filter(apps, function (app) {
    return app.match(/^selfDouble-m-/);
  });
  tripleApps = _.filter(apps, function (app) {

    return app.match(/^selfTriple-m/);
  });

  doubleApps = doubleApps.map(function(appResultName) {
    var stats = fs.statSync(currentDirPath + '/' + appResultName);

    return {
      appPath : currentDirPath + '/' + appResultName,
      size : stats.size
    };
  });

  tripleApps = tripleApps.map(function(appResultName) {
    var stats = fs.statSync(currentDirPath + '/' + appResultName);

    return {
      appPath : currentDirPath + '/' + appResultName,
      size : stats.size
    };
  });



  doubleAppsToDel = _.sortBy(doubleApps, 'size');
  doubleAppsToDel = _.dropRight(doubleAppsToDel, 1);

  tripleAppsToDel = _.sortBy(tripleApps, 'size');
  tripleAppsToDel = _.dropRight(tripleAppsToDel, 1);
  // tripleApps = _.sortBy(doubleApps, 'size');

  tripleAppsToDel.forEach(function(delApp) {
    fs.unlink(delApp.appPath, function(err) {
      if(err) {
        console.log(err);
      }
    });
  });

  doubleAppsToDel.forEach(function(delApp) {
    fs.unlink(delApp.appPath, function(err) {
      if(err) {
        console.log(err);
      }
    });
  });

});
