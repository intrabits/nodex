'use strict';
angular.module('app.chat', []).controller('ChatCtrl',['$scope','$routeParams','$http','$rootScope','Usuario',function( $scope, $routeParams, $http, $rootScope,Usuario){
    
    Usuario.perfil(function (err,data) {
      if (err) {alert(err);}
      else{
        $scope.nick = data.usuario_nombre;
        $scope.facebook = data.usuario_facebook;
        if (data.usuario_facebook) {          
          $scope.usuario.usuario_foto = 'http://graph.facebook.com/' + data.usuario_facebook + '/picture';                 
        }else{
          $scope.usuario.usuario_foto = 'https://answers.atlassian.com/upfiles/user_icons/cached/Timothy_Chin_avatar_icon128.png';       
        }
      };
    });
    
    
        var FADE_TIME = 150; // ms
        var TYPING_TIMER_LENGTH = 400; // ms
        var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
        ];

  // Initialize varibles
        var $window = $(window);
        var $usernameInput = $('.usernameInput'); // Input for username
        var $facebookInput = $('.facebookInput');
        var $messages = $('.messages'); // Messages area
        var $inputMessage = $('.inputMessage'); // Input message input box

        var $loginPage = $('.login.page'); // The login page
        var $chatPage = $('.chat.page'); // The chatroom page

  // Prompt for setting a username
        var username;
        var foto;
        var connected = false;
        var typing = false;
        var lastTypingTime;
        var $currentInput = $inputMessage.focus();

        var socket = io();
        setUsername();

        function addParticipantsMessage (data) {
            var message = '';
            if (data.numUsers === 1) {
              message += "Hay 1 participante";
            } else {
              message += "Hay " + data.numUsers + " participantes";
            }
            // alert(message);
        }

  function div2top(){
    
    var objDiv = document.getElementById("mensajes");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  
  // Sets the client's username
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());  
    foto = cleanInput($facebookInput.val().trim());  
    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username,foto);
      socket.emit('online users');
    }
  }

  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message,
        foto: 'https://graph.facebook.com/draweb2.0/picture'
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message,$scope.usuario.usuario_foto);
    }
  }

  // Log a message
  function log (message, options) {
    var $el = $('<div>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }    
    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));

    if (data.username==$scope.nick) {
      var $messageBodyDiv = $('<span class="chat-right">')
      .text(data.message);  
    } else{
      var $messageBodyDiv = $('<span class="chat-left">')
      .text(data.message)
      .attr('style',"background-image:url(http://graph.facebook.com/"+data.foto+"/picture);background-repeat:no-repeat;");      
    };

    

    var typingClass = data.typing ? 'typing chatlog' : '';
    var $messageDiv = $('<div class=""/>')      
      .append( $messageBodyDiv);

    addMessageElement($messageDiv, options);
    div2top();
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'is typing';
    //  Por ahora no
    // addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    setUsername();
    if (event.which === 13) {
      if (username) {        
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Bienvenido al soporte en tiempo real de NODEX";
    // log(message, {
    //   prepend: true
    // });
    addParticipantsMessage(data);
    socket.emit('online users',function (data) {
      console.log(data);
    });
  });


  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {    
    addChatMessage(data);
    socket.on('prueba',function (data) {
      console.log(data);
    });
  });

  // Contar usuarios en linea
  socket.on('prueba', function (data) {
    console.log(data.numUsers);
    alert(data);
    
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    console.log(data.username + ' se unió a la conversación ');
    $scope.con = "http://graph.facebook.com/"+data.foto+"/picture";    

    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    console.log(data.username + ' se ha desconectado');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });

  setUsername();
}]);
