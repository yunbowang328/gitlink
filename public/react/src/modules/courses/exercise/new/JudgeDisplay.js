import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'
import { qNameArray } from './common'
import {getUrl, ActionBtn, markdownToHTML, MarkdownToHtml } from 'educoder';
import QestionDisplayHeader from './QestionDisplayHeader'
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

const tagArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

class JudgeDisplay extends Component{
  constructor(props){
    super(props);


    this.state = {
      question_choices: ['', '', '', ''],
      standard_answers: [false, false, false, false]
    }
  }
  componentDidMount = () => {
    const Id = this.props.match.params.Id    
    this.isEdit = !!Id
    if (Id) {
      const url = `/exercises/${Id}/edit.json`
    //   axios.get(url)
    //     .then((response) => {
    //       if (response.data.status == 0) {

    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    }
  }
  render() {
    let { question_title, question_score, question_type, question_choices, standard_answer,
        question_id, question_number, index, displayCount
     } = this.props;
    
    // const { getFieldDecorator } = this.props.form;

    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const isEdit = this.isEdit
    const qNumber = `question_${index}`;
    // TODO show模式  isNew为false isEdit为false

    // [true, false, true] -> [0, 2] 
    
    // const answerTagArray = standard_answer.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
    let length = 5;
    const qName = qNameArray[question_type]
    return(
        <div className="bor-bottom-greyE padding20-30" id={qNumber} _id={question_id}>
            <style>{`
              .optionMdEditor {
                flex: 0 0 800px
              }
              .optionRow {
                margin: 2px;
              }
              .actionBtns {
                  height: 28px
              }
              
            `}</style>

            <QestionDisplayHeader {...this.props}></QestionDisplayHeader>
            {/* 单选 or 多选 */}
            <div className="options clearfix">
                { question_choices.map((item, optionIndex) => {
                     // 单选
                    return (
                        <div key={optionIndex} className="fl mr30 df">
                            <Radio disabled className="lineh-25" checked={item.standard_boolean}></Radio>
                            {/* <span>{item.choice_text}</span> */}
                            <MarkdownToHtml content={item.choice_text} selector={'judge_' + (index + 1) + optionIndex} 
                                className=""
                            ></MarkdownToHtml>
                            {/* <span style={{ display: 'inline-block'}} className="markdown-body"
                                    dangerouslySetInnerHTML={{__html: markdownToHTML1(item.choice_text)}}></span> */}
                        </div>)
                  
                })}
                
            </div>
        </div>
      )
    }
}
// RouteHOC()
export default (JudgeDisplay);