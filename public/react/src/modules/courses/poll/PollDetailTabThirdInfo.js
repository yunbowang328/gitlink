import React,{ Component } from "react";
import {Checkbox,Radio} from "antd";

import NoneData from "../coursesPublic/NoneData"

import '../css/members.css'
import '../css/busyWork.css'
import './pollStyle.css'


const map={1:"单选题",2:"多选题",3:"主观题",4:"主观题"}
class PollDetailTabThirdInfo extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let { pollDetail }=this.props;
    console.log("pollDetailpollDetail");
    console.log(pollDetail);
    return(
      <div>
        {
          pollDetail !== undefined ?

            <div className="edu-back-white">
              {
                pollDetail !== pollDetail.poll.polls_description &&
                <p style={{whiteSpace:"pre-wrap"}} className="color-grey-3 padding20-30">{ pollDetail.poll.polls_description }</p>
              }
              {
                pollDetail && pollDetail.questions && pollDetail.questions.length > 0 && 
                <p className="padding20-30 clearfix edu-txt-left" style={{background:"#fafafa"}}>
                  { !pollDetail || !pollDetail.question_types || pollDetail.question_types.q_counts===0 ? "" :
                    <span className="color-grey-3">
                      {
                        pollDetail && pollDetail.question_types && pollDetail.question_types.q_counts > 0 &&
                        <span>合计{pollDetail.question_types && pollDetail.question_types.q_counts}题：</span>
                      }
                      {
                        pollDetail && pollDetail.question_types.q_singles > 0 &&
                        <span className="mr15 color-grey-9">单选题{pollDetail.question_types.q_singles}题</span>
                      }
                      {
                        pollDetail && pollDetail.question_types.q_doubles > 0 &&
                        <span className="mr15 color-grey-9">多选题{pollDetail.question_types.q_doubles}题</span>
                      }
                      {
                        pollDetail && pollDetail.question_types.q_mains > 0 &&
                        <span className="color-grey-9">主观题{pollDetail.question_types.q_mains}题</span>
                      }
                    </span>
                  }
                </p>
              }
              
              {
                pollDetail && pollDetail.questions && pollDetail.questions.length > 0 && pollDetail.questions.map((item,key)=>{
                  return(
                    <div className="previewList">
                      <p className="pl30 pr30 pt30 pb15 font-16 clearfix">
                        <span className="color-blue mr8 fl">{item.question.question_number}、{map[item.question.question_type]}</span>
                        { item.question.is_necessary==1 ? <span className="mustAnswer fl ml10 mr10">必答</span>:<span className="mustAnswer fl ml10 mr10">选答</span> }
                        { item.question.question_type == 2 && item.question.min_choices != undefined && item.question.min_choices != null && item.question.max_choices != undefined && item.question.max_choices != null ?
                          <span className="color-grey-9 font-14 fl mt2">
                        {
                          item.question.min_choices == item.question.max_choices ? "可选"+item.question.max_choices+"项" :
                            "可选"+item.question.min_choices+"-"+item.question.max_choices+"项"
                        }
                      </span>:""
                        }
                      </p>
                      <p className="pl30 pr30 pb15"><span className="font-14  flex1" style={{
                        "white-space": "pre-wrap",
                        "word-break": "break-all",
                        "word-wrap": "break-word"
                      }}>{item.question.question_title}</span></p>
                      {
                        // 单选题
                        item.question.question_type==1 &&
                        <Radio.Group className="answerList" disabled>
                          {
                            item.question.answers.map((index,k)=>{
                              return(
                                <li className="df">
                                  <Radio className="fl" value={index.answer_id}></Radio>
                                  <span className={index.answer_text=="其他"?"break-word":"break-word flex1"}>{index.answer_text}</span>
                                  {
                                    index.answer_text=="其他" ? <p className="textLine"></p>:""
                                  }

                                </li>
                              )
                            })
                          }
                        </Radio.Group>
                      }
                      {
                        // 多选题
                        item.question.question_type==2 &&
                        <Checkbox.Group className="answerList" disabled>
                          {
                            item.question.answers.map((index,k)=>{
                              return(
                                <li className="df" key={k}>
                                  <Checkbox className="fl mr8" value={index.answer_id} key={index.answer_id}></Checkbox>
                                  <span className={index.answer_text=="其他"?"break-word":"break-word flex1"}>{index.answer_text}</span>
                                  {
                                    index.answer_text=="其他" ? <p className="textLine"></p>:""
                                  }
                                </li>
                              )
                            })
                          }
                        </Checkbox.Group>
                      }
                      {
                        // 主观题
                        item.question.question_type == 3 &&
                        <div className="pl30 pr30 pb20">
                          <textarea placeholder="在此填入答案" readOnly className="winput-100-130"></textarea>
                        </div>
                      }
                    </div>
                  )
                })
              }

              {
                pollDetail && pollDetail.questions && pollDetail.questions.length == 0 && <NoneData></NoneData>
              }
            </div>
            : ""
        }
      </div>
    )
  }
}
export default PollDetailTabThirdInfo