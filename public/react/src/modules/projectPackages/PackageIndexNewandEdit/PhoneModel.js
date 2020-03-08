import React, { Component } from 'react';
import { Spin, Icon , Modal,Input,Button} from 'antd';
class PhoneModel extends Component {
	//getverificationcodes 是否是重新发送或者是获取验证码
	//多少秒
	constructor(props) {
		super(props);
		this.state = {
			funmodalsType:false,
			istype:false,
			getverificationcodes:true,
			seconds:35,
		}
	}
	//获取验证码
	getverificationcode =()=>{
		// 	if (this.state.logins&&this.state.logins.length === 0) {
		// 判断没有输入手机号
		// 		return
		// 	}

		if (this.state.getverificationcodes === true) {
			this.setState({
				getverificationcodes: undefined,
			})
			let timer = setInterval(() => {
				this.setState((preState) => ({
					seconds: preState.seconds - 1,
				}), () => {
					if (this.state.seconds == 0) {
						clearInterval(timer);
						this.setState({
							getverificationcodes: false,
							seconds: 35,
						})
					}
				});
			}, 1000)
			//其他的网络请求也可以
			this.SMSverification();
		} else {
			this.setState({
				getverificationcodes: undefined,
			})
			let timer = setInterval(() => {
				this.setState((preState) => ({
					seconds: preState.seconds - 1,
				}), () => {
					if (this.state.seconds == 0) {
						clearInterval(timer);
						this.setState({
							getverificationcodes: false,
							seconds: 35,

						})
					}
				});
			}, 1000)
			//其他的网络请求也可以
			this.SMSverification();
		}
	}
	//短信验证
	SMSverification = () => {
		// var url = `/accounts/get_verification_code.json`;
		// axios.get((url), {
		// 	params: {
		// 		login: this.state.logins,
		// 		type: 1,
		// 	}
		// }).then((result) => {
		// 	//验证有问题{"status":1,"message":"success"}
		// 	// console.log(result);
		// 	this.openNotification("验证码已发送，请注意查收");
		//
		//
		// }).catch((error) => {
		// 	console.log(error);
		//
		// })
	}
	render() {
		let{getverificationcodes,seconds} =this.state;
		const antIcons = <Icon type="loading" style={{ fontSize: 24 }} spin />
		return(
			<Modal
				keyboard={false}
				title="修改手机号"
				visible={this.props.modalsType===undefined?false:this.props.modalsType}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16 mb20">
							<span className="shaiTitle mt5">手机号码：<span>
								<Input
									style={{ width: 337 }}
									placeholder="请输入手机号码" />
							</span></span>
						</p>
						<p className="task-popup-text-center font-16 mt5">

							<span className="shaiTitle mt5 ml17">
								验证码：
								<span>
									<Input
										style={{ width: 200 }}
										placeholder="请输入验证码" />
								</span>
								<span>
									  {
											getverificationcodes === undefined ?
												<Button type="primary"  className="defalutSubmitbtn ml10 defalutSubmitbtnmodels" 	 >重新发送 ({seconds}s)</Button>
											: getverificationcodes === true ?
												<Button type="primary" className="defalutSubmitbtn ml10 defalutSubmitbtnmodels" 	onClick={() => this.getverificationcode()} >获取验证码</Button>
												:
												<Button type="primary" className="defalutSubmitbtn ml10 defalutSubmitbtnmodels" 	onClick={() => this.getverificationcode()} >重新发送</Button>

										}
													{/*<Button type="primary" className="defalutSubmitbtn ml10 defalutSubmitbtnmodels">重新发送（）</Button>*/}
								</span>
							</span>

						</p>

						<div className="clearfix mt30 edu-txt-center">
							<a  className="task-btn mr30 color_white" onClick={this.props.modalCancel}>取消</a>
							<a className="task-btn task-btn-orange " onClick={this.props.modalSave}>确定</a>
						</div>

					</div>
			</Modal>
		)
	}
}

export default PhoneModel;