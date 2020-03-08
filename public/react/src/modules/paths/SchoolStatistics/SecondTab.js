import React,{ Component } from "react";
import axios from 'axios';


const $ = window.$;
const echarts = require('echarts');
function InitShixunStudyStatistics(yAxisMonth_a, barData_a, mapByNumber, myChart){
  let yAxisMonth = yAxisMonth_a 
//   [
//       "1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "3-1",
//       "1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "3-1",
//       "1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "3-1", "3-2"];
  let barData = barData_a 
//   [
//       1164, 739, 784, 720, 726, 556, 381, 432,
//       1164, 739, 784, 720, 726, 556, 381, 432,
//       1164, 739, 784, 720, 726, 556, 381, 432, 239];

//   let yAxisMonth = yAxisMonth_a;
//   let barData = barData_a;

  let barDataTwo = [];
  let coordData2 = [];
  let coordData = [];
  for (let i = 0; i < barData.length; i++) {
      barDataTwo.push(Math.max.apply(Math, barData) + 5000);
      coordData.push({
          "coord": [Number(barData[i]) - 1, i]
      });
      coordData2.push({
          "coord": [Math.max.apply(Math, barData) + 5000, i]
      })
  }
  var option = {
      backgroundColor: "#fff",
      title: {
          text: ''
      },
      legend: null,
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'none'
          },
          formatter: function(params) {
              return params[0].name + ":" +  (mapByNumber[params[0].name] && mapByNumber[params[0].name].shixun_name) + "<br/>" + '学习人数: ' + params[0].value;
          }
      },
      grid: {
          containLabel: true,
          left: "30px",
          top: "0",
          bottom:"10px"
      },
      yAxis: [{
          data: yAxisMonth,
          inverse: true,
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              margin: 10,
              textStyle: {
                  fontSize: 12,
                  color: '#747A7F'
              },
              formatter: function(value) {
                  return '{Sunny|' + value + '}';
              },
              rich: {
                  value: {
                      lineHeight: 20
                  },
                  Sunny: {
                      height: 25,
                      padding: [0, 8, 0, 8],
                      align: 'center',
                      backgroundColor: '#fff'
                  }
              }
          }
      },{
          data: yAxisMonth,
          inverse: true,
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              show: false
          }
        }
      ],
      xAxis: [{
          type: "value",
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          }
      }, {
        type: "value",
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
      }],
      series: [{
          z: 10,
          xAxisIndex: 0,
          yAxisIndex: 0,
          name: '',
          type: 'pictorialBar',
          data: barData,
          barCategoryGap: '90%',
          label: {
              normal: {
                  show: true,
                  position: 'inside',
                  textStyle: {
                      fontSize: 12,
                      color: '#666'
                  }
              }
          },
          symbolRepeat: false,
          symbolSize: ['100%', 25],
          symbolOffset: [-16.5, 0],
          itemStyle: {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#FFD86E'
                  }], false),
                  borderRadius:'10'
              }
          },
          symbolClip: true,
          symbolPosition: 'end',
          symbol: 'rect'
      }]
  };
  myChart.setOption(option);
}
class SecondTab extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    var pathId = this.props.match.params.pathId;

		var myCharts = echarts.init(document.getElementById('showloding'));
		myCharts.showLoading({
			text: "数据获取中",
			effect: 'whirling'
		})
    const url = `/paths/${pathId}/shixun_report.json`
    axios.get(url, {
        })
        .then((response) => {
        // TODO 没用，404返回的error
        if (response.data.status == 404) {
            this.props.showSnackbar('未找到对应数据，请查看地址是否正确。')
            return
        }

        /** 
            let yAxisMonth = ["1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "3-1", "3-2"];
            let barData = [1164, 739, 784, 720, 726, 556, 381, 432, 239];

            {
                "number": "6-1",
                "shixun_name": "网页抓取及信息提取",
                "member_count": 0,
                "school_count": 0
            }
        */
        let yAxisMonth = []
        let barData = []
        let shixunList = []
        let mapByNumber = {}
        const _data = response.data.shixun_lists.forEach( (ar, index) => {
            ar.forEach( (item, itemIndex) => {
                shixunList.push(item)
                yAxisMonth.push(item.number)
                barData.push(item.member_count)
                mapByNumber[item.number] = item
            })
        })

			  this.setState({
					shixunList
			  })
					var myChart = echarts.init(document.getElementById('shixunStudyStatistics'));
					myChart.showLoading({
						text: "数据获取中",
						effect: 'whirling'
					})
				setTimeout(() => {
					InitShixunStudyStatistics(yAxisMonth, barData, mapByNumber, myChart);
					myCharts.hideLoading();
					myChart.hideLoading();
				}, 1000)
        
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  
  render(){
      const { shixunList } = this.state;
    return(
      <div className="clearfix panelForm-2">
        <div className="with60 pr40 fl">
          <div className="static_shadow edu-back-white">
            <div className="font-24 padding30-20">实训使用详情</div>
            <div className="minH-440" id="tableHeight">
              <table className="edu-pop-table head-color edu-txt-center bor-top-greyE" cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>章节</th>
                    <th className="edu-txt-left" width="40%">实训名称</th>
                    <th>学习人数</th>
                    <th>受用院校</th>
                  </tr>
                </thead>
                <tbody>
                    
                  {
                    shixunList && shixunList.map( (shixun, index) => {
                      return (
                        <tr>
                            <td>{shixun.number}</td>
                            <td className="edu-txt-left task-hide" style={{"maxWidth":"272px"}}>{shixun.shixun_name}</td>
                            <td>{shixun.member_count}</td>
                            <td className="color-blue">{shixun.school_count}</td>
                        </tr>)
                    })
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="with40 fl static_shadow edu-back-white">
					<style>
						{
							`
							 .padding23-20{
							     padding: 23px 20px;
							     box-sizing: border-box;
							 }
							`
						}
					</style>
          <div className="font-24 padding23-20">实训学习统计</div>
					{shixunList===undefined?<div id="showloding"
							 style={{"width":"480px","height":"440px"}}></div>:""}
					{shixunList===undefined?"":<div id="shixunStudyStatistics"
            style={{"width":"480px","minHeight":`${shixunList&&shixunList.length *50}px`}}></div>}
        </div>
      </div>
    )
  }
}
export default SecondTab;