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
import './testioncss/testioncss.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import Bottomsubmit from "../../modules/modals/Bottomsubmit";
import Intelligentcomponents from "../question/comthetestpaper/Intelligentcomponents";

//试卷编辑
class Intecomponents extends Component {
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
			single_question_count:0,
			multiple_question_count:0,
			judgement_question_count:0,
			program_question_count:0,
		}


	}

	getJudquestio = (Ref) => {
		//console.log("子组件对象");
		//console.log(Ref);
		this.Judquestio = Ref;
	}

	//初始化
	componentDidMount() {
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
	//难度
 getdatas=()=>{
	 if (this.Judquestio.Getdatas().length === 0) {
		 this.scrollToAnchor("Itembankstopid");
		 return false;
	 }
	 //console.log(this.Judquestio.Getdatas());
	 var myrbkc=[];
	 var Getdatasdatas=this.Judquestio.Getdatas()[1].rbzsd;
	 for(let myda of Getdatasdatas) {
		 myrbkc.push(myda.id);
	 }
	 const url="/examination_intelligent_settings/optinal_items.json";
    var data={
			sub_discipline_id:this.Judquestio.Getdatas()[2].rbkc[1],
			tag_discipline_id:myrbkc,
	    source:this.Judquestio.Getdatas()[7].rbly,
			difficulty:this.Judquestio.Getdatas()[0].rbnd,
		}

	 this.getwangluodata(url,data);

	}
	//课程
	getdatasss=(kech)=>{
		if (this.Judquestio.Getdatas().length === 0) {
			this.scrollToAnchor("Itembankstopid");
			return false;
		}
		//console.log(this.Judquestio.Getdatas());
		var myrbkc=[];
		var Getdatasdatas=this.Judquestio.Getdatas()[1].rbzsd;
		for(let myda of Getdatasdatas) {
			myrbkc.push(myda.id);
		}
		const url="/examination_intelligent_settings/optinal_items.json";
		var data={
			sub_discipline_id:kech,
			tag_discipline_id:myrbkc,
			source:this.Judquestio.Getdatas()[7].rbly,
			difficulty:this.Judquestio.Getdatas()[0].rbnd,
		}

    this.getwangluodata(url,data);

	}
	//知识点
	getdatassss=(zhishidian)=>{
		if (this.Judquestio.Getdatas().length === 0) {
			this.scrollToAnchor("Itembankstopid");
			return false;
		}
		//console.log(this.Judquestio.Getdatas());
		var myrbkc=[];
		var Getdatasdatas=zhishidian;
		for(let myda of Getdatasdatas) {
			myrbkc.push(myda.id);
		}
		const url="/examination_intelligent_settings/optinal_items.json";
		var data={
			sub_discipline_id:this.Judquestio.Getdatas()[2].rbkc[1],
			tag_discipline_id:myrbkc,
			source:this.Judquestio.Getdatas()[7].rbly,
			difficulty:this.Judquestio.Getdatas()[0].rbnd,
		}
		this.getwangluodata(url,data);
	}

	//来源
	getdatassssy=(rbly)=>{
		if (this.Judquestio.Getdatas().length === 0) {
			this.scrollToAnchor("Itembankstopid");
			return false;
		}
		//console.log(this.Judquestio.Getdatas());
		var myrbkc=[];
		var Getdatasdatas=this.Judquestio.Getdatas()[1].rbzsd;
		for(let myda of Getdatasdatas) {
			myrbkc.push(myda.id);
		}
		const url="/examination_intelligent_settings/optinal_items.json";
		var data={
			sub_discipline_id:this.Judquestio.Getdatas()[2].rbkc[1],
			tag_discipline_id:myrbkc,
			source:rbly,
			difficulty:this.Judquestio.Getdatas()[0].rbnd,
		}
		this.getwangluodata(url,data);
	}


	getwangluodata=(url,data)=>{
		axios.post(url,data).then((response) => {
			if (response) {
				//console.log("智能组卷");
				//console.log(response);
				if(response.data){
					this.setState({
						single_question_count:response.data.single_question_count,
						multiple_question_count:response.data.multiple_question_count,
						judgement_question_count:response.data.judgement_question_count,
						program_question_count:response.data.program_question_count,
					})

				}

			}
		});
	}
	//难度
	getdatass=(nandu)=>{
		if (this.Judquestio.Getdatas().length === 0) {
			this.scrollToAnchor("Itembankstopid");
			return false;
		}
		//console.log(this.Judquestio.Getdatas());
		var myrbkc=[];
		var Getdatasdatas=this.Judquestio.Getdatas()[1].rbzsd;
		for(let myda of Getdatasdatas) {
			myrbkc.push(myda.id);
		}
		const url="/examination_intelligent_settings/optinal_items.json";
		var data={
			sub_discipline_id:this.Judquestio.Getdatas()[2].rbkc[1],
			tag_discipline_id:myrbkc,
			source:this.Judquestio.Getdatas()[7].rbly,
			difficulty:nandu,
		}

		axios.post(url,data).then((response) => {
			if (response) {
				//console.log("智能组卷");
				//console.log(response);
				if(response.data){
					this.setState({
						single_question_count:response.data.single_question_count,
						multiple_question_count:response.data.multiple_question_count,
						judgement_question_count:response.data.judgement_question_count,
						program_question_count:response.data.program_question_count,
					})

				}

			}
		});

	}


	componentDidUpdate(prevProps) {

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
		if (this.Judquestio.Getdatas().length === 0) {
			this.scrollToAnchor("Itembankstopid");
			return;
		}
		var myrbkc=[];
		var Getdatasdatas=this.Judquestio.Getdatas()[1].rbzsd;
		for(let myda of Getdatasdatas) {
			myrbkc.push(myda.id);
		}
		// //console.log(myrbkc);
		// //console.log("preservation");
		// //console.log(this.Judquestio.Getdatas());


		var question_settings =[
			{
				"item_type": "SINGLE",
				"count": this.Judquestio.Getdatas()[3].rbdxt
			},
			{
				"item_type": "MULTIPLE",
				"count": this.Judquestio.Getdatas()[4].rbdxtx
			},
			{
				"item_type": "JUDGMENT",
				"count": this.Judquestio.Getdatas()[5].rbpdt
			},
			{
				"item_type": "PROGRAM",
				"count": this.Judquestio.Getdatas()[6].rbbct
			}
		]


    const url="/examination_intelligent_settings.json"
		var data = {
			discipline_id: this.Judquestio.Getdatas()[2].rbkc[0],
			sub_discipline_id:this.Judquestio.Getdatas()[2].rbkc[1],
			tag_discipline_id:myrbkc,
		  source:this.Judquestio.Getdatas()[7].rbly,
			difficulty:this.Judquestio.Getdatas()[0].rbnd,
			question_settings:question_settings,
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					//console.log("组卷成功");
					this.props.history.push(`/Integeneration/Intelligence/${result.data.exam_setting_id}`);
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

	setnewmyshixunmodelbool=()=>{

	}

	render() {
		let {paperlibrartdata,newmyshixunmodelbool,single_question_count,multiple_question_count,judgement_question_count,program_question_count} = this.state;
		const params = this.props && this.props.match && this.props.match.params;
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
								<Breadcrumb.Item href="/paperlibrary">试题库</Breadcrumb.Item>
								<Breadcrumb.Item className={"shubiao"}>智能组卷</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<Intelligentcomponents {...this.state} {...this.props}
																	 single_question_count={this.state.single_question_count}
																	 multiple_question_count={this.state.multiple_question_count}
																	 judgement_question_count={this.state.judgement_question_count}
																	 program_question_count={this.state.program_question_count}
																	 getdatas={()=>this.getdatas()}
																	 getdatass={(nd)=>this.getdatass(nd)}
															     getJudquestio={(ref) => this.getJudquestio(ref)}
																	 getdatasss={(e)=>this.getdatasss(e)}
																	 getdatassss={(e)=>this.getdatassss(e)}
																	 getdatassssy={(e)=>this.getdatassssy(e)}
						></Intelligentcomponents>




					</div>


				</div>
				{
					newmyshixunmodelbool === true ? "" :
						<Bottomsubmit {...this.props} {...this.state} bottomvalue={"保存"}
													Cohetepaperbool={false}
													setCohetepaperbool={(bool) => this.setCohetepaperbool(bool)}
													onSubmits={() => this.preservation()} url={'/paperlibrary'}></Bottomsubmit>
				}
			</div>
		)

	}


}

export default SnackbarHOC()(TPMIndexHOC(Intecomponents));


