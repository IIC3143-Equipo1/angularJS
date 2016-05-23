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
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'evaluateApp',
                    files:[
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
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.survey',{
        controller: 'SurveyCtrl',
        templateUrl:'views/survey/survey.html',
        url:'/survey',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/survey.js',
                            'scripts/controllers/survey.js',
                            'scripts/directives/pagination/pagination.js',
                            'scripts/services/general.js',
                            'scripts/services/student.js'
                        ]
                    })}
    }})
      .state('dashboard.survey_new',{
        controller: 'SurveyCtrl',
        templateUrl:'views/survey/survey-add.html',
        url:'/survey/new',
        resolve: {
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
                            'scripts/services/general.js'
                        ]
                    })}
    }})
      .state('dashboard.survey_edit',{
        controller: 'SurveyCtrl',
        templateUrl:'views/survey/survey-edit.html',
        url:'/survey/:id/edit',
        resolve: {
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
                            'scripts/services/general.js'
                        ]
                    })}
    }})
      .state('login',{
        templateUrl:'views/dashboard/login.html',
        url:'/login'
    })
      .state('dashboard.auth',{
        templateUrl:'views/dashboard/auth.html',
        url:'/auth'
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
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
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'evaluateApp',
              files:[
              'scripts/controllers/course.js',
              'scripts/services/course.js',
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
    //http://localhost:5001
    //
    /*
    .run(function($state,$rootScope) {

        $state.go('dashboard.home');

    });*/
    
