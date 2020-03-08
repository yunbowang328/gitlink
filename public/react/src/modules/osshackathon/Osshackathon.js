import React, {Component} from 'react';
import axios from 'axios';
import {SnackbarHOC, WordsBtn,getImageUrl,markdownToHTML} from 'educoder';
import {Row, Col,Input,Divider,Card,Button,Pagination,Breadcrumb,Icon,Spin} from 'antd';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../courses/common/CNotificationHOC';
import Osshackathonmd from './Osshackathonmd';
import './Osshackathon.css';
import Osshackathonmodel from "./Osshackathonmodel";
const { Search } = Input;
class Osshackathon extends Component {

	constructor(props) {
		super(props)
		this.state = {
			page:1,
			limit:10,
			search:undefined,
			data:undefined,
			hackathonedit:false,
			Osshackathonmodeltype:false,
			spinning:false,
			opentitletype:true,
			boxoffsetHeigh:0
		}
	}

	componentDidMount() {
		this.getosshackathonlist();
		window.document.title = '竞赛报名';
	}

	getosshackathon=(page,limit,search)=>{
		this.setState({
			spinning:true
		})
		let url=`/osshackathon.json`;
		axios.get(url,{params:{
				page:page,
				limit:limit,
				search:search,
			}}).then((result)=>{
			if(result.status==200){
				this.setState({
						data:result.data,
				  	spinning:false
				})
			}else{
				this.setState({
					spinning:false
				})
			}
		}).catch((error)=>{
			this.setState({
				spinning:true
			})
		})

	}


	getosshackathonlist=()=>{
		let {page,limit,search}=this.state;
		this.setState({
			page:1,
			search:undefined
		})
		this.getosshackathon(1,limit,undefined)
	}


	componentDidUpdate = (prevProps,prevState) => {
		if(prevState.data!=this.state.data){
				//防止陷入无限循环
				let box=document.getElementById("Osshackathonfontlists");
				if(box){
					this.setState({
						boxoffsetHeigh:box.offsetHeight
					})
				}
		}
	}

	PaginationTask=(pageNumber)=>{
		let {hackathonedit}=this.state;
		if(hackathonedit===true){
			this.props.showNotification(`请先保存或者关闭编辑状态`);
		}else {
			this.setState({
				page: pageNumber
			})
			let {page, limit, search} = this.state;
			this.getosshackathon(pageNumber, limit, search)
		}
	}

	hackathonedit=(id)=>{
		//管理员编辑title
	 this.setState({
		 hackathonedit:true
	 })
	}

	hidehackathonedit=()=>{
		this.setState({
			hackathonedit:false
		})
	}

	Signupentry=(id)=>{
	//	用户报名
		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		if(this.props.checkIfProfileCompleted()===false){
			this.props.showProfileCompleteDialog()
			return
		}
		//判断是否绑定邮箱
 
	  if(this.props.user.email===null&&this.props.user.phone===null){
			this.props.showhideAccountPhoneemailDialog()
			return
		}

		this.props.confirm({
			content: `是否确认报名?`,
			onOk: () => {
				this.Signupentrys(id)
			}
		})


	}
	Signupentrys=(id)=>{
		let url=`/osshackathon/${id}/entry.json`;
		axios.post(url
		).then((response) => {
			if(response.data.status===0){
				this.getosshackathonlist()
				this.props.showNotification(`报名成功，预祝您夺得桂冠`);
			}
		}).catch((error) => {
			console.log(error)
		})
	}

	editSignupentry=(id,name,description)=>{
		let {hackathonedit}=this.state;
		if(hackathonedit===true){
			this.props.showNotification(`请先保存或者关闭编辑状态`);
		}else{
			//	管理员编辑项目
			this.setState({
				Osshackathonmodeltype:true
			})
			if(id===undefined){
				this.setState({
					modelid:undefined,
					modelname:undefined,
					modeldescription:undefined
				})
			}else{
				this.setState({
					modelid:id,
					modelname:name,
					modeldescription:description
				})
			}
		}

	}

	hideeditSignupentry=(id)=>{
		//	管理员取消项目
		this.setState({
			Osshackathonmodeltype:false
		})
	}


	delSignupentry=(id)=>{
		//	管理员删除项目
		let {hackathonedit}=this.state;
		if(hackathonedit===true){
			this.props.showNotification(`请先保存或者关闭编辑状态`);
		}else {
			this.props.confirm({
				content: `是否确认删除该项目?`,
				onOk: () => {
					this.delSignupentrys(id)
				}
			})
		}
	}
	delSignupentrys=(id)=>{
		let url=`/osshackathon/${id}.json`;
		axios.delete(url)
			.then((response) => {
				if (response.data.status == 0) {
					// {"status":1,"message":"删除成功"}
					this.getosshackathonlist();
					this.props.showNotification(`删除成功`);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}


	onsearchvalue=(value)=>{
		let {hackathonedit}=this.state;
		if(hackathonedit===true){
			this.props.showNotification(`请先保存或者关闭编辑状态`);
		}else {
			this.setState({
				search:value
			})
			if(value.length>300){
				this.props.showNotification(`搜索字数大于300个字`);
			}
			let {page,limit,search}=this.state;
			this.getosshackathon(page,limit,value)
		}

	}

	onsetsearchvalue=(e)=>{

		this.setState({
			search:e.target.value
		})
	}

	opentitle=()=>{
		this.setState({
			opentitletype:false
		})
	}
	render() {
		let {page,data,hackathonedit,opentitletype}=this.state;

		return (
			<div className="newMain clearfix  newMainybot">
				<style>
					{
						`
						.ant-btn-primary{
							background: #4CACFF;
							border-color: #4CACFF;
						}
						.ant-btn-primary:hover, .ant-btn-primary:focus {
								color: #4CACFF;
								background-color: #40a9ff;
								border-color: #40a9ff;
						}
						`
					}
				</style>

				<div className={"educontent  mb60 persmstyle"} style={{width: "1200px", marginTop: "26px"}}>

					<div className="registrationback"
							 style={{"background": `url(${getImageUrl(`images/educoder/competitions/heikesong.jpg`)})`,"height":"360px"}}
					></div>
					<Spin spinning={this.state.spinning}>
					{this.props.user&&this.props.user.admin===true?<Row className={"mt20"}>

						<Col span={6}>
							<Search
						  className={"Osshackathon-btn-primary"}
							placeholder="请输入项目名称进行搜索"
							enterButton="搜索"
							size="large"
							value={this.state.search}
							onInput={(e)=>this.onsetsearchvalue(e)}
							onSearch={value => this.onsearchvalue(value)}
							/>
						</Col>

						<Col span={3} className={"fr textright"}>
								<div>
									报名总数：<span className={"color-red"}>{data&&data.hackathon.hackathon_users_count}</span> 个
								</div>
						</Col>

					</Row>:""}

					{hackathonedit===true?"":<Row className={"mt20"}>
						<Col span={6} className={"Osshackathonfont"}>
							{data&&data.hackathon.name}
						</Col>
						{this.props.user&&this.props.user.admin===true?<Col span={3} className={"fr textright"}>
							<Button type="primary" className={"OsshackprimaryButtonsyle"} onClick={()=>this.hackathonedit(data&&data.hackathon.id)}>编辑</Button>
						</Col>:""}
					</Row>}
					{hackathonedit===true?"":	<style>
						{
							`
							.ant-divider-horizontal{
    						margin: 19px 0;
							}
							`
						}
					</style>}

					{hackathonedit===true?"":<Divider />}

						{opentitletype===true?<style>
							{
									`
									.Osshackathonfontlist{
								    	max-height: 180px;
									    overflow: hidden;
									}
									`
							}
						</style>:""}
					{hackathonedit===true?"":<p className={"Osshackathonfontlist mb30"} id={"Osshackathonfontlists"}>
						{data&&data.hackathon.description===null?"":<div className={"markdown-body"}
									dangerouslySetInnerHTML={{__html: markdownToHTML(data&&data.hackathon.description).replace(/▁/g, "▁▁▁")}}></div>}
					</p>}

						{opentitletype===true&&this.state.boxoffsetHeigh===180?<Divider dashed={true} onClick={()=>this.opentitle()} className={"pointer Breadcrumbfont"}>展开阅读全文<Icon type="down" /></Divider>:""}

					{hackathonedit===true?<Osshackathonmd
						getosshackathon={()=>this.getosshackathonlist()}
						hidehackathonedit={()=>this.hidehackathonedit()}
						{...this.props}
						{...this.state}
					/>:""}
						{this.state.Osshackathonmodeltype===true?<Osshackathonmodel
						getosshackathon={()=>this.getosshackathonlist()}
						hideeditSignupentry={()=>this.hideeditSignupentry()}
						{...this.props}
						{...this.state}
					/>:""}
					{this.props.user&&this.props.user.admin===true?<Row className={"mb20 mt30"}>
						<Col span={8}></Col>
						<Col span={8}><Button type="primary" className={"OsshackprimaryButton OsshackprimaryButtonsyle"} onClick={()=>this.editSignupentry()}><Icon type="plus" />新建项目</Button></Col>
						<Col span={8}></Col>
					</Row>:""}
					{/*学生身份*/}
					{
						this.props.user&&this.props.user.admin===false?data&&data.hacks.length==0?"":data&&data.hacks.map((item,key)=>{
							return(
								<Card className={"OsshackathonCard mb20"} key={key}>
									<Row>
										<Col span={20} className={"OsshackathonCardtitle"}>
											{item.name}
										</Col>

										<Col span={6} className={"fr textright"}>
											<span style={{"line-height":"30px","margin-right": "30px"}}>报名人数：{item.hack_users_count}</span>
											{item.entry_info===true?<Button type="primary fr mr20" disabled>
												已报名
											</Button>:<Button type="primary fr issignup" onClick={()=>this.Signupentry(item.id)}>立即报名</Button>}
										</Col>
									</Row>
									<p className={"mt20"}>{item.description}</p>
								</Card>
							)
						}):""
					}



					{/*教师身份*/}
					{this.props.user&&this.props.user.admin===true?<style>
						{
							`
							.ant-col-pull-6 {
									right: 17%;
							}
							.ant-col-18 {
									width: 82%;
							}
							.CompetitionsIndexbottomvalue{
   							  text-align: center;
							}
							`
						}
					</style>:""}
					{
						this.props.user&&this.props.user.admin===true?data&&data.hacks.length==0?"":data&&data.hacks.map((item,key)=>{
							return(
								<Card className={"OsshackathonCard mb20"}>
									<Row>
										<Col span={20} className={"OsshackathonCardtitle"}>
											{item.name}
										</Col>
										<Col span={4} className={"fr textcenter width14bai"}>
											<Breadcrumb separator="｜">
												<Breadcrumb.Item className={"Breadcrumbfont iscursor"} onClick={()=>this.editSignupentry(item.id,item.name,item.description)}>编辑</Breadcrumb.Item>
												<Breadcrumb.Item className={"Breadcrumbfont iscursor"} onClick={()=>this.delSignupentry(item.id)}>删除</Breadcrumb.Item>
											</Breadcrumb>
										</Col>
									</Row>

									<Row className={"mt20"}>
										<Col span={4} push={20} className={"minheight50px borderDEDEDE"}>
											<div className={"pl80pt6"}>
												<Row gutter={16}>
													<Col className="gutter-row" span={15}>
														<div className="gutter-box Osshackprimaryfonttop">{item.hack_users_count}</div>
													</Col>
												</Row>

												<Row gutter={16}>
													<Col className="gutter-row" span={15}>
														<div className="gutter-box CompetitionsIndexbottomvalue">报名数</div>
													</Col>
												</Row>
											</div>
										</Col>
										<Col span={18} pull={6} className={"minheight50px ml5"}>
											{item.description}
										</Col>
									</Row>


								</Card>
							)}):""
					}


					{data&&data.hacks_count>10?data&&data.hacks.length===0?"":<div className="mb40 edu-txt-center padding20-30" >
						<Pagination
							showQuickJumper
							defaultCurrent={1}
							pageSize={10}
							total={data&&data.hacks_count}
							current={page}
							onChange={this.PaginationTask}
						/>
					</div>:""}
					</Spin>
				</div>

			</div>
		)
	}

}



export default CNotificationHOC() (TPMIndexHOC (Osshackathon)) ;