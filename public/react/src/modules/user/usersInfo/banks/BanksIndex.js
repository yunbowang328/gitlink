import React, { Component } from 'react';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { SnackbarHOC } from 'educoder';
import { TPMIndexHOC } from '../../../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../../../courses/common/CNotificationHOC'

import "../usersInfo.css"
import "../../../courses/css/members.css"
import "../../../courses/css/Courses.css"

import Loadable from 'react-loadable';
import Loading from '../../../../Loading';

// 毕设选题
const GtopicBanks = Loadable({
	loader: () => import('./GtopicBanks'),
	loading: Loading,
})

const BanksTabIndex = Loadable({
	loader: () => import('./BanksTabIndex'),
	loading: Loading,
})
const GtopicBanksEdit = Loadable({
	loader: () => import('./GtopicBanksEdit'),
	loading: Loading,
})
const HomeworkBanksEdit = Loadable({
	loader: () => import('./HomeworkBanksEdit'),
	loading: Loading,
});
const ExerciseBanksEdit = Loadable({
	loader: () => import('./ExerciseBanksEdit'),
	loading: Loading,
});

//普通作业题库详情
const Generaljobbankdetails =Loadable({
  loader: () => import('../../../courses/questionbank/Generaljobbankdetails'),
  loading: Loading,
});
//分组作业题库详情
const GroupjobbankPage =Loadable({
  loader: () => import('../../../courses/groupjobbank/GroupjobbankPage'),
  loading: Loading,
});
//毕设选题详情
const CompletetopicdePage =Loadable({
  loader: () => import('../../../courses/comtopicdetails/CompletetopicdePage'),
  loading: Loading,
});
//毕设任务详情
const Completetaskpage =Loadable({
  loader: () => import('../../../courses/completetaskdetails/Completetaskpage'),
  loading: Loading,
});
//问卷编辑
const PollNewQuestbank =Loadable({
  loader: () => import('../../../courses/poll/PollNewQuestbank'),
  loading: Loading,
});

const GtaskBanksEdit = Loadable({
	loader: () => import('./GtaskBanksEdit'),
	loading: Loading,
})

class BanksIndex extends Component{
  constructor(props){
    super(props);
    this.state={
      crumbData:undefined,
      publicly:undefined
    }
  }

  componentDidMount = () =>{
    // let pathname = this.props.location.pathname;
    // this.setState({
    //   publicly:pathname.indexOf("/publicly") > -1
    // })
    
  }

  initPublic = (crumbData,data) =>{
    if(data && data.status && data.status == -2){
      this.props.history.push(`/topicbank/publicly`);
    }
    this.setState({
      crumbData
    })
  }

	componentDidUpdate(prevProps) {
		// if(prevProps.current_user!=this.props.current_user){
    //   let { publicly }=this.state;
    //   if( this.props.checkIfLogin()) {
    //     if (this.props.current_user && this.props.current_user.professional_certification == false && publicly){
    //       this.props.history.push(`/topicbank/${this.props.current_user.login}/publicly`);
    //     } 
    //   } else {
    //     this.props.showLoginDialog()
    //   }
    // }
    // let { publicly }=this.state;
    // if(this.props.current_user && this.props.current_user.professional_certification == false && publicly){
    //   if( this.props.checkIfLogin()) {
    //     this.props.history.push(`/topicbank/${this.props.current_user.login}/publicly`);
    //   } else {
    //     this.props.showLoginDialog()
    //   }
    //   // console.log(`/topicbank/${this.props.current_user.login}/publicly`);
    // }
  }

  render(){
    let { crumbData }=this.state
    const common = {
      initPublic:this.initPublic
    }
    return(
      <div className="newMain">
        <div className="educontent">
          {
            crumbData &&
            <Breadcrumb separator=">" className="breadcrumb mt22">
              <Breadcrumb.Item href={crumbData && crumbData.is_public == true ?`/topicbank/publicly`:`/users/${this.props.current_user && this.props.current_user.login}/topics/personal`}>{ crumbData && crumbData.is_public == true ? '公共' : '我的' }题库</Breadcrumb.Item>
              {
                crumbData.crumbArray && crumbData.crumbArray.map((item,key)=>{
                  return(
                    <Breadcrumb.Item key={key} href={item.to || ""}>{item.content}</Breadcrumb.Item>
                  )
                })
              }          
            </Breadcrumb>
          }

					{
						crumbData &&<p className="clearfix mt15 mb10 ">
            <span className="fl font-24 color-grey-3 task-hide lineh-30" style={{maxWidth:'800px'}}>{crumbData && crumbData.title}</span>
            { crumbData.is_public == true ? 
              <span className="bank_is_public">公开</span>
              :
              <span className="bank_is_private">私有</span>
            }

          </p> }

          <Switch {...this.props}>
						{/*毕设任务编辑*/}
						<Route path='/banks/gtask/:workId/edit/:type'
									 render={
										 (props) => {
											 return (<GtaskBanksEdit {...this.props} {...props} {...this.state} {...common}/>)
										 }
									 }></Route>

						<Route path='/banks/normal/:workId/edit/:type'
              render={
                (props) => {
                  return (<HomeworkBanksEdit {...this.props} {...props} {...this.state} {...common}
                    isGroup={false}
                  />)
                }
            }></Route>
            
            <Route path='/banks/group/:workId/edit/:type'
              render={
                (props) => {
                  return (<HomeworkBanksEdit {...this.props} {...props} {...this.state} {...common}
                    isGroup={true}
                  />)
                }
            }></Route>

            <Route path='/banks/exercise/:Id/edit/:type'
              render={
                (props) => {
                  return (<ExerciseBanksEdit {...this.props} {...props} {...this.state} {...common}
                  />)
                }
            }></Route>


            <Route path='/banks/gtopic/:bankId/edit/:type'
              render={
                (props) => {
                  return (<GtopicBanksEdit {...this.props} {...props} {...this.state} {...common}/>)
                }
            }></Route>


						{/*题库问卷编辑详情*/}
						<Route path="/banks/poll/:workid/edit/:type"
									 render={
										 (props) => (<PollNewQuestbank {...this.props}  {...props} {...this.state} {...common} />)
									 }
						></Route>


            <Route path='/banks/poll/:bankId/:type'
              render={
                (props) => {
                  return (<BanksTabIndex {...this.props} {...props} {...this.state} {...common} />)
                }
            }></Route>
						<Route path='/banks/exercise/:Id/:type'
									 render={
										 (props) => {
											 return (<BanksTabIndex {...this.props} {...props} {...this.state} {...common}
											 />)
										 }
									 }></Route>
						{/*毕设任务题库详情*/}
            <Route path="/banks/gtask/:workid/:type"
                   render={
                     (props) => (<Completetaskpage {...this.props} {...props} {...this.state} {...common} />)
                   }
            ></Route>
            {/*毕设内容题库详情*/}
            <Route path="/banks/gtopic/:workid/:type"
                   render={
                     (props) => (<CompletetopicdePage {...this.props} {...props} {...this.state}  {...common}/>)
                   }
            ></Route>
            {/*分组作业题库详情*/}
            <Route path="/banks/group/:workid/:type"
                   render={
                     (props) => (<GroupjobbankPage {...this.props}  {...props} {...this.state} {...common} />)
                   }
            ></Route>
            {/*  普通作业题库详情*/}
            <Route path="/banks/normal/:workid/:type"
                   render={
                     (props) => (<Generaljobbankdetails {...this.props} {...props}  {...this.state} {...common} />)
                   }
            ></Route>

          </Switch>

        </div>
      </div>
    )
  }
}
export default CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC(BanksIndex) ));



//       <Route path='/banks/gtopic/:bankId'
//               render={
//                 (props) => {
//                   return (<BanksTabIndex {...this.props} {...props} {...this.state} {...common}/>)
//                 }
//             }></Route>