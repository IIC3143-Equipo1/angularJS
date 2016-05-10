'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:timeline
 * @description
 * # evaluateApp.timeline
 */
angular.module('evaluateApp')
	.directive('timeline',function() {
    return {
        templateUrl:'scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
