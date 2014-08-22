var bcrypt = require('bcrypt');


var Lib = {};

Lib.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

Lib.comparePassword = function(password, userPassword, callback) {
    console.log(password + " " + userPassword);    
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) 
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};


module.exports = Lib;