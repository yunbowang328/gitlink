import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './authenmodels.css'
//立即申请试用
class AuthenModel extends Component {

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
				visible={this.props.authenmodels===undefined?false:this.props.authenmodels}
				width="442px"
			>
				<div className="educouddiv">
					{
						this.props.authenmodelsinde&&this.props.authenmodelsinde===1?
							<div className={"tabeltext-alignleft mt10"}><p className="titiles">选择该项后，所有学员必须经过平台实名审核才能加入课堂，您确定吗？</p></div>
							:
							this.props.authenmodelsinde&&this.props.authenmodelsinde===2?
								<div className={"tabeltext-alignleft mt10"}><p className="titiles">选择该项后，所有学员必须经过平台职业审核才能加入课堂，您确定吗？</p></div>
								:""
					}
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 w80" onClick={()=>this.props.setmodalsTypedel(false,this.props.authenmodelsinde)}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.setmodalsTypedel(true,this.props.authenmodelsinde)}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default AuthenModel;
