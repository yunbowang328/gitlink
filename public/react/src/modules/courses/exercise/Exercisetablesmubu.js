import React, {Component} from "react";
import {WordsBtn, MarkdownToHtml} from 'educoder';
import {Table,Progress} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';

const tagArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

class Exercisetablesmubus extends Component {

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

		let {data,type,effictive_counts,choicetype, tableNum}=this.props;
		let datas=[];

		data&&data.forEach((item,key)=>{
			datas.push({
				commit_percent:{
						num:item.choice_position,
						value:type===4||type===5?choicetype[item.choice_text-1]:item.choice_text,
						type:item.choice_right_boolean,
						_type: type
						},
				min_score:{value:item.choice_users_count,type:item.choice_right_boolean},
				max_score:item.choice_percent,
			})
		})
		datas.push({
			commit_percent: {num:null,value:"有效填写量"},
			min_score:{value:effictive_counts},
		})

		let columns=[]
     if(datas.length!=0){
		  columns=[{
			 title: '选项',
			 dataIndex: 'commit_percent',
			 key: 'commit_percent',
			 render: (text, record, index) => {
				const _content = <span style={{color:text.type===true? "#29BD8B":'#333333', width: '100%'}}>
					{text.value!="有效填写量"&&text.value!="wrong" && 
						<MarkdownToHtml content={text.value} selector={(tableNum+1) + '' + (index+1)}></MarkdownToHtml>
						}
				  	{text.value==="wrong" && "填写了错误答案" }
					{text.value==="有效填写量" && "有效填写量" }
					</span>
				return (
				
				(text._type === 0 || text._type === 1) ? <div style={{ display: 'flex'}}>
					{<span style={{ 'margin-right': '4px', 'margin-top': '-2px'}}>{tagArray[index]}.</span>}
				 	{_content}
				</div> : <React.Fragment>{_content}</React.Fragment>
				)
        
			 },
		 }, {
			 title: '小计',
			 dataIndex: 'min_score',
			 key: 'min_score',
			 align: 'center',
				width:'200px',
				render: (text, record) => (
				 <span>
            <span style={{color:text.type===true? "#29BD8B":'#333333'}}>{text.value}</span>
        </span>
			 ),
		 }, {
			 title: '百分比',
			 dataIndex: 'max_score',
			 key: 'max_score',
				align: 'center',
				width:'300px',
				render: (text, record) => (
				 <span style={{color:'#FF6800'}}>
					{record.max_score===undefined?"":<span>
						<div style={{
							float: 'left',
							width: '220px'
						}}><Progress
							strokeColor={{
								'0%': '#29BD8B',
								'100%': '#29BD8B',
							}}
							percent={(record.max_score*100).toFixed()} showInfo={false}/></div><div className={"fr"}>{(record.max_score*100).toFixed()}%</div></span>}
        </span>
			 ),
		 }];

	 }





		return (
			<div>
				<style>{`
					.Exermubu .ant-table-thead > tr > th {
							 background: #fff !important;
               border-bottom: 1px solid #F4F4F4 !important;
					}

					.Exermubu .ant-table-thead .ant-table-column-title{
								color:#999999;
					}

					.Exermubu .ant-table-tbody> tr > td{
         			border-bottom: transparent;
					}

			`}
				</style>
				
				{datas===undefined?"":<Table
					className={"Exermubu"}
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

export default Exercisetablesmubus;