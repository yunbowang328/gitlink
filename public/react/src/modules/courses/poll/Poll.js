import React,{ Component } from "react";
import {Checkbox, Pagination,Menu ,Spin} from "antd";
import {WordsBtn, on, off, publicSearchs } from 'educoder';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import AddcoursesNav from "../coursesPublic/AddcoursesNav";
import ImmediatelyPublish from './pollPublicBtn/ImmediatelyPublish';
import ImmediatelyEnd from './pollPublicBtn/ImmediatelyEnd';
import PollListItem from './PollListItem';
import NoneData from '../coursesPublic/NoneData';
import UseBank from '../busyWork/UseBank';
import _ from 'lodash';
import '../css/members.css';
import '../css/busyWork.css';
import Modals from '../../modals/Modals';
import axios from 'axios';
import moment from 'moment';


class Poll extends Component{
  constructor(props){
    super(props);
    this.state={
      modalname:undefined,
      modaltype:undefined,
      visible:false,
      Topval:undefined,
      Topvalright:undefined,
      Botvalleft:undefined,
      Botval:undefined,
      starttime:undefined,
      endtime:undefined,
      Cancelname:undefined,
      Savesname:undefined,
      Cancel:undefined,
      Saves:undefined,
      StudentList_value:undefined,
      addname:undefined,
      addnametype:false,
      addnametab:undefined,
      addcanner:undefined,
      addsave:undefined,
      course_groups:[],   
      chooseId:undefined,   
      // 列表相关
      checkBoxValues:[],
      checkAllValue:false,
      pollsList:undefined,
      course_types:undefined,
      page:1,
      pageSize:15,
      type:0,
      polls_counts:undefined,

      //公用提示弹框相关
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:"",
      loadtype:false,
      boxType:"delete",
      isSpin:false
    }

  }

  inputStudent=(e)=>{
    this.setState({
      StudentList_value:e.target.value,
    })
  }


  // 题库选用
  selectBlank=(type)=>{
    if(type===2){
      this.setState({
        addname:"新建目录",
        addnametype:true,
        addnametab:type,
        addcanner:this.homeworkhide,
        addsave:undefined
      })
    }else if(type===4){
      this.setState({
        addname:"移动到目录",
        addnametype:true,
        addnametab:type,
        addcanner:this.homeworkhide,
        addsave:undefined
      })
    }

  }
  // 切换菜单选项
  changeType=(e)=>{
    this.setState({
      type:e.key,
			page:1,
      checkBoxValues:[],
      checkAllValue:false
    })
    let{StudentList_value,page}=this.state;
    this.InitList(e.key,StudentList_value,1);
  }
  // 获取列表数据
  InitList=(type,search,page,bank_checkValue)=>{
    this.setState({
      isSpin:true
    })
    let { pageSize,checkBoxValues }=this.state
    let coursesId=this.props.match.params.coursesId;
    let url='/courses/'+coursesId+'/polls.json?limit='+pageSize+'&page='+page
    if(type!="0"){
      url+="&type="+type
    }
    if(search!=""&&search!=undefined){
      url+="&search="+search
    }
    url=encodeURI(url);//IE11传参为乱码（search）
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          pollsList:result.data.polls,
          course_types:result.data.course_types,
          polls_counts:result.data.polls_counts,
          isSpin:false,
					checkBoxValues: bank_checkValue ? bank_checkValue : [],
          page:page
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  // 加载列表
  componentDidMount(){
    this.setState({
      isSpin:true
    })
    let{type,StudentList_value,page}=this.state
    this.InitList(type,StudentList_value,page);

		on('updateNavSuccess', this.updateNavSuccess)
  }
	updateNavSuccess=()=>{
		this.setState({
			isSpin:true
		})
		let{type,StudentList_value,page}=this.state
		this.InitList(type,StudentList_value,page);
	}
  //切换分页
  changePage=(pageNumber)=>{

    this.setState({
      page:pageNumber,
			checkBoxValues:[]
    })
    let{type,StudentList_value}=this.state
    this.InitList(type,StudentList_value,pageNumber);
  }
  // 搜索
  searchInfo=()=>{
    this.setState({
      page:1
    })
    let{type,StudentList_value}=this.state;
    this.InitList(type,StudentList_value,1)
  }
  // checkbox
  onItemClick = (item) => {
    const checkBoxValues = this.state.checkBoxValues.slice(0);
    const index = checkBoxValues.indexOf(item.id);
    if (index != -1) {
      _.remove(checkBoxValues, (listItem)=> listItem === item.id)
    } else {
      checkBoxValues.push(item.id);
    }
    this.onCheckBoxChange(checkBoxValues)
  }
  // 全选or反选
  onCheckAll = (e) => {
    this.setState({
      checkAllValue: e.target.checked
    })
    const values = this.state.pollsList.map(item => {
      return item.id
    })
    if (e.target.checked) {
      const concated = this.state.checkBoxValues.concat(values);
      const uniq=_.uniq(concated)
      this.setState({
        checkBoxValues: uniq
      })
    } else {
      this.setState({
        checkBoxValues: _.difference(this.state.checkBoxValues, values)
      })
    }
  } 

  onCheckBoxChange = (checkedValues) => {
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue: checkedValues.length == this.state.pollsList.length
    })
  }

  //删除或者设为公开
  ActionPoll=(value)=>{
    let CourseId=this.props.match.params.coursesId;
    //判断是否有选中数据
    if(this.state.checkBoxValues.length==0){
      this.props.showNotification("请先在列表中选择数据");
    }else{
      if(value != "bank"){
        this.setState({
          modalsType:true,
          modalsTopval:value=="delete"?"已提交作品将全部被删除，不可恢复":"公开后非课堂成员也可以访问查看",
          modalsBottomval:value=="delete"?"您确定要删除吗？":"是否确认公开？",
          loadtype:false,
          boxType:value
        })
      }else{
        //加入题库
        let url=`/courses/${CourseId}/polls/join_poll_banks.json`;
        axios.post((url), {
          check_ids: this.state.checkBoxValues
        })
        .then((result)=>{
          if(result){
            this.props.showNotification(`${result.data.message}`);
            this.setState({
              modalsType:false,
              modalsTopval:"",
              modalsBottomval:"",
              loadtype:false,
              checkBoxValues:[],
              checkAllValue:false
            })
            let{type,StudentList_value}=this.state
            this.InitList(type,StudentList_value,1);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    }
  }
  //取消删除或者设为公开
  modalCancel=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:"",
      loadtype:false
    })
  }
  //确定删除或者设为公开
  ModalAction=()=>{
    let CourseId=this.props.match.params.coursesId;
    if(this.state.checkBoxValues.length==0){
      this.setState({
        modalsType:false,
        modalsTopval:"",
        loadtype:false,
        checkBoxValues:[]
      })
    }else{
      if(this.state.boxType=="delete"){
        //删除
        let url=`/courses/${CourseId}/polls/destroys.json`;
        axios.post((url),  {
          check_ids: this.state.checkBoxValues
        })
        .then((result)=>{
          if(result){
            this.props.showNotification(`${result.data.message}`);
            this.setState({
              modalsType:false,
              modalsTopval:"",
              modalsBottomval:"",
              loadtype:false,
              checkBoxValues:[]
            })
            let{type,StudentList_value}=this.state
            this.InitList(type,StudentList_value,1);
            this.props.updataleftNavfun();
          }
        }).catch((error)=>{
          console.log(error);
        })
      }else if(this.state.boxType=="public"){
        //设为公开
        let url=`/courses/${CourseId}/polls/set_public.json`;
        axios.post((url), {
          check_ids: this.state.checkBoxValues
        })
        .then((result)=>{
          if(result){
            this.props.showNotification(`${result.data.message}`);
            this.setState({
              modalsType:false,
              modalsTopval:"",
              loadtype:false,
              checkBoxValues:[]
            })
            let{type,StudentList_value}=this.state
            this.InitList(type,StudentList_value,1);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    }
  }

  successFun=()=>{
    let{type,StudentList_value,page}=this.state
    this.InitList(type,StudentList_value,page)

  }
  // 题库选用成功后,立即发布，刷新页面
  useBankSuccess=(checkValue,value)=>{
    debugger;
    this.setState({
      isSpin:true
    })
    let{type,StudentList_value,page}=this.state
    this.InitList(type,StudentList_value,page,value);
    
    let coursesId=this.props.match.params.coursesId;
    let url=`/courses/${coursesId}/polls/publish_modal.json`;
    axios.get(url,{
      params:{
        check_ids:value
      }
    }).then((response) => {
      if(response){
        let list=[];
        if(response.data.course_info){
          for(var i=0;i<response.data.course_info.length;i++){
            list.push({
              id:response.data.course_info[i].course_group_id,
              name:response.data.course_info[i].course_group_name,
            })
          }
        }
        this.setState({
          modalname:"立即发布",
          modaltype:response.data.un_publish > 0 ? 1 : 2,
          visible:true,
          Topval:"本操作只对“未发布”的对象生效",
          Botvalleft:"暂不发布",
          Botval:"则通过后续手动设置，定时发布",
          starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
					starttimes:this.props.getNowFormatDates(1),
          endtime:"截止时间："+this.props.getNowFormatDates(2),
          Cancelname:"暂不发布",
          Savesname:"立即发布",
          Cancel:this.homeworkhide,
          Saves:this.homeworkstartend,
          course_groups:list,
					checkBoxValues:value
        })
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  getcourse_groupslist=(id)=>{
    this.setState({
      chooseId:id
    })
  }

  // 确定立即发布
  homeworkstartend=(value,endtime)=>{

    let {checkBoxValues}=this.state;
    let coursesId=this.props.match.params.coursesId;

    let url=`/courses/${coursesId}/polls/publish.json`
    axios.post(url,{
      check_ids:checkBoxValues,
      group_ids:value,
			end_time:endtime
    }).then((result)=>{
      if(result){
        let{type,StudentList_value,page}=this.state
        this.InitList(type,StudentList_value,page);
        this.props.showNotification(result.data.message);
        this.homeworkhide();
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  //暂不发布
  homeworkhide=()=>{
    this.setState({
      modalname:undefined,
      modaltype:undefined,
      visible:false,
      Topval:undefined,
      Topvalright:undefined,
      Botvalleft:undefined,
      Botval:undefined,
      starttime:undefined,
      endtime:undefined,
      Cancelname:undefined,
      Savesname:undefined,
      Cancel:undefined,
      Saves:undefined,
      StudentList_value:undefined,
      addname:undefined,
      addnametype:false,
      addnametab:undefined,
			// checkBoxValues:[]
    })
  }

  render(){
    let {
      modalname,
      modaltype,
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
      StudentList_value,
      addname,
      addnametype,
      addnametab,
      addcanner,
      addsave,
      course_groups,

      checkAllValue,
      checkBoxValues,
      course_types,
      pollsList,
      page,
      pageSize,
      polls_counts,

      modalsType,
      modalsTopval,
      modalsBottomval,
      loadtype
    }=this.state;
    // console.log(this.props);
    let {child}=this.props;
    let {coursesId,Id}=this.props.match.params
    const isAdmin = this.props.isAdmin()
    const isStudent=this.props.isStudent();
    // console.log(child)
    return(
      <React.Fragment >

				{visible===true?<HomeworkModal
          modaltype={modaltype}
          modalname={modalname}
          visible={visible}
          Topval={Topval}
          Topvalright={Topvalright}
          Botvalleft={Botvalleft}
          Botval={Botval}
          starttime={starttime}
					starttimes={this.state.starttimes}
          endtime={endtime}
          Cancelname={Cancelname}
          Savesname={Savesname}
          Cancel={Cancel}
          Saves={Saves}
          course_groups={course_groups}
          getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
        />:""}

        {/*添加目录/选择目录*/}
        <AddcoursesNav
          addname={addname}
          addnametype={addnametype}
          addnametab={addnametab}
          addcanner={addcanner}
          addsave={addsave}
        />

        {/* 公用的提示弹框 */}
        <Modals
          modalsType={modalsType}
          modalsTopval={modalsTopval}
          modalsBottomval={modalsBottomval}
          loadtype={loadtype}
          modalCancel={this.modalCancel}
          modalSave={this.ModalAction}
        ></Modals>


        <div className="edu-back-white">
          <p className="clearfix padding30 bor-bottom-greyE">
            <span className="font-18 fl color-dark-21">{polls_counts&&polls_counts.left_banner_name}</span>
            {
              isAdmin && 
              <li className="fr">
                <p className="fl"><UseBank {...this.props} {...this.state} object_type={"poll"} useBankSuccess={this.useBankSuccess}></UseBank></p>
                <WordsBtn style="blue" className="font-16" to={`/courses/${coursesId}/polls/${Id}/${"new"}`}>新建</WordsBtn>
              </li>
            }
          </p>
          <div className="clearfix pl30 pr30">
            <p className="fl font-14" style={{"marginTop":"27px"}}>
              <span className="mr20">共{polls_counts && polls_counts.polls_total_counts}个问卷</span>
              <span className="mr20">已发布：{polls_counts && polls_counts.polls_published_counts}个</span>
              <span>未发布：{polls_counts && polls_counts.polls_unpublish_counts}个</span>
            </p>
            <div className="fr mt16 mb16 searchView">
              {publicSearchs("请输入名称进行搜索",this.searchInfo,this.inputStudent,this.inputStudent)}
              {/*<Search*/}
              {/*  value={StudentList_value}*/}
              {/*  placeholder="请输入名称进行搜索"*/}
              {/*  onInput={this.inputStudent}*/}
              {/*  onSearch={this.searchInfo}*/}
              {/*></Search>*/}
            </div>
          </div>
          <div className="task_menu_ul pl30 pr30">
            <Menu mode="horizontal" defaultSelectedKeys="0" onClick={this.changeType}>
              <Menu.Item key="0">全部</Menu.Item>
              { course_types && course_types.user_permission == 1 && <Menu.Item key="1">未发布</Menu.Item> }
              <Menu.Item key="2">提交中</Menu.Item>
              <Menu.Item key="3">已截止</Menu.Item>
            </Menu>
          </div>
        </div>
        <Spin size="large" spinning={this.state.isSpin}>
        {
          pollsList && pollsList.length > 0 && isAdmin && 
          <div className="mt20 edu-back-white padding20-30">
            <div className="clearfix">
              <Checkbox className="fl" onChange={this.onCheckAll}  checked={checkAllValue}>已选 {checkBoxValues.length} 个  （不支持跨页勾选）</Checkbox>
              <div className="studentList_operation_ul">
                <li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll("delete")}>删除</a></li>
                <li className="li_line">
                  <ImmediatelyPublish 
                    {...this.props} 
                    {...this.state}
                    style="grey"
                    checkBoxValues={this.state.checkBoxValues}
                    action={this.successFun}
                  ></ImmediatelyPublish>
                </li>
                <li className="li_line">
                  <ImmediatelyEnd
                    {...this.props} 
                    {...this.state}
                    style="grey"
										single={true}
                    checkBoxValues={this.state.checkBoxValues}
                    action={this.successFun}
                  ></ImmediatelyEnd>
                </li>
                {
                  course_types && course_types.course_is_public == 1 && <li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll("public")}>设为公开</a></li>
                }
								{this.props.user&&this.props.user.main_site===true?<li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll("bank")}>加入题库</a></li>:""}
              </div>
            </div>
          </div>
          }

          {
            pollsList && pollsList.length > 0 &&

            <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
              <div className="workList mt20">
              {
                pollsList && pollsList.map((item,key)=>{
                  return(
                    <PollListItem 
                      {...this.props} 
                      {...this.state} 
                      courseType={course_types}
                      item={item}
                      index={key}
											onItemClick={this.onItemClick}
                      checkBox={<Checkbox value={item.id}   key={item.id}  onClick={() => this.onItemClick(item)}></Checkbox>}
                    ></PollListItem>
                  )
                })
              }
              </div>
            </Checkbox.Group>
          }
        </Spin>
          {
            pollsList && pollsList.length==0 && <NoneData></NoneData>
          }
        {
          course_types && polls_counts.polls_all_counts > pageSize ? 
          <div className="mt30 edu-txt-center pb30">
            <Pagination showQuickJumper current={page} total={polls_counts && polls_counts.polls_all_counts} pageSize={pageSize} onChange={this.changePage}></Pagination>
          </div>
          :
          ""
        }
        

      </React.Fragment>
    )
  }
}
export default Poll;