import React,{ Component } from "react";
import {Checkbox,Radio, Input} from "antd";
import {DMDEditor,markdownToHTML, MarkdownToHtml } from 'educoder'

import axios from 'axios'

const tagArray = [
  // 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  // 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  // 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
class fillEmpty extends Component{
  constructor(props){
      super(props);
      this.mdRef = React.createRef()
      let { questionType }=this.props;
      let array=[];
      for(var i=0;i < questionType.multi_count; i++){
        let item="";
        if(questionType.user_answer.length>0){
          if(questionType.user_answer[i]){
            item=questionType.user_answer[i].answer_text;
          }
        }
        array.push({
          value:item,
          q_id:questionType.question_number
        })
      }

      this.state={
        array
      }
  }


  toMDMode = (that) => {
    // if ( this.mdReactObject) {
    //   let mdReactObject = this.mdReactObject;
    //   this.mdReactObject = null
    //   mdReactObject.toShowMode()
    // }
    this.mdReactObject = that;
  }

  onOptionContentChange = (value, index) => {
    let array  = this.state.array.slice(0);    
    array[index].value = value;
    this.setState({ array })
  }

  onBlurEmpty=(index,number)=>{
    let array  = this.state.array.slice(0);    
    let v=array[index].value;
    let question_id=this.props.questionType.question_id;
    let  url=`/exercise_questions/${question_id}/exercise_answers.json`
    axios.post((url),{
      exercise_choice_id:parseInt(index)+1,
      answer_text:v
    }).then((result)=>{
      if(result.status==200){
        //this.refs[`md${number}${index}`].toShowMode();
        let count=0;
        for(var i=0;i<array.length;i++){
          if(array[i].value ==""){ count++; }
        }
        let k = count==array.length ? 0 : 1;
        this.props.changeQuestionStatus && this.props.changeQuestionStatus(parseInt(this.props.questionType.q_position)-1,k);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  render(){
    let { 
      questionType , 
      exercise ,
      user_exercise_status,
    }=this.props
    let {
      array
    }=this.state
    let isAdmin = this.props.isAdmin();
    let isStudent = this.props.isStudent();
    return(
      <div className="pl30 pr30">
        <style>{`
          .emptyPanel div#content_editorMd_show{
            width: 100%;
            border-radius: 4px;
            height: 35px;
            margin-top:0px;
            background-color:#fafafa;
            color:#999;
            line-height:25px;
          }
          .answerStyle{
            background:#f5f5f5;
            border-radius:4px;
            border: 1px solid #eaeaea;
            padding:5px;
            min-height:35px;
            box-sizing:border-box;
          }
        `}</style>
        {
          array.map((item,key)=>{
            return(
              <li className="df mb10 emptyPanel">
                <span className="mr10 lineh-35 font-16">答案（填空{key+1}）:</span>
                <div className="flex1" style={{width:"0"}}>
                {
                  user_exercise_status == 1 ? 
                  <input value={item.value} className="input-100-35" style={{backgroundColor: "#F5F5F5",cursor:"default"}} placeholder={ isStudent && item.value ? `请输入填空${key+1}的答案` : "" } readOnly/>
                  :
                  <DMDEditor 
                    ref={`md${questionType.q_position}${key}`}
                    toMDMode={this.toMDMode} toShowMode={this.toShowMode}
                    height={150} className={'optionMdEditor'} watch={false} noStorage={true}
                    mdID={questionType.question_id +"_"+ key} placeholder={`输入填空${key+1}的答案`} onChange={(value) => this.onOptionContentChange(value, key)}
                    initValue={item.value} onCMBlur={()=>this.onBlurEmpty(key,questionType.q_position)}
                  ></DMDEditor>
                }
                </div>
              </li>
            )
          })
        }
        {
          // 答案公开，且试卷已经截止
          questionType.standard_answer && 
          <div>
            <p className="bor-top-greyE pt20 mt20 font-16 mb10">参考答案：</p>
            { questionType.standard_answer && questionType.standard_answer.map((item,k)=>{
                return(
                  <ul className="df font-16">
                    <span className="mr10">答案（填空{k+1}）:</span>
                    <li className="flex1">
                      {
                        item.answer_text && item.answer_text.map((i,index)=>{
                          return(
                            <MarkdownToHtml content={i} selector={'empty_' + (this.props.index + 1) +(k + 1) + (index + 1)}
                              className="standardAnswer answerStyle mb10"                                
                            ></MarkdownToHtml>
                            // <div className="standardAnswer markdown-body answerStyle mb10" dangerouslySetInnerHTML={{__html: markdownToHTML1(i)}}></div>
                          )
                        })
                      }
                    </li>
                  </ul>
                )
              })
            }
          </div>
        }
        
      </div>
    )
  }
}
export default fillEmpty