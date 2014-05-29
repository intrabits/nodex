// Desarrollo 
var mysql   = require('mysql');

var db={
	host: 'localhost',
	user: 'root',
	password: ''
}

var database = 'mydb'; // si quisieramos usar una dirección para mongo podríamos hacerlo : username:password@example.com/mydb"

var connection = mysql.createConnection(db);
connection.query('USE ' + database);

//configuración de mongo db, voy a usar el mismo nombre para la BD que MySQL

var collections = ["pagina"];
var db = require("mongojs").connect(database,collections);



var PORT = 3000;

var FACEBOOK_APP_ID = "1432589226997284"
var FACEBOOK_APP_SECRET = "f24529fec3aa69c9ff45ca3fcd9c7d01";
var callbackURL = "http://localhost:3000/auth/facebook/callback";


// Guardar algo en la BD
// db.paginas.save({nombre: "Primera Página en MongoDB", dominio: "ilikemongo.com",fondo:"http://intrabits.net/img/fondo.png"}, function(err, saved) {
//   if( err || !saved ) console.log("User not saved");
//   else console.log("User saved");
// });

//Update
// db.users.update({email: "srirangan@gmail.com"}, {$set: {password: "iReallyLoveMongo"}}, function(err, updated) {
//   if( err || !updated ) console.log("User not updated");
//   else console.log("User updated");
// });

// db.paginas.find({}, function(err, users) {
//   if( err || !users) console.log("No female users found");
//   else users.forEach( function(femaleUser) {
//     console.log(femaleUser);
//   } );
// });

exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
exports.FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET;
exports.callbackURL = callbackURL;
exports.connection = connection;
exports.PORT = PORT;
exports.db = db;


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