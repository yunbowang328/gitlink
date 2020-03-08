import React , { Component } from "react";
import {Link} from 'react-router-dom';
import { Input ,Dropdown , Menu , Icon , Pagination , Spin } from 'antd';
import './merge.css';

import NoneData from '../../modules/courses/coursesPublic/NoneData';
import Nav from '../Order/Nav';
import OrderItem from './MergeItem';


import axios from 'axios';

const Search = Input.Search;
/**
 * issue_chosen:下拉的筛选列表,
 * data:列表接口返回的所有数据,
 * issues:列表数组,
 * isSpin:加载中,
 * search:搜索关键字,
 * author_id:发布者id,
 * assigned_to_id:指派给。。。的id，
 * limit:每页条数,
 * page:当前页,
 * search_count:列表总条数
 * issue_type:搜索条件
 */
class merge extends Component{
  constructor(props){
    super(props);
    this.state={
      issue_chosen:undefined,
      data:undefined,
      issues:undefined,
      isSpin:false,
      search:undefined,
      author_id:undefined,
      assigned_to_id:undefined,
      limit:15,
      page:1,
      search_count:undefined,
      issue_type:undefined,
      status_type:'1',
      //设置选择高亮
      openselect:1,
      closeselect:undefined,
      issue_tag_ids:'标签',
      fixed_version_ids:'里程碑',
      assigned_to_ids:'指派人',
      paix:'排序'

    }
  }

  componentDidMount=()=>{
    this.getSelectList();
    this.getIssueList();
  }

  getSelectList=()=>{
    const { projectsId } = this.props.match.params;

    const url = `/projects/${projectsId}/issues/index_chosen.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          issue_chosen:result.data.issue_chosen
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 获取列表数据
  getIssueList=(page,limit,search,author_id,assigned_to_id,status_type,id,value,order_type,order_name)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/pull_requests.json`;
    axios.get(url,{
      params:{
        page,limit,search,author_id,assigned_to_id,status_type,order_type,order_name,
        [id]:value
      }
    }).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
          issues:result.data.issues,
          search_count:result.data.search_count,
          isSpin:false
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  getOption=(e,id,name)=>{
    if(id+'s'==="issue_tag_ids"){
      this.setState({
        [id]:e.key,
        issue_tag_ids:name
      })
    }
    if(id+'s'==="fixed_version_ids"){
      this.setState({
        [id]:e.key,
        fixed_version_ids:name 
      })
    }
    if(id+'s'==="assigned_to_ids"){
      this.setState({
        [id]:e.key,
        assigned_to_ids:name
      })
    }
    this.setState({
      [id]:e.key
    })
    const { page,limit,search,author_id,assigned_to_id,status_type } = this.state;
    if(e.key==="all"){
      this.getIssueList(page,limit,search,author_id,assigned_to_id,status_type,id);
    }else{
      this.getIssueList(page,limit,search,author_id,assigned_to_id,status_type,id,e.key);
    }
  }

  renderMenu =(array,name,id)=>{
    return(
      <Menu>
        <Menu.Item key={"all"} onClick={(e)=>this.getOption(e,id,name)}>{name}</Menu.Item>
        {
          array && array.length > 0 && array.map((item,key)=>{
            return(
              <Menu.Item key={item.id} onClick={(e)=>this.getOption(e,id,item.name)}>{item.name}</Menu.Item>
            )
          })
        }
      </Menu>
    )
  }

  // 翻页
  ChangePage=(page)=>{
    this.setState({
      page,
      isSpin:true
    })
    const {limit,search,status_type,author_id, assigned_to_id} =  this.state;
    this.getIssueList(page,limit,search,author_id,assigned_to_id,status_type);
  }

  // 搜索
  searchFunc=(value)=>{
    this.setState({
      search:value,
      isSpin:true
    })
    const {page,limit,status_type,author_id, assigned_to_id} =  this.state;
    this.getIssueList(page,limit,value,author_id,assigned_to_id,status_type);
  }

  openorder=(type)=>{
    if(type){

      const { current_user } = this.props;
      if(type===1){
        this.setState({
          status_type:'1',
          openselect:current_user.user_id,
          closeselect:undefined,
          issue_tag_ids:'标签',
          fixed_version_ids:'里程碑',
          assigned_to_ids:'指派人',
          paix:'排序'
        })
        this.getIssueList("","","","","",1,"");

      }else{
        this.setState({
          status_type:'2',
          openselect:undefined,
          closeselect:current_user.user_id,
          issue_tag_ids:'标签',
          fixed_version_ids:'里程碑',
          assigned_to_ids:'指派人',
          paix:'排序'
        })
        this.getIssueList("","","","","",2,"");
      }
    }
  }

 
  arrayList=(e)=>{
    const { limit, search,status_type,author_id, assigned_to_id} = this.state;
    if(e.key==='created_on'){
      if(e.item.props.value==="desc"){
        this.setState({
         paix:'最新创建'
        })
      }else{
        this.setState({
          paix:'最早创建'
        })
      }
    }else{
      if(e.item.props.value==="desc"){
        this.setState({
          paix:'最新更新'
        })
      }else{
        this.setState({
          paix:'最早更新'
        })
      }
    }

    this.setState({
      order_name:e.key,
      order_type:e.item.props.value
    })
    this.getIssueList(1,limit,search,author_id,assigned_to_id,status_type,undefined,undefined, e.item.props.value,e.key);
  }

  render(){

    const { issue_chosen , issues , limit , page , search_count , data  , isSpin,openselect,closeselect } = this.state;
    const { projectsId } = this.props.match.params;

    const menu = (
      <Menu onClick={(e)=>this.arrayList(e)}>
        <Menu.Item key={'created_on'} value="desc">最新创建</Menu.Item>
        <Menu.Item key={'created_on'} value="asc">最早创建</Menu.Item>
        <Menu.Item key={'updated_on'} value="desc">最新更新</Menu.Item>
        <Menu.Item key={'updated_on'} value="asc">最早更新</Menu.Item>
      </Menu>
    )

    const Paginations = (
      <React.Fragment>
        {
          search_count > limit ?
          <div className="mt30 mb50 edu-txt-center">
            <Pagination simple defaultCurrent={page} total={search_count} pageSize={limit} onChange={this.ChangePage}></Pagination>
          </div>:""
        }
      </React.Fragment>
    )
    return(
      <div className="main">
        <div className="topWrapper">
          <Nav  {...this.props} {...this.state}/>
          <Link to={`/projects/${projectsId}/merge/new`} className="topWrapper_btn">创建合并请求</Link>
        </div>
        <div className="topWrapper" style={{borderBottom:"none"}}>
          <p className="topWrapper_type">
            <li className={openselect ? "active":""} onClick={()=>this.openorder(1)}>{data && data.open_count}个开启中</li>
            <li className={closeselect ? "active":""} onClick={()=>this.openorder(2)}>{data && data.close_count}个已关闭</li>
            {/* <span onClick={this.openorder} className={author_id ? "active":""}>{data && data.open_count}个开启中</span>
            <span onClick={this.closeorder} className={author_id ? "active":""}>{data && data.close_count}个已关闭</span> */}
          </p>
          <div>
            <Search
              placeholder="搜索"
              enterButton
              onSearch={this.searchFunc}
              style={{ width: 300 }}
            />
          </div>
        </div>
        <Spin spinning={isSpin}>
          <div className="f-wrap-between mb20">
            <ul >
              <li>   </li>
            </ul>
            <ul className="topWrapper_select">
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.issue_tag,'标签','issue_tag_id')} trigger={['click']} placement="bottomCenter">
                <span>{this.state.issue_tag_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.issue_version,'里程碑','fixed_version_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.fixed_version_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.assign_user,'指派人','assigned_to_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.assigned_to_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
         
              <li>
              <Dropdown className="topWrapperSelect" overlay={menu} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.paix}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
            </ul>
          </div>
          {
            search_count === 0 ?
            <NoneData></NoneData>
            :
            <OrderItem issues={issues} search_count={search_count} page={page} limit={limit} {...this.props} {...this.state}></OrderItem>
          }
          { Paginations }
        </Spin>
        
    </div>
    )
  }
}
export default merge;