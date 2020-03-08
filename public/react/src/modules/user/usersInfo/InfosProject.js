import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Tooltip, Pagination, Spin, Dropdown, Menu} from 'antd';
import axios from 'axios';
import NoneData from '../../courses/coursesPublic/NoneData'
import {getImageUrl} from 'educoder';
import "./usersInfo.css"
import Create from './publicCreatNew'

class InfosProject extends Component{
  constructor(props){
    super(props);
    this.state={
      category:undefined,
      status:undefined,
      page:1,
      per_page:16,
      sort_by: "updated_on",
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
    let url=`/users/${this.props.match.params.username}/projects.json`;
    axios.get((url),{params:{
      category,
      status,
      page,
        sort_by,
        sort_direction,
      per_page:this.props.is_current && category && page ==1?17:16
    }}).then((result)=>{
      if(result){
				if (result.data.status === 403||result.data.status === 401||result.data.status === 500||result.data.status === 404) {
					this.setState({
						isSpin:false,
						totalCount:0
					})
				}else{
					this.setState({
						totalCount:result.data.count,
						data:result.data,
            sort_by: sort_by,
            sort_direction: sort_direction,
						isSpin:false
					})
				}

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
    this.getCourses(cate, status, 1, sort_by,
      sort_direction);
  }
  //切换状态
  changeStatus=(status)=>{
    this.setState({
      status:status,
      page:1,
      isSpin:true
    })
    let {
      category, sort_by,
      sort_direction
    } = this.state;
    this.getCourses(category, status, 1, sort_by,
      sort_direction);
  }
  //切换页数
  changePage=(page)=>{
    this.setState({
      page,
      isSpin:true
    })
    let {
      category, status, sort_by,
      sort_direction
    } = this.state;
    this.getCourses(category, status, page, sort_by,
      sort_direction);
  }

  // 进入项目
  turnToCourses=(url,flag)=>{
    if(flag){
			window.location.href=url;
    }
  }


  //切换种类
  updatedlist(sort_by) {
    //按照什么样子排序
    this.setState({
      isSpin: true
    });
    let {category, status, page, sort_direction} = this.state;
    this.getCourses(category, status, 1, sort_by, "desc");
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
    let isStudent = this.props.isStudent();
    let  is_current=this.props.is_current;

    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.updatedlist("updated_on")}>
          最新动态
        </Menu.Item>
        <Menu.Item onClick={() => this.updatedlist("created_on")}>
          最新创建
        </Menu.Item>

      </Menu>
    );
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
          <div className="white-panel edu-back-white pt20 pb20  clearfix ">
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
          <div className="edu-back-white padding10-30 clearfix secondNavs bor-top-greyE">
            <li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a href="javascript:void(0)"
                                                                                         onClick={() => this.changeStatus()}
                                                                                         className=" w32">全部</a></li>
            <li className={status == "publicly" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("publicly")} className=" w60">公开</a></li>
            <li className={status == "personal" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              href="javascript:void(0)" onClick={() => this.changeStatus("personal")} className=" w60">私有</a></li>
          </div>
        }
          <p className="clearfix font-12 " style={{
            lineHeight: "41px",
            marginTop: "10px",
          }}>
          <span className="fl color-grey-9">共参与{totalCount}个{category?category=="manage"?"发布":"学习":"项目"}</span>
            <sapn className="relativef color-grey-9  fr"
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
											<span>{sort_by === "updated_on" ? '最近更新' : sort_by === "created_on" ? '最新创建' : ""}</span>

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
            page == 1 && is_current ?
            <Create href={`${this.props.Headertop && this.props.Headertop.old_url}/projects/new`} name={"新建开发项目"} index="4" Createtype={"projects"}
										{...this.props} {...this.state}
						></Create>:""
          }
          {
            (!data || (data && data.projects.length==0)) && category && <NoneData></NoneData>

          }
					{
						data===undefined||data.projects.length===0?category=="manage"||category=="study"?"":<NoneData></NoneData>:""
					}
          {
            data && data.projects && data.projects.map((item,key)=>{
              return(
                <div className="square-Item" onClick={()=>this.turnToCourses(`/projects/${item.id}`,item.can_visited)} style={{"cursor": "pointer","height":"289px"}}>
                  {
                    item.is_public==1 &&
                    <React.Fragment>
                      <div className="publicpart"></div>
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
                    <span><img alt="用户" className="radius mt15" height="60" src={getImageUrl(`images/${item.owner.avatar_url}`)} width="60"/></span>
                    <p className="font-14 mt10 task-hide"><span>{item.owner.real_name}</span></p>
                    <p className="font-16 mb15 mt10 task-hide"><span className="color-grey-9">{item.owner.school_name}</span></p>
                  </div>
                  <div className="edu-txt-center course-bottom">
                    <div className="inline color-grey-6">
                      {
                        item.members_count > 0 &&
                        <span className="mr10 ml10 fl squareIconSpan">
                          <i className="iconfont icon-chengyuan fl mr3" data-tip-down="成员"></i>{item.members_count}</span>
                      }
                      {
                        item.issues_count > 0 &&
                        <span className="mr10 ml10 fl squareIconSpan">
                            <i className="iconfont icon-issue fl mr3" data-tip-down="issues数"></i>{item.issues_count}</span>
                      }
                      {
                        item.changesets_count > 0 &&
                        <span className="mr10 ml10 fl squareIconSpan">
                          <i className="iconfont icon-banbenku fl mr3" data-tip-down="版本库"></i>{item.changesets_count}</span>
                      }
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
export default InfosProject;
