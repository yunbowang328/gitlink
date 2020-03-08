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
import NullMDEditor from './NullMDEditor'
import NullChildEditor from './NullChildEditor'
import {getUrl, ActionBtn, DMDEditor} from 'educoder';
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

class NullEditor extends Component{
  constructor(props){
    super(props);
    /**
      choice_id: 32076
      choice_position: 1
      choice_text: "1"
      standard_boolean: true
      standard_answer: [{choice_id: 1, answer_text: ["2", "22"]}]

     */
    const {question_choices, standard_answer} = this.props;
    let _standard_answers = undefined;
    if (standard_answer) {
      _standard_answers = []

      standard_answer.forEach((answers, index) => {
        _standard_answers.push([])
        answers.answer_text.forEach((item, itemIndex) => {
          _standard_answers[index].push(item)
        })
        
      })
    }
    this.state = {
      standard_answers: _standard_answers || [],
      question_title: this.props.question_title || '',
      question_type: this.props.question_type || 3,
      question_score: this.props.question_score || this.props.init_question_score,
      is_ordered: !!this.props.is_ordered,
    }
  }
  on_is_ordered_change = (e) => {
    this.setState({ is_ordered: e.target.checked})

  }
  
  onSave = () => {
    const {question_title, question_score, question_type, question_choices, standard_answers, is_ordered } = this.state;
    const { question_id_to_insert_after, question_id } = this.props

    let newis_ordered= is_ordered;

    if(newis_ordered===true){
      if(standard_answers.length===1){
        newis_ordered=false
      }
    }
    // TODO check
    // const answerArray = standard_answers.map((item, index) => { return item == true ? index+1 : -1 }).filter(item => item != -1);
    let answerArray = []
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
    

    let isEmpty = false;
    standard_answers.forEach((answers, index) => {
      answerArray.push({
        "choice_id": index + 1,
        "answer_text":[]
      })
      answers.forEach((item, itemIndex) => {
        answerArray[index].answer_text.push(item)
        if(!item) {
          this.refs[`nullChildEditor${index}`].showError(itemIndex)
          // this.props.showNotification(`请先输入第${index+1}个填空的第${itemIndex+1}参考答案。`); 
          this.props.showNotification(`答案：不能为空`); 
          isEmpty = true;
        }
      })
    })
    if (isEmpty  == true) {
      return;
    }
    if(!question_title) {
      this.refs['titleEditor'].showError()
      this.props.showNotification('题目：不能为空'); return;

    }

    /**
        {
    "question_title":"社会主义核心价值观(),(),()...",
    "question_type":3,
    "question_score":5,
    "standard_answers":[
        {"choice_id":1,
        "answer_text":["abbc","xxx","sssss"]
        },
        {"choice_id":2,
        "answer_text":["abbc","xxx","sssss"]
        }
    ]
    "is_ordered":true
}
    }*/
    const Id = this.props.match.params.Id  
    if (question_id) {
      const editUrl = this.props.getEditQuestionUrl(question_id);
      axios.put(editUrl, {
        question_title,
        question_type: 3,
        question_score,
        question_choices,
        standard_answers: answerArray,
        insert_id: question_id_to_insert_after || undefined,
        is_ordered:newis_ordered,
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
        question_type: 3,
        question_score,
        question_choices,
        standard_answers: answerArray,
        insert_id: question_id_to_insert_after || undefined,
        is_ordered:newis_ordered,
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


  // placeholderCountInRange 被删除的个数
  onPlaceholderChange = (placeholderCountBefore, placeholderCountInRange, totalPlaceholderCount) => {
    const { standard_answers } = this.state;
    const new_standard_answers = standard_answers.slice()
    if (placeholderCountInRange) {
      new_standard_answers.splice(placeholderCountBefore, placeholderCountInRange)
    }
    if (totalPlaceholderCount) {
      for(let i = 0; i < totalPlaceholderCount; i++) {
        new_standard_answers.splice(placeholderCountBefore + i, 0, [""])
      }
    }
    this.setState({ standard_answers: new_standard_answers }, () => {
      if (this.mdReactObject) {
        this.mdReactObject.toShowMode()
      }
    })
    
  }
  
  onAnswerChange = (index, itemIndex, val) => {
    if (this.state.standard_answers[index]) {
    this.setState(
        (prevState) => ({ 
          standard_answers : update(prevState.standard_answers
            , {[index]: {$splice: [[itemIndex, 1, val]]}}),
        })
      )
    }
  }
  addChildAnswer = (index) => {
    this.setState(
        (prevState) => ({
          standard_answers : update(prevState.standard_answers
            , {[index]: {$push: ['']}}),
        })
      )
  }

  deleteChildAnswer = (index, childIndex) => {
    if(!this.state.standard_answers[index][childIndex]) {
      this.setState(
        (prevState) => ({
          standard_answers : update(prevState.standard_answers,
            {[index]:
                {$splice: [[childIndex, 1]]}
            }
          )
        })
      )
      return;
    }
    this.props.confirm({
      content: `确认要删除这个参考答案吗？`,
      onOk: () => {
        this.setState(
          (prevState) => ({
            standard_answers : update(prevState.standard_answers,
              {[index]:
                  {$splice: [[childIndex, 1]]}
              }
            )
          })
        )

      }
    })

  }

  toMDMode = (that) => {
    if (this.mdReactObject) {
      let mdReactObject = this.mdReactObject;
      this.mdReactObject = null
      if (that != mdReactObject) {
        mdReactObject.toShowMode()
      }
    }
    this.mdReactObject = that;
  }
  
  render() {
    let { question_title, question_score, question_type, question_choices, standard_answers
      , is_ordered } = this.state;
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

    // console.log(this.state.showtype)
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
              .editorWrapDiv .content_editorMd_show {
                background: #EAEAEA;
                margin-bottom: 6px;
                width: 97%;
                display: inline-block;
              }
              .content_editorMd_show {
                display: flex;
                maxWidth: 1000px;
              }
            `}</style>
            <p className="mb10 clearfix">{/*!question_id ? '新建' : '编辑'*/}
                <span className="color-blue font-16 mr20 fl">{qNameArray[question_type]}</span>
                <span className="color-grey-9 font-12 fl">（客观题，由系统自动评分，允许手动调分，请设置标准答案 ；支持最多5个空，每空得分按照本题的总分平均计算）</span>
            </p>

            <NullMDEditor {...this.props} mdID={`question_${question_id}`} placeholder="请您输入题目" height={155} 
              initValue={question_title} onChange={(val) => this.setState({ question_title: val})}
              onPlaceholderChange={this.onPlaceholderChange} showNullButton={exerciseIsPublish ? false : true}
              ref="titleEditor"
            ></NullMDEditor>
            
            <div className="clearfix">
              {
                standard_answers.map((answers, index) => {

                  return <NullChildEditor 
                    ref={`nullChildEditor${index}`}
                    {...this.props}
                    toMDMode={this.toMDMode}
                    answers={answers}
                    index={index}
                    onAnswerChange={this.onAnswerChange}
                    addChildAnswer={this.addChildAnswer}
                    deleteChildAnswer={this.deleteChildAnswer}
                  ></NullChildEditor>
                  // answer.map((item, itemIndex) => {
                  //   return <DMDEditor
                  //     toMDMode={this.toMDMode} noStorage={true}
                  //     mdID={`answer_${index}${itemIndex}`} placeholder="请您输入题目" height={155} watch={false}
                  //     initValue={item} onChange={(val) => this.onAnswerChange(index, itemIndex, val)}
                  //   ></DMDEditor>
                  // })
                })
              }
              
            </div>

            <div className="clearfix ">
              {standard_answers.length>1?
                <span>
                  <Checkbox checked={is_ordered} onChange={this.on_is_ordered_change} className="color-grey-3">多个填空的答案有顺序要求</Checkbox>
                  <span className="color-grey-9 font-12">（选中，每个填空的答案顺序必须与参考答案一致）</span></span>
                :""}
            </div>
            <div className="clearfix mt20">
              分值：
              <InputNumber step={0.1} precision={1} min={0} max={100} style={{width: 100}} value={question_score} onChange={this.on_question_score_change}
                disabled={exerciseIsPublish} placeholder="请填写分数"
              ></InputNumber > 分
              
              
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
export default (NullEditor);