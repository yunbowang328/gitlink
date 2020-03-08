import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, List, Avatar,Row, Col,Tag,Pagination,Alert} from 'antd';
import {getImageUrl} from 'educoder';
import axios from 'axios';
import './Competitionsindex.css';
import NoneData from "../../courses/coursesPublic/NoneData";
import LoadingSpin from '../../../common/LoadingSpin';

class CompetitionsIndex extends Component{
	constructor(props) {
		super(props)
		this.state={
			current: 'all',
			datas:undefined,
			page:1,
			category:undefined

		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		let{category,page}=this.state;
		this.getdata(category,page)
	}

	getdata=(category,page)=>{
		const Url =`/competitions.json`;
		axios.get(Url,{params:{
				category:category,
				page:page,
				per_page:15,
			}
		}).then((response) => {
				if(response.status===200){
					this.setState({
						datas:response.data.competitions,
						count:response.data.count,
					})
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	handleClick = e => {
		this.setState({
			current: e.key,
			datas:undefined
		});
		let{category,page}=this.state;
		this.getdata(e.key,page)
	};

	PaginationCourse=(pageNumber)=>{
		let {category}=this.state;
		this.setState({
			page: pageNumber,
		})
		this.getdata(category,pageNumber);
	}

	render() {
		let {datas,page,count}=this.state;


		return (
			<div>
				<div className="clearfix">
					<div>
						<div className="clearfix">
							<style>
								{
									`
										.courses-head{
												width: 100%;
												height: 300px;
									      background-image: url(${getImageUrl(this.props.mygetHelmetapi && this.props.mygetHelmetapi.competition_banner_url === null ?`images/educoder/competitions/courses.jpg`:this.props.mygetHelmetapi&&this.props.mygetHelmetapi.competition_banner_url)});
											  background-color: #081C4B;
												background-position: center;
												background-repeat: no-repeat;
										}

									`
								}
							</style>
							<div className="courses-head pr Competitionshead ">
								<div className="edu-txt-center pathNavLine">
									<div className="inline path-nav"></div>
								</div>
							</div>

							<div className="competitionstitle mb20">
								<div className="competitionstitle2">
									<Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
										<Menu.Item key="all" className={"competitionmr50"}>
										   <span className={"competitionsvalue"}>全部</span>
										</Menu.Item>
										<Menu.Item key="nearly_published" className={"competitionmr50"}>
											<span className={"competitionsvalue"}>即将发布</span>
										</Menu.Item>
										<Menu.Item key="progressing" className={"competitionmr50"}>
											<span className={"competitionsvalue"}>进行中</span>
										</Menu.Item>
										<Menu.Item key="ended" className={"competitionmr50"}>
											<span className={"competitionsvalue"}>往期比赛</span>
										</Menu.Item>
									</Menu>
								</div>
							</div>

							<div className={"educontent clearfix mtf10 CompetitionsIndex mb20"}>

								{datas===undefined?"":datas.length===0?"":<List
									itemLayout="vertical"
									size="large"
									dataSource={datas&&datas}
									renderItem={(item,key) => (
										<a target="_blank" href={item.competition_status==="ended"?`/competitions/${item.identifier}`:item.competition_status==="nearly_published"?item.permission.editable==true?`/competitions/${item.identifier}`:null:item.competition_status==="progressing"?`/competitions/${item.identifier}`:null}
											className={item.competition_status==="ended"?"competitionstitlesshou":item.competition_status==="nearly_published"?
												 item.permission.editable==true?"competitionstitlesshou":"endedfont":"competitionstitlesshou"}
										  >

											<div className={"CompetitionsList"} >
												{item.competition_status==="nearly_published"?
													item.permission.editable==true?"":<div className={"CompetitionsListzhezhao"}>即将发布 敬请期待</div>:""}
												{/*<div className={"CompetitionsListzhezhao"}>即将发布 敬请期待</div>*/}
											{/*{item.description===null||item.description===undefined||item.description===""?<style>*/}
												{/*{*/}
													{/*`*/}
												 {/*//  .CompetitionsIndex .ant-list-vertical .ant-list-item-action{*/}
													{/*// 		margin-top:50px;*/}
												 {/*// }*/}
												{/*`*/}
												{/*}*/}
											{/*</style>:""}*/}
											<img className={"competitonimg"}
													 src={item.competition_status==="ended"?getImageUrl(`images/educoder/competitions/groups1.png`):item.competition_status==="nearly_published"?getImageUrl(`images/educoder/competitions/groups2.png`):item.competition_status==="progressing"?getImageUrl(`images/educoder/competitions/groups3.png`):""} />
											<List.Item
												key={key}
												actions={[
													<span>竞赛时间: {item.start_time}～{item.end_time}</span>,
													<span>报名截止时间：{item.enroll_end_time}</span>,
												]}
												extra={
													<div className={"pt50"} style={{"width":'314px'}}>

														<Row gutter={16}>
															<Col className="gutter-row" span={6}>
																<div className="gutter-box CompetitionsIndexdadels">奖金</div>
															</Col>
															<Col className="gutter-row" span={6}>
																<div className="gutter-box CompetitionsIndexdadels">浏览数</div>
															</Col>
															<Col className="gutter-row" span={6}>
																<div className="gutter-box CompetitionsIndexdadels">报名数</div>
															</Col>
														</Row>

														<Row gutter={16}>
															<Col className="gutter-row" span={6}>
																<div className="gutter-box CompetitionsIndexbottomvalue">¥{item.bonus}</div>
															</Col>
															<Col className="gutter-row" span={6}>
																<div className="gutter-box CompetitionsIndexbottomvalue">{item.competition_status==="nearly_published"?"--":item.visits_count}</div>
															</Col>
															<Col className="gutter-row" span={6}>
																<div className="gutter-box CompetitionsIndexbottomvalue">{item.competition_status==="nearly_published"?"--":item.member_count}</div>
															</Col>
														</Row>
													</div>
												}
											>
												<List.Item.Meta
													title={<a className={item.competition_status==="ended"?"competitionstitlesshou":item.competition_status==="nearly_published"?
														item.permission.editable==true?"competitionstitlesshou":"endedfont":"competitionstitlesshou"}>
														<a target="_blank"  className={"competitionstitles"}
																					href={item.competition_status==="ended"?`/competitions/${item.identifier}`:item.competition_status==="nearly_published"?	item.permission.editable==true?`/competitions/${item.identifier}`:null:item.competition_status==="progressing"?`/competitions/${item.identifier}`:null}
													>{item.name}{item.sub_title===null?"":`——${item.sub_title}`}</a>
														{/*<span>{item.sub_title===null?"":*/}
															{/*<Tag className="competitionsrelative" color="#87d068">{item.sub_title}</Tag>}*/}
														{/*</span>*/}
													</a>}
												/>
												<span className={"span666"}>{item.description}</span>
											</List.Item>
											</div>
										</a>

									)

									}
								/>}

								{datas===undefined?"":count===undefined?"":count >15 ?<div className="mb40 edu-txt-center padding20-30"
								>

									<Pagination
										showQuickJumper
										defaultCurrent={1}
										pageSize={15}
										total={count===undefined?"":count}
										current={page}
										onChange={this.PaginationCourse}
									/>

								</div>:""}

								{
									datas===undefined?<LoadingSpin/>:datas && datas.length===0? <NoneData></NoneData>:""
								}
							</div>

						</div>

					</div>
				</div>
			</div>
		)
	}
}
export default CompetitionsIndex;
