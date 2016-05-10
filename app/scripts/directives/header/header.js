'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:adminPosHeader.header
 * @description
 * # evaluateApp.header
 */
angular.module('evaluateApp')
	.directive('header',function(){
		return {
        templateUrl:'scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


