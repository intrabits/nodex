(function () {
  'use strict';

  angular
    .module('app.admin.service',  ['ngRoute'])

          .factory ('Admin', ['$http',function ($http) {

              return {

                  dominios:function (callback) {
                    $http.get('/api/admin/dominios').success(function (data) {
                          // return data;
                            callback(null,data);

                       }).error(function(){
                          callback(error,null);
                       });
                  },
                  websites:function (callback) {
                    $http.get('/api/admin/websites').success(function (data) {
                          // return data;
                            callback(null,data);

                       }).error(function(){
                          callback(error,null);
                       });
                  },
                  apps:function (callback) {
                    $http.get('/api/admin/apps').success(function (data) {
                          // return data;
                            callback(null,data);

                       }).error(function(){
                          callback(error,null);
                       });
                  },

                  getOne:function (id,callback) {
                    $http.get('/api/paciente/'+id).success(function (data) {
                          // return data;
                            callback(null,data);
                       });
                  },
                  deleteApp:function (name,callback) {
                      $http({
                            method  : 'DELETE',
                            url     : '/api/admin/app/'+name
                        })
                          .success(function(data) {
                              callback(null,data);
                          }).error(function(err){
                              callback(err,null);
                          });
                  },
                  deleteWebsite:function (name,callback) {
                      $http({
                            method  : 'DELETE',
                            url     : '/api/admin/website/'+name
                        })
                          .success(function(data) {
                              callback(null,data);
                          }).error(function(err){
                              callback(err,null);
                          });
                  },
                  deleteDomain:function (name,callback) {
                      $http({
                            method  : 'DELETE',
                            url     : '/api/admin/domain/'+name
                        })
                          .success(function(data) {
                              callback(null,data);
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
                  }
              };
  }]);

})();
