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
import Seeoagertits from "./component/Seeoagertits";
import Paperlibraryseeid_item from './component/Paperlibraryseeid_item';
import Comthetestpaperst from '../question/comthetestpaper/Comthetestpaperst';
import Paperlibraryseeid_itemss from './component/Paperlibraryseeid_itemss';
import JudquestionEditor from "../question/component/JudquestionEditor";
import NewMyShixunModel from "../question/NewMyShixunModel";


//试卷编辑
class Paperlibraryeditid extends Component {
	constructor(props) {
		super(props);
		this.Judquestio = React.createRef();
		this.state = {
			paperlibrartdata: [],
			disciplinesdata: [],
			knowledgepoints: [],
			disciplmy: [],
			item_banksedit: [],
			newmyshixunmodelbool:false,
		}


	}

	getJudquestio = (Ref) => {
		//console.log("子组件对象");
		//console.log(Ref);
		this.Judquestio = Ref;
	}

	//初始化
	componentDidMount() {
		this.getdata();
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
							const childern = [];
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

							const datakec = {
								value: didata[i].id,
								label: didata[i].name,
								children: childern,
							}
							this.state.disciplmy.push(datakec);
						}

						this.setState({
							knowledgepoints: this.state.knowledgepoints,
							disciplmy: this.state.disciplmy,
						})


					}

				}

			}
		});

	}


	getdata = () => {
		let urls = `/examination_banks/${this.props.match.params.id}.json`;
		axios.get(urls).then((response) => {
			if (response) {
				this.setState({
					paperlibrartdata: response.data,
					item_banksedit: response.data.exam,
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
		if (this.Judquestio.Getdatas().length === 0) {
			this.scrollToAnchor("Itembankstopid");
			return;
		}
		var myrbkc=[];
		var Getdatasdatas=this.Judquestio.Getdatas()[2].rbzsd;
		for(let myda of Getdatasdatas) {
			myrbkc.push(myda.id);
		}
		const url = `/examination_banks/${this.props.match.params.id}.json`;
		var data={
			difficulty:this.Judquestio.Getdatas()[0].rbnd,
			name:this.Judquestio.Getdatas()[4].classroom,
			duration:this.Judquestio.Getdatas()[5].kssc,
			discipline_id: this.Judquestio.Getdatas()[3].rbkc[0],
			sub_discipline_id: this.Judquestio.Getdatas()[3].rbkc[1],
			tag_discipline_id: myrbkc,
		}
		axios.put(url, data)
			.then((result) => {
				if (result.data.status === 0) {
					// this.props.showNotification(`试卷更新成功`);
					this.props.history.push('/paperlibrary');
				}
			}).catch((error) => {
			//console.log(error);
		})

	}


	setitem_type = (item_type) => {


	}

	setCohetepaperbool = (bool) => {

	}
	getcontentMdRef = (Ref) => {
		this.contentMdRef = Ref;
	}

	setnewmyshixunmodelbool=(bool)=>{
		if(bool===true){
			let scrollToTop = window.setInterval(function() {
				let pos = window.pageYOffset;
				if ( pos > 0 ) {
					window.scrollTo( 0, pos - 20 ); // how far to scroll on each step
				} else {
					window.clearInterval( scrollToTop );
				}
			}, 2);
		}
		this.setState({
			newmyshixunmodelbool:bool
		})
		this.getdata();
	}

	render() {
		let {paperlibrartdata,newmyshixunmodelbool} = this.state;
		const params = this.props && this.props.match && this.props.match.params;
	// //console.log("newmyshixunmodelbool");
	// //console.log(newmyshixunmodelbool);
		return (
			<div>
				<div id={"Itembankstopid"} className="newMain clearfix intermediatecenter "
				>
					{
						newmyshixunmodelbool===true?
							<style>{
								`
								body{  overflow: hidden !important; }
								`
							}</style>
							:""
					}

					{
						newmyshixunmodelbool===true?
							<div className="fangdatwo">
							<NewMyShixunModel {...this.state} {...this.props} exam_id={this.props.match.params.id} 	setnewmyshixunmodelbool={(e)=>this.setnewmyshixunmodelbool(e)}></NewMyShixunModel>
							</div>
							:
							""
					}

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
								<Breadcrumb.Item className={"shubiao"}>试卷编辑</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<Comthetestpaperst {...this.state} {...this.props}
															 item_banksedit={this.state.item_banksedit}
															 getJudquestio={(ref) => this.getJudquestio(ref)}
						></Comthetestpaperst>


						<div className=" clearfix  educontent Contentquestionbankstyle w100s w1200wuh mt19">
							<style>
								{
									`
									.seeoagertitscss .jixuxuanti{
									background:#4CACFF;
									}
									`
								}
							</style>
							<div className={"seeoagertitscss"}>
							<Seeoagertits
								setnewmyshixunmodelbool={(e)=>this.setnewmyshixunmodelbool(e)}
								all_score={paperlibrartdata && paperlibrartdata.exam && paperlibrartdata.exam.all_questions_count}
								all_questions_count={paperlibrartdata && paperlibrartdata.exam && paperlibrartdata.exam.all_score}
								difficulty={paperlibrartdata && paperlibrartdata.exam && paperlibrartdata.exam.difficulty}
							>
							</Seeoagertits>
							</div>
							<Paperlibraryseeid_itemss
								{...this.state}
								{...this.props}
								getdata={() => this.getdata()}
								single_questions={paperlibrartdata && paperlibrartdata.single_questions && paperlibrartdata.single_questions.questions.length > 0 ? paperlibrartdata.single_questions : null}
								multiple_questions={paperlibrartdata && paperlibrartdata.multiple_questions
								&& paperlibrartdata.multiple_questions.questions.length > 0 ? paperlibrartdata.multiple_questions : null
								}
								judgement_questions={paperlibrartdata && paperlibrartdata.judgement_questions
								&& paperlibrartdata.judgement_questions.questions.length > 0 ? paperlibrartdata.judgement_questions : null
								}
								program_questions={paperlibrartdata && paperlibrartdata.program_questions
								&& paperlibrartdata.program_questions.questions.length > 0 ? paperlibrartdata.program_questions : null
								}
							></Paperlibraryseeid_itemss>


						</div>


					</div>


				</div>
				{
					newmyshixunmodelbool === true ? "" :
						<Bottomsubmit {...this.props} {...this.state} bottomvalue={"保存"}
													setCohetepaperbool={(bool) => this.setCohetepaperbool(bool)}
													onSubmits={() => this.preservation()} url={'/paperlibrary'}></Bottomsubmit>
				}
			</div>
		)

	}


}

export default SnackbarHOC()(TPMIndexHOC(Paperlibraryeditid));


