
/* Modelo pagos */

angular.module('ModeloPagos',  ['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Pago', ['$http','$routeParams',function ($http,$routeParams) {                                   
            
            return {
                test:function (nada) {
                  alert('holaaa');
                },
                all:function (callback) {                  
                  $http.get('/api/pacientes').success(function (data) {
                        // return data;                        
                          callback(null,data);
                                  
                     });
                },
                
                getOne:function (id,callback) {                  
                  $http.get('/api/paciente/'+id).success(function (data) {
                        // return data;                        
                          callback(null,data);                        
                     });
                },
                deleteSeccion:function (mongo, id, callback) {
                    $http({
                          method  : 'DELETE',
                          url     : '/api/pagina/'+mongo+'/seccion/'+id                          
                      })
                        .success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                }
            }
}]);
