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
                $scope['count'+$scope.name] = 0;
                $('#accordion'+$scope.name).collapse();
            }
        }
    }).directive("addKnowledgeArea", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            scope.count++;
            angular.element(document.getElementById('accordion')).append($compile('<knowledge-area name=ka'+scope.count+'></knowledge-area>')(scope));
        });
    };
});
