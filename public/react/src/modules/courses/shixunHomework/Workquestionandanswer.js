import React, {Component} from "react";
import CoursesListType from '../coursesPublic/CoursesListType';
import {getRandomNumber, getRandomcode, markdownToHTML} from 'educoder';
import {
	Form,
	Select,
	Input,
	Button,
	Checkbox,
	Upload,
	Icon,
	message,
	Modal,
	Table,
	Divider,
	InputNumber,
	Tag,
	DatePicker,
	Radio,
	Tooltip,
	notification
} from "antd";
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from 'axios';
import CommonReply from "../common/comments/CommonReply";
import Homeworddescription from "../shixunHomework/Homeworddescription";
import ShixunWorkModal from './Shixunworkdetails/ShixunWorkModal';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import DownloadMessageysl from "../../modals/DownloadMessageysl";
import OneSelfOrderModal from "../coursesPublic/OneSelfOrderModal";
import '../css/members.css'
import "../common/formCommon.css"
import '../css/Courses.css'
import './style.css'
import 'antd/lib/pagination/style/index.css';
import './Challenges.css'

import Startshixuntask from "../coursesPublic/Startshixuntask";

const TextArea = Input.TextArea

//作业问答页面
class Workquestionandanswer extends Component {
	//unifiedsetting 统一设置
	//allowreplenishment 允许补交
	//completionefficiencyscore 完成效率评分占比
	//level级别
	//proportion 比例
	constructor(props) {
		super(props);
		// this.props.form.setFieldsValue({
		//     radiogroup:1,
		//
		// });
		this.state = {
			// namestring:"JFinal是基于Java语言的极速web开发框架，其核心设计目标是开发迅速、代码量少、学习简单、功能强大、轻量级、易扩展、`Restful`。在拥有Java语言所有优势的同时再拥有`ruby`、`python`等动态语言的开发效率。\r\n\r\n在本实训中，我们将基于JFinal框架搭建一个在线商城。我们会学习到如何合理设计`Model`来进行数据表映射和数据操作、如何设计`Controller`对请求进行合理的处理…… 通过本实训，您不仅能收获到具体框架和技术的使用经验，也能对项目架构设计等知识有所了解或巩固。\r\n\r\n<div  align=\"center\">\r\n\t<img src=\"/attachments/download/170838\"  />\r\n</div>\r\n\r\n本实训聚焦一个在线商城项目的核心业务逻辑实现。你将在这一过程中收获Java Web项目设计的基本思想，也能得到编程能力的一次跃升。",
			props: props,
			starttimetype: false,
			endtimetype: false,
			latetimetype: false,
			allowlate: 1,
			latepenaltytype: false,
			unifiedsetting: false,
			allowreplenishment: undefined,
			completionefficiencyscore: false,
			proportion: undefined,
			level: undefined,
			ealuation: false,
			latededuction: undefined,
			latedeductiontwo: undefined,
			// Showupdateinstructions: false,
			database: false,
			datasheet: false,
			databasetwo: undefined,
			datasheettwo: undefined,
			publicwork: undefined,
			memo: {id: "94", user_id: 1},
			polls_descriptiontest: "作业说明...",
			jobdescriptiondisplay: "none",
			score_open: false,
			code_review: false,
			starttimesend:undefined,
		}
	}

	componentDidMount() {
		console.log("Workquestionandanswer");
		console.log("componentDidMount");
		var homeworkid = this.props.match.params.homeworkid;
		// console.log(homeworkid)
		this.Gettitleinformation(homeworkid)
		let query = this.props.location.pathname;
		const type = query.split('/');
		this.setState({
			shixuntypes: type[3]
		})
		this.props.triggerRef(this);

	}
	// componentWillReceiveProps(nextProps) {
	// 	// console.log("+++++++++916");
	// 	// console.log(nextProps);
	// 	// console.log(this.props)
	// 	// console.log(this.props.isAdmin());
	// 	if (nextProps.code_review != this.props.code_review) {
	// 		if (nextProps.code_review !== undefined) {
	// 			console.log("diaoyonglwangluo2");
	// 			var homeworkid = this.props.match.params.homeworkid;
	// 			// console.log(homeworkid)
	// 			this.Gettitleinformation(homeworkid)
	// 		}
	// 	}
	//
	// }

	isupdatas = () => {
		var homeworkid = this.props.match.params.homeworkid;
		this.Gettitleinformation(homeworkid)
	}
	//获取题目信息
	Gettitleinformation = (homeworkid) => {
		// console.log("获取题目信息");
		let url = `/homework_commons/${homeworkid}.json`;
		axios.get(url).then((result) => {
			if (result.status === 200) {
				// console.log(url)
				// console.log("设置页")
				// console.log(JSON.stringify(result))
				this.setState({
					jobsettingsdata: result,
					...result.data
				})
				this.props.Getdataback(result,result.data);
			}
		}).catch((error) => {
			console.log(error)
		})
	}
	// jobdescriptiondisplaybj = () => {
	// 	this.setState({
	// 		Showupdateinstructions: true,
	// 	})
	// }

	//统一设置
	onChange = (e) => {
		this.setState({
			unifiedsetting: e.target.checked,
		})
		// console.log(e.target.checked);
	}

	//立即发布
	homeworkstart = () => {
		let homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/publish_groups.json";

		axios.get(url).then((response) => {

			if (response.status === 200) {
				const dataformat = 'YYYY-MM-DD HH:mm';
				let starttime = this.props.getNowFormatDates(1);
				let endtime = this.props.getNowFormatDates(2);
				this.setState({
					modalname: "立即发布",
					modaltype: response.data.course_groups === null || response.data.course_groups.length === 0 ? 2 : 1,
					OneSelftype: true,
					Topval: "学生将立即收到作业",
					// Botvalleft:"暂不发布",
					Botval: `本操作只对"未发布"的作业有效`,
					starttime: moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					endtime: "截止时间：" + endtime,
					Cancelname: "暂不发布",
					Savesname: "立即发布",
					Cancel: this.homeworkhide,
					Saves: this.homeworkstartend,
					course_groups: response.data.course_groups,
					starttimes: starttime,
					starttimesend:response.data.end_time===undefined||response.data.end_time===null||response.data.end_time===""?undefined:response.data.end_time,
					typs: "start",
				})
			}
		}).catch((error) => {
			console.log(error)
		});

	}
	//立即截止
	homeworkends = () => {
		let homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/end_groups.json";

		axios.get(url).then((response) => {

			if (response.status === 200) {
				this.setState({
					modalname: "立即截止",
					modaltype: response.data.course_groups === null || response.data.course_groups.length === 0 ? 2 : 1,
					visible: true,
					Topval: "学生将不能再提交作业",
					// Botvalleft:"暂不截止",
					Botval: `本操作只对"提交中"的作业有效`,
					Cancelname: "暂不截止",
					Savesname: "立即截止",
					Cancel: this.homeworkhide,
					Saves: this.coursetaskend,
					starttime: undefined,
					endtime: undefined,
					course_groups: response.data.course_groups,
					typs: "end",
				})
			}
		}).catch((error) => {
			console.log(error)
		});


	}
// 立即发布
	homeworkstartend = (ds, endtime) => {
		var homeworkid = this.props.match.params.homeworkid;

		let data={}
		if(ds.length===0){
			if(this.state.category.main===1){
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
				}
			}else {
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
					category_id:this.state.category.category_id,
				}
			}
		}else{
			if(this.state.category.main===1){
				data={
					homework_ids: [homeworkid],
					group_ids: ds,
					group_end_times:endtime,
					detail:true
				}
			}else{
				data={
					homework_ids: [homeworkid],
					group_ids: ds,
					group_end_times:endtime,
					category_id:this.state.category.category_id,
					detail:true
				}
			}

		}
		let coursesId = this.props.match.params.coursesId;
		let url = "/courses/" + coursesId + "/homework_commons/publish_homework.json";
		axios.post(url, data).then((result) => {
			if (result.status === 200) {
				if (result.data.status === 0) {
					notification.open({
						message: "提示",
						description: result.data.message
					});
					this.homeworkhide();
				}

			}
		}).catch((error) => {
			console.log(error);
		})
	}

	//立即截止确定按钮
	coursetaskend = () => {
		var homeworkid = this.props.match.params.homeworkid;
		let {course_groupslist} = this.state;


		const cid = this.props.match.params.coursesId;
		let url = "/courses/" + cid + "/homework_commons/end_homework.json";
		axios.post(url, {
				group_ids: course_groupslist,
				homework_ids: [homeworkid],
			})
			.then((response) => {
				if (response.data.status == 0) {
					notification.open({
						message: "提示",
						description: response.data.message
					});
					this.homeworkhide()
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	ReleaseNotes = (explanations) => {
		var homeworkid = this.props.match.params.homeworkid;
		let url = `/homework_commons/${homeworkid}/update_explanation.json`;
		axios.post((url), {
				explanation: explanations
			})
			.then((result) => {
				if (result) {
					try {
						this.props.showNotification(`${result.data.message}`);
					}catch (e) {

					}
					try {
						var homeworkid = this.props.match.params.homeworkid;

						this.Gettitleinformation(homeworkid);
					}catch (e) {

					}
					try {
						this.props.Showupdateinstructionsboolfalse(false);
					}catch (e) {

					}
				}
			}).catch((error) => {
			console.log(error);
		})
	}

	NOReleaseNotes = () => {
		this.props.Showupdateinstructionsboolfalse(false);
	}
	workshowmodel = () => {
		this.setState({
			showmodel: true
		})
	}

	hideshowmodel = () => {
		this.setState({
			showmodel: false
		})
	}

	homeworkhide = () => {
		this.isupdatas()
		this.setState({
			modalname: undefined,
			modaltype: undefined,
			visible: false,
			Topval: undefined,
			Topvalright: undefined,
			Botvalleft: undefined,
			Botval: undefined,
			starttime: undefined,
			endtime: undefined,
			Cancelname: undefined,
			Savesname: undefined,
			Cancel: undefined,
			Saves: undefined,
			StudentList_value: undefined,
			addname: undefined,
			addnametype: false,
			addnametab: undefined,
			typs: undefined,
			starttimes: undefined,
			OneSelftype:false,
		})
	}
	getcourse_groupslist = (id) => {
		this.setState({
			course_groupslist: id
		})
	}

	ChangeTab=(e)=>{
		this.props.ChangeTab(e);
	}

	daochushixunbaogao=()=>{
		let url =`/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}`;
		this.confirmysl(url, url + `&export=true`);
	}

	daochuzuoye =() =>{
		let url = `/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx`;
		this.confirmysl(url, url + `?export=true`);
	}

	confirmysl(url, urlWithExport){
		axios.get(urlWithExport).then((response) => {
			if(response === undefined){
				return
			}
			if(response.data.status&&response.data.status===-1){

			}else if(response.data.status&&response.data.status===-2){
				if(response.data.message === "100"){
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType:true,
						DownloadMessageval:100
					})
				}else {
					//因附件资料超过500M
					this.setState({
						DownloadType:true,
						DownloadMessageval:500
					})
				}
			}else {
				this.props.showNotification(`正在下载中`);
				window.open(getRandomcode("/api"+url), '_blank');
			}
		}).catch((error) => {
			console.log(error)
		});
	}


	Downloadcal=()=>{
		this.setState({
			DownloadType:false,
			DownloadMessageval:undefined
		})
	}
	render() {
		const dateFormat = 'YYYY-MM-DD HH:mm:ss';
		let {
			starttimetype, endtimetype, latetimetype, allowlate, latepenaltytype, jobsettingsdata, score_open
			, homework_id
		} = this.state;
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};
		const formItemLayout = {
			labelCol: {span: 6},
			wrapperCol: {span: 14},
		};
		let coursesId = this.props.match.params.coursesId;


		return (
			<div className=" clearfix "  style={{margin:  "auto" , minWidth:"1200px"}}>
				{this.state.showmodel === true ? <ShixunWorkModal
					{...this.props}
					visible={this.state.showmodel}
					modalname={"代码查重"}
					data={[]}
					issCancel={() => this.hideshowmodel()}
					updatas={() => this.isupdatas()}
				/> : ""}
				{/*<DownloadMessage*/}
				{/*	{...this.props}*/}
				{/*	ref="DownloadMessage"*/}
				{/*/>*/}
				{/*立即发布*/}
				<DownloadMessageysl
					{...this.props}
					value={this.state.DownloadMessageval}
					modalCancel={this.Downloadcal}
					modalsType={this.state.DownloadType}

				/>
				<HomeworkModal
					modaltype={this.state.modaltype}
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
					getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
					starttimes={this.state.starttimes}
					starttimesend={this.state.starttimesend}
					typs={this.state.typs}
				/>

				{/*立即发布*/}
				{this.state.OneSelftype===true?<OneSelfOrderModal
					modaltype={this.state.modaltype}
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
					getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
					starttimes={this.state.starttimes}
					starttimesend={this.state.starttimesend}
					typs={this.state.typs}
				/>:""}
				<div className={"educontent "}>
					<div className="edu-back-white" >


						{/*{jobsettingsdata === undefined || jobsettingsdata.data.description === null ? <div className="ml20" style={{paddingTop: "20px"}}>无</div> :*/}
						{/*	<div className=" clearfix edu-back-white poll_list  mr20 " style={{paddingTop: "20px"}}>*/}
            {/*                  <span>*/}
						{/*										<style>*/}
						{/*											{*/}
						{/*												`*/}
						{/*												hr{*/}
						{/*												display:none;*/}
						{/*												}*/}
						{/*												`*/}
						{/*											}*/}
						{/*										</style>*/}
            {/*                 <div className={"font-16 color-dark fl pl20 "} >*/}
            {/*                      <div className={"markdown-body"}*/}
						{/*												dangerouslySetInnerHTML={{__html: markdownToHTML(jobsettingsdata.data.description).replace(/▁/g, "▁▁▁")}}></div>*/}

            {/*                 </div>*/}
            {/*                  </span>*/}
						{/*	</div>}*/}

						{/*<div className=" clearfix edu-back-white poll_list pd10">*/}
							{/*<div className="font-16 color-green fl pl20 mt10">作业说明:</div>*/}
							{/*{*/}
							{/*	this.props.isAdmin() && this.props.isAdmin() === true ?*/}

							{/*		(Showupdateinstructions && Showupdateinstructions === true ? "" :*/}
							{/*				<Tooltip placement="top" title="编辑"><i*/}
							{/*					className="color-green font-18 iconfont icon-bianjidaibeijing fr pr20 "*/}
							{/*					onClick={() => this.jobdescriptiondisplaybj()}></i></Tooltip>*/}
							{/*		) : ""*/}
							{/*}*/}

						{/*</div>*/}

						<span>
                       <div className="font-16 color-dark   break_word flex1  ">
                            {this.props.Showupdateinstructions && this.props.Showupdateinstructions === true ?
															<div>
																<Homeworddescription {...this.props} ReleaseNotes={(explanations)=>this.ReleaseNotes(explanations)}
																										 NOReleaseNotes={()=>this.NOReleaseNotes()}
																										 description={jobsettingsdata === undefined ? "" : jobsettingsdata === null ? "" : jobsettingsdata === "null" ? "" : jobsettingsdata.data.explanation === undefined ? "" : jobsettingsdata.data.explanation === null ? "" : jobsettingsdata.data.explanation}></Homeworddescription>
															</div>
															:
															<div className="pl20 markdown-body" style={{minHeight: "150px",padding: "20px"}}>
																{jobsettingsdata === undefined || jobsettingsdata === null || jobsettingsdata === "null" ?
																	<span style={{color: "#D3D3D3"}}>暂无~</span> :
																	jobsettingsdata.data.explanation === undefined || jobsettingsdata.data.explanation === null || jobsettingsdata.data.explanation === undefined || jobsettingsdata.data.explanation === "" ?
																		<span style={{color: "#D3D3D3"}}>暂无~</span> :
																		<div className={"markdown-body"}
																			dangerouslySetInnerHTML={{__html: markdownToHTML(jobsettingsdata.data.explanation).replace(/▁/g, "▁▁▁")}}></div>
																}

															</div>
														}

                        </div>
                      </span>
					</div>
					{/*                    <style>*/}
					{/*                        {*/}
					{/*                            `.mockInputWrapper {*/}
					{/*    display: flex;*/}
					{/*    padding: 30px 20px 30px 20px;*/}
					{/*}`*/}
					{/*                        }*/}
					{/*                    </style>*/}
					{/* <div className="edu-back-white mb20  graduateTopic course-message"> */}
					{/*<GraduateTopicReply memo={{id: graduation_topic_id, user_id: topicInfo && topicInfo.user_id}} course_id={course_id} {...this.props}></GraduateTopicReply>*/}
					{/* </div> */}
					{/*{  Showupdateinstructions&& Showupdateinstructions === true?*/}
					{/*  <div >*/}
					{/*      <Homeworddescription {...this.props} ReleaseNotes={this.ReleaseNotes} NOReleaseNotes ={this.NOReleaseNotes} ></Homeworddescription>*/}
					{/*  </div>*/}
					{/*  :""*/}
					{/*}*/}
					{homework_id && <CommonReply
						memo={{
							id: homework_id,
						}}
						course_id={coursesId} {...this.props}
						apiRouteName={'homework_commons'}
						jour_type={'HomeworkCommon'}
					></CommonReply>
					}


				</div>

			</div>

		)
	}
}

export default Workquestionandanswer;
{/*<div className="stud-class-set bor-bottom-greyE ">*/}
{/*	<div className=" clearfix edu-back-white poll_list">*/}
{/*		<a onClick={(e)=>this.ChangeTab(0)}>作品列表</a>*/}

{/*		<a className="active" onClick={(e)=>this.ChangeTab(1)}>作业问答</a>*/}
{/*		{this.props.isAdmin() ?*/}
{/*			this.state.code_review === true || jobsettingsdata === undefined ? [""] : jobsettingsdata.data.homework_status[0] === "未发布" ? "" :*/}
{/*				<a*/}
{/*					// to={`/courses/${this.state.props.match.params.coursesId}/${this.state.props.match.params.homeworkid}/student_work`}*/}
{/*					onClick={(e)=>this.ChangeTab(2)}>*/}
{/*					代码查重</a> : ""}*/}

{/*		<a*/}
{/*			onClick={(e)=>this.ChangeTab(3)}*/}
{/*		>设置</a>*/}
{/*		<style>{`*/}
{/*                        .drop_down_menu li a {*/}
{/*                            padding: 0px;*/}
{/*                            font-size: 14px;*/}
{/*                        }*/}
{/*                        .drop_down_menu {*/}
{/*                            width: 93px;*/}
{/*                        }*/}
{/*                        .drop_down_menu li {*/}
{/*                            overflow: visible;*/}
{/*                            width: 93px;*/}
{/*                        }*/}
{/*                        .drop_down_menu, .drop_down_normal {*/}
{/*                            padding-top: 10px;*/}
{/*                            padding-bottom: 8px;*/}
{/*                        }*/}
{/*                        a:hover {*/}
{/*                        color:#1A0B00 !important;*/}
{/*                        }*/}
{/*                        `}</style>*/}
{/*		{this.props.isAdmin() ?*/}
{/*			<li className="li_line drop_down fr color-blue font-16 mr8 mt20" style={{"padding": "0 20px"}}>*/}
{/*				导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>*/}
{/*				<ul className="drop_down_menu" style={{"right": "-0px", "left": "unset", "height": "auto"}}>*/}
{/*					<li><a onClick={()=>this.confirmysl(`/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}`)}>实训报告</a>*/}
{/*					</li>*/}
{/*					<li><a onClick={()=>this.confirmysl(`/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx`)}>学生成绩</a>*/}
{/*					</li>*/}
{/*				</ul>*/}
{/*			</li> : ""}*/}

{/*		{this.props.isAdmin() ? jobsettingsdata && jobsettingsdata.data.end_immediately === true ?*/}
{/*			<a className="fr color-blue font-16" onClick={this.homeworkends}>立即截止</a>*/}
{/*			:""*/}
{/*			: ""}*/}
{/*		{this.props.isAdmin() ? jobsettingsdata && jobsettingsdata.data.publish_immediately === true ?*/}
{/*			<a className="fr color-blue font-16" onClick={this.homeworkstart}>立即发布</a>*/}
{/*			:	""*/}
{/*			: ""}*/}


{/*		{this.props.isAdmin() ?*/}
{/*			jobsettingsdata && jobsettingsdata.data.code_review === true ?*/}
{/*				<a className="fr color-blue font-16" onClick={this.workshowmodel}>代码查重</a>*/}
{/*				: ""	 : ""}*/}
{/*		{*/}
{/*			jobsettingsdata&&	jobsettingsdata.data === undefined ? ""*/}
{/*				: 	jobsettingsdata&&	jobsettingsdata.data.commit_des === null || 	jobsettingsdata&&	jobsettingsdata.data.commit_des === undefined ? "" :*/}
{/*				<a className="fr color-blue font-16"*/}
{/*					 href={`/courses/${this.state.props.match.params.coursesId}/${this.state.shixuntypes}/${	jobsettingsdata&&	jobsettingsdata.data === undefined ? "" : 	jobsettingsdata&&	jobsettingsdata.data.id}/commitsummary/${this.state.props.match.params.homeworkid}`}>{	jobsettingsdata&&	jobsettingsdata.data.commit_des}</a>*/}
{/*		}*/}
{/*		{    jobsettingsdata&&jobsettingsdata.data === undefined ? "" : <Startshixuntask*/}
{/*			{...this.props}*/}
{/*			data={	jobsettingsdata&&	jobsettingsdata.data}*/}
{/*		/>}*/}
{/*	</div>*/}
{/*</div>*/}