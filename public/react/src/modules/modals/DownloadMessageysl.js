import React, { Component } from 'react';
import { Modal} from 'antd';
class DownloadMessageysl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			funmodalsType:false,
			istype:false
		}
	}

	setDownload=()=>{
		this.props.modalCancel();
		window.open(`/messages/${this.props.user.login}/message_detail?target_ids=1`)
	}
	render() {

		return(
			<Modal
				keyboard={false}
				title="提示"
				visible={this.props.modalsType===undefined?false:this.props.modalsType}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
				<div className="task-popup-content">
					{this.props.value===500?<p>
						<p className="task-popup-text-center font-16">因附件资料超过500M，您可以通过检索分批下载</p>
						<p className="task-popup-text-center font-16 mt5">或者通过微信或者QQ联系管理员辅助您打包下载</p>
					</p>:this.props.value===100?
						<p>
							<p className="task-popup-text-center font-16">已超出文件导出的上限数量（ <span className={"color-orange-tip"}>100</span> ），建议：</p>
							<p className="task-popup-text-center font-16 mt20">1.通过检索分批次下载</p>
							<p className="task-popup-text-center font-16 mt5">2.联系管理员辅助下载</p>
						</p>
						:""}
					<div className="clearfix mt30 edu-txt-center">
						<a  className="task-btn mr30" onClick={this.props.modalCancel}>取消</a>
						<a className="task-btn task-btn-orange" onClick={this.setDownload}>立即联系</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default DownloadMessageysl;