import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

// import "antd/dist/antd.css";

import TPMMDEditor from '../TPMMDEditor';

import axios from 'axios';

import '../css/TPMchallengesnew.css';

import { getImageUrl, toPath } from 'educoder';

import {getUrl} from 'educoder';

let origin = getUrl();

let path = getUrl("/editormd/lib/")

const $ = window.$;

let timeout;

let currentValue;

const Option = Select.Option;

const RadioGroup = Radio.Group;

export default class TPMchallengesnew extends Component {
    constructor(props) {
        super(props)
			  this.exercisememoMDRef=React.createRef();
        this.state = {
            choice_url: undefined,
            practice_url: undefined,
            go_back_url: undefined,
            task_pass_default: undefined,
            submit_url: undefined,
            shixunCreatePracticeGroup: 1,
            optionsums:[100,200],
            activetype:0,
            setopen: false,
            shixunCreatePractice: undefined,
            onshixunsmarkvalue: 100,
            shixunsskillvalue: undefined,
            shixunsskillvaluelist: [],
            tab2url: "",
            tab3url: "",
            prev_challenge:undefined,
            next_challenge:undefined,
            power: false,
            shixunCreatePracticetype: false,
            shixunsskillvaluelisttype: false,
            marktype:false,
            editPracticesendtype:false,
            CreatePracticesendtype:false,
					  exec_time:20,
					  shixunExec_timeType:false
        }
    }


    componentDidMount() {
        let id = this.props.match.params.shixunId;
        let checkpointId=this.props.match.params.checkpointId;

        let newchoice_url= "/shixuns/"+id+"/challenges/newquestion";
        let newpractice_url= "/shixuns/"+id+"/challenges/new";
        let newgo_back_url="/shixuns/"+id+"/challenges"
        if(checkpointId===undefined){
            //新建模式
            let url = "/shixuns/" + id + "/challenges/new.json"
            axios.get(url).then((response) => {
                this.setState({
                    choice_url: newchoice_url,
                    practice_url: newpractice_url,
                    go_back_url: newgo_back_url,
                    position: response.data.position,
                    task_pass_default: response.data.task_pass_default,
                    submit_url: response.data.submit_url,
                    checkpointId:checkpointId,
									exercisememoMDRefval:response.data.task_pass_default
                })

							this.exercisememoMDRef.current.setValue(response.data.task_pass_default||'')
            }).catch((error) => {
                console.log(error)
            });
        }else{
            //编辑模式
            let url="/shixuns/"+id+"/challenges/"+checkpointId+".json?tab=0";
            axios.get(url).then((response) => {

                let optionsum;
                if(response.data.difficulty===1){
                    optionsum=[100,200];
                }else if(response.data.difficulty===2){
                    optionsum=[300,400,500,600];
                }else if(response.data.difficulty===3){
                    optionsum=[700,800,900,1000]
                }
                let newprev_challenge=response.data.prev_challenge;
                let next_challenge=response.data.next_challenge;
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
                    power: response.data.power,
                    prev_challenge:newprev_challenge,
                    next_challenge:next_challenge,
                    choice_url: newchoice_url,
                    practice_url: newpractice_url,
                    go_back_url: newgo_back_url,
                    shixunCreatePractice:response.data.subject,
                    position:response.data.position,
                    shixunCreatePracticeGroup:response.data.difficulty,
                    optionsums:optionsum,
                    onshixunsmarkvalue:response.data.score,
                    shixunsskillvaluelist:response.data.tags,
                    checkpointId:checkpointId,
									  exec_time:response.data.exec_time,
                    tab2url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=2",
                    tab3url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=3",
									exercisememoMDRefval:response.data.task_pass
                })
                if(response.data.power===false){
                    this.props.showSnackbar("你没有权限修改");
                }

							this.exercisememoMDRef.current.setValue(response.data.task_pass||'')
            }).catch((error) => {
                console.log(error)
            });

        }

    }

    onshixunCreatePracticeChange = (e) => {
        let optionsum;
        let onshixunsmark;
        if(e.target.value===1){
            optionsum=[100,200];
            onshixunsmark=100;
        }else if(e.target.value===2){
            optionsum=[300,400,500,600];
            onshixunsmark=300;
        }else if(e.target.value===3){
            optionsum=[700,800,900,1000]
            onshixunsmark=700;
        }
        this.setState({
            shixunCreatePracticeGroup: e.target.value,
            optionsums:optionsum,
            onshixunsmarkvalue:onshixunsmark
        })
    }

    shixunCreatePractice = (e) => {
        this.setState({
            shixunCreatePractice: e.target.value
        })
    }

    CreatePracticesend = () => {


			this.setState({
        CreatePracticesendtype:true
      })

        if(this.props.status===2){
            this.props.showSnackbar("该实训已经发布不能新建")
            this.setState({
              CreatePracticesendtype:false
            })
            return
        }
        let {shixunCreatePractice, shixunCreatePracticeGroup, onshixunsmarkvalue, shixunsskillvaluelist,exec_time} = this.state;
        if (shixunCreatePractice === undefined||shixunCreatePractice=="") {
            this.setState({
                shixunCreatePracticetype: true
            })
            this.props.showSnackbar("任务名称为空")
                $('html').animate({
                scrollTop: 10
            }, 1000);

          this.setState({
            CreatePracticesendtype:false
          })
            return
        }

        if (shixunsskillvaluelist.length === 0) {
            this.setState({
                shixunsskillvaluelisttype: true,
              CreatePracticesendtype:false
            })
            this.props.showSnackbar("技能标签为空")
            return
        }
			if(exec_time===null||exec_time===undefined||exec_time===""){

				this.setState({
					shixunExec_timeType:false
				})
				return
			}

        const exercise_editormdvalue = this.exercisememoMDRef.current.getValue().trim();
        let id = this.props.match.params.shixunId;

        let url = "/shixuns/" + id + "/challenges.json";

        axios.post(url, {
            identifier:id,
            subject: shixunCreatePractice,
            task_pass: exercise_editormdvalue,
            difficulty: shixunCreatePracticeGroup,
            score: onshixunsmarkvalue,
            challenge_tag: shixunsskillvaluelist,
            st: 0,
					  exec_time:exec_time
        }).then((response) => {
            if (response.data.status === 1) {
						// $("html").animate({ scrollTop: 0 })
						//window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/editcheckpoint?tab=2`;
							window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/tab=2`;
							// this.setState({
							// 		setopen: true,
							// 		CreatePracticesendtype:false,
							// 		tab2url: "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=2",
							// 		tab3url: "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=3",
							// })

            }
					// this.props.showSnackbar(response.data.messages);
        }).catch((error) => {
            console.log(error)
        });



    }

    onshixunsmark = (value) => {
        this.setState({
            onshixunsmarkvalue: value
        })
    }

    shixunsskill = (e) => {
        this.setState({
            shixunsskillvalue: e.target.value
        })
    }

    clickshixunsskill = () => {

        let {shixunsskillvalue, shixunsskillvaluelist} = this.state;
        if (shixunsskillvalue === "") {
            return
        } else if (shixunsskillvalue === undefined) {
            return
        }

        if(shixunsskillvalue == "" || shixunsskillvalue == undefined || shixunsskillvalue == null || (shixunsskillvalue.length>0 && shixunsskillvalue.trim().length == 0)){
            message.error("输入为空，不能保存！");
            return
        }

         let list = shixunsskillvaluelist;
        list.push(shixunsskillvalue);
        this.setState({
            shixunsskillvaluelist: list,
            shixunsskillvalue: ""
        })
    }

    delshixunsskilllist = (key) => {
        let {shixunsskillvaluelist} = this.state;
        let newshixunsskillvaluelist = shixunsskillvaluelist;
        newshixunsskillvaluelist.splice(key, 1);
        this.setState({
            shixunsskillvaluelist: newshixunsskillvaluelist
        })
    }

    editPracticesend=()=>{

        this.setState({
          editPracticesendtype:true
        })

        let {shixunCreatePractice, shixunCreatePracticeGroup, onshixunsmarkvalue, shixunsskillvaluelist,checkpointId,exec_time} = this.state;

			const exercise_editormdvalue = this.exercisememoMDRef.current.getValue().trim();

        let id = this.props.match.params.shixunId;

        let url = "/shixuns/"+id+"/challenges/"+checkpointId+".json";

        if (shixunCreatePractice === undefined||shixunCreatePractice=="") {
            // this.setState({
            //     shixunCreatePracticetype: true
            // })
            this.props.showSnackbar("任务名称为空")
            $('html').animate({
                scrollTop: 10
            }, 1000);
            this.setState({
              editPracticesendtype:false
            })
            return
        }

        if (shixunsskillvaluelist.length === 0) {
            // this.setState({
            //     shixunsskillvaluelisttype: true
            // })
            this.props.showSnackbar("技能标签为空")
            this.setState({
              editPracticesendtype:false
            })
            return
        }

        if(exec_time===null||exec_time===undefined||exec_time===""){

					this.setState({
						shixunExec_timeType:false
					})
					return
				}
        axios.put(url, {
            tab:0,
            identifier:id,
            id:checkpointId,
            challenge:{
                subject: shixunCreatePractice,
                task_pass: exercise_editormdvalue,
                difficulty: shixunCreatePracticeGroup,
                score: onshixunsmarkvalue,
							  exec_time:exec_time
            },
            challenge_tag:shixunsskillvaluelist
        }).then((response) => {
            this.props.showSnackbar(response.data.messages);
            if (response.data.status === 1) {
						  	window.location.href=`/shixuns/${id}/challenges/${checkpointId}/tab=2`;
                this.setState({
                    setopen: true,
								  	editPracticesendtype:false,
                    tab2url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=2",
                    tab3url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=3",
                })
                // window.location.href = "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=2"
            }
        }).catch((error) => {
            console.log(error)
        });


    }

    onshixunsmarks=()=> {
        this.setState({
            marktype:true
        })
    }

    onshixunsmarkss=()=> {
        this.setState({
            marktype:false
        })
    }

		setexec_time=(e)=>{
				this.setState({
					exec_time:e.target.value
				})
		}
    render() {

        let shixuntype = this.props.match.params.type;


        let {marktype,
            shixunCreatePracticetype, shixunsskillvaluelisttype,
            choice_url, practice_url, go_back_url, position, task_pass_default, submit_url, setopen,checkpointId,prev_challenge,next_challenge,power,
            shixunCreatePractice, shixunCreatePracticeGroup, onshixunsmarkvalue, shixunsskillvalue, shixunsskillvaluelist, tab2url, tab3url,optionsums,
            CreatePracticesendtype,editPracticesendtype
        } = this.state;

        let options;
        if(optionsums!=undefined){
					options = optionsums.map((d, k) => {
						return (
							<Option key={d} id={k}>{d}</Option>
						)
					})
				}

        return (
            <React.Fragment>
                <div className="educontent mt30 mb30">
                    <div className="padding10-20 mb10 edu-back-white clearfix">
                        <span className="fl ring-blue mr10 mt7">
                            <img src={getImageUrl("images/educoder/icon/code.svg")} data-tip-down="实训任务" className="fl mt2 ml2"/>
                        </span>
                        <span className="font-16 task-hide fl TPMtaskName">第{position}关</span>

                        <Link to={go_back_url === undefined ? "" : go_back_url}
                              className="color-grey-6 fr font-15 mt3">返回</Link>
											  { next_challenge===undefined?"":
													<a href={next_challenge}className="fr color-blue mr15 mt4">下一关</a>
												}
                        { prev_challenge===undefined?"":
                            <a href={prev_challenge} className="fr color-blue mr15 mt4">上一关</a>
                        }




                        <a href={practice_url === undefined ? "" : practice_url}
                           className="fr color-blue mr15 mt4"
                           style={{display:this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"none":'block'}}
                           data-tip-down="新增代码编辑类型的任务">+&nbsp;实践类型</a>

                        <a href={choice_url === undefined ? "" : choice_url}
                           className="fr color-blue mr15 mt4"
                           style={{display:this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"none":'block'}}
                           data-tip-down="新增选择题类型的任务">+&nbsp;选择题类型</a>

                    </div>

                    <div className="challenge_nav clearfix edu-back-white">

                        <li className="active">
                            <a>本关任务</a>
                        </li>

                        <li className="">
                            {tab2url === "" ? <span>评测设置</span> : <Link to={tab2url}>评测设置</Link>}
                        </li>

                        <li className="">
                            {tab3url === "" ? <span>参考答案</span> : <Link to={tab3url}>参考答案</Link>}

                        </li>
                    </div>

                    <div className="edu-back-white mb10 clearfix">
                        <div className="padding40-20">
                            <p className="color-grey-6 font-16 mb30">任务名称</p>
                            <div className="df">
                                <span className="mr30 color-orange pt10">*</span>
                                <div className="flex1 mr20">
                                    <input type="text"
                                           // className="input-100-45 greyInput"
                                           className={shixunCreatePracticetype===true?"input-100-45 greyInpus wind100":"input-100-45 greyInput "}
                                           maxLength="50"
                                           name="challenge[subject]"
                                           value={shixunCreatePractice}
                                           onInput={this.shixunCreatePractice}
                                           placeholder="请输入任务名称（此信息将提前展示给学员）,例：计算学生的课程成绩绩点"/>
                                </div>
                                <div style={{width: '57px'}}>
                                <span
                                className={shixunCreatePracticetype === true ? "color-orange mt8 fl  block" : "color-orange mt8 fl none"}
                                id="new_shixun_name"><i
                                className="fa fa-exclamation-circle mr3"></i>必填项</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="edu-back-white padding40-20 mb20">

                        <p className="color-grey-6 font-16 mb30">过关任务</p>

											<TPMMDEditor ref={this.exercisememoMDRef} placeholder="请输入选择题的题干内容" mdID={'exercisememoMD'} refreshTimeout={1500}
																	 watch={true}  className="courseMessageMD" initValue={this.state.exercisememoMDRefval} height={700}></TPMMDEditor>

                        <p id="e_tip_Memochallengesnew" className="edu-txt-right color-grey-cd font-12"></p>
                        <p id="e_tips_Memochallengesnew" className="edu-txt-right color-grey-cd font-12"></p>
                    </div>


                    <div className="edu-back-white padding40-20 mb20">
                        <p className="color-grey-6 font-16 mb30">难度系数</p>
                        <div className="clearfix mb40">

                            <RadioGroup value={shixunCreatePracticeGroup} className="fl mr40"
                                        disabled={this.props.status===2?true:false}
                                        onChange={this.props.status===2?"":this.onshixunCreatePracticeChange}>
                                <Radio value={1}>简单</Radio>
                                <Radio value={2}>中等</Radio>
                                <Radio value={3}>困难</Radio>
                            </RadioGroup>

                        </div>
                        <p className="color-grey-6 font-16 mb30">奖励经验值</p>
                        <div className="clearfix"
														 // onMouseLeave={this.props.status===2?"":this.onshixunsmarkss}
												>
                            <span className="fl mr30 color-orange pt10">*</span>

                            <Select style={{width: 120}} className="winput-240-40 fl"
                                    id="challenge_score"
                                    onChange={this.props.status===2?"":this.onshixunsmark}
                                    // onMouseEnter={this.props.status===2?"":this.onshixunsmarks}
                                    disabled={this.props.status===2?true:false}
                                    // open={marktype}
                                    value={onshixunsmarkvalue}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                            >
                                {options}
                            </Select>

                            <p className="fl color-grey-9 font-12 ml20">
                                如果学员答题错误，则不能得到相应的经验值<br/>
                                如果学员成功得到经验值，那么将同时获得等值的金币奖励，如：+10经验值、+10金币
                            </p>

                            <span className="color-orange mt7 fl ml20 none" id="ex_value_notice"><i
                                className="fa fa-exclamation-circle mr3"></i>必填项</span>
                        </div>
                    </div>


                    <div className="edu-back-white padding40-20 mb20">
                        <p className="color-grey-6 font-16 mb30">技能标签</p>
                        <div className="clearfix df">
                            <span className="mr30 color-orange pt10">*</span>
                            <div className="flex1">
                                <Input type="text"
                                       className="winput-240-40 fl mr20 winput-240-40s"
                                       id="input_task_tag"
                                       placeholder="添加标签"
                                       onInput={this.shixunsskill}
                                       value={shixunsskillvalue}
                                       onPressEnter={this.clickshixunsskill}
                                       onBlur={this.clickshixunsskill}
                                />
                                {/*<a className="white-btn orange-btn fl mt1 use_scope-btn ml20 mt5 mr20"*/}
                                   {/*onClick={this.clickshixunsskill}>+ 添加</a>*/}
                                <div className="ml15 color-grey-9 mt5">学员答题正确将获得技能，否则不能获得技能</div>
                                <div className="mt20 clearfix" id="task_tag_content">

                                    {
																			shixunsskillvaluelist===undefined?"":shixunsskillvaluelist.length === 0 ? "" : shixunsskillvaluelist.map((itme, key) => {
                                            return (
                                                <li className="task_tag_span" key={key}><span>{itme}</span>
                                                    <a onClick={() => this.delshixunsskilllist(key)}>×</a>
                                                </li>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                            <span
                                className={shixunsskillvaluelisttype === true ? "color-orange mt7 fl ml20 block" : " color-orange mt7 fl ml20 none"}
                                id="stage_name_notice">
                        <i className="fa fa-exclamation-circle mr3"></i>必填项</span>
                        </div>
                    </div>

										<div className="edu-back-white padding40-20 mb20">
											<p className="color-grey-6 font-16 mb30">服务配置</p>
											<div className="clearfix mb5">
												<span className="color-orange pt10 fl">*</span>
												<label className="panel-form-label fl">评测时限(S)：</label>
												<div className="pr fl with80 status_con">
													<input  value={this.state.exec_time} className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称" onInput={this.setexec_time}/>
												</div>
												<span
													className={this.state.shixunExec_timeType === true ? "color-orange mt8 fl block ml20" : "color-orange mt8 fl none"}
													id="new_shixun_name"><i className="fa fa-exclamation-circle mr3"></i>必填项</span>
												<div className="cl"></div>
											</div>
										</div>

                    <div className="clearfix mt30"
                         style={{display:this.props.identity>4||this.props.identity===undefined?"none":'block'}}
                    >
                       {checkpointId===undefined?<a className="defalutSubmitbtn fl mr20" onClick={CreatePracticesendtype===true?"":this.CreatePracticesend}>提交</a>:
                       <a className="defalutSubmitbtn fl mr20" onClick={editPracticesendtype===true?"":this.editPracticesend}>提交</a>}
                       {/*<a href={go_back_url === undefined ? "" : go_back_url} className="defalutCancelbtn fl">取消</a>*/}
                       <Link to={go_back_url === undefined ? "" : go_back_url} className={"defalutCancelbtn fl"}>取消</Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


