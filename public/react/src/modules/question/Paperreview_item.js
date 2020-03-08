import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, getImageUrl} from 'educoder';
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
import Itembankstop from "./component/Itembankstop";
import NoneData from './component/NoneData';
import './questioncss/questioncom.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import Paperreview_single from './Paperreview_single';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import PaperDeletModel from './component/PaperDeletModel';
import PaperDeletModels from './component/PaperDeletModels';
import Paperreview_itemModel from './component/Paperreview_itemModel';
import Paperreview_itemModels from './component/Paperreview_itemModels';
import Paperreview_items from './Paperreview_items';


const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

class Paperreview_item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: 0,
			totalscore: 0,
			total: 0,
			modalsTypedel: false,
			modalsTypey: false,
			modalsTypeys: false,
			modalsTypedels: false,
			titilesm: "",
			titilesms: "",
			singlebool: false,
			multiplebool: false,
			judgmentbool: false,
			programbool: false,
			paperreviewsingleindex: "无",
			set_scoreid:null,
			item_bank_id:null
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
	onDragEnd = (result) => {

		const ids = this.props.single_questions.questions[result.source.index].id;
		const positions = this.props.single_questions.questions[result.destination.index].position;

		const url = `/item_baskets/${ids}/adjust_position.json`
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata({});
				}
			}).catch((error) => {
			//console.log(error);
		})
	}

	onDragEnds = (result) => {

		const ids = this.props.multiple_questions.questions[result.source.index].id;
		const positions = this.props.multiple_questions.questions[result.destination.index].position;
		const url = `/item_baskets/${ids}/adjust_position.json`
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata({});
				}
			}).catch((error) => {
			//console.log(error);
		})


	}


	onDragEndss = (result) => {
		const ids = this.props.judgement_questions.questions[result.source.index].id;
		const positions = this.props.judgement_questions.questions[result.destination.index].position;
		const url = `/item_baskets/${ids}/adjust_position.json`
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata({});
				}
			}).catch((error) => {
			//console.log(error);
		})

	}

	onDragEndsss = (result) => {

		const ids = this.props.program_questions.questions[result.source.index].id;
		const positions = this.props.program_questions.questions[result.destination.index].position;
		const url = `/item_baskets/${ids}/adjust_position.json`
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata({});
				}
			}).catch((error) => {
			//console.log(error);
		})

	}
	Singlemagazine = (name, bool) => {
		if (bool === true) {
			this.setState({
				modalsTypey: true,
				titilesm: name
			})
		} else {
			this.setState({
				modalsTypey: false,
				titilesm: ""
			})
		}


	}

	setDownloady = (fenshu) => {
		const url = "/item_baskets/batch_set_score.json";
		var data = {
			score: fenshu,
			item_type: this.state.titilesm === "单选题" ? "SINGLE" : this.state.titilesm === "多选题" ? "MULTIPLE" : this.state.titilesm === "判断题" ? "JUDGMENT" : this.state.titilesm === "编程题" ? "PROGRAM" : '',

		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`调分成功`);
					this.props.getdata({});
					this.Singlemagazine("", false);
				}
			}).catch((error) => {
			//console.log(error);
		})
	}

	setDownloadys=(value)=>{
		const url = `/item_baskets/${this.state.set_scoreid}/set_score.json`;
		var data = {
			score: value,
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`调分成功`);
					this.props.getdata({});
					this.Singlemagazines(false);
				}
			}).catch((error) => {
			//console.log(error);
		})
	}

	Singlemagazines=(bool,id,name)=>{
		if(bool===true){
			  this.setState({
					set_scoreid:id,
					modalsTypeys:bool,
					titilesm: name
				})
		}else{
			this.setState({
				modalsTypeys:bool,
				set_scoreid:null,
				titilesm: null
			})
		}


	}
	setmodalsTypedel = (bool, type, names) => {
		if (type === 1) {
			this.setState({
				modalsTypedel: bool,
				titilesms: names
			})
		} else {
			this.setState({
				modalsTypedel: bool,
				titilesms: names
			})
			const url = `/item_baskets/delete_item_type.json`;
			axios.delete((url), {
					data: {
						item_type: names
					}
				})
				.then((response) => {
					if (response.data.status == 0) {
						// this.props.showNotification('大题删除成功');
						this.props.getdata({});
						this.setState({
							titilesms: ""
						})
					}
				})
				.catch(function (error) {
					////console.log(error);
				});



		}

	}

	setmodalsTypedels = (bool, type) => {
		if (type === 1) {
			this.setState({
				modalsTypedels: bool,
			})
		}else {
			//确定
			const url = `/item_baskets/${this.state.item_bank_id}.json`;
			axios.delete((url))
				.then((response) => {
					if (response.data.status == 0) {
						// this.props.showNotification('试题删除成功');
						this.props.getdata({});
					}
				})
				.catch(function (error) {

				});

			this.setState({
				modalsTypedels: bool,
			})
		}

	}

	showsetmodalsTypedels=(id,bool,type)=>{
		debugger
		this.setState({
			item_bank_id:id,
		})
		this.setmodalsTypedels(bool,type);
	}

	hideparagraph = (name) => {
		//console.log("hideparagraph");

	}

	hideparagraphs = () => {
		this.setState({
			singlebool: false,
			multiplebool: false,
			judgmentbool: false,
			programbool: false,
		})
	}
	showparagraph = (name) => {
		//console.log("showparagraph");
		if (name === "SINGLE") {
			this.setState({
				singlebool: true,
				multiplebool: false,
				judgmentbool: false,
				programbool: false,
				paperreviewsingleindex:"无",
				paperreviewsinglename:"",

			})

		} else if (name === "MULTIPLE") {
			this.setState({
				singlebool: false,
				multiplebool: true,
				judgmentbool: false,
				programbool: false,
				paperreviewsingleindex:"无",
				paperreviewsinglename:"",


			})
		} else if (name === "JUDGMENT") {
			this.setState({
				singlebool: false,
				multiplebool: false,
				judgmentbool: true,
				programbool: false,
				paperreviewsingleindex:"无",
				paperreviewsinglename:"",

			})
		} else if (name === "PROGRAM") {
			this.setState({
				singlebool: false,
				multiplebool: false,
				judgmentbool: false,
				programbool: true,
				paperreviewsingleindex:"无",
				paperreviewsinglename:"",

			})

		}
	}

	jixuxuantioncli = () => {
		this.props.history.replace("/question");
	}

	showparagraphs = (e,name) => {
		// //console.log("showparagraphs");
		// //console.log(e);
		this.setState({
			paperreviewsingleindex: e,
			paperreviewsinglename:name,
			singlebool: false,
			multiplebool: false,
			judgmentbool: false,
			programbool: false,
		})
	}

	Setscore=(id)=>{


	}



	render() {
		let {
			questions, totalscore, total, modalsTypedel, modalsTypey, modalsTypedels,
			singlebool,
			multiplebool,
			judgmentbool,
			programbool,
			paperreviewsingleindex,
			modalsTypeys
		} = this.state;
		let {single_questions, multiple_questions, judgement_questions, program_questions, all_score} = this.props;
		return (
			<div className=" clearfix  educontent Contentquestionbankstyle w100s w1200wuh mt19">
				{
					modalsTypedel === true ?
						<PaperDeletModel {...this.state} {...this.props}
														 setmodalsTypedel={(bool, type, name) => this.setmodalsTypedel(bool, type, name)}></PaperDeletModel>
						: ""
				}
				{
					modalsTypey === true ?
						<Paperreview_itemModel {...this.state} {...this.props} setDownloady={(fs) => this.setDownloady(fs)}
																	 Singlemagazine={(name, bool) => this.Singlemagazine(name, bool)}></Paperreview_itemModel>
						: ""
				}

				{
					modalsTypeys === true ?
						<Paperreview_itemModels {...this.state} {...this.props} setDownloadys={(value) => this.setDownloadys(value)}
																		Singlemagazines={(bool,id,name) => this.Singlemagazines(bool,id,name)}></Paperreview_itemModels>
						: ""
				}
				{
					modalsTypedels === true ?
						<PaperDeletModels {...this.state} {...this.props}
															setmodalsTypedels={(id,bool, type) => this.setmodalsTypedels(id,bool, type)}></PaperDeletModels>
						: ""
				}
				<div className="w100s mt20 mb20 backgroudwhites" style={{
					position: "relative",
				}}>
					<div className="w100s sortinxdirection">
						<div className="w70s sortinxdirection">
							<p className="questionstishu lh34">题数：{this.props.all_questions_count}</p>
							<p className="ml58 questionstotal lh34">总分：{this.props.all_score}</p>
						</div>
						<div className="w30s xaxisreverseorder">
							{
								this.props.match.params.type==="artificial"?
									<div className="jixuxuanti xiaoshou" onClick={() => this.props.setnewmyshixunmodelbool(true)}>
										继续选题
									</div>
								:
							""
							}

						</div>
					</div>
					<div className="questiontypeheng w100s mt19 mb19"></div>
					<div className="w100s sortinxdirection">
						<div className="pagertdstcolor w50s sortinxdirection">拖动试题可调整排序</div>


					</div>

					{/*单选题*/}
					{
						single_questions && single_questions ?
							<div className="backgroudwhites" style={{
								position: "relative",
							}}>

								<div className="w100s mt20 mb20 postitonrelati">
									<div
										className={singlebool === true ? "w100s sortinxdirection borderwdswuhques intermediatecenterysls" : "w100s sortinxdirection  intermediatecenterysls"}
										onMouseEnter={() => this.showparagraph("SINGLE")} onMouseLeave={() => this.hideparagraph("SINGLE")}>
										<p className={singlebool === true ? "ml18 yldxtit" : "yldxtit"}>一、单选题</p> <p
										className="ml15 yldxtits">（共{single_questions && single_questions.questions_count}题；共{single_questions && single_questions.questions_score}分）</p>
									</div>
									{
										singlebool === true ?
											<div className="postitonrelatiss xaxisreverseorder">
												<div className="scd xiaoshou" onClick={() => this.setmodalsTypedel(true, 1, "SINGLE")}>删除</div>
												{
													this.props.match.params.type==="Intelligence"?
														<div className="szdfds xiaoshou" onClick={() => this.props.Replacementtype("单选题")}>换题型</div>
														:
														""
												}
												<div className="szdfd xiaoshou" onClick={() => this.Singlemagazine("单选题", true)}>批量设置得分</div>
											</div> : ""
									}
									<DragDropContext onDragEnd={this.onDragEnd}>
										<Droppable droppableId={"0"}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
													className={""}
													onScroll={this.contentViewScrolledit}
												>
													{
														single_questions && single_questions.questions.map((object, index) => {
															return (
																<Draggable
																	key={object.id}
																	draggableId={object.id}
																	index={index}
																	className={""}
																>
																	{(provided, snapshot) => (
																		<div
																			key={index}
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>

																	   <Paperreview_items
																			 {...this.state}
																			 {...this.props}
																			 Changingtopics={(e)=>this.props.Changingtopics(e)}
																			 key={index}
																			 paperreviewsingleindex={this.state.paperreviewsingleindex}
																			 paperreviewsinglename={this.state.paperreviewsinglename}
																			 indexs={index}
																			 typenames={"SINGLE"}
																			 typenamesn={"单选题"}
																			 showsetmodalsTypedels={(id,bool,type)=>this.showsetmodalsTypedels(id,bool,type)}
																			 Singlemagazines={(bool,id,name)=>this.Singlemagazines(bool,id,name)}
																			 showparagraphs={(e,name) => this.showparagraphs(e,name)}
																			 object={object}
																			 hideparagraphs={() => this.hideparagraphs()}
																		 >

																		 </Paperreview_items>


																		</div>
																	)}
																</Draggable>
															)
														})

													}
												</div>
											)}
										</Droppable>
									</DragDropContext>


								</div>
							</div>

							: ""
					}


					{
						multiple_questions && multiple_questions ?
							<div className="backgroudwhites" style={{
								position: "relative",
							}}>
								<div className="h20 lh20"></div>
								<div className="w100s  mb20 postitonrelati">
									<div
										className={multiplebool === true ? "w100s sortinxdirection  mt10 borderwdswuhques intermediatecenterysls" : "w100s sortinxdirection  intermediatecenterysls"}
										onMouseEnter={() => this.showparagraph("MULTIPLE")}
										onMouseLeave={() => this.hideparagraph("MULTIPLE")}>
										<p
											className={multiplebool === true ? "ml18 yldxtit" : "yldxtit"}>{single_questions === null ? "一" : "二"}、多选题</p>
										<p
											className="ml15 yldxtits">（共{multiple_questions && multiple_questions.questions_count}题；共{multiple_questions && multiple_questions.questions_score}分）</p>
									</div>
									{
										multiplebool === true ?
											<div className="postitonrelatisss xaxisreverseorder ">
												<div className="scd xiaoshou" onClick={() => this.setmodalsTypedel(true, 1, "MULTIPLE")}>删除
												</div>
												{
													this.props.match.params.type==="Intelligence"?
														<div className="szdfds xiaoshou" onClick={() => this.props.Replacementtype("多选题")}>换题型</div>
														:
														""
												}
												<div className="szdfd xiaoshou" onClick={() => this.Singlemagazine("多选题", true)}>批量设置得分</div>
											</div>

											: ""
									}


									<DragDropContext onDragEnd={this.onDragEnds}>
										<Droppable droppableId={"0"}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
													className={""}
													onScroll={this.contentViewScrolledit}
												>
													{
														multiple_questions && multiple_questions.questions.map((object, index) => {
															return (
																<Draggable
																	key={object.id}
																	draggableId={object.id}
																	index={index}
																	className={""}
																>
																	{(provided, snapshot) => (
																		<div
																			key={index}
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>


																			<Paperreview_items
																				{...this.state}
																				{...this.props}
																				Changingtopics={(e)=>this.props.Changingtopics(e)}
																				key={index}
																				paperreviewsingleindex={this.state.paperreviewsingleindex}
																				paperreviewsinglename={this.state.paperreviewsinglename}
																				indexs={index}
																				typenames={"MULTIPLE"}
																				typenamesn={"多选题"}
																				showsetmodalsTypedels={(id,bool,type)=>this.showsetmodalsTypedels(id,bool,type)}
																				Singlemagazines={(bool,id,name)=>this.Singlemagazines(bool,id,name)}
																				showparagraphs={(e,name) => this.showparagraphs(e,name)}
																				object={object}
																				hideparagraphs={() => this.hideparagraphs()}
																			>

																			</Paperreview_items>
																		</div>
																	)}
																</Draggable>
															)
														})

													}
												</div>
											)}
										</Droppable>
									</DragDropContext>


								</div>
							</div>
							:
							""
					}

					{
						judgement_questions && judgement_questions ?
							<div className={judgmentbool === true ? "backgroudwhites " : "backgroudwhites"} style={{
								position: "relative",
							}}>
								<div className="h20 lh20"></div>
								<div className="w100s  mb20 postitonrelati">
									<div
										className={judgmentbool === true ? "w100s sortinxdirection  borderwdswuhques mt10 intermediatecenterysls " : "w100s sortinxdirection   intermediatecenterysls "}
										onMouseEnter={() => this.showparagraph("JUDGMENT")}
										onMouseLeave={() => this.hideparagraph("JUDGMENT")}>
										<p
											className={judgmentbool === true ? "ml18 yldxtit" : "yldxtit"}>{single_questions === null && multiple_questions === null ? "一" : single_questions === null && multiple_questions !== null ? "二"
											: single_questions !== null && multiple_questions === null ? "二"
												: "三"}、判断题</p> <p
										className="ml15 yldxtits">（共{judgement_questions && judgement_questions.questions_count}题；共{judgement_questions && judgement_questions.questions_score}分）</p>
									</div>
									{
										judgmentbool === true ?
											<div className="postitonrelatiss xaxisreverseorder">
												<div className="scd xiaoshou" onClick={() => this.setmodalsTypedel(true, 1, "JUDGMENT")}>删除
												</div>
												{
													this.props.match.params.type==="Intelligence"?
														<div className="szdfds xiaoshou" onClick={() => this.props.Replacementtype("判断题")}>换题型</div>
														:
														""
												}
												<div className="szdfd xiaoshou" onClick={() => this.Singlemagazine("判断题", true)}>批量设置得分</div>
											</div>
											: ""}

									<DragDropContext onDragEnd={this.onDragEndss}>
										<Droppable droppableId={"0"}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
													className={""}
													onScroll={this.contentViewScrolledit}
												>
													{
														judgement_questions && judgement_questions.questions.map((object, index) => {
															return (
																<Draggable
																	key={object.id}
																	draggableId={object.id}
																	index={index}
																	className={""}
																>
																	{(provided, snapshot) => (
																		<div
																			key={index}
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>


																			<Paperreview_items
																				{...this.state}
																				{...this.props}
																				Changingtopics={(e)=>this.props.Changingtopics(e)}
																				key={index}
																				paperreviewsingleindex={this.state.paperreviewsingleindex}
																				paperreviewsinglename={this.state.paperreviewsinglename}
																				indexs={index}
																				typenames={"JUDGMENT"}
																				typenamesn={"判断题"}
																				showsetmodalsTypedels={(id,bool,type)=>this.showsetmodalsTypedels(id,bool,type)}
																				Singlemagazines={(bool,id,name)=>this.Singlemagazines(bool,id,name)}
																				showparagraphs={(e,name) => this.showparagraphs(e,name)}
																				object={object}
																				hideparagraphs={() => this.hideparagraphs()}
																			>

																			</Paperreview_items>
																		</div>
																	)}
																</Draggable>
															)
														})

													}
												</div>
											)}
										</Droppable>
									</DragDropContext>
								</div>
							</div>
							: ""
					}


					{
						program_questions && program_questions ?
							<div className={programbool === true ? "backgroudwhites " : "backgroudwhites"} style={{
								position: "relative",
							}}>

								<div className="h20 lh20"></div>
								<div className="w100s  mb20 postitonrelati">
									<div
										className={programbool === true ? "w100s sortinxdirection mt10 borderwdswuhques intermediatecenterysls " : "w100s sortinxdirection intermediatecenterysls"}
										onMouseEnter={() => this.showparagraph("PROGRAM")}
										onMouseLeave={() => this.hideparagraph("PROGRAM")}>
										<p className={programbool === true ? "ml18 yldxtit" : "yldxtit"}>
											{single_questions === null && multiple_questions === null && program_questions === null ? "一"
												: single_questions === null && multiple_questions === null && program_questions !== null ? "二"
													: single_questions !== null && multiple_questions === null && program_questions === null ? "二"
														: single_questions === null && multiple_questions !== null && program_questions === null ? "二"
															: single_questions !== null && multiple_questions !== null && program_questions === null ? "三"
																: single_questions === null && multiple_questions !== null && program_questions !== null ? "三"
																	: single_questions !== null && multiple_questions == null && program_questions !== null ? "三" :
																		"四"}
											、编程题</p> <p
										className="ml15 yldxtits">（共{program_questions && program_questions.questions_count}题；共{program_questions && program_questions.questions_score}分）</p>
									</div>
									{
										programbool === true ?
											<div className="postitonrelatiss xaxisreverseorder">
												<div className="scd xiaoshou" onClick={() => this.setmodalsTypedel(true, 1, "PROGRAM")}>删除</div>
												{
													this.props.match.params.type==="Intelligence"?
														<div className="szdfds xiaoshou" onClick={() => this.props.Replacementtype("编程题")}>换题型</div>
														:
														""
												}
												<div className="szdfd xiaoshou" onClick={() => this.Singlemagazine("编程题", true)}>批量设置得分</div>
											</div>
											: ""
									}

									<DragDropContext onDragEnd={this.onDragEndsss}>
										<Droppable droppableId={"0"}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
													className={""}
													onScroll={this.contentViewScrolledit}
												>
													{
														program_questions && program_questions.questions.map((object, index) => {
															return (
																<Draggable
																	key={object.id}
																	draggableId={object.id}
																	index={index}
																	className={""}
																>
																	{(provided, snapshot) => (
																		<div
																			key={index}
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>


																			<Paperreview_items
																				{...this.state}
																				{...this.props}
																				Changingtopics={(e)=>this.props.Changingtopics(e)}
																				key={index}
																				paperreviewsingleindex={this.state.paperreviewsingleindex}
																				paperreviewsinglename={this.state.paperreviewsinglename}
																				indexs={index}
																				typenames={"PROGRAM"}
																				typenamesn={"编程题"}
																				showsetmodalsTypedels={(id,bool,type)=>this.showsetmodalsTypedels(id,bool,type)}
																				Singlemagazines={(bool,id,name)=>this.Singlemagazines(bool,id,name)}
																				showparagraphs={(e,name) => this.showparagraphs(e,name)}
																				object={object}
																				hideparagraphs={() => this.hideparagraphs()}
																			>
																			</Paperreview_items>
																		</div>
																	)}
																</Draggable>
															)
														})

													}
												</div>
											)}
										</Droppable>
									</DragDropContext>


								</div>
							</div>
							:
							""
					}


				</div>
			</div>
		)

	}


}

export default Paperreview_item


