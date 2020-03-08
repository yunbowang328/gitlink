import React,{ Component } from "react";

import FirstTab from "./FirstTab.js";
import SecondTab from "./SecondTab.js";
import ThirdTab from "./ThirdTab.js";
import '../../paths/ShixunPaths.css'
const $ = window.$;

class Statistics extends Component{
  constructor(props){
    super(props);
    this.state = { 
      tabs:1 
    }
  }

  changeTab =(index) =>{
    let i = parseInt(index);
    this.setState({
      tabs:i
    })
  }
  initBannerData = (data) => {
    this.setState({ ...data })
  }

  render(){
    let {tabs, course_count, learn_count, school_total_count, subject_name, subject_id} = this.state;
    return(
      <div className="newContainer">
        <div className="newMain clearfix">
          <div className="subject_statistics_top">
            <a href={`/paths/${subject_id}`}><p className="color-blue font-32 edu-txt-center pt50">{subject_name}</p></a>
            <div className="statistics_position edu-txt-center">
              <ul className="clearfix inline count_ul">
                <li>
                  <span>学员人数</span>
                  <span>{learn_count}</span>
                </li>
                <li>
                  <span>受用课堂</span>
                  <span>{course_count}</span>
                </li>
                <li>
                  <span>受用院校</span>
                  <span>{school_total_count}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb30 clearfix pl0 edu-back-white edu-txt-center statisticsNav">
            <ul className="inline">
              <li className={tabs === 1 ? "active" : ""} onClick={()=>this.changeTab(1)}><a href="javascript:void(0)">课堂使用</a></li>
              <li className={tabs === 2 ? "active" : ""} onClick={()=>this.changeTab(2)}><a href="javascript:void(0)">实训使用</a></li>
              <li className={tabs === 3 ? "active" : ""} onClick={()=>this.changeTab(3)}><a href="javascript:void(0)">院校学习</a></li>
            </ul>
          </div>

          <div className="educontent">
            <div id="statistics_info" className="clearfix mb30">
              {/* 课堂使用 */}
              {tabs === 1 && 
                <FirstTab {...this.props} initBannerData={this.initBannerData}></FirstTab>
              }
              {/* 实训使用 */}
              {tabs === 2 && 
                <SecondTab {...this.props}></SecondTab>
              }
              {/* 院校使用 */}
              {tabs === 3 &&               
                <ThirdTab {...this.props}></ThirdTab>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Statistics;