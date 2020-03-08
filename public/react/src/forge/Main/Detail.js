import React , { Component } from 'react';
import { Link , Route , Switch } from 'react-router-dom';

import '../css/index.css'
import './list.css';

import Loadable from 'react-loadable';
import Loading from '../../Loading';

import axios from 'axios';

import img_1 from '../Images/1.png';
import img_2 from '../Images/2.png';
import img_3 from '../Images/3.png';
import img_4 from '../Images/4.png';
import img_6 from '../Images/6.png';
import img_7 from '../Images/7.png';
import img_parise from '../Images/parise.png';
import img_focus from '../Images/focus.png';
import img_parised from '../Images/parised.png';
import img_focused from '../Images/focused.png';
import img_fork from '../Images/fork.png';
const FileNew = Loadable({
	loader: () => import('../Newfile/Index'),
	loading: Loading,
})
const Setting = Loadable({
	loader: () => import('../Settings/Index'),
	loading: Loading,
})
const TagList = Loadable({
	loader: () => import('../Order/Tags'),
	loading: Loading,
})
const OrderNew = Loadable({
	loader: () => import('../Order/New'),
	loading: Loading,
})
const OrderDetail = Loadable({
	loader: () => import('../Order/Detail'),
	loading: Loading,
})
const OrderIndex = Loadable({
	loader: () => import('../Order/order'),
	loading: Loading,
})
const CoderRootIndex = Loadable({
	loader: () => import('./CoderRootIndex'),
	loading: Loading,
})
const OrderMilepost = Loadable({
	loader: () => import('../Order/Milepost'),
	loading: Loading,
})

const OrdernewMilepost = Loadable({
	loader: () => import('../Order/newMilepost'),
	loading: Loading,
})

const OrderupdateMilepost = Loadable({
	loader: () => import('../Order/UpdateMilepost'),
	loading: Loading,
})

const OrderupdateDetail = Loadable({
	loader: () => import('../Order/UpdateDetail'),
	loading: Loading,
})

const OrdercopyDetail = Loadable({
	loader: () => import('../Order/CopyDetail'),
	loading: Loading,
})

//合并请求
const MergeIndexDetail = Loadable({
	loader: () => import('../Merge/merge'),
	loading: Loading,
})

const CreateMerge = Loadable({
	loader: () => import('../Merge/NewMerge'),
	loading: Loading,
})

const MessageCount = Loadable({
	loader: () => import('../Merge/MessageCount'),
	loading: Loading,
})

const MergeSubmit = Loadable({
	loader: () => import('../Merge/MergeSubmit'),
	loading: Loading,
})

const UpdateMerge = Loadable({
	loader: () => import('../Merge/UpdateMerge'),
	loading: Loading,
})
//版本发布
const VersionIndex = Loadable({
	loader: () => import('../Version/version'),
	loading: Loading,
})
const NewVersionIndex = Loadable({
	loader: () => import('../Version/NewVersion'),
	loading: Loading,
})
const UpVersionIndex = Loadable({
	loader: () => import('../Version/UpdateVersion'),
	loading: Loading,
})
const MilepostDetail = Loadable({
	loader: () => import('../Order/MilepostDetail'),
	loading: Loading,
})


const TrendsIndex = Loadable({
	loader: () => import('../Activity/Activity'),
	loading: Loading,
})
/**
 * permission：Manager:管理员，Reporter：报告人员(只有读取权限)，Developer：开发人员（除不能设置仓库信息外）
 */
class Detail extends Component{
  constructor(props){
    super(props);
    this.state={
      projectDetail:undefined,
      isManager:false,
      isReporter:false,
      isDeveloper:false,
      project_id:undefined,
      watchers_count:undefined ,
      praises_count:undefined ,
      forked_count:undefined,
      http_url: undefined,
      author:undefined,

      branchs:undefined,
      branchList:undefined,
      branchLastCommit:undefined,
    }
  }

  getUserInfo=()=>{
    const url = `/users/me.json`;
    axios.get(url).then(result=>{
      if(result && result.data.login){
        this.setState({
          current_user:result.data
        })
        this.getDetail();
      }
    }).catch(error=>{
      console.log(error)
    })
  }


  componentDidMount=()=>{
    // this.getUserInfo();
    this.getDetail();
  }

  // componentDidUpdate=(provState)=>{
  //   if(provState.match.params.projectsId !== this.props.match.params.projectsId){
  //     this.getDetail();
  //   }
  // }

  getDetail=()=>{
    console.log("state",this.props)
    const { state } = this.props.history.location;
    const { current_user } = this.props
    const { projectsId } = this.props.match.params;
    const url = `/${state ? state : current_user && current_user.login}/${projectsId}.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          projectDetail:result.data,
          project_id:result.data.project_id,
          isManager:result.data.permission && result.data.permission === "Manager",
          isReporter:result.data.permission && result.data.permission === "Reporter",
          isDeveloper:result.data.permission && result.data.permission === "Developer",
          http_url: result.data.clone_url,
          author:result.data.author,

          watchers_count:result.data.watchers_count,
          praises_count:result.data.praises_count,
          forked_count:result.data.forked_count,
        })
        if(result.data.project_id){
          this.getBranch(result.data.project_id);
        }
      }
    }).catch((error)=>{})
  }

  // 关注和取消关注
  focusFunc =(flag)=>{
    const { project_id } = this.state;
    if(!flag){
      const url = `/projects/${project_id}/watchers/follow.json`;
      axios.post(url).then(result=>{
        if(result){
          this.props.showNotification('关注成功');
          this.getDetail();
        }
      }).catch(error=>{
        console.log(error);
      })
    }else{
      const url = `/projects/${project_id}/watchers/unfollow.json`;
      axios.delete(url).then(result=>{
        if(result){
          this.props.showNotification('取消关注成功');
          this.getDetail();
        }
      }).catch(error=>{
        console.log(error);
      })
    }
  }

  // 点赞和取消点赞
  pariseFunc=(flag)=>{
    const { project_id } = this.state;
    if(!flag){
      const url = `/projects/${project_id}/praise_tread/like.json`;
      axios.post(url).then(result=>{
        if(result){
          this.props.showNotification('点赞成功');
          this.getDetail();
        }
      }).catch(error=>{
        console.log(error);
      })
    }else{
      const url = `/projects/${project_id}/praise_tread/unlike.json`;
      axios.delete(url).then(result=>{
        if(result){
          this.props.showNotification('取消点赞成功');
          this.getDetail();
        }
      }).catch(error=>{
        console.log(error);
      })
    }
  }

  // fork项目
  forkFunc=()=>{
    const { project_id } = this.state;
    const url = `/projects/${project_id}/forks.json`;
    axios.post(url).then(result=>{
      if(result && result.data.status === 0){
        this.props.history.push(`/projects/${result.data.identifier}/coder`);
      }else{
        this.props.showNotification(result.data.message);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  // 获取分支列表
  getBranch=(id)=>{
    const url =`/projects/${id}/branches.json`;
    axios.get(url).then((result)=>{
      if(result && result.data.length>0){
        const branchs = [];
        result.data.map((item,key)=>{
          branchs.push({
            index:key,
            name:item.name
          })
        })
        this.setState({
          branchList:result.data,
          branchs,
          branchLastCommit:result.data[0],
          // http_url:result.data[0].http_url
        })
      }
    }).catch((error)=>{})
  }

  render(){

    const { projectDetail , watchers_count , praises_count , forked_count , project_id } = this.state;
    const url = this.props.history.location.pathname;
    const urlFlag = (url.split("/").length === 3);
    const { isManager , isDeveloper } = this.props;
    const { projectsId } = this.props.match.params;

    const { state } = this.props.history.location;
    return(
      <div>
        <div className="detailHeader-wrapper">
          <div className="normal">
            <div className="f-wrap-between mb20">
              <p className="font-18 color-white df flex-1 lineH2 mt15" style={{alignItems:"center"}}>
                {projectDetail && projectDetail.author && projectDetail.author.name}
                <span className="ml5 mr5">/</span>
                <span className="hide-1 flex-1">
									<Link to={`/projects/${projectsId}/coder`} className="color-white">{ projectDetail && projectDetail.identifier }</Link>
									</span>
              </p>
            </div>
            <div className="f-wrap-between">
              <ul className="headerMenu-wrapper">
                <li className={(url.indexOf("coder")>0 || urlFlag)? "active" : ""}><Link to={{pathname:`/projects/${projectsId}/coder`,state}}><img alt="" src={img_1} width="18" />代码</Link></li>
                <li className={url.indexOf("orders")>0 ? "active" : ""}><Link to={{pathname:`/projects/${projectsId}/orders`,state}}><img alt="" src={img_2} width="12" />工单{projectDetail&&projectDetail.issues_count===0?"":projectDetail&&projectDetail.issues_count===0?projectDetail.issues_count:""}</Link></li>
                <li className={url.indexOf("merge")>0 ? "active" : ""}><Link to={{pathname:`/projects/${projectsId}/merge`,state}}><img alt="" src={img_3} width="13" />合并请求{projectDetail&&projectDetail.pull_requests_count===0?"":projectDetail&&projectDetail.pull_requests_count===0?projectDetail.pull_requests_count:""}</Link></li>
                <li className={url.indexOf("version")>0 ? "active" : ""}><Link to={{pathname:`/projects/${projectsId}/version`,state}}><img alt="" src={img_4} width="16" />版本发布</Link></li>
                <li className={url.indexOf("trends")>0 ? "active" : ""}><Link to={{pathname:`/projects/${projectsId}/trends`,state}}><img alt="" src={img_6} width="16" />动态</Link></li>
                {
                  isManager &&
                    <li className={url.indexOf("setting")>0 ? "active" : ""}><Link to={`/projects/${projectsId}/setting`}><img alt="" src={img_7} width="19" />仓库设置</Link></li>
                }
              </ul>
              <span className="df">
                <span className="detail_tag_btn">
                  <a className="detail_tag_btn_name" onClick={()=>this.focusFunc(projectDetail && projectDetail.watched)}>
                    <img src={projectDetail && projectDetail.watched ? img_focused : img_focus} alt="" width="14px"/>
                    {projectDetail && projectDetail.watched ? '取消关注':'关注'}
                  </a>
                  <span className="detail_tag_btn_count">{watchers_count}</span>
                </span>
                <span className="detail_tag_btn">
                  <a className="detail_tag_btn_name" onClick={()=>this.pariseFunc(projectDetail && projectDetail.praised)}>
                    <img src={projectDetail && projectDetail.praised ? img_parised : img_parise} width="13px" alt=""/>
                    {projectDetail && projectDetail.praised ? '取消点赞':'点赞'}
                  </a>
                  <span className="detail_tag_btn_count">{praises_count}</span>
                </span>
                <span className="detail_tag_btn">
                  <a className="detail_tag_btn_name" onClick={this.forkFunc}>
                    <img src={img_fork} alt="" width="10px"/>Fork</a>
                  <span className="detail_tag_btn_count">{forked_count}</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <Switch {...this.props}>
          {/* 新建文件 */}
          <Route path="/projects/:projectsId/coder/:branch/newfile/:path"
            render={
              (props) => (<FileNew {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          <Route path="/projects/:projectsId/coder/:branch/newfile"
            render={
              (props) => (<FileNew {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          {/* 标签列表 */}
          <Route path="/projects/:projectsId/orders/tags"
            render={
              (props) => (<TagList {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          {/* 仓库设置 */}
          <Route path="/projects/:projectsId/setting"
            render={
              (props) => (<Setting {...this.props} {...props} {...this.state} getDetail={this.getDetail}/>)
            }
          ></Route>
          {/* 工单详情 */}
          <Route path="/projects/:projectsId/orders/:orderId/detail"
            render={
              (props) => (<OrderDetail {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          {/* 里程碑 */}
        <Route path="/projects/:projectsId/orders/Milepost"
            render={
              (props) => (<OrderMilepost {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          {/* 新建里程碑 */}
          <Route path="/projects/:projectsId/orders/meilpost"
            render={
              (props) => (<OrdernewMilepost {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
           {/*里程碑详情*/ }
           <Route path="/projects/:projectsId/orders/:meilid/MilepostDetail"
            render={
              (props) => (<MilepostDetail {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
            {/*修改里程碑*/}
            <Route path="/projects/:projectsId/orders/:meilid/meilpost"
            render={
              (props) => (<OrderupdateMilepost {...this.props} {...props} {...this.state}/>)
            }
          ></Route>


          {/* 新建工单 */}

          <Route path="/projects/:projectsId/orders/new"
            render={
              (props) => (<OrderNew {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          {/* 修改详情 */}
            <Route path="/projects/:projectsId/orders/:orderId/updatedetail"
            render={
              (props) => (<OrderupdateDetail  {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

            {/* 复制详情 */}
            <Route path="/projects/:projectsId/orders/:orderId/copyetail"
            render={
              (props) => (<OrdercopyDetail  {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          {/* 动态 */}
          <Route path="/projects/:projectsId/trends"
            render={
              (props) => (<TrendsIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>


          {/* 代码Index */}
          <Route path="/projects/:projectsId/orders"
            render={
              (props) => (<OrderIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          <Route path="/projects/:projectsId/merge/new"
            render={
              (props) => (<CreateMerge {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          <Route path="/projects/:projectsId/merge/:mergeId/UpdateMerge"
            render={
              (props) => (<UpdateMerge {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          <Route path="/projects/:projectsId/merge/:mergeId/Messagecount"
            render={
              (props) => (<MessageCount {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

          <Route path="/projects/:projectsId/merge/:mergeId/MergeSubmit"
            render={
              (props) => (<MergeSubmit {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          <Route path="/projects/:projectsId/version/new"
            render={
              (props) => (<NewVersionIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>


        <Route path="/projects/:projectsId/version/:versionId/upversion"
            render={
              (props) => (<UpVersionIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>


          <Route path="/projects/:projectsId/version"
            render={
              (props) => (<VersionIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>

            <Route path="/projects/:projectsId/merge"
            render={
              (props) => (<MergeIndexDetail {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          <Route path="/projects/:projectsId/coder"
            render={
              (props) => (<CoderRootIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
          <Route path="/projects/:projectsId"
            render={
              (props) => (<CoderRootIndex {...this.props} {...props} {...this.state}/>)
            }
          ></Route>
        </Switch>
      </div>
    )
  }
}

export default Detail;
