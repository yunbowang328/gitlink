import React, {Component} from "react";
import CoursesListType from '../coursesPublic/CoursesListType';
import {WordsBtn} from 'educoder';

import {
	Select,
	Input,
	Checkbox,
	Table,
	Radio,
	Pagination,
	Tooltip,
} from "antd";
import axios from 'axios';
import '../css/members.css'
import "../common/formCommon.css"
import '../css/Courses.css'
import '../css/busyWork.css'
import '../poll/pollStyle.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import './yslexercisetable.css';
import {getImageUrl, toPath, sortDirections} from 'educoder';
import NoneData from '../../../modules/courses/coursesPublic/NoneData';
import ModulationModal_exercise from "../coursesPublic/ModulationModal_exercise";
const Search = Input.Search;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
//学生老师页面
class Studentshavecompletedthelist extends Component {
	// http://localhost:3007/courses/1309/exercises/722/exercises/student_exercise_list?debug=s
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			datas: [],
			page: 1,
			limit: 20,
			testpapergradingboll: false,
			styletable: {
				"display": "block"
			},
			course_groupyslstwodatas: [{id: 0, tu: "未评"}, {id: 1, tu: "已评"}],
			course_groupyslsthree: undefined,
			teacherlist: undefined,
			searchtext: "",
			Teacherliststudentlist: undefined,
			mylistansum:0,
			review: null,
			course_groupysls: undefined,
			nocomment: false,
			course_groupyslstwo: undefined,
			commented: false,
			commit_status: undefined,
			submitted: false,
			unsubmitted: false,
			exercise_users: undefined,
			loadingstate: true,
			order: "end_at",
			current_answer_user: undefined,
			course_groups: undefined,
			course_groupsdatas: false,
			noclassroom: undefined,
			current_status: props.current_status,
			course_groupyslstwodata: [{id: 0, tu: "未提交"}, {id: 1, tu: "已提交"}],
			columns: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: 'center',
					className: "edu-txt-center font-14",
					width:'100px',
					render: (text, record) => (
						<span>
							{record.number === "--" ?
								<span style={{color: '#999999', textAlign: "center",width:'100px'}}>{record.number}</span>
								:
								<span style={{color: '#07111B', textAlign: "center",width:'100px'}}>{record.number}</span>

							}
        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth110",
					width:'100px',
					render: (text, record) => (
						<span className="maxnamewidth110 font-14" style={{
							width:'100px'
						}}>
								{record.name === "--" ?
									<span style={{color: '#999999', textAlign: "center",width:'100px'}}>{record.name}</span>
									:
									<a className="maxnamewidth110" style={{color: '#07111B', textAlign: "center",width:'100px'}} title={record.name}>{record.name}</a>

								}
        </span>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth175",
					width:'175px',
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span className="maxnamewidth175" style={{
							width:'175px',
						}}>
							{record.stduynumber === null ?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'175px',
								}}>--</span> :
								record.stduynumber ===
								"" ?
									<span style={{
										color: '#999999',
										textAlign: "center",
										width:'175px',
									}}>--</span> :
									<a className="maxnamewidth175" style={{
										color: '#9A9A9A',
										textAlign: "center",
										width:'175px',
									}} title={record.stduynumber}>{record.stduynumber}</a>
							}

        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth255",
					width:'255px',
					render: (text, record) => (
						<span className="maxnamewidth255" style={{width:'255px'}}>
								{record.classroom === null ?
									<span style={{
										color: '#999999',
										textAlign: "center",
										width:'255px',
									}}>--</span> :
									record.classroom ===
									"" ?
										<span style={{
											color: '#999999',
											textAlign: "center",
											width:'255px',
										}}>--</span> :
										<a className="maxnamewidth255" style={{
											color: '#07111B',
											textAlign: "center",
											width:'255px',
										}} title={record.classroom}>{record.classroom}</a>
								}

        </span>
					)
				},
				{
					title: '提交状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: "edu-txt-center font-14",
					width:'98px',
					render: (text, record) => (
						<span style={{
							width:'98px',
						}}>
             <span style={record.submitstate === "未提交" ? {
							 color: '#999999',
							 textAlign: "center",
							 width:'98px',
						 } : record.submitstate === "已提交" ? {color: '#29BD8B', textAlign: "center",	width:'98px'} : {
							 color: '#29BD8B',
							 textAlign: "center",
							 width:'98px',
						 }}>{record.submitstate}</span>
        </span>
					)

				},
				{
					title: '提交时间',
					dataIndex: 'updatetime',
					key: 'updatetime',
					align: 'center',
					className: "edu-txt-center font-14",
					width:'175px',
					sorter: true,
					defaultSortOrder: 'descend',
					sortDirections: sortDirections,
					render: (text, record) => (
						<span style={{
							width:'175px',
						}}>
							{record.updatetime === "--" ?
								<span style={{color: '#999999', textAlign: "center",width:'175px'}}>{record.updatetime}</span>
								:
								<span style={{color: '#9A9A9A', textAlign: "center",width:'175px'}}>{record.updatetime}</span>
							}
        </span>
					),
				},
				{
					title: '客观题得分',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: "edu-txt-center font-14",
					width:'98px',
					render: (text, record) => (
						<span>   {
							record.completion === "--" ?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'98px',
								}}>
									{record.completion}
								</span>
								:
								<span style={parseInt(record.completion) > 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width:'98px',
								} : parseInt(record.completion) <= 90 ? {
									color: '#FF6800',
									textAlign: "center",
									width:'98px',
								} : parseInt(record.completion) <= 60 ? {
										color: '#747A7F',
										textAlign: "center",
										width:'98px',
									} :
									{
										color: '#747A7F',
										textAlign: "center",
										width:'98px',
									}}>{record.completion}</span>
						}

        </span>
					)
				},
				{
					title: '主观题得分',
					dataIndex: 'levelscore',
					key: 'levelscore',
					align: 'center',
					className: "edu-txt-center font-14",
					width:'99px',
					render: (text, record) => (
						<span>
							{record.levelscore === "--" ?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'99px',
								}}>
									{record.levelscore}
								</span>
								:
								<span style={parseInt(record.levelscore) > 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width:'99px',
								} : parseInt(record.levelscore) <= 90 ? {
									color: '#FF6800',
									textAlign: "center",
									width:'99px',
								} : parseInt(record.levelscore) <= 60 ? {
									color: '#747A7F',
									textAlign: "center",
									width:'99px',
								} : {color: '#747A7F', textAlign: "center",width:'99px'}}>{record.levelscore}</span>
							}
        </span>
					)
				},
				{
					title: '最终成绩',
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					sortDirections: sortDirections,
					width:'199px',
					render: (text, record) => (
						<span style={{width:"199px"}}>
							{record.efficiencyscore === "--" ?
								<Tooltip  placement="bottom" title={<div>
									<div>未评分</div>
								</div>}>
									<a style={{
										color: '#999999',
										textAlign: "center"
									}}>
										{record.efficiencyscore}
									</a>
								</Tooltip>
								:
								record.commit_method===5?
									<Tooltip  placement="bottom" title={
										<div>
											<div>最终调整成绩：{record.efficiencyscore}分</div>
										</div>}>
									<span style={parseInt(record.efficiencyscore) > 90 ? {
										color: '#DD1717',
										textAlign: "center"
									} : parseInt(record.efficiencyscore) <= 90 ? {
										color: '#FF6800',
										textAlign: "center"
									} : parseInt(record.efficiencyscore) <= 60 ? {
										color: '#747A7F',
										textAlign: "center",
									} : {
										color: '#747A7F',
										textAlign: "center"
									}}>{record.efficiencyscore}</span>
									</Tooltip>
									:
								<span style={parseInt(record.efficiencyscore) > 90 ? {
									color: '#DD1717',
									textAlign: "center"
								} : parseInt(record.efficiencyscore) <= 90 ? {
									color: '#FF6800',
									textAlign: "center"
								} : parseInt(record.efficiencyscore) <= 60 ? {
									color: '#747A7F',
									textAlign: "center",
								} : {
									color: '#747A7F',
									textAlign: "center"
								}}>{record.efficiencyscore}</span>
							}
        </span>
					)
				},
				{
					title: '操作',
					dataIndex: 'finalscore',
					key: 'finalscore',
					align: 'center',
					className: "edu-txt-center  font-14",
					width:'98px',
					render: (text, record) => (
						<span style={{width:'98px'}}>
						<span style={{textAlign: "center", color: '#999999'}}>--</span>
            </span>
					)
				},
			],
			columnstwo: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: 'center',
					className: "edu-txt-center tabletd font-14",
					width:'100px',
					render: (text, record) => (
						<span>
							{
								<span style={{color: '#999999', textAlign: "center",width:'100px'}}>我</span>
							}
        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center tabletd font-14 maxnamewidth110",
					width:'100px',
					render: (text, record) => (
						<span className="maxnamewidth110 font-14">
							{
								record.name === "--" ?
									<span className="maxnamewidth110" style={{color: '#999999', textAlign: "center",width:'100px'}}>{record.name}</span>
									:
									<span className="maxnamewidth110" style={{color: '#07111B', textAlign: "center",width:'100px'}}>{record.name}</span>

							}
        </span>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: 'center',
					className: "edu-txt-center tabletd font-14 maxnamewidth175",
					width:'175px',
					render: (text, record) => (
						<span className="maxnamewidth175" style={{
							width:'175px',
						}}>
							{record.stduynumber === null ?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'175px',
								}}>--</span>
								:
								record.stduynumber === "" ?
									<span style={{
										color: '#999999',
										textAlign: "center",
										width:'175px',
									}}>--</span>
									:
									<a className="maxnamewidth175 font-14" style={{
										color: '#9A9A9A',
										textAlign: "center",
										width:'175px',
									}} title={record.stduynumber}>{record.stduynumber}</a>
							}

        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: "edu-txt-center tabletd font-14 maxnamewidth255",
					width:'255px',
					render: (text, record) => (
						<span className="font-14 maxnamewidth255" style={{
							width:'255px',
						}}>
							{record.classroom === null ?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'255px',
								}}>--</span>: record.classroom === "" ?
									<span style={{
										color: '#999999',
										textAlign: "center",
										width:'255px',
									}}>--</span>:
									<a className="maxnamewidth255" style={{
										color: '#07111B',
										textAlign: "center",
										width:'255px',
									}} title={record.classroom}>{record.classroom}</a>
							}

        </span>
					)
				},
				{
					title: '提交状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: "edu-txt-center tabletd font-14",
					width:'98px',
					render: (text, record) => (
						<span style={{width:'98px',}}>
             <span style={record.submitstate === "未提交" ? {
							 color: '#999999',
							 textAlign: "center",
							 width:'98px',
						 } : record.submitstate === "已提交" ? {color: '#29BD8B', textAlign: "center",		 width:'98px',} : {
							 color: '#29BD8B',
							 textAlign: "center",
							 width:'98px',
						 }}>{record.submitstate}</span>
        </span>
					)

				},
				{
					title: '提交时间',
					dataIndex: 'updatetime',
					key: 'updatetime',
					align: 'center',
					className: "edu-txt-center tabletd font-14",
					width:'175px',
					render: (text, record) => (
						<span style={{
							width:'175px',
						}}>
							{record.updatetime === "--"?
								<span style={{color: '#999999', textAlign: "center",width:'175px'}}>--</span>
								:
								<span style={{color: '#9A9A9A', textAlign: "center",width:'175px'}}>{record.updatetime}</span>
							}
        </span>
					),
				},
				{
					title: '客观题得分',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: "edu-txt-center tabletd font-14",
					width:'98px',
					render: (text, record) => (
						<span>
							{record.completion === "--" ?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'98px',
								}}>
									--
								</span>

								:
								<span style={parseInt(record.completion) > 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width:'98px',
								} : parseInt(record.completion) <= 90 ? {
									color: '#FF6800',
									textAlign: "center",
									width:'98px',
								} : parseInt(record.completion) <= 60 ? {
									color: '#747A7F',
									textAlign: "center",
									width:'98px',
								} : {
									color: '#747A7F',
									textAlign: "center",
									width:'98px',
								}}>{record.completion}</span>
							}
        </span>
					)
				},
				{
					title: '主观题得分',
					dataIndex: 'levelscore',
					key: 'levelscore',
					align: 'center',
					className: "edu-txt-center tabletd font-14",
					width:'99px',
					render: (text, record) => (
						<span>
							{record.levelscore === "--"?
								<span style={{
									color: '#999999',
									textAlign: "center",
									width:'99px',
								}}>
									--
								</span>
								:
								<span style={parseInt(record.levelscore) > 90 ? {
									color: '#DD1717',
									textAlign: "center",
									width:'99px'
								} : parseInt(record.levelscore) <= 90 ? {
									color: '#FF6800',
									textAlign: "center",
									width:'99px'
								} : parseInt(record.levelscore) <= 60 ? {
									color: '#747A7F',
									textAlign: "center",
									width:'99px'
								} : {color: '#747A7F', textAlign: "center",	width:'99px'}}>{record.levelscore}</span>
							}
        </span>
					)
				},
				{
					title: '最终成绩',
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: "edu-txt-center tabletd font-14 columnstwoachievement",
					width:"199px",
					render: (text, record) => (
						<span style={{width:"199px"}}>
							{
								record.efficiencyscore === "--"?
									<Tooltip  placement="bottom" title={<div>
										<div>未评分</div>
									</div>}>
										<a style={{
											color: '#DD1717',
											textAlign: "center",
											width:"199px"
										}}>--</a>
									</Tooltip>
									:
									record.commit_method===5?
										<Tooltip  placement="bottom" title={
											<div>
												<div>最终调整成绩：{record.efficiencyscore}分</div>
											</div>}>
										<span style={parseInt(record.efficiencyscore) > 90 ? {
											color: '#DD1717',
											textAlign: "center",
											width:"199px"
										} : parseInt(record.efficiencyscore) <= 90 ? {
											color: '#FF6800',
											textAlign: "center",
											width:"199px"
										} : parseInt(record.efficiencyscore) <= 60 ? {
											color: '#747A7F',
											textAlign: "center",
											width:"199px"
										} : {
											color: '#747A7F',
											textAlign: "center",
											width:"199px"
										}}>{record.efficiencyscore}</span>
										</Tooltip>
										:
									<span style={parseInt(record.efficiencyscore) > 90 ? {
										color: '#DD1717',
										textAlign: "center",
										width:"199px"
									} : parseInt(record.efficiencyscore) <= 90 ? {
										color: '#FF6800',
										textAlign: "center",
										width:"199px"
									} : parseInt(record.efficiencyscore) <= 60 ? {
										color: '#747A7F',
										textAlign: "center",
										width:"199px"
									} : {
										color: '#747A7F',
										textAlign: "center",
										width:"199px"
									}}>{record.efficiencyscore}</span>
							}

        </span>
					)
				},
				{
					title: '操作',
					dataIndex: 'finalscore',
					key: 'finalscore',
					align: 'center',
					className: "edu-txt-center tabletd font-14",
					width:"98px",
					render: (text, record) => (
						<span style={{width:"98px"}}>
							{
								record.submitstate === "未提交"||record.commit_method===5?
									<span style={{textAlign: "center", color: '#999999',width:"98px"}}>-aa-</span>
									:record.submitstate === "已提交"?
									record.score_open===null||record.score_open===undefined?"":
										record.score_open===true?
											<a style={{textAlign: "center",width:"98px"}} className="color-blue"
												 target="_blank"
												 href={`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/users/${record.myid}`}>查看</a>
											:""
									:
									<span style={{textAlign: "center", color: '#999999',width:"98px"}}>--</span>
							}
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
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.number=== "--"?
									<span style={{color: '#999999', textAlign: "center"}}>--</span>
									:
									<span style={{color: '#07111B', textAlign: "center"}}>{record.number}</span>
							}

        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
											{
												record.name === "--" ?
													<span style={{color: '#999999', textAlign: "center"}}>--</span>
													:
													<span style={{color: '#07111B', textAlign: "center"}}>{record.name}</span>
											}
        </span>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{record.stduynumber === null ?
								<span style={{
									color: '#999999',
									textAlign: "center"
								}}>--</span>
								: record.stduynumber === "" ?
									<span style={{
										color: '#999999',
										textAlign: "center"
									}}>--</span>
									:
									<span style={{
										color: '#9A9A9A',
										textAlign: "center"
									}}>{record.stduynumber}</span>
							}

        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth260",
					width:"260px",
					render: (text, record) => (
						<span>
							{record.classroom === null ?
								<span style={{
									color: '#999999',
									textAlign: "center"
								}}  className="maxnamewidth260">--</span>  : record.classroom === "" ?
									<span style={{
										color: '#999999',
										textAlign: "center"
									}} className="maxnamewidth260">--</span> :
									<span style={{
										color: '#07111B',
										textAlign: "center"
									}} className="maxnamewidth260">{record.classroom}</span>
							}

        </span>
					)
				},
				{
					title: '提交状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
             <span style={record.submitstate === "未提交" ? {
							 color: '#999999',
							 textAlign: "center"
						 } : record.submitstate === "已提交" ? {color: '#29BD8B', textAlign: "center"} : {
							 color: '#29BD8B',
							 textAlign: "center"
						 }}>{record.submitstate}</span>
        </span>
					)

				},
				{
					title: '提交时间',
					dataIndex: 'updatetime',
					key: 'updatetime',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.updatetime === "--" ?
									<span style={{color: '#999999', textAlign: "center"}}>--</span>

									:
									<span style={{color: '#9A9A9A', textAlign: "center"}}>{record.updatetime}</span>

							}
        </span>
					),
				},
				{
					title: '客观题得分',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.completion === "--"?
									<span style={{
										color: '#999999',
										textAlign: "center",
									}}>--</span>
									:
									<span style={parseInt(record.completion) > 90 ? {
										color: '#DD1717',
										textAlign: "center",
									} : parseInt(record.completion) <= 90 ? {
										color: '#FF6800',
										textAlign: "center",
									} : parseInt(record.completion) <= 60 ? {
										color: '#747A7F',
										textAlign: "center",
									} : {
										color: '#747A7F',
										textAlign: "center",
									}}>{record.completion}</span>
							}

        </span>
					)
				},
				{
					title: '主观题得分',
					dataIndex: 'levelscore',
					key: 'levelscore',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
									{
										record.levelscore === "--" ?
											<span style={{
												color: '#999999',
												textAlign: "center",
											}}>--</span> :
											<span style={parseInt(record.levelscore) > 90 ? {
												color: '#DD1717',
												textAlign: "center",
											} : parseInt(record.levelscore) <= 90 ? {
												color: '#FF6800',
												textAlign: "center",
											} : parseInt(record.levelscore) <= 60 ? {
												color: '#747A7F',
												textAlign: "center",
											} : {color: '#747A7F', textAlign: "center"}}>{record.levelscore}</span>
									}

        </span>
					)
				},
				{
					title: '最终成绩',
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							              {
															record.efficiencyscore === "--" ?
																<Tooltip  placement="bottom" title={<div>
																	<div>未评分</div>
																</div>}>
																	<a style={{
																		color: '#999999',
																		textAlign: "center",
																	}}>--</a>
																</Tooltip>
																:
																record.commit_method===5?
																	<Tooltip  placement="bottom" title={
																		<div>
																		<div>最终调整成绩：{record.efficiencyscore}分</div>
																	  </div>}>
																	<span style={parseInt(record.efficiencyscore) > 90 ? {
																		color: '#DD1717',
																		textAlign: "center",
																	} : parseInt(record.efficiencyscore) <= 90 ? {
																		color: '#FF6800',
																		textAlign: "center",
																	} : parseInt(record.efficiencyscore) <= 60 ? {
																		color: '#747A7F',
																		textAlign: "center",
																	} : {
																		color: '#747A7F',
																		textAlign: "center",
																	}}>{record.efficiencyscore}</span>
																	</Tooltip>
																	:
																<span style={parseInt(record.efficiencyscore) > 90 ? {
																	color: '#DD1717',
																	textAlign: "center",
																} : parseInt(record.efficiencyscore) <= 90 ? {
																	color: '#FF6800',
																	textAlign: "center",
																} : parseInt(record.efficiencyscore) <= 60 ? {
																	color: '#747A7F',
																	textAlign: "center",
																} : {
																	color: '#747A7F',
																	textAlign: "center",
																}}>{record.efficiencyscore}</span>
														}
						</span>
					)
				},
				{
					title: '操作',
					dataIndex: 'operating',
					key: 'operating',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							       {record.operating==="--"?
											 <span style={{textAlign: "center",color: '#999999',}}>{record.operating}</span>
											 :record.submitstate === "未提交"?
												 <span style={{textAlign: "center",color: '#999999',}}>--</span>
												 :
												 <a style={{textAlign: "center"}} className="color-blue"
														target="_blank"
														href={`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/users/${record.myid}`}>{record.operating}</a>
										 }

                    </span>
					)
				},
			],
			vaiew: false,
			unlimited: 0,
			unlimiteds: 0,
			unlimitedtwo: 0,
			checkedValues: [],
			checkedValuesineinfo: [],
			Evaluationarray: [{id: 1, value: "未评"}, {id: 2, value: "已评"}],
			columnsys: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							 {record.number === "--" ?
								 <span style={{color: '#999999', textAlign: "center"}}>--</span>
								 :
								 <span style={{color: '#07111B', textAlign: "center"}}>{record.number}</span>
							 }
        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{record.name==="--"?
								<span style={{color: '#999999', textAlign: "center"}}>{record.name}</span>
								:
								<span style={{color: '#07111B', textAlign: "center"}}>{record.name}</span>
							}
        </span>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span>
						{record.stduynumber === "--" ?
							<span style={{color: '#999999', textAlign: "center"}}>{record.stduynumber}</span>
							:
							<span style={{color: '#9A9A9A', textAlign: "center"}}>{record.stduynumber}</span>
						}
        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth260",
					width:'260px',
					render: (text, record) => (
						<span>
							{record.classroom==="--"?
								<span style={{color: '#999999', textAlign: "center"}} className="maxnamewidth260">{record.classroom}</span>
								:
								<a style={{color: '#07111B', textAlign: "center"}} className="maxnamewidth260" title={record.classroom}>{record.classroom}</a>
							}
        </span>
					)
				},
				{
					title: '提交状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
								<span style={record.submitstate === "未提交" ? {
									color: '#999999',
									textAlign: "center"
								} : record.submitstate === "已提交" ? {color: '#29BD8B', textAlign: "center"} : {
									color: '#29BD8B',
									textAlign: "center"
								}}>{record.submitstate}</span>

        </span>
					)

				},
				{
					title: '提交时间',
					dataIndex: 'updatetime',
					key: 'updatetime',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					defaultSortOrder: 'descend',
					sortDirections: sortDirections,
					render: (text, record) => (
						<span>
							{record.updatetime==="--"?
								<span style={{color: '#999999', textAlign: "center"}}>--</span>
								:
								<span style={{color: '#9A9A9A', textAlign: "center"}}>{record.updatetime}</span>
							}
        </span>
					),
				},
				{
					title: '客观题得分',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{record.completion=== "--"?
								<span style={{color: '#999999', textAlign: "center"}}>--</span>
								:
								<span style={{color: '#07111B', textAlign: "center"}}>{record.completion}</span>
							}
        </span>
					)
				},
				{
					title: '主观题得分',
					dataIndex: 'levelscore',
					key: 'levelscore',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{record.levelscore==="--"?
								<span style={{color: '#999999', textAlign: "center"}}>--</span>
								:
								<span style={{color: '#FF6800', textAlign: "center"}}>{record.levelscore}</span>
							}
        </span>
					)
				},
				{
					title: '最终成绩',
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span>
															{record.efficiencyscore === "--" ?
																<Tooltip  placement="bottom" title={<div>
																	<div>未评分</div>
																</div>}>
																	<a style={{color: '#999999',
																		textAlign: "center",}}>--</a>
																</Tooltip>
																:
																record.commit_method===5?
																	<Tooltip  placement="bottom" title={
																		<div>
																			<div>最终调整成绩：{record.efficiencyscore}分</div>
																		</div>}>
																	<span style={parseInt(record.efficiencyscore) > 90 ? {
																		color: '#DD1717',
																		textAlign: "center",
																	} : parseInt(record.efficiencyscore) <= 90 ? {
																		color: '#FF6800',
																		textAlign: "center",
																	} : parseInt(record.efficiencyscore) <= 60 ? {
																		color: '#747A7F',
																		textAlign: "center",
																	} : {
																		color: '#747A7F',
																		textAlign: "center",
																	}}>{record.efficiencyscore}</span>
																	</Tooltip>
																	:
																<span style={parseInt(record.efficiencyscore) > 90 ? {
																	color: '#DD1717',
																	textAlign: "center",
																} : parseInt(record.efficiencyscore) <= 90 ? {
																	color: '#FF6800',
																	textAlign: "center",
																} : parseInt(record.efficiencyscore) <= 60 ? {
																	color: '#747A7F',
																	textAlign: "center",
																} : {
																	color: '#747A7F',
																	textAlign: "center",
																}}>{record.efficiencyscore}</span>
															}
        </span>
					)
				},
				{
					title: '操作',
					dataIndex: 'finalscore',
					key: 'finalscore',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.submitstate === "未提交"||record.commit_method===5?
									<a style={{textAlign: "center"}} className="color-blue"
										 target="_blank" onClick={() => this.Adjustment(record.user_id)}>评阅</a>
									:record.submitstate === "已提交"?
									<a style={{textAlign: "center"}} className="color-blue"
										 target="_blank"
										 href={`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/users/${record.myid}`}>{record.finalscore}</a>
									:
									<span style={{textAlign: "center", color: '#999999'}}>--</span>
							}
                    </span>
					)
				},
			],
			columnsystwo: [
				{
					title: '序号',
					dataIndex: 'number',
					key: 'number',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							 {record.number === "--" ?
								 <span style={{color: '#999999', textAlign: "center"}}>--</span>
								 :
								 <span style={{color: '#07111B', textAlign: "center"}}>{record.number}</span>
							 }
        </span>
					)
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
					className: "edu-txt-center font-14",

					render: (text, record) => (
						<span>
							{record.name==="--"?
								<span style={{color: '#999999', textAlign: "center"}}>{record.name}</span>
								:
								<span style={{color: '#07111B', textAlign: "center"}}>{record.name}</span>
							}
        </span>
					)
				},
				{
					title: '学号',
					dataIndex: 'stduynumber',
					key: 'stduynumber',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span>
						{record.stduynumber === "--" ?
							<span style={{color: '#999999', textAlign: "center"}}>{record.stduynumber}</span>
							:
							<span style={{color: '#9A9A9A', textAlign: "center"}}>{record.stduynumber}</span>
						}
        </span>
					),
				},
				{
					title: '分班',
					key: 'classroom',
					dataIndex: 'classroom',
					align: 'center',
					className: "edu-txt-center font-14 maxnamewidth260 ",
					width:'260px',
					render: (text, record) => (
						<span>
							{record.classroom==="--"?
								<span style={{color: '#999999', textAlign: "center"}} className="maxnamewidth260">{record.classroom}</span>
								:
								<a style={{color: '#07111B', textAlign: "center"}} className="maxnamewidth260" title={record.classroom}>{record.classroom}</a>
							}
        </span>
					)
				},
				{
					title: '提交状态',
					dataIndex: 'submitstate',
					key: 'submitstate',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
								<span style={record.submitstate === "未提交" ? {
									color: '#999999',
									textAlign: "center"
								} : record.submitstate === "已提交" ? {color: '#29BD8B', textAlign: "center"} : {
									color: '#29BD8B',
									textAlign: "center"
								}}>{record.submitstate}</span>

        </span>
					)

				},
				{
					title: '提交时间',
					dataIndex: 'updatetime',
					key: 'updatetime',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					defaultSortOrder: 'descend',
					sortDirections: sortDirections,
					render: (text, record) => (
						<span>
							{record.updatetime==="--"?
								<span style={{color: '#999999', textAlign: "center"}}>--</span>
								:
								<span style={{color: '#9A9A9A', textAlign: "center"}}>{record.updatetime}</span>
							}
        </span>
					),
				},
				{
					title: '客观题得分',
					dataIndex: 'completion',
					key: 'completion',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{record.completion=== "--"?
								<span style={{color: '#999999', textAlign: "center"}}>--</span>
								:
								<span style={{color: '#07111B', textAlign: "center"}}>{record.completion}</span>
							}
        </span>
					)
				},
				{
					title: '主观题得分',
					dataIndex: 'levelscore',
					key: 'levelscore',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{record.levelscore==="--"?
								<span style={{color: '#999999', textAlign: "center"}}>--</span>
								:
								<span style={{color: '#FF6800', textAlign: "center"}}>{record.levelscore}</span>
							}
        </span>
					)
				},
				{
					title: '最终成绩',
					dataIndex: 'efficiencyscore',
					key: 'efficiencyscore',
					align: 'center',
					className: "edu-txt-center font-14",
					sorter: true,
					sortDirections: sortDirections,
					render: (text, record) => (
						<span>
															{record.efficiencyscore === "--" ?
																<Tooltip  placement="bottom" title={<div>
																	<div>未评分</div>
																</div>}>
																	<a style={{color: '#999999',
																		textAlign: "center",}}>--</a>
																</Tooltip>
																:
																record.commit_method===5?
																	<Tooltip  placement="bottom" title={
																		<div>
																			<div>最终调整成绩：{record.efficiencyscore}分</div>
																		</div>}>
																	<span style={parseInt(record.efficiencyscore) > 90 ? {
																		color: '#DD1717',
																		textAlign: "center",
																	} : parseInt(record.efficiencyscore) <= 90 ? {
																		color: '#FF6800',
																		textAlign: "center",
																	} : parseInt(record.efficiencyscore) <= 60 ? {
																		color: '#747A7F',
																		textAlign: "center",
																	} : {
																		color: '#747A7F',
																		textAlign: "center",
																	}}>{record.efficiencyscore}</span>
																	</Tooltip>
																	:
																<span style={parseInt(record.efficiencyscore) > 90 ? {
																	color: '#DD1717',
																	textAlign: "center",
																} : parseInt(record.efficiencyscore) <= 90 ? {
																	color: '#FF6800',
																	textAlign: "center",
																} : parseInt(record.efficiencyscore) <= 60 ? {
																	color: '#747A7F',
																	textAlign: "center",
																} : {
																	color: '#747A7F',
																	textAlign: "center",
																}}>{record.efficiencyscore}</span>
															}
        </span>
					)
				},
				{
					title: '操作',
					dataIndex: 'finalscore',
					key: 'finalscore',
					align: 'center',
					className: "edu-txt-center font-14",
					render: (text, record) => (
						<span>
							{
								record.submitstate === "未提交"||record.commit_method===5?
									<a style={{textAlign: "center"}} className="color-blue"
										 target="_blank" onClick={() => this.Adjustment(record.user_id)}>评阅</a>
									:record.submitstate === "已提交"?
									<a style={{textAlign: "center"}} className="color-blue"
										 target="_blank"
										 href={`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/users/${record.myid}`}>{record.finalscore}</a>
									:
									<span style={{textAlign: "center", color: '#999999'}}>--</span>
							}
                    </span>
					)
				},
			],//columnsystwo 也会被columnsys当作参数接收
			exercise_status:0,
			order_type: "desc",
			exeuserid: 0,
			subjective: 0,
			objective_score: 0,
			subjective_score: 0,
		}
		{/*<a style={{textAlign: "center"}} className="color-blue"*/
		}
		{/*	 target="_blank"*/
		}
		{/*	 onClick={() => this.Adjustment(record.user_id)}>评阅</a>*/
		}
		{/*<span style={{textAlign: "center", color: '#999999'}}*/}
		{/*>--</span>*/}
		// //console.log("Studentshavecompletedthelist");
		// //console.log(props.current_status);
		// columnsys 老师列表
		// columnss 学生只能看自己的 未截止页面
		// columnstwo 截止显示自己的
		// columns 截止后显示其他学生
	}

	paginationonChange = (pageNumber) => {
		// //console.log('Page: ');
		if (this.state.loadingstate === false) {
			this.setState({
				page: pageNumber,
				loadingstate: true,
			})

		} else {
			this.setState({
				page: pageNumber,
			})
		}

		this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, pageNumber, 20, this.state.order_type);

	}
	paginationonChanges = (pageNumber) => {
		// //console.log('Page: ');
		if (this.state.loadingstate === false) {
			this.setState({
				page: pageNumber,
				loadingstate: true,
			})

		} else {
			this.setState({
				page: pageNumber,
			})
		}

		this.Searchdata(this.state.order, null, null, null, null, pageNumber, this.state.limit, this.state.order_type);


	}

	componentDidMount() {
		// if(this.props.isAdmin() === true){
		//     this.Teacherliststudentlistsy();
		//     //console.log("1111111111111111");
		//     //console.log(this.props.isAdmin());
		// }else {
		this.Teacherliststudentlist();
		// //console.log("2222222222222");
		// //console.log(this.props.isAdmin());
		// }
		try {
			this.props.triggerRef(this);
		}catch (e) {

		}
	}

	componentWillReceiveProps = (nextProps) => {

	}


	//试卷列表
	Teacherliststudentlist = () => {
		// //console.log("Teacherliststudentlist");  //	764
		var thiss = this;
		var exercise_id = this.props.match.params.Id;
		// //console.log(731);  //	764 935
		var url = `/exercises/${exercise_id}/exercise_lists.json`;
		axios.get((url), {
			params: {
				order: "end_at",
				commit_status: null,
				review: null,
				exercise_group_id: null,
				search: "",
				page: null,
				limit: null,
			}
		}).then((response) => {
			//学生
			if (response.data.exercise_types.user_permission === 1) {
				this.setState({
					Teacherliststudentlist: response.data,
					review: response.data.review,
					commit_status: response.data.commit_status,
					exercise_users: response.data.exercise_users,
					current_answer_user: response.data.current_answer_user,
					course_groups: response.data.course_groups,
					mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users
				})
				if (response.data.current_answer_user === undefined || response.data.current_answer_user === null) {
					// 学生未截止
					// //console.log("试卷学生未截止");
					this.Generatenewdatas(response.data.exercise_users);
					if (response.data.exercise_types.subjective === 0) {

						if (this.state.noclassroom === undefined || this.state.noclassroom === "" || this.state.noclassroom === null) {
							console.log("4");
							var arr =[];
							for(var i=0;i<this.state.columnss.length;i++){
								var item = this.state.columnss[i];
								if(item.title==="分班"){
								}
								else if(item.title==="客观题得分"){
								}
								else if(item.title==="主观题得分"){
								}
								else if(this.props.isNotMember()===true&&item.title==="学号") {

								}
								else{
									arr.push(item);
								}
							}
							this.setState({
								columnss: arr,
							})

						} else {
							console.log("5");
							debugger
							var arr =[];
							for(var i=0;i<this.state.columnss.length;i++){
								var item = this.state.columnss[i];
								if(item.title==="客观题得分"){

								}
								else if(item.title==="主观题得分"){
								}
								else if(this.props.isNotMember()===true&&item.title==="学号") {

								}
								else{
									arr.push(item);
								}
							}
							this.setState({
								columnss: arr
							})
						}

					}
				} else {
					//学生已截止
					// //console.log("试卷学生已截止");
					if (response.data.exercise_types.subjective === 0) {
						if (this.state.loadingstate === false) {
							var arr =[];
							for(var i=0;i<this.state.columnstwo.length;i++){
								var item = this.state.columnstwo[i];
								if(item.title==="客观题得分"){
								}
								else if(item.title==="主观题得分"){
								}
								else if(this.props.isNotMember()===true&&item.title==="学号") {

								}
								else{
									arr.push(item);
								}
							}

							var arr2 =[];
							for(var i=0;i<this.state.columns.length;i++){
								var item = this.state.columns[i];
								if(item.title==="客观题得分"){
								}
								else if(item.title==="主观题得分"){
								}
								else if(this.props.isNotMember()===true&&item.title==="学号") {

								}
								else{
									arr2.push(item);
								}
							}
							thiss.setState({
								columns: arr2,
								columnstwo: arr,
								loadingstate: true,
							})
						} else {

							var arr =[];
							for(var i=0;i<this.state.columnstwo.length;i++){
								var item = this.state.columnstwo[i];
								if(item.title==="客观题得分"){
								}
								else if(item.title==="主观题得分"){
								}
								else if(this.props.isNotMember()===true&&item.title==="学号") {

								}
								else{
									arr.push(item);
								}
							}
							var arr2 =[];
							for(var i=0;i<this.state.columns.length;i++){
								var item = this.state.columns[i];
								if(item.title==="客观题得分"){
								}
								else if(item.title==="主观题得分"){
								}
								else if(this.props.isNotMember()===true&&item.title==="学号") {

								}
								else{
									arr2.push(item);
								}
							}
							thiss.setState({
								columns: arr2,
								columnstwo:arr,
							})
						}


					}
					thiss.Generatenewdata(response.data.exercise_users, response.data.current_answer_user,response.data.exercise_types);
				}
			}
			//老师
			else if (response.data.exercise_types.user_permission === 0) {
				// //console.log(response.data.exercise_users)
				//  //console.log(response)
				// //console.log("试卷老师加载中");
				if (thiss.state.loadingstate === false) {
					thiss.setState({
						loadingstate: true,
					})
				}
				//console.log(response);
				//console.log(1393);
				thiss.Generatenewdatasy(response.data.exercise_users, response);
			}
		}).catch((error) => {
			// //console.log(error);
			// //console.log("其实数据加载失败了");
			// //console.log("1111");
		});


	}

	Generatenewdata(exercise_users, current_answer_user,exercise_types) {
		let {page, limit} = this.state;
		let datalist = [];
		let datalisttwo = [];
		var teacherlist = undefined;
		// //console.log("开始数据了");
		if (exercise_users !== undefined) {
			// //console.log("开始打印数据了");
			for (var i = 0; i < exercise_users.length; i++) {
				if (exercise_users[i].commit_status === 1) {
					datalist.push({
						myid: exercise_users[i].login,
						user_group_id: exercise_users[i].user_group_id,
						number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
						name: exercise_users[i].user_name,
						stduynumber: exercise_users[i].student_id === undefined ? "--" : exercise_users[i].student_id === null ? "--" : exercise_users[i].student_id === "" ? "--" : exercise_users[i].student_id,
						classroom: exercise_users[i].user_group_name,
						submitstate: exercise_users[i].commit_status === 1 ? "已提交" : "未提交",
						updatetime: moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm') === "Invalid date" ? "--" : moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm'),
						completion: exercise_users[i].objective_score === undefined ? "--" : exercise_users[i].objective_score === null ? "--" : exercise_users[i].objective_score === "" ? "--" : exercise_users[i].objective_score,
						levelscore: exercise_users[i].subjective_score === undefined ? "--" : exercise_users[i].subjective_score === null ? "--" : exercise_users[i].subjective_score === "" ? "--" : exercise_users[i].subjective_score,
						efficiencyscore: exercise_users[i].score === null ? "--" : exercise_users[i].score === "" ? "--" : exercise_users[i].score,
						operating: "评阅",
						commit_method:exercise_users[i].commit_method,
					})
				} else {
					datalist.push({
						myid: exercise_users[i].login,
						user_group_id: exercise_users[i].user_group_id,
						number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
						name: exercise_users[i].user_name,
						stduynumber: exercise_users[i].student_id === undefined ? "--" : exercise_users[i].student_id === null ? "--" : exercise_users[i].student_id === "" ? "--" : exercise_users[i].student_id,
						classroom: exercise_users[i].user_group_name,
						submitstate: exercise_users[i].commit_status === 1 ? "已提交" : "未提交",
						updatetime: moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm') === "Invalid date" ? "--" : moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm'),
						completion: exercise_users[i].objective_score === undefined ? "--" : exercise_users[i].objective_score === null ? "--" : exercise_users[i].objective_score === "" ? "--" : exercise_users[i].objective_score,
						levelscore: exercise_users[i].subjective_score === undefined ? "--" : exercise_users[i].subjective_score === null ? "--" : exercise_users[i].subjective_score === "" ? "--" : exercise_users[i].subjective_score,
						efficiencyscore: exercise_users[i].score === null ? "--" : exercise_users[i].score === "" ? "--" : exercise_users[i].score,
						operating: "--",
						commit_method:exercise_users[i].commit_method
					})

				}

			}
			teacherlist = {  //分页
				total: exercise_users.length, //数据总数量
				pageSize: 20,  //一页显示几条
				current: this.state.page,
			}
		}
		if (current_answer_user !== undefined) {
			datalisttwo.push({
				myid: current_answer_user.login,
				student_id: current_answer_user.student_id,
				user_group_id: current_answer_user.user_group_id,
				number: 1,
				name: current_answer_user.user_name,
				classroom: current_answer_user.user_group_name,
				stduynumber: current_answer_user.student_id === undefined ? "--" : current_answer_user.student_id === null ? "--" : current_answer_user.student_id === "" ? "--" : current_answer_user.student_id,
				submitstate: current_answer_user.commit_status === 1 ? "已提交" : "未提交",
				updatetime: moment(current_answer_user.end_at).format('YYYY-MM-DD HH:mm') === "Invalid date" ? "--" : moment(current_answer_user.end_at).format('YYYY-MM-DD HH:mm'),
				efficiencyscore: current_answer_user.score === undefined ? "--" : current_answer_user.score === null ? "--" : current_answer_user.score === "" ? "--" : current_answer_user.score,
				review_status: current_answer_user.review_status,
				completion: current_answer_user.objective_score === undefined ? "--" : current_answer_user.objective_score === null ? "--" : current_answer_user.objective_score === "" ? "--" : current_answer_user.objective_score,
				levelscore: current_answer_user.subjective_score === undefined ? "--" : current_answer_user.subjective_score === null ? "--" : current_answer_user.subjective_score === "" ? "--" : current_answer_user.subjective_score,
				score_open:exercise_types.score_open,
				commit_method:current_answer_user.commit_method

			})


		}


		this.setState({
			data: datalisttwo,
			datas: datalist,
			teacherlist: teacherlist,
			loadingstate: false,
		})

	}

	Generatenewdatas(exercise_users) {
		let {page, limit} = this.state;
		let datalist = [];
		var teacherlist = undefined;
		var noclassroom = undefined;
		// //console.log("开始数据了");
		if (exercise_users !== undefined) {
			// //console.log("开始打印数据了");
			for (var i = 0; i < exercise_users.length; i++) {
				datalist.push({
					myid: exercise_users[i].login,
					user_group_id: exercise_users[i].user_group_id,
					number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
					name: exercise_users[i].user_name,
					stduynumber: exercise_users[i].student_id,
					classroom: exercise_users[i].user_group_name,
					submitstate: exercise_users[i].commit_status === 1 ? "已提交" : "未提交",
					updatetime: moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm') === "Invalid date" ? "--" : moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm'),
					completion: exercise_users[i].objective_score === undefined ? "--" : exercise_users[i].objective_score === null ? "--" : exercise_users[i].objective_score === "" ? "--" : exercise_users[i].objective_score,
					levelscore: exercise_users[i].subjective_score === undefined ? "--" : exercise_users[i].subjective_score === null ? "--" : exercise_users[i].subjective_score === "" ? "--" : exercise_users[i].subjective_score,
					efficiencyscore: exercise_users[i].score === null ? "--" : exercise_users[i].score === "" ? "--" : exercise_users[i].score,
					operating: "查看",
					commit_method:exercise_users[i].commit_method,
				})
				noclassroom = exercise_users[i].user_group_name;
			}
			teacherlist = {  //分页
				total: exercise_users.length, //数据总数量
				pageSize: 20,  //一页显示几条
				current: this.state.page,
			}
		}

		this.setState({
			datas: datalist,
			teacherlist: teacherlist,
			noclassroom: noclassroom,
			loadingstate: false,
		})
	}

	TablePagination = (e) => {
		// //console.log(e.current);
		var teacherlist = {  //分页
			total: this.state.exercise_users.length, //数据总数量
			pageSize: 20,  //一页显示几条
			current: e.current,
		}
		this.setState({
			page: e.current,
			teacherlist: teacherlist
		})

	}
	TablePaginations = (e) => {
		// //console.log(e.current);
		var teacherlists = {  //分页
			total: this.state.exercise_users, //数据总数量
			pageSize: 10,  //一页显示几条
			current: e.current,
		}
		this.setState({
			page: e.current,
			teacherlist: teacherlists
		})

	}


	Searchdata = (order, commit_status, review, exercise_group_id, search, page, limit, order_type) => {
		var exercise_id = this.props.match.params.Id;
		// //console.log(731);  //	764 935
		var url = `/exercises/${exercise_id}/exercise_lists.json`;
		var params = {
			order: order,
			commit_status: null,
			review: null,
			exercise_group_id: null,
			search: "",
			page: page,
			limit: limit,
			order_type: order_type,
		}
		axios.get(url, {
			params: params
		}).then((response) => {
			// //console.log(JSON.stringify(response));
			this.setState({
				Teacherliststudentlist: response.data,
				review: response.data.review,
				commit_status: response.data.commit_status,
				exercise_users: response.data.exercise_users,
				current_answer_user: response.data.current_answer_user,
				mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
			})
			if (response.data.exercise_types.subjective === 0) {

				var arr =[];
				for(var i=0;i<this.state.columnstwo.length;i++){
					var item = this.state.columnstwo[i];
					if(item.title==="客观题得分"){
					}
					else if(item.title==="主观题得分"){
					}
					else if(this.props.isNotMember()===true&&item.title==="学号") {

					}
					else{
						arr.push(item);
					}
				}

				var arr2 =[];
				for(var i=0;i<this.state.columns.length;i++){
					var item = this.state.columns[i];
					if(item.title==="客观题得分"){
					}
					else if(item.title==="主观题得分"){
					}
					else if(this.props.isNotMember()===true&&item.title==="学号") {

					}
					else{
						arr2.push(item);
					}
				}
				this.setState({
					columns: arr2,
					columnstwo: arr,
					loadingstate: false,
				})
			}
			this.Generatenewdata(response.data.exercise_users, response.data.current_answer_user,response.data.exercise_types);
		}).catch((error) => {
			//console.log(error)
			this.setState({
				loadingstate: false,
			})
		});
	}

	//////老师页面调用的

	Generatenewdatasy(exercise_users, response) {
		let {page, limit} = this.state;
		var thiss = this;
		let datalist = [];
		var indexi = 0;
		var teacherlist = undefined;
		// //console.log("开始数据了");
		if (exercise_users !== undefined) {
			// //console.log("开始打印数据了");
			for (var i = 0; i < exercise_users.length; i++) {
				if (exercise_users[i].commit_status === 1) {
					datalist.push({
						myid: exercise_users[i].login,
						user_group_id: exercise_users[i].user_group_id,
						number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
						name: exercise_users[i].user_name,
						stduynumber: exercise_users[i].student_id === undefined ? "--" : exercise_users[i].student_id === null ? "--" : exercise_users[i].student_id === "" ? "--" : exercise_users[i].student_id,
						classroom: exercise_users[i].user_group_name,
						submitstate: exercise_users[i].commit_status === 1 ? "已提交" : "未提交",
						updatetime: moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm') === "Invalid date" ? "--" : moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm'),
						completion: exercise_users[i].objective_score === undefined ? "--" : exercise_users[i].objective_score === null ? "--" : exercise_users[i].objective_score === "" ? "--" : exercise_users[i].objective_score,
						levelscore: exercise_users[i].subjective_score === undefined ? "--" : exercise_users[i].subjective_score === null ? "--" : exercise_users[i].subjective_score === "" ? "--" : exercise_users[i].subjective_score,
						efficiencyscore: exercise_users[i].score === undefined ? "--" : exercise_users[i].score === null ? "--" : exercise_users[i].score === "" ? "--" : exercise_users[i].score,
						finalscore: "评阅",
						user_id: exercise_users[i].user_id,
						commit_method:exercise_users[i].commit_method
					})
				} else {
					datalist.push({
						myid: exercise_users[i].login,
						user_group_id: exercise_users[i].user_group_id,
						number: (parseInt(page) - 1) * parseInt(limit) + (i + 1),
						name: exercise_users[i].user_name,
						stduynumber: exercise_users[i].student_id === undefined ? "--" : exercise_users[i].student_id === null ? "--" : exercise_users[i].student_id === "" ? "--" : exercise_users[i].student_id,
						classroom: exercise_users[i].user_group_name,
						submitstate: exercise_users[i].commit_status === 1 ? "已提交" : "未提交",
						updatetime: moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm') === "Invalid date" ? "--" : moment(exercise_users[i].end_at).format('YYYY-MM-DD HH:mm'),
						completion: exercise_users[i].objective_score === undefined ? "--" : exercise_users[i].objective_score === null ? "--" : exercise_users[i].objective_score === "" ? "--" : exercise_users[i].objective_score,
						levelscore: exercise_users[i].subjective_score === undefined ? "--" : exercise_users[i].subjective_score === null ? "--" : exercise_users[i].subjective_score === "" ? "--" : exercise_users[i].subjective_score,
						efficiencyscore: exercise_users[i].score === undefined ? "--" : exercise_users[i].score === null ? "--" : exercise_users[i].score === "" ? "--" : exercise_users[i].score,
						finalscore: "--",
						user_id: exercise_users[i].user_id,
						commit_method:exercise_users[i].commit_method
					})
					indexi++;
				}

			}
			// teacherlist = {  //分页
			// 	total: exercise_users.length, //数据总数量
			// 	pageSize: 20,  //一页显示几条
			// 	current: this.state.page,
			// }
		}

		if (response.data.exercise_types.subjective === 0) {
			//===0 不包括主观题
			if (indexi === exercise_users.length) {
				//都没评论 不显示评论
				if (response.data.exercise_types.groups_count > 0) {
					// //console.log("77771111111");
					//分班大于0显示分班
					//7ge
					// this.state.columnsys.map((item,key)=>{
					//
					// })
					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(item.title==="客观题得分"){
						}
						else if(item.title==="主观题得分"){
						}
						else if(this.props.isNotMember()===true&&item.title==="学号") {

						}
						else{
							arr.push(item);
						}
					}

					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						loadingstate: false,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
						columnsys: arr,
					})
				} else {
					//分班小于0不显示分班
					//6ge

					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(item.title==="分班"){
						}
						else if(item.title==="客观题得分"){
						}
						else if(item.title==="主观题得分"){
						}
						else if(this.props.isNotMember()===true&&item.title==="学号") {
						}
						else{
							arr.push(item);
						}
					}

					thiss.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						loadingstate: false,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
						columnsys: arr,
					})
				}

			} else {
				//已经评论
				// response.data.course_groups.length
				if (response.data.exercise_types.groups_count > 0) {
					//显示分班
					//8ge

					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(item.title==="客观题得分"){
						}
						else if(item.title==="主观题得分"){
						}
						else if(this.props.isNotMember()===true&&item.title==="学号") {

						}else{
							arr.push(item);
						}
					}
					// //console.log(thiss.state.columnsys);
					// //console.log(arr);

					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						loadingstate: false,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
						columnsys:	arr,
					})
				} else {
					//不显示分班
					//7ge
					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(item.title==="分班"){
						}
						else if(item.title==="客观题得分"){
						}
						else if(item.title==="主观题得分"){
						}
						else if(this.props.isNotMember()===true&&item.title==="学号") {

						}else{
							arr.push(item);
						}
					}


					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						loadingstate: false,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
						columnsys: arr,
					})
				}

			}

		} else {
			//包括主观题
			if (indexi === exercise_users.length) {
				//console.log("2548包含主观题不包含分班");

				if (response.data.exercise_types.groups_count > 0) {
					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(this.props.isNotMember()===true&&item.title==="学号") {

						}
						else{
							arr.push(item);
						}
					}
					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						columnsys: arr,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
					})
				} else {
					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(item.title==="分班"){

						}
						else if(this.props.isNotMember()===true&&item.title==="学号") {

						}
						else{
							arr.push(item);
						}
					}
					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						columnsys:arr,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
					})
				}
			} else {
				// //console.log("2699包含主观题包含分班");
				if (response.data.exercise_types.groups_count > 0) {
					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						loadingstate: false,
						columnsys: this.state.columnsystwo,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score,
					})
				} else {
					var arr =[];
					for(var i=0;i<this.state.columnsys.length;i++){
						var item = this.state.columnsys[i];
						if(item.title==="分班"){

						}
						else if(this.props.isNotMember()===true&&item.title==="学号") {

						}
						else{
							arr.push(item);
						}
					}
					this.setState({
						data: datalist,
						teacherlist: teacherlist,
						Teacherliststudentlist: response.data,
						review: response.data.review,
						commit_status: response.data.commit_status,
						exercise_users: response.data.exercise_users,
						course_groups: response.data.course_groups,
						mylistansum:response.data.exercise_types.answer_users+response.data.exercise_types.unanswer_users,
						loadingstate: false,
						columnsys: arr,
						subjective: response.data.exercise_types.subjective,
						objective_score: response.data.exercise_types.objective_score,
						subjective_score: response.data.exercise_types.subjective_score

					})
				}

			}
		}
		this.setState({
			loadingstate: false
		})
	}


	TablePaginationsy = (e) => {
		// //console.log(e.current);
		var teacherlist = {  //分页
			total: this.state.exercise_users.length, //数据总数量
			pageSize: 20,  //一页显示几条
			current: e.current,
		}
		this.setState({
			page: e.current,
			teacherlist: teacherlist
		})

	}
	Searchdatasys = (order, commit_status, review, exercise_group_id, search, page, limit, order_type) => {
		var exercise_id = this.props.match.params.Id;
		var url = `/exercises/${exercise_id}/exercise_lists.json`;
		axios.get((url), {
			params: {
				order: order,
				commit_status: commit_status,
				review: review,
				exercise_group_id: exercise_group_id,
				search: search,
				page: page,
				limit: limit,
				order_type: order_type
			}
		}).then((response) => {
			// //console.log("528");
			// //console.log(JSON.stringify(response));
			if(response===undefined){
				return
			}
			this.setState({
				loadingstate: false,
			})
			// //console.log(response);
			// //console.log(1997);
			this.Generatenewdatasy(response.data.exercise_users, response);
		}).catch((error) => {
			// //console.log(error)
			this.setState({
				loadingstate: false,
			})
		});
	}

	notlimited = () => {
		if (this.state.loadingstate === false) {
			this.setState({
				unlimited: 0,
				course_groupyslsthree: undefined,
				loadingstate: true,
				page:1
			})
		} else {
			this.setState({
				unlimited: 0,
				course_groupyslsthree: undefined,
				page:1,
			})
		}
		this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, null, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
	}
	// notlimiteds = () => {
	//     this.setState({
	//         unlimiteds: 0,
	//         commit_status: null,
	//         submitted: false,
	//         unsubmitted: false
	//     })
	//     this.Searchdatasys(this.state.order, null, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, null, null);
	// }
	notlimiteds = () => {
		if (this.state.loadingstate === false) {
			this.setState({
				unlimiteds: 0,
				course_groupyslstwo: undefined,
				loadingstate: true,
				page:1,
			})
		} else {
			this.setState({
				unlimiteds: 0,
				course_groupyslstwo: undefined,
				page:1,
			})
		}

		this.Searchdatasys(this.state.order, undefined, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
	}
	checkeboxstwo = (checkedValues, data) => {
		// //console.log(checkedValues)
		if (JSON.stringify(checkedValues) === "[]") {
			// //console.log(checkedValues);
			if (this.state.loadingstate === false) {
				this.setState({
					loadingstate: true,
					course_groupyslstwo: undefined,
					unlimiteds: 0,
					page:1
				})
			} else {
				this.setState({
					course_groupyslstwo: undefined,
					unlimiteds: 0,
					page:1,
				})
			}

			this.Searchdatasys(this.state.order, checkedValues, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
		}
		// else if (checkedValues.length === data.length) {
		// 	if (this.state.loadingstate === false) {
		// 		this.setState({
		// 			loadingstate: true,
		// 			course_groupyslstwo: undefined,
		// 			unlimiteds: 0,
		// 			page:1
		// 		})
		// 	}
		//
		// 	else {
		// 		this.setState({
		// 			course_groupyslstwo: undefined,
		// 			unlimiteds: 0,
		// 			page:1,
		// 		})
		// 	}
		//
		// 	this.Searchdatasys(this.state.order, checkedValues, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
		// }
		else {
			// //console.log(checkedValues);
			this.Searchdatasys(this.state.order, checkedValues, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
			if (this.state.loadingstate === false) {
				this.setState({
					loadingstate: true,
					course_groupyslstwo: checkedValues,
					unlimiteds: 1,
					page:1,
				})
			} else {
				this.setState({
					course_groupyslstwo: checkedValues,
					unlimiteds: 1,
					page:1,
				})
			}

		}

	}

	notlimitedst = () => {
		// //console.log();
		// var datas=this.state.course_groups;
		// for(var ik=0;ik<datas.length;ik++){
		//     datas[ik].exercise_group_id=undefined;
		// }
		this.setState({
			course_groups: null,
			unlimitedtwo: 0
		})
		this.Searchdatasys(this.state.order, this.state.commit_status, this.state.review, undefined, this.state.searchtext, null, null, this.state.order_type)

	}
	checkeboxs = (checkedValues, data) => {
		// if(JSON.stringify(v)==="[]"){
		//     this.setState({
		//         review:undefined
		//     })
		//    return
		// }


		if (JSON.stringify(checkedValues) === "[]") {
			// //console.log(checkedValues);
			if (this.state.loadingstate === false) {
				this.setState({
					unlimited: 0,
					course_groupyslsthree: undefined,
					loadingstate: true,
					page:1
				})
			} else {
				this.setState({
					unlimited: 0,
					course_groupyslsthree: undefined,
					page:1
				})
			}

			this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, checkedValues, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
		}
		// else if (checkedValues.length === data.length) {
		// 	if (this.state.loadingstate === false) {
		// 		this.setState({
		// 			unlimited: 0,
		// 			course_groupyslsthree: undefined,
		// 			loadingstate: true,
		// 			page:1
		// 		})
		// 	} else {
		// 		this.setState({
		// 			unlimited: 0,
		// 			course_groupyslsthree: undefined,
		// 			page:1
		// 		})
		// 	}
		//
		// 	this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, checkedValues, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
		// }
		else {
			// //console.log(checkedValues);
			if (this.state.loadingstate === false) {
				this.setState({
					unlimited: 1,
					loadingstate: true,
					course_groupyslsthree: checkedValues,
					page:1
				})
			} else {
				this.setState({
					unlimited: 1,
					course_groupyslsthree: checkedValues,
					page:1
				})
			}

			this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, checkedValues, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);

		}
	}
	funtaskstatustwos = () => {

		if (this.state.loadingstate === false) {
			this.setState({
				unlimitedtwo: 0,
				checkedValuesineinfo: undefined,
				course_groupysls: undefined,
				loadingstate: true,
				page:1,
			})
		} else {
			this.setState({
				unlimitedtwo: 0,
				checkedValuesineinfo: undefined,
				course_groupysls: undefined,
				page:1,
			})
		}

		this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, undefined, this.state.searchtext, 1, this.state.limit, this.state.order_type)
	}

	funtaskstatustwo = (checkedValues, data) => {
		// //console.log(checkedValues);
		if (JSON.stringify(checkedValues) === "[]") {
			// //console.log(checkedValues);
			if (this.state.loadingstate === false) {
				this.setState({
					course_groupysls: undefined,
					unlimitedtwo: 0,
					loadingstate: true,
					page:1,
				})
			} else {
				this.setState({
					course_groupysls: undefined,
					unlimitedtwo: 0,
					page:1,
				})
			}

			this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, checkedValues, this.state.searchtext, 1, this.state.limit, this.state.order_type)
		}
		// else if (checkedValues.length === data.length) {
		// 	if (this.state.loadingstate === false) {
		// 		this.setState({
		// 			course_groupysls: undefined,
		// 			unlimitedtwo: 0,
		// 			loadingstate: true,
		// 			page:1,
		// 		})
		// 	} else {
		// 		this.setState({
		// 			course_groupysls: undefined,
		// 			unlimitedtwo: 0,
		// 			page:1,
		// 		})
		// 	}
		//
		// 	this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, checkedValues, this.state.searchtext, 1, this.state.limit, this.state.order_type)
		// }
		else {
			// //console.log(checkedValues);
			if (this.state.loadingstate === false) {
				this.setState({
					checkedValuesineinfo: checkedValues,
					course_groupysls: checkedValues,
					unlimitedtwo: 1,
					loadingstate: true,
					page:1
				})
			} else {
				this.setState({
					checkedValuesineinfo: checkedValues,
					course_groupysls: checkedValues,
					unlimitedtwo: 1,
					page:1
				})

			}

			this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, checkedValues, this.state.searchtext, 1, this.state.limit, this.state.order_type)
			this.props.setcourse_groupysls(checkedValues)
		}

	}
	// 输入关键字后按回车，自动提交
	onSearchKeywordKeyUp = (e) => {
		if (e.keyCode === 13) {
			// this.onSearch();
			// //console.log("使用了回车键");
			// if(this.state.searchtext === ""){
			//     message.error("请输入姓名或学号搜索");
			//     return
			// }
			if (this.state.loadingstate === false) {
				this.setState({
					loadingstate: true,
					page:1
				})
			}

			this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, 1, this.state.limit, this.state.order_type);
		}
	};
	//搜索学生按钮输入 老师
	searchValues = (value) => {
		//点击直接搜索
		//    if(value === ""){
		//        message.error("请输入姓名或学号搜索");
		//        return
		//    }
		if (this.state.loadingstate === false) {
			this.setState({
				loadingstate: true,
				page:1,
			})
		}

		this.Searchdatasys(this.state.order, this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, value, 1, this.state.limit, this.state.order_type);
		// this.Startsorting(this.state.order,this.state.checkedValuesine,this.state.checkedValuesineinfo,value);
		// //console.log(value)


	};
	_getRequestParams() {
		const { order, checkedValuesineinfo,course_groupyslstwo ,searchtext, page ,limit,course_groupyslsthree} = this.state
		return {
			page,
			review:course_groupyslsthree,
			commit_status:course_groupyslstwo,
			search:searchtext,
			exercise_group_id:checkedValuesineinfo,
			limit: limit,
			order,
		}
	}

	//搜索学生 文字输入
	inputSearchValues = (e) => {
		// //console.log(e.target.value)
		if (e.target.value === "") {
			this.setState({
				searchtext: undefined,
			})
		} else {
			this.setState({
				searchtext: e.target.value,
			})
		}

	};


	//老师试卷table 列表塞选数据
	table1handleChange = (pagination, filters, sorter) => {
		//"ascend" 升序
		//"descend" 降序
		if (JSON.stringify(sorter) === "{}") {
			//没有选择
		} else {
			try {
				//时间排序
				if (sorter.columnKey === "updatetime") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order: "end_at",
							loadingstate: true,
							order_type: "asc"
						})
						this.Searchdatasys("end_at", this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order: "end_at",
							loadingstate: true,
							order_type: "desc"
						})
						this.Searchdatasys("end_at", this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "desc");
					}
				}
			} catch (e) {

			}

			try {
				//学生学号排序
				if (sorter.columnKey === "stduynumber") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order: "student_id",
							loadingstate: true,
							order_type: "asc"
						})
						this.Searchdatasys("student_id", this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "asc");

					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order: "student_id",
							loadingstate: true,
							order_type: "desc"
						})
						this.Searchdatasys("student_id", this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "desc");

					}
				}
			} catch (e) {

			}

			try {
				//成绩排序排序
				if (sorter.columnKey === "efficiencyscore") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order: "score",
							loadingstate: true,
							order_type: "asc"
						})
						this.Searchdatasys("score", this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "asc");

					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order: "score",
							loadingstate: true,
							order_type: "desc"
						})
						this.Searchdatasys("score", this.state.course_groupyslstwo, this.state.review, this.state.checkedValuesineinfo, this.state.searchtext, this.state.page, this.state.limit, "desc");

					}
				}
			} catch (e) {

			}

		}
	}

	//学生问卷table 列表塞选数据
	table1handleChangestuden = (pagination, filters, sorter) => {
		if (JSON.stringify(sorter) === "{}") {
			//没有选择
		} else {
			try {
				//时间排序
				if (sorter.columnKey === "updatetime") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order: "end_at",
							loadingstate: true,
							order_type: "asc"
						})
						this.Searchdata("end_at", null, null, null, null, this.state.page, this.state.limit, "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order: "end_at",
							loadingstate: true,
							order_type: "desc"
						})
						this.Searchdata("end_at", null, null, null, null, this.state.page, this.state.limit, "desc");
					}
				}
			} catch (e) {

			}

			try {
				//学生学号排序
				if (sorter.columnKey === "stduynumber") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order: "student_id",
							loadingstate: true,
							order_type: "asc"
						})
						this.Searchdata("student_id", null, null, null, null, this.state.page, this.state.limit, "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order: "student_id",
							loadingstate: true,
							order_type: "desc"
						})
						this.Searchdata("student_id", null, null, null, null, this.state.page, this.state.limit, "desc");
					}
				}
			} catch (e) {

			}

			try {
				//成绩排序排序
				if (sorter.columnKey === "efficiencyscore") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order: "score",
							loadingstate: true,
							order_type: "asc"
						})
						this.Searchdata("score", null, null, null, null, this.state.page, this.state.limit, "asc");

					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order: "score",
							loadingstate: true,
							order_type: "desc"
						})
						this.Searchdata("score", null, null, null, null, this.state.page, this.state.limit, "desc");
					}
				}
			} catch (e) {

			}
		}
	}
	setExerciseReviewAndAnswer = () => {

	}
	// 调分
	Adjustment = (e) => {
		console.log("Adjustment");
		console.log(e);
		this.setState({
			testpapergradingboll: true,
			exeuserid: e,
		})

	}
	//调分窗
	Adjustments = () => {
		//弹出弹框
		this.setState({
			testpapergradingboll: false
		})

	}

	//试卷调分
	Testpapergrading = (v, n) => {
		// debugger
		var exercise_id = this.props.match.params.Id;
		let url = `/exercises/${exercise_id}/adjust_score.json`;
		axios.post(url, {
				user_id: this.state.exeuserid,
				subjective_score: v,
				objective_score: n,
			})
			.then((response) => {
				if (response.data.status == '0') {
					this.setState({testpapergradingboll: false});
					this.props.showNotification('调分成功');
					this.Teacherliststudentlist();
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({testpapergradingboll: false})
			});


	}



	render() {
		const isAdmin = this.props.isAdmin();

		let {data, datas, page, columns, course_groupyslsthree, columnstwo, styletable, exercise_status, course_groupyslstwodatas, limit, course_groupysls, course_groupyslstwodata, course_groupyslstwo, teacherlists, Teacherliststudentlist, order, columnss, course_groupsdatas, course_groups, Evaluationarray, unlimited, unlimiteds, unlimitedtwo, teacherlist, searchtext, loadingstate, review, nocomment, commented, unsubmitted, submitted, columnsys, exercise_users, mylistansum, testpapergradingboll} = this.state;
		// //console.log("Studentshavecompletedthelist");
		// //console.log(this.props.current_status);
		// //console.log("获取到的数据");
		// //console.log(datas);
		// //console.log(data);
		// //console.log("this.props.Commonheadofthetestpaper.exercise_status");
		// //console.log(this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status);
		// //console.log(exercise_status);
		console.log("Studentshavecompletedthelis123123t");
		console.log(columnss);
		return (
			isAdmin === true ?
				(
					<div style={{
						"margin": "0 auto",
						minWidth: " 1200px",
					}}>
						{/*老师*/}
						{
							this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status===0 || this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status===1 ?
								<div className="edu-back-white">
									<NoneData></NoneData>
								</div>
								:
								<div>
									{/*{testpapergradingboll === true ? <ModulationModal*/}
									{/*	visible={testpapergradingboll}*/}
									{/*	Cancel={() => this.Adjustments()}*/}
									{/*	Saves={(value, num) => this.Testpapergrading(value, num)}*/}
									{/*/> : ""}*/}
									{
										testpapergradingboll === true ? <ModulationModal_exercise
											{...this.props}
											{...this.state}
											visible={testpapergradingboll}
											Cancel={() => this.Adjustments()}
											Saves={(value, num) => this.Testpapergrading(value, num)}
										/> : ""
									}
									<div className="edu-back-white" >
										<ul className="clearfix" style={{padding: '10px 30px 10px 30px'}}>

											{/*你的评阅：*/}
											{
												Teacherliststudentlist === undefined || Teacherliststudentlist.exercise_types.subjective === 0 ?
													<li className="clearfix mt10">
														<span className="fl  mr10 color-grey-8 ">作品状态：</span>
														<span className="fl "><a id="graduation_comment_no_limit"
																										 className={unlimiteds === 0 ? "pl10 pr10 mr20 check_on" : "pl10 pr10 mr20 "}
																										 onClick={() => this.notlimiteds()}>全部</a></span>
														<CheckboxGroup value={course_groupyslstwo}
																					 onChange={(e) => this.checkeboxstwo(e, course_groupyslstwodata && course_groupyslstwodata)}>
															{
																course_groupyslstwodata.map((item, key) => {
																	return (
																		<span key={key}><Checkbox className="fl mt5"
																															key={item.id}
																															value={item.id}>{item.tu}<span>({Teacherliststudentlist === undefined ? "0" : key === 0 ? Teacherliststudentlist.exercise_types.unanswer_users : Teacherliststudentlist.exercise_types.answer_users})</span></Checkbox></span>
																	)
																})
															}
														</CheckboxGroup>
														<div className="fr search-new" style={{marginBottom: '1px'}}>
															<Search
																placeholder="请输入姓名或学号搜索"
																id="subject_search_input"
																autoComplete="off"
																value={searchtext}
																onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
																onInput={this.inputSearchValues}
																onSearch={this.searchValues}
															></Search>
														</div>
													</li>
													:
													<div>
														<li className="clearfix  mt10">
															<span className="fl  mr10 color-grey-8 ">你的评阅：</span>
															<span className="fl "><a id="graduation_comment_no_limit"
																											 className={unlimited === 0 ? "pl10 pr10 mr20 check_on" : "pl10 pr10 mr20 "}
																											 onClick={() => this.notlimited()}>全部</a></span>

															<CheckboxGroup value={course_groupyslsthree}
																						 onChange={(e) => this.checkeboxs(e, course_groupyslstwodata && course_groupyslstwodata)}>
																{
																	course_groupyslstwodatas.map((item, key) => {
																		return (
																			<span key={key}><Checkbox className="fl mt5"
																																key={item.id}
																																value={item.id}>{item.tu}<span>({Teacherliststudentlist === undefined ? "0" : key === 0 ? Teacherliststudentlist.exercise_types.unreview_counts : Teacherliststudentlist.exercise_types.review_counts})</span></Checkbox></span>
																		)
																	})
																}
															</CheckboxGroup>
															<div className="fr search-new" style={{marginBottom: '1px'}}>
																<Search
																	placeholder="请输入姓名或学号搜索"
																	id="subject_search_input"
																	autoComplete="off"
																	value={searchtext}
																	onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
																	onInput={this.inputSearchValues}
																	onSearch={this.searchValues}
																></Search>
															</div>
														</li>
														{/*作品状态*/}
														<li className="clearfix mt10">
															<span className="fl  mr10 color-grey-8 ">作品状态：</span>
															<span className="fl "><a id="graduation_comment_no_limit"
																											 className={unlimiteds === 0 ? "pl10 pr10 mr20 check_on" : "pl10 pr10 mr20 "}
																											 onClick={() => this.notlimiteds()}>全部</a></span>
															<CheckboxGroup value={course_groupyslstwo}
																						 onChange={(e) => this.checkeboxstwo(e, course_groupyslstwodata && course_groupyslstwodata)}>
																{
																	course_groupyslstwodata.map((item, key) => {
																		return (
																			<span key={key}><Checkbox className="fl mt5"
																																key={item.id}
																																value={item.id}>{item.tu}<span>({Teacherliststudentlist === undefined ? "0" : key === 0 ? Teacherliststudentlist.exercise_types.unanswer_users : Teacherliststudentlist.exercise_types.answer_users})</span></Checkbox></span>
																		)
																	})
																}
															</CheckboxGroup>
														</li>
													</div>

											}
											{/*分班情况*/}
											{course_groups === undefined ? "" : course_groups === null ? "" : course_groups.length < 2 ? "" : JSON.stringify(course_groups) === "[]" ? "" :
												<li className="clearfix  mt10">
													<tr>
														<td className="w80" style={{verticalAlign: "top"}}><span
															className=" mr10 color-grey-8 ">分班情况：</span></td>
														<td className="w70" style={{verticalAlign: "top"}}><span><a
															id="graduation_comment_no_limit"
															className={unlimitedtwo === 0 ? "pl10 pr10 mr20 check_on" : "pl10 pr10 mr20 "}
															onClick={() => this.funtaskstatustwos()}>全部</a></span>
														</td>
														<td>
															<CheckboxGroup value={course_groupysls}
																						 onChange={(e) => this.funtaskstatustwo(e, course_groups && course_groups)}
																						 style={{paddingTop: '4px', display: "inline"}}>
																{
																	course_groups.map((item, key) => {
																		return (
																			<span key={key}><Checkbox className="fl mt5"
																																key={item.exercise_group_id}
																																value={item.exercise_group_id}>{item.exercise_group_name}<span>({item.exercise_group_students})</span></Checkbox></span>
																		)
																	})
																}
															</CheckboxGroup>


														</td>
													</tr>

												</li>
											}

										</ul>


										<div id="graduation_work_list" style={{padding: '0px 30px 10px 30px'}}>
											<div className="clearfix">
                                <span
																	className="fl color-grey-6 font-12"><span
																	style={{color: '#FF6800'}}>{Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.total_users}</span><span
																	className="color-orange-tip"></span>个检索结果（{Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.exercise_all_users}学生） </span>


											</div>
										</div>

										{JSON.stringify(data) !== "[]" ?
											<div className={"justify break_full_word new_li edu-back-white"}
													 style={{minHeight: "480px"}}>
												<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																			top: 72%;}
						                }
						                 .ysltableows2 .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
															.mysjysltable1 .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
						              `}</style>
												<div className="edu-table  edu-back-white ysltableows2">
													{data === undefined ? "" : <Table
														dataSource={data}
														columns={columnsys}
														className="mysjysltable1"
														pagination={false}
														onChange={this.table1handleChange}
														loading={loadingstate}
														// onChange={this.TablePaginationsy}
													/>}
												</div>
											</div>

											:
											<div id="forum_list" className="forum_table">
												<div className="minH-560 edu-back-white">
													<div className="edu-tab-con-box clearfix edu-txt-center">
														<img className="edu-nodata-img mb20"
																 src={getImageUrl("images/educoder/nodata.png")}/>
														<p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>
													</div>
												</div>

											</div>
										}


									</div>
									{
										Teacherliststudentlist && Teacherliststudentlist.exercise_types.total_users && Teacherliststudentlist.exercise_types.total_users > limit ?
											<div className="edu-txt-center mt30 mb50">
												<Pagination showQuickJumper current={page} onChange={this.paginationonChange}
																		pageSize={limit}
																		total={Teacherliststudentlist.exercise_types.total_users}></Pagination>
											</div>
											: ""
									}
								</div>
						}

					</div>

				)
				:
				(
					// 学生只能看自己的
					Teacherliststudentlist === undefined || Teacherliststudentlist.current_answer_user === undefined || Teacherliststudentlist.current_answer_user === null ?
						<div>
							<div className=" clearfix "
									 style={{"margin": "0 auto", "padding-bottom": "100px", minWidth: " 1200px"}}>
								{
									this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status === 0 || this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status === 1 ?
										<div className="edu-back-white">
											<NoneData></NoneData>
										</div>
										:
										<div className={"educontent mb20"}>

											<div className="edu-back-white" id="graduation_work_list"
													 style={{
														 padding: '0px 30px 10px 30px',
														 "height": "50px",
														 "margin-bottom": "10px"
													 }}>

												<div className="clearfix ">
                              <span className="fl color-grey-6 font-12 mt10">
                                  <span className="color-orange-tip"
																				style={{color: '#FF6800'}}>{Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.answer_users}</span><span
																style={{color: "#666666"}}>已交</span>
                                  <span
																		className="ml10"></span><span
																style={{color: "#666666"}}> {Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.unanswer_users}未交</span>
																{Teacherliststudentlist && Teacherliststudentlist.exercise_types.exercise_end_time === "--" ? "" :
																	<span className="ml20" style={{color: "#9A9A9A"}}>     剩余提交时间：</span>}
																{Teacherliststudentlist && Teacherliststudentlist.exercise_types.exercise_end_time === "--" ? "" :
																	<span style={{color: '#FF6800'}}>
																		{Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.exercise_end_time}
																	</span>}
                               </span>

												</div>

											</div>


											{JSON.stringify(datas) === "[]" ?
												<div id="forum_list" className="forum_table">
													<div className="mh650 edu-back-white">
														<div className="edu-tab-con-box clearfix edu-txt-center">
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
																			top: 72%;}
						                }
						                 .ysltableows2  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
															.mysjysltable2 .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
						              `}</style>
													<div className="edu-table edu-back-white minH-560 ysltableows2">
														{datas === undefined ? "" : <Table
															dataSource={datas}
															columns={columnss}
															className="mysjysltable2"
															pagination={false}
															loading={false}
														/>}
													</div>
												</div>
											}


										</div>
								}

							</div>
						</div>
						:
						// 学生能看别人的
						<div>
							<div className="clearfix" style={{
								"margin": "0 auto",
								"padding-bottom": "100px",
								minWidth: " 1200px"
							}}>
								{
									this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status === 0 || this.props.Commonheadofthetestpaper&&this.props.Commonheadofthetestpaper.exercise_status === 1 ?
										<div className="edu-back-white">
											<NoneData></NoneData>
										</div>
										:
										<div>
											<div className={"educontent mb20 edu-back-white"}>
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
													 .ysltableows  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
														.mysjysltable3  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
												`
													}
												</style>
												<div className={"justify break_full_word new_li edu-back-white ysltableows"}
												>
													{data === undefined ? "" : <Table
														dataSource={data}
														columns={columnstwo}
														className="mysjysltable3 "
														pagination={false}
														loading={false}
														showHeader={false}
													/>}
												</div>
												{JSON.stringify(datas) === "[]" ?

													<div id="forum_list" className="forum_table ">
														<div className="mh650 edu-back-white">
															<div className="edu-tab-con-box clearfix edu-txt-center">
																<img className="edu-nodata-img mb20"
																		 src={getImageUrl("images/educoder/nodata.png")}/>
																<p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>
															</div>
														</div>

													</div>
													:
													<div className="edu-back-white">
														< div id="graduation_work_list" style={{
															padding: '0px 30px 10px 30px',
															"margin-top": "20px",
															"margin-bottom": "10px"
														}}>

															<div className="clearfix">
                              <span className="fl color-grey-6 font-12"><span
																className="color-orange-tip"
																style={{color: '#FF6800'}}>{Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.answer_users}</span><span
																style={{color: "#666666"}}>已交</span><span
																className="ml10"></span> <span
																style={{color: "#666666"}}>{Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.unanswer_users}未交</span>
																{Teacherliststudentlist && Teacherliststudentlist.exercise_types.exercise_end_time === "--" ? "" :
																	<span className="ml20" style={{color: "#9A9A9A"}}> 剩余提交时间：</span>}
																{Teacherliststudentlist && Teacherliststudentlist.exercise_types.exercise_end_time === "--" ? "" :
																	<span
																		style={{color: '#FF6800'}}> {Teacherliststudentlist === undefined ? "0" : Teacherliststudentlist.exercise_types.exercise_end_time}</span>}
																	</span>


															</div>

														</div>
														<div className={"justify break_full_word new_li edu-back-white"}
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
						                			.ysltableowss .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														 	.ysltableowss .ant-table-tbody > tr > td{
																 	height: 58px;
														 }
														 .ysltableowss .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
															.mysjysltable4 .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
						              `}</style>
															<div className="edu-table edu-back-white minH-560 ysltableowss">
																{datas === undefined ? "" : <Table
																	dataSource={datas}
																	columns={columns}
																	pagination={false}
																	className="mysjysltable4"
																	onChange={this.table1handleChangestuden}
																	loading={loadingstate}
																/>}</div>
														</div>


													</div>

												}
											</div>

											{
												mylistansum && mylistansum > limit ?
													<div className="edu-txt-center mt30 mb20">
														<Pagination showQuickJumper current={page}
																				onChange={this.paginationonChanges} pageSize={limit}
																				total={mylistansum}></Pagination>
													</div>
													: ""
											}
										</div>
								}
							</div>

						</div>

				)

		)


	}

}

// subjective 主要是用于判断答题列表页是否存在 主观题 一栏的
// 客观题没有判断。当主观题存在时，就会有客观题出现，否则只有总成绩
// 当subjective 等于1时，就出现3列，客观题，主观题，最终成绩。当subjective等于0时，你就只出现最终成绩一列就行了
export default Studentshavecompletedthelist;
