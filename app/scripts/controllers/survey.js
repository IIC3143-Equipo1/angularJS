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
          $scope.count = 0;
          $scope.start = function(){
            $('#accordion').collapse();
        };
    });
