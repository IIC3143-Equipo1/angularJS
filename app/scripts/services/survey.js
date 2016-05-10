'use strict';
//https://evaluat-e-api.herokuapp.com
angular.module('evaluateApp').factory('Survey',function($resource,$cookieStore){
    return $resource('http://localhost:5001/api/survey/:id',{id:'@id','csrf_token' :$cookieStore._csrf, page: 1 },{
        update: { method:'PUT'},
        delete: { method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },params: {id: '@id'}}
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});