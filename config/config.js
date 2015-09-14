// Desarrollo
var mysql   = require('mysql2');
var config 	= require('./config.json');
var Sequelize = require('sequelize');

exports.sequelize = new Sequelize(config.db.database,config.db.user,config.db.password,{
  host:config.db.host,
  logging:false,
  dialect:'mysql'
});

var connection = mysql.createConnection(config.db);
connection.query('USE ' + config.db.database);

var Webfaction = require('./../lib/webfaction');
var webfaction = new Webfaction(config.webfaction.user,config.webfaction.password);


exports.connection = connection;
exports.PORT = config.port;
exports.webfaction = webfaction;
exports.production = false;


exports.BIENVENIDA = '==== Nave espacial lista!...  PIU PIU || Puerto de despegue: ' + config.port + ' ====';
