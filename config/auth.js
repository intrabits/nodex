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
        usuario_apellido_paterno  : profile.name.familyName,
        usuario_nombre    : profile.name.givenName,
        usuario_nivel_id  :1,
        usuario_facebook  : profile.id,
        usuario_email: profile._json.email,
        usuario_genero: profile.gender,
      }

      console.log("-----------------datos de facebook------------------");
      console.log(profile);
      console.log("-----------------datos de facebook------------------");

      var username={usuario_facebook:profile.id};
      Usuario.existFB(profile.id,function(err,data){
        if (err) {
          console.log("======================= ERROR =========================: ",err);
          done(err,null);
        } else {
            if (data) {
              console.log("=======================  YA EXISTE =============================");
              Usuario.loginFB(profile.id,function(err,data_login){
                   if (err) {
                        console.log("======================   ERROR    =============================",err);
                   } else {
                      if (data_login) {
                         console.log("=============================    Ya inició     =============================");
                         done(null,data_login);
                      }else{
                        console.log(err);
                        return done(err,null);
                      }
                   }
                });



            }else{
              Usuario.addUsuario(datos,function(err,data){
                  if (err) {
                    done(err,null);
                  } else {
                    console.log("======================= Agregado correctamente ========================================");

                    // lo logueamos... porque es cool
                        Usuario.loginFB(profile.id,function(err,data_login){
                             if (err) {
                                  console.log(err);
                                  callback(err);
                             } else {
                                if (data_login) {
                                   console.log("=============================    Ya inició     =============================");
                                   done(null,data_login);
                                }else{
                                    return done('Ops, algo salió mal',null);
                                    console.log("============================== Falló el inicio de sesión ===================");
                                }
                             }
                          });



                    }
                  });
            }
          }
        });

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
      Usuario.login(correo,password,function(err,data){
         if (err) {
              console.log("=================   ERROR    =============================",err);
              return done(err,null);
         } else {
            if (data) {
               console.log("================    Se loguea correctamente     ==============");
               return done(null,data);
            }else{
                return done('error',null);
               console.log("=============== Falló el inicio de sesión ===============");
            }
         }
      });


    });
  }
));



function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

exports.isLogged = function(req,res,next) {
  if (req.isAuthenticated()) { return next(); }
  else{
    res.status(401).send('Permiso denegado');
  }
};

function validateAuthenticated(req,res,next) {
  if (req.isAuthenticated()) { return next(); }
  else{
      res.send(401);
  }
}

function ensureAdmin(req, res, next){



  if (req.isAuthenticated()) {
    var nivel_id = req.user.usuario_nivel_id;
    if (nivel_id==5) {
      next();
    }else{
      // res.redirect('/login');
      res.send(404);
    }
  }else{
    // res.redirect('/login');
    res.send(404);
  }

}

  module.exports.ensureAuthenticated = ensureAuthenticated;
  module.exports.validateAuthenticated = validateAuthenticated;
  module.exports.ensureAdmin         = ensureAdmin;
  module.exports.passport = passport;
  module.exports.FacebookStrategy = FacebookStrategy;
