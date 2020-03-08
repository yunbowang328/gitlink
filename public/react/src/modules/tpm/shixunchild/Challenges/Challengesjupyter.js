import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { markdownToHTML, configShareForCustom,getImageUrl,getUploadActionUrlthree,appendFileSizeToUploadFileAll} from 'educoder'
import { Divider, Tooltip,Upload,Modal,Statistic} from 'antd';
import LoadingSpin from '../../../../common/LoadingSpin';
import 'antd/lib/pagination/style/index.css';
import '../shixunchildCss/Challenges.css';
import axios from 'axios';
import {addjypertime} from "../../../../redux/actions/jupyter";
const $ = window.$;
const { Countdown } = Statistic;
class Challengesjupyter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ChallengesDataList: undefined,
			operate: true,
			startbtns: false,
			iFrameHeight: '0px',
			jupyter_port:0,
			jupyter_url:null,
			jupyter_urls:null,
			username:"",
			booljupyterurls:false,
			loading:false,
			boxoffsetHeigh:0,
			opentitletype:true,
			isopentitletype:"Less",
			enlarge:false,
			fileList:[],
			shuaxin:false,
			showtime:false,
			jupytertime:Date.now() +3600 * 1000,
			endtimes:false
		}
	}

	ChallengesList = () => {
		let id = this.props.match.params.shixunId;
		let ChallengesURL = `/shixuns/` + id + `/challenges.json`;

		axios.get(ChallengesURL).then((response) => {
			if (response.status === 200) {
				if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

				}else{
					configShareForCustom(this.props.shixunsDetails.name, response.data.description)
					this.setState({
						ChallengesDataList: response.data,
						sumidtype: false,
					});
					if(response.data.description=== ""||response.data.description===null||response.data.description===undefined){
						this.setState({
							isopentitletype:"Less",
						})
					}
					this.getjianjiesize()
				}
			}
		}).catch((error) => {
			//console.log(error)
		});
	}


	getjianjiesize=()=>{
		let {ChallengesDataList}=this.state;
		let boxoffsetHeigh;
		let box=document.getElementById("shixunchallengesid");

		if(box){
			boxoffsetHeigh=box.offsetHeight
			if(ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined){

			}else{
				if(this.state.isopentitletype==="greater"){

				}else{
					if(boxoffsetHeigh>=300){
						// if(this.state.enlarge===false){
						// 	this.setState({
						// 		opentitletype:false,
						// 		isopentitletype:"greater",
						// 		boxoffsetHeigh:boxoffsetHeigh
						// 	})
						// }else{
						//
						// }
						this.setState({
							opentitletype:false,
							isopentitletype:"greater",
							boxoffsetHeigh:boxoffsetHeigh
						})
					}else{
						this.setState({
							isopentitletype:"Less",
							boxoffsetHeigh:boxoffsetHeigh
						})
					}
				}

			}

		}
	}
	componentDidUpdate = (prevProps,prevState) => {

		//防止陷入无限循环
		if(prevState.ChallengesDataList!=this.state.ChallengesDataList){
			if(this.state.isopentitletype==="greater"){

			}else{
				this.getjianjiesize()
			}
		}

	}

	gettimeinfo_with_tpm=(datas,type)=>{
	let timeinfo_with_tpm=`/jupyters/timeinfo_with_tpm.json`
	axios.get(timeinfo_with_tpm, {params: datas}).then((response) => {
		if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

			}else{
				if(response.data.status===0){
					if(response.data.remainingSeconds===null){
						this.handleClickResetTpi()
					}else{
						let remainingSeconds=response.data.remainingSeconds;
						// let summain=3600 * 1000;
						let sums= remainingSeconds * 1000;
						let endsms=(remainingSeconds-300<=0?0:remainingSeconds-300)*1000
						// let sum=summain-sums;
						setTimeout(()=>{
							this.setState({
								jupytertime:Date.now() +sums,
								endtimes:endsms===0?Date.now()+1000:Date.now() +endsms
							})
						},500);
						if(type===true){
							this.props.showNotification('延长成功!');
						}
					}
				}else{

				}
			}
			}).catch((error) => {

			});
	}
	componentDidMount() {
		let that=this;
		setTimeout(this.ChallengesList(), 1000);
		let id = this.props.match.params.shixunId;
		let datas={
			identifier:id,
		}
		let ChallengesURL = `/jupyters/get_info_with_tpm.json`;
		axios.get(ChallengesURL, {params: datas}).then((response) => {
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				setTimeout(() => {
					this.setState({
						booljupyterurls:true,
					})
				}, 600)
			}else{
				if(response.data.status===0){
					this.gettimeinfo_with_tpm(datas)
					setTimeout(() => {
						this.setState({
							jupyter_url:response.data.url,
							jupyter_urls:response.data.url,
							jupyter_port:response.data.port,
							booljupyterurls:true,
						})
					}, 800)
				}else{
					setTimeout(() => {
						this.setState({
							booljupyterurls:true,
						})
					}, 600)
				}
			}


		}).catch((error) => {
			setTimeout(() => {
				this.setState({
					booljupyterurls:true,
				})
			}, 600)

		});
		setTimeout(this.getjianjiesize(), 1000);


		window.addEventListener('message', (e) => {
			if(e){
				if(e.data){
					if(e.data==="jupytermessage"){
						if(this.state.showtime===false){
							that.modifyjupyter();
							this.setState({
								showtime:true
							})
						}
					}
				}

			}

		});
	}

	updatamakedowns = () => {
		this.setState({
			loading:true,
			booljupyterurls:false
		})
		let id = this.props.match.params.shixunId;
		let ChallengesURL = `/jupyters/get_info_with_tpm.json`;
		let datas={
			identifier:id,
		}
		axios.get(ChallengesURL, {params: datas}).then((response) => {
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				setTimeout(() => {
					this.setState({
						booljupyterurls:true,
					})
				}, 600)
			}else{
				if(response.data.status===0){
					setTimeout(() => {
						this.setState({
							jupyter_url:response.data.url,
							jupyter_urls:response.data.url,
							jupyter_port:response.data.port,
							booljupyterurls:true,
						})
					}, 800)
					this.setState({

					})
				}else{
					setTimeout(() => {
						this.setState({
							booljupyterurls:true,
						})
					}, 600)
				}
			}
		}).catch((error) => {
			setTimeout(() => {
				this.setState({
					booljupyterurls:true,
				})
			}, 600)

		});

	}


	modifyjupyter=()=>{
		// this.props.showNotification('实训正在保存中...!');
		setTimeout(() => {
		let id=this.props.match.params.shixunId;
		var jupyter_port="";
		try{
			jupyter_port= parseInt(this.state.jupyter_port);
		}catch (e) {
			jupyter_port=this.state.jupyter_port;

		}
		const url=`/jupyters/save_with_tpm.json`;
		const data={
			identifier:id,
			jupyter_port:jupyter_port,
		}
		axios.get(url,  {params: data})
			.then((result) => {
				if (result.data.status === 0) {
					// this.props.showNotification(`应用成功`);
					// console.log("应用成功了");
					this.props.showNotification('保存成功!');
					setTimeout(() => {
						this.setState({
							showtime:false
						})
					}, 800)

				}else{
					this.setState({
						showtime:false
					})
					this.props.showNotification(result.data.message);
				}
			}).catch((error) => {
			this.setState({
				showtime:false
			})
			this.props.showNotification('实训保存失败!');
		})
		}, 800)
	}


	opentitle=()=>{

		this.setState({
			opentitletype:!this.state.opentitletype
		})
	}

	onclki=(bool)=>{
		this.setState({
			enlarge:bool
		})
	}

	Importingfiles=()=>{
		// 导入文件

	}

	handleChange = (info) => {
		if(info.file.status == "done" || info.file.status == "uploading" || info.file.status === 'removed'){
			let fileList = info.fileList;
			this.setState({
				fileList: appendFileSizeToUploadFileAll(fileList),
			});

			if(info.file.status === 'done'){
				if(info.file.response){
					if(info.file.response.status===-1||info.file.response.status==="-1"){

					}else{

					}
				}
			}

			if(info.file.response){
				if(info.file.response.status===-1||info.file.response.status==="-1"){

				}else{
					if(info.file.response.status===0){
						try {
							this.modifyjupyter();
						}catch (e) {

						}
					try {
						this.setState({
							jupyter_url : null,
							booljupyterurls:false,
						})
						setTimeout(()=>{
							this.setState({
								jupyter_url : this.state.jupyter_urls,
								booljupyterurls:true,
							})
						},1000);
						this.props.showNotification('上传文件成功!');
					}catch (e) {
						this.setState({
							jupyter_url : null,
							booljupyterurls:false,
						})
						setTimeout(()=>{
							this.setState({
								jupyter_url : this.state.jupyter_urls,
								booljupyterurls:true,
							})
						},1000);
					}
					}

				}
			}

		}
	}

	 handleClickResetTpisync_code=(id)=>{
		 this.setState({
			 jupyter_url : null,
			 booljupyterurls:false,
		 })
		const url = `/jupyters/reset_with_tpm.json`;
		axios.get(url,{params:{
				identifier:id
			}}).then((response) => {
			if(response.data.status===0){
				setTimeout(()=>{
					this.setState({
						jupyter_url :response.data.url,
						jupyter_port:response.data.port,
						booljupyterurls:true,
					})
				},500);
				this.props.showNotification('重置环境成功!');

				setTimeout(()=>{
					this.setState({
						booljupyterurls:true,
					})
				},1000);

			}
		});
	}
	// 重置实训
 handleClickResetTpi = () => {
		let id=this.props.match.params.shixunId;
		let that=this;
		Modal.confirm({
			title: '重置环境',
			content: (
				<p style={{ lineHeight: '24px' }}>
					是否确定重置环境？
				</p>
			),
			okText: '确定',
			cancelText: '取消',
			onOk () {
				that.handleClickResetTpisync_code(id)
			},
			onCancel() {

			},
		})
	}

	onFinish=()=>{
		Modal.destroyAll();
		let id=this.props.match.params.shixunId;
		let that=this;
		Modal.confirm({
			title: '倒计时截止',
			content: (
				<p style={{ lineHeight: '24px' }}>
					服务已中断，是否确认重置实验环境？
				</p>
			),
			okText: '确定',
			cancelText: '取消',
			onOk () {
				that.handleClickResetTpisync_code(id)
			}
		})
	}

	onendFinish=()=>{
		let id=this.props.match.params.shixunId;
		let that=this;
		Modal.confirm({
			title:"服务中断提醒",
			content: (
				<p style={{ lineHeight: '24px' }}>
					jupyter将于<span className={"Countdownfonttpm"}><Countdown value={this.state.jupytertime} format="HH:mm:ss" onFinish={this.onFinish}/></span>时间后服务中断，是否需要延长使用时间？
				</p>
			),
			okText: '立即延长',
			cancelText: '不需要',
			onOk () {
				that.onendhandleClickResetTpi(id)
			}
		})
	}


	onendhandleClickResetTpi=(id)=>{
		let datas={
			identifier:id,
		}
		const url = `/jupyters/active_with_tpm.json`;
		axios.get(url,{params:{
				identifier:id
			}}).then((response) => {
			if(response.data.status===0){
				this.gettimeinfo_with_tpm(datas,true)
				// setTimeout(()=>{
				// 	this.setState({
				// 		jupytertime:Date.now() + 900 * 1000,
				// 		endtimes:Date.now() + 300 * 1000
				// 	})
				// },500);
			}
		});
	}
	render() {
		let{ChallengesDataList,booljupyterurls,enlarge,fileList,endtimes}=this.state;
		let id = this.props.match.params.shixunId;
		//老师
		const  is_teacher = this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:false;
		//运营人员
		const  business  = this.props&&this.props.current_user&&this.props.current_user.business?this.props.current_user.business:false;
		//管理员
		const  admin = this.props&&this.props.current_user&&this.props.current_user.admin?this.props.current_user.admin:false;

		let  mysidentity =false;
		try {
			mysidentity =this.props.identity < 5 &&ChallengesDataList&& ChallengesDataList.shixun_status< 3?true:false;
		}catch (e) {

		}
		const uploadProps = {
			width: 600,
			fileList,
			multiple: false,
			data:{
				identifier:id,
			},
			//multiple 是否支持多选 查重的时候不能多选 不然弹许多框出来
			// https://github.com/ant-design/ant-design/issues/15505
			// showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
			// showUploadList: false,
			action: `${getUploadActionUrlthree()}`,
			showUploadList:false,
			onChange: this.handleChange,
			beforeUpload: (file) => {
				//上传前的操作
				// console.log('beforeUpload', file.name);
				if(file.name.indexOf('.ipynb') === -1){
					this.props.showNotification('请上传10m以内ipynb格式的文件!');
					return false

				}
				const isLt10M = file.size / 1024 / 1024 < 10;
				if (!isLt10M) {
					this.props.showNotification('请上传10m以内ipynb格式的文件!');
				}
				return isLt10M;
			},
		};
		return (
			<React.Fragment>
				<div >
					<style>
						{
							`
						.ant-notification{
						
						    position: fixed !important;
                z-index: 3000 !important;
						}
					  .ant-modal-wrap {
                position: fixed !important;
                z-index: 3000 !important;
                margin-top: 100px !important;
					  }
					  .Countdowntypes{
					    width:1px;
					    height:1px;
					    overflow: hidden;
				      display: block;
					  }
						`
						}
					</style>
					<span className={"Countdowntypes"}>
								{/*this.state.jupytertime*/}
						    <Countdown value={this.state.jupytertime} format="HH:mm:ss" onFinish={this.onFinish}/>
								{endtimes===false?"":<Countdown value={endtimes} format="HH:mm:ss" onFinish={this.onendFinish}/>}
					</span>

					<p className="clearfix mb20 edu-back-white">
						<div className={"shixunjianjie"}>
							<span className="font-16 fl">简介</span>
							<Tooltip placement="bottom" title={"编辑"}>
								<a style={{ display: this.props.identity < 5 && ChallengesDataList&&ChallengesDataList.shixun_status < 3 ? "block" : 'none' }}
									 href={"/shixuns/" + id + "/settings?edit=1"} className="fr color-blue font-14">
									编辑
								</a>
							</Tooltip>
						</div>

						<div>
							<style>
								{
									`
                    .markdown-body img{
                      min-height: 200px;
                    }
                    `
								}
							</style>

							{ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined?<style>
								{
									`
									#shixunchallengesid{
								    	max-height: 300px;
									    overflow: hidden;
									}
									`
								}
							</style>:""}
							{ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined?"":this.state.isopentitletype==="greater"&&this.state.opentitletype===true?
								<style>
									{
										`
                      #shixunchallengesid{
                          max-height:260px;
                          overflow: hidden;
                      }
                      `
									}
								</style>:""}

							<div className={"pd20"} id={"shixunchallengesid"}>
								<p id="ReactMarkdown" style={{overflow:'hidden'}}>
									{/*{ChallengesDataList === undefined ? "" :ChallengesDataList&&ChallengesDataList.description===null?"":*/}
									{/*	<div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(ChallengesDataList.description).replace(/▁/g,"▁▁▁")}}></div>*/}
									{/*}*/}

									{ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined?
										<div className="edu-tab-con-box clearfix edu-txt-center">
											{this.props.identity < 5?<img className="newedu-nodata-img mb20"
																										src={getImageUrl("images/educoder/shixunnodata.png")} />:<img className="edu-nodata-img mb20"
																																																									src={getImageUrl("images/educoder/nodata.png")} />}
											<p className="edu-nodata-p mb80">暂时还没有相关数据哦！</p>
										</div>
										:<p id="ReactMarkdown" style={{overflow:'hidden'}}>
											{ChallengesDataList === undefined ? "" :ChallengesDataList&&ChallengesDataList.description===null?"":
												<div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(ChallengesDataList.description).replace(/▁/g,"▁▁▁")}}></div>
											}
										</p>}
								</p>

							</div>
							<style>
								{
									`
                    .ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::before{
                        border: none !important
                    }
                    .ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::after{
                       border: none !important
                    }
                    `
								}
							</style>
							{/*this.state.enlarge===false?"":*/}
							{/*{this.state.isopentitletype==="Less"?"":this.state.opentitletype===true?<Divider dashed={true} onClick={()=>this.opentitle()} className={"pointer Breadcrumbfont color-grey-9 "}>*/}
							{/*	<a className={"font-14  color-grey-9"}>阅读全文 <i className={"iconfont icon-jiantou9 font-14"}></i></a>*/}
							{/*</Divider>:<Divider dashed={true} onClick={()=>this.opentitle()} className={"pointer Breadcrumbfont color-grey-9 "}>*/}
							{/*	<a className={"font-14  color-grey-9"}>收起全文 <i className={"iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu- font-14"}></i></a>*/}
							{/*</Divider>}*/}


						</div>

					</p>

					<div className="justify break_full_word new_li edu-back-white"
							 id="challenge_editorMd_description">
						<style>
							{
								`
								.intermediatecenter{
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								}
								
								.sortinxdirection{
									display: flex;
									flex-direction:row;
									}
									
									.xaxisreverseorder{
									display: flex;
									flex-direction:row-reverse;
									}
								;						
																}
								`
							}
						</style>
						{
							this.state.jupyter_url === null || this.state.jupyter_url === undefined ?
									enlarge===true?
										<div style={{
											height: '63px',
										}} className={enlarge?"shixunjianjiecballenges edu-back-white intermediatecenter  fangdaone":"shixunjianjiecballenges edu-back-white  mt20"}>

											<div className={enlarge?"sortinxdirection jupyterswidth":"sortinxdirection"}  >
												<div className="renwuxiangssi sortinxdirection">
													<div><p className="renwuxiangqdiv">任务详情</p></div>
													<div><p className="renwuxiangqdivtest ml1 shixunbingbaocun">（请将实训题目写在下方并保存）</p></div>
												</div>
												<div className="renwuxiangssit xaxisreverseorder">
													{
														enlarge===true?
															<i className="iconfont icon-suoxiao2 font-18 ml2 ysliconfont" style={{
																marginLeft: '30px',
															}}  onClick={()=>this.onclki(false)}></i>
															:
															<i className="iconfont icon-fangda font-18 ml2 ysliconfont" style={{
																marginLeft: '30px',
															}}  onClick={()=>this.onclki(true)}></i>
													}
													<style>
														{
															`
											.ant-upload-list{
											 display:none
											}
											`
														}
													</style>
													<Upload {...uploadProps}>
														<div className="challenbaocun" type="upload">
															<p className="challenbaocuntest" type="upload" >导入</p>
														</div>
													</Upload>
													<button type="button" className="ant-btn deletebuttom chongzhistyles"  onClick={this.handleClickResetTpi}><span>重置环境</span></button>

												</div>

											</div>
										</div>

									:	""
								:
								(
									admin===true||business===true||mysidentity===true?

										<div style={{
											height: '63px',
										}} className={enlarge?"shixunjianjiecballenges edu-back-white intermediatecenter  fangdaone":"shixunjianjiecballenges edu-back-white  mt20"}>

											<div className={enlarge?"sortinxdirection jupyterswidth":"sortinxdirection"}  >
												<div className="renwuxiangssi sortinxdirection">
													<div><p className="renwuxiangqdiv">任务详情</p></div>
													<div><p className="renwuxiangqdivtest ml1 shixunbingbaocun">（请将实训题目写在下方并保存）</p></div>
												</div>
												<div className="renwuxiangssit xaxisreverseorder">
													{
														enlarge===true?
															<i className="iconfont icon-suoxiao2 font-18 ml2 ysliconfont" style={{
																marginLeft: '30px',
															}}  onClick={()=>this.onclki(false)}></i>
															:
															<i className="iconfont icon-fangda font-18 ml2 ysliconfont" style={{
																marginLeft: '30px',
															}}  onClick={()=>this.onclki(true)}></i>
													}
													<style>
														{
															`
											.ant-upload-list{
											 display:none
											}
											`
														}
													</style>
													<Upload {...uploadProps}>
														<div className="challenbaocun" type="upload">
															<p className="challenbaocuntest" type="upload" >导入</p>
														</div>
													</Upload>
													<button type="button" className="ant-btn deletebuttom chongzhistyles"  onClick={this.handleClickResetTpi}><span>重置环境</span></button>

												</div>

											</div>
										</div>

										:
										""
								)

						}

						<style>
							{
								`
								iframe {
									border-width: 0px;
									border-style: inset;
									border-color: initial;
									border-image: initial;
							}
							iframe {
								  border-left: 1px solid #eeeeee;
									border-right: 1px solid #eeeeee;
									border-bottom: 1px solid #eeeeee;
							}
							#header{
							visibility:hidden;
							}
							
						
							
							
								`
							}
						</style>
						{
							admin===true||business===true||mysidentity===true?
								<div>
									<div className="pb47">
										{
											this.state.jupyter_url===null || this.state.jupyter_url===undefined?
												(
													booljupyterurls===false?
														<div className={enlarge?"fangdatwo edu-back-white fangdatwoswidth":""}>
															<LoadingSpin ></LoadingSpin>
														</div>
														:
														<div className={enlarge?"fangdatwo edu-back-white fangdatwoswidth":""}>
															<div className="mt50 intermediatecenter juplbool">
																<span className="icon iconfontysl icon-jiazaishibai1"></span>
																<p className="intermediatecenter sortinxdirection mt5 juplboolp"><p className="colorbluetest">加载实训失败，</p><p className="colorbluetwo" onClick={()=>this.updatamakedowns()}>重新加载</p></p>

															</div>
														</div>
												)
												:
												<div className={enlarge?"fangdatwo edu-back-white":""}>
												<iframe src={this.state.jupyter_url} className={enlarge?"fangdatwo":""}
														 scrolling="no" id="frame"
														name="framename" width="100%" height="700" frameBorder="0"
										></iframe>
												</div>

										}
									</div>
								</div>
								:""
						}
					</div>
				</div>

			</React.Fragment>

		)
	}
}

export default Challengesjupyter;
{/*{*/}
{/*	booljupyterurls===true?*/}
{/*		(*/}
{/*			this.state.jupyter_url === null?*/}
{/*				<div className="mt50 intermediatecenter juplbool">*/}
{/*					<span className="icon iconfontysl icon-jiazaishibai1"></span>*/}
{/*					<p className="intermediatecenter sortinxdirection mt5 juplboolp"><p className="colorbluetest">加载实训失败，</p><p className="colorbluetwo" onClick={()=>this.updatamakedowns()}>重新加载</p></p>*/}

{/*				</div>*/}

{/*				:""*/}
{/*		)*/}
{/*		:""*/}
{/*}*/}
