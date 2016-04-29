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
                $scope.delete_question = function(name,parent) {
                    $('#'+name).parent().remove();
                    //$scope.$parent['count-'+parent]--;
                    $scope.$parent.$parent.list_answer_options[name] = [];
                };

                $scope.is_not_open_question = function (name) {
                    var value = $('#'+name+'-sel_question_type').val();
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
                scope['count_'+attrs.parentName]++;
                angular.element(document.getElementById('list_'+attrs.parentName)).append($compile('<ka-question parent='+attrs.parentName+' name='+attrs.parentName+'_question'+scope['count_'+attrs.parentName]+'></ka-question>')(scope));
                $('#list_'+attrs.parentName+' .collapse').removeClass('in');
                $('#list_'+attrs.parentName).sortable({
                    handle: ".panel-heading"
                });
            });
        };
    });
