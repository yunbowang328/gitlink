import React, { Component } from 'react';
import { Breadcrumb,Layout,Table, Divider, Tag,Badge,Row, Col,Button, Menu, Icon} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {markdownToHTML,getImageUrl} from 'educoder';
import CompetitionContents from './CompetitionCommonChild/CompetitionContents';
import CompetitionContentsChart from './CompetitionCommonChild/CompetitionContentsChart';
import CompetitionContentsMd from './CompetitionCommonChild/CompetitionContentsMd';
import CompetitionContentspdf from './CompetitionCommonChild/CompetitionContentspdf';

import './CompetitionCommon.css';

const {Sider } = Layout;

class CompetitionCommon extends Component{
	constructor(props) {
		super(props)
		this.state={
			data: undefined,
			bannerdata: undefined,
			module_type: undefined,
			mdContentdata: undefined,
			chart_rules: undefined,
			Competitionedittype: false,
			chartdata: undefined,
			has_url: false,
			signupdata: undefined
		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		if(this.props.match.params.identifier!=null){
			this.getbannerdata();
			// this.setState({
			// 	thiskeys:this.props.location.search.replace('?menu=', '')
			// })
			// let url=`/competitions/${this.props.match.params.identifier}.json`;
			// axios.get(url).then((response) => {
			// 	if(response.status===200){
			// 		this.setState({
			// 			bannerdata:response.data
			// 		})
			// 	}
			// }).catch((error) => {
			// 	//console.log(error)
			// })
		}
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.user != this.props.user) {

			//console.log("componentDidUpdatess");
			//console.log(this.props.user);
			if (this.props.user && this.props.user.login != "") {
				const zul = `/competitions/${this.props.match.params.identifier}/competition_staff.json`;
				axios.get((zul)).then((result) => {
					if (result) {
						if (result.data) {
							this.setState({
								signupdata: result.data
							})
						}
					}
				}).catch((error) => {
					////console.log(error);
				})
			}
		}

	}
	//获取头部信息
	getbannerdata=()=>{
		// let menuid=this.props.location.search.replace('?menu=', '');
		let query=this.props.location&&this.props.location.search;
		const types = query.split('&')
		const menuid = types[0].split('?menu=')
		let url=`/competitions/${this.props.match.params.identifier}/common_header.json`;
		axios.get(url).then((response) => {
			if(response.status===200){
				this.setState({
					data: response.data,
					thiskeys: menuid[1] === undefined || menuid[1] === "" ? response.data.competition_modules[0].id : menuid[1],
					mode: response.data.mode
				})
				if(menuid[1]===undefined||menuid[1]===""){
					this.getrightdata(
						response.data.competition_modules[0].id,
						response.data.competition_modules[0].module_type,
						response.data.competition_modules[0].module_url,
						response.data.competition_modules[0].has_url
					)
				}else{
					let newlist=response.data.competition_modules;
					newlist.map((item,key)=>{
						if(`${item.id}`===`${menuid[1]}`){
							this.getrightdata(
								item.id,
								item.module_type,
								item.module_url,
								item.has_url
							)
						}
					})
				}
			}
		}).catch((error) => {
			//console.log(error)
		})

		//this.props.user  有可能为空

		if (this.props.user && this.props.user.login != "") {
			const zul = `/competitions/${this.props.match.params.identifier}/competition_staff.json`;
			axios.get((zul)).then((result) => {
				if (result) {
					if (result.data) {
						this.setState({
							signupdata: result.data
						})
					}
				}
			}).catch((error) => {
				////console.log(error);
			})
		}

	}

	getrightdatas=(e)=>{
		let keys = parseInt(e.key);
		this.getlistdata(keys)
		this.props.history.replace(`?menu=${keys}`);
	}

	getlistdata=(keys,listkey)=>{

		let{data}=this.state;
		this.setState({
			thiskeys:keys
		})
		data&&data.competition_modules.map((item,key)=>{
			if(item.module_type!="enroll") {
				if (keys === item.id) {
					this.getrightdata(item.id, item.module_type, item.module_url, item.has_url, listkey)
					return
				}
			}
		})
	}

	getnewchartdata=(typeid,tabkey)=>{
		if(typeid==="chart"){
			let url=`/competitions/${this.props.match.params.identifier}/chart_rules.json`;
			axios.get(url)
				.then((response) => {
					if(response.status===200){
						this.setState({
							chart_rules:response.data,
							tabkey: tabkey === undefined ? response.data.stages[0].id === null ? "0" : `${response.data.stages[0].id}` : tabkey
						})


					}
				}).catch((error) => {
				//console.log(error)
			})
		}
	}

	getrightdata=(id,typeid,module_url,has_url,listkey)=>{

		// if(typeid==="enroll"){
		// 	this.props.history.replace(`/competitions/${this.props.match.params.identifier}/enroll`);
		//   return
		// }

		this.getnewchartdata(typeid, listkey)

		if(has_url===false){
			let url=`${module_url}`;
			axios.get(url).then((response) => {
				if(response.status===200){

					if(typeid==="chart"){
						this.setState({
							chartdata:response.data
						})
					}else{
						this.setState({
							mdContentdata:response.data
						})
					}

				}
			}).catch((error) => {
				//console.log(error)
			})
		}else{
			if (module_url.substring(0, 7) == 'http://' || module_url.substring(0, 8) == 'https://') {
				// window.location.href= module_url
				window.open(module_url)
			}else{
				window.open(`https://${module_url}`)
				// window.location.href=;
			}
			return
		}

		this.setState({
			module_id:id,
			module_type:typeid,
			has_url:has_url
		})

	}

	Competitionedit=()=>{
		this.setState({
			Competitionedittype: true
		})
	}

	hideCompetitionedit=()=>{
		this.setState({
			Competitionedittype:false
		})

	}
	newgotocourse=(url)=>{
		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		if(this.props.checkIfProfileCompleted()===false){
			this.props.showProfileCompleteDialog()
			return
		}
		window.open(url);

	}

	gotocourse=(url)=>{
		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		if(this.props.checkIfProfileCompleted()===false){
			this.props.showProfileCompleteDialog()
			return
		}

		if(url===undefined){
			let {data,signupdata}=this.state;
			// if(signupdata.enrolled===true){
			// 	this.props.history.replace(`/courses/${data.course_id}`);
			// }else{	}

				if (data.member_of_course === true) {
					// this.props.history.replace(`/courses/${data.course_id}`);
					window.open(`/courses/${data.course_id}`)
				} else {
					// 以学生身份调用加入课堂 进入课堂首页
					let url = "/courses/apply_to_join_course.json"
					axios.post(url, {
							invite_code: data.invite_code,
							student: 1
						}
					).then((response) => {
						if (response.data.status === 0) {
							// this.props.history.replace();
							this.getbannerdata()
							window.open(`/courses/${data.course_id}`);

						}
					})

				}

		}else{

			if (url === "personal") {
				let urls = `/competitions/${this.props.match.params.identifier}/enroll`;
				this.Personalregistration(urls)
			} else {
				window.open(url);
			}

		}
	}


	Personalregistration = (urls) => {

		let {signupdata} = this.state;

		if (signupdata.enroll_ended === true) {
			//已截止
			this.props.showNotification(`报名已截止`);
			return;
		}
		if (signupdata.enrolled === true) {
			this.props.showNotification(`你已经报名,不能重复报名！`);
			return;
		}
		const url = `/competitions/${this.props.match.params.identifier}/competition_teams.json`;
		axios.post(url).then((response) => {
			if (response) {
				if (response.data) {
					this.props.showNotification(`报名成功,预祝您夺得桂冠!`);
					// this.props.history.replace(urls);
					this.getbannerdata()
					window.open(urls)
				}
			}
		}).catch((error) => {

		});
	}


	Competitioncallback=(key)=>{
		this.setState({
			tabkey:key
		})
		let url=`/competitions/${this.props.match.params.identifier}/charts.json`;
		axios.get(url,{params:{
				stage_id:key===0||key===null?undefined:key
			}}).then((response) => {
			if(response.status===200){
				this.setState({
					chartdata:response.data
				})
			}
		}).catch((error) => {
			//console.log(error)
		})

	}


	render() {
		let {data, module_type, Competitionedittype, signupdata} = this.state;

		return (
			data===undefined?"":<div className={"educontent clearfix mt20 "}>

				<Breadcrumb separator=">">
					<Breadcrumb.Item><Link to={"/competitions"}>在线竞赛</Link></Breadcrumb.Item>
					<Breadcrumb.Item>{data && data.name}</Breadcrumb.Item>
				</Breadcrumb>

				<div className={"mt10 relative"}>

					<Row className={"CompetitionCommonbanner"}>
						{data.competition_status === "nearly_published" ?
							data && data.permission.editable === true ? "" :
								<div className={"CompetitionsListzhezhao"}>即将发布 敬请期待</div> : ""}
						<img className={"Commonimg"}
								 src={data.competition_status === "ended" ? getImageUrl(`images/educoder/competitions/groups1.png`) : data.competition_status === "nearly_published" ? getImageUrl(`images/educoder/competitions/groups2.png`) : data.competition_status === "progressing" ? getImageUrl(`images/educoder/competitions/groups3.png`) : ""}/>
						<Col span={15} className={"Commonimgbox"}>
							<img className={"image_urlbox"}
									 src={data === undefined ? getImageUrl(`images/educoder/competitions/mainbanner.jpg`) : data.avatar_url === null ? getImageUrl(`images/educoder/competitions/mainbanner.jpg`) : getImageUrl(data.avatar_url)}/>
						</Col>
						<Col className={"CompetitionCommonbannerfont"} span={9}>

							<Col
								className={data && data.name.length > 15 ? "competitionbannerdiv mt30" : "competitionbannerdiv mt30"}>{data && data.name}</Col>

							<Col className={"competitionbannerdiv mt10"}>
								<Col className={"Competitioncolor9b"}>竞赛时间：<span
									className={"color000"}>{data && data.start_time}～{data && data.end_time}</span></Col>
								{/*<Col></Col>*/}
							</Col>
							<style>
								{
									`
								  	.ant-col-6{
												width: 30%;
										}
									  `
								}
							</style>
							<Col className={"competitionbannerdiv mt10"}>
								<Row gutter={16}>
									<Col className="gutter-row" span={6}>
										<div className="gutter-box CompetitionsIndexdadels Competitioncolor77">奖金</div>
									</Col>
									<Col className="gutter-row ml20 rankbeicenter" span={6}>
										<div className="gutter-box CompetitionsIndexdadels Competitioncolor77">浏览数</div>
									</Col>
									<Col className="gutter-row rankbeicenter" span={6}>
										<div className="gutter-box CompetitionsIndexdadels Competitioncolor77">报名数</div>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col className="gutter-row" span={6}>
										<div
											className="gutter-box CompetitionsIndexbottomvalue Competitioncolor516">¥{data && data.bonus}</div>
									</Col>
									<Col className="gutter-row ml20 rankbeicenter" span={6}>
										<div
											className="gutter-box CompetitionsIndexbottomvalue Competitioncolor516">{data.competition_status === "nearly_published" ? "--" : data && data.visits_count}</div>
									</Col>
									<Col className="gutter-row rankbeicenter" span={6}>

										{data.competition_status === "ended" ?
												<div className={data.mode === 2 ?data.member_of_course==true?"gutter-box CompetitionsIndexbottomvalue Competitioncolor516 cursorpointer":"gutter-box CompetitionsIndexbottomvalue Competitioncolor516":"gutter-box CompetitionsIndexbottomvalue Competitioncolor516 cursorpointer"}
													// 已结束onClick={data.competition_status === "nearly_published" ? "" : () => this.gotocourse(`/competitions/${this.props.match.params.identifier}/enroll`)}
													onClick={	data.mode === 2 ?data.member_of_course==true?() => this.newgotocourse(`/courses/${data.course_id}`):"":() => this.newgotocourse(`/competitions/${this.props.match.params.identifier}/enroll`)}
												>{data && data.member_count}</div>
										 :data.competition_status === "nearly_published" ?
												<div className="gutter-box CompetitionsIndexbottomvalue Competitioncolor516"
													// onClick={data.competition_status === "nearly_published" ? "" : () => this.gotocourse(`/competitions/${this.props.match.params.identifier}/enroll`)}
												>{"--"}</div> :
												data.competition_status === "progressing" ?
												data.mode === 2 ?
													<div className="gutter-box CompetitionsIndexbottomvalue Competitioncolor516 cursorpointer" onClick={() => this.gotocourse()}>{data && data.member_count}</div> : signupdata && signupdata.personal === true ?
														<div className="gutter-box CompetitionsIndexbottomvalue Competitioncolor516 cursorpointer" onClick={() => this.gotocourse("personal")}>{data && data.member_count}</div> : <div
															className="gutter-box CompetitionsIndexbottomvalue Competitioncolor516 cursorpointer"
															onClick={() => this.gotocourse(`/competitions/${this.props.match.params.identifier}/enroll`)}>{data && data.member_count}</div>
											:""}

									</Col>
								</Row>
							</Col>

							{data.competition_status === "ended" ? <style>
								{
									`
										.Competitionfontsize22{
													height: 50px;
													border-radius: 4px;
											}
										`
								}
							</style> : <style>
								{
									`
										.Competitionfontsize22{
													height: 50px;
													background: rgba(76,172,255,1);
													border-radius: 4px;
											}
										`
								}
							</style>}
							<Col className={"competitionbannerdiv mt20"}>
								{data.competition_status === "ended" ?
									<Button type="primary" block className={"Competitionfontsize22"} disabled={true}>
										已结束
									</Button> : data.enroll_end === true ?
										<Button type="primary" block className={"Competitionfontsize22"} disabled={true}>
											{data.competition_status === "nearly_published" ? "未发布" : "报名截止"}
										</Button> :
										data.competition_status === "progressing" ?
											<Button type="primary" block className={"Competitionfontsize22"}>
												{data.mode === 2 ?
													<a onClick={() => this.gotocourse()}>立即报名</a> : signupdata && signupdata.personal === true ?
														<a onClick={() => this.gotocourse("personal")}>立即报名</a> : <a
															onClick={() => this.gotocourse(`/competitions/${this.props.match.params.identifier}/enroll`)}>立即报名</a>}
										</Button>:""}
							</Col>
							<Col
								className={"mt10 Competitionfontsize16"}>{data && data.enroll_end_time === null ? "" : `报名截止时间：${data && data.enroll_end_time}`}</Col>
						</Col>
					</Row>
				</div>
				<style>
					{
						`
						.CompetitionMenu .ant-menu-item a{
						    overflow:hidden;
								text-overflow:ellipsis;
								white-space:nowrap
						}
						`
					}
				</style>
				<Layout className={'teamsLayout mt40'}>
					<Sider>
						<Menu mode="inline" className="CompetitionMenu" selectedKeys={[`${this.state.thiskeys}`]}
									onClick={(e) => this.getrightdatas(e)}>
							{data && data.competition_modules.map((item, key) => {
								if (item.module_type != "enroll") {
									return (
										<Menu.Item key={item.id}>
											{/*{item.has_url===false?<span*/}
											{/*// onClick={()=>this.getrightdata(item.id,item.module_type,item.module_url,item.has_url)}*/}
											{/*>{item.name}</span>:<a*/}
											{/*// target="_blank"*/}
											{/*href={item.module_url}*/}
											{/*// onClick={()=>this.getrightdata(item.id,item.module_type)}*/}
											{/*>{item.name}</a>}*/}
											<a title={item.name}>{item.name}</a>
										</Menu.Item>
									)
								}
							})}
						</Menu>

						{/*<Menu mode="inline" className="CompetitionMenu" onClick={(e)=>this.isdownloadpdf(e)}>*/}
						{/*<Menu.Item>*/}
						{/*<a>证书下载</a>*/}
						{/*</Menu.Item>*/}
						{/*</Menu>*/}
					</Sider>

					{module_type === "certificate" ? "" : <Layout className={"teamsLayoutleft CompetitionContents mb30"}>
						{this.state.module_type === "chart" ? Competitionedittype === false ? <CompetitionContentsChart
							{...this.props}
							{...this.state}
							Competitionedit={() => this.Competitionedit()}
							Competitioncallback={(e) => this.Competitioncallback(e)}
						/> : "" : Competitionedittype === false ? <CompetitionContents
							Competitionedit={() => this.Competitionedit()}
							{...this.props}
							{...this.state}
						/> : ""}
						{/*<CompetitionContentsChart*/}
						{/*{...this.props}*/}
						{/*{...this.state}*/}
						{/*/>*/}
						{Competitionedittype === true ? <CompetitionContentsMd
							hideCompetitionedit={() => this.hideCompetitionedit()}
							getlistdata={(keys, listkey) => this.getlistdata(keys, listkey)}
							Competitioncallback={(e) => this.Competitioncallback(e)}
							{...this.props}
							{...this.state}
						/> : ""}
					</Layout>}

					{module_type === "certificate" ? <Layout className={"teamsLayoutleft CompetitionContents mb30"}>
						<CompetitionContentspdf
							{...this.props}
							{...this.state}
						/>
					</Layout> : ""}
				</Layout>

			</div>

		)
	}
}
export default CompetitionCommon;
