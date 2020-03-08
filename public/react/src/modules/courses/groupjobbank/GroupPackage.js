
import React, {Component} from "react";
import { WordsBtn,on, off, trigger,markdownToHTML,getRandomNumber} from 'educoder';
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

class GroupPackage extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}
	DownloadOpenPdf=(type,url)=>{
		let newurl=url+getRandomNumber();
		type===true?window.open(newurl):window.location.href=newurl;
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
     let{attachments}=this.props;
		return (
					<div className="color-grey df yslquesmat26" key={this.props.key} style={{ lineHeight: '17px'}}>
						<a className="color-grey ">
							<i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
						</a>
						<style>
							{
								`
								a:hover {
											color: #459be5 !important;
									}
									a:link, a:visited {
    								text-decoration: none;
									 color: #999999 !important;
							}
								`
							}
						</style>
						<a  onClick={()=>this.DownloadOpenPdf(attachments.is_pdf,attachments.url)} title={attachments&&attachments.title}
							 className="mr12 yslahover overflowHidden1" length="58" style={{maxWidth:'480px',fontSize:"16px",}}>
							 <span>{attachments&&attachments.title}</span>
						</a>
						<span className="color656565  color-grey-6 font-12 mr8">{attachments&&attachments.filesize}</span>

					</div>
		)
	}
}

export default GroupPackage;