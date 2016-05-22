'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('StudentCtrl',['$scope','Student','popupService','$state','$stateParams',
  	function($scope,Student,popupService,$state,$stateParams) {

 	  $scope.selection = [];

    $scope.sno_students = function (index) {
          var from = 5 * ($scope.all_students.current_page - 1)  + 1;
          return from + index;
      };

     $scope.student_save = function(){
      if(!$("#txt_name").val()){$scope.show_alert('Debes digitar un nombre '); return false;}
      if(!$("#txt_email").val()){$scope.show_alert('Debes digitar un email '); return false;}
      if(!$("#txt_code").val()){$scope.show_alert('Debes digitar un código '); return false;}
      $scope.student.resource.$save(function(response){
          $state.go('dashboard.student');
        }); 
     };

     $scope.update_student = function(){
      $scope.student.resource.$update({id:$stateParams.id},function(response){
          $state.go('dashboard.student');
        }, function (error) {
            console.log(error);
        }); 
     };

     /* Metodo para eliminar masivamente
      estudiantes*/
      $scope.delete_students=function(){
        if(popupService.showPopup('Esta seguro de eliminar la información?')){

            var i = 0;
            var len_selection = Object.keys($scope.selection).length-1;
            $scope.selection.forEach(function(obj,key){
              if(obj)
              {
                if(i == len_selection)
                {
                   var response = Student.resource.delete({id:key},function(response){
                       $scope.selection = [];
                       $state.reload();
                   });
                }else
                {
                  var response = Student.resource.delete({id:key});
                }
              }
                i = i + 1;
            });
        }
      };

      /* Metodo parar borrar individualmente
      estudiantes*/
      $scope.delete_student=function(student){
          if(popupService.showPopup('Esta seguro de eliminar el curso?')){
              var response = Student.resource.delete({id:student.id},function(response)
              {
                $state.reload();
              });
          }
      };

      /* Metodo para ver un estudiante */
      $scope.student_view = function()
      {
        $scope.student= Student.resource.get({id:$stateParams.id});
      };

      /* Metodo para inicializar un
      objeto estudiante*/
      $scope.student_new = function()
      {
        $scope.student = new Student();
      };

	   /* Metodo para cargar un estudiante */
  	 $scope.student_edit = function()
  	 {
  	     $scope.load_student();
  	 };

    $scope.load_student = function(){
		$scope.student = Student.resource.get({id:$stateParams.id}, 
		   function (response) {

		}, function (error) {
            console.log(error);
            $scope.students = [];
        });
     };

     $scope.load_grid = function(){ 
	      Student.resource.get({}, function (response) {
		    $scope.students     = response.rows;
		    $scope.all_students = response;
		  }, function (error) {
		      $scope.students = [];
		  });
     };


  }]);
