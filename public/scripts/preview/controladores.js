angular.module('app', ['ngRoute','appServices','ngSanitize'])
    .config(['$routeProvider', function($routeProvider) {
        return $routeProvider.
                when('/home', {templateUrl: 'home.html',   controller: HomeCtrl}).
                when('/list', {templateUrl: 'list.html',   controller: ListCtrl}).
                when('/estilo', {templateUrl: 'views/preview/estilo.html',   controller:EstiloCtrl}).
                when('/detail/:itemId', {templateUrl: 'detail.html',   controller: DetailCtrl}).
                when('/seccion/:seccion_id', {templateUrl: 'views/preview/seccion.html',   controller: SeccionCtrl}).
                when('/settings', {templateUrl: 'settings.html',   controller: SettingsCtrl});
                otherwise({redirectTo: '/home'});
}]);




/* Controllers */



function MainCtrl($scope, $routeParams, Page , Pagina, Seccion) {
    console.log(Page);
    $scope.page= Page;        
    var seccion_id;
    $scope.seccion_id = $routeParams.seccion_id;
    Pagina.settings(1,function(err,data){
        $scope.settings = data[0];        
    });  
    Seccion.secciones(1,function(err,data){
        if (data) {
            $scope.ContenidoSecciones = data;      
        };
        
    });    
}

function HomeCtrl($scope, Page) {
    Page.setTitle("Welcome");
}


function ListCtrl($scope, Page, Model) {
    Page.setTitle("Items");
    $scope.items = Model.notes();

}

function DetailCtrl($scope, Page, Model, $routeParams, $location) {
    Page.setTitle("Detail");
    var id = $scope.itemId = $routeParams.itemId;
    $scope.item = Model.get(id);
}

function SettingsCtrl($scope, Page) {
    Page.setTitle("Settings");
}

function MenuCtrl ($scope,Seccion) {
    $scope.titulo = 'Título bartola gatrila';
    Seccion.secciones(1,function(err,data){
        $scope.secciones = data;
    });

}

function EstiloCtrl ($scope,$routeParams,Page) {
    Page.setTitle('Estilo de la página')
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

// Sec.getSeccion();




