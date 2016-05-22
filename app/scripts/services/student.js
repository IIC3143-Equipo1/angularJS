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
                  url:    url_api+'api/student_aux/getStudentsByCourse', 
                  method: 'GET',
                  params: {id_course: id_course,page: page}
                 });
     		}
        }
     }
     
	
    return interface_api;
}); 