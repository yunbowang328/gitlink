import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import competition from './comcss/competition.css';
import {Checkbox, Table, Pagination, Menu, Icon} from "antd";
import {getImageUrl} from 'educoder';
// 团队竞赛报名无报名子组件团队 在线竞赛 > 全国高校计算机大赛-项目挑战>
class RegisListview extends React.Component {
	constructor(props) {
		super(props)

	}


	render() {
		return (
			<div className="reglistviewdivs">
				<div className="reglistviewdivss " style={{
					width: "100%",
					display: "flex",
					justifyContent: " space-around",
					alignItems: "center",
					background: `url(${getImageUrl(`images/educoder/competitions/Rectanglex.png`)})`,
					height: "50px",
					backgroundPosition: "center",
					backgroundSize: "110% 100%",
				}}>
					<p className=" "
						 style={{fontSize: "16px", color: "#05101A", width: "79px", textAlign: "center"}}>创建者</p>
					<p className=" "
						 style={{fontSize: "16px", color: "#05101A", width: "160px", textAlign: "center"}}>战队名称</p>
					<p className=" "
						 style={{fontSize: "16px", color: "#05101A", width: "487px", textAlign: "center"}}>战队成员</p>
					<p className=" "
						 style={{fontSize: "16px", color: "#05101A", width: "134px", textAlign: "center"}}>学校</p>
					<p className=" "
						 style={{fontSize: "16px", color: "#05101A", width: "151px", textAlign: "center"}}>时间</p>
				</div>
			</div>
		)
	}

}

export default RegisListview;
