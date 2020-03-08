import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,DatePicker,Select,Tooltip,Radio} from "antd";
import axios from 'axios';
import Modals from '../../modals/Modals';
import {getUploadActionUrl,handleDateString,appendFileSizeToUploadFileAll} from 'educoder';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}
function disabledDateTime() {
	return {
		// disabledHours: () => range(0, 24).splice(4, 20),
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
		// disabledSeconds: () => [0, 60],
	};
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}


const dateFormat="YYYY-MM-DD HH:mm";
class Sendresource extends Component{
	constructor(props){
		super(props);
		this.state={
			group_ids:[],
			fileList:[],
			Modalstype:false,
			Modalstopval:"",
			ModalCancel:"",
			ModalSave:"",
			fileListtype:false,
			loadtype:false,
			is_public:false,
			datatime:undefined,
			// moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			course_group_publish_times:[
				{
					course_group_id : undefined,
					publish_time :""
				}],
			course_groups:undefined,
			course_groups_count:undefined,
			Radiovalue:0,
			Radiovaluetype:false
		}
	}


	componentDidMount() {

	}

	//勾选实训
	shixunhomeworkedit=(list)=>{

		this.setState({
			group_ids:list
		})

	}
	// 附件相关 START
	handleChange = (info) => {
		if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
			let fileList = info.fileList;
			if (info.file.status != "removed") {
				this.setState({
					fileList: appendFileSizeToUploadFileAll(fileList),
					fileListtype: true
				});
			} else {
				this.setState({
					fileList: appendFileSizeToUploadFileAll(fileList),
				});
			}
		}
	}

	onAttachmentRemove = (file) => {
		if(!file.percent || file.percent == 100){
			const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
			axios.delete(url, {
			})
				.then((response) => {
					if (response.data) {
						const { status } = response.data;
						if (status == 0) {
							this.setState({
								fileListtype:false,
								fileList:[]
							})
						}

					}
				})
				.catch(function (error) {
					console.log(error);
				});
			this.setState({
				fileListtype:false,
			})
		}else{
			this.setState({
				fileListtype:false,
				fileList:[]
			})
		}
	}

	ModalCancelModalCancel=()=>{
		this.setState({
			Modalstype:false,
			Modalstopval:"",
			ModalSave:this.ModalCancelModalCancel,
			loadtype:false
		})
		this.props.Cancel()
	}
	Saves=()=>{
		let {fileList,description,is_public,datatime,Radiovalue} =this.state;

		let newfileList=[];

		if(fileList!=undefined&&fileList.length>0){
			fileList.map((list,key)=>{
				newfileList.push(list.response.id)
			})
		}


		if(newfileList.length===0){
			this.setState({
				newfileListtype:true
			})
			return
		}

		if(this.state.Radiovalue===1){
			if(datatime===undefined||datatime===null||datatime=== ""){
				this.setState({
					Radiovaluetype:true
				})
				return
			}else{
				this.setState({
					Radiovaluetype:false
				})
			}
		}



		if(description===undefined){

		}else if(description.length>100){

			this.setState({
				descriptiontype:true
			})
			return
		}

		let coursesId=this.props.match.params.coursesId;
		let attachmentId=this.props.attachmentId;
		let url="/files/upload.json";


		axios.post(url,{
			course_id:coursesId,
			course_second_category_id:this.props.coursesidtype===undefined||this.props.coursesidtype==="node"?0:attachmentId,
			attachment_ids:newfileList,
			is_public:is_public,
			publish_time:Radiovalue===1?datatime===undefined? undefined:datatime:undefined,
			description:description,
			delay_publish:Radiovalue,
		}).then((result)=>{

			if(result.data.status===0){
				this.ModalCancelModalCancel();
				this.props.updataleftNavfun();
				this.props.showNotification("上传资源成功");
				this.props.setupdate(this.props.attachmentId)
			}
		})



	}

	settextarea=(e)=>{
		this.setState({
			description:e.target.value
		})
	}

	onChangepublic=(e)=>{

		this.setState({
			is_public:e.target.checked
		})

	}

	onChangeTimepublish= (date, dateString,key,type) => {
		if(type===1){
			this.setState({
				datatime:handleDateString(dateString),
			})
		}else if(type===2){
			let {course_group_publish_times}=this.state;
			let newgroup_publish=course_group_publish_times;
			for(var i=0; i<newgroup_publish.length; i++){
				if(i===parseInt(key)){
					newgroup_publish[i].publish_time=handleDateString(dateString);
				}
			}
			this.setState({
				course_group_publish_times:newgroup_publish,
			})
		}

	}

	RadioonChange=(e)=>{
		if(e.target.value===0){
			this.setState({
				datatime:undefined
			})
		}
		this.setState({
			Radiovalue: e.target.value,
		});
	}
	render(){
		let { newfileListtype,descriptiontype,
			is_public,
			datatime,
		}=this.state;

		const uploadProps = {
			width: 600,
			// showUploadList:false,
			action: `${getUploadActionUrl()}`,
			onChange: this.handleChange,
			onRemove: this.onAttachmentRemove,
			beforeUpload: (file) => {
				// console.log('beforeUpload', file.name);
				const isLt150M = file.size / 1024 / 1024 < 150;
				if (!isLt150M) {
					this.props.showNotification('文件大小必须小于150MB!');
				}
				return isLt150M;
			},
		};
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};


		console.log(this.props.course_groups)
		return(
			<div>
				{/*提示*/}
				<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					loadtype= {this.state.loadtype}

				/>

				<Modal
					keyboard={false}
					className={"HomeworkModal"}
					title={this.props.modalname}
					visible={this.props.visible}
					closable={false}
					footer={null}
					destroyOnClose={true}
				>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16">

							<span className={"color-blue underline"}> </span>
						</p>

						<style>{`
                .uploadBtn.ant-btn {
                  border: none;
                  color: #4CACFF;
                  box-shadow: none;
                  background: transparent;
                  border:1px solid #4CACFF;
                  padding-left: 6px;
                  margin-right: 5px;
                }
                .ant-upload-list-item:hover .ant-upload-list-item-info{
                  padding: 0 12px 0 0px;
                  background-color:#fff;
                }
                .upload_1 .ant-upload-list {
                  width: 350px;
                }
                .ant-upload-select{
                  float: left;
                }

          			.winth540{
          			    width: 540px;
										height: 34px;
								}

              `}</style>


						{		this.state.fileListtype===true?"":<style>{`
						      .ant-upload-list :nth-child(1).ant-upload-list-item {
                 margin-top:31px;
                }
						`}</style>}
						<p className={"winth540"}>


							{
								this.state.fileListtype===true?
									<div>
										<Tooltip placement="bottom" title={
											<pre>
												 	 	每次只能上传一个资源，<br/>删除下面资源可重新上传
											 </pre>
										}>
											<Button className="uploadBtns color-grey-c">
												选择文件
											</Button>
										</Tooltip>

										<span className={"ml10"}>(单个文件最大150M)</span>
									</div>
									:""
							}
							<Upload {...uploadProps} fileList={this.state.fileList} className="upload_1">
								{this.state.fileListtype===false?
									<span>
								   	<Button className="uploadBtn">
											<Icon type="upload" /> 选择文件
										</Button>
											<span className={"ml10 color-ooo"}>(单个文件最大150M)</span>
									</span>:""}
							</Upload>
						</p>



						{newfileListtype===true&&this.state.fileListtype===false?<p className={"color-red"}>请先上传资源</p>:""}

						<p className={this.state.fileListtype===true?"mt25":""}>
							<style>{`
                .ant-checkbox-wrapper{
                  margin-left:0px !important;
                  margin-top:10px;
                }
              `}</style>

							{this.props.course_is_public===true?<div>
								<span className={"color-ooo"}>公开：</span><Checkbox  checked={is_public} onChange={this.onChangepublic}>
								<span className={"font-14 color-ooo"}>选中，所有用户可见，否则课堂成员可见</span>
							</Checkbox>
							</div>:""}

							<style>{`
                .Selectleft20{
                   margin-left: 20px !important;
                   width: 176px;
                   height: 40px;
                }
               #startimes .ant-calendar-picker-icon{
                  margin-top:-11px;
                }
                .resourcebox{
                   max-height:150px;
                    overflow: auto;
                }
              `}</style>
						</p>


						<div className={this.props.course_is_public===true?"mt10":""}>
							<span className={"color-ooo fl mt6"}>发布设置：</span>
							<Radio.Group onChange={this.RadioonChange} value={this.state.Radiovalue} style={{'width': '460px'}}>
								<Radio style={radioStyle} value={0}>
									立即发布
								</Radio>
								<Tooltip placement="bottom" title={this.props.isStudent()===true?"不支持学生延迟发布":""}>
									<Radio style={radioStyle} value={1} className={"fl"} disabled={this.props.isStudent()}>
										<span className={"mr5"}>延期发布</span>
										<DatePicker

											dropdownClassName="hideDisable"
											showTime={{ format: 'HH:mm' }}
											locale={locale}
											format={dateFormat}
											placeholder="请选择发布时间"
											id={"startime"}
											showToday={false}
											width={"210px"}
											value={this.state.Radiovalue===1?datatime===undefined||datatime===""?undefined:moment(datatime, dateFormat):undefined}
											onChange={(e,index)=>this.onChangeTimepublish(e,index,undefined,1)}
											disabledTime={disabledDateTime}
											disabledDate={disabledDate}
											disabled={this.state.Radiovalue===1?false:true}
										/>
									</Radio>
								</Tooltip>
								<span className={"fl mt5 color-grey-c"}>(按照设置的时间定时发布)</span>
							</Radio.Group>
						</div>


						{/*{course_group_publish_timestype===true?<p className={"color-red mt10"}>请填写完整</p>:""}*/}
						<textarea  placeholder="请在此输入资源描述，最大限制100个字符" className={"mt10"} value={this.state.description} onInput={this.settextarea} style={{
							width: '100%',
							height:'120px',
							border:'1px solid rgba(234,234,234,1)',
							padding: '10px'
						}}></textarea>
						{descriptiontype===true?<p className={"color-red"}>请输入资源描述，最大限制100个字符</p>:""}
						{this.state.Radiovaluetype===true?<p className={"color-red"}>发布时间不能为空</p>:""}
						<div className="clearfix mt30 edu-txt-center mb10">
							<a  className="task-btn color-white mr70" onClick={this.props.Cancel}>{this.props.Cancelname}</a>
							<a className="task-btn task-btn-orange" onClick={()=>this.Saves()}>{this.props.Savesname}</a>
						</div>

					</div>
				</Modal>
			</div>
		)
	}
}
export default Sendresource;
