import React,{ Component } from "react";
import { Pagination , Spin } from "antd";
import NoneData from "../coursesPublic/NoneData"

import '../css/members.css'
import '../css/busyWork.css'
import './pollStyle.css'
import update from 'immutability-helper'

import axios from 'axios'
const map={1:"单选题",2:"多选题",3:"主观题",4:"主观题"}
class PollDetailTabSecond extends Component{
  constructor(props){
    super(props);
    this.state={
      page:1,
      limit:10,
      questions:undefined,
      questionsInfo:undefined,
      isSpin:false
    }
  }
  getInfo=(page)=>{
    this.setState({
      isSpin:true
    })
    let pollId=this.props.match.params.pollId;
    let url=`/polls/${pollId}/commit_result.json?page=${page}`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
					page: page,
          questions:result.data.questions,
          questionsInfo:result.data.question_types,
          isSpin:false
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  componentDidMount=()=>{
    let{page}=this.state;
    this.getInfo(page);
  }

  //翻页
  changePage=(pageNumber)=>{
    this.getInfo(pageNumber);
  }

  changeTxtStatus=(index,flag)=>{
    console.log(index+"   "+flag)
    this.setState(
      (prevState) => ({ 
        questions:update(prevState.questions, {[index]:{question:{ txt_status: {$set: !flag} }}})
      })
    )
    console.log(this.state.questions[index].question)
  }

  render(){
		let {page, limit, questions, questionsInfo , isSpin} = this.state;
    return(
      <Spin size="large" spinning={ isSpin }>
      <React.Fragment>
        {
          questions && questions.length>0 && questions.map((item,key)=>{
            return(
            <div className="edu-back-white mb10">
              <div className="pt20 pl30 pr30 pb10">
                <span className="font-16 clearfix">
                  <span className="color-blue fl">{parseInt(page-1)*parseInt(limit)+(key+1)}、{map[item.question.question_type]}</span>
                  { item.question.is_necessary==1 ? <span className="mustAnswer fl ml10 mr10 mt6">必答</span>:"" }
                  { item.question.question_type == 2 && item.question.min_choices && item.question.max_choices ? 
                  <span className="color-grey-9">
                    {
                      item.question.min_choices == item.question.max_choices ? "可选"+item.question.max_choices+"项" :
                      "可选"+item.question.min_choices+"-"+item.question.max_choices+"项"
                    }
                  </span>:""
                  }
                </span>
								<p className="mt10 font-16">
                  <span className=" flex1" style={{
										"white-space": "pre-wrap",
										"word-break": "break-all",
										"word-wrap": "break-word"
									}}>
                  {item.question.question_title}
                  </span>
								</p>
              </div>
              <div className="countList">
                <p className="countHeader">
                  {
                    item.question.question_type==3?
                    <ul className="clearfix df">
                      <span style={{width:"6%"}}>编号</span>
                      <span style={{width:"50%",textAlign:"left"}}>文本答案</span>    
                    </ul>
                    :
                    <ul className="clearfix">
                      <span>选项</span>  
                      <span>小计</span>  
                      <span>百分比</span>  
                    </ul>
                  }
                  
                </p>
                {/* 主观题 */}
                {
                  item.question.question_type == 3 && item.question.vote_text &&
                  <React.Fragment>
                    {
                      item.question.vote_text.map((txt,t)=>{
                        return(
                          <div className="countBody">  
                            <ul className="clearfix df">
                              <span style={{width:"6%"}} className="pl8">{t+1}</span>
                              <span className="color-grey-3 break-word edu-txt-left flex1">
                                <li>{txt}</li>
                              </span>
                            </ul>
                          </div>
                        )
                      })
                    }
                  </React.Fragment>
                }
                {/* 单选和多选 */}
                {
                  item.question.question_type != 3 && item.question.answers && item.question.answers.map((options,k)=>{
                    return(
                    <div className="countBody">                      
                      <ul className="clearfix">
                        <span className="color-grey-3 break-word">
                          { options.answer_text=="其他" ? "其他" : options.answer_text }
                          {
                            options.answer_text=="其他" && item.question.vote_text && item.question.vote_text.length > 0 ? 
                            <a className="ml40 color-orange-tip" onClick={()=>this.changeTxtStatus(key,item.question.txt_status)}>{!item.question.txt_status ?"隐藏":"显示"}文本回答</a>
                            :""
                          }
                        </span>  
                        <span className="color-green">{options.answer_users_count}</span>  
                        <span>
                          <p className="percentForm fl mr15">
                            <span className="percentValue" style={{"width":`${(options.answer_percent * 100).toFixed(1)}%`}}></span>
                          </p>
                          <font className="color-grey-9">{(options.answer_percent * 100).toFixed(1)}%</font>
                        </span>
                      </ul>
                      {
                        options.answer_text=="其他" && (!item.question.txt_status || !item.question.txt_status ==true) && item.question.vote_text && item.question.vote_text.length>0 && 
                        <div className="answerTxt">
                          {
                            item.question.vote_text.map((i,j)=>{
                              return(
                                <p className="font-16 mb5">{j+1}.{i}</p>
                              )                          
                            })
                          }
                        </div>
                      }
                    </div>
                    )
                  })
                }
                <div className="countBody">
                  <ul className="clearfix">
                    <span className="color-grey-6">有效填写量</span>  
                    <span className="color-grey-3">{item.question.commit_users_count}</span>
                  </ul>
                </div>
              </div>
            </div> 
            )
          })
        }
        {
          questions && questions.length == 0 && <div className="edu-back-white"><NoneData></NoneData></div>
        }
        {
					questionsInfo && questionsInfo.q_counts > limit &&
          <div className="edu-txt-center mt20 mb50">
						<Pagination showQuickJumper current={page} total={questionsInfo.q_counts} pageSize={limit}
												onChange={this.changePage}></Pagination>
          </div>
        }
        
      </React.Fragment>
      </Spin>
    )
  }
}
export default PollDetailTabSecond;