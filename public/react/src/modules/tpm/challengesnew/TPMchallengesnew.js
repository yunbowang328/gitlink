import React, {Component} from 'react';

import {Input, Select, Radio, Badge, message, Button} from 'antd';

import {Link} from "react-router-dom";

import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';

import Bottomsubmit from "../../modals/Bottomsubmit";

import axios from 'axios';

import './css/TPMchallengesnew.css';

const $ = window.$;

const Option = Select.Option;

const RadioGroup = Radio.Group;

function isNulltpm( str ){
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

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
            shixunCreatePracticeGroup: undefined,
            optionsums:[100,200],
            activetype:0,
            setopen: false,
            shixunCreatePractice: undefined,
            onshixunsmarkvalue: undefined,
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
					  shixunExec_timeType:false,
            onshixunsmarkvaluetype:false,
            shixunCreatePracticeGrouptype:false
        }
    }

    getdatas=()=>{
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
                    exercisememoMDRefval:response.data.task_pass_default,
                    responsedata:response.data
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
                    tab2url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=2",
                    tab3url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=3",
                    exercisememoMDRefval:response.data.task_pass,
                    responsedata:response.data
                })
                // exec_time:response.data.exec_time,
                if(response.data.power===false){
                    this.props.showNotification("你没有权限修改");

                }

                this.exercisememoMDRef.current.setValue(response.data.task_pass||'')
            }).catch((error) => {
                console.log(error)
            });

        }

    }
    componentDidUpdate=(prevProps, prevState)=>{
        if(prevProps!=this.props){
            this.getdatas()
        }
    }
    componentDidMount() {
      this.getdatas()
    }

    onshixunCreatePracticeChange = (e) => {
        if(e.target.value===undefined||e.target.value=== ""||e.target.value=== null){

        }else{
            this.setState({
                shixunCreatePracticeGrouptype:false,
                onshixunsmarkvaluetype:false
            })
        }
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

        if (e.target.value === undefined|| e.target.value== ""){

        }else{
            this.setState({
                shixunCreatePracticetype:false
            })
        }
        this.setState({
            shixunCreatePractice: e.target.value
        })

    }

    CreatePracticesend = () => {
       const exercise_editormdvalue = this.exercisememoMDRef.current.getValue().trim();

			this.setState({
        CreatePracticesendtype:true
      })

        if(this.props.status===2){
            this.props.showNotification("该实训已经发布不能新建")
            this.setState({
              CreatePracticesendtype:false
            })
            return
        }
        let {shixunCreatePractice, shixunCreatePracticeGroup, onshixunsmarkvalue, shixunsskillvaluelist,exec_time} = this.state;


        if (shixunCreatePractice === undefined||shixunCreatePractice=="") {
            this.setState({
                shixunCreatePracticetype: true,
                CreatePracticesendtype:false
            })

           $('html').animate({
                scrollTop: 10
            }, 1000);

            return
        }

        if (shixunCreatePractice.match(/^[ ]*$/)) {
            this.props.showNotification("任务名称为空，请勿输入空格");
            this.setState({
                shixunCreatePracticetype: true,
                CreatePracticesendtype:false
            })
            $('html').animate({
                scrollTop: 10
            }, 1000);
            return
        }


        if (exercise_editormdvalue === undefined||exercise_editormdvalue==""||exercise_editormdvalue===null) {
            this.setState({
                tpmcourseMessageMDType:true,
                CreatePracticesendtype:false
            })
            this.props.scrollToAnchor("tpmcourseMessageMD");
            return
        }

        if(isNulltpm(exercise_editormdvalue)){
            this.setState({
                tpmcourseMessageMDType:true,
                CreatePracticesendtype:false
            })
            this.props.scrollToAnchor("tpmcourseMessageMD");
            return
        }


        if(shixunCreatePracticeGroup===undefined){
            this.setState({
                shixunCreatePracticeGrouptype:true,
                CreatePracticesendtype:false
            })
            this.props.scrollToAnchor("shixunCreatePracticeGroupid");
            return
        }

        if(onshixunsmarkvalue===undefined){
            this.setState({
                onshixunsmarkvaluetype:true,
                CreatePracticesendtype:false
            })
            this.props.scrollToAnchor("input_task_tag");
            return
        }
        if (shixunsskillvaluelist.length === 0) {
            this.setState({
                shixunsskillvaluelisttype: true,
                CreatePracticesendtype:false
            })
            // this.props.showNotification("技能标签为空")
            this.props.scrollToAnchor("input_task_tag");
            return
        }


			// if(exec_time===null||exec_time===undefined||exec_time === ""){
			// 	this.setState({
			// 	  	shixunExec_timeType:true,
      //       CreatePracticesendtype:false
			// 	})
      //   this.props.scrollToAnchor("exec_time");
			// 	return
			// }

        // if (exec_time.match(/^[ ]*$/)) {
        //     this.props.showNotification("评测时限，请勿输入空格");
        //     this.setState({
        //         shixunExec_timeType:true,
        //         CreatePracticesendtype:false
        //     })
        //     this.props.scrollToAnchor("exec_time");
        //     return
        // }



        let id = this.props.match.params.shixunId;
        let url = "/shixuns/" + id + "/challenges.json";
        // exec_time:exec_time
        axios.post(url, {
            identifier:id,
            subject: shixunCreatePractice,
            task_pass: exercise_editormdvalue,
            difficulty: shixunCreatePracticeGroup,
            score: onshixunsmarkvalue,
            challenge_tag: shixunsskillvaluelist,
            st: 0,
        }).then((response) => {
            if (response.data.status === 1) {
						// $("html").animate({ scrollTop: 0 })
						//window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/editcheckpoint?tab=2`;
						// 	window.location.href=`/shixuns/${id}/challenges/${response.data.challenge_id}/tab=2`;
                this.props.history.replace(`/shixuns/${id}/challenges/${response.data.challenge_id}/tab=2`);
							// this.setState({
							// 		setopen: true,
							// 		CreatePracticesendtype:false,
							// 		tab2url: "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=2",
							// 		tab3url: "/shixuns/" + id + "/challenges/"+response.data.challenge_id+"/tab=3",
							// })

            }
					// this.props.showNotification(response.data.messages);
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

        if (list.length> 0) {
            this.setState({
                shixunsskillvaluelisttype: false,
            })
        }
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
        let id = this.props.match.params.shixunId;
        let url = "/shixuns/"+id+"/challenges/"+checkpointId+".json";
		  	const exercise_editormdvalue = this.exercisememoMDRef.current.getValue().trim();

        if (shixunCreatePractice === undefined||shixunCreatePractice=="") {
            this.setState({
                shixunCreatePracticetype: true,
                editPracticesendtype:false
              })
            // this.props.showNotification("任务名称为空")
            $('html').animate({
                scrollTop: 10
            }, 1000);

            return
        }

        if (shixunCreatePractice.match(/^[ ]*$/)) {
            this.props.showNotification("任务名称为空，请勿输入空格");
            this.setState({
                shixunCreatePracticetype: true,
                editPracticesendtype:false
            })
            $('html').animate({
                scrollTop: 10
            }, 1000);
            return
        }

        if (exercise_editormdvalue === undefined||exercise_editormdvalue==""||exercise_editormdvalue===null) {
            this.setState({
                tpmcourseMessageMDType:true,
                editPracticesendtype:false
            })
            this.props.scrollToAnchor("tpmcourseMessageMD");
            return
        }

        if(isNulltpm(exercise_editormdvalue)){
            this.setState({
                tpmcourseMessageMDType:true,
                editPracticesendtype:false
            })
            this.props.scrollToAnchor("tpmcourseMessageMD");
            this.props.showNotification("过关任务，请勿输入空格");
            return
        }

        if(shixunCreatePracticeGroup===undefined){
            this.setState({
                shixunCreatePracticeGrouptype:true,
                editPracticesendtype:false
            })
            this.props.scrollToAnchor("shixunCreatePracticeGroupid");
            return
        }
        if(onshixunsmarkvalue===undefined){
            this.setState({
                onshixunsmarkvaluetype:true,
                editPracticesendtype:false
            })
            this.props.scrollToAnchor("input_task_tag");
            return
        }

        if (shixunsskillvaluelist.length === 0) {
            this.setState({
               shixunsskillvaluelisttype: true,
               editPracticesendtype:false,
            })
            this.props.scrollToAnchor("input_task_tag");
            return
        }

        // if(exec_time===null||exec_time===undefined||exec_time === ""){
				// 	this.setState({
				// 		shixunExec_timeType:true,
        //     editPracticesendtype:false
				// 	})
        //   this.props.scrollToAnchor("exec_time");
				// 	return
				// }

        // if (exec_time.match(/^[ ]*$/)) {
        //     this.props.showNotification("评测时限，请勿输入空格");
        //     this.setState({
        //         shixunExec_timeType:true,
        //         editPracticesendtype:false
        //     })
        //     this.props.scrollToAnchor("exec_time");
        //     return
        // }
        //					  exec_time:exec_time
        axios.put(url, {
            tab:0,
            identifier:id,
            id:checkpointId,
            challenge:{
                subject: shixunCreatePractice,
                task_pass: exercise_editormdvalue,
                difficulty: shixunCreatePracticeGroup,
                score: onshixunsmarkvalue,
            },
            challenge_tag:shixunsskillvaluelist
        }).then((response) => {
            this.props.showNotification(response.data.messages);
            if (response.data.status === 1) {
						  	// window.location.href=`/shixuns/${id}/challenges/${checkpointId}/tab=2`;
                this.setState({
                    setopen: true,
								  	editPracticesendtype:false,
                    tab2url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=2",
                    tab3url: "/shixuns/" + id + "/challenges/"+checkpointId+"/tab=3",
                })
                this.props.history.replace(`/shixuns/${id}/challenges/${checkpointId}/tab=2`);
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

    gotocheckpoint=(url)=>{
        this.props.history.replace(url);
    }
    render() {

        let shixuntype = this.props.match.params.type;


        let {responsedata,
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

        // console.log(this.props)
        // console.log(this.state)
    //a console.log(shixunCreatePractice)

        return (
            <React.Fragment>
                <div className="educontent mt30 mb30">
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

                        <li className="active">
                            <a className={"color-blue"}>1、本关任务 </a>
                        </li>
                        {tab2url === "" ? "":<li> > </li>}
                        <li className="">
                            {tab2url === "" ? <span></span> : <Link to={tab2url}>2、评测设置</Link>}
                        </li>
                        {tab3url === "" ? "":<li> > </li>}
                        <li className="">
                            {tab3url === "" ? <span></span> : <Link to={tab3url}>  3、参考答案</Link>}
                        </li>
                    </div>

                    <div className="edu-back-white clearfix">
                        <div className="newpadding1020">
                            <p className="color-grey-6 font-16 mb10">  <span className="mr5 color-red">*</span>名称</p>
                            <div>
                                <div className="flex1">
                                    <Input placeholder="请输入任务名称，最大限制60个字符；此信息将在实训发布后展示给学员，例：计算学生的课程成绩绩点"
                                           maxLength="60"
                                           className={shixunCreatePracticetype === true ? "bor-red":"newViewAfter"}
                                           onInput={this.shixunCreatePractice}
                                           value={shixunCreatePractice}
                                           addonAfter={`${String(!shixunCreatePractice? 0 : shixunCreatePractice.length)}/${60}`}
                                            />
                                </div>
                                <div>
                                <span className={shixunCreatePracticetype === true ? "color-red mt8 fl  block" : "color-red mt8 fl none"}  id="new_shixun_name">必填项：不能为空</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="edu-back-white newpadding02020">

                        <p className="color-grey-6 font-16 mb10"  id={"tpmcourseMessageMD"}><span className="mr5 color-red">*</span>过关任务</p>
                        <style>
                            {
                                `
                           .markdown-body img {
                                    max-width: 80%; 
                                    margin: 0 auto;
                                    display: block;
                                    width: auto;  
                                    height: auto;  
                                    max-height: 80%;
                                }
                                `
                            }
                        </style>
											  <TPMMDEditor ref={this.exercisememoMDRef} placeholder="请输入选择题的题干内容" mdID={'exercisememoMD'} refreshTimeout={1500}

																	 watch={true}  className="courseMessageMD" initValue={this.state.exercisememoMDRefval} height={800}></TPMMDEditor>

                        <p id="e_tip_Memochallengesnew" className="edu-txt-right color-grey-cd font-12"></p>
                        <p id="e_tips_Memochallengesnew" className="edu-txt-right color-grey-cd font-12"></p>

                        {this.state.tpmcourseMessageMDType===true?<div className="color-red mt7 ml5 font-14" >必填项：不能为空</div>:""}
                    </div>


                    <div className="edu-back-white newpadding02020">
                        <p className="color-grey-6 font-16 mb20">
                            <span className="fl color-red mr5">*</span>
                            难度系数：
                            <RadioGroup value={shixunCreatePracticeGroup}
                                        className={"ml10"}
                                  id={"shixunCreatePracticeGroupid"}
                                  disabled={this.props.status===2?true:false}
                                  onChange={this.props.status===2?"":this.onshixunCreatePracticeChange}>
                                <Radio value={1}>简单</Radio>
                                <Radio value={2}>中等</Radio>
                                <Radio value={3}>困难</Radio>
                            </RadioGroup>
                            {this.state.shixunCreatePracticeGrouptype===true?<div className="color-red mt7 ml5 font-14" id="ex_value_notice">
                                必选项：不能为空</div>:""}
                        </p>
                        <p className="color-grey-6 font-16 mb10"> <span className="fl mr5 color-red">*</span> 奖励经验值：<span className={"color-grey-8 font-14"}> (如果学员答题正确，将获得相应的经验值；如果学员成功得到经验值，那么将同时获得等值的金币奖励，如：+100经验值、+100金币)</span></p>
                        <div className="clearfix">
                            {this.state.onshixunsmarkvaluetype===true?<style>
                                {
                                    `
                                   .ant-select-selection{
                                        border:1px solid red;
                                   }
                                    `
                                }
                            </style>:""}
                            <Select style={{width: 252}}
                                    className={"winput-240-40 ml3"}
                                    id="challenge_score"
                                    onChange={this.props.status===2?"":this.onshixunsmark}
                                    disabled={this.props.status===2?true:false}
                                    value={onshixunsmarkvalue}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                            >
                                {options}
                            </Select>
                            {this.state.onshixunsmarkvaluetype===true?<div className="color-red mt7 ml5" id="ex_value_notice">
                                必选项：不能为空</div>:""}
                        </div>
                    </div>


                    <div className="edu-back-white newpadding02020">
                        <p className="color-grey-6 font-16 mb10"><span className="mr5 color-red">*</span>技能标签：<span className={"color-grey-8 font-14"}> (学员答题正确将获得技能，否则不能获得技能)</span></p>
                        <div className="clearfix">
                            <div className="flex1">
                                <Input type="text"
                                       className={shixunsskillvaluelisttype === true ?"winput-240-40 fl mr20 winput-240-40s ml10 bor-red":"winput-240-40 fl mr20 winput-240-40s ml10"}
                                       id="input_task_tag"
                                       placeholder="添加标签"
                                       onInput={this.shixunsskill}
                                       value={shixunsskillvalue}
                                       onPressEnter={this.clickshixunsskill}
                                       onBlur={this.clickshixunsskill}
                                />
                                <div className="ml15 color-grey-9 pt5 font-14">(回车添加标签)</div>
                                <div className="mt20 clearfix" id="task_tag_content">
                                    {
																			shixunsskillvaluelist===undefined?"":shixunsskillvaluelist.length === 0 ? "" : shixunsskillvaluelist.map((itme, key) => {
                                            return (
                                              <li key={key} className={"fl ml10 mr10"}>
                                                <Badge className={"tpmpointer"} count={"x"} onClick={() => this.delshixunsskilllist(key)}>
                                                    <Button type="primary" ghost className={"Permanentban "}>
                                                     {itme}
                                                    </Button>
                                                </Badge>
                                            </li>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={shixunsskillvaluelisttype === true ? "color-red ml10 mt5 block" : "none"}
                                id="stage_name_notice">必选项：不能为空</div>
                        </div>
                    </div>

										{/*<div className="edu-back-white newpadding02020">*/}
										{/*	<p className="color-grey-6 font-16 mb20"> <span className="color-orange mr5 fl">*</span> 服务配置：评测时限(S)</p>*/}
										{/*	<div className="clearfix mb5 ml10">*/}
										{/*		<div className="pr status_con" id={"exec_timeid"}>*/}
                    {/*        /!*<label className="panel-form-label fl"></label>*!/*/}
										{/*		   	<input  value={this.state.exec_time}*/}
                    {/*                className={this.state.shixunExec_timeType === true ?"panel-box-sizing task-form-100 task-height-40 bor-red":"panel-box-sizing task-form-100 task-height-40" }*/}
                    {/*                placeholder="请输入类别名称" onInput={this.setexec_time}/>*/}
										{/*		</div>*/}
										{/*		<div*/}
										{/*			className={this.state.shixunExec_timeType === true ? "color-red mt8  block ml5" : " none"}*/}
										{/*			id="new_shixun_name">必填项：不能为空</div>*/}
										{/*	</div>*/}
										{/*</div>*/}


                </div>
                {this.props.identity>4||this.props.identity===undefined?"":<div className="clearfix mt30"
                     // style={{display:this.props.identity>4||this.props.identity===undefined?"none":'block'}}
                >
                    {/*{checkpointId===undefined?<a className="defalutSubmitbtn fl mr20" onClick={CreatePracticesendtype===true?"":this.CreatePracticesend}>提交</a>:*/}
                    {/*<a className="defalutSubmitbtn fl mr20" onClick={editPracticesendtype===true?"":this.editPracticesend}>提交</a>}*/}
                    {/*<a href={go_back_url === undefined ? "" : go_back_url} className="defalutCancelbtn fl">取消</a>*/}
                    {/*<Link to={go_back_url === undefined ? "" : go_back_url} className={"defalutCancelbtn fl"}>取消</Link>*/}
                    <Bottomsubmit url={go_back_url === undefined ? "" : go_back_url}
                                  {...this.props}
                                  {...this.state}
                                  bottomvalue={"提交"}
                                  onSubmits={checkpointId===undefined?()=>this.CreatePracticesend():()=>this.editPracticesend()}
                                  loadings={CreatePracticesendtype===true?true:editPracticesendtype===true?true:false}/>
                </div>}
            </React.Fragment>
        )
    }
}


