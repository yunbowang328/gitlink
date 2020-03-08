import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, SnackbarHOC, getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Drawer,
	Input,
	Button,
	Breadcrumb
} from "antd";
import {TPMIndexHOC} from "../tpm/TPMIndexHOC";
import NoneData from './component/NoneData';
import './testioncss/testioncss.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import Bottomsubmit from "../../modules/modals/Bottomsubmit";
import Seeoagertit from "./component/Seeoagertit";
import Paperlibraryseeid_item from './component/Paperlibraryseeid_item';
//人工组卷预览
class Paperlibraryseeid extends Component {
	constructor(props) {
		super(props);
		this.contentMdRef = React.createRef();
		this.state = {
			paperlibrartdata:[],


		}


	}

	//初始化
	componentDidMount() {
		////console.log("Paperlibraryseeid");
		this.getdata();


	}


	getdata = () => {
		let urls = `/examination_banks/${this.props.match.params.id}.json`;
		axios.get(urls).then((response) => {
			if (response) {
				this.setState({
					paperlibrartdata: response.data,
				})
			}
		});

	}


	//跳转道描点的地方
	scrollToAnchor = (anchorName) => {
		try {
			if (anchorName) {
				// 找到锚点
				let anchorElement = document.getElementById(anchorName);
				// 如果对应id的锚点存在，就跳转到锚点
				if (anchorElement) {
					anchorElement.scrollIntoView();
				}
			}
		} catch (e) {

		}

	}
	preservation = () => {
		//保存试卷




	}


	setitem_type = (item_type) => {


	}

	setCohetepaperbool =(bool)=>{

	}
	getcontentMdRef = (Ref) => {
		this.contentMdRef = Ref;
	}
	render() {
		let {paperlibrartdata} = this.state;
		const params = this.props && this.props.match && this.props.match.params;
		// ////console.log(params);
		return (
			<div>
				<div id={"Itembankstopid"} className="newMain clearfix intermediatecenter "
				>

					<style>
						{
							`
					
						.newFooter{
						display: none;
						}
						`
						}
					</style>
					<div className="w1200ms">
						<div className="w100s mt30">
									<Breadcrumb separator=">">
										<Breadcrumb.Item href="/paperlibrary">试卷库</Breadcrumb.Item>
										<Breadcrumb.Item className={"shubiao"}>公告试卷库</Breadcrumb.Item>
										<Breadcrumb.Item className={"shubiao"}>试卷查看</Breadcrumb.Item>
									</Breadcrumb>
						</div>

						<div className="seesjtit intermediatecenter mt16">
							{paperlibrartdata&&paperlibrartdata.exam&&paperlibrartdata.exam.name}
						</div>

						<div className=" clearfix  educontent Contentquestionbankstyle w100s w1200wuh mt19">

							<Seeoagertit all_score={paperlibrartdata&&paperlibrartdata.exam&&paperlibrartdata.exam.all_questions_count}
													 all_questions_count={paperlibrartdata&&paperlibrartdata.exam&&paperlibrartdata.exam.all_score}
							>


							</Seeoagertit>

							<Paperlibraryseeid_item
								{...this.state}
								{...this.props}
								getdata={()=>this.getdata()}
								single_questions={paperlibrartdata&&paperlibrartdata.single_questions&&paperlibrartdata.single_questions.questions.length>0?paperlibrartdata.single_questions:null}
																			multiple_questions={paperlibrartdata&&paperlibrartdata.multiple_questions
																			&&paperlibrartdata.multiple_questions.questions.length>0?paperlibrartdata.multiple_questions:null
																			}
																			judgement_questions={paperlibrartdata&&paperlibrartdata.judgement_questions
																			&&paperlibrartdata.judgement_questions.questions.length>0?paperlibrartdata.judgement_questions:null
																			}
																			program_questions={paperlibrartdata&&paperlibrartdata.program_questions
																			&&paperlibrartdata.program_questions.questions.length>0?paperlibrartdata.program_questions:null
																			}
							>


							</Paperlibraryseeid_item>








						</div>





					</div>


				</div>

				<Bottomsubmit {...this.props} {...this.state} bottomvalue={"发起考试"}
											setCohetepaperbool={(bool)=>this.setCohetepaperbool(bool)}
											onSubmits={() => this.preservation()} url={'/paperlibrary'}></Bottomsubmit>
			</div>
		)

	}


}

export default SnackbarHOC()(TPMIndexHOC(Paperlibraryseeid));


