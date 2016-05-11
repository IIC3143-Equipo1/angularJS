'use strict';
//https://evaluat-e-api.herokuapp.com
angular.module('evaluateApp').factory('Student',function($resource,$cookieStore){
    return $resource('https://evaluat-e-api.herokuapp.com/api/student/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    });
});