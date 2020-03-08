import React , { Component } from "react";
import {Link} from 'react-router-dom';
import { Input ,Dropdown , Menu , Icon , Pagination , Spin } from 'antd';
import './order.css';

import NoneData from '../../modules/courses/coursesPublic/NoneData';
import Nav from './Nav';
import OrderItem from './OrderItem';


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
 * status_type: issue的关闭和开启，1表示开启中的，2表示关闭的
 */
class order extends Component{
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
      tracker_ids:'所有分类',
      author_ids:'发布人',
      assigned_to_ids:'指派人',
      priority_ids:'优先度',
      done_ratios:'完成度',
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
  getIssueList=(page,limit,search,author_id,assigned_to_id,status_type,id,value, order_name, order_type)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/issues.json`;
    axios.get(url,{
      params:{
        page,limit,search,author_id,assigned_to_id,status_type,order_name,order_type,
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
    if(id+'s'==="tracker_ids"){
      this.setState({
        [id]:e.key,
        tracker_ids:name
      })
    }
    if(id+'s'==="author_ids"){
      this.setState({
        [id]:e.key,
        author_ids:name
      })
    }
    if(id+'s'==="assigned_to_ids"){
      this.setState({
        [id]:e.key,
        assigned_to_ids:name
      })
    }
    if(id+'s'==="priority_ids"){
      this.setState({
        [id]:e.key,
        priority_ids:name
      })
    }
    if(id+'s'==="done_ratios"){
      this.setState({
        [id]:e.key,
        done_ratios:name
      })
    }
    if(e.key==="created_on"){
      if(e.item.props.value==="desc"){
        this.setState({
          [id]:e.key,
          paix:'最新创建'
        })
      }else{
        this.setState({
          [id]:e.key,
          paix:'最早创建'
        })
      }
    }else if(e.key==="updated_on"){
      if(e.item.props.value==="desc"){
        this.setState({
          [id]:e.key,
          paix:'最新更新'
        })
      }else{
        this.setState({
          [id]:e.key,
          paix:'最早更新'
        })
      }
    }

    this.setState({
      [id]:e.key,
    })
    const { page,limit,search,author_id,assigned_to_id,status_type } = this.state;
    if(e.key==="all"){
      this.getIssueList(page,limit,search,author_id,assigned_to_id,status_type,id,);
    }else if (e.key==="created_on" || e.key==="updated_on"){
      this.setState({
        order_name:e.key,
        order_type:e.item.props.value
      })
      this.getIssueList(page,limit,search,author_id,assigned_to_id,status_type,id,undefined,e.key, e.item.props.value);
    }
    else{
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
          tracker_ids:'所有分类',
          author_ids:'发布人',
          assigned_to_ids:'指派人',
          priority_ids:'优先度',
          done_ratios:'完成度',
          paix:'排序'
        })
        this.getIssueList("","","","","",1,"");

      }else{
        this.setState({
          status_type:'2',
          openselect:undefined,
          closeselect:current_user.user_id,
          issue_tag_ids:'标签',
          tracker_ids:'所有分类',
          author_ids:'发布人',
          assigned_to_ids:'指派人',
          priority_ids:'优先度',
          done_ratios:'完成度',
          paix:'排序'
        })
        this.getIssueList("","","","","",2,"");
      }
    }
  }

 

  // 筛选：全部、指派给我、由我创建
  ChangeAssign=(type)=>{
    const { limit, search,status_type} = this.state;
    this.setState({
      isSpin:true
    })
    if(type){
      const { current_user } = this.props;
      if(type===1){
        this.setState({
          page:1,
          author_id:undefined,
          assigned_to_id:current_user.user_id,
          issue_tag_ids:'标签',
          tracker_ids:'所有分类',
          author_ids:'发布人',
          assigned_to_ids:'指派人',
          priority_ids:'优先度',
          done_ratios:'完成度',
          paix:'排序'
        })
        this.getIssueList(1,limit,search,undefined,current_user.user_id,status_type);

      }else{
        this.setState({
          page:1,
          author_id:current_user.user_id,
          assigned_to_id:undefined,
          issue_tag_ids:'标签',
          tracker_ids:'所有分类',
          author_ids:'发布人',
          assigned_to_ids:'指派人',
          priority_ids:'优先度',
          done_ratios:'完成度',
          paix:'排序'
        })
        this.getIssueList(1,limit,search,current_user.user_id,undefined,status_type);
      }
    }else{
      this.setState({
        page:1,
        author_id:undefined,
        assigned_to_id:undefined,
        issue_tag_ids:'标签',
        tracker_ids:'所有分类',
        author_ids:'发布人',
        assigned_to_ids:'指派人',
        priority_ids:'优先度',
        done_ratios:'完成度',
        paix:'排序'
      })
      this.getIssueList(1,limit,search,undefined,undefined,status_type);
    }
  }

  render(){
    const { issue_chosen , issues , limit , page , search_count , data , assigned_to_id , author_id , isSpin,openselect,closeselect } = this.state;
    const { projectsId } = this.props.match.params;

    const menu = (
      <Menu onClick={(e)=>this.getOption(e)}>
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
          {
            data && data.user_admin_or_member ?
              <Link to={`/projects/${projectsId}/orders/new`} className="topWrapper_btn">创建工单</Link>
              : ''
          }

        </div>

        <div className="topWrapper" style={{borderBottom:"none"}}>
          <p className="topWrapper_type">
            <li className={openselect ? "active":""} onClick={()=>this.openorder(1)}>{data && data.open_count}个开启中</li>
            <li className={closeselect ? "active":""} onClick={()=>this.openorder(2)}>{data && data.close_count}个已关闭</li>
            {/* <span onClick={this.openorder} className={author_id ? "active":""}>{data && data.open_count}个开启中</span>
            <span onClick={this.closeorder} className={author_id ? "active":""}>{data && data.close_count}个已关闭</span> */}
          </p>
          <div className="target-detail-search">
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
            <ul className="topWrapper_type">
              <li className={!author_id && !assigned_to_id ? "active":""} onClick={()=>this.ChangeAssign()}>全部</li>
              <li className={assigned_to_id ? "active":""} onClick={()=>this.ChangeAssign(1)}>指派给我</li>
              <li className={author_id ? "active":""} onClick={()=>this.ChangeAssign(2)}>由我创建</li>
              {/* <li>@我的</li> */}
            </ul>
            <ul className="topWrapper_select">
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.issue_tag,'标签','issue_tag_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.issue_tag_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
              {/*<li>*/}
                {/*<Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.issue_type,'所有类型','issue_type')} trigger={['click']} placement="bottomCenter">*/}
                  {/*<span>类型<Icon type="caret-down" className="ml5" /></span>*/}
                {/*</Dropdown>*/}
              {/*</li>*/}
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.tracker,'所有分类','tracker_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.tracker_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.assign_user,'发布人','author_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.author_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.assign_user,'指派人','assigned_to_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.assigned_to_ids}<Icon type="caret-down" className="ml5" /></span>
                </Dropdown>
              </li>
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.priority,'优先度','priority_id')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.priority_ids}<Icon type="caret-down"  className="ml5"/></span>
                </Dropdown>
              </li>
              <li>
                <Dropdown className="topWrapperSelect" overlay={this.renderMenu(issue_chosen && issue_chosen.done_ratio,'完成度','done_ratio')} trigger={['click']} placement="bottomCenter">
                  <span>{this.state.done_ratios}<Icon type="caret-down" className="ml5" /></span>
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
export default order;