'use strict';
angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap','textAngular', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.controllers', 'app.directives', 'app.localization']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      redirectTo: '/dashboard'
    }).when('/preview/contenido.html', {
      templateUrl: 'views/servicios/facturas.html'
    }).when('/soporte/faqs', {
      templateUrl: 'views/soporte/faqs.html'
    }).when('/soporte/faqs/:faq_id', {
      templateUrl: 'views/soporte/faqs.html'
    });
  }
]);
