import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { Input ,Icon,Button,Pagination,Spin} from 'antd';
import moment from 'moment';
import '../packageconcnet.css';
import AccountProfile from"../../user/AccountProfile";
import LoginDialog from '../../login/LoginDialog';


const { Search } = Input;
let categorylist=[
	{name:"全部",value:undefined},
	{name:"前端开发",value:"front"},
	{name:"后端开发",value:"backend"},
	{name:"移动开发",value:"mobile"},
	{name:"数据库",value:"database"},
	{name:"云计算和大数据",value:"cloud_compute_and_big_data"},
	{name:"人工智能",value:"ai"},
	{name:"运维与测试",value:"devops_and_test"},
	{name:"其它",value:"other"},
]
//
function setcategorylist(val){
	let vals=""
	categorylist.some((item,key)=> {
			if (item.name === val) {
				vals=item.value
				return true
			}
		}
	)
	return vals
}



class PackageConcent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data:undefined,
			project_packages:undefined,
			category:undefined,
			keyword:undefined,
			sort_by:"recently",
			sort_direction:"desc",
			page:1,
			per_page:20,
			categories:[],
			isRender:false,
			AccountProfiletype:false,
			isSpin:false
		}
	}
	//desc’, ‘desc’, ‘asc’
	//否	string	排序，默认最新, ‘recently’, ‘price’
	//	否	string	类型, front,backend,mobile,database, cloud_compute_and_big_data,devops_and_test,ai,other
	componentDidMount() {
		window.document.title = '众包创新'
		let {category,keyword,sort_by,sort_direction,page}=this.state
  	this.setdatas(category,keyword,sort_by,sort_direction,page)

		let Url = `/project_package_categories.json`;
		axios.get(Url).then((response) => {
     // console.log(response)
			this.setState({
				categories:response.data.categories
			})
		}).catch((error) => {
			console.log(error)
		})

	}

   setdatas=(category,keyword,sort_by,sort_direction,page)=>{
		this.setState({
			isSpin:true
		})
		 let Url = `/project_packages.json`;
		 axios.get(Url,{params:{
				 category_id:category,
				 keyword:keyword,
				 sort_by:sort_by,
				 sort_direction:sort_direction,
				 page:page,
				 per_page:20,
			 }}
		 ).then((response) => {
			 this.setState({
				 data:response.data,
				 isSpin:false,
				 project_packages:response.data.project_packages
			 })
		 }).catch((error) => {
			 console.log(error)
		 })
	 }

	setdatafuns=(value)=>{
		let {category,keyword,sort_by,sort_direction,page}=this.state
		this.setState({
			keyword:value
		})
		this.setdatas(category,value,sort_by,sort_direction,page)
	}


	setcategory=(value)=>{
		let {category,keyword,sort_by,sort_direction,page}=this.state
		this.setState({
			category:value
		})
		this.setdatas(value,keyword,sort_by,sort_direction,page)
	}

	setsort_byfun=(value)=>{
		let {category,keyword,sort_by,sort_direction,page}=this.state

		this.setState({
			sort_by:value
		})
		let sort_directionvalue;
		if(value===sort_by){
			if(sort_direction==="desc"){
				this.setState({
					sort_direction:"asc"
				})
				sort_directionvalue="asc";
			}else{
				this.setState({
					sort_direction:"desc"
				})
				sort_directionvalue="desc";
			}
		}else{
			this.setState({
				sort_direction:"desc"
			})
			sort_directionvalue="desc";
		}

		this.setdatas(category,keyword,value,sort_directionvalue,page)
	}

	onReleaseRequirements=(url)=>{

		let{current_user} =this.props;
		if(current_user===undefined){
			this.setState({
				isRender:true
			})
			return
		}
		if(current_user&&current_user.login===""){
			this.setState({
				isRender:true
			})
			return;
		}

		if(current_user&&current_user.profile_completed===false){
			this.setState({
				AccountProfiletype:true
			})
			return;
		}
		if(url !== undefined || url!==""){
			window.location.href = url;
		}

	}

	// 登录
	Modifyloginvalue=()=>{
		this.setState({
			isRender:false,
		})
	}

	hideAccountProfile=()=>{
		this.setState({
			AccountProfiletype:false
		})
	}

	onChangePagelist=(pageNum)=> {

		this.setState({
			page: pageNum
		})
		let {category, keyword, sort_by, sort_direction} = this.state;
		this.setdatas(category, keyword, sort_by, sort_direction, pageNum)

	}


	render() {
		let {data,page,category,sort_by,sort_direction,project_packages,
			isRender,AccountProfiletype
		}=this.state;

		return (
			<div className="educontent clearfix mtf10" style={{flex: "1 0 auto"}}>
				{isRender===true?<LoginDialog
					Modifyloginvalue={()=>this.Modifyloginvalue()}
					{...this.props}
					{...this.state}
				/>:""}

				{AccountProfiletype===true?<AccountProfile
					hideAccountProfile={()=>this.hideAccountProfile()}
					{...this.props}
					{...this.state}
				/>:""}
				<div className="stud-class-set">
					<div className="news">
						<div className="edu-class-inner container clearfix">
							<div className="member for-content-0 for-content">
								<div className="people clearfix mb60">


									{/*concent*/}
									<div className="mb30">
										<div className="clearfix">
												<p className="clearfix" >
													<p style={{height: '50px'}}>
														<Search placeholder="输入标题名称进行检索"

																		className="packinput"
																		enterButton={<span><Icon type="search" className="mr5"/> 搜索</span>}
																		onSearch={ (value)=>this.setdatafuns(value)} />
														<Button type="primary"  className="setissues fr" size={"large"}>
															<a onClick={()=>this.onReleaseRequirements("/crowdsourcing/new")}>发布需求</a>
														</Button>
													</p>
												</p>
										</div>
									</div>

									<div className="edu-back-white mb30">
										<p className="clearfix padding30">
											<p className="clearfix mb30 shaiContent">
												<span className="shaiTitle fl mt3">类型：</span>
												<div className="fl pr shaiAllItem pagetype">
													<li className={category===undefined?"shaiItem shixun_repertoire active":"shaiItem shixun_repertoire"}  onClick={()=>this.setcategory(undefined)}>全部</li>
													{this.state.categories.map((item,key)=>{
														return(
															<li key={key} className={category===item.id?"shaiItem shixun_repertoire active":"shaiItem shixun_repertoire"} value={item.id} onClick={()=>this.setcategory(item.id)}>{item.name}</li>
														)
													})}

												</div>
											</p>

											<p className="clearfix shaiContent">
												<span className="shaiTitle fl mt3">排序：</span>
												<div className="fl pr shaiAllItem">
													<li className="shaiItem shixun_repertoire" value="recently" onClick={()=>this.setsort_byfun("recently")}>
													 <span className={sort_by==="recently"?"color-blue":""}>最新</span>
													 <sapn className="relativef">
														 <i className={sort_by==="recently"&&sort_direction==="asc"?
															 "iconfont icon-sanjiaoxing-up font-12 topsj color-blue" :"iconfont icon-sanjiaoxing-up font-12 topsj"}></i>
														 <i className={sort_by==="recently"&&sort_direction==="desc"?
															 "iconfont icon-sanjiaoxing-down font-12 bottomsj color-blue":"iconfont icon-sanjiaoxing-down font-12 bottomsj"}></i>
													 </sapn>
													</li>

													<li className="shaiItem shixun_repertoire " value="price" onClick={()=>this.setsort_byfun("price")}>
														<span  className={sort_by==="price"?"color-blue":""}>价格</span>
														<sapn className="relativef">
															<i className={sort_by==="price"&&sort_direction==="asc"?
																"iconfont icon-sanjiaoxing-up font-12 topsj color-blue" :"iconfont icon-sanjiaoxing-up font-12 topsj"}></i>
															<i className={sort_by==="price"&&sort_direction==="desc"?
																"iconfont icon-sanjiaoxing-down font-12 bottomsj color-blue":"iconfont icon-sanjiaoxing-down font-12 bottomsj"}></i>
														</sapn>
													</li>
												</div>
											</p>
										</p>
									</div>

									<Spin size="large" className="educontent project-packages-list" spinning={this.state.isSpin}>
									{project_packages&&project_packages.map((item,key)=>{
										return(
											<div className="educontent project-packages-list mb30" key={key}>

												<div className="project-package-item">

													<div className="item-image">
														<img src={"/images/educoder/project_packages/"+setcategorylist(item.category_name)+".png"}/>
													</div>

													<div className=" item-body">

														<div className=" item-head mbf10">

															<div className=" item-head-title">
																<a className={"fl mt3 font-20 font-bd color-dark maxwidth670 "}
																	 onClick={()=>this.onReleaseRequirements("/crowdsourcing/"+item.id)}
																	 title={item.title}
																>{item.title}</a>
															</div>

															<div className=" item-head-blank"></div>

															<div className=" item-head-price mtf12">
																{item.min_price===null?"":<span>￥{item.min_price}</span>}
																{item.max_price===null||item.min_price===null?"":<span>~</span>}
																{item.max_price===null?"":<span>￥{item.max_price}</span>}
																{item.min_price===null&&item.max_price===null?<span>可议价</span>:""}
															</div>

														</div>

														<div className=" item-category mt10">
															<div className=" item-category-item">{item.category_name}</div>
														</div>

														<div className=" item-other">
															<div className=" item-group item-other-visit">
																<span className=" item-group-icon mr10"><i className="fa fa-eye"></i></span>
																<span className=" item-group-text">{item.visit_count}人浏览</span>
															</div>
															<div className=" item-group item-other-deadline">

																<span className=" item-group-icon mr10"><i className="fa fa-clock-o"></i></span>
																<span className=" item-group-text">{moment(item.deadline_at).format("YYYY-MM-DD HH:mm")}竞标截止</span>

															</div>
															<div className=" item-group item-other-bidding ml0 pagemancenter">

																<span className=" item-group-icon mr10"><i className="fa fa-user" ></i></span>
																<span className=" item-group-text">{item.bidding_users_count}人竞标</span>

															</div>
															{/*<div className=" item-other-blank"></div>*/}
															<div className=" item-group item-other-publish-at">
																{item.published_at===null?<span className="item-group-text">更新于：{moment(item.updated_at).format("YYYY-MM-DD HH:mm")} </span>:
																<span className=" item-group-text">发布于：{moment(item.published_at).format("YYYY-MM-DD HH:mm")} </span>}
															</div>
														</div>

													</div>

												</div>
											</div>
										)
									})}
									</Spin>

									{project_packages&&project_packages.length===0?<div className="edu-back-white">
										<div className="edu-tab-con-box clearfix edu-txt-center">
											<img className="edu-nodata-img mb20" src="https://www.educoder.net/images/educoder/nodata.png" />
											<p className="edu-nodata-p mb20">暂无数据哦~</p></div>
									</div>:""}

									<div className={"mt40"}>
										<Pagination className="edu-txt-center" onChange={this.onChangePagelist}  hideOnSinglePage={true} pageSize={20} current={page} total={data&&data.count} />
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PackageConcent;

