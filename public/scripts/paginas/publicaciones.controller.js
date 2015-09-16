(function () {
  'use strict';
  angular
    .module('app.pagina.publicacion',['app.publicacion.service'])
    .controller('PublicacionesCtrl',['$scope','Publicacion','$routeParams','$http','$route','$window',function($scope,Publicacion,$routeParams,$http,$route,$window){

      var pagina_id = $routeParams.pagina_id;
      $scope.FormAddPublicacion = {};
      $scope.FormEditPublicacion = {};

      function getPublicaciones () {
        Publicacion.getPublicaciones(pagina_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.publicaciones = data;
          }
        });
      }
      function getPublicacion () {
        Publicacion.getPublicacion($routeParams.pagina_id,$routeParams.publicacion_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.FormEditPublicacion = data;
            $('#myCode').html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + $scope.FormEditPublicacion.publicacion_video + '" frameborder="0" allowfullscreen></iframe>');
          }
        });
      }

      $scope.deletePublicacion = function () {
        var confirmar = confirm('¿Realmente deseas eliminar esta publicación?');
        if (confirmar) {
          Publicacion.deletePublicacion($routeParams.publicacion_id)
            .success(function (data) {
              $window.location = '#/pagina/' + FormEditPublicacion.publicacion_pagina_id + '/publicaciones';
              $scope.notify('success',data);
            })
            .error(function (err) {
              $scope.notify('danger',err);
            });
        }
      };

      $scope.addPublicacion = function () {
        var pagina_id = $routeParams.pagina_id;
        Publicacion.addPublicacion($scope.FormAddPublicacion,pagina_id,function (err, data) {
          if (err) {
            $scope.notify('danger','Algo salió mal');
          } else{
            getPublicaciones();
            $scope.notify('success','Publicación agregada exitosamente');
            $scope.FormAddPublicacion = {};
            $('#myCode').html('.');
          }
        });
      };

      $scope.upImg = function(files) {
               var fd = new FormData();
                //Take the first selected file
                fd.append("file", files[0]);
                $http.post('/api/pagina/publicacion/'+$routeParams.publicacion_id +'/upload', fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(function (data) {
                  $scope.notify('success',data);
                  $route.reload();
                }).error(function (err) {
                  alert(err);
                });

            };

      $scope.togglePublicacion = function (publicacion_id) {
        Publicacion.togglePublicacion(publicacion_id,function (err,data) {
          if (err) {
            $scope.notify('danger','Ocurrió un error');
          } else{
            $scope.notify('success','¡Listo!');
            getPublicaciones();
          }
        });
      };

      $scope.editPublicacion = function () {
        var pagina_id = $routeParams.pagina_id;
        Publicacion.update($routeParams.publicacion_id,$scope.FormEditPublicacion)
          .success(function (data) {
            $scope.notify('success',data);
          })
          .error(function (err) {
            $scope.notify('warning',err);
          });

      };
      if ($routeParams.publicacion_id) {
        getPublicacion();
      }else{
        getPublicaciones();
      }


      function getId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }

        var myId;

        $scope.buscarVideo = function () {
          var myUrl = $('#myUrl').val();
          myId = getId(myUrl);
          $('#myCode').html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>');
          $scope.FormAddPublicacion.publicacion_video = myId;
          $scope.FormEditPublicacion.publicacion_video = myId;
        };



    }]);
})();
