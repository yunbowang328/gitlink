import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,notification,Input} from "antd";
import { WordsBtn,getUrl, getUploadActionUrl,WordNumberTextarea} from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';

const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

class AccessoryModal extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
      fileList:[],
      Modalstype:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
      loadtype:false,
			updatas:false,
      shixunsreplace:false,
      Errormessage:false,
			description:undefined
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
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;
      console.log(fileList)
      // for(var list of fileList ){
      //   console.log(fileList)
      // }
      this.setState({
        fileList:fileList,
        Errormessage:false,
      });
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
      loadtype:false,
      shixunsreplace:false,
    })
    this.props.Cancel()
  }
    Saves=()=>{

        let id=this.props.categoryid;
        let {fileList,description} =this.state;

        let newfileList=[];
      if(fileList!=undefined&&fileList.length>0) {
        for (var list of fileList) {
          newfileList.push(list.response.id)
        }
      }
        if (newfileList.length == 0) {
          // this.props.showNotification('请先上传附件')
          if(this.props.modalname === "补交附件"){
            this.setState({
              Errormessage:true,
              shixunsreplace:false,
            })
          }else{
            this.setState({
              shixunsreplace:true,
              Errormessage:false,
            })
          }
          return;
        }else{
          this.setState({
            shixunsreplace:false,
            Errormessage:false,
          })
        }

        let url= this.props.reviseAttachmentUrl || "/graduation_works/"+id+"/revise_attachment.json"
        axios.post(url,{
          description:description,
          attachment_ids:newfileList
        }).then((result)=>{

					if(result.data.status===0){
						this.props.Cancel()
						this.props.setupdate()

            // this.setState({
            //   Modalstype:true,
            //   Modalstopval:result.data.message,
            //   ModalSave:this.ModalCancelModalCancel,
            //   loadtype:true
            // })
						this.ModalCancelModalCancel()

						notification.open({
							message: '提示',
							description:
								'提交成功'
						});
						if(this.props.seeworks!=undefined){
							this.props.history.push(this.props.seeworks);
						}

          }
        }).catch((error)=>{

        })
    }

  settextarea=(e)=>{
    this.setState({
      description:e.target.value
    })
  }
   //确认
  hidestartshixunsreplace=()=>{
    let id=this.props.categoryid;
    let {fileList,description} =this.state;

    let newfileList=[];
    if(fileList!=undefined&&fileList.length>0) {
      for (var list of fileList) {
        newfileList.push(list.response.id)
      }
    }
    let url= this.props.reviseAttachmentUrl || "/graduation_works/"+id+"/revise_attachment.json"
    axios.post(url,{
      description:description,
      attachment_ids:newfileList
    }).then((result)=>{

      if(result.data.status===0){
				this.props.Cancel()
        this.props.setupdate()

        // this.setState({
        //   Modalstype:true,
        //   Modalstopval:result.data.message,
        //   ModalSave:this.ModalCancelModalCancel,
        //   loadtype:true
        // })

        this.ModalCancelModalCancel()
				notification.open({
					message: '提示',
					description:
						'提交成功'
				});
        if(this.props.seeworks!=undefined){
          this.props.history.push(this.props.seeworks);
        }

      }
    }).catch((error)=>{

    })
  }
  //取消
  hidestartshixunsreplacetwo=()=>{
    this.setState({
      shixunsreplace:false,
    })
  }

    render(){
     let {settextarea,fileList,
       Modalstype,
       Modalstopval,
       ModalCancel,
       ModalSave,
       loadtype,
       shixunsreplace,
			 description
     }=this.state;
     let {course_groups}=this.props;
    const uploadProps = {
      width: 600,
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
      <React.Fragment>

        <Modal
          keyboard={false}
          title="提示"
          visible={shixunsreplace}
          closable={false}
          footer={null}
        >
          <div className="task-popup-content">
            <p className="task-popup-text-center font-16 ">还未上传附件</p>
            <p className="task-popup-text-center font-16 pb20">是否确认提交作品?</p>
          </div>
          <div className="task-popup-submit clearfix">
            <a className="task-btn task-btn-orange fr "
               onClick={() => this.hidestartshixunsreplace()}>确认</a>
            <a className="task-btn fr mr50"
               onClick={() => this.hidestartshixunsreplacetwo()}>取消</a>
          </div>
        </Modal>
        {/*提示*/}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalCancel={ModalCancel}
          modalSave={ModalSave}
          loadtype= {loadtype}

        />
        <Modal
          keyboard={false}
          className={"HomeworkModal"}
          title={this.props.modalname}
          visible={this.props.visible}
          closable={false}
          footer={null}
          destroyOnClose={true}
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

						<WordNumberTextarea
							placeholder={`请在此输入补交附件的原因，最大限制${this.props.maxFontLength || 100}个字符`}
							onInput={(e)=>this.settextarea(e)}
							value={description}
							maxlength={100}
						/>

            {
              this.state.Errormessage && this.state.Errormessage === true ?
                <p className="color-red  mt5 mb5  " style={{width: " 100%", height: "20px"}}>
                  <span className="fl" style={{textAlign:"left",width: " 100%"}}>还未上传附件</span>
                </p>
                : ""

            }
						{this.state.updatas===true?<span className={"color-red"}>请上传附件</span>:""}
            <div className="clearfix mt30 edu-txt-center mb10">
              <a  className="task-btn color-white mr30" onClick={this.props.Cancel}>{this.props.Cancelname || '取消'}</a>
              <a className="task-btn task-btn-orange" onClick={()=>this.Saves()}>{this.props.Savesname || '确认'}</a>
            </div>

          </div>
        </Modal>
      </React.Fragment>

    )
  }
}
export default AccessoryModal;