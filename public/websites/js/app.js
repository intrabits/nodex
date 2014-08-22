'use strict';
angular.module('app', ['ngRoute','app.controllers']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      redirectTo: '/dashboard'
    }).when('/dashboard', {
      templateUrl: 'views/home.html'
    }).when('/galeria', {
      templateUrl: 'views/galeria/galeria.html'     
    }).when('/pacientes', {
      templateUrl: 'views/pacientes/pacientes.html'
    }).when('/paciente/:paciente_id', {
      templateUrl: 'views/pacientes/paciente.html'    
    }).otherwise({
      redirectTo: '/404'
    });
  }
]);
