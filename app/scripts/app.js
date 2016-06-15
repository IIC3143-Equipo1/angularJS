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
      //http://dsw1.ing.puc.cl
      $http.get('http://localhost:5001/evaluate/loggedin').success(function(user){ 
        // Authenticated 
        if (user !== '0') 
        {
          deferred.resolve(user); // Not Authenticated 
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
                    'scripts/services/general.js',
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
                'scripts/services/survey.js',
                'scripts/services/answer.js',
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
      .state('answer_form',{
        controller: 'AnswerCtrl',
        templateUrl:'views/answer/answer-form.html',
        url:'/answer_form/:hash',
        resolve: {
            //loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/survey.js',
                            'scripts/controllers/answer.js',
                            'scripts/services/general.js',
                            'scripts/services/student.js',
                            'scripts/services/course.js',
                            'scripts/services/answer.js'
                        ]
                    })}
    }})
      .state('dashboard.answer',{
        controller: 'AnswerCtrl',
        templateUrl:'views/answer/answer.html',
        url:'/answer',
        resolve: {
            //loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/survey.js',
                            'scripts/controllers/answer.js',
                            'scripts/services/general.js',
                            'scripts/services/student.js',
                            'scripts/directives/pagination/pagination.js',
                            'scripts/services/course.js',
                            'scripts/services/answer.js'
                        ]
                    })}
    }})
      .state('dashboard.answer_view',{
        controller: 'AnswerCtrl',
        templateUrl:'views/answer/answer-view.html',
        url:'/answer/:id/view',
        resolve: {
            //loggedin: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'evaluateApp',
                        files:[
                            'scripts/services/survey.js',
                            'scripts/controllers/answer.js',
                            'scripts/services/general.js',
                            'scripts/services/student.js',
                            'scripts/services/course.js',
                            'scripts/services/answer.js'
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
                'scripts/services/general.js'
              ]
            })
          }
        }
    }).
      state('dashboard.profile',{
        templateUrl:'views/dashboard/profile.html',
        url:'/profile',
        resolve:{
          loggedin:checkLoggedin
        },
        controller:function(loggedin,$http,url_api,sessionService,alertService,$state,$timeout){
          this.user = loggedin; 
          this.save = function(form){
          if(form.txt_pass.$error.minlength){  alertService.showAlert('El password debe contener 8 o mas caracteres'); return;}
          var data = $.param({
               firstName: this.user.firstName,
                lastName: this.user.lastName,
                password: this.user.password
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http.post(url_api+'api/user/'+this.user.id, data, config)
            .success(function (data, status, headers, config) {
                var user_info = {
                  firstName: data.firstName,
                  username: data.username
                };
                sessionService.setCookieData(user_info);
                //alert('Perfil actualizado correctamente');
                 /*$timeout(function(){
                    $state.reload();
                 }, 2000);*/
                alertService.showAlert('Perfil actualizado correctamente','success');

            })
            .error(function (data, status, header, config) {
              console.log(data);
            });
          }
        },
        controllerAs: 'profile'
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
  }]).value('url_api', 'http://localhost:5001/evaluate/');
    /*https://evaluat-e-api.herokuapp.com/
    //http://dsw1.ing.puc.cl/
    //http://localhost:5001/
    /*
    .run(function($state,$rootScope) {
        $state.go('dashboard.home');
    });*/
