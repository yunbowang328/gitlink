import React,{ Component } from "react";
import { Checkbox, Menu,Pagination,Spin} from "antd";
import {Link} from 'react-router-dom';
import Titlesearchsection from '../../common/titleSearch/TitleSearchSection';
import HomeworkModal from "../../coursesPublic/HomeworkModal";
import { WordsBtn } from 'educoder';
import axios from 'axios';
import moment from 'moment';
import GraduateTaskItem from './GraduateTaskItem';
import TaskPublishModal from "./TaskPublishModal";
import Modals from '../../../modals/Modals';
import '../../css/members.css';
import '../style.css';
import NoneData from "../../coursesPublic/NoneData";


class GraduationTasks extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      checkAllValue: false,
      checkBoxValues: [],
      all_count:undefined,
			task_count:undefined,
      course_identity:undefined,
      course_public:undefined,
      tasks:[],
      page:1,
      search:"",
      order:null,
      selectpage:"",
      isSpin:false,
			typs:undefined,
			starttimes:undefined,

    }
  }
  fetchAll = (search,page,order,count) => {
// debugger
    const cid = this.props.match.params.coursesId


    const url = `/courses/${cid}/graduation_tasks.json`
    axios.get(url,{
      params: {
        search:search,
        page:page,
        order:order,
        count:count
      }
    }).then((response)=>{
      // console.log(response)
      if(response.status===200){
        this.setState({
          all_count:response.data.all_count,
					task_count:response.data.task_count,
          course_public:response.data.course_public,
          tasks:response.data.tasks,
          unpublished_count:response.data.unpublished_count,
          published_count:response.data.published_count,
          isSpin:false
        })
      }
    }).catch(function (error) {
      this.setState({
        isSpin:false
      })
    });

  }
  componentDidMount = () => {
    this.setState({
      isSpin:true
    })
    this.fetchAll("",1,"",15)

  }
  cancelmodel=()=>{

    this.setState({
      Modalstype:false,
      Loadtype:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
    })

  }

  savedelete=()=>{
    this.setState({
			Modalstype:false,
    })
    let {checkAllValue,checkBoxValues,search,page,order} = this.state;
    // let all_check;
    // if(checkAllValue===true){
    //   all_check=1
    // }else{
    //   all_check=0
    // }
    // all_check: all_check
    const cid = this.props.match.params.coursesId
    const url = `/courses/${cid}/graduation_tasks/multi_destroy.json`
    axios.delete(url, { data: {
        task_ids: checkBoxValues,
      }})
      .then((response) => {
        if (response.data.status == 0) {
          // {"status":1,"message":"删除成功"}
          this.fetchAll(search,page,order)
					this.props.showNotification(response.data.message);
          this.setState({
            // Modalstype:true,
            // Modalstopval:response.data.message,
            ModalsBottomval:"",
            ModalSave:this.cancelmodel,
            Loadtype:true,
            checkBoxValues:[],
            checkAllValue:false
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  testonSelect=()=>{
    let {checkBoxValues,checkAllValue}=this.state;

    if(checkAllValue===false){
       if(checkBoxValues.length===0||checkAllValue===undefined){
        return true
       }
    }

  }

  noSelect=()=>{
    // this.setState({
    //   Modalstype:true,
    //   Loadtype:true,
    //   Modalstopval:"请选择你要操作的任务",
    //   ModalSave:this.cancelmodel,
    // })

    this.props.showNotification("请选择你要操作的任务");
  }


  onDelete = () => {

   let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }


    this.setState({
      Modalstype:true,
      Modalstopval:"是否确认删除？",
      ModalCancel:this.cancelmodel,
      ModalSave:this.savedelete,
    })

  }
  ActionPoll = () => {

    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }
  let {search,page,order,count} =this.state;
    const cid = this.props.match.params.coursesId
    //加入题库
    let url=`/courses/${cid}/graduation_tasks/add_to_bank.json`;
    axios.post((url), {
      task_ids: this.state.checkBoxValues
    })
        .then((result)=>{
          if(result.data.status==0){
          	this.setState({
							checkBoxValues:[],
							checkAllValue:false
						})
						this.fetchAll(search,page,order,15)
            this.props.showNotification(`${result.data.message}`);

          }
        }).catch((error)=>{
      console.log(error);
    })
  }

  saveonOpen=()=>{
    this.setState({
      Modalstype:false,
    })
    let {checkAllValue,checkBoxValues,search,page,order} = this.state;
    // let all_check;
    // if(checkAllValue===true){
    //   all_check=1
    // }else{
    //   all_check=0
    // }
    //   all_check: all_check

    const cid = this.props.match.params.coursesId
    const url = `/courses/${cid}/graduation_tasks/set_public.json`
    axios.post(url, {
        task_ids: checkBoxValues,
      })
      .then((response) => {
        if (response.data.status == 0) {
          // {"status":1,"message":"删除成功"}
          this.fetchAll(search,page,order)
					this.props.showNotification(response.data.message);
					this.cancelmodel()
          this.setState({
            Modalstype:false,
            Modalstopval:response.data.message,
            ModalsBottomval:"",
            ModalSave:this.cancelmodel,
            Loadtype:false,
            checkBoxValues:[],
            checkAllValue:false
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onOpen=()=>{
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }

    this.setState({
      Modalstype:true,
      Modalstopval:"设为公开后，非课堂成员也可以访问查看",
      ModalsBottomval:"是否确认设为公开？",
      ModalCancel:this.cancelmodel,
      ModalSave:this.saveonOpen,
    })
  }




	// onSticky = (message) => {
  //   const cid = this.props.match.params.coursesId
  //   const url = `/messages/${message.id}/sticky_top.json`
  //   axios.put(url, {
  //     course_id: cid,
  //   })
  //   .then((response) => {
  //     if (response.data.id) {
  //       // {"status":1,"message":"删除成功"}
  //       console.log('--- 置顶/取消置顶成功')
  //       this.fetchAll()
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  // onItemClick = (item) => {
  //   const checkBoxValues = this.state.checkBoxValues.slice(0);
  //   const index = checkBoxValues.indexOf(item.id);
  //   if (index != -1) {
  //     _.remove(checkBoxValues, (listItem)=> listItem === item.id)
  //   } else {
  //     checkBoxValues.push(item.id)
  //   }
  //   this.onCheckBoxChange(checkBoxValues)
  // }

  onInputSearchChange = (e) => {
    this.setState({
      searchValue:e.target.value,
    })

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
    }
    this.timeoutHandler = setTimeout(() => {
      this.fetchAll(this.state.searchValue)
    }, 1200)
  }

  onselectfifteen = () => {
    this.setState({
      Modalstype:true,
      Modalstopval:"选择条数不能大于15条",
      ModalSave:this.cancelmodel,
      Loadtype:true
    })
  }
  onCheckAll = (e) => {
    let {tasks,checkBoxValues,page} =this.state;

    this.setState({
      checkAllValue:e.target.checked,
      selectpage:page
    })
    let checkBoxValuess=[];
    if(e.target.checked===true){
      for (var list of checkBoxValues){
        checkBoxValuess.push(list)
      }
      for(var value of tasks){
        checkBoxValuess.push(value.task_id)
      }
      checkBoxValuess=[...new Set(checkBoxValuess)]
      if(checkBoxValuess.length>15){
        this.onselectfifteen()
        return
      }

      this.setState({
        checkBoxValues:checkBoxValuess
      })
    }else if(e.target.checked===false){
      this.setState({
        checkBoxValues:checkBoxValuess
      })
    }

  }

  onCheckBoxChange=(checkedValues)=>{

    let {checkBoxValues,checkAllValue,tasks} =this.state;
    let type=false;
    if(checkBoxValues<tasks){
      type=false
    }else if(checkBoxValues<tasks){
      type=true
    }
   if(checkBoxValues.length>15||checkedValues.length>15){
     this.onselectfifteen()
     return
   }
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue:type
    })
  }


  PaginationTask=(page)=>{

   let {search,order,selectpage,checkAllValue,checkBoxValues}=this.state;
   let selectpagetype=selectpage===page?true:false
     this.setState({
       page:page,
       checkAllValue:selectpagetype,
			 checkBoxValues:[]
     })

    this.fetchAll(search,page,order);

    let checkBoxValueslist=checkBoxValues;

    // if(checkAllValue===true){
    //   for(var value of tasks){
    //     checkBoxValueslist.push(value.task_id)
    //   }
    //   this.setState({
    //     checkBoxValues:checkBoxValueslist
    //   })
    // }

  }

  handleClick = (e) => {
    let {search,page}=this.state;

    this.setState({
      order: e.key,
			page:1,
      isSpin:true,
      checkBoxValues:[],
      checkAllValue:false
    });

    let newkey=e.key;
    if(newkey==="null"){
      newkey="all"
    }

    this.fetchAll(search,1,newkey);
  }

  onPressEnter = (value) => {

    let {page,order}=this.state;
    this.setState({
      search:value,
      isSpin:true
    })
    this.fetchAll(value,page,order);

  }


  //立即发布
  publish=()=>{

    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }
    // this.homeworkstart()
    let starttime= this.props.getNowFormatDates(1);
    let endtime=this.props.getNowFormatDates(2);
    this.setState({
      modalname:"立即发布",
      visible:true,
      Topval:"学生将立即收到毕设任务",
      // Botvalleft:"暂不发布",
      Botval:`本操作只对"未发布"的任务有效`,
      starttime:"发布时间："+moment(new Date()).format("YYYY-MM-DD HH:mm"),
			starttimes:this.props.getNowFormatDates(1),
			typs:"start",
      endtime:"截止时间："+endtime,
      Cancelname:"暂不发布",
      Savesname:"立即发布",
      Cancel:this.publishcanner,
      Saves:this.homepublish,
    })
  }

  publishcanner=()=>{
    this.setState({
      visible:false,
    })
  }

  homepublish=(ids,endtime)=>{
    let {checkAllValue,checkBoxValues} = this.state;
    // let all_check;
    // if(checkAllValue===true){
    //   all_check=1
    // }else{
    //   all_check=0
    // }
    // all_check:all_check
    const cid = this.props.match.params.coursesId
    let url = `/courses/${cid}/graduation_tasks/publish_task.json`;
    axios.post(url,{
      task_ids:checkBoxValues,
      group_ids: this.state.course_groupslist,
			end_time:endtime,
    }).then((response)=>{
      if (response.data.status == 0) {
        this.props.showNotification(`${response.data.message}`);
        this.setState({
          // Modalstype:true,
          // Modalstopval:response.data.message,
          // ModalSave:this.cancelmodel,
          // Loadtype:true,
          checkBoxValues:[],
          checkAllValue:false
        })
        this.publishcanner();

        let {search,page,order} = this.state
        this.fetchAll(search,page,order);
      }
    }).catch((error)=>{

    })
  }



  end=()=>{
    let selectnum= this.testonSelect();
    if(selectnum===true){
      this.noSelect();
      return
    }
    // this.homeworkstart()
    this.setState({
      modalname:"立即截止",
      visible:true,
			Topval:"学生将不能再提交作品",
      // Botvalleft:"暂不截止",
      Botval:`本操作只对"提交中"的任务有效`,
      Cancelname:"暂不截止",
      Savesname:"立即截止",
      Cancel:this.publishcanner,
      Saves:this.coursetaskend,
			typs:"end",
    })

  }
  // //毕设因为没有分班列表分班列表
  // homeworkstart=()=>{
  //   let coursesId=this.props.match.params.coursesId;
  //   let url="/courses/"+coursesId+"/all_course_groups.json";
  //
  //   axios.get(url).then((response) => {
  //
  //     if(response.status===200){
  //       this.setState({
  //         modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
  //         course_groups:response.data.course_groups,
  //       })
  //     }
  //   }).catch((error) => {
  //     console.log(error)
  //   });
  //
  // }
  coursetaskend=()=>{
    let {checkAllValue,checkBoxValues} = this.state;
    // let all_check;
    // if(checkAllValue===true){
    //   all_check=1
    // }else{
    //   all_check=0
    // }
    //      all_check:all_check
    const cid = this.props.match.params.coursesId
    let url = `/courses/${cid}/graduation_tasks/end_task.json`;
    axios.post(url,{
      task_ids:checkBoxValues,
      group_ids: this.state.course_groupslist,
    }).then((response)=>{
      if (response.data.status == 0) {
        // this.setState({
        //   Modalstype:true,
        //   Modalstopval:response.data.message,
        //   ModalSave:this.cancelmodel,
        //   Loadtype:true,
        //   checkBoxValues:[],
        //   checkAllValue:false
        // })
        // this.publishcanner();

        this.props.showNotification(`${response.data.message}`);
        this.setState({
          // Modalstype:true,
          // Modalstopval:response.data.message,
          // ModalSave:this.cancelmodel,
          // Loadtype:true,
          checkBoxValues:[],
          checkAllValue:false
        })
        this.publishcanner();
        this.useBankSuccess();
      }
    }).catch((error)=>{

    })
  }
  // 题库选用成功后刷新页面
  useBankSuccess=(checkBoxValues,object_ids)=>{
      //debugger
    let {search,page,order,all_count} = this.state;
    this.fetchAll(search,page,order,all_count)

    this.setState({
      checkBoxValues:object_ids
    })

    // 立即发布
    this.publish();

  }
  getcourse_groupslist=(id)=>{
    this.setState({
      course_groupslist:id
    })
  }
  render(){

    let { searchValue, tasks, checkBoxValues, checkAllValue,all_count,course_public,page,
      Modalstype,
      Modalstopval,
      ModalCancel,
      ModalSave,
      ModalsBottomval,
      Loadtype,
      modaltype,
      modalname,
      visible,
      Topval,
      Topvalright,
      Botvalleft,
      Botval,
      starttime,
      endtime,
      Cancelname,
      Savesname,
      Cancel,
      Saves,
      course_groups,
      search,
      order,
			task_count
    } = this.state;
    //   this.fetchAll(search,page,order);
    const coursesId=this.props.match.params.coursesId;
    const category_id=this.props.match.params.Id;
    const graduationId=this.props.match.params.graduationId;
     // console.log(this.props.isCourseidentity()===isNotMember)
    return(
      <React.Fragment>
        {/*提示*/}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalCancel={ModalCancel}
          modalSave={ModalSave}
          modalsBottomval={ModalsBottomval}
          loadtype={Loadtype}
        />

        {/*立即发布*/}
        <HomeworkModal
          modalname={modalname}
          visible={visible}
          Topval={Topval}
          Topvalright={Topvalright}
          Botvalleft={Botvalleft}
          Botval={Botval}
          starttime={starttime}
					starttimes={this.state.starttimes}
					typs={this.state.typs}
          endtime={endtime}
          Cancelname={Cancelname}
          Savesname={Savesname}
          Cancel={Cancel}
          Saves={Saves}
          course_groups={this.state.course_groups}
          modaltype={this.state.modaltype}
          getcourse_groupslist={(id) => this.getcourse_groupslist(id)}

        />



        <TaskPublishModal ref="taskPublishModal"></TaskPublishModal>
        <style>{`
          .task_menu_ul{
              width: 550px;
          }
        `}</style>
        <Titlesearchsection
          title="毕设任务"
          searchValue={searchValue}
          onInputSearchChange={this.onInputSearchChange}
          allowClearonChange={this.onInputSearchChange}
          firstRowRight={
            <React.Fragment>
              {/*{this.props.isAdmin() ?<WordsBtn style="blue" className="mr30" onClick={() => this.addDir()}>题库选用</WordsBtn>:""}*/}
              {/*{this.props.isAdmin() ?<a href={"/api/graduation_tasks/"+category_id+"/tasks_list.xls"} className={"fr color-blue font-16"}>导出成绩</a> :""}*/}
              {this.props.isAdmin() ? <WordsBtn style="blue" className=" fr font-16">
                <Link to={"/courses/" + coursesId + "/graduation_tasks/"+category_id+"/new"}>
                  <span className={"color-blue font-16"}>新建</span>
                </Link>
              </WordsBtn> : ""}

              {/*题库选用 {this.props.isAdmin() ?<UseBank {...this.props} {...this.state} object_type={"gtask"} useBankSuccess={(checkBoxValues,object_ids)=>this.useBankSuccess(checkBoxValues,object_ids)}></UseBank>:""}*/}
            </React.Fragment>

          }

          // firstRowMid={
          //
          // }

          secondRowLeft={
            <div style={{"display":"inline-block", "marginTop": "22px"}}>
              <span>共{all_count}个毕设任务</span>
              <span style={{"marginLeft":"16px"}}>已发布：{this.state.published_count}个</span>
              <span style={{"marginLeft":"16px"}}>未发布：{this.state.unpublished_count}个</span>
            </div>
          }

          secondRowBotton={
            <div className="fl mt6 task_menu_ul">
              <Menu mode="horizontal" defaultSelectedKeys="all" onClick={this.handleClick}>
                <Menu.Item key="all">全部</Menu.Item>
                {this.props.isAdmin()?<Menu.Item key="0">未发布</Menu.Item>:""}
                <Menu.Item key="1">提交中</Menu.Item>
                <Menu.Item key="4">补交中</Menu.Item>
                <Menu.Item key="2">评阅中</Menu.Item>
                <Menu.Item key="3">交叉评阅中</Menu.Item>
              </Menu>
            </div>
          }

          onPressEnter={this.onPressEnter}
          searchPlaceholder={"请输入名称进行搜索"}
          />

        
          {/* <GraduateTaskItem></GraduateTaskItem>

          <FilesListItem></FilesListItem> */}

        {this.props.isAdmin()?all_count===undefined?'' :all_count===0?"": <div className="mt20 edu-back-white padding20-30">
          <div className="clearfix">
             <Checkbox className="fl" onChange={this.onCheckAll} checked={checkAllValue}>已选 {checkBoxValues===undefined?0:checkBoxValues.length} 个   （不支持跨页勾选）</Checkbox>
             <div className="studentList_operation_ul">

              <li className="li_line"><a className="color-grey-9" onClick={this.onDelete}>删除</a></li>
              <li className="li_line"><a className="color-grey-9" onClick={() => { this.publish() }}>立即发布</a></li>
              <li className="li_line"><a className="color-grey-9" onClick={() => { this.end() }}>立即截止</a></li>
              {course_public===true?<li className="li_line"><a className="color-grey-9" onClick={this.onOpen}>设为公开</a></li>:""}
              {/*<li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll()}>加入题库</a></li>*/}
            </div>
          </div>
        </div>:""}

        <style>{`
          .padding02010{
              padding: 10px 30px 0px 30px;
              cursor: pointer;
          }
          .ant-checkbox-group > div .boardsList {
              border-top: 1px solid transparent;
              padding: 10px 0px 20px!important;
          }
          .padding02010:hover{
              box-shadow: 0px 2px 6px rgba(51,51,51,0.09);
              opacity: 1;
              border-radius: 2px;
          }
        `}</style>
        <Spin size="large" spinning={this.state.isSpin}> <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues===undefined?[]:checkBoxValues}>
              { tasks&&tasks.map((item, index) => {
                // console.log(item)
                return (
                  <div className="mt20 edu-back-white pt10 pl30 pr30" key={index}>
                    <div className="clearfix">
                    <GraduateTaskItem
                      {...this.state}
                      {...this.props}
                      discussMessage={item}
                      isAdmin={this.props.isAdmin()}
                      isStudent={this.props.isStudent()}
                      isNotMember={this.props.isNotMember()}
                      checkBox={this.props.isAdmin()?<Checkbox value={item.task_id} key={item.task_id}></Checkbox>:""}
                      // onItemClick={this.onItemClick}
                      // onSticky={this.onSticky}
                      funlist={()=>this.fetchAll(search,page,order)}
                      coursename={this.props.coursedata&&this.props.coursedata.name}
                      graduationId={this.props.match.params.graduationId}
                      taskid={item.task_id}
                      coursesId={this.props.match.params.coursesId}
                      categoryid={this.props.match.params.Id}
                      workid={item.work_id}
                      index={index}
                    ></GraduateTaskItem>
                  </div>
                 </div>
                )

              })
              }
            </Checkbox.Group>
        </Spin>

          {
						task_count > 15 &&
            <div className="mb40 edu-txt-center padding20-30" >
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                pageSize={15}
                total={task_count}
                current={page}

                onChange={this.PaginationTask}
              />
            </div>
          }


						{
							tasks===undefined?'' :tasks.length===0? <NoneData></NoneData>:""
						}
        <div>

        </div>

      </React.Fragment>
      )
    }
}
export default GraduationTasks;

{/*<div className="alltask"*/}
		 {/*style={*/}
			 {/*{*/}
				 {/*display: all_count===undefined?'none' :all_count===0? 'block' : 'none'*/}
			 {/*}*/}
		 {/*}*/}
{/*>*/}
	{/*<div className="edu-tab-con-box clearfix edu-txt-center">*/}
		{/*<img className="edu-nodata-img mb20" src="/images/educoder/nodata.png" />*/}
		{/*<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p></div>*/}
{/*</div>*/}
