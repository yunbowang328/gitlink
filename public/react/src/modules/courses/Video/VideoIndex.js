import React,{ Component } from "react";

import { Menu, Spin } from 'antd';

import { WordsBtn } from 'educoder';
import axios from 'axios';
import Videos from './Video';
import Lives from './Live';
import LivesNew from './LiveNew';


import './video.css';
import '../css/Courses.css';
import '../publicNav/nav.css';
const PAGE_SIZE = 15;
const LIVE_PAGE_SIZE = 10;
const $ = window.$;

function getRight(){
  var right = parseInt($(".-task-sidebar").css("right"));
  return right===0?0:right;
}
class VideoIndex extends Component{
  constructor(props){
    super(props);
    this.state={
      page:1,
      upload:false,
      videos:undefined,
      videoData:undefined,
      type:"video",
      isSpining:false,

      lives:undefined,
      liveData:undefined,

      liveId:undefined,

      liveVisible:false
    }
  }

  checkType=(type,page)=>{
    this.setState({
      type,
      isSpining:true
    })
    if(type === "video"){
      this.getList(page);
    }else{
      this.getLiveList(page);
    }
  }

  componentDidMount=()=>{
    const { search } = this.props.location;
    const { page } = this.state;
    if(search && search === "?open=live"){
      this.setState({
        type:"live"
      })
      this.checkType("live",page);
    }else{
      if(search === "?open=new"){
        this.setState({
          upload:true
        })
      }
      this.checkType("video",page);
    }
  }
  // 获取直播列表
  getLiveList=(page)=>{
    const CourseId=this.props.match.params.coursesId;
    const url = `/courses/${CourseId}/live_links.json`;
    axios.get(url,{
      params:{
        page,
        limit:LIVE_PAGE_SIZE
      }
    }).then(result=>{
      if(result){
        this.setState({
          liveData:result.data,
          lives:result.data.lives,
          isSpining:false,
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  
  // 获取视频列表
  getList=(page)=>{
    const CourseId=this.props.match.params.coursesId;
    const fetchUrl = `/courses/${CourseId}/course_videos.json`;
    axios.get(fetchUrl, {
      params: {
        page,
        limit: PAGE_SIZE,
      }
    })
    .then((response) => {
      if(response){
        this.setState({
          videos:response.data.videos,
          videoData:response.data,
          isSpining:false
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  changeType=(e)=>{
    this.setState({
      type:e.key,
      upload:false,
      page:1
    })
    this.checkType(e.key,1);
  } 

  changePage=(page,type)=>{
    this.setState({
      page
    })
    this.checkType(type,page);
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
  uploadVideo=(upload)=>{
    this.setState({
      upload,
      isSpining:true
    })
    const { page } = this.state;
    setTimeout(()=>{
      this.getList(page);
    },500)
  }

  toUpload =()=> {
    const { admin , is_teacher,business} = this.props.user;
    if (admin || business || (is_teacher && this.props.checkIfProfessionalCertification())) {
      this.setState({
        type:"video",
        upload:true,
        page:1
      })
    } else {
      this.props.showProfessionalCertificationDialog();
    }
  }

  // 直播设置后回调的方法
  // successFunc=()=>{
  //   this.setState({
  //     type:"live",
  //     page:1
  //   })
  //   this.checkType("live",1);
  // }
  // 直播设置
  liveSetting=()=>{
    this.setState({
      liveId:undefined
    })
    this.setliveVisibel(true);
  }
  //直播设置弹框
  setliveVisibel=(flag,changetypeFlag)=>{
    this.setState({
      liveVisible:flag
    })
    if(flag === false){
      this.setState({
        liveId:undefined
      })
    }
    if(changetypeFlag){
      this.checkType("live",1);
    }
  }
  // 列表-编辑（修改传到编辑的id）
  setLiveId=(id)=>{
    this.setState({
      liveId:id
    })
    this.setliveVisibel(true);
  }
  render(){
    const { videos , upload , videoData , type , liveData , lives , page , liveVisible , isSpining , liveId } = this.state;
    const { admin , is_teacher , business } = this.props.user;
    // console.log("p",this.props);
    return(
      <React.Fragment>
        <LivesNew 
          visible={liveVisible} 
          liveId={liveId}
          setliveVisibel={this.setliveVisibel} 
          {...this.props} 
          {...this.state}
        ></LivesNew>
        {
          liveVisible ?
          <style>{
          `
          body{
            width: calc(100% - 7px)!important;
            overflow: hidden!important;
          }
          .-task-sidebar{
            right:${getRight()+7}px!important;
          }
          `}</style>:
          <style>{
            `
            body{
              width: 100%!important;
            }
            `}</style>
        }
        <div className="edu-back-white" style={{marginBottom:"1px"}}>

          <div className="clearfix pl30 pr30 menuDiv">
            <div className="task_menu_ul fl">
              <Menu mode="horizontal" selectedKeys={[type]} onClick={this.changeType}>
                <Menu.Item key="video">视频</Menu.Item>
                <Menu.Item key="live">直播</Menu.Item>
              </Menu>
            </div>
            {
              (admin || is_teacher || business) &&
              <li className="fr mt18">
                {
                  type === "video" ?
                    <React.Fragment>
                      {
                        upload ?
                        <WordsBtn style="grey" className="font-16" onClick={()=>this.uploadVideo(false)}>取消</WordsBtn>
                        :
                        <WordsBtn style="blue" className="font-16" onClick={this.toUpload}>上传视频</WordsBtn>
                      }
                    </React.Fragment>
                  :
                  <WordsBtn style="blue" className="font-16 ml30" onClick={this.liveSetting}>添加直播</WordsBtn>
                }
              </li>
            }
          </div>
        </div>
        <Spin spinning={isSpining}>
        {
          type === "video" ? 
            <Videos 
              upload={upload} 
              videos={videos} 
              page={page}
              data={videoData}
              pageSize={PAGE_SIZE}
              uploadVideo={this.uploadVideo}
              listFunc={this.getList}
              changePage={this.changePage}
              {...this.props} 
              {...this.state}
            ></Videos>
            :
            <Lives
              lives={lives}
              liveData={liveData}
              page={page}
              pageSize={LIVE_PAGE_SIZE}
              successFunc={this.getLiveList}
              changePage={this.changePage}
              setLiveId={this.setLiveId}
              {...this.props}
              {...this.state}
            ></Lives>
        }
        </Spin>
      </React.Fragment>
    )
  }
}
export default VideoIndex;