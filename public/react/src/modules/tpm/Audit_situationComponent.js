import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { List,Typography,Tag,Modal,Radio} from 'antd';

import TPMRightSection from './component/TPMRightSection';
import TPMNav from './component/TPMNav';
import axios from 'axios';

class Audit_situationComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			datas:undefined,
			value:undefined,
		}
	}

	componentDidMount() {
		this.getdatas()

	}


	getdatas=()=>{

		let url=`/shixuns/${this.props.match.params.shixunId}/review_newest_record.json`;
		axios.get(url).then((response) => {

			if(response.data===undefined||JSON.stringify(response.data) == "{}"||response.data===null){
				this.setState({
					datas:[
						{
							name: '内容审核情况',
							id:"Content",
						},
						{
							name: '性能审核情况',
							id:"Performance",
						},
					]
				})
			}else{
				let newlist=[]
				if(response.data.content_info!=undefined&&response.data.perference_info===undefined){
					let arr=[
						{
							name: '内容审核情况',
							id:"Content",
							status:response.data.content_info.status,
							username:response.data.content_info.username,
							time:response.data.content_info.time,
						},
						{
							name: '性能审核情况',
							id:"Performance",
						},
					]
					newlist=arr
				}

				if(response.data.content_info===undefined&&response.data.perference_info!=undefined){
					let arr=[
						{
							name: '内容审核情况',
							id:"Content",
						},
						{
							name: '性能审核情况',
							id:"Performance",
							status:response.data.perference_info.status,
							username:response.data.perference_info.username,
							time:response.data.perference_info.time,
						},
					]
					newlist=arr
				}

				if(response.data.content_info!=undefined&&response.data.perference_info!=undefined){
						let arr=[
							{
								name: '内容审核情况',
								id:"Content",
								status:response.data.content_info.status,
								username:response.data.content_info.username,
								time:response.data.content_info.time,
							},
							{
								name: '性能审核情况',
								id:"Performance",
								status:response.data.perference_info.status,
								username:response.data.perference_info.username,
								time:response.data.perference_info.time,
							},
						]
					  newlist=arr
				}

				this.setState({
					datas:newlist
				})

			}
		}).catch((error) => {
			console.log(error)
		});
	}

	showModal = (id,status) => {
		debugger
		this.setState({
			visible: true,
			editid:id,
			value:status
		});
	};

	handleOk=(id,editid)=>{
		let url = `/shixuns/${this.props.match.params.shixunId}/review_shixun.json`;
		axios.post(url, {
			status: id===undefined?1:id,
			review_type: editid,
		}).then((response) => {
			if(response.data.status===0){
				this.props.showNotification(response.data.message);
				this.setState({
					visible: false,
				});
				this.getdatas()
			}
		}).catch((error) => {
			console.log(error)
		});
	};

	handleCancel = e => {
		this.setState({
			visible: false,
		});
	};

	onChange = e => {
		this.setState({
			value: e.target.value,
		});
	};
	render() {
		const { tpmLoading,  shixun,  user, match } = this.props;
    let {value,editid,datas}=this.state;

    console.log(this.props)
		return (
			<React.Fragment>

				{this.state.visible===true?<Modal
					title="审核情况更改"
					visible={this.state.visible}
					keyboard={false}
					closable={false}
					footer={null}
					destroyOnClose={true}
					centered={true}
				>
					<div>
					 <style>
							{
								`
						 body{
							  width: 100% !important;
						 }

						 .ant-modal-body{
								text-align: center;
						 }
						`
							}
						</style>

						<Radio.Group onChange={this.onChange} value={this.state.value===undefined?1:this.state.value}>
							<Radio value={1}>已完成</Radio>
							<Radio value={0}>未完成</Radio>
						</Radio.Group>

						<div className={"mt30"}>
							  <a className="pop_close task-btn mr20  margin-tp26" onClick={()=>this.handleCancel()}>取消</a>
								<a className="task-btn task-btn-orange margin-tp26" onClick={()=>this.handleOk(value,editid)}>确定</a>
						</div>

					</div>

				</Modal>:""}

				<style>
					{
						`
						.Itemtitle{
						    float: left;
								padding-top: 2px;
								margin-right: 10px;
						}
						`
					}
				</style>

				{ tpmLoading ? <div style={{ minHeight: '886px'}}></div> :

						<div className="tpmComment educontent clearfix mt30 mb80">

							<div className="with65 fl edu-back-white commentsDelegateParent" >

								<TPMNav
									match={match}
									user={user}
									shixun={shixun}
									{...this.props}
									is_jupyter={this.props.is_jupyter}
								></TPMNav>

								<div  className="padding20 edu-back-white mt20" style={{minHeight: '640px'}}>
									{this.props.identity >2||this.props.identity===undefined?"":<List
										dataSource={datas}
										bordered
										renderItem={(item,key) => (
											<List.Item
												key={item.id}
												actions={[
													<a onClick={()=>this.showModal(item.id,item.status)} key={key}>
														<i className="iconfont icon-bianjidaibeijing font-22 color-green"></i>
													</a>,
												]}
											>
												<List.Item.Meta
													title={<div className={"font-16"}>
														<div className={"Itemtitle"}>{item.name}</div>
														{item.status===undefined?"":item.status===1?<Tag color="#FF6800">已完成</Tag>:<Tag color="#bcbcbc">未完成</Tag>}
													</div>}
													description={
														<div>
															{item.time===undefined?"":<span>审核时间: {item.time}</span>}
															{item.username===undefined?"":<span className={"ml30"}>审核人: {item.username}</span>}
														</div>
													}
												/>
											</List.Item>
										)}
									/>}
								</div>

							</div>

							<div className="with35 fr pl20">
								<TPMRightSection {...this.props}></TPMRightSection>
							</div>
						</div>

				}
			</React.Fragment>
		);
	}
}

export default Audit_situationComponent;
