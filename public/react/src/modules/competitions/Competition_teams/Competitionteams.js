import React, { Component } from 'react';
import { Breadcrumb,Layout,Table, Divider, Tag,Badge,Tooltip} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';


import './Competitionteams.css';
const { Content } = Layout;

class Competitionteams extends Component{
	constructor(props) {
		super(props)
		this.state={
	    shixundata: undefined,
			coursedata:undefined,
		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		if(this.props.match.params.identifier!=null){
			let url=`/competitions/${this.props.match.params.identifier}/common_header.json`;
			axios.get(url).then((response) => {
				if(response.status===200){
					this.setState({
						data:response.data,
					})
				}
			}).catch((error) => {
				console.log(error)
			})
		}

		this.getshixundata();
		this.getcoursedata();
	}

	getshixundata=()=>{

		const Url =`/competitions/${this.props.match.params.identifier}/competition_teams/${this.props.match.params.competition_team_id}/shixun_detail.json`;
		axios.get(Url).then((response) => {
				if(response.status===200){
					// let data={
					// 	shixuns: [
					// 		{
					// 			creator: "黄井泉",  // 创建者
					// 			shixun_name: "单链表的学习与应用（I）", // 实训名称
					// 			shixun_identifier: "mnf6b7z3",
					// 			forked: false,  // false:原创
					// 			myshixuns_count: 179, // 学习人数
					// 			forked_myshixun_count: 0, // 被fork发布的学习人数
					// 			valid_count: 82, // 有效作品数
					// 			score: 1320 // 应用值
					// 		}
					// 	],
					// 	shixun_count: 1, // 实训总计
					// 	total_myshixun_count: 179, // 学习人数总计
					// 	total_forked_myshixun_count: 0,  // 被fork发布的学习人数总计
					// 	total_valid_count: 82, // 有效作品数总计
					// 	total_shixun_score: 1320 // 应用值总计
					// }
					let data=response.data;

					let newarr=data.shixuns;

					let newobj={
						creator:"合计:",
						shixun_name:data.shixun_count,
						myshixuns_count:data.total_myshixun_count,
						forked_myshixun_count:data.total_forked_myshixun_count,
						valid_count:data.total_valid_count,
						score:data.total_shixun_score
					}
					newarr.push(newobj)

					this.setState({
						shixundata:newarr
					})


				}
			})
			.catch(function (error) {
				console.log(error);
			});




	}

	getcoursedata=()=>{
		const Url =`/competitions/${this.props.match.params.identifier}/competition_teams/${this.props.match.params.competition_team_id}/course_detail.json`;

		axios.get(Url).then((response) => {
				if(response.status===200){
					// let data={
					// 	courses: [
					// 		{
					// 			creator: "周海芳",  // 创建者
					// 			creator_login: "Nancy", // login
					// 			course_name: "大学计算机基础2018年秋季",
					// 			course_id: 1502,
					// 			students_count: 122, // 学生数量
					// 			shixun_homework_count: 8, // 发布的实训作业数量
					// 			valid_count: 977, // 有效作品数
					// 			score: 29810 // 应用值
					// 		}
					// 	],
					// 	total_course_count: 1, // 课堂总计
					// 	total_students_count: 122,  // 学生数总计
					// 	total_shixun_homework_count: 8,  // 实训作业数总计
					// 	total_valid_count: 977, // 有效作品数总计
					// 	total_course_score: 29810  // 应用值总计
					// }

					let data=response.data;

					let newarr=data.courses;

					let newobj={
						creator:"合计:",
						course_name:data.total_course_count,
						students_count:data.total_students_count,
						shixun_homework_count:data.total_shixun_homework_count,
						valid_count:data.total_valid_count,
						score:data.total_course_score
					}
					newarr.push(newobj)

					this.setState({
						coursedata:newarr
					})

				}
			})
			.catch(function (error) {
				console.log(error);
			});


	}

	render() {
    let {data}=this.state;
		const shixuncolumns = [
			{
				title: '创建者',
				dataIndex: 'creator',
				key: 'creator',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoutheji":""}>{text}</div>,
			},
			{
				title: '名称',
				dataIndex: 'shixun_name',
				key: 'shixun_name',
				render: (text, record) =>
					<div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}{record.forked===true?<Badge count={"原创"} style={{ backgroundColor: '#459BE5' }} />:""}</div>,
			},
			{
				title: '学习人数',
				dataIndex: 'myshixuns_count',
				key: 'myshixuns_count',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>,
			},
			{
				title: '被fork发布的学习人数',
				dataIndex: 'forked_myshixun_count',
				key: 'forked_myshixun_count',
				render: (text, record) =>
					<Tooltip placement="bottom" title={"fork该实训产生的新实训，学习总人数"}>
						<div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>
					</Tooltip>,
			},
			{
				title: '有效作品数',
				dataIndex: 'valid_count',
				key: 'valid_count',
				render: (text, record) =>
					<Tooltip placement="bottom" title={"至少完成了1个关卡"}>
						<div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>
					</Tooltip>,
			},
			{
				title: '应用值',
				dataIndex: 'score',
				key: 'score',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>,
			},
		];

		const coursecolumns = [
			{
				title: '创建者',
				dataIndex: 'creator',
				key: 'creator',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoutheji":""}>{text}</div>,
			},
			{
				title: '名称',
				dataIndex: 'course_name',
				key: 'course_name',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>,
			},
			{
				title: '学生数量',
				dataIndex: 'students_count',
				key: 'students_count',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>,
			},
			{
				title: '发布的实训作业数量',
				dataIndex: 'shixun_homework_count',
				key: 'shixun_homework_count',
				render: (text, record) =>
						<div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>
					,
			},
			{
				title: '有效作品数',
				dataIndex: 'valid_count',
				key: 'valid_count',
				render: (text, record) =>
					<Tooltip placement="bottom" title={"至少完成了1个关卡"}>
						<div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>
					</Tooltip>,
			},
			{
				title: '应用值',
				dataIndex: 'score',
				key: 'score',
				render: (text, record) => <div className={record.creator==="合计:"?"teamsLayoucolor-orange":""}>{text}</div>,
			},
		];


		// console.log(this.state.shixundata)
		return (

				<div className={"educontent clearfix mt20 "}>
					<Breadcrumb separator=">">
						<Breadcrumb.Item><Link to={"/competitions"}>{data&&data.name}</Link></Breadcrumb.Item>
						<Breadcrumb.Item><Link to={`/competitions/${this.props.match.params.identifier}/enroll`}>报名</Link></Breadcrumb.Item>
						<Breadcrumb.Item>战队详情</Breadcrumb.Item>
					</Breadcrumb>

					<Layout className={"teamsLayout"}>

						<Content className={"teamsLayoutitle"}>实训项目</Content>
						<Content className={"teamsLayoutContent"}>
							<Table className="teamsLayoutTable" columns={shixuncolumns} dataSource={this.state.shixundata} bordered pagination={false}/>
						</Content>
						<Content className={"teamsLayoutitle mt40"}>翻转课堂</Content>
						<Content className={"teamsLayoutContents"}>
							<Table className="teamsLayoutTable" columns={coursecolumns} dataSource={this.state.coursedata} bordered pagination={false}/>
						</Content>

					</Layout>



				</div>

		)
	}
}
export default Competitionteams;
