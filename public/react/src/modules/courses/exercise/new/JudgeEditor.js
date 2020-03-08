import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import update from 'immutability-helper'
import { qNameArray } from './common'

import {getUrl, ActionBtn, DMDEditor} from 'educoder';

const RadioGroup = Radio.Group;

const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

class SingleEditor extends Component{
  constructor(props){
    super(props);
    /**
      choice_id: 32076
      choice_position: 1
      choice_text: "1"
      standard_boolean: true
     */
    const {question_choices} = this.props;
    let _standard_answers = undefined;
    let _question_choices = undefined;
    if (question_choices) {
      _standard_answers = []
      _question_choices = []

      question_choices.forEach((item, index) => {
        _standard_answers.push(item.standard_boolean)
        _question_choices.push(item.choice_text)
      })
    }
    this.state = {
      question_choices: _question_choices || ['对', '错'],
      standard_answers: _standard_answers || [false, true],
      question_title: this.props.question_title || '',
      question_type: this.props.question_type || 2,
      question_score: this.props.question_score || this.props.init_question_score,
    }
  }
  
  onSave = () => {
    const {question_title, question_score, question_type, question_choices, standard_answers } = this.state;
    const { question_id_to_insert_after, question_id } = this.props
    // TODO check
    const answerArray = standard_answers.map((item, index) => { return item == true ? index+1 : -1 }).filter(item => item != -1);
    if(!question_title) {
      this.refs['titleEditor'].showError()
      this.props.showNotification('题目：不能为空'); return;

    }
    const intScore = parseFloat(question_score)
    if (intScore == 0) {
      this.props.showNotification('分值：必须大于0'); return;
    } else if(!question_score || intScore == NaN) {
      this.props.showNotification('分值：不能为空'); return;
    } 
    if(!answerArray || answerArray.length == 0) {
      this.props.showNotification('必须设置标准答案'); return;
    }
    if(!question_title) {
      this.refs['titleEditor'].showError()
      this.props.showNotification('题目：不能为空'); return;

    }

    /**
        {
    "question_title":"现在在下雨",
    "question_type":2,
    "question_score":5,
    "question_choices":["正确","错误"],
    "standard_answers":[1]    
}
    }*/
    const Id = this.props.match.params.Id  
    if (question_id) {
      const editUrl = this.props.getEditQuestionUrl(question_id);
      axios.put(editUrl, {
        question_title,
        question_type: 2,
        question_score,
        question_choices,
        standard_answers: answerArray,
        insert_id: question_id_to_insert_after || undefined
      }).then((response) => {
          if (response.data.status == 0) {
            this.props.addSuccess()
          }else if(response.data.status == 3){
            // 已发布试卷编辑保存
            this.props.changeScore(question_id,answerArray);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const url = this.props.getAddQuestionUrl();
      
      axios.post(url, {
        exercise_bank_id: Id,
        question_title,
        question_type: 2,
        question_score,
        question_choices,
        standard_answers: answerArray,
        insert_id: question_id_to_insert_after || undefined
      })
        .then((response) => {
          if (response.data.status == 0) {
            this.props.addSuccess()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }  
  }
  onCancel = () => {
    this.props.onEditorCancel()
  }
  componentDidMount = () => {
    
  }
  onOptionClick = (e) => {
    const value = e.target.value;
    if (value) {
      this.setState({ standard_answers: [true, false] })
    } else {
      this.setState({ standard_answers: [false, true] })
    }

    // const { exerciseIsPublish } = this.props;
    // if (exerciseIsPublish) return;
    // let standard_answers = this.state.standard_answers.slice(0)
    // if (standard_answers[index]) return;
    // standard_answers[index] = !standard_answers[index]
    // if (index == 0) {
    //     standard_answers[1] = false
    // } else {
    //     standard_answers[0] = false
    // }
    // this.setState({ standard_answers })
  }
  on_question_score_change = (e) => {
    this.setState({ question_score: e })
  }
  
  render() {
    let { question_title, question_score, question_type, question_choices, standard_answers,  } = this.state;
    let { question_id, index, exerciseIsPublish,
    // question_title, 
    // question_type, 
    // question_score,
        isNew } = this.props;
    
    // const { getFieldDecorator } = this.props.form;
    
    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const isEdit = !!this.props.question_id
    const qNumber = `question_${index}`;
    
    // const answerTagArray = standard_answers.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
    return(
        <div className="padding20-30 bor-bottom-greyE" id={qNumber}>
            <style>{`
              .optionMdEditor {
                flex: 0 0 800px
              }
              .optionRow {
                margin: 2px;
              }
            `}</style>
            <p className="mb10 clearfix">
            {/* {!question_id ? '新建' : '编辑'} */}
              <span className="color-blue font-16 mr20 fl">{qNameArray[question_type]}</span>
              <span className="color-grey-9 font-12 fl">（客观题，由系统自动评分，请设置标准答案）</span>
            </p>

            <TPMMDEditor mdID={`question_${question_id}`} placeholder="请您输入题目" height={155} 
              initValue={question_title} onChange={(val) => this.setState({ question_title: val})}
              ref="titleEditor"
            ></TPMMDEditor>
            
            <div>
            <RadioGroup onChange={this.onOptionClick} value={standard_answers[0]}>
              {/* disabled={exerciseIsPublish} */}
              <Radio value={true} >正确</Radio>
              <Radio value={false} >错误</Radio>
            </RadioGroup>
            {/* not work */}
            {/* <Radio value={standard_answers[0]} onClick={() => this.onOptionClick(0)} disabled={exerciseIsPublish}>对</Radio>
            <Radio value={standard_answers[1]} onClick={() => this.onOptionClick(1)} disabled={exerciseIsPublish}>错</Radio> */}
            

              {/* <span class={`judge-item option-item  mr10 color-grey select-choice ${standard_answers[0] ? 
                  'check-option-bg' : ''} `}
                  name="option_span" onClick={() => this.onOptionClick(0)}>正确
              </span>
              <span class={`judge-item option-item  mr10 color-grey select-choice ${standard_answers[1] ? 
                  'check-option-bg' : ''} `}
                  name="option_span" onClick={() => this.onOptionClick(1)}>错误
              </span> */}
              {!exerciseIsPublish && <span style={{color: '#FF6800'}}>温馨提示：点击选项，可以直接设置标准答案</span>}

            </div>

            <div>
              分值：
              <InputNumber step={0.1} precision={1} min={0} max={100} style={{width: 100}} value={question_score} onChange={this.on_question_score_change}
                  disabled={exerciseIsPublish}
              ></InputNumber> 分
              
              <span className="fr">
                <ActionBtn style="greyBack" className="middle mr20" onClick={this.onCancel}
                >取消</ActionBtn>
                <ActionBtn style="blue" className="middle" onClick={this.onSave}>保存</ActionBtn>
              </span>
              
            </div>
            
        </div>
      )
    }
}
// RouteHOC()
export default (SingleEditor);