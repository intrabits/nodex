
/* Modelo pagos */

angular.module('ModelUser',['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('User', ['$http',function ($http) {                                   
            
            return {
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/user/add'
                      })
                        .success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                profile:function (callback) {
                    $http.get('/api/user/profile').success(function (data) {
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
                          url     : '/api/user/edit'
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
                          url     : '/api/user/editPass'
                      }).success(function(data) {                            
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                nick:function (nick ,callback) {
                  $http.get('/api/user/nick/'+nick).success(function (data) {
                        // return data;          
                        if (data!="") {
                          callback(null,data);
                        };              
                          
                                  
                     });
                }
            }
}]);
