'use strict';
angular.module('app.usuario', [])
  .controller('UsuarioCtrl',function($scope,$modal,$log,$routeParams,$http,Usuario,$route){  
    $scope.FormEditarPerfil = {};
    $scope.FormChangePassword = {};

    var getPerfil = function () {
      Usuario.perfil(function (err, data) {
        if (err) {
              $scope.notify('danger','Ops! Something went wrong, please try again later');
            } else{            
              $scope.FormEditarPerfil = data;
            };
      });
    }
      
    getPerfil();

      $scope.editarPerfil = function() {                
        alert('as');
        var data = $scope.FormEditarPerfil;      
        Usuario.update(data,function (err, data) {
          if (err) {            
            $scope.notify('danger','Ops! Something went wrong, please try again later');
            alert('no');
          } else{                        
            $scope.notify('success','Done!');
            alert('si');
          };
        });
      };

      $scope.checkNick = function (nick) {
        Usuario.nick(nick,function (err, data) {
          if (data) {
            $("#nickMsj").text(data);
          };
        })
      }

      $scope.coinciden = function() {
          var pass1 = document.getElementById("pass1").value;
          var pass2 = document.getElementById("pass2").value;          
          var ok = true;
          if (pass1 != pass2) {
              //alert("Passwords Do not match");
              document.getElementById("pass1").style.borderColor = "#E34234";
              document.getElementById("pass2").style.borderColor = "#E34234";
              ok = false;
              $("#passSubmit").attr("disabled",true);
          }
          else {
              document.getElementById("pass1").style.borderColor = "#04B404";
              document.getElementById("pass2").style.borderColor = "#04B404";
              $("#passSubmit").attr("disabled",false);
          }
          return ok;
      }

      $scope.changePass = function () {
        var data = $scope.FormChangePassword;
        Usuario.updatePass(data,function (err, data) {
          if (err) {            
            $scope.notify('danger','Ops! Something went wrong, please try again later');
          } else{                        
            $scope.notify('success','Done!');
          };
        });
      }



      $scope.uploadFile = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);                        
            $http.post('/api/upload', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function () {
              $route.reload;
              $scope.notify('success','Todo salió bien');
              getPerfil();
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


});


