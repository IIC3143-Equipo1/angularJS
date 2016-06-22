'use strict';
/**
 * @ngdoc function
 * @name evaluateApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the evaluateApp
 */
angular.module('evaluateApp')
  .controller('ChartCtrl', ['$scope', '$timeout','$http','url_api','$stateParams','Answer', function ($scope, $timeout,$http,url_api,$stateParams,Answer) {
    $scope.generate_pdf = function(){
     html2canvas(document.getElementById('chart_canvas'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Reporte.pdf");
            }
        });
    }

    $scope.$on('chart-create', function (evt, chart) {
      //console.log(chart);
    });

     $scope.type = 'pie';
     $scope.sel_surveis_gral = '-1';
     $scope.chart_surveis = function(){
        $http.post(url_api+'api/chart_surveis', null, {})
        .success(function (data, status, headers, config) {
            $scope.info_pie = data;
            $scope.pie = {
                labels : ["Respondidas", "Sin responder", "Sin enviar"],
                data : [],
                click:function()
                {
                $scope.type = $scope.type === 'polarArea' ?
                'pie' : 'polarArea';
                },
                options:{
                    defaultFontSize:30,
                     title: {
                        display: true,
                        text: 'Estadisticas generales'
                    },
                    legend:{
                        display:true
                     }   
                }
            };
        })
        .error(function (data, status, header, config) {
          console.log(data.full);
        });
      }

      $scope.stacked = false;
      var options_bar = {
        hover :{
            animationDuration:0
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize:11
                },
                scaleLabel:{
                    display:false
                },
                gridLines: {
                }, 
                stacked: false
            }],
            yAxes: [{
                gridLines: {
                    display:false,
                    color: "#fff",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0
                },
                ticks: {
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize:11
                },
                stacked: false
            }]
        },
        legend:{
            display:true
        },
        
        animation: {
            onComplete: function () {
                var chartInstance = this.chart;
                var ctx = chartInstance.ctx;
                ctx.textAlign = "left";
                ctx.font = "9px Open Sans";
                ctx.fillStyle = "black";

                Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    Chart.helpers.each(meta.data.forEach(function (bar, index) {
                        if($scope.stacked)
                        {
                            if(!meta.hidden)
                            {    
                                var data = dataset.data[index];
                                if(data > 0)
                                {
                                    ctx.fillText(data, bar._model.x-10, bar._model.y+4);
                                }
                            }
                        }      
                    }),this)
                }),this);
            }
        },
        pointLabelFontFamily : "Quadon Extra Bold",
             scaleFontFamily : "Quadon Extra Bold",
    };


      $scope.sel_courses_gral = '-1';
      $scope.chart_courses = function(){
        $http.post(url_api+'api/chart_courses', null, {})
        .success(function (data, status, headers, config) {
            $scope.info_bar = data;
            $scope.bar = {
                labels : [],
                series:["Respondidas", "Sin responder"],
                data : [],
                change:function(){
                    this.data   = $scope.info_bar[$scope.sel_courses_gral].data;
                    this.labels = $scope.info_bar[$scope.sel_courses_gral].info;
                },
                click:function()
                {
                    $scope.stacked = $scope.stacked === true ? false : true;
                    this.options.scales.xAxes[0].stacked = this.options.scales.xAxes[0].stacked  === true ? false : true;
                    this.options.scales.yAxes[0].stacked = this.options.scales.yAxes[0].stacked  === true ? false : true;
                },
                options: options_bar
            };

        })
        .error(function (data, status, header, config) {
          console.log(data.full);
        });
      }

      $scope.chart_answers = function(id){
        var params = $.param({
           id_survey: id
        });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        $http.post(url_api+'api/chart_answers', params, config)
        .success(function (data, status, headers, config) {
            $('#surveis_chart').html('');
            $scope.info_answers = data.data;
            if($scope.info_answers.length >0)
            {
            var keys_answers    = Object.keys($scope.info_answers[0]);
            var length_answers  = keys_answers.length;
            for( var j = 0; j < length_answers; j++ ) {
                var info = $scope.info_answers[0][keys_answers[j]];

                $('#surveis_chart').append('<div class="col-lg-6 col-sm-12"><div class="panel panel-default">'+
                    '<div class="panel-body"><canvas id="bar_' + keys_answers[j]+'"></canvas></div></div></div>');

                    var keys_values   = Object.keys(info.values);
                    var length_values = keys_values.length;
                    var values = [];
                    for( var k = 0; k < length_values; k++ ) {
                        values.push(info.values[keys_values[k]]);
                    }
                    var ctx = document.getElementById('bar_' + keys_answers[j]);
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                        labels: keys_values,
                        datasets: [
                        {
                             label: '# ',
                             data: values,
                             backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]},
                        options:{
                                defaultFontSize:30,
                                 title: {
                                    display: true,
                                    text: data.questions[keys_answers[j]]
                                },
                                legend:{
                                    display:true
                                 }   
                            }
                    });

                }
            }
        })
        .error(function (data, status, header, config) {
          console.log(data.full);
        });
      }

    $scope.change_survey = function()
    {
        $scope.pie.data = $scope.info_pie[$scope.sel_surveis_gral].data;
        var id = $scope.info_pie[$scope.sel_surveis_gral].info.survey_id;
        $scope.chart_answers(id);
    }
    
    $scope.general = function()
    {
        $scope.chart_courses();
        $scope.chart_surveis();
    }

    $scope.student_name = '';
    $scope.especifico = function()
    {
        Answer.resource.get({id:$stateParams.id},function(response)
        {
            console.log(response);
            $scope.student_name = response.Student.name;
            $scope.chart_answers(response.Survey.id);
            $('#feedback').html(response.feedback);

        })
    }


}]);