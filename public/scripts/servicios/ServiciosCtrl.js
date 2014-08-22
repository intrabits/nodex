'use strict';
angular.module('app.servicios', []).controller('serviciosCtrl', [
  '$scope', '$filter','$http', function($scope, $filter,$http) {

    //  Traer todos los pagos: pendientes y realizados
    $http.get('/api/pagos').success(function (data,status,headers,config) {
       $scope.servicios = data;
     });

    
  }
]);
