import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal,Pagination, Table, Divider, Tag,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import {getImageUrl, NoneData, sortDirections,getRandomcode} from 'educoder';
import axios from 'axios';
import moment from 'moment';
import HomeworkModal from "../../coursesPublic/HomeworkModal";
import Modals from '../../../modals/Modals';
import CoursesListType from '../../coursesPublic/CoursesListType';
import DownloadMessageysl from "../../../modals/DownloadMessageysl";
import ModulationModal from "../../coursesPublic/ModulationModal";
import AllocationModal from "../../coursesPublic/AllocationModal";
import Associationmodel from '../../coursesPublic/Associationmodel';
import AccessoryModal from "../../coursesPublic/AccessoryModal";
import './Graduationclass.css';


const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const qs = require('qs');


//毕设任务列表
class GraduationTaskssettinglist extends Component{

	constructor(props){
		super(props)
		this.state={
			coursename:"",
			coursesearch:"",
			title_num:20,
			limit:20,
			title_value:"",
			fileList: [],
			contents: [{val:"",id:1}],
			type:true,
			taskslistdata:undefined,
			data:undefined,
			page:1,
			teacher_comment:null,
			task_status:undefined,
			cross_comment:null,
			search:null,
			order:"update_time",
			b_order:"desc",
			course_group:undefined,
			loadingstate:true,
			operationId:null,
			Allocationtype:false,
			task_Id:"",
			user_id:"",
			visibles:false,
			DownloadType:false,
			DownloadMessageval:undefined,
			commentstate:null
		}
	}

	componentDidMount(){
    let tab = this.props.tab;
		this.props.setTab && this.props.setTab(tab);


		let{teacher_comment,task_status,course_group,cross_comment,order,b_order,search}=this.state;
		this.seacthdata(teacher_comment,task_status,course_group,cross_comment,order,b_order,search,this.state.page);

		this.props.getsonar(teacher_comment, task_status, course_group, cross_comment, search)

    try{
      this.props.triggerRef(this)
    }catch(e){

		}
	}

	goback=()=>{
		// window.history.back(-1)
		// let courseId=this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
	  // this.props.history.push(this.props.current_user.first_category_url);
		// }
		// this.props.history.goBack()
		this.props.history.replace(`/courses/${this.state.taskslistdata.course_id}/graduation_tasks/${this.state.taskslistdata.graduation_id}`);
	}

	reInit=()=>{
		this.setState({
			course_groupslist:[],
			checkAllValue:false
		})
		let {commentstate, task_status, course_group, cross_comment, order, b_order, search} = this.state;
		this.seacthdata(commentstate, task_status, course_group, cross_comment, order, b_order, search,this.state.page);

		this.props.getsonar(commentstate, task_status, course_group, cross_comment, search)
  }

	seacthdata=(commentstate,task_status,course_group,cross_comment,order,b_order,search,pages)=>{
     let{page,limit}=this.state;

		// console.log(teacher_comment,task_status,course_group,cross_comment,order,b_order,search)
		let task_Id=this.props.match.params.task_Id;
		let url="/graduation_tasks/"+task_Id+"/tasks_list.json";
		// let user=this.props.user.user_id;
		//get 数组
		axios.get(url,{
			params: {
				teacher_comment:commentstate===null||commentstate===undefined?undefined:commentstate,
				task_status:task_status===null?undefined:task_status,
				course_group:course_group===null?undefined:course_group,
				cross_comment:cross_comment===null?undefined:cross_comment,
				order:order===null?undefined:order,
				b_order:b_order===null?undefined:b_order,
				search:search===null?undefined:search,
				page:pages,
				limit:20,
			},
			paramsSerializer: function(params) {
				return qs.stringify(params, {arrayFormat: 'brackets'})
			}
		}).then((result)=> {
			if(result.status===200){
				let datalist = [];
				let worklists = result.data.work_lists;
				if (worklists.length != 0) {

					for (var i = 0; i < worklists.length; i++) {
						datalist.push({
							name: worklists[i].name,
							number: (parseInt(pages)-1)*parseInt(limit)+(i+1),
							stduynumber: worklists[i].student_id,
							classroom: worklists[i].class_grouping_name,
							grouping: result.data.have_grouping === true ? worklists[i].grouping_name : null,
							submitstate: worklists[i].status === 0 ? "未提交" : worklists[i].status === 1 ? "按时提交" : worklists[i].status === 2 ? "延时提交" : "",
							turnovertime:worklists[i].update_time,
							associationitems:result.data.have_grouping==false?"": {name:worklists[i].project_info === undefined ?"--":  worklists[i].project_info.name,id:worklists[i].project_info===undefined?"":worklists[i].project_info.id},
							teacherrating: worklists[i].teacher_comment_score,
							crossrating: {cross_comment_score:worklists[i].cross_comment_score,cross_comment_num:worklists[i].cross_comment_num},
							finalscore: {work_score:worklists[i].final_score.work_score === null ? "--" : worklists[i].final_score.work_score,
								teacher_comment_score:worklists[i].teacher_comment_score,
								cross_comment_score:worklists[i].cross_comment_score,
								late_penalty:worklists[i].late_penalty,
								final_score:worklists[i].final_score,
								ultimate_score:worklists[i].ultimate_score
							},
							operation: this.props.isAdmin()?[{name: worklists[i].assign === true ? "分配" : "", id: worklists[i].id,status:worklists[i].status}, {
								name: "调分",
								id: worklists[i].id,
								status:worklists[i].status
							}, {name:"评阅", id: worklists[i].id,	status:worklists[i].status}]:[{name:"", id: worklists[i].id,
								status:worklists[i].status,view_work:worklists[i].view_work}],
						})
					}
				}
				this.setState({
					taskslistdata: result.data,
					data: datalist,
					loadingstate: false,
					end_time:result.data.end_time
				})
				this.props.setend_time(result.data.end_time)
			}
		}).catch((error)=>{
			console.log(error)
		})

	}
	TablePagination = (pagination, filters, sorter) => {
		// console.log(e.current);
		// this.setState({
		// 	page:e.current
		// })
		if (JSON.stringify(sorter) === "{}") {
			//没有选择
		} else {
			//stduynumber 学号
			try {
				//学生学号排序
				if (sorter.columnKey === "stduynumber") {
					let orderlumn = "";
					if (sorter.order === "ascend") {
						//升序
						orderlumn = "asc";
					} else if (sorter.order === "descend") {
						//降序
						orderlumn = "desc";
					}
					this.funorder("student_id", orderlumn)
				}
			} catch (e) {

			}

			//turnovertime 时间
			try {
				//学生学号排序
				if (sorter.columnKey === "turnovertime") {
					let orderlumn = "";
					if (sorter.order === "ascend") {
						//升序
						orderlumn = "asc";
					} else if (sorter.order === "descend") {
						//降序
						orderlumn = "desc";
					}
					this.funorder("update_time", orderlumn);
				}
			} catch (e) {

			}

			//finalscore 成绩
			try {
				//学生学号排序
				if (sorter.columnKey === "finalscore") {
					let orderlumn = "";
					if (sorter.order === "ascend") {
						//升序
						orderlumn = "asc";
					} else if (sorter.order === "descend") {
						//降序
						orderlumn = "desc";
					}
					this.funorder("work_score", orderlumn);
				}
			} catch (e) {

			}
		}
	}

	funteachercomment=(list,key)=> {

		let asum=undefined
		let {teacher_comment, task_status, course_group, cross_comment, order, b_order, search} = this.state;
		if(this.state.teacher_comment!=null&&list.length>0){
			if(this.state.teacher_comment.length>0){
				list.map((item,key)=>{
					this.state.teacher_comment.map((k,y)=>{
						if(item===k){
							list.splice(key, 1)
						}
					})
				})
			}
		}

	  let listype =list instanceof Array;
    if(listype===false){
			this.setState({
				teacher_comment:null,
				loadingstate:true,
				commentstate:null
			})
		}else{

			if(list.length>0){
			list.map((item,key)=>{
				if(key===0){
					asum=item;
				}
			})
			}else{
				asum=undefined
			}
			this.setState({
				teacher_comment:list,
				loadingstate:true,
				commentstate:asum,
			})
		}

			this.seacthdata(asum, task_status, course_group, cross_comment, order, b_order, search,this.state.page);
			this.props.getsonar(asum, task_status, course_group, cross_comment, search)
   	// if(list.length===key){
		// 	this.seacthdata(undefined, task_status, course_group, cross_comment, order, b_order, search,this.state.page);
		// 	this.props.getsonar(undefined, task_status, course_group, cross_comment, search)
		// }else{
		// 	this.seacthdata(list[0], task_status, course_group, cross_comment, order, b_order, search,this.state.page);
		// 	this.props.getsonar(list[0], task_status, course_group, cross_comment, search)
		//
		// }

	}




	funcross_comment=(e)=>{
		let {teacher_comment, task_status, course_group, order, b_order, search,commentstate} = this.state;

		this.setState({
			cross_comment:e.target.value===undefined||e.target.value===false?null:e.target.value,
			loadingstate:true
		})
		this.seacthdata(commentstate, task_status, course_group, e.target.value===undefined||e.target.value===false?"":e.target.value, order, b_order, search,this.state.page);
		this.props.getsonar(commentstate, task_status, course_group, e.target.value===undefined||e.target.value===false?"":e.target.value, search)
	}

	inputSearchValue=(e)=>{

		if(e.target.value===""){
			this.setState({
				search:null
			})
		}else{
			this.setState({
				search:e.target.value
			})
		}


	}

	searchValue=()=>{

		let {teacher_comment, task_status, course_group, cross_comment, order, b_order,search,commentstate} = this.state;
		this.setState({
			loadingstate:true
		})
		this.seacthdata(commentstate, task_status, course_group, cross_comment, order, b_order, search,this.state.page);
		this.props.getsonar(commentstate, task_status, course_group, cross_comment, search)
	}

	funorder = (value, newb_order) => {

		let {teacher_comment, task_status, course_group, cross_comment, b_order, search,commentstate} = this.state;
		this.setState({
			order: value,
			b_order: newb_order,
			loadingstate: true
		})
		this.seacthdata(commentstate, task_status, course_group, cross_comment, value, newb_order, search,this.state.page);
		this.props.getsonar(commentstate, task_status, course_group, cross_comment, search)
	}



	funtaskstatus=(checkedValues,key)=>{
		// console.log(checkedValues)

		let {teacher_comment, course_group, cross_comment, order, b_order, search,commentstate} = this.state;




		if(JSON.stringify(checkedValues)  === "[]"){
			// console.log(checkedValues);
			// 全部没选的时候是空数组
			this.setState({
				task_status:undefined,
				loadingstate:true
			})
			this.seacthdata(commentstate, null, course_group, cross_comment, order, b_order, search,this.state.page);
			this.props.getsonar(commentstate, null, course_group, cross_comment, search)
		}
		// else if(checkedValues.length ===key){
		// 	// 全部抖选中 自然就是查找全部 就是空
		// 	this.setState({
		// 		task_status:undefined,
		// 		loadingstate:true
		// 	})
		// 	this.seacthdata(teacher_comment, null, course_group, cross_comment, order, b_order, search,this.state.page);
		// }
		else {
			//选哪个就替换那个
			this.setState({
				task_status:checkedValues===key?null:checkedValues,
				loadingstate:true
			})
			this.seacthdata(commentstate, checkedValues===key?undefined:checkedValues, course_group, cross_comment, order, b_order, search,this.state.page);
			this.props.getsonar(commentstate, checkedValues===key?undefined:checkedValues, course_group, cross_comment, search)
		}


	}
	groupgroup=(checkedValues,key)=>{
		// console.log(checkedValues);
		// console.log(key);

		let {teacher_comment, task_status, cross_comment, order,b_order, search,commentstate} = this.state;

		if(JSON.stringify(checkedValues)  === "[]"){
			// console.log(checkedValues);
			// 全部没选的时候是空数组
			this.setState({
				course_group:undefined,
				loadingstate:true
			})
			this.seacthdata(commentstate, task_status, null, cross_comment, order, b_order, search,this.state.page);
			this.props.getsonar(commentstate,task_status, null, cross_comment, search)
		}
		// else if(checkedValues.length ===key){
		// 	// 全部抖选中 自然就是查找全部 就是空
		// 	this.setState({
		// 		course_group:undefined,
		// 		loadingstate:true
		// 	})
		// 	this.seacthdata(teacher_comment, task_status, null, cross_comment, order, b_order, search,this.state.page);
		//
		// }
		else {
			//选哪个就替换那个
			this.setState({
				course_group:checkedValues===key?null:checkedValues,
				loadingstate:true
			})
			this.seacthdata(commentstate, task_status, checkedValues===key?undefined:checkedValues, cross_comment, order, b_order, search,this.state.page);
			this.props.getsonar(commentstate,task_status, checkedValues===key?undefined:checkedValues, cross_comment, search)
		}



	}


	end=()=>{
		// this.homeworkstart()
		this.setState({
			modalname:"立即截止",
			visible:true,
			Topval:"学生将不能再提交作品",
			// Botvalleft:"暂不截止",
			// Botval:`本操作只对"提交中"的任务有效`,
			Cancelname:"暂不截止",
			Savesname:"立即截止",
			Cancel:this.cancelmodel,
			Saves:this.coursetaskend,
			typs:"end",
		})

	}
	//立即发布
	publish=()=>{
		let starttime= this.props.getNowFormatDates(1,1);
		let endtime=this.props.getNowFormatDates(2,1);
		// this.homeworkstart()
		this.setState({
			modalname:"立即发布",
			visible:true,
			Topval:"学生将立即收到毕设任务",
			// Botvalleft:"点击修改",
			// Botval:`本操作只对"未发布"的分班有效`,
			starttime:moment(moment(new Date())).format("YYYY-MM-DD HH:mm") ,
			starttimes:this.props.getNowFormatDates(1),
			typs:"start",
			endtime:endtime,
			Cancelname:"暂不发布",
			Savesname:"立即发布",
			Cancel:this.cancelmodel,
			Saves:this.homepublish,
		})
	}
	//立即发布
	homeworkstart=()=>{
		let coursesId=this.props.match.params.coursesId;
		let url="/courses/"+coursesId+"/all_course_groups.json";

		axios.get(url).then((response) => {

			if(response.status===200){
				this.setState({
					modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
					course_groups:response.data.course_groups,
				})
			}
		}).catch((error) => {
			console.log(error)
		});

	}


	homepublish=(ids,endtime)=>{
		let task_Id=this.props.match.params.task_Id;
		const cid = this.props.match.params.coursesId
		// let url = `/courses/${cid}/graduation_tasks/publish_task.json`;

		let url="/courses/"+cid+"/graduation_tasks/publish_task.json"
		axios.post(url,{
			task_ids:[task_Id],
			group_ids: this.state.course_groupslist,
			end_time:endtime,
		}).then((response)=>{
			if (response.data.status == 0) {
				this.props.showNotification(response.data.message);
				this.searchValue();
				this.cancelmodel();
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

	cancelmodel=()=>{

		this.setState({
			Modalstype:false,
			Loadtype:false,
			visible:false,
			Modulationtype:false,
			Allocationtype:false,
			Modalstopval:"",
			ModalCancel:"",
			ModalSave:"",
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
				this.searchValue();
				this.cancelmodel();
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

	setupdate=()=>{
	  this.searchValue()
	}

	showModulationtype=(id)=>{
		// console.log(id)

		this.setState({
			Modulationtype:true,
			operationId:id
		})

	}

	showAllocationModal=(id)=>{

		this.setState({
			Allocationtype:true,
			operationId:id
		})
	}


	saveModulationModal=(value,num)=>{
		let{teacher_comment,task_status,course_group,cross_comment,order,b_order,search,commentstate}=this.state;

		let {operationId}=this.state;
		// console.log(value,num)
		let url ="/graduation_works/"+operationId+"/adjust_score.json";
		axios.post(url,{
			score:num,
			comment:value
		}).then((result)=>{
			// console.log(result)
			if(result.data.status===0){
				this.seacthdata(commentstate,task_status,course_group,cross_comment,order,b_order,search,this.state.page);
				this.props.getsonar(commentstate,task_status, course_group, cross_comment, search)
				this.props.showNotification(result.data.message);
				this.cancelmodel();
				this.setState({
					Modalstype:false,
					Allocationtype:false,
					// Modalstopval:result.data.message,
					ModalSave:this.cancelmodel,
				})
			}

		}).catch((error)=>{
			console.log(error)
		})

	}

	saveAllocationModal=(value)=>{
		let {operationId}=this.state;
		let userid=parseInt(value)
		let url = "/graduation_works/"+operationId+"/assign_teacher.json";
		axios.post(url,{
			user_id:userid
		}).then((result)=>{
			// console.log(result)
			if(result.data.status===0){
				this.setState({
					Modalstype:true,
					Allocationtype:false,
					Modalstopval:result.data.message,
					ModalSave:this.cancelmodel,
				})
			}

		}).catch((error)=>{
			console.log(error)
		})
	}

	cannelAssociation=()=>{

		this.setState({
			Modalstype:true,
			Modalstopval:"确定要取消该项目关联？",
			ModalCancel:this.cannerassocition,
			ModalSave:this.savetassociton
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

	savetassociton=()=>{
		this.cannerassocition();
		let {taskslistdata}=this.state;
		let url = "/graduation_tasks/"+taskslistdata.task_id+"/graduation_works/cancel_relate_project.json";

		axios.get(url).then((result)=>{

			if(result.data.status===0){
				this.searchValue()
				// this.setState({
				// 	Modalstype:true,
				// 	Modalstopval:result.data.message,
				// 	ModalSave:this.cannerassocition,
				// 	loadtype:true
				// })
			}

		}).catch((error)=>{
			console.log(error)
		})

	}


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

	skipTop=()=>{
		this.scrollToAnchor("starttime")
		this.cancelmodel()
	}

	getcourse_groupslist=(id)=>{
		this.setState({
			course_groupslist:id
		})
	}

	//教师下面分页搜索入口
	paginationonChanges=(pageNumber)=>{
		this.setState({
			page: pageNumber,
		})
		let{teacher_comment,task_status,course_group,cross_comment,order,b_order,search,commentstate}=this.state;
		this.seacthdata(commentstate,task_status,course_group,cross_comment,order,b_order,search,pageNumber);
		this.props.getsonar(commentstate,task_status, course_group, cross_comment, search)
	}

	/// 确认是否下载
	confirmysl(url){

		let  {teacher_comment, task_status, course_group, cross_comment, order, b_order, search,commentstate} =this.state;

		let params ={
			teacher_comment:commentstate,
			task_status:task_status,
			course_group:course_group,
			cross_comment:cross_comment,
			order:order,
			b_order:b_order,
			search:search,
		}
		axios.get(url + '?export=true',{
			params
		}).then((response) => {
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
				this.props.slowDownload(getRandomcode(url))

				// this.props.showNotification(`正在下载中`);
				// window.open("/api"+url, '_blank');
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	Downloadcal=()=> {
		this.setState({
			DownloadType: false,
			DownloadMessageval: undefined
		})
	}
	render(){

		let { taskslistdata,data,page,limit,teacher_comment,task_status,cross_comment,search,loadingstate,
			course_group,Modalstype,Modalstopval,ModalCancel,ModalSave,modalname,Modulationtype,Allocationtype,visibles,
			visible,
			Topval,
			Topvalright,
			Botvalleft,
			Botval,
			starttime,
			endtime,
			Cancelname,
			Savesname,
			Cancel,
			Saves,
			course_groups
		} =this.state;

		  let columns = [{
			title: '序号',
			dataIndex: 'number',
			key: 'number',
			className:'edu-txt-center'
		}, {
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			className:'edu-txt-center',
			render: (text, record) => (
				<span>
				     <div style={{color:'#9A9A9A'}} className={"studentname"} title={record.name}>{record.name}</div>
		  	</span>
			),
		}, {
			title: '学号',
			dataIndex: 'stduynumber',
			key: 'stduynumber',
			className:'edu-txt-center',
				sorter: true,
				sortDirections: sortDirections,
			render: (text, record) => (
				<span>
             <div style={{color:'#9A9A9A'}} className={"studentnumber"} title={record.stduynumber}>{record.stduynumber}</div>
        </span>
			),
		}, {
			title: '分班',
			key: 'classroom',
			dataIndex: 'classroom',
			className:'edu-txt-center',
			render: (text, record) => (
				<span>
             <a style={{color:'#9A9A9A'}} className={"classroomclass"} title={record.classroom==="未分班"?"":record.classroom}>{record.classroom==="未分班"?"--":record.classroom}</a>
        </span>
			),
		}, {
			title: '分组',
			key: 'grouping',
			dataIndex: 'grouping',
			className:'edu-txt-center',
			render: (text, record) => (
				<span>
             <a  style={{color:'#676767'}}>{record.grouping}</a>
        </span>)
		},{
			title: '关联项目',
			dataIndex: 'associationitems',
			key: 'associationitems',
			className:'edu-txt-center',
			render: (text, record) => (
				<div>
					<a  style={{color:'#4CACFF'}} href={"/projects/"+record.associationitems.id} target={"_blank"}>
						<div className={"projectsdiv"} title={record.associationitems.name}>{record.associationitems.name}</div>
					</a>
				</div>
			),
		},{
			title: '提交状态',
			dataIndex: 'submitstate',
			key: 'submitstate',
			className:'edu-txt-center',
			render: (text, record) => (
				<span>
                <a style={{color:record.submitstate==="按时提交"?'#29BD8B':record.submitstate==="未提交"?"#9A9A9A":"#DD1717"}}>{record.submitstate}</a>
        </span>
			),
		}, {
			title: '更新时间',
			dataIndex: 'turnovertime',
			key: 'turnovertime',
			className:'edu-txt-center',
				sorter: true,
				defaultSortOrder: 'descend',
				sortDirections: sortDirections,
			render: (text, record) => (
				<span>
             <a style={{color:'#989898'}}>
	             {record.turnovertime===""?"--":moment(record.turnovertime).format('YYYY-MM-DD HH:mm')}
             </a>
        </span>
			),
		}, {
			title: '教师评分',
			key: 'teacherrating',
			dataIndex: 'teacherrating',
			className:'edu-txt-center',
			render: (text, record) => (
				<span>
						<Tooltip placement="bottom" title={record.teacherrating==="--"||record.teacherrating==="未批阅"?"未评阅":""}>
								 <a style={{color:parseInt(record.teacherrating)>90?'#DD1717':parseInt(record.teacherrating)>60&&parseInt(record.teacherrating)<90?"#FF6800":'#747A7F'}}>{record.teacherrating==="--"||record.teacherrating==="未批阅"?"--":record.teacherrating}</a>
						</Tooltip>
				</span>
			),
		}, {
			title: '交叉评分',
			key: 'crossrating',
			dataIndex: 'crossrating',
			className:'edu-txt-center',
			render: (text, record) => (
				<span>
						<Tooltip placement="bottom" title={record.crossrating.cross_comment_score==="--"||record.crossrating.cross_comment_score==="未批阅"?"未评阅":
							<pre>
								{record.crossrating.cross_comment_num}名老师进行了交叉评阅<br/>
								有效平均分：{record.crossrating.cross_comment_score}分
							</pre>}>
							<a style={{color:parseInt(record.crossrating.cross_comment_score)>90?'#DD1717':parseInt(record.crossrating.cross_comment_score)>60&&parseInt(record.crossrating.cross_comment_score)<90?"#FF6800":'#747A7F'}}>{record.crossrating.cross_comment_score==="--"||record.crossrating.cross_comment_score==="未批阅"?"--":record.crossrating.cross_comment_score}</a>
						</Tooltip>
					</span>
			),
		}, {

			title: '最终成绩',
			key: 'finalscore',
			dataIndex: 'finalscore',
			className:'edu-txt-center',
				sorter: true,
				sortDirections: sortDirections,
			render: (text, record) => (
				<span>
			 <Tooltip placement="right" title={record.finalscore.work_score==="--"?"未评阅":	<pre>
								{record.finalscore.final_score.username}({record.finalscore.final_score.login})<br/>
							  {record.finalscore.ultimate_score===true?"":"教师评分："+record.finalscore.teacher_comment_score+"分"}<br/>
				        {record.finalscore.cross_comment_score===undefined||record.finalscore.cross_comment_score==="未批阅"?"交叉评分：--":"交叉评分："+record.finalscore.cross_comment_score+"分"}<br/>
				        {record.finalscore.late_penalty===undefined?"":"迟交扣分："+record.finalscore.late_penalty+"分"}<br/>
							  最终成绩：{record.finalscore.work_score}分<br/>
							</pre>}>
						<a style={{color:parseInt(record.finalscore.work_score)>90?'#DD1717':parseInt(record.finalscore.work_score)>60&&parseInt(record.finalscore.work_score)<90?"#FF6800":'#747A7F'}}>{record.finalscore.work_score==="--"?"--":record.finalscore.work_score}</a>
			 </Tooltip>
			 </span>
			),
		},  {
				title: '操作',
				key: 'operation',
				width:'100px',
				dataIndex: 'operation',
				className:'edu-txt-center',
				render: operation => (
					<div style={{cursor: 'pointer'}}>
						{this.props.isAdmin()?operation.map((tag,key) => {
							return(
								<React.Fragment>
									{
										tag.name &&
										<Tooltip key={key} placement="bottom" title={tag.name==="分配"?taskslistdata&&taskslistdata.cross_comment===true?"":"指定该作品的交叉评阅人":tag.name==="调分"?<pre>调整学生最终成绩<br/>其它历史评分将全部失效</pre>:""}>
											{tag.name==="评阅"?<a target="_blank" style={{color:'#4CACFF',padding:"0px 5px"}} href={"/courses/"+courseId+"/graduation_tasks/"+tag.id+"/appraise"} >
													{tag.name}
												</a>
												:
												<span style={{color: tag.name === "调分" ? "#4CACFF" : '#4CACFF', padding: "0px 5px"}}
															onClick={tag.name==="调分"?()=>this.showModulationtype(tag.id):tag.name==="分配"?taskslistdata&&taskslistdata.cross_comment===true?"":"":""}>
													{tag.name==="分配"?taskslistdata&&taskslistdata.cross_comment===true?"":"":tag.name}
												</span>
											}
										</Tooltip>
									}
								</React.Fragment>
							)
						}):""}
						{
							this.props.isStudent()?
								operation.map((tag,key) => {
									return(
										<div key={key}>
											{tag.view_work===false?"--":<a style={{color:'#4CACFF'}} target="_blank" href={"/courses/"+courseId+"/graduation_tasks/"+tag.id+"/appraise"} >查看</a>}
										</div>
									)}
								):""
						}
					</div>

				),
			}];

		let courseId=this.props.match.params.coursesId;
		let position=this.props.match.params.position;
		let category_id=this.props.match.params.category_id;
		let task_Id = this.props.match.params.task_Id;

		if(this.props.isStudent()===true){

			columns.some((item,key)=> {
					if (item.title === "学号") {
					  columns.splice(key, 1)
						return true
					}
				}
			)

		}

		if(taskslistdata&&taskslistdata.course_group_count<=0){

			columns.some((item,key)=> {
					if (item.title === "分班") {
						columns.splice(key, 1)
						return true
					}
				}
			)

		}

     if(taskslistdata&&taskslistdata.cross_comment===false){

			 columns.some((item,key)=> {
					 if (item.title === "交叉评分") {
						 columns.splice(key, 1)
						 return true
					 }
				 }
			 )

		 }
		if(taskslistdata&&taskslistdata.have_project===false){

			columns.some((item,key)=> {
					if (item.title === "关联项目") {
						columns.splice(key, 1)
						return true
					}
				}
			)

		}


		if(taskslistdata&&taskslistdata.have_grouping===false){


			columns.some((item,key)=> {
					if (item.title === "分组") {
						columns.splice(key, 1)
						return true
					}
				}
			)

		}


		return(
			<React.Fragment>

				<div>
					<style>
						{
							`
				 		.projectsdiv{
	          width: 100px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						 }
					 .ant-table-tbody>tr>td, .ant-table-thead>tr>th{
						     padding:16px 5px;
						 }
						`
						}
					</style>

					{taskslistdata&&taskslistdata.have_grouping===true||
					taskslistdata&&taskslistdata.have_project===true||
					taskslistdata&&taskslistdata.cross_comment===true?<style>
						{
							`
						 .studentnumber{
						     text-overflow: ellipsis;
									white-space: nowrap;
									width: 105px;
									display: block;
									overflow: hidden;
									margin: 0px auto;
									cursor: default;
						 }
						 .studentname{
					    overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 90px;
							margin: 0px auto;
						 }

					`
						}</style>:""}
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

					{/*立即发布*/}
					<HomeworkModal
						starttimes={this.state.starttimes}
						typs={this.state.typs}
						modalname={modalname}
						visible={visible}
						Topval={Topval}
						Topvalright={Topvalright}
						Botvalleft={Botvalleft}
						Botval={Botval}
						starttime={starttime}
						endtime={endtime}
						Cancelname={Cancelname}
						Savesname={Savesname}
						Cancel={Cancel}
						Saves={Saves}
						course_groups={course_groups}
						modaltype={this.state.modaltype}
						getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
					/>



					{Allocationtype===true?<AllocationModal
						modalname={"交叉评阅分配"}
						visible={Allocationtype}
						teacherlist={taskslistdata&&taskslistdata.teacher_list}
						Cancelname={"取消"}
						Savesname={"保存"}
						Cancel={this.cancelmodel}
						Saves={(value)=>this.saveAllocationModal(value)}
						closable={false}
						footer={null}
						destroyOnClose={true}
						centered={true}
					/>:""}

					{Modulationtype===true?<ModulationModal
						modalname={"调分"}
						visible={Modulationtype}
						Cancelname={"取消"}
						Savesname={"保存"}
						Cancel={this.cancelmodel}
						Saves={(value,num)=>this.saveModulationModal(value,num)}
						closable={false}
						footer={null}
						destroyOnClose={true}
						centered={true}
					/>:""}

					{/*关联项目*/}
					{visibles===true?
						<Associationmodel
						modalname={"关联项目"}
						visible={visibles}
						Cancel={()=>this.Cancel()}
						taskid={taskslistdata&&taskslistdata.task_id}
						funlist={()=>this.searchValue()}
					  />
					:""}

					{this.state.avisible===true?<AccessoryModal
						{...this.props}
						modalname={"补交附件"}
						visible={this.state.avisible}
						Cancelname={"取消"}
						Savesname={"确认"}
						Cancel={this.Cancelvisible}
						categoryid={taskslistdata.work_id}
						setupdate={this.setupdate}
					/>:""}

					<DownloadMessageysl
						{...this.props}
						value={this.state.DownloadMessageval}
						modalCancel={this.Downloadcal}
						modalsType={this.state.DownloadType}

					/>

					{ taskslistdata && taskslistdata ?
						// 教师列表
						this.props.isAdmin() ?
									<div className="stud-class-set">
										<div className="clearfix edu-back-white" >
											{this.props.questionslist&&this.props.questionslist.status===0?"":<ul className="clearfix" style={{padding:'20px 30px 10px 30px'}}>

												<li className="clearfix">
													<span className="fl mr10 color-grey-8">教师评阅：</span>

													<span className="fl mr25">
													  <a  id="graduation_comment_no_limit"  alue={null} className={teacher_comment===null?"pl10 pr10 check_on":"pl10 pr10 "} onClick={this.funteachercomment}>全部</a>
												  </span>
													<CheckboxGroup value={teacher_comment} onChange={(e)=>this.funteachercomment(e,taskslistdata.search_assistants&&taskslistdata.search_assistants.teacher_comment.length)} style={{ paddingTop: '4px'}}>
													{taskslistdata.search_assistants && taskslistdata.search_assistants.teacher_comment && taskslistdata.search_assistants.teacher_comment.map((item,key)=>{
														return(
															<span key={key}>
																  <Checkbox value={item.id} key={item.id} className="fl ">{item.name}
																	  <span>({item.count})</span>
																  </Checkbox>
															  </span>
																)
															})}
													</CheckboxGroup>
													<div className="fr search-new" style={{marginBottom:'1px',marginRight:"0px"}}>
														<Search
															placeholder="请输入姓名或学号搜索"
															id="subject_search_input"
															value={search}
															onInput={this.inputSearchValue}
															onSearch={this.searchValue}
															autoComplete="off"
														></Search>
													</div>

												</li>


												<li className="clearfix">
													<span className="fl mr10 color-grey-8">作品状态：</span>

													<span className="fl mr25">
                          <a  id="graduation_comment_no_limit" className={task_status===null||task_status===undefined?"pl10 pr10 check_on":"pl10 pr10 "}  onClick={()=>this.funtaskstatus([])}>全部</a>
                         </span>

													<CheckboxGroup value={task_status} onChange={(e)=>this.funtaskstatus(e,taskslistdata.search_assistants&&taskslistdata.search_assistants.task_status.length)} style={{ paddingTop: '4px'}}>
														{taskslistdata.search_assistants&&taskslistdata.search_assistants.task_status.map((item,key)=>{
															return(
																<span key={key}>
                                <Checkbox value={item.id}  key={item.id} className="fl ">{item.name}
	                                <span>({item.count})</span>
                                </Checkbox>
                            </span>
															)
														})}
													</CheckboxGroup>


												</li>


												{taskslistdata.search_assistants&&taskslistdata.search_assistants.course_group_info.length!=0?<li className="clearfix">
													<span className="fl mr10 color-grey-8">分班情况：</span>
														<div className="fl mr25">
														  <a  id="graduation_comment_no_limit" className={course_group===null||course_group===undefined?"pl10 pr10 check_on":"pl10 pr10 "} onClick={()=>this.groupgroup([])}>全部</a>
													  </div>
														<div className="fl groupList" style={{maxWidth: '945px'}}>
															<CheckboxGroup value={course_group} onChange={(e)=>this.groupgroup(e,taskslistdata.search_assistants&&taskslistdata.search_assistants.course_group_info.length)} style={{width: '1000px', paddingTop: '4px'}}>


																{taskslistdata.search_assistants&&taskslistdata.search_assistants.course_group_info.map((item,key)=>{
																	return(
																		<span key={key}  className={"mt10"}>
																	<Checkbox value={item.course_group_id} key={item.course_group_id} className="fl ">{item.group_group_name}
																		<span>({item.count})</span>
																	</Checkbox>
															</span>
																	)
																})}
															</CheckboxGroup>
														</div>

												</li>:""}



												{taskslistdata.search_assistants&&taskslistdata.search_assistants.cross_comment.length===0?"":<li className="clearfix">
													<span className="fl mr10 color-grey-8">交叉评阅：</span>

													<span className="fl mr25">
                             <a  id="graduation_comment_no_limit" value={null} className={cross_comment==null?"pl10 pr10 check_on":"pl10 pr10"} onClick={this.funcross_comment}>全部</a>
                          </span>

													{taskslistdata.search_assistants&&taskslistdata.search_assistants.cross_comment.map((item,key)=>{
														return(
															<span key={key}>
																<Checkbox value={item.id} className="fl" checked={parseInt(cross_comment)===item.id?true:false} onClick={this.funcross_comment}>{item.name}
																	<span>({item.count})</span>
																</Checkbox>
                          		</span>
														)
													})}

												</li>}

											</ul>}

											{this.props.questionslist&&this.props.questionslist.status===0?"":<div id="graduation_work_list" style={{padding:'0px 30px 10px 30px'}}>
												<style>
													{`
														.edu-menu-lists li:hover {
															background: #f0f0f0  !important;
														}
														.edu-menu-lists li:hover a{
																color: #666 !important;
														}
													`}
												</style>
												<div className="clearfix">
													{this.props.isAdmin()===true?<span className="fl color-grey-6 font-12">
														<span className="color-orange-tip">{taskslistdata&&taskslistdata.work_count}</span>
														个检索结果（{taskslistdata&&taskslistdata.all_work_count} 学生）</span>:""}

												</div>

												{this.props.isStudent()===true?
													<div className="clearfix">
																<span className="mr15 color-grey9">
																	<span className={"color-orange"}>{taskslistdata&&taskslistdata.commit_count}
																	</span> 已交</span>
														<span className="mr15 color-grey9">
																	<span className={"color-orange"}>{taskslistdata&&taskslistdata.uncommit_count}
																	</span> 未交</span>
														{taskslistdata&&taskslistdata.left_time.status===null?"":<Tooltip title={taskslistdata&&taskslistdata.left_time.status} placement="bottom">
																<span className="mr15 color-grey9">
																	{taskslistdata&&taskslistdata.left_time.status} :
																	<span className={"ml10 color-orange"}>
																	{taskslistdata&&taskslistdata.left_time.time}</span>
																</span>
														</Tooltip>}
													</div>
													:""}

											</div>}

											{
												JSON.stringify(data)==="[]" ?
													<NoneData></NoneData>
													:
													<div className={"justify break_full_word new_li edu-back-white"} style={{minHeight: "480px"}}>
														<style>
														{`
              	          		.ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																top: 72%;
															}
						                }
						              	`}
													</style>
												<div className="edu-table edu-back-white ">
												{data===undefined?"":<Table
													dataSource={data}
													columns={columns}
													// pagination={{  //分页
													// 	total: taskslistdata&&taskslistdata.work_count, //数据总数量
													// 	pageSize: 20,  //显示几条一页
													// 	current:page,
													// }}
													pagination={false}
													loading={loadingstate}
													onChange={this.TablePagination}
													className="edu-txt-center"
												/>}
												</div>
											</div>
											}

										</div>
										{
											taskslistdata && taskslistdata.work_count && taskslistdata.work_count  > limit ?
												<div className="edu-txt-center mt30 mb20">
													<Pagination showQuickJumper current={page}
																onChange={this.paginationonChanges} pageSize={limit}
																total={taskslistdata.work_count}></Pagination>
												</div>
												: ""
										}
									</div>
									:
							// 学生列表
							this.props.isStudent()||this.props.isNotMember()?

										<div className="stud-class-set ">

											<div className="clearfix edu-back-white" >

												{this.props.isNotMember()?<ul className="clearfix" style={{padding:'20px 30px 10px 30px'}}>

													<li className="clearfix">
														<span className="fl mr10 color-grey-8">教师评阅：</span>

														 <span className="fl mr25">
	                             <a  id="graduation_comment_no_limit"  alue={null} className={teacher_comment===null?"pl10 pr10 check_on":"pl10 pr10 "} onClick={this.funteachercomment}>全部</a>
	                           </span>

														<CheckboxGroup value={teacher_comment} onChange={(e)=>this.funteachercomment(e,taskslistdata.search_assistants&&taskslistdata.search_assistants.teacher_comment.length)}  style={{ paddingTop: '4px'}}>
														{taskslistdata.search_assistants&&taskslistdata.search_assistants.teacher_comment.map((item,key)=>{
															return(
														  <span key={key}>
	                              <Checkbox value={item.id} key={item.id} className="fl ">{item.name}
		                              <span>({item.count})</span>
	                              </Checkbox>
                              </span>
															)
														})}
														</CheckboxGroup>

														<div className="fr search-new" style={{marginBottom:'1px'}}>
															<Search
																placeholder="请输入姓名或学号搜索"
																id="subject_search_input"
																value={search}
																onInput={this.inputSearchValue}
																onSearch={this.searchValue}
																autoComplete="off"
															></Search>
														</div>

													</li>


													<li className="clearfix">
														<span className="fl mr10 color-grey-8">作品状态：</span>

														<span className="fl mr25">
                              <a  id="graduation_comment_no_limit" className={task_status===null|| task_status===undefined?"pl10 pr10 check_on":"pl10 pr10 "}  onClick={()=>this.funtaskstatus([])}>全部</a>
                            </span>

														<CheckboxGroup value={task_status} onChange={(e)=>this.funtaskstatus(e,taskslistdata.search_assistants&&taskslistdata.search_assistants.task_status.length)} style={{ paddingTop: '4px'}}>
														{taskslistdata.search_assistants&&taskslistdata.search_assistants.task_status.map((item,key)=>{
																return(
																	<span key={key}>
                                <Checkbox value={item.id} key={item.id}  className="fl ">{item.name}
	                                <span>({item.count})</span>
                                </Checkbox>
                            </span>
																)
															})}
														</CheckboxGroup>


													</li>


													{taskslistdata.search_assistants&&taskslistdata.search_assistants.course_group_info.length!=0?<li className="clearfix">
														<span className="fl mr10 color-grey-8">分班情况：</span>

														<span className="fl mr25">
			                          <a  id="graduation_comment_no_limit" className={course_group===null||course_group===undefined?"pl10 pr10 check_on":"pl10 pr10 "} onClick={()=>this.groupgroup([])}>全部</a>
			                      </span>

														<CheckboxGroup value={course_group} onChange={(e)=>this.groupgroup(e,taskslistdata.search_assistants&&taskslistdata.search_assistants.course_group_info.length)} style={{ paddingTop: '4px'}}>
															{taskslistdata.search_assistants&&taskslistdata.search_assistants.course_group_info.map((item,key)=>{
																return(
																	<span key={key}>
                                <Checkbox value={item.course_group_id} key={item.course_group_id}  className="fl ">{item.group_group_name}
	                                <span>({item.count})</span>
                                </Checkbox>
                            </span>
																)
															})}
														</CheckboxGroup>
													</li>:""}



													{taskslistdata.search_assistants&&taskslistdata.search_assistants.cross_comment.length===0?"":<li className="clearfix">
														<span className="fl mr10 color-grey-8">交叉评阅：</span>

														<span className="fl mr25">
                             <a  id="graduation_comment_no_limit" value={null} className={cross_comment==null?"pl10 pr10 check_on":"pl10 pr10"} onClick={this.funcross_comment}>全部</a>
                          </span>

														{taskslistdata.search_assistants&&taskslistdata.search_assistants.cross_comment.map((item,key)=>{
															return(
																<span key={key}>
                              <Checkbox value={item.id} className="fl" checked={parseInt(cross_comment)===item.id?true:false} onClick={this.funcross_comment}>{item.name}
	                              <span>({item.count})</span>
                              </Checkbox>
                          </span>
															)
														})}

													</li>}

												</ul>:""}


												<div id="graduation_work_list" style={{ padding: '18px 40px 10px',height: '56px'}}>
														{this.props.isStudent()===true?
															<div className="clearfix">
																<span className="mr15 color-grey9">
																	<span className={"color-orange"}>{taskslistdata&&taskslistdata.commit_count}
																	</span> 已交</span>
																<span className="mr15 color-grey9">
																	<span className={"color-orange"}>{taskslistdata&&taskslistdata.uncommit_count}
																	</span> 未交</span>
																{taskslistdata&&taskslistdata.left_time.status===null?"":<Tooltip title={taskslistdata&&taskslistdata.left_time.status} placement="bottom">
																<span className="mr15 color-grey9">
																	{taskslistdata&&taskslistdata.left_time.status} :
																	<span className={"ml10 color-orange"}>
																	{taskslistdata&&taskslistdata.left_time.time}</span>
																</span>
																</Tooltip>}
															</div>
															:""}
												</div>
												{
													JSON.stringify(data) === "[]" ?

														<div id="forum_list" className="forum_table">
															<div className="mh650 edu-back-white">
																<div
																	className="edu-tab-con-box clearfix edu-txt-center">
																	<img className="edu-nodata-img mb20"
																		 src={getImageUrl("images/educoder/nodata.png")}/>
																	<p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>
																</div>
															</div>

														</div>
														:

														<div className={"justify break_full_word new_li edu-back-white"}
															 style={{minHeight: "480px"}}>
															<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																 top: 72%;
																 }

						                .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
                                 text-align: center;
						                }
						              `}</style>
															<div className="edu-table edu-back-white ">
																{data === undefined ? "" : <Table
																	dataSource={data}
																	columns={columns}
																	pagination={false}
																	loading={loadingstate}
																	onChange={this.TablePagination}
																	className="edu-txt-center"
																/>}
															</div>
														</div>

												}
											</div>
											{
												taskslistdata && taskslistdata.work_count && taskslistdata.work_count  > limit ?
													<div className="edu-txt-center mt30 mb20">
														<Pagination showQuickJumper current={page}
																	onChange={this.paginationonChanges} pageSize={limit}
																	total={taskslistdata.work_count}></Pagination>
													</div>
													: ""
											}
										</div>
								:""
						:""}


				</div>

			</React.Fragment>

		)
	}
}

export default GraduationTaskssettinglist;
