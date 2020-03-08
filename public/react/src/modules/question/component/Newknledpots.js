import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal,Input} from 'antd';
import axios from 'axios';
import './../questioncss/questioncom.css'
//立即申请试用
class PaperDeletModel extends Component {

	constructor(props) {
		super(props);
		this.state={
			newkntypeinput:""
		}
	}

	handleChange=(e)=>{

		// this.setState({
		// 				newkntypeinput:	e.target.value
		// 			})
		// //console.log(e.target.value);
		// //console.log(e.target.value.length);
						this.setState({
							newkntypeinput:	e.target.value
						})
		 this.props.setboolred(false);
		//
		// debugger
		// //console.log(e);
		//
		// if(e.target.value.length>0){
		// 	if(e.target.value.length>=16){
		// 		var result = e.target.value.substring(0,15);
		// 		this.setState({
		// 			newkntypeinput:	result
		// 		})
		// 	}
		// }
	}
	mysinputOnBlur=(e)=>{
		//console.log("失去焦点了");
	}

	inputOnFocus=(e)=>{
		//console.log("获取焦点");
	}

	render() {

		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title="新增知识点"
				centered={true}
				visible={this.props.NewknTypedel===undefined?false:this.props.NewknTypedel}
				width="442px"
			>
				<div className="educouddiv">
					<div className={this.props.boolred===true?"tabeltext-alignleft mt10 inpustred":"tabeltext-alignleft mt10"}>
						<Input onInput={this.handleChange}  maxLength={16} onBlur={this.mysinputOnBlur } onFocus={this.inputOnFocus }/>
					</div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 w80" onClick={()=>this.props.NewknTypedeldel(false)}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.NewknTypedeltyoedel(this.state.newkntypeinput)}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default PaperDeletModel;
