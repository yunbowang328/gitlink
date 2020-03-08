import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin, Select, Divider, Radio  } from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"
import InfiniteScroll from 'react-infinite-scroller';
import { ROLE_TEACHER_NUM, ROLE_ASSISTANT_NUM } from '../common'
import NoneData from '../../coursesPublic/NoneData'
import { ConditionToolTip } from 'educoder'
import SchoolSelect from '../../coursesPublic/form/SchoolSelect'

const RadioGroup = Radio.Group;

const Option = Select.Option;
const pageCount = 15;
class AddAdminModal extends Component{
  constructor(props){
    super(props);
    this.state={
      radioBoxValue: [],
      users: [],
      hasMore: true,
      loading: false,
      courseGroup: '',
      page: 1
    }
  }
  fetchTeacherList = (arg_page) => {
    const courseId = this.props.match.params.coursesId    
    const page = arg_page || this.state.page;
    const { name, school_name } = this.state
    
    let url = `/courses/${courseId}/teachers.json`
    this.setState({ loading: true })
    axios.get(url, {
        params: {
            page: page,
            limit: pageCount
        }
    })
    .then((response) => {
      if (!response.data.teacher_list || response.data.teacher_list.length == 0) {
        this.setState({
          teacher_list: page == 1 ? response.data.teacher_list : this.state.teacher_list,
          page,
          loading: false,
          hasMore: false,
        })
      } else {
        this.setState({
          teacher_list: page == 1 ? response.data.teacher_list : this.state.teacher_list.concat(response.data.teacher_list),
          page,
          loading: false,
          hasMore: response.data.teacher_list.length == pageCount
        })
      }

    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  componentDidMount() {
    
    
  }
  setVisible = (visible) => {
    if (visible) {
      this.fetchTeacherList()
    }
    this.refs.modalWrapper.setVisible(visible)
    if (visible == false) {
      this.setState({
        radioBoxValue: ''
      })
    }
  }

  onSendOk = () => {
    if(!this.state.radioBoxValue || this.state.radioBoxValue.length == 0) {
      this.props.showNotification('请从列表中先选择用户。')
      return;
    }
    const courseId = this.props.match.params.coursesId   
    const params = { 
      "user_ids": this.state.radioBoxValue
    }
    const { courseGroup } = this.state
    
    if (courseGroup) {
      params.course_group_id = courseGroup
    } 
    const url = `/courses/${courseId}/change_course_admin.json`
    axios.post(url, {
      course_member_id: this.state.radioBoxValue.course_member_id,
      user_id: this.state.radioBoxValue.user_id
    }).then((result)=>{
      if(result.data.status==0){
        this.props.showNotification('操作成功。')
        if (this.props.isCourseAdmin()) {
          window.location.reload()
        }
        // this.fetchAll()
        this.setVisible(false)
        this.props.changeAdminSuccess && this.props.changeAdminSuccess()
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  onOk = () => {
    this.onSendOk()
  }

  onCheckBoxChange = (e) => {
    this.setState({
      radioBoxValue: e.target.value
    })
  }

  handleInfiniteOnLoad = () => {
    this.fetchTeacherList(this.state.page + 1)
  }

  onSearch = () => {
    this.fetchTeacherList(1)
  }
  handleCourseGroupChange = (value) => {
    this.setState({
      courseGroup: value
    })
  }
  render(){
    const { teacher_list, radioBoxValue, loading, hasMore, name, school_name
        , courseGroup, course_groups,  } = this.state
    const { moduleName } = this.props
    return(
      <ModalWrapper
        ref="modalWrapper"
        width="600px"
        title={`更换管理员`}
        {...this.props }
        onOk={this.onOk}
        className="addStudentModal"
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

        .addTeacherModal label.task-hide {
          width: 100%;
        }
        `}
        </style>
        
        <div className="df" style={{ alignItems: 'center', flexDirection: 'column'}}>
          <p>选择的成员将会成为新的管理员</p>
          <p>您将不再拥有管理员的权限，但您仍是教师团队的一员</p>

        </div>
        
        
        {/* <p className="clearfix mb2" style={{ margin: '0px 15px 6px' }}>
          <Checkbox className="fl" style={{ visibility: 'hidden' }}  ></Checkbox>
          <span className="fl with25"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{'姓名'}</label></span>
          <span className="fl with25"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{'学号'}</label></span>
          <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{'单位'}</label></span>          
        </p> */}
        { teacher_list && teacher_list.length ? <div>
          {/* https://github.com/CassetteRocks/react-infinite-scroller/issues/70 */}
          <div className="edu-back-skyblue padding10-15" style={{"height":"300px", overflowY: "scroll", overflowAnchor: 'none' }}>
            <InfiniteScroll
              threshold={10}
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <RadioGroup style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={radioBoxValue}>

                { teacher_list.map( candidate => {
                  return (
                    <p className="clearfix mb7" key={candidate.user_id}>
                      <Radio className="fl" value={candidate} disabled={candidate.role == "管理员"}></Radio>
                      <span className="fl with25">
                        <label className="task-hide fl" style={{"maxWidth":"208px"}}>{candidate.name || '　'}{candidate.role == "管理员" ? '(当前管理员)' : '' }</label>
                      </span>
                      {/* <span className="fl with25">
                        <ConditionToolTip title={candidate.student_id} condition={candidate.student_id && candidate.student_id.length > 12 }>
                          <label className="task-hide fl" style={{"maxWidth":"208px;"}}>{candidate.student_id || '　'}</label>
                        </ConditionToolTip>
                      </span>
                      <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{candidate.school_name}</label></span> */}
                      
                    </p>
                  )
                }) }
              </RadioGroup>
              {loading && hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
              
            </InfiniteScroll>
          </div>
        </div> : <NoneData></NoneData> }
      </ModalWrapper>
    )
  }
}
export default AddAdminModal;
