import React,{ Component } from "react";
import {Table, Pagination,Popover,Spin, Row, Col ,Tabs, Icon} from "antd";
import { WordsBtn,on, off, getRandomcode ,getImageUrl,sortDirections} from 'educoder';
import axios from'axios';
import Dropdownbox from './Dropdownbox';
import Dynamiclist from './Dynamiclist';
import NoneData from "../../courses/coursesPublic/NoneData";
import './Statistics.css';
const qs = require('qs');
const { TabPane } = Tabs;

class Statistics extends Component{
	constructor(props){
		super(props);
		this.state={
			nd1:60,
			nd2:40,
			nd3:20,
			data:undefined,
			bomdata:undefined,
			topisSpin:true,
			bomisSpin:true,
			sort:'desc',
			course_groups:[],
			page:1,
			all_count:null,
			activeKey:'1',
			visible: false,
			group_ids:[],
			course_members:undefined
		}
	}

	componentDidMount() {
    this.getdatas()
	}

	getdatas=()=>{
		let {page,group_ids,sort}=this.state;
		let courseId=this.props.match.params.coursesId;
		let url=`/courses/${courseId}/statistics.json`;
		axios.get(url).then((result) => {
			if (result) {
				this.setState({
					data:result.data.top_scores,
					topisSpin:false
				})
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				topisSpin:false,
			})
		})
		let courseurl=`/courses/${courseId}/all_course_groups.json`;
		axios.get(courseurl).then((result) => {
			if (result) {
				this.setState({
					course_groups:result.data.course_groups
				})
				let list=result.data.course_groups;
				// if(list.length>0){
				// 	this.setState({
				// 		group_ids:[list[0].id],
				// 	})
				// }
				this.getwork_scoredata(page,undefined,sort);

			}
		}).catch((error) => {
			console.log(error);
		})
	}

	getDynamiclistdatas=(group_ids,key)=>{
		if(key==='2') {
			let courseId = this.props.match.params.coursesId;
			let url = `/courses/${courseId}/act_score.json`;
			let data = {
				group_ids: group_ids,
			}
			axios.get(url, {
				params:
				data
			}).then((result) => {
				if (result) {
					this.setState({
						course_members: result.data.course_members,
						bomisSpin: false
					})
				}
			}).catch((error) => {
				console.log(error);
				this.setState({
					bomisSpin: false,
				})
			})
		}
	}

	getwork_scoredata=(page,group_ids,sort,key)=>{
		this.setState({
			page:page,
			sort:sort,
			group_ids:this.props.isStudent()===true?undefined:group_ids,
			bomisSpin:true,
		})

  if(key==='1'||key===undefined){
		let courseId=this.props.match.params.coursesId;
		let url=`/courses/${courseId}/work_score.json`;
		let data={
			limit:20,
			page:page,
			group_ids:this.props.isStudent()===true?undefined:group_ids,
			sort:sort
		}
		axios.get(url,{params:
			data
		}).then((result) => {
			if (result) {
				this.setState({
					bomdata:result.data.course_members,
					all_count:result.data.all_count,
					bomisSpin:false
				})
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				bomisSpin:false,
			})
		})
	}else{
		this.getDynamiclistdatas(group_ids)
	}

	}


	activeKey=(key)=>{
		if(key==="1"){
			let {page,group_ids,sort}=this.state;
			// this.getdatas()
			this.getwork_scoredata(page,group_ids,sort,key)
		}else if(key==="2"){
			let{group_ids}=this.state;
			this.getDynamiclistdatas(group_ids,key)
		}
     this.setState({
			 activeKey:key
		 })
	 }


	PaginationCourse=(pageNumber)=>{
		let {group_ids,sort}=this.state;

		this.getwork_scoredata(pageNumber,group_ids,sort);
	}

	derivefun=(url)=>{
		let{group_ids}=this.state;
		let list=group_ids;
    let urllist="";
	 if(list!=undefined&&list.length!=0)
			list.map((item,key)=>{
				if(key===0){
					urllist=`group_id[]=${item}`
				}else{
					urllist=urllist+`&group_id[]=${item}`
				}

			})
		this.props.slowDownload(getRandomcode(`${url}?${urllist}`));
	}


	// 筛选
	handleTableChange =(pagination, filters, data)=>{
		let order=data.order;
		let {page,group_ids}=this.state;
		if(order==="descend"){
     this.getwork_scoredata(page,group_ids,'desc')
		}else{
			this.getwork_scoredata(page,group_ids,'asc')
		}

	}

	//计算成绩
	setComputeTimet = (homeworkid) => {
		let url = `/courses/${homeworkid}/calculate_all_shixun_scores.json`;
		try {
			this.props.yslslowCheckresults();
		} catch (e) {

		}
		axios.get(url).then((response) => {
			if (response) {
				if (response.data.status === 0) {
					let{page,group_ids,sort}=this.state;
					setTimeout(() => {
						try {
							this.props.showNotification(`${response.data.message}`);
						} catch (e) {

						}
						try {
							this.props.yslslowCheckresultsNo();
						} catch (e) {

						}
						this.getwork_scoredata(page,group_ids,sort);
					}, 2500);
				}
			}
		}).catch((error) => {
			try {
				this.props.yslslowCheckresultsNo();
			} catch (e) {

			}
			console.log(error)
		});
	};

	render(){
		let {nd1,nd2,nd3,data,bomdata,course_members,activeKey}=this.state;

		const columns = [
			{
				title: this.props.isAdmin()===true?'序号':'排名',
				dataIndex: 'index',
				render: (text, record,index) => {
					return this.props.isAdmin()===true?(this.state.page - 1) * 20 + index + 1:record.rank
				}
			},
			{
				title: '姓名',
				dataIndex:'user_name',
				className: 'maxnamewidth180',
				render: (text, record) => (
					<a title={record.user_name} className="maxnamewidth180">{record.user_name}</a>
				)
			},
			{
				title: '分班',
				dataIndex: 'course_group',
				className: 'maxnamewidth200',
				render: (text, record) => (
					<a title={record.course_group} className="maxnamewidth200">{record.course_group}</a>
				)
			},
			{
				title: '实训作业',
				dataIndex: 'practice_score',
				render: (text, record) => (
		      <span >{record.practice_score.toFixed(2)}</span>
				)
			},
			{
				title: '普通作业',
				dataIndex: 'common_score',
				render: (text, record) => (
					<span >{record.common_score.toFixed(2)}</span>
				)
			},
			{
				title: '分组作业',
				dataIndex: 'group_score',
				render: (text, record) => (
					<span >{record.group_score.toFixed(2)}</span>
				)
			},
			{
				title: '毕设任务',
				dataIndex: 'graduation_score',
				render: (text, record) => (
					<span >{record.graduation_score.toFixed(2)}</span>
				)
			},
			{
				title: '试卷',
				dataIndex: 'exercise_score',
				render: (text, record) => (
					<span >{record.exercise_score}</span>
				)
			},
			{
				title: '总成绩',
				dataIndex: 'total_score',
				sorter: this.props.isAdmin()===true?true:false,
				defaultSortOrder: 'descend',
				sortDirections: sortDirections,
				render: (text, record) => (
					<span >{record.total_score.toFixed(2)}</span>
				)
			},
		];


		let shixun_homeworktype=false;
		let common_homeworktype=false;
		let group_homeworktype=false;
		let graduationtype=false;
		let exercisetype=false;
		let course_grouptype=false;
		if(this.props&&this.props.course_modules!=undefined){
			{this.props&&this.props.course_modules.map((item,key)=>{
				if(item.type==="course_group"){
					course_grouptype=true
				}

				if(item.type==="shixun_homework"){
					shixun_homeworktype=true
				}
				if(item.type==="common_homework"){
					common_homeworktype=true
				}
				if(item.type==="group_homework"){
					group_homeworktype=true
				}		if(item.type==="graduation"){
					graduationtype=true
				}

				if(item.type==="exercise"){
					exercisetype=true
				}

			})}
		}


    if(course_grouptype===false){
			columns.some((item,key)=> {
					if (item.title === "分班") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}

		if(shixun_homeworktype===false){
			columns.some((item,key)=> {
					if (item.title === "实训作业") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}

		if(common_homeworktype===false){
			columns.some((item,key)=> {
					if (item.title === "普通作业") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}

		if(group_homeworktype===false){
			columns.some((item,key)=> {
					if (item.title === "分组作业") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}

		if(graduationtype===false){
			columns.some((item,key)=> {
					if (item.title === "毕设任务") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}

		if(exercisetype===false){
			columns.some((item,key)=> {
					if (item.title === "试卷") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}

		 // console.log("Statistics");
		 // console.log(this.props.user.course_is_end)

     const course_is_endismy=this.props&&this.props.user&&this.props.user.course_is_end;
		 const operations = <React.Fragment>
			{course_grouptype===false||this.state.course_groups.length===0?"":
				this.props.isAdmin()===true?
					<Dropdownbox
						{...this.props}
						{...this.state}
						postwork_scoredata={(group_idss)=>this.getwork_scoredata(1,group_idss,'desc')
						}
					/>
					:""
			}
			{
				this.state.activeKey==="1"?
					(
						course_is_endismy===false?
							<a className={"ml20 ant-btn-link"} onClick={()=>this.setComputeTimet(this.props.match.params.coursesId)}>获取最新成绩</a>
							:
							""
					)
					:""
			}
			{
				this.props.isAdmin()===true?
					<a className={"ml20 ant-btn-link"} onClick={()=>this.derivefun(this.state.activeKey==="1"?`/courses/${this.props.match.params.coursesId}/export_member_scores_excel.xlsx`:`/courses/${this.props.match.params.coursesId}/export_member_act_score.xlsx`)}>导出</a>
					:""
			}
		</React.Fragment>;

		const content = (
			<div className={"Statisticscircle"}>
				<p>
					课堂总成绩 * 70 %
				</p>
				<p>
					课堂活跃度 * 10%
				</p>
				<p>
					课外学习成绩 * 20%
				</p>
				<p>
					其中，课外学习成绩= 当前学生经验值 / 课堂学生经验值 最大值*100
				</p>
			</div>
		);
		return(
			<React.Fragment>
					<div className="edu-back-white">
						<Spin size="large" spinning={this.state.topisSpin}>
						<p className="clearfix padding30">
							<Row>
								<Col span={12}>
									明星学员
								</Col>
								<Col span={12} className={"Statisticsliboxjsgz"}>
									<span className={"mr10"}>计算规则</span>
									<Popover  placement="bottom" title={"明星学员计算说明"} content={content} trigger="hover">
										<Icon type="info-circle" />
									</Popover>
								</Col>
							</Row>

							<Row type="flex" justify="center" align="bottom">
								{data&&data.map((item,key)=>{
  								if(key===3){
										return(
											<Col span={3}>
												<li className="pr rankingss">
													<a href={`/users/${item.user_login}`} className="color-dark">
														<img src={getImageUrl(`images/${item.avatar_url}`)}/>
													</a>
												</li>
											</Col>
										)
									}

								})}
								{data&&data.map((item,key)=>{
									if(key===1){
										return(
											<Col  span={5}>
												<li className="pr rankingss">
													<a href={`/users/${item.user_login}`} className="color-dark">
														<img src={getImageUrl(`images/${item.avatar_url}`)} className={"mb10"}/>
													</a>
												</li>
												<Col className={`height-${nd2}`}>

												</Col>
											</Col>
										)
									}

								})}

								{data&&data.map((item,key)=>{
									if(key===0){
										return(
											<Col  span={5} className={"relatives"}>
												<li className="pr rankingss">
													<img src={getImageUrl("images/educoder/imperialcrown.png")} className="huangguans mb5" />
													<a href={`/users/${item.user_login}`} className="color-dark">
														<img src={getImageUrl(`images/${item.avatar_url}`)} className={"mb10 mt5"}/>
													</a>
												</li>
												<Col className={`height-${nd1}`}>

												</Col>
											</Col>
										)
									}

								})}

								{data&&data.map((item,key)=>{
									if(key===2){
										return(
											<Col span={5}>
												<li className="pr rankingss">
													<a href={`/users/${item.user_login}`} className="color-dark">
														<img src={getImageUrl(`images/${item.avatar_url}`)} className={"mb10"}/>
													</a>
												</li>
												<Col className={`height-${nd3}`}>

												</Col>
											</Col>
										)
									}

								})}


								{data&&data.map((item,key)=>{
									if(key===4){
										return(
											<Col span={3}>
												<li className="pr rankingss">
													<a href={`/users/${item.user_login}`} className="color-dark">
														<img src={getImageUrl(`images/${item.avatar_url}`)}/>
													</a>
												</li>
											</Col>
										)
									}

								})}


							</Row>


							<Row className="mt10" type="flex" justify="center" align="bottom">

								{data&&data.map((item,key)=>{
									if(key===3){
										return(
											<Col span={3} className={"Statisticscenter"}>
												<Col>{item.user_name}</Col>
												<Col>4th</Col>
											</Col>
										)
									}
								})}
								{data&&data.map((item,key)=>{
									if(key===1){
										return(
											<Col span={5} className={"Statisticscenter"}>
												<Col>{item.user_name}</Col>
												<Col>2nd</Col>
											</Col>
										)
									}
								})}
								{data&&data.map((item,key)=>{
									if(key===0){
										return(
											<Col span={5} className={"Statisticscenter"}>
												<Col>{item.user_name}</Col>
												<Col>1st</Col>
											</Col>
										)
									}
								})}
								{data&&data.map((item,key)=>{
									if(key===2){
										return(
											<Col span={5} className={"Statisticscenter"}>
												<Col>{item.user_name}</Col>
												<Col>3rd</Col>
											</Col>
										)
									}
								})}
								{data&&data.map((item,key)=>{
									if(key===4){
										return(
											<Col span={3} className={"Statisticscenter"}>
												<Col>{item.user_name}</Col>
												<Col>5th</Col>
											</Col>
										)
									}
								})}

							</Row>
						</p>
						</Spin>
					</div>

					<div className="mt20 edu-back-white">
						<Spin size="large" spinning={this.state.bomisSpin}>
							<style>{
								`
								.ant-select-dropdown-menu {
									max-height: 320px;
									}
									.ant-tabs-extra-content{
									 margin-top:20px;
									}
					       .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
											padding: 16px 0px;
									    text-align: center;
									}
								`
							}</style>
						<Tabs  className="statisticsTabs" activeKey={this.state.activeKey} onChange={this.activeKey} tabBarExtraContent={operations}>
							<TabPane tab="学习成绩" key="1" className={"statisticsTabs1"} >
								{bomdata===undefined||bomdata===null?"":bomdata.length===0?<NoneData/>:<Table
									columns={columns}
									dataSource={bomdata}
									pagination={false}
									onChange={this.handleTableChange}
								/>}
							</TabPane>
							<TabPane tab="课堂活跃度" key="2">
								{course_members===undefined||course_members===null?"":course_members.length===0?<NoneData/>:<Dynamiclist
									{...this.state}
									{...this.props}
								/>}
							</TabPane>
						</Tabs>
						</Spin>
					</div>

				{this.state.all_count===undefined||this.state.all_count===null||this.state.activeKey==="2"?'':this.state.all_count >20&&this.props.isAdmin()===true?<div className="mb40 edu-txt-center padding20-30"

					>

						<Pagination
							showQuickJumper
							defaultCurrent={1}
							pageSize={20}
							total={this.state.all_count===undefined?0:this.state.all_count===null?0:this.state.all_count}
							current={this.state.page}
							onChange={this.PaginationCourse}
						/>

					</div>:""}

			</React.Fragment>
		)
	}
}
export default Statistics;
