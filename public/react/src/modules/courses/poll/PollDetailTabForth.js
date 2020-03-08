import React,{ Component } from "react";
import {Form,Checkbox,DatePicker,Button,Input,Select,Tooltip} from "antd";

import { handleDateString,ConditionToolTip } from 'educoder';
import PollDetailTabForthRules from './PollDetailTabForthRules'
import HomeworkModal from "../coursesPublic/HomeworkModal";

import '../css/members.css'
import '../css/busyWork.css'
import './pollStyle.css'

import moment from 'moment'

import locale from 'antd/lib/date-picker/locale/zh_CN';
import axios from 'axios'
import Modals from '../../modals/Modals'
import { mapProps } from "recompose";

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
		// disabledSeconds: () => [55, 56],
	};
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}

const dataformat="YYYY-MM-DD HH:mm";

class PollDetailTabForth extends Component{
	constructor(props){
		super(props);
		this.state={
			modalname:undefined,
			modaltype:undefined,
			visible:false,
			Topval:undefined,
			Topvalright:undefined,
			Botvalleft:undefined,
			Botval:undefined,
			starttime:undefined,
			endtime:undefined,
			Cancelname:undefined,
			Savesname:undefined,
			Cancel:undefined,
			Saves:undefined,
			chooseId:undefined,
			publishCourse:undefined,

			flagPageEdit:undefined,
			unitSetting:true,
			flagPublic:false,
			flagRealName:undefined,
			course_group:undefined,
			end_time:undefined,
			publish_time:undefined,
			unit_p_tip:undefined,
			unit_e_tip:undefined,
			rules:undefined,
			p_flag:undefined,
			e_flag:undefined,
			polls:undefined,
			un_change_unified:false,
			un_change_end:false,
			//公用提示弹框相关
			modalsType:false,
			modalsTopval:"",
			loadtype:false,
			modalSave:undefined,
			firstSetting:true
		}
	}

	//加载
	componentDidMount=()=>{
		this.getSettingInfo();
		//window.addEventListener('click', this.handleClick);
		if(this.props.pollDetail!=undefined){
			this.editSetting();
		}

		if(this.props.isAdmin() === false){
			this.cancelEdit()
		}
		try {
			this.props.triggerRef(this);
		}catch (e) {

		}
	}
	componentDidUpdate = (prevProps) => {
		if(prevProps.pollDetail!= this.props.pollDetail){
			this.editSetting();
		}
	}
	handleClick=(e)=>{
		console.log(e);
	}

	// 已有设置数据的查询
	getSettingInfo=(type)=>{
		if(type!=1){
			this.props.newgetPollInfo();
		}
		let pollId=this.props.match.params.pollId;
		let url=`/polls/${pollId}/poll_setting.json`;
		axios.get(url).then((result)=>{
			if(result){

				this.setState({
					polls:result.data.poll,
					unitSetting:result.data.poll.unified_setting,
					flagPublic:result.data.poll.show_result,
					flagRealName:result.data.poll.un_anonymous,
					course_group:result.data.course_groups,
					publish_time:result.data.poll.publish_time,
					end_time:result.data.poll.end_time,
					firstSetting:result.data.published_course_groups.length==0 && result.data.poll.publish_time == null && result.data.poll.end_time==null,
				})
				// 统一设置时如果已发布则不能修改统一设置和发布时间，已截止不能修改结束时间
				if(result.data.poll.unified_setting == true && moment(result.data.poll.publish_time) <= moment()){
					this.setState({
						un_change_unified:true
					})
				}
				if(result.data.poll.unified_setting == true && moment(result.data.poll.end_time) <= moment()){
					this.setState({
						un_change_end:true
					})
				}
				let publish_count = 0;
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
						p_timeflag:false,
						e_timeflag:false
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
							publish_flag:"",
							end_flag:"",
							class_flag:"",
							course_search:"",
							poll_status:result.data.poll.polls_status,
							p_timeflag:moment(group[i].course_publish_time) <= moment() ,
							e_timeflag:moment(group[i].course_end_time) <= moment()
						})
						if(moment(group[i].course_publish_time) <= moment()){
							publish_count++;
						}
					}
					this.setState({
						rules:array,
						un_change_unified: publish_count > 0
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

		this.props.form.validateFieldsAndScroll((err, values) => {
			if(!err){

				// 第一次进行问卷设置或者勾选了统一设置
				let{unitSetting}=this.state
				if(unitSetting==true){
					console.log("统一设置");
					this.UnifiedSetting();
				}else{
					console.log("非统一设置");
					this.NotUnifiedSetting();
				}
			}
		})
	}
	UnifiedSetting=()=>{
		let { unit_e_tip , unit_p_tip , publish_time , end_time ,course_group }=this.state
		if( this.state.un_change_unified == false){
			if ( !publish_time ){
				this.setState({
					unit_p_tip:"请选择发布时间"
				})
				return;
			}else if( moment(publish_time,dataformat) < moment() ){
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
		if(this.state.un_change_end == false){
			if(!end_time){
				this.setState({
					unit_e_tip:"请输入截止时间"
				})
				return;
			}else if(moment(end_time,dataformat) <= moment(publish_time,dataformat)){
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
			if(result.status==200){
				this.props.showNotification(`${result.data.message}`);
				this.getSettingInfo(1);
				this.setState({
					flagPageEdit:false
				})
			}
		})
	}

	// 非统一设置提交
	NotUnifiedSetting=()=>{

		const result = this.refs.pollDetailTabForthRules.notUnifiedSettingCheck(this.state.rules);
		this.setState({
			rules: result.rules
		})
		if(result.validate==false){
			return;
		}
		this.commitSetting((result)=>{
			if(result.status==200){
				this.props.showNotification(`${result.data.message}`);
				this.getSettingInfo(1);
				this.setState({
					flagPageEdit:false
				})
			}
		});
	}

	//暂不发布
	homeworkhide=()=>{
		this.setState({
			modalname:undefined,
			modaltype:undefined,
			visible:false,
			Topval:undefined,
			Topvalright:undefined,
			Botvalleft:undefined,
			Botval:undefined,
			starttime:undefined,
			endtime:undefined,
			Cancelname:undefined,
			Savesname:undefined,
			Cancel:undefined,
			Saves:undefined,
			StudentList_value:undefined,
			addname:undefined,
			addnametype:false,
			addnametab:undefined,
			publish_time:undefined
		})
	}

	// 确定立即发布(只要保存设置就可以)
	homeworkstartend=()=>{
		let {chooseId}=this.state;
		let pollId=this.props.match.params.pollId;
		let coursesId=this.props.match.params.coursesId;
		console.log(chooseId);
		this.commitSetting((result)=>{
			if(result.status==200){
				let url=`/courses/${coursesId}/polls/publish.json`;
				axios.post((url),{
					check_ids:[pollId],
					group_ids:chooseId
				}).then((Response)=>{
					if(Response.status == 200){
						this.props.showNotification(`${Response.data.message}`);
						this.homeworkhide();
						this.setState({
							flagPageEdit:false
						})
						this.getSettingInfo();
						this.props.getPollInfo();
					}
				}).catch((error)=>{
					console.log(error);
				})
			}
		})
	}

	getcourse_groupslist=(id)=>{
		this.setState({
			chooseId:id
		})
	}

	commitSetting=(callback)=>{
		let pollId=this.props.match.params.pollId;
		let url=`/polls/${pollId}/commit_setting.json`;
		let params=[];
		if(this.state.unitSetting){
			params={
				unified_setting:this.state.unitSetting,
				publish_time:this.state.publish_time,
				end_time:this.state.end_time,
				show_result:this.state.flagPublic,
				un_anonymous:this.state.flagRealName
			}
		}else{
			params={
				unified_setting:this.state.unitSetting,
				show_result:this.state.flagPublic,
				un_anonymous:this.state.flagRealName,
				publish_time_groups:this.state.rules
			}
		}
		axios.post((url),params).then((result)=>{
			callback(result);
		}).catch((error)=>{
			console.log(error);
		})
	}


	rulesCheckInfo=(rules)=>{
		console.log(rules);
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
			unitSetting:e.target.checked
		})
	}

	//是否公开统计
	ChangeFlagPublic=(e)=>{
		this.setState({
			flagPublic:e.target.checked
		})
	}

	//是否实名问卷
	ChangeFlagName=(e)=>{
		this.setState({
			flagRealName:e.target.checked
		})
	}

	onChangeTimepublish=(date, dateString)=>{
		if(date!=null && date!="" && date != undefined && moment(date,dataformat)>moment()){
			this.setState({
				unit_p_tip:""
			})
		}
		let { end_time }=this.state;
		if(!end_time){
			end_time = moment(handleDateString(dateString)).add(1, 'months');
		}
		this.setState({
			publish_time: handleDateString(dateString),
			end_time:end_time
		})
	}
	onChangeTimeEnd=(date, dateString)=>{
		if( date && moment(date,dataformat)>moment(this.state.publish_time,dataformat) && moment(date,dataformat) > moment()){
			this.setState({
				unit_e_tip:""
			})
		}
		this.setState({
			end_time: handleDateString(dateString)
		})
	}

	//编辑
	editSetting = () => {
		if(this.props.pollDetail.course_is_end==true){
			this.setState({
				modalsType:true,
				modalsTopval:"课堂已结束不能再修改!",
				loadtype:true,
				modalSave:this.cancelBox
			})
		}else{
			this.setState({
				flagPageEdit:this.props.isAdmin()?true:false
			})
		}
	}
	//取消编辑
	cancelEdit=()=>{
		this.setState({
			flagPageEdit:false
		})
		this.getSettingInfo(1);
	}




	render(){
		let{
			modalname,
			modaltype,
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
			publishCourse,
			un_change_unified,
			un_change_end,
			flagPageEdit,unitSetting,flagPublic,flagRealName,end_time,publish_time,course_group,rules,
			unit_p_tip,
			unit_e_tip,
			modalsType,
			modalsTopval,
			loadtype,
			modalSave,
			firstSetting
		}=this.state
		let { pollDetail } = this.props;
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
		let isAdmin = this.props.isAdmin();
		let isStudent = this.props.isStudent();
		return(
			<div>
				<HomeworkModal
					modaltype={modaltype}
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
					course_groups={publishCourse}
					getcourse_groupslist={(id)=>this.getcourse_groupslist(id)}
				/>
				<Modals
					modalsType={modalsType}
					modalsTopval={modalsTopval}
					loadtype={loadtype}
					modalSave={modalSave}
				></Modals>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<div className="edu-back-white">
						<div className="bor-bottom-greyE padding30">
							<p className="mb30 clearfix">
								<span className="font-16 fl">发布设置	 
								{/* <span className="color-grey-c font-14">（课堂管理员、教师、助教拥有发布设置权限）</span> */}
								</span>
								{
									!flagPageEdit && isAdmin ?
										<a className="fr white-btn edu-blueline-btn lineh-24" onClick={this.editSetting}>
											编辑设置
											{/*<Tooltip title="编辑"><i className="iconfont icon-bianjidaibeijing font-20 color-green"></i></Tooltip>*/}
										</a>
										:""
								}
							</p>
							<div className="pl25">
								{
									course_group && course_group.length > 0 &&
									<p className="clearfix mb20">
										<Form.Item className="fl pollForm">
											{getFieldDecorator('unitSet')
											(
												<Checkbox disabled={un_change_unified == true ? true : !flagPageEdit}
																	className="mr15 font-16 color-grey-6" checked={ unitSetting }
																	onChange={this.changeUnit}>统一设置</Checkbox>
											)}
										</Form.Item>
										<span className="color-grey-c font-14">（选中则所有分班使用相同的发布设置，仅课堂管理员可修改；否则各个分班允许单独设置）</span>
									</p>
								}
								{
									unitSetting ?
										<div>
											<div className="clearfix mb5">
												<span className="font-16 mr15 fl mt6">发布时间：</span>
													<div className="fl">
														<Tooltip placement="bottom" title={un_change_unified == true?this.props.isAdmin()? "发布时间已过，不能再修改":"":""}>
															<span>
																<DatePicker
																	showToday={false}
																	dropdownClassName="hideDisable"
																	showTime={{ format: 'HH:mm' }}
																	placeholder="请选择发布时间"
																	locale={locale}
																	className={unit_p_tip && unit_p_tip != "" ?"noticeTip winput-240-40":"winput-240-40" }
																	style={{"height":"42px"}}
																	format="YYYY-MM-DD HH:mm"
																	disabledTime={disabledDateTime}
																	onChange={this.onChangeTimepublish}
																	value={publish_time && moment(publish_time,dataformat)}
																	disabled={un_change_unified == true ? true : !flagPageEdit }
																></DatePicker>
															</span>
														</Tooltip>
														<p className="color-red lineh-25 clearfix" style={{height:"25px"}}>
															{
																unit_p_tip && unit_p_tip != "" ? <span className="fl">{ unit_p_tip }</span>:""
															}
														</p>
													</div>
												<span className="color-grey-c ml20 fl mt10 font-14">（学生收到问卷的时间）</span>
											</div>
											<div className="clearfix">
												<span className="mr15 fl mt10 font-16">截止时间：</span>
												<div className="fl">
													<Tooltip placement="bottom" title={un_change_end ? this.props.isAdmin()?"":"截止时间已过，不能再修改":""}>
														<span>
															<DatePicker
																showToday={false}
																dropdownClassName="hideDisable"
																showTime={{ format: 'HH:mm' }}
																locale={locale}
																placeholder="请选择截止时间"
																style={{"height":"42px"}}
																className={unit_e_tip && unit_e_tip != "" ? "noticeTip winput-240-40 mr20":"winput-240-40 mr20" }
																width={"240px"}
																format="YYYY-MM-DD HH:mm"
																disabledTime={disabledDateTime}
																disabledDate={disabledDate}
																onChange={this.onChangeTimeEnd}
																value={ end_time && moment(end_time,dataformat) }
																// disabled={un_change_end == true ?true : !flagPageEdit }
																disabled={un_change_end == true ? this.props.isAdmin()?!flagPageEdit:true : !flagPageEdit }
															>
															</DatePicker>
														</span>
													</Tooltip>
													<p className="color-red lineh-25 clearfix" style={{height:"25px"}}>
														{
															unit_e_tip && unit_e_tip != "" ? <span className="fl">{ unit_e_tip }</span>:""
														}
													</p>
												</div>
												<span className="color-grey-c ml20 fl mt10 font-14">（学生可以答题的时间截点）</span>
											</div>
										</div>
										:
										<PollDetailTabForthRules
											{...this.props}
											{...this.state}
											ref="pollDetailTabForthRules"
											rules={rules}
											type={"polls"}
											course_group={course_group}
											flagPageEdit={flagPageEdit}
											rulesCheckInfo={(info)=>this.rulesCheckInfo(info)}
										></PollDetailTabForthRules>
								}
							</div>
						</div>
						<div className="padding30">
							<p className="mb30 clearfix font-16">公开设置</p>
							<div className="pl25">
								<p className="mb20">
									<Form.Item className="fl pollForm">
										{getFieldDecorator('public')
										(
											<Checkbox disabled={!flagPageEdit} className="mr15 font-16 color-grey-6" checked={flagPublic} onChange={this.ChangeFlagPublic}>公开统计</Checkbox>
										)}
									</Form.Item>
									<span className="color-grey-c font-14">（选中，则在问卷截止时间之后，已提交问卷题的学生可以查看统计结果，否则不能查看）</span>
								</p>
								<p className="clearfix">
									<Form.Item className="fl pollForm">
										{getFieldDecorator('real')
										(
											<Checkbox disabled={!flagPageEdit} className="mr15 font-16 color-grey-6" checked={flagRealName} onChange={this.ChangeFlagName}>实名问卷</Checkbox>
										)}
									</Form.Item>
									<span className="color-grey-c font-14">（选中，则学生答题后，老师可以查看学生的问卷）</span>
								</p>
							</div>
						</div>
					</div>
					{
						flagPageEdit&& this.props.isAdmin() === true  ?
							<div className="clearfix mt30 mb30">
								<Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20">提交</Button>
								<a className="defalutCancelbtn fl" onClick={this.cancelEdit}>取消</ a>
							</div>:""
					}

				</Form>
			</div>
		)
	}
}
const WrappedPollSet = Form.create({ name: 'pollSetting' })(PollDetailTabForth);
export default WrappedPollSet;