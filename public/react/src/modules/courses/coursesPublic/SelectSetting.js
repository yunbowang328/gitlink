import React,{ Component } from "react";
import { Modal,Checkbox,Select,Input,Upload,Button,Icon,message,DatePicker,Tooltip,Radio} from "antd";
import axios from'axios';
import {getUrl,handleDateString,appendFileSizeToUploadFileAll,getUploadActionUrl} from 'educoder';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import Modals from '../../modals/Modals';

const Option = Select.Option;

const dateFormat ="YYYY-MM-DD HH:mm"
function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function disabledDateTime() {
	return {
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
		// disabledSeconds: () => range(1,60)
	}
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}
class Selectsetting extends Component{
	constructor(props){
		super(props);
		this.state={
			description:undefined,
			datalist:undefined,
			course_groups:undefined,
			attachment_histories:undefined,
			datatime:undefined,
			fileList:[],
			fileListtype:false,
			is_public:false,
			Radiovaluetype:false
		}
	}


	componentDidMount() {
	  this.getalldata();
	}



	getalldata=()=>{
		let {discussMessageid} =this.props;
		let course_id=this.props.course_id;
		let url="/files/"+discussMessageid+".json";
		axios.get(url, {
				params:{
					course_id:course_id,
				}
			})
			.then((response) => {
				if(response.status===200){
					this.setState({
						datalist:response.data,
						description: response.data.description,
						is_public:response.data.is_public,
						datatime:response.data.publish_time,
						Radiovalue:response.data.delay_publish==false?0:1,
						//attachment_histories:response.data.attachment_histories
					})

				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}
	componentDidUpdate = (prevProps) => {

		if ( prevProps.visible != this.props.visible ) {
			this.setState({
				visible:this.props.visible
			})
			this.getalldata()
		}

	}

	settextarea=(e)=>{
		this.setState({
			description:e.target.value
		})
	}


	hidecouseShixunModal=()=>{
		this.setState({
			Modalstype:false,
			Modalstopval:"",
			ModalSave:this.hidecouseShixunModal,
			loadtype:false
		})
	}

	savecouseShixunModal=()=>{
		let {fileList,is_public,description,datatime,Radiovalue}=this.state;
		let newfileList=[];
		if(fileList!=undefined&&fileList.length>0){
			fileList.map((list,key)=>{
				newfileList.push(list.response.id)
			})
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

		if(description===undefined||description===null){

		}else if(description.length>100){
			this.setState({
				descriptiontypes:true
			})
			return
		}

		let coursesId=this.props.match.params.coursesId;
		let attachmentId=this.props.attachmentId;
		let url="/files/"+this.props.discussMessageid+".json";
		//
		axios.put(url,{
			course_id:coursesId,
			new_attachment_id:newfileList.length===0?undefined:newfileList,
		  course_second_category_id:this.props.coursesidtype===undefined||this.props.coursesidtype==="node"?0:attachmentId,
			is_public:is_public,
			publish_time:Radiovalue===0?undefined:datatime===undefined?moment(new Date(),dateFormat):datatime,
			description:description,
			delay_publish:Radiovalue
		}).then((result)=>{
			if(result.data.status===0){
				this.hidecouseShixunModal()
				this.props.setupdate(attachmentId)
				this.props.showNotification("设置资源成功");
				this.props.Cancel()
			}
		})

	}
	onChangeTimepublish= (date, dateString) => {

		this.setState({
			datatime:handleDateString(dateString),
		})

	}

	// 附件相关 START
	handleChange = (info) => {
		if(info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
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

	onChangepublic=(e)=>{
		this.setState({
			is_public:e.target.checked
		})
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

	delectfils=(id)=>{
		this.setState({
			Modalstype:true,
			Modalstopval:"是否确定删除该历史资源？",
			ModalSave:()=>this.delectcousedelectfils(id),
			ModalCancel:this.hidecouseShixunModal,
			loadtype:false
		})
	}

	delectcousedelectfils=(id)=>{
		const url = `/attachments/${id}.json?type=history`;

		axios.delete(url)
			.then((response) => {
				if (response.data.status == 0) {
					// {"status":1,"message":"删除成功"}
					this.hidecouseShixunModal()
					this.getalldata()
					this.props.showNotification(response.data.message);
				}else{
					this.props.showNotification(response.data.message);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	render(){
		let {datatime,description,datalist}=this.state;

		const uploadProps = {
			width: 600,
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
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};


		return(
			<div>
				<style>
					{`
					  #startimes .ant-calendar-picker-icon{
					 margin-top:-11px;
					  }
				
				  `}
				</style>
				{/*提示*/}
				<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					loadtype= {this.state.loadtype}
				/>
				<Modal
					className={"settingmodal"}
					title="资源设置"
					visible={this.props.Settingtype}
					closable={false}
					footer={null}
					width="600px"
					keyboard={false}
					destroyOnClose={true}
				>
					<style>
						{
							`
								.ant-modal-body{
	                  padding: 30px 0px;
								}
							`
						}
					</style>

					<style>{`
                .newupload_conboxtop{
                   margin-top: -30px;
                }
                #shixun_tab_div{
                   padding: 0 30px;
                   padding-top:30px;
                }
              `}</style>

					<div className="newupload_conbox newupload_conboxtop">

						<style>{`
                .greybackHead{
                  padding:0px 30px;
                }
                .fontlefts{text-align: left; text-align: center;}
              `}</style>
						<ul className="clearfix greybackHead edu-txt-center">
							<li className="fl paddingleft22 fontlefts" style={{width:'330px'}}>资源名称</li>
							<li className="fl edu-txt-left" style={{width:'80px'}}>下载</li>
							{/*<li className="fl" style={{width:'100px'}}>引用</li>*/}
							<li className="fl" style={{width:'130px'}}>版本号</li>
						</ul>


						<style>{`
                   .color-grey-9a{color: #9A9A9A !important;}
                   .datastyle{
                      width: 120px;
									    overflow: hidden;
									    height: 37px;
                   }
                  .isabox{
							        max-width:280px;
									    overflow: hidden;
									    text-overflow: ellipsis;
									    white-space: nowrap;
									    display: inline-block;
									    float: left;
							     }
							     .settingbox{
							         max-height: 123px;
												overflow-y: auto;
							     }
                `}</style>
						<div className="pl20 pr20 settingbox">
							<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE">
								<li className="fl" style={{width: '343px'}}>
									<span className={"isabox"} title={datalist&&datalist.title}> {datalist&&datalist.title} </span>
									{datalist&&datalist.attachment_histories.length===0?"":<span className={"newcolor-orange fl"}>当前版本</span>}
								</li>
								<li className="fl edu-txt-left task-hide paddingl5 "
										style={{width: '76px'}}> {datalist&&datalist.downloads_count} </li>
								<li className="fl paddingl10 " style={{width: '100px'}}> {datalist&&datalist.quotes} </li>
								<li className="fl paddingl10 datastyle">
									{moment(datalist&&datalist.created_on).format('YYYY-MM-DD HH:mm')==="Invalid date"?"":moment(datalist&&datalist.created_on).format('YYYY-MM-DD HH:mm')}
								</li>
							</div>

							{datalist&&datalist.attachment_histories.map((item,key)=>{
								return(
									<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" key={key}>
										<li className="fl" style={{width: '343px'}}>
											<span className={"isabox"} title={item.title}> {item.title} </span>
											{/*<span className={"newcolor-orange fl"}>当前版本</span>*/}
										</li>
										<li className="fl edu-txt-left task-hide paddingl5 "
												style={{width: '76px'}}> {item.downloads_count} </li>
										{/*<li className="fl paddingl10 " style={{width: '100px'}}> {item.quotes} </li>*/}
										<li className="fl paddingl10 datastyle">
											{moment(item.created_on).format('YYYY-MM-DD HH:mm')==="Invalid date"?"":moment(item.created_on).format('YYYY-MM-DD HH:mm')}
										</li>
										<a className="fr" onClick={()=>this.delectfils(item.id)}><i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i></a>
									</div>
								)
							})}
						</div>
						<style>{`
                   .popups{
												padding-left: 20px;
												padding-right: 20px;
										    padding-top: 20px;
                   }
                `}</style>
						<div className="popups">
							<p className="task-popup-text-center font-16">

								<span className={"color-blue underline"}> </span>
							</p>

							<style>{`
		                .uploadBtn.ant-btn {
		                  border: 1px solid #4CACFF;
                      margin-right: 15px;
		                  color: #4CACFF;
		                  box-shadow: none;
		                  background: transparent;
		                  padding: 0 6px;
		                  height: 25px;
                      line-height: 25px;
		                }
		                .ant-upload-list-item:hover .ant-upload-list-item-info{
		                  background-color:#fff;
		                }
		                .upload_1 .ant-upload-list {
		                  width: 350px;
		                }
		                .ant-upload-select{
		                  float: left;
		                }

		                .uploadBtns.ant-btn{
											border: 1px solid #ccc;
											margin-right: 15px;
											color: #ccc;
											box-shadow: none;
											background: transparent;
											padding: 0 6px;
											height: 25px;
											line-height: 25px;
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
												<Button className="uploadBtns">
													更新版本
												</Button>
											</Tooltip>

											<span>(单个文件最大150M)</span>
										</div>
										:""
								}

								<Upload {...uploadProps} fileList={this.state.fileList} className="upload_1">
									{this.state.fileListtype===false?
										<span>
												 <Button className="uploadBtn">
													<Icon type="upload" /> 更新版本
												</Button>
												<span>(单个文件最大150M)</span>
											 </span>:""}
								</Upload>

							</p>
							{this.state.newfileListtypes===true?<p className={"color-red"}>请先上传资源</p>:""}

							<p className={this.state.fileListtype===true?"mt15 selecboxfilas":"selecboxfilas"}>
								<style>{`
                .selecboxfilas .ant-checkbox-wrapper{
                  margin-left:0px !important;
                  margin-top:10px;
                }
              `}</style>
								<style>
									{`
								    .Selectleft20{
									   margin-left: 20px !important;
									   width: 176px;
									   height: 40px;
									}
						 			 .resourcebox{
	                   max-height:150px;
	                   overflow: auto;
                    }
								  `}
								</style>
								{this.props.course_is_public===true?<div>
									<span className={"color-ooo"}>公开：</span><Checkbox  checked={this.state.is_public} onChange={(e)=>this.onChangepublic(e)}>
									<span className={"font-14 color-ooo"}>选中，所有用户可见，否则课堂成员可见</span>
								</Checkbox>
								</div>:""}
							</p>
							<style>
								{`
							  #startime .ant-calendar-picker-icon{
							 margin-top:-6px;
							  }
						  `}
							</style>

							<div className={this.props.course_is_public===true?"mt10":""}>
								<span className={"color-ooo fl mt6"}>发布设置：</span>
								<Radio.Group onChange={(e)=>this.RadioonChange(e)} value={this.state.Radiovalue} style={{'width': '460px'}}>
									<Radio style={radioStyle} value={0}>
										立即发布
									</Radio>
									<Tooltip placement="bottom" title={this.props.isStudent()===true?"不支持学生延迟发布":""}>
										<Radio style={radioStyle} value={1} className={"fl"} disabled={this.props.isStudent()}>
											<span className={"mr5"}>延期发布</span>
											<DatePicker

												showToday={false}
												dropdownClassName="hideDisable"
												showTime={{ format: 'HH:mm' }}
												format="YYYY-MM-DD HH:mm"
												locale={locale}
												placeholder="请选择发布时间"
												id={"startime"}
												width={"210px"}
												value={datatime===undefined||datatime===""?"":moment(datatime, dateFormat)}
												onChange={this.onChangeTimepublish}
												disabledTime={disabledDateTime}
												disabledDate={disabledDate}
												disabled={this.state.Radiovalue===1?false:true}
											/>
										</Radio>
									</Tooltip>

									<span className={"fl mt5 color-grey-c"}>(按照设置的时间定时发布)</span>
								</Radio.Group>
							</div>


							<textarea  placeholder="请输入资源描述，最大限制100个字符" className={"mt10"} value={description} onInput={this.settextarea} style={{
								width: '100%',
								height:'120px',
								border:'1px solid rgba(234,234,234,1)',
								padding: '10px'
							}}></textarea>
							{this.state.descriptiontypes===true?<p className={"color-red"}>描述不能超过最大限制：100个字符</p>:""}
							{this.state.Radiovaluetype===true?<p className={"color-red"}>发布时间不能为空</p>:""}
						</div>

						<div className="mt20 marginauto clearfix edu-txt-center">
							<a className="pop_close task-btn mr30 margin-tp26" onClick={()=>this.props.Cancel()}>取消</a>
							<a className="task-btn task-btn-orange margin-tp26" id="submit_send_shixun" onClick={this.savecouseShixunModal}>确定</a>
						</div>
					</div>

				</Modal>
			</div>
		)
	}
}
export default Selectsetting;