'use strict';
angular.module('app', ['ngRoute','ngSanitize', 'ngAnimate', 'ui.bootstrap', 'mgo-angular-wizard', 'textAngular', 'app.ui.ctrls',  'app.controllers', 'app.directives', 'app.localization','app.paginas.ctrl','app.servicios']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      redirectTo: '/dashboard'
    }).when('/dashboard', {
      templateUrl: 'views/dashboard.html'    
      templateUrl: 'views/mail/inbox.html'
    }).when('/mail/compose', {
      templateUrl: 'views/mail/compose.html'
    }).when('/mail/single', {
      templateUrl: 'views/mail/single.html'
    }).when('/pages/features', {
      templateUrl: 'views/pages/features.html'
    }).when('/pages/signin', {
      templateUrl: 'views/pages/signin.html'
    }).when('/pages/signup', {
      templateUrl: 'views/pages/signup.html'
    }).when('/pages/lock-screen', {
      templateUrl: 'views/pages/lock-screen.html'
    }).when('/pages/profile', {
      templateUrl: 'views/pages/profile.html'
    }).when('/404', {
      templateUrl: 'views/pages/404.html'
    }).when('/pages/500', {
      templateUrl: 'views/pages/500.html'
    }).when('/pages/blank', {
      templateUrl: 'views/pages/blank.html'
    }).when('/pages/invoice', {
      templateUrl: 'views/pages/invoice.html'
    }).when('/tasks', {
      templateUrl: 'views/tasks/tasks.html'    
    }).when('/pagina/:pagina_id', {
      templateUrl: 'views/paginas/pagina.html'
    }).when('/_=_', {
      templateUrl: 'views/dashboard.html'
    }).when('/servicios', {
      templateUrl: 'views/servicios/servicios.html'
    }).when('/servicios/porPagar', {
      templateUrl: 'views/servicios/pendientes.html'
    }).when('/servicios/facturas', {
      templateUrl: 'views/servicios/facturas.html'
    }).when('/soporte/faqs', {
      templateUrl: 'views/soporte/faqs.html'
    }).when('/soporte/faqs/:faq_id', {
      templateUrl: 'views/soporte/faqs.html'
    }).otherwise({
      redirectTo: '/404'
    });
  }
]);
