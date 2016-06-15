'use strict';
angular.module('evaluateApp').service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
})
.service('alertService',function(){
	  this.showAlert =function(message, type = 'danger'){
	  	$('#alert').html("<div class='alert alert-"+type+"'>" +
	      "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+message+"</div>");
	  $('#alert').alert();
	  $("#alert").fadeTo(3000, 500).slideUp(500, function(){
	      $("#alert").alert('close');
	  });
	}
})
.factory("sessionService", [
	"$cookieStore", function($cookieStore) {
		var user = {};

		return {
			setCookieData: function(user_info) {
				user = {
					user_name: user_info.username,
					name: user_info.firstName
				};
				$cookieStore.put("user_name", user_info.username);
				$cookieStore.put("name", user_info.firstName);
			},
			getCookieData: function() {
				var user = {
					user_name: $cookieStore.get("user_name"),
					name: $cookieStore.get("name")
						};
				return user;
			},
			clearCookieData: function() {
				user = {};
				$cookieStore.remove("user_name");
				$cookieStore.remove("name");
			}
		}
	}
]);