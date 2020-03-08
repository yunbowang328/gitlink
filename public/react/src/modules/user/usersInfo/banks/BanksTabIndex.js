import React, { Component } from 'react';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


import Loadable from 'react-loadable';
import Loading from '../../../../Loading';

import BanksMenu from './banksMenu'
// 毕设选题
const GtopicBanks = Loadable({
	loader: () => import('./GtopicBanks'),
	loading: Loading,
})
// 问卷内容
const PollBanks = Loadable({
	loader: () => import('./PollBanksContent'),
	loading: Loading,
})
// 试卷详情
const ExerciseBanksDetail = Loadable({
	loader: () => import('./ExerciseBanksDetail'),
	loading: Loading,
});

class BanksTabIndex extends Component{
  constructor(props){
    super(props);
    this.state={
      banksMenu:undefined
    }
  }

  initPublic = (crumbData,menuData,data) =>{
    this.setState({
      banksMenu:menuData
    })
    this.props.initPublic(crumbData,data);
  }

  render(){
    let{
      banksMenu      
    }=this.state

    const common={
      initPublic:this.initPublic,
    };
    console.log("BanksTabIndex");
    console.log(banksMenu);
    console.log(this.props);
    return(
      <React.Fragment>
        {
          banksMenu && 
          <BanksMenu 
            banksMenu={banksMenu}
            {...this.props}
            {...this.state} 
            {...common}
          ></BanksMenu>
        }
        <Switch {...this.props}>
          <Route path={`/banks/exercise/:Id/:type`}
            render={
              (props) => {
                return (<ExerciseBanksDetail {...this.props} {...props} {...this.state} {...common}
                />)
              }
          }></Route>  

          <Route path={`/banks/gtopic/:bankId/:type`}
            render={
              (props) => {
                return (<GtopicBanks {...this.props} {...props} {...this.state} {...common} />)
              }
          }></Route>
          <Route path={`/banks/poll/:bankId/:type`}
            render={
              (props) => {
                return (<PollBanks {...this.props} {...props} {...this.state} {...common} />)
              }
          }></Route>

        </Switch>
      </React.Fragment>
    )
  }
}
export default (BanksTabIndex);