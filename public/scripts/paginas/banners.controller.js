(function () {
  'use strict';
  angular
    .module('app.pagina.banners',[])
    .controller('BannersCtrl',['$scope','Pagina','$routeParams','$http',function($scope,Pagina,$routeParams,$http){

      var pagina_id = $routeParams.pagina_id;

      $scope.uploadBanner = function(files) {
            var fd = new FormData();
            fd.append("file", files[0]);

            $http.post('/api/pagina/banners/pbanner/'+pagina_id, fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function () {
              $scope.notify('success','Se subió correctamente!');
              getBanners();
            }).error(function () {
              $scope.notify('warning','Error al subir la imagen');
            });

        };

        $scope.deleteBanner = function (banner_id) {
          var si = confirm('Realmente deseas eliminar este banner?');
          if (si) {
            Pagina.deleteBanner(banner_id,function (err,data) {
              if (err) {
                $scope.notify('warning',err);
              } else {
                $scope.notify("success",data);
                getBanners();
              }
            });
          }
        };

        $scope.updateBanner = function (banner_id) {
            var texto = prompt("Ingresa un texto para el banner");
            var url   = prompt("Ingresa una URL para el banner");
            var datos = {
              banner_texto:texto,
              banner_url:url,
              banner_pagina_id:pagina_id
            };

            Pagina.updateBanner(datos,banner_id,function (err,data) {
              if (err) {
                $scope.notify('warning',err);
              } else {
                $scope.notify("success",data);
                getBanners();
              }
            });

        };


        function getBanners() {
          Pagina.getBanners(pagina_id,function (err,data) {
            if (err) {
              $scope.notify("error",err);
            } else {
              $scope.banners = data;
            }
          });
        }
        getBanners();


    }]);
})();
