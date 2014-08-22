'use strict';
angular.module('app.pagina', [])
  .controller('PaginasCtrl',function($scope,$modal,$log,Pagina){    

    Pagina.all(function (err, data) {
      if (err) {
        $scope.notify('danger','Ocurrió un error al cargar las páginas');
      } else{
        $scope.paginas = data;
      };
    });

}).controller('PaginaCtrl',function($scope,$modal,$window,Pagina,$routeParams,$http,$q){    

  var pagina_id = $routeParams.pagina_id;
  $scope.hoy = Date();
  $scope.pagina = {};
  $scope.facebook = {};
  $scope.FormAddPagina = {};

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
      }
     
    })();

  $scope.subdominio = function  (nombre) {    
    $scope.FormAddPagina.pagina_subdominio = normalize(nombre)+"."+$scope.main.dominio;
  }
  

  Pagina.getPaquetes(function (err, data) {
    if (err) {console.log(err);}
    else{
      $scope.tipos = data;
    };
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
        $scope.subdominio(data.name)
      }).error(function () {
        console.log("error");
        $scope.notify('danger','La URL ingresada no es válida');
      });    
    }else{
      $scope.notify('danger','La URL ingresada no es válida');
    }
    
    
    

  }

    if (pagina_id) {            
      Pagina.getOne(pagina_id,function (err, data) {
        if (err) {console.log("Error al cargar la página");}
        else{
          $scope.FormEditPagina = data;
          if (data.pagina_portada) {
            if (data.pagina_portada.length<50) {
              $scope.FormEditPagina.pagina_portada = $scope.main.base+data.pagina_portada;
            };
          };
          if (data.pagina_facebook) {
            Pagina.getFacebook(data.pagina_facebook,function (err,data) {
              if (err) {console.log(err);}
              else{
                $scope.facebook = data;              
              };
            });
          };
            
        };
      });
   
    };


      $scope.editPagina = function() {
        var datos;
        datos = $scope.FormEditPagina      
        Pagina.update(pagina_id,datos,function (err, data) {
          if (err) {alert(err);} else{
            $('#result').html('<div class="alert alert-success">Editado correctamente</div>').delay(3000).hide('explode');
            $scope.notify('success','Editado correctamente');
          };
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
            
            
          };
        });  
        };
        
      }


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


}).controller('EstiloCtrl',function($scope,$routeParams,Pagina,$http,$route){    
    var pagina_id = $routeParams.pagina_id
    $scope.estilo = {};

    function getEstilo () {
      Pagina.getOne(pagina_id,function (err, data) {
          if (err) {
            console.log(err);
            $scope.notify('dange','Error al cargar la página');
          }
          else{          
            $scope.estilo = data;                      
          };
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
            if (size=='phone') {
              var myWindow = window.open(dominio, "MsgWindow", "width=480, height=700");              
            }else{
              var myWindow = window.open(dominio, "MsgWindow", "width=1200, height=800");              
            }
            
        }


}).controller('PaginaCuentasCtrl',function($scope,$modal,$log,Pagina,$routeParams,$http){    

  var pagina_id = $routeParams.pagina_id;
  $scope.FormAddCuenta = {};

  function getCuentas () {
    Pagina.getCuentas(pagina_id,function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.cuentas = data;
      };
    })
  }

  function getCuentasDisponibles(){
    Pagina.getOne(pagina_id,function (err, data) {
        if (err) {console.log("Error al cargar la página");}
        else{
          $scope.disponibles = data.pagina_cuentas_disponibles;
          $scope.usadas = data.pagina_cuentas_usadas;
        };
    });
  }

  $scope.addCuenta = function () {
    var pagina_id = $routeParams.pagina_id;
    Pagina.addCuenta($scope.FormAddCuenta,pagina_id,function (err, data) {
      if (err) {
        $scope.notify('danger','Algo salió mal')
      } else{
        getCuentas();
        getCuentasDisponibles();
        $scope.notify('success','Cuenta agregada exitosamente');
        $scope.FormAddCuenta = {};
      };
    })

  }

  getCuentas();
  getCuentasDisponibles();
}).controller('PublicacionesCtrl',function($scope,Pagina,$routeParams,$http,$route){    

  var pagina_id = $routeParams.pagina_id;
  $scope.FormAddPublicacion = {};
  $scope.FormEditPublicacion = {};

  function getPublicaciones () {
    Pagina.getPublicaciones(pagina_id,function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.publicaciones = data;
      };
    })
  } 
  function getPublicacion () {
    Pagina.getPublicacion($routeParams.pagina_id,$routeParams.publicacion_id,function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.FormEditPublicacion = data;
      };
    })
  } 

  $scope.addPublicacion = function () {
    var pagina_id = $routeParams.pagina_id;
    Pagina.addPublicacion($scope.FormAddPublicacion,pagina_id,function (err, data) {
      if (err) {
        $scope.notify('danger','Algo salió mal')
      } else{
        getPublicaciones();        
        $scope.notify('success','Publicación agregada exitosamente');
        $scope.FormAddPublicacion = {};
        $('#myCode').html('.');
      };
    });
  }

  $scope.upImg = function(files) {
           var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);            
            $http.post('/api/pagina/publicacion/'+$routeParams.publicacion_id +'/upload', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function () {
              $scope.notify('success','Listo');
              $route.reload();
            }).error(function (err) {
              $scope.notify('danger','Algo salió mal');
            });

        };

  $scope.editPublicacion = function () {
    var pagina_id = $routeParams.pagina_id;
    Pagina.updatePublicacion(pagina_id,$routeParams.publicacion_id,$scope.FormEditPublicacion,function (err, data) {
      if (err) {
        $scope.notify('danger','Algo salió mal')
      } else{
        getPublicaciones();        
        $scope.notify('success','Publicación editada exitosamente');
        $scope.FormAddPublicacion = {};
      };
    });

  }
  if ($routeParams.publicacion_id) {
    getPublicacion();
  }else{
    getPublicaciones();    
  }


  function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    var myId;

    $scope.buscarVideo = function () {
      var myUrl = $('#myUrl').val();
      myId = getId(myUrl);
      $('#myCode').html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>');
      $scope.FormAddPublicacion.publicacion_video = myId;
    }
  
}).controller('PaginaMensajesCtrl',function($scope,Pagina,$routeParams){    

  var pagina_id = $routeParams.pagina_id;  
  $scope.pagina_id = pagina_id;  

  function getMensajes() {
    Pagina.getMensajes(pagina_id,function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.mensajes = data;
      };
    })
  } 
  function getNotificacionesMensajesPagina(){
    Pagina.getMensajesAll(function (err,data) {
      if (err) {
        $scope.notify('danger','No se pudieron cargar tus notificaciones');
      } else{
        $scope.notificacionesMensajes = data;                  
        $scope.notificacionesMensajesTotal = $scope.notificacionesMensajes.length;
      };
    });
  }     
  function getMensajesStats() {
    Pagina.getMensajesStats(pagina_id,function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.stats = data;
      };
    })
  } 
  function getMensaje () {
    Pagina.getMensaje($routeParams.pagina_id,$routeParams.mensaje_id,function (err, data) {
      if (err) {console.log(err);}
      else{
        $scope.single = 1;
        $scope.mensaje = data;
        getNotificacionesMensajesPagina();
      };
    });    
  } 



  if ($routeParams.mensaje_id) {
    getMensaje();
  }else{
    getMensajes();    
    getMensajesStats();    
  }

  
}).controller('GaleriasCtrl',function($scope,$window,Pagina,$routeParams,$route,$http){    

  var pagina_id = $routeParams.pagina_id;
  var galeria_id = $routeParams.galeria_id;
  $scope.pagina_id = pagina_id;  
  $scope.FormAddGaleria = {};
  $scope.FormEditGaleria = {};

  function getGalerias() {    
    Pagina.getGalerias(pagina_id,function (err, data) {
      if (err) {console.log(err);}
      else{        
        $scope.galerias = data;
      };
    })
  }

        

  function getGaleria() {    
    Pagina.getGaleria(pagina_id,galeria_id,function (err, data) {      ;
      if (err) {console.log(err);}
      else{        
        $scope.FormEditGaleria = data;
      };
    })
  } 
  function getImagenes() {    
    Pagina.getImagenes(pagina_id,galeria_id,function (err, data) {      ;
      if (err) {console.log(err);}
      else{        
        $scope.imagenes = data;
      };
    })
  } 

  $scope.addGaleria = function () {
    var pagina_id = $routeParams.pagina_id;
    Pagina.addGaleria($scope.FormAddGaleria,pagina_id,function (err, data) {
      if (err) {
        $scope.notify('danger','Algo salió mal')
      } else{
        getGalerias();        
        $scope.notify('success','Galería agregada exitosamente');
        $scope.FormAddGaleria = {};
      };
    });
  }

  $scope.editGaleria = function () {
    var pagina_id = $routeParams.pagina_id;
    Pagina.updateGaleria(pagina_id,galeria_id,$scope.FormEditGaleria,function (err, data) {
      if (err) {
        $scope.notify('danger','Algo salió mal')
      } else{
        getGalerias();        
        $scope.notify('success','Galería editada exitosamente');
        $scope.FormAddGaleria = {};
      };
    });
  }


  $scope.FormGaleria = function () {
    $('#vista1').hide('explode');
    $('#vista2').show();
  };
  $scope.CancelarAddGaleria = function () {
    $('#vista1').show('explode');
    $('#vista2').hide();
  }


  $scope.redirect = function () {
    alert('msg');
    $window.location.href= "#/dashboard";
    var modalInstance = $modal.$close();

  }

  if (galeria_id) {
    getGaleria();
    getImagenes();
  } else{
    getGalerias();
  };

  $scope.uploadImage = function(files) {        
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);                        
        $http.post('/api/pagina/'+ pagina_id +'/galeria/'+galeria_id+'/upload', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function () {              
          $scope.notify('success','Se subió correctamente!');
          getImagenes();              

        }).error(function () {
          $route.reload();
          getImagenes();
          $scope.notify('danger','Se subió la imágen correctamente');
          
        });

    };

    $scope.editarImg = function (id) {
      var titulo = prompt('Ingresa el título de la imágen');
      var descripcion = prompt('Ingresa la descripción');

      var datos = {
        imagen_titulo:titulo,
        imagen_descripcion:descripcion
      }

      Pagina.updateImagen(datos,id,function (err, data) {
        if (err) {
          $scope.notify('danger',"Ocurrió un error");
        } else{          
          $scope.notify('success',"Imágen editada");
          $route.reload();

        };
      });
    }
  
});
