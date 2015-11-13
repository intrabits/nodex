

angular.module('app.galeria.service',  ['ngRoute'])

        .factory ('Galeria', ['$http',function ($http) {

            return {

                all:function (callback) {
                  $http.get('/api/pagina/misPaginas').success(function (data) {
                        // return data;
                          callback(null,data);

                     });
                },
                create:function (datos, callback) {
                    return $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/pagina'
                      });
                },
                update:function (pagina_id, datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'PUT',
                          url     : '/api/pagina/'+ pagina_id
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },

              
                addGaleria:function (datos, pagina_id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/pagina/'+pagina_id +'/galerias'
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            console.log(err);
                            callback('Hubo un error',null);
                        });
                },
                getGaleria:function (id,galeria_id,callback) {

                  $http.get('/api/pagina/'+id+'/galeria/'+galeria_id).success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                updateGaleria:function (pagina_id, galeria_id, datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'PUT',
                          url     : '/api/pagina/'+ pagina_id + '/galeria/' + galeria_id
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },
                getGalerias:function (id,callback) {
                  $http.get('/api/pagina/'+id+'/galerias').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                updateImagen:function (datos, id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'PUT',
                          url     : '/api/pagina/imagen/' + id
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error: '+err,null);
                        });
                },
                deleteImg:function (id, callback) {
                    $http({
                          method  : 'DELETE',
                          url     : '/api/pagina/imagen/'+id
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback(err,null);
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
                },
                getImagenes:function (pagina,id,callback) {

                  $http.get('/api/pagina/'+pagina+'/galeria/'+id+'/imagenes').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                seguidores:function (pagina_id,callback) {
                  $http.get('/api/pagina/'+pagina_id+'/seguidores').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                getBanners:function (id,callback) {
                  $http.get('/api/pagina/banners/'+id).success(function (data) {
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                deleteBanner:function (id,callback) {
                  $http.delete('/api/pagina/banners/'+id).success(function (data) {
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                updateBanner:function (datos, id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'PUT',
                          url     : '/api/pagina/banners/' + id
                      })
                        .success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback(err,null);
                        });
                }
            };
}]);
