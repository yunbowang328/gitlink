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
import Itembankstop from "./component/Itembankstop";
import './questioncss/questioncom.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import SingleEditor from "./component/SingleEditor";
import ChoquesEditor from "./component/ChoquesEditor"
import JudquestionEditor from "./component/JudquestionEditor";
import Bottomsubmit from "../../modules/modals/Bottomsubmit";
import { connect } from 'react-redux';
import actions from "../../redux/actions";
class Questionitem_banks extends Component {
	constructor(props) {
		super(props);
		this.contentMdRef = React.createRef();
		this.answerMdRef = React.createRef();
		this.Choques = React.createRef();
		this.Judquestio = React.createRef();
		this.state = {
			item_type: null,
			item_banksedit: [],
			myquestion_choicesco: [],
			disciplinesdata: [],
			knowledgepoints: [],
			disciplmy:[]
		}

	}

	//初始化
	componentDidMount() {
		// let {defaultActiveKey}= this.state;
		// var data={
		// 	public:defaultActiveKey
		// };
		// this.getdata(data);
		//
		// let url=`/users/get_navigation_info.json`;
		// axios.get(url, {
		//
		// }).then((response) => {
		// 	// ////////console.log("开始请求/get_navigation_info.json");
		// 	// ////////console.log(response);
		// 	if(response!=undefined){
		// 		if(response.status===200){
		// 			this.setState({
		// 				Headertop:response.data.top,
		// 				Footerdown:response.data.down
		// 			})
		// 		}
		// 	}
		// });
		const params = this.props && this.props.match && this.props.match.params;
		if (JSON.stringify(params) === "{}") {
			//新增
		} else {
			//编辑

			const url = `/item_banks/${this.props.match.params.id}/edit.json`;
			axios.get((url)).then((response) => {
				if (response === null || response === undefined) {

					return
				}
				if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

				} else {

				}
				////////console.log("item_banks");
				////console.log("Questionitem_banks");
				////console.log(response.data);

				this.setState({
					item_banksedit: response.data,
				})
			}).catch((error) => {
				////////console.log(error)

			});

		}

		// this.props.setOjInitialValue({
		// 	difficult: 1,
		// 	sub_discipline_id: '3',
		// 	tag_discipline_id: [3, 4]
		// });
		let urls = `/disciplines.json`;
		axios.get(urls, {
			params: {
				source: "question"
			}
		}).then((response) => {
			if (response) {
				this.setState({
					disciplinesdata: response.data.disciplines,
				})
				if (response.data) {
					if (response.data.disciplines) {

						const didata = response.data.disciplines;

						for (var i = 0; i < didata.length; i++) {
							const childern=[];
							//方向
							const fxdidata = didata[i].sub_disciplines;


							for (var j = 0; j < fxdidata.length; j++) {
								//课程
								const zsddata = fxdidata[j].tag_disciplines;
								childern.push(
									{
										value: fxdidata[j].id,
										label: fxdidata[j].name,
									}
								)
								for (var k = 0; k < zsddata.length; k++) {
									//知识点
									this.state.knowledgepoints.push(zsddata[k]);


								}
							}

							const datakec={
								value: didata[i].id,
								label: didata[i].name,
								children: childern,
							}
							this.state.disciplmy.push(datakec);
						}

						this.setState({
							knowledgepoints: this.state.knowledgepoints,
							disciplmy:this.state.disciplmy,
						})


					}

				}

			}
		});

	}


	getdata = (data) => {
		// const url=`/item_banks.json`;
		// axios.get((url),{params:data}).then((response) => {
		// 	if(response===null||response===undefined){
		//
		// 		return
		// 	}
		// 	if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
		//
		// 	}else{
		//
		// 	}
		// 	////////console.log("item_banks");
		// 	////////console.log(response);
		// }).catch((error) => {
		// 	////////console.log(error)
		//
		// });
	}

	getcontentMdRef = (Ref) => {
		this.contentMdRef = Ref;
	}
	getanswerMdRef = (Ref) => {
		this.answerMdRef = Ref;
	}

	getJudquestio = (Ref) => {
		this.Judquestio = Ref;
	}

	getChoquesEditor = (Ref) => {
		this.Choques = Ref;
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
		const params = this.props && this.props.match && this.props.match.params;
		var url = "";
		var boolnew = true;
		if (JSON.stringify(params) === "{}") {
			// "新增"
			url = "/item_banks.json";
			boolnew = true;
		} else {
			url = `/item_banks/${params.id}.json`;
			boolnew = false;
			// "编辑"
		}

			if (this.contentMdRef.Getdatas().length === 0) {
				this.scrollToAnchor("Itembankstopid");
				return;
			}

			var Getdatasdata=this.contentMdRef.Getdatas();
			if (this.state.item_type === null) {
				return
			}


		if (this.state.item_type === "SINGLE") {
			if (this.answerMdRef != null) {
				//单选题
				// ////console.log(this.answerMdRef.onSave());

				if (this.answerMdRef.onSave().length === 0) {
					return;
				}
				var anserdata = this.answerMdRef.onSave();
				const choices = [];
				// 1: [3]
				// 2: (4) ["1", "2", "3", "4"]
				for (var k = 0; k < anserdata[2].length; k++) {
					const choicesdata = {
						choice_text: anserdata[2][k],
						is_answer: anserdata[1][0] === (k + 1) ? 1 : 0,
					}
					choices.push(choicesdata);
				}


				// repertoire_id:1,
				//  sub_repertoire_id:1,
				//  tag_repertoire_id:[1,3],
				var myrbkc=[];
				var Getdatasdatas=Getdatasdata[2].rbzsd;
				for(let myda of Getdatasdatas) {
					myrbkc.push(myda.id);
				}
				var data = {
					discipline_id: Getdatasdata[3].rbkc[0],
					sub_discipline_id:   Getdatasdata[3].rbkc[1],
					tag_discipline_id: myrbkc,
					name: anserdata[0],
					item_type: Getdatasdata[1].rbtx,
					difficulty:Getdatasdata[0].rbnd,
					analysis: anserdata[3],
					choices: choices,

				};

				if (boolnew === true) {

					axios.post(url, data)
						.then((result) => {
							if (result.data.status == 0) {
								// this.props.showNotification(`新增单选题成功`);
								this.props.history.replace('/question');

							}
						}).catch((error) => {
						////console.log(error);
					})
				} else {
					axios.put(url, data)
						.then((result) => {
							if (result.data.status == 0) {
								// this.props.showNotification(`编辑单选题成功`);
								this.props.history.replace('/question');


							}
						}).catch((error) => {
						////console.log(error);
					})
				}


			}


		}
		if (this.state.item_type === "MULTIPLE") {
			if (this.Choques != null) {
				//多选题
				// ////console.log(this.Choques.onSave());
				if (this.Choques.onSave().length === 0) {
					return;
				}
				var anserdata = this.Choques.onSave();
				const choices = [];
				// 1: [3]
				// 2: (4) ["1", "2", "3", "4"]
				////console.log("MULTIPLE");
				////console.log(anserdata);
				for (var k = 0; k < anserdata[2].length; k++) {

					var bool = false
					for (var y = 0; y < anserdata[1].length; y++) {
						if (anserdata[1][y] === (k + 1)) {
							bool = true
						}
					}

					const choicesdata = {
						choice_text: anserdata[2][k],
						is_answer: bool === true ? 1 : 0,
					}
					choices.push(choicesdata);
				}


				var myrbkc=[];
				var Getdatasdatas=Getdatasdata[2].rbzsd;
				for(let myda of Getdatasdatas) {
					myrbkc.push(myda.id);
				}
				var data = {
					discipline_id: Getdatasdata[3].rbkc[0],
					sub_discipline_id:   Getdatasdata[3].rbkc[1],
					tag_discipline_id: myrbkc,
					name: anserdata[0],
					item_type: Getdatasdata[1].rbtx,
					difficulty:Getdatasdata[0].rbnd,
					analysis: anserdata[3],
					choices: choices,

				};


				if (boolnew === true) {
					axios.post(url, data)
						.then((result) => {
							if (result.data.status == 0) {
								// this.props.showNotification(`新增多选题成功`);
								this.props.history.replace('/question');


							}
						}).catch((error) => {
						////console.log(error);
					})

				} else {
					axios.put(url, data)
						.then((result) => {
							if (result.data.status == 0) {
								// this.props.showNotification(`编辑多选题成功`);
								this.props.history.replace('/question');


							}
						}).catch((error) => {
						////console.log(error);
					})
				}


			}

		}
		if (this.state.item_type === "JUDGMENT") {
			if (this.Judquestio != null) {
				//判断题
				// ////console.log(this.Judquestio.onSave());
				if (this.Judquestio.onSave().length === 0) {
					return;
				}
				var anserdata = this.Judquestio.onSave();
				const choices = [];
				const choicesdata = {
					choice_text: "正确",
					is_answer: anserdata[1] === "0" ? 1 : 0,
				}
				choices.push(choicesdata);

				const choicesdatas = {
					choice_text: "错误",
					is_answer: anserdata[1] === "1" ? 1 : 0,
				}
				choices.push(choicesdatas);
				var myrbkc=[];
				var Getdatasdatas=Getdatasdata[2].rbzsd;
				for(let myda of Getdatasdatas) {
					myrbkc.push(myda.id);
				}
				var data = {
					discipline_id: Getdatasdata[3].rbkc[0],
					sub_discipline_id:   Getdatasdata[3].rbkc[1],
					tag_discipline_id: myrbkc,
					name: anserdata[0],
					item_type: Getdatasdata[1].rbtx,
					difficulty:Getdatasdata[0].rbnd,
					analysis: anserdata[2],
					choices: choices,

				};
				if (boolnew === true) {
					axios.post(url, data)
						.then((result) => {
							if (result.data.status == 0) {
								// this.props.showNotification(`新增判断题成功`);
								this.props.history.replace('/question');

							}
						}).catch((error) => {
						////console.log(error);
					})

				} else {
					axios.put(url, data)
						.then((result) => {
							if (result.data.status == 0) {
								// this.props.showNotification(`编辑判断题成功`);
								this.props.history.replace('/question');

							}
						}).catch((error) => {
						////console.log(error);
					})
				}


			}

		}
		if (this.state.item_type === "PROGRAM") {
			//编程题 跳转到 oj 中创建
			var myrbkc=[];
			var Getdatasdatas=Getdatasdata[2].rbzsd;
			for(let myda of Getdatasdatas) {
				myrbkc.push(myda.id);
			}

			this.props.setOjInitialValue({
				difficult: Getdatasdata[0].rbnd,
				sub_discipline_id: Getdatasdata[3].rbkc[1],
				tag_discipline_id: myrbkc,
			});
			this.props.history.replace('/problems/new');
		}


	}


	setitem_type = (item_type) => {
		this.setState({
			item_type: item_type
		})
		this.scrollToAnchor("Itembankstopid");
	}

	render() {
		let {page, limit, count, Headertop, visible, placement, modalsType, item_type} = this.state;
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
					<div className="w1200mss">
						<div className="w100s mt30">
							<Breadcrumb separator=">">
								<Breadcrumb.Item href="/question">试题库</Breadcrumb.Item>
								<Breadcrumb.Item>{JSON.stringify(params) === "{}" ? "新增" : "编辑"}试题</Breadcrumb.Item>
							</Breadcrumb>
						</div>

						{/*题目头部操作*/}
						<Itembankstop
							{...this.state}
							{...this.props}
							getcontentMdRef={(ref) => this.getcontentMdRef(ref)}
							setitem_type={(item) => this.setitem_type(item)}
						>

						</Itembankstop>
						<div >
						{
							item_type && item_type === "SINGLE" ?

								<div className=" clearfix  educontent  w100s w1200fpx mt19">
									<SingleEditor
										{...this.state}
										{...this.props}
										getanswerMdRef={(ref) => this.getanswerMdRef(ref)}
									>

									</SingleEditor>
								</div>
								: item_type && item_type === "MULTIPLE" ?
								<div className=" clearfix  educontent  w100s w1200fpx mt19">
									<ChoquesEditor
										{...this.state}
										{...this.props}
										getanswerMdRef={(ref) => this.getChoquesEditor(ref)}
									>

									</ChoquesEditor>
								</div>

								: item_type && item_type === "JUDGMENT" ?

									<div className=" clearfix  educontent  w100s w1200fpx mt19">
										<JudquestionEditor
											{...this.state}
											{...this.props}
											item_banksedit={this.state.item_banksedit}
											getanswerMdRef={(ref) => this.getJudquestio(ref)}
										>

										</JudquestionEditor>
									</div>


									: item_type && item_type === "PROGRAM" ?
										""
										: ""
					   	}
 						</div>
					</div>


				</div>
				{
					item_type === null ?
						""
						:
						<Bottomsubmit {...this.props} {...this.state} bottomvalue={item_type === "PROGRAM" ? "创建" : "保存"}
													onSubmits={() => this.preservation()} url={item_type === "PROGRAM" ?'/problems':'/question'}></Bottomsubmit>
				}
			</div>
		)

	}


}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
	setOjInitialValue: (params) => dispatch(actions.setOjInitialValue(params))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SnackbarHOC()(TPMIndexHOC(Questionitem_banks)));


