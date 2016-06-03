'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:knowledgeArea
 * @description
 * # evaluateApp.knowledgeArea
 */
angular.module('evaluateApp')
    .directive('knowledgeArea',function($timeout,$compile){
        return {
            templateUrl:'scripts/directives/knowledgeArea/knowledgeArea.html',
            restrict: 'E',
            replace: true,
            scope: {
                'name': '@',
                'position': '=?'
            },
            link: function($scope, $element, attr, parentDirectCtrl){
                console.log($scope.position);
                if($scope.position != null)
                {
                      var survey_aux = $scope.$parent.survey;
                      var kw = survey_aux.kw_areas[$scope.position];      
                      var parentName = 'ka_'+kw.name;
                      $scope.$parent['count_'+parentName] = 0;
                      if(kw.questions)
                      {
                      var len_questions = kw.questions.length;
                      for (var j = 0; j < len_questions; j++)
                      {   
                        $timeout(function(j){ 
                            $timeout(function(j){
                            $scope.$parent['count_'+parentName]++;
                            var dd = $compile('<ka-question kw='+ $scope.position +' quest ='+ j +' parent='+
                              parentName+' name='+parentName+'_question'+$scope.$parent['count_'+parentName]+'></ka-question>')($scope.$parent,
                              function(clone,scope){
                                angular.element(document.getElementById('list_'+parentName)).append(clone);
                                });
                              $('#list_'+parentName).sortable({
                                  handle: ".panel-heading"
                              });
                              var question_val= kw.questions[j];
                              var question_name = parentName+'_question'+$scope.$parent['count_'+parentName];
                               $timeout(function(question_name,j){
                                if(j != 0){$('#'+question_name).removeClass('in')};
                               },100,true,question_name,j);
                              $scope.$parent.list_answer_options[question_name] = [];
                              if(question_val && question_val.opt_answers)
                              {
                                var len_answers = question_val.opt_answers.length
                                for (var k = 0; k < len_answers;k++)
                                {
                                  $scope.$parent.list_answer_options[question_name].push(question_val.opt_answers[k].option);
                                }
                              }
                          },0,true,j);
                        },0,true,j);
                      }
                     }  
                 }
            },
            controller:function($scope,$compile){
                $scope['count_ka_'+$scope.name] = 0;
                $('#list'+$scope.name).collapse();
                $scope.delete_knowledge_area = function(name) {
                    $('#ka_'+name).parent().remove();
                    var index = $.inArray(name,$scope.$parent.list_knowledge_areas);
                    if(index != -1)
                    {
                        $scope.$parent.list_knowledge_areas =$.grep($scope.$parent.list_knowledge_areas,
                            function(value) {
                                return value != name;
                            });

                        for(var key in $scope.$parent.list_answer_options)
                        {
                            if(key.indexOf('ka_'+name) > -1){
                                $scope.$parent.list_answer_options =$.grep($scope.$parent.list_answer_options,
                                    function(value) {
                                        return value != $scope.$parent.list_answer_options[key];
                                    });
                            }
                        }
                    }
                };
            }
        }
    }).directive("addKnowledgeArea", function(){
    return function(scope, element, attrs){
        element.bind("click", function(){
           var name = angular.element(document.getElementById('txt_knowledge_area')).val();
           scope.add_knowledge_area(name.toLowerCase());
        });
    };
});
