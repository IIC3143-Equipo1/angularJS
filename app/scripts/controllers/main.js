'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('MainCtrl', function($scope,Survey,Answer) {
  	$scope.answers = 0;
  	$scope.surveis = 0;
	var result = Survey.http.countAllSurveis(); 
    	result.then(function(response){
        $scope.surveis = response.data;
    },
    function(error){
      	console.log(error);
    });

    var resultAux = Answer.http.countAllAnswers(); 
    	resultAux.then(function(response){
      	$scope.answers = response.data;
    },
    function(error){
      	console.log(error);
    });
  });
