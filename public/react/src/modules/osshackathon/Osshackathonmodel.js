import React, { Component } from 'react';
import {Button, Card,  Row, Col ,Upload,Icon,message,Tabs,Form,Input,Modal} from 'antd';
import axios from 'axios';
import {getImageUrl,getUrl,WordNumberTextarea} from 'educoder';

class Osshackathonmodel extends Component{
	constructor(props) {
		super(props)
		this.state={
			title_num: 0,
			title_value: undefined,
			Textarea_comment:undefined
		}
	}
	componentDidUpdate =(prevState)=>{
		// if(prevState!=this.props){
		// 	let name=this.props&&this.props.modelname;
		// 	let mdvalue=this.props&&this.props.modeldescription;
		// 	this.setState({
		// 		title_value:name,
		// 		Textarea_comment:mdvalue
		// 	})
		// }
	}
	componentDidMount(){
		if(this.props.modelid===undefined){
			this.setState({
				title_value:undefined,
				Textarea_comment:undefined
			})
		}else{
			let url=`/osshackathon/${this.props.modelid}/edit.json`;
			axios.get(url).then((result)=>{
				if(result.status==200){
					this.setState({
						title_value:result.data.name,
						Textarea_comment:result.data.description
					})
				}
			})
		}
	}

	handleSubmit = () => {
		let {title_value,Textarea_comment}=this.state;
		// if(mdContnet.length>10000){
		// 	this.props.showNotification("内容超过10000个字");
		// 	return
		// }
		//

		if(this.props.modelid===undefined){
			let url=`/osshackathon.json`;
			axios.post(url,{
					name:title_value,
					description:Textarea_comment,
				}
			).then((response) => {
				if(response.data.status===0){

					this.props.getosshackathon()
					this.props.hideeditSignupentry()
					this.props.showNotification(`提交成功`);
				}
			}).catch((error) => {
				console.log(error)
			})
		}else{
			let url=`/osshackathon/${this.props.modelid}.json`
			axios.put(url,{
					name:title_value,
					description:Textarea_comment,
				}
			).then((response) => {
				if(response.data.status===0){

					this.props.getosshackathon()
					this.props.hideeditSignupentry()
					this.props.showNotification(`提交成功`);
				}
			}).catch((error) => {
				console.log(error)
			})
		}

	}

	changeTitle=(e)=>{
		this.setState({
			title_value:e.target.value,
			title_num:e.target.value.length,
		})
	}

	Textarea_comment=(e)=>{
		this.setState({
			Textarea_comment:e.target.value,
		})
	}
	render() {
		let {textareavaltype}=this.state;
		// console.log(this.props.tabkey)
    // console.log(this.props.Osshackathonmodeltype)

		return (
			<div>

				<style>
					{
						`
								@media (max-width: 2000px) {
											.WordNumberTextarea{
											  height: 130px !important;
											}
									}

								 @media (max-width: 1350px) {
										.HomeworkModal{
 										  top:10px !important;
 										}
 											.WordNumberTextarea{
											  height: 80px !important;
											}
									}

	 								@media (max-width: 1250px) {
 										.HomeworkModal{
 										  top:0px !important;
 										}

 										.WordNumberTextarea{
											  height: 40px !important;
									  }
									}

									`
					}
				</style>
				<Modal
					keyboard={false}
					className={"HomeworkModal"}
					title={this.props.modelid===undefined?"新建项目":"编辑项目"}
					visible={this.props.Osshackathonmodeltype}
					closable={false}
					footer={null}
					destroyOnClose={true}
				>

					<div className={"pd015"}>
						<style>
							{
								`
								.pd015{
								    padding: 0px 15px 15px 15px;
								}
								.font{
									font-size: 14px;
									font-weight: 400;
									color: rgba(5,16,26,1);
								}
								.newfont{
								    height: 16px;
										font-size: 16px;
										font-weight: 400;
										color: rgba(5,16,26,1);
										line-height: 16px;
										margin-bottom: 5px;
								}
								.Osshackathonmodelinput .ant-input, .ant-input .ant-input-suffix{
										background: #fff !important;
								}
								.Osshackathonmodelinput .ant-input-group-wrapper{
								    width:510px !important;
   								  margin-left: 10px;
								}
								`
							}
						</style>
						<div className="clearfix">
							<p className={"font mt10 mb10 ml10"}>
									名称
							</p>

							<Input placeholder="请输入项目名称"
										 value={this.state.title_value}
										 onInput={(e)=>this.changeTitle(e)}
										 className={"Osshackathonmodelinput"}
										 style={{"width": "100%"}} maxLength="60"
										 addonAfter={String(this.state.title_value === undefined || this.state.title_value === null ? 0 : this.state.title_value.length) + "/60"}
							/>

							<p className={"font mt10 mb10 ml10"}>
									描述
							</p>

							<WordNumberTextarea
								placeholder={"请输入项目描述"}
								onInput={(e)=>this.Textarea_comment(e)}
								value={this.state.Textarea_comment}
								maxlength={250}
							/>

							<li style={{height:"20px",lineHeight:"20px"}} className={textareavaltype===true?"color-red mt20 mb10":"none"}><span>评阅内容至少有一个不为空</span></li>
						</div>

						<div className={textareavaltype===false?"mt20 clearfix edu-txt-center":"clearfix edu-txt-center mt20"}>
							<a  className="task-btn color-white mr30" onClick={()=>this.props.hideeditSignupentry()}>取消</a>
							<a className="task-btn task-btn-orange" onClick={()=>this.handleSubmit()}>确定</a>
						</div>
					</div>
				</Modal>
			</div>

		)
	}
}
export default Osshackathonmodel;
