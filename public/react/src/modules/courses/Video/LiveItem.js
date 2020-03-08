import React,{ Component } from "react";
import { getImageUrl } from 'educoder';
import { Modal } from 'antd';
import { WordsBtn } from 'educoder';

import axios from 'axios';
// 点击按钮复制功能
function jsCopy(props){
  var e = document.getElementById("copy_meet_content");
  e.select();
  document.execCommand("Copy");
  props.showNotification("复制成功!");
}
const $ = window.$;

function getRight(){
  var right = parseInt($(".-task-sidebar").css("right"));
  return right===0?0:right;
}
class LiveItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    }
  }
  
  deleteLive=(id)=>{
    this.props.confirm({
      content: '是否确认删除?',

      onOk: () => {
        const url = `/live_links/${id}.json`;
        axios.delete(url).then(result=>{
          if(result){
            this.props.showNotification(`删除成功!`);
            const { successFunc } = this.props;
            successFunc && successFunc(1);
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

  alertInfo=()=>{
    this.setState({
      visible:true
    })
    getRight();
  }
  onDialogOkBtnClick=()=>{
    this.setState({
      visible:false,
    })
  }
  render(){
    const { key, item , setLiveId } = this.props;
    const {   visible } = this.state;

    const wei_flag = item.platform && (item.platform === "威佰通");
    console.log(wei_flag && item.url);
    return(
      <div className="liveItem" key={key}>
        <Modal
          title="提示"
          visible={visible}
          closable={false}
          footer={null}
          keyboard={false}
          centered={true}
          >
          {
            wei_flag && item.url ?
            <React.Fragment>
              <div className="task-popup-content edu-txt-center">
                <p className="font-16">打开威佰通客户端，输入会议号即可进入直播</p>
                <div className="wei_meet">
                  <p className="wei_meet_info">
                    <span>会议号：</span>
                    <input value={item.url} className="showNumber" readOnly id="copy_meet_content"/>
                    <a className="color-blue ml50" onClick={()=>jsCopy(this.props)}>复制会议号</a>
                  </p>
                </div>
              </div>
              <div className="task-popup-submit clearfix edu-txt-center">
                <a className="task-btn fl" onClick={this.onDialogOkBtnClick}>取消</a >
                <a className="task-btn task-btn-orange fr" onClick={this.onDialogOkBtnClick}>完成</a >
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="task-popup-content">
                <p className="task-popup-text-center font-16 pb20">{wei_flag ? "当前直播无会议号":"直播链接失效"}</p >
              </div>
              <div className="task-popup-submit clearfix edu-txt-center">
                <a className="task-btn task-btn-orange mr51" onClick={this.onDialogOkBtnClick}>知道了</a >
              </div>
            </React.Fragment>
          }
        </Modal>
        {
          visible ?
          <style>{
          `
          body{
            width: calc(100% - 7px)!important;
            overflow: hidden!important;
          }
          .-task-sidebar{
            right:${getRight()+7}px!important;
          }
          `}
          </style>
          :
          ""
        }
        <div className="lineMiddle livesMain">
          <span className="lineMiddle">
            <span className="font-18 task-hide" style={{maxWidth:"759px"}}>{item.course_name}</span>
            <span className={item.on_status?"labels living":"labels lived"}>{item.on_status?'已开播':'未开播'}</span>
          </span>
        </div>
        <div className="lineMiddle mt15">
          <div className="liveDesc">
            <p><span className="task-hide-2 break_word">{item.description}</span></p>
          </div>
          {
            item.on_status ?
            <React.Fragment>
              {
                item.url ?
                <React.Fragment>
                  {
                    wei_flag ? 
                      <a className="btns going" onClick={this.alertInfo}>进入</a>
                    :
                      <a className="btns going" target="_blank" href={`${item.url}`}>进入</a>
                  }
                </React.Fragment>
                :
                <a className="btns going" onClick={this.alertInfo}>进入</a>
              }
            </React.Fragment>
            :
            <span className="btns ect">进入</span>
          }
        </div>
        <p className="lineMiddle livesMain mt15 font-12">
          <span className="lineMiddle color-grey-9">
            <img alt={`${item.author_name}`} className="liveAuthor" src={getImageUrl(`images/${item.author_img}`)}/>
            <label className="mr50">{item.author_name}</label>
            { item.platform && <span className="mr50">直播平台：{item.platform}</span>   }      
            { item.live_time && <span className="mr50">开播时间：{item.live_time}</span>}   
            { item.duration && <span className="mr50">直播预计时长：{item.duration}分钟</span> }
          </span>
              <span>
                {
                  item.op_auth ?
                  <WordsBtn style="grey" onClick={()=>setLiveId(item.id)}>编辑</WordsBtn>:""
                }
                {
                  item.delete_auth ? 
                  <WordsBtn style="grey" className="ml30" onClick={()=>this.deleteLive(item.id)}>删除</WordsBtn>
                  :""
                }
              </span>
          </p>
      </div>
    )
  }
}
export default LiveItem;