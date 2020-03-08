import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import {Tooltip,Menu,Pagination,Spin, Dropdown,Checkbox} from 'antd';
import axios from 'axios';
import {getImageUrl,WordsBtn} from 'educoder';
import moment from 'moment';
import Modals from '../../modals/Modals';
import SendTopics from '../../modals/SendTopics'
import NoneData from '../../courses/coursesPublic/NoneData';
import "./usersInfo.css";
import Withoutpermission from './Withoutpermission.png';



class InfosTopics extends Component{
	constructor(props){
		super(props);
		this.state={
			isSpin:false,
			category:"normal",
			course_list_id:undefined,
			sort_by:"updated_at",
			sort_direction:"desc",
			page:1,
			data:undefined,
			checkBoxValues:[],
			per_page:15,
			isshowprofes:false
		}
	}

	componentDidMount(){
		// let types=this.props.match.params.topicstype;
    // let professional_certification=this.props.current_user&&this.props.current_user.professional_certification;
		//
		// if(professional_certification===false&&types==="publicly"){
    //   this.setState({
		// 		isshowprofes:true
		// 	})
		// }else{
		// 	this.updataslist()
		// }
		this.updataslist()
	}
	// componentDidUpdate(prevProps) {
	//
	// 	if(prevProps.current_user!=this.props.current_user){
	// 		let types=this.props.match.params.topicstype;
	// 		let professional_certification=this.props.current_user&&this.props.current_user.professional_certification;
	//
	// 		console.log(professional_certification)
	// 		if(professional_certification===false&&types==="publicly"){
	// 			this.setState({
	// 				isshowprofes:true
	// 			})
	// 		}else{
	// 			this.updataslist()
	// 		}
	// 	}
	// }
	updataslist=()=>{
		let types=this.props.match.params.topicstype;
		let { category,course_list_id,sort_by,sort_direction,page}=this.state;
		this.searchAlldata(types,category,course_list_id,sort_by,sort_direction,page)
	}
	searchAlldata=(type,category,course_list_id,sort_by,sort_direction,page)=>{

			this.setState({
				isSpin:true
			})

			let {per_page}=this.state;
			let url=`/users/question_banks.json`;

			axios.get(encodeURI(url),{params:{
					type,
					object_type:category,
					course_list_id,
					sort_by,
					sort_direction,
					page,
					per_page
				}
			}).then((response) => {
      if(response){
      	if(response.status){
      		if(response.data.status == -2){
 						this.setState({
							isshowprofes:true,
							isSpin:false
						})
					}else if(response.data.status === 403||response.data.status === 401||response.data.status === 500){
						this.setState({
							isSpin:false
						})
					}else{
						this.setState({
							data:response.data,
							checkBoxValues:[],
							isSpin:false
						})
					}
				}
			}

			}).catch((error) => {
				this.setState({
					isSpin:false
				})
			});

	}

	searchCategory=(type)=>{
		this.setState({
			category:type,
			course_list_id:undefined,
		})

		let types=this.props.match.params.topicstype;
		let { category,course_list_id,sort_by,sort_direction,page}=this.state;
		this.searchAlldata(types,type,undefined,sort_by,sort_direction,page)
	}

	searchCourselistid=(id)=>{
		this.setState({
			course_list_id:id
		})

		let types=this.props.match.params.topicstype;
		let { category,course_list_id,sort_by,sort_direction,page}=this.state;
		this.searchAlldata(types,category,id,sort_by,sort_direction,page)
	}

	onCheckBoxChange=(checkedValues)=>{
		if(checkedValues.length>15){
				this.props.showNotification("选择条数不能大于15条")
		}else{
			this.setState({
				checkBoxValues:checkedValues
			})
		}

	}

	updatedlist=(updatedtype)=>{
		let types=this.props.match.params.topicstype;
		let { category,course_list_id,sort_by,sort_direction,page}=this.state;
		  if(updatedtype===sort_by){
		  	 if(sort_direction==="desc"){
							this.setState({
								sort_direction:"asc",
								sort_by:updatedtype
							})
					 this.searchAlldata(types,category,course_list_id,updatedtype,"asc",page)
				 }else{
							this.setState({
								sort_direction:"desc",
								sort_by:updatedtype
							})
					 this.searchAlldata(types,category,course_list_id,updatedtype,"desc",page)
				 }
			}else{
				this.setState({
					sort_direction:"desc",
					sort_by:updatedtype
				})
				this.searchAlldata(types,category,course_list_id,updatedtype,"desc",page)
			}
	}


	changePage=(pageNumber)=>{
		let types=this.props.match.params.topicstype;
		let { category,course_list_id,sort_by,sort_direction,page}=this.state;
		this.searchAlldata(types,category,course_list_id,sort_by,sort_direction,pageNumber)
		this.setState({
			page:pageNumber,
			checkBoxValues:[]
		})
	}

	deletecheckBoxValues=()=>{
		let {checkBoxValues}=this.state;

		if(checkBoxValues.length===0){
			this.props.showNotification("请选择题库")
		}else{
			this.setState({
				Modalstype:true,
				Modalstopval:"是否确认删除？",
				ModalCancel:this.topicscancelmodel,
				ModalSave:this.topicssavedelete,
			})
		}
	}

	topicssavedelete=()=>{
    let {checkBoxValues,category}=this.state;
		const url = `/question_banks/multi_delete.json`;
		axios.delete(url, { data: {
				object_id: checkBoxValues,
				object_type:category
				}})
			.then((response) => {
				if(response.data.status===0){
					this.updataslist()
					this.props.showNotification(response.data.message)
				}else{
					this.props.showNotification(response.data.message)
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		  this.topicscancelmodel()
	}


	topicscancelmodel=()=>{
		this.setState({
			Modalstype:false,
			Loadtype:false,
			visible:false,
			Modalstopval:"",
			ModalCancel:"",
			ModalSave:"",
			checkBoxValues:[],
			checkedtype:false
		})

	}
	openTopics=(id)=>{
		this.setState({
			Modalstype:true,
			Modalstopval:"公开后不能重设为私有",
			ModalsBottomval:"是否确认设为公开？",
			ModalCancel:this.topicscancelmodel,
			ModalSave:()=>this.topicssaveonOpen(id),
		})
	}

	topicssaveonOpen=(id)=>{

		let {category}=this.state;
		const url = `/question_banks/multi_public.json`;
		axios.post(url,{
				object_id:[id],
				object_type:category
		}).then((response) => {
			if(response.data.status===0){
				this.updataslist()
				this.props.showNotification(response.data.message)
			}else{
				this.props.showNotification(response.data.message)
			}
			}).catch(function (error) {
				console.log(error);
			});

		this.topicscancelmodel()
	}


	sendTopics=()=>{
		let {checkBoxValues}=this.state;
		if(checkBoxValues.length===0){
			this.props.showNotification("请选择题库")
		}else{
			this.setState({
				visible:true
			})
		}

	}
	render(){
		let{
			category,
			course_list_id,
			isSpin,
			data,
			page,
			sort_direction,
			sort_by,
			checkBoxValues,
			Modalstype,
			visible,
			isshowprofes
		} = this.state;
		let {
			is_current,
			current_user,
		}=this.props;

		let categorylist=[
			{val:"普通作业",type:"normal"},
			{val:"分组作业",type:"group"},
			// {val:"毕设选题",type:"gtopic"},
			// {val:"毕设任务",type:"gtask"},
			{val:"试卷",type:"exercise"},
			{val:"问卷",type:"poll"},
			]

		let types=this.props.match.params.topicstype;
		let username=this.props.match.params.username;


		//types===publicly  公共
		//types===personal  私有
		let user_id=this.props.current_user&&this.props.current_user.user_id;
		let user_type=this.props.current_user&&this.props.current_user.user_identity;
		let targetuserid=this.props.data&&this.props.data.id;



		// console.log(is_current)
		// console.log(current_user)
		// console.log(current_user.is_teacher)
		// console.log(current_user.admin)
		const menu = (
			<Menu>
				<Menu.Item onClick={()=>this.updatedlist("updated_at")}>
					最近更新
				</Menu.Item>
				<Menu.Item onClick={()=>this.updatedlist("name")}>
					题目名称
				</Menu.Item>
				{types==="publicly"?<Menu.Item onClick={()=>this.updatedlist("contributor")}>
					贡献者
				</Menu.Item>:""}
			</Menu>
		);

		// console.log(this.props)
		return(
			<div className="educontent mb50 mt40">
				{/*提示*/}
				<style>
					{
						`
						.mt40{
    					margin-top: 40px !important;
						}
						`
					}
				</style>
				{Modalstype&&Modalstype===true?<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					modalsBottomval={this.state.ModalsBottomval}
					loadtype={this.state.Loadtype}
				/>:""}

				{/*发送至弹窗*/}
				{
					visible&&visible===true?
					<SendTopics
						{...this.state}
						{...this.props}
						mysendall={false}
						visible={visible}
						updataslist={()=>this.updataslist()}
						topicscancelmodel={()=>this.topicscancelmodel()}
					/>:""
				}
				<style>

					{
						`
						  // ::-webkit-scrollbar-thumb {
							// 		background-color: #cde5fe;
							//
							// 		box-shadow: 0px 0px black;
							// }
							//
							//
							// ::-webkit-scrollbar-track {
							// 		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
							// 		background-color: #fff;
							// }

							.shaiContent li.shaiItem {
					    padding: 0px 9px;
							float: left;
							border-radius: 4px;
							cursor: pointer;
					    margin-right: 15px !important;
							display: block;
							margin-bottom: 2px;
					    color: #666;
							}

							.maxwidth900{
									max-width: 900px;
									overflow:hidden;
									text-overflow:ellipsis;
									white-space:nowrap
							}

						 .homepagePostSettingname{
							 width:192px !important;
						 }

						 .homepagePostSettingbox{
							 width:139px !important;
						 }
							.marright0{
    						margin-right: 0px !important;
							}

							.gongkais{
								min-width: 50px;
								height: 22px !important;
								line-height: 22px !important;
								color: #fff !important;
							  margin-top: 4px;
							}
						 	`
					}
				</style>

				<Spin size="large" spinning={isSpin}>
					<div className="clearfix topicsbox">
						{types==="publicly"?<div className={"topcschild"}>
							<a className={types==="personal"?"topicstopfont fr ":"topicstopfont fr topcsactive"}
								 href={`/users/${this.props.current_user&&this.props.current_user.login}/topics/personal`}>我的题库</a>
							<div className={types==="publicly"?"topicstopfont fl ":"topicstopfont fl topcsactive"}
							>公共题库</div>
						</div>:<div className={"topcschild"}>
							<div className={types==="personal"?"topicstopfont fl ":"topicstopfont fl topcsactive"}
							 >我的题库</div>
							<a className={types==="publicly"?"topicstopfont fr ":"topicstopfont fr topcsactive"}
								 href={`/topicbank/publicly`}
							>公共题库</a>
						</div>}

						{isshowprofes===false?
						<div>

							<div className={"topcsmid"}>
								{categorylist.map((item,key)=>{
									return(
										<span key={key} className={category===item.type?"topicsmidfont fl mr30 topcsactive":"topicsmidfont fl mr30"} onClick={()=>this.searchCategory(item.type)}>{item.val}</span>
									)
								})}

							</div>

							{data&&data.count===undefined?"":data&&data.count===0?"":<div className={data===undefined?"":data.course_list===undefined||data.course_list.length===0?"shaiContent mb45":"shaiContent"}>
									<li className={course_list_id===undefined?"shaiItem shixun_repertoire active fl":"shaiItem shixun_repertoire fl"}  onClick={()=>this.searchCourselistid(undefined)}>全部</li>
									<div className="fl pr topicsItem mb20">
										{data===undefined?"":data.course_list===undefined||data.course_list.length===0?"":data.course_list.map((item,key)=>{
											return(
												<li key={key} className={course_list_id===item.id?"shaiItem shixun_repertoire active marright0":"shaiItem shixun_repertoire marright0"} onClick={()=>this.searchCourselistid(item.id)}>{item.name}</li>
											)
										})}
									</div>
								</div>}

						</div>:<div className={"professional_certificationbox"}>
									<p className="clearfix ">
										<div className={"stud-class-set pd115200 coursenavbox edu-back-white"}>
											<div className={"sumbtongs mb10"}><img className={"topicsItemimg"} src={Withoutpermission}/></div>
											<div className={"terraces mb5 topicsItemfont"}>通过职业认证的教师才能访问公共题库</div>
											<div className="clearfix mt30 mb30 padding251">
												<a className="defalutSubmitbtn fl ml60 defalutSubmitbtns" target="_blank" href="/account/certification">立即认证</a>
											</div>
										</div>
									</p>
							</div>}




					</div>

					{isshowprofes===false?data&&data.count===undefined?"":data&&data.count===0?"":<div className="clearfix font-12 mt20">
						<p className="font-12 ml5 fl">
								<span className="fl color-grey-9 mr20">共   <span className={"color-orange"}>{data&&data.count===undefined?0:data&&data.count}</span>   个</span>
								<span className="fr color-grey-9">已选择   <span  className={"color-orange"}>{checkBoxValues.length}</span>  个   (不支持跨页勾选)</span>
						</p>
						<p className="font-12 alltopiscright ml25 fr">
							<style>
								{
									`
									.yslbottomsj{
									position: absolute;
									bottom: -8px;
									}
									`
								}
							</style>
								<Dropdown overlay={menu}>
										<span className="fr color-grey-9 mr10 pointer ">
											<span>{sort_by==="updated_at"?'最近更新':sort_by==="name"?'题目名称':sort_by==="contributor"?"贡献者":""}</span>
											<sapn className="relativef ml10" onClick={()=>this.updatedlist(sort_by)}>
												<i className={sort_direction==="asc"?
													"iconfont icon-sanjiaoxing-up font-12 topsj color-blue" :"iconfont icon-sanjiaoxing-up font-12 topsj"}></i>
												<i className={sort_direction==="desc"?
													"iconfont icon-sanjiaoxing-down font-12 yslbottomsj color-blue":"iconfont icon-sanjiaoxing-down font-12 yslbottomsj"}></i>
											</sapn>
										</span>
								</Dropdown>
						  	{user_type!="学生"?<span className="fr mr30 topcsactive pointer" onClick={()=>this.sendTopics()}>发送</span>:""}
								{types==="personal"?((is_current && current_user && current_user.is_teacher ) || current_user && current_user.admin)
									&&<span className="fr mr30 topcsactive pointer" onClick={()=>this.deletecheckBoxValues()}>删除</span>:""}
						</p>
					</div>:""}


					{isshowprofes===true?"":data===undefined?<NoneData></NoneData>:data.question_banks===undefined||data.question_banks.length===0?<NoneData></NoneData>:
						<Checkbox.Group style={{ width: '100%' ,minHeight:'297px'}} onChange={this.onCheckBoxChange} value={checkBoxValues}>
							{data.question_banks.map((item,key)=>{
					  return(
						<div className="mt20 edu-back-white pd1323 relativef" key={key} >
							<div className="clearfix">
								<div className="item-body">

									<div className="clearfix ds pr pt10 contentSection" >
										{user_type!="学生"?<Checkbox value={item.id} key={item.id} className={"fl mt5"}></Checkbox>:""}


									  <a title={item.name.length>55?item.name:""} className="ml10 fl mt3 font-16  color-dark maxwidth900" href={
											category==="normal"?`/banks/normal/${item.id}/${types}?tab=0`:
												category==="group"?`/banks/group/${item.id}/${types}?tab=0`:
													category==="poll"?`/banks/poll/${item.id}/${types}`:
														category==="exercise"?`/banks/exercise/${item.id}/${types}`:
															category==="gtask"?`/banks/gtask/${item.id}/${types}?tab=0`:
																category==="gtopic"?`/banks/gtopic/${item.id}/${types}?tab=0`:""
										}
										>
											{item.name}
									  </a>

										{item.is_public===true?types==="publicly"?"":<span className="edu-filter-btn edu-filter-btn-4CACFF ml15 fl gongkais">公开</span>:""}



										<div className="cl"></div>

										<p className="color-grey mt16 fl">
											<span className={"topicswidth600"}>
												 {types==="publicly"?<span className="topsics135 color-grey9 mr50">{item.creator_name}</span>:""}
												 <span className="mr50 color-grey9">{item.quotes_count}  次引用</span>
												 <span className="mr50 color-grey9">{item.solve_count}   次答题</span>
											   <span className="mr50 color-grey9">{moment(item.updated_at).fromNow()}</span>
											</span>
											{item.course_list_name===null?"":<span className={"topsicrelative topsicinline"} title={item.course_list_name}>
												<div className={types==="personal"?"topicsbtn topsicsmax550":"topsicsmax550 topicsbtn"}>{item.course_list_name}</div>
											</span>}
										</p>

										<div className="homepagePostSetting homepagePostSettingname topscisright">
											{types==="personal"?((is_current && current_user && current_user.is_teacher ) || current_user && current_user.admin)
												&&<a className="btn colorblue mr25 font-16 fr"
													 href={category==="normal"?`/banks/normal/${item.id}/edit/${types}`:
														 category==="group"?`/banks/group/${item.id}/edit/${types}`:
															 category==="poll"?`/banks/poll/${item.id}/edit/${types}`:
																 category==="exercise"?`/banks/exercise/${item.id}/edit/${types}`:
																	 category==="gtask"?`/banks/gtask/${item.id}/edit/${types}`:
																		 category==="gtopic"?`/banks/gtopic/${item.id}/edit/${types}`:""
													 }
												>编辑</a>
												:""}
											{types==="personal"&&item.is_public===false?((is_current && current_user && current_user.is_teacher ) || current_user && current_user.admin)
												&&<a className="btn colorblue mr25 fr font-16" onClick={()=>this.openTopics(item.id)}>设为公开</a>:""}

										</div>
									</div>
								</div>
								
							</div>
						</div>
					)})}
						</Checkbox.Group>
					}

					{
						isshowprofes===true?"":data&&data.count >15 &&
						<div className="mt30 mb50 edu-txt-center">
							<Pagination showQuickJumper total={data&&data.count} onChange={this.changePage} pageSize={15} current={page}/>
						</div>
					}

				</Spin>
			</div>
		)
	}
}
export default InfosTopics;