import React, {Component} from "react";
import CoursesListType from '../coursesPublic/CoursesListType';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import {getRandomNumber, getRandomcode, handleDateString, getImageUrl} from 'educoder';
import PollDetailTabForthRules from '../poll/PollDetailTabForthRules';
import ShixunWorkModal from './Shixunworkdetails/ShixunWorkModal';
import {
	Button,
	Checkbox,
	message,
	InputNumber,
	DatePicker,
	Radio,
	Tooltip,
	notification,
} from "antd";
import {Link} from 'react-router-dom';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Modals from "../../modals/Modals";
import DownloadMessageysl from "../../modals/DownloadMessageysl";
import OneSelfOrderModal from "../coursesPublic/OneSelfOrderModal";
import '../css/members.css';
import "../common/formCommon.css";
import '../css/Courses.css';
import './style.css';
import '../css/busyWork.css'
import '../poll/pollStyle.css'

import Startshixuntask from "../coursesPublic/Startshixuntask";

const RadioGroup = Radio.Group;

//GraduationTaskssetting.js
//课堂作业设置

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function disabledDateTime() {
	return {
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
		// disabledSeconds: () => range(0,60)
	}
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}


class Trainingjobsetting extends Component {
	//unifiedsetting 统一设置
	//allowreplenishment 允许补交
	//completionefficiencyscore 完成效率评分占比
	//level级别
	//proportion 比例
	//releasetime 发布时间
	//deadline 截至时间
	constructor(props) {
		super(props);
		// this.props.form.setFieldsValue({
		//     radiogroup:1,
		//
		// });
		this.state = {
			flagPageEdit: true,
			flagPageEdits: false,
			flagPageEditstwo: false,
			flagPageEditsthrees: false,
			flagPageEditsfor: false,
			props: props,
			flagPageEditsbox: false,
			handclass: undefined,
			rulest: undefined,
			rules: undefined,
			starttimetype: false,
			endtimetype: false,
			latetimetype: false,
			allowlate: 1,
			unit_p_tip: "",
			unit_e_tip: "",
			latepenaltytype: false,
			unifiedsetting: true,
			allowreplenishment: undefined,
			completionefficiencyscore: false,
			whethertopay: false,
			proportion: undefined,
			level: undefined,
			ealuation: false,
			latededuction: undefined,
			latedeductiontwo: "0",
			database: false,
			datasheet: false,
			databasetwo: undefined,
			datasheettwo: undefined,
			publicwork: undefined,
			publish_time: undefined,
			publish_timebool: false,
			end_time: undefined,
			late_time: undefined,
			endOpen: false,
			borreds: undefined,
			borredss: undefined,
			releasetime: undefined,
			deadline: undefined,
			late_times: undefined,
			mystyle: {"display": "block"},
			mystyles: {"display": "none"},
			challenge_settings: undefined,
			boolUnite: true,
			boolUnitetwo: true,
			boolUnitetwoname: undefined,
			score_open: false,
			group_settings: undefined,
			rulesdata: [],
			showmodel: false,
			code_review: false,
			testscripttiptype: false,
			starttimesend: undefined,
			end_timebool: false,
			late_timesbool: false,
			work_efficiencys: false,
			task_pass: false, //是否允许跳关
			CalculateMax: 100,//总分值
			borredszf:"ml10  color-grey-9",
			borredszfl:true,
			borredszfls:'',
			total_scoretwo:0,
			total_score:0,
		}
		// console.log("获取到的值")
		// console.log("Trainingjobsetting")
		// // console.log("设置页面调用的老师学生权限")
		// console.log(JSON.stringify(props))
		// console.log(this.props.isAdmin()) //判断是否是老师
		// console.log(this.props.isStudent()) //判断是否是学生
		// console.log(this.props.isNotMember()) //判断是否有登入权限
	}

	componentDidMount() {
		//console.log("Trainingjobsetting");
		//console.log("componentDidMount");
		this.getTrainingjobsetting(true);
		let query = this.props.location.pathname;
		const type = query.split('/');
		this.setState({
			shixuntypes: type[3]
		})
		this.props.triggerRef(this);


		if (this.props.isAdmin() === false) {
			this.cancelEdit()
		}
	}

	// componentWillReceiveProps(nextProps) {
	//     // console.log("+++++++++916");
	//     // console.log(nextProps);
	//     // console.log(this.props)
	//     // console.log(this.props.isAdmin());
	//     if (nextProps.code_review != this.props.code_review) {
	//         if (nextProps.code_review !== undefined) {
	//             console.log("diaoyonglwangluo4");
	//             this.getTrainingjobsetting()
	//
	//         }
	//     }
	//
	// }

	// 获取数据地方
	getTrainingjobsetting = (bool) => {
		// console.log("getTrainingjobsetting")
		var homeworkid = this.props.match.params.homeworkid;
		// console.log(homeworkid)
		let url = `/homework_commons/${homeworkid}/settings.json`;
		axios.get(url).then((result) => {
			// console.log(url);
			// console.log(result);
			if (result != undefined) {

				// console.log(result.data.code_review)
				// console.log("设置页")
				// console.log(JSON.stringify(result))
				let array = [];
				let arrays = [];
				var rulesdatas = [];
				if (result.data.group_settings !== undefined) {
					if (result.data.group_settings.length === 0) {
						array.push({
							course_group_id: [],
							course_group_name: [],
							publish_time: undefined,
							end_time: undefined,
							publish_flag: "",
							end_flag: "",
							class_flag: "",
							course_search: "",
							open: false
						})
					} else {
						for (var i = 0; i < result.data.group_settings.length; i++) {
							if (result.data.group_settings[i].publish_time === null && result.data.group_settings[i].end_time === null) {

							} else {
								array.push({
									course_group_id: result.data.group_settings[i].group_id,
									course_group_name: result.data.group_settings[i].group_name,
									publish_time: moment(result.data.group_settings[i].publish_time).format('YYYY-MM-DD HH:mm'),
									end_time: moment(result.data.group_settings[i].end_time).format('YYYY-MM-DD HH:mm'),
									publish_flag: "",
									end_flag: "",
									class_flag: "",
									course_search: "",
									open: false
								})
							}
						}
					}
				}

				if (result.data.group_settings !== undefined) {
					for (var i = 0; i < result.data.group_settings.length; i++) {

						arrays.push({
							course_group_id: result.data.group_settings[i].group_id,
							course_group_name: result.data.group_settings[i].group_name,
							publish_time: moment(result.data.group_settings[i].publish_time).format('YYYY-MM-DD HH:mm'),
							end_time: moment(result.data.group_settings[i].end_time).format('YYYY-MM-DD HH:mm'),
							course_choosed: 0,
						})

						if (result.data.group_settings[i].group_id instanceof Array) {
							rulesdatas.push({
								group_id: result.data.group_settings[i].group_id,
								publish_time: moment(result.data.group_settings[i].publish_time).format('YYYY-MM-DD HH:mm'),
								end_time: moment(result.data.group_settings[i].end_time).format('YYYY-MM-DD HH:mm'),
							})
						} else {
							rulesdatas.push({
								group_id: [result.data.group_settings[i].group_id],
								publish_time: moment(result.data.group_settings[i].publish_time).format('YYYY-MM-DD HH:mm'),
								end_time: moment(result.data.group_settings[i].end_time).format('YYYY-MM-DD HH:mm'),
							})
						}
					}
				}
				// console.log("220");
				var publish_timebools = false;
				if (result.data.publish_time) {
					publish_timebools = moment(result.data.publish_time, "YYYY-MM-DD HH:mm") <= moment();
				}
				// console.log("228");
				// console.log(publish_timebools);

				var end_timebools = false;
				if (result.data.end_time) {
					end_timebools == moment(result.data.end_time, "YYYY-MM-DD HH:mm") <= moment();
				}
				// console.log("233");
				// console.log(end_timebools);
				var late_timess = false;
				if (result.data.late_time) {
					late_timess == moment(result.data.end_time, "YYYY-MM-DD HH:mm") <= moment();
				}
				// console.log("240");
				// console.log(late_timess);


				this.setState({
					publish_timebool: publish_timebools,
					end_timebool: end_timebools,
					late_timesbool: late_timess,
					task_pass: result.data.task_pass,
					rules: array,
					rulest: arrays,
					rulesdata: rulesdatas,
					jobsettingsdata: result,
					shixun_exp: result.data.shixun_exp,
					group_settings: result.data.group_settings,
					score_open: result.data.score_open,
					unifiedsetting: result.data.unified_setting,
					boolUnite: result.data.unified_setting === true ? false : result.data.unified_setting === false ? true : true,
					publish_time: result.data.publish_time === undefined ? undefined : result.data.publish_time === null ? undefined : result.data.publish_time,
					releasetime: result.data.publish_time === undefined ? undefined : result.data.publish_time === null ? undefined : result.data.publish_time,
					end_time: result.data.end_time === undefined ? undefined : result.data.end_time === null ? undefined : result.data.end_time,
					deadline: result.data.end_time === undefined ? undefined : result.data.end_time === null ? undefined : result.data.end_time,
					late_time: result.data.late_time === undefined ? undefined : result.data.late_time === null ? undefined : result.data.late_time,
					late_times: result.data.late_time === undefined ? undefined : result.data.late_time === null ? undefined : result.data.late_time,
					allowreplenishment: result.data.allow_late,
					latededuction: result.data.late_penalty,
					level: result.data.answer_open_evaluation === true ? "满分" : "扣分",
					work_efficiencys: result.data.work_efficiency,
					latedeductiontwo: result.data.eff_score,
					proportion: result.data.shixun_evaluation === 0 ? "均分比例" : result.data.shixun_evaluation === 1 ? "经验值比例" : result.data.shixun_evaluation === 2 ? "自定义分值" : "",
					publicwork: result.data.score_open,
					challenge_settings: result.data.challenge_settings,
					code_review: result.data.code_review,
					total_scoretwo:result.data.total_score,
					total_score:result.data.total_score,

				})
				this.props.Getdataback(result, result.data);

				if (bool === true) {
					if (this.props.isAdmin() !== undefined) {
						if (this.props.isAdmin() === true) {

							this.editSettings(result);
							this.Calculatethetotalscore(result.data.eff_score, result.data.challenge_settings);
						}
					}
				}
			}
		})

	}

	//跳转道描点的地方
	scrollToAnchor = (anchorName) => {
		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if (anchorElement) {
				anchorElement.scrollIntoView();
			}
		}
	}

	//计算总分值
	Calculatethetotalscore = (latedeductiontwos, challenge_settings) => {
		//latedeductiontwos 效率分
		//challenge_settings 总分

		var datas = challenge_settings;
		var challenge_scoredata = [];
		let datasinde=0;
		for (var i = 0; i < datas.length; i++) {
			if (datas[i].checked === true) {
				// var object = {
				//     challenge_id: datas[i].challenge_id,
				//     challenge_score: datas[i].challenge_score,
				// };
				challenge_scoredata.push(datas[i].challenge_score);
				// array.push(object)
			}else{
				datasinde=datasinde+1;
			}

		}

		// //console.log("datasinde Calculatethetotalscore");
		// //console.log(datasinde);
		// //console.log(datas.length);

		// if(array === "[]" || array.length === 0){
		//     this.props.showNotification(`没有关卡不能更新设置`);
		//     return;
		// }

		// var latedeductiontwos = 0;
		// //效率分是否勾选 勾选获取效分
		// if (this.state.completionefficiencyscore === true) {
		//     latedeductiontwos = this.state.latedeductiontwo;
		// }
		// if(challenge_scoredata.length>0){

		if(datasinde!==datas.length){
			let len = 0;
			//console.log(challenge_scoredata);
			for (var k = 0; k < challenge_scoredata.length; k++) {
				len = len + parseFloat(challenge_scoredata[k]);
			}
			let max = latedeductiontwos + len;
			let maxs = max.toFixed(1);

			// console.log(1)
			// console.log(maxs)

			this.setState({
				CalculateMax: maxs,
			})
		}

	}


	//提交数据
	pustdate = () => {
		var thiss = this;
		// //console.log("pustdate");
		var homeworkid = this.props.match.params.homeworkid
		var array = [];
		var datas = this.state.challenge_settings;
		var challenge_scoredata = [];
		for (var i = 0; i < datas.length; i++) {
			if (datas[i].checked === true) {
				var object = {
					challenge_id: datas[i].challenge_id,
					challenge_score: datas[i].challenge_score,
				};
				challenge_scoredata.push(datas[i].challenge_score);
				array.push(object)
				// //console.log("datas[i].challenge_score");
				// //console.log(i);
				// //console.log(datas[i].challenge_score);
			}

		}
		// console.log("提交的数据"+"pustdate");
		// console.log("提交的数据"+"pustdate");

		if (this.state.jobsettingsdata.data.unified_setting === true) {
			if (this.state.unifiedsetting === true) {
				//统一设置
				if (this.state.releasetime === undefined || this.state.releasetime === null || this.state.releasetime === "") {
					// this.props.showNotification(`请选择发布时间`);

					//立即发布
					// this.homeworkstart();
					this.scrollToAnchor("publishtimeid");
					this.setState({
						unit_p_tip: "请选择发布时间",
						p_flag: true,
						borreds: "bor-reds",
					})
					return;
				} else {
					if (this.state.publish_time === undefined || this.state.publish_time === null || this.state.publish_time === "") {

						if (moment(this.state.publish_time, 'YYYY-MM-DD HH:mm') <= moment()) {
							//发布时间小于 当前时间
							this.scrollToAnchor("publishtimeid");
							this.setState({
								unit_p_tip: "发布时间不能早于当前时间",
								p_flag: true,
								borreds: "bor-reds",
							})
							return;
						}

					}
				}

				if (this.state.deadline === undefined || this.state.deadline === null || this.state.deadline === "") {
					// this.props.showNotification(`请选择截止时间`);
					this.scrollToAnchor("publishtimeid");
					this.setState({
						unit_e_tip: "请选择截止时间",
						p_flag: true,
						borredss: "bor-reds",
					})
					return
				} else {

					if (!this.state.flagPageEditsthrees === false) {


						if (moment(this.state.end_time, "YYYY-MM-DD HH:mm") <= moment()) {
							//截止时间小于当前时间
							// this.scrollToAnchor("publishtimeid");
							// this.setState({
							// 	unit_e_tip: "截止时间不能早于当前时间",
							// 	p_flag: true,
							// 	borredss: "bor-reds",
							// })
							// return;
						}
						if (moment(this.state.end_time, "YYYY-MM-DD HH:mm") <= moment(this.state.publish_time, "YYYY-MM-DD HH:mm")) {
							//截止时间小于发布时间
							this.scrollToAnchor("publishtimeid");
							this.setState({
								unit_e_tip: "截止时间不能早于发布时间",
								p_flag: true,
								borredss: "bor-reds",
							})
							return
						}
					}
				}
				if (this.state.allowreplenishment === true) {


					if (this.state.late_times === undefined || this.state.late_times === null || this.state.late_times === "") {
						// this.props.showNotification(`请选择结束时间`);
						this.scrollToAnchor("end_timeid")
						this.setState({
							hand__e_tip: "请选择结束时间",
							hand_flags: true,
							handclass: "bor-reds",

						})
						return;
					} else {
						// 补交结束时间不能早于截止时间
						if (!this.state.flagPageEditsfor === false) {


							if (moment(this.state.late_time, "YYYY-MM-DD HH:mm") <= moment()) {
								//结束时间小于当前时间
								this.scrollToAnchor("end_timeid");
								this.setState({
									hand__e_tip: "结束时间不能早于当前时间",
									hand_flags: true,
									handclass: "bor-reds",

								})
								return;
							}

							if (moment(this.state.late_time, "YYYY-MM-DD HH:mm") <= moment(this.state.publish_time, "YYYY-MM-DD HH:mm")) {
								//结束时间小于发布时间
								this.scrollToAnchor("end_timeid");
								this.setState({
									hand__e_tip: "结束时间不能早于发布时间",
									hand_flags: true,
									handclass: "bor-reds",

								})
								return;
							}
							if (moment(this.state.late_time, "YYYY-MM-DD HH:mm") <= moment(this.state.end_time, "YYYY-MM-DD HH:mm")) {
								//结束时间小于发布时间
								this.scrollToAnchor("end_timeid");
								this.setState({
									hand__e_tip: "补交结束时间不能早于截止时间",
									hand_flags: true,
									handclass: "bor-reds",

								})
								return;
							}
						}
					}
				}

			} else {
				//分班设置
				// console.log("分班设置");
				// console.log(this.$pollDetailTabForthRules);

				const  result=this.$pollDetailTabForthRules.notUnifiedSettingCheck(this.state.rules);
				this.setState({
					rules: result.rules
				})

				if(result.validate==false){
						this.scrollToAnchor("publishtimeid");
					return false;
				}
				let rulesdata = this.state.rulesdata;
				if (rulesdata.length === 0) {
					this.props.showNotification(`分班发布设置不能为空`);
					return;
				}
			}
		}


		if (this.state.allowreplenishment === true) {
			if (this.state.latededuction === undefined) {
				this.props.showNotification(`请输入迟交扣分数`);

				return;

			}
			if (this.state.latededuction === null) {
				this.props.showNotification(`请输入迟交扣分数`);

				return;
			}
			if (this.state.latededuction === "") {
				this.props.showNotification(`请输入迟交扣分数`);

				return;
			}
			if (this.state.latededuction < 0) {
				this.props.showNotification(`迟交扣分数不能小于零`);

				return;
			}
			if (this.state.level === undefined || this.state.level === "") {
				this.props.showNotification(`请选择扣分项`);

				return;

			}

		}


		if (this.state.completionefficiencyscore === true) {
			if (this.state.latedeductiontwo === undefined) {
				this.props.showNotification(`请输入效率分数`);

				return;

			}
			if (this.state.latedeductiontwo === null) {
				this.props.showNotification(`请输入效率分数`);

				return;
			}
			if (this.state.latedeductiontwo === "") {
				this.props.showNotification(`请输入效率分数`);

				return;
			}
			if (this.state.latedeductiontwo <= 0) {
				this.props.showNotification(`效率分数不能小于等于零`);

				return;
			}
			// if(this.state.latedeductiontwo >100){
			//     message.error("效率分不能大于100",1);
			//     return;
			// }
			if (this.state.proportion === undefined) {
				this.props.showNotification(`请选择比列`);

				return;
			}
			if (this.state.proportion !== undefined) {

				if (this.state.proportion === "均分比例") {
					//关卡分值平分


				}

				if (this.state.proportion === "经验值比例") {
					this.setState({
						boolUnitetwo: false,
					})
				}

				if (this.state.proportion === "自定义分值") {
					this.setState({
						boolUnitetwo: false,
					})

				}


			}
		}
		if(this.state.borredszfl===false){
			this.setState({
				borredszf:this.state.borredszf,
				borredszfls:this.state.borredszfls,
				borredszfl:this.state.borredszfl,
			})
			this.scrollToAnchor("zongfentimeid");
			return;
		}
		var latedeductiontwos = 0;
		if (this.state.completionefficiencyscore === true) {
			latedeductiontwos = this.state.latedeductiontwo;
		}
		//从这里开始记得等于0的时候还要做判断
		if (challenge_scoredata.length > 0) {
			var len = 0;
			for (var k = 0; k < challenge_scoredata.length; k++) {
				len = len + parseFloat(challenge_scoredata[k]);
				// console.log(len);
				// console.log(challenge_scoredata[k]);
				// console.log(len);

			}
			let max = latedeductiontwos + len;
			// if (max > 100) {
			//     console.log("max>100");
			//     this.props.showNotification(`总分值+效率效率分之和要等于100，现在分值为` + max);
			//     return;
			// }
			// if(max<100){
			//     console.log("max<100");
			//     this.props.showNotification(`总分值+效率效率分之和要等于100，现在分值为` + max);
			//     return;
			// }

			if (this.state.proportion === "自定义分值") {
				try {
					if(parseFloat(this.state.CalculateMax)!==parseFloat(max)){
						this.props.showNotification(`分值之和必须等于总分值：${this.state.CalculateMax}分`);
						this.scrollToAnchor("zongfentimeid");
						return;
					}
				}catch (e) {

				}

			}


		}else{
			try {
				if(parseFloat(this.state.CalculateMax)!==parseFloat(0)){
					this.props.showNotification(`分值之和必须等于总分值：${this.state.CalculateMax}分`);
					this.scrollToAnchor("zongfentimeid");
					return;
				}
			}catch (e) {

			}
		}

		var url = `/homework_commons/${homeworkid}/update_settings.json`;
		var data = undefined;
		// console.log("this.state.unified_setting")
		// console.log(this.state.unifiedsetting)
		if (array === "[]" || array.length === 0) {
			this.props.showNotification(`没有关卡不能更新设置`);
			return;
		}


		if (this.state.unifiedsetting === true) {
			//console.log("统一设置");
			data = {
				unified_setting: this.state.unifiedsetting,   //统一配置
				publish_time: moment(this.state.publish_time).format('YYYY-MM-DD HH:mm'),   //发布时间
				end_time: moment(this.state.end_time).format('YYYY-MM-DD HH:mm'),    //截止时间
				allow_late: this.state.allowreplenishment,   //补交
				late_penalty: parseInt(this.state.latededuction), //迟交扣分
				late_time: moment(this.state.late_time).format('YYYY-MM-DD HH:mm'), //结束时间
				answer_open_evaluation: this.state.level === "满分" ? true : false, //扣分项
				work_efficiency: this.state.work_efficiencys, //完成效率评分占比
				eff_score: this.state.work_efficiencys === true ? this.state.latedeductiontwo : undefined,//效率分
				shixun_evaluation: this.state.proportion === "均分比例" ? 0 : this.state.proportion === "经验值比例" ? 1 : this.state.proportion === "自定义分值" ? 2 : 0,
				challenge_settings: array,
				score_open: this.state.publicwork,
				total_score:this.state.CalculateMax,
				total_scoretwo:this.state.CalculateMax,//记录总分值点击取消的时候还原总分值

			}
		} else {
			// //非统一配置
			// console.log("非统一设置");
			let rulesdata = this.state.rulesdata;

			let newlist = []

			rulesdata.map((item, key) => {

				if (item.publish_time === "Invalid date" || item.end_time === "Invalid date" || item.publiend_timesh_time === "Invalid date") {

				} else {
					newlist.push(item)
				}

			})

			data = {
				unified_setting: this.state.unifiedsetting,   //非统一配置
				group_settings: newlist,
				allow_late: this.state.allowreplenishment,   //补交
				late_penalty: parseInt(this.state.latededuction), //迟交扣分
				late_time: moment(this.state.late_time).format('YYYY-MM-DD HH:mm'), //结束时间
				answer_open_evaluation: this.state.level === "满分" ? true : false, //扣分项
				work_efficiency: this.state.work_efficiencys, //完成效率评分占比
				eff_score: this.state.work_efficiencys=== true ? this.state.latedeductiontwo : undefined,//效率分
				shixun_evaluation: this.state.proportion === "均分比例" ? 0 : this.state.proportion === "经验值比例" ? 1 : this.state.proportion === "自定义分值" ? 2 : 0,
				challenge_settings: array,
				score_open: this.state.publicwork,
				total_score:this.state.CalculateMax,
				total_scoretwo:this.state.CalculateMax

			}
		}


		// console.log("pustdate");
		// console.log(data);
		// console.log(JSON.stringify(data));
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// console.log(JSON.stringify(result));
					this.getTrainingjobsetting(true);
					this.props.showNotification(`更新成功`);
					this.setState({
						flagPageEditsbox: false,
						flagPageEdit: false,
						flagPageEditstwo: false,
						flagPageEditsthrees: false,
						flagPageEditsfor: false,
						whethertopay: false,
						completionefficiencyscore: false,
					})
					this.refs.targetElementTrainingjobsetting.scrollIntoView()

				}
			}).catch((error) => {
			console.log(error);
		})

	}
	//数据库
	onChangedatabase = (e) => {
		this.setState({
			database: e.target.checked,
		})
		// console.log(e.target.checked);


	}
	//公开设置
	onChangepublicwork = (e) => {
		this.setState({
			publicwork: e.target.checked,
		})
		// console.log(e.target.checked);
	}

	//是否跳关设置
	onChangedatasheet = (e, index) => {

		var challenge_settings = this.state.challenge_settings;
		let {task_pass} = this.state;
		if (task_pass === true) {
			// 可以跳关
			for (var i = 0; i < challenge_settings.length; i++) {
				if (i === index) {
					if (challenge_settings[i].checked === true) {
						challenge_settings[i].checked = false
					} else {
						challenge_settings[i].checked = true
					}
				}
			}
		} else {
			//不能跳关
			var bool = false;
			//先判断如果是点击的关口 checked 根据点击进行切换
			for (var i = 0; i < challenge_settings.length; i++) {
				if (i === index) {
					if (challenge_settings[i].checked === true) {
						challenge_settings[i].checked = false
						bool = false;
					} else {
						challenge_settings[i].checked = true
						bool = true;
					}
				}
			}
			//小于被选中的checked 都被选中 如果是大于被选中的checked 就全部隐藏掉
			for (var i = 0; i < challenge_settings.length; i++) {
				if (bool === true) {
					if (i < index) {
						challenge_settings[i].checked = true
					}
				} else {
					if (i > index) {
						challenge_settings[i].checked = false
					}
				}

			}
		}
		// console.log(e.target.checked)
		// console.log(index)
		this.setState({
			datasheet: e.target.checked,
			challenge_settings: challenge_settings
		})

		this.onChangeslevelproportiontwo(this.state.proportion);
	}
	//统一设置
	onChange = (e) => {
		if ((moment(this.state.publish_time, "YYYY-MM-DD HH:mm") <= moment())) {
			this.props.showNotification(`已发布，不能再修改统一设置`);
			return
		}
		this.setState({
			unifiedsetting: e.target.checked,
		})
		// console.log(e.target.checked);
	}

	//允许补交
	onChanges = (e) => {
		// console.log(this.state.end_time);
		if (e.target.checked === true) {
			if (this.state.end_time !== null && this.state.end_time !== undefined) {
				// console.log(this.state.end_time);
				// var times = this.state.deadline.format('YYYY-MM-DD HH:mm');
				this.setState({
					late_time: moment(handleDateString(this.state.deadline)).add(1, 'months'),
					late_times: moment(handleDateString(this.state.deadline)).add(1, 'months').format('YYYY-MM-DD HH:mm'),
				})
			}


			this.setState({
				allowreplenishment: e.target.checked,
				latededuction: 5,
				whethertopay: true,
			})

		} else {
			this.setState({
				allowreplenishment: e.target.checked,
				latededuction: 0,
				whethertopay: false,
				hand__e_tip: "",
				hand_flags: false,
				handclass: "",
			})
		}

		// console.log('radio checked', e.target.value);
	}
	//级别
	onChangeslevel = (e) => {
		this.setState({
			level: e.target.value
		})
		// console.log('radio checked', e.target.value);
	}
	//比例
	onChangeslevelproportion = (e) => {

		this.state.proportion = e.target.value
		if (e.target.value === "均分比例") {
			this.Equalproportion(this.state.latedeductiontwo, this.state.CalculateMax, true);
		}

		if (e.target.value === "经验值比例") {
			this.Empiricalvalueratio(this.state.latedeductiontwo, this.state.CalculateMax, true);
		}

		if (e.target.value === "自定义分值") {
			this.state.boolUnitetwoname = "自定义分值";
			this.setState({
				boolUnitetwoname: "自定义分值",
				boolUnitetwo: false,
				flagPageEdits: true,
			})

		}

		this.setState({
			proportion: e.target.value
		})
		// console.log('radio checked', e.target.value);
	}
	onChangeslevelproportiontwo = (value) => {
		if (value === "均分比例") {
			this.Equalproportion(this.state.latedeductiontwo, this.state.CalculateMax, true);
		}

		if (value === "经验值比例") {
			this.Empiricalvalueratio(this.state.latedeductiontwo, this.state.CalculateMax, true);
		}

		if (value === "自定义分值") {
			this.state.boolUnitetwoname = "自定义分值";
			this.setState({
				boolUnitetwoname: "自定义分值",
				boolUnitetwo: false,
				flagPageEdits: true,
			})

		}

		this.setState({
			proportion: value
		})
	}
	//均分比例
	Equalproportion = (latedeductiontwo, Proportions, mybool) => {

		var challenge_settingsdata = this.state.challenge_settings;
		var latedeductiontwos = latedeductiontwo;
		if (latedeductiontwos === undefined || latedeductiontwos === null || latedeductiontwos === "") {
			latedeductiontwos = 0;
		}
		//效率分
		if (challenge_settingsdata.length > 0) {
			var Proportion = Proportions;
			var oushution = 0;
			//获取占用分后的值
			Proportion = Proportion - latedeductiontwos;
			oushution = Proportion;
			var srorelength = 0;
			//计算选中用户
			for (var k = 0; k < challenge_settingsdata.length; k++) {
				if (challenge_settingsdata[k].checked === true) {
					srorelength++
				}
			}
			//算下面值是否是奇数
			var srbool = false;
			if (srorelength % 2 == 0) {
				// 偶数
				srbool = false;
			} else {
				// 奇数
				srbool = true;
			}
			//计算平均值
			Proportion = Proportion / srorelength;
			var intkk = 0;
			var intkks = 0;
			if (srbool == true) {
				// 奇数
				var exams = parseFloat(Proportion.toFixed(1));
				var intk = srorelength * exams;
				intkk = oushution - intk;
				// console.log("奇数");
				// console.log(srorelength);//3
				// console.log(oushution);//79
				// console.log(exams);//26.3
				// console.log(intk);//78.9
				// console.log(intkk);
			} else {
				// 偶数
				var examsy = parseFloat(Proportion.toFixed(1));
				intkks = oushution - (examsy * srorelength);
				// console.log("偶数");
				// console.log(oushution);
				// console.log((examsy*srorelength));
			}
			var mact = 0;

			//给每到题目赋平均值
			for (var i = 0; i < challenge_settingsdata.length; i++) {
				if (challenge_settingsdata[i].checked === true) {
					if (srbool === false) {
						//console.log(intkks);
						mact = mact + 1;
						if (mact === srorelength) {
							challenge_settingsdata[i].challenge_score = (parseFloat(Proportion.toFixed(1)) + parseFloat(intkks.toFixed(1))).toFixed(1);
							//console.log(challenge_settingsdata[i].challenge_score);

						} else {
							challenge_settingsdata[i].challenge_score = Proportion.toFixed(1);
						}
					} else {
						//console.log(intkk);
						mact = mact + 1;
						if (mact === srorelength) {
							challenge_settingsdata[i].challenge_score = (parseFloat(Proportion.toFixed(1)) + parseFloat(intkk.toFixed(1))).toFixed(1);
							//console.log(challenge_settingsdata[i].challenge_score);
						} else {
							challenge_settingsdata[i].challenge_score = Proportion.toFixed(1);
						}

					}
				} else {
					challenge_settingsdata[i].challenge_score = 0;
				}
			}
		}

		//关卡分值平分
		this.setState({
			boolUnitetwo: true,
			flagPageEdits: false,
			challenge_settings: challenge_settingsdata,
		})
		if (mybool === true) {
			this.Calculatethetotalscore(latedeductiontwo, challenge_settingsdata);
		}

	}

	//经验值比例
	Empiricalvalueratio = (latedeductiontwo, ionsps, mybool) => {
		var shixun_exp = this.state.shixun_exp;
		var challenge_settingsdata = this.state.challenge_settings;
		var latedeductiontwos = latedeductiontwo;
		if (latedeductiontwos === undefined || latedeductiontwos === null || latedeductiontwos === "") {
			latedeductiontwos = 0;
		}
		// //效率分
		if (shixun_exp !== undefined) {
			if (shixun_exp > 0) {
				if (challenge_settingsdata.length > 0) {
					var ionsp = ionsps;
					//获取效率分之后的值
					ionsp = ionsp - latedeductiontwos;
					//获取道总分值
					var Proportion = shixun_exp;
					//获取改变后的总分值
					for (var k = 0; k < challenge_settingsdata.length; k++) {
						if (challenge_settingsdata[k].checked === false) {
							Proportion = Proportion - challenge_settingsdata[k].challenge_exp;
						}
					}
					//开始循环赋值
					var expzs = 0;
					var mact = 0;
					for (var i = 0; i < challenge_settingsdata.length; i++) {
						if (challenge_settingsdata[i].checked === true) {
							mact = mact + 1;
							var myint = (challenge_settingsdata[i].challenge_exp / Proportion) * ionsp;
							challenge_settingsdata[i].challenge_score = myint.toFixed(1);
							expzs = parseFloat(myint.toFixed(1)) + parseFloat(expzs);
						} else {
							challenge_settingsdata[i].challenge_score = 0;
						}
					}
					var expzsy = 0;
					var bool = true;
					if (ionsp - expzs > 0) {
						expzsy = parseFloat(ionsp.toFixed(1)) - parseFloat(expzs.toFixed(1));
						expzsy = Math.abs(expzsy);
						bool = true;
					} else {
						expzsy = parseFloat(ionsp.toFixed(1)) - parseFloat(expzs.toFixed(1));
						expzsy = Math.abs(expzsy);
						bool = false;

					}
					var macts = 0;
					for (var i = 0; i < challenge_settingsdata.length; i++) {
						if (challenge_settingsdata[i].checked === true) {
							macts = macts + 1;
							if (mact === macts) {
								if (bool === true) {
									challenge_settingsdata[i].challenge_score = (parseFloat(challenge_settingsdata[i].challenge_score) + parseFloat(expzsy.toFixed(1))).toFixed(1);
									//console.log(parseFloat(challenge_settingsdata[i].challenge_score) + parseFloat(expzsy.toFixed(1)));
									//console.log(parseFloat(expzsy.toFixed(1)));

								} else {

									challenge_settingsdata[i].challenge_score = (parseFloat(challenge_settingsdata[i].challenge_score) - parseFloat(expzsy.toFixed(1))).toFixed(1);
									//console.log(parseFloat(challenge_settingsdata[i].challenge_score) - parseFloat(expzsy.toFixed(1)));
									//console.log(parseFloat(expzsy.toFixed(1)));

								}
							}
						} else {
							challenge_settingsdata[i].challenge_score = 0;
						}
					}

				}
			}
		}
		this.setState({
			boolUnitetwo: false,
			flagPageEdits: false,
			challenge_settings: challenge_settingsdata,
		})
		if (mybool === true) {
			this.Calculatethetotalscore(latedeductiontwo, challenge_settingsdata);
		}
	}

	//完成效率评分占比
	onChangeeffectiveness = (e) => {
		if (e.target.checked === true) {
			this.setState({
				completionefficiencyscore: e.target.checked,
				work_efficiencys: e.target.checked,
				latedeductiontwo: 20,
			})
			//均分比例
			if (this.state.proportion === "均分比例") {
				this.Equalproportion(20, this.state.CalculateMax, true);

			} else if (this.state.proportion === "经验值比例") {
				this.Empiricalvalueratio(20, this.state.CalculateMax, true);

			}

		} else {
			this.state.latedeductiontwo = 0;
			this.setState({
				completionefficiencyscore: e.target.checked,
				work_efficiencys: e.target.checked,
				latedeductiontwo: 0,
			})
			//均分比例
			if (this.state.proportion === "均分比例") {
				this.Equalproportion(0, this.state.CalculateMax, true);

			} else if (this.state.proportion === "经验值比例") {
				this.Empiricalvalueratio(0, this.state.CalculateMax, true);

			}
		}

		// console.log(e.target.checked);

	}

	//迟交扣分
	changeTopicName = (value) => {
		// console.log("1e.target.value", value)
		if (value === "" || value === undefined) {
			return
		}
		var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		var nubmer = value;
		if (!re.test(nubmer)) {
			this.props.showNotification(`请输入正确的数字`);
			this.setState({
				latededuction: 0
			})
			return false;
		}

		// if (nubmer > 100) {
		//     this.props.showNotification(`请输入小于100的数`);
		//
		//     this.setState({
		//         latededuction: 0
		//     })
		//     return
		// }
		this.setState({
			latededuction: value,
		})

	}
	//总比分
	Totalscorecalculation = (value) => {
		// console.log(2)
		// console.log(value)
		this.setState({
			CalculateMax: value,
		})
		if ( value === undefined || value === null || value === "" ) {
			this.setState({
				borredszf:"ml10  color-grey-9 bor-reds ",
				borredszfls:"不能为空",
				borredszfl:false,
			})
			return
		}
		var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		var nubmer = value;
		if (!re.test(nubmer)) {
			this.setState({
				borredszf:"ml10  color-grey-9 bor-reds ",
				borredszfls:"请输入数字",
				borredszfl:false,
			})
			return;
		}
		this.setState({
			borredszf:"ml10  color-grey-9 ",
			borredszfls:"",
			borredszfl:true,
		})
		// if (nubmer > 100) {
		//     this.props.showNotification(`请输入小于100的数`);
		//
		//     this.setState({
		//         CalculateMax: 0
		//     })
		//     return
		// }
		//获取效率分
		let myvalues = this.state.latedeductiontwo;
		//均分比例
		if (this.state.proportion === "均分比例") {
			this.Equalproportion(myvalues, value, true);

		} else if (this.state.proportion === "经验值比例") {
			this.Empiricalvalueratio(myvalues, value, true);

		}

	}


	// //效率分
	changeTopicNametwo = (value) => {
		// console.log("TrainingjobsettingTrainingjobsetting", value)
		if (value === "" || value === undefined) {
			return
		}
		var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		var nubmer = value;
		if (!re.test(nubmer)) {
			this.props.showNotification(`请输入正确的数字`);

			this.setState({
				latedeductiontwo: 0
			})
			return false;
		}

		// if (nubmer > 100) {
		//     this.props.showNotification(`请输入小于100的数`);
		//
		//     this.setState({
		//         latedeductiontwo: 0
		//     })
		//     return
		// }
		this.setState({
			latedeductiontwo: value,
		})


		//均分比例
		if (this.state.proportion === "均分比例") {
			this.Equalproportion(value, this.state.CalculateMax, true);

		} else if (this.state.proportion === "经验值比例") {
			this.Empiricalvalueratio(value, this.state.CalculateMax, true);

		} else if (this.state.proportion === "自定义分值") {
			// this.Calculatethetotalscore(value, this.state.challenge_settings);
		}

	}


	hangeTopicNametwodatasheet = (value, index) => {
		// console.log("2e.target.value", value)
		if (value === "" || value === undefined) {
			return
		}
		var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		var nubmer = value;
		if (!re.test(nubmer)) {
			this.props.showNotification(`请输入正确的数字`);

			// this.setState({
			//     datasheet: 0
			// })
			var challenge_settings = this.state.challenge_settings;
			for (var i = 0; i < challenge_settings.length; i++) {
				if (i === index) {
					challenge_settings[i].challenge_score = "";
				}
			}
			this.setState({
				challenge_settings: challenge_settings
			})
			return false;
		}

		var challenge_settings = this.state.challenge_settings;
		for (var i = 0; i < challenge_settings.length; i++) {
			if (i === index) {
				challenge_settings[i].challenge_score = value;
			}
		}

		this.setState({
			challenge_settings: challenge_settings
		})
		var latedeductiontwos = 0;
		//效率分是否勾选 勾选获取效分
		if (this.state.completionefficiencyscore === true) {
			latedeductiontwos = this.state.latedeductiontwo;
		}

		if (this.state.proportion === "均分比例") {
			this.Calculatethetotalscore(latedeductiontwos, challenge_settings);

		} else if (this.state.proportion === "经验值比例") {
			this.Calculatethetotalscore(latedeductiontwos, challenge_settings);

		}


		// if (nubmer > 100) {
		//     message.error("请输入小于100的数");
		//     this.setState({
		//         datasheet: 0
		//     })
		//     return
		// }
		// this.setState({
		//     datasheet: value,
		// })

	}


	// disabledEndDate = (end_time) => {
	//     const publish_time = this.state.publish_time;
	//     if (!end_time || !publish_time) {
	//         return false;
	//     }
	//     return end_time.valueOf() <= publish_time.valueOf();
	//
	// }
	// disabledEndDates = (end_time) => {
	//     const publish_time = this.state.end_time
	//     if (!end_time || !publish_time) {
	//         return false;
	//     }
	//     console.log("end_time.valueOf()")
	//     // console.log(end_time.valueOf());
	//     // console.log(publish_time.valueOf());
	//     return end_time.valueOf() <= publish_time.valueOf();
	//
	//
	// }

	disabledStartDatestart = (startValue) => {
		const endValue = this.state.end_time

		if (!startValue || !endValue) {
			return false;
		}
		var endValues = moment(endValue).subtract(1, 'days');
		return startValue.valueOf() > endValues.valueOf();
	};

	disabledEndDateend = (endValue) => {
		const startValue = this.state.publish_time;
		if (!endValue || !startValue) {
			return false;
		}
		var endValuesys = moment(startValue).subtract(1, 'days');

		return endValue.valueOf() <= endValuesys.valueOf();
	};

	disabledEndDateendd = (endsValue) => {
		const endValues = this.state.end_time

		if (!endsValue || !endValues) {
			return false;
		}
		var endValuesyss = moment(endValues).subtract(1, 'days');

		return endsValue.valueOf() <= endValuesyss.valueOf();
	};


	onChangedata = (field, value, dateString) => {
		this.setState({
			[field]: handleDateString(dateString),
		});
	}
	ontimeonok = (value) => {
		//console.log("ontimeonok点击了2");

		if (value === undefined) {
			return;
		}
		if (moment(value, "YYYY-MM-DD HH:mm") <= moment()) {

		} else {
			try {
				this.setState({
					unit_p_tip: "",
					p_flag: false,
					borreds: undefined,
					releasetime: value.format('YYYY-MM-DD HH:mm'),
				})
			} catch (e) {
			}
		}
	}
	ontimeonoktwo = (value) => {
		if (value === undefined) {
			return;
		}
		if (moment(value, "YYYY-MM-DD HH:mm") <= moment()) {

		} else {
			if (moment(value, "YYYY-MM-DD HH:mm") <= moment(this.state.publish_time, "YYYY-MM-DD HH:mm")) {

				return
			}
			try {
				this.setState({
					unit_e_tip: "",
					p_flag: false,
					deadline: value.format('YYYY-MM-DD HH:mm'),
					borredss: undefined,
				})
			} catch (e) {

			}
		}
	}
	ontimeonokthree = (value) => {
		if (value === undefined) {
			return;
		}

		let {publish_time, unifiedsetting, rulesdata} = this.state;
		if (unifiedsetting === true) {
			if (moment(value, "YYYY-MM-DD HH:mm") <= moment(publish_time)) {
			} else {

			}
		} else {
			rulesdata.map((item, key) => {
				if (item.publish_time != "Invalid date") {
					if (moment(value, "YYYY-MM-DD HH:mm") <= moment(item.publish_time, "YYYY-MM-DD HH:mm")) {

					} else {
						this.setState({
							late_times: value.format('YYYY-MM-DD HH:mm'),
							hand__e_tip: "",
							hand_flags: false,
							handclass: "",
						})
					}
				}

			})
		}
	}
	onStartChange = (value, dateString) => {
		//console.log("onStartChange点击了1");

		if (value == null) {
			this.setState({
				releasetime: undefined,
				publish_time: undefined,
			})
			return;
		}
		// if (moment(value, "YYYY-MM-DD HH:mm") <= moment()) {
		//     this.setState({
		//         unit_p_tip: "发布时间不能早于当前时间",
		//         p_flag: true,
		//         borreds:"bor-reds",
		//         releasetime:undefined,
		//         publish_time:undefined,
		//     })
		// } else {

		try {
			this.setState({
				unit_p_tip: "",
				p_flag: false,
				borreds: undefined,
				releasetime: value.format('YYYY-MM-DD HH:mm'),
			})
		} catch (e) {

		}
		// //console.log(value);
		//console.log(dateString);
		// console.log(handleDateString(dateString));
		// this.onChangedata('publish_time', value, dateString);
		this.setState({
			publish_time: moment(moment(handleDateString(dateString))).format("YYYY-MM-DD HH:mm"),
		});
		if (this.state.allowreplenishment === true) {

			if (this.state.end_time === undefined || this.state.end_time === "") {
				this.setState({
					end_time: moment(handleDateString(dateString)).add(1, 'months'),
					deadline: moment(handleDateString(dateString)).add(1, 'months').format('YYYY-MM-DD HH:mm'),
				})
			} else {

			}
			if (this.state.late_time === undefined || this.state.late_time === "") {
				this.setState({

					late_time: moment(handleDateString(dateString)).add(2, 'months'),
					late_times: moment(handleDateString(dateString)).add(2, 'months').format('YYYY-MM-DD HH:mm'),
				});
			} else {

			}
			try {
				this.setState({
					unit_e_tip: "",
					p_flag: false,
					borredss: undefined,
				})
			} catch (e) {

			}
		} else {
			if (this.state.end_time === undefined || this.state.end_time === "") {
				this.setState({
					end_time: moment(handleDateString(dateString)).add(1, 'months'),
					deadline: moment(handleDateString(dateString)).add(1, 'months').format('YYYY-MM-DD HH:mm'),
				})
			} else {

			}
		}

		// }
	}

	onEndChange = (value, dateString) => {
		// console.log("onEndChange")
		// console.log(value)
		// console.log(dateString)
		if (value == null) {
			this.setState({
				end_time: undefined,
				deadline: undefined,
			})
			return;
		}
		// if (moment(value, "YYYY-MM-DD HH:mm") <= moment()) {
		//     this.setState({
		//         unit_e_tip: "截止时间不能早于当前时间",
		//         p_flag: true,
		//         borredss:"bor-reds",
		//         end_time:undefined,
		//         deadline:undefined,
		//     })
		// } else {
		// console.log(moment(value, "YYYY-MM-DD HH:mm"));
		// console.log(moment(this.state.publish_time, "YYYY-MM-DD HH:mm"));
		if (moment(value, "YYYY-MM-DD HH:mm") <= moment(this.state.publish_time, "YYYY-MM-DD HH:mm")) {
			this.setState({
				unit_e_tip: "截止时间不能早于发布时间",
				p_flag: true,
				borredss: "bor-reds",
				end_time: value.format('YYYY-MM-DD HH:mm'),
				deadline: value.format('YYYY-MM-DD HH:mm'),
			})

			return
		}
		try {
			this.setState({
				unit_e_tip: "",
				p_flag: false,
				borredss: undefined,
				deadline: value.format('YYYY-MM-DD HH:mm'),
			})
		} catch (e) {

		}
		this.setState({
			end_time: moment(moment(handleDateString(dateString))).format("YYYY-MM-DD HH:mm"),
		})
		// this.onChangedata('end_time', value, dateString);
		if (this.state.allowreplenishment === true) {
			this.setState({
				deadline: moment(handleDateString(dateString)).format('YYYY-MM-DD HH:mm'),
				late_time: moment(handleDateString(dateString)).add(2, 'months'),
				late_times: moment(handleDateString(dateString)).add(2, 'months').format('YYYY-MM-DD HH:mm'),
			})
		}

		// }

	}
	onEndChangeys = (value, dateString) => {

		if (value == null) {
			this.setState({
				late_times: undefined,
				late_time: undefined,
			})
			return;
		}
		let {publish_time, end_time, unifiedsetting, rulesdata} = this.state;

		if (unifiedsetting === true) {
			if (moment(value, "YYYY-MM-DD HH:mm") <= moment(publish_time)) {
				this.setState({
					hand__e_tip: "补交结束时间不能早于发布时间",
					hand_flags: true,
					handclass: "bor-reds",
					late_times: value.format('YYYY-MM-DD HH:mm'),
					late_time: value.format('YYYY-MM-DD HH:mm'),
				})
			} else if (moment(value, "YYYY-MM-DD HH:mm") <= moment(end_time)) {
				this.setState({
					hand__e_tip: "补交结束时间不能早于截止时间",
					hand_flags: true,
					handclass: "bor-reds",
					late_times: value.format('YYYY-MM-DD HH:mm'),
					late_time: value.format('YYYY-MM-DD HH:mm'),
				})
			} else {

				try {
					this.setState({
						late_times: value.format('YYYY-MM-DD HH:mm'),
						late_time: value.format('YYYY-MM-DD HH:mm'),
						hand__e_tip: "",
						hand_flags: false,
						handclass: "",
					})

				} catch (e) {

				}
			}
		} else {
			rulesdata.map((item, key) => {
				if (item.publish_time != "Invalid date") {
					if (moment(value, "YYYY-MM-DD HH:mm") <= moment(item.publish_time)) {
						//console.log(moment(item.publish_time, "YYYY-MM-DD HH:mm") <= moment(publish_time))
						let kes = key + 1;
						this.setState({
							hand__e_tip: "补交时间不能早于发布规则" + kes + "的发布时间",
							hand_flags: true,
							handclass: "bor-reds",

						})
						return
					} else {
						this.setState({
							late_times: value.format('YYYY-MM-DD HH:mm'),
							late_time: value.format('YYYY-MM-DD HH:mm'),
							hand__e_tip: "",
							hand_flags: false,
							handclass: undefined,
						})
					}
				}

			})


		}


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
					starttime: "发布时间：" + moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					starttimes: starttime,
					starttimesend: response.data.end_time === undefined || response.data.end_time === null || response.data.end_time === "" ? undefined : response.data.end_time,
					typs: "start",
					endtime: "截止时间：" + endtime,
					Cancelname: "暂不发布",
					Savesname: "立即发布",
					Cancel: this.homeworkhide,
					Saves: this.homeworkstartend,
					course_groups: response.data.course_groups,
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
				this.setState({})
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
					typs: "end",
					course_groups: response.data.course_groups,
				})
			}
		}).catch((error) => {
			console.log(error)
		});


	}
// 立即发布
	homeworkstartend = (ds, endtime) => {
		var homeworkid = this.props.match.params.homeworkid;

		let data = {}
		if (ds.length === 0) {
			if (this.props.teacherdatapage.category.main === 1) {
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
				}
			} else {
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
					category_id: this.props.teacherdatapage.category.category_id,
				}
			}
		} else {
			if (this.props.teacherdatapage.category.main === 1) {
				data = {
					homework_ids: [homeworkid],
					group_ids: ds,
					group_end_times: endtime,
					detail: true
				}
			} else {
				data = {
					homework_ids: [homeworkid],
					group_ids: ds,
					group_end_times: endtime,
					category_id: this.props.teacherdatapage.category.category_id,
					detail: true
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
					this.getTrainingjobsetting(false);
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
					// notification['success']({
					//     message:"提示",
					//     description:response.data.message
					// });
					this.getTrainingjobsetting(false);
					this.homeworkhide()
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getcourse_groupslist = (id) => {
		this.setState({
			course_groupslist: id
		})
	}

	homeworkhide = () => {
		this.setState({
			modalname: undefined,
			modaltype: undefined,
			visible: false,
			OneSelftype: false,
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
			starttimesend: undefined,
		})
	}
	cancelBox = () => {
		this.setState({
			modalsType: false,
			modalsTopval: "",
			loadtype: false,
		})
	}
	//编辑
	editSetting = () => {
		try {
			if (this.state.jobsettingsdata.data.is_end === true) {
				this.setState({
					modalsType: true,
					modalsTopval: "课堂已结束不能再修改!",
					loadtype: true,
					modalSave: this.cancelBox
				})
			} else {

				var releasetime = true;
				var deadline = true;
				var endtime = true;
				var whethertopays = true;
				//发布时间

				if (moment(this.state.publish_time, "YYYY-MM-DD HH:mm") <= moment()) {
					releasetime = false;
				}
				//截止时间
				if (moment(this.state.end_time, "YYYY-MM-DD HH:mm") <= moment()) {
					deadline = false;
				}
				//结束时间
				if (moment(this.state.late_time, "YYYY-MM-DD HH:mm") <= moment()) {
					endtime = false;
				}
				if (this.state.allowreplenishment === false) {
					whethertopays = false;
				}
				if (this.state.jobsettingsdata !== undefined) {

				}

				try {
					if (this.state.jobsettingsdata && this.state.jobsettingsdata.data.homework_status[0] === "未发布") {
						this.setState({
							flagPageEditsbox: true,
							flagPageEdit: true,
							whethertopay: whethertopays,
							flagPageEditstwo: releasetime,
							flagPageEditsthrees: deadline,
							flagPageEditsfor: endtime,
							completionefficiencyscore: false,
							work_efficiencys: this.state.work_efficiencys,
							unifiedsetting: this.state.unifiedsetting,
							latedeductiontwo: this.state.latedeductiontwo,
						});
						//均分比例
						try {
							if (this.state.proportion === "均分比例") {
								this.Equalproportion(this.state.latedeductiontwo, this.state.CalculateMax, true);

							} else if (this.state.proportion === "经验值比例") {
								this.Empiricalvalueratio(this.state.latedeductiontwo, this.state.CalculateMax, true);

							}
						} catch (e) {

						}

					} else {
						this.setState({
							flagPageEditsbox: true,
							flagPageEdit: true,
							whethertopay: whethertopays,
							flagPageEditstwo: releasetime,
							flagPageEditsthrees: deadline,
							flagPageEditsfor: endtime,
							unifiedsetting: this.state.unifiedsetting,
						});
						if (this.state.work_efficiencys === true) {
							this.setState({
								completionefficiencyscore: true,
							})
						} else {
							this.setState({
								completionefficiencyscore: false,
							})
						}
					}
				} catch (e) {
					this.setState({
						flagPageEditsbox: true,
						flagPageEdit: true,
						whethertopay: whethertopays,
						flagPageEditstwo: releasetime,
						flagPageEditsthrees: deadline,
						flagPageEditsfor: endtime,
						unifiedsetting: this.state.unifiedsetting,
					});
					if (this.state.work_efficiencys === true) {
						this.setState({
							completionefficiencyscore: true,
						})
					} else {
						this.setState({
							completionefficiencyscore: false,
						})
					}
				}

				if (this.state.proportion === "自定义分值") {
					this.setState({
						boolUnitetwoname: "自定义分值",
						boolUnitetwo: false,
						flagPageEdits: true,
					})
				}

			}
		} catch (e) {

		}
	};
	//一进来就是老师要用的编辑页面
	editSettings = (datas) => {
		// console.log("编辑页面");
		// console.log(datas);

		try {
			if (datas.data.is_end === true) {
				this.setState({
					modalsType: true,
					modalsTopval: "课堂已结束不能再修改!",
					loadtype: true,
					modalSave: this.cancelBox
				})
			} else {
				//
				var releasetime = true;
				var deadline = true;
				var endtime = true;
				var whethertopays = true;
				//发布时间

				if (moment(datas.data.publish_time, "YYYY-MM-DD HH:mm") <= moment()) {
					releasetime = false;
				}
				//截止时间
				if (moment(datas.data.end_time, "YYYY-MM-DD HH:mm") <= moment()) {
					// deadline = false;
				}
				//结束时间
				if (moment(datas.data.late_time, "YYYY-MM-DD HH:mm") <= moment()) {
					endtime = false;
				}
				if (datas.data.allow_late === false) {
					whethertopays = false;
				}

				try {
					if (datas.data && datas.data.homework_status[0] === "未发布") {
						this.setState({
							flagPageEditsbox: true,
							flagPageEdit: true,
							whethertopay: whethertopays,
							flagPageEditstwo: releasetime,
							flagPageEditsthrees: deadline,
							flagPageEditsfor: endtime,
							completionefficiencyscore: datas.data.work_efficiency === true ? true : false,
							work_efficiencys: datas.data.work_efficiency,
							unifiedsetting: datas.data.unified_setting,
							latedeductiontwo: datas.data.eff_score,
						});
						//均分比例
						// result.data.shixun_evaluation === 0 ? "均分比例" : result.data.shixun_evaluation === 1 ? "经验值比例" : result.data.shixun_evaluation === 2 ?
						try {
							if (datas.data.shixun_evaluation === 0) {
								this.Equalproportion(datas.data.eff_score, this.state.CalculateMax, false);

							} else if (datas.data.shixun_evaluation === 1) {
								this.Empiricalvalueratio(datas.data.eff_score, this.state.CalculateMax, false);

							}
						} catch (e) {
							//console.log("报错editSettings");
							//console.log(1);
							//console.log(e);


						}

					} else {
						this.setState({
							flagPageEditsbox: true,
							flagPageEdit: true,
							whethertopay: whethertopays,
							flagPageEditstwo: releasetime,
							flagPageEditsthrees: deadline,
							flagPageEditsfor: endtime,
							unifiedsetting: datas.data.unified_setting,
						});
						if (datas.data.work_efficiency === true) {
							this.setState({
								completionefficiencyscore: true,
							})
						} else {
							this.setState({
								completionefficiencyscore: false,
							})
						}
					}
				} catch (e) {
					//console.log(2);
					//console.log(e);
					this.setState({
						flagPageEditsbox: true,
						flagPageEdit: true,
						whethertopay: whethertopays,
						flagPageEditstwo: releasetime,
						flagPageEditsthrees: deadline,
						flagPageEditsfor: endtime,
						unifiedsetting: datas.data.unified_setting,
					});
					if (datas.data.work_efficiency === true) {
						this.setState({
							completionefficiencyscore: true,
						})
					} else {
						this.setState({
							completionefficiencyscore: false,
						})
					}
				}

				if (datas.data.shixun_evaluation === 2) {
					this.setState({
						boolUnitetwoname: "自定义分值",
						boolUnitetwo: false,
						flagPageEdits: true,
					})
				}

			}
		} catch (e) {
			//console.log(3);
			//console.log(e);
		}
	};
	//取消编辑
	cancelEdit = () => {
		this.setState({
			flagPageEditsbox: false,
			flagPageEdit: false,
			flagPageEditstwo: false,
			flagPageEditsthrees: false,
			flagPageEditsfor: false,
			whethertopay: false,
			unit_p_tip: "",
			p_flag: false,
			borreds: undefined,
			borredss: undefined,
			hand__e_tip: "",
			hand_flags: false,
			handclass: undefined,
			completionefficiencyscore: false,
			latedeductiontwo: 0,
			unit_e_tip: "",
		})
		this.refs.targetElementTrainingjobsetting.scrollIntoView();
		this.getTrainingjobsetting(false);

		// console.log(3)
		// console.log(this.state.total_scoretwo)
		this.setState({
			CalculateMax:this.state.total_scoretwo,
		})
	}

	rulesCheckInfo = (rules) => {
		var datas = [];
		for (var i = 0; i < rules.length; i++) {
			if (rules[i].course_group_id instanceof Array) {
				datas.push({
					group_id: rules[i].course_group_id,
					publish_time: moment(rules[i].publish_time).format('YYYY-MM-DD HH:mm'),
					end_time: moment(rules[i].end_time).format('YYYY-MM-DD HH:mm'),
				});
			} else {
				datas.push({
					group_id: [rules[i].course_group_id],
					publish_time: moment(rules[i].publish_time).format('YYYY-MM-DD HH:mm'),
					end_time: moment(rules[i].end_time).format('YYYY-MM-DD HH:mm'),
				});
			}

		}
		//console.log(rules);
		//console.log(datas);
		this.setState({
			rules,
			rulesdata: datas,
		})
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


	testscripttip = (e) => {
		if (e === 0) {
			this.setState({
				testscripttiptype: true,
			})
		} else {
			this.setState({
				testscripttiptype: false,
			})
		}


	}
	ChangeTab = (e) => {
		this.props.ChangeTab(e);
	}

	daochushixunbaogao = () => {
		let url = `/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}`;
		this.confirmysl(url,true) ;
	}

	daochuzuoye = () => {
		let url = `/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx`;
		this.confirmysl(url,true);
	}

	confirmysl(url, urlWithExport) {
		axios.get(url+`?export=true`).then((response) => {
			if (response === undefined) {
				return
			}
			if (response.data.status && response.data.status === -1) {

			} else if (response.data.status && response.data.status === -2) {
				if (response.data.message === "100") {
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType: true,
						DownloadMessageval: 100
					})
				} else {
					//因附件资料超过500M
					this.setState({
						DownloadType: true,
						DownloadMessageval: 500
					})
				}
			} else {
				this.props.showNotification(`正在下载中`);
				window.open(getRandomcode("/api" + url), '_blank');

			}
		}).catch((error) => {
			console.log(error)
		});
	}


	Downloadcal = () => {
		this.setState({
			DownloadType: false,
			DownloadMessageval: undefined
		})
	}

	render() {


		const dataformat = 'YYYY-MM-DD HH:mm';
		let {flagPageEdit, testscripttiptype, publish_timebool, end_timebool,borredszf,borredszfl,borredszfls, late_timesbool, work_efficiencys, flagPageEdits, flagPageEditstwo, flagPageEditsbox, whethertopay, handclass, flagPageEditsthrees, flagPageEditsfor, rules, rulest, unifiedsetting, group_settings, course_group, unit_e_tip, borreds, borredss, unit_p_tip, end_time, late_time, score_open, publish_time, starttimetype, modalsType, modalsTopval, loadtype, modalSave, endtimetype, latetimetype, allowlate, latepenaltytype, jobsettingsdata, endOpen, mystyle, mystyles, task_pass} = this.state;
		// console.log(publish_timebool);
		// console.log(!flagPageEditstwo);
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
			color: "#666666"
		};
		const radioStyles = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
			color: "#666666",
			marginLeft: '38px',
		};

		// const startDate=moment(this.state.publish_time).format('YYYY-MM-DD HH:mm');
		// const endDate =moment(this.state.publish_time).add('months',1).format('YYYY-MM-DD HH:mm');
		// console.log("Trainingjobsetting");
		// console.log(startDate);
		// console.log(endDate);

		// if( this.props.isAdmin() === true){
		//     this.editSetting();
		// }
		// console.log(this.props.isAdmin())
		// console.log(this.state.code_review===false)
		// console.log("引入的分值");
	  //  console.log(this.state.CalculateMax);


		return (
			<div className=" clearfix " ref='targetElementTrainingjobsetting' style={{margin: "auto", minWidth: "1200px"}}>
				{this.state.showmodel === true ? <ShixunWorkModal
					{...this.props}
					visible={this.state.showmodel}
					modalname={"代码查重"}
					data={[]}
					issCancel={() => this.hideshowmodel()}
				/> : ""}

				{/*<DownloadMessage*/}
				{/*	{...this.props}*/}
				{/*	ref="DownloadMessage"*/}
				{/*/>*/}
				<DownloadMessageysl
					{...this.props}
					value={this.state.DownloadMessageval}
					modalCancel={this.Downloadcal}
					modalsType={this.state.DownloadType}

				/>
				{/*立即发布*/}
				<HomeworkModal
					modaltype={this.state.modaltype}
					modalname={this.state.modalname}
					visible={this.state.visible}
					Topval={this.state.Topval}
					Topvalright={this.state.Topvalright} F
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
				{this.state.OneSelftype === true ? <OneSelfOrderModal
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
				/> : ""}

				<Modals
					modalsType={modalsType}
					modalsTopval={modalsTopval}
					loadtype={loadtype}
					modalSave={modalSave}
				></Modals>

				<div className={"educontent"} id={"publishtimeid"}>
					{
						!flagPageEdit && this.props.isAdmin() === true ?
							""
							:
							<style>
								{
									`
                                  .yskspickers
                        .ant-input, .ant-input .ant-input-suffix{
                            background-color: #fff !important;
                        }
									     	`
								}
							</style>
					}

					<div className="edu-back-white" style={{paddingTop: "20px"}}>
						{/*发布设置*/}
						<div className="stud-class-set bor-bottom-greyE edu-back-white">
							<div className="  pl20">
								<p className=" clearfix " style={{height: "41px"}}>
									<span className="font-16 fl  " style={{color: "#05101A"}}>发布设置 <span className="ml15 color-grey-9"
																																											 style={{
																																												 fontSize: "14px",
																																												 textAlign: "left"
																																											 }}></span></span>
									{
										!flagPageEdit && this.props.isAdmin() === true ?
											<a className="fr white-btn edu-blueline-btn mr10 mr20 lineh-24" onClick={this.editSetting}>
												编辑设置
												{/*<Tooltip title="编辑"><i*/}
												{/*className="iconfont icon-bianjidaibeijing font-20 color-green pr20 "></i></Tooltip>*/}
											</a>
											: ""
									}
								</p>
								{
									group_settings && group_settings.length > 0 ?
										<div className=" clearfix edu-back-white poll_list mt10 mb20">
											<Checkbox className="ml15 font-16" style={{color: "#666666"}} onChange={this.onChange}
																checked={this.state.unifiedsetting}
																defaultChecked={this.state.boolUnite} disabled={!flagPageEdit}>统一设置<span
												className={"font-14 ml15  color-grey-c"}
												style={{textAlign: "left"}}>(选中则所有分班使用相同的发布设置，否则各个分班单独设置)</span></Checkbox>
										</div>
										: <div></div>
								}

								<style>
									{
										`.ant-select-selection{
                                           min-width:200px
                                        }`
									}
								</style>
								{
									unifiedsetting === undefined ? "" : unifiedsetting === true ?
										<div 	>
											<div className="clearfix mb5 ml15">
												<span className="font-16  fl mt3" style={{color: "#999999"}}>发布时间：</span>
												<Tooltip placement="bottom"
																 title={!flagPageEditstwo === true && publish_timebool === true ? this.props.isAdmin() ? "发布时间已过，则不能修改" : "" : ""}>
													<div className="fl yskspickers">
														<DatePicker
															showToday={false}
															id={"publishtimeid"}
															disabledTime={disabledDateTime}
															disabledDate={disabledDate}
															className={borreds}
															showTime={{format: 'HH:mm'}}
															format="YYYY-MM-DD HH:mm"
															value={publish_time && moment(publish_time, dataformat)}
															placeholder="请选择发布时间"
															locale={locale}
															showToday={false}
															width={"210px"}
															onOk={this.ontimeonok}
															onChange={this.onStartChange}
															// onOpenChange={this.handleStartOpenChange}
															disabled={!flagPageEditstwo}
															dropdownClassName="hideDisable"
														/>
													</div>
												</Tooltip>
												<span className="ml20 fl mt5 color-grey-c"
															style={{textAlign: "left", fontSize: "14px"}}>(学生收到作业的时间)</span>
											</div>
											<p className="color-red lineh-25 clearfix" style={{height: "25px"}}>
												{
													unit_p_tip && unit_p_tip != "" ?
														<span className="fl" style={{marginLeft: "94px"}}>{unit_p_tip}</span>
														: ""
												}
											</p>
											<div className="clearfix ml15 mb5">
												<span className=" fl mt3 font-16" style={{color: "#999999"}}>截止时间：</span>
												<Tooltip placement="bottom"
																 title={this.props.isSuperAdmin() ? "" : !flagPageEditsthrees === true && end_timebool === true ? this.props.isAdmin() ? "截止时间已过，则不能修改" : "" : ""}>
													<div className="fl yskspickers">
														<DatePicker
															showToday={false}
															id={"end_timeid"}
															disabledTime={disabledDateTime}
															disabledDate={disabledDate}
															showTime={{format: 'HH:mm'}}
															className={borredss}
															format="YYYY-MM-DD HH:mm"
															value={end_time && moment(end_time, dataformat)}
															onChange={this.onEndChange}
															// open={endOpen}
															placeholder="请选择截止时间"
															locale={locale}
															showToday={false}
															width={"210px"}
															onOk={this.ontimeonoktwo}
															// onOpenChange={this.handleEndOpenChange}
															disabled={!flagPageEditsthrees}
															dropdownClassName="hideDisable"
														/>
													</div>
												</Tooltip>

												<span className=" ml20 fl mt5 color-grey-c"
															style={{textAlign: "left", fontSize: "14px"}}>(学生“按时”提交作品的时间截点)</span>
											</div>
											<p className="color-red lineh-25 clearfix" style={{height: "25px"}}>
												{
													unit_e_tip && unit_e_tip != "" ?
														<span className="fl" style={{marginLeft: "94px"}}>{unit_e_tip}</span> : ""
												}
											</p>
										</div>
										:
										<div
											className="ml40"
										>
											<PollDetailTabForthRules
												{...this.props}
												{...this.state}
												ref={dom => {
													this.$pollDetailTabForthRules = dom;
												}}
												teacherdatapage={this.props.teacherdatapage}
												rules={rules}
												type={"Shixun"}
												moduleName={"作业"}
												course_group={rulest}
												flagPageEdit={flagPageEdit}
												rulesCheckInfo={(info) => this.rulesCheckInfo(info)}
											></PollDetailTabForthRules>
										</div>

								}
							</div>

						</div>
						{/*补交设置*/}
						<div className="stud-class-set bor-bottom-greyE edu-back-white">
							<div className=" clearfix edu-back-white poll_list mt10">
								<div className={"font-16 color-dark fl pl20 mt10 "} style={{color: "#05101A"}}>补交设置</div>
							</div>
							{/*value={this.state.allowreplenishment}*/}
							<div className="ml40 mt10"
							>
								<Checkbox style={radioStyle} value={"允许补交"} checked={this.state.allowreplenishment} className="font-16 "
													onChange={this.onChanges} disabled={!flagPageEdit}>开启补交 <span
									className={"font-14  ml10 color-grey-c"}
									style={{textAlign: "left", fontSize: "14px"}}>(选中，则允许学生延时提交作品)</span></Checkbox>

								<div className={"h21 mb30  mt20"}>
									<span className="font-16" style={{"width": "100px", color: "#999999"}}>迟交扣分：</span>
									<style>
										{
											`.ant-input-number{
                                                height: 40px
                                            }
                                            .ant-input-number-input{
                                              height: 40px
                                            }
                                            `
										}
									</style>
									<InputNumber disabled={!whethertopay} min={0} max={1000} className="mr10 h40 color-grey-9"
															 onChange={this.changeTopicName}
															 style={{color: "#999999", "height": "40px"}}
															 value={this.state.latededuction}/>
									<span className="ml10 color-grey-9 font-16">分</span>
									<span className="ml15 color-grey-c"
												style={{textAlign: "left", fontSize: "14px"}}>(延时提交作品时，学生成绩将被扣减的分值)</span>
									{/*{latepenaltytype===true?<div className={"color-red ml40"}></div>:""}*/}
								</div>
								{
									whethertopay && whethertopay === true ?
										<style>
											{
												`
                                        .yskspickerss
                                        .ant-input, .ant-input .ant-input-suffix{
                                            background-color: #fff !important;
                                        }
									     	                 `
											}
										</style>
										: ""
								}
								<div className={"h20 mb20 yskspickerss"}>
									<span className="font-16" style={{"width": "100px", color: "#999999"}}>结束时间：</span>
									<DatePicker
										showToday={false}
										id={"late_timeid"}
										disabledTime={disabledDateTime}
										disabledDate={disabledDate}
										format="YYYY-MM-DD HH:mm"
										value={late_time && moment(late_time, dataformat)}
										onChange={this.onEndChangeys}
										placeholder="请选择结束时间"
										showToday={false}
										locale={locale}
										onOk={this.ontimeonokthree}
										showTime={{format: 'HH:mm'}}
										width={"210px"}
										disabled={!whethertopay}
										dropdownClassName="hideDisable"
										className={handclass}
									/>
									<span className="ml15 color-grey-c"
												style={{textAlign: "left", fontSize: "14px"}}>(学生“延时”提交作品的时间截点)</span>
									{/*{latetimetype===true?<div className={"color-red "}>结束时间不能小于截止时间</div>:""}*/}
									<style>
										{
											`
                                            .ml70{
                                             margin-left:70px;
                                            }
                                            `
										}
									</style>
									<p className="color-red lineh-25 clearfix ml70" style={{height: "25px"}}>
										{
											this.state.hand__e_tip && this.state.hand__e_tip != "" ?
												<span className="fl">{this.state.hand__e_tip}</span> : ""
										}
									</p>
								</div>
								{/*<Radio style={radioStyle} value={"禁止补交"} disabled={!flagPageEdit}>禁止补交</Radio>*/}
							</div>
							<div className="h20 mb10 "></div>
						</div>
						{/*评分设置*/}
						<div className="stud-class-set  edu-back-white">
							<div className=" clearfix edu-back-white poll_list mt20">
								<div className={"font-16 color-dark fl pl20 "} style={{color: "#05101A"}}>评分设置</div>
							</div>
							<div className="yslflexhomesysl1">
								<div className="mt16" style={{marginLeft: "37px"}}>
                                 <span style={{
																	 color: "#666666",
																	 fontWeight: "bold",
																	 fontSize: "16px",
																 }}>总分值：</span>
									<InputNumber min={0} 	className={borredszf}
															 style={{width: "100px", color: "#999999"}}
															 disabled={!flagPageEdit}
															 id={"zongfentimeid"}
															 step={0.1}
															 onChange={(e)=>this.Totalscorecalculation(e)}
															 value={this.state.CalculateMax}
									/>
									<span className="ml10 font-16"
												style={{color: "#999999", height: "28px", marginTop: "9px", lineHeight: "28px"}}>分</span>
								</div>
								{
									borredszfl===false?
										<div >
											<span className="fl" style={{marginLeft: "101px", marginTop: "2px",color: "#FF0000"}}>{borredszfls}</span>
										</div>
										:
										<div className="myslHeight">

										</div>
								}

								<div  style={{marginLeft: "82px"}}>
									<span className="c_grey font-16" style={{color: "#333333"}}> 关卡任务的选择和分值设置 </span><span
									className="ml15 font-14" style={{textAlign: "left", color: "#FF8204"}}>(总分值 = 效率分+ 关卡任务总分)</span>
								</div>
								<div className="yslflexhome">
									<div >
										<div className="yslflexhomes mt9" style={{width: "1000px", lineHeight: "35px", marginLeft: "114px"}}>
											<div className=" clearfix edu-back-white poll_list mt10">
												<Checkbox disabled={!flagPageEdit} className=" font-16 mt10"
																	onChange={this.onChangeeffectiveness}
																	checked={this.state.work_efficiencys} style={{color: "#666666"}}>效率分<span
													className={"font-13 color-grey-c ml15"}
													style={{textAlign: "left"}}>(选中，则学生最终成绩包含效率分。效率分在作业截止或者补交结束后由系统自动生成)</span>
												</Checkbox>
												<div>

												</div>

											</div>
											<div>
												<div className="yslflexhomes  invite-tipysl" style={{width: "399px"}}>
													<span className="to-back-left"></span>
													<div className="padding20 invitecontent clearfix" style={{backgroundColor: " #FAFAFA"}}>
														<p className="font-12 edu-txt-left">
															（学生工作效率= log(实训总得分/实训总耗时)<br/>
															（学生效率分 = 学生工作效率 / 课堂学生最高工作效率 * 分值）<br/>
														</p>
													</div>
												</div>
											</div>
										</div>
										<div style={{marginLeft: "138px"}}>
											<span className="c_grey mr10 font-16" style={{color: "#999999"}}>分值</span>
											<InputNumber min={0} disabled={!this.state.completionefficiencyscore}
																	 className="ml10 h40 mr10  color-grey-9"
																	 style={{width: "100px", color: "#999999"}}
																	 onChange={this.changeTopicNametwo}
																	 step={0.1}
																	 value={this.state.latedeductiontwo}/>
											<span className="ml10 font-16" style={{color: "#999999"}}>分</span>
											<span className={"font-14 color-grey-9 "} style={{color: "#999999"}}></span>
										</div>
									</div>

								</div>
							</div>
							<div className="yslflexhome">
								<div>
									<div className="ml20 mt40  mt20" style={{marginLeft: "114px"}}>
										<span className="c_grey font-16" style={{color: "#333333"}}> 关卡任务分值设置规则 </span> <span>  <RadioGroup
										className="ml50" onChange={this.onChangeslevelproportion} value={this.state.proportion}>
                                <Radio style={{
																	display: 'block',
																	height: '30px',
																	lineHeight: '30px',
																	color: "#666666",
																}} disabled={!flagPageEdit} className="c_grey mt20 font-14"
																			 value={"均分比例"} style={{color: "#666666"}}>均分比例</Radio>
                                <Radio style={{
																	display: 'block',
																	height: '30px',
																	lineHeight: '30px',
																	color: "#666666",
																}} disabled={!flagPageEdit} className="c_grey ml30 font-14"
																			 value={"经验值比例"} style={{color: "#666666"}}>难易度</Radio>
                                <Radio style={{
																	display: 'block',
																	height: '30px',
																	lineHeight: '30px',
																	color: "#666666",
																}} disabled={!flagPageEdit} className="c_grey mt20 ml30 font-14"
																			 value={"自定义分值"} style={{color: "#666666"}}>自定义分值
																	{testscripttiptype === true ?
																		<div className="invite-tipysls clearfix  " id="test_script_tip"
																				 style={{left: '158px', width: '322px', zIndex: '10'}}>
																			<span className="right-black-trangles"></span>
																			<div className="padding20 invitecontent clearfix">
																				<p className="font-12 edu-txt-left">
																					若完成效率分值 = 10分, 则<br/>
																					均分比例: 根据任务数平均分配<br/>
																					例: 实训任务3关, 每关分值: 1/3*(100-10)=30分<br/>
																					<br/>
																					难易度: 根据关卡经验值的高低确定关卡分值<br/>
																					例: 实训总经验值1200, 某关经验值200,<br/>
																					则其分值:200/1200*(100-10)=15分<br/>
																					<br/>
																					自定义分值: 手动设置关卡分值<br/>
																				</p>
																			</div>
																			<p className="inviteTipbtn with100 fl">
																				<a onClick={() => this.testscripttip(1)}>知道了</a>
																			</p>
																		</div>
																		: ""}
                                </Radio>
                            </RadioGroup>
                             <a onClick={() => this.testscripttip(0)}><img
															 style={{marginBottom: "3px", marginLeft: "20px"}}
															 src={getImageUrl("images/educoder/problem.png")}/></a>
                            </span>
									</div>
									<p className="ml20 mt15 c_grey font-16 " style={{color: "#666666", marginLeft: "145px"}}> 关卡名称<span
										className="color-orange-tips font-14 ml10"
										style={{color: "#FF8204"}}>{task_pass === false ? "(请选中需要学生完成的关卡，该实训不支持跳关学习)" : "(请选中需要学生完成的关卡，该实训支持跳关学习)"}</span>
									</p>
									<div className=" mt15" style={{marginLeft: "165px"}}>
										{this.state.challenge_settings === undefined ? "" : this.state.challenge_settings.map((object, index) => {
											return (
												<li className="yslflexhomes" key={index}>
													<Checkbox className="ml110  font-16 maxnamewidth340"
																		disabled={!flagPageEditsbox}
																		style={{"width": "340px", color: "#05101A", lineHeight: "48px"}}
																		checked={object.checked}
																		onChange={(value) => this.onChangedatasheet(value, index)}
													><a title={object.challenge_name} >{object.challenge_name}</a></Checkbox>
													{
														object.checked === false ?
															<div style={{lineHeight: "48px", width: "60px"}}>
																<div className="font-12" style={{
																	height: "20px",
																	background: "#FF8204",
																	color: "#FFFFFF",
																	lineHeight: "21px",
																	borderRadius: "10px",
																	width: "60px",
																	textAlign: "center",
																	marginTop: "14px",
																	marginLeft: "5px "
																}}>可不做
																</div>
															</div>
															:
															<div style={{lineHeight: "48px", width: "60px"}}></div>
													}
													<InputNumber disabled={!flagPageEdits} className=" c_grey" min={0}
																			 style={{"width": "100px", "margin-left": "20px ", color: "#666666"}}
																			 onChange={(value) => this.hangeTopicNametwodatasheet(value, index)}
																			 step={0.1}
																			 value={object.challenge_score}
													/>

													<span className="ml10 font-16" style={{
														color: "#999999",
														height: "28px",
														marginTop: "9px",
														lineHeight: "28px"
													}}>分</span>
													<span className="ml60 font-14" style={{
														width: "50px",
														color: "#FFFFFF",
														height: "28px",
														marginTop: "9px",
														lineHeight: "28px",
														background: "#50DBAD",
														textAlign: "center",
														borderRadius: "5px"
													}}>{object.difficulty}</span>
													<span className="ml10 font-16" style={{
														color: "#666666",
														height: "21px",
														marginTop: "12px",
														lineHeight: "21px",
														textAlign: "center"
													}}>金币奖励数：{object.challenge_exp}</span>
												</li>
											)
										})}

									</div>
								</div>

							</div>
							<p className="ml20 mt40 c_grey font-16 "
								 style={{color: "#333333", marginLeft: "82px"}}> 查看参考答案才通过评测的关卡扣分规则<span
								className=" font-14 color-grey-c ml15"
								style={{textAlign: "left", marginLeft: "40px"}}>(学生通过评测后再查看参考答案，不对成绩产生影响)</span></p>

							<RadioGroup className="mt20" style={{marginLeft: "114px"}} onChange={this.onChangeslevel}
													value={this.state.level}>
								<Radio style={radioStyle} disabled={!flagPageEdit} className="c_grey font-16"
											 value={"扣分"}>按查看答案级别扣分<span
									className="color-grey-c font-14 ml15"
									style={{textAlign: "left"}}>(根据学员选择查看的实训答案级别(解题思路、完整答案)，扣减相应的分值)</span></Radio>
								<Radio style={radioStyle} disabled={!flagPageEdit} className="c_grey mt15 font-16"
											 value={"满分"}>不扣分 </Radio>
							</RadioGroup>
						</div>
						{/*公开设置*/}
						<div className="stud-class-set  bor-top-greyE edu-back-white mt35  pb5 ">
							<div className=" clearfix edu-back-white poll_list mt20">
								<div className={"font-16 color-dark fl pl20 "} style={{color: "#05101A"}}>公开设置</div>
							</div>
							<div className={"mb20 mt15"}>
								<Checkbox disabled={!flagPageEdit} className="ml40 font-16" onChange={this.onChangepublicwork}
													checked={this.state.publicwork} style={{color: "#666666"}}>公开成绩</Checkbox>
								<span className="font-14 color-grey-c font-14 "
											style={{textAlign: "left"}}>(选中，则在作业截止/补交结束时间之后，已提交作品的学生可以查看其它学生的成绩，否则只能查看自己的成绩)</span>
							</div>

						</div>

					</div>


					{
						flagPageEdit && this.props.isAdmin() === true ?
							<div style={this.props.isNotMember() === true ? mystyles : mystyle}
									 className="clearfix mt30 mb30">
								<Button type="primary" htmlType="submit" className="defalutSubmitbtn fl mr20"
												onClick={() => this.pustdate()}>
									提交
								</Button>
								{/*<a className="defalutSubmitbtn fl mr20">提交</a>*/}
								<a className="defalutCancelbtn fl" onClick={() => this.cancelEdit()}>取消</a>
							</div>
							: ""
					}

				</div>

			</div>

		)
	}
}

export default Trainingjobsetting;
// <div className="stud-class-set bor-bottom-greyE ">
//     <div className=" clearfix edu-back-white poll_list">
//         <a onClick={(e)=>this.ChangeTab(0)}>作品列表</a>
//         <a onClick={(e)=>this.ChangeTab(1)}>作业问答</a>
//         {this.props.isAdmin()?this.state.code_review===true||jobsettingsdata === undefined ? [""] : jobsettingsdata.data.homework_status[0]==="未发布"?"": <a onClick={(e)=>this.ChangeTab(2)}>代码查重</a> : ""}
//         <style>{
//             `
//                                     .poll_list a.active:after {
//                                         content: '';
//                                         width: 57px;
//                                         left: 10px;
//                                         bottom: 0px;
//                                         height: 2px;
//                                         background-color: #4CACFF;
//                                         position: absolute;
//                                         }
//                                     `
//         }</style>
//         <a className="active"
//            onClick={(e)=>this.ChangeTab(3)}
//         >设置</a>
//         <style>{`
//                         .drop_down_menu li a {
//                             padding: 0px;
//                             font-size: 14px;
//                         }
//                         .drop_down_menu {
//                             width: 93px;
//                         }
//                         .drop_down_menu li {
//                             overflow: visible;
//                             width: 93px;
//                         }
//                         .drop_down_menu, .drop_down_normal {
//                             padding-top: 10px;
//                             padding-bottom: 8px;
//                         }
//                         a:hover {
//                         color:#1A0B00 !important;
//                         }
//                         `}</style>
//         {this.props.isAdmin() ? <li className="li_line drop_down fr color-blue font-16 mr8 mt20" style={{"padding": "0 20px"}}>
//             导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
//             <ul className="drop_down_menu" style={{"right": "-0px", "left": "unset", "height": "auto"}}>
//                 <li><a onClick={()=>this.confirmysl(`/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}`)}>实训报告</a>
//                 </li>
//                 <li><a onClick={()=>this.confirmysl(`/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx`)}>学生成绩</a>
//                 </li>
//             </ul>
//         </li>: ""}
//         {this.props.isAdmin() ?jobsettingsdata&&jobsettingsdata.data.end_immediately===true?
//           <a className="fr color-blue font-16" onClick={this.homeworkends}>立即截止</a>
//           :  "": ""}
//         {this.props.isAdmin() ?jobsettingsdata&&jobsettingsdata.data.publish_immediately===true?
//           <a className="fr color-blue font-16" onClick={this.homeworkstart}>立即发布</a>: "" : ""}
//         {this.props.isAdmin()?
//           jobsettingsdata&&jobsettingsdata.data.code_review===true?
//             <a className="fr color-blue font-16"  onClick={this.workshowmodel}>代码查重</a>: "":""}
//         {
//             jobsettingsdata&&	jobsettingsdata&&jobsettingsdata.data === undefined ? ""
//               : 	jobsettingsdata&&	jobsettingsdata.data.commit_des === null || 	jobsettingsdata&&	jobsettingsdata.data.commit_des === undefined ? "" :
//               <a className="fr color-blue font-16"
//                  href={`/courses/${this.state.props.match.params.coursesId}/${this.state.shixuntypes}/${	jobsettingsdata&&	jobsettingsdata.data === undefined ? "" :	jobsettingsdata&&	 jobsettingsdata.data.id}/commitsummary/${this.state.props.match.params.homeworkid}`}>{	jobsettingsdata&&	jobsettingsdata.data.commit_des}</a>
//         }
//         {    jobsettingsdata&&jobsettingsdata.data === undefined ? "" : <Startshixuntask
//           {...this.props}
//           data={	jobsettingsdata&&	jobsettingsdata.data}
//         />}
{/*    </div>*/
}
{/*</div>*/
}
