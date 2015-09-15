(function () {
  'use strict';


  angular
      .module('app.publicacion.service',  ['ngRoute'])

          .factory ('Publicacion', ['$http',function ($http) {

              return {


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
                  }

              };
  }]);

})();
