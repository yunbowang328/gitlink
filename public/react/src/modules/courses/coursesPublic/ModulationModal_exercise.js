import React, {Component} from "react";
import {Modal, Checkbox, Upload, Button, Icon, message, Input, Form} from "antd";
import {WordNumberTextarea} from 'educoder';
import './Newshixunmodel.css'

//调分
class ModulationModal_exercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			subjective_questions: 0,
			objective_questions: 0,
			subjective_score: 0,
			objective_score: 0,
			subool: false,
			Inputsval: '',
			Inputsvals: '',
			Inputsvaltype: false,
			Inputsvaltypes: false,
			Inputsvaltest: "",
			Inputsvaltests: "",

		}
		this.focus = this.focus.bind(this);
		this.focuss = this.focuss.bind(this);
		this.focusss = this.focusss.bind(this);

		//因为主观题加客观题的和是总分
	}
	focus() {
		// 直接使用原生 API 使 text 输入框获得焦点
		this.textInput.focus();
	}
	focuss() {
		// 直接使用原生 API 使 text 输入框获得焦点
		this.textInputs.focus();
	}
	focusss() {
		// 直接使用原生 API 使 text 输入框获得焦点
		this.textInputss.focus();
	}

	componentDidMount = () => {
		console.log("ModulationModal_exercise");
		console.log(this.props);
		this.setState({
			subjective_score: this.props.subjective_score,
			objective_score: this.props.objective_score,
		})
		if (this.props.subjective_score > 0 && this.props.objective_score > 0) {
			this.setState({
				subool: false,
			})
		} else {
			this.setState({
				subool: true
			})
		}

	}

	Saves = () => {
		debugger
		let {
			textareaval,
			subjective_questions,
			objective_questions,
			score,
			subool,
			Inputsval,
			subjective_score,
			objective_score,
			Inputsvals
		} = this.state;
		let re = /^[0-9]+.?[0-9]*$/;//判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		let res= /^\-[1-9][0-9]*$/; //判断字符串是负整数
		if (subool === false) {
			let subools=false;
			let suboolss=false;
			//不是总分模式
			if (Inputsval === undefined || Inputsval === null || Inputsval === "") {
				this.setState({
					Inputsval: "",
					Inputsvaltype: true,
					Inputsvaltest: "主观题成绩不能为空",
				})
				subools=true;
			}

			//判断主观题
			if(subools===false){
				var nubmer = Inputsval;
				if (!re.test(nubmer)&&!res.test(nubmer)) {
					this.setState({
						Inputsval: Inputsval,
						Inputsvaltype: true,
						Inputsvaltest: "请输入0-100的分数",
					})
					subools=true;
				}

			}

			if(subools===false){
			if (0 > parseFloat(Inputsval)) {
				this.setState({
					Inputsval: Inputsval,
					Inputsvaltype: true,
					Inputsvaltest: "主观题成绩不能小于零",
				})
				subools=true;
			} else if (parseFloat(Inputsval) > this.props.subjective_score) {
				this.setState({
					Inputsval: Inputsval,
					Inputsvaltype: true,
					Inputsvaltest: `主观题成绩不能大于主观题总分值${this.props.subjective_score}`,
				})
				subools=true;
			}
			}
			//判断客观题

			if (Inputsvals === undefined || Inputsvals === null || Inputsvals === "") {
				this.setState({
					Inputsvals: "",
					Inputsvaltypes: true,
					Inputsvaltests: "客观题成绩不能为空",
				})
				suboolss=true;
			}

			if(suboolss===false){
				var nubmers = Inputsvals;
				if (!re.test(nubmers)&&!res.test(nubmers)) {
					this.setState({
						Inputsvals: "",
						Inputsvaltypes: true,
						Inputsvaltests: "请输入0-100的分数",
					})
					suboolss=true;
				}
			}

			if(suboolss===false){
			if (0 > parseFloat(Inputsvals)) {
				this.setState({
					Inputsvals: Inputsvals,
					Inputsvaltypes: true,
					Inputsvaltests: "客观题成绩不能小于零",
				})
				suboolss=true;
			} else if (parseFloat(Inputsvals) > this.props.objective_score) {
				this.setState({
					Inputsvals: Inputsvals,
					Inputsvaltypes: true,
					Inputsvaltests: `客观题成绩不能大于客观题总分值${this.props.objective_score}`,
				})
				suboolss=true;
			}
			}
			if(subools===true ||suboolss===true){
				if(subools===true && suboolss===true){
					this.focus()
				}else if(subools===true){
					this.focus()
				}else if(suboolss===true){
					this.focuss()
				}
			return;
			}

		} else {

			//总分模式
			if (subjective_score > 0) {
				//主观题
				if (Inputsval === undefined || Inputsval === null || Inputsval === "") {
					this.setState({
						Inputsval: "",
						Inputsvaltype: true,
						Inputsvaltest: "总成绩不能为空",
					})
					this.focusss()
					return
				}

				//判断主观题
				var nubmer = Inputsval;
				if (!re.test(nubmer)&&!res.test(nubmer)) {
					this.setState({
						Inputsval: Inputsval,
						Inputsvaltype: true,
						Inputsvaltest: "请输入0-100的分数",
					})
					this.focusss()
					return;
				}


				if (0 > parseFloat(Inputsval)) {
					this.setState({
						Inputsval: Inputsval,
						Inputsvaltype: true,
						Inputsvaltest: "总成绩不能小于零",
					})
					this.focusss()
					return;
				} else if (parseFloat(Inputsval) > this.props.subjective_score) {
					this.setState({
						Inputsval: Inputsval,
						Inputsvaltype: true,
						Inputsvaltest: `总成绩不能大于总分值${this.props.subjective_score}`,
					})
					this.focusss()
					return;
				}
			} else if (objective_score > 0) {
				//客观题
				if (Inputsvals === undefined || Inputsvals === null || Inputsvals === "") {
					this.setState({
						Inputsvals: "",
						Inputsvaltypes: true,
						Inputsvaltests: "总成绩不能为空",
					})
					this.focusss()
					return
				}
				var nubmers = Inputsvals;
				if (!re.test(nubmers)&&!res.test(nubmers)) {
					this.setState({
						Inputsvals: "",
						Inputsvaltypes: true,
						Inputsvaltests: "请输入0-100的分数",
					})
					this.focusss()
					return;
				}

				if (0 > parseFloat(Inputsvals)) {
					this.setState({
						Inputsvals: Inputsvals,
						Inputsvaltypes: true,
						Inputsvaltests: "总成绩不能小于零",
					})
					this.focusss()
					return;
				} else if (parseFloat(Inputsvals) > this.props.objective_score) {
					this.setState({
						Inputsvals: Inputsvals,
						Inputsvaltypes: true,
						Inputsvaltests: `总成绩不能大于总分值${this.props.objective_score}`,
					})
					this.focusss()
					return;
				}

			}
		}


		this.props.Saves(Inputsval, Inputsvals);

	}

	settextarea = (e) => {
		this.setState({
			textareaval: e.target.value
		})
	}

	//主观题
	setInputs = (e) => {
		console.log("主");
		console.log(e.target.value);
		this.setState({
			Inputsval: e.target.value,
			Inputsvaltype: false,
		})
	}

	//客观题
	setInputss = (e) => {
		console.log("客");
		console.log(e.target.value);
		this.setState({
			Inputsvals: e.target.value,
			Inputsvaltypes: false,

		})
	}
	//最终成绩主观题
	setInputsss = (e) => {
		console.log("终主");
		console.log(e.target.value);
		this.setState({
			Inputsval: e.target.value,
			Inputsvaltype: false,
		})
	}
	//最终成绩客观题
	setInputssss = (e) => {
		console.log("终客");
		console.log(e.target.value);
		this.setState({
			Inputsvals: e.target.value,
			Inputsvaltypes: false,
		})

	}

	render() {
		let {
			Inputsvaltype,
			Inputsvaltypes,
			Inputsvaltest,
			Inputsvaltests,
			subjective_score,
			objective_score,
			Inputsval,
			Inputsvals,
		} = this.state;
		return (
			<div>
				<Modal
					keyboard={false}
					className={"HomeworkModal"}
					title={this.props.modalname || '评阅'}
					visible={this.props.visible}
					closable={false}
					footer={null}
					destroyOnClose={true}
				>
					<div className="clearfix" style={{
						display: "-webkit-flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
						{
							subjective_score > 0 && objective_score > 0 ?
								<div>
									{Inputsvaltype === true ?
										<style>
											{
												`
										.ant-input:hover {
												border: 1px solid #DD1717!important;
								    }
								    .ant-input:focus {
								    border: 1px solid #DD1717!important;
								    }
								    }
										`
											}
										</style>
										:
										""

									}
									<div className="mexertwo" style={{
										marginTop: "20px",
									}}>
										<p className="mexeheigth2 mr10">主观题成绩:</p>
										<Input
											className={Inputsvaltype === true ? "borerinput myinputnumbers  bor-reds" : "myinputnumbers"}
											style={{
												width: "150px",
												height: "40px",
											}}
											placeholder="请填写主观题成绩"
											onInput={this.setInputs}
											ref={(input) => { this.textInput = input; }}
											value={Inputsval === undefined || Inputsval === null ? "" : Inputsval}/>
										<p className="mexeheigth ml10">分 ，</p>
										<p className="mexeheigth initialflex"><p className="mexeheigth">总分：</p><p className="mr10 mexeheigth"  ><p
											style={{
												minWidth:'40px'
											}}
											className="mexeheigth"
										>{subjective_score}</p></p><p
											className=" mexeheigth">分</p></p>
									</div>
									{
										Inputsvaltype === true ?
											<p style={{
												color: "#DD1717",
												width: "77%",
												marginLeft: "82px",
												marginTop: "10px",
											}}>{Inputsvaltest}</p>
											: ""
									}
									{Inputsvaltypes === true ?
										<style>
											{
												`
										.ant-input:hover {
												border: 1px solid #DD1717!important;
								    }
								    .ant-input:focus {
								    border: 1px solid #DD1717!important;
								    }
								    }
										`
											}
										</style>
										:
										""

									}
									<div className="mexertwo" style={{
										marginTop: "20px",
									}}>

										<p className="mexeheigth2 mr10">客观题成绩:</p>
										<Input
											className={Inputsvaltypes === true ? "borerinput myinputnumbers  bor-reds" : "myinputnumbers"}
											style={{
												width: "150px",
												height: "40px",
											}}
											placeholder="请填写客观题成绩"
											onInput={this.setInputss}
											ref={(input) => { this.textInputs = input; }}
											value={Inputsvals === undefined || Inputsvals === null ? "" : Inputsvals}/>
										<p className="mexeheigth ml10">分 ，</p>
										<p className="mexeheigth initialflex"><p className="mexeheigth">总分：</p><p  className="mr10 mexeheigth" ><p className="mexeheigth" style={{
											minWidth:'40px'
										}}>{objective_score}</p> </p><p
											className=" mexeheigth">分</p></p>

									</div>
									{
										Inputsvaltypes === true ?
											<p style={{
												color: "#DD1717",
												width: "77%",
												marginLeft: "82px",
												marginTop: "10px",
											}}>{Inputsvaltests}</p>
											: ""
									}

									<div className="minbuttionte">
										<a className="task-btn color-white mr30" style={{width: "72px",}}
											 onClick={this.props.Cancel}>{this.props.Cancelname || '取消'}</a>
										<a className="task-btn task-btn-orange" style={{width: "72px",}}
											 onClick={this.Saves}>{this.props.Savesname || '保存'}</a>
									</div>
								</div>
								:
								<div className="mt20">
									{
										subjective_score > 0 && objective_score === 0 ?
											<div>
												{Inputsvaltype === true ?
													<style>
														{
															`
										.ant-input:hover {
												border: 1px solid #DD1717!important;
								    }
								    .ant-input:focus {
								    border: 1px solid #DD1717!important;
								    }
								    }
										`
														}
													</style>
													:
													""

												}
												<div className="mexertwo">
													<p className="mexeheigth2">最终成绩:</p>
													<Input
														className={Inputsvaltype === true ? "borerinput myinputnumbers  bor-reds" : "myinputnumbers"}
														style={{
															width: "150px",
															height: "40px",
														}}
														placeholder="请填写最终成绩"
														onInput={this.setInputsss}
														ref={(input) => { this.textInputss = input; }}
														value={Inputsval === undefined || Inputsval === null ? "" : Inputsval}/>
													<p className="mexeheigth ml10"> 分 ，</p>
													<p className="mexeheigth">
														<span>总分：</span><span className="mr10">{subjective_score > 0 && objective_score === 0 ? subjective_score : ""} {objective_score > 0 && subjective_score === 0 ? objective_score : ""}</span><span
														>分</span></p>

												</div>
												{
													Inputsvaltype === true ?
														<p style={{
															color: "#DD1717",
															width: "77%",
															marginLeft: "75px",
															marginTop: "10px",
														}}>{Inputsvaltest}</p>
														: ""
												}
											</div>
											:
											""
									}
									{
										objective_score > 0 && subjective_score === 0 ?
											<div>
												{Inputsvaltypes === true ?
													<style>
														{
															`
										.ant-input:hover {
												border: 1px solid #DD1717!important;
								    }
								    .ant-input:focus {
								    border: 1px solid #DD1717!important;
								    }
								    }
										`
														}
													</style>
													:
													""

												}
												<div className="mexertwo">
													<p className="mexeheigth2">最终成绩:</p>
													<Input
														className={Inputsvaltypes === true ? "borerinput myinputnumbers  bor-reds" : "myinputnumbers"}
														style={{
															width: "150px",
															height: "40px",
														}}
														placeholder="请填写最终成绩"
														onInput={this.setInputssss}
														value={Inputsvals === undefined || Inputsvals === null ? "" : Inputsvals}
														onFocus={true}
													/>
													<p className="mexeheigth ml10"> 分 ，</p>
													<p className="mexeheigth">
														<span>总分：</span><span className="mr10">{subjective_score > 0 && objective_score === 0 ? subjective_score : ""} {objective_score > 0 && subjective_score === 0 ? objective_score : ""}</span><span
														>分</span></p>

												</div>
												{
													Inputsvaltypes === true ?
														<p style={{
															color: "#DD1717",
															width: "77%",
															marginLeft: "75px",
															marginTop: "10px",
														}}>{Inputsvaltests}</p>
														: ""
												}
											</div>
											:
											""
									}


									<div className="minbuttionte">
										<a className="task-btn color-white mr30" style={{width: "72px",}}
											 onClick={this.props.Cancel}>{this.props.Cancelname || '取消'}</a>
										<a className="task-btn task-btn-orange" style={{width: "72px",}}
											 onClick={this.Saves}>{this.props.Savesname || '保存'}</a>
									</div>
								</div>

						}
					</div>
				</Modal>
			</div>
		)
	}
}

export default ModulationModal_exercise;
// <div className="task-popup-content">
//   <p className="task-popup-text-center font-16 mb20">
//
//     <span className={"color-dark-21"}>该学生的最终成绩将不会按照评分规则进行计算</span>
//
//   </p>
//
//
//   <div className="clearfix">
//     {/*<textarea*/}
//     {/*className="winput-100-150"*/}
//     {/*placeholder="请填写您对作品调分的原因"*/}
//     {/*value={textareaval}*/}
//     {/*onInput={this.settextarea}*/}
//     {/*></textarea>*/}
//
//     <WordNumberTextarea
//       placeholder={"请填写您对作品调分的原因"}
//       onInput={(e)=>this.settextarea(e)}
//       value={textareaval}
//       maxlength={100}
//     />
//
//     {/*<li style={{height:"20px",lineHeight:"20px"}}><span className={textareavaltype===true?"color-red":"none"}>原因不能为空</span></li>*/}
//     <div style={{height:"20px",lineHeight:"20px"}}></div>
//   </div>
//
//   <style>
//     {
//
//       `
// 									.pdl10{
// 									 padding-left:10px;
// 									}
// 									`
//     }
//   </style>
//
//   <li className={"pdl10"}>
//
//   </li>
//   <li style={{height:"20px",lineHeight:"20px"}}><span className={Inputsvaltype===true?"color-red":"none"}>分数不能为空</span></li>
//   <div className="clearfix edu-txt-center">
//     <a  className="task-btn color-white mr30" onClick={this.props.Cancel}>{this.props.Cancelname || '取消'}</a>
//     <a className="task-btn task-btn-orange" onClick={this.Saves}>{this.props.Savesname || '保存'}</a>
{/*  </div>*/
}
{/*</div>*/
}
