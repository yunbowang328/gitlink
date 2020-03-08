import React , { Component } from "react";
import { Upload, Button, Icon } from 'antd';
import { getUploadActionUrl, appendFileSizeToUploadFileAll } from 'educoder';

import axios from 'axios';
const { Dragger } = Upload;
class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      fileList:undefined,
    }
  }

  onAttachmentRemove = (file) => {
    if(!file.percent || file.percent === 100){
			// this.props.confirm({
			// 	content: '是否确认删除?',
			// 	onOk: () => {
			// 		this.deleteAttachment(file)
			// 	},
			// 	onCancel() {
			// 		console.log('Cancel');
			// 	},
      // });
      this.deleteAttachment(file)
			return false;
		}
  }

  deleteAttachment = (file) => {
    
    const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
    axios.delete(url, {
    }).then((response) => {
        if (response.data) {
          if (response.data.status === 0) {
            this.setState((state) => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
            this.fileIdList(this.state.fileList);
          }else{
            this.props.showNotification(response.data.message)
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
  }


  handleChange = (info) => {
    const { changeIsComplete } = this.props;
    changeIsComplete && changeIsComplete(true);
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;

      this.setState({ fileList: appendFileSizeToUploadFileAll(fileList) });
      this.fileIdList(fileList);
    }
  }

  fileIdList=(fileList)=>{
    let array = [];
    fileList && fileList.length>0 && fileList.map((item)=>{
      return array.push(item.response && item.response.id);
    })
    array && this.props.load && this.props.load(array);
  }

  render(){
    //判断是否已经提交，如已提交评论则上一条评论数据清除
    const { isComplete } = this.props;
    const { fileList } = this.state;
    
    let list = isComplete === true ? fileList : undefined;
    const upload = {
      name: 'file',
      fileList:list,
      action: `${getUploadActionUrl()}`,
      onChange:this.handleChange,
      onRemove: this.onAttachmentRemove,
    };

    return(
      <div>
        <Dragger {...upload} >
        <Icon type="inbox" />
        <p className="ant-upload-text">拖动文件或者点击此处上传</p>
      </Dragger>
      </div>
    )
  }
} 
export default Index;