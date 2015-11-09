(function () {
  'use strict';

  angular
    .module('app.producto.service',  ['ngRoute'])

          .factory ('Producto', ['$http',function ($http) {

              return {

                  all:function (callback) {
                    $http.get('/api/pagina/misPaginas').success(function (data) {
                          // return data;
                            callback(null,data);

                       });
                  },
                  delete:function (id) {
                    return $http.delete('/api/producto/' + id);
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
                  misProductos:function (pagina_id) {
                    return $http.get('/api/pagina/'+pagina_id + '/productos');

                  },
                  deleteImagen:function (id,callback) {
                    $http.delete('/api/producto/imagen/'+id).success(function (data) {
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
                  create:function (datos) {
                      return $http({
                            data    :  datos,
                            method  : 'POST',
                            url     : '/api/producto/'
                        });
                  },

                  update:function ( datos, id, callback) {
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
              };
  }]);

})();
