import React,{ Component } from "react";


import Modals from '../../../modals/Modals'
import { WordsBtn } from 'educoder'
import HomeworkModal from "../../coursesPublic/HomeworkModal";

import axios from 'axios'
import moment from 'moment';


class ImmediatelyEnd extends Component{
  constructor(props){
    super(props)
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
      course_groups:undefined,

      modalsType:false,
      modalsTopval:"",
      loadtype:false,
      chooseId:undefined
    }
  }
  //立即截止
  homeworkstart=()=>{
    let {checkBoxValues}=this.props
    if(checkBoxValues.length==0){
      this.props.showNotification("请先在列表中选择数据");
      // this.setState({
      //   modalsType:true,
      //   modalsTopval:"请先在列表中选择数据",
      //   loadtype:true
      // })
    }else{
      let coursesId=this.props.match.params.coursesId;
      if(this.props.Exercisetype==="exercise"){
        let url=`/courses/${coursesId}/exercises/end_modal.json`;
        axios.get(url,{
          params:{
            check_ids:checkBoxValues
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
              course_groups:list,
            })
            this.setState({
              modalname:"立即截止",
              modaltype:response.data.on_commiting > 0 ? 1 : 2,
              visible:true,
							Topval:this.props.Exercisetype==="exercise"?"学生将不能再提交试卷":"学生将不能再提交问卷",
              // Botvalleft:"暂不截止",
							Botval:this.props.single ?this.props.Exercisetype==="exercise"?`本操作只对"提交中"的试卷有效`:`本操作只对"提交中"的问卷有效`:"",
              // starttime:"发布时间："+getNowFormatDate(1),
              // endtime:"截止时间："+getNowFormatDate(2),
              Cancelname:"暂不截止",
              Savesname:"立即截止",
              Cancel:this.homeworkhide,
              Saves:this.homeworkstartend,
            })
          }
        }).catch((error) => {
          console.log(error)
        });



      }else{
        let url=`/courses/${coursesId}/polls/end_poll_modal.json`;

        axios.get(url,{
          params:{
            check_ids:checkBoxValues
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
              course_groups:list,
            })
            this.setState({
              modalname:"立即截止",
              modaltype:response.data.on_commiting > 0 ? 1 : 2,
              visible:true,
							Topval:this.props.Exercisetype==="exercise"?"学生将不能再提交试卷":"学生将不能再提交问卷",
              // Botvalleft:"暂不截止",
							Botval:this.props.single ?this.props.Exercisetype==="exercise"?`本操作只对"提交中"的试卷有效`:`本操作只对"提交中"的问卷有效`:"",
              // starttime:"发布时间："+getNowFormatDate(1),
              // endtime:"截止时间："+getNowFormatDate(2),
              Cancelname:"暂不截止",
              Savesname:"立即截止",
              Cancel:this.homeworkhide,
              Saves:this.homeworkstartend,
            })
          }
        }).catch((error) => {
          console.log(error)
        });
      }


    }
  }

  //取消提示弹框
  modalCancel=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      loadtype:false
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
      addnametab:undefined
    })
  }
  // 确定立即截止
  homeworkstartend=()=>{

    let {checkBoxValues}=this.props
    let {chooseId}=this.state;
    let coursesId=this.props.match.params.coursesId;
    if(this.props.Exercisetype==="exercise"){
      let url=`/courses/${coursesId}/exercises/end_exercise.json`
      axios.post(url,{
        check_ids:checkBoxValues,
        group_ids:chooseId
      }).then((result)=>{
        if(result){
          this.props.showNotification(result.data.message);
          this.homeworkhide();
          // 调用父级公共头部的接口刷新
          this.props.action()
        }
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      let url=`/courses/${coursesId}/polls/end_poll.json`
      axios.post(url,{
        check_ids:checkBoxValues,
        group_ids:chooseId
      }).then((result)=>{
        if(result){
          this.props.showNotification(result.data.message);
          this.homeworkhide();
          // 调用父级公共头部的接口刷新
          this.props.action()
        }
      }).catch((error)=>{
        console.log(error);
      })
    }



  }

  getcourse_groupslist=(id)=>{
    this.setState({
      chooseId:id
    })
  }

  render(){
    let{
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
      course_groups,

      modalsType,
      modalsTopval,
      loadtype,
    }=this.state
    return(
      <React.Fragment>
        <HomeworkModal
          modaltype={modaltype}
					typs={"end"}
          modalname={modalname}
          visible={visible}
          Topval={Topval}
          Topvalright={Topvalright}
          Botvalleft={Botvalleft}
          Botval={Botval}
          starttime={starttime}
          endtime={endtime}
          Cancelname={Cancelname}
          Savesname={Savesname}
          Cancel={Cancel}
          Saves={Saves}
          course_groups={course_groups}
          getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
        />
        {/* 公用的提示弹框 */}
        <Modals
          modalsType={modalsType}
          modalsTopval={modalsTopval}
          modalsBottomval=""
          loadtype={loadtype}
          modalCancel={this.modalCancel}
          modalSave={this.modalCancel}
        ></Modals>

        <WordsBtn style={this.props.style} className={this.props.className} onClick={this.homeworkstart}>立即截止</WordsBtn>
      </React.Fragment>
    )
  }
}
export default ImmediatelyEnd