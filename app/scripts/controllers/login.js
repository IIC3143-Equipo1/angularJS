'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('LoginCtrl',['$scope','Login','$state','sessionService','$stateParams', function($scope,Login,$state,sessionService,$stateParams) {

    if($state.params.option)
    {
      $state.go('dashboard.home');
    }

    $scope.user = sessionService.getCookieData();

  	$scope.login = function(){
  		var username = $('#txt_username').val();
  		var password = $('#txt_password').val();
  		var access = Login.login(username,password);
  		access.then(function(response){
        sessionService.setCookieData(response.data.user);
  			$state.go('dashboard.home');
  		},
  		function(error){
  			alert(error.data.error);
  			console.log(error);
  		});
  	}

    $scope.signout = function(){
      var access = Login.signout();
      access.then(function(user){
        $state.go('login');
      },
      function(error){
        alert(error.data.error);
        console.log(error);
      });
    }

  }]);
