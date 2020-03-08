import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'
import QestionDisplayHeader from './QestionDisplayHeader'
import {getUrl, ActionBtn, markdownToHTML, MarkdownToHtml} from 'educoder';
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

const tagArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
const qNameArray = [
    '单选题',
    '多选题',
    '判断题',
    '填空题',
    '简答题',
    '实训题',
]
class SingleDisplay extends Component{
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
        question_id, question_number, index, displayCount, showActionButton
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

    const isPreviewPage = showActionButton == false

    return(
        <div className="bor-bottom-greyE padding20-30 singleDisplay" id={qNumber} _id={question_id}>
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
            <div className="options">
                { question_choices.map((item, optionIndex) => {
                  let prefix = undefined
                  // if (!isPreviewPage) {
                    prefix = `${tagArray[optionIndex]}.`
                  // }
                  if (question_type == 0) { // 单选
                    return (
                        <div className="mb10 clearfix " style={{
													display: "flex",
													flexDirection:"row",
												}} key={optionIndex}>
                            <Radio disabled className="fl lineh-25 w50" checked={item.standard_boolean}>{prefix}</Radio>
                            <MarkdownToHtml content={item.choice_text} selector={'single_' + (index + 1) + '' + (optionIndex + 1)} style={{ float: 'left', display: 'inline-block' }}

                            ></MarkdownToHtml>
                            {/* <span style={{ display: 'inline-block'}} className="markdown-body fl"
                                    dangerouslySetInnerHTML={{__html:  markdownToHTML1(item.choice_text)}}></span> */}
                        </div>)
                  } else {

                    return (
                        <div className="mb10 clearfix" style={{
													display: "flex",
													flexDirection:"row",
												}} key={optionIndex}>
                            <Checkbox  disabled className="fl lineh-25  w50" checked={item.standard_boolean}>{prefix}</Checkbox>
                            <MarkdownToHtml content={item.choice_text} selector={'single_' + (index + 1)+ '' + (optionIndex + 1)} style={{ float: 'left', display: 'inline-block' }}

                            ></MarkdownToHtml>
                            {/* <span style={{ display: 'inline-block'}} className="markdown-body fl"
                                    dangerouslySetInnerHTML={{__html:  markdownToHTML1(item.choice_text)}}></span> */}
                        </div>)
                  }
                })}

            </div>
        </div>
      )
    }
}
// RouteHOC()
export default (SingleDisplay);
