(function () {
  'use strict';
  angular.module('app.producto', [
    'app.producto.service'
  ])
    .controller('ProductoCtrl',['$scope','$modal','Producto','$routeParams','$window',function($scope,$modal,Producto,$routeParams,$window){

      $scope.FormAddProducto = {};
      $scope.misProductos = {};
      Producto.getCategorias(function (err, data) {
        if (err) {alert('Error al cargar las categorías');}
        else{
          $scope.categorias = data;
        }
      });

      $scope.addProducto = function () {
        var datos = $scope.FormAddProducto;
        datos.pagina_id = $routeParams.pagina_id;
        Producto.create(datos)
          .success(function (data) {
            $scope.notify('success',data.result);
            $window.location = '#/pagina/' + datos.pagina_id + '/producto/' + data.id;
          })
          .error(function (err) {
            $scope.notify('warning',err);
          });
      };

      var getProductos = function () {
        var pagina_id = $routeParams.pagina_id;
        console.log(pagina_id);
        Producto.misProductos(pagina_id)
          .success(function (data) {
            console.log(data);
            $scope.misProductos = data;
          })
          .error(function (err) {
            $scope.notify('warning',err);
          });
      };

      if ($routeParams.pagina_id) {
        getProductos();
      }


  }]).controller('ProductoDetalleCtrl',['$scope','$modal','Producto','$routeParams','$http','$window',function($scope,$modal,Producto,$routeParams,$http,$window){


      $scope.FormEditarProducto = {};

      Producto.detail($routeParams.producto_id,function (err,data) {
        if (err) {
          alert('Error al carcar el producto');
          console.log(err);
        } else{
          $scope.FormEditarProducto = data;
        }
      });


      $scope.deleteProducto = function () {
        var confirmar = confirm('¿Realmente quieres eliminar este producto?');
        if (confirmar) {
          Producto.delete($routeParams.producto_id)
            .success(function (data) {
              $scope.notify('success',data);
              $window.location = '#/pagina/' + $scope.FormEditarProducto.producto_pagina_id + '/productos';
            })
            .error(function (err) {
              $scope.notify('danger',err);
            });
        }
      };

      $scope.deleteImagen = function  (id) {
        var si = confirm('¿Estas seguro que deseas eliminar esta imagen?');

        if (si) {
          Producto.deleteImagen(id,function  (err,data) {
            if (err) {
              alert(err);
            } else{
              $scope.notify('success','Listo');
              getImagenes();
            }
          });
        }
      };

      $scope.uploadImage = function(files) {
          var fd = new FormData();
          //Take the first selected file
          fd.append("file", files[0]);
          $http.post('/api/producto/'+ $routeParams.producto_id +'/upload', fd, {
              withCredentials: true,
              headers: {'Content-Type': undefined },
              transformRequest: angular.identity
          }).success(function () {
            $scope.notify('success','Se subió correctamente!');
            getImagenes();

          }).error(function () {
            $route.reload();
            getImagenes();
            $scope.notify('danger','Se subió la imágen correctamente');

          });

      };

      $scope.editarProducto = function () {
        console.log("Editando producto");
        Producto.update($scope.FormEditarProducto,$routeParams.producto_id,function (err,data) {
          if (err) {
            alert('Error al intentar editar el producto');
          } else{
            $scope.notify('success','Producto editado correctamente');
          }
        });
      };


      function getImagenes () {
        Producto.fotos($routeParams.producto_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.fotos = data;
          }
        });
      }

      getImagenes();
  }]);

})();
