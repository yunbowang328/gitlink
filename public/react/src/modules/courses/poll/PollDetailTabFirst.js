import React,{ Component } from "react";
import {Checkbox,Input,Table, Pagination} from "antd";

import {WordsBtn, sortDirections} from 'educoder'
import moment from 'moment';
import CheckAllGroup from '../common/button/CheckAllGroup'
import NoneData from "../coursesPublic/NoneData"

import '../css/members.css'
import '../css/busyWork.css'
import './pollStyle.css'

import axios from 'axios'

const Search=Input.Search;
function formatDuring(mss){
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  try {
    days = Math.abs(days);
  } catch (e) {

  }
  try {
    hours = Math.abs(hours);
  } catch (e) {

  }
  try {
    minutes = Math.abs(minutes);
  } catch (e) {

  }
  return days + "天" + hours + "小时" + minutes + "分";
}
class PollDetailTabFirst extends Component{
  constructor(props){
    super(props);
    this.state={
      order:"end_at",
      search:undefined,
      commit_status:[],
      poll_group_id:[],
      page:1,
      limit:20,
      dataInfo:undefined,
      data:undefined,
      poll_types:undefined,
      course_groups:undefined,
      options_Class:[],
			poll_end_at: "",
			order_type: "desc"
    }
  }
  // 搜索框搜索
  inputStudent=(e)=>{
    this.setState({
      search:e.target.value
    })
  }
  searchInfo=()=>{
		let {order, search, commit_status, poll_group_id, page, order_type} = this.state
		this.getTableList(order, search, commit_status, poll_group_id, page, order_type);
  }

  // 获取接口数据
	getTableList = (order, search, commit_status, poll_group_id, page, order_type) => {
    let pollId=this.props.match.params.pollId;
    let courseid=this.props.match.params.coursesId;
    let url=`/polls/${pollId}/poll_lists.json`;

    axios.get((url),{
      params:{
        limit:this.state.limit,
        order:order,
        search:search,
        commit_status:commit_status,
        poll_group_id:poll_group_id,
				page: page,
				order_type: order_type
      }
    }).then((result)=>{
      if(result){
        let list=[];
        let users=result.data.poll_users;
        let{page,limit}=this.state;
        if(users.length!=0){
          for(var i=0;i<users.length;i++){
            list.push({
              No:(parseInt(page)-1)*parseInt(limit)+(i+1),
              name:users[i].user_name,
              StudentNo:users[i].student_id,
              classes:users[i].user_group_name,
              status:users[i].commit_status ,
              time:users[i].end_at ,
              operation:users[i].commit_status,
              login:users[i].login
            })
          }
        }
        let classes=[];
        let groups=result.data.course_groups;
        if(groups){
          for(var i=0;i<groups.length;i++){
            classes.push({
              value:groups[i].course_group_id,
              label:groups[i].group_group_name+"("+groups[i].count+")"
            })
          }
        }
        let endTime=result.data.poll_types.poll_end_time;
        if(endTime!=undefined && endTime!=""){
          let t= moment(endTime,'YYYY-MM-DD HH:mm') - moment();
          endTime=t > 0 ? formatDuring(t) : "0";
        }

        this.setState({
          poll_end_at:endTime,
          dataInfo:result.data.poll_users,
          data:list,
          poll_types:result.data.poll_types,
          course_groups:result.data.course_groups,
          options_Class:classes
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  componentDidMount(){
		let {order, search, commit_status, poll_group_id, page, order_type} = this.state;
		this.getTableList(order, search, commit_status, poll_group_id, page, order_type);
  }

  // 翻页
  changePage=(pageNumber)=>{
    this.setState({
      page:pageNumber
    })
		let {order, search, commit_status, poll_group_id, order_type} = this.state;
		this.getTableList(order, search, commit_status, poll_group_id, pageNumber, order_type);
  }

  //排序
	changeOrder = (order, order_type) => {
    this.setState({
      order:order
    })
    let {search,commit_status,poll_group_id,page}=this.state;
		this.getTableList(order, search, commit_status, poll_group_id, page, order_type);
  }
  //选择分班情况
  classOptionsChange = (values,all) => {
    let status= all == false ? values : [];
    this.setState({
      poll_group_id:status
    })
		let {order, search, commit_status, page, order_type} = this.state;
		this.getTableList(order, search, commit_status, status, page, order_type);
  }
  //选择提交状态
  statusOptionChange=(values,all)=>{
    let status= all == false ? values : [];
    this.setState({
      commit_status:status
    })
		let {order, search, poll_group_id, page, order_type} = this.state;
		this.getTableList(order, search, status, poll_group_id, page, order_type);
	}
	//问卷table 列表塞选数据
	table1handleChange = (pagination, filters, sorter) => {
		//"ascend" 升序
		//"descend" 降序
		if (JSON.stringify(sorter) === "{}") {
			//没有选择
		} else {

			try {
				//学生学号排序
				if (sorter.columnKey === "StudentNo") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order_type: "asc",
							order: "student_id",
							loadingstate: true,
						});
						this.changeOrder("student_id", "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order_type: "desc",
							order: "student_id",
							loadingstate: true,
						})
						this.changeOrder("student_id", "desc");
					}
				}
			} catch (e) {

			}


			try {
				//提交时间排序
				if (sorter.columnKey === "time") {
					if (sorter.order === "ascend") {
						//升序
						this.setState({
							order_type: "asc",
							order: "end_at",
							loadingstate: true,
						})
						this.changeOrder("end_at", "asc");
					} else if (sorter.order === "descend") {
						//降序
						this.setState({
							order_type: "desc",
							order: "end_at",
							loadingstate: true,
						})
						this.changeOrder("end_at", "desc");
					}
				}
			} catch (e) {

			}
		}
	}
  render(){
    let {order,search,data,page,limit,course_groups,poll_types,options_Class,dataInfo,poll_end_at}=this.state;
    const isAdmin =this.props.isAdmin();
    const isStudent = this.props.isStudent();

    //分班
    const options_status = [
      { label: `未提交(${poll_types && poll_types.unanswer_users})`, value: '0' },
      { label: `按时提交(${poll_types && poll_types.answer_users})`, value: '1' }
    ];

    // 表格
    let columns = [{
      title: '序号',
      dataIndex: 'No',
      key: 'No',
      className:"edu-txt-center",
      width:120
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      className:"edu-txt-center",
      width:170
    }, {
      title: '学号',
      dataIndex: 'StudentNo',
      key: 'StudentNo',
      className:"edu-txt-center",
			sorter: true,
			sortDirections: sortDirections,
      render:(StudentNo,item,index)=>{
        return(
          item.StudentNo ? <span>{item.StudentNo}</span> : "--"
        )
      }
    }, {
      title: '分班',
      key: 'classes',
      dataIndex: 'classes',
      width:220,
      className:poll_types && poll_types.groups_count > 0 ? "edu-txt-center":"edu-txt-center none",
      render:(classes,item,index)=>{
        return(
          item.classes ? <span style={{maxWidth:'208px',display:"block"}} title={item.classes} className="task-hide">{item.classes}</span> : <span className="color-grey-9">--</span>
        )
      }
    }, {
      title: '提交状态',
      dataIndex: 'status',
      key: 'status',
      className:"edu-txt-center",
      width:170,
      render:(status,item,index)=>{
        return(
          item.status == 1 ?<span className='color-green'>按时提交</span>:<span>未提交</span>
        )
      }
    }, {
      title: '提交时间',
      dataIndex: 'time',
			key: 'time',
      className:"edu-txt-center",
      width:170,
			sorter: true,
			defaultSortOrder: 'descend',
			sortDirections: sortDirections,
      render:(time,item,index)=>{
        return(
          item.time == null ? <span className="color-grey-9">--</span> : moment(item.time).format('YYYY-MM-DD HH:mm')
        )
      }
    },{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      className:"edu-txt-center",
      width:120,
      render:(operation,item,index)=>{
        return(
          item.status == 1 ? <WordsBtn style="blue" targets={"_blank"} to={`/courses/${this.props.match.params.coursesId}/polls/${this.props.match.params.pollId}/users/${item.login}`}>查看</WordsBtn>:<span className="color-grey-9">--</span>
        )
      }
    }];
    // 非课堂成员不显示学号列
    let isNotMember =this.props.isNotMember();
    if(isNotMember){
      columns.some((item,key)=> {
        if (item.title === "学号") {
         columns.splice(key, 1)
         return true
        }
       }
      )
    }
    // un_anonymous true为实名问卷，显示操作列，否则隐藏
    if(poll_types && (isNotMember || poll_types.un_anonymous == false)){
      columns.some((item,key)=> {
        if (item.title === "操作") {
         columns.splice(key, 1)
         return true
        }
       }
      )
    }

    console.log(this.props.pollDetail&&this.props.pollDetail.polls_status)
    return(
          <div>
          {
            isAdmin ?
							this.props.pollDetail&&this.props.pollDetail.polls_status===undefined||this.props.pollDetail&&this.props.pollDetail.polls_status===1?"":<div className="pt30 pl30 clearfix edu-back-white">
              <div className="pr30 clearfix">
                <p className="fl mt5">
                  <CheckAllGroup options={options_status} label={'答题状态：'} onChange={this.statusOptionChange}></CheckAllGroup>
                </p>
                <div className="fr searchView height30">
                  <Search
                    value={search}
                    placeholder="请输入姓名或学号搜索"
                    onInput={this.inputStudent}
                    onSearch={this.searchInfo}
                  ></Search>
                </div>
              </div>
              {
								course_groups && course_groups.length > 1 ?
                <div className="mt15">
                  <CheckAllGroup options={options_Class} label={'分班情况：'} onChange={this.classOptionsChange}></CheckAllGroup>
                </div>
                :""
              }

            </div>:""
          }

						{this.props.pollDetail&&this.props.pollDetail.polls_status===undefined||this.props.pollDetail&&this.props.pollDetail.polls_status===1?"":<div className="clearfix padding20-30 edu-back-white">
            {
              isAdmin ? <span className="fl color-grey-3 font-12"><span className="color-orange-tip">{poll_types && poll_types.total_users}</span>个检索结果（{poll_types && poll_types.poll_users_count} 学生）</span> :""
            }
            {
							isStudent ?
              <span className="fl color-grey-3 font-12">
								{poll_types && poll_types.answer_users===undefined?"":<span className="mr15"><span className="color-orange-tip">{poll_types && poll_types.answer_users}</span> 已交</span>}
								{poll_types && poll_types.unanswer_users===undefined?"":<span className="mr15">{poll_types && poll_types.unanswer_users} 未交</span>}
                {
                  poll_end_at != "0" ?
                    <span className="color-grey-9"> 剩余提交时间：<span className="color-orange-tip">{poll_end_at}</span></span>
										: ""
                }
              </span>
								: ""
            }
							{/*{*/}
							{/*  isAdmin && */}
							{/*  <div className="fr">*/}
							{/*    <li className="drop_down">*/}
							{/*      <span className="color-grey-9 font-12">{order=="end_at"?"提交时间":"学生学号"}</span><i className="iconfont icon-xiajiantou font-12 ml2 color-grey-6"></i>*/}
							{/*      <ul className="drop_down_normal">*/}
							{/*        <li onClick={()=>this.changeOrder("end_at")}>提交时间</li>*/}
							{/*        <li onClick={()=>this.changeOrder("student_id")}>学生学号</li>*/}
							{/*      </ul>*/}
							{/*    </li>*/}
							{/*  </div>*/}
							{/*}*/}
          </div>}
						<div className="edu-table edu-back-white minH-560 pollResultList">
            {
							data && data.length > 0 ? <Table columns={columns} dataSource={data} pagination={false}
																							 onChange={this.table1handleChange}></Table> : <NoneData></NoneData>
            }
          </div>
          {
						poll_types && poll_types.total_users && poll_types.total_users > limit ?
            <div className="edu-txt-center mt30 mb50">
              <Pagination showQuickJumper current={page} onChange={this.changePage} pageSize={limit} total={poll_types.total_users}></Pagination>
            </div>:""
          }
        </div>
    )
  }
}
export default PollDetailTabFirst;
