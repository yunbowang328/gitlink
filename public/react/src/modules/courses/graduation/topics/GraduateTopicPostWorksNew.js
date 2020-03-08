import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal
} from 'antd';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import {getUrl,getUploadActionUrl} from 'educoder';
import "../../common/formCommon.css"

// import './board.css'
// import { RouteHOC } from './common.js'

const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;
// 提交作品
// https://lanhuapp.com/web/#/item/project/board/detail?pid=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&project_id=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&image_id=c6d9b36f-7701-4035-afdb-62404681108c
class GraduateTopicPostWorksNew extends Component{
  constructor(props){
    super(props);

    this.mdRef = React.createRef();

    this.state = {
      fileList: [],
      boards: []
    }
  }
  componentDidMount = () => {
    
    const topicId = this.props.match.params.topicId

    const cid = this.props.match.params.coursesId
    const boardsUrl = `/courses/${cid}/get_all_boards.json`
    axios.get(boardsUrl, { })
    .then((response) => {
      if (response.data.status == 0) {
        this.setState({
          boards: response.data.data
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    const isEdit = !!topicId
    this.isEdit = isEdit
    if (isEdit) {
      const url = `/messages/${topicId}.json`
      axios.get(url, {
      })
        .then((response) => {
          if (response.data.status == 0) {
            const { id, data } = response.data;
            if (data) {
              this.editTopic = data;
              this.props.form.setFieldsValue({
                content: data.content,
                subject: data.subject,
                board_id: data.board_id 
              });
              this.mdRef.current.setValue(data.content)
              const _fileList = data.attachments.map(item => {
                return {
                  id: item.id,
                  uid: item.id,
                  name: item.title,
                  url: item.url,
                  status: 'done'
                }
              })
              this.setState({ fileList: _fileList})
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
    const boardId = this.props.match.params.boardId

      this.props.form.setFieldsValue({
        board_id: parseInt(boardId)
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const cid = this.props.match.params.coursesId
    const boardId = this.props.match.params.boardId

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.isEdit == true)  {
          const editTopic = this.editTopic
          const editUrl = `/messages/${editTopic.id}.json`

          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response ? item.response.id : item.id
            })
          }
          axios.put(editUrl, {
            subject: values.subject,
            board_id: values.board_id,
            content: values.content,
            sticky: values.sticky,
            attachment_ids,
            // board_id: 3779,
          })
            .then((response) => {
              if (response.data.status == 0) {
                const { id } = response.data;
                console.log('--- success')

                this.props.toDetailPage(cid, values.board_id, editTopic.id)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          const url = `/messages.json`
          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response.id
            })
          }
          
          axios.post(url, {
            ...values,
            course_id: cid,
            board_id: boardId,
            attachment_ids,
          })
            .then((response) => {
              if (response.data) {
                const { id } = response.data;
                if (id) {
                  console.log('--- success')
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
  // 附件相关 START
  handleChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;
      this.setState({ fileList });
    }
  }
  onAttachmentRemove = (file) => {
		if(!file.percent || file.percent == 100){
			confirm({
				title: '确定要删除这个附件吗?',
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
    const url = `/attachments/${file.id}.json`
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
  render() {
    let { addGroup, fileList } = this.state;
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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const uploadProps = {
      width: 600,
      fileList,
      multiple: true,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: `${getUploadActionUrl()}`,
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
    return(
        <div className="newMain ">
          <style>{`
            .courseForm .ant-form {
            }
            
          `}</style>
          <div className="edu-class-container edu-position courseForm">

            <div style={{ width:'100%',height:'70px'}} >
              <p className="ml15 fl color-black mt30 summaryname">提交作品</p>
              <a onClick={()=>this.props.history.goBack()}  className="color-grey-6 fr font-16 ml30 mt18 mr20">返回</a>
            </div>

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <div className="formBlock" style={{paddingBottom: '0px'}}>
                <Form.Item
                  label="标题"
                >
                  {getFieldDecorator('subject', {
                    rules: [{
                      required: true, message: '请输入标题',
                    }, {
                      max: 20, message: '最大限制为20个字符',
                    }],
                  })(
                    <Input placeholder="请输入帖子标题，最大限制20个字符" />
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
                }
                
              `}</style>

              <div className="formBlock">

              <Form.Item
                label="内容"
                className="mdInForm"
              >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: '请输入帖子内容',
                }, {
                  max: 10000, message: '最大限制为10000个字符',
                }],
              })(
                <TPMMDEditor ref={this.mdRef} placeholder={'请在此输入帖子详情，最大限制为10000个字符'}
                    mdID={'courseMessageMD'} initValue={this.editTopic ? this.editTopic.content : ''} className="courseMessageMD"></TPMMDEditor>
              )}
              </Form.Item>

              <Upload {...uploadProps} className="upload_1">
                <Button className="uploadBtn">
                  <Icon type="upload" /> 上传附件
                </Button>
                (单个文件150M以内)
              </Upload>
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
              `}</style>
              <div className="formBlock flexBlock" style={{ }} >
                <Form.Item
                  label="分组设置"
                  className=" "
                  style={{ display: 'inline-block', marginLeft: "14px" }}
                >
                  {getFieldDecorator('min', {
                    rules: [{
                      required: true, message: '请输入每组最小人数',
                    }],
                  })(
                    <Input placeholder="请填写每组最小人数" />
                  )}
                </Form.Item>

                <span className="tag">~</span>

                <Form.Item
                  label=""
                  className="  "
                  style={{ }}
                >
                  {getFieldDecorator('max', {
                    rules: [{
                      // required: true, message: '请输入每组最大人数',
                    }],
                  })(
                    <Input placeholder="请填写每组最大人数" />
                  )}
                </Form.Item>

                <span className="tag color-grey9 ">(学生提交作品时需要关联同组成员，组内成员作品共享)</span>
                <Form.Item
                  label=""
                  className="  "
                  style={{ marginLeft: "14px" }}
                >
                  {getFieldDecorator('c', {
                    rules: [],
                  })(
                    <Checkbox >基于项目实施</Checkbox>
                  )}
                </Form.Item>
                <span className="tag color-grey9 ">(选中，则必须在本平台创建项目，项目管理员可以提交作品；不选中，无需在平台创建项目，任意小组成员均可以提交作品)</span>
              </div>

              <div className="formBlock">
                <Form.Item
                  label="参考答案"
                >
                {getFieldDecorator('answer', {
                  rules: [{
                    required: true, message: '请输入帖子内容',
                  }, {
                    max: 10000, message: '最大限制为10000个字符',
                  }],
                })(
                  <TPMMDEditor ref={this.mdRef} placeholder={'请在此输入参考答案，最大限制为5000个字符'}
                      mdID={'courseAnswerMD'} initValue={this.editTopic ? this.editTopic.content : ''} className="courseMessageMD"></TPMMDEditor>
                )}
                </Form.Item>
              </div>  

              <Form.Item>
                <div className="clearfix mt30 mb30">
                  <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20">提交</Button>
                  <a className="defalutCancelbtn fl">取消</ a>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
    }
}

const WrappedGraduateTopicPostWorksNew = Form.create({ name: 'topicPostWorksNew' })(GraduateTopicPostWorksNew);
// RouteHOC()
export default (WrappedGraduateTopicPostWorksNew);