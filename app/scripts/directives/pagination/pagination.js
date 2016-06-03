'use strict';

/**
 * @ngdoc directive
 * @name evaluateApp.directive:paginate
 * @description
 * # evaluateApp.paginate
 */
angular.module('evaluateApp')
    .directive('paginate',function($injector){
    return {
        scope: {
            allData: '=src',
            servicename:'@',
            type:'=?',
            identity:'=?',
            model:'@'
        },
        template: 
        '<div style="text-align: center"><ul class="pagination" ng-show="totalPages > 1">' +
        '  <li><a ng-click="firstPage()">&laquo;</a></li>' +
        '  <li><a ng-click="prevPage()">&lsaquo;</a></li>' +
        '  <li ng-repeat="n in pages">' +
        '    <a class="current-{{n==current_page}}" ng-bind="n" ng-click="setPage(n)">1</a>' +
        '  </li>' +
        '  <li><a ng-click="nextPage()">&rsaquo;</a></li>' +
        '  <li><a ng-click="last_page()">&raquo;</a></li>' +
        '</ul></div>',
        link: function (scope) {
            scope.nextPage = function () {
                if (scope.current_page < scope.totalPages) {
                    scope.current_page++;
                }
            };

            scope.prevPage = function () {
                if (scope.current_page > 1) {
                    scope.current_page--;
                }
            };

            scope.firstPage = function () {
                scope.current_page = 1;
            };

            scope.last_page = function () {
                scope.current_page = scope.totalPages;
            };

            scope.setPage = function (page) {
                scope.current_page = page;
            };
            var paginate = function (results, oldResults) {
                if (oldResults === results) return;
                scope.current_page = results.current_page;
                scope.total = results.count;
                var last_page = scope.total / 5;
                var last_pages_val = Math.ceil(last_page);
                scope.totalPages = last_pages_val;
                scope.pages = [];

                for (var i = 1; i <= scope.totalPages; i++) {
                    scope.pages.push(i);
                }
            };

            var pageChange = function (newPage, last_page) {
                var service = $injector.get(scope.servicename);
                if (newPage == last_page) return;  
                var type = angular.isDefined(scope.type) ? scope.type : 0;
                if(type)
                {
                    var result = service.http.getStudentsByCourse(scope.identity,newPage);
                    result.then(function (response) {
                        angular.copy(response.data.rows, scope.allData.rows);
                        scope.allData.current_page = response.data.current_page;
                    }, function (error) {
                        console.log(error);
                        scope.allData = [];
                    });
                }else
                {
                    var new_service = service;
                    if(scope.servicename == 'Student' || scope.servicename == 'Answer')
                    {
                        new_service = service.resource;
                    }
                    new_service.get({
                        page: newPage
                    }, function (response) {
                        angular.copy(response.rows, scope.allData.rows);
                        scope.allData.current_page = response.current_page;
                    }, function (error) {
                        console.log(error);
                        scope.allData = [];
                    });
                }

            };

            scope.$watch('allData', paginate);
            scope.$watch('current_page', pageChange);
        }
    }
});