import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';

import "../css/Courses.css"
//引入对应跳转的组件

// {/*提交总结*/}
// const CommitSummary = Loadable({
//   loader: () => import('../shixunHomework/CommitSummary'),
//   loading:Loading,
// })
//
//
// //实训设置
//
// const StudentHomework = Loadable({
//   loader: () => import('./StudentHomework'),
//   loading:Loading,
// })
//

class CommitSummaryIndex extends Component{
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div>
        <Switch {...this.props}>

          {/*/!*提交总结*!/*/}
          {/*<Route path="/student_work/:StudentId/commit_summary" component={CommitSummary}  {...this.props} {...this.state}></Route>*/}

          {/*/!*实训设置*!/*/}
          {/*<Route path={"/student_work/homework"} component={StudentHomework} {...this.props} {...this.state}></Route>*/}

          {/*/!*提交总结*!/*/}
          {/*<Route exact path="/student_work" component={CommitSummary}  {...this.props} {...this.state}></Route>*/}

        </Switch>
      </div>
    )
  }
}

export default SnackbarHOC() ( TPMIndexHOC(CommitSummaryIndex) );