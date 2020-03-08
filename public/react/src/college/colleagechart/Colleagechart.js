import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
const echarts = require('echarts');



function startechart(data,datanane){
	var effChart =  echarts.init(document.getElementById('shixun_skill_chart'));

	var option = {

		tooltip : {
			trigger: 'item',
			formatter: "{d}% <br/>"
		},
		legend: {
			// orient: 'vertical',
			// top: 'middle',
			bottom: 50,
			left: 'center',
			data: datanane
		},
		series : [
			{
				type: 'pie',
				radius : '65%',
				center: ['50%', '35%'],
				selectedMode: 'single',
				data:data,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	effChart.setOption(option);
}
class Colleagechart extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		startechart(this.props.data,this.props.datanane)
	}


	componentDidUpdate = (prevProps) => {
		if (prevProps.data!= this.props.data) {
			startechart(this.props.data,this.props.datanane)
		}
	}


	render() {
		let {data}=this.props;

		return (
			<div>

					<div
							 style={{ width:'100%',height:'600px'}}
							 id="shixun_skill_chart">
					</div>




			</div>

		)
	}
}

export default Colleagechart;
