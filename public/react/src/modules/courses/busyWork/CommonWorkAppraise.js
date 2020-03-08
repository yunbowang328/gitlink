import '../katex.css';
import '../css/Courses.css';
import React,{Component} from "react";
import {markdownToHTML, ImageLayer2 } from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
import moment from 'moment';
import WorkDetailPageHeader from './common/WorkDetailPageHeader'
import CommonWorkAppraiseReply from './reply/CommonWorkAppraiseReply'
import CommonWorkAppraiseReviseAttachments from './CommonWorkAppraiseReviseAttachments'
import LeaderIcon from './common/LeaderIcon';
import showdown from 'showdown'
import showdownKatex from 'showdown-katex'
class CommonWorkAppraise extends Component{

  constructor(props){
    super(props)
    this.state={
      course_name:"",
      homework_name:"",
      search: '',


      attachments: [],
      revise_attachments: [],
    }
  }
  getWork = () => {
    let workId =this.props.match.params.workId;
    let studentWorkId =this.props.match.params.studentWorkId;

    // https://www.showdoc.cc/127895880302646?page_id=1957586480118445
    const url = `/student_works/${studentWorkId}.json`

    axios.get(url).then((result)=> {
      if (result.data.course_id) {

        this.setState({
          ...result.data
        })
      }
     }).catch((error)=>{
       console.log(error)
     })
  }
  exportMdtoHtml=(md)=> {
    let newmd=md;
    const converter = new showdown.Converter({
      extensions: [
        showdownKatex({
          // maybe you want katex to throwOnError
          throwOnError: true,
          // disable displayMode
          displayMode: false,
          // change errorColor to blue
          errorColor: '#1500ff',
        }),
      ],
    });
    return converter.makeHtml(newmd);
  }
  getReviseAttachments = () => {
    let studentWorkId =this.props.match.params.studentWorkId;
    const url = `/student_works/${studentWorkId}/supply_attachments.json`;
    axios.get(url).then((result)=> {
      if (result.data.revise_attachments) {

        this.setState({
          ...result.data
        })
      }

     }).catch((error)=>{
       console.log(error)
     })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.studentWorkId != prevProps.match.params.studentWorkId) {
      this.getWork();
      this.getReviseAttachments()
      this.commonWorkAppraiseReply && this.commonWorkAppraiseReply.fetchAllComments()
    }
  }

  componentDidMount() {
    this.getWork();
    this.getReviseAttachments()
  }

  onAttachmentRemove = (id) => {
    this.setState({
      Modalstype:true,
      // Modalstopval:'确定要删除这个附件吗?',
      Modalstopval: '是否确认删除?',

      ModalSave: ()=>this.deleteAttachment(id),
      ModalCancel:this.cancelAttachment
    })
  }
  deleteAttachment = (id) => {
    const url = `/attachments/${id}.json`
    axios.delete(url, {
      })
      .then((response) => {
        if (response.data) {
          const { status } = response.data;
          if (status == 0) {
            this.getWork()
            this.getReviseAttachments();
            this.cancelAttachment();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  cancelAttachment=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      ModalSave:"",
      ModalCancel:""
    })
  }
  onReplySuccess = () => {
    this.getReviseAttachments();
  }

  render(){
    const dateFormat = 'YYYY-MM-DD HH:mm';

    let {course_name, homework_name, search, page, loadingstate, homework_status, reference_answer,
      attachments, homework_id, project_info, work_members, is_evaluation,
      description, update_user_name, commit_user_name, update_time, commit_time, author_name,
      revise_attachments, revise_reason, atta_update_user, atta_update_time, atta_update_user_login,
      Modalstype,Modalstopval,ModalCancel,ModalSave,loadtype, is_leader_work
    } =this.state;

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let studentWorkId=this.props.match.params.studentWorkId;
    const isAdmin = this.props.isAdmin()

		document.title=course_name&&course_name;
    return(
      <WorkDetailPageHeader
        {...this.props} {...this.state}
        noTab={true}
        moduleName={'作业详情'}
        getReviseAttachments={this.getReviseAttachments}
      >
        {/*提示*/}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalCancel={ModalCancel}
          modalSave={ModalSave}
          loadtype={loadtype}
        />
        {/* 内容区 */}
        {/* <div className="padding40 memoContent new_li">
        </div>  */}

        <div className={"appraise imageLayerParent "} style={{}}>

          <style>{`
            .workAppraise>div:last-child {
              border-bottom: none !important;
            }
          `}</style>
          <ImageLayer2 parentSel=".workAppraise" childSel="a.imageTarget"></ImageLayer2>
          <div className={"workAppraise"}>
          {(description || (attachments && attachments.length != 0)) && <div className={"stud-class-set edu-back-white padding20-30"}>
            <div className={"color-grey-6 mb15 font-16"}>
              内容
            </div>
            <div className="markdown-body ml20" dangerouslySetInnerHTML={{__html: markdownToHTML(description)}}>
            </div>

            {attachments.map((item,key)=>{
              return(
                <div className="color-grey" key={key}>
                  <a className="color-grey ml20">
                    <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
                  </a>

                  <a href={item.url}
                      className="mr12 color9B9B imageTarget" length="58" title={`${item.title && item.title.length > 40 ? item.title : ''}`}>
                    {item.title}
                  </a>
                  <span className="color656565 mt2 color-grey-6 font-12 mr8">{item.filesize}</span>
                  {/*{item.delete===true?<i className="font-14 iconfont  icon-guanbi " id={item.id} aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.id)}></i>:""}*/}
                  {item.delete===true?<i className="font-14 iconfont  icon-guanbi " id={item.id} aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.id)}></i>:""}
                  {/* style={{display: 'none'}}  */}
                </div>
              )
            })}


            <div className={"color-grey-6 h20 ml20"}>
              { update_time &&
              <React.Fragment>
                <span className={"color9B9B fr"}>更新</span>
                <span className={"fr font-14 mr10 ml10"}>{update_user_name}</span>
                <span className={"color9B9B fr"}>
                  {moment(update_time).format('YYYY-MM-DD HH:mm')==="Invalid date"?"":moment(update_time).format('YYYY-MM-DD HH:mm')}
                </span>
              </React.Fragment> }

              { commit_time &&
              <React.Fragment>
                <span className={"color9B9B fr mr30"}>提交</span>
                <span className={"fr font-14 mr10 ml10"}>{commit_user_name}</span>
                <span className={" color9B9B fr"}>
                  {moment(commit_time).format('YYYY-MM-DD HH:mm')==="Invalid date"?"":moment(commit_time).format('YYYY-MM-DD HH:mm')}
                </span>
              </React.Fragment> }
            </div>

          </div> }

          <CommonWorkAppraiseReviseAttachments {...this.state}
            onAttachmentRemove={this.onAttachmentRemove}
          ></CommonWorkAppraiseReviseAttachments>

            {is_evaluation != true && project_info && project_info.name && <div className={"stud-class-set bor-top-greyE edu-back-white padding20-30"}>
              <div className={"color-grey-6 mb10"}>
                关联项目
              </div>
              <div className={"ml20"}>
                <a className="color-blue" href={`/projects/${project_info.id}`}>{project_info.name}</a>
              </div>
            </div>
            }

            {is_evaluation != true && work_members && !!work_members.length && <div className={"stud-class-set bor-top-greyE edu-back-white padding20-30"}>
              <div className={"color-grey-6 mb10"}>
                全部组员
              </div>
              <div className={"ml20 color-grey-6"}>
                <div className="">
                  当前组员：{author_name} {is_leader_work && <LeaderIcon small={true} ></LeaderIcon>}
                </div>
                <div>
                  其他组员：
                  {work_members.map((item, index) => {
                    return <React.Fragment>
                      {isAdmin ?
                      <a className={`color-blue ${index == 0 ? '' : 'ml12'}`} href="javascript:void(0)"
                          onClick={() => this.props.toWorkDetailPage(this.props.match.params, null, item.work_id)}
                      >
                        {item.user_name}
                      </a> : <span className={`${index == 0 ? '' : 'ml12'}`} >{item.user_name}</span>}
                      {item.is_leader && <LeaderIcon small={true} ></LeaderIcon>}
                    </React.Fragment>
                  })}
                </div>
                {isAdmin && <div className="font-12 color-grey-9">
                  <span >温馨提示：</span>
                  点击其他组员的姓名，可以快速评阅TA的作品
                </div>}

              </div>
            </div>
            }
            </div>


            {/* task_type={datalist&&datalist.task_type} */}
            <CommonWorkAppraiseReply {...this.props} task_id={studentWorkId}
                onReplySuccess={this.onReplySuccess} {...this.state}
                wrappedComponentRef={(ref) => {this.commonWorkAppraiseReply = ref}}
            ></CommonWorkAppraiseReply>

        </div>

      </WorkDetailPageHeader>

    )
  }
}

export default CommonWorkAppraise;
