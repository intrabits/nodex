var config = require('./config.js');
var bcrypt = require('bcrypt');
var passport = require('passport')
  , util = require('util')
  , FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy    = require('passport-local').Strategy;

var Usuario = require('./../models/usuario');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});




// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      var datos = {        
        apellido_paterno  : profile.name.familyName,
        nombre    : profile.name.givenName,
        nivel_id  :1,
        facebook  : profile.id
      }

      var username={facebook:profile.id};
      Usuario.existUsuario(username,function(err,data){
        if (err) {
          console.log("======================= ERROR =========================: ",err);            
        } else {            
            if (data) {
              console.log("=======================  YA EXISTE =============================");
              console.log(data);
              return done(null, data);
            }else{
              Usuario.addUsuario(datos,function(err,data){
                  if (err) {
                    console.log("======================= ERROR DURANTE LA CREACIÓN DEL USUARIO =========================: "+profile.username ,err);            
                  } else {            
                    console.log("======================= Agregado correctamente ========================================");
                    return done(null, data);
                    } 
                  });
            }
          } 
        });
      console.log(datos);
      
    });
  }
));

passport.use(new LocalStrategy({
  usernameField : 'correo',
  passwordField : 'password'
},
  function(correo, password, done) {
    // asynchronous verification, for effect...    
    process.nextTick(function () {
      
      Usuario.loginUsuario(correo,password,function(err,data){
         if (err) {
              console.log("======================   ERROR    =============================",err);            
         } else {            
            if (data) {
               console.log("============================= Iniciando sesión =============================");
               console.log(data);
               console.log("=============================    Ya inició     =============================");
               return done(null,data);
            }else{
                return done(null,null);
               console.log("============================== Falló el inicio de sesión ===================");              
            }
         } 
      });

            
    });
  }
));



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

   module.exports.ensureAuthenticated = ensureAuthenticated;
   module.exports.passport = passport;
   module.exports.FacebookStrategy = FacebookStrategy;