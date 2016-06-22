'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('HomeCtrl', function($scope,$state) {

    $state.go('dashboard.home');

  });
