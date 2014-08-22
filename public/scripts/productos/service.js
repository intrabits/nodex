
/* Modelo Producto */

angular.module('ModeloProducto',  ['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Producto', ['$http',function ($http) {                                   
            
            return {
                test:function (nada) {
                  alert('holaaa');
                },
                all:function (callback) {                  
                  $http.get('/api/pagina/misPaginas').success(function (data) {
                        // return data;                        
                          callback(null,data);
                                  
                     });
                },                
                getCategorias:function (callback) {                  
                  $http.get('/api/producto/categorias').success(function (data) {
                          callback(null,data);                       
                     }).error(function (data) {
                          callback("EROR",null);
                     });
                },
                getImagenes:function (id,callback) {                  
                  $http.get('/api/producto/'+id+'/imagenes').success(function (data) {
                          callback(null,data);                       
                     }).error(function (data) {
                        console.log(data);
                          callback("EROR",null);
                     });
                },
                fotos:function (id,callback) {                  
                  $http.get('/api/producto/'+id+'/imagenes').success(function (data) {
                          callback(null,data);                       
                     }).error(function (data) {
                          callback("EROR",null);
                     });
                },
                misProductos:function (pagina_id,callback) {                  
                  $http.get('/api/producto/pagina/'+pagina_id).success(function (data) {
                          callback(null,data);                       
                     }).error(function (data) {
                          callback(data,null);
                     });
                },
                detail:function (producto_id,callback) {                  
                  $http.get('/api/producto/'+producto_id).success(function (data) {
                          callback(null,data);                       
                     }).error(function (data) {
                          callback(data,null);
                     });
                },
                create:function (datos,pagina_id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/producto/pagina/'+pagina_id+"/add"
                      })
                        .success(function(data) {                            
                            callback(null,data);
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },

                update:function (id, datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'PUT',
                          url     : '/api/producto/'+ id                          
                      })
                        .success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                }
            }
}]);
