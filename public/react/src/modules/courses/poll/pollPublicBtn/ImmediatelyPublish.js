import React,{ Component } from "react";


import Modals from '../../../modals/Modals'
import { WordsBtn } from 'educoder'
import HomeworkModal from "../../coursesPublic/HomeworkModal";
import OneSelfOrderModal from "../../coursesPublic/OneSelfOrderModal";
import axios from 'axios'
import moment from 'moment';





class Immediatelypublish extends Component{
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
			starttimes:undefined,
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
  //立即发布
  homeworkstart=()=>{
    let {checkBoxValues,pushtype}=this.props


   if(pushtype===true){
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
				 let url=`/exercises/${this.props.match.params.Id}/publish_groups.json`;
				 axios.get(url).then((response) => {
					 if(response.status===200){
						 this.setState({
							 modalname:"立即发布",
							 modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
							 OneSelftype:true,
							 Topval:this.props.Exercisetype==="exercise"?"学生将立即收到试卷":"学生将立即收到问卷",
							 // Botvalleft:"暂不发布",
							 Botval:this.props.single ? "":this.props.Exercisetype==="exercise"?`本操作只对"未发布"的试卷有效`:`本操作只对"未发布"的问卷有效`,
							 starttime:moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
							 starttimes:this.props.getNowFormatDates(1),
							 endtime:"截止时间："+this.props.getNowFormatDates(2),
							 Cancelname:"暂不发布",
							 Savesname:"立即发布",
							 Cancel:this.homeworkhide,
							 Saves:this.homeworkstartend,
							 course_groups:response.data.course_groups,
							 starttimesend:response.data.end_time===undefined||response.data.end_time===null||response.data.end_time===""?undefined:response.data.end_time,
						 })

					 }
				 }).catch((error) => {
					 console.log(error)
				 });
			 }else{
				 let url=`/polls/${this.props.match.params.pollId}/publish_groups.json`;
				 axios.get(url).then((response) => {
					 if(response){

						 this.setState({
							 modalname:"立即发布",
							 modaltype:response.data.course_groups===null||response.data.course_groups.length===0?2:1,
							 OneSelftype:true,
							 Topval:this.props.Exercisetype==="exercise"?"学生将立即收到试卷":"学生将立即收到问卷",
							 // Botvalleft:"暂不发布",
							 Botval:this.props.single ? "":this.props.Exercisetype==="exercise"?`本操作只对"未发布"的试卷有效`:`本操作只对"未发布"的问卷有效`,
							 starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
							 starttimes:this.props.getNowFormatDates(1),
							 endtime:"截止时间："+this.props.getNowFormatDates(2),
							 Cancelname:"暂不发布",
							 Savesname:"立即发布",
							 Cancel:this.homeworkhide,
							 Saves:this.homeworkstartend,
							 course_groups:response.data.course_groups,
							 starttimesend:response.data.end_time===undefined||response.data.end_time===null||response.data.end_time===""?undefined:response.data.end_time,
						 })
					 }
				 }).catch((error) => {
					 console.log(error)
				 });

			 }

		 }
	 }else{
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
				 let url=`/courses/${coursesId}/exercises/publish_modal.json`;
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
							 modalname:"立即发布",
							 modaltype:response.data.un_publish > 0 ? 1 : 2,
							 visible:true,
							 Topval:this.props.Exercisetype==="exercise"?"学生将立即收到试卷":"学生将立即收到问卷",
							 // Botvalleft:"暂不发布",
							 Botval:this.props.single ? "":this.props.Exercisetype==="exercise"?`本操作只对"未发布"的试卷有效`:`本操作只对"未发布"的问卷有效`,
							 starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
							 starttimes:this.props.getNowFormatDates(1),
							 endtime:"截止时间："+this.props.getNowFormatDates(2),
							 Cancelname:"暂不发布",
							 Savesname:"立即发布",
							 Cancel:this.homeworkhide,
							 Saves:this.homeworkstartend,
						 })

					 }
				 }).catch((error) => {
					 console.log(error)
				 });
			 }else{
				 let url=`/courses/${coursesId}/polls/publish_modal.json`;
				 axios.get(url,{
					 params:{
						 check_ids:checkBoxValues
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
							 course_groups:list,
						 })
						 this.setState({
							 modalname:"立即发布",
							 modaltype:response.data.un_publish > 0 ? 1 : 2,
							 visible:true,
							 Topval:this.props.Exercisetype==="exercise"?"学生将立即收到试卷":"学生将立即收到问卷",
							 // Botvalleft:"暂不发布",
							 Botval:this.props.single ? "":this.props.Exercisetype==="exercise"?`本操作只对"未发布"的试卷有效`:`本操作只对"未发布"的问卷有效`,
							 starttime:"发布时间："+moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
							 starttimes:this.props.getNowFormatDates(1),
							 endtime:"截止时间："+this.props.getNowFormatDates(2),
							 Cancelname:"暂不发布",
							 Savesname:"立即发布",
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
			OneSelftype:false,
      Topval:undefined,
      Topvalright:undefined,
      Botvalleft:undefined,
      Botval:undefined,
      starttime:undefined,
			starttimes:undefined,
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
  // 确定立即发布
  homeworkstartend=(ids,endtime)=>{

   let {checkBoxValues,pushtype}=this.props
    let {chooseId}=this.state;
    let coursesId=this.props.match.params.coursesId;

    let data={};

		if(pushtype===true){

				if(ids.length===0){
					data = {
						check_ids:checkBoxValues,
						end_time: endtime,
					}
				}else{
					data={
						check_ids: checkBoxValues,
						group_ids: ids,
						group_end_times:endtime,
						detail:true
					}

				}
		}else{

			data={
				check_ids:checkBoxValues,
				group_ids:chooseId,
				end_time:endtime
			}
		}


    if(this.props.Exercisetype==="exercise"){

      let url=`/courses/${coursesId}/exercises/publish.json`
      axios.post(url,data).then((result)=>{
        if(result){
          this.props.showNotification(result.data.message);
          this.homeworkhide();

          // 调用父级公共头部的接口刷新
          try {
            this.props.action();
          }catch (e) {

          }
          // 调用父级刷新数据的接口刷新
          try {
            this.props.getsetdata()
          }catch (e) {

          }

        }
      }).catch((error)=>{
        console.log(error);
      })

    }else{
      let url=`/courses/${coursesId}/polls/publish.json`
      axios.post(url,data).then((result)=>{
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
			starttimes,
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
					starttimes={starttimes}
          endtime={endtime}
          Cancelname={Cancelname}
          Savesname={Savesname}
          Cancel={Cancel}
          Saves={Saves}
          course_groups={course_groups}
          getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
        />

				{/*立即发布*/}
				{this.state.OneSelftype===true?<OneSelfOrderModal
					modaltype={this.state.modaltype}
					modalname={this.state.modalname}
					OneSelftype={this.state.OneSelftype}
					Topval={this.state.Topval}
					Topvalright={this.state.Topvalright}
					Botvalleft={this.state.Botvalleft}
					Botval={this.state.Botval}
					starttime={this.state.starttime}
					endtime={this.state.endtime}
					Cancelname={this.state.Cancelname}
					Savesname={this.state.Savesname}
					Cancel={this.state.Cancel}
					Saves={this.state.Saves}
					course_groups={this.state.course_groups}
					getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
					starttimes={this.state.starttimes}
					starttimesend={this.state.starttimesend}
					typs={this.state.typs}
				/>:""}

        {/* 公用的提示弹框 */}
        <Modals
          modalsType={modalsType}
          modalsTopval={modalsTopval}
          modalsBottomval=""
          loadtype={loadtype}
          modalCancel={this.modalCancel}
          modalSave={this.modalCancel}
        ></Modals>

        <WordsBtn style={this.props.style} className={this.props.className} onClick={()=>this.homeworkstart()}>立即发布</WordsBtn>
      </React.Fragment>
    )
  }
}
export default Immediatelypublish