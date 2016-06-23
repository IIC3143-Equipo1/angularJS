'use strict';
angular.module('evaluateApp').factory('Survey',function($resource,$cookieStore,url_api,$http){
    //https://evaluat-e-api.herokuapp.com
    var interface_api = {
     resource: $resource(url_api+'api/survey/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    	}),
     http: {
            countAllSurveis: function()
            {
                return $http({
                  url:    url_api+'api/count_all_surveis',
                  method: 'GET'
                 });
            }
        }
     }

    return interface_api;
});
