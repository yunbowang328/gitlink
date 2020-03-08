import React,{ Component } from "react";
import { Input,Checkbox,Table, Divider, Tooltip,Spin, Menu, Popconfirm } from "antd";

import CourseLayoutcomponent from '../common/CourseLayoutComponent'
import NoneData from "../coursesPublic/NoneData"

import Titlesearchsection from '../common/titleSearch/TitleSearchSection'
import ColorCountText from '../common/titleSearch/ColorCountText'
import update from 'immutability-helper'

import { WordsBtn, ConditionToolTip, on, off ,trigger, sortDirections } from 'educoder'

import axios from 'axios'

import _ from 'lodash'
// import { RouteHOC } from './common.js'

import '../css/members.css'
import { from } from "array-flatten";
// import AddTeacherModal from './modal/AddTeacherModal'
// import AddStudentModal from './modal/AddStudentModal'
import AddGraduationGroupModal from './modal/AddGraduationGroupModal'
import AddAdminModal from './modal/AddAdminModal'
import CourseGroupChooserModal from './modal/CourseGroupChooserModal'
import { ROLE_TEACHER_NUM, ROLE_ASSISTANT_NUM } from './common'
import CourseGroupChooser from './CourseGroupChooser'
import ChangeRolePop from './ChangeRolePop'

const Search = Input.Search;
const ROLE_ADMIN = "管理员"
const ROLE_TEACHER = "教师"
const ROLE_TEACHER_ASSISTANT = "助教"
const pageSize = 20;

function buildColumns(that) {
  let sortedInfo = that.state.sortedInfo || {}
  const isAdmin = that.props.isAdmin()
  const isAdminOrCreator = that.props.isAdminOrCreator();
  const isAdminOrTeacher = that.props.isAdminOrTeacher()
  const { course_groups, filterKey } = that.state
  const showSorter = filterKey == '1' 
  const courseId = that.props.match.params.coursesId    

  const columns = [{
    title: '序号',
    dataIndex: 'name',
    key: 'index',
    width: 78,
    render: (content, item, index) => {
      return index + 1
      // return item.isApply == true ? '' : <a href="javascript:;">{(that.state.page - 1) * 20 + index + 1 
      //     - (that.state.application_list ? that.state.application_list.length : 0)}　</a>
    }
  }
  // ,{
  //   title: '用户ID',
  //   width: 120,
  //   dataIndex: 'login',
  //   key: 'login',
  //   render: (login, record) => {
  //     return <span className="overflowHidden1" style={{ maxWidth: '110px'}} title={`${login.length > 8 ? login : ''}`}>{login}</span>
  //   }
  // }
  , {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    key: 'name',
    sorter: showSorter,
    sortDirections: sortDirections,
    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    render: (name, record) => {
      return <a href={`/users/${record.login}`} target="_blank" className="overflowHidden1" style={{ maxWidth: '110px'}} 
          title={`${name.length > 4 ? name : ''}`}>{name}</a>
    }
  }, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    sorter: showSorter,
    width: 86,
    // 'ascend' | 'descend'
    defaultSortOrder: 'ascend',
    sortDirections: sortDirections,
    sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,

  }] 
  that.state.course_groups && that.state.course_groups.length && showSorter && columns.push({
    title: <Tooltip title="仅能批阅指定分班的作品">管理权限</Tooltip>,
    width: 260,
    key: 'course_groups',
    dataIndex: 'course_groups',
    // onClick={() => that.joinCourseGroup(item.id)}
    // "right":"0px",
    render: (arg_course_groups, item, index) => {
      if (!arg_course_groups) {
        return ''
      }
      // ((!course_groups || course_groups.length == 0) && <p>暂未有分班信息，不能操作</p>)
      const noGroups = (!course_groups || course_groups.length == 0);
      return (
        <ConditionToolTip title={`暂未有分班信息，不能操作`} condition={noGroups}>
        <span className="drop_down" style={{color: '#29BD8B', display: 'inline-block'}}>
        { arg_course_groups.length == 0 ? '全部分班' : arg_course_groups.map(item => item.name).join(', ') }
        { isAdmin &&
          <React.Fragment>
            <i className="iconfont icon-xiajiantou font-12 ml2"></i>
            {!noGroups && <CourseGroupChooser
              {...{course_groups, isAdminOrCreator, item, index, arg_course_groups,
                checkAllValue: that.state.checkAllArray[index],
                joinCourseGroup: that.joinCourseGroup,
                onCheckAllChange: that.onCheckAllChange}}
            ></CourseGroupChooser>}
          </React.Fragment> }
        </span>
      </ConditionToolTip>)
      }
    ,
  });
  const hasGraduationModule = that.hasGraduationModule()
  if (hasGraduationModule && showSorter) {
    columns.push({
      title: '所在答辩组',
      // width: 90,
      sorter: showSorter,
      sortDirections: sortDirections,
      key: 'graduation_group',
      dataIndex: 'graduation_group',
      sortOrder: sortedInfo.columnKey === 'graduation_group' && sortedInfo.order,

      render: text => (
        <span className="overflowHidden1" style={{ maxWidth: '160px'}}
            title={`${text && text.length > 10 ? text : ''}`}
        >
          {text}
        </span>
      ),
    })
  }
  if (isAdminOrTeacher) {
    columns.push({
      title: '操作',
      key: 'action',
      width: 150,
      align:'center',
      render: (text, record) => {
        const isAdmin = record.role == ROLE_ADMIN
        const isTeacher = record.role == ROLE_TEACHER
        const isAssitant = record.role == ROLE_TEACHER_ASSISTANT
        if (record.application_id) {
          return (
            <span>
              <WordsBtn onClick={() => that.onRefuse(record)} style={'grey'}>拒绝</WordsBtn>
              <Divider type="vertical" />
              <a onClick={() => that.onAgree(record)} style={{color: '#4CACFF'}}>同意</a> 
            </span> )
        } else {

          return (
            <React.Fragment>
              <WordsBtn style2={{ marginRight: '12px' }} onClick={() => that.onDelete(record)} style={'grey'}>删除</WordsBtn>              
              <ChangeRolePop
                courseId={courseId}
                record={record}
                member_roles={record.member_roles}
                onChangeRoleSuccess={that.onChangeRoleSuccess}
                showNotification={that.props.showNotification}
                getUserId={that.props.isUserid}
                fetchUser={that.props.fetchUser}

              ></ChangeRolePop>
              {/* <Popconfirm 
                placement="bottom"
                icon={null}
                title={
                  <React.Fragment>
                    <Checkbox disable={isAdmin}>管理员</Checkbox>
                    <Checkbox disable={isAdmin}>助教</Checkbox>
                    <Checkbox >学生</Checkbox>
                  </React.Fragment>
                }
              >
                <WordsBtn style={'blue'}>修改角色</WordsBtn>
              </Popconfirm> */}
            </React.Fragment>


            // <span>
            //   {record.role != ROLE_ADMIN && <WordsBtn onClick={() => that.onDelete(record)} style={'grey'}>删除</WordsBtn>}
            //   {(record.role == ROLE_TEACHER || record.role == ROLE_TEACHER_ASSISTANT || isAdminOrCreator) && record.role != ROLE_ADMIN
            //        && <Divider type="vertical" />}
            //   { record.role == ROLE_TEACHER ? <a style={{color: '#4CACFF'}} onClick={() => that.changeToAssistant(record)}>变更为助教</a> : '' }
            //   { record.role == ROLE_TEACHER_ASSISTANT ? <a style={{color: '#4CACFF'}} onClick={() => that.changeToTeacher(record)}>变更为教师</a> : '' }
            //   { record.role == ROLE_ADMIN  && isAdminOrCreator ? <a style={{color: '#4CACFF', marginLeft: '44px'}} onClick={() => that.showChangeAdminModal(record)}>更换管理员</a> : '' }
              
            // </span> 
            )
        }
        
      },
    })
  }
  // 待审批不需要
  if(filterKey == '1' && isAdminOrTeacher && hasGraduationModule) {
    columns.unshift({
      title: '',
      dataIndex: 'course_member_id',
      key: 'course_member_id',
      render: (content, item, index) => {
        return content ? <Checkbox value={content}></Checkbox> : ''
      }
    })  
  }
  return columns
}

const ORDER_BY_NAME = 1;
const ORDER_BY_DATE = 2;
const ORDER_BY_GRADUATION_GROUP = 3;

class studentsList extends Component{
  constructor(props){
    super(props);
    this.state={
      headIndex:"1",
      page:1,
      sortedInfo: { columnKey: 'role', order: 'ascend'},
      totalPage:undefined,
      searchValue:"",
      order: ORDER_BY_DATE,
      search:"",
      groupList:undefined,
      teachers: [],
      checkBoxValues: [],
      isSpin:false,
      application_list: [],
      course_groups: [],
      checkAllArray: [],
      filterKey: 1,   // 1 已审批   2  待审批
    }
  }
  onCheckAllChange = (e, item, index) => {
    const that = this;
    const checkAllArray = that.state.checkAllArray.slice(0)
    checkAllArray[index] = !checkAllArray[index]
    that.setState({checkAllArray})
    if (checkAllArray[index]) {
      that.joinCourseGroup(that.state.course_groups.map((item) => item.id), item, index)
    } else {
      that.joinCourseGroup([], item, index)
    }
  }
  inputSearch=(e)=>{
    this.setState({
      searchValue:e.target.value
    })
  }
  // approval 2 - 拒绝
  onAgree = (record, approval = 1) => {
    const isAdminOrCreator = this.props.isAdminOrCreator()
    const { course_groups ,filterKey} = this.state
    if (approval == 1 && isAdminOrCreator && course_groups && course_groups.length) {
      this.setState({ clickRecord: record}, () => {
        this.setGroupChooserModalVisible(true)
      })
      return;
    }
    const courseId = this.props.match.params.coursesId    
    
    let url = `/courses/${courseId}/teacher_application_review.json`
    
    this.props.confirm({
      content: `是否确认${ approval == 1 ? '同意' : '拒绝'}TA的加入？`,
      onOk: () => {
        axios.post(url, {
          user_id: record.user_id,
          application_id: record.application_id,
          approval: approval
        })
        .then((response) => {
          if (response.data.status == 0) {
            this.props.showNotification(`已${approval == 1? '同意' : '拒绝'}`)
            this.fetchAll(1,filterKey)
          }
        })
        .catch(function (error) {
          console.log(error);
        });  
      }
    })

    
  }
  onRefuse = (record) => {
    this.onAgree(record, 2)
  }

  componentDidMount(){
    this.setState({
      isSpin:true
    })
		let newmenuid=this.props.location.search.replace('?tab=', '');
		if(newmenuid===undefined||newmenuid===""||newmenuid==="1"||newmenuid===1){
			this.setState({
				filterKey:'1'
			})
			this.fetchAll(1,'1');
		}else{
			this.setState({
				filterKey:'2'
			})
			this.fetchAll(1,'2');
		}


    const isAdminOrTeacher = this.props.isAdminOrTeacher()
    const isAdmin = this.props.isAdmin()

    isAdminOrTeacher && this.getGroupList();
    this.getCourseGroups();

    on('addTeacherSuccess', this.addTeacherSuccessListener)
    isAdmin && on('updateNavSuccess', this.updateNavSuccess)

  }
  componentWillUnmount() {
    off('addTeacherSuccess', this.addTeacherSuccessListener)
    const isAdmin = this.props.isAdmin()
    isAdmin && off('updateNavSuccess', this.updateNavSuccess)
  }
  updateNavSuccess = () => {
    this.getCourseGroups()
  }
  addTeacherSuccessListener = (e, data) => {

    // const params = JSON.parse(data)
    // const coursesId = this.props.match.params.coursesId
    if (window.location.pathname.endsWith('teachers')) {
      this.fetchAll(1,this.state.filterKey)
    } else {
      // this.props.history.push(`/courses/${coursesId}/teachers`)
    }
    // console.log('addTeacherSuccessListener', data)
  }
  getCourseGroups = () => {
    const courseId = this.props.match.params.coursesId    
    
    let url = `/courses/${courseId}/all_course_groups.json`
    
    axios.get(url, {
      params: { all: true }
    })
    .then((response) => {
      if (response.data.course_groups && response.data.course_groups.length) {
        let course_groups_map = {}
        response.data.course_groups.forEach(item => {
          course_groups_map[item.id] = item.name
        })
        this.setState({
          course_groups: response.data.course_groups,
          course_groups_map
        })
      } else {
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  joinCourseGroup = (ids, item, index) => {
    // console.log('join ', ids, item)
    
    const courseId = this.props.match.params.coursesId    
    
    let url = `/courses/${courseId}/set_course_group.json`
    
    axios.post(url, {
      course_group_ids: ids,
      user_id: item.user_id,
      course_member_id: item.course_member_id
    })
    .then((response) => {
      if (response.data.status == 0) {
        this.props.showNotification('修改成功')
        const newArray = ids.map((item) => {return {id: item, name: this.state.course_groups_map[item]}});
        this.setState(
          (prevState) => ({
              teachers : update(prevState.teachers, {[ this.state.page == 1 ? index - this.state.application_list.length : index]: { course_groups: {$set: newArray }}})
          }))
        // this.fetchAll()
      } else {
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onChangeRoleSuccess = () => {
    this.fetchAll(undefined,this.state.filterKey)
  } 
  fetchAll = async (argPage,filterKey) => {
		let { searchValue }=this.state

    this.setState({
      isSpin:true
    })
    let id = this.props.match.params.coursesId    
    if (argPage) {
      this.setState({ page: argPage })
    }
    
    const sortedInfo = this.state.sortedInfo;
    let page = argPage || this.state.page

    let order = 1;
    if (sortedInfo.columnKey == 'role') {
      order = 1;
    } else if (sortedInfo.columnKey == 'name') {
      order = 2;
    } else if (sortedInfo.columnKey == 'graduation_group') {
      order = 3;
    }
    let sort = 'desc'
    if (sortedInfo.order == 'ascend') {
      sort = 'asc'
    }
    let url=`/courses/${id}/teachers.json?order=${order}&page=${page}&sort=${sort}`;
    if (filterKey == '1') {

    } else if (filterKey == '2') {
      url =  `/courses/${id}/apply_teachers.json?_a=1`
    }
    if(searchValue!=""){
      url+='&search='+searchValue;
    }
    const result = await axios.get(encodeURI(url))
    // axios.get((url)).then((result)=>{
      if (result.data.teacher_list) {
        this.setState({ 
          teachers: result.data.teacher_list,
          total_count: result.data.teacher_list_size,
          application_list: result.data.application_list || [],
          is_admin: result.data.is_admin,
          apply_size: result.data.apply_size,
          isSpin:false
        })
      } else if (result.data.application_list) {
        this.setState({ 
          total_count: result.data.teacher_list_size,
          application_list: result.data.application_list || [],
          is_admin: result.data.is_admin,
          apply_size: result.data.apply_size,
          isSpin:false
        })
      }
    // }).catch((error)=>{
    //   console.log(error);
    //   this.setState({
    //     isSpin:false
    //   })
    // })
  }
  getGroupList(){
    let id = this.props.match.params.coursesId    
    let url='/courses/'+id+'/graduation_group_list.json';
    axios.get((url)).then((result)=>{
      if(result.status==200){
        this.setState({
          groupList:result.data
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  onAddGraduationGroupOk = () => {
    this.getGroupList()
  }

  // join_graduation_group
  joinGraduationGroup = (graduation_group_id) => {
    const courseId = this.props.match.params.coursesId
		let { filterKey }=this.state
    let url= `/courses/${courseId}/join_graduation_group.json`;
    axios.post(url, {
      course_member_list: this.state.checkBoxValues.map (item => { return { course_member_id: item } }),
      graduation_group_id: graduation_group_id
    }).then((result)=>{
      if(result.data.status==0){
        this.props.showNotification('操作成功。')
        this.fetchAll(undefined,filterKey)
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  onInputSearchChange = (e) => {
  	let {filterKey}=this.state;
    this.setState({
      searchValue: e.target.value
    })

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
    }
    this.timeoutHandler = setTimeout(() => {
      this.fetchAll(1,filterKey)
    }, 1200)
  }

  onPressEnter = (e) => {
    this.fetchAll(1,this.state.filterKey)
  }


  onCheckBoxChange = (checkedValues) => {
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue: checkedValues.length == this.state.teachers.length
    })
  }
  onCheckAll = (e) => {
    this.setState({
      checkAllValue: e.target.checked
    })
    const values = this.state.teachers.map(item => {
      return item.course_member_id
    })
    if (e.target.checked) {
      const concated = this.state.checkBoxValues.concat(values);
      const sortedUniqed = _.uniq(concated)
      this.setState({
        checkBoxValues: sortedUniqed
      })
    } else {
      this.setState({
        checkBoxValues: _.difference(this.state.checkBoxValues, values)
      })
    }
  }
  onSortTypeChange = (order) => {
    this.setState({ order: order }, () => {
      this.fetchAll()
    })
  } 
  changeRole = (member, role) => {
    
    const courseId = this.props.match.params.coursesId    
    let {filterKey}=this.state;
    let url= `/courses/${courseId}/change_course_teacher.json`;
    axios.post(url, {
      course_member_id: member.course_member_id
      // "user_list": [
      //   { "user_id": member.user_id }  
      // ],
      // "graduation_group_id": member.graduation_group_id,
      // "course_group_id": "820",
      // "role": role
    }).then((result)=>{
      if(result.data.status==0){
        this.props.showNotification('操作成功。')
        this.fetchAll(undefined,filterKey)
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  changeToAssistant = (member) => {
    this.changeRole(member, ROLE_ASSISTANT_NUM)
  }
  changeToTeacher = (member) => {
    this.changeRole(member, ROLE_TEACHER_NUM)
  }
  showChangeAdminModal = () => {
    this.refs.addAdminModal.setVisible(true)
  }
  changeAdminSuccess = () => {
  	let {filterKey}=this.state;
    this.fetchAll(undefined,filterKey)
  }
  onDelete = (member) => {
  	let {filterKey}=this.state;
    this.props.confirm({
      content: `确认要将“${member.name}”从教师列表中移除吗？`,
      onOk: () => {
        // const cid = this.props.match.params.coursesId
        const courseId = this.props.match.params.coursesId

        const url = `/courses/${courseId}/delete_course_teacher.json`
        axios.post(url, { 
            course_member_id: member.course_member_id
          })
        .then((response) => {
          if (response.data.status == 0) {
            // {"status":1,"message":"删除成功"}
            this.props.showNotification('删除成功')
            trigger('updatabanner')
            this.fetchAll(undefined,filterKey)
          }
        })
        .catch(function (error) {
          console.log(error);
        });    
      }
    })
  }
  addTeacher = () => {
    this.refs.addTeacherModal.setVisible(true)    
  }
  addStudent = () => {
    this.refs.addStudentModal.setVisible(true)    
  }

  hasGraduationModule = () => {
    const { course_modules } = this.props;
    const result = course_modules && course_modules.filter( item => {
      return item.type == 'graduation'
    })
    return result && result.length > 0
  }
  
  onTableChange = (pagination, filters, sorter) => {
  	let {filterKey}=this.state;
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      page: pagination.current,
      sortedInfo: sorter,
    }, () => {
      this.fetchAll(undefined,filterKey)
    });
  };
  clearSelection = () => {
    this.setState({ checkBoxValues: [] })
  }
  selectedStatus=(e)=>{
    this.clearSelection()
    this.setState({
      filterKey: e.key,
      page:1,
      isSpin:true
    }, () => {
      this.fetchAll(undefined,e.key);
    })
  }
  setGroupChooserModalVisible = (visible) => {
    // 这里只会调用open
    this.setState({groupChooserModalVisible: !this.state.groupChooserModalVisible})
  }
  render(){
    const isAdmin = this.props.isAdmin()
    const columns = buildColumns(this)
    let {
      searchValue, checkBoxValues, checkAllValue, course_groups,
      groupList, total_count, teachers, order, page, apply_size, filterKey
    }=this.state

    let currentOrderName = '加入时间排序'
    if (order == ORDER_BY_NAME) {
      currentOrderName = '姓名排序'
    } else if (order == ORDER_BY_GRADUATION_GROUP) {
      currentOrderName = '答辩组排序'
    }
    let combineArray = teachers.slice(0)
    if (page == 1 && filterKey == '2') {
      // this.state.application_list && this.state.application_list.slice(0).reverse().forEach(item => {
      //   item.isApply = true
      //   combineArray.unshift(item)
      // })
      combineArray = this.state.application_list
    }
    const isAdminOrTeacher = this.props.isAdminOrTeacher()
    const isAdminOrCreator = this.props.isAdminOrCreator()
    const isSuperAdmin = this.props.isSuperAdmin()
    const hasGraduationModule = this.hasGraduationModule()
    const coursesId = this.props.match.params.coursesId



    return(
      <React.Fragment>
        {/* <AddTeacherModal ref="addTeacherModal" 
          {...this.props}
          moduleName="教师"
        ></AddTeacherModal>
        <AddStudentModal ref="addStudentModal" 
          {...this.props}
          moduleName="学生"
        ></AddStudentModal> */}
        {isAdminOrTeacher && <AddGraduationGroupModal ref="addGraduationGroupModal"
          {...this.props} onOk={this.onAddGraduationGroupOk}
        ></AddGraduationGroupModal>}
        <AddAdminModal ref="addAdminModal"
          {...this.props} onOk={this.showChangeAdminModal}
          changeAdminSuccess={this.changeAdminSuccess}
        ></AddAdminModal>
        
        <Titlesearchsection
          title={<React.Fragment>
            <span>教师列表</span>
            {!isSuperAdmin && coursesId == '1309' && <span style={{color: '#848484', fontSize: '14px', marginLeft: '10px'}}>(示例课堂，部分成员不可见)</span>}
          </React.Fragment>}
          searchValue={ searchValue }
          onInputSearchChange={this.onInputSearchChange}
          showSearchInput={total_count >= 10}
          searchPlaceholder={ '请输入姓名进行搜索' }
          firstRowRight={
            <React.Fragment>
              {/* { isAdmin && <WordsBtn style="blue" className="mr30" onClick={()=>this.addTeacher()}>添加教师</WordsBtn> }
              { isAdmin && <WordsBtn style="blue" className="mr30" onClick={()=>this.addStudent()}>添加学生</WordsBtn> } */}
              
              { isAdminOrCreator && <WordsBtn style="blue" className="fr" onClick={()=>this.showChangeAdminModal()}>更换管理员</WordsBtn>}
            
            </React.Fragment>
          }
          secondRowLeft={
            isAdminOrTeacher ? <div className="fl mt6 task_menu_ul " style={{ width: '600px' }}>
                <Menu mode="horizontal" selectedKeys={[`${this.state.filterKey}`]} onClick={this.selectedStatus}>
                  <Menu.Item key="1">已审批({total_count})</Menu.Item>
                  <Menu.Item key="2">待审批({apply_size})</Menu.Item>
                </Menu>
                {/*  */}
              </div> :
              (!!total_count ? <ColorCountText count={total_count} name="个教师"></ColorCountText> : '')
          }
          onPressEnter={this.onPressEnter}
        ></Titlesearchsection>

        <style>{`
          /* CourseGroupChooser */
          .drop_down_menu .mainGroup.ant-checkbox-group {
            max-height: 170px;
            overflow-y: auto;
          }
          .task_menu_ul .ant-menu-item, .task_menu_ul .ant-menu-submenu-title{
            padding:0px;
            margin-right: 30px;
            line-height: 68px;
            font-size: 16px;
          }

          .teacherList .ant-table-pagination.ant-pagination {
            float: none;
            text-align: center;
          }
          .drop_down_menu .drop_down_btn{
            border-top:none;
          }
          .dividerStyle.ant-divider-horizontal{
            margin: 0px;
          }
          
          .drop_down_menu li {
            line-height:30px!important;
            flex: 0 0 30px;
          }

          .teacher_table .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
            padding: 16px 10px;
          }
        `}</style>
        <div className="mt20 edu-back-white padding20 teacherList">

          { course_groups && !!course_groups.length && <CourseGroupChooserModal
						{...this.state}
						{...this.props}
            props={{match: this.props.match, showNotification: this.props.showNotification}}
            record={this.state.clickRecord}
            fetchAll={(e)=>this.fetchAll(e,this.state.filterKey)}
            course_groups={course_groups}
            visible={this.state.groupChooserModalVisible}
            setVisible={this.setGroupChooserModalVisible}
          ></CourseGroupChooserModal> }
          {filterKey == '1' && <div className="clearfix stu_head" style={{paddingLeft: '15px'}}>
            { isAdminOrTeacher && hasGraduationModule && <Checkbox className="fl" onChange={this.onCheckAll} checked={checkAllValue} >已选 {checkBoxValues.length} 个</Checkbox> }
            { filterKey == '1' && <div className="studentList_operation_ul">
              { hasGraduationModule && isAdminOrTeacher && <li className="li_line drop_down">
                加入答辩组<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                <ul className="drop_down_menu" style={{"right":"0px","left":"unset", minWidth: '222px'}}>
                
                  {
                    groupList && groupList.graduation_groups_count>10?
                    (<p className="drop_down_search">
                      <Input placeholder="搜索" value={this.state.graduationGroupSearchValue} onChange={(e) => {this.setState({graduationGroupSearchValue: e.target.value})}} allowClear/>
                    </p>):
                    (groupList && groupList.graduation_groups_count==0 && <p style={{textAlign: 'left', margin: '0px 20px'}}>暂无数据</p>)
                  }
                  {
                    groupList && groupList.graduation_group_list && groupList.graduation_group_list.filter((item)=> {
                      return (!this.state.graduationGroupSearchValue || item.name.indexOf(this.state.graduationGroupSearchValue) != -1)
                    }).map((item,key)=>{
                      return(
                          <li key={key} value={item.id} onClick={() => this.joinGraduationGroup(item.id)}>{item.name}</li>
                      )
                    })
                  }
                  { groupList && groupList.graduation_groups_count > 0 && <Divider className="dividerStyle"></Divider> }
                  <p className="drop_down_btn">
                    <a href="javascript:void(0)" className="color-grey-6"
                        onClick={() => this.refs['addGraduationGroupModal'].setVisible(true)}
                    >添加答辩组...</a>
                  </p>
                </ul>
                </li> }
              {/* <li className="drop_down">
                {currentOrderName} <i className="iconfont icon-xiajiantou font-12 ml2"></i>
                <ul className="drop_down_normal">
                  <li onClick={() => this.onSortTypeChange(ORDER_BY_NAME)} >姓名排序</li>
                  <li onClick={() => this.onSortTypeChange(ORDER_BY_DATE)} style={{width: '125px'}}>加入时间排序</li>
                  {this.hasGraduationModule() && <li onClick={() => this.onSortTypeChange(ORDER_BY_GRADUATION_GROUP)} >答辩组排序</li>}
                </ul>
              </li> */}
            </div> }
          </div>}
          <Spin size="large" spinning={this.state.isSpin}>
          <div className="clearfix stu_table teacher_table">
            {combineArray.length ? 
            <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>          
            {/* pagination={{ current: page, total: total_count, pageSize:20, onChange: this.onPageChange }} */}
              <Table columns={columns} dataSource={combineArray} 
                onChange={this.onTableChange}
                pagination={total_count > 20 && filterKey == '1' ? {  //分页
                  total: page == 1 && this.state.application_list.length ? total_count + total_count / Math.floor(this.state.application_list.length + 20) : total_count , //数据总数量
                  pageSize: page == 1 && this.state.application_list.length ? this.state.application_list.length + 20 : 20,  //显示几条一页
                  current: page,
                  // onChange: this.onPageChange
                } : false}
              ></Table>
            </Checkbox.Group>
            :
            <NoneData></NoneData>}
          </div>
          </Spin>
        </div>
      </React.Fragment>
    )
  }
}
export default studentsList;