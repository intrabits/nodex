'use strict';
angular.module('app.controllers', []).controller('AppCtrl', [
  '$scope', '$location','$http', function($scope, $location,$http) {
    
    $scope.isSpecificPage = function() {
      var path;
      path = $location.path();
      return _.contains(['/404', '/pages/500', '/pages/login', '/pages/signin', '/pages/signin1', '/pages/signin2', '/pages/signup', '/pages/signup1', '/pages/signup2', '/pages/lock-screen'], path);
    };


    

    // Información del usuario actual
    $http.get('/api/cuenta').success(function (data,status,headers,config) {

       $scope.main.nombre = data[0].nombre;
       if (data[0].facebook) {
          $scope.main.foto = 'http://graph.facebook.com/' + data[0].facebook + '/picture';                 
       }else{

          $scope.main.foto = 'https://answers.atlassian.com/upfiles/user_icons/cached/Timothy_Chin_avatar_icon128.png';       
       }
       
     });

    //Obtenemos las páginas del usuario actual
    $http.get('/api/misPaginas').success(function (data,status,headers,config) {       
       $scope.misPaginas = data;
     });    
    
    // $http.get('/api/usuario/4/paginas').success(function (data,status,headers,config) {
    //    $scope.paginas = data;

    //  });    

    
    return $scope.main = {
      brand: 'Intrabits',
      avatar: 'http://graph.facebook.com/cedric.luckie/picture'

    };





  }
]).controller('NavCtrl', [
  '$scope',  'filterFilter', function($scope, filterFilter) {
      


    
  }
]).controller('NuevaPaginaCtrl', [
  '$scope', '$modal', function($scope, $modal, $log) {
    $scope.items = ["item1", "item2", "item3"];
    $scope.open = function() {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: "myModalContent.html",
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then((function(selectedItem) {
        $scope.selected = selectedItem;
      }), function() {
        $log.info("Modal dismissed at: " + new Date());
      });
    };
  }
]).controller('DashboardCtrl', [
  '$scope', function($scope) {
    $scope.comboChartData = [['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'], ['2014/05', 165, 938, 522, 998, 450, 614.6], ['2014/06', 135, 1120, 599, 1268, 288, 682], ['2014/07', 157, 1167, 587, 807, 397, 623], ['2014/08', 139, 1110, 615, 968, 215, 609.4], ['2014/09', 136, 691, 629, 1026, 366, 569.6]];
    return $scope.salesData = [['Year', 'Sales', 'Expenses'], ['2010', 1000, 400], ['2011', 1170, 460], ['2012', 660, 1120], ['2013', 1030, 540]];
  }
]).controller('ModalPagina',function($scope,$modal,$log){
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/paginas/nueva.html',
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
});


