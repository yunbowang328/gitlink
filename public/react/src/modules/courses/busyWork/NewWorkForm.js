import React,{ Component } from "react";
import { Input, InputNumber, Form, Button, Checkbox, Upload, Icon, message, Modal } from "antd";
import axios from 'axios'
import '../css/busyWork.css'
import '../css/Courses.css'
import {getUploadActionUrl, ConditionToolTip, appendFileSizeToUploadFile, appendFileSizeToUploadFileAll } from 'educoder'
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import CBreadcrumb from '../common/CBreadcrumb'

const confirm = Modal.confirm;
const $ = window.$
const MAX_TITLE_LENGTH = 60;

/** 
    需要注意的props
    isGroup
*/ 
class NewWorkForm extends Component{
  constructor(props){
    super(props);
    this.contentMdRef = React.createRef();
    this.answerMdRef = React.createRef();
    
    this.state={
      title_value:"",
      title_num: 0,
      contentFileList: [],
      answerFileList: [],
      workLoaded: false,
      base_on_project: true,
      category: {},
      min_num: 2,
      max_num: 10,
    }
  }
  initValue = (data) => {
      if (data.isEdit) {
        const contentFileList = data.attachments.map(item => {
          return {
            id: item.id,
            uid: item.id,
            name: appendFileSizeToUploadFile(item),
            url: item.url,
            filesize: item.filesize,
            status: 'done'
          }
        })
        const answerFileList = data.ref_attachments.map(item => {
          return {
            id: item.id,
            uid: item.id,
            name: appendFileSizeToUploadFile(item),
            url: item.url,
            filesize: item.filesize,
            status: 'done'
          }
        })

        this.setState({
          ...data,
          // course_id: data.course_id,
          // course_name: data.course_name,
          // category: data.category,
          title_num: parseInt(data.name.length),
          workLoaded: true,
          init_min_num: data.min_num,
          init_max_num: data.max_num,
          // description: data.description,
          reference_answer: data.reference_answer,
          contentFileList,
          answerFileList,
        }, () => {
          // setTimeout(() => {
          //   this._scrollToTop()
            // 阻止setValue的滚动
            // $(window).scroll( function() { 
            //   $("html").scrollTop(0)
            //   $(window).unbind("scroll");
            // });
            /**
              setValue会调用到 codemirror的 o.scrollIntoView(i),  会导致滚动条跳动
             */
            // $('.editormd').parent().css('position', 'fixed').css('left', '-1000px')
            // this.contentMdRef.current.setValue(data.description || '')
            // this.answerMdRef.current.setValue(data.reference_answer || '')
            // setTimeout(() => {
            //     $('.editormd').parent().css('position', '').css('left', 'auto')
            // }, 100);
          // }, 500)
          
          this.props.form.setFieldsValue({
            title: data.name,
            description: data.description || '',
            reference_answer: data.reference_answer || '',
          });
          
        })
      } else { // new

      }
    // this._scrollToTop()
  }
  _scrollToTop = () => {
    // setTimeout(() => {
      $("html").scrollTop(0)
      // $("html").animate({ scrollTop: 0 })
    // }, 1000)
  }

  // 输入title
  changeTitle=(e)=>{

    this.setState({
      title_num: parseInt(e.target.value.length)
    })
  }


  handleSubmit = () => {
    const courseId = this.state.course_id || this.props.match.params.coursesId ;
    
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(err && err.personNum) delete err.personNum;

      const mdContnet = this.contentMdRef.current.getValue().trim();

      values.description = mdContnet;
      // return;
      
      {/* max={has_commit ? init_min_num : null } */}
      {/* min={has_commit ? init_max_num : (min_num == undefined ? 2 : min_num + 1) }  */}
      // 已有提交作品，人数范围只能扩大
      const { has_commit, max_num, init_max_num, min_num, init_min_num } = this.state;
      const isGroup = this.props.isGroup()
      if (isGroup) {
        if (!min_num) {
          this.props.showNotification('最小人数不能为空');
          this.props.scrollToAnchor("numberofgroups");
          return;
        } else if (min_num < 1) {
          this.props.showNotification('最小人数不能小于1');
          this.props.scrollToAnchor("numberofgroups");
          return;
        } else if (!max_num) {
          this.props.showNotification('最大人数不能为空');
          this.props.scrollToAnchor("numberofgroups");
          return;
        } else if (max_num < min_num) {
          this.props.showNotification('最大人数不能小于最小人数');
          this.props.scrollToAnchor("numberofgroups");
          return;
        } 
        
        if (has_commit) {
          if (max_num < init_max_num || min_num > init_min_num) {
            this.props.showNotification(`已有提交作品，人数范围只能扩大(原设置为：${init_min_num} - ${init_max_num})`)
            return;
          }
        }
      }

      // const errKeys = Object.keys(err);  // || errKeys.length == 1 && errKeys[0] == 'content' && mdContnet
      if (!err || Object.keys(err).length == 0) {
        if (this.state.isEdit) {
          this.doEdit(courseId, values)
        } else {
          this.doNew(courseId, values)
        }
       
      } else {
        $("html").animate({ scrollTop: $('html').scrollTop() - 100 })
      }
    })
  }
  doEdit = (courseId, values) => {
    let attachment_ids = this.state.contentFileList.map(item => {
      return item.response ? item.response.id : item.id
    })
    let reference_attachment_ids = this.state.answerFileList.map(item => {
      return item.response ? item.response.id : item.id
    })

    const { min_num, max_num, base_on_project, category } = this.state
    const isGroup = this.props.isGroup()

    const params = {
      type: isGroup ? 3 : 1,
      name: values.title,
      description: values.description,
      reference_answer: values.reference_answer, 
      attachment_ids,
      reference_attachment_ids,

      min_num,
      max_num,
      base_on_project
    }
    this.props.doEdit && this.props.doEdit(params)
  }
  doNew = (courseId, values) => {
    let attachment_ids = this.state.contentFileList.map(item => {
      return item.response ? item.response.id : item.id
    })
    let reference_attachment_ids = this.state.answerFileList.map(item => {
      return item.response ? item.response.id : item.id
    })
    const isGroup = this.props.isGroup()
    const { min_num, max_num, base_on_project, category } = this.state
    
    const params = {
      type: isGroup ? 3 : 1,
      name: values.title,
      description: values.description,
      reference_answer: values.reference_answer, 
      attachment_ids,
      reference_attachment_ids,

      min_num,
      max_num,
      base_on_project
    }
    this.props.doNew && this.props.doNew(params)
    
  }

  handleContentUploadChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let contentFileList = info.fileList;
      this.setState({ contentFileList: appendFileSizeToUploadFileAll(contentFileList) });
    }
  }
  handleAnswerUploadChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let answerFileList = info.fileList;
      this.setState({ answerFileList: appendFileSizeToUploadFileAll(answerFileList) });
    }
  }
  
  onAttachmentRemove = (file, stateName) => {
    if(!file.percent || file.percent == 100){
      this.props.confirm({
        content: '是否确认删除?',
        
        onOk: () => {
          this.deleteAttachment(file, stateName)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    return false;
  }
  deleteAttachment = (file, stateName) => {
    // 初次上传不能直接取uid
    const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
    axios.delete(url, {
    })
      .then((response) => {
        if (response.data) {
          const { status } = response.data;
          if (status == 0) {

            
            this.setState((state) => {
              const index = state[stateName].indexOf(file);
              const newFileList = state[stateName].slice();
              newFileList.splice(index, 1);
              return {
                [stateName]: newFileList,
              };
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  max_num_change = (val) => {
    // if (val < 2) {
    //   // this.setState({
    //   //   max_num: 2,
    //   // })
    //   return;
    // }
    const { min_num } = this.state;
    this.setState({ 
      max_num: val,
      // min_num: val <= min_num ? val - 1 : min_num
    })
  }
  personNumValidator = (rule, value, callback) => {
    const { min_num, max_num } = this.state;
    const form = this.props.form;
    if (!min_num) {
      callback('最小人数不能为空');
    } else if (min_num < 1) {
      callback('最小人数不能小于1');
    } else if (!max_num) {
      callback('最大人数不能为空');
    } else if (max_num < min_num) {
      callback('最大人数不能小于最小人数');
    } else {
      callback();
    }
  }
  min_num_change = (val) => {
    this.setState({ min_num: val })
  }
  base_on_project_change = () => {
    this.setState({ base_on_project: !this.state.base_on_project })
  }
  componentDidMount() {
    window.$('.groupSetting .ant-form-item-label > label').addClass('ant-form-item-required')
    this._scrollToTop()
  }
  
  render(){
    let {typeId,coursesId,pageType}=this.props.match.params;
    const { getFieldDecorator } = this.props.form;
    const isGroup = this.props.isGroup()
    let{
      title_value, contentFileList, answerFileList, max_num, min_num, base_on_project,
      init_max_num, init_min_num, 
      title_num, course_name, category, has_commit, has_project
    }=this.state
    const { current_user } = this.props

    const courseId = this.state.course_id || this.props.match.params.coursesId ;    
    this.isEdit = this.isEdit || this.props.match.url.indexOf('/edit') != -1
    if ((this.isEdit) && !this.state.description && this.state.description != '') {
      return ''
    } 
    const uploadProps = {
      width: 600,
      fileList: contentFileList,
      multiple: true,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleContentUploadChange,
      onRemove: (file) => this.onAttachmentRemove(file, 'contentFileList'),
      beforeUpload: (file) => {

        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          this.props.showNotification('文件大小必须小于150MB!');
        }
        return isLt150M;
      },
    };
    const answerUploadProps = {
      width: 600,
      fileList: answerFileList,
      multiple: true,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleAnswerUploadChange,
      onRemove: (file) => this.onAttachmentRemove(file, 'answerFileList'),
      beforeUpload: (file) => {

        const isLt150M = file.size / 1024 / 1024 < 150;
        if (!isLt150M) {
          this.props.showNotification('文件大小必须小于150MB!');
        }
        return isLt150M;
      },
    };

    return(
      <React.Fragment>
          
            <style>
              {
                `
                .yslnewworkinputaddonAfter .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
              }
            </style>
            <Form className="courseForm">
              <Form.Item
                label="标题"
                className="AboutInputForm"
              > 
              {getFieldDecorator('title', {
                  rules: [{
                    required: true, message: '请输入标题'
                  }],
                })(
                  <Input placeholder="请输入作业标题，最大限制60个字符" onInput={this.changeTitle} className="searchView yslnewworkinputaddonAfter searchViewAfter" style={{"width":"100%"}} maxLength={MAX_TITLE_LENGTH} addonAfter={`${String(title_num)}/${MAX_TITLE_LENGTH}`}/>
                )}
              </Form.Item>
              <style>{`
                .uploadBtn.ant-btn {
                  border: none;
                  color: #4CACFF;
                  box-shadow: none;
                  background: transparent;
                  padding: 0 6px;
                }
                .ant-upload-list-item:hover .ant-upload-list-item-info{
                  background-color:#fff;
                }
                .upload_1 .ant-upload-list {
                  width: 350px;
                }
                
                .ant-input-number {
                  height: 40px;
                  line-height: 40px;
                }

                .workContent.AboutInputForm.ant-form-item {
                  border-bottom: none;
                  padding-bottom: 0px !important;
                }
                .newWorkUpload {
                  padding: 0px 30px 30px 30px!important;
                  background: #fff;
                  width: 100%;
                  display: inline-block;
                  border-bottom: 1px solid #EDEDED;
                }
                .courseForm .AboutInputForm.clearPaddingBottom{
                  padding-bottom:0px!important;
                }
                .clearPaddingBottom .ant-form-explain{
                  position:absolute;
                  bottom:0px;
                  left:0px
                }

                .resetNewWorkUpload{
                  border-bottom:none!important;
                }
                
              `}</style>


              {  <Form.Item
                label="内容"
                className="AboutInputForm workContent mdInForm"
              > 
                {getFieldDecorator('description', {
                  rules: [{
                    required: true, message: '请输入作业内容和要求',
                  },{
                    max: 5000 , message:'最大限制5000个字符'
                  }],
                })(
                  <TPMMDEditor ref={this.contentMdRef} placeholder="请在此输入作业内容和要求,最大限制5000个字符" mdID={'courseContentMD'} refreshTimeout={1500} 
                    initValue={this.state.description} noSetValueOnInit={!!this.isEdit}
                    className="courseMessageMD" ></TPMMDEditor>
                )}
              </Form.Item> }
              <Upload {...uploadProps} className="upload_1 newWorkUpload">
                <Button className="uploadBtn">
                  <Icon type="upload" /> 上传附件
                </Button>
                (单个文件150M以内)
              </Upload>
              <span id={"numberofgroups"}></span>

              { isGroup && 
                <Form.Item
                  label="分组设置"
                  className="AboutInputForm groupSetting"
                > 
                {getFieldDecorator('personNum', {
                    validateTrigger: 'onNone',
                    // rules: [{
                      // required: true,
                      // message: '人数不能为空'
                      // validator: this.personNumValidator
                      // required: true, message: '请输入最小人数和最大人数'
                    // }],
                  })(
                    <div >
                      <p className="clearfix">
                        <ConditionToolTip condition={has_commit} title={'已有提交作品，人数范围只能扩大'}>
                        {/* max={has_commit ? init_min_num : null } */}
                          <InputNumber placeholder="请填写每组最小人数" min={1} className="winput-240-40" value={min_num} 
                              
                              onChange={this.min_num_change} style={{width:'180px'}} />
                        </ConditionToolTip>
                        
                        <span className="ml15 mr15">~</span>
                        {/* min={has_commit ? init_max_num : (min_num == undefined ? 2 : min_num + 1) }  */}
                        <ConditionToolTip condition={has_commit} title={'已有提交作品，人数范围只能扩大'}>
                          <InputNumber className="winput-240-40" placeholder="请填写每组最大人数" value={max_num} max={10}
                              onChange={this.max_num_change} style={{width:'180px'}} />
                        </ConditionToolTip>
                        <label className="color-grey-9 ml20 font-14">（学生提交作品时需要关联同组成员，组内成员作品共享）</label>
                      </p>
                      <p className="mt20">
                        <ConditionToolTip condition={has_commit || has_project} title={'已有关联项目或作品，不能修改'}>
                          <Checkbox checked={base_on_project} onChange={this.base_on_project_change}
                              disabled={has_project || has_commit}
                          >基于项目实施</Checkbox>
                        </ConditionToolTip>
                        
                        <label className="color-grey-9 ml12 font-14">（选中，则必须在本平台创建项目，项目管理员可以提交作品；不选中，无需在平台创建项目，任意小组成员均可以提交作品）</label>
                      </p>
                    </div>
                  )}
                  
                </Form.Item>
              }

              <div className="edu-back-white">
                <Form.Item
                  label="参考答案"
                  className="AboutInputForm clearPaddingBottom pr"
                  style={{"borderBottom":"none"}}
                > 
                  {getFieldDecorator('reference_answer', {
                    rules: [{
                      max: 5000 , message:'最大限制5000个字符'
                    }],
                  })(
                    <TPMMDEditor ref={this.answerMdRef} placeholder="请在此输入作业的参考答案,最大限制5000个字符" mdID={'workAnswerMD'} 
                        initValue={this.state.reference_answer || ''} noSetValueOnInit={!!this.isEdit}
                        className="courseMessageMD" refreshTimeout={1500} ></TPMMDEditor>
                  )}
                </Form.Item>
                <Upload {...answerUploadProps} className="upload_1 newWorkUpload resetNewWorkUpload">
                  <Button className="uploadBtn">
                    <Icon type="upload" /> 上传附件
                  </Button>
                  (单个文件150M以内)
                </Upload>
              </div>
              <Form.Item>
                <div className="clearfix mt30 mb30">
                {/*  htmlType="submit"   */}
                  <Button type="primary" onClick={this.handleSubmit} className="defalutSubmitbtn fl mr20">提交</Button>
                  <a className="defalutCancelbtn fl" onClick={() => this.props.onCancel()}>取消</ a>
                </div>
              </Form.Item>
            </Form>
            
      </React.Fragment>
    )
  }
}
const WrappedWorkForm = Form.create({ name: 'NewWorkForm' })(NewWorkForm);
export default WrappedWorkForm;