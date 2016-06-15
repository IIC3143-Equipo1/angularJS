'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:sidebar
 * @description
 * # evaluateApp.sidebar
 */

angular.module('evaluateApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;

        $scope.check = function(x){

          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };

        $('#side-menu').click(function (e) {
          $(e.target.parentNode).toggleClass('active');
        });
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
