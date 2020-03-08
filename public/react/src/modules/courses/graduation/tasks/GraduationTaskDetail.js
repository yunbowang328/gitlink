import React, { Component } from 'react';
import {getRandomNumber} from 'educoder';
import {Link} from 'react-router-dom';
import {Tooltip,Menu} from 'antd';
import Loadable from 'react-loadable';
import Loading from '../../../../Loading';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from 'axios';
import OneSelfOrderModal from "../../coursesPublic/OneSelfOrderModal";
import HomeworkModal from "../../coursesPublic/HomeworkModal";
import AccessoryModal from "../../coursesPublic/AccessoryModal";
import Associationmodel from '../../coursesPublic/Associationmodel';
import CoursesListType from '../../coursesPublic/CoursesListType';
import GraduationAcross from "./GraduationAcross";
import moment from 'moment';
import "../../css/members.css"
import "../../css/Courses.css"

import Modals from '../../../modals/Modals';


//毕设描述
const GraduationTasksquestions= Loadable({
	loader: () => import('./GraduationTaskssettingquestions'),
	loading: Loading,
})
//毕设任务设置
const GraduationTaskssetting=Loadable({
	loader: () => import('./GraduationTaskssetting'),
	loading: Loading,
})
//毕设任务列表
const GraduationTaskslist=Loadable({
	loader: () => import('./GraduationTaskssettinglist'),
	loading: Loading,
})

class GraduationTaskDetail extends Component{
	constructor(props){
		super(props);
		this.state={
			modalname:undefined,
			visible:false,
			Topval:undefined,
			starttime:undefined,
			starttimes:undefined,
			typs:undefined,
			endtime:undefined,
			Cancelname:undefined,
			Savesname:undefined,
			Cancel:undefined,
			Saves:undefined,
			Topvalright:undefined,
			Botvalleft:undefined,
			course_groupslist:undefined,
			course_groups:undefined,
			questionslist:undefined,
			tab:"list",
			visibles:undefined,
			Modalstype:undefined,
			Modalstopval:undefined,
			ModalCancel:undefined,
			ModalSave:undefined,
			acrossVisible:undefined,
		  OneSelftype:false,
			taskdatas:undefined
		}
	}
	componentDidMount(){
		this.getdatas()
	}
	getdatas=()=>{
		const task_Id = this.props.match.params.task_Id;
		let url="/graduation_tasks/"+task_Id+".json";

		axios.get(url).then((result)=>{
			if(result.status===200){
				this.setState({
					questionslist:result.data
				})

			}
		}).catch((error)=>{
			console.log(error)
		})
	}


	// 交叉评阅设置弹框
	openAcross=()=>{
		this.setState({
			acrossVisible:true
		})
	}
	closeAcross=()=>{
		this.setState({
			acrossVisible:false
		})
		this.getdatas()
	}



	//返回
	goback=()=>{
		// let courseId=this.props.match.params.coursesId;
		// let category_id=this.props.match.params.category_id;
		// window.location.href="/courses/"+courseId+"/graduation_tasks/"+category_id;
		// let courseId = this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }

		// this.props.history.goBack()
		this.props.history.replace(`/courses/${this.state.questionslist.course_id}/graduation_tasks/${this.state.questionslist.graduation_id}`);
	}

	setend_time=(time)=>{
		this.setState({
			starttimesend:time===undefined||time===null||time===""?undefined:time,
		})
	}
	//立即发布
	publish=()=>{
		let {questionslist}=this.state;
		let starttime= this.props.getNowFormatDates(1,1);
		let endtime=this.props.getNowFormatDates(2,1);
	  console.log(this.bindRef.end_time)
		this.setState({
			modalname:"立即发布",
			// visible:true,
			OneSelftype:true,
			Topval:"学生将立即收到毕设任务",
			// Botvalleft:"点击修改",
			// Botval:`本操作只对"未发布"的分班有效`,
			starttime:moment(moment(new Date())).format("YYYY-MM-DD HH:mm") ,
			starttimes:questionslist.end_time,
			staytime:this.props.getNowFormatDates(1),
			typs:"start",
			endtime:endtime,
			Cancelname:"暂不发布",
			Savesname:"立即发布",
			Cancel:this.cancelmodel,
			Saves:this.homepublish,
		})
	}
	// 确定立即发布
	homepublish=(ids,endtime)=>{
		this.cancelmodel();
		let task_Id=this.props.match.params.task_Id;
		const cid = this.props.match.params.coursesId;
		// let url = `/courses/${cid}/graduation_tasks/publish_task.json`;

		let url="/courses/"+cid+"/graduation_tasks/publish_task.json"
		axios.post(url,{
			task_ids:[task_Id],
			group_ids: this.state.course_groupslist,
			end_time:endtime,
		}).then((response)=>{
			if (response.data.status == 0) {
				this.getdatas()
				this.props.showNotification(response.data.message);

				this.setState({
					// Modalstopval:response.data.message,
					// ModalSave:this.cancelmodel,
					// Loadtype:true,
					course_groupslist:[],
					checkAllValue:false
				})
			}
		}).catch((error)=>{

		})
	}

	// 刷新
	resetList=()=>{
		this.getdatas();
		this.child && this.child.searchValue();
	}
	// 立即截止
	end=()=>{
		// this.homeworkstart()
		this.setState({
			modalname:"立即截止",
			visible:true,
			Topval:"学生将不能再提交作品",
			// Botvalleft:"暂不截止",
			// Botval:`本操作只对"提交中"的作业有效`,
			Cancelname:"暂不截止",
			Savesname:"立即截止",
			Cancel:this.cancelmodel,
			Saves:this.coursetaskend,
			typs:"end",
		})
	}
	coursetaskend=()=>{
		const coursesId = this.props.match.params.coursesId;
		const task_Id = this.props.match.params.task_Id;

		let url = `/courses/${coursesId}/graduation_tasks/end_task.json`;
		axios.post(url,{
			task_ids:[task_Id],
			group_ids: this.state.course_groupslist,
		}).then((response)=>{
			if (response.data.status == 0) {
				this.props.showNotification(response.data.message);
				this.cancelmodel();
				this.getdatas();
				this.child && this.child.reInit();
			}

		}).catch((error)=>{

		})
	}
	// 取消
	cancelmodel=()=>{
		this.setState({
			Modalstype:false,
			Loadtype:false,
			visible:false,
			OneSelftype:false,
			Modulationtype:false,
			Allocationtype:false,
			Modalstopval:"",
			ModalCancel:"",
			ModalSave:"",
		})
	}

	getcourse_groupslist=(id)=>{
		this.setState({
			course_groupslist:id
		})
	}

	setTab = (tab) =>{
		this.setState({
			tab
		})
	}

	// 关联项目
	AssociationItems=()=>{
		this.setState({
			visibles:true
		})
	}

	Cancel=()=>{
		this.setState({
			visibles:false
		})
	}

	// 取消关联
	cannelAssociation=()=>{
		this.setState({
			Modalstype:true,
			Modalstopval:"确定要取消该项目关联？",
			ModalCancel:this.cannerassocition,
			ModalSave:this.savetassociton
		})
	}

	savetassociton=()=>{
		this.cannerassocition();
		let {questionslist}=this.state;
		let url = "/graduation_tasks/"+questionslist.task_id+"/graduation_works/cancel_relate_project.json";
		console.log(url)
		axios.get(url).then((result)=>{
			if(result.data.status===0){
				this.resetList();
			}
		}).catch((error)=>{
			console.log(error)
		})

	}

	cannerassocition=()=>{
		this.setState({
			Modalstype:false,
			Modalstopval:"",
			ModalCancel:"",
			ModalSave:"",
			loadtype:false,
			visibles:false
		})
	}

	// 补交附件
	handaccessory=()=>{
		// let {taskslistdata}=this.state;
		// let courseId=this.props.match.params.coursesId;
		//
		// let url="/courses/"+courseId+"/graduation_tasks/"+taskslistdata.work_id+"/appraise"
		//
		// window.location.href=url;
		this.setState({
			avisible:true
		})
	}

	Cancelvisible=()=>{
		this.setState({
			avisible:false
		})
	}

	CodeReview=()=>{
		let newgetRandomNumber=getRandomNumber(true);
		console.log(newgetRandomNumber)
		this.props.showNotification("正在导出中...");
		if(newgetRandomNumber){
		const task_Id = this.props.match.params.task_Id;
		window.open(`/api/graduation_tasks/${task_Id}/sonar?
		${this.state.taskdatas.teacher_comment===undefined||this.state.taskdatas.teacher_comment===null?"":"teacher_comment="+this.state.taskdatas.teacher_comment+"&"}
		${this.state.taskdatas.task_status===undefined||this.state.taskdatas.task_status===null?"":"task_status="+this.state.taskdatas.task_status+"&"}
		${this.state.taskdatas.course_group===undefined||this.state.taskdatas.course_group===null?"":"course_group="+this.state.taskdatas.course_group+"&"}
		${this.state.taskdatas.cross_comment===undefined||this.state.taskdatas.cross_comment===null?"":"cross_comment="+this.state.taskdatas.cross_comment+"&"}
		${this.state.taskdatas.search===undefined||this.state.taskdatas.search===null?"":"search="+this.state.taskdatas.search+"&"}${newgetRandomNumber}`)
		}
	}

	getsonars=(teacher_comment,task_status,course_group,cross_comment,search)=>{
		let data={
			teacher_comment:teacher_comment,
			task_status:task_status,
			course_group:course_group,
			cross_comment:cross_comment,
			search:search
		}
		this.setState({
			taskdatas:data
		})
	}

	bindRef = ref => { this.child = ref } ;

	render(){

		let courseId=this.props.match.params.coursesId;
		let category_id=this.props.match.params.category_id;
		let task_Id=this.props.match.params.task_Id;
		let {
			questionslist ,
			tab ,
			visibles ,
			Modalstype,
			Modalstopval,
			ModalCancel,
			ModalSave,
			acrossVisible
		} = this.state

		const commom = {
			setTab:this.setTab,
			getdatas:this.getdatas
		}


		return(
			<div className="newMain clearfix">
				{
					questionslist &&
					<div className={"educontent mb20"}>
						<HomeworkModal
							starttimes={this.state.starttimes}
							typs={this.state.typs}
							modalname={this.state.modalname}
							visible={this.state.visible}
							Topval={this.state.Topval}
							Topvalright={this.state.Topvalright}
							Botvalleft={this.state.Botvalleft}
							Botval={this.state.Botval}
							starttime={this.state.starttime}
							endtime={this.state.endtime}
							Cancelname={this.state.Cancelname}
							Savesname={this.state.Savesname}
							Cancel={this.state.Cancel}
							Saves={this.state.Saves}
							course_groups={this.state.course_groups}
							modaltype={this.state.modaltype}
							getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
						/>
						{this.state.OneSelftype==true?<OneSelfOrderModal
							{...this.props}
							staytime={this.state.staytime}
							starttimes={this.state.starttimes}
							typs={this.state.typs}
							modalname={this.state.modalname}
							OneSelftype={this.state.OneSelftype}
							Topval={this.state.Topval}
							Topvalright={this.state.Topvalright}
							Botvalleft={this.state.Botvalleft}
							Botval={this.state.Botval}
							starttime={this.state.starttime}
							endtime={this.state.endtime}
							Cancelname={this.state.Cancelname}
							Savesname={this.state.Savesname}
							Cancel={this.state.Cancel}
							Saves={this.state.Saves}
							course_groups={this.state.course_groups}
							modaltype={this.state.modaltype}
							getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
							starttimes={this.state.starttimes}
							starttimesend={this.state.starttimesend}
							typs={this.state.typs}
						/>:""}




						{/*关联项目*/}
						{visibles===true?
							<Associationmodel
								modalname={"关联项目"}
								visible={visibles}
								Cancel={()=>this.Cancel()}
								taskid={ questionslist && questionslist.task_id }
								funlist={this.resetList}
							/>
							:""}

						{this.state.avisible===true?<AccessoryModal
							{...this.props}
							modalname={"补交附件"}
							visible={this.state.avisible}
							Cancelname={"取消"}
							Savesname={"确认"}
							Cancel={this.Cancelvisible}
							categoryid={questionslist.work_id}
							setupdate={this.resetList}
						/>:""}
						{/*提示*/}
						<Modals
							modalsType={Modalstype}
							modalsTopval={Modalstopval}
							modalCancel={ModalCancel}
							modalSave={ModalSave}
							closable={false}
							footer={null}
							destroyOnClose={true}
							centered={true}
						/>

						{
							acrossVisible &&
							<GraduationAcross
								{...this.props}
								{...this.state}
								task_Id={task_Id}
								modalVisible={acrossVisible}
								modalCloss={this.closeAcross}
								resetFun={this.resetList}
								comment_status={ questionslist && questionslist.comment_status }
							/>
						}

						<p className="clearfix mt10">
							<a onClick={this.goback} className="color-grey-9 fl">{questionslist.course_name}</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<Link to={`/courses/${courseId}/graduation_tasks/${category_id}`} className="color-grey-9 fl">{questionslist.graduation_name}</Link>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<span className="color-grey-6">任务详情</span>
						</p>
						<div className="clearfix mt20 mb20 lineh-25 linbox">
							<p className=" fl color-black summaryname">
								<Link to={`/courses/${courseId}/graduation_tasks/${category_id}`} className="color-grey-3">{questionslist.task_name}</Link>
							</p>
							<CoursesListType
								typelist={questionslist.task_status}
							/>
							<a className="color-grey-3 fr font-16 ml30 mr20" onClick={this.goback}>返回</a>
						</div>
						<div className="stud-class-set bor-bottom-greyE">
							<div className="clearfix edu-back-white pl30 pr30 graduationTaskMenu">

								<Link className={tab && tab == "list" ? "active" : ""} to={"/courses/"+courseId+"/graduation_tasks/"+category_id+"/detail/"+task_Id+"/list"}>任务列表</Link>
								<Link className={tab && tab == "questions" ? "active" : ""} to={"/courses/"+courseId+"/graduation_tasks/"+category_id+"/detail/"+task_Id+"/questions"}>毕设描述</Link>
								<Link className={tab && tab == "setting" ? "active" : ""} to={"/courses/"+courseId+"/graduation_tasks/"+category_id+"/detail/"+task_Id+"/setting?tab=3"}>设置</Link>

								{/*<a className={"fr color-blue font-16"}>导出成绩</a>*/}
								{/*{this.props.isAdmin()?<a href={"/api/graduation_tasks/"+task_Id+"/tasks_list.xls"} className={"fr color-blue font-16"}>导出成绩</a>:""}*/}
								{/*{this.props.isAdmin()?<a href={"/api/graduation_tasks/"+task_Id+"/tasks_list.zip"} className={"fr color-blue font-16"}>导出作品附件</a>:""}*/}

								<style>
									{ `
													.drop_down_menu{
														height: 118px;
														left:0px;
														width: 121px;
													 }
													.drop_down_menu li {
														 overflow: visible;
															 width: 121px;
														 }
														.drop_down_menu li a{
																 padding:  0px;
																font-size: 14px;
														 }
														 .mt19{
															margin-top:19px;
														 }
														 .drop_down_menu, .drop_down_normal{
																padding-top: 10px;
																padding-bottom: 8px;
														 }
														 	 .drop_down_menu li .color-dark{
																	color: #666 !important;
                              }
                            .linbox{
                              height: 26px;
                            }
													`}
								</style>
								{this.props.isAdmin()? <li className="li_line drop_down fr color-blue font-16 mt20" style={{"paddingLeft":"0px"}}>
									导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
									<ul className="drop_down_menu" style={{"right":"-34px","left":"unset","height":"auto"}}>
										<li><a onClick={()=>this.child.confirmysl(`/graduation_tasks/${task_Id}/tasks_list.xlsx`)} className="color-dark">导出成绩</a></li>
										<li><a onClick={()=>this.child.confirmysl(`/graduation_tasks/${task_Id}/tasks_list.zip`)} className="color-dark">导出作品附件</a></li>
									</ul>
								</li>:""}
								{questionslist.work_status===undefined||questionslist.work_status===null||questionslist.work_status.length===0?"":questionslist.work_status.map((item,key)=>{
									return(
										<span key={key} className="fr mt20">
                          {item==="提交作品"?<a className={"fr color-blue font-16 ml20"} href={"/courses/"+courseId+"/graduation_tasks/"+category_id+"/works/"+task_Id+"/new"}>提交作品</a>:""}
											{item==="补交作品"?<a className={"fr color-blue font-16 ml20"} href={"/courses/"+courseId+"/graduation_tasks/"+category_id+"/works/"+task_Id+"/new"}>补交作品</a>:""}
											{item==="修改作品"?<a className={"fr color-blue font-16 ml20"} href={"/courses/"+courseId+"/graduation_tasks/"+category_id+"/works"+"/"+ questionslist.work_id + "/edit"}>修改作品</a>:""}
											{item==="查看作品"?<a className={"fr color-blue font-16 ml20"} target="_blank" href={"/courses/"+courseId+"/graduation_tasks/"+ questionslist.work_id + "/appraise"}>查看作品</a> :""}
											{item==="创建项目"?<a className={"fr color-blue font-16 ml20"} href={'/projects/new'} target="_blank">创建项目</a>:""}
											{item==="关联项目"?<a className={"fr color-blue font-16 ml20"} onClick={this.AssociationItems}>关联项目</a>:""}
											{item==="取消关联"?<a className={"fr color-blue font-16 ml20"} onClick={this.cannelAssociation}>取消关联</a>:""}
											{item==="补交附件"?<a className={"fr color-blue font-16 ml20"} onClick={this.handaccessory}>补交附件</a>:""}
                      </span>

									)
								})}

								{/*<a className={"fr color-blue font-16"}>项目在线质量检测</a>*/}
								{ this.props.isAdmin() ? questionslist.status===1 ? <a className={"fr color-blue font-16 mr20"} onClick={() => { this.end()} }>立即截止</a> : "" : "" }
								{ this.props.isAdmin() ? questionslist.status===0 ? <a className={"fr color-blue font-16 mr20"} onClick={() => { this.publish()} }>立即发布</a> : "" : "" }
								{ this.props.isAdmin() && questionslist.cross_comment ? <a className={"fr color-blue font-16"} onClick={this.openAcross}>交叉评阅设置</a> : "" }
								{ this.props.isAdmin() ? <a className={"fr color-blue font-16"} href={"/courses/"+courseId+"/graduation_tasks/"+task_Id+"/edit"}>编辑任务</a> : "" }
								{ this.props.user&&this.props.user.admin===true || this.props.user&&this.props.user.business===true ? <a className={"fr color-blue font-16"} onClick={()=>this.CodeReview()}>代码评测</a> : "" }

							</div>
						</div>
						<Switch {...this.props}>
							{/*//毕设任务列表*/}
							<Route exact path="/courses/:coursesId/graduation_tasks/:category_id/detail/:task_Id/list"
										 render={
											 (props) => (<GraduationTaskslist getsonar={(teacher_comment,task_status,course_group,cross_comment,search)=>this.getsonars(teacher_comment,task_status,course_group,cross_comment,search)}{...this.props} {...props} {...this.state} {...commom} triggerRef={this.bindRef} setend_time={(time)=>this.setend_time(time)} tab={`list`}/>)
										 }
							></Route>

							<Route exact path="/courses/:coursesId/graduation_tasks/:category_id/detail/:task_Id/setting"
										 render={
											 (props) => (<GraduationTaskssetting {...this.props} {...props} {...this.state} {...commom} triggerRef={this.bindRef} setend_time={(time)=>this.setend_time(time)}  tab={`setting`}/>)
										 }
							></Route>

							<Route exact path="/courses/:coursesId/graduation_tasks/:category_id/detail/:task_Id/questions"
										 render={
											 (props) => (<GraduationTasksquestions {...this.props} {...props} {...this.state} {...commom} triggerRef={this.bindRef} setend_time={(time)=>this.setend_time(time)}  tab={`questions`}/>)
										 }></Route>

						</Switch>
					</div>
				}

			</div>
		)
	}
}
// CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC))
export default (GraduationTaskDetail) ;