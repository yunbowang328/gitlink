import React, { Component } from 'react';
import { Modal, Radio, Input} from 'antd';
import axios from 'axios';
//加入精品课堂
class OpenCourse extends Component {

	constructor(props) {
		super(props);
		this.state={
			value:1
		}
	}

	componentDidMount() {
		// console.log("加入精品课堂");
		// console.log(this.props);

	}

	modalCancel=()=>{
   this.props.OpenCourseCancel();
	};

	setDownload=()=>{
   let {value}=this.state;
   console.log(this.props.match.params.pathId)

	 if(value===0){
    window.open(`/courses/news/${this.props.match.params.pathId}/newgold/0 `);
	 }else{
		window.open(`/courses/news/${this.props.match.params.pathId}/newgold/1`);
	 }
		this.props.OpenCourseCancel();
	}
	setpathradioChange = e => {

		this.setState({
			value: e.target.value,
		});
	};

	render() {
		// console.log("加入精品课堂2");
		 //console.log(this.props.Pathcourseid);
		const pathradioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
			color:'#05101A',
			textAlign: 'left',
			fontSize: '16px'
		};
		const pathradioStyles={
			color:'#999999'
		}
		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title="选择课堂性质"
				centered={true}
				visible={this.props.OpenCourseTypes===undefined?false:this.props.OpenCourseTypes}
				width="600px"
			>
				<div className="educouddiv">
					<div className={"tabeltext-alignleft"}>
						<p className={"mt20 mb20 font-16"}>
							<Radio.Group onChange={this.setpathradioChange} value={this.state.value}>
								<Radio style={pathradioStyle} value={1}  className={"mt10"}>
									开放课堂：<span style={pathradioStyles}>所有用户可以随时访问</span>
								</Radio>

								<Radio style={pathradioStyle} value={0}  className={"mt10"}>
									私有课堂：<span style={pathradioStyles}>仅报名参与的课堂成员可以访问</span>
								</Radio>
							</Radio.Group>
						</p>
					</div>
					<style>
						{
							`
							a:hover {
									color: #fff !important;
							}
							`
						}
					</style>
					<div className="clearfix  edu-txt-center mt20">
						<a className="task-btn mr30" onClick={()=>this.modalCancel()}>取消</a>
						<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>确认</a>
					</div>
				</div>
			</Modal>
		)
	}
}

export default OpenCourse;