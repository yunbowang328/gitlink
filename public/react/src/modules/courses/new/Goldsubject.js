import React, {Component} from "react";
import {Form, Select, Input, Button, Checkbox, DatePicker,Spin,Icon,AutoComplete,InputNumber,Breadcrumb} from "antd";
import ApplyForAddOrgModal from '../../user/modal/ApplyForAddOrgModal';
import axios from 'axios';
import "../css/Courses.css";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import Modals from '../../modals/Modals';
import {WordsBtn, ActionBtn} from 'educoder';


const { Option } = Select;


const dateFormat = 'YYYY-MM-DD';

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
	};
}
function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}
// function disabledDate(current) {
// 	console.log(current);
// 	return current && current < moment().endOf('day').subtract(1, 'days');
// }
// function disabledDateysl(current) {
// 	console.log(current);
// 	return current && current < moment().endOf('day').add(1, 'days');
// }

class Goldsubject extends Component {

	constructor(props) {
		super(props)
		this.state = {
			coursedata: undefined,
			searchlist: [],
			searchlistscholl:[],
			listvalue: undefined,
			fetching:false,
			subject_id:"",
			start_date:"",
			addonAfteronelenone:"",
			addonAfteronelentwo:"",
			Whethertocreateanewclassroom:true,
			bordebool:false,
			smallspinning:false,
			bottonloading:false
		}
	}
	// disabledEndDate= endValue => {
	// 	const { datatimetwo } = this.state;
	// 	var startValue =datatimetwo
	// 	if (!endValue || !startValue) {
	// 		return false;
	// 	}
	// 	return endValue.valueOf() < startValue.valueOf();
	// };

	isabledStartDate = (startValue) => {

		const { datatime } = this.state;
		var datatimes="";
		if(datatime!==undefined){
			datatimes=datatime;
			datatimes=moment(datatimes, dateFormat).subtract(0, 'days');;
		}else {
			datatimes=datatime;
		}
		if (!startValue || !datatimes) {
			return false;
		}
		return startValue.valueOf() > datatimes.valueOf();
	};

	disabledEndDate = (endValue) => {
		// console.log("---------------------------------")
		// console.log(moment(new Date(), dateFormat).add(1, 'days'));
		// console.log(moment(new Date(), dateFormat).add(2, 'days'));
		const { datatimetwo } = this.state;
		var startvalue="";
		if(datatimetwo!==undefined){
			startvalue=datatimetwo;
			startvalue=moment(startvalue, dateFormat).add(1, 'days');
		}else {
			startvalue=datatimetwo;
		}
		// console.log("结束时间");
		// console.log(endValue);
		// console.log(startvalue);
		// console.log(datatimetwo);
		if (!endValue || !startvalue) {
			return false;
		}
		return endValue.valueOf() < startvalue.valueOf();
	};

	componentDidMount() {
    // console.log("新建精品课堂的数据");
    // console.log(this.props);

		let coursesId = this.props.match.params.coursesId;
		let user_school=this.props.current_user&&this.props.current_user.user_school;
		// this.getschool("")
		// this.Searchvalue("")
		if (coursesId != undefined) {
			let url = "/courses/" + coursesId + "/settings.json"
			axios.get(url).then((result) => {

				let data = result.data;
				this.props.form.setFieldsValue({
					course: data.course_list_name,
					classroom: data.name,
					period: data.class_period===undefined?'':data.class_period===null?'':data.class_period===null?'':data.class_period==="null"?'':data.class_period+"",
					credit: data.credit===undefined?'':data.credit===null?'':data.credit===null?'':data.credit==="null"?'':data.credit+"",
					checkboxgroup: data.course_module_types,
					Realnamecertification: data.authentication,
					Professionalcertification:data.professional_certification,
					starttime: data.start_date === undefined ? "" : moment(data.start_date, dateFormat),
					endtime: data.end_date === undefined ? "" : moment(data.end_date, dateFormat),
					school:data.school

				});
				// starttime
				this.setState({
					datatimetwo: data.start_date === undefined ? "" : moment(data.start_date, dateFormat),
					datatime: data.end_date === undefined ? "" : moment(data.end_date, dateFormat),
					is_public: data.is_public,
					Realnamecertification: data.authentication,
					Professionalcertification:data.professional_certification,
					name: data.name,
					class_period: data.class_period,
					addonAfteronelenone: data.class_period===undefined?'':data.class_period===null?'':data.class_period===null?'':data.class_period==="null"?'':data.class_period,
					credit:  parseFloat(data.credit),
					addonAfteronelentwo:data.credit===undefined?'':data.credit===null?'':data.credit===null?'':data.credit==="null"?'':data.credit,
					course_module_types: data.course_module_types,
					school:data.school,
					Whethertocreateanewclassroom:false,
				});
				this.handleSearchschool(data.school);
			}).catch((error) => {
				console.log(error);
			})
		}else{
			let subjectid= this.props.match.params.subjectid;
			let url = "/courses/new.json"
			axios.get(url,{params:{
					subject_id:subjectid, //这是带过来的值
				}}).then((response) => {
				if (response) {
					// this.goback
					if(response.data){
						// console.log("获取Goldsubject.js");
						// console.log(response.data);
						if(response.data.status===0){
							this.props.form.setFieldsValue({
								classroom: response.data.course_name,
								name: response.data.name,
							});
						}
					}
				}
			}).catch((error) => {
				console.log(error);
			})
			// console.log(user_school);
			this.props.form.setFieldsValue({
				school:user_school,
				starttime:moment(new Date(),dateFormat),
			});
			this.setState({
				school:user_school,
				Whethertocreateanewclassroom:true,
				datatimetwo: moment(new Date(),dateFormat),
			});
			this.handleSearchschool(user_school);
		}


	}
	componentDidUpdate(prevProps) {
		if(prevProps.current_user !== this.props.current_user){
			let user_school=this.props.current_user&&this.props.current_user.user_school;
			this.props.form.setFieldsValue({
				school:user_school,
			});
			this.setState({
				school:user_school,
			});

			this.handleSearchschool(user_school);
		}
	}
	onChangeTimepublishs = (date, dateString) => {
		// console.log("结束时间11111111111");
		// console.log(dateString);

		if(dateString===""){
			this.setState({
				datatime: undefined,
			})
			// console.log("结束时间111111111116");

			this.props.form.setFieldsValue({
				endtime:undefined,
			});
		}else{
			// console.log("结束时间111111111117");

			this.setState({
				datatime: dateString,
			});
			this.props.form.setFieldsValue({
				endtime: moment(dateString, dateFormat),
			});
		}

	};
	onChangeTimepublishstwo = (date, dateString) => {
		// console.log("结束时间22222222222");
		// console.log(dateString);
		if(dateString===""){
			// console.log("结束时间222222222223");
			this.setState({
				datatimetwo: undefined,
			})
			this.props.form.setFieldsValue({
				starttime: undefined,
			});
		}else{
			// console.log("结束时间222222222224");

			this.setState({
				datatimetwo: dateString,
			})
			this.props.form.setFieldsValue({
				starttime: moment(dateString, dateFormat),
			});
		}

	};
	cancelmodel = () => {

		this.setState({
			Modalstype: false,
			Loadtype: false,
			Modalstopval: "",
			ModalCancel: "",
			ModalSave: "",
		})

	}

	scrollToAnchor = (anchorName) => {
		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
		}
	}

   //提交数据的地方
	handleSubmit = (e) => {

		e.preventDefault();

		let first_category_url=this.props.current_user.first_category_url;
		let coursesId = this.props.match.params.coursesId;
		var is_public =this.props.match.params.id;
		let {datatime,datatimetwo} = this.state
		// console.log(is_public)
		if (coursesId != undefined) {
			// 编辑

			this.props.form.validateFields((err, values) => {
				if (err) {
					return;
				}
				// if(values.course===""||values.course===undefined){
				// 	this.scrollToAnchor("iscourse")
				// 	return
				//
				// }
				// if(values.classroom===""||values.classroom===undefined){
				// 	this.scrollToAnchor("isclassroom")
				// 	return
				// }
				//
				// if(values.school===""||values.school===undefined){
				// 	// this.scrollToAnchor("isschool")
				// 	return
				//
				// }

				if(values.checkboxgroup.length===0){
					this.setState({
						Modalstype:true,
						Modalstopval:"请您至少添加一个课堂模块，",
						ModalsBottomval:"否则您将无法新建课堂。",
						Loadtype:true,
						ModalSave:()=>this.cancelmodel(),
					})
					return
				}


				if (!err) {
          var classroomysl=values.classroom+"";

          try {
						if(classroomysl){
							if(classroomysl.length>60){
								classroomysl=classroomysl.substring(0,60);
							}
						}
					}catch (e) {

					}


					// console.log('Received values of form: ', values);
					var datasysl={
						// subject_id:128, //这是带过来的值 编辑就不要传值了
						name: classroomysl,
						class_period: values.period,
						credit: parseFloat(values.credit),
						start_date:moment(values.starttime).format("YYYY-MM-DD"),
						end_date: moment(values.endtime).format("YYYY-MM-DD"),
						is_public: this.state.is_public, //这是也是带过来的值
						course_module_types: values.checkboxgroup,
						school:values.school
					};
				  try {
						// console.log("327");
						// console.log(datasysl);
						// console.log(JSON.stringify(datasysl));
						// console.log("88887777");
						// console.log(moment(values.starttime).format("YYYY-MM-DD"));
						// console.log(moment(values.endtime).format("YYYY-MM-DD"));
					}catch (e) {

					}
					this.setState({
						bottonloading:true
					})
					let url = "/courses/" + coursesId + ".json";
					axios.put(url,
						datasysl
					).then((response) => {
						// debugger
						if (response.data.status === 0) {
							// this.goback()

							window.location.href=first_category_url;
							var yslGuideone = window.localStorage.getItem('yslGuideone');
							try {
								if(yslGuideone=== null){
									window.localStorage.setItem('yslGuideone', "true");
									return
								}
								if(yslGuideone=== undefined){
									window.localStorage.setItem('yslGuideone', "true");
									return
								}
							}catch (e) {
								this.setState({
									bottonloading:false
								})
							}

						}else{
							this.setState({
								bottonloading:false
							})
						}
					}).catch((error) => {
						console.log(error)
						this.setState({
							bottonloading:false
						})
					})
				}

				// console.log("错误信息信息信息1");
				// console.log(err);
				// console.log(values.starttime);
				// console.log(values.endtime);

			});
		} else {
			this.props.form.validateFields((err, values) => {
				// console.log("错误信息信息信息2");
				console.log(err);
				if (err) {
					return;
				}
				// if(values.course===""||values.course===undefined){
				// 	this.scrollToAnchor("iscourse")
				// 	return
				// }
				// if(values.classroom===""||values.classroom===undefined){
				// 	this.scrollToAnchor("isclassroom")
				// 	return
				// }
				// if(values.school===""||values.school===undefined){
				// 	// this.scrollToAnchor("isschool")
				// 	return
				//
				// }
				if (!err) {
					// debugger
					//新建
					// console.log('Received values of form: ', values);
				  let subjectid = this.props.match.params.subjectid;
					let url = "/courses.json";
					var  ysldatas={
						subject_id:subjectid, //这是带过来的值
						name: values.classroom,
						class_period: values.period,
						credit: parseFloat(values.credit),
						start_date:moment(values.starttime).format("YYYY-MM-DD"),
						end_date: moment(values.endtime).format("YYYY-MM-DD"),
						is_public: is_public, //这是也是带过来的值
						course_module_types: values.checkboxgroup,
						school:values.school
					};

					this.setState({
						bottonloading:true
					})
					axios.post(url,
						ysldatas
					).then((response) => {
						if (response.status === 200) {

							// this.goback
							window.location.href=response.data.first_category_url;
							var yslGuideone = window.localStorage.getItem('yslGuideone');
							try {
								if(yslGuideone=== null){
									window.localStorage.setItem('yslGuideone', "true");
									return
								}
								if(yslGuideone=== undefined){
									window.localStorage.setItem('yslGuideone', "true");
									return
								}
							}catch (e) {
								this.setState({
									bottonloading:false
								})
							}
						}
					}).catch((error) => {
						console.log(error)
						this.setState({
							bottonloading:false
						})
					})
				}
			});
		}

	}

	goback = () => {

		// if(this.props.match.params.coursesId===undefined){
		//  this.props.history.push("/courses");
		// }else{
		//  this.props.history.push(this.props.current_user.first_category_url);
		// }
		// window.history.go(-1)
		if(this.state.Whethertocreateanewclassroom===true){
			var subjectids=this.props.match.params.subjectid;
			window.location.href=`/paths/${subjectids}`
		}else{
			// this.props.history.goBack();
			window.location.href=`/courses/${this.props.match.params.coursesId}/informs`
		}
	}

	onCheckAllChange = (e) => {
		// console.log(e.target.checked)
		this.setState({
			is_public: e.target.checked == true ? 1 : 0,
		});
	}
	onchanges =(e)=>{
		this.setState({
			Realnamecertification:e.target.checked,
		})
		// console.log(e.target.checked);
	}
	onchangess=(e)=>{
		this.setState({
			Professionalcertification:e.target.checked,
		})
		// console.log(e.target.checked);
	}
	Searchvalue=(value)=>{

		let url="/courses/search_course_list.json";
		axios.post(url,{
			search:value
		}).then((result)=>{
			// console.log(result.data)
			if (result.data.message===undefined) {

				this.setState({
					searchlist: result.data.course_lists,
					// course:value,

				})
			}
			// this.props.form.setFieldsValue({
			//     course:value
			// })
		}).catch((error)=>{
			console.log(error)
		})
	}
	handleSearch=(value)=>{


		if(value!=""){
			this.props.form.setFieldsValue({
				classroom:value,
				// course:value
			});
			this.Searchvalue(value)
		}

	};

	handleChange=(e)=>{
		console.log(e);
		this.props.form.setFieldsValue({
			// course:value,
			classroom:e.target.value,
		})
		if(e.target.value){
			if(e.target.value.length>60){
				this.setState({
					bordebool:true,
				})
			}else if(e.target.value.length===0){
				this.setState({
					bordebool:true,
				})
			}else{
				this.setState({
					bordebool:false,
				})
			}
		}else{
			this.setState({
				bordebool:true
			})

		}

	};

	handleSearchschool=(value)=>{
		this.setState({
			smallspinning:true
		})
		if(value!="") {
			// this.props.form.setFieldsValue({
			// 	// school: value,
			// 	fetching: true,
			// });
			this.setState({
				fetching: true,
				school: value,
			})
			this.getschool(value)
		}else{
			this.setState({
				smallspinning:false
			})
		}
	};

	handleChangeschools=(value)=>{

		// this.props.form.setFieldsValue({
		// 	// school: value,
		// 	fetching: true,
		// });
		// this.setState({
		// 	fetching: true
		// })
	}

	handleChangeschool=(value)=>{

		this.setState({
			school:value
		});
		this.props.form.setFieldsValue({
			school:value,
		})
	};

	getschool=(value)=>{

		// this.props.form.setFieldsValue({
		// 	school: value
		// })
		let url="/schools/school_list.json";
		axios.get(url,{
			params: {
				search: value
			}
		}).then((result)=>{
			if(result){
				if (result.data.status===0) {
					this.setState({
						searchlistscholl: result.data.school_names,
						smallspinning:false
					})
					if(result.data.school_names.length!=0){
						this.setState({
							fetching: false
						})
					}
				}else{
					this.setState({
						smallspinning:false
					})
				}
			}
		}).catch((error)=>{
			console.log(error)
			this.setState({
				smallspinning:false
			})
		})
	}
	showApplyForAddOrgModal = () => {
		this.applyForAddOrgForm.setVisible(true)
	}
	render() {
		let {datatime,datatimetwo,school,bordebool,searchlistscholl,Whethertocreateanewclassroom,addonAfteronelenone,addonAfteronelentwo,name} = this.state;
		const {getFieldDecorator} = this.props.form;
		const propsWithoutForm = Object.assign({}, this.props)
		delete propsWithoutForm.form
		const options = this.state.searchlist && this.state.searchlist.map(d => <Option key={d.name} value={d.name}>{d.name}</Option>);
		const optionschool  = this.state.searchlistscholl===undefined?"":this.state.searchlistscholl===null?"":this.state.searchlistscholl==="[]"?"":this.state.searchlistscholl.map(z => <Option key={z} value={z}>{z}</Option>);
		// console.log(this.props.current_user.user_school)
		// form合并了
		// console.log("获取到的数据");
		// console.log(this.state);
		// console.log(this.props);
		// console.log(this.props.current_user);
		var addonAfterone=this.props.form&&this.props.form.getFieldValue('period');
		var addonAfteronelen=0;
		  if(addonAfterone){
				addonAfteronelen=String(addonAfterone).length;
			}
		var	addonAftertwo=this.props.form&&this.props.form.getFieldValue('credit');
		var addonAfteronelens=0;
		  if(addonAftertwo){
				addonAfteronelens=String(addonAftertwo).length;
			}
		var addonAfterthree=this.props.form&&this.props.form.getFieldValue('classroom');
		var addonAfteronelens3=0;
		if(addonAfterthree){
			addonAfteronelens3=String(addonAfterthree).length;
		}

		return (
			<React.Fragment>

				<div>
					<style>
						{
							`

							.color-green-light {
									color: #45E660!important;
							}
				     .line15{line-height: 15px;}
							`
						}
					</style>
					<ApplyForAddOrgModal ref="applyForAddOrgModal" wrappedComponentRef={(form) => this.applyForAddOrgForm = form}  schoolName={school}
															 {...propsWithoutForm}></ApplyForAddOrgModal>
					{/*提示*/}
					<Modals
						modalsType={this.state.Modalstype}
						modalsTopval={this.state.Modalstopval}
						modalCancel={this.state.ModalCancel}
						modalSave={this.state.ModalSave}
						modalsBottomval={this.state.ModalsBottomval}
						loadtype={this.state.Loadtype}
					/>

					<div className="newMain clearfix">

						<div className={"educontent mb20"}>
							{/*<Breadcrumb className="mt10" separator=">">*/}
							{/*	<Breadcrumb.Item>*/}
							{/*		<a href="/courses">翻转课堂</a>*/}
							{/*	</Breadcrumb.Item>*/}
							{/*	<Breadcrumb.Item>{Whethertocreateanewclassroom===true?"新建课堂":"编辑课堂"}</Breadcrumb.Item>*/}
							{/*</Breadcrumb>*/}
							<p className="clearfix mb20 mt10">
								<a className="btn colorgrey fl hovercolorblue " href={Whethertocreateanewclassroom===true?"/courses":this.props.current_user&&this.props.current_user.first_category_url}
								>{Whethertocreateanewclassroom===true?"翻转课堂":name}</a>
								<span className="color-grey-9 fl ml3 mr3">&gt;</span>
								<span className="fl cdefault">{Whethertocreateanewclassroom===true?"新建课堂":"编辑课堂"}</span>
							</p>

							<div style={{width: '100%', height: '50px'}}>
								<p className=" fl color-black  summaryname">{Whethertocreateanewclassroom===true ? "新建课堂" : "编辑课堂"}</p>
								<a onClick={this.goback} className="color-grey-6 fr font-16 ml30  line15 mr20"></a>
							</div>
							<style>
								{`
									.ant-col-12{
										width:800px;
									}
								 `}
							</style>

							<Form onSubmit={this.handleSubmit} className={"edu-back-white newcourses"}>
								{/*内容*/}
								<style>
									{`
										.ant-select-dropdown{
											// top: 221px !important;
											// left: 115px !important;
											height: 160px;
										}
									.ant-select-dropdown-menu{
												height: 160px;
										}
										.construction .ant-input{
												margin-left: 0px !important;
										}
									 .construction {
												margin-left: 11px;
										}

									 .construction .ant-select-selection__placeholder, .ant-select-search__field__placeholder {
											 line-height: 28px;
											 z-index: 2000;
										}

								    .line15{line-height: 15px;}
								`}
								</style>

								{/*<div className="stud-class-set bor-bottom-greyE padding10200 ">*/}
								{/*	<div className={"TabsWarpcourse"}>*/}
								{/*		<Form.Item label="课程名称">*/}
								{/*			{getFieldDecorator('course', {*/}
								{/*				rules: [{required: true, message: "不能为空"}],*/}
								{/*			})(*/}

								{/*				<AutoComplete style={{ width: 280 }}*/}
								{/*											onSearch={this.handleSearch}*/}
								{/*											onChange={this.handleChange}*/}
								{/*											className={"fl construction "}*/}
								{/*											placeholder="例如：数据结构"*/}
								{/*				>*/}
								{/*					{options}*/}
								{/*				</AutoComplete>*/}
								{/*			)}*/}
								{/*			<span  className={"newcoursestitle fl"}>*/}
                {/*                            /!*（错误示例：数据结构2017本部；数据结构2017秋季；数据结构2017电子商务1班）*!/*/}
								{/*				<p className="ant-progress-text">*/}
								{/*																	<Icon  style={{ color: '#52c41a' }} type="check-circle" theme="filled"/>*/}
								{/*																	<span className={"color-grey-9 font-12 ml5"}>正确示例：数据结构</span>*/}
                {/*                                </p>*/}
                {/*                                <p className="ant-progress-text">*/}
								{/*																	 <Icon style={{ color: 'red' }} theme="filled" type="close-circle"/>*/}
                {/*                                   <span className={"color-grey-9 font-12 ml5"}>错误示例：数据结构2019春</span>*/}
                {/*                                </p>*/}
                {/*                        </span>*/}
								{/*			<div id='iscourse'></div>*/}
								{/*		</Form.Item>*/}
								{/*	</div>*/}

								{/*</div>*/}

								<style>
									{
										`
										.ml19{
											margin-left:19px;
											}
										`
									}
								</style>
								<div className="stud-class-set bor-bottom-greyE  padding1020 ">
									<style>{
										`
										.yslzxueshis .ant-input{
										border-right: none !important;
										height: 40px !important;
										width: 655px !important;
										}
										 .yslzxueshisy span .ant-input-group-addon{
											width: 65px !important;
											background-color: #fafafa!important;
										 }
										.yslzxueshisy .ant-input-group-addon{
											width: 65px !important;
											background-color: #fafafa!important;
										 }

										`
									}</style>
									<style>
										{bordebool===false?
											`
											.ant-input:hover {
													// border: 1px solid #d9d9d9;
											}
											`:
											`
												.ant-input:hover {
													// border: 1px solid #f5222d;
											}
											`
										}
									</style>
														<Form.Item label="课堂名称">
															{getFieldDecorator('classroom', {
																rules:  [{required: true, message: "不能为空"}],
															})(

																<AutoComplete
																							style={{width: 704}}
																							onSearch={this.handleSearch}
																							className={"fl construction yslzxueshis "}
																							dataSource={options}
																>
																	<Input className="yslzxueshisy " placeholder="例如：数据结构" onInput={this.handleChange}  addonAfter={String(addonAfteronelens3)+"/60"}  maxLength={60} />
																</AutoComplete>
															)}
										{/*<span className={"newcoursestitle fl"}>*/}
                    {/*                        /!*（如果本学期包含多个班级，只需创建一个课堂然后在课堂内部建立不同的分班）*!/*/}
										{/*	<p className="ant-progress-text">*/}
                    {/*                              	<Icon  style={{ color: '#52c41a' }} type="check-circle" theme="filled"/>*/}
                    {/*                                <span className={"color-grey-9 font-12 ml5"}>正确示例：数据结构2019春季班级</span>*/}
                    {/*                            </p>*/}
                    {/*                            <p className="ant-progress-text">*/}
                    {/*                          	   <Icon style={{ color: 'red' }} theme="filled" type="close-circle"/>*/}
                    {/*                               <span className={"color-grey-9 font-12 ml5"}>错误示例：2019春季班级数据结构</span>*/}
                    {/*                            </p>*/}
                    {/*                    </span>*/}
										<div id='isclassroom'></div>
									</Form.Item>


								</div>

								<div className="stud-class-set bor-bottom-greyE padding1020 coursenavbox coursenavboxtow yslinputcourput">
									<style>
										{`
												.ant-form-item{
														margin-bottom: 10px !important;
												}
											`}
									</style>
									<style>{
										`
											.yslzxueshi .ant-input{
											border-right: none !important;
											height: 40px !important;
											width: 236px !important
											}
											.yslzxueshi  .ant-input-group {
													width: 280px !important;

											}
											.yslzxueshi .ant-input-group-addon{
												width: 44px !important;
												background-color: #fafafa!important;
											 }
											`
									}</style>
									<Form.Item
										label="总学时"
										hasFeedback
									>
										{getFieldDecorator("period",
											{
												rules:[{
													pattern: new RegExp(/^[0-9]+([.]{1}[0-9]+){0,1}$/, "g"),
													message: '必须是数值'
												},
													{
														max:5,
														message: '不能超过5个字符',
													}]}
										)(
											<Input id="period"  placeholder="例如：30" className="yslzxueshi" addonAfter={String(addonAfteronelen)+"/5"}  maxLength={5}/>
										)}
									</Form.Item>
									<Form.Item
										label="学分"
										hasFeedback
									>
										{getFieldDecorator("credit",
											{
												rules:[{
													pattern: new RegExp(/^[0-9]+([.]{1}[0-9]+){0,1}$/, "g"),
													message: '必须是数值'
												},
													{
														max:5,
														message: '不能超过5个字符',
													}
												]}
										)(
											<Input id="credit"  placeholder="例如：3"  className="yslzxueshi" addonAfter={String(addonAfteronelens)+"/5"}  maxLength={5}/>
										)}
									</Form.Item>
									<Form.Item
										label="开始时间"
									>
										{getFieldDecorator("starttime", {
											rules: [{type: 'object',required: true, message: "开始时间不能为空"}],
										})(
											<span className="fl mt5">
														<DatePicker
															showToday={false}
															placeholder="请选择开始时间"
															// showTime={{format: 'HH:mm'}}
															locale={locale}
															format={dateFormat}
															width={"210px"}
															value={datatimetwo === undefined ? "" :datatimetwo === null ? "" : moment(datatimetwo, dateFormat)}
															disabledTime={disabledDateTime}
															dropdownClassName="hideDisable"
															onChange={this.onChangeTimepublishstwo}
														/>
										</span>
										)}
									</Form.Item>
									<Form.Item
										label="结束时间"
									>
										{getFieldDecorator("endtime", {
											rules: [{type: 'object',
												required: true, message: "结束时间不能为空"}],
										})(
											<span className="fl mt5">
														<DatePicker
															showToday={false}
															placeholder="请选择结束时间"
															// showTime={{format: 'HH:mm'}}
															locale={locale}
															format={dateFormat}
															width={"210px"}
															value={datatime === undefined ? "" :datatime === null ? "" : moment(datatime, dateFormat)}
															disabledTime={disabledDateTime}
															dropdownClassName="hideDisable"
															onChange={this.onChangeTimepublishs}
														/>
										</span>
										)}
									</Form.Item>
								</div>

								<div className="stud-class-set bor-bottom-greyE padding10200 coursenavbox">
									<Form.Item
										label="课堂模块"
										hasFeedback
									>

										{getFieldDecorator("checkboxgroup", {
											initialValue: [
												"announcement","online_learning","shixun_homework","common_homework",
											],
										})(
											<Checkbox.Group style={{ marginTop: "10px"}}>
												<Checkbox value={"announcement"} className="fl" defaultChecked disabled>公告栏</Checkbox>
												<Checkbox value={"online_learning"} className="fl" defaultChecked disabled>在线学习</Checkbox>
												<Checkbox value={"shixun_homework"} className="fl">实训作业</Checkbox>
												<Checkbox value={"common_homework"} className="fl">普通作业</Checkbox>
												<Checkbox value={"exercise"} className="fl">试卷</Checkbox>
												<Checkbox value={"poll"} className="fl">问卷</Checkbox>
												<Checkbox value={"attachment"} className="fl">资源</Checkbox>
												<Checkbox value={"board"} className="fl">讨论</Checkbox>
												<Checkbox value={"course_group"} className="fl">分班</Checkbox>
												<Checkbox value={"statistics"} className="fl">统计</Checkbox>
											</Checkbox.Group>
										)}
									</Form.Item>
								</div>
								{/*<div className="stud-class-set bor-bottom-greyE padding10200 coursenavbox  height100px" >*/}
                {/*                    <span  className={"fl"}>*/}
                {/*                    <Form.Item*/}
								{/*											label="加入课堂条件"*/}
								{/*											style={{margin: 0}}*/}
								{/*										>*/}
                {/*                        {getFieldDecorator("Realnamecertification")(*/}
								{/*													<Checkbox checked={this.state.Realnamecertification} onChange={this.onchanges}>已实名认证</Checkbox>*/}
								{/*													// <Checkbox.Group style={{ width: "800px",marginTop: "10px"}}>*/}
								{/*													//   <Checkbox value={"authentication"} className="fl">已实名认证</Checkbox>*/}
								{/*													//   <Checkbox value={"professional_certification"} className="fl">已职业认证 <span className="ml30" > (勾选，则通过邀请码加入课堂的用户,需要完成相关认证才能加入课堂)</span></Checkbox>*/}
								{/*													// </Checkbox.Group>*/}
								{/*												)}*/}
                {/*                    </Form.Item>*/}
                {/*                    </span>*/}
								{/*	<span className={"fl mt40"}>*/}
                {/*                    <Form.Item*/}
								{/*											label=""*/}
								{/*										>*/}
                {/*                        {getFieldDecorator("Professionalcertification")(*/}
								{/*													<Checkbox checked={this.state.Professionalcertification}   onChange={this.onchangess}>已职业认证<span*/}
								{/*														className="coursesselects"> (勾选，则通过邀请码加入课堂的用户,需要完成相关认证才能加入课堂)</span></Checkbox>*/}
								{/*												)}*/}
                {/*                    </Form.Item>*/}
                {/*                   </span>*/}
								{/*</div>*/}
								{/*<div className="stud-class-set padding10200 coursenavbox bor-bottom-greyE">*/}
								{/*	<Form.Item*/}
								{/*		label="公开设置"*/}
								{/*		hasFeedback*/}
								{/*	>*/}
								{/*		{getFieldDecorator("publicclass")(*/}
								{/*			<Checkbox id="publicclass"*/}
								{/*								onChange={this.onCheckAllChange}*/}
								{/*								checked={this.state.is_public}*/}
								{/*								className="fl">公开课堂</Checkbox>*/}
								{/*		)}*/}
								{/*		<span className={"coursesselect"}>（选中后本课堂对所有用户可见，否则仅本课堂成员可见）</span>*/}
								{/*	</Form.Item>*/}
								{/*</div>*/}

								<div className="stud-class-set padding10200 mb20">

									<Form.Item label="课堂所属单位">
										{getFieldDecorator('school', {
											rules: [{required: true, message: "不能为空"}],
										})(
											<AutoComplete style={{ width: 280 }}
																		onSearch={this.handleSearchschool}
												// onChange={this.handleChangeschools}
																		onInput={this.handleSearchschool}
																		className={"fl construction mr10 yslzxueshis2 "}
																		placeholder="请输入并选择课本堂的所属单位"
																		dataSource={optionschool}
											>
											</AutoComplete>
										)}
										<span className={"fl ml20  "}>
													 <Spin size="small" spinning={this.state.smallspinning}/>
										 </span>
										<span  className={"newcoursestitle fl"}>
																					{/*（输入内容出现匹配的下拉菜单←同账号管理的单位信息填写）*/}
                      </span>
										<div id='isschool'></div>
									</Form.Item>

									{searchlistscholl.length===0&&this.state.fetching===true?<div style={{height:"20px",lineHeight:"20px"}} className="ml20">
																			<span>
																				<span style={{color: '#CDCDCD'}}>未找到包含“{school}”的高校，</span>
																				<span style={{color: '#4CACFF', cursor: 'pointer'}} onClick={this.showApplyForAddOrgModal}>申请新增</span>
																			</span>
									</div>:""}

								</div>



								<div className={"FAFAFA"}>
									<Form.Item >
										<div className="clearfix mt40 mb30">

											<Button type="primary" htmlType="submit" loading={this.state.bottonloading} className="defalutSubmitbtn fl mr20">
												提交
											</Button>

											{/*<a className="defalutSubmitbtn fl mr20">提交</a>*/}
											<a className="defalutCancelbtn fl" onClick={this.goback}>取消</a>
										</div>
									</Form.Item>
								</div>
							</Form>
						</div>
					</div>
				</div>

			</React.Fragment>

		)
	}
}
const WrappedCoursesNewAppGoldclass = Form.create({name: 'goldsubject'})(Goldsubject);

export default WrappedCoursesNewAppGoldclass;


