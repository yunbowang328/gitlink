import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import {Modal} from 'antd';
import axios from 'axios';
class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
			AccountProfiletype:false
    }
  }
	componentDidMount() {
		if(this.props.AccountProfiletype!=undefined){
			this.setState({
				AccountProfiletype:this.props.AccountProfiletype
			})
		}

		axios.interceptors.response.use((response) => {
			if (response != undefined)
				if (response && response.data.status === 402) {
					document.title = "提示";
					this.setState({
						AccountProfiletype: true
					})

				}
			return response;
		}, (error) => {

		});

	}

	gotoback=(type)=>{
  	if(type===true){
			window.location.href="/";
		}else{
			if(this.props.AccountProfiletype!=undefined){
				this.setState({
					AccountProfiletype:false
				})
				this.props.hideAccountProfile()
			}else{
				window.location.href="/";
				this.setState({
					AccountProfiletype:false
				})
			}
		}

	}


/**
content: '您需要去完成您的职业认证，才能使用此功能',
okText: '立即完成',
okHref: '/account/certification'
 */ 
render() {
	const { content, okText, okHref,cannelText,Accounturltype} = this.props;
    return(
         <Modal
         keyboard={false}
          title="提示"
          visible={this.state.AccountProfiletype}
          closable={false}
          footer={null}
          destroyOnClose={true}
          centered={true}
          width="530px"
        >
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16"> {content || '您需要去完善您的个人资料，才能使用此功能'}</p>
						<div className="clearfix mt30 edu-txt-center">
							<a  className="task-btn mr30" onClick={()=>this.gotoback(Accounturltype)}>{cannelText ||'稍后完善'}</a>
							<a className="task-btn task-btn-orange"  href={ okHref || "/account/profile/edit" }> {okText || '立即完善'}</a>
						</div>
					</div>
        </Modal>
    )
  }
}

export default AccountProfile;