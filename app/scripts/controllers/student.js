'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('StudentCtrl', function($scope) {

 $scope.selection_students = [];

      $scope.students = [{id:1,name:'Juan Diaz',email:'jddiaz4@uc.cl'},{id:2,name:'Pablo',email:'pmessina@uc.cl'},{id:3,name:'Nicolas Cerda',email:'ncerda@uc.cl'}]; //Student.get({id:id});

       $scope.sno_students = function (index) {
              var from = 5 * (0) + 1;
              return from + index;
          };

  });
