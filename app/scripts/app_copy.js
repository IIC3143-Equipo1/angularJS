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
    function ($stateProvider,$httpProvider,$urlRouterProvider,$ocLazyLoadProvider,$rootscope) {

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

    var checkLoggedin = function($q, $http, $state){ 
      // Initialize a new promise 
      var deferred = $q.defer(); 
      // Make an AJAX call to check if the user is logged in 
      //http://localhost:5001
      $http.get('http://dsw1.ing.puc.cl/loggedin').success(function(user){ 
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
        templateUrl: 'evaluate/views/dashboard/main.html',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'evaluateApp',
                    files:[
                    'evaluate/scripts/controllers/login.js',
                    'evaluate/scripts/services/login.js',
                    'evaluate/scripts/services/general.js',
                    'evaluate/scripts/directives/header/header.js',
                    'evaluate/scripts/directives/header/header-notification/header-notification.js',
                    'evaluate/scripts/directives/sidebar/sidebar.js',
                    'evaluate/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["evaluate/bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "evaluate/bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['evaluate/bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['evaluate/bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['evaluate/bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['evaluate/bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['evaluate/bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'evaluate/views/dashboard/home.html',
        resolve: {
          loggedin: checkLoggedin,
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'evaluate/scripts/controllers/main.js',
                'evaluate/scripts/directives/timeline/timeline.js',
                'evaluate/scripts/directives/notifications/notifications.js',
                'evaluate/scripts/directives/chat/chat.js',
                'evaluate/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
    })
      .state('dashboard.survey',{
        controller: 'SurveyCtrl',
        templateUrl:'evaluate/views/survey/survey.html',
        url:'/survey',
        resolve: {
          loggedin: checkLoggedin,
          loadMyDirectives:function($ocLazyLoad){
              return $ocLazyLoad.load(
                  {
                      name:'evaluateApp',
                      files:[
                          'evaluate/scripts/services/survey.js',
                          'evaluate/scripts/controllers/survey.js',
                          'evaluate/scripts/directives/pagination/pagination.js',
                          'evaluate/scripts/services/general.js',
                          'evaluate/scripts/services/student.js',
                          'evaluate/scripts/services/course.js'
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
                            'evaluate/scripts/services/survey.js',
                            'evaluate/scripts/controllers/survey.js',
                            'evaluate/scripts/directives/knowledgeArea/knowledgeArea.js',
                            'evaluate/scripts/directives/knowledgeArea/question/question.js',
                            'evaluate/scripts/directives/knowledgeArea/answer/answer.js',
                            'evaluate/scripts/services/general.js',
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/services/course.js'
                        ]
                    })}
    }})
      .state('dashboard.survey_edit',{
        controller: 'SurveyCtrl',
        templateUrl:'evaluate/views/survey/survey-edit.html',
        url:'/survey/:id/edit',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/survey.js',
                            'evaluate/scripts/controllers/survey.js',
                            'evaluate/scripts/directives/knowledgeArea/knowledgeArea.js',
                            'evaluate/scripts/directives/knowledgeArea/question/question.js',
                            'evaluate/scripts/directives/knowledgeArea/answer/answer.js',
                            'evaluate/scripts/services/general.js',
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/services/course.js'
                        ]
                    })}
    }})
      .state('answer_form',{
        controller: 'AnswerCtrl',
        templateUrl:'evaluate/views/answer/answer-form.html',
        url:'/answer_form/:hash',
        resolve: {
            //loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/survey.js',
                            'evaluate/scripts/controllers/answer.js',
                            'evaluate/scripts/services/general.js',
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/services/answer.js'
                        ]
                    })}
    }})
      .state('dashboard.answer',{
        controller: 'AnswerCtrl',
        templateUrl:'evaluate/views/answer/answer.html',
        url:'/answer',
        resolve: {
            //loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/survey.js',
                            'evaluate/scripts/controllers/answer.js',
                            'evaluate/scripts/services/general.js',
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/directives/pagination/pagination.js',
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/services/answer.js'
                        ]
                    })}
    }})
      .state('dashboard.answer_view',{
        controller: 'AnswerCtrl',
        templateUrl:'evaluate/views/answer/answer-view.html',
        url:'/answer/:id/view',
        resolve: {
            //loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/survey.js',
                            'evaluate/scripts/controllers/answer.js',
                            'evaluate/scripts/services/general.js',
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/services/answer.js'
                        ]
                    })}
    }})
      .state('login',{
        templateUrl:'evaluate/views/dashboard/login.html',
        controller:'LoginCtrl',
        url:'/login',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'evaluate/scripts/controllers/login.js',
                'evaluate/scripts/services/login.js',
                'evaluate/scripts/services/general.js'
              ]
            })
          }
        }
    })
      .state('dashboard.auth',{
        templateUrl:'evaluate/views/dashboard/auth.html',
        url:'/auth',
        resolve:{
          loggedin: checkLoggedin
        }
    })
      .state('dashboard.chart',{
        templateUrl:'evaluate/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loggedin: checkLoggedin,
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'evaluate/bower_components/angular-chart.js/dist/angular-chart.min.js',
                'evaluate/bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'evaluateApp',
                files:['evaluate/scripts/controllers/chart.js']
            })
          }
        }
    })
      .state('dashboard.course',{
        templateUrl:'evaluate/views/course/course.html',
        controller:'CourseCtrl',
        url:'/course',
           resolve: {
            loggedin: checkLoggedin,
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'evaluate/scripts/controllers/course.js',
                'evaluate/scripts/services/course.js',
                'evaluate/scripts/services/student.js',
                'evaluate/scripts/directives/pagination/pagination.js',
                'evaluate/scripts/services/general.js'
              ]
            })
          }
        }
    })
      .state('dashboard.course_new',{
        controller: 'CourseCtrl',
        templateUrl:'evaluate/views/course/course-add.html',
        url:'/course/new',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/controllers/course.js',
                            'evaluate/scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.course_edit',{
        controller: 'CourseCtrl',
        templateUrl:'evaluate/views/course/course-edit.html',
        url:'/course/:id/edit',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/controllers/course.js',
                            'evaluate/scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.student',{
        templateUrl:'evaluate/views/student/student.html',
        controller:'StudentCtrl',
        url:'/student',
           resolve: {
            loggedin: checkLoggedin,
            loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
                'evaluate/scripts/controllers/student.js',
                'evaluate/scripts/services/student.js',
                'evaluate/scripts/services/course.js',
                'evaluate/scripts/services/general.js',
                'evaluate/scripts/directives/pagination/pagination.js'
              ]
            })
          }
        }
    })   
      .state('dashboard.student_new',{
        controller: 'StudentCtrl',
        templateUrl:'evaluate/views/student/student-add.html',
        url:'/student/new',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/controllers/student.js',
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.student_edit',{
        controller: 'StudentCtrl',
        templateUrl:'evaluate/views/student/student-edit.html',
        url:'/student/:id/edit',
        resolve: {
            loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'evaluate/scripts/services/student.js',
                            'evaluate/scripts/controllers/student.js',
                            'evaluate/scripts/services/course.js',
                            'evaluate/scripts/services/general.js'
                        ]
                    })}
    }})
  }]).value('url_api', 'http://dsw1.ing.puc.cl/');
    /*https://evaluat-e-api.herokuapp.com/
    //
    /*
    .run(function($state,$rootScope) {
        $state.go('dashboard.home');
    });*/
    
