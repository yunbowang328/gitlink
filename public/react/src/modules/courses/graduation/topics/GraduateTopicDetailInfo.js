import React,{ Component } from "react";

import '../../css/members.css'
import '../../css/busyWork.css'
import '../style.css'
import axios from "axios";
import GraduateTopicReply from './GraduateTopicReply'

import { ConditionToolTip , MarkdownToHtml , AttachmentList } from 'educoder'

const $=window.$;
const type={1: "设计",2: "论文", 3: "创作"}
const source={1: "生产/社会实际",  2:"结合科研", 3: "其它"}
const first={1:'真题', 2:'模拟题'}
const second={1:'纵向课题', 2:'横向课题', 3: "自选"}
const repeat={1:'新题',2:"往届题，有新要求",3:'往届题，无新要求'}
class GraduateTopicDetailTable extends Component{
  constructor(props){
    super(props);
    this.state={
      topicInfo:undefined
    }
  }
  componentDidMount=()=>{
    let course_id=this.props.match.params.course_id;
    let graduation_topic_id=this.props.match.params.graduation_topic_id;

    let url=`/courses/${course_id}/graduation_topics/${graduation_topic_id}/show_detail.json`;
    axios.get(url).then((result)=>{
      if(result.status==200){
        this.setState({
          topicInfo:result.data
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  render(){
    let{topicInfo}=this.state
    console.log(topicInfo)
    let course_id=this.props.match.params.course_id;
    let graduation_topic_id=this.props.match.params.graduation_topic_id;

    return(
      <div>
        <style>{`
          .editormd-html-preview{
            width:100%!important;
          }
              `}</style>
        <div className="edu-back-white mb20 padding30">
          <div className="bor-bottom-greyE pb30">
            <div id="gratuationTopic_Detail" className="new_li markdown-body justify">
              {
                topicInfo && topicInfo.description!="" &&
                <MarkdownToHtml  content={topicInfo.description} ></MarkdownToHtml>
              }
            </div>
            {
              topicInfo && topicInfo.attachment_list.length>0 &&
              <div className="mt30">
                {/* {
                  topicInfo.attachment_list.map((item,key)=>{
                    return(
                      
                      <li className="clearfix mb8" key={key}>
                        <i className="iconfont icon-fujian color-green font-16 mr8 fl"></i>
                        <ConditionToolTip title={item.title} condition={item.title && item.title.length > 30 }>
                          <a href={item.url} className="color-grey-3 fl mr12 task-hide" style={{"maxWidth":"432px"}}>{item.title}</a>
                        </ConditionToolTip>
                        <span className="fl font-12 color-grey-9">{item.filesize}</span>
                      </li>
                    )
                  })
                } */}
                <AttachmentList {...this.props} {...this.state} attachments = {topicInfo.attachment_list}></AttachmentList>
              </div>
            }
          </div>
          <div className="mt30">
            {
              topicInfo && 
              <p className="clearfix exu-txt-left mb20">
                <span className="fl with25">
                  <span className="color-grey-9">课题类型：</span>
                  <span className="color-grey-3">{topicInfo.topic_type ? type[`${topicInfo.topic_type}`] :"--"}</span>
                </span>
                <span className="fl with25">
                  <span className="color-grey-9">课题来源：</span>
                  <span className="color-grey-3">{topicInfo.topic_source ? source[`${topicInfo.topic_source}`] :"--"}</span>
                </span>
                <span className="fl with25">
                  <span className="color-grey-9">课题性质1：</span>
                  <span className="color-grey-3">{topicInfo.topic_property_first ? first[`${topicInfo.topic_property_first}`] :"--"}</span>
                </span>
                <span className="fl with25">
                  <span className="color-grey-9">课题性质2：</span>
                  <span className="color-grey-3">{topicInfo.topic_property_second ? second[`${topicInfo.topic_property_second}`] :"--"}</span>
                </span>
              </p>
            }
            {
              topicInfo && 
              <p className="clearfix exu-txt-left">
                <span className="fl with25">
                  <span className="color-grey-9">课题重复情况：</span>
                  <span className="color-grey-3">{topicInfo.topic_repeat ? repeat[`${topicInfo.topic_repeat}`] :"--"}</span>
                </span>
                <span className="fl with25">
                  <span className="color-grey-9">调研或实习地点：</span>
                  <span className="color-grey-3">{topicInfo.city || "--"}</span>
                </span>
                <span className="fl with50">
                  <span className="color-grey-9">课题来源单位：</span>
                  <span className="color-grey-3">{topicInfo.source_unit || "--"}</span>
                </span>
              </p>
            }
          </div>
        </div> 

        <div className="edu-back-white mb20  graduateTopic course-message">
          <GraduateTopicReply memo={{id: graduation_topic_id, user_id: topicInfo && topicInfo.user_id}} course_id={course_id} {...this.props}></GraduateTopicReply>
        </div>
      </div>
    )
  }
}
export default GraduateTopicDetailTable;