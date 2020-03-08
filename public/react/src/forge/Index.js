import React , { Component } from 'react';

import {Route,Switch,Link} from 'react-router-dom';
import { withRouter } from 'react-router'


import { SnackbarHOC } from 'educoder';
import { CNotificationHOC } from '../modules/courses/common/CNotificationHOC';
import { TPMIndexHOC } from '../modules/tpm/TPMIndexHOC';

import './css/index.css';

import Loadable from 'react-loadable';
import Loading from '../Loading';
import {ImageLayerOfCommentHOC} from '../modules/page/layers/ImageLayerOfCommentHOC';

import axios from 'axios';



const ProjectNew = Loadable({
	loader: () => import('./New/Index'),
	loading: Loading,
})
const ProjectIndex = Loadable({
	loader: () => import('./Main/Index'),
	loading: Loading,
})

const ProjectDetail = Loadable({
	loader: () => import('./Main/Detail'),
	loading: Loading,
})

class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      current_user:undefined,
    }
  }
  componentDidMount=()=>{
    this.getUserInfo();
    document.title="forge开源";
  }

  getUserInfo=()=>{
    const url = `/users/me.json`;
    axios.get(url).then(result=>{
      // result && result.data.login
      if(result && result.data.login){
        this.setState({
          current_user:result.data
        })
      }
    }).catch(error=>{
      console.log(error)
    })
  }

  render(){
    const { current_user } = this.state;
    return(
      <div className="newMain clearfix">
        <Switch {...this.props}>
          <Route path="/projects/:projectsType/new"
            render={
              (props) => (<ProjectNew {...this.props} {...props} {...this.state} current_user={current_user}/>)
            }
          ></Route>
          <Route path="/projects/:projectsId"
            render={
              (props) => (<ProjectDetail {...this.props} {...props} {...this.state} current_user={current_user}/>)
            }
          ></Route>
          <Route exact path="/projects"
            render={
              (props) => (<ProjectIndex {...this.props} {...props} {...this.state} current_user={current_user}/>)
            }
          ></Route>
        </Switch>
      </div>
    )
  }
}
export default withRouter(ImageLayerOfCommentHOC({imgSelector: '.imageLayerParent img, .imageLayerParent .imageTarget', parentSelector: '.newMain'})(CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC(Index) ))));
