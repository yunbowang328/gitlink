import React, {Component} from 'react';

import {Input, InputNumber, Button, Tooltip} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import axios from 'axios';

import TPMMDEditor from './TPMMDEditor';

import Bottomsubmit from "../../modals/Bottomsubmit";

import './css/TPMchallengesnew.css';

const $ = window.$;



export default class TPManswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choice_url: undefined,
            practice_url: undefined,
            go_back_url: undefined,
            value: 1,
            answer:"",
            id:undefined,
            checkpointId:undefined,
            power: false,
            prev_challenge: undefined,
            next_challenge: undefined,
            answers: [] //testAnswers
        }
    }

    componentDidMount() {
        let id = this.props.match.params.shixunId;
        let checkpointId=this.props.match.params.checkpointId;

        let newchoice_url= "/shixuns/"+id+"/challenges/newquestion";
        let newpractice_url= "/shixuns/"+id+"/challenges/new";
        let newgo_back_url="/shixuns/"+id+"/challenges";
        this.setState({
            shixunId:id,
            checkpointId:checkpointId
        })


        let url = "/shixuns/" + id + "/challenges/" + checkpointId + "/edit.json?tab=2";
        axios.get(url).then((response) => {
            let newprev_challenge = response.data.prev_challenge;
            let next_challenge = response.data.next_challenge;
            if (newprev_challenge != undefined) {
                if(newprev_challenge.st===0){
                    newprev_challenge = "/shixuns/" + id + "/challenges/" + newprev_challenge.id + "/editcheckpoint";
                }else{
                    newprev_challenge = "/shixuns/" + id + "/challenges/" + newprev_challenge.id  + "/editquestion";
                }
            }
            if (next_challenge != undefined) {

                if(next_challenge.st===0){
                    next_challenge = "/shixuns/" + id + "/challenges/" + next_challenge.id+ "/editcheckpoint";
                }else{
                    next_challenge = "/shixuns/" + id + "/challenges/" + next_challenge.id+ "/editquestion";
                }
            }
            this.setState({
                answer:response.data.answer,
                power: response.data.power,
                choice_url: newchoice_url,	//	导航中的新建选择题url
                practice_url: newpractice_url,	//string	导航中新建实践题url
                go_back_url: newgo_back_url,	//string	导航中的返回url
                position: response.data.position,	//int	关卡位置，导航栏中的第几关
                prev_challenge: newprev_challenge,
                next_challenge: next_challenge,
                responsedata:response.data,
             })

            if(response.data.power===false){
                this.props.showNotification("没有权限修改");
            }
            // if(response.data.answer===undefined||response.data.answer===null){
            //     this.answerMD("", "answerMD");
            // }else{
            //     this.answerMD(response.data.answer, "answerMD");
            // }

        }).catch((error) => {
            console.log(error)
        });

        
        let urlAnswer = `/shixuns/${id}/challenges/${checkpointId}/answer.json`;
        axios.get(urlAnswer).then((response) => {
            if (response.data.status === 401) {

            } else if (response.data) {
                this.setState({ answers: response.data })
            }
        })
    }

    challenge_answer_submit=()=> {
        // `levelSection${index}`
        // this.refs.md0
        const { answers } = this.state;
        const answersParams = answers.slice(0)
      // console.log(answersParams)
        let isValidate = true;
        let totalScore = 0;
        answersParams.forEach( (item, index) => {
            if (!isValidate) {
                return;
            }
            const sectionId = `#levelSection${index}`;
            const mdContnet = this.refs[`md${index}`].getValue().trim();;
            item.contents = mdContnet;
            item.name = item.name.trim()
            totalScore += item.score;
            delete item.id;
            if (!item.name) {
                this.props.showNotification("请先填写参考答案名称");
                isValidate = false;
            } else if (!mdContnet) {
                this.props.showNotification("请先填写参考答案内容");
                isValidate = false;                
            } 
            if (!isValidate) {
                $("html, body").animate({ scrollTop: $(`${sectionId}`).offset().top - 100})
            }
        })
        if (!isValidate) {
            return;
        }
        if (answersParams.length != 0 && totalScore != 100) {
            this.props.showNotification("请先保证占比和为100%");
            return;
        }
        let id = this.props.match.params.shixunId;
        let {checkpointId} = this.state;
        let url = `/shixuns/${id}/challenges/${checkpointId}/crud_answer.json`;

        axios.post(url,{
            challenge_answer: answersParams
            }
        ).then((response) => {
            if (response.data) {
                if (response.data.message) {
                    this.props.showNotification(response.data.message);
                }
                if (response.data.status == 1) {
									window.location.href=`/shixuns/${id}/challenges`;
                    // $("html").animate({ scrollTop: 0 })
                }
            }

        }).catch((error) => {
            console.log(error)
        });
    }
    onNameChange = (e, index) => {
        const newAnswer = Object.assign({}, this.state.answers[index])
        newAnswer.name = e.target.value
        const newAnswers = this.state.answers.slice(0)
        newAnswers[index] = newAnswer
        this.setState({ answers: newAnswers})
    }
    onScoreChange = (val, index) => {
        const newAnswer = Object.assign({}, this.state.answers[index])
        newAnswer.score = val
        const newAnswers = this.state.answers.slice(0)
        newAnswers[index] = newAnswer
        this.setState({ answers: newAnswers})
    }
    answerOnChange = (val, index) => {
        if (!this.state.answers[index]) {
            // 1、2、3删除2会走到这里
            return;
        }
        const newAnswer = Object.assign({}, this.state.answers[index])
        newAnswer.contents = val
        const newAnswers = this.state.answers.slice(0)
        newAnswers[index] = newAnswer
        this.setState({ answers: newAnswers})
    }
    addAnswer = () => {
        const newAnswers = this.state.answers.slice(0)
        newAnswers.push({
            "name": `解题思路${newAnswers.length + 1}`,
            "contents": "",
            "score": 10
        })
        this.setState({ answers: newAnswers })
    }

    delanswers=(index)=>{
       let {answers}=this.state;
       let newanswers=answers;
        newanswers.splice(index,1)
        this.setState({
            answers:newanswers
        }, () => {
            for(let i = index; i < newanswers.length; i ++) {
                this.refs[`md${i}`].setValue(newanswers[i].contents)
            }
        })
    }

    gotocheckpoint=(url)=>{
        this.props.history.replace(url);
    }
    render() {

        let {
            choice_url,
            practice_url,
            responsedata,
            position,
            task_pass_default,
            submit_url,
            shixunId,
            checkpointId,
            power,
            prev_challenge,
            next_challenge,
            answers,
        } = this.state;
        let tab1url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/editcheckpoint";
        let tab2url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/tab=2";
        let tab3url="/shixuns/" + shixunId + "/challenges/"+checkpointId+"/tab=3";
        // console.log(this.props)
        return (
            <React.Fragment>
                <div className="educontent mt30 mb30 tpmAnswer">
                    <div className="TPMchallengesnewtitles edu-back-white clearfix borderbottomf4">
                        <span className="font-16 task-hide fl TPMtaskName">第{position}关：{responsedata&&responsedata.st === 0 ?"实践题":responsedata&&responsedata.st === 1?"选择题":""}</span>
                        {this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"":<a href={practice_url === undefined ? "" : practice_url} className="fr ml15 mt13">
                            <Button type="primary" className="edu-default-btn edu-greenback-btn  "
                            >新增实践任务</Button></a>}
                        {this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"":<Link to={choice_url === undefined ? "" : choice_url}
                                                                                                                                       className="fr ml15 mt13">
                            <Button type="primary"
                                    className="edu-default-btn edu-greenback-btn  mr5"
                            >新增选择题任务</Button></Link>}
                        {next_challenge===undefined?"":
                          <Button type="primary" ghost onClick={()=>this.gotocheckpoint(next_challenge)}
                                  className="edu-default-btn edu-greenback-btn  mr5 fr ml15 mt13"
                          >下一关</Button> }
                        {prev_challenge===undefined?"":
                          <Button type="primary" ghost onClick={()=>this.gotocheckpoint(prev_challenge)}
                                  className="edu-default-btn edu-greenback-btn  mr5 fr ml15 mt13"
                          >上一关</Button>}
                    </div>

                    <div className="challenge_nav clearfix edu-back-white">
                        <li>
                            <Link to={tab1url}>1、本关任务 </Link>
                        </li>
                        {tab2url === "" ? "":<li> > </li>}
                        <li >
                            <Link to={tab2url} >2、评测设置</Link>
                        </li>
                        {tab3url === "" ? "":<li> > </li>}
                        <li className="active">
                            <Link to={tab3url} className={"color-blue"}>  3、参考答案</Link>
                        </li>
                    </div>

                    <div className="edu-back-white mb10 clearfix">

                        <div className="padding30-20">
                            <p className=" font-14" style={{ paddingBottom: '5px'
                                , color: '#333'}}>
                                可以将参考答案分级设置，让学员自行选择级别，每级查看后按照比例扣分值（学员已完成任务再查看，则不影响学员已获得的成绩）
                            </p>
                            <p className=" font-14 mt15 "
                                style={{   color: '#888'}}>
                                <div>示例：级别1，扣减分值占比25%；级别2，扣减分值占比35%；级别3，扣减分值占比40%；</div>
                                <div className={"mt5 ml41"}>若学员选择查看级别1的答案，将被扣减25%的分值；选择查看级别2的答案，将被扣减60%的分值；选择查看级别3的答案，将被扣减100%的分值。</div>
                            </p>

                            <style>{`
                                .tpmAnswer .ant-input { width: 230px }
                                .tpmAnswer .score.ant-input-number { width: 62px; }
                                .levelSection { margin-top: 16px }
                            `}</style>

                            {
                                answers.map((answer, index) => {
                                    return <div className="levelSection mt30" id={`levelSection${index}`} style={{ clear: 'both' }}>
                                        <span className="mr4 color-orange pt10">*</span>
                                        <p className="color-grey-6 font-16 mb30 mt10" style={{ display: "inline" }}>级别：{index + 1}</p>
                                        <Tooltip title="删除">
                                        <a className="fr sample_icon_remove mr10 mt8" onClick={()=>this.delanswers(index)}>
                                            <i className={"iconfont icon-shanchu_Hover font-16 fl"}></i>
                                        </a>
                                        </Tooltip>
                                        <div className=" color-grey-6 font-16 bortopeeetpm pt20 mt20" style={{ marginLeft: "9px", margin: '8px 9px'}}>
                                            <div className=" ">
                                                <div className={"wind500height45"}>
                                                    <div className={"fl"} style={{'width':'240px'}}>名称：</div>
                                                    <div  className={"fl"}  style={{ marginLeft: "20px"}} >扣减分值占比：</div>
                                                </div>
                                                <div className={"wind500height45"}>
                                                    <Input value={answer.name} onChange={(e) => this.onNameChange(e, index)}></Input>


                                                    <InputNumber className="score" step={1} min={1} max={100} defaultValue={answer.score}
                                                                 style={{ marginLeft: "32px"}}
                                                                 onChange={(e) => this.onScoreChange(e, index)} ></InputNumber> %
                                                </div>
                                            </div>
                                            <div className="mt10">
                                                <span>内容：</span>
                                                <TPMMDEditor ref={`md${index}`} mdID={index} initValue={answer.contents} 
                                                        onChange={(val) => this.answerOnChange(val, index)}></TPMMDEditor>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            
                            <div className="clearfix mt20" style={{display:this.props.identity>4||this.props.identity===undefined||power===false?"none":"block"}}>
                                {/*<a href={"javascript:void(0)"} className="defalutCancelbtn fl" >新增参考答案</a>*/}
                                <Button type="primary" ghost className="edu-default-btn edu-greenback-btn mt20 mb20 newaddswermargin" onClick={this.addAnswer}>新增参考答案</Button>
                            </div>
                        </div>
                        
                        
                    </div>

                </div>

                {this.props.identity>4||this.props.identity===undefined||power===false?"":<div className="clearfix mt20"  >
                    {/*<a className="defalutSubmitbtn fl mr20"  onClick={this.challenge_answer_submit}>提交</a>*/}
                    {/*/!*<a href={"/shixuns/" + shixunId + "/challenges"} className="defalutCancelbtn fl">取消</a>*!/*/}
                    {/*<Link to={"/shixuns/" + shixunId + "/challenges"} className={"defalutCancelbtn fl"}>取消</Link>*/}
                    <Bottomsubmit url={"/shixuns/" + shixunId + "/challenges"}
                                  bottomvalue={"提交"}
                                  onSubmits={this.challenge_answer_submit}
                                  {...this.props}
                                  {...this.state}
                                  loadings={false}
                    />
                </div>}
            </React.Fragment>
        )
    }
}


