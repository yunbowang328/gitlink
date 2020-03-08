import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './common.css'
//密码已重置，请重新登录
class ReadPassword extends Component {

	constructor(props) {
		super(props);

	}


	setDownload=()=>{
		//立即联系
		window.location.href = "/login"
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
				<div className="educouddiv tabeltext-alignleft">
					<div className={"tabeltext-alignleft mb20"}><p>密码已重置，请重新登录</p></div>
					<a className="task-btn task-btn-orange bth100" onClick={()=>this.setDownload()}>知道啦</a>
				</div>
			</Modal>
		)
	}
}

export default ReadPassword;