import React, { Component } from 'react';


class GtopicBanks extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount = () =>{
    let bankId = this.props.match.params.bankId
    const crumbData={
      title:'MySQL数据库编程开发实训（基础篇）111',
      is_public:true,
      crumbArray:[
        {content:'详情'},
      ]
    }
    const menuData={
      tab:'0',//tab选中的index
      menuArray:[//tab以及tab路由
        {to:'/banks/gtopic/1',content:'内容详情'},
        // {to:'/banks/gtopic/1/answer',content:'参考答案'},
      ],
      category:'topic',//毕设选题
      id:bankId,
      is_public:true,
    }
    this.props.initPublic(crumbData,menuData);
  }
  render(){
    return(
      <div>
        
      </div>
    )
  }
}
export default GtopicBanks;