'use strict';
//https://evaluat-e-api.herokuapp.com
angular.module('evaluateApp').factory('Student',function($resource,$cookieStore,$http,url_api){
	var interface_api = {
     resource: $resource(url_api+'api/student/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    	}),
     http: {
     		getStudentsByCourse: function(id_course,page)
     		{
     		  return $http({
                  url:    url_api+'api/student_course', 
                  method: 'GET',
                  params: {id_course: id_course,page: page}
                 });
     		},
            saveStudentCourse: function(id_course,id_student)
            {
                var data = $.param({
                id_course: id_course,
                id_student: id_student
                });
                var config = {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
              return $http.post(url_api+'api/student_course', data, config)
            },
            deleteStudentCourse: function(id_student,id_course)
            {
              return $http({
                  url:    url_api+'api/student_course', 
                  method: 'DELETE',
                  params: {id_course: id_course,id_student: id_student}
                 });
            }
        }
     }
     
	
    return interface_api;
}); 