import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { Input ,Icon,Button,Pagination,DatePicker,Breadcrumb} from 'antd';
import { handleDateString,markdownToHTML,bytesToSize,getImageUrl} from 'educoder';
import NEITaskDetailsModel from './NEITaskDetailsModel';
import moment from 'moment';
import '../packageconcnet.css';
import './pds.css'
import gouxuan from './img/gouxuan.png'
import weigouxuan from './img/weigouxuan.png'
const { Search } = Input;
// let categorylist=[
// 	{name:"全部",value:undefined},
// 	{name:"前端开发",value:"front"},
// 	{name:"后端开发",value:"backend"},
// 	{name:"移动开发",value:"mobile"},
// 	{name:"数据库",value:"database"},
// 	{name:"云计算和大数据",value:"cloud_compute_and_big_data"},
// 	{name:"人工智能",value:"ai"},
// 	{name:"其他",value:"other"},
// ]
//
// function setcategorylist(val){
// 	let vals=""
// 	categorylist.some((item,key)=> {
// 			if (item.value === val) {
// 				vals=item.name
// 				return true
// 			}
// 		}
// 	)
//
// 	return vals
// }

class PackageIndexNEITaskDetails extends Component {
	constructor(props) {
		super(props)
		this.contentMdRef = React.createRef();
		this.state = {
			data:undefined,
			modalCancel: false,
			overtype:false,
			setbiddingmantype:false,
			datalist:[]
		}
	}

	componentDidMount() {
    this.getdatas()
		window.document.title = '众包创新'
	}

   getdatas=()=>{
		 let url =`/project_packages/${this.props.match.params.id}.json`;
		 axios.get(url).then((response) => {
		 	if(response.data.status!=401&&response.data.status!=403&&response.data.status!=408&&response.data.status!=409)[
				this.setState({
					data:response.data
				})
			]
		 }).catch((error) => {
			 console.log(error);

		 })
	 }

	setbiddingman=()=>{
    this.setState({
			setbiddingmantype:true
		})
	}

	notsetbiddingman=()=>{
		let {data} =this.state;
		let gouxuans2=data.bidding_users
		for (var i=0;i<gouxuans2.length;i++){
				if(gouxuans2[i].bool === true){
					gouxuans2[i].bool=false;
				}
		}
		this.setState({
			setbiddingmantype:false,
			datalist:[]
		})
	}
	modalCancel=()=>{
		this.setState({
			modalCancel:false
		})
	}

	setbiddingusers=()=>{
    let{datalist}=this.state;
    if(datalist.length>0){
			this.setState({
				applytype:true,
				applyvalue:`选择的${datalist.length}个竞标者将被设定为“中标”`,
				applybottom:"是否确认执行？",
				applycancel:this.setApplycancel,
				applyconfirm:this.setApplysumbit
			})
		}

	}

	setApplysumbit=()=>{
		this.setState({
			applytype:false,
		})
		let{datalist}=this.state;
		let newlist=[];
		datalist.map((item,key)=>{
				newlist.push(item.id)
		})


		let url=`/project_packages/${this.props.match.params.id}/bidding_users/win.json`;
		axios.post(url,{
			user_ids:newlist
		}).then((response) => {
			if(response.data.status===0){
				this.props.showSnackbar("提交成功");
				this.setState({
					setbiddingmantype:false
				})
				this.getdatas()
			}else if(response.data.status===-1){
				this.props.showSnackbar(response.data.message);
			}
		}).catch((error) => {
			console.log(error)
		})

	}



	Clickteacher2=(e)=>{
		let {data} =this.state;
		let newlist=[]
		let gouxuans2=data.bidding_users
		for (var i=0;i<gouxuans2.length;i++){
			if(gouxuans2[i].id === e){
				// console.log("51");
				// console.log(e);
				if(gouxuans2[i].bool === true){
					gouxuans2[i].bool=false;
				}else{
					gouxuans2[i].bool=true;
					newlist.push(gouxuans2[i])
				}
			}else{
				if(gouxuans2[i].bool === true){
					newlist.push(gouxuans2[i])
				}
			}
		}
		console.log(newlist);
		this.setState({
			datalist:newlist,
		})

	}
	setover=()=>{
		this.setState({
			overtype:true
		})
	}

	setout=()=>{
		this.setState({
			overtype:false
		})
	}

	deletePackages=()=>{
		this.setState({
			applytype:true,
			applyvalue:"是否确认删除?",
			applycancel:this.setApplycancel,
			applyconfirm:this.setApplydelect
		})
	}

	setApplydelect=()=>{
		this.setState({
			applytype:false,
		})
		let url=`/project_packages/${this.props.match.params.id}.json`;
		axios.delete(url ).then((response) => {
			// const status = response.data.status
			// console.log(response)
			this.props.showSnackbar('删除成功');
		}).catch((error) => {
			console.log(error)
		})
	}

	setBiddingApply=()=>{
		this.setState({
			applytype:true,
			applyvalue:"是否确认报名?",
			applycancel:this.setApplycancel,
			applyconfirm:this.setApplyconfirm
		})
	}

	setApplycancel=()=>{
		this.setState({
			applytype:false,
		})
	}

	setApplyconfirm=()=>{
		this.setState({
			applytype:false,
		})
		let url=`/project_packages/${this.props.match.params.id}/bidding_users.json`;
		axios.post(url).then((response) => {
			if(response.data.status===0){
				this.props.showSnackbar("报名成功");
				this.getdatas()
			}else if(response.data.status===-1){
				this.props.showSnackbar(response.data.message);
			}
		}).catch((error) => {
			console.log(error)
		})

	}
	goback = () => {
		// window.history.go(-1)
		// window.location.href="/crowdsourcing";
	  this.props.history.goBack()
	}

	render() {
		let {overtype,data}=this.state;
	 // console.log(data&&data.creator.id)
		let datalogin=data&&data.creator.id;
		let userlogin=this.props.current_user&&this.props.current_user.user_id;

		console.log(datalogin===userlogin)
		// console.log(this.props.current_user&&this.props.current_user.user_id)
		return (
			data===undefined?"":<div>
				<div className="clearfix">
					<NEITaskDetailsModel
						applytype={this.state.applytype}
						applyvalue={this.state.applyvalue}
						applybottom={this.state.applybottom}
						applycancel={this.state.applycancel}
						applyconfirm={this.state.applyconfirm}
					/>
				 <div className={"educontent mt20 mb50"}>

					 <Breadcrumb separator={'>'} className={"fl"}>
						 {/*<Breadcrumb.Item>{this.props.current_user.username}</Breadcrumb.Item>*/}
						 <Breadcrumb.Item>
							 <a href="/crowdsourcing">众包创新</a>
						 </Breadcrumb.Item>
						 <Breadcrumb.Item><span className={"tabelcli"} title={data&&data.title}>{data&&data.title}</span></Breadcrumb.Item>

					 </Breadcrumb>
					 <a className="color-grey-6 fr font-18 mr20" onClick={this.goback}>返回</a>
					<div className="mb20">
						<p className="clearfix">
							<div className={"stud-class-set coursenavbox edu-back-white mt20"}>
								<div className={"ant-row contentbox mdInForm "}>

									<div className="educontent project-packages-list relative">
										{data&&data.status==="pending"?<div>
											<div className="publicpart orangeBlack "></div>
											<span className="smalltrangle"></span>
											<span className="publicword publicwords"> 未申请 </span>
										</div>:data&&data.status==="applying"?<div>
											<div className="publicpart orangeGreen"></div>
											<span className="smalltrangle"></span>
											<span className="publicword publicwords"> 待发布 </span>
										</div>:""}

										<div className="project-package-item project-package-items height185">
											<div className="item-image">
												<div className="fl edu-back-white  ">
													<a href={`/users/${data&&data.creator.login}`}>
														<img alt="头像" className="radius mt10 ml5" height="70" id="nh_user_logo" name="avatar_image"
																 src={`/images/${data&&data.creator.image_url}`}
																 width="70"/>
													</a>
													<div className=" edu-back-white pagemancenter mt10 ">
														{data&&data.creator.name}
													</div>

													 {datalogin===userlogin===true?"":<div className=" edu-back-white  ml5 mt10 "
															 onMouseOver={this.setover}
															 onMouseOut={this.setout}
												    >
														{overtype===false?<a className="ContacttheTA fl" target="_blank" href={`/messages/${this.props.current_user&&this.props.current_user.login}/message_detail?target_ids=${data&&data.creator.id}`}> <img alt="头像" class="mr5" src={require('./newsone.png')} />联系TA</a>:
															<a className="ContacttheTAs fl" target="_blank" href={`/messages/${this.props.current_user&&this.props.current_user.login}/message_detail?target_ids=${data&&data.creator.id}`}> <img alt="头像" className="mr5"
																																	 src={require('./newstwo.png')}/>联系TA</a>}
													</div>}
												</div>


											</div>

											<div className=" item-body">

												<div className="  item-head mbf10 mt15 ">

													<div className=" item-head-title ">
														<span className={"fl mt3 font-18 font-bd color-dark maxwidth670 "}
															 title={data&&data.title}
														>{data&&data.title}
														</span>
													</div>

													<div className=" item-head-price mt2">
														 {data&&data.min_price===null?"":<span>￥<span className={"font-24"}>{data&&data.min_price}</span></span>}
														 {data&&data.max_price===null||data&&data.min_price===null?"":<span>~</span>}
														 {data&&data.max_price===null?"":<span>￥<span className={"font-24"}>{data&&data.max_price}</span></span>}
													   {data&&data.min_price===null&&data&&data.max_price===null?<span>可议价</span>:""}
													</div>

												</div>

												<div className="item-category">
													<div className="item-category-item">{data&&data.category_name}</div>
												</div>

												<div className=" item-other">
													<div>
														{data&&data.published_at===null?<span className="item-group-text">
															更新时间：{moment(data&&data.updated_at).format("YYYY-MM-DD HH:mm")}
														</span>:<span className="item-group-text">
															发布时间：{moment(data&&data.published_at).format("YYYY-MM-DD HH:mm")}
														</span>}
													</div>
													<div className=" item-group item-other-deadline ml40">
														<span className="item-group-text">竞标截止时间：{moment(data&&data.deadline_at).format("YYYY-MM-DD HH:mm")}</span>
													</div>
												</div>

											</div>

										</div>
									</div>

								</div>
							</div>

							{/*详情*/}
							<div className={"stud-class-set padding26 coursenavbox edu-back-white mt20"}>
								<div>
									<div className={"longboxs"}>
									 需求详情：

										{data&&data.status==="pending"&&data&&data.operation.can_select_bidding_user===true?<div className="fr">
											<a className="task-btn-nebules fr" href={`/crowdsourcing/${this.props.match.params.id}/edit`}>编辑</a>
											<a className="task-btn-nebules fr" onClick={this.deletePackages}>删除</a>
										</div>:""}

									</div>
									<div className={"padding020"}>
										<div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(data&&data.content).replace(/▁/g,"▁▁▁")}}></div>
									</div>

								</div>

								{data&&data.attachments.length>0?<div>
									<div className={"longboxs "}>
										需求文件：
									</div>
										{data&&data.attachments.map((item,key)=>{
										return(
											<div className={"newForm newFormbox mt10 "}>
												<i className="color-green iconfont icon-fujian mr5 fl font-14 mt3"></i>
												<a className="upload_filename color-grey readonly hidden fl mtf3 mr10 ml5" href={item.url}>{item.title}  &nbsp; &nbsp;{bytesToSize(item.filesize)}</a>
											</div>
										)})}
								</div>:""}
							</div>



							{/*发布者和竞选者状态show*/}
							{this.state.setbiddingmantype===false&&data&&data.published_at!=null?<div className={"stud-class-set  coursenavbox edu-back-white mt20"}>
								{/*下面是头像*/}
								<div className={"stud-class-set pd26 coursenavbox edu-back-white"}>
									<div className={"relativef"}>
										<div className={"longboxs mb0"}>
											报名列表({data&&data.bidding_users.length})
										</div>
										<div className="packageabsolute">
											{data&&data.operation.can_bidding===true?<Button type="primary" className="defalutSubmitbtn fl ml20 defalutSubmitbtns" onClick={this.setBiddingApply}>竞标报名</Button>:""}
											{data&&data.operation.can_select_bidding_user===true?<Button type="primary" className="defalutSubmitbtn fl ml20 defalutSubmitbtns" onClick={this.setbiddingman}>选择中标者</Button>:""}
										</div>
									</div>
								</div>

								<div className={"ysllogin_register_contentss edu-back-white "} style={{borderTop: '1px solid rgb(234, 234, 234)'}}>
									<div className="ysllogin_sections">
										<div className="ysldivhome2s">
											<div style={{height: "20px"}}> </div>

											{data&&data.bidding_users.map((item,key)=>{
												return(
													<div className="ysldivhomediv1s homehove" key={key}>
														{item.status==="bidding_won"?<img src={gouxuan} className="yslgouxuanimg"/>:""}
														<a className={item.status==="bidding_won"?"":"mt20"} href={`/users/${item.login}`}><img className="div1imgs" src={getImageUrl("images/"+item.image_url)}/></a>
														<div className="textall mt10" title={item.name}> <p className="ptext">{item.name}</p></div>
														{this.props.current_user&&this.props.current_user.login!=item.login?<a className="ContacttheTAs fl none" target="_blank" href={`/messages/${this.props.current_user&&this.props.current_user.login}/message_detail?target_ids=${item.id}`}>
															<img alt="头像" className="mr5" src={require('./newstwo.png')}/>联系TA
														</a>:""}
													</div>
												)
											})}

											{data&&data.bidding_users.length===0?<div className="edu-back-white" style={{width: '1200px'}}>
												<div className="edu-tab-con-box clearfix edu-txt-center">
													<img className="edu-nodata-img mb20" src="https://www.educoder.net/images/educoder/nodata.png" />
													<p className="edu-nodata-p mb20">暂无人员竞标~</p></div>
											</div>:""}


										</div>
									</div>
								</div>
							</div>:""}


							{this.state.setbiddingmantype===true?<div className={"stud-class-set  coursenavbox edu-back-white mt20"}>
								{/*发布人选择状态*/}
              {/*下面是头像*/}
								<div className={"stud-class-set pd26 coursenavbox edu-back-white"}>
									<div className={"relativef"}>
										<div className={"longboxs mb0"}>
											报名列表({data&&data.bidding_users.length})
										</div>

										<div className="packageabsolute">
											<div className=" fl mt10 mr20">
												已选 <span className={"color-orange06"}>({this.state.datalist.length})</span>
											</div>
											<a className="defalutCancelbtns fl" onClick={this.notsetbiddingman}>取消</ a>
											<Button type="primary" className="defalutSubmitbtn fl ml20 defalutSubmitbtns" onClick={this.setbiddingusers}>确定</Button>
										</div>
									</div>
								</div>
							<div className={"ysllogin_register_contentss edu-back-white "}  style={{borderTop: '1px solid rgb(234, 234, 234)'}}>
								<div className="ysllogin_sections">
									<div className="ysldivhome2s">
										<div style={{height: "20px"}}> </div>
										{data&&data.bidding_users.map((item,key)=>{
												return(
													<div className="ysldivhomediv1s" onClick={()=>this.Clickteacher2(item.id)} key={key}>
														{item.bool===true?<img src={gouxuan} className="yslgouxuanimg"/>:<img src={weigouxuan} className="yslgouxuanimg"/>}
														<a href={`/users/${item.login}`} target="_blank"><img className="div1imgs" src={getImageUrl("images/"+item.image_url)}/></a>
														<span className={item.bool===true?"textall mt10 color-blue":"textall mt10"} title={item.name}> <p className="ptext">{item.name}</p></span>
													</div>
												)
											})}

										{data&&data.bidding_users.length===0?<div className="edu-back-white" style={{width: '1200px'}}>
											<div className="edu-tab-con-box clearfix edu-txt-center">
												<img className="edu-nodata-img mb20" src="https://www.educoder.net/images/educoder/nodata.png" />
												<p className="edu-nodata-p mb20">暂无人员竞标~</p></div>
										</div>:""}

									</div>
							</div>
							</div>
							</div>:""}

						</p>

					</div>


				 </div>
				</div>
			</div>
		)
	}
}

export default PackageIndexNEITaskDetails;



