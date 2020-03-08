
import React, {Component} from "react";
import { WordsBtn,on, off, trigger,MarkdownToHtml,getImageUrl} from 'educoder';
import {
	Button,
	Checkbox,
	message,
	InputNumber,
	DatePicker,
	Radio,
	Tooltip,
	notification,
} from "antd";
import AttachmentsList from '../../../common/components/attachment/AttachmentList'
import GroupPackage from './GroupPackage';
import GroupPackage2 from './GroupPackage2';
import NoneData from '../../courses/coursesPublic/NoneData'
import './questionbanks.css';

class Groupjobquesanswer extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {
		console.log("Groupjobquesanswer");
		console.log("componentDidMount");
		// let query = this.props.location.pathname;
		// const type = query.split('/');
		// this.setState({
		// 	shixuntypes:type[3]
		// })
		// this.props.triggerRef(this);




	}
	// 获取数据地方
	getTrainingjobsetting = () => {
		var homeworkid = this.props.match.params.homeworkid;
	}

	//跳转道描点的地方
	scrollToAnchor = (anchorName) => {
		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if(anchorElement) { anchorElement.scrollIntoView(); }
		}
	};



	render() {
		let{datas}=this.props;
		return (
			<div className=" clearfix  edu-back-white "  ref='targetElementTrainingjobsetting' style={{margin:  "auto", minWidth:"1200px"}}>
				<div className="yslquestionbank1">
					{
						datas.reference_answer===null?
								""
								:datas.reference_answer==="null"?
									""									:
									datas.reference_answer===""?
										""
										:
										<MarkdownToHtml content={datas.reference_answer} selector="work_content" className="mb10 yslquesHeigth"></MarkdownToHtml>
					}

					{datas.reference_attachments === undefined ?
						(datas.reference_answer===undefined || datas.reference_answer===null|| datas.reference_answer===""?
								<NoneData></NoneData>
								:
								""
						)
						:
						datas.reference_attachments === "" ?
							(datas.reference_answer===undefined || datas.reference_answer===null|| datas.reference_answer===""?
									<NoneData></NoneData>
									:
									""
							)
							:
						datas.reference_attachments === null ?
							(datas.reference_answer===undefined || datas.reference_answer===null|| datas.reference_answer===""?
									<NoneData></NoneData>
									:
									""
							)
						:
							datas.reference_attachments.length === 0 ?
								(datas.reference_answer===undefined || datas.reference_answer===null|| datas.reference_answer===""?
										<NoneData></NoneData>
										:
										""
								)
								:
			     <div className="mt24">
						<AttachmentsList {...this.state} {...this.props} attachments={datas.reference_attachments} ></AttachmentsList>
					</div>
					}
				</div>
			</div>

		)
	}
}

export default Groupjobquesanswer;