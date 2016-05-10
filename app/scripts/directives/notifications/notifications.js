'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:notifications
 * @description
 * # evaluateApp.notifications
 */
angular.module('evaluateApp')
	.directive('notifications',function(){
		return {
        templateUrl:'scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


