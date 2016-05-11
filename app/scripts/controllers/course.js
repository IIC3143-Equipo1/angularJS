'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('CourseCtrl', function($scope) {

 $scope.selection_courses = [];

      $scope.courses = [{id:1,name:'Cuarto elemental',code:'c400'},{id:2,name:'Quinto elemental',code:'c500'},{id:3,name:'Sexto elemental',code:'c600'}]; //Student.get({id:id});

       $scope.sno_courses = function (index) {
              var from = 5 * (0) + 1;
              return from + index;
          };

  });
