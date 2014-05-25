var db={
	host: 'localhost',
	user: 'root',
	password: ''
}


var FACEBOOK_APP_ID = "1428911074031766"
var FACEBOOK_APP_SECRET = "36a956725f0457d574ae81ab536b8fcd";
var callbackURL = "http://localhost:3000/auth/facebook/callback";

exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
exports.FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET;
exports.callbackURL = callbackURL;
exports.db = db;