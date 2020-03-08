import React, {Component} from 'react';
import {getImageUrl} from 'educoder';
import {Modal, Input, Spin, Tooltip, Icon, Dropdown, Button, Empty} from 'antd';
import axios from 'axios';
import competition from '../comcss/competition.css';
import Registrationitem from "../Registrationitem";
import InfiniteScroll from 'react-infinite-scroller';
// import PersonModaltion from "./PersonModaltion";
import NoneData from '../../../modules/courses/coursesPublic/NoneData'
const {Search} = Input;

//创建战队
var myabool = true;
var myabool2 = true;
class PersonModal extends Component {
	//导师是搜索 和学生搜索都会添加到下面框中
	/**
	 * mydatas最下面列表显示的参数
	 * booltech 控制老师是否重复添加的参数
	 * myuser 创建者的信息
	 * teacher_idss 老师数组
	 * member_ids 学生数组
	 * polls_nametest 战队名字
	 * **/

	constructor(props) {
		super(props);
		this.state = {
			addonAfter: 0,
			loading: false,
			loading1: false,
			loading2: false,
			hasMore: true,
			person1: false,
			person2: false,
			Numberofteammentors: "0-3",
			Thecurrentnumber: "0",
			keywordteachers: "",
			team_idstudents: undefined,
			team_idteachers: undefined,
			teacher_ids: undefined,
			keywordstudents: "",
			Aggregatedata: [],
			name: "",
			teacher_idss: [],
			member_ids: [],
			myuser: undefined,
			mydatas: [],
			booltech: false,
			boolstud: false,
			polls_nametest: "",
			myteaherdata: [],
			myshtudentdata: [],
			Thecurrentnumberbool: false,
			Thecurrentnumberboolstu: false,
			Thecurrentnumberstu: "",


		}
	}
	componentDidMount() {
		var data = [];
		var polls_nametests = "";
		var datas = {
			enrollable: false,
			id: this.props.user.user_id,
			name: this.props.user.real_name,
			school_name: this.props.user.user_school,
			student_id: null,
			identity: this.props.user.user_identity,
			type: this.props.user.is_teacher === true ? "导师" : "队员",
		};
		data.push(datas);

		// console.log("itemiddata");
		// console.log("编辑战队")
		// console.log(this.props.itemiddata);
		try {
			if (this.props.Newtit === false) {
				for (var i = 0; i < this.props.itemiddata.team_members.length; i++) {
					if (i === 0) {
						///因为第一个位置是创建者 所以要过滤掉
					} else {
						var datasy = {
							enrollable: false,
							id: this.props.itemiddata.team_members[i].user_id,
							name: this.props.itemiddata.team_members[i].name,
							school_name: this.props.itemiddata.team_members[i].school_name,
							student_id: null,
							identity: this.props.itemiddata.team_members[i].identity,
							type: this.props.itemiddata.team_members[i].role === "teacher" ? "导师" : "队员",
						};
						data.push(datasy);
					}
				}
				if (this.props.itemiddata) {
					polls_nametests = this.props.itemiddata.name;
				}
			}
		} catch (e) {

		}

		this.setState({
			myuser: this.props.user,
			mydatas: data,
			polls_nametest: polls_nametests,

		})
		this.setState({
			GetenrollmentAPI: this.props.GetenrollmentAPI,
		})
		try {
			this.setState({
				addonAfter: polls_nametests.length,
			})
		} catch (e) {

		}

	}

	componentDidUpdate = (prevProps) => {
		// if (prevProps.user != this.props.user) {
		// 	////console.log("Registration.js componentDidUpdate");
		// 	////console.log(this.props);
		// 	// ////console.log(prevProps);
		// 	//identity职场称
		// 	//user_school学校
		// 	//real_name姓名
		// 	//type 类型
		// 	var data = [];
		// 	var datas = {
		// 		enrollable: false,
		// 		id: undefined,
		// 		name: this.props.user.real_name,
		// 		school_name: this.props.user.user_school,
		// 		student_id: null,
		// 		identity: this.props.user.user_identity,
		// 		type: "导师",
		// 	};
		// 	data.push(datas);
		// 	this.setState({
		// 		myuser: this.props.user,
		// 		mydatas: data,
		// 	})
		// }

		if (prevProps.GetenrollmentAPI != this.props.GetenrollmentAPI) {
			////console.log("Registration.js GetenrollmentAPIcomponentDidUpdate");
			////console.log(this.props);
			this.setState({
				GetenrollmentAPI: this.props.GetenrollmentAPI,
			})
		}
	};
	//创建战队
	Createateam = () => {
		try {
			if (this.state.polls_nametest.length === 0) {
				this.props.showNotification(`请输入您的战队名称，最多不超过60个字符`);
				return
			}
		} catch (e) {

		}



		const {polls_nametest, mydatas, GetenrollmentAPI} = this.state;
		var myteaherdata = [];
		var myshtudentdata = [];
		var i = 0;
		var s = 0;
		for (var a = 0; a < mydatas.length; a++) {
			if (mydatas[a].type === "导师") {
				i++;
				// var objectt = {
				// 	enrollable: mydatas[a].enrollable,
				// 	id: mydatas[a].id,
				// 	identity: mydatas[a].identity,
				// 	name: mydatas[a].name,
				// 	school_name: mydatas[a].school_name,
				// }
				myteaherdata.push(mydatas[a].id);
			} else if (mydatas[a].type === "队员") {
				s++;
				// var objectts = {
				// 	enrollable: mydatas[a].enrollable,
				// 	id: mydatas[a].id,
				// 	name: mydatas[a].name,
				// 	school_name: mydatas[a].school_name,
				// 	student_id: mydatas[a].student_id,
				// }
				myshtudentdata.push(mydatas[a].id);
			}
		}

		// try {
		// 	if (i === 0) {
		// 		this.props.showNotification(`请添加导师`);
		// 		return;
		// 	}
		// } catch (e) {
		//
		// }
		//
		// try {
		// 	if (s === 0) {
		// 		this.props.showNotification(`请添加队员`);
		// 		return;
		// 	}
		// } catch (e) {
		//
		// }


		//确认的时候 去确认老师人数是否符合
		try {
			if (GetenrollmentAPI) {
				if (GetenrollmentAPI.teacher_staff) {
					if (GetenrollmentAPI.teacher_staff.minimum > i) {
						this.setState({
							Thecurrentnumberbool: true,
							Thecurrentnumber: i,
							booltech: false,
							boolstud: false
						})
						return
					} else if (GetenrollmentAPI.teacher_staff.maximum < i) {
						this.setState({
							Thecurrentnumberbool: true,
							Thecurrentnumber: i,
							booltech: false,
							boolstud: false
						})
						return
					}
					this.setState({
						Thecurrentnumberbool: false,
						Thecurrentnumber: i,
						booltech: false,
						boolstud: false
					})
				}
			}
		} catch (e) {

		}

		//确认的时候 去确认学生人数是否符合
		try {
			if (GetenrollmentAPI) {
				if (GetenrollmentAPI.member_staff) {
					if (GetenrollmentAPI.member_staff.minimum > s) {
						this.setState({
							Thecurrentnumberboolstu: true,
							Thecurrentnumberstu: s,
							booltech: false,
							boolstud: false
						})
						return
					} else if (GetenrollmentAPI.member_staff.maximum < s) {
						this.setState({
							Thecurrentnumberboolstu: true,
							Thecurrentnumberstu: s,
							booltech: false,
							boolstud: false
						})
						return
					}
					this.setState({
						Thecurrentnumberboolstu: false,
						Thecurrentnumberstu: s,
						booltech: false,
						boolstud: false
					})
				}
			}
		} catch (e) {

		}


		// Thecurrentnumber
		if (this.props.Newtit === true) {
			//创建新的战队
			let url = `/competitions/${this.props.match.params.identifier}/competition_teams.json`;
			axios.post(url, {
				name: polls_nametest,
				teacher_ids: myteaherdata,
				member_ids: myshtudentdata,
			}).then((result) => {
				// ////console.log("获取到创建战队的数据");
				// ////console.log(result);
				if (result) {
					if (result.data) {
						try {
							if (result.data.status === 0) {
								this.props.showNotification(`报名成功，预祝您夺得桂冠`);
							}
						} catch (e) {

						}
						this.props.Tmoconfirm1(true);
					}
				}
			}).catch((error) => {
				// ////console.log(error)
			});
		} else {
			//编辑战队
			let url = `/competitions/${this.props.match.params.identifier}/competition_teams/${this.props.itemiddata.id}.json`;
			axios.put(url, {
				name: polls_nametest,
				teacher_ids: myteaherdata,
				member_ids: myshtudentdata,
			}).then((result) => {
				// ////console.log("获取到编辑战队的数据");
				// ////console.log(result);
				if (result) {
					if (result.data) {
						this.props.Tmoconfirm1(true);
					}
				}
			}).catch((error) => {
				// ////console.log(error)
			});
		}
	}
	Getteacherdata = (keywordteachers, team_idteachers, teacher_ids) => {
		this.setState({
			person1: true,
			person2: false,
		})
		//老师姓名  keyword
		//当前战队ID team_id
		//当前老师ID数组 teacher_ids
		// ////console.log("搜索的老师");
		const datas = {
			keyword: keywordteachers,
			team_id: null,
			teacher_ids: null,
		};
		let url = `/competitions/${this.props.match.params.identifier}/teachers.json`;
		axios.get((url), {params: datas}).then((result) => {
			if (result) {
				if (result.data) {
					// ////console.log(result);
					this.setState({
						teacher_ids: result.data.teachers
					})
				}
			}
		}).catch((error) => {
			// ////console.log(error);
		})
	};
	Getstudentsdata = (keywordstudents, team_idstudents, student_ids) => {
		this.setState({
			person1: false,
			person2: true,
		})
		//学生姓名  keyword
		//当前战队ID team_id
		//当前队员ID数组 student_ids
		// ////console.log("搜索的学生");
		const datas = {
			keyword: keywordstudents,
			team_id: null,
			student_ids: null,
		};
		let url = `/competitions/${this.props.match.params.identifier}/students.json`;
		axios.get((url), {params: datas}).then((result) => {
			if (result) {
				if (result.data) {
					// ////console.log(result);
					this.setState({
						member_ids: result.data.teachers
					})

				}
			}
		}).catch((error) => {
			// ////console.log(error);
		})
	};

	//老师输入框事件
	teacheronChange = (e) => {
		// ////console.log(e.target.value);
		// ////console.log("老师输入框事件|||||||||||123123123");
		this.setState({
			keywordteachers: e.target.value,
			booltech: false,
			Thecurrentnumberbool: false,
			Thecurrentnumberboolstu: false,
		})
		// try {
		// 	if (e.target.value.length > 0) {
		// 		this.setState({
		// 			person1: true,
		// 			person2: false,
		// 			keywordteachers: e.target.value
		// 		})
		// 	} else {
		// 		this.setState({
		// 			person1: false,
		// 			person2: false,
		// 			keywordteachers: e.target.value
		// 		})
		// 	}
		// } catch (e) {
		// 	this.setState({
		// 		person1: true,
		// 		person2: false,
		// 		keywordteachers: e.target.value
		// 	})
		// }

		// try {
		// 	const {team_idteachers, teacher_ids} = this.state;
		// 	this.Getteacherdata(e.target.value, team_idteachers, teacher_ids);
		// } catch (e) {
		//
		// }
	};

	//学生输入框事件
	studentsonChange = (e) => {
		// ////console.log("学生输入框事件");
		// ////console.log(e);
		this.setState({
			keywordstudents: e.target.value,
			boolstud: false,
			Thecurrentnumberbool: false,
			Thecurrentnumberboolstu: false,
		});

		// try {
		// 	if (e.target.value.length > 0) {
		// 		this.setState({
		// 			person2: true,
		// 			person1: false,
		// 			keywordstudents: e.target.value
		// 		});
		// 	} else {
		// 		this.setState({
		// 			person2: false,
		// 			person1: false,
		// 			keywordstudents: e.target.value
		// 		});
		// 	}
		// } catch (e) {
		// 	this.setState({
		// 		person2: true,
		// 		person1: false,
		// 		keywordstudents: e.target.value
		// 	});
		// }

		// try {
		// 	const {team_idstudents, student_ids} = this.state;
		// 	this.Getstudentsdata(e.target.value, team_idstudents, student_ids);
		// } catch (e) {
		//
		// }
	}

	//点击获取老师数据
	getdatacpersondiv1Items = (object) => {
		try {
			if (this.props.teamutiple_limited === true) {
				if (object.enrollable === false) {
					myabool = false;
					return
				}
			}

		} catch (e) {
			myabool = true;
		}
		myabool = true;
		var datas = {
			enrollable: object.enrollable,
			id: object.id,
			name: object.name,
			school_name: object.school_name,
			student_id: null,
			identity: object.identity,
			type: "导师",
		};
		var fordabool = false;
		var forda = this.state.mydatas;
		// ////console.log("点击获取老师数据");
		// ////console.log(object);
		// ////console.log(forda);
		for (var i = 0; i < forda.length; i++) {
			if (forda[i].id) {
				if (forda[i].id === object.id) {
					fordabool = true;
					break
				}
			}
		}
		if (fordabool) {
			this.setState({
				person1: false,
				keywordteachers: object.name,
				booltech: true,
			})
		} else {
			forda.push(datas);
			this.setState({
				person1: false,
				keywordteachers: object.name,
				mydatas: forda,
				booltech: false,
			})
		}

	}
	//点击获取学生数据2
	getdatacpersondiv1Items2 = (object) => {
		//
		try {
			if (this.props.GetenrollmentAPI.member_staff.mutiple_limited === true) {
				if (object.enrollable === false) {
					myabool2 = false;
					return
				}
			}

		} catch (e) {
			myabool2 = true;
		}

		myabool2 = true;
		var datas = {
			enrollable: object.enrollable,
			id: object.id,
			name: object.name,
			school_name: object.school_name,
			student_id: object.student_id,
			identity: "学生",
			type: "队员",
		};
		var fordabool = false;
		var forda = this.state.mydatas;
		// ////console.log("点击获取学生数据2");
		// ////console.log(object);
		// ////console.log(forda);
		for (var i = 0; i < forda.length; i++) {
			if (forda[i].id) {
				//  // ////console.log(true);
				//  // ////console.log(forda[i].id);
				//  // ////console.log(object.id);
				if (forda[i].id === object.id) {
					fordabool = true;
					break
				}
			}
		}
		if (fordabool) {
			this.setState({
				person2: false,
				keywordstudents: object.name,
				boolstud: true
			})
		} else {
			forda.push(datas);
			this.setState({
				person2: false,
				keywordstudents: object.name,
				mydatas: forda,
				boolstud: false
			})
		}



	}
	//输入框事件
	changeTopicName = (e) => {
		//  // ////console.log("调用了changeTopicName");
		let num = parseInt(e.target.value.length);
		if (num > 60) {
			return;
		}
		this.setState({
			addonAfter: num < 0 ? 0 : num
		});
		this.setState({
			polls_nametest: e.target.value
		})
	};

	//onSearchsou
	onSearch = (value) => {
		// ////console.log("搜索的数据" + value);
	};
	handleInfiniteOnLoad = () => {
		// this.setState({
		// 	loading: true,
		// })
		// const test3 = this.state.test;
		// this.state.test2.forEach(function (item) {
		// 	test3.push(item)
		// });
		// setTimeout(() => {
		// 	this.setState({
		// 		test: test3,
		// 		hasMore: true,
		// 		loading: false,
		// 	});
		// }, 1000)

	}
	handleInfiniteOnLoad1 = () => {
		//  // ////console.log("调用了方法1111");
		// this.setState({
		// 	loading1: true,
		// })
		// setTimeout(() => {
		// 	 // ////console.log("调用了方法11112");
		// 	this.setState({
		// 		loading1: false,
		// 		hasMore: true,
		// 	});
		// }, 1000)

	}
	handleInfiniteOnLoad2 = () => {
		//  // ////console.log("调用了方法1111");
		// this.setState({
		// 	loading2: true,
		//
		// })
		// setTimeout(() => {
		// 	 // ////console.log("调用了方法11113");
		// 	this.setState({
		// 		hasMore: true,
		// 		loading2: false,
		// 	});
		// }, 1000)

	}
	inputOnBlur = (e) => {
		console.log("inputOnBlur");
		console.log(e);
		if (myabool === true) {
			this.setState({
				person1: false,
				person2: false
			})
		}

	}
	inputOnBlur2 = (e) => {
		// ////console.log("inputOnBlur");
		// ////console.log(e);
		if (myabool2 === true) {
			this.setState({
				person1: false,
				person2: false
			})
		}

	}

	startSearch = (e) => {
		// ////console.log("startSearch");
		// ////console.log(e);
		this.setState({
			person1: true,
			person2: false,
		})
		const {keywordteachers, team_idteachers, teacher_ids} = this.state;
		this.Getteacherdata(keywordteachers, team_idteachers, teacher_ids);
	}

	startSearch2 = (e) => {
		// ////console.log("startSearch2");
		// ////console.log(e);
		this.setState({
			person1: false,
			person2: true,
		})
		const {keywordstudents, team_idstudents, student_ids} = this.state;
		this.Getstudentsdata(keywordstudents, team_idstudents, student_ids);
	}

	inputOnFocus = (e) => {
		// ////console.log("inputOnFocus");
		// ////console.log(e);
		try {
			if (this.state.keywordteachers && this.state.keywordteachers.length > 0) {
				this.setState({
					person1: true,
					person2: false,
				})
			} else {
				this.setState({
					person1: false,
					person2: false,
				})
			}

		} catch (e) {
			this.setState({
				person1: true,
				person2: false,
			})
		}

	}

	inputOnFocus2 = (e) => {
		// ////console.log("inputOnFocus2");
		// ////console.log(e);
		try {
			if (this.state.keywordstudents && this.state.keywordstudents.length > 0) {
				this.setState({
					person2: true,
					person1: false,
				})
			} else {
				this.setState({
					person2: false,
					person1: false,
				})
			}

		} catch (e) {
			this.setState({
				person2: true,
				person1: false,
			})
		}


	}

	inputOnFocus3 = (e) => {
		// ////console.log("inputOnFocus3");
		// ////console.log(e);
		this.setState({
			person2: false,
			person1: false,
		})
	}
	deletedata = (item) => {
		var {mydatas, GetenrollmentAPI} = this.state;
		if (item) {
			var pos = mydatas.indexOf(item);
			//  ////console.log("deletedata");
			//  ////console.log(pos);
			var removedItem = mydatas.splice(pos, 1);
			//  ////console.log("deletedata22222");
			//  ////console.log(removedItem)
			//removedItem 是被删除的元素
			//  ////console.log(mydatas)
			this.setState({
				mydatas: mydatas,
			})
		}
		var myteaherdata = [];
		var myshtudentdata = [];
		var i = 0;
		var s = 0;
		try {
			for (var a = 0; a < mydatas.length; a++) {
				if (mydatas[a].type === "导师") {
					i = i + 1;
					// var objectt = {
					// 	enrollable: mydatas[a].enrollable,
					// 	id: mydatas[a].id,
					// 	identity: mydatas[a].identity,
					// 	name: mydatas[a].name,
					// 	school_name: mydatas[a].school_name,
					// }
					myteaherdata.push(mydatas[a].id);
				} else if (mydatas[a].type === "队员") {
					s = s + 1;
					// var objectts = {
					// 	enrollable: mydatas[a].enrollable,
					// 	id: mydatas[a].id,
					// 	name: mydatas[a].name,
					// 	school_name: mydatas[a].school_name,
					// 	student_id: mydatas[a].student_id,
					// }
					myshtudentdata.push(mydatas[a].id);
				}
			}
		} catch (e) {

		}
		// console.log("deletedata");
		// console.log(i);
		//删除老师的时候判断是否符合人数
		try {
			if (GetenrollmentAPI) {
				if (GetenrollmentAPI.teacher_staff) {
					if (GetenrollmentAPI.teacher_staff.minimum > i) {
						this.setState({
							Thecurrentnumberbool: true,
							Thecurrentnumber: i,
							booltech: false,
							boolstud: false
						})
						return
					} else if (GetenrollmentAPI.teacher_staff.maximum < i) {
						this.setState({
							Thecurrentnumberbool: true,
							Thecurrentnumber: i,
							booltech: false,
							boolstud: false
						})
						return
					}
					this.setState({
						Thecurrentnumberbool: false,
						Thecurrentnumber: i,
					})

				}
			}
		} catch (e) {

		}


		// debugger
		//删除学生的时候判断是否符合人数
		try {
			if (GetenrollmentAPI) {
				if (GetenrollmentAPI.member_staff) {
					if (GetenrollmentAPI.member_staff.minimum > s) {
						this.setState({
							Thecurrentnumberboolstu: true,
							Thecurrentnumberstu: s,
							booltech: false,
							boolstud: false
						})
						return
					} else if (GetenrollmentAPI.member_staff.maximum < s) {
						this.setState({
							Thecurrentnumberboolstu: true,
							Thecurrentnumberstu: s,
							booltech: false,
							boolstud: false
						})
						return
					}
					this.setState({
						Thecurrentnumberboolstu: false,
						Thecurrentnumberstu: s,
					})

				}
			}
		} catch (e) {

		}

	}

	render() {
		// console.log('Registration.js');
		// console.log(this.props.mutiple_limited);


		const {
			addonAfter, Numberofteammentors, Thecurrentnumber, person1, person2,
			keywordteachers, team_idteachers, teacher_ids,
			keywordstudents, team_idstudents, student_ids,
			member_ids, mydatas, booltech, boolstud, GetenrollmentAPI, Thecurrentnumberbool,
			Thecurrentnumberboolstu, Thecurrentnumberstu
		} = this.state;
		const {
			teacher_staff,
			member_staff
		} = this.props;
		//Modal
		//keyboard是否支持键盘 esc 关闭
		//closable    是否显示右上角的关闭按钮
		//底部内容，当不需要默认底部按钮时，可以设为 footer={null}
		//destroyOnClose 关闭时销毁 Modal 里的子元素
		//centered 垂直居中展示 Modal
		//visible 弹出框是否显示
		const listItems = mydatas.map((item, index) =>
			<div className="reglistviewdivss2 " style={{
				width: "100%",
				display: "flex",
				justifyContent: " space-around",
				alignItems: "center",
				height: "40px",
			}}>
				<style>
					{
						`
			 a:hover
			{
         color: #05101A;
			}
			`
					}
				</style>
				<a title={item.name} className="    reglistviewdivss4p maxnamewidth90"
					 style={{
						 textAlign: "center",
					 }}
				>{item.name === undefined || item.name === null || item.name === "" ? "--" : item.name}</a>
				{
					index === 0 ?
						<p className="    reglistviewdivss4p"
							 style={{
								 textAlign: "center",
							 }}
						>创建者</p>
						:
						<a title={item.type} className="    reglistviewdivss4p maxnamewidth90"
							 style={{
								 textAlign: "center",
							 }}
						>{item.type === undefined || item.type === null || item.type === "" ? "--" : item.type}</a>
				}

				<a title={item.school_name} className="    reglistviewdivss5p maxnamewidth110"
					 style={{
						 textAlign: "center",
					 }}
				>{item.school_name === undefined || item.school_name === null || item.school_name === "" ? "--" : item.school_name}</a>
				<a title={item.identity} className="    reglistviewdivss2p maxnamewidth90"
					 style={{
						 textAlign: "center",
					 }}
				>{item.identity === undefined || item.identity === null || item.identity === "" ? "--" : item.identity}</a>
				{
					index === 0 ?
						<p className="    reglistviewdivss333p"
							 style={{
								 textAlign: "center",
							 }}
						></p>
						:
						<p className="    reglistviewdivss333p"
							 style={{
								 textAlign: "center",
							 }}
						><i className="iconfont icon-guanbi font-12" onClick={() => this.deletedata(item)}/></p>
				}
			</div>
		);
		var cpersondiv1Items = [];
		// console.log("this.props.teamutiple_limited ");
		// console.log(this.props.teamutiple_limited );
		if (teacher_ids) {
			cpersondiv1Items = teacher_ids.map((item, index) =>
				<div className={"yslanswerList"}>
					<li
					className={this.props.teamutiple_limited === undefined || this.props.teamutiple_limited === null ? "reglistviewdivss2 " : (this.props.teamutiple_limited === true && item.enrollable === false ? "reglistviewdivss2c" : "reglistviewdivss2 ")}
					key={index} style={{
					width: "100%",
					display: "flex",
					justifyContent: " space-around",
					alignItems: "center",
					height: "40px",
				}}
					onMouseDown={() => this.getdatacpersondiv1Items(item)}

				>
					<style>
						{
							`
			 a:hover
			{
         color: #05101A;
			}
			`
						}
					</style>
					{item.name === undefined || item.name === null || item.name === "" ?
						<a className="    cpersondiv1Items"
							 style={{
								 textAlign: "center",
								 width: "90px"
							 }}
						>--</a>
						:
						<a title={item.name} className="    cpersondiv1Items maxnamewidth90"
							 style={{
								 textAlign: "center",
								 width: "90px"
							 }}
						>{item.name}</a>
					}
					{item.identity === undefined || item.identity === null || item.identity === "" ?
						<p className="    cpersondiv1Items maxnamewidth85"
							 style={{
								 textAlign: "center",
								 width: "85px"
							 }}
						>--</p>
						:
						<a title={item.identity} className="    cpersondiv1Items maxnamewidth85"
							 style={{
								 textAlign: "center",
								 width: "85px"
							 }}
						>{item.identity}</a>}
					{item.school_name === undefined || item.school_name === null || item.school_name === "" ?

						<p className="    cpersondiv1Items"
							 style={{
								 textAlign: "center",
								 width: "110px"
							 }}
						>--</p>
						:
						<a title={item.school_name} className="    cpersondiv1Items maxnamewidth110"
							 style={{
								 textAlign: "center",
								 width: "110px"
							 }}
						>{item.school_name}</a>
					}

					{
						this.props.teamutiple_limited === undefined || this.props.teamutiple_limited === null ?
							<p className="    cpersondiv1Items"
								 style={{
									 textAlign: "center",
									 width: "87px"
								 }}
							>{""}</p>
							:
							(
								this.props.teamutiple_limited === true ?
									<p className="    cpersondiv1Items"
										 style={{
											 textAlign: "center",
											 color: "#FF6800",
											 width: "87px"
										 }}
									>{item.enrollable === false ? "已加入其他战队" : ""}</p>
									:
									<p className="    cpersondiv1Items"
										 style={{
											 textAlign: "center",
											 width: "87px"
										 }}
									>{""}</p>
							)

					}


					</li>
				</div>
			);
		}

		const cpersondiv1 = (
			<div className={"   backgroundspersondiv cpersondiv1 borders2"}>
				<Spin spinning={false}>
					<div
						className={cpersondiv1Items.length === 0 ? "demo-infinite-container33 yslanswerList" : "demo-infinite-container2 yslanswerList"}>
						{
							cpersondiv1Items.length === 0 ?
								<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
								:
								<InfiniteScroll
									initialLoad={false}
									pageStart={0}
									loadMore={() => this.handleInfiniteOnLoad1()}
									// hasMore={!this.state.loading1 && this.state.hasMore}
									hasMore={false}
									useWindow={false}
								>
									{
										cpersondiv1Items
									}

								</InfiniteScroll>
						}

							</div>
						</Spin>
			</div>
		)
		var persondiv2Items = [];
		if (member_ids) {
			persondiv2Items = member_ids.map((item, index) =>
				<div className={"yslanswerList"}>


					<li
					className={this.props.mutiple_limited === undefined || this.props.mutiple_limited === null ? "reglistviewdivss2 " : (this.props.mutiple_limited === true && item.enrollable === false ? "reglistviewdivss2c" : "reglistviewdivss2 ")}
					key={index} style={{
				width: "100%",
				display: "flex",
				justifyContent: " space-around",
				alignItems: "center",
				height: "40px",
			}}
					onMouseDown={() => this.getdatacpersondiv1Items2(item)}
			>
					<style>
						{
							`
						 a:hover
						{
            color: #05101A;
						}
						`
						}
					</style>
					{item.name === undefined || item.name === null || item.name === "" ?
						<a className="    cpersondiv1Items"
							 style={{
								 textAlign: "center",
								 width: "90px"
							 }}
						>--</a>
						:
						<a title={item.name} className="    cpersondiv1Items maxnamewidth90"
							 style={{
								 textAlign: "center",
								 width: "90px"
							 }}
						>{item.name}</a>
					}
					{item.student_id === undefined || item.student_id === null || item.student_id === "" ?
						<p className="    cpersondiv1Items maxnamewidth85"
							 style={{
								 textAlign: "center",
								 width: "85px"
							 }}
						>--</p>
						:
						<a title={"学号:" + item.student_id} className="    cpersondiv1Items maxnamewidth85"
							 style={{
								 textAlign: "center",
								 width: "85px"
							 }}
						>{"学号:" + item.student_id}</a>}
					{item.school_name === undefined || item.school_name === null || item.school_name === "" ?

						<p className="    cpersondiv1Items"
							 style={{
								 textAlign: "center",
								 width: "110px"
							 }}
						>--</p>
						:
						<a title={item.school_name} className="    cpersondiv1Items maxnamewidth110"
							 style={{
								 textAlign: "center",
								 width: "110px"
							 }}
						>{item.school_name}</a>
					}

					{
						this.props.mutiple_limited === undefined || this.props.mutiple_limited === null ?
							<p className="    cpersondiv1Items"
								 style={{
									 textAlign: "center",
									 width: "87px"
								 }}
							>{""}</p>
							:
							(
								this.props.mutiple_limited === true ?
									<p className="    cpersondiv1Items"
										 style={{
											 textAlign: "center",
											 color: "#FF6800",
											 width: "87px"
										 }}
									>{item.enrollable === false ? "已加入其他战队" : ""}</p>
									:
									<p className="    cpersondiv1Items"
										 style={{
											 textAlign: "center",
											 width: "87px"
										 }}
									>{""}</p>
							)

					}


					</li>
				</div>
		);
		}
		const persondiv2 = (
			<div className={"   backgroundspersondiv cpersondiv1 borders2"}>
				{/*this.state.loading2*/}
				<Spin spinning={false}>
					<div className={persondiv2Items.length === 0 ? "demo-infinite-container33 " : "demo-infinite-container2 "}>
						{
							persondiv2Items.length === 0 ?
								<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
								:
								<InfiniteScroll
									initialLoad={false}
									pageStart={0}
									loadMore={() => this.handleInfiniteOnLoad2()}
									// hasMore={!this.state.loading2 && this.state.hasMore}
									hasMore={false}
									useWindow={false}
								>
									{
										persondiv2Items
									}

								</InfiniteScroll>
						}
							</div>
						</Spin>
			</div>
		);
		//console.log("PersonModal");
		//console.log(this.props);
		return (

			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title={this.props.Newtit === true ? "创建战队" : "编辑战队"}
				centered={true}
				visible={this.props.modalsType === undefined ? false : this.props.modalsType}
				width="620px"
			>

				{/*<style>*/}
				{/*	{*/}
				{/*		`*/}
				{/*		 a:hover*/}
				{/*		{*/}
				{/*		background-color:#F6F4F4;*/}
				{/*		}*/}
				{/*		`*/}
				{/*	}*/}
				{/*</style>*/}
				<div className="permaindiv">
					{/*队名*/}
					<style>{
						`
																		.yslzxueshiskmc .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																	  width: 428px !important;

																		}
																		
																		.yslzxueshiskmc .ant-input-wrapper {
																	    max-width: 487px;
																		}
																		 .yslzxueshisy span .ant-input-group-addon{
																		  width: 65px !important;
																		  background-color: #fafafa!important;
																		 }
																		  .yslzxueshisy .ant-input-wrapper span{
															         width: 58px !important;
																		 }
																		 
																		 
																		.yslzxueshiskmc .ant-input-group-addon{
																		  width: 65px !important;
																		  background-color: #fafafa!important;
																		 }
																		 .yslzxueshiskmc .ant-input-group-wrapper{
																		   width: 408px !important;
																		 }
																		 .yslzxueshiskmcs .ant-input-group-wrapper{
																		   width: 408px !important;
																		 }
																		
																		`
					}</style>
					<div style={{
						display: "flex",
						flexDirection: "initial",

					}}>
						<p style={{
							width: "59px",
							marginTop: "9px",
							fontSize: "16px",
						}}>
								<span style={{
									color: "#f5222d",
									fontSize: "16px",
								}}>*</span>
							队名:
						</p>

						<Input className="yslzxueshiskmc" onInput={this.changeTopicName} onFocus={this.inputOnFocus3}
									 value={this.state.polls_nametest}
									 placeholder="请输入您的战队名称，最多不超过60个字符"
									 addonAfter={String(addonAfter) + "/60"} maxLength={60}/>

					</div>


					{/*导师*/}
					{
						teacher_staff === undefined || teacher_staff === null ?
							<div style={{marginLeft: "53px", minHeight: "14px", height: "14px"}}></div> :

							<div>
								<div style={{
									display: "flex",
									flexDirection: "initial",
									marginTop: "14px",
								}}>
									<p style={{
										width: "59px",
										marginTop: "9px",
										fontSize: "16px",
									}}>
								<span style={{
									color: "#f5222d",
									fontSize: "16px",
								}}>*</span>
										导师:
									</p>
									<style>
										{
											`
								.yslzxueshiskmcd .ant-input{
																		height: 40px !important;
																		width: 487px !important;
																		}
								`
										}
									</style>
									{/*<div className={"yslzxueshiskmcd2"}>*/}

									<Dropdown overlay={cpersondiv1} getPopupContainer={trigger => trigger.parentNode}
														visible={this.state.person1}>
										<Input
											className="yslzxueshiskmcd"
											placeholder="请输入老师姓名的任意关键字进行搜索，可以后续在添加"
											onPressEnter={this.startSearch}
											onFocus={this.inputOnFocus}
											onBlur={this.inputOnBlur}
											onChange={(e) => this.teacheronChange(e)}
											value={this.state.keywordteachers}
											suffix={
												<i class="iconfont icon-sousuo"
													 onClick={() => this.Getteacherdata(keywordteachers, team_idteachers, teacher_ids)}/>
											}
										/>
									</Dropdown>
									{/*</div>*/}
								</div>
								{
									booltech === true ?
										<p style={{marginLeft: "53px", color: "#FF954C", minHeight: "14px"}}>该老师已添加</p>
										:
										<div style={{marginLeft: "53px", minHeight: "14px", height: "14px"}}></div>
								}
							</div>


					}


					{/*队员*/}
					{
						member_staff === undefined || member_staff === null ?
							<div style={{marginLeft: "53px", minHeight: "18px", height: "18px"}}></div> :
							<div>
								<div style={{
									display: "flex",
									flexDirection: "initial",

								}}>
									<p style={{
										width: "59px",
										marginTop: "9px",
										fontSize: "16px",
									}}>
								<span style={{
									color: "#f5222d",
									fontSize: "16px",
								}}>*</span>
										队员:
									</p>
									<style>
										{
											`
								.yslzxueshiskmcd .ant-input{
																		height: 40px !important;
																		width: 487px !important;
																		}
								`
										}
									</style>

									<Dropdown overlay={persondiv2} getPopupContainer={trigger => trigger.parentNode}
														visible={this.state.person2}>
										<Input
											className="yslzxueshiskmcd"
											placeholder="请输入想要队员姓名的任意关键字进行搜索"
											onPressEnter={this.startSearch2}
											onFocus={this.inputOnFocus2}
											onBlur={this.inputOnBlur2}
											onChange={(e) => this.studentsonChange(e)}
											value={this.state.keywordstudents}
											suffix={
												<i class="iconfont icon-sousuo "
													 onClick={() => this.Getstudentsdata(keywordstudents, team_idstudents, student_ids)}/>
											}
										/>
									</Dropdown>

								</div>

								{
									boolstud === true ?
										<p style={{marginLeft: "53px", color: "#FF954C", minHeight: "18px"}}>该队员已添加</p>
										:
										<div style={{marginLeft: "53px", minHeight: "18px", height: "18px"}}></div>
								}
							</div>
					}

					{/*表格*/}
					<div style={{marginLeft: "53px", border: "1px solid #E0E0E0"}}>
						{/*<PersonModaltion ></PersonModaltion>*/}
						<div>
							<div className="reglistviewdivss2 " style={{
								width: "100%",
								display: "flex",
								justifyContent: " space-around",
								alignItems: "center",
								height: "40px",
								backgroundPosition: "center",
								backgroundSize: "110% 100%",
								backgroundColor: "#E0E0E0",

							}}>
								<p className="    reglistviewdivss4p"
									 style={{
										 textAlign: "center",
									 }}
								>姓名</p>
								<p className="    reglistviewdivss4p"
									 style={{
										 textAlign: "center",
									 }}
								>角色</p>
								<p className="    reglistviewdivss5p"
									 style={{
										 textAlign: "center",
									 }}
								>单位</p>
								<p className="    reglistviewdivss2p"
									 style={{
										 textAlign: "center",
									 }}
								>其他</p>
								<p className="    reglistviewdivss3p"
									 style={{
										 textAlign: "center",
									 }}
								>操作</p>
							</div>
						</div>
						<Spin spinning={false}>
							<div className="demo-infinite-container">
								<InfiniteScroll

									initialLoad={false}
									pageStart={0}
									loadMore={() => this.handleInfiniteOnLoad()}
									// hasMore={!this.state.loading && this.state.hasMore}
									hasMore={false}
									useWindow={false}
								>
									{listItems}

								</InfiniteScroll>
							</div>
						</Spin>
					</div>

					{/*最后一行文字*/}
					{
						GetenrollmentAPI && GetenrollmentAPI.teacher_staff ?
							(
								Thecurrentnumberbool === true ?
									<p style={{
										marginLeft: "53px",
										color: "#D0021B",
										fontSize: "12px",
										marginTop: "9px"
									}}>导师需为{GetenrollmentAPI.teacher_staff.minimum}-{GetenrollmentAPI.teacher_staff.maximum}人,现为{Thecurrentnumber}人</p>

									: ""
							) :
							""
					}
					{
						GetenrollmentAPI && GetenrollmentAPI.member_staff ?
							(
								Thecurrentnumberboolstu === true ?
									<p style={{
										marginLeft: "53px",
										color: "#D0021B",
										fontSize: "12px",
										marginTop: "9px"
									}}>战队成员需为{GetenrollmentAPI.member_staff.minimum}-{GetenrollmentAPI.member_staff.maximum}人,现为{Thecurrentnumberstu}人</p>

									: ""
							) :
							""
					}

					<div style={{
						marginTop: "24px",
						marginLeft: "53px",
						display: "flex",
						alignItems: "center",
						paddingBottom: "20px"
					}}>
						<div style={{
							display: "flex",
							justifyContent: "center",
							width: "100%"
						}}>
							<div className="personbut1">
								<p onClick={() => this.props.Tmoconfirm1(false)}> 取消</p>
							</div>
							<div className="personbut2">
								<p onClick={() => this.Createateam()}>确定</p>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default PersonModal;
