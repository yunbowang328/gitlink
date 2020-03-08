import React,{ Component } from "react";


import Modals from '../../../modals/Modals'
import { WordsBtn } from 'educoder'
import HomeworkModal from "../../coursesPublic/HomeworkModal";

import axios from 'axios'
import moment from 'moment';



class CancelPublish extends Component{
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
  //撤销发布
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
      let pollId=this.props.match.params.pollId;
      let url=`/polls/${pollId}/cancel_publish_modal.json`;

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
            modalname:"撤销发布",
            modaltype:response.data.on_commiting > 0 ? 1 : 2,
            visible:true,
            Topval:"将删除学生已提交的全部作品及其评阅记录",
            // Botvalleft:"",
            Botval:"删除的作品记录无法恢复",
            // starttime:"发布时间："+getNowFormatDate(1),
            // endtime:"截止时间："+getNowFormatDate(2),
            Cancelname:"暂不撤销",
            Savesname:"立即撤销",
            Cancel:this.homeworkhide,
            Saves:this.homeworkstartend,
          })
        }
      }).catch((error) => {
        console.log(error)
      });
      
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
  // 确定撤销发布
  homeworkstartend=()=>{
    let {checkBoxValues}=this.props
    let {chooseId}=this.state;
    let pollId=this.props.match.params.pollId;
    let url=`/polls/${pollId}/cancel_publish.json`
    axios.post(url,{
        check_ids:checkBoxValues,
        group_ids:chooseId
    }).then((result)=>{
      if(result.status==200){
        this.props.showNotification(result.data.message);
        this.homeworkhide();

        // 调用父级公共头部的接口刷新
        this.props.action()
      }
    }).catch((error)=>{
      console.log(error);
    })
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
          modalSave={this.ModalAction}
        ></Modals>

        <WordsBtn style={this.props.style} className={this.props.className} onClick={this.homeworkstart}>撤销发布</WordsBtn>
      </React.Fragment>
    )
  }
}
export default CancelPublish