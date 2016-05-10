'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:kaQuestion
 * @description
 * # evaluateApp.kaQuestion
 */
angular.module('evaluateApp')
    .directive('kaQuestion',function(){
        return {
            templateUrl:'scripts/directives/knowledgeArea/question/question.html',
            restrict: 'E',
            replace: true,
            scope: {
                'parent'   :'@',
                'name'     :'@',
                'kw'       :'@',
                'quest'    :'@'
            },
            controller:function($scope){
                if($scope.$parent.survey)
                {
                    if($scope.kw && $scope.quest)
                    {
                        $scope.questionx = $scope.$parent.survey.kw_areas[$scope.kw].questions[$scope.quest];
                        $scope.questionx.type = String($scope.questionx.type);
                        $scope.questionx.required = Boolean($scope.questionx.required);
                    }
                }
                $scope.delete_question = function(name,parent) {
                    //console.log(name);
                    //console.log($scope.$parent);
                    $('#'+name).parent().remove();
                    //$scope.$parent['count-'+parent]--;
                    $scope.$parent.list_answer_options[name] = [];
                };

                $scope.is_not_open_question = function (name) {
                    var value = $('#'+name+'_sel_question_type').val();
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
                var parentName = attrs.parentName;
                scope.$parent['count_'+parentName]++;
                angular.element(document.getElementById('list_'+parentName)).append($compile('<ka-question parent='+parentName+' name='+parentName+'_question'+scope.$parent['count_'+parentName]+'></ka-question>')(scope.$parent));
                $('#list_'+parentName+' .collapse').removeClass('in');
                $('#list_'+parentName).sortable({
                    handle: ".panel-heading"
                });
            });
        };
    });
