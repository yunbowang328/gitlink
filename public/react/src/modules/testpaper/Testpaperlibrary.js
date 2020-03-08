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
	Input
} from "antd";
import {TPMIndexHOC} from "../tpm/TPMIndexHOC";
import NoneData from './component/NoneData';
import './testioncss/testioncss.css';
import Contentpart from "./component/Contentpart";
import SiderBar from "../tpm/SiderBar";
import Headplugselections from "../question/component/Headplugselections";
import QuestionModal from "./component/QuestionModal";
import QuestionModals from "./component/QuestionModals";
class Testpaperlibrary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Headertop: "",
			disciplinesdata:null,
			discipline_id:null,
			sub_discipline_id:null,
			tag_discipline_id:null,
			public:null,
			difficulty:null,
			item_type:null,
			keywords:null,
			page:1,
			per_page:10,
			booljupyterurls:false,
			Contentdata:[],
			items_count:0,
			defaultActiveKey:"1",
			modalsTypes:false,
			modalsType:false,
			timuid:0,
		}
	}
	getContainer = () => {
		return this.container;
	};
	saveContainer = container => {
		this.container = container;
	};

	//初始化
	componentDidMount() {
		let url = `/users/get_navigation_info.json`;
		axios.get(url, {}).then((response) => {
			// //////console.log("开始请求/get_navigation_info.json");
			// //////console.log(response);
			if (response != undefined) {
				if (response.status === 200) {
					this.setState({
						Headertop: response.data.top,
						Footerdown: response.data.down
					})
				}
			}
		});
		//获取题库筛选资料
		let urls = `/disciplines.json`;
		axios.get(urls, {params: {
				source:"question"
			}}).then((response) => {
			if (response) {
				this.setState({
					disciplinesdata: response.data.disciplines,
				})
			}
		});
	}

	paginationonChange=(pages)=>{
		this.setState({
			page:pages
		})
		var data={
			page:pages,
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			keywords: null,
			per_page:10,
		}
		this.getdata(data);
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
		var data={
			page:this.state.page,
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			keywords: value,
			per_page:10,
		}
		this.getdata(data);
	}
	callback = (key) => {
		this.setState({
			defaultActiveKey: key,
			difficulty:null,
			keywords:null,
			page:1,
		})
		var data={
			page:1,
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: key,
			difficulty:null,
			keywords: null,
			per_page:10,
		}
		this.getdata(data);
	}

	//获取数据
	getdata=(data)=>{
		const url = `/examination_banks.json`;
		this.setState({
			booljupyterurls:true,
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
				items_count: response.data.exam_count,
			})
		}).catch((error) => {
			//////console.log(error)
			this.setState({
				booljupyterurls:false,
			})
		});

	}
	setdiscipline_id=(discipline_id)=>{
		this.setState({
			discipline_id:discipline_id,
			sub_discipline_id:null,
			tag_discipline_id:null,
			keywords:null,
			page: 1,
			per_page:10,
		})
		var data = {
			discipline_id:discipline_id,
			sub_discipline_id:null,
			tag_discipline_id:null,
			public: this.state.defaultActiveKey,
			difficulty: this.props.difficulty,
			keywords: null,
			page: 1,
			per_page:10,
		};
		this.getdata(data);

	}
	setsub_discipline_id=(discipline_id,sub_discipline_id)=>{
		this.setState({
			sub_discipline_id:sub_discipline_id,
			tag_discipline_id:null,
			keywords:null,
			page:1,
			per_page:10,
		})
		var data = {
			discipline_id:discipline_id,
			sub_discipline_id:sub_discipline_id,
			tag_discipline_id:null,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			keywords: null,
			page:1,
			per_page:10,
		};
		this.getdata(data);
	}

	settag_discipline_id=(tag_discipline_id)=>{
		this.setState({
			tag_discipline_id:tag_discipline_id,
			keywords:null,
			page:1,
			per_page:10,
		})
		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			keywords: null,
			page: 1,
			per_page:10,
		};
		this.getdata(data);
	}


	modalCancels=()=>{
		this.setState({
			modalsTypes: false
		})
	}
	setDownloads=(item_type)=>{
		this.Deletebigquestiontype(item_type);
		this.setState({
			modalsTypes: false
		})
	}
	//删除大题型
	Deletebigquestiontype =(item_type)=>{

	}
	modalCancel = () => {
		this.setState({
			modalsType: false
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

	//公开试卷
	publicopentimu = (id) => {

		const url = `/examination_banks/${id}/set_public.json`;
		axios.post(url)
			.then((result) => {
				if (result.data.status == 0) {
					// this.props.showNotification(`公开试卷成功`);
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
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

	//删除试卷
	deletetimu = (id) => {

		const url = `/examination_banks/${id}.json`;
		axios.delete(url)
			.then((response) => {
				if (response.data.status == 0) {
					// this.props.showNotification('删除试卷成功');
					// props.history.push(response.data.right_url)
					var data = {
						discipline_id:this.state.discipline_id,
						sub_discipline_id:this.state.sub_discipline_id,
						tag_discipline_id:this.state.tag_discipline_id,
						public: this.state.defaultActiveKey,
						difficulty: this.state.difficulty,
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

	showmodels = (id) => {
		this.setState({
			modalsType: true,
			titilesm: "设为公开后，所有成员均可使用试卷",
			titiless: "是否设置为公开？",
			titbool: true,
			timuid: id
		})
	};

	Testpapereditor=(id)=>{
		this.props.history.push(`/paperlibrary/edit/${id}`);
	}




	showmodelysl = (id) => {
		this.setState({
			modalsType: true,
			titilesm: "确认删除后，无法撤销",
			titiless: "是否确认删除？",
			titbool: false,
			timuid: id
		})
	};

	setdifficulty=(difficulty)=>{
		this.setState({
			difficulty: difficulty,
			visiblemys: false,
			keywords:"",
			page: 1,
			per_page:10,
		})

		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: difficulty,
			keywords:null,
			page:1,
			per_page:10,
		};

		this.getdata(data);

	}



	setitem_types = (item_type) => {
		this.setState({
			item_type: item_type,
			visiblemyss: false,
			keywords:null,
			page: 1,
			per_page:10,
		})

		var data = {
			discipline_id:this.state.discipline_id,
			sub_discipline_id:this.state.sub_discipline_id,
			tag_discipline_id:this.state.tag_discipline_id,
			public: this.state.defaultActiveKey,
			difficulty: this.state.difficulty,
			item_type: item_type,
			keywords:"",
			page: 1,
			per_page:10,
		};

		this.getdata(data);
	}




	render() {
		let{Headertop,items_count,page,per_page,modalsTypes,modalsType}=this.state;

		const isysladmins=this.props&&this.props.current_user&&this.props.current_user.admin?this.props.current_user.admin:false;
		const is_teacher=this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:false;
		const professional_certification=this.props&&this.props.current_user&&this.props.current_user.professional_certification?this.props.current_user.professional_certification:false;


		return (
			<div className="newMain clearfix" ref={this.saveContainer}>
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
				{/*试卷库*/}
				<SiderBar
					{...this.props}
					{...this.state}
					showDrawer={() => this.showDrawer()}
					Headertop={Headertop}/>
				{/*顶部*/}
				<Headplugselections {...this.props} {...this.state}
													 disciplinesdata={this.state.disciplinesdata}
													 setdiscipline_id={(e)=>this.setdiscipline_id(e)}
													 setsub_discipline_id={(e,id)=>this.setsub_discipline_id(e,id)}
													 settag_discipline_id={(e)=>this.settag_discipline_id(e)}
													 setitem_types={(e) => this.setitem_types(e)}
													 setdifficulty={(e) => this.setdifficulty(e)}
				></Headplugselections>
				{/*头部*/}
				<Contentpart
					{...this.props}
					{...this.state}
					Isitapopup={"false"}
					Testpapereditor={(e)=>this.Testpapereditor(e)}
					setdifficulty={(e)=>this.setdifficulty(e)}
					showmodels={(e)=>this.showmodels(e)}
					showmodelysl={(e)=>this.showmodelysl(e)}
					setdatafuns={(key)=>this.setdatafuns(key)}
					callback={(key)=>this.callback(key)}
					setdatafunsval={(key)=>this.setdatafunsval(key)}
					setdifficulty={(bool)=>this.setdifficulty(bool)}
				>

				</Contentpart>
				{/*内容*/}



				{
					items_count&&items_count>10?
						<div className="mb30 clearfix educontent mt40 intermediatecenter">
							<Pagination showQuickJumper current={page} onChange={this.paginationonChange}
													pageSize={per_page}
													total={items_count}></Pagination>
						</div>
						:
						<div className="h30 clearfix educontent mt40 intermediatecenter">
						</div>
				}



			</div>
		)

	}


}

export default SnackbarHOC()(TPMIndexHOC(Testpaperlibrary));
