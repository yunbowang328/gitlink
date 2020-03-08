import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './../questioncss/questioncom.css'
//立即申请试用
class QuestionModals extends Component {

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
				visible={this.props.modalsTypes===undefined?false:this.props.modalsTypes}
				width="442px"
			>
				<div className="educouddiv">
					<div className={"tabeltext-alignleft mt10"}><p className="titiles">是否删除试题栏中{

						this.props.titilesms&&this.props.titilesms==="SINGLE"?
               "单选题"
							:
							this.props.titilesms&&this.props.titilesms==="MULTIPLE"?
								"多选题"
								:
								this.props.titilesms&&this.props.titilesms==="JUDGMENT"?
									"判断题"
									:
									this.props.titilesms&&this.props.titilesms==="COMPLETION"?
										"填空题"
										:
										this.props.titilesms&&this.props.titilesms==="SUBJECTIVE"?
											"简答题"
											:
											this.props.titilesms&&this.props.titilesms==="PROGRAM"?
												"编程题"
												:
												this.props.titilesms&&this.props.titilesms==="PRACTICAL"?
													"实训题"
													:""

					}</p></div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 w80" onClick={()=>this.props.modalCancels()}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.setDownloads(this.props.titilesms)}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default QuestionModals;
