'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:AnswerCtrl
 * @description
 * # AnswerCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('AnswerCtrl', function($scope,$http,$state,$stateParams,url_api,Survey,Answer,popupService) {

  	$scope.survey;
  	$scope.answer;
  	$scope.answers;
  	$scope.all_answers;
  	$scope.current_answer;

    $scope.sno_answers = function (index) {
        var from = 5 * ($scope.all_answers.current_page - 1) + 1;
        return from + index;
    };  

    $scope.open_feedback = function(answer)
    {
    	$scope.current_answer = answer.id;
    	$(document).ready(function() {
    		if(answer.feedback != null)
    		{
    			$('#summernote').summernote('code', answer.feedback);
    		}else
    		{
    			$('#summernote').summernote('reset');
    		}
    	});
    };

    $scope.set_feedback = function()
    {
    	$scope.answer = new Answer.resource();
    	$scope.answer.feedback = $('#summernote').summernote('code');
		$scope.answer.$update({id:$scope.current_answer},function(response){
	      $scope.load_grid();
	    }, function (error) {
	        console.log(error);
	    });
    };

  	$scope.init = function(opt){
  		if(opt == '1')
  		{
  			decrypt();
  		}else
  		{
  			$scope.answer = Answer.resource.get({id:$stateParams.id},function(response){
  				render_form(response.Survey,opt,response.kw_answers);
  				Answer.http.setAnswerOpen($stateParams.id);
  			});
  		}	
  	};

  	$scope.load_grid = function()
  	{
      Answer.resource.get({}, function (response) {
        $scope.answers     = response.rows;
        $scope.all_answers = response;
      }, function (error) {
          $scope.answers = [];
      });
  	};

  	$scope.answer_save = function()
  	{
  		if(popupService.showPopup('Esta seguro de sus respuestas?')){
	  		$scope.answer = new Answer.resource();
	  		$scope.answer.id_student = $scope.id_student;
	  		$scope.answer.id_survey  = $scope.id_survey;
	  		$scope.answer.was_answered = true;
	  		$scope.answer.kw_answers = [];

			$.each($('div .is_main'),function(i,val){
				var kw = new Object();
	  			kw['position']  = i;
	  			kw['questions'] = [];
		  		$.each($(val).find('div .is_question'),function(k,val){
		  			var question = new Object();
		  			question['position'] = k;
		  			question['answer'];
		  			if($(val.children).length > 1){
		  				question['type'] = 3;
		  				var checkboxes = [];
		  				$.each($(val).find('input[name=opt_check]:checked'),function(j,val)
		  				{
		  					checkboxes.push($(val).val());
		  				});
		  				question['answer'] = checkboxes;
		  			}else
		  			{
		  				if($(val.children).attr('type') == 'select')
		  				{
		  					question['type'] = 2;
		  				}else
		  				{
		  					question['type'] = 1;
		  				}
		  				question['answer'] = $(val.children).val();
		  			}
		  			kw['questions'].push(question);
		  		});
		  		$scope.answer.kw_answers.push(kw);
	  		});
	  		$scope.answer.$update({id:$scope.current_answer},function(response){
		       $('#survey_student').html('<div class="panel panel-success">'+
										'<div class="panel-heading">RESPUESTA RECIBIDA</div>'+
										'<div class="panel-body">'+
										'Muchas gracias por responder la encuesta.'+
										'</div></div>');
		    },function(error){
		    	alert(error);
		    });
  		}
  	};

  	var render_form = function(survey,opt = '1',answer_obj = null)
  	{
    	var kw_areas = survey.kw_areas;
    	var len 	 = kw_areas.length;
    	var html = '';
        for (var i = 0; i < len; i++) {  
            var kw_name = kw_areas[i].name;       	
    		html += '<div class="panel panel-default is_main">'+
					'<div class="panel-heading text-capitalize">'+  kw_name +'</div>'+
					'<div class="panel-body" id="'+ kw_name +'_kw">';
    		var questions = kw_areas[i].questions;
    		questions.sort(function(a,b){
    			return a['position'] - b['position'];
    		});
    		if(questions)
    		{
	        	var len_questions = questions.length;
	            for (var k = 0; k < len_questions; k++) { 
	            	var input    = '';
	            	var required = (questions[k].required == '1')? 'required':'';
            		var value = '';
            		if(answer_obj)
            		{
            			value = answer_obj[i].questions[k].answer;
            		}
	            	switch(questions[k].type)
	            	{
	            		case '1':

	            		input = '<input id="txt_'+kw_name+'_'+k+'" value="'+value+'" name="txt_'+kw_name+'_'+k+'" type="text" class="form-control input-md"'+
                    	 'required="'+required+'">';
	            		break;
	            		case '2':
	            		input = '<select id="select_'+kw_name+'_'+k+'" name="select_'+kw_name+'_'+k+'" type="select" class="form-control input-md"'+
                    	 'required="'+required+'">';
                    	  var len_answers  = questions[k].opt_answers.length;
                    	  if(len_answers > 0){
                    	  	input += '<option value="0">Selecciona una opción</option>';
                    	  }
                    	  var answer = questions[k].opt_answers;
				          for (var j = 0; j < len_answers; j++) {
					          	if(!value)
					          	{
					          	 	input += '<option value="'+ answer[j].option +'">'+ answer[j].option +'</option>';
					          	}else
					          	{
					          		input += '<option value="'+ answer[j].option +'" selected>'+ answer[j].option +'</option>';
					          	}
				          	}
				        input += '</select>';  
	            		break;
	            		case '3':
                    	  var len_answers  = questions[k].opt_answers.length;
                    	  var answer = questions[k].opt_answers;
				          for (var j = 0; j < len_answers; j++) {
				          	if($.inArray(answer[j].option,value) == -1)
				          	{
				          	 	input += '<div class="checkbox"><label><input type="checkbox" name="opt_check" value="'+answer[j].option+'">'+ answer[j].option +'</label></div>';
				          	}else
				          	{
				          		input += '<div class="checkbox"><label><input type="checkbox" name="opt_check" value="'+answer[j].option+'" checked>'+ answer[j].option +'</label></div>';
				          	}
				          } 
	            		break;
	            		default:
						input = '<input id="txt_'+kw_name+'_'+k+'" value="'+value+'" name="txt_'+kw_name+'_'+k+'" type="text" class="form-control input-md"'+
                    	 'required="'+required+'">';
	            		break;
	            	}

	            	html += '<div class="row">'+
                	'<label class="col-md-12 control-label" for="txt_'+kw_name+'_'+k+'">'+ questions[k].text +'</label>'+
                		'<div class="col-md-4 is_question">'+
                		input + '</div></div>';
	            }
        	}
        	html += '</div></div>'
    	}
    	if(opt == '1')
    	{
	    	html += '<div class="panel panel-default">'+
	    			'<div class="panel-body text-center">'+
	    			 '<button type="button" id="save_answer" class="btn btn-success navbar-btn" formnovalidate>Guardar</button>'+
	    			'</div></div>';
    	}
    	$('#survey_student').html(html);
    	if(opt == '2')
    	{
    		$('.form-control').prop('disabled',true);
    		$('input[type=checkbox]').prop('disabled',true);
    	}

    	$('#save_answer').on('click',function(){
    		$scope.answer_save();
    	});
  	}

	var decrypt = function(){ 
        var data = $.param({
          text: $stateParams.hash
        });
        var config = {
	        headers : {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
        }
	    $http.post(url_api+'api/decrypt', data, config)
	    .success(function (data, status, headers, config) {
	        var datos =  data.split('&-&');
	        $scope.id_student = datos[0];
	        $scope.id_survey  = datos[1];
	        var answer_response = Answer.http.getAnswerByStudentSurvey($scope.id_survey,$scope.id_student);
	        answer_response.then(function(response_aux)
	        {
		    	if(!response_aux.data.was_answered)
		    	{
		    		$scope.current_answer = response_aux.data.id;

		    		$scope.survey = Survey.resource.get({id:$scope.id_survey}, function (response) { 
				    	render_form(response);   
					});
		       	}else
		       	{
		       		$('#survey_student').html('<div class="panel panel-warning">'+
										'<div class="panel-heading">ENCUESTA FINALIZADA</div>'+
										'<div class="panel-body">'+
										'Esta encuesta ya ha sido contestada por usted, muchas gracias por su participación.'+
										'</div></div>');
		       	}
	   		});
	    })
	    .error(function (data, status, header, config) {
	      	console.log(data);
	    }); 
    }; 

  });
