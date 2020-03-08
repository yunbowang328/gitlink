import React,{ Component } from "react";
import {Link} from 'react-router-dom';

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'
import { qNameArray } from './common'
import {getUrl, ActionBtn, markdownToHTML} from 'educoder';
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

class ShixunDisplay extends Component{
  constructor(props){
    super(props);


    this.state = {
    }
  }
  componentDidMount = () => {
  }
  render() {
    let { question_title, question_score, question_type, standard_answer,
        question_id, question_number, index, displayCount,

        shixun_name, shixun, shixun_id, shixun_identifier
     } = this.props;
    
    // const { getFieldDecorator } = this.props.form;

    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const isEdit = this.isEdit
    const qNumber = `question_${index}`;
    // TODO show模式  isNew为false isEdit为false

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
    let length = 5;
    const qName = qNameArray[question_type]
    return(
        <div className="bor-bottom-greyE padding20-30" id={qNumber} _id={question_id}>
            <style>{`

              .mainQuestionDisplay {
                margin-bottom:15px;
              }
              
            `}</style>

            <QestionDisplayHeader {...this.props} question_title={shixun_name}
                topRight={
                    <a target="_blank" href={`/shixuns/${shixun_identifier}/challenges`} className="mr30"
                        style={{color: '#4CACFF'}}
                    >实训详情</a>
                }
            ></QestionDisplayHeader>
            
            {/* <div style={{color: '#05101A', fontWeight: 'bold'}}>参考答案：</div> */}
            <div className="mainQuestionDisplay color-grey-9 markdown-body" 
                dangerouslySetInnerHTML={{__html: markdownToHTML(question_title)}}
            >
            </div>

            {shixun.map((ch, index) => {
                return <div>
                    {`第${index+1}关`}　{ch.challenge_name}　{ch.challenge_score}分
                </div>
            })}

        </div>
      )
    }
}
// RouteHOC()
export default (ShixunDisplay);