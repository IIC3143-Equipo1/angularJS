'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('kaAnswer',function(){
        return {
            templateUrl:'scripts/directives/knowledgeArea/answer/answer.html',
            restrict: 'E',
            replace: true,
            scope: {
                'name': '@'
            },
            controller:function($scope){
                $scope.deleteAnswer = function(event){
                    var preAnswer = event.currentTarget.parentNode.parentNode.innerText;
                    var answer = preAnswer.substr(2);
                    console.log($scope.$parent);
                    $scope.$parent.listAnswerOptions[$scope.$parent.currentAnswer] =$.grep($scope.$parent.listAnswerOptions[$scope.$parent.currentAnswer],
                        function(value) {
                            return value != answer.toLowerCase();
                        });
                    event.currentTarget.parentNode.parentNode.remove();

                };

            }
        }
    });