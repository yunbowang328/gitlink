import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';
import axios from 'axios';
import  './LoginDialog.css'
import {setmiyah} from 'educoder'
import {Tabs, Input, Checkbox, Button, notification, Menu} from 'antd';


//试用申请
class Trialapplication extends Component {
	// isRender控制弹出窗口显示
	constructor(props) {
		super(props)
		this.state = {
			props: props,
			login: "",
			Phonenumberisnotcocodes: undefined,
			codes: "",
			reason: "",
			Phonenumberisnotcoreason: undefined,
			isRenders: false,
			seconds: 60,
			getverificationcodes: true,
			Phonenumberisnotco: undefined,
			Phonenumberisnotcobool: false,
			readonlyInput: true,
			user_phone_binded: props.user_phone_binded,
			showTrial: false,
			user: undefined,
			borredss:"bor-reds",
			borredssz:"bor-reds fl mr5",
		}
		//user_phone_binded  判断是否手机号验证
		// console.log("Trialapplication");
		// console.log(props);
	}

	Cancel = () => {
		this.props.Cancel()
	}

	componentWillReceiveProps(nextProps) {
		// console.log("46");
		// console.log(nextProps);
		// console.log(this.props);
		if (nextProps.user != this.props.user) {
			// console.log("50");
			// console.log(nextProps.user);
			if (nextProps.user !== undefined) {
				// console.log("53");
				// console.log(nextProps.user);
				this.setState({
					user_phone_binded: nextProps.user.user_phone_binded,
				})
			}


		}


	}


	//初始化数据
	componentDidMount() {
		// console.log("53");
		//
		// console.log(this.props.isRenders);

		if (this.props.isRenders != undefined) {
			this.setState({
				isRenders: this.props.isRenders
			})
		}
		if (this.props.showTrial != undefined) {
			// 判断是否返回主页的参数
			this.setState({
				showTrial: this.props.showTrial
			})

		}
		axios.interceptors.response.use((response) => {
			if (response != undefined)
				if (response && response.data.status === 407) {
					this.setState({
						isRenders: true
					})
				}
			return response;
		}, (error) => {
			//TODO 这里如果样式变了会出现css不加载的情况

		});

	}

	//获取登入
	loginInputonChange = (e) => {
		// console.log(e.target.value);
		this.setState({
			login: e.target.value,
		})


	}
	//获取申请理由
	loginInputonChanges = (e) => {
		// console.log(e.target.value);
		this.setState({
			reason: e.target.value,
			Phonenumberisnotcoreason: undefined,
		})


	}
	//获取code
	codesonChange = (e) => {
		this.setState({
			codes: e.target.value,
			Phonenumberisnotcocodes: undefined,
		})
	}

	openNotification = (messge) => {
		notification.open({
			message: "提示",
			description:
			messge,
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	};
	//倒计时
	getverificationcode = () => {
		if (this.state.Phonenumberisnotcobool === false) {
			if (this.state.login.length === 0) {
				this.setState({
					Phonenumberisnotco: "请输入正确的手机号或邮箱",
				})
				return
			} else {
				this.setState({
					Phonenumberisnotco: "请输入正确的手机号或邮箱",
				})
			}
			return;
		}
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
							seconds: 60,
						})
					}
				});
			}, 1000)
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
							seconds: 60,

						})
					}
				});
			}, 1000)
			this.SMSverification();
		}
	}

	//短信验证
	SMSverification = () => {
		let logins=this.state.login;
		var url = `/accounts/get_verification_code.json`;
		axios.get((url), {
			params: {
				login: this.state.login,
				type: 3,
				smscode:setmiyah(logins)
			}
		}).then((result) => {
			//验证有问题{"status":1,"message":"success"}
			// console.log(result);
			if(result.data.status===1){
				this.props.showNotification("验证码已发送，请注意查收");
			}else if(result.data.status===-2){
				this.props.showNotification(result.data.message);
			}

		}).catch((error) => {
			console.log(error);

		})
	}

	handleDialogClose() {
		if (this.state.showTrial === false) {
			this.setState({
				isRenders: false
			})
			this.handleDialogClose()
			window.location.href = "/";
		} else {
			this.setState({
				isRenders: false
			})
			this.handleDialogClose()
		}

	}

	postregistered = () => {
		//提交按钮
		if (this.state.user_phone_binded === false) {

			if (this.state.Phonenumberisnotcobool === false) {
				var iphones = "";
				if (this.state.Phonenumberisnotco === undefined || this.state.Phonenumberisnotco === null || this.state.Phonenumberisnotco === "") {
					iphones = "请输入手机号";
				} else {
					iphones = this.state.Phonenumberisnotco;
				}

				this.setState({
					Phonenumberisnotco: iphones,
				})

				return;
			}
			if (this.state.codes.length === 0) {
				this.setState({
					Phonenumberisnotcocodes: "请输入验证码",
				})
				return;
			}

		}

		if (this.state.reason.length === 0) {
			this.setState({
				Phonenumberisnotcoreason: "请输入推荐人信息或申请理由",
			})
			return;
		}

		var thiss = this;
		var url = "/users/trial_apply.json";
		axios.post(url, {
			phone: this.state.login,
			code: this.state.codes,
			reason: this.state.reason,
		}).then((result) => {
			// console.log(result);
				// this.onTabChange("1");
			if(result !== undefined){
				// this.props.showNotification(`试用申请已提交，我们将尽快完成审核`);
				if (this.state.showTrial === false) {
					window.location.href = "/";
					this.setState({
						isRenders: false
					})
					this.handleDialogClose()
				} else {
					this.setState({
						isRenders: false
					})
					this.handleDialogClose()
				}
			}
		}).catch((error) => {

		})


	}
	inputOnBlur = (e) => {
		this.isCorrectname(e.target.value);
		// this.Emailphonenumberverification(e.target.value, id);
	}
	isCorrectname = (value) => {
		console.log(value.length);
		if (value.length === 0) {
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: false,
			})
			return;
		}
		// var telephone = $("#telephoneAdd.tianjia_phone").val();
		var regph = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		// var email = $("#add_email.tianjia_email").val();
		var regemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

		// [1]手机号开头必须是1    [3,4,5,6,7,8] 第二位是3-8中的一个 [0-9]{9} 后边9位可以是0-9的任意数字。
		var stringdata = undefined;
		if (!regph.test(value)) {
			stringdata = "手机号格式不正确";
			this.setState({
				Phonenumberisnotco: stringdata,
				Phonenumberisnotcobool: false,
			})
		} else {
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: true,
			})
			return
		}

		if (!regemail.test(value)) {
			if ((value.indexOf("@") != -1) === true) {
				stringdata = "邮箱格式不正确";
			} else {
				stringdata = "手机号格式不正确";

			}
			this.setState({
				Phonenumberisnotco: stringdata,
				Phonenumberisnotcobool: false,
			})

			// this.Emailphonenumberverification(value)
			return
		} else {
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: true,
			})
			return
		}
	}
	//邮箱手机号验证
	Emailphonenumberverification = (value) => {
		var url = `/accounts/valid_email_and_phone.json`;
		axios.get((url), {
			params: {
				login: value,
				type: 2,
			}
		}).then((result) => {
			//验证有问题{"status":1,"message":"success"}
			// console.log(result);


		}).catch((error) => {
			console.log(error);
			// this.setState({
			//     login:"",
			//     logins:"",
			// })
		})
	}

	//执行view
	render() {
		let {login, codes, reason, isRenders, user_phone_binded,borredss,borredssz, Phonenumberisnotco, getverificationcodes, Phonenumberisnotcocodes, Phonenumberisnotcoreason, seconds} = this.state;
		// console.log("Trialapplication22222222");
		// console.log(this.props);

		return (
			<div style={{ariaHidden:"true",dataBackdrop:"static"}}>
				{
					isRenders === false ? "" :

						<div style={{"border-radius": "10px"}}>
							<style>
								{
									`
												.dialogBox2{
														height: 420px;
												}
												#DialogIDysl{
														/*z-index: 20000; 影响notification*/
												}
												#DialogIDysl .dialogBox {
														width: 560px;
												}
												.MuiPaper-elevation24-45{
														box-shadow:none !important;
												}
												.MuiPaper-root-19{
														/* background:none !important; */
												}
												.MuiDialog-paper-9{
														overflow-y:hidden !important;
												}
												#log_reg_content{
														top: 0px !important;
												}
												#log_reg_content{
														width:405px !important;
														border-radius:40px !important;
														box-shadow:4px 8px 12px rgba(76,76,76,0.3);
												}
												.log_nav li{
														height:17px;
														font-size:18px;
														font-family:NotoSansHans-Regular;
														color:rgba(25,0,0,1);
														line-height: 0px;
												}
												.vertical-line{
														margin-left:10px;
														margin-right:10px;
												}
												#DialogIDysl div  {
														overflow-y:visible !important;
														box-shadow:none !important;
														border-radius:10px !important;
												}
												#wrapper{
														position: relative;
														top: 3px;
														left: 0px;
														margin-bottom: 17px;
												}
												
												.slidetounlock{
														font-size: 12px;
														background:-webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
														-webkit-background-clip:text;
														-webkit-text-fill-color:transparent;
														-webkit-animation:slidetounlock 3s infinite;
														-webkit-text-size-adjust:none
												}
												@-webkit-keyframes slidetounlock{0%{background-position:-200px 0} 100%{background-position:200px 0}}
												
												.handler_bg{ background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;}
												.handler_ok_bg{ background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;}
												
												#drag{
														position: relative;
														background-color: #e8e8e8;
														width: 340px;
														height: 34px;
														line-height: 34px;
														text-align: center;
												}
												#drag .handler{
														position: absolute;
														top: 0px;
														left: 0px;
														width: 40px;
														height: 32px;
														/*border: 1px solid #ccc;*/
														cursor: move;
												}
												
												#drag .drag_bg{
														background-color: #7ac23c;
														height: 34px;
														width: 0px;
												}
												#drag .drag_text{
														position: absolute;
														top: 0px;
														width: 340px;
														color:#9c9c9c;
														-moz-user-select: none;
														-webkit-user-select: none;
														user-select: none;
														-o-user-select:none;
														-ms-user-select:none;
														font-size: 12px;
												}
												#drag{
														overflow: hidden !important;
												}
												
												
												
												#closeIcon{
														position: absolute;
														top: -30px;
														right: -27px;
														z-index: 100000;
												}
												
												.bluebutton{
														width: 100%;
														text-align: center;
														color: #FFFFff!important;
														display: block;
														background: #cbcbcb;
														height: 45px;
														line-height: 45px;
														border-radius: 4px;
														letter-spacing: 2px;
														cursor: pointer;
												}
												.ant-input {
														font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
														-webkit-box-sizing: border-box;
														box-sizing: border-box;
														margin: 0;
														padding: 0;
														list-style: none;
														position: relative;
														display: inline-block;
														padding: 4px 11px;
														width: 100%;
														height: 38px;
														font-size: 14px;
														line-height: 1.5;
														color: rgba(0, 0, 0, 0.65);
														background-color: #fff;
														background-image: none;
														border: 1px solid #d9d9d9;
														border-radius: 4px;
														-webkit-transition: all .3s;
														-o-transition: all .3s;
														transition: all .3s;
												}
                        `
								}
							</style>
							<Input type="text" name="username" value={"namename"}
										 style={{height: '0', width: '0', border: 'none', display: "none"}}/>
							<Input type="password" name="password" id="password" value={"123123123"}
										 style={{height: '0', width: '0', border: 'none', display: "none"}}/>

							<Dialog open={true} id="DialogIDysl"
											disableEscapeKeyDown={true}
											style={{display: isRenders == false ? 'none' : '', "border-radius": "10px"}}
							>
								<div id="closeIcon" onClick={() => {
									this.handleDialogClose()
								}}>
									<i className="iconfont icon-shanchudiao"></i>
								</div>
								<div className={"login_register_content"} style={{"border-radius": "10px", "width": "560px"}}>

									<div className={"login_register_content"} style={
										user_phone_binded === true ?
											{
												"width": "560px", "height": "295px",
												"border-radius": "15px",
												"background": " #FFFFff",
												"text-align": "center",
												// "position": "absolute",
												"left": " 0px",
												"box-sizing": "border-box",
												"padding": "10px",
											}
											:
											{
												"width": "560px", "height": "410px",
												"border-radius": "10px",
												"background": " #FFFFff",
												"text-align": "center",
												// "position": "absolute",
												"left": " 0px",
												"box-sizing": "border-box",
												"padding": "10px",
											}
									}
									>
										<ul style={{"margin-top": "10px","margin-bottom": "10px"}}>
                                <span style={{
																	"text-align": "center!important",
																	"color": "#05101A",
																	"font-weight": "bold",
																	"font-size": "17px",
																}}>试用申请</span>
										</ul>

										<div className="log_nav" style={{"width": "100%", "margin-top": "10px"}}></div>
										<div style={{"margin-top": "20px"}}>
											<span style={{"color": "#4D4D4D"}}> 您尚未获得访问权限，请如实填写下述信息</span>
										</div>
										<div>
											<span style={{"color": "#4D4D4D"}}>管理员审核批准后，即可继续访问网站</span>
										</div>

										{
											user_phone_binded === true ? "" :
												<div style={{
													"margin-top": "20px", "padding-left": "50px",
													"padding-right": "50px"
												}}>
													<Input placeholder="请输入手机号码" value={login}
																 onChange={this.loginInputonChange}
																 onBlur={(e) => this.inputOnBlur(e)}
																 style={{"height": "38px",}}
																 className={Phonenumberisnotco && Phonenumberisnotco !== ""?borredss:""}
																 name="myiphone"
													></Input>
													{
														Phonenumberisnotco && Phonenumberisnotco != "" ?
															<p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px",textAlign:"left"}}>
																<span >{Phonenumberisnotco}</span>
															</p>
															: <div style={{height: "20px"}}></div>
													}
												</div>
										}


										{
											user_phone_binded === true ? "" :
												<div style={{"display": "flex", "justify-content": "center"}}>

													<Input
																 className={Phonenumberisnotcocodes && Phonenumberisnotcocodes !== ""?borredssz:"fl mr5"}
																 name="codes" type="text" autoComplete="off"
																 readonly
																 onfocus="this.removeAttribute('readonly')" style={{
														"width": "316px",
														"height": "38px",
													}} placeholder="请输入验证码"
																 onChange={this.codesonChange}
																 value={codes}>
													</Input>

													{
														getverificationcodes === undefined ?
															<Button className="fl ml5 " disabled style={{
																"background": "#4cacff!important",
																"width": "120px",
																"text-align": "center",
																"height": "38px",
															}}
																			size={"large"}>重新发送{seconds}s</Button>
															: getverificationcodes === true ?
															<Button className="fl ml5 " style={{
																"background": "#4cacff!important",
																"width": "120px",
																"text-align": "center",
																"height": "38px",
															}} type="primary"
																			onClick={() => this.getverificationcode()}
																			size={"large"}>获取验证码</Button>
															:
															<Button className="fl ml5 " style={{
																"background": "#4cacff!important",
																"width": "120px",
																"text-align": "center",
																"height": "38px",
															}} type="primary"
																			onClick={() => this.getverificationcode()}
																			size={"large"}>重新发送</Button>
													}
												</div>
										}


										{
											Phonenumberisnotcocodes && Phonenumberisnotcocodes != "" ?
												<p className="color-red " style={{width: " 100%", height: "20px",textAlign:"left"}}>
													<span >{Phonenumberisnotcocodes}</span>
												</p>
												: <div  style={{height: "20px"}}></div>
										}
										<div style={{
											"padding-left": "50px",
											"padding-right": "50px"
										}}>
											<Input placeholder="请在此输入推荐人信息或申请理由" value={reason}
														 onChange={this.loginInputonChanges}
														 className={Phonenumberisnotcoreason && Phonenumberisnotcoreason !== ""?borredss:""}
														 style={{"height": "38px",}}
														 name="mynames"></Input>
											{
												Phonenumberisnotcoreason && Phonenumberisnotcoreason !== "" ?
													<p className="color-red" style={{width: " 100%", height: "20px",textAlign:"left"}}>
														<span >{Phonenumberisnotcoreason}</span>
													</p>
													: <div style={{height: "20px"}}></div>
											}
										</div>

										<Button type="primary" onClick={() => this.postregistered()}
														style={{
															"background": "#4cacff!important",
															"width": "120px",
															"text-align": "center",
															"height": "38px",
															marginTop: "10px",
														}}
														size={"large"}>提交申请</Button>


									</div>


								</div>

							</Dialog>
						</div>

				}
			</div>


		)


	}


}

export default Trialapplication;
