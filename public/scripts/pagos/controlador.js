'use strict';
angular.module('app.pagos', []).
controller('PagoCtrl',['$scope','Pago','$routeParams','$route',function ($scope,Paciente,$routeParams,$route) {
    

    $scope.pagos = {};
    
    Paciente.all(function (err,data) {
        if (err) {alert('Hubo un error');}
        else{
            $scope.pagos = data;
        }
        
    });    

    

}]);
