import React,{ Component } from "react";
import { Pagination, Upload, Button, Icon, message, InputNumber, Input, Checkbox } from "antd";

import update from 'immutability-helper'
import axios from 'axios'
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import { getUrl, getUploadActionUrl } from 'educoder'
const $ = window.$;

/*

*/
class GraduationTasksappraiseMainEditor extends Component{
  constructor(props){
    super(props);
    this.mdRef = React.createRef();

    this.state={
      fileList: [],
      score: undefined,
      same_score: false,
      errorMessage: '',
      numberErrorMessage: '',
      errorMessagetype:false
    }
  }
  onSubmit = () => {
    const { score, same_score } = this.state
    let category_id= this.props.match.params.category_id;
    const url =  `/graduation_works/${category_id}/add_score.json`
    const attachment_ids = this.state.fileList.map(item => {
      return item.response ? item.response.id : item.id
    })
    const comment = this.mdRef.current.getValue()
    if ((!comment || comment.trim() == "") && !score &&this.props.isAdmin()===true) {
      this.setState( {errorMessage : '分数和评语不能同时为空' })
      // this.props.showNotification('请先输入评阅说明')
      return;
    }
    if (!score && this.props.isAdmin()===false) {
      this.setState( {
        errorMessage : '分数不能为空',
        errorMessagetype:true
      })
      // this.props.showNotification('请先输入评阅说明')
      return;
    }

    if (comment.length > 2000) {
      this.setState( {errorMessage : '不能超过2000个字符' })
      // this.props.showNotification('评阅说明文本长度不能超过2000')
      return;
    }
    this.setState( { errorMessage : ''})
    // if (score == 0 ||score<1|| score === undefined || score === null || score === "" ) {
    //   this.setState( {numberErrorMessage : '分数不能为空' })
    //   // this.props.showNotification('请先输入分数')
    //   return;
    // }
    this.setState( { numberErrorMessage: '' })

    const params =  {
      score,
      comment,
      attachment_ids,
      same_score
    }
    if (this.props.onReply) {
      this.props.onReply(params)
    } else {
      axios.post(url, params).then((response)=>{
        if(response.data.status == 0) {
          this.clearInputs()
          this.props.addSuccess();
        }

      }).catch((error)=>{
        console.log(error)
      })
    }

  }
  clearInputs = () => {
    this.setState({
      score: undefined,
      same_score: false,
      fileList: []
    })
    this.mdRef.current.setValue('')
  }
  onCancel = () => {
    this.clearInputs()
  }
  componentDidMount(){
  }
  handleUploadChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;
      this.setState({ fileList });
    }
  }
  onAttachmentRemove = (file, stateName) => {
		if(!file.percent || file.percent == 100){
			this.props.confirm({
				content: '确定要删除这个附件吗?',
				okText: '确定',
				cancelText: '取消',
				// content: 'Some descriptions',
				onOk: () => {
					this.deleteAttachment(file, stateName)
				},
				onCancel() {
					console.log('Cancel');
				},
			});


			return false;
		}

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
            console.log('--- success')

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
  onScoreChange = (val) => {
    if(val){
      this.setState( {
        errorMessage: '',
        errorMessagetype:false
      })
    }
    if (val > 100 ) {
      this.props.showNotification('不能大于100')
      this.setState({ score: 100 })
      return;
    }
    if (val < 0 ) {
      this.props.showNotification('不能小于0')
      this.setState({ score: 0 })
      return;
    }
    if (val && val.indexOf && val.indexOf('-') != -1) {
      this.setState({ score: 0 })
      window.event.preventDefault()
      return
    }
    this.setState({ score: val })
  }
  same_score_change = (e) => {
    this.setState({ same_score: e.target.checked }) //!this.state.same_score
  }
  render(){
    let { total_count, comments, errorMessagetype, fileList, score, same_score, errorMessage, numberErrorMessage } = this.state
    const { current_user, memo, showSameScore, placeholder } = this.props
    const isAdmin = this.props.isAdmin()
    const commentUploadProp = {
      width: 600,
      fileList: fileList,
      multiple: true,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleUploadChange,
      onRemove: (file) => this.onAttachmentRemove(file, 'fileList'),
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
      <React.Fragment>

        <div className="mainEditor color-grey-6">

        <style>{`
          .editorInputError .editormd {
            border: 1px solid red;
          }
          .numberInputError.ant-input-number {
            border: 1px solid red;
          } 
          .upload_mainEditor .ant-upload-list-item {
            margin-bottom: 8px;
          }
          .newuploads{
            margin-top: -5px;
            display: block;
            margin-bottom: 8px;
          }
          .mainEditor {
            padding: 0 10px;
            padding-bottom: 8px;
          }
          .mainEditorTitle {
            margin-bottom: 6px;
          }
        `}</style>
        {this.props.title && <span className="mainEditorTitle color-grey-6">{this.props.title}</span>}
        <TPMMDEditor ref={this.mdRef} mdID={'appraiseEditor'}  placeholder={placeholder || "请在此输入对本作品的评语，最大限制2000个字符"}
          watch={false} height={160} className={errorMessage&&errorMessagetype!=true ? 'editorInputError' : ''} imageExpand={true}></TPMMDEditor>
        { showSameScore == true && <div>
          <Checkbox checked={same_score} onChange={this.same_score_change}>整组同评</Checkbox>
          <span className={"font-14 color-grey-9"}>(选中，则本次评阅对象指小组全部成员，否则仅评阅此成员1人 )</span>
        </div> }
        <Upload {...commentUploadProp} className="upload_mainEditor upload_1 newuploads">
          <Button className="uploadBtn">
            <Icon type="upload" /> 上传附件
          </Button>
          (单个文件150M以内)
        </Upload>


        <div style={{height: '36px'}}>
          <div style={{ float: 'left' }}>
            <InputNumber placeholder="请填写分数" value={score} onChange={this.onScoreChange} className={numberErrorMessage ? 'numberInputError' : ''}
              style={{width:"120px", marginRight: '6px'}}
              min={0} max={100} precision={1} size="large"
            ></InputNumber>分
          </div>

          { (errorMessage || numberErrorMessage) && <span className="fl" style={{color: 'red', marginTop: '6px', marginLeft: '10px'}}>{errorMessage || numberErrorMessage}</span> }

          <a  className="task-btn task-btn-orange fr mt4" style={{height: '30px', width: '100px'}}
              onClick={this.onSubmit}
          >提交</a>
          <a onClick={this.onCancel} className="defalutCancelbtn fr mt4"
            style={{height: '30px', width: '100px', fontSize: '14px', lineHeight: '30px', marginRight: '20px'}}>清空</a>

        </div>
        </div>
      </React.Fragment>
    )
  }
}
export default  (GraduationTasksappraiseMainEditor);