import React, {Component} from 'react';
import {getImageUrl} from 'educoder';
import {Modal, Input, Spin, Tooltip, Icon, Dropdown, Button} from 'antd';
import axios from 'axios';
import competition from '../comcss/competition.css';
import Registrationitem from "../Registrationitem";
import InfiniteScroll from 'react-infinite-scroller';
// import PersonModaltion from "./PersonModaltion";
const {Search} = Input;

//退出战队
class ExittheteamModel extends React.Component {

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
				title={this.props.messageexit}
				centered={true}
				visible={this.props.messageexitol === undefined ? false : this.props.messageexitol}
				width="480px"
			>

				<div className="task-popup-content">
					<div className="task-popup-text-center font-14">{this.props.exitintpermessages}</div>
				</div>
				<div className="task-popup-submit clearfix">
					<a className="pop_close task-btn mb10 mr40 colorFFF"
						 onClick={() => this.props.Exittheteam(false)}>取消</a>
					<a className="task-btn task-btn-orange fr" onClick={() => this.props.Exittheteam(true)}>确定</a>
				</div>

			</Modal>
		)
	}
}

export default ExittheteamModel;
