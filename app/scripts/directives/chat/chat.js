'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:chat
 * @description
 * # evaluateApp.chat
 */
angular.module('evaluateApp')
	.directive('chat',function(){
		return {
        templateUrl:'scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});


