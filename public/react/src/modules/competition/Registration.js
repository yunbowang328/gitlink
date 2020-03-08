import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {SnackbarHOC, WordsBtn} from 'educoder';
import {TPMIndexHOC} from '../tpm/TPMIndexHOC';
import competition from './comcss/competition.css';
import {Button, Pagination, message, Spin, Breadcrumb} from 'antd';
import Registrationitem from './Registrationitem';
import RegisNodata from './RegisNodata';
import CompetitionMaxImg from './CompetitionMaxImg';
import RegistrationSearch from './RegistrationSearch';
import RegisListview from './RegisListview';
import RegisListviewdata from './RegisListviewdata';
import PersonModal from './competmodal/PersonModal';
import MessagePersonModal from './competmodal/MessagePersonModal';
import PersonalModalteam from './competmodal/PersonalModalteam';
import PersonalCompetititem from './personal/PersonalCompetititem';
import ExittheteamModel from './competmodal/ExittheteamModel';
// 团队竞赛报名无报名
class Registration extends React.Component {
	/***
	 *"personal": false, // 是否为个人赛
	 *"enroll_ended": false,    // 报名是否截止
	 *"enrolled: false,    // 是否已经报名
	 *"teacher_staff": { // 为空表示不支持老师报名
	 *"member_staff": { // 为空表示不支持学生报名
	 * personal// 是否是个人赛
	 * type 是按设计图来的
	 * **/
	constructor(props) {
		super(props)
		this.state = {
			loadingstate: false,
			pages: 1,
			limit: 20,
			type: 7,
			tmodalsType: false,
			tmodalsTypes: false,
			Newtit: true,
			keyword: "",
			page: 1,
			per_page: 20,
			data: [],
			competition_teams: [],
			count: 0,
			GetenrollmentAPI: undefined,
			personal: false,
			enroll_ended: false,
			enrolled: false,
			teacher_staff: null,
			member_staff: null,
			messagePer: "提示",
			messagePerbool: false,
			intpermessages: "确认",
			messageexit: "提示",
			messageexitol: false,
			exitintpermessages: "是否确认退出战队?",
			itemid: undefined,
			itemiddata: [],
			pint: 0,
			competition_name: undefined,
			mutiple_limited: false,
			teamutiple_limited: false,
			members_count: 0,
			mode: 0,
			region_schools: [],
			admin: false,
			typeysl: 0,

		}
	}

	componentDidMount() {
		// console.log(this.props);

		// //////console.log("componentDidMount Registration");
		//  //// //////console.log("调用子组件 ");
		// //////console.log(this.props.isAdmin());
		//  //// //////console.log(this.props.isAdmin())
		try {
			const {keyword, page, per_page} = this.state;
			this.Getdata(keyword, page, per_page, this.props.user.admin);// 获取列表数据
			this.GetenrollmentAPI();//获取我的报名配置
			this.setState({
				admin: this.props.user.admin
			})
		} catch (e) {
			// 	const {keyword, page, per_page} = this.state;
			// 	this.Getdata(keyword, page, per_page, this.props.isAdmin());
			// 	this.GetenrollmentAPI();
		}
		//取模式
		this.Getdataheader();
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.user != this.props.user) {
			// console.log("componentDidUpdate");
			// console.log(this.props);
			////console.log("Registration");
			////console.log("componentDidUpdate");
			////console.log(this.props.user.admin);
			const {keyword, page, per_page} = this.state;
			this.Getdata(keyword, page, per_page, this.props.user.admin);
			//取报名配置
			this.GetenrollmentAPI();
			//取模式
			this.Getdataheader();
			this.setState({
				admin: this.props.user.admin
			})
		}

	}

	// 获取数据头部
	Getdataheader = () => {
		const url = `/competitions/${this.props.match.params.identifier}/common_header.json`;
		axios.get((url)).then((result) => {
			if (result) {
				if (result.data) {
					this.setState({
						mode: result.data.mode,
						region_schools: result.data.region_schools
					})

				}
			}
		}).catch((error) => {

		})


	}

	//获取报名配置API
	GetenrollmentAPI = () => {
		// console.log("调用了GetenrollmentAPI");
		const url = `/competitions/${this.props.match.params.identifier}/competition_staff.json`;
		axios.get((url)).then((result) => {
			if (result) {
				if (result.data) {
					//// //////console.log("获取报名配置API");
					//// //////console.log(result);
					this.setState({
						GetenrollmentAPI: result.data,
						personal: result.data.personal,
						enroll_ended: result.data.enroll_ended,
						enrolled: result.data.enrolled,
						teacher_staff: result.data.teacher_staff === undefined || result.data.teacher_staff === null ? null : result.data.teacher_staff,
						member_staff: result.data.member_staff === undefined || result.data.member_staff === null ? null : result.data.member_staff,

					})

					try {
						//获取学生是否被限制多次报名
						if (result.data.member_staff) {
							this.setState({
								mutiple_limited: result.data.member_staff.mutiple_limited,

							})
						}


					} catch (e) {

					}

					try {
						//获取老师是否被限制多次报名
						if (result.data.teacher_staff) {
							this.setState({
								teamutiple_limited: result.data.teacher_staff.mutiple_limited
							})
						}

					} catch (e) {

					}

					//是否是个人赛做处理
					if (result.data.personal === true) {
						if (result.data.enroll_ended === true) {
							this.setState({
								pint: 0
							})
						} else if (result.data.enrolled === true) {
							this.setState({
								pint: 2
							})
						} else if (result.data.enrolled === false) {
							this.setState({
								pint: 1
							})
						}
					}

				}
			}
		}).catch((error) => {
			console.log("GetenrollmentAPI");
			console.log(error);
		})
	}

	Getdata = (keyword, page, per_page, admin) => {
		//搜索关键字  keyword
		//页数 page
		//分页 per_page
		const datas = {
			keyword: keyword,
			page: page,
			per_page: per_page,
		};
		let url = `/competitions/${this.props.match.params.identifier}/competition_teams.json`;
		axios.get((url), {params: datas}).then((result) => {
			if (result) {
				if (result.data) {
					//// //////console.log(result);\
					if (result.data.personal === false) {
						//不是个人赛
						if (result.data.my_teams.length === 0) {
							// 没有创建数据的
							if (admin === true) {
								//管理员
								try {
									this.setState({
										type: 4,
										count: result.data.count,
										data: result.data.my_teams,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count
									})
								} catch (e) {
									this.setState({
										type: 4,
										count: result.data.count,
										data: result.data.my_teams,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count
									})
								}

							} else {
								//普通账号
								this.setState({
									type: 1,
									count: result.data.count,
									data: result.data.my_teams,
									competition_teams: result.data.competition_teams,
									personal: result.data.personal,
									competition_name: result.data.competition_name,
									members_count: result.data.members_count
								})
							}
						} else {
							//有数据的
							if (admin === true) {
									this.setState({
										type: 5,
										data: result.data.my_teams,
										count: result.data.count,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count
									})
							} else {
									//普通账号true 为创建了竞赛
									this.setState({
										type: 2,
										data: result.data.my_teams,
										count: result.data.count,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count
									})
							}

						}
					} else {
						if (this.props.user.admin === true) {
							try {

								if (result.data.competition_teams.length === 0) {
									this.setState({
										type: 6,
										typeysl: 1,
										data: result.data.competition_teams,
										count: result.data.count,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count,

									})
								} else {
									this.setState({
										type: 6,
										typeysl: 0,
										data: result.data.competition_teams,
										count: result.data.count,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count,

									})
								}
							} catch (e) {
								this.setState({
									type: 6,
									typeysl: 1,
									data: result.data.competition_teams,
									count: result.data.count,
									competition_teams: result.data.competition_teams,
									personal: result.data.personal,
									competition_name: result.data.competition_name,
									members_count: result.data.members_count,

								})
							}
						} else {
							try {

								if (result.data.my_teams.length === 0) {
									this.setState({
										type: 6,
										typeysl: 1,
										data: result.data.my_teams,
										count: result.data.count,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count,

									})
								} else {
									this.setState({
										type: 6,
										typeysl: 0,
										data: result.data.my_teams,
										count: result.data.count,
										competition_teams: result.data.competition_teams,
										personal: result.data.personal,
										competition_name: result.data.competition_name,
										members_count: result.data.members_count,

									})
								}
							} catch (e) {
								this.setState({
									type: 6,
									typeysl: 1,
									data: result.data.my_teams,
									count: result.data.count,
									competition_teams: result.data.competition_teams,
									personal: result.data.personal,
									competition_name: result.data.competition_name,
									members_count: result.data.members_count,

								})
							}
						}


					}
				}
			}
			this.setState({
				loadingstate: false,
			})
		}).catch((error) => {
			if (admin === true) {
				//管理员
				this.setState({
					type: 4,
					count: 0,
					competition_teams: [],
					data: [],
					loadingstate: false,
				})
			} else {
				//普通账号
				this.setState({
					type: 1,
					count: 0,
					competition_teams: [],
					data: [],
					loadingstate: false,
				})
			}
		})

	}

	// Getdatatype5 = (keyword, page, per_page, admin) => {
	// 	//搜索关键字  keyword
	// 	//页数 page
	// 	//分页 per_page
	// 	const datas = {
	// 		keyword: keyword,
	// 		page: page,
	// 		per_page: per_page,
	// 	};
	// 	let url = `/competitions/${this.props.match.params.identifier}/competition_teams.json`;
	// 	axios.get((url), {params: datas}).then((result) => {
	// 		this.setState({
	// 			loadingstate: false,
	// 		})
	// 		if (result) {
	// 			if (result.data) {
	// 				//// //////console.log(result);
	// 				if (result.data.personal === false) {
	// 					//不是个人赛
	// 					////console.log("Getdatatype5");
	// 					////console.log(result.data.my_teams.length);
	// 					if (result.data.my_teams.length === 0) {
	// 					// 没有创建数据的
	// 					//管理员
	// 						////console.log("a");
	// 						////console.log(this.state.competition_teams);
	// 						////console.log(result.data.competition_teams);
	// 					this.setState({
	// 						type: 4,
	// 						count: result.data.count,
	// 						competition_teams: result.data.competition_teams,
	// 						data: result.data.my_teams,
	// 						personal: result.data.personal,
	// 						competition_name: result.data.competition_name,
	// 						members_count:result.data.members_count
	//
	//
	// 					})
	// 				} else {
	// 					//有数据的
	// 						////console.log("b");
	//
	// 						if (result.data.my_teams[0].manage_permission === true) {
	// 						this.setState({
	// 							type: 5,
	// 							data: result.data.my_teams,
	// 							count: result.data.count,
	// 							competition_teams: result.data.competition_teams,
	// 							personal: result.data.personal,
	// 							competition_name: result.data.competition_name,
	// 							members_count:result.data.members_count
	//
	//
	// 						})
	// 					} else {
	// 							////console.log("c");
	//
	// 							this.setState({
	// 							type: 4,
	// 							data: result.data.my_teams,
	// 							count: result.data.count,
	// 							competition_teams: result.data.competition_teams,
	// 							personal: result.data.personal,
	// 								competition_name: result.data.competition_name,
	// 								members_count:result.data.members_count
	//
	//
	// 							})
	// 					}
	// 				}
	// 				} else {
	// 					//团队赛
	// 					//////console.log("d");
	//
	// 					this.setState({
	// 						type: 6,
	// 						data: result.data.my_teams,
	// 						count: result.data.count,
	// 						competition_teams: result.data.competition_teams,
	// 						personal: result.data.personal,
	// 						competition_name: result.data.competition_name,
	// 						members_count:result.data.members_count
	//
	//
	// 					})
	// 				}
	//
	// 			}
	// 		}
	//
	// 	}).catch((error) => {
	// 		////console.log("k");
	//
	// 		////console.log(error);
	// 		////console.log("报错了");
	// 		if (admin === true) {
	// 			//管理员
	// 			this.setState({
	// 				count: 0,
	// 				competition_teams: [],
	// 				data: [],
	// 				loadingstate: false,
	// 			})
	// 		} else {
	// 			//普通账号
	// 			this.setState({
	// 				count: 0,
	// 				competition_teams: [],
	// 				data: [],
	// 				loadingstate: false,
	// 			})
	// 		}
	// 	})
	// }


	//团队竞赛翻页
	paginationonChangestwo = (pageNumber) => {
		this.setState({
			pages: pageNumber,
			loadingstate: true,
		})
		const {keyword, per_page} = this.state;
		this.Getdata(keyword, pageNumber, per_page, this.props.user.admin);

	};
	/**
	 * 加入战队
	 * */
	Jointheteam = () => {
		if (this.props.checkIfLogin() === false) {
			this.props.showLoginDialog()
			return
		}

		let {region_schools} = this.state;
		//判断是否是否是同一个学校，数组元素为0就不用判断
		try {
			if (region_schools.length > 0) {
				let i = 0;
				for (var r = 0; r < region_schools.length; r++) {
					if (region_schools[r] === this.props.user.user_school) {
						// 终止循环
						break;

					}
					i = i + 1;
				}
				if (i === region_schools.length) {
					//如果i 等于region_schools.length，说明本次循环中没有相同的学校，本人不支持报名
					try {
						this.props.showNotification(`本竞赛只面向部分学校/单位开放，你暂时没有参赛资格!`);

					} catch (e) {

					}
					this.Getdataheader();
					return
				}

			}
		} catch (e) {

		}



		if (this.props.user.is_teacher === true) {
			try {
				if (this.state.teamutiple_limited === true) {
					if (this.state.enrolled === true) {
						//已经报名
						this.setState({
							messagePerbool: true,
							intpermessages: "你已经报名,不能重复报名"
						})
						return;
					}
				}
			} catch (e) {

			}

		} else {
			try {
				if (this.state.mutiple_limited === true) {
					if (this.state.enrolled === true) {
						//已经报名
						this.setState({
							messagePerbool: true,
							intpermessages: "你已经报名,不能重复报名"
						})
						return;
					}
				}
			} catch (e) {

			}
		}


		if (this.state.enroll_ended === true) {
			//报名截止
			this.setState({
				messagePerbool: true,
				intpermessages: "报名已截止，无需报名"
			})
			return
		}


		if (this.props.user.is_teacher === true) {
			//老师
			if (this.state.teacher_staff === null) {
				//禁止老师
				this.setState({
					messagePerbool: true,
					intpermessages: "已禁止老师报名"
				})
				return;
			}
			this.setState({
				tmodalsTypes: true
			})
		} else {
			//学生
			if (this.state.member_staff === null) {
				//禁止学生
				this.setState({
					messagePerbool: true,
					intpermessages: "已禁止学生报名"
				})
				return;
			}
			this.setState({
				tmodalsTypes: true
			})
		}
		// this.setState({
		// 	tmodalsTypes: true
		// })

	}

	/**
	 * 创建战队
	 **/
	Createateam = () => {
		if (this.props.checkIfLogin() === false) {
			this.props.showLoginDialog()
			return
		}

		let {region_schools} = this.state;
		//判断是否是否是同一个学校，数组元素为0就不用判断
		try {
			if (region_schools.length > 0) {
				let i = 0;
				for (var r = 0; r < region_schools.length; r++) {
					if (region_schools[r] === this.props.user.user_school) {
						// 终止循环
						break;

					}
					i = i + 1;
				}
				if (i === region_schools.length) {
					//如果i 等于region_schools.length，说明本次循环中没有相同的学校，本人不支持报名
					try {
						this.props.showNotification(`本竞赛只面向部分学校/单位开放，你暂时没有参赛资格!`);
					} catch (e) {

					}
					this.Getdataheader();
					return
				}

			}
		} catch (e) {

		}


		if (this.props.user.is_teacher === true) {
			try {
				if (this.state.teamutiple_limited === true) {
					if (this.state.enrolled === true) {
						//已经报名
						this.setState({
							messagePerbool: true,
							intpermessages: "你已经报名,不能重复报名"
						})
						return;
					}
				}
			} catch (e) {

			}

		} else {
			try {
				if (this.state.mutiple_limited === true) {
					if (this.state.enrolled === true) {
						//已经报名
						this.setState({
							messagePerbool: true,
							intpermessages: "你已经报名,不能重复报名"
						})
						return;
					}
				}
			} catch (e) {

			}
		}
		if (this.state.enroll_ended === true) {
			//报名截止
			this.setState({
				messagePerbool: true,
				intpermessages: "报名已截止，无需报名"
			})
			return
		}

		if (this.props.user.is_teacher === true) {
			//老师
			if (this.state.teacher_staff === null) {
				//禁止老师
				this.setState({
					messagePerbool: true,
					intpermessages: "已禁止老师报名"
				})
				return;
			}
			this.setState({
				tmodalsType: true,
				Newtit: true,
			})
		} else {
			//学生
			if (this.state.member_staff === null) {
				//禁止学生
				this.setState({
					messagePerbool: true,
					intpermessages: "已禁止学生报名"
				})
				return;
			}
			this.setState({
				tmodalsType: true,
				Newtit: true,
			})
		}
	}

	//编辑战队
	Createateamedit = (data) => {
		this.setState({
			tmodalsType: true,
			Newtit: false,
			itemiddata: data
		})
	}
	Tmoconfirm = (bool) => {
		//boolfalse 取消 true 确认
		this.setState({
			tmodalsTypes: false
		})
		if (bool) {
			//确认
			this.Refreshteam();

		} else {
			//取消


		}
	}

	//创建战队确认
	Tmoconfirm1 = (bool) => {
		//boolfalse 取消 true 确认
		this.setState({
			tmodalsType: false
		})
		if (bool) {
			//确认
			this.Refreshteam();
		} else {
			//取消


		}
	}

	//自定义弹框按钮
	messagePerboolbuton = () => {
		this.setState({
			messagePerbool: false
		})
	}
	//显示退出战队弹框
	Exittheteamshow = (itemid, bool) => {
		if (bool === true) {
			this.setState({
				messageexitol: true,
				itemid: itemid,
				exitintpermessages: "是否确认删除战队",
			})
		} else {
			this.setState({
				messageexitol: true,
				itemid: itemid,
				exitintpermessages: "是否确认退出战队",
			})
		}


	};
	//刷新战队
	Refreshteam = () => {
		const {keyword, page, per_page} = this.state;
		this.Getdata(keyword, page, per_page, this.props.user.admin);
		this.GetenrollmentAPI();
	}
	//退出战队
	Exittheteam = (bool) => {
		//  //////console.log(this.state.itemid);
		if (bool) {
			this.setState({
				messageexitol: true
			})

			let url = `/competitions/${this.props.match.params.identifier}/competition_teams/${this.state.itemid}/leave.json`;
			axios.post(url).then((response) => {
				if (response) {
					if (response.data) {
						//////console.log("退出战队");
						//////console.log(response);
						this.Refreshteam();
						this.setState({
							messageexitol: false
						})

					}
				}
			}).catch((error) => {
				//////console.log(error)
			});

		} else {
			this.setState({
				messageexitol: false
			})
		}
	}
	//搜索战队
	RegistrationSearchvalue = (value) => {
		////console.log("RegistrationSearchvalue");
		////console.log(this.props.user.admin);
		this.setState({
			pages: 1,
			limit: 20,
		})
		this.Getdata(value, 1, 20, this.props.user.admin);
	}

	//个人竞赛
// /competitions/:identifier/competition_teams.json
	Personalregistration = () => {
		let {teacher_staff, member_staff, data, enroll_ended, enrolled} = this.state;

		if (this.props.checkIfLogin() === false) {
			this.props.showLoginDialog();
			return
		}

		if (enroll_ended === true) {
			//已截止
			this.props.showNotification(`报名已截止`);
			return;
		}
		if (enrolled === true) {
			this.props.showNotification(`你已经报名,不能重复报名！`);
			return;
		}
		const url = `/competitions/${this.props.match.params.identifier}/competition_teams.json`;
		axios.post(url).then((response) => {
			if (response) {
				if (response.data) {
					this.props.showNotification(`报名成功,预祝您夺得桂冠!`);
					this.Refreshteam();
				}
			}
		}).catch((error) => {

		});
	}


	render() {
		const {page, admin, typeysl, mode, pages, limit, type, tmodalsType, tmodalsTypes, data, count, competition_teams, Newtit, itemiddata, messagePerbool, messageexitol, GetenrollmentAPI, loadingstate, pint, competition_name, mutiple_limited, teamutiple_limited, members_count} = this.state;

		return (
			<div className="newMain clearfix  newMainybot">

				<div className={"educontent  mb20 persmstyle"} style={{width: "1200px", marginTop: "26px"}}>
					<style>
						{
							`
							 html, body{
									overflow: hidden;
									height: 100%;
							}
							`
						}
					</style>
					{
						messagePerbool === true ?
							<MessagePersonModal messagePer={this.state.messagePer} {...this.props} {...this.state}
																	messagePerboolbuton={() => this.messagePerboolbuton()}
																	GetenrollmentAPI={GetenrollmentAPI}></MessagePersonModal>
							: ""
					}
					{/*编辑创建战队*/}
					{
						tmodalsType === true ?
							<PersonModal modalsType={tmodalsType} {...this.props} {...this.state} Newtit={Newtit}
													 mutiple_limited={mutiple_limited}
													 teamutiple_limited={teamutiple_limited}
													 itemiddata={itemiddata} GetenrollmentAPI={GetenrollmentAPI}
													 Tmoconfirm1={(bool) => this.Tmoconfirm1(bool)}
													 GetenrollmentAPIopens={() => this.GetenrollmentAPI()}
							></PersonModal>
							:
							""
					}
					{
						tmodalsTypes === true ?
							<PersonalModalteam tmodalsTypes={tmodalsTypes} {...this.props} {...this.state}
																 GetenrollmentAPI={GetenrollmentAPI}
																 Tmoconfirm={(bool) => this.Tmoconfirm(bool)}></PersonalModalteam>
							: ""
					}
					{
						messageexitol === true ?
							<ExittheteamModel {...this.props} {...this.state} GetenrollmentAPI={GetenrollmentAPI}
																Exittheteam={(bool) => this.Exittheteam(bool)}></ExittheteamModel>
							: ""
					}


					<div style={{marginBottom: '12px'}}>
						<Breadcrumb separator=">">
							<Breadcrumb.Item><Link to={"/competitions"}>在线竞赛</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link
								to={`/competitions/${this.props.match.params.identifier}`}>{competition_name === undefined || competition_name === null || competition_name === "" ? "全国高校计算机大赛" : competition_name}</Link></Breadcrumb.Item>
							{/*<Breadcrumb.Item*/}
							{/*	href={`/competitions/${this.props.match.params.identifier}/common_header`}></Breadcrumb.Item>*/}
							<Breadcrumb.Item>报名</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					{/*大图*/}
					<CompetitionMaxImg type={type} Jointheteam={() => this.Jointheteam()}
														 pint={pint}
														 {...this.props} {...this.state}
														 Createateam={() => this.Createateam()}
														 Personalregistration={() => this.Personalregistration()}
					></CompetitionMaxImg>
					{/*大图结尾*/}
					{/*没数据*/}
					{admin === true ?
						(pint === 1 || pint === 3 ?
							<div style={{
								marginTop: "22px"
							}}>
								<p>参赛总人数：<span style={{color: "#459BE5"}}>{members_count}</span><span
									style={{marginLeft: "5px"}}>人</span>
								</p>
							</div> : "")
							: ""}
					{/*列表*/}
					{
						type === 6 ?
							<div
								style={{
									marginTop: "31px"
								}}
							>
								<Spin spinning={loadingstate}>
									{
										data && data.map((item, index) => {
											return (
												<Registrationitem  {...this.props} {...this.state} key={index} item={item}></Registrationitem>
											)
										})
									}

								</Spin>

							</div>
							: ""}
					{
						type === 1 || typeysl === 1 ?
							<RegisNodata  {...this.props} {...this.state} ></RegisNodata>
							:
							""
					}
					{/*普通账号出现单人 战队弹框*/}
					{
						type === 2 || type === 3 || type === 5 ?
							(
								data && data.map((item, index) => {
									return (
										<PersonalCompetititem key={index} type={type} item={item} index={index} mode={mode}
																					Exittheteamshow={(itemid) => this.Exittheteamshow(itemid)}
																					Createateamedit={(itemid) => this.Createateamedit(itemid)}
																					{...this.props} {...this.state}
										></PersonalCompetititem>
									)
								})
							)

							: ""
					}

					{
						type === 4 || type === 5 ?
							<RegistrationSearch    {...this.props} {...this.state} count={count}
																		 RegistrationSearchvalue={(value) => this.RegistrationSearchvalue(value)}></RegistrationSearch>
							: ""
					}
					{/*<Registrationitem></Registrationitem>*/}
					{
						type === 4 || type === 5 ?
							<RegisListview  {...this.props} {...this.state}></RegisListview>
							:
							""
					}


					{type === 4 || type === 5 ?
						<Spin spinning={loadingstate}>
							{
								competition_teams && competition_teams.map((item, index) => {
									return (
										<RegisListviewdata    {...this.props} {...this.state} key={index} item={item} admin={admin}></RegisListviewdata>
									)
								})
							}

						</Spin>
						:
						""
					}

					{
						type === 4 || type === 5 ?
							(
								count < 20 ? <div style={{
										height: "20px",
										minHeight: "20px"
									}}></div> :
									<div className="edu-txt-center ysyslxh mt56 " style={{marginBottom: "192px",}}>
										<Pagination showQuickJumper current={pages}
																onChange={this.paginationonChangestwo} pageSize={limit}
																total={count}></Pagination>
									</div>
							)

							: <div style={{
								height: "20px",
								minHeight: "20px"
							}}></div>
					}

				</div>

			</div>
		)
	}

}

export default Registration;


// if (admin === true) {
// 	// if (result.data.my_teams[0].manage_permission === true) {
// 	this.setState({
// 		type: 5,
// 		data: result.data.my_teams,
// 		count: result.data.count,
// 		competition_teams: result.data.competition_teams,
// 		personal: result.data.personal,
// 		competition_name: result.data.competition_name,
// 		members_count: result.data.members_count
//
//
// 	})
// // } else {
// // 	this.setState({
// // 		type: 4,
// // 		data: result.data.my_teams,
// // 		count: result.data.count,
// // 		competition_teams: result.data.competition_teams,
// // 		personal: result.data.personal,
// // 		competition_name: result.data.competition_name,
// // 		members_count: result.data.members_count
// //
// //
// // 	})

// if (result.data.my_teams[0].manage_permission === true) {
//普通账号true 为创建了竞赛
// this.setState({
// 	type: 2,
// 	data: result.data.my_teams,
// 	count: result.data.count,
// 	personal: result.data.personal,
// 	competition_name: result.data.competition_name,
// 	members_count: result.data.members_count
//
//
// })
// } else {
// 	//普通账号true 加入了竞赛
// 	this.setState({
// 		type: 2,
// 		data: result.data.my_teams,
// 		count: result.data.count,
// 		personal: result.data.personal,
// 		competition_name: result.data.competition_name,
// 		members_count: result.data.members_count
//
//
// 	})
// }
