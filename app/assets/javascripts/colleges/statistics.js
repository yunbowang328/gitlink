$(document).on('turbolinks:load', function() {
  if($('body.colleges-statistics-page').length > 0) {
    var $statisticBody = $('.statistics-body');
    var $statisticBase = $('.statistic-base');
    var schoolId = $statisticBody.data('id');
    var $statisticCourse = $statisticBody.find('.statistic-course')
    var $shixunChart = $statisticBody.find('.shixun-chart');

    $.get('/colleges/' + schoolId + '/shixun_time', function(data){
      $statisticBase.find('.shixun-time').html("<span>" + data.shixun_time + "</span>天");
    });
    $.get('/colleges/' + schoolId + '/shixun_report_count', function(data){
      $statisticBase.find('.shixun-report-count').html("<span>" + data.shixun_report_count + "</span>个");
    });

    $.ajax({ url: '/colleges/' + schoolId + '/course_statistics', method: 'GET', dataType: 'script' });
    $.ajax({ url: '/colleges/' + schoolId + '/teachers', method: 'GET', dataType: 'script' });

    var initShixunChart = function(names, data){
      var shixunChart = echarts.init(document.getElementById('shixun-chart'));
      var options = {
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: data
          }
        ]
      };

      shixunChart.setOption(options);
    };
    $.get('/colleges/' + schoolId + '/shixun_chart_data', function(data){
      $statisticBody.find('.shixun-chart-loading').hide();
      if (data.data.length > 0) {
        $shixunChart.css('height', '400px').css('width', '100%');
        initShixunChart(data.names, data.data);
      } else {
        $statisticBody.find('.shixun-chart-empty').show();
      }
    });

    $.ajax({ url: '/colleges/' + schoolId + '/student_shixun', method: 'GET', dataType: 'script' });

    var initHotEvaluating = function(names, values){
      var Color = ['#962e66', '#623363', '#CCCCCC', '#9A9A9A', '#FF8080', '#FF80C2', '#B980FF', '#80B9FF', '#6FE9FF', '#4DE8B4', '#F8EF63', '#FFB967'];

      var option = {
        backgroundColor: '#fff',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },

        tooltip: {
          show: "true",
          trigger: 'item',
          formatter: '{c0}',
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], //内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#656565',
              fontWeight: 'normal',
              fontSize: '12'
            },
            formatter: '{value}'
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#cccccc'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#656565',
              fontWeight: 'normal',
              fontSize: '12'
            }
          },
          data: names
        },
        series: [{
          name: '',
          type: 'bar',
          itemStyle: {
            normal: {
              show: true,
              color: function(params) {
                return Color[params.dataIndex]
              },
              barBorderRadius: 50,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: values
        }

        ]
      };
      var myChart = echarts.init(document.getElementById('hot-chart'));
      myChart.setOption(option);
    }

    $.get('/colleges/' + schoolId + '/student_hot_evaluations', function(data){
      $statisticBody.find('.hot-chart-loading').hide();
      if (data.names.length > 0) {
        $statisticBody.find('.hot-chart').css('height', '400px').css('width', '100%');
        initHotEvaluating(data.names.reverse(), data.values.reverse());
      } else {
        $statisticBody.find('.hot-chart-empty').show();
      }
    })
  }
});