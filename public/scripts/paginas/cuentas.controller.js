(function () {
  'use strict';
  angular
    .module('app.pagina.cuentas',[])
    .controller('PaginaCuentasCtrl',['$scope','$modal','Pagina','$routeParams','$http',function($scope,$modal,Pagina,$routeParams,$http){

      var pagina_id = $routeParams.pagina_id;
      $scope.FormAddCuenta = {};

      function getCuentas () {
        Pagina.getCuentas(pagina_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.cuentas = data;
          }
        });
      }

      function getCuentasDisponibles(){
        Pagina.getOne(pagina_id,function (err, data) {
            if (err) {console.log("Error al cargar la página");}
            else{
              $scope.disponibles = data.pagina_cuentas_disponibles;
              $scope.usadas = data.pagina_cuentas_usadas;
            }
        });
      }

      $scope.addCuenta = function () {
        var pagina_id = $routeParams.pagina_id;
        Pagina.addCuenta($scope.FormAddCuenta,pagina_id,function (err, data) {
          if (err) {
            $scope.notify('danger','Algo salió mal');
          } else{
            getCuentas();
            getCuentasDisponibles();
            $scope.notify('success','Cuenta agregada exitosamente');
            $scope.FormAddCuenta = {};
          }
        });

      };

      getCuentas();
      getCuentasDisponibles();

    }]);
})();
