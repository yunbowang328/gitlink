import React,{ Component } from "react";
import { Input, InputNumber, Form, Button, Checkbox, Upload, Icon, message, Modal } from "antd";
import axios from 'axios'
import { getUploadActionUrl, getUrl, ConditionToolTip, appendFileSizeToUploadFile, appendFileSizeToUploadFileAll } from 'educoder'
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
const $ = window.$;
const MAX_TITLE_LENGTH = 60;
class NewGtaskForms extends Component{
	constructor(props){
		super(props);
		this.contentMdRef = React.createRef();
		this.state={
			title_num:0,
			description:"",
			contentFileList: [],
		}
	}


	initValue = (data) => {

		if (data.isEdit===true) {
			const contentFileList = data.attachments.map(item => {
				return {
					id: item.id,
					uid: item.id,
					name: appendFileSizeToUploadFile(item),
					url: item.url,
					filesize: item.filesize,
					status: 'done'
				}
			})
			this.setState({
				...data,
				base_on_project: data.task_type===2?data.group_info.base_on_project:undefined,
				title_num: parseInt(data.name.length),
				min_num: data.task_type===2?data.group_info.min_number:undefined,
				max_num: data.task_type===2?data.group_info.max_number:undefined,
				contentFileList,
			}, () => {
				setTimeout(() => {
					this.contentMdRef.current.setValue(data.description || '')
				}, 2000)

				this.props.form.setFieldsValue({
					title: data.name,
					description: data.description || '',
				});

			})
		}


	}


	// 输入title
	changeTitle=(e)=>{
		console.log(e.target.value.length);
		this.setState({
			title_num: parseInt(e.target.value.length)
		})
	}
	handleContentUploadChange = (info) => {
		let contentFileList = info.fileList;
		this.setState({ contentFileList: appendFileSizeToUploadFileAll(contentFileList) });
	}
	deleteAttachment = (file, stateName) => {
		// 初次上传不能直接取uid
		const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
		axios.delete(url, {
			})
			.then((response) => {
				if (response.data) {
					const { status } = response.data;
					if (status == 0) {
						console.log('--- success')

						this.setState((state) => {
							const index = state[stateName].indexOf(file);
							const newFileList = state[stateName].slice();
							newFileList.splice(index, 1);
							return {
								[stateName]: newFileList,
							};
						});
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onAttachmentRemove = (file, stateName) => {
		if(file.response!=undefined){
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

	handleSubmit = () => {

    let {contentFileList,min_num,max_num,base_on_project}=this.state;
    let {data}=this.props;
    let task_type=data.task_type
		let topicId=this.props.topicId
		let attachment_ids = contentFileList.map(item => {
			return item.response ? item.response.id : item.id
		})
		this.props.form.validateFields((err, values) => {

			const mdContnet = this.contentMdRef.current.getValue().trim();

			values.description = mdContnet;

			if (!err) {
				if (this.props.data.isEdit===true) {
					let url="/task_banks/"+topicId+".json";
					axios.put(url, {
							gtask_bank: {
								name: values.title,
								description: values.description,
								min_num:task_type===1?undefined:min_num,
								max_num:task_type===1?undefined:max_num,
								base_on_project: task_type===1?task_type:base_on_project===true?1:0
							},
							attachment_ids:attachment_ids
						}
					).then((response) => {
						if(response.data.status===0){
							this.props.showNotification(response.data.message)
							this.props.onCancel()
						}else{
							this.props.showNotification(response.data.message)
						}
					}).catch((error) => {
						console.log(error)
					})
				}
			} else {
				$("html").animate({ scrollTop: $('html').scrollTop() - 100 })
			}
		})
	}

	max_num_change = (val) => {
		if (val < 2) {
			this.setState({
				max_num: 2,
			})
			return;
		}
		const { min_num } = this.state;
		this.setState({
			max_num: val,
			min_num: val <= min_num ? val - 1 : min_num
		})
	}

	min_num_change = (val) => {
		this.setState({ min_num: val })
	}

	base_on_project_change = () => {
		this.setState({ base_on_project: !this.state.base_on_project })
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		let{
			title_value, contentFileList, answerFileList, max_num, min_num, base_on_project,
			init_max_num, init_min_num,
			title_num, course_name, category, has_commit, has_project,
			isEdit
		}=this.state
		const uploadProps = {
			width: 600,
			fileList: contentFileList,
			multiple: true,
			// https://github.com/ant-design/ant-design/issues/15505
			// showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
			// showUploadList: false,
			action: `${getUploadActionUrl()}`,
			onChange: this.handleContentUploadChange,
			onRemove: (file) => this.onAttachmentRemove(file, 'contentFileList'),
			beforeUpload: (file) => {
				console.log('beforeUpload', file.name);
				const isLt150M = file.size / 1024 / 1024 < 150;
				if (!isLt150M) {
					message.error('文件大小必须小于150MB!');
				}
				return isLt150M;
			},
		};


		return(
				<div>
					<style>
						{
							`
							.newAboutInputForm.ant-form-item, .newAboutInputForm .ant-form-item{padding:20px 30px 20px 30px!important}
							.margin0{margin: 0px!important}
							.tasktypes{width:64px;
							height:22px;
							font-size:16px;
							font-family:Microsoft YaHei;
							font-weight:400;
							line-height:25px;
							color:rgba(51,51,51,1);
							opacity:1;}
							`
						}
					</style>
					<Form className="courseForm" >
						<div className={"ant-row ant-form-item AboutInputForm newAboutInputForm "}>
							<div className="ant-col ant-form-item-label margin0">
								<label htmlFor="coursesNew_course" className="ant-form-item-required ">类型</label>  <span className={"tasktypes"}>{this.props.data&&this.props.data.task_type===1?"普通作业":this.props.data&&this.props.data.task_type===2?"分组作业":""}</span>
							</div>
						</div>
						<Form.Item
							label="标题"
							className="AboutInputForm"
						>
							{getFieldDecorator('title', {
								rules: [{
									required: true, message: '请输入标题'
								}],
							})(
								<Input placeholder="请输入毕设任务标题，最大限制60个字符"
											 onInput={this.changeTitle}
											 className="searchView yslnewworkinputaddonAfter searchViewAfter"
											 style={{"width":"100%"}}
											 maxLength={MAX_TITLE_LENGTH} addonAfter={`${String(title_num)}/${MAX_TITLE_LENGTH}`}
								/>
							)}
						</Form.Item>

						<style>{`
                .uploadBtn.ant-btn {
                  border: none;
                  color: #4CACFF;
                  box-shadow: none;
                  background: transparent;
                  padding: 0 6px;
                }
                .ant-upload-list-item:hover .ant-upload-list-item-info{
                  background-color:#fff;
                }
                .upload_1 .ant-upload-list {
                  width: 350px;
                }

                .ant-input-number {
                  height: 40px;
                  line-height: 40px;
                }

                .workContent.AboutInputForm.ant-form-item {
                  border-bottom: none;
                  padding-bottom: 0px !important;
                }
                .newWorkUpload {
                  padding: 0px 30px 30px 30px!important;
                  background: #fff;
                  width: 100%;
                  display: inline-block;
                  border-bottom: 1px solid #EDEDED;
                }

              `}</style>


						{  <Form.Item
							label="内容"
							className="AboutInputForm workContent mdInForm"
						>
							{getFieldDecorator('description', {
								rules: [{
									required: true, message: '请输入任务内容说明'
								}],
							})(
								<TPMMDEditor ref={this.contentMdRef} placeholder="请输入任务内容说明，最大限制5000个字符" mdID={'courseContentMD'} refreshTimeout={1500}
														 className="courseMessageMD" initValue={this.state.description}></TPMMDEditor>
							)}
						</Form.Item> }
						<Upload {...uploadProps} className="upload_1 newWorkUpload">
							<Button className="uploadBtn">
								<Icon type="upload" /> 上传附件
							</Button>
							(单个文件150M以内)
						</Upload>
						{this.props.data&&this.props.data.task_type===2?
						<Form.Item
							label="分组设置"
							className="AboutInputForm"
						>
							{getFieldDecorator('personNum', {
								rules: [{
									required: false
									// required: true, message: '请输入最小人数和最大人数'
								}],
							})(
								<div>
									<p className="clearfix">
										<ConditionToolTip condition={has_commit} title={'已有提交作品，人数范围只能扩大'}>
											{/* max={has_commit ? init_min_num : null } */}
											每组最小人数：<InputNumber placeholder="请填写每组最小人数" min={1} className="winput-240-40 mr10" value={min_num}
																	 onChange={this.min_num_change} style={{width:'180px'}} />   人
										</ConditionToolTip>

										<span className="ml15 mr15"></span>
										{/* min={has_commit ? init_max_num : (min_num == undefined ? 2 : min_num + 1) }  */}
										<ConditionToolTip condition={has_commit} title={'已有提交作品，人数范围只能扩大'}>
											每组最大人数：<InputNumber className="winput-240-40 mr10" placeholder="请填写每组最大人数" value={max_num} max={10}
																	 onChange={this.max_num_change} style={{width:'180px'}} />   人
										</ConditionToolTip>
										<div className="color-grey-9 mt20 font-14">学生提交作品时需要关联同组成员，组内成员作品共享</div>
									</p>
									<p className="mt20">
										<ConditionToolTip condition={has_commit || has_project} title={'已有关联项目或作品，不能修改'}>
											<Checkbox checked={base_on_project} onChange={this.base_on_project_change}
																disabled={has_project || has_commit}
																className="color-grey-9 font-14"
											>基于项目（选中，则必须在本平台创建项目，项目管理员可以提交作品；不选中，无需在平台创建项目，任意小组成员均可以提交作品）</Checkbox>
										</ConditionToolTip>
									</p>
								</div>
							)}
						</Form.Item>:""
						}
						<Form.Item>
							<div className="clearfix mt30 mb30">
								{/*  htmlType="submit"   */}
								<Button type="primary"  onClick={this.handleSubmit}  className="defalutSubmitbtn fl mr20">提交</Button>
								<a className="defalutCancelbtn fl" onClick={() => this.props.onCancel()}>取消</ a>
							</div>
						</Form.Item>
					</Form>
				</div>
		)
	}
}


const NewGtaskForm = Form.create({ name: 'NewGtaskForm' })(NewGtaskForms);
export default NewGtaskForm;