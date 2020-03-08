import React, {Component} from "react";
import {
    Input,
    Button,
    Divider,
	  Layout,
	  Spin,
	  Tabs
} from "antd";
import axios from 'axios';
import moment from 'moment';
import { getImageUrl } from 'educoder'
import LoginRegisterComponent from '../user/LoginRegisterComponent';
import '../courses/css/members.css';
import "../courses/common/formCommon.css"
import '../courses/css/Courses.css';
import './Otherlogin.css';
const { Header, Footer, Sider, Content } = Layout;


var newContainer={
    // background: `url(${beijintulogontwo})`,
    backgroundPosition: "center" ,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "100% 100%",
    height:" 100%",
    width:" 100%",
    position: "absolute",
    top: "0px",
    bottom: "0px",
     minHeight: "100%",

}
class Otherlogin extends Component {
    constructor(props) {
        super(props);
        this.state={
					login:undefined,
					password:undefined,
					data:undefined,
					logintypes:undefined,
					spinnings:true,
					setbuttontypes:0,
					showbool: 1,
					loginstatus:false,
					logini:2,
					namezh:"",
					passmm:"",
				}

    }


    componentDidMount() {

			let url = `/users/get_user_info.json`
			axios.get(url).then((result)=> {
				console.log(result);
				if(result){
					this.setState({
						data:result.data,
						spinnings:false
					})
				}
			}).catch((error)=>{
				this.setState({
					spinnings:false
				})
			})


		}


		loginInputonChange=(e)=>{
			if(e.target.value===undefined||e.target.value===""||e.target.value===null){

			}else{
				if(this.state.logintypes==="username"){
					this.setState({
						logintypes:undefined
					})
				}
			}

			this.setState({
				login:e.target.value,
			})
		}
		passwordonChange=(e)=>{
			if(e.target.value===undefined||e.target.value===""||e.target.value===null){

			}else{
				if(this.state.logintypes==="password"){
					this.setState({
						logintypes:undefined
					})
				}
			}

			this.setState({
				password:e.target.value,
			})
		}
	postwechatlogin=(type,username,password)=>{

		let query=this.props.location.search;
		const types = query.split('?type=');
    if(type===false){
    	if(username===undefined||username===""||username===null){
    		this.setState({
					logintypes:"username"
				})
				return
			}
			if(password===undefined||password===""||password===null){
				this.setState({
					logintypes:"password"
				})
				return
			}
		}


		let url = "/bind_user.json";
		axios.post(url, {
			type: types[1]==="qq"?"qq":'wechat',
			not_bind:type,
			username:username,
			password:password
		}).then((response) => {
			if(response.data.status===0){
				 window.location.href="/"
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	setbuttontype=(type)=>{
    	this.setState({
				setbuttontypes:type
			})
	}

	gotohome=()=>{
		this.props.history.replace("/");
	}

	render() {
        let {data,setbuttontypes,spinnings} = this.state;

        return (
            <div style={newContainer} className=" clearfix" >
							<Spin size="large" spinning={spinnings} >
							<style>
								{
									`
									#root{
									background:#fff !important;
								   }
								`
								}
							</style>

                <div>
									<div style={{
										"width": "100%"
									}}>


										<div className={"educontent clearfix wechatdiv"}>
											<style>
												{
													`
													.ant-layout,.ant-layout-sider,.ant-layout-content{
													     background: #FFF;
													}
													.ant-layout-header {
																height: 50px;
																padding: 0 48px;
																line-height: inherit;
																background: #001529;
																background: #FFF;
															  font-size: 14px;
																font-family: PingFangSC-Regular,PingFangSC;
																font-weight: 400;
																color: rgba(0,0,0,1);
														}
														.ant-layout-footer {
																padding: 0px 50px;
														    background: #FFF;
														}
														.wechattiyan{
																width:300px;
																height:46px;
																background:rgba(25,144,255,1);
																border-radius:4px;
														}
														.ant-divider-horizontal{
														    margin: 0px 0 30px 0px;
														}
 														.ant-divider{
 														    background: #EEEEEE;
 														}
													`
												}
											</style>
											<Content className={"wexinconter"}>
												<div className={"fl "}>
													<img alt="高校智能化教学与实训平台" className="logoimg"
															 src={getImageUrl("images/avatars/LaboratorySetting/1nav")} />
												</div>
												<div className={"fr wexinconterfr"} onClick={()=>this.gotohome()}>
													  返回首页
												</div>
											</Content>
											<p>
												 <div className={setbuttontypes===0?"wexintitle fl":"selectwexintitle fl"} onClick={()=>this.setbuttontype(0)}>
													 <i className={"iconfont icon-bangding font-25 mr10"}></i>已有EduCoder账号，请绑定
												 </div>
													<div className={setbuttontypes===1?"wexintitle fl":"selectwexintitle fl"}  onClick={()=>this.setbuttontype(1)}>
														<i className={"iconfont icon-bianji4 font-20 mr10"}></i>没有EduCoder账号，使用手机号注册并绑定
													</div>
											</p>
											<Divider />
											{setbuttontypes===0?<p>
												<Layout>
													<Layout>
														<Header className={"wexinHeader"}>为了更好的为您服务，请输入您的账号和密码，将您的微信账号与EduCoder账号进行绑定</Header>
														<Content className={"wechatContent mt50"}>
															<Input placeholder="请输入手机号/邮箱/登录名"
																		 value={this.state.login}
																		 onInput={this.loginInputonChange}
																		 className={this.state.logintypes==="username"?"bor-red mb20 wechatpass":" mb20 wechatpass"}
																	   ></Input>
														</Content>
														<Content className={"wechatContent"}>
															<Input.Password value={this.state.password}
																							autoComplete="new-password"
																							onInput={this.passwordonChange}
																							className={this.state.logintypes==="password"?"bor-red wechatpass":" wechatpass"}
																							placeholder="输入密码，注意区分大小写"
															></Input.Password>
														</Content>
														{this.state.logintypes==="username"?<span className={"color-red ml50  weixinmarauto"}>请填写账号</span>:this.state.logintypes==="password"?<span className={"color-red ml50 weixinmarauto"}>请填写密码</span>:""}
														<Footer className={"weixinfooter mt30"}>
															<Button className="login_btn font-16 wechattiyan" type="primary" style={{height:"46px"}} onClick={() => this.postwechatlogin(false,this.state.login,this.state.password)}
																			size={"large"}>绑定</Button>
														</Footer>
													</Layout>
												</Layout>
											</p>:<p className={"weixinnelogin"}>
												<LoginRegisterComponent {...this.props} {...this.state}
																								weixinlogin={true}
																								Setshowbool={(e)=>this.Setshowbool(e)} ></LoginRegisterComponent>
											</p>}


										</div>

									</div>

                </div>
							</Spin>
            </div>
        )
    }

}

export default Otherlogin;
