import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Tooltip,Menu,Pagination,Spin} from 'antd';
import axios from 'axios';
import {getImageUrl} from 'educoder';
import Modals from '../../modals/Modals';
import NoneData from '../../courses/coursesPublic/NoneData';
import "./usersInfo.css"
import moment from 'moment';
let categorylist=[
	{name:"全部",value:undefined},
	{name:"前端开发",value:"front"},
	{name:"后端开发",value:"backend"},
	{name:"移动开发",value:"mobile"},
	{name:"数据库",value:"database"},
	{name:"云计算和大数据",value:"cloud_compute_and_big_data"},
	{name:"人工智能",value:"ai"},
	{name:"运维与测试",value:"devops_and_test"},
	{name:"其他",value:"other"},
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
class InfosPackage extends Component{
	constructor(props){
		super(props);
		this.state={
			category:undefined,
			status:undefined,
			page:1,
			per_page:20,
			sort_direction:'desc',
			totalCount:undefined,
			data:undefined,
			isSpin:false
		}
	}

	componentDidMount=()=>{
		this.setState({
			isSpin:true
		})
		let{category,status,page}=this.state;
		this.getCourses(category,status,page);
	}

	getCourses=(category,status,page)=>{
		let url=`/users/${this.props.match.params.username}/project_packages.json`;
		axios.get((url),{params:{
				category,
				status,
				page,
				sort_by:"published_at",
				sort_direction:'desc',
				per_page:20
			}}).then((result)=>{
			if(result){
				this.setState({
					totalCount:result.data.count,
					data:result.data,
					isSpin:false
				})
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	//切换种类
	changeCategory=(cate)=>{
		this.setState({
			category:cate,
			page:1,
			isSpin:true
		})
		let{status}=this.state;
		this.getCourses(cate,status,1);
	}
	//切换状态
	changeStatus=(status)=>{
		this.setState({
			status:status,
			page:1,
			isSpin:true
		})
		let{category}=this.state;
		this.getCourses(category,status,1);
	}
	//切换页数
	changePage=(page)=>{
		this.setState({
			page,
			isSpin:true
		})
		let{category,status}=this.state;
		this.getCourses(category,status,page);
	}

	// 进入课堂
	turnToCourses=(url,flag)=>{
		if(flag){
			this.props.history.push(url);
		}
	}


	delectprojectModal=(id)=>{
			this.setState({
				Modalstype: true,
				Modalstopval: '是否确认删除?',
				ModalSave: () => this.delectproject(id),
				ModalCancel: this.cancelProject
			})
	}

	cancelProject=()=>{
		this.setState({
			Modalstype: false,
		})
	}

	delectproject=(id)=>{

		let {category,status}=this.state;
		debugger
		let url=`/project_packages/${id}.json`

		axios.delete(url).then((response) => {
				if (response.data.status == 0) {
					this.getCourses(category,status,1);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		this.cancelProject();
	}
	render(){
		let{
			category,
			status,
			page,
			data,
			totalCount,
			isSpin
		} = this.state;
		let  is_current=this.props.is_current;

		// console.log(data)
		return(
			<div className="educontent mb50">
				{/*提示*/}
				<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
				/>
				<Spin size="large" spinning={isSpin}>
					<style>
						{
							`
             .whitepanelyslli {
                width: 32px !important;
             height: 48px !important;
              line-height: 46px !important;
             }
              .whitepanelyslliss {
                width: 32px !important;
                  height: 48px !important;
              line-height: 46px !important;
             }
            
              .whitepanelysllis {
             width: 66px !important;
              height: 48px !important;
              line-height: 46px !important;
              margin-left: 40px !important;
              }
              .white-panel li.active {
                  border-radius: 24px;
                  border: none !important;
                  color: #4CACFF;
              }
              
            
              
              `
						}
					</style>
					<div className="white-panel edu-back-white pt20 pb20 clearfix ">
						<li className={category ? " font-16 whitepanelyslli" : "active font-16 whitepanelyslli"}><a
							href="javascript:void(0)" onClick={() => this.changeCategory()} className="font-16 w32">全部</a></li>
						<li className={category == "manage" ? "active font-16 whitepanelysllis" : "font-16 whitepanelysllis"}><a
							href="javascript:void(0)" onClick={() => this.changeCategory("manage")}
							className="font-16 w66">{is_current ? "我" : "TA"}管理的</a></li>
						<li className={category == "study" ? "active font-16 whitepanelysllis" : "font-16 whitepanelysllis"}><a
							href="javascript:void(0)" onClick={() => this.changeCategory("study")}
							className="font-16 w66">{is_current ? "我" : "TA"}学习的</a></li>
					</div>
					<style>
						{
							`  .secondNavs li {
                color: #676767;
                /* margin: 0px 20px; */
                float: left;
             }
             .secondNavs li a:hover{
             color: #4CACFF
             }
             .secondNavs li.active a{
             color: #4CACFF
             }
             `
						}
					</style>
					{
						category=="manage"?
							<div className="edu-back-white padding10-30 clearfix secondNavs bor-top-greyE">
								<li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a
									onClick={() => this.changeStatus()} className="w32">全部</a></li>
								<li className={status == "unpublished " ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
									onClick={() => this.changeStatus("unpublished")} className="w60">未发布</a></li>
								<li className={status == "bidding" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
									onClick={() => this.changeStatus("bidding")} className="w60">竞标中</a></li>
								<li className={status == "finished" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
									onClick={() => this.changeStatus("finished")} className="w60">已完成</a></li>
						</div>:	category=="bidden"?
							<div className="edu-back-white padding10-30 clearfix secondNavs bor-top-greyE">
								<li className={status ? "whitepanelyslliss" : "active whitepanelyslliss"}><a
									onClick={() => this.changeStatus()} className="w32">全部</a></li>
								<li className={status == "bidding_lost" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
									onClick={() => this.changeStatus("bidding_lost")} className="w60">未中标</a></li>
								<li className={status == "bidding_won" ? "active whitepanelysllisyt" : "whitepanelysllisyt"}><a
									onClick={() => this.changeStatus("bidding_won")} className="w60">已中标</a></li>
							</div>:""
					}
					<p className="pl25 pr25 clearfix font-12 mb20 mt20">
						<span className="fl color-grey-9">共{totalCount}个</span>
						<span className="fr color-grey-9">发布时间</span>
					</p>

					{/*bidden_status: "pending"*/}

					{/*category_id: 2*/}

					{/*status: "published"*/}

					{/*type: "bidden"*/}

					{data===undefined?<NoneData></NoneData>:data.project_packages.length===0?<NoneData></NoneData>:data.project_packages.map((item,key)=>{
					return(
						<div className="educontent project-packages-list" key={key}>
							<div className="project-package-item with-operator project-package-11">

								<div className="item-image">
									<img alt="图片" src={`/images/educoder/project_packages/${setcategorylist(item.category_name)}.png`} />
								</div>

								<div className="item-body">
									<div className="item-head">
										<div className="item-head-title" title={item.title}>
											<a href={`/crowdsourcing/${item.id}`}>{item.title}</a>
										</div>

										<div className="item-head-tags">
											{item.bidden_status==="pending"?<span className="pending">竞标中</span>:""}
											{item.bidden_status==="bidding_won"?<span className="bidding_won">已中标</span>:""}
											{item.bidden_status==="bidding_lost"?<span className="bidding_lost">未中标</span>:""}
										</div>

										<div className="item-head-blank"></div>
										<div className="item-head-price mtf15">
											{item.min_price===null?"":<span>￥{item.min_price}</span>}
											{item.max_price===null||item.min_price===null?"":<span>~</span>}
											{item.max_price===null?"":<span>￥{item.max_price}</span>}
											{item.min_price===null&&item.max_price===null?<span>可议价</span>:""}
										</div>
									</div>
									<div className="item-category">
										<div className="item-category-item">{item.category_name}</div>
									</div>
									<div className="item-other">
										<div className="item-group item-other-visit">
											<span className="item-group-icon mr10"><i className="fa fa-eye"></i></span>
											<span className="item-group-text">{item.visit_count}人浏览</span>
										</div>
										<div className="item-group item-other-deadline">
											<span className="item-group-icon mr10"><i className="fa fa-clock-o"></i></span>
											<span className="item-group-text">{moment(item.deadline_at).format("YYYY-MM-DD HH:mm")}竞标截止</span>
										</div>
										<div className="item-group item-other-bidding pagemancenter">
											<span className="item-group-icon mr10"><i className="fa fa-user"></i></span>
											<span className="item-group-text">{item.bidding_users_count}人竞标</span>
										</div>
									  <div className="item-group item-other-publish-at">
											{item.published_at===null?<span className="item-group-text">更新于：{moment(item.updated_at).format("YYYY-MM-DD HH:mm")} </span>:
												<span className=" item-group-text">发布于：{moment(item.published_at).format("YYYY-MM-DD HH:mm")} </span>}
										</div>
									</div>
								</div>

								{category=="manage"?item.operation.can_edit===true&&item.operation.can_delete===true?
								<div className="item-operator none">

									<a href={`/crowdsourcing/${item.id}/edit`} title="编辑">
										<i className="fa fa-pencil"></i>
									</a>

									<a className="delete-project-package-btn" onClick={()=>this.delectprojectModal(item.id)} data-id="10" title="删除">
										<i className="fa fa-trash-o"></i>
									</a>

								</div>:"":""}

								{category=="manage"?item.operation.can_edit===true&&item.operation.can_delete===false?
									<div className="item-operator none">
										<a href={`/crowdsourcing/${item.id}/edit`} title="编辑">
											<i className="fa fa-pencil"></i>
										</a>
									</div>:"":""}


							</div>
						</div>
					)})}

					{
						totalCount >20 &&
						<div className="mt30 mb50 edu-txt-center">
							<Pagination showQuickJumper total={totalCount} onChange={this.changePage} pageSize={20} current={page}/>
						</div>
					}

				</Spin>
			</div>
		)
	}
}
export default InfosPackage;
