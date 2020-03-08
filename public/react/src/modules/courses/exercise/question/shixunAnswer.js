import React,{ Component } from "react";
import {InputNumber,Table} from "antd";
import TPMMDEditor from '../../../../modules/tpm/challengesnew/TPMMDEditor'
import {Link} from 'react-router-dom';
import {UnControlled as CodeMirror} from 'react-codemirror2';

import axios from 'axios'

import update from 'immutability-helper'

import {markdownToHTML} from 'educoder'
import ShixunAnswerDetail from './shixunAnswerDetail'

const $ = window.$;
class shixunAnswer extends Component{
  constructor(props){
      super(props);
      this.state={
        scoreList:[],
        data:[],
        challenge:[],
        dataCopy:[]
      }
  }

  componentDidUpdate =(prevState)=>{
    if(this.props.questionType && !prevState.questionType && prevState.questionType !=this.props.questionType ){
      this.showInfo();
    }
  }

  componentDidMount =()=>{
    this.showInfo();
  }

  showInfo=()=>{
    let data =[];
    // let details=[{
    //   "shixun_challenge_id": 16,
    //   "stage_list": {
    //     "position": 1,
    //     "name": "链表节点的初始化",
    //     "evaluate_count": 0,
    //     "finished_time": 0,
    //     "time_consuming": 0,
    //     "myself_experience": 0,
    //     "experience": 0,
    //     "user_score": 0,
    //     "game_score": 15
    //   },
    //   "shixun_detail": [{
    //     "position": 1,
    //     "game_identifier": "kpb4fygmeo8h",
    //     "path": "src/step1/charIO.cpp",
    //     "st": 0,
    //     "name": "重要的事情说三遍",
    //     "outputs": [
    //         {
    //             "position": 1,
    //             "output_detail": "compile successfully"
    //         }
    //     ],
    //     "passed_code": "// 包含标准输入输出函数库\n#include <stdio.h>\n\n// 定义main函数\nint main()\n{\n    // 请在此添加‘重要的事情说三遍’的代码\n    /********** Begin *********/\n    char x = getchar();\n    putchar(x);\n    putchar(x);\n    putchar(x);\n    putchar('!');\n\n    /********** End **********/\n    return 0;\n}\n"
    //   }]
    //   },{
    //   "shixun_challenge_id": 16,
    //   "stage_list": {
    //       "position": 1,
    //       "name": "重要的事情说三遍",
    //       "evaluate_count": 1,
    //       "finished_time": "2017-10-25 08:54",
    //       "time_consuming": "29天 18小时 15分钟 50秒",
    //       "myself_experience": 100,
    //       "experience": 100,
    //       "user_score": 5,
    //       "game_score": 5
    //     },
    //     "shixun_detail": [{
    //       "position": 2,
    //       "game_identifier": "kpb4fygmeo8h",
    //       "path": "src/step1/charIO.cpp",
    //       "st": 0,
    //       "name": "重要的事情说三遍",
    //       "outputs": [
    //           {
    //               "position": 1,
    //               "output_detail": "compile successfully"
    //           }
    //       ],
    //       "passed_code": "// 包含标准输入输出函数库\n#include <stdio.h>\n\n// 定义main函数\nint main()\n{\n    // 请在此添加‘重要的事情说三遍’的代码\n    /********** Begin *********/\n    char x = getchar();\n    putchar(x);\n    putchar(x);\n    putchar(x);\n    putchar('!');\n\n    /********** End **********/\n    return 0;\n}\n"
    //     }]
    //   }];
    let challenge=[];
    let details = this.props.questionType.shixun_details;
    if(details){
      for(var i=0;i<details.length;i++){
        for(var j=0;j<details[i].stage_list.length;j++){
          data.push({
            part:details[i].stage_list[j].position,
            shixunName:details[i].stage_list[j].name,
            testCount:details[i].stage_list[j].evaluate_count,
            endTime:details[i].stage_list[j].finished_time,
            needTime:details[i].stage_list[j].time_consuming,
            my_exp:details[i].stage_list[j].myself_experience,
            total_exp:details[i].stage_list[j].experience,
            my_score:details[i].stage_list[j].user_score,
            total_score:details[i].stage_list[j].game_score,
            input_score:details[i].stage_list[j].user_score,
            operation:details[i].shixun_detail && details[i].shixun_detail[0].game_identifier,
            id:details[i].shixun_challenge_id
          })  
        }
        if(details[i].shixun_detail){
          challenge.push(details[i].shixun_detail);
        }
      }
    }
    this.setState({
      data:data,
      dataCopy:data,
      challenge:challenge
    })
    // console.log(challenge);
  }

  changeThis=(value,index)=>{
    this.setState(
      (prevState) => ({ 
        data : update(prevState.data, {[index]: { input_score: {$set: value} }})
      })
    )
  }

  changeThisScore=(e,c_id,key)=>{
    let url=`/exercise_questions/${this.props.questionType.question_id}/adjust_score.json`
    
    const list = Object.assign({}, this.state.dataCopy[key])
    // console.log("111111111111111111111111");
    // console.log(this.props);
    // 调分值为0，且和第一次的数据相同则不修改
    if(parseInt(e.target.value)==parseInt(list.my_score)){
      return;
    }
    axios.post((url),{
      score:e.target.value,
      user_id:this.props.id,
      shixun_challenge_id:c_id
    }).then((result)=>{
      if(result){
        this.props.showNotification('调分成功');
        this.setState(
          (prevState) => ({ 
            data : update(prevState.data, {[key]: { my_score: {$set: e.target.value} }}),
            dataCopy : update(prevState.dataCopy, {[key]: { my_score: {$set: e.target.value} }})
          })
        )
        console.log(this.state.dataCopy)
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  scrollToAnchor=(index)=>{
    let name="challenge_"+index;
    if (index) {
      // let anchorElement = document.getElementById(name);
      // if(anchorElement) { anchorElement.scrollIntoView(); }
      $("html").animate({ scrollTop: $("#challenge_"+index).offset().top - 150 })
    }
  }

  render(){
    let { 
      questionType , 
      exercise,
      user_exercise_status,
    }=this.props
    let {
      data,
      challenge,
      scoreList,
    }=this.state
    let isAdmin= this.props.isAdmin();
    let isStudent = this.props.isStudent();
    // 表格
    let columns = [{
      title: '关卡',
      dataIndex: 'part',
      key: 'part',
      className:"edu-txt-center"
    }, {
      title: '任务名称',
      dataIndex: 'shixunName',
      key: 'shixunName',
      className:"edu-txt-left with22 ",
      render:(shixunName,item,index)=>{
        return( 
          <span className="overflowHidden1" style={{maxWidth: '400px'}} 
              title={shixunName && shixunName.length > 25 ? shixunName : ''}
          >{shixunName}</span> 
        )
      }
    }, {
      title: '评测次数',
      dataIndex: 'testCount',
      key: 'testCount',
      className:"edu-txt-center",
      render:(testCount,item,index)=>{
        return( 
          <span>{ item.testCount ? item.testCount : <span className="color-grey-9">--</span> }</span>
        )
      }
    }, {
      title: '完成时间',
      key: 'endTime',
      dataIndex: 'endTime',
      className:"edu-txt-center",
      render:(endTime,item,index)=>{
        return( 
          <span>{ item.endTime ? item.endTime : <span className="color-grey-9">--</span> }</span>
        )
      }
    }, {
      title: '耗时',
      dataIndex: 'needTime',
      key: 'needTime',
      className:"edu-txt-center",
      render:(needTime,item,index)=>{
        return( 
          <span>{ item.needTime ? item.needTime : <span className="color-grey-9">--</span> }</span>
        )
      }
    }, {
      title: '经验值',
      dataIndex: 'exp',
      key: 'exp',      
      className:"edu-txt-center",
      render:(exp,item,index)=>{
        return(
          <span><span className="color-green">{item.my_exp}</span>/{item.total_exp}</span>
        )
      }
    },{
      title: '得分/满分',
      dataIndex: 'score',
      key: 'score',
      className: (isAdmin || ( isStudent && exercise && exercise.exercise_status == 3 )) ? "edu-txt-center":"edu-txt-center none",
      render:(score,item,index)=>{
        return(
          <span><span className="color-orange-tip">{item.my_score}</span>/{item.total_score}</span>
        )
      }
    },{
      title: isAdmin ? <span><i className="color-red mr5">*</i>调分</span>: '操作',
      dataIndex: 'operation',
      key: 'operation',
      className: isAdmin ? "edu-txt-left" : "edu-txt-center",
      render:(operation,item,index)=>{
        return(
          <span>
            {
                this.props.isAdmin() ? 
                <InputNumber 
                  min={0} 
                  max={item.total_score} 
                  step={0.1} 
                  precision={1}
                  value={item.input_score}
                  style={{width:"60px",marginLeft:"5px"}} 
                  placeholder="请输入分数" 
                  onChange={(value)=>{this.changeThis(value,index)}}
                  onBlur={(value)=>this.changeThisScore(value,item.id,index)}
                  className="greyInput"
                ></InputNumber> 
                :""
            }
            {
              item.operation ?
              <a className={isAdmin ? "color-blue mt5 fr":"color-blue"} href='javascript:void(0)' onClick={()=>this.scrollToAnchor(`${questionType.question_id}${index+1}`)}>查看</a>
              :
              <span className={isAdmin ? "color-grey-9 mt5 fr":"color-grey-9"} >--</span>
            }
          </span>
        )
      }
    }];
    return(
      <div>
        <style>
          {`
            .resetTableStyle .ant-table-tbody > tr > td{
              padding:10px 5px!important;
            }
            .resetCodeMirrorStyle .CodeMirror{
              height:auto!important;
            }
          `}
        </style>
        { exercise && ((exercise.student_commit_status && exercise.student_commit_status != 0) || (exercise.user_exercise_status && exercise.user_exercise_status !=0) ) ?
          <div>
            <p className="padding20-30 font-16 color-grey-6 pl30">阶段成绩</p>
            <div className={challenge && challenge.length > 0 ? "pl30 pr30 resetTableStyle":"pl30 pr30 resetTableStyle stageTable"}>
              { data && data.length>0 ? <Table columns={columns} dataSource={data} pagination={false}></Table> : "" }
            </div>
            {
              challenge && challenge.length > 0 &&
              <div>
                <p className="mt20 pr30 font-16 color-grey-6 pl30">实训详情</p>
                {
                  challenge.map((item,key)=>{
                    return(
                      <div className="pl30 pr30 mt20" id={`challenge_${questionType.question_id}${key+1}`}>
                        <p className="clearfix mb20">
                          <span className="panel-inner-icon mr15 fl mt3 backgroud4CACFF">
                              <i className="fa fa-code font-16 color_white"></i>
                          </span>
                          <span className="fl mt3 font-16">
                            <span className="font-bd mr15">第{item[0].position}关</span>
                            <Link to={ "/tasks/" + item[0].game_identifier } style={{"cursor":"pointer"}}>
                              <span className={"font-16"}>{item[0].name}</span>
                            </Link>
                          </span>
                        </p>
                        <ShixunAnswerDetail
                          {...this.props} {...this.state} challenge={item[0].outputs}
                        ></ShixunAnswerDetail>
                        
                        { item[0].st===0 ? <div className="font-16 color-dark-21">
                            <div className="bor-grey-e mt15">
                              <p className="clearfix pt5 pb5 pl15 pr15 back-f6-grey codebox">
                                <span className="fl">最近通过的代码</span>
                                <span className="fr codeboxright">{item[0].path}</span>
                              </p>

                              <div className="test-code bor-top-greyE">
                                <li className="clearfix resetCodeMirrorStyle">
                                  <CodeMirror
                                    value={item[0].passed_code}
                                    options={{
                                      // mode: 'xml',
                                      theme: 'default',
                                      lineNumbers: true,
                                      // extraKeys: {"Ctrl-Q": "autocomplete"}, // 快捷键
                                      indentUnit: 4, //代码缩进为一个tab的距离
                                      matchBrackets: true,
                                      autoRefresh: true,
                                      smartIndent: true,//智能换行
                                      styleActiveLine: true,
                                      lint: true,
                                      readOnly: "nocursor"
                                    }}
                                  />
                                </li>
                              </div>
                            </div>
                          </div>:""}
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
          :
          <div className="pl30 pr30">
            {
              isStudent && <p className="color-grey-9 mt20 mb20 markdown-body" dangerouslySetInnerHTML={{__html: markdownToHTML(questionType.question_title)}}></p>
            }
            
            {
              questionType && questionType.shixun && questionType.shixun.map((item,key)=>{
                return(
                  <p key={key} className="font-16 color-grey-6 mb5">
                    <span className="mr20">第{item.challenge_position}关 {item.challenge_name}</span>
                    <span>{item.challenge_score}分</span>
                  </p>
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}
export default shixunAnswer