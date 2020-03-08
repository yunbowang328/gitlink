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
// 团队竞赛报名无报名子组件团队 在线竞赛 > 全国高校计算机大赛-项目挑战>

class PersonModaltion extends React.Component {
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
					height: "50px",
					backgroundPosition: "center",
					backgroundSize: "110% 100%",
					backgroundColor: "#E0E0E0",
				}}>
					<p className="borders"
						 style={{fontSize: "16px", color: "#05101A", textAlign: "center"}}>姓名</p>
					<p className="borders"
						 style={{fontSize: "16px", color: "#05101A", textAlign: "center"}}>角色</p>
					<p className="borders"
						 style={{fontSize: "16px", color: "#05101A", textAlign: "center"}}>单位</p>
					<p className="borders"
						 style={{fontSize: "16px", color: "#05101A", textAlign: "center"}}>其他</p>
					<p className="borders"
						 style={{fontSize: "16px", color: "#05101A", textAlign: "center"}}>操作</p>
				</div>
			</div>
		)
	}

}

export default PersonModaltion;
