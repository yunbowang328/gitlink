import React, {Component} from "react";
import CoursesListType from '../coursesPublic/CoursesListType';
import {getRandomNumber, getRandomcode, sortDirections} from 'educoder';
import ShixunWorkModal from './Shixunworkdetails/ShixunWorkModal';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import OneSelfOrderModal from "../coursesPublic/OneSelfOrderModal";
import DownloadMessageysl from '../../modals/DownloadMessageysl';
import NoneData from '../coursesPublic/NoneData';
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
	notification,
	Pagination,
	Spin,
} from "antd";
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import '../css/members.css'
import "../common/formCommon.css"
import '../css/Courses.css'
import './style.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import Startshixuntask from "../coursesPublic/Startshixuntask";

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
const qs = require('qs');
//课堂作业设置


//代码查重
class ShixunStudentWork extends Component {
	constructor(props) {
		super(props);
		this.state = {
			props: props,
			data: undefined,
			page: 1,
			limit:10,
			loadingstate: true,
			order: "code_rate",
			b_order:"desc",
			task_status: [],
			course_group_info: [],
			teacherdata: undefined,
			checkedValuesine: undefined,
			checkedValuesineinfo: [],
			resultint: 0,
			search: undefined,
			visible: false,
			userid: 0,
			visibles: false,
			userids: 0,
			viewtrainingdata: {},
			group_infolist: [],
			duplicatechecking: false,
			datalist:undefined,
			showmodel:false,
			jobsettingsdata:undefined,
			DownloadType:false,
			DownloadMessageval:undefined,
			lunxun:true,
			starttimesend:undefined,
		}
	}

	componentDidMount() {
		console.log("ShixunStudentWork");
		console.log("componentDidMount");
		this.getTrainingjobsettings();
		this.props.triggerRef(this);

	}
	// componentWillReceiveProps(nextProps) {
	// 	// console.log("+++++++++916");
	// 	// console.log(nextProps);
	// 	// console.log(this.props)
	// 	// console.log(this.props.isAdmin());
	// 	if (nextProps.code_review != this.props.code_review) {
	// 		if (nextProps.code_review !== undefined) {
	// 			console.log("diaoyonglwangluo1");
	// 			this.getTrainingjobsettings();
	// 		}
	// 	}
	//
	// }


	getTrainingjobsettings=()=>{
		this.getupdata();
		this.getTrainingjobsetting();
}
	// 获取数据地方
	getTrainingjobsetting = () => {

		var homeworkid = this.props.match.params.homeworkid;
		let url = `/homework_commons/${homeworkid}/settings.json`;
		axios.get(url).then((result) => {
			if(result !== undefined){
				this.setState({
					jobsettingsdata: result,

				})
				this.props.Getdataback(result,result.data);

			}
	})
	}

	getupdata=(pages)=>{
		let {order,b_order,page,limit,group_infolist,search}=this.state;

		var homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/code_review_results.json";

		axios.get(url,{params:{
				order:order,
				sort:b_order,
				page:pages===undefined?page:pages,
				limit:limit,
				group_ids:group_infolist,
				search:search
			},
			paramsSerializer: function(params) {
				return qs.stringify(params, {arrayFormat: 'brackets'})
			}}).then((response) => {
			if (response.data.status === undefined || response.data.status === 0) {
				if(response.data!=undefined){
					if(response.data.status!=-2){
						let datas=[];
						let list=response.data.users_reviews;
						for(var i=0; i<list.length; i++){
							datas.push({
								number:i+1,
								name:list[i].username,
								stduynumber:list[i].student_id,
								classroom:parseInt(list[i].code_rate),
								operating:list[i].user_id
							})
						}
						this.setState({
							data: response.data,
							datalist:datas,
							lunxun:false,
							duplicatechecking:false,
						});
						return;
					}
				}
			}

			if (response.data.status === -2) {
				this.setState({
					duplicatechecking: true
				})
				notification.open({
					message:"提示",
					description: response.data.message
				});
			}

			if (response.data.status === -1) {
				notification.open({
					message:"提示",
					description: response.data.message
				});
			}
			this.setState({
				lunxun:true,
			})
			setInterval(() => {
				console.log("开始轮询了");
				if(this.state.lunxun===true){
					console.log("开始轮询了getupdata");
					this.getupdatasysk();
				}
			}, 5000);


		}).catch((error) => {
			console.log(error)
		});

		let query = this.props.location.pathname;
		const type = query.split('/');
		this.setState({
			shixuntypes:type[3]
		})
	};
	getupdatasysk=(pages)=>{
		let {order,b_order,page,limit,group_infolist,search}=this.state;

		var homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/code_review_results.json";

		axios.get(url,{params:{
				order:order,
				sort:b_order,
				page:pages===undefined?page:pages,
				limit:limit,
				group_ids:group_infolist,
				search:search
			},
			paramsSerializer: function(params) {
				return qs.stringify(params, {arrayFormat: 'brackets'})
			}}).then((response) => {
			if (response.data.status === undefined || response.data.status === 0) {
				if(response.data!=undefined){
					if(response.data.status!=-2){
						console.log();
						let datas=[];
						let list=response.data.users_reviews;
						for(var i=0; i<list.length; i++){
							datas.push({
								number:i+1,
								name:list[i].username,
								stduynumber:list[i].student_id,
								classroom:parseInt(list[i].code_rate),
								operating:list[i].user_id
							})
						}
						this.setState({
							data: response.data,
							datalist:datas,
							lunxun:false,
							duplicatechecking:false,
						});
					}
				}
			}


		}).catch((error) => {
			console.log(error)
		});


	}

	getcode_review_results=(order,b_order,page,limit,group_infolist,search)=>{
		var homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/code_review_results.json";

		axios.get(url,{params:{
			  order:order,
				sort:b_order,
				page:page,
				limit:limit,
				group_ids:group_infolist,
				search:search
		},
		paramsSerializer: function(params) {
			return qs.stringify(params, {arrayFormat: 'brackets'})
		}}).then((response) => {
			if (response.data.status === undefined || response.data.status === 0) {
				if(response.data!=undefined){
					if(response.data.status!=-2) {
						let datas = [];
						let list = response.data.users_reviews;
						for (var i = 0; i < list.length; i++) {
							datas.push({
								number: i + 1,
								name: list[i].username,
								stduynumber: list[i].student_id,
								classroom: parseInt(list[i].code_rate),
								operating: list[i].user_id
							})
						}
						this.setState({
							data: response.data,
							datalist: datas
						})
					}

				}
			}

			if (response.data.status === -2) {
				this.setState({
					duplicatechecking: true
				})
				notification.open({
					message:"提示",
					description: response.data.message
				});
			}

			if (response.data.status === -1) {
				notification.open({
					message:"提示",
					description: response.data.message,
				});
			}

		}).catch((error) => {
			console.log(error)
		});
	}


	TablePagination = (pages) => {

		this.setState({
			page:pages
		})
    this.getupdata(pages)
	}

	inputSearchValue=(e)=>{

		if(e.target.value===""){
			this.setState({
				search:undefined
			})
		}else{
			this.setState({
				search:e.target.value
			})
		}


	}

	searchValue=()=>{
		let {order,b_order,page,limit,group_infolist,search} = this.state;
		this.getcode_review_results(order,b_order,page,limit,group_infolist,search)
	}

	funorder = (value, myyslorder) => {

		let {order,b_order,page,limit,group_infolist,search} = this.state;
		this.setState({
			loadingstate:true,
			order: value,
			b_order: myyslorder
		})
		this.getcode_review_results(value, myyslorder, page, limit, group_infolist, search)

	}
	groupgroup=(checkedValues)=>{
	  let {order,b_order,page,limit,search} = this.state;
		this.setState({
			group_infolist:checkedValues
		})
   this.getcode_review_results(order,b_order,page,limit,checkedValues,search)
	}

	Viewstudenttraininginformation =(list)=>{
		window.location.href =list
	}

	workshowmodel=()=>{
		this.setState({
			showmodel:true
		})
	}

	hideshowmodel=()=>{
		this.setState({
			showmodel:false
		})
	}

	//立即发布
	homeworkstart=()=>{
		let homeworkid=this.props.match.params.homeworkid;
		let url="/homework_commons/"+homeworkid+"/publish_groups.json";

		axios.get(url).then((response) => {

			if(response.status===200){
				const dataformat = 'YYYY-MM-DD HH:mm';
				let starttime= this.props.getNowFormatDates(1);
				let endtime=this.props.getNowFormatDates(2);
				this.setState({
					modalname:"立即发布",
					modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
					OneSelftype:true,
					Topval:"学生将立即收到作业",
					// Botvalleft:"暂不发布",
					Botval:`本操作只对"未发布"的作业有效`,
					starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					endtime:"截止时间："+endtime,
					Cancelname:"暂不发布",
					Savesname:"立即发布",
					Cancel:this.homeworkhide,
					Saves:this.homeworkstartend,
					course_groups:response.data.course_groups,
					starttimes:starttime,
					starttimesend:response.data.end_time===undefined||response.data.end_time===null||response.data.end_time===""?undefined:response.data.end_time,
					typs:"start",
				})
			}
		}).catch((error) => {
			console.log(error)
		});

	}
	//立即截止
	homeworkends=()=>{
		let homeworkid=this.props.match.params.homeworkid;
		let url="/homework_commons/"+homeworkid+"/end_groups.json";

		axios.get(url).then((response) => {

			if(response.status===200){
				this.setState({
					modalname:"立即截止",
					modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
					visible:true,
					Topval:"学生将不能再提交作业",
					// Botvalleft:"暂不截止",
					Botval:`本操作只对"提交中"的作业有效`,
					Cancelname:"暂不截止",
					Savesname:"立即截止",
					Cancel:this.homeworkhide,
					Saves:this.coursetaskend,
					starttime:undefined,
					endtime:undefined,
					typs:"end",
					course_groups:response.data.course_groups,
				})
			}
		}).catch((error) => {
			console.log(error)
		});

	}
// 立即发布
	homeworkstartend=(ds,endtime)=>{
		var homeworkid = this.props.match.params.homeworkid;

		let data={}
		if(ds.length===0){
			if(this.props.teacherdatapage.category.main===1){
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
				}
			}else {
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
					category_id:this.props.teacherdatapage.category.category_id,
				}
			}
		}else{
			if(this.props.teacherdatapage.category.main===1){
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
					category_id:this.props.teacherdatapage.category.category_id,
					detail:true
				}
			}

		}

		let coursesId=this.props.match.params.coursesId;
		let url ="/courses/"+coursesId+"/homework_commons/publish_homework.json";
		axios.post(url,data).then((result)=>{
			if(result.status===200){
				if(result.data.status===0){
					notification.open({
						message:"提示",
						description: result.data.message,
					});
					this.homeworkhide()
				}

			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	//立即截止确定按钮
	coursetaskend=()=>{
		var homeworkid = this.props.match.params.homeworkid;
		let {course_groupslist} = this.state;


		const cid = this.props.match.params.coursesId;
		let url="/courses/"+cid+"/homework_commons/end_homework.json";
		axios.post(url, {
				group_ids:course_groupslist,
				homework_ids: [homeworkid],
			})
			.then((response) => {
				if (response.data.status == 0) {
					notification.open({
						message:"提示",
						description: response.data.message,
					});
					this.homeworkhide()
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getcourse_groupslist=(id)=>{
		this.setState({
			course_groupslist:id
		})
	}

	homeworkhide=()=>{
		this.getupdata()
		this.setState({
			modalname:undefined,
			modaltype:undefined,
			visible:false,
			OneSelftype:false,
			Topval:undefined,
			Topvalright:undefined,
			Botvalleft:undefined,
			Botval:undefined,
			starttime:undefined,
			endtime:undefined,
			Cancelname:undefined,
			Savesname:undefined,
			Cancel:undefined,
			Saves:undefined,
			StudentList_value:undefined,
			addname:undefined,
			addnametype:false,
			addnametab:undefined,
			typs:undefined,
			starttimes:undefined,
		})
	}
// 导出实习报告批量
	/// 确认是否下载
	// confirmysl(url){
	// 	this.refs.DownloadMessage.confirmysl(url);
		// axios.get(url).then((response) => {
		// 	if(response.data.status&&response.data.status===-1){

		// 	}else if(response.data.status&&response.data.status===-2){
		// 		if(response.data.messages === "100"){
		// 			// 已超出文件导出的上限数量（100 ），建议：

		// 			this.setState({
		// 				DownloadType:true,
		// 				DownloadMessageval:100
		// 			})
		// 		}else {
		// 			//因附件资料超过500M
		// 			this.setState({
		// 				DownloadType:true,
		// 				DownloadMessageval:500
		// 			})
		// 		}
		// 	}else {
		// 		this.props.showNotification(`正在下载中`);
		// 		window.open("/api"+url, '_blank');
		// 	}
		// }).catch((error) => {
		// 	console.log(error)
		// });
	// }
	ChangeTab=(e)=>{
		this.props.ChangeTab(e);
	}

	daochushixunbaogao=()=>{
		let url =`/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}`;
		this.confirmysl(url);
	}

	daochuzuoye =() =>{
		let url = `/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx`;
		this.confirmysl(url);
	}

	confirmysl(url){
		axios.get(url + '&export=true').then((response) => {
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
	};


	//代码查重tbale 列表塞选数据
	table1handleChange = (pagination, filters, sorter) => {
		//"ascend" 升序
		//"descend" 降序
		if (JSON.stringify(sorter) === "{}") {
			//没有选择
		} else {
			// console.log(sorter);
			try {
				//学生学号排序
				if (sorter.columnKey === "stduynumber") {
					var myyslorder = "";
					if (sorter.order === "ascend") {
						//升序
						myyslorder = "asc";
					} else if (sorter.order === "descend") {
						//降序
						myyslorder = "desc";
					}
					this.funorder("student_id", myyslorder);
				}
			} catch (e) {

			}

			try {
				//相似度排序
				if (sorter.columnKey === "classroom") {
					var myyslorder = "";
					if (sorter.order === "ascend") {
						//升序
						myyslorder = "asc";
					} else if (sorter.order === "descend") {
						//降序
						myyslorder = "desc";
					}
					this.funorder("code_rate", myyslorder);
				}
			} catch (e) {

			}

		}

	}


	render() {
		let {
			data,
			search,
			order,
			duplicatechecking,
			datalist,
			page,
			jobsettingsdata,
		} = this.state;
		//
		// let {data}=this.props;


		let columns = [
			{
				title: '序号',
				dataIndex: 'number',
				key: 'number',
				width: '176px',
				render: (text, record) => (
					<span>
             <a style={{"color": '#07111B', "text-align": "center","margin-left": "10px"}}>{record.number}</a>
        </span>
				)
			},
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
				width: '218px',
				render: (text, record) => (
					<span>
             <a style={{"color": '#07111B', "text-align": "center"}}>{record.name}</a>
        </span>
				)
			},
			{
				title: '学号',
				dataIndex: 'stduynumber',
				key: 'stduynumber',
				sorter: true,
				sortDirections: sortDirections,
				width: '351px',
				render: (text, record) => (
					<span>
             <a style={{"color": '#9A9A9A', "text-align": "center"}}>{record.stduynumber}</a>
        </span>
				),
			},
			{
				title: '相似度',
				key: 'classroom',
				dataIndex: 'classroom',
				sorter: true,
				defaultSortOrder: 'descend',
				sortDirections: sortDirections,
				width: '277',
				render: (text, record) => (
					<span>
             <a style={{"color": record.classroom>=90?'#FF6800':"#747A7F", "text-align": "center"}}>{isNaN(record.classroom)?"--":record.classroom}%</a>
        </span>
				)
			},
			{
				title: '操作',
				dataIndex: 'operating',
				key: 'operating',
				width: '178px',
				render: (text, record) => (
					<span>
             <a onClick={()=>this.Viewstudenttraininginformation("/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+this.props.match.params.homeworkid+"/review_detail/"+record.operating)} >查看</a>
          </span>
				)
			},
		];

		if(this.props.isNotMember()===true){

			columns.some((item,key)=> {
					if (item.title === "学号") {
						columns.splice(key, 1)
						return true
					}
				}
			)

		}
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		return (
			<div className=" clearfix "  style={{margin:  "auto" , minWidth:"1200px"}}>
				{this.state.showmodel===true?<ShixunWorkModal
					{...this.props}
	        visible={this.state.showmodel}
	        modalname={"代码查重"}
					data={data&&data.group_info}
					issCancel={()=>this.hideshowmodel()}
					updatas={()=>this.getupdata()}
        />:""}
				<DownloadMessageysl
					{...this.props}
					value={this.state.DownloadMessageval}
					modalCancel={this.Downloadcal}
					modalsType={this.state.DownloadType}

				/>

				{/*<DownloadMessage*/}
				{/*	{...this.props}*/}
				{/*	refs="DownloadMessage"*/}
				{/*/>*/}
				{/*立即截止*/}
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
					getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
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

					<div className="edu-back-white">

						<style>
							{`
							.startbox{
					    height: 48px;
					    background: rgba(255,104,0,0.1);
					    line-height: 48px;
					    text-align: center;
							}

							.startfont{
							 font-size:14px;
							font-family:MicrosoftYaHei;
							font-weight:400;
							color:rgba(255,104,0,1);
							}

			        .shixunSpin{
								color:#FF6801;
							  margin-right: 10px;
							}
							`}
						</style>
						<li className="clearfix startbox mb20" style={{display:duplicatechecking===true?"":"none"}}>
							<Spin indicator={antIcon} spinning={duplicatechecking} className={"shixunSpin"}/>
							<span className={"startfont"}>
									正在执行查重，完成后将为您自动刷新结果。    温馨提示：执行时间因查重作品数以及作品的代码量而异
							</span>

						</li>
						<div className="justify break_full_word new_li edu-back-white" style={{minHeight: '480px',display:duplicatechecking===true?"":"none"}}>
							<NoneData></NoneData>
						</div>

						<style>
							{`
						  .newbutton{
						      width: 100px;
							    border: 1px solid #29BD8B;
							    color: #29BD8B!important;
						  }
							`}
						</style>

						{data&&data?
						<div style={{display:duplicatechecking===false?"":"none"}}>
						<ul className="clearfix" style={{padding: '20px 16px 10px'}}>
							<li className="clearfix ">

								<span   className="fl  mr10 color-grey-8 ">查重时间：{data&&data.last_review_time}</span>
								{this.props.isAdmin()?duplicatechecking===false?<span className="fl ">
									<a  className="Actionbtn newbutton mr20 fl" onClick={this.workshowmodel}>代码查重</a>
								</span>:"":""}
								{/*请输入姓名或学号搜索*/}

								<div className="fr search-new" style={{marginBottom: '1px'}}>
									<Search
										placeholder="请输入姓名或学号搜索"
										id="subject_search_input"
										autoComplete="off"
										value={search}
										onInput={this.inputSearchValue}
										onSearch={this.searchValue}
									></Search>
								</div>
							</li>


							{/*分班情况*/}

							{data&&data.group_info.length===0?"":<li className="clearfix  mt10">
								<span className="fl mr10 color-grey-8">分班情况：</span>
								<span className="fl ">
									<a id="graduation_comment_no_limit"
										 onClick={()=>this.groupgroup([])}
								     className={this.state.group_infolist.length===0?"pl10 pr10 mr20 check_on":"pl10 pr10 mr20 "}>
										全部
									</a>
								</span>


								<CheckboxGroup onChange={this.groupgroup}
								               value={this.state.group_infolist}
								               style={{paddingTop: '4px',float: 'left',
																 maxWidth: '1020px'}}
								  >
									{data&&data.group_info === undefined ? "" : data&&data.group_info.map((item, key) => {
										return (
											<span key={key}>
                          <Checkbox value={item.id} key={item.id} className="fl ">
                            <span>
	                            {item.name}({item.members_count})
                            </span>
                          </Checkbox>
                      </span>
										)
									})}
								</CheckboxGroup>

							</li>}

						</ul>


						<div id="graduation_work_list" style={{padding: '0px 16px 10px'}}>

							<div className="clearfix">
                  <span className="fl color-grey-6 font-12">
	                <span className="color-orange-tip">
		                {data&&data.copy_reviews_count}</span>
	                  个疑似抄袭作品（{data&&data.all_reviews_count}作品） </span>



							</div>

						</div>

						<div className={"justify break_full_word new_li edu-back-white"} style={{minHeight: "480px"}}>

							<style>{`
							.ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
													top: 72%;}
								}
							`}</style>

							{datalist === undefined ? "" : datalist.length===0? <div className="alltask">
								<div className="edu-tab-con-box clearfix edu-txt-center">
									<img className="edu-nodata-img mb20" src="/images/educoder/nodata.png" />
									<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p>
								</div>
							</div>:<Table
								dataSource={datalist}
								columns={columns}
								onChange={this.table1handleChange}
								pagination={false}
							/>}

						</div>
					</div>:""}
				</div>

						{
							datalist === undefined ? "":datalist.length===0?"":datalist.length<11?
								<div className="edu-txt-center mt30 mb20">
									<Pagination showQuickJumper current={page}
															onChange={this.TablePagination} pageSize={10}
															total={datalist.length===0?0:data&&data.copy_reviews_count}></Pagination>
								</div>
								: ""
						}

				</div>

			</div>

		)
	}
}

export default ShixunStudentWork;
// <div className="stud-class-set bor-bottom-greyE ">
// 	<div className=" clearfix edu-back-white poll_list">
// 		<a  onClick={(e)=>this.ChangeTab(0)}>作品列表</a>
// 		<a onClick={(e)=>this.ChangeTab(1)}>作业问答</a>
// 		{this.props.isAdmin()?<a className="active" onClick={(e)=>this.ChangeTab(2)}>代码查重</a>:""}
// 		<a onClick={(e)=>this.ChangeTab(3)}>设置</a>
// 		<style>{`
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
// 		{this.props.isAdmin() ? <li className="li_line drop_down fr color-blue font-16 mr8 mt20" style={{"padding": "0 20px"}}>
// 			导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
// 			<ul className="drop_down_menu" style={{"right": "-0px", "left": "unset", "height": "auto"}}>
// 				<li><a onClick={()=>this.confirmysl(`/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}`)}>实训报告</a>
// 				</li>
// 				<li><a onClick={()=>this.confirmysl(`/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx`)}>学生成绩</a>
// 				</li>
// 			</ul>
// 		</li> : ""}
// 		{this.props.isAdmin()?
// 			data&&data.end_immediately===true?
// 				<a className="fr color-blue font-16" onClick={this.homeworkends}>立即截止</a>
// 				:"": ""}
// 		{this.props.isAdmin()?
// 			data&&data.publish_immediately===true?
// 				<a className="fr color-blue font-16" onClick={this.homeworkstart}>立即发布</a> : "": ""}
// 		{
// 			jobsettingsdata&&	jobsettingsdata.data === undefined ? ""
// 				: 	jobsettingsdata&&	jobsettingsdata.data.commit_des === null || 	jobsettingsdata&&	jobsettingsdata.data.commit_des === undefined ? "" :
// 				<a className="fr color-blue font-16"
// 					 href={`/courses/${this.state.props.match.params.coursesId}/${this.state.shixuntypes}/${	jobsettingsdata&&	jobsettingsdata.data === undefined ? "" : 	jobsettingsdata&&	jobsettingsdata.data.id}/commitsummary/${this.state.props.match.params.homeworkid}`}>{	jobsettingsdata&&	jobsettingsdata.data.commit_des}</a>
// 		}
// 		{    jobsettingsdata&&jobsettingsdata.data === undefined ? "" : <Startshixuntask
// 			{...this.props}
// 			data={	jobsettingsdata&&	jobsettingsdata.data}
// 		/>}
{/*	</div>*/}
{/*</div>*/}
