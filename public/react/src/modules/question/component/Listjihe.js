import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, SnackbarHOC, getImageUrl, markdownToHTML} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Radio,
	Tooltip
} from "antd";
import './../questioncss/questioncom.css';
import QuillForEditor from "../../../common/quillForEditor";

const tagArray = [
	'A．', 'B．', 'C．', 'D．', 'E．', 'F．', 'G．', 'H．', 'I．',
	'J．', 'K．', 'L．', 'M．', 'N．', 'O．', 'P．', 'Q．', 'R．',
	'S．', 'T．', 'U．', 'V．', 'W．', 'X．', 'Y．', 'Z．'
]
const tagArrays = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

class Listjihe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			name: "单选题",
			nd: "简单",
		}
	}

	//初始化
	componentDidMount() {


	}

	//选用
	Selectingpracticaltraining = (id) => {
		let data = {}
		if (this.props.exam_id === undefined) {
			data = {
				item_ids: [id]
			}
		} else {
			data = {
				item_ids: [id],
				exam_id: this.props.exam_id === undefined ? "" : parseInt(this.props.exam_id),
			}
		}

		this.props.getitem_baskets(data);
	}
	//撤销
	Selectingpracticaltrainings = (id) => {

		this.props.getitem_basketss(id);
	}


	render() {
		let {page, name, nd} = this.state;
		let {defaultActiveKey, items, listjihe, chakanjiexiboolindex, keindex} = this.props;

		// 编程答案
		var rightkey = null
		var MULTIPLEkey = null;
		if (items) {
			if (items.item_type) {
				if (items.item_type === "PROGRAM") {

				} else {
					if (items.item_type === "JUDGMENT") {
             //多选题
						if (items.choices) {
							if (items.choices.length > 0) {
								var arr = items.choices;
								for (let data of arr) {
									if (data.is_answer === true) {
										rightkey = data.choice_text;
										break;
									}
								}
							}
						}
					} else {
						// 单选题和判断题
						if(items.item_type === "MULTIPLE"){
							if (items.choices) {
								if (items.choices.length > 0) {
									var arr = items.choices;
									for (var i = 0; i < arr.length; i++) {
										if (arr[i].is_answer === true) {
											if(MULTIPLEkey===null){
												MULTIPLEkey = tagArrays[i];

											}else{
												MULTIPLEkey =MULTIPLEkey+ tagArrays[i];
											}

										}
									}
								}
							}

						}else{
							if (items.choices) {
								if (items.choices.length > 0) {
									var arr = items.choices;
									for (var i = 0; i < arr.length; i++) {
										if (arr[i].is_answer === true) {
											rightkey = i;
											break;
										}
									}
								}
							}
						}
					}
				}
			}

		}
		var itemssname="";
		try {
			itemssname= JSON.parse(items.name);
		}catch (e) {
		}
		if(itemssname===undefined){
			itemssname=items.name
		}


		var itemsnamesy="";
		try {
			itemsnamesy= JSON.parse(items&&items.program_attr&&items.program_attr.description);

		}catch (e) {
			itemsnamesy=items&&items.program_attr&&items.program_attr.description;
		}

		var analysisnames="";
		try {
			analysisnames= JSON.parse(items&&items.analysis);

		}catch (e) {
			analysisnames=items&&items.analysis;
		}

		return (
			<div key={keindex}
					 className={chakanjiexiboolindex === keindex ? "w100s borderwds283  pd20 mb20 listjihecolors" : "w100s borderwds  pd20 mb20 listjihecolors"}>
				{/*顶部*/}
				<style>
					{
						`	.markdown-body .ql-editor{
								padding-left: 0px !important;
								padding-top: 0px !important;
						}
						
						.programquill .ql-editor{
								padding-left: 0px !important;
								padding-top: 0px !important;
						}
						
						
						`
					}
				</style>
				<div className="w100s sortinxdirection">
					<div className="listjihetixingstitsy">
						{
							this.props.listjihe
						}.
					</div>
					{
						items.item_type==="PROGRAM"?
							<a href={`/problems/${items.program_attr.identifier}/edit`}>
							<div className="ml10 w100s  "  style={{wordBreak: "break-word"}} dangerouslySetInnerHTML={{__html: markdownToHTML(items&&items.name).replace(/▁/g, "▁▁▁")}}></div>
							</a>
						:
							<div className="ml10 w100s  markdown-body" style={{wordBreak: "break-word"}}>
								{	items===undefined||items===null||items===""?"":
									items.name === undefined || items.name === null || items.name === "" ?
										""
										:
										items.name.length>0?
											<QuillForEditor
												readOnly={true}
												value={itemssname}
											/>
											:""
								}
							</div>
					}

				</div>
				{/*内容*/}
				<div className="w100s sortinxdirection ">
					{items.item_type === "JUDGMENT" ?
						<p className="w100s listjihetixingstitsp sortinxdirection ">
							{
								items === undefined || items === null ? "" : items.choices.map((object, index) => {
									return (
										<p className={index === 1 ? "sortinxdirection  ml10" : "sortinxdirection  "}>
											<Radio disabled={true} >
												{object.choice_text}
											</Radio>
										</p>
									)
								})
							}
						</p> :
						items.item_type === "PROGRAM" ?
							<p className="w100s listjihetixingstitssy sortinxdirection ">
								<p className={"sortinxdirection  mt15"}>
									{
										items&&items.program_attr&&items.program_attr.description?
											<p className="programquill" style={{wordBreak: "break-word"}}
											>
												<QuillForEditor
													readOnly={true}
													value={itemsnamesy}
												/>

											</p>
											:""
									}



								</p>
							</p>
							:
							<p className="w100s listjihetixingstitsp verticallayout ">
								{
									items === undefined || items === null ? "" : items.choices.map((object, index) => {
										var string=""
										try {
											string=JSON.parse(object.choice_text);
										}catch (e) {
											string=object.choice_text;
										}
										return (
											<p className={index === 0 ? "sortinxdirection " : "sortinxdirection  mt15 "}>
												<p className="lh20s">{tagArray[index]}</p>
												<p className="programquill" style={{wordBreak: "break-word"}}>
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


				<div className="w100s sortinxdirection mt10">
					<p
						className="listjihetixing">难度：<span>{items.difficulty === 1 ? "简单" : items.difficulty === 2 ? "适中" : items.difficulty === 3 ? "困难" : ""}</span>
					</p>
					<p
						className="ml30 listjihetixing">题型：<span>{items.item_type === "SINGLE" ? "单选题" : items.item_type === "MULTIPLE" ? "多选题" : items.item_type === "JUDGMENT" ? "判断题" : items.item_type === "PROGRAM" ? "编程题" : ""}</span>
					</p>
				</div>
				{/*更新时间*/}
				<div className="w100s sortinxdirection">
					<div className="w50s listjihetixingstit sortinxdirection">
						<p className="updatetimes lh30">更新时间：{items.update_time}</p>
						{
							this.props.defaultActiveKey === "0" || this.props.defaultActiveKey === 0 ?
								""
								:
								<p className="updatetimes lh30 ml45">创建者：{items.author.name}</p>
						}
						{
							items.item_type === "PROGRAM" ?
								<p className="updatetimes lh30 ml45">编程语言：{items.program_attr.language}</p>
								: ""
						}
						{
							items.item_type === "PROGRAM" ?
								items.program_attr.status === 0 ?
									<p className="updatetimes lh30 ml45 nofabu mt5">未发布</p>
									: ""
								: ""
						}
					</div>
					<div className="w50s xaxisreverseorder">
						{
							items.choosed === true ?
								<p className="selectionss  xiaoshou" onClick={() => this.Selectingpracticaltrainings(items.id)}>
									<i className="iconfont icon-jianhao font-12 lg ml7 lh30 icontianjiadaohangcolor mr5"></i>
									<span className="mr15 lh30">撤销</span></p>
								:
								items.item_type === "PROGRAM" ?
									items.program_attr.status === 0 ?
										<Tooltip placement="top" title={"编程题未发布，不能选用！"}>
											<p className="selectionys  jinzhixiaoshou">
												<i className="iconfont icon-tianjiadaohang font-12 lg ml7 lh30 icontianjiadaohangcolor mr5"></i>
												<span className="mr15 lh30">选用</span>
											</p>
										</Tooltip>

										:
										<p className="selection  xiaoshou" onClick={() => this.Selectingpracticaltraining(items.id)}>
											<i className="iconfont icon-tianjiadaohang font-12 lg ml7 lh30 icontianjiadaohangcolor mr5"></i>
											<span className="mr15 lh30">选用</span>
										</p>
									:
									<p className="selection  xiaoshou" onClick={() => this.Selectingpracticaltraining(items.id)}>
										<i className="iconfont icon-tianjiadaohang font-12 lg ml7 lh30 icontianjiadaohangcolor mr5"></i>
										<span className="mr15 lh30">选用</span>
									</p>
						}
						{
							defaultActiveKey === 0 || defaultActiveKey === "0" ?
								<div className="xaxisreverseorder">
									<p className="viewparsings  xiaoshou mr25" onClick={() => this.props.showmodelysl(items.id)}>
										<i className="iconfont icon-shanchu1 font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
										<span>删除</span>
									</p>
									{
										items.item_type === "PROGRAM" ?
											this.props.Isitapopup&&this.props.Isitapopup==="true"?
												""
												:
											<a href={`/problems/${items.program_attr.identifier}/edit`}>
												<p className="viewparsings  xiaoshou mr25">
													<i className="iconfont icon-bianji2 font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
													<span>编辑</span>
												</p>
											</a>
											:
												this.props.Isitapopup&&this.props.Isitapopup==="true"?
													""
													:
											<a href={`/question/edit/${items.id}`}>
												<p className="viewparsings  xiaoshou mr25">
													<i className="iconfont icon-bianji2 font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
													<span>编辑</span>
												</p>
											</a>
									}
									{
										items.public === false ?
											items.item_type === "PROGRAM" ?
												items.program_attr.status === 0 ?
													""
													:
													items.apply===false?
													<p className="viewparsings  xiaoshou mr25" onClick={() => this.props.showmodels(items.id)}>
														<i className="iconfont icon-gongkai font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
														<span>公开</span>
													</p>
														:
														""
												:items.apply===false?
												<p className="viewparsings  xiaoshou mr25" onClick={() => this.props.showmodels(items.id)}>
													<i className="iconfont icon-gongkai font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
													<span>公开</span>
												</p>
												:
												""
											:
											""
									}

								</div>
								: ""
						}
						{
							items.item_type === "PROGRAM" ?
								""
								:
								<p className="viewparsings  xiaoshou mr25" onClick={() => this.props.chakanjiexibool(keindex)}>
									<i className="iconfont icon-jiexi font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
									查看解析</p>
						}


					</div>
				</div>
				{
					chakanjiexiboolindex === keindex ? <div>
						<div className="w100s questiontypeheng mt23">

						</div>
						<div className=" sortinxdirection mt15 yldxtit">

							{
								items.item_type === "SINGLE"  ?
									<p className=" testfondex yldxtit"
										 style={{wordBreak: "break-word"}}
										 dangerouslySetInnerHTML={{__html: markdownToHTML("答案：" + tagArrays[rightkey]).replace(/▁/g, "▁▁▁")}}
									>
									</p>
									: items.item_type === "MULTIPLE"?
									<p className=" testfondex yldxtit"
										 style={{wordBreak: "break-word"}}
										 dangerouslySetInnerHTML={{__html: markdownToHTML("答案：" + MULTIPLEkey).replace(/▁/g, "▁▁▁")}}
									>

									</p>
									:
									<p className=" testfondex yldxtit"
										 style={{wordBreak: "break-word"}}
										 dangerouslySetInnerHTML={{__html: markdownToHTML("答案：" + rightkey).replace(/▁/g, "▁▁▁")}}
									>
									</p>
							}

						</div>
						<div className=" sortinxdirection mt15 yldxtit">
							<p className=" testfondex yldxtit programquill"
								 style={{wordBreak: "break-word"}}
							>
								{items ?
									items.analysis=== undefined || items.analysis=== null || items.analysis === "" ?

										""
										:
										items.analysis.length>0?
											<QuillForEditor
												imgAttrs={{width: '60px', height: '30px'}}
												readOnly={true}
												value={analysisnames}
											/>
											:
									""
									:
									""
								}
							</p>
						</div>
					</div> : ""
				}


			</div>
		)

	}

}

export default Listjihe;
