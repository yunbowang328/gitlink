import React, { Component } from 'react';
import {Tooltip} from 'antd'
import '../css/Courses.css';
class CoursesListType extends Component {
  constructor(props) {
    super(props);
    this.state={
      // typelist:[],
      // typesylename:"",
      // tipval:""
    }

  }

  componentDidMount() {
    // let{typelist,typesylename,tipval}=this.props;
    //
    // this.setState({
    //   typelist:typelist,
    //   typesylename:typesylename,
    //   tipval:tipval
    // })
    // console.log("CoursesListType")
    // console.log(typelist)
  }

  render() {
    let {typelist,typesylename,tipval}=this.props;

    return(
      <span style={{display:'inline-block'}}>
        {
          typelist===undefined || typelist=== 403 || typelist === 401 || typelist=== 407 || typelist=== 408|| typelist=== 409 || typelist === 500?"":typelist.map((item,key)=>{
            return(
              <Tooltip placement="bottom" title={tipval} getPopupContainer={()=>document.querySelector('.TabsWarp')} key={key}>
                <span key={key}>
                  {item==="公开"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle " + typesylename} >公开</span>:""}
                  {item==="已开启补交"?<span className={"edu-filter-btn edu-filter-btn-028d01 ml15 fl typestyle "+ typesylename} >已开启补交</span>:""}
                  {item==="未开启补交"?<span className={"edu-filter-btn edu-filter-btn-CC317C ml15 fl typestyle "+ typesylename} >未开启补交</span>:""}
                  {item==="匿名作品"?<span className={"edu-filter-btn edu-filter-btn-006B75 ml15 fl typestyle "+ typesylename} >匿名作品</span>:""}
                  {item==="已选择"?<span className={"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "+ typesylename} >已选择</span>:""}
                  {item==="已结束"?<span className={"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "+ typesylename} >已结束</span>:""}
                  {item==="提交中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >提交中</span>:""}
                  {item==="匿评中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >匿评中</span>:""}
                  {item==="申诉中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >申诉中</span>:""}
                  {item==="补交中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >补交中</span>:""}
                  {item==="评阅中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >评阅中</span>:""}
                  {item==="待选中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >待选中</span>:""}
                  {item==="交叉评阅中"?<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "+ typesylename} >交叉评阅中</span>:""}
                  {item==="已开启交叉评阅"?<span className={"edu-filter-btn edu-filter-btn-E99695 ml15 fl typestyle "+ typesylename} >已开启交叉评阅</span>:""}
                  {item==="待确认"?<span className={"edu-filter-btn edu-filter-btn-5E5FB9 ml15 fl typestyle "+ typesylename} >待确认</span>:""}
                  {item==="待处理"?<span className={"edu-filter-btn edu-filter-btn-5E5FB9 ml15 fl typestyle mr10 "+ typesylename} >待处理</span>:""}
                  {item==="未发布"?<span className={"edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle "+ typesylename} >未发布</span>:""}
                  {item==="私有"?<span className={"edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle "+ typesylename} >私有</span>:""}
                  {item==="未提交"?<span className={"edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle "+ typesylename} >未提交</span>:""}
                  {item==="已确认"?<span className={"edu-filter-btn edu-filter-btn-FC2B6A ml15 fl typestyle "+ typesylename} >已确认</span>:""}
                  {item==="已截止"?<span className={"edu-filter-btn edu-filter-btn-FC2B6A ml15 fl typestyle "+ typesylename} >已截止</span>:""}
									{item==="开放课程"?<span className={"edu-filter-btn edu-filter-btn-FF6800 ml15 fl typestyle "+ typesylename} >开放课程</span>:""}

                </span>
              </Tooltip>
          )
         })
        }
      </span>
    )
  }
}
export default CoursesListType;


// let typelist=["公开",
//               "已开启补交",
//               "未开启补交",
//               "匿名作品",
//               "已选择",
//               "已结束",
//               "提交中",
//               "匿评中",
//               "申诉中",
//               "补交中",
//               "评阅中",
//               "待选中",
//               "交叉评阅中",
//               "已开启交叉评阅",
//               "待确认",
//               "待处理",
//               "未发布",
//               "私有",
//               "未提交",
//               "已确认",
//               "已截止",
//             ]