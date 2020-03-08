import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';


export default class TpmQuestionMain extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }


	   render() {
			 return (
				 <div>
					 <div className="edu-back-white mb10 clearfix">
						 <div className="padding40-20">
							 <p className="color-grey-6 font-16 mb30">任务名称</p>
							 <div className="df">
								 <span className="mr30 color-orange pt10">*</span>
								 <div className="flex1 mr20">
									 <input type="text"
													className={this.props.questionInputvaluetype === true ? "input-100-45 greyInpus wind100" : "input-100-45 greyInput "}
													maxLength="50"
													name="challenge[subject]"
													value={this.props.questionsInputvalue}
													placeholder="请输入任务名称（此信息将提前展示给学员）,例：计算学生的课程成绩绩点"
													onInput={this.props.questionInputvalue}
									 />
								 </div>
								 <div style={{width: '57px'}}>
									 <span
										 className={this.props.questionInputvaluetype === true ? "color-orange mt8 fl" : "color-orange mt8 fl none"}
										 id="new_shixun_name"><i className="fa fa-exclamation-circle mr3"></i>必填项</span>
								 </div>
							 </div>
						 </div>
					 </div>


					 <div className="edu-back-white padding40-20 mb20">
						 <p className="color-grey-6 font-16 mb30">过关任务</p>
						 <div className="df">
							 <span className="mr30 color-orange pt10">*</span>
							 <div className="flex1 mr20">
								 <TPMMDEditor ref={this.props.contentMdRef} placeholder="请输入选择题的过关任务内容" mdID={'courseContentMD'} refreshTimeout={1500}
															watch={true}  className="courseMessageMD" initValue={this.props.contentMdRefval} height={700}></TPMMDEditor>
							 </div>
							 <div>
										<span
											className={this.props.questionInputvaluetypes === true ? "color-orange mt8 fl" : "color-orange mt8 fl none"}
											id="new_shixun_pass"><i
											className="fa fa-exclamation-circle mr3"></i>必填项</span>
							 </div>
						 </div>
						 <p id="e_tip_questioMDQuestion" className="edu-txt-right color-grey-cd font-12 pdr20"></p>
						 <p id="e_tips_questioMDQuestion" className="edu-txt-right color-grey-cd font-12  pdr20"></p>
					 </div>


					 <div className="clearfix mt30"
								style={{display: this.props.identity > 4 || this.props.identity === undefined || this.props.power === false ? "none" : "block"}}>
						 <a className="defalutSubmitbtn fl mr20"
								onClick={this.props.sumittype === true ? "" : this.props.clickquestionsumit}>提交</a>
						 {/*<a href={this.props.go_back_url}*/}
							{/*	className="defalutCancelbtn fl">取消</a>*/}
						<Link to={this.props.go_back_url} className="defalutCancelbtn fl">取消</Link>
					 </div>

				 </div>

			 )
		 }
    }



