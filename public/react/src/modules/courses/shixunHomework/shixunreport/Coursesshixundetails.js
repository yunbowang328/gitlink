import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import {Table} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';

class Coursesshixundetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loadingstate:true
		}
	}

	componentDidMount() {

	}

	render() {
		let {data}=this.props;
		// console.log(data)
		let columns=[{
			title: '评测次数',
			dataIndex: 'number',
			width:"127px",
			key: 'number',
			render: (text, record) => (
				<span>
           {record.number}
        </span>
			),
		}, {
			title: '详细信息',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => (
				<span>
            {record.name}
        </span>
			),
		}];

		let datas=[];
     data&&data.forEach((item,key)=>{
	     datas.push({
		     number: item.position,
		     name: item.output_detail=== ""||item.output_detail===null?"暂无数据":item.output_detail

	     })
     })

		return (
			<div>
				<style>{`
				.ant-table-thead > tr > th{
				    text-align: center;
					}

				`}</style>
				{data&&data? data.length===0?"":<Table
					bordered
			    dataSource={datas}
					columns={columns}
					pagination={false}
					// loading={loadingstate}
					// onChange={this.TablePagination}
				/>:""}
			</div>

		)
	}
}

export default Coursesshixundetails;