import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
} from "antd";
import Colleagechart from './colleagechart/Colleagechart'
import Colleagechartzu from './colleagechart/Colleagechartzu'
import {TPMIndexHOC} from "../modules/tpm/TPMIndexHOC";
import NoneData from './../modules/courses/coursesPublic/NoneData';

import './colleagecss/colleage.css';
import Shixunechart from "../modules/courses/shixunHomework/shixunreport/Shixunechart";
class College extends Component {
	constructor(props) {
		super(props);
		// this.answerMdRef = React.createRef();
		this.state = {
			coursesloading:false,
			columns: [
				{
					title: '名称',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth247",
					render: (text, record) => (
						<a href={`/courses/${record.id}/students`} title={record.name} target="_blank" className="d-inline-block text-truncate maxnamewidth247"
							 style={{
								 maxWidth:'220px',
								 color:'#007bff',
							 }}>{
							record.name
						}</a>
					)
				},
				{
					title: '管理教师',
					dataIndex: 'teachers',
					key: 'teachers',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth340",
					render: (text, record) => (
						<a  className="maxnamewidth340" title={record.teachers} style={{
							color:'#05101A'
						}}>
							{
								record.teachers
							}
        </a >
					)
				},
				{
					title: '评测次数',
					dataIndex: 'times',
					key: 'times',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth175",
					render: (text, record) => (
						<span>
							{
								record.evaluating_count
							}
        </span>
					),
				},
				{
					title: '学生',
					key: 'student',
					dataIndex: 'student',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth255",
					render: (text, record) => (
						<span>
							{
								record.student_count
							}
						</span>
					)
				},
				{
					title: '实训作业',
					dataIndex: 'training',
					key: 'training',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.shixun_work_count
							}
           </span>
					)

				},
				{
					title: '资源',
					dataIndex: 'resources',
					key: 'resources',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.attachment_count
							}
        </span>
					),
				},
				{
					title: '帖子',
					dataIndex: 'posts',
					key: 'posts',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>{
							record.message_count
						}</span>
					)
				},
				{
					title: '其它任务',
					dataIndex: 'othertasks',
					key: 'othertasks',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.other_work_count
							}
          </span>
					)
				},
				{
					title: '状态',
					dataIndex: 'states',
					key: 'states',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span  className={record.is_end?'':'color-huang'}>
							{
								record.is_end?
                  "已结束"
									:
									"正在进行"
							}
           </span>
					)
				},
				{
					title: '时间',
					dataIndex: 'timemy',
					key: 'timemy',
					align: 'center',
					className: "edu-txt-center  font-14",
					render: (text, record) => (
						<span >
							{
								record.activity_time
							}
            </span>
					)
				},
			],
			page:1,
			limit:10,
			total_users:50,
			teachersloading:false,
			teacherranking:[
				{
					title: '排名',
					dataIndex: 'ranking',
					key: 'ranking',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.id
							}
            </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth105",
					render: (text, record) => (
						<a href={`/users/${record.login}`} title={record.name} target="_blank"  className="task-hide maxnamewidth105" style={{
							color:'#007bff',

						}}>	{
								record.name
						}
        </a>
					)
				},
				{
					title: '管理课堂',
					dataIndex: 'classroom',
					key: 'classroom',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth175",
					render: (text, record) => (
						<span>
							{
								record.course_count
							}
        </span>
					),
				},
				{
					title: '已发布实训作业',
					key: 'assignment',
					dataIndex: 'assignment',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth255",
					render: (text, record) => (
						<span>
							{
								record.shixun_work_count
							}
						</span>
					)
				},
				{
					title: '未发布实训作业',
					dataIndex: 'released',
					key: 'released',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.un_shixun_work_count
							}
           </span>
					)

				},
				{
					title: '学生数',
					dataIndex: 'studentnumber',
					key: 'studentnumber',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
					{
						record.student_count
					}
        </span>
					),
				},
				{
					title: '完成率',
					dataIndex: 'completionrate',
					key: 'completionrate',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.complete_rate+"%"
							}
						</span>
					)
				},
				{
					title: '发布实训',
					dataIndex: 'releasetraining',
					key: 'releasetraining',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span className="color-blue">
					{
						record.publish_shixun_count
					}
          </span>
					)
				}
			],
			studentranking:[
				{
					title: '排名',
					dataIndex: 'ranking',
					key: 'ranking',
					align: 'center',
					className: "edu-txt-center font-14",
					width:'100px',
					render: (text, record) => (
						<span>
							{
								record.id===1?	<img  width="18px" height="22px" className="mt8" src={getImageUrl("images/educoder/competition/1.png")}/>
									:record.id===2?
								<img width="18px" height="22px" className="mt8" src={getImageUrl("images/educoder/competition/2.png")}/>
									:record.id===3?
										<img width="18px" height="22px" className="mt8" src={getImageUrl("images/educoder/competition/3.png")}/>
										:record.id
							}
            </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth105",
					width:'100px',
					render: (text, record) => (
						<a href={`/users/${record.login}`} title={record.name} target="_blank" className="task-hide maxnamewidth105" style={{
							color:'#007bff',

						}}>	{
							record.name
						}
						</a>
					)
				},
				{
					title: '学号',
					dataIndex: 'studentid',
					key: 'studentid',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth175",
					render: (text, record) => (
						<span>
							{
								record.student_id
							}
        </span>
					),
				},
				{
					title: '完成实训',
					key: 'training',
					dataIndex: 'training',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth255",
					render: (text, record) => (
						<span>
								{
									record.shixun_count
								}
						</span>
					)
				},
				{
					title: '在学实训',
					dataIndex: 'learning',
					key: 'learning',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
								{
									record.study_shixun_count
								}
           </span>
					)

				},
				{
					title: '金币',
					dataIndex: 'goldcoin',
					key: 'goldcoin',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.grade
							}
        </span>
					),
				},
				{
					title: '经验值',
					dataIndex: 'empirical',
					key: 'empirical',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span style={{
							color:'#17a2b8'
						}}>
								{
									record.experience
								}
						</span>
					)
				},
			],
			school:"",
			teachers_count:null,
			students_count:null,
			courses_count:null,
			shixuns_count:null,
			shixun_report_count:null,
			shixun_time:null,
			courses:null,
			course_count:0,
			pages:1,
			limits:10,
			teachers:null,
			teacher_count:0,
			students:null,
			student_count:0,
			shixun_chart_data:null,
			shixun_chart_datanames:null,
			studentionsnames:null,
			studentionsvalues:null
		}

	}


	componentDidMount(){
		console.log("College");
		console.log(this.props.match.params.id);
		 this.gettop();
		 this.Numberofinternshipreports();
		 this.Actualcombattimeoftrainees();
		 this.Classnumber(1,10);
		 this.Teacherranking(1,10);
		 this.Studentranking(1,10);
		 this.Onlinetraining();
		 this.Hottest();
	}
	//头部
	gettop=()=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/statistics.json`;
		axios.get(url).then((response) => {
			if(response===null||response===undefined){
				this.setState({
					teachers_count:0,
					students_count:0,
					courses_count:0,
					shixuns_count:0,
					school:"",
				})
				return
			}
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					teachers_count:0,
					students_count:0,
					courses_count:0,
					shixuns_count:0,
					school:"",
				})
			}else{
         this.setState({
					 teachers_count:response.data.teachers_count,
					 students_count:response.data.students_count,
					 courses_count:response.data.courses_count,
					 shixuns_count:response.data.shixuns_count,
					 school:response.data.school,
				 })
			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				teachers_count:0,
				students_count:0,
				courses_count:0,
				shixuns_count:0,
				school:"",
			})
		});
	}

	//获取实训报告数
	Numberofinternshipreports=()=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/shixun_report_count.json`;
		axios.get(url).then((response) => {
			if(response===null||response===undefined){
				this.setState({
					shixun_report_count:0,
				})
				return
			}
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					shixun_report_count:0,
				})
			}else{
				if (response.data.status === -1){
					this.setState({
						shixun_report_count:0,
					})
					return
				}
				this.setState({
					shixun_report_count:response.data.shixun_report_count,
				})
			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				shixun_report_count:0,
			})
		});
	}

	//学员实战时间
	Actualcombattimeoftrainees=()=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/shixun_time.json`;
		axios.get(url).then((response) => {
			if(response===null||response===undefined){
				this.setState({
					shixun_time:0,
				})
				return
			}
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					shixun_time:0,
				})
			}else{
				if (response.data.status === -1){
					this.setState({
						shixun_time:0,
					})
					return
				}
				this.setState({
					shixun_time:response.data.shixun_time,
				})
			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				shixun_time:0,
			})
		});
	}

	//课堂信息
	Classnumber=(page,per_page)=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/course_statistics.json`;
		this.setState({
			coursesloading:true
		})
		axios.get(url,{params:{
				page:page,
				per_page:per_page,
			}
		}).then((response) => {
			if(response===null||response===undefined){
				this.setState({
					courses:[],
					course_count:0
				})
				return
			}
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					courses:[],
					course_count:0
				})
			}else{
				if (response.data.status === -1){
					this.setState({
						courses:[],
						course_count:0
					})
					return
				}
				this.setState({
					courses:response.data.courses,
					course_count:response.data.course_count,
					page:page,
					limit:per_page
				})
			}
			this.setState({
				coursesloading:false
			})
		}).catch((error) => {
			this.setState({
				courses:[],
				course_count:0,
				coursesloading:false
			})
		});
	}

  //教师排名
	Teacherranking=(page,per_page)=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/teachers.json`;
		this.setState({
			teachersloading:true
		})
		axios.get(url,{params:{
				page:page,
				per_page:per_page,
			}
		}).then((response) => {
			if(response===null||response===undefined){
				this.setState({
					teachers:[],
					teacher_count:0
				})
				return
			}
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					teachers:[],
					teacher_count:0
				})
			}else{
				if (response.data.status === -1){
					this.setState({
						teachers:[],
						teacher_count:0
					})
					return
				}
				let teachers=[];
				if(response.data.teachers){
					for(let i=0;i<response.data.teachers.length;i++){
						let datay={
							id:(i+(page-1)*10)+1,
							login: response.data.teachers[i].login,
							name: response.data.teachers[i].name,  // 姓名
							course_count: response.data.teachers[i].course_count,  // 课堂数
							shixun_work_count:response.data.teachers[i].shixun_work_count, // 已发布实训作业
							un_shixun_work_count:response.data.teachers[i].un_shixun_work_count,  // 未发布实训作业
							student_count: response.data.teachers[i].student_count, // 学生数
							complete_rate: response.data.teachers[i].complete_rate, // 完成率
							publish_shixun_count: response.data.teachers[i].publish_shixun_count, // 发布实训数
						}
						teachers.push(datay);

					}

				}
				this.setState({
					teachers:teachers,
					teacher_count:response.data.teacher_count,
					pages:page,
					limits:per_page,
				})
			}
			this.setState({
				teachersloading:false
			})
		}).catch((error) => {
			this.setState({
				teachers:[],
				teacher_count:0,
				teachersloading:false
			})
		});
	}
  //学生排名

	Studentranking=(page,per_page)=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/student_shixun.json`;
		this.setState({
			studentsloading:true
		})
		axios.get(url,{params:{
				page:page,
				per_page:per_page,
			}
		}).then((response) => {
			if(response===null||response===undefined){
				this.setState({
					students:[],
					student_count:0,
				})
				return
			}
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					students:[],
					student_count:0,
				})
			}else{
				if (response.data.status === -1){
					this.setState({
						students:[],
						student_count:0,
					})
					return
				}
				let students=[];
				if(response.data.teachers){
					for(let i=0;i<response.data.teachers.length;i++){
						let datay={
							id:(i+(page-1)*10)+1,
							login: response.data.teachers[i].login,
							name: response.data.teachers[i].name,  // 姓名
							student_id: response.data.teachers[i].student_id,
							shixun_count:response.data.teachers[i].shixun_count,
							study_shixun_count:response.data.teachers[i].study_shixun_count,
							grade: response.data.teachers[i].grade,
							experience: response.data.teachers[i].experience,
						}
						students.push(datay);
					}
				}
				this.setState({
					students:students,
					student_count:response.data.student_count,
					pagess:page,
					limitss:per_page,
				})
			}
			this.setState({
				studentsloading:false
			})
		}).catch((error) => {
			this.setState({
				students:[],
				student_count:0,
				studentsloading:false
			})
		});
	}

	 //在线实训情况
   Onlinetraining=()=>{
		 const id =this.props.match.params.id;
		 const url=`/colleges/${id}/shixun_chart_data.json`;
		 axios.get(url).then((response) => {
			 if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				 this.setState({
					 shixun_chart_data:[],
					 shixun_chart_datanames:[]
				 })
			 }else{
				 if (response.data.status === -1){
					 this.setState({
						 shixun_chart_data:[],
						 shixun_chart_datanames:[]
					 })
					 return
				 }

              this.setState({
								shixun_chart_data:response.data.data,
								shixun_chart_datanames:response.data.names
							})
			 }
		 }).catch((error) => {
			 this.setState({
				 shixun_chart_data:[],
				 shixun_chart_datanames:[]
			 })
		 });
	 }
	//最热测评
	Hottest=()=>{
		const id =this.props.match.params.id;
		const url=`/colleges/${id}/student_hot_evaluations.json`;
		axios.get(url).then((response) => {
			if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
				this.setState({
					studentionsnames: [],
					studentionsvalues: []
				})
			}else {
				if (response.data.status === -1) {
					this.setState({
						studentionsnames: [],
						studentionsvalues: []
					})
					return
				}
				this.setState({
					studentionsnames: response.data.names,
					studentionsvalues: response.data.values
				})
			}
		}).catch((error) => {
			this.setState({
				studentionsnames: [],
				studentionsvalues: []
			})
		});
	}

	table1handleChange(){

	}

	//塞选
	paginationonChange=(pageNumber)=>{
    this.Classnumber(pageNumber,10);
	}

	paginationonChanges=(pageNumber)=>{
		this.Teacherranking(pageNumber,10);
	}
	paginationonChangess=(pageNumber)=>{
		this.Studentranking(pageNumber,10);
	}
	render() {
		let {columns,page,limit,total_users,teacherranking,studentranking,
			teachers_count,students_count, courses_count, shixuns_count,shixun_report_count,shixun_time,courses,course_count,school,teachers,
			pages,limits, teacher_count,teachersloading,coursesloading,pagess,limitss,studentsloading,students,student_count,shixun_chart_data,
			shixun_chart_datanames,	studentionsnames,studentionsvalues
		} = this.state;

		return (
			<div className="newMain clearfix edu-back-eeee">
					<div className="yslstatistic-header intermediatecenter" >
						<div className="intermediatecenter " style={{
							maxWidth:"1300px",
							width:"1300px",
							height: '100%',
						}}>
						<div className="yslstatistic-header-title">{school}</div>
            <div className="yslstatistic-header-content">
             <div className="yslstatistic-header-item">
							 {/*//教师1*/}
							 <div className="yslstatistic-header-item-label">
                  教师
							 </div>
               <div className="yslstatistic-header-item-content">
                  {teachers_count?teachers_count:0}
							 </div>
						 </div>

							<div className="yslstatistic-header-item">
								<div className="yslstatistic-header-item-label">
									学生
								</div>
								<div className="yslstatistic-header-item-content">
									{students_count?students_count:0}
								</div>
							</div>

							<div className="yslstatistic-header-item">
								<div className="yslstatistic-header-item-label">
									课堂
								</div>
								<div className="yslstatistic-header-item-content">
									{courses_count?courses_count:0}
								</div>
							</div>

							<div className="yslstatistic-header-item">
								<div className="yslstatistic-header-item-label">
									共建实训
								</div>
								<div className="yslstatistic-header-item-content">
									{shixuns_count?shixuns_count:0}
								</div>
							</div>
							{/*//教师2*/}




						</div>
						</div>
 					</div>
					<div className={"educontent   edu-back-white mt-4"} style={{width: "1300px"}}>
						<p className="h4 linjibenshiyong">
							基本使用情况
						</p>
						{/*基本使用情况1*/}
						<div className="jibenshiyong100 sortinxdirection yinyin">
							<p className="yslstatistic-base-item-label">
                 教师
							</p>
							<p className="yslstatistic-base-item-label">
								学生
							</p>
							<p className="yslstatistic-base-item-label">
								课堂
							</p>
							<p className="yslstatistic-base-item-label">
								共建实训
							</p>
							<p className="yslstatistic-base-item-label">
								实习报告
							</p>
							<p className="yslstatistic-base-item-label">
								学员实战时间
							</p>
						</div>


						{/*基本使用情况2*/}
						<div className="jibenshiyong100 sortinxdirection yinyin">
							<div className="yslstatistic-base-item-labels">
								{
									teachers_count?
										<div className="yslstatistic-base-item-labelsp"> {teachers_count}<span className="yslstatistic-base-item-labelsspan">人</span></div>
										:
										<Spin/>
								}
							</div>
							<div className="yslstatistic-base-item-labels">
								{
									students_count?
										<div className="yslstatistic-base-item-labelsp">{students_count}<span  className="yslstatistic-base-item-labelsspan">人</span></div>
										:
										<Spin/>
								}
							</div>
							<div className="yslstatistic-base-item-labels">
								{
									courses_count?
										<div className="yslstatistic-base-item-labelsp">{courses_count}<span  className="yslstatistic-base-item-labelsspan">个</span></div>
										:
										<Spin/>
								}
							</div>
							<div className="yslstatistic-base-item-labels">
								{
									shixuns_count?
										<div className="yslstatistic-base-item-labelsp">{shixuns_count}<span  className="yslstatistic-base-item-labelsspan">个</span></div>
										:
										<Spin/>
								}
							</div>
							<div className="yslstatistic-base-item-labels">
								{
									shixun_report_count?
										<div className="yslstatistic-base-item-labelsp">{shixun_report_count}<span  className="yslstatistic-base-item-labelsspan">个</span></div>
										:
										<Spin/>
								}
							</div>
							<div className="yslstatistic-base-item-labels">
								{
									shixun_time?
										<div className="yslstatistic-base-item-labelsp">{shixun_time}<span  className="yslstatistic-base-item-labelsspan">天</span></div>
										:
										<Spin/>
								}
							</div>
						</div>
						{/*基本使用情况3结束*/}
					</div>


				<div className={"educontent   edu-back-white mt-4 yinyin"} style={{width: "1300px"}}>
					<p className="statistic-label linjibenshiyong">
						课堂
					</p>
					{
						courses===null?
							<div className="intermediatecenter" style={{
								height:'500px'
							}}>
								<Spin tip="正在加载..."/>
							</div>

							:
						JSON.stringify(courses) === "[]" ?
							<NoneData>

							</NoneData>
						:
							<div style={{width: "1300px"}}>
								<div className={"justify break_full_word new_li edu-back-white"}
										 style={{minHeight: "480px"}}>
									<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																			top: 72%;}
						                }
						                 .ysltableows2 .ant-table-thead > tr > th{
													 padding: 9px;
															}
						                  
						                  
						                 .ysltableows2 .ant-table-tbody > tr > td {
													padding: 15px;
															}
															
															.mysjysltable1 .ant-table-thead > tr > th{
													 padding: 9px;
															}
															 
															.mysjysltable1 .ant-table-tbody > tr > td {
													 padding: 15px;
															}
														 .ysltableows2 .ant-table-thead > tr > th{
															     background: #F5F5F5;
															}
						              `}</style>
									<div className="edu-table  edu-back-white ysltableows2">
										{courses === undefined ? "" : <Table
											dataSource={courses}
											columns={columns}
											className="mysjysltable1"
											pagination={false}
											loading={coursesloading}
											// onChange={this.TablePaginationsy}
										/>}
									</div>
								</div>
								{
									course_count>=11?
										<div style={{
											width:'100%',
											padding:'40px'
										}}>
											<div className="edu-txt-center ">
												<Pagination showQuickJumper current={page} onChange={this.paginationonChange}
																		pageSize={limit}
																		total={course_count}></Pagination>
											</div>

										</div>
										:""
								}

							</div>
					  }


				</div>


				<div className={"educontent   edu-back-white yinyin mt-4 sortinxdirection"} style={{width: "1300px"}}>
					<div className=" verticallayout" style={{
						width: "63%"
					}}>
						<p className="statistic-label ysllinjibenshiyong yinyin">
							教师排名
						</p>
						{
							teachers===null?
								<div className="intermediatecenter" style={{
									height:'500px'
								}}>
									<Spin tip="正在加载..."/>
								</div>

								:
								JSON.stringify(teachers) === "[]" ?
									<NoneData>

									</NoneData>
									:
						<div className={"justify break_full_word new_li edu-back-white "}
								 style={{minHeight: "480px"}}>
							<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																			top: 72%;}
						                }
						                 .ysltableows2 .ant-table-thead > tr > th{
													 padding: 9px;
															}
						                  
						                  
						                 .ysltableows2 .ant-table-tbody > tr > td {
													padding: 15px;
															}
															
															.mysjysltable1 .ant-table-thead > tr > th{
													 padding: 9px;
															}
															 
															.mysjysltable1 .ant-table-tbody > tr > td {
													 padding: 15px;
															}
														 .ysltableows2 .ant-table-thead > tr > th{
															     background: #F5F5F5;
															}
															
						              `}</style>
							<div className="edu-table  edu-back-white ysltableows2">
								{teachers === undefined ? "" : <Table
									dataSource={teachers}
									columns={teacherranking}
									className="mysjysltable1"
									pagination={false}
									loading={teachersloading}
									// onChange={this.TablePaginationsy}
								/>}
							</div>
						</div>
						}



						{/*<div style={{*/}
						{/*	width:'100%',*/}
						{/*	padding:'40px'*/}
						{/*}}>*/}
						{/*	<div className="edu-txt-center ">*/}
						{/*		<Pagination showQuickJumper current={pages} onChange={this.paginationonChanges}*/}
						{/*								pageSize={limits}*/}
						{/*								total={teacher_count}></Pagination>*/}
						{/*	</div>*/}

						{/*</div>*/}
					</div>

					<div className="" style={{
						width: "37%"
					}}><div className="yslslinjibenshiyong"  style={{
						height: "100%"
					}}>
						<p className="statistic-label ysllinjibenshiyong">
							在线实训情况
						</p>
						{
							shixun_chart_data===null?
								<div className="intermediatecenter" style={{
									height:'500px'
								}}>
									<Spin tip="正在加载..."/>
								</div>

								:
								JSON.stringify(shixun_chart_data) === "[]" ?
									<NoneData>

									</NoneData>
									:
						<Colleagechart 	data={shixun_chart_data} datanane={shixun_chart_datanames}>

						</Colleagechart>
						}

						</div>
					</div>
				</div>


				<div className={"educontent   edu-back-white yinyin mt-4 sortinxdirection mb80"} style={{width: "1300px"}}>
					<div className=" verticallayout" style={{
						width: "63%"
					}}>
						<p className="statistic-label ysllinjibenshiyong yinyin ">
							学生排名
						</p>
						{
							students === null ?
								<div className="intermediatecenter" style={{
									height: '500px'
								}}>
									<Spin tip="正在加载..."/>
								</div>

								:
								JSON.stringify(students) === "[]" ?
									<NoneData>

									</NoneData>
									:
									<div className={"justify break_full_word new_li edu-back-white "}
											 style={{minHeight: "480px"}}>
										<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																			top: 72%;}
						                }
						                 .ysltableows2 .ant-table-thead > tr > th{
													 padding: 9px;
															}
						                  
						                  
						                 .ysltableows2 .ant-table-tbody > tr > td {
													padding: 15px;
															}
															
															.mysjysltable1 .ant-table-thead > tr > th{
													 padding: 9px;
															}
															 
															.mysjysltable1 .ant-table-tbody > tr > td {
													 padding: 15px;
															}
														 .ysltableows2 .ant-table-thead > tr > th{
															     background: #F5F5F5;
															}
						              `}</style>
										<div className="edu-table  edu-back-white ysltableows2">
											{students === undefined ? "" : <Table
												dataSource={students}
												columns={studentranking}
												className="mysjysltable1"
												pagination={false}
												loading={studentsloading}
												// onChange={this.TablePaginationsy}
											/>}
										</div>
									</div>
						}
						{/*<div style={{*/}
						{/*	width:'100%',*/}
						{/*	padding:'40px'*/}
						{/*}}>*/}
						{/*	<div className="edu-txt-center ">*/}
						{/*		<Pagination showQuickJumper current={pagess} onChange={this.paginationonChangess}*/}
						{/*								pageSize={limitss}*/}
						{/*								total={student_count}></Pagination>*/}
						{/*	</div>*/}

						{/*</div>*/}


					</div>

					<div className="" style={{
						width: "37%"
					}}>

						<div className="yslslinjibenshiyong" style={{
							height: "100%"
						}}>
							<p className="statistic-label ysllinjibenshiyong">
								最热评测
							</p>
							{
								studentionsnames===null?
									<div className="intermediatecenter" style={{
										height:'500px'
									}}>
										<Spin tip="正在加载..."/>
									</div>

									:
									JSON.stringify(studentionsnames) === "[]" ?
										<NoneData>

										</NoneData>
										:
										<Colleagechartzu 	data={studentionsnames} datavule={studentionsvalues}>

										</Colleagechartzu>
							}


						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default SnackbarHOC() (TPMIndexHOC  ( College ));


