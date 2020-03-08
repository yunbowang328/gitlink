import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Tooltip, Menu, Pagination, Spin, Dropdown} from 'antd';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import axios from 'axios';
import NoneData from '../../courses/coursesPublic/NoneData'
import {getImageUrl} from 'educoder';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../../courses/common/CNotificationHOC'
import "./usersInfo.css"
import Create from './publicCreatNew'

class InfosCourse extends Component{
  constructor(props){
    super(props);
    this.state={
      category:undefined,
      status:undefined,
      page:1,
      per_page:16,
      sort_by: "updated_at",
      sort_direction: "desc",
      totalCount:undefined,
      data:undefined,
      isSpin:false
    }
  }

  componentDidMount=()=>{
    this.setState({
      isSpin:true
    })
    let {category, status, page, sort_by, sort_direction} = this.state;
    this.getCourses(category, status, page, sort_by, sort_direction);
  }

  getCourses = (category, status, page, sort_by, sort_direction) => {
    let url=`/users/${this.props.match.params.username}/courses.json`;
    axios.get((url),{params:{
      category,
      status,
      page,
        sort_by,
        sort_direction,
      per_page: this.props.is_current && category && page ==1?17:16
    }}).then((result)=>{
      if(result){
        console.log("请求成功");
        this.setState({
          totalCount:result.data.count,
          data:result.data,
          sort_direction: sort_direction,
          sort_by: sort_by,
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
      page:1,
      isSpin:true
    })
    let {status, sort_by, sort_direction} = this.state;
    this.getCourses(cate, status, 1, sort_by, sort_direction);
  }
  //切换状态
  changeStatus=(status)=>{
    this.setState({
      status:status,
      page:1,
      isSpin:true
    })
    let {category, sort_by, sort_direction} = this.state;
    this.getCourses(category, status, 1, sort_by, sort_direction);
  }
  //切换页数
  changePage=(page)=>{
    this.setState({
      page,
      isSpin:true
    })
    let {category, status, sort_by, sort_direction} = this.state;
    this.getCourses(category, status, page, sort_by, sort_direction);
  }

  // 进入课堂
  turnToCourses=(url,flag)=>{
    if(flag){
      this.props.history.push(url);
    }
  }

  updatedlist(sort_by) {
    //按照什么样子排序
    this.setState({
      isSpin: true
    });
    let {category, status, page, sort_direction} = this.state;
    this.getCourses(category, status, 1, sort_by, "desc");
  }

  updatedlists(sort_directions, i) {
    // console.log("updatedlistssort_direction");
    // console.log(sort_direction);
    // console.log(i);
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

    this.getCourses(category, status, page, sort_by, sort_directiony);
  }

  render(){
    let{
      category,
      status,
      page,
      data,
      totalCount,
      isSpin,
      sort_by,
      sort_direction
    } = this.state;
    let  is_current=this.props.is_current;

      // console.log(this.props.current_user&&this.props.current_user.user_identity==="学生")
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.updatedlist("updated_at")}>
          最新动态
        </Menu.Item>
        <Menu.Item onClick={() => this.updatedlist("created_at")}>
          最新创建
        </Menu.Item>

      </Menu>
    );
    console.log("InfosCourse");
    console.log(status);
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
               .whitepanelysllik {
             width: 80px !important;
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
          is_current &&
          <div className="edu-back-white padding10-30 clearfix secondNavs  bor-top-greyE">
            <li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a href="javascript:void(0)"
                                                                                         onClick={() => this.changeStatus()}
                                                                                         className="w32">全部</a></li>
            <li className={status == "processing" ? "active whitepanelysllis" : "whitepanelysllis"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("processing")} className="w66">正在进行</a></li>
            <li className={status == "end" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("end")} className="w66">已结束</a></li>
          </div>
        }
					<p className=" clearfix font-12 " style={{
            lineHeight: "41px",
						marginTop: "10px",
          }}>
          <span className="fl color-grey-9">共参与{totalCount}个{category?category=="manage"?"发布":"学习":"课堂"}</span>
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
                    onClick={() => this.updatedlists("asc", 1)}></i>

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
                             onClick={() => this.updatedlists("desc", 2)}></i>
            </span>
            </sapn>
            <Dropdown overlay={menu}>
										<span className="fr color-grey-9 mr10 pointer " style={{
                      display: "flex",
                      flexDirection: "initial",
                    }}>
											<span>{sort_by === "updated_at" ? '最新动态' : sort_by === "created_at" ? '最新创建' : ""}</span>

										</span>
            </Dropdown>

        </p>
          <style>
            {
              `
              .square-list{width: 100%;box-sizing: border-box;margin-top:10px}
              `
            }
          </style>
        <div className="square-list clearfix">
          {/* 289 */}
          {
            page == 1 && is_current && !category &&
						this.props.current_user && this.props.current_user.user_identity != "学生" ? 
              <Create href={"/courses/new"} name={"新建课堂"} index="1"></Create> : ""
          }
          {
            (!data || (data && data.courses.length === 0)) && (category || (!category && this.props.current_user && this.props.current_user.user_identity == "学生")) && <NoneData></NoneData>
          }
          {
            data && data.courses && data.courses.map((item,key)=>{
              return(
                <div className="square-Item" onClick={()=>this.turnToCourses(`${item.first_category_url}`,item.can_visited)} style={{"cursor": "pointer",height:"289px"}}>
                  {
                    item.is_public == 1 &&
                    <React.Fragment>
                      <div className={key == 0 ?"publicpart orangeBlack":"publicpart"}></div>
                      <span className="smalltrangle"></span>
                      <span className="publicword">公开</span>
                    </React.Fragment>
                  }
                  {
                    item.can_visited ==false?
                    <div className="closeSquare">
                      <img src={getImageUrl("images/educoder/icon/lockclose.svg")} className="mt80 mb25"/>
                      <p className="font-14 color-white">非成员不能访问</p>
                    </div>:""
                  }

                  <div className="substance">
                    <p className="subName font-16">
                      <span>{item.name}</span>
                    </p>
                    <span><img alt="用户" className="radius mt15" height="60" src={getImageUrl('images/'+`${item.teacher && item.teacher.avatar_url}`)} width="60"/></span>
                    <p className="font-14 mt10 task-hide"><span>{item.teacher && item.teacher.real_name}</span></p>
                    <p className="font-16 mb15 task-hide mt10"><span className="color-grey-98">{item&&item.school}</span></p>
                  </div>
                  <div className="edu-txt-center course-bottom">
                    <div className="inline color-grey-6">
											{item.visits>0?<span  className="fl ml10 mr10 squareIconSpan">
                                  <Tooltip placement="bottom" title="访问量">
                                        <i className="iconfont icon-liulanyan fl mr3"></i>{item.visits}
                                  </Tooltip>

                                </span>:""}

                      {
                        item.members_count > 0 &&
                        <Tooltip placement="bottom" title="成员">
                          <span className="fl ml10 mr10 squareIconSpan">
                          <i className="iconfont icon-chengyuan fl mr3" data-tip-down="成员"></i>{item.members_count}</span>
                        </Tooltip>
                      }
                      {
                        item.homework_commons_count > 0 &&
                        <Tooltip placement="bottom" title="作业">
                          <span className="fl ml10 mr10 squareIconSpan">
                          <i className="iconfont icon-zuoye fl mr3" data-tip-down="作业"></i>{item.homework_commons_count}</span>
                        </Tooltip>
                      }
                      {/*{*/}
                        {/*item.attachments_count > 0 && */}
                        {/*<Tooltip placement="bottom" title="资源">*/}
                          {/*<span className="fl ml10 mr10 squareIconSpan">*/}
                          {/*<i className="iconfont icon-ziyuan fl mr3" data-tip-down="资源"></i>{item.attachments_count}</span>*/}
                        {/*</Tooltip>*/}
                      {/*}*/}
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
export default InfosCourse;
