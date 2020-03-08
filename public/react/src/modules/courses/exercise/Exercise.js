import React,{ Component } from "react";
import {Checkbox, Pagination,Menu,Spin } from "antd";
import ExerciseListItem from './ExerciseListItem'
import axios from 'axios';
import Modals from '../../modals/Modals';
import '../css/members.css'
import { WordsBtn,on, publicSearchs } from 'educoder'
import '../css/busyWork.css'
import _ from 'lodash';
import moment from 'moment'
import UseBank from "../busyWork/UseBank";
import ImmediatelyPublish from "../poll/pollPublicBtn/ImmediatelyPublish";
import ImmediatelyEnd from "../poll/pollPublicBtn/ImmediatelyEnd";
import NoneData from "../coursesPublic/NoneData";
import HomeworkModal from "../coursesPublic/HomeworkModal";

class Exercise extends Component{
    constructor(props){
        super(props);
        this.state={
            modalname:undefined,
            modaltype:undefined,
            modalsBottomval:undefined,
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
            type:undefined,
            search:undefined,
            page:1,
            limit:15,
            checkBoxValues:[],
            Exercisetype:"exercise",
            isSpin:false
        }
    }

    // 加载列表
    componentDidMount(){
        this.reloadList();
			on('updateNavSuccess', this.updateNavSuccess)
    }

	updateNavSuccess=()=>{
		this.reloadList();
	}

    reloadList=()=>{
        this.setState({
            isSpin:true
        })
        let{type,search,page,limit}=this.state
        this.InitList(type,search,page,limit);
    }

    // 获取列表数据
    InitList=(type,search,page,limit)=>{
        this.setState({
            isSpin:true
        })
        let coursesId=this.props.match.params.coursesId;
        let url='/courses/'+coursesId+'/exercises.json';

        axios.get(url,
            {
                params: {
                    type:type,
                    search: search,
                    page: page,
                    limit: limit
                }
            }
        ).then((result)=>{
                this.setState({
                    exercises_counts:result.data.exercises_counts,
                    course_types:result.data.course_types,
                    exercises:result.data.exercises,
                    checkAllValue:false,
                    checkBoxValues:[],
                    isSpin:false,
                    page:page
                })
        }).catch((error)=>{
            this.setState({
                isSpin:false,
            })
        })
    }


    inputStudent=(e)=>{
        this.setState({
            StudentList_value:e.target.value,
        })
    }
    // 搜索
    searchInfo=()=>{
        this.setState({
            type:undefined,
            page:1,
        })
        let{type,StudentList_value,limit}=this.state;
        this.InitList(type,StudentList_value,1,limit)
    }


    changeType=(e)=>{
        this.setState({
            type:e.key==="0"?undefined:e.key,
					  page:1,
            checkAllValue:false,
            checkBoxValues:[]
        })
        let{StudentList_value,page,limit}=this.state;
        this.InitList(e.key==="0"?undefined:e.key,StudentList_value,1,limit)
    }

    //切换分页
    changePage=(pageNumber)=>{
        this.setState({
            page:pageNumber,
					  checkBoxValues:[]
        })
        let{type,StudentList_value,limit}=this.state
        this.InitList(type,StudentList_value,pageNumber,limit);
    }

    onselectfifteen = () => {
        this.setState({
            Modalstype:true,
            Modalstopval:"选择条数不能大于15条",
            ModalSave:this.cancelmodel,
            modalsBottomval:"",
            Loadtype:true
        })
    }

    cancelmodel=()=>{

        this.setState({
            Modalstype:false,
            Loadtype:false,
            Modalstopval:"",
            modalsBottomval:"",
            ModalCancel:"",
            ModalSave:"",

        })

    }
    onCheckBoxChange = (checkedValues) => {
       let {exercises}=this.state;
        if( checkedValues.length>15){
            this.onselectfifteen()
            return
        }

        this.setState({
            checkBoxValues: checkedValues,
            checkAllValue: checkedValues.length == exercises.length
        })
    }


	onItemClick = (item) => {
		const checkBoxValues = this.state.checkBoxValues.slice(0);
		const index = checkBoxValues.indexOf(item.id);
		if (index != -1) {
			_.remove(checkBoxValues, (listItem)=> listItem === item.id)
		} else {
			checkBoxValues.push(item.id)
		}
		this.onCheckBoxChange(checkBoxValues)
	}

	// 全选or反选
    onCheckAll = (e) => {
        this.setState({
            checkAllValue: e.target.checked
        })
        const values = this.state.exercises.map(item => {
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
    // 题库选用成功后刷新页面
    useBankSuccess=(checkValue,value)=>{

        let{type,StudentList_value,page,limit}=this.state;
        let coursesId=this.props.match.params.coursesId;
        let url=`/courses/${coursesId}/exercises/publish_modal.json`;
        axios.get(url,{
            params:{
                check_ids:value
            }
        }).then((response) => {
            if(response.status===200){
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
									  Topval:"学生将立即收到试卷",
                    // Botvalleft:"暂不发布",
									  Botval:`本操作只对"未发布"的试卷有效`,
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


    //删除或者设为公开
    ActionPoll=(value)=>{

        let CourseId=this.props.match.params.coursesId;
        let{type,StudentList_value,page,limit}=this.state;

        //判断是否有选中数据
        if(this.state.checkBoxValues.length==0){
            // this.setState({
            //     Modalstype:true,
            //     Modalstopval:"请先在列表中选择数据",
            //     Loadtype:true,
            //     ModalSave:this.cancelmodel,
            // })
            this.props.showNotification("请先在列表中选择数据");
        }else{
            if(value != "bank"){
                this.setState({
                    Modalstype:true,
                    Modalstopval:value=="delete"?"已提交作品将全部被删除，不可恢复":"公开后非课堂成员也可以访问查看",
                    modalsBottomval:value=="delete"?"是否确认删除?":"是否确认公开？",
                    Loadtype:false,
                    boxType:value,
                    ModalSave:this.ModalAction
                })
            }else{

                //加入题库
                let url=`/courses/${CourseId}/exercises/join_exercise_banks.json`;
                axios.post((url), {
                      check_ids: this.state.checkBoxValues
                  })
                  .then((result)=>{
                      if(result.data.status==0){
                          this.props.showNotification(`${result.data.message}`);
                          this.setState({
                              Modalstype:false,
                              Modalstopval:"",
                              modalsBottomval:"",
                              Loadtype:false,
                              checkBoxValues:[]
                          })
                          this.InitList(type,StudentList_value,page,limit)
													this.props.updataleftNavfun()
                      }
                  }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
    //确定删除或者设为公开
    ModalAction=()=>{
        let CourseId=this.props.match.params.coursesId;
        let{type,StudentList_value,page,limit}=this.state;
        this.setState({
            Modalstypeloding:true
        })
        if(this.state.checkBoxValues.length==0){
            this.setState({
                Modalstype:false,
                Modalstopval:"",
                modalsBottomval:"",
                Loadtype:false,
                checkBoxValues:[],
                Modalstypeloding:false
            })
        }else{
            if(this.state.boxType=="delete"){
                //删除
                let url=`/courses/${CourseId}/exercises/destroys.json`;
                axios.post((url),  {
                      check_ids: this.state.checkBoxValues
                  })
                  .then((result)=>{
                      if(result.data.status==0){
                          this.props.showNotification(`${result.data.message}`);
                          this.setState({
                              Modalstype:false,
                              Modalstopval:"",
                              modalsBottomval:"",
                              Loadtype:false,
                              checkBoxValues:[],
                              Modalstypeloding:false
                          })
                          this.InitList(type,StudentList_value,page,limit);
                          this.props.updataleftNavfun();
                      }
                  }).catch((error)=>{
                    console.log(error);
                })
            }else if(this.state.boxType=="public"){
                //设为公开

                let url=`/courses/${CourseId}/exercises/set_public.json`;
                axios.post((url), {
                      check_ids: this.state.checkBoxValues
                  })
                  .then((result)=>{
                      if(result.data.status==0){
                          this.props.showNotification(`${result.data.message}`);
                          this.setState({
                              Modalstype:false,
                              Modalstopval:"",
                              modalsBottomval:"",
                              Loadtype:false,
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

    //暂不发布
    homeworkhide=()=>{
        let {type,StudentList_value,page,limit}=this.state;
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
            addnametab:undefined
        })

        this.InitList(type,StudentList_value,page,limit)
    }

    getcourse_groupslist=(id)=>{
        this.setState({
            chooseId:id
        })
    }

    // 确定立即发布
    homeworkstartend=(idss,endtime)=> {
        let {chooseId,checkBoxValues,type,StudentList_value,page,limit} = this.state;

        let coursesId = this.props.match.params.coursesId;

        let url = `/courses/${coursesId}/exercises/publish.json`
        axios.post(url, {
            check_ids: checkBoxValues,
            group_ids: chooseId,
				   	end_time:endtime
        }).then((result) => {
            if (result) {
                this.props.showNotification(result.data.message);
                this.homeworkhide();

                // 调用父级公共头部的接口刷新
                // this.props.action()
                this.InitList(type,StudentList_value,page,limit)
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    render(){
        let {
            checkAllValue,
            StudentList_value,
            exercises_counts,
            course_types,
            exercises,
            checkBoxValues,

            pageSize,
            page,
        }=this.state;

        let {child}=this.props;
        //  debugger
        // exercises_counts && exercises_counts.exercises_all_counts ===0

        return(
            <React.Fragment>

                    {/* 公用的提示弹框 */}
                    <Modals
                        modalsType={this.state.Modalstype}
                        modalsTopval={this.state.Modalstopval}
                        modalsBottomval={this.state.modalsBottomval}
                        loadtype={this.state.Loadtype}
                        modalCancel={this.cancelmodel}
                        modalSave={this.state.ModalSave}
                        antIcon={this.state.Modalstypeloding}
                    ></Modals>

                   <HomeworkModal
                      modaltype={this.state.modaltype}
                      modalname={this.state.modalname}
                      visible={this.state.visible}
                      Topval={this.state.Topval}
                      Topvalright={this.state.Topvalright}
                      Botvalleft={this.state.Botvalleft}
                      Botval={this.state.Botval}
                      starttime={this.state.starttime}
											starttimes={this.state.starttimes}
                      endtime={this.state.endtime}
                      Cancelname={this.state.Cancelname}
                      Savesname={this.state.Savesname}
                      Cancel={this.state.Cancel}
                      Saves={this.state.Saves}
                      course_groups={this.state.course_groups}
                      getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
                    />

                    <div className="edu-back-white">
                        <p className="clearfix padding30 bor-bottom-greyE">
                            <span className="font-18 fl color-dark-21">{exercises_counts && exercises_counts.left_banner_name}</span>
                            {
                                this.props.isAdmin()===true?
                                <li className="fr">
                                    <p className="fl"><UseBank {...this.props} {...this.state} object_type={"exercise"} useBankSuccess={this.useBankSuccess}></UseBank></p>
                                    {course_types&&course_types.course_status===0?<WordsBtn style="blue" className="font-16" to={`/courses/${this.props.match.params.coursesId}/exercises/new`}>新建</WordsBtn>:""}
                                </li>:""
                            }

                            {/*{*/}
                                {/*this.props.isStudent()===true?*/}
                                  {/*<li className="fr">*/}
                                      {/*<p className="fl"><UseBank {...this.props} {...this.state} object_type={"exercise"} useBankSuccess={this.useBankSuccess}></UseBank></p>*/}
                                  {/*</li>:""*/}
                            {/*}*/}
                        </p>
                        <div className="clearfix pl30 pr30">
                            <p className="fl font-14" style={{"marginTop":"27px"}}>
                                <span className="mr20">共{exercises_counts && exercises_counts.exercises_total_counts}个试卷</span>
                                <span className="mr20">已发布：{exercises_counts && exercises_counts.exercises_published_counts}个</span>
                                <span>未发布：{exercises_counts && exercises_counts.exercises_unpublish_counts}个</span> 
                            </p>
                            <div className="fr mt16 mb16 searchView">
                                {publicSearchs("请输入名称进行搜索",this.searchInfo,this.inputStudent,this.inputStudent)}
                                {/*<Search*/}
                                {/*    value={StudentList_value}*/}
                                {/*    placeholder="请输入名称进行搜索"*/}
                                {/*    onInput={this.inputStudent}*/}
                                {/*    onSearch={this.searchInfo}*/}
                                {/*></Search>*/}
                            </div>
                        </div>
                        <div className="task_menu_ul pl30 pr30">
                            <Menu mode="horizontal" defaultSelectedKeys="0" onClick={this.changeType}>
                                <Menu.Item key="0">全部</Menu.Item>
                                {this.props.isAdmin()?<Menu.Item key="1">未发布</Menu.Item>:""}
                                <Menu.Item key="2">提交中</Menu.Item>
                                <Menu.Item key="3">已截止</Menu.Item>
                            </Menu>
                        </div>
                    </div>
                <Spin size="large" spinning={this.state.isSpin}>
                    {this.props.isAdmin()?exercises && exercises.length ===0?"":<div className="mt20 mb20 edu-back-white padding20-30">
                                <div className="clearfix">
                                    <Checkbox className="fl" onChange={this.onCheckAll}  checked={checkAllValue}>已选 {checkBoxValues.length} 个   （不支持跨页勾选）</Checkbox>
                                    <div className="studentList_operation_ul">
                                        <li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll("delete")}>删除</a></li>
                                        <li className="li_line">
                                            <ImmediatelyPublish
                                                {...this.props}
                                                {...this.state}
                                                style="grey"
                                                checkBoxValues={this.state.checkBoxValues}
                                                action={this.reloadList}
                                            ></ImmediatelyPublish>
                                        </li>
                                        <li className="li_line">
                                            <ImmediatelyEnd
                                                {...this.props}
                                                {...this.state}
                                                style="grey"
																								single={true}
                                                checkBoxValues={this.state.checkBoxValues}
                                                action={this.reloadList}
                                            ></ImmediatelyEnd>
                                        </li>
                                        {
                                            course_types && course_types.course_is_public == 1 && <li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll("public")}>设为公开</a></li>
                                        }
																			{this.props.user&&this.props.user.main_site===true?<li className="li_line"><a className="color-grey-9" onClick={()=>this.ActionPoll("bank")}>加入题库</a></li>:""}
                                    </div>
                                </div>

										</div>:<div className="mt20"></div>}

                    <style>{`
                    .workList_Item:hover {
                    box-shadow: 0px 2px 6px rgba(51,51,51,0.09);
                    opacity: 1;
                    border-radius: 2px;
                     }
                    `}</style>

                        {
                            exercises && exercises.length > 0 &&

                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
                                <div className="workList">
                                    {
                                        exercises && exercises.map((item,key)=>{
                                            return(
                                                <ExerciseListItem
                                                    {...this.props}
                                                    {...this.state}
                                                    item={item}
                                                    index={key}
																										onItemClick={this.onItemClick}
                                                    checkBox={<Checkbox value={item.id} key={item.id}
                                                    ></Checkbox>}
                                                ></ExerciseListItem>
                                            )
                                        })
                                    }
                                </div>
                            </Checkbox.Group>

                        }
                    </Spin>
                        {
                            exercises && exercises.length ===0 && <NoneData></NoneData>
                        }
                        {
                            exercises_counts && exercises_counts.exercises_all_counts > 15 ?
                                <div className="mb20 edu-txt-center pt30">
                                    <Pagination showQuickJumper current={page} total={exercises_counts && exercises_counts.exercises_all_counts} pageSize={15} onChange={this.changePage}></Pagination>
                                </div>
                                :
                                ""
                        }


            </React.Fragment>
        )
    }
}
export default Exercise;
