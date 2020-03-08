import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { withRouter } from 'react-router'
import Loadable from 'react-loadable';
import Loading from '../../Loading';
import axios from 'axios';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import { CNotificationHOC } from './common/CNotificationHOC'
import {ImageLayerOfCommentHOC} from '../page/layers/ImageLayerOfCommentHOC'
import "./css/Courses.css"
//引入对应跳转的组件

const ListPageIndex = Loadable({
    loader: () => import('./ListPageIndex'),
    loading:Loading,
})

//课堂首页
const CoursesHome = Loadable({
    loader: () => import('./coursesHome/CoursesHome'),
    loading:Loading,
})

//课堂详情页
const CoursesDetail= Loadable({
    loader: () => import('./coursesDetail/CoursesDetail'),
    loading:Loading,
})



// 课堂讨论
const BoardIndex = Loadable({
    loader: () => import('./BoardIndex'),
    loading:Loading,
})




const GraduationTopics= Loadable({
    loader: () => import('./graduation/topics'),
    loading: Loading,
})
const GraduationTopicsDetail= Loadable({
    loader: () => import('./graduation/topics/GraduateTopicDetail'),
    loading: Loading,
})
const GraduateTopicPostWorksNew= Loadable({
    loader: () => import('./graduation/topics/GraduateTopicPostWorksNew'),
    loading: Loading,
})
const GraduateTopicNew= Loadable({
    loader: () => import('./graduation/topics/GraduateTopicNew'),
    loading: Loading,
})

const GraduationTasks= Loadable({
    loader: () => import('./graduation/tasks'),
    loading: Loading,
})

// 资源
const  Resourcelist= Loadable({
    loader: () => import('./Resource/index'),
    loading: Loading,
})

//新建实训
const WrappedCoursesNewApp= Loadable({
    loader: () => import('./new/CoursesNew'),
    loading: Loading,
})
//新建精品课堂
const WrappedCoursesNewAppGoldclass= Loadable({
  loader: () => import('./new/Goldsubject'),
  loading: Loading,
})
const ShixunHomeworkPage =Loadable({
  loader: () => import('./shixunHomework/ShixunHomeworkPage'),
  loading: Loading,
})
//实训作业
const ShixunHomework= Loadable({
    loader: () => import('./shixunHomework/shixunHomework'),
    loading: Loading,
})

//实训作业设置
const Trainingjobsetting= Loadable({
    loader: () => import('./shixunHomework/Trainingjobsetting'),
    loading: Loading,
})
//实训作业列表教师

// //实训作业列表学生未完成的
// const Studentnotcompleted= Loadable({
//     loader: () => import('./shixunHomework/Listofworksstudentone'),
//     loading: Loading,
// })
//实训作业列表完成的
const Studenthascompleted= Loadable({
    loader: () => import('./shixunHomework/Listofworksstudentone'),
    loading: Loading,
})


//实训作业提交总结
const  CommitSummary = Loadable({
    loader: () => import('./shixunHomework/CommitSummary'),
    loading: Loading,
})
//实训作业设置
const Workquestionandanswer= Loadable({
    loader: () => import('./shixunHomework/Workquestionandanswer'),
    loading: Loading,
})


//实训报告
const ShixunWorkReport= Loadable({
    loader: () => import('./shixunHomework/ShixunWorkReport'),
    loading: Loading,
})

//实训查重
const ShixunStudentWork= Loadable({
    loader: () => import('./shixunHomework/ShixunStudentWork'),
    loading: Loading,
})

//实训查重详情
const ShixunWorkDetails= Loadable({
    loader: () => import('./shixunHomework/ShixunWorkDetails'),
    loading: Loading,
})

//问卷
const Poll= Loadable({
    loader: () => import('./poll/Poll'),
    loading: Loading,
})
//问卷新建
const PollNew= Loadable({
    loader: () => import('./poll/PollNew'),
    loading: Loading,
})
//问卷答题
const PollInfo= Loadable({
    loader: () => import('./poll/PollInfo'),
    loading: Loading,
})
//问卷详情
const PollDetail= Loadable({
    loader: () => import('./poll/PollDetailIndex'),
    loading: Loading,
})


//试卷
const Exercise= Loadable({
    loader: () => import('./exercise/Exercise'),
    loading: Loading,
})
const Testpapersettinghomepage =Loadable({
    loader: () => import('./exercise/Testpapersettinghomepage'),
    loading: Loading,
})
const ExerciseNew =Loadable({
    loader: () => import('./exercise/ExerciseNew'),
    loading: Loading,
})
const ExerciseReviewAndAnswer=Loadable({
    loader:() => import('./exercise/ExerciseReviewAndAnswer'),
    loading: Loading,
})

//学生列表
const  Studentshavecompletedthelist = Loadable({
    loader: () => import('./exercise/Studentshavecompletedthelist'),
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
})


//普通作业
const CommonWork= Loadable({
    loader: () => import('./busyWork/Index'),
    loading: Loading,
})
const GroupWork= Loadable({
    loader: () => import('./busyWork/IndexGroup'),
    loading: Loading,
})

//
// //分组作业
// const GroupWork= Loadable({
//   loader: () => import('./busyWork/GroupWork'),
//   loading: Loading,
// })

//毕设任务列表新建
const GraduationTaskseditApp= Loadable({
    loader: () => import('./graduation/tasks/GraduationTasksedit'),
    loading: Loading,
})

//毕设任务列表编辑
const GraduationTasksnewApp= Loadable({
    loader: () => import('./graduation/tasks/GraduationTasksnew'),
    loading: Loading,
})

//毕设任务列表设置
const GraduationTasksquestions= Loadable({
    loader: () => import('./graduation/tasks/GraduationTaskssettingquestions'),
    loading: Loading,
})

//毕设任务列表

const GraduationTaskssettinglist= Loadable({
    loader: () => import('./graduation/tasks/GraduationTaskDetail'),
    loading: Loading,
})

//毕业任务设置

const GraduationTaskssetting=Loadable({
    loader: () => import('./graduation/tasks/GraduationTaskssetting'),
    loading: Loading,
})

// 评阅列表

const GraduationTasksappraise=Loadable({
    loader: () => import('./graduation/tasks/GraduationTasksappraise'),
    loading: Loading,
})


//创建作品

const GraduationTasksSubmitnewApp=Loadable({
    loader: () => import('./graduation/tasks/GraduationTasksSubmitnew'),
    loading: Loading,
})

//修改作品

const GraduationTasksSubmiteditApp=Loadable({
    loader: () => import('./graduation/tasks/GraduationTasksSubmitedit'),
    loading: Loading,
})

//排序
const Ordering=Loadable({
	loader: () => import('../../modules/courses/ordering/Ordering'),
	loading: Loading,
});
class CoursesIndex extends Component{
    constructor(props) {
        super(props)
        this.state={
            coursesids: undefined,
            coursesidsfun:this.coursesidsfun,
            updataleftNavfun:this.updataleftNav,
            course_modules:undefined,
            hidden_modules:[],
            is_teacher:false,
            isaloadtype:true,
            coursesidtype:undefined,
            locationNavfun:this.locationNav,
            unlocationNavfun:this.unlocationNavfun
        }
    }

    coursesidsfun=(id,type)=>{
        this.setState({
            coursesids:id,
            coursesidtype:type
        })
    }

    componentDidMount(){
        // this.updataleftNav()
        this.historyArray = [window.location.pathname];

        this.props.history.listen( location =>  {
            this.historyArray.unshift(window.location.pathname);
            this.historyArray.length = 2;
			//Do your stuff here
		});
    }
    //更新左边课堂导航
    updataleftNav=()=>{
        let query=this.props.location.pathname
        let {isaloadtype}=this.state;
        let types=isaloadtype===false?true:false
        const type = query.split('/');
        let id=parseInt(type[2])
        if(isNaN(id)){
            return
        }

      const querys = this.props.location.search;
      var dataqueryss={}
      try {
        var foqus=this.foo(querys);
        if(JSON.stringify(foqus) ==="{}"){
          this.setState({
            dataquerys:{},
          });
        }else{
          this.setState({
            dataquerys:foqus,
          });
          dataqueryss=foqus;
        }
      }catch (e) {
        this.setState({
          dataquerys:{},
        })
      }
        // let id=this.props.match.params.coursesId;
        let url ="/courses/"+id+"/left_banner.json"
        axios.get(url,
          {params:
            dataqueryss
          }
          ).then((response) => {
            if(response!=undefined){
                if(response.data&&response.data){
                    this.setState({
                        course_modules:response.data.course_modules,
                        hidden_modules:response.data.hidden_modules,
                        is_teacher:response.data.is_teacher,
                        isaloadtype:types
                    })
                    this.locationNav(response.data.course_modules)
                }
            }
        })
    };
  foo=(url)=> {
    var json = {};
    var regExp = /[\?\&](\w+)(=?)(\w*)/g;
    var arr;
    do {
      arr = regExp.exec(url);
      // console.log(arr); // arr = [完整的字符串, key, 等号或'', value或'']

      if (arr) {
        var key = arr[1];
        var value = arr[3];
        // arr[2] === ''时, value = undefined
        if (!arr[2])
          value = undefined;

        json[key] = value;
      }
    } while (arr);

    return json;
  };

    locationNav=(list)=>{
      if(list){
        let url=this.props.location.pathname;
        const type = url.split('/');
        let filesId=parseInt(type[4]);
        // let urls=this.props.match.url

        var lists=list;

        lists.forEach((item,index)=>{

          if(url===item.category_url){
            this.setState({
              indexs:index,
              mainurl:item.category_url
            })
            this.coursesidsfun(item.id,"node")
          }else{
            if(item.second_category!=undefined&&item.second_category.length!=0){
              item.second_category.forEach((iem,key)=>{
                if(url===iem.second_category_url){

                  if( parseInt(filesId)===iem.category_id||parseInt(filesId)===item.id){
                    this.setState({
                      indexs:index,
                      url:url,
                      mainurl:item.category_url
                    })
                  }
                  this.coursesidsfun(item.id,"child")
                }
              })
            }

          }

        })
      }

    }

		unlocationNavfun=(val)=>{
			this.setState({
				indexs:val,
			})
		}
    // // 老师、管理员等
    // isAdmin = () => {
    //   return this.state.coursedata && this.state.coursedata.course_identity < 4
    // }
    // // 学生
    // isStudent = () => {
    //   return this.state.coursedata && this.state.coursedata.course_identity === 4
    // }
    // isAdminOrStudent = () => {
    //   return this.state.coursedata && this.state.coursedata.course_identity <= 4
    // }
    // // 非课堂成员
    // isNotMember = () => {
    //   return this.state.coursedata && this.state.coursedata.course_identity === 5
    // }


    // isCourseidentity = () => {
    //
    //   if(this.state.coursedata&&this.state.coursedata.course_identity < 4){
    //     return "isAdmin"
    //     // 老师、管理员等
    //   }else if(this.state.coursedata&&this.state.coursedata.course_identity === 4){
    //     return "isStudent"
    //     // 学生
    //   }else if(this.state.coursedata&&this.state.coursedata.course_identity === 5){
    //     return "isNotMember"
    //     // 非课堂成员
    //   }
    //
    // }


    // componentDidMount(){
    // // console.log(this.props.location.pathname)
    // let query=this.props.location.pathname;
    // const type = query.split('/');
    // if (!type[2]) {
    //   return;
    // }
    // let id=parseInt(type[2])
    //
    // let url="/courses/"+id+"/top_banner.json"
    // axios.get(url).then((result)=>{
    //   if(result.status===200){
    //     let data=result.data;
    //     this.setState({
    //       coursedata:data
    //     })
    //
    //     // console.log(data)
    //   }
    // }).catch((error)=>{
    //   console.log(error);
    // })

    // }

    render() {
        const common = {
            previousPathName: this.historyArray && this.historyArray[1]
            // isAdmin: this.isAdmin,
            // isStudent: this.isStudent,
            // isAdminOrStudent: this.isAdminOrStudent,

            // isNotMember: this.isNotMember,
            // isCourseidentity:this.isCourseidentity
        }
        // const commons = {
        //     admind: this.props.user,
        //     // isAdminOrStudent: this.isAdminOrStudent,
        //
        //     // isNotMember: this.isNotMember,
        //     // isCourseidentity:this.isCourseidentity
        // }
        // console.log("commonscommons")
        // console.log(commons)
        return (
            <Switch {...this.props}>
								{/*排序*/}
								<Route path="/courses/:coursesId/ordering/:ordering_type/:main_id"
											 render={
												 (props) => (<Ordering {...this.props} {...props} {...this.state} />)
											 }
								></Route>
              {/*视频列表*/}

              <Route path="/courses/:coursesId/course_videos"
                     render={
                       (props) => (<ListPageIndex {...this.props} {...props} {...this.state} />)
                     }
              ></Route>
                {/* 资源列表页  */}
                <Route path="/courses/:coursesId/file/:Id" exact
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                <Route path="/courses/:coursesId/files/:main_id"
                       render={
                         (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                <Route exact path="/courses/:coursesId/boards/:boardId"
                    render={
                        (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                    }
                ></Route>
                {/*课堂讨论*/}
                <Route path="/courses/:coursesId/boards/:boardId"
                       render={
                           (props) => (<BoardIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 毕业设计 */}
                {/* 毕设问答 */}
                <Route path="/courses/:coursesId/graduation_topics/postwork/new"
                       render={
                           (props) => (<GraduateTopicPostWorksNew {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 毕设选题新建页 */}
                <Route path="/courses/:coursesId/graduation_topics/new"
                       render={
                           (props) => (<GraduateTopicNew {...this.props} {...props} {...this.state} {...common}/>)
                       }></Route>
                {/* 毕设选题编辑页*/}
                <Route path="/courses/:coursesId/graduation_topics/:topicId/edit"
                       render={
                           (props) => (<GraduateTopicNew {...this.props} {...props} {...this.state} {...common}/>)
                       }></Route>

                {/* 毕设选题详情页 */}
                <Route path="/courses/:course_id/graduation_topics/:graduation_topic_id/detail"
                       render={
                           (props)=>(<GraduationTopicsDetail {...this.props} {...props} {...this.state}></GraduationTopicsDetail>)
                       }
                ></Route>

                {/* 毕设选题列表 */}
                <Route path="/courses/:coursesId/graduation_topics/:Id" exact
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }></Route>


                {/*————————————————————————————————————————————————————————————————————————————————————*/}
                {/* 作品评阅 https://www.trustie.net/issues/19981 */}
                <Route path="/courses/:coursesId/graduation_tasks/:category_id/appraise"
                       render={
                           (props) => (<GraduationTasksappraise {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 新建作品 */}
                <Route path="/courses/:coursesId/graduation_tasks/:category_id/works/:task_Id/new"
                       render={
                           (props) => (<GraduationTasksSubmitnewApp {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 修改作品  */}
                <Route path="/courses/:coursesId/graduation_tasks/:category_id/works/:work_Id/edit"
                       render={
                           (props) => (<GraduationTasksSubmiteditApp {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 设置毕设任务 https://www.trustie.net/issues/19981 */}

                {/* <Route path="/courses/:coursesId/graduation_tasks/:category_id/:task_Id/setting"
                       render={
                           (props) => (<GraduationTaskssetting {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                <Route path="/courses/:coursesId/graduation_tasks/:category_id/:task_Id/questions"
                    render={
                    (props) => (<GraduationTasksquestions {...this.props} {...props} {...this.state} />)
                }></Route> */}


                <Route path="/courses/:coursesId/graduation_tasks/:category_id/detail/:task_Id"
                       render={
                           (props) => (<GraduationTaskssettinglist {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                {/* 修改毕设任务 https://www.trustie.net/issues/19981 */}
                <Route path="/courses/:coursesId/graduation_tasks/:category_id/edit"
                       render={
                           (props) => (<GraduationTaskseditApp {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                {/* 新建毕设任务 https://www.trustie.net/issues/19981 */}
                <Route path="/courses/:coursesId/graduation_tasks/:category_id/new"
                       render={
                           (props) => (<GraduationTasksnewApp {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                {/* 毕设任务列表 https://www.trustie.net/issues/19981 */}
                <Route path="/courses/:coursesId/graduation_tasks/:Id" exact
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/*/!* 毕业设计主 https://www.trustie.net/issues/19981 *!/*/}
                {/*<Route path="/courses/:coursesId/graduation"*/}
                       {/*render={*/}
                           {/*(props) => (<GraduationTopics {...this.props} {...props} {...this.state} {...common}/>)*/}
                       {/*}*/}
                {/*></Route>*/}

                {/*/!* 资源子目录 https://www.trustie.net/issues/19917 *!/*/}
                {/*<Route path="/courses/:coursesId/attachment/attachment/:attachmentId"*/}
                {/*render={*/}
                {/*(props) => (<Files {...this.props} {...props} {...this.state} {...common}/>)*/}
                {/*}*/}
                {/*></Route>*/}
                {/* 教师列表*/}
                <Route path="/courses/:coursesId/teachers"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                {/* 学生列表*/}
                <Route path="/courses/:coursesId/students"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                {/* 分班列表 */}
                <Route path="/courses/:coursesId/course_groups/:course_group_id"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                <Route path="/courses/:coursesId/course_groups"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 普通作业 */}
                <Route path="/courses/:coursesId/common_homeworks/:category_id" exact
                render={
                    (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                }
                ></Route>
                {/* 分组作业 */}
                <Route path="/courses/:coursesId/group_homeworks/:category_id" exact
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 普通作业 */}
                <Route path="/courses/:coursesId/common_homeworks/" strict
                       render={
                           (props) => (<CommonWork {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 分组作业 */}
                <Route path="/courses/:coursesId/group_homeworks/" strict
                       render={
                           (props) => (<GroupWork {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 问卷答题 */}
                <Route path="/courses/:coursesId/polls/:pollId/users/:login"
                       render={
                           (props) => (<PollInfo {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 问卷详情  */}
                <Route path="/courses/:coursesId/polls/:pollId/detail"
                       render={
                           (props) => (<PollDetail {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 问卷新建 */}
                <Route path="/courses/:coursesId/polls/:pollid/:news"
                       render={
                           (props) => (<PollNew {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                {/*/!* 问卷编辑 *!/*/}
                {/*<Route path="/courses/:coursesId/polls/:pollid/:news"*/}
                       {/*render={*/}
                           {/*(props) => (<PollNew {...this.props} {...props} {...this.state} {...common} />)*/}
                       {/*}*/}
                {/*></Route>*/}
                {/* 问卷  */}
                <Route path="/courses/:coursesId/polls/:Id"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                {/* 试卷查看/评阅 */}
                <Route exact path="/courses/:coursesId/exercises/:Id/users/:userId"
                    render={
                    (props)=>(<ExerciseReviewAndAnswer {...this.props} {...props} {...this.state} {...common}/>)
                    }
                ></Route>

                {/*试卷新建  */}
                <Route exact path="/courses/:coursesId/exercises/new"
                    render={
                    (props) => (<ExerciseNew {...this.props} {...props} {...this.state} {...common}/>)
                    }
                ></Route>
                {/*试卷新建  */}
                <Route exact path="/courses/:coursesId/exercises/:Id/edit"
                    render={
                    (props) => (<ExerciseNew {...this.props} {...props} {...this.state} {...common}/>)
                    }
                ></Route>

                {/*试卷设置主页*/}

                <Route path="/courses/:coursesId/exercises/:Id/student_exercise_list"
                       render={
                           (props) => (<Testpapersettinghomepage {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                {/*学生完成列表*/}
                <Route
                    path="/courses/:coursesId/exercises/:Id/Studentshavecompletedthelist"
                    render={
                        (props) => (<Studentshavecompletedthelist {...this.props} {...props} {...this.state} {...common}/>)
                    }
                >
                </Route>
                {/* 试卷  */}
                <Route path="/courses/:coursesId/exercises/:Id"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>


                {/*实训查重详情*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/review_detail/:userid"
                       render={
                           (props) => (<ShixunWorkDetails {...this.props} {...props}  {...this.state} {...common}/>)
                       }
                ></Route>
              <Route path="/courses/:coursesId/shixun_homework/:homeworkid/review_detail/:userid"
                     render={
                       (props) => (<ShixunWorkDetails {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>

                {/*实训查重列表*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/student_work"
                       render={
                           (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                       }
                ></Route>
              <Route path="/courses/:coursesId/shixun_homework/:homeworkid/student_work"
                     render={
                       (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>

                {/*实训报告*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/shixun_work_report"
                       render={
                           (props) => (<ShixunWorkReport {...this.props} {...props}  {...this.state} {...common}/>)
                       }
                ></Route>
              <Route path="/courses/:coursesId/shixun_homework/:homeworkid/shixun_work_report"
                     render={
                       (props) => (<ShixunWorkReport {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>

                {/*教师列表*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/list"
                       render={
                           (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                       }
                ></Route>
              <Route path="/courses/:coursesId/shixun_homework/:homeworkid/list"
                     render={
                       (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>
               {/*实训作业page*/}
              <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/Page"
                     render={
                       (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>
                {/*实训作业设置*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/settings"
                       render={
                           (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                       }
                ></Route>
              <Route path="/courses/:coursesId/shixun_homework/:homeworkid/settings"
                     render={
                       (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>
                {/*/!*实训作品列表教师*!/*/}
                {/*提交总结*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:id/commitsummary/:homeworkid"
                       render={
                           (props) => (<CommitSummary {...this.props} {...props}  {...this.state}  />)
                       }
                ></Route>
              <Route path="/courses/:coursesId/shixun_homework/:id/commitsummary/:homeworkid"
                     render={
                       (props) => (<CommitSummary {...this.props} {...props}  {...this.state}  />)
                     }
              ></Route>
                {/*实训作品列表学生未公布*/}
                {/*<Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/noopenlist"*/}
                {/*       render={*/}
                {/*           (props) => (<Studentnotcompleted {...this.props} {...props}  {...this.state}  />)*/}
                {/*       }*/}
                {/*></Route>*/}
                {/*实训学生作品列表已公布*/}
              {/*  <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/list"*/}
              {/*         render={*/}
              {/*             (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state}  />)*/}
              {/*         }*/}
              {/*  ></Route>*/}
              {/*/!*实训学生作品列表已公布*!/*/}
              {/*<Route   path="/courses/:coursesId/shixun_homework/:homeworkid/list"*/}
              {/*       render={*/}
              {/*         (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state}  />)*/}
              {/*       }*/}
              {/*></Route>*/}



              {/*实训作业问答主目录*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:homeworkid/questions"
                       render={
                           (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                       }
                ></Route>

              {/*实训作业问答子目录*/}
              <Route path="/courses/:coursesId/shixun_homework/:homeworkid/questions"
                     render={
                       (props) => (<ShixunHomeworkPage {...this.props} {...props}  {...this.state} {...common}/>)
                     }
              ></Route>

                {/*新建课堂*/}
                <Route path="/courses/new"
                       render={
                           (props) => (<WrappedCoursesNewApp {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
              {/*新建精品课堂*/}
              {/*coursesId 课堂id */}
              {/*id 是否是私有或者公有*/}
              <Route path="/courses/news/:subjectid/newgold/:id"
                     render={
                       (props) => (<WrappedCoursesNewAppGoldclass {...this.props} {...props} {...this.state} {...common}/>)
                     }
              ></Route>
              {/*修改精品课堂*/}
              <Route path="/courses/:coursesId/newgolds/settings"
                     render={
                       (props) => (<WrappedCoursesNewAppGoldclass {...this.props} {...props} {...this.state} {...common}/>)
                     }
              ></Route>
                {/*修改课堂*/}
                <Route path="/courses/:coursesId/settings"
                       render={
                           (props) => (<WrappedCoursesNewApp {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 实训作业子页面*/}
                <Route path="/courses/:coursesId/shixun_homework/:category_id"
                       render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

                {/* 实训作业页面*/}
                <Route path="/courses/:coursesId/shixun_homeworks/:main_id"
                       render={
                         (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>

								{/*课堂统计列表2019.10.29 */}

								<Route path="/courses/:coursesId/statistics"
											 render={
												 (props) => (<ListPageIndex {...this.props} {...props} {...this.state} />)
											 }
								></Route>

                {/*/!*实训作业and课堂详情页*!/*/}
                <Route path="/courses/:coursesId"
                        render={
                           (props) => (<ListPageIndex {...this.props} {...props} {...this.state} {...common}/>)
                        }
                ></Route>

                {/*课堂首页*/}
                <Route path="/courses"
                       render={
                           (props) => (<CoursesHome {...this.props} {...props} {...this.state} {...common}/>)
                       }
                ></Route>
                {/*<Route exact path="/courses" component={CoursesHome}  {...this.props}  {...props}  {...this.state} ></Route>*/}

            </Switch>
        )
    }
}

export default withRouter(ImageLayerOfCommentHOC({imgSelector: '.imageLayerParent img, .imageLayerParent .imageTarget', parentSelector: '.newMain'}) (CNotificationHOC() ( SnackbarHOC() ( TPMIndexHOC(CoursesIndex) ))));