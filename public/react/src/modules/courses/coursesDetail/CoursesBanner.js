import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {getImageUrl, trigger, on, off} from 'educoder';
import { Tooltip, message,Popover,Breadcrumb} from 'antd';
import CoursesListType from '../coursesPublic/CoursesListType';
import AccountProfile from"../../user/AccountProfile";
import Addcourses from '../coursesPublic/Addcourses';
import '../css/Courses.css';
import Modals from "../../modals/Modals";
import Guide from './CoursesGuide';
import AddStudentModal from '../members/modal/AddStudentModal'
import AddTeacherModal from '../members/modal/AddTeacherModal'
import Jointheclass from '../../modals/Jointheclass'
import Certifiedprofessional from "../../modals/Certifiedprofessional";
// 点击按钮复制功能
// function jsCopy(){
//   var e = document.getElementById("copy_invite_code");
//   e.select();
//   document.execCommand("Copy");
//   codesuccess()
// }

// 点击按钮复制功能
function jsCopy() {
    var e = document.getElementById("copy_invite_code");
    e.select();
    document.execCommand("Copy");
    codesuccess()
}

function codesuccess() {
    message.success('复制成功');
};

class CoursesBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            Addcoursestypes: false,
            modalsType: false,
            modalsTopval: "",
            loadtype: false,
            metype: 0,
            modalsBottomval: "",
            antIcon:false,
            coursedata:undefined,
            is_guide:false,
            excellent:false,//是否是精品课堂
            yslJointhe:false,
            mydisplay:false,
            yslJointhes:false,

        }
    }
    componentDidMount() {
			this.onloadupdatabanner()
      on('updatabanner', this.updatabanner)
			if(this.props.match.path==="/courses/:coursesId"){
				if(this.props.user!=undefined){
					this.props.history.push(this.props.user.first_category_url)
				}
			}
      axios.interceptors.response.use((response) => {
        if (response != undefined)
          if (response && response.data.status === 410) {
           this.setState({
             yslJointhe:true,
             yslJointhes:true
           })

          }
        return response;
      }, (error) => {
      });
    }
	componentDidUpdate(prevProps) {
    	if(prevProps.user!=this.props.user){
				if(this.props.match.path==="/courses/:coursesId"){
					if(this.props.user!=undefined){
						this.props.history.push(this.props.user.first_category_url)
					}
				}
			}
	}
    componentWillUnmount() {
      off('updatabanner', this.updatabanner)
    }

  HideAddcoursestypess=(i)=>{
    console.log("调用了");
    this.setState({
      Addcoursestypes:false,
      mydisplay:true,
      occupation:i,
    })
  };
  ModalCancelsy=()=>{
    this.setState({
      mydisplay:false,
    })
  };

  onloadupdatabanner=()=>{
		this.updatabanner()
	}
  updatabanner=()=>{
    const query = this.props.location.search;
    var dataqueryss={}
    try {
      var foqus=this.foo(query);
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
      let courseId = this.props.match.params.coursesId;
      let url = "/courses/" + courseId + "/top_banner.json"
      axios.get(url,{params:
        dataqueryss
      }).then((result) => {
				if(result.data.status===-2){
  				// this.setState({
					// 	AccountProfiletype:true,
					// 	content:result.data.message,
					// 	okText:"立即认证",
					// 	cannelText:"稍后认证",
					// 	okHref:`/account/certification`,
					// 	Accounturltype:true
					// })
				}else{
						if( result!=undefined){
							let data = result.data;
							this.setState({
								coursedata: data,
								excellent:data.excellent,
							})
							this.props.ispostexcellenttype(data.excellent)
						}else{
							this.onloadupdatabanner()
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


    tojoinclass = (val) => {
			if(this.props.current_user&&this.props.current_user.profile_completed===false){
				this.setState({
					AccountProfiletype:true
				})
				return
			}

        if (val === 1) {
            this.setState({
                Addcoursestypes: true,
            })
        } else {
            this.setState({
                Addcoursestypes: false,
            })
        }


    };

    //精品课堂的弹框
    myyslgradin=()=>{
       this.setState({
         yslJointhe:true
       })
    }
    showActionPoll=(i,s,ss,trs)=>{
        this.setState({
            modalsType: true,
            modalsTopval: s,
            loadtype: false,
            metype: i,
            modalsBottomval: ss,
					  modalstrsvalue:trs,
        })
    }
    ActionPoll = (i) => {
        let {coursedata}=this.state;
        var s = "";
        var ss = "";
        if (i === 1) {
            s = "课堂删除后数据将无法恢复，是否确定删除？";
            this.showActionPoll(i,s)
        }
        if (i === 2) {
            s = "您确定要设置为私有?";
            this.showActionPoll(i,s)
        }
        if (i === 3) {
            s = "设为公开后，非课堂成员也可以访问查看";
					  ss =  "是否确认设为公开？";
            this.showActionPoll(i,s,ss)
        }

			if(i===4){
            if(coursedata.code_halt === true){
                var url = `/courses/${this.props.match.params.coursesId}/set_invite_code_halt.json`
                axios.post(url, {}).then((result) => {
                    try {
                        if (result.data.status === 0){
                            this.updatabanner()
                        }
                    } catch (e) {

                    }

                })
            }else{
                s = "课堂邀请码停用后，用户不能主动加入该课堂了";
                ss =  "您是否确认停用?";
                this.showActionPoll(i,s,ss)
            }
            }
        if (i ===5) {
            s = `“复制”功能将会为您创建一个新的课堂`;
            ss = "请问是否继续？";
            let mid="旧课堂的作业、资源、试卷等都将被复制到新的课堂里面";
            this.showActionPoll(i,s,ss,mid)
        }

    }
    //取消
    modalCancel = () => {
        this.setState({
            modalsType: false,
            modalsTopval: "",
            modalsBottomval:"",
            loadtype: false,
            antIcon:false,
					  modalstrsvalue:undefined
        })

    }
    // 确定
    ModalAction = () => {
        let {coursedata}=this.state;
        let that=this;
        var push = this.props.history;
        let id = this.props.match.params.coursesId;
        //删除
        if (this.state.metype === 1) {
          that.setState({
            antIcon:true
          })

            var url = `/courses/${id}.json`
            axios
                .delete(url, {})
                .then(function (response) {
                    console.log(response.data.status)
                    if (response.data.status === 0) {
                        that.setState({
                          antIcon:false
                        })
                        that.modalCancel();
                        message.success("删除成功", 1)
                        push.push(`/courses`)

                    }
                })
        }
        //设为私有的
        if (this.state.metype === 2) {
            this.modalCancel();
            var state = this.state;
            var url = `/courses/${id}/set_public_or_private.json`
            axios.post(url, {}).then((result) => {
                    if (result.data.status === 0) {
                        message.success("设为私有的成功", 1);
                        state.coursedata.is_public = false;
                        this.setState({
                            coursedata: state.coursedata,
                        })
                    }
            })
        }
        //设为公有的
        if (this.state.metype === 3) {
            this.modalCancel();
            var state = this.state;
            var url = `/courses/${id}/set_public_or_private.json`
            axios.post(url, {}).then((result) => {
                    if (result.data.status === 0) {
                        message.success("设为公有的成功", 1);
                        state.coursedata.is_public = true;
                        this.setState({
                            coursedata: state.coursedata,
                        })
                    }
            })
        }
        //停用邀请码
        if (this.state.metype === 4) {
            this.modalCancel();
            var url = `/courses/${id}/set_invite_code_halt.json`
            axios.post(url, {}).then((result) => {
                try {
                    if (result.data.status === 0) {
                        message.success(coursedata.code_halt === true?"启用用邀请码成功":"停用邀请码成功", 1);
                        this.updatabanner()
                    }
                } catch (e) {

                }

            })
        }
        if (this.state.metype ===5) {
            this.setState({
                antIcon: true,
            })
            var url = `/courses/${id}/duplicate_course.json`
            axios.post(url).then((response) => {
              if(response!==undefined){
                window.location.href = "/courses/" + response.data.new_course_id+"/students";
                return
              }
              this.modalCancel();
                // window.location.href = "/courses/" + response.data.new_course_id;

            }).catch( (error)=> {
              this.modalCancel();
              console.log(252);
              console.log(error);
            });
        }

        if(this.state.metype===6){
          this.setState({
            antIcon: true,
          })
          var url =`/courses/${id}/exit_course.json`;
          axios.post(url).then((response) => {
            if(response.data.status===0){
              window.location.href = "/users/" + this.props.current_user.login;
            }
          })
        }


    }
    addTeacher = (isTeacher) => {
        this.setState({ isTeacher }, () => {
            this.refs.addTeacherModal.setVisible(true)
        })

    }
    addStudent = () => {
        this.refs.addStudentModal.setVisible(true)
    }
    addTeacherSuccess = (params) => {
        trigger('addTeacherSuccess', JSON.stringify(params))
        this.updatabanner()
    }
    addStudentSuccess = (params) => {
        trigger('addStudentSuccess', JSON.stringify(params))
        this.updatabanner()
    }
    //退出课堂按钮
    exitclass=()=>{
      this.setState({
        modalsType: true,
        modalsTopval: "退出后您将不再是本课题的成员,作品将全部被删除，",
        modalsBottomval:"确定要退出该课堂吗？",
        metype:6
      })
    }
  //切换身份
  switchidentity=(sum)=>{
    let newurl=this.props.match.url;
    let id = this.props.match.params.coursesId;
    if(sum===1){
     let url =`/courses/${id}/switch_to_student.json`;
      axios.post(url).then((response) => {
      	if(response!=undefined){
					if(response.data.status===0){
						// window.location.href = "/users/" + this.props.current_user.login;
						// this.props.history.replace(newurl);
						window.location.href=newurl
					}
				}
      })
    }


    if(sum===2){
      let url =`/courses/${id}/switch_to_teacher.json`;
      axios.post(url).then((response) => {
				if(response!=undefined){
					if(response.data.status===0){
						// window.location.href = "/users/" + this.props.current_user.login;
						// this.props.history.replace(newurl);
						window.location.href=newurl
					}
				}
      })
    }

    if(sum===3){
      let url =`/courses/${id}/switch_to_assistant.json`;
      axios.post(url).then((response) => {
        if(response.data.status===0){
          // window.location.href = "/users/" + this.props.current_user.login;
          // this.props.history.replace(newurl);
         window.location.href=newurl
        }
      })
    }


  }
  postsettings=()=>{
    window.location.href = "/courses/" + this.props.match.params.coursesId + "/settings";
  };
  postsettingstwo=()=>{
   //  var ids =1;
   // try {
   //   if(this.state.coursedata.is_public){
   //     ids=1;
   //   }else {
   //     ids=0;
   //   }
   // }catch (e) {
   //
   // }
    window.location.href = `/courses/${this.props.match.params.coursesId}/newgolds/settings`;
  };



  hideAccountProfile=()=>{
		this.setState({
			AccountProfiletype:false,
			content:undefined,
			okText:undefined,
			okHref:undefined,
			cannelText:undefined,
			Accounturltype:undefined
		})
	};
  ysljoinmodalCancel=()=>{
    this.setState({
      yslJointhe:false
    })
    if(this.state.yslJointhes===true){
      window.location.href = "/";
    }
  };
  ysljoinmodalCanceltwo=()=>{
    this.setState({
      yslJointhe:false
    })
    window.location.reload();
  };


	setHistoryFun=(url)=>{
		this.props.history.replace(url)
	}


    render() {
        let { Addcoursestypes, coursedata,excellent, modalsType, modalsTopval, loadtype,modalsBottomval,antIcon,is_guide,AccountProfiletype,modalstrsvalue} = this.state;

        const isCourseEnd = this.props.isCourseEnd();
			  document.title=coursedata===undefined || coursedata.status===401 || coursedata.status===407?"":coursedata.name;
        return (
          <div>
						{/*{*/}
						{/*  is_guide && <Guide></Guide>*/}
						{/*}*/}

						{AccountProfiletype===true?<AccountProfile
							hideAccountProfile={()=>this.hideAccountProfile()}
							{...this.props}
							{...this.state}
						/>:""}


            {
              coursedata === undefined || coursedata.status===401? <div id="course_info_1309" className="courseHead" style={{height: '206px'}}></div>:<div id="course_info_1309" className="courseHead" style={{height: '206px'}}>

                {Addcoursestypes === true ? <Addcourses
                  Addcoursestype={Addcoursestypes}
                  hideAddcoursestype={() => this.tojoinclass(2)}
                  HideAddcoursestypess={(i)=>this.HideAddcoursestypess(i)}
                /> : ""}
                <Certifiedprofessional {...this.props} {...this.state}  ModalCancelsy={this.ModalCancelsy} />
                <Modals
                  modalsType={modalsType}
                  modalsTopval={modalsTopval}
                  loadtype={loadtype}
                  modalsBottomval={modalsBottomval}
									modalsMidval={modalstrsvalue}
                  modalCancel={this.modalCancel}
                  modalSave={this.ModalAction}
                  antIcon={antIcon}
                ></Modals>
                <Jointheclass   {...this.props}   {...this.state} ysljoinmodalCancel={()=>this.ysljoinmodalCancel()} ysljoinmodalCanceltwo={()=>this.ysljoinmodalCanceltwo()}></Jointheclass>
                <AddTeacherModal ref="addTeacherModal"
                                 {...this.props}
                                 isTeacher={this.state.isTeacher}
                                 moduleName={this.state.isTeacher ? "教师" : "助教"}
                                 addTeacherSuccess={this.addTeacherSuccess}
                ></AddTeacherModal>
                <AddStudentModal ref="addStudentModal"
                                 {...this.props}
                                 moduleName="学生"
                                 addStudentSuccess={this.addStudentSuccess}
                ></AddStudentModal>
                <div className="educontent clearfix educontentTop">
                  <div className="color-white clearfix mb10">

                    {
                      coursedata===undefined || coursedata.status===401 || coursedata.status===407?"":
                        <Tooltip placement="bottom" title={coursedata&&coursedata.name && coursedata.name.length<38?"":coursedata.name}>
                          <span className="font-24 fl bannername">{coursedata.name}</span>
                        </Tooltip>

                    }
                    {/*私有：私有课堂，非课堂成员不能访问

                      公开：公开课堂，非课堂成员可以访问*/}
                    <style>
                      {
                        `
                        .tag-orangces  .tag-names{
                        display: block;
                        width: auto;
                        background-color: #FF6800;
                        background-size: 100% 100%;
                        padding: 0px 4px;
                        color: #fff;
                        float: left;
                        height: 28px;
                        line-height: 28px;
                        font-size: 14px;
                        border-radius: 4px;
                      }
                      `
                      }
                    </style>
                    {excellent===true?

											<span>
												<CoursesListType
												typelist={["开放课程"]}
												typesylename={"mt10"}/>
											</span>
                      :""}
                    <span className={"TabsWarp"}>
                      <CoursesListType
                        typelist={coursedata.course_end === true ? ["已结束"] : coursedata.is_public === true ? ["公开"] : ["私有"]}
                        typesylename={"mt10"} tipval={coursedata.is_public === true?"":"私有课堂，非课堂成员不能访问"}/>
                    </span>


                  </div>

                  <div className="clearfix ">
                    <div className="fl fl mr40 mb20">

                      <a href={"/users/" + coursedata.teacher_login} className="fl">
                        <img alt="头像" className="radius fl mt3 bannerimgname"
                             src={getImageUrl(`images/` + coursedata.teacher_img)}/>
                      </a>

                      <div className="fl mt13">
                        <p className="color-white">
                          <a href={"/users/" + coursedata.teacher_login}
                             className="color-white bannnerusername">{coursedata.teacher_name}</a>
                        </p>
                      </div>

                      <div className="fl mt13">
                        <p className="color-white bannnerusernames">{coursedata.teacher_school}</p>
                      </div>

                    </div>

                    {/*{excellent===false?*/}
                    {/*  :*/}
                    {/*  <div>*/}
                    {/*    <style>*/}
                    {/*      {*/}
                    {/*        `*/}
                    {/*      .user_white_btn{border: 1px solid #ffffff;color: #ffffff!important;}*/}
                    {/*      */}
                    {/*      `*/}
                    {/*      }*/}
                    {/*    </style>*/}
                    {/*    /!*coursedata.course_identity === 6 是非课堂成员*!/*/}
                    {/*    {coursedata.course_identity === 6&&coursedata.educoder_teacher===false?*/}
                    {/*      <a className="fr user_default_btn user_white_btn mr20 font-18" style={{width:"130px"}}*/}
                    {/*         onClick={() => this.myyslgradin()}>加入课堂</a>: ""}*/}

                    {/*    {coursedata.course_identity === 6&&coursedata.educoder_teacher===true?*/}
                    {/*      <a className="fr user_default_btn user_white_btn mr20 font-18"  style={{width:"130px"}}*/}
                    {/*         onClick={() => this.myyslgradin()}>加入课堂</a>: ""}*/}

                    {/*    /!*{this.props.isStudent()?<a className="fr user_default_btn user_blue_btn mr20 font-18"*!/*/}
                    {/*    /!*                           onClick={() => this.exitclass()}*!/*/}
                    {/*    /!*> 退出课堂 </a>:""}*!/*/}
                    {/*  </div>*/}

                    {/*}*/}
                    <div>
                      {coursedata.switch_to_student === true ?
                        <Tooltip placement="bottom" title={
													<pre>由教师/助教身份切换至学生<br/>可进行提交作品、答题等操作</pre>
                        }>
                          <a className="fr user_default_btn user_blue_btn mr20 font-18"
                             onClick={()=>this.switchidentity(1)}
                          > 切换为学生 </a>
                        </Tooltip>
                        :""}

                      {coursedata.switch_to_teacher === true ?
                        <Tooltip placement="bottom" title={
													<pre>由学生身份切换至教师<br/>拥有添加成员、发布作业等管理权限</pre>
                        }>
                          <a className="fr user_default_btn user_blue_btn mr20 font-18"
                             onClick={()=>this.switchidentity(2)}
                          > 切换为老师 </a>
                        </Tooltip>:""}


                      {coursedata.switch_to_assistant === true ?
                        <Tooltip placement="bottom" title={
													<pre>由学生身份切换至助教<br/>拥有添加成员、发布作业等管理权限</pre>
                        }>
                          <a className="fr user_default_btn user_blue_btn mr20 font-18"
                             onClick={()=>this.switchidentity(3)}
                          > 切换为助教 </a>
                        </Tooltip>:""}


                      {coursedata.course_identity === 6&&coursedata.educoder_teacher===false?
                        (
                          excellent===false?
                            <a className="fr user_default_btn task-btn-orange font-18 mr20" id="shixun_operation"
                               onClick={() => this.tojoinclass(1)}>加入课堂</a>
                        :
                            <a className="fr user_default_btn task-btn-orange font-18 mr20" id="shixun_operation"
                               onClick={() => this.myyslgradin(1)}>立即加入</a>
                        )
                        : ""}

                      {coursedata.course_identity === 6&&coursedata.educoder_teacher===true?
                        excellent===false?
                        <a className="fr user_default_btn task-btn-orange font-18 mr20" id="shixun_operation"
                           onClick={() => this.tojoinclass(1)}>加入课堂</a>
                          :
                          <a className="fr user_default_btn task-btn-orange font-18 mr20" id="shixun_operation"
                             onClick={() => this.myyslgradin(1)}>立即加入</a>
                          : ""}

                      {coursedata.course_identity === 6&&coursedata.educoder_teacher===true?
                        (
                          excellent===false?
                            <a className="fr user_default_btn user_blue_btn mr20 font-18" onClick={() => this.ActionPoll(5)}> 复制课堂 </a>
                         :""
                        )
                        : ""}

                      {this.props.isStudent()?this.props.current_user&&this.props.current_user.course_is_end===true?"":<a className="fr user_default_btn user_blue_btn mr20 font-18"
                                                 onClick={() => this.exitclass()}
                      > 退出课堂 </a>:""}

                    </div>


										<style>
											{
												`
												.teachersbox{
												  margin-right:22px !important;
												}
												`
											}
										</style>

                    <div className="clearfix clearfixborder">
                      <ul className="fl color-grey-eb pathInfo pathInfobox mt10">
												<style>
													{`
														.ant-breadcrumb-separator{
														      color: rgba(255,255,255,0.3) !important;
														}
														.pointer .ant-tooltip-inner{
														
background:rgba(204,204,204,0.2) !important;
														}
														.pointer .ant-tooltip-arrow::before{
													
background:rgba(204,204,204,0.2) !important;
														}
														.pointer .antsoancss{
														color: #fff;
														}
													`}
												</style>
                   <Breadcrumb separator="|" className={"mt5"}>
													<Breadcrumb.Item className={excellent === true && this.props.isAdminOrStudent() === false ?"":"pointer"}>
														<Tooltip getPopupContainer={trigger => trigger.parentNode}  visible={excellent === true && this.props.isAdminOrStudent() === false ?false:coursedata.teacher_applies_count===undefined?false:coursedata.teacher_applies_count>0?true:false}
														placement="topLeft"
																		 title={<pre className="antsoancss">
																			 {coursedata.teacher_applies_count===undefined?"":coursedata.teacher_applies_count>0?
																				 <span >您有{coursedata.teacher_applies_count}条新的加入申请
																					 <a className={"daishenp"} onClick={excellent === true && this.props.isAdminOrStudent() === false ?"":()=>this.setHistoryFun("/courses/"+this.props.match.params.coursesId+"/teachers?tab=2")}>
																			 <span style={{
																			 	color:"#FFA804"
																			 }}>
																			 待审批
																		 </span></a></span>:""}</pre>}>
																<span className="color-grey-c font-16" onClick={excellent === true && this.props.isAdminOrStudent() === false ?"":()=>this.setHistoryFun("/courses/"+this.props.match.params.coursesId+"/teachers")}>
																	<span className={"mr10"}>教师</span>
																	<span className={"mr10"}>{coursedata.teacher_count}</span>
																</span>
														</Tooltip>
													</Breadcrumb.Item>

													<Breadcrumb.Item
														className={excellent === true && this.props.isAdminOrStudent() === false ?"":excellent===true&&coursedata.course_end === true?this.props.isAdminOrTeacher()===true?"pointer":"":"pointer"}
														onClick={excellent === true && this.props.isAdminOrStudent() === false ?"":excellent===true&&coursedata.course_end === true?this.props.isAdminOrTeacher()===true?()=>this.setHistoryFun("/courses/"+this.props.match.params.coursesId+"/students"):"":()=>this.setHistoryFun("/courses/"+this.props.match.params.coursesId+"/students")}
													>
														<span className="color-grey-c font-16"><span className={"mr10 ml10"}>学生</span>  <span className={"mr10"}>{coursedata.student_count}</span></span>
													</Breadcrumb.Item>

													<Breadcrumb.Item>{coursedata.credit===null?"":
														<span className="color-grey-c font-16"><span className={"mr10 ml10"}>学分</span> <span className={"mr10"}>{coursedata.credit}</span></span>
													}</Breadcrumb.Item>

												</Breadcrumb>

                        {/*<li className={"mt7 teachersbox"}  >*/}
                          {/*<Link to={"/courses/"+this.props.match.params.coursesId+"/teachers"}>*/}
                            {/*<span className="color-grey-c fl font-16">教师</span>*/}
                            {/*<span*/}
                              {/*className="color-white fl font-16 bannerurli">{coursedata.teacher_count}</span>*/}
                          {/*</Link>*/}
                        {/*</li>*/}

                        {/*<li className={"mt7 teachersbox"}>*/}
                          {/*<Link to={"/courses/"+this.props.match.params.coursesId+"/students"}>*/}
                            {/*<span className="color-grey-c fl font-16">学生</span>*/}
                            {/*<span*/}
                              {/*className={coursedata.credit===null?"color-white fl font-16 bannerurlis":"color-white fl font-16 bannerurli"}>*/}
															{/*{coursedata.student_count}*/}
                            {/*</span>*/}
                          {/*</Link>*/}
                        {/*</li>*/}

                        {/*<li className={"mt7"}>*/}
                        {/*<a>*/}
                        {/*<span className="color-grey-c fl font-16">分班</span>*/}
                        {/*<span className="color-white fl font-16 bannerurli">{coursedata.course_group_count}</span>*/}
                        {/*</a>*/}
                        {/*</li>*/}

                        {/*{coursedata.credit===null?"":<li className={"mt7"}>*/}
                          {/*<a>*/}
                            {/*<span className="color-grey-c fl font-16 mr10">学分</span>*/}
                            {/*<span className="color-white fl font-16 "*/}
                            {/*>{coursedata.credit}</span>*/}
                          {/*</a>*/}
                        {/*</li>}*/}

                        {/*{coursedata.course_end===true? <li className={"mt7"}>*/}
                        {/*<span className="color-grey-c fl font-16">已结束</span>*/}
                        {/*</li>:<li className={"mt7"}>*/}
                        {/*<span className="color-grey-c fl font-16"> 结束</span>*/}
                        {/*<span className="color-white fl font-16"*/}
                        {/*style={{*/}
                        {/*marginLeft:coursedata.deadline===null?"":'8px'*/}
                        {/*}}*/}
                        {/*>{coursedata.deadline===null?"--":coursedata.deadline}</span>*/}
                        {/*</li>}*/}
                      </ul>


                      {this.props.isAdmin()? <ul className="fr color-grey-eb pathInfo pathInfobox mt10"
                                                 style={{
                                                   position: "relative"
                                                 }}
                      >
                        {!isCourseEnd && <li className={"mt7 mr10im"}>
                          <a onClick={()=>this.addTeacher(true)}>
                            <span className="color-white fl font-16 bannerurli width100f">添加老师</span>
                          </a>
                        </li>}

                        {!isCourseEnd && <li className={"mt7 mr10im"}>
                          <a onClick={()=>this.addTeacher(false)}>
                            <span className="color-white fl font-16 bannerurli width100f">添加助教</span>
                          </a>

                        </li>}

                        {!isCourseEnd && <li className={"mt7 mr10im"}>
                          <a onClick={()=>this.addStudent()}>
                            <span className={"color-white fl font-16 bannerurli width100f"}>添加学生</span>
                          </a>
                        </li>}
                        {excellent===false?
                        <li className={"mt7 mr10im ml10"} style={{overflow:"hidden"}}>
                          <a>
                            <span className="color-grey-c fl font-16" style={{marginRight: "10px"}}>邀请码</span>
                            <span
                              className={coursedata.code_halt === true? "color-white fl font-16 bannerurli width75f" : "color-white fl font-16 bannerurli width107f marleftf10 color-orange-tip"}>
                                            {coursedata.code_halt === true? "已停用" : coursedata.invite_code}
                              {coursedata.code_halt === true  ? "" :
                                <Tooltip placement="bottom" title={
																	coursedata.code_halt === true? <pre>
																			邀请码已停用<br/>
																			成员不能主动加入课堂
																	</pre>:<pre>
																			成员可以通过邀请码主动加入课堂<br/>
																			点击立刻复制邀请码
																	</pre>
                                }>
                                  <i className="iconfont icon-fuzhi color-white font-14 ml10"
                                     onClick={() => {
                                       jsCopy()
                                     }}></i>
                                </Tooltip>
                              }
                              <input id="copy_invite_code" value={coursedata.invite_code}/>
                                       </span>
                          </a>
                        </li>:""}

                        <li className={"mt7 ml10 mr0 "}>
                          <style>
                            {
                              `
                                     .defaults{cursor:default}
                                     `
                            }
                          </style>
                          <Popover placement="bottom" content={
                            excellent===false?
                            <ul className="sandianbox" style={{
                              display:  'block',
                              right: "-113px",
                              top: "20px"
                            }}>
                              {coursedata.is_public === true?coursedata.course_identity  <3?
                                <div className={"defaults"} onClick={() => this.ActionPoll(2)}>设为私有</div>: "" : ""}

                              {coursedata.is_public === false?coursedata.course_identity <3?
                                <div className={"defaults"}  onClick={() => this.ActionPoll(3)}>设为公开</div> : "": ""}

                              {coursedata.course_identity  <3? <div className={"defaults"}  onClick={() => this.ActionPoll(4)}>
                                {coursedata.code_halt === true ?"启用邀请码":"停用邀请码"}
                              </div>:""}

                              <div className={"defaults"} onClick={this.postsettings}>设置</div>

                              <div className={"defaults"} onClick={() => this.ActionPoll(5)}>复制
                              </div>

                              {coursedata.is_admin===true?coursedata.course_identity  <3?<div className={"defaults"}  onClick={() => this.ActionPoll(1)}>删除</div>
                                :"":""}
                            </ul>
                              :
                              <ul className="sandianbox" style={{
                                display:  'block',
                                right: "-113px",
                                top: "20px"
                              }}>
                                <div className={"defaults"} onClick={this.postsettingstwo}>设置</div>
                                {coursedata.is_admin===true?coursedata.course_identity  <3?<div className={"defaults"}  onClick={() => this.ActionPoll(1)}>删除</div>
                                  :"":""}
                              </ul>
                          }  trigger="hover">
                            <i className="iconfont icon-weibiaoti12 color-white font-14 relative"></i>
                          </Popover>

                        </li>



                      </ul>:""}

                    </div>


                  </div>
                </div>
              </div>
            }
          </div>

        )
    }
}

export default CoursesBanner;


// let id=this.props.match.params.coursesId;
//
// let url="/courses/"+id+"/top_banner.json"
// axios.get(url).then((result)=>{
//     if(result.status===200){
//       let data=result.data;
//         this.setState({
//           coursebannerlist:result.data,
//           name: result.data.name,
//           teacher_name:  result.data.teacher_name,
//           teacher_login:  result.data.teacher_login,
//           teacher_img:  result.data.teacher_img,
//           teacher_school:  result.data.teacher_school,
//           teacher_count:  result.data.teacher_count,
//           student_count:  result.data.student_count,
//           course_group_count:  result.data.course_group_count,
//           credit:  result.data.credit,
//           course_end:  result.data.course_end,
//           deadline:  result.data.deadline,
//           is_teacher:  result.data.is_teacher,
//           is_student:  result.data.is_student,
//           is_admin:  result.data.is_admin,
//           is_public:  result.data.is_public,
//           code_halt:  result.data.code_halt,
//           invite_code: result.data.invite_code,
//           switch_to_student:  result.data.switch_to_student,
//           switch_to_teacher:  result.data.switch_to_teacher,
//           join_course:  result.data.join_course,
//           copy_course:  result.data.copy_course,
//         })
//     }
// coursebannerlist:undefined,
//   name: undefined,
//   teacher_name: undefined,
//   teacher_login: undefined,
//   teacher_img: undefined,
//   teacher_school: undefined,
//   teacher_count: undefined,
//   student_count: undefined,
//   course_group_count: undefined,
//   credit: undefined,
//   course_end: undefined,
//   deadline: undefined,
//   is_teacher: undefined,
//   is_student: undefined,
//   is_admin: undefined,
//   is_public: undefined,
//   code_halt: undefined,
//   invite_code:undefined,
//   switch_to_student: undefined,
//   switch_to_teacher: undefined,
//   join_course: undefined,
//   copy_course: undefined,
// }).catch((error)=>{
//   console.log(error);
// })
