import React, { Component } from 'react';

import { SnackbarHOC, getImageUrl, WordsBtn } from 'educoder';
import { Form, Button, Input ,Modal  } from 'antd'
import Modals from "../../modals/Modals";
import '../../courses/css/Courses.css'
import './common.css'
import axios from 'axios'

class AccountSecure extends Component {
	constructor (props) {
		super(props)
		this.state = {
			Modalstype:false,
			list:[{
				en_type: "wechat",
				id: null,
				nickname: "",
			},{
				en_type: "qq",
				id: null,
				nickname: "",
			}
				]
		}
	}
	IsPC=()=>{
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}

	componentDidMount() {
		let {basicInfo}=this.props;
		let {list}=this.state;
    let newlist=list;
   if(basicInfo===undefined||JSON.stringify(basicInfo) == "{}"||basicInfo&&basicInfo.open_users.length===0){

	 }else{
		 basicInfo&&basicInfo.open_users.map((item,key)=>{
			 newlist.map((items,keys)=>{
				 	if(items.en_type===item.en_type){
						items.id=item.id;
						items.nickname=item.nickname;
					}
				 })
		 })
	 }

   this.setState({
		 list:newlist
	 })

	}

	componentDidUpdate=(prevProps)=>{
		if(prevProps!=this.props){
			let {basicInfo}=this.props;
			let {list}=this.state;
			let newlist=list;
			if(basicInfo===undefined||JSON.stringify(basicInfo) == "{}"||basicInfo&&basicInfo.open_users.length===0){

			}else{
				basicInfo&&basicInfo.open_users.map((item,key)=>{
					newlist.map((items,keys)=>{
						if(items.en_type===item.en_type){
							items.id=item.id;
							items.nickname=item.nickname;
						}
					})
				})
			}

			this.setState({
				list:newlist
			})
		}
	}
	showModal=()=>{
		this.setState({
			visible: true,
		});
	};

	handleOk=(e)=> {
		this.setState({
			visible: false,
		});
	};

	handleCancel=()=>{
		this.setState({
			visible: false,
		});
	};

	Cancelundologins=()=>{
		this.setState({
			Modalstype:false,
			ModalCancel:this.Cancelundologin,
			ModalSave:this.Saveundologin,
		})
	}

	Saveundologin=(type,id)=>{
		let {basicInfo}=this.props;
		let {list}=this.state;
		let newlist=list;
		let url=`/users/accounts/${basicInfo.id}/open_users/${id}.json`;
		axios.delete(url).then((result)=>{
			if(result.data.status===0){
				newlist.map((item,key)=>{
					if(item.en_type===type){
						item.id=null
					}
				})
				this.setState({
					list:newlist
				})
				this.props.showNotification('解绑成功');
				this.Cancelundologins()
				this.props.getBasicInfo()
			}
		}).catch((error)=>{
			console.log(error)
		})
	}

	undologin=(type,id)=>{
    this.setState({
			Modalstype:true,
			Modalstopval:type==="wechat"?"是否确定解绑微信账号？":"是否确定解绑QQ账号？",
			ModalCancel:this.Cancelundologins,
			ModalSave:()=>this.Saveundologin(type,id),
		})
	}
	openqqlogin=()=>{
		window.location.href=`https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101508858&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginqq&state=account,${window.location.host}&response_type=code`
	}

	openphoneqqlogin=()=>{
		window.open(
			`https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101508858&daid=383&pt_skey_valid=0&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=101508858&response_type=code&scope=get_user_info&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginqq&state=account,${window.location.host}&response_type=code`
		)
	}
	render() {
		let flag = this.IsPC(); //true为PC端，false为手机端
		let {list}=this.state;
    console.log(window.location.host)
		return (
			<div>
				<div className="basicForm settingForm">
					{/*提示*/}
					<Modals
						modalsType={this.state.Modalstype}
						modalsTopval={this.state.Modalstopval}
						modalCancel={this.state.ModalCancel}
						modalSave={this.state.ModalSave}
						loadtype={this.state.loadtype}
					/>
					<style>{`

            // .flexRow {
            //   padding: 15px 0;
            // }
              .flexRow .name {
                margin-left: 20px;
                color: #999999;

                text-align: center;
                flex: 0 0 100px;
              }
              .flexRow .description {
                flex: 1;
                color: #CDCDCD;
              }
                .description span {
                  color: #05101A;
                }
              .flexRow .status {
                width: 100px;
                color: #28AC7F;
                text-align: right;
              }
            // .flexTable .flexTable {
            //   border-bottom: 1px solid #EBEBEB;
            // }


            .settingForm label{
              color: #999999;
              font-size: 14px !important ;
              margin-left: 120px;
            }
            .settingForm input {
              width: 340px;
            }
            .settingForm input.validateInput  {
              width: 220px;
            }
            .settingForm .formItemInline button {
              width: 110px;
              margin-left: 10px;
            }

            .settingForm .ant-form-item-label {
              width: 204px;
            }
            .formItemInline .ant-form-explain{
              position:absolute;
              bottom:-17px;
              left:0px;
              width:100%;
            }
            .weixinlogo{
               font-size: 40px !important;
   						 color: #4eaf2b;
            }
             .qqlogo{
               font-size: 40px !important;
   						 color: #29a1e6;
            }

            .lineheight60{
            line-height: 60px;
            }
            .pt19{
    						padding-top: 19px;
            }
          `}</style>
					<div className="title">绑定登录账号</div>

					<Form>

						{list.map((item,key)=>{
									return(
										<div className="flexTable" key={key}>
											<div className="flexTable">
												<div className="flexRow">
													<div className="name">
														{item.en_type!="qq"?<i className={"iconfont icon-weixin2 weixinlogo mr10"}></i>:<i className={"iconfont icon-qq qqlogo mr10"}></i>}
														{item.en_type!="qq"?<span className={"color-ooo"}>微信</span>:<span className={"color-ooo"}>QQ</span>}
													</div>

													<div className="description lineheight60">
														<span className={"color-grey-9 ml80"}>{item.id===null?"":item.nickname}</span>
													</div>

													<div className="status pt19">
														{item.en_type!="qq"?<WordsBtn style={ item.id===null?"blue":"colorgrey9"} className={item.id===null?"borderBottom":""}
																													onClick={
																														item.id===null?() => this.showModal("wechat"):() => this.undologin("wechat",item.id)
																													}
														>{item.id===null?"绑定":"解绑"}</WordsBtn>:<WordsBtn style={ item.id===null?"blue":"colorgrey9"} className={item.id===null?"borderBottom":""}
																																						 onClick={
																																							 item.id===null?flag===true?() => this.openqqlogin():() => this.openphoneqqlogin():() => this.undologin("qq",item.id)
																																						 }
														>{item.id===null?"绑定":"解绑"}</WordsBtn>}
													</div>
												</div>
											</div>
										</div>
									)
							})
						}

					</Form>
					<style>
						{
							`
									  .ml70{
									      margin-left: 70px;
									  }
									`
						}
					</style>
					<Modal
						closable={false}
						footer={null}
						visible={this.state.visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
					>
						<div>
							<iframe
								className={"weixinheight390 ml70"}
								frameBorder="0"
								sandbox="allow-scripts allow-same-origin allow-top-navigation"
								scrolling="no"
								src={`https://open.weixin.qq.com/connect/qrconnect?appid=wx6b119e2d829c13fa&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginstart&response_type=code&scope=snsapi_login&state=account,${window.location.host}#wechat_redirect`}></iframe>
							<p className="clearfix pagemancenter">
								<a className={"startlogin color-blue"} onClick={()=>this.handleCancel()}>取消</a>
							</p>
						</div>
					</Modal>
				</div>
				<div style={{color: '#989898', marginLeft: '20px'}}>* 我们确保你所提供的信息均处于严格保密状态，不会泄露</div>
			</div>
		);
	}
}
const WrappedAccountSecure = Form.create({ name: 'AccountSecure' })(AccountSecure);

export default WrappedAccountSecure;
