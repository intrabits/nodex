'use strict';
angular.module('app', ['ngRoute','ui.bootstrap','appServices','ngSanitize'])
    .config(['$routeProvider', function($routeProvider) {
        return $routeProvider.                
                when('/pagina/:mongo', {templateUrl: 'views/preview/contenido.html',   controller: DefaultCtrl}).
                when('/pagina/:mongo/seccion/:id', {templateUrl: 'views/preview/editarSeccion.html',   controller: DefaultCtrl}).
                when('/pagina/:mongo/estilo', {templateUrl: 'views/preview/estilo.html',   controller: EstiloCtrl}).
                when('/pagina/:mongo/agregar', {templateUrl: 'views/preview/agregar.html',   controller: SeccionCtrl}).
                otherwise({redirectTo: '/home'});
}]);

/* Controllers */
function MainCtrl($scope, $routeParams, Page , Pagina, Seccion, $location) {        
    $scope.page= Page;

    //  Hace funcionar el menú lateral
    var snapper = new Snap({
      element: document.getElementById('content'),
      disable: 'right'
    });


  
}

