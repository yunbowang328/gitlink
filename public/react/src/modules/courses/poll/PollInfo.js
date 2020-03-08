import React,{ Component } from "react";
import {Checkbox,Radio, Input} from "antd";

import '../css/members.css'
import '../css/busyWork.css'
import './pollStyle.css'

import moment from 'moment'
import { WordsBtn } from 'educoder'
import Modals from '../../modals/Modals'
import CoursesListType from '../coursesPublic/CoursesListType';

import axios from 'axios';

const map={1:"单选题",2:"多选题",3:"主观题"}
const statudmap={1:"未发布",2:"提交中",3:"已截止"}
class PollInfo extends Component{
  constructor(props){
    super(props);
    this.state={
      courseName:undefined,
      poll:undefined,
      question_answered:undefined,
      question_types:undefined,
      questions:undefined,
      inputArray:[],
      modalsType:false,
      modalsTopval:undefined,
      modalsBottomval:undefined,
      loadtype:true,
      modalSave:undefined,
      questionPanelFixed:false,
      pollAnswerList:[]
    }
  }
  componentDidUpdate (prevProps) {
    // 需要等get_user_info执行完才能getInfo
    if (!prevProps.current_user && this.props.current_user) {
      this.getInfo()
    }
  }

  
  componentDidMount(){
    if(this.props.current_user){
      this.getInfo();
    }

    //window.addEventListener('scroll', this.handleScroll);	
  }
  
  // 滚动定位
  handleScroll=()=>{
    if(parseInt(window.scrollY)>230){
      this.setState({
        questionPanelFixed:true
      })
    }else{
      this.setState({
        questionPanelFixed:false
      })
    }
  }

  scrollToAnchor=(index)=>{
    let name="Anchor_"+index;
    if (index) {
      let anchorElement = document.getElementById(name);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  getInfo=()=>{
    this.setState({
      courseName:this.props.current_user.course_name
    })
    let pollId=this.props.match.params.pollId;
    let user_id=this.props.match.params.login;
    let url=`/polls/${pollId}/start_answer.json?login=${user_id}`
    axios.get(url).then((result)=>{
      if(result.status==200){
        this.setState({
          poll:result.data.poll,
          question_answered:result.data.question_answered,
          question_types:result.data.question_types,
          questions:result.data.questions
        })

        let list=[];
        for(var i=0;i<result.data.questions.length;i++){
          list.push({
            id:result.data.questions[i].question.id,
            text:result.data.questions[i].question.poll_vote_texts || "",
            is_necessary:result.data.questions[i].question.is_necessary,
            answers:result.data.questions[i].question.poll_answer_ids,
            answersList:result.data.questions[i].question.answers
          })
        }

        this.setState({
          inputArray:list
        })
      }

    }).catch((error)=>{
      console.log(error);
    })
  }

  //选中选择题(单选题)选项保存
  ChangeOptionSingle=(item)=>{
    let arr=item.target.name
    let txt=Object.assign({}, this.state.inputArray[parseInt(arr[1])]);
    let ids=item.target.value;
    let list=txt.answersList.filter(element => element.answer_id == ids);
    
    this.postAnswer(arr[0],ids,list[0].answer_text=="其他"?txt.text:"",arr[1]);
  }

  //选中选择题(多选题)选项保存 
  ChangeOptionMuntil=(a_id,q_id,key)=>{
    let ind=Object.assign({}, this.state.inputArray[parseInt(key)]);
    let count=0;
    a_id.forEach(element => {
      let list=ind.answersList.filter(item=>item.answer_id==element);
      if(list[0].answer_text=="其他"){
        count++;
      }
    });

    this.postAnswer(q_id,a_id,count > 0 ? ind.text : "",key);
  }

  postAnswer=(q_id,a_id,text,key)=>{
    let url=`/poll_questions/${q_id}/poll_votes.json`;
    console.log(text);
    axios.post(url,{
      poll_answer_id:a_id,
      vote_text:text
    }).then((result)=>{
      if(result){
        const answer=Object.assign({}, this.state.question_answered[parseInt(key)]);
        answer.ques_status=result.data.poll_vote.question_status;
        const question_answered=this.state.question_answered;
        question_answered[parseInt(key)]=answer

        const inputs=Object.assign({}, this.state.inputArray[parseInt(key)]);
        inputs.answers=a_id;
        const inputArray=this.state.inputArray;
        inputArray[parseInt(key)]=inputs;

        this.setState({
          question_answered,
          inputArray
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  //输入其它--内容
  blurTxt=(e)=>{
    let index=parseInt(e.target.name)

    const list = Object.assign({}, this.state.inputArray[index])
    list.text=e.target.value;
    const inputArray=this.state.inputArray;
    inputArray[index]=list

    this.setState({
      inputArray
    })
  }


  //输入其它--内容后重新保存
  saveInputAndAnswer=(e,a_id,q_id,key,type)=>{
    const inputs=Object.assign({}, this.state.inputArray[parseInt(key)]);
    let answers=inputs.answers;
    let flag=true;
    if(answers.length){
      flag=answers.indexOf(a_id) > -1?true:false;
      answers= type == 1 ? answers[0] : answers;
    }else{
      flag = answers==a_id?true:false;
    }
    if(answers && (answers.length>0 || answers !="")){
      this.postAnswer(q_id,answers,flag ? inputs.text : "",key);
    }
  }

  //提交主观题
  commitText=(key,q_id)=>{
    const text = Object.assign({}, this.state.inputArray[key]).text;
    
    let url='/poll_questions/'+q_id+'/poll_votes.json?';

    const ans=Object.assign({}, this.state.question_answered[key]);
    ans.ques_status=text ? 1 : 0 ;
    const questionAnswered=this.state.question_answered;
    questionAnswered[key]=ans
    this.setState({
      question_answered:questionAnswered
    })

    if(text!=undefined){
      axios.post((url),{
        vote_text:text
      }).then((result)=>{
        if(result.status==200){
          const answer=Object.assign({}, this.state.question_answered[key]);
          answer.ques_status=result.data.poll_vote.question_status;
          const question_answered=this.state.question_answered;
          question_answered[key]=answer
          this.setState({
            question_answered
          })
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
    
  }

  // 提交
  submitPoll=()=>{
    let {inputArray,question_answered}=this.state;
    let must=0;
    let may=0;
    for(var j=0;j<question_answered.length;j++){
      if(question_answered[j].ques_status==0){
        if(inputArray[j].is_necessary==1){
          must++;
        }else{
          may++;
        }
      }
    }
    if(must>0){
      this.setState({
        modalsType:true,
        modalsTopval:"有 "+must+" 题必答题未答，无法提交 ",
        modalsBottomval:"请完成全部必答题后再提交",
        loadtype:true,
        modalSave:this.cancelSubmit
      })
      return;
    }
    if(may >= 0){
      this.setState({
        modalsType:true,
        modalsTopval: may>0 ? "有 "+may+" 题未答":"",
        modalsBottomval:"提交后无法再修改答题，是否确认提交？",
        loadtype:false,
        modalSave:this.sureSubmit
      })
    }
  }

  
  cancelSubmit=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:""
    })
  }

  
  sureSubmit=()=>{
    let pollId=this.props.match.params.pollId;
    let url=`/polls/${pollId}/commit_poll.json`
    axios.post(url).then((result)=>{
      if(result.status == 200){
        this.props.showNotification(result.data.message)
        this.setState({
          modalsType:false,
          modalsTopval:"",
          modalsBottomval:""
        })
        window.location.href=`/courses/${this.props.match.params.coursesId}/polls/${pollId}/detail`
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  render(){
    let coursesId=this.props.match.params.coursesId;
    let{poll,question_answered,question_types,questions,courseName,
      inputArray,
      modalsType,
      modalsTopval,
      loadtype,
      modalsBottomval,
      modalSave,
      questionPanelFixed
    }=this.state;
		const { current_user } = this.props
    let isAdmin=this.props.isAdmin();
    let isStudent=this.props.isStudent();
		document.title=courseName&&courseName;
    return(
      <div className="newMain" style={{paddingTop:"0px"}}>
        {/*<p style={{height:"60px"}}></p>*/}
        <Modals
          modalsType={modalsType}
          modalsTopval={modalsTopval}
          modalsBottomval={modalsBottomval}
          loadtype={loadtype}
          modalCancel={this.cancelSubmit}
          modalSave={modalSave}
        ></Modals>
        <div className="educontent mt10 mb50">
          <p className="clearfix mb20">
            <WordsBtn style="grey" className="fl" to={current_user && current_user.first_category_url}>{courseName}</WordsBtn>
            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
            <WordsBtn style="grey" className="fl" to={`/courses/${this.props.match.params.coursesId}/polls/${poll && poll.left_banner_id}`}>问卷</WordsBtn>
            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
            <WordsBtn style="grey" to={`/courses/${coursesId}/polls/${this.props.match.params.pollId}/detail`} className="fl mr3">问卷详情</WordsBtn>&gt; 
            <span className="ml3">{question_types&&question_types.user_name}</span>
          </p>
          <p className="clearfix mb20">
            <span className="color-grey-3 font-24 fl task-hide break-word" style={{maxWidth:"900px",lineHeight:"30px"}}>{poll && poll.polls_name}</span>
            <CoursesListType typelist={[`${statudmap[poll && poll.poll_status]}`]} typesylename={""} />
            {
              isAdmin || (poll && poll.user_poll_status == 1) ? <WordsBtn className="fr font-16 mt5" style="grey" to={`/courses/${coursesId}/polls/${this.props.match.params.pollId}/detail`}>返回</WordsBtn> :''
            }
            
          </p>
          {
            poll && poll.polls_description &&
            <p style={{backgroundColor:"#F2F9FF",whiteSpace:"pre-wrap"}} className="color-blue pl30 pr30 pt15 pb15">{poll.polls_description}</p>
          }
          <div className="edu-back-white">
            <p className="padding20-30 bor-bottom-greyE">
              {
                question_types && question_types.q_counts > 0 &&
                <span className="color-grey-3">合计{question_types.q_counts}题：</span>
              }
              {
                question_types && question_types.q_singles > 0 &&
                <span className="color-grey-9 mr15">单选题{question_types.q_singles}题</span>
              }
              {
                question_types && question_types.q_doubles > 0 &&
                <span className="color-grey-9 mr15">多选题{ question_types && question_types.q_doubles }题</span>
              }
              {
                question_types && question_types.q_mains > 0 &&
                <span className="color-grey-9">主观题{question_types &&question_types.q_mains}题</span>
              }
            </p>
            
            <div className={ questionPanelFixed==true ? "questionsfixed":"questionsNo"}>
              <p className="clearfix pl20">
                <span className="mr40 answered">已答</span>
                <span className="unanswer">未答</span>
                <span className="color-grey-9 fr">截止时间 {poll && moment(poll.end_time).format("YYYY-MM-DD HH:mm")}</span>
              </p>
              <ul className="clearfix leaderNav">
                {
                  question_answered && question_answered.map((item,key)=>{
                    return(
                      <React.Fragment>
                      {
                        <a className={item.ques_status==1? "acted" : ""} onClick={()=>this.scrollToAnchor(`${key}`)}>{item.ques_number}</a>
                      }
                      </React.Fragment>
                    )
                  })
                }
              </ul>
            </div>

            <div>
              {
                questions && questions.map((item,key)=>{
                  return(
                    <div className="previewList" id={'Anchor_'+`${key}`}>
                      <div className="pl30 pr30 mt30 mb10 clearfix">
                        <span className="color-blue fl font-16">{item.question.question_number}、{map[item.question.question_type]}</span>
                        { item.question.is_necessary==1 ? <span className="mustAnswer fl ml10 mr10 mt5">必答</span>:<span className="mustAnswer fl ml10 mr10 mt5">选答</span> }
                        { item.question.question_type == 2 && item.question.min_choices && item.question.max_choices ? 
                          <span className="color-grey-9 font-14 fl mt2">
                            {
                              item.question.min_choices == item.question.max_choices ? "可选"+item.question.max_choices+"项" :
                              "可选"+item.question.min_choices+"-"+item.question.max_choices+"项"
                            }
                          </span>:""
                        }
                      </div>
											<p className="pl30 pr30 mb10 "><span className="font-14  flex1" style={{
												"white-space": "pre-wrap",
												"word-break": "break-all",
												"word-wrap": "break-word"
											}}>{item.question.question_title}</span></p>
                      {
                        //单选
                        item.question.question_type==1 && 
                        <Radio.Group  disabled={isAdmin || (isStudent && poll && poll.user_poll_status == 1)?true:false} className="answerList" defaultValue={item.question.poll_answer_ids[0]} name={[item.question.id,key]} onChange={this.ChangeOptionSingle}>
                          {
                            item.question.answers &&  item.question.answers.map((i,k)=>{
                              return(
                                <li className={i.answer_text=="其他"?"df clearfix":"clearfix"}>
                                  <Radio name={[item.question.id,key]} className="fl" value={i.answer_id} ></Radio>
                                  <span className="break-word fl" style={{maxWidth:"1116px"}}>{i.answer_text}</span>
                                  {
                                    i.answer_text=="其他" ?
                                    <React.Fragment>
                                    {
                                      inputArray && inputArray.map((j,k)=>{
                                        return(
                                          <React.Fragment>
                                          {
                                            j.id == item.question.id ? 
                                            <Input  type="text" className="otherTxt" autoComplete="off" value={j.text && j.text} name={key} 
                                            onInput={this.blurTxt}
                                            onBlur={(e)=>this.saveInputAndAnswer(e,i.answer_id,item.question.id,key,item.question.question_type)}
                                            /> 
                                            : ""
                                          }
                                          </React.Fragment>
                                        )
                                      })
                                    }
                                    </React.Fragment>
                                    : ""
                                  }
                                </li>
                              )
                            })
                          }
                        </Radio.Group>
                      }
                      {
                        //多选
                        item.question.question_type==2 && 
                        <Checkbox.Group  
                        onChange={(value)=>this.ChangeOptionMuntil(value,item.question.id,key)} 
                        disabled={isAdmin || (isStudent && poll && poll.user_poll_status == 1)?true:false} 
                        defaultValue={item.question.poll_answer_ids} 
                        className="answerList" 
                        name={key}>
                          {
                            item.question.answers &&  item.question.answers.map((i,k)=>{
                              return(
                                <li className={i.answer_text=="其他"?"df clearfix":"clearfix"}>
                                  <Checkbox className="fl mr8" value={i.answer_id} key={i.answer_id}></Checkbox>
                                  <span className="break-word fl" style={{maxWidth:"1116px"}}>{i.answer_text}</span>
                                  {
                                    i.answer_text=="其他"?
                                    <React.Fragment>
                                      {
                                        inputArray && inputArray.map((j,k)=>{
                                          return(
                                            <React.Fragment>
                                            {
                                              j.id == item.question.id ? 
                                              <Input  type="text" className="otherTxt" autoComplete="off" value={j.text && j.text} name={key} 
                                              onInput={this.blurTxt} 
                                              onBlur={(e)=>this.saveInputAndAnswer(e,i.answer_id,item.question.id,key,item.question.question_type)}
                                              /> 
                                              : ""
                                            }
                                            </React.Fragment>
                                          )
                                        })
                                      }
                                    </React.Fragment>
                                    :""
                                  }
                                </li>
                              )
                            })
                          }
                        </Checkbox.Group>
                      }
                      {
                        //主观题
                        item.question.question_type==3 && 
                        <div className="mt10 pl30 pr30 pb20">
                          {
                            inputArray && inputArray.map((j,k)=>{
                              return(
                                <React.Fragment>
                                {
                                  j.id == item.question.id ? 
                                  <textarea placeholder="在此填入答案" disabled={isAdmin || (isStudent && poll && poll.user_poll_status == 1) ? true:false} value={j.text && j.text} className="winput-100-130" name={key} onInput={this.blurTxt} onBlur={()=>this.commitText(key,item.question.id)}></textarea>
                                  : ""
                                }
                                </React.Fragment>
                              )
                            })
                          }
                        </div>
                      }
                      
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            isStudent && poll && poll.user_poll_status == 0 ? 
            <div className="mt30 mb50">
              <a type="primary" className="defalutSubmitbtn" onClick={this.submitPoll}>提交</a>
            </div>
            :""
          }
        </div>
      </div>
    )
  }
}
export default PollInfo;