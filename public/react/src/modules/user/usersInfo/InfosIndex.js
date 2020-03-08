import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import { SnackbarHOC } from 'educoder';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';
import { CNotificationHOC } from '../../courses/common/CNotificationHOC'

import Loadable from 'react-loadable';
import Loading from '../../../Loading';


const UsersInfo = Loadable({
	loader: () => import('./Infos'),
	loading: Loading,
})

const VideoUploadList = Loadable({
	loader: () => import('./video/VideoUploadList'),
	loading: Loading,
})
const VideoPublishSuccess = Loadable({
	loader: () => import('./video/VideoPublishSuccess'),
	loading: Loading,
})
const VideoProtocol = Loadable({
	loader: () => import('./video/VideoProtocol'),
	loading: Loading,
})

const $ = window.$;
class InfosIndex extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
    }
  }
  componentDidMount =()=>{
      
  }


  //判断是否看的是当前用户的个人主页
  componentDidUpdate =(prevProps)=> {
      
  }
  render(){
    let { 
      data ,
     }=this.state;
    return(
        <Switch {...this.props}>
            
            {/* --------------------------------------------------------------------- */}


            {/* 视频发布 */}
            <Route exact path="/users/:username/videos/upload"
                render={
                    (props) => (<VideoUploadList {...this.props} {...props} {...this.state} />)
                }
            ></Route>
            <Route exact path="/users/:username/videos/success"
                render={
                    (props) => (<VideoPublishSuccess {...this.props} {...props} {...this.state} />)
                }
            ></Route>
            <Route exact path="/users/:username/videos/protocol"
                render={
                    (props) => (<VideoProtocol {...this.props} {...props} {...this.state} />)
                }
            ></Route>

            

            


            <Route path="/users/:username" 
              render={
                (props) => (<UsersInfo {...this.props} {...props} {...this.state} />)
              }
            ></Route>
            
          </Switch>
    )
  }
}
export default CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC(InfosIndex) ));