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
            templateUrl:'scripts/directives/knowledgeArea/knowledgeArea.html',
            restrict: 'E',
            replace: true,
            scope: {
                'name': '@',
            },
            controller:function($scope){
                $scope['count_ka_'+$scope.name] = 0;
                $('#list'+$scope.name).collapse();

                $scope.delete_knowledge_area = function(name) {
                    $('#ka_'+name).parent().remove();
                    var index = $.inArray(name.toLowerCase(),$scope.$parent.list_knowledge_areas);
                    if(index != -1)
                    {
                        //$scope.$parent.listKnowledgeAreas.slice(index,1);
                        //delete $scope.$parent.listKnowledgeAreas[index];
                        $scope.$parent.list_knowledge_areas =$.grep($scope.$parent.list_knowledge_areas,
                            function(value) {
                                return value != name.toLowerCase();
                            });

                        for(var key in $scope.$parent.list_answer_options)
                        {
                            if(key.indexOf('ka_'+name) > -1){
                                //$scope.$parent.listAnswerOptions[key].remove();
                                $scope.$parent.list_answer_options =$.grep($scope.$parent.list_answerOptions,
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
           //scope.listAnswerOptions['ka-'+name];
           scope.add_Knowledge_area(name);
        });
    };
});
