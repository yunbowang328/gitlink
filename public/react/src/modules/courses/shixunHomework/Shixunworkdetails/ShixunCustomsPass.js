import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table,InputNumber} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
import moment from 'moment';
import { MonacoDiffEditor } from 'react-monaco-editor';
import axios from 'axios';
class ShixunCustomsPass extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loadingstate:true,
			datas:undefined
		}
	}

	componentDidMount() {

	}
	editgame_scores=(e,id,maxsum,code_rate,copy_user_id)=>{

		let{datas}=this.state;
		let newdatas=datas;
		let score=e.target.value;

		if(score!=null&&score!=undefined&&score!=""){
			if(score<0){
				this.props.showNotification("不能小于0");
				this.setState({
					customsids:id
				})
			}else if(score>maxsum){
				this.props.showNotification(`不能大于关卡分值${maxsum}`);
				this.setState({
					customsids:id
				})
			}else{
				let work_id=this.props.data.work_id;
				let url=`/student_works/${work_id}/adjust_review_score.json`
				axios.post(url,{
					type:"review",
					score:score,
					challenge_id:id,
					code_rate:code_rate,
					copy_user_id:copy_user_id
				}).then((result)=>{
					if(result.data.status===0){
						this.props.updatas();
						this.props.showNotification(result.data.message);
					}else{
						this.props.showNotification(result.data.message);
					}
				}).catch((error)=>{

				})
			}
		}else{
			this.props.showNotification("调分为空将不会修改之前的分数");
		}
	}
	render() {
		let {data}=this.props;
		let {customsids}=this.state;
		// console.log(data)
    let datas=[];

		data&&data.challenge_list.forEach((item,key)=>{
			datas.push({
				customs:{position:item.position,subject:item.subject},
				taskname:{name:item.username},
				openingtime:item.end_time===null?"无":item.end_time===undefined?"无":item.end_time===""?"无":moment(item.end_time).format('YYYY-MM-DD HH:mm:ss'),
				evaluating: {final_score:item.final_score,all_score:item.all_score},
				finishtime:item.copy_username,
				elapsedtime:item.copy_end_time===null?"无":item.copy_end_time===undefined?"无":item.copy_end_time===""?"无":moment(item.copy_end_time).format('YYYY-MM-DD HH:mm:ss'),
				empvalue:item.code_rate,
				challenge_id:{id:item.id},
				copy_user_id:item.copy_user_id
				// adjustmentminute:asdasd
			})
		})


		let columns=[{
			title: '关卡',
			dataIndex: 'customs',
			key: 'customs',
			className:"customsPass",
			render: (text, record) => (
				<span>
					       <style>
	              {`
	              .backgroud4CACFF{
	                  background: #4CACFF;
	              }
	              .fontpass{
	              overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								width: 346px;
	              }
	              `}
              </style>
            <span className="panel-inner-icon mr15 fl mt3 backgroud4CACFF">
		            <i className="fa fa-code font-16 color_white"></i>
		        </span>
						<span className="fl mt3 font-14 fontpass">
							<span className="font-bd mr15">第{record.customs.position}关</span>
								<span className={"font-14"} title={record.customs.subject}>{record.customs.subject}</span>
						</span>
        </span>
			),
		}, {
			title: '被查作品',
			dataIndex: 'taskname',
			key: 'taskname',
			render: (text, record) => (
				<span className={"colorC8161D"}>
            {record.taskname.name}
        </span>
			),
		}, {
			title: '被查作品完成时间',
			dataIndex: 'openingtime',
			key: 'openingtime',
			render: (text, record) => (
				<span className={"color-grey-9"}>
					{record.openingtime}
        </span>
			),
		}, {
			title: '得分/满分',
			key: 'evaluating',
			dataIndex: 'evaluating',

			render: (text, record) => (
				<span className={"color-grey-9"}>
		        <span style={{color:'#FF6800'}}>{record.evaluating.final_score}</span><span className={"color-grey-9"}>/{record.evaluating.all_score}</span>
        </span>
			),
		}, {
			title: '疑被抄袭作品',
			key: 'finishtime',
			dataIndex: 'finishtime',
			render: (text, record) => (
				<span className={"color-green"}>
         	{record.finishtime}
        </span>
			),
		}, {
			title: '疑被抄袭作品完成时间',
			key: 'elapsedtime',
			dataIndex: 'elapsedtime',

			render: (text, record) => (
				<span className={"color-grey-9"}>
					  {record.elapsedtime}
        </span>
			),
		},{
			title: '调分',
			key: 'adjustmentminute',
			dataIndex: 'adjustmentminute',

			render: (text, record) => (
				<span>
			       <a>
							 {record.copy_user_id===null?"":<InputNumber size="small" className={customsids===record.challenge_id.id?"bor-red":""} defaultValue={record.evaluating.final_score}
														 onBlur={(e) => this.editgame_scores(e,record.challenge_id.id,record.evaluating.all_score,record.empvalue,record.copy_user_id)}
							 // min={0} max={record.game_scores.game_score_full}
							 />}
			       </a>
					{/*<a style={{textAlign: "center"}} className="color-blue font-14 mr20">查看</a>*/}
        </span>
			),
		}, {
			title: '相似度',
			key: 'empvalue',
			dataIndex: 'empvalue',

			render: (text, record) => (
				<span className={"colorC8161D"}>
					  {record.empvalue}%
        </span>
			),
		}];
		// {
		// 	title: '调分',
		// 		key: 'adjustmentminute',
		// 	dataIndex: 'adjustmentminute',
		//
		// 	render: (text, record) => (
		// 	<span>
		//          <a>6小时 50分钟 6秒</a>
		//     </span>
		// ),
		// },


		if(this.props.isAdmin()===false){
			columns.some((item,key)=> {
					if (item.title === "调分") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}
		return (
			<div>

				<style>{`
				.ant-table-thead > tr > th{
				    text-align: center;
					}
				.tasknamebox{
			    width: 50px;
			    height: 24px;
			    border: 1px solid rgba(221,23,23,1);
			    border-radius: 12px;
			    color: rgba(221,23,23,1);
			    display: inline-block;
					line-height: 24px;
					text-align: center;
					}
				  .ant-table-tbody > tr > td{
            font-size:14px;
					}
					.task-hide{
					    max-width: 345px;
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
					}
					.ant-table-tbody > tr{
					   height:64px;
					}
					.colorC8161D{
					    color:#C8161D;
					}
				 .ant-table-tbody> tr > td{
				    text-align: center;
					}
					.customsPass{
            text-align: left !important;
					}
					.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
							padding: 16px 12px;
					}
			`}
				</style>
				{datas===undefined?"":<Table
					dataSource={datas}
					columns={columns}
					pagination={false}
				/>}

				<div className="stud-class-set bor-bottom-greyE mt20">
					<div className="clearfix edu-back-white poll_list pad40px">
						<div className="font-16 color-dark-21 shixunreporttitle mb20">实训详情</div>
						<style>
							{`
	              .poll_list a{
	              padding:0px !important;
	              }
	              .backgroud4CACFF{
	                  background: #4CACFF;
	              }
	              `}
						</style>
						{
							data&&data.challenge_list.map((item,key)=>{
								// console.log("203challenge_list下面的数据");
								// console.log(item);
								// console.log(JSON.stringify(item));
								return(
									<div key={key} className={"mb20"}>
										<div className="font-16 color-dark-21 ml20 mr20">
											<p className="clearfix mb20">
									        <span className="panel-inner-icon mr15 fl mt3 backgroud4CACFF">
									            <i className="fa fa-code font-16 color_white"></i>
									        </span>
												<span className="fl mt3 font-14">
														<span className="font-bd mr15">第{item.position}关</span>
														<a>
															<span className={"font-14"}>{item.subject}</span>
														</a>
											  </span>
												<span className="fr codeboxright">代码文件：{item.code_list.length===0?"无":item.code_list[0].path===undefined?"无":item.code_list[0].path}</span>
											</p>

										</div>


										{item.code_list.length===0?"":item.code_list.map((ite,k)=>{
											return(
												<div className="font-16 color-dark-21 ml20 mr20" key={k}>
													<div className=" mt15">
														<p className="clearfix pt5 pb5 codebox">
																		<span className="fl">
																			<span className={"colorC8161D"}>{item.username}</span>
																			的代码文件
																		</span>
															<span className="fr">
																			<span className={"color-green"}>{item.copy_username}</span>
																			的代码文件
																		</span>
														</p>
														<style>
															{`
																					.borderccc{
																					 border:1px solid #ccc
																					}
																				`}
														</style>
														<div className="test-code mt20 borderccc">
															<li className="clearfix">
																<MonacoDiffEditor
																	height="500"
																	// language="javascript"
																	original={ite.origin_content}
																	value={ ite.target_content}
																	// options={options}
																/>
															</li>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								)
							})
						}
					</div>
				</div>
			</div>

		)
	}
}

export default ShixunCustomsPass;
