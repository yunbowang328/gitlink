import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal,InputNumber} from 'antd';
import axios from 'axios';
import './../questioncss/questioncom.css'
class Paperreview_itemModel extends Component {

	constructor(props) {
		super(props);
		this.state={
			value:0,
		}
	}

	onChange=(value)=>{
		//console.log("设置批量得分");
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
				title="批量设置分数"
				centered={true}
				visible={this.props.modalsTypey===undefined?false:this.props.modalsTypey}
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
						<a className="task-btn mr30 w80" onClick={()=>this.props.Singlemagazine("",false)}>取消</a>
						<a className="task-btn task-btn-orange w80" onClick={()=>this.props.setDownloady(this.state.value)}>确定</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Paperreview_itemModel;
