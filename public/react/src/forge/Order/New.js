import React , { Component } from "react";
import { Form , Input , Select } from 'antd';
import {Link} from 'react-router-dom';

import { getImageUrl } from 'educoder';

import Nav from './Nav';
import UploadComponent from '../Upload/Index';
import './order.css';

import axios from 'axios';

const Option = Select.Option;
const TextArea = Input.TextArea;
class New extends Component{
  constructor(props){
    super(props);
    this.state={
      branch_name:"",
      issue_tag_ids:"",
      fixed_version_id:"",
      tracker_id:"缺陷",
      issue_type:"普通",
      status_id:'新增',
      assigned_to_id:"",
      priority_id:"正常",
      done_ratio:"0%",
      issue_chosen:undefined,
      branches:undefined,
      fileList:undefined
    }
  }

  componentDidMount=()=>{
    this.InitData();
    this.getSelectList();
  }

  InitData=()=>{
    this.props.form.setFieldsValue({
      ...this.state
    });
  }

  getSelectList=()=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/issues/new.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          issue_chosen:result.data.issue_chosen,
          branches:result.data.branches
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  renderSelect=(list)=>{
    if(list && list.length >0){
      return(
        list.map((item,key)=>{
          return(
            <Option key={key+1} value={item.id+""}>{item.name}</Option>
          )
        })
      )
    }
  }

  // 创建
  handleSubmit=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { projectsId } = this.props.match.params;
        const { fileList } = this.state;
        const url = `/projects/${projectsId}/issues.json`;
        if(values.status_id==="新增"){
            values.status_id="1"
        }
        // if(values.issue_type==="普通"){
        //   values.issue_type="1"
        // }
        if(values.tracker_id==="缺陷"){
          values.tracker_id="1"
        }
        if(values.priority_id==="正常"){
          values.priority_id="2"
        }
        if(values.done_ratio==="0%"){
          values.done_ratio="0"
        }
        if(values.issue_tag_ids.length > 0){
          values.issue_tag_ids = [values.issue_tag_ids]
        }

        axios.post(url,{
          ...values,
          attachment_ids:fileList
        }).then(result=>{
          if(result){
            this.props.showNotification("工单创建成功！");
            this.props.history.push(`/projects/${projectsId}/orders`);
          }
        }).catch(error=>{
          console.log(error);
        })

      }
    })
  }

  // 获取上传后的文件id数组
  UploadFunc=(fileList)=>{
    this.setState({
      fileList
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { current_user } = this.props;
    const { issue_tag_ids , fixed_version_id , branch_name , status_id , tracker_id , issue_type ,assigned_to_id , priority_id , done_ratio,
    issue_chosen , branches } = this.state;
    
    return(
      <div className="main">
        <div className="topWrapper">
          <Nav {...this.props} {...this.state} />
        </div>
        <Form>
          <div className="f-wrap-between mt20" style={{alignItems:"flex-start"}}>
            <div className="list-right df">
              <Link to={``}><img class="user_img" src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
              <div className="new_context">
                <Form.Item>
                  {getFieldDecorator('subject', {
                    rules: [{
                      required: true, message: '请填写工单标题'
                    }],
                  })(
                      <Input placeholder="标题"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('description', {
                    rules: [],
                  })(
                      <TextArea placeholder="请输入工单的描述..." style={{height:"300px"}}/>
                  )}
                </Form.Item>
                <UploadComponent load={this.UploadFunc} showNotification={this.props.showNotification} isComplete={true}></UploadComponent>
                <p className="clearfix mt15">
                  <a className="topWrapper_btn fr" type="submit" onClick={this.handleSubmit}>创建Issue</a>
                </p>
              </div>
            </div>
            <div className="list-left" style={{paddingRight:"0px",paddingLeft:"15px",paddingTop:"10px"}}>
              <div className="list-l-panel">
                <Form.Item>
                  {getFieldDecorator('branch_name', {
                    rules: [],
                  })(
                    <Select value={branch_name}>
                      <Option value={''}>分支未指定</Option>
                      {
                        branches && branches.length >0 && branches.map((item,key)=>{
                          return(
                            <Option value={item}>{item}</Option>
                          )
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="标签"
                >
                  {getFieldDecorator('issue_tag_ids', {
                    rules: [],
                  })(
                    <Select value={issue_tag_ids}>
                      <Option value={""}>未选择标签</Option>
                      { this.renderSelect(issue_chosen && issue_chosen.issue_tag) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="里程碑"
                >
                  {getFieldDecorator('fixed_version_id', {
                    rules: [],
                  })(
                    <Select value={fixed_version_id}>
                      <Option value={""}>未选择里程碑</Option>
                      { this.renderSelect(issue_chosen && issue_chosen.issue_version) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="状态"
                >
                  {getFieldDecorator('status_id', {
                    rules: [{
                      required: true, message: '请选择完成状态'
                    }],
                  })(
                    <Select value={status_id}>
                      { this.renderSelect(issue_chosen && issue_chosen.issue_status) }
                    </Select>
                  )}
                </Form.Item>
                {/* <Form.Item
                  label="类型"
                >
                  {getFieldDecorator('issue_type', {
                    rules: [{
                      required: true, message: '请选择类型'
                    }],
                  })(
                    <Select  value={issue_type}>
                      { this.renderSelect(issue_chosen && issue_chosen.issue_type) }
                    </Select>
                  )}
                </Form.Item> */}
                <Form.Item
                  label="分类"
                >
                  {getFieldDecorator('tracker_id', {
                    rules: [{
                      required: true, message: '请选择分类'
                    }],
                  })(
                    <Select value={tracker_id}>
                      { this.renderSelect(issue_chosen && issue_chosen.tracker) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="指派成员"
                >
                  {getFieldDecorator('assigned_to_id', {
                    rules: [{
                    }],
                  })(
                    <Select value={assigned_to_id}>
                      <Option value={""}>未指派成员</Option>
                      { this.renderSelect(issue_chosen && issue_chosen.assign_user) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="优先度"
                >
                  {getFieldDecorator('priority_id', {
                    rules: [{
                      required: true, message: '请选择优先度'
                    }],
                  })(
                    <Select value={priority_id}>
                      { this.renderSelect(issue_chosen && issue_chosen.priority) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="完成度"
                >
                  {getFieldDecorator('done_ratio', {
                    rules: [{
                      required: true, message: '请选择完成度'
                    }],
                  })(
                    <Select value={done_ratio}>
                      { this.renderSelect(issue_chosen && issue_chosen.done_ratio) }
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
const WrappedNewForm = Form.create({ name: 'NewOrderForm' })(New);
export default WrappedNewForm;