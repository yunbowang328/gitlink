import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './common.css'
//立即申请试用
class MyEduCoderModal extends Component {

	constructor(props) {
		super(props);
    this.state={

		}
	}

	modalCancel=()=>{
	 	window.location.href = "/"
	}

	setDownload=()=>{
    //立即联系
		this.props.setNotcompleteds()
	}


	render() {

		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title="提示"
				centered={true}
				visible={this.props.modalsType===undefined?false:this.props.modalsType}
				width="530px"
			>
				<div className="educouddiv">
					<div className={"tabeltext-alignleft mt10"}><p>欢迎使用EduCoder，您可以试用1天</p></div>
					<div className={"tabeltext-alignleft mt10"}><p>超过期限，需要经过管理员的授权审核</p></div>
					<div className="clearfix mt30 edu-txt-center">
						{/*<a className="task-btn mr30" onClick={()=>this.modalCancel()}>先试试看</a>*/}
						{/*<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>立即申请授权</a>*/}
						<a className="task-btn task-btn-orange bth100" onClick={()=>this.modalCancel()}>知道啦</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default MyEduCoderModal;