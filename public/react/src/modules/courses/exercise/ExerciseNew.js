import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'
// import './board.css'
// import "../common/formCommon.css"

// import { RouteHOC } from './common.js'

// import  { Q_TYPE_SINGLE, Q_TYPE_MULTI, Q_TYPE_JUDGE, Q_TYPE_NULL, Q_TYPE_MAIN, Q_TYPE_SHIXUN } from './new/common'
// import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
// import CBreadcrumb from '../common/CBreadcrumb'
import {getUrl, ActionBtn, CBreadcrumb} from 'educoder';

// import SingleEditor from './new/SingleEditor'
// import SingleDisplay from './new/SingleDisplay'
// import JudgeEditor from './new/JudgeEditor'
// import JudgeDisplay from './new/JudgeDisplay'
// import NullEditor from './new/NullEditor'
// import NullDisplay from './new/NullDisplay'
// import MainEditor from './new/MainEditor'
// import MainDisplay from './new/MainDisplay'
// import ShixunEditor from './new/ShixunEditor'
// import ShixunDisplay from './new/ShixunDisplay'

import update from 'immutability-helper'
import './new/common.css'
import '../css/Courses.css'

import ExerciseNewCommon from './ExerciseNewCommon'
const { TextArea } = Input;

class ExerciceNew extends Component{
  constructor(props){
    super(props);


    this.state = {
      
    }
  }
  componentDidMount = () => {
    
  }
  initData = (data) => {
    this.setState({left_banner_id: data.left_banner_id})
  }
  render() {
    let {  left_banner_id  } = this.state;
   

    const { current_user } = this.props
    
    const courseId=this.props.match.params.coursesId;

    const isEdit = this.isEdit;

		document.title=this.props.coursedata&&this.props.coursedata.name;
    return(
        <div className="newMain exerciseNew">
        
          <div className="edu-class-container edu-position courseForm">
            { current_user && <CBreadcrumb items={[
              { to: current_user&&current_user.first_category_url, name: this.props.coursedata ? this.props.coursedata.name : ''},
              { to: `/courses/${courseId}/exercises/${left_banner_id}`, name: '试卷列表' },
              { name: this.isEdit ? '编辑试卷' : '新建试卷'}
            ]}></CBreadcrumb> }

            <p className="clearfix mt20 mb20">
              <span className="fl font-24 color-grey-3">{this.isEdit ? "编辑" : "新建"}试卷</span>
              <a href="javascript:void(0)" className="color-grey-6 fr font-16 mr2" 
                // () => this.props.history.length == 1 ?  : this.props.history.goBack()
                  onClick={() => this.props.history.push(`/courses/${courseId}/exercises/${left_banner_id}`)}>
                返回
              </a>
            </p>

            <ExerciseNewCommon
              {...this.props}
              {...this.state}
              isEdit={this.isEdit}
              initData={this.initData}
            ></ExerciseNewCommon>
          </div>
        </div>
      )
    }
}
// RouteHOC()
export default (ExerciceNew);