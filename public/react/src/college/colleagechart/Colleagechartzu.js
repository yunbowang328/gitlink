import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
const echarts = require('echarts');



function startechart(names, values){
	var effChart =  echarts.init(document.getElementById('shixun_skill_charts'));

	var Color = ['#962e66', '#623363', '#CCCCCC', '#9A9A9A', '#FF8080', '#FF80C2', '#B980FF', '#80B9FF', '#6FE9FF', '#4DE8B4', '#F8EF63', '#FFB967'];

	var option = {
		backgroundColor: '#fff',
		grid: {
			left: '3%',
			right: '8%',
			bottom: '15%',
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
	effChart.setOption(option);
}
class Colleagechartzu extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		startechart(this.props.data,this.props.datavule)
	}


	componentDidUpdate = (prevProps) => {
		if (prevProps.data!= this.props.data) {
			startechart(this.props.data,this.props.datavule)
		}
	}


	render() {
		let {data}=this.props;

		return (
			<div>

				<div
					style={{ width:'100%',height:'600px'}}
					id="shixun_skill_charts">
				</div>




			</div>

		)
	}
}

export default Colleagechartzu;
