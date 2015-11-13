(function () {
  'use strict';
  angular.module('app.producto', [
    'app.producto.service',
    'app.producto.detalle'
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


  }]);

})();
