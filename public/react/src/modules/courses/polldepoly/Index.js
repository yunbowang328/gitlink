import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';

import "../css/Courses.css"
//引入对应跳转的组件

{/*提交总结*/}
const Polldepoly = Loadable({
  loader: () => import('./pollmount'),
  loading:Loading,
})





class Polllist extends Component{
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div>
        <Switch {...this.props}>

          {/*问卷列表*/}
          <Route exact path="/poll/:pollId/student_poll_list" component={Polldepoly}  {...this.props} {...this.state}></Route>


        </Switch>
      </div>
    )
  }
}

export default SnackbarHOC() ( TPMIndexHOC(Polllist) );