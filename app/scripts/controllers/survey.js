'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('SurveyCtrl', function($scope,$compile) {
          $scope.listKnowledgeAreas = [];
          $scope.listAnswerOptions  = [];
          $scope.currentAnswer;

        $scope.showAlert = function(message) {
            $('#alert').html("<div class='alert alert-danger'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+message+"</div>");
            $('#alert').alert();//("slide", { direction: "left" }, 4000);
            $("#alert").fadeTo(3000, 500).slideUp(500, function(){
                $("#alert").alert('close');
            });
        }


          $scope.addKnowledgeArea = function(name){
              if(name != '') {
                  if ($.inArray(name.toLowerCase(), $scope.listKnowledgeAreas) == -1) {
                      angular.element(document.getElementById('accordion')).append($compile('<knowledge-area name=' + name + '></knowledge-area>')($scope));
                      $('#accordion .collapse').removeClass('in');
                      $('#accordion').sortable({
                          handle: ".panel-heading"
                      });
                      $scope.listKnowledgeAreas.push(name.toLowerCase());
                  } else {
                      $scope.showAlert('Area de conocimiento ya ha sido agregada.');
                      //alert('Area de conocimiento ya ha sido agregada.');
                  }
              }else
              {
                  $scope.showAlert('Debe seleccionar o digitar un area de conocimiento.');
                  //alert('Debe seleccionar o digitar un area de conocimiento.')
              }
          };

        $scope.addAnswerOption = function(){
            var name = $("#txtAnswer").val();
            if(name != '') {
                if ($.inArray(name, $scope.listAnswerOptions[$scope.currentAnswer]) == -1) {
                    angular.element(document.getElementById('listAnswerOptions')).append(
                        $compile('<ka-answer name="' + name + '"></ka-answer>')($scope)
                    );
                    $('#listAnswerOptions').sortable();
                    $scope.listAnswerOptions[$scope.currentAnswer].push(name);
                    $('#txtAnswer').val('');
                    $('#txtAnswer').focus();
                } else {
                    $scope.showAlert('Opción de respuesta repetida.');
                }
            }else
            {
                $scope.showAlert('Debe digitar una opción de respuesta.');
            }
        };

          $scope.init = function(){
            $('#accordion').collapse();
              var knowledgeAreas = [
                  "Ciencias",
                  "Matematicas",
                  "Sociales",
                  "Etica",
                  "Ingles",
                  "EspaÃ±ol"
              ];
              $( "#txtApKnowledgeArea" ).autocomplete({
                  source: knowledgeAreas,
                  select: function( event, ui ) {
                      $scope.addKnowledgeArea(ui.item.value);
                  }
              });
              $('#answer-options-modal').on('show.bs.modal', function (e) {
                  $('#txtAnswer').focus();
              });

              $('#answer-options-modal').on('show.bs.modal', function (e) {
                  $('#txtAnswer').val('');
                  $("#listAnswerOptions").empty();
                  if($scope.listAnswerOptions[e.relatedTarget.id]) {
                      for (var i = 0; i < $scope.listAnswerOptions[e.relatedTarget.id].length; i++) {
                          angular.element(document.getElementById('listAnswerOptions')).append(
                              $compile('<ka-answer name="' + $scope.listAnswerOptions[e.relatedTarget.id][i] + '"></ka-answer>')($scope)
                          );
                      }
                  }else
                  {
                      $scope.listAnswerOptions[e.relatedTarget.id] = [];
                  }
                  $scope.currentAnswer = e.relatedTarget.id;
              });

        };
    });
