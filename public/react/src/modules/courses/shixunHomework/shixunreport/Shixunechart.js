import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
const echarts = require('echarts');



function startechart(data){
	var effChart =  echarts.init(document.getElementById('shixun_skill_chart'));

	var option = {
		title: {
			text: '工作效率',
			subtext: '工作效率=log(实训总得分/实训总耗时)'
		},
		grid:{
			left: '3%',
			right: '9%',
			bottom: '3%',
			containLabel: true
		},
		tooltip: {
			// trigger: 'axis',
			showDelay : 0,
			formatter : function (params) {

				if(params.name === data.username){
					return  "姓名："+data.username + "<br/>"+'学号： '+data.user_id + "<br/>"+'效率：'+ data.echart_data.myself_eff[1];
				}else if (params.value.length > 1) {
					/*                    return  '学生ID: ' + params.value[2] + '<br/>'
																			+ '效率: ' + params.value[1];*/
				}
				else {
					return  params.name + ":" + params.value +" ";
				}
			},

			axisPointer:{
				show: true,
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
		},
		xAxis:  [
			{
				type : 'value',
				name: '学生效率',
				nameTextStyle: {
					color: '#000',
					fontSize: 12
				},
				scale:true,
				axisLabel : {
					formatter: ' ',
				},
				axisTick:{
					show:false
				},
				splitLine: {
					show: false
				}
			}
		],
		yAxis:  [
			{
				type : "value",
				name : " ",
				nameGap: 20,
				nameTextStyle: {
					color: '#000',
					fontSize:12
				},
				scale:true,
				axisLabel : {
					formatter:  '{value}'
				},
				splitLine: {
					show: false
				}
			}
		],
		series: [
			{
				name:'',
				type:'scatter',
				data: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.efficiency_list,
				itemStyle:{
					normal:{color:'#2e65ad'}
				},
				markArea: {
					silent: true,
					itemStyle: {
						normal: {
							color: 'transparent',
							borderWidth: 1,
							borderType: 'dashed'
						}
					},
					data: [[{
						name: '工作效率分布区间',
						xAxis: 'min',
						yAxis: 'min'
					}, {
						xAxis: 'max',
						yAxis: 'max'
					}]]
				},
				markPoint : {
					data : [
						{
							name: data===undefined?"":data.username,
							xAxis: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_eff[0],
							yAxis: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_eff[1],
							value: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_eff[1],
						}
					],
					itemStyle: {
						normal:{
							color:'#c23531'
						}
					}
				},
				markLine : {
					lineStyle: {
						normal: {
							type: 'solid',
							color:'#c23531'
						}
					},
					data : [
						{type : 'average', name: '中位值'}
					]
				}
			},
			// {
			// 	name:'二班',
			// 	type:'scatter',
			// 	data: data.echart_data===undefined?"":data.echart_data.myself_eff,
			// 	itemStyle:{
			// 		color:'#c23531'
			// 	}}
		]};
	effChart.setOption(option);


	var ablChart = echarts.init(document.getElementById('shixun_overall_ablility_chart'));
	var dataBJ = data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.consume_list;


	var itemStyle = {
		normal: {
			opacity: 0.8,
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: 'rgba(0, 0, 0, 0)',
			color:'#2e65ad'
		}
	};
	var itemStyle1 = {
		normal: {
			opacity: 0.8,
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: 'rgba(0, 0, 0, 0)',
			color:'#c23531'
		}
	};


	var option1 = {
		title: {
			text: '能力值',
			subtext: '能力值（实训获得经验值/实训评测次数）'
		},
		backgroundColor: '#fff',
		color: [
			'#dd4444', '#fec42c', '#80F1BE'
		],
		grid: {
			x: '10%',
			x2: 150,
			y: '18%',
			y2: '10%'
		},
		tooltip: {
			padding: 10,
			backgroundColor: '#222',
			borderColor: '#777',
			borderWidth: 1,
			formatter: function (obj) {
				var value = obj.value;
				if(obj.name ===data.username){
					return "姓名：" + data.username + "<br/>" + '学号： ' + data.user_id + "<br/>" + '得分：' + data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_object[1];
				}

			}
		},
		xAxis: {
			type: 'value',
			name: 'log(实训的总时间)',
			nameGap: 16,
			nameTextStyle: {
				color: '#000',
				fontSize: 14
			},
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#000'
				}
			}
		},
		yAxis: {
			type: 'value',
			name: "    ",
			nameLocation: 'end',
			nameGap: 20,
			nameTextStyle: {
				color: '#000',
				fontSize:12
			},
			axisLine: {
				lineStyle: {
					color: '#000'
				}
			},
			splitLine: {
				show: false
			}
		},
		series: [
			{
				name: '能力',
				type: 'scatter',
				itemStyle: itemStyle,
				data: dataBJ,
				symbolSize: function (value){
					return Math.round(value[2]);
				},
				markPoint : {
					data : [
						{
							name: data===undefined?"":data.username,
							xAxis: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_object[0],
							yAxis: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_object[1],
							value: data.echart_data === undefined || data.echart_data === null ? "" : data.echart_data.myself_object[1]
						}
					],
					itemStyle: {
						normal:{
							color:'#c23531'
						}
					}
				}
			},
			// {
			// 	name: '能力1',
			// 	type: 'scatter',
			// 	data: data.echart_data===undefined?"":data.echart_data.myself_object,
			// 	itemStyle:itemStyle1,
			// 	symbolSize: function (val){
			// 		return Math.round(val[2]);
			// 	}
			// }
		]
	};
	// 使用刚指定的配置项和数据显示图表。
	ablChart.setOption(option1);



}
class Shixunechart extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		startechart(this.props.data)
	}


	componentDidUpdate = (prevProps) => {
		if (prevProps.data!= this.props.data) {
			startechart(this.props.data)
		}
	}


	render() {
		let {data}=this.props;

		return (
			<div>
				<div className={"fl with60 ml50"}>

					<div className="fl"
					     style={{ width:'750px',height:'580px'}}
					     id="shixun_skill_chart">
					</div>
					<div className="fl"
					     style={{ width:'750px',height:'580px'}}
					     id="shixun_overall_ablility_chart">
					</div>

				</div>


				<style>
					{`
					// .popup_tip_box {
					// 	    position: absolute;
					// 	    padding: 5px 15px;
					// 	    display: inline-block;
					// 	    white-space: nowrap;
					// 	    background-color: #fdfbeb;
					// 	    border: 1px solid #F3DDB3;
					// 	    color: #888;
					// 	    font-size: 12px;
					// 	}
						// .popup_tip_box span {
            //     display: block;
						//     border-width: 9px;
						//     position: absolute;
						//     top: 5px;
						//     left: -17px;
						//     border-style: dashed solid dashed dashed;
						//     border-color: transparent #FFFEF4 transparent transparent;
						//     font-size: 0;
						//     line-height: 0;
						// }
						// .popup_tip_box em {
						//     display: block;
						//     border-width: 9px;
						//     position: absolute;
						//     top: 5px;
						//     left: -18px;
						//     border-style: dashed solid dashed dashed;
						//     border-color: transparent #F3DDB3 transparent transparent;
						//     font-size: 0;
						//     line-height: 0;
						// }
						.colorE6F3FF{
								background:#E6F3FF;
						}
						.with24{
						    width: 25%;
						    box-sizing: border-box;
						}
						.pd10{
						 padding-left:10px;
						}
					`}
				</style>

				<div className="fl ml50">
					<div className="bor-grey-e bor-radius4 clearfix mt100 colorE6F3FF pd10">
						<div className="fl with25 colorE6F3FF" style={{textAlign:"right",paddingRight:"5%"}}>
							<li className="mt5 mb5 color-grey-9">姓名</li>
							<li className="mt5 mb5 color-grey-9">学号</li>
							<li className="mt5 mb5 color-grey-9">工作效率</li>
							<li className="mt5 mb5 color-grey-9">当前排名</li>
						</div>
						<div className="fl with65" style={{paddingLeft: "5%"}}>
							<li className="mt5 mb5">{data&&data.username}</li>
							<li className="mt5 mb5">{data===undefined?"--":data.student_id===undefined?"--":data.student_id===null?"--":data.student_id}</li>
							<li className="mt5 mb5 color-orange03"><span
								className="color-orange03">{data && data.echart_data === undefined || data.echart_data === null ? "" : data && data.echart_data.myself_eff[1]}</span>
							</li>
							<li className="mt5 mb5 color-orange03"><span
								className="color-orange03">{data && data.echart_data === undefined || data.echart_data === null ? "" : data && data.echart_data.myself_eff[0]}</span>
							</li>
						</div>
					</div>
					<div className="pr mt20 with100">
						<div className="popup_tip_box fontGrey2 with100 disc"
						     style={{position: "relative", right: "0px"}}>
							<em></em>
							<span></span>
							<ol className={"color-grey-9"}>
								<li>1个小圆点代表1个学生的工作效率</li>
								<li>红色水滴表示当前学生的工作效率值</li>
								<li>小圆点越高，工作效率越高</li>
								<li>红色横向箭头：中位值，表示整个课堂学生表现的平均值</li>
							</ol>
						</div>
						<div style={{height: "350px"}}></div>
						<div className="bor-grey-e bor-radius4 clearfix  colorE6F3FF pd10">
							<div className="fl with25 colorE6F3FF" style={{textAlign:"right",paddingRight:"5%"}}>
								<li className="mt5 mb5 color-grey-9">姓名</li>
								<li className="mt5 mb5 color-grey-9">学号</li>
								<li className="mt5 mb5 color-grey-9">能力</li>
							</div>
							<div className="fl with65" style={{paddingLeft: "5%"}}>
								<li className="mt5 mb5">{data&&data.username}</li>
								<li className="mt5 mb5">{data===undefined?"--":data.student_id===undefined?"--":data.student_id===null?"--":data.student_id}</li>
								<li className="mt5 mb5 color-orange03"><span
									className="color-orange03">{data && data.echart_data === undefined || data.echart_data === null ? "" : data && data.echart_data.myself_object[1]}</span>
								</li>
							</div>
						</div>
						<div className="popup_tip_box fontGrey2 with100 disc mt20"
						     style={{position: "relative",right: "0px"}}>
							<em></em>
							<span></span>
							<ol className={"color-grey-9"}>
								<li>1个小圆点代表1个学生的能力值</li>
								<li>红色水滴表示当前学生的能力值</li>
								<li>小圆圈越大，评测次数越少</li>
							</ol>
						</div>
					</div>

				</div>

        <div className={"both"}></div>
			</div>

		)
	}
}

export default Shixunechart;
