import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import {setmiyah} from 'educoder';
import CheckInputysl1 from './CheckInputysl';
import CheckInputysl2 from './CheckInputysl';
import {Tabs, Input, Checkbox, Button, notification} from 'antd';


import ReadPassword from './ReadPassword';

import axios from 'axios';
import './common.css'
import './commontwo.css'

const TabPane = Tabs.TabPane
const loginInputsyl = {
	"width": " 100%",
	"height": "40px",
}

//父组件 EducoderLogin.js
class LoginRegisterComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login: "",
			password: "",
			passwords: "",
			seconds: 60,
			codes: "",
			getverificationcodes: true,
			Phonenumberisnotcobool: true,
			Phonenumberisnotco: undefined,
			Phonenumberisnotcosytdhk:undefined,
			Phonenumberisnotcosmmm: undefined,
			Phonenumberisnotcosymmmm:undefined,
			Phonenumberisnotcosyzm:undefined,
			s: 'text',
			classpass: "text",
			readonlyInput: true,
			dragOk: false,
			Whethertoverify:false,
			modalsType:false,
			pciphone:true,
			boolyzm:false,
		}
	}

	//判断是否是手机端
	IsPC=()=> {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"];
		var flag = true;//这个意思是说自己的是pc 端
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	componentDidMount = () => {
		let pcipns=this.IsPC();
     this.setState({
			 pciphone:pcipns,
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
	StudyMakeMoney = () => { // 调用父组件方法
		this.props.Setshowbool(1);

	}

	// 点击表单后，改变type
	changeType = () => {
		this.setState({classpass: 'password'});
	}
	changeTypey = () => {

	}
	//倒计时
	getverificationcode = () => {
		debugger
		if(this.state.login === undefined || this.state.login.length===0){
			this.openNotification("请输入手机号或邮箱");
			return;
		}

		//这是判断是否手机正确
		if(this.state.Phonenumberisnotcobool === false){
			this.openNotification(this.state.Phonenumberisnotco);
			this.setState({
				Whethertoverify:this.state.Whethertoverify===true?false:true,
			})
			return;
		}
		//拖动滑动验证
		if(this.state.pciphone===true) {
			if (this.state.dragOk === false) {
				this.openNotification("拖动滑块验证");
				return;
			}
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
				type: 2,
				smscode:setmiyah(logins)
			}
		}).then((result) => {
			//验证有问题{"status":1,"message":"success"}
			// this.openNotification("验证码已发送，请注意查收");
			if(result.data.status===1){
				this.openNotification("验证码已发送，请注意查收");
			}else if(result.data.status===-2){
				this.openNotification(result.data.message);
			}
		}).catch((error) => {
			console.log(error);

		})
	}

	cancelReadOnly = () => {
		this.setState({
			readonlyInput: false,
		})
	}
	//找回密码
	Retrievepassword = () => {
		if (this.state.Phonenumberisnotcobool === false&&this.state.Phonenumberisnotco!==undefined) {
			this.openNotification(this.state.Phonenumberisnotco);
			this.setState({
				Whethertoverify:this.state.Whethertoverify===true?false:true,
			})
			return;
		}
		if (this.state.login === undefined|| this.state.login.length ===0 || this.state.login === "") {
			this.setState({
				Phonenumberisnotco:"账号不能为空",
				Phonenumberisnotcobool: false,
				dragOk: false,
				Whethertoverify: this.state.Whethertoverify === true ? false : true,
			})
			return
		}
		if(this.state.pciphone===true){
			if (this.state.dragOk === false) {
				// this.openNotification(`请拖动滑块完成验证`,2);
				this.setState({
					Phonenumberisnotcosytdhk:"请拖动滑块完成验证",
					dragOk: false,
					Whethertoverify: this.state.Whethertoverify === true ? false : true,
				})
				return
			}
		}

		if (this.state.password === undefined || this.state.password.length ===0 || this.state.password === "") {
			this.setState({
				Phonenumberisnotcosmmm:"密码不能为空",
			})
			return
		}
		if (this.state.passwords === undefined || this.state.passwords.length ===0 || this.state.passwords === "") {
			this.setState({
				Phonenumberisnotcosymmmm:"二次密码不能为空"
			})
			return
		}
		if (this.state.password !== this.state.passwords==="") {
			this.openNotification(`两次输入的密码不一致`);
			return
		}
		else if (this.state.password !==undefined&&this.state.password.length>0&&this.state.password.length<8){
			this.setState({
				Phonenumberisnotcosmmm:"密码不能少于8位",
			})
			return
		} else if (this.state.password !==undefined&&this.state.password.length>0&&this.state.password.length>16){
			this.setState({
				Phonenumberisnotcosmmm:"密码不能超过16位",
			})
			return
		}
		else if (this.state.passwords !==undefined&&this.state.passwords.length>0&&this.state.passwords.length<8){
			this.setState({
				Phonenumberisnotcosymmmm:"二次密码不能少于8位",
			})
			return
		} else if (this.state.passwords !==undefined&&this.state.passwords.length>0&&this.state.passwords.length>16){
			this.setState({
				Phonenumberisnotcosymmmm:"二次密码不能超过16位",
			})
			return
		}
		if (this.state.codes === undefined|| this.state.codes.length ===0 || this.state.codes === "") {
			this.setState({
				Phonenumberisnotcosyzm:"验证码不能为空"
			})
			return
		}
		var url = "/accounts/reset_password.json";
		axios.post(url, {
			login: this.state.login,
			code: this.state.codes,
			new_password: this.state.password,
			new_password_confirmation: this.state.passwords,
		}).then((result) => {
			// console.log(result);
			//登录成功，会生成session
			if(result){
				if(result.data.status===-2){
					if(result.data.message==="验证码不正确"){
						this.setState({
							Phonenumberisnotcosyzm:"验证码不正确",
						})

						return;
					}else if(result.data.message==="验证码已失效"){
						this.setState({
							Phonenumberisnotcosyzm:"验证码不正确",
						})

						return;
					}else if(result.data.message==="1小时内同一手机号发送次数超过限制"){
						this.setState({
							boolyzm:true,
						})
						this.openNotification(result.data.message);
						return;
					}else {
						this.openNotification(result.data.message);
						return;
					}
				}else {
					this.setState({
						modalsType:true
					})
				}
			}
		}).catch((error) => {

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
	loginInputonChange = (e) => {
		// console.log(e.target.value);
		var stirngt;
		if(e.target.value.length>0){
			var str=  e.target.value.replace(/\s*/g,"")
			stirngt=str;
		}else{
			stirngt=  e.target.value;
		}
		this.setState({
			login: stirngt,
			Phonenumberisnotco:undefined,
			dragOk:false,
			boolyzm:false,
			Whethertoverify:this.state.Whethertoverify===true?false:true,
		})
	}
	loginInputonChanges = (e) => {
		// console.log(e.target.value);
		var stirngt;
		if(e.target.value.length>0){
			var str=  e.target.value.replace(/\s*/g,"")
			stirngt=str;
		}else{
			stirngt=  e.target.value;
		}
		this.setState({
			password: stirngt,
			Phonenumberisnotcosmmm:undefined,
		})

	}
	loginInputonChangess = (e) => {
		// console.log(e.target.value);
		var stirngt;
		if(e.target.value.length>0){
			var str=  e.target.value.replace(/\s*/g,"")
			stirngt=str;
		}else{
			stirngt=  e.target.value;
		}
		this.setState({
			passwords: stirngt,
			Phonenumberisnotcosymmmm:undefined,
		})

	}
	//获取code
	codesonChange = (e) => {
		this.setState({
			codes: e.target.value,
			Phonenumberisnotcosyzm:undefined,
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
				Phonenumberisnotcobool: true,
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

			this.Emailphonenumberverification(value)
			return
		} else {
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: true,
			})
			return
		}
	}

	inputOnBlurzhuche = (e)=>{
		if(this.state.pciphone===false) {
		if(this.state.login===""||this.state.login.length===0){
			this.setState({
				Phonenumberisnotco: "账号不能为空",
				Phonenumberisnotcobool: false,
				dragOk:false,
				Whethertoverify:this.state.Whethertoverify===true?false:true,
			})
			return
		}
			// console.log(e.target.value.length);
			// if (e.target.value.length === 0) {
			// 	this.setState({
			// 		Phonenumberisnotco: undefined,
			// 		Phonenumberisnotcobool: false,
			// 	})
			// 	return;
			// }
			// var telephone = $("#telephoneAdd.tianjia_phone").val();
			var regph = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			// var email = $("#add_email.tianjia_email").val();
			var regemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

			// [1]手机号开头必须是1    [3,4,5,6,7,8] 第二位是3-8中的一个 [0-9]{9} 后边9位可以是0-9的任意数字。
			var stringdata = undefined;
			if (!regph.test(e.target.value)) {
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

			if (!regemail.test(e.target.value)) {
				if ((e.target.value.indexOf("@") != -1) === true) {
					stringdata = "邮箱格式不正确";
				} else {
					stringdata = "手机号格式不正确";

				}
				this.setState({
					Phonenumberisnotco: stringdata,
					Phonenumberisnotcobool: false,
				})
				return
			} else {
				this.setState({
					Phonenumberisnotco: undefined,
					Phonenumberisnotcobool: true,
				})
				this.Emailphonenumberverification(e.target.value)
				return
			}
			this.Emailphonenumberverification(e.target.value)
	}

	}
	//是否验证通过
	dragOkCallback = () => {
		console.log(this.state.login);
      this.setState({
				Phonenumberisnotcosytdhk:undefined,
			})

			if (this.state.login === "" || this.state.login.length === 0) {
				this.setState({
					Phonenumberisnotco: "账号不能为空",
					Phonenumberisnotcobool: false,
					Phonenumberisnotcosytdhk:undefined,
					dragOk: false,
					Whethertoverify: this.state.Whethertoverify === true ? false : true,
				})
				return
			}
		// var telephone = $("#telephoneAdd.tianjia_phone").val();
		var regph = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		// var email = $("#add_email.tianjia_email").val();
		var regemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

		// [1]手机号开头必须是1    [3,4,5,6,7,8] 第二位是3-8中的一个 [0-9]{9} 后边9位可以是0-9的任意数字。
		var stringdata = undefined;
		if (!regph.test(this.state.login)) {
			stringdata = "手机号格式不正确";
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: true,
				Phonenumberisnotcosytdhk:undefined,
				dragOk: true,
			})
		} else {
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: true,
				Phonenumberisnotcosytdhk:undefined,
				dragOk: true,

			});
			this.Emailphonenumberverification(this.state.login)

			return
		}

		if (!regemail.test(this.state.login)) {
			if ((this.state.login.indexOf("@") != -1) === true) {
				stringdata = "邮箱格式不正确";
			} else {
				stringdata = "手机号格式不正确";

			}
			this.setState({
				Phonenumberisnotco: stringdata,
				Phonenumberisnotcobool: false,
				dragOk:false,
				Whethertoverify: this.state.Whethertoverify === true ? false : true,
			})
			return
		} else {
			this.setState({
				Phonenumberisnotco: undefined,
				Phonenumberisnotcobool: true,
				dragOk: true,
			})
			this.Emailphonenumberverification(this.state.login)
			return
		}

			this.setState({
				Phonenumberisnotcosytdhk: undefined,
			})
			this.Emailphonenumberverification(this.state.login)


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
			// console.log(result);
			if(result){
				if(result.data.status===-2){
						console.log(value.length);
							this.setState({
								Phonenumberisnotco: result.data.message,
								Phonenumberisnotcobool: false,
								dragOk:false,
								Whethertoverify:this.state.Whethertoverify===true?false:true,
							})
						return;
				}else {
						this.setState({
							Phonenumberisnotco: undefined,
							Phonenumberisnotcobool: true,
							dragOk:true,
						})
						return;
				}
			}


		}).catch((error) => {
			console.log(error);

		})
	}
	gobackshowbool=()=>{
		this.props.history.push("/login");
		this.props.Setshowbool(1)
	}
	render() {
		const {
			// 登录
			autoLogin,
			// 注册
			readAgreement, dragOk,
			login,
			password,
			passwords,
			classpass,
			seconds,
			getverificationcodes,
			Phonenumberisnotco,
			Phonenumberisnotcosytdhk,
			Phonenumberisnotcosmmm,
			Phonenumberisnotcosymmmm,
			Phonenumberisnotcosyzm,
			readonlyInput,
			codes,
			Whethertoverify,
			pciphone,
			boolyzm,
		} = this.state
		// height: 346px;
		return (

			<div className="login_register_content" >
				<ReadPassword
					modalsType={this.state.modalsType}
					StudyMakeMoney={()=>this.StudyMakeMoney()}
				/>

				<Input type="text" name="username" value={"namename"}
							 style={{height: '0', width: '0', border: 'none', display: "none"}}/>
				<Input type="password" name="password" id="password" value={"123123123"}
							 style={{height: '0', width: '0', border: 'none', display: "none"}}/>
				<style>{`

              .login_section .section_header {
                margin-bottom: 16px;
                font-size: 18px;
                width: 100%;
                text-align: center;
                border-bottom: 1px solid rgb(234, 234, 234);
                height: 69px;
                color: #05101A;
                line-height: 69px;
              }
								.loginInputzhuche{
									width: 100%;
									background-color: #fff!important;
									height: 45px !important;
									padding: 5px;

								}
          `}</style>


				<div className="login_sectionysl">
					<div className="section_header font-18" style={{color:"#05101A",marginTop:"10px"}}>
						找回密码
					</div>
					<div style={{width: '340px'}}>
						<style>
							{
								`
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
						{/*onBlur={(e) => this.inputOnBlur(e)}*/}
						<Input style={loginInputsyl} type="text" autoComplete="off" onClick={this.changeTypey}
									 className={Phonenumberisnotco && Phonenumberisnotco !== "" ?" color-grey-9 loginInputzhucheyslass bor-reds":" color-grey-9 loginInputzhuche"}
									 placeholder="输入注册手机号或邮箱" value={this.state.login}
									 // onBlur={(e) => this.inputOnBlurzhuche(e)}
									 onChange={this.loginInputonChange} style={{marginTop: '10px', height: "38px"}}></Input>
						{
							Phonenumberisnotco && Phonenumberisnotco !== "" ?
								<p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
									<span className="fl" style={{textAlign: "left", width: " 100%"}}>{Phonenumberisnotco}</span>
								</p>
								: <div style={{height: "25px"}}></div>
						}

						{
							Whethertoverify===false&&pciphone===true?
								<CheckInputysl1
									dragOkCallback={this.dragOkCallback}
								>
								</CheckInputysl1>
								:
								""

						}
						{
							Whethertoverify===true&&pciphone===true?
								<CheckInputysl2
									dragOkCallback={this.dragOkCallback}
								>
								</CheckInputysl2>
								:
								""
						}
						<div>
							{pciphone===true?
						(
							Phonenumberisnotcosytdhk && Phonenumberisnotcosytdhk !=="" ?
								<p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
									<span className="fl" style={{textAlign: "left", width: " 100%"}}>{Phonenumberisnotcosytdhk}</span>
								</p>
								: <div style={{height: "25px"}}></div>
							)
							:""}
						</div>
						<Input type={classpass}
									 className={Phonenumberisnotcosmmm && Phonenumberisnotcosmmm !== "" ?" color-grey-9 loginInputzhucheyslass bor-reds":" color-grey-9 loginInputzhuche"}
									 onClick={this.changeType} autoComplete="new-password" onChange={this.loginInputonChanges}
									 value={this.state.password} style={{width: "100%", height: "38px"}}
									 placeholder="输入8~16位密码，区分大小写"></Input>
						{
							Phonenumberisnotcosmmm && Phonenumberisnotcosmmm !== "" ?
								<p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
									<span className="fl" style={{textAlign: "left", width: " 100%"}}>{Phonenumberisnotcosmmm}</span>
								</p>
								: <div style={{height: "25px"}}></div>
						}

						<Input type={classpass}
									 className={Phonenumberisnotcosymmmm && Phonenumberisnotcosymmmm !== "" ?" color-grey-9 loginInputzhucheyslass bor-reds":" color-grey-9 loginInputzhuche"}
									 onClick={this.changeType} autoComplete="new-password"
									 onChange={this.loginInputonChangess} value={this.state.passwords}
									 style={{height: "38px",  width: "100%"}}
									 placeholder="再次输入新密码"></Input>
						{
							Phonenumberisnotcosymmmm && Phonenumberisnotcosymmmm !== "" ?
								<p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
									<span className="fl" style={{textAlign: "left", width: " 100%"}}>{Phonenumberisnotcosymmmm}</span>
								</p>
								: <div style={{height: "25px"}}></div>
						}
						<div className="yslbutondls">

							<Input  className={Phonenumberisnotcosyzm && Phonenumberisnotcosyzm !== "" ?" mr5 font-14 color-grey-9 loginInputzhucheyslass bor-reds":" mr5 font-14 color-grey-9 loginInputzhuche"}
								 type="text" autoComplete="off" style={{
								width: "210px",
								height: "38px",
							}} placeholder="请输入验证码"
										 onChange={this.codesonChange}
										 value={codes}
							>
							</Input>
							{
								getverificationcodes === undefined ?
									<Button className=" ml5 " disabled
													style={{"width": "120px", "text-align": "center", "height": "45px",}}
													size={"large"}>重新发送{seconds}s</Button>
									: getverificationcodes === true ?
									<Button className=" ml5 "
													style={{"width": "120px", "text-align": "center", "height": "45px"}}
													type="primary"
													disabled={boolyzm}
													onClick={() => this.getverificationcode()} size={"large"}>获取验证码</Button>
									:
									<Button className=" ml5 "
													style={{"width": "120px", "text-align": "center", "height": "45px"}}
													type="primary"
													disabled={boolyzm}
													onClick={() => this.getverificationcode()} size={"large"}>重新发送</Button>
							}


						</div>

						{
							Phonenumberisnotcosyzm && Phonenumberisnotcosyzm !== "" ?
								<p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
									<span className="fl" style={{textAlign: "left", width: " 100%"}}>{Phonenumberisnotcosyzm}</span>
								</p>
								: <div style={{height: "25px"}}></div>
						}

						<Button  size={"large"} type="primary"
										 style={{height:"46px", width: "100%",marginBottom:"26px"}}
										 onClick={this.Retrievepassword}>完成</Button>
						<p className="clearfix mb20 textcenter">
							<a className={"startlogin color-blue"} onClick={()=>this.gobackshowbool()}>返回登录注册</a>
						</p>
					</div>
				</div>

			</div>
		);
	}
}

export default (LoginRegisterComponent);
