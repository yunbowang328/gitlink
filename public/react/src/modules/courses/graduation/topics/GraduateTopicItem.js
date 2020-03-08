import React,{ Component } from "react";
import CoursesListType from '../../coursesPublic/CoursesListType';

import { WordsBtn } from 'educoder'
import {Tooltip} from 'antd'
import axios from 'axios'

const map={0:"待选中",1:"待确认",2:"已确认"}
class GraduateTopicItem extends Component{
  constructor(props){
    super(props);
  }
  editTopic=(topicId)=>{ 
    let courseId=this.props.match.params.coursesId;
    this.props.history.push(`/courses/${courseId}/graduation_topics/${topicId}/edit`);
  }
  toDetailPage=(topicId)=>{

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

    let courseId=this.props.match.params.coursesId;
    this.props.history.push(`/courses/${courseId}/graduation_topics/${topicId}/detail`);
  }
  render(){
    const { checkBox, discussMessage, index,chooseTopic,
    data,
    courseId
    } = this.props;

    const isAdmin = this.props.isAdmin();
    const isStudent=this.props.isStudent();
    const isNotMember=this.props.isNotMember();
    if (!discussMessage || !discussMessage.author) {
      return '';
    }
    return(
      <div>
        <style>
          {
            `
         .boardsList:hover {
              box-shadow: 0px 2px 6px rgba(51,51,51,0.09);
              opacity: 1;
              border-radius: 2px;
          }
          .graduateTopicList .ant-checkbox-wrapper {
              margin-top: -44px;
          }
            `
          }
        </style>

        <div className="graduateTopicList boardsList mb20" style={{cursor : isAdmin ? "pointer" : "default" }} onClick={() => window.$(`.topicItem${index} input`).click() }>
          <style>{`
            
            .graduateTopicList .ant-checkbox-input {s
              margin-right: 15px;
            }
            .ant-checkbox-group > div .boardsList {

                  padding: 17px 30px 20px!important;
              }
          `}</style>
          { isAdmin ? <span className={`topicItem${index} fl`} style={{"height":"64px"}}>{checkBox}</span> : ""}
          <div className="clearfix ds pr flex1">
						<style>{`
            .maxwidth580{
                max-width: 580px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
            a:hover{
                 color: #4cacff;
             }
          `}</style>
            <h6>
              {
                isNotMember?
										discussMessage.private_icon===true?<span className="fl mt3 font-16 font-bd color-dark maxwidth580 pointer" title={ discussMessage.private_icon===true?"私有属性，非课堂成员不能访问":discussMessage.name}>{discussMessage.name}</span>:
											<a className="fl mt3 font-16 font-bd color-dark maxwidth580 pointer" title={discussMessage.name}>{discussMessage.name}</a>
							 :""
              }
              {
                isStudent?<a onClick={() => this.toDetailPage(`${discussMessage.id}`)}
                             className="fl mt3 font-16 font-bd color-dark maxwidth580" title={discussMessage.name}>{discussMessage.name}</a>:""
              }
							{
								isAdmin?<a onClick={() => this.toDetailPage(`${discussMessage.id}`)} className="fl mt3 font-16 font-bd color-dark maxwidth580" title={discussMessage.name}>{discussMessage.name}</a>:""
							}
              {
               discussMessage.private_icon===true?
                  <Tooltip  title={"私有属性，非课堂成员不能访问"}  placement="bottom">
                    <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl mt4"></i>
                  </Tooltip>
                  :""
              } 
              <CoursesListType typelist={[map[`${discussMessage.status}`]]} typesylename={""} />
            </h6>
              
            <div className="cl"></div>
            <p className="color-grey mt20 clearfix">
              <span className="fl mr40 mt1">
                <Tooltip title="指导老师" placement="bottom">
                  <span className="color-grey3">{discussMessage.author}</span>
                </Tooltip>
              </span>              
              <span className="fl mr20 color-grey-9 mt1">{discussMessage.selected_count} 已选</span>
              <span className="fl color-grey-9 mt1">{discussMessage.confirmation_count} 已确认</span>
              <span className="fr">
                {
                  isStudent?<WordsBtn style="blue" onClick={() => this.toDetailPage(`${discussMessage.id}`)}
                                      className="font-16 mr20" >查看详情</WordsBtn>:""
                }
                {
                  isAdmin?<WordsBtn style="blue" onClick={() => this.toDetailPage(`${discussMessage.id}`)} className="font-16 mr20"  >查看详情</WordsBtn>:""
                }

                {
                  isAdmin && <WordsBtn onClick={()=>this.editTopic(`${discussMessage.id}`)} style="blue" className="font-16  ">编辑</WordsBtn>
                }
                {
                  isStudent && data.user_selected == true && discussMessage.user_topic_status==0 &&
                  <WordsBtn onClick={()=>chooseTopic(`${discussMessage.id}`,index,true)} style="blue" className="font-16 mr20">
                    取消选题
                  </WordsBtn>                   
                }
                {
                  isStudent && data.user_selected==false && (discussMessage.user_topic_status == null || discussMessage.user_topic_status == 2) &&
                  <WordsBtn onClick={()=>chooseTopic(`${discussMessage.id}`,index,false)} style="blue" className="font-16 mr20">
                    选题
                  </WordsBtn>                   
                }


              </span>
            </p>
          </div>
        </div>
      </div>
      )
    }
}
export default GraduateTopicItem;