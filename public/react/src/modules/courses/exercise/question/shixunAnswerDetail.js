import React,{ Component } from "react";
import {Table} from "antd";
import TPMMDEditor from '../../../../modules/tpm/challengesnew/TPMMDEditor'


class shixunAnswerDetail extends Component{
  constructor(props){
      super(props);
  }
  render(){

    let { challenge }=this.props;
    
		let columns=[{
			title: '评测次数',
			dataIndex: 'number',
			width:"127px",
			key: 'number',
			className:"edu-txt-center",
			render: (text, record) => (
				<span>
           {record.number || "--"}
        </span>
			),
		}, {
			title: '详细信息',
			dataIndex: 'name',
			key: 'name',
			className:challenge && challenge.length > 0 ? "" : "edu-txt-center",
			render: (text, record) => (
				<span>
            {record.name || "--"}
        </span>
			),
		}];

    let datas=[];
    challenge && challenge.length > 0 ? challenge.map((item,key)=>{
	    datas.push({
		     number: item.position || "--",
		     name: item.output_detail || "--"
	    })
		})
		:
		datas.push({
			number:"--",
			name:"--"
	  })
		return (
			<div>
				<style>{`
				.ant-table-thead > tr > th{
				    text-align: center;
					}

				`}</style>
				{
					datas ? 
					<Table
						bordered
						dataSource={datas}
						columns={columns}
						pagination={false}
					/>:""
				}
        
			</div>

		)
  }
}
export default shixunAnswerDetail;