import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Radio,
	Checkbox,
	Form,
	Input,
	Select,
	Cascader,
	Col, Row, InputNumber, DatePicker, AutoComplete,Button,Tag
} from "antd";
import './../questioncss/questioncom.css';
import SingleEditor from './../component/SingleEditor';
class Choicequestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
			Knowpoints:[]
		}
	}
	//初始化
	componentDidMount(){

	}

	render() {
		let {page}=this.state;
		const { getFieldDecorator } = this.props.form;

		return (
			<div className=" clearfix  educontent Contentquestionbankstyle w100s w1200fpx mt19" >
				<SingleEditor>

				</SingleEditor>
			</div>
		)

	}



}
const Choicequestions = Form.create({ name: 'Choicequestions' })(Choicequestion);
export default Choicequestions;
