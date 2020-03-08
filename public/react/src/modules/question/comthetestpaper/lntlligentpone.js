import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, getImageUrl, markdownToHTML} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Drawer,
	Input,
	Button,
	Breadcrumb,
	Icon,
	InputNumber,
	Tooltip
} from "antd";
import '../questioncss/questioncom.css';

//判断题
class lntlligentpone extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			countbool: false,
		}

	}

	//初始化
	componentDidMount() {


	}

	increase = () => {

		const datasbool=this.props.getdatas();
		// if(datasbool===undefined || datasbool===null){
		// 	if(this.props.mycount===0){
		// 		this.props.showNotification(`题数为0无法增加题目`);
		// 		return
		// 	}
		//
		// }

		const count = this.state.count + 1;
		if(count<=this.props.mycount){
			this.setState({count: count, countbool: false});
		}


	};

	decline = () => {
		const datasbool=this.props.getdatas();
		// if(datasbool===undefined || datasbool===null){
		// 	if(this.props.mycount===0){
		// 		this.props.showNotification(`题数为0无法减少题目`);
		// 		return
		// 	}
		// }

		let count = this.state.count - 1;
		if (count < 0) {
			count = 0;
		}
		this.setState({count: count, countbool: false});
	};
	inputsnumber = (value) => {
		const datasbool=this.props.getdatas();
		// if(datasbool===undefined || datasbool===null){
		// 	if(this.props.mycount===0){
		// 		this.setState({count: 0, countbool: false});
		// 		this.props.showNotification(`题数为0无法输入`);
		// 		return
		// 	}
		// }

		if(this.props.mycount===0){
			this.setState({count: 0, countbool: false});
		}else {
			this.setState({count: value, countbool: false});
		}


	}

	//返回数据
	mygetinputnumber=()=>{
		return this.state.count;
	}
	isNumber=(val)=>{
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if(regPos.test(val) && regNeg.test(val)){
			return true;
		}else{
			return false;
		}
	}

	render() {
		let {questions, totalscore, total, items} = this.state;
		return (
			<div>
				<p className="dxuantitie mt19">{this.props.dxtx}</p>
				{
					this.props.mycount===0?
						<div className="sortinxdirection mt10 inpustredssdiv">
							<Tooltip placement="top" title={"题数为0无法减少"}>
							<Button 	disabled={this.props.mycount===0?true:false} onClick={this.decline}>
								<Icon type="minus"/>
							</Button>
							</Tooltip>
							<div className={this.state.countbool === true ? "inpustredss ml12 mr12" : "ml12 mr12"}>

								<Tooltip placement="top" title={"题数为0无法输入"}>
									<InputNumber
										disabled={this.props.mycount===0?true:false}
										min={0}
										value={this.state.count}
										onChange={this.inputsnumber}
									></InputNumber>
								</Tooltip>

							</div>
							<Tooltip placement="top" title={"题数为0无法增加"}>
							<Button 	disabled={this.props.mycount===0?true:false} onClick={this.increase}>
								<Icon type="plus"/>
							</Button>
						</Tooltip>

							<p className={"ml23 lh32"}>共{this.props.mycount}道</p>
						</div>
						:

						<div className="sortinxdirection mt10 inpustredssdiv">
							<Button onClick={this.decline}>
								<Icon type="minus"/>
							</Button>
							<div className={this.state.countbool === true ? "inpustredss ml12 mr12" : "ml12 mr12"}>
									<InputNumber
										min={0}
										value={this.state.count}
										onChange={this.inputsnumber}
									></InputNumber>
							</div>
							<Button onClick={this.increase}>
								<Icon type="plus"/>
							</Button>
							<p className={"ml23 lh32"}>共{this.props.mycount}道</p>
						</div>

				}

			</div>
		)

	}


}

export default lntlligentpone


