import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin, Select, Divider  } from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"
import InfiniteScroll from 'react-infinite-scroller';
import { ConditionToolTip } from 'educoder'
const Option = Select.Option;
const pageCount = 15;

// 代码查重弹框
class CheckCodeModal extends Component{
  constructor(props){
    super(props);
    this.state={
      checkBoxValues: [],
      candidates: [],
      hasMore: true,
      loading: false,
      page: 1
    }
  }
  fetchMemberList = (arg_page) => {
    const courseId = this.props.match.params.coursesId    
    const page = arg_page || this.state.page;
    const { name, school_name } = this.state
    let url = `/courses/${courseId}/search_teacher_candidate.json`
    this.setState({ loading: true })
    axios.post(url, {
      page: page,
      limit: pageCount,
      school_name: school_name || '',
      name: name || ''
    })
    .then((response) => {
      if (!response.data.candidates || response.data.candidates.length == 0) {
        this.setState({
          page,
          loading: false,
          hasMore: false,
        })
      } else {
        this.setState({
          candidates: page == 1 ? response.data.candidates : this.state.candidates.concat(response.data.candidates),
          page,
          loading: false,
          hasMore: response.data.candidates.length == pageCount
        })
      }

    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  componentDidMount() {
    
    
  }
  fetchOptions = () => {
    // add_teacher_popup
    const courseId = this.props.match.params.coursesId    
    
    let url = `/courses/${courseId}/add_teacher_popup.json`
    
    axios.get(url, {
    })
    .then((response) => {
      if (response.data.graduation_groups) {
        this.setState({
          graduation_groups: response.data.graduation_groups
        })
      } 
      if (response.data.course_groups) {
        this.setState({
          course_groups: response.data.course_groups
        })
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  setVisible = (visible) => {
    if (visible) {
      this.fetchMemberList()
      this.fetchOptions()
    }
    this.refs.modalWrapper.setVisible(visible)
    if (visible == false) {
      this.setState({
        checkBoxValues: []
      })
    }
  }

  onSendOk = () => {
    const courseId = this.props.match.params.coursesId   
    const url = `/courses/${courseId}/add_teacher.json`
    const params = { 
      "user_list": this.state.checkBoxValues.map (item => { return { 'user_id': item }}) ,
      "graduation_group_id": "2",
      "course_group_id": "820",
      // "role": ROLE_TEACHER_NUM
    }
    const { graduationGroup, courseGroup } = this.state
    if (graduationGroup) {
      params.graduation_group_id = graduationGroup
    }
    if (courseGroup) {
      params.course_group_id = courseGroup
    }
    axios.post(url, params)
    .then((response) => {
      if (response.data.status == 0) {
        this.setVisible(false)
        this.props.showNotification('添加成功')
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  onOk = () => {
    this.onSendOk()
  }

  onCheckBoxChange = (checkBoxValues) => {
    this.setState({
      checkBoxValues: checkBoxValues
    })
  }

  handleInfiniteOnLoad = () => {
    this.fetchMemberList(this.state.page + 1)
  }

  onSearch = () => {
    this.fetchMemberList(1)
  }
  handleGradationGroupChange = (value) => {
    this.setState({
      graduationGroup: value
    })
  }
  handleCourseGroupChange = (value) => {
    this.setState({
      courseGroup: value
    })
  }
  render(){
    const { candidates, checkBoxValues, loading, hasMore, name, school_name
        , graduationGroup, graduation_groups, courseGroup, course_groups } = this.state
    const { moduleName } = this.props
    return(
      <ModalWrapper
        ref="modalWrapper"
        width="700px"
        title={`代码查重`}
        {...this.props }
        onOk={this.onOk}
        className="checkCodeModal"
      >
        <style>
        {`
        .demo-loading-container {
          position: absolute;
          bottom: 93px;
          width: 82%;
          text-align: center;
        }
        .df {
          display: flex;
          align-items: baseline;
          margin: 12px 0;
        }
        .firstLabel {
          flex: 0 0 60px;
        }
        .df span.label {
          margin-right: 8px;
          text-align: right;
          margin-left: 12px;
        }
        .df .ant-input-affix-wrapper {
          width: 32%;
        }

        .checkCodeModal label.task-hide {
          width: 100%;
        }
        `}
        </style>
        
        <p className="clearfix mb2" style={{ margin: '0px 15px 6px' }}>
          <Checkbox className="fl" style={{ visibility: 'hidden' }}  ></Checkbox>
          <span className="fl with25"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{'分班名称'}</label></span>
          <span className="fl with25"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{'有效作品数'}</label></span>
          <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{'上次查重时间'}</label></span>
          
        </p>
        <div>
          {/* https://github.com/CassetteRocks/react-infinite-scroller/issues/70 */}
          <div className="edu-back-skyblue padding10-15" style={{"height":"300px", overflowY: "scroll", overflowAnchor: 'none' }}>
              <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>

                { candidates && candidates.map( candidate => {
                  return (
                    <p className="clearfix mb7" key={candidate.id}>
                      <Checkbox className="fl" value={candidate.id} key={candidate.id}></Checkbox>
                      <span className="fl with25">
                        <ConditionToolTip title={candidate.name} condition={candidate.name && candidate.name.length > 12 }>
                          <label className="task-hide fl" style={{"maxWidth":"208px;"}}>{candidate.name}</label>
                        </ConditionToolTip>
                      </span>
                      <span className="fl with25">
                        <ConditionToolTip title={candidate.nickname} condition={candidate.nickname && candidate.nickname.length > 12 }>
                          <label className="task-hide fl" style={{"maxWidth":"208px;"}}>{candidate.nickname}</label>
                        </ConditionToolTip>
                      </span>
                      <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{candidate.school_name}</label></span>
                      
                    </p>
                  )
                }) }
              </Checkbox.Group>
              
          </div>
        </div>
      </ModalWrapper>
    )
  }
}
export default CheckCodeModal;
