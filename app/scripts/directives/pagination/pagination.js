'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('paginate',function($injector){
    return {
        scope: {
            allData: '=src',
            servicename:'@',
            model:'@'
        },
        template: '<div style="text-align: center"><ul class="pagination" ng-show="totalPages > 1">' +
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
                scope.total = results.total;
                scope.totalPages = results.last_page;
                scope.pages = [];

                for (var i = 1; i <= scope.totalPages; i++) {
                    scope.pages.push(i);
                }
            };

            var pageChange = function (newPage, last_page) {

                var service = $injector.get(scope.servicename);
                if (newPage == last_page) return;
                service.get({
                    page: newPage
                }, function (response) {
                    angular.copy(response[scope.model].data, scope.allData.data);
                    scope.allData.current_page = response[scope.model].current_page;
                }, function (error) {
                    console.log(error);
                    scope.allData.data = [];
                });

            };

            scope.$watch('allData', paginate);
            scope.$watch('current_page', pageChange);
        }
    }
});