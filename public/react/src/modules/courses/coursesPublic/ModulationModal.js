import React,{ Component } from "react";
import {Modal, Checkbox, Upload, Button, Icon, message, Input, Form, InputNumber} from "antd";
import { WordNumberTextarea } from 'educoder';
import './Newshixunmodel.css'

//调分
class ModulationModal extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
      fileList:[],
      textareaval:undefined,
      Inputsval:undefined
    }
  }


  Saves=()=>{
		console.log("Saves=()");
    let {textareaval,Inputsval}=this.state;
		// if(textareaval===""||textareaval===undefined){
		//   this.setState({
		//     textareavaltype:true
		//   })
		//   return
		// }
    this.setState({
      textareavaltype: false
    })

    if(Inputsval===undefined||Inputsval===""){
			this.setState({
				Inputsval: "",
				Inputsvaltype: true,
				Inputsvaltest: "请填写分数",
			})
      return
    }

		if (this.state.Inputsvaltype === true) {
			return;
		}

		if (Inputsval === undefined || Inputsval === null || Inputsval === "") {
			this.setState({
				borredszf: "ml10  color-grey-9 bor-reds ",
				Inputsval: "",
				Inputsvaltype: true,
				Inputsvaltest: "成绩不能为空",
			})
			return
		}
		var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		var nubmer = Inputsval;
		if (!re.test(nubmer)) {
			this.setState({
				borredszf: "ml10  color-grey-9 bor-reds ",
				Inputsval: Inputsval,
				Inputsvaltype: true,
				Inputsvaltest: "请输入0-100的分数",
			})
			return;
		}
		if (0 > parseFloat(Inputsval)) {
			this.setState({
				borredszf: "ml10  color-grey-9 bor-reds ",
				Inputsval: Inputsval,
				Inputsvaltype: true,
				Inputsvaltest: "成绩不能小于零",
			})
			return;
		} else if (parseFloat(Inputsval) > 100) {
			this.setState({
				borredszf: "ml10  color-grey-9 bor-reds ",
				Inputsval: Inputsval,
				Inputsvaltype: true,
				Inputsvaltest: "成绩不能大于100",
			})
			return;
		}


		this.setState({
			Inputsvaltype: false,
			Inputsvaltest: "",
		})
		console.log(Inputsval);
     this.props.Saves(textareaval,Inputsval)

  }

  settextarea=(e)=>{
   this.setState({
     textareaval:e.target.value
   })
  }

  setInputs=(e)=>{
		console.log("setInputs");
		console.log(e);

		this.setState({
			Inputsval: e,
			Inputsvaltype: false,
		})
  }
  render(){
		let {textareaval, Inputsval, textareavaltype, Inputsvaltype, Inputsvaltest} = this.state;
    return(
      <div>
        <Modal
          keyboard={false}
          className={"HomeworkModal"}
          title={this.props.modalname || '调分'}
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
						<div style={{
							display: "flex",
							flexDirection: "initial",

						}}>
							<p className=" mt3 font-14 " style={{color: "#666666"}}>该学生的最终成绩将不会按照评分规则进行计算</p>
						</div>


						<div style={{
							marginTop: " 27px",
							display: "flex",
							flexDirection: "initial",
							width: "100%",
						}}>
             <span style={{
							 textAlign: "center",
							 lineHeight: "40px",
							 marginLeft: "16px",
						 }}><span style={{
							 textAlign: "center",
							 lineHeight: " 40px",
							 color: " #f5222d",
						 }}>*</span>成绩：</span>
							<style>
								{
									`
									.myinputnumbers .ant-input-number-input{
									line-height: 40px;
                   height: 35px;
									}
									
									`
								}
							</style>
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

							} <InputNumber
							className={Inputsvaltype === true ? "borerinput myinputnumbers  bor-reds" : "myinputnumbers"}
							style={{
														 width: "120px",
														 height: "40px",
													 }}
							placeholder="请填写分数"
							onChange={(e) => this.setInputs(e)}
							value={Inputsval === undefined || Inputsval === null ? "" : Inputsval}/>
							<span
								style={{
									textAlign: "center",
									lineHeight: " 40px",
									marginLeft: "10px",
								}}
							>分</span>
						</div>
						{
							Inputsvaltype === true ?
								<p style={{color: "#DD1717", width: "77%", marginLeft: "1px", marginTop: "10px",}}>{Inputsvaltest}</p>
								: ""
						}



						<div style={{
							display: "flex",
							flexDirection: "initial",
							marginTop: "10px;",
						}}>
							<WordNumberTextarea
								style={{width: "100%"}}
								placeholder={"请填写您对作品调分的原因（选填）"}
								onInput={(e) => this.settextarea(e)}
								value={textareaval}
								maxlength={100}
							/>
						</div>

						<div style={{
							marginTop: "15px",
							width: "82%",
							marginLeft: "70px",
							marginBottom: "29px",
							display: "flex",
							flexDirection: "row-reverse",
						}}>
							<a className="task-btn task-btn-orange " style={{width: "72px", borderRadius: "5px"}}
								 onClick={this.Saves}>{this.props.Savesname || '确认'}</a>
							<a className="task-btn color-white mr30" style={{width: "72px", borderRadius: "5px"}}
								 onClick={this.props.Cancel}>{this.props.Cancelname || '取消'}</a>

						</div>

          </div>


				</Modal>
      </div>
    )
  }
}
export default ModulationModal;
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
