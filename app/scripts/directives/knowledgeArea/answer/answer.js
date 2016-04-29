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
                $scope.delete_answer = function(event){
                    var preAnswer = event.currentTarget.parentNode.parentNode.innerText;
                    var answer = preAnswer.substr(2);
                    console.log($scope.$parent);
                    $scope.$parent.list_answer_options[$scope.$parent.currentAnswer] =$.grep($scope.$parent.list_answer_options[$scope.$parent.current_answer],
                        function(value) {
                            return value != answer.toLowerCase();
                        });
                    event.currentTarget.parentNode.parentNode.remove();

                };

            }
        }
    });