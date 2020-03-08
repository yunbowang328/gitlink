import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, getImageUrl, markdownToHTML} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Drawer,
	Input,
	Button,
	Breadcrumb,
	Radio
} from "antd";
import Itembankstop from "./component/Itembankstop";
import NoneData from './component/NoneData';
import './questioncss/questioncom.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import QuillForEditor from "../../common/quillForEditor";

const tagArray = [
	'A．', 'B．', 'C．', 'D．', 'E．', 'F．', 'G．', 'H．', 'I．',
	'J．', 'K．', 'L．', 'M．', 'N．', 'O．', 'P．', 'Q．', 'R．',
	'S．', 'T．', 'U．', 'V．', 'W．', 'X．', 'Y．', 'Z．'
]

//单选题
class Paperreview_single extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: 0,
			totalscore: 0,
			total: 0,
		}

	}

	//初始化
	componentDidMount() {


	}


	getdata = (data) => {

	}

	preservation = () => {


	}


	setitem_type = (item_type) => {


	}
	showparagraph = (indexx) => {


	}
	Singlemagaziness = () => {

	}

	render() {
		let {questions, totalscore, total, items} = this.state;
		let {objectsingle, indexx, paperreviewsingleindex, indexxy,name} = this.props;


		var itemssname="";
		try {
			itemssname= JSON.parse(objectsingle.name);
		}catch (e) {
			itemssname=objectsingle.name;
		}
		if(itemssname===undefined){
			itemssname=objectsingle.name
		}

		var itemsnamesy="";
		try {
			itemsnamesy= JSON.parse(objectsingle&&objectsingle.program_attr&&objectsingle.program_attr.description);

		}catch (e) {
			itemsnamesy=objectsingle&&objectsingle.program_attr&&objectsingle.program_attr.description;
		}

		return (
			<div key={indexxy}
					 className={ "w100s borderwdswuh   mb20  pd20 "}
					 onMouseEnter={() => this.props.showparagraphs(indexxy,name)} style={{
				minHeight: "114px",
			}}>
				<style>{
					`
						.programquill .ql-editor{
							  padding-left: 0px !important;
								padding-top: 0px !important;
						}
						
						.programquill .ql-editor p{
						line-height: 28px;
					
						}
						.programquills .ql-editor{
		           	padding-left: 0px !important;
								padding-top: 0px !important;
						}
						
						.programquills .ql-editor p{
						line-height: 20px;
					
						}
					`
				}</style>
				{/*顶部*/}
				<div className="w100s sortinxdirection ">
					<div className=" sortinxdirection ">
						<p className="cretitlecolrlis lh28">{indexx}</p>、
					</div>
					<style>
						{
							`
					.markdown-body{
					   color: #333333;
             font-size: 14px !important;
                 line-height: 28px;

					}
					.markdown-body p {
					 color: #333333;
					 font-size: 14px !important;
					     line-height: 28px;

					}
					`
						}
					</style>
					{
						objectsingle.item_type==="PROGRAM"?
						   <div className="w100s sortinxdirection">
								 <div className=" tites lh28 listjihetixingstit markdown-body cretitlecolrlist " style={{wordBreak: "break-word",
									 minWidth:"32px"
								 }}
								 >
									 ({objectsingle.score}分)
								 </div>
								 <div className="ml10 lh28 listjihetixingstit markdown-body cretitlecolrlist " style={{wordBreak: "break-word"}}
											dangerouslySetInnerHTML={{__html: markdownToHTML(objectsingle.name).replace(/▁/g, "▁▁▁")}}>

								 </div>
							 </div>
							:
							<div className="w100s sortinxdirection">
								<div className="tites  lh28 listjihetixingstit markdown-body cretitlecolrlist " style={{wordBreak: "break-word",
									minWidth:"32px"
								}}
								>
									({objectsingle.score}分)
								</div>
							<div className="ml10 lh28 listjihetixingstit  cretitlecolrlist programquill" style={{wordBreak: "break-word"}}
		          >
								<QuillForEditor
									readOnly={true}
									value={itemssname}
								/>

							</div>
							</div>
					}

				</div>
				{/*内容*/}
				<div className="w100s sortinxdirection">


					{
						objectsingle.item_type === "JUDGMENT" ?
							<p className="w100s listjihetixingstits sortinxdirection ">
								{
									objectsingle === undefined || objectsingle === null ? "" : objectsingle.choices.map((object, index) => {
										return (
											<p className={index === 1 ? "sortinxdirection  ml10" : "sortinxdirection  "}>
												<Radio  disabled={true}>
													{object.choice_text}
												</Radio>
											</p>
										)
									})
								}
							</p>
							:
							objectsingle.item_type === "PROGRAM" ?
								<p className="w100s listjihetixingstitssy sortinxdirection ">
									<p className={"sortinxdirection  mt15"}>
										{
											objectsingle&&objectsingle.program_attr&&objectsingle.program_attr.description?
										<p className="programquill" style={{wordBreak: "break-word"}}
										>
										<QuillForEditor
											readOnly={true}
											value={itemsnamesy}
										/>
									</p>
											:
												""}
									</p>
								</p>
								:
								<p className="w100s listjihetixingstits verticallayout ">
									{
										objectsingle === undefined || objectsingle === null ? "" : objectsingle.choices.map((object, index) => {
											 var string=""
											try {
												string=JSON.parse(object.choice_text);
											}catch (e) {
												string=object.choice_text;
											}

											return (
												<p key={index} className={index === 0 ? "sortinxdirection" : "sortinxdirection  mt15"}>
													{tagArray[index]}
													<p className="programquills" style={{wordBreak: "break-word"}}>
														{object ?
															object.choice_text === undefined || object.choice_text=== null || object.choice_text === "" ?
																""
																:
																object.choice_text.length>0?
																	<QuillForEditor
																		readOnly={true}
																		value={string}
																	/>
																	:""
															:
															""
														}
													</p>
												</p>
											)
										})
									}
								</p>
					}


				</div>


			</div>
		)

	}


}

export default Paperreview_single


