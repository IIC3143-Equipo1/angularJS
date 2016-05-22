'use strict';
angular.module('evaluateApp').factory('Survey',function($resource,$cookieStore,url_api){
    //https://evaluat-e-api.herokuapp.com
    return $resource(url_api+'api/survey/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    });
});