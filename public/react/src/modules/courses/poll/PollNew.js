import React, {Component} from "react";
import {Form, Input, Tooltip, Checkbox, Radio, Select, message, Modal, Button} from 'antd'
import {WordsBtn, ActionBtn} from 'educoder'

import {Link} from 'react-router-dom'

import '../css/members.css'
import "../common/formCommon.css"

import './pollStyle.css'
import '../css/Courses.css'
import axios from 'axios'
import moment from "../new/CoursesNew";
import Modals from "../../modals/Modals";

const TextArea = Input.TextArea
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const Option = Select.Option;
const maps = {1: "未发布", 2: "提交中", 3: "已截止"}
const confirm = Modal.confirm;
const $ = window.$;
class PollNew extends Component {
	// 问卷新建和编辑
	//
	// * addonAfter  字数限制
	// * q_counts  题目总数
	// * mysingles 单选题数量
	// * mydoubles 多选题数量
	// * mymainsint  主观题数量
	// * adddom     添加编辑的数据   页面点击新增题目
	// * editentry  编辑条目       新增的题目点击到条目中
	//* questionnair  问卷是否存在 默认不存在
	// *

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			poll_questions: [],
			user_permission: "",
			addonAfter: 0,
			addonAftertwo: 100,
			mysingles: 0,
			mydoubles: 0,
			mymainsint: 0,
			adddom: [],
			editentry: [],
			questionnair: false,
			polls_name: undefined,
			polls_nametest: "",
			polls_description: "",
			polls_descriptiontest: "",
			storagedesc:"",
			storagedesctwo:"",
			coursesId: "",
			pollid: undefined,
			polls_status: undefined,
			q_countst: 0,
			Newedit: true,
			Insertposition: undefined,
			Modalstype: false,
			mysave: false,
			readOnlys: "readOnly",
			problemtopic: null,
			problemtopicbool: false,
			newoption: false,
			cancellation: false,
			bindingid:undefined,
			Newdisplay:false,
			first_category_url:"",
			left_banner_id:"",
			publishtimeid_int:0,
			boolneweied:undefined,
		}
		// console.log("试卷新建和编辑");
		// console.log(JSON.stringify(props));

	}

	changeTopicName = (e) => {
		// console.log("调用了changeTopicName");
		let num = parseInt(e.target.value.length);
		if(num>60){
			 return;
		}
		this.setState({
			addonAfter: num < 0 ? 0 : num
		});
		this.setState({
			polls_nametest: e.target.value
		})
	}


	changeTopicNametwo = (e) => {
		// console.log("获取的值" + e.target.value);
		let num = 100 - parseInt(e.target.value.length);
		this.setState({
			addonAftertwo: num < 0 ? 0 : num
		})
		this.setState({
			polls_descriptiontest: e.target.value
		})
	}

	// 初始化数据
	componentDidMount = () => {
		// console.log("componentDidMount 50")
		if(	this.props.isStudent() === true){

			 this.props.history.push("/403")

			return
		}
		if (this.props.match.params.news !== undefined) {
			if (this.props.match.params.news === "new") {
				this.state.Newedit === true;
				this.setState({
					Newedit: true,
					mysave: true,
					readOnlys: "",
					cancellation: true,
				})
			} else {
				this.Initializatio_data();
				this.state.Newedit === false;
				this.setState({
					Newedit: false,
					mysave: false,
					readOnlys: "readOnly",
				})
			}
		}

		console.log("问卷返回");
		console.log(this.props);
		try {
			if(this.props.current_user!==undefined){
				this.setState({
					first_category_url :this.props.current_user.first_category_url,
				});
				console.log("=======================");
				console.log(this.props.current_user.first_category_url);
			}
		}catch (e) {
			console.log("12312312312")
			console.log(e);
		}

	};
	componentDidUpdate = (prevProps) => {
		// console.log("componentDidUpdate");
		// console.log(prevProps);
		// console.log(this.props);
		if(prevProps.current_user!=this.props.current_user){
			if(this.props.current_user!==undefined){
				// console.log(this.props.current_user.login);
				// console.log(prevProps.current_user.login);
				this.setState({
					first_category_url :this.props.current_user.first_category_url,
				})
			}
		}
	}

	//获取权限
	// getPollInfo(){
	//     // console.log(this.props.match);
	//     let pollId=this.props.match.params.pollId;
	//     let url=`/polls/${pollId}/common_header.json`
	//     axios.get(url).then((result)=>{
	//         if(result.status==200){
	//             this.setState({
	//                 pollDetail:result.data,
	//                 user_permission:result.data.user_permission
	//             })
	//         }
	//     }).catch((error)=>{
	//         console.log(error);
	//     })
	// }
	//初始化请求网络
	Initializatio_data = () => {
		console.log("Initializatio_data 582")
		//课堂id
		let coursesId = this.props.match.params.coursesId;
		//时间id
		let pollid = this.props.match.params.pollid;
		console.log(pollid);
		// let coursesId = 557;
		if (pollid === undefined) {
			// console.log("没有问卷新建问卷~~~")
			// let coursesId=this.props.match.params.coursesId;
			// // to={`/courses/${coursesId}/polls/new`}
			//
			// const urll = `/courses/${coursesId}/polls/new.json`
			// axios.get(urll).then((result) => {
			//     if (result.status === 200) {
			//         console.log(urll)
			//         console.log("问卷新建成功")
			//         console.log(JSON.stringify(result))
			//         // var path=`/courses/${coursesId}/polls/new`;
			//         //
			//         // this.props.history.push({ pathname: path, state: { } });
			//     }
			// }).catch((error) => {
			//     console.log(error)
			// })

			// const urlls = `/courses/${coursesId}/polls.json`
			// axios.post(urlls,{
			//     polls_name: "这是标题",
			//     polls_description:"这是标题须知"
			// }).then((result)=>{
			//     console.log("创建问卷++++++")
			//     console.log(result)
			//    try {
			//        if(result.data.status===0){
			//            console.log("创建问卷")
			//            console.log(JSON.stringify(result.data))
			//        }
			//    }catch (e) {
			//
			//    }
			//
			// })
			//没有问卷
			this.setState({
				projects: [],
				polls_name: "",
				polls_description: "",
				poll_questions: [],
				question_types: [],
				pollid: undefined,
				mysingles: 0,
				mydoubles: 0,
				mymainsint: 0,
				polls_nametest: "",
				polls_descriptiontest: "",
				coursesId: 0,
				questionnair: false
			})
		} else {
			const url = `/polls/${pollid}/edit.json`;
			axios.get(url).then((result) => {
				if (result !== undefined)

				// console.log("有问卷~~~")
				// if (result.status === 200) {
				// console.log(JSON.stringify(result.data))
					this.props.form.setFieldsValue({
						polls_nametest: result.data.poll.polls_name,
						polls_descriptiontest: result.data.poll.polls_description,
					});

				if(result.data){
					if(result.data.poll){
						if(result.data.poll.polls_name){
							let num =  parseInt(result.data.poll.polls_name.length);
							this.setState({
								addonAfter: num < 0 ? 0 : num
							})
						}
					}

				}

				this.setState({
					projects: result.data,
					pollid: pollid,
					polls_status: result.data.poll.polls_status,
					polls_name: result.data.poll.polls_name,
					polls_description: result.data.poll.polls_description,
					poll_questions: result.data.poll_questions,
					question_types: result.data.question_types,
					mysingles: result.data.question_types.q_singles,
					mydoubles: result.data.question_types.q_doubles,
					mymainsint: result.data.question_types.q_mains,
					polls_nametest: result.data.poll.polls_name,
					polls_descriptiontest: result.data.poll.polls_description,
					questionnair: true,
					left_banner_id:result.data.left_banner_id
				})
				if( result.data.poll.polls_name){
					if( result.data.poll.polls_name.length>0){
						this.setState({
							addonAfter: result.data.poll.polls_name.length,
						})
					}
				}
			}).catch((error) => {
				console.log(error)
			})
		}

	}

	//重新获取数据
	thisinitializationdatanew = () => {
		var pollidsy = null;
		if (this.state.pollid !== undefined) {
			pollidsy = this.state.pollid;
			if (pollidsy === null || pollidsy === undefined) {
				pollidsy = this.props.match.params.pollid;
			}
		}

		if (pollidsy === null || pollidsy === undefined) {
			return
		}

		const url = `/polls/${pollidsy}/edit.json`;
		axios.get(url).then((result) => {
			if (result !== undefined)

			// console.log("有问卷~~~")
			// if (result.status === 200) {
			// console.log(JSON.stringify(result.data))
				this.setState({
					projects: result.data,
					pollid: pollidsy,
					polls_status: result.data.poll.polls_status,
					polls_name: result.data.poll.polls_name,
					polls_description: result.data.poll.polls_description,
					poll_questions: result.data.poll_questions,
					question_types: result.data.question_types,
					mysingles: result.data.question_types.q_singles,
					mydoubles: result.data.question_types.q_doubles,
					mymainsint: result.data.question_types.q_mains,
					polls_nametest: result.data.poll.polls_name,
					polls_descriptiontest: result.data.poll.polls_description,
					questionnair: true,
				})
			if( result.data.poll.polls_name){
				if( result.data.poll.polls_name.length>0){
					this.setState({
						addonAfter: result.data.poll.polls_name.length,
					})
				}
			}
		}).catch((error) => {
			console.log(error)
		})
	}
	//新建问卷
	newword = () => {
		if (this.state.polls_nametest === undefined || this.state.polls_nametest === "") {
			this.props.showNotification(`请输入标题`);
			return
		}
		let coursesId = this.props.match.params.coursesId;
		const urlls = `/courses/${coursesId}/polls.json`
		axios.post(urlls, {
			polls_name: this.state.polls_nametest,
			polls_description: this.state.polls_descriptiontest
		}).then((result) => {
			if (result.data.status === 0) {
				this.state.Newedit === false;
				// this.props.showNotification(`试卷创建成功`);
				this.setState({
					pollid: result.data.data.id,
					Newedit: false,
				})
				this.props.history.push(`/courses/${this.props.match.params.coursesId}/polls/${result.data.data.id}/detail?tab=2`)
			}
		})
	}
	//添加单选题目
	addmysingles = () => {
		if (this.state.q_countst > 0) {
			this.scrollToAnchor("publishtimeid"+this.state.publishtimeid_int);
			this.props.showNotification(`不能同时编辑两题`);

			return;
		}
		if (this.state.newoption === true) {
			this.setState({
				newoption: false
			})
		}
     this.setState({
			 Newdisplay:true,
			 boolneweied:true,
		 })
		var Insertposition = this.state.poll_questions.length;
		// console.log(JSON.stringify(this.state.poll_questions));
		for (var i = 0; i < this.state.poll_questions.length; i++) {
			if (this.state.poll_questions[i].question.question_type === 1) {
				Insertposition = i;
			}

		}
		this.addMytopic(1, this.state.pollid, Insertposition, false, 0,0);
		this.scrollToAnchor("publishtimeids");
	}

	//添加多选题目
	addmydoubles = () => {
		if (this.state.q_countst > 0) {
			this.scrollToAnchor("publishtimeid"+this.state.publishtimeid_int);
			this.props.showNotification(`不能同时编辑两题`);

			return;
		}
		// console.log("addmymainsint 70")
		if (this.state.newoption === true) {
			this.setState({
				newoption: false
			})
		}
		this.setState({
			Newdisplay:true,
			boolneweied:true,
		})
		var Insertposition = this.state.poll_questions.length;
		// console.log(JSON.stringify(this.state.poll_questions));
		for (var i = 0; i < this.state.poll_questions.length; i++) {
			if (this.state.poll_questions[i].question.question_type === 2) {
				Insertposition = i;
			}


		}
		this.addMytopic(2, this.state.pollid, Insertposition, false, 0,0);
		this.scrollToAnchor("publishtimeids");
	}

	//添加主观题目
	addmymainsint = () => {
		if (this.state.q_countst > 0) {
			this.scrollToAnchor("publishtimeid"+this.state.publishtimeid_int);
			this.props.showNotification(`不能同时编辑两题`);
			return;
		}
		this.setState({
			Newdisplay:true,
			boolneweied:true,
		})
		var Insertposition = this.state.poll_questions.length;
		// console.log(JSON.stringify(this.state.poll_questions));
		for (var i = 0; i < this.state.poll_questions.length; i++) {
			if (this.state.poll_questions[i].question.question_type === 3) {
				Insertposition = i;
			}


		}

		this.addMytopic(3, this.state.pollid, Insertposition, false, 0,0);
		this.scrollToAnchor("publishtimeids");
	}

	//编辑方法
	adddomedit = (object,indexysl) => {
		// console.log("adddomedit 76");
		if (this.state.q_countst > 0) {
			if(this.state.boolneweied !== undefined){
				if(this.state.boolneweied===true){
					this.scrollToAnchor("publishtimeids");
				}else{
					this.scrollToAnchor("publishtimeid"+this.state.publishtimeid_int);
				}
			}else{
				this.scrollToAnchor("publishtimeids");
			}
			this.props.showNotification(`不能同时编辑两题`);
			return;
		}
		var anserbool = false;
		this.setState({
			q_countst: 1,
			bindingid:object.question.id,
			publishtimeid_int:indexysl,
			boolneweied:false,
		})
		// window.scrollTo(0, this.refs.targetElement.offsetTops)
		let {adddom} = this.state;
		// var arr =new Object(objects);
		// console.log(arr)
		// adddom.push(arr);
		var question = {};
		var Insertposition = this.state.poll_questions.length;
		if (object.question.question_type === 1) {
			var answers = [];
			var questiontwo = {};
			///////////////////////////daying
			for (var y = 0; y < object.question.answers.length; y++) {
				var answerstwo;
				if (object.question.answers[y].answer_text === "其他") {
					answerstwo = {
						"answer_id": object.question.answers[y].answer_id,
						"answer_position": object.question.answers[y].answer_position,
						"answer_text": object.question.answers[y].answer_text
					}
					anserbool = true;
				} else {
					answerstwo = {
						"answer_id": object.question.answers[y].answer_id,
						"answer_position": object.question.answers[y].answer_position,
						"answer_text": object.question.answers[y].answer_text
					}
				}
				answers.push(answerstwo);


			}
			// 插入单选题
			questiontwo = {
				// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
				"id": object.question.id,
				"is_necessary": object.question.is_necessary,
				"question_number": 1,
				"question_title": object.question.question_title,
				"question_type": 1,
				"new": "",
				"answers": answers
			};
			question = {"question": questiontwo};
			adddom.push(question);
			for (var i = 0; i < this.state.poll_questions.length; i++) {
				if (this.state.poll_questions[i].question.question_type === 1) {
					Insertposition = i;
				}
			}
		} else if (object.question.question_type === 2) {
			//插入多选题
			var answers = [];
			var questiontwo = {};

			for (var y = 0; y < object.question.answers.length; y++) {
				if (object.question.answers[y].answer_text === "其他") {
					answerstwo = {
						"answer_id": object.question.answers[y].answer_id,
						"answer_position": object.question.answers[y].answer_position,
						"answer_text": object.question.answers[y].answer_text
					}
					anserbool = true;
				} else {
					answerstwo = {
						"answer_id": object.question.answers[y].answer_id,
						"answer_position": object.question.answers[y].answer_position,
						"answer_text": object.question.answers[y].answer_text
					}
				}
				answers.push(answerstwo);
			}
			questiontwo = {
				"id": object.question.id,
				"is_necessary": object.question.is_necessary,
				"question_number": 2,
				"question_title": object.question.question_title,
				"question_type": 2,
				"max_choices": object.question.max_choices,
				"min_choices": object.question.min_choices,
				"new": "",
				"answers": answers
			};
			question = {"question": questiontwo};
			adddom.push(question);
			for (var i = 0; i < this.state.poll_questions.length; i++) {
				if (this.state.poll_questions[i].question.question_type === 2) {
					Insertposition = i;
				}
			}
		} else if (object.question.question_type === 3) {
			//插入主观题
			var answers = [];
			var questiontwo = {};

			if (object.question.answers.length > 0) {
				for (var y = 0; y < object.question.answers.length; y++) {
					var answerstwo;
					if (object.question.answers[y].answer_text === "其他") {
						answerstwo = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
					} else {
						answerstwo = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
					}
					answers.push(answerstwo);
				}
			}
			questiontwo = {
				"id": object.question.id,
				"is_necessary": object.question.is_necessary,
				"question_number": 3,
				"question_title": object.question.question_title,
				"question_type": 3,
				"new": "",
				"answers": answers
			};
			question = {"question": questiontwo};
			adddom.push(question);
			for (var i = 0; i < this.state.poll_questions.length; i++) {
				if (this.state.poll_questions[i].question.question_type === 3) {
					Insertposition = i;
				}
			}
		}
		this.setState({
			adddom: adddom,
			newoption: anserbool,
			Insertposition: Insertposition
		})

	}
	//滚动
	scrollToAnchor=(index)=>{
		// let name="Anchor_"+index;
		console.log("scrollToAnchor");
		console.log(index);
		try {
			if (index) {
				let anchorElement = document.getElementById(index);
				// if(anchorElement) { anchorElement.scrollIntoView(); }
				$("html").animate({scrollTop: $(anchorElement).offset().top - 150})
			}
		} catch (e) {

		}

	}
	//新增添加题目 有new
	addMytopic = (index, pollid, Insertposition, Whether, id,inty) => {
		//Whether 是否插入
		// console.log("addMytopic 90")
		// console.log(index)
		// console.log(pollid)
		// console.log(Insertposition)
		// console.log(Whether)
		// console.log("addMytopic");
		// console.log(id);
		if (this.state.q_countst > 0) {
			if(Whether===true){
				if(this.state.boolneweied !== undefined){
					if(this.state.boolneweied===true){
						this.scrollToAnchor("publishtimeids");
					}else{
						this.scrollToAnchor("publishtimeid"+this.state.publishtimeid_int);
					}
				}else{
					this.scrollToAnchor("publishtimeids");
				}
			}
			this.props.showNotification(`不能同时编辑两题`);
			return;
		}
		if(Whether===true){
			this.setState({
				publishtimeid_int:inty,
			})
		}
		this.state.Insertposition = Insertposition;
		var Whethername = null;
		if (Whether === true) {
			Whethername = id;
		}
		this.setState({
			Insertposition: Insertposition,
			q_countst: 1,
			boolneweied:false,
		})
		// window.scrollTo(0, this.refs.targetElement.offsetTop)
		var arrr = this.state.adddom;
		let newarrr = [...arrr];

		var arr = this.state.poll_questions;
		let newarr = [...arr];

		if (newarr.length > 0) {
			if (index === 1) {
				// 插入单选题
				// console.log(this.state.poll_questions[newarr.length - 1].question.id);
				var question = {}
				var questiontwo = {
					// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
					"id": Whether=== true? id :this.state.poll_questions[newarr.length - 1].question.id,
					"is_necessary": 1,
					"question_number": 1,
					"question_title": "",
					"question_type": 1,
					"new": "new",
					"newid":Whether=== true? id :this.state.poll_questions[newarr.length - 1].question.id + 1,
					"answers": [
						{"answer_id": 1, "answer_position": 1, "answer_text": ""},
						{"answer_id": 2, "answer_position": 2, "answer_text": ""},
						{"answer_id": 3, "answer_position": 3, "answer_text": ""},
						{"answer_id": 4, "answer_position": 4, "answer_text": ""},
						// {"answer_id": 5, "answer_position": 5, "answer_text": "其他"},
					]
				};
				question = {"question": questiontwo};
				newarrr.push(question);

				this.setState({
					adddom: newarrr,
					problemtopic: Whethername,
					problemtopicbool: Whether,
				})

			} else if (index === 2) {
				//插入多选题
				var question = {}
				var questiontwo = {
					"id": Whether=== true? id :this.state.poll_questions[newarr.length - 1].question.id,
					"is_necessary": 1,
					"question_number": 2,
					"question_title": "",
					"question_type": 2,
					"max_choices": 0,
					"min_choices": 0,
					"new": "new",
					"newid":Whether=== true? id :this.state.poll_questions[newarr.length - 1].question.id + 1,
					"answers": [
						{"answer_id": 1, "answer_position": 1, "answer_text": ""},
						{"answer_id": 2, "answer_position": 2, "answer_text": ""},
						{"answer_id": 3, "answer_position": 3, "answer_text": ""},
						{"answer_id": 4, "answer_position": 4, "answer_text": ""},
						// {"answer_id": 5, "answer_position": 5, "answer_text": "其他"},
					]
				};
				question = {"question": questiontwo};
				newarrr.push(question);

				this.setState({
					adddom: newarrr,
					problemtopic: Whethername,
					problemtopicbool: Whether,
				})

			} else if (index === 3) {
				//插入主观题
				// console.log(this.state.poll_questions[newarr.length - 1].question.id);
				var question = {}
				var questiontwo = {
					"id": Whether=== true? id :this.state.poll_questions[newarr.length - 1].question.id,
					"is_necessary": 1,
					"question_number": 3,
					"question_title": "",
					"question_type": 3,
					"new": "new",
					"newid":Whether=== true? id :this.state.poll_questions[newarr.length - 1].question.id + 1,
					"answers": []
				};
				question = {"question": questiontwo};
				newarrr.push(question);
				this.setState({
					adddom: newarrr,
					problemtopic: Whethername,
					problemtopicbool: Whether,
				})

			}
		} else {
			/////上面视图全部删除后  要加载的
			if (index === 1) {
				// 插入单选题
				var ids;
				try {
					ids = this.state.poll_questions[newarr.length - 1].question.id;
				} catch (e) {
					ids= 1;
				}
				var questiontwo = {
					// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
					"id": Whether=== true? id :ids,
					"is_necessary": 1,
					"question_number": 1,
					"question_title": "",
					"question_type": 1,
					"new": "new",
					"newid":Whether=== true? id :ids+ 1,
					"answers": [
						{"answer_id": 1, "answer_position": 1, "answer_text": ""},
						{"answer_id": 2, "answer_position": 2, "answer_text": ""},
						{"answer_id": 3, "answer_position": 3, "answer_text": ""},
						{"answer_id": 4, "answer_position": 4, "answer_text": ""},
						// {"answer_id": 5, "answer_position": 5, "answer_text": "其他"},
					]
				};
				question = {"question": questiontwo};
				newarrr.push(question);

				this.setState({
					adddom: newarrr,
					problemtopic: Whethername,
					problemtopicbool: Whether,
				})

			} else if (index === 2) {
				//插入多选题
				var ids;
				try {
					ids = this.state.poll_questions[newarr.length - 1].question.id;
				} catch (e) {
					ids = 1;
				}
				var questiontwo = {
					"id": Whether=== true? id :ids,
					"is_necessary": 1,
					"question_number": 2,
					"question_title": "",
					"question_type": 2,
					"max_choices": 0,
					"min_choices": 0,
					"new": "new",
					"newid":Whether=== true? id :ids+1,
					"answers": [
						{"answer_id": 1, "answer_position": 1, "answer_text": ""},
						{"answer_id": 2, "answer_position": 2, "answer_text": ""},
						{"answer_id": 3, "answer_position": 3, "answer_text": ""},
						{"answer_id": 4, "answer_position": 4, "answer_text": ""},
						// {"answer_id": 5, "answer_position": 5, "answer_text": "其他"},
					]
				};
				question = {"question": questiontwo};
				newarrr.push(question);

				this.setState({
					adddom: newarrr,
					problemtopic: Whethername,
					problemtopicbool: Whether,
				})

			} else if (index === 3) {
				//插入主观题
				var ids;
				try {
					ids= this.state.poll_questions[newarr.length - 1].question.id;
				} catch (e) {
					ids = 1;
				}
				var questiontwo = {
					"id":Whether=== true? id : ids,
					"is_necessary": 1,
					"question_number": 3,
					"question_title": "",
					"question_type": 3,
					"new": "new",
					"newid":Whether=== true? id :ids + 1,
					"answers": []
				};
				question = {"question": questiontwo};
				newarrr.push(question);
				this.setState({
					adddom: newarrr,
					problemtopic: Whethername,
					problemtopicbool: Whether,
				})
			}
		}
	}

	//删除指定条目
	Deleteadddom = (indexo,bool) => {
		// console.log("deleteadddom 259")

		var arr = this.state.adddom;
		let newarr = [...arr];
		newarr.splice(indexo, 1);
		if(bool === true) {
			console.log("shangchu1");
			this.setState({
				adddom: newarr,
				q_countst: 0,
				problemtopic: null,
				problemtopicbool: false,
				bindingid:undefined,
				Newdisplay:false,
				newoption: false,
				boolneweied:undefined
			})

		}else{
			console.log("shangchu2");

			this.setState({
				adddom: newarr,
				q_countst: 0,
				problemtopic: null,
				problemtopicbool: false,
				Newdisplay:false,
				newoption: false,
				boolneweied:undefined
			})
		}

	}
	//保存并继续
	//保存并继续，即提交本题的新建并继续创建一个相同的题（该新题处于编辑模式，题目和选项不要清空）
	Deleteadddomtwo = (indexo, object,bool) => {
		var thiss = this;


		var poll_questionslength = this.state.poll_questions.length;
		// console.log("deleteadddomtwo|||||||||||||||||||||||||||||||||||||||||\\");
		// console.log(indexo);
		// console.log(object);
		// console.log(object.question.question_type);
		let arr = this.state.adddom;
		let arrpoll = this.state.poll_questions;
		let newarr = [...arr];
		let newarrpoll = [...arrpoll];

		//选项内容不能为空
		let max = 0;
		let maxtie = newarr[indexo].question.answers.length;
		for (var k = 0; k < newarr[indexo].question.answers.length; k++) {
			try {
				if (newarr[indexo].question.answers[k].answer_text != undefined) {
					if (newarr[indexo].question.answers[k].answer_text === "") {
						max = max + 1;
					}
				}
			} catch (e) {
				// console.log("PollNew281")
				console.log(e)
			}
		}
		if (newarr[indexo].question.question_title === "") {
			this.props.showNotification(`题目不能为空`);

			return
		}
		if (max > 0) {
			if (object.question.question_type === 1) {
				this.props.showNotification(`选项内容不能为空`);

				return
			} else if (object.question.question_type === 2) {
				this.props.showNotification(`选项内容不能为空`);

				return
			}

		}

			if (object.question.question_type === 1) {
				if (maxtie < 2) {
				this.props.showNotification(`选项不能少于2个!`);
				return
				}
			} else if (object.question.question_type === 2) {
				if (maxtie < 3) {
				this.props.showNotification(`选项不能少于3个!`);
				return
				}
			}




		if (object.question.question_type === 2) {
			if (object.question.max_choices > 0) {
				// if (object.question.min_choices < 2) {
				// 	this.props.showNotification(`可选最小不能少于2个`);
				//
				// 	return;
				//
				// }
			}

		}
		if (object.question.new === "new") {
			// 根据数组里面的new 来确定是否是新增还是 修改
			//添加道数组上
			//不能共用数组 所以自己写个新数组 然后push 上面卷子中
			var question = {};
			if (object.question.question_type === 1) {

				var questiontwo = {};
				var other = [];
				var option = [];
				var answerstwos = [];
				var answerstwoss = [];
				///////////////////////////daying
				// 这个是装选项和其他的
				for (var y = 0; y < object.question.answers.length; y++) {
					if (object.question.answers[y].answer_text === "其他") {
						var dataone = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						other.push(object.question.answers[y].answer_text);
						answerstwos.push(dataone);
					} else {
						var datatwo = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						option.push(object.question.answers[y].answer_text)
						answerstwoss.push(datatwo);
					}


				}

				var arrc = option.concat(other);
				var answers = answerstwoss.concat(answerstwos);
				// 插入单选题
				// var id
				// try {
				// 	id = newarrpoll[newarrpoll.length - 1].question.id + 1;
				// } catch (e) {
				// 	id = 1;
				// }
				questiontwo = {
					// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
					"id": null,
					"is_necessary": object.question.is_necessary,
					"question_number": 1,
					"question_title": object.question.question_title,
					"question_type": 1,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				var insindex = null;
				// if (poll_questionslength !== thiss.state.Insertposition) {
				// 	insindex = newarrpoll[thiss.state.Insertposition].question.id;
				// }
				if (this.state.problemtopicbool === true) {
					insindex = this.state.problemtopic;
				}
				this.createquestionsandanswers(object, 1, arrc, null, 0, 0, insindex,0);
				// newarrpoll.push(question);
				newarrpoll.splice(thiss.state.Insertposition, 0, question);

			} else if (object.question.question_type === 2) {
				//插入多选题
				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if (object.question.max_choices < object.question.min_choices) {
							this.props.showNotification(`可选的最大限制不能小于最小限制`);
							return;
						}
					}
				}


				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if(object.question.min_choices){
							if(object.question.min_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}

				if(object.question.min_choices){
					if(object.question.min_choices>0){
						if(object.question.max_choices){
							if(object.question.max_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}
					var questiontwo = {};
					var other = [];
					var option = [];
					var answerstwos = [];
					var answerstwoss = [];
					for (var y = 0; y < object.question.answers.length; y++) {
						if (object.question.answers[y].answer_text === "其他") {
							var dataone = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							other.push(object.question.answers[y].answer_text);
							answerstwos.push(dataone);
						} else {
							var datatwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							option.push(object.question.answers[y].answer_text)
							answerstwoss.push(datatwo);
						}
					}
					var arrc = option.concat(other);
					var answers = answerstwoss.concat(answerstwos);
					// var id
					// try {
					// 	id = newarrpoll[newarrpoll.length - 1].question.id + 1;
					// } catch (e) {
					// 	id = 1;
					// }
					questiontwo = {
						"id": null,
						"is_necessary": object.question.is_necessary,
						"question_number": 2,
						"question_title": object.question.question_title,
						"question_type": 2,
						"max_choices": object.question.max_choices,
						"min_choices": object.question.min_choices,
						"new": "",
						"answers": answers
					};
					question = {"question": questiontwo};
					var insindex = null;
					if (this.state.problemtopicbool === true) {
						insindex = this.state.problemtopic;
					}
					this.createquestionsandanswers(object, 2, arrc, null, object.question.max_choices, object.question.min_choices, insindex,object.question.answers.length);

					newarrpoll.splice(thiss.state.Insertposition, 0, question);

			} else if (object.question.question_type === 3) {
				//插入主观题
				var answers = [];
				var questiontwo = {};
				var answerstwos = [];
				var answerstwoss = [];
				if (object.question.answers.length > 0) {
					for (var y = 0; y < object.question.answers.length; y++) {
						var answerstwo;
						if (object.question.answers[y].answer_text === "其他") {
							var dataone = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							answerstwos.push(dataone);
						} else {
							var datatwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							answerstwoss.push(datatwo);
						}
					}
				}

				answers = answerstwoss.concat(answerstwos);
				// var id
				// try {
				// 	id = newarrpoll[newarrpoll.length - 1].question.id + 1;
				// } catch (e) {
				// 	id = 1;
				// }
				questiontwo = {
					"id": null,
					"is_necessary": object.question.is_necessary,
					"question_number": 3,
					"question_title": object.question.question_title,
					"question_type": 3,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				// var insindex = null;
				// if (poll_questionslength !== thiss.state.Insertposition) {
				// 	insindex = newarrpoll[thiss.state.Insertposition].question.id;
				// }
				//主观题不需要可选选项
				var insindex = null;
				if (this.state.problemtopicbool === true) {
					insindex = this.state.problemtopic;
				}
				this.createquestionsandanswers(object, 3, null, null, 0, 0, insindex,0);
				// newarrpoll.push(question);
				newarrpoll.splice(thiss.state.Insertposition, 0, question);
			}
			//////////////////////////////////////////////////////////////////////////////////////////////////// 上面是新增
		} else {
			///////////////////////////////////////////////////////////////////////////////////////////////////修改点了编辑
			// console.log("点了编辑")
			var uuk = -1
			//这个地方判断 点了编辑上面题目又把他删除了 保存的时候就只能是插入新增了
			for (var uk = 0; uk < newarrpoll.length; uk++) {
				if (object.question.id === newarrpoll[uk].question.id) {
					uuk = uk;
				}
			}


			var question = {};
			if (object.question.question_type === 1) {
				var questiontwo = {};
				var other = [];
				var option = [];
				var answerstwos = [];
				var answerstwoss = [];
				///////////////////////////daying
				//这个装选项和其他的
				for (var y = 0; y < object.question.answers.length; y++) {
					if (object.question.answers[y].answer_text === "其他") {
						var dataone = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						other.push(object.question.answers[y].answer_text);
						answerstwos.push(dataone);
					} else {
						var datatwo = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						option.push(object.question.answers[y].answer_text)
						answerstwoss.push(datatwo);
					}


				}
				var arrc = option.concat(other);
				var answers = answerstwoss.concat(answerstwos);
				// 插入单选题
				questiontwo = {
					// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
					"id": object.question.id,
					"is_necessary": object.question.is_necessary,
					"question_number": 1,
					"question_title": object.question.question_title,
					"question_type": 1,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				if (uuk !== -1) {
					// console.log("修改")
					this.edittotheserver(object, 1, arrc, null, 0, 0,0);
					newarrpoll.splice(uuk, 1, question);
				} else {
					// console.log("他原来的删除掉了")
					this.createquestionsandanswers(object, 1, arrc, null, 0, 0, object.question.id,0);
					newarrpoll.push(question);
				}
				newarr[indexo].question.new = "new"
				// console.log(newarrpoll)
			} else if (object.question.question_type === 2) {
				//插入多选题
				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if (object.question.max_choices < object.question.min_choices) {
							this.props.showNotification(`可选的最大限制不能小于最小限制`);
							return;
						}
					}
				}


				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if(object.question.min_choices){
							if(object.question.min_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}

				if(object.question.min_choices){
					if(object.question.min_choices>0){
						if(object.question.max_choices){
							if(object.question.max_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}

				// if (object.question.max_choices < object.question.min_choices) {
				// 	this.props.showNotification('可选的最大限制不能小于最小限制！');
				//
				// 	return;
				// }
					var questiontwo = {};
					var other = [];
					var option = [];
					var answerstwos = [];
					var answerstwoss = [];
					for (var y = 0; y < object.question.answers.length; y++) {
						if (object.question.answers[y].answer_text === "其他") {
							var dataone = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							other.push(object.question.answers[y].answer_text);
							answerstwos.push(dataone);
						} else {
							var datatwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							option.push(object.question.answers[y].answer_text)
							answerstwoss.push(datatwo);
						}
					}
					var arrc = option.concat(other);
					var answers = answerstwoss.concat(answerstwos);
					questiontwo = {
						"id": object.question.id,
						"is_necessary": object.question.is_necessary,
						"question_number": 2,
						"question_title": object.question.question_title,
						"question_type": 2,
						"max_choices": object.question.max_choices,
						"min_choices": object.question.min_choices,
						"new": "",
						"answers": answers
					};
					question = {"question": questiontwo};

					if (uuk !== -1) {
						// console.log("修改")
						this.edittotheserver(object, 2, arrc, null, object.question.max_choices, object.question.min_choices,object.question.answers.length);
						newarrpoll.splice(uuk, 1, question);
					} else {
						// console.log("删除")
						this.createquestionsandanswers(object, 2, arrc, null, object.question.max_choices, object.question.min_choices, object.question.id,object.question.answers.length);
						newarrpoll.push(question);
					}
					// console.log(newarrpoll)
					newarr[indexo].question.new = "new"
			} else if (object.question.question_type === 3) {
				//插入主观题
				var answers = [];
				var questiontwo = {};

				if (object.question.answers.length > 0) {
					for (var y = 0; y < object.question.answers.length; y++) {
						var answerstwo;
						if (object.question.answers[y].answer_text === "其他") {
							answerstwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
						} else {
							answerstwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
						}
						answers.push(answerstwo);
					}
				}
				questiontwo = {
					"id": object.question.id,
					"is_necessary": object.question.is_necessary,
					"question_number": 3,
					"question_title": object.question.question_title,
					"question_type": 3,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};

				if (uuk !== -1) {
					// console.log("修改")
					this.edittotheserver(object, 3, null, null, 0, 0,0);
					newarrpoll.splice(uuk, 1, question);
				} else {
					// console.log("删除")
					this.createquestionsandanswers(object, 3, null, null, 0, 0, object.question.id,0);
					newarrpoll.push(question);
				}
				// console.log(newarrpoll)
				newarr[indexo].question.new = "new"
			}

		}


		//添加到上面列表中
		//改变题目总数
		if (object.question.question_type === 1) {
			//单选题
			this.state.mysingles = this.state.mysingles + 1;
		} else if (object.question.question_type === 2) {
			//多选题
			this.state.mydoubles = this.state.mydoubles + 1;
		} else if (object.question.question_type === 3) {
			//主观题
			this.state.mymainsint = this.state.mymainsint + 1;

		}
		if(bool === true){
			console.log("tianjiadao1");
			this.setState({
				q_countst: 1,
				bindingid:undefined,
				Newdisplay:false,
				newoption: false,
			})
		}else {
			console.log("tianjiadao2");
			this.setState({
				q_countst: 1,
				Newdisplay:false,
				newoption: false,
			})
		}
		this.setState({
			// poll_questions: newarrpoll,
			adddom: newarr,
			problemtopic: null,
			problemtopicbool: false,
			boolneweied:undefined
			// mysingles: this.state.mysingles,
			// mydoubles: this.state.mydoubles,
			// mymainsint: this.state.mymainsint
		})

	}


	//保存 后期可以考虑和保存并继续 合并
	//保存，即完成新建并退出本题编辑
	// indexo 第几个数组
	//object 单个数组数据
	Deleteadddomthree = (indexo, object,bool) => {

		// console.log("deleteadddom 349")
		var thiss = this;
		let arr = this.state.adddom;
		let arrpoll = this.state.poll_questions;
		let newarr = [...arr];
		let newarrpoll = [...arrpoll];
		var poll_questionslength = this.state.poll_questions.length; //获取单前问题最大长度
		//选项内容不能为空
		let max = 0;
		let maxtie = newarr[indexo].question.answers.length;
		//判断选项值是否不为空
		for (var k = 0; k < newarr[indexo].question.answers.length; k++) {
			try {
				if (newarr[indexo].question.answers[k].answer_text != undefined) {
					if (newarr[indexo].question.answers[k].answer_text === "") {
						max = max + 1;
					}
				}
			} catch (e) {
				// console.log("PollNew281")
				// console.log(e)
			}
		}
		if (newarr[indexo].question.question_title === "") {
			this.props.showNotification('题目不能为空！');
			return
		}

		if (newarr[indexo].question.question_title.match(/^[ ]*$/)) {
			this.props.showNotification('题目不能为空！');
			return
		}

		if (max > 0) {
			if (object.question.question_type === 1) {
				this.props.showNotification('选项内容不能为空！');
				return
			} else if (object.question.question_type === 2) {
				this.props.showNotification('选项内容不能为空！');
				return
			}

		}
			if (object.question.question_type === 1) {
				if (maxtie < 2) {
					this.props.showNotification('选项不能少于2个!');
				return
				}
			} else if (object.question.question_type === 2) {
				if (maxtie < 3) {
				this.props.showNotification('选项不能少于3个!');
				return
				}
			}



		if (object.question.question_type === 2) {
			if (object.question.max_choices > 0) {
				// if (object.question.min_choices < 2) {
				// 	this.props.showNotification(`可选最小不能少于2个`);
				// 	return;
				// }
			}
		}
		if (object.question.new === "new") {
			///////////////////////////////////////////////////////////////////新增模式
			// 根据数组里面的new 来确定是否是新增还是 修改
			//添加道数组上
			//不能共用数组 所以自己写个新数组 然后push 上面卷子中
			var question = {};
			if (object.question.question_type === 1) {
				var questiontwo = {};
				var other = [];
				var option = [];
				var answerstwos = [];
				var answerstwoss = [];
				///////////////////////////daying
				// 这个是装选项和其他的
				for (var y = 0; y < object.question.answers.length; y++) {
					if (object.question.answers[y].answer_text === "其他") {
						var dataone = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						other.push(object.question.answers[y].answer_text);
						answerstwos.push(dataone);
					} else {
						var datatwo = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						option.push(object.question.answers[y].answer_text)
						answerstwoss.push(datatwo);
					}
				}
				var arrc = option.concat(other);
				var answers = answerstwoss.concat(answerstwos);
				// 插入单选题'
				// var id;
				// try {
				// 	id = newarrpoll[newarrpoll.length - 1].question.id + 1
				// } catch (e) {
				// 	id = 1;
				// }
				questiontwo = {
					// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
					"id": null,
					"is_necessary": object.question.is_necessary,
					"question_number": 1,
					"question_title": object.question.question_title,
					"question_type": 1,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				//获取指定id 号 用来插入，如果不是就是在最后添加

				//执行新增操作
				var insindex = null;
				if (this.state.problemtopicbool === true) {
					insindex = this.state.problemtopic;
				}
				this.createquestionsandanswers(object, 1, arrc, null, 0, 0, insindex,0);
				newarrpoll.splice(thiss.state.Insertposition, 0, question);
			} else if (object.question.question_type === 2) {
				//插入多选题
				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if (object.question.max_choices < object.question.min_choices) {
							this.props.showNotification(`可选的最大限制不能小于最小限制`);
							return;
						}
					}
				}

				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if(object.question.min_choices){
							if(object.question.min_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}

				if(object.question.min_choices){
					if(object.question.min_choices>0){
						if(object.question.max_choices){
							if(object.question.max_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}


				// if (object.question.max_choices < object.question.min_choices) {
				// 	this.props.showNotification(`可选的最大限制不能小于最小限制`);
				//
				// 	return;
				// }
				 var questiontwo = {};
				 var other = [];
				 var option = [];
				 var answerstwos = [];
				 var answerstwoss = [];
				 for (var y = 0; y < object.question.answers.length; y++) {
					 if (object.question.answers[y].answer_text === "其他") {
						 var dataone = {
							 "answer_id": object.question.answers[y].answer_id,
							 "answer_position": object.question.answers[y].answer_position,
							 "answer_text": object.question.answers[y].answer_text
						 }
						 other.push(object.question.answers[y].answer_text);
						 answerstwos.push(dataone);
					 } else {
						 var datatwo = {
							 "answer_id": object.question.answers[y].answer_id,
							 "answer_position": object.question.answers[y].answer_position,
							 "answer_text": object.question.answers[y].answer_text
						 }
						 option.push(object.question.answers[y].answer_text)
						 answerstwoss.push(datatwo);
					 }
				 }
				 var arrc = option.concat(other);
				 var answers = answerstwoss.concat(answerstwos);

				 questiontwo = {
					 "id": null,
					 "is_necessary": object.question.is_necessary,
					 "question_number": 2,
					 "question_title": object.question.question_title,
					 "question_type": 2,
					 "max_choices": object.question.max_choices,
					 "min_choices": object.question.min_choices,
					 "new": "",
					 "answers": answers
				 };
				 question = {"question": questiontwo};

				 var insindex = null;
				 if (this.state.problemtopicbool === true) {
					 insindex = this.state.problemtopic;
				 }
				 this.createquestionsandanswers(object, 2, arrc, null, object.question.max_choices, object.question.min_choices, insindex,object.question.answers.length);
				 //插入多选题
				 // if (object.question.max_choices > arrc.length) {

				 newarrpoll.splice(thiss.state.Insertposition, 0, question);

			} else if (object.question.question_type === 3) {
				//插入主观题
				var answers = [];
				var questiontwo = {};
				var answerstwos = [];
				var answerstwoss = [];
				if (object.question.answers.length > 0) {
					for (var y = 0; y < object.question.answers.length; y++) {
						if (object.question.answers[y].answer_text === "其他") {
							var dataone = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							answerstwos.push(dataone);
						} else {
							var datatwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							answerstwoss.push(datatwo);
						}
					}
				}
				answers = answerstwoss.concat(answerstwos);

				questiontwo = {
					"id": null,
					"is_necessary": object.question.is_necessary,
					"question_number": 3,
					"question_title": object.question.question_title,
					"question_type": 3,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				//主观题不需要可选选项

				var insindex = null;
				if (this.state.problemtopicbool === true) {
					insindex = this.state.problemtopic;
				}
				this.createquestionsandanswers(object, 3, null, null, 0, 0, insindex,0);
				// newarrpoll.push(question);
				newarrpoll.splice(thiss.state.Insertposition, 0, question);
			}
			///////////////////////////////////////////////////////////////////新增模式
		} else {
			//////////////////////////////////////////////////////////////////////////////修改模式
			//修改
			var uuk = -1
			for (var uk = 0; uk < newarrpoll.length; uk++) {
				if (object.question.id === newarrpoll[uk].question.id) {
					uuk = uk;
					// console.log("删除了数据=-09876543234567890-111111111111")
				}
			}


			var question = {};
			if (object.question.question_type === 1) {
				var questiontwo = {};
				var other = [];
				var option = [];
				var answerstwos = [];
				var answerstwoss = [];
				///////////////////////////daying
				//这个装选项和其他的
				for (var y = 0; y < object.question.answers.length; y++) {
					if (object.question.answers[y].answer_text === "其他") {
						var dataone = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						other.push(object.question.answers[y].answer_text);
						answerstwos.push(dataone);
					} else {
						var datatwo = {
							"answer_id": object.question.answers[y].answer_id,
							"answer_position": object.question.answers[y].answer_position,
							"answer_text": object.question.answers[y].answer_text
						}
						option.push(object.question.answers[y].answer_text)
						answerstwoss.push(datatwo);
					}
				}
				var arrc = option.concat(other);
				var answers = answerstwoss.concat(answerstwos);
				// 插入单选题
				questiontwo = {
					// "id": this.state.poll_questions[arr.length - 1].question.id + 1 + arrr.length,
					"id": object.question.id,
					"is_necessary": object.question.is_necessary,
					"question_number": 1,
					"question_title": object.question.question_title,
					"question_type": 1,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				if (uuk !== -1) {
					// console.log("修改")
					this.edittotheserver(object, 1, arrc, null, 0, 0,0);
					newarrpoll.splice(uuk, 1, question);
				} else {
					// console.log("删除")
					this.createquestionsandanswers(object, 1, arrc, null, 0, 0, object.question.id,0);
					newarrpoll.push(question);
				}
				// console.log(newarrpoll)
			} else if (object.question.question_type === 2) {
				//插入多选题
				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if (object.question.max_choices < object.question.min_choices) {
							this.props.showNotification(`可选的最大限制不能小于最小限制`);
							return;
						}
					}
				}

				if(object.question.max_choices){
					if(object.question.max_choices>0){
						if(object.question.min_choices){
							if(object.question.min_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
							return;

						}
					}

				}

				if(object.question.min_choices){
					if(object.question.min_choices>0){
						if(object.question.max_choices){
							if(object.question.max_choices===0){
								this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);
								return;
							}
						}else {
							this.props.showNotification(`可选：最小和最大限制须同时为数值或者“--"`);

							return;

						}
					}

				}
					var questiontwo = {};
					var other = [];
					var option = [];
					var answerstwos = [];
					var answerstwoss = [];
					for (var y = 0; y < object.question.answers.length; y++) {
						if (object.question.answers[y].answer_text === "其他") {
							var dataone = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							other.push(object.question.answers[y].answer_text);
							answerstwos.push(dataone);
						} else {
							var datatwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
							option.push(object.question.answers[y].answer_text)
							answerstwoss.push(datatwo);
						}
					}
					var arrc = option.concat(other);
					var answers = answerstwoss.concat(answerstwos);
					questiontwo = {
						"id": object.question.id,
						"is_necessary": object.question.is_necessary,
						"question_number": 2,
						"question_title": object.question.question_title,
						"question_type": 2,
						"max_choices": object.question.max_choices,
						"min_choices": object.question.min_choices,
						"new": "",
						"answers": answers
					};
					question = {"question": questiontwo};
					//插入多选题
					if (uuk !== -1) {
						// console.log("修改")
						this.edittotheserver(object, 2, arrc, null, object.question.max_choices, object.question.min_choices,object.question.answers.length);
						newarrpoll.splice(uuk, 1, question);
					} else {
						// console.log("删除")
						this.createquestionsandanswers(object, 2, arrc, null, object.question.max_choices, object.question.min_choices, object.question.id,object.question.answers.length);
						newarrpoll.push(question);
					}

			} else if (object.question.question_type === 3) {
				//插入主观题
				var answers = [];
				var questiontwo = {};

				if (object.question.answers.length > 0) {
					for (var y = 0; y < object.question.answers.length; y++) {
						var answerstwo;
						if (object.question.answers[y].answer_text === "其他") {
							answerstwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
						} else {
							answerstwo = {
								"answer_id": object.question.answers[y].answer_id,
								"answer_position": object.question.answers[y].answer_position,
								"answer_text": object.question.answers[y].answer_text
							}
						}
						answers.push(answerstwo);
					}
				}
				questiontwo = {
					"id": object.question.id,
					"is_necessary": object.question.is_necessary,
					"question_number": 3,
					"question_title": object.question.question_title,
					"question_type": 3,
					"new": "",
					"answers": answers
				};
				question = {"question": questiontwo};
				if (uuk !== -1) {
					// console.log("修改")
					this.edittotheserver(object, 3, null, null, 0, 0,0);
					newarrpoll.splice(uuk, 1, question);
				} else {
					// console.log("删除")
					this.createquestionsandanswers(object, 3, null, null, 0, 0, object.question.id,0);
					newarrpoll.push(question);
				}
				// console.log(newarrpoll)

			}

		}


		//添加到上面列表中
		//改变题目总数
		if (object.question.question_type === 1) {
			//单选题
			this.state.mysingles = this.state.mysingles + 1;
		} else if (object.question.question_type === 2) {
			//多选题
			this.state.mydoubles = this.state.mydoubles + 1;
		} else if (object.question.question_type === 3) {
			//主观题
			this.state.mymainsint = this.state.mymainsint + 1;

		}

		//这里更新数据
		if (this.state.q_countst == 1) {
			this.setState({
				q_countst: 0,
			})
		}
		if(bool === true) {
			this.setState({
				bindingid:undefined,
			})
		}
		this.Deleteadddom(indexo);
		// console.log(indexo)
		this.setState({
			boolneweied:undefined
		})
	}


	////新增到服务器中
	createquestionsandanswers = (object, number, option, other, max_choices, min_choices, insert_id,length) => {

		var thiss = this;
		var poll_id = this.state.pollid;
		var urlly = `/polls/${poll_id}/poll_questions.json`
		var max_choicess = null;
		var min_choicess = null;
		try {
			if (max_choices === 0 && min_choices === 0) {
				max_choicess = null;
				min_choicess = null;
			} else {
				max_choicess = max_choices;
				min_choicess = min_choices;
			}
		}catch (e) {
			max_choicess = null;
			min_choicess = null;
		}
		// console.log("createquestionsandanswers");
		// console.log(max_choicess);
		// console.log(min_choicess);
		// console.log(length);
		var datay={};
		 datay={
			question_title: object.question.question_title,
			question_type: number,
			is_necessary: object.question.is_necessary,
			question_answers: option,
			question_other_answer: null,
			insert_id: insert_id
		}
		try {
			if(number===2){
				datay={
					question_title: object.question.question_title,
					question_type: number,
					is_necessary: object.question.is_necessary,
					max_choices: max_choicess===undefined||max_choicess===null||max_choicess===0||max_choicess==="0"?null:max_choicess,
					min_choices: min_choicess===undefined||min_choicess===null||min_choicess===0||min_choicess==="0"?null:min_choicess,
					question_answers: option,
					question_other_answer: null,
					insert_id: insert_id
				}
			}
		}catch (e) {

		}

		axios.post(urlly, datay).then((result) => {
			// try {
			if (result !== undefined) {
				if (result.data.status === 0) {
					this.props.showNotification(`已完成`);
					thiss.thisinitializationdatanew();
					console.log("已完成了了了1");
					this.setState({
						Newdisplay:false,
						newoption: false,

					})
					// console.log("确认创建问题")
					// console.log(result)
					// try {
					//     if (result.data.status === 0) {
					//         console.log("确认创建问题")
					//         console.log(JSON.stringify(result.data))
					//     }
					// } catch (e) {
					//
					// }
				}
			}else{
				this.setState({
					Newdisplay:true,
					newoption: false,

				})
			}
			// } catch (e) {
			//
			// }

		}).catch((error) => {
			console.log(error)
			this.setState({
				Newdisplay:true,
				newoption: false,

			})
		})


	}
	///编辑修改到服务器当中
	edittotheserver = (object, number, option, other, max_choices, min_choices,length) => {
		// console.log("调用了edittotheserver")
		var url = `/poll_questions/${object.question.id}.json`
		var thiss = this;
		var max_choicess = null;
		var min_choicess = null;
		try {
			if (max_choices === 0 && min_choices === 0) {
				max_choicess = null;
				min_choicess = null;
			} else {
				max_choicess = max_choices;
				min_choicess = min_choices;
			}
		}catch (e) {
			max_choicess = null;
			min_choicess = null;
		}

		// console.log("createquestionsandanswers");
		// console.log(max_choicess);
		// console.log(min_choicess);
		// console.log(length);
		var datay={};
		datay={
			// debug: true,
			question_title: object.question.question_title,
			question_type: number,
			is_necessary: object.question.is_necessary,
			question_answers: option,
			question_other_answer: null,
		};
		try {
			if(number===2){
				datay={
					// debug: true,
					question_title: object.question.question_title,
					question_type: number,
					is_necessary: object.question.is_necessary,
					max_choices: max_choicess===undefined||max_choicess===null||max_choicess===0||max_choicess==="0"?null:max_choicess,
					min_choices: min_choicess===undefined||min_choicess===null||min_choicess===0||min_choicess==="0"?null:min_choicess,
					question_answers: option,
					question_other_answer: null,
				};
			}
		}catch (e) {

		}

		axios.put(url,datay).then((result) => {
			try {
				if (result.data.status === 0) {
					console.log("编辑题目成功1");
					this.props.showNotification(`编辑题目成功`);
					thiss.thisinitializationdatanew();
					this.setState({
						Newdisplay:false,
						newoption: false,
					})
				}
			} catch (e) {
				// console.log("调用了edittotheserver")
				this.setState({
					Newdisplay:true,
					newoption: false,
				})
			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				Newdisplay:true,
				newoption: false,
			})
		})
	}

	//删除到服务器当中
	eletetoserver = (pollid, newarr, type, index) => {
		// console.log("调用了eletetoserver")
		var id = pollid;
		var url = `/poll_questions/${id}.json`
		let {mysingles, mydoubles, mymainsint} = this.state
		var thiss = this;

		axios
			.delete(url, {})
			.then(function (response) {
				// console.log(response)
				if (response === undefined) {
					return;
				}
				if (response.data.message === "删除成功") {
					thiss.props.showNotification(`删除成功`);

					newarr.splice(index, 1);
					if (type === 1) {
						mysingles = mysingles - 1;
					} else if (type === 2) {
						mydoubles = mydoubles - 1;

					} else if (type === 3) {
						mymainsint = mymainsint - 1;

					}
					// thiss.setState({
					//     poll_questions: newarr,
					//     mysingles: mysingles,
					//     mydoubles: mydoubles,
					//     mymainsint: mymainsint
					// });
					thiss.thisinitializationdatanew();
				}
			})

	}

	//上下移到服务器中
	Upanddownmovementof = (bool, poll_question_id) => {
		// console.log("调用了Upanddownmovementofr")
		// console.log(poll_question_id)
		var thiss = this;
		if (bool === true) {
			var url = `/poll_questions/${poll_question_id}/up_down.json`;
			axios.post(url, {
				opr: "up",
			}).then((result) => {
				// try {
				// 	if (result.data.status === 0) {
				// 		this.props.showNotification(`上移成功`);
				// 		thiss.thisinitializationdatanew();
				// 	}
				// 	// console.log(JSON.stringify(result))
				// } catch (e) {
				// 	// console.log("上移题目成功 错误")
				// 	console.log(e)
				// }
				try {
					if(result){
						if(result.data){
							if (result.data.status === 0) {
								this.props.showNotification(`上移成功`);
								thiss.thisinitializationdatanew();
							}else{
								this.props.showNotification(`上移失败`);
							}
						}
					}else {
						this.props.showNotification(`上移失败`);
					}
				} catch (e) {
					this.props.showNotification(`上移失败`);

				}
			})
		} else {
			var url = `/poll_questions/${poll_question_id}/up_down.json`;
			axios.post(url, {
				opr: "down",
			}).then((result) => {
				// try {
				// 	if (result.data.status === 0) {
				// 		// message.success("下移题目成功", 1)
				// 		this.props.showNotification(`下移成功`);
				// 		thiss.thisinitializationdatanew();
				// 	}
				// 	// console.log(JSON.stringify(result))
				// } catch (e) {
				// 	// console.log("下移题目成功 错误")
				// 	console.log(e)
				// }


				try {
					if(result){
						if(result.data){
							if (result.data.status === 0) {
								this.props.showNotification(`下移成功`);
								thiss.thisinitializationdatanew();
							}else {
								this.props.showNotification(`下移失败`);
							}
						}else {
							this.props.showNotification(`上移失败`);
						}
					}
				} catch (e) {
					this.props.showNotification(`上移失败`);
					console.log(e)
				}
			})
		}

	}

	//删除编辑新增条目
	//id 条目的唯一id
	//i 为要删除的子条目
	Deleteentrys = (id, i, stirngname) => {
		// console.log(id)
		// console.log(stirngname);
		var arrtwoy = this.state.adddom;
		let newarrtwoy = [...arrtwoy];
		for (var k = 0; k < newarrtwoy.length; k++) {
			if (newarrtwoy[k] != undefined) {
				if (newarrtwoy[k].question.id === id) {
					for (var c = 0; c < newarrtwoy[k].question.answers.length; c++) {
						if (c === i) {
							// console.log("删除了")
							// console.log(c)
							newarrtwoy[k].question.answers.splice(c, 1);
						}
					}
				}
			}
		}
		if (stirngname === true) {
			// console.log(stirngname);
			this.setState({
				newoption: false,
				adddom: newarrtwoy,

			})
		} else {
			// console.log(stirngname);
			this.setState({
				adddom: newarrtwoy,
			});
		}


	}


	//  新增选项
	Ewoption = (id, object) => {
		// console.log("ewoption 440")
		// console.log("是否是新建题目还是编辑")
		// console.log(object.question.new)


		let arrtwo = this.state.adddom;
		let newarrtwo = [...arrtwo];


		for (var k = 0; k < newarrtwo.length; k++) {
			// console.log(arrtwo[k].question.id);
			if (newarrtwo[k] != undefined) {
				if (newarrtwo[k].question.id === id) {
					var data = {
						"answer_id": newarrtwo[k].question.answers.length + 1,
						"answer_position": newarrtwo[k].question.answers.length + 1,
						"answer_text": ""
					};
					//向头部添加元素
					// newarrtwo[k].question.answers.unshift(data);
					//如果有其他这一项就删除掉
					if (newarrtwo[k].question.answers.length > 0) {
						for (var o = 0; o < newarrtwo[k].question.answers.length; o++) {
							if (newarrtwo[k].question.answers[o].answer_text != undefined) {
								if (newarrtwo[k].question.answers[o].answer_text === "其他") {
									newarrtwo[k].question.answers.splice(o, 0, data);
									this.setState({
										adddom: newarrtwo
									})
									return
								} else {
									if (o === newarrtwo[k].question.answers.length - 1) {
										newarrtwo[k].question.answers.push(data);
										this.setState({
											adddom: newarrtwo
										})
										return
									}
								}
							}
						}
					} else {
						newarrtwo[k].question.answers.push(data);
						this.setState({
							adddom: newarrtwo
						})
					}

				}
			}
		}

	}


	swapArray = (arr, index1, index2) => {
		arr[index1] = arr.splice(index2, 1, arr[index1])[0];
		return arr;
	}

	//新增其他选项
	Addanotheroption = (id) => {
		// console.log("addanotheroption 457")
		let arrtwo = this.state.adddom;
		let newarrtwo = [...arrtwo];
		// console.log(newarrtwo)
		for (var k = 0; k < newarrtwo.length; k++) {
			if (newarrtwo[k] != undefined) {
				if (newarrtwo[k].question.id === id) {
					var data = {
						"answer_id": newarrtwo[k].question.answers.length + 1,
						"answer_position": newarrtwo[k].question.answers.length + 1,
						"answer_text": "其他"
					};
					newarrtwo[k].question.answers.push(data);
				}
			}
		}
		this.setState({
			adddom: newarrtwo,
			newoption: true,
		})
	}


	//点击向上排序按钮事件
	handleClickBySortUp = (index, object) => {
		// console.log("handleClickBySortUp 521")
		// let arr = this.state.poll_questions;
		// let newarr = [...arr];
		// console.log(newarr)
		if (index != 0) {
			this.Upanddownmovementof(true, object.question.id);
			// let temp = newarr[index - 1];
			// newarr[index - 1] = newarr[index];
			// newarr[index] = temp;
			// this.setState({
			// 	poll_questions: newarr,
			// });
		}
	}

	//点击向下排序按钮事件
	handleClickBySortDown = (index, object) => {
		// console.log("handleClickBySortDown 536")
		let arr = this.state.poll_questions;
		let newarr = [...arr];
		//
		if (index != newarr.length - 1) {
			this.Upanddownmovementof(false, object.question.id);
			// let temp = newarr[index + 1];
			// newarr[index + 1] = newarr[index];
			// newarr[index] = temp;
			// this.setState({
			// 	poll_questions: newarr,
			// });
		} else {
			// console.log("2222index==arr.length");
			// console.log(this.state.poll_questions);
		}
	}

	//点击删除按钮事件
	handleClickByDelete = (type, index, object) => {
		// console.log("handleClickByDelete 556")
		// console.log("object.question.id")
		// console.log(object.question.id)
		let arr = this.state.poll_questions;
		let newarr = [...arr];
		this.eletetoserver(object.question.id, newarr, type, index)

	}

	// 数字输入监听
	//e为获取组件对象
	//i外层数组
	//k为内层数组
	HandleInputChanges = (e, i, k) => {
		console.log("handleInputChanges"+" "+e);
		console.log("handleInputChanges"+" "+i);
		console.log("handleInputChanges"+" "+k);
		// console.log("handleInputChanges 612")

		let value = e.target.value;//取到input的数据
		// console.log("handleInputChanges value is  :" + value);
		// console.log(k);
		let arr = this.state.adddom;
		let newarr = [...arr];

		newarr[i].question.answers[k].answer_text = value
		this.setState({
			adddom: newarr
		})

	}

	//标题输入监听
	HandleInputTopic = (e, i) => {
		// console.log("handleInputTopic 633")

		let value = e.target.value;//取到input的数据
		// console.log("handleInputTopic value is  :" + value);
		// console.log(i);
		let arr = this.state.adddom;
		let newarr = [...arr];
		newarr[i].question.question_title = value
		this.setState({
			adddom: newarr
		})
	}

	//最小值
	HandleGradationGroupChangee = (value, index, max, length) => {
		// console.log("最小值");
		// console.log(value);
		// console.log(index);
		// console.log(max);
		// console.log(length);

		// debugger
		var minbool = false;
		var maxbool = false;
		let arr = this.state.adddom;
		// if (parseInt(value) === 0 || parseInt(value) === "0" || parseInt(value) === null || parseInt(value) === undefined || parseInt(value) < 1) {
		// 	minbool = true;
		// }
		// if (max === 0 || max === "0" || max === null || max === undefined) {
		// 	maxbool = true;
		// }
		//
		// if (minbool === true && maxbool === true) {
		// 	for (var i = 0; i < arr.length; i++) {
		// 		if (index === i) {
		// 					arr[i].question.min_choices = parseInt(value);
		// 		}
		// 	}
		// 	this.setState({
		// 		adddom: arr
		// 	})
		// } else {
			for (var i = 0; i < arr.length; i++) {
				if (index === i) {
							arr[i].question.min_choices = parseInt(value);
							// arr[i].question.max_choices = length;
					break;
				}
			}
			this.setState({
				adddom: arr
			})
		// }

	}

	//最大值
	HandleGradationGroupChangeee = (value, index,minchoices,length) => {
	// 	console.log("2112");
	//  console.log(value);
  // console.log(minchoices);
	// 	console.log("最大值");
	// 	console.log(value);
	// 	console.log(index);
	// 	console.log(minchoices);
	// 	console.log(length);
		let arr = this.state.adddom;
		for (var i = 0; i < arr.length; i++) {
			if (index === i) {
				// if(parseInt(value)===0&&parseInt(minchoices)===0){
				// 	arr[i].question.min_choices= parseInt(0);
				// 	arr[i].question.max_choices = parseInt(0);
				// }else if(parseInt(minchoices)===0){
				// 	arr[i].question.min_choices= parseInt(2);
				// 	arr[i].question.max_choices = parseInt(value);
				// }
				// else if(parseInt(value)===0&&parseInt(minchoices)>0){
				// 	arr[i].question.min_choices= parseInt(minchoices);
				// 	arr[i].question.max_choices = parseInt(value);
				// }
				// else {
				// 	arr[i].question.min_choices= minchoices===null?2:minchoices===undefined?2:minchoices===0?2:parseInt(minchoices);
					arr[i].question.max_choices =  parseInt(value);
				// }
			}
		}
		// console.log(2119);
		// console.log(arr);
		this.setState({
			adddom: arr
		})
		// console.log(this.state.adddom);
	}

	//提交题目//没有就创建新的题库，新建问newz题和保存题目不一样不能同时保存 这里只是新建 和编辑 标题和须知
	submitQuestionnaire = (mews) => {
		// console.log("调用了submitQuestionnaire")
		if (this.state.Newedit === true) {

			this.newword();

		} else {
			if (this.state.polls_nametest === undefined || this.state.polls_nametest === "") {
				this.props.showNotification("请输入标题");
				return
			}

			if (this.state.polls_descriptiontest.length > 100) {

			}
			var pollid;
			if (this.state.pollid === undefined) {
				pollid = this.props.match.params.pollid;
			} else {
				pollid = this.state.pollid;
			}

			 // if(mews ==="new"){
         if(this.state.poll_questions&&this.state.poll_questions.length===0){
					 this.props.showNotification("至少创建1个题目");
					 return;
				 }
			 // }

			var url = `/polls/${pollid}.json`;
			axios.put(url, {
				polls_name: this.state.polls_nametest,
				polls_description: this.state.polls_descriptiontest
			}).then((result) => {
				try {
					// console.log(JSON.stringify(result))
					if (result.data.status === 0) {
						// console.log("更新题目成功")
						// this.props.showNotification("保存成功");
						this.props.history.push(`/courses/${this.props.match.params.coursesId}/polls/${pollid}/detail?tab=2`)
					}
				} catch (e) {

				}
			})
		}
	}

	cancelmodel = () => {

		this.setState({
			Modalstype: false,
			Modalstopval: "",
			ModalsBottomval: "",
		})

	}
	savedelete = (question_type, index, item) => {
		// console.log("savedelete");
		this.handleClickByDelete(question_type, index, item);
		this.setState({
			Modalstype: false,
			Modalstopval: "",
			ModalsBottomval: "",
		})
	}
	// 问题的类型，1单选题，2为多选题，3为主观题
	showDeleteConfirm = (question_type, index, item) => {
		this.setState({
			Modalstype: true,
			Modalstopval: "是否确认删除？",
			ModalsBottomval: "",
			ModalCancel: this.cancelmodel,
			ModalSave: () => this.savedelete(question_type, index, item),
		})

	}
	//必答选项
	OnCheckAllChange = (e, index) => {
		// console.log("onCheckAllChange");
		// console.log(e.target.checked);
		// console.log(e.target.value);
		let arr = this.state.adddom;
		for (var i = 0; i < arr.length; i++) {
			if (index === i) {
				if (e.target.checked === true) {
					arr[i].question.is_necessary = 1;

				} else {
					arr[i].question.is_necessary = 0;
				}
			}
		}
		this.setState({
			adddom: arr
		})
	}

	//重新编辑标题和须知
	adddomeditit = () => {
		if (this.state.mysave === true) {
			this.setState({
				mysave: false,
				readOnlys: "readOnly",
				storagedesc:this.state.polls_nametest,
				storagedesctwo:this.state.polls_descriptiontest,
			})
		} else if (this.state.mysave === false) {
			this.setState({
				mysave: true,
				readOnlys: "",
				storagedesc:this.state.polls_nametest,
				storagedesctwo:this.state.polls_descriptiontest,
			})
		}
	}
	//取消保存
	onSaveExercisetwo = () => {
		if (this.state.mysave === true) {
			this.setState({
				mysave: false,
				Newedit: false,
				readOnlys: "readOnly",
				polls_nametest:this.state.storagedesc,
				polls_descriptiontest:this.state.storagedesctwo,
			})
		} else {
			this.setState({
				mysave: false,
				Newedit: false,
				readOnlys: "readOnly",
				polls_nametest:this.state.storagedesc,
				polls_descriptiontest:this.state.storagedesctwo,
			})
		}
	}
	// 创建问卷
	onSaveExercise = () => {
		if (this.state.Newedit === true) {

			if (this.state.polls_nametest === undefined || this.state.polls_nametest === "") {
				this.props.showNotification(`请输入标题`);
				return
			}
			let coursesId = this.props.match.params.coursesId;
			const urlls = `/courses/${coursesId}/polls.json`
			axios.post(urlls, {
				polls_name: this.state.polls_nametest,
				polls_description: this.state.polls_descriptiontest
			}).then((result) => {
				if (result === undefined) {
					return;
				}
				this.state.Newedit === false;
				this.props.showNotification(`问卷创建成功!`);
				this.setState({
					pollid: result.data.data.id,
					Newedit: false,
					mysave: false,
					readOnlys: "readOnly",
					cancellation: false,
				});
				// var currenturl = window.location.href;
				// var newUrl = (currenturl.split("?"))[0];
				// var newr=(newUrl.slice("new"))[0];
				// console.log(newUrl);
				// console.log("2301");
				// console.log(newr);
				// window.history.pushState('','',newUrl+'?tab='+e);

				// window.location.href = `/courses/${coursesId}/polls/${result.data.data.id}/edit`;

			})
		} else {
			if (this.state.polls_nametest === undefined || this.state.polls_nametest === "") {
				this.props.showNotification("请输入标题");
				return
			}

			var pollid;
			if (this.state.pollid === undefined) {
				pollid = this.props.match.params.pollid;
			} else {
				pollid = this.state.pollid;
			}


			var url = `/polls/${pollid}.json`;
			axios.put(url, {
				polls_name: this.state.polls_nametest,
				polls_description: this.state.polls_descriptiontest
			}).then((result) => {
				if (result !== undefined) {
					this.props.showNotification(`问卷更新成功!`);
					this.setState({
						mysave: false,
						readOnlys: "readOnly",
					})
				}

			})
		}

	}
	gotohome=()=>{
		// const { current_user} = this.props
       if(this.state.first_category_url){
				 window.location.href=this.state.first_category_url;
			 }else{
				 this.props.history.goBack();
			 }

		//
		// let courseId=this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }
	}
	//试图
	render() {
		let {
			addonAfter,
			user_permission,
			polls_status,
			Modalstype,
			mysave,
			readOnlys,
			newoption,
			cancellation,
			left_banner_id
		} = this.state
		//获取老师权限
		// console.log("[`${maps[polls_status && polls_status]}`]]");
		// console.log(polls_status);
		// console.log([[`${maps[polls_status && polls_status]}`]] + "");

		const IsAdmin = this.props.isAdmin();
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				// sm: { span: 8 },
				sm: {span: 24},
			},
			wrapperCol: {
				xs: {span: 24},
				// sm: { span: 16 },
				sm: {span: 24},
			},
		};

		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};
     const  hejiine=this.state.mysingles + this.state.mydoubles + this.state.mymainsint;

		// console.log(this.state.projects===undefined?"":this.state.projects.poll_questions)
		var displaymysave = (mysave === true) ? "" : "display:none;";
		document.title=this.props.coursedata&&this.props.coursedata.name;
		return (
			<div className="newMain">
				{/*提示*/}
				{Modalstype && Modalstype === true ? <Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					modalsBottomval={this.state.ModalsBottomval}
					loadtype={this.state.Loadtype}
				/> : ""}

				<div className="educontent mb50">
					<p className="clearfix mb20 mt10">
						<a className=" btn colorgrey fl hovercolorblue" onClick={()=>this.gotohome()}>{this.props.coursedata.name}</a>
						<span className="color-grey-9 fl ml3 mr3">&gt;</span>
						{
							this.props.match.params.news === "new"?
								<a className=" btn colorgrey fl hovercolorblue"
									 href={`/courses/${this.props.match.params.coursesId}/polls/${this.props.match.params.pollid}`}>问卷</a>
								:
								<a className=" btn colorgrey fl hovercolorblue"
									 href={`/courses/${this.props.match.params.coursesId}/polls/${left_banner_id}`}>问卷</a>
						}

						<span className="color-grey-9 fl ml3 mr3">&gt;</span>
						<span>{this.props.match.params.news === undefined ? "新建" : this.props.match.params.news === "new" ? "新建" : "编辑"}</span>
					</p>
					<div className="clearfix mb30">
						<p
							className="fl color-black summaryname mt5">{this.props.match.params.news === undefined ? "新建问卷" : this.props.match.params.news === "new" ? "新建问卷" : "编辑问卷"}</p>
							{
								this.props.match.params.news === "new" ?
									<a  href={`/courses/${this.props.match.params.coursesId}/polls/${this.props.match.params.pollid}`}
										className=" fr font-16"></a>
									:
									<a href={`/courses/${this.props.match.params.coursesId}/polls/${left_banner_id}`}
										className=" fr font-16"></a>
							}
					</div>

					{/*<Form {...formItemLayout} onSubmit={this.handleSubmit}>*/}
							{
								this.state.mysave === false ?
							<div className="padding20-30" style={{ background: '#fff'}}>
								<div className="displayTitle font-16">
									<span>{this.state.polls_nametest}</span>

											<a className="fr" onClick={() => { this.adddomeditit() }} style={{ lineHeight: '32px'}}>
												<Tooltip title="编辑"><i className="iconfont icon-bianjidaibeijing font-20 color-green"></i></Tooltip>
											</a>
								</div>
								<div className="displayDescription color-grey-9" dangerouslySetInnerHTML={{__html: this.state.polls_descriptiontest}}
										 style={{whiteSpace: 'pre-wrap'}}
								></div>

							</div>
							:""
					}
					{
						this.state.mysave === true ?
							<div className="edu-back-white">
								<div className="createPage bor-bottom-greyE">
									<style>
										{`
                   .ant-form-item-label{width:180px;}
                  `}
									</style>

									<div>
										<div style={{"color": "#212121", "font-size": "16px"}} className="fl"><span
											style={{"color": "#f5222d"}}>*</span>问卷标题
										</div>
										{
											this.props.match.params.news === undefined ? "" : this.props.match.params.news === "new" ?
												(
													this.state.mysave === false ?
														<div className="fr">
									<span><a onClick={() => this.adddomeditit()}><Tooltip title="编辑"><i
										className="color-green font-18 iconfont icon-bianjidaibeijing"></i></Tooltip></a></span>
														</div>
														: "")
												:""
										}

									</div>
									{/*suffix={String(addonAfter)}*/}
									<style>
										{
											`
											.yslpollls   .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
											`
										}
									</style>
									<Input placeholder="请输入问卷标题，最大限制60个字符" maxLength="60"
												 style={{"margin-top": "15px", textAlign: "left"}}
												 onInput={this.changeTopicName}
												 readOnly={readOnlys}
												 autoComplete="off"
												 addonAfter={String(addonAfter)+"/60"}
												 value={this.state.polls_nametest}
												 className="searchViewAfter yslpollls"></Input>

								</div>
								<div style={{
									"padding": "20px 30px 50px",
									"position": "relative",
									"border-bottom": "1px solid #EDEDED",
									"margin-bottom": " 0px"
								}}>
									<style>
										{`
                   .ant-form-item-label{width:80px;}
                  `}
									</style>

									<div style={{"color": "#212121", "font-size": "16px"}}>问卷须知</div>

									<TextArea placeholder="请输入本次问卷答题的相关说明，最大限制100个字符"
														style={{"height": "120px", "margin-top": "15px", textAlign: "left"}}
														maxLength="100"
														readOnly={readOnlys}
														onInput={this.changeTopicNametwo}
														value={this.state.polls_descriptiontest}
														autoComplete="off" suffix={"100"}></TextArea>
									{
										this.state.Newedit === true || this.state.mysave === true ?
											<div>
												<Button type="primary" onClick={this.onSaveExercise} className=" fr   "
																style={{
																	"margin-top": "10px",
																	"height": "32px",
																	"width": " 70px",
																	"font-size": "14px",
																	"line-height": " 30px",
																}}>保存</Button>
												{cancellation === false ?
													<Button onClick={this.onSaveExercisetwo} className="defalutCancelbtn  fr mr20  "
																	style={{
																		"margin-top": "10px",
																		"height": "32px",
																		"width": " 70px",
																		"font-size": "14px",
																		"line-height": " 30px"
																	}}>取消</Button>
													: ""}

											</div>
											: ""
									}

								</div>

							</div>:""
					}



					<p className="clearfix padding20-30 color-grey-9">


						{
							hejiine=== 0 ? "" :
								<div>
                                                  <span className="fl">
                                                      {this.state.mysingles === 0 ? "" : <span
																												className="mr20">单选题{this.state.mysingles === undefined ? "" : this.state.mysingles} 题</span>}

																										{this.state.mydoubles === 0 ? "" :
																											<span
																												className="mr20">多选题{this.state.mydoubles === undefined ? "" : this.state.mydoubles}题</span>}
																										{this.state.mymainsint === 0 ? "" :
																											<span className="mr20">
                                                              主观题{this.state.mymainsint === undefined ? "" : this.state.mymainsint}题
                                                          </span>
																										}
                                                  </span>

									<span className="fr">合计 <span
										className="color-blue">{this.state.mysingles === undefined ? "" : this.state.mydoubles === undefined ? "" : this.state.mymainsint === undefined ? "" : hejiine}</span> 题</span>
								</div>

						}

					</p>
					<div className="edu-back-white">

						{/*自动生成修改好的获取到的*/}
						{/**************************************************************************/}
						{this.state.poll_questions === undefined ? "" : this.state.poll_questions.map((item, index) => {
							console.log('打印this.state.poll_questions');
							console.log(this.state.poll_questions);
							console.log(this.state.adddom);
							let resultDom;
							resultDom = <div >
								<p className="clearfix font-16">
									<span className="color-grey-6 fl">第{index + 1}题：</span>
									<span
										className="color-grey-9 fl">{item.question.question_type === 1 ? "(单选题)" : item.question.question_type === 2 ? "(多选题)" : "(主观题)"}</span>
									<span
										className="selectAnswer ml10">{item.question.is_necessary === 1 ? "必答" : item.question.question_type === 2 ? "选答" : "选答"}</span>
									{
										item.question.question_type === 2?
											<span style={{color: "#4B4B4B"}}
														className="font-16 mt10 ml10">{(item.question.min_choices === undefined && item.question.max_choices === undefined ? "" : item.question.min_choices === null && item.question.max_choices === null ? "" : item.question.min_choices === 0 && item.question.max_choices === 0 ? "": item.question.min_choices === "null" && item.question.max_choices === "null" ? "" : item.question.min_choices === item.question.max_choices && item.question.max_choices ===  item.question.min_choices  ? "可选"+(item.question.max_choices)+"项" : "可选" +(item.question.min_choices===undefined||item.question.min_choices===null||item.question.min_choices===""||item.question.min_choices==="null"?2:item.question.min_choices) + "-" + (item.question.max_choices===undefined||item.question.max_choices===null||item.question.max_choices===""||item.question.max_choices==="null"?item.question.answers.length:item.question.max_choices) + "项")}</span>
											: ""
									}

									{
										polls_status === undefined || polls_status === 1 ?
											<span className="fr">
                      <a className="mr30"
												 onClick={() => this.showDeleteConfirm(item.question.question_type, index, item)}><Tooltip
												title="删除"><i
												className="color-grey-cd font-16 iconfont icon-shanchu"></i></Tooltip></a>
												{index === 0 ? "" :
													<a className="mr30"
														 onClick={() => this.handleClickBySortUp(index, item)}><Tooltip
														title="上移"><i
														className="color-green font-18 iconfont icon-xiangshangyi"></i></Tooltip></a>}
												{index === this.state.poll_questions.length - 1 ? "" :
													<a className="mr30"
														 onClick={() => this.handleClickBySortDown(index, item)}><Tooltip
														title="下移"><i
														className="color-green font-18 iconfont icon-xiangxiayi"></i></Tooltip></a>}
												<a className="mr30"
													 onClick={() => this.addMytopic(item.question.question_type, this.state.pollid, index + 1, true, item.question.id,index)}><Tooltip
													title={item.question.question_type === 1 ? "插入单选题" : item.question.question_type === 2 ? "插入多选题" : "插入主观题"}><i
													className="color-green font-18 iconfont icon-roundaddfill"></i></Tooltip></a>
                      <a onClick={() => this.adddomedit(item,index)}><Tooltip title="编辑"><i
												className="color-green font-18 iconfont icon-bianjidaibeijing"></i></Tooltip></a>
                    </span> : <span className="fr">     <a onClick={() => this.adddomedit(item,index)}><Tooltip title="编辑"><i
												className="color-green font-18 iconfont icon-bianjidaibeijing"></i></Tooltip></a>  </span>
									}

								</p>
								<p className="mt20"> <span className="font-16  flex1" style={{"white-space":"pre-wrap","word-break": "break-all","word-wrap": "break-word"}}>{item.question.question_title}</span></p>
								{/*<pre className="mt20 mb20 font-16 break_word flex1">{item.question.question_title}</pre>*/}
								{item.question.question_type === 1 ?
									<div>
									<RadioGroup defaultChecked={false} disabled>
										{item.question.answers === undefined ? "" : item.question.answers.map((items, i) => {
											return (
												<div className="h20 pt20" style={{"clear": "both"}}>
													<Radio value={i} className={"fl"} style={{textAlign: "left",marginTop:"3px"}}></Radio>
													<span className={" flex1 "} style={{textAlign: "left","white-space":"pre-wrap","word-break": "break-all","word-wrap": "break-word","float": "left","width":"1116px"}} >{items.answer_text}</span>

												</div>
											)
										})}
									</RadioGroup>
										{/*单选题*/}


									</div>
									: item.question.question_type === 2 ?
										<div>
											<CheckboxGroup defaultChecked={false} disabled>
											{item.question.answers === undefined ? "" : item.question.answers.map((items, i) => {
												return (
													<div className="mt10 pt20 " style={{"clear": "both"}}>
														<Checkbox value={i} key={i} className={"fl"} style={{textAlign: "left",marginRight:"8px"}}></Checkbox>
														<span className={" flex1"} style={{textAlign: "left","white-space":"pre-wrap","word-break": "break-all","word-wrap": "break-word","float": "left","width":"1116px"}}>{items.answer_text}</span>
													</div>
												)
											})}
										</CheckboxGroup>
											{/*多选题*/}
										</div>

										: item.question.question_type === 3 ?
											// 主观题
											(	<div>
											</div>) : (<div></div>)}
							</div>

							return (
								<div>
									{/*这里是编辑和新增的地方*/}
									{
										this.state.bindingid && this.state.bindingid===item.question.id?
											(this.state.Newdisplay === false?
											<div className="problemShow bor-bottom-greyE">
											<div >
												{this.state.adddom === undefined ? "" :this.state.adddom===undefined?"": this.state.adddom.length===0?"":item.question.id === this.state.adddom[0].question.id&&this.state.adddom.map((itemo, indexo) => {
													let arrid = itemo.question.id;
													let resultDomtwo;
													resultDomtwo =
														<div id={"publishtimeid"+index}>
									<span
										className="font-16 color-grey-6 mb20" id={"yslproblms3"}>{itemo.question.question_type === 1 ? "单选题" : itemo.question.question_type === 2 ? "多选题" : "主观题"}
										<Checkbox value={itemo.question.is_necessary}
															checked={itemo.question.is_necessary === 1 ? true : false}
															onChange={(e) => this.OnCheckAllChange(e, indexo)}
															className="lineh-40"
															style={{"marginLeft": "20px"}}>必答</Checkbox>
									</span>

															<TextArea placeholder="请输入题目" className="mb20 TextAreas"
																				autosize={{minRows: 1, maxRows: 5}}
																				id="textArea"
																				style={{
																					"height": "45px",
																					"max-height": "9.0072e+15px",
																					"overflow-y": "hidden",
																					"line-height": "35px",
																				}}

																				onInput={(e) => this.HandleInputTopic(e, indexo)}>{itemo.question.question_title}</TextArea>

															{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																return (
																	<div>
																		{itemt.answer_text === undefined ? (
																			<div></div>) : itemt.answer_text === "其他" ? (
																			<p className="df mb20">
															<span
																className="color-grey-6 mr3 w60 font-16 lineh-40"
																style={{textAlign: "center"}}>其它</span>

																				<input
																					className="mr20 input-flex-40 TextAreainput" disabled
																					placeholder='无法编辑！将由参与答题的人手动录入'></input>
																				{this.state.polls_status === undefined || this.state.polls_status === 1 ?
																					<a className="lineh-40"
																						 onClick={() => this.Deleteentrys(arrid, indext, true)}><Tooltip
																						title="删除"
																						placement={"bottom"}><i
																						className="iconfont icon-htmal5icon19 font-20 color-grey-c"></i></Tooltip></a>
																					: ""}
																			</p>) : (<p className="df mb20">
													<span className="color-grey-6 mr10 w60 font-16 lineh-40"
																style={{textAlign: "center"}}>选项</span>

																			<TextArea
																				autosize={{minRows: 1, maxRows: 5}}
																				className="mr20 TextAreas"
																				value={itemt.answer_text}
																				style={{
																					"height": "45px",
																					"max-height": "9.0072e+15px",
																					"overflow-y": "hidden",
																					"line-height": "35px",
																				}}
																				onInput={(e) => this.HandleInputChanges(e, indexo, indext)}></TextArea>
																			{this.state.polls_status === undefined || this.state.polls_status === 1 ?
																				<a className="lineh-40"
																					 onClick={() => this.Deleteentrys(arrid, indext, false)}><Tooltip
																					title="删除" placement={"bottom"}><i
																					className="iconfont icon-htmal5icon19 font-20 color-grey-c"></i></Tooltip></a>
																				: ""}
																		</p>)}
																	</div>
																)
															})}

															<div className="df">
																{itemo.question.question_type === 1 ? (
																		<div className="ml10">
																			<div style={{minWidth: "1100px"}}>
																				{this.state.polls_status === undefined || this.state.polls_status === 1 ?
																					<ActionBtn style="grey" className="mr20 mt5"
																										 onClick={() => this.Ewoption(itemo.question.id, itemo)}>新增选项</ActionBtn>

																					: ""}
																				{this.state.polls_status === undefined || this.state.polls_status === 1 ?

																					(this.state.newoption === false ?
																						<ActionBtn style="grey" className="mr20 mt5"
																											 onClick={() => this.Addanotheroption(itemo.question.id)}>新增其他选项</ActionBtn>
																						: "")
																					: ""}
																				<span className="fr mt5">
                        <ActionBtn style="greyBack" className="mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
																					{
																						polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
																							:""}
                      </span>
																			</div>
																		</div>


																	)


																	: itemo.question.question_type === 2 ? (
																			//////////////////////////////////////////// 可选
																			<div>
																				<div style={{minWidth: "1100px"}}>
																					<div>
                                                        <span
																													className="color-grey-6 mr20 ml10 font-16 lineh-40 fl">可选</span>
																						<div className="mr40 flex1 ">
																							{/*可选最小1*/}
																							<style>
																								{
																									`
																			.ant-select-selection .ant-select-selection-selected .ant-select-selection__rendered .ant-select-selection-selected-value{
																				"width":"100%";
                                  "height": "80%";
																	"margin-top": "5px";
																 "margin-left": "5px";
																 textAlign: "center";
																 "display": "block";
																 "opacity": "1";
																			}
																	`
																								}
																							</style>
																							<Select className="fl  w100"
																											onChange={(value) => this.HandleGradationGroupChangee(value, indexo, itemo.question.max_choices, itemo.question.answers.length)}
																											value={itemo.question.min_choices === null || itemo.question.min_choices === undefined ||itemo.question.min_choices === "null"|| itemo.question.min_choices === 0 || itemo.question.min_choices === "0"?"0": itemo.question.min_choices}
																							>
																								<Option value={"0"}>--</Option>
																								{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																									return (
																										indext >= 1 ? <Option value={String(indext + 1)}>{indext + 1}</Option> : ""
																									)
																								})}
																							</Select>
																							<span
																								className="ml10 mr10 color-grey-6 lineh-40 fl">~</span>
																							{/*可选最大2*/}
																							<Select className="fl w100"
																											onChange={(value) => this.HandleGradationGroupChangeee(value, indexo,itemo.question.min_choices,itemo.question.answers.length)}
																											value={itemo.question.max_choices === null || itemo.question.max_choices === undefined ||itemo.question.max_choices === "null"|| itemo.question.max_choices === 0 || itemo.question.max_choices === "0"?"0": itemo.question.max_choices}
																							>
																								<Option value={"0"}>--</Option>
																								{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																									return (
																										indext >= 1 ? <Option value={String(indext + 1)}>{indext + 1}</Option> : ""

																									)
																								})}
																							</Select>
																							<span
																								className="ml10 mr20 color-grey-6 lineh-40 fl font-16">项</span>
																							<span
																								className="color-grey-9 fl lineh-40">（学生答题时，系统对其选择的选项个数进行限制，--表示不限制）</span>
																						</div>

																					</div>
																				</div>
																			</div>
																		)

																		: (<div style={{minWidth: "1100px"}}></div>)

																}
															</div>
															<div >
																{itemo.question.question_type === 2 ?
																	(
																		this.state.polls_status === undefined || this.state.polls_status === 1 ?
																			<div className="clearfix mt30 ml10"	>

																				<div><ActionBtn style="grey" className="mr20 fl mt5"
																												onClick={() => this.Ewoption(itemo.question.id, itemo)}>新增选项</ActionBtn>

																					{
																						this.state.newoption === false ? <ActionBtn style="grey" className="mr20 fl mt5"
																																												onClick={() => this.Addanotheroption(itemo.question.id)}>新增其他选项</ActionBtn> : ""
																					}

																				</div>


																				<span className="fr mt5">
                        <ActionBtn style="greyBack" className=" mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
																					{
																						polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
																							:""}
                      </span>
																			</div>


																			:
																			<div className="clearfix mt30" >
														<span className="fr mt5">
                        <ActionBtn style="greyBack" className=" mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
															{
																polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
																	:""}
                      </span>
																			</div>
																	)

																	: itemo.question.question_type === 3 ?
																		<div className="clearfix mt30" >
												<span className="fr">
                        <ActionBtn style="greyBack" className="mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
													{
														polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
															:""}
                      </span>
																		</div>
																		:
																		""}


															</div>
														</div>


													return (
														<div>
															{resultDomtwo}
														</div>
													)
												})}
											</div>
											</div>:"")
											:
											<div className="bor-bottom-greyE problemShow">
												{resultDom}
												{this.state.Newdisplay === false?

												<div className="mt10" >
													{this.state.adddom === undefined ? "" :this.state.adddom===undefined?"": this.state.adddom.length===0?"":item.question.id === this.state.adddom[0].question.id&&this.state.adddom.map((itemo, indexo) => {
														let arrid = itemo.question.id;
														let resultDomtwo;
														resultDomtwo =
															<div  id={"publishtimeid"+index}>
									<span
										className="font-16 color-grey-6 mb20" id={"yslproblms2"}>{itemo.question.question_type === 1 ? "单选题" : itemo.question.question_type === 2 ? "多选题" : "主观题"}
										<Checkbox value={itemo.question.is_necessary}
															checked={itemo.question.is_necessary === 1 ? true : false}
															onChange={(e) => this.OnCheckAllChange(e, indexo)}
															className="lineh-40"
															style={{"marginLeft": "20px"}}>必答</Checkbox>
									</span>

																<TextArea placeholder="请输入题目" className="mb20 TextAreas"
																					autosize={{minRows: 1, maxRows: 5}}
																					id="textArea"
																					style={{
																						"height": "45px",
																						"max-height": "9.0072e+15px",
																						"overflow-y": "hidden",
																						"line-height": "35px",
																					}}

																					onInput={(e) => this.HandleInputTopic(e, indexo)}>{itemo.question.question_title}</TextArea>

																{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																	return (
																		<div>
																			{itemt.answer_text === undefined ? (
																				<div></div>) : itemt.answer_text === "其他" ? (
																				<p className="df mb20">
															<span
																className="color-grey-6 mr3 w60 font-16 lineh-40"
																style={{textAlign: "center"}}>其它</span>

																					<input
																						className="mr20 input-flex-40 TextAreainput" disabled
																						placeholder='无法编辑！将由参与答题的人手动录入'></input>
																					{this.state.polls_status === undefined || this.state.polls_status === 1 ?
																						<a className="lineh-40"
																							 onClick={() => this.Deleteentrys(arrid, indext, true)}><Tooltip
																							title="删除"
																							placement={"bottom"}><i
																							className="iconfont icon-htmal5icon19 font-20 color-grey-c"></i></Tooltip></a>
																						: ""}
																				</p>) : (<p className="df mb20">
													<span className="color-grey-6 mr10 w60 font-16 lineh-40"
																style={{textAlign: "center"}}>选项</span>

																				<TextArea
																					autosize={{minRows: 1, maxRows: 5}}
																					className="mr20 TextAreas"
																					value={itemt.answer_text}
																					style={{
																						"height": "45px",
																						"max-height": "9.0072e+15px",
																						"overflow-y": "hidden",
																						"line-height": "35px",
																					}}
																					onInput={(e) => this.HandleInputChanges(e, indexo, indext)}></TextArea>
																				{this.state.polls_status === undefined || this.state.polls_status === 1 ?
																					<a className="lineh-40"
																						 onClick={() => this.Deleteentrys(arrid, indext, false)}><Tooltip
																						title="删除" placement={"bottom"}><i
																						className="iconfont icon-htmal5icon19 font-20 color-grey-c"></i></Tooltip></a>
																					: ""}
																			</p>)}
																		</div>
																	)
																})}

																<div className="df">
																	{itemo.question.question_type === 1 ? (
																			<div className="ml10">
																				<div style={{minWidth: "1100px"}}>
																					{this.state.polls_status === undefined || this.state.polls_status === 1 ?
																						<ActionBtn style="grey" className="mr20 mt5"
																											 onClick={() => this.Ewoption(itemo.question.id, itemo)}>新增选项</ActionBtn>

																						: ""}
																					{this.state.polls_status === undefined || this.state.polls_status === 1 ?

																						(this.state.newoption === false ?
																							<ActionBtn style="grey" className="mr20 mt5"
																												 onClick={() => this.Addanotheroption(itemo.question.id)}>新增其他选项</ActionBtn>
																							: "")
																						: ""}
																					<span className="fr mt5">
                        <ActionBtn style="greyBack" className="mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
																						{
																							polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
																								:""}
                      </span>
																				</div>
																			</div>


																		)


																		: itemo.question.question_type === 2 ? (
																				//////////////////////////////////////////// 可选
																				<div>
																					<div style={{minWidth: "1100px"}}>
																						<div>
                                                        <span
																													className="color-grey-6 mr20 font-16 lineh-40 fl">可选</span>
																							<div className="mr40 flex1 ">
																								{/*可选最小*/}
																								<style>
																									{
																										`
																			.ant-select-selection .ant-select-selection-selected .ant-select-selection__rendered .ant-select-selection-selected-value{
																				"width":"100%";
                                  "height": "80%";
																	"margin-top": "5px";
																 "margin-left": "5px";
																 textAlign: "center";
																 "display": "block";
																 "opacity": "1";
																			}
																	`
																									}
																								</style>
																								<Select className="fl  w100"
																												onChange={(value) => this.HandleGradationGroupChangee(value, indexo, itemo.question.max_choices, itemo.question.answers.length)}
																												value={itemo.question.min_choices === null || itemo.question.min_choices === undefined ||itemo.question.min_choices === "null"|| itemo.question.min_choices === 0 || itemo.question.min_choices === "0"?"0": itemo.question.min_choices}
																								>
																									<Option value={String("0")}>--</Option>
																									{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																										return (
																											indext >= 1 ? <Option value={String(indext + 1)}>{indext + 1}</Option> : ""
																										)
																									})}
																								</Select>
																								<span
																									className="ml10 mr10 color-grey-6 lineh-40 fl">~</span>
																								{/*可选最大*/}
																								<Select className="fl w100"
																												onChange={(value) => this.HandleGradationGroupChangeee(value, indexo,itemo.question.min_choices,itemo.question.answers.length)}
																												value={itemo.question.max_choices === null || itemo.question.max_choices === undefined ||itemo.question.max_choices === "null"|| itemo.question.max_choices === 0 || itemo.question.max_choices === "0"?"0": itemo.question.max_choices}
																								>
																									<Option value={String("0")}>--</Option>
																									{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																										return (
																											indext >= 1 ? <Option value={String(indext + 1)}>{indext + 1}</Option> : ""

																										)
																									})}
																								</Select>
																								<span
																									className="ml10 mr20 color-grey-6 lineh-40 fl font-16">项</span>
																								<span
																									className="color-grey-9 fl lineh-40">（学生答题时，系统对其选择的选项个数进行限制，--表示不限制）</span>
																							</div>

																						</div>
																					</div>
																				</div>
																			)

																			: (<div style={{minWidth: "1100px"}}></div>)

																	}
																</div>
																<div>
																	{itemo.question.question_type === 2 ?
																		(
																			this.state.polls_status === undefined || this.state.polls_status === 1 ?
																				<div className="clearfix mt30 ml10"	>

																					<div><ActionBtn style="grey" className="mr20 fl mt5"
																													onClick={() => this.Ewoption(itemo.question.id, itemo)}>新增选项</ActionBtn>

																						{
																							this.state.newoption === false ? <ActionBtn style="grey" className="mr20 fl mt5"
																																													onClick={() => this.Addanotheroption(itemo.question.id)}>新增其他选项</ActionBtn> : ""
																						}

																					</div>


																					<span className="fr mt5">
                        <ActionBtn style="greyBack" className=" mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
																						{
																							polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
																								:""}
                      </span>
																				</div>


																				:
																				<div className="clearfix mt30" >
														<span className="fr mt5">
                        <ActionBtn style="greyBack" className=" mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
															{
																polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
																	:""}
                      </span>
																				</div>
																		)

																		: itemo.question.question_type === 3 ?
																			<div className="clearfix mt30" >
												<span className="fr">
                        <ActionBtn style="greyBack" className="mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo,true)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo,true)}>保存</ActionBtn>
													{
														polls_status && polls_status < 2 ?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo,true)}>保存并继续</ActionBtn>
															:""}
                      </span>
																			</div>
																			:
																			""}


																</div>
															</div>


														return (
															<div>
																{resultDomtwo}
															</div>
														)
													})}
												</div>:""}
											</div>
											}
								</div>

							)
						})}



						{/*新建单选多选2*/}
						<div className="myyslwidth">
							{
								this.state.Newdisplay === true?
									<div>
										{this.state.adddom === undefined ? "publishtimeids123123" : this.state.adddom.map((itemo, indexo) => {
											// console.log('打印this.state.adddom')
											// console.log(this.state.adddom);
											let arrid = itemo.question.id;
											let resultDomtwo;
											resultDomtwo =
												<div className="problemShow" id={"publishtimeids"}>
									<span
										className="font-16 color-grey-6 mb20" id={"yslproblms"}>{itemo.question.question_type === 1 ? "单选题" : itemo.question.question_type === 2 ? "多选题" : "主观题"}
										<Checkbox value={itemo.question.is_necessary}
															checked={itemo.question.is_necessary === 1 ? true : false}
															onChange={(e) => this.OnCheckAllChange(e, indexo)}
															className="lineh-40"
															style={{"marginLeft": "20px"}}>必答</Checkbox>
									</span>

													<TextArea placeholder="请输入题目" className="mb20 TextAreas"
																		autosize={{minRows: 1, maxRows: 5}}
																		id="textArea"
																		style={{
																			"height": "45px",
																			"max-height": "9.0072e+15px",
																			"overflow-y": "hidden",
																			"line-height": "35px",
																		}}

																		onInput={(e) => this.HandleInputTopic(e, indexo)}>{itemo.question.question_title}</TextArea>

													{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
														return (
															<div>
																{itemt.answer_text === undefined ? (
																	<div></div>) : itemt.answer_text === "其他" ? (
																	<p className="df mb20">
															<span
																className="color-grey-6 mr3 w60 font-16 lineh-40"
																style={{textAlign: "center"}}>其它</span>

																		<input
																			className="mr20 input-flex-40 TextAreainput" disabled
																			placeholder='无法编辑！将由参与答题的人手动录入'></input>
																		{polls_status === undefined || polls_status === 1 ?
																			<a className="lineh-40"
																				 onClick={() => this.Deleteentrys(arrid, indext, true)}><Tooltip
																				title="删除"
																				placement={"bottom"}><i
																				className="iconfont icon-htmal5icon19 font-20 color-grey-c"></i></Tooltip></a>
																			: ""}
																	</p>) : (<p className="df mb20">
													<span className="color-grey-6 mr10 w60 font-16 lineh-40"
																style={{textAlign: "center"}}>选项</span>

																	<TextArea
																		autosize={{minRows: 1, maxRows: 5}}
																		className="mr20 TextAreas"
																		value={itemt.answer_text}
																		style={{
																			"height": "45px",
																			"max-height": "9.0072e+15px",
																			"overflow-y": "hidden",
																			"line-height": "35px",
																		}}
																		onInput={(e) => this.HandleInputChanges(e, indexo, indext)}></TextArea>
																	{polls_status === undefined || polls_status === 1 ?
																		<a className="lineh-40"
																			 onClick={() => this.Deleteentrys(arrid, indext, false)}><Tooltip
																			title="删除" placement={"bottom"}><i
																			className="iconfont icon-htmal5icon19 font-20 color-grey-c"></i></Tooltip></a>
																		: ""}
																</p>)}
															</div>
														)
													})}

													<div className="df">
														{itemo.question.question_type === 1 ? (
																<div className="ml10">
																	<div style={{minWidth: "1100px"}}>
																		{polls_status === undefined || polls_status === 1 ?
																			<ActionBtn style="grey" className="mr20 mt5"
																								 onClick={() => this.Ewoption(itemo.question.id, itemo)}>新增选项</ActionBtn>

																			: ""}
																		{polls_status === undefined || polls_status === 1 ?

																			(newoption === false ?
																				<ActionBtn style="grey" className="mr20 mt5"
																									 onClick={() => this.Addanotheroption(itemo.question.id)}>新增其他选项</ActionBtn>
																				: "")
																			: ""}
																		<span className="fr mt5">
                        <ActionBtn style="greyBack" className="mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo)}>保存</ActionBtn>
																			{
																				polls_status && polls_status < 2 ?
																					<ActionBtn style="blue" className=" w100"
																										 onClick={() => this.Deleteadddomtwo(indexo, itemo)}>保存并继续</ActionBtn>
																			:""
																			}
                      </span>
																	</div>
																</div>


															)


															: itemo.question.question_type === 2 ? (
																	//////////////////////////////////////////// 可选
																	<div>
																		<div style={{minWidth: "1100px"}}>
																			<div>
                                                        <span
																													className="color-grey-6 mr20 font-16 lineh-40 fl">可选</span>
																				<div className="mr40 flex1 ">
																					{/*可选最小*/}
																					<style>
																						{
																							`
																			.ant-select-selection .ant-select-selection-selected .ant-select-selection__rendered .ant-select-selection-selected-value{
																				"width":"100%";
                                  "height": "80%";
																	"margin-top": "5px";
																 "margin-left": "5px";
																 textAlign: "center";
																 "display": "block";
																 "opacity": "1";
																			}
																	`
																						}
																					</style>
																					<Select className="fl  w100"
																									onChange={(value) => this.HandleGradationGroupChangee(value, indexo, itemo.question.max_choices, itemo.question.answers.length)}
																									value={itemo.question.min_choices === null || itemo.question.min_choices === undefined ||itemo.question.min_choices === "null"|| itemo.question.min_choices === 0 || itemo.question.min_choices === "0"?"0": itemo.question.min_choices}
																					>
																						<Option value={String("0")}>--</Option>
																						{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																							return (
																								indext >= 1 ? <Option value={String(indext + 1)}>{indext + 1}</Option> : ""
																							)
																						})}
																					</Select>
																					<span
																						className="ml10 mr10 color-grey-6 lineh-40 fl">~</span>
																					{/*可选最大*/}
																					<Select className="fl w100"
																									onChange={(value) => this.HandleGradationGroupChangeee(value, indexo,itemo.question.min_choices,itemo.question.answers.length)}
																									value={itemo.question.max_choices === null || itemo.question.max_choices === undefined ||itemo.question.max_choices === "null"|| itemo.question.max_choices === 0 || itemo.question.max_choices === "0"?"0": itemo.question.max_choices}
																					>
																						<Option value={String("0")}>--</Option>
																						{itemo.question.answers === undefined ? "" : itemo.question.answers.map((itemt, indext) => {
																							return (
																								indext >= 1 ? <Option value={String(indext + 1)}>{indext + 1}</Option> : ""

																							)
																						})}
																					</Select>
																					<span
																						className="ml10 mr20 color-grey-6 lineh-40 fl font-16">项</span>
																					<span
																						className="color-grey-9 fl lineh-40">（学生答题时，系统对其选择的选项个数进行限制，--表示不限制）</span>
																				</div>

																			</div>
																		</div>
																	</div>
																)

																: (<div style={{minWidth: "1100px"}}></div>)

														}
													</div>
													<div>
														{itemo.question.question_type === 2 ?
															(
																polls_status === undefined || polls_status === 1 ?
																	<div className="clearfix mt30 ml10" >

																		<div><ActionBtn style="grey" className="mr20 fl mt5"
																										onClick={() => this.Ewoption(itemo.question.id, itemo)}>新增选项</ActionBtn>

																			{
																				newoption === false ? <ActionBtn style="grey" className="mr20 fl mt5"
																																				 onClick={() => this.Addanotheroption(itemo.question.id)}>新增其他选项</ActionBtn> : ""
																			}

																		</div>


																		<span className="fr mt5">
                        <ActionBtn style="greyBack" className=" mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo)}>保存</ActionBtn>
																			{
																				polls_status&&polls_status<2?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo)}>保存并继续</ActionBtn>
																					:""
																			}
                      </span>
																	</div>


																	:
																	<div className="clearfix mt30" >
														<span className="fr mt5">
                        <ActionBtn style="greyBack" className=" mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo)}>保存</ActionBtn>
															{
																polls_status&&polls_status<2?
											 <ActionBtn style="blue" className=" w100"
																	onClick={() => this.Deleteadddomtwo(indexo, itemo)}>保存并继续</ActionBtn>
																	:""
															}
                      </span>
																	</div>
															)

															: itemo.question.question_type === 3 ?
																<div className="clearfix mt30">
												<span className="fr">
                        <ActionBtn style="greyBack" className="mr20 w100"
																	 onClick={() => this.Deleteadddom(indexo)}>取消</ActionBtn>
                        <ActionBtn style="blue" className="mr20 w100"
																	 onClick={() => this.Deleteadddomthree(indexo, itemo)}>保存</ActionBtn>
													{
														polls_status&&polls_status<2?
															<ActionBtn style="blue" className=" w100"
																				 onClick={() => this.Deleteadddomtwo(indexo, itemo)}>保存并继续</ActionBtn>
															:""
													}

                      </span>
																</div>
																:
																""}


													</div>
												</div>


											return (
												<div>
													{resultDomtwo}
												</div>
											)
										})}
									</div>
									:
									""
							}



						{polls_status === undefined || polls_status === 1 ?
							<div>
								{
									this.props.match.params.news === "new" ?
										this.state.Newedit === false ?
											<div>
												<div className="padding20-30">
													<ActionBtn style="green" className="mr20" onClick={() => this.addmysingles()}><i
														className="iconfont icon-tianjiafangda font-15 mr10"></i>单选题</ActionBtn>
													<ActionBtn style="green" className="mr20" onClick={() => this.addmydoubles()}><i
														className="iconfont icon-tianjiafangda font-15 mr10"></i>多选题</ActionBtn>
													<ActionBtn style="green" className="mr20" onClick={() => this.addmymainsint()}><i
														className="iconfont icon-tianjiafangda font-15 mr10"></i>主观题</ActionBtn>
												</div>
											</div>
											: ""
										:
										<div>
											<div className="padding20-30">
												<ActionBtn style="green" className="mr20" onClick={() => this.addmysingles()}><i
													className="iconfont icon-tianjiafangda font-15 mr10"></i>单选题</ActionBtn>
												<ActionBtn style="green" className="mr20" onClick={() => this.addmydoubles()}><i
													className="iconfont icon-tianjiafangda font-15 mr10"></i>多选题</ActionBtn>
												<ActionBtn style="green" className="mr20" onClick={() => this.addmymainsint()}><i
													className="iconfont icon-tianjiafangda font-15 mr10"></i>主观题</ActionBtn>
											</div>
										</div>
								}
							</div>
							: <div></div>}
					</div>
					</div>
					{
						this.props.match.params.news === "new" ?
							(this.state.Newedit === false ?
								<div
									style={{
										"display": "flex",
										"justify-content": "center",
										"align-items": "center",
										"width": "100%",
									}}
								>
									<li className="clearfix mt30 mb50">
										<a  className="defalutCancelbtn  fl mr20" onClick={() => this.props.history.goBack()}>取消</a>
										<a type="primary" className="defalutSubmitbtn fl"
											 onClick={() => this.submitQuestionnaire(this.props.match.params.news)}>提交</a>
									</li>


								</div>

								: "")
							:
							<div
								style={{
									"display": "flex",
									"justify-content": "center",
									"align-items": "center",
									"width": "100%",
								}}
							>
								<li className="clearfix mt30 mb50">
									<a   className="defalutCancelbtn fl mr20"onClick={() => this.props.history.goBack()}>取消</a>
									<a type="primary" className="  defalutSubmitbtn fl"
										 onClick={() => this.submitQuestionnaire(this.props.match.params.news)}>提交</a>
								</li>
							</div>
					}

					{/*</Form>*/}
				</div>
				<div ref='targetElement'></div>
			</div>
		)
	}

}

const WrappedPollNew = Form.create({name: 'taskPollNew'})(PollNew);
// RouteHOC()
export default (WrappedPollNew);
