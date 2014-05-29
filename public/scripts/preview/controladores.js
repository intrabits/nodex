angular.module('app', ['ngRoute','ui.bootstrap','appServices','ngSanitize'])
    .config(['$routeProvider', function($routeProvider) {
        return $routeProvider.                
                when('/pagina/:mongo', {templateUrl: 'views/preview/contenido.html',   controller: DefaultCtrl}).
                when('/pagina/:mongo/seccion/:id', {templateUrl: 'views/preview/contenido.html',   controller: DefaultCtrl}).
                when('/pagina/:mongo/estilo', {templateUrl: 'views/preview/estilo.html',   controller: EstiloCtrl}).
                when('/pagina/:mongo/agregar', {templateUrl: 'views/preview/agregar.html',   controller: AddSeccionCtrl}).
                otherwise({redirectTo: '/home'});
}]);

/* Controllers */
function MainCtrl($scope, $routeParams, Page , Pagina, Seccion, $location) {        
    $scope.page= Page;
}


function DefaultCtrl ($scope, $routeParams, Pagina, Page, Seccion) {      
    var mongo = $routeParams.mongo;    
    Pagina.settings(mongo,function(err,data){
        $scope.pagina = data;
    });
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


function SeccionCtrl($scope,$routeParams,Seccion){
    
    $scope.bloques = {};        
    var seccion_id = $routeParams.seccion_id;
    console.log(seccion_id);

    Seccion.bloques(seccion_id,function(err,data){
                
            $scope.bloques = data;
            // console.log(data);             
    });

}

function AddSeccionCtrl ($scope,$routeParams,Seccion,Pagina, $route) {
    $scope.FormAddSeccion = {};
    $scope.addSeccion = function() {
        Pagina.addSeccion($routeParams.mongo,$scope.FormAddSeccion,function (err, data) {
            if (err) {alert('Algo salió mal, intenta más tarde');}
            else{
                $route.reload();
            };
        })
    };
}
// Sec.getSeccion();




var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/preview/modal.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

