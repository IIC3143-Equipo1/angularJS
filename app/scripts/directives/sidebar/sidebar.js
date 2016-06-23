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

        $(document).ready(function(){
          $("#side-menu").on('click',function(e){
              $(e.target.parentNode).toggleClass('active');   
          }).on('click','i',function(e) {
              $(e.target.parentNode.parentNode).toggleClass('active'); 
         }).on('click','span',function(e) {
              $(e.target.parentNode.parentNode).toggleClass('active'); ;
         });
      });

        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
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
