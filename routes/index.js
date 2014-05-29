var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');
var Usuario = require('./../models/usuario.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
connection          = config.connection;


router.get('/cuenta', ensureAuthenticated, function(req, res){res.json(req.user);  });

router.get('/', ensureAuthenticated, function(req, res){  res.render('app', { user: req.user , avatar:req.user.username}); });

router.get('/preview/', function(req, res){  
    res.sendfile('public/pagina.html');  
});


router.get('/login', function(req, res){  res.sendfile('public/start.html');  });

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
router.get('/auth/facebook',passport.authenticate('facebook'));


router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');

  });


router.get('/logout', function(req, res){req.logout();res.redirect('/');  });

module.exports = router;
