import React , { Component } from 'react';
import { Table , Spin } from 'antd';
import { getImageUrl } from 'educoder';
import SelectBranch from '../Branch/SelectBranch';
import Top from './DetailTop';

import axios from 'axios';

class CoderRootCommit extends Component{
  constructor(props){
    super(props)
    this.state={
      branch:"master",
      data:undefined,
      dataCount:undefined,
      limit:50,
      page:1,
      isSpin:false
    }
  }

  componentDidMount=()=>{
    const { branch , page , limit } = this.state;
    this.setState({
      isSpin:true
    })
    this.getCommitList( branch , page , limit );
  }

  getCommitList=(branch , page , limit)=>{
    const { login } = this.props.current_user;
    const { projectsId } = this.props.match.params;
    const url = `/${login}/${projectsId}/commits.json`;
    axios.get(url,{
      params:{
        sha:branch,
        page,
        limit
      }
    }).then((result)=>{
      if(result){
        const array = [];
        result.data && result.data.commits.length > 0 && result.data.commits.map((item,key)=>{
          array.push({
            name:item.author && item.author.name,
            image_url:item.author && item.author.image_url,
            sha:item.sha,
            time_from_now:item.time_from_now,
            message:item.message
          })
        })
        this.setState({
          data:array,
          dataCount:result.data.total_count,
          isSpin:false
        })
      }
    }).catch((error)=>{console.log(error)})
  }

  // 切换分支
  changeBranch=(value)=>{
    const { branchList } = this.props;
    let branchLastCommit = branchList[parseInt(value.key)];

    const { page , limit } = this.state;
    this.setState({
      isSpin:true,
      branch:branchLastCommit.name,
    })
    this.getCommitList(branchLastCommit.name , page , limit);
  }

  ChangePage=(page)=>{
    const { branch , limit } = this.state;
    this.getCommitList(branch , page , limit);
  }

  render(){
    const { branch , data , dataCount , limit , page , isSpin } = this.state;
    const { branchs } = this.props;
    const columns=[{
      title:"作者",
      dataIndex: 'name',
      width:"10%",
      render: (text,item) => (
        <span className="f-wrap-alignCenter">
          <img src={getImageUrl(`images/${item.image_url}`)} alt="" width="28px" height="28px" className="mr3 radius"/>
          <label className="hide-1" style={{maxWidth:"75px"}}>{text}</label>
        </span>
      ),
    },{
      title:"SHA",
      dataIndex: 'sha',
      render: (text) => (
        <span className="commitKey">{text}</span>
      )
    },{
      title:"备注",
      dataIndex: 'message',
      render: (text) => (
        <span>{text}</span>
      )
    },{
      title:"提交时间",
      className:"edu-txt-right",
      dataIndex: 'time_from_now',
      render: (text) => (
        <span>{text}</span>
      )
    }]

    const title =()=>{
      return(
        <div className="f-wrap-between" style={{alignItems:"center"}}>
          <span className="font-16">{dataCount}次提交代码({branch})</span>
          {/* <div className="f-wrap-alignCenter">
            <Input placeholder="搜索提交历史" style={{width:"300px"}}/>
            <Checkbox className="ml15">所有分支</Checkbox>
            <a className="btn_32 ml15">搜索</a>
          </div> */}
        </div>
      )
    }

    const Pagination =()=> {
      if(dataCount > limit){
        return( 
          <div className="edu-txt-center pt30 mb30">
            <Pagination simple defaultCurrent={page} total={dataCount} pageSize={limit} onChange={this.ChangePage}></Pagination>
          </div>
        )
      }
    }
    return(
      <div>
        <Top { ...this.props } {...this.state} />
        <div className="f-wrap-between mt20">
          <SelectBranch branch={branch} branchs={branchs} changeBranch={this.changeBranch}></SelectBranch>
        </div>
        <Spin spinning={isSpin}>
          <Table
            className="mt20 wrap-commit-table"
            columns={columns}
            dataSource={data}
            showHeader={false}
            size="small"
            pagination={false}
            title={() => title()}
          />
          { Pagination() }
        </Spin>
      </div>
    )
  }
}
export default CoderRootCommit;