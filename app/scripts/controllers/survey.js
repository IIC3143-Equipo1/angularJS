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
      '$stateParams','Survey','Student','Course','popupService','$http','$q','url_api', function($scope,$timeout,$compile,$state,
        $stateParams,Survey,Student,Course,popupService,$http,$q,url_api) {
          $scope.list_knowledge_areas = [];
          $scope.list_answer_options  = [];
          $scope.selection            = [];
          $scope.selection_students   = [];
          $scope.current_answer;
          $scope.current_id;
          $scope.is_modal_send = true;

          $scope.sno_students = function (index) {
            var from = 5 * ($scope.all_students.current_page - 1) + 1;
            return from + index;
          };  

          $scope.sno_courses = function (index) {
            var from = 5 * ($scope.all_courses.current_page - 1) + 1;
            return from + index;
          }; 

          $scope.select_course = function(course){
            $('#sel_course').val(course.id);
            $('#course_modal').modal('hide');

          };

          $scope.open_students = function(survey){
              //$scope.students = [{id:1,name:'Juan Diaz',email:'jddiaz4@uc.cl'},{id:2,name:'Pablo',email:'pmessina@uc.cl'},{id:3,name:'Nicolas Cerda',email:'ncerda@uc.cl'}]; //Student.get({id:id});
              $scope.current_id = survey.id_course;
              $scope.load_grid_students(survey);
          };

          /*Mensaje personalizado para información o errores*/
          $scope.show_alert = function(message) {
              $('#alert').html("<div class='alert alert-danger'>" +
                  "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+message+"</div>");
              $('#alert').alert();
              $("#alert").fadeTo(3000, 500).slideUp(500, function(){
                  $("#alert").alert('close');
              });
          };

          /* Metodo para agregar la directiva de crear area
          de conocimiento, retorna una promesa*/
          $scope.add_knowledge_area = function(kw_or_name,kw_position = null){
            var defer = $q.defer();
            var name  = kw_or_name;
            if(kw_position != null) name = kw_or_name['name'];
              if(name != '') {
                  if ($.inArray(name, $scope.list_knowledge_areas) == -1) {
                      var compile_element = $compile('<knowledge-area name=' + name + '></knowledge-area>')($scope,
                        function(clone,scope){
                          angular.element(document.getElementById('list_kw_areas')).append(clone); 
                          $scope.list_knowledge_areas.push(name);
                          $('#txt_knowledge_area').val('');
                          $('#txt_knowledge_area').focus();
                          var smt = [kw_or_name,kw_position];
                          defer.resolve(smt);
                      });
                  } else {
                      $scope.show_alert('Area de conocimiento ya ha sido agregada.');
                      defer.reject(false);
                  }
              }else
              {
                  $scope.show_alert('Debe seleccionar o digitar un area de conocimiento.');
                  defer.reject(false);
              }
              return defer.promise;
          };

          /* Metodo para agregar la directiva de preguntas,
          retorna una promesa*/
          $scope.add_question = function(kw_position,question_position,parentName,kw){
            var defer = $q.defer();
            var dd = $compile('<ka-question kw='+kw_position+' quest ='+question_position+' parent='+
              parentName+' name='+parentName+'_question'+$scope['count_'+parentName]+'></ka-question>')($scope,
              function(clone,scope){
                angular.element(document.getElementById('list_'+parentName)).append(clone);
                   var result = [kw_position,question_position,parentName,kw];
                   defer.resolve(result); 
                });
               return defer.promise;
          };

          /* Metodo para agrega la directiva de lista de respuestas
          no requiere promesa.
          */
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

          /*Metodo para obtener el numero de 
          registro en el grid de encuestas */
          $scope.sno = function (index) {
              var from = 5 * ($scope.all_surveis.current_page - 1) + 1;
              return from + index;
          };

          /* Metodo para cargar el grid
          con encuestas al abrir la vista*/
          $scope.load_grid = function(){
              Survey.get({}, function (response) {
                console.log(response);
                $scope.surveis     = response.rows;
                $scope.all_surveis = response;
              }, function (error) {
                  $scope.surveis = [];
              });
          };

          $scope.load_grid_students = function(survey){
            var result = Student.http.getStudentsByCourse(survey.id_course,1); 
            result.then(function(response){
              console.log(response);
              $scope.students     = response.data.rows;
              $scope.all_students = response.data;
            },
            function(error){
              $scope.students = [];
            });
         };

          /*Metodo para inicializar algunas
          funcionalidades necesarias */
          $scope.init = function(){

              Course.get({}, function (response) {
                $scope.all_courses = response;
                $scope.courses     = response.rows;  
              }, function (error) {
                  $scope.courses = [];
              });

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
                      $scope.list_answer_options[e.relatedTarget.attributes['data-parent'].value] = [];
                  }
                  $scope.current_answer = e.relatedTarget.attributes['data-parent'].value;
              });

          };  

          /* Metodo para eliminar masivamente
          encuestas*/
          $scope.delete_surveis=function(){
            if(popupService.showPopup('Esta seguro de eliminar la información?')){
              var i = 0;
              var len_selection = Object.keys($scope.selection).length-1;
              $scope.selection.forEach(function(obj,key){
                if(obj)
                {
                  if(i == len_selection)
                  {
                     var response = Survey.delete({id:key},function(response){
                         $scope.selection = [];
                         $state.reload();
                     });
                  }else
                  {
                    var response = Survey.delete({id:key});
                  }
                }
                  i = i + 1;
              });
              }
          };

          /* Metodo parar borrar individualmente
          encuestas*/
          $scope.delete_survey=function(survey){
              if(popupService.showPopup('Esta seguro de eliminar la encuesta?')){
                  var response = Survey.delete({id:survey.id});
                  $state.reload();
              }
          };

          /* Metodo para ver una encuesta */
          $scope.survey_view = function()
          {
            $scope.survey= Survey.get({id:$stateParams.id});
          };

          /* Metodo para inicializar un
          objeto encuesta*/
          $scope.survey_new = function()
          {
            $scope.survey = new Survey();
            $scope.survey.id_course = '0';
          };

          /* Metodo parar preparar un objeto
          tipo encuesta con todos la información
          necesaria para ser guardada*/
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

          /* Metodo para guardar encuesta */
          $scope.survey_save = function()
          {
            if(!$("#txt_name").val()){$scope.show_alert('Debes digitar un nombre '); return false;}
            if($("#sel_course").val() == 0 || $("#sel_course").val() == null){$scope.show_alert('Debes seleccionar un curso '); return false;}
            if($scope.list_knowledge_areas.length == 0){$scope.show_alert('Debes agregar al menos un area de conocimiento '); return false;}
           
             $scope.prepare_data();
              $scope.survey.$save(function(response){
                $state.go('dashboard.survey');
              }); 
          };

          /* Metodo para cargar una encuesta */
          $scope.survey_edit = function()
          {
             $scope.load_survey();
          };

          /* Metodo para actualizar una encuesta */
          $scope.update_survey = function(){
            $scope.prepare_data();
            $scope.survey.$update({id:$stateParams.id},function(response){
              $state.go('dashboard.survey');
            }, function (error) {
                console.log(error);
            }); 
          };

          /* Metodo que se encarga de cargar
          el formulario con todos las directivas
          renderizadas*/
          $scope.load_survey=function(){
              $scope.survey = Survey.get({id:$stateParams.id}, function (response) {    
              $scope.survey.id_course = String(response.id_course);       
                if(response.kw_areas)
                {
                  var len = response.kw_areas.length;
                  for (var i = 0; i < len; i++) {
                    var kw = response.kw_areas[i];
                    var kw_promise = $scope.add_knowledge_area(kw,i);
                    //start promise kw
                    kw_promise.then(function(val){
                      $('#list_kw_areas').sortable({
                          handle: ".panel-heading"
                      });
                      var parentName = 'ka_'+val[0]['name'];
                      $scope['count_'+parentName] = 0;
                      if(kw.questions)
                      {
                      var len_questions = val[0].questions.length;
                      for (var j = 0; j < len_questions; j++)
                      {
                         $timeout(function(parentName,i,j){     
                            $scope['count_'+parentName]++;
                            var question_promise = $scope.add_question(val[1],j,parentName,val[0]);
                            //start promise question
                            question_promise.then(function(val_aux){
                              $('#list_'+val_aux[2]+' .collapse').removeClass('in');
                                  $('#list_'+val_aux[2]).sortable({
                                    handle: ".panel-heading"
                                });

                              var question_val= val_aux[3].questions[val_aux[1]];
                              var answer_name = val_aux[2]+'_question'+$scope['count_'+val_aux[2]];

                              $scope.list_answer_options[answer_name] = [];
                              if(question_val && question_val.opt_answers)
                              {
                                var len_answers = question_val.opt_answers.length
                                for (var k = 0; k < len_answers;k++)
                                {
                                  $scope.list_answer_options[answer_name].push(question_val.opt_answers[k].option);
                                }
                              }
                            });
                            //end promise question
                          } ,0 ,true,parentName,val[1],j);    
                      }
                     }  
                    });
                    //end promise kw
                  }
                }
            }, function (error) {
                console.log(error);
                $scope.surveis = [];
            });
          };

          $scope.send_survey = function(student){
            var data = $.param({
                name: student.name,
                email: student.email
            });
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
            $http.post(url_api+'api/send_message', data, config)
            .success(function (data, status, headers, config) {
                alert('Enviado correctamente');
            })
            .error(function (data, status, header, config) {
              console.log(data);
            });
          }
    }]);