import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import { CNotificationHOC } from '../common/CNotificationHOC'
import { RouteHOC } from './common'
import "../css/busyWork.css"
//引入对应跳转的组件
const ListPageIndex = Loadable({
    loader: () => import('../ListPageIndex'),
    loading:Loading,
})
//新建分组/普通作业
const NewWork = Loadable({
    loader: () => import('./NewWork'),
    loading:Loading,
})
const CommonWorkPost = Loadable({
  loader: () => import('./CommonWorkPost'),
  loading:Loading,
})
const CommonWorkSetting = Loadable({
  loader: () => import('./CommonWorkSetting'),
  loading:Loading,
})
const CommonWorkList = Loadable({
  loader: () => import('./CommonWorkList'),
  loading:Loading,
})
const CommonWorkQuestion = Loadable({
  loader: () => import('./CommonWorkQuestion'),
  loading:Loading,
})
const CommonWorkAnswer = Loadable({
  loader: () => import('./CommonWorkAnswer'),
  loading:Loading,
})
const CommonWorkAppraise = Loadable({
  loader: () => import('./CommonWorkAppraise'),
  loading:Loading,
})


const CommonWork = Loadable({
  loader: () => import('./commonWork'),
  loading:Loading,
})

const CommonWorkDetailIndex = Loadable({
  loader: () => import('./CommonWorkDetailIndex'),
  loading:Loading,
})
class CoursesWorkIndex extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
          <Switch {...this.props}>
           
            
            {/* --------------------------------------------------------------------- */}

            {/* --------------------------------------------------------------------- */}

            {/* 作业设置 */}
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/setting"
              render={
                (props) => (<CommonWorkDetailIndex {...this.props} {...props} {...this.state} />)
              }
            ></Route>

            {/* 作品列表 */}
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/list"
              render={
                (props) => (<CommonWorkDetailIndex {...this.props} {...props} {...this.state} />)
              }
            ></Route>

            {/* 作业问答 */}
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/question"
              render={
                (props) => (<CommonWorkDetailIndex {...this.props} {...props} {...this.state} />)
              }
            ></Route>
            {/* 参考答案 */}
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/answer"
              render={
                (props) => (<CommonWorkDetailIndex {...this.props} {...props} {...this.state} />)
              }
            ></Route>
            {/* 评阅 */}
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/:studentWorkId/appraise"
              render={
                (props) => (<CommonWorkAppraise {...this.props} {...props} {...this.state} />)
              }
            ></Route>


            <Route exact path="/courses/:coursesId/group_homeworks/:workId/post"
              render={
                (props) => (<CommonWorkPost {...this.props} {...props} {...this.state} />)
              }
            ></Route>
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/:studentWorkId/post_edit"
              render={
                (props) => (<CommonWorkPost {...this.props} {...props} {...this.state} />)
              }
            ></Route>

            {/* 新建 */}
            {/* http://localhost:3007/courses/1309/group_homeworks/9299/edit/1 */}
            <Route exact path="/courses/:coursesId/group_homeworks/:workId/:pageType"
              render={
                (props) => (<NewWork {...this.props} {...props} {...this.state} />)
              }
            ></Route>
            <Route exact path="/courses/:coursesId/group_homeworks/:categroy_id/new"
              render={
                (props) => (<NewWork {...this.props} {...props} {...this.state} />)
              }
            ></Route>

            {/* 作业列表 */}
            <Route path="/courses/:coursesId/group_homeworks"
              render={
                (props) => (<ListPageIndex {...this.props} {...props} {...this.state} />)
              }
            ></Route>

            
          </Switch>
      </div>
    )
  }
}

export default RouteHOC() (CNotificationHOC() (SnackbarHOC() ( CoursesWorkIndex) ));