import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal,Cascader
} from 'antd';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import {getUrl} from 'educoder';
import "../../common/formCommon.css"
import '../style.css'
import '../../css/Courses.css'
import { WordsBtn, City , getUploadActionUrl } from 'educoder'

import {Link} from 'react-router-dom'
// import City from './City'

// import './board.css'
// import { RouteHOC } from './common.js'

const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;
const NAME_COUNT=60;
// 新建毕设选题
// https://lanhuapp.com/web/#/item/project/board/detail?pid=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&project_id=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&image_id=c6d9b36f-7701-4035-afdb-62404681108c
class GraduateTopicNew extends Component{
  constructor(props){
    super(props);

    this.mdRef = React.createRef();

    this.state = {
      fileList: [],
      boards: [],
      teacherList:[],
      topic_property_first:[],
      topic_property_second:[],
      topic_repeat:[],
      topic_source:[],
      topic_type:[],
      attachments:undefined,
      addonAfter:0,
      left_banner_id:undefined,
      course_name:undefined
    }
  }
  // 获取老师列表
  getTeacherList=()=>{
    const cid = this.props.match.params.coursesId
    let url=`/courses/${cid}/graduation_topics/new.json`;
    axios.get((url)).then((result)=>{
      if(result.status==200){
        this.setState({
          teacherList:result.data.teacher_list,
          left_banner_id:result.data.left_banner_id,
          course_name:result.data.course_name,
          left_banner_name:result.data.left_banner_name,
          topic_property_first:result.data.topic_property_first,
          topic_property_second:result.data.topic_property_second,
          topic_repeat:result.data.topic_repeat,
          topic_source:result.data.topic_source,
          topic_type:result.data.topic_type
        })
        console.log("sdfds");
        console.log(this.props.current_user && this.props.current_user.user_id);
        this.props.form.setFieldsValue({
          tea_id:this.props.current_user && this.props.current_user.user_id
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  componentDidMount = () => {
    //新建or编辑
    let topicId=this.props.match.params.topicId;

    if(topicId==undefined){
      this.getTeacherList();
    }else{
      this.getEditInfo();
      
    }
  }
  //编辑，信息显示
  getEditInfo=()=>{
    const cid = this.props.match.params.coursesId
    let topicId=this.props.match.params.topicId
    let url=`/courses/${cid}/graduation_topics/${topicId}/edit.json`;
    axios.get((url)).then((result)=>{
      if(result){
        this.setState({
          left_banner_id:result.data.left_banner_id,
          course_name:result.data.course_name,
          left_banner_name:result.data.left_banner_name,
          teacherList:result.data.teacher_list,
          topic_property_first:result.data.topic_property_first,
          topic_property_second:result.data.topic_property_second,
          topic_repeat:result.data.topic_repeat,
          topic_source:result.data.topic_source,
          topic_type:result.data.topic_type,
          attachments:result.data.attachments,
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
    }).catch((error)=>{
      console.log(error);
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const cid = this.props.match.params.coursesId
    const topicId = this.props.match.params.topicId
    // console.log(this.props);

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (topicId !=undefined)  {
          const editTopic = this.editTopic
          const editUrl = `/courses/${cid}/graduation_topics/${topicId}.json`

          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response ? item.response.id : item.id
            })
          }
          axios.put(editUrl, {
            graduation_topic:{
              ...values,
              province: values.city==undefined?"":values.city[0],
              city: values.city==undefined?"":values.city[1],
            },
            attachment_ids
          }).then((response) => {
            if (response.status == 200) {
              const { id } = response.data;
              if (id) {
                this.props.showNotification('保存成功！');              
                this.props.history.push(`/courses/${cid}/graduation_topics/${this.state.left_banner_id}`);
              }
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          const url = `/courses/${cid}/graduation_topics.json`
          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response.id
            })
          }
          
          axios.post(url, {
            graduation_topic:{
              ...values,
              province: values.city==undefined?"":values.city[0],
              city: values.city==undefined?"":values.city[1],
            },
            attachment_ids,
          }).then((response) => {
            if (response.data) {
              const { id } = response.data;
              if (id) {
                this.props.showNotification('提交成功！');              
                this.props.history.push(`/courses/${cid}/graduation_topics/${this.state.left_banner_id}`);
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      } else {
        $("html").animate({ scrollTop: $('html').scrollTop() - 100 })
      }
    });
  }

  // 选择省市
  ChangeCity=(value, selectedOptions)=>{
    console.log(selectedOptions);
  }

  // 附件相关 START
  handleChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;
      this.setState({ fileList });
    }
  }
  onAttachmentRemove = (file) => {

		if(!file.percent || file.percent == 100){
			this.props.confirm({
				content: '确定要删除这个附件吗?',
				okText: '确定',
				cancelText: '取消',
				// content: 'Some descriptions',
				onOk: () => {
					this.deleteAttachment(file)
				},
				onCancel() {
					console.log('Cancel');
				},
			});
			return false;
		}

  }
  deleteAttachment = (file) => {
    console.log(file);
    let id=file.response ==undefined ? file.id : file.response.id
    const url = `/attachments/${id}.json`
    axios.delete(url, {
    })
      .then((response) => {
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

  // 附件相关 ------------ END

  changeTopicName=(e)=>{
    // let num= 60 - parseInt(e.target.value.length);
    this.setState({
      addonAfter:e.target.value.length
    })
  }
  render() {
    let {
      fileList,
      teacherList,
      topic_property_first,
      topic_property_second,
      topic_repeat,
      topic_source,
      topic_type,
      addonAfter,
      left_banner_id,
      course_name,
      left_banner_name
    } = this.state;
    const { current_user } = this.props
    const { getFieldDecorator } = this.props.form;
    let{ topicId,coursesId }=this.props.match.params
    // console.log(this.props);

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
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action:  `${getUploadActionUrl()}`,
      onChange: this.handleChange,
      onRemove: this.onAttachmentRemove,
      beforeUpload: (file) => {
        console.log('beforeUpload', file.name);
        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          this.props.showNotification('文件大小必须小于150MB!');
        }
        return isLt150M;
      },
    };
    // console.log("dfsf");
    // console.log(this.props);
	  document.title=course_name===undefined?"":course_name;
    return(
        <div className="newMain ">
          <style>{`
          .courseForm .ant-form-item-label{
            margin-left:unset!important
          }
          `}</style>
          <div className="edu-class-container edu-position courseForm">
            <p className="clearfix mb20 mt10">
              <WordsBtn style="grey" className="fl" to={current_user&&current_user.first_category_url}>{course_name}</WordsBtn>
              <span className="color-grey-9 fl ml3 mr3">&gt;</span>
              <WordsBtn style="grey" className="fl" to={`/courses/${coursesId}/graduation_topics/${left_banner_id}`}>{left_banner_name}</WordsBtn>
              <span className="color-grey-9 fl ml3 mr3">&gt;</span>
              <span>{topicId==undefined?"新建":"编辑"}</span>
            </p>
            <div className="clearfix mb20 lineh-25">
              <p className="fl color-black summaryname">{topicId==undefined?"新建":"编辑"}毕设选题</p>
              <Link to={`/courses/${coursesId}/graduation_topics/${left_banner_id}`} className="color-grey-6 fr font-16">返回</Link>
            </div>

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <div className="createPage">
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
                  max: 5000, message: '最大限制为5000个字符',
                }],
              })(
                <TPMMDEditor ref={this.mdRef} placeholder={'请简要说明选题内容，最大限制5000个字符'}
                  mdID={'courseMessageMD'} initValue={this.editTopic ? this.editTopic.content : ''} className="courseMessageMD"></TPMMDEditor>
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
                    initialValue: this.state.cityDefaultValue,
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
                  <a className="defalutCancelbtn fl" onClick={()=>this.props.history.goBack()}>取消</ a>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
    }
}

const WrappedGraduateTopicNew = Form.create({ name: 'topicPostWorksNew' })(GraduateTopicNew);
// RouteHOC()
export default (WrappedGraduateTopicNew);