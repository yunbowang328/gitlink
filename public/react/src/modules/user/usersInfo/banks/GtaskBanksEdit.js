import React, { Component } from 'react';
import axios from 'axios'
import NewGtaskForm from './NewGtaskForm';
import NewWorkForm from "./HomeworkBanksEdit";

class GtaskBanksEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			isPublic: undefined,
			isGroup: false
		}
	}
	componentDidMount = () =>{
		let workId = this.props.match.params.workId;
		this.initData(workId);
	}

	initData = (workId) =>{

		let url = `/task_banks/${workId}.json`;
		axios.get(url).then((result)=>{
			if(result){
				const crumbData={
					title:'编辑',
					is_public:result && result.data && result.data.is_public,
					crumbArray:[
						{to:`/banks/gtask/${workId}/${this.props.match.params.type}?tab=0`,content:'详情'},
						{content:'编辑'}
					]
				}
				this.props.initPublic(crumbData,result.data);
				result.data.isEdit = true;
				this.setState({ data:result.data})
				this.newWorkFormRef.initValue(result.data);
			}
		}).catch((error)=>{
			console.log(error)
		})
	}


	doNew = () => {
	}
	doEdit = (params) => {
		const workId = this.props.match.params.workId
		const newUrl = `/homework_banks/${workId}.json`

		// const isGroup = this.props.isGroup()
		axios.put(newUrl, params)
			.then((response) => {
				if (response.data.status == 0) {
					this.props.showNotification('保存成功')
					this.toWorkDetail()
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	toWorkDetail = () => {
		window.location.href=`/banks/gtask/${this.props.match.params.workId}/${this.props.match.params.type}?tab=0`;
		this.props.initPublic(undefined);
	}
	onCancel = () => {
		this.toWorkDetail()
	}
	isGroup = () => {
		return this.state.isGroup;
	}
	render(){

		const common = {
			onCancel:this.onCancel,
			isGroup: this.isGroup,
			doNew: this.doNew,
			doEdit: this.doEdit,
		}
		return(
			<div className="courseForm">
				<style>
					{`
            .courseForm .ant-col-sm-24{
              text-align:left;
            }
          `}
				</style>
				<NewGtaskForm
					{...this.props}
					{...this.state}
					{...common}
					wrappedComponentRef={(ref) => this.newWorkFormRef = ref}
					topicId={this.props.match.params.workId}
				></NewGtaskForm>
			</div>
		)
	}
}
export default GtaskBanksEdit;