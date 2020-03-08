import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message} from "antd";
import { WordsBtn, getUploadActionUrl} from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
const CheckboxGroup = Checkbox.Group;

class AccessoryModal2 extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
      fileList:[],
      Modalstype:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
      loadtype:false
    }
  }


  componentDidMount() {

  }

  //勾选实训
  shixunhomeworkedit=(list)=>{

    this.setState({
      group_ids:list
    })

  }
  // 附件相关 START
  handleChange = (info) => {
		if(info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed'){
			let fileList = info.fileList;
			console.log(fileList)
			// for(var list of fileList ){
			//   console.log(fileList)
			// }
			this.setState({ fileList });
		}

  }

  onAttachmentRemove = (file) => {
    // confirm({
    //   title: '确定要删除这个附件吗?',
    //   okText: '确定',
    //   cancelText: '取消',
    //   // content: 'Some descriptions',
    //   onOk: () => {
    //     this.deleteAttachment(file)
    //   },
    //   onCancel() {
    //     console.log('Cancel');
    //   },
    // });
    // return false;

    // this.setState({
    //   Modalstype:true,
    //   Modalstopval:'确定要删除这个附件吗?',
    //   ModalSave: ()=>this.deleteAttachment(file),
    //   ModalCancel:this.cancelAttachment
    // })
    // return false;
		if(!file.percent || file.percent == 100){
			this.deleteAttachment(file);
		}

  }




  deleteAttachment = (file) => {
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

  ModalCancelModalCancel=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:"",
      ModalSave:this.ModalCancelModalCancel,
      loadtype:false
    })
    this.props.Cancel()
  }
  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.fileList) != JSON.stringify(this.props.fileList)) {
      this.setState({
        fileList: this.props.fileList
      })
    }
    if (prevProps.description != this.props.description) {
      this.setState({
        description: this.props.description
      })
    }
  }
  Saves=()=>{
  	// debugger
    let {fileList,description} =this.state;
    let newfileList=[];
    if(fileList!=undefined&&fileList.length>0) {
      for (var list of fileList) {
        newfileList.push(list.response.id)
      }
    }
    this.props.Saves && this.props.Saves(newfileList, description)
    return;
      let id=this.props.categoryid;
      
    console.log(newfileList)
      let url="/graduation_works/"+id+"/revise_attachment.json"
      axios.post(url,{
        description:description,
        attachment_ids:newfileList
      }).then((result)=>{
        // console.log(result)
        if(result.data.status===0){
          this.props.setupdate()
          this.setState({
            Modalstype:true,
            Modalstopval:result.data.message,
            ModalSave:this.ModalCancelModalCancel,
            loadtype:true
          })

        }
      }).catch((error)=>{

      })
  }

  settextarea=(e)=>{
    this.setState({
      description:e.target.value
    })
  }

    render(){
     let {description,fileList,
       Modalstype,
       Modalstopval,
       ModalCancel,
       ModalSave,
       loadtype,
     }=this.state;
     let {course_groups}=this.props;
    const uploadProps = {
      width: 600,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action: getUploadActionUrl(),
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
      <div>
        {/*提示*/}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalCancel={ModalCancel}
          modalSave={ModalSave}
          loadtype= {loadtype}

        />
        <Modal
          className={"HomeworkModal"}
          title={this.props.modalname || "补交附件"}
          visible={this.props.visible}
          closable={false}
          footer={null}
          destroyOnClose={true}
          keyboard={false}
        >
          <div className="task-popup-content">
            <p className="task-popup-text-center font-16">

              <span className={"color-blue underline"}> </span>
            </p>

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
                .ant-upload-select{
                  float: left;
                }
                .ant-upload-list :nth-child(1).ant-upload-list-item {
                 margin-top:31px;
                }
              `}</style>

            <p >
              <Upload {...uploadProps} fileList={this.state.fileList} className="upload_1">
                <Button className="uploadBtn">
                  <Icon type="upload" /> 选择文件
                </Button>
                (单个文件最大150M)
              </Upload>
            </p>

            <textarea  placeholder="请在此输入补交附件的原因，最大限制100个字符" className={"mt20"} value={description} onInput={this.settextarea} style={{
              width: '100%',
              height:'150px',
              border:'1px solid rgba(234,234,234,1)',
              padding: '10px'
            }}></textarea>

            <div className="clearfix mt30 edu-txt-center mb10">
              <a  className="task-btn color-white mr70" onClick={this.props.Cancel}>{this.props.Cancelname || '取消'}</a>
              <a className="task-btn task-btn-orange" onClick={()=>this.Saves()}>{this.props.Savesname || '确认'}</a>
            </div>

          </div>
        </Modal>
      </div>
    )
  }
}
export default AccessoryModal2;