import React,{ Component } from "react";
import {Pagination} from 'antd';
import axios from 'axios';


const $ = window.$;
const echarts = require('echarts');
function InitChapterUsageSituation(_data){
	var myChart = echarts.init(document.getElementById('chapterUsageSituation'));
	myChart.showLoading({
		text: "数据获取中",
		effect: 'whirling'
	})
  var Color = ['#49A9EE', '#FFD86E', '#98D87D', '#8996E6','#F3857B', '#B97BF3','#4DE8B4','#f76d0c','#510cf7','#def70c','#3bf70c','#0cf7e1'];

  var option = {
      title: {
        show:false
      },
      tooltip : {
        trigger: 'item',
        formatter: "{d}%"
      },
      legend: {
        //orient: 'vertical',
        // top: 'middle',
        bottom: 30,
        //left: 20,
        data:["第1章", "第2章", "第3章", "第4章", "第5章"],
        selectedMode:false
      },
      series : [{
        name: '使用情况',
        type: 'pie',
        radius : '50%',
        center: ['50%', '40%'],
        selectedMode: 'single',
        label: {
          normal: {
            // {abg|}
            // {a|{a}}\n
            formatter: ' {b|{b}} ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }

            }
          },
          
        },
        data: _data,
        // [{"value":19,"name":"\u7b2c1\u7ae0"},{"value":45,"name":"\u7b2c2\u7ae0"},{"value":16,"name":"\u7b2c3\u7ae0"},{"value":10,"name":"\u7b2c4\u7ae0"},{"value":10,"name":"\u7b2c5\u7ae0"}],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          normal:{
            show: true,
            color: function(params) {
              return Color[params.dataIndex]
            }
          }
        }
      }]
  };
  


	setTimeout(() => {
		myChart.setOption(option);
		myChart.hideLoading();
	}, 1000)
}
class FirstTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      page:1,
      total:undefined
    }
  }

  onChange=(pageNumber)=>{
    this.setState({
      page:pageNumber
    })
    this.getData(pageNumber);
  }

  getData=(page)=>{
    var pathId = this.props.match.params.pathId;

    const url = `/paths/${pathId}/statistics.json?page=`+page;
    axios.get(url, {
    		})
		  .then((response) => {
        // TODO 没用，404返回的error
          if (response.data.status == 404) {
            this.props.showSnackbar('未找到对应数据，请查看地址是否正确。')
            return
          }
			    this.setState({ ...response.data })
          const _data = response.data.stage_info.map( (item, index) => {
            return {
              value: item.value,
              name: item.stage_no
            }
          })
          InitChapterUsageSituation(_data);

          const { course_count, learn_count, school_total_count, subject_name, subject_id } = response.data
          this.props.initBannerData({
            course_count,
            learn_count,
            school_total_count,
            subject_name,
            subject_id
          })
          this.setState({
            total:response.data.school_total_count
          })
		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
  }

  componentDidMount(){
    let {page}=this.state;
    this.getData(page);
  }
  
  render(){
    const { schools, stage_info,page,total } = this.state;
    return(
      <div className="clearfix panelForm-1">
        <div className="with60 pr40 fl">
          <div className="static_shadow edu-back-white">
            <p className="padding30-20 clearfix"><span className="font-24 fl">课堂使用概况</span><span className="fr color-grey-9">共{total}条记录</span></p>
            <div className="minH-440">
              <table className="edu-pop-table head-color edu-txt-center bor-top-greyE" cellSpacing="0" cellPadding="0">
                <thead>
                <tr><th>序号</th>
                <th className="edu-txt-left" width="35%">所属院校</th>
                <th>课堂</th>
                <th>学生</th>
                <th>选用实训</th>
                </tr></thead>
                {/* 
                  course_count: 30
                  homework_count: 117
                  name: "国防科技大学"
                  student_count: 2700
                 */}
                <tbody>
                  {
                    schools && schools.map( (school, index) => {
                      return (
                      <tr>
                        <td>{ index + 1 }</td>
                        <td className="edu-txt-left task-hide" style={{"maxWidth":"238px"}}>{school.name}</td>
                        <td>{school.course_count}</td>
                        <td>{school.student_count}</td>
                        <td><span className="color-blue mr3">{school.homework_count}</span>次</td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="pt35 edu-txt-center" style={{"height":"102px"}}>
                  {
                    total > 10 &&
                    <Pagination showQuickJumper defaultCurrent={page} pageSize={10} total={total} onChange={this.onChange} />
                  }
            </div>
          </div>
        </div>
        <div className="with40 fl static_shadow edu-back-white">
          <p className="font-24 padding30-20">章节使用情况</p>
          <div id="chapterUsageSituation" style={{"width":"480px","height":"542px"}}></div>
        </div>
      </div>
    )
  }
}
export default FirstTab;