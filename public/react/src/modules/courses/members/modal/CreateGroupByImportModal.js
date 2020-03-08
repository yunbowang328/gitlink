import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin, Upload, Divider, Icon  } from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"

import { ConditionToolTip, getUploadActionUrl } from 'educoder'

const { Dragger } = Upload;



class CreateGroupByImportModal extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  fetchMemberList = (arg_page) => {
  }
  componentDidMount() {
    
    
  }
  onSendOk = () => {
    const courseId = this.props.match.params.coursesId    
    
    let url = `/courses/${courseId}/create_group_by_importing_file.json`
    let { fileList } =this.state;

    if (!fileList || fileList.length == 0) {
        // this.props.showNotification('请先上传附件')
        this.setState({
            errorTip :'请先上传附件',
        })
        return;
    }
    let newfileList=[];
    if(fileList!=undefined&&fileList.length>0) {
      for (var list of fileList) {
        newfileList.push(list.response.id)
      }
    }
    axios.post(url, {
        attachment_ids: newfileList
    })
    .then((response) => {
      if (response.data.status == 0) {
          this.props.showNotification(response.data.message)
          this.props.createGroupImportSuccess && this.props.createGroupImportSuccess()
          this.setVisible(false)
      } else {
          
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  setVisible = (visible) => {
    if (visible) {
        this.setState({ fileList: [] });    
    }
    this.refs.modalWrapper.setVisible(visible)
    
  }
  handleChange = (info) => {
    let fileList = info.fileList;
    console.log(fileList)
    this.setState({ fileList });
  }

  onOk = () => {
    this.onSendOk()
  }

  onAttachmentRemove = (file) => {
		if(!file.percent || file.percent == 100){
			this.props.confirm({
				content: '是否确认删除?',

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
    const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
    axios.delete(url, {
    })
      .then((response) => {
        if (response.data) {
          // const { status } = response.data;
          if (response.data.status === 0) {

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

  render(){
    const { candidates, checkBoxValues, loading, hasMore, name, school_name, school_names
        , graduationGroup, graduation_groups, courseGroup, course_groups , fileList } = this.state
    const { moduleName } = this.props
    
    const props = {
        name: 'file',
        multiple: true,
        fileList:fileList,
        action: getUploadActionUrl(),
        onRemove: this.onAttachmentRemove,
        onChange: this.handleChange
    };
    return(
      <ModalWrapper
        ref="modalWrapper"
        width="700px"
        title={`导入创建分班`}
        {...this.props }
        onOk={this.onOk}
        className="createGroupByImport"
      >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到这里上传</p>
        <p className="ant-upload-hint">
          单个文件最大150MB
        </p>
      </Dragger>
      </ModalWrapper>
    )
  }
}
export default CreateGroupByImportModal;
