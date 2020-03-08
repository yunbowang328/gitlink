import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table,Tooltip} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';

class ConclusionEvaluation extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {

	}

	render() {
		let {data}=this.props;

		let columns=[{
			title: '总评',
			dataIndex: 'type',
			key: 'type',
			render: (text, record) => (
			<span style={{color:'#FF6800'}}>{record.type}</span>
			),
		}, {
			title:'获得经验值',
			dataIndex: 'empirical',
			key: 'empirical',
			render: (text, record) => (
				<span>
		       <span style={{color:'#FF6800'}}>{record.empirical.minute}</span><span className={"color-grey-9"}>/{record.empirical.total}</span>
				</span>
			),
		}, {
			title: '关卡得分',
			dataIndex: 'challenge_scores',
			key: 'challenge_scores',
			render: (text, record) => (
				<span>
				  <Tooltip placement="bottom" title={
						<pre>
							分数：{record.challenge_scores.challenge_score}/总分：{record.challenge_scores.challenge_score_full}
						</pre>
					}>
		        <span style={{color:'#FF6800'}}>{record.challenge_scores.challenge_score}</span><span className={"color-grey-9"}>/{record.challenge_scores.challenge_score_full}</span>
          </Tooltip>
				</span>
			),
		},
			{
				title: '效率分',
				dataIndex: 'eff_scores',
				key: 'eff_scores',
				render: (text, record) => (
					<span>
				  <Tooltip placement="bottom" title={
						<pre>
							分数：{record.eff_scores.eff_score}/总分：{record.eff_scores.eff_score_full}
						</pre>
					}>
		        <span style={{color:'#FF6800'}}>{record.eff_scores.eff_score}</span><span className={"color-grey-9"}>/{record.eff_scores.eff_score_full}</span>
          </Tooltip>
				</span>
				),
			},{
			title: '当前成绩',
			dataIndex: 'grade',
			key: 'grade',
			render: (text, record) => (
				<span>
				  <Tooltip placement="bottom" title={
				  	<pre>
							分数：{record.grade.minute}/总分：{record.grade.total}
						</pre>
					}>
		        <span style={{color:'#FF6800'}}>{record.grade.minute}</span><span className={"color-grey-9"}>/{record.grade.total}</span>
          </Tooltip>
				</span>
			),
		}, {
			title: '实战总耗时',
			key: 'elapsed',
			dataIndex: 'elapsed',

			render: (text, record) => (
				<span  className={"color-grey-9"}>
					{record.elapsed}
        </span>
			),
		}, {
			title: '评测次数',
			key: 'time',
			dataIndex: 'time',
			render: (text, record) => (
				<span>
          {record.time}
        </span>
			),
		}];

		let datas=[];

		if(data&&data.eff_score_full===undefined){

			columns.some((item,key)=> {
					if (item.title === "关卡得分") {
						columns.splice(key, 1)
						return true
					}
				}
			)
			columns.some((item,key)=> {
					if (item.title === "效率分") {
						columns.splice(key, 1)
						return true
					}
				}
			)
		}
		datas.push({
			type: data&&data.overall_appraisal,
			empirical: {minute:data&&data.myself_experience,total:data&&data.total_experience},
			grade: {minute:data&&data.work_score,total:data&&data.all_work_score},
			elapsed: data&&data.time_consuming,
			time:data&&data.evaluate_count,
			eff_scores:{eff_score:data&&data.eff_score,eff_score_full:data&&data.eff_score_full},
			challenge_scores:{challenge_score:data&&data.challenge_score,challenge_score_full:data&&data.challenge_score_full}
		})
		return (
			<div>
				{/*{data===undefined?"":""}*/}
				<style>{`
				.ant-table-thead > tr > th{
				    text-align: center;
				    font-weight: 300;
					}
					.ant-table-tbody > tr > td{
            text-align: center;
            padding: 0px;
					}
					.ant-table-tbody > tr{
					   height:64px;
					}
					// .Tablebox .ant-table-body table .ant-table-tbody > tr > td{
		      //   border: none;
					// }

			   .Tablebox .ant-table-body table .ant-table-thead > tr > th{
	            background: #fff;
	            border-bottom: 3px solid #fafafa !important;
					}
				`}</style>
				<Table
					className={"Tablebox"}
				  dataSource={datas}
					columns={columns}
				  pagination={false}
					// onChange={this.TablePagination}
				/>
			</div>

		)
	}
}

export default ConclusionEvaluation;