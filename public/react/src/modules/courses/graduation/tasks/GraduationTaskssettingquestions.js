import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag} from "antd";
import {Link} from 'react-router-dom';
import { getRandomcode,markdownToHTML,AttachmentList} from 'educoder';
import axios from 'axios';
import Modals from '../../../modals/Modals';
import DownloadMessageysl from "../../../modals/DownloadMessageysl";
import HomeworkModal from "../../coursesPublic/HomeworkModal";
import CoursesListType from '../../coursesPublic/CoursesListType';
import moment from 'moment';
import GraduationTaskssettingReply from './GraduationTaskssettingReply';

let GraduationTasksnewtype=true;


class GraduationTasksquestions extends Component{

  constructor(props){
    super(props)
    this.state={
      coursename:"",
      coursesearch:"",
      title_num:20,
      title_value:"",
      fileList: [],
      contents: [{val:"",id:1}],
      type:true,
      questionslist:undefined,
			DownloadType:false,
			DownloadMessageval:undefined,
    }
  }

  componentDidMount(){
    let tab = this.props.tab;
		this.props.setTab && this.props.setTab(tab);

    this.getdatas();
    try{
      this.props.triggerRef(this)
    }catch(e){

    }
  }

  reInit=()=>{
    this.getdatas();
  }

  getdatas=()=>{
		const task_Id = this.props.match.params.task_Id;
		let url="/graduation_tasks/"+task_Id+".json";

		axios.get(url).then((result)=>{
			if(result.status===200){
				this.setState({
					questionslist:result.data,
					end_time:result.data.end_time
				})
				this.props.setend_time(result.data.end_time)
			}
		}).catch((error)=>{
			console.log(error)
		})
	}

  goback=()=>{
    // let courseId=this.props.match.params.coursesId;
    // let category_id=this.props.match.params.category_id;
    // window.location.href="/courses/"+courseId+"/graduation_tasks/"+category_id;
		// let courseId = this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }

		// this.props.history.goBack()
		this.props.history.replace(`/courses/${this.state.questionslist.course_id}/graduation_tasks/${this.state.questionslist.graduation_id}`);
  }

  end=()=>{
    // this.homeworkstart()
    this.setState({
      modalname:"立即截止",
      visible:true,
			Topval:"学生将不能再提交作品",
      // Botvalleft:"暂不截止",
			// Botval:`本操作只对"提交中"的任务有效`,
      Cancelname:"暂不截止",
      Savesname:"立即截止",
      Cancel:this.cancelmodel,
      Saves:this.coursetaskend,
			typs:"end",
    })

  }
  //立即发布
  publish=()=>{
    let starttime= this.props.getNowFormatDates(1,1);
    let endtime=this.props.getNowFormatDates(2,1);
    // this.homeworkstart()
    this.setState({
      modalname:"立即发布",
      visible:true,
			Topval:"学生将立即收到毕设任务",
      // Botvalleft:"点击修改",
			// Botval:`本操作只对"未发布"的分班有效`,
			starttime:moment(moment(new Date())).format("YYYY-MM-DD HH:mm") ,
			starttimes:this.props.getNowFormatDates(1),
			typs:"start",
      endtime:endtime,
      Cancelname:"暂不发布",
      Savesname:"立即发布",
      Cancel:this.cancelmodel,
      Saves:this.homepublish,
    })
  }
  //立即发布
  homeworkstart=()=>{
    let coursesId=this.props.match.params.coursesId;
    let url="/courses/"+coursesId+"/all_course_groups.json";

    axios.get(url).then((response) => {

      if(response.status===200){
        this.setState({
          modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
          course_groups:response.data.course_groups,
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  }
  homepublish=(ids,endtime)=>{
    this.cancelmodel();
    let task_Id=this.props.match.params.task_Id;
    const cid = this.props.match.params.coursesId
    // let url = `/courses/${cid}/graduation_tasks/publish_task.json`;

    let url="/courses/"+cid+"/graduation_tasks/publish_task.json"
    axios.post(url,{
      task_ids:[task_Id],
      group_ids: this.state.course_groupslist,
			end_time:endtime,
    }).then((response)=>{
      if (response.data.status == 0) {
				this.getdatas()
        this.props.showNotification(response.data.message);
        this.searchValue();

        this.setState({
          // Modalstopval:response.data.message,
          // ModalSave:this.cancelmodel,
          // Loadtype:true,
          course_groupslist:[],
          checkAllValue:false
        })
      }
    }).catch((error)=>{

    })
  }

  cancelmodel=()=>{

    this.setState({
      Modalstype:false,
      Loadtype:false,
      visible:false,
      Modulationtype:false,
      Allocationtype:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
    })

  }

  coursetaskend=()=>{
    this.cancelmodel();
    const coursesId = this.props.match.params.coursesId;
    const task_Id = this.props.match.params.task_Id;

    let url = `/courses/${coursesId}/graduation_tasks/end_task.json`;
    axios.post(url,{
      task_ids:[task_Id],
      group_ids: this.state.course_groupslist,
    }).then((response)=>{
      if (response.data.status == 0) {
				this.getdatas()
        this.props.showNotification(response.data.message);
        this.setState({
          // Modalstopval:response.data.message,
          // ModalSave:this.cancelmodel,
          // Loadtype:true,
          course_groupslist:[],
          checkAllValue:false
        })

      }

    }).catch((error)=>{

    })
  }

  getcourse_groupslist=(id)=>{
    this.setState({
      course_groupslist:id
    })
  }

	/// 确认是否下载
	confirmysl(url,urls){

		axios.get(url + '?export=true').then((response) => {
			if(response === undefined){
				return
			}
			if(response.data.status&&response.data.status===-1){

			}else if(response.data.status&&response.data.status===-2){
				if(response.data.message === "100"){
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType:true,
						DownloadMessageval:100
					})
				}else {
					//因附件资料超过500M
					this.setState({
						DownloadType:true,
						DownloadMessageval:500
					})
				}
			}else {
        // this.props.slowDownload(urls)
        //this.props.showNotification(`正在下载中`);
        this.props.slowDownload(getRandomcode(url))
        // window.open(getRandomcode("/api" + url), '_blank');
				// this.props.showNotification(`正在下载中`);
				// window.open("/api"+url, '_blank');
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	Downloadcal=()=> {
		this.setState({
			DownloadType: false,
			DownloadMessageval: undefined
		})
	}
  render(){

    let { Modalstype,Modalstopval,ModalCancel,ModalSave,questionslist} =this.state;
    // console.log(this.props)

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let task_Id=this.props.match.params.task_Id;


   //console.log(questionslist&&questionslist)
    return(
      <React.Fragment>

        <div>
          {/*提示*/}
          <Modals
            modalsType={this.state.Modalstype}
            modalsTopval={this.state.Modalstopval}
            modalCancel={this.state.ModalCancel}
            modalSave={this.state.ModalSave}
            loadtype={this.state.Loadtype}
          />
          {/*提示*/}
          {/*<Modals*/}
            {/*modalsType={Modalstype}*/}
            {/*modalsTopval={Modalstopval}*/}
            {/*modalCancel={ModalCancel}*/}
            {/*modalSave={ModalSave}*/}
            {/*loadtype={Loadtype}*/}
          {/*/>*/}
					<DownloadMessageysl
						{...this.props}
						value={this.state.DownloadMessageval}
						modalCancel={this.Downloadcal}
						modalsType={this.state.DownloadType}

					/>
          <HomeworkModal
						starttimes={this.state.starttimes}
						typs={this.state.typs}
            modalname={this.state.modalname}
            visible={this.state.visible}
            Topval={this.state.Topval}
            Topvalright={this.state.Topvalright}
            Botvalleft={this.state.Botvalleft}
            Botval={this.state.Botval}
            starttime={this.state.starttime}
            endtime={this.state.endtime}
            Cancelname={this.state.Cancelname}
            Savesname={this.state.Savesname}
            Cancel={this.state.Cancel}
            Saves={this.state.Saves}
            course_groups={this.state.course_groups}
            modaltype={this.state.modaltype}
            getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
          />
          {questionslist&&questionslist?<div className="newMain clearfix">
            <div className={"educontent mb20"}>
              <div className="justify break_full_word new_li markdown-body edu-back-white"
                   id="challenge_editorMd_description">
                <p id="ReactMarkdown">
                  <div style={{padding: '30px 40px'}}>

                    {questionslist&&questionslist?
                      <div  style={{
                        width: '100%',
                        border: '1px solid transparent'
                      }}>
												<div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(questionslist.description).replace(/▁/g,"▁▁▁")}}></div>
                     </div>:""
                    }

                    <div>
											<AttachmentList {...this.props} {...this.state} attachments={questionslist&&questionslist.attachments}></AttachmentList>
                    </div>

                    {questionslist&&questionslist.group_info?<div>

                      <div className={"mt20"}>
                        <span className="font-14">分组要求：</span>
                        <span className="font-14 color-grey-9">（提交作品时需要关联同组成员，组内成员作品共享）</span>
                      </div>

                      <div className={"mt10"}>
                        <span className="font-14">分组人数：{questionslist.group_info.min_number} - {questionslist.group_info.max_number} 人 </span>
                        {questionslist.group_info.base_on_project===true?
                          <span className="font-14 color-grey-9"> （基于项目，项目管理员角色的成员可以提交作品）</span>
                          : <span className="font-14 color-grey-9"> （非基于项目，任意小组成员可以提交作品）</span>}
                      </div>

                      {questionslist.group_info.base_on_project===true?<div className={"mt10"}>
                        <span className="font-14">基于项目实施</span>
                        <span className="font-14 color-grey-9"> （各小组必须在educoder平台创建项目）</span>
                      </div>:<div className="font-14 mt10">不基于项目实施</div>}

                    </div>:""}

                  </div>

                </p>


                {/*<div className="mt10 mb20">*/}
                  {/*<p*/}
                     {/*// className={`noteDetailPoint ${memo.user_praise ? 'Pointed' : ''} `}*/}
                    {/*className={`noteDetailPoint `}*/}
                     {/*onClick={()=>{this.clickPraise()}}*/}
                  {/*>*/}
                    {/*<i className="iconfont icon-dianzan"></i>*/}
                    {/*<br/>*/}
                    {/*/!*<span>{memo.praise_count}</span>*!/*/}
                  {/*</p>*/}
                {/*</div>*/}

              </div>

              <div className={"mt20 course-message"} style={{background: '#fff'}}>
                <GraduationTaskssettingReply
                  memo={{id: task_Id,
                  user_id: questionslist && questionslist.user_id}}
                  course_id={courseId} {...this.props}>
                </GraduationTaskssettingReply>
                  {/*讨论区*/}

              </div>

            </div>

          </div>:""}

        </div>

      </React.Fragment>

    )
  }
}

export default GraduationTasksquestions;


