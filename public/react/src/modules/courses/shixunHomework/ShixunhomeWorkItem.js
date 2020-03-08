import React,{ Component } from "react";
import CoursesListType from '../coursesPublic/CoursesListType';
import { WordsBtn, getTaskUrlById , ConditionToolTip } from 'educoder';
import {Tooltip,message,Modal} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Modals from '../../modals/Modals';
import Associationmodel from '../coursesPublic/Associationmodel';
import ModalsRename from '../coursesPublic/ModalsRename';
// import '../../css/members.css'
import './style.css'


class ShixunhomeWorkItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      props:props,
      modalname:"关联项目",
      visible:false,
      startbtn:false,
      code_review:false
    }
    // console.log("获取到this.propssssssssssss")
    // console.log(this.props)
  }

  componentDidMount() {
    let query = this.props.location.pathname;
    const type = query.split('/');
    this.setState({
      shixuntypes:type[3]
    })
  }
  componentDidUpdate = (prevProps) => {

    if(prevProps.location.pathname != this.props.location.pathname){
      let query = this.props.location.pathname;
      const type = query.split('/');
      this.setState({
        shixuntypes:type[3]
      })
    }

  }


  Cancel=()=>{
    this.setState({
      visible:false
    })
  }

  taskoperationId=(list)=>{
    this.setState({
      startbtn:true,
    })
    let url= list+".json";
    // const w=window.open('about:blank');
    axios.get(url).then((response) => {

      if(response.status===200){
        if(response.data.status===-2){
          this.setState({
            startbtn:false,
            shixunsreplace:true,
            hidestartshixunsreplacevalue:response.data.message+".json"
          })
          // w.close()
        }else if(response.data.status===-1){

        }else if(response.data.status===-3){
          this.setState({
            shixunsmessage:response.data.message,
            startshixunCombattype:true,
            startbtn:false
          })
          // w.close()
        }else{
          this.setState({
            startbtn:false
          })
          // if(response.data.status!=401&&response.data.status!=403){
          //   w.location.href= "/tasks/"+response.data.game_identifier
          // }
          window.location.href = "/tasks/"+response.data.game_identifier

        }
      }
    }).catch((error) => {
      this.setState({
        startbtn:false
      })
      // w.close()

    });

  }

  hidestartshixunsreplace=(url)=>{
    axios.get(url).then((response) => {
      if(response.status===200){

        this.setState({
          shixunsreplace:false
        })
        message.success('重置成功，正在进入实训！');
        let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
        this.props.history.push(path);

      }}
    ).catch((error) => {
      this.setState({
        startbtn:false,
        shixunsreplace:false
      })
    });

  }

  hidestartshixunCombattype=()=>{
    this.setState({
      startshixunCombattype:false
    })
  }

  // 实训详情，阻止冒泡
  stopPro = (event) => {
    event.stopPropagation()
  }

  editname = (name,id,event) => {
    this.setState({
      ModalsRenametype:true,
      NavmodalValue:name,
      Navmodalname:"重命名",
      url:`/homework_commons/${id}/alter_name.json`
    })
    event.stopPropagation()
  }
  cannerNavmoda=()=>{
    this.setState({
      ModalsRenametype:false,
    })
  }

	hrefjumpskip=(url)=>{

		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		// if(this.props.checkIfProfileCompleted()===false){
		// 	this.setState({
		// 		AccountProfiletype:true
		// 	})
		// 	return
		// }
		// if(this.props.checkIfProfessionalCertification()===false){
		// 	this.props.showProfileCompleteDialog()
		// 	return
		// }

		this.props.history.push(url);

	}
  render(){
    let {
        Modalstype,
        Modalstopval,
        Modalsbottomval,
        cardsModalcancel,
        cardsModalsavetype,
        loadtype,
        modalname,
        visible,
        shixunsreplace,
        hidestartshixunsreplacevalue,
        startshixunCombattype,
        shixunsmessage,
        startbtn,

    } = this.state;

    const { checkBox,
      discussMessage,
      taskid,index
    } = this.props;
    return(
      <React.Fragment>
        {
          this.state.ModalsRenametype===true?
          <ModalsRename
            {...this.props}
            Navmodalnametype={this.state.ModalsRenametype}
            NavmodalValue={this.state.NavmodalValue}
            Navmodalname={this.state.Navmodalname}
            Navname={"作业"}
            url={this.state.url}
            cannerNavmoda={()=>this.cannerNavmoda()}
          />
        :""}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalsBottomval={Modalsbottomval}
          modalCancel={cardsModalcancel}
          modalSave={cardsModalsavetype}
          loadtype={loadtype}
        />
        {visible===true?<Associationmodel
          modalname={modalname}
          visible={visible}
          Cancel={this.Cancel}
          taskid={taskid}
          funlist={this.props.funlist}
        />:""}
        <Modal
          keyboard={false}
          title="提示"
          visible={shixunsreplace}
          closable={false}
          footer={null}
        >
          <div className="task-popup-content">
            <p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
          </div>
          <div className="task-popup-submit clearfix">
            <a className="task-btn task-btn-orange fr mr51"
                onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalue)}>知道了</a>
          </div>
        </Modal>

        <Modal
          keyboard={false}
          title="提示"
          visible={startshixunCombattype}
          closable={false}
          footer={null}
        >
          <div className="task-popup-content">
            <p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{shixunsmessage}之后开放，谢谢！</p>
          </div>
          <div className="task-popup-submit clearfix">
            {/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
            <a className="task-btn task-btn-orange fr mr51" onClick={this.hidestartshixunCombattype}>知道啦</a>
          </div>
          {/*<p className="inviteTipbtn with100 fl">*/}
          {/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
          {/*</p>*/}
        </Modal>

        <div className="graduateTopicList boardsList" style={{cursor : this.props.isAdmin ? "pointer" : "default"}} onClick={() => window.$(`.shixunitem${index} input`).click() } >
          <style>{`
            .boardsList .ant-checkbox-wrapper{
               margin-top: -35px;
            }
            .graduateTopicList .ant-checkbox-input {
              margin-right: 15px;
            }

            .inlineblock{
                display: inline-block;
            }

          .titleSearch .titleBar {
            display: flex;
          }
          .titleSearch .titleBar .toolbar {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }


          /*list style*/
          .boardsList {
            display: flex;
            align-items: flex-start;

            padding-top: 8px;
            padding-bottom: 10px;
            padding-left: 0px;
            padding-right: 0px;
          }
          .boardsList .homepagePostSetting {
            position: absolute;
            width: 20px;
            height: 20px;
          }

          .boardsList .contentSection {
            flex: 1;
          }

          `}</style>

          {this.props.isAdmin?
            <span className={`shixunitem${index} fl`} style={{"height":"55px",paddingTop:"2px"}}>{checkBox}</span>
            :
            ""
          }

          <div className="clearfix ds pr contentSection" >
						<style>{`
            .maxwidth333{
                max-width: 333px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
          `}</style>
            <h6>

              {/*to={`/courses/${this.props.match.params.coursesId}/${discussMessage.homework_id}/jobsettings`}*/}
              {
                this.props.isAdmin?<a onClick={()=>this.hrefjumpskip("/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+discussMessage.homework_id+"/list?tab=0")}
                                         title={discussMessage.name}
                                      className="fl mt3 font-16 font-bd color-dark maxwidth333">{discussMessage.name}</a>:""
              }

              {
                this.props.isStudent? <a onClick={()=>this.hrefjumpskip(`/courses/${this.props.match.params.coursesId}/${this.state.shixuntypes}/${discussMessage.homework_id}/list?tab=0`)}
                                            title={discussMessage.name}
                                            className="fl mt3 font-16 font-bd color-dark maxwidth333">{discussMessage.name}</a>:""
              }

              {
                this.props.isNotMember===true? this.props.discussMessage.private_icon===true?
											<span className="fl mt3 font-16 font-bd color-dark maxwidth333 pointer"  title={"私有属性，非课堂成员不能访问"}>{discussMessage.name}</span>
										: <a onClick={()=>this.hrefjumpskip(`/courses/${this.props.match.params.coursesId}/${this.state.shixuntypes}/${discussMessage.homework_id}/list?tab=0`)}
                         title={discussMessage.name}
                         className="fl mt3 font-16 font-bd color-dark maxwidth333">{discussMessage.name}</a>:""
              }


              {
                 this.props.discussMessage.private_icon===true?
                  <Tooltip title={"私有属性，非课堂成员不能访问"} placement="bottom">
                    <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl mt4"></i>
                  </Tooltip>
                  :
                  <div></div>
              }

              <CoursesListType typelist={discussMessage.status} typesylename={""} />

							<style>
								{
									`
						 
							   .homepagePostSettingbox{
								   width:207px !important;
								 }
								 .colorfff{
								  color:#fff !important;
								 }
								 .newhomepagePostSettingname{
								     width: 205px !important;
								 }
								 .newwidthSettin{
								  width:255px !important;
								 }
								`
								}
							</style>


              {/*to={`/courses/${this.props.match.params.coursesId}/${discussMessage.homework_id}/jobsettings`}*/}




							{this.props.isAdmin?<span onClick={(event)=>this.stopPro(event)} className={discussMessage&&discussMessage.shixun_status>1?this.props.isAdminOrCreator()?" newhomepagePostSettingname fr":" homepagePostSettingbox fr":" newwidthSettin fr"} style={{"right":"-2px","top":"6px","display":"block"}}>
                {discussMessage&&discussMessage.shixun_status>1?<Link className="btn colorblue font-16 fontweight400 mr20" to={"/shixuns/"+discussMessage.shixun_identifier+"/challenges"} target={"_blank"}>进入学习</Link>:
                <a className={"btn colorfff font-16 fontweight400 "}>进入学习</a>
                }


                {this.props.isAdminOrCreator()?<a onClick={(event)=>this.editname(discussMessage.name,discussMessage.homework_id,event)} className={"btn colorblue font-16 fontweight400  "}>重命名</a>:""}
								{/*<WordsBtn className="btn colorblue ml20 font-16"  to={`/courses/${this.props.match.params.coursesId}/${this.state.shixuntypes}/${discussMessage.homework_id}/settings?tab=3`}  > 设置</WordsBtn>*/}
								<WordsBtn className="btn colorblue  font-16 ml15 fontweight400  "  to={`/courses/${this.props.match.params.coursesId}/${this.state.shixuntypes}/${discussMessage.homework_id}/settings?tab=3`}  > 设置</WordsBtn>
							</span>:""}


							{this.props.isStudent===true?this.props.course_identity===5?discussMessage&&discussMessage.shixun_status>1?
                discussMessage.time_status<5?
								<WordsBtn  style="blue" className="colorblue font-16 mr20 fr mt2 ">
                  <Link className="btn colorblue font-16 fontweight400" to={"/shixuns/"+discussMessage.shixun_identifier+"/challenges"} target={"_blank"}>进入学习</Link>
								</WordsBtn>:"":"":"":""
							}

              {  this.props.isAdmin?<a onClick={()=>this.hrefjumpskip("/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+discussMessage.homework_id+"/list?tab=0")} className="btn colorblue font-16 fontweight400 mr20 fr">作品列表</a>:""}

              {
                this.props.isStudent? <a onClick={()=>this.hrefjumpskip("/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+discussMessage.homework_id+"/list?tab=0")} className="btn colorblue font-16 fontweight400 mr20 fr mt2">作品列表</a>:""
              }

              {
                this.props.isNotMember===true? this.props.discussMessage.private_icon===true?""
                  :<a onClick={()=>this.hrefjumpskip("/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+discussMessage.homework_id+"/list?tab=0")} className="btn colorblue font-16 fontweight400 mr20 fr">作品列表</a>:""
              }


            </h6>
            {/* style={discussMessage.time_status===1||discussMessage.time_status===2||discussMessage.time_status===3||discussMessage.time_status===4||discussMessage.time_status===5||discussMessage.time_status===6?{"maxWidth":"216px"}:{"maxWidth":"550px"}} */}
            {
              discussMessage && discussMessage.upper_category_name &&
              // <ConditionToolTip title={discussMessage.upper_category_name} condition={ discussMessage.upper_category_name.length > 22 }>
                <div className="color-grey9 task-hide mt5" title={discussMessage.upper_category_name}>所属目录：{discussMessage.upper_category_name}</div>
              // </ConditionToolTip>
            }
            <div className="cl"></div>
            <p className="color-grey mt15 fl" style={{"width":"820px"}}>
              <span >
                {/* <a href="/users/innov" className="panel-name-small hide fl mr15 mr30 color-grey3">{discussMessage.author.name}</a> */}
                { discussMessage.author && <span className="mr15 color-grey-3">{discussMessage.author}</span> }
								{discussMessage.commit_count===undefined?"":<span className="mr15 color-grey9">已开始做题 {discussMessage.commit_count}人</span>}
                {discussMessage.uncommit_count===undefined?"":<span className="mr15 color-grey9">未开始做题 {discussMessage.uncommit_count}人</span>}
                {discussMessage.compelete_count===undefined?"":<span className="mr15 color-grey9">已完成做题 {discussMessage.compelete_count}人</span>}
                {/*<span className="mr15 color-grey9">{discussMessage.replies_count} 3 未评</span>*/}

                {
                  discussMessage.time_status===1?
                      <span className="mr15 color-grey9">{discussMessage.status_time}</span>
                  :discussMessage.time_status===2?
                      <span className="mr15 color-grey9">{discussMessage.status_time}</span>
                  :discussMessage.time_status===3?
                        <span className="mr15 color-grey9">{discussMessage.status_time}</span>
                  :discussMessage.time_status===4?
                          <span className="mr15 color-grey9">{discussMessage.status_time}</span>
                  :
                   <span className="mr15 color-grey9">{discussMessage.status_time}</span>
                }
                




                {/* { discussMessage.replies_count != 0 && <span className="mr15 color-grey9">{discussMessage.replies_count} 回复</span> }
                { discussMessage.praise_num != 0 && <span className="mr15 color-grey9">{discussMessage.praise_num} 点赞</span> }
                { discussMessage.visits != 0 && <span className="mr15 color-grey9">{discussMessage.visits} 浏览</span> } */}
                {/* <span className="mr15 color-light-grey-C">{moment(discussMessage.created_on).fromNow()} </span> */}
              </span>
            </p>




          </div>
        </div>
      </React.Fragment>
      )
    }
}
export default ShixunhomeWorkItem;


//
// cannelAssociation=()=>{
//
//   this.setState({
//     Modalstype:true,
//     Modalstopval:"确定要取消该项目关联？",
//     cardsModalcancel:this.cannerassocition,
//     cardsModalsavetype:this.savetassociton
//   })
//
// }
// cannerassocition=()=>{
//
//   this.setState({
//     Modalstype:false,
//     Modalstopval:"",
//     cardsModalcancel:"",
//     cardsModalsavetype:"",
//     loadtype:false
//   })
//
// }
// savetassociton=()=>{
//   this.cannerassocition();
//   let taskid=this.props.taskid;
//   let url = "/graduation_tasks/"+taskid+"/graduation_works/cancel_relate_project.json";
//   axios.get(url).then((result)=>{
//
//     if(result.data.status===0){
//       this.setState({
//         Modalstype:true,
//         Modalstopval:result.data.message,
//         cardsModalsavetype:this.cannerassocition,
//         loadtype:true
//       })
//     }
//
//   }).catch((error)=>{
//     console.log(error)
//   })
//
// }
//
// saveAssociationItems=()=>{
//
//   let coursesId=this.props.coursesId;
//   let taskid=this.props.taskid;
//   let url="/courses/"+coursesId+"/graduation_tasks/relate_project.json";
//   axios.post(url,{
//     project_id:taskid
//   }).then((result)=>{
//     console.log(result)
//     if(result.data.status===0){
//       this.setState({
//         Modalstype:true,
//         Modalstopval:result.data.message,
//         cardsModalsavetype:this.cannerassocition,
//         loadtype:true
//       })
//     }
//   }).catch((error)=>{
//     console.log(error)
//   })
//
// }
//
//
// AssociationItems=()=>{
//     this.setState({
//       visible:true
//     })
// }