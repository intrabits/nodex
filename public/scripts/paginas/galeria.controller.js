(function () {
  'use strict';
  angular
    .module('app.pagina.galeria',[])
    .controller('GaleriasCtrl',['$scope','$window','Pagina','$routeParams','$route','$http',function($scope,$window,Pagina,$routeParams,$route,$http){

      var pagina_id = $routeParams.pagina_id;
      var galeria_id = $routeParams.galeria_id;
      $scope.pagina_id = pagina_id;
      $scope.FormAddGaleria = {};
      $scope.FormEditGaleria = {};

      function getGalerias() {
        Pagina.getGalerias(pagina_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.galerias = data;
          }
        });
      }



      function getGaleria() {
        Pagina.getGaleria(pagina_id,galeria_id,function (err, data) {
          if (err) {
            console.log(err);
            $scope.notify('error',err);
          } else{
            $scope.FormEditGaleria = data;
          }
        });
      }
      function getImagenes() {
        Pagina.getImagenes(pagina_id,galeria_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.imagenes = data;
          }
        });
      }

      $scope.addGaleria = function () {
        var pagina_id = $routeParams.pagina_id;
        Pagina.addGaleria($scope.FormAddGaleria,pagina_id,function (err, data) {
          if (err) {
            $scope.notify('danger',err);
          } else{
            getGalerias();
            $scope.notify('success','Galería agregada exitosamente');
            $scope.FormAddGaleria = {};
          }
        });
      };

      $scope.editGaleria = function () {
        var pagina_id = $routeParams.pagina_id;
        Pagina.updateGaleria(pagina_id,galeria_id,$scope.FormEditGaleria,function (err, data) {
          if (err) {
            $scope.notify('danger',err);
          } else{
            getGalerias();
            $scope.notify('success','Galería editada exitosamente');
            $scope.FormAddGaleria = {};
          }
        });
      };

      $scope.deleteGaleria = function () {        
        var confirmar = confirm('¿Realmente deseas eliminar esta galería?');

        if (confirmar) {
          Pagina.deleteGaler(galeria_id)
            .success(function (data) {
              $scope.notify('success',data);
            })
            .error(function (err) {
              $scope.notify('danger',err);
            });
        }
      };


      $scope.FormGaleria = function () {
        $('#vista1').hide('explode');
        $('#vista2').show();
      };
      $scope.CancelarAddGaleria = function () {
        $('#vista1').show('explode');
        $('#vista2').hide();
      };


      $scope.redirect = function () {
        alert('msg');
        $window.location.href= "#/dashboard";
        var modalInstance = $modal.$close();

      };

      if (galeria_id) {
        getGaleria();
        getImagenes();
      } else{
        getGalerias();
      }

      $scope.uploadImage = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);
            $http.post('/api/pagina/'+ pagina_id +'/galeria/'+galeria_id+'/upload', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function () {
              $scope.notify('success','Se subió correctamente!');
              getImagenes();

            }).error(function () {
              $route.reload();
              getImagenes();
              $scope.notify('warning','Error al subir la imagen');

            });

        };

        $scope.editarImg = function (id) {
          var titulo = prompt('Ingresa el título de la imágen');
          var descripcion = prompt('Ingresa la descripción');

          var datos = {
            imagen_titulo:titulo,
            imagen_descripcion:descripcion
          };

          Pagina.updateImagen(datos,id,function (err, data) {
            if (err) {
              $scope.notify('danger',"Ocurrió un error");
            } else{
              $scope.notify('success',"Imágen editada");
              $route.reload();

            }
          });
        };

        $scope.deleteImg = function (id) {

          var si = confirm("¿Realmente deseas eliminar la imágen?");
          if (si) {
            Pagina.deleteImg(id,function (err, data) {
              if (err) {
                $scope.notify('danger',"Ocurrió un error");
              } else{
                $scope.notify('success',"Imágen eliminada");
                $route.reload();
              }
            });
          }
        };

    }]);
})();
