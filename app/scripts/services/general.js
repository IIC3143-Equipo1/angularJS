'use strict';
angular.module('evaluateApp').service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});