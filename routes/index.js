var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');
var Usuario = require('./../models/usuario.js');
var path  = require('path');

var ambiente        = config.ambiente;
var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
connection          = config.connection;



router.get('/cuenta', ensureAuthenticated, function(req, res){res.json(req.user);  });

router.get('/', ensureAuthenticated, function(req, res){
	// res.render('app', { user: req.user , avatar:req.user.username});
  // res.sendFile('public/app.html');
  res.sendFile(path.join(__dirname, './../','/public/app.html'));
});

router.get('/up', ensureAuthenticated, function(req, res){
  res.render('up', { user: req.user , avatar:req.user.username});
});

router.get('/admin/', function(req, res){
    // res.sendFile('public/admin.html');
    res.sendFile(path.join(__dirname, './../','/public/admin.html'));
});


// router.get('/login', function(req, res){  res.sendfile(__dirname+'public/start.html');  });
router.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, './../','/public/login.html'));
  // res.sendFile(__dirname + '/../public/login.html');
});

router.get('/registro', function(req, res){
  // res.sendfile('public/registro.html');
  res.sendFile(path.join(__dirname, './../','/public/registro.html'));
});
// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: [' basic_info', 'email'],successRedirect: '/',failureRedirect: '/login' }),function (req, res) {
  console.log("intentando redireccionar");
  res.redirect('/');
});


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' })  );

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login',successRedirect:'/' }),
  function(req, res) {
    res.redirect('/');

  });


router.get('/logout', function(req, res){req.logout();res.redirect('/');  });

router.get('/config',function (req, res) {
  connection.query("SELECT config_nombre,config_valor from config",function (err, rows) {
    if (err) {
      console.log(err);
      res.send(500);
    } else{
      res.json(rows);
    }
  });

});

module.exports = router;
