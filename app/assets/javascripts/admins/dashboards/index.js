$(document).on('turbolinks:load', function() {
  if ($('body.admins-dashboards-index-page').length > 0) {
    // 月新增用户
    var monthChart = echarts.init(document.getElementById('month-active-user'));
    monthChart.setOption({
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
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: []
        }
      ]
    });
    monthChart.showLoading();
    $.get('/admins/dashboards/month_active_user.json').done(function(data){
      monthChart.setOption({
        series: [
          { data: data.data }
        ]
      });

      monthChart.hideLoading();
    });


    // 近七天评测次数
    // var evaluateChart = echarts.init(document.getElementById('evaluate-pie'));
    // evaluateChart.setOption({
    //   tooltip: {
    //     show: "true",
    //     trigger: 'item',
    //     formatter: '{c0}',
    //     backgroundColor: 'rgba(0,0,0,0.7)', // 背景
    //     padding: [8, 10], //内边距
    //     extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //       type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //     }
    //   },
    //   xAxis: { type: 'category', boundaryGap: false, data: [] },
    //   yAxis: { type: 'value' },
    //   series: [{ data: [], type: 'line', areaStyle: {} }]
    // });
    // evaluateChart.showLoading();
    // $.get('/admins/dashboards/evaluate.json').done(function(data){
    //   evaluateChart.setOption({
    //     xAxis: { data: data.names },
    //     series: [{ data: data.data }]
    //   });
    //
    //   evaluateChart.hideLoading();
    // });
  }
});