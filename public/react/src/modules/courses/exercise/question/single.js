import React,{ Component } from "react";
import {Checkbox,Radio, Input} from "antd";

import {markdownToHTML, MarkdownToHtml} from 'educoder'
import axios from 'axios'
const tagArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
class single extends Component{
  constructor(props){
      super(props);
  }

  changeItem=(e)=>{
    let choiceId=e.target.value;
    let question_id=this.props.questionType.question_id;
    let {index}=this.props;
    let url=`/exercise_questions/${question_id}/exercise_answers.json`;
    axios.post((url),{
      exercise_choice_id:choiceId
    }).then((result)=>{
      if(result){
        this.props.changeOption && this.props.changeOption(index,[choiceId]);
        this.props.changeQuestionStatus && this.props.changeQuestionStatus(parseInt(this.props.questionType.q_position)-1,1);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  render(){
    let { 
      questionType , 
      exercise,
      user_exercise_status
    }=this.props
    
    let isStudent =this.props.isStudent();
    let isJudge = questionType.question_type == 2
    return(
      <div className="pl30 pr30 singleDisplay">
        <Radio.Group className="with100" disabled={ user_exercise_status == 1 ? true : false } value={questionType.user_answer[0]} onChange={this.changeItem}>
          {
            questionType.question_choices && questionType.question_choices.map((item,key)=>{
              let prefix = isJudge ?  undefined : `${tagArray[key]}.`
              return(
                <p className={parseInt(questionType.question_type) == 0 ? "clearfix mb15" : "fl mr40"}>
                  <Radio className="df lineh-25 setRadioStyle" value={item.choice_id}>
                    <span className="fl mr3 lineh-25">{prefix}</span>
                    <MarkdownToHtml content={item.choice_text} selector={'single_' + (this.props.index + 1) + (key + 1)}
                      className="flex1" style={{display:"inline-block"}}                      
                    ></MarkdownToHtml>
                  </Radio>
                </p>
              )
            })
          }
        </Radio.Group>
        {          
          // 答案公开，且试卷已经截止
          isStudent && exercise && exercise.answer_open==true && (exercise.exercise_status == 3 || user_exercise_status == 1) && 
          <p className="bor-top-greyE pt20 mt10 font-16">参考答案：
            {questionType.standard_answer.map((i,k)=>{
                return(
                  <span value={k}>{tagArray[parseInt(i)-1]}</span>
                )
              })
            }
          </p>
        }
      </div>
    )
  }
}
export default single