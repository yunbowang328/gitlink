import React, {Component} from "react";
import {
    Input,
    Button,
    Divider,
	  Layout,
	  Spin
} from "antd";
import axios from 'axios';
import moment from 'moment';
import { getImageUrl } from 'educoder'
import '../courses/css/members.css';
import "../courses/common/formCommon.css"
import '../courses/css/Courses.css';
import beijintulogontwo from '../../../src/images/login/beijintulogontwo.png';
const { Header, Footer, Sider, Content } = Layout;
//educoder登入页面
var sectionStyle = {
    "height": "100%",
    "width": "100%",
    "min-width": "1000px",
// makesure here is String确保这里是一个字符串，以下是es6写法


};
var imgback = {
   " background-size":"cover",
"background-repeat":"no-repeat",
    backgroundImage: `url(${beijintulogontwo})`,
}
var imgmian ={
     width: "100%",
     background: `url(${beijintulogontwo})`,
     position: "relative",

}

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
    paddingTop: "40px",

}
class Loginqq extends Component {
    constructor(props) {
        super(props);
        this.state={
					login:undefined,
					password:undefined,
					data:undefined,
					logintypes:undefined,
					spinnings:true
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
	render() {
        let {data,logintypes,spinnings} = this.state;

        console.log(logintypes)
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
										<div>
											<style>
												{
													`
													.ottherimg{
													    width: 106px;
															height: 106px;
															border-radius: 50%;
													}
													`
												}
											</style>
											<div className={"textcenter"} >
												{data===undefined?"":data.image_url===undefined||data.image_url===null||data.image_url===""?"":<img className={"ottherimg"} src={getImageUrl(`images/${data&&data.image_url}`)}/>}
											</div>
											<div className={"textcenter wechatloginfont"}>
													为了更好的为您服务，请关联一个EduCoder账号
											</div>
										</div>

										<div className={"educontent clearfix wechatdivs"}>
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
													`
												}
											</style>
											<p>
												<Layout>
													<Sider>
															<div className={"wechatnewchat"}>
																新用户
															</div>
													</Sider>
													<Layout>
														<Header>欢迎来到EduCoder，新用户登录EduCoder可以到“账号管理-安全设置”中绑定手机/邮箱，以后可以用绑定的手机/邮箱，设置的密码登录EduCoder了。</Header>
														<Content className={"wechatContents"}>立即体验表示您已经同意我们的 <span><a href="https://forge.educoder.net/help?index=4" target="_blank" className={"color-blue"}> 服务协议条款</a></span></Content>
														<Footer>
															<Button className="login_btn font-16 wechattiyan" type="primary" style={{height:"46px"}} onClick={() => this.postwechatlogin(true)}
																							size={"large"}>立即体验</Button>
														</Footer>
													</Layout>
												</Layout>
											</p>
											<Divider />
											<p>
												<Layout>
													<Sider>
														<div className={"wechatweoldchat"}>
															老用户
														</div>
													</Sider>
													<Layout>
														<Header>已有EduCoder账号，可以输入您的账号和密码，将您的微信账号与EduCoder账号进行绑定。</Header>
														<Content className={"wechatContents"}>

															<Input placeholder="请输入手机号/邮箱/登录名"
																		 value={this.state.login}
																		 onInput={this.loginInputonChange}
																		 className={this.state.logintypes==="username"?"bor-red mb20 wechatpass":" mb20 wechatpass"}
																	   ></Input>

															<Input.Password value={this.state.password}
																		 autoComplete="new-password"
																		 onInput={this.passwordonChange}
																		 className={this.state.logintypes==="password"?"bor-red wechatpass":" wechatpass"}
																		 placeholder="请输入密码"
															></Input.Password>
														</Content>
														{this.state.logintypes==="username"?<span className={"color-red ml50"}>请填写账号</span>:this.state.logintypes==="password"?<span className={"color-red ml50"}>请填写密码</span>:""}
														<Footer>
															<Button className="login_btn font-16 wechattiyan" type="primary" style={{height:"46px"}} onClick={() => this.postwechatlogin(false,this.state.login,this.state.password)}
																			size={"large"}>绑定</Button>
														</Footer>
													</Layout>
												</Layout>
											</p>
										</div>

									</div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <div className="font-14 color-grey-9 " style={{marginTop:"20px"}}><span className="font-18">©</span>&nbsp;{moment().year()}&nbsp;EduCoder<span className="ml15 mr15">湘ICP备17009477号</span><a href="https://team.trustie.net" style={{"color":"#888"}} target="_blank">Trustie</a>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;IntelliDE inside.</div>
                    </div>
                </div>
							</Spin>
            </div>
        )
    }

}

export default Loginqq;
