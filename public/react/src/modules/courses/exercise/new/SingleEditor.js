import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import update from 'immutability-helper'
import {getUrl, ActionBtn, DMDEditor, ConditionToolTip} from 'educoder';
import QuillForEditor from "../../../../common/quillForEditor";

const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

const tagArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
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
      question_choices: _question_choices || ['', '', '', ''],
      standard_answers: _standard_answers || [false, false, false, false],
      question_title: this.props.question_title || '',
      question_type: this.props.question_type || 0,
      question_score: this.props.question_score || this.props.init_question_score,
      choice_editor: 'md',
      quill_question_title: '',
      quill_default_title: ''
    }
  }
  addOption = () => {
    const { question_choices, standard_answers } = this.state;
    question_choices.push('')
    standard_answers.push(false)
    this.setState({ question_choices, standard_answers })
  }
  deleteOption = (index) => {
    let {question_choices}=this.state;
    if(question_choices[index]===""){
      // repeat code
      this.toMDMode(null)
      this.setState(
        (prevState) => ({
          question_choices : update(prevState.question_choices, {$splice: [[index, 1]]}),
          standard_answers : update(prevState.standard_answers, {$splice: [[index, 1]]})
        })
      )
    }else{
      this.props.confirm({
        content: `确认要删除这个选项吗？`,
        onOk: () => {
          this.toMDMode(null)
          this.setState(
            (prevState) => ({
              question_choices : update(prevState.question_choices, {$splice: [[index, 1]]}),
              standard_answers : update(prevState.standard_answers, {$splice: [[index, 1]]})
            })
          )
        }
      })
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
      this.props.showNotification('请先点击选择本选择题的正确选项'); return;
    }
    if(!question_title) {
      this.refs['titleEditor'].showError()
      this.props.showNotification('题目：不能为空'); return;
    }

    for(let i = 0; i < question_choices.length; i++) {
      if (!question_choices[i]) {
        this.refs[`optionEditor${i}`].showError()
        this.props.showNotification(`请先输入 ${tagArray[i]} 选项的内容`); return;
      }
    }
    /**
        {
        "question_title":"同学朋友间常用的沟通工具是什么？",
        "question_type":1,
        "question_score":5,
        "question_choices":["a答案","b答案","c答案","d答案"],
        "standard_answers":[1]
    }*/
    const Id = this.props.match.params.Id
    if (question_id) {
      const editUrl = this.props.getEditQuestionUrl(question_id);
      axios.put(editUrl, {
        question_title,
        question_type: answerArray.length > 1 ? 1 : 0,
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
        question_type: answerArray.length > 1 ? 1 : 0,
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
  onOptionClick = (index) => {
    // if (this.props.exerciseIsPublish) {
    //   return;
    // }
    let standard_answers = this.state.standard_answers.slice(0)
    standard_answers[index] = !standard_answers[index]
    this.setState({ standard_answers })
  }
  onOptionContentChange = (value, index) => {
    if (index >= this.state.question_choices.length) {
      // TODO 新建，然后删除CD选项，再输入题干，会调用到这里，且index是3
      return;
    }
    let question_choices = this.state.question_choices.slice(0);
    question_choices[index] = value;
    this.setState({ question_choices })
  }
  on_question_score_change = (e) => {
    this.setState({ question_score: e })
  }
  toMDMode = (that) => {
    if (this.mdReactObject) {
      let mdReactObject = this.mdReactObject;
      this.mdReactObject = null
      mdReactObject.toShowMode()
    }
    this.mdReactObject = that;

  }
  toShowMode = () => {

  }

  // 切换编辑器
  handleChangeEditor = (e) => {
    const {quill_question_title} = this.state;
    const value = e.target.value
    if (value === 'quill') {
      const _val = quill_question_title ? JSON.parse(quill_question_title) : '';
      this.setState({
        quill_default_title: _val
      })
    }
    this.setState({
      choice_editor: value
    });
  }

  // quill编辑器内容变化时调用此接口
  handleCtxChange = (ctx) => {
    console.log('编辑器内容', ctx);
    // 保存编辑器内容
    this.setState({
      quill_question_title: JSON.stringify(ctx)
    });
  }

  render() {
    let { question_title, question_score, question_type, question_choices, standard_answers, choice_editor, quill_default_title } = this.state;
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
    // TODO show模式  isNew为false isEdit为false

    // [true, false, true] -> [0, 2]

    const answerTagArray = standard_answers.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
		console.log("xuanzheshijuan");
		console.log(answerTagArray);
		console.log(!exerciseIsPublish);

    return(
        <div className="padding20-30 bor-bottom-greyE signleEditor" id={qNumber}>
            <style>{`
              .optionMdEditor {
                flex:1
              }
              .optionRow {
                margin:0px!important;
                /* margin-bottom: 20px!important; */
              }
              .signleEditor .content_editorMd_show{
                display: flex;
                margin-top:0px!important;
                border-radius:2px;
                max-width: 1056px;
                word-break:break-all;
              }
              .editor_area{
                display: inline-block;
                float: right;
                // line-height: 30px;
                // height: 30px;
              }
              .editor_txt{
                margin-right: 10px;
                font-size: 12px;
                color: #999;
              }
              .radio_style{
                display: inline-block;
                vertical: center;
              }
            `}</style>
            <p className="mb10 clearfix">
              {/* {!question_id ? '新建' : '编辑'} */}
                <span className="color-blue font-16 mr20 fl">选择题</span>
                <span className="color-grey-9 font-12 fl">（客观题，由系统自动评分，请设置标准答案）</span>
                {/* <Switch checkedChildren="MD" unCheckedChildren="Quill"></Switch> */}
                {/* <div className="editor_area">
                  <span className="editor_txt">切换编辑器:</span>
                  <Radio.Group style={{ float: 'right' }} value={choice_editor} onChange={this.handleChangeEditor}>
                    <Radio className="radio_style" value={'md'}>MD</Radio>
                    <Radio className="radio_style" value={'quill'}>Quill</Radio>
                  </Radio.Group>
                </div> */}
            </p>

            {choice_editor === 'md'
              ? <TPMMDEditor mdID={qNumber} placeholder="请您输入题目" height={155} className="mb20"
                  initValue={question_title} onChange={(val) => this.setState({ question_title: val})}
                  ref="titleEditor"
                ></TPMMDEditor>

              : <QuillForEditor
                  wrapStyle={{ marginBottom: '35px' }}
                  style={{ height: '109px' }}
                  options={['code', 'image', 'formula']}
                  placeholder="请您输入题目"
                  value={quill_default_title}
                  onContentChange={this.handleCtxChange}
                ></QuillForEditor>
            }

          {question_choices.map( (item, index) => {
              const bg = standard_answers[index] ? 'check-option-bg' : ''
              return <div className="df optionRow " >
              {/* 点击设置答案 */}
                {/* TODO 加了tooltip后，会丢失掉span的class */}
                {/* <Tooltip title={standard_answers[index] ? '点击取消标准答案设置' : '点击设置为标准答案'}> */}
                  <span class={`option-item fr mr10 color-grey select-choice ${bg} `}
                      name="option_span" onClick={() => this.onOptionClick(index)} style={{flex: '0 0 38px'}}>
                      <ConditionToolTip title={standard_answers[index] ? '点击取消标准答案设置' : '点击设置为标准答案'} placement="left" condition={true}>
                        <div style={{width: '100%', height: '100%'}}>{tagArray[index]}</div>
                      </ConditionToolTip>
                  </span>
                {/* </Tooltip> */}
                <div style={{ flex: '0 0 1038px'}}>
                  <DMDEditor
                  ref={`optionEditor${index}`}
                  toMDMode={this.toMDMode} toShowMode={this.toShowMode}
                  height={166} className={'optionMdEditor'} noStorage={true}
                  mdID={qNumber + index} placeholder="" onChange={(value) => this.onOptionContentChange(value, index)}
                  initValue={item}
                ></DMDEditor>
                </div>
                {exerciseIsPublish || index===0?
									<i className=" font-18  ml15 mr20"></i>
									:<Tooltip title="删除">
                  <i className="iconfont icon-htmal5icon19 font-18 color-grey-c ml15" onClick={() => this.deleteOption(index)}></i>
                </Tooltip> }
                { !exerciseIsPublish && <Tooltip title={`新增参考答案`}>
                      <i className="color-green font-16 iconfont icon-roundaddfill ml6"
                        onClick={() => this.addOption()}
                        style={{float: 'right', visibility: index == question_choices.length - 1 ? '' : 'hidden', marginTop: '2px'}}
                      ></i>
                  </Tooltip>}

              </div>
            }) }

            <div className="mb20">
              <span
								style={{color: '#FF6800'}}>{'温馨提示：点击选项输入框可设置答案；选中的选项即为正确答案，选择多个答案即为多选题'}</span>
              { answerTagArray && !!answerTagArray.length ?
								<React.Fragment>
									<span className="fr color-orange">{answerTagArray.join(' ')}</span>
									<span className="fr">标准答案：</span>
								</React.Fragment>
                :
								""
              }
            </div>

            <div>
              分值：
              <InputNumber step={0.1} precision={1} min={0} max={100} style={{width: 100}} value={question_score} onChange={this.on_question_score_change}
                disabled={exerciseIsPublish}
              ></InputNumber>&nbsp;分

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
