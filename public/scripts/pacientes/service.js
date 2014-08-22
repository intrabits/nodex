
/* Modelo pacientes */

angular.module('ModeloConsultorio',  ['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Paciente', ['$http','$routeParams',function ($http,$routeParams) {                                   
            
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
                getTipos:function (callback) {                  
                  $http.get('/api/consultas').success(function (data) {
                        // return data;                        
                          callback(null,data);                        
                     });
                },

                getHistorial:function (id,callback) {                  
                  $http.get('/api/paciente/'+id+'/consultas').success(function (data) {
                        // return data;                        
                          callback(null,data);                        
                     });
                },

                settings:function (pagina_id,callback) {
                    $http.get('/api/pagina/'+ pagina_id ).success(function (data,status,headers,config) {
                        // return data;
                        callback(null,data);
                     });
                },
                add:function (datos, callback) {
                    $http({
                          method  : 'POST',
                          url     : '/api/paciente',
                          data    :  datos,  // pass in data as string        
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },
                edit:function (id, datos, callback) {
                    $http({
                          method  : 'PUT',
                          url     : '/api/paciente/'+id,
                          data    :  datos,  // pass in data as string        
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },
                addConsulta:function (paciente_id, datos, callback) {
                    $http({
                          method  : 'POST',
                          url     : '/api/paciente/'+paciente_id+'/consulta',
                          data    :  datos,  // pass in data as string        
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },
                editRedes:function (mongo, datos, callback) {
                    $http({
                          method  : 'PUT',
                          url     : '/api/pagina/'+mongo+'/redes',
                          data    :  datos,  // pass in data as string        
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },
                addSeccion:function (mongo, datos, callback) {
                    $http({
                          method  : 'POST',
                          url     : '/api/pagina/'+mongo,
                          data    :  datos,  // pass in data as string        
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
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
