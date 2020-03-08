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
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

class MainEditor extends Component{
  constructor(props){
    super(props);
    /**
      choice_id: 32076
      choice_position: 1
      choice_text: "1"
      standard_boolean: true
     */
    const {standard_answer} = this.props;
    let _standard_answers = undefined;
    if (standard_answer) {
      _standard_answers = standard_answer

    }
    this.state = {
      standard_answers: _standard_answers || [''],
      question_title: this.props.question_title || '',
      question_type: this.props.question_type || 2,
      question_score: this.props.question_score || this.props.init_question_score,
    }
  }
  
  onSave = () => {
    const {question_title, question_score, question_type, question_choices, standard_answers } = this.state;
    const { question_id_to_insert_after, question_id } = this.props
    // TODO check
    const answerArray = standard_answers
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
    // if(!answerArray || answerArray.length == 0 || !answerArray[0]) {
    //   this.props.showNotification('请输入参考答案'); return;
    // }

    /**
        {
    "question_title":"社会主义核心价值观是？.",
    "question_type":4,
    "question_score":5,
    "standard_answers":["富强，民主，自由。。。"]
}
    }*/
    const Id = this.props.match.params.Id  
    if (question_id) {
      const editUrl = this.props.getEditQuestionUrl(question_id);
      axios.put(editUrl, {
        question_title,
        question_type: 4,
        question_score,
        // question_choices,
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
    } else {
      const url = this.props.getAddQuestionUrl();
      
      axios.post(url, {
        exercise_bank_id: Id,
        question_title,
        question_type: 4,
        question_score,
        // question_choices,
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
  on_question_score_change = (e) => {
    this.setState({ question_score: e })
  }
  
  render() {
    let { question_title, question_score, question_type, question_choices, standard_answers } = this.state;
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
              {/*!question_id ? '新建' : '编辑'*/}
                <span className="color-blue font-16 mr20 fl">{qNameArray[question_type]}</span>
                <span className="color-grey-9 font-12 fl">（主观题，未作答的情况下自动评为零分）</span>
            </p>

            <TPMMDEditor mdID={`question_${question_id}`} placeholder="请您输入题目" height={155} 
              initValue={question_title} onChange={(val) => this.setState({ question_title: val})}
              noStorage={true} ref="titleEditor"
            ></TPMMDEditor>
            
            <div>
                <div className="mb10 font-16">参考答案</div>
                <TPMMDEditor mdID={`question_answer_${question_id}`} placeholder="请输入参考答案(可选)" height={155} 
                    initValue={standard_answers[0] || ''} onChange={(val) => this.setState({ standard_answers: [val]})}
                    noStorage={true}
                ></TPMMDEditor>
                {/* <div style={{color: '#999999' }}>温馨提示：[简答题]参考答案仅作为人工评分的参考</div> */}
            </div>

            <div className="mt10">
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
export default (MainEditor);