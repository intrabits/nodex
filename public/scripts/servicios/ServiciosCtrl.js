'use strict';
angular.module('app.servicios', []).controller('serviciosCtrl', [
  '$scope', '$filter','$http', function($scope, $filter,$http) {
    $http.get('/api/pagos').success(function (data,status,headers,config) {
       $scope.servicios = data;
     });

    $http.get('/api/pagos/pendientes').success(function (data,status,headers,config) {
       $scope.pendientes = data;
     });

    $http.get('/api/pagos/facturas').success(function (data,status,headers,config) {
       $scope.facturas = data;
     });
  }
]);
