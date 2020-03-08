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

class NullChildEditor extends Component{
  constructor(props){
    super(props);
    
    this.state = {
    }
  }
  
  // toMDMode = (that) => {
  //   if (this.mdReactObject) {
  //     let mdReactObject = this.mdReactObject;
  //     this.mdReactObject = null
  //     if (that != mdReactObject) {
  //       mdReactObject.toShowMode()
  //     }
  //   }
  //   this.mdReactObject = that;
  // }

  showError = (itemIndex) => {
    this.refs[`nullChildDMDEditor${itemIndex}`].showError()
  }

  render() {
    let { question_title, question_score, question_type, question_choices, standard_answers } = this.state;
    let { question_id, index, onAnswerChange, addChildAnswer, toMDMode, exerciseIsPublish, 
        answers } = this.props;
    // marginTop: '18px'
    return(
        <div className="df" style={{ }}>
            <div className="color-grey-6 mb5 mt6" style={{ flex: '0 0 90px'}}>答案(填空{index + 1}):</div>
            <div className="df flex1" style={{flexDirection: 'column'}}>
            {
                answers.map((item, itemIndex) => {
                    return <div className="df flex1" >
                    <div className="flex1" style={{ flex: '0 0 1000px'}}>
                      <DMDEditor
                          ref={`nullChildDMDEditor${itemIndex}`}
                          className={'nullChildEditor'}
                          placeholder={`请输入参考答案${itemIndex == 0 ?'':'(可选)'}`}
                          toMDMode={toMDMode} noStorage={true}
                          mdID={`answer_${index}${itemIndex}`} height={155} 
                          initValue={item} onChange={(val) => onAnswerChange(index, itemIndex, val)}
                      ></DMDEditor>
                    </div>
                    {!exerciseIsPublish && 
                    <React.Fragment>
                      {itemIndex != 0 && <Tooltip title="删除">
                        <i className="iconfont icon-htmal5icon19 font-18 color-grey-c ml10" 
                            onClick={() => this.props.deleteChildAnswer(index, itemIndex)}
                            style={{float: 'right'}}
                        ></i>
                      </Tooltip> }
                      { <Tooltip title={`新增参考答案`}>
                          <i className="color-green font-16 iconfont icon-roundaddfill ml6"
                            onClick={() => addChildAnswer(index)}
                            style={{float: 'right', visibility: itemIndex == answers.length - 1 ? '' : 'hidden', marginTop: '2px'}}
                          ></i>
                      </Tooltip>}
                    </React.Fragment>
                     }
                    </div>
                })
            }
              {/* {!exerciseIsPublish && <div className="addAnswerButton" onClick={() => addChildAnswer(index)} >+新增参考答案</div>} */}
            </div>
        </div>
      )
    }
}
// RouteHOC()
export default (NullChildEditor);