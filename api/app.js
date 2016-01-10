'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debugDB = require('debug')('Database');
var mongoose = require('mongoose');
var DB_URL = process.env.DB_URL || 'mongodb://140.119.19.90:27117/appbeach';

debugDB('Connect to %s', DB_URL);
mongoose.connect(DB_URL, {
  server: {
    auto_reconnect: true
  }
});
mongoose.connection.on('connecting', function () {
  debugDB('Connecting...');
});
mongoose.connection.on('connected', function () {
  debugDB('Connected to MongoDB.');
});
mongoose.connection.once('open', function () {
  debugDB('Connection opened.');
});
mongoose.connection.on('error', function (err) {
  debugDB('Error ', err);
});
mongoose.connection.on('disconnected', function () {
  debugDB('Disconnected. Retry...');
  mongoose.connect(process.env.DB_URL || 'mongodb://140.119.19.90:27117/appbeach', {
    server: {
      auto_reconnect: true
    }
  });
});
mongoose.connection.on('reconnected', function () {
  debugDB('Reconnect successful.');
});


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//Cross Domain
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // For Dev
  // res.header('Access-Control-Allow-Origin', '*.dev.rytass.com');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Max-Age', 1209600);
  next();
});

//ar test = require('./routes/test.js');

//Routing
app.use('/apps', require('./routes/apps'));
// app.use('/apps', require('./routes/appsClass'));
app.use('/apps', require('./routes/appsSelf'));
//Save Topic
app.use('/topiclist', require('./routes/topiclist'));
//Save app complex
app.use('/appInfo', require('./routes/appInfo'));
//save app cluster
app.use('/appCluster', require('./routes/appCluster'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
