import React,{ Component } from "react";
import {Input,InputNumber,Spin,Statistic} from "antd";

import '../css/members.css';
import '../css/busyWork.css';
import '../poll/pollStyle.css';
import '../css/Courses.css';

import moment from 'moment';
import { WordsBtn,markdownToHTML,ActionBtn,getImageUrl, MarkdownToHtml } from 'educoder';
import Modals from '../../modals/Modals';
import CoursesListType from '../coursesPublic/CoursesListType';

import Multiple from './question/multiple';
import Single from './question/single';
import FillEmpty from './question/fillEmpty';
import SimpleAnswer from './question/simpleAnswer';
import ShixunAnswer from './question/shixunAnswer';

import update from 'immutability-helper';

import axios from 'axios';
import './new/common.css';

const { Countdown } = Statistic;

// const deadline =  Date.now() + this.state.time*60*60; // Moment is also OK

// console.log(deadline)

const Textarea =Input.TextArea
const tagArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
const $ = window.$;
const statudmap={1:"未发布",2:"已发布",3:"已截止"}

const type=["单选题","多选题","判断题","填空题","简答题","实训题"]

const format="YYYY-MM-DD HH:mm"
class ExerciseReviewAndAnswer extends Component{
  constructor(props){
      super(props);
      this.state={
        data:undefined,
        questionPanelFixed:false,
        e_ReviewInfo:undefined,
        e_AnswerInfo:undefined,
        courseName:undefined,
        exercise:undefined,
        question_types:undefined,
        exercise_questions:undefined,
        time:undefined,
        hour:0,
        minute:0,
        second:0,
        Modalstype:false,
        Modalstopval:undefined,
        modalsBottomval:undefined,
        ModalCancel:undefined,
        ModalSave:undefined,
        Loadtype:undefined,
        // 问卷是否可以被编辑（老师/试卷已截止/问卷已提交为1）
        user_exercise_status:undefined,

        // 开始答题时间
        exercise_start_at:undefined,

        //老师身份
        exercise_scores:undefined,
        exercise_answer_user:undefined,

        //学生身份
        question_status:undefined,

        score:undefined,
        setScoreReason:undefined,
        setTip:"",

        Id:undefined,
        // 试卷总分
        exerciseTotalScore:undefined,

        // 加载效果
        isSpin:false,
        // 调分数组
        ajustSore:undefined
      }
  }
  componentDidUpdate (prevProps) {
    // 需要等get_user_info执行完才能getInfo
    if (!prevProps.coursedata.name && this.props.coursedata.name) {
      this.getInfo()
    }
  }
  componentDidMount(){
    if(this.props.coursedata.name){
      this.getInfo();
    }
    
    //window.addEventListener('scroll', this.handleScroll);	
  }

  remainTime=(time)=>{
    // let { time } = this.state;
    // let h=moment(parseInt(time)*1000).hour()-8;
    // let m=moment(parseInt(time)*1000).minutes();
    // let s=moment(parseInt(time)*1000).seconds();
    // this.timer = setInterval(() => {
    //   if(time>0){
    //     if(s==0){
    //       if(m > 0){
    //         m--;
    //       }
    //       s=59;
    //     }else{
    //       s--;
    //     }
    //     this.setState({
    //       hour:h,
    //       minute:m,
    //       second:s
    //     })
    //     if(h==0 && m==0 && s==0){
    //       clearInterval(this.timer);
    //       this.autoCommitExercise();
    //     }
    //   }else{
    //     clearInterval(this.timer);
    //   }
    // },1000)
  }

  //自动交卷
  autoCommitExercise=()=>{
		let eId=this.props.match.params.Id;
		let url=`/exercises/${eId}/commit_exercise.json`;
		axios.post(url,{
			commit_method:2
		}).then((result)=>{
			if(result){
				if(result.data.status===0){
					this.setState({
						Modalstype:true,
						Modalstopval:'答题结束了，系统已自动提交试卷',
						modalsBottomval:"不能再修改答题",
						ModalCancel:undefined,
						ModalSave:this.sureCommit,
						Loadtype:true,
            time:null,
					})
					this.props.showNotification(`${result.data.message}`);
				}

				if(result.data.status===-2){
					 // this.remainTime(parseInt(result.data.message))
          this.setState({
            time:parseInt(result.data.mess)
          })
          this.deadline(parseInt(result.data.message))
				}
			}
		}).catch((error)=>{
			console.log(error);
		})
  }

  sureCommit=()=>{
    let coursesId = this.props.match.params.coursesId;
    let eId = this.props.match.params.Id;
    this.props.history.push(`/courses/${coursesId}/exercises/${eId}/student_exercise_list?tab=0`);
  }

  // 滚动定位
  handleScroll=()=>{
    if(parseInt(window.scrollY)>550){
      this.setState({
        questionPanelFixed:true
      })
    }else{
      this.setState({
        questionPanelFixed:false
      })
    }
  }

  getInfo=()=>{
    this.setState({
      courseName:this.props.current_user.course_name,
      isSpin:true
    })

    let eId=this.props.match.params.Id;
    let user_id=this.props.match.params.userId;

    let isAdmin=this.props.isAdmin();
    if(isAdmin){
      let url=`/exercises/${eId}/review_exercise.json`
      axios.get((url),{params:{
        login:user_id
      }}).then((result)=>{
        if(result){
          this.setState({
            data:result.data,
            e_ReviewInfo:result.data,
            exercise:result.data.exercise,
            exercise_types:result.data.exercise_scores.exercise_types,
            exercise_scores:result.data.exercise_scores,
            exercise_start_at:result.data.exercise_answer_user.start_at,
            exercise_answer_user:result.data.exercise_answer_user,
            exercise_questions:result.data.exercise_questions,
            user_exercise_status:1,
            Id:result.data.exercise_answer_user.user_id,
            exerciseTotalScore:result.data.exercise_answer_user.score,
            isSpin:false,
          })
          // 先将未批的简答题放入到调分数组中
          let ajustSore = [];
          result.data && result.data.exercise_questions.length>0 && result.data.exercise_questions.map((item,key)=>{
            if( item.question_type == 4 && item.answer_status == 0 ){
              ajustSore.push({
                 inputSore:0,
                 desc:undefined,
                 id:item.question_id,
                 position:item.q_position,
                 setTip:""
              })
            }
          })
          this.setState({
            ajustSore
          })
        }
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      let url=`/exercises/${eId}/start_answer.json`
      axios.get((url),{params:{
        login:user_id
      }}).then((result)=>{
        if(result.status==200){
          this.setState({
            data:result.data,
            e_AnswerInfo:result.data,
            exercise:result.data.exercise,
            exercise_types:result.data.exercise_types,
            question_status:result.data.question_status,
            exercise_start_at:result.data.exercise.exercise_start_at,
            exercise_scores:result.data.exercise_scores,
            exercise_questions:result.data.exercise_questions,
            user_exercise_status:result.data.exercise.user_exercise_status,
            time:result.data.exercise.left_time,
            exerciseTotalScore:result.data.user_score,
            isSpin:false
          })
          if(result.data.exercise.left_time != null){
            // this.remainTime(result.data.exercise.left_time);
            this.deadline(result.data.exercise.left_time)
          }
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  scrollToAnchor=(index)=>{
    let name="Anchor_"+index;
    // console.log($("#Anchor_"+index).scrollTop());
    if (index) {
      // let anchorElement = document.getElementById(name);
      // if(anchorElement) { anchorElement.scrollIntoView(); }
      $("html").animate({ scrollTop: $("#Anchor_"+index).offset().top - 150 })
    }
  }

  //答题后更改题目列表得状态
  changeQuestionStatus=(No,flag)=>{
    this.setState(
      (prevState) => ({ 
        question_status : update(prevState.question_status, {[No]: { ques_status: {$set: flag} }})
      })
    )
  }
  // 调分
  showSetScore=(key,flag,position,type,id)=>{
    this.setState(
      (prevState) => ({ 
        exercise_questions : update(prevState.exercise_questions, {[key]: { setScore: {$set: flag == undefined || flag==false ? true : false}}})
      }),()=>{
        if (position && type && (flag == undefined || flag==false)) {
          $("#input_"+position+"_"+type).focus();
          $("html").animate({ scrollTop: $("#Anchor_"+position+"_"+type).offset().top - 150 });
          if(id){
            let { ajustSore } = this.state;
            let obj = ajustSore.filter(obj => obj.id === id).length > 0;
            if(!obj){
              ajustSore.push({
                id,
                inputSore:0,
                desc:undefined,
                position:position,
                setTip:""
              })
            }
          }
        }
      }
    )
    // this.setState({
    //   score:undefined
    // })
  }

  inputScore=(value,id)=>{
    let { ajustSore } = this.state;
    var index = ajustSore.map(function (item) { return item.id; }).indexOf(id);
    let reg = /^[0-9]+.?[0-9]*$/;
    if(reg.test(value)==false){
      // this.setState({
      //   setTip:"请输入数字"
      // })
      this.setState(
        (prevState) => ({ 
          ajustSore : update(prevState.ajustSore, {[index]: { setTip: {$set: "请输入数字"}}})
        })
      )
      return;
    }else{
      // this.setState({
      //   setTip:"",
      //   score:value
      // })
      this.setState(
        (prevState) => ({ 
          ajustSore : update(prevState.ajustSore, {[index]: { inputSore: {$set: value},setTip:{$set: ""}}})
        })
      )
    }
  }
  changeScoreReasons=(e,id)=>{
    // console.log(e.target.value);
    // this.setState({
    //   setScoreReason:e.target.value
    // })
    let value =  e.target.value;
    let { ajustSore } = this.state;
    var index = ajustSore.map(function (item) { return item.id; }).indexOf(id);
    this.setState(
      (prevState) => ({ 
        ajustSore : update(prevState.ajustSore, {[index]: { desc: {$set: value}}})
      })
    )
  }
//确认调分
  setAction=(key,q_id,maxScore,oldScore)=>{
    let {ajustSore}=this.state;
    let list = ajustSore.filter(obj => obj.id == q_id);
    let index = ajustSore.map(function (item) { return item.id; }).indexOf(q_id);

    let score = list[0].inputSore;
    let setScoreReason = list[0].desc;
    let{ setTip }=this.state;
    if(!score && score != 0){
      // this.setState({
      //   setTip:"请输入分数"
      // })
      this.setState(
        (prevState) => ({ 
          ajustSore : update(prevState.ajustSore, {[index]: { setTip: {$set: "请输入分数"}}})
        })
      )
      return;
    }
    if(score < 0){
      // this.setState({
      //   setTip:"分数必须大于或者等于0"
      // })
      this.setState(
        (prevState) => ({ 
          ajustSore : update(prevState.ajustSore, {[index]: { setTip: {$set: "分数必须大于或者等于0"}}})
        })
      )
      return;
    }
    if(score > maxScore){
      // this.setState({
      //   setTip:"分数不能大于当前题目的分数"
      // })
      this.setState(
        (prevState) => ({ 
          ajustSore : update(prevState.ajustSore, {[index]: { setTip: {$set: "分数不能大于当前题目的分数"}}})
        })
      )
      return;
    }
    if(setTip==""){
      let url=`/exercise_questions/${q_id}/adjust_score.json`
      axios.post((url),{
        score:score,
        user_id:this.state.Id,
        comment:setScoreReason
      }).then((result)=>{
        if(result.status==200){
          this.props.showNotification('调分成功');
          this.getInfo();
          // let statusScore = score==0 ? 0 : score > 0 && score < maxScore ? 2 : 1;
          
          // this.setState(
          //   (prevState) => ({ 
          //     exercise_questions : update(prevState.exercise_questions, {[key]: { user_score: {$set: parseFloat(score).toFixed(1)},answer_status : {$set: statusScore},question_comments:{$set:result.data.question_comments} }}),
          //   })
          // )
          
          // this.setState(
          //   (prevState) => ({ 
          //     ajustSore : update(prevState.ajustSore, {[index]: { desc: {$set: undefined},inputSore:{ $set:undefined }}})
          //   })
          // )
          // let {exerciseTotalScore} = this.state;
          // let newScore = parseFloat(parseFloat(exerciseTotalScore)+parseFloat(score)-parseFloat(oldScore)).toFixed(1);
          // this.setState({
          //   exerciseTotalScore:newScore
          // })
          // this.showSetScore(key,true);
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
    
  }

  // 选择题，切换答案
  changeOption = (index,ids) =>{
    //console.log(index+"    "+ids);
    this.setState(
      (prevState) => ({ 
        exercise_questions : update(prevState.exercise_questions, {[index]: { user_answer: {$set: ids} }}),
      })
    )
  }

  //简答题 显示和隐藏答案
  changeA_flag=(index,status)=>{
    this.setState(
      (prevState) => ({ 
        exercise_questions : update(prevState.exercise_questions, {[index]: { a_flag: {$set: status} }})
      })
    )
  }

  //交卷和保存前判断是否有题未答
  checkExerciseNumber=(index)=>{
    let url= `/exercises/${this.props.match.params.Id}/begin_commit.json`;
    axios.get(url).then((result)=>{
      if(result){
        if(result.data.question_undo !=0 || result.data.shixun_undo !=0) {
          let tip="";
          if(result.data.question_undo !=0 && result.data.shixun_undo !=0){
            tip =`有 ${result.data.question_undo} 题未答，${result.data.shixun_undo} 实训未通关`;
          }else if(result.data.question_undo !=0 && result.data.shixun_undo ==0){
            tip =`有 ${result.data.question_undo} 题未答`;
          }else if(result.data.question_undo ==0 && result.data.shixun_undo !=0){
            tip =`有 ${result.data.shixun_undo} 实训未通关`;
          }
          this.setState({
            Modalstype:true,
            Modalstopval:tip,
            modalsBottomval:index === 0 ? `在${moment(result.data.end_time).format(format)}之前，允许修改答题` : `提交后无法再修改答题，是否确认提交？`,
            ModalCancel:this.cancelCommit,
            ModalSave:()=>this.sureCommitOrSave(index),
            Loadtype:index === 0 ? true :false
          })
        }else{
          this.setState({
            Modalstype:true,
            Modalstopval:index === 0 ? `在${moment(result.data.end_time).format(format)}之前，允许修改答题` : `提交后无法再修改答题，是否确认提交？`,
            modalsBottomval:undefined,
            ModalCancel:this.cancelCommit,
            ModalSave:()=>this.sureCommitOrSave(index),
            Loadtype:index === 0 ? true :false
          })
        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  //交卷
  commitExercise=()=>{
    this.checkExerciseNumber(1);
  }
  //保存
  saveExercise=()=>{
    this.checkExerciseNumber(0);
  }

  //确认交卷或者保存
  sureCommitOrSave=(index)=>{
    if(index===0){
      //确认保存
      this.cancelCommit();
      this.sureCommit();
    }else{
      //交卷
      let eId=this.props.match.params.Id;
      let url=`/exercises/${eId}/commit_exercise.json`;
      axios.post(url,{
				commit_method:1
			}).then((result)=>{
        if(result){
          this.setState({
            Modalstype:false,
            Modalstopval:undefined,
            modalsBottomval:undefined,
            ModalCancel:undefined,
            ModalSave:undefined,
            Loadtype:undefined
          })
          this.props.showNotification(`${result.data.message}`);
          this.getInfo();
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  cancelCommit=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:undefined,
      modalsBottomval:undefined,
      ModalCancel:undefined,
      ModalSave:undefined,
      Loadtype:undefined
    })
  }
  // 打回重做
  RepeatExercise=()=>{
    let status=parseInt(this.state.exercise.exercise_status);
    if(status === 3){
      this.setState({
        Modalstype:true,
        Modalstopval:'截止时间已到，无法打回试卷',
        modalsBottomval:'请在修改截止时间后再操作',
        ModalCancel:this.cancelCommit,
        ModalSave:this.cancelCommit,
        Loadtype:true
      })
    }else{
      this.setState({
        Modalstype:true,
        Modalstopval:'学生将得到一次重新答题的机会，现有的答题情况将被清空',
        modalsBottomval:'是否确认回退TA的试卷答题',
        ModalCancel:this.cancelCommit,
        ModalSave:this.sureRepeatExercise,
        Loadtype:false
      })
    }
  }
  sureRepeatExercise=()=>{
    let eId=this.props.match.params.Id;
    let user_id=this.state.Id;
    let url=`/exercises/${eId}/redo_exercise.json`
    axios.post((url),{
      user_ids:[user_id]
    }).then((result)=>{
      if(result){
        this.props.showNotification(`${result.data.message}`);
        //打回重做后跳转到答题列表页
        this.sureCommit();
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 返回
  returnBtn = () =>{
    let coursesId=this.props.match.params.coursesId;
    let eId=this.props.match.params.Id;
    this.props.history.push(`/courses/${coursesId}/exercises/${eId}/student_exercise_list?tab=0`)
  }

  deadline=(time)=>{
    if(time===null){
      this.setState({
        Datetime:0
      })
    }else{
      this.setState({
        Datetime:Date.now() + time * 1000
      })
      // return Date.now() + time * 1000 ;
    }

  }
  render(){
    let coursesId=this.props.match.params.coursesId;
    let eId=this.props.match.params.Id;

    let{
      data,
      questionPanelFixed,
      courseName,
      exercise,
      exercise_types,
      exercise_start_at,
      exercise_scores,
      exercise_questions,

      user_exercise_status,//试卷是否可以编辑

      exercise_answer_user,

      question_status,
      score,
      setScoreReason,
      setTip,
      time,
      hour,
      minute,
      second,

      Modalstype,
      Modalstopval,
      modalsBottomval,
      ModalCancel,
      ModalSave,
      Loadtype,
      exerciseTotalScore,
      isSpin,
      ajustSore
    }=this.state
    let isAdmin = this.props.isAdmin();
    let isStudent =this.props.isStudent();
    const { current_user } = this.props
    // console.log(data&&data.exercise.user_name)
		document.title=courseName&&courseName;

    return(
      <div className="newMain" style={{paddingTop:"0px"}}>
        <Spin size="large" spinning={isSpin}>
        <style>{`
          .inputNumber30{
            height:30px;
            width:115px;
          }
          .inputNumber30 .ant-input-number-input-wrap{
            line-height: 28px;
          }
          .inputNumber30 .ant-input-number-input-wrap .ant-input-number-input{
            height: 28px;
          }
          .setRadioStyle{
            width:100%;
            cursor:pointer;
          }
          .setRadioStyle > span:last-child{
            flex:1;
            display:flex;
          }
          .setRadioStyle .ant-radio,.setRadioStyle .ant-checkbox{
            height:16px;
            margin-top:5px;
          }
          .standardAnswer.editormd-html-preview,.answerStyle.editormd-html-preview{
            width:100%!important
          }
        `}</style>
        {/*<p style={{height:"60px"}}></p>*/}
        <Modals
            modalsType={Modalstype}
            modalsTopval={Modalstopval}
            modalsBottomval={modalsBottomval}
            modalCancel={ModalCancel}
            modalSave={ModalSave}
            loadtype={Loadtype}
          />
        <div className="educontent mt10 mb50">
          <p className="clearfix mb20">
            <WordsBtn style="grey" className="fl" to={current_user && current_user.first_category_url}>{courseName}</WordsBtn>
            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
            <WordsBtn style="grey" className="fl" to={`/courses/${coursesId}/exercises/${data && data.left_banner_id}`}>{data && data.left_banner_name}</WordsBtn>
            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
            <WordsBtn style="grey" to={`/courses/${coursesId}/exercises/${eId}/student_exercise_list?tab=0`} className="fl mr3">{data && data.left_banner_name}详情</WordsBtn>&gt;
            <span className="ml3">{exercise_answer_user&&exercise_answer_user.user_name}{data&&data.exercise.user_name}</span>
          </p>
          <p className="clearfix">
            <span className="color-grey-3 font-24 fl lineh-40" >{exercise && exercise.exercise_name}</span>

            <span className="fl mt8">
              <CoursesListType typelist={[`${statudmap[exercise && exercise.exercise_status]}`]} typesylename={""} />
            </span>
            {
              (isAdmin || ( isStudent && exercise && user_exercise_status == 1)) ?
              <WordsBtn className="fr font-16 lineh-40" style="grey" onClick={this.returnBtn}>返回</WordsBtn>
              :
              time && time != 0 ?
                <div className="fr">
                  <Countdown value={this.state.Datetime} onFinish={this.autoCommitExercise} />
                </div>
                :""
            }
            {/*<div className="fr remainingTime">*/}
            {/*  <li>{ hour >= 10 ? hour : '0'+hour}</li>*/}
            {/*  <span>:</span>*/}
            {/*  <li>{ minute >= 10 ? minute : '0'+minute}</li>*/}
            {/*  <span>:</span>*/}
            {/*  <li>{ second >= 10 ? second : '0'+second}</li>*/}
            {/*</div>*/}
            {
              isAdmin && <WordsBtn className="fr font-16 lineh-40 mr30" style="blue" onClick={this.RepeatExercise}>打回重做</WordsBtn>
            }
          </p>
          {
            exercise && exercise.exercise_description &&
            <p className="color-grey-3 edu-back-white padding15 mt30">{exercise.exercise_description}</p>
          }
          <p className="padding20-30 clearfix">
            {
              exercise_types && exercise_types.q_singles > 0 && 
              <span className="color-grey-9 mr15">单选题 {exercise_types.q_singles} 题,共 {exercise_types && exercise_types.q_singles_scores} 分</span>
            }
            {
              exercise_types && exercise_types.q_doubles > 0 && 
              <span className="color-grey-9 mr15">多选题 {exercise_types.q_doubles} 题,共 {exercise_types && exercise_types.q_doubles_scores} 分</span>
            }
            {
              exercise_types && exercise_types.q_judges > 0 && 
              <span className="color-grey-9 mr15">判断题 {exercise_types.q_judges} 题,共 {exercise_types && exercise_types.q_judges_scores} 分</span>
            }
            {
              exercise_types && exercise_types.q_nulls > 0 && 
              <span className="color-grey-9 mr15">填空题 {exercise_types.q_nulls} 题,共 {exercise_types && exercise_types.q_nulls_scores} 分</span>
            }
            {
              exercise_types && exercise_types.q_mains > 0 && 
              <span className="color-grey-9 mr15">简答题 {exercise_types.q_mains} 题,共 {exercise_types && exercise_types.q_mains_scores} 分</span>
            }
            {
              exercise_types && exercise_types.q_shixuns > 0 &&
              <span className="color-grey-9 mr15">实训题 {exercise_types.q_shixuns} 题,共 {exercise_types && exercise_types.q_shixuns_scores} 分</span>
            }
            <span className="color-grey-3 fr">共<span className="color-orange-tip"> {exercise_types &&exercise_types.q_scores} </span>分</span>
            <span className="color-grey-3 fr">合计<span className="color-blue"> {exercise_types &&exercise_types.q_counts} </span>题：</span>
          </p>
          <div className="edu-back-white">

            <div className={ questionPanelFixed==true ? "questionsfixed padding30":"questionsNo padding30"} style={{borderBottom:"none"}}>
              <span className="clearfix font-16">
                {
                  exercise_start_at && <span className="fl color-grey-9">开始答题时间：{ exercise_start_at && moment(exercise_start_at).format(format) }</span>
                }
                { 
                  (isAdmin || (isStudent && exercise && exercise.exercise_status == 3)) && exerciseTotalScore && 
                  <span className="color-grey-9 fr">总分：<span className="color-orange-tip"> { exerciseTotalScore }</span> 分</span>
                }
              </span> 
              {
                // 老师身份 || 学生身份且试卷已经截止
                (isAdmin || (isStudent && exercise && exercise.exercise_status == 3)) &&
                <div className="mt10">
                  {
                    exercise_scores && exercise_scores.objective_scores && exercise_scores.objective_scores.length > 0 &&
                    <div>
                      <p className="clearfix">
                        <span className="font-16 mr40">客观题</span>
                        <span className="mr40 answerTure">正确</span>
                        <span className="mr40 answerFalse">错误</span>
                        <span className="mr40 answerHalf">部分得分</span>
                      </p>
                      <ul className="clearfix leaderMainNav mb20">
                        {
                          exercise_scores.objective_scores.map((item,key)=>{
                            return(
                              <a className={item.answer_status==1? "acted" : item.answer_status==2? "half" :""} onClick={()=>this.scrollToAnchor(`${item.ques_position}`)}>{item.ques_position}</a>
                            )
                          })
                        }
                      </ul>
                    </div>
                  }
                  {
                    exercise_scores && exercise_scores.subjective_scores.length > 0 && 
                    <div>
                      <p className="clearfix">
                        <span className="font-16 mr40">主观题</span>
                        <span className="mr40 answered">已评</span>
                        <span className="unanswer">未评</span>
                      </p>
                      <ul className="clearfix leaderNav">
                        {
                          exercise_scores.subjective_scores.map((item,key)=>{
                            return(
                              <a className={item.answer_status==0 ? "" : "acted"} onClick={()=>this.scrollToAnchor(`${item.ques_position}`)}>{item.ques_position}</a>
                            )
                          })
                        }
                      </ul>
                    </div>
                  }
                </div>
              }             
              
              {
                //学生身份 且试卷还未截止
                isStudent && exercise && exercise.exercise_status == 2 ?
                <div className="mt20">
                  <p className="clearfix">
                    <span className="mr40 answered ml20">已答</span>
                    <span className="unanswer">未答</span>
                  </p>
                  <ul className="clearfix leaderNav">
                    {
                      question_status && question_status.map((item,key)=>{
                        return(
                          <a className={item.ques_status == 1 ? "acted" : ""} onClick={()=>this.scrollToAnchor(`${item.ques_number}`)}>{item.ques_number}</a>
                        )
                      })
                    }
                  </ul>
                </div>:""
              }
            </div>
            {/* 试卷题目 */}
            <div>
              {
                exercise_questions && exercise_questions.map((item,key)=>{
                  let list = ajustSore && ajustSore.filter(obj => obj.id === item.question_id);
                  return(
                    <div className="bor-top-greyE pt30 pb30" id={"Anchor_"+parseInt(key+1)}>
                      <p className="clearfix font-16 pl30 pr30">
                        <span className="color-blue mr5">{item.q_position}、{type[item.question_type]}</span><span className="color-grey-9 mr5">({item.question_score}分)</span>
                        <span className="fr">
                          {
                            // 填空(一直都有调分)，和简答题调分：老师身份 已经评分的才能出现调分按钮
                            isAdmin && ((parseInt(item.answer_status) != 0 && item.question_type == 4) || item.question_type == 3 || item.question_type == 1) ? 
                            <WordsBtn style="blue" className="ml20 font-16 fl" onClick={()=>this.showSetScore(key,item.setScore,item.q_position,item.question_type,item.question_id)}>调分</WordsBtn>:""
                          }
                          {
                            // 简答题，未评分的显示未批
                            isAdmin && parseInt(item.answer_status) == 0 && item.question_type == 4 ? 
                            <span className="color-red fl ml20">未批</span>:""
                          }
                          {
                            // 客观题：老师||学生（试卷已截止且答案公开）显示正确答案
                            item.question_type < 3 && item.standard_answer_show ?
                            <span className="font-16 fl ml20">
                              正确答案：{ item.standard_answer_show }
                            </span>:""
                          }
                          {
                            //(老师身份且除实训题外) || (学生身份且试卷已经截止)就显示用户当前题目所得分数
                          ( isAdmin || (isStudent && exercise.exercise_status == 3)) && item.question_type != 5 && item.user_score ?
                            <span className="font-16 ml20 fl">
                              <span><span className={parseInt(item.answer_status) == 0 ?"color-red":parseInt(item.answer_status) == 1 ?"color-green":"color-orange-tip"}>{item.user_score}</span> 分</span>
                            </span> : ""
                          }
                          {
                            //实训题 ，答题
                            item.question_type == 5 &&
                            <a href={"/shixuns/"+item.shixun_identifier+"/challenges"} target="_blank" class="font-16 color-blue fl" target={"_blank"}>实训详情</a>
                          }
                        </span>
                      </p>
                      <li className="break_word mt15 mb15 pl30 pr30">
                        {/* <p className="standardAnswer markdown-body" dangerouslySetInnerHTML={{__html: markdownToHTML1(item.question_type == 5 ? item.shixun_name : item.question_title).replace(/▁/g,"▁▁▁")}}></p> */}
                         <MarkdownToHtml content={(item.question_type == 5 ? item.shixun_name : item.question_title)} selector={'answer_' + key} 
                             className="standardAnswer"
                        ></MarkdownToHtml>
                      </li>
                      {
                        // 选择题和判断题共用
                        (item.question_type == 0 || item.question_type == 2) && 
                        <Single 
                        {...this.props} 
                        {...this.state} 
                        exercise={exercise}
                        questionType={item}
                        user_exercise_status={user_exercise_status}
                        changeOption={(index,ids)=>this.changeOption(index,ids)}
                        changeQuestionStatus={(No,flag)=>this.changeQuestionStatus(No,flag)}
                        index={key}
                        ></Single>
                      }
                      {
                        // 多选题
                        item.question_type == 1 &&
                          <Multiple 
                          {...this.props} 
                          {...this.state} 
                          exercise={exercise}
                          questionType={item}
                          user_exercise_status={user_exercise_status}
                          changeOption={(index,ids)=>this.changeOption(index,ids)}
                          changeQuestionStatus={(No,flag)=>this.changeQuestionStatus(No,flag)}
                          index={key}

                          ></Multiple>
                      }
                      {
                        // 填空题
                        item.question_type == 3 &&
                        <FillEmpty 
                        {...this.props} 
                        {...this.state} 
                        exercise={exercise}
                        questionType={item}
                        user_exercise_status={user_exercise_status}
                        changeQuestionStatus={(No,flag)=>this.changeQuestionStatus(No,flag)}
                        index={key}

                        ></FillEmpty>
                      }
                      {
                        // 简答题
                        item.question_type == 4 &&
                        <SimpleAnswer 
                        {...this.props} 
                        {...this.state} 
                        exercise={exercise}
                        questionType={item}
                        user_exercise_status={user_exercise_status}
                        changeQuestionStatus={(No,flag)=>this.changeQuestionStatus(No,flag)}
                        changeA_flag={(index,status)=>this.changeA_flag(index,status)}
                        index={key}
                        ></SimpleAnswer>
                      }
                      {
                        // 实训题
                        item.question_type == 5 &&
                        <ShixunAnswer 
                        {...this.props} 
                        {...this.state} 
                        exercise={exercise}
                        questionType={item}
                        user_exercise_status={user_exercise_status}
                        id={this.state.Id}
                        index={key}

                        ></ShixunAnswer>
                      }
                      
                    {
                      //调分理由部分
                      item.question_comments && item.question_comments.comment && (item.question_type == 3 || item.question_type == 4 || item.question_type == 1) && 
                      <div className="ml30 mr30 bor-top-greyE pt30 mt20 clearfix df">
                        <img src={getImageUrl(`images/${item.question_comments.user_picture}`)} width="48" height="48" className="radius mr10"/>
                        <div className="flex1">
                          <li className="lineh-20 mb7">
                            <span className="color-grey-3 mr20">{item.question_comments.user_name}</span>
                            <span className="color-grey-9 mr20">{moment(item.question_comments.updated_at).format(format)}</span>
                          </li>
                          <li className="break_word lineh-20">{item.question_comments.comment}</li>
                        </div>
                      </div>
                    }
                    {
                      // 调分输入部分
                      isAdmin && ((item.setScore && item.question_type == 3) || (item.setScore && item.question_type == 1) || ((item.setScore || parseInt(item.answer_status) == 0) && item.question_type == 4))?
                        <div className="ml30 mr30 bor-top-greyE pt20 mt20" id={`${"Anchor_"+item.q_position+"_"+item.question_type}`}>
                          <div className="edu-txt-right">
                            <span><span className="color-red">*</span>调分：</span>
                            <li className="fr">
                              <p>
                                <InputNumber 
                                  placeholder="请填写分数" 
                                  min={0} 
                                  // max={item.question_score} 
                                  value={list && list.length>0 && list[0].inputSore} 
                                  step={0.1} 
                                  precision={1}
                                  className={ list && list.length>0 && list[0].setTip !="" ? "edu-txt-center winput-115-40 fl mt3 noticeTip inputNumber30" : "edu-txt-center winput-115-40 fl mt3 inputNumber30"} 
                                  onChange={(value)=>this.inputScore(value,item.question_id)}
                                  id={`${"input_"+item.q_position+"_"+item.question_type}`}
                                ></InputNumber>
                                <span className="ml5">分</span>
                                {
                                  parseInt(item.answer_status) == 0 && item.question_type == 4 ? <span className="color-red ml10 font-16">未评分</span> : ''
                                }
                                <ActionBtn style="blue" className="middle ml20" onClick={()=>this.setAction(key,item.question_id,item.question_score,item.user_score)}>确认</ActionBtn>
                              </p>
                              {
                                list && list.length > 0 && list[0].setTip !="" ? <p className="color-red edu-txt-left">{ list[0].setTip }</p> :""
                              }
                            </li>
                          </div>
                        <Textarea className="winput-100-150 mt20" value={list && list.length>0 && list[0].desc} style={{height:"180px"}} maxLength="100" onChange={(e)=>this.changeScoreReasons(e,item.question_id)} placeholder="请您输入评语，最大限制100个字符"></Textarea>
                        </div>:""
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            isStudent && user_exercise_status == 0 ?
            <p className="edu-txt-right mt20 clearfix">
              <a className="defalutSubmitbtn fr" onClick={this.commitExercise}>交卷</a>
              <a className="defalutCancelbtn fr mr20" onClick={this.saveExercise}>保存</a>
              {
                exercise && time != null ?
                <span className="color-grey-9 font-12 mr20 fr lineh-40">保存或者离开页面后，系统将持续计时，到达时长系统将自动交卷</span>
                :""
              }
            </p>:""
          }
        </div>
        </Spin>
      </div>
    )
  }
}
export default ExerciseReviewAndAnswer