import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../Loading';
import axios from 'axios';
// import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import { CNotificationHOC } from './common/CNotificationHOC'
import "./css/Courses.css"
//引入对应跳转的组件
const ListPageIndex = Loadable({
    loader: () => import('./ListPageIndex'),
    loading:Loading,
})
// 讨论
const BoardsNew= Loadable({
  loader: () => import('./boards/BoardsNew'),
  loading: Loading,
})
const TopicDetail= Loadable({
  loader: () => import('./boards/TopicDetail'),
  loading: Loading,
})

// 讨论
const Boards= Loadable({
  loader: () => import('./boards'),
  loading: Loading,
})


class CoursesIndex extends Component{
  constructor(props) {
    super(props)
    this.state={
      // coursedata:undefined
    }
  }

  componentDidMount(){
    
  }
    render() {
      const common = {
        
      }
      
        return (
                <Switch {...this.props}>

                    {/*课堂讨论*/}
                    {/* /board/5464/messages/new */}
                    {/* <Route exact path="/courses/:coursesId/board/:boardId/messages/:topicId/edit"
                           render={
                             (props) => (<BoardsNew {...this.props} {...props} {...this.state} {...common} />)
                           }
                    ></Route>

                    <Route exact path="/courses/:coursesId/board/:boardId/messages/new" component={BoardsNew}
                           render={
                             (props) => (<BoardsNew {...this.props} {...props} {...this.state} {...common} />)
                           }
                    ></Route> */}

                    


                    {/*课堂讨论*/}
                    <Route exact path="/courses/:coursesId/boards/:boardId/messages/:topicId/edit"
                           render={
                             (props) => (<BoardsNew {...this.props} {...props} {...this.state} {...common} />)
                           }
                    ></Route>
                    <Route exact path="/courses/:coursesId/boards/:boardId/messages/new"
                           render={
                             (props) => (<BoardsNew {...this.props} {...props} {...this.state} {...common} />)
                           }
                    ></Route>
                    <Route exact path="/courses/:coursesId/boards/:boardId/messages/:topicId" 
                      render={
                        (props) => (<TopicDetail {...this.props} {...this.state} {...props} {...common} />)
                      }
                    ></Route>
                    <Route exact path="/courses/:coursesId/boards/:boardId/messages/:topicId"
                      render={
                        (props) => (<TopicDetail {...this.props} {...this.state} {...props} {...common} />)
                      }
                    ></Route>
                    <Route exact path="/courses/:coursesId/boards/:boardId"
                           render={
                             (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common} />)
                           }
                    ></Route>
                    
                </Switch>
        )
    }
}

export default CNotificationHOC() ( SnackbarHOC() ( (CoursesIndex) ));