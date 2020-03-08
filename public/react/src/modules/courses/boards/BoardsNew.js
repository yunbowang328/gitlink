import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Divider,Tooltip
} from 'antd';
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import './board.css'
import "../common/formCommon.css"
import AddDirModal from './AddDirModal'
import { RouteHOC } from './common.js'
import CBreadcrumb from '../common/CBreadcrumb'
import {getUploadActionUrl, bytesToSize, uploadNameSizeSeperator, appendFileSizeToUploadFile, appendFileSizeToUploadFileAll} from 'educoder';

const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;
const MAX_TITLE_LENGTH = 60
// https://lanhuapp.com/web/#/item/project/board/detail?pid=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&project_id=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&image_id=71072679-b925-4824-aceb-4649535e3652
class BoardsNew extends Component{
  constructor(props){
    super(props);

    this.mdRef = React.createRef();

    this.state = {
      fileList: [],
      boards: [],
      title_num: 0,
			email_notify:false,
			isemail_notify:false,
			isemail_notifys:false
    }
  }
  addSuccess = () => {
    this.fetchBoards()
  }
  fetchBoards = () => {
    const isEdit = this.isEdit
    const boardId = this.props.match.params.boardId

    const boardsUrl = `/courses/board_list.json?board_id=${boardId}`
    axios.get(boardsUrl, { })
    .then((response) => {
      if (response.data.status == 0) {
        this.setState({
          boards: response.data.data.boards || [],
					boardsdata:response.data.data,
          course_id: response.data.data.course_id
        })
        if (!isEdit) {
          response.data.data.boards.forEach( board => {
            if (board.id == boardId) {
              this.setState({ board_name: board.name })
            }
          })
          // board_name
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount = () => {
    
    const topicId = this.props.match.params.topicId
    const isEdit = !!topicId
    this.isEdit = isEdit

    const boardId = this.props.match.params.boardId
    
    this.fetchBoards()

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
                sticky: !!data.sticky,
                content: data.content,
                subject: data.subject,
                select_board_id: data.board_id // TODO 没返回给前端
              });
              this.mdRef.current.setValue(data.content)
              const _fileList = data.attachments.map(item => {
                return {
                  id: item.id,
                  uid: item.id,
                  name: appendFileSizeToUploadFile(item),
                  url: item.url,
                  status: 'done'
                }
              })
          
              this.setState({ fileList: _fileList, board_name: data.board_name, title_num: parseInt(data.subject.length) ,isemail_notifys:response.data.data.email_notify})
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const boardId = this.props.match.params.boardId

      this.props.form.setFieldsValue({
        select_board_id: parseInt(boardId)
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const cid = this.state.course_id
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
            select_board_id: values.select_board_id,
            content: values.content,
            sticky: values.sticky,
						email_notify:this.state.isemail_notify,
            attachment_ids,
          })
            .then((response) => {
              if (response.data.status == 0) {
                const { id } = response.data;
                console.log('--- success')

                this.props.toDetailPage(cid, values.select_board_id, editTopic.id)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          const url = `/boards/${boardId}/messages.json`
          let attachment_ids = undefined
          if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
              return item.response.id
            })
          }
          
          axios.post(url, {
            ...values,
						email_notify:this.state.isemail_notify,
            course_id: cid,
            attachment_ids,
          })
            .then((response) => {
              if (response.data.data && response.data.status == 0) {
                const { id } = response.data.data;
                if (id) {
                  console.log('--- success')
                  this.props.toDetailPage(cid, values.select_board_id, id)
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
      this.setState({ fileList: appendFileSizeToUploadFileAll(fileList) });
    }
  }
  onAttachmentRemove = (file) => {
		if(!file.percent || file.percent == 100){
			this.props.confirm({
				// title: '确定要删除这个附件吗?',
				content: '是否确认删除?',

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
    // 初次上传不能直接取uid
    const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
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
  changeTitle=(e)=>{
    console.log(e.target.value.length);
    this.setState({
      title_num: parseInt(e.target.value.length)
    })
  }
  goBack = () => {
    // this.props.history.goBack()
    const courseId=this.props.match.params.coursesId;
    const boardId = this.props.match.params.boardId
    this.props.toListPage(courseId, boardId)
  }

	setemailchange=(e)=>{
  	this.setState({
			isemail_notify:e.target.checked
		})
	}
  render() {
    let { addGroup, fileList, course_id, title_num } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { current_user } = this.props

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
    const isAdmin = this.props.isAdmin()
    const courseId=this.props.match.params.coursesId;
    const boardId = this.props.match.params.boardId
    const isCourseEnd = this.props.isCourseEnd();
		document.title=this.props.coursedata&&this.props.coursedata.name;

		// console.log(this.state)
    return(
        <div className="newMain ">
          <AddDirModal {...this.props}
            title="新建目录"
            label="目录名称"
            ref="addDirModal"
            addSuccess={this.addSuccess}
          ></AddDirModal>
          <style>{`
            .courseForm .ant-form {
            }
            .courseForm .formBlock {
              padding: 20px 30px 30px 30px;
              border-bottom: 1px solid #EDEDED;
              margin-bottom: 0px;
              background: #fff;
            }
            .courseForm .noBorder {
              border-bottom: none;
            }
            
          `}</style>
          <div className="edu-class-container edu-position courseForm">
            <CBreadcrumb items={[
              { to: current_user&&current_user.first_category_url, name: this.props.coursedata ? this.props.coursedata.name : ''},
              { to: `/courses/${courseId}/boards/${boardId}`, name: this.state.board_name },
              { name: this.isEdit ? '帖子编辑' : '帖子新建'}
            ]}></CBreadcrumb>

            <p className="clearfix mt20 mb20">
              <span className="fl font-24 color-grey-3">{this.isEdit ? "编辑" : "新建"}帖子</span>
              <a href="javascript:void(0)" className="color-grey-6 fr font-16 mr2" 
                  onClick={this.goBack}>
                返回
              </a>
            </p>
            {/* notRequired */}
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <div className="formBlock" style={{paddingBottom: '0px', position: 'relative'}}>
								{this.state.boardsdata&&this.state.boardsdata.email_notify===true?this.props.isAdminOrTeacher()===true?<Tooltip placement="bottom" title={this.state.isemail_notifys===true?"邮件只能发送一次":""}><span className={"setemail fr mr70 setemailposition"}>
										<Checkbox onChange={this.setemailchange} checked={this.state.isemail_notifys===true?this.state.isemail_notifys:this.state.isemail_notify} disabled={this.state.isemail_notifys}>发送邮件提醒</Checkbox>
								</span></Tooltip>:"":""}

                {  isAdmin && 
                    <React.Fragment>
                      {getFieldDecorator('sticky', {
                        valuePropName: 'checked',
                      })(
                        isAdmin && <Checkbox style={{ right: '22px',
                          top: '17px',
                          position: 'absolute'
                        }}>置顶</Checkbox>
                      )}
                      {/* checkbox 有个边距样式 .ant-checkbox-wrapper + span, */}
                      <span style={{ "padding-left": 0, "padding-right": 0 }}></span>
                    </React.Fragment>
                  }
                <style>
                  {
                    `
                .yslboardsnewinputaddonAfter .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
                  }
                </style>
                <Form.Item
                  label="标题"
                  className="topicTitle "
                >
                  
                  {getFieldDecorator('subject', {
                    rules: [{
                      required: true, message: '请输入标题',
                    }, {
                      max: MAX_TITLE_LENGTH, message: `最大限制为${MAX_TITLE_LENGTH}个字符`,
                    }],
                  })(
                    <Input placeholder={`请输入帖子标题，最大限制${MAX_TITLE_LENGTH}个字符 `}className="searchViewAfter yslboardsnewinputaddonAfter" maxLength={MAX_TITLE_LENGTH}
                      onInput={this.changeTitle} addonAfter={`${title_num}/${MAX_TITLE_LENGTH}`} />
                  )}
                </Form.Item>

                <Form.Item
                  label=""
                  style={{ display: 'inline-block' }}
                >
                  {getFieldDecorator('select_board_id', {
                    // initialValue: '3779',
                  })(
                    <Select style={{ width: 230 }}
                      dropdownRender={menu => (
                        <div>
                          {menu}
                          {
                            isAdmin && !isCourseEnd && 
                            <React.Fragment>
                              <Divider style={{ margin: '4px 0' }} />
                              <div style={{ padding: '8px', cursor: 'pointer' }} onMouseDown={() => this.refs['addDirModal'].open()}>
                                <Icon type="plus" /> 新建目录
                              </div>
                            </React.Fragment>
                          }
                        </div>
                      )}
                    >
                      {this.state.boards.map(item => {
                        return (
                          <Option value={item.id}>{item.name}</Option>
                        )
                      })}
                    </Select>
                  )}
                </Form.Item>



                {/* { isAdmin && <Form.Item
                  label=""
                  style={{ display: 'inline-block', marginLeft: "14px" }}
                >
                  {getFieldDecorator('sticky', {
                  })(
                    <Checkbox>置顶</Checkbox>
                  )}
                </Form.Item> } */}
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

              <div className="formBlock noBorder">

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
              
              <Form.Item>
                <div className="clearfix mt30 mb30">
                  <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20">提交</Button>
                  <a className="defalutCancelbtn fl" 
                    onClick={() => this.isEdit ? 
                      this.props.toDetailPage(Object.assign({}, this.props.match.params, {'coursesId': course_id})) : 
                      this.props.toListPage(Object.assign({}, this.props.match.params, {'coursesId': course_id})) }>取消</ a>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
    }
}

const WrappedBoardsNew = Form.create({ name: 'boardsNew' })(BoardsNew);
export default RouteHOC()(WrappedBoardsNew);