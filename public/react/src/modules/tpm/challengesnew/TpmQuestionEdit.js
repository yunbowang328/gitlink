import React, {Component} from 'react';

import {Input, Select, Radio,Button, Badge, message, Modal,Tooltip} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import axios from 'axios';

import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';

const Option = Select.Option;

const RadioGroup = Radio.Group;

export default class TpmQuestionEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentDidMount() {

	}
	delecbtns=()=>{
		let url=`/shixuns/${this.props.match.params.shixunId}/challenges/${this.props.match.params.checkpointId}/destroy_challenge_choose.json`;
		axios.delete((url), { data: {
				choose_id:this.props.match.params.choose_id
				}})
			.then((result)=>{
				if(result.data.status===1){
					window.location.href=`/shixuns/${this.props.match.params.shixunId}/challenges/${this.props.match.params.checkpointId}/editquestion`;
				}
			})
	}

	render() {

		return (
			<div>

				<div className="edu-back-white mb10 clearfix">
					<div className="padding40-20">
						<p className="color-grey-6 font-16 mb30">题干</p>
						<div className="df">
							<span className="mr30 color-orange pt10">*</span>
							<div className="flex1 mr20">
								<TPMMDEditor ref={this.props.neweditanswerRef} placeholder="请输入选择题的题干内容" mdID={'editquestioMDid'} refreshTimeout={1500}
										needRecreate={true}	 watch={true}  className="courseMessageMD" initValue={this.props.neweditanswerRefval}></TPMMDEditor>
							</div>


							<div style={{width: '57px'}} style={{display:this.props.newquestioMDvaluetype===true?"block":"none"}}>
                                        <span className="color-orange mt8 fl"  id="choose_name"
																							style={{display: 'inline'}}><i className="fa fa-exclamation-circle mr3"></i>必填项</span>
							</div>

						</div>
						<p id="e_tip_neweditanswerQuestion" className="edu-txt-right color-grey-cd font-12  pdr20"></p>
						<p id="e_tips_neweditanswerQuestion" className="edu-txt-right color-grey-cd font-12  pdr20"></p>
						<div id="shixun_form" className="mt10">
							{
								this.props.questionlists===undefined||this.props.questionlists.length===0?"":this.props.questionlists.map((item,key)=>{
									return(
										<li className="clearfix pr mb20 df questionli" key={key}>
											<label className="fl"><span
												className={item.type===true?"option-item fr mr10 color-grey select-choice check-option-bg":"option-item fr mr10 color-grey select-choice"}
												onClick={()=>this.props.selquestionlists(key)}
												name="option_span"
												data-tip-down="点击设置答案"
											>{item.str}</span></label>
											<textarea className="input-flex-40 fl candiate_answer"
																name="question[cnt][]"
																placeholder="请输入选项内容"
																value={item.val}
																autoHeight="true"
																id={"question"+key}
																onInput={(e)=>this.props.onInputoquestionption(e,key)}
																style={{resize: 'none', height: '62px'}}></textarea>
											<a className="position-delete option_icon_remove" onClick={()=>this.props.delquestionlists(key)}>
												<i className="fa fa-times-circle color-grey-c font-16 fl"></i>
											</a>
										</li>
									)
								})
							}
							<p className="clearfix ml40">
								<a onClick={()=>this.props.addquestionlists()}
									 className="fl edu-default-btn edu-greyline-btn mb20 option_icon_add">新增选项</a>
								<span className="color-orange mt8 fr  mr20" style={{display:this.props.newcnttype===true?"block":"none"}}id="chooce_error">
                                            <i className="fa fa-exclamation-circle mr3"></i>
									{this.props.newcnttypesum===0?"请选择答案":"选项内容不能为空"}
                                        </span>
							</p>
							<li className="clearfix color-grey-9 ">
								<label className="fl ml40">温馨提示：点击选项标题，可以直接设置答案；选择多个答案即为多选题</label>
								<label className="fr mr20">标准答案：
									<span d="current-option" className="color-orange">{this.props.questionlistss===undefined?"请点击正确选项":this.props.questionlistss.length===0? <span>{this.props.standard_answer}</span>:this.props.questionlistss.map((item,key)=>{
										return(
											<span key={key}>{item}</span>
										)
									})}</span>
								</label>
							</li>
						</div>
					</div>
				</div>


				<div className={"edu-back-white mb10 clearfix"}>
					<div className={"padding40-20"}>
						<p className="color-grey-6 font-16 mb30">参考答案</p>
						<div className={"df mr20"}>
							<div className={"flex1 mr20"}>
								<TPMMDEditor ref={this.props.editanswersRef} placeholder="请输入各个选项的具体解析或其他相关信息" mdID={'editanswersRefConts'} refreshTimeout={1500}
														 watch={true}  className="courseMessageMD" initValue={this.props.editanswersRefval}></TPMMDEditor>
							</div>
							<div className={"choose_names"} style={{display:this.props.newquestioMDvaluetypes===true?"block":"none"}}>
                                        <span className="color-orange mt8 fl"  id="choose_name"
																							style={{display: 'inline'}}><i className="fa fa-exclamation-circle mr3"></i>必填项</span>
							</div>
						</div>
						<p id="e_tip_editanswersQuestion" className="edu-txt-right color-grey-cd font-12  pdr20"></p>
						<p id="e_tips_editanswersQuestion" className="edu-txt-right color-grey-cd font-12  pdr20"></p>
					</div>
				</div>

				<div className="edu-back-white padding40-20 mb20">
					<p className="color-grey-6 font-16 mb30">难度系数</p>
					<div className="clearfix mb40">

						<RadioGroup value={this.props.answeshixunsGroup} className="fl mr40"
												disabled={this.props.status===2?true:false}
												onChange={this.props.status===2?"":(e)=>this.props.onshixunGroupanswe(e)}>
							<Radio value={1}>简单</Radio>
							<Radio value={2}>中等</Radio>
							<Radio value={3}>困难</Radio>
						</RadioGroup>

					</div>
					<p className="color-grey-6 font-16 mb30">奖励经验值</p>
					<div className="clearfix"
						// onMouseLeave={this.onshixunsmarkss}
			    id="challenge_score"
					>
						<span className="fl mr30 color-orange pt10">*</span>
						<Select style={{width: 120}} className="winput-240-40 fl"

										disabled={this.props.status===2?true:false}
										onChange={this.props.status===2?"":(e)=>this.props.onshixunsansweSelect(e)}
							// onMouseEnter={this.onshixunsmarks}
										value={this.props.answeonshixunsmark}
							// open={marktype}
						>
							{this.props.options}

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
										 className="winput-240-40 fl mr20"
										 id="input_task_tag"
										 placeholder="添加标签"
										 onInput={(e)=>this.props.shixunssanswerkill(e)}
										 value={this.props.shixunssanswerkillvalue}
										 onPressEnter={(e)=>this.props.clickshixunsanswerskill(e)}
										 onBlur={(e)=>this.props.clickshixunsanswerskill(e)}
							/>
							{/*<a className="white-btn orange-btn fl mt1 use_scope-btn ml20 mt5 mr20"*/}
							{/*onClick={this.clickshixunsanswerskill}>+ 添加</a>*/}
							<div className="ml15 color-grey-9 mt5">学员答题正确将获得技能，否则不能获得技能（回车添加标签）
								<span className=" color-orange ml20" style={{display:this.props.challenge_tagtype===true?"inline-block":"none"}} id="stage_name_notice">
                                          <i className="fa fa-exclamation-circle mr3"></i>必填项
                                        </span>
							</div>
							<div className="mt20 clearfix" id="task_tag_content">

								{
									this.props.shixunsskillanswerlist.length === 0 ? "" : this.props.shixunsskillanswerlist.map((itme, key) => {
										return (
											<li className="fl ml10 mr10" key={key}>
												<Badge className={"tpmpointer"} count={"x"} onClick={()=>this.props.delshixunssnswerllist(key)}>
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

					</div>
				</div>


				<div className="clearfix mt30" style={{display:this.props.identity>4||this.props.identity===undefined||this.props.power===false?"none":"block"}}>
					<a   className="defalutSubmitbtn fl mr20"
							 onClick={()=>this.props.answer_subit()}>提交</a>
					{/*<a href={this.props.go_back_url}*/}
					{/*	 className="defalutCancelbtn fl">取消</a>*/}
          <Link to={this.props.go_back_url}  className="defalutCancelbtn fl">取消</Link>
					<a  onClick={()=>this.delecbtns()}
						 className="delectshixuncdbtn fr">删除</a>
				</div>

			</div>

		)
	}
}



