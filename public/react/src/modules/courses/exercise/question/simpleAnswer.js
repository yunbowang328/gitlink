import React,{ Component } from "react";
import {Checkbox,Radio, Input} from "antd";
import {markdownToHTML, MarkdownToHtml} from 'educoder'
import TPMMDEditor from '../../../../modules/tpm/challengesnew/TPMMDEditor'

import axios from 'axios'

class simpleAnswer extends Component{
  constructor(props){
      super(props);
      this.mdRef = React.createRef();
      this.state={
        simpleValue:undefined
      }
  }
  onChange=(value)=>{
    this.setState({
      simpleValue:value
    })
  }
  onSimpleBlur=()=>{
    let {simpleValue}=this.state
    let question_id =this.props.questionType.question_id;
    let url=`/exercise_questions/${question_id}/exercise_answers.json`;
    axios.post((url),{
      answer_text:simpleValue
    }).then((result)=>{
      if(result.status==200){
        // this.setState({
        //   simpleValue:undefined
        // })
        let k= simpleAnswer == "" ? 0 :1;
        this.props.changeQuestionStatus && this.props.changeQuestionStatus(parseInt(this.props.questionType.q_position)-1,k);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  showAndHide=(flag)=>{
    this.props.changeA_flag && this.props.changeA_flag(this.props.index,flag);
  }

  render(){
    let { 
      questionType , 
      exercise,
      user_exercise_status,
    }=this.props
    let isAdmin=this.props.isAdmin();
    let isStudent =this.props.isStudent();
    return(
      <div className="pl30 pr30">
        <li className="with100">
          {
            user_exercise_status == 1 ? 
            // <div className="markdown-body answerStyle" dangerouslySetInnerHTML={{__html: markdownToHTML1(questionType.user_answer.length>0 ? questionType.user_answer[0]:"")}}></div>
            <MarkdownToHtml content={questionType.user_answer.length>0 ? questionType.user_answer[0]:""} selector={'simgle_' + (this.props.index + 1)}
              className="answerStyle"                       
            ></MarkdownToHtml>
            :
            <div>
              <TPMMDEditor ref={this.mdRef} initValue={questionType.user_answer.length > 0 ? questionType.user_answer[0]:''} mdID={'simpleEditor'+questionType.question_id}  placeholder="请输入你的答案"
              height={150} onChange={this.onChange} onCMBlur={this.onSimpleBlur}></TPMMDEditor>
            </div>
          }
        </li>
        {
          // 答案公开，且试卷已经截止
          isAdmin && 
          <div className="bor-top-greyE pt20 mt20">    
            {
              exercise.answer_status == 1 || questionType.a_flag ? 
              <div className="standardAnswer">
                <p className="mb10 font-16">参考答案：</p>
                {/* <li className="markdown-body answerStyle" dangerouslySetInnerHTML={{__html: markdownToHTML1(questionType.standard_answer && questionType.standard_answer[0])}}></li> */}
                <MarkdownToHtml content={questionType.standard_answer && questionType.standard_answer[0]} selector={'simgle_standard_' + (this.props.index + 1)}
                  className="answerStyle"                       
                ></MarkdownToHtml>
                <p className="mt15"><a className="color-blue font-16" onClick={()=>this.showAndHide(false)}>隐藏参考答案</a></p>
              </div>
              :
              <a className="color-blue font-16" onClick={()=>this.showAndHide(true)}>显示参考答案</a>
            }
          </div>
        }
        {
          isStudent && questionType.standard_answer ?
          <div className="bor-top-greyE pt20 mt20 standardAnswer">
            <p className="mb10 font-16">参考答案：</p>
            {/* <li className="markdown-body answerStyle" dangerouslySetInnerHTML={{__html: markdownToHTML1(questionType.standard_answer && questionType.standard_answer[0])}}></li> */}
            <MarkdownToHtml content={questionType.standard_answer && questionType.standard_answer[0]} selector={'simgle_standard2_' + (this.props.index + 1)}
              className="answerStyle"                       
            ></MarkdownToHtml>
          </div>:""
        }
      </div>
    )
  }
}
export default simpleAnswer