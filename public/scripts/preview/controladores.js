
function DefaultCtrl ($scope, $routeParams, Pagina, Page, Seccion, $modal, $route) {      
    var mongo = $routeParams.mongo;    
    Pagina.settings(mongo,function(err,data){
        $scope.pagina = data;
    });


  $scope.FormAddSeccion = {};

  $scope.addSeccion = function() {
      console.log('algo');
      Pagina.addSeccion($routeParams.mongo,$scope.FormAddSeccion,function (err, data) {
          if (err) {alert('Algo salió mal, intenta más tarde');}
          else{
              $route.reload();
          };
      })
  };

  $scope.FormRedes = {};
  $scope.editRedes = function() {      
      Pagina.editRedes($routeParams.mongo,$scope.FormRedes,function (err, data) {
          if (err) {alert('Algo salió mal, intenta más tarde');}
          else{
              $route.reload();
          };
      })
  };

  $scope.deleteSeccion = function(seccion_id) {
    var confirmar = confirm('Realmente quieres borrar esta sección?')
    if (confirmar) {
      Pagina.deleteSeccion($routeParams.mongo,seccion_id,function (err, data) {
          if (err) 
            alert('Hubo un error, intenta más tarde');
          else                            
            $route.reload();
          
      });
    };
      
  };

  $scope.open = function (size) {
    alert('noo');
    // var modalInstance = $modal.open({
    //   templateUrl: 'views/preview/redes.html',
    //   controller: algo,
    //   size: size      
    // });

    // modalInstance.result.then(function (selectedItem) {
    //   $scope.selected = selectedItem;
    // }, function () {
      
    // });
  };


  $scope.agregarSeccion = function ($scope, $routeParams) {

    var modalInstance = $modal.open({
      templateUrl: 'views/preview/modalAgregar.html',        
      
    });
  };


  $scope.editarSeccion = function ($scope, $routeParams) {

    var modalInstance = $modal.open({
      templateUrl: 'views/preview/editarSeccion.html',        
      
    });
  };

}

function MenuCtrl ($scope,Seccion,$routeParams,Pagina) {    
    Pagina.settings($routeParams.mongo,function(err,data){
        $scope.settings = data;       
    });  

    Seccion.secciones($routeParams.mongo,function(err,data){
        $scope.secciones = data;
    });

}

function EstiloCtrl ($scope,$routeParams,Pagina,$route) {
    $scope.FormData = {};
    Pagina.settings($routeParams.mongo,function(err,data){
        $scope.FormData = data;       
    });  


    $scope.editPagina = function() {
        Pagina.edit($routeParams.mongo,$scope.FormData,function (err, data) {
            if (err) {alert('Algo salió mal, intenta más tarde');}
            else{
                $route.reload();
            };
        })
    };
}


function SeccionCtrl ($scope,$routeParams,Seccion,Pagina, $route) {
    $scope.FormAddSeccion = {};
    $scope.addSeccion = function() {
        Pagina.addSeccion($routeParams.mongo,$scope.FormAddSeccion,function (err, data) {
            if (err) {alert('Algo salió mal, intenta más tarde');}
            else{
                $route.reload();
            };
        })
    };

    $scope.FormEditarSeccion = {};
    // Pagina.seccion($routeParams.mongo,$routeParams.,function(err,data){
    //     $scope.FormData = data;       
    // });  
    $scope.editSeccion = function() {
        Pagina.editSeccion($routeParams.mongo,$scope.FormEditarSeccion,function (err, data) {
            if (err) {alert('Algo salió mal, intenta más tarde');}
            else{
                $route.reload();
            };
        })
    };
}
// Sec.getSeccion();
