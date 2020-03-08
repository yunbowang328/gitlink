import React, { Component } from 'react';
import { Modal} from 'antd';
import axios from 'axios';
import shimingrenzheng from '../../../src/images/cert/shimingrenzheng.png';
import zhiyerenzheng from '../../../src/images/cert/zhiyerenzheng.png';
import './certfed.css';
//认证职业
class Certifiedprofessional extends Component {

	constructor(props) {
		super(props);
		this.state={
			// occupation:3,
			// mydisplay:false,
		}
	}

	componentDidMount() {
		// console.log("加入金品课堂");
		// console.log(this.props);


	}

	modalCancel=()=>{
	 this.props.ModalCancelsy();
	};

	setDownload=()=>{
		window.location.href="/account/certification"

	}


	render() {
		// console.log("加入金品课堂2");
		// console.log(this.props);
		let{occupation} =this.props;
			return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title="因为以下原因，您暂时不能进行操作"
				centered={true}
				visible={this.props.mydisplay}
				width="600px"
				heigth="307px"
			>
				<div className="educouddiv">
					<div className={"tabeltext-alignleft fontsizecoirlysl"}><p style={{fontSize: "16px"}}>请在完成条件后重试</p></div>
					{
						occupation=== 3?
							<div className="yslcentercerlfed  edu-txt-center mt30"  >

								<div className="mr55 imgysldivone">
									<img className="yslimgwidthte"
											 src={shimingrenzheng}
									/>
									<span className="fontsizecoirlysltwo mt15">未实名认证</span>
								</div>
								<div className="imgysldivone">
									<img className="yslimgwidthte"
											 src={zhiyerenzheng}
									/>
									<span className="fontsizecoirlysltwo mt15">未职业认证</span>
								</div>
							</div>
							:occupation=== 2?
							<div className="yslcentercerlfed  edu-txt-center mt30"  >
								<div className="imgysldivone">
									<img className="yslimgwidthte"
											 src={zhiyerenzheng}
									/>
									<span className="fontsizecoirlysltwo mt15">未职业认证</span>
								</div>
							</div>
							:
							<div className="yslcentercerlfed  edu-txt-center mt30"  >
								<div className=" imgysldivone">
									<img className="yslimgwidthte"
											 src={shimingrenzheng}
									/>
									<span className="fontsizecoirlysltwo mt15">未实名认证</span>
								</div>
							</div>
					}

					<div className="clearfix  edu-txt-center mt28">

						<a className="task-btn mr60 w90" onClick={()=>this.modalCancel()}>取消</a>
						<a className="task-btn task-btn-orange w90" onClick={()=>this.setDownload()}>立即认证</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Certifiedprofessional;