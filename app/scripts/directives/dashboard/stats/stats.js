'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:adminPosHeader.stats
 * @description
 * # evaluateApp.stats
 */
angular.module('evaluateApp')
    .directive('stats',function() {
    	return {
  		templateUrl:'scripts/directives/dashboard/stats/stats.html',
  		restrict:'E',
  		replace:true,
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@'
  		}
  		
  	}
  });
