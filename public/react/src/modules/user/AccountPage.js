import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {CNotificationHOC} from '../courses/common/CNotificationHOC'
import Loading from '../../Loading';

import Loadable from 'react-loadable';

import { TPMIndexHOC } from '../tpm/TPMIndexHOC';

import { SnackbarHOC, getImageUrl } from 'educoder';
import AccountNav from './account/AccountNav'
import axios from 'axios'

const AccountBasic= Loadable({
  loader: () => import('./account/AccountBasic'),
  loading: Loading,
})
const AccountBasicEdit= Loadable({
  loader: () => import('./account/AccountBasicEdit'),
  loading: Loading,
})

const AccountCertification= Loadable({
  loader: () => import('./account/AccountCertification'),
  loading: Loading,
})

const AccountSecure= Loadable({
  loader: () => import('./account/AccountSecure'),
  loading: Loading,
})

const AccountBinding= Loadable({
	loader: () => import('./account/AccountBinding'),
	loading: Loading,
})
class AccountPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      basicInfo: {}
    }
  }

  componentDidUpdate =(prevState)=>{
    if(this.props.current_user && this.props.current_user != prevState.current_user){
      this.getBasicInfo(this.props.current_user.login);
    }
  }

  componentDidMount = () =>{
    if(this.props.current_user){
      this.getBasicInfo(this.props.current_user.login);
    }
  }

  getBasicInfo=(login)=>{
    let url=`/users/accounts/${login || this.props.current_user.login}.json`;
    axios.get(url).then((result)=>{
      if(result.data){
        if(result.data && result.data.base_info_completed == false){
          this.props.history.push(`/account/profile/edit`);
        }
        // "authentication": "uncertified", // "uncertified" | "applying" | "certified"
        this.setState({
          basicInfo: Object.assign({}, {...result.data}, { 
              avatar_url: `${result.data.avatar_url}`,
              gender: result.data.gender == null || result.data.gender == undefined ? 0 : result.data.gender
            })
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
    render() {
      let { basicInfo }=this.state;
      const common = { basicInfo, getBasicInfo : this.getBasicInfo }
      return (
          <div className="newMain clearfix">
            <div className="educontent df pt20">
              <style>{`
                .accountPage {
                  display: flex;
                }
                .basicFormWrap{
                  flex:1;
                  width: 0;
                }

                /* 左侧 */
                .accountNav {
                  width: 290px;
                  box-shadow: 0px 4px 9px 0px rgba(11,62,120,0.21);
                  border-radius: 2px;
                  padding-top: 8px;
                  padding-bottom: 30px;
                  margin-bottom:30px;
                  margin-right:20px;
                  height: 460px;
                }
              `}</style>
              <AccountNav {...this.props} {...common}></AccountNav>
              <div className="basicFormWrap">
                <Switch {...this.props}>
									<Route  path="/account/profile/edit"
													render={
														(props) => (<AccountBasicEdit {...this.props} {...props} {...this.state} {...common} />)
													}
									></Route>

                  <Route  path="/account/profile"
                          render={
                            (props) => (<AccountBasic {...this.props} {...props} {...this.state} {...common} />)
                          }
                  ></Route>
									
                  <Route  path="/account/certification"
                          render={
                            (props) => (<AccountCertification {...this.props} {...props} {...this.state} {...common} />)
                          }
                  ></Route>

                  <Route  path="/account/secure"
                          render={
                            (props) => (<AccountSecure {...this.props} {...props} {...this.state} {...common} />)
                          }
                  ></Route>

									<Route  path="/account/binding"
													render={
														(props) => (<AccountBinding {...this.props} {...props} {...this.state} {...common} />)
													}
									></Route>

                  <Route  exact path="/account"
                          render={
                            (props) => (<AccountBasic getBasicInfo={()=>this.getBasicInfo()} {...this.props} {...props} {...this.state} {...common} />)
                          }
                  ></Route>


                </Switch>
              </div>
            </div>
          </div>
      );
    }
}

export default CNotificationHOC()(SnackbarHOC() ( TPMIndexHOC ( AccountPage )));
