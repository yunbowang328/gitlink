import React, { Component } from 'react';
import {Button, Card,  Row, Col ,Upload,Icon,message,Tabs,Form,Input} from 'antd';
import axios from 'axios';
import {getImageUrl,getUrl} from 'educoder';
import TPMMDEditor from '../tpm/challengesnew/TPMMDEditor';
class Osshackathonmd extends Component{
	constructor(props) {
		super(props)
		this.contentMdRef = React.createRef();
		this.state={
			title_num: 0,
			title_value: undefined
		}
	}
	componentDidUpdate =(prevState)=>{
		// if(prevState!=this.props){
		// 	let url=`/osshackathon/edit_hackathon.json`;
		// 	axios.get(url).then((result)=>{
		// 		if(result.status==200){
		// 			this.setState({
		// 				title_value:result.data.name
		// 			})
		// 			this.contentMdRef.current.setValue(result.data.description);
		// 		}
		// 	})
		// }
	}
	componentDidMount(){
		let url=`/osshackathon/edit_hackathon.json`;
		axios.get(url).then((result)=>{
			if(result.status==200){
				this.setState({
					title_value:result.data.name
				})
				this.contentMdRef.current.setValue(result.data.description === null ? "" : result.data.description);
			}
		})
	}


	// 输入title
	changeTitle = (e) => {
		// title_num: 60 - parseInt(e.target.value.length),
		this.setState({
			title_num: e.target.value.length,
			title_value: e.target.value
		})

	}
	handleSubmit = () => {
		let {title_value}=this.state;
		const mdContnet = this.contentMdRef.current.getValue().trim();
		// if(mdContnet.length>10000){
		// 	this.props.showNotification("内容超过10000个字");
		// 	return
		// }

		let url=`/osshackathon/update_hackathon.json`;
		axios.post(url,{
			name:title_value,
			description:mdContnet,
			}
		).then((response) => {
     if(response.data.status===0){
     	 this.props.getosshackathon()
			 this.props.hidehackathonedit()
			 this.props.showNotification(`提交成功`);
		 }
		}).catch((error) => {
			console.log(error)
		})

	}
	render() {


		// console.log(this.props.tabkey)
		// console.log(chart_rules)

		return (
			<div className={"mt20"}>
				<Form>
					<Form.Item label="标题">
						<Input placeholder="请输入标题"
									 value={this.state.title_value}
									 onInput={this.changeTitle}
									 className="searchView searchViewAfter h45input" style={{"width": "100%"}} maxLength="60"
									 addonAfter={String(this.state.title_value === undefined || this.state.title_value === null ? 0 : this.state.title_value.length) + "/60"}
						/>
					</Form.Item>

					<Form.Item label="描述">
						<TPMMDEditor ref={this.contentMdRef} placeholder="请输入描述" mdID={'courseContentMD'} refreshTimeout={1500}
												 className="courseMessageMD"
												 initValue={this.state.description === null ? "" : this.state.description}></TPMMDEditor>
					</Form.Item>
				</Form>



				<div className="clearfix mt30 mb30">
					<div className={"fr"}>
						<Button type="primary"  onClick={this.handleSubmit}  className="defalutSubmitbtn fl mr20">提交</Button>
						<a className="defalutCancelbtn fl" onClick={() => this.props.hidehackathonedit()}>取消</ a>
					</div>
				</div>
			</div>

		)
	}
}
export default Osshackathonmd;
