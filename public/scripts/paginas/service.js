

angular.module('app.pagina.service',  ['ngRoute'])

        .factory ('Pagina', ['$http',function ($http) {

            return {

                all:function (callback) {
                  $http.get('/api/pagina/misPaginas').success(function (data) {
                        // return data;
                          callback(null,data);

                     });
                },
                getPaquetes:function (callback) {
                  $http.get('/api/pagina/paquetes/').success(function (data) {
                        // return data;
                          callback(null,data);

                     });
                },
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/pagina'
                      })
                        .success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback('Hubo un error',null);
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

                getOne:function (id,callback) {
                  $http.get('/api/pagina/'+id).success(function (data) {
                        // return data;
                          callback(null,data);
                     });
                },

                getFacebook:function (id,callback) {
                  $http.get('http://graph.facebook.com/'+id).success(function (data) {
                        // return data;
                          callback(null,data);
                     });
                },

                expired:function (callback) {
                  $http.get('/api/pagina/vencidas').success(function (data) {
                        // return data;
                          callback(null,data);
                     });
                },


                getSecciones:function (id,callback) {

                  $http.get('/api/pagina/'+id+'/secciones').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function () {
                       alert('Algo salió mal, intenta de nuevo más tarde');
                     });
                },

                getSeccion:function (id,callback) {

                  $http.get('/api/seccion/'+id).success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function () {
                       alert('Algo salió mal, intenta de nuevo más tarde');
                     });
                },

                getCuentas:function (id,callback) {

                  $http.get('/api/pagina/'+id+'/cuentas').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function () {
                       alert('Algo salió mal, intenta de nuevo más tarde');
                     });
                },
                addCuenta:function (datos, pagina_id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/pagina/'+pagina_id +'/cuentas'
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            console.log(err);
                            callback('Hubo un error',null);
                        });
                },
                getPublicaciones:function (id,callback) {

                  $http.get('/api/pagina/'+id+'/publicaciones').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                          callback('Error',null);
                     });
                },
                getPublicacion:function (pagina_id,id,callback) {

                  $http.get('/api/pagina/'+pagina_id+'/publicacion/'+id).success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                addPublicacion:function (datos, pagina_id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/pagina/'+pagina_id +'/publicaciones'
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            console.log(err);
                            callback('Hubo un error',null);
                        });
                },
                deletePublicacion:function (id) {
                  return $http.delete('/api/publicaciones/' + id);
                },
                updatePublicacion:function (pagina_id, publicacion_id, datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'PUT',
                          url     : '/api/pagina/'+ pagina_id + '/publicacion/' + publicacion_id
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Hubo un error',null);
                        });
                },
                togglePublicacion:function (publicacion_id, callback) {
                    $http.get('/api/pagina/publicacion/'+publicacion_id+'/toggle').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                        callback('Error',null);
                     });
                },
                getMensajes:function (id,callback) {

                  $http.get('/api/pagina/'+id+'/mensajes').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                getMensajesAll:function (callback) {

                  $http.get('/api/pagina/mensajes/unread').success(function (data) {
                        // return data;
                        callback(null,data);
                      }).error(function (err) {
                        callback("Error",null);
                      });
                },
                getMensajesLatest:function (callback) {

                  $http.get('/api/pagina/mensajes/latest').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                getMensaje:function (id, mensaje_id, callback) {

                  $http.get('/api/pagina/'+id+'/mensaje/'+mensaje_id).success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
                     });
                },
                getMensajesStats:function (id,callback) {

                  $http.get('/api/pagina/'+id+'/mensajes/stats/').success(function (data) {
                        // return data;
                          callback(null,data);
                     }).error(function (err) {
                       console.log(err);
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
