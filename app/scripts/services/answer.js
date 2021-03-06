'use strict';
angular.module('evaluateApp').factory('Answer',function($resource,$http,$cookieStore,url_api){
    var interface_api = {
     resource: $resource(url_api+'api/answer/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    	}),
     http: {
     		getAnswerByStudentSurvey: function(id_survey,id_student)
     		{
     		  return $http({
                  url:    url_api+'api/answer_student_survey', 
                  method: 'GET',
                  params: {id_survey: id_survey,id_student:id_student}
                 });
     		},
            countAllAnswers: function()
            {
                return $http({
                  url:    url_api+'api/count_answers_not_open', 
                  method: 'GET'
                 });
            },
            setAnswerOpen: function(id)
            {
                return $http({
                  url:    url_api+'api/set_answer_open', 
                  method: 'GET',
                  params: { id: id}
                 });
            }
        }
     }
     
    return interface_api;	
});