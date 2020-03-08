import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'
import { qNameArray } from './common'
import {getUrl, ActionBtn, markdownToHTML, MarkdownToHtml} from 'educoder';
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

class QestionDisplayHeader extends Component{
  constructor(props){
    super(props);


    this.state = {
        
    }
  }
  componentDidMount = () => {
      
  }
  render() {
    let { question_title, question_score, question_type, question_choices, standard_answer,
        question_id, question_number, index, displayCount,
        topRight, showActionButton, exerciseIsPublish
     } = this.props;
     
    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const isEdit = this.isEdit
    const qNumber = `question_${index}`;
    
    const qName = qNameArray[question_type]
    return(
        <React.Fragment>
        <div className="new_li">
            <style>{`
            .actionBtns {
                height: 28px
            }
            `}</style>
            <div className="font-16 fl">
                <span className="color-blue">{index+1}、{qName}</span>
                <span className="color-grey-9">（{question_score}分）</span>
            </div>
            <div className="fr actionBtns">
                { topRight }
                { showActionButton != false && <React.Fragment>
                    {!exerciseIsPublish && <a className="mr30" onClick={() => this.props.onQestionDelete(question_id)}>
                        <Tooltip title="删除">
                            <i className="color-grey-cd font-16 iconfont icon-shanchu"></i>
                        </Tooltip>
                    </a>}
                    {index === 0 ? "" :
                        <a className="mr30" onClick={() => this.props.onSortUp(index, question_id)}>
                            <Tooltip title="上移">
                                <i className="color-green font-18 iconfont icon-xiangshangyi"></i>
                            </Tooltip>
                        </a> }
                    {index === displayCount - 1 ? "" :
                        <a className="mr30" onClick={() => this.props.onSortDown(index, question_id)}>
                            <Tooltip title="下移">
                                <i className="color-green font-18 iconfont icon-xiangxiayi"></i>
                            </Tooltip>
                        </a>}
                    {!exerciseIsPublish &&<a className="mr30" onClick={() => this.props.addQuestion(question_id, question_type)}>
                        <Tooltip title={`(向下插入${qName})`}>
                            <i className="color-green font-18 iconfont icon-roundaddfill"></i>
                        </Tooltip>
                    </a>}
                    <a onClick={() => this.props.editQestion(index)}>
                        <Tooltip title="编辑"><i className="color-green font-18 iconfont icon-bianjidaibeijing"></i></Tooltip>
                    </a>
                </React.Fragment>}
            </div>
        </div>
        { question_title && 
         <MarkdownToHtml content={question_title} selector={'qtitle_' + (index + 1)} style={{ display: 'inline-block', width:'100%' , margin: '10px 0px 15px' }}
            
         ></MarkdownToHtml>
        //  <div className="markdown-body" dangerouslySetInnerHTML={{__html: markdownToHTML1(question_title)}} 
        // style={{ display: 'inline-block', width:'100%' , margin: '10px 0px 15px' }}></div>
          }
        </React.Fragment>
      )
    }
}
// RouteHOC()
export default (QestionDisplayHeader);