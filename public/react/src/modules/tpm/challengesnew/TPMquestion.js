import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal,Tooltip,notification} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

// import "antd/dist/antd.css";

import axios from 'axios';

import { getImageUrl, toPath } from 'educoder';

import './css/TPMchallengesnew.css';

import {getUrl} from 'educoder';

import TpmQuestionMain from './TpmQuestionMain';

import TpmQuestionNew from './TpmQuestionNew';

import TpmQuestionEdit from './TpmQuestionEdit';

let origin = getUrl();

let path = getUrl("/editormd/lib/")

const $ = window.$;

const Option = Select.Option;

const RadioGroup = Radio.Group;

var letterArr = [];
for (var i = 65, j = 0; i < 91; i++, j++) {
    letterArr[j] = String.fromCharCode(i);
}


export default class TPMquestion extends Component {
    constructor(props) {
        super(props)
			this.contentMdRef = React.createRef();
			this.newquestioMDMdRef = React.createRef();
			this.newquestioMDMdCont=React.createRef();
			this.neweditanswerRef=React.createRef();
			this.editanswersRef=React.createRef();
        this.state = {
            choice_url: undefined,
            practice_url: undefined,
            go_back_url: undefined,
            position: undefined,
            task_pass_default: undefined,
            submit_url: undefined,
					questionsInputvalue:undefined,
            questionaddsum:0,
            questionaddarray:[],
            questionaddtype:true,
            activetype:"",
            questionlists:[{str:"A",val:"",type:false},{str:"B",val:"",type:false},{str:"C",val:"",type:false},{str:"D",val:"",type:false}],
            answeshixunsGroup: 1,
            answeoptions:[10,20],
            answeonshixunsmark:10,
            shixunssanswerkillvalue:"",
            shixunsskillanswerlist:[],
            challenge_id:"",
            challenge_choose_id:undefined,
            questionlistss:[],
            newcnttype:false,
            newquestioMDvaluetype:false,
            challenge_tagtype:false,
            editquestionaddtype:false,
            mancheckpointId:undefined,
            power:false,
            questionInputvaluetype:false,
            questioMD:"",
            standard_answer:"",
            subject:"",
            newquestioMDvaluetypes:false,
            questionInputvaluetypes:false,
            prev_challenge:undefined,
            next_challenge:undefined,
            newcnttypesum:1,
            marktype:false,
            answer:"",
            sumittype:false
        }
    }


    questionInputvalue=(e)=>{
        this.setState({
					questionsInputvalue: e.target.value
        })
    }

    componentDidMount() {
        if(this.props.status===2){

        }
        let id = this.props.match.params.shixunId;
        let checkpointId=this.props.match.params.checkpointId;

        this.setState({
            mancheckpointId:id,
        })

        let newchoice_url= "/shixuns/"+id+"/challenges/newquestion";
        let newpractice_url= "/shixuns/"+id+"/challenges/new";
        let newgo_back_url="/shixuns/"+id+"/challenges";

        if(this.props.match.params.choose_id===undefined){
            if(checkpointId===undefined){
                //新建模式
                let nurl = "/shixuns/" + id + "/challenges/new.json"
                axios.get(nurl).then((response) => {

                    if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

                    }else {
                        this.setState({
                            choice_url: newchoice_url,
                            practice_url: newpractice_url,
                            go_back_url: newgo_back_url,
                            position: response.data.position,
                            task_pass_default: response.data.task_pass_default,
                            submit_url: response.data.submit_url,
                            power:true,
                            activetype:"first",

                        })
                        if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
                            this.setState({
															contentMdRefval:""
                            })
                        } else {

                            this.setState({
															contentMdRefval:response.data.task_pass_default
                            })
												   	this.contentMdRef.current.setValue(response.data.task_pass_default || '')
                        }
                        this.shixunsautoHeight()
                    }

                }).catch((error) => {
                    console.log(error)
                });

            }else{
                //编辑模式
                let url = "/shixuns/"+ id +"/challenges/"+checkpointId+"/edit.json?st=1"
                axios.get(url).then((response) => {
                    if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

                    }else {
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
                            questionaddtype:false,
                            newquestionaddtype:false,
                            activetype:"first",
                            prev_challenge:newprev_challenge,
                            next_challenge:next_challenge,
													questionsInputvalue:response.data.subject,
                            questionaddarray:response.data.chooses,
                            challenge_id:response.data.id,
                            mancheckpointId:checkpointId,
                            position: response.data.position,
                            choice_url: newchoice_url,
                            practice_url: newpractice_url,
                            go_back_url: newgo_back_url,
                            power:response.data.power,
                            // questioMD:response.data.task_pass,
                            answer:response.data.answer

                        })

												this.setState({
													contentMdRefval:response.data.task_pass
												})
										  	// this.contentMdRef.current.setValue(response.data.task_pass || '')
                        if(response.data.chooses.length===0){
                            // 新建选择题时，没法切回 ‘本关任务’ tab
                            // this.questionadd()
                        }

                        this.shixunsautoHeight()
                    }

                }).catch((error) => {
                    console.log(error)
                });
            }

        }else{
            $('html').animate({
                scrollTop:10
            }, 500);

            let{challenge_id} =this.state;

            let id = this.props.match.params.shixunId;
            let url = "/shixuns/"+ id +"/challenges/"+checkpointId+"/edit.json?st=1"
            axios.get(url).then((response) => {
                if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

                }else {
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
                        questionaddtype:false,
                        newquestionaddtype:false,
                        prev_challenge:newprev_challenge,
                        next_challenge:next_challenge,
											questionsInputvalue:response.data.subject,
                        questionaddarray:response.data.chooses,
                        challenge_id:response.data.id,
                        mancheckpointId:checkpointId,
                        position: response.data.position,
                        choice_url: newchoice_url,
                        practice_url: newpractice_url,
                        go_back_url: newgo_back_url,
                        power:response.data.power,
                        // questioMD:response.data.task_pass,

                    })

										this.setState({
											contentMdRefval:response.data.task_pass
										})
										// this.contentMdRef.current.setValue(response.data.task_pass || '')
                    if(response.data.chooses.length===0){
                        this.questionadd()
                    }
                    this.shixunsautoHeight()
                }

            }).catch((error) => {
                console.log(error)
            });

        let zrl ='/shixuns/'+this.props.match.params.shixunId+'/challenges/'+this.props.match.params.checkpointId+'/edit_choose_question.json?choose_id='+this.props.match.params.choose_id;
            axios.get(zrl).then((response) => {
                if(response.status===200){
                    let choose_contents=response.data.choose_contents;
                    let newchoose_contentslist=[]
                    for(var i=0; i<choose_contents.length; i++){
                        let a=choose_contents[i];
                        newchoose_contentslist.push({str:letterArr[a.position],val:a.option_name,type:a.right_key})
                    }
                    this.setState({
                        activetype:this.props.match.params.choose_id,
                        editquestionaddtype:true,
                        questionaddtype:false,
                        newquestionaddtype:false,
                        editlist:response.data,
                        questionlists:newchoose_contentslist,
                        answeshixunsGroup:response.data.difficult,
                        answeonshixunsmark:response.data.score,
                        shixunsskillanswerlist:response.data.tags,
                        challenge_choose_id:this.props.match.params.choose_id,
                        standard_answer:response.data.standard_answer,
                        subject:response.data.subject,
                        answer:response.data.answer,
										  	neweditanswerRefval:response.data.subject,
											editanswersRefval:response.data.answer,
                    })

								  	this.neweditanswerRef.current.setValue(response.data.subject||'')
									  this.editanswersRef.current.setValue(response.data.answer||'')

                    this.shixunsautoHeight()
                }


            }).catch((error) => {
            });

        }
    }

    clickquestionsumit=()=>{
      this.setState({
        sumittype:true
      })
        let checkpointId=this.props.match.params.checkpointId;
        if(this.props.status===2&&checkpointId===undefined){
            this.props.showSnackbar("该实训已经发布不能新建")
            this.setState({
              sumittype:false
            })
            return
        }
        let {questionsInputvalue} =this.state;
        // const exercise_editormdvalue = this.questio_editormd.getValue();
			const exercise_editormdvalue = this.contentMdRef.current.getValue().trim();
        let id = this.props.match.params.shixunId;

        if(questionsInputvalue===undefined||questionsInputvalue===null||questionsInputvalue===""){
            this.setState({
                questionInputvaluetype:true
            })
            $('html').animate({
                scrollTop: 10
            }, 1000);
            this.setState({
              sumittype:false
            })
            return
        }


        if(exercise_editormdvalue===null ||exercise_editormdvalue===""){
            this.setState({
                questionInputvaluetypes:true
            })
            $('html').animate({
                scrollTop: 500
            }, 1000);
            this.setState({
              sumittype:false
            })
            return
        }
        if(checkpointId===undefined){

            let url = "/shixuns/" + id + "/challenges.json";

            axios.post(url, {
                identifier:id,
                subject: questionsInputvalue,
                task_pass: exercise_editormdvalue,
                st: 1
            }).then((response) => {
                this.props.showSnackbar(response.data.messages);
                // if(response.data.status===1){
                //
                //     this.setState({
                //         questionaddtype:false,
                //         challenge_id:response.data.challenge_id
                //     })
                //
                //     this.questionadd()
                // }
                window.location.href = '/shixuns/'+id+'/challenges/'+response.data.challenge_id+'/editquestion';

            }).catch((error) => {
                console.log(error)
            });
        }else{
            let url ="/shixuns/"+id+"/challenges/"+checkpointId+".json";
            axios.put(url, {
                tab:0,
                subject: questionsInputvalue,
                task_pass: exercise_editormdvalue,
            }).then((response) => {
                if(response.data.status===1){
                    this.setState({
                        questionaddtype:false,
                        challenge_id:response.data.challenge_id
                    })
                }
                $('html').animate({
                    scrollTop: 10
                }, 200);
                this.props.showSnackbar(response.data.messages);
                window.location.href = '/shixuns/'+id+'/challenges/'+response.data.challenge_id+'/editquestion';
            }).catch((error) => {
                console.log(error)
            });
        }

    }

    questionall=()=>{
        // this.setState({
        //     activetype:"first",
        //     newquestionaddtype:false,
        //     editquestionaddtype:false,
				// 	  questionaddtype:false
        // })

			window.location.href = '/shixuns/'+this.props.match.params.shixunId+'/challenges/'+this.props.match.params.checkpointId+'/editquestion';
    }
    questionadd=()=>{

        let{questionaddarray}=this.state;

        let questionaddsums=questionaddarray.length;

        if(questionaddsums-1>9){
					this.props.showSnackbar("选择题目最大支持设置9道题")
            return
        }

        let questionaddarrays=questionaddarray;

					questionaddarrays.map((item,key)=>{
							if(item.choose_id===0){
								questionaddarrays.splice(key,1)
							}
					})

        questionaddarrays.push({type:0,choose_id:0});
        this.setState({
            activetype:0,
            questionaddarray:questionaddarrays,
            questionaddtype:true,
					  editquestionaddtype:false,
            newquestionaddtype:true,
            questionlists:[{str:"A",val:"",type:false},{str:"B",val:"",type:false},{str:"C",val:"",type:false},{str:"D",val:"",type:false}],
            answeshixunsGroup: 1,
            answeoptions:[10,20],
            answeonshixunsmark:10,
            shixunssanswerkillvalue:"",
            shixunsskillanswerlist:[],
					  contentMdRefval:"",
					  newquestioMDMdContval:"",
        })


			setTimeout(() => {
				this.newquestioMDMdRef.current.setValue('')
			}, 1000)
			setTimeout(() => {
				this.newquestioMDMdCont.current.setValue('')
			}, 1500)
			// this.shixunsautoHeight()
    }

    editquestionlists=(newquestionlists)=>{
        let newlist=newquestionlists;
        let list=[]
        for(var i=0; i<newlist.length; i++){
            if(newlist[i].type===true){
                list.push(newlist[i].str)
            }
        }
        this.setState({
            questionlists:newquestionlists,
            questionlistss:list
        })
    }


    addquestionlists=()=>{
    let{questionlists} = this.state;
    let newquestionlists=questionlists;
    let newli={str:letterArr[questionlists.length],val:"",type:false};
        newquestionlists.push(newli);
        this.editquestionlists(newquestionlists);
    }


    delquestionlists=(key)=>{
        let{questionlists} = this.state;
        let newquestionlists=questionlists;
        newquestionlists.splice(key,1);
        for(var i=0; i<newquestionlists.length; i++){
            newquestionlists[i].str=letterArr[i];
        }
        this.editquestionlists(newquestionlists);
    }


    selquestionlists=(key)=>{
        let{questionlists} = this.state;
        let newquestionlists=questionlists;
        if(newquestionlists[key].type===true){
            newquestionlists[key].type=false;
        }else if(newquestionlists[key].type===false){
            newquestionlists[key].type=true;
        }

        this.editquestionlists(newquestionlists);
    }

    onshixunGroupanswe=(e)=> {
        let optionsum;
        let onshixunsmark;
        if(e.target.value===1){
            optionsum=[10,20];
            onshixunsmark=10;
        }else if(e.target.value===2){
            optionsum=[30,40,50,60];
            onshixunsmark=30;
        }else if(e.target.value===3){
            optionsum=[70,80,90,100]
            onshixunsmark=70;
        }
        this.setState({
            answeshixunsGroup: e.target.value,
            answeoptions:optionsum,
            answeonshixunsmark:onshixunsmark
        })
    }
    shixunssanswerkill = (e) => {
        this.setState({
            shixunssanswerkillvalue: e.target.value
        })

    }
    clickshixunsanswerskill = () => {

        let {shixunssanswerkillvalue, shixunsskillanswerlist} = this.state;
        if (shixunssanswerkillvalue === "") {
            return
        } else if (shixunssanswerkillvalue === undefined) {
            return
        }

        if(shixunssanswerkillvalue == "" || shixunssanswerkillvalue == undefined || shixunssanswerkillvalue == null || (shixunssanswerkillvalue.length>0 && shixunssanswerkillvalue.trim().length == 0)){
            message.error("输入为空，不能保存！");
            return
        }

        let list = shixunsskillanswerlist;
        list.push(shixunssanswerkillvalue);
        this.setState({
            shixunsskillanswerlist: list,
            shixunssanswerkillvalue: ""
        })
    }
    delshixunssnswerllist=(key)=>{
        let {shixunsskillanswerlist} = this.state;
        let newshixunsskillanswerlist = shixunsskillanswerlist;
        newshixunsskillanswerlist.splice(key, 1);
         this.setState({
            shixunsskillanswerlist: newshixunsskillanswerlist
        })
    }
    onInputoquestionption=(e,key)=>{

        $.fn.autoHeight = function(){
            function autoHeight(elem){
                elem.style.height = 'auto';
                elem.style.maxHeight = '140px';
                elem.scrollTop = 0; //防抖动
                elem.style.height = elem.scrollHeight + 'px';
            }
            this.each(function(){
                autoHeight(this);
                $(this).on('keyup', function(){
                    autoHeight(this);
                });
            });
        }
        $("#"+e.target.id).autoHeight();

        let {questionlists}=this.state;
        let newquestionlists=questionlists;
        newquestionlists[key].val=e.target.value;
        this.editquestionlists(newquestionlists);
    }

    onshixunsansweSelect=(value)=>{
        this.setState({
            answeonshixunsmark: value
        })
    }

    answer_subit=(sumtype,challenge_choose_id)=>{
			$('html').animate({
				scrollTop:10
			}, 500);

        let {challenge_id,questionlists,shixunsskillanswerlist,answeonshixunsmark,answeshixunsGroup,questionaddarray} =this.state;
        if(challenge_id===undefined){
            message.error("关卡id为空");
            return
        }
        let newquestionlists=questionlists;
        let newlist="";
        let newtype=[];
        let newcnt=[];
        let list=0;
        for(var i=0; i<newquestionlists.length; i++){

            if(newquestionlists[i].type===true){
                newlist=newlist+newquestionlists[i].str;
            }else{
                list=list+1
            }
            newtype.push(newquestionlists[i].type)
            newcnt.push(newquestionlists[i].val)
        }

       if(list===newquestionlists.length){
           this.setState({
               newcnttype:true,
               newcnttypesum:0
           })
           message.error("没有选择答案");
           $('html').animate({
               scrollTop:700
           }, 1000);
           return
       }
        for(var z=0; z<newcnt.length; z++){

            if(newcnt.length===0){
                this.setState({
                    newcnttype:true,
                    newcnttypesum:1
                })
                message.error("新增选项为空");
                $('html').animate({
                    scrollTop:700
                }, 1000);
                return
            }
            if(newcnt[z]===" "||newcnt[z]===""){
                this.setState({
                    newcnttype:true,
                    newcnttypesum:1
                })
                message.error("新增选项为空");
                $('html').animate({
                    scrollTop:700
                }, 1000);
                return
            }
        }


        if(shixunsskillanswerlist.length===0){
            this.setState({
                challenge_tagtype:true,
            })
            message.error("技能标签为空");
            return
        }else{
            this.setState({
                challenge_tagtype:false,
            })
        }
        for(var l=0; l<shixunsskillanswerlist.length; l++){
            if(shixunsskillanswerlist[l]===""){
                this.setState({
                    challenge_tagtype:true,
                })
                message.error("技能标签为空");
                return
            }else{
                this.setState({
                    challenge_tagtype:false,
                })
            }
        }



        let id = this.props.match.params.shixunId;
        let checkpointId=this.props.match.params.checkpointId
        let url;
        if(sumtype==="edit"){
					let newquestioMDvalue = this.neweditanswerRef.current.getValue().trim();
            if(newquestioMDvalue===""||newquestioMDvalue==="请输入选择题的题干内容"){
                this.setState({
                    newquestioMDvaluetype:true,
                })
                $('html').animate({
                    scrollTop:100
                }, 200);
                message.error("题干为空");
                return
            }


					  let newnewanswerMDvalue = this.editanswersRef.current.getValue().trim();
            console.log(newnewanswerMDvalue)
            if(newnewanswerMDvalue===""||newnewanswerMDvalue===" "){
                newnewanswerMDvalue=undefined
            }

            url="/shixuns/" + id + "/challenges/" + challenge_id + "/update_choose_question.json?choose_id="+challenge_choose_id;
            axios.post(url,  {
                challenge_choose: {subject: newquestioMDvalue, answer: newnewanswerMDvalue, standard_answer:newlist, score: answeonshixunsmark, difficult: answeshixunsGroup},
                challenge_tag: shixunsskillanswerlist,
                question: {cnt: newcnt},
                choice: {answer: newtype}
            }).then((response) => {
                // $('html').animate({
                //     scrollTop: 10
                // }, 200);
							$('html').animate({
								scrollTop: 10
							}, 200);

							notification.open({
								message: '提示',
								description:
									'修改成功，请点击右侧加号继续添加',
							});

                this.setState({
                    questionaddtype:false,
                    newquestioMDvaluetype:false,
                    newquestioMDvaluetypes:false,
                })
                // setTimeout(window.location.href="/shixuns/"+this.props.match.params.shixunId+"/challenges/"+this.props.match.params.checkpointId+"/editquestion"+"/"+response.data.challenge_choose_id,1000)
                // this.gochooseid()
            }).catch((error) => {
                console.log(error)
            });
        }else{

					let newquestioMDvalue = this.newquestioMDMdRef.current.getValue().trim();
            if(newquestioMDvalue===""||newquestioMDvalue==="请输入选择题的题干内容"){
                this.setState({
                    newquestioMDvaluetype:true,
                })
                $('html').animate({
                    scrollTop:100
                }, 200);
                message.error("题干为空");
                return
            }
            let newnewanswerMDvalue = this.newquestioMDMdCont.current.getValue().trim();

            if(newnewanswerMDvalue===""||newnewanswerMDvalue===" "){
                newnewanswerMDvalue=undefined
            }
            url="/shixuns/" + id + "/challenges/" + challenge_id + "/create_choose_question.json";
            axios.post(url,  {
                challenge_choose: {subject: newquestioMDvalue, answer: newnewanswerMDvalue, standard_answer:newlist , score: answeonshixunsmark, difficult: answeshixunsGroup},
                challenge_tag: shixunsskillanswerlist,
                question: {cnt: newcnt},
                choice: {answer: newtype}
            }).then((response) => {

                let questionaddsums=questionaddarray.length;
                let questionaddarrays=questionaddarray;
                questionaddarrays[questionaddsums-1].choose_id=response.data.challenge_choose_id;
                if(newlist.length===1){
                    questionaddarrays[questionaddsums-1].type=1;
                }else if(newlist.length>1){
                    questionaddarrays[questionaddsums-1].type=2;
                }
                this.setState({
                    challenge_choose_id:response.data.challenge_choose_id,
                    questionaddtype:false,
                    editquestionaddtype:false,
                    newquestioMDvaluetype:false,
                    newquestioMDvaluetypes:false,
                    questionaddarray:questionaddarrays
                })
                $('html').animate({
                    scrollTop: 10
                }, 200);

								notification.open({
									message: '提示',
									description:
										'新建成功，请点击右侧加号继续添加',
								});
							window.location.href=`/shixuns/${id}/challenges/${checkpointId}/editquestion/${response.data.challenge_choose_id}`;

							// this.getanswer_subitlist()
                // this.gochooseid("/shixuns/"+this.props.match.params.shixunId+"/challenges/"+this.props.match.params.checkpointId+"/editquestion"+"/"+response.data.challenge_choose_id)
            }).catch((error) => {
                console.log(error)
            });
        }


    }

    questionlist=(key,challenge_choose_id,type)=>{
        $('html').animate({
            scrollTop:10
        }, 500);

        let{challenge_id} =this.state;

        if(challenge_choose_id===""||type===0){


					  // this.neweditanswerRef.current.setValue('')
				  	// this.editanswersRef.current.setValue('')
            this.setState({
                activetype:challenge_choose_id,
                editquestionaddtype:true,
                questionaddtype:true,
                newquestionaddtype:false,
                questionlists:[{str:"A",val:"",type:false},{str:"B",val:"",type:false},{str:"C",val:"",type:false},{str:"D",val:"",type:false}],
                answeshixunsGroup: 1,
                answeoptions:[10,20],
                answeonshixunsmark:10,
                shixunssanswerkillvalue:"",
                shixunsskillanswerlist:[],
						  	neweditanswerRefval:'',
						  	editanswersRefval:''
            })
					this.newquestioMDMdRef.current.setValue('')
					this.newquestioMDMdCont.current.setValue('')
        }else{
            let id = this.props.match.params.shixunId;
            let url ='/shixuns/'+id+'/challenges/'+challenge_id+'/edit_choose_question.json?choose_id='+challenge_choose_id;
            axios.get(url).then((response) => {
                if(response.status===200){
                    let choose_contents=response.data.choose_contents;
                    let newchoose_contentslist=[]
                    for(var i=0; i<choose_contents.length; i++){
                        let a=choose_contents[i];
                        newchoose_contentslist.push({str:letterArr[a.position],val:a.option_name,type:a.right_key})
                    }
                    this.setState({
                        activetype:challenge_choose_id,
                        editquestionaddtype:true,
                        questionaddtype:false,
                        newquestionaddtype:false,
                        editlist:response.data,
                        questionlists:newchoose_contentslist,
                        answeshixunsGroup:response.data.difficult,
                        answeonshixunsmark:response.data.score,
                        shixunsskillanswerlist:response.data.tags,
                        challenge_choose_id:challenge_choose_id,
                        standard_answer:response.data.standard_answer,
                        subject:response.data.subject,
                        answer:response.data.answer,
										  	neweditanswerRefval:response.data.subject,
											  editanswersRefval:response.data.subject
                    })

								  	this.neweditanswerRef.current.setValue(response.data.subject||'')
								  	this.editanswersRef.current.setValue(response.data.answer||'')
                    this.shixunsautoHeight()
                }


            }).catch((error) => {
            });

        }

    }

    shixunsautoHeight=()=>{
    $.fn.autoHeight = function(){
        function autoHeight(elem){
            elem.style.height = 'auto';
            elem.style.maxHeight = '140px';
            elem.scrollTop = 0; //防抖动
            if(elem.scrollHeight===0){
                elem.style.height = 62 + 'px';
            }else{

                elem.style.height = elem.scrollHeight + 'px';
            }

        }
        this.each(function(){
            autoHeight(this);
            $(this).on('keyup', function(){
                autoHeight(this);
            });
        });
    }
    $('textarea[autoHeight]').autoHeight();
    }

    gochooseid=(url)=>{
     window.location.href =url
			// window.location.Reload(url)
			// this.props.history.replace( url );
			// this.props.history.push( url );
		//	返回
		// 	this.props.history.goBack();
    }

    render() {

        let {choice_url,
            practice_url,
            go_back_url,
            position,
            answeoptions,
            questionaddarray,
            questionaddtype,
            activetype,
            newquestionaddtype,
            editquestionaddtype,
            challenge_choose_id,
            prev_challenge,
            next_challenge,
            answer,

             } = this.state;

        let options;


        options = answeoptions.map((d, k) => {
            return (
                <Option key={d} id={k}>{d}</Option>
            )
        })

        return (
            <React.Fragment>
                <div className="educontent mt30 mb30">
                    <div className="padding10-20 mb10 edu-back-white clearfix">
                    <span className="fl ring-blue mr10 mt7" style={{lineHeight:"15px"}}>
                        <img src={getImageUrl("images/educoder/icon/choose.svg")} data-tip-down="实训任务"/>
                    </span>
                        <span className="font-16 task-hide fl TPMtaskName">第{position}关</span>
                        <Link to={go_back_url === undefined ? "" : go_back_url}
                              className="color-grey-6 fr font-15 mt3">返回</Link>
                        { prev_challenge===undefined?"":
                            <a href={prev_challenge} className="fr color-blue mr15 mt4">上一关</a>
                        }

                        { next_challenge===undefined?"":
                            <a href={next_challenge}className="fr color-blue mr15 mt4">下一关</a>
                        }

                        <a href={practice_url === undefined ? "" : practice_url}
                           className="fr color-blue mr15 mt4"
                           style={{display:this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"none":'block'}}
                           data-tip-down="新增代码编辑类型的任务">+&nbsp;实践类型</a>
                        <a href={choice_url === undefined ? "" : choice_url} className="fr color-blue mr15 mt4"
                           style={{display:this.props.identity>4||this.props.identity===undefined||this.props.status===2||this.props.status===1?"none":'block'}}
                           data-tip-down="新增选择题类型的任务">+&nbsp;选择题类型</a>

                    </div>

                    <div className="challenge_nav clearfix edu-back-white question_nav">

											<Popconfirm title="切换前请确认当前选择题已提交，否则不会保存你当前所有输入！" okText="确定" cancelText="取消" onConfirm={this.questionall}>
												<li className={activetype==="first"?"click_active active":""}>
													<a>本关任务</a>
												</li>
											</Popconfirm>

                        {
                            questionaddarray.length===0?"":questionaddarray.map((item,key)=>{
                                return(
                                    <li key={key}
                                        className={parseInt(activetype)===item.choose_id?"click_active active":""}
                                        onClick={parseInt(activetype)===item.choose_id?()=>this.questionlist(key,item.choose_id,item.type):""}
                                    >

                                        {
                                             item.choose_id!=0?
                                                <Popconfirm title="切换前请确认当前选择题已提交，否则不会保存你当前所有输入！" okText="确定" cancelText="取消" onConfirm={()=>this.gochooseid("/shixuns/"+this.props.match.params.shixunId+"/challenges/"+this.props.match.params.checkpointId+"/editquestion"+"/"+item.choose_id)}>
                                                    <a>{key+1}.{item.type===2?"多选题":item.type===1?"单选题":'选择题'}</a>
                                                </Popconfirm>:activetype==="first"?"":<a>{key+1}.{item.type===2?"多选题":item.type===1?"单选题":'选择题'}</a>
                                        }

                                    </li>
                                )
                            })
                        }


                        <li onClick={this.questionadd}
                            style={{display:questionaddtype===true||this.props.status===2?"none":"block"}}>
                            <Tooltip placement="bottom" title={"新增选择题"}>
                                <a className="add_choose_type" style={{width:'50px'}}>+</a>
                            </Tooltip>
                        </li>

                    </div>

									{/*x选择题首页*/}
									{activetype==="first"?<TpmQuestionMain
										{...this.props}
										{...this.state}
										contentMdRef={this.contentMdRef}
										questionInputvalue={(e)=>this.questionInputvalue(e)}
										clickquestionsumit={(e)=>this.clickquestionsumit(e)}

									/>:""}

                    {/*新建*/}

                    {newquestionaddtype===true?
											<TpmQuestionNew
												{...this.props}
												{...this.state}
												newquestioMDMdRef={this.newquestioMDMdRef}
												newquestioMDMdCont={this.newquestioMDMdCont}
												options={options}
												selquestionlists={(key)=>this.selquestionlists(key)}
												onInputoquestionption={(e,key)=>this.onInputoquestionption(e,key)}
												delquestionlists={(key)=>this.delquestionlists(key)}
												addquestionlists={(e)=>this.addquestionlists(e)}
												onshixunGroupanswe={(e)=>this.onshixunGroupanswe(e)}
												onshixunsansweSelect={(e)=>this.onshixunsansweSelect(e)}
												shixunssanswerkill={(e)=>this.shixunssanswerkill(e)}
												clickshixunsanswerskill={(e)=>this.clickshixunsanswerskill(e)}
												delshixunssnswerllist={(key)=>this.delshixunssnswerllist(key)}
												answer_subit={()=>this.answer_subit()}
											/>:""}


                        {/*修改*/}
                    {editquestionaddtype===true?
											<TpmQuestionEdit
												{...this.props}
												{...this.state}
												neweditanswerRef={this.neweditanswerRef}
												editanswersRef={this.editanswersRef}
												options={options}
												selquestionlists={(key)=>this.selquestionlists(key)}
												onInputoquestionption={(e,key)=>this.onInputoquestionption(e,key)}
												delquestionlists={(key)=>this.delquestionlists(key)}
												addquestionlists={(e)=>this.addquestionlists(e)}
												onshixunGroupanswe={(e)=>this.onshixunGroupanswe(e)}
												onshixunsansweSelect={(e)=>this.onshixunsansweSelect(e)}
												shixunssanswerkill={(e)=>this.shixunssanswerkill(e)}
												clickshixunsanswerskill={(e)=>this.clickshixunsanswerskill(e)}
												delshixunssnswerllist={(key)=>this.delshixunssnswerllist(key)}
												answer_subit={()=>this.answer_subit("edit",challenge_choose_id)}
											/>
                    :""}

                </div>
            </React.Fragment>
        )
    }
}

