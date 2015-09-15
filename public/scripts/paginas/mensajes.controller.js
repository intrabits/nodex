(function () {
  'use strict';
  angular
    .module('app.pagina.mensajes',[])
    .controller('PaginaMensajesCtrl',['$scope','Pagina','$routeParams',function($scope,Pagina,$routeParams){

      var pagina_id = $routeParams.pagina_id;
      $scope.pagina_id = pagina_id;

      function getMensajes() {
        Pagina.getMensajes(pagina_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.mensajes = data;
          }
        });
      }
      
      function getNotificacionesMensajesPagina(){
        Pagina.getMensajesAll(function (err,data) {
          if (err) {
            $scope.notify('danger','No se pudieron cargar tus notificaciones');
          } else{
            $scope.notificacionesMensajes = data;
            $scope.notificacionesMensajesTotal = $scope.notificacionesMensajes.length;
          }
        });
      }
      function getMensajesStats() {
        Pagina.getMensajesStats(pagina_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.stats = data;
          }
        });
      }
      function getMensaje () {
        Pagina.getMensaje($routeParams.pagina_id,$routeParams.mensaje_id,function (err, data) {
          if (err) {console.log(err);}
          else{
            $scope.single = 1;
            $scope.mensaje = data;
            getNotificacionesMensajesPagina();
          }
        });
      }



      if ($routeParams.mensaje_id) {
        getMensaje();
      }else{
        getMensajes();
        getMensajesStats();
      }


    }]);
})();
