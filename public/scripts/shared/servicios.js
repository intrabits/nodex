'use strict';
angular.module('app.paginas.ctrl', []).controller('algo', [
  '$scope','$routeParams','$http', function($scope,$routeParams,$http) {
  
    $scope.gato=$routeParams.pagina_id;

    $scope.users='';
    $scope.users=listar($scope,$http);

    $scope.pages='';
    $scope.pages=listar($scope,$http);





}
]).controller('menu',['$scope','$routeParams','$http',function( $scope, $routeParams, $http){


}]);
