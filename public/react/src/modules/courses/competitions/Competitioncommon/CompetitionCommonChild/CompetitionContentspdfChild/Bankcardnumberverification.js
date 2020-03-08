import React, {Component} from 'react';
import {Button, Layout, Input, Form} from 'antd';
import axios from 'axios';
import {getImageUrl} from 'educoder';
import mycompetotionchild from './mycompetotionchild.css';
import {getHiddenName} from "../../../../user/account/AccountBasicEdit";
import '../../../../courses/css/Courses.css'

export const identityMap = {"teacher": "教师", "student": "学生", "professional": "专业人士"}

class Bankcardnumberverification extends Component {
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
		// console.log(this.props)
		try {
			this.props.triggerRef(this);
		}catch (e) {

		}
		console.log(this.props.bank_account);

		//初始化值
		if (this.props.bank_account) {
			this.props.form.setFieldsValue({
				openingbank: this.props.bank_account.bank,
				subbranch: this.props.bank_account.second_bank,
				subbranchs: this.props.bank_account.card_no,
			})
			this.setState({
				openingbank: this.props.bank_account.bank,
				subbranch:   this.props.bank_account.second_bank,
				subbranchs: this.props.bank_account.card_no,
			})
		}

	}

	 setdata(bank,second_bank,card_no){
		 this.props.form.setFieldsValue({
			 openingbank: bank,
			 subbranch: second_bank,
			 subbranchs:card_no,
		 })
	 }
	componentDidUpdate = (prevProps) => {
		if (prevProps.bank_account != this.props.bank_account) {
			console.log("componentDidUpdate");
			console.log(this.props);//是新数据
			console.log(prevProps);//是老数据
			////console.log("Registration");
			////console.log("componentDidUpdate");
			////console.log(this.props.user.admin);
			try {
				if(this.props.bank_account){
					this.props.form.setFieldsValue({
						openingbank: this.props.bank_account.bank,
						subbranch: this.props.bank_account.second_bank,
						subbranchs: this.props.bank_account.card_no,
					})
				}
				this.setState({
					openingbank: this.props.bank_account.bank,
					subbranch:   this.props.bank_account.second_bank,
					subbranchs: this.props.bank_account.card_no,
				})
			}catch (e) {

			}
		}

	}
	yhBankstrue = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let url = `/competitions/${this.props.match.params.identifier}/prize_leader_account.json`;
				axios.patch(url, {
					  user_id:this.props.userdata.id,
						bank: values.openingbank,
						second_bank: values.subbranch ,
						card_no: values.subbranchs
					})
					.then((result) => {
						try {
							if (result.data.status === 0) {
							  try {
									// console.log(values.openingbank);
									// console.log(values.subbranch);
									// console.log(values.subbranchs);
									this.props.form.setFieldsValue({
										openingbank: values.openingbank,
										subbranch:   values.subbranch,
										subbranchs: values.subbranchs,
									});
									this.setState({
										openingbank: values.openingbank,
										subbranch:   values.subbranch,
										subbranchs: values.subbranchs,
									})
								}catch (e) {

								}

								try {
									this.props.showNotification(`提交成功,等待审核!`);

								}catch (e) {

								}
			          try {
									this.props.getdata(this.props.userdata.id);
								}catch (e) {

								}
						    try {
									this.props.GetawardinformationAPI();
								}catch (e) {

								}
							}
						} catch (e) {

						}

					}).catch((error) => {
					console.log(error);
				})
			}
		})

	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const {updating, seconds, secondsFlag, basicInfo, phonebool, emailbool, certification, formationdata, bank_account_editable, leader, bank_account} = this.state
		return (
			<div>
				<div className="flexdirections mt36">
					<p className="fontcolorsyslhei font-16">签/领/开户行及银行卡号</p>
					<p className="fontcolorsyslhui font-14 ml11">为保障奖金的及时发放，请队长如实填写你名下的银行卡信息</p>
				</div>
				<div className="ml38">
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
            
            .settingFormsy label{
              color: #666666;
              font-size: 14px !important ; 
            
            }
            .settingFormsy input {
              width: 340px;
                  height: 40px;
            }
            .settingFormsy input.validateInput  {
              width: 220px;
            }
            .settingFormsy .formItemInline button {
              width: 110px;
              margin-left: 10px;
            }
            .settingFormsy .ant-form-item-label {
              width: 60px;
              text-align: left;
            }
            .formItemInline .ant-form-explain{
              position:absolute;
              bottom:-22px;
              left:0px;
              width:100%;
            }
            .yslzxueshi .ant-input{
											height: 40px !important;
											width: 276px !important
											}
											
											// class="ant-col ant-form-item-label"
          `}</style>
					<div className="settingFormsy">
						<React.Fragment>
							<Form>
								<Form.Item
									label="开户行："
									className="formItemInline hideRequireTag mb20 mt20"
								>
									{getFieldDecorator('openingbank', {
										rules: [{
										  initialValue:this.state.openingbank,
											required: true,
											message: '请输入开户行',
										}],
									})(
										<Input placeholder={`例如：中国工商银行`}></Input>
									)}
								</Form.Item>

								<Form.Item
									label="支行："
									className="formItemInline hideRequireTag mb20 mt20"
								>
									{getFieldDecorator('subbranch', {
										rules: [{
											 initialValue: this.state.subbranch,
											required: true,
											message: '请输入支行',
										}],
									})(
										<Input placeholder={`例如：长沙天河支行`}></Input>
									)}
								</Form.Item>

								<Form.Item
									label="账号："
									className="formItemInline hideRequireTag mb20 mt20"
								>
									{getFieldDecorator('subbranchs', {
										rules: [{
										  initialValue: this.state.subbranchs,
											required: true,
											message: '请输入账号',
										}],
									})(
										<Input placeholder={`请填写银行卡账号`}></Input>
									)}
								</Form.Item>

								<div className="flexdirections yslzxueshi ml38 mt34">
									<p className="fontcolorsyslhui1 font-14 w300 myysllineheight myyslminwidth"></p>
									<div className="myyslminwidth276 flexdirections">
										{/*<div  className="buttongo mycompitcursor" onClick={()=>this.yhBanksfalse()}><p className="fontwenzi mycompitcursor" >取消</p></div>*/}
										<Button type="primary" onClick={() => this.yhBankstrue()}>确定</Button>
									</div>
								</div>

							</Form>
						</React.Fragment>
					</div>

				</div>
			</div>
		)
	}
}

const Bankcardnumberverifications = Form.create({name: 'Bankcardnumberverification'})(Bankcardnumberverification);

export default Bankcardnumberverifications;

