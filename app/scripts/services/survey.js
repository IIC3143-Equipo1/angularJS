'use strict';

//var api_root = 'https://evaluat-e-api.herokuapp.com/api';
var api_root = 'http://localhost:5000/api';

angular.module('sbAdminApp').factory('Survey',function($resource,$cookieStore){
    return $resource(api_root + '/survey/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        'update': { method:'PUT'}},{
        'delete': { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: 'id'}}
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
