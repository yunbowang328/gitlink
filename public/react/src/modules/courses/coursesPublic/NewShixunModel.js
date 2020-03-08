import React,{Component} from 'react';
import { Modal,Checkbox,Select,Input,Tooltip,Spin,Icon,Drawer,Dropdown,Menu,Breadcrumb,Pagination,Button,notification} from "antd";
import axios from'axios';
import NoneData from "../coursesPublic/NoneData";
import './Newshixunmodel.css';
const Search = Input.Search;
class NewShixunModel extends Component{
	constructor(props){
		super(props)
		this.state={
			shixun_list:undefined,
			shixuns_count:undefined,
			Grouplist:[],
			allGrouplist:[{page:1,list:[]}],
			page:1,
			type:'all',
			status:'all',
			keyword:undefined,
			order:'desc',
			diff:0,
			limit:20,
			sort:"myshixuns_count",
			belongtoindex:0,
		}
	}
	componentDidMount() {
		let{page,type,keyword,order,diff,limit,status,sort}=this.state;
		if(this.props.type==='shixuns'){
			this.getdatalist(page,type,status,keyword,order,diff,limit,undefined,sort);
		}else{
			this.getdatalist(page,type,undefined,keyword,order,undefined,limit,undefined,sort);
		}
	}

	getdatalist=(page,type,newstatus,keyword,order,diff,limit,pagetype,sorts)=>{
		let newsort=sorts;
		let no_jupyter=undefined;
		if(this.props.type==="shixuns"&&type==="mine"){
			if(this.props&&this.props.user.course_name===undefined){
				newsort="created_at";
			}else{
				newsort="publish_time";
			}
		}
		if(this.props.type==="shixuns"){
			if(this.props&&this.props.user.course_name===undefined){
			}else{
				no_jupyter=1;
			}
		}
		this.setState({
			isspinning:true
		})
		let status=this.props.statustype===undefined?newstatus:'published';
		let url;
		if(this.props.type==='shixuns'){
			url="/shixun_lists.json";
		}else{
			url="/subject_lists.json";
		}

		axios.get(url,{params:{
				page:page,
				type:type,
				status:status,
				keyword:keyword,
				order:order,
				diff:diff,
				limit:limit,
				sort:newsort,
				no_jupyter:no_jupyter
			}}).then((response) => {
			if(response.data){
				if(pagetype===undefined){
					this.setState({
						shixun_list:response.data.shixun_list===undefined?response.data.subject_list:response.data.shixun_list,
						shixuns_count:response.data.shixuns_count===undefined?response.data.subjects_count:response.data.shixuns_count,
						Grouplist:[],
						isspinning:false
					})
				}else if(pagetype==="pagetype"){
					this.setState({
						shixun_list:response.data.shixun_list===undefined?response.data.subject_list:response.data.shixun_list,
						shixuns_count:response.data.shixuns_count===undefined?response.data.subjects_count:response.data.shixuns_count,
						isspinning:false
					})
				}

			}
		}).catch((error) => {
	     this.setState({
				 isspinning:false
			 })
		})
	}

	DropdownClick=(diff)=>{
    this.setState({
			diff:diff
		})
		let{page,type,status,keyword,order,limit}=this.state;
		this.getdatalist(page,type,status,keyword,order,diff,limit)
	}

	ItsCourse=(item)=>{
  return <Menu>
						{item.map((list,key)=>{
							return(
								<Menu.Item key={key} id={list.id}>
										<a target="_blank" href={`/paths/${list.id}`} className={"newshixun500"}>{list.name}</a>
								</Menu.Item>
								)
						})}
		  	</Menu>
	}

	getGrouplist=(Grouplist)=>{
		   let {page,allGrouplist}=this.state;
	    	let newallGrouplist=allGrouplist;
				var a=newallGrouplist.find((value,index,arr)=>{
					return value.page==page
				});

       if(a!=undefined){
				 newallGrouplist.map((item,key)=>{
					 if(item.page===page){
						 item.list=Grouplist
					 }
				 })
			 }


			 let newGrouplist=[];

			newallGrouplist.map((item,key)=>{
				item.list.map((items,ke)=>{
					newGrouplist.push(items)
				})
			})


		this.setState({
			Grouplist: newGrouplist,
			allGrouplist:newallGrouplist
		})
	}

	PaginationCourse=(pageNumber)=>{
	  let {allGrouplist}=this.state;
		let newallGrouplist=allGrouplist;
		var v=newallGrouplist.find((value,index,arr)=>{
			return value.page==pageNumber
		});

		if(v===undefined){
			newallGrouplist.push({page:pageNumber,list:[]})
		}

		let{type,status,keyword,order,diff,limit,sort}=this.state;
		if(this.props.type==='shixuns'){
			this.getdatalist(pageNumber,type,status,keyword,order,diff,limit,"pagetype")
		}else{
			this.getdatalist(pageNumber,type,undefined,keyword,order,undefined,limit,"pagetype",sort);
		}

		 this.setState({
			 page:pageNumber,
			 allGrouplist:newallGrouplist
		 })

	}

	belongto=(value)=>{
		this.setState({
			type:value,
			keyword:undefined,
			page:1
		})
		let{status,order,diff,limit,sort}=this.state;
		if(this.props.type==='shixuns'){
			this.getdatalist(1,value,status,undefined,order,diff,limit);
			if(value==="all"){
				this.setState({
					belongtoindex:0
				})
			}else{
				this.setState({
					belongtoindex:1
				})
			}

		}else{
			this.getdatalist(1,value,undefined,undefined,order,undefined,limit,undefined,sort)
		}


	}

	updatedlist=(order)=>{

		if(order==="desc"){
			this.setState({
				order:"asc"
			})
			let{type,page,status,keyword,diff,limit}=this.state;
			this.getdatalist(page,type,status,keyword,"asc",diff,limit)
		}else{
			this.setState({
				order:"desc"
			})
			let{type,page,status,keyword,diff,limit}=this.state;
			this.getdatalist(page,type,status,keyword,"desc",diff,limit)
		}

	}

	setdatafunsval=(e)=>{
   this.setState({
		 keyword:e.target.value
	 })
	}

	setdatafuns=(value)=>{

		this.setState({
			keyword:value,
			type:undefined,
			page:1,
			status:'all',
			order:'desc',
			diff:0,
			limit:20,
		})
		this.getdatalist(1,undefined,'all',value,'desc',0,20)
	}


	savecouseShixunModal=()=>{

		this.setState({
			hometypepvisible:true
		})
		let {coursesId}=this.props;
    let{Grouplist}=this.state;
		if(Grouplist.length===0){

			this.setState({
				hometypepvisible:false
			})

			this.props.showNotification(this.props.type==='shixuns'?"请先选择实训":"请先选择课程")

			return
		}

		if (this.props.chooseShixun) {

			if(Grouplist.length>1){

				this.setState({
					hometypepvisible:false
				})
				this.props.showNotification("试卷选择的实训数不能大于1")
				return
			}
			this.props.chooseShixun(Grouplist)
			this.setState({
				hometypepvisible:false
			})
			return;
		}

		if (this.props.pathShixun) {
			this.setState({
				hometypepvisible:false
			})
			this.props.pathShixun(Grouplist)
			return;
		}
		if(this.props.type==='shixuns'){
			let url="/courses/"+coursesId+"/homework_commons/create_shixun_homework.json";
			axios.post(url, {
					category_id:this.props.category_id===null||this.props.category_id===undefined?undefined:parseInt(this.props.category_id),
					shixun_ids:Grouplist,
				}
			).then((response) => {
				if(response.data.status===-1){
					// this.props.showNotification(response.data.message)

				}else{
					// this.props.courseshomeworkstart(response.data.category_id,response.data.homework_ids)
					this.props.showNotification("操作成功")
					this.props.homeworkupdatalists(this.props.Coursename,this.props.page,this.props.order);
					this.props.hideNewShixunModelType()
					this.props.updataleftNavfun()
				}
				this.setState({
					hometypepvisible:false
				})
				// category_id: 3
				// homework_ids: (5) [9171, 9172, 9173, 9174, 9175]
			}).catch((error) => {
				console.log(error)
				this.setState({
					hometypepvisible:false
				})
			})
		}else{
			let url="/courses/"+coursesId+"/homework_commons/create_subject_homework.json";
			axios.post(url, {
					category_id:this.props.category_id===null||this.props.category_id===undefined?undefined:parseInt(this.props.category_id),
			  	subject_ids:Grouplist,
				}
			).then((response) => {
				if(response.data.status===-1){
					// this.props.showNotification(response.data.message)

				}else{
					// this.props.courseshomeworkstart(response.data.category_id,response.data.homework_ids)
					this.props.showNotification("操作成功")
					this.props.homeworkupdatalists(this.props.Coursename,this.props.page,this.props.order);
					this.props.hideNewShixunModelType()
					this.props.updataleftNavfun()
				}
				this.setState({
					hometypepvisible:false
				})
				// category_id: 3
				// homework_ids: (5) [9171, 9172, 9173, 9174, 9175]
			}).catch((error) => {
				console.log(error)
				this.setState({
					hometypepvisible:false
				})
			})
		}

	}

	poststatus=(status)=>{
		this.setState({
			status:status
		})
		let{page,type,keyword,order,diff,limit}=this.state;
		this.getdatalist(page,type,status,keyword,order,diff,limit)
	}


	updatepathlist=(sorts,orders)=>{
		let{page,type,keyword,order,diff,limit,status,sort}=this.state;
		let seartorders;
		if(sort===sorts){
			if(orders==="desc"){
				this.setState({
					sort:sorts,
					order:"asc"
				})
				seartorders="asc"
			}else{
				this.setState({
					sort:sorts,
					order:"desc"
				})
				seartorders="desc"
			}
		}else{
			this.setState({
				sort:sorts,
				order:"desc"
			})
			seartorders=orders
		}

		this.getdatalist(page,type,undefined,keyword,seartorders,undefined,limit,undefined,sorts)

	}
	render() {

	  let {diff,Grouplist,status,shixun_list,shixuns_count,page,type,order,sort,belongtoindex}=this.state;
		// let {visible,patheditarry}=this.props;
    //   console.log(Grouplist)
		// 	console.log(allGrouplist)

		const statusmenus=(
			<Menu className="menus">
				<Menu.Item>
					<a className={status==="all"?"color-blue":""} onClick={()=>this.poststatus("all")}>
						所有
					</a>
				</Menu.Item>

				<Menu.Item >
					<a className={status==="published"?"color-blue":""} onClick={()=>this.poststatus("published")} >
						已发布
					</a>
				</Menu.Item>

				<Menu.Item>
					<a className={status==="unpublished"?"color-blue":""} onClick={()=>this.poststatus("unpublished")}>
						未发布
					</a>
				</Menu.Item>

			</Menu>
		);
		const menus = (
			<Menu className="menus">
				<Menu.Item>
					<a className={diff===0?"color-blue":""} onClick={()=>this.DropdownClick(0)}>
						所有
					</a>
				</Menu.Item>

				<Menu.Item >
					<a className={diff===1?"color-blue":""} onClick={()=>this.DropdownClick(1)} >
		         初级
					</a>
				</Menu.Item>

				<Menu.Item>
					<a className={diff===2?"color-blue":""} onClick={()=>this.DropdownClick(2)}>
					   中级
					</a>
				</Menu.Item>

				<Menu.Item>
					<a className={diff===3?"color-blue":""} onClick={()=>this.DropdownClick(3)}>
				     高级
					</a>
				</Menu.Item>

				<Menu.Item>
					<a className={diff===4?"color-blue":""} onClick={()=>this.DropdownClick(4)}>
					   顶级
					</a>
				</Menu.Item>
			</Menu>
		);


		return(

			<div>
				<style>
					{
						`body{  overflow: hidden !important; }
					   .ant-drawer-content{ overflow:auto !important; background: #f5f5f5; }
					   .yslbottomsj{position: absolute;bottom: -8px;}
					   .ant-drawer-close{
					     font-size:24px !important;
					   }
					   .ant-drawer-body {
								padding:15px 24px 24px 0px;
					  	}
					  	.ant-dropdown {
					  	  z-index:11000
					  	}
					  `
					}
				</style>

				<Drawer
					placement="bottom"
					closable={true}
					destroyOnClose={true}
					onClose={()=>this.props.hideNewShixunModelType()}
					visible={this.props.type==='shixuns'?this.props.NewShixunModelType:this.props.shixunpath}
					height={'100%'}
				>
					<Spin spinning={this.state.isspinning}>
					<div className={"clearfix educontent pr mb60shixun"}>

						<div className={"square-list clearfix verticallayout"}>

							<div className="newshixunheadersear">
								<div style={{height:"53px"}}></div>
								<style>
									{
										`
										.ant-input, .ant-input .ant-input-suffix{
   											background-color: #fff !important;
										}
										.packinput .ant-input{
   											border: 1px solid rgba(217,217,217,1) !important;
										}
										`
									}
								</style>
								<Search
									style={{ width: "780px"}}
									className="packinput"
									placeholder={this.props.type==='shixuns'?"实训信息 / 院校名称 / 创建者":"课程名称 / 院校名称 / 创建者"}
									value={this.state.keyword}
									enterButton={<span>搜索</span>}
									onInput={(e)=>this.setdatafunsval(e)}
									onSearch={ (value)=>this.setdatafuns(value)} />
							</div>







							{this.props.type==='shixuns'?
								<div className="clearfix sortinxdirection mt30 intermediatecenterysls">
									<p className="nandu">筛选：</p>
									<p className={type==="all"?"clickbutstwo ml13":"clickbutstwos ml13"} onClick={()=>this.belongto("all")}>全部实训</p>
									<p className={type==="mine"?"clickbutstwo ml20":"clickbutstwos ml20"} onClick={()=>this.belongto("mine")}>我的实训</p>
								</div>:""
							}
							{/*{this.props.type==='shixuns'? <Dropdown overlay={menus}>*/}
							{/* <a className="ant-dropdown-link  color-grey-6">*/}
							{/*	 {diff===0?"难度":diff===1?"初级":diff===2?"中级":diff===3?"高级":diff===4?"顶级":""}<Icon type="down" className={"color-grey-6"}/>*/}
							{/* </a>*/}
							{/*</Dropdown>:""}*/}
							{this.props.type==='shixuns'?
								<div className="clearfix sortinxdirection mt20 intermediatecenterysls">
									<p className="nandu">难度：</p>
									<p className={diff===0?"clickbuts ml13":"clickbutst ml13"} onClick={()=>this.DropdownClick(0)}>全部</p>
									<p className={diff===1?"clickbuts ml30":"clickbutst ml30"} onClick={()=>this.DropdownClick(1)}>初级</p>
									<p className={diff===2?"clickbuts ml30":"clickbutst ml30"} onClick={()=>this.DropdownClick(2)}>中级</p>
									<p className={diff===3?"clickbuts ml30":"clickbutst ml30"}  onClick={()=>this.DropdownClick(3)}>中高级</p>
									<p className={diff===4?"clickbuts ml30":"clickbutst ml30"} onClick={()=>this.DropdownClick(4)}>高级</p>
								</div>:""
							}

							 <div className={this.props.type==='shixuns'?"clearfix font-12 mt20":"clearfix font-12 mt30"}>

								<div className="font-12 ml5 fl">

									<span className="fl color-grey-9 mr20">已选   <span className={"color-blue"}>{Grouplist.length}</span>   个{this.props.type==='shixuns'?'实训':'课程'}</span>
									<span className="fl color-grey-9 mr20">共   <span className={"color-blue"}>{shixuns_count===undefined?"":shixuns_count}</span>  个{this.props.type==='shixuns'?'实训':'课程'}</span>

									{this.props.type==='shixuns'?"":<span className="fl color-grey-9 pointer mr30">
										<a className={" color-grey-6"} onClick={()=>this.updatepathlist("shixuns_count",order)}>实训数</a>
										<sapn className="relativef ml5 " >
											<i className={order==="asc"&&sort==="shixuns_count"?"iconfont icon-sanjiaoxing-up font-12 ntopsj color-grey-9 color-blue":"iconfont icon-sanjiaoxing-up font-12 ntopsj  color-grey-9"}></i>
											<i className={order==="desc"&&sort==="shixuns_count"?"iconfont icon-sanjiaoxing-down font-12 nyslbottomsj color-grey-9 color-blue":"iconfont icon-sanjiaoxing-down font-12 nyslbottomsj  color-grey-9"}></i>
										</sapn>
									</span>}

									{this.props.type==='shixuns'?"":<span className="fl color-grey-9 pointer mr30">
										<a className={" color-grey-6"} onClick={()=>this.updatepathlist("myshixuns_count",order)}>学习人数</a>
										<sapn className="relativef ml5 " >
											<i className={order==="asc"&&sort==="myshixuns_count"?"iconfont icon-sanjiaoxing-up font-12 ntopsj color-grey-9 color-blue":"iconfont icon-sanjiaoxing-up font-12 ntopsj  color-grey-9"}></i>
											<i className={order==="desc"&&sort==="myshixuns_count"?"iconfont icon-sanjiaoxing-down font-12 nyslbottomsj color-grey-9 color-blue":"iconfont icon-sanjiaoxing-down font-12 nyslbottomsj  color-grey-9"}></i>
										</sapn>
									</span>}

									{this.props.type==='shixuns'?<span className="fl color-grey-9 pointer mr30">
										<a className={" color-grey-6"} onClick={()=>this.updatedlist(order)}>学习人数</a>
										<sapn className="relativef ml5 " >
											<i className={order==="asc"?"iconfont icon-sanjiaoxing-up font-12 ntopsj color-grey-9 color-blue":"iconfont icon-sanjiaoxing-up font-12 ntopsj  color-grey-9"}></i>
											<i className={order==="desc"?"iconfont icon-sanjiaoxing-down font-12 nyslbottomsj color-grey-9 color-blue":"iconfont icon-sanjiaoxing-down font-12 nyslbottomsj  color-grey-9"}></i>
										</sapn>
									</span>:""}

									{this.props.type==='shixuns'?this.props.statustype===undefined?<Dropdown overlay={statusmenus}>
										<a className="ant-dropdown-link  color-grey-6 mr20">
											{status==='all'?"发布状态":status==='published'?"已发布":status==="unpublished"?"未发布":""}<Icon type="down" className={"color-grey-6"}/>
										</a>
									</Dropdown>:"":""}


								</div>

								<div className="font-12 alltopiscright ml25 fl">

									{this.props.type==='shixuns'?"":
										<span className={type==="mine"?"fr topcsactive pointer color-grey-3 color-blue":"fr pointer color-grey-3"} onClick={()=>this.belongto("mine")}>我的课程</span>
									}

									{this.props.type==='shixuns'?"":
										<span className={type==="all"?"fr mr30 topcsactive pointer color-grey-3 color-blue":"fr mr30 pointer color-grey-3"}  onClick={()=>this.belongto("all")}>全部课程</span>
									}
								</div>

							</div>

							<Checkbox.Group onChange={this.getGrouplist} value={Grouplist} >

							{shixun_list===undefined?"":shixun_list.length===0?"":shixun_list.map((item,key)=>{

							return(
								<div className="mt10 edu-back-white pd20 relativef newshixunlist" key={key}>
									<div className="clearfix">
										<div className="item-body">
											<div className="clearfix ds pr contentSection">
												<Checkbox
													value={item.id}
													key={item.id}
													className="fl task-hide edu-txt-left mt3"
													name="shixun_homework[]"
												></Checkbox>

												<a target="_blank" href={this.props.type==='shixuns'?`/shixuns/${item.identifier}/challenges`:`/paths/${item.id}`} className="ml15 fl font-16  color-dark maxwidth1100"
													 dangerouslySetInnerHTML={{__html: item.title}}
												>
												</a>

												{
													this.props.type==='shixuns'?
														(
															item.is_jupyter===true?
																<div className="myysljupyter fl ml20  intermediatecenter">
																	<p className="myysljupytertest">
																		Jupyter
																	</p>
																</div>
																:""
														)
														:""
												}

												<div className="cl"></div>
												<style>
													{
														`
														 .newradioStyles{
																 overflow: hidden;
																text-overflow: ellipsis;
																display: -webkit-box;
																-webkit-line-clamp: 2;
																-webkit-box-orient: vertical;
																max-height: 42px;
														 }
														`
													}
												</style>
												{JSON.stringify(item.description) == "{}"?"":<div className="newshixunmodelmidfont newradioStyles"  dangerouslySetInnerHTML={{__html: item.description}}>
												</div>}

												{item.challenge_names===undefined?"":item.challenge_names.length===0?"":<div className="newshixunmodelbotfont">
													{item.challenge_names.map((item,key)=>{
														return(
                               <span>第{key+1}关：{item}</span>
														)
													})}
												</div>}

												<div className={"newshixunpd030"}>
													<div className="xuxianpro"></div>
												</div>

												<div className="color-grey panel-lightgrey fl ml30">
													<style>
														{`
														.ant-breadcrumb-separator{
														   color: #D7D7D7 !important;
														}
														.panel-lightgrey, .panel-lightgrey span{
														   color: #999 !important;
														}
														.ant-breadcrumb-link{
														   margin-right:10px !important;
														}
														.ant-breadcrumb-separator{
														   margin-right:20px !important;
														}
													`}
													</style>
													{this.props.type==='shixuns'?<Breadcrumb separator="|">
														<Breadcrumb.Item>{item.author_name}</Breadcrumb.Item>
														<Breadcrumb.Item>{item.author_school_name}</Breadcrumb.Item>
														<Breadcrumb.Item>难度系数：{item.level}</Breadcrumb.Item>
														<Breadcrumb.Item>学习人数：{item.study_count}</Breadcrumb.Item>
													</Breadcrumb>:
													<Breadcrumb separator="|">
														<Breadcrumb.Item>{item.author_name}</Breadcrumb.Item>
														<Breadcrumb.Item>{item.author_school_name}</Breadcrumb.Item>
														<Breadcrumb.Item>学习人数：{item.myshixuns_count}</Breadcrumb.Item>
														<Breadcrumb.Item>章节：{item.stage_count}</Breadcrumb.Item>
														<Breadcrumb.Item>实训：{item.shixuns_count}</Breadcrumb.Item>
													</Breadcrumb>}
												</div>
												{item.subjects===undefined?"":item.subjects.length===0?"":<Dropdown overlay={()=>this.ItsCourse(item.subjects)}>
													<a className="ant-dropdown-link fl ml30 newshixunfont12  color-blue" >
														所属课程<Icon className={"color-blue"} type="down" />
													</a>
												</Dropdown>}

											</div>
										</div>
									</div>
								</div>
							)})
							}
							</Checkbox.Group>

							{shixun_list===undefined||shixuns_count===undefined?"":shixun_list.length===0||shixuns_count===0?"":shixuns_count>20?<div className={" edu-txt-center pd303010 newshixunmodels"}>
								<Pagination
									showQuickJumper
									defaultCurrent={1}
									pageSize={20}
								  total={shixuns_count===undefined?"":shixuns_count}
								  current={page}
								  onChange={this.PaginationCourse}
								/>
							</div>:""}
							{
								shixun_list===undefined?
										<div className={"minhegiht300"}>

										</div>
								:shixun_list.length===0? <NoneData></NoneData>:""
							}



						</div>

					</div>

						<div className="clearfix bor-bottom-greyE edu-back-white orderingbox newshixunbottombtn"

						>
							{
								shixun_list===undefined?"":shixun_list.length===0?"":<div className={" edu-txt-center padding13-30"}>
									<Button className={"mr20 newshixunmode"} onClick={()=>this.props.hideNewShixunModelType()}>取消</Button>
									<Button className={"newshixunmode mr40"} type="primary" onClick={()=>this.savecouseShixunModal()} loading={this.state.hometypepvisible}>确定</Button>
								</div>}
						</div>
					</Spin>
				</Drawer>
			</div>

		)
	}
}

export default NewShixunModel;


// {JSON.stringify(item.content) == "{}"?<div className="newshixunmodelmidfont newradioStyles" title={item.description} dangerouslySetInnerHTML={{__html: item.description}}>
// </div>:<div className="newshixunmodelbotfont">
// 	{item.content.description === undefined || item.content.description===0?"":item.content.description.map((item,key)=>{
// 		return(
// 			<span dangerouslySetInnerHTML={{__html: item}}>{}</span>
// 		)
// 	})}
// </div>}
//
// {JSON.stringify(item.content) == "{}"?item.challenge_names.length===0?"":<div className="newshixunmodelbotfont">
// 	{item.challenge_names.map((item,key)=>{
// 		return(
// 			<span>第{key+1}关：{item}</span>
// 		)
// 	})}
// </div>:<div className="newshixunmodelbotfont">
// 	{item.content.challenge_names === undefined || item.content.challenge_names===0?"":item.content.challenge_names.map((item,key)=>{
// 		return(
// 			<span dangerouslySetInnerHTML={{__html: item}}>{}</span>
// 		)
// 	})}
// </div>}
