import React,{ Component } from "react";
import {Checkbox,Radio, Input} from "antd";
import {markdownToHTML, MarkdownToHtml} from 'educoder'

import axios from 'axios'
const tagArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
class Multiple extends Component{
  constructor(props){
      super(props);
  }
  saveId=(value)=>{
    let question_id=this.props.questionType.question_id;
    let url=`/exercise_questions/${question_id}/exercise_answers.json`;
    let {index}=this.props;
    axios.post((url),{
      exercise_choice_id:value
    }).then((result)=>{
      if(result.status==200){
        let k=0;
        if(value.length > 0 ){
          k=1;
        }else{
          k=0;
        }
        this.props.changeOption && this.props.changeOption(index,value);
        this.props.changeQuestionStatus && this.props.changeQuestionStatus(parseInt(this.props.questionType.q_position)-1,k);
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
    console.log(questionType);
    return(
      <div className="pl30 pr30 singleDisplay">
        <Checkbox.Group className="with100" disabled={ user_exercise_status == 1 ? true : false } onChange={this.saveId} value={questionType.user_answer}>
          {
            questionType.question_choices && questionType.question_choices.map((item,key)=>{
              let prefix = `${tagArray[key]}.`

              return(
                <p className="clearfix mb15 df">
                  <Checkbox className="lineh-15 df mr8 setRadioStyle" value={item.choice_id}>
                    <span className="fl mr3 lineh-25">{prefix}</span>
                    <MarkdownToHtml content={item.choice_text} selector={'multiple_' + (this.props.index + 1) + (key + 1)}
                      className="flex1" style={{display:"inline-block"}}                              
                    ></MarkdownToHtml>
                  </Checkbox>
                </p>
              )
            })
          }
        </Checkbox.Group>
        {
          // 答案公开，且试卷已经截止
          isStudent && exercise && exercise.answer_open==true && exercise.exercise_status == 3 && 
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
export default Multiple