'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:kaAnswer
 * @description
 * # evaluateApp.kaAnswer
 */
angular.module('evaluateApp')
    .directive('kaAnswer',function(){
        return {
            templateUrl:'scripts/directives/knowledgeArea/answer/answer.html',
            restrict: 'E',
            replace: true,
            scope: {
                'name': '@'
            },
            controller:function($scope){
                $scope.delete_answer = function(event){
                    var preAnswer = event.currentTarget.parentNode.parentNode.innerText;
                    var answer = preAnswer.substr(2);
                    console.log($scope.$parent);
                    $scope.$parent.list_answer_options[$scope.$parent.current_answer] =$.grep($scope.$parent.list_answer_options[$scope.$parent.current_answer],
                        function(value) {
                            return value != answer;
                        });
                    event.currentTarget.parentNode.parentNode.remove();

                };

            }
        }
    });