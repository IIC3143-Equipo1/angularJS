'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('kaQuestion',function(){
        return {
            templateUrl:'scripts/directives/knowledgeArea/question/question.html',
            restrict: 'E',
            replace: true,
            scope: {
                'parent': '@',
                'name': '@'
            }
        }
    }).directive("addQuestion", function($compile){
        return function(scope, element, attrs){
            element.bind("click", function(){
                scope['count'+attrs.parentName]++;
                console.log(scope['count'+attrs.parentName]);
                angular.element(document.getElementById('accordion-'+attrs.parentName)).append($compile('<ka-question parent='+attrs.parentName+' name='+attrs.parentName+'question'+scope['count'+attrs.parentName]+'></ka-question>')(scope));
            });
        };
    });
