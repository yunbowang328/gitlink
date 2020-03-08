import React, { Component } from 'react';
import { Spin, Icon , Modal,Input,Button} from 'antd';
class NEITaskDetailsModel extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {

		return(
			<Modal
				keyboard={false}
				title="提示"
				visible={this.props.applytype===undefined?false:this.props.applytype}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16 mb20">
					 				<div>{this.props.applyvalue}</div>
						    	<div>{this.props.applybottom}</div>
						</p>
						<div className="clearfix mt30 edu-txt-center">
							<a  className="task-btn mr30 color_white" onClick={this.props.applycancel}>取消</a>
							<a className="task-btn task-btn-orange " onClick={this.props.applyconfirm}>确定</a>
						</div>

					</div>
			</Modal>
		)
	}
}

export default NEITaskDetailsModel;