import React,{ Component } from "react";
import { Modal,Checkbox,notification} from "antd";
import axios from 'axios';
import {getImageUrl} from 'educoder';

class ShixunWorkModal extends Component{
	constructor(props){
		super(props);
		this.state={
			course_groups:undefined,
			limit:10,
			page:1,
			group_ids:undefined,
			group_list:undefined
		}
	}
	componentDidMount() {
		let {group_list}=this.state;
		let url="/homework_commons/"+this.props.match.params.homeworkid+"/group_list.json";
		axios.get(url,{params:{
				limit:10,
				page:1,
			}
		}).then((response) => {
			if(response.data.group_list===undefined){
				this.setState({
					course_groups:response.data,
					group_list:undefined
				})
			}else{
				const newgroup_list=[];
				response.data.group_list.map((item,key)=>{
					newgroup_list.push(item)
				})
				if(response.data.ungroup_list===undefined){

				}else{
					newgroup_list.push(response.data.ungroup_list)
				}
				this.setState({
					course_groups:response.data,
					group_list:newgroup_list,
				})
			}

		}).catch((error) => {
			console.log(error)
		});


	}

	//勾选实训
	shixunhomeworkedit=(checkedValues)=>{
		let types=false
		let{group_list}=this.state;
		group_list.map((item,key)=>{
			if(item!=undefined){
				checkedValues.map((list,li)=>{
					if(item.id===list){
						if(item.works_count<2){
							this.props.showNotification(`有效作品数少于2个，无法查重`)
							types=true
							return
						}
					}
				})
			}
		})

		if(types===false){
			if(checkedValues.length===group_list.length){
				this.setState({
					onChangetype:true,
					group_ids:checkedValues
				})
			}else{
				this.setState({
					group_ids:checkedValues,
					onChangetype:false
				})
			}
		}

	}

	contentViewScroll=(e)=>{
		//滑动到底判断
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
			let {page,limit,group_list}=this.state;
			let newpage=page+1;
			let newgroup_list=group_list;
			let url="/homework_commons/"+this.props.match.params.homeworkid+"/group_list.json";

			axios.get(url,{params:{
					limit:limit,
					page:newpage,
				}
			}).then((response) => {
				if(response!==null || response!==undefined){
					if(response.data.group_list.length>0){

						response.data.group_list.map((item,key)=>{
							newgroup_list.push(item);
							this.setState({
								course_groups:response.data,
								group_list:newgroup_list,
								page:newpage
							})
						})
					}

					if(response.data.ungroup_list===undefined ||  response.data.ungroup_list === null) {

					}else {

						newgroup_list.push(response.data.ungroup_list);
						this.setState({
							course_groups:response.data,
							group_list:newgroup_list,
							page:newpage
						})
					}

				}
			}).catch((error) => {
				console.log(error)
			});

		}
	}

	onChange=(e)=>{
		let{group_list}=this.state;
		let {data}=this.props;
		if(e.target.checked===true){
			if(data&&data.length===0){
				let id=[]
				group_list.forEach((item,key)=>{
					if(item.works_count!=0){
						id.push(item.id)
					}
				})
				this.setState({
					group_ids:id,
					onChangetype:e.target.checked
				})
			}else{
				let id=[]
				group_list.forEach((item,key)=>{
					if(item.works_count!=0){
						id.push(item.id)
					}
				})
				this.setState({
					group_ids:id,
					onChangetype:e.target.checked
				})
			}
		}else{
			this.setState({
				group_ids:[],
				onChangetype:e.target.checked
			})
		}




	}



	isSave=()=>{
		let{group_ids}=this.state;
		if(group_ids&&group_ids.length === 0){
			this.props.showNotification(`请先选择分班`);
			return
		}
		// if(group_ids&&group_ids.length < 2){
		// 	this.props.showNotification(`有效作品数少于2个，无法查重`);
		// 	return
		// }

		let url="/homework_commons/"+this.props.match.params.homeworkid+"/homework_code_repeat.json";
		axios.post(url, {
				group_ids: group_ids,
			})
			.then((response) => {
				// console.log(this.props)
				if (response.data.status === 0) {
					this.props.updatas()
					this.props.issCancel()
					// notification.open({
					// 	message:"提示",
					// 	description: response.data.message
					// });
					window.location.href=`/courses/${this.props.match.params.coursesId}/shixun_homeworks/${this.props.match.params.homeworkid}/student_work?tab=2`;
				}else if(response.data.status === -1){
					notification.open({
						message:"提示",
						description: response.data.message
					});
				}else if(response.data.status === -2){
					notification.open({
						message:"提示",
						description: response.data.message
					});
				}else if(response.data.status === -3){
					notification.open({
						message:"提示",
						description: response.data.message
					});
				}else if(response.data.status === -4){
					notification.open({
						message:"提示",
						description: response.data.message
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	issCancel=()=>{
		this.props.issCancel()
	}

	render(){
		let {course_groups,group_ids,onChangetype,group_list}=this.state;
		// let {data}=this.props;
		// console.log(group_list)
	  // console.log(group_list)
		return(
			<div>
				<Modal
					keyboard={false}
					className={"HomeworkModal"}
					title={this.props.modalname}
					visible={this.props.visible}
					closable={false}
					footer={null}
					destroyOnClose={true}
				>
					<div className="task-popup-content">

						<style>{`
                .greybackHead{
                  padding:0px 30px;
                }
                .fontlefts{text-align: left;}
              `}</style>
						<ul className="clearfix edu-txt-center">
							<li className="fl paddingleft22 fontlefts" style={{width:'260px'}}>分班名称</li>
							<li className="fl edu-txt-left" style={{width:'117px'}}>有效作品数</li>
							<li className="fl" style={{width:'100px'}}>上次查重时间</li>
						</ul>

						{course_groups===undefined?"":
							group_list===undefined||JSON.stringify(group_list)==="[]"
							?
								<div id="forum_list" className="forum_table">
									<div className=" edu-back-white">
										<div className="edu-tab-con-box clearfix edu-txt-center">
											<img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
											<p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>
										</div>
									</div>

								</div>
								:
							<ul className="upload_select_box fl clearfix mt10 mb10" style={{"overflow-y":"auto"}} id="search_not_members_list"
									onScroll={this.contentViewScroll}
							>


								<Checkbox.Group style={{ width: '100%' }}  onChange={this.shixunhomeworkedit} value={group_ids}>
									{
										group_list===undefined||JSON.stringify(group_list)==="[]"?
										""
											:
											group_list&&group_list.length===0?"":group_list.map((item,key)=>{
												return(
													 <div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" key={key}>
														<li className="fl task-hide" style={{width: '240px',paddingLeft: '10px'}}>
															<Checkbox
																className="fl task-hide edu-txt-left"
																name="shixun_homework[]"
																value={item=== undefined?"":item.id}
																key={item=== undefined?"":item.id}
															>
																<label style={{"textAlign": "left", "color": "#05101A"}}
																			 className="task-hide color-grey-name" title={item===undefined?"":item.name}>{item===undefined?"":item.name}</label>
															</Checkbox>
														</li>
														<li className="fl" style={{width: '100px'}}>
															{item===undefined?"":item.works_count===undefined?item.work_count:item.works_count}
														</li>
														<li className="fl" style={{width: '160px'}}>
															{item===undefined?"":item.last_review_time}
														</li>
													</div>
												)
											})
									}
								</Checkbox.Group>
							</ul>
						}
						<div className={"clearfix"}>
							<Checkbox checked={onChangetype} onChange={this.onChange} className={"ml10"}>{onChangetype===true?"清除":"全选"}</Checkbox>
							{/*<span>有效作品都为0</span>*/}
						</div>

						<div className="clearfix mt30 edu-txt-center mb10">
							<a  className="task-btn color-white mr30" onClick={this.issCancel}>取消</a>
							<a className="task-btn task-btn-orange" onClick={this.isSave}>确认</a>
						</div>

					</div>
				</Modal>
			</div>
		)
	}
}
export default ShixunWorkModal;


// course_groups.ungroup_list.work_count===0?"":
//
// 	<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE">
// 		<li className="fl task-hide" style={{width: '240px'}}>
// 			<Checkbox
// 				className="fl task-hide edu-txt-left"
// 				name="shixun_homework[]"
// 				value={course_groups.ungroup_list.id}
// 			>
// 				<label style={{"textAlign": "left", "color": "#05101A"}}
// 							 className="task-hide color-grey-name" title="frerere">{course_groups.ungroup_list.name}</label>
// 			</Checkbox>
// 		</li>
// 		<li className="fl" style={{width: '100px'}}>
// 			{course_groups.ungroup_list.work_count}
// 		</li>
// 		<li className="fl" style={{width: '160px'}}>
// 			{course_groups.ungroup_list.last_review_time}
// 		</li>
// 	</div>
//
// :