'use strict';
angular.module('app.paginas.ctrl', []).controller('algo', [
  '$scope','$routeParams','$http', function($scope,$routeParams,$http) {
  
    var pagina_id = $routeParams.pagina_id;


    $scope.gato = 'hola';
    $scope.FormData = {};
    $scope.FormPagina = {};

    if (pagina_id) {
      $http.get('/api/pagina/'+pagina_id+'/secciones').success(function (data,status,headers,config) {
         $scope.secciones = data;
       });

      $http.get('/api/pagina/'+pagina_id).success(function (data,status,headers,config) {
         $scope.FormPagina = data;      
       });  
    };
    

    

    $scope.processForm = function() {
      var datos;
      alert(datos)
      datos = $scope.FormData
      console.log(datos);      
      $http({
          method  : 'POST',
          url     : '/api/pagina',
          data    :  datos,  // pass in data as string        
      })
        .success(function(data) {            
                        
                // $scope.message = data.message;
                // $window.location.href="/pagina/";
            
        }).error(function(err){
          alert('Algo salió mal'+err);
        });
      };

      $scope.editPagina = function() {
      var datos;
      datos = $scope.FormPagina
      console.log(datos);      
      $http({
          method  : 'PUT',
          url     : '/api/pagina/'+pagina_id,
          data    :  datos,  // pass in data as string        
      })
        .success(function(data) {
            console.log(data);
            $('#result').html('<div class="alert alert-success">Editado correctamente</div>').delay(3000).hide('explode');
                // $scope.message = data.message;
                // $window.location.href="/pagina/";
            
        }).error(function(err){
          alert('Algo salió mal'+err);
        });
      };




}
]).controller('menu',['$scope','$routeParams','$http',function( $scope, $routeParams, $http){
  $scope.prueba='hola';
  $scope.pages='';



}]).controller('faqs',['$scope','$routeParams','$http',function( $scope, $routeParams, $http){
  
  $http.get('/api/faqs').success(function (data,status,headers,config) {
       $scope.categorias = data;
     });
  $scope.categoria_seleccionada='';
  $scope.faq_seleccionada='';
  
  $scope.categoria_titulo = 'Más leídas';
  $scope.getPreguntas = function(categoria_id,categoria){
    if (categoria_id) {
      $http.get('/api/faqs/'+categoria_id).success(function (data,status,headers,config) {
         $scope.faqs = data;              
         $scope.categoria_titulo = categoria;
         $scope.categoria_seleccionada=categoria_id;
       });
      }else{
          $scope.categoria_titulo = 'Más leídas';
      }
    }
  $scope.getFaq = function(faq_id){      
  
      $http.get('/api/faq/'+faq_id).success(function (data,status,headers,config) {        
          $scope.faq_seleccionada = faq_id;
          $scope.faq = data;
       }).error(function () {
          alert('Ocurrió un error al cargar la pregunta');
       });      
    }

}]);
