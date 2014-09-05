var app     = require('./../config/express');
var server = require('http').Server(app.app);
var io = require('socket.io')(server);


//  Modelos
Soporte = require('./../models/soporte.js');

var usernames = {};
var numUsers = 0;

var sockets = function (socket) {
  var addedUser = false;
  socket.on('prueba',function (data) {
    console.log("nooo");    
    setInterval(function() {
      console.log("si llegó");  
    }, 1000);
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data,
      foto: socket.foto
    });

    var datos_mensaje = {
      chat_usuario_nombre:socket.username,
      chat_mensaje:data      
    }
    Soporte.addMensaje(datos_mensaje,function (err,data) {
      if (err) {console.log(err);};
    });
    var clients = io.sockets.clients(usernames);
    console.log(clients);
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username, foto) {
    // we store the username in the socket session for this client
    socket.username = username;
    socket.foto = foto;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
      foto: socket.foto
    });

    
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });



  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
};

module.exports = sockets;