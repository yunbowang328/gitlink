import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';

class OfficialAcademicTranscript extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loadingstate:true,
			datas:undefined
		}
	}

	componentDidMount() {

	}

	render() {

		let {data}=this.props;
		let datas=[];
		// data&&data.exercise_counts.forEach((item,key)=>{	})

			datas.push({
				commit_percent:data&&data.exercise_counts.commit_percent,
				min_score:data&&data.exercise_counts.min_score,
				max_score:data&&data.exercise_counts.max_score,
				average_score:data&&data.exercise_counts.average_score,
				fail_counts:data&&data.exercise_counts.fail_counts,
				pass_counts:data&&data.exercise_counts.pass_counts,
				good_counts:data&&data.exercise_counts.good_counts,
				best_counts:data&&data.exercise_counts.best_counts,
			})



		let columns=[{
			title: '提交率',
			dataIndex: 'commit_percent',
			key: 'commit_percent',
			render: (text, record) => (
				<span style={{color:'#333333'}}>
					{record.commit_percent===0?0:(record.commit_percent*100).toFixed(2)}<span className={"font-size12"}>%</span>
        </span>
			),
		}, {
			title: '最低分',
			dataIndex: 'min_score',
			key: 'min_score',
			render: (text, record) => (
				<span>
            <span style={{color:'#333333'}}>{record.min_score}<span className={"font-size12"}>分</span></span>
        </span>
			),
		}, {
			title: '最高分',
			dataIndex: 'max_score',
			key: 'max_score',
			render: (text, record) => (
				<span style={{color:'#FF6800'}}>
					{record.max_score}<span className={"font-size12"}>分</span>
        </span>
			),
		}, {
			title: '平均分',
			key: 'average_score',
			dataIndex: 'average_score',

			render: (text, record) => (
				<span style={{color:'#333333'}}>
           	{record.average_score}<span className={"font-size12"}>分</span>
        </span>
			),
		}, {
			title: '不及格（得分 低于60%）',
			key: 'fail_counts',
			dataIndex: 'fail_counts',
			render: (text, record) => (
				<span style={{color:'#333333'}}>
         	{record.fail_counts}<span className={"font-size12"}>人</span>
        </span>
			),
		}, {
			title: '及格（得分 60%~70%）',
			key: 'pass_counts',
			dataIndex: 'pass_counts',

			render: (text, record) => (
				<span style={{color:'#333333'}}>
					  {record.pass_counts}<span className={"font-size12"}>人</span>
        </span>
			),
		}, {
			title: '良好（得分 70%~90%）',
			key: 'good_counts',
			dataIndex: 'good_counts',

			render: (text, record) => (
				<span>
					 <span style={{color:'#333333'}}>{record.good_counts}<span className={"font-size12"}>人</span></span>
        </span>
			),
		}, {
			title: '优秀（得分 90%~100%）',
			key: 'best_counts',
			dataIndex: 'best_counts',

			render: (text, record) => (
				<span>
					 <span style={{color:'#FF6800'}}>{record.best_counts}<span className={"font-size12"}>人</span></span>
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
					   color: #666666 !important;
					   background:rgba(237,237,237,1) !important;
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
					   text-align: center;
					}

					.exerctabel .ant-table-tbody > tr >td{
					  border:1px solid transparent;
					}
					.exerctabel .ant-table-thead > tr > th {
							 background: #fff !important;
							 border-top: 1px solid #F4F4F4;
               border-bottom: 1px solid #F4F4F4 !important;

					}

			`}
				</style>
				{datas===undefined?"":<Table
					className={"exerctabel"}
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