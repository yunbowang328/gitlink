import React, {Component} from 'react';
import {Button, Layout, Input, Form} from 'antd';
import axios from 'axios';
import {setmiyah} from 'educoder';
import mycompetotionchild from './mycompetotionchild.css';
import {getHiddenName} from "../../../../user/account/AccountBasicEdit";
import '../../../../courses/css/Courses.css'

export const identityMap = {"teacher": "教师", "student": "学生", "professional": "专业人士"}

class Mailboxvalidation extends Component {
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
			certification: 1
		}
	}

	componentDidMount() {
		window.document.title = '竞赛';
		// console.log("3获取用户信息");
		// console.log(this.props);
	}


	// 绑定邮箱
	onEmailSubmit = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let {id} = this.props.userdata;
				let reg = /^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				if (reg.test(values.email)) {
					let url = `/users/accounts/${id}/email_bind.json`
					axios.post((url), {
						email: values.email,
						code: values.emailValidateCode
					}).then((result) => {
						if (result) {
							this.props.showNotification("邮箱地址绑定成功!");
							this.hideUpdating(2);
							this.props.getdata(id);
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
			this.props.hideUpdating(1);
		} else if (i === 2) {
			this.props.hideUpdating(2);


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
				if(result.data.status===1){
					this.props.showNotification("验证码已发送，请注意查收");
				}else if(result.data.status===-2){
					this.props.showNotification(result.data.message);
				}

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


	render() {
		const {getFieldDecorator} = this.props.form;
		const {updating, seconds, secondsFlag, basicInfo, phonebool, emailbool, certification, formationdata, bank_account_editable, leader, bank_account} = this.state
		console.log(emailbool);
		return (
			<div>
				<style>{`

            .flexRow {
              padding: 20px 0;
            }
              .flexRow .name {
                margin-left: 12px;
                color: #666666;

                text-align: center;
                flex: 0 0 100px;
              }
              .flexRow .description {
                margin-left: 10px;
                flex: 1;
                color: #CDCDCD;
              }
                .description span {
                  margin-right: 20px;
                  color: #05101A;
                }
              .flexRow .status {
                width: 100px;
                color: #28AC7F;
                text-align: right;
              }
            .flexTable .flexTable {
              border-bottom: 1px solid #EBEBEB;
            }
            
            .settingForm label{
              color: #666666;
              font-size: 14px !important ; 
            }
            .settingForm input {
              width: 340px;
                  height: 40px;
            }
            .settingForm input.validateInput  {
              width: 220px;
            }
            .settingForm .formItemInline button {
              width: 110px;
              margin-left: 10px;
            }
            .settingForm .ant-form-item-label {
         text-align: left;
    width: 84px;
            }
            
           
            .formItemInline .ant-form-explain{
              position:absolute;
              bottom:-22px;
              left:0px;
              width:100%;
            }
          `}</style>
				<div className="settingForm ml38">
					<React.Fragment>
						<Form>
							<Form.Item
								label="邮箱地址"
								className="formItemInline hideRequireTag mb20 mt20"
							>
								{getFieldDecorator('email', {
									rules: [{
										// initialValue: this.state.cityDefaultValue,
										required: true,
										message: basicInfo && basicInfo.mail ? '请输入要更换的新邮箱地址' : '请输入邮箱地址',
									}],
								})(
									<Input placeholder={`${basicInfo && basicInfo.mail ? '请输入要更换的新邮箱地址' : '请输入邮箱地址'}`}></Input>
								)}
							</Form.Item>

							<Form.Item
								label="邮箱验证码"
								className="mb20 formItemInline hideRequireTag"
							>
								{getFieldDecorator('emailValidateCode', {
									rules: [{
										// initialValue: this.state.cityDefaultValue,
										required: true,
										message: '请输入邮箱收到的验证码',
									}],
								})(
									<Input placeholder="请输入邮箱收到的验证码" className="validateInput"></Input>
								)}
								<Button type="primary" disabled={secondsFlag} onClick={() => this.getCode(4)}>
									{!secondsFlag ? "获取验证码" : `重新发送${seconds}s`}</Button>
							</Form.Item>

							<div className="mb20" style={{marginLeft: '204px'}}>
								<Button type="primary" onClick={() => this.onEmailSubmit()}>确定</Button>
								<Button type="primary grayBtn" style={{marginLeft: '20px'}}
												onClick={() => this.hideUpdating(2)}>取消</Button>
							</div>
						</Form>
					</React.Fragment>
				</div>
			</div>
		)
	}
}

const Mailboxvalidations = Form.create({name: 'Mailboxvalidation'})(Mailboxvalidation);

export default Mailboxvalidations;

