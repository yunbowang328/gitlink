import React, { Component } from 'react';
import axios from 'axios';
import {Input,Pagination,Tooltip} from 'antd';

//业务组件
//top banner
import CoursesBanner from "./CoursesBanner";
//Left nav
import Coursesleftnav from "./CoursesLeftNav";


// 实训作业
import ShixunHomework from '../shixunHomework/shixunHomework';
// 问卷
import Poll from '../poll/Poll';
// 试卷
import Exercise from '../exercise/Exercise';

//教师列表
import TeacherList from "../members/teacherList"
//普通作业
import CommonWork from "../busyWork/commonWork"
// 毕设选题
import graduationTopics from '../graduation/topics/index'

class CoursesDetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      getleftNavid:undefined,
      coursesId:""
    }
  }

  componentDidMount(){

  }
  getleftNavid=(type,id)=>{
    console.log(type+" "+id)
    this.setState({
      getleftNavid:type,
      coursesId:id
    })
  }
  render() {
    let{getleftNavid,coursesId}=this.state;

    // console.log(getleftNavid)
    return (
      <div>
          <div className="newMain clearfix">
              {/*头部banner*/}
              <CoursesBanner {...this.props}></CoursesBanner>

              <div className="educontent clearfix" style={{flex: "1 0 auto"}}>

                  <div className="stud-class-set">
                      <div className="news">
                          <div className="edu-class-inner container clearfix">
                              <div className="member for-content-0 for-content">
                                  <div className="people clearfix mb60">

                                      {/*left_nav*/}
                                      <div className={"with22 fl setleft"} style={{width:'264px',minHeight:'500px'}}>
                                         <Coursesleftnav
                                           {...this.props}
                                           getleftNavid={this.getleftNavid}
                                         />
                                      </div>

                                      {/*right_concent*/}
                                      <div className="with78 fl">
                                          <div className={"ml20 clearfix"}>
                                              {/* 毕设选题 */}
                                              {getleftNavid==="graduation"?<graduationTopics {...this.props} coursesId={coursesId}></graduationTopics>:""}
                                
                                              {/*/!*普通作业*!/*/}
                                              {/*{getleftNavid==="common_homework"?<CommonWork {...this.props} coursesId={coursesId}/>:""}*/}

                                              <ShixunHomework {...this.props} child={false}/>
                                              {/*{getleftNavid==="shixun_homeworkchild"?<ShixunHomework {...this.props} child={true} />:""}*/}


                                              {/*/!*问卷*!/*/}
                                              {/*{getleftNavid==="poll"?<Poll child={false}/>:""}*/}
                                              {/*/!*试卷*!/*/}
                                              {/*{getleftNavid==="exercise"?<Exercise child={false}/>:""}*/}


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
export default CoursesDetail;