import React, {Component} from 'react';
import {Button, Layout, Input, Form} from 'antd';
import axios from 'axios';
import {setmiyah} from 'educoder';
import mycompetotionchild from './mycompetotionchild.css';
import {getHiddenName} from "../../../../user/account/AccountBasicEdit";
import '../../../../courses/css/Courses.css'
import RealNameCertificationModal from "../../../../user/modal/RealNameCertificationModal";
import Phonenumberverifications from './Phonenumberverification';
import Mailboxvalidations from './Mailboxvalidation'
import Bankcardnumberverifications from './Bankcardnumberverification'
export const identityMap = {"teacher": "教师", "student": "学生", "professional": "专业人士"}

class CompetitionContentspdfpeopledata extends Component {
	constructor(props) {
		super(props)
		this.state = {
			basicInfo: {},
			updating: '',
			secondsFlag: false,
			seconds: 60,
			phonebool: false,
			emailbool: false,
			formationdata: [],
			bank_account_editable: false,
			leader: false,
			bank_account: undefined,
			certification: 1,
			userdata:undefined
		}
	}

	componentDidMount() {
		window.document.title = '竞赛';
		console.log("获取用户信息");
		console.log(this.props);

		this.GetawardinformationAPI();
		let query=this.props.location&&this.props.location.search;
		const types = query.split('user_id=')
		let userid;
		if(types[1]===undefined){
			userid=this.props.user&&this.props.user.user_id;
		}else{
			userid=types[1];
		}
		this.getdata(userid);
		this.GetuseridApi(userid);

	}

	GetuseridApi=(id)=>{
    //个人信息API 获取个人信息
		let url = `/users/accounts/${id}.json`;
		axios.get(url).then((result) => {
			if (result.data) {
				console.log("GetuseridApi");
         console.log(result.data);
          this.setState({
						userdata:result.data
					})
			}
		}).catch((error) => {
			console.log(error);
		})

	}

	GetawardinformationAPI = () => {
		let url = `/competitions/${this.props.match.params.identifier}/prize.json`;
		let query=this.props.location&&this.props.location.search;
		const types = query.split('user_id=')
		let userid;
		if(types[1]===undefined){
			userid=this.props.user&&this.props.user.user_id;
		}else{
			userid=types[1];
		}
		axios.get(url,{params:{
				user_id:userid,
			}
		}).then((result) => {
			if (result.data) {
				this.setState({
					formationdata: result.data.formationdata,
					bank_account_editable: result.data.bank_account_editable, //队长是否可以编辑
					leader: result.data.leader, //是否是队长
					bank_account: result.data.bank_account, //队长银行卡号信息
				})
			}
		}).catch((error) => {
			console.log(error);
		})
	}


	getdata = (id) => {
		this.setState({
			certification: 3
		})
		this.GetuseridApi(id);
	};
	// 绑定手机
	onPhoneSubmit = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let {id} =this.state.userdata;
				let reg = /^1\d{10}$/;
				if (reg.test(values.phone)) {
					let url = `/users/accounts/${id}/phone_bind.json`
					axios.post((url), {
						phone: values.phone,
						code: values.phoneValidateCode
					}).then((result) => {
						if (result) {
							this.props.showNotification("手机号码绑定成功!");
							this.setState({
								phonebool: false
							})
							this.getdata(this.state.userdata.id);
						}
					}).catch((error) => {
						console.log(error);
					})
				} else {
					this.props.showNotification("请输入有效的11位手机号码");
				}
			}
		})
	}
	// 绑定邮箱
	onEmailSubmit = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let {id} =this.state.userdata;
				let reg = /^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				if (reg.test(values.email)) {
					let url = `/users/accounts/${id}/email_bind.json`
					axios.post((url), {
						email: values.email,
						code: values.emailValidateCode
					}).then((result) => {
						if (result) {
							this.props.showNotification("邮箱地址绑定成功!");
							this.setState({
								emailbool: false
							})
							this.getdata(this.state.userdata.id);
						}
					}).catch((error) => {
						console.log(error);
					})
				} else {
					this.props.showNotification("请输入正确的邮箱地址");
				}
			}
		})
	}
	//取消编辑
	hideUpdating = (i) => {
		if (i === 1) {
			this.setState({
				phonebool: false
			})
		} else if (i === 2) {
			this.setState({
				emailbool: false
			})

		} else if (i === 3) {

		}

	}

	// 获取验证码
	getCode = (index) => {
		let url = `/accounts/get_verification_code.json`

		let login = '';
		let values = this.props.form.getFieldsValue();
		if (index == 3) {
			//绑定手机号码
			login = values.phone;
			let reg = /^1\d{10}$/;
			if (reg.test(login) == false) {
				this.props.showNotification(`请先输入正确的手机号码`);
				return;
			}
		} else if (index == 4) {
			// 绑定邮箱
			login = values.email;
			let reg = /^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
			if (reg.test(login) == false) {
				this.props.showNotification(`请先输入正确的邮箱地址`);
				return;
			}
		}
		let type = index;
		if (!login) {
			this.props.showNotification(`请先输入${index == 3 ? "手机号码" : "邮箱地址"}`);
			return;
		}
		let smscode=setmiyah(login)
		axios.get((url), {
			params: {
				login, type,smscode
			}
		}).then((result) => {
			if (result) {
				// 倒计时
				this.setState({
					secondsFlag: true
				})
				this.remainTime();
			}
		}).catch((error) => {
			console.log(error);
		})
	}

	// 获取验证码倒计时
	remainTime = () => {
		this.setState({
			seconds: 60
		})
		this.timer = setInterval(() => {
			let {seconds} = this.state;
			let s = parseInt(seconds) - 1;
			if (s > -1) {
				this.setState({
					seconds: s
				})
			} else {
				this.setState({
					secondsFlag: false
				})
				clearInterval(this.timer);
			}
		}, 1000)
	}

	phonebools = () => {
		this.setState({
			phonebool: true
		})
	}

	emailbools = () => {
		console.log("点击了邮箱");
		this.setState({
			emailbool: true
		})
	}

	//立即认证
	checkBasicInfo = (index) => {
		if (this.state.userdata.base_info_completed == true) {
			this.showRealNameCertificationModal(index)
		} else {
			try {
				this.props.confirm({
					okText: `立即完善`,
					content: `请先完善基本信息`,
					onOk: () => {
						this.props.history.push('/account/profile/edit')
					}
				})
			} catch (e) {
				this.props.history.push(`/account/profile/edit`);

			}
		}

	}
	showRealNameCertificationModal = (index) => {
		this.setState({
			certification: index,
		}, () => {
			if (index == 1) {
				this.realNameCertificationModal1.setVisible(true)
			} else if (index == 2) {
				this.realNameCertificationModal2.setVisible(true)
			}
		})
	}
	//绑定银行确认
	yhBankstrue = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let url = `/competitions/${this.props.match.params.identifier}/prize_leader_account.json`;
				axios.patch(url, {
						user_id:this.state.userdata.id,
						bank: values.openingbank,
						second_bank: values.subbranchs,
						card_no: values.subbranch
					})
					.then((result) => {
						try {
							if (result.data.status == 0) {
								// console.log(JSON.stringify(result));
								this.props.showNotification(`提交成功`);
								this.getdata(this.state.userdata.id);
								this.GetawardinformationAPI();
							}
						} catch (e) {

						}

					}).catch((error) => {
					console.log(error);
				})
			}
		})

	}

	//取消认证弹框
	onCancel = () => {
		this.getdata(this.state.userdata.id);

	}

	bindRef = ref => { this.child = ref }
	//撤销认证
	Cancellationofapplication = (index) => {
		let userid;
		let query=this.props.location&&this.props.location.search;
		const types = query.split('user_id=')
		if(types[1]===undefined){
			userid=this.props.user&&this.props.user.user_id;
		}else{
			userid=types[1];
		}
		let url = ""
		if (index === 1) {
			url = `/users/accounts/${userid}/authentication_apply.json`;
		} else if (index === 2) {
			url = `/users/accounts/${userid}/professional_auth_apply.json`;
		}
		axios.delete(url)
			.then((response) => {
				try {
					if (response.data.status == 0) {
						if (index === 1) {
							this.props.showNotification('撤销实名认证成功')
						} else if (index === 2) {
							this.props.showNotification('撤销职业认证成功')
						}
						try {
							this.getdata(this.state.userdata.id);
						}catch (e) {

						}

					}
				} catch (e) {

				}

			})
			.catch(function (error) {
				console.log(error);
			});

	}


	render() {
		const admins=this.props.user.admin;
		if(admins===undefined||admins===null) {
			admins === false;
		}
			const {updating, seconds, secondsFlag,userdata, basicInfo, phonebool, emailbool, certification, formationdata, bank_account_editable, leader, bank_account} = this.state
		return (
			<div className="flexdidirectionss mt17">
				{this.state.certification === 1 &&userdata?

					<RealNameCertificationModal  {...this.props} {...this.state} basicInfo={userdata}
																			 wrappedComponentRef={(form) => this.realNameCertificationModal1 = form}
																			 certification={certification}
																			 Getdata={(id) => this.getdata(id)}
																			 onCancel={() => this.onCancel()}
				></RealNameCertificationModal>


					: ""}

				{this.state.certification === 2 &&userdata ?
					<RealNameCertificationModal  {...this.props} {...this.state} basicInfo={userdata}
																			 wrappedComponentRef={(form) => this.realNameCertificationModal2 = form}
																			 certification={certification}
																			 Getdata={(id) => this.getdata(id)}
																			 onCancel={() => this.onCancel()}

				></RealNameCertificationModal> : ""}
				<div className="flexdirections ">
					<p className="fontcolorsyslhei font-16 w98"><span className="fontcolorsysl font-16">*</span><span>实名信息</span>
					</p>
					{userdata && userdata.authentication == "uncertified" ?
						<p className="fontcolorsyslhui font-14 w200">通过实名认证后才能获得证书</p> : ""
					}
					{userdata && userdata.authentication == "uncertified" ?
						<p className="fontcolorsysllan font-14 ml3 mycompitcursor"
							 onClick={() => this.checkBasicInfo(1)}>立即认证</p> : ""
					}

				</div>
				<div className="flexdirections ml38 mt23">
					<p className="fontcolorsyslhui1">姓名：</p>
					<p className="fontcolorsyslhei flexdirections">{userdata && userdata.name}

						{
							userdata && userdata.authentication == "uncertified" ? "" :
								userdata && userdata.authentication == "applying" ?
									<p className="flexdirections"><p className="iconfont icon-tishi colorgreenorg font-14 ml20"></p><p
										className="colorgreenorg font-14 ml6">待审核！</p><p
										className="fontcolorsysllan borcolors font-12 w64 mycompitcursor"
										onClick={() => this.Cancellationofapplication(1)}>撤销认证</p></p>
									:
									<p className="flexdirections">
										<p className="iconfont icon-wancheng colorgreenlight font-14 ml20"></p><p
										className="colorgreenlight font-14 ml6">已认证</p>
									</p>
						}
					</p>
				</div>

				<div className="flexdirections ml38 mt19">
					<p className="fontcolorsyslhui1">性别：</p>
					<p className="fontcolorsyslhei"> {userdata && userdata.gender == 0 ? "男" : "女"}</p>
				</div>

				<div className="flexdirections mt36 ">
					<p className="fontcolorsyslhei font-16 w98"><span className="fontcolorsysl font-16">*</span><span>职业信息</span>
					</p>
					{
						userdata && userdata.professional_certification == "uncertified" ?
							<p className="fontcolorsyslhui font-14 w200">通过职业认证后才能获得证书</p>

							: ""}
					{
						userdata && userdata.professional_certification == "uncertified" ?
							<p className="fontcolorsysllan font-14 ml3 mycompitcursor" onClick={() => this.checkBasicInfo(2)}>立即认证</p>

							: ""}
				</div>

				<div className="flexdirections ml38 mt23">
					<p className="fontcolorsyslhui1">职业：</p>
					<p
						className="fontcolorsyslhei flexdirections">{userdata && userdata.identity && identityMap[userdata.identity]}
						{
							userdata && userdata.professional_certification == "uncertified" ?
								"" :
								userdata && userdata.professional_certification == "applying" ?
									<p className="flexdirections">
										<p className="iconfont icon-tishi colorgreenorg font-14 ml20"></p><p
										className="colorgreenorg font-14 ml6">待审核！</p><p
										className="fontcolorsysllan borcolors font-12 w64 mycompitcursor ml6"
										onClick={() => this.Cancellationofapplication(2)}>撤销认证</p>
									</p>
									:
									<p className="flexdirections">
										<p className="iconfont icon-wancheng colorgreenlight font-14 ml20"></p><p
										className="colorgreenlight font-14 ml6">已认证</p>
										<p className="fontcolorsysllan borcolors font-12 w64 mycompitcursor ml6"
											 onClick={() => this.checkBasicInfo(2)}>重新认证</p>

									</p>
						}
					</p>
				</div>
				<div className="flexdirections ml38 mt19">
					<p
						className="fontcolorsyslhui1">{userdata && userdata.technical_title ? "职称：" : ""}{userdata && userdata.student_id ? "学号：" : ""}</p>
					<p className="fontcolorsyslhei">{userdata && (userdata.technical_title || userdata.student_id)}</p>
				</div>
				<div className="flexdirections ml38 mt19">
					<p className="fontcolorsyslhui1">学校：</p>
					<p className="fontcolorsyslhei">{userdata && userdata.school_name}</p>
				</div>
				<div className="flexdirections ml38 mt19">
					<p className="fontcolorsyslhui1">院系：</p>
					<p className="fontcolorsyslhei"> {userdata && userdata.department_name}</p>
				</div>
				<div className="flexdirections mt36 ">
					<p className="fontcolorsyslhei font-16 w98"><span className="fontcolorsysl font-16">*</span><span>联系方式</span>
					</p>
				</div>
				<div className="flexdirections ml38 mt23">
					<p className="fontcolorsyslhui1 w60 ">手机号：</p>
					{
						userdata && userdata.phone ?
							<p className="fontcolorsyslhei w200 ">{userdata && userdata.phone}</p>
							:
							<p className="fontcolorsysljin w200 ">未绑定</p>
					}
					<p className="fontcolorsysllan mycompitcursor"
						 onClick={() => this.phonebools()}>{userdata && userdata.phone ? (phonebool === false ? "更换" : "") : (phonebool === false ? "立即绑定" : "")}</p>
				</div>
				{/*手机号绑定*/}
				{
					phonebool === true &&userdata ?
						<Phonenumberverifications {...this.props} {...this.state} basicInfo={userdata}
																			hideUpdating={(i) => this.hideUpdating(i)}
																			getdata={(id) => this.getdata(id)}></Phonenumberverifications>
						: ""
				}


				<div className="flexdirections ml38 mt19">
					<p className="fontcolorsyslhui1 w60">Email：</p>
					<p className="fontcolorsyslhei w200">{userdata && userdata.mail}</p>
					<p className="fontcolorsysllan mycompitcursor"
						 onClick={() => this.emailbools()}>{userdata && userdata.mail ? (emailbool === false ? "更换" : "") : (emailbool === false ? "立即绑定" : "")}</p>
				</div>
				{
					emailbool === false ? "" :
						(
							userdata?
								<Mailboxvalidations  {...this.props} {...this.state} basicInfo={userdata}
																		 hideUpdating={(i) => this.hideUpdating(i)}
																		 getdata={(id) => this.getdata(id)}></Mailboxvalidations>
								:""
						)
				}
				{
					leader === true ?
						<div>
							{
								bank_account_editable === true ?
									<Bankcardnumberverifications triggerRef={this.bindRef} {...this.props} {...this.state} basicInfo={userdata}
																							 hideUpdating={(i) => this.hideUpdating(i)}
																							 getdata={(id) => this.getdata(id)}
																							 GetawardinformationAPI={() => this.GetawardinformationAPI()}
																							 bank_account={this.state.bank_account}
									></Bankcardnumberverifications>
									:
										admins===true?
											<Bankcardnumberverifications triggerRef={this.bindRef} {...this.props} {...this.state} basicInfo={userdata}
																									 hideUpdating={(i) => this.hideUpdating(i)}
																									 getdata={(id) => this.getdata(id)}
																									 GetawardinformationAPI={() => this.GetawardinformationAPI()}
																									 bank_account={this.state.bank_account}
											></Bankcardnumberverifications>
											:
											<div>
												<div className="flexdirections mt36">
													<p className="fontcolorsyslhei font-16">签/领/开户行及银行卡号</p>
													<p className="fontcolorsyslhui font-14 ml11">为保障奖金的及时发放，请队长如实填写你名下的银行卡信息</p>
												</div>
												{
													bank_account && bank_account ?
														<div>
															<div className="flexdirections ml38 mt19">
																<p className="fontcolorsyslhui1 w56">开户行：</p>
																<p className="fontcolorsyslhei">{bank_account && bank_account.bank}</p>
															</div>
															<div className="flexdirections ml38 mt19">
																<p className="fontcolorsyslhui1 w56" style={{textAlign: "right"}}>支行：</p>
																<p className="fontcolorsyslhei">{bank_account && bank_account.second_bank}</p>
															</div>
															<div className="flexdirections ml38 mt19">
																<p className="fontcolorsyslhui1 w56" style={{textAlign: "right"}}>账号：</p>
																<p className="fontcolorsyslhei"> {bank_account && bank_account.card_no}</p>
															</div>
														</div>
														:
														""
												}

											</div>
							}
						</div>
						:
						<div>
							{
								admins===true?
									<Bankcardnumberverifications triggerRef={this.bindRef} {...this.props} {...this.state} basicInfo={userdata}
																							 hideUpdating={(i) => this.hideUpdating(i)}
																							 getdata={(id) => this.getdata(id)}
																							 GetawardinformationAPI={() => this.GetawardinformationAPI()}
																							 bank_account={this.state.bank_account}
									></Bankcardnumberverifications>
									:""
							}
						</div>
				}


			</div>
		)
	}
}

export default CompetitionContentspdfpeopledata;

