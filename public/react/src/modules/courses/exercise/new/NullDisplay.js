import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'
import { qNameArray } from './common'
import {getUrl, ActionBtn, markdownToHTML, MarkdownToHtml} from 'educoder';
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

class NullDisplay extends Component{
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
        question_id, question_number, index, displayCount,
        multi_count
     } = this.props;
    
    // const { getFieldDecorator } = this.props.form;

    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const isEdit = this.isEdit
    const qNumber = `question_${index}`;
    /**
    is_ordered: true
    multi_count: 3
    question_id: 10444
    question_number: 6
    question_score: 2
    question_title: "_2323_↵↵_"
    question_type: 3
    standard_answer: [{choice_id: 1, answer_text: ["2", "22"]}]
     */
    let length = 5;
    const qName = qNameArray[question_type]
    return(
        <div className="bor-bottom-greyE padding20-30" id={qNumber} _id={question_id}>
            <style>{`
                .answers {
                    flex: 1;
                    display: inline-block;
                }
                .answers .answer {
                    background: #EDEDED;
                    color: #C5C5C5;
                    
                    display: inline-block;
                    line-height: 16px;
                    padding:12px 10px;
                    margin-bottom:10px;
                    border-radius:2px;
                    width: 1024px;
                    word-break: break-all;
                }
                .answerRow { 
                    padding: 1px 0;
                }
                .answers .markdown-body > p{
                    line-height:20px;
                }
            `}</style>

            <QestionDisplayHeader {...this.props}></QestionDisplayHeader>
            {/* <span>答案（填空{index+1}）：</span>
                        <div className="answers">
                            { answers.map((item, itemIndex) => {
                                return <span className="answer" key={itemIndex}>{item}</span>
                            })}
                        </div> */}
            <div className="options">
                { 
                    standard_answer.map((answers, _index) => {
                        return <div className="df answerRow" key={_index}>
                            <span className="lineh-40">答案（填空{_index+1}）：</span>
                            <div className="answers">
                                { answers.answer_text.map((item, itemIndex) => {
                                    return <MarkdownToHtml 
                                        className="answer" key={itemIndex}
                                        content={item} selector={'null_' + (index + 1) + (_index + 1) + (itemIndex + 1)}     
                                    ></MarkdownToHtml>
                                })}
                                {/* <span className="answer" key={itemIndex}>{item}</span> */}
                            </div>
                        </div>
                    })
                }
                
                
            </div>
        </div>
      )
    }
}
// RouteHOC()
export default (NullDisplay);