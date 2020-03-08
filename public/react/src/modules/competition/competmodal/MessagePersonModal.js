import React, {Component} from 'react';
import {getImageUrl} from 'educoder';
import {Modal, Input, Spin, Tooltip, Icon, Dropdown, Button} from 'antd';
import axios from 'axios';
import competition from '../comcss/competition.css';
import Registrationitem from "../Registrationitem";
import InfiniteScroll from 'react-infinite-scroller';
// import PersonModaltion from "./PersonModaltion";
const {Search} = Input;

class MessagePersonModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}


	render() {
		const {
			addonAfter, test, test3, Numberofteammentors, Thecurrentnumber, person1, person2
		} = this.state;
		//Modal
		//keyboard是否支持键盘 esc 关闭
		//closable    是否显示右上角的关闭按钮
		//底部内容，当不需要默认底部按钮时，可以设为 footer={null}
		//destroyOnClose 关闭时销毁 Modal 里的子元素
		//centered 垂直居中展示 Modal
		//visible 弹出框是否显示

		return (

			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title={this.props.messagePer}
				centered={true}
				visible={this.props.messagePerbool === undefined ? false : this.props.messagePerbool}
				width="480px"
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div style={{width: "100%", textAlign: "center"}}
							 className="task-popup-text-center font-16 ">{this.props.intpermessages}</div>
					<div style={{textAlign: "center", marginTop: "30px"}}
							 className="task-popup-text-center task-btn task-btn-orange"
							 onClick={() => this.props.messagePerboolbuton()}>确认
					</div>
				</div>
			</Modal>
		)
	}
}

export default MessagePersonModal;
