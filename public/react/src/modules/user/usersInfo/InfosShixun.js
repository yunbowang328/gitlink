import React, { Component } from 'react';

import {Pagination, Spin, Dropdown, Menu} from 'antd';

import NoneData from '../../courses/coursesPublic/NoneData'
import axios from 'axios';
import { setImagesUrl } from 'educoder';

import "./usersInfo.css"

import Create from './publicCreatNew'
import GotoQQgroup from "../../../modal/GotoQQgroup";

class InfosShixun extends Component{
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
      data:undefined,
			goshowqqgtounp:false,
    }
  }

  componentDidMount=()=>{
    this.setState({
      isSpin:true
    })
    let {category, status, sort_by, page, sort_direction} = this.state;
    this.getCourses(category, status, sort_by, page, sort_direction);
  }

  getCourses = (category, status, sort_by, page, sort_direction) => {
    // console.log("请求数据成功");
    // console.log("getCourses");
    // console.log(sort_by);
    // console.log(sort_direction);
    let url=`/users/${this.props.match.params.username}/shixuns.json`;
    axios.get((url),{params:{
      category,
      status,
      sort_by,
      page,
        sort_direction,
      per_page:this.props.is_current && category && page ==1?17:16
    }}).then((result)=>{
      if(result){
        console.log("请求数据成功");
        console.log(sort_by);
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
    this.setState({
      status,
      page:1,
      isSpin:true
    })
    let {category, sort_by, sort_direction} = this.state;
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
	// 处理弹框
	setgoshowqqgtounp=(bool)=>{
		this.setState({
			goshowqqgtounp:bool
		})
	}


  render(){
    let{
      category,
      status,
      sort_by,
      page,
      data,
      totalCount,
      sort_direction,
      isSpin,
			goshowqqgtounp
    } = this.state;

    let  is_current=this.props.is_current;
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.updatedlist("updated_at")}>
          最新动态
        </Menu.Item>
        <Menu.Item onClick={() => this.updatedlist("created_at")}>
          语言类别
        </Menu.Item>

      </Menu>
    );
    return(
      <div className="educontent">
				{
					goshowqqgtounp===true?
						<GotoQQgroup {...this.state} {...this.props} setgoshowqqgtounp={(bool)=>this.setgoshowqqgtounp(bool)}></GotoQQgroup>
						:
						""
				}
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
               href="javascript:void(0)"
               onClick={() => this.changeCategory()} className="font-16 w32">全部</a></li>
            <li className={category == "manage" ? "active font-16 whitepanelysllis" : "font-16 whitepanelysllis"}><a
               onClick={() => this.changeCategory("manage")}
               href="javascript:void(0)"
              className={is_current ? "font-16 w66" : "font-16 w80"}>{is_current ? "我" : "TA"}管理的</a></li>
            <li className={category == "study" ? "active font-16 whitepanelysllis" : "font-16 whitepanelysllis"}><a
               onClick={() => this.changeCategory("study")}
               href="javascript:void(0)"
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
            <li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}>
              <a onClick={() => this.changeStatus()} className="w32" href="javascript:void(0)">全部</a></li>
            <li className={status == "editing" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
               onClick={() => this.changeStatus("editing")} className="w60" href="javascript:void(0)">编辑中</a></li>
            <li className={status == "applying" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              onClick={() => this.changeStatus("applying")} className="w60" href="javascript:void(0)">待审核</a></li>
            <li className={status == "published" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              onClick={() => this.changeStatus("published")} className="w60" href="javascript:void(0)">已发布</a></li>
            <li className={status == "publiced" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
              onClick={() => this.changeStatus("publiced")} className="w60" href="javascript:void(0)">已公开</a></li>
            <li className={status == "closed" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
               onClick={() => this.changeStatus("closed")} className="w60" href="javascript:void(0)">已关闭</a></li>
          </div>
        }
        {
          category && category == "study" && is_current &&
          <div className="edu-back-white padding10-30 clearfix secondNavs bor-top-greyE">
            <li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a href="javascript:void(0)"
                                                                                         onClick={() => this.changeStatus()}
                                                                                         className="w32">全部</a></li>
            <li className={status == "processing" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
               onClick={() => this.changeStatus("processing")} className="w60" href="javascript:void(0)">未通关</a></li>
            <li className={status == "passed" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
               onClick={() => this.changeStatus("passed")} className="w60" href="javascript:void(0)">已通关</a></li>
          </div>
        }
          <div className=" clearfix font-12 " style={{
            lineHeight: "41px",
            marginTop: "10px",
          }}>
          <span className="fl color-grey-9">共参与{totalCount}个{category?category=="manage"?"发布":"学习":"实训"}</span>
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
											<span>{sort_by === "updated_at" ? '最新动态' : sort_by === "created_at" ? '语言类别' : ""}</span>

										</span>
            </Dropdown>
        </div>
					<style>
						{
							`
							.tag-green {
									position: absolute;
									left: 10px;
									bottom: 100px;
							}
							.square-list{width: 100%;box-sizing: border-box;margin-top:10px}
							
								.tag-org{
																				position: absolute;
																					left: 0px;
																					top: 20px;
																			}
																			.tag-org-name{
																			width:66px;
																			height:28px;
																			background:#FF6802;
																			width:66px;
																			height:28px;
																			border-radius:0px 20px 20px 0px;
																			}
																			.tag-org-name-test{
																			width:45px;
																			height:23px;
																			font-size:14px;
																			color:#FFFFFF;
																			line-height:19px;
																			margin-right: 6px;
																			}
																			.intermediatecenter{
																					display: flex;
																					flex-direction: column;
																					align-items: center;
																					justify-content: center;
																			}
							`
						}
					</style>
        <div className="square-list clearfix">
          {/* 298 */}
          {
            page == 1 && is_current && !category ?
            <Create href={"/shixuns/new"} name={"新建实训"} index="2" {...this.props} {...this.state} setgoshowqqgtounp={(bool)=>this.setgoshowqqgtounp(bool)}></Create>:""
          }
          {
            (!data || (data && data.shixuns.length==0)) && category && <NoneData></NoneData>
          }
          {
            data && data.shixuns && data.shixuns.map((item,key)=>{
              return(
                <div className="square-Item" style={{"height":"298px"}} onClick={()=>this.turnToCourses(`/shixuns/${item.identifier}/challenges`)}>
                  {
                    item.tag && <div className="tag-green"><span className="tag-name">{item.tag}</span>
											{/*<img className="fl" src={setImagesUrl("images/educoder/tag2.png")}/>*/}
                    </div>
                  }
									{
										item.is_jupyter===true?
											<div className="tag-org">
												<p className="tag-org-name intermediatecenter"> <span className="tag-org-name-test">Jupyter</span></p>
												{/*<img style={{display:'block',height: '28px'}} src={require(`./shixunCss/tag2.png`)}/>*/}
											</div>
											:""}


                  <a  className="square-img">
                    <img src={setImagesUrl(`${item.image_url}`)}/>
                  </a>
                  <div className="square-main">
                    <p className="task-hide">
                      <a  className="justify color-grey-name">{item.name}</a>
                    </p>
                    <div className="user-bar mt10">
                      <p style={{'width': `${parseFloat(parseInt(item.finished_challenges_count)/parseInt(item.challenges_count)).toFixed(2)*100}%`}}></p>
                    </div>
                    <p className="color-blue font-14 clearfix">
                        已完成 {item.finished_challenges_count} / {item.challenges_count}
                    </p>
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
export default InfosShixun;
