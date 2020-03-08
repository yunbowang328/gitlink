import React, { Component } from 'react';
import { Modal } from 'antd';
export function SetAppModel(options={}) {
	return function wrap(WrappedComponent) {
		return class Wrapper extends Component {
			constructor(props) {
				super(props);

				this.state = {

				}
			}
			modalCancel=()=>{
				window.location.href = "/";
			}

			setDownload=()=>{
				window.location.href ='/account/profile';
			}
			componentDidMount(){
				console.log(this.props)
			}

			render() {
				const { titlemessage, Modallisttype, Modallist, singleButton } = this.state;
				return (
					<Modal
						keyboard={false}
						closable={false}
						footer={null}
						destroyOnClose={true}
						title="提示"
						centered={true}
						visible={true}
						width="530px"
					>
						<div className="educouddiv">
							<div className={"tabeltext-alignleft mt10"}><p>您尚未完善个人资料</p></div>
							<div className={"tabeltext-alignleft mt10"}><p>请在完成资料后，提交试用申请</p></div>
							<div className="clearfix mt30 edu-txt-center">
								<a className="task-btn mr30" onClick={()=>this.modalCancel()}>取消</a>
								<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>立即完善资料</a>
							</div>
						</div>
					</Modal>
				)
			}
		}
	}
}

