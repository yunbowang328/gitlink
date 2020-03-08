import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';
import { Checkbox,Input,DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import "../css/Courses.css";
import CoursesListType from '../coursesPublic/CoursesListType';
//引入对应跳转的组件



class Polldepoly extends Component{
  constructor(props) {
    super(props)
    this.state = {
      contents: [{val:"",id:1}],
    }
  }
  componentDidMount() {

  }

  submitCommitSummary=()=> {
    const mdContnet = this.refs[`md${1}`].getValue().trim();;
    console.log(mdContnet)
  }

  asdasdsad=()=>{
    this.setState({
      contents:""
    })
  }
  render() {
    let {contents}=this.state;
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
      <React.Fragment>
        <div>
          <div className="newMain clearfix">
            <div className={"educontent mb20"}>
              <div style={{
                width:'100%',
                height:'70px'
              }} >
                <p className="ml15 fl color-black mt30 summaryname" onClick={this.asdasdsad}>Java语言之控制语句</p>
                <CoursesListType
                  typelist={["已开启补交"]}
                  typesylename={"mt28"}
                />
                <a onClick={()=>this.props.history.goBack()}  className="color-grey-6 fr font-16 ml30 mt18 mr20">返回</a>
              </div>

              {/*<div className={"edu-con-bg01 user_bg_shadow bor-grey-e educontentbox"}>*/}
                          {/*<span className={"commitcontents"}>*/}
                            {/*<span className={"color-red"}>*</span>*/}
                            {/*内容</span>*/}
                {/*<div className={"ml30 mr30 mt10"}>*/}

                {/*</div>*/}
              {/*</div>*/}
               <div className="stud-class-set bor-bottom-greyE">
                 <div className="mt10 clearfix edu-back-white poll_list pl20">
                   <a className="active">答题列表</a>
                   <a>统计结果</a>
                   <a>问卷预览</a>
                   <a>配置</a>
                   <a className={"fr color-blue font-16"}>导出统计</a>
                 </div>
               </div>

                <div className="stud-class-set edu-back-white pt30 pb30 pr10 pl20">

                  <div className="clearfix">
                    <p className="ml22 fl font-16 mt5 color-grey-6">发布设置</p>
                    {/*<a href="javascript:void(0);" className="white-btn orange-btn fr mr15 mt15" title="编辑"*/}
                       {/*onClick="show_poll_edit_setting();">编辑</a>*/}
                  </div>

                  <div className="clearfix pl60 pt20">
                    <Checkbox className={"color-grey-6"}>统一设置 </Checkbox>  <span className={"color-grey-9"}>(选中则所有分班使用相同的发布设置，否则各个分班单独设置)</span>
                  </div>

                  <div className="clearfix pl60 pt20">
                    {/*<span className={"color-grey-6"}>发布时间：</span> <Input size="large" placeholder="请选择发布时间" /><span className={"color-grey-9"}>(发布之前，学生不会收到问卷)</span>*/}
                    <span className="color-grey-6 mt5 fl" style={{minWidth: '70px'}}>发布时间：</span>
                    <span className="fl mt5">
                          <DatePicker
                            showTime
                            showToday={false}
                            locale={locale}
                            format={dateFormat}
                            placeholder="请选择发布时间"
                            // value={opening_time===null||opening_time===""?"":moment(opening_time, dateFormat)}
                            // onChange={this.onChangeTimePicker}
                          />
                          <label style={{top:'6px'}} className="color-grey-9 ml10" >（发布之前，学生不会收到问卷）</label>
                    </span>
                  </div>

                  <div className="clearfix pl60 pt20">
                    {/*<span className={"color-grey-6"}>发布时间：</span> <Input size="large" placeholder="请选择发布时间" /><span className={"color-grey-9"}>(发布之前，学生不会收到问卷)</span>*/}
                    <span className="color-grey-6 mt5 fl" style={{minWidth: '70px'}}>截止时间：</span>
                    <span className="fl mt5">
                          <DatePicker
                              showToday={false}
                            showTime
                            locale={locale}
                            format={dateFormat}
                            placeholder="请选择截止时间"
                            // value={opening_time===null||opening_time===""?"":moment(opening_time, dateFormat)}
                            // onChange={this.onChangeTimePicker}
                          />
                          <label style={{top:'6px'}} className="color-grey-9 ml10" >（截止时间点，系统将自动提交所有学生的答题，学生将不能继续答题）</label>
                    </span>
                  </div>




                  <div className="stud-class-set edu-back-white pt30 pb30 pr10 pl20">

                    <div className="clearfix">
                      <p className="ml22 fl font-16 mt5 color-grey-6">公开设置</p>
                      {/*<a href="javascript:void(0);" className="white-btn orange-btn fr mr15 mt15" title="编辑"*/}
                      {/*onClick="show_poll_edit_setting();">编辑</a>*/}
                    </div>

                    <div className="clearfix pl40 pt20">
                      <Checkbox className={"color-grey-6"}>公开统计 </Checkbox>  <span className={"color-grey-9"}>（选中则在截止时间之后对提交了问卷的课堂成员公开答题统计，否则不公开）</span>
                    </div>


                    <div className="clearfix pl40 pt10">
                      <Checkbox className={"color-grey-6"}>实名问卷 </Checkbox>  <span className={"color-grey-9"}>（选中则问卷不实行匿名制）</span>
                    </div>

                </div>

                </div>
              <div className="clearfix mt30 mb30">
                <a className="defalutSubmitbtn fl mr20"
                   onClick={this.submitCommitSummary}>提交</a>
                <a  className="defalutCancelbtn fl">取消</a>
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SnackbarHOC() ( TPMIndexHOC(Polldepoly) );


