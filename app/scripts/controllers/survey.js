'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('SurveyCtrl', ['$scope','$timeout','$compile','$state',
      '$stateParams','Survey','popupService', function($scope,$timeout,$compile,$state,$stateParams,Survey,popupService) {
          $scope.list_knowledge_areas = [];
          $scope.list_answer_options  = [];
          $scope.selection = [];
          $scope.current_answer;

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
                  if ($.inArray(name.toLowerCase(), $scope.list_knowledge_areas) == -1) {
                      angular.element(document.getElementById('list_kw_areas')).append($compile('<knowledge-area name=' + name + '></knowledge-area>')($scope));
                      $('#list_kw_areas .collapse').removeClass('in');
                      $('#list_kw_areas').sortable({
                          handle: ".panel-heading"
                      });
                      $scope.list_knowledge_areas.push(name.toLowerCase());
                  } else {
                      $scope.show_alert('Area de conocimiento ya ha sido agregada.');
                      //alert('Area de conocimiento ya ha sido agregada.');
                  }
              }else
              {
                  $scope.show_alert('Debe seleccionar o digitar un area de conocimiento.');
                  //alert('Debe seleccionar o digitar un area de conocimiento.')
              }
          };

          $scope.add_answer_option = function(){
            var name = $("#txt_answer").val();
            if(name != '') {
                if ($.inArray(name, $scope.list_answer_options[$scope.currentAnswer]) == -1) {
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
          }

          $scope.load_grid = function(){

              Survey.get({}, function (response) {
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
                      $scope.add_knowledge_area(ui.item.value);
                  }
              });

              $('#answer_options_modal').on('show.bs.modal', function (e) {
                  $('#txt_answer').val('');
                  $('#txt_answer').focus();
                  $("#list_answer_options").empty();
      
                  if($scope.list_answer_options[e.relatedTarget.id]) {
                      for (var i = 0; i < $scope.list_answer_options[e.relatedTarget.id].length; i++) {
                          angular.element(document.getElementById('list_answer_options')).append(
                              $compile('<ka-answer name="' + $scope.list_answer_options[e.relatedTarget.id][i] + '"></ka-answer>')($scope)
                          );
                      }
                  }else
                  {
                      $scope.list_answer_options[e.relatedTarget.id] = [];
                  }
                  $scope.current_answer = e.relatedTarget.id;
              });

          };  


          $scope.delete_surveis=function(){
            if(popupService.showPopup('Estás seguro?')){
                $scope.selection.forEach(function(obj,key){
                    var response = Survey.delete({id:key});
                });
                $scope.init();
                $scope.selection = [];
            }
          };

          $scope.delete_survey=function(survey){
              if(popupService.showPopup('Estás seguro?')){
                  var response = Survey.delete({id:survey.id});
                  //growl.success("Borrado correctamente", {ttl: 3000,disableCountDown: true});
                  $scope.init();
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

          $scope.survey_save = function()
          {

            $scope.survey.$save(function(){
              $state.go('dashboard.survey');
            });
          };

          $scope.survey_edit = function()
          {
             $scope.load_survey();
          };

          $scope.update_survey = function(){

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

                    } ,100 ,true,kw); 
                       var parentName = 'ka_'+kw['name'];
                       $scope['count_'+parentName] = 0;

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
                        var answer_name = parentName+'_question'+$scope['count_'+parentName]+'_btn_add_answer';

                        $timeout(function(question_val,parentName){  
                          $scope.list_answer_options[answer_name] = [];

                         var len_answers = question_val.opt_answers.length
                         for (var k = 0; k < len_answers;k++)
                         {
                            $scope.list_answer_options[answer_name].push(question_val.opt_answers[k].option);

                         }
                        } ,400 ,true,question_val,parentName);  

                      } ,200 ,true,parentName,i,j);    

                    }

                  }
                }
            }, function (error) {
                console.log(error);
                $scope.surveis = [];
            });
          };



    }]);
