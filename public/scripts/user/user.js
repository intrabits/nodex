'use strict';
angular.module('app.user', [])
  .controller('UserCtrl',function($scope,$modal,$log,$routeParams,$http,User,$route){  
    $scope.FormEditProfile = {};
    $scope.FormChangePassword = {};

    var getProfile = function () {
      User.profile(function (err, data) {
        if (err) {
              $scope.notify('danger','Ops! Something went wrong, please try again later');
            } else{            
              $scope.FormEditProfile = data;
            };
      });
    }
      
    getProfile();

      $scope.editProfile = function() {                
        var data = $scope.FormEditProfile;      
        User.update(data,function (err, data) {
          if (err) {            
            $scope.notify('danger','Ops! Something went wrong, please try again later');
          } else{                        
            $scope.notify('success','Done!');
          };
        });
      };

      $scope.checkNick = function (nick) {
        User.nick(nick,function (err, data) {
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
        User.updatePass(data,function (err, data) {
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
              getProfile();
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


