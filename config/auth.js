var config = require('./config.json');
var bcrypt = require('bcrypt');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy    = require('passport-local').Strategy;
var sanitizer = require('sanitizer');
var Usuario = require('./../api/usuario/usuario.model');
var Promise = require('bluebird');


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
    clientID: config.facebook.id,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.callback,
    passReqToCallback: true
  },
  function(req,accessToken, refreshToken, profile, done) {

    process.nextTick(function () {

      console.log('Usuario se intenta loguear usando FB');
      console.log(profile);

      var datos = {
        nombre : profile.name.familyName,
        apellidoPaterno    : profile.name.givenName,
        email   : profile.emails[0].value,
        facebook : profile.id
      };

      datos.raw = JSON.stringify(profile);

      console.log(datos.email);
      Usuario.find({
        where:{
          email:datos.email
        }
      })
        .then(function (user) {
          console.log(user);
          if (user) {
            return user;
          }else{
            return Usuario.create(datos);
          }
        })
        .then(function (data) {
          done(null,data);
        })
        .catch(function (err) {
          console.error(err);
          done('Error al inciar sesión');
        });
    });
  }
));


passport.use(new LocalStrategy({
  usernameField : 'correo',
  passwordField : 'password'
},
  function(user_email, user_password, done) {
    console.log("login");
    // asynchronous verification, for effect...
    user_email = sanitizer.sanitize(user_email);
    console.log(user_password);

    process.nextTick(function () {

      var current = Promise.resolve();

      Usuario.find({where:{email:user_email}})
          .then(function (user) {
            if (user) {
              current = bcrypt.compare(user_password, user.password, function(err, isPasswordMatch) {
                if (isPasswordMatch) {
                  console.log('Contraseña correcta'.blue);
                  done(null,user);
                } else {
                  console.log('Contraseña incorrecta'.red);
                  done(null,false);
                }
              });
            }else{
              return done(null,false);
            }

          })
          .catch(function (err) {
            console.log('Error al iniciar sesión');
            console.log(err);
            done('Error al iniciar sesión');
          });

    });
  }
));

// passport.use(new LocalStrategy({
//   usernameField : 'correo',
//   passwordField : 'password'
// },
//   function(correo, password, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
//       Usuario.login(correo,password,function(err,data){
//          if (err) {
//               console.log("=================   ERROR    =============================",err);
//               return done(err,null);
//          } else {
//             if (data) {
//              console.log("================    Se loguea correctamente     ==============");
//              return done(null,data);
//             }else{
//               return done('error',null);
//             }
//          }
//       });
//
//
//     });
//   }
// ));



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
