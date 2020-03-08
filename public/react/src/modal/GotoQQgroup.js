import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import '../modules/user/account/common.css';
import './gotoqqgroup.css'
class GotoQQgroup extends Component {

	constructor(props) {
		super(props);
		this.state={

		}
	}

	modalCancel=()=>{
		try {
			this.props.setgoshowqqgtounp(false);
		}catch (e) {

		}
	}

	setDownload=()=>{
		//立即联系
		try {
			this.props.setgoshowqqgtounp(false);
		}catch (e) {

		}
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
				visible={this.props.goshowqqgtounp===undefined?false:this.props.goshowqqgtounp}
				width="530px"
			>
				<div className="educouddiv intermediatecenter verticallayout">
					<div className="tabeltext-alignleft mt10"><p>您可以在QQ服务群向管理员申请，获得继续操作的权限</p></div>
					<img  width={"200px"} className="mt10" src={getImageUrl("images/educoder/qqqun20191230.png")}/>

					<div className="tabeltext-alignleft mt10"><p>群号：612934990</p></div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30" onClick={()=>this.modalCancel()}>取消</a>
						<a className="task-btn task-btn-orange" target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=2f2043d88c1bd61d182b98bf1e061c6185e23055bec832c07d8148fe11c5a6cd">立即联系</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default GotoQQgroup;
