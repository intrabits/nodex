(function () {
  'use strict';
  angular.module('app.tienda', [])
    .controller('TiendaCtrl',function($scope,$modal,$log,Producto,$routeParams){

      $scope.FormAddProducto = {};
      $scope.misProductos = {};
      Producto.getCategorias(function (err, data) {
        if (err) {alert('Error al cargar las categorías');}
        else{
          $scope.categorias = data;
        }
      });


      Producto.detail($routeParams.producto_id,function (err,data) {
        if (err) {
          $scope.notify('danger',"Error al cargar el producto");
        } else{
          $scope.producto = data;
          console.log(data);
        }
      });

      function TabsDemoCtrl () {

      }

  });

})();
