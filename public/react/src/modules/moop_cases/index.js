import React,{ Component } from "react";
import './css/moopCases.css'
import '../courses/css/Courses.css'

import { SnackbarHOC } from 'educoder';

import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../courses/common/CNotificationHOC'

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loading from '../../Loading';
import Loadable from 'react-loadable';

import axios from 'axios';

const CaseList = Loadable({
	loader: () => import('./CaseList'),
	loading:Loading,
})
const CaseDetail = Loadable({
	loader: () => import('./CaseDetail'),
	loading:Loading,
})
const CaseNew = Loadable({
	loader: () => import('./CaseNew'),
	loading:Loading,
})
const CaseSuccess = Loadable({
	loader: () => import('./Success'),
	loading:Loading,
})



class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      praise_count:0,
      CaseDetail:undefined,
      cover:undefined,
      creator:undefined,
      operation:undefined,
      tags:undefined,
      attachments:undefined,
      user_praised:true,
    }
  }
  componentDidMount(){

  }
  // 获取案例详情
  getDetail = (caseID) =>{
    let url=`/libraries/${caseID}.json`
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          CaseDetail:result.data,
          praise_count:result.data.praise_count,
          cover:result.data.cover,
          creator:result.data.creator,
          operation:result.data.operation,
          user_praised:result.data.operation.user_praised,
          tags:result.data.tags,
          attachments:result.data.attachments
        })
				window.document.title = result.data.title;
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  // 点赞
  praisePoint=(caseID)=>{
    let { praise_count }=this.state;
    let url =`/praise_tread/like.json`;
    axios.post(url,{
      object_id:caseID,
      object_type:"library"
    }).then((result)=>{
      if(result){
        this.setState({
          praise_count: parseInt(praise_count)+1,
          user_praised:true
        })
      }
    }).catch((error)=>{
      console.log(error);
    })    
  }

  render(){
    
    return(
      <div className="newMain">
        <Switch {...this.props}>

          <Route exact path="/moop_cases"
            render={
              (props) => (<CaseList {...this.props} {...props} {...this.state} />)
            }
          ></Route>
          
          <Route exact path="/moop_cases/new"
            render={
              (props) => (<CaseNew {...this.props} {...props} {...this.state} />)
            }
          ></Route>
        
          <Route exact path="/moop_cases/:caseID"
            render={
              (props) => (<CaseDetail {...this.props} {...props} {...this.state} getDetail={this.getDetail} praisePoint ={this.praisePoint}/>)
            }
          ></Route>


          <Route exact path="/moop_cases/:caseID/edit"
            render={
              (props) => (<CaseNew {...this.props} {...props} {...this.state} getDetail={this.getDetail}  />)
            }
          ></Route>

          <Route exact path="/moop_cases/:caseID/publish_success"
            render={
              (props) => (<CaseSuccess {...this.props} {...props} {...this.state} getDetail={this.getDetail}  />)
            }
          ></Route>

        </Switch>
      </div>
    )
  }
}
export default CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC(Index) ));