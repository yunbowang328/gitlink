import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin, Select, Divider  } from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"
import InfiniteScroll from 'react-infinite-scroller';
import { ROLE_TEACHER_NUM, ROLE_ASSISTANT_NUM } from '../common'
import NoneData from '../../coursesPublic/NoneData'
import { ConditionToolTip, ThemeContext } from 'educoder'
import SchoolSelect from '../../coursesPublic/form/SchoolSelect'

const Option = Select.Option;
const pageCount = 15;
class AddStudentModal extends Component{
  constructor(props){
    super(props);
    this.state={
      checkBoxValues: [],
      users: [],
      hasMore: true,
      loading: false,
      courseGroup: '',
      page: 1,
      isSpin:false
    }
  }
  fetchMemberList = (arg_page) => {
    const courseId = this.props.match.params.coursesId    
    const page = arg_page || this.state.page;
    const { name, school_name } = this.state
    let url = `/courses/${courseId}/search_users.json?page=${page}&limit=${pageCount}&school_name=${school_name || ''}&name=${name || ''}`
    this.setState({ loading: true })
    axios.get(encodeURI(url))
    .then((response) => {
      if (!response.data.users || response.data.users.length == 0) {
        this.setState({
          users: page == 1 ? response.data.users : this.state.users,
          page,
          loading: false,
          hasMore: false,
        })
      } else {
        this.setState({
          users: page == 1 ? response.data.users : this.state.users.concat(response.data.users),
          page,
          loading: false,
          hasMore: response.data.users.length == pageCount
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
    
    let url = `/courses/${courseId}/all_course_groups.json`
    
    axios.get(url, {
    })
    .then((response) => {
      if (response.data.course_groups && response.data.course_groups.length) {
        this.setState({
          course_groups: response.data.course_groups,
          courseGroup: '0' // response.data.course_groups[0].id
        })
      } else {
        // showNotification('')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  setVisible = (visible) => {
    if (visible) {
      this.setState({
        school_name: this.props.user.user_school,
        name: undefined
      },()=>{
        this.fetchMemberList();
      })
      this.fetchOptions()
    }
    this.refs.modalWrapper.setVisible(visible)
    if (visible == false) {
      this.setState({
        checkBoxValues: [],
      })
    }
  }

  onSendOk = () => {
    
    if(!this.state.checkBoxValues || this.state.checkBoxValues.length == 0) {
      this.props.showNotification('请从列表中先选择用户。')
      return;
    }
    this.setState({
      isSpin:true
    })
    const courseId = this.props.match.params.coursesId   
    const url = `/courses/${courseId}/add_students_by_search.json`
    const params = { 
      "user_ids": this.state.checkBoxValues
    }
    const { courseGroup } = this.state
    if (courseGroup) {
      params.course_group_id = courseGroup
    }
    axios.post(url, params)
    .then((response) => {
      if (response.data.status == 0) {
        this.setVisible(false)
        this.props.showNotification('添加成功')
        this.props.addStudentSuccess && this.props.addStudentSuccess(params)
        this.setState({
          isSpin:false
        })
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
  handleCourseGroupChange = (value) => {
    this.setState({
      courseGroup: value
    })
  }
  render(){
    const { users, checkBoxValues, loading, hasMore, name, school_name
        , courseGroup, course_groups,isSpin  } = this.state
    const { moduleName } = this.props
    let theme = this.context;
    return(
      <ModalWrapper
        ref="modalWrapper"
        width="700px"
        title={`添加${moduleName}`}
        {...this.props }
        onOk={this.onOk}
        className="addStudentModal courseForm"
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
        <div className="df">
          <span className="mr10">姓名:</span>
          <Input allowClear placeholder="请输入真实姓名" value={name} onChange={(e) => {this.setState({name: e.target.value})}}
            style={{ width: '221px'}}
          ></Input>
          <span className="label" style={{ minWidth: '36px' }}>单位:</span>
          {/* <Input allowClear placeholder="请输入单位名称" value={school_name} onChange={(e) => {this.setState({school_name: e.target.value})}}
            style={{ width: '200px'}}>
          </Input> */}
          <SchoolSelect 
            value={school_name}
            onChange={(value) => {this.setState({school_name: value})}}
          ></SchoolSelect>
          <a className="task-btn task-btn-orange" onClick={() => this.fetchMemberList(1)}
              style={{ height: '30px', lineHeight: '30px', marginLeft: '10px', width: '70px'}}
          >搜索</a>
        </div>
        {/* <Divider /> */}
        
        
        <p className="clearfix mb2" style={{ margin: '0px 20px 6px' }}>
          <Checkbox className="fl" style={{ visibility: 'hidden' }}  ></Checkbox>
          <span className="fl task-hide with25" style={{"maxWidth":"208px;"}}>{'姓名'}</span>
          <span className="fl task-hide with25" style={{"maxWidth":"208px;"}}>{'学号'}</span>
          <span className="fl task-hide with35" style={{"maxWidth":"208px;"}}>{'单位'}</span>
          <span className="fl task-hide with10" style={{"maxWidth":"48px;"}}>{''}</span>
          
        </p>
        <Spin size="large" spinning={isSpin}>
        { loading || users.length ? <div>
          {/* https://github.com/CassetteRocks/react-infinite-scroller/issues/70 */}
          <div className="edu-back-skyblue padding10-15" style={{height:"300px", overflowY: "scroll", overflowAnchor: 'none' }}>
            <InfiniteScroll
              threshold={10}
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>

                { users.map( candidate => {
                  return (
                    <p className="clearfix mb7" key={candidate.id}>
                      <Checkbox className="fl" value={candidate.id} key={candidate.id} disabled={candidate.added}></Checkbox>
                      <span className="fl task-hide with25 ml5">
                          { candidate.name ? 
                            <a href={`/users/${candidate.login}`} title={candidate.name} target="_blank"> 
                              { candidate.name }
                            </a> : <span> </span> }
                      </span>
                      <span className="fl task-hide with25" title={candidate.student_id} style={{ width: '145px' , height : "20px" }}>
                        {candidate.student_id || ' '}
                      </span>
                      <span className="fl task-hide with35" title={candidate.school_name} style={{ width: '204px' , height : "20px" }}>{candidate.school_name}</span>
                      <span className="fl task-hide with10" style={{"maxWidth":"48px", color: theme.foreground_select }}>{candidate.added ? '已加入' : ''}</span>
                    </p>
                  )
                }) }
              </Checkbox.Group>
              {loading && hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
              
            </InfiniteScroll>
          </div>
          {course_groups && course_groups.length && <div className="df" style={{ marginTop: '12px' }}  >
            <span className="mr10" style={{ width: '148px' }}>所选学生分班至(选填):</span>
            <Select style={{ width: 236 }} onChange={this.handleCourseGroupChange} value={courseGroup}>
              <Option value={'0'}>{'未分班'}</Option>
              { course_groups.map((item) => {
                return <Option value={item.id}>{item.name}</Option>
              })}
            </Select>
          </div>}
        </div> : <NoneData></NoneData> }
        </Spin>
      </ModalWrapper>
    )
  }
}

AddStudentModal.contextType = ThemeContext;
export default AddStudentModal;
