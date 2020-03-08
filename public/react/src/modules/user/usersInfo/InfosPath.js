import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Tooltip, Menu, Pagination, Spin, Dropdown} from 'antd';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import NoneData from '../../courses/coursesPublic/NoneData'
import axios from 'axios';
import {getImageUrl,setImagesUrl} from 'educoder';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../../courses/common/CNotificationHOC'
import "./usersInfo.css"

import Create from './publicCreatNew'

class InfosPath extends Component{
  constructor(props){
    super(props);
    this.state={
      category:undefined,
      page:1,
      status:undefined,
      per_page:16,
      isSpin:false,
      sort_by: "updated_at",
      sort_direction: "desc",
      totalCount:undefined,
      data:undefined
    }
  }

  componentDidMount=()=>{
    this.setState({
      isSpin:true
    })
    let {category, status, sort_by, page, per_page, sort_direction} = this.state;
    this.getCourses(category, status, sort_by, page, sort_direction);
  }

  getCourses = (category, status, sort_by, page, sort_direction) => {
    let url=`/users/${this.props.match.params.username}/subjects.json`;
    axios.get((url),{params:{
      category,
      status,
      sort_by,
      page,
        sort_direction,
      per_page:this.props.is_current && category && page ==1?17:16
    }}).then((result)=>{
      if(result){
        this.setState({
          totalCount:result.data.count,
          data:result.data,
          sort_by: sort_by,
          sort_direction: sort_direction,
          isSpin:false
        })
      }
    }).catch((error)=>{
      console.log(error);
      this.setState({
        isSpin: false
      })
    })
  }

  //切换种类
  changeCategory=(cate)=>{
    this.setState({
      category:cate,
      status:undefined,
      page:1,
      isSpin:true
    })
    let {sort_by, sort_direction} = this.state;
    this.getCourses(cate, undefined, sort_by, 1, sort_direction);
  }
  // 切换状态
  changeStatus=(status)=>{
    let {category, sort_by, sort_direction} = this.state;
    this.setState({
      status,
      page:1,
      isSpin:true
    })
    this.getCourses(category, status, sort_by, 1, sort_direction);
  }
  //切换页数
  changePage=(page)=>{
    this.setState({
      page,
      isSpin:true
    })
    let {category, sort_by, status, sort_direction} = this.state;
    this.getCourses(category, status, sort_by, page, sort_direction);
  }

  // 进入课堂
  turnToCourses=(url)=>{
    this.props.history.push(url);
  }


  // 切换排序方式
  changeOrder= (sort)=>{
    this.setState({
      sort_by:sort,
      isSpin:true
    })
    let {category, status, page, sort_direction} = this.state;
    this.getCourses(category, status, sort, page, sort_direction);
  }


  //切换种类
  updatedlist(sort_by) {
    //按照什么样子排序
    this.setState({
      isSpin: true
    });
    let {category, status, page, sort_direction} = this.state;
    this.getCourses(category, status, sort_by, 1, "desc");
  }

  //排序
  updatedlists(sort_directions) {
    //是否是倒序
    this.setState({
      isSpin: true
    });
    let {category, status, page, sort_by, sort_direction} = this.state;
    let sort_directiony = sort_directions;
    if (sort_directions === "asc") {
      if (sort_directions === sort_direction) {
        sort_directiony = "desc"
      }
    } else if (sort_directions === "desc") {
      if (sort_directions === sort_direction) {
        sort_directiony = "asc"
      }
    }

    this.getCourses(category, status, sort_by, page, sort_directiony);
  }


  render(){
    let{
      category,
      status,
      sort_by,
      sort_direction,
      page,
      data,
      totalCount,
      isSpin
    } = this.state;
    let isStudent = this.props.isStudent();
    let  is_current=this.props.is_current;
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.updatedlist("updated_at")}>
          最近更新
        </Menu.Item>
        <Menu.Item onClick={() => this.updatedlist("created_at")}>
          最新创建
        </Menu.Item>

      </Menu>
    );

    // console.log(this.props.user&&this.props.user.main_site)
    return(
      <div className="educontent">
        <Spin size="large" spinning={isSpin}>
          <style>
            {
              `
             .whitepanelyslli {
                width: 32px !important;
             height: 48px !important;
              line-height: 46px !important;
             }
              .whitepanelyslliss {
                width: 32px !important;
                  height: 48px !important;
              line-height: 46px !important;
             }
            
              .whitepanelysllis {
             width: 66px !important;
              height: 48px !important;
              line-height: 46px !important;
              margin-left: 40px !important;
              }
              
                 .whitepanelysllisyt {
             width: 60px !important;
              height: 48px !important;
              line-height: 46px !important;
              margin-left: 40px !important;
              }
              
              
              .white-panel li.active {
                  border-radius: 24px;
                  border: none !important;
                  color: #4CACFF;
              }
              
            
              
              `
            }
          </style>
          <div className="white-panel edu-back-white pt20 pb20 clearfix ">
            <li className={category ? " font-16 whitepanelyslli" : "active font-16 whitepanelyslli"}><a
              href="javascript:void(0)" onClick={() => this.changeCategory()} className="font-16 w32">全部</a></li>
            <li className={category == "manage" ? "active font-16 whitepanelysllis" : "font-16 whitepanelysllis"}><a
              href="javascript:void(0)" onClick={() => this.changeCategory("manage")}
              className={is_current ? "font-16 w66" : "font-16 w80"}>{is_current ? "我" : "TA"}管理的</a></li>
            <li className={category == "study" ? "active font-16 whitepanelysllis" : "font-16 whitepanelysllis"}><a
              href="javascript:void(0)" onClick={() => this.changeCategory("study")}
              className={is_current ? "font-16 w66" : "font-16 w80"}>{is_current ? "我" : "TA"}学习的</a></li>
          </div>

          <style>
            {
              `  .secondNavs li {
                color: #676767;
                /* margin: 0px 20px; */
                float: left;
             }
             .secondNavs li a:hover{
             color: #4CACFF
             }
             .secondNavs li.active a{
             color: #4CACFF
             }
             `
            }
          </style>
        {
          category && category == "manage" && is_current &&
          <div className="edu-back-white padding10-30 clearfix secondNavs bor-top-greyE">
            <li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a href="javascript:void(0)"
                                                                                         onClick={() => this.changeStatus()}
                                                                                         className="w32">全部</a></li>
            <li className={status == "editing" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("editing")} className="w60">编辑中</a></li>
            <li className={status == "applying" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("applying")} className="w60">待审核</a></li>
            <li className={status == "published" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("published")} className="w60">已发布</a></li>
            <li className={status == "publiced" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              onClick={() => this.changeStatus("publiced")} className="w60" href="javascript:void(0)">已公开</a></li>
          </div>
        }
        {
          category && category == "study" && is_current &&
          <div className="edu-back-white padding10-30 clearfix secondNavs bor-top-greyE">
            <li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a href="javascript:void(0)"
                                                                                         onClick={() => this.changeStatus()}
                                                                                         className="w32">全部</a></li>
            <li className={status == "unfinished" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("unfinished")} className="w60">未完成</a></li>
            <li className={status == "finished" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("finished")} className="w60">已完成</a></li>
          </div>
        }
          <div className="clearfix font-12 " style={{
            lineHeight: "41px",
            marginTop: "10px",
          }}>
          <span className="fl color-grey-9">共参与{totalCount}个{category?category=="manage"?"发布":"学习":"实践课程"}</span>
            <sapn className="relativef color-grey-9 fr"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "40px",
                    lineHeight: "40px",
                  }}
            >
            <span
              style={{
                flexDirection: "column",
                textAlign: "center",
                height: "10px",
                lineHeight: "10px",
                display: "table",
                marginTop: "9px",
              }}
            >
                 <i className={sort_direction === "asc" ?
                   "iconfont icon-sanjiaoxing-up font-12  color-blue h10 " : "iconfont icon-sanjiaoxing-up font-12 h10"}
                    onClick={() => this.updatedlists("asc")}></i>

            </span>

              <span
                style={{
                  flexDirection: "column",
                  height: "10px",
                  lineHeight: "10px",
                  textAlign: "center",
                  display: "table",
                }}
              >
                          <i className={sort_direction === "desc" ?
                            "iconfont icon-sanjiaoxing-down font-12 yslbottomsj color-blue h10" : "iconfont icon-sanjiaoxing-down font-12 yslbottomsj h10"}
                             onClick={() => this.updatedlists("desc")}></i>
            </span>
            </sapn>
            <Dropdown overlay={menu}>
										<span className="fr color-grey-9 mr10 pointer " style={{
                      display: "flex",
                      flexDirection: "initial",
                    }}>
											<span>{sort_by === "updated_at" ? '最近更新' : sort_by === "created_at" ? '最新创建' : ""}</span>

										</span>
            </Dropdown>
        </div>
          <style>
            {
              `
							.square-list{width: 100%;box-sizing: border-box;margin-top:10px}
							`
            }
          </style>
        <div className="square-list clearfix">
          {/* 295 */}
          {
            this.props.user&&this.props.user.main_site===true?page == 1 && is_current && !category ? <Create href={"/paths/new"} name={"新建实践课程"} index="3"></Create>:"":""
          }
          {
            this.props.user&&this.props.user.main_site===false?this.props.user&&this.props.user.admin===true||this.props.user&&this.props.user.is_teacher===true||this.props.user&&this.props.user.business===true?page == 1 && is_current && !category ? <Create href={"/paths/new"} name={"新建实践课程"} index="3"></Create>:"":"":""
          }
          {
            (!data || (data && data.subjects.length==0)) && category && <NoneData></NoneData>
          }
          {
            data && data.subjects && data.subjects.map((item,key)=>{
              return(
                <div className="square-Item" style={{height:"295px"}} onClick={()=>this.turnToCourses(`/paths/${item.id}`)}>
                  {
                    item.tag && <div className="tag-green"><span className="tag-name">{item.tag}</span>
											{/*<img src={setImagesUrl("images/educoder/tag2.png")} className="fl"/>*/}
                    </div>
                  }
                  <a href="javascript:void(0)" className="square-img"><img alt="Subject12" src={getImageUrl(`${item.image_url}`)}/></a>
                  <div className="square-main">
                    <p className="task-hide">
                      <a href="javascript:void(0)" className="justify color-grey-name "
                      >{item.name}</a>
                    </p>
                    <div className="mt10">
                      <p className="color-grey-6 clearfix">
                        <a href="javascript:void(0)" className="fl color-grey-9 overflowHidden1"
                            title={item.owner_name.length > 12 ? item.owner_name : ''}  style={{ maxWidth: '175px'}}
                        >{item.owner_name}</a>
                        <span className="fr squareIconSpan">
                          <Tooltip placement='bottom' title="访问量">
                            <i className="iconfont icon-liulanyan fl mr5"></i>
                          </Tooltip>
                          {item.visits_count}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          totalCount > 15 &&
          <div className="mt30 mb50 edu-txt-center">
            <Pagination showQuickJumper total={totalCount} onChange={this.changePage} pageSize={16} current={page}/>
          </div>
        }
        </Spin>
      </div>
    )
  }
}
export default InfosPath;
