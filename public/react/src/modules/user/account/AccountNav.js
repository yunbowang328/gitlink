import React, { Component } from 'react';

import { SnackbarHOC, getImageUrl } from 'educoder';
import AccountImg from './AccountImg'
class AccountNav extends Component {
  toBasic = () => {
    this.props.history.push(`/account/profile`)
  }
  toCertification = () => {
    this.props.history.push(`/account/certification`)
  }
  toSecure = () => {
    this.props.history.push(`/account/secure`)
  }
	isBinding = () => {
		this.props.history.push(`/account/binding`)
	}
    render() {
      let { basicInfo, current_user } = this.props
      // console.log(this.props);
      const path = window.location.pathname
      const isBasic = path.indexOf('profile') != -1 || path == "/account"
      const isCertification = path.indexOf('certification') != -1
      const isSecure = path.indexOf('secure') != -1
			const isBinding = path.indexOf('binding') != -1
      return (
          <div className="accountNav fl">
            <style>{`
                .accountInfo { 
                  text-align: center;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                .accountInfo .name {
                  color: #05101A;
                  font-size: 24px;
                  height: 36px;
                }
                .accountInfo .role {
                  color: #666666;
                  font-size: 14px;
                }
                .accountManagement .title {
                  color: #05101A;
                  font-size: 18px;
                  font-weight: 400;
                  padding: 10px 28px;
                  margin-top: 6px;
                }
                .accountManagement .navItem {
                  font-size: 16px;
                  padding: 6px 0px;
                  padding-left: 30px;
                  border-left: 2px solid #fff;
                  cursor: pointer;
                  color:#4D4D4D;
                }
                .accountManagement .navItem i{
                  margin-top: -4px;
                  display: inline-block;
                  margin-right: 7px;
                }
                .accountManagement .navItem i.status{
                  margin-top: 1px;
                  margin-right: 24px;
                }
                .accountManagement .navItem.active { 
                  border-left: 2px solid #4CACFF;
                  background: #E6F3FF;
                }
                .accountManagement .navItem.active i:first-child{
                  color:#4CACFF!important;
                }

                .color-green-light{
                  color: #45E660!important;
                }
            `}</style>
            {
              basicInfo && basicInfo.id &&
              <React.Fragment>
                <div className="accountInfo">
                  <AccountImg src={basicInfo.avatar_url} {...this.props}></AccountImg>
                  <span className="name">{basicInfo.name || (current_user ? "" : '')}</span>
                  <span className="role">{basicInfo.technical_title}</span>
                </div>

                <div className="accountManagement">
                  <div className="title">账号管理</div>
                  <ul>
                    <li className={`navItem ${isBasic ? 'active' : ''}`} onClick={this.toBasic}>
                      <i className="iconfont icon-jibenxinxi color-grey-9 font-16"></i>
                      基本信息
                      {
                        basicInfo.base_info_completed == true ? 
                        <i className="status fr iconfont icon-wancheng color-green-light font-16"></i> :
                        <i className="status fr iconfont icon-tishi color-red font-16"></i> 
                      }
                    </li>
                    <li className={`navItem ${isCertification ? 'active' : ''}`} onClick={this.toCertification}>
                      <i className="iconfont icon-renzhengxinxi color-grey-9 font-16"></i>认证信息
                      {
                        basicInfo.professional_certification == 'certified' && basicInfo.authentication == 'certified' ?
                        <i className="status fr iconfont icon-wancheng color-green-light font-16"></i>:
                        <i className="status fr iconfont icon-tishi color-red font-16"></i> 
                      }
                    </li>
                    <li className={`navItem ${isSecure ? 'active' : ''}`} onClick={this.toSecure}>
                      <i className="iconfont icon-anquanshezhi color-grey-9 font-16"></i>安全设置
                    </li>
										{this.props.user&&this.props.user.main_site===true?<li className={`navItem ${isBinding ? 'active' : ''}`} onClick={this.isBinding}>
											<i className="iconfont icon-lianjie color-grey-9 font-16"></i>绑定登录账号
										</li>:""}
                  </ul>
                </div>
              </React.Fragment>
            }
          </div>
      );
    }
}

export default  AccountNav ;
