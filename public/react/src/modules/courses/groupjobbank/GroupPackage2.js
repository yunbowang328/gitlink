import React, {Component} from "react";
import { WordsBtn,on, off, trigger,markdownToHTML,getImageUrl} from 'educoder';
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
		let{datas,bool}=this.props;

		return (
			bool===true?

				<div className="ml47text">
					{
						datas===undefined?"":datas.min_num===undefined||datas.max_num===undefined?"":datas.min_num===null||datas.max_num===null?"":
							<p>
								<span className="ysltextcolor66">分组要求：</span>
								<span className="ysltextcolor05">{datas&&datas.min_num}~ {datas&&datas.max_num} 人（学生提交作品时需要关联同组成员，组内成员作品共享）</span>
							</p>
					}

						{
							datas===undefined?"":datas.base_on_project===undefined?"":
								datas.base_on_project===true?
									<p>
										<span className="ysltextcolor66">基于项目实施</span>
										<span className="ysltextcolor05">（学生必须在本平台创建项目，项目管理员可以提交作品）</span>
									</p>
									:datas.base_on_project===false?
									<p>
										<span className="ysltextcolor66">不基于项目</span>
										<span className="ysltextcolor05">（无需在平台创建项目，任意小组成员均可以提交作品）</span>
									</p>
									:""
						}

				</div>
				:<div className="ml47text">
					{
						datas===undefined?"":datas.group_info===undefined?"":datas.group_info.min_number===undefined||datas.group_info.max_number===undefined?"":
							datas.group_info.min_number===null||datas.group_info.max_number===null?"":
								<p>
									<span className="ysltextcolor66">分组要求：</span>
									<span className="ysltextcolor05">{datas&&datas.group_info&&datas.group_info.min_number}~ {datas&&datas.group_info&&datas.group_info.max_number} 人（学生提交作品时需要关联同组成员，组内成员作品共享）</span>
								</p>
					}
					{
						datas&&datas.group_info&&datas.group_info.base_on_project===1?
							<p>
								<span className="ysltextcolor66">基于项目实施</span>
								<span className="ysltextcolor05">（学生必须在本平台创建项目，项目管理员可以提交作品）</span>
							</p>
							:datas&&datas.group_info&&datas.group_info.base_on_project===0?
							<p>
								<span className="ysltextcolor66">不基于项目</span>
								<span className="ysltextcolor05">（无需在平台创建项目，任意小组成员均可以提交作品）</span>
							</p>
							:""
					}
				</div>
		)
	}
}

export default GroupPackage;