import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import {Modal} from 'antd';
import axios from 'axios';
class Accountnewprofile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newAccountProfiletype:false
		}
	}
	componentDidMount() {

		axios.interceptors.response.use((response) => {
			if(response!=undefined)
				if (response&&response.data.status === 411) {
					document.title = "提示";
					this.setState({
						newAccountProfiletype:true,
						content:response.data.message,
						okText:"立即认证",
						cannelText:"稍后认证",
						okHref:`/account/certification`,
					})
				}
			return response;
		}, (error) => {

		});
	}

	gotoback=()=>{
			window.location.href="/";
			this.setState({
				newAccountProfiletype:false
			})
			}



	/**
	 content: '您需要去完成您的职业认证，才能使用此功能',
	 okText: '立即完成',
	 okHref: '/account/certification'
	 */
	render() {
		const { content, okText, okHref,cannelText} = this.state;
		return(
			<Modal
				keyboard={false}
				title="提示"
				visible={this.state.newAccountProfiletype}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
				<div className="task-popup-content">
					<p className="task-popup-text-center font-16"> {content}</p>
					<div className="clearfix mt30 edu-txt-center">
						<a  className="task-btn mr30" onClick={()=>this.gotoback()}>{cannelText}</a>
						<a className="task-btn task-btn-orange"  href={ okHref }> {okText}</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Accountnewprofile;