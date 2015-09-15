(function () {
  'use strict';
  angular.module('app.pagina', [
    'app.pagina.service',
    'app.pagina.banners',
    'app.pagina.galeria',
    'app.pagina.estilo',
    'app.pagina.publicacion',
    'app.pagina.mensajes'
  ])
    .controller('PaginasCtrl',function($scope,$modal,$log,Pagina){

      Pagina.all(function (err, data) {
        if (err) {
          $scope.notify('danger','Ocurrió un error al cargar las páginas');
        } else{
          $scope.paginas = data;
        }
      });

  }).controller('PaginaCtrl',['$scope','$modal','$window','Pagina','$routeParams','$http',function($scope,$modal,$window,Pagina,$routeParams,$http){

    var pagina_id = $routeParams.pagina_id;
    $scope.hoy = Date();
    $scope.pagina = {};
    $scope.facebook = {};
    $scope.FormAddPagina = {};

    // TODO usar la función de lodash
    var normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};

        for(var i = 0, j = from.length; i < j; i++ )
            mapping[ from.charAt( i ) ] = to.charAt( i );

        return function( str ) {
            var ret = [];
            for( var i = 0, j = str.length; i < j; i++ ) {
                var c = str.charAt( i );
                if( mapping.hasOwnProperty( str.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }
            return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
        };

      })();

    $scope.subdominio = function  (nombre) {
      $scope.FormAddPagina.pagina_subdominio = normalize(nombre)+"."+$scope.main.dominio;
    };


    Pagina.getPaquetes(function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.tipos = data;
      }
    });

    $scope.buscarFB = function () {

      var facebookID = $('#facebookID').val();
      var partir = facebookID.split( 'facebook.com/' );
      if (partir[1]) {
        partir = partir[1];
        partir = partir.split('?');
        partir = partir[0];
        partir = partir.split('/');
        partir = partir[0];
        $http.get("http://graph.facebook.com/"+partir).success(function (data) {
          $scope.facebook = data;
          $scope.FormAddPagina.pagina_logo = "http://graph.facebook.com/"+facebookID+"/picture";
          $scope.FormAddPagina.pagina_portada = data.cover.source;
          $scope.FormAddPagina.pagina_nombre = data.name;
          $scope.FormAddPagina.pagina_descripcion = data.about;
          $scope.FormAddPagina.pagina_telefono = data.phone;
          $scope.FormAddPagina.pagina_facebook = $('#facebookID').val();
          // $scope.FormAddPagina.pagina_subdominio = data.name+"."+$scope.main.dominio;
          $scope.subdominio(data.name);
        }).error(function () {
          console.log("error");
          $scope.notify('danger','La URL ingresada no es válida');
        });
      }else{
        $scope.notify('danger','La URL ingresada no es válida');
      }




    };

      if (pagina_id) {
        Pagina.getOne(pagina_id,function (err, data) {
          if (err) {console.log("Error al cargar la página");}
          else{
            $scope.FormEditPagina = data;
            if (data.pagina_portada) {
              if (data.pagina_portada.length<50) {
                $scope.FormEditPagina.pagina_portada = $scope.main.base+data.pagina_portada;
              }
            }
            if (data.pagina_facebook) {
              Pagina.getFacebook(data.pagina_facebook,function (err,data) {
                if (err) {console.log(err);}
                else{
                  $scope.facebook = data;
                }
              });
            }

          }
        });

      }


        $scope.editPagina = function() {
          var datos;
          datos = $scope.FormEditPagina;
          Pagina.update(pagina_id,datos,function (err, data) {
            if (err) {alert(err);} else{
              $('#result').html('<div class="alert alert-success">Editado correctamente</div>').delay(3000).hide('explode');
              $scope.notify('success','Editado correctamente');
            }
          });
        };

        $scope.crearPagina = function() {
          var datos = $scope.FormAddPagina;
          if (datos.pagina_dominio&&datos.pagina_nombre) {
          Pagina.create(datos,function (err, data) {
            if (err) {console.log(alert);} else{
              $scope.notify('success','Página creada correctamente');
              console.log(data);

                $window.location.href= "#/pagina/"+data;


            }
          });
          }

        };


        $scope.uploadFile = function(files) {
              var fd = new FormData();
              //Take the first selected file
              fd.append("file", files[0]);

              $http.post('/api/upload/'+$routeParams.pagina_id, fd, {
                  withCredentials: true,
                  headers: {'Content-Type': undefined },
                  transformRequest: angular.identity
              }).success(function () {
                $scope.notify('success','Todo salió bien');
              }).error(function () {
                $scope.notify('danger','Todo salió mal');
              });

          };


        $scope.uploadLogo = function(files) {
              var fd = new FormData();
              //Take the first selected file
              fd.append("file", files[0]);


              $http.post('/api/upload', fd, {
                  withCredentials: true,
                  headers: {'Content-Type': undefined },
                  transformRequest: angular.identity
              }).success(function () {
                $scope.notify('success','Todo salió bien');
              }).error(function () {
                $scope.notify('danger','Todo salió mal');
              });

          };


  }]).controller('SeguidoresCtrl',['$scope','Pagina','$routeParams',function($scope,Pagina,$routeParams){

    var pagina_id = $routeParams.pagina_id;
    Pagina.seguidores(pagina_id,function (err,data) {
      if (err) {
        console.log(err);
        $scope.notify('danger','Error al recuperar los registros');
      } else{
        $scope.seguidores = data;
      }
    });

  }]);

})();
