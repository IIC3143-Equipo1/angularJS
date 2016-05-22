'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('CourseCtrl',['$scope','$state','$stateParams','Course','popupService', 
    function($scope,$state,$stateParams,Course,popupService) {

    $scope.selection = [];

    $scope.sno_courses = function (index) {
          var from = 5 * ($scope.all_courses.current_page - 1)  + 1;
          return from + index;
      };

     $scope.course_save = function(){
      if(!$("#txt_name").val()){$scope.show_alert('Debes digitar un nombre '); return false;}
      if(!$("#txt_code").val()){$scope.show_alert('Debes digitar un código '); return false;}
      $scope.course.$save(function(response){
          $state.go('dashboard.course');
        }); 
     };

     $scope.update_course = function(){
      $scope.course.$update({id:$stateParams.id},function(response){
          $state.go('dashboard.course');
        }, function (error) {
            console.log(error);
        }); 
     };

     /* Metodo para eliminar masivamente
      curso*/
      $scope.delete_courses=function(){
        if(popupService.showPopup('Esta seguro de eliminar la información?')){

            var i = 0;
            var len_selection = Object.keys($scope.selection).length-1;
            $scope.selection.forEach(function(obj,key){
              if(obj)
              {
                if(i == len_selection)
                {
                   var response = Course.delete({id:key},function(response){
                       $scope.selection = [];
                       $state.reload();
                   });
                }else
                {
                  var response = Course.delete({id:key});
                }
              }
                i = i + 1;
            });
        }
      };

      /* Metodo parar borrar individualmente
      cursos*/
      $scope.delete_course=function(course){
          if(popupService.showPopup('Esta seguro de eliminar el curso?')){
              var response = Course.delete({id:course.id},function(response)
              {
                $state.reload();
              });
          }
      };

      /* Metodo para ver un curso */
      $scope.course_view = function()
      {
        $scope.course= Course.get({id:$stateParams.id});
      };

      /* Metodo para inicializar un
      objeto curso*/
      $scope.course_new = function()
      {
        $scope.course = new Course();
      };

	   /* Metodo para cargar una encuesta */
	 $scope.course_edit = function()
	 {
	     $scope.load_course();
	 };

     $scope.load_course = function(){
		$scope.course = Course.get({id:$stateParams.id}, 
		   function (response) {

		}, function (error) {
            console.log(error);
            $scope.courses = [];
        });
     };

     $scope.load_grid = function(){
	      Course.get({}, function (response) {
		    $scope.courses     = response.rows;
		    $scope.all_courses = response;
		  }, function (error) {
		      $scope.courses = [];
		  });
     };

  }]);
