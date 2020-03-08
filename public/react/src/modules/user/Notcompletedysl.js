import React, { Component } from 'react';
import { Modal} from 'antd';
import axios from 'axios';
import '../../modules/user/common.css';
//完善个人资料
class Notcompletedysl extends Component {

	constructor(props) {
		super(props)
		this.state ={
			modalsType:false,
		}

	}
	componentDidMount() {
  // console.log("Notcompletedysl");
  // console.log("开发了402了");

		// axios.interceptors.response.use((response) => {
		// 	// console.log(response);
		// 	if (response != undefined)
		// 		if (response && response.data.status === 402) {
		// 			this.setState({
		// 				modalsType: true
		// 			})
		// 		}
		// 	return response;
		// }, (error) => {
		// 	//TODO 这里如果样式变了会出现css不加载的情况
		//
		// });

	}

	modalCancel=()=>{
		var weekArray = JSON.parse(window.sessionStorage.getItem('yslgeturls'));
		if(weekArray===undefined){
			weekArray="/";
		}
		if(weekArray===null){
			weekArray="/";
		}
		if(weekArray==="null"){
			weekArray="/";
		}
		window.location.href = weekArray;
	}

	setDownload=()=>{
		window.location.href ='/account/profile';
	}


	render() {
		// console.log(this.props)
		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title={this.props.registered===undefined?"提示":"注册成功"}
				centered={true}
				visible={this.props.modalsType}
				width="530px"
			>
				<div className="educouddiv">
					<div className={"tabeltext-alignleft"}><p style={{fontSize: "16px"}}>完善您的资料，将获得更多的使用权限</p></div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30" onClick={()=>this.modalCancel()}>稍后完善</a>
						<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>立即完善</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Notcompletedysl;