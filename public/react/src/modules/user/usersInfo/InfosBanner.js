import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {Tooltip,Menu} from 'antd';
import {getImageUrl} from 'educoder';

import "./usersInfo.css"
import "../../courses/css/members.css"
import "../../courses/css/Courses.css"

import { LinkAfterLogin } from 'educoder'

class InfosBanner extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let { 
      data ,
      id,
      login,
      moduleName,
      current_user,
     }=this.props;
     let  is_current=this.props.is_current;
     let {username}= this.props.match.params;
     let {pathname}=this.props.location;
     moduleName=pathname.split("/")[3];

    let user_id=this.props.current_user&&this.props.current_user.user_id;
		let user_type=this.props.current_user&&this.props.current_user.user_identity;
		let targetuserid=this.props.data&&this.props.data.id;

		 // console.log(is_current)
		 // console.log(current_user)
		// console.log(current_user.is_teacher)
		let shixuntype=false;
		let pathstype=false;
		let coursestypes=false;
		if(this.props&&this.props.mygetHelmetapi!=null){
			let shixun="/shixuns";
			let paths="/paths";
			let courses="/courses";
			this.props.mygetHelmetapi.navbar.map((item,key)=>{
				var reg = RegExp(item.link);
				if(shixun.match(reg)){
					if(item.hidden===true){
						shixuntype=true
					}
				}
				if(paths.match(reg)){
					if(item.hidden===true){
						pathstype=true
					}
				}
				if(courses.match(reg)){
					if(item.hidden===true){
						coursestypes=true
					}
				}
			})
		}

    return(
      <div className="bannerPanel mb60">
        <div className="educontent">
          <div className="clearfix color-white mb25">
            <p className="myPhoto mr20 fl"><img alt="头像" src={data && `${getImageUrl('images/'+data.avatar_url)}`}/></p>
            <div className="fl">
              <p className="clearfix mt20">
                <span className="username task-hide" style={{"maxWidth":'370px'}}>{data && data.name}</span>
                {/*{*/}
                  {/*data && is_current == false && data.identity =="学生" ? "" : */}
                  {/*<span className="userpost"><label>{data && data.identity}</label></span>*/}
                {/*}*/}
              </p>
              <p className="mt15">
                <Tooltip placement='bottom' title={ data && data.professional_certification ?"已职业认证":"未职业认证"}>
                  <i className={ data && data.professional_certification ? "iconfont icon-shenfenzhenghaomaguizheng font-18 user-colorgrey-blue mr20 ml2":"iconfont icon-shenfenzhenghaomaguizheng font-18 user-colorgrey-B8 mr20 ml2"}></i>
                </Tooltip>
                <Tooltip placement='bottom' title={ data && data.authentication ?"已实名认证":"未实名认证"}>
                  <i className={ data && data.authentication ? "iconfont icon-renzhengshangjia font-18 user-colorgrey-blue":"iconfont icon-renzhengshangjia font-18 user-colorgrey-B8"}></i>
                </Tooltip>
              </p>
            </div>
            <div className="fr">
              <div class="fl headtab mt20">
                <span>{is_current ? "我":"TA"}的经验值</span>
                <a style={{"cursor":"default"}}>{data && data.experience}</a>
              </div> 
              <div class="fl headtab mt20 pr leftTransform pl20">
                <span>{is_current ? "我":"TA"}的金币</span>
                <a style={{"cursor":"default"}}>{data && data.grade}</a>
              </div> 
              {
                is_current ? 
                <span className="fl mt35 ml60">
                  {
                    data && data.attendance_signed ? 
                    <span className="user_default_btn user_grey_btn font-18">已签到</span>
                    :
                    <a herf="javascript:void(0);" onClick={this.props.signFor} className="user_default_btn user_yellow_btn fl font-18">签到</a>
                  }
                </span> 
                :
                <span className="fl mt35 ml60">
                  <LinkAfterLogin 
                    {...this.props} 
                    {...this.state} 
                    className="user_default_btn user_yellow_btn fl font-18" 
                    to={`/messages/${login}/message_detail?target_ids=${id}`}
                  >
                  私信
                  </LinkAfterLogin>
                </span>
              }
            </div>
          </div>
          <div className="userNav">
						{coursestypes===true?"":<li className={`${moduleName == 'courses' ||moduleName == undefined ? 'active' : '' }`}>
              <Link
                onClick={() => this.setState({moduleName: 'courses'})}
                to={`/users/${username}/courses`}>翻转课堂</Link>
            </li>}
						{shixuntype===true?"":<li className={`${moduleName == 'shixuns' ? 'active' : '' }`}>
              <Link
                onClick={() => this.setState({moduleName: 'shixuns'})}
                to={`/users/${username}/shixuns`}>实训项目</Link>
            </li>}
						{pathstype===true?"":<li className={`${moduleName == 'paths' ? 'active' : '' }`}>
              <Link 
                onClick={() => this.setState({moduleName: 'paths'})}
                to={`/users/${username}/paths`}>实践课程</Link>
            </li>}
						{this.props.user&&this.props.user.main_site===true?<li className={`${moduleName == 'projects' ? 'active' : '' }`}>
              <Link
                onClick={() => this.setState({moduleName: 'projects'})}
                to={`/users/${username}/projects`}>开发项目</Link>
            </li>:""}
            {/*<li className={`${moduleName == 'package' ? 'active' : '' }`}>*/}
            {/*  <Link*/}
            {/*    onClick={() => this.setState({moduleName: 'package'})}*/}
            {/*    to={`/users/${username}/package`}>众包</Link>*/}
            {/*</li>*/}
            {this.props.user&&this.props.user.main_site===true?((is_current && current_user && current_user.is_teacher ) || current_user && current_user.admin)
            && <li className={`${moduleName == 'videos' ? 'active' : '' }`}>
              <Link
                onClick={() => this.setState({moduleName: 'videos'})}
                to={`/users/${username}/videos`}>视频</Link>
            </li>:""}

            {/*自己的主页且不是学生显示题库按钮*/}
						{this.props.user&&this.props.user.main_site===true?(is_current && current_user&& current_user.is_teacher )
						&&<li className={`${moduleName == 'topics' ? 'active' : '' }`}>
							<Link
								onClick={() => this.setState({moduleName: 'topics'})}
								to={`/users/${username}/topics/personal`}>题库</Link>
						</li>:""}

          </div>
        </div>
      </div>
    )
  }
}
export default InfosBanner;