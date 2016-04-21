'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('SurveyCtrl', function($scope) {
        console.log("ctrl");
          $scope.start = function(){
            $('#accordion').collapse();
        };

    });
