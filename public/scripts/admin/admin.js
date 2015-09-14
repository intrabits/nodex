(function () {
  'use strict';
  angular.module('app.admin', ['app.admin.service']).
  controller('AdminDashCtrl',['$scope','Admin','$routeParams','$route',function ($scope,Admin,$routeParams,$route) {


      $scope.paginas = {};
      $scope.listo = 0;

      // Admin.dominios(function (err,data) {
      //     if (err) {alert('Hubo un error');}
      //     else{
      //         $scope.apps = data;

      //     }
      // });
      function getWebsites(){
          Admin.websites(function (err,data) {
              if (err) {alert('Hubo un error');}
              else{
                  $scope.websites = data;
                  $scope.listo = $scope.listo+1;
                  $scope.notify('info',"Ya cargaron los websites");
              }
          });
      }


      function getApps () {
      	Admin.apps(function (err,data) {
  	        if (err) {alert('Hubo un error');}
  	        else{
  	            $scope.apps = data;
  	            $scope.listo = $scope.listo+1;
  	            $scope.notify('info',"Ya cargaron las apps");
  	        }
  	    });
      }

      //	Traer apps al cargar la página
      getApps();
      getWebsites();

      //  Ponemos el foco en la caja de búsqueda... porque somos flojos!
      $('#buscar').focus();


      $scope.borrarApp = function (id) {
      	var si = confirm("Seguro que quieres borrar la aplicación: "+id);
      	if (si) {
      		Admin.deleteApp(id,function (err, data) {
      			if (err) {alert("ERROR");console.log(err);}
      			else{
      				$scope.notify('success',"Aplicación borrada =S");
      				getApps();
      			}
      		});
      	}

      };

      $scope.borrarWebsite = function (id) {
          var si = confirm("Seguro que quieres borrar la aplicación: "+id);
          if (si) {
              Admin.deleteWebsite(id,function (err, data) {
                  if (err) {alert("ERROR");console.log(err);}
                  else{
                      $scope.notify('success',"Aplicación borrada =S");
                      getWebsites();
                  }
              });
          }

      };



  }]);

})();
