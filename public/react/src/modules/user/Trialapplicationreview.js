import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './common.css'
//您的试用申请正在审核中，请耐心等待
class Trialapplicationreview extends Component {

	constructor(props) {
		super(props);
		this.state={
			modalsType:false,
		}

	}

	componentDidMount() {
		axios.interceptors.response.use((response) => {
			if (response != undefined)
				if (response && response.data.status === 408) {
					this.setState({
						modalsType: true
					})

				}
			return response;
		}, (error) => {
			//TODO 这里如果样式变了会出现css不加载的情况

		});
	}


		setDownload=()=>{
		//立即联系
		this.setState({
			modalsType:false
		})

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
				visible={this.state.modalsType===undefined?false:this.state.modalsType}
				width="530px"
			>
				<div className="educouddiv tabeltext-alignleft">
					<div className={"tabeltext-alignleft mb20"}><p>您的试用申请正在审核中，请耐心等待</p></div>
					<a className="task-btn task-btn-orange bth100" onClick={()=>this.setDownload()}>知道啦</a>
				</div>
			</Modal>
		)
	}
}

export default Trialapplicationreview;