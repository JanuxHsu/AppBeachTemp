var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var filterJSON = require('./frameworkNameList/PrivateDataAccessNameList.json')
var exec = require( 'child_process' ).exec;

var directories = fs.readdirSync(__dirname);

directories = _.filter(directories, function (date) {
  return !date.match(/^\./) && !date.match(".json") && !date.match(".js") && !date.match("node_modules") && !date.match('frameworkNameList');
});

directories.forEach(function(directory) {

  var currentDirPath = __dirname + '/' + directory + '/output';
  var resultWritePath = __dirname + '/' + directory +'/result';

  fs.mkdirSync(resultWritePath, 0777);


  var apps = fs.readdirSync(currentDirPath);

  doubleApps = _.filter(apps, function (app) {
    return app.match(/^selfDouble-m-/);
  });
  tripleApps = _.filter(apps, function (app) {
    return app.match(/^selfTriple-m/);
  });

  var doubleCollention = {};
  if(doubleApps.length) {
    var doubleData = fs.readFileSync(currentDirPath  + '/'+ doubleApps, {
      encoding: 'utf8'
    });


    var lines = doubleData.split(/\n/);
    lines.pop();

    lines.forEach(function (line, idx) {
      var d = line.split(/\t/);
      var keyword = JSON.parse(d[0]);
      var count = d[1];

      var firstResult = isMatch(keyword.frameworkName, keyword.className, keyword.methodNames[0]);
      var SecondResult = isMatch(keyword.frameworkName, keyword.className, keyword.methodNames[1]);
      var firstResult = (firstResult) ? keyword.methodNames[0]+'_' : "SEQ0_";
      var SecondResult = (SecondResult) ? keyword.methodNames[1] : "SEQ1";
      var key = firstResult+SecondResult;
      if ( key in doubleCollention ) {
        doubleCollention[key] = parseInt(doubleCollention[key]) + parseInt(count);
      } else {
        doubleCollention[key] = parseInt(count);
      }

    });
  }

  var tripleCollection = {};
  if(tripleApps.length) {
    var tripleData = fs.readFileSync(currentDirPath  + '/'+ tripleApps, {
      encoding: 'utf8'
    });


    var lines = tripleData.split(/\n/);
    lines.pop();

    lines.forEach(function (line, idx) {
      var d = line.split(/\t/);
      var keyword = JSON.parse(d[0]);
      var count = d[1];

      var firstResult = isMatch(keyword.frameworkName, keyword.className, keyword.methodNames[0]);
      var SecondResult = isMatch(keyword.frameworkName, keyword.className, keyword.methodNames[1]);
      var ThirdResult = isMatch(keyword.frameworkName, keyword.className, keyword.methodNames[2]);
      var firstResult = (firstResult) ? keyword.methodNames[0]+'_' : "SEQ0_";
      var SecondResult = (SecondResult) ? keyword.methodNames[1]+'_' : "SEQ1_";
      var ThirdResult = (ThirdResult) ? keyword.methodNames[2] : "SEQ2";
      var key = firstResult+SecondResult+ThirdResult;
      if ( key in tripleCollection ) {
        tripleCollection[key] = parseInt(tripleCollection[key]) + parseInt(count);
      } else {
        tripleCollection[key] = parseInt(count);
      }
    });
  }


  fs.writeFile(resultWritePath +'/double.json', JSON.stringify(doubleCollention, null, 2), 'utf8', function(err) {
    console.log("DONE:" + resultWritePath + '/double.json');
  });


  fs.writeFile(resultWritePath +'/triple.json', JSON.stringify(tripleCollection, null, 2), 'utf8', function(err) {
    console.log("DONE:" + resultWritePath +'/triple.json');
  });



});

function isMatch(frameWork, className, methodName) {
  var methodNames = filterJSON[frameWork].classes[className].methodNames;
  var result = _.find(methodNames, function(method) {
    return (method == methodName);
  });
  if(result) {
    return methodName;
  } else {
    return false;
  }

}
