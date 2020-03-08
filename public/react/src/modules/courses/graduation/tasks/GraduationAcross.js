import React, { Component } from 'react';

import { Modal , Radio , Table , Pagination , Select ,Divider ,Icon , Input,Checkbox } from "antd";
import {Link} from 'react-router-dom'
import axios from 'axios';

import '../style.css'


const RadioGroup = Radio.Group;

const { Option } = Select;
const $ = window.$;

const bindTableColumn=(that)=>{
  let { course_groups }=that.state
  const filter=course_groups && course_groups.map((i,key)=>{
    let list={
      value: i.id,
      text: i.name
    }
    return list;
  })
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width:"50px",
      className:"edu-txt-center",
      render: (id, student, index) => {
        return (that.state.page - 1) * that.state.limit + index + 1
      }
    },
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (user_name, line, index) => {
        return(
          <span className="fl task-hide" style={{width:"69px"}} title={user_name}>{user_name}</span>
        )
      }
    },{
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
      render: (student_id, line, index) => {
        return(
          <span className="fl task-hide" style={{width:"127px"}} title={student_id}>{student_id}</span>
        )
      }
    },{
      title: '分班',
      dataIndex: 'course_group_name',
      key: 'course_group_name',
      filters:filter,
      render: (course_group_name, line, index) => {
        return(
          <span className="fl task-hide" style={{width:"160px"}} title={course_group_name}>{course_group_name}</span>
        )
      }
    }
  ];
  if(that.state.comment_status == 2){
    columns.push({
      title: '交叉评阅老师',
      dataIndex: 'cross_teachers',
      key: 'cross_teachers',
      width:"200px",
      render: (cross_teachers, line, index) => {
        return(
          <span className="fl task-hide" style={{width:"200px",paddingRight:"20px"}} title={cross_teachers}>{cross_teachers}</span>
        )
      }
    })
  }else{
    columns.push({
      title: '答辩组',
      dataIndex: 'cross_groups',
      key: 'cross_groups',
      width:"200px",
      render: (cross_groups, line, index) => {
        return(
          <span className="fl task-hide" style={{width:"200px",paddingRight:"20px"}} title={cross_groups}>{cross_groups}</span>
        )
      }
    })
  }

	if(course_groups&&course_groups.length===0){
		columns.some((item,key)=> {
				if (item.title === "分班") {
					columns.splice(key, 1)
					return true
				}
			}
		)
	}
  return columns;
}
class GraduationAcross extends Component{
  constructor(props){
    super(props);
    this.state={
      comment_status:2,
      page:1,
      limit:7,
      group_ids:undefined,
      users:undefined,
      user_count:undefined,
      graduation_groups:undefined,
      course_groups:undefined,
      teachers:undefined,
      tableLoading:false,
      chooseCount:0,
      chooseId:undefined,
      AcrossTeamIds:undefined,
      searchValue:undefined,
      showflag:false
    }
  }

  

  // 根据分班筛选
  filterByGroup=(value,record)=>{
    console.log(value);
    console.log(record)
  }

  // 切换分配方式
  funcommentstatus = (e) =>{
    this.setState({
      comment_status:e.target.value,
      chooseCount:0,
      chooseId:[],
      AcrossTeamIds:undefined,
      searchValue:undefined,
      showflag:false,
      page:1
    })
    let { group_ids }=this.state;
    this.getList(1,group_ids,e.target.value);
  }

  componentDidMount =()=>{
    let { comment_status }=this.props;
    let { page,group_ids }=this.state;
    this.setState({
      comment_status
    })

    this.getList(page,group_ids,comment_status);

    window.addEventListener('click', this.clickOther)
  }

  clickOther = (e) =>{
    if(e.target && e.target.matches('#acrossContent') || e.target.matches(".ant-modal-body")
      || e.target.matches(".acrossfoot") || e.target.matches(".acrossHead") || e.target.matches ('.ant-radio-wrapper') ||
      e.target.matches("th") || e.target.matches("td"))  {
      this.setState({
        showflag:false
      })
    } 
  }

  componentWillUnmount() { 
    window.removeEventListener('click', this.clickOther);
  }  

  getList=(page,group_ids,comment_status)=>{
    let { limit }=this.state;
    let { task_Id }=this.props;
    this.setState({
      tableLoading:true
    })
    let url=`/graduation_tasks/${task_Id}/cross_comment_setting.json`;
    axios.get((url),{params:{
      page,limit,group_ids,comment_status
    }}).then((result)=>{
      if(result){
        this.setState({
          users:result.data.work_users && result.data.work_users.map((item,key)=>{
            let list = {
              key:item.work_id,
              course_group_name:item.course_group_name,
              cross_teachers: item.cross_teachers,
              student_id:item.student_id,
              user_name:item.user_name,
              work_id:item.work_id,
							cross_groups:item.cross_groups
            }
            return list;
          }),
          user_count:result.data.user_count,
          graduation_groups:result.data.graduation_groups,
          course_groups:result.data.course_groups,
          teachers:result.data.teachers,
          tableLoading:false,
          // AcrossTeamIds:result.data
        })
      }
    }).catch((error)=>{
      this.setState({
        tableLoading:false
      })
      console.log(error);
    })
  }

  // 切换分页
  onPageChange=(page)=>{
    this.setState({
      page,
      showflag:false
    })
    let{group_ids,comment_status}=this.state;
    this.getList(page,group_ids,comment_status);
  }

  // 下拉切换
  changeSelect = (AcrossTeamIds) =>{
  	console.log(AcrossTeamIds)
    this.setState({
      AcrossTeamIds
    })
  }

  // 重置
  clearSelect =()=>{
    this.setState({
      AcrossTeamIds:undefined,
      searchValue:undefined
    })
  }

  // 确定分配
  sureAcross=()=>{
    let { AcrossTeamIds , chooseId , group_ids , comment_status,page }=this.state;
    let { task_Id }=this.props;

    let type = comment_status == 2 ? "user_ids" : "graduation_group_ids";

    let url=`/graduation_tasks/${task_Id}/assign_works.json`;
    if(!AcrossTeamIds || (AcrossTeamIds && AcrossTeamIds.length==0)){
      this.props.showNotification(`请先选择${ comment_status == 2 ? "老师": "答辩组" }！`);
      return;
    }
    if(!chooseId || (chooseId && chooseId.length==0)){
      this.props.showNotification("请先选择毕设作品！");
      return;
    }
    axios.post((url),{
        [type]:AcrossTeamIds,
        work_ids:chooseId
    }).then((result)=>{
      if(result){
        this.props.showNotification(result.data.message);
        this.getList(page,group_ids,comment_status);
        this.setState({
          showflag:false,
          AcrossTeamIds:undefined,
          chooseCount:0,
          chooseId:[]
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 筛选
  handleTableChange =(pagination, filters, sorter)=>{
    console.log(filters.course_group_name)
    // if(filters.course_group_name.length > 0){
      this.setState({
        page:1,
        group_ids:filters.course_group_name
      })
      let { comment_status }= this.state;
      this.getList(1,filters.course_group_name,comment_status);
    // }
  }

  // 下拉搜索
  changeSearchValue=(e)=>{

    this.setState({
      searchValue:e.target.value
    })
  }
  // 显示下拉
  changeFlag=(flag)=>{
    this.setState({
      showflag:flag
    })
  }

	checkonChange=(e,list)=>{
  let newlist=[]
		// AcrossTeamIds
  	let {comment_status}=this.state;
  	if(e.target.checked===true){
  		 if(comment_status===2){
				 list.map((item,key)=>{
					 newlist.push(String(item.user_id))
				 })
				 this.setState({
					 AcrossTeamIds:newlist
				 })
			 }else{
				 list.map((item,key)=>{
					 newlist.push(String(item.id))
				 })
				 this.setState({
					 AcrossTeamIds:newlist
				 })
			 }
		}else{
			this.setState({
				AcrossTeamIds:undefined
			})
		}
	}
  render(){
    let { 
      comment_status, 
      users,
      user_count,
      graduation_groups,
      course_groups,
      teachers,
      page,
      limit,
      tableLoading,
      chooseCount,
      chooseId,
      AcrossTeamIds,
      searchValue,showflag,
     } = this.state;
    let { modalVisible } = this.props;
    let courseId = this.props.match.params.coursesId;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginRight:'0px'
    };

    

    const rowSelection = {
      // 选中行的key，选中行
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          chooseId:selectedRowKeys,
          chooseCount:selectedRowKeys.length,
          showflag:false
        })
        console.log(selectedRowKeys);
      },
      selectedRowKeys:chooseId,
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };


    // 筛选下拉列表
    const teacherList = searchValue ? teachers&&teachers.filter(e=>e.user_name.indexOf(searchValue)>-1) : teachers;
    const course_groupsList = searchValue ? course_groups&&course_groups.filter(e=>e.name.indexOf(searchValue)>-1) : course_groups;
    const graduation_groupslist =searchValue ? graduation_groups&&graduation_groups.filter(e=>e.name.indexOf(searchValue)>-1) : graduation_groups;
		return(
      <Modal
      className={"AcrossModal"}
      title={"交叉评阅设置"}
      visible={modalVisible}
      closable={false}
      footer={null}
      width="775px"
      destroyOnClose={true}
      >
				{modalVisible===true?<style>
					{
						`
						  body{
								overflow: hidden !important;
						  }
						  .closeIcon{
						  font-size: 22px !important;
						  }
						`
					}
				</style>:""}
				<div id="closeIcon" onClick={this.props.modalCloss}>
					<i className="iconfont icon-shanchudiao"></i>
				</div>
        <style>
          {`
            .AcrossModal .ant-modal-body{
              padding:0px;
            }
            .AcrossModal span.ant-radio + *{
              padding-right:0px;
            }
            .AcrossModal .ant-table-thead > tr > th,.AcrossModal .ant-table-tbody > tr > td{
              padding:7px 5px;
              border-bottom:none!important;
            }
            .AcrossModal .ant-table-tbody{
              background:#F7FBFF;
            }
            .AcrossModal .ant-table-placeholder{
              border:none!important;
            }
            .AcrossModal .ant-table-tbody .ant-table-selection-column,.AcrossModal .ant-table-thead .ant-table-selection-column{
              padding-left: 23px!important;
            }
            .AcrossModal .ant-select-selection--multiple{
              padding-top:0px;
            }
            .AcrossModal .ant-select-selection--multiple .ant-select-selection__rendered>ul>li,.AcrossModal .ant-select-selection--multiple>ul>li{
              margin-top:3px;
              margin-bottom:0px;
            }
            .AcrossModal .ant-select-selection__rendered{
              height:30px;
              line-height:30px;
              overflow-y:auto;
              overflow-x:hidden;
              margin-right:0px;
            }
            .ant-table-filter-dropdown{
              width:200px;
            }
            .ant-table-filter-dropdown .ant-dropdown-menu{
              height:200px
            }
            .ant-dropdown-menu-item > label{
              float:left
            }
            .ant-dropdown-menu-item > span{
              float: left;
              max-width: 153px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .pd8px{
                padding: 8px;
            }
          `}
        </style>
        <div className="pt20 pl30 pr30 acrossHead">
          <span className={"fl mt5"} style={{fontWeight: "400",color: "#05101A"}}>评阅分配方式：</span>
          <span>
              <RadioGroup onChange={this.funcommentstatus} value={comment_status}>
                <Radio style={radioStyle} value={2}>手动分配评阅<span className={"font-14 color-grey-c ml5"}>（逐一指定每个学生的交叉评阅老师）</span></Radio>
                <Radio style={radioStyle} value={4}>答辩组分配评阅<span className={"font-14 color-grey-c ml5"}>（将老师加入不同答辩组，指定每个学生的交叉评阅答辩组，
                  <a href={"/courses/"+courseId+"/teachers"} target="_blank">
                  <span className={"color-blue"}>立即设置答辩组</span></a>
                </span>）</Radio>
              </RadioGroup>
          </span>
        </div>
        <div className="clearfix mb15 mt15 pl30 pr30" id="acrossContent">
          <span className="fl color-grey-c mt5">已选 { chooseCount == 0 ? 0 : <span className="color-blue">{chooseCount}</span>} 个</span>
          <span className="fr">
						<span className={"fl mt5"}><span className={"color-orange"}>分配</span>给{ comment_status && comment_status == 2 ? "老师":"答辩组"}：</span>
            <span className={"fl"} style={{height:"32px"}} id="selectTags">
              <Select 
              mode="multiple"
              placeholder={ comment_status && comment_status == 2 ? "请选择老师":"请选择答辩组"}
              // value={AcrossTeamIds}
              style={{width:"300px",height:"30px"}}
              onChange={this.changeSelect}
              open={showflag}
              onFocus={()=>this.changeFlag(true)}
              dropdownRender={menu => (
                <div id="selectDropdown">
									{comment_status == 2 &&teachers&&teachers.length>10?<div className="padding10-20">
                    <Input 
                      type='input' 
                      value={searchValue} 
                      onChange={this.changeSearchValue} 
                      placeholder='请输入名称搜索'
                      style={{height:"30px"}}
                      className="searchInput"
                    ></Input>
                  </div>:""}
									{comment_status != 2 &&course_groups&&course_groups.length>10?<div className="padding10-20">
										<Input
											type='input'
											value={searchValue}
											onChange={this.changeSearchValue}
											placeholder='请输入名称搜索'
											style={{height:"30px"}}
											className="searchInput"
										></Input>
									</div>:""}
									{comment_status == 2 &&teacherList&&teacherList.length>2?	<Checkbox className={"pd8px"} onChange={(e)=>this.checkonChange(e,teacherList)}>全选</Checkbox>:""}
								  {comment_status != 2 &&graduation_groupslist&&graduation_groupslist.length>2?	<Checkbox className={"pd8px"} onChange={(e)=>this.checkonChange(e,graduation_groupslist)}>全选</Checkbox>:""}
                  {menu}
                  <Divider style={{ margin: '4px 0 0' }} />
                  <div style={{ padding: '8px 12px', cursor: 'pointer' }}>
                    <a onClick={this.sureAcross} className="acrossSureBtn color-orange">提交</a>
                    <a onClick={this.clearSelect} className="ml20"><span className="acrossResetBtn color-blue">重置</span></a>
                  </div>
                </div>
              )}
              >
                { comment_status == 2 ?
                  teacherList && teacherList.map((i,key)=>{
                    return <Option key={i.user_id} value={String(i.user_id)}>{i.user_name}</Option>
                  }):
									graduation_groupslist && graduation_groupslist.map((i,key)=>{
                    return <Option key={i.id} value={String(i.id)}>{i.name}</Option>
                  })
                }
              </Select>
            </span>
          </span>
        </div>
				{/*{*/}
					{/*<style>*/}
						{/*{*/}
							{/*`*/}
							{/*.ant-table-thead > tr > th .anticon-filter, .ant-table-thead > tr > th .ant-table-filter-icon{*/}
    						{/*left: 40px;*/}
							{/*}*/}
							{/*`*/}
						{/*}*/}
					{/*</style>*/}
				{/*}*/}
        <Table rowSelection={rowSelection} columns={bindTableColumn(this)} dataSource={users} pagination={false} onChange={this.handleTableChange} loading={tableLoading}></Table>
        <div className="clearfix mt20 pb30 pl30 pr30 acrossfoot">
          <div className="fl">
            {
              user_count > limit ?
              <Pagination defaultCurrent={page} current={page} pageSize={limit} total={user_count} onChange={this.onPageChange}></Pagination>:""
            }
          </div>
          <div className="fr">
            <a  className="task-btn color-white mr30" onClick={this.props.modalCloss}>取消</a>
            <a className="task-btn task-btn-orange" onClick={this.props.modalCloss}>确认</a>
          </div>
        </div>
      </Modal>
    )
  }
}
export default GraduationAcross;