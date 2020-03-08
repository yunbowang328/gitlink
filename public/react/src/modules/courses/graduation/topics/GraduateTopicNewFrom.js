import React,{ Component } from "react";

import {
  Form, Input, Button, Upload, Icon , message, Select
} from 'antd';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import { City , getUploadActionUrl , appendFileSizeToUploadFileAll } from 'educoder';
const $ = window.$;
const NAME_COUNT=60;
const { Option} = Select;
class GraduateTopicNewForm extends Component{
  constructor(props){
    super(props);

    this.mdRef = React.createRef();

    this.state = {
      fileList: [],
      teacherList:[],
      topic_property_first:[],
      topic_property_second:[],
      topic_repeat:[],
      topic_source:[],
      topic_type:[],
      addonAfter:0,
      cityDefaultValue:undefined
    }
  }
  // init编辑信息
  initValue=(result)=>{
    this.setState({
      teacherList:result.data.teacher_list,
      topic_property_first:result.data.topic_property_first,
      topic_property_second:result.data.topic_property_second,
      topic_repeat:result.data.topic_repeat,
      topic_source:result.data.topic_source,
      topic_type:result.data.topic_type,
      addonAfter:parseInt(result.data.selected_data.name.length)
    })
    this.props.form.setFieldsValue({
      tea_id:result.data.selected_data.tea_id,
      name:result.data.selected_data.name,
      city: [result.data.selected_data.province,result.data.selected_data.city],
      topic_type:result.data.selected_data.topic_type || undefined,
      topic_source:result.data.selected_data.topic_source || undefined,
      topic_property_first:result.data.selected_data.topic_property_first || undefined,
      topic_property_second:result.data.selected_data.topic_property_second || undefined,
      source_unit:result.data.selected_data.source_unit,
      topic_repeat:result.data.selected_data.topic_repeat || undefined
    });
    this.mdRef.current.setValue(result.data.selected_data.description)
    const _fileList = result.data.attachments.map(item => {
      return {
        id: item.id,
        uid: item.id,
        name: item.title,
        url: item.url,
        status: 'done'
      }
    })
    this.setState({ fileList: _fileList, cityDefaultValue: [result.data.selected_data.province,result.data.selected_data.city] })
  }
  //init新建信息
  initNewInfo=(result)=>{
    this.setState({
      teacherList:result.data.teacher_list,
      topic_property_first:result.data.topic_property_first,
      topic_property_second:result.data.topic_property_second,
      topic_repeat:result.data.topic_repeat,
      topic_source:result.data.topic_source,
      topic_type:result.data.topic_type
    })
    
    this.props.form.setFieldsValue({
      tea_id:this.props.current_user && this.props.current_user.user_id
    })
  }
  
  // 附件相关 START
  handleChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      let contentFileList = info.fileList;
      // this.setState({ fileList: appendFileSizeToUploadFileAll(contentFileList)});
      // let list = appendFileSizeToUploadFileAll(contentFileList);
      // let arr = list.map(item=>{
      //   return ( item.response && item.response.id )
      // })
      this.setState({ 
        fileList:contentFileList 
      });
    }
  }
  onAttachmentRemove = (file) => {
    this.props.confirm({
      content: '确定要删除这个附件吗?',
      onOk: () => {
        this.deleteAttachment(file)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    return false;
  }
  deleteAttachment = (file) => {
    console.log(file);
    let id=file.response ==undefined ? file.id : file.response.id
    const url = `/attachments/${id}.json`
    axios.delete(url).then((response) => {
      if (response.data) {
        const { status } = response.data;
        if (status == 0) {
          console.log('--- success')
          
          this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  changeTopicName=(e)=>{
    // let num= 60 - parseInt(e.target.value.length);
    this.setState({
      addonAfter:e.target.value.length
    })
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    const topicId = this.props.topicId
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (topicId !=undefined)  {
          // 编辑
          // const editTopic = this.editTopic
          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response ? item.response.id : item.id
            })
          }
          const param = {
              ...values,
              province: values.city==undefined?"":values.city[0],
              city: values.city==undefined?"":values.city[1],
          }
          this.props.editSave && this.props.editSave(param,attachment_ids,topicId);          
        } else {
          // 新建
          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response.id
            })
          }
          const param ={
              ...values,
              province: values.city==undefined?"":values.city[0],
              city: values.city==undefined?"":values.city[1],
          }
          this.props.newSubmit && this.props.newSubmit(param,attachment_ids,topicId);
        }
      } else {
        $("html").animate({ scrollTop: $('html').scrollTop() - 100 })
      }
    });
  }

  // 附件相关 ------------ END
  render(){
    let{
      fileList,
      teacherList,
      topic_property_first,
      topic_property_second,
      topic_repeat,
      topic_source,
      topic_type,
      addonAfter,
      cityDefaultValue
    }=this.state;
    const { getFieldDecorator } = this.props.form;
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
    const uploadProps = {
      width: 600,
      fileList,
      multiple: true,
      action:  `${getUploadActionUrl()}`,
      onChange: this.handleChange,
      onRemove: this.onAttachmentRemove,
      beforeUpload: (file) => {
        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          //message.error('文件大小必须小于150MB!');
          this.props.define({
            title:'提示', 
            content:"该文件无法上传。超过文件大小限制(150MB),建议上传到百度云等其它共享工具里，然后再txt文档里给出链接以及共享密码并上传"
          })
          return isLt150M;
        }
      }
    };
    let { topicId , teacherName }=this.props;
    return(
      <React.Fragment>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="createPage">
            {
              teacherName && 
              <Form.Item
                label="指导老师"
              >
                {getFieldDecorator('tea_id', {
                  rules: [{
                    required: true, message: '请选择指导老师'
                  }],
                })(
                  <Select style={{"width":"20%"}} placeholder="请选择指导老师">
                    {
                      teacherList && teacherList.map((item,key)=>{
                        return(
                          <Option value={item.id} id={key}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            }
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
            <Form.Item
              label="选题名称"
              className="mt15"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入选题名称',
                }, {
                  max: 60, message: '最大限制为60个字符',
                }],
              })(
                <Input placeholder="请输入帖子选题名称，最大限制60个字符" maxLength="60" onInput={this.changeTopicName} autoComplete="off" addonAfter={`${String(addonAfter)}/${NAME_COUNT}`} className="searchViewAfter exercicenewinputysl" />
              )}
            </Form.Item>
          </div>

          <style>{`
            .courseMessageMD {
              width: 1140px;
            }
            
            .uploadBtn.ant-btn {
              border: none;
              color: #4CACFF;
              box-shadow: none;
              background: transparent;
              padding: 0 6px;
            }
            .upload_1 .ant-upload-list {
              width: 350px;
              margin-bottom:10px;
            }
            .ant-upload-list-item{
              margin-top:0px!important;
            }

            .ant-form-item-children{
              position:unset
            }
            .rememberTip{
              position:absolute;
              right:0px;
              bottom:-10px;
            }
            .chooseDes .ant-form-explain{
              position:absolute;
              bottom:-10px;
              left:0px;
            }
            .setUploadStyle .uploadBtn{
              height:20px;
              line-height:20px;
            }
            .setUploadStyle .ant-form-item-control{
              margin-top:15px!important;
              line-height:22px!important;
            }
            .setUploadStyle .ant-upload-list{
              margin-top:5px;
            }
            
          `}</style>

          <div className="createPage">

          <Form.Item
            label="选题简介"
            style={{"borderBottom":'none'}}
            className="chooseDes pr"
          >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: '请输入选题简介',
            }, {
              max: 10000, message: '最大限制为10000个字符',
            }],
          })(
            // initValue={this.editTopic ? this.editTopic.content : ''}
            <TPMMDEditor ref={this.mdRef} placeholder={'请简要说明选题内容，最大限制5000个字符'}
              mdID={'courseMessageMD'}  className="courseMessageMD"></TPMMDEditor>
          )}
          </Form.Item>
            <Form.Item
              className="setUploadStyle"
            >
              {
                getFieldDecorator('file',{
                  rules:[{
                    required:false
                  }]
                })(
                  <Upload {...uploadProps} className="upload_1 ">
                    <Button className="uploadBtn">
                      <Icon type="upload" /> 上传附件
                    </Button>
                    <span className="color-grey-c">(单个文件150M以内)</span>
                  </Upload>
                )
              }
            </Form.Item>
            <div className="clearfix">
              <Form.Item className="fl mr20 with20" style={{"marginRight":"20px"}}>
                {getFieldDecorator('topic_type', {
                  rules: [{
                    required: false, message: '',
                  }],
                })(
                  <Select placeholder="请选择选题类型">
                    {
                      topic_type && topic_type.map((item,key)=>{
                        return(
                          <Option value={item.id} key={key}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="fl mr20 with20" style={{"marginRight":"20px"}}>
                {getFieldDecorator('topic_source', {
                  rules: [{
                    required: false, message: '',
                  }],
                })(
                  <Select placeholder="请输入选题来源">
                    {
                      topic_source && topic_source.map((item,key)=>{
                        return(
                          <Option value={item.id} key={key}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="fl mr20 with20" style={{"marginRight":"20px"}}>
                {getFieldDecorator('topic_property_first', {
                  rules: [{
                    required: false, message: '',
                  }],
                })(
                  <Select placeholder="请输入选题性质1">
                    {
                      topic_property_first && topic_property_first.map((item,key)=>{
                        return(
                          <Option value={item.id} key={key}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="fl mr20 with20" style={{"marginRight":"20px"}}>
                {getFieldDecorator('topic_property_second', {
                  rules: [{
                    required: false, message: '',
                  }],
                })(
                  <Select placeholder="请输入选题性质2">
                    {
                      topic_property_second && topic_property_second.map((item,key)=>{
                        return(
                          <Option value={item.id} key={key}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          

          <style>{`
            .courseForm .flexBlock.formBlock {
              align-items: flex-end;
              display: flex;
              flex-wrap: wrap;
            }
            .courseForm .flexBlock .tag {
              margin-left: 8px;
              margin-right: 6px;
              margin-bottom: 16px;
            }
            .flexBlock .ant-row.ant-form-item {
              margin-bottom: 6px;
            }
            .ant-cascader-menu{
              min-width:125px!important;
            }
          `}</style>
          

          <div className="createPage" style={{"borderBottom":"none"}}>
            <Form.Item
              label="选题来源单位"
              className="with22"
            >
            {getFieldDecorator('source_unit', {
              rules: [{
                required: false, message: '',
              }],
            })(
                <Input placeholder="请填写来源单位" autoComplete="off" className="searchView"/>
            )}
            </Form.Item>
            <Form.Item
              label="选择重复情况"
              className="mt15 with22"
            >
            {getFieldDecorator('topic_repeat', {
              rules: [{
                required: false, message: '',
              }],
            })(
              <Select placeholder="请选择选题重复情况">
                {
                  topic_repeat && topic_repeat.map((item,key)=>{
                    return(
                      <Option value={item.id} key={key}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            )}
            </Form.Item>
            <Form.Item
              label="调研或实习地点"
              className="mt15 with22 setAreaStyle"
            >
            {getFieldDecorator('city', {
              rules: [{
                initialValue: cityDefaultValue,
                type: 'array',
                required: false, message: '',
              }],
            })(
              <City ></City>
            )}
            </Form.Item>
          </div>  

          <Form.Item>
            <div className="clearfix mt30 mb30">
              <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20">{topicId==undefined?"提交":"保存"}</Button>
              <a className="defalutCancelbtn fl" onClick={this.props.editCancel}>取消</ a>
            </div>
          </Form.Item>
        </Form>
      </React.Fragment>
    )
  }
}

const WrappedGraduateTopicNewForm = Form.create({ name: 'topicPostWorksNew' })(GraduateTopicNewForm);
// RouteHOC()
export default (WrappedGraduateTopicNewForm);