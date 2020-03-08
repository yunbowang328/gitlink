import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin
} from "antd";
import ApprausePublic from "../coursesPublic/ApprausePublic";
import Listofworksstudentone from './Listofworksstudentone';
import Trainingjobsetting from './Trainingjobsetting';
import Workquestionandanswer from './Workquestionandanswer';
import CoursesListType from '../coursesPublic/CoursesListType';
import ShixunStudentWork from "./ShixunStudentWork";
import Startshixuntask from "../coursesPublic/Startshixuntask";
import '../css/members.css';
import "../common/formCommon.css";
import '../css/Courses.css';
import './style.css';
import '../css/busyWork.css';
import '../poll/pollStyle.css';


import TPMMDEditor from "../../tpm/challengesnew/TPMMDEditor";
import DownloadMessageysl from "../../modals/DownloadMessageysl";
import Modals from "../../modals/Modals";
class ShixunHomeworkPage extends Component {
	constructor(props) {
		super(props);
		// this.answerMdRef = React.createRef();
		this.state = {
			tab: ["0"],
			jobsettingsdatapage: undefined,
			teacherdatapage: undefined,
			code_review: false,
			view_report: false,
			visible: false,
			showmodel:false,
			child:undefined,
			yslpros:false,
			Modalstopval:"你在该实训的学习记录将被清空，无法恢复",
			ModalsBottomval:"是否确认重做？",
			ModalsType:false,
			mylistisSpin:false,
			Showupdateinstructions:false,
			AppraiseModaltype:false
		}

	}

	//切换tab
	ChangeTab = (e) => {
		// console.log(e);
		this.setState({
			tab: e
		})
		try {
			var currenturl = window.location.href;
			var newUrl = (currenturl.split("?"))[0];
			window.history.pushState('','',newUrl+'?tab='+e);
		}catch (e) {
			console.log(e);
			console.log("44");
		}

	}
	Getdataback = (jobsettingsdata, teacherdata) => {
		// console.log("ShixunHomeworkPage56");
		// console.log(jobsettingsdata);
		// console.log(teacherdata);

		this.setState({
			jobsettingsdatapage: jobsettingsdata.data.message===undefined?jobsettingsdata:undefined,
			teacherdatapage:  teacherdata.message===undefined?teacherdata:undefined,
			code_review: teacherdata.code_review===undefined?false :teacherdata.code_review,
			view_report: teacherdata.view_report!==undefined? false:teacherdata.view_report,
		})
	}

	componentDidMount() {
		// console.log("父组件加载框");
		const query = this.props.location.search;
		const type = query.split('?tab=');
		// let sum = []
		// sum.push(type[1])
		// console.log("componentDidMountcomponentDidMount");
		// console.log(type);
		this.setState({
			tab: type[1],
		})
		let querys = this.props.location.pathname;
		const types = querys.split('/');
		// console.log(types);
		this.setState({
			shixuntypes: types[3]
		})
	}


	confirmysl(child,i) {
		if(i===1){
			child.daochushixunbaogao();
		}
		if(i===2){
			child.daochuzuoye();
		}
	}

	homeworkendss(child){
		child.homeworkends();
	}

	homeworkstarts(child){
		child.homeworkstart();

	}
	workshowmodels(child){
		child.workshowmodel();
	}
	/// 重做的确认
	ModalSaves=()=>{

		this.setState({
			ModalsType:false,
			Modalstopval:""
		});
		if(this.state.teacherdatapage){
			this.resetshixunCombat(this.state.teacherdatapage.myshixun_identifier);
		}
		try {
			console.log("this.child");
			console.log(this.child);
		}catch (e) {

		}

	};
	//取消重做
	ModalCancels=()=>{
		this.setState({
			ModalsType:false,
			Modalstopval:""
		})
	};
	//打开重做弹框
	Modalcancelss=()=>{
		this.setState({
			Modalstopval:"你在该实训的学习记录将被清空，无法恢复",
			ModalsBottomval:"是否确认重做？",
			ModalsType:true,
		})
	}
	//重置按钮
	resetshixunCombat=(id)=>{
		this.setState({
			mylistisSpin:true,
		})
		let zrl=`/myshixuns/${id}/reset_my_game.json`;
		axios.get(zrl).then((response) => {
			// window.location.href = "/shixuns/" + response.data.shixun_identifier + "/challenges";
			this.setState({
				mylistisSpin:false,
			})
			this.child.Isupdatass();
			this.props.showNotification("已清空本实训的学习记录\n" +
				"\n" +
				"请点击“开启挑战”重做实训作业");
		}).catch((error) => {
			this.setState({
				mylistisSpin:false,
			})
			console.log(error)
		});
	}
	bindRef = ref => { this.child = ref }
///////////////教师截止
	//编辑作业
	Showupdateinstructionsboolfalse (bool) {
		this.setState({
			Showupdateinstructions:bool
		})
	}
	//开始编辑作业
	edenwork = ()=>{
		this.setState({
			Showupdateinstructions:true
		})
	}
	gotohome=()=>{
		// console.log(this.props)
		let {jobsettingsdatapage}=this.state

		this.props.history.replace(`/courses/${this.props.match.params.coursesId}/${jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.main ===  1 ? "shixun_homeworks" :"shixun_homework"}/${jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.category_id === undefined ? "" : jobsettingsdatapage.data.category.category_id}`);
	}

	Akeyreviewit=()=>{
		this.setState({
			AppraiseModaltype:true
		})
	}

	hideAppraiseModaltype=()=>{
		this.setState({
			AppraiseModaltype:false
		})
	}

	SaveAppraiseModal=(comment,hidden_comment)=>{
		let url = `/homework_commons/${this.props.match.params.homeworkid}/batch_comment.json`
		axios.post(url,{
				comment: comment,
				hidden_comment: hidden_comment,
			}
		)
			.then((response) => {
				if (response.data.status == 0) {
					this.props.showNotification('一键评阅成功')
					this.hideAppraiseModaltype()
					this.child.AkeyreviewitGetalistofworkstwo()
				} else {

				}
			})
			.catch( (error) =>{

			});
	}
	render() {
		let {tab, teacherdatapage,  jobsettingsdatapage,AppraiseModaltype} = this.state;

		const isAdmin = this.props.isAdmin();
		// console.log(119)
		//  console.log(jobsettingsdatapage);
		document.title=jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.course_name;
		return (
			<div className="newMain clearfix ">
				<Modals
					modalsType={this.state.ModalsType}
					modalsTopval={this.state.Modalstopval}
					modalsBottomval={this.state.ModalsBottomval}
					modalSave={this.ModalSaves}
					modalCancel={this.ModalCancels}
					loadtype={false}
				>
				</Modals>

				{AppraiseModaltype===true?<ApprausePublic
					{...this.props}
					{...this.state}
					ApprausePublicName={"一键评阅"}
					visible={AppraiseModaltype}
					Cancel={()=>this.hideAppraiseModaltype()}
					SaveAppraiseModal={(comment,hidden_comment)=>this.SaveAppraiseModal(comment,hidden_comment)}
				/>:""}


				<div className={"educontent mt10 mb20"} style={{width: "1200px"}}>
					<Spin size="large" spinning={this.state.mylistisSpin}>
						{
							jobsettingsdatapage === undefined?"":
								<div className="educontent mb20">
									<p className="clearfix mb20 mt10">
										<a className="btn colorgrey fl hovercolorblue " href={this.props.current_user&&this.props.current_user.first_category_url}>{jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.course_name}</a>
										<span className="color-grey-9 fl ml3 mr3">&gt;</span>
										<a
											className=" btn colorgrey fl hovercolorblue "
											href={`/courses/${this.props.match.params.coursesId}/${jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.main ===  1 ? "shixun_homeworks" :"shixun_homework"}/${jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.category_id === undefined ? "" : jobsettingsdatapage.data.category.category_id}`}>{jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.category_name}</a>
										<span className="color-grey-9 fl ml3 mr3">&gt;</span>
										<WordsBtn className="fl">作业详情</WordsBtn>
									</p>
								</div>
						}

						<div className="educontent mb20">
							<p className=" fl color-black  summaryname" >
								{teacherdatapage === undefined ? "" : teacherdatapage.homework_name}
							</p>
							<CoursesListType
								typelist={teacherdatapage === undefined ? [""] : teacherdatapage.homework_status}
							/>
							<a className="color-grey-9 fr font-16  summaryname  ml20 mr20" onClick={()=>this.gotohome()}>返回</a>
							{teacherdatapage&&teacherdatapage.shixun_status>1?<a className="color-grey-9 fr font-16 mr20"
																																	 href={`/shixuns/${teacherdatapage === undefined ? "" : teacherdatapage.shixun_identifier}/challenges`}
																																	 target={"_blank"}>实训详情</a>:""}


						</div>
						<div className="edu-back-white ">
							<div className="stud-class-set bor-bottom-greyE ">
								<div className=" clearfix edu-back-white poll_list">
									<a className={parseInt(tab) === 0 ? "active" : ""} onClick={(e) => this.ChangeTab(0)}>作品列表</a>
									<a className={parseInt(tab) === 1 ? "active" : ""} onClick={(e) => this.ChangeTab(1)}>作业描述</a>
									{this.props.isAdmin() ?
										this.state.code_review === true || jobsettingsdatapage === undefined ? [""] : jobsettingsdatapage.data.homework_status[0] === "未发布" ? "" :
											<a
												className={parseInt(tab) === 2 ? "active" : ""}
												onClick={(e) => this.ChangeTab(2)}>
												代码查重</a> : ""}
									{parseInt(tab) === 3?
										<style>{this.props.isAdmin()?
											`
                                    .poll_list a.active:after {
                                        content: '';
                                        width: 57px;
                                        left: 10px;
                                        bottom: 0px;
                                        height: 2px;
                                        background-color: #4CACFF;
                                        position: absolute;
                                        }
                                    `:""
										}</style>
										:""}

									<a className={parseInt(tab) === 3 ? "active" : ""}
										 onClick={(e) => this.ChangeTab(3)}
									>{this.props.isAdmin()?"设置":"得分规则"}</a>
									{/*{this.props.isAdmin() ? <a*/}
									{/*	className="fr color-blue font-16"*/}
									{/*	href={`/api/homework_commons/${this.props.match.params.coursesId}/works_list.xlsx`}*/}
									{/*>导出</a> : ""}*/}
									<style>{`
                        .drop_down_menu li a {
                            padding: 0px;
                            font-size: 14px;
                        }
                        .drop_down_menu {
                            width: 93px;
                        }
                        .drop_down_menu li {
                            overflow: visible;
                            width: 93px;
                        }
                        .drop_down_menu, .drop_down_normal {
                            padding-top: 10px;
                            padding-bottom: 8px;
                        }

                        `}</style>
									{this.props.isAdmin() ?
										<li className="li_line drop_down fr color-blue font-16 mt20" style={{"padding": "0 20px"}}>
											导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
											<ul className="drop_down_menu" style={{"right": "-0px", "left": "unset", "height": "auto"}}>
												{/*<li><a*/}
												{/*	onClick={(child,i) => this.confirmysl(this.child,1)}>实训报告</a>*/}
												{/*</li>*/}
												<li><a
													onClick={(child,i) => this.confirmysl(this.child,2)}>学生成绩</a>
												</li>

											</ul>
										</li> : ""}
									{this.props.isAdmin() ?
										teacherdatapage && teacherdatapage.end_immediately === true ?
											<a className="fr color-blue font-16" onClick={(child)=>this.homeworkendss(this.child)}>立即截止</a>
											: ""
										: ""}
									{this.props.isAdmin() ?
										teacherdatapage && teacherdatapage.publish_immediately === true ?
											<a className="fr color-blue font-16" onClick={(child)=>this.homeworkstarts(this.child)}>立即发布</a>
											: ""
										: ""}

									{this.props.isAdmin() ?
										teacherdatapage && teacherdatapage.code_review === true ?
											<a className="fr color-blue font-16" onClick={(child)=>this.workshowmodels(this.child)}>代码查重</a>
											: "" : ""}

									{parseInt(tab) === 0 ?this.props.isAdmin() ?
									 jobsettingsdatapage === undefined ? [""] : jobsettingsdatapage.data.homework_status[0] === "未发布" ? "" :
											<a className="fr color-blue font-16" onClick={()=>this.Akeyreviewit()}>一键评阅</a>
											: "":""}

									{
										parseInt(tab)===1?
											this.props.isAdmin() ?
												<a className="fr color-blue font-16" onClick={()=>this.edenwork()}>编辑作业</a>
												:""
											:""
									}


									{this.state.view_report === true ? <Link className="fr color-blue font-16" target={"_blank"}
																													 to={`/courses/${this.props.match.params.coursesId}/${jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.main ===  1 ? "shixun_homeworks" :"shixun_homework"}/${teacherdatapage&&teacherdatapage.work_id}/shixun_work_report`}>
										查看实训报告
									</Link> : ""}
									{
										teacherdatapage === undefined ? ""
											: teacherdatapage.commit_des === null || teacherdatapage.commit_des === undefined ? "" :
											<a className="fr color-blue font-16"
												 target={"_blank"}
												 href={`/courses/${this.props.match.params.coursesId}/${jobsettingsdatapage === undefined ? "" : jobsettingsdatapage.data.category.main ===  1 ? "shixun_homeworks" :"shixun_homework"}/${teacherdatapage === undefined ? "" : teacherdatapage.id}/commitsummary/${this.props.match.params.homeworkid}`}>{teacherdatapage.commit_des}</a>
									}
									{teacherdatapage === undefined ? "" :teacherdatapage&&teacherdatapage.shixun_status>1&&teacherdatapage&&teacherdatapage.time_status<5?<Startshixuntask
										{...this.props}
										data={teacherdatapage}
									/>:""}
									{this.props.isStudent() ?
										(
											teacherdatapage&&teacherdatapage.redo_work===true?
												<a className="fr color-blue font-16" onClick={()=>this.Modalcancelss()}>重做</a>
												:""
										)
										: "" }
								</div>
							</div>
						</div>

						{parseInt(tab) === 0 ?<Listofworksstudentone    triggerRef={this.bindRef}  {...this.props} {...this.state} Getdataback={(jobsettingsdata, teacherdata) => this.Getdataback(jobsettingsdata, teacherdata)}></Listofworksstudentone>:""}
						{parseInt(tab) === 1 ?<Workquestionandanswer  triggerRef={this.bindRef}  {...this.props} {...this.state} Getdataback={(jobsettingsdata, teacherdata) => this.Getdataback(jobsettingsdata, teacherdata)} Showupdateinstructionsboolfalse={(i)=>this.Showupdateinstructionsboolfalse(i)}></Workquestionandanswer>:""}
						{parseInt(tab) === 2 ?<ShixunStudentWork   triggerRef={this.bindRef} {...this.props} {...this.state} Getdataback={(jobsettingsdata, teacherdata) => this.Getdataback(jobsettingsdata, teacherdata)}></ShixunStudentWork>:""}
						{parseInt(tab) === 3 ?<Trainingjobsetting  teacherdatapage={this.state.teacherdatapage}  triggerRef={this.bindRef}  {...this.props} {...this.state} Getdataback={(jobsettingsdata, teacherdata) => this.Getdataback(jobsettingsdata, teacherdata)}></Trainingjobsetting>:""}
					</Spin>
				</div>
			</div>
		)
	}
}

export default ShixunHomeworkPage;

