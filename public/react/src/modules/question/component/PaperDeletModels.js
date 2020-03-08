import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './../questioncss/questioncom.css'
//立即申请试用
class PaperDeletModel extends Component {

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
				visible={this.props.modalsTypedels===undefined?false:this.props.modalsTypedels}
				width="442px"
			>
				<div className="educouddiv">

					<div className={"tabeltext-alignleft mt10"}><p className="titiles">确认删除该试题？</p></div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 w80" onClick={()=>this.props.setmodalsTypedels(false,1)}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.setmodalsTypedels(false,2)}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default PaperDeletModel;
