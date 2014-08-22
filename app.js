var config 	= require('./config/config');
var app    	= require('./config/express');
var api 	= require('./routes/api');
var index 	= require('./routes/index');

//  Sockets!!!!
var server = require('http').Server(app.app);
var io = require('socket.io')(server);
var sockets = require('./sockets/index.js');
io.on('connection',sockets);


app = app.app;

//Rutas exclusivas que usaremos en node.js
app.use('/', index);

//Api con la que se comunicará Angularjs y las aplicaciones móviles
app.use('/api/', api);


server.listen(21575);
// app.listen(3000);
console.log('================================================================================');
console.log(config.BIENVENIDA);
console.log('================================================================================');
