import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {Tooltip,Menu} from 'antd';
import {getImageUrl} from 'educoder';

import "./usersInfo.css"
import "../../courses/css/members.css"
import "../../courses/css/Courses.css"
class banner_out extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let { 
      data ,
      is_current,
      is_edit,
      sign,
      type,
      followed,
      id,
      login,
      moduleName,
      next_gold
     }=this.props;
     let {username}= this.props.match.params;
    return(
      <div className="user-main-half">
          <div className="user-headImg"></div>
          <div className="user-headCon">
            <div className="pr" style={{"min-height": "465px"}}>
              <div className="educontent pt80 clearfix edu-txt-center">
                <div className="inline">
                  <div className="fl headtab">
                    <span>{is_current ? "我":"TA"}的经验值</span>
                    <a style={{ cursor: 'default' }}
											// href={`${this.props.Headertop && this.props.Headertop.old_url}/users/${username}/user_experience`}
										>{data && data.experience}</a>
                  </div>
                  <em className="v-h-line fl"></em>
                  <div className="fl headtab">
                    <span>{is_current ? "我":"TA"}的金币</span>
                    <a style={{ cursor: 'default' }}
											// href={`${this.props.Headertop && this.props.Headertop.old_url}/users/${username}/user_grade`}
											id="user_code">{data && data.grade}</a>
                  </div>
                  <div className="headphoto mt14">
                    <img alt="头像" id="user_avatar_show" nhname="avatar_image" src={data && `${getImageUrl('images/'+data.avatar_url)}`}/>
                  </div>
                  <div className="fl headtab">
                    <span>{is_current ? "我":"TA"}的粉丝</span>
                    <a style={{ cursor: 'default' }}
											// href={`${this.props.Headertop && this.props.Headertop.old_url}/users/${username}/user_fanslist`}
											id="user_h_fan_count">{data && data.fan_count}</a>
                  </div>
                  <em className="v-h-line fl"></em>
                  <div className="fl headtab">
                    <span>{is_current ? "我":"TA"}的关注</span>
                    <a style={{ cursor: 'default' }}
											// href={`${this.props.Headertop && this.props.Headertop.old_url}/users/${username}/user_watchlist`}
										>{data && data.follow_count}</a>
                  </div>
                  <span className="clearfix"></span>
                  <span className="myName">{data && data.name}</span>
                </div>
              </div>
              <div className="educontent mt10 clearfix edu-txt-center">
                <div className="inline">
                  {
                    data && is_current == false && data.identity =="学生" ? "" : <span className="mypost fl mr10">{data && data.identity}</span>
                  }
                  <a
										 // href={is_current ? `${this.props.Headertop && this.props.Headertop.old_url}/account/authentication` :"javascript:void(0)"}
										 // target="_blank"
										 className={is_current ? "ringauto fl" :"ringauto fl cdefault"}>
                    <Tooltip placement='bottom' title={ data && data.authentication ?"已实名认证":"未实名认证"}>
                      <i className={ data && data.authentication ? "iconfont icon-shenfenrenzheng font-13 color-blue":"iconfont icon-shenfenrenzheng font-13 color-grey-9"}></i>
                    </Tooltip>
                  </a>
                  <a
										// href={is_current ? `${this.props.Headertop && this.props.Headertop.old_url}/account/professional_certification` :"javascript:void(0)"}
										// target="_blank"
										className={is_current ? "ringauto fl" :"ringauto fl cdefault"}>
                    <Tooltip placement='bottom' title={ data && data.professional_certification ?"已职业认证":"未职业认证"}>
                      <i className={ data && data.professional_certification ? "iconfont icon-zhiyerenzheng font-13 color-blue":"iconfont icon-zhiyerenzheng font-13 color-grey-9"}></i>
                    </Tooltip>
                  </a>
                  <a
										// href={is_current ? `${this.props.Headertop && this.props.Headertop.old_url}/account/change_or_bind?type=phone` :"javascript:void(0)"}
										// target="_blank"
										className={is_current ? "ringauto fl" :"ringauto fl cdefault"}>
                    <Tooltip placement='bottom' title={ data && data.phone_binded ?"已手机认证":"未手机认证"}>
                      <i className={ data && data.phone_binded ? "iconfont icon-shoujirenzheng font-13 color-blue":"iconfont icon-shoujirenzheng font-13 color-grey-9"}></i>
                    </Tooltip>
                  </a>
                  <a
										// href={is_current ? `${this.props.Headertop && this.props.Headertop.old_url}/my/account` :"javascript:void(0)"}
										// target="_blank"
										className={is_current ? "ringauto fl" :"ringauto fl cdefault"}>
                    <Tooltip placement='bottom' title={ data && data.email_binded ?"已邮箱认证":"未邮箱认证"}>
                      <i className={ data && data.email_binded ? "iconfont icon-youxiangrenzheng font-13 color-blue":"iconfont icon-youxiangrenzheng font-13 color-grey-9"}></i>
                    </Tooltip>
                  </a>
                  {/* <!--学院管理员身份--> */}
                  {
                    data && data.college_identifier &&
                    <a
											// href={`${this.props.Headertop && this.props.Headertop.old_url}/colleges/${data.college_identifier}/statistics`} target="_blank"
											className={is_current ? "ringauto fl" :"ringauto fl cdefault"}>
                      <Tooltip placement='bottom' title="学院管理员">
                        <i className="iconfont icon-chengyuanguanli font-12 color-blue" data-tip-down="学院管理员"></i>
                      </Tooltip>
                    </a>
                  }
                </div>
              </div>
              <div className="mt15 educontent clearfix edu-txt-center">
                <p className="mb20" style={{"height": "28px"}}>
                  {
                    is_edit && is_current ? 
                    <input type="text" id="mysign" class="mysign-input" placeholder="请输入您的个性签名" style={{height:"20px"}} value={sign} onInput={this.inputSign} onBlur={this.savemysign}/>
                    :
                    is_current ? 
                    <a className="mysign-span" onClick={this.editmysign} style={{"display": "block"}}>{sign || "这家伙很懒，什么都没留下~"}</a>
                    :
                    <span className="mysign-span" style={{"display": "block","cursor":"default"}}>{sign || "这家伙很懒，什么都没留下~"}</span>
                  }
                </p>
                {
                  is_current ? 
                  <div className="inline">
                    {
                      data && data.attendance_signed ? 
                      <React.Fragment>
                        <span className="user_default_btn user_grey_btn mb5">已签到</span>
                        <p id="attendance_notice" className="none font-12 color-grey-6" style={{"display":"block"}}>明日签到&nbsp;<font className="color-orange">+{next_gold}</font>&nbsp;金币</p>
                      </React.Fragment>
                      :
                      <a herf="javascript:void(0);" onClick={this.props.signFor} id="attendance" className="user_default_btn user_orange_btn fl mb15">签到</a>
                      // <a herf="javascript:void(0);" onClick={this.trialapplications} id="authentication_apply" className="user_default_btn user_private_btn fl ml15">试用申请</a>
                    }
                  </div> 
                  :
                  <div className="inline">
                    <a href="javascript:void(0);" onClick={this.props.followPerson} className="user_default_btn user_watch_btn user_private_btn fl mr20">{followed ? "取消关注":"关注"}</a>
                    <a href={`${this.props.Headertop && this.props.Headertop.old_url}/messages/${login}/message_detail?target_ids=${id}`} className="user_default_btn user_private_btn fl">私信</a>
                  </div>
                }
              </div>
              <div className="edu-txt-center navInfo">
                <div className="inline">
                  <li className={`${moduleName == 'courses' ||moduleName == undefined ? 'active' : '' }`}>
                    <Link
                      onClick={() => this.setState({moduleName: 'courses'})}
                      to={`/users/${username}/courses`}>课堂</Link>
                  </li>
                  <li className={`${moduleName == 'shixuns' ? 'active' : '' }`}>
                    <Link
                      onClick={() => this.setState({moduleName: 'shixuns'})}
                      to={`/users/${username}/shixuns`}>实训</Link>
                  </li>
                  <li className={`${moduleName == 'paths' ? 'active' : '' }`}>
                    <Link 
                      onClick={() => this.setState({moduleName: 'paths'})}
                      to={`/users/${username}/paths`}>实践课程</Link>
                  </li>
                  <li className={`${moduleName == 'projects' ? 'active' : '' }`}>
                 <Link
                      onClick={() => this.setState({moduleName: 'projects'})}
                      to={`/users/${username}/projects`}>开发项目</Link>
                  </li>

									<li className={`${moduleName == 'package' ? 'active' : '' }`}>
										<Link
											onClick={() => this.setState({moduleName: 'package'})}
											to={`/users/${username}/package`}>众包</Link>
									</li>

                  {/*{ data && data.identity!="学生" && <li> <a href={`${this.props.Headertop && this.props.Headertop.old_url}/users/${username}?type=m_bank`}>题库</a></li>}*/}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default banner_out;