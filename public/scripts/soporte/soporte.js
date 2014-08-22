'use strict';
angular.module('app.soporte', []).controller('faqs',['$scope','$routeParams','$http',function( $scope, $routeParams, $http){
  
  $http.get('/api/soporte/faqs').success(function (data,status,headers,config) {
       $scope.categorias = data;
     });
  $scope.categoria_seleccionada='';
  $scope.faq_seleccionada='';
  
  $scope.categoria_titulo = 'Más leídas';
  $scope.getPreguntas = function(categoria_id,categoria){
    if (categoria_id) {
      $http.get('/api/soporte/faqs/'+categoria_id).success(function (data,status,headers,config) {
         $scope.faqs = data;              
         $scope.categoria_titulo = categoria;
         $scope.categoria_seleccionada=categoria_id;
       });
      }else{
          $scope.categoria_titulo = 'Más leídas';
      }
    }
  $scope.getFaq = function(faq_id){      
  
      $http.get('/api/soporte/faq/'+faq_id).success(function (data,status,headers,config) {        
          $scope.faq_seleccionada = faq_id;
          $scope.faq = data;
       }).error(function () {
          alert('Ocurrió un error al cargar la pregunta');
       });      
    }

}]);
