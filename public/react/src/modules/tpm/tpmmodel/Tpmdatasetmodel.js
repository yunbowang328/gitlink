import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
import axios from 'axios';
import './common.css'
//立即申请试用
class Tpmdatasetmodel extends Component {

	constructor(props) {
		super(props);
		this.state={

		}
	}

	modalCancel=()=>{
		this.props.modalCancel()
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
				width="530px"
			>
				<div className="educouddiv intermediatecenter">
					{
						this.props.itemtypebool===true?

							<div className={"tabeltext-alignleftysl mt10"}><p>文件名重复</p></div>

							:""
					}
					<div className={"tabeltext-alignleftysltwo mt10"}><p>{this.props.tittest}</p></div>
					<div className="clearfix mt30 edu-txt-center task-btn-blues">
						{/*<a className="task-btn mr30" onClick={()=>this.modalCancel()}>先试试看</a>*/}
						{/*<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>立即申请授权</a>*/}
						<a className="  task-btn-blue-test bth100 " onClick={()=>this.modalCancel()}>我知道啦</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Tpmdatasetmodel;
