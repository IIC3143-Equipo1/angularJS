'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:sidebarSearch
 * @description
 * # evaluateApp.sidebarSearch
 */

angular.module('evaluateApp')
  .directive('sidebarSearch',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });
