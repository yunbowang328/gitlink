import React,{ Component } from "react";
import './css/moopCases.css'
import '../courses/css/Courses.css'

import { getImageUrl , MarkdownToHtml , ActionBtn , AttachmentList } from 'educoder';

import Tags from './CaseTags'

import axios from 'axios';
import Modals from '../modals/Modals'

// import AttachmentList from '../../common/components/attachment/AttachmentList'

class CaseDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      modalsType:"",
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:"",
    }
  }

  componentDidMount =()=>{
    let caseID = this.props.match.params.caseID;
    this.props.getDetail(caseID);
  }
  // 是否删除
  delCases=()=>{
    this.setState({
      modalsType:true,
      modalsTopval:"是否确认删除?",
      modalsBottomval:""
    })    
  }

  // 取消删除
  cancelDelClasses=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:""
    })
  }
  // 确定删除
  sureDelClasses=()=>{
    let caseID = this.props.match.params.caseID;
    let url =`/libraries/${caseID}.json`;
    axios.delete(url).then((result)=>{
      if(result){
        this.props.showNotification("删除成功");
        this.props.history.push("/moop_cases");
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


  render(){
    let { CaseDetail , praise_count , creator , operation , user_praised , tags , attachments }=this.props
    let {
      modalsType,
      modalsTopval,
      modalsBottomval,
    } = this.state;
    document.title = CaseDetail&&CaseDetail.title!=undefined?CaseDetail&&CaseDetail.title:"教学案例";
    return(
      <div className="educontent mt10 mb50">
        {
          CaseDetail &&
          <React.Fragment>
            <Modals
              modalsType={modalsType}
              modalsTopval={modalsTopval}
              modalsBottomval={modalsBottomval}
              modalCancel={this.cancelDelClasses}
              modalSave={this.sureDelClasses}
            >
            </Modals>
            <p className="mt10 mb20 clearfix lineh-20">
              <a href="/moop_cases" className="color-grey-9">教学案例</a> &gt; <span className="color-grey-3">{ CaseDetail.title}</span>
            </p>
            <p className="lineh-25 mb20 clearfix">
              <span className="font-22 fl mr10 task-hide lineh-30" style={{maxWidth:"800px"}}>
                { CaseDetail.title}
              </span>
              <span className="mt10 fl">
                <Tags tags={tags}></Tags>
                {
                  CaseDetail.status == "pending" && <span class="edu-filter-btn fl cdefault edu-activity-green ml10">草稿</span>
                }
                {
                  CaseDetail.status == "processing" && <span class="edu-filter-btn fl cdefault edu-activity-green ml10">审核中</span>
                }
                {
                  CaseDetail.status == "refused" && <span class="edu-filter-btn fl cdefault edu-activity-orange ml10">未通过</span>
                }
              </span> 
              <a href="/moop_cases" className="fr color-grey-9 mt5">返回</a>
            </p>
            <div className="edu-back-white">
              <div className="padding30">
                <div className="df mb5">
                  <a href="/users/moop"><img alt="82274?1563067098" className="radius mr15 mt3" height="50" src={getImageUrl(`images/${creator && creator.image_url}`)} width="50" /></a>
                  <div className="flex1">
                    <li className="clearfix mb5">
                      <span className="font-16 fl">{creator && creator.name}</span>
                      {
                        operation && operation.can_deletable ? <ActionBtn style="greyLine" onClick={this.delCases} className="fr">删除</ActionBtn>:""
                      }
                      
                      {
                        operation && operation.can_editable ? <ActionBtn style="colorBlue" to={`/moop_cases/${this.props.match.params.caseID}/edit`} className="fr mr20">编辑</ActionBtn>:""
                      }
                    </li>
                    <li className="clearfix lineh-20">
                      <span className="fl color-grey-9 mr20">{creator && creator.school_name}</span>
                      <span className="fr">
                        <span className="fl color-grey-9 mr30">编码：<span className="color-grey-6">{CaseDetail.uuid}</span></span>
                        {
                          CaseDetail && CaseDetail.status=="published" ?
                          <span className="fl color-grey-9">发布时间：<span className="color-grey-6">{CaseDetail.published_at}</span></span>
                          :
                          <span className="fl color-grey-9">上传时间：<span className="color-grey-6">{CaseDetail.created_at}</span></span>
                        }
                      </span>
                    </li>
                  </div>
                </div>
                <div>
                  <span className="fl color-grey-9">作者：</span>{CaseDetail.author_name}/{CaseDetail.author_school_name}
                </div>
                <style>
                  {`
                    .setMDStyle .editormd-html-preview{
                      width:100%!important;
                    }
                  `}
                </style>
                <div class="mt20 setMDStyle">
                  { CaseDetail.content && <MarkdownToHtml content={CaseDetail.content} id="casesDetail" selector="casesDetail" style={{width:"100%!important"}}></MarkdownToHtml>}
                </div>
                { attachments && 
                  <div className="mt10">
                    <AttachmentList {...this.props} {...this.state} attachments={attachments}></AttachmentList>
                  </div>
                }     
                <div class="mt40">
                  {
                    user_praised ?
                    <p className="pointsBtn pointedBtn">
                      <span>已赞</span>
                      <span>{praise_count}</span>
                    </p>
                    :
                    <p onClick = {()=>this.props.praisePoint(this.props.match.params.caseID)} className="pointsBtn">
                      <span><i class="iconfont icon-dianzan"></i></span>
                      <span>{praise_count}</span>
                    </p>
                  }              
                </div>
              </div>
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}
export default CaseDetail;