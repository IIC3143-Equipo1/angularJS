'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('knowledgeArea',function(){
        return {
            templateUrl:'scripts/directives/knowledgeArea/knowledgeAreaV2.html',
            restrict: 'E',
            replace: true,
            scope: {
                'name': '@',
            },
            controller:function($scope){
                $('#accordion'+$scope.name).collapse();
            }
        }
    });
