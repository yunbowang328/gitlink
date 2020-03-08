import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Tooltip,Modal,Icon,Spin,message} from 'antd';
import '../../paths/ShixunPaths.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailCardsEditAndEdit from '../../paths/PathDetail/DetailCardsEditAndEdit';
import DetailCardsEditAndAdd from "../../paths/PathDetail/DetailCardsEditAndAdd";
import Modals from "../../modals/Modals";
import NoneData from "../coursesPublic/NoneData";
class YslDetailCards extends Component{
	constructor(props){
		super(props)
		this.state={
			showparagraph:false,
			showparagraphkey:"",
			showparagraphindex:"",
			shixunsreplace:false,
			hidestartshixunsreplacevalue:"",
			shixunsmessage:"",
			startshixunCombattype:false,
			isSpin:false,
			idsum:undefined,
			pathCardsedittype:false,
			pathid:undefined,
			editbuttomtype:false,
			editbuttomtypeadd:false,
			pathlistedit:undefined,
			delecttype:false,
			Modalstype:false,
			Modalstopval:'',
			Modalsbottomval:'',
		}
		//idsum 是否点击这个
		//pathCardsedittype 是否是在编辑模式
		//editbuttomtypeadd 是否已经是编辑模式
		//pathid课堂id
		//pathlistedit 编辑返回的数据

	}

	showparagraph =(key,index)=>{
		this.setState({
			showparagraph:true,
			showparagraphkey:key,
			showparagraphindex:index
		})
	};
	hideparagraph=()=>{
		this.setState({
			showparagraph:false,
			showparagraphkey:null,
			showparagraphindex:null
		})
	};
	startgameid=(id)=>{
		// 上面传过来的方法是用来没登入弹出弹框的
    try {
			let {userlogin} = this.props;
			if (userlogin === undefined) {
				this.props.Tojoinclass();
				return
			}
			if (userlogin === "") {
				this.props.Tojoinclass();
				return;
			}
		}catch (e) {

		}

     try {
			 if(this.props.isNotMember()===true){
				 //这个是外部传过来的
				 this.props.Startlearningtwo();
				 return
			 }
		 }catch (e) {

		 }

		let url = "/shixuns/" + id + "/shixun_exec.json";
		axios.get(url).then((response) => {

			if (response.data.status === -2) {
				this.setState({

					shixunsreplace:true,
					hidestartshixunsreplacevalue:response.data.message+".json"
				})
			} else if (response.data.status === -1) {
				console.log(response)
			}else if(response.data.status===-3){
				this.setState({
					shixunsmessage:response.data.message,
					startshixunCombattype:true,
				})
			} else {
				// console.log("开始学习了");
				window.open("/tasks/" + response.data.game_identifier,'_blank');
				//这个是传过来  调用刷新
				this.props.getPathCardsList();
				// window.location.href = path
				// let path="/tasks/"+response.data.game_identifier;
				// this.props.history.push(path);
			}
		}).catch((error) => {

		});

	};

	componentDidMount(){
		// console.log("YslDetailCards start");
		let pathid=this.props.match.params.coursesId;
		this.setState({
			pathid:pathid
		})
	}


	Pathlisteditundefined=()=>{
		this.setState({
			pathlistedit:undefined
		})
	};
	hidestartshixunsreplace=(url)=>{
		this.setState({
			isSpin:true,
		})
		axios.get(url).then((response) => {
			// debugger
			if(response.status===200){
				// let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
				// this.props.history.push(path);
				message.success('重置成功，正在进入实训！');
				this.startgameid(response.data.shixun_identifier);
				this.setState({
					shixunsreplace:false,
					isSpin:false,
					startbtn:false,
				})

				// message.success('重置成功，正在进入实训！');
				// this.startshixunCombat();
			}}
		).catch((error) => {
			this.setState({
				isSpin:false,
				shixunsreplace:false,
			})
		});

	}
	hidestartshixunCombattype=()=>{
		this.setState({
			startshixunCombattype:false
		})
	};
	// 关卡的上移下移操作
	operations = (url) => {
		let newurl = url+".json"
		axios.get(newurl).then((response) => {
			if(response.data.status===1){
				this.props.getPathCardsList();
			}
		}).catch((error) => {
			console.log(error);
		})

	};

	//章节下移
	chapterdown=(id)=>{
		let url=`/course_stages/${id}/down_position.json`;
		axios.post(url).then((response) => {
			if(response){
				if(response.data){
					if(response.data.status===0){
						this.props.showNotification(`下移成功`);
						this.props.getPathCardsList();
					}else{
						this.props.showNotification(`下移失败`);
					}
				}else{
					this.props.showNotification(`下移失败`);
				}
			}else {
				this.props.showNotification(`下移失败`);
			}
		}).catch((error) => {
			console.log(error)
		});
	};

	//章节上移
	chapterup=(id)=>{
		let url=`/course_stages/${id}/up_position.json`;
		axios.post(url).then((response) => {
			if(response){
				if(response.data){
          if(response.data.status===0){
						this.props.showNotification(`上移成功`);
						this.props.getPathCardsList();
					}else{
						this.props.showNotification(`上移失败`);
					}
				}else{
					this.props.showNotification(`上移失败`);
				}
			}else{
				this.props.showNotification(`上移失败`);
			}
		}).catch((error) => {
			console.log(error)
		});
	};



	//确认的
	updatapathCardsedit=()=>{
		this.setState({
			idsum:undefined,
			pathCardsedittype:false,
			editbuttomtype:false,
			editbuttomtypeadd:false
		})
		this.props.getPathCardsList();
		this.props.myupdataleftNavs();
		// this.props.updatadetailInfoLists();
	};
	//取消的
	editeditbuttomtypecanle=()=>{
		this.setState({
			editbuttomtype:true,
			editbuttomtypeadd:false

		})
	}
	//编辑用
	pathCardsedit=(key,pathid)=>{

		let url=`/course_stages/${pathid}/edit.json`;
		axios.get(url).then((result)=>{
			if(result){
					if(result.status===200){
						this.setState({
							idsum:key,
							pathCardsedittype:true,
							pathlistedit:result.data,
							editbuttomtype:true,
							editbuttomtypeadd:true
						})
					}
			}
		}).catch((error)=>{
			console.log(error);
		})

	};
	//删除用的
	delectpathCardsedit=(id)=>{

		this.setState({
			Modalstype:true,
			Modalstopval:'是否删除该章节？',
			Modalsbottomval:'',
			editdelectid:id,
			delecttype:true,
		})

	}
	cardsModalcancel=()=>{
		this.setState({
			Modalstype:false,
			Modalstopval:'',
			Modalsbottomval:'',
			editdelectid:undefined
		})
	}
	cardsModalsave=()=>{
		debugger
		this.setState({
			Modalstype:false,
			Modalstopval:'',
			Modalsbottomval:'',
			editdelectid:undefined
		})
	}
	delectpathCardseditfun=()=>{
		let {delecttype,editdelectid}=this.state;
		let id=editdelectid;
		if(delecttype===true){
			let url =`/course_stages/${id}.json`
			axios.delete(url).then((response) => {
				if(response){
					if(response.data){
						if(response.data.status===0){
							this.setState({
								idsum:undefined,
								pathCardsedittype:false,
								Modalstype:false,
								Modalstopval:'',
								Modalsbottomval:'',
								delecttype:false,
								editdelectid:undefined
							})

							this.updatapathCardsedit()
							this.props.showNotification(`删除成功`);
							this.props.myupdataleftNavs();
						}else {
							this.props.showNotification(`删除失败`);
						}
					}else{
						this.props.showNotification(`删除失败`);
					}
				}else {
					this.props.showNotification(`删除失败`);
				}

			}).catch((error) => {
				console.log(error)
			})
		}

	}

	render(){
		let{showparagraph,showparagraphkey,showparagraphindex,hidestartshixunsreplacevalue,idsum,pathCardsedittype,pathid,Modalstype,Modalstopval,Modalsbottomval,delecttype,pathlistedit,editbuttomtypeadd,editbuttomtype} =this.state;
		let { stages ,subject_id}=this.props;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		// console.log("pathCardsedittype");
		// console.log(pathCardsedittype);
		// console.log(editbuttomtype);
		// console.log("this.props.isAdmin");
		// console.log(this.props.isAdmin());
		// console.log(this.state.delecttype);
		return(
			<div>
				{
					stages===undefined||stages===JSON.stringify("[]")||stages.length===0?
				    ""
						:
			      <div className="lesson-saved-list">
				<Modal
					keyboard={false}
					title="提示"
					visible={this.state.startshixunCombattype}
					closable={false}
					footer={null}
				>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{this.state.shixunsmessage}之后开放，谢谢！</p>
					</div>
					<div className="task-popup-submit clearfix">
						{/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
						<a className="task-btn task-btn-orange fr"
							 style={{marginRight:'51px'}}
							 onClick={this.hidestartshixunCombattype}>知道了</a>
					</div>
					{/*<p className="inviteTipbtn with100 fl">*/}
					{/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
					{/*</p>*/}
				</Modal>
				<Modal
					keyboard={false}
					title="提示"
					visible={this.state.shixunsreplace}
					closable={false}
					footer={null}
				>
					<Spin indicator={antIcon} spinning={this.state.isSpin}>
						<div className="task-popup-content">
							<p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
						</div>
						<div className="task-popup-submit clearfix">
							<a className="task-btn task-btn-orange fr"
								 style={{marginRight:'51px'}}
								 onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalue)}>知道了</a>
						</div>
					</Spin>
				</Modal>

				<Modals
					modalsType={Modalstype}
					modalsTopval={Modalstopval}
					modalsBottomval={Modalsbottomval}
					modalCancel={this.cardsModalcancel}
					modalSave={delecttype===true?this.delectpathCardseditfun:this.cardsModalsave}
				>
				</Modals>
				<style>{
					`
					.lesson-saved-list-item {
							border-bottom: none!important;
							margin-bottom: 20px;
							background-color: #fff;
					}
					.lessonvalue{
								max-width: 556px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								display: inline-block;
					 }
					`
				}</style>


							{
							 this.props.isStudent()===true&&(stages===undefined||stages===JSON.stringify("[]")||stages.length===0)?
									<NoneData></NoneData>
									:
							   ""
							}
							{
								stages && stages.map((item,key)=>{

									return(
										<div className={"lesson-saved-list-item"} key={key} id={"stage_div_"+key} >
											<p className="clearfix title-line">

												<a className="fl ring-blue mr10 mt2">
													<img src={getImageUrl("images/educoder/icon/charpter-white.svg")} className="fl ml3 mt3"/>
												</a>
												<span className="font-18 font-bd lessonvalue" title={item.stage_name}>{item.stage_name}</span>
												{
													idsum===key&&pathCardsedittype===true?'':

														this.props.isAdmin()==true?
															<a>
																<a className="fr mtf3">
																	{ editbuttomtype===true?'':
																		<Tooltip placement="bottom" title="编辑"
																						 onClick={() => this.pathCardsedit(key, item.stage_id)}>
																			<i className="iconfont icon-bianjidaibeijing font-22 color-green"></i>
																		</Tooltip>
																	}
																</a>
																{
																	stages.length=== key+1?"":<a className="fr ring-op-green mr20" onClick={()=>this.chapterdown(item.stage_id)}>
																		<Tooltip placement="bottom" title="向下移动">
																			<img src={getImageUrl("images/educoder/icon/movedown.svg")} className="fl mt2 ml4"/>
																		</Tooltip>
																	</a>
																}


																{key===0?"":
																	<a className="fr ring-op-green mr20" onClick={()=>this.chapterup(item.stage_id)}>
																		<Tooltip placement="bottom" title="向上移动">
																			<img src={getImageUrl("images/educoder/icon/moveup.svg")} className="fl mt2 ml4"/>
																		</Tooltip>
																	</a>}

															</a>:""


												}

												{
													idsum === key && pathCardsedittype === true ?
														this.props.isAdmin()===true?
															<a className="fr" onClick={()=>this.delectpathCardsedit(item.stage_id)}>
																<Tooltip placement="bottom" title="删除">
																	<i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i>
																</Tooltip>
															</a>:""
														: ''
												}
											</p>

											{
												idsum===key&&pathCardsedittype===true?'':
													<div className="detail_for_paragraph clearfix" id={"detail_for_paragraph_"+key}>
														<p className="color-dark-grey mt20 mb25 ml20 mr20 pl28 justify font-15">{item.stage_description}</p>

														<div>

															{
																item.shixuns_list && item.shixuns_list.map((line,index)=>{
																	return(
																		<div className="clearfix paragraph lineh-30" key={index} onMouseEnter={()=>this.showparagraph(key,index)} onMouseLeave={this.hideparagraph}>

																			<li className="fl li-width63">

                                      <span className="progressRing mr10">
                                      {
																				line.complete_status === 1 ?<i className="iconfont icon-wancheng progressRing-over font-18 mt10"></i>
																					:<i className="iconfont icon-bofang progressRing-part font-18 mt10"></i>
																			}
                                      </span>
																				<span className={line.allow_visit===false&&line.shixun_status==="暂未公开"?"paragraph_name color204":"paragraph_name color-grey3"}>
                                        <span className="subject_stage_shixun_index">{key+1}</span>-{index+1}&nbsp;&nbsp;{line.shixun_name}
                                      </span>

																			</li>
																			{
																				line.allow_visit===false&&line.shixun_status==="暂未公开"?
																					<li className="fr status_li"><span className="fr color204">暂未公开</span></li>
																					:
																					<li className={showparagraph===false?"none":"fr status_li"}>
																						{
																							showparagraphkey===key&&showparagraphindex===index?<div>
																								<Link to={'/shixuns/'+line.identifier+'/challenges'} className="mr30 color-blue_4C shixun_detail pointer fl" target="_blank">查看详情</Link>
																								{line.shixun_status==="暂未公开"?"":<a  onClick={()=>this.startgameid(line.identifier)} className="btn_auto user_bluebg_btn fl" id="shixun_operation" >开始学习</a>}
																							</div>:""
																						}

																					</li>
																			}

																			{line.allow_visit===false&&line.shixun_status==="暂未公开"?"":	<li className={showparagraph===false?"fr status_li":"fr status_li"}>
																				{
																					showparagraphkey === key && showparagraphindex === index ? "" :
																						<span className="fr color204">实验任务 <span
																							className={"color000"}>{line.challenges_count}</span></span>
																				}
																			</li>}

																		</div>)
																})
															}
														</div>
													</div>
											}
											{
												this.props.isAdmin()===true?
													<DetailCardsEditAndEdit
														{...this.props}
														idsum={idsum}
														keys={key}
														pathCardsedittype={pathCardsedittype}
														updatapathCardsedits={this.updatapathCardsedit}
														pathlisteditlist={pathlistedit}
														stageid={item.stage_id}
														ysldetailcards={"ysldetailcards"}
														pathid={subject_id}
														coursesId={pathid}
														Pathlisteditundefined={this.Pathlisteditundefined}
													></DetailCardsEditAndEdit>
													:""
											}

										</div>
									)
								})
							}
			</div>
				}
		{ editbuttomtypeadd===true?'':this.props.isAdmin()===true?
			<DetailCardsEditAndAdd
				{...this.props}
				sum={stages && stages.length+1}
				pathid={subject_id}
				coursesId={pathid}
				detailInfoList={this.props.detailInfoList}
				getPathCardsLists={this.updatapathCardsedit}
				editeditbuttomtypes={this.editeditbuttomtypecanle}
				ysldetailcards={"ysldetailcards"}
			></DetailCardsEditAndAdd>
			:""
		}

	</div>
		)
	}
}
export default YslDetailCards;
// detailInfoList以前实训课堂做权限判断的作用  this.props.subject_id