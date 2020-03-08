import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin, Select, Divider, Icon  } from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"
import InfiniteScroll from 'react-infinite-scroller';
import { ROLE_TEACHER_NUM, ROLE_ASSISTANT_NUM } from '../common'
import { ConditionToolTip, ActionBtn } from 'educoder'
import NoneData from '../../coursesPublic/NoneData'
import AddGraduationGroupModal from './AddGraduationGroupModal'
import SchoolSelect from '../../coursesPublic/form/SchoolSelect'

const Option = Select.Option;
const pageCount = 15;
let timeout, currentValue
class AddTeacherModal extends Component{
  constructor(props){
    super(props);
    this.state={
      school_names: [],
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
          candidates: page == 1 ? response.data.candidates : this.state.candidates,
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
  onAddGraduationGroupOk = () => {
    this.fetchOptions()
  }
  fetchOptions = () => {
    // add_teacher_popup
    const courseId = this.props.match.params.coursesId    
    
    let url = `/courses/${courseId}/add_teacher_popup.json`
    
    axios.get(url, {
    })
    .then((response) => {

      if (response.data.school_name) {
        this.setState({
          school_name: response.data.school_name
        }, () => this.fetchMemberList())
      } else {
        this.fetchMemberList()

      }
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
      this.fetchOptions()
    }
    this.refs.modalWrapper.setVisible(visible)
    if (visible == false) {
      this.setState({
        checkBoxValues: []
      })
    }
    this.setState({
      name:undefined,
      graduationGroup:undefined,
      courseGroup:undefined
    })
  }

  onSendOk = () => {
    const courseId = this.props.match.params.coursesId   
    const url = `/courses/${courseId}/add_teacher.json`
    if (this.state.checkBoxValues.length == 0) {
      this.props.showNotification('请先在下面列表中选择要添加教师的成员')
      return
    }
    const params = { 
      "user_list": this.state.checkBoxValues.map (item => { return { 'user_id': item }}) ,
      // "graduation_group_id": "2",
      // "course_group_id": "820",
      "role": this.props.isTeacher ? ROLE_TEACHER_NUM : ROLE_ASSISTANT_NUM
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
        this.props.addTeacherSuccess && this.props.addTeacherSuccess(params)
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
  onOrgNameChange = (value) => {
    // console.log('school_name: ', value)
    this.setState({ school_name: value })
  }
  
  hasGraduationModule = () => {
    const { course_modules } = this.props;
    const result = course_modules && course_modules.filter( item => {
      return item.type == 'graduation'
    })
    return result && result.length > 0
  }

  render(){
    const { candidates, checkBoxValues, loading, hasMore, name, school_name, school_names
        , graduationGroup, graduation_groups, courseGroup, course_groups } = this.state
    const { moduleName } = this.props
    
    return(
      <ModalWrapper
        ref="modalWrapper"
        width="700px"
        title={`添加${moduleName}`}
        {...this.props }
        onOk={this.onOk}
        className="addTeacherModal courseForm"
      >
        <AddGraduationGroupModal ref="addGraduationGroupModal"
          {...this.props} onOk={this.onAddGraduationGroupOk}
        ></AddGraduationGroupModal>
        <style>
        {`
        .demo-loading-container {
          position: absolute;
          bottom: 210px;
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
          text-align: left;
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
          <span className="firstLabel label" style={{ flex: '0 0 40px' }}>姓名:</span>
          <Input allowClear placeholder="请输入真实姓名" value={name} onChange={(e) => {this.setState({name: e.target.value})}} 
              style={{ width: '200px', marginRight: '18px' }}>
          </Input>
          <span className="label" style={{ minWidth: '36px', flex: '0 0 40px' }}>单位:</span>
          <SchoolSelect
            value={school_name}
            onChange={this.onOrgNameChange}
          ></SchoolSelect>
          {/* <Select allowClear placeholder="请输入单位名称" value={school_name} 
              style={{ width: '200px'}} showArrow={false}
              filterOption={false} onSearch={this.onOrgNameSearch}
              onChange={this.onOrgNameChange} notFoundContent={null}
              showSearch defaultActiveFirstOption={false}
          >
            { school_names && school_names.map((item, index) => {
              return <Option value={item} key={index}>{item}</Option>
            })}
          </Select> */}
          <a className="task-btn task-btn-orange" onClick={() => this.fetchMemberList(1)}
              style={{ height: '30px', lineHeight: '30px', marginLeft: '10px', width: '70px'}}
          >搜索</a>
        </div>
        {/* graduation_groups && !!graduation_groups.length  */}
        
        
        <p className="clearfix mb2" style={{ margin: '0px 20px 6px' }}>
          <Checkbox className="fl" style={{ visibility: 'hidden' }}  ></Checkbox>
          <span className="fl task-hide with25" style={{"maxWidth":"208px;"}}>{'姓名'}</span>
          <span className="fl task-hide with25" style={{"maxWidth":"208px;"}}>{'昵称'}</span>
          <span className="fl task-hide with35" style={{"maxWidth":"208px;"}}>{'单位'}</span>
          <span className="fl task-hide with10" style={{"maxWidth":"48px"}}>{''}</span>
          
        </p>
        { loading || candidates.length ? <div>
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
              <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>

                { candidates && candidates.map( candidate => {
                  return (
                    <p className="clearfix mb7" key={candidate.id}>
                      <Checkbox className="fl" value={candidate.id} key={candidate.id} disabled={candidate.added}></Checkbox>
                      <span className="fl task-hide with25 ml5" style={{ width: '145px' , height : "20px" }}>
                        <a href={`/users/${candidate.login}`} target="_blank" title={candidate.name}>{candidate.name}</a>
                      </span>
                      <span className="fl task-hide with25" title={candidate.nickname} style={{ width: '145px' , height : "20px" }}>
                          {candidate.nickname}
                      </span>
                      <span className="fl task-hide with35" title={candidate.school_name} style={{ width: '145px' , height : "20px" }}>
                        {candidate.school_name}
                      </span>
                      <span className="fl task-hide with10 color-blue" style={{"maxWidth":"48px;"}}>{candidate.added ? '已加入' : ''}</span>
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
        </div>  : <NoneData></NoneData> }
        <div className="df">
        { this.hasGraduationModule() && <div className="df" style={{ marginTop: '24px' }}  >
          <span className="firstLabel label" style={{ flex: '0 0 96px' }}>添加至答辩组:</span>
          <Select style={{ width: 218, marginRight: '18px' }} onChange={this.handleGradationGroupChange} value={graduationGroup}
            dropdownRender={menu => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                {/* <ActionBtn
                  onMouseDown={() => { debugger; this.refs['addGraduationGroupModal'].setVisible(true) }}
                >添加答辩组</ActionBtn> */}
                <div style={{ padding: '8px', cursor: 'pointer' }} 
                    onMouseDown={() => { debugger; this.refs['addGraduationGroupModal'].setVisible(true) }}
                >
                  <Icon type="plus" /> 添加答辩组
                </div>
              </div>
            )}
          >
            { graduation_groups && graduation_groups.map((item) => {
              return <Option value={item.id}>{item.name}</Option>
            })}
          </Select>
        </div>}

        { course_groups && !!course_groups.length && <div className="df">
          <span className="firstLabel label">管理权限:</span>
          <Select style={{ width: 218 }} onChange={this.handleCourseGroupChange} value={courseGroup}>
            { course_groups && course_groups.map((item) => {
              return <Option value={item.id}>{item.name}</Option>
            })}
          </Select>
        </div> }
        </div>
      </ModalWrapper>
    )
  }
}
export default AddTeacherModal;
