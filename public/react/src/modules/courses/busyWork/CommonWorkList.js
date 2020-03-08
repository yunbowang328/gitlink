import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip,Spin, Pagination} from "antd";
import {WordsBtn, ConditionToolTip, queryString, publicSearchs, on, off, NoneData, sortDirections} from 'educoder';
import axios from 'axios';
import CheckAllGroup from '../common/button/CheckAllGroup'
import moment from 'moment';
import CheckCodeModal from '../coursesPublic/modal/CheckCodeModal'
import '../css/Courses.css';
import PublishRightnow from './PublishRightnow'
import ModulationModal from "../coursesPublic/ModulationModal";
import AccessoryModal from "../coursesPublic/AccessoryModal";
import LeaderIcon from './common/LeaderIcon'
const $ = window.$;
const Search = Input.Search;

function renderScore(score, content) {
  let color = '#747A7F'
  if (score >= 90) {
    color = '#DD1717'
  } else if (score >= 60) {
    color = '#FF6800'
  }
  return <a href="javascript:;"  style={{ color, cursor: 'default', minWidth: '30px', display: 'inline-block', textAlign: 'center' }}>
      {score == null || score == undefined || score == '--' ? '--': (content || score)}
    </a>
}
function getScoreTip(score, dom) {
  return score == '--' ? '未评分' : score == '**' ? '未公开' : dom
}
function buildColumns(that, student_works, studentData) {
  let gotWorkGroup = false;
  let gotProjectInfo = false;
  if (student_works && student_works.length) {
    student_works.forEach(item => {
      if (item.work_group) {
        gotWorkGroup = true
      }
      if (item.project_info && item.project_info.name) {
        gotProjectInfo = true;
      }
    })
  } else if (studentData && studentData[0]) {
    if (studentData[0].work_group) {
        gotWorkGroup = true
      }
    if (studentData[0].project_info) {
      gotProjectInfo = true;
    }
  }
  let courseId= that.props.match.params.coursesId;
  let workId= that.props.match.params.workId;
  const { course_group_count, homework_status } = that.state;
  const isAdmin = that.props.isAdmin()
  const isAdminOrStudent = that.props.isAdminOrStudent()
  const isStudent = that.props.isStudent()
  const isNiPing = homework_status && homework_status.indexOf('匿评中') != -1
  const isAppeal = homework_status && homework_status.indexOf('申诉中') != -1
  // https://www.trustie.net/issues/21450   分组作业作品列表 学时视角，匿评阶段的列表显示信息不正确
  const niPingAndIsStudent = isStudent && (isNiPing || isAppeal)

  let columns = [{
    width: 60,
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render: (text, record, index) => {
      return (
       <span style={{ minWidth: '50px', display: 'inline-block', textAlign: 'center' }} >
        {record.isMine == true && (student_works && student_works.length) ? '我' : (that.state.page - 1) * PAGE_SIZE + index + 1}
      </span>
    )},
  }, {
    title: '姓名',
    width: 90,
    dataIndex: 'user_name',
    key: 'user_name',
    // width: '110px',
    render: (text, record) => (
      <div style={{

					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
          width: '74px',
          margin: '0 auto'
					 }} title={text && text.length > 5 ? text : ''}>
				{/* <Tooltip placement="bottom" title={text}>
				</Tooltip> */}
				{record.is_leader ?
          <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
            <div >{text}</div>
            <LeaderIcon></LeaderIcon>
          </div>
					: <React.Fragment>{text}</React.Fragment>}
      </div>
    ),
  }]
  if (!niPingAndIsStudent && isAdminOrStudent) {
    columns.push({
      width: isStudent ? undefined : 88,
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
			sorter: true,
			sortDirections: sortDirections,
      render: (text, record) => (
        <span>
          <a href="javascript:;"
						 title={text && text.length > 12 ? text : ''}
						 style={{
							 color: '#9A9A9A',
							 'text-overflow': 'ellipsis',
							 'white-space': 'nowrap',
							 'width': '98px',
							 display: 'block',
							 overflow: 'hidden'
                , margin: '0 auto', cursor: 'default'}}
          >{record.student_id}</a>
      </span>
      ),
    })
  }

  // TODO 只有有分班时才显示分班列
  if (course_group_count != 0 && !niPingAndIsStudent) {
    columns.push( {
      title: '分班',
      key: 'group_name',
      dataIndex: 'group_name',
      render: (text, record) => (
				<span>
          <a href="javascript:;"  style={{color:'#9A9A9A', cursor: 'default'}}>{record.group_name}</a>
        </span>
      ),
    } )
  }
  if (gotWorkGroup && !niPingAndIsStudent) {
    columns.push({
      width: 72,
      title: '分组',
      dataIndex: 'work_group',
      key: 'work_group',

      render: (text, record) => (
        <span>
          <a href="javascript:void(0);"  style={{color:'#4CACFF'}}>{record.work_group}</a>
        </span>
      ),
    })
  }
  if (gotProjectInfo) {
    columns.push({
      width: 72,
      title: '关联项目',
      dataIndex: 'project_info',
      key: 'project_info',

      render: (project_info, record) => (
        <span>
          {project_info && project_info.name &&
					<a href={project_info.id == -1 ? 'javascript:void(0)' : `/projects/${project_info.id}`}
						 target={project_info.id == -1 ? '' : "_blank"}
						 className="overflowHidden1" style={{
						color: '#4CACFF',
						width: that.state.anonymous_comment ? '80px' : '130px',
						margin: '0 auto',
						display: 'block'
					}} title={project_info.name}
          >{project_info.name}</a>}
        </span>
      ),
    })
  }
  columns = columns.concat([{
    width: 88,
    title: '作品状态',
    dataIndex: 'work_status',
    key: 'work_status',

    render: (status, record) => {
      let color;
      let text
      if (status === 2) {
        color = '#DD1717'
        text = '延时提交'
      } else if (status === 0 ) {
        color = '#747A7F'
        text = '未提交'
      } else {
        color = '#29BD8B'
        text = '按时提交'
      }
      return (
      <span>
        <a href="javascript:;"  style={{color: color, cursor: 'default'}}>
          {status === 0 ? "未提交" : status === 1 ? "按时提交" : status === 2 ? "延时提交" : ""}
        </a>
      </span>
    )},
  }, {
    width: 106, // isStudent ? undefined : 106 ,  // 匿评中 只有这几列： 序号 姓名 提交状态 更新时间 匿评评分 操作
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
		sorter: true,
		defaultSortOrder: 'descend',
		sortDirections: sortDirections,
    render: (update_time, record) => (
      <span>
        <a href="javascript:;"  style={{color:'#989898', cursor: 'default'}}>{update_time ? moment(update_time).format('YYYY-MM-DD HH:mm') : '--'}</a>
    </span>
    ),
	}])
  if (!niPingAndIsStudent) {
    columns.push({
      width: 70,
      title: '教师评分',
      key: 'teacher_score',
      dataIndex: 'teacher_score',

      render: (teacher_score, record) => (

        <Tooltip title={ getScoreTip(teacher_score, teacher_score) }>
          <span>
            { renderScore(teacher_score) }
          </span>
        </Tooltip>
      ),
    })

    columns.push({
      width: 70,
      title: '助教评分',
      key: 'teaching_asistant_score',
      dataIndex: 'teaching_asistant_score',
      /**
      * 2名助教进行了评分
      平均分：85.0分
			 *
      */
      render: (teaching_asistant_score, record) => (
        <span>
          { <Tooltip placement="bottom" title={
            getScoreTip(teaching_asistant_score,
            <div>
              <div>{record.ta_comment_count}名助教进行了评分</div>
              <div>{that.state.ta_mode == 1 ? '平均分': '复审分'}：{teaching_asistant_score}分</div>
            </div>) }
            >

            {renderScore(teaching_asistant_score) }
            </Tooltip> }
      </span>
      ),
    })
  }


	if (that.state.anonymous_comment) {
		/**
		 开启了匿评的才显示此列，悬浮TIP示例：
    3名学生进行了匿评
    有效平均分：80.0分
  */
    columns.push({
      width: 84,
      // title: <div style={{color: 'rgba(0,0,0,.85)'}}><div  style={{color: 'rgba(0,0,0,.85)'}}>匿评</div>评分</div>,
      title: <div style={{color: 'rgba(0,0,0,.85)'}}>匿评评分</div>,
      key: 'student_score',
      dataIndex: 'student_score',

      render: (student_score, record) => (
        <span>
          <Tooltip title={
            getScoreTip(student_score,
            that.state.is_evaluation ? `你的评阅分数：${record.student_score}分` : <div>
              {record.student_comment_count && <div>{`${record.student_comment_count}名学生进行了匿评`}</div>}
              <div>有效平均分：{record.student_score}分</div>
            </div>
            )
          }>
            { renderScore(student_score, `${student_score}${record.student_comment_count ? ` (${record.student_comment_count})` : ''}`) }
          </Tooltip>
      </span>
      ),
    })
	}

  if (that.state.anonymous_appeal) {
    columns.push({
      width: 70,
      title: '匿评申诉',
      key: 'appeal_all_count',
      dataIndex: 'appeal_all_count',

      render: (appeal_all_count, record) => (
        <span>
          {!!appeal_all_count &&
            <Tooltip placement="bottom" title={`共有${appeal_all_count}条匿评申诉，${record.appeal_deal_count}条待处理`}>
              <span style={{ minWidth: '30px', display: 'inline-block', textAlign: 'center' }}>
                {`${record.appeal_deal_count}/${appeal_all_count}`}
              </span>
            </Tooltip> }
          { !appeal_all_count && <span style={{ color: '#747A7F' }}>-/-</span>}
      </span>
      ),
    })
  }
  if (!niPingAndIsStudent) {
    columns.push({
			width: '113px',
      title: '当前成绩',
      key: 'work_score',
      dataIndex: 'work_score',
			sorter: true,
			sortDirections: sortDirections,
      render: (work_score, record) => {
        return (
        <span>
          <Tooltip title={
            getScoreTip(work_score,
            <div>
              <div>{`${record.user_name}（${record.user_login}）`}</div>
							{record.ultimate_score ?
								<div>最终调整成绩：{record.work_score}分</div> :
              <div>
                { record.final_score && <div>作业评分：{record.final_score}分</div> }
                { record.late_penalty >= 0 && <div>迟交扣分：{record.late_penalty}分</div>}
                { record.absence_penalty >= 0 && <div>缺评扣分：{record.absence_penalty}分</div>}
                { record.appeal_penalty >= 0 && <div>违规匿评扣分：{record.appeal_penalty}分</div>}
                <div>最终成绩：{record.work_score}分</div>
              </div> }
						</div>)
          }>
            { renderScore(work_score) }
          </Tooltip>
        </span>
        )
      },
    })
  }
  if (isAdminOrStudent || that.props.work_public == true) {
    columns.push({
      width: 72,
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      render: (operation, record) => (
        record.work_status === 0 && !isAdmin ? <span style={{ color: '#747A7F' }}>--</span>:
        <div>
          {/* 0 未提交 */}
          {/*<React.Fragment>*/}
          {/*</React.Fragment>*/}
          { isAdmin && <Tooltip placement="bottom" title={<pre>调整学生当前成绩<br/>其它历史评分将全部失效</pre>}>
						<a style={{color: "#4CACFF"}}
							 onClick={() => that.showModulationModal(record)}
              >调分</a>
            </Tooltip> }
            {/* toWorkDetailPage */}
            {/* /courses/"+courseId+"/common_homeworks/"+workId+ '/' + record.id +"/appraise */}
					<a style={{color: '#4CACFF', marginLeft: '4px'}} id={"asdasdasdasd"}
						 onMouseDown={(e) => that.props.toWorkDetailPage2(e, courseId, workId, record.id)}
						 onClick={() => that.props.toWorkDetailPage(courseId, workId, record.id)}>{isAdmin ? '评阅' : '查看'}</a>

        </div>

      ),
    });
  }
  return columns;
}

// update_time，最终成绩：work_score，学号：student_id
// desc：倒序 ， asc：顺序
const orderMap = {
  update_time: 'desc',
  work_score: 'asc',
  student_id: 'asc',
}
const PAGE_SIZE = 20
// 类似页面 http://localhost:3007/courses/1309/graduation/graduation_tasks/48/76/setting
class CommonWorkList extends Component{

  constructor(props){
    super(props)

    this.publishModal = React.createRef();
    this.endModal = React.createRef();

    this.state={
      course_name:"",
      homework_name:"",
      search: '',
      task_status: [],
      teacher_comment: [],
      course_group_info: [],
			arg_work_status: [],
      arg_teacher_comment: [],
      arg_course_group: [],
      order: 'update_time',
      page: 1,
			isSpin:true,
      left_time: {},
      category: {},
			b_order: 'desc',
      searchtypes:false,
      loadingstate:false
    }
  }
  onTablePagination = (page) => {
    this.setState({ page: page }, () => {
      this.fetchList()
    })

  }
  onSearchValue = (val) => {
    if (val === ""||val===undefined) {
      this.setState({
        search: undefined,
        searchtypes:false
      })
    }else{
      this.setState({
        searchtypes:true,
        loadingstate:true
      })
    }

    this.fetchList()
  }
  onSearchValueInput = (e) => {
    if (e.target.value === ""||e.target.value===undefined) {
      this.setState({
        search: undefined,
      })
    } else {
      this.setState({search: e.target.value})
    }
  }

  componentDidMount() {
		console.log("CommonWorkList 分班list 开始加载");
    this.fetchList()
    on('commonwork_fetch_all', this.fetchAllListener)
    $("html").animate({ scrollTop: $('html').scrollTop() - 100 });
    try {
      this.props.triggerRef(this);
    }catch (e) {

    }

  }
  componentWillUnmount() {
		off('commonwork_fetch_all', this.fetchAllListener)
  }
  fetchAllListener = () => {
    this.fetchList()
  }

	_getRequestParams() {
		const {search, arg_work_status, arg_teacher_comment, arg_course_group, order, page, arg_member_work, b_order} = this.state
    return {
      page,
      search,
      work_status: arg_work_status, // [0]
      course_group: arg_course_group,
      teacher_comment: arg_teacher_comment.length == 0 ? '' : arg_teacher_comment[0],
      order,
      limit: PAGE_SIZE,
			b_order: b_order,
      group_id:arg_course_group,
      member_work: arg_member_work
    }
  }
  fetchData = () => {
    this.fetchList()
  }
  fetchList = () => {
    let workId=this.props.match.params.workId;
    let courseId=this.props.match.params.coursesId;

    const url = `/homework_commons/${workId}/works_list.json`
    let params = this._getRequestParams()
    axios.post(url, params).then((response)=> {
      if (response.data) {
        this.setState({
					...response.data,
					isSpin:false,
          loadingstate:false
        })

        this.props.initWorkDetailCommonState && this.props.initWorkDetailCommonState( Object.assign({...response.data}, {
          moduleName: '作品列表'
        }))
      }
     }).catch((error)=>{
       console.log(error)
			this.setState({
				isSpin:false,
        loadingstate:false
			})
     })


  }
  teacherCommentOptionChange = (values, isAllChecked) => {
    this.setState({arg_teacher_comment: isAllChecked ? [] : values, page: 1}, () => {
      this.fetchList()
    })
  }
  statusOptionChange = (values, isAllChecked) => {
    this.setState({arg_work_status: isAllChecked ? [] : values, page: 1}, () => {
      this.fetchList()
    })
  }
  courseGroupOptionChange = (values, isAllChecked) => {
    this.setState({arg_course_group: isAllChecked ? [] : values, page: 1}, () => {
      this.fetchList()
    })
  }
  memberWorkChange = (values, isAllChecked) => {
    this.setState({arg_member_work: isAllChecked ? '' : values[0], page: 1}, () => {
      this.fetchList()
    })
  }
	funorder = (order, b_order) => {
		this.setState({
			order: order
			,
			b_order: b_order
		}, () => {
      this.fetchList()
    })
  }
  doWhenSuccess = () => {
    this.fetchList()
  }

  // --------------调分
  showModulationModal = (item) => {
    this.modulationItem = item;
    this.setState({ modulationModalVisible: true })
  }
  cancelModulationModel = () => {
    this.setState({ modulationModalVisible: false })
  }
  saveModulationModal = (value, num) => {
    const item = this.modulationItem
    const url = `/student_works/${item.id}/adjust_score.json`
    axios.post(url, {
      score: num,
      comment: value
    })
		  .then((response) => {
			    if (response.data.status == '0') {
            this.setState({ modulationModalVisible: false })
            this.props.showNotification('调分成功')
            this.fetchList()
			    }
		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
  }
  // --------------调分 END

  // 补交附件
  Cancelvisible=()=>{
    this.setState({
      visible:false
    })
  }

  addAccessory=()=>{
    this.setState({
      visible:true
    })
  }
  setupdate = () => {

  }

	//普通作业tbale 列表塞选数据
	table1handleChange = (pagination, filters, sorter) => {
		//"ascend" 升序
		//"descend" 降序
		if (JSON.stringify(sorter) === "{}") {
			//没有选择
		} else {
			// 时间
			try {
				if (sorter.columnKey === "update_time") {
					let myyslorder = "";
					if (sorter.order === "ascend") {
						myyslorder = "asc";
					} else if (sorter.order === "descend") {
						myyslorder = "desc";
					}
					this.funorder("update_time", myyslorder);
				}

			} catch (e) {

			}

			//成绩
			try {
				if (sorter.columnKey === "work_score") {
					let myyslorder = "";
					if (sorter.order === "ascend") {
						myyslorder = "asc";
					} else if (sorter.order === "descend") {
						myyslorder = "desc";
					}
					this.funorder("work_score", myyslorder)
				}

			} catch (e) {

			}

			//学号
			try {
				if (sorter.columnKey === "student_id") {
					let myyslorder = "";
					if (sorter.order === "ascend") {
						myyslorder = "asc";
					} else if (sorter.order === "descend") {
						myyslorder = "desc";
					}
					this.funorder("student_id", myyslorder)
				}

			} catch (e) {

			}

		}
	}

  render(){
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD HH:mm';

    let {course_name, homework_name, search, page, loadingstate, student_works, work_count,
      all_member_count, time_status,
      //  老师显示的三个过滤条件
      task_status, teacher_comment, course_group_info, order,
      commit_count, uncommit_count, left_time,
      modulationModalVisible, work_statuses,

      id, user_name, user_login, student_id, group_name, work_status, update_time, teacher_score, teaching_asistant_score, student_score,
			ultimate_score, work_score, student_comment_count, appeal_all_count, appeal_deal_count,
      late_penalty, absence_penalty, appeal_penalty

			, end_immediately, publish_immediately
      , homework_id, visible, work_group, project_info, is_leader
    } =this.state;


    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let workId=this.props.match.params.workId;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const options_status = task_status.map((item) => {
      return  { label: `${item.name}(${item.count})`, value: item.id }
    })

    const options_course_group = course_group_info.map((item) => {
      return { label: `${item.group_group_name}(${item.count})`, value: item.course_group_id }
    })
    const options_teacher_comment = teacher_comment.map((item) => {
      return { label: `${item.name}(${item.count})`, value: item.id }
    })

    // 1:组长， 0:组员，“” 不限
    const member_works = [{
      name: '组长', id: 1
    }, {
      name: '组员', id: 0
    }]
    const options_member_work = member_works.map((item) => {
      return { label: `${item.name}`, value: item.id }
    })


    const isAdmin = this.props.isAdmin()
    const isStudent = this.props.isStudent()
    const isAdminOrStudent = this.props.isAdminOrStudent()
    const isGroup = this.props.isGroup();
    // work_group
    let StudentData;

    if(id===undefined){
      StudentData=undefined
    }else{
      StudentData=isStudent ? [{ id, user_name, user_login, student_id, group_name, work_status, update_time, teacher_score, teaching_asistant_score, student_score,
      ultimate_score, work_score, student_comment_count, appeal_all_count, appeal_deal_count,
      late_penalty, absence_penalty, appeal_penalty, project_info, is_leader,
      work_group, isMine: true }] : []
    }
    const columns = buildColumns(this, student_works, StudentData)

    let params = this._getRequestParams()
    let exportUrl = `/api/homework_commons/${workId}/works_list.zip?${queryString.stringify(params)}`;
    const exportResultUrl = `/api/homework_commons/${workId}/works_list.xlsx`;
    let appraisetype=false;
    let appraiselist=this.state.homework_status;

		appraiselist&&appraiselist.map((item,key)=>{
			 if(item==="评阅中"){
			 	appraisetype=true
			 	return
			 }
		})

    // time_status	int	时间对应的状态: 0：未发布，1:提交中，2:补交中，3:匿评中，4:申诉中，5:评阅中，6:已结束

    let timeMsg = '提交剩余时间'
    if (time_status === 1) {

    } else if (time_status === 2) {
      timeMsg = '补交剩余时间'
    } else if (time_status === 3) {
      timeMsg = '匿评剩余时间'
    } else if (time_status === 4) {
      timeMsg = '申诉剩余时间'
    }

    const hasData = this.state.homework_status && this.state.homework_status.indexOf("未发布") == -1 // student_works && !!student_works.length && page == 1 &&

		// console.log(StudentData)
		// console.log(student_works)
    return(
      <React.Fragment>
        <CheckCodeModal
          ref="checkCodeModal"
          {...this.props}
        ></CheckCodeModal>

				<AccessoryModal
            {...this.props}
            modalname={"补交附件"}
            visible={visible}
            Cancelname={"取消"}
            Savesname={"确认"}
            Cancel={this.Cancelvisible}
            categoryid={category_id}
            setupdate={this.setupdate}
            reviseAttachmentUrl={`/student_works/${id}/revise_attachment.json`}
          />

        <PublishRightnow ref={this.publishModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}
            isPublish={true} doWhenSuccess={this.doWhenSuccess}></PublishRightnow>
        <PublishRightnow ref={this.endModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}
            isPublish={false} doWhenSuccess={this.doWhenSuccess}></PublishRightnow>

				{
					modulationModalVisible === true ?
						<ModulationModal
							visible={modulationModalVisible}
							Cancel={this.cancelModulationModel}
							Saves={(value, num) => this.saveModulationModal(value, num)}
						/>
						: ""
				}



				{/* 内容区 */}
          <style>{`
            .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
              text-align: center;
            }

            .worklist1 .search-new {
              margin-bottom: -30px !important;
              top: 22px;
              position: absolute;
              right: 18px;
            }

            .workListContent .ant-table-thead > tr > th, .workListContent .ant-table-tbody > tr > td {
              padding: 10px 1px;
            }
          `}</style>
          <div style={{ background: '#fff'}} className="workListContent">
             { isAdmin && hasData && <ul className="clearfix" style={{padding: "20px 40px 10px", position: 'relative', paddingLeft: '24px'}}>

              <CheckAllGroup options={options_teacher_comment} label={'你的评阅：'} onChange={this.teacherCommentOptionChange}></CheckAllGroup>
              <CheckAllGroup options={options_status} label={'作品状态：'} onChange={this.statusOptionChange}></CheckAllGroup>
              {isGroup && <CheckAllGroup options={options_member_work} label={'组内角色：'} onChange={this.memberWorkChange}></CheckAllGroup>}
              {options_course_group.length > 1 && <CheckAllGroup options={options_course_group} label={'分班情况：'} onChange={this.courseGroupOptionChange} checkboxGroupStyle={{width: '980px'}}></CheckAllGroup>}


              {/*   value={search} */}
              <div className="fr search-new mr8" style={{marginBottom:'1px'}}>
                {/*<Search*/}
                {/*  placeholder="请输入姓名或学号搜索1"*/}
                {/*  id="subject_search_input"*/}
                {/*  onInput={this.onSearchValueInput}*/}
                {/*  onSearch={this.onSearchValue}*/}
                {/*  autoComplete="off"*/}
                {/*></Search>*/}
                {publicSearchs("请输入姓名或学号搜索",this.onSearchValue,this.onSearchValueInput,this.onSearchValueInput)}
              </div>
            </ul> }

            { <div id="graduation_work_list" style={{padding: isStudent ? '10px 24px 10px 24px' : '0px 24px 10px 24px'}}>
              <div className="clearfix">
                {hasData && <span className="fl color-grey-6 font-12">
                  { isAdmin ?
                    (!!all_member_count) && <React.Fragment>
                      <span className="color-orange-tip">{work_count || '0'}</span>个检索结果（{all_member_count} 学生）
                    </React.Fragment> :
                    (!!commit_count || !!uncommit_count) &&
                    <React.Fragment>
                      <span className="color-orange-tip">{commit_count}</span>已交　{uncommit_count}未交　
											{timeMsg || ''}
                      <span className="color-orange-tip">{left_time.time}</span>
                    </React.Fragment>
                  }
                </span>}


							</div>
            </div> }


						<style>{`
              .workListContent .ant-table-thead > tr > th {
                border-bottom: none;
              }
              .studentTable .ant-table-tbody { background: '#F1F9FF' }
              .studentTable table, .stageTable table{
                font-size: 13px !important;
              }
            `}</style>
            { isStudent &&StudentData===undefined?"":StudentData===undefined?"":
              <Table
								className="studentTable"
								dataSource={StudentData}
								onChange={this.table1handleChange}
								columns={columns}
								pagination={false}
								showHeader={ !student_works || student_works.length == 0}
              />
            }


            <div className={"justify break_full_word new_li edu-back-white course_table_wrap"} style={{minHeight:"480px", marginBottom: '30px'}}>
              <style>{`
              // .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
              //             top: 72%;}
              //   }
              .singleLine tr.ant-table-row {
                background: #f1f9ff;
              }
              .course_table_wrap .ant-pagination.ant-table-pagination {
                float: none;
                text-align: center;
              }
              `}</style>
              {isStudent && student_works && student_works.length == 0 || !isStudent && student_works===undefined?"":JSON.stringify(student_works) === "[]" ||student_works===undefined?
								<Spin size="large" spinning={this.state.isSpin}>
									<div id="forum_list" className="forum_table">
										<div className="mh650 edu-back-white">

											<NoneData
                        {...this.props}
                        {...this.state}
                      ></NoneData>
										</div>
									</div>
								</Spin>
								:
              <React.Fragment>
                <Spin tip="正在加载..." spinning={loadingstate}>
                  <Table
                  className="stageTable"
                  dataSource={student_works}
                  columns={columns}
                  showQuickJumper
                  pagination={false}
                  onChange={this.table1handleChange}
                  // loading={loadingstate}
                  />
                </Spin>
              </React.Fragment>

              }
            </div>
          </div>

				{work_count > PAGE_SIZE && <Pagination
              style={{ textAlign: 'center', marginBottom: '20px' }}
              showQuickJumper pageSize={PAGE_SIZE} onChange={this.onTablePagination} current={page} total={work_count} />}



      </React.Fragment>

    )
  }
}

const CommonWorkListForm = Form.create({ name: 'commonworkListForm' })(CommonWorkList);
export default CommonWorkListForm;
