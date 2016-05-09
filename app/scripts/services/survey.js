'use strict';
//https://evaluat-e-api.herokuapp.com
angular.module('sbAdminApp').factory('Survey',function($resource,$cookieStore){
    return $resource('http://localhost:5001/api/survey/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        'save':{
            headers:{ 'Content-Type' : 'application/x-www-form-urlencoded'}
        }, 
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