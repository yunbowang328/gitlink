import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { WordsBtn, handleDateString, getNextHalfHourOfMoment, PopInstruction, ConditionToolTip, on, off } from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
import CoursesListType from '../coursesPublic/CoursesListType';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import AccessoryModal from "../coursesPublic/AccessoryModal";

import WorkDetailPageHeader from './common/WorkDetailPageHeader'
import PublishRightnow from './PublishRightnow'
import PollDetailTabForthRules from '../poll/PollDetailTabForthRules'
import { STATUS_UN_PUBLISH } from './common'
import moment from 'moment';
import '../css/Courses.css'
const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype=true;
const $ = window.$;
const Search = Input.Search;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD HH:mm';

function scrollTo(className) {
  $("html").animate({ scrollTop: $(`${className}`).offset().top - 400 })
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
    // disabledSeconds: () => [55, 56],
  };
}
function disabledDateFunc(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}
// 类似页面 http://localhost:3007/courses/1309/graduation/graduation_tasks/48/76/setting
//普通作业分组作业设置
class CommonWorkSetting extends Component{

  constructor(props){
    super(props)
    this.publishModal = React.createRef();
    this.endModal = React.createRef();
    this.fetchMoment = moment()

    this.state={
      unified_setting: true,
      rules: [],
      course_name:"",
      homework_name:"",
      publish_time:null,
      end_time:null,

      homework_status: [],
      anonymous_comment: false,
      ta_mode: 1,
      evaluation_num: 3,
      absence_penalty: 2,
      appeal_penalty: 2,

      te_proportion: 50,
      ta_proportion: 30,
      st_proportion: 20,

      startEditFlag: false,
    }
  }

   fetchData=()=>{
     let workId=this.props.match.params.workId;
    const isAdmin = this.props.isAdmin()
    const url = `/homework_commons/${workId}/settings.json`
     axios.get(url).then((result)=> {
      if (result.data.course_id) {
        // let assigngroups = []
        // for (var list of result.data.graduation_groups) {
        //   assigngroups.push({
        //     assign_group_id: list.assign_group_id,
        //     select_name: list.select_name,
        //   })
        // }

      // let starttype=false;
      // let endtype=false;
      // if(Date.parse(result.data.publish_time)<Date.parse(new Date())){
      //   starttype=true
      // }
      // if(Date.parse(result.data.end_time)<Date.parse(new Date())){
      //   endtype=true
      // }

        //
        let disable_unified_setting = false

        let rules = []
        if (result.data.unified_setting == false) {
          rules = result.data.group_settings.filter(item => item.publish_time).map(item => {

            if (disable_unified_setting == false && moment(item.publish_time) < moment()) {
              // 已经有规则发不过了，不能修改统一设置
              disable_unified_setting = true
            }
            return {
              course_group_id:[item.group_id],
              course_group_name:[item.group_name],
              publish_time:item.publish_time,
              end_time: item.end_time,
              publish_flag:"",
              end_flag:"",
              class_flag:"",
              course_search:"",
              poll_status:0,
              e_timeflag: !(moment(item.end_time) > moment() && isAdmin) ,
              p_timeflag: !(moment(item.publish_time) > moment() && isAdmin),
            }
          })
        } else if (result.data.publish_time && moment(result.data.publish_time) < moment()) {
          disable_unified_setting = true
        }
        this.fetchMoment = moment()
        this.setState({
          // starttimetype:starttype,
          // endtimetype:endtype,
          disable_unified_setting,
          ...result.data,
          init_publish_time: result.data.publish_time,
          init_end_time: result.data.end_time,
          init_late_time: result.data.late_time,
          init_evaluation_start: result.data.evaluation_start,
          init_evaluation_end: result.data.evaluation_end,
          init_appeal_time: result.data.appeal_time,

          rules,
          ta_proportion: result.data.ta_proportion * 100,
          te_proportion: result.data.te_proportion * 100,
          st_proportion: result.data.st_proportion * 100,

        })
        this.props.initWorkDetailCommonState && this.props.initWorkDetailCommonState( Object.assign({...result.data}, {
          moduleName: '设置'
        }))
      }

     }).catch((error)=>{
       console.log(error)
     })
   }


  componentDidMount(){

    this.fetchData();
    try {
      this.props.triggerRef(this);
    }catch (e) {

    }
    on('commonwork_fetch_all', this.fetchAllListener)


		if(this.props.isAdmin()===true){
			 this.setState({startEditFlag: true})
		}
	}
  componentWillUnmount() {
    off('commonwork_fetch_all', this.fetchAllListener)
  }
  fetchAllListener = () => {
    this.fetchData()
  }


  base_on_project_change=(e)=>{
      this.setState({
        base_on_project:e.target.checked
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

      // console.log('startValue', dateString);
      this.setState({
        publish_time: handleDateString(dateString),
      })
      let endTime = null;
      if (!this.state.end_time && date) {
        endTime = date.add(1, 'months').add(1, 'hours').minutes(0)
        this.setState({
          end_time: endTime.format(dateFormat)
        })
      }
      if (this.state.allow_late && !this.state.late_time && endTime) {
        this.setState({
          late_time: endTime.add(1, 'months').format(dateFormat)
        })
      }
  }

  onChangeTimeend= (date, dateString) => {
    // console.log('startValue',dateString);

    this.setState({
      end_time: handleDateString(dateString),
    })

  }

  onChangeTimelatetime=(date, dateString)=>{

    this.setState({
      late_time: handleDateString(dateString)
    })
  }
  on_unified_setting = (e) => {
    const checked = e.target.checked;
    this.setState({
      unified_setting: checked
    })
  }
  // 启用匿评
  anonymous_comment_change = (e) => {
    const checked = e.target.checked;
    const currentEndTime = this._getCurrentEndTime()
    let evaluation_start, evaluation_end, evaluation_num = 0, absence_penalty = 0;
    if (checked) {
      if (this.state.allow_late && this.state.late_time) {
        evaluation_start = moment(this.state.late_time).add(14, 'days').format(dateFormat)
        evaluation_end = moment(this.state.late_time).add(28, 'days').format(dateFormat)
      } else if (currentEndTime) {
        evaluation_start = moment(currentEndTime).add(14, 'days').format(dateFormat)
        evaluation_end = moment(currentEndTime).add(28, 'days').format(dateFormat)
      }
      if (!this.state.evaluation_num) {
        evaluation_num = 3
      }
      if (!this.state.absence_penalty) {
        absence_penalty = 2
      }
    } else {
      evaluation_start = null
      evaluation_end = null
      evaluation_num = 0
      absence_penalty = 0
    }
    this.setState({
      evaluation_start,
      evaluation_end,
      evaluation_num,
      absence_penalty,
      anonymous_comment: checked,
      te_proportion: checked ? 50 : 70,
      ta_proportion: checked ? 30 : 30,
      st_proportion: checked ? 20 : 0,
    })
  }
  onChangeEvaluationStart = (date, dateString) => {
    this.setState({
      evaluation_start: handleDateString(dateString)
    })
  }
  onChangeEvaluationEnd = (date, dateString) => {
    this.setState({
      evaluation_end: handleDateString(dateString)
    })
  }

  evaluation_num_change = (e) => {
    let value= e.target.value;
    this.setState({
      evaluation_num:value
    })
  }
  absence_penalty_change = (e) => {
    let value= e.target.value;
    this.setState({
      absence_penalty:value
    })
  }
  // 启用匿评申诉
  anonymous_appeal_change = (e) => {
    const { evaluation_end } = this.state;
    const anonymous_appeal = e.target.checked
    let appeal_time, appeal_penalty = this.state.appeal_penalty
    const currentEndTime = this._getCurrentEndTime()

    if (anonymous_appeal) {
      appeal_penalty = 2
      if (this.state.allow_late && this.state.late_time) {
        appeal_time = moment(this.state.late_time).add(5 * 7, 'days').format(dateFormat)
      } else if (currentEndTime) {
        appeal_time = moment(currentEndTime).add(5 * 7, 'days').format(dateFormat)
      }
    } else {
      appeal_time = null;
    }
    this.setState({
      appeal_time,
      appeal_penalty,
      anonymous_appeal,
    })
  }
  appeal_time_change = (date, dateString) => {
    this.setState({
      appeal_time: handleDateString(dateString)
    })
  }
  appeal_penalty_change = (e) => {
    let value= e.target.value;
    this.setState({
      appeal_penalty: value
    })
  }
  ta_mode_change = (e) => {
    this.setState({
      ta_mode: e.target.value
    })
  }
  te_proportion_change = (e) => {
    this.setState({
      te_proportion: e.target.value
    })
  }
  ta_proportion_change = (e) => {
    this.setState({
      ta_proportion: e.target.value
    })
  }
  st_proportion_change = (e) => {
    this.setState({
      st_proportion: e.target.value
    })
  }
  final_mode_change = (e) => {
    this.setState({
      final_mode: e.target.value
    })
  }

  work_public_change = (e) => {
    this.setState({
      work_public: e.target.checked
    })
  }
  score_open_change = (e) => {
    this.setState({
      score_open: e.target.checked
    })
  }
  answer_public_change = (e) => {
    this.setState({
      answer_public: e.target.checked
    })
  }
  // 补交设置 允许补交
  allow_late_change=(e)=>{
    // console.log(e.target.checked );
    this.setState({
      allow_late: e.target.checked
    })
    if (e.target.checked) {
      this.setState({
        late_penalty: 5
      })
      const currentEndTime = this._getCurrentEndTime();
      if (currentEndTime && !this.state.late_time) {
        this.setState({
          late_time: moment(handleDateString(currentEndTime)).add(1, 'months').format(dateFormat)
        })
      }
    } else {
      this.setState({
        late_time: null
      })
    }
  }

  late_penalty_change=(e)=>{
    let value= parseInt(e.target.value);

    if(isNaN(value)){
      value=0
    }

    this.setState({
      late_penalty:value
    })
  }



  //立即发布
  publish=()=>{
    let starttime= this.props.getNowFormatDates(1);
    let endtime=this.props.getNowFormatDates(2);
    this.setState({
      modalname:"立即发布",
      visible:true,
      Topval:"本操作只对“未发布”的对象生效",
      Botvalleft:"暂不发布",
      Botval:"则通过后续手动设置，定时发布",
      starttime:moment(moment(new Date())).format("YYYY-MM-DD HH:mm"),
      endtime:endtime,
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

  homepublish=()=>{
    // let task_Id=this.props.match.params.task_Id;
    // const cid = this.props.match.params.coursesId
    // let url = `/courses/${cid}/graduation_tasks/publish_task.json`;
    // axios.post(url,{
    //   task_ids:[task_Id],

    // }).then((response)=>{
    //   if (response.data.status == 0) {
    //     this.setState({
    //       Modalstype:true,
    //       Modalstopval:response.data.message,
    //       ModalSave:this.cancelmodel,
    //       Loadtype:true,
    //       checkBoxValues:[],
    //       checkAllValue:false
    //     })
    //     this.fetchData();
    //   }
    // }).catch((error)=>{

    // })
  }

  onSubmit = ()=> {
    const { publish_time, unified_setting } = this.state;
    // if (publish_time || !unified_setting) {
      this.saveWorkSetting();
    // } else {
      // this.publishModal.current.open(true)
    // }

  }
  _getCurrentEndTime = () => {
    const { unified_setting, end_time, rules } = this.state;
    if (unified_setting) {
      return end_time
    } else {
      let max_un_unified_setting_end_time = null;
      rules.map(item => {
        if (!max_un_unified_setting_end_time || moment(item.end_time) > moment(max_un_unified_setting_end_time)) {
          max_un_unified_setting_end_time = item.end_time;
        }
      })
      return max_un_unified_setting_end_time
    }
  }
  saveWorkSetting=()=>{
    let workId=this.props.match.params.workId;

    let {assigngroups,hascommit,minnums,max_nums}=this.state;

    const {homework_status, homework_id, homework_name, homework_type, publish_immediately, end_immediately
      ,
      publish_time, end_time,
      allow_late, late_penalty, late_time, work_public, score_open, answer_public, group_settings,
      anonymous_comment, anonymous_appeal, evaluation_start, evaluation_end, evaluation_num, absence_penalty, appeal_time,
      appeal_penalty, ta_mode, final_mode, te_proportion, ta_proportion, st_proportion,
      unified_setting,
      publish_time_type, end_time_type
    } = this.state;
    let group_settings_param = []
    let max_un_unified_setting_end_time = null
    if (!unified_setting) {
      const result = this.refs.pollDetailTabForthRules.notUnifiedSettingCheck(this.state.rules);
      this.setState({
          rules: result.rules
      })
      if(result.validate==false){
        scrollTo('.unified_setting')
        return false;
      }
      group_settings_param = result.rules.map(item => {
        if (!max_un_unified_setting_end_time || moment(item.end_time) > moment(max_un_unified_setting_end_time)) {
          max_un_unified_setting_end_time = item.end_time;
        }
        return {
          group_id: item.course_group_id,
          publish_time: item.publish_time,
          end_time: item.end_time
        }
      })
    }

    if(unified_setting && !publish_time) {
      this.setState({
        publicTimeTip: '发布时间不能为空'
      })
      scrollTo('.publicTimeTip')
      return false
    }
    if(unified_setting && !end_time) {
      this.setState({
        publicTimeTip: '截止时间不能为空'
      })
      scrollTo('.publicTimeTip')
      return false
    }

    let temp_publish_time
    let temp_end_time
    if (unified_setting) {
      temp_publish_time = publish_time
      temp_end_time = end_time
      if (!temp_publish_time) {
        const publish_time_moment = getNextHalfHourOfMoment(moment());
        temp_publish_time = publish_time_moment.format(dateFormat);
      }
      if (!temp_end_time) {
        temp_end_time = moment(handleDateString(temp_publish_time)).add(1, 'months').format(dateFormat)
      }
    } else {
      temp_end_time = max_un_unified_setting_end_time
    }

    // 已发布的不检查
    const isUnPublish= homework_status.indexOf(STATUS_UN_PUBLISH) != -1
    const isAdmin = this.props.isAdmin()
    const current = moment();
    const publish_time_editable = isUnPublish;
    const end_time_editable = isAdmin || !end_time || moment(end_time) > current;

    if (unified_setting) {
      if (publish_time_editable && temp_publish_time && moment(temp_publish_time) < moment()) {
        this.setState({
          publicTimeTip: '发布时间不能小于当前时间'
        })
        scrollTo('.publicTimeTip')
        return false
      }
      // 已截止的不检查
      if (end_time_editable && temp_end_time && moment(temp_end_time) <= moment(temp_publish_time)) {
        this.setState({
          publicTimeTip: '截止时间必须晚于发布时间'
        })
        scrollTo('.publicTimeTip')
        return false
      }
    }
    this.setState({
      publicTimeTip: ''
    })

    // 补交
    if( allow_late && !late_time ){
      this.setState({
        latetimetype: '结束时间不能为空'
      })
      scrollTo('.latetimetype')
      return false
    }

    if( allow_late && moment(late_time) < moment(temp_end_time) ){
      this.setState({
        latetimetype:"结束时间不能早于截止时间"
      })
      scrollTo('.latetimetype')
      return false;
    }
    this.setState({
      latetimetype: ''
    })
    // 匿评
    if (anonymous_comment) {
      if (!evaluation_start) {
        this.setState({
          anonymous_comment_time_tip: '匿评开启时间不能为空'
        })
        scrollTo('.anonymous_comment_time_tip')
        return false;
      }
      if (!evaluation_end) {
        this.setState({
          anonymous_comment_time_tip: '匿评结束时间不能为空'
        })
        scrollTo('.anonymous_comment_time_tip')
        return false;
      }
      if( moment(evaluation_start) < moment(temp_end_time) ){
        this.setState({
          anonymous_comment_time_tip:"匿评开启时间不能早于发布截止时间"
        })
        scrollTo('.anonymous_comment_time_tip')
        return false;
      }
      if( moment(evaluation_start) >= moment(evaluation_end) ){
        this.setState({
          anonymous_comment_time_tip:"匿评结束时间必须晚于匿评开启时间"
        })
        scrollTo('.anonymous_comment_time_tip')
        return false;
      }
      this.setState({ anonymous_comment_time_tip: '' })

      if (evaluation_num == 0) {
        this.setState({ evaluation_num_tip: '匿评数必须为正整数' }, () => { scrollTo('.evaluation_num_tip') })
        return false;
      }
      this.setState({ evaluation_num_tip: '' })

      if (absence_penalty == undefined || absence_penalty === "") {
        this.setState({ absence_penalty_tip: '必须为0或正整数' }, () => { scrollTo('.absence_penalty_tip') })
        return false;
      }
      this.setState({ absence_penalty_tip: '' })

      if (anonymous_appeal) {
        if (!appeal_time) {
          this.setState({
            appeal_time_tip: '匿评申诉结束时间不能为空'
          })
          scrollTo('.appeal_time_tip')
          return false;
        }
        if( moment(appeal_time) <= moment(evaluation_end) ){
          this.setState({
            appeal_time_tip:"匿评申诉结束时间必须晚于匿评结束时间"
          })
          scrollTo('.appeal_time_tip')
          return false;
        }
        this.setState({ appeal_time_tip: '' })

        if( appeal_penalty == undefined) {
          this.setState({ appeal_penalty_tip: '必须为0或正整数' }, () => { scrollTo('.appeal_penalty_tip') })
          return false;
        }
        this.setState({ appeal_penalty_tip: '' })
      }


    }


    if (final_mode == false && parseInt(te_proportion) + parseInt(ta_proportion) + parseInt(st_proportion) != 100) {
      this.setState({
        final_mode_false_tip: "评分占比之和必须等于100%"
      })
      scrollTo('.final_mode_false_tip')
      return false
    }

    /**
      "group_settings": [
        {
            "group_id": [820, 821],
            "publish_time": "2018-04-18 10:00:00",
            "end_time": "2018-04-20 10:00:00"
        },
     * */
    // axios
    let course_id=this.props.match.params.coursesId;
    const url = `/homework_commons/${workId}/update_settings.json`
    // comments
    const temp_publish_time_date = new Date(temp_publish_time)
    const temp_end_time_date = new Date(temp_end_time)
    const late_time_date = new Date(late_time)
    const evaluation_start_date = new Date(evaluation_start)
    const evaluation_end_date = new Date(evaluation_end)
    const appeal_time_date = new Date(appeal_time)
    axios.post(url,{
      course_id ,
      unified_setting: unified_setting,      // 统一设置
      group_settings: group_settings_param,
      publish_time: temp_publish_time ? !isNaN(temp_publish_time_date.getTime()) ? temp_publish_time_date : new Date(temp_publish_time.replace(/-/g, '/')) : temp_publish_time,      // 发布
      end_time: temp_end_time ? !isNaN(temp_end_time_date.getTime()) ? temp_end_time_date : new Date(temp_end_time.replace(/-/g, '/')) : temp_end_time,              // 截止
      late_penalty: late_penalty,           // 迟交扣分
      allow_late: allow_late,       // 是否允许补交
      late_time: late_time ? !isNaN(late_time_date.getTime()) ? late_time_date : new Date(late_time.replace(/-/g, '/')) : late_time,         // 补交截止时间
      anonymous_comment: anonymous_comment,   // true: 启用匿评 false:未启用匿评
      evaluation_start: evaluation_start ? !isNaN(evaluation_start_date.getTime()) ? evaluation_start_date : new Date(evaluation_start.replace(/-/g, '/')) : evaluation_start, //匿评开始时间
      evaluation_end: evaluation_end ? !isNaN(evaluation_end_date.getTime()) ? evaluation_end_date : new Date(evaluation_end.replace(/-/g, '/')) : evaluation_end,
      evaluation_num: evaluation_num,     //	匿评数
      absence_penalty: absence_penalty,   // 匿评扣分
      anonymous_appeal: anonymous_appeal, // true: 启用匿评申诉, false:未启用
      appeal_time: appeal_time ? !isNaN(appeal_time_date.getTime()) ? appeal_time_date : new Date(appeal_time.replace(/-/g, '/')) : appeal_time,   // 申诉结束时间
      appeal_penalty: appeal_penalty, //	违规匿评扣分
      ta_mode: ta_mode,  // 1:普通模式 0:复审模式
      final_mode: final_mode,  // true: 单项评分优先， false: 多项评分配比
      te_proportion: te_proportion / 100,
      ta_proportion: ta_proportion / 100,
      st_proportion: st_proportion / 100,
      work_public: work_public, //公开作品
      score_open: score_open, // 公开成绩
      answer_public: answer_public,

    }).then((response)=>{
      if (response.data.status == 0) {
        this.setState({startEditFlag: false})
        this.props.showNotification('更新成功')
        // 查看是否需要弹框立即发布
        if (!publish_time) {
        }
      }
    }).catch((error)=>{

    })

    return true;
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

  goback=()=>{
    this.fetchData();
    this.setState({startEditFlag: false})
    // this.props.toListPage(this.props.match.params, this.state.category.category_id)
  }


  end=()=>{

    this.setState({
      modalname:"立即截止",
      visible:true,
      Topval:"本操作只对“提交中”的对象生效",
      Botvalleft:"暂不截止",
      Botval:"则将根据已设置的截止时间，定时截止",
      Cancelname:"暂不截止",
      Savesname:"立即截止",
      Cancel:this.publishcanner,
      Saves:this.coursetaskend,
    })

  }

  publishcanner=()=>{
    this.setState({
      visible:false,
    })
  }

  cancelmodel=()=>{

    this.setState({
      Modalstype:false,
      Loadtype:false,
      visible:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
    })

  }

  coursetaskend=()=>{

    // const coursesId = this.props.match.params.coursesId;
    // const task_Id = this.props.match.params.task_Id;

    // let url = `/courses/${coursesId}/graduation_tasks/end_task.json`;
    // axios.post(url,{
    //   task_ids:[task_Id],
    //   all_check:0
    // }).then((response)=>{
    //   if (response.data.status == 0) {
    //     this.setState({
    //       Modalstype:true,
    //       Modalstopval:response.data.message,
    //       ModalSave:this.cancelmodel,
    //       Loadtype:true,
    //       checkBoxValues:[],
    //       checkAllValue:false
    //     })
    //   }
    // }).catch((error)=>{

    // })


  }



  setcommentnum=(e)=>{
    this.setState({
      commentnum:parseInt(e.target.value)
    })

  }

  onToPublishClick = () => {

  }

  rulesCheckInfo=(rules)=>{
    console.log(rules);
    this.setState({
      rules
    })
  }

    // 补交附件
  Cancelvisible=()=>{
    this.setState({
      accessoryVisible:false
    })
  }

  addAccessory=()=>{
    this.setState({
      accessoryVisible:true
    })
  }
  setupdate = () => {

  }

  render(){
    const { getFieldDecorator } = this.props.form;

    let {course_name, settingdata,base_on_project,Modalstype,Modalstopval,operworks,opergrade,graduationgroups,Loadtype,task_type,publicTimeTip,
      ModalCancel,ModalSave,allowlate,latepenalty,latetime,crosscomment,commentstatus,commentnum,commenttime,numtype,
      minnum,maxnum,modalname,
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

      homework_status, homework_id, homework_name, homework_type, publish_immediately, end_immediately, unified_setting, publish_time,
      end_time, allow_late, late_penalty, late_time, work_public, score_open, answer_public, group_settings,
      anonymous_comment, anonymous_appeal, evaluation_start, evaluation_end, evaluation_num, absence_penalty, appeal_time,
      appeal_penalty, ta_mode, final_mode, te_proportion, ta_proportion, st_proportion, anonymous_comment_time_tip, appeal_time_tip,
      final_mode_false_tip,
      startEditFlag,
      publish_time_type, end_time_type, rules, disable_unified_setting,
      work_statuses, work_id,
      accessoryVisible,

      init_late_time, init_evaluation_start, init_evaluation_end, init_appeal_time
    } =this.state;

    // 是否可编辑的判断
    const isUnPublish= homework_status.indexOf(STATUS_UN_PUBLISH) != -1

    const isSuperAdmin = this.props.isSuperAdmin()
    const isAdmin = this.props.isAdmin()
    const current = moment();
    const publish_time_editable = isUnPublish;
    const end_time_editable = !end_time || moment(end_time) > current;

    let courseId=this.props.match.params.coursesId;
    let workId=this.props.match.params.workId;

    let category_id=this.props.match.params.category_id;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    //
    //
    // console.log(Date.parse(publish_time))
    //  console.log(this.props.isSuperAdmin())
    let adaptered_group_settings = []
    if (group_settings) {
      /**
          item.end_time,
          item.publish_time
       */
      adaptered_group_settings = group_settings.map (item => {
        return {
          course_group_id: item.group_id,
          course_group_name: item.group_name,
        }
      })
    }
    let exportUrl = `/api/homework_commons/${workId}/works_list.zip`
    const exportResultUrl = `/api/homework_commons/${workId}/works_list.xlsx`
    const noAuth = !isAdmin || !startEditFlag;

    return(
      <React.Fragment>
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalCancel={ModalCancel}
          modalSave={ModalSave}
          loadtype={Loadtype}
        />

        {/*立即发布*/}
        {/* <HomeworkModal
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
        /> */}
        <PublishRightnow ref={this.publishModal} showActionButton={false} {...this.props} checkBoxValues={[workId]} action={this.fetchData}
            isPublish={true} doWhenSuccess={this.doWhenSuccess} checkBeforePost={this.saveWorkSetting}
            onToPublishClick={this.onToPublishClick}
        ></PublishRightnow>
        <PublishRightnow ref={this.endModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}  action={this.fetchData}
            isPublish={false} doWhenSuccess={this.doWhenSuccess}></PublishRightnow>

        <style>{`
          .settingForm .ant-radio-group, .settingForm.ant-form {
            color: #666;
          }
          .settingForm.ant-form {
            margin-bottom: 30px;
          }

          .settingForm input.ant-input {
            height: 40px
          }

          .settingForm .color-grey-9 {
            color: #ccc !important;
          }

        `}</style>
        <Form  className={'settingForm'}>
          <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36">
            {/* TODO
              取消统一发布设置
              https://lanhuapp.com/web/#/item/project/board/detail?val=&pid=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&project_id=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&image_id=72a5d2c1-3d69-4f1b-9839-c368e86262bc
            */}
            {/* <div className={" font-16 color-dark h20 mb20"}>发布设置 </div> */}
            <p className="mb30 clearfix">
              <span className="font-16 fl color-dark">发布设置</span>
              {
                !startEditFlag && isAdmin ?
                <a className="fr white-btn edu-blueline-btn mr10 mr6 lineh-24" onClick={() => { this.setState({startEditFlag: true}) }}>
									编辑设置
                  {/*<Tooltip title="编辑"><i className="iconfont icon-bianjidaibeijing font-20 color-green"></i></Tooltip>*/}
                </a>
                :""
              }
            </p>

            {group_settings && !!group_settings.length && <p className="clearfix mb20 unified_setting">
              <ConditionToolTip condition={disable_unified_setting} title={"已发布，不能再修改"}>
                <Checkbox className="font-16 color-grey-6" checked={ unified_setting } onChange={this.on_unified_setting}
                  disabled={disable_unified_setting || noAuth}
                >统一设置</Checkbox>
              </ConditionToolTip>


              <span className="color-grey-9">（选中则所有分班使用相同的发布设置，仅课堂管理员可修改；否则各个分班允许单独设置）</span>
            </p>}

            { unified_setting ?
            <React.Fragment>
            <div className={"h20 mb30 ml30"}>
              <span>发布时间：</span>
              {/* <Tooltip placement="bottom" title={this.props.isSuperAdmin()?"":publish_time_type===true?"发布时间已过，则不能修改":""}>
              </Tooltip> */}

              <ConditionToolTip condition={moment(this.state.init_publish_time) < this.fetchMoment} title={this.props.isAdmin()?"时间已过，不能再修改":""}>
              <span>

                    <DatePicker
                      dropdownClassName="hideDisable"
                      showTime={{ format: 'HH:mm' }}
                      disabledTime={disabledDateTime}
                      showToday={false}
                      locale={locale}
                      format={dateFormat}
                      placeholder="请选择发布时间"
                      id={"startime"}
                      width={"210px"}
                      value={!publish_time?"":moment(publish_time, dateFormat)}
                      onChange={this.onChangeTimepublish}
                      // disabled={this.props.isSuperAdmin()?false:publish_time_type===true?true:false}
                      disabled={moment(this.state.init_publish_time) < moment() || noAuth}

                      // disabledDate={ (publish_time) => {
                      //     return publish_time && publish_time < moment().add(-1, 'days'); }
                      //   }
                    />
              </span>
              </ConditionToolTip>

              <span className={"font-14 color-grey-9 ml10"}>（学生收到作业的时间）</span>
            </div>

            <div className={"h20 mb30 ml30"}>
              <span>截止时间：</span>
              {/* <Tooltip placement="bottom" title={this.props.isSuperAdmin()?"":end_time_type===true?"截止时间已过，则不能修改":""}>
              </Tooltip> */}
              <ConditionToolTip condition={moment(this.state.init_end_time) < this.fetchMoment} title={this.props.isAdmin()?"时间已过，不能再修改":""}>
              <span>
                <DatePicker
                  dropdownClassName="hideDisable"
                  showTime={{ format: 'HH:mm' }}
                  disabledTime={disabledDateTime}
                  showToday={false}
                  locale={locale}
                  format={dateFormat}
                  placeholder="请选择截止时间"
                  id={"endTime"}
                  width={"210px"}
                  value={!end_time?"":moment(end_time, dateFormat)}
                  onChange={this.onChangeTimeend}
                  disabled={this.props.isSuperAdmin()?false:end_time_type===true?true:false}
                  disabled={moment(this.state.init_end_time) < moment() || noAuth}
                  disabledDate={disabledDateFunc}

                  // disabledDate={ (end_time) =>
                  //   {
                  //     const publish_time = this.state.publish_time
                  //     if (!publish_time) {
                  //       return end_time && end_time < moment();
                  //     }
                  //     if (!publish_time || !end_time) { return false; }
                  //     return end_time.valueOf() < moment(publish_time, dateFormat).valueOf(); }
                  //   }
                />
              </span>
              </ConditionToolTip>

              <span className={"font-14 color-grey-9 ml10"}>（学生“按时”提交作品的时间截点）</span>
            </div>

            {<div className={"publicTimeTip color-red ml30"}>{publicTimeTip}</div>}
            </React.Fragment> :
              adaptered_group_settings && !!adaptered_group_settings.length && <PollDetailTabForthRules
								{...this.props}
								{...this.state}
                ref="pollDetailTabForthRules"
                rules={rules}
                course_group={adaptered_group_settings}
                rulesCheckInfo={(info)=>this.rulesCheckInfo(info)}
                flagPageEdit={startEditFlag}
                moduleName="作业"
              ></PollDetailTabForthRules>
            }

            {/*
              flagPageEdit={flagPageEdit}
             */}


          </div>

          <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36">
            <div className={" font-16 color-dark h20 mb20"}>补交设置
              <span className={"ml15 font-14 color-grey-9 "}></span>
            </div>




              <Checkbox style={radioStyle} value={"允许补交"} checked={allow_late} className="font-16 "
                        onChange={this.allow_late_change} disabled={noAuth || moment(init_late_time) < this.fetchMoment}>开启补交 <span
                className={"font-14  ml10 color-grey-c"}
                style={{textAlign: "left", fontSize: "14px"}}>（选中，则允许学生延时提交作品）</span></Checkbox>

                <div className={"h21 mb10 ml30 mt20"}>
                  <span>迟交扣分：</span>
                  <Input type="number" className="mr10" style={{width:"100px" }} value={late_penalty}  onInput={this.late_penalty_change}
                    min={0} max={100}  disabled={!allow_late || noAuth}
                  />
                  <span className={"font-14 color-grey-9 "}>（延时提交作品时，学生成绩将被扣减的分值）</span>
                  {latepenaltytype===true?<div className={"color-red ml40"}>{latepenaltyvalue}</div>:""}
                </div>

                <div className={" mb10 ml30"}>
                  <span>结束时间：</span>
                  {/* <ConditionToolTip condition={moment(init_late_time) < this.fetchMoment} title={"时间已过，不能再修改"}>
                   </ConditionToolTip> */}
                  <span>
                  <DatePicker
                      showToday={false}
                    dropdownClassName="hideDisable"
                    showTime={{ format: 'HH:mm' }}
                    locale={locale}
                    format={dateFormat}
                    placeholder="请选择结束时间"
                    id={"enTime"}
                    width={"210px"}
                    value={!late_time ? undefined :moment(late_time, dateFormat)}
                    onChange={this.onChangeTimelatetime}
                    disabledTime={disabledDateTime}
                    // || moment(init_late_time) < moment()
                    disabled={!allow_late || noAuth }
                    disabledDate={disabledDateFunc}
                    // disabledDate={ (late_time) =>
                    //   {
                    //     const end_time = this.state.end_time
                    //     if (!end_time || !late_time) { return false; }
                    //     return late_time < moment(end_time, dateFormat).add(-1, 'days'); }
                    //   }
                  />
                  </span>

                  <span className={"font-14 color-grey-9 ml10"}>（学生“延时”提交作品的时间截点）</span>
                  {<div className={"latetimetype color-red "}>{latetimetype}</div>}
                </div>




          </div>

          <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36">
            <div className={" font-16 color-dark h20 mb20"}>匿评设置 </div>

            <div  className={"mb20"}>
              <Checkbox className="ml30" checked={anonymous_comment} onChange={this.anonymous_comment_change}
                disabled={noAuth || moment(init_evaluation_start) < moment()}
              >启用匿评</Checkbox>
              <span className={"font-14 color-grey-9"}>{this.state.category&&this.state.category.category_name==="普通作业"?"（作品数量≥2个，可以开启匿评）":"（提交作品的分组数量≥2个，可以开启匿评）"}</span>
            </div>
            {/* 开启时间 */}
            <div className={"h20 mb30 ml60"}>
              <span>开启时间：</span>
              <Tooltip placement="bottom" title={starttimetype===true?this.props.isAdmin()?"发布时间已过，则不能修改":"":""}>
              <ConditionToolTip condition={moment(init_evaluation_start) < this.fetchMoment} title={this.props.isAdmin()?"时间已过，不能再修改":""}>
              <span>
                  <DatePicker
                    dropdownClassName="hideDisable"
                    showTime={{ format: 'HH:mm' }}
                    disabledTime={disabledDateTime}
                    showToday={false}
                    locale={locale}
                    format={dateFormat}
                    placeholder="请选择匿名开启时间"
                    id={"startime"}
                    width={"210px"}
                    value={!evaluation_start ?"":moment(evaluation_start, dateFormat)}
                    onChange={this.onChangeEvaluationStart}
                    disabled={ (anonymous_comment && !noAuth ? false : true) || moment(init_evaluation_start) < moment() }
                    // disabledDate={ (evaluation_start) =>
                    //   {
                    //     const end_time = this.state.end_time
                    //     if (!end_time || !evaluation_start) { return false; }
                    //     return evaluation_start.valueOf() < moment(end_time, dateFormat).valueOf(); }
                    //   }
                  />
              </span>
              </ConditionToolTip>

              </Tooltip>
              <span className={"font-14 color-grey-9 ml10"}>（匿评开始时间之前提交作品的学生，参与匿评）</span>
            </div>
            <div className={"h20 mb30 ml60"}>
              <span>结束时间：</span>
              {/* <Tooltip placement="bottom" title={this.props.isSuperAdmin()?"":starttimetype===true?"发布时间已过，则不能修改":""}>
              </Tooltip> */}

              <ConditionToolTip condition={moment(init_evaluation_end) < this.fetchMoment} title={this.props.isAdmin()?"时间已过，不能再修改":""}>
              <span>
                  <DatePicker
                    dropdownClassName="hideDisable"
                    showTime={{ format: 'HH:mm' }}
                    showToday={false}
                    locale={locale}
                    format={dateFormat}
                    placeholder="请选择匿名结束时间"
                    id={"endtime"}
                    width={"210px"}
                    value={!evaluation_end ?"":moment(evaluation_end, dateFormat)}
                    onChange={this.onChangeEvaluationEnd}
                    disabledTime={disabledDateTime}
                    disabled={(anonymous_comment && !noAuth ? false : true) || moment(init_evaluation_end) < moment()}
                    disabledDate={disabledDateFunc}

                    // disabledDate={ (evaluation_end) =>
                    //   {
                    //     const evaluation_start = this.state.evaluation_start
                    //     if (!evaluation_start || !evaluation_end) { return false; }
                    //     return evaluation_end.valueOf() < moment(evaluation_start, dateFormat).valueOf(); }
                    //   }
                  />

              </span>
              </ConditionToolTip>
              <span className={"font-14 color-grey-9 ml10"}>（学生匿评TA人作品的时间截点）</span>


              <span className={"font-14 color-grey-9 ml10"}></span>

            </div>
            {/* marginTop: '-6px' */}
            {<div className={" anonymous_comment_time_tip color-red ml60"} style={{}}>{anonymous_comment_time_tip}</div>}

            {/* 匿评数量 */}
            <div className={"h20 mb30 ml60"}>
              <span>匿评数量：</span>
              <Tooltip placement="bottom" title={starttimetype===true?this.props.isAdmin()?"发布时间已过，则不能修改":"":""}>
              <span>
                <Input type="number" className="mr10" style={{width:"100px" }} value={evaluation_num}  onInput={this.evaluation_num_change}
                  disabled={anonymous_comment && !noAuth? false : true} min={0} max={100}
                />
              </span>
              </Tooltip>
              <span className={"font-14 color-grey-9 "}>（每个学生将被分配的匿评作品数量）</span>
            </div>
            {this.state.evaluation_num_tip && <div className={" evaluation_num_tip color-red ml60"} style={{marginTop: '-6px'}}>{this.state.evaluation_num_tip}</div>}

            <div className={"h20 mb30 ml60"}>
              <span>缺评扣分：</span>
              <Tooltip placement="bottom" title={starttimetype===true?this.props.isAdmin()?"发布时间已过，则不能修改":"":""}>
              <span>
                <Input type="number" className="mr10" style={{width:"100px" }} value={absence_penalty}  onInput={this.absence_penalty_change}
                  disabled={ anonymous_comment && !noAuth ? false : true} min={0} max={100}
                />
              </span>
              </Tooltip>
              <span className={"font-14 color-grey-9 "}>（学生缺评时，其成绩将被扣减的分值）</span>
            </div>
            {this.state.absence_penalty_tip && <div className={" absence_penalty_tip color-red ml60"} style={{marginTop: '-6px'}}>{this.state.absence_penalty_tip}</div>}


            { anonymous_comment &&
            <React.Fragment>
            <div  className={"mb20"}>
              <Checkbox className="ml30" checked={anonymous_appeal} onChange={this.anonymous_appeal_change}
                  disabled={noAuth || moment(init_appeal_time) < moment()}
              >启用匿评申诉</Checkbox>
              <style>{`
                .pop-instruction p.p {
                    margin-left: 18px;
                }
              `}</style>
              <PopInstruction width={458} id={1}>
                <p className="font-14 edu-txt-left pop-instruction">

                  允许学生对自己作品的匿评评分进行申诉，由教师和助教处理申诉<br/>

                  <br/>
                  1、接受学生的合理申诉：<br/>
                      <p className="p">被申诉的评分记录无效，不参与最终成绩的计算</p>
                      <p className="p">被申诉的评阅人的作品成绩，将被扣减违规匿评分</p>

                  <br/>
                  2、拒绝学生的不合理申诉：<br/>
                      <p className="p">被申诉的评分记录有效，不允许学生对该评分记录进行二次申诉</p>
                      <p className="p">被申诉的评阅人的作品成绩，不会扣除违规匿评分</p>

                </p>
              </PopInstruction>
              {/* <span className={"font-14 color-grey-9"}>（提交作品少于2个时，匿评开启将失败；请在作品数量达标后，重新进行匿评设置）</span> */}
            </div>
            {/* 启用匿评申述 结束时间： */}
            <div className={"h20 mb30 ml60"}>
              <span>结束时间：</span>
              {/* <Tooltip placement="bottom" title={this.props.isSuperAdmin()?"":starttimetype===true?"发布时间已过，则不能修改":""}>
              </Tooltip> */}
              <ConditionToolTip condition={moment(init_appeal_time) < this.fetchMoment} title={this.props.isAdmin()?"时间已过，不能再修改":""}>
              <span>
                  <DatePicker
                    dropdownClassName="hideDisable"
                    showTime={{ format: 'HH:mm' }}
                    disabledTime={disabledDateTime}
                    disabledDate={disabledDateFunc}
                    showToday={false}
                    locale={locale}
                    format={dateFormat}
                    placeholder="请选择申诉结束时间"
                    id={"endtime"}
                    width={"210px"}
                    value={!appeal_time?"":moment(appeal_time, dateFormat)}
                    onChange={this.appeal_time_change}
                    disabled={ (anonymous_appeal && !noAuth ? false : true) || moment(init_appeal_time) < moment()}
                  />
              </span>
              </ConditionToolTip>


              <span className={"font-14 color-grey-9 ml10"}>（学生提交匿评申诉的时间截点）</span>
            </div>
            {<div className={" appeal_time_tip color-red ml60 mb6"}>{appeal_time_tip}</div>}

            {/* 违规匿评扣分： */}
            <div className={"h20 mb30 ml60"}>
              <span>违规匿评扣分：</span>
              <Tooltip placement="bottom" title={starttimetype===true?this.props.isAdmin()?"发布时间已过，则不能修改":"":""}>
              <span>
                <Input type="number" className="mr10" style={{width:"100px" }} value={appeal_penalty}  onInput={this.appeal_penalty_change}
                  disabled={ anonymous_appeal && !noAuth ? false : true} min={0} max={100}
                />
              </span>
              </Tooltip>
              <span className={"font-14 color-grey-9 ml10"}>（学生违规匿评TA人作品时，其成绩将被扣减的分值）</span>
            </div>
            {this.state.appeal_penalty_tip && <div className={" appeal_penalty_tip color-red ml60"} style={{marginTop: '-6px'}}>{this.state.appeal_penalty_tip}</div>}

            </React.Fragment> }
          </div>


          <div className="stud-class-set bor-bottom-greyE pd20 edu-back-white pl36">
            <div className={" font-16 color-dark h20 mb20"}>评分设置 </div>
            <div  className={"mb20 ml30"}>
              <span className={"font-16 "}>助教评分</span>
            </div>

            <div className={"mb30 ml60"}>
              <Tooltip placement="bottom" title={starttimetype===true?this.props.isAdmin()?"发布时间已过，则不能修改":"":""}>
              <RadioGroup onChange={this.ta_mode_change} value={ta_mode}>
                <Radio style={radioStyle} value={1} disabled={noAuth}>
                  普通模式<span className={"font-14 color-grey-9 ml10"}>（选中，则取各助教最终评分的平均分）</span>
                </Radio>
                <Radio style={radioStyle} value={0} disabled={noAuth}>
                  复审模式<span className={"font-14 color-grey-9 ml10"}>（选中，则只取最新的助教评分）</span>
                </Radio>
              </RadioGroup>
              </Tooltip>
              <span className={"font-14 color-grey-9 ml10"}></span>
            </div>

            <div  className={"mb20 ml30"} style={{marginTop: '20px'}}>
              <span className={"font-16 "}>最终成绩组成</span>
            </div>
            <div className={"mb30 ml60"}>
              <RadioGroup onChange={this.final_mode_change} value={final_mode}>
                <Radio style={radioStyle} value={false} disabled={noAuth}>
                  多项评分配比<span className={"font-14 color-grey-9 ml10"}>（选中，则按照比例计算最终成绩）</span>
                  <PopInstruction width={512} id={2}>
                    <p className="font-14 edu-txt-left pop-instruction">
                      计算说明：<br/>

                      教师评分 * 其百分比 + 助教评分 * 其百分比 + 学生匿评平均分 * 其百分比  - ( <br/>
                      迟交扣分 + 缺评扣分 * 缺评数 + 违规匿评扣分 * 违规匿评数 )<br/><br/>
                      注意<br/>
                      非零百分比的评分选项，若评分记录为空，则其百分比将自动平摊到其它非零<br/>
                      评分选项上。<br/>
                      例：教师评分40% + 助教评分35% + 学生匿评25%，学生A没有教师评分记<br/>
                      录，则其最终成绩按照助教评分55% + 学生匿评45%进行计算

                    </p>
                  </PopInstruction>
                </Radio>


                  <div className={"h21 mb10 ml30 mt20"}>
                    <span>教师评分：</span>
                    <Input type="number" className="mr10" min={0} max={100} style={{width:"100px" }}
                      value={te_proportion}  onInput={this.te_proportion_change} disabled={final_mode || noAuth}
                    />
                    %
                  </div>
                  <div className={"h21 mb10 ml30"}>
                    <span>助教评分：</span>
                    <Input type="number" className="mr10" min={0} max={100} style={{width:"100px" }}
                      value={ta_proportion}  onInput={this.ta_proportion_change} disabled={final_mode || noAuth}
                    />
                    %
                  </div>
                  <div className={"h21 mb10 ml30 mb20"}>
                    <span>学生匿评：</span>
                    <ConditionToolTip title="未开启匿评，不能修改" condition={!anonymous_comment}>
                      <Input type="number" className="mr10" min={0} max={100} style={{width:"100px" }} value={st_proportion}
                          onInput={this.st_proportion_change} disabled={final_mode || !anonymous_comment || noAuth}/>
                    </ConditionToolTip>
                    %
                  </div>
                  {<div className={"color-red ml30 final_mode_false_tip"}>{final_mode_false_tip}</div>}
                <Radio style={radioStyle} value={true} disabled={noAuth}>
                  单项评分优先<span className={"font-14 color-grey-9 ml10"}>（选中，则按照优先顺序计算最终成绩）</span>
                  <PopInstruction width={500} id={3}>
                    <p className="font-14 edu-txt-left pop-instruction">
                      计算说明：<br/>

                      优先顺序排前的非零评分 * 100% - <br/>
                      ( 迟交扣分 + 缺评扣分 * 缺评数 + 违规匿评扣分 * 违规匿评数 )<br/>
                      例：有教师评分则教师评分100%，否则教辅评分100%，依次类推
                      {/* 教师评分 * 其百分比 + 助教评分 * 其百分比 + 学生匿评平均分 * 其百分比 - <br/>
                      ( 迟交扣分 + 缺评扣分 * 缺评数 + 违规匿评扣分 * 违规匿评数 )<br/>

                      <br/>
                      注意<br/>
                      非零百分比的评分选项，在没有评分记录的情况下，其百分比平摊到另外的评<br/>
                      分选项上。例如：教师评分40% + 助教评分35% + 学生匿评25%，学生A没<br/>
                      有得到教师评分，则最终成绩将按照助教评分55% + 学生匿评45%进行计算 */}

                    </p>
                  </PopInstruction>
                </Radio>

              </RadioGroup>
              <div className={"font-16"} style={{ marginLeft: '25px' }}>
                <span>教师评分 → 教辅评分 → 学生匿评评分</span>
                {/* <span className={"font-14 color-grey-9 ml10"}>（有教师评分则教师评分100%，否则教辅评分100%，依次类推 ）</span> */}
              </div>
            </div>

          </div>

          <div className="stud-class-set pd20 edu-back-white pl36">
            <div className={" font-16 color-dark h20 mb20"}>公开设置 </div>

            <div  className={""}>
              <Checkbox className="ml40" checked={work_public} onChange={this.work_public_change}
                disabled={noAuth}
              >公开作品</Checkbox>
              <span className={"font-14 color-grey-9"}>（选中，则在作业截止/补交结束时间之后，已提交作品的学生可以查看其它学生的作品，否则只能查看自己的作品）</span>
            </div>

            <div>
              <Checkbox className="ml40" checked={score_open} onChange={this.score_open_change}
                disabled={noAuth}
              >公开成绩</Checkbox>
              <span className={"font-14 color-grey-9"}>（选中，则在作业截止/补交结束时间之后，已提交作品的学生可以查看其它学生的成绩，否则只能查看自己的成绩）</span>
            </div>

            <div>
              <Checkbox className="ml40" checked={answer_public} onChange={this.answer_public_change}
                disabled={noAuth}
              >公开答案</Checkbox>
              <span className={"font-14 color-grey-9"}>（选中，则在作业截止/补交结束时间之后，已提交作品的学生可以查看作业参考答案，否则不能查看作业参考答案）</span>
            </div>
          </div>

        </Form>
        {this.props.isAdmin() && startEditFlag ?<div className="clearfix mt30 mb30">
          <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20"
              onClick={this.onSubmit}
          >提交</Button>
          {/*<Link to={"/courses/"+courseId+"/graduation_tasks/"+position+"/"+category_id+coursesearch} className="defalutCancelbtn fl">取消</Link>*/}
          <a onClick={this.goback} className="defalutCancelbtn fl"
          >取消</a>
        </div>:""}
      </React.Fragment>

    )
  }
}

const CommonWorkSettingForm = Form.create({ name: 'commonworkSettingForm' })(CommonWorkSetting);
export default CommonWorkSettingForm;

// {/*<RadioGroup onChange={this.allow_late_change} value={allow_late}>*/}
//
// {/*  <Radio style={radioStyle} value={true} disabled={noAuth || moment(init_late_time) < this.fetchMoment}>允许补交</Radio>*/}
// {/*  <Radio style={radioStyle} value={false} disabled={noAuth || moment(init_late_time) < this.fetchMoment}>禁止补交</Radio>*/}
//
// {/*</RadioGroup>*/}
