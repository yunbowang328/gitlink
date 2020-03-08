import React, { Component } from "react";
import { Spin } from "antd";
import axios from 'axios'
import ModalWrapper from "../../courses/common/ModalWrapper"
import { Cropper, getUrl } from 'educoder'

const imageId = 'changeHeaderPic'
const previewId = 'changeHeader_imagePreview'
let uploadedImageType;
let uploadedImageName;
let uploadedImageURL;
class ChangeHeaderPicModal extends Component{
  constructor(props){
    super(props);
    this.state={
      uploading: false
    }
  }
  init = () => {
    var inputImage = document.getElementById('inputImage');
    const that = this;
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      // cropper && 
      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          if (file.size > 2 * 1024 * 1024) {
            this.props.showNotification && this.props.showNotification("仅支持文件大小小于2M的文件")  
            return;
          }
          uploadedImageType = file.type;
          uploadedImageName = file.name;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }
          const image = document.getElementById( imageId );

          // base64
          var reader = new FileReader();
          reader.readAsBinaryString(file);

          reader.onload = () => {
              let base64_content = btoa(reader.result);
              console.log();
              
              image.src = `data:${file.type};base64,${base64_content}` // uploadedImageURL = URL.createObjectURL(file);
              that.fileUploaded = true;
              that.refs['cropper'].renew(image)
              // cropper.destroy();
              // cropper = new Cropper(image, options);
              inputImage.value = null;
          };
          reader.onerror = function() {
              console.log('there are some problems');
          };

          
        } else {
          this.props.showNotification && this.props.showNotification("请选择一个图片格式的文件")
          // window.alert('Please choose an image file.');
        }
      }
    };
  }
  componentDidMount() {
  }
  setVisible = (visible) => {

    this.refs['modalWrapper'].setVisible(visible)
    if (visible) {
      this.fileUploaded = false;

      setTimeout(() => {
        this.init()
      }, 500)
    }
  }

  onSendOk = () => {
   

  }
  onOk = () => {
    if (this.state.uploading == true) return;
    if (this.fileUploaded != true) {
      this.props.showNotification("请先上传图片")
      return;
    }
    console.log(new Date().getTime())
    this.setState({ uploading: true }, () => {
      window.setTimeout(() => {
        console.log(new Date().getTime())
        this._onOk()
      }, 10)
      
    })
  }
  _onOk = () => {
    
    var img_lg = document.getElementById(previewId);      
    // https://github.com/niklasvh/html2canvas/issues/1908     
    // 截图小的显示框内的内容          
    window.html2canvas(img_lg).then((canvas) => {
      var dataUrl = canvas.toDataURL("image/jpeg");    
      console.log(dataUrl)   

      const url = `/users/accounts/${this.props.userLogin}/avatar.json`
      axios.put(url, { 
        image: dataUrl
      })
      .then((response) => {
        // {"status":0,"message":"success","avatar_url":"avatars/User/15739"}
        if (response.data.status == 0) {
          // this.props.getBasicInfo()
          // https://www.trustie.net/issues/22461          
          if ( this.props.current_user.image_url.indexOf('avatars/User/b') != -1 
              || this.props.current_user.image_url.indexOf('avatars/User/g') != -1 ) {
            window.setTimeout(() => {
              this.doAfterUpdated()
            }, 1000)    
          } else {
            this.doAfterUpdated();
          }
          this.setState({ uploading: false })
        }
      })
      .catch(function (error) {
        this.setState({ uploading: false })

        console.log(error);
      });    
    });  
  }
  doAfterUpdated = () => {
    this.props.fetchUser()
    // 头像更新后会触发AccountPage的DidUpdate，然后会调用getBasicInfo
    this.props.showNotification && this.props.showNotification("修改头像成功")
    this.setVisible(false)
  }

  render(){
    const { course_lists } = this.state
    const { moduleName, current_user } = this.props
    const userHeaderImgUrl = current_user ? `${getUrl()}/images/${current_user.image_url}` : ''
    return(
      <ModalWrapper
        ref="modalWrapper"
        title={`上传头像`}
        {...this.props }
        onOk={this.onOk}
        okText="保存"
        width={552}
        className="changeHeaderModal"
        loading={this.state.uploading}
        onCancel={() => this.setState({ uploading: false })}
      >
        <style>{`
            #changeHeader_imagePreview {
                overflow: hidden;
                background-color: #fff;
                border-radius: 50%;
                text-align: center;
                width: 120px;
                height: 120px;
                /* border: 1px solid #eee; */
            }
            .previewWrap {
              flex-direction: column;
              justify-content: space-between;
              height: 320px;
              align-items: center;
              margin-left: 36px;
            }
            .changeHeaderModal .tip {
              color: #9B9B9B;
              margin-top: 4px;
            }
            .changeHeaderModal .cropperWrap .tip {
              display: inline-block;
            }
            .previewWrap .tip {
              text-align: center;
              margin-top: 4px;
            }
            #uploadBtn {
              color: #4CACFF;
              border: 1px solid #4CACFF;
              padding: 2px 18px;
              cursor: pointer;
            }
        `}</style>
        <div className="df">
            <div className="cropperWrap">
              <Cropper
                  imageSrc={''}
                  initPreviewUrl={userHeaderImgUrl}
                  ref="cropper"
                  imageId={imageId}
                  previewId="changeHeader_imagePreview"
                  width={320} height={320}
              ></Cropper>
              <span className="tip">仅支持JPG、GIF、PNG，且文件小于2M</span>
            </div>
            <div
                className="df previewWrap" style ={{flexDirection: 'column'}}
            >   
                <div>
                  <div id="changeHeader_imagePreview">
                    {userHeaderImgUrl && <img src={userHeaderImgUrl}></img>}
                  </div>
                  <div className="tip">头像预览</div>
                </div>
                <label id="uploadBtn" for="inputImage">
                  <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*"></input>
                  点击上传
                </label>
            </div>
        </div>
      </ModalWrapper>
    )
  }
}

export default ChangeHeaderPicModal;


