'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:headerNotification
 * @description
 * # evaluateApp.headerNotification
 */
angular.module('evaluateApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


