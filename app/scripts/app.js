'use strict';
/**
 * @ngdoc overview
 * @name evaluateApp
 * @description
 * # evaluateApp
 *
 * Main module of the application.
 */
angular
  .module('evaluateApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngResource',
    'ngCookies',
    'smart-table'
  ])
  .config(['$stateProvider','$httpProvider','$urlRouterProvider','$ocLazyLoadProvider',
    function ($stateProvider,$httpProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $httpProvider.defaults.withCredentials = true;

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $httpProvider.interceptors.push(function($q, $location) { 
      return { response: function(response) { 
      // do something on success 
        return response; 
        }, responseError: function(response) { 
          if (response.status === 401) 
            $location.url('/login'); 
          return $q.reject(response); 
        } 
      }; 
    }); 

    $urlRouterProvider.otherwise('/login');

    var checkLoggedin = function($q, $timeout, $http, $state, $rootScope){ 
      // Initialize a new promise 
      var deferred = $q.defer(); 
      // Make an AJAX call to check if the user is logged in 
      //http://localhost:5001
      $http.get('https://evaluat-e-api.herokuapp.com/loggedin').success(function(user){ 
        // Authenticated 
        if (user !== '0') 
        {
          deferred.resolve(); // Not Authenticated 
        }
        else { 
          deferred.reject(); 
          $state.go('login');
        } 
      }); 
      return deferred.promise; 
    }; 

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'evaluateApp',
                    files:[
                    'scripts/controllers/login.js',
                    'scripts/services/login.js',
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loggedin: checkLoggedin,
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'scripts/controllers/main.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
    })
      .state('dashboard.survey',{
        controller: 'SurveyCtrl',
        templateUrl:'views/survey/survey.html',
        url:'/survey',
        resolve: {
          loggedin: checkLoggedin,
          loadMyDirectives:function($ocLazyLoad){
              return $ocLazyLoad.load(
                  {
                      name:'evaluateApp',
                      files:[
                          'scripts/services/survey.js',
                          'scripts/controllers/survey.js',
                          'scripts/directives/pagination/pagination.js',
                          'scripts/services/general.js',
                          'scripts/services/student.js',
                          'scripts/services/course.js'
                      ]
                  })}
    }})
      .state('dashboard.survey_new',{
        controller: 'SurveyCtrl',
        templateUrl:'views/survey/survey-add.html',
        url:'/survey/new',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/survey.js',
                            'scripts/controllers/survey.js',
                            'scripts/directives/knowledgeArea/knowledgeArea.js',
                            'scripts/directives/knowledgeArea/question/question.js',
                            'scripts/directives/knowledgeArea/answer/answer.js',
                            'scripts/services/general.js',
                            'scripts/services/student.js',
                            'scripts/services/course.js'
                        ]
                    })}
    }})
      .state('dashboard.survey_edit',{
        controller: 'SurveyCtrl',
        templateUrl:'views/survey/survey-edit.html',
        url:'/survey/:id/edit',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/survey.js',
                            'scripts/controllers/survey.js',
                            'scripts/directives/knowledgeArea/knowledgeArea.js',
                            'scripts/directives/knowledgeArea/question/question.js',
                            'scripts/directives/knowledgeArea/answer/answer.js',
                            'scripts/services/general.js',
                            'scripts/services/student.js',
                            'scripts/services/course.js'
                        ]
                    })}
    }})
      .state('login',{
        templateUrl:'views/dashboard/login.html',
        controller:'LoginCtrl',
        url:'/login',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'scripts/controllers/login.js',
                'scripts/services/login.js',
              ]
            })
          }
        }
    })
      .state('dashboard.auth',{
        templateUrl:'views/dashboard/auth.html',
        url:'/auth',
        resolve:{
          loggedin: checkLoggedin
        }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loggedin: checkLoggedin,
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'evaluateApp',
                files:['scripts/controllers/chart.js']
            })
          }
        }
    })
      .state('dashboard.course',{
        templateUrl:'views/course/course.html',
        controller:'CourseCtrl',
        url:'/course',
           resolve: {
            loggedin: checkLoggedin,
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'scripts/controllers/course.js',
                'scripts/services/course.js',
                'scripts/services/student.js',
                'scripts/directives/pagination/pagination.js',
                'scripts/services/general.js'
              ]
            })
          }
        }
    })
      .state('dashboard.course_new',{
        controller: 'CourseCtrl',
        templateUrl:'views/course/course-add.html',
        url:'/course/new',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/course.js',
                            'scripts/controllers/course.js',
                            'scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.course_edit',{
        controller: 'CourseCtrl',
        templateUrl:'views/course/course-edit.html',
        url:'/course/:id/edit',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/course.js',
                            'scripts/controllers/course.js',
                            'scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.student',{
        templateUrl:'views/student/student.html',
        controller:'StudentCtrl',
        url:'/student',
           resolve: {
            loggedin: checkLoggedin,
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'scripts/controllers/student.js',
                'scripts/services/student.js',
                'scripts/services/course.js',
                'scripts/services/general.js',
                'scripts/directives/pagination/pagination.js'
              ]
            })
          }
        }
    })   
      .state('dashboard.student_new',{
        controller: 'StudentCtrl',
        templateUrl:'views/student/student-add.html',
        url:'/student/new',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/student.js',
                            'scripts/controllers/student.js',
                            'scripts/services/course.js',
                            'scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.student_edit',{
        controller: 'StudentCtrl',
        templateUrl:'views/student/student-edit.html',
        url:'/student/:id/edit',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/student.js',
                            'scripts/controllers/student.js',
                            'scripts/services/course.js',
                            'scripts/services/general.js'
                        ]
                    })}
    }})
  }]).value('url_api', 'https://evaluat-e-api.herokuapp.com/');
    /*
    //http://localhost:5001
    /*
    .run(function($state,$rootScope) {
        $state.go('dashboard.home');
    });*/
    
