import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './../questioncss/questioncom.css'
//立即申请试用
class QuestionModal extends Component {

	constructor(props) {
		super(props);
		this.state={

		}
	}


	render() {

		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title="提示"
				centered={true}
				visible={this.props.modalsType===undefined?false:this.props.modalsType}
				width="442px"
			>
				<div className="educouddiv">
					<div className={"tabeltext-alignleft mt10"}><p className="titiles">{this.props.titilesm}</p></div>
					<div className={"tabeltext-alignleft mt10"}><p className="titiles">{this.props.titiless}</p></div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 w80" onClick={()=>this.props.modalCancel()}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.setDownload()}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default QuestionModal;
