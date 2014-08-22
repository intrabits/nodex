// Desarrollo 
var mysql   = require('mysql');

var db={
	host: 'localhost',
	user: 'ced',
	password: 'ratoncito'
}

var database = 'intrabits'; // si quisieramos usar una dirección para mongo podríamos hacerlo : username:password@example.com/mydb"

var connection = mysql.createConnection(db);
connection.query('USE ' + database);

//configuración de mongo db, voy a usar el mismo nombre para la BD que MySQL

// var collections = ["pagina"];
// var db = require("mongojs").connect(database,collections);

var wf_user= 'intrabits';
var wf_pass= 'Intra071';
var wf_ip	= '75.126.173.142';

var Webfaction = require('./../lib/webfaction');
var webfaction = new Webfaction(wf_user, wf_pass);

var production = true;
var PORT = 21575;

var FACEBOOK_APP_ID = "1428911074031766"
var FACEBOOK_APP_SECRET = "36a956725f0457d574ae81ab536b8fcd";
var callbackURL = "http://panel.nodex.mx/auth/facebook/callback";


exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
exports.FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET;
exports.callbackURL = callbackURL;
exports.connection = connection;
exports.PORT = PORT;
exports.db = db;
exports.webfaction = webfaction;
exports.production = production;


exports.BIENVENIDA = '========= Nave espacial lista!...  PIU PIU || Puerto de despegue: ' + PORT + ' =========';
