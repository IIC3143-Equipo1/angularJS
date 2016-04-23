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
            },
            controller:function($scope){
                $scope.deleteQuestion = function(name,parent) {
                    $('#'+name).parent().remove();
                    //$scope.$parent['count-'+parent]--;
                    $scope.$parent.$parent.listAnswerOptions[name] = [];
                };

                $scope.isNotOpenQuestion = function (name) {
                    var value = $('#'+name+'-selQuestionType').val();
                    if(value == 1 || value == 2)
                    {
                        return true;
                    }else
                    {
                        return false;
                    }

                };
            }
        }
    }).directive("addQuestion", function($compile){
        return function(scope, element, attrs){
            element.bind("click", function(){
                scope['count-'+attrs.parentName]++;
                angular.element(document.getElementById('accordion-'+attrs.parentName)).append($compile('<ka-question parent='+attrs.parentName+' name='+attrs.parentName+'-question'+scope['count-'+attrs.parentName]+'></ka-question>')(scope));
                $('#accordion-'+attrs.parentName+' .collapse').removeClass('in');
                $('#accordion-'+attrs.parentName).sortable({
                    handle: ".panel-heading"
                });
            });
        };
    });
