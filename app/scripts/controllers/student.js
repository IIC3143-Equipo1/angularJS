'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('StudentCtrl',['$scope','Student','Course','popupService','$state','$stateParams',
  	function($scope,Student,Course,popupService,$state,$stateParams) {

 	  $scope.selection      = [];
    $scope.itemsbypage    = 5;
    $scope.displayedpages = 0;
    $scope.total_courses  = 0;

      $scope.sno_students = function (index) {
          var from = 5 * ($scope.all_students.current_page - 1)  + 1;
          return from + index;
      };

      $scope.init_courses = function(){
        console.log($scope.student);
        if(typeof $scope.student != 'undefined'){
          Course.get({}, function (response) {
          $scope.course_list     = response.rows;
          $scope.total_courses = response.count;
          var last_page = $scope.total_courses / $scope.itemsbypage;
          var last_pages_val = Math.ceil(last_page);
          $scope.displayedpages = last_pages_val;

          $("#txt_course").autocomplete({
              minLength: 3,
              source: function( request, response ) {
                  var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                  response( $.grep( $scope.course_list, function( item ){
                      return matcher.test( item.name );
                  }) );
              },
              /*focus: function( event, ui ) {
                $("#txt_course").val( ui.item.name );
                return false;
              },*/
              select: function( event, ui ) {
                 var new_array = $.grep( $scope.student.Courses, function( item ){
                      return item.code === ui.item.code;
                  })
                 if(new_array.length == 0)
                 {
                    //if(popupService.showPopup('Esta seguro que desea agregar el curso?')){
                      Student.http.saveStudentCourse(ui.item.id,$scope.student.id)
                      $scope.student.Courses.push(ui.item);
                      $("#txt_course").val( ui.item.name );
                      $scope.$apply();
                    //}
                 }else
                 {
                    $("#txt_course").val("");  
                 }     
                return false;
              }
            })
            .autocomplete("instance")._renderItem = function( ul, item ) {
              return $("<li>")
                .append("<a>" + item.name + "<br>" + item.code + "</a>")
                .appendTo(ul);
            };

          }, function (error) {
              $scope.students = [];
          });
        }
      }

      $scope.init = function(){
        if($scope.student.$promise)
        {
        $scope.student.$promise.then(function(response){
           if($scope.student.id)
          {
            $('#courses_tab_link').attr('data-toggle','tab');
          }else
          {
            $('#courses_tab_link').attr('data-toggle','');
          }
        });
        }else
        {
          $('#courses_tab_link').attr('data-toggle','');
          $('#courses_tab_link').parent().addClass('disabled');
        }
      }

     $scope.student_save = function(){
      if(!$("#txt_name").val()){$scope.show_alert('Debes digitar un nombre '); return false;}
      if(!$("#txt_email").val()){$scope.show_alert('Debes digitar un email '); return false;}
      if(!$("#txt_code").val()){$scope.show_alert('Debes digitar un código '); return false;}
      $scope.student.$save(function(response){
          $state.go('dashboard.student_edit',{id:response.id});
        }); 
     };

     $scope.update_student = function(){
      $scope.student.$update({id:$stateParams.id},function(response){
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
      estudiantes */
      $scope.delete_student=function(student){
          if(popupService.showPopup('Esta seguro de eliminar el estudiante?')){
              var response = Student.resource.delete({id:student.id},function(response)
              {
                $state.reload();
              });
          }
      };

      $scope.delete_course=function(course){
          if(popupService.showPopup('Esta seguro de eliminar el curso?')){
              var response = Student.http.deleteStudentCourse($scope.student.id,course.id);
              response.then(function(response)
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
      objeto estudiante */
      $scope.student_new = function()
      {
        $scope.init_courses();
        $scope.student = new Student.resource();
      };

	   /* Metodo para cargar un estudiante */
  	 $scope.student_edit = function()
  	 {
  	    $scope.load_student();
  	    $scope.init_courses();
     };

    $scope.load_student = function(){
		$scope.student = Student.resource.get({id:$stateParams.id}, 
		   function (response) {

		  },function (error) {
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
