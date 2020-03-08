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
	Tooltip
} from "antd";
import {parabola} from './animation/parabola'
import Headplugselections from "./component/Headplugselections";
import QuestionModal from "./component/QuestionModal";
import QuestionModals from "./component/QuestionModals";
import Contentpart from "./component/Contentpart";
import {TPMIndexHOC} from "../tpm/TPMIndexHOC";
import NoneData from './component/NoneData';
import './questioncss/questioncom.css';
import SiderBars from "../question/component/SiderBars";

class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 50,
			defaultActiveKey:"1",
			Headertop: "",
			Footerdown: "",
			visible: false,
			placement: 'right',
			modalsType: false,
			modalsTypes:false,
			titilesm: "在平台审核后，所有成员均可使用试题",
			titiless: "是否设置为公开？",
			titilesms:"单选题",
			titbool: false,
			Contentdata: [],
			difficulty: null,
			visiblemys: false,
			visiblemyss: false,
			item_type: null,
			keyword: null,
			timuid: null,
			items_count: 0,
			basket_list: [],
			completion_questions_count: 0,
			judgement_questions_count: 0,
			multiple_questions_count: 0,
			practical_questions_count: 0,
			program_questions_count: 0,
			single_questions_count: 0,
			subjective_questions_count: 0,
			page:1,
			per_page:10,
			disciplinesdata:[],
			discipline_id:null,
			sub_discipline_id:null,
			tag_discipline_id:null,
			booljupyterurls:false,
			disciplinesdatakc:0,
			disciplinesdatazsd:0,
			selectallquestionsonthispages:false,
			oj_status:null,
			isVisible: false,
			selectionbools:false,
			chakanjiexiboolindex:"无",
		}

	}

	chakanjiexibool=(index)=>{
		if(this.state.chakanjiexiboolindex===index){
			this.setState({
				chakanjiexiboolindex:"无",
			})
			return
		}
		this.setState({
			chakanjiexiboolindex:index,
		})
	}
	setmychakanjiexibool=(str)=>{
		this.setState({
			chakanjiexiboolindex:str,
		})
	}
	setdiscipline_id=(discipline_id)=>{
		this.setState({
			discipline_id:discipline_id,
			sub_discipline_id:null,
			tag_discipline_id:null,
			keywords:"",
			page:1,
			per_page:10,
			oj_status:null
		})
		var data = {
			discipline_id:discipline_id,
			sub_discipline_id:null,
			tag_discipline_id:null,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: this.state.item_type,
			keywords: null,
			page: this.state.page,
			per_page:10,
			oj_status:null
		};
		this.getdata(data);

	}

	setsub_discipline_id=(discipline_id,sub_discipline_id)=>{
		this.setState({
			sub_discipline_id:sub_discipline_id,
			tag_discipline_id:null,
			keywords:"",
			page:1,
			per_page:10,
			oj_status:null
		})
		var data = {
			discipline_id:discipline_id,
			sub_discipline_id:sub_discipline_id,
			tag_discipline_id:null,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: this.state.item_type,
			keywords:null,
			page: 1,
			per_page:10,
			oj_status:null
		};
		this.getdata(data);
	}

	settag_discipline_id=(tag_discipline_id)=>{
		this.setState({
			tag_discipline_id:tag_discipline_id,
			keywords:"",
			page:1,
			per_page:10,
			oj_status:null
		})
		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: this.state.item_type,
			keywords: null,
			page: 1,
			per_page:10,
			oj_status:null
		};
		this.getdata(data);
	}

	//初始化
	componentDidMount() {
		let url = `/users/get_navigation_info.json`;
		axios.get(url, {}).then((response) => {
			if (response != undefined) {
				if (response.status === 200) {
					this.setState({
						Headertop: response.data.top,
						Footerdown: response.data.down
					})
				}
			}
		});
		this.getbasket_listdata();
		//获取题库筛选资料
		let urls = `/disciplines.json`;
		axios.get(urls, {params: {
				source:"question"
			}}).then((response) => {
			//console.log("Questiondisciplines");
			//console.log(response.data);
			if (response) {
					this.setState({
						disciplinesdata: response.data.disciplines,
					})
			}
		});
	}
  //公共和我的
	callback = (key) => {
		this.setState({
			defaultActiveKey: key,
			selectallquestionsonthispages:false,
			difficulty:null,
			page:1,
			oj_status:null
		})
		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: key,
			item_type: this.state.item_type,
			difficulty: null,
			page: 1,
			per_page:10,
			oj_status:null
		};
		this.getdata(data);

	}

	//刷新加载
	getdata = (data) => {
		const url = `/item_banks.json`;
		this.setState({
			booljupyterurls:true,
			selectionbools:false,
		})
		axios.get((url), {params: data}).then((response) => {
			setTimeout(()=>{
				this.setState({
					booljupyterurls:false,
				})
			},1000);
			if (response === null || response === undefined) {

				return
			}
			if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

			} else {

			}
			//////console.log("item_banks");
			//////console.log(response);
			this.setState({
				Contentdata: response.data,
				items_count: response.data.items_count,
			})
			this.getdataslen(response.data.items);
		}).catch((error) => {
			//////console.log(error)
			this.setState({
				booljupyterurls:false,
			})
		});
	}

	//不刷新加载
	getdatasy = (data) => {
		const url = `/item_banks.json`;
    this.setState({
			selectionbools:false,
		})
		axios.get((url), {params: data}).then((response) => {
			setTimeout(()=>{

			},1000);
			if (response === null || response === undefined) {

				return
			}
			if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

			} else {

			}
			//////console.log("item_banks");
			//////console.log(response);
			this.setState({
				Contentdata: response.data,
				items_count: response.data.items_count,

			})

			this.getdataslen(response.data.items);
		}).catch((error) => {

		});
	}

	//计算
	getdataslen=(arr)=>{
    var contes=0;
		for(let data of arr) {
			if(data.item_type==="PROGRAM"){
				//编程题
				if(data.choosed===true){

				}else{
					//未选用
					if(data.program_attr.status===1){
						//已发布
						contes=contes+1;
					}

				}

			}else{
				//不是编程题
				if(data.choosed===true){

				}else{
					//未选用
					contes=contes+1;
				}
			}

		}

		if(contes>0){
			this.setState({
				selectionbools:false,
				selectallquestionsonthispages:false,
			})
		}else {
			this.setState({
				selectionbools:true,
				selectallquestionsonthispages:true,
			})
		}
	}

	paginationonChange = (pageNumber) => {
		this.setState({
			page: pageNumber,
		})
		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: this.state.item_type,
			keywords: this.state.keywords,
			page: pageNumber,
			per_page:10,
			oj_status:this.state.oj_status
		};
		this.getdata(data);
		this.setmychakanjiexibool("无")

	}
	showDrawer = () => {
		if(this.state.visible===true){
			this.setState({
				visible: false,
			});
		}else{
			this.setState({
				visible: true,
			});
			this.getbasket_listdata();
		}



	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	onChange = e => {
		this.setState({
			placement: e.target.value,
		});
	};

	getContainer = () => {
		return this.container;
	};
	saveContainer = container => {
		this.container = container;
	};

	showmodels = (id) => {

		this.setState({
			modalsType: true,
			titilesm: "在平台审核后，所有成员均可使用试题",
			titiless: "是否设置为公开？",
			titbool: true,
			timuid: id
		})
	};
	showmodelysl = (id) => {
		this.setState({
			modalsType: true,
			titilesm: "确认删除后，无法撤销",
			titiless: "是否确认删除？",
			titbool: false,
			timuid: id
		})
	};


	modalCancel = () => {
		this.setState({
			modalsType: false
		})
	}
	modalCancels=()=>{
		this.setState({
			modalsTypes: false
		})
	}
	showQuestionModals =(item_type)=>{
		this.setState({
			modalsTypes: true,
			titilesms:item_type,
		})

	}
	setDownloads=(item_type)=>{
		this.Deletebigquestiontype(item_type);
		this.setState({
			modalsTypes: false
		})
	}
	setDownload = () => {
		//确认
		if (this.state.titbool === true) {
			//公开
			this.publicopentimu(this.state.timuid);
		} else {
			// 删除
			this.deletetimu(this.state.timuid);
		}
		this.setState({
			modalsType: false
		})
	}

	setdifficulty = (difficulty) => {
		this.setState({
			difficulty: difficulty,
			visiblemys: false,
			page: 1,
			per_page:10,
			keywords:"",
			oj_status:null
		})

		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: difficulty,
			item_type: this.state.item_type,
			keywords:null,
			page:1,
			per_page:10,
			oj_status:null
		};

		this.getdata(data);

	}
	setitem_types = (item_type) => {
		this.setState({
			item_type: item_type,
			visiblemyss: false,
			page: 1,
			per_page:10,
			keywords:"",
			oj_status:null
		})

		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: item_type,
			page: 1,
			per_page:10,
			keywords:null,
			oj_status:null
		};

		this.getdata(data);
	}

	handleVisibleChange = (boll) => {
		if (this.state.visiblemyss === true) {
			this.setState({
				visiblemys: boll,
				visiblemyss: false,
			})
		} else {
			this.setState({
				visiblemys: boll,
			})
		}

	}

	handleVisibleChanges = (boll) => {
		if (this.state.visiblemys === true) {
			this.setState({
				visiblemyss: boll,
				visiblemys: false,
			})
		} else {
			this.setState({
				visiblemyss: boll,
			})
		}

	}

	setdatafunsval = (e) => {
		this.setState({
			keywords: e.target.value
		})
	}

	setdatafuns = (value) => {
		this.setState({
			keywords: value,
		})
		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: this.state.item_type,
			keywords: value,
			page: this.state.page,
			per_page:10,
			oj_status:this.state.oj_status
		};

		this.getdata(data);
	}

	deletetimu = (id) => {

		const url = `/item_banks/${id}.json`;
		axios.delete(url)
			.then((response) => {
				if (response.data.status == 0) {
					// this.props.showNotification('删除试题成功')
					// props.history.push(response.data.right_url)
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
						item_type: this.state.item_type,
						keywords: this.state.keywords,
						page: this.state.page,
						per_page:10,
					};
					this.getdata(data);
				}
			})
			.catch(function (error) {
				////console.log(error);
			});
	}
	publicopentimu = (id) => {

		const url = `/item_banks/${id}/set_public.json`;
		axios.post(url)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`公开题目成功`);
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
						item_type: this.state.item_type,
						keywords: this.state.keywords,
						page: this.state.page,
						per_page:10,
					};
					this.getdata(data);
				}
			}).catch((error) => {
			////console.log(error);
		})
	}

	getbasket_listdata = () => {
		// 获取试题篮展开的数据
		const url = "/item_baskets/basket_list.json";
		axios.get(url)
			.then((result) => {
					// ////console.log("getbasket_listdata");
					// ////console.log(result.data);
					this.setState({
						completion_questions_count: result.data.completion_questions_count,
						judgement_questions_count: result.data.judgement_questions_count,
						multiple_questions_count: result.data.multiple_questions_count,
						practical_questions_count: result.data.practical_questions_count,
						program_questions_count: result.data.program_questions_count,
						single_questions_count: result.data.single_questions_count,
						subjective_questions_count: result.data.subjective_questions_count,
					})

			}).catch((error) => {
			// ////console.log(error);
			this.setState({
				completion_questions_count: 0,
				judgement_questions_count: 0,
				multiple_questions_count: 0,
				practical_questions_count: 0,
				program_questions_count: 0,
				single_questions_count: 0,
				subjective_questions_count: 0,
			})
		})

	}


   //选用
	getitem_baskets=(data)=>{
		//选用题型可以上传单个 或者多个题型
		let url="/item_baskets.json";

		axios.post(url, data)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`选用成功`);
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
						item_type: this.state.item_type,
						keywords: this.state.keywords,
						page: this.state.page,
						per_page:10,
					};
					this.getdatasy(data);
					this.getbasket_listdata();
					// this.setState({
					// 	visible:true
					// })
				}
			}).catch((error) => {
			////console.log(error);
		})
	}
  // 撤销
	getitem_basketss=(id)=>{
		//选用题型可以上传单个 或者多个题型
		let url=`/item_baskets/${id}.json`;

		axios.delete(url)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`撤销成功`);
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
						item_type: this.state.item_type,
						keywords: this.state.keywords,
						page: this.state.page,
						per_page:10,
					};
					this.getdatasy(data);
					this.getbasket_listdata();
				}
			}).catch((error) => {
			////console.log(error);
		})
	}
	//全选试题库
	selectallquestionsonthispage=()=>{
		var item_idsdata=[];

		var arr= this.state.Contentdata.items;
		for(let data of arr) {
			if(data.item_type==="PROGRAM"){
				//编程题
				if(data.choosed===true){

				}else{
					//未选用
					if(data.program_attr.status===1){
						//已发布
						item_idsdata.push(data.id);
					}

				}

			}else{
				//不是编程题
				if(data.choosed===true){

				}else{
					//未选用
					item_idsdata.push(data.id);
				}
			}

		}
		const data={
			item_ids:item_idsdata
		}
		this.getitem_baskets(data);
		this.setState({
			selectallquestionsonthispages:true,
		})
	}

	//全选的状态

  //删除大题型
	Deletebigquestiontype =(item_type)=>{
		const  url=`/item_baskets/delete_item_type.json`;
		axios.delete((url), { data: {
				item_type:item_type
				}})
			.then((response) => {
				if (response.data.status == 0) {
					// this.props.showNotification('删除成功');
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
						item_type: this.state.item_type,
						keywords: this.state.keywords,
						page: this.state.page,
						per_page:10,
					};
					this.getdata(data);
					this.getbasket_listdata();
				}
			})
			.catch(function (error) {
				////console.log(error);
			});

	}


	//跳转
	gotopaperreview=()=>{

		this.props.history.replace("/paperreview/artificial");

	}

	setoj_status=(oj_status)=>{
		//编程题发布未发布
		this.setState({
			selectallquestionsonthispages:false,
			difficulty:null,
			oj_status:oj_status
		})
		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: this.state.item_type,
			keywords: this.state.keywords,
			page: this.state.page,
			per_page:10,
			oj_status:oj_status
		};
		this.getdata(data);
	}




	render() {
		let {
			page, per_page, items_count, Headertop, visible, placement, modalsType, modalsTypes,basket_list,
			completion_questions_count, judgement_questions_count, multiple_questions_count, practical_questions_count,
			program_questions_count, single_questions_count, subjective_questions_count,selectionbools
		} = this.state;

		const Datacount = completion_questions_count + judgement_questions_count
			+ multiple_questions_count + practical_questions_count
			+ program_questions_count
			+ single_questions_count
			+ subjective_questions_count;
		const isysladmins=this.props&&this.props.current_user&&this.props.current_user.admin?this.props.current_user.admin:false;
		const is_teacher=this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:false;
		const professional_certification=this.props&&this.props.current_user&&this.props.current_user.professional_certification?this.props.current_user.professional_certification:false;


		return (
			<div className="newMain clearfix"    ref={this.saveContainer}>
				{
					visible===true?
						<style>
							{
								`
						.newHeaders{
						position: fixed;
						top: 0px;
						z-index:  999 !important;
						}
						.ant-drawer {
    z-index: 800 !important;
}
						.ant-notification{
						position: fixed;
						z-index: 1500 !important;
						}
						.newFooter{
						 position: relative;
							z-index: 9999999 ;
						}
						`
							}
						</style>
						:""
				}
				{
					visible===true?
				<div
				style={{
					marginTop: "60px"
				}}></div>
				:""}
				{
					modalsTypes===true?
						<QuestionModals {...this.props}{...this.state} modalsTypes={modalsTypes} modalCancels={() => this.modalCancels()}
														setDownloads={(e) => this.setDownloads(e)}></QuestionModals>
						:""
				}
				{
					modalsType===true?
						<QuestionModal {...this.props}{...this.state} modalsType={modalsType} modalCancel={() => this.modalCancel()}
													 setDownload={() => this.setDownload()}></QuestionModal>
						:""
				}



				<style>
					{
						`
						.-task-sidebar{
						height: 30%;
						}
						`
					}
				</style>
				{
					isysladmins===true?
						<SiderBars
							Datacount={Datacount}
							myvisible={visible}
							{...this.props}
							{...this.state}
							showDrawer={() => this.showDrawer()}
							Headertop={Headertop}

						/>
						:
						is_teacher===true&&professional_certification===true?
							<SiderBars
								Datacount={Datacount}
								myvisible={visible}
								{...this.props}
								{...this.state}
								showDrawer={() => this.showDrawer()}
								Headertop={Headertop}

							/>
							:

						""
				}


				{/*顶部*/}

				<Headplugselections
					disciplinesdata={this.state.disciplinesdata}

					{...this.props}
					{...this.state}
					setdifficulty={(e) => this.setdifficulty(e)}
					setitem_types={(e) => this.setitem_types(e)}
					setdiscipline_id={(e)=>this.setdiscipline_id(e)}
					setsub_discipline_id={(e,id)=>this.setsub_discipline_id(e,id)}
					settag_discipline_id={(e)=>this.settag_discipline_id(e)}
				/>
				{/*头部*/}
				<Contentpart {...this.state} {...this.props}
										 Isitapopup={"false"}
										 chakanjiexiboolindex={this.state.chakanjiexiboolindex}
										 chakanjiexibool={(e)=>this.chakanjiexibool(e)}
										 getitem_basketss={(id)=>this.getitem_basketss(id)}
										 selectallquestionsonthispage={()=>this.selectallquestionsonthispage()}
										 getitem_baskets={(e)=>this.getitem_baskets(e)}
										 setdatafuns={(e) => this.setdatafuns(e)}
										 setdatafunsval={(e) => this.setdatafunsval(e)}
										 handleVisibleChanges={(e) => this.handleVisibleChanges(e)}
										 handleVisibleChange={(e) => this.handleVisibleChange(e)}
										 showmodels={(e) => this.showmodels(e)}
										 showmodelysl={(e) => this.showmodelysl(e)}
										 callback={(e) => this.callback(e)}
				             setoj_status={(e)=>this.setoj_status(e)}></Contentpart>

				{
					items_count&&items_count>10?
						<div className="mb30 clearfix educontent mt40 intermediatecenter">
							<Pagination showQuickJumper current={page} onChange={this.paginationonChange}
													pageSize={per_page}
													total={items_count}></Pagination>
						</div>
						:<div className="h30 clearfix educontent mt40 intermediatecenter">

						</div>
				}


				{/*抽屉效果*/}
				<style>
					{
						`
						 .ant-drawer-content-wrapper{
						width: 200px !important;
						overflow：hidden;
						margin-top: 62px;
						}
					 .ant-drawer-body{
						   height: 100%;
						   background:rgba(234,234,234,1);
						}
						.ant-drawer-close{
						   height: 40px;
						    display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								color:#ffffff;
				
						}
							.ant-drawer-close:hover{
									color:#ffffff;
							}
							.ant-drawer-close:active{
									color:#ffffff;
							}
						`
					}
				</style>

				<Drawer
					className="drawercontainer"
					placement={placement}
					closable={false}
					onClose={() => this.onClose()}
					visible={visible}
					mask={false}
				>

					{Datacount && Datacount > 0 ?
						<div>
							<div className="shitilang">
								试题篮
							</div>
							<div className="mt25 mb26">
							</div>
							{
								single_questions_count === 0 ?
									""
									: <div className="sortinxdirection "  >
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">单选题{'('}{single_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor " onClick={()=>this.showQuestionModals("SINGLE")}></i></p>
									</div>
							}
							{
								multiple_questions_count === 0 ?
									""
									:
									<div className="sortinxdirection" >
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">多选题{'('}{multiple_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor " onClick={()=>this.showQuestionModals("MULTIPLE")}></i></p>
									</div>
							}
							{
								judgement_questions_count === 0 ?
									""
									:
									<div className="sortinxdirection" >
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">判断题{'('}{judgement_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor " onClick={()=>this.showQuestionModals("JUDGMENT")}></i></p>
									</div>
							}
							{
								completion_questions_count === 0 ?
									""
									:
									<div className="sortinxdirection" >
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">填空题{'('}{completion_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor " onClick={()=>this.showQuestionModals("COMPLETION")}></i></p>
									</div>
							}
							{
								subjective_questions_count === 0 ?
									""
									:
									<div className="sortinxdirection" >
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">简答题{'('}{subjective_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor " onClick={()=>this.showQuestionModals("SUBJECTIVE")}></i></p>
									</div>
							}
							{
								practical_questions_count === 0 ?
									""
									:
									<div className="sortinxdirection">
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">实训题{'('}{practical_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor "></i></p>
									</div>
							}
							{
								program_questions_count === 0 ?
									""
									:
									<div className="sortinxdirection" >
										<p
											className="w50s intermediatecenterysls sortinxdirection font-14 xiaoshou xiaoshoums">编程题{'('}{program_questions_count}{')'}</p>
										<p className="w50s intermediatecenterysls xaxisreverseorder"><i
											className="iconfont icon-shanchu1 font-14 lg  lh30 icondrawercolor " onClick={()=>this.showQuestionModals("PROGRAM")}></i></p>
									</div>
							}

							<div className="intermediatecenter verticallayout mt42">

								<div className="drawerbutton xiaoshou" onClick={()=>this.gotopaperreview()}>
									试卷预览
								</div>
							</div>
						</div>
						:
						<div className="drawernonedatadiv intermediatecenter">
							<NoneData></NoneData>
						</div>
					}


				</Drawer>


			</div>
		)

	}


}

export default SnackbarHOC()(TPMIndexHOC(Question));
