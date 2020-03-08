import React, { Component } from 'react';
import {Button,Layout,Tabs,Icon, Card, Avatar, Row, Col ,Table,Badge} from 'antd';
import {markdownToHTML,getImageUrl,getRandomNumber} from 'educoder';
import axios from 'axios';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

class CompetitionContents extends Component{
	constructor(props) {
		super(props)
		this.state={
			personal:undefined
		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		let url=`/competitions/${this.props.match.params.identifier}/competition_staff.json`;
		axios.get(url)
			.then((response) => {
				if(response.status===200){
					console.log(response)
					this.setState({
						personal:response.data.personal
					})
				}
			}).catch((error) => {
			console.log(error)
		})
		this.props.MdifHasAnchorJustScorll();
	}

	derivefun=(url)=>{
		axios.get(url).then((response)=>{
			if(response === undefined){
				return
			}
			if(response.data.status&&response.data.status===-1){
				this.props.showNotification(response.data.message);
			}else if(response.data.status&&response.data.status===-2){
				// if(response.data.message === "100"){
				// 	// 已超出文件导出的上限数量（100 ），建议：
				//
				// 	this.setState({
				// 		DownloadType:true,
				// 		DownloadMessageval:100
				// 	})
				// }else {
				// 	//因附件资料超过500M
				// 	this.setState({
				// 		DownloadType:true,
				// 		DownloadMessageval:500
				// 	})
				// }
				this.props.showNotification(response.data.message);
			}else {
				// this.props.showNotification(`正在下载中`);
				// window.open("/api"+url, '_blank');
				this.props.slowDownload(url);
			}
		}).catch((error) => {
			console.log(error)
		});
	}
	render() {
		this.props.MdifHasAnchorJustScorll();
		const operations = <div>
				<Button className={"fr"} type="primary" ghost onClick={()=>this.props.Competitionedit()}>编辑</Button>
				<Button className={"fr mr20"} type="primary" ghost>
					<a onClick={()=>this.derivefun(`/competitions/${this.props.match.params.identifier}/charts.xlsx?${getRandomNumber(true)}`)}>导出</a>
				</Button>
			</div>
		const columns = [
			{
				title: 'usersum',
				dataIndex: 'usersum',
				key: 'name',
				render: text => <span className={"color-blue"}>{text}</span>,
			},
			{
				title: 'userimg',
				dataIndex: 'userimg',
				key: 'userimg',
				render:  (text, record) =>(
					<a href={`/users/${record.user_login}`} target={"_blank"} className="color-dark">
						<div className={"relativef"}>
					    	<img className={"Competitionuserimg mb10"} src={getImageUrl(`images/${record.userimg===null?`avatars/User/0?1442652658`:record.userimg}`)}/>
						  	<div className={"competimgabsoluteijmg"}><Badge count={record.competition_prize} style={{ backgroundColor: '#459BE5' }} title={record.competition_prize}/></div>
						</div>
					</a>),
			},
			{
				title: 'username',
				dataIndex: 'username',
				key: 'username',
				render: text => <span title={text} title={text}>{text}</span>,
			},
			{
				title: 'school',
				dataIndex: 'school',
				key: 'school',
				render: text => <span title={text} title={text}>{text}</span>,
			},
			{
				title: 'spendtime',
				dataIndex: 'spendtime',
				key: 'spendtime',
				render: text => <span>{text}</span>,
			},
			{
				title: 'score',
				dataIndex: 'score',
				key: 'score',
				render: text => <span className={"color-blue"}>{text}</span>,
			},
		];

		const datas = [];
		let {chart_rules, chartdata, data} = this.props;
		let {personal}=this.state;

		if(this.props&&this.props.mode!=1){

			columns.some((item,key)=> {
					if (item.title === "spendtime") {
						columns.splice(key, 1)
						return true
					}
				}
			)

		}

		{chartdata===undefined?"":chartdata.teams.length===0?"":chartdata.teams.map((item,key)=>{
				let list={
					usersum:key+1,
				  userimg:item.user_image,
					username:personal===undefined||personal===null?item.record_user_name:personal===true?item.record_user_name:item.team_name,
					school:item.school_name,
					spendtime:item.spend_time,
					score:item.score<50?"< 50 分":item.score,
					user_login:item.user_login,
					competition_prize:item.competition_prize
				}
				datas.push(list)
		 })}

		// console.log(this.props&&this.props.mode)
		// console.log(columns)

    return (
			<div>
				<style>
					{
						`
						.ant-tabs-nav .ant-tabs-tab{
								font-size: 20px;
								margin: 0 10px 0 0;
						}
						.ant-badge{
								width:90px;
						}
						.ant-badge sup{
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						`
					}
				</style>
				{chart_rules === undefined ? "" :
					<Tabs onChange={(e) => this.props.Competitioncallback(e)} activeKey={this.props.tabkey}
								tabBarExtraContent={data && data.permission.editable === true ? this.props.Competitionedittype === false ? this.props.has_url === false ? operations : "" : "" : ""}>
					{chart_rules.stages.map((item,key)=>{
						return(
							<TabPane tab={item.name} key={item.id===null?0:item.id}>
								{chart_rules.rule_contents.map((items,keys)=>{
									if(item.id===items.competition_stage_id){
										return(
											<Content key={keys} className={"markdown-body "} dangerouslySetInnerHTML={{__html: markdownToHTML(items.content===undefined||items.content===null?"":items.content).replace(/▁/g, "▁▁▁")}}></Content>
										)
									}else if(item.id===null&&items.competition_stage_id===0){
										return(
											<Content key={keys} className={"markdown-body "} dangerouslySetInnerHTML={{__html: markdownToHTML(items.content===undefined||items.content===null?"":items.content).replace(/▁/g, "▁▁▁")}}></Content>
										)
									}
								})}
							</TabPane>
							)
					})}
				</Tabs>}


			  <Col className="gutter-row Competitioncharts mt30 mb30">总排名</Col>
				{chartdata===undefined?"":chartdata.teams.length===0?<Col className="gutter-row Competitioncharts mt30 mb30 rankbeicenter">
					<img  src={getImageUrl(`images/educoder/competitions/trophy.png`)}/>
					<div className={"rankbei mt10"}>要抓住一切机会，向所有人证明你自己，证明你能够迎接荣耀</div>
				</Col>:""}
				<Row calssName={"Competition399"}>
					{chartdata===undefined?"":chartdata.teams.length===0?"":chartdata.teams.map((item,key)=>{


						if(key===1){
							return(
								<Col className="mt40" xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
									<Card
										className={"Competitionthird"}
										cover={
											<div className={"Competitionthirdbox center"}>
												<li className="pr Competitioncenter">
													<img src={getImageUrl("images/educoder/huangguan-two.png")}/>
													<div className={"mt10"}>
														<a href={`/users/${item.user_login}`} target={"_blank"} className="color-dark ">
															<div className={"relativef"}>
																<img className={"rankingimg"} src={getImageUrl(`images/${item.user_image===null?`avatars/User/0?1442652658`:item.user_image}`)} />
																<div className={"competimgabsolute"}><Badge count={item.competition_prize} style={{ backgroundColor: '#459BE5' }} title={item.competition_prize}/></div>
															</div>
															<p className="task-hide rankName mt5 jinshaifont">{personal===undefined||personal===null?item.record_user_name:personal===true?item.record_user_name:item.team_name}</p>
														</a>
													</div>
												</li>
											</div>
										}
									>
										<Meta
											title={<div className={"center"}>
												<div className={"rankfonttop"} title={item.school_name}>{item.school_name}</div>
												{this.props&&this.props.mode===1?<div className={"rankfontmid"}>{item.spend_time}</div>:""}
											</div>}
											description={
												<div className={"rankfontbottom"}>{item.score<50?"< 50 分":item.score}分</div>
											}
										/>
									</Card>
								</Col>

							)
						}

					})}
					{chartdata===undefined?"":chartdata.teams.length===0?"":chartdata.teams.map((item,key)=>{
						if(key===0){
							return(
								<Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 1 }}>
									<Card
										className={"Competitionfirst"}
										cover={
											<div className={"Competitionfirstbox center"}>
												<li className="pr Competitioncenter">
														<img src={getImageUrl("images/educoder/huangguan.png")}/>
													<div className={"mt10"}>
														<a href={`/users/${item.user_login}`} target={"_blank"} className="color-dark">
														<div className={"relativef"}>
															<img className={"rankingimg"} src={getImageUrl(`images/${item.user_image===null?`avatars/User/0?1442652658`:item.user_image}`)} />
											      	<div className={"competimgabsolute"}><Badge count={item.competition_prize} style={{ backgroundColor: '#459BE5' }} title={item.competition_prize}/></div>
														</div>
															<p className="task-hide rankName mt5 jinshaifont">{personal===undefined||personal===null?item.record_user_name:personal===true?item.record_user_name:item.team_name}</p>
														</a>
													</div>
												</li>
											</div>
										}
									>
										<Meta
											title={<div className={"center"}>
												<div className={"rankfonttop"} title={item.school_name}>{item.school_name}</div>
												{this.props&&this.props.mode===1?<div className={"rankfontmid"}>{item.spend_time}</div>:""}
											</div>}
											description={
												<div className={"rankfontbottoms"}>{item.score<50?"< 50 分":item.score}分</div>
											}

										/>
									</Card>

								</Col>
							)
						}
					})}
					{chartdata===undefined?"":chartdata.teams.length===0?"":chartdata.teams.map((item,key)=>{
						if(key===2){
							return(
								<Col className="mt30" xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
									<Card
										className={"Competitionsecondary "}
										cover={
											<div className={"Competitionsecondarybox center"}>
												<li className=" pr Competitioncenter ">
														<img src={getImageUrl("images/educoder/huangguan-three.png")}/>
													<div className={"mt10"}>
														<a href={`/users/${item.user_login}`} target={"_blank"} className="color-dark">
															<div className={"relativef"}>
																	<img className={"rankingimg"} src={getImageUrl(`images/${item.user_image===null?`avatars/User/0?1442652658`:item.user_image}`)} />
																  <div className={"competimgabsolute"}><Badge count={item.competition_prize} style={{ backgroundColor: '#459BE5' }} title={item.competition_prize}/></div>
															</div>
															<p className="task-hide rankName mt5 jinshaifont">{personal===undefined||personal===null?item.record_user_name:personal===true?item.record_user_name:item.team_name}</p>
														</a>
													</div>
												</li>
											</div>
										}
									>
										<Meta
											title={<div className={"center"}>
												<div className={"rankfonttop"} title={item.school_name}>{item.school_name}</div>
												{this.props&&this.props.mode===1?<div className={"rankfontmid"}>{item.spend_time}</div>:""}
											</div>}
											description={
												<div className={"rankfontbottom"}>{item.score<50?"< 50 分":item.score}分</div>
											}

										/>
									</Card>
								</Col>
							)
						}



					})}

				</Row>
				{chartdata===undefined?"":chartdata.user_ranks.length===0?"":<div className={"youranklist mt50"}>
					<style>
						{
							`
								.ant-col-9 {
						       width: 35.5%;
						  	}
						  	.col13{
									width:13%;
									text-align:left;
						  	}
						  	.col24{
								  width: 24%;
									text-align: left;
									padding-left: 33px;
						  	}
						  	.col15{
								  width: 14%;
									text-align: right;
						  	}
						  	.col12{
						      width: 12%;
									text-align: right;
						  	}
						  	.col10{
						  		 width: 10%;
						  	}
						  	.col6{
						       width: 6%;
						  	}
							`
						}

					</style>
					{chartdata.user_ranks.map((item,key)=>{

					return(
						<Row type="flex" key={key}>
							<Col span={4} order={1} className={"col13"}>
								<span className={"ranknames"}>您当前排名:{item.rank}</span>
							</Col>
							<Col className="userranksclass" span={3} order={2}  className={"col24"}>
								{personal===undefined||personal===null?item.record_user_name:personal===true?item.user_name:item.team_name}
							</Col>
							<Col className="textleft" span={9} order={3}>
								{/*{item.team_name}*/}
							</Col>
							{item.cost_time=== "--"?<Col span={3} order={4} className={"col6"}>
								{this.props&&this.props.mode===1?item.cost_time:""}
							</Col>:<Col span={3} order={4} className={"col10"}>
								{this.props&&this.props.mode===1?item.cost_time:""}
							</Col>}
							{item.cost_time=== "--"?<Col className="textright" span={3} order={5} className={"col15"}>
								<span className={"ranknameslast"}>{item.score<50?"< 50 分":item.score}</span>
							</Col>:<Col className="textright" span={3} order={5} className={"col12"}>
									<span className={"ranknameslast"}>{item.score<50?"< 50 分":item.score}</span>
								</Col>}
						</Row>
						)
					})}
				</div>}
				<Row className={"mt20 mb80"}>
					<style>
						{
							`
							 .ant-table-tbody > tr > td:nth-last-child(4){
									  overflow: hidden;
										max-width: 100px;
										-o-text-overflow: ellipsis;
										text-overflow: ellipsis;
										white-space: nowrap;
										cursor: default;
							 }
							.ant-table-tbody > tr > td:nth-last-child(3){
										overflow: hidden;
										max-width: 200px;
										-o-text-overflow: ellipsis;
										text-overflow: ellipsis;
										white-space: nowrap;
										cursor: default;
								}
								.ant-table-tbody>tr>td, .ant-table-thead>tr>th {
										padding: 5px;
								}
							`
						}
					</style>
					{chartdata === undefined ? "" : chartdata.teams.length === 0 ? "" :
						<Table className="Competitiontransparent" columns={columns} dataSource={datas} showHeader={false}
									 pagination={false}/>}
				</Row>


			</div>

		)
	}
}
export default CompetitionContents;
