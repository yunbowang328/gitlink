import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Tooltip,Menu,Pagination} from 'antd';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import axios from 'axios';
import {getImageUrl} from 'educoder';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../../courses/common/CNotificationHOC';
import GotoQQgroup from '../../../modal/GotoQQgroup';

import "./usersInfo.css"

class publicCreateNew extends Component{
  constructor(props){
    super(props);
    this.state={
		}
  }

	//头部获取是否已经登录了
	getUser=(url,name)=> {
			if (this.props.user&&this.props.user.email===undefined||this.props.user&&this.props.user.email===null||this.props.user&&this.props.user.email==="") {
				this.props.showNotification("请先绑定邮箱，谢谢");
				return
			}
   if(name==="新建实训"){
		 if(this.props&&this.props.current_user&&this.props.current_user.is_shixun_marker===false){
			 this.props.setgoshowqqgtounp(true);
			 return;
		 }
	 }


		if(url !== undefined || url!==""){
			window.location.href = url;
		}
	}

	getUsers=(url,name)=> {

		if(name==="新建实训"){
		if(this.props&&this.props.current_user&&this.props.current_user.is_shixun_marker===false){
			this.props.setgoshowqqgtounp(true);
			return;
		}
		}
		if(url !== undefined || url!==""){
			window.location.href = url;
		}
	}



  render() {
    let {href,name,index}=this.props;

    return (
      <div className="square-Item" style={{"height":`${index=="1"?"289":index=="2"?"298":index=="3"?"295":"289"}px`}}>

        <div className="substance substancepad">
					{this.props.Createtype==="projects"?<a onClick={()=>this.getUser(href,name)}>
						<div className="substancenenew">
							<div className="leftten"></div>
							<div className="topten"></div>
						</div>
					</a>: <a   onClick={()=>this.getUsers(href,name)}>
						<div className="substancenenew">
							<div className="leftten"></div>
							<div className="topten"></div>
						</div>
					</a>}
        </div>
        <div className="edu-txt-center course-bottom">
          <div className="inline color-grey-6">
            <span className="fl ml10 mr10 squareIconSpan substancefont">
              {name}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
export default publicCreateNew;
