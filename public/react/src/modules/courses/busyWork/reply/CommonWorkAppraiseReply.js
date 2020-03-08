import React,{ Component } from "react";
import { Pagination } from "antd";

import update from 'immutability-helper';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import {ImageLayerOfCommentHOC} from '../../../page/layers/ImageLayerOfCommentHOC';
import GraduationTasksappraiseMainEditor from '../../graduation/tasks/GraduationTasksappraiseMainEditor';
import CCommentItem from '../../common/comments/CCommentItem';
import '../../../forums/Post.css';
import '../../../comment/Comment.css';
import '../../common/courseMessage.css';

import '../../graduation/tasks/GraduationTasksappraiseReply.css';
import './CommonWorkAppraiseReply.css';
import ModulationModal from "../../coursesPublic/ModulationModal";
import Modals from '../../../modals/Modals';
const REPLY_PAGE_COUNT = 10
const $ = window.$;

/* 

*/
class CommonWorkAppraiseReply extends Component{
  constructor(props){
    super(props);

    this.editorRef = React.createRef();

    this.state={
      total_count: 0,
      comment_scores: [],
    }
  }

  fetchAllComments = () => {
    let category_id= this.props.match.params.category_id;
    // const url = `/graduation_works/${category_id}/comment_list.json`
    const task_id = this.props.task_id
    const url = `/student_works/${task_id}/comment_list.json`
    axios.get(url).then((result)=>{
      if(result.data.comment_scores){
        const comment_scores = result.data.comment_scores.map(item => {
            return this.transformReply(item)
        })
        this.setState({
          ...result.data,
          comment_scores
        })
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  replySuccess = () => {
    this.fetchAllComments()
  }
  componentDidMount(){
    this.fetchAllComments()
  }
  addSuccess = () => {
    this.fetchAllComments()
  }

  transformReply = (reply, children = []) => {
    const isAdmin = this.props.isAdmin()
    const isSuperAdmin = this.props.isSuperAdmin()
    if (reply.appeal_info && reply.appeal_info.time) {
      reply.appeal_info.user_info = {
        "user_name": reply.appeal_info.user_name,
        "user_login": reply.appeal_info.user_login,
        "user_image_url": reply.appeal_info.user_image_url
      }
      reply.appeal_info.is_appeal_info = true
      reply.appeal_info.appeal_status = reply.appeal_status
      reply.appeal_info.score_id = reply.score_id
      reply.journals.push(reply.appeal_info)
      reply.journals = _.orderBy(reply.journals, 'time', 'asc')
    }
   
    return {
      isSuperAdmin: isSuperAdmin,
      admin: isAdmin, //
      journals: reply.journals,
      appeal_status: reply.appeal_status,
      attachments: reply.attachments,
      can_appeal: reply.can_appeal,
      can_reply: reply.can_reply,
      child_message_count: reply.child_message_count,
      id: reply.comment_id,
      // time: moment(reply.comment_time).fromNow(),
      time: moment(reply.comment_time).format('YYYY-MM-DD HH:mm'),

      image_url: reply.user_image_url,      
      user_id: reply.user_id,
      user_login: reply.user_login,
      username: reply.user_name,
      content: reply.content,

      score: reply.score,
      delete: reply.delete,
      is_invalid: reply.is_invalid,
      comment_role: reply.comment_role
    }
  }
  onDelete = (item) => {
    this.props.confirm({
      content: '确定要删除这个评阅吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        let category_id= this.props.match.params.category_id;
        const task_id = this.props.task_id
        // 作业是使用 task_id
        const url = `/student_works/${task_id}/destroy_score.json`
        axios.delete(url, { data: {
            score_id: item.id
          }
        }).then((result)=>{
          if(result.data.status == 0){
            this.props.showNotification('删除成功')
            this.fetchAllComments()
          }
        }).catch((error)=>{
          console.log(error)
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
   
  }

  showModulationtype=(id)=>{
    // console.log(id)

    this.setState({
      Modulationtype:true,
      operationId:id
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


  saveModulationModal=(value,num)=>{
    console.log(value,num)
    let {operationId}=this.state;
    let studentWorkId =this.props.match.params.studentWorkId;
    // console.log(value,num)
    let url ="/student_works/"+studentWorkId+"/adjust_score.json";
    axios.post(url,{
      score:num,
      comment:value
    }).then((result)=>{
      // console.log(result)
      if(result.data.status===0){
        // this.setState({
        //   Modalstype:true,
        //   Allocationtype:false,
        //   Modalstopval:result.data.message,
        //   ModalSave:this.cancelmodel,
        // })
        this.cancelmodel()
        this.props.showNotification('调分成功')
        this.props.onReplySuccess && this.props.onReplySuccess()
        this.fetchAllComments();

      }

    }).catch((error)=>{
      console.log(error)
    })

  }
  onReply = (params) => {
    const { task_id } = this.props;
    const replyUrl = `/student_works/${task_id}/add_score.json`
    axios.post(replyUrl, params).then((response)=>{
      if(response.data.status == 0) {
        this.editorRef.current.clearInputs()
        this.fetchAllComments();
        this.props.onReplySuccess && this.props.onReplySuccess()
      }

    }).catch((error)=>{
      console.log(error)
    })
  }
  render(){
    let { total_count, comments, pageCount, comment_scores, allow_score } = this.state
    const { current_user, memo, homework_status } = this.props
    const isAdmin = this.props.isAdmin()

    const isNiPing = homework_status && homework_status.indexOf('匿评中') != -1
    const isGroup = this.props.isGroup()
    /**
      isAdmin || 评阅入口：超级管理员、老师和助教显示；  -》 改成admin也不显示
      匿评人：匿评期间显示
     */

    //  && isNiPing
    const needNiPingEditor = (allow_score );
    if (!needNiPingEditor && comment_scores.length == 0) {
      return ''
    }
    return(
      <React.Fragment>
        <div className="edu-back-white padding10-10" style={{marginTop: '16px'}}>
        <div className={"stud-class-set edu-back-white mb10"} style={{height:"100%"}}>

          <Modals
            modalsType={this.state.Modalstype}
            modalsTopval={this.state.Modalstopval}
            modalCancel={this.state.ModalCancel}
            modalSave={this.state.ModalSave}
            closable={false}
            footer={null}
            destroyOnClose={true}
            centered={true}
          />


          {this.state.Modulationtype===true?<ModulationModal
            modalname={"调分"}
            visible={this.state.Modulationtype}
            Cancelname={"取消"}
            Savesname={"保存"}
            Cancel={this.cancelmodel}
            Saves={(value,num)=>this.saveModulationModal(value,num)}
            closable={false}
            footer={null}
            destroyOnClose={true}
            centered={true}
          />:""}

          {/*<div style={{ width:'100%',height:'75px'}} >*/}
            {/*<p className=" fl color-black mt25 summaryname">{datalist&&datalist.task_name}</p>*/}
            {/*<a className="color-grey-6 fr font-16 mt10 mr20" onClick={this.goback}>返回</a>*/}
            {/*{this.props.isStudent()?<a className={"fr color-blue font-16 mt10 mr20"} onClick={this.addAccessory}>补交附件</a>:""}*/}
          {/*</div>*/}

          

          {/* {
           (!!comment_scores.length && 
          <div className={"color-grey-6 mb10"}>
            <span className="labal">全部评阅</span>
            <span className="count">（{comment_scores.length}）</span> 
           </div>)} */}
          <div className={`padding20-30 ${comment_scores.length ? 'bor-bottom-greyE' : ''}`}>
            {!!comment_scores.length && <div className={"color-grey-6 font-16"}>
              全部评阅<span className="count">{comment_scores.length===0?"":`(${comment_scores.length})`}</span>

              {/* <div style={{ width:'100%',height:'75px'}} ></div> */}

              {/* true: 老师身份显示“调分”入口，false: 不显示调分入口 */}
              {isAdmin && !allow_score &&
                <a className={"fr color-blue font-16"} onClick={()=>this.showModulationtype(this.props.task_id)}>调分</a>
              }
            </div> }

            {needNiPingEditor && <GraduationTasksappraiseMainEditor {...this.props}
              title={'评语'}
              showModulationtype={this.showModulationtype}
              addSuccess={this.addSuccess} ref={this.editorRef} totalCount={comment_scores.length}
              onReply={this.onReply} placeholder={"请在此输入对本作品的评语，最大限制2000个字符"}
              showSameScore={isGroup && isAdmin}
            ></GraduationTasksappraiseMainEditor> }
          </div>
          {/* ${!!comment_scores.length ? 'bor-bottom-greyE' : ''} */}
          <div className={`padding20  memoReplies commentsDelegateParent course-message`}
            style={{ paddingTop: '0px', paddingBottom: '0px' }}
          >
            {/* 
            .course-message .panel-comment_item {
                margin-top: ${needNiPingEditor ? 56 : 28}px;
              }
             */}
            <style>{`
              
              .course-message .panel-comment_item .comment_orig_content {
                width: 1040px;
              }
              .course-message .childrenCommentsView .comment_orig_content {
                width: 1000px;
              }
              
              .comment_item_cont:last-child {
                border-bottom: none;
              }
            `}</style>
            {!!comment_scores.length && <div className="panel-comment_item">
              { comment_scores.map((item, index) => {
                return <CCommentItem item={item} onDelete={this.onDelete} {...this.props} commentIndex={index} replySuccess={this.replySuccess}></CCommentItem>
              }) }
            </div>}
          </div>


        </div>
        </div>
      </React.Fragment>
    )
  }
}
export default ImageLayerOfCommentHOC() (CommonWorkAppraiseReply);