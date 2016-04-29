'use strict';

angular.module('sbAdminApp').factory('Survey',function($resource,$cookieStore){
    return $resource('api/v1.0/survey/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
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