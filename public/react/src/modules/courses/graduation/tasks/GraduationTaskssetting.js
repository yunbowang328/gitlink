import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { WordsBtn,getRandomcode ,handleDateString} from 'educoder';
import axios from 'axios';
import Modals from '../../../modals/Modals';
import DownloadMessageysl from "../../../modals/DownloadMessageysl";

import CoursesListType from '../../coursesPublic/CoursesListType';
import HomeworkModal from "../../coursesPublic/HomeworkModal";
import moment from 'moment';
const { Option} = Select;
const RadioGroup = Radio.Group;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDateTime() {
  return {
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
  };
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}

//毕设任务设置
class GraduationTaskssettingapp extends Component{

  constructor(props){
    super(props)
    this.state={
      coursename:"",
      coursesearch:"",
      title_num:20,
      title_value:"",
      fileList: [],
      contents: [{val:"",id:1}],
      type:true,
      taskname:"",
      taskid:"",
      settingdata:undefined,
      baseonproject:false,
      minnum:2,
      maxnum:5,
      firstTimes:true,
      publish_time:null,
      end_time:null,
      allowlate:1,
      latepenalty:undefined,
      latetime:null,
      crosscomment:undefined,
      commentstatus:1,
      commentnum:0,
      opergrade:false,
      operworks:false,
      commenttime:undefined,
      graduationgroups:[],
      assigngroups:[],
      selecassigngroups:[],
      hasproject:false,
      hascommit:false,
      minnums:0,
      max_nums:0,
      minnumstype:false,
      maxnumstype:false,
      edittype:false,
      task_type:false,
      starttimetype:false,
      endtimetype:false,
      flagPageEdit:false,
      visible:false,
			starttime:undefined,
			DownloadType:false,
			DownloadMessageval:undefined,
			commentstatustype:undefined,
			commenttimeone:undefined
    }
  }

  reInit=()=>{
    this.getsettings();
  }

   getsettings=()=>{
     let task_Id=this.props.match.params.task_Id;

     let url ="/graduation_tasks/"+task_Id+"/settings.json"
     axios.get(url).then((result)=> {
       if(result.status===200){
       let assigngroups = []
       for (var list of result.data.graduation_groups) {
         assigngroups.push({
           assign_group_id: list.assign_group_id,
           select_name: list.select_name,
         })
       }
      let starttype=false;
      let endtype=false;
        if(moment(result.data.publish_time)<=moment()){
          starttype=true
        }
       if(moment(result.data.end_time)<=moment()){
         endtype=true
       }

       this.setState({
         starttimetype:starttype,
         endtimetype:endtype,
         settingdata: result.data,
         minnum: result.data.min_num,
         minnums: result.data.min_num,
         maxnum: result.data.max_num,
         max_nums: result.data.max_num,
         task_type: result.data.task_type,
         baseonproject: result.data.base_on_project,
         firstTimes:!result.data.publish_time && !result.data.end_time,
         publish_time:result.data.publish_time===null||result.data.publish_time=== ""?"":moment(moment(handleDateString(result.data.publish_time))).format("YYYY-MM-DD HH:mm"),
         end_time:result.data.end_time===null||result.data.end_time=== ""?"":moment(moment(handleDateString(result.data.end_time))).format("YYYY-MM-DD HH:mm"),
         allowlate: result.data.allow_late,
         latepenalty: result.data.late_penalty,
         latetime:result.data.late_time===null||result.data.late_time=== ""?"":moment(moment(handleDateString(result.data.late_time))).format("YYYY-MM-DD HH:mm"),
         crosscomment: result.data.cross_comment,
         taskid: result.data.id,
         taskname: result.data.task_name,
         coursename: result.data.course_name,
         commentstatus: result.data.comment_status,
				 commentstatustype:result.data.status,
         commentnum: result.data.comment_num,
         operworks: result.data.open_work,
         opergrade: result.data.open_score,
         graduationgroups: result.data.graduation_groups,
         hasproject: result.data.has_project,
         hascommit: result.data.has_commit,
         assigngroups: assigngroups,
         commenttime:result.data.comment_time===null||result.data.comment_time=== ""?"":moment(moment(handleDateString(result.data.comment_time))).format("YYYY-MM-DD HH:mm"),
         task_status: result.data.task_status
       })
				 this.props.setend_time(result.data.end_time)
     }

     }).catch((error)=>{
       console.log(error)
     })
   }


  componentDidMount(){
		let query=this.props.location.search
		const type = query.split('?tab=');
    let id=parseInt(type[1])
    this.getsettings();
		if(this.props.isAdmin()===true&&isNaN(id)){
			this.editSetting()
    }

    let tab = this.props.tab;
    this.props.setTab && this.props.setTab(tab);
    try{
      this.props.triggerRef(this)
    }catch(e){

    }
  }


  baseprojectfun=(e)=>{
      this.setState({
        baseonproject:e.target.checked
      })
  }


  setminnum=(e)=>{

    if(isNaN(parseInt(e.target.value))){
      this.setState({
        minnum:""
      })
    }else if(parseInt(e.target.value)===0) {
      this.setState({
        minnum:1
      })
    }else{
      this.setState({
        minnum:parseInt(e.target.value)
      })
    }

  }

  setmaxnum=(e)=>{
    let {minnum}=this.state;

    if(isNaN(parseInt(e.target.value))){
      this.setState({
        maxnum:""
      })
    }else if(parseInt(e.target.value)===0) {
      this.setState({
        maxnum:parseInt(minnum)+1
      })
    }else{
      if(parseInt(e.target.value)<=parseInt(minnum)){
        this.setState({
          maxnum:minnum+1
        })
      }else{
        this.setState({
          maxnum:parseInt(e.target.value)
        })
      }
    }
  }


  onChangeTimepublish= (date, dateString) => {
    let endtime;
    if(date===null){
      this.setState({
        publish_time:null,
        end_time:null,
        latetime:null
      })
    }else{
      let { firstTimes } = this.state;
      // 判断是否是第一次设置
        this.setState({
          publish_time:moment(moment(handleDateString(dateString))).format("YYYY-MM-DD HH:mm"),
          publishTimetypes:false
        })
      if(firstTimes){
        endtime=	moment(moment(handleDateString(dateString))).add(1, 'months').format("YYYY-MM-DD HH:mm")
        let {allowlate}=this.state;
        this.setState({
          firstTimes:undefined
        })
        if(allowlate===true||allowlate===1){
          this.setState({
            end_time:endtime,
            latetime:moment(moment(handleDateString(endtime))).add(1, 'months').format("YYYY-MM-DD HH:mm"),
          })
        }else{
          this.setState({
            end_time:endtime
          })
        }
      }
    }
  }


  onChangeTimeend= (date, dateString) => {

    if(date===null){
      this.setState({
        end_time:null,
        latetime:null
      })
    }else{
      let { firstTimes } = this.state;
      this.setState({
        end_time:moment(moment(handleDateString(dateString))).format("YYYY-MM-DD HH:mm"),
        endTimetypes:false
      })
      // 判断是否是第一次设置
      if(firstTimes){
        this.setState({
          firstTimes:undefined
        })
        let {allowlate}=this.state;
        if(allowlate===true||allowlate===1){
          this.setState({
            latetime:moment(moment(handleDateString(dateString))).add(1, 'months').format("YYYY-MM-DD HH:mm"),
          })
        }
      }
    }
  }

  onChangeTimelatetime=(date, dateString)=>{
    let {end_time}=this.state;
    if(moment(dateString)>moment(end_time)){
      this.setState({
        latetimetype:false
      })
    }
    this.setState({
      latetime:handleDateString(dateString)
    })
  }

  onChangeTimecommenttime=(date, dateString)=>{
   let{end_time}=this.state;
    if(moment(dateString)>moment(end_time)){
      this.setState({
        commenttimetype:false,
      })
    }

    this.setState({
      commenttime:handleDateString(dateString)
    })

  }


  allowlatefun=(e)=>{
    let {end_time}=this.state;

   if(e.target.checked===true||e.target.checked===1){

      this.setState({
        latepenalty:5,
        allowlate:e.target.checked,
        latetime:end_time===null||end_time === ""?"":moment(moment(handleDateString(end_time))).add(1, 'months').format("YYYY-MM-DD HH:mm"),
      })
   }else{
     this.setState({
       latepenalty:0,
       allowlate:e.target.checked,
       latetime:""
     })
   }
  }

  funlatepenalty=(e)=>{
    let value= parseInt(e.target.value);

    if(isNaN(value)){
      value=0
    }

    this.setState({
      latepenalty:value
    })
  }

  updatesfuncrosscomment=(types,newlatetime,newcommenttime)=>{
  	debugger
		let {endtimetype}=this.state;
		if(types===1){
				this.setState({
					// latetime:newlatetime,
					crosscomment:true,
					commenttime:newlatetime,
					commenttimeone:newlatetime,
				})
		}else{
			if(endtimetype===true){
				this.setState({
					crosscomment:true,
					commenttime:newlatetime,
					commenttimeone:newlatetime,
				})
			}else{
				this.setState({
					// end_time:newlatetime,
					crosscomment:true,
					commenttime:newlatetime,
					commenttimeone:newlatetime,
				})
			}
		}

	}
  funcrosscomment=(e)=>{
		let {latetime,end_time,allowlate,commenttime,commenttimeone}=this.state;
		let commenttimetype=commenttime===null||commenttime==="";

		let newlatetimea=moment(new Date()).add(7, 'days').format("YYYY-MM-DD HH:mm");
		let newcommenttimea=moment(new Date()).format("YYYY-MM-DD HH:mm");

		let newlatetimes=moment(latetime).add(7, 'days').format("YYYY-MM-DD HH:mm");
		let newcommenttimes=moment(latetime).format("YYYY-MM-DD HH:mm");

		let newend_timeb=moment(new Date()).add(7, 'days').format("YYYY-MM-DD HH:mm");
		let newcommenttimeb=moment(new Date()).add(8, 'days').format("YYYY-MM-DD HH:mm");

		let newend_timed=moment(end_time).add(7, 'days').format("YYYY-MM-DD HH:mm");
		let newcommenttimed=moment(end_time).add(8, 'days').format("YYYY-MM-DD HH:mm");

		if(e.target.checked===true){


					if(allowlate===1||allowlate===true){
						if(latetime===null||latetime===""){
							this.updatesfuncrosscomment(1,newlatetimea,newcommenttimea)
						}else{
							this.updatesfuncrosscomment(1,newlatetimes,newcommenttimes)
						}
					}else{
						if(end_time===null||end_time===""){
							this.updatesfuncrosscomment(2,newend_timeb,newcommenttimeb)
						}else{
							this.updatesfuncrosscomment(2,newend_timed,newcommenttimed)
						}
					}

		}else{
			this.setState({
				crosscomment:e.target.checked,
		    commenttime:undefined
			})
		}
  }

  funcommentstatus=(e)=>{
    this.setState({
      commentstatus:parseInt(e.target.value)
    })
  }

  funcoperworks=(e)=>{
    this.setState({
      operworks:e.target.checked
    })
  }

  funcopergrade=(e)=>{
    this.setState({
      opergrade:e.target.checked
    })
  }

  homepublish=(ids,endtime)=>{
    let task_Id=this.props.match.params.task_Id;
    const cid = this.props.match.params.coursesId
    // let url = `/courses/${cid}/graduation_tasks/publish_task.json`;
		let url="/courses/"+cid+"/graduation_tasks/publish_task.json"
    axios.post(url,{
			task_ids:[task_Id],
			group_ids: this.state.course_groupslist,
			end_time:endtime,
    }).then((response)=>{
      if (response.data.status == 0) {
				this.getsettings();
				this.cancelmodel();
				this.setState({
					// Modalstype:true,
					// Modalstopval:resulet.data.message,
					// ModalSave:this.cancelmodel,
					// Loadtype:true
					starttime:undefined,
					course_groupslist:[],
				})
				this.props.showNotification(response.data.message);
      }
    }).catch((error)=>{

    })
  }
	// //跳转道描点的地方
	// scrollToAnchor = (anchorName) => {
	// 	if (anchorName) {
	// 		// 找到锚点
	// 		let anchorElement = document.getElementById(anchorName);
	// 		// 如果对应id的锚点存在，就跳转到锚点
	// 		if(anchorElement) { anchorElement.scrollIntoView(); }
	// 	}
	// }

  saveTaskssetting=()=>{


    let {latepenalty,hascommit,minnums,max_nums,publish_time,end_time,crosscomment,latetime,starttimetype}=this.state;

		if(isNaN(parseInt(this.state.minnum))){
			this.setState({
				numtype:true
			})
			this.scrollToAnchor("publishtimestart");
			return
		}else{
			this.setState({
				numtype:false
			})
		}
		if(isNaN(parseInt(this.state.maxnum))){
			this.setState({
				numtype:true
			})
			this.scrollToAnchor("publishtimestart");
			return
		}else{
			this.setState({
				numtype:false
			})
		}


    if(latepenalty===undefined){
      this.setState({
        latepenaltytype:true,
        latepenaltyvalue:"不能为空"
      })
      return
    }else if(latepenalty===""){
      this.setState({
        latepenaltytype:true,
        latepenaltyvalue:"不能为空"
      })
      return
    }else{
      this.setState({
        latepenaltytype:false
      })
    }


		if(starttimetype===false) {
			if (moment(publish_time) <= moment()) {
				this.setState({
					publishTimetypes: true,
					publishTimetypesval: "发布时间不能早于当前时间",
				})
				return
			} else {
				this.setState({
					publishTimetypes: false
				})
			}
		}


    if(moment(end_time)<=moment(publish_time)){
      this.setState({
        endTimetypes:true,
        endTimetypesval:"截止时间必须晚于发布时间"
      })
      return
    }else{
      this.setState({
        endTimetypes:false
      })
    }
		debugger
    if(moment(latetime)<=moment(publish_time)){

    	debugger
      this.setState({
        latetimetype:true,
        latetimetypeval:"结束时间必须晚于发布时间"
      })
      return
    }else if(moment(latetime)<=moment(end_time)){
			debugger
      this.setState({
        latetimetype:true,
        latetimetypeval:"结束时间必须晚于截止时间"
      })
      return
    }else{
			debugger
      this.setState({
        latetimetype:false
      })
    }
		debugger

    if(crosscomment===true){
      if(this.state.commenttime===undefined||this.state.commenttime===null||this.state.commenttime===""){
        this.setState({
          commenttimetype:true,
          commenttimevalue:"不能为空",
        })
        return
      }else{
        this.setState({
          commenttimetype:false
        })
      }
      if(moment(this.state.commenttime)<=moment(publish_time)){
        this.setState({
          commenttimetype:true,
          commenttimevalue:"开始时间不能小于发布时间",
        })
        return
      }else{
        this.setState({
          commenttimetype:false
        })
      }

      if(moment(this.state.commenttime)<=moment(end_time)){
        this.setState({
          commenttimetype:true,
          commenttimevalue:"开始时间不能小于截止时间",
        })
        return
      }else{
        this.setState({
          commenttimetype:false
        })
      }

    }

		if(starttimetype===false){
			if(publish_time===null||publish_time=== ""){
				this.setState({
					publishTimetypes:true,
					publishTimetypesval:"发布时间不能为空",
				})
				this.scrollToAnchor("publishtimestart");
				return
			}
		}




		if(end_time===null||end_time=== ""){
			this.setState({
				endTimetypes:true,
				endTimetypesval:"截止时间不能为空"
			})
			this.scrollToAnchor("publishtimeend");
			return
		}





    if(this.props.isAdmin()) {

      this.setState({
        edittype: true
      })

      if (hascommit === true) {
        if (parseInt(this.state.minnum) > parseInt(minnums)) {
          this.setState({
            minnumstype: true
          })
          return
        }else{
          this.setState({
            minnumstype:false
          })
        }
        if (parseInt(this.state.maxnum) < parseInt(max_nums)) {
          this.setState({
            maxnumstype: true
          })
          return
        }else{
          this.setState({
            maxnumstype:false
          })
        }
      }

      if (this.state.end_time === "" || this.state.end_time === null) {
        this.setState({
          end_timetype: true
        })
        return
      }else{
        this.setState({
          end_timetype:false
        })
      }


      if(publish_time!=null){
        this.sethomepublish();

      }

    }
  }


  sethomepublish=()=>{
    let {assigngroups,starttime}=this.state;
    let assigngroupslist=[];
    for(var list of assigngroups){
      assigngroupslist.push(list.assign_group_id)
    }

    let {allowlate,baseonproject,crosscomment,opergrade,operworks,commentstatus,latepenalty,end_time,latetime}=this.state;

    let task_Id=this.props.match.params.task_Id;


     let url="/graduation_tasks/"+task_Id+"/update_settings.json";
     axios.post(url,{
       min_num: this.state.minnum,
       max_num: this.state.maxnum,
       base_on_project:baseonproject===true?1:0,
       publish_time:this.state.publish_time===null||this.state.publish_time=== ""?"":this.state.publish_time,
       end_time: this.state.end_time===null||this.state.end_time=== ""?this.props.getNowFormatDates(2,1):this.state.end_time,
       allow_late:allowlate===true||allowlate===1?1:undefined,
       late_time: this.state.latetime===null||this.state.latetime=== ""?this.props.getNowFormatDates(3,1):this.state.latetime,
       late_penalty:  latepenalty,
       cross_comment: crosscomment===true?1:undefined,
       comment_status: crosscomment===true?this.state.commentstatus===0?2:this.state.commentstatus===1?2:this.state.commentstatus:undefined,
       comment_num:  commentstatus===4?this.state.commentnum:undefined,
       comment_time: crosscomment===true?this.state.commenttime:undefined,
       comment_group:  commentstatus===4?assigngroupslist:undefined,
       open_work: opergrade===true?1:undefined,
       open_score:  operworks===true?1:undefined,
       group_ids:this.state.course_groupslist
     }).then((resulet)=>{

       if(resulet.status===200){

         if(resulet.data.status===0){
					 this.getsettings();
           this.cancelmodel();
					 this.isgoback()
           this.setState({
             // Modalstype:true,
             // Modalstopval:resulet.data.message,
             // ModalSave:this.cancelmodel,
             // Loadtype:true
						 starttime:undefined,
             course_groupslist:[],
           })
           this.props.showNotification(resulet.data.message);
          //调用父组件方法，刷新按钮
          this.props.getdatas();
         }
       }
     }).catch((error)=>{
       console.log(error)
     })
  }


  selectassigngroups=(e,index)=>{

   let {assigngroups}=this.state;
    let newassigngroups=assigngroups;
     for(var i=0; i<newassigngroups.length; i++){
       if(i===parseInt(index.key)){
         newassigngroups[i].assign_group_id=index.props.id;
         newassigngroups[i].select_name=index.props.value;
       }
     }

    //
    // console.log(assigngroups)
    // console.log(newassigngroups)
    // assigngroups.push({
    //   assign_group_id:list.assign_group_id,
    //   select_name:list.select_name,
    // })
    this.setState({
      assigngroups:newassigngroups,
    })
  }

  isgoback=()=>{
		this.getsettings();
    this.setState({
      flagPageEdit: false,
    })
  }
  cancelmodel=()=>{

    this.setState({
      Modalstype:false,
      Loadtype:false,
      visible:false,
      visibles:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
			starttime:undefined
    })

  }

  coursetaskend=()=>{

    const coursesId = this.props.match.params.coursesId;
    const task_Id = this.props.match.params.task_Id;

    let url = `/courses/${coursesId}/graduation_tasks/end_task.json`;
    axios.post(url,{
      task_ids:[task_Id],
      group_ids:this.state.course_groupslist
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
				this.getsettings();
        this.props.showNotification(response.data.message);

        this.cancelmodel();
        this.setState({
           course_groupslist:[],
          // Modalstopval:resulet.data.message,
          // ModalSave:this.cancelmodel,
          // Loadtype:true
        })


      }
    }).catch((error)=>{

    })


  }



  setcommentnum=(e)=>{
    this.setState({
      commentnum:parseInt(e.target.value)
    })

  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
    }
  }

  skipTop=()=>{
    this.scrollToAnchor("starttime")
    this.cancelmodel()
  }

  getcourse_groupslist=(id)=>{
    this.setState({
      course_groupslist:id
    })
  }

  //编辑
  editSetting = () => {

      if (this.state.settingdata&&this.state.settingdata.is_end === true) {
        // this.setState({
        //   modalsType: true,
        //   modalsTopval: "课堂已结束不能再修改!",
        //   loadtype: true,
        //   modalSave: this.cancelBox
        // })
        this.props.showNotification("课堂已结束不能再修改!");
      } else {

        this.setState({
          flagPageEdit: true,
        })
      }


  }
	/// 确认是否下载
	confirmysl(url,urls){

		axios.get(url + '?export=true' ).then((response) => {
			if(response === undefined){
				return
			}
			if(response.data.status&&response.data.status===-1){

			}else if(response.data.status&&response.data.status===-2){
				if(response.data.message === "100"){
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType:true,
						DownloadMessageval:100
					})
				}else {
					//因附件资料超过500M
					this.setState({
						DownloadType:true,
						DownloadMessageval:500
					})
				}
			}else {

       // this.props.showNotification(`正在下载中`);
        this.props.slowDownload(getRandomcode(url))
        // window.open(getRandomcode("/api" + url), '_blank');
				// this.props.showNotification(`正在下载中`);
				// window.open("/api"+url, '_blank');
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	Downloadcal=()=> {
		this.setState({
			DownloadType: false,
			DownloadMessageval: undefined
		})
	}
  render(){
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD HH:mm';

    let {coursename,taskname,settingdata,baseonproject,Modalstype,Modalstopval,operworks,opergrade,graduationgroups,Loadtype,task_type,end_timetype,
      ModalCancel,ModalSave,publish_time,end_time,allowlate,latepenalty,latetime,crosscomment,commentstatus,commentnum,commenttime,numtype,
      minnum,maxnum,modalname,task_status,
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
      course_groups,hasproject,hascommit,minnumstype,maxnumstype,
      latepenaltytype,
      latepenaltyvalue,
      latetimetype,
      starttimetype,
      endtimetype,
      commenttimetype,
      commenttimevalue,
      flagPageEdit,
			commentstatustype
    } =this.state;

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let task_Id=this.props.match.params.task_Id;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    //
    // console.log(moment(publish_time))
     console.log(commenttime)

    return(
      <React.Fragment>

        { settingdata && settingdata ? <div>
          {/*提示*/}
          <Modals
            modalsType={Modalstype}
            modalsTopval={Modalstopval}
            modalCancel={ModalCancel}
            modalSave={ModalSave}
            loadtype={Loadtype}
          />
					<DownloadMessageysl
						{...this.props}
						value={this.state.DownloadMessageval}
						modalCancel={this.Downloadcal}
						modalsType={this.state.DownloadType}

					/>

					<HomeworkModal
						starttimes={this.state.starttimes}
						typs={this.state.typs}
            modalname={modalname}
            visible={this.state.visibles}
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
            modaltype={this.state.modaltype}
            getcourse_groupslist={(id) => this.getcourse_groupslist(id)}
          />

          <style>
            {`
            .ant-input{
              height:40px;
            }
            `
          }</style>
              <Form  id={"starttime"}>
                {
                  !flagPageEdit && this.props.isAdmin() === true ?
                    <a className="mt20 mr40 fr white-btn edu-blueline-btn lineh-24" onClick={this.editSetting}>
											编辑设置
											{/*<Tooltip title="编辑"><i*/}
                      {/*className="iconfont icon-bianjidaibeijing font-20 color-green "></i></Tooltip>*/}
                    </a>
                    : ""
                }
                {/*内容*/}
                {task_type===2?<div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl30" >
                    <div className={"xingrequired font-16 color-dark h20 mb20"}>分组设置 <span className={"font-14 color-grey-c"}></span></div>
                    <div className={"mb30 h20 ml40"}>
                      <Input className={numtype===true?"noticeTip mr20":"mr20"} style={{ width:"100px" }} value={minnum}  onInput={this.setminnum}  disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}/>
                      <span className="mr20">~</span>
                      <Input  className={numtype===true?"noticeTip mr20":"mr20"} style={{width:"100px" }} value={maxnum} onInput={this.setmaxnum} disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}/>
                      <span className="mr10">人</span>
                      <span className={"font-14 color-grey-c"}>（学生提交作品时需要关联同组成员，组内成员作品共享）</span>
                    </div>
                   {minnumstype===true?<div className={"color-red ml40"}>已有提交作品，最小人数不能变大</div>:""}
                   {maxnumstype===true?<div className={"color-red ml40"}>已有提交作品，最大人数不能变小</div>:""}
                   {numtype===true?<div className={"color-red ml40"}>不能为空</div>:""}
                    <div>
                      <Tooltip placement="bottom" title={hascommit===true?"已有关联项目或作品，不能修改":""}>
                          <Checkbox className="ml40 " checked={baseonproject} disabled={this.props.isAdmin()===true?hascommit===true||hasproject===true?true:flagPageEdit===true?false:true:true}  onChange={this.baseprojectfun}>基于项目实施</Checkbox>
                      </Tooltip>
                      <span className={"font-14 color-grey-c"}>（选中，则必须在本平台创建项目，项目管理员可以提交作品；不选中，无需在平台创建项目，任意小组成员均可以提交作品）</span>
                    </div>
                </div>:""}


                <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36"  >

                  <div className={" font-16 color-dark h20 mb20"} >发布设置 </div>



                  <div className={"ml30"} >
                    <span>发布时间：</span>
                    <Tooltip placement="bottom" title={this.props.isAdmin()===true?starttimetype===true?"时间已过，不能再修改":"":""}>
                    <span>
                       <DatePicker
                         showToday={false}
                         dropdownClassName="hideDisable"
                         showTime={{ format: 'HH:mm' }}
                         locale={locale}
                         format={dateFormat}
                         placeholder="请选择发布时间"
                         id={"startime"}
                         width={"210px"}
                         value={publish_time===null||publish_time===""?"":moment(publish_time, dateFormat)}
                         onChange={this.onChangeTimepublish}
                         disabledTime={disabledDateTime}
												 disabledDate={disabledDate}
                         disabled={this.props.isAdmin()===true?starttimetype===true?true:flagPageEdit===true?false:true:true}
                         className={ this.state.publishTimetypes===true?"noticeTip":""}
                       />
                    </span>
                    </Tooltip>
                    <span className={"font-14 color-grey-c ml10"}>（学生收到作业的时间）</span>
                  </div>

                  <style>
                    {
                      `
                      .ml102{
                          margin-left: 102px;
                      }
                      `
                    }
                  </style>
                  {this.state.publishTimetypes===true?<div className={"color-red ml102"}>
                    {this.state.publishTimetypesval}
                  </div>:""}

                  <div className={"mt10 ml30"} >
                    <span>截止时间：</span>
                    <Tooltip placement="bottom" title={this.props.isAdmin()===true?endtimetype===true?"时间已过，不能再修改":"":""}>
                    <span>
                    <DatePicker
                      showToday={false}
                      dropdownClassName="hideDisable"
                      showTime={{ format: 'HH:mm' }}
                      locale={locale}
                      format={dateFormat}
                      placeholder="请选择截止时间"
                      id={"endTime"}
                      width={"210px"}
                      value={end_time===null||end_time===""?"":moment(end_time, dateFormat)}
                      onChange={this.onChangeTimeend}
                      disabledTime={disabledDateTime}
											disabledDate={disabledDate}
                      // disabled={this.props.isSuperAdmin()===true?flagPageEdit===true?false:true:this.props.isAdmin()===true?endtimetype===true?true:flagPageEdit===true?false:true:true}
											disabled={this.props.isAdmin()===true?endtimetype===true?true:flagPageEdit===true?false:true:true}
                      className={this.state.endTimetypes===true||end_timetype===true?"noticeTip":""}
                    />
                    </span>
                    </Tooltip>
                    <span className={"font-14 color-grey-c ml10"}>（学生“按时”提交作品的时间截点）</span>
                  </div>
                  <style>
                    {
                      `
                      .ml102{
                          margin-left: 102px;
                      }
                      `
                    }
                  </style>
                  {this.state.endTimetypes===true?<div className={"color-red ml102"}>{this.state.endTimetypesval}
                  </div>:""}
                  {end_timetype===true?<div className={"color-red ml40"}>不能为空</div>:""}


                </div>

                <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36">
                  <div className={" font-16 color-dark h20 mb20"}>补交设置 </div>
										<Checkbox style={radioStyle} value={"允许补交"} checked={allowlate} className="font-16 "
															onChange={this.allowlatefun} disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}>开启补交 <span
											className={"font-14  ml10 color-grey-c"}
											style={{textAlign: "left", fontSize: "14px"}}>（选中，则允许学生延时提交作品）</span></Checkbox>

                      <div className={"h21 mb30 ml30 mt20"}>
                        <span>迟交扣分：</span>
                        <Input  className="mr10" style={{width:"100px" }} value={latepenalty} disabled={this.props.isAdmin()===true?allowlate===true||allowlate===1?flagPageEdit===true?false:true:true:true} onInput={this.funlatepenalty}/>
                        <span className={"font-14 color-grey-c "}>（延时提交作品时，学生成绩将被扣减的分值）</span>
                        {latepenaltytype===true?<div className={"color-red ml40"}>{latepenaltyvalue}</div>:""}
                      </div>

                      <div className={"h20 mb30 ml30"}>
                        <span>结束时间：</span>
                        <DatePicker
                            showToday={false}
                          dropdownClassName="hideDisable"
                          showTime={{ format: 'HH:mm' }}
                          locale={locale}
                          format={dateFormat}
                          placeholder="请选择结束时间"
                          id={"enTime"}
                          width={"210px"}
                          value={latetime===null||latetime===""?"":moment(latetime, dateFormat)}
                          disabledTime={disabledDateTime}
												  disabledDate={disabledDate}
                          onChange={this.onChangeTimelatetime}
                          disabled={this.props.isAdmin()===true?allowlate===true||allowlate===1?flagPageEdit===true?false:true:true:true}
                          className={ latetimetype===true?"noticeTip":""}
                        />
                        <span className={"font-14 color-grey-c ml10"}>（学生“延时”提交作品的时间截点）</span>
                        <style>
                          {
                            `
                            .ml70{
                                margin-left: 71px;
                            }
                            `
                          }
                        </style>
                        {latetimetype===true?<div className={"color-red ml70"}>{this.state.latetimetypeval}</div>:""}
                      </div>

                </div>


                <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36">
                  <div className={" font-16 color-dark h20 mb20"}>评分设置 </div>
                  <div className={"font-16 h20 mb20"}>最终成绩组成 <span className={"font-14 color-grey-c"}>（取各教师最终评分的平均分）</span></div>
									<Tooltip placement="bottomLeft" title={this.props.isAdmin()===true?flagPageEdit===true?commentstatustype===3?"正在交叉评阅，不可取消":"":"":""}>
										<Checkbox className="ml40 font-16" checked={crosscomment} onChange={this.funcrosscomment}
															disabled={this.props.isAdmin()===true?flagPageEdit===true?commentstatustype===3?true:false:true:true} >启用交叉评阅 <span className={"font-14 color-grey-c"}>（给老师分配其他指导老师的学生作品）</span>
										</Checkbox>
									</Tooltip>
                  {crosscomment===true?<div>
                  <div className={"h20 mb30 ml30 mt20 ml87"}>
                    <span>开始时间：</span>
                    <DatePicker
                        showToday={false}
                      dropdownClassName="hideDisable"
                      showTime={{ format: 'HH:mm' }}
                      locale={locale}
                      format={dateFormat}
                      placeholder="请选择发布时间"
                      id={"endTime"}
                      width={"210px"}
                      value={commenttime===null||commenttime=== ""?"":moment(commenttime, dateFormat)}
                      disabledTime={disabledDateTime}
										  disabledDate={disabledDate}
                      onChange={this.onChangeTimecommenttime}
                      disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}
                      className={ commenttimetype===true?"noticeTip":""}
                    />
                    <span className={"font-14 color-grey-c ml10"}>（交叉评阅开始时间之前提交的作品，参与交叉评阅）</span>
                    <style>
                      {
                        `
                        .ml70{
                         margin-left:70px;
                        }
                        `
                      }
                    </style>
                    {crosscomment===true&&commenttimetype===true?<div className={"color-red ml70"}>{commenttimevalue}</div>:""}
                  </div>

                  {/* <div className={"mb20 ml30 ml87 ml87"}>
                    <span className={"fl mt6"}>评阅方式：</span>

                    <span>
                        <RadioGroup onChange={this.funcommentstatus} disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true} value={crosscomment===false?undefined:commentstatus===0?2:commentstatus===2?2:commentstatus===4?4:undefined}>

                          <Radio style={radioStyle} value={2}>指导老师手动分配   <span className={"font-14 color-grey-c ml10"}>（由指导老师在作品列表中，手动选择每个作品被分配的评阅老师）</span></Radio>
                          <Radio style={radioStyle} value={4}>答辩组间老师互评   <span className={"font-14 color-grey-c ml10"}>（由系统按照设置在答辩组之间自动分配:
														<a href={"/courses/"+courseId+"/teachers"} target="_blank">
                            <span className={"color-blue"}>答辩组设置</span></a>
                          </span></Radio>

                        </RadioGroup>
                    </span>

                  </div> */}


                 {/* <div style={{display:crosscomment===false?"none":commentstatus===0?"none":commentstatus===2?"none":commentstatus===4?"":"none"}}>
                      <div className={"h20 mb30 ml30 ml87"}>
                        <span>评阅数：</span>
                        <Input  className="mr20" style={{width:"200px" }} value={commentnum} disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true} onInput={this.setcommentnum} />
                        <span className={"font-14 color-grey-c "}>（单个作品将被分配互评的次数）</span>
                      </div>

                     {graduationgroups.map((item,key)=>{
                       return(
                           <div className={"clearfix"} key={key}>
                             <div className={"h20 mb30 ml30 ml87 fl mt20"} style={{width:'140px'}}>
                                <span id={item.group_id} key={key}>{item.group_name}（{item.member_count} 个教师）</span>
                             </div>

                             <div className={"h20 mb30 fl mt20"} style={{width:'10px'}}>
                                <Icon className={" mr10"} type="arrow-right" key={key}/>
                             </div>

                             <div className={"h20 mb30 fl ml25 mt14"} style={{width:'100px'}}>
                               <Select style={{ width: 120 }}
                                       defaultValue={item.select_name}
                                       disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}
                                       onChange={(e,index)=>this.selectassigngroups(e,index)}>
                               {graduationgroups.map((list,index)=>{
                                 if(index!=key){
                                   return(
                                    <Option value={list.group_name} id={list.group_id} name={list.member_count} key={key}>{list.group_name}</Option>
                                   )
                                 }
                               })}
                               </Select>

                             </div>
                           </div>
                           )
                         })}

                   </div> */}
                  </div>:""}


                  <div className={"both"}></div>
                </div>

                {/*open_score: true*/}
                {/*open_work: true*/}
                <div className="stud-class-set pd20 edu-back-white pl36">
                  <div className={" font-16 color-dark h20 mb20"}>公开设置 </div>

                  <div  className={"mb20"}>
                    <Checkbox className="ml40" checked={operworks} onChange={this.funcoperworks} disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}>公开作品</Checkbox>
                    <span className={"font-14 color-grey-c"}>（选中，则在作业截止/补交结束时间之后，已提交作品的学生可以查看其它学生的作品，否则只能查看自己的作品）</span>
                  </div>

                  <div>
                    <Checkbox className="ml40" checked={opergrade} onChange={this.funcopergrade} disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}>公开成绩</Checkbox>
                    <span className={"font-14 color-grey-c"}>（选中，则在作业截止/补交结束时间之后，已提交作品的学生可以查看其它学生的成绩，否则只能查看自己的成绩）</span>
                  </div>

                </div>

              </Form>
              {this.props.isAdmin()===true?flagPageEdit===true?<div className="clearfix mt30 mb30">
                <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20"
                 onClick={this.saveTaskssetting}
                >提交</Button>
                {/*<Link to={"/courses/"+courseId+"/graduation_tasks/"+position+"/"+category_id+coursesearch} className="defalutCancelbtn fl">取消</Link>*/}
                <a onClick={this.isgoback} className="defalutCancelbtn fl">取消</a>
              </div>:"":""}

        </div>:""}
      </React.Fragment>

    )
  }
}

const GraduationTaskssetting = Form.create({ name: 'coursesNew' })(GraduationTaskssettingapp);
export default GraduationTaskssetting;
// {/*<RadioGroup onChange={this.allowlatefun} value={allowlate===true||allowlate===1?1:2}   disabled={this.props.isAdmin()===true?flagPageEdit===true?false:true:true}>*/}
//
// {/*  <Radio style={radioStyle} value={1}>开启补交<span className={"font-14 color-grey-c "}>（选中，则允许学生延时提交作品）</span></Radio>*/}
// {/*  <Radio style={radioStyle} value={2}>禁止补交</Radio>*/}
//
// {/*</RadioGroup>*/}
