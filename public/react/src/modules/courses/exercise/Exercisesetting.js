import React,{ Component } from "react";
import {Form,Checkbox,DatePicker,Button,Input,Select,Tooltip} from "antd";

import { handleDateString } from 'educoder';
import PollDetailTabForthRules from '../poll/PollDetailTabForthRules';

import '../css/members.css';
import '../css/busyWork.css';
import '../poll/pollStyle.css';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import axios from 'axios';
import Modals from '../../modals/Modals';

const Search=Input.Search;
const Option=Select.Option;

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
          // disabledSeconds: () => [0, 60],
    };
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}

const dataformat="YYYY-MM-DD HH:mm";

class Exercisesetting extends Component{
    constructor(props){
        super(props);
        this.state={
            flagPageEdit:undefined,
            flagPublic:undefined,
            flagRealName:undefined,
            unified_list:undefined,
            course_group:undefined,
            end_time:undefined,
            publish_time:undefined,
            unit_p_tip:"",
            unit_e_tip:"",
            rules:undefined,
            p_flag:true,
            e_flag:true,
            polls:undefined,
            //公用提示弹框相关
            modalsType:false,
            modalsTopval:"",
            loadtype:false,
            modalSave:undefined,
            firstSetting:true,
            score_open:false,
            answer_open:false,
            unified_setting:true,
            show_statistic:false,
            question_random:true,
            choice_random:true,
            time:0,
            publish_timetype:false,
            end_timetype:false,
            exercise_group_id:[],
            page:1,
            limit:10,
            searchtext:"",
            order: "end_at",
        }
        console.log("Exercisesetting");
        console.log("69");
        console.log(props);
    }
    _getRequestParams() {
        const { order, exercise_group_id,searchtext, page ,limit} = this.state
        return {
            page,
            search:searchtext,
            order,
            limit: limit,
            group_id:exercise_group_id,
        }
    }
    //加载
    componentDidMount=()=>{
        this.getSettingInfo();

        // window.addEventListener('click', this.handleClick);
        try {
            this.props.triggerRef(this);
        }catch (e) {

        }

				if(this.props.Commonheadofthetestpaper!=undefined){
					this.editSetting()
				}

			if(this.props.isAdmin() === false){
				this.cancelEdit()
			}
    }
	componentDidUpdate = (prevProps) => {
		if(prevProps.Commonheadofthetestpaper!= this.props.Commonheadofthetestpaper){
			  this.editSetting()
		}
	}

    _getRequestParams() {
        const { order, exercise_group_id,searchtext, page ,limit} = this.state
        return {
            page,
            search:searchtext,
            order,
            limit: limit,
            group_id:exercise_group_id,
        }
    }

    // handleClick=(e)=>{
    //     console.log(e);
    // }

    // 已有设置数据的查询
    getSettingInfo=(type)=>{
        if(type!=1){
            this.props.Commonheadofthetestpapers()
        }

        let Id=this.props.match.params.Id;
        let url=`/exercises/${Id}/exercise_setting.json`;
        axios.get(url).then((result)=>{


            if(result.status==200){

                this.props.form.setFieldsValue({
                    time:result.data.exercise.time===-1?"":result.data.exercise.time,
                });

                this.setState({
                    polls:result.data.exercise,
                    flagPublic:result.data.exercise.is_public,
                    flagRealName:result.data.exercise.un_anonymous,
                    unified_list:result.data.published_course_groups,
                    course_group:result.data.course_groups,
                    publish_time:result.data.exercise.publish_time,
                    end_time:result.data.exercise.end_time,
                    firstSetting:result.data.published_course_groups.length==0 && result.data.exercise.publish_time == null && result.data.exercise.end_time==null,
                    score_open:result.data.exercise.score_open,
                    answer_open:result.data.exercise.answer_open,
                    unified_setting:result.data.exercise.unified_setting,
                    show_statistic:result.data.exercise.show_statistic,
                    question_random:result.data.exercise.question_random,
                    choice_random:result.data.exercise.choice_random,
                    time:result.data.exercise.time,

                    ...result.data.exercise
                })

                if(result.data.exercise.unified_setting == true && moment(result.data.exercise.publish_time) <= moment()){

                    // if(this.props.isSuperAdmin()===true){
                    //     this.setState({
                    //         publish_timetype:false
                    //     })
                    // }else{
                    //发布后谁都不能改
                        this.setState({
                            publish_timetype:true
                        })
                    // }

                }
                if(result.data.exercise.unified_setting == true && moment(result.data.exercise.end_time) <= moment()){
                        this.setState({
                            end_timetype:true
                        })
                }

                let group=result.data.published_course_groups;
                if(group.length==0){
                    let list= [{
                        course_group_id:[],
                        course_group_name:[],
                        publish_time:undefined,
                        end_time:undefined,
                        publish_flag:"",
                        end_flag:"",
                        class_flag:"",
                        course_search:"",
										  	poll_status:0,
                        open:false
                    }]
                    this.setState({
                        rules:list
                    })
                }else{
                    let array=[];
                    for(var i=0;i<group.length;i++){
                        array.push({
                            course_group_id:group[i].course_group_id,
                            course_group_name:group[i].course_group_name,
                            publish_time:group[i].course_publish_time,
                            end_time:group[i].course_end_time,
													  poll_status:result.data.exercise.exercise_status,
                            publish_flag:"",
                            end_flag:"",
                            class_flag:"",
                            course_search:"",
                            open:false
                        })
                    }
                    this.setState({
                        rules:array
                    })
                }
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

//提交form表单
    handleSubmit = (e) => {
        e.preventDefault();
         // if(this.props&&this.props.Commonheadofthetestpaper.exercise_status){
         //     console.log("190");
         //     console.log(this.props.Commonheadofthetestpaper.exercise_status);
         // }

        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                // 第一次进行问卷设置或者勾选了统一设置
                let{unified_setting}=this.state
                if(unified_setting==true){
                    console.log("统一设置");
                    this.UnifiedSetting( );
                }else{
                    console.log("非统一设置");
                    this.NotUnifiedSetting( );
                }
            }
        })
    }
	//跳转道描点的地方
	scrollToAnchor = (anchorName) => {
		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if(anchorElement) { anchorElement.scrollIntoView(); }
		}
	}

    UnifiedSetting=()=>{
        let { unit_e_tip , unit_p_tip , publish_time , end_time ,course_group }=this.state
        // 如果两个时间都没有填写或者只选择了截止时间则先保存设置然后弹出立即发布弹框
        if ( publish_time === undefined ||publish_time === null ){

        	  this.setState({
							unit_p_tip:"不能为空"
						})
					  this.scrollToAnchor("publishtimeid");

        	  return
            // if(moment(end_time,dataformat)<=moment()){
            //     this.setState({
            //         unit_e_tip:"截止时间不能小于当前时间"
            //     })
            // }else{
            //     this.setState({
            //         unit_e_tip:""
            //     })

                // let list=[];
                // let group=course_group;
                // if(group.length>0){
                //     for(var i=0;i<group.length;i++){
                //         list.push({
                //             id:group[i].course_group_id,
                //             name:group[i].course_group_name,
                //         })
                //     }
                // }
                // this.setState({
                //     modalname:"立即发布",
                //     modaltype:list.length > 0 ? 1 : 2,
                //     visible:true,
                //     Topval:"本操作只对“未发布”的对象生效",
                //     Botvalleft:"暂不发布",
                //     Botval:"则通过后续手动设置，定时发布",
                //     starttime:"发布时间："+this.props.getNowFormatDates(1),
                //     endtime:"截止时间：" + moment(end_time == "" || end_time ==undefined ? this.props.getNowFormatDates(2):end_time).format(dataformat),
                //     Cancelname:"暂不发布",
                //     Savesname:"立即发布",
                //     Cancel:this.homeworkhide,
                //     Saves:this.homeworkstartend,
                //     publishCourse:list,
                //     publish_time:this.props.getNowFormatDates(1)
                // })
            // }
        }else{

            if(this.state.publish_timetype === false){
                if(moment(publish_time,dataformat) < moment() ){
                    this.setState({
                        unit_p_tip:"发布时间不能小于当前时间"
                    })
                    return;
                }else{
                    this.setState({
                        unit_p_tip:""
                    })
                }
            }

             if(this.state.end_timetype === false||this.props.isAdmin()==true){
                 if(moment(end_time,dataformat) <= moment(publish_time,dataformat)){
                     this.setState({
                         unit_e_tip:"截止时间不能小于发布时间"
                     })
                     return;
                 }else if(moment(end_time,dataformat)<=moment()){
                     this.setState({
                         unit_e_tip:"截止时间不能小于当前时间"
                     })
                     return;
                 }else{
                     this.setState({
                         unit_e_tip:""
                     })
                 }

             }




            this.commitSetting((result)=>{
            	console.log(result)
                if(result.status==200){
                    this.props.showNotification(`${result.data.message}`);
                    this.getSettingInfo(1);
                    this.cancelEdit();
                }
            })
        }
    }
    // 非统一设置提交
    NotUnifiedSetting=()=>{
			const result = this.refs.pollDetailTabForthRules.exerciseSettingCheck(this.state.rules);
			this.setState({
				rules: result.rules
			})
			if(result.validate==false){
				return;
			}
			this.commitSetting((result)=>{
				console.log(result)
				if(result.status==200){
					this.props.showNotification(`${result.data.message}`);
					this.cancelEdit();
					this.getSettingInfo(1);
				}
			});


    }
    commitSetting=(callback)=>{
        let exercise_id=this.props.match.params.Id;
        let url=`/exercises/${exercise_id}/commit_setting.json`;
        let params=[];
        if(this.state.unified_setting){
            params={
                unified_setting:this.state.unified_setting,
                publish_time:this.state.publish_time,
                end_time:this.state.end_time,
                show_statistic:this.state.show_statistic,
                choice_random:this.state.choice_random,
                score_open:this.state.score_open,
                answer_open:this.state.answer_open,
                question_random:this.state.question_random,
                time:this.state.time,
            }
        }else{
            let list=this.state.rules;
            let lists=[]
            list.map((item,key)=>{
                let newlist={
                    course_group_id:item.course_group_id,
                    publish_time:item.publish_time,
                    end_time:item.end_time
                }
                lists.push(newlist)
            })

            params={
                unified_setting:this.state.unified_setting,
                show_statistic:this.state.show_statistic,
                question_random:this.state.question_random,
                choice_random:this.state.choice_random,
                score_open:this.state.score_open,
                answer_open:this.state.answer_open,
                publish_time_groups:lists,
                time:this.state.time,
            }
        }
        axios.post((url),params).then((result)=>{
            callback(result);
        }).catch((error)=>{
            console.log(error);
        })
    }


    rulesCheckInfo=(rules)=>{
        this.setState({
            rules
        })
    }


    cancelBox=()=>{
        this.setState({
            modalsType:false,
            modalsTopval:"",
            loadtype:false,
        })
    }

    // 是否统一设置
    changeUnit=(e)=>{
        this.setState({
            unified_setting:e.target.checked
        })
    }

    //是否公开统计
    ChangeFlagPublic=(e)=>{
        this.setState({
            score_open:e.target.checked
        })
    }

    //是否实名问卷
    ChangeFlagName=(e)=>{
        this.setState({
            answer_open:e.target.checked
        })
    }

    //题目顺序随机打乱
    questionrandom=(e)=>{
        this.setState({
            question_random:e.target.checked
        })
    }

    //选项顺序随机打乱
    choicerandom=(e)=>{
        this.setState({
            choice_random:e.target.checked
        })
    }
    //答题时间
    funlatepenalty=(e)=>{
        let value= parseInt(e.target.value);

        if(isNaN(value)){
            value=0
        }

        this.setState({
            time:value
        })
    }

    showstatistic=(e)=>{
        this.setState({
            show_statistic:e.target.checked
        })
    }

    onChangeTimepublish=(date, dateString)=>{
        if(date===null){
            this.setState({
                publish_time: null,
                end_time:null
            })
        }else{
            if(moment(handleDateString(dateString),"YYYY-MM-DD HH:mm") <= moment()){
                this.setState({
                    unit_p_tip:"发布时间不能早于当前时间",
                    p_flag:true
                })
            }else{
                this.setState({
                    unit_p_tip:"",
                    p_flag:false
                })
            }
            this.setState({
                publish_time: handleDateString(dateString),
                end_time:moment(moment(handleDateString(dateString)).add(1, 'months')).format("YYYY-MM-DD HH:mm")
            })
        }

    }
    onChangeTimeEnd=(date, dateString)=>{
        if(date===null){
            this.setState({
                end_time:null
            })
        }else{
            if(dateString<=moment().format('YYYY-MM-DD HH:mm')){
                this.setState({
                    unit_e_tip:"截止时间不能早于当前时间",
                    e_flag:true
                })
            }else if(moment(date,"YYYY-MM-DD HH:mm") <= moment(this.state.publish_time,"YYYY-MM-DD HH:mm")){
                this.setState({
                    unit_e_tip:"截止时间不能早于发布时间",
                    e_flag:true
                })
            }else{
                this.setState({
                    unit_e_tip:"",
                    e_flag:false
                })
            }
            this.setState({
                end_time: handleDateString(dateString)
            })
        }

    }

    //编辑
    editSetting = () => {
        if(this.props.Commonheadofthetestpaper.course_is_end==true){
            this.setState({
                modalsType:true,
                modalsTopval:"课堂已结束不能再修改!",
                loadtype:true,
                modalSave:this.cancelBox
            })
        }else{
            this.setState({
                flagPageEdit:true
            })
        }
    }
    //取消编辑
    cancelEdit=()=>{
		    this.getSettingInfo(1);
        this.setState({
            flagPageEdit:false
        })
    }




    render(){
        let{flagPageEdit,end_time,publish_time,course_group,rules,
            unit_p_tip,
            unit_e_tip,
            modalsType,
            modalsTopval,
            loadtype,
            modalSave,
            score_open,
            answer_open,
            unified_setting,
            show_statistic,
            question_random,
            choice_random,
            time,
            polls,
            publish_timetype,
            end_timetype
        }=this.state
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                // sm: { span: 8 },
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                // sm: { span: 16 },
                sm: { span: 24 },
            },
        };

        // console.log(flagPageEdit===true?polls&&polls.exercise_status===1?3:2:1)
			// console.log("asdasdasda");
			//  console.log(this.props);
			//  console.log(this.props.Commonheadofthetestpaper);
        return(
            <div>
                <Modals
                    modalsType={modalsType}
                    modalsTopval={modalsTopval}
                    loadtype={loadtype}
                    modalSave={modalSave}
                ></Modals>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <div className="edu-back-white">
                        <div className="bor-bottom-greyE" style={{padding: "20px 30px 0px 30px"}}>
                            <p className="mb30 clearfix">
                                <span className="font-16 fl">发布设置<span className="color-grey-c font-14"></span></span>
                                {
                                    !flagPageEdit&&this.props.isAdmin()===true ?
                                        <a className="fr mr6 white-btn edu-blueline-btn lineh-24" onClick={this.editSetting}>
																					编辑设置
                                            {/*<Tooltip title="编辑">*/}
                                                {/*<i className="iconfont icon-bianjidaibeijing font-20 color-green"></i>*/}
                                            {/*</Tooltip>*/}
                                        </a>
                                        :""
                                }

                            </p>
                            <div className="pl25">
															{course_group&&course_group.length>1?<p className="clearfix mb20">
                                    <Form.Item className="fl pollForm">
                                        {getFieldDecorator('unified_setting')
                                        (
                                            <Checkbox disabled={this.props.isAdmin()===true?flagPageEdit===true?polls&&polls.exercise_status===1?false:true:true:true} className="mr15 font-16 color-grey-6"
                                                      checked={unified_setting?true:false}
                                                      onChange={this.changeUnit}>统一设置</Checkbox>
                                        )}
                                    </Form.Item>
                                    <span className="color-grey-c">(选中则所有分班使用相同的发布设置，仅课堂管理员可修改；否则各个分班允许单独设置)</span>
                                </p>:""}
															{
                                    unified_setting===true ?
                                        <div>
                                            <div className="clearfix"  id={"publishtimeid"}>
                                                <span className="font-16 mr15 fl mt6">发布时间：</span>
                                                <div className="fl">
																									<Tooltip placement="bottom" title={publish_timetype===true?this.props.isAdmin()? "发布时间已过，不能再修改":"":""}>
                                                    <DatePicker
                                                        dropdownClassName="hideDisable"
                                                        placeholder="请选择发布时间"
																												className={unit_p_tip && unit_p_tip != "" ? "noticeTip winput-240-40":"winput-240-40" }
                                                        showTime={{ format: 'HH:mm' }}
                                                        locale={locale}
                                                        format="YYYY-MM-DD HH:mm"
                                                        showToday={false}
                                                        disabledTime={disabledDateTime}
																												disabledDate={disabledDate}
                                                        onChange={this.onChangeTimepublish}
                                                        value={publish_time && moment(publish_time,"YYYY-MM-DD HH:mm")}
                                                        disabled={ this.props.isAdmin()===true?publish_timetype===true?true:!flagPageEdit:true}
                                                    ></DatePicker>
																									</Tooltip>
                                                    <p className="color-red lineh-25 clearfix" style={{height:"25px"}}>
                                                        {
                                                            unit_p_tip !="" ? <span className="fl">{unit_p_tip}</span>:""
                                                        }
                                                    </p>
                                                </div>
                                                <span className="color-grey-c ml20 fl mt10">(学生收到试卷的时间)</span>
                                            </div>
                                            <div className="clearfix">
                                                <span className="mr15 fl mt10 font-16">截止时间：</span>
                                                <div className="fl">
                                                    <Tooltip placement="bottom" title={end_timetype===true ? this.props.isAdmin()?"":"截止时间已过，不能再修改":""}>
                                                    <DatePicker
                                                        dropdownClassName="hideDisable"
                                                        placeholder="请选择截止时间"
                                                        className={unit_e_tip && unit_e_tip != "" ? "noticeTip winput-240-40 mr20":"winput-240-40 mr20" }
                                                        showTime={{ format: 'HH:mm' }}
                                                        locale={locale}
                                                        showToday={false}
                                                        width={"240px"}
                                                        format="YYYY-MM-DD HH:mm"
                                                        disabledTime={disabledDateTime}
																												disabledDate={disabledDate}
                                                        onChange={this.onChangeTimeEnd}
                                                        value={end_time && moment(end_time,"YYYY-MM-DD HH:mm")}
                                                        disabled={  this.props.isAdmin()===true? end_timetype===true?this.props.isAdmin()?!flagPageEdit:true:!flagPageEdit:true}
                                                    >
                                                    </DatePicker>
                                                    </Tooltip>
                                                    <p className="color-red lineh-25 clearfix" style={{height:"25px"}}>
                                                        {
                                                            unit_e_tip && unit_e_tip != "" ? <span className="fl">{ unit_e_tip }</span>:""
                                                        }
                                                    </p>
                                                </div>
                                                <span className="color-grey-c ml20 fl mt10">(学生可以答题的时间截点)</span>
                                            </div>
                                        </div>
                                        :
                                        <PollDetailTabForthRules
																					{...this.props}
																					{...this.state}
																				  	ref="pollDetailTabForthRules"
                                            rules={rules}
                                            type={"Exercise"}
                                            course_group={course_group}
                                            flagPageEdit={flagPageEdit}
                                            rulesCheckInfo={(info)=>this.rulesCheckInfo(info)}
																					  Commonheadofthetestpaper={this.props.Commonheadofthetestpaper}
                                        ></PollDetailTabForthRules>
                                }
                            </div>
                        </div>
                        <div className="bor-bottom-greyE padding20-30">
                            <p className="mb30 clearfix font-16">答题设置</p>
                                <div className="pl25">
                                <p className="mb20" style={{height:"20px"}}>
                                    <div className={"h21 mb30"}>
                                        <span className={"fl mb10 mt5 mr10 font-16 color-grey-6"}>答题时长：</span>
                                        <Form.Item className="fl pollForm">
                                            {getFieldDecorator('time')
                                            (
                                                <Input   disabled={this.props.isAdmin()===true?!flagPageEdit:true}  className="mr10" style={{width:"100px",height:"35px" }}
                                                         value={time===-1?"":time}
                                                         onInput={this.funlatepenalty}/>
                                            )}
                                        </Form.Item>
                                        <span className={"fl mb10 mt5 mr10 font-16 color-grey-6"}>分钟</span>
                                        <span className={"fl mb10 mt5 mr10 color-grey-c"}>(空值，代表不限时长；非空值，代表限制时长，从学生首次答题开始持续计时)</span>
                                    </div>
                                </p>

                                <p className="">
                                    <div className={"h21"}>
                                        <div className={" mb10 mt5 mr10 font-16 color-grey-6"}>答题显示：</div>
                                        <p className="clearfix mb20 mt20 pl33">
                                            <Form.Item className="fl pollForm">
                                                {getFieldDecorator('question_random')
                                                (
                                                    <Checkbox disabled={this.props.isAdmin()===true?!flagPageEdit:true} className="mr15 font-16 color-grey-6" checked={question_random} onChange={this.questionrandom}>题目顺序随机打乱</Checkbox>
                                                )}
                                            </Form.Item>
                                            <span className="color-grey-c">(选中，则学生答题时，题目顺序按照题型随机显示）</span>
                                        </p>
                                        <p className="clearfix pl33">
                                            <Form.Item className="fl pollForm">
                                                {getFieldDecorator('choice_random')
                                                (
                                                    <Checkbox disabled={this.props.isAdmin()===true?!flagPageEdit:true} className="mr15 font-16 color-grey-6" checked={choice_random} onChange={this.choicerandom}>选项顺序随机打乱</Checkbox>
                                                )}
                                            </Form.Item>
                                            <span className="color-grey-c">(选中，则学生答题时，选项顺序随机显示）</span>
                                        </p>
                                    </div>
                                </p>

                            </div>
                        </div>



                        <div className="padding20-30">
                            <p className="mb30 clearfix font-16">公开设置</p>
                            <div className="pl33">
                                <p className="mb20">

                                    <Form.Item className="fl pollForm">
                                        {getFieldDecorator('score_open')
                                        (
                                            <Checkbox disabled={this.props.isAdmin()===true?!flagPageEdit:true} className="mr15 font-16 color-grey-6" checked={score_open} onChange={this.ChangeFlagPublic}>公开成绩</Checkbox>
                                        )}
                                    </Form.Item>
                                    <span className="color-grey-c">(选中，则在试卷截止时间之后，已提交答题的学生可以查看其它学生的成绩，否则只能查看自己的成绩)</span>
                                </p>
                                <p className="clearfix mb20">
                                    <Form.Item className="fl pollForm">
                                        {getFieldDecorator('answer_open')
                                        (
                                            <Checkbox disabled={this.props.isAdmin()===true?!flagPageEdit:true} className="mr15 font-16 color-grey-6" checked={answer_open} onChange={this.ChangeFlagName}>公开答案</Checkbox>
                                        )}
                                    </Form.Item>
                                    <span className="color-grey-c">(选中，则在试卷截止时间之后，已提交答题的学生可以查看试卷题目的答案，否则不能查看)</span>
                                </p>
                                <p className="clearfix mb5">
                                    <Form.Item className="fl pollForm">
                                        {getFieldDecorator('show_statistic')
                                        (
                                            <Checkbox disabled={this.props.isAdmin()===true?!flagPageEdit:true} className="mr15 font-16 color-grey-6" checked={show_statistic} onChange={this.showstatistic}>公开统计</Checkbox>
                                        )}
                                    </Form.Item>
                                    <span className="color-grey-c">(选中，则在试卷截止时间之后，已提交答题的学生可以查看答题统计，否则不能查看)</span>
                                </p>
                            </div>
                        </div>

                    </div>
                    {
                        flagPageEdit&&this.props.isAdmin()===true ?
                            <div className="clearfix mt30 ml40" style={{paddingBottom:'40px'}}>
                                <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20">提交</Button>
                                <a className="defalutCancelbtn fl" onClick={this.cancelEdit}>取消</ a>
                            </div>:""
                    }

                </Form>
            </div>
        )
    }
}
const WrappedExercisesetting = Form.create({ name: 'exercisesetting' })(Exercisesetting);
export default WrappedExercisesetting;


// //提交form表单
// handleSubmit = (e) => {
//
//     let{unified_setting,answer_open}=this.state;
//     e.preventDefault();
//     let exercise_id=this.props.match.params.Id;
//
//     this.props.form.validateFieldsAndScroll((err, values) => {
//         debugger
//         if(!err){
//             // 第一次进行问卷设置或者勾选了统一设置
//             if(unified_setting==true){
//                 if(this.state.p_flag == false && this.state.e_flag == true){
//                     // 选择了发布时间但截至时间没有选择
//                     this.setState({
//                         modalsType:true,
//                         modalsTopval:"请选择截止时间",
//                         loadtype:true,
//                         modalSave:this.cancelBox
//                     })
//                     return;
//                 }else if(this.state.p_flag == true && this.state.e_flag == true){
//                     // 如果两个时间都没有填写则弹出立即发布弹框
//                     let{publish_time,end_time}=this.state
//                     if(publish_time==undefined && end_time ==undefined){
//
//                     }else{
//                         // 否则就是选择的时间错误
//                         this.setState({
//                             modalsType:true,
//                             modalsTopval:"请选择正确的发布时间和截止时间",
//                             loadtype:true,
//                             modalSave:this.cancelBox
//                         })
//                     }
//                     return;
//                 }
//             }
//
//             let url=`/exercises/${exercise_id}/commit_setting.json`;
//             let params=[];
//             if(values.unitSet){
//                 params={
//                     unified_setting:values.unitSet,
//                     publish_time:this.state.publish_time,
//                     end_time:this.state.end_time,
//                     show_result:values.public,
//                     un_anonymous:values.real
//                 }
//             }else{
//                 params={
//                     unified_setting:values.unitSet,
//                     show_result:values.public,
//                     un_anonymous:values.real,
//                     publish_time_groups:this.state.rules
//                 }
//             }
//             axios.post((url),{params}).then((result)=>{
//                 if(result.status==200){
//                     this.props.showNotification(`${result.data.message}`);
//                 }
//             }).catch((error)=>{
//                 console.log(error);
//             })
//         }
//     })
// }
