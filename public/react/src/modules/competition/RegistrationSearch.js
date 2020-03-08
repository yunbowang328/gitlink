import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import competition from './comcss/competition.css';
import {Checkbox, Input, Table, Pagination, Menu, Icon} from "antd";

const Search = Input.Search;

// 团队竞赛报名无报名子组件团队 在线竞赛 > 全国高校计算机大赛-项目挑战>
class RegistrationSearch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			keywords: ""
		}
	}

	setdatafunsval = (e) => {
		this.setState({
			keywords: e.target.value
		})

	};
	setdatafuns = (value) => {
		//console.log("setdatafuns点击了搜索");
		//console.log(value);
		this.setState({
			keywords: value
		})
		this.props.RegistrationSearchvalue(value);
	};

	myonPressEnter = (e) => {
		//console.log("点击了回车setdatafunsval点击了搜索");
		//console.log(e.target.value);
		this.props.RegistrationSearchvalue(e.target.value);
	}
	render() {
		return (
			<div className="searchhead">

				<Search
					className="packinputs"
					value={this.state.keywords}
					enterButton={<span>搜索</span>}
					onInput={(e) => this.setdatafunsval(e)}
					onSearch={(value) => this.setdatafuns(value)}
					onPressEnter={(e) => this.myonPressEnter(e)}
				/>

				<p style={{
					width: "583px",
					color: "#07140E",
					fontSize: '16px',
					marginTop: " 7px",
					marginLeft: "300px",
					textAlign: "right",
					lineHeight: " 24px"
				}}>战队总数：<span
					style={{color: "#459BE5", fontSize: "16px"}}>{this.props.count}</span><span
					style={{marginLeft: "5px", marginRight: "15px",}}>个</span> 参赛总人数：<span
					style={{color: "#459BE5"}}>{this.props.members_count}</span><span
					style={{marginLeft: "5px"}}>人</span></p>
			</div>
		)
	}

}

export default RegistrationSearch;
