(function () {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$location','$http','logger','$rootScope','$route', function($scope, $location,$http,logger,$rootScope,$route) {
      var base;
      //  Configuración global de nodex
      $scope.main = {};
      localStorage.removeItem('alerted');
        $http.get('/config').success(function (data,status,headers,config) {
          $scope.config = data;
          var base = $scope.config[1].config_valor;


          $scope.main.brand = 'Nodex';
          $scope.main.base = base;
          $scope.main.dominio = 'nodex.mx';

        }).error(function(){
          alert('Ops! algo salió mal, lo mejor será intentar en unos minutos');
        });


      $scope.isSpecificPage = function() {
        var path;
        path = $location.path();
        return _.contains(['/404', '/pages/500', '/pages/login', '/pages/signin', '/pages/signin1', '/pages/signin2', '/pages/signup', '/pages/signup1', '/pages/signup2', '/pages/lock-screen'], path);
      };

      $scope.notify = function(type,msg) {
        switch (type) {
          case 'info':
            return logger.log(msg);
          case 'success':
            return logger.logSuccess(msg);
          case 'warning':
            return logger.logWarning(msg);
          case 'error':
            return logger.logError(msg);
        }
      };


      var app = $('#app');
      $$('.page').swipeRight(function() {
          // affects "span" children/grandchildren


              app.removeClass('nav-min');
              $('#app').toggleClass('on-canvas');
          } );

      $$('.page').swipeLeft(function() {
          // affects "span" children/grandchildren

              app.addClass('nav-min');
              $('#app').toggleClass('on-canvas');

      });




      // Información del usuario actual
      $http.get('/api/usuario/perfil').success(function (data,status,headers,config) {
        $scope.usuario = data;
        $rootScope.usuario = data;
         if (data.usuario_facebook) {
            $scope.main.foto = 'http://graph.facebook.com/' + data.usuario_facebook + '/picture';
         }else{
            $scope.main.foto = 'https://answers.atlassian.com/upfiles/user_icons/cached/Timothy_Chin_avatar_icon128.png';
         }

       });



    }
  ]).controller('NavCtrl', [
    '$scope',  'filterFilter', 'Pagina', function($scope, filterFilter, Pagina) {

      Pagina.all(function (err, data) {
        if (err) {alert(err);}
        else{
          $scope.misPaginas = data;
        }
      });

      Pagina.expired(function (err, data) {
        if (err) {notify('danger','Ocurrió un error');}
        else{
          $scope.PaginasVencidas = data;
          $scope.TotalPaginasVencidas = data.length;

        }
      });

      function getNotificacionesMensajesPagina(){
        Pagina.getMensajesAll(function (err,data) {
          if (err) {
            $scope.notify('danger','No se pudieron cargar tus notificaciones');
            // alert('Ocurrió un error dentro del sistema, lo estamos reparando en este momento. Por favor vuelve a iniciar sesión, lamentamos los inconvenientes');

              var alerted = localStorage.getItem('alerted') || '';
              if (alerted != 'yes') {
               alert("Ocurrió un error dentro del sistema, lo estamos reparando en este momento. Por favor vuelve a iniciar sesión, lamentamos los inconvenientes");
               localStorage.setItem('alerted','yes');
              //  window.location = '/login';
              }
          } else{
            $scope.notificacionesMensajes = data;
            $scope.notificacionesMensajesTotal = $scope.notificacionesMensajes.length;
          }
        });
      }

      //  Socket :)
      var socket = io();
      socket.on('notificacion', function (data) {
        log(data.username + ' left');
        addParticipantsMessage(data);
        removeChatTyping(data);
      });

      setInterval(function() {
        getNotificacionesMensajesPagina();
      }, 20000);
      getNotificacionesMensajesPagina();


    }
  ]).controller('DashboardCtrl', [
    '$scope','Pagina', function($scope,Pagina) {
      Pagina.all(function (err, data) {
        if (err) {alert(err);}
        else{
          $scope.misPaginas = data;
        }
      });

      Pagina.getMensajesLatest(function (err, data) {
        if (err) {
          $scope.notify('danger','Ocurrió un error al cargar los últimos mensajes, porfavor intenta más tarde');
        } else{
          $scope.PaginaMensajesLatest  = data;
        }
      });

    }
  ]);


  var ModalCtrl = function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

})();
