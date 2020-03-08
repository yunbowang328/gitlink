import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {List, Typography, Tag, Modal, Radio, Checkbox, Table,message, Pagination,Upload,Button} from 'antd';
import {  NoneData } from 'educoder'

import TPMRightSection from './component/TPMRightSection';
import TPMNav from './component/TPMNav';
import axios from 'axios';
import './tpmmodel/tpmmodel.css'
import {getUploadActionUrltwo,appendFileSizeToUploadFileAll} from 'educoder';
import moment from 'moment';
import Tpmdatasetmodel from "./tpmmodel/Tpmdatasetmodel";

const confirm = Modal.confirm;
function clearSlct() {
	if("getSelection" in window){
		window.getSelection().removeAllRanges();
	}else{
		document.selection.empty();
	};
}
function jsCopy(s) {
	clearSlct();
	const copyEle = document.getElementById(s);
	copyEle.select();
	const copyStatus=document.execCommand("Copy");
	// 对成功与否定进行提示
	copyStatuss(copyStatus)
}

function copyStatuss(copyStatus){
	if (copyStatus) {
		message.success('复制成功');
	} else {
		message.error('复制失败');
	}
}
class TPMDataset extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: undefined,
			columns: [
				{
					title: '文件',
					dataIndex: 'title',
					key: 'title',
					align: 'left',
					className: " font-14 wenjiantit",
					width: '220px',
					render: (text, record) => (
						<div>
							{record.title}
						</div>
					)
				},
				{
					title: '最后修改时间',
					dataIndex: 'timedata',
					key: 'timedata',
					align: 'center',
					className: "edu-txt-center font-14 zuihoushijian",
					width: '150px',
					render: (text, record) => (
						<div>
							{record.timedata}
						</div>
					)
				},
				{
					title: '最后修改人',
					dataIndex: 'author',
					key: 'author',
					align: 'center',
					className: "edu-txt-center font-14 ",
					render: (text, record) => (
						<div>
							{record.author}
						</div>
					)
				},
				{
					title: '文件大小',
					dataIndex: 'filesize',
					key: 'filesize',
					align: 'center',
					className: "edu-txt-center font-14 ",
					render: (text, record) => (
						<div>
							{record.filesize}
						</div>
					)
				},
				{
					title: '操作',
					dataIndex: 'operation',
					key: 'operation',
					align: 'center',
					className: "edu-txt-center font-14 ",
					render: (text, record) => (
						<div style={{
							cursor:"pointer",
						}} onClick={() => {
							jsCopy("file_path"+record.id)
						}}>
							<i className="iconfont icon-fuzhi3 font-18 ml2 questiontype" style={{
								color:"#A0A7B4"
							}} ></i>
							<div
								style={{
									overflow: 'hidden',
									height: "1px",
									width: "1px"
								}}
							>
							<input id={"file_path"+record.id}  value={record.file_path}/>
							</div>
						</div>
					)
				},
			],
			page: 1,
			limit: 10,
			selectedRowKeys: [],
			mylistansum:30,
			collaboratorList:[],
			fileList:[],
			fileListimgs:[],
			file:null,
			datalist:[],
			data_sets_count:0,
			selectedRowKeysdata:[],
			loadingstate:false,
			checked: false,
			showmodel:false,
			itemtypebool:false,
			Buttonloading:false
		}
	}

	componentDidMount() {
		this.setState({
			loadingstate:true,
		})
		this.getdatas()

	}

	mysonChange = (e) => {
		// console.log(`全选checked = ${e.target.checked}`);
		if (e.target.checked === true) {
			let mydata=[];
			let datas=[];
			for(let i=0;i<this.state.collaboratorList.data_sets.length;i++){
				mydata.push(this.state.collaboratorList.data_sets[i].id);
				datas.push(i);

			}
			this.setState({
				selectedRowKeysdata:mydata,
				selectedRowKeys: datas,
				checked:true,
			})
		  // console.log(mydata);
			// console.log(datas);
		} else {
			this.setState({
				selectedRowKeysdata:[],
				selectedRowKeys: [],
				checked:false,


			})
		}
	}


	getdatas = () => {
		let id=this.props.match.params.shixunId;

		let collaborators=`/shixuns/${id}/get_data_sets.json`;
		axios.get(collaborators,{params:{
				page:1,
				limit:10,
			}}).then((response)=> {
			if(response.status===200){
				if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

				}else{
					let datalists=[];
          for(let i=0;i<response.data.data_sets.length;i++){
						const datas=response.data.data_sets;
						var timedata = moment(datas[i].created_on).format('YYYY-MM-DD HH:mm');
						datalists.push({
							timedata:timedata,
							author:datas[i].author,
							filesize:datas[i].filesize,
							id:datas[i].id,
							title:datas[i].title,
							file_path:datas[i].file_path,
						})
					}
					this.setState({
						collaboratorList: response.data,
						data_sets_count:response.data.data_sets_count,
						datalist:datalists,
						selectedRowKeysdata:[],
						selectedRowKeys: [],
						checked:false,
						page:1,
					});


				}

			}
			setTimeout(() => {
				this.setState({
					loadingstate:false,
				})
			}, 500)

		}).catch((error)=>{
			setTimeout(() => {
				this.setState({
					loadingstate:false,
				})
			}, 500)
			console.log(error)
		});

	}

	getdatastwo = (page,limit) => {
		let id=this.props.match.params.shixunId;

		let collaborators=`/shixuns/${id}/get_data_sets.json`;
		axios.get(collaborators,{params:{
				page:page,
				limit:limit,
			}}).then((response)=> {
			if(response.status===200){
				if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

				}else{
          let datalists=[];
					for(let i=0;i<response.data.data_sets.length;i++){
						const datas=response.data.data_sets;
						var timedata = moment(datas[i].created_on).format('YYYY-MM-DD HH:mm');
						datalists.push({
							timedata:timedata,
							author:datas[i].author,
							filesize:datas[i].filesize,
							id:datas[i].id,
							title:datas[i].title,
							file_path:datas[i].file_path,
						})
					}
					this.setState({
						collaboratorList: response.data,
						data_sets_count:response.data.data_sets_count,
						datalist:datalists,
						selectedRowKeysdata:[],
						selectedRowKeys: [],
						checked:false,
						page:page,
					});
				}

			}
			setTimeout(() => {
				this.setState({
					loadingstate:false,
				})
			}, 500)
		}).catch((error)=>{
			setTimeout(() => {
				this.setState({
					loadingstate:false,
				})
			}, 500)
			console.log(error)
		});

	}


	getdatasthree = (page,limit) => {
		let id=this.props.match.params.shixunId;

		let collaborators=`/shixuns/${id}/get_data_sets.json`;
		axios.get(collaborators,{params:{
				page:page,
				limit:limit,
			}}).then((response)=> {
			if(response.status===200){
				if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

				}else{


				}

			}

		}).catch((error)=>{

		});

	}

	paginationonChanges = (pageNumber) => {
		// //console.log('Page: ');
		this.setState({
			page: pageNumber,
			loadingstate:true,
		})

		this.getdatastwo(pageNumber,10);
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		this.setState(
			{
				selectedRowKeys
			}
		);
    let mydata=[];
		for(let i=0;i<selectedRows.length;i++){
			mydata.push(selectedRows[i].id);
		}

		this.setState({
			selectedRowKeysdata:mydata,
		})
		// console.log(mydata);



	}
	rowClassName = (record, index) => {
		let className = 'light-row';
		if (index % 2 === 1) className = 'dark-row';
		return className;
	}
	handleChange = (info) => {
		// console.log("handleChange123123");
		// console.log(info);
     //debugger
		this.setState({
			Buttonloading:true
		})
		if(!info.file.status){
			this.setState({
				Buttonloading:false
			})
		}
		if(info.file.status == "done" || info.file.status == "uploading" || info.file.status === 'removed'){

			let fileList = info.fileList;
			this.setState({
				fileList: appendFileSizeToUploadFileAll(fileList),
			});

			if(info.file.status === 'done'){
				//done 成功就会调用这个方法
				if(info.file.response){
					if(info.file.response.status===-1||info.file.response.status==="-1"){
						this.setState({
							Buttonloading:false
						})
					}else{
						this.getdatas();
						this.setState({
						 Buttonloading:false
						})
						// this.props.showNotification(`上传成功`);
					}
				}
			}else{
				// this.setState({
				// 	Buttonloading:false
				// })
			}

       if(info.file.response){
				 if(info.file.response.status===-1||info.file.response.status==="-1"){
					 // console.log("准备显示弹框了");
					 // console.log(info);false
					 let itemtype=-1;
					 try {
						 itemtype=info.file.response.message.indexOf('文件名已经存在'.toLowerCase());

					 }catch (e) {

					 }
					 this.setState({
						 showmodel:true,
						 tittest:info.file.response.message,
						 itemtypebool:itemtype>-1?true:itemtype<=-1?false:false,
						 Buttonloading:false
					 })

				 }else{
				 	this.setState({
						Buttonloading:false
					})
				 }
			 }

		}
	}


	onAttachmentRemove = (file) => {
		// debugger
		if(!file.percent || file.percent == 100){
			confirm({
				title: '确定要删除这个附件吗?',
				okText: '确定',
				cancelText: '取消',
				// content: 'Some descriptions',
				onOk: () => {
					console.log("665")
					this.deleteAttachment(file)
				},
				onCancel() {
					console.log('Cancel');
				},
			});
			return false;
		}

	}

  deleteRemovedata(){

    if(this.state.selectedRowKeysdata===undefined || this.state.selectedRowKeysdata===null ||this.state.selectedRowKeysdata.length===0){

			this.props.showNotification(`请选择要删除的文件`);

			return
		}
		let id=this.props.match.params.shixunId;

		confirm({
			title: '确定要删除文件吗?',
			okText: '确定',
			cancelText: '取消',
			// content: 'Some descriptions',
			onOk: () => {
				const url = `/shixuns/${id}/destroy_data_sets.json`;
				axios.delete(url,
					{ params: {
							id:this.state.selectedRowKeysdata,
						}}
					)
					.then((response) => {
						if (response.data) {
							const { status } = response.data;
							if (status == 0) {
								this.props.showNotification(`删除成功`);

								this.getdatas()
							}
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			},
			onCancel() {
				console.log('Cancel');
			},
		});

	}
	deleteAttachment = (file) => {
		// console.log(file);
		let id=file.response ==undefined ? file.id : file.response.id
		const url = `/attachements/destroy_files.json`
		axios.delete(url, {
			id:[id],
			})
			.then((response) => {
				if (response.data) {
					const { status } = response.data;
					if (status == 0) {
						// console.log('--- success')

						this.setState((state) => {

							const index = state.fileList.indexOf(file);
							const newFileList = state.fileList.slice();
							newFileList.splice(index, 1);
							return {
								fileList: newFileList,
								deleteisnot:true
							};
						});
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	ModalCancel = () => {
		this.setState({
			showmodel: false,
		})
	}

	ModalSave=()=>{
		this.setState({
			showmodel: false,
		})
	}
	ButtonloadinghandleChange=()=>{
		// this.props.showNotification(`zhzzzzz`);
		// this.setState({
		// 	Buttonloading:false
		// })
	}
	render() {
		const {tpmLoading, shixun, user, match} = this.props;
		const {columns, page, limit, selectedRowKeys,mylistansum,fileList,datalist,data_sets_count,loadingstate} = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		// getCheckboxProps: record => ({
		// 	disabled: record.name === 'Disabled User', // Column configuration not to be checked
		// 	name: record.name,
		// }),
		let id=this.props.match.params.shixunId;
		const uploadProps = {
			width: 600,
			fileList,
			multiple: true,
			//multiple 是否支持多选 查重的时候不能多选 不然弹许多框出来
			// https://github.com/ant-design/ant-design/issues/15505
			// showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
			// showUploadList: false,
			action: `${getUploadActionUrltwo(id)}`,
			showUploadList:false,
			onChange: this.handleChange,
			onRemove: this.onAttachmentRemove,
			beforeUpload: (file) => {
				//上传前的操作
			  console.log('beforeUpload', file);
				// this.props.showNotification(`文件上传中`);
				const isLt400M = file.size / 1024 / 1024 <= 400;

				if (!isLt400M) {
					this.props.showNotification('文件大小必须小于等于400MB!');
				}
				return isLt400M;
			},
		};
		// console.log("showmodelshowmodel");
		// console.log(this.state.showmodel);
		return (
			<React.Fragment>
				<div className="tpmComment educontent clearfix mt30 mb80">

					<div className="with65 fl edu-back-white commentsDelegateParent">
						{
							this.state.showmodel===true?
								<Tpmdatasetmodel itemtypebool={this.state.itemtypebool} modalCancel={()=>this.ModalSave()} tittest={this.state.tittest}  modalsType={this.state.showmodel}></Tpmdatasetmodel>
								:""
						}
						<TPMNav
							match={match}
							user={user}
							shixun={shixun}
							{...this.props}
							is_jupyter={this.props.is_jupyter}
						></TPMNav>

						<div className="padding20 edu-back-white mt20 " style={{minHeight: '463px'}}>
							<div className="sortinxdirection">

										<div className="tpmwidth">
											<Checkbox checked={this.state.checked} onChange={this.mysonChange}>全选</Checkbox>
										</div>

								<div className="tpmwidth xaxisreverseorder">
									<style>
										{
											`
											.ant-upload-list{
											 display:none
											}
											.deletebuttom{
												color: #fff !important;
											}
									    .deletebuttom:hover{
												color: #fff !important;
												background: #29BD8B !important;
											}
											`
										}
									</style>
									<div className="intermediatecenter deletebuttom">
										 <Upload {...uploadProps}>
												<Button  className={"deletebuttom"} loading={this.state.Buttonloading}>{this.state.Buttonloading===true?"上传中":"上传文件"}</Button>
										 </Upload></div>
									{
										data_sets_count>0?
											<div
												className={selectedRowKeys.length > 0 ? "deletebutomtextcode  intermediatecenter mr21" : "deletebutom intermediatecenter mr21"} onClick={()=>this.deleteRemovedata()}>
												<p className="deletebutomtext" >删除</p></div>
											:""
									}
								</div>
							</div>
							<div className="mt24">
								<style>{`
              	          .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
																			top: 72%;}
						                }
						                .edu-table .ant-table-tbody > tr > td {
														height: 42px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 42px;
														 }
						                			.ysltableowss .ant-table-thead > tr > th{
																 	height: 42px;
														 }
														 	.ysltableowss .ant-table-tbody > tr > td{
																 	height: 42px;
														 }
														 .ysltableowss .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 9px;
															}
															.mysjysltable4 .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
													 padding: 0px;
															}
															.ant-table-thead .ant-table-selection-column  span{
															visibility:hidden;
															}
															.ant-table-thead > tr > th {
															    background:#FFFFFF !important;
															}
															.ant-table table {
																width: 100%;
																text-align: left;
																border-radius: 4px 4px 0 0;
																border-collapse: separate;
																border-spacing: 0;
																  border-left: 1px solid #eeeeee;
																   border-top: 1px solid #eeeeee;
																    border-right: 1px solid #eeeeee;
														}
																`}</style>
								{data_sets_count===0?
									<div className="edu-table edu-back-white  ysltableowss">
										<style>
											{
												`
											.ant-table-tbody{
											display:none;
											}
											.ant-table-placeholder{
												display:none;
											}
						         	.ant-table table {
											 border-bottom: 1px solid #eeeeee  !important;
											}
											
											`
											}
										</style>
										<Table
									columns={columns}
									pagination={false}
									className="mysjysltable4"
									rowSelection={rowSelection}
									rowClassName={this.rowClassName}
									/>
									</div>
									:
									<div className="edu-table edu-back-white  ysltableowss">
										<Table
											dataSource={datalist}
											columns={columns}
											pagination={false}
											className="mysjysltable4"
											rowSelection={rowSelection}
											rowClassName={this.rowClassName}
											loading={loadingstate}

										/>
									</div>
								}

								{
									data_sets_count>=11?
									<div className="edu-txt-center mt40 mb20">
									<Pagination showQuickJumper current={page}
									onChange={this.paginationonChanges} pageSize={limit}
									total={data_sets_count}
									></Pagination>
									</div>
										:""
								}

								{	data_sets_count===0?
									<NoneData style={{width: '100%'}}></NoneData>:""
								}

							</div>


						</div>
					</div>
					<div className="with35 fr pl20">
						<TPMRightSection
							{...this.props}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default TPMDataset;
