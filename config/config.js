// Desarrollo
var mysql   = require('mysql2');
var config 	= require('./config.json');
var db ={
	host: 'localhost',
	user: 'root',
	password: ''
};

var database = 'mydb'; // si quisieramos usar una dirección para mongo podríamos hacerlo : username:password@example.com/mydb"

var connection = mysql.createConnection(config.db);
connection.query('USE ' + config.db.database);

//configuración de mongo db, voy a usar el mismo nombre para la BD que MySQL

// var collections = ["pagina"];
// var db = require("mongojs").connect(database,collections);

var wf_user= 'intrabits';
var wf_pass= 'Intra071';
var wf_ip	= '75.126.173.142';

var Webfaction = require('./../lib/webfaction');
var webfaction = new Webfaction(config.webfaction.user,config.webfaction.password);

var production = false;
var PORT = config.port;

var FACEBOOK_APP_ID = config.facebook.id;
var FACEBOOK_APP_SECRET = config.facebook.secret;
var callbackURL = config.facebook.callback;


exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
exports.FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET;
exports.callbackURL = callbackURL;
exports.connection = connection;
exports.PORT = PORT;
exports.db = db;
exports.webfaction = webfaction;
exports.production = production;


exports.BIENVENIDA = '========= Nave espacial lista!...  PIU PIU || Puerto de despegue: ' + PORT + ' =========';
