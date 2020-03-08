import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Tooltip,Spin,Alert} from 'antd';
import ShowSpin from '../../../common/ShowSpin';

class CoursesHomeCard extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    let {coursesHomelist}=this.props;

   return(
      <div className="educontent mb20" id="subjects_list_content">
        <style>
          {`
              .square-Item .square-img img {
                  width: 60px;
                  border-radius: 6px 6px 0px 0px;
                  vertical-align: bottom;
                  height: 60px;
                  border-radius: 50%;
                 }`
          }
        </style>
          <div className="square-list clearfix">

          {/*<ShowSpin/>*/}

            {
            coursesHomelist===undefined?"":coursesHomelist.courses.map((item,key)=>{


                  return(
                      <div className = "square-Item" style={{cursor:'pointer'}} key={key}>

                          <div className={item.is_public===0&&item.is_accessible === false ? "closeSquare" : "none"}>
                              <img src={getImageUrl("images/educoder/icon/lockclose.svg")}
                              className="mt80 mb25"/>
                              <p className="font-14 color-white">非成员不能访问</p>
                          </div>
                           <a href={item.first_category_url} className="square-img">
											    	{/*<a href={`/courses/${item.id}/students`} className="square-img" >*/}
														 {/*target="_blank"*/}
                             {
                               item.is_public===1&&item.id===1309?
                                 <div>
                                   <div className = "publicpart orangeBlack"></div>
                                   <span className="smalltrangle"></span>
                                   <span className={"publicword"}> 公开 </span>
                                 </div>
                               :""
                             }
                             {
                               item.is_public===1&&item.id!=1309?
                                 <div>
                                   <div className = "publicpart"></div>
                                   <span className="smalltrangle"></span>
                                   <span className={"publicword"}> 公开 </span>
                                 </div>
                                 :""
                             }

														 {
															 item.excellent === false ? "" :
																 <div className="tag-orange">
																	 <span className="tag-name">开放课程</span>
																 </div>
														 }

                             {item.is_end===true?<p  className="fr squareIconSpan mt10 biaoqiancours">
                                 <div className={"coursesover"}>已结束</div>
                             </p>:""}
                          <div className="substance">

                              <p className="subName font-16">
                                {/*{item.name.length>32?*/}
                                  {/*<Tooltip placement="bottom" >*/}
                                    {/**/}
                                  {/*</Tooltip>: <span>{item.name}</span>}*/}
                                <span title={item.name.length>23?item.name:""}>{item.name}</span>
                              </p>

                              <span className={"color-dark"}>
                                 <img alt="用户" className="radius mt15" height="60" src={getImageUrl(`${"images/"+item.avatar_url}`)}  width="60"/>
                              </span>

                              <p className="font-14 mt10"><span className={"color-dark"}>{item.creator} {item.technical_title}</span></p>
                              <p className="font-16 mb15 task-hide mt10">

                              <Tooltip placement="bottom" title={item.school}>
                                 <span className="color-grey-98">{item.school}</span>
                              </Tooltip>

                              </p>
                          </div>

                          <div className="edu-txt-center course-bottom">
                              <div className="inline color-grey-B4">
                                {item.visits===0?"":<span  className="fl ml10 mr10 squareIconSpan">
                                  <Tooltip placement="bottom" title="访问量">
                                        <i className="iconfont icon-liulanyan fl mr3"></i>{item.visits}
                                  </Tooltip>

                                </span>}

                                {item.course_members_count===0?"":<span className="fl ml10 mr10 squareIconSpan">
                                  <Tooltip placement="bottom" title="成员">
                                      <i className="iconfont icon-chengyuan fl mr3"></i>{item.course_members_count}
                                  </Tooltip>
                               </span>}

                                {item.tasks_count===0?"":<span className="fl ml10 mr10 squareIconSpan">
                                  <Tooltip placement="bottom" title="作业">
                                      <i className="iconfont icon-zuoye fl mr3"></i>{item.tasks_count}
                                  </Tooltip>
                                  </span>}

                              {/*<span className="fl ml10 mr10 squareIconSpan">*/}

                              {/*<Tooltip placement="bottom" title="资源">*/}
                                  {/*<i className="iconfont icon-ziyuan fl mr3"></i>{item.attachment_count}*/}
                              {/*</Tooltip>*/}

                              {/*</span>*/}

                              </div>
                          </div>
                        </a>
                      </div>
                  )
              })
          }




      </div>
      </div>
          )
        }
      }
export default CoursesHomeCard;

