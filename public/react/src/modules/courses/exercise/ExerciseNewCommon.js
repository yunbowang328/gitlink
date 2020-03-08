import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import  { Q_TYPE_SINGLE, Q_TYPE_MULTI, Q_TYPE_JUDGE, Q_TYPE_NULL, Q_TYPE_MAIN, Q_TYPE_SHIXUN } from './new/common'
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
// import './board.css'
import "../common/formCommon.css"

// import { RouteHOC } from './common.js'
import CBreadcrumb from '../common/CBreadcrumb'
import {getUrl, ActionBtn} from 'educoder';

import SingleEditor from './new/SingleEditor'
import SingleDisplay from './new/SingleDisplay'
import JudgeEditor from './new/JudgeEditor'
import JudgeDisplay from './new/JudgeDisplay'
import NullEditor from './new/NullEditor'
import NullDisplay from './new/NullDisplay'
import MainEditor from './new/MainEditor'
import MainDisplay from './new/MainDisplay'
import ShixunEditor from './new/ShixunEditor'
import ShixunDisplay from './new/ShixunDisplay'

import ShixunChooseModal from '../coursesPublic/ShixunChooseModal'
import update from 'immutability-helper'
import './new/common.css'
import '../css/Courses.css'
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;
const TITLE_MAX_LENGTH = 60;
class ExerciseNewCommon extends Component{
  constructor(props){
    super(props);


    this.state = {
      exercise_questions: [],
      exercise_name: '',
      exercise_description: '',
      exercise_types: {},
      editMode: !this.props.match.params.Id,
    }
  }

  // 已发布试卷编辑保存的确认弹框
  changeScore = (question_id,answerArray) =>{
    this.props.confirm({
      content:'修改了标准答案',
      subContent:"是否重新计算学生答题的成绩？",
      onOk:()=>{
        this.sureChangeScore(question_id,answerArray)
      },
      onCancel:()=>{
        this.addSuccess();
      }
    })
  }

  // 已发布试卷修改答案确认修改分数
  sureChangeScore = (question_id,answerArray) =>{
    let url=`/exercise_questions/${question_id}/update_scores.json`
    axios.post((url),{
      standard_answers:answerArray
    }).then((result)=>{
      if(result){
        this.props.showNotification(`${result.data.message}`);
        this.addSuccess();
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  fetchExercise = () => {
    const Id = this.props.match.params.Id    
    this.isEdit = this.props.isEdit || !!Id
    if (this.isEdit) {
      const url = this.props.exercise_url ? `/${this.props.exercise_url }/${Id}.json` : `/exercises/${Id}/edit.json`
      axios.get(url)
        .then((response) => {
          if (response.data.exercise) {
            const { exercise, ...others } = response.data
            exercise.exercise_name = exercise.exercise_name || exercise.name
            exercise.exercise_description = exercise.exercise_description || exercise.description
            this.setState({
              ...exercise,
              ...others,
              editMode: false
            })
            this.props.initData && this.props.initData(response.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const courseId=this.props.match.params.coursesId;

      const newUrl = `/courses/${courseId}/exercises/new.json`
      axios.get(newUrl)
        .then((response) => {
          if (response.data.status == 0) {
            this.setState({
              ...response.data
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  componentDidMount = () => {
    this.fetchExercise()
  }
  // handleSubmit = (e) => {
  //
  // }
  onSaveExercise = () => {
    const { exercise_name, exercise_description } = this.state;
    const exercise_id = this.props.match.params.Id
    const courseId = this.props.match.params.coursesId
    if (this.isEdit) {
      // /exercise_banks/:id.json
      const editUrl = `/${this.props.exercise_url ? this.props.exercise_url : 'exercises'}/${exercise_id}.json`
      axios.put(editUrl, {
        exercise_name,
        exercise_description
      })
        .then((response) => {
          if (response.data.status == 0) {
            this.setState({editMode: false})
            this.props.showNotification('试卷编辑成功')
          }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
      const url = `/courses/${courseId}/exercises.json`
      axios.post(url, {
          exercise_name,
          exercise_description
      })
        .then((response) => {
          if (response.data.status == 0) {
              this.setState({editMode: false})

              this.props.showNotification('试卷新建成功')
              const exercise_id = response.data.data.exercise_id;
              this.isEdit = true;

	            this.props.history.replace(`/courses/${courseId}/exercises/${exercise_id}/edit`);

          }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
  exercise_name_change = (e) => {
      this.setState({exercise_name: e.target.value})
  }
  exercise_description_change = (e) => {
      this.setState({exercise_description: e.target.value})
  }
  // #问题的类型，0为单选题，1为多选题，2为判断题，3为填空题，4为主观题，5为实训题
  _checkIsEditing = () => {
    if (this.editingId && $(this.editingId).length ) {
      this.props.showNotification('请先保存或取消当前正在编辑的问题。')
       $("html").animate({ scrollTop: $(this.editingId).offset().top - 100})
      return true
    }
    return false
  }
  onEditorCancel = () => {
    this.editingId = null;
    // 找到编辑或新建的item，新建就删掉item，编辑就isNew改为false
    const { exercise_questions } = this.state
    let index = -1;
    for(let i = 0; i < exercise_questions.length; i++) {
      if (exercise_questions[i].isNew == true) {
        index = i;
        break;
      }
    }
    if (exercise_questions[index].question_id) { // 编辑
      this.setState(
        (prevState) => ({ 
          exercise_questions : update(prevState.exercise_questions, {[index]: { isNew: {$set: false}}})
          // update(prevState.exercise_questions, {$splice: [[index, 1]]}) 
        })
      )
    } else { // 新建
      this.setState(
        (prevState) => ({ 
          exercise_questions : update(prevState.exercise_questions, {$splice: [[index, 1]]}) 
        })
      )
    }
  }
  addQuestion = (question_id_to_insert_after, type) => {
    if (!this.isEdit) {
      this.props.showNotification('请先输入试卷标题，并保存试卷')
      return;
    }
    if (this._checkIsEditing()) {
      return;
    } 
    if (type == Q_TYPE_SHIXUN) {
      this.addShixun(question_id_to_insert_after)
    } else {
      this.addEditingQuestion(type, question_id_to_insert_after)
    }
  }
  chooseShixun = (array) => {
    this.addEditingQuestion(Q_TYPE_SHIXUN, this.question_id_to_insert_after, {
      shixun_id: array[0]
    })
  }
  chooseShixunSuccess = () => {
    this.refs.shixunChooseModal.setVisible(false)
  }
  addShixun = (question_id_to_insert_after) => {
    if (!this.isEdit) {
      this.props.showNotification('请先输入试卷标题，并保存试卷')
      return;
    }
    // TODO 弹框选择实训
    if (this._checkIsEditing()) {
      return;
    } 
    this.refs.shixunChooseModal.setVisible(true)
    this.question_id_to_insert_after = question_id_to_insert_after;
    return;
    // 拉取实训items
    this.addEditingQuestion(Q_TYPE_SHIXUN, question_id_to_insert_after, {
      shixun_id: 50
    })
  }
  editQestion = (index) => {
    if (this._checkIsEditing()) {
      return;
    } 
    this.editingId = `#question_${index}`

    this.setState(
      (prevState) => ({ 
        exercise_questions : update(prevState.exercise_questions, {[index]: { isNew: {$set: true}}})
      })
    )
  }
  onSort = (index, question_id, isUp) => {
    if (this._checkIsEditing()) {
      return;
    } 
    
    const url = `/${this.props.exercise_url_questions || 'exercise_questions'}/${question_id}/up_down.json`
    axios.post(url, { opr: isUp ? 'up' : 'down'})
        .then((response) => {
          if (response.data.status == 0) {
            // this.props.showNotification('移动成功')
            this.fetchExercise()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  onSortDown = (index, question_id) => {
    this.onSort(index, question_id, false)
  }
  onSortUp = (index, question_id) => {
    this.onSort(index, question_id, true)
  }
  getInitScore = (question_type, question_id_to_insert_after) => {
    /**
      1.每个题型的首个题目默认值规则如下：
        选择题：5分   01
        判断题：2分    2
        填空题：2分    3
        简答题：10分   4
        实训题：每个关卡5分   5
     */
    let init_question_score = 0;
    if (question_type == 0 || question_type == 1) {
      init_question_score = 5
    } else if (question_type == 2) {
      init_question_score = 2
    } else if (question_type == 3) {
      init_question_score = 2
    } else if (question_type == 4) {
      init_question_score = 10
    } else if (question_type == 5) {
      init_question_score = 5
    }
    const _indexBefore = question_id_to_insert_after ? this.findIndexById(question_id_to_insert_after) : this.state.exercise_questions.length - 1
    for (let i = _indexBefore; i >= 0; i--) {
      if(this.state.exercise_questions[i].question_type == question_type) {
        init_question_score = this.state.exercise_questions[i].question_score 
        break;
      }
    }
    return init_question_score;
  }
  addEditingQuestion = (question_type, question_id_to_insert_after, otherAttributes) => {
    
    let init_question_score = this.getInitScore(question_type, question_id_to_insert_after)
    
    let questionObj  = {
      question_type: question_type, // 需要这个通过类型判断
      init_question_score: init_question_score,
      isNew: true,  // 新建或编辑，用是否有id区分是新建还是编辑
      question_id_to_insert_after,
      ...otherAttributes
    }
    const { exercise_questions } = this.state;
    let new_exercise_questions = exercise_questions.slice(0)
    let newIndex = new_exercise_questions.length;
    
    if (question_id_to_insert_after) {
      const _indexBefore = this.findIndexById(question_id_to_insert_after)
      new_exercise_questions.splice(_indexBefore + 1, 0, questionObj)
      newIndex = _indexBefore + 1
    } else {
      new_exercise_questions.push(questionObj)
    }
    this.editingId = `#question_${newIndex}`
    this.setState({ exercise_questions: new_exercise_questions }, () => {
      setTimeout(() => {
        $(this.editingId).length && $("html").animate({ scrollTop: $(this.editingId).offset().top - 100})
      }, 500)
    })
  }
  findIndexById = (id) => {
    const { exercise_questions } = this.state
    for(let i = 0; i < exercise_questions.length; i++) {
      if (exercise_questions[i].question_id == id) {
        return i;
      }
    }
  } 
  onQestionDelete = (question_id) => {
    this.props.confirm({
      content: `确认要删除这个问题吗？`,
      onOk: () => {
        const url = `/${this.props.exercise_url_questions || 'exercise_questions'}/${question_id}.json`
        axios.delete(url)
        .then((response) => {
          if (response.data.status == 0) {
            this.props.showNotification('删除成功')
            this.fetchExercise()

            // const { exercise_questions } = this.state
            // const index = this.findIndexById(question_id)

            // this.setState(
            //   (prevState) => ({ 
            //     exercise_questions : update(prevState.exercise_questions, {$splice: [[index, 1]]}) 
            //   })
            // )
          }
        })
        .catch(function (error) {
          console.log(error);
        });    
      }
    })
  }
  addSuccess = () => {
    this.editingId = null;
    this.fetchExercise()
  }
  goToPreview = () => {
    const exercise_id = this.props.match.params.Id
    const courseId = this.props.match.params.coursesId
    this.props.history.push(`/courses/${courseId}/exercises/${exercise_id}/student_exercise_list?tab=2`)
  }
  getAddQuestionUrl = () => {
    const Id = this.props.match.params.Id  
    const url = this.props.exercise_url_questions ? `/${this.props.exercise_url_questions}.json` : `/exercises/${Id}/exercise_questions.json`
    return url;
  }
  getEditQuestionUrl = (question_id) => { 
    const editUrl = this.props.exercise_url_questions ? `/${this.props.exercise_url_questions}/${question_id}.json` : `/exercise_questions/${question_id}.json`
    return editUrl;
  }
  render() {
    let { exercise_name, exercise_description, course_id, exercise_types,
      exercise_questions, left_banner_id  } = this.state;
    // if (this.isEdit && !exercise_types) {
    //   return ''
    // }
    // const { getFieldDecorator } = this.props.form;
    const { q_counts, q_scores, q_doubles, q_doubles_scores, q_judges, q_judges_scores, 
      q_mains, q_mains_scores, q_nulls, q_nulls_scores, q_shixuns, q_shixuns_scores, q_singles, q_singles_scores} = exercise_types;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        // sm: { span: 8 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        // sm: { span: 16 },
        sm: { span: 24 },
      },
    };

    const { current_user } = this.props
    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const exercise_id = this.props.match.params.Id

    const isEdit = this.isEdit
    const commonHandler = {
      onQestionDelete: this.onQestionDelete,
      addSuccess: this.addSuccess,
      addQuestion: this.addQuestion,
      onEditorCancel: this.onEditorCancel,
      changeScore:this.changeScore,
      editQestion: this.editQestion,
      onSortDown: this.onSortDown,
      onSortUp: this.onSortUp,
      displayCount: exercise_questions.length,
      exercise_status: this.state.exercise_status,
      exerciseIsPublish: this.state.exercise_status >= 2,

      getAddQuestionUrl: this.getAddQuestionUrl,
      getEditQuestionUrl: this.getEditQuestionUrl,
      exercise_url: this.props.exercise_url,
    }
    return(
        <React.Fragment>
          <ShixunChooseModal
            ref="shixunChooseModal"
            chooseShixun={this.chooseShixun}
            {...this.props}
            singleChoose={true}
            shixunsUrl={this.props.shixunsUrl}
          ></ShixunChooseModal>
          <style>{`
            .courseForm .formBlock {
              padding: 20px 30px 30px 30px;
              border-bottom: 1px solid #EDEDED;
              margin-bottom: 0px;
              background: #fff;
            }
            .exerciseNew .markdown-body {
              max-width: 1128px;
            }
          `}</style>
           

            {!this.state.editMode && <div className="padding20-30" style={{ background: '#fff'}}>
              <div className="displayTitle font-16">
                <span>{exercise_name}</span>
                <a className="fr mr6" onClick={() => { this.setState({editMode: true}) }} style={{ lineHeight: '32px'}}>
                  <Tooltip title="编辑"><i className="iconfont icon-bianjidaibeijing font-20 color-green"></i></Tooltip>
                </a>
              </div>
              <div className="displayDescription color-grey-9" dangerouslySetInnerHTML={{__html: exercise_description}}
                style={{whiteSpace: 'pre-wrap'}}
              ></div>
              
            </div>}
            {this.state.editMode && <Form {...formItemLayout}
																					// onSubmit={this.handleSubmit}
						>
              <div className="formBlock" style={{paddingBottom: '2px',borderBottom:"none"}}>
                <Form.Item
                  label="试卷标题"
                  required
                  className="topicTitle "
                >
                  {/* {getFieldDecorator('subject', {
                    rules: [{
                      required: true, message: '请输入标题',
                    }, {
                      max: 20, message: '最大限制为20个字符',
                    }],
                  })( */}
                  <style>
                    {
                      `
                .exercicenewinputysl .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
                    }
                  </style>
                    <Input placeholder={`请输入试卷标题，最大限制${TITLE_MAX_LENGTH}个字符`} maxLength={TITLE_MAX_LENGTH} className="mt5 exercicenewinputysl" value={exercise_name}
                         onChange={this.exercise_name_change} addonAfter={`${exercise_name ? exercise_name.length : 0}/${TITLE_MAX_LENGTH}`}
                    />
                  {/* )} */}
                </Form.Item>

                <Form.Item
                  label="&nbsp;&nbsp;试卷须知"
                >
                  {/* {getFieldDecorator('select_board_id', {
                    // initialValue: '3779',
                  })( */}
                    <TextArea placeholder="请在此输入本次试卷答题的相关说明，最大限制100个字符" className="mt5" style={{height:"120px"}} value={exercise_description}
                        onChange={this.exercise_description_change}
                    />
                  {/* )} */}
                </Form.Item>
                <Form.Item>
                    {/* defalutSubmitbtn */}
                    
                    <a  className="task-btn task-btn-orange fr mt4" style={{height: '30px', width: '70px'}}
                        onClick={this.onSaveExercise}
                    >保存</a>

                    { this.isEdit && <a onClick={() => this.setState({editMode: false})} className="defalutCancelbtn fr mt4" 
                        style={{height: '30px', width: '70px', fontSize: '14px', lineHeight: '30px', marginRight: '16px'}}>取消</a>}
                    {/* <Button type="primary" onClick={this.onSaveExercise} className="fr">保存</Button> */}
                </Form.Item>
                </div>
                {/* <div className="clearfix mt30 mb30">
                  <a className="defalutCancelbtn fl" onClick={() => {}}>取消</ a>
                </div> */}
            </Form>}
          

            <p className="clearfix padding20-30 color-grey-9">
              <span className="fl">
                { !!q_singles && <span className="mr20">单选题{q_singles}题，共{q_singles_scores}分</span>}
                { !!q_doubles && <span className="mr20">多选题{q_doubles}题，共{q_doubles_scores}分</span>}
                { !!q_judges && <span className="mr20">判断题{q_judges}题，共{q_judges_scores}分</span>}
                { !!q_nulls && <span className="mr20">填空题{q_nulls}题，共{q_nulls_scores}分</span>}
                { !!q_mains && <span className="mr20">简答题{q_mains}题，共{q_mains_scores}分</span>}
                { !!q_shixuns && <span className="mr20">实训题{q_shixuns}题，共{q_shixuns_scores}分</span> }
              </span>
              <span className="fr">
                { !!q_counts && 
                  <span>
                    合计 <span className="color-blue">{q_counts}</span> 题，
                    共 <span className={`${q_scores > 100 ? 'color-red font-bd' : 'color-orange'}`}>{q_scores}</span> 分
                  </span>
                }
              </span>
            </p>
            <div className="edu-back-white">
              { exercise_questions.map((item, index) => {
                if (item.question_type == 0 || item.question_type == 1) {
                  if (item.isNew) {
                    return <SingleEditor {...this.props} {...item} index={index} {...commonHandler}></SingleEditor>
                  } else {
                    return <SingleDisplay {...this.props} {...item} index={index} {...commonHandler}
                        displayCount={exercise_questions.length}
                    ></SingleDisplay>
                  }
                } else if (item.question_type == 2) {
                  if (item.isNew) {
                    return <JudgeEditor {...this.props} {...item} index={index} {...commonHandler}></JudgeEditor>
                  } else {
                    return <JudgeDisplay {...this.props} {...item} index={index} {...commonHandler} ></JudgeDisplay>
                  }
                } else if (item.question_type == 3) {
                  if (item.isNew) {
                    return <NullEditor {...this.props} {...item} index={index} {...commonHandler}></NullEditor>
                  } else {
                    return <NullDisplay {...this.props} {...item} index={index} {...commonHandler} ></NullDisplay>
                  }
                } else if (item.question_type == 4) {
                  if (item.isNew) {
                    return <MainEditor {...this.props} {...item} index={index} {...commonHandler} ></MainEditor>
                  } else {
                    return <MainDisplay {...this.props} {...item} index={index} {...commonHandler} ></MainDisplay>
                  }
                } else if (item.question_type == 5) {
                  if (item.isNew) {
                    return <ShixunEditor {...this.props} {...item} index={index} {...commonHandler} 
                        chooseShixunSuccess={this.chooseShixunSuccess}
                    ></ShixunEditor>
                  } else {
                    return <ShixunDisplay {...this.props} {...item} index={index} {...commonHandler} ></ShixunDisplay>
                  }
                }
                return <div></div>
              })}

              {!commonHandler.exerciseIsPublish && <div className="problemShow padding30">
                <ActionBtn style="green" className="mr20" onClick={() => this.addQuestion(null, Q_TYPE_SINGLE)}>
                  <i className="iconfont icon-tianjiafangda color-white font-14 mr5" style={{ marginTop: '-1px', display: 'inline-block'}}></i>选择题
                </ActionBtn>
                <ActionBtn style="green" className="mr20" onClick={() => this.addQuestion(null, Q_TYPE_JUDGE)}>
                  <i className="iconfont icon-tianjiafangda color-white font-14 mr5" style={{ marginTop: '-1px', display: 'inline-block'}}></i>判断题
                </ActionBtn>
                <ActionBtn style="green" className="mr20" onClick={() => this.addQuestion(null, Q_TYPE_NULL)}>
                  <i className="iconfont icon-tianjiafangda color-white font-14 mr5" style={{ marginTop: '-1px', display: 'inline-block'}}></i>填空题
                </ActionBtn>
                <ActionBtn style="green" className="mr20" onClick={() => this.addQuestion(null, Q_TYPE_MAIN)}>
                  <i className="iconfont icon-tianjiafangda color-white font-14 mr5" style={{ marginTop: '-1px', display: 'inline-block'}}></i>简答题
                </ActionBtn>
                <ActionBtn style="green" className="mr20" onClick={() => this.addShixun(null)}>
                  <i className="iconfont icon-tianjiafangda color-white font-14 mr5" style={{ marginTop: '-1px', display: 'inline-block'}}></i>实训题
                </ActionBtn>

                {exercise_id && !this.props.hidePreviewButton && <ActionBtn style="blue" className="fr" onClick={() => this.goToPreview()}>
                  {/* <i className="iconfont icon-tianjiafangda color-white font-14 mr5" style={{ marginTop: '-1px', display: 'inline-block'}}></i> */}
                  试卷预览
                </ActionBtn>}

                {this.props.bottomSection && this.props.bottomSection}
              </div>}
            </div>
        </React.Fragment>
      )
    }
}
// RouteHOC()
export default (ExerciseNewCommon);