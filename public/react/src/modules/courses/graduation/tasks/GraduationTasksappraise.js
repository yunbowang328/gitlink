import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag} from "antd";
import {Link} from 'react-router-dom';
import { WordsBtn,markdownToHTML } from 'educoder';
import axios from 'axios';
import moment from 'moment';
import Modals from '../../../modals/Modals';
import AccessoryModal from "../../coursesPublic/AccessoryModal";
import GraduationTasksappraiseReply from './GraduationTasksappraiseReply';
import CoursesListType from '../../coursesPublic/CoursesListType';
import '../../css/Courses.css';

class GraduationTasksappraise extends Component{

  constructor(props){
    super(props)
    this.state={
      coursename:"",
      title_num:20,
      title_value:"",
      fileList: [],
      contents: [{val:"",id:1}],
      type:true,
      visible:false,
      firelistdata:undefined,
      datalist: undefined,
    }
  }
  setupdate=()=>{
    let category_id= this.props.match.params.category_id;
    let zrl="/graduation_works/"+category_id+"/supply_attachments.json";
    axios.get(zrl).then((result)=>{

      if(result.status===200){
      	let status=result.data.status;
				if(status===undefined || status=== 403 || status === 401 || status=== 407 || status=== 408|| status=== 409 || status === 500||status===-1){

				}else{
          this.setState({
            firelistdata:result.data,
          })
        }

      }

    }).catch((error)=>{
      console.log(error)
    })


    let url ='/graduation_works/'+category_id+'.json';
    axios.get(url).then((result)=>{
      if(result.status===200) {
        this.setState({
          datalist: result.data,
        })
      }
    }).catch((error)=>{
      console.log(error)
    })

  }
  componentDidMount(){

    this.setupdate()

  }

  goback=()=>{
    // let {datalist}=this.state;
    // let courseId=this.props.match.params.coursesId;
    // let category_id=this.props.match.params.category_id;
		//
    // window.location.href="/courses/"+courseId+"/graduation_tasks/"+datalist.graduation_id;
		// let courseId=this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }

		this.props.history.replace(`/courses/${this.state.datalist.course_id}/graduation_tasks/${this.state.datalist.graduation_id}/${this.state.datalist.task_id}/list`);

  }

  Cancelvisible=()=>{
    this.setState({
      visible:false
    })
  }

  addAccessory=()=>{
    this.setState({
      visible:true
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
            this.setupdate();
            this.cancelAttachment();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onAttachmentRemove = (id) => {

    this.setState({
      Modalstype:true,
      Modalstopval:'确定要删除这个附件吗?',
      ModalSave: ()=>this.deleteAttachment(id),
      ModalCancel:this.cancelAttachment
    })

  }

  cancelAttachment=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      ModalSave:"",
      ModalCancel:""
    })
  }



  render(){

    let {datalist,firelistdata,
      Modalstype,Modalstopval,ModalCancel,ModalSave,loadtype,visible} =this.state;

    let courseId=this.props.match.params.coursesId;
    let position=this.props.match.params.position;
    let category_id=this.props.match.params.category_id;
    let graduation_id=datalist===undefined?"":datalist.graduation_id;
    let task_id=datalist===undefined?"":datalist.task_id;
    // console.log(datalist);

		document.title=datalist&&datalist.course_name;
    return(
      <React.Fragment>

        <div>
          {/*提示*/}
          <Modals
            modalsType={Modalstype}
            modalsTopval={Modalstopval}
            modalCancel={ModalCancel}
            modalSave={ModalSave}
            loadtype={loadtype}
          />


          <AccessoryModal
						{...this.props}
            modalname={"补交附件"}
            visible={visible}
            Cancelname={"取消"}
            Savesname={"确认"}
            Cancel={this.Cancelvisible}
            categoryid={category_id}
            setupdate={this.setupdate}
          />
          <div className="newMain clearfix appraise ">
            <div className={"educontent mb20"}>

              <p className="clearfix mt10">
                <a onClick={this.goback} className="color-grey-9 fl">{datalist&&datalist.course_name}</a>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <Link to={"/courses/"+courseId+"/graduation_tasks/"+graduation_id} className="color-grey-9 fl">{datalist&&datalist.graduation_name}</Link>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <Link to={"/courses/"+courseId+"/graduation_tasks/"+graduation_id+"/detail/"+task_id+"/list"} className="color-grey-9 fl">任务详情</Link>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <span className="color-grey-6 fl">{datalist&&datalist.author_name}</span>
              </p>


              <style>
                {
                  `
                  .mt23{
                     margin-top:23px;
                  }
                  `
                }
              </style>
              <div className="mt20 mb20 clearfix lineh-25">
                <p className="fl color-black summaryname lineh-25">{datalist&&datalist.task_name}</p>
                <CoursesListType
                  typelist={datalist&&datalist.status}
                />
                <a className="color-grey-6 fr font-16 mr20" onClick={this.goback}>返回</a>
                {this.props.isStudent()?
                  datalist&&datalist.task_status===2?
                  <a className={"fr color-blue font-16 mr20"} onClick={this.addAccessory}>补交附件</a>:""
                  :""}
              </div>


              <div className="edu-back-white">

                <div className={"stud-class-set edu-back-white padding20-30"}>

                    <div className={"color-grey-6 h20 mb20"}>
                      内容
                    </div>

                    <div className={"ml20"}>
											<div className="markdown-body" dangerouslySetInnerHTML={{__html: markdownToHTML(datalist&&datalist.description===null?"--":datalist&&datalist.description).replace(/▁/g,"▁▁▁")}}></div>
                    </div>

                    {/*<div className={"color-grey-6 h20 ml20"}>*/}
                      {/*<span>15M</span>*/}
                      {/*<span className={"mr10 color656565"}>文件包名称</span>*/}
                      {/*<span className={"mr10 color9B9B"}>15M</span>*/}
                    {/*</div>*/}

                  {datalist&& datalist.attachments && datalist.attachments.map((item,key)=>{
                    return(
                      <div className="color-grey" key={key}>
                        <a className="color-grey ml20">
                          <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
                        </a>
                        <a href={item.url}
                           className="mr12 color9B9B" length="58">
                          {item.title}
                        </a>
                        <span className="color656565 mt2 color-grey-6 font-12 mr8">{item.filesize}</span>
                        {/*{item.delete===true?<i className="font-14 iconfont  icon-guanbi " id={item.id} aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.id)}></i>:""}*/}

                      </div>
                    )
                  })}


                  <div className={"color-grey-6 lineh-25 clearfix ml20"}>

                      {/*<span className={"color9B9B fr"}>更新</span>*/}
                      {/*<span className={"fr font-13 mr10 ml10"}>{datalist&&datalist.update_user_name}</span>*/}
                      {/*<span className={"color9B9B fr"}>*/}
                        {/*{moment(datalist&&datalist.update_time).format('YYYY-MM-DD HH:mm:ss')==="Invalid date"?"":moment(datalist&&datalist.update_time).format('YYYY-MM-DD HH:mm:ss')}*/}
                      {/*</span>*/}
                      <span className={"color9B9B fr"}>提交</span>
                      <span className={"fr font-13 mr10 ml10"}>{datalist&&datalist.author_name}</span>
                      <span className={" color9B9B fr"}>
                        {moment(datalist&&datalist.commit_time).format('YYYY-MM-DD HH:mm:ss')==="Invalid date"?"":moment(datalist&&datalist.commit_time).format('YYYY-MM-DD HH:mm:ss')}
                      </span>

                    </div>

                </div>

                {firelistdata===undefined?"":firelistdata.length===0?"":firelistdata.revise_attachments.length===0?"":
                <div className={"stud-class-set bor-top-greyE padding20-30 edu-back-white"}>
                    <div className={"color-grey-6 mb10 "}>
                      补交附件
                    </div>
                    <div className={"ml20"}  style={{"white-space":"pre-wrap","word-break": "break-all","word-wrap": "break-word"}}>
                      补交原因：{firelistdata&&firelistdata.revise_reason}
                    </div>


										<div className="color-grey">
                    {firelistdata===undefined?"":firelistdata.length===0?"":firelistdata.revise_attachments.map((item,key)=>{

											return(
												<span>
													<a className="color-grey ml20">
														<i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
													</a>
													<a href={item.url}
														 className="mr12 color9B9B" length="58">
														{item.title}
													</a>
													<span className="color656565 mt2 color-grey-6 font-12 mr8">{item.filesize}</span>
													{item.delete===true?<i className="font-14 iconfont  icon-guanbi " id={item.id} aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.id)}></i>:""}
												</span>
													)
												 })}

								  	</div>

                    <div className={"color-grey-6 lineh-25 clearfix ml20"}>

                      <span className={"color9B9B fr"}>更新</span>
                      <span className={"fr font-13 mr10 ml10"}>{firelistdata&&firelistdata.atta_update_user}</span>
                      <span className={"color9B9B fr"}>
                        {moment(firelistdata&&firelistdata.atta_update_time).format('YYYY-MM-DD HH:mm:ss')==="Invalid date"?"":moment(firelistdata&&firelistdata.atta_update_time).format('YYYY-MM-DD HH:mm:ss')}
                      </span>

                    </div>


                </div>}
                {datalist&&datalist.project_info===undefined?"":
                  <div className={"stud-class-set edu-back-white padding20-30 bor-top-greyE"}>
                    <div className={"color-grey-6 mb10"}>
                      关联项目
                    </div>
                    <div className={"ml20"}>
                      {datalist&&datalist.project_info.name}
                    </div>
                </div>}
                {/*{*/}
                { datalist === undefined?"": datalist && datalist.task_type===undefined ?"" : datalist.task_type===1? "": datalist && datalist.work_members && datalist.work_members.length == 0 ?"":
                  <div className={"stud-class-set edu-back-white padding20-30 bor-top-greyE"} style={{height:"100%"}}>
                    <div className={"color-grey-6 mb10"}>
                      其他组员
                    </div>
                    <div className={"both"}></div>
                    {datalist.work_members.map((item,key)=>{
                      return(
                        <div className={"fl mr20 ml20"} key={key} id={item.user_id}>
                          {item.user_name}
                        </div>
                      )
                    })}
                    <div className={"both"}></div>
                  </div>
                }
              </div>


                <GraduationTasksappraiseReply {...this.props} task_id={datalist&&datalist.task_id} task_type={datalist&&datalist.task_type}></GraduationTasksappraiseReply>

            </div>


          </div>
        </div>

      </React.Fragment>

    )
  }
}

export default GraduationTasksappraise;
