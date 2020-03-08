
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
import './questionbanks.css';
import GroupPackage from "./GroupPackage";
import AttachmentsList from "../../../common/components/attachment/AttachmentList";
import NoneData from '../../courses/coursesPublic/NoneData'

import GroupPackage2 from "./GroupPackage2";


class Groupjobbandetails extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {
		console.log("Groupjobbandetails");
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
						datas.description===null?
								""
					 			:datas.description==="null"?
						   	""
									:
									datas.description===""?
										""
										:
										<MarkdownToHtml content={datas.description} selector="work_content" className="mb10 yslquesHeigth"></MarkdownToHtml>
									// <div id="MakedownHTML"className="markdown-body   yslquesHeigth yslquesmarkdowntext"  dangerouslySetInnerHTML={{__html: markdownToHTML(datas.description).replace(/▁/g, "▁▁▁")}}/>
					}
					{/*<div id="MakedownHTML"className="markdown-body   yslquesHeigth yslquesmarkdowntext"  dangerouslySetInnerHTML={{__html: markdownToHTML(datas&&(datas.description===null?"无":datas.description==="null"?"无":datas.description)).replace(/▁/g, "▁▁▁")}}/>*/}
					{/*{datas.attachments === undefined ? "" : datas.attachments.map((item, key) => {*/}
					{/*	return (*/}
					{/*		<GroupPackage key={key} attachments={item}></GroupPackage>*/}
					{/*	)*/}
					{/*})}*/}
					{datas.attachments === undefined ?
						(datas.description === undefined || datas.description === null || datas.description === "" ?
								<NoneData></NoneData>
								:
								""
						)
						:
						datas.attachments=== "" ?
							(datas.description === undefined || datas.description === null || datas.description === "" ?
									<NoneData></NoneData>
									:
									""
							)
							:
							datas.attachments=== null ?
								(datas.description === undefined || datas.description === null || datas.description === "" ?
										<NoneData></NoneData>
										:
										""
								)
								:
								datas.attachments.length === 0 ?
									(datas.description === undefined || datas.description === null || datas.description === "" ?
											<NoneData></NoneData>
											:
											""
									)
									:
					<div className="mt24">
						<AttachmentsList {...this.state} {...this.props} attachments={datas.attachments} ></AttachmentsList>
				 </div>
					}
					<GroupPackage2 datas={datas} bool={true}></GroupPackage2>
				</div>


			</div>


		)
	}
}

export default Groupjobbandetails;