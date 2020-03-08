import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Nav from '../Order/Nav';

import UploadComponent from '../Upload/Index';
import { getImageUrl } from 'educoder';
import{ Modal,Col,Form,Input,Tooltip,Select } from 'antd'
import NoneData from '../../modules/courses/coursesPublic/NoneData';

import Attachments from '../Upload/attachment'

const TextArea = Input.TextArea;
const Option = Select.Option;


class UpdateMerge extends Component{
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
    const { projectsId , mergeId} = this.props.match.params;
    const url = `/projects/${projectsId}/pull_requests/${mergeId}/edit.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
          subject:result.data.issue.subject,
          issue_chosen:result.data.issue.issue_chosen,
          branches:result.data.issue.branches,
          tracker_id:result.data.issue.tracker_id,
          issue_type:result.data.issue.issue_type,
          status_id:result.data.issue.status_id,
          priority_id:result.data.issue.priority_id,
          done_ratio:result.data.issue.done_ratio,
          textcount:result.data.issue.description,
          branch_name: result.data.issue.branch_name,
          get_attachments: result.data.issue.attachments,
          fileList:undefined,
          issue_tag_ids: result.data.issue.issue_tags && result.data.issue.issue_tags[0].id,
          fixed_version_id: result.data.issue.fixed_version_id,
          assigned_to_id: result.data.issue.assigned_to_id
        })
      // this.getjournalslist();
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
    // 获取上传后的文件id数组
      UploadFunc=(fileList)=>{
        this.setState({
          fileList
        })
      }
      handleSubmit=()=>{
        const { fileList } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
          if(!err){
            const { projectsId,mergeId} = this.props.match.params;
            const { subject ,data} = this.state;
            const url = `/projects/${projectsId}/pull_requests/${mergeId}.json`;
            
           
            if(values.issue_tag_ids===''){
              values.issue_tag_ids = []
            }else{
              
            }
            
            if(values.assigned_to_id===0){
              values.assigned_to_id = ""
            }
            axios.put(url,{
                project_id:projectsId,
                id: data.issue.id,
                attachment_ids:fileList,
              ...values
            }).then(result=>{
              if(result){
                this.props.history.push(`/projects/${projectsId}/merge`);
              }
            }).catch(error=>{
              console.log(error);
            })
    
          }
        })
      }


  render(){
    const { projectsId,mergeId } = this.props.match.params;
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
        <div className="f-wrap-between mt20" style={{alignItems:"flex-start"}}>
          <div className="list-right df" >
            <Link to={``}><img class="user_img" src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
            <div className="new_context">
              <Form.Item>
                {getFieldDecorator('title', {
                  rules: [{
                    required: true, message: '请填写工单标题'
                  }],
                  initialValue: subject
                })(
                  <Input placeholder="标题" onChange={this.changmodelname}/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('body', {
                  rules: [],
                  initialValue: textcount
                })(
                  <TextArea placeholder="请输入工单的描述..." style={{height:"300px"}} onChange={this.changmodelcount}/>
                )}
              </Form.Item>
              <UploadComponent load={this.UploadFunc} showNotification={this.props.showNotification} isComplete={true} ></UploadComponent>
              {
                get_attachments ?
                  <Attachments attachments={get_attachments} showNotification={this.props.showNotification} canDelete={true}/>
                  :
                  ""
              }
              <p className="clearfix mt15 text-right">
                <a className="topWrapper_btn fr" type="submit" style={{marginLeft:5}} onClick={this.handleSubmit}>保存</a>
                <Link to={`/projects/${projectsId}/merge/${mergeId}/Messagecount`} className="a_btn cancel_btn fr">取消</Link>
              </p>
            </div>
          </div>
          <div className="list-left" style={{paddingRight:"0px",paddingLeft:"15px",paddingTop:"10px"}}>
          <div className="list-l-panel">
       
                <Form.Item
                  label="标签"
                >
                  {getFieldDecorator('issue_tag_ids', {
                    initialValue: issue_tag_ids ? [issue_tag_ids] : '',
                    rules: [],
                  })(
                    <Select>
                      <Option value={''}>未选择标签</Option>
                      { this.renderSelect(issue_chosen && issue_chosen.issue_tag) }
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
                      { this.renderSelect(issue_chosen && issue_chosen.issue_version) }
                    </Select>
                  )}
                </Form.Item>
           
                <Form.Item
                  label="指派成员"
                >
                  {getFieldDecorator('assigned_to_id', {
                    initialValue: assigned_to_id ? assigned_to_id : "",
                  })(
                    <Select>
                      <Option value={''}>未指派成员</Option>
                      { this.renderSelect(issue_chosen && issue_chosen.assign_user) }
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
      bodyStyle={{textAlign:'center'}}
      >
      <img class="list_img" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608431072,669449145&fm=27&gp=0.jpg" alt=""/>
      </Modal>
    </div>
    )
  }
}

const UpdateMergeForm = Form.create({ name: 'UpdateMergeForm' })(UpdateMerge);
export default UpdateMergeForm;