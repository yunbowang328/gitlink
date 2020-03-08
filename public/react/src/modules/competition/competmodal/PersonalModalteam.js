import React, {Component} from 'react';
import {getImageUrl} from 'educoder';
import {Modal, Input, Spin, Tooltip, Icon, Dropdown, Button} from 'antd';
import axios from 'axios';
import competition from '../comcss/competition.css';
import Registrationitem from "../Registrationitem";
import InfiniteScroll from 'react-infinite-scroller';
// import PersonModaltion from "./PersonModaltion";
const {Search} = Input;

//立即申请试用
class PersonalModalteam extends Component {

	constructor(props) {
		super(props);
		this.state = {
			yslzxueshiskmcdm1: "",
		}
	}


	Tmoconfirmto = () => {
		try {
			if (this.state.yslzxueshiskmcdm1) {
				if (this.state.yslzxueshiskmcdm1.length === 0) {
					this.props.showNotification(`请输入您的邀请码`);
					return
				}

			}
		} catch (e) {

		}


		let url = `/competitions/${this.props.match.params.identifier}/competition_teams/join.json`;
		axios.post(url, {
			invite_code: this.state.yslzxueshiskmcdm1
		}).then((result) => {
			if (result) {
				if (result.data) {
					try {
						if (result.data.status === 0) {
							this.props.showNotification(`报名成功，预祝您夺得桂冠`);
						}
					} catch (e) {

					}


					this.props.Tmoconfirm(true)
				}
			}
		}).catch((error) => {

		});
	}

	studentsonChange = (e) => {
		this.setState({
			yslzxueshiskmcdm1: e.target.value,
		});

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
				title="加入战队"
				centered={true}
				visible={this.props.tmodalsTypes === undefined ? false : this.props.tmodalsTypes}
				width="600px"
			>

				<div className="personaldiv">
					<div style={{
						display: "flex",
						flexDirection: "initial",
						marginTop: "10px",
					}}>
						<p style={{
							width: "67px",
							fontSize: "16px",
							color: '#05101A',
							height: "40px",
							lineHeight: "40px",
						}}>
							邀请码：
						</p>
						<style>
							{
								`
								.yslzxueshiskmcdm1 {
																		height: 40px !important;
																		width: 329px !important;
																		}
								`
							}
						</style>
						<Input className={"yslzxueshiskmcdm1"} value={this.state.yslzxueshiskmcdm1}
									 onChange={(e) => this.studentsonChange(e)} placeholder="请输入您的邀请码"/>

					</div>

					<div style={{
						marginTop: "48px",
						display: "flex",
						alignItems: "center",
						paddingBottom: "12px",

					}}>
						<div style={{
							display: "flex",
							justifyContent: "center",
							width: "100%"
						}}>
							<div className="personaldivbutt1">
								<p onClick={() => this.props.Tmoconfirm(false)}>取消</p>
							</div>
							<div className="personaldivbutt2">
								<p onClick={() => this.Tmoconfirmto()}>确定</p>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default PersonalModalteam;
