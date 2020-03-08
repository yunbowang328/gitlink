import React, {Component} from 'react';
import {
	Spin,
	Pagination,
} from "antd";
import axios from 'axios';
import {getImageUrl, markdownToHTML} from 'educoder';
import "../css/messagemy.css"
import NoneData from '../../../modules/courses/coursesPublic/NoneData'
//消息页面
class MessagSub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			limit: 10,
			typeysl: "",
			count: 0,
			isSpin: false,
			data: undefined,
		}
	}

	// 初始化数据
	componentDidMount() {
		// console.log("初始化数据了MessagSub");
		// console.log(this.props);
		this.getdata("", this.state.page);
		// this.Messageprivatemessageunreadmessage();
		try {
			this.props.Mtab(1);
		} catch (e) {

		}
		this.props.triggerRef(this)
	}

	//塞选页数
	paginationonChanges = (pageNumber) => {
		this.setState({
			page: pageNumber,
		})
		this.getdata(this.state.typeysl, pageNumber);

	}
	//获取数据源
	getdata = (types, page) => {
		this.setState({
			isSpin: true,
		})
		let {limit} = this.state;
		let url = `/users/tidings.json`;
		axios.get((url), {
			params: {
				type: types,
				page: page,
				per_page: limit,
			}
		}).then((result) => {
			if (result) {
				// if (result.data.status === 0) {

				this.setState({
					page: page,
					count: result.data.count,
					typeysl: types,
					isSpin: false,
					data: result.data.tidings === null ? undefined : result.data.tidings === undefined ? undefined : result.data.tidings === [] ? undefined : result.data.tidings === "[]" ? undefined : result.data.tidings.length === 0 ? undefined : result.data.tidings,
				})
				// }
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin: false,
			})
		})
	};
	getdatas = () => {
		this.setState({
			isSpin: true,
		})
		let {typeysl, page, limit} = this.state;
		let url = `/users/tidings.json`;
		axios.get((url), {
			params: {
				type: typeysl,
				page: page,
				per_page: limit,
			}
		}).then((result) => {
			if (result) {
				// if (result.data.status === 0) {

				this.setState({
					page: page,
					count: result.data.count,
					typeysl: typeysl,
					isSpin: false,
					data: result.data.tidings === null ? undefined : result.data.tidings === undefined ? undefined : result.data.tidings === [] ? undefined : result.data.tidings === "[]" ? undefined : result.data.tidings.length === 0 ? undefined : result.data.tidings,
				})
				// }
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin: false,
			})
		})
	}

	componentWillUnmount() {
		// 卸载异步操作设置状态
		this.setState = (state, callback) => {
			return;
		}
	}

	gettourl = (item) => {
		switch (item.container_type) {
			case "ApplyUserAuthentication" :
				if (item.tiding_type === "Apply") {
					if (item.auth_type === 1) {
						//系统管理页面
						return window.open("/admins/identity_authentications");
					}
					if (item.auth_type === 2) {
						//系统管理页面
						return window.open("/admins/professional_authentications")
					}
				}
				if (item.tiding_type === "System") {
					// 账号管理页-认证信息
					return window.open("/account/certification")
				}
				return;
			case "CancelUserAuthentication" :
				// 账号管理页-认证信息
				return window.open("/account/certification")
			case "CancelUserProCertification" :
				// 账号管理页-认证信息
				return window.open("/account/certification")
			case "ApplyAddDepartment" :
				if (item.tiding_type === "Apply") {
					//部门审批
					return window.open("/admins/department_applies")
				}
				if (item.tiding_type === "System") {
					// 账号管理页/account/profile
					return window.open("/account/profile")
				}
				return;
			case "ApplyAddSchools" :
				if (item.tiding_type === "Apply") {
					// 单位审批
					return window.open("/admins/unit_applies")
				}
				if (item.tiding_type === "System") {
					//  账号管理页
					return window.open("/account/profile")
				}
				return;
			case "ApplyAction" :
				switch (item.parent_container_type) {
					case "ApplyShixun" :
						if (item.tiding_type === "Apply") {
							return window.open("/admins/shixun_authorizations")
						}
						if (item.tiding_type === "System") {
							// 实训详情页 :identifier = identifier
							return window.open(`/shixuns/${item.identifier}/challenges`)
						}
					case "ApplySubject" :
						if (item.tiding_type === "Apply") {
							// 实训课程发布
							return window.open("/admins/subject_authorizations")
						}
						if (item.tiding_type === "System") {
							//  课程汇总详情页 :parent_container_id = parent_container_id

							return window.open(`/paths/${item.parent_container_id}`)
						}
					case "TrialAuthorization" :
						if (item.tiding_type === "Apply") {
							// 试用授权页面
							return window.open("/managements/trial_authorization")
						}
						if (item.tiding_type === "System") {
							// 账号管理页
							return window.open("/account/profile")
						}
				}
				return;
			case 'JoinCourse' :
				// 课堂详情页 :id =
				return window.open(`/courses/${item.belong_container_id}/teachers`)
			case 'StudentJoinCourse':
				// 课堂详情页 :id = container_id
				if (item.tiding_type === 'Apply') {
					return window.open(`/courses/${item.belong_container_id}/teachers`);
				}
				if (item.tiding_type === 'System') {
					//教学案例详情 :id = container_id
					return window.open(`/courses/${item.belong_container_id}/students`);
				}
			case  'DealCourse':
				// 课堂详情页 :id = container_id
				return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.container_id}`)
			case 'TeacherJoinCourse':
				// 课堂详情页 :id = container_id
				return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.container_id}`)
			case  'Course' :
				// 课堂详情页 :id = container_id
				if (item.tiding_type === "Delete") {

					return;
				}
				return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.container_id}`)
			case 'ArchiveCourse' :
				// 课堂详情页 :id = container_id
				return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.container_id}`)
			case "Shixun" :
				return window.open(`/shixuns/${item.identifier}/challenges`)
			case "Subject" :
				// 课程汇总详情页 :id = container_id
				return window.open(`/paths/${item.container_id}`)
			case "JournalsForMessage" :
				switch (item.parent_container_type) {
					case "Principal" :
						// 反馈页 :id = parent_container_id
						// 不用跳了
						return '';
					case "HomeworkCommon" :
						//学生作业页 homework = parent_container_id
						if (item.homework_type === "normal") {
							//普通作业
							return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/question`)
						}
						if (item.homework_type === "group") {
							//分组作业
							return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/question`)
						}
						if (item.homework_type === "practice") {
							//实训作业
							return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=1`)
						}
						return "";
					case "GraduationTopic" :
						// 毕业目标页 parent_container_id
						return window.open(`/courses/${item.belong_container_id}/graduation_topics/${item.parent_container_id}/detail`)
					case "StudentWorksScore" :
						//学生作业页
						if (item.homework_type === "normal") {
							//普通作业
							return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/question`)
						}
						if (item.homework_type === "group") {
							//分组作业
							return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/question`)
						}
						if (item.homework_type === "practice") {
							//实训作业
							return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=1`)
						}
						return "";
				}
			case "Memo" :
				// 交流问答页 :id = parent_container_id
				return window.open(`/forums/${item.parent_container_id}`);
			case "Message" :
				// 交流问答页 :id = parent_container_id
				return window.open(`/forums/`);
			case "Watcher" :
				// 用户个人中心页 :id = item.trigger_user.login
				return window.open(`/users/${item.trigger_user.login}/courses`)
			case "PraiseTread" :
				// 这块太复杂 不好处理
				return '';
			case "Grade" :
				//个人中心页 :id = item.trigger_user.login
				// return window.open(`/users/${item.trigger_user.login}/courses`;
				return "";
			case "JoinProject" :
				//项目详情-申请加入项目审核页 :id = container_id
				return window.open(`/projects/${item.container_id}`)
			case  'ReporterJoinProject':
				//项目详情页 :id = container_id
				return window.open(`/projects/${item.container_id}`)
			case  'DealProject':
				//项目详情页 :id = container_id
				return window.open(`/projects/${item.container_id}`)
			case  'ManagerJoinProject':
				//项目详情页 :id = container_id
				return window.open(`/projects/${item.container_id}`)
			case "Poll":
				switch (item.parent_container_type) {
					case "CommitPoll" :
						//  课堂id belong_container_id
						//课堂-学生已提交问卷列表 :id = container_id
						return window.open(`	/courses/${item.belong_container_id}/polls/${item.container_id}`)
					default :
						// 课堂-问卷列表 :id = container_id
						return window.open(`	/courses/${item.belong_container_id}/polls/${item.container_id}`)
				}
			case "Exercise" :
				switch (item.parent_container_type) {
					case "CommitExercise":
						// 课堂-学生试卷详情 :id = container_id :user_id = trigger_user.id
						return window.open(`	/courses/${item.belong_container_id}/exercises/${item.container_id}/student_exercise_list?tab=0`);
					//记得跳评阅页面
					case "ExerciseScore":
						// 课堂-学生试卷详情 :id = container_id :user_id = trigger_user.id
						return window.open(`	/courses/${item.belong_container_id}/exercises/${item.container_id}/student_exercise_list?tab=0`);
					//记得跳评阅页面
					default :
						// 课堂-试卷列表详情 :id = container_id
						return window.open(`/courses/${item.belong_container_id}/exercises/${item.container_id}/student_exercise_list?tab=0`);
				}
			case 'StudentGraduationTopic' :
				//课堂-毕业选题详情 :id = parent_container_id
				return window.open(`/courses/${item.belong_container_id}/graduation_topics/${item.parent_container_id}/detail`)
			case  'DealStudentTopicSelect'  :
				//课堂-毕业选题详情 :id = parent_container_id
				return window.open(`/courses/${item.belong_container_id}/graduation_topics/${item.parent_container_id}/detail`)
			case 'GraduationTask' :
				//课堂-毕业任务页 :id = container_id
				return window.open(`/courses/${item.belong_container_id}/graduation_tasks/${item.container_id}`)
			case "GraduationWork" :
				//课堂-毕业xx页 :id = container_id
				return window.open(`/courses/${item.belong_container_id}/graduation_tasks/${item.container_id}`)
			case "GraduationWorkScore" :
				// 课堂-毕业xx页 :id = parent_container_id
				return window.open(`/courses/${item.belong_container_id}/graduation_tasks/${item.parent_container_id}`)
			case "HomeworkCommon" :
				switch (item.parent_container_type) {
					case "AnonymousCommentFail" :
						// 课堂-作业列表 homework = container_id
						if (item.homework_type === "normal") {
							//普通作业
							return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "group") {
							//分组作业
							return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "practice") {
							//实训作业
							return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
						}
					case "HomeworkPublish" :
						if (item.homework_type === "normal") {
							//普通作业
							return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "group") {
							//分组作业
							return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "practice") {
							//实训作业
							return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
						}
					case "AnonymousAppeal" :
						if (item.homework_type === "normal") {
							//普通作业
							return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "group") {
							//分组作业
							return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "practice") {
							//实训作业
							return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
						}
					default :
						// 课堂-作业列表 homework = container_id
						if (item.homework_type === "normal") {
							//普通作业
							return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "group") {
							//分组作业
							return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/list`)
						}
						if (item.homework_type === "practice") {
							//实训作业
							return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
						}
				}
			case "StudentWork" :
				//课堂-作业 :id = container_id
				if (item.homework_type === "normal") {
					//普通作业
					return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/${item.container_id}/appraise`)
				}
				if (item.homework_type === "group") {
					//分组作业/courses/1208/group_homeworks/22373/1219130/appraise
					return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/${item.container_id}/appraise`)
				}
				if (item.homework_type === "practice") {
					//实训作业
					return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
				}
			case "StudentWorksScore" :
				//课堂-作业 :id = parent_container_id
				// if(item.homework_type==="normal"){
				// 	//普通作业
				// 	return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/list`)
				// }
				// if(item.homework_type==="group"){
				// 	//分组作业
				// 	return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/list`)
				// }
				// if(item.homework_type==="practice"){
				// 	//实训作业
				// 	return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
				// }
				return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.trigger_user.id}/${item.parent_container_id}/appraise`);

			case "StudentWorksScoresAppeal" :
				// if(item.homework_type==="normal"){
				// 	//普通作业
				// 	return window.open(`courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/list`)
				// }
				// if(item.homework_type==="group"){
				// 	//分组作业
				// 	return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/list`)
				// }
				// if(item.homework_type==="practice"){
				// 	//实训作业
				// 	return window.open(`/courses/${item.belong_container_id}/shixun_homeworks/${item.parent_container_id}/list?tab=0`)
				// }
				return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.trigger_user.id}/${item.parent_container_id}/appraise`);
			case "ChallengeWorkScore" :
				return '';
			case "SendMessage" :
				// /managements/mirror_repository
				return window.open(`/managements/mirror_repository`)
			case "Journal" :
				//项目Issue页 :id = parent_container_id
				return window.open(`/issues/${item.parent_container_id}`);
			case "Issue" :
				//项目Issue页 :id = container_id
				return window.open(`/issues/${item.container_id}`)
			case "PullRequest" :
				// 项目pull request页 :id = parent_container_id
				return window.open(`/projects/${item.parent_container_id}/pull_requests`)
			case "Department" :
				//账号管理页
				return window.open(`/account/profile`)
			case "Library" :
				if (item.tiding_type === 'Apply') {
					// /managements/library_applies
					return window.open(`/admins/library_applies`)
				}
				if (item.tiding_type === 'System') {
					//教学案例详情 :id = container_id
					return window.open(`/moop_cases/${item.container_id}`)
				}
			case "ProjectPackage" :
				if (item.tiding_type === "Destroyed") {
					return;
				}
				if (item.tiding_type === "Destroyed_end") {
					return;
				} else {
					if (item.tiding_type === 'Apply') {
						///managements/project_package_applies
						return window.open(`/admins/project_package_applies`)
					}
					// if(item.tiding_type === 'System'){
					//众包详情 :id = container_id
					return window.open(`/crowdsourcing/${item.container_id}`)
					// }
				}
			case "Discuss":
				if (item.parent_container_type === 'Hack' && item.extra) {
					return window.open(`/myproblems/${item.extra}/comment`);
				} else {
					return window.open(`/shixuns/${item.identifier}/shixun_discuss`);
				}
			case "Video":
				if (item.tiding_type === "Apply") {
					return window.open(`/admins/video_applies`);
				} else if (item.tiding_type === "System") {
					return window.open(`/users/${this.props.current_user.login}/videos`);
				}
				return '';
			case "PublicCourseStart":
				return window.open(`/courses/${item.container_id}/informs`);
			case "SubjectStartCourse":
				return window.open(`/paths/${item.container_id}`);
			case "ResubmitStudentWork":
				if (item.homework_type === "normal") {
					//普通作业
					return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}/${item.container_id}/appraise`);
				}
				if (item.homework_type === "group") {
					//分组作业
					return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}/${item.container_id}/appraise`);
				}
			case "AdjustScore":
				//belong_container_id course的id
				if (item.homework_type === "normal") {
					//普通作业
					return window.open(`/courses/${item.belong_container_id}/common_homeworks/${item.parent_container_id}`);
				}
				if (item.homework_type === "group") {
					//分组作业
					return window.open(`/courses/${item.belong_container_id}/group_homeworks/${item.parent_container_id}`);
				}
			case 'LiveLink':
				return window.open(`/courses/${item.belong_container_id}/course_videos?open=live`);
			case 'Hack':
				if (item.extra && item.parent_container_type !== 'HackDelete') {
					return window.open(`/problems/${item.extra}/edit`);
				}
			default :
				return
		}

	}

	render() {
		let {page, limit, typeysl, count, isSpin, data} = this.state;
		// console.log("6868686868");
		console.log(data);
		return (
			<div className="clearfix ml20">
				{/*头部筛选数据*/}
				<ul className="pl10 ridingNav clearfix edu-back-white">
					<li className={typeysl === "" ? "active" : ""}><a onClick={(s, i) => this.getdata("", 1)}>全部</a></li>

					<li className={typeysl && typeysl === "course" ? "active" : ""}><a
						onClick={(s, i) => this.getdata("course", 1)}>课堂提醒</a></li>

					<li className={typeysl && typeysl === "project" ? "active" : ""}><a
						onClick={(s, i) => this.getdata("project", 1)}>项目提醒</a></li>

					{/*<li className={typeysl && typeysl === "project_package" ? "active" : ""}><a*/}
					{/*onClick={(s, i) => this.getdata("project_package", 1)}>众包提醒</a></li>*/}

					<li className={typeysl && typeysl === "interaction" ? "active" : ""}><a
						onClick={(s, i) => this.getdata("interaction", 1)}>互动提醒</a></li>

					<li className={typeysl && typeysl === "apply" ? "active" : ""}><a
						onClick={(s, i) => this.getdata("apply", 1)}>审核</a></li>

					<li className={typeysl && typeysl === "notice" ? "active" : ""}><a
						onClick={(s, i) => this.getdata("notice", 1)}>通知</a></li>


				</ul>
				{/*下面内容页面*/}
				<div className="bor-top-greyE mycenter">
					{/*这里可以进行数据处理*/}
					<div className="myw100baifenbi">
						<Spin size="large" className="myw100baifenbi mt10" spinning={isSpin}>

							{
								data === undefined ?
									<NoneData></NoneData> :
									data.length === 0 ?
										<NoneData></NoneData>
										: data.map((item, key) => {
											// console.log(data)
											// ridinglist-subs
											var boolps = true;
											if (item.container_type === "PraiseTread" || item.container_type === "Grade" || item.container_type === "ChallengeWorkScore") {
												boolps = false;
											}
											if (item.container_type === "JournalsForMessage") {
												if (item.parent_container_type === "Principal") {
													boolps = false;
												}
												if (item.parent_container_type === "HomeworkCommon") {
													if (item.homework_type === null || item.homework_type === undefined) {
														boolps = false;
													}
												}
											}
											// if(item.container_type==="HomeworkCommon"){
											// 	  if(item.parent_container_type==="AnonymousAppeal"){
											// 		boolps=false;
											// 	}
											// }
											if (item.container_type === "ProjectPackage") {
												if (item.tiding_type === "Destroyed_end") {
													boolps = false;
												}
												if (item.tiding_type === "Destroyed") {
													boolps = false;
												}
											}
											if (item.container_type === "Course") {
												if (item.tiding_type === "Delete") {
													boolps = false;
												}
											}
											if (item.container_type === "DeleteCourse") {
												if (item.tiding_type === "System") {
													boolps = false;
												}
											}
											if (item.container_type === "DeleteCourseMember") {
												if (item.tiding_type === "System") {
													boolps = false;
												}
											}
											return (
												<div className="pl25 ridinglist edu-back-white" key={key}>
													<div
														className={boolps === true ? "ridinglist-sub clearfix df tiding_item" : "ridinglist-subs clearfix df tiding_item"}
														onClick={() => this.gettourl(item)}>
														<img onMouseDown={() => this.myCome(item)}
																 src={getImageUrl("images/" + item.trigger_user.image_url)}
																 className="radius mr10 fl myimgw48 myimgh48"/>
														<div className="fl flex1">
															<p>
																<a className="mr20 private_message_a"
																	 onMouseDown={() => this.myCome(item)}>{item.trigger_user.name}</a>
																<span className="color-grey-c">{item.time}</span>
																{item.tiding_type === "Apply" ? (
																	item.status === 0 ?
																		<span className="edu-filter-btn ml20 edu-filter-btn-red">待处理</span> : ""
																) : ""}
																{item.tiding_type === "Apply" ? (
																	item.status === 1 ?
																		<span className="edu-filter-btn ml20 edu-filter-btn-green">已处理</span> : ""
																) : ""}

															</p>
															<style>
																{
																	`.yslspansk span{
													 	 color: #FF9966!important;
													 	}
													 	`
																}
															</style>
															<p className="color-grey-6 yslspansk markdown-body mt10" style={{wordBreak: "break-word"}}
																 dangerouslySetInnerHTML={{__html: markdownToHTML(item.content).replace(/▁/g, "▁▁▁")}}></p>
														</div>

														<span className={item.new_tiding === true ? "new-point fr mr40 mt22" : ""}></span>
													</div>

												</div>
											)
										})}
						</Spin>

						{/*页数*/}
						{data === undefined ? ""
							:
							(count > 10 ?
									<div style={{textAlign: "center"}} className="new_expand mt10">
										<div className="edu-txt-center mt30">
											<Pagination showQuickJumper current={page}
																	onChange={this.paginationonChanges} pageSize={limit}
																	total={count}></Pagination>
										</div>
									</div> : ""
							)

						}
					</div>

				</div>
			</div>
		)
	}
}

export default MessagSub;
