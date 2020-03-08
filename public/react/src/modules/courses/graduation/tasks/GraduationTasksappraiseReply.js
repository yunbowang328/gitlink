import React,{ Component } from "react";
import { Pagination } from "antd";
import axios from 'axios'
import moment from 'moment'
import { getImageUrl,WordsBtn } from 'educoder';
import {ImageLayerOfCommentHOC} from '../../../page/layers/ImageLayerOfCommentHOC';
import GraduationTasksappraiseReplyChild from './GraduationTasksappraiseReplyChild';
import '../../../forums/Post.css'
import '../../../comment/Comment.css'
import '../../common/courseMessage.css'
import './GraduationTasksappraiseReply.css'

const REPLY_PAGE_COUNT = 10
const $ = window.$;

/* 

*/
class GraduationTasksappraiseReply extends Component{
  constructor(props){
    super(props);
    this.state={
      total_count: 0,
      comment_scores: []
    }
  }

  fetchAllComments = () => {
    let category_id= this.props.match.params.category_id;
    const url = `/graduation_works/${category_id}/comment_list.json`
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
  componentDidMount(){
    this.fetchAllComments()
  }
  addSuccess = () => {
    this.fetchAllComments()
  }

  transformReply = (reply, children = []) => {
    const isAdmin = this.props.isAdmin()
    const isSuperAdmin = this.props.isSuperAdmin()
    return {
      isSuperAdmin: isSuperAdmin,
      admin: isAdmin, //
      children: children,
      child_message_count: reply.child_message_count,
      id: reply.comment_id,
      image_url: reply.user_image_url,
      // time: moment(reply.comment_time).fromNow(),
      time: moment(reply.comment_time).format('YYYY-MM-DD HH:mm'),
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
        const url = `/graduation_works/${category_id}/delete_score.json?comment_id=${item.id}`
        axios.delete(url).then((result)=>{
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
		let category_id= this.props.match.params.category_id;
    // console.log(value,num)
    let url ="/graduation_works/"+category_id+"/adjust_score.json";
    axios.post(url,{
      score:num,
      comment:value
    }).then((result)=>{
      // console.log(result)
      if(result.data.status===0){
        this.setState({
          Modalstype:true,
          Allocationtype:false,
          Modalstopval:result.data.message,
          ModalSave:this.cancelmodel,
        })
				this.fetchAllComments()
      }

    }).catch((error)=>{
      console.log(error)
    })

  }

  render(){
    let { total_count, comments, pageCount, comment_scores } = this.state
    const { current_user, memo } = this.props
    const isAdmin = this.props.isAdmin();
    const isStudent=this.props.isStudent();
    const isNotMember=this.props.isNotMember();


    return(
      <React.Fragment>
				{comment_scores.length===0&&isStudent===true||comment_scores.length===0&&isNotMember===true? "": <div className="edu-back-white" style={{marginTop: '16px'}}>
        {isStudent===true?
          <GraduationTasksappraiseReplyChild
              {...this.props}
              {...this.state}
              cancelmodel={this.cancelmodel}
              showModulationtype={(id)=>this.showModulationtype(id)}
              saveModulationModal={(value,num)=>this.saveModulationModal(value,num)}
              addSuccess={this.addSuccess}
              onDelete={this.onDelete}
            />
          : <GraduationTasksappraiseReplyChild {...this.state} {...this.props}
                 cancelmodel={this.cancelmodel}
                 showModulationtype={(id)=>this.showModulationtype(id)}
                 saveModulationModal={(value,num)=>this.saveModulationModal(value,num)}
                 addSuccess={this.addSuccess}
                 onDelete={this.onDelete}
              />
				}
        </div>
				}
      </React.Fragment>
    )
  }
}
export default ImageLayerOfCommentHOC() (GraduationTasksappraiseReply);
{/*<div id="forum_list" className="forum_table">*/}
	{/*<div className="mh650 edu-back-white">*/}
		{/*<div*/}
			{/*className="edu-tab-con-box clearfix edu-txt-center">*/}
			{/*<img className="edu-nodata-img mb20"*/}
					 {/*src={getImageUrl("images/educoder/nodata.png")}/>*/}
			{/*<p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>*/}
		{/*</div>*/}
	{/*</div>*/}
{/*</div>*/}