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
import GroupPackage from '../groupjobbank/GroupPackage'
import './completetopicde.css';
import AttachmentsList from "../../../common/components/attachment/AttachmentList";
import NoneData from '../../courses/coursesPublic/NoneData'


class Completetopicdetails extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {
		console.log("Generaljobdetails");
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
				<div className="bor-bottom-greyE">
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
					}

					{datas.attachment_list === undefined ?
						(datas.description===undefined || datas.description===null||datas.description===""?
								<NoneData></NoneData>
								:
								""
						)
						:
						datas.attachment_list === null ?
							(datas.description===undefined || datas.description===null||datas.description===""?
									<NoneData></NoneData>
									:
									""
							)
							:
							datas.attachment_list.length === 0 ?
								(datas.description===undefined || datas.description===null||datas.description===""?
										<NoneData></NoneData>
										:
										""
								)
								:
								<div className="mb29px">
									<AttachmentsList {...this.state} {...this.props} attachments={datas.attachment_list} ></AttachmentsList>
								</div>
					}
				</div>
				</div>
				<div style={{width:"100%", padding: "36px"}}>
				  <div className="yslboomdivs">
         <p>
					<span className="yslboomdivsy">课题类型：</span>
					 <span className="yslboomdivsys">{datas&&datas.topic_type===1?"设计":datas&&datas.topic_type===2?"论文":datas&&datas.topic_type===3?"创作":"无"}</span>
				 </p>
         <p>
					 <span className="yslboomdivsy">课题来源：</span>
					 <span className="yslboomdivsys">{datas&&datas.topic_source===1?"生产/社会实际":datas&&datas.topic_source===2?"结合科研":datas&&datas.topic_source===3?"其它":"无"}</span>
				 </p>
					<p>
						<span className="yslboomdivsy">课题性质1：</span>
						<span className="yslboomdivsys">{datas&&datas.topic_property_first===1?"真题":datas&&datas.topic_property_first===2?"模拟题":"无"}</span>
					</p>
					<p>
						<span className="yslboomdivsy">课题性质2：</span>
						<span className="yslboomdivsys">{datas&&datas.topic_property_second===1?"纵向课题":datas&&datas.topic_property_second===2?"横向课题":datas&&datas.topic_property_second===3?"自选":"无"}</span>
					</p>
				</div>
					<div className="yslboomdivs mt7">
						<p>
							<span className="yslboomdivsy">课题重复情况： </span>
							<span className="yslboomdivsys">{datas&&datas.topic_repeat===1?"新题":datas&&datas.topic_repeat===2?"往届题，有新要求":datas&&datas.topic_repeat===3?"往届题，无新要求":"无"}</span>
						</p>
						<p>
							<span className="yslboomdivsy">调研或实习地点：</span>
							<span className="yslboomdivsys">{datas&&datas.province}{datas&&datas.city}</span>
						</p>
						<p style={{width:"564px"}}>
							<span className="yslboomdivsy">课题单位来源：</span>
							<span className="yslboomdivsys">{datas&&datas.source_unit===undefined?"无":datas&&datas.source_unit===null?"无":datas&&datas.source_unit===""?"无":datas&&datas.source_unit==="null"?"无":datas.source_unit}</span>
						</p>
					</div>
				</div>
			</div>


		)
	}
}

export default Completetopicdetails;