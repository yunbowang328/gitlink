import React, { Component } from 'react';
import axios from 'axios';
import {Input,Pagination,Tooltip} from 'antd';

//业务组件
import CoursesBanner from "../coursesDetail/CoursesBanner";
import Coursesleftnav from "../coursesDetail/CoursesLeftNav";

class CourseLayoutcomponent extends Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }
  //
  // getleftNavid=(navid,newselectnavid)=>{
  //   console.log(navid,newselectnavid)
  //   this.setState({
  //     navkey:navid,
  //     navttype:newselectnavid
  //   })
  // }

  render() {
      // 加  , ...this.props  样式会出现2份children
    const childrenWithProps = React.Children.map(this.props.children, child => {
        // debugger;
        if(!child) {
            return ''
        }
        return React.cloneElement(child, { ...this.state })
    }
        
    );
    // console.log("CoursesBanner")
    //   console.log(this.props)

      return (
      <div>
          <div className="newMain clearfix">
              {/*头部banner*/}
              <CoursesBanner {...this.props}></CoursesBanner>

              <div className="educontent clearfix" style={{flex: "1 0 auto"}}>

                  <div className="stud-class-set">
                      <div className="news">
                          <div className="edu-class-inner container clearfix">
                              <div className="member for-content-0 for-content">
                                  <div className="people clearfix mb60">

                                      {/*left_nav*/}
                                      <div className={"with22 fl setleft"} style={{width:'264px',minHeight:'500px'}}>
                                         <Coursesleftnav {...this.props} {...this.state}/>
                                      </div>

                                      {/*right_concent*/}
                                      <div className="with78 fl">
                                          <div className={"ml20 clearfix"}>
                                              {childrenWithProps}
                                          </div>
                                      </div>

                                  </div>
                               </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
    )
  }
}
export default CourseLayoutcomponent;