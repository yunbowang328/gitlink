import React, { Component } from 'react';
import {Button, Card,  Row, Col ,Upload,Icon,message,Tabs} from 'antd';
import axios from 'axios';
import {getUploadActionUrl,getUrl,appendFileSizeToUploadFileAll,appendFileSizeToUploadFile} from 'educoder';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
const { TabPane } = Tabs;
class CompetitionContentsMd extends Component{
	constructor(props) {
		super(props)
		this.contentMdRef = React.createRef();
		this.state={
			contentFileList:[],
			chartmodule_id:undefined
		}
	}
	componentDidUpdate =(prevState)=>{
		if(prevState!=this.props){
			this.getchartdata();
		}
	}
	componentDidMount(){
		window.document.title = '竞赛';

   this.getchartdata()
	}

	getchartdata=()=>{
		let {mdContentdata,chart_rules}=this.props;

		// is_pdf: false
		if(this.props.module_type==="chart"){
			let type=true;
			if(chart_rules===undefined){

			}else{
				chart_rules.rule_contents.map((items,keys)=>{
					debugger
					if(parseInt(this.props.tabkey)===items.competition_stage_id){
						console.log(items)
						this.contentMdRef.current.setValue(items.content);
						this.setState({
							contentFileList:undefined,
							chartmodule_id:items.id
						})
						type=false;
					}
				})

				if(type===true){
					this.contentMdRef.current.setValue("");
					this.setState({
						contentFileList:undefined,
						chartmodule_id:undefined
					})

				}
			}


		}else{
			let contentFileList = mdContentdata===undefined?[]:mdContentdata.attachments===undefined?[]:mdContentdata.attachments.map((item) => {
				return {
					id: item.id,
					uid: item.id,
					name: appendFileSizeToUploadFile(item),
					url: item.url,
					filesize: item.filesize,
					status: 'done',
					response:{id: item.id}
				}
			})
			this.setState({
				contentFileList:contentFileList
			})
			this.contentMdRef.current.setValue(mdContentdata===undefined?"":mdContentdata.md_content===undefined?"":mdContentdata.md_content || '')

		}
	}

	handleContentUploadChange = (info) => {
		if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
			let contentFileList = info.fileList;
			this.setState({ contentFileList: appendFileSizeToUploadFileAll(contentFileList) });
		}

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
						this.props.showNotification(response.data.message);
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
	handleSubmit = () => {
		let {contentFileList}=this.state;
		const mdContnet = this.contentMdRef.current.getValue().trim();
		// if(mdContnet.length>10000){
		// 	this.props.showNotification("内容超过10000个字");
		// 	return
		// }
		let attachment_ids=undefined
		if(contentFileList!=undefined){
			attachment_ids= contentFileList.map(item => {
				return item.response ? item.response.id : item.id
			})
		}

		let newstage_id=parseInt(this.props.tabkey)===0||null?undefined:parseInt(this.props.tabkey)
		let data={}
		if(this.props.module_type==="chart"){
			data={
				md_content_id:this.state.chartmodule_id,
				competition_module_id:this.props.module_id,
				stage_id:newstage_id,
				content:mdContnet,
			}
		}else{
			data={
				md_content_id:this.props.mdContentdata.md_id,
				competition_module_id:this.props.mdContentdata.id,
				content:mdContnet,
				attachment_ids:attachment_ids
			}
		}

		let url=`/competitions/${this.props.match.params.identifier}/update_md_content.json`;
		axios.post(url,data
		).then((response) => {
			if(response.data.status===0){
				this.props.showNotification(response.data.message);
				this.props.getlistdata(this.props.thiskeys,this.props.tabkey);
				this.props.hideCompetitionedit();
			}else{
				this.props.showNotification(response.data.message);
			}
		}).catch((error) => {
			console.log(error)
		})

	}
	render() {
		let {contentFileList}=this.state;
		let {chart_rules}=this.props;
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
					this.props.showNotification("文件大小必须小于150MB");
				}
				return isLt150M;
			},
		};
    // console.log(this.props.tabkey)
		// console.log(chart_rules)
		 console.log(this.props.mdContentdata)
		return (
			<div>
				{chart_rules===undefined?"":this.props.module_type==="chart"?<Tabs  activeKey={this.props.tabkey} onChange={(e)=>this.props.Competitioncallback(e)}>

					{chart_rules.stages.map((item,key)=>{
						return(
							<TabPane tab={item.name} key={item.id===null?0:item.id}></TabPane>
						)
					})}

				</Tabs>:""}
				<TPMMDEditor ref={this.contentMdRef} placeholder="请输入内容说明" mdID={'courseContentMD'} refreshTimeout={1500}
										 className="courseMessageMD" initValue={this.state.description}></TPMMDEditor>
				{this.props.module_type==="chart"?"":<Upload {...uploadProps} className="upload_1 newWorkUpload">
					<Button className="uploadBtn">
						<Icon type="upload" /> 上传附件
					</Button>
					(单个文件150M以内)
				</Upload>}

				<div className="clearfix mt30 mb30">
					{/*  htmlType="submit"   */}
					<Button type="primary"  onClick={this.handleSubmit}  className="defalutSubmitbtn fl mr20">提交</Button>
					<a className="defalutCancelbtn fl" onClick={() => this.props.hideCompetitionedit()}>取消</ a>
				</div>
			</div>

		)
	}
}
export default CompetitionContentsMd;