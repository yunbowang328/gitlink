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

class MainDisplay extends Component{
  constructor(props){
    super(props);


    this.state = {
    }
  }
  componentDidMount = () => {
  }
  render() {
    let { question_title, question_score, question_type, standard_answer,
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
            
            { standard_answer[0] && 
            <React.Fragment>
              <div style={{color: '#05101A'}} className="font-16 mb5 font-bd">参考答案：</div>
              
              <MarkdownToHtml content={standard_answer[0]} selector={'answer_' + qNumber} 
                  className=""
              ></MarkdownToHtml>
              {/* <div className="mainQuestionDisplay markdown-body" 
                  dangerouslySetInnerHTML={{__html: markdownToHTML1(standard_answer[0])}}
              >
              </div> */}
            </React.Fragment>            
            }

        </div>
      )
    }
}
// RouteHOC()
export default (MainDisplay);