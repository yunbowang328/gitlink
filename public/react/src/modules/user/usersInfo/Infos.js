import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import {Tooltip,Menu} from 'antd';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import UpgradeModals from '../../modals/UpgradeModals';
import axios from 'axios';
import {getImageUrl} from 'educoder';
import InfosBanner from './InfosBanner'

import "./usersInfo.css"
import "../../courses/css/members.css"
import "../../courses/css/Courses.css"


import Trialapplication from '../../login/Trialapplication'


const InfosPackage = Loadable({
	loader: () => import('./InfosPackage'),
	loading:Loading,
})

const InfosCourse = Loadable({
  loader: () => import('./InfosCourse'),
  loading:Loading,
})
const InfosShixun = Loadable({
  loader: () => import('./InfosShixun'),
  loading:Loading,
})
const InfosPath = Loadable({
  loader: () => import('./InfosPath'),
  loading:Loading,
})
const InfosProject = Loadable({
  loader: () => import('./InfosProject'),
  loading:Loading,
})
const InfosVideo = Loadable({
  loader: () => import('./video/InfosVideo'),
  loading:Loading,
})
const InfosTopics=Loadable({
	loader: () => import('./InfosTopics'),
	loading:Loading,
})

const $ = window.$;
class Infos extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      is_current:undefined,
      is_edit:false,
      sign:undefined,
      type:0,
      login:undefined,
      isRenders:false,
      moduleName:"courses",
      next_gold:undefined
    }
  }
  componentDidMount =()=>{
		let upsystem=`/users/system_update.json`;
		axios.get(upsystem).then((response)=>{
			let updata=response.data;
			this.setState({
				updata:updata
			})
		}).catch((error)=>{
			console.log(error);
		})

		this.getInfo(this.props.match.params.username);
  }


  //判断是否看的是当前用户的个人主页
  componentDidUpdate =(prevProps)=> {
    if(this.props.current_user && prevProps.current_user != this.props.current_user){
      if(this.props.current_user.login != this.props.match.params.username){
        this.setState({
          is_current:false,
          login:this.props.current_user.login
        })
      }
    } else {
      if (prevProps.match.params.username != this.props.match.params.username) {
        this.getInfo(this.props.match.params.username);
      }
    }
  }



  //获取个人主页信息
  getInfo = (user_login) =>{
    let url =`/users/${user_login}/homepage_info.json`;
    axios.get(url).then((result)=>{
      if(result){
				if (result.data.status === 403||result.data.status === 401||result.data.status === 500||result.data.status === 404) {

				}else{
					this.setState({
						data:result.data,
						followed:result.data.followed,
						sign:result.data.brief_introduction,
						id:result.data.id,
						next_gold:result.data.tomorrow_attendance_gold
					})
				}
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 编辑签名
  editmysign=()=>{
    this.setState({
      is_edit:true
    },()=>{
      $("#mysign").focus();
    })
  }
  // 输入签名
  inputSign=(e)=>{
    this.setState({
      sign:e.target.value
    })
  }
  //取消编辑签名
  savemysign=()=>{
    let { sign } =this.state;
    let url=`/users/brief_introduction.json`;
    axios.post((url),{
      content:sign
    }).then((result)=>{
      if(result){
        this.setState({
          is_edit:false
        })
      }
    }).catch((error)=>{
      console.log(error)
    })

  }
  changeType=(e)=>{
    this.setState({
      type:e.key
    })
  }
  turnTo=(url)=>{
    this.props.history.push(url);
  }

  //签到
  signFor=()=>{
    let url=`/users/attendance.json`
    axios.post(url).then((result)=>{
      if(result){
        // this.setState(
        //   (prevState) => ({
        //     data : update(prevState.data, {attendance_signed: {$set: true} })
        //   })
        // )
        // this.setState({
        //   next_gold:result.data.next_gold
        // })
        this.getInfo(this.props.match.params.username);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 关注
  followPerson=()=>{
    let{followed,id}=this.state;
    let url=`/users/${id}/watch.json`;
    // 取消关注
    if(followed){
      axios.delete(url).then((result)=>{
        if(result){
          this.setState({
            followed:false
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
    }else{
      // 关注
      axios.post(url).then((result)=>{
        if(result){
          this.setState({
            followed:true
          })
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  // 试用申请
  // trialapplications =()=>{
  //   this.setState({
  //     isRenders: true,
  //     showTrial:true
  //   })
  // }
  cancelModulationModels=()=>{
    this.setState({
      isRenders: false
    })
  }
  ToBank=(url)=>{
    window.location.href=url;
  }

  render(){
    let {
      data ,
      is_edit,
      sign,
      type,
      followed,
      id,
      isRenders,
      moduleName,
      next_gold
     }=this.state;
    let isCurrent = true;
    let currentLogin;
    if(this.props.current_user && this.props.current_user.login != this.props.match.params.username){
      isCurrent=false;
      currentLogin = this.props.current_user.login;
    }
    const _commonProps = {
      is_current: isCurrent,
      login: currentLogin
    }
    return(
      <div className="newMain">
				{this.state.updata===undefined?"":<UpgradeModals
					{...this.state}
				/>}
        {
          isRenders && <Trialapplication {...this.props} {...this.state} Cancel={() => this.cancelModulationModels()}/>
        }
        <InfosBanner
          {...this.props}
          {...this.state}
        {..._commonProps}
        signFor={this.signFor}
        followPerson={this.followPerson}
        ></InfosBanner>

        <Switch {...this.props}>

            {/* --------------------------------------------------------------------- */}
						{/* 题库 */}
						<Route exact path="/users/:username/topics/:topicstype"
									 render={
										 (props) => (<InfosTopics {...this.props} {...props} {...this.state} {..._commonProps}/>)
									 }
						></Route>

            {/* 课堂 */}
            {/* http://localhost:3007/courses/1309/homework/9300/setting */}
          <Route exact path="/users/:username/courses"
                 render={
                (props) => (<InfosCourse {...this.props} {...props} {...this.state} {..._commonProps}/>)
              }
            ></Route>

          {/* 实训项目 */}
            <Route exact path="/users/:username/shixuns"
              render={
                (props) => (<InfosShixun {...this.props} {...props} {...this.state} {..._commonProps}/>)
              }
            ></Route>

          {/* 实践课程 */}
            <Route exact path="/users/:username/paths"
              render={
                (props) => (<InfosPath {...this.props} {...props} {...this.state} {..._commonProps}/>)
              }
            ></Route>

          {/* 开发项目 */}
            <Route exact path="/users/:username/projects"
              render={
                (props) => (<InfosProject {...this.props} {...props} {...this.state} {..._commonProps}/>)
              }
            ></Route>

						{/* 众包 */}
						{/* http://localhost:3007/courses/1309/homework/9300/setting */}
						<Route exact path="/users/:username/package"
									 render={
										 (props) => (<InfosPackage {...this.props} {...props} {...this.state} {..._commonProps}/>)
									 }
						></Route>

            {/* 视频 */}
            <Route exact path="/users/:username/videos"
              render={
                (props) => (<InfosVideo {...this.props} {...props} {...this.state} {..._commonProps}/>)
              }
            ></Route>


          <Route exact path="/users/:username"
                 render={
                (props) => (<InfosCourse {...this.props} {...props} {...this.state} {..._commonProps}/>)
              }
            ></Route>

        </Switch>
      </div>
    )
  }
}
// CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC))
export default (Infos) ;
