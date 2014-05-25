var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');  // Logs con IP y datos del navegador
var methodOverride = require('method-override');
var session = require('express-session');
var auth = require('./auth');

var passport = auth.passport;

  


  var app = express();

// configure Express
  app.set('views', __dirname + './../views');
  app.set('view engine', 'jade');
  // app.use(logger()); // Esta es la cosa que llena todo de logs ¬¬
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);
  app.use(express.static(__dirname + './../public'));



  module.exports.app = app;