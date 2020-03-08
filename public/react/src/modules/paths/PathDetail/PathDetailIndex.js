import React, { Component } from 'react';
import {getImageUrl,markdownToHTML, configShareForCustom} from 'educoder';
import DetailTop from './DetailTop.js';
import DetailCards from './DetailCards.js'
import AddCollaborators from "./addCollaborators.js";
import {Icon, Tooltip, Popover} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DragDropContext ,  Draggable, Droppable} from 'react-beautiful-dnd';
import '../../paths/ShixunPaths.css';
import "antd/dist/antd.css";
import Modals from '../../modals/Modals';
import axios from 'axios';
import TPMRightSection from "../../tpm/component/TPMRightSection";
import styled from "styled-components";
import Modifytext from './Modifytext';
const getItemStyle = (isDragging, draggableStyle) => ({
	// change background colour if dragging
	background: isDragging ? '#dceeff' : '',
	// styles we need to apply on draggables
	...draggableStyle,
});
const getItems = count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		content: `item ${k}`
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const List = styled.div`
  background: lightgrey;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid grey;
  background: white;
  &:hover {
    background: lightgrey;
  }
`;

const DragHandle = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  background: grey;
  visibility: hidden;
  &:hover {
    background: black;
  }
  ${Item}:hover & {
    visibility: visible;
  }
`;
const $ =window.$
class PathDetailIndex extends Component{
	constructor(props){
		super(props)
		this.state={
			progress:undefined,
			tags:undefined,
			members:undefined,
			detailInfoList:undefined,
			clickdetailInfoListtype:false,
			Modalstype:false,
			Modalstopval:undefined,
			Modalsbottomval:undefined,
			cardsModalcancel:this.cardsModalcancel,
			cardsModalsave:this.cardsModalsave,
			user_id:undefined,
			loadtype:false,
			courses:undefined,
			items: getItems(10),
			pathtopskey:1,
			dataquerys:{},
			MenuItemsindex:1,
			MenuItemsindextype:0,
			qrcode_img: null,
			team_title: "教学团队",
			modify: false,
		}
		this.onDragEnd = this.onDragEnd.bind(this);

	}
	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		try {

		}catch (e) {

		}
		const items = reorder(
			this.state.members,
			result.source.index,
			result.destination.index
		);

		this.setState({
			detailInfoList:this.state.detailInfoList,
			members:items,
			items
		});
		console.log(this.state.members)
		console.log("items 数组数组数组数组")
		console.log(items)
	}
	cardsModalcancel=()=>{
		this.setState({
			Modalstype:false,
		})
		// TODO 这个是临时处理，还需要优化，这里要看怎么区分处理
		if (this.state.Modalstopval == '你确定要删除该成员吗？') {
			return;
		}
		this.props.history.goBack()
	}

	cardsModalsave=()=>{
		this.setState({
			Modalstype:false,
		})
		this.props.history.goBack()
	}
	// 加载markdown
	updatamakedown=(id)=>{
		setTimeout(()=>{
			var shixunDescr = window.editormd.markdownToHTML(id, {
				htmlDecode: "style,script,iframe",
				taskList: true,
				tex: true,
				flowChart: true,
				sequenceDiagram: true
			});
			$("#"+id+" p:first").addClass("ReactMarkdown");
		}, 200)
	}

	componentDidMount(){
		this.getlistdatas()
	}

	getlistdatas=()=>{
		const query = this.props.location.search;
		// const type = query.split('?chinaoocTimestamp=');
		// console.log("Eduinforms12345");
		// console.log(this.foo(query));
		// console.log(JSON.stringify(this.foo(query)));
		var dataqueryss={}
		try {
			var foqus=this.foo(query);
			if(JSON.stringify(foqus) ==="{}"){
				this.setState({
					dataquerys:{},
				});
			}else{
				this.setState({
					dataquerys:foqus,
				});
				dataqueryss=foqus;
			}
		}catch (e) {
			this.setState({
				dataquerys:{},
			})
		}

		this.getdatasindexs(undefined,dataqueryss);
	}
	//截取url 数据的
	foo=(url)=> {
		var json = {};
		var regExp = /[\?\&](\w+)(=?)(\w*)/g;
		var arr;
		do {
			arr = regExp.exec(url);
			// console.log(arr); // arr = [完整的字符串, key, 等号或'', value或'']

			if (arr) {
				var key = arr[1];
				var value = arr[3];
				// arr[2] === ''时, value = undefined
				if (!arr[2])
					value = undefined;

				json[key] = value;
			}
		} while (arr);

		return json;
	}
	getdatasindexs=(key,yslwebobject)=>{
		// yslwebobject 后端需要的接口
		let pathid=this.props.match.params.pathId;
		let url="/paths/"+pathid+".json";
		axios.get(url,
			{params:yslwebobject}
			).then((result)=>{
			if (result.data.status === 407 || result.data.status === 401) {
				debugger
				return;
			}

			if (result.data.status === 403) {
				debugger
				// window.location.href = "/403";
				return;
			}
			configShareForCustom(result.data.name, result.data.description)

			if(result.data.allow_visit===true){
				this.setState({
					detailInfoList:result.data,
					courses:result.data.courses,
					pathtopskey:key===undefined?1:key,
					// items:  getItems(result.data.members.length),
				})

				document.title=result.data.name;
			}

		}).catch((error)=>{
			console.log(error);
		})


		let righturl="/paths/"+pathid+"/right_banner.json";
		axios.get(righturl).then((result)=>{
			if (result.data.status === 407 || result.data.status === 401) {
				debugger
				return;
			}

			if (result.data.status === 403) {
				debugger
				// window.location.href = "/403";
				return;
			}

			this.setState({
			  qrcode_img:result.data.qrcode_img,
				tags:result.data.tags,
				progress:result.data.progress,
				members:result.data.members,
				items:  getItems(result.data.members.length),
				team_title: result.data.team_title
			})

		}).catch((error)=>{
			console.log(error);
		})
	};
	getMenuItemsindex=(key,status)=>{

		this.setState({
			MenuItemsindex:key,
			MenuItemsindextype:status
		})
	}
	getdatasindex=(key)=>{
		// yslwebobject 后端需要的接口
		let pathid=this.props.match.params.pathId;
		let url="/paths/"+pathid+".json";
		axios.get(url,
			{params:this.state.dataquerys}
			).then((result)=>{
			if (result.data.status === 407 || result.data.status === 401) {
				debugger
				return;
			}

			if (result.data.status === 403) {
				debugger
				// window.location.href = "/403";
				return;
			}
			configShareForCustom(result.data.name, result.data.description)

			if(result.data.allow_visit===true){
				this.setState({
					detailInfoList:result.data,
					courses:result.data.courses,
					pathtopskey:key===undefined?1:key,
					// items:  getItems(result.data.members.length),
				})
			}

		}).catch((error)=>{
			console.log(error);
		});


		let righturl="/paths/"+pathid+"/right_banner.json";
		axios.get(righturl).then((result)=>{
			if (result.data.status === 407 || result.data.status === 401) {
				debugger
				return;
			}

			if (result.data.status === 403) {
				debugger
				// window.location.href = "/403";
				return;
			}

			this.setState({
				// detailInfoList:result.data,
				tags:result.data.tags,
				progress:result.data.progress,
				members:result.data.members,
				items:  getItems(result.data.members.length),
				team_title: result.data.team_title
			})

		}).catch((error)=>{
			console.log(error);
		})
	}

	updatadetailInfoList=()=>{
		this.getdatasindex();
	}

	clickNewsubscript=(val)=>{
		if(val===0){
			this.setState({
				clickdetailInfoListtype:true
			})
		}else{
			this.setState({
				clickdetailInfoListtype:false
			})
		}

	}

	timeStamp=(value)=>{
		var secondTime = parseInt(value);// 秒
		var minuteTime = 0;// 分
		var hourTime = 0;// 小时
		if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
			//获取分钟，除以60取整数，得到整数分钟
			minuteTime = parseInt(secondTime / 60);
			//获取秒数，秒数取佘，得到整数秒数
			secondTime = parseInt(secondTime % 60);
			//如果分钟大于60，将分钟转换成小时
			if(minuteTime > 60) {
				//获取小时，获取分钟除以60，得到整数小时
				hourTime = parseInt(minuteTime / 60);
				//获取小时后取佘的分，获取分钟除以60取佘的分
				minuteTime = parseInt(minuteTime % 60);
			}
		}
		var result = "" + parseInt(secondTime) + "秒";

		if(minuteTime > 0) {
			result = "" + parseInt(minuteTime) + "分" + result;
		}
		if(hourTime > 0) {
			result = "" + parseInt(hourTime) + "小时" + result;
		}
		return result;
	}


	shanchuallow=(id)=>{
		this.setState({
			user_id:id,
			Modalstype:true,
			Modalstopval:"你确定要删除该成员吗？",
			cardsModalsave:this.delectshanchuallow,
			loadtype:false
		})
	}

	delectshanchuallow=()=>{
		let{user_id}=this.state;
		let pathid=this.props.match.params.pathId;
		let url="/paths/"+pathid+"/delete_member.json";
		let param={user_id:user_id};
		axios.delete(url,{data:param}).then((response) => {
			if(response.data.status===1){
				if (this.props.current_user.user_id == user_id) {
					this.props.history.push('/paths')
					return;
				}
				this.props.showNotification(response.data.message)
				this.setState({
					Modalstype:false,
					// Modalstopval:response.data.message,
					loadtype:false,
					// cardsModalsave:this.cardsModalsave,
				})
				this.updatadetailInfoList();
			}
		}).catch((error) => {
			console.log(error)
		})
	}

	//上移
	moveup=(data)=>{
		// console.log(data);
		let pathid=this.props.match.params.pathId;
		let url=`/paths/${pathid}/up_member_position.json`;
		axios.post(url,{
			user_id:data.id
		}).then((response) => {
			if(response.status === 200){
				console.log("上移");
				// console.log(this.state.detailInfoList.members);
				// console.log(response);

				this.setState({
					detailInfoList:this.state.detailInfoList,
					members:response.data.members
				});
				// console.log(this.state.detailInfoList.members);

			}

		}).catch((error) => {
			console.log(error)
		})
	}

	//下移
	movedown =(data) => {
		// console.log(data);
		let pathid=this.props.match.params.pathId;
		let url=`/paths/${pathid}/down_member_position.json`;
		axios.post(url,{
			user_id:data.id
		}).then((response) => {
			if( response.status === 200){
				console.log("下移");
				// console.log(this.state.detailInfoList.members);
				// console.log(response);
				this.setState({
					detailInfoList:this.state.detailInfoList,
					members:response.data.members
				});
				// console.log(this.state.detailInfoList.members);
			}

		}).catch((error) => {
			console.log(error)
		})
	}


	modifysy = (i) => {
		if (i === 1) {
			this.setState({
				modify: true
			})
		} else if (i === 2) {
			this.setState({
				modify: false
			})
			let righturl = "/paths/" + this.props.match.params.pathId + "/right_banner.json";
			axios.get(righturl).then((result) => {
				if (result.data.status === 407 || result.data.status === 401) {
					debugger
					return;
				}

				if (result.data.status === 403) {
					debugger
					// window.location.href = "/403";
					return;
				}

				this.setState({
					// detailInfoList:result.data,
					tags: result.data.tags,
					progress: result.data.progress,
					members: result.data.members,
					items: getItems(result.data.members.length),
					team_title: result.data.team_title
				})

			}).catch((error) => {
				console.log(error);
			})
		} else if (i === 3) {
			this.setState({
				modify: false
			})
		}
	}

	setteam_title(name) {
		this.setState({
			team_title: name
		})
	}

	maincontent = () => {
		return (<div className={"sandianbox"}>
			<div onClick={() => this.modifysy(1)}>重命名</div>
		</div>)
	}
	render(){

		this.updatamakedown("shixuns_propaedeutics");
		this.updatamakedown("subject_learning_notes");
		let {detailInfoList,
			clickdetailInfoListtype,
			Modalstype,
			Modalstopval,
			Modalsbottomval,
			cardsModalcancel,
			cardsModalsave,
			loadtype,
			progress,
			members,
			tags,
			qrcode_img,
			MenuItemsindex,
			MenuItemsindextype,
			team_title,
			modify
		} = this.state


		// console.log(MenuItemsindex)
		// console.log(MenuItemsindextype===2&&detailInfoList&&detailInfoList.allow_statistics===false)
		return(
			<div className="newContainer">
				<style>
					{
						`
							.head-right{
    						line-height: 30px;
							}
							.padding40-20-30{
							  padding:40px 20px 30px;
							}
							.pathDetailIndex .markdown-body > p {
								line-height: 28px;
							}
							// #shixuns_propaedeutics{
						  // 	width: 100% !important;
							// }
						`
					}
				</style>
				<Modals
					modalsType={Modalstype}
					modalsTopval={Modalstopval}
					modalsBottomval={Modalsbottomval}
					modalCancel={cardsModalcancel}
					modalSave={cardsModalsave}
					loadtype={loadtype}
				>
				</Modals>
				<div className="newMain clearfix pathDetailIndex">
					<DetailTop {...this.state} {...this.props} getdatasindex={(key)=>this.getdatasindex(key)} getMenuItemsindex={(key,status)=>this.getMenuItemsindex(key,status)} getlistdatas={()=>this.getlistdatas()}></DetailTop>
					<div className="educontent clearfix mb80">
						<div className="with65 fl">
							<div className="produce-content mb10">
								<p className="clearfix mb20">
									<span className="fl font-18 font-bd">简介</span>
									{/*{detailInfoList===undefined?"":detailInfoList.allow_statistics===true?*/}
									{/*<Tooltip placement="bottom" title={"编辑"}>*/}
									{/*<Link className="fr" to={"/paths/"+this.props.match.params.pathId+"/edit"}>*/}
									{/*<i className="iconfont icon-bianjidaibeijing font-20 color-green"></i>*/}
									{/*</Link>*/}
									{/*</Tooltip>*/}
									{/*:""*/}
									{/*}*/}
								</p>
								<div className="color-grey-6 clearfix">
									<div id="shixuns_propaedeutics" className="new_li fl" style={{"padding":" 0px","textAlign": "justify;"}}>
										{detailInfoList === undefined ? "" :detailInfoList.description===null?"":
											<div className={"markdown-body font-14"} dangerouslySetInnerHTML={{__html: markdownToHTML(detailInfoList.description).replace(/▁/g,"▁▁▁")}}></div>
										}
									</div>
								</div>
							</div>

							<DetailCards
								{...this.props}
								{...this.state}
								updatadetailInfoLists={this.updatadetailInfoList}
							></DetailCards>
						</div>
						<div className="with35 fr pl20">
							{qrcode_img===null?"":<div className="edu-back-white newmustlearn mb10">
	 								<img src={`${qrcode_img}`} />
							   	<div className="font-16 color181818">优惠报名，扫码入群</div>
							</div>}
							<div className="edu-back-white mustlearn mb10">
								<p className="clearfix mb30">
									<span className="font-16 ">课程须知</span>
									{/*{detailInfoList===undefined?"":detailInfoList.allow_statistics===true?*/}
									{/*<Tooltip placement="bottom" title={"编辑"}>*/}
									{/*<Link to={"/paths/"+this.props.match.params.pathId+"/edit#learning_notes"} className="fr mtf5">*/}
									{/*<i className="iconfont icon-bianjidaibeijing font-20 color-green"></i>*/}
									{/*</Link>*/}
									{/*</Tooltip>*/}
									{/*:""*/}
									{/*}*/}
								</p>
								<div id="subject_learning_notes" className="color-grey-6 new_li markdown-body editormd-html-preview justify">
									{detailInfoList === undefined ? "" :detailInfoList.learning_notes===null?"":
										<div className={"markdown-body font-14"} dangerouslySetInnerHTML={{__html: markdownToHTML(detailInfoList.learning_notes).replace(/▁/g,"▁▁▁")}}></div>
									}
								</div>
							</div>
							{tags === undefined ? "" :tags === null ? "":
								<div className="edu-back-white padding40-20 mb10 relative">
									<p className="font-16 mb20">技能标签 <span className="color-grey-c">{tags.length}</span></p>

									<div className={clickdetailInfoListtype===false?"newedbox newedboxheight":"newedbox newminheight"}>
										<div className="clearfix" id="boxheight">
											{
												tags && tags.map((item,key)=>{
													return(
														<span value={key} className = {item.status == true ? "edu-filter-btn29BD8B fl" : "newedu-filter-btn fl"}>{item.tag_name}</span>
													)
												})
											}
										</div>
									</div>

									<Tooltip placement="bottom" title={"显示全部"}>
										<div className={tags.length>20&&clickdetailInfoListtype===false?"newsubscript mb9 color-grey-9 fr":"newsubscript mb9 color-grey-9 none"}
												 onClick={()=>this.clickNewsubscript(0)}
										><span className="mr8">...</span><Icon type="caret-down" />
										</div>
									</Tooltip>

									<Tooltip placement="bottom" title={"收起"}>
										<div className={clickdetailInfoListtype===false?"newsubscript mb9 color-grey-9 none":"newsubscript mb9 color-grey-9 fr"}
												 onClick={()=>this.clickNewsubscript(1)}><Icon type="caret-up" />
										</div>
									</Tooltip>

								</div>
							}
							{
								this.props.checkIfLogin()===false?"":progress === undefined ? "" : progress === null ? "" :
									<div className="edu-back-white myProgress padding40-20-30 mb10">
										<p className="mb20">
											<span className="font-16 mr10">关卡数</span>
											<Tooltip placement="bottom" title="已通关数/关卡总数">
												<span className="color-green"  >{progress.my_score} / {progress.all_score}</span>
											</Tooltip>
										</p>
										<p className="clearfix mb10">
											<span className="fl color-green">已学 {progress.learned}%</span>
											<span className="fr color-grey-9" id="time-consuming">学习耗时{this.timeStamp(progress.time)} </span>
										</p>
										<div className="myProgressNav mb20"><div className="myProgressGreen" style={{"width":`${progress.learned+"%"}`}}></div></div>
										<span className="font-14 color-grey-8">注: “我的进展”以已发布的实训详情关卡数为准。</span>
									</div>
							}

							{
								members ===undefined ?"":members === null ?"":
									<div className="teacherTeam edu-back-white clearfix" id="subject_members">
										{
											detailInfoList === undefined ?
												<p className="font-16 clearfix">{team_title}</p> : detailInfoList.allow_add_member === true ?
												(
													modify === false ?

														<div>
															<p className="font-16 clearfix fl" onDoubleClick={() => this.modifysy(1)}>{team_title}</p>
															<Popover placement="right" content={this.maincontent()} trigger="hover">
																<i className={"iconfont icon-sandian  fr color999"} style={{
																	width: "30px",
																	height: "30px",
																	textAlign: "right",
																}}></i>
															</Popover>
														</div>
														:
														<Modifytext {...this.props} {...this.state} pathid={this.props.match.params.pathId}
																				modifysy={(i) => this.modifysy(i)}
																				setteam_title={(name) => this.setteam_title(name)}></Modifytext>
												)

												: <p className="font-16 clearfix">{team_title}</p>
										}

										{ members===undefined?
											members && members.map((item,key)=>{
												return(
													<div className="teacherTeamItem clearfix df" key={key}>
														<a href={item.user_url} target="_blank" className="fl">
															<img alt="头像" className="radius" height="80" src={getImageUrl(`${"images/"+item.image_url}`)} width="80"/>
														</a>

														<div className="fl ml15 flex1">
															<p className="mb10 mt5">{item.name}
																{/*{*/}
																{/* detailInfoList===undefined?"":detailInfoList.allow_add_member===true?*/}
																{/*  <a className="fr" onClick={()=>this.shanchuallow(item.id)}><i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i></a>:""*/}
																{/*}*/}
															</p>
															<div className="clearfix">
																<p className="color-grey-9 font-12 fl">
																	<span className="mr10">{item.school}</span>
																	{/*<span>{item.identity}</span>*/}
																</p>
															</div>
														</div>
													</div>
												)
											})
											:detailInfoList===undefined?"":detailInfoList.allow_add_member===true?
												members && members.map((item,key)=>{
													return(
														<div className="teacherTeamItem clearfix df" key={key}>
															<a href={item.user_url} target="_blank" className="fl">
																<img alt="头像" className="radius" height="80" src={getImageUrl(`${"images/"+item.image_url}`)} width="80"/>
															</a>

															<div className="fl ml15 flex1">
																<p className="mb10 mt5">{item.name}
																	{/* 新增role 判断是否能删除  1 管理员   2 合作者 */}

																	{
																		detailInfoList===undefined?"":detailInfoList.allow_add_member===true && item.role == 2?
																			<a className="fr" onClick={()=>this.shanchuallow(item.id)}><i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i></a>:""
																	}
																</p>
																<div className="clearfix">
																	<p className="color-grey-9 font-12 fl"><span className="mr10">{item.school}</span>
																		{/*<span>{item.identity}</span>*/}
																	</p>
																</div>
																{
																	detailInfoList===undefined?"":detailInfoList.allow_add_member===true? <div>
																			{key!=0?<div className="fr ml15 flex1"><a onClick={()=>this.moveup(item)}><Tooltip title="上移"><i className="color-green font-18 iconfont icon-xiangshangyi"></i></Tooltip></a></div>:""}
																			{key+1== members.length?"":<div className="fr  ml15 flex1 "><a onClick={()=>this.movedown(item)}><Tooltip title="下移"><i className="color-green font-18 iconfont icon-xiangxiayi"></i></Tooltip></a></div>}
																		</div>
																		:""
																}

															</div>
														</div>
													)
												})
												: members && members.map((item,key)=>{
												return(
													<div className="teacherTeamItem clearfix df" key={key}>
														<a href={item.user_url} target="_blank" className="fl">
															<img alt="头像" className="radius" height="80" src={getImageUrl(`${"images/"+item.image_url}`)} width="80"/>
														</a>

														<div className="fl ml15 flex1">
															<p className="mb10 mt5">{item.name}
																{/*{*/}
																{/* detailInfoList===undefined?"":detailInfoList.allow_add_member===true?*/}
																{/*  <a className="fr" onClick={()=>this.shanchuallow(item.id)}><i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i></a>:""*/}
																{/*}*/}
															</p>
															<div className="clearfix">
																<p className="color-grey-9 font-12 fl"><span className="mr10">{item.school}</span>
																	{/*<span>{item.identity}</span>*/}
																</p>
															</div>
														</div>
													</div>
												)
											})}

									</div>
							}


							<AddCollaborators {...this.props} {...this.state} updatadetailInfoLists={this.updatadetailInfoList}></AddCollaborators>

						</div>
					</div>
				</div>

			</div>
		)
	}
}
export default PathDetailIndex;
