import React,{ Component } from "react";
import { Input,Checkbox,Menu,Pagination } from "antd";

import HomeworkModal from '../coursesPublic/HomeworkModal';
import OneSelfOrderModal from "../coursesPublic/OneSelfOrderModal";
import axios from 'axios'
import moment from 'moment'
import { getNextHalfHourOfMoment } from 'educoder'
class PublishRightnow extends Component{
  constructor(props){
    super(props);

    this.state={
      course_groups: [],
      modalname:undefined,
      modaltype:undefined,
      visible:false,
      Topval:undefined,
      Botvalleft:undefined,
      Botval:undefined,
      starttime:undefined,
      endtime:undefined,
      Cancelname:undefined,
      Savesname:undefined,
      Cancel:undefined,
      Saves:undefined,
      Topvalright:undefined
    }
  }
  open = (usingCheckBeforePost) => {
    this.usingCheckBeforePost = usingCheckBeforePost == true
    this.homeworkstart()
  }

  homeworkstart=()=>{
		const isPublish = this.props.isPublish;
		const isPublishtype = this.props.isPublishtype;
		let showdatatypes=isPublish===true||isPublishtype===1;

    if (!this.props.checkBoxValues || this.props.checkBoxValues.length == 0) {
      this.props.showNotification(`请先选择要立即${showdatatypes? "发布" : "截止"}的作业`)
      return;
    }
    
    this.fetchCourseGroups();
    
    
  }
  showDialog = (course_groups) => {
    const isPublish = this.props.isPublish;
		const isPublishtype = this.props.isPublishtype;
    const dateFormat = 'YYYY-MM-DD HH:mm';
    let showdatatype=isPublish===true&&isPublishtype===undefined;
		let showdatatypes=isPublish===true||isPublishtype===1;
		// getNextHalfHourOfMoment
    const startMoment = (moment());
    this.setState({
      modalname: showdatatypes ? "立即发布" : "立即截止",
      modaltype:course_groups.length> 0 ? 1 : 2,
      visible:showdatatype?false:true,
			OneSelftype:showdatatype?true:false,
      Topval:showdatatypes ? "学生将立即收到作业" : "学生将不能再提交作品",
      // Botvalleft: isPublish ? "暂不发布" : "暂不截止",
      Botval: this.props.fromListPage ? (showdatatypes ? "本操作只对“未发布”的作业有效" : "本操作只对“提交中”的作业有效") : '',
      starttime: showdatatypes? `发布时间：${startMoment.format(dateFormat)}` : '',
			starttimes:showdatatypes? `${startMoment.format(dateFormat)}` : '',
      endtime:showdatatypes ? `截止时间：${startMoment.add(1, 'months').add(1, 'hours').minutes(0).format(dateFormat)}` : '',
      Cancelname:showdatatypes ? "暂不发布" : "暂不截止",
      Savesname:showdatatypes ? "立即发布" : "立即截止",
      Cancel:this.homeworkhide,
      Saves:this.homeworkstartend,
			typs:showdatatypes ? "start" : "end",
    })
  }
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

  homeworkstartend=(arg_group_ids,endtime)=>{
    debugger
    if (this.usingCheckBeforePost && this.props.checkBeforePost) {
      const goOn = this.props.checkBeforePost();
      if (!goOn) {
        this.homeworkhide();
        return;
      }
    }
    debugger
    const isPublish = this.props.isPublish;
    let group_ids = arg_group_ids
    if (this.usingCheckBeforePost) {
      group_ids = this.state.course_groups.map((item) => {
        return item.id
      })
    }
    debugger
    if(this.state.course_groups.length>0){
      if (this.state.course_groups.length && (!group_ids || group_ids&&group_ids.length == 0)) {
        this.props.showNotification('请至少选择一个分班');
        return;
      }
    }

		let data={}
		if(arg_group_ids&&arg_group_ids.length===0){
			data = {
				homework_ids: this.props.checkBoxValues,
				end_time: endtime==="Invalid date"?undefined:endtime,
			}
		}else if(this.props.islist===true){
			data={
				homework_ids: this.props.checkBoxValues,
				group_ids: group_ids,
				end_time:endtime,
			}
		}else{
			data={
				homework_ids: this.props.checkBoxValues,
				group_ids: group_ids,
				group_end_times:endtime,
				detail:true
			}
		}
		const isPublishtype = this.props.isPublishtype;
		let showdatatypes=isPublish===true||isPublishtype===1;
    let coursesId=this.props.match.params.coursesId;
    const url = `/courses/${coursesId}/homework_commons/${showdatatypes ? "publish_homework" : "end_homework"}.json`
    axios.post(url, data)
      .then((response) => {
        if (response.data.status == 0) {
        	this.homeworkhide()
          this.props.showNotification(showdatatypes  ? "立即发布成功" : "立即截止成功")
          this.props.doWhenSuccess && this.props.doWhenSuccess()
          this.setState({ visible : false })
					this.props.action && this.props.action()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // componentDidUpdate = (prevProps) => {
	// 	if ( prevProps.match.params.boardId != this.props.match.params.boardId ) {
	// 		this.fetchAll(null, 1)
	// 	}
  // }
  fetchCourseGroups = () => {
		const isPublish = this.props.isPublish;
		const isPublishtype = this.props.isPublishtype;
		let showdatatypes=isPublish===true||isPublishtype===1;
    let coursesId=this.props.match.params.coursesId;
    // TODO 这里要改成单选作业，接口使用这个 https://www.showdoc.cc/127895880302646?page_id=2035541497546668
    // /homework_commons/:id/publish_groups.json
    let url = `/courses/${coursesId}/all_course_groups.json`
    if (this.props.checkBoxValues.length == 1) {
      const isPublish = this.props.isPublish;
      url = `/homework_commons/${this.props.checkBoxValues[0]}/${ showdatatypes ? 'publish_groups' : 'end_groups'}.json`
    }

    axios.get(url, {
      })
      .then((response) => {
        if (!response || response.data.status == -1) {
          this.setState({ visible : false })
          return;
        }
        this.showDialog(response.data.course_groups)
        this.setState({
          course_groups: response.data.course_groups,
					starttimesend:response.data.end_time===undefined||response.data.end_time===null||response.data.end_time===""?undefined:response.data.end_time,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    const isPublish = this.props.isPublish;
		const isPublishtype = this.props.isPublishtype;
		let showdatatypes=isPublish===true||isPublishtype===1;

    let{
      Topvalright,
      modalname,
      modaltype,
      visible,
      Topval,
      Botvalleft,
      Botval,
      starttime,
			starttimes,
      endtime,
      Cancelname,
      Savesname,
      Cancel,
      Saves,
      course_groups
    }=this.state

    const { showActionButton } = this.props
    return(
      <div>
				{/*立即截止*/}
				{visible===true?<HomeworkModal
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
          usingCheckBeforePost= {this.usingCheckBeforePost}
          onToPublishClick={this.props.onToPublishClick}
					typs={this.state.typs}
        />:""}
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
					starttimes={this.state.starttimes}
					starttimesend={this.state.starttimesend}
					typs={this.state.typs}
				/>:""}
        { showActionButton && <a href="javascript:void(0)" className="color-grey-9" onClick={this.homeworkstart}>{ showdatatypes   ? "立即发布" : "立即截止" }</a> }
      </div>
    )
  }
}
export default PublishRightnow;