import React,{ Component } from "react";
import { Input, InputNumber, Form, Button, Checkbox, Upload, Icon, message, Modal } from "antd";
import axios from 'axios'
import '../css/busyWork.css'
import '../css/Courses.css'
import { WordsBtn, getUrl, ConditionToolTip, appendFileSizeToUploadFile, appendFileSizeToUploadFileAll
	, getUploadActionUrl } from 'educoder'
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import CBreadcrumb from '../common/CBreadcrumb'
import NewWorkForm from './NewWorkForm'

const confirm = Modal.confirm;
const $ = window.$
const MAX_TITLE_LENGTH = 60;
class NewWork extends Component{
	constructor(props){
		super(props);
		this.contentMdRef = React.createRef();
		this.answerMdRef = React.createRef();

		this.state={
			category: {},
			course_name: ''
		}
	}
	componentDidMount () {
		let {typeId, coursesId, pageType, workId}=this.props.match.params;
		const isEdit = pageType === "edit"
		this.isEdit = isEdit;
		if (isEdit) {
			this.fetchWork(workId)
		} else {
			this.fetchCourseData(coursesId)
		}
	}
	fetchCourseData = (courseId) => {
		const isGroup = this.props.isGroup()
		const url = `/courses/${courseId}/homework_commons/new.json?type=${isGroup ? 3 : 1}`
		axios.get(url, {
			})
			.then((response) => {
				if (response.data.course_name) {
					const data = response.data;
					this.setState({
						course_id: data.course_id,
						course_name: data.course_name,
						category: data.category,

					})
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	fetchWork = (workId) => {
		const url = `/homework_commons/${workId}/edit.json`
		axios.get(url, {
			})
			.then((response) => {
				if (response.data.name) {
					const data = response.data;
					data.isEdit = this.isEdit
					this.setState({
						course_id: data.course_id,
						course_name: data.course_name,
						category: data.category,
					})
					this.newWorkFormRef.initValue(response.data)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onCancel = () => {
		this.props.toListPage(this.props.match.params, this.state.category.category_id)
	}

	doEdit = (params) => {
		const workId = this.props.match.params.workId
		const newUrl = `/homework_commons/${workId}.json`

		axios.put(newUrl, params)
			.then((response) => {
				if (response.data.status == 0) {
					this.props.showNotification('保存成功')
					this.props.toWorkListPage(this.props.match.params, workId)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	doNew = (params) => {
		const coursesId = this.props.match.params.coursesId
		const newUrl = `/courses/${coursesId}/homework_commons.json`

		axios.post(newUrl, params)
			.then((response) => {
				if (response.data.status == 0) {
					this.props.showNotification('保存成功')
					this.props.toWorkListPage(this.props.match.params, response.data.homework_id)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleContentUploadChange = (info) => {
		if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
			let contentFileList = info.fileList;
			this.setState({ contentFileList: appendFileSizeToUploadFileAll(contentFileList) });
		}
	}
	handleAnswerUploadChange = (info) => {
		if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
			let answerFileList = info.fileList;
			this.setState({ answerFileList: appendFileSizeToUploadFileAll(answerFileList) });
		}
	}

	onAttachmentRemove = (file, stateName) => {
		if(!file.percent || file.percent == 100){
			this.props.confirm({
				content: '是否确认删除?',

				onOk: () => {
					this.deleteAttachment(file, stateName)
				},
				onCancel() {
					console.log('Cancel');
				},
			});


			return false;
		}

	}

	render(){
		let {typeId,coursesId,pageType}=this.props.match.params;

		const isGroup = this.props.isGroup()
		const moduleName = !isGroup? "普通作业":"分组作业";
		const moduleEngName = this.props.getModuleName()
		let{
			course_name, category
		}=this.state
		const { current_user } = this.props

		const courseId = this.state.course_id || coursesId ;
		const isEdit = this.isEdit;

		const common = {
			onCancel:this.onCancel,
			isGroup: this.props.isGroup,
			doNew: this.doNew,
			doEdit: this.doEdit,
		}
	  document.title=this.state.course_name && this.state.course_name
	 	return(
			<div className="newMain">
				<div className="educontent mt20 mb50">
					<CBreadcrumb items={[
						{ to: current_user && current_user.first_category_url, name: this.state.course_name},
						{ to: `/courses/${courseId}/${moduleEngName}/${category && category.category_id ? category.category_id : ''}`
							, name: category && category.category_name },
						{ name: `${ this.isEdit ? '编辑' : '新建'}` }
					]}></CBreadcrumb>

					<p className="clearfix mt20 mb20">
						<span className="fl font-24 color-grey-3">{this.isEdit ?"编辑":"新建"}{ moduleName }</span>
						<a href="javascript:void(0)" className="color-grey-6 fr font-16 mr2"
							 onClick={() => this.props.history.goBack()}>
							返回
						</a>
					</p>
					<div>
						<style>
							{
								`
                .yslnewworkinputaddonAfter .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}

                `
							}
						</style>
						<NewWorkForm
							{...this.props}
							{...this.state}
							{...common}
							wrappedComponentRef={(ref) => {this.newWorkFormRef = ref}}
						></NewWorkForm>
					</div>
				</div>
			</div>
		)
	}
}

export default NewWork;