import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table, InputNumber, Tooltip} from "antd";
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

class OfficialAcademicTranscript extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loadingstate: true,
			datas: undefined,
			customsids: undefined
		}
	}

	componentDidMount() {

	}

	myjumptopic = (e) => {
		console.log("获取到值");
		console.log(e);
		this.props.jumptopic(e);
	}

	editgame_scores = (e, id, maxsum) => {
		let {datas} = this.state;
		let newdatas = datas;
		let score = e.target.value;

		if (score != null && score != undefined && score != "") {
			if (score < 0) {
				this.props.showNotification("不能小于0");
				this.setState({
					customsids: id
				})
			} else if (score > maxsum) {
				this.props.showNotification(`不能大于关卡分值${maxsum}`);
				this.setState({
					customsids: id
				})
			} else {
				let work_id = this.props.data.work_id;
				let url = `/student_works/${work_id}/adjust_review_score.json`
				axios.post(url, {
					type: "report",
					score: score,
					challenge_id: id
				}).then((result) => {
					if (result.data.status === 0) {
						// this.props.getdatalist()
						this.props.showNotification(result.data.message);
						this.props.setupdalist(result.data.challenge_score, result.data.overall_appraisal, result.data.work_score)
						newdatas.map((item, key) => {
							if (item.challenge_id.id === id) {
								item.game_scores.game_score = score
							}
						})
						this.setState({
							datas: newdatas,
							customsids: undefined
						})
					} else {
						this.props.showNotification(result.data.message);
					}
				}).catch((error) => {

				})
			}

		} else {
			this.props.showNotification("调分为空将不会修改之前的分数");
		}
	}

	render() {
		let {customsids} = this.state;
		let {data} = this.props;

		let datas = [];
		if (data != undefined) {
			data.stage_list === undefined ? "" : data.stage_list.forEach((item, key) => {
				datas.push({
					customs: key + 1,
					taskname: {name: item.name, complete_status: item.complete_status},
					openingtime: item.open_time,
					evaluating: item.evaluate_count,
					finishtime: item.finished_time,
					elapsedtime: item.time_consuming,
					empvalue: {myself: item.myself_experience, experience: item.experience},
					game_scores: {game_score: item.game_score, game_score_full: item.game_score_full},
					challenge_id: {id: item.challenge_id},
					challenge_comment: item.challenge_comment,
					challenge_comment_hidden: item.challenge_comment_hidden,
					view_answer: item.view_answer,
					// adjustmentminute:asdasd
				})
			})
		}

		let columns = [{
			title: '关卡',
			dataIndex: 'customs',
			key: 'customs',
			render: (text, record) => (
				<span className={"color-grey-9"}>
					{record.customs}
        </span>
			),
		}, {
			title: '任务名称',
			dataIndex: 'taskname',
			key: 'taskname',
			className: "TaskForms",
			render: (text, record) => (
				<span>
					<span className={"task-hide linhe15"} style={{color: "#676767"}}><a className="tasknameName font-14"
																																							onClick={() => this.myjumptopic("id" + record.customs)}
																																							title={record.taskname.name.length > 15 ? record.taskname.name : ""}>
						{record.taskname.name}
					</a>
						{record.taskname.complete_status === 2 ?
							<span className={"tasknamebox ml10"}>延时</span> : record.taskname.complete_status === 3 ?
								<span className={"tasknameboxs ml10"}>延时</span> : ""}
					</span>
        </span>
			),
		}, {
			title: '开启时间',
			dataIndex: 'openingtime',
			key: 'openingtime',
			render: (text, record) => (
				<span className={"color-grey-9"}>
					{record.openingtime}
        </span>
			),
		}, {
			title: '评测次数',
			key: 'evaluating',
			dataIndex: 'evaluating',

			render: (text, record) => (
				<span className={"color-grey-9"}>
           	{record.evaluating}
        </span>
			),
		}, {
			title: '完成时间',
			key: 'finishtime',
			dataIndex: 'finishtime',
			render: (text, record) => (
				<span className={"color-grey-9"}>
         	{record.finishtime}
        </span>
			),
		}, {
			title: '实战耗时',
			key: 'elapsedtime',
			dataIndex: 'elapsedtime',

			render: (text, record) => (
				<span>
					  {record.elapsedtime}
        </span>
			),
		},
			{
				title: '查看答案',
				dataIndex: 'view_answer',
				key: 'view_answer',
				className: "edu-txt-center",
				render: (text, record) => {
					return (
						<span style={{cursor: "default"}}>
							{record.view_answer === true ? <Tooltip placement="bottom" title={
							<pre>
								学生在完成任务评测之前是否查看了参考答案
				</pre>
								}><span style={{cursor: "default"}}>已查看</span> </Tooltip>
								: <Tooltip placement="bottom" title={
							<pre>
				        学生在完成任务评测之前是否查看了参考答案
			      	</pre>
								}><span style={{cursor: "default"}}>未查看</span> </Tooltip>}
						</span>
					)
				}
			},
			{
				title: '经验值',
				key: 'empvalue',
				dataIndex: 'empvalue',

				render: (text, record) => (
					<span>
					 <span style={{color: '#29BD8B'}}>{record.empvalue.myself}</span><span
						className={"color-grey-9"}>/{record.empvalue.experience}</span>
        </span>
				),
			}, {
				title: '关卡得分',
				key: 'game_scores',
				dataIndex: 'game_scores',
				render: (text, record) => (
					<span>
					<Tooltip placement="bottom" title={
						<pre>
					关卡得分：{record.game_scores.game_score}/关卡满分：{record.game_scores.game_score_full}
				</pre>
					}>
						<span style={{color: '#29BD8B'}}>{record.game_scores.game_score}</span><span
						className={"color-grey-9"}>/{record.game_scores.game_score_full}</span>
					</Tooltip>
        </span>
				),
			}, {
				title: '调分',
				key: 'adjustmentminute',
				dataIndex: 'adjustmentminute',

				render: (text, record) => (
					<span>
			       <a><InputNumber size="small" className={customsids === record.challenge_id.id ? "bor-red" : ""}
														 defaultValue={record.game_scores.game_score}
														 onBlur={(e) => this.editgame_scores(e, record.challenge_id.id, record.game_scores.game_score_full)}
							 // min={0} max={record.game_scores.game_score_full}
						 /></a>
						{/*<a style={{textAlign: "center"}} className="color-blue font-14 mr20">查看</a>*/}
        </span>
				),
			}, {
				title: '操作',
				key: 'operation',
				dataIndex: 'operation',

				render: (text, record) => (
					<span>

			     <a
						 className=" color-blue font-14 fr mr22"
						 onClick={() => this.props.showAppraiseModal("child", record.challenge_id.id, record.challenge_comment, record.challenge_comment_hidden)}
					 >评阅</a>
        </span>
				),
			}];


		if (this.props.isAdmin() === false) {
			columns.some((item, key) => {
					if (item.title === "调分") {
						columns.splice(key, 1)
						return true
					}
				}
			)
			columns.some((item, key) => {
					if (item.title === "操作") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}
		return (
			<div>
				{/*{data===undefined?"":""}*/}

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

					.tasknameboxs{
				    width: 50px;
						height: 24px;
						border: 1px solid rgba(221,23,23,1);
						color: rgba(221,23,23,1);
						border-radius: 12px;
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
					.tasknameName:link{color:#676767}
					.tasknameName:hover{color:#4CACFF}
					.tasknameName{
					     overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
				        max-width: 225px;
						    text-align: left !important;
					}
					.TaskForms{
					   max-width: 260px;
					   text-align: left !important;
					   padding: 16px !important;
					}
				  .TaskForms.ant-table-header-column{
						width: 100%;
						text-align: center;
				  }
				  .ant-input-number{
					  // margin-right: 20px;
						border-radius: 0px;
						width: 66px;
					}
					.linhe15{
					    line-height: 15px;
					}
					.mr22{
					    margin-right: 22px;
					}
			`}
				</style>
				{datas === undefined ? "" : <Table
					dataSource={datas}
					columns={columns}
					pagination={false}
					// loading={loadingstate}
					// onChange={this.TablePagination}
				/>}
			</div>

		)
	}
}

export default OfficialAcademicTranscript;