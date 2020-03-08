import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import {Input,Pagination,Tooltip} from 'antd';
import Loadable from 'react-loadable';
import Loading from '../../Loading';
import Guide from "../../modules/courses/shixunHomework/Guide";
//业务组件
import CoursesBanner from "./coursesDetail/CoursesBanner";
import Coursesleftnav from "./coursesDetail/CoursesLeftNav";

//普通作业
const CommonWork = Loadable({
  loader: () => import('./busyWork/commonWork'),
  loading:Loading,
})
const GroupWork= Loadable({
    loader: () => import('./busyWork/commonWork'),
    loading: Loading,
})
// 讨论
const Boards= Loadable({
  loader: () => import('./boards'),
  loading: Loading,
})
//教师列表
const TeacherList= Loadable({
    loader: () => import('./members/teacherList'),
    loading: Loading,
})
//学生列表
const StudentsList= Loadable({
    loader: () => import('./members/studentsList'),
    loading: Loading,
});
//分班列表
const CourseGroupList= Loadable({
    loader: () => import('./members/CourseGroupList'),
    loading: Loading,
});

const Eduinforms= Loadable({
  loader: () => import('./gradinforms/Eduinforms'),
  loading: Loading,
});

//2019.10.29 统计
const Statistics=Loadable({
	loader: () => import('./statistics/Statistics'),
	loading: Loading,
});

const Elearning= Loadable({
  loader: () => import('./elearning/Elearning'),
  loading: Loading,
});
//
const Exercise= Loadable({
    loader: () => import('./exercise/Exercise'),
    loading: Loading,
})
//
const Poll= Loadable({
    loader: () => import('./poll/Poll'),
    loading: Loading,
})

// 资源
const  Resourcelist= Loadable({
    loader: () => import('./Resource/index'),
    loading: Loading,
})

// 视频
const CourseVideo = Loadable({
  loader: () => import('./Video/VideoIndex'),
  loading: Loading,
})

//实训作业
const ShixunHomework= Loadable({
    loader: () => import('./shixunHomework/shixunHomework'),
    loading: Loading,
})

const GraduationTopics= Loadable({
    loader: () => import('./graduation/topics'),
    loading: Loading,
})
const GraduationTasks= Loadable({
    loader: () => import('./graduation/tasks'),
    loading: Loading,
})
class ListPageIndex extends Component{
  constructor(props) {
    super(props);
    this.state={
      yslGuideone:undefined,
      yslElearning:false,
			isexcellent:false
    }
  }
  comyslElearning(bool){
    if(bool===true){
      this.setState({
        yslElearning:true,
      })
    }else {
      this.setState({
        yslElearning:false,
      })
    }

  }
  componentDidMount(){
    // console.log("77");
    var yslGuideone = window.localStorage.getItem('yslGuideone');
    // console.log("78");
    // console.log(yslGuideone);
    try {
      if (yslGuideone === "true") {
        // console.log("true 字符串");
        this.setState({
          yslGuideone:true,
        })
      } else {
        this.setState({
          yslGuideone:false,
        });
        // console.log("false 字符串");
      }
    }catch (e) {
      console.log(e);
      this.setState({
        yslGuideone:false,
      });
    }


  }
  //
  // getleftNavid=(navid,newselectnavid)=>{
  //   console.log(navid,newselectnavid)
  //   this.setState({
  //     navkey:navid,
  //     navttype:newselectnavid
  //   })
  // }
  componentWillUnmount(){
    // window.localStorage.setItem('yslGuideone', "false");
  }
  setwindowlocal=(bool)=>{
     window.localStorage.setItem('yslGuideone', bool);
    try {
      if (bool === "true") {

        this.setState({
          yslGuideone:true,
        })
      } else {
        this.setState({
          yslGuideone:false,
        });

      }
    }catch (e) {
      // console.log(e);
      this.setState({
        yslGuideone:false,
      });
    }
   }
	ispostexcellenttype=(excellent)=>{
  	this.setState({
			isexcellent:excellent
		})
	}
  render() {
    let {yslGuideone} =this.state;
    // console.log("98");
    // console.log(yslGuideone);
    // console.log(this.props.isAdmin());
    // // var yslGuideones = window.sessionStorage.getItem('yslGuideone');
    // console.log(this.props);
    // console.log(this.props.location.search);
      return (
      <div>
          <div className="newMain clearfix">
              {/*头部banner*/}
              <CoursesBanner {...this.props} ispostexcellenttype={(excellent)=>this.ispostexcellenttype(excellent)}></CoursesBanner>
            {/*下面是指引哦*/}
            {/*{yslGuideone!==undefined?*/}
            {/*(*/}
            {/*  yslGuideone===true?*/}
            {/*    <Guide*/}
            {/*      setwindowlocal={(b)=>this.setwindowlocal(b)}*/}
            {/*    >*/}
            {/*    </Guide>*/}
            {/*    :""*/}
            {/* )*/}
            {/* :""*/}
            {/*}*/}
              <div className="educontent clearfix" style={{flex: "1 0 auto"}}>

                  <div className="stud-class-set">
                      <div className="news">
                          <div className="edu-class-inner container clearfix">
                              <div className="member for-content-0 for-content">
                                  <div className="people clearfix mb60">

                                      {/*left_nav*/}
                                      <div className={"with22 fl setleft"} style={{width:'264px',minHeight:'500px'}}>
                                         <Coursesleftnav {...this.props} {...this.state}  comyslElearning={(i)=>this.comyslElearning(i)}/>
                                      </div>

                                      {/*right_concent*/}
                                      <div className="with78 fl">
                                          <div className={"ml20 clearfix"}>
                                              <Switch {...this.props}>
                                                {/* --------------------------------------------------------------------- */}

                                                {/* 作业设置 */}
                                                {/* http://localhost:3007/courses/1309/homework/9300/setting */}
                                                {/* 普通作业 */}
                                                <Route path="/courses/:coursesId/common_homeworks/:category_id"
                                                    render={
                                                        (props) => (<CommonWork {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

                                                {/* 作品列表 */}
                                                <Route path="/courses/:coursesId/group_homeworks/:category_id"
                                                    render={
                                                        (props) => (<CommonWork {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

                                                <Route exact path="/courses/:coursesId/boards/:boardId"
                                                    render={
                                                        (props) => (<Boards {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                {/*视频列表*/}

                                                <Route path="/courses/:coursesId/course_videos"
                                                       render={
                                                         (props) => (<CourseVideo {...this.props} {...props} {...this.state} />)
                                                       }
                                                ></Route>
                                                <Route path="/courses/:coursesId/teachers"
                                                    render={
                                                        (props) => (<TeacherList {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                {/* 学生列表*/}
                                                <Route path="/courses/:coursesId/students"
                                                    render={
                                                        (props) => (<StudentsList {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                <Route path="/courses/:coursesId/course_groups/:course_group_id"
                                                    render={
                                                        (props) => (<StudentsList {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                <Route path="/courses/:coursesId/course_groups"
                                                    render={
                                                        (props) => (<CourseGroupList {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

                                                <Route path="/courses/:coursesId/exercises/:Id"
                                                    render={
                                                        (props) => (<Exercise {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

                                                <Route path="/courses/:coursesId/polls/:Id"
                                                    render={
                                                        (props) => (<Poll {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                {/* <Route path="/courses/:coursesId/file/:Id"
                                                    render={
                                                        (props) => (<Resourcelist {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route> */}

                                                {/* 实训作业子页面*/}
                                                <Route path="/courses/:coursesId/shixun_homework/:category_id"
                                                    render={
                                                        (props) => (<ShixunHomework {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

																								{/*课堂统计列表2019.10.29 */}

																								<Route path="/courses/:coursesId/statistics"
																											 render={
																												 (props) => (<Statistics {...this.props} {...props} {...this.state} />)
																											 }
																								></Route>
                                                

                                                {/*公告栏列表*/}

                                                <Route path="/courses/:coursesId/informs"
                                                       render={
                                                         (props) => (<Eduinforms {...this.props} {...props} {...this.state} />)
                                                       }
                                                ></Route>
                                                {/*在线学习*/}
                                                <Route
                                                  path="/courses/:coursesId/online_learning"
                                                  render={
                                                    (props) => (<Elearning {...this.props} {...props} {...this.state} comyslElearning={(i)=>this.comyslElearning(i)} />)
                                                  }
                                                >
                                                </Route>
                                                {/* 实训作业页面*/}
                                                <Route path="/courses/:coursesId/shixun_homeworks/:main_id"
                                                    render={
                                                        (props) => (<ShixunHomework {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

                                                
                                                <Route path="/courses/:coursesId/files/:main_id"
                                                    render={
                                                        (props) => (<Resourcelist {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                <Route path="/courses/:coursesId/file/:Id"
                                                    render={
                                                        (props) => (<Resourcelist {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                
                                                <Route path="/courses/:coursesId/graduation_topics/:Id"
                                                    render={
                                                        (props) => (<GraduationTopics {...this.props} {...props} {...this.state} />)
                                                }></Route>
                                                <Route path="/courses/:coursesId/graduation_tasks/:Id"
                                                    render={
                                                        (props) => (<GraduationTasks {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>
                                                {/* 默认 */}
                                                <Route path="/courses/:coursesId"
                                                    render={
                                                        (props) => (<StudentsList {...this.props} {...props} {...this.state} />)
                                                    }
                                                ></Route>

                                              </Switch>
                                          </div>
                                      </div>

                                  </div>
                               </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
    )
  }
}
export default ListPageIndex;