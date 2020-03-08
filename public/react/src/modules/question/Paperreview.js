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
import NoneData from './component/NoneData';
import './questioncss/questioncom.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import Choicequestion from './component/Choicequestion';
import SingleEditor from "./component/SingleEditor";
import ChoquesEditor from "./component/ChoquesEditor"
import JudquestionEditor from "./component/JudquestionEditor";
import Paperreview_item from "./Paperreview_item"
import Bottomsubmit from "../../modules/modals/Bottomsubmit";
import Comthetestpaperst from "./comthetestpaper/Comthetestpaperst";
import NewMyShixunModel from "../question/NewMyShixunModel";
import IntelligentModel from "../question/component/IntelligentModel"
//人工组卷预览
class Paperreview extends Component {
	constructor(props) {
		super(props);
		this.contentMdRef = React.createRef();
		this.state = {
			item_type: null,
			item_banksedit: [],
			myquestion_choicesco: [],
			disciplinesdata: [],
			knowledgepoints: [],
			disciplmy: [],
			single_questions:null,
			multiple_questions:null,
			judgement_questions:null,
			program_questions:null,
			all_score:0,
			all_questions_count:0,
			Cohetepaperbool:false,
			discipline_id:null,
			sub_discipline_id:null,
			tag_discipline_id:null,
			difficulty:null,
			name:null,
			duration:null,
			newmyshixunmodelbool:false,
			artificialtype:"artificial",
			Intelligentformation:false,

		}
		// single_questions:null, 单选题
		// 	multiple_questions:null, 多选题
		// 	judgement_questions:null, 判断题
		// 	program_questions:null, 编程题
		// 	all_score:0,  所有分数
		// 	all_questions_count:0 所有问题数

	}

	//初始化
	componentDidMount() {
		//console.log("Paperreview.js");
		//console.log(this.props.match.params);
		this.setState({
			artificialtype:this.props.match.params.type
		})
			var data = {};
			this.getdata(data);
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

		if(this.props.match.params.type==="artificial"){
			//人工组卷


		}else{
			//智能组卷
			//
			data = {
				exam_setting_id:this.props.match.params.id
			}
		}
		const url = `/item_baskets.json`;
		this.setState({
			booljupyterurls: true,
		})
		axios.get((url), {params: data}).then((response) => {
			if(response===undefined|| response===null){
				return;
			}
			setTimeout(() => {
				this.setState({
					booljupyterurls: false,
				})
			}, 1000);
			if (response === null || response === undefined) {

				return
			}
			if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

			} else {

			}
			try {
				this.setState({
					Contentdata: response.data,
					single_questions:response.data.single_questions.questions_count===0? null:response.data.single_questions,
					multiple_questions:response.data.multiple_questions.questions_count===0? null:response.data.multiple_questions,
					judgement_questions:response.data.judgement_questions.questions_count===0? null:response.data.judgement_questions,
					program_questions:response.data.program_questions.questions_count===0? null:response.data.program_questions,
					all_score:response.data.all_score,
					all_questions_count:response.data.all_questions_count,
				})
			}catch (e) {

			}

		}).catch((error) => {
			//////console.log(error)
			this.setState({
				booljupyterurls: false,
			})
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
		  if(this.state.artificialtype==="artificial"){
				if(this.state.Cohetepaperbool===true){
					if (this.contentMdRef.Getdatas().length === 0) {
						this.scrollToAnchor("Itembankstopid");
						return;
					}
					var myrbkc=[];
					var Getdatasdatas=this.contentMdRef.Getdatas()[2].rbzsd;
					for(let myda of Getdatasdatas) {
						myrbkc.push(myda.id);
					}
					const url = `/examination_banks.json`;
					var data={
						difficulty:this.contentMdRef.Getdatas()[0].rbnd,
						name:this.contentMdRef.Getdatas()[4].classroom,
						duration:this.contentMdRef.Getdatas()[5].kssc,
						discipline_id: this.contentMdRef.Getdatas()[3].rbkc[0],
						sub_discipline_id: this.contentMdRef.Getdatas()[3].rbkc[1],
						tag_discipline_id: myrbkc,
					}
					axios.post(url, data)
						.then((result) => {
							if (result.data.status === 0) {
								// this.props.showNotification(`组卷成功`);
								this.props.history.replace('/paperlibrary');
							}
						}).catch((error) => {
						//console.log(error);
					})

				}else{
					this.setCohetepaperbool(true);

				}

			}else{
				//智能组卷
        this.setIntelligentformation(true);

			}





	}


	setitem_type = (item_type) => {


	}

	setCohetepaperbool =(bool)=>{
		 this.setState({
			 Cohetepaperbool:bool
		 })
	}
	getcontentMdRef = (Ref) => {
		this.contentMdRef = Ref;
	}

	setnewmyshixunmodelbool=(bool)=>{
			//人工组卷
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
			var data = {}
			this.getdata(data);




	}

	//换题型
	Replacementtype=(value)=>{
		var item_types="";
		if(value==="单选题"){
			item_types="SINGLE";
		}
		else if(value==="多选题"){
			item_types="MULTIPLE";

		}
		else if(value==="判断题"){
			item_types="JUDGMENT";

		}
		else if(value==="编程题"){
			item_types="PROGRAM";

		}
		const url=`/examination_intelligent_settings/${this.props.match.params.id}/exchange_items.json`;
     let data={
			 item_type:item_types,
		 }
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					//console.log(result);
					var data = {}
					this.getdata(data);
				}
			}).catch((error) => {
			//console.log(error);
		})
	}
	//换题
	Changingtopics=(id)=>{
		const url=`/examination_intelligent_settings/${this.props.match.params.id}/exchange_one_item.json`;
		let data={
			item_id:id,
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					//console.log(result);
					var data = {}
					this.getdata(data);
				}
			}).catch((error) => {
			//console.log(error);
		})
	}

	setIntelligentformation=(bool)=>{
		this.setState({
			Intelligentformation:bool
		})
	}
	Confirmationofvolumeformations=()=>{
		this.setState({
			Intelligentformation:false
		})

	}
	render() {
		let {page, limit, count, Headertop, visible, placement, modalsType, item_type,artificialtype,Cohetepaperbool,newmyshixunmodelbool,Intelligentformation} = this.state;
		const params = this.props && this.props.match && this.props.match.params;
		// ////console.log(params);
		return (
			<div>
				<div id={"Itembankstopid"} className="newMain clearfix intermediatecenter "
				>
					{
						Intelligentformation===true?
							<IntelligentModel  getdata={(data)=>this.getdata(data)}  {...this.state} {...this.props} exam_id={this.props.match.params.id} Confirmationofvolumeformations={()=>this.Confirmationofvolumeformations()}></IntelligentModel>
							:""
					}
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
								<NewMyShixunModel {...this.props} {...this.state} exam_id={this.props.match.params.id} 	setnewmyshixunmodelbool={(e)=>this.setnewmyshixunmodelbool(e)}></NewMyShixunModel>
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
							{
								Cohetepaperbool===false?
									artificialtype==="artificial"?
										<Breadcrumb separator=">">
											<Breadcrumb.Item href="/question">试题库</Breadcrumb.Item>
											<Breadcrumb.Item className={"xiaoshou"}>人工组卷</Breadcrumb.Item>
											<Breadcrumb.Item className={"xiaoshout"}>试卷预览</Breadcrumb.Item>
										</Breadcrumb>
										:
										<Breadcrumb separator=">">
											<Breadcrumb.Item href="/paperlibrary">试卷库</Breadcrumb.Item>
											<Breadcrumb.Item className={"/Integeneration"}>智能组卷</Breadcrumb.Item>
											<Breadcrumb.Item className={"xiaoshout"}>试卷预览</Breadcrumb.Item>
										</Breadcrumb>
									:
									<Breadcrumb separator=">">
										<Breadcrumb.Item href="/question">试题库</Breadcrumb.Item>
										<Breadcrumb.Item className={"xiaoshou"}>新增试卷</Breadcrumb.Item>
									</Breadcrumb>
							}

						</div>

						{
							Cohetepaperbool===false?
								<Paperreview_item {...this.state} {...this.props} Changingtopics={(e)=>this.Changingtopics(e)} Replacementtype={(e)=>this.Replacementtype(e)} getdata={(data)=>this.getdata(data)} setnewmyshixunmodelbool={(e)=>this.setnewmyshixunmodelbool(e)}>

								</Paperreview_item>
								:
								<Comthetestpaperst {...this.state} {...this.props}
																	 getJudquestio={(ref) => this.getcontentMdRef(ref)}
																	setitem_type={(item) => this.setitem_type(item)}

								></Comthetestpaperst>
						}





					</div>


				</div>

				<Bottomsubmit {...this.props} {...this.state} bottomvalue={Cohetepaperbool===false?"保存组卷":"完成"}
											setCohetepaperbool={(bool)=>this.setCohetepaperbool(bool)}
											onSubmits={() => this.preservation()} url={'/question'}></Bottomsubmit>
			</div>
		)

	}


}

export default SnackbarHOC()(TPMIndexHOC(Paperreview));


