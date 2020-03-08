import React,{ Component } from "react";
import {Checkbox,Input,Table, Pagination,Menu,Icon} from "antd";
import {TPMIndexHOC} from "../modules/tpm/TPMIndexHOC";
import {Link,NavLink} from 'react-router-dom';
import { WordsBtn ,ActionBtn,SnackbarHOC,markdownToHTML,getImageUrl} from 'educoder';
import axios from 'axios';
import './searchc.css'
const Search = Input.Search;



class SearchPage extends Component{
	constructor(props) {
		super(props);
		this.state={
			tab:"1",
			count:0,
			keywords:undefined,
			type:"subject",
			page:1,
			perpages:20,
			data:[],
			jupyterbool:false,

		}
	}
	//切换tab
	changeTab=(e)=>{
		// course 2 课堂,	shixun 0 实训项目  subject  1 实践课程  memo  3交流问答

   let types ="";
		if(parseInt(e.key)===0){
      types="shixun";
		}
		if(parseInt(e.key)===1){
			types="subject";

		}
		if(parseInt(e.key)===2){
			types="course";

		}
		if(parseInt(e.key)===3){
			types="memo";

		}
		this.setState({
			tab:e.key,
			type:types,
			page:1,
		})
		this.getdata(1,types,this.state.keywords);
	}

	componentDidMount(){
		let courstype=decodeURI(decodeURI(this.props.location.search));
		courstype = courstype.split('?value=');

		this.setState({
			keywords:courstype[1]
		})
		this.getdata(this.state.page,this.state.type,courstype[1]);

	}
	componentDidUpdate(prevProps) {
    if(prevProps.location.search!=this.props.location.search){
			let courstype=decodeURI(decodeURI(this.props.location.search));
			courstype = courstype.split('?value=');

			this.setState({
				keywords:courstype[1]
			})
			this.getdata(this.state.page,this.state.type,courstype[1]);
		}
	}

	setdatafunsval=(e)=>{
		this.setState({
			keywords:e.target.value
		})
	}

	setdatafuns =(value)=>{
		this.setState({
			keywords:value,
			page:1
		})
		this.props.history.replace(`/search?value=${value}`)
		this.getdata(1,this.state.type,value);
	}
	paginationonChanges = (pageNumber) => {
		this.setState({
			page: pageNumber,
			loadingstate: true,
		})
		this.getdata(pageNumber,this.state.type,this.state.keywords);
	}
	//获取数据
	getdata=(pages,type,keywords)=>{
		let url = "/search.json";
		this.setState({ loading: true })
		axios.get(url,{params:{
				keyword:keywords,
				type:type,
				page:pages,
				per_page:this.state.perpages,
			}
		}).then((response) => {
			this.setState({ loading: false })

			if(response === undefined){

				return
			}


			this.setState({
				count:response.data.count,
				data:response.data.results,
			})
		}).catch((error) => {


		});
	}

	render(){
		let {tab,count,data,page,perpages, type }=this.state;


		return(
			<div className="newMain clearfix">
				<style>{`
					.ziticor.iconfont {
						margin-bottom: 2px;
						display: inline-block;
						margin-right: 4px;
						font-size: 16px !important;
					}
					.shixundetailtopcss{
					}
				`}</style>
				<div className="shixunDetail_top shixundetailtopcss" >
					{/*<div style={{height:"53px"}}></div>*/}
					<div className="intermediatecenter" style={{ width: "100%"}}>
						<Search
							style={{ width: "800px", marginTop:"53px"}}
							className="packinput"
							value={this.state.keywords}
							enterButton={<span><Icon type="search" className="mr5"/> 搜索</span>}
							onInput={(e)=>this.setdatafunsval(e)}
							onSearch={ (value)=>this.setdatafuns(value)} />
					</div>

				</div>

				<div className="tabtitle">
					<div className="tabtitles2">
					<Menu  mode="horizontal" className="tabtitless"  selectedKeys={tab} onClick={this.changeTab}>
						<Menu.Item className={"tabtitle1"} key="1">实践课程</Menu.Item>
						<Menu.Item className={"tabtitle2"} key="2">翻转课堂</Menu.Item>
						<Menu.Item className={"tabtitle2"} key="0">实训项目</Menu.Item>
						<Menu.Item className={"tabtitle2"}  key="3">交流问答</Menu.Item>
					</Menu>
					</div>
				</div>
				{
					JSON.stringify(data) === "[]" && this.state.loading != true ?

						<div id="forum_list" className="forum_table">
							<div className="mh650 bjyss">
								<div className="edu-tab-con-box clearfix edu-txt-center">
									<img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
									<p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>
								</div>
							</div>

						</div>
						:
						<div>
							<div className="counttit">
								<p className="counttittext">共找到相关结果<span className="counttittexts">{count}</span>个</p>
							</div>


							<div className="mainx">
								<style>
									{
										`
										.maxnamewidth92{
										max-width: 92%;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
										cursor: default;
										}
										`
									}
								</style>
								<div className="educontent project-packages-list mb30">
									{data === undefined ? "" : data.map((item, key) => {
										return (
											<a key={key}
											  href={
													item.type==="shixun"?`/shixuns/${item.identifier}/challenges`:item.type==="course"?`${item.first_category_url}`:item.type==="subject"?`/paths/${item.id}`:item.type==="memo"?`/forums/${item.id}`:""
												}
												 target="_blank"
											>

											<div className="project-package-item">

												<div className={"font-16 color-dark fl "} style={{width:"100%"}} >
													{/*标题*/}
													<div className="sortinxdirection jupytertextheig" style={{width:"100%"}}>

														<span className={"markdown-body fonttext maxnamewidth92"}

																	dangerouslySetInnerHTML={{__html:item.title}}/>
														{
															type==="shixun"?
																(
																	item.is_jupyter===true?
																		<div className="jupytertext intermediatecenter ml20"><p className="jupytertextp">Jupyter</p></div>
																		:""
																)
																:""
														}
													</div>

													{/*描述*/}
													<div>




													{item.content.content === undefined || item.content.content===0?"": item.content.content.map((item4, key4) => {
														return (
															<span className={"markdown-body magr11 fontextcolor"}
																	 dangerouslySetInnerHTML={{__html: item4}} />
														)
													})
													}
													</div>

													<div>
													{/*内容*/}
													{item.content.description === undefined || item.content.description===0?"": item.content.description.map((item3, key3) => {
														return (
															<span className={"markdown-body magr11 fontextcolor"}
																	 dangerouslySetInnerHTML={{__html: item3}} />
														)
													})
													}
													</div>

													<div className="xuxianpro"></div>

													<div>
													{/*挑战名字*/}


													{item.content.challenge_names === undefined || item.content.challenge_names===0?"": item.content.challenge_names.map((item5, key5) => {
														return (
															<div className={"df"}>
																<span style={{flex: '0 0 82px'}}>关卡名称：</span>
																<span className={""}
																	 dangerouslySetInnerHTML={{__html: item5}} />
															</div>
														)
													})
													}
												</div>

													<div>
													{/*挑战标签*/}
													{item.content.challenge_tag_names === undefined || item.content.challenge_tag_names===0?"": item.content.challenge_tag_names.map((item6, key6) => {
														return (
															<div className={"df"}>
																<span style={{flex: '0 0 82px'}}>关卡标签：</span>
																<span className={key6>1?" tzbq ":" tzbqx"} style={{
																	width:"100%"
																}}
																		dangerouslySetInnerHTML={{__html:item6}} />
															</div>
														)
													})
													}
													</div>
													<div>
														{/*合作单位*/}
														{item.content.member_user_names === undefined || item.content.member_user_names===0?"": item.content.member_user_names.map((item7, key7) => {
															return (
																<div className={"df"}>
																	<span style={{flex: '0 0 82px'}}>合作团队：</span>
																	<span className={key7>1?" tzbq ":" tzbqx"}
																				dangerouslySetInnerHTML={{__html:item7}} />
																</div>
															)
														})
														}
													</div>


													<div className="mt20">
														{/* <span className="ziticor">
															<i className="fa fa-user ziticor"></i><span className="ml10">主讲：{item.author_name}</span>
														</span>
														<span className="ml10 ziticor "><span>{item.author_school_name}</span></span>
														<span className="ml20 ziticor">
															<i className="iconfont icon-shixunguanqia ziticor"></i>
															<span>任务:
																<span className="ml10 ziticor">{item.challenges_count===undefined?0:item.challenges_count}</span>
															</span>
														</span>
														<span className="ml20 ziticor">
															<i className="iconfont icon-chengyuan ziticor"></i>
															<span>学习人数:
																<span className="ml10 ziticor">{item.study_count===undefined?0:item.study_count}</span>
															</span>
														</span> */}

														<span className="ziticor">
															{/* <i className="fa fa-user ziticor"></i> */}
															<span className="">{item.author_name}</span></span>
															<span className="ml10 ziticor "><span>{item.author_school_name}</span>
														</span>
														{!!item.challenges_count && <span className="ml20 ziticor">
															{/* <i className="iconfont icon-shixunguanqia ziticor"></i> */}
															<span>任务:
																<span className="ml10 ziticor">{item.challenges_count}</span>
															</span>
														</span> }
														{!!item.study_count && <span className="ml20 ziticor">
															{/* <i className="iconfont icon-chengyuan ziticor"></i> */}
															<span>学习人数:
																<span className="ml10 ziticor">{item.study_count}</span>
															</span>
														</span>}

														{!!item.shixuns_count && <span className="ml20 ziticor">
															{/* <i className="iconfont icon-shixunguanqia ziticor"></i> */}
															<span>实训数:
																<span className="ml10 ziticor">{item.shixuns_count}</span>
															</span>
														</span>}
														{type == 'subject' && !!item.visits_count && <span className="ml20 ziticor">
															{/* <i className="iconfont icon-chengyuan ziticor" style={{ 'margin-bottom': '1px' }}></i> */}
															<span>访问数:
																<span className="ml10 ziticor">{item.visits_count}</span>
															</span>
														</span>}

														{!!item.members_count && <span className="ml20 ziticor">
															{/* <i className="iconfont icon-chengyuan ziticor"></i> */}
															<span>成员数:
																<span className="ml10 ziticor">{item.members_count}</span>
															</span>
														</span>}

														{!!item.all_replies_count && <span className="ml20 ziticor">
															{/* <i className="iconfont icon-huifu1 ziticor"></i> */}
															<span>回复数:<span className="ml10 ziticor">{item.all_replies_count}</span></span>
														</span> }

														{/* <span className="ml20 ziticor">
															<i className="iconfont icon-chengyuan ziticor"></i>
														<span>
														学习人数:<span className="ml10 ziticor">{item.study_count===undefined?0:item.study_count}</span></span></span> */}

													</div>
												</div>
											</div>

											</a>
										)
									})}


								</div>




							</div>


						</div>
				}


				{
					count && count && count> perpages ?
						<div className="edu-txt-center" style={{marginBottom:"30px",paddingBottom:"30px"}}>
							<Pagination showQuickJumper current={page}
													onChange={this.paginationonChanges} pageSize={perpages}
													total={count}></Pagination>
						</div>
						: ""
				}

			</div>

		)
	}
}

export default SnackbarHOC() (TPMIndexHOC  ( SearchPage ));
