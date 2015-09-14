(function () {
  'use strict';
  angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'angular-loading-bar',
    'ngAnimate',
    'ui.bootstrap',
    'mgo-angular-wizard',
    'textAngular',
    'app.controllers',
    'app.directives',
    'app.localization',
    'app.servicios',
    'app.pagina',
    'app.soporte',
    'app.chat',
    'app.ui.services',
    'app.usuario',
    'ModeloUsuario',
    'app.producto',
    'app.tienda',
    'app.admin',
    ]).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        redirectTo: '/dashboard'
      }).when('/dashboard', {
        templateUrl: 'views/dashboard.html'
      }).when('/contacto', {
        templateUrl: 'views/soporte/contacto.html'
      }).when('/usuario/perfil', {
        templateUrl: 'views/usuario/perfil.html',
        controller: 'UsuarioCtrl'
      }).when('/usuario/password', {
        templateUrl: 'views/usuario/pass.html',
        controller:'UsuarioCtrl'
      }).when('/pagos', {
        templateUrl: 'views/pagos/pagos.html'
      }).when('/upload', {
        templateUrl: 'views/upload/test.html'
      }).when('/ui/typography', {
        templateUrl: 'views/pages/lock-screen.html'
      }).when('/pages/profile', {
        templateUrl: 'views/pages/profile.html'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).when('/pages/500', {
        templateUrl: 'views/pages/500.html'
      }).when('/pages/suspendida', {
        templateUrl: 'views/pages/suspendida.html'
      }).when('/pages/blank', {
        templateUrl: 'views/pages/blank.html'
      }).when('/pages/invoice', {
        templateUrl: 'views/pages/invoice.html'
      }).when('/tienda', {
        templateUrl: 'views/tienda/inicio.html',
        controller: ''
      }).when('/tienda/item/:producto_id', {
        templateUrl: 'views/tienda/item.html',
        controller: 'TiendaCtrl'
      }).when('/paginas', {
        templateUrl: 'views/paginas/paginas.html',
        controller: 'PaginasCtrl'
      }).when('/pagina/add', {
        templateUrl: 'views/paginas/addPagina.html',
        controller: 'PaginaCtrl'
      }).when('/pagina/:pagina_id/textos', {
        templateUrl: 'views/paginas/textos.html',
        controller:'PaginaCtrl'
      }).when('/pagina/:pagina_id', {
        templateUrl: 'views/paginas/dash.html',
        controller:'PaginaCtrl'
      }).when('/pagina/:pagina_id/config', {
        templateUrl: 'views/paginas/pagina.html',
        controller: 'PaginaCtrl'
      }).when('/pagina/:pagina_id/seguidores', {
        templateUrl: 'views/paginas/seguidores.html',
        controller: 'SeguidoresCtrl'
      }).when('/pagina/:pagina_id/banners', {
        templateUrl: 'scripts/paginas/banners.html',
        controller: 'BannersCtrl'
      }).when('/pagina/:pagina_id/success', {
        templateUrl: 'views/paginas/success.html',
        controller: 'PaginaCtrl'
      }).when('/pagina/:pagina_id/estilo', {
        templateUrl: 'views/paginas/estilo.html',
        controller: 'EstiloCtrl'
      }).when('/pagina/:pagina_id/publicaciones', {
        templateUrl: 'views/paginas/publicaciones.html',
        controller: 'PublicacionesCtrl'
      }).when('/pagina/:pagina_id/productos', {
        templateUrl: 'views/paginas/productos.html',
        controller: 'ProductoCtrl'
      }).when('/pagina/:pagina_id/producto/:producto_id', {
        templateUrl: 'views/paginas/producto.html',
        controller: 'ProductoDetalleCtrl'
      }).when('/pagina/producto/:producto_id', {
        templateUrl: 'views/paginas/producto.html',
        controller: 'ProductoCtrl'
      }).when('/pagina/:pagina_id/publicacion/:publicacion_id', {
        templateUrl: 'views/paginas/publicacion.html',
        controller: 'PublicacionesCtrl'
      }).when('/pagina/:pagina_id/cuentas', {
        templateUrl: 'views/paginas/cuentas.html',
        controller: 'PaginaCuentasCtrl'
      }).when('/pagina/:pagina_id/mensajes', {
        templateUrl: 'views/paginas/mensajes.html',
        controller: 'PaginaMensajesCtrl'
      }).when('/pagina/:pagina_id/mensaje/:mensaje_id', {
        templateUrl: 'views/paginas/mensajes.html',
        controller: 'PaginaMensajesCtrl'
      }).when('/pagina/:pagina_id/galerias', {
        templateUrl: 'views/paginas/galerias.html',
        controller: 'GaleriasCtrl'
      }).when('/pagina/:pagina_id/galeria/:galeria_id', {
        templateUrl: 'views/paginas/galeria.html',
        controller: 'GaleriasCtrl'
      }).when('/_=_', {
        templateUrl: 'views/dashboard.html'
      }).when('/servicios', {
        templateUrl: 'views/servicios/servicios.html',
        controller: 'serviciosCtrl'
      }).when('/servicios/porPagar', {
        templateUrl: 'views/servicios/pendientes.html'
      }).when('/servicios/facturas', {
        templateUrl: 'views/servicios/facturas.html'
      }).when('/soporte/faqs', {
        templateUrl: 'views/soporte/faqs.html'
      }).when('/soporte/chat', {
        templateUrl: 'views/soporte/chat.html',
        controller: 'ChatCtrl'
      }).when('/soporte/faqs/:faq_id', {
        templateUrl: 'views/soporte/faqs.html'
      }).when('/test', {
        templateUrl: 'views/pages/test.html',
        controller: ''
      }).when('/admin', {
        templateUrl: 'views/admin/dash.html',
        controller: 'AdminDashCtrl'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ]);

})();
