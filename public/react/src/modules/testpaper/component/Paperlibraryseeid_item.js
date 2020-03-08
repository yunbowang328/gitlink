import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, getImageUrl} from 'educoder';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
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
import '../testioncss/testioncss.css';
import '../../tpm/newshixuns/css/Newshixuns.css';
import Paperlibraryseeid_items from './Paperlibraryseeid_items';


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


	preservation = () => {


	}


	setitem_type = (item_type) => {


	}
	onDragEnd = (result) => {
		//console.log("单选题");
		//console.log(result);
		const ids = this.props.single_questions.questions[result.source.index].id;
		const positions = this.props.single_questions.questions[result.destination.index].position;

		const url = `/examination_items/${ids}/adjust_position.json`;
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata();
				}
			}).catch((error) => {
			//console.log(error);
		})
	}

	onDragEnds = (result) => {
		//console.log("多选题");
		//console.log(result);
		const ids = this.props.multiple_questions.questions[result.source.index].id;
		const positions = this.props.multiple_questions.questions[result.destination.index].position;
		const url = `/examination_items/${ids}/adjust_position.json`;
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata();
				}
			}).catch((error) => {
			//console.log(error);
		})


	}


	onDragEndss = (result) => {
		//console.log("判断题");
		//console.log(result);
		const ids = this.props.judgement_questions.questions[result.source.index].id;
		const positions = this.props.judgement_questions.questions[result.destination.index].position;
		const url = `/examination_items/${ids}/adjust_position.json`;
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				debugger
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata();
				}
			}).catch((error) => {
			//console.log(error);
		})

	}

	onDragEndsss = (result) => {
		//console.log("编程题");
		//console.log(result);

		const ids = this.props.program_questions.questions[result.source.index].id;
		const positions = this.props.program_questions.questions[result.destination.index].position;
		const url = `/examination_items/${ids}/adjust_position.json`;
		var data = {
			position: positions
		}
		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`拖动成功`);
					this.props.getdata();
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
			<div className=" w100s">

				<div className="w100s " >

					{/*单选题*/}
					{
						single_questions && single_questions ?
							<div className="backgroudwhites" style={{
								position: "relative",
							}}>

								<div className="w100s mt20 mb20 postitonrelati">
									<div
										className={ "w100s sortinxdirection  intermediatecenterysls mb20"}
							>
										<p className={"yldxtit"}>一、单选题</p> <p
										className="ml15 yldxtits">（共{single_questions && single_questions.questions_count}题；共{single_questions && single_questions.questions_score}分）</p>
									</div>

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

																			<Paperlibraryseeid_items
																				typenames={"SINGLE"}
																				typenamesn={"单选题"}
																				key={index}
																				indexs={index}
																				indexx={index+1}
																				indexxy={index}
																				objectsingle={object}
																			>

																			</Paperlibraryseeid_items>


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
								<div className="w100s  mb20 postitonrelati">
									<div
										className={"w100s sortinxdirection  intermediatecenterysls mb20"}
									>
										<p
											className={"yldxtit"}>{single_questions === null ? "一" : "二"}、多选题</p>
										<p
											className="ml15 yldxtits">（共{multiple_questions && multiple_questions.questions_count}题；共{multiple_questions && multiple_questions.questions_score}分）</p>
									</div>



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


																			<Paperlibraryseeid_items
																				typenames={"MULTIPLE"}
																				typenamesn={"多选题"}
																				key={index}
																				indexs={index}
																				indexx={index+1}
																				indexxy={index}
																				objectsingle={object}
																			>

																			</Paperlibraryseeid_items>
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
							<div className={ "backgroudwhites"} style={{
								position: "relative",
							}}>
								<div className="w100s  mb20 postitonrelati">
									<div
										className={"w100s sortinxdirection   intermediatecenterysls mb20 "}
									>
										<p
											className={ "yldxtit"}>{single_questions === null && multiple_questions === null ? "一" : single_questions === null && multiple_questions !== null ? "二"
											: single_questions !== null && multiple_questions === null ? "二"
												: "三"}、判断题</p> <p
										className="ml15 yldxtits">（共{judgement_questions && judgement_questions.questions_count}题；共{judgement_questions && judgement_questions.questions_score}分）</p>
									</div>


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


																			<Paperlibraryseeid_items
																				typenames={"JUDGMENT"}
																				typenamesn={"判断题"}
																				key={index}
																				indexs={index}
																				indexx={index+1}
																				indexxy={index}
																				objectsingle={object}
																			>

																			</Paperlibraryseeid_items>
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
							<div className={ "backgroudwhites"} style={{
								position: "relative",
							}}>

								<div className="w100s  mb20 postitonrelati">
									<div
										className={"w100s sortinxdirection intermediatecenterysls mb20"}
									>
										<p className={ "yldxtit"}>
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


																			<Paperlibraryseeid_items
																				key={index}
																				indexs={index}
																				indexx={index+1}
																				indexxy={index}
																				typenames={"PROGRAM"}
																				typenamesn={"编程题"}
																				objectsingle={object}
																			>
																			</Paperlibraryseeid_items>
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


