import React,{ Component } from "react";
import { Pagination } from 'antd';
// import { NoneData } from 'educoder';

import LiveItem from './LiveItem';
import './video.css';

import bilibili from './images/bilibili.png';
import tencent from './images/tencent.png';
import WeiBaiTong from './images/WeiBaiTong.png';
import douyu from './images/douyu.jpg';
class Live extends Component{

   render(){
      const { liveData , lives , successFunc , pageSize , changePage , page } = this.props;

      return(
       <div className="livePanel">
          <p className="mt30 mb10 color-grey-9 pl10">EduCoder支持所有第三方直播平台，特别推荐：</p>
          <ul className="platform">
            <li>
              <a href="https://ke.qq.com/act/speed_pc/index.html?from=800021837" target="_blank"><img alt="" src={tencent} className="mr8" width="28px"/>
              <label className="color-grey-3 pointer">腾讯课堂</label>
              </a>
              <a href="https://pub.idqqimg.com/pc/misc/files/20200204/2e4cb765bef54f0c919c0ab8ab79d969.pdf" target="_blank" className="color-blue ml20">(简明手册)</a>
            </li>
            <li>
              <a href="https://live.bilibili.com/liveHime?visit_id=a81rbm7v2kk0" target="_blank"><img alt="" src={bilibili} className="mr8" width="52px"/>
              <label className="color-grey-3 pointer">哔哩哔哩</label>
              </a>
              <a href="https://www.bilibili.com/blackboard/live/broadcast-intro.html#/" target="_blank" className="color-blue ml20">(简明手册)</a>
            </li>
            <li>
              <a href="https://www.douyu.com/" target="_blank"><img alt="" src={douyu} className="mr8" width="28px"/>
              <label className="color-grey-3 pointer">斗鱼</label>
              </a>
              <a href="https://www.douyu.com/special/guide/anchor" target="_blank" className="color-blue ml20">(简明手册)</a>
            </li>
            <li>
              <div><img alt="" src={WeiBaiTong} className="mr8" width="28px"/>
                <label className="color-grey-3">威佰通</label>
              </div>
              <a href="https://www.educoder.net/forums/3734" target="_blank" className="color-blue ml20">(简明手册)</a>
            </li>
          </ul>
          {
            lives && lives.length > 0 ?
            <React.Fragment>
              <p className="font-grey-9 mt20 mb20 pl10">共 <span className="color-orange">{liveData && liveData.total_count}</span> 个视频</p>
              <div className="liveContent">
                {
                  lives.map((item,key)=>{
                    return(
                      <LiveItem
                      key={key}
                      item={item}
                      {...this.props}
                      {...this.state}
                      successFunc={()=>successFunc()}
                      ></LiveItem>
                    )
                  })
                }
              </div>
              {
                liveData && liveData.total_count > pageSize &&
                <div className="mt30 mb50 edu-txt-center">
                  <Pagination showQuickJumper total={liveData.total_count} pageSize={pageSize} current={page} onChange={(page)=>changePage(page,'live')}></Pagination>
                </div>
              }
            </React.Fragment>
            :
            ""
            // <div className="edu-back-white">
            //   <NoneData style={{width: '100%'}}></NoneData>
            // </div>
          }
       </div>
     )
   }
}
export default Live;