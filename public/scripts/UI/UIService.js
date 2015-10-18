(function () {
  'use strict';
  angular
    .module('app.ui.services', []).factory('logger', [
      function() {
        var logIt;
        toastr.options = {
          "closeButton": true,
          "positionClass": "toast-bottom-right",
          "timeOut": "3000"
        };
        logIt = function(message, type) {
          return toastr[type](message);
        };
        return {
          log: function(message) {
            logIt(message, 'info');
          },
          warning: function(message) {
            logIt(message, 'warning');
          },
          success: function(message) {
            logIt(message, 'success');
          },
          error: function(message) {
            logIt(message, 'error');
          }
        };
      }
    ]);

})();
