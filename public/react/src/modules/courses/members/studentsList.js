import React,{ Component } from "react";
import { Input,Checkbox,Table, Pagination, Modal,Menu ,Spin, Tooltip , Divider, Popconfirm } from "antd";
import ClipboardJS from 'clipboard'
import '../css/Courses.css'
import '../css/members.css'
import CourseLayoutcomponent from '../common/CourseLayoutComponent'

import Titlesearchsection from '../common/titleSearch/TitleSearchSection'
import ColorCountText from '../common/titleSearch/ColorCountText'
import { WordsBtn, trigger, on, off, getRandomcode, getRandomNumber , sortDirections } from 'educoder'
import Modals from "../../modals/Modals";
import axios from 'axios'
import _ from 'lodash'
import NoneData from "../coursesPublic/NoneData"
import DownloadMessageysl from "../../modals/DownloadMessageysl";
import CreateGroupByImportModal from './modal/CreateGroupByImportModal'
import ChangeRolePop from './ChangeRolePop'
import "./studentsList.css"

const Search =Input.Search;
const TYPE_STUDENTS = 1
const TYPE_COURSE_GOURP_PARENT = 2
const TYPE_COURSE_GOURP_CHILD = 3
const buildColumns = (that,isParent) => {
  const { course_groups , sortedInfo } = that.state
  let showSorter = isParent==true
  const courseId = that.props.match.params.coursesId
  const columns=[{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    align:'center',
    width:"8%",
    className:"color-grey-6",
    render: (id, student, index) => {
      return (that.state.page - 1) * 20 + index + 1
    }
  },
  // {
  //   title: '用户id',
  //   dataIndex: 'login',
  //   key: 'login',
  //   align:'center',
  //   width:"10%",
  //   className:"color-grey-6",
  //   render: (login, record) => {
  //     return <span className="color-dark overflowHidden1" style={{maxWidth: '160px'}}
  //       title={login && login.length > 10 ? login : ''}
  //     >{login}</span>
  //   }
  // },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align:'center',
    width:"10%",
    className:"color-grey-6",
    render: (name, record) => {
      return <a className="color-dark overflowHidden1" target="_blank"
          style={{maxWidth: '120px'}} href={`/users/${record.login}`}>{name}</a>
    }
  }, {
    title: '学号',
    dataIndex: 'student_id',
    key: 'student_id',
    align:'center',
    width:"10%",
    className:"color-grey-6",
    sorter: true,
    sortDirections: sortDirections,
    sortOrder: sortedInfo.columnKey === 'student_id' && sortedInfo.order,
    render: (student_id, record) => {
      return <span className="color-dark overflowHidden1 " title={student_id && student_id.length > 10 ? student_id : ''}
          style={{maxWidth: '160px'}} >{student_id}</span>
    }
  }
  , {
    title: '手机号',
    dataIndex: 'user_phone',
    key: 'user_phone',
    align:'center',
    width:"10%",
    className:"color-grey-6",
    // sorter: true,
    // sortDirections: sortDirections,
    // sortOrder: sortedInfo.columnKey === 'user_phone' && sortedInfo.order,
    render: (user_phone, record) => {
      return <span className="color-dark overflowHidden1 " title={user_phone && user_phone.length > 10 ? user_phone : ''}
          style={{maxWidth: '160px'}} >{user_phone}</span>
    }
  }
  , {
    title: '邮箱',
    dataIndex: 'user_mail',
    key: 'user_mail',
    align:'center',
    width:"10%",
    className:"color-grey-6",
    // sorter: true,
    // sortDirections: sortDirections,
    // sortOrder: sortedInfo.columnKey === 'user_mail' && sortedInfo.order,
    render: (user_mail, record) => {
      return <span className="color-dark overflowHidden1 " title={user_mail && user_mail.length > 10 ? user_mail : ''}
          style={{maxWidth: '160px'}} >{user_mail}</span>
    }
  }
  ];

  if (that.hasGroupModule()) {
    that.isStudentPage && columns.push({
      title: '分班',
      dataIndex: 'course_group_name',
      key: 'course_group_name',
      align:'center',
      width:"25%",
      className:"color-grey-6",
      sorter:showSorter,
      sortDirections: sortDirections,
      sortOrder: sortedInfo.columnKey === 'course_group_name' && sortedInfo.order,
    })
  }
  const isAdminOrStudent = that.props.isAdminOrStudent()
  if (!isAdminOrStudent) {
    columns.some((item,key)=> {
      if (item.title === "学号") {
        columns.splice(key, 1)
        return true
      }
    })
  }
  const isAdmin = that.props.isAdmin()
  if (isAdmin) {
    !that.isStudentPage && columns.unshift({
      title: '',
      dataIndex: 'check',
      key: 'check',
      render: (text, item) => {
        return <Checkbox value={item.course_member_id} key={item.course_member_id} ></Checkbox>
      },
      width:"5%"
    })

    columns.push({
      title: '操作',
      key: 'action',
      width: '22%',
      align:'center',
      render: (text, record) => {
        return (
          <React.Fragment>
            <WordsBtn  onClick={() => that.onDelete(record)} style={'grey'}>删除学生</WordsBtn>
            {record.member_roles && record.member_roles.length && <ChangeRolePop
              style={{ marginLeft: '12px' }}
              courseId={courseId}
              record={record}
              member_roles={record.member_roles}
              onChangeRoleSuccess={that.onChangeRoleSuccess}
              showNotification={that.props.showNotification}
              getUserId={that.props.isUserid}
              fetchUser={that.props.fetchUser}
            ></ChangeRolePop>}
          </React.Fragment>
        )
      },
    })

  }

  return columns;
}

// 1-按照学生学号 2-按照分班名称，
const ORDER_BY_NUM = 1;
const ORDER_BY_GROUP = 2;

class studentsList extends Component{
  constructor(props){
    super(props);
    this.state={
      page:1,
      order: ORDER_BY_NUM,
      searchValue: '',
      course_groups: [],
      students: [],
      checkBoxValues: [],

      stu_new_flag:false,
      StudentList_value:"",
      modalsType:"",
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:"",
      n_And_e:1,
      isSpin:false,
      DownloadType:false,
      DownloadMessageval:undefined,
      sortedInfo: {order:'ascend',columnKey: 'student_id'}
    }
  }
/// 确认是否下载
  confirmysl(url,urls){
    // this.props.showGlobalLoading('正在生成文件，请稍后...')
    axios.get(url + 'export=true').then((response) => {
      if(response === undefined){
        return
      }
      if(response.data.status&&response.data.status===-1){

      }else if(response.data.status&&response.data.status===-2){
        if(response.data.message === "100"){
          // 已超出文件导出的上限数量（100 ），建议：

          this.setState({
            DownloadType:true,
            DownloadMessageval:100
          })
        }else {
          //因附件资料超过500M
          this.setState({
            DownloadType:true,
            DownloadMessageval:500
          })
        }
      }else {

        // this.props.showNotification(`正在下载中`);
        // window.open("/api"+url, '_blank');
        this.props.slowDownload(getRandomcode(url))

        // getUrl() + "/api"+
        // const fileUrl = url;

        // this.props.slowDownload(fileUrl)
        // return;

        // downloadFile({
        //   url: fileUrl,
        //   successCallback: (url) => {
        //     console.log('successCallback')
        //   },
        //   failCallback: (responseHtml, url) => {
        //     console.log('failCallback')
        //   }
        // })
        // window.open(fileUrl, "_self");// , '_blank'
      }
    }).catch((error) => {
      console.log(error)
    });
  }
  hasGroupModule = () => {
    const { course_modules } = this.props;
    const result = course_modules && course_modules.filter( item => {
      return item.type == 'course_group'
    })
    return result && result.length > 0
  }

  Downloadcal=()=>{
    this.setState({
      DownloadType:false,
      DownloadMessageval:undefined
    })
  }

  inputStudent=(e)=>{
    this.setState({
      StudentList_value:e.target.value
    })
  }
  // 有关新建分班和分班重命名
  showStuNewBox=(index)=>{
    this.setState({
      stu_new_flag:true,
      n_And_e:index
    })
  }
  hideStuNewBox=()=>{
    this.setState({
      stu_new_flag:false
    })
  }
  // 有关删除分班
  delClasses=()=>{
    this.setState({
      modalsType:true,
      modalsTopval:"该分班的学生将被移动到“XX班”",
      modalsBottomval:"是否确认删除？",
      modalCancel:true
    })
  }
  cancelDelClasses=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:false
    })
  }
  // 确认删除
  sureDelClasses=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:false
    })
  }

  onChange=()=>{

  }
  onChangeRoleSuccess = () => {
    this.fetchAll()
  }
  componentDidMount() {
    this.setState({
      isSpin:true
    })
    this.fetchAll()
    const isAdmin = this.props.isAdmin()
    // if (isAdmin) {
      this.fetchCourseGroups();
    // }

    isAdmin && on('addStudentSuccess', this.addStudentSuccessListener)
    isAdmin && on('updateNavSuccess', this.updateNavSuccess)
  }
  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy()
    }
    const isAdmin = this.props.isAdmin()
    if (isAdmin) {
      off('addStudentSuccess', this.addStudentSuccessListener)
      off('updateNavSuccess', this.updateNavSuccess)
    }
  }
  createGroupImportSuccess = () => {
    this.props.updataleftNavfun()
  }
  updateNavSuccess = () => {
    this.fetchCourseGroups()
    this.fetchAll()
  }

  addStudentSuccessListener=(e, data)=>{
    const params = JSON.parse(data)
    this.props.updataleftNavfun()
    const course_group_id = this.props.match.params.course_group_id
    const coursesId = this.props.match.params.coursesId
    if (params.course_group_id == course_group_id) {
      this.fetchAll(1)
    } else {
      this.props.history.push(`/courses/${coursesId}/course_groups/${params.course_group_id || '0'}`)
    }
    // console.log('addStudentSuccessListener', data)
  }
  fetchCourseGroups = () => {
    const courseId = this.props.match.params.coursesId

    let url = `/courses/${courseId}/all_course_groups.json`

    axios.get(url, {
    })
    .then((response) => {
      if (response.data.course_groups && response.data.course_groups.length) {
        this.setState({
          course_groups: response.data.course_groups
        })
      } else {
        // showNotification('')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.course_group_id != this.props.match.params.course_group_id) {
      this.setState({checkBoxValues: [], checkAllValue: false })

      this.fetchAll(1)
    }
    // 加载了2次
    // else if (prevProps.coursesids != this.props.coursesids) {
    //   this.fetchAll(1)
    // }
  }
  fetchAll = (argPage) => {
    this.setState({
      isSpin:true
    })
    let id = this.props.match.params.coursesId
    let course_group_id = this.props.match.params.course_group_id

    const { coursesids } = this.props
    // if (!coursesids) {
    //   return;
    // }
    if (!course_group_id || course_group_id == coursesids) {
      course_group_id = ''
    }
    if (argPage) {
      this.setState({ page: argPage })
    }
    let page = argPage || this.state.page
    let { searchValue , sortedInfo }=this.state
    let order = 1;
    if (sortedInfo.columnKey == 'student_id') {
      order = 1;
    } else if (sortedInfo.columnKey == 'course_group_name') {
      order = 2;
    }
    let sort = 'desc';
    if (sortedInfo.order == 'ascend') {
      sort = 'asc'
    }

    let url=`/courses/${id}/students.json?order=${order}&sort=${sort}&page=${page}&limit=20&course_group_id=${course_group_id}`;
    if(!!searchValue){
      url+='&search='+searchValue;
    }
    axios.get(encodeURI(url)).then((result)=>{
      if (result.data.students) {
        this.setState({
          students: result.data.students,
          total_count: result.data.students_count,
          course_group_name: result.data.course_group_name,
          invite_code: result.data.invite_code,
           isSpin:false
        }, () => {
          if (course_group_id) {
            if (!this.clipboard) {
              const clipboard = new ClipboardJS('.copybtn');
              clipboard.on('success', (e) => {
                this.props.showNotification('复制成功')
              });
              this.clipboard = clipboard
            }
          }
        })
      }
    }).catch((error)=>{
      console.log(error);
      this.setState({
        isSpin:false
      })
    })
  }

  onInputSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })

    // if (this.timeoutHandler) {
    //   clearTimeout(this.timeoutHandler)
    // }
    // this.timeoutHandler = setTimeout(() => {
    //   this.fetchAll(1)
    // }, 1200)
  }
  onSortTypeChange = (order) => {
    this.setState({ order: order }, () => {
      this.fetchAll()
    })
  }
  onPageChange = (page) => {
    this.fetchAll(page)
    this.setState({ checkAllValue: false })
  }

  onPressEnter = (e) => {
    this.fetchAll(1)
  }

  onCheckBoxChange = (checkedValues) => {
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue: checkedValues.length == this.state.students.length
    })
  }
  // 多选
  moveToGroup = (group) => {
    const len = this.state.checkBoxValues.length
    if (len == 0) {
      this.props.showNotification('请从列表先选择要移动的学生')
      return;
    }

    let id = this.props.match.params.coursesId
    let { order, searchValue }=this.state
    let url=`/courses/${id}/transfer_to_course_group.json`;
    axios.post((url), {
      students: this.state.checkBoxValues.map(item => {return {course_member_id: item} }),
      course_group_id: group.id
    }).then((result)=>{
      if (result.data.status == 0) {
        this.props.showNotification('移动成功')
        this.setState({checkBoxValues: []})
        this.fetchAll()
        this.props.updataleftNavfun()

      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  onCheckAll = (e) => {
    this.setState({
      checkAllValue: e.target.checked
    })
    const values = this.state.students.map(item => {
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
  // 多选
  onDelete = (record) => {
    if (!record) {
      const len = this.state.checkBoxValues.length
      if (len == 0) {
        this.props.showNotification('请先从列表选择要删除的学生')
        return;
      }
    }

    this.props.confirm({
      // content: `确认要删除所选的${len}个学生吗？`,
      content: `是否确认删除?`,
      onOk: () => {
        let id = this.props.match.params.coursesId
        let url=`/courses/${id}/delete_from_course.json`;
        axios.post((url), {
          students: [{course_member_id: record.course_member_id}] // this.state.checkBoxValues.map(item => {return {course_member_id: item} }),
        }).then((result)=>{
          if (result.data.status == 0) {
            this.props.showNotification('删除成功')
            this.props.updataleftNavfun()
            this.fetchAll()
            this.setState({checkBoxValues: []})
            trigger('updatabanner')
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }
  addDir = () => {
    trigger('groupAdd', this.props.coursesids)
  }
  doAddToDir = async () => {
    const courseId = this.props.match.params.coursesId
    const url = `/courses/${courseId}/join_course_group.json`
    const course_group_id = this.props.match.params.course_group_id

    const response = await axios.post(url, {
      course_group_id
    })
    if (response && response.data.status == 0) {
      this.props.showNotification(`已加入分班：${this.state.course_group_name}`)
      this.props.updataleftNavfun()
      this.fetchAll()
    }
  }
  addToDir = (record) => {
      this.props.confirm({

          content: `是否确认加入分班: ${this.state.course_group_name}?`,

          okText: '确认',
          cancelText: '取消',

          onOk: () => {
              this.doAddToDir()
          },
          onCancel() {
              console.log('Cancel');
          },
      });
  }
  renameDir = () => {
    const course_group_id = this.props.match.params.course_group_id
    trigger('groupRename', { id: parseInt(course_group_id), name: this.state.course_group_name})
  }
  deleteDir = () => {
    this.props.confirm({
      content: <div>
          <div>该分班的学生将被移动到“未分班”</div>
          <div>是否确认删除?</div>
        </div>,
      onOk: () => {
        const course_group_id = this.props.match.params.course_group_id
        const courseId = this.props.match.params.coursesId

        const url = `/course_groups/${course_group_id}.json`
        axios.delete(url)
        .then((response) => {
          if (response.data.status == 0) {
            this.props.showNotification('删除成功')
            this.props.history.push(`/courses/${courseId}/course_groups`)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
  }
  jsCopy = () => {
      var e = document.getElementById("copy_invite_code");
      e.select();
      document.execCommand("Copy");
      this.props.showNotification('复制成功')
  }

  onTableChange = (pagination, filters, sorter) =>{
    this.setState({
      sortedInfo: sorter,
    }, () => {
      this.fetchAll();
    });
  }


  render(){
    const isAdmin = this.props.isAdmin()
    const isStudent = this.props.isStudent()
    const isSuperAdmin = this.props.isSuperAdmin()
    const isCourseEnd = this.props.isCourseEnd()
    let {
      page,

      order,
      StudentList_value,
      stu_new_flag,
      modalsType,
      modalsTopval,
      modalsBottomval,
      n_And_e  ,

      students,
      searchValue,
      total_count,
      course_groups,
      checkBoxValues,
      checkAllValue
    }=this.state;
    let currentOrderName = '学生学号排序'
    if (order == ORDER_BY_GROUP) {
      currentOrderName = '分班名称排序'
    }
    const { coursesids } = this.props
    const course_group_id = this.props.match.params.course_group_id
    const isParent = !course_group_id || course_group_id == coursesids
    const { course_group_name, invite_code } = this.state;

    const courseId = this.props.match.params.coursesId
    let exportUrl = `/courses/${courseId}/export_member_scores_excel.xlsx?`; //总成绩
    let exportUrltwo = `/courses/${courseId}/export_couser_info.xlsx?`; //课堂信息
    let exportUrlthree = `/courses/${courseId}/export_member_act_score.xlsx?`; //活跃度



    const params = {}
    if (course_group_id) {
        params.group_id = course_group_id
    }
    if (searchValue) {
      searchValue = searchValue.trim()
      if (searchValue) {
        params.search = searchValue
      }
    }
    let paramsString = ''
    for (let key in params) {
      paramsString += `&${key}=${params[key]}&`
    }
    exportUrl += paramsString;
    exportUrltwo+=paramsString;
    exportUrlthree += paramsString;


    // console.log(paramsString);
    // console.log(checkBoxValues);
    // console.log(searchValue);
    let pageType = TYPE_STUDENTS
    if (this.props.match.path.endsWith('students')) {

    } else if (course_group_id) {
      pageType = TYPE_COURSE_GOURP_CHILD
    } else {
      pageType = TYPE_COURSE_GOURP_PARENT
    }
    // 本页面有2个状态，学生列表、具体分班
    const isStudentPage = pageType == TYPE_STUDENTS
    this.isStudentPage = isStudentPage
    const isGroupChildPage = pageType == TYPE_COURSE_GOURP_CHILD
		let studentlist=buildColumns(this,isParent);
    if(this.props.isexcellent===true){
			studentlist.some((item,key)=> {
					if (item.title === "手机号") {
						studentlist.splice(key, 1)
						return true
					}
				}
			)
		}

		if(this.props.isexcellent===true){
			studentlist.some((item,key)=> {
					if (item.title === "邮箱") {
						studentlist.splice(key, 1)
						return true
					}
				}
			)
		}

    return(
      <React.Fragment >
        <DownloadMessageysl
          {...this.props}
          value={this.state.DownloadMessageval}
          modalCancel={this.Downloadcal}
          modalsType={this.state.DownloadType}
        />
        <Titlesearchsection
          title={isParent ? (pageType == TYPE_STUDENTS ? "全部学生" : "学生列表"):
            <React.Fragment>
              {
                course_group_name ? 
                <span>
                  <Tooltip title="返回至分班列表">
                    <i className="icon-zuojiantou iconfont font-14" onClick={() => { this.props.history.push(`/courses/${courseId}/course_groups`)}}
                      style={{color: '#212121', verticalAlign: 'initial', marginRight: '14px' }}
                    ></i>
                  </Tooltip>{course_group_name}
                </span>
                :
                <ul className="course_publicNav">
                  <li onClick={() => { this.props.history.push(`/courses/${courseId}/course_groups`)}}>分班列表</li>
                  <li className="active">未分班</li>
                </ul>
              }
              
              {isAdmin && invite_code && <React.Fragment>
                <span className="color-grey-9 font-16 ml10">邀请码：</span>
                <span className="color-orange font-16">
                  {invite_code}
                </span>
                <Tooltip title={<div>
                    <div>成员可以通过邀请码主动加入分班</div>
                    <div>点击立刻复制邀请码</div>
                  </div>}>
                  <span>
                  <i class="iconfont icon-fuzhi font-14 ml10 copybtn" style={{color: '#FF6800', cursor: 'pointer', verticalAlign: 'baseline'}} data-clipboard-text={invite_code} ></i>
                  </span>
                </Tooltip>
              </React.Fragment>
              }

            </React.Fragment>
          }
          searchValue={ searchValue }
          onInputSearchChange={this.onInputSearchChange}
          showSearchInput={total_count >= 10}
          searchPlaceholder={ '请输入姓名、学号进行搜索' }
          firstRowRight={
            <React.Fragment>
              {/* {
                // pageType !== TYPE_STUDENTS &&
                !isStudentPage && isSuperAdmin && <React.Fragment>
                  <CreateGroupByImportModal ref="createGroupByImportModal" {...this.props}
                    createGroupImportSuccess={this.createGroupImportSuccess}
                  ></CreateGroupByImportModal>
                  <WordsBtn style="blue" className="mr30" onClick={()=> this.refs['createGroupByImportModal'].setVisible(true)}>导入创建分班</WordsBtn>
                </React.Fragment> } */}

              {
                  !isStudentPage && isAdmin && !isParent && course_group_id != 0 && <WordsBtn style="blue" className="mr30" onClick={()=>this.deleteDir()}>删除分班</WordsBtn> }
              {
                  !isStudentPage && isAdmin && !isParent && course_group_id != 0 && <WordsBtn style="blue" className="mr30" onClick={()=>this.renameDir()}>分班重命名</WordsBtn> }
              {
                  !isStudentPage && !isCourseEnd && isAdmin  && <WordsBtn style="blue" className="mr30" onClick={()=>this.addDir()}>新建分班</WordsBtn> }

              {
                  !isStudentPage && isStudent && !isParent && course_group_id != 0 && <WordsBtn style="blue" className="" onClick={()=>this.addToDir()}>加入分班</WordsBtn> }
              <style>{`
                .drop_down_menu li a {
                    padding: 0px;
                    font-size: 14px;
                }
                .drop_down_menu {
                    /*width: 93px;*/
                }
                .drop_down_menu li {
                    width:100%;
                    box-sizing:boder-box;
                    float:unset;
                    line-height:30px!important;
                    flex: 0 0 30px;
                }
                .drop_down_menu, .drop_down_normal {
                    padding-top: 10px;
                    padding-bottom: 8px;
                }
                .drop_down_menu .drop_down_btn{
                  border-top:none;
                }
                .dividerStyle.ant-divider-horizontal{
                  margin: 0px;
                }
                `}</style>
              { isAdmin &&
              <li className="li_line drop_down fr color-blue font-16">
                导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                <ul className="drop_down_menu" style={{"right": "-20px", "left": "unset", "height": "auto"}}>

                  <li><a
                  	onClick={(i) => this.confirmysl(exportUrltwo)}>课堂信息</a>
                  </li>
                  <li><a
                    onClick={(i) => this.confirmysl(exportUrlthree)}>活跃度</a>
                  </li>
                  <li><a
                    onClick={(i) => this.confirmysl(exportUrl)}>总成绩</a>
                  </li>

                </ul>
              </li>
              }
              {/*<WordsBtn style="blue" className=""  onClick={(url)=>this.confirmysl(exportUrl)} >导出成绩</WordsBtn>*/}
              {/*  */}
            </React.Fragment>
          }
          secondRowLeft={
            total_count ? <ColorCountText count={total_count} name="个学生"></ColorCountText> : ''
          }
          onPressEnter={this.onPressEnter}
        ></Titlesearchsection>
        {
          total_count > 0 || this.state.isSpin == true ?
          <div className="mt20 edu-back-white padding20">
            <div className="clearfix stu_head" style={{paddingLeft: '5px'}}>
              {isAdmin && !isStudentPage && <Checkbox className="fl" onChange={this.onCheckAll} checked={checkAllValue} >已选 {checkBoxValues.length} 个</Checkbox>}
              <div className="studentList_operation_ul">
                {/* {isAdmin && <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onDelete}>删除</a></li>} */}
                {isAdmin && !isStudentPage && <li className="drop_down">
                  移动到...<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                  <ul className="drop_down_menu" style={{"right":"0px","left":"unset", width: '200px', maxHeight: '324px', overflowY: 'auto'}}>
                    {
                      course_groups && course_groups.length > 9 ?
                      (<p className="drop_down_search">
                        <Input placeholder="搜索" value={this.state.groupSearchValue} onChange={(e) => {this.setState({groupSearchValue: e.target.value})}}/>
                      </p>):
                      ''
                    }
                    {
                      course_group_id != 0 && course_groups && course_groups.length > 0 &&
                      <li key={0} onClick={() => this.moveToGroup({id: 0})}>未分班</li>
                    }
                    { course_groups.filter((item)=> {
                      return item.id != course_group_id && (!this.state.groupSearchValue || item.name.indexOf(this.state.groupSearchValue) != -1)
                    }).map( item => {
                      return (
                        <li key={item.id} onClick={() => this.moveToGroup(item)} title={item.name}>{item.name}</li>
                      )
                    }) }
                    { course_groups && course_groups.length > 0 && <Divider className="dividerStyle"></Divider> }
                    { isAdmin && !isCourseEnd &&

                      <p className="drop_down_btn">
                        <a href="javascript:void(0)" className="color-grey-6"
                            onClick={()=>this.addDir()}
                        >新建分班...</a>
                      </p>

                    }
                  </ul>
                </li>}

                {/* <li className="drop_down">
                  {currentOrderName}
                  { course_groups && !!course_groups.length &&
                  <React.Fragment>
                  <i className="iconfont icon-xiajiantou font-12 ml2"></i>
                  <ul className="drop_down_normal" style={{width: '124px'}}>
                    <li onClick={() => this.onSortTypeChange(ORDER_BY_NUM)} >学生学号排序</li>
                    <li onClick={() => this.onSortTypeChange(ORDER_BY_GROUP)} >分班名称排序</li>
                  </ul>
                  </React.Fragment>
                   }
                </li> */}
              </div>
            </div>
            <Spin size="large" spinning={this.state.isSpin}>
            <div className="clearfix stu_table">
              {students && !!students.length && <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
                <Table columns={studentlist} dataSource={students} onChange={this.onTableChange} pagination={false}></Table>
              </Checkbox.Group> }
            </div>
            </Spin>
          </div>
          :
          <NoneData></NoneData>
        }
        {/* showQuickJumper */}
        { total_count > 20 && <div className="clearfix mt30 mb50 edu-txt-center">
          <Pagination showQuickJumper defaultCurrent={page} current={page} pageSize={20} total={total_count} onChange={this.onPageChange} />
        </div> }
      </React.Fragment>
    )
  }
}
export default studentsList;