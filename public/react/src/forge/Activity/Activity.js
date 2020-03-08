import React , { Component } from 'react';
import { Dropdown , Menu , Icon , Pagination} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../css/index.css';
import '../Branch/branch.css';
import './activity.css';

import ActivityItem from './ActivityItem';
import axios from 'axios';
const LIMIT = 15;
const ARRAY = [
  {
    id:1,
    name:'1天'
  },
  {
    id:3,
    name:'3天'
  },
  {
    id:7,
    name:'1周'
  },
  {
    id:30,
    name:'1个月'
  }
]
const dataformat="YYYY-MM-DD HH:mm";

class Activity extends Component{
  constructor(props){
    super(props);
    this.state={
      time:'1',
      type:undefined,
      state:undefined,
      page:1,

      data:undefined,
      project_trends:undefined
    }
  }
  componentDidMount=()=>{
    const { time,type,status,page } = this.state;
    this.getInfo(time,type,status,page);
  }

  getInfo =(time,type,status,page)=>{
    const { projectsId } = this.props.match.params;
    const url =  `/projects/${projectsId}/project_trends.json`;
    axios.get(url,{
      params:{
        time,type,status,page
      }
    }).then(result=>{
      if(result){
        this.setState({
          data:result.data,
          project_trends:result.data.project_trends
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  // 切换周期
  changeTime=(e)=>{
    this.setState({
      time:e.key
    })
    const { type,status,page } = this.state;
    this.getInfo(e.key,type,status,page);
  }
   //筛选
   changeTrends=(type,status)=>{
    this.setState({
      type,status
    })
    const {time,page}=this.state;
    this.getInfo(time,type,status,page);
   }
  // 分页
  ChangePage=(page)=>{
    this.setState({
      page
    })
    const { time,type,status } = this.state;
    this.getInfo(time,type,status,page);
  }
  render(){
    const { time , data , page , project_trends } = this.state;

    const menu = (
      <Menu>
        {
          ARRAY && ARRAY.map((item,key)=>{
            return(
              <Menu.Item key={item.id} onClick={this.changeTime}>{item.name}</Menu.Item>
            )
          })
        }
      </Menu>
    );

    
    const second_per = (parseInt(data && data.close_issues_count)/parseInt(data && data.issues_count)*100)+'%';

    const third_per = (parseInt(data && data.close_issues_count)/parseInt(data && data.issues_count)*100)+'%';
    const fourth_per = (parseInt(data && data.open_issues_count)/parseInt(data && data.issues_count)*100)+'%';
    return(
      <div className="main">
        
        <div className="normalBox">
          <div class="normalBox-title">概览</div>
          <div className="orderInfo">
            <div>
              <div className="percentLine prPercent">
                <p className="percent_purple" style={{width:'100%'}}></p>
                <p className="percent_green resetStyle" style={{width:`${second_per}`}}></p>
              </div>
              <span>{data && data.pr_all_count}合并请求</span>
            </div>
            <div>
              <div className="percentLine">
                <p className="percent_red" style={{width:`${third_per}`}}></p>
                <p className="percent_green" style={{width:`${fourth_per}`}}></p>
              </div>
              <span>{data && data.issues_count}工单</span>
            </div>
          </div>
          <ul className="percentBox">
            <li>
              <span className="purple">{data && data.pr_count}</span>
              <span className="change" onClick={()=>this.changeTrends("PullRequest","close")}>已合并请求</span>
            </li>
            <li>
              <span className="green">{data && data.new_pr_count}</span>
              <span className="change" onClick={()=>this.changeTrends("PullRequest","create")}>新合并请求</span>
            </li>
            <li>
              <span className="red">{data && data.close_issues_count}</span>
              <span className="change" onClick={()=>this.changeTrends("Issue","close")}>已关闭工单</span>
            </li>
            <li>
              <span className="green">{data && data.open_issues_count}</span>
              <span className="change" onClick={()=>this.changeTrends("Issue","create")}>创建的工单</span>
            </li>
          </ul>
        </div>
        <div className="df trendsTop mt20">
          <div className="branchDropdown f-wrap-alignCenter">
            <span className="color-grey-9 mr3">周期:</span>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
              <a className="ant-dropdown-link">
                {time} <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="activity_list">
          {
            project_trends && project_trends.map((item,key)=>{
              return(
                <ActivityItem item={item} {...this.props} ></ActivityItem>
              )
            })
          }
        </div>
        {
          data && data.project_trends_size > 0 && data.project_trends_size > LIMIT &&
          <div className="pageDIV">
            <Pagination showQuickJumper defaultCurrent={page} total={data && data.project_trends_size} pageSize={LIMIT} onChange={this.ChangePage}></Pagination>
          </div>
        }
      </div>
    )
  }
}
export default Activity;