import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Nav from './Nav';
import UploadComponent from '../Upload/Index';
import { getImageUrl } from 'educoder';
import{ Modal,Col,Form,Input,Tooltip,Select } from 'antd'
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import Attachments from '../Upload/attachment'

const TextArea = Input.TextArea;
const Option = Select.Option;


class CopyDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      isShow:false,
      imgsrc:'',
      journalsdata:undefined,
      //图片区域是否显示 none 隐藏 block 显示
      display:'none',
      titledisplay:'none',
      subject:'',
      branch_name:"",
      issue_tag_ids:"",
      fixed_version_id:"",
      tracker_id:0,
      issue_type:0,
      status_id:0,
      assigned_to_id:"",
      priority_id:0,
      done_ratio:0,
      textcount:"",
      fileList:undefined,
      get_attachments: undefined
    }
  }
  
  componentDidMount=()=>{
    this.InitData();
    this.getDetail();
    //this.getSelectList();
  }

  InitData=()=>{
    // this.props.form.setFieldsValue({
    //   ...this.state
    // });
  }

  getDetail=()=>{
    const { projectsId , orderId} = this.props.match.params;
    const url = `/projects/${projectsId}/issues/${orderId}/edit.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
          subject:result.data.subject,
          issue_chosen:result.data.issue_chosen,
          branches:result.data.branches,
          tracker_id:result.data.tracker_id,
          issue_type:result.data.issue_type,
          status_id:result.data.status_id,
          priority_id:result.data.priority_id,
          done_ratio:result.data.done_ratio,
          textcount:result.data.description,
          branch_name: result.data.branch_name,
          get_attachments: result.data.attachments,
          fileList:undefined,
          issue_tag_ids: result.data.issue_tags && result.data.issue_tags[0].id,
          fixed_version_id: result.data.fixed_version_id,
          assigned_to_id: result.data.assigned_to_id

        })
      this.getjournalslist();
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

    handleok=() => {
      this.setState({
        isShow:false
      });
    };
    handleCancel=()=>{
      this.setState({
        isShow:false
      });
    }

    imgshow=()=>{
      this.setState({
        isShow:true
      }); 
    };

    //删除工单
    deleteorder=(id)=>{
        const { projectsId , orderId} = this.props.match.params;
        const url = `/projects/${projectsId}/issues/${orderId}.json`;
          axios.delete(url,{ data: {
            project_id: projectsId,
            id:id
          }
        }).then((result)=>{
            if(result){
              this.props.history.push(`/projects/${projectsId}/orders`);
            }
          }).catch((error)=>{
            console.log(error);
          })
      }

    changmodelname=(e)=>{
        this.setState({
         subject:e.target.value
        })
      }
      changmodelcount=(e)=>{
        this.setState({
         textcount:e.target.value
        })
      }

      renderSelect=(list)=>{
        if(list && list.length >0){
          return(
            list.map((item,key)=>{
              return(
                <Option key={key+1} value={item.id}>{item.name}</Option>
              )
            })
          )
        }
      }

      handleSubmit=()=>{
        const { fileList } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
          if(!err){
            const { projectsId,orderId} = this.props.match.params;
            const { subject } = this.state;
            const url = `/projects/${projectsId}/issues/${orderId}.json`;
            if(values.issue_tag_ids===0){
                values.issue_tag_ids = ""
              }else{
                values.issue_tag_ids = [values.issue_tag_ids]
              }
            if(values.assigned_to_id===0){
              values.assigned_to_id = ""
            }

            axios.put(url,{
              project_id:projectsId,
              subject:subject,
              id: orderId,
              description:this.state.textcount,
              attachment_ids:fileList,
              ...values
            }).then(result=>{
              if(result){
                this.props.history.push(`/projects/${projectsId}/orders`);
              }
            }).catch(error=>{
              console.log(error);
            })
    
          }
        })
      }


  render(){
    const { projectsId,orderId } = this.props.match.params;
    const { getFieldDecorator } = this.props.form;
    const { current_user } = this.props;
    const { issue_tag_ids , fixed_version_id , branch_name , status_id , tracker_id , issue_type ,assigned_to_id , priority_id , done_ratio,
      issue_chosen , branches, subject, textcount,get_attachments } = this.state;
    return(
      <div className="main">
        <div className="topWrapper">
          <Nav  {...this.props} {...this.state}/>
        </div>
        <div>
          <Form>
            <div className="f-wrap-between mt20" style={{alignItems: "flex-start"}}>
              <div className="list-right df">
                <Link to={``}><img className="user_img"
                                   src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
                <div className="new_context">
                  <Form.Item>
                    {getFieldDecorator('subject', {
                      rules: [{
                        required: true, message: '请填写工单标题'
                      }],
                      initialValue: subject
                    })(
                      <Input placeholder="标题" onChange={this.changmodelname}/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('description', {
                      rules: [],
                      initialValue: textcount
                    })(
                      <TextArea placeholder="请输入工单的描述..." style={{height: "300px"}} onChange={this.changmodelcount}/>
                    )}
                  </Form.Item>
                  <UploadComponent load={this.UploadFunc}
                                   showNotification={this.props.showNotification} isComplete={true} ></UploadComponent>
                  {
                    get_attachments ?
                      <Attachments attachments={get_attachments} showNotification={this.props.showNotification}
                                   canDelete={true}/>
                      :
                      ""
                  }
                  <p className="clearfix mt15 text-right">
                    <a className="topWrapper_btn fr" type="submit" style={{marginLeft: 5}}
                       onClick={this.handleSubmit}>保存</a>
                    <Link to={`/projects/${projectsId}/orders/${orderId}/detail`}
                          className="a_btn cancel_btn fr">取消</Link>
                  </p>
                </div>
              </div>
              <div className="list-left" style={{paddingRight: "0px", paddingLeft: "15px", paddingTop: "10px"}}>
                <div className="list-l-panel">
                  <Form.Item
                    label="分支"
                  >
                    {getFieldDecorator('branch_name', {
                      initialValue: branch_name,
                      rules: [],
                    })(
                      <Select>
                        <Option value={''}>分支未指定</Option>
                        {
                          branches && branches.length > 0 && branches.map((item, key) => {
                            return (
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
                      initialValue: issue_tag_ids ? [issue_tag_ids] : "",
                      rules: [],
                    })(
                      <Select>
                        <Option value={''}>未选择标签</Option>
                        {this.renderSelect(issue_chosen && issue_chosen.issue_tag)}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="里程碑"
                  >
                    {getFieldDecorator('fixed_version_id', {
                      initialValue: fixed_version_id ? fixed_version_id : "",
                      rules: [],
                    })(
                      <Select>
                        <Option value={''}>未选择里程碑</Option>
                        {this.renderSelect(issue_chosen && issue_chosen.issue_version)}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="状态"
                  >
                    {getFieldDecorator('status_id', {
                      initialValue: status_id,
                      rules: [{
                        required: true, message: '请选择完成状态'
                      }],
                    })(
                      <Select>
                        {this.renderSelect(issue_chosen && issue_chosen.issue_status)}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="分类"
                  >
                    {getFieldDecorator('tracker_id', {
                      initialValue: tracker_id,
                      rules: [{
                        required: true, message: '请选择分类'
                      }],
                    })(
                      <Select>
                        {this.renderSelect(issue_chosen && issue_chosen.tracker)}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="指派成员"
                  >
                    {getFieldDecorator('assigned_to_id', {
                      initialValue: assigned_to_id ? assigned_to_id : ""
                    })(
                      <Select>
                        <Option value={''}>未指派成员</Option>
                        {this.renderSelect(issue_chosen && issue_chosen.assign_user)}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="优先度"
                  >
                    {getFieldDecorator('priority_id', {

                      initialValue: priority_id,
                      rules: [{
                        required: true, message: '请选择优先度'
                      }],
                    })(
                      <Select>
                        {this.renderSelect(issue_chosen && issue_chosen.priority)}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="完成度"
                  >
                    {getFieldDecorator('done_ratio', {
                      initialValue: done_ratio,
                      rules: [{
                        required: true, message: '请选择完成度'
                      }],
                    })(
                      <Select value={done_ratio}>
                        {this.renderSelect(issue_chosen && issue_chosen.done_ratio)}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <Modal
          onCancel={this.handleCancel}
          visible={this.state.isShow}
          width="400px"
          footer={
            []
          }
          bodyStyle={{textAlign: 'center'}}
        >
          <img className="list_img"
               src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg"
               alt=""/>
        </Modal>
      </div>
    )
  }
}

const CopyDetailForm = Form.create({ name: 'CopyDetailForm' })(CopyDetail);
export default CopyDetailForm;