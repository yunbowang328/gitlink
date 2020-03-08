import React,{ Component } from "react";
import axios from 'axios';

const $ = window.$
const echarts = require('echarts');
function InitCollegeStatistic(_data, myChart){
    var data = _data
    var _yData = data.map( item => {
        return item.name
    })
//   [{name: "湖南科技大学潇湘学院", 已通关: 0, 未通关: 4, sum: 4},{name: "长沙理工大学", 已通关: 0, 未通关: 7, sum: 7},{name: "安徽大学", 已通关: 1, 未通关: 8, sum: 9},{name: "湘潭大学兴湘学院", 已通关: 12, 未通关: 0, sum: 12},
//   {name: "湖南师范大学", 已通关: 10, 未通关: 2, sum: 12},{name: "湖南软件职业学院", 已通关: 11, 未通关: 1, sum: 12},{name: "湖南科技大学", 已通关: 91, 未通关: 34, sum: 125},{name: "湘潭大学", 已通关: 110, 未通关: 45, sum: 155},
//   {name: "湖南工业大学", 已通关: 133, 未通关: 41, sum: 174},{name: "国防科技大学", 已通关: 853, 未通关: 23, sum: 876}];
    // <% @schools.each do |s| %>
    //   data.push({name: "<%= s['name'] %>", '已通关': <%= s['pass_count'] %>, '未通关': <%= s['unpass_count'] %>});
    // <% end %>

    // =================右边要放的字段名及颜色===========
    var items = [{
        key: '学习人数', color: "#29BD8B"
    }, {
        key: '已通关', color: "#FF954C"
    }, {
        key: '未通关', color: "#CBCBCB"
    }]

    data.forEach((d) => {
        var sum = 0
        items.forEach((i) => {
        sum += (d[i.key] || 0)
    })
    d.sum = sum;
    })

    // =========================排序================
    data.sort((a, b) => a.sum - b.sum)

    var yData = _yData.reverse();
    // ["湖南科技大学潇湘学院", "长沙理工大学", "安徽大学", "湖南软件职业学院", "湖南师范大学", "湘潭大学兴湘学院", "湖南科技大学", "湘潭大学", "湖南工业大学", "国防科技大学"]

    var itemSeries = items.map((d, i) => {
    var values = data.map((p) => p[d.key])
    return {
        type: 'bar',
        name: d.key,
        data: values,
        stack: 'all',
        xAxisIndex: 1,
        yAxisIndex: 1,
        label: {
            normal: {
                color:'#FFF',
                // show: ( i == 1 ? true :false),
                show: true,
                position: 'inside'
            }
        },
        itemStyle: {
            normal: {
                color: d.color
            }
        }
    }
    })

    var option = {
        backgroundColor: '#fff', // 背景
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : ''
            }
        },
        legend: {
            data: ['学习人数','已通关','未通关'],
            textStyle: {
                color: '#05101A'
            },
            right:"20px",
            selectedMode:false
        },
        grid: [{
            right: '56%',
            top: '20',
            containLabel: true
        }, {
            left: '45%',
            width:'100%',
            top: '20',
            containLabel: true
        }],
        xAxis:  [{
            type: 'value',
            inverse: true,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            }
        }, {
            type: 'value',
            gridIndex: 1,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            data: yData,
            max:10,
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            }
        }, {
            type: 'category',
            data: yData,
            max:10,
            gridIndex: 1,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        series: [...itemSeries,
    {
        name: '总计',
        type: 'bar',
        data: data.map((d) => d.sum),
        xAxisIndex: 1,
        yAxisIndex: 1,
        barCategoryGap:'40%',
        stack: 'all',
        label: {
            normal: {
                show: true,
                position: 'inside',
                color: '#666'
            }
        },
        itemStyle: {
            normal: {
                color: '#fff'
            }
        }
    },
    // ===================左边===================
    {
        type: 'bar',
        data: data.map((d) => d.sum),
        barCategoryGap:'40%',
        label: {
            normal: {
                show: true,
                position: 'left',
                color: '#29BD8B'
            }
        },
        itemStyle: {
            normal: {
                color: '#29BD8B'
            }
        }
    }]
    }
    myChart.setOption(option);
}
class ThirdTab extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var pathId = this.props.match.params.pathId;
    
    var myChart = echarts.init(document.getElementById('collegeStatistic'));
    myChart.showLoading({
        text: "数据获取中",
        effect: 'whirling'
    })
    
    const url = `/paths/${pathId}/school_report.json`
    axios.get(url, {
    		})
		  .then((response) => {
            // TODO 没用，404返回的error
            if (response.data.status == 404) {
                this.props.showSnackbar('未找到对应数据，请查看地址是否正确。')
                return
            }
            this.setState({ ...response.data })
            // name: "湖南科技大学潇湘学院", 已通关: 0, 未通关: 4, sum: 4
            /** 
                "name": "国防科技大学",
                "student_count": 9269,
                "pass_count": 6061,
                "unpass_count": 3208
            */
            const _data = response.data.schools.map( (item, index) => {
                return {
                    name: item.name,
                    sum: item.student_count,
                    已通关: item.pass_count,
                    未通关: item.unpass_count,
                }
            })
            InitCollegeStatistic(_data, myChart);
            myChart.hideLoading()
        })
        .catch(function (error) {
            console.log(error);
        });
  }
  
  render(){
    return(
      <div className="clearfix mb30 static_shadow edu-back-white panelForm panelForm-3">
        <div className="font-24 padding30-20">院校学习情况</div>
        <div id="collegeStatistic" style={{"width":"1200px","height":"540px"}}></div>
      </div>
    )
  }
}
export default ThirdTab;