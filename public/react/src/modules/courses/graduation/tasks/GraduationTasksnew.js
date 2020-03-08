import React, {Component} from "react";
import {Form, Select, Input, Button, Checkbox, Upload, Icon, message, Modal} from "antd";
import {Link} from 'react-router-dom';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import {WordsBtn, getUrl,bytesToSize,appendFileSizeToUploadFileAll , getUploadActionUrl} from 'educoder';
import axios from 'axios';
import Modals from '../../../modals/Modals';
import '../../css/Courses.css';


const {Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype = true;

class GraduationTasksnew extends Component {

	constructor(props) {
		super(props)
		this.state = {
			coursename: "",
			coursesearch: "",
			title_num: 0,
			title_value: "",
			fileList: [],
			contents: [{val: "", id: 1}],
			type: true,
			shixunsreplace:false,
		}
	}

	componentDidMount() {
		// const query =this.props.location.search;
		//
		// const type = query.split('&');
		// let name = type[1].split("name=")
		//     name = String(name).split(",")
		//     name = decodeURI(name[1])
		//
		// this.setState({
		//   coursename:name,
		//   coursesearch:this.props.location.search
		// })
	}

	scrollToAnchors = (anchorName) => {
		this.setState({
			anchor: anchorName
		})
	}

	Commoninterface =(fileList)=>{
    let coursesId=this.props.match.params.coursesId;
		let category_id=this.props.match.params.category_id;
		let listid = []

		for (var list of fileList) {
			listid.push(list.response.id)
		}
		// if (GraduationTasksnewtype === true) {
			this.props.form.validateFields((err, values) => {
				if (values.tasktype === undefined) {
					this.ifHasAnchorJustScorll("tasktypes");
					return
				}
				if (values.name === undefined) {
					this.ifHasAnchorJustScorll("nametypes");
					return
				}
				if (values.description === undefined) {
					this.ifHasAnchorJustScorll("descriptiontypes");
					return
				}else if (values.description.length > 5000) {
					this.ifHasAnchorJustScorll("descriptiontypes");
					return
				}
				if (!err) {
					// console.log('Received values of form: ', values);
					// console.log(fileList);
					const course_id = this.props.match.params.coursesId;

					let url = "/courses/" + course_id + "/graduation_tasks.json"
					axios.post(url, {
							task_type: parseInt(values.tasktype),
							name: values.name,
							description: values.description,
							attachment_ids: listid,
						}
					).then((response) => {
						// if (response.status === 200) {
							// GraduationTasksnewtype = false;
							// this.goback();
						if(response!==undefined){
							// this.goback()
							this.props.history.replace(`/courses/${coursesId}/graduation_tasks/${category_id}/detail/${response.data.task_id}/questions`);
						}
						// }
					}).catch((error) => {
						console.log(error)
					})
				}

			});
		// }
	}




	goback = () => {
		// let courseId = this.props.match.params.coursesId;
		// if(courseId===undefined){
		// 	this.props.history.push("/courses");
		// }else{
		// 	this.props.history.push(this.props.current_user.first_category_url);
		// }
		// this.props.history.goBack()
		this.props.history.replace(`/courses/${this.props.match.params.coursesId}/graduation_tasks/${this.props.match.params.category_id}`);
	}


	// 输入title
	changeTitle = (e) => {
		// title_num: 60 - parseInt(e.target.value.length),
		this.setState({
			title_num: e.target.value.length,
			title_value: e.target.value
		})

	}
	// 附件相关 START
	handleChange = (info) => {
		if(info.file.status == "done" || info.file.status == "uploading" || info.file.status === 'removed'){
			let fileList = info.fileList;

			// for(var list of fileList ){
			//   console.log(list)
			// }
			this.setState({
				fileList: appendFileSizeToUploadFileAll(fileList),
			});
		}
	}

	// onAttachmentRemove = (file) => {
	// 	// confirm({
	// 	//   title: '确定要删除这个附件吗?',
	// 	//   okText: '确定',
	// 	//   cancelText: '取消',
	// 	//   // content: 'Some descriptions',
	// 	//   onOk: () => {
	// 	//     this.deleteAttachment(file)
	// 	//   },
	// 	//   onCancel() {
	// 	//     console.log('Cancel');
	// 	//   },
	// 	// });
	// 	// return false;
	//
	// 	this.setState({
	// 		Modalstype: true,
	// 		Modalstopval: '确定要删除这个附件吗?',
	// 		ModalSave: () => this.deleteAttachment(file),
	// 		ModalCancel: this.cancelAttachment
	// 	})
	// 	return false;
	// }

	cancelAttachment = () => {
		this.setState({
			Modalstype: false,
			Modalstopval: '',
			ModalSave: "",
			ModalCancel: ""
		})
	}

	onAttachmentRemove = (file) => {
		if(!file.percent || file.percent == 100){
			this.props.confirm({
				content: '确定要删除这个附件吗?',
				okText: '确定',
				cancelText: '取消',
				// content: 'Some descriptions',
				onOk: () => {
					this.deleteAttachment(file)
				},
				onCancel() {
					console.log('Cancel');
				},
			});
			return false;

		}

	}

	deleteAttachment = (file) =>{
		const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
			// const url = `/attachments/${file}.json`
			axios.delete(url, {})
				.then((response) => {
					if (response.data) {
						const {status} = response.data;
						if (status == 0) {
							console.log('--- success')

							this.setState((state) => {
								const index = state.fileList.indexOf(file);
								const newFileList = state.fileList.slice();
								newFileList.splice(index, 1);
								return {
									fileList: newFileList,
								};
							});
							this.cancelAttachment()
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
	}

	//滚动
	ifHasAnchorJustScorll() {
		// let anchor = this.getURLStuff("anchor");

		let anchor = this.state.anchor;
		// console.log("anchor ", anchor);
		// 对应id的话, 滚动到相应位置
		if (!!anchor) {
			let anchorElement = document.getElementById(anchor);
			if (anchorElement) {
				window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
			}
		}
		// 没有的话，滚动到头部
		else {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		}
	}

	// 提交按钮
	handleSubmit = (e) => {
		let {fileList} = this.state;
		// if(fileList.length===0){
		// 	this.setState({
		// 		shixunsreplace:true,
		// 	})
		//
		// 	return
		// }

		this.Commoninterface(fileList);

	}
  //确认
	hidestartshixunsreplace =()=>{
		let {fileList} = this.state;

		this.Commoninterface(fileList);
	}
	//取消
	hidestartshixunsreplacetwo=()=>{
		this.setState({
			shixunsreplace:false,
		})

	}


	checkContent = (rule, value, callback) => {
    if (value == "") {
      callback('请输入内容');
    }else if(value.length>5000){
			callback('最大限制为5000个字符');
		}else{
			callback();
		}
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		let {
			coursename, coursesearch, title_num, title_value, pageType, fileList, contents, type,
			Modalstype, Modalstopval, ModalCancel, ModalSave,shixunsreplace
		} = this.state;

		let {coursedata} = this.props;

		let courseId = this.props.match.params.coursesId;
		let position = this.props.match.params.position;
		let category_id = this.props.match.params.category_id;
		const uploadProps = {
			width: 600,
			fileList,
			multiple: true,
			// https://github.com/ant-design/ant-design/issues/15505
			// showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
	    // showUploadList: false,
			action: `${getUploadActionUrl()}`,
			onChange: this.handleChange,
			onRemove: this.onAttachmentRemove,
			beforeUpload: (file) => {
				console.log('beforeUpload', file.name);
				const isLt150M = file.size / 1024 / 1024 < 150;
				if (!isLt150M) {
					this.props.showNotification('文件大小必须小于150MB!');
				}
				return isLt150M;
			},
		};
		// this.ifHasAnchorJustScorll();
		// console.log(this.props.current_user.course_name)
		document.title=this.props.current_user&&this.props.current_user.course_name;
		return (
			<React.Fragment>

				<div>
					{/*提示*/}
					<Modals
						modalsType={Modalstype}
						modalsTopval={Modalstopval}
						modalCancel={ModalCancel}
						modalSave={ModalSave}
					/>
					<Modal
						keyboard={false}
						title="提示"
						visible={shixunsreplace}
						closable={false}
						footer={null}
					>
						<div className="task-popup-content">
							<p className="task-popup-text-center font-16 ">还未上传附件</p>
							<p className="task-popup-text-center font-16 pb20">是否确认提交作品?</p>
						</div>
						<div className="task-popup-submit clearfix">
							<a className="task-btn task-btn-orange fr "
								 onClick={() => this.hidestartshixunsreplace()}>确认</a>
							<a className="task-btn fr mr50"
								 onClick={() => this.hidestartshixunsreplacetwo()}>取消</a>
						</div>
					</Modal>
					<div className="newMain clearfix">
						<div className={"educontent mb20"}>

							<p className="clearfix mt10">
								<WordsBtn style="grey" className="fl"> <a  onClick={this.goback} className="color-grey-6">{this.props.current_user && this.props.current_user.course_name}</a></WordsBtn>
								<span className="color-grey-9 fl ml3 mr3">&gt;</span>
								<WordsBtn style="grey" className="fl"> <Link
									to={"/courses/" + courseId + "/graduation_tasks/" + category_id} className="color-grey-6">毕设任务</Link></WordsBtn>
								<span className="color-grey-9 fl ml3 mr3">&gt;</span>
								<span>{"新建"}</span>
							</p>

							<div style={{width: '100%', height: '60px'}}>
								<p className=" fl color-black mt20 summaryname">新建毕设任务</p>
								<a className="color-grey-6 fr font-16 ml30 mt10 mr20" onClick={this.goback}>返回</a>
							</div>


							{/*<Form*/}
							{/*			onSubmit={GraduationTasksnewtype === true ? this.handleSubmit : ""}>*/}
								<style>
									{
										`.ant-form-item-label{
                	text-align: right;
									vertical-align: middle;
									padding: 0px 0px 20px 0px;
									display: inline-block;
									overflow: hidden;
									white-space: nowrap;
									line-height: 20px; */
									}
									.ant-form-item-control{
										line-height: 39.9999px;
										position: relative;
										zoom: 1;
									}
									`
									}
								</style>
								{/*内容*/}
								<div className="stud-class-set bor-bottom-greyE pt20 pl20 pr20 pb25 edu-back-white">
									<style>
										{
											`
											.tasktype .ant-form-explain{
											   margin-top: -20px;
   											 margin-bottom: 15px;
											}
											`
										}
									</style>
									<Form.Item label="类型" className={"tasktype"}>
										{getFieldDecorator('tasktype', {
											rules: [{required: true, message: "请选择任务类型"}],
										})(<Select className={"greyInput mb20"}
															 style={{width: '20%'}}
															 placeholder="请选择任务类型">
											<Option value="1">普通</Option>
											<Option value="2">分组</Option>
										</Select>)}
										<input type="hidden" id='tasktypes'/>
										<span className={"newcoursestitle"}>（选择确认后，无法修改）</span>
									</Form.Item>
									<style>
										{
											`
											.taskname .ant-form-explain{
											   margin-top: 0px;
   											 margin-bottom: 0px;
											}
											.yslgts   .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
											`
										}
									</style>
									<Form.Item label="任务标题" className={"taskname"} >
										{getFieldDecorator('name', {
											rules: [{required: true, message: "不能为空"}],
										})(

											<Input placeholder="请输入任务名称，最大限制60个字符" value={title_value} onInput={this.changeTitle}
															className="searchView searchViewAfter  h40 yslgts" style={{"width": "100%"}} maxLength="60"
														 addonAfter={String(title_num)+"/60"}/>

															)}
									</Form.Item>
									<input type="hidden" id='nametypes'  />
								</div>


								<div className="stud-class-set pd20  coursenavbox edu-back-white">
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
								.ant-form-item{
								  margin-bottom:0px
								}

              `}</style>
									<Form.Item
										label="内容"
										className="mdInForm "

									>
										{getFieldDecorator('description', {
											rules: [{
												required: true, message: '请输入内容',
											},{
                        max:5000,message:'最大限制5000个字符'
                      }]
										})(
											<TPMMDEditor ref={this.mdRef} placeholder={'请输入任务内容说明，最大限制5000个字符'}
																	 mdID={'courseMessageMD'} className="courseMessageMD"></TPMMDEditor>
										)}
									</Form.Item>
									<input type="hidden" id='descriptiontypes'/>
									<style>
										{
											`
											.upload_1 .ant-upload-list{
													width: 560px;
											}
										`
										}
									</style>
									<Upload {...uploadProps} className="upload_1 ml5">
										<Button className="uploadBtn">
										<Icon type="upload"/> 上传附件
									</Button>
										(单个文件150M以内)
									</Upload>


									{/*{this.state.fileList.length===0?"":this.state.fileList.map((item,key)=>{*/}
										{/*return(*/}
											{/*<p className="color-grey mt10" key={key}  >*/}
												{/*<a className="color-grey fl">*/}
													{/*<i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>*/}
												{/*</a>*/}
												{/*<span className="mr12 color9B9B maxwidth500 fl" length="58">*/}
										{/*{item.name}*/}
									{/*</span>*/}
												{/*<span className="color656565 mt2 color-grey-6 font-12 mr8">*/}
										{/*{item.response===undefined?"":bytesToSize(item.size)}*/}
									{/*</span>*/}
												{/*<i className="font-14 iconfont  icon-guanbi "*/}
													 {/*id={item.response===undefined?"":item.response.id}*/}
													 {/*aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.response===undefined?"":item.response.id&&item.response.id)}></i>*/}
											{/*</p>*/}
										{/*)*/}
									{/*})}*/}

								</div>


								<Form.Item>
									<div className="clearfix mt30 mb30">
										<Button type="primary" htmlType="submit" onClick={()=>this.handleSubmit()} className="defalutSubmitbtn fl mr20">提交</Button>
										<a onClick={this.goback} className="defalutCancelbtn fl">取消</a>
									</div>
								</Form.Item>
							{/*</Form>*/}

						</div>
					</div>
				</div>

			</React.Fragment>

		)
	}
}

const GraduationTasksnewApp = Form.create({name: 'coursesNew'})(GraduationTasksnew);
export default GraduationTasksnewApp;
