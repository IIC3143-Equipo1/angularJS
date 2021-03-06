'use strict';
//https://evaluat-e-api.herokuapp.com
angular.module('evaluateApp').factory('Course',function($resource,$cookieStore,url_api){
var interface_api = {
     resource: $resource(url_api+'api/course/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    	}),
     http: { }
     }
     
    return interface_api;

});