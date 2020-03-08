import React,{ Component } from "react";
import { Input , Pagination } from 'antd';
import { NoneData ,ActionBtn } from 'educoder';

import VideoUploadList from '../../user/usersInfo/video/VideoUploadList';
import VideoInReviewItem from '../../user/usersInfo/video/VideoInReviewItem';
import HeadlessModal from '../../user/usersInfo/common/HeadlessModal';
import EditVideoModal from '../../user/usersInfo/video/EditVideoModal'
import ClipboardJS from 'clipboard'

import './video.css';
import '../../user/usersInfo/video/InfosVideo.css'
import axios from 'axios';

const DEFAULT_VIDEO_WIDTH_IN_MD = "90%" // 400
const DEFAULT_VIDEO_HEIGHT_IN_MD = "55%" // 400

const videoEl = null;
let _clipboard = null;

class Video extends Component{
  constructor(props){
    super(props);
    this.state={
      videos:undefined,
      count:0,
      page:1,

      videoId:undefined,
      videoVisible:false,
      visible:false
    }
  }

  // 编辑的弹框visible
  setVisible=(flag)=>{
    this.setState({
      visible:flag
    })
  }

  setVideoVisible=(flag)=>{

    this.setState({
      videoVisible:flag
    })
    if (flag === false) {
      if (_clipboard) {
        this.setState({
          videoId:undefined
        })
        _clipboard.listener.destroy();
        _clipboard = null;
      }
    } else {
        // videoEl.current && videoEl.current.play()

        setTimeout(() => {
            if (!_clipboard) {
                _clipboard = new ClipboardJS('.copybtn');
                _clipboard.on('success', (e) => {
                    this.props.showNotification('复制成功');
                });
            }
        }, 200)
    }
  }
  

  // 编辑成功后回调的方法
  editSuccess=()=>{
    this.props.showNotification("视频名称修改成功!");
    const { listFunc , page } = this.props;
    listFunc && listFunc(page);
  }

  onEditVideo=(item)=>{
    let videoId = {
          videoId: item.id,
          title: item.title
      }
      this.setState({
        videoId,
      })
      this.setVisible(true);
  }

  onMaskClick=(item)=> {
    let videoId = {
      videoId: item.id,
      title: item.title,
      file_url: item.file_url,
      cover_url: item.cover_url
    }
    this.setState({
      videoId
    })
    this.setVideoVisible(true);
  }


  setVideoVisible=(flag)=>{

    this.setState({
      videoVisible:flag
    })
    if (flag === false) {
      if (_clipboard) {
        this.setState({
          videoId:undefined
        })
        _clipboard.listener.destroy();
        _clipboard = null;
      }
    } else {
        // videoEl.current && videoEl.current.play()

        setTimeout(() => {
            if (!_clipboard) {
                _clipboard = new ClipboardJS('.copybtn');
                _clipboard.on('success', (e) => {
                    this.props.showNotification('复制成功');
                });
            }
        }, 200)
    }

  }

  getCopyText = (file_url, cover_url)=>{
    return `<video src="${file_url}" controls="true" controlslist="nodownload" width="${DEFAULT_VIDEO_WIDTH_IN_MD}" height="${DEFAULT_VIDEO_HEIGHT_IN_MD}" poster="${cover_url}">您的浏览器不支持 video 标签。</video>`
  }

  // 删除事件
  deleteVideo=(item)=>{
    this.props.confirm({
      content: '该视频将被删除，不可恢复',
      subContent:'是否确认删除?',

      onOk: () => {
        const CourseId=this.props.match.params.coursesId;
        const url = `/courses/${CourseId}/delete_course_video.json`;
        axios.delete(url,{
          params:{
            video_id:item.id
          }
        }).then(result=>{
          if(result){
            this.props.showNotification(`删除成功!`);
            this.props.updataleftNavfun();
            const { listFunc , page } = this.props;
            listFunc && listFunc(page);
          }
        }).catch(error=>{
          console.log(error);
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render(){
    const { visible , videoVisible , videoId } = this.state;
    const CourseId=this.props.match.params.coursesId;
    const login=this.props.user&&this.props.user.login;
    const _inputValue = videoId && this.getCopyText(videoId.file_url, videoId.cover_url);

    const { admin , is_teacher ,business , user_id} = this.props.user;

    const { videos , upload , uploadVideo , videoData , changePage ,pageSize ,page } = this.props;

    const operation = admin || business || (is_teacher && this.props.checkIfProfessionalCertification())
    return(
      <div>
        <EditVideoModal {...this.props} visible={visible} setVisible={this.setVisible}
            editSuccess={this.editSuccess}
            {...videoId} CourseUser={login}
        ></EditVideoModal>
        <HeadlessModal
            visible={videoVisible}
            setVisible={this.setVideoVisible}
            className="showVideoModal"
            width={800 - 1}
          >
            {
              videoId &&
              <video
                autoplay="true"
                ref={videoEl}
                src={videoId.file_url} controls="true" controlslist="nodownload">
                您的浏览器不支持 video 标签。
              </video>
            }

            <div className="df copyLine">
              <Input value={_inputValue}
                  className="dark"
              ></Input>
              <ActionBtn className="copybtn" data-clipboard-text={_inputValue}>复制视频地址</ActionBtn>
            </div>
          </HeadlessModal>
        <div className="videoPanel">
          {
            upload ?
            <VideoUploadList {...this.props} flag={true} CourseId={CourseId} CourseUser={login} successFunc={()=>uploadVideo()}></VideoUploadList>
            :
            <React.Fragment>
              {
                videos && videos.length > 0 ?
                <React.Fragment>
                  <p className="font-grey-9 mt20 mb20 pl5">共 <span className="color-orange">{videoData && videoData.count}</span> 个视频</p>
                  <div className="videoContent">
                  {
                    videos.map((item,key)=>{
                      return(
                        <VideoInReviewItem
                          {...this.props}

                          {...item}
                          key={item.id}
                          onEditVideo={this.onEditVideo}
                          onMaskClick={this.onMaskClick}
                          getCopyText={this.getCopyText}
                          operation={operation}
                          deleteVideo={(admin || item.user_id === user_id) ? this.deleteVideo : undefined}
                      >
                      </VideoInReviewItem>
                      )
                    })
                  }
                  </div>
                </React.Fragment>
                :
                <div className="edu-back-white">
                  <NoneData style={{width: '100%'}}></NoneData>
                </div>
              }
              
              {
                videoData && videoData.count > pageSize &&
                <div className="mt30 mb50 edu-txt-center">
                  <Pagination showQuickJumper total={videoData.count} current={page} pageSize={pageSize} onChange={(page)=>changePage(page,'video')}></Pagination>
                </div>
              }
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
}
export default Video;