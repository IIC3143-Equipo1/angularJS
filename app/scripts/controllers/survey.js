'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
    .controller('SurveyCtrl', ['$scope','$timeout','$compile','$state',
      '$stateParams','Survey','popupService','$http', function($scope,$timeout,$compile,$state,$stateParams,Survey,popupService,$http) {
          $scope.list_knowledge_areas = [];
          $scope.list_answer_options  = [];
          $scope.selection = [];
          $scope.selection_students = [];
          $scope.current_answer;


 $scope.selection_courses = [];

      $scope.courses = [{id:1,name:'Cuarto elemental',code:'c400'},{id:2,name:'Quinto elemental',code:'c500'},{id:3,name:'Sexto elemental',code:'c600'}]; //Student.get({id:id});

       $scope.sno_courses = function (index) {
              var from = 5 * (0) + 1;
              return from + index;
          };


          $scope.show_alert = function(message) {
              $('#alert').html("<div class='alert alert-danger'>" +
                  "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+message+"</div>");
              $('#alert').alert();//("slide", { direction: "left" }, 4000);
              $("#alert").fadeTo(3000, 500).slideUp(500, function(){
                  $("#alert").alert('close');
              });
          };

          $scope.add_knowledge_area = function(name){
              if(name != '') {
                  if ($.inArray(name, $scope.list_knowledge_areas) == -1) {
                      angular.element(document.getElementById('list_kw_areas')).append($compile('<knowledge-area name=' + name + '></knowledge-area>')($scope));
                      $('#list_kw_areas .collapse').removeClass('in');
                      $('#list_kw_areas').sortable({
                          handle: ".panel-heading"
                      });
                      $scope.list_knowledge_areas.push(name);
                      $('#txt_knowledge_area').val('');
                      $('#txt_knowledge_area').focus();
                  } else {
                      $scope.show_alert('Area de conocimiento ya ha sido agregada.');
                      //alert('Area de conocimiento ya ha sido agregada.');
                  }
              }else
              {
                  $scope.show_alert('Debe seleccionar o digitar un area de conocimiento.');
                  //alert('Debe seleccionar o digitar un area de conocimiento.')
              }
              return true;
          };

          $scope.add_answer_option = function(){
            var name = $("#txt_answer").val();
            if(name != '') {
                if ($.inArray(name, $scope.list_answer_options[$scope.current_answer]) == -1) {
                    angular.element(document.getElementById('list_answer_options')).append(
                        $compile('<ka-answer name="' + name + '"></ka-answer>')($scope)
                    );
                    $('#list_answer_options').sortable();
                    $scope.list_answer_options[$scope.current_answer].push(name);
                    $('#txt_answer').val('');
                    $('#txt_answer').focus();
                } else {
                    $scope.show_alert('Opción de respuesta repetida.');
                }
            }else
            {
                $scope.show_alert('Debe digitar una opción de respuesta.');
            }
          };

          $scope.sno = function (index) {
              var from = 5 * ($scope.all_surveis.current_page - 1) + 1;
              return from + index;
          };

            $scope.sno_students = function (index) {
              var from = 5 * (0) + 1;
              return from + index;
          };

          $scope.load_grid = function(){

              Survey.get({}, function (response) {
                console.log(response);
                $scope.surveis     = response.rows;
                $scope.all_surveis = response;
              }, function (error) {
                  $scope.surveis = [];
              });

          };

          $scope.init = function(){

              $('#list_kw_areas').collapse();

              var knowledge_areas = [
                  "Ciencias",
                  "Matematicas",
                  "Sociales",
                  "Etica",
                  "Ingles",
                  "Español"
              ];

              $( "#txt_knowledge_area" ).autocomplete({
                  source: knowledge_areas,
                  select: function( event, ui ) {
                      $scope.add_knowledge_area(ui.item.value.toLowerCase());
                  }
              });

              $('#answer_options_modal').on('show.bs.modal', function (e) {
                  $('#txt_answer').val('');
                  $('#txt_answer').focus();
                  $("#list_answer_options").empty();
      
                  if($scope.list_answer_options[e.relatedTarget.attributes['data-parent'].value]) {
                      for (var i = 0; i < $scope.list_answer_options[e.relatedTarget.attributes['data-parent'].value].length; i++) {
                          angular.element(document.getElementById('list_answer_options')).append(
                              $compile('<ka-answer name="' + $scope.list_answer_options[e.relatedTarget.attributes['data-parent'].value][i] + '"></ka-answer>')($scope)
                          );
                      }
                  }else
                  {
                      $scope.list_answer_options[e.relatedTarget.attributes['data-parent'].value] = [];//[e.relatedTarget.id] = [];
                  }
                  $scope.current_answer = e.relatedTarget.attributes['data-parent'].value;//.relatedTarget.id;
              });

          };  


          $scope.delete_surveis=function(){
            if(popupService.showPopup('Esta seguro de eliminar la información?')){
              console.log($scope.selection);
                $scope.selection.forEach(function(obj,key){
                    var response = Survey.delete({id:key});
                });
                $timeout(function(){  
                  $state.reload();
                      },1000); 
                $scope.selection = [];
            }
          };

          $scope.delete_survey=function(survey){
              if(popupService.showPopup('Esta seguro de eliminar la encuesta?')){
                  var response = Survey.delete({id:survey.id});
                  //growl.success("Borrado correctamente", {ttl: 3000,disableCountDown: true});
                  $state.reload();
                  //$scope.init();
              }
          };

          $scope.update_survey=function(){
              $scope.survey.$update(function(){
                  $state.go('dashboard.survey');
              });
          };

          $scope.survey_view = function()
          {
            $scope.survey= Survey.get({id:$stateParams.id});
          };

          $scope.survey_new = function()
          {
            $scope.survey = new Survey();
          };

          /*$scope.add_survey = function()
          {
            $scope.survey.$save(function(){
                $state.go('dashboard.survey');
            });
          }*/

          $scope.prepare_data = function(){

            $scope.survey.kw_areas = [];
            if($scope.list_knowledge_areas)
              {
              var kw_len = $scope.list_knowledge_areas.length
              for(var i = 0; i < kw_len; i ++)
              {
                var kw_save = new Object();
                kw_save['name'] = $scope.list_knowledge_areas[i];
                var aux_kw = $("div[data-kw='ka_"+$scope.list_knowledge_areas[i]+"'] div[data-question]");
                kw_save['questions'] = [];
                $.each( aux_kw, function( key, value ) {
                  console.log(value);
                  var question_save = new Object();
                  var question_id = value.attributes['data-question'].value;
                  var aux_question = $("div[data-question='"+question_id+"'] [data-question-info]");
                  question_save['position'] = key;
                  $.each( aux_question, function( key, valueAux ) {
                      question_save[valueAux.name] = valueAux.value; 
                  });
                  if(value.id in $scope.list_answer_options)
                  {
                    var answers_len = $scope.list_answer_options[value.id].length;
                    question_save['opt_answers'] = [];
                    for(var j = 0; j < answers_len; j++)
                    {
                       var answer_save = new Object();
                       answer_save['option'] = $scope.list_answer_options[value.id][j]  ;
                       question_save['opt_answers'].push(answer_save);
                    }
                  }
                   kw_save['questions'].push(question_save);
                });
                $scope.survey.kw_areas.push(kw_save);
              }
            }

          }


          $scope.survey_save = function()
          {
            $scope.prepare_data();
            $scope.survey.$save(function(response){
              $state.go('dashboard.survey');
            }); 
          };

          $scope.survey_edit = function()
          {
             $scope.load_survey();
          };

          $scope.update_survey = function(){
            $scope.prepare_data();
            $scope.survey.$update({id:$stateParams.id},function(response){
              $state.go('dashboard.survey');
            }, function (error) {
                console.log(error);
                //$scope.surveis = [];
            }); 
          };

          $scope.load_survey=function(){
              $scope.survey = Survey.get({id:$stateParams.id}, function (response) {    

              $scope.survey.id_course = String(response.id_course);       
                if(response.kw_areas)
                {
                  var len = response.kw_areas.length;
                  for (var i = 0; i < len; i++) {
                    var kw = response.kw_areas[i];
                      $timeout(function(kw){  
                        $scope.add_knowledge_area(kw['name']);
                      },100 ,true,kw); 
                       var parentName = 'ka_'+kw['name'];
                       $scope['count_'+parentName] = 0;
                    if(kw.questions)
                    {
                    var len_questions = kw.questions.length;
                    for (var j = 0; j < len_questions; j++)
                    {
                       $timeout(function(parentName,i,j){     
                          $scope['count_'+parentName]++;
                          angular.element(document.getElementById('list_'+parentName)).append($compile('<ka-question kw='+i+' quest ='+j+' parent='+parentName+' name='+parentName+'_question'+$scope['count_'+parentName]+'></ka-question>')($scope));
                          $('#list_'+parentName+' .collapse').removeClass('in');
                          $('#list_'+parentName).sortable({
                            handle: ".panel-heading"
                          });

                       var question_val= kw.questions[j];
                        var answer_name = parentName+'_question'+$scope['count_'+parentName];

                        $timeout(function(question_val,parentName){  
                          $scope.list_answer_options[answer_name] = [];
                        if(question_val && question_val.opt_answers)
                         {
                           var len_answers = question_val.opt_answers.length
                           for (var k = 0; k < len_answers;k++)
                           {
                              $scope.list_answer_options[answer_name].push(question_val.opt_answers[k].option);
                           }
                         }
                        } ,400 ,true,question_val,parentName);  

                      } ,200 ,true,parentName,i,j);    

                    }
                   }
                  }
                }
            }, function (error) {
                console.log(error);
                $scope.surveis = [];
            });
          };


          $scope.open_students = function(survey){


               $scope.students = [{id:1,name:'Juan Diaz',email:'jddiaz4@uc.cl'},{id:2,name:'Pablo',email:'pmessina@uc.cl'},{id:3,name:'Nicolas Cerda',email:'ncerda@uc.cl'}]; //Student.get({id:id});


          };

          $scope.send_survey = function(student){


            // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                name: student.name,
                email: student.email
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
            $http.post('https://evaluat-e-api.herokuapp.com/api/send_message', data, config)
            .success(function (data, status, headers, config) {
                alert('Enviado correctamente');
            })
            .error(function (data, status, header, config) {
console.log(data);
            });



          }




    }]);
