import React, { Component } from 'react';
import { Modal} from 'antd';
import axios from 'axios';
import '../../modules/user/common.css';
//完善个人资料
class Notcompleted extends Component {

	constructor(props) {
		super(props);

	}

	modalCancel=()=>{
	 window.location.href = "/";
	}

	setDownload=()=>{
		window.location.href ='/account/profile';
	}


	render() {
   console.log(this.props)
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
					<div className={"tabeltext-alignleft mt10"}><p>您尚未完善个人资料</p></div>
					<div className={"tabeltext-alignleft mt10"}><p>请在完成资料后，提交试用申请</p></div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30" onClick={()=>this.modalCancel()}>取消</a>
						<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>立即完善资料</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Notcompleted;