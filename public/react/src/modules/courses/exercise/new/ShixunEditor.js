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

class ShixunEditor extends Component{
  constructor(props){
    super(props);
    /**
       {                    #实训题
            "question_id": 7294,
            "question_number": 3,
            "question_title": "独立完成数据库知识",
            "question_type": 5,
            "exercise_id": 763,
            "question_score": 35,
            "shixun_id": 41,
            "shixun_name": "MySQL数据库编程开发实训（基础篇）",
            "shixun": [
                {
                    "challenge_id": 69,
                    "challenge_position": 1,
                    "challenge_name": "数据库连接与数据库实例创建",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 70,
                    "challenge_position": 2,
                    "challenge_name": "数据表的创建",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 71,
                    "challenge_position": 3,
                    "challenge_name": "数据查询操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 72,
                    "challenge_position": 4,
                    "challenge_name": "数据库的插入操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 73,
                    "challenge_position": 5,
                    "challenge_name": "数据表的删除操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 74,
                    "challenge_position": 6,
                    "challenge_name": "数据表的更新操作",
                    "challenge_score": 5
                },
                {
                    "challenge_id": 75,
                    "challenge_position": 7,
                    "challenge_name": "数据库的应用",
                    "challenge_score": 5
                }
            ]
        }
     */
    const { shixun } = this.props;
    const question_scores = shixun ? shixun.map(item => item.challenge_score) : []
     
    this.state = {
        
      question_title: this.props.question_title || '',
      question_type: this.props.question_type || 2,
      question_scores: question_scores || '0',
      challenges: [],
    }
  }
  
  onSave = () => {
    const {question_title, question_scores, question_type, shixun_name } = this.state;
    const { question_id_to_insert_after, question_id
            , shixun_id } = this.props
    // TODO check

    // if(!question_title) {
    //   this.props.showNotification('请先输入实训题完成要求'); return;
    // }
    for(let _i = 0; _i < question_scores.length; _i++) {
        if (!question_scores[_i] || question_scores[_i] == '0') {
            this.props.showNotification(`第${_i+1}题的分值：必须大于0`); return;
        }
    }
    

    /**
        {
    "question_title":"社会主义核心价值观是？.",
    "question_type":5,
    "question_scores":[5,5,5], 
    "shixun_id":555
}
    }*/
    const Id = this.props.match.params.Id  
    if (question_id) {
      const editUrl = this.props.getEditQuestionUrl(question_id);
      axios.put(editUrl, {
        question_title,
        question_type: 5,
        question_scores,
        shixun_id,
        insert_id: question_id_to_insert_after || undefined,
        shixun_name,
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
        question_type: 5,
        question_scores,
        shixun_id,
        insert_id: question_id_to_insert_after || undefined,
        shixun_name,
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
    const { shixun_id, exercise_url } = this.props;
    // shixun_id
    const Id = this.props.match.params.Id  
    const url = `/${exercise_url || 'exercises'}/${Id}/commit_shixun.json`
    axios.get(url, {
        params: {
            shixun_id
        }
    })
        .then((response) => {
          if (response.data.challenges) {
              /**
                challenge_counts  
                shixun_name  shixun_id
                challenges  [ {challenge_name: "链表节点的初始化"} ]
               */
              const question_scores = this.state.question_scores
              let chLen = response.data.challenges.length;
              if (chLen == 0) {
                this.onCancel()
                this.props.showNotification('这个实训没有关卡，请选择其他实训')
                this.props.chooseShixunFail && this.props.chooseShixunFail()
                return
              }
              this.props.chooseShixunSuccess && this.props.chooseShixunSuccess()

              // 新建的时候初始化数组
              // question_scores.length = chLen
              let newArray = [];
              if (question_scores && question_scores.length && question_scores[0]) {
                newArray = question_scores;
              } else {
                while(chLen--) {
                  newArray.push(5)
                }
              }
              this.setState({ ...response.data, question_scores: newArray })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  on_question_score_change = (e, index) => {
    console.log('e.target.value: ', e)
    const value = e
    this.setState(
        (prevState) => ({ 
          question_scores : update(prevState.question_scores
            , {[index]: {$set: value}})
        })
      )
    // this.setState({ question_score: e })
  }
  
  render() {
    let { question_title, question_score, question_type,
        shixun_name, challenges, question_scores } = this.state;
    let { question_id, index, isNew, exerciseIsPublish,} = this.props;
    
    if(!challenges || challenges.length == 0) {
      return ''
    }
    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const isEdit = !!question_id
    const qNumber = `question_${index}`;
    
    const blackColor = '#05101A'
    return(
        <div className="padding20-30 bor-bottom-greyE" id={qNumber}>
            <style>{`
              .optionMdEditor {
                flex: 0 0 800px
              }
              .optionRow {
                margin: 2px;
              }

              .df_left_right {
                  display: flex;
                  justify-content: space-between;
                  margin: 0 6px;
                  margin-bottom: 20px;
              }
            `}</style>
            <p className="mb10 clearfix">
              {/*!question_id ? '新建' : '编辑'*/}
                <span className="color-blue font-16 mr20 fl">{qNameArray[question_type]}</span>
                <span className="color-grey-9 font-12 fl">（客观题，由系统自动评分，允许手动调分）</span>
            </p>
            <Input value={shixun_name} onChange={(e) => this.setState({shixun_name: e.target.value})}
                style={{ marginBottom: '10px'}}
            ></Input>
            {/* <div style={{color: blackColor}} className="font-16 mb5">{shixun_name}</div> */}
            <TPMMDEditor mdID={`question_${question_id}`} placeholder="请输入实训题完成要求" height={155} 
              initValue={question_title} onChange={(val) => this.setState({ question_title: val})}
              noStorage={true}
            ></TPMMDEditor>
            
            
            <div>
                <div className="df_left_right">
                    <div className="color-grey-9">关卡</div>
                    <div className="color-grey-9" style={{ flex: '0 0 76px'}}>分值</div>
                </div>
                { challenges.map((challenge, index) => {
                    return <div className="df_left_right">
                        <div style={{color: blackColor}} className="lineh-30">
                            {index+1}.{challenge.challenge_name}
                        </div>
              
                        <div>
                            <InputNumber step={0.1} precision={1} min={0} max={100} 
                                    style={{width: 100}} value={question_scores[index]}
                                    placeholder="请填写分数" disabled={exerciseIsPublish}
                                    onChange={(e) => this.on_question_score_change(e, index)}></InputNumber> 分
                        </div>
                    </div>
                })}
            </div>

            <div style={{ height: '40px', marginTop: '10px' }}>
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
export default (ShixunEditor);