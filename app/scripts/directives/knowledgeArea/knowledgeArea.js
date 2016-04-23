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
                $scope['count-ka-'+$scope.name] = 0;
                $('#accordion'+$scope.name).collapse();

                $scope.deleteKnowledgeArea = function(name) {
                    $('#ka-'+name).parent().remove();
                    var index = $.inArray(name.toLowerCase(),$scope.$parent.listKnowledgeAreas);
                    if(index != -1)
                    {
                        //$scope.$parent.listKnowledgeAreas.slice(index,1);
                        //delete $scope.$parent.listKnowledgeAreas[index];
                        $scope.$parent.listKnowledgeAreas =$.grep($scope.$parent.listKnowledgeAreas,
                            function(value) {
                                return value != name.toLowerCase();
                            });

                        for(var key in $scope.$parent.listAnswerOptions)
                        {
                            if(key.indexOf('ka-'+name) > -1){
                                //$scope.$parent.listAnswerOptions[key].remove();
                                $scope.$parent.listAnswerOptions =$.grep($scope.$parent.listAnswerOptions,
                                    function(value) {
                                        return value != $scope.$parent.listAnswerOptions[key];
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
           var name = angular.element(document.getElementById('txtApKnowledgeArea')).val();

           //scope.listAnswerOptions['ka-'+name];
           scope.addKnowledgeArea(name);
        });
    };
});
