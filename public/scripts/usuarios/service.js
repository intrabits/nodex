
/* Modelo pagos */

angular.module('ModeloUsuario',['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Usuario', ['$http',function ($http) {                                   
            
            return {
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/usuario/add'
                      })
                        .success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                perfil:function (callback) {
                    $http.get('/api/usuario/perfil').success(function (data) {
                        // return data;          
                        if (data) {
                          callback(null,data);
                        }else{
                          callback(null,'');
                        }              
                          
                                  
                     });
                },
                update:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/usuario/edit'
                      }).success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                updatePass:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/usuario/editPass'
                      }).success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                nick:function (nick ,callback) {
                  $http.get('/api/usuario/nick/'+nick).success(function (data) {
                        // return data;          
                        if (data!="") {
                          callback(null,data);
                        };              
                          
                                  
                     });
                }
            }
}]);
