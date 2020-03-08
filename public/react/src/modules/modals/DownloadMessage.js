import React, { Component } from 'react';
import {getRandomcode} from 'educoder';
import { Modal} from 'antd';

import axios from 'axios';

class DownloadMessage extends Component {
   //没有修改菜世的  最后复原了
	constructor(props) {
		super(props);
		this.state = {
			funmodalsType:false,
			istype:false,
			DownloadMessageval:undefined,
			DownloadType:false
		}
	}

	setDownload=()=>{
		this.modalCancel();
		window.open(`/messages/${this.props.user.login}/message_detail?target_ids=1`)
	}
	modalCancel = () => {
		this.setState({
			DownloadType: false,
		})
	}

	Downloadcal=()=>{
		this.setState({
			DownloadType:false,
			DownloadMessageval:undefined
		})
	}

	/// 确认是否下载
	confirmysl(url,params){
		axios.get(url,{
			params
		}).then((response) => {
			if(response.data.status&&response.data.status===-1){

			}else if(response.data.status&&response.data.status===-2){
				if(response.data.message === "100"){
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType:true,
						DownloadMessageval:100
					})
				}else {
					//因附件资料超过500M
					this.setState({
						DownloadType:true,
						DownloadMessageval:500
					})
				}
			}else {
				this.props.showNotification(`正在下载中`);
				window.open(getRandomcode("/api"+url), '_blank');
			}
		}).catch((error) => {
			console.log(error)
		});
	}
	render() {

		return(
			<Modal
				keyboard={false}
				title="提示"
				visible={this.state.DownloadType===undefined?false:this.state.DownloadType}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
				<div className="task-popup-content">
					{this.state.DownloadMessageval===500?<p>
						<p className="task-popup-text-center font-16">因附件资料超过500M，您可以通过检索分批下载</p>
						<p className="task-popup-text-center font-16 mt5">或者通过微信或者QQ联系管理员辅助您打包下载</p>
					</p>:this.state.DownloadMessageval===100?
						<p>
							<p className="task-popup-text-center font-16">已超出文件导出的上限数量（ <span className={"color-orange-tip"}>100</span> ），建议：</p>
							<p className="task-popup-text-center font-16 mt20">1.通过检索分批次下载</p>
							<p className="task-popup-text-center font-16 mt5">2.联系管理员辅助下载</p>
						</p>
						:""}
					<div className="clearfix mt30 edu-txt-center">
						<a  className="task-btn mr30" onClick={this.modalCancel}>取消</a>
						<a className="task-btn task-btn-orange" onClick={this.setDownload}>立即联系</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default DownloadMessage;