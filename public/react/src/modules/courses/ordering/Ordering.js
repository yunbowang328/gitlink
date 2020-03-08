import React,{ Component } from "react";
import { Input,Checkbox,Table, Pagination, Modal,Menu, Tooltip,Spin,Breadcrumb,Button } from "antd";
import { WordsBtn,on, off, trigger } from 'educoder';
import { DragDropContext,Draggable, Droppable} from 'react-beautiful-dnd';
import axios from'axios';
import Modals from '../../modals/Modals';
import '../css/members.css';
import '../css/busyWork.css';
import './Ordering.css';
import NoneData from "../coursesPublic/NoneData";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

class Ordering extends Component{
	constructor(props){
		super(props);
		this.state={
			isSpin:false,
			antIcon:false,
			datas:undefined,
			windowsscrollTop:false,
			newtask_ids:[]
		}
	}

	componentDidMount() {
		this.setState({
			isSpin:true
		})

    let coursesId=this.props.match.params.coursesId;
		let ordering_type=this.props.match.params.ordering_type;
		let url=`/courses/${coursesId}/tasks_list.json`;
		axios.get((url),{params:{
				container_type:ordering_type
			}}).then((result)=>{
			if(result){
				this.setState({
					datas:result.data.tasks,
					isSpin:false
				})
			}
		}).catch((error)=>{
			console.log(error);
			this.setState({
				isSpin:false
			})
		})

		window.addEventListener('scroll', this.handleScroll.bind(this)) //监听滚动
		// window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
	}


	// componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
	// 	window.removeEventListener('scroll', this.handleScroll.bind(this))
	// 	window.removeEventListener('resize', this.handleResize.bind(this))
	// }

	handleScroll=(e)=>{
		// console.log(
		// 	'浏览器滚动事件',
		// 	e.srcElement.scrollingElement.scrollTop,
		// 	e.srcElement.scrollingElement.scrollHeight
		// )
		//e.srcElement.scrollingElement.scrollTop为距离滚动条顶部高度
		// e.srcElement.scrollingElement.scrollHeight为整个文档高度

		if(e.srcElement.scrollingElement.scrollTop>60){
			this.setState({
					windowsscrollTop:true,
			})
	   }

	   if(e.srcElement.scrollingElement.scrollTop===0){
			 this.setState({
				 windowsscrollTop:false
			 })
		 }
	}
	//
	// handleResize = e => {
	// 	console.log('浏览器窗口大小改变事件', e.target.innerWidth)
	// }



	onDragEnd=(result)=>{

		if(result.destination!=null&&result.destination!=undefined){
			let {datas}=this.state;
			if (!result.destination) {
				console.log('dropped outside the list')
				return;
			}
			if (result.destination.index === result.source.index) {
				console.log('the same')
				return;
			}
			const shixuns_list = reorder(
				datas,
				result.source.index,
				result.destination.index
			);

			let newtask_ids=[]
			shixuns_list.map((item,key)=>{
				newtask_ids.push(item.task_id)
			})

			this.setState({
				datas:shixuns_list,
				newtask_ids:newtask_ids
			})
		}

	}

	updatalist=()=>{

		let {datas,newtask_ids,isSpin}=this.state;
		if(newtask_ids.length===0){
			this.props.showNotification("请先移动需要排序的实训作业任务");
			return
		}

		if(isSpin===true){
			return
		}

		this.setState({
			isSpin:true
		})
		let coursesId=this.props.match.params.coursesId;
		let ordering_type=this.props.match.params.ordering_type;
		let url=`/courses/${coursesId}/update_task_position.json`;
		axios.post(url,{
			container_type:ordering_type,
			task_ids:newtask_ids
		}).then((result)=>{
			if(result.data.status===0){
				this.props.showNotification(result.data.message);
				this.setState({
					isSpin:false,
					datas:datas,
					newtask_ids:[]
				});
				this.goback()
			}else{
				this.setState({
					isSpin:false,
				});
			}

		}).catch((error)=>{
			this.setState({
				isSpin:false,
			});
		})

	}

	goback=()=>{
		 window.location.href=`/courses/${this.props.match.params.coursesId}/shixun_homeworks/${this.props.match.params.main_id}`
	}


	render(){
		let {
			datas,
			Modalstype,
			windowsscrollTop,
		}=this.state;

		let main_id=this.props.match.params.main_id;
		let category_id=this.props.match.params.category_id;

		console.log(this.props)
		console.log(window)

		let positiontype=null;

		if(windowsscrollTop===true){
			positiontype={position:'fixed',zIndex:'1000',top: '0px'}
		}else{
			positiontype={}
		}
		return(

				<div className={"mb200"}>
					{/*提示*/}
					{Modalstype&&Modalstype===true?<Modals
						modalsType={this.state.Modalstype}
						modalsTopval={this.state.Modalstopval}
						modalCancel={this.state.ModalCancel}
						modalSave={this.state.ModalSave}
						modalsBottomval={this.state.ModalsBottomval}
						loadtype={this.state.Loadtype}
						antIcon={this.state.antIcon}
					/>:""}


					<div className="educontent clearfix">

						{windowsscrollTop===false?<div className={"mt20 mb20"}>

								<Breadcrumb separator=">">
									<Breadcrumb.Item href={this.props.current_user&&this.props.current_user.first_category_url}>{this.props.current_user&&this.props.current_user.course_name}</Breadcrumb.Item>
									<Breadcrumb.Item href={`/courses/${this.props.match.params.coursesId}/shixun_homeworks/${this.props.match.params.main_id}`}>实训作业</Breadcrumb.Item>
									<Breadcrumb.Item>调整排序</Breadcrumb.Item>
								</Breadcrumb>

						</div>:""}


						<p className="clearfix bor-bottom-greyE edu-back-white orderingbox"
						   style={positiontype}
						>
							   <span>温馨提示：请在列表中长按鼠标左键，进行拖放排序。完成排序后请点击“保存”</span>
									<Button className="fr orderingbtnleft" type="primary" onClick={()=>this.updatalist()}>保存</Button>
									<Button className="fr mr30 orderingbtnright" onClick={()=>this.goback()}>取消</Button>
						</p>


					</div>

					<Spin size="large" spinning={this.state.isSpin} >
						<DragDropContext onDragEnd={this.onDragEnd} >
							<Droppable droppableId={this.props.match.params.ordering_type}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className={"educontent mb50 mt40 droppableul ordermiddiv"}
										onScroll={this.contentViewScrolledit}
									>
										{datas===undefined?"":
											 datas.map((item, index) => {
												return (
													<Draggable
														key={item.task_id}
														draggableId={item.task_id}
														index={index}
														className={"TabsWarps"}
													>
														{(provided, snapshot) => (
															<div className={"mt30 edu-back-white pd1323s relativef ordermidbox"}
																	 key={index}
																	 ref={provided.innerRef}
																	 {...provided.draggableProps}
																	 {...provided.dragHandleProps}
															>
																<div className={"clearfix"}>
																	<div className={"item-body"}>
																		<div className={"clearfix ds pr orderSection"}>
																			<p title={item.task_name} className="font-16  color-dark maxwidth865s orderfonttop"
																				 href={`/courses/${this.props.match.params.coursesId}/shixun_homeworks/${item.task_id}/list?tab=0`}>{item.task_name}</p>
																			<p className={"color-grey panel-lightgrey mt16  "}>
																			<span className="topicswidth400">
																				<span className="topsics100 color-grey9 orderfontbom mr20 maxwidth795">{item.user_name}</span>
																				<span className="mr50 color-grey9 orderfontbom maxwidth795">{item.category}</span>
																			</span>
																			</p>
																		</div>
																	</div>
																</div>
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



						{
							datas===undefined?"":datas.length===0? <NoneData></NoneData>:""
						}

					</Spin>

				</div>
		)
	}
}
export default Ordering;
