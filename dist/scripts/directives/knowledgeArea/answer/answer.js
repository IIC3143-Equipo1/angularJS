"use strict";angular.module("sbAdminApp").directive("kaAnswer",function(){return{templateUrl:"scripts/directives/knowledgeArea/answer/answer.html",restrict:"E",replace:!0,scope:{name:"@"},controller:function($scope){$scope.deleteAnswer=function(event){var preAnswer=event.currentTarget.parentNode.parentNode.innerText,answer=preAnswer.substr(2);console.log($scope.$parent),$scope.$parent.listAnswerOptions[$scope.$parent.currentAnswer]=$.grep($scope.$parent.listAnswerOptions[$scope.$parent.currentAnswer],function(value){return value!=answer.toLowerCase()}),event.currentTarget.parentNode.parentNode.remove()}}}});