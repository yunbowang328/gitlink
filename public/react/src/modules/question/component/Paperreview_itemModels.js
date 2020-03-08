import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal,InputNumber} from 'antd';
import axios from 'axios';
import './../questioncss/questioncom.css'
//立即申请试用
class Paperreview_itemModels extends Component {

	constructor(props) {
		super(props);
		this.state={
			value:0,
		}
	}

	onChange=(value)=>{
		//console.log("Paperreview_itemModels");
		//console.log(value);
		this.setState({
			value:value,
		})
	}

	render() {

		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title="设置分数"
				centered={true}
				visible={this.props.modalsTypeys===undefined?false:this.props.modalsTypeys}
				width="442px"
			>
				<style>
					{
						`
						.yslzxueshisanfd .ant-input-number{
height: 35px !important;
width: 124px !important;
}
						`
					}
				</style>
				<div className="educouddiv intermediatecenter">
					<div className={"tabeltext-alignleft mt10 sortinxdirection yslzxueshisanfd"}>
						<p className="titiles lh35">
							{this.props.titilesm}：</p>
						<InputNumber min={0}
												 step={0.1}
												 onChange={this.onChange} />
						<p className="titiles ml5 lh35">
							分/题
						</p>
					</div>
					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 w80" onClick={()=>this.props.Singlemagazines(false,null)}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.setDownloadys(this.state.value)}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Paperreview_itemModels;
