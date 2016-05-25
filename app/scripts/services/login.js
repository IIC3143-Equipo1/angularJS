'use strict';
//https://evaluat-e-api.herokuapp.com
angular.module('evaluateApp').factory('Login',function($http,url_api){
	var interface_api = 
    {
     		login: function(username,password)
     		{
                var data = $.param({
                username: username,
                password: password
                });
                var config = {
                    xhrFields: {
                        withCredentials: true
                    },
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
              return $http.post(url_api+'login', data, config)
     		},
            signout: function()
            {
              return $http.get(url_api+'signout');
            },
            signup: function(params)
            {
                var data = $.param(params);
                var config = {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
              return $http.post(url_api+'signup', data, config)
            }
    }
     
     
	
    return interface_api;
}); 