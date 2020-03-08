import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import {Modal} from 'antd';
import axios from 'axios';
class AccountPhoneemail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			AccountPhoneemailtype:false
		}
	}
	componentDidMount() {
		if(this.props.AccountPhoneemailtype!=undefined){
			this.setState({
				AccountPhoneemailtype:this.props.AccountPhoneemailtype
			})
		}

		axios.interceptors.response.use((response) => {
			if (response != undefined)
				if (response && response.data.status === 402) {
					this.setState({
						AccountPhoneemailtype: true
					})

				}
			return response;
		}, (error) => {

		});

	}

	gotoback=()=>{
		if(this.props.AccountPhoneemailtype!=undefined){
			this.setState({
				AccountPhoneemailtype:false
			})
			this.props.hideAccountProfile()
		}else{
			window.location.href="/";
			this.setState({
				AccountPhoneemailtype:false
			})
		}
	}


	/**
	 content: '您需要去完成您的职业认证，才能使用此功能',
	 okText: '立即完成',
	 okHref: '/account/certification'
	 */
	render() {
		const { content, okText, okHref } = this.props;
		return(
			<Modal
				keyboard={false}
				title="提示"
				visible={this.state.AccountPhoneemailtype}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
				<div className="task-popup-content">
					<p className="task-popup-text-center font-16"> 您需要完成手机号码或者邮箱的绑定，才能使用此功能</p>
					<div className="clearfix mt30 edu-txt-center">
						<a  className="task-btn mr30" onClick={()=>this.gotoback()}>稍后绑定</a>
						<a className="task-btn task-btn-orange"  href={ "/account/secure" }> {'立即绑定'}</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default AccountPhoneemail;