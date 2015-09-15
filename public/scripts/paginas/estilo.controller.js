(function () {
  'use strict';
  angular
    .module('app.pagina.estilo',[])
    .controller('EstiloCtrl',['$scope','$routeParams','Pagina','$http','$route',function($scope,$routeParams,Pagina,$http,$route){
        var pagina_id = $routeParams.pagina_id;
        $scope.estilo = {};

        function getEstilo () {
          Pagina.getOne(pagina_id,function (err, data) {
              if (err) {
                console.log(err);
                $scope.notify('dange','Error al cargar la página');
              }
              else{
                $scope.estilo = data;
              }
            });
        }

        getEstilo();

          $scope.upImg = function(files, tipo) {
               var fd = new FormData();
                //Take the first selected file
                fd.append("file", files[0]);
                fd.append("tipo",tipo);
                $http.post('/api/pagina/'+$routeParams.pagina_id +'/upload/'+tipo, fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(function () {
                  $scope.notify('success','Listo');
                  getEstilo();
                }).error(function (err) {
                  $scope.notify('danger','Algo salió mal');
                });

            };

            $scope.vistaPrevia = function(dominio,size) {
              dominio = 'http://'+dominio;
              var myWindow;
                if (size=='phone') {
                  myWindow = window.open(dominio, "MsgWindow", "width=480, height=700");
                }else{
                  myWindow = window.open(dominio, "MsgWindow", "width=1200, height=800");
                }

            };

    }]);
})();
