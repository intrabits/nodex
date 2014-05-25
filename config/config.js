// Desarrollo 
var mysql   = require('mysql');

var db={
	host: 'localhost',
	user: 'root',
	password: ''
}

var connection = mysql.createConnection(db);
connection.query('USE mydb');


var PORT = 3000;

var FACEBOOK_APP_ID = "1432589226997284"
var FACEBOOK_APP_SECRET = "f24529fec3aa69c9ff45ca3fcd9c7d01";
var callbackURL = "http://localhost:3000/auth/facebook/callback";

exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
exports.FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET;
exports.callbackURL = callbackURL;
exports.connection = connection;
exports.PORT = PORT;



exports.BIENVENIDA = '========= Nave espacial lista!...  PIU PIU || Puerto de despegue: ' + PORT + ' =========';
// Producción
/*
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
exports.db = db; */