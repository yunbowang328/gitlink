import React, {Component} from "react";
import CoursesListType from '../coursesPublic/CoursesListType';
import {getRandomcode, publicSearchs, sortDirections} from 'educoder';
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
	Pagination,
	Radio,
	Tooltip,
	notification,
	Spin,
} from "antd";
import './style.css';
import 'moment/locale/zh-cn';
import axios from 'axios';
import moment from 'moment';
import '../css/members.css';
import '../css/busyWork.css';
import '../poll/pollStyle.css';
import './Challenges.css';

import {getImageUrl} from 'educoder';
import TraineetraininginformationModal from "./TraineetraininginformationModal";
import DownloadMessageysl from '../../modals/DownloadMessageysl';
import Startshixuntask from "../coursesPublic/Startshixuntask";
import ModulationModal from "../coursesPublic/ModulationModal";
import HomeworkModal from "../coursesPublic/HomeworkModal";
import OneSelfOrderModal from "../coursesPublic/OneSelfOrderModal";
import ShixunWorkModal from "./Shixunworkdetails/ShixunWorkModal";
import NoneData from '../../../modules/courses/coursesPublic/NoneData';

const Search = Input.Search;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
//GraduationTaskssetting.js

//作品列表(学生)
let allow_lates=false;
let answer_open_evaluation=false;
// Curcomlevel
class Listofworksstudentone extends Component {
	//unifiedsetting 统一设置
	//allowreplenishment 允许补交
	//completionefficiencyscore 完成效率评分占比
	//level级别
	//proportion 比例
	constructor(props) {
		super(props);
		// course_group_info  老师身份显示的分班情况
		//task_status 老师身份显示的提交情况
		//要提交的作品状态checkedValuesine
		//要提交的分班状态checkedValuesineinfo
		//searchtext 输入的姓名和学号
		//order 排序时间
		//当前成绩work_score
		//关卡得分final_score

		this.state = {
			searchtypes:false,
			jobsettingsdata: undefined,
			endTime: "2018/11/10 17:10:00",
			type: "day",
			props: props,
			data: [],
			datas: [],
			view_report: false,
			computeTimetype: true,
			page: 1,
			pages: 1,
			limit: 20,
			loadingstate: true,
			order: "",
			search: null,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			userids: 0,
			viewtrainingdata: {},
			teacherdata: undefined,
			task_status: [],
			visibles: false,
			starttimesend: undefined,
			course_group_info: [],
			styletable: {
				"display": "none"
			},
			student_works: [],
			startbtn: false,
			DownloadType: false,
			DownloadMessageval: undefined,
			columnsstu: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: "center",
					className: 'font-14',
					width: '90px',
					render: (text, record) => (
						<span style={{width: '90px'}}>
						{record.number === undefined ?
							<span style={{
								color: '#9A9A9A',
								textAlign: "center",
								width: '90px'
							}}> --</span>
							: record.number === "" ?
								<span style={{
									color: '#9A9A9A',
									textAlign: "center",
									width: '90px'
								}}>--</span>
								: record.number === "--" ?
									<span style={{
										color: '#9A9A9A',
										textAlign: "center",
										width: '90px'
									}}>--</span>
									:
									<span style={{
										color: '#07111B',
										textAlign: "center",
										width: '90px'
									}}>  {record.number}</span>
						}
        </span>
					),
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: "center",
					className: 'font-14 maxnamewidth110',
					width: '100px',
					render: (text, record) => (
						<span className="maxnamewidth110">
						{record.name === undefined ?
							<span style={{
								color: '#9A9A9A',
								textAlign: "center",
								width: '100px'
							}}>--</span>
							:
							record.name === "" ?
								<span style={{
									color: '#9A9A9A',
									textAlign: "center",
									width: '100px'
								}}>--</span>
								:
								record.name === null ?
									<span style={{
										color: '#9A9A9A',
										textAlign: "center",
										width: '100px'
									}}>--</span>
									:
									record.name === "--" ?
										<span style={{
											color: '#9A9A9A',
											textAlign: "center",
											width: '100px'
										}}>--</span>
										:
										<a className="maxnamewidth110" title={record.name} style={{
											color: '#07111B',
											textAlign: "center",
											width: '100px'
										}}>{record.name}</a>
						}

        </span>
					),
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: "center",
					className: 'font-14 maxnamewidth120',
					width: '120px',
					render: (text, record) => (
						<span className="maxnamewidth120" style={{
							width: '120px',
						}}>
							{record.stduynumber === undefined ?
								<span style={{
									color: '#000',
									textAlign: "center",
									width: '120px',
								}}>--
									</span>
								: record.stduynumber === null ?
									<span style={{
										color: '#000',
										textAlign: "center",
										width: '120px',
									}}>--
									</span>
									: record.stduynumber === "" ?
										<span style={{
											color: '#000',
											textAlign: "center",
											width: '120px',
										}}>--
									</span>
										:
										<a
											title={record.stduynumber}
											className="maxnamewidth120"
											style={{
												color: '#000',
												textAlign: "center",
												width: '120px',
											}}>{
											record.stduynumber
										}
										</a>
							}
        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: "center",
					className: 'font-14 maxnamewidth120',
					width: '120px',
					render: (text, record) => (
						<span className="font-14 maxnamewidth120" style={{width: '120px'}}>
        {record.classroom === undefined ?
					<a className=" font-14 maxnamewidth120"
						 style={{
							 color: '#9A9A9A',
							 textAlign: "center",
							 width: '120px',
						 }}>--</a> : record.classroom === "" ?
						<a className=" font-14 maxnamewidth120"
							 style={{
								 color: '#9A9A9A',
								 textAlign: "center",
								 width: '120px',
							 }}>--</a> : record.classroom === null ?
							<a className=" font-14 maxnamewidth120"
								 style={{
									 color: '#9A9A9A',
									 textAlign: "center",
									 width: '120px',
								 }}>--</a>
							:
							<a className=" font-14 maxnamewidth120"
								 title={record.classroom}
								 style={{
									 color: '#9A9A9A',
									 textAlign: "center",
									 width: '120px',
								 }}>{record.classroom}</a>
				}
        </span>
					),
				},
				{
					title: '作品状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: "center",
					className: 'font-14',
					width: '98px',
					render: (text, record) => (
						<span style={{width: '98px',}}>
				 <span style={record.submitstate === "迟交通关" ? {
					 color: '#DD1717',
					 textAlign: "center",
					 width: '98px',
				 } : record.submitstate === "按时通关" ? {color: '#29BD8B', textAlign: "center", width: '98px',}
					 : record.submitstate === "未通关" ? {color: '#F69707', textAlign: "center", width: '98px',}
						 : {
							 color: '#747A7F',
							 textAlign: "center",
							 width: '98px',
						 }}>{record.submitstate === undefined ? "--" : record.submitstate === "" ? "--" : record.submitstate === null ? "--" : record.submitstate}</span>

        </span>
					),
				},
				{
					title:<span>实训总耗时<Tooltip placement="top" title={<pre>
						计算规则:<br/>
						学员离开实训学习界面停止计时；<br/>
						评测首次通过之后，停止计时<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'cost_time',
					key: 'cost_time',
					align: 'center',
					className: 'font-14',
					width: '145px',
					render: (text, record) => (
						<span style={
							{
								color: '#747A7F',
								textAlign: "center",
								width: '145px',
							}
						}>
							{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time === "--" ? "--" :
								<span style={
									{
										color: '#747A7F',
										textAlign: "center",
										width: '145px',
									}
								}
								>{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time}
									</span>
							}
						</span>
					)

				},
				// {
				// 	title: '更新时间',
				// 	dataIndex: 'updatetime',
				// 	key: 'updatetime',
				// 	align: "center",
				// 	className:'font-14',
				// 	render: (text, record) => (
				// 		<span>
				//      <span style={{
				// 			 color: '#9A9A9A',
				// 			 "text-align": "center"
				// 		 }}>{record.updatetime === undefined ? "--" : record.updatetime === "" ? "--" : record.updatetime}</span>
				// </span>
				// 	),
				// },
				{
					title: '最新完成关卡',
					dataIndex: 'curcomlevel',
					key: 'curcomlevel',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
											<span style={{
												color: '#07111B',
												textAlign: "center",
												width: '99px'
											}}>{record.Curcomlevel + "/" + this.state.challenges_count}</span>
        </span>
					),
				},
				{
					title: '结束前完成关卡',
					dataIndex: 'completion',
					key: 'completion',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
											<span style={{
												color: '#07111B',
												textAlign: "center",
												width: '99px'
											}}>{record.completion + "/" + this.state.challenges_count}</span>
        </span>
					),
				},
				{
					title:<span>关卡得分<Tooltip placement="top" title={<pre>
							计算规则:<br/>
              截止前学员完成的关卡才有成绩<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'final_score',
					key: 'final_score',
					align: 'center',
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
       	<span style={parseInt(record.final_score) <= 60 ? {
					color: '#747A7F',
					textAlign: "center",
					width: '99px',
				} : parseInt(record.final_score) < 90 ? {
					color: '#FF6800',
					textAlign: "center",
					width: '99px',
				} : parseInt(record.final_score) >= 90 ? {color: '#DD1717', textAlign: "center", width: '99px',} : {
					color: '#747A7F',
					textAlign: "center",
					width: '99px',
				}}>{record.final_score}</span>
        </span>
					)
				},
				{
					title: <span>效率分<Tooltip placement="top" title={allow_lates===true?<pre>
							补交结束时，系统根据学生在课堂成员中的<br/>
						  效率表现自动评分。计算规则:<br/>
							学生工作效率= log(实训总得分/实训总耗时)<br/>
							学生效率分 = 学生工作效率 / 课堂学生最高<br/>
						  工作效率 * 分值<br/>
					</pre>:<pre>
					作业截止时，系统根据学生在课堂成员中的<br/>
					效率表现自动评分。计算规则:<br/>
					学生工作效率= log(实训总得分/实训总耗时)<br/>
					学生效率分 = 学生工作效率 / 课堂学生最高<br/>
					工作效率 * 分值<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: 'font-14',
					width: '80px',
					render: (text, record) => (
						<span style={{
							width: '80px',
						}}>
            {
							record.efficiencyscore && record.efficiencyscore === "--" ? (
									<span style={{color: "#9A9A9A", width: '80px',}}>
												--
											</span>
								)
								:
								<span style={parseInt(record.efficiencyscore) <= 60 ? {
									color: '#747A7F',
									textAlign: "center",
									width: '80px',
								} : parseInt(record.efficiencyscore) < 90 ? {
									color: '#FF6800',
									textAlign: "center",
									width: '80px',
								} : parseInt(record.efficiencyscore) >= 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width: '80px',
								} : {color: '#747A7F', textAlign: "center", width: '80px',}}>{record.efficiencyscore}</span>
						}

        </span>
					)
				},
				{
					title: '当前成绩',
					dataIndex: 'work_score',
					key: 'work_score',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{width: '99px',}}>
						{
							record.work_score && record.work_score === "--" ?
								<span style={{color: '#9A9A9A', textAlign: "center", width: '99px',}}>{record.work_score}</span>
								:
								<span style={parseInt(record.work_score) >= 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width: '99px',
								} : parseInt(record.work_score) <= 60 ? {
									color: '#FF6800',
									textAlign: "center",
									width: '99px',
								} : {color: '#747A7F', textAlign: "center", width: '99px',}}>{record.work_score}</span>
						}

        </span>
					),
				},
				{
					title: '操作',
					dataIndex: 'operating',
					key: 'operating',
					align: "center",
					className: 'font-14',
					width: '40px',
					render: (text, record) => (
						<span style={{width: '40px'}}>
                        {
													record.submitstate === "未开启" ? <span style={{color: '#9A9A9A'}}>--</span>
														:
														<a style={{textAlign: "center"}}
															 className="color-blue"
															 onMouseDown={(e) => this.Viewstudenttraininginformationtysl2(e, record)}
															 onClick={() => this.Viewstudenttraininginformation(record)}>{record.operating}</a>
												}

        </span>
					),
				},
			],
			orders: "update_time",
			columnsstu2: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: "center",
					className: 'font-14',
					width: '100px',
					render: (text, record) => (
						<span style={{width: '100px'}}>
									<span style={{
										color: '#07111B',
										textAlign: "center",
										width: '100px'
									}}> 我</span>
            </span>
					),
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: "center",
					className: 'font-14 maxnamewidth110',
					width: '100px',
					render: (text, record) => (
						<span className="maxnamewidth110">
						{record.name === undefined ?
							<span style={{
								color: '#9A9A9A',
								textAlign: "center",
								width: '100px'
							}}>--</span>
							:
							record.name === "" ?
								<span style={{
									color: '#9A9A9A',
									textAlign: "center",
									width: '100px'
								}}>--</span>
								:
								record.name === null ?
									<span style={{
										color: '#9A9A9A',
										textAlign: "center",
										width: '100px'
									}}>--</span>
									:
									record.name === "--" ?
										<span style={{
											color: '#9A9A9A',
											textAlign: "center",
											width: '100px'
										}}>--</span>
										:
										<a className="maxnamewidth110" title={record.name} style={{
											color: '#07111B',
											textAlign: "center",
											width: '100px'
										}}>{record.name}</a>
						}

        </span>
					),
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: "center",
					className: 'font-14 maxnamewidth145',
					width: '145px',
					render: (text, record) => (
						<span className="maxnamewidth145" style={{
							width: '145px',
						}}>
							{record.stduynumber === undefined ?
								<span style={{
									color: '#000',
									textAlign: "center",
									width: '145px',
								}}>--
									</span>
								: record.stduynumber === null ?
									<span style={{
										color: '#000',
										textAlign: "center",
										width: '145px',
									}}>--
									</span>
									: record.stduynumber === "" ?
										<span style={{
											color: '#000',
											textAlign: "center",
											width: '145px',
										}}>--
									</span>
										:
										<a
											title={record.stduynumber}
											className="maxnamewidth145"
											style={{
												color: '#000',
												textAlign: "center",
												width: '145px',
											}}>{
											record.stduynumber
										}
										</a>

							}

        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: "center",
					className: 'font-14 maxnamewidth145',
					width: '145px',
					render: (text, record) => (
						<span className="font-14 maxnamewidth145" style={{width: '145px'}}>
							{record.classroom === undefined ?
								<a className=" font-14 maxnamewidth145"
									 style={{
										 color: '#9A9A9A',
										 textAlign: "center",
										 width: '145px',
									 }}>--</a> : record.classroom === "" ?
									<a className=" font-14 maxnamewidth145"
										 style={{
											 color: '#9A9A9A',
											 textAlign: "center",
											 width: '145px',
										 }}>--</a> : record.classroom === null ?
										<a className=" font-14 maxnamewidth145"
											 style={{
												 color: '#9A9A9A',
												 textAlign: "center",
												 width: '145px',
											 }}>--</a>
										:
										<a className=" font-14 maxnamewidth145"
											 title={record.classroom}
											 style={{
												 color: '#9A9A9A',
												 textAlign: "center",
												 width: '145px',
											 }}>{record.classroom}</a>
							}
        </span>
					),
				},
				{
					title: '作品状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: "center",
					className: 'font-14',
					width: '98px',
					render: (text, record) => (
						<span style={{width: '98px',}}>
				 <span style={record.submitstate === "迟交通关" ? {
					 color: '#DD1717',
					 textAlign: "center",
					 width: '98px',
				 } : record.submitstate === "按时通关" ? {color: '#29BD8B', textAlign: "center", width: '98px',}
					 : record.submitstate === "未通关" ? {color: '#F69707', textAlign: "center", width: '98px',}
						 : {
							 color: '#747A7F',
							 textAlign: "center",
							 width: '98px',
						 }}>{record.submitstate === undefined ? "--" : record.submitstate === "" ? "--" : record.submitstate === null ? "--" : record.submitstate}</span>

        </span>
					),
				},
				{
					title:<span>实训总耗时<Tooltip placement="top" title={<pre>
						计算规则:<br/>
						学员离开实训学习界面停止计时；<br/>
						评测首次通过之后，停止计时<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'cost_time',
					key: 'cost_time',
					align: 'center',
					className: 'font-14',
					width: '145px',
					render: (text, record) => (
						<span style={
							{
								color: '#747A7F',
								textAlign: "center",
								width: '145px',
							}
						}>
							{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time === "--" ? "--" :
								<span style={
									{
										color: '#747A7F',
										textAlign: "center",
										width: '145px',
									}
								}
								>{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time}
									</span>
							}
						</span>
					)

				},
				// {
				// 	title: '更新时间',
				// 	dataIndex: 'updatetime',
				// 	key: 'updatetime',
				// 	align: "center",
				// 	className:'font-14',
				// 	render: (text, record) => (
				// 		<span>
				//      <span style={{
				// 			 color: '#9A9A9A',
				// 			 "text-align": "center"
				// 		 }}>{record.updatetime === undefined ? "--" : record.updatetime === "" ? "--" : record.updatetime}</span>
				// </span>
				// 	),
				// },
				{
					title: '最新完成关卡',
					dataIndex: 'curcomlevel',
					key: 'curcomlevel',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
											<span style={{
												color: '#07111B',
												textAlign: "center",
												width: '99px'
											}}>{record.Curcomlevel + "/" + this.state.challenges_count}</span>
        </span>
					),
				},
				{
					title: '结束前完成关卡',
					dataIndex: 'completion',
					key: 'completion',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
											<span style={{
												color: '#07111B',
												textAlign: "center",
												width: '99px'
											}}>{record.completion + "/" + this.state.challenges_count}</span>
        </span>
					),
				},
				{
					title:<span>关卡得分<Tooltip placement="top" title={<pre>
							计算规则:<br/>
              截止前学员完成的关卡才有成绩<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'final_score',
					key: 'final_score',
					align: 'center',
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
       	<span style={parseInt(record.final_score) <= 60 ? {
					color: '#747A7F',
					textAlign: "center",
					width: '99px',
				} : parseInt(record.final_score) < 90 ? {
					color: '#FF6800',
					textAlign: "center",
					width: '99px',
				} : parseInt(record.final_score) >= 90 ? {color: '#DD1717', textAlign: "center", width: '99px',} : {
					color: '#747A7F',
					textAlign: "center",
					width: '99px',
				}}>{record.final_score}</span>
        </span>
					)
				},
				{
					title:  <span>效率分<Tooltip placement="top" title={allow_lates===true?<pre>
							补交结束时，系统根据学生在课堂成员中的<br/>
						  效率表现自动评分。计算规则:<br/>
							学生工作效率= log(实训总得分/实训总耗时)<br/>
							学生效率分 = 学生工作效率 / 课堂学生最高<br/>
						  工作效率 * 分值<br/>
					</pre>:<pre>
					作业截止时，系统根据学生在课堂成员中的<br/>
					效率表现自动评分。计算规则:<br/>
					学生工作效率= log(实训总得分/实训总耗时)<br/>
					学生效率分 = 学生工作效率 / 课堂学生最高<br/>
					工作效率 * 分值<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: 'font-14',
					width: '80px',
					render: (text, record) => (
						<span style={{
							width: '80px',
						}}>
            {
							record.efficiencyscore && record.efficiencyscore === "--" ? (
									<span style={{color: "#9A9A9A", width: '80px',}}>
												--
											</span>
								)
								:
								<span style={parseInt(record.efficiencyscore) <= 60 ? {
									color: '#747A7F',
									textAlign: "center",
									width: '80px',
								} : parseInt(record.efficiencyscore) < 90 ? {
									color: '#FF6800',
									textAlign: "center",
									width: '80px',
								} : parseInt(record.efficiencyscore) >= 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width: '80px',
								} : {color: '#747A7F', textAlign: "center", width: '80px',}}>{record.efficiencyscore}</span>
						}

        </span>
					)
				},
				{
					title: '当前成绩',
					dataIndex: 'work_score',
					key: 'work_score',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{width: '99px',}}>
						{
							record.work_score && record.work_score === "--" ?
								<span style={{color: '#9A9A9A', textAlign: "center", width: '99px',}}>{record.work_score}</span>
								:
								<span style={parseInt(record.work_score) >= 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width: '99px',
								} : parseInt(record.work_score) <= 60 ? {
									color: '#FF6800',
									textAlign: "center",
									width: '99px',
								} : {color: '#747A7F', textAlign: "center", width: '99px',}}>{record.work_score}</span>
						}

        </span>
					),
				},
				{
					title: '操作',
					dataIndex: 'operating',
					key: 'operating',
					align: "center",
					className: 'font-14',
					width: '40px',

					render: (text, record) => (
						<span style={{width: '40px'}}>
                        {
													record.submitstate === "未开启" ? <span style={{color: '#9A9A9A'}}>--</span>
														:
														<a style={{textAlign: "center"}}
															 className="color-blue"
															 onMouseDown={(e) => this.Viewstudenttraininginformationtysl2(e, record)}
															 onClick={() => this.Viewstudenttraininginformation(record)}>{record.operating}</a>
												}

        </span>
					),
				},
			],
			b_order: "desc",
			myorders: "desc",
			allow_late: false,
			checkedValuesine: undefined,
			checkedValuesineinfo: [],
			work_efficiency: false,
			resultint: 0,
			teacherlist: undefined,
			searchtext: "",
			course_groupysls: undefined,
			course_groupyslstwo: [],
			visible: false,
			userid: 0,
			course_group: null,
			publish_immediately: undefined,
			end_immediately: undefined,
			mystyle: {"display": "block", color: '#07111B', textAlign: "center"},
			mystyles: {"display": "none", color: '#07111B', textAlign: "center"},
			mystyle1: {"display": "block"},
			mystyles1: {"display": "none"},
			unlimited: 0,
			unlimitedtwo: 1,
			code_review: false,
			boolgalist: true,
			challenges_count: 0,
			experience: 0,
			columns: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span style={{color: '#07111B', textAlign: "center"}}>{record.number}
        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: 'font-14 maxnamewidth100',
					width: '100px',
					render: (text, record) => (
						<a className="maxnamewidth100" title={record.name}
							 style={{color: '#07111B', textAlign: "center"}}>{record.name}</a>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: "center",
					className: 'font-14 maxnamewidth110',
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span className="maxnamewidth110">
							{record.stduynumber === undefined ?
								<span style={{
									color: '#000',
									textAlign: "center"
								}}>--
									</span>
								: record.stduynumber === null ?
									<span style={{
										color: '#000',
										textAlign: "center"
									}}>--
									</span>
									: record.stduynumber === "" ?
										<span style={{
											color: '#000',
											textAlign: "center"
										}}>--
									</span>
										:
										<a
											title={record.stduynumber}
											className="maxnamewidth110"
											style={{
												color: '#000',
												textAlign: "center"
											}}>{
											record.stduynumber
										}
										</a>

							}

        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: 'font-14 maxnamewidth120',
					render: (text, record) => (
						<span className="maxnamewidth120">
							{record.classroom === undefined ? <span className="ysltable" style={{
								color: '#07111B',
								textAlign: "center"
							}}> --</span> : record.classroom === "" ? <span className="ysltable" style={{
								color: '#07111B',
								textAlign: "center"
							}}>--</span> : record.classroom === null ?
								<span className="ysltable" style={{color: '#07111B', textAlign: "center"}}>--</span> :
								<a className="ysltable maxnamewidth120" title={record.classroom}
									 style={{color: '#07111B', textAlign: "center"}}>{record.classroom}</a>}
						</span>
					)
				},
				{
					title: '作品状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span style={record.submitstate === "迟交通关" ? {
							color: '#DD1717',
							textAlign: "center"
						} : record.submitstate === "按时通关" ? {color: '#29BD8B', textAlign: "center"}
							: record.submitstate === "未通关" ? {color: '#F69707', textAlign: "center", width: '98px'}
								: {
									color: '#747A7F',
									textAlign: "center"
								}}>{record.submitstate}
        </span>
					)

				},
				{
					title:<span>实训总耗时<Tooltip placement="top" title={<pre>
						计算规则:<br/>
						学员离开实训学习界面停止计时；<br/>
						评测首次通过之后，停止计时<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'cost_time',
					key: 'cost_time',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span style={
							{
								color: '#747A7F',
								textAlign: "center"
							}
						}>
							{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time === "--" ? "--" :

								<a style={
									{
										color: '#747A7F',
										textAlign: "center"
									}
								}
								>{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time}
								</a>
							}
						</span>
						// 		<a style={
						// 			{
						// 				color: '#747A7F',
						// 				"text-align": "center"
						// 			}
						// 		}
						// 		title={record.cost_time === null ? "--":record.cost_time === undefined ?"--":record.cost_time}
						// 		>{record.cost_time === null ? "--":record.cost_time === undefined ?"--":record.cost_time }
						// </a>
					)

				},
				// {
				// 	title: '更新时间',
				// 	dataIndex: 'updatetime',
				// 	key: 'updatetime',
				// 	align: 'center',
				// 	className:'font-14',
				// 	render: (text, record) => (
				// 		<span style={{color: '#9A9A9A', "text-align": "center"}}>{record.updatetime}</span>
				// 	),
				// },
				{
					title: '最新完成关卡',
					dataIndex: 'curcomlevel',
					key: 'curcomlevel',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
											<span style={{
												color: '#07111B',
												textAlign: "center",
												width: '99px'
											}}>{record.Curcomlevel + "/" + this.state.challenges_count}</span>
        </span>
					),
				},
				{
					title: '结束前完成关卡',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span>
											<span style={{
												color: '#07111B',
												"text-align": "center"
											}}>{record.completion + "/" + this.state.challenges_count} </span>
       			 </span>
					)
				},
				{
					title:<span>关卡得分<Tooltip placement="top" title={<pre>
							计算规则:<br/>
              截止前学员完成的关卡才有成绩<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'final_score',
					key: 'final_score',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span>
       	<span style={parseInt(record.final_score) <= 60 ? {
					color: '#747A7F',
					"text-align": "center"
				} : parseInt(record.final_score) < 90 ? {
					color: '#FF6800',
					"text-align": "center"
				} : parseInt(record.final_score) >= 90 ? {color: '#DD1717', "text-align": "center"} : {
					color: '#747A7F',
					"text-align": "center"
				}}>{record.final_score}</span>
        </span>
					)
				},
				{
					title:  <span>效率分<Tooltip placement="top" title={allow_lates===true?<pre>
							补交结束时，系统根据学生在课堂成员中的<br/>
						  效率表现自动评分。计算规则:<br/>
							学生工作效率= log(实训总得分/实训总耗时)<br/>
							学生效率分 = 学生工作效率 / 课堂学生最高<br/>
						  工作效率 * 分值<br/>
					</pre>:<pre>
					作业截止时，系统根据学生在课堂成员中的<br/>
					效率表现自动评分。计算规则:<br/>
					学生工作效率= log(实训总得分/实训总耗时)<br/>
					学生效率分 = 学生工作效率 / 课堂学生最高<br/>
					工作效率 * 分值<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span>
            {
							record.efficiencyscore && record.efficiencyscore === "--" ? (
									this.state.allow_late && this.state.allow_late === false ?
										<span style={{color: "#9A9A9A"}}>
												--
											</span>
										:
										this.state.allow_late && this.state.allow_late === true ?
											<span style={{color: "#9A9A9A"}}>
													--
												</span>
											:
											<span style={{color: "#9A9A9A"}}>
												--
											</span>
								)
								:
								<span style={parseInt(record.efficiencyscore) <= 60 ? {
									color: '#747A7F',
									"text-align": "center"
								} : parseInt(record.efficiencyscore) < 90 ? {
									color: '#FF6800',
									"text-align": "center"
								} : parseInt(record.efficiencyscore) >= 90 ? {
									color: '#DD1717',
									"text-align": "center"
								} : {color: '#747A7F', "text-align": "center"}}>{record.efficiencyscore}</span>
						}

        </span>
					)
				},
				{
					title: '当前成绩',
					dataIndex: 'work_score',
					key: 'work_score',
					align: 'center',
					className: 'font-14',
					sorter: true,
					sortDirections: sortDirections,
					defaultSortOrder: 'descend',
					render: (text, record) => (
						<span>
									{
										record.ultimate_score === true ?
											<Tooltip placement="bottom" title={<div>
												{/*<div>{record.user_name}{record.user_login}</div>*/}
												<div>{record.work_score === "--" ? <span>最终调整成绩：0分</span> :
													<span>最终调整成绩：{record.work_score}分</span>}</div>
											</div>}>
												{
													record.work_score && record.work_score === "--" ?
														<span style=
																		{{
																			color: '#9A9A9A',
																			"text-align": "center"
																		}}>{record.work_score}</span>
														:
														<span style={parseInt(record.work_score) <= 60 ? {
															color: '#747A7F',
															"text-align": "center"
														} : parseInt(record.work_score) < 90 ? {
															color: '#FF6800',
															"text-align": "center"
														} : parseInt(record.work_score) >= 90 ? {color: '#DD1717', "text-align": "center"} : {
															color: '#747A7F',
															"text-align": "center"
														}}>{record.work_score}</span>
												}
											</Tooltip>
											:
											<Tooltip placement="bottom" title={<div>
												{/*<div>{record.user_name}{record.user_login}</div>*/}

												<div>{record.final_score === "--" ? <span>关卡得分：0分</span> :
													<span>关卡得分：{record.final_score}分</span>}</div>

												<div>{record.efficiencyscore === "--" ? <span>效率评分：0分</span> :
													<span>效率评分：{record.efficiencyscore}分</span>}</div>

												<div>{record.late_penalty === "--" ? <span>迟交扣分：0分</span> :
													<span>迟交扣分：{record.late_penalty}分</span>}</div>

												{answer_open_evaluation===true?"":<div>查看参考答案：{record.view_answer_count}关</div>}

												<div>{record.work_score === "--" ? <span>最终成绩：0分</span> :
													<span>最终成绩：{record.work_score}分</span>}</div>
											</div>}>
												{
													record.work_score && record.work_score === "--" ?
														<span style=
																		{{
																			color: '#9A9A9A',
																			"text-align": "center"
																		}}>{record.work_score}</span>
														:
														<span style={parseInt(record.work_score) <= 60 ? {
															color: '#747A7F',
															"text-align": "center"
														} : parseInt(record.work_score) < 90 ? {
															color: '#FF6800',
															"text-align": "center"
														} : parseInt(record.work_score) >= 90 ? {color: '#DD1717', "text-align": "center"} : {
															color: '#747A7F',
															"text-align": "center"
														}}>{record.work_score}</span>
												}
											</Tooltip>

									}
               </span>
					)
				},
				{
					title: '操作',
					dataIndex: 'operating',
					key: 'operating',
					display: 'block',
					align: 'center',
					className: 'font-14',
					width: '40px',

					render: (text, record) => (
						record.submitstate === "未开启" ?
							<a style={{textAlign: "center",width: '40px'}} className="color-blue"
								 onMouseDown={(e) => this.Viewstudenttraininginformationtysl2(e, record)}
								 onClick={() => this.Viewstudenttraininginformationt(record)}>{record.has_comment===true?"详情":"评阅 "}</a> :
							<span>
                       <a style={{textAlign: "center"}} className="color-blue maxnamewidth120"
													onMouseDown={(e) => this.Viewstudenttraininginformationtysl2(e, record)}
													onClick={() => this.Viewstudenttraininginformationt(record)}>{record.has_comment===true?"详情":"评阅 "}</a>
        </span>
					)
				},
			],
			columnss: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span style={{color: '#07111B', "text-align": "center"}}>{record.number}
        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: 'font-14 maxnamewidth100',
					width: '100px',
					render: (text, record) => (
						<a className="maxnamewidth100" title={record.name}
							 style={{color: '#07111B', "text-align": "center"}}>{record.name}</a>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: "center",
					className: 'font-14 maxnamewidth110',
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span className="maxnamewidth110">
							{record.stduynumber === undefined ?
								<span style={{
									color: '#000',
									"text-align": "center"
								}}>--
									</span>
								: record.stduynumber === null ?
									<span style={{
										color: '#000',
										"text-align": "center"
									}}>--
									</span>
									: record.stduynumber === "" ?
										<span style={{
											color: '#000',
											"text-align": "center"
										}}>--
									</span>
										:
										<a
											title={record.stduynumber}
											className="maxnamewidth110"
											style={{
												color: '#000',
												textAlign: "center"
											}}>{
											record.stduynumber
										}
										</a>

							}

        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: 'font-14 maxnamewidth120',
					render: (text, record) => (
						<span className="maxnamewidth120">
							{record.classroom === undefined ? <span className="ysltable" style={{
								color: '#07111B',
								textAlign: "center"
							}}> --</span> : record.classroom === "" ? <span className="ysltable" style={{
								color: '#07111B',
								textAlign: "center"
							}}>--</span> : record.classroom === null ?
								<span className="ysltable " style={{color: '#07111B', textAlign: "center"}}>--</span> :
								<a className="ysltable maxnamewidth120" title={record.classroom}
									 style={{color: '#07111B', textAlign: "center"}}>{record.classroom}</a>}
						</span>
					)
				},
				{
					title: '作品状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span style={record.submitstate === "迟交通关" ? {
							color: '#DD1717',
							textAlign: "center"
						} : record.submitstate === "按时通关" ? {color: '#29BD8B', textAlign: "center"}
							: record.submitstate === "未通关" ? {color: '#F69707', textAlign: "center", width: '98px'}
								: {
									color: '#747A7F',
									textAlign: "center"
								}}>{record.submitstate}
        </span>
					)

				},
				// {
				// 	title: '更新时间',
				// 	dataIndex: 'updatetime',
				// 	key: 'updatetime',
				// 	align: 'center',
				// 	className:'font-14',
				// 	render: (text, record) => (
				// 		<span style={{color: '#9A9A9A', "text-align": "center"}}>{record.updatetime}</span>
				// 	),
				// },
				{
					title:<span>实训总耗时<Tooltip placement="top" title={<pre>
						计算规则:<br/>
						学员离开实训学习界面停止计时；<br/>
						评测首次通过之后，停止计时<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'cost_time',
					key: 'cost_time',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span style={
							{
								color: '#747A7F',
								textAlign: "center"
							}
						}>
							{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time === "--" ? "--" :
								<a style={
									{
										color: '#747A7F',
										textAlign: "center"
									}
								}
								>{record.cost_time === null ? "--" : record.cost_time === undefined ? "--" : record.cost_time}
								</a>
							}
						</span>
					)
				},
				{
					title: '最新完成关卡',
					dataIndex: 'curcomlevel',
					key: 'curcomlevel',
					align: "center",
					className: 'font-14',
					width: '99px',
					render: (text, record) => (
						<span style={{
							width: '99px',
						}}>
											<span style={{
												color: '#07111B',
												textAlign: "center",
												width: '99px'
											}}>{record.Curcomlevel + "/" + this.state.challenges_count}</span>
        </span>
					),
				},
				{
					title: '结束前完成关卡',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span>
									<span style={{
										color: '#07111B',
										textAlign: "center"
									}}>{record.completion + "/" + this.state.challenges_count} </span>
        		</span>
					)
				},
				{
					title:<span>关卡得分<Tooltip placement="top" title={<pre>
						  计算规则:<br/>
              截止前学员完成的关卡才有成绩<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'final_score',
					key: 'final_score',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span>
       	<span style={parseInt(record.final_score) <= 60 ? {
					color: '#747A7F',
					textAlign: "center"
				} : parseInt(record.final_score) < 90 ? {
					color: '#FF6800',
					textAlign: "center"
				} : parseInt(record.final_score) >= 90 ? {color: '#DD1717', textAlign: "center"} : {
					color: '#747A7F',
					textAlign: "center"
				}}>{record.final_score}</span>
        </span>
					)
				},
				{
					title:  <span>效率分<Tooltip placement="top" title={allow_lates===true?<pre>
							补交结束时，系统根据学生在课堂成员中的<br/>
						  效率表现自动评分。计算规则:<br/>
							学生工作效率= log(实训总得分/实训总耗时)<br/>
							学生效率分 = 学生工作效率 / 课堂学生最高<br/>
						  工作效率 * 分值<br/>
					</pre>:<pre>
					作业截止时，系统根据学生在课堂成员中的<br/>
					效率表现自动评分。计算规则:<br/>
					学生工作效率= log(实训总得分/实训总耗时)<br/>
					学生效率分 = 学生工作效率 / 课堂学生最高<br/>
					工作效率 * 分值<br/>
					</pre>}><img src={getImageUrl("images/educoder/problem.png")} className={"ml2"}/></Tooltip></span>,
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: 'font-14',
					render: (text, record) => (
						<span>
            {
							record.efficiencyscore && record.efficiencyscore === "--" ? (
									this.state.allow_late && this.state.allow_late === false ?
										<span style={{color: "#9A9A9A"}}>
												--
											</span>
										:
										this.state.allow_late && this.state.allow_late === true ?
											<span style={{color: "#9A9A9A"}}>
													--
												</span>
											:
											<span style={{color: "#9A9A9A"}}>
												--
											</span>
								)
								:
								<span style={parseInt(record.efficiencyscore) <= 60 ? {
									color: '#747A7F',
									textAlign: "center"
								} : parseInt(record.efficiencyscore) < 90 ? {
									color: '#FF6800',
									textAlign: "center"
								} : parseInt(record.efficiencyscore) >= 90 ? {
									color: '#DD1717',
									textAlign: "center"
								} : {color: '#747A7F', textAlign: "center"}}>{record.efficiencyscore}</span>
						}

        </span>
					)
				},
				{
					title: '当前成绩',
					dataIndex: 'work_score',
					key: 'work_score',
					align: 'center',
					className: 'font-14',
					sorter: true,
					sortDirections: sortDirections,
					defaultSortOrder: 'descend',
					render: (text, record) => (
						<span>
									{
										record.ultimate_score === true ?
											<Tooltip placement="bottom" title={<div>
												{/*<div>{record.user_name}{record.user_login}</div>*/}
												<div>{record.work_score === "--" ? <span>最终调整成绩：0分</span> :
													<span>最终调整成绩：{record.work_score}分</span>}</div>
											</div>}>
												{
													record.work_score && record.work_score === "--" ?
														<span style=
																		{{
																			color: '#9A9A9A',
																			textAlign: "center"
																		}}>{record.work_score}</span>
														:
														<span style={parseInt(record.work_score) <= 60 ? {
															color: '#747A7F',
															textAlign: "center"
														} : parseInt(record.work_score) < 90 ? {
															color: '#FF6800',
															textAlign: "center"
														} : parseInt(record.work_score) >= 90 ? {color: '#DD1717', textAlign: "center"} : {
															color: '#747A7F',
															textAlign: "center"
														}}>{record.work_score}</span>
												}
											</Tooltip>
											:
											<Tooltip placement="bottom" title={<div>
												{/*<div>{record.user_name}{record.user_login}</div>*/}

												<div>{record.final_score === "--" ? <span>关卡得分：0分</span> :
													<span>关卡得分：{record.final_score}分</span>}</div>

												<div>{record.efficiencyscore === "--" ? <span>效率评分：0分</span> :
													<span>效率评分：{record.efficiencyscore}分</span>}</div>

												<div>{record.late_penalty === "--" ? <span>迟交扣分：0分</span> :
													<span>迟交扣分：{record.late_penalty}分</span>}</div>

												{answer_open_evaluation===true?"":<div>查看参考答案：{record.view_answer_count}关</div>}

												<div>{record.work_score === "--" ? <span>最终成绩：0分</span> :
													<span>最终成绩：{record.work_score}分</span>}</div>
											</div>}>
												{
													record.work_score && record.work_score === "--" ?
														<span style=
																		{{
																			color: '#9A9A9A',
																			textAlign: "center"
																		}}>{record.work_score}</span>
														:
														<span style={parseInt(record.work_score) <= 60 ? {
															color: '#747A7F',
															textAlign: "center"
														} : parseInt(record.work_score) < 90 ? {
															color: '#FF6800',
															textAlign: "center"
														} : parseInt(record.work_score) >= 90 ? {color: '#DD1717', textAlign: "center"} : {
															color: '#747A7F',
															textAlign: "center"
														}}>{record.work_score}</span>
												}
											</Tooltip>

									}
               </span>
					)
				},
				{
					title: '操作',
					dataIndex: 'operating',
					key: 'operating',
					display: 'block',
					align: 'center',
					className: 'font-14',
					width: '40px',
					render: (text, record) => (
						record.submitstate === "未开启" ?
							<a style={{textAlign: "center",width: '40px'}} className="color-blue"
								 onMouseDown={(e) => this.Viewstudenttraininginformationtysl2(e, record)}
								 onClick={() => this.Viewstudenttraininginformationt(record)}>{record.has_comment===true?"详情":"评阅"}</a> :
							<span>
                       <a style={{textAlign: "center"}} className="color-blue"
													onMouseDown={(e) => this.Viewstudenttraininginformationtysl2(e, record)}
													onClick={() => this.Viewstudenttraininginformationt(record)}>{record.has_comment===true?"详情":"评阅"}</a>
        </span>
					)
				},
			],
			yslpros: false,
			datajs: [],
			homework_status: undefined,

		}
	}

	componentDidCatch(error, info) {


	}



	componentDidMount() {
		this.student();
	}

	isupdatas = () => {
		var homeworkid = this.props.match.params.homeworkid;
		// this.Gettitleinformation(homeworkid);
		this.Getalistofworks(homeworkid, false);
	}
	Isupdatass = () => {
		var homeworkid = this.props.match.params.homeworkid;
		// this.Gettitleinformation(homeworkid);
		this.Getalistofworks(homeworkid, false);
	}

	//实训作业tbale 列表塞选数据
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
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							myorders: "asc",
							orders: "student_id",
							loadingstate: true,
						});
						this.Startsortingt("student_id", this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							myorders: "desc",
							orders: "student_id",
							loadingstate: true,
						})
						this.Startsortingt("student_id", this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "desc");
					}
				}
			} catch (e) {

			}
			// console.log("table1handleChange");
			// console.log(sorter.columnKey);
			try {
				//学生成绩排序
				if (sorter.columnKey === "work_score") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							myorders: "asc",
							orders: "work_score",
							loadingstate: true,
						})
						this.Startsortingt("work_score", this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							myorders: "desc",
							orders: "work_score",
							loadingstate: true,
						})
						this.Startsortingt("work_score", this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "desc");
					}
				}
			} catch (e) {

			}

		}

	}
	/////////老师操作
	// tearchar=()=>{
	// 	var homeworkid = this.props.match.params.homeworkid;
	// 	// console.log(homeworkid)
	// 	// this.Gettitleinformation(homeworkid);
	// 	this.Getalistofworkst(homeworkid);
	// 	let query = this.props.location.pathname;
	// 	const type = query.split('/');
	// 	this.setState({
	// 		shixuntypes: type[3]
	// 	})
	// 	this.props.triggerRef(this)
	// }
	student = () => {
		// console.log("914");
		// debugger

		var homeworkid = this.props.match.params.homeworkid;
		this.Getalistofworks(homeworkid, true);
		let query = this.props.location.pathname;
		const type = query.split('/');
		this.setState({
			shixuntypes: type[3]
		})
		this.props.triggerRef(this);
	}


	//卸载组件取消倒计时
	componentWillUnmount() {
		// clearInterval(this.timer);
	}

	// 获取作品列表
	Getalistofworks = (homeworkid, bool) => {
		// console.log("获取作品列表");
		// console.log("935");
		// debugger111111111111111
		let searchtype = this.props.history.location.search;
		let urll = `/homework_commons/${homeworkid}/works_list.json`;
		var datasysl = {
			search: this.state.searchtext,
			order: this.state.orders,
			b_order: "desc",
			page: this.state.page,
			limit: this.state.limit,
			work_status: this.state.course_groupyslstwo,
			course_group: this.state.checkedValuesineinfo,
		}
		axios.post(urll, datasysl).then((result) => {
			if (result === undefined) {
				return
			}
			this.setState({
				teacherdata: result.data,
				task_status: result.data.task_status,
				course_group_info: result.data.course_group_info,
				student_works: result.data.student_works,
				jobsettingsdata: result,
				publish_immediately: result.data.publish_immediately,
				end_immediately: result.data.end_immediately,
				id: result.data.id,
				work_efficiency: result.data.work_efficiency,
				code_review: result.data.code_review,
				challenges_count: result.data.challenges_count,
				view_report: result.data.view_report,
				allow_late: result.data.allow_late,
				loadingstate: false,
				computeTimetype: true,
				homework_status: result.data.homework_status,
				update_score: result.data.update_score,
			});
			allow_lates=result.data.allow_late;
			answer_open_evaluation=result.data.answer_open_evaluation;
			//老师
			this.seacthdatat(result.data, result.data.student_works, result.data.work_efficiency, result.data.course_group_info, 1);

			if (result.data.student_works === undefined || result.data.student_works === null || JSON.stringify(result.data.student_works) === "[]") {
				this.seacthdata(result.data);
			} else {
				this.seacthdatas(result.data, result.data.student_works);
			}
			//开始自动计算成绩刷新 老师才有权限
			try {
				if (this.props.isAdmin() === true) {
					if (result.data.update_score === true) {
						if (bool === true) {
							if (searchtype === "?tab=0") {
								try {
									this.props.yslslowCheckresults();
								} catch (e) {

								}
								this.setComputeTimet();
							}
						}
					}
				}
			} catch (e) {

			}

			this.props.Getdataback(result, result.data);

		}).catch((error) => {
			console.log(error);
		})
	}
	//一键评阅的按钮
	AkeyreviewitGetalistofworkstwo=()=>{
		this.setState({
			loadingstate: true,
		})
		this.Startsortingt("", "", "", "", 1, 20);
	}
// 获取作品列表
	Getalistofworkstwo = (ordervlue, checkedValuesine, checkedValuesineinfo, searchtext, page, limit) => {
		// console.log("获取作品列表");222222222222
		var homeworkid = this.props.match.params.homeworkid;
		let urll = `/homework_commons/${homeworkid}/works_list.json`;
		// console.log(homeworkid);

		// search:搜索关键字
		// order:排序方式：更新时间：update_time，当前成绩：work_score，学号：student_id
		// b_order:desc：倒序 ， asc：顺序
		// work_status:0:未开启， 1:按时完成， 2:延时完成，“”不限
		// course_group:分班情况 [232, 231]， []:不限（空数组）
		var order = "asc";
		if (ordervlue === "updated_at") {
			order = "desc";
		}
		var data = {
			search: "",
			order: ordervlue,
			b_order: order,
			work_status: "",
			course_group: "",
			page: page,
			limit: limit,
		}
		axios.post(urll, data).then((result) => {
			if (result) {
				// console.log("学生未截至未公开的作品列表")
				// console.log(JSON.stringify(result))
				this.setState({
					teacherdata: result.data,
					task_status: result.data.task_status,
					course_group_info: result.data.course_group_info,
					student_works: result.data.student_works,
					loadingstate: false,
					jobsettingsdata: result,
					publish_immediately: result.data.publish_immediately,
					work_efficiency: result.data.work_efficiency,
					end_immediately: result.data.end_immediately,
					code_review: result.data.code_review,
					challenges_count: result.data.challenges_count,
					view_report: result.data.view_report,
					homework_status: result.data.homework_status,
				});
				if (result.data.student_works === undefined || result.data.student_works === null || JSON.stringify(result.data.student_works) === "[]") {
					this.seacthdata(result.data);
				} else {
					this.seacthdatas(result.data, result.data.student_works);
				}
				this.props.Getdataback(result, result.data);

			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				loadingstate: false
			})
		})
	}
	TablePagination = (e) => {
		// console.log(e.current);
		this.setState({
			page: e.current
		})

	}

	seacthdatas = (teacherdata, student_works) => {
		// console.log("1197");
		// console.log(this.props.isNotMember());
		let {page, limit, work_efficiency} = this.state;
		let datalist = [];
		let datalists = [];
		var styletable = {"display": "none"}
		var arr = [];
		var arr2 = [];
		for (var i = 0; i < this.state.columnsstu.length; i++) {
			var item = this.state.columnsstu[i];
			if (this.props.isNotMember() === true) {
				if (item.title === "关卡得分") {
					continue
				}
				if (item.key === "efficiencyscore") {
					continue
				}

				if (item.title === "效率分") {
					continue
				}
				if (item.title === "当前成绩") {
					continue
				}
				if (item.title === "学号") {
					continue
				} else {
					arr.push(item);
				}
			} else {
				if (work_efficiency === false) {
					if (item.key === "efficiencyscore") {
						continue
					}

					if (item.title === "关卡得分") {
						continue
					} else if (item.title === "效率分") {
						continue

					} else {
						arr.push(item);
					}
				} else {
					arr.push(item);
				}

			}
		}
		try {
			for (var i = 0; i < this.state.columnsstu2.length; i++) {
				var item = this.state.columnsstu2[i];
				if (this.props.isNotMember() === true) {
					if (item.title === "关卡得分") {
						continue
					}
					if (item.key === "efficiencyscore") {
						continue
					}

					if (item.title === "效率分") {
						continue
					}
					if (item.title === "当前成绩") {
						continue
					}
					if (item.title === "学号") {
						continue
					} else {
						arr2.push(item);
					}
				} else {
					if (work_efficiency === false) {
						if (item.key === "efficiencyscore") {
							continue
						}

						if (item.title === "关卡得分") {
							continue
						} else if (item.title === "效率分") {
							continue

						} else {
							arr2.push(item);
						}
					} else {
						arr2.push(item);
					}

				}
			}
		} catch (e) {
			arr2 = this.state.columnsstu2;
		}
		let columns2 = arr;
		let columns3 = arr2;
		var teacherlists = undefined;
		if (teacherdata !== undefined) {
			// console.log("seacthdata设置数据")
			// console.log(this.state.teacherdata.id )
			if (teacherdata.id === undefined) {
				this.setState({
					data: [],
					loadingstate: false,
					styletable: styletable,
				})

			} else {
				// console.log(teacherdata)
				if (teacherdata.id !== undefined || teacherdata.id !== null || teacherdata.id !== "") {
					// console.log("seacthdata设置数据1")
					// console.log(this.state.teacherdata )
					var timedata = moment(teacherdata.update_time).format('YYYY-MM-DD HH:mm');
					datalist.push({
						myid: teacherdata.id,
						number: 1,
						name: teacherdata.user_name,
						stduynumber: teacherdata.student_id,
						classroom: teacherdata.group_name,
						cost_time: teacherdata.cost_time,
						has_comment:teacherdata.has_comment,
						submitstate: teacherdata.work_status === 0 ? "未开启" : teacherdata.work_status === 1 ? "未通关" : teacherdata.work_status === 2 ? "按时通关" : "迟交通关",
						// updatetime:this.state.teacherdata.student_works[i].update_time,
						// updatetime:"",
						updatetime: timedata === "Invalid date" ? "--" : timedata,
						completion: teacherdata.complete_count === null ? "0" : teacherdata.complete_count === undefined ? "0" : teacherdata.complete_count,
						levelscore: teacherdata.final_score,
						view_answer_count: teacherdata.view_answer_count,
						efficiencyscore: teacherdata.eff_score,
						final_score: teacherdata.final_score===null||teacherdata.final_score===undefined||teacherdata.final_score===""?"--":teacherdata.final_score,
						work_score: teacherdata.work_score===null||teacherdata.work_score===undefined||teacherdata.work_score===""?"--":teacherdata.work_score,
						operating: "查看",
						late_penalty: teacherdata.late_penalty === null ? "0" : teacherdata.late_penalty === undefined ? "0" : teacherdata.late_penalty,
						ultimate_score: teacherdata.ultimate_score,
						user_name: teacherdata.user_name,
						user_login: teacherdata.user_login,
						Curcomlevel: teacherdata.current_complete_count===undefined||teacherdata.current_complete_count===null||teacherdata.current_complete_count===""?0:teacherdata.current_complete_count,

					})

					// }
					// var teacherlist = {  //分页
					// 	total: teacherdata.student_works.length, //数据总数量
					// 	pageSize: teacherdata.student_works.length,  //一页显示几条
					// 	current: this.state.page,
					// }
					styletable = {"display": "block",}
				}
			}

		}


		if (student_works !== undefined) {

			for (var i = 0; i < student_works.length; i++) {
				// console.log("11157==--=-=-=-=");
				// console.log(student_works);
				var timedata = moment(student_works[i].update_time).format('YYYY-MM-DD HH:mm');
				datalists.push({
					myid: student_works[i].id,
					number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
					name: student_works[i].user_name,
					stduynumber: student_works[i].student_id,
					classroom: student_works[i].group_name,
					cost_time: student_works[i].cost_time,
					has_comment:student_works[i].has_comment,
					submitstate: student_works[i].work_status === 0 ? "未开启" : student_works[i].work_status === 1 ? "未通关" : student_works[i].work_status === 2 ? "按时通关" : "迟交通关",
					// updatetime:this.state.teacherdata.student_works[i].update_time,
					// updatetime:"",
					updatetime: timedata === "Invalid date" ? "--" : timedata,
					completion: student_works[i].complete_count === null ? "0" : student_works[i].complete_count === undefined ? "0" : student_works[i].complete_count,
					levelscore: student_works[i].final_score,
					final_score: student_works[i].final_score=== null ||student_works[i].final_score=== undefined||student_works[i].final_score=== ""?"--":student_works[i].final_score,
					work_score: student_works[i].work_score===null||student_works[i].work_score===undefined||student_works[i].work_score===""?"--":student_works[i].work_score,
					efficiencyscore: student_works[i].eff_score === "0.0" ? "--" : student_works[i].eff_score === "0" ? "--" : student_works[i].eff_score,
					view_answer_count: student_works[i].view_answer_count,
					operating: "查看",
					late_penalty: student_works[i].late_penalty === null ? "0" : student_works[i].late_penalty === undefined ? "0" : student_works[i].late_penalty,
					ultimate_score: student_works[i].ultimate_score,
					user_name: student_works[i].user_name,
					user_login: student_works[i].user_login,
					Curcomlevel:student_works[i].current_complete_count===null||student_works[i].current_complete_count===null||student_works[i].current_complete_count===""?0:student_works[i].current_complete_count,
				})

			}

		}
		// console.log("554");
		// console.log("Listofworksstudentone.js45666");
		// console.log(columns2);
		// console.log(columns3);

		// console.log(arr);
		this.setState({
			data: datalist,
			datas: datalists,
			teacherlists: teacherlists,
			loadingstate: false,
			styletable: styletable,
			columnsstu: columns2,
			columnsstu2: columns3,

		})
	}
	// 设置数据
	seacthdata = (teacherdata) => {
		// console.log("1326");
		// console.log(this.props.isNotMember());
		let datalist = [];


		var arr = [];
		var arr2 = [];
		for (var i = 0; i < this.state.columnsstu.length; i++) {
			var item = this.state.columnsstu[i];

			if (this.props.isNotMember() === true) {
				if (item.title === "关卡得分") {
					continue
				}
				if (item.key === "efficiencyscore") {
					continue
				}

				if (item.title === "效率分") {
					continue
				}
				if (item.title === "当前成绩") {
					continue
				}
				if (item.title === "学号") {
					continue
				} else {
					arr.push(item);
				}
			} else {
				if (this.state.work_efficiency === false) {
					if (item.key === "efficiencyscore") {
						continue
					}

					if (item.title === "关卡得分") {
						continue
					} else if (item.title === "效率分") {
						continue
					} else {
						arr.push(item);

					}
				} else {
					arr.push(item);
				}

			}
		}
		try {
			for (var i = 0; i < this.state.columnsstu2.length; i++) {
				var item = this.state.columnsstu2[i];

				if (this.props.isNotMember() === true) {
					if (item.title === "关卡得分") {
						continue
					}
					if (item.key === "efficiencyscore") {
						continue
					}

					if (item.title === "效率分") {
						continue
					}
					if (item.title === "当前成绩") {
						continue
					}
					if (item.title === "学号") {
						continue
					} else {
						arr2.push(item);
					}
				} else {
					if (this.state.work_efficiency === false) {
						if (item.key === "efficiencyscore") {
							continue
						}

						if (item.title === "关卡得分") {
							continue
						} else if (item.title === "效率分") {
							continue
						} else {
							arr2.push(item);

						}
					} else {
						arr2.push(item);
					}

				}
			}

		} catch (e) {
			arr2 = this.state.columnsstu2;
		}
		let columns2 = arr;
		let columns3 = arr2;
		if (teacherdata !== undefined) {
			// console.log("seacthdata设置数据")
			// console.log(this.state.teacherdata.id )
			if (teacherdata.id === undefined) {
				this.setState({
					data: [],
					teacherlist: undefined,
					loadingstate: false,
				})
				return
			}
			// console.log(this.state.teacherdata )
			if (teacherdata.id !== undefined || teacherdata.id !== null || teacherdata.id !== "") {
				// console.log("seacthdata设置数据1")
				// console.log(this.state.teacherdata )
				var timedata = moment(teacherdata.update_time).format('YYYY-MM-DD HH:mm');
				datalist.push({
					myid: teacherdata.id,
					number: 1,
					name: teacherdata.user_name,
					stduynumber: teacherdata.student_id,
					classroom: teacherdata.group_name,
					cost_time: teacherdata.cost_time,
					has_comment:teacherdata.has_comment,
					submitstate: teacherdata.work_status === 0 ? "未开启" : teacherdata.work_status === 1 ? "未通关" : teacherdata.work_status === 2 ? "按时通关" : "迟交通关",
					// updatetime:this.state.teacherdata.student_works[i].update_time,
					// updatetime:"",
					updatetime: timedata === "Invalid date" ? "--" : timedata,
					completion: teacherdata.complete_count === null ? "0" : teacherdata.complete_count === undefined ? "0" : teacherdata.complete_count,
					levelscore: teacherdata.final_score,
					efficiencyscore: teacherdata.eff_score,
					view_answer_count: teacherdata.view_answer_count,
					final_score: teacherdata.final_score===null||teacherdata.final_score===undefined||teacherdata.final_score===""?"--":teacherdata.final_score,
					work_score:teacherdata.work_score===null||teacherdata.work_score===undefined||teacherdata.work_score===""?"--":teacherdata.work_score,
					operating: "查看",
					late_penalty: teacherdata.late_penalty === null ? "0" : teacherdata.late_penalty === undefined ? "0" : teacherdata.late_penalty,
					ultimate_score: teacherdata.ultimate_score,
					user_name: teacherdata.user_name,
					user_login: teacherdata.user_login,
					Curcomlevel: teacherdata.current_complete_count===null|| teacherdata.current_complete_count===undefined|| teacherdata.current_complete_count===""?0: teacherdata.current_complete_count,

				})

				// }
				// var teacherlist = {  //分页
				// 	total: teacherdata.student_works.length, //数据总数量
				// 	pageSize: teacherdata.student_works.length,  //一页显示几条
				// 	current: this.state.page,
				// }
			} else {
				// console.log("seacthdata设置数据2")
				var teacherlist = undefined;

			}
		} else {
			// console.log("seacthdata设置数据3")

			var teacherlist = undefined;
		}
		// console.log("datalistdatalist文件");
		// console.log(datalist);
		// console.log("645");
		// console.log("Listofworksstudentone12314.js");
		// console.log(columns2);
		// console.log(columns3);
		this.setState({
			data: datalist,
			teacherlist: teacherlist,
			loadingstate: false,
			columnsstu: columns2,
			columnsstu2: columns3,
		})
	}
	// 查看学员实训信息
	Viewstudenttraininginformation = (e) => {
		// console.log("Listofworksstudentone.js");
		// console.log(e);
		this.setState({
			userids: e.myid,
		})

		window.open(`/courses/${this.state.props.match.params.coursesId}/shixun_homeworks/${e.myid}/shixun_work_report`, '_blank');
		// this.viewtraining(e.myid);
	}
	viewtraining = (userids) => {
		// console.log("viewtraining")
		// console.log(userids)
		// console.log(JSON.stringify(this.props.user))
		var url = `/student_works/${userids}/shixun_work.json`;
		axios.get(url).then((result) => {
			if (result) {
				if (result.data.message !== undefined) {
					return;
				}
				// console.log("Listofworksstudentone.js")
				// console.log(JSON.stringify(result))
				let datalist = [];
				var game_list = result.data.game_list
				var boolgalist = true;
				var experience = 0;
				for (var i = 0; i < game_list.length; i++) {

					datalist.push({
						number: "第" + game_list[i].position + "关",
						name: moment(game_list[i].end_time).format('YYYY-MM-DD HH:mm'),
						stduynumber: game_list[i].cost_time,
						classroom: game_list[i].score,
						complete_status: game_list[i].complete_status,
					})
					experience = game_list[i].score + experience;

					if (game_list[i].complete_status === 2 || game_list[i].complete_status === 3) {
						boolgalist = false;
					}
				}
				// console.log("viewtraining");
				// console.log(datalist);
				// console.log(JSON.stringify(datalist));
				this.setState({
					viewtrainingdata: result.data,
					visibles: true,
					game_list: datalist,
					experience: experience,
					boolgalist: boolgalist,
				})
			}
		}).catch((error) => {

		})
	}

	// 关闭调分
	cancelModulationModels = () => {
		this.setState({visibles: false})
	}
	//排序
	funorder = (e) => {
		if (e === "updated_at") {
			// 时间
			// 时间排序是从小到大
			this.setState({
				order: "updated_at",
				loadingstate: true,
			})
			this.Getalistofworkstwo(e, "", "", "", this.state.page, this.state.limit);
		}

		if (e === "work_score") {
			// 成绩
			//成绩排序是从大到小
			this.setState({
				order: "work_score",
				loadingstate: true,
			})
			this.Getalistofworkstwo(e, "", "", "", this.state.page, this.state.limit);
		}

		if (e === "student_id") {
			//学号
			//学号排序是从大到小
			this.setState({
				order: "student_id",
				loadingstate: true,
			})
			this.Getalistofworkstwo(e, "", "", "", this.state.page, this.state.limit);
		}
	}

	Startsorting = (ordervlue, checkedValuesine, checkedValuesineinfo, searchtext, page, limit) => {
		// console.log("获取作品列表Listofworksstudenttwo");33333333
		var homeworkid = this.props.match.params.homeworkid;
		let urll = `/homework_commons/${homeworkid}/works_list.json`;
		// console.log(homeworkid);

		// search:搜索关键字
		// order:排序方式：更新时间：update_time，当前成绩：work_score，学号：student_id
		// b_order:desc：倒序 ， asc：顺序
		// work_status:0:未开启， 1:按时完成， 2:延时完成，“”不限
		// course_group:分班情况 [232, 231]， []:不限（空数组）
		var order = "asc";
		if (ordervlue === "updated_at") {
			order = "desc";
		}
		var data = {
			search: "",
			order: ordervlue,
			b_order: order,
			work_status: "",
			course_group: "",
			page: page,
			limit: limit,

		}
		axios.post(urll, data).then((result) => {
			if (result !== undefined) {
				if (result.data.message !== undefined) {
					return;
				}
				// console.log("学生公开的作品列表")
				// console.log(JSON.stringify(result))
				this.setState({
					teacherdata: result.data,
					task_status: result.data.task_status,
					course_group_info: result.data.course_group_info,
					student_works: result.data.student_works,
					loadingstate: false,
					jobsettingsdata: result,
					publish_immediately: result.data.publish_immediately,
					work_efficiency: result.data.work_efficiency,
					end_immediately: result.data.end_immediately,
					code_review: result.data.code_review,
					challenges_count: result.data.challenges_count,
					view_report: result.data.view_report,
					homework_status: result.data.homework_status,
				});
				this.seacthdata(result.data);
				this.props.Getdataback(result, result.data);
			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				loadingstate: false
			})
		})

	}

	TablePagination = (e) => {
		// console.log(e.current);
		// var teacherlists = {  //分页
		// 	total: this.state.student_works.length, //数据总数量
		// 	pageSize: 10,  //一页显示几条
		// 	current: e.current,
		// }
		this.setState({
			page: e.current,
			// teacherlists: teacherlists
		})

	}


	paginationonChangestwo = (pageNumber) => {
		this.setState({
			page: pageNumber,
			loadingstate: true,
		})
		this.Getalistofworkstwo(this.state.order, "", "", "", pageNumber, this.state.limit);
	}
	//计算成绩
	setComputeTime = () => {
		let matchurl = this.props.match.url;
		let {teacherdata} = this.state;
		this.setState({
			computeTimetype: false
		})
		let homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/update_student_score.json?shixun_id=" + teacherdata.shixun_id;

		axios.get(url).then((response) => {
			if (response) {
				if (response.data.status === 0) {
					setTimeout(() => {
						this.props.showNotification(`${response.data.message}`);
						// var homeworkid = this.props.match.params.homeworkid;
						this.Getalistofworks(homeworkid, false);
						// this.props.history.replace(matchurl);
						try {
							this.props.yslslowCheckresultsNo();
						} catch (e) {

						}
					}, 2500);
				}
			}
			// this.Getalistofworkstwo("", "", "", "", 1, 20);
		}).catch((error) => {
			console.log(error)
		});

	}


	//开始排序操作
	Startsortingt = (ordervlue, checkedValuesine, checkedValuesineinfo, searchtext, page, limit, myorders) => {
		//要提交的作品状态checkedValuesine
		//要提交的分班状态checkedValuesineinfo
		//searchtext 输入的姓名和学号
		//order 排序时间
		//debug=t 是老师的意思
		// console.log(ordervlue)70094444444

		var homeworkid = this.props.match.params.homeworkid;
		let urll = `/homework_commons/${homeworkid}/works_list.json?`;
		var order = this.state.order;

		try {
			if (myorders === null || myorders === undefined) {

			} else {
				order = myorders;
			}
		} catch (e) {

		}

		var checkedValuesines = checkedValuesine;
		var checkedValuesineinfos = checkedValuesineinfo;
		var searchtexts = searchtext
		var data = {
			search: searchtexts,
			order: ordervlue,
			b_order: order,
			work_status: checkedValuesines,
			course_group: checkedValuesineinfos,
			page: page,
			limit: limit,
		}
		// console.log("Startsorting");
		// console.log(data);
		axios.post(urll, data).then((result) => {
			// if (result.status === 200) {/]
			// console.log(url)
			// console.log("作品列表______________________")
			// console.log(JSON.stringify(result))

			if (result !== undefined) {
				if (result.data.message !== undefined) {
					return;
				}
				this.setState({
					teacherdata: result.data,
					task_status: result.data.task_status,
					course_group_info: result.data.course_group_info,
					loadingstate: false,
					jobsettingsdata: result,
					allow_late: result.data.allow_late,
					publish_immediately: result.data.publish_immediately,
					work_efficiency: result.data.work_efficiency,
					end_immediately: result.data.end_immediately,
					code_review: result.data.code_review,
					challenges_count: result.data.challenges_count,
					homework_status: result.data.homework_status,
					answer_open_evaluation:result.data.answer_open_evaluation,
					page:page
				});
				allow_lates=result.data.allow_late;
				answer_open_evaluation=result.data.answer_open_evaluation;
				//老师
				this.seacthdatat(result.data, result.data.student_works, result.data.work_efficiency, result.data.course_group_info, page);
				this.props.Getdataback(result, result.data);
				// }
			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				loadingstate: false
			})
		})


	}


	// 设置数据 老师列表数据处理
	seacthdatat = (teacherdata, student_works, work_efficiency, course_group_info) => {

		let {page, limit} = this.state;
		let datalistjs = [];
		let columns = this.state.columns;
		var columns2js = [];
		// console.log("1614++++++++++++++++++++++=");
		// console.log(student_works);
		// console.log(teacherdata);
		if (student_works !== undefined) {
			// console.log("1618____________________");
			// console.log(student_works);
			// console.log("1588");
			for (var i = 0; i < student_works.length; i++) {
				var timedata = moment(student_works[i].update_time).format('YYYY-MM-DD HH:mm');
				datalistjs.push({
					myid: student_works[i].id,
					number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
					name: student_works[i].user_name,
					stduynumber: student_works[i].student_id,
					classroom: student_works[i].group_name,
					cost_time: student_works[i].cost_time,
					has_comment:student_works[i].has_comment,
					submitstate: student_works[i].work_status === 0 ? "未开启" : student_works[i].work_status === 1 ? "未通关" : student_works[i].work_status === 2 ? "按时通关" : "迟交通关",
					// updatetime:this.state.teacherdata.student_works[i].update_time,
					// updatetime:"",
					updatetime: timedata === "Invalid date" ? "--" : timedata,
					completion: student_works[i].complete_count === null ? "0" : student_works[i].complete_count === undefined ? "0" : student_works[i].complete_count,
					levelscore: student_works[i].final_score,
					efficiencyscore: student_works[i].eff_score === "0.0" ? "--" : student_works[i].eff_score === "0" ? "--" : student_works[i].eff_score,
					final_score: student_works[i].final_score===null||student_works[i].final_score===undefined||student_works[i].final_score===""?"--":student_works[i].final_score,
					work_score:student_works[i].work_score===null||student_works[i].work_score===undefined||student_works[i].work_score===""?"--":student_works[i].work_score,
					view_answer_count: student_works[i].view_answer_count,
					operating: "查看",
					late_penalty: student_works[i].late_penalty === null ? "0" : student_works[i].late_penalty === undefined ? "0" : student_works[i].late_penalty,
					ultimate_score: student_works[i].ultimate_score,
					user_name: student_works[i].user_name,
					user_login: student_works[i].user_login,
					Curcomlevel: student_works[i].current_complete_count===undefined||student_works[i].current_complete_count===null||student_works[i].current_complete_count===""?0:student_works[i].current_complete_count,
				})

			}



			if (work_efficiency === false) {
				if (JSON.stringify(course_group_info) === "[]" || course_group_info === undefined || course_group_info === null) {
					//这里没有分班 没有 关卡得分 没有效率分
					// console.log("1739");
					// console.log(this.props.isNotMember());
					for (var i = 0; i < this.state.columns.length; i++) {
						var item = this.state.columns[i];

						if (this.props.isNotMember() === true) {
							if (item.title === "关卡得分") {
								continue
							}

							if (item.title === "效率分") {
								continue
							}
							if (item.key === "efficiencyscore") {
								continue
							}


							if (item.title === "当前成绩") {
								continue
							}
							if (item.title === "学号") {
								continue
							} else {
								columns2js.push(item);
							}
						} else {
							if (item.title === "分班") {
								continue
							}
							if (item.title === "关卡得分") {
								continue
							}
							if (item.key === "efficiencyscore") {
								continue
							}

							if (item.title === "效率分") {
								continue
							} else {
								columns2js.push(item);
							}
						}
					}


				} else {
					// console.log("1767");
					// console.log(this.props.isNotMember());
					if (course_group_info.length < 2) {
						for (var i = 0; i < this.state.columns.length; i++) {
							var item = this.state.columns[i];

							if (this.props.isNotMember() === true) {
								if (item.title === "关卡得分") {
									continue
								}
								if (item.title === "效率分") {
									continue
								}
								if (item.key === "efficiencyscore") {
									continue
								}

								if (item.title === "当前成绩") {
									continue
								}
								if (item.title === "学号") {
									continue
								} else {
									columns2js.push(item);
								}
							} else {
								if (item.title === "分班") {
									continue
								}
								if (item.title === "关卡得分") {
									continue
								}
								if (item.key === "efficiencyscore") {
									continue
								}

								if (item.title === "效率分") {
									continue
								} else {
									columns2js.push(item);
								}
							}
						}

					} else {
						// console.log("1795");
						// console.log(this.props.isNotMember());
						for (var i = 0; i < this.state.columns.length; i++) {
							var item = this.state.columns[i];

							if (this.props.isNotMember() === true) {
								if (item.title === "关卡得分") {
									continue
								}
								if (item.key === "efficiencyscore") {
									continue
								}

								if (item.title === "效率分") {
									continue
								}
								if (item.title === "当前成绩") {
									continue
								}
								if (item.title === "学号") {
									continue
								} else {
									columns2js.push(item);
								}
							} else {
								if (item.title === "关卡得分") {
									continue
								}
								if (item.key === "efficiencyscore") {
									continue
								}

								if (item.title === "效率分") {
									continue
								} else {
									columns2js.push(item);
								}
							}
						}
					}
				}
			} else {
				// console.log("1821");
				// console.log(this.props.isNotMember());
				if (JSON.stringify(course_group_info) === "[]" || course_group_info === undefined || course_group_info === null) {


					for (var i = 0; i < this.state.columns.length; i++) {
						var item = this.state.columns[i];

						if (this.props.isNotMember() === true) {
							if (item.title === "关卡得分") {
								continue
							}
							if (item.key === "efficiencyscore") {
								continue
							}

							if (item.title === "效率分") {
								continue
							}
							if (item.title === "当前成绩") {
								continue
							}
							if (item.title === "学号") {
								continue
							} else {
								columns2js.push(item);
							}
						} else {
							if (item.title === "分班") {
								continue
							} else {
								columns2js.push(item);
							}
						}
					}


				} else {
					// console.log("1849");
					// console.log(this.props.isNotMember());
					if (course_group_info.length < 2) {
						for (var i = 0; i < this.state.columns.length; i++) {
							var item = this.state.columns[i];

							if (this.props.isNotMember() === true) {
								if (item.title === "关卡得分") {
									continue
								}
								if (item.key === "efficiencyscore") {
									continue
								}

								if (item.title === "效率分") {
									continue
								}
								if (item.title === "当前成绩") {
									continue
								}
								if (item.title === "学号") {
									continue
								} else {
									columns2js.push(item);
								}
							} else {
								if (item.title === "分班") {
									continue
								} else {
									columns2js.push(item);
								}

							}
						}
					}
					columns2js = this.state.columnss;
				}
			}

		} else {

		}
		//
		// console.log(datalist);
		// console.log("1712");

		// console.log("开始赋值了");
		// console.log(datalistjs);

		this.setState({
			datajs: datalistjs,
			columns: columns2js,
			loadingstate: false,
		})
	}
	//作品状态
	funtaskstatust = (checkedValues, data) => {

		if (JSON.stringify(checkedValues) === "[]") {
			// console.log(checkedValues);
			this.setState({
				unlimited: 0,
				course_groupyslstwo: [],
				loadingstate: true,
				page: 1,
			})
			this.Startsortingt(this.state.orders, checkedValues, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.myorders);
		}else {
			// console.log(checkedValues);
			this.setState({
				course_groupyslstwo: checkedValues,
				unlimited: 1,
				loadingstate: true,
				page: 1,
			})
			this.Startsortingt(this.state.orders, checkedValues, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.myorders);
		}

		// else if (checkedValues.length === data.length) {
		// 	// this.setState({
		// 	// 	unlimited: 0,
		// 	// 	course_groupyslstwo: [],
		// 	// 	loadingstate: true,
		// 	// 	page: 1,
		// 	// })
		// 	// this.Startsortingt(this.state.orders, checkedValues, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.myorders);
		// }

	}
	//作品状态2
	funtaskstatustwot = (checkedValues, data) => {
		// console.log("funtaskstatustwo");
		// console.log(checkedValues);
		if (JSON.stringify(checkedValues) === "[]") {
			// console.log(checkedValues);
			this.setState({
				unlimitedtwo: 1,
				course_groupysls: undefined,
				checkedValuesineinfo: [],
				loadingstate: true,
				page: 1,
			})
			this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, checkedValues, this.state.searchtext, 1, this.state.limit, this.state.myorders);
		}else {
			this.setState({
				checkedValuesineinfo: checkedValues,
				course_groupysls: checkedValues,
				unlimitedtwo: 0,
				loadingstate: true,
				page: 1,
			})
			this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, checkedValues, this.state.searchtext, 1, this.state.limit, this.state.myorders);


		}

		// else if (checkedValues.length === data.length) {
		// 	this.setState({
		// 		unlimitedtwo: 1,
		// 		course_groupysls: undefined,
		// 		checkedValuesineinfo: [],
		// 		loadingstate: true,
		// 		page: 1,
		// 	})
		// 	this.Startsortingt(this.state.orders, this.state.checcourse_groupyslstwokedValuesine, checkedValues, this.state.searchtext, 1, this.state.limit, this.state.myorders);
		// }


	}
	//搜索学生 文字输入
	inputSearchValuest = (e) => {
		if (e.target.value === ""||e.target.value===undefined) {
			this.setState({
				searchtext: undefined,
			})
		} else {
			this.setState({
				searchtext: e.target.value
			})
		}

	}

	//搜索学生按钮输入
	searchValuest = (value) => {
		//点击直接搜索
		//    if(value === ""){
		//        message.error("请输入姓名或学号搜索");
		//        return
		//    }
		this.setState({
			loadingstate: true,
			page: 1,
			limit: 20,
			searchtypes:true
		})
	 	this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, this.state.checkedValuesineinfo, value, 1, 20, this.state.myorders);
		// console.log(value)


	}

	// 输入关键字后按回车，自动提交
	onSearchKeywordKeyUpt = (e) => {
		if (e.keyCode === 13) {
			// this.onSearch();
			// console.log("使用了回车键");
			this.setState({
				loadingstate: true,
				page: 1,
				limit: 20,
			})
			this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, 1, 20, this.state.myorders);
		}
	}

	// 调分
	Viewstudenttraininginformationtysl2 = (e, data) => {
		// console.log("Viewstudenttraininginformationtysl2");
		//  console.log("shubiao zhongjian ");
		// 	console.log(e);
		this.setState({
			userids: data.myid,
		})
		// this.viewtrainingt(e.myid);
		window.open(`/courses/${this.state.props.match.params.coursesId}/shixun_homeworks/${data.myid}/shixun_work_report`, '_blank');
	}
	// 查看学员实训信息
	Viewstudenttraininginformationt = (e) => {
		// console.log("Viewstudenttraininginformation");
		// console.log(e);
		this.setState({
			userids: e.myid,
		})
		// this.viewtrainingt(e.myid);
		window.open(`/courses/${this.state.props.match.params.coursesId}/shixun_homeworks/${e.myid}/shixun_work_report`, '_blank');
	}
	// 关闭调分
	cancelModulationModels = () => {
		this.setState({visibles: false})
	}
	// 关闭查看
	cancelModulationModel = () => {
		this.setState({visible: false})
	}
	// 调分
	Adjustment = (e) => {
		// console.log("Adjustment");
		// console.log(e.myid);
		this.setState({
			visible: true,
			userid: e.myid,
		})

	}
	//确定
	saveModulationModal = (value, num) => {
		var userid = this.state.userid;
		const url = `/student_works/${userid}/adjust_score.json`;
		// console.log(url);
		axios.post(url, {
				score: num,
				comment: value
			})
			.then((response) => {
				if (response.data.status == '0') {
					this.setState({visible: false});
					this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, this.state.myorders);
					this.props.showNotification(`调分成功`);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	viewtrainingt = (userids) => {
		// console.log(JSON.stringify(this.props.user))
		var url = `/student_works/${userids}/shixun_work.json`;
		axios.get(url).then((result) => {
			if (result) {
				// console.log("TraineetraininginformationModal.js")
				// console.log(JSON.stringify(result))

				let datalist = [];
				var game_list = result.data.game_list
				var boolgalist = true;
				var experience = 0;
				for (var i = 0; i < game_list.length; i++) {

					datalist.push({
						number: "第" + game_list[i].position + "关",
						name: moment(game_list[i].end_time).format('YYYY-MM-DD HH:mm'),
						stduynumber: game_list[i].cost_time,
						classroom: game_list[i].score,
						complete_status: game_list[i].complete_status,
					})
					experience = game_list[i].score + experience;

					if (game_list[i].complete_status === 2 || game_list[i].complete_status === 3) {
						boolgalist = false;
					}

				}
				// console.log("viewtraining");
				// console.log(datalist);
				// console.log(JSON.stringify(datalist));
				this.setState({
					viewtrainingdata: result.data,
					visibles: true,
					game_list: datalist,
					experience: experience,
					boolgalist: boolgalist,
				})
			}
		}).catch((error) => {

		})
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
					svisible: false,
					OneSelftype: true,
					Topval: "学生将立即收到作业",
					// Botvalleft:"暂不发布",
					Botval: `本操作只对"未发布"的作业有效`,
					starttime: moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					endtime: "截止时间：" + endtime,
					starttimes: starttime,
					starttimesend: response.data.end_time === undefined || response.data.end_time === null || response.data.end_time === "" ? undefined : response.data.end_time,
					typs: "start",
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
		// console.log("1160");
		let homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/end_groups.json";

		axios.get(url).then((response) => {

			if (response.status === 200) {
				this.setState({})
				this.setState({
					modalname: "立即截止",
					modaltype: response.data.course_groups === null || response.data.course_groups.length === 0 ? 2 : 1,
					svisible: true,
					OneSelftype: false,
					Topval: "学生将不能再提交作业",
					// Botvalleft:"暂不截止",
					Botval: `本操作只对"提交中"的作业有效`,
					Cancelname: "暂不截止",
					Savesname: "立即截止",
					Cancel: this.homeworkhide,
					Saves: this.coursetaskend,
					starttime: undefined,
					endtime: undefined,
					course_groups: response.data.course_groups,
					typs: "end",
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
			if (this.state.teacherdata.category.main === 1) {
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
				}
			} else {
				data = {
					homework_ids: [homeworkid],
					end_time: endtime,
					category_id: this.state.teacherdata.category.category_id,
				}
			}
		} else {
			if (this.state.teacherdata.category.main === 1) {
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
					category_id: this.state.teacherdata.category.category_id,
					detail: true
				}
			}

		}

		let coursesId = this.props.match.params.coursesId;
		let url = "/courses/" + coursesId + "/homework_commons/publish_homework.json";
		axios.post(url, data).then((result) => {
			if (result) {
				if (result.data.status === 0) {
					notification.open({
						message: "提示",
						description: result.data.message
					});
					this.homeworkhide()
				}

			}
		}).catch((error) => {
			console.log(error);
		})
	}
	notlimiteds = () => {
		this.setState({
			checkedValuesine: undefined,
			course_groupyslstwo: [],
			unlimited: 0,
			loadingstate: true,
			page: 1,
		})
		this.Startsortingt(this.state.orders, [], this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.myorders);

	}
	notlimitedst = () => {
		// console.log(this.state.course_group_info);
		this.setState({
			unlimitedtwo: 1,
			checkedValuesineinfo: [],
			course_groupysls: undefined,
			loadingstate: true,
		})
		this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, [], this.state.searchtext, 1, this.state.limit, this.state.myorders);
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
		this.isupdatas()
		this.setState({
			modalname: undefined,
			modaltype: undefined,
			svisible: false,
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
			course_groupyslstwo: undefined,
			typs: undefined,
			starttimes: undefined,
			starttimesend: undefined,
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

	paginationonChanges = (pageNumber) => {
		this.setState({
			page: pageNumber,
			loadingstate: true,
		})
		this.Startsortingt(this.state.orders, this.state.course_groupyslstwo, this.state.checkedValuesineinfo, this.state.searchtext, pageNumber, this.state.limit, this.state.myorders);
	}

	setComputeTimet = () => {
		// console.log("老师开始计算成绩了1111111");
		let matchurl = this.props.match.url;

		// this.setState({
		// 	computeTimetype:false
		// })
		let homeworkid = this.props.match.params.homeworkid;
		let url = "/homework_commons/" + homeworkid + "/update_score.json";

		axios.get(url).then((response) => {
			if (response) {
				if (response.data.status === 0) {
					// if(response.data.message!==undefined){
					// 	return;
					// }
					setTimeout(() => {
						this.setState({
							loadingstate: true
						})
						this.Getalistofworks(homeworkid, false);
						try {
							this.props.showNotification(`${response.data.message}`);
						} catch (e) {

						}
						try {
							this.props.yslslowCheckresultsNo();
						} catch (e) {

						}

					}, 2500);
				}
				// this.props.history.replace( matchurl );
			}
		}).catch((error) => {
			console.log(error)
		});

	};


	daochushixunbaogao = () => {
		let url = `/zip/shixun_report?homework_common_id=${this.props.match.params.homeworkid}&work_status=${this.state.course_groupyslstwo === undefined || this.state.course_groupyslstwo === null ? "" : this.state.course_groupyslstwo}&course_group=${this.state.checkedValuesineinfo === undefined || this.state.checkedValuesineinfo === null ? "" : this.state.checkedValuesineinfo}&search=${this.state.searchtext === undefined || this.state.searchtext === null ? "" : this.state.searchtext}`
		this.confirmysl(url);
	}

	daochuzuoye = () => {
		let url = `/homework_commons/${this.props.match.params.homeworkid}/works_list.xlsx?course_group=${this.state.checkedValuesineinfo === undefined || this.state.checkedValuesineinfo === null ? "" : this.state.checkedValuesineinfo}&work_status=${this.state.course_groupyslstwo === undefined || this.state.course_groupyslstwo === null ? "" : this.state.course_groupyslstwo}&search=${this.state.searchtext === undefined || this.state.searchtext === null ? "" : this.state.searchtext}`
 		this.confirmysl(url);
	}


	confirmysl(url) {
		axios.get(url + '&export=true').then((response) => {
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
				// this.props.showNotification(`正在下载中`);
				// window.open("/api"+url, '_blank');
				this.props.slowDownload(getRandomcode(url));
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
		let {columns,columnss, course_groupysls, datajs, isAdmin, homework_status, course_groupyslstwo, unlimited, unlimitedtwo, course_group_info, orders, task_status, checkedValuesine, searchtext, teacherlist, visible, visibles, game_list, columnsstu, columnsstu2, limit, experience, boolgalist, viewtrainingdata, teacherdata, page, data, jobsettingsdata, styletable, datas, order, loadingstate, computeTimetype} = this.state;

		const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
		let course_is_end = this.props.current_user && this.props.current_user.course_is_end;
		// console.log("Listofworksstudentone.js");
		// console.log(orders);
		let homewrok=false;
		 if(homework_status && homework_status.length > 0){
		 	for(var i=0;i<homework_status.length;i++){
		 		  if(homework_status[i]==="已截止"){
						homewrok=true;
					}
			}
			 if(homewrok===false){
				 for(var i=0;i<columnsstu.length;i++){
					 if (columnsstu[i].title === "最新完成关卡"){//item.id==122
						 columnsstu.splice(i,1)
					 }
				 }
				 for(var i=0;i<columnsstu2.length;i++){
					 if (columnsstu2[i].title === "最新完成关卡"){//item.id==122
						 columnsstu2.splice(i,1)
					 }
				 }
				 for(var i=0;i<columns.length;i++){
					 if (columns[i].title === "最新完成关卡"){//item.id==122
						 columns.splice(i,1)
					 }
				 }
				 for(var i=0;i<columnss.length;i++){
					 if (columnss[i].title === "最新完成关卡"){//item.id==122
						 columnss.splice(i,1)
					 }
				 }
			 }
		 }
		return (

			this.props.isAdmin() === true ?
				<div className=" clearfix " style={{margin: "auto", minWidth: "1200px"}}>
					{visible === true ? <ModulationModal
						visible={visible}
						Cancel={() => this.cancelModulationModel()}
						Saves={(value, num) => this.saveModulationModal(value, num)}
					/> : ""}

					{this.state.showmodel === true ? <ShixunWorkModal
						{...this.props}
						visible={this.state.showmodel}
						modalname={"代码查重"}
						data={[]}
						issCancel={() => this.hideshowmodel()}
						updatas={() => this.isupdatas()}
					/> : ""}

					<DownloadMessageysl
						{...this.props}
						value={this.state.DownloadMessageval}
						modalCancel={this.Downloadcal}
						modalsType={this.state.DownloadType}

					/>
					{visibles === true ?
						<div>
							<style>
								{
									`
              body {
							 overflow: hidden !important;
						 }
              `
								}
							</style>
							<TraineetraininginformationModal
								{...this.props} {...this.state}
								homeworkid={this.props.match.params.homeworkid}
								coursesId={this.props.match.params.coursesId}
								workid={teacherdata.id}
								isAdmins={this.props.isAdmin()}
								userids={this.state.userids}
								viewtrainingdata={viewtrainingdata}
								game_list={game_list}
								visible={visibles}
								experience={experience}
								boolgalist={boolgalist}
								Cancel={() => this.cancelModulationModels()}
							/>

						</div>
						: ""
					}
					{/*立即截止*/}
					<HomeworkModal
						modaltype={this.state.modaltype}
						modalname={this.state.modalname}
						visible={this.state.svisible}
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
					{homework_status===undefined?
						<div className={"educontent "}>
							<div className="edu-back-white">
								<div className="edu-tab-con-box clearfix edu-txt-center" style={{ width:"100%",height:"200px" }}>
									<Spin  style={{ width:"100%","line-height":"200px" }}></Spin>
								</div>
							</div>
						</div>:
						homework_status && homework_status.length === 0 ?
							<div className="edu-back-white">
								<NoneData
									{...this.state}
									{...this.props}
								/>
							</div>
							:
							homework_status && homework_status.length > 0 && homework_status[0] === "未发布" ?
								<div className="edu-back-white">
									<NoneData
										{...this.state}
										{...this.props}
									/>
								</div>
								:
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

							.computeTime {
														width: 122px;
														height: 31px;
														display: inline-block;
														padding: 5px;
														text-align: center;
														line-height: 20px;
														color: #FE6B21;
														border: 1px solid #FE6B21;
														cursor: pointer;
														border-radius: 4px;
												}

						.computeTimes{
														width: 122px;
														height: 31px;
														display: inline-block;
														padding: 5px;
														text-align: center;
												  	line-height: 20px;
														color: #C5C5C5;
														border: 1px solid #EDEDED;
														background:#EDEDED;
														cursor: pointer;
											    	border-radius: 4px;
							}
							.shixunSpin{
								color:#FF6801;
							  margin-right: 10px;
							}
							`}
										</style>
										{computeTimetype === false ? <li className="clearfix startbox">
											<Spin indicator={antIcon} spinning={!computeTimetype} className={"shixunSpin"}/>
											<span className={"startfont"}>
			         	正在执行成绩计算，完成后将为您自动刷新结果。温馨提示：执行时间因作品数量而异
							</span>
										</li> : ""}

										{/*作品状态GraduationTaskssettinglist*/}
										<ul className="clearfix" style={{padding: '20px 15px 10px 20px'}}>
											<li className="clearfix ">
												{/*<span className="fl  mr10 color-grey-6 ">计算成绩时间：{teacherdata&&teacherdata.calculation_time==null?"--":	moment(teacherdata&&teacherdata.calculation_time).format('YYYY-MM-DD HH:mm')}</span>*/}


											</li>

											<li className="clearfix mt10">
												<div className="fr search-newysl" style={{marginBottom: '1px'}}>
													{/*{course_is_end===true?"":<span>*/}
													{/*{teacherdata&&teacherdata.update_score===true&&computeTimetype===true?*/}
													{/*	(this.props.isNotMember()===false?<div className={"computeTime font-16"} onClick={this.setComputeTimet}>*/}
													{/*		查看最新成绩*/}
													{/*	</div>:""):*/}
													{/*	teacherdata&&teacherdata.homework_status!==undefined&&teacherdata.homework_status[0]=== "未发布"? "":*/}
													{/*		(this.props.isNotMember()===false?<div className={"computeTimes font-16"}>*/}
													{/*			查看最新成绩*/}
													{/*		</div>:"")*/}
													{/*}*/}
													{/*</span>}*/}
													<span className="search-newyslw fr ml20">
										{/*<Search*/}
										{/*	placeholder="请输入姓名或学号搜索"*/}
										{/*	id="subject_search_input"*/}
										{/*	autoComplete="off"*/}
										{/*	value={searchtext}*/}
										{/*	// onKeyUp={(e) => this.onSearchKeywordKeyUpt(e)}*/}
										{/*	onInput={this.inputSearchValuest}*/}
										{/*	onSearch={this.searchValuest}*/}
										{/*></Search>*/}
										 {publicSearchs("请输入姓名或学号搜索",this.searchValuest,this.inputSearchValuest,this.inputSearchValuest)}
										</span>
												</div>
												<span className="fl  mr10 color-grey-8 ">作品状态：</span>
												<span className="fl "><a id="graduation_comment_no_limit"
																								 className={unlimited === 0 ? "pl10 pr10 mr20 check_on" : "pl10 pr10 mr20 "}
																								 onClick={() => this.notlimiteds()}>全部</a></span>
												<CheckboxGroup value={course_groupyslstwo}
																			 onChange={(e) => this.funtaskstatust(e, task_status && task_status)}
																			 style={{paddingTop: '4px'}}>

													{task_status === undefined ? "" : task_status.map((item, key) => {
														return (
															<span key={key}>
                                <Checkbox value={item.id}
																					key={item.id}
																					className="fl ">{item.name}
																	<span>({item.count})</span>
                                </Checkbox>

                            </span>
														)
													})}
												</CheckboxGroup>
												{/*请输入姓名或学号搜索*/}


											</li>


											{/*分班情况*/}

											<li className="clearfix  mt10 ">
												{JSON.stringify(course_group_info) === "[]" ? "" : course_group_info === undefined ? "" : course_group_info.length < 2 ? "" :
													<div>
														<span className="fl mr10 color-grey-8">分班情况：</span>
														<span className="fl "><a id="graduation_comment_no_limit"
																										 className={unlimitedtwo === 0 ? "pl10 pr10 mr20 " : "pl10 pr10 mr20 check_on"}
																										 onClick={() => this.notlimitedst()}>全部</a></span>
														<CheckboxGroup value={course_groupysls}
																					 onChange={(e) => this.funtaskstatustwot(e, course_group_info && course_group_info)}
																					 style={{paddingTop: '4px', width: '1017px'}}>
															{course_group_info === undefined ? "" :
																course_group_info.map((item, key) => {
																	return (
																		<span key={key}>
                                <Checkbox value={item.course_group_id}
																					key={item.course_group_id}
																					className="fl ">{item.group_group_name}
																	<span>({item.count})</span>
                                            </Checkbox>
                            </span>
																	)
																})
															}
														</CheckboxGroup>
													</div>}
											</li>

										</ul>


										<div id="graduation_work_list" style={{padding: '0px 20px 10px 20px'}}>

											<div className="clearfix">
                                <span className="fl color-grey-6 font-12"><span
																	className="color-orange-tip">{teacherdata === undefined ? "" : teacherdata.work_count && teacherdata.work_count}</span>个检索结果（{teacherdata === undefined ? "" : teacherdata.all_member_count && teacherdata.all_member_count}学生） </span>
												<style>
													{
														`
										.edu-position-hide li a:hover {
										  background: #F0F0F0;
										  color: #05101A;
										}
										`
													}
												</style>

											</div>

										</div>
										{
											JSON.stringify(datajs) === "[]" ?

												<div id="forum_list" className="forum_table">
													<div className="mh650 edu-back-white">
														<div className="edu-tab-con-box clearfix edu-txt-center">
															<img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
															<p className="edu-nodata-p mb30">{this.state.searchtypes===false?"暂时还没有相关数据哦！":"抱歉没有您要搜索的内容，请换个词语试试看"}</p>
														</div>
													</div>

												</div>
												:

												<div className={"justify break_full_word new_li "} style={{minHeight: "480px"}}>
													<style>{`
              	          // .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
													// 						top: 72%;
						              //   }
						                .edu-table thead th,.edu-table tbody tr:last-child td{
															border-bottom: none!important;
															height: 58px;
														}
														.ant-tables .ant-table-tbody > tr > td {
														height: 58px;
															}
														.ysltableo .ant-table-thead > tr > th{
																 	height: 58px;
														 }
													 .ysltableo .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 0px;
															}
						              `}</style>
													<div className="edu-table edu-back-white ant-tables ysltableo table1">
														<Spin tip="正在加载..." spinning={loadingstate}>
															{datajs === undefined ? "" : <Table
																dataSource={datajs}
																columns={columns}
																pagination={false}
																onChange={this.table1handleChange}
															  loading={false}
															/>}
														</Spin>

													</div>
												</div>
										}


									</div>
									{
										teacherdata && teacherdata.work_count && teacherdata.work_count > limit ?
											<div className="edu-txt-center mt30 ">
												<Pagination showQuickJumper current={page}
																		onChange={this.paginationonChanges} pageSize={limit}
																		total={teacherdata.work_count}></Pagination>
											</div>
											: ""
									}
								</div>
					}
				</div>
				:

				<div>
					{
						teacherdata === undefined || teacherdata.student_works === undefined || teacherdata.student_works === null || JSON.stringify(teacherdata.student_works) === "[]" ?
							// 学生不能查看别人的
							<div className=" clearfix " style={{margin: "auto", minWidth: "1200px"}}>
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
			    	.computeTime {
														width: 122px;
														height: 31px;
														display: inline-block;
														padding: 5px;
														text-align: center;
														line-height: 20px;
														color: #FE6B21;
														border: 1px solid #FE6B21;
														cursor: pointer;
														border-radius: 4px;
												}

						.computeTimes{
														width: 122px;
														height: 31px;
														display: inline-block;
														padding: 5px;
														text-align: center;
												  	line-height: 20px;
														color: #C5C5C5;
														border: 1px solid #EDEDED;
														background:#EDEDED;
														cursor: pointer;
											    	border-radius: 4px;
													}
							`}
								</style>
								{visibles === true ?
									<div>
										<DownloadMessageysl
											{...this.props}
											value={this.state.DownloadMessageval}
											modalCancel={this.Downloadcal}
											modalsType={this.state.DownloadType}
										/>
										<style>
											{
												`
												body {
												 overflow: hidden !important;
											 }
												`
											}
										</style>
										<TraineetraininginformationModal
											homeworkid={this.props.match.params.homeworkid}
											coursesId={this.props.match.params.coursesId}
											userids={this.state.userids}
											viewtrainingdata={viewtrainingdata}
											game_list={game_list}
											visible={visibles}
											experience={experience}
											boolgalist={boolgalist}
											Cancel={() => this.cancelModulationModels()}
										/>
									</div>
									: ""
								}

								{
									homework_status && homework_status.length && homework_status.length === 0 ?
										<div className=" clearfix edu-back-white" style={{margin: "auto", minWidth: "1200px"}}>
											<NoneData
												{...this.state}
												{...this.props}
											/>
										</div>
										:
										homework_status && homework_status.length > 0 && homework_status && homework_status[0] === "未发布" ?
											<div className=" clearfix edu-back-white " style={{margin: "auto", minWidth: "1200px"}}>
												<NoneData
													{...this.state}
													{...this.props}
												/>
											</div>
											:


											<div className={"educontent "}>
												<div className="edu-back-white" style={{width: "1200"}}>

													<style>
														{
															`
											.shixunSpin{
												color:#FF6801;
												margin-right: 10px;
												}
										`}
													</style>
													{computeTimetype === false ? <li className="clearfix startbox mb20">
														<Spin indicator={antIcon} spinning={!computeTimetype} className={"shixunSpin"}/>
														<span className={"startfont"}>
					         	正在执行成绩计算，完成后将为您自动刷新结果。温馨提示：执行时间因作品数量而异
									</span>
													</li> : ""}


													{JSON.stringify(data) !== "[]" ?
														<div>
															<div id="graduation_work_list"
																	 style={{
																		 padding: '20px 20px 10px 20px',
																		 marginBottom: "10px"
																	 }}>

																<div className="clearfix" style={{
																	lineHeight: "31px !important;",
																	textAlign: "center;"
																}}>

											<span className="fl  font-12">
												<span className="color-grey-9">已开始做题</span>
												<span className=" ml3 mr3 color-grey-9">
													{teacherdata === undefined ? "0" : teacherdata.commit_count === undefined ? "0" : teacherdata.commit_count}
												</span><span className="color-grey-9">人</span>
												<span className="ml10 color-grey-9">未开始做题</span>
												<span
													className="ml3 mr3 color-grey-9">{teacherdata === undefined ? "0" : teacherdata.uncommit_count}</span><span
												className="color-grey-9">人</span>
												<span style={{color: "#666"}}>
												{teacherdata === undefined ? "" : teacherdata.left_time === undefined ? "" : teacherdata.left_time === null ? "" :
													<span className="ml20">{teacherdata.left_time.status}</span>
												}
													{teacherdata === undefined ? "0" : teacherdata.left_time === undefined ? "0" : teacherdata.left_time === null ? "0" :
														<span className="ml20"
																	style={{color: '#FF6800'}}>{teacherdata.left_time.time}</span>
													}
												</span>
											</span>

																	<div className="fr">

																		{/*<span className="fl  mr10 color-grey-6 ">计算成绩时间：{teacherdata&&teacherdata.calculation_time==null?"--":	moment(teacherdata&&teacherdata.calculation_time).format('YYYY-MM-DD HH:mm')}</span>*/}
																		{/*							{	course_is_end===true?"":teacherdata&&teacherdata.task_operation[0]==="开启挑战"?"":<span>*/}
																		{/*	{computeTimetype===true?*/}
																		{/*		(this.props.isNotMember()===false?*/}
																		{/*			(*/}
																		{/*				teacherdata&&teacherdata.update_score===true?*/}
																		{/*					<div className={"computeTime font-16"} onClick={this.setComputeTime}>*/}
																		{/*						查看最新成绩*/}
																		{/*					</div>*/}
																		{/*					:""*/}
																		{/*			)*/}
																		{/*			:"")*/}
																		{/*		:*/}
																		{/*		(teacherdata&&teacherdata.homework_status!==undefined&&teacherdata.homework_status[0]=== "未发布"? "":*/}
																		{/*			this.props.isNotMember()===false?*/}
																		{/*				<div className={"computeTimes font-16"}>*/}
																		{/*					查看最新成绩*/}
																		{/*				</div>*/}
																		{/*				:"")*/}
																		{/*	}*/}
																		{/*</span>}*/}

																	</div>

																</div>

															</div>
															<div className={"justify break_full_word new_li"}
																	 style={{minHeight: "480px"}}>
																<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																			top: 72%;}
						                }
						                .edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
						                	.ysltableow .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														 	.ysltableow .ant-table-tbody > tr > td{
																 	height: 58px;
														 }
						             .ysltableow   .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 0px;
															}
						              `}</style>
																<div className="edu-table edu-back-white  ysltableow table2">
																	{data === undefined ? "" : <Table
																		dataSource={data}
																		columns={columnsstu}
																		pagination={false}
																		loading={false}
																	/>}
																</div>
															</div>
														</div>

														:
														<div id="forum_list" className="forum_table">
															<div className="mh650 edu-back-white">
																<div className="edu-tab-con-box clearfix edu-txt-center">
																	<img className="edu-nodata-img mb20"
																			 src={getImageUrl("images/educoder/nodata.png")}/>
																	<p className="edu-nodata-p mb30">{this.state.searchtypes===false?"暂时还没有相关数据哦！":"抱歉没有您要搜索的内容，请换个词语试试看"}</p>
																</div>
															</div>

														</div>
													}

												</div>

											</div>
								}
							</div>
							:
							// 学生能查看别人的
							<div className=" clearfix " style={{margin: "auto", minWidth: "1200px"}}>
								{/*双层*/}
								<DownloadMessageysl
									{...this.props}
									value={this.state.DownloadMessageval}
									modalCancel={this.Downloadcal}
									modalsType={this.state.DownloadType}
								/>

								{visibles === true ?
									<TraineetraininginformationModal
										homeworkid={this.props.match.params.homeworkid}
										coursesId={this.props.match.params.coursesId}
										userids={this.state.userids}
										viewtrainingdata={viewtrainingdata}
										game_list={game_list}
										visible={visibles}
										experience={experience}
										boolgalist={boolgalist}
										Cancel={() => this.cancelModulationModels()}
									/> : ""
								}

								{
									homework_status && homework_status.length === 0 ?
										<div className=" clearfix edu-back-white" style={{margin: "auto", minWidth: "1200px"}}>
											<NoneData
												{...this.state}
												{...this.props}
											/>
										</div>
										:
										homework_status && homework_status.length > 0 && homework_status && homework_status[0] === "未发布" ?
											<div className=" clearfix edu-back-white" style={{margin: "auto", minWidth: "1200px"}}>
												<NoneData
													{...this.state}
													{...this.props}
												/>
											</div>
											:
											<div className={"educontent mb20"}>

												<div>
													<style>
														{
															`
											.shixunSpin{
												color:#FF6801;
												margin-right: 10px;
												}
										`}
													</style>

													{computeTimetype === false ? <li className="clearfix startbox mb20">
														<Spin indicator={antIcon} spinning={!computeTimetype} className={"shixunSpin"}/>
														<span className={"startfont"}>
						         	正在执行成绩计算，完成后将为您自动刷新结果。温馨提示：执行时间因作品数量而异
									</span>
													</li> : ""}

													<style>
														{
															`
												.edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
													.ysltableows .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														 	.ysltableows .ant-table-tbody > tr > td{
																 	height: 58px;
														 }
													 .ysltableows .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													    padding: 0px;
															}
												`
														}
													</style>
													<div className="edu-table edu-back-white ysltableows table3">
														{data === undefined ? "" : <Table
															style={styletable}
															dataSource={data}
															columns={columnsstu2}
															pagination={false}
															showHeader={false}
															loading={false}
														/>}
													</div>
													{JSON.stringify(datas) !== "[]" ?
														<div>
															<div id="graduation_work_list" className="edu-back-white" style={{
																padding: '20px 20px 10px 20px',
																marginBottom: "10px"
															}}>
																<div className="clearfix" style={{
																	lineHeight: "31px !important;",
																	textAlign: "center;"
																}}>
											<span className="fl font-12">
												<span style={{color: "#999999"}}>已开始做题</span>
												<span className=" ml3 mr3 " style={{color: "#999999"}}>
													{teacherdata === undefined ? "0" : teacherdata.commit_count === undefined ? "0" : teacherdata.commit_count}
												</span><span style={{color: "#999999"}}>人</span>
												<span className="ml10 " style={{color: "#999999"}}>未开始做题</span>
												<span
													className="ml3 mr3 "
													style={{color: "#999999"}}>{teacherdata === undefined ? "0" : teacherdata.uncommit_count}</span><span
												style={{color: "#999999"}}>人</span>
												<span style={{color: "#666"}}>
												{teacherdata === undefined ? "" : teacherdata.left_time === undefined ? "" : teacherdata.left_time === null ? "" :
													<span className="ml20">{teacherdata.left_time.status}</span>}
													{teacherdata === undefined ? "0" : teacherdata.left_time === undefined ? "0" : teacherdata.left_time === null ? "0" :
														<span className="ml20"
																	style={{color: '#FF6800'}}>{teacherdata.left_time.time}</span>}
												 </span>
											</span>
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
													.computeTime {
															width: 122px;
															height: 31px;
															display: inline-block;
															padding: 5px;
															text-align: center;
															line-height: 20px;
															color: #FE6B21;
															border: 1px solid #FE6B21;
															cursor: pointer;
															border-radius: 4px;
													}

													.computeTimes{
														width: 122px;
														height: 31px;
														display: inline-block;
														padding: 5px;
														text-align: center;
												  	line-height: 20px;
														color: #C5C5C5;
														border: 1px solid #EDEDED;
														background:#EDEDED;
														cursor: pointer;
											    	border-radius: 4px;
													}
													`}
																	</style>
																	<div className="fr">

																		{/*<span className="fl  mr10 color-grey-6 ">计算成绩时间：{teacherdata&&teacherdata.calculation_time==null?"--":	moment(teacherdata&&teacherdata.calculation_time).format('YYYY-MM-DD HH:mm')}</span>*/}
																		{/*				{	course_is_end===true?"":teacherdata&&teacherdata.task_operation&&teacherdata.task_operation[0]==="开启挑战"?"":<span>*/}
																		{/*	{computeTimetype===true?*/}

																		{/*		(this.props.isNotMember()===false?*/}
																		{/*			(*/}
																		{/*				teacherdata&&teacherdata.update_score===true?*/}
																		{/*					<div className={"computeTime font-16"} onClick={this.setComputeTime}>*/}
																		{/*						查看最新成绩*/}
																		{/*					</div>:""*/}
																		{/*			)*/}
																		{/*			:""):*/}
																		{/*		teacherdata&&teacherdata.homework_status!==undefined&&teacherdata.homework_status[0]=== "未发布"? "":*/}
																		{/*			(this.props.isNotMember()===false?<div className={"computeTimes font-16"}>*/}
																		{/*				查看最新成绩*/}
																		{/*			</div>:"")*/}
																		{/*	}*/}
																		{/*</span>}*/}
																	</div>
																</div>
															</div>
															<div className={"justify break_full_word new_li"}
																	 style={{minHeight: "480px"}}>
																<style>{`
              	          // .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
													// 						top: 72%;
						              //   }
						                .edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
						                			.ysltableowss .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														 	.ysltableowss .ant-table-tbody > tr > td{
																 	height: 58px;
														 }
														 .ysltableowss .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 0px;
															}
						              `}</style>
																<div className="edu-table edu-back-white ysltableowss table4">
																		{datas === undefined ? "" :
																			<Spin tip="正在加载..." spinning={loadingstate}>
																				<Table
																				dataSource={datas}
																				columns={columnsstu}
																				pagination={false}
																				loading={false}
																			/>
																			</Spin>
																		}
																</div>
															</div>
															{
																teacherdata && teacherdata.work_count && teacherdata.work_count > limit ?
																	<div className="edu-txt-center ysyslxh mt30">
																		<Pagination showQuickJumper current={page}
																								onChange={this.paginationonChangestwo} pageSize={limit}
																								total={teacherdata.work_count}></Pagination>
																	</div>
																	: ""
															}
														</div>
														:
														<div id="forum_list" className="forum_table">
															<div className="mh650 edu-back-white">
																<div className="edu-tab-con-box clearfix edu-txt-center">
																	<img className="edu-nodata-img mb20"
																			 src={getImageUrl("images/educoder/nodata.png")}/>
																	<p className="edu-nodata-p mb30">{this.state.searchtypes===false?"暂时还没有相关数据哦！":"抱歉没有您要搜索的内容，请换个词语试试看"}</p>
																</div>
															</div>
														</div>
													}
												</div>
											</div>
								}
							</div>

					}
				</div>


		)
	}
}

export default Listofworksstudentone;
