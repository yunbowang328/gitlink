import React,{ Component } from "react";
import { Modal,Radio,Input,Tooltip, Menu, Dropdown, Icon,Breadcrumb } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SendPanel from "./sendPanel.js";
import { getImageUrl } from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
import OpenCourse from './OpenCourse';
import Jointheclass from '../../modals/Jointheclass';
import './DetailTop.css';


const Search = Input.Search;
const RadioGroup = Radio.Group;
class DetailTop extends Component{
  constructor(props){
    super(props)
    this.state={
      cardsModalcancel:this.cardsModalcancel,
      cardsModalsave:this.cardsModalsave,
      Modalstype:false,
      Modalstopval:"",
      Modalsbottomval:'',
      loadtype:false,
      deletepathtype:false,
      cardsModalsavetype:false,
			MenuItemskey:1,
			courseslist:[],
			Pathcourseid:undefined,
			OpenCourseTypes:false,
			putappointmenttype:false,
			getappointmenttype:false,
			openpathss:false,
			cancel_publics:false,
			cancel_has_publics:false
    }
  }
	componentDidMount(){
    this.getdatalist();
	}
  getdatalist=()=>{
		let courseslist=[];
    let keys=1;
    let listtype=false;
		if(this.props.courses!=undefined&&this.props.courses.length!=0){
			if(this.props.detailInfoList.has_start===true){
				this.props.courses.map((item,key)=>{
					if(item.course_status.status===1){
						keys=key+1
						return(
							courseslist.push(item)
						)
					}
				})

			}else{
				let type=undefined;



					this.props.courses.map((item,key)=>{
						let arr=[]
							keys=key+1
							if(item.course_status.status===2) {
								type=key+1
									arr.push(item)
							}
						courseslist=arr;
					})

					this.props.courses.map((item,key)=>{
						let arr=[]
						if(listtype===false){
							keys=key+1
							if(item.course_status.status===0) {
								listtype=true
									// courseslist.push(item)
								arr.push(item)
								courseslist=arr
							}
						}
					})
			}
			if(courseslist.length!=0){
				this.props.getMenuItemsindex(keys,courseslist[0].course_status.status)
			}

		}

		this.setState({
			courseslist:courseslist,
			MenuItemskey:keys,
		})
	}
	componentDidUpdate=(prevProps)=> {
			if(prevProps.courses!=this.props.courses){
				this.getdatalist();
			}

	}

  allow_deletepath=()=>{
    this.setState({
      Modalstype:true,
      Modalstopval:"是否删除路径?",
      deletepathtype:true
    })
  }



  applyissuePath=()=>{
		let pathid=this.props.match.params.pathId;
		let url ="/paths/"+pathid+"/publish.json";
		axios.post(url).then((result)=>{
			if(result.status===200){
				if(result.data.status===0){
					this.setState({
						loadtype:true,
						Modalstype: true,
				    Modalstopval: 	` 课程需经过平台审核方可公开使用，公开的课程将对平台所`,
						modalsMidval:"有人公开可见。若仅本人教学使用则无需申请公开, 直接发",
						Modalsbottomval:"送到课堂即可.",
						cardsModalsavetype: true,
					})
					this.props.showNotification(result.data.message)
					this.props.getlistdatas();
				}else if(result.data.status===1){
					// window.location.reload();
				}
			}
		}).catch((error)=>{
			console.log(error);
		})


  }
  postcancelissuePath=()=>{
		let pathId=this.props.match.params.pathId;
		let url ="/paths/"+pathId+"/cancel_publish.json";
		axios.post(url).then((result)=>{
			if(result.status===200){
				if(result.data.status===0){

				}else if(result.data.status===1){
					this.cardsModalcancel()
					this.props.showNotification("撤销发布成功")
					this.props.getlistdatas()
					// window.location.href = "/paths/" + result.data.subject_id
				}
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

  cancelissuePath=()=>{

			this.setState({
				Modalstype: true,
				Modalstopval: "是否确认撤销发布？",
				// modalsMidval:"撤销发布后，学员将无法进行练习，若您新增关",
				// Modalsbottomval:"卡，学员需要重新体验实训",
				cardsModalsavetype: true,
				modalstyles:"848282"
			})


  }



  cardsModalcancel=()=>{
     this.setState({
       Modalstype:false,
       Modalsbottomval:'',
       loadtype:false,
       deletepathtype:false,
			 putappointmenttype:false,
			 modalsMidval:'',
			 modalstyles:'',
			 cardsModalsavetype:false,
			 applyissuePath:false,
			 openpathss:false,
			 cancel_publics:false,
			 cancel_has_publics:false,
			 Modalstopval:``,
     })
  }

  cardsModalsave=()=>{
    let {loadtype,deletepathtype}=this.state;

    //删除路径
    if(deletepathtype===true){
      let pathid=this.props.match.params.pathId;
      const deleteUrl = `/paths/`+pathid+`.json`;
      axios.delete(deleteUrl).then((response) => {
        const status = response.data.status
        if (status === 1) {
          window.location.href = "/paths";
        }
      }).catch((error) => {
        console.log(error)
      })
    }

    // //申请发布
    // if(loadtype===true){
		//
    //   let pathid=this.props.match.params.pathId;
    //   let url ="/paths/"+pathid+"/publish.json";
    //   axios.get(url).then((result)=>{
    //     if(result.status===200){
    //       if(result.data.status===0){
    //         this.setState({
    //           Modalstype:true,
    //           Modalstopval: result.data.message,
    //         })
    //       }else if(result.data.status===1){
    //         window.location.reload();
    //       }
    //     }
    //   }).catch((error)=>{
    //     console.log(error);
    //   })
		//
    // }
    this.setState({
      Modalstype:false,
      Modalsbottomval:''
    })
  }

	onVisibleChanges=(type)=>{
		this.setState({
			onVisibleChangestype:type
		})
	}

	MenuItems=(keys)=>{
	 let courseslist=[]
		this.props.courses.map((item,key)=>{
			if(keys===key+1){
				return(
					courseslist.push(item)
				)
			}
		})

		this.props.getMenuItemsindex(keys,courseslist[0].course_status.status)
   this.setState({
		 MenuItemskey:keys,
		 courseslist:courseslist,
		 onVisibleChangestype:!this.state.onVisibleChangestype
	 })
	}

	JoinnowCourse=(id,typeid)=>{

		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		if(this.props.checkIfProfileCompleted()===false){
			this.props.showProfileCompleteDialog()
			return
		}


		this.setState({
			yslJointhe:true,
			Pathcourseid:id,
			pathcousestypeid:typeid
		})
	}

	putappointment=()=>{
		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		if(this.props.checkIfProfileCompleted()===false){
			this.props.showProfileCompleteDialog()
			return
		}

		this.setState({
			Modalstype:true,
			Modalstopval:"是否确认立即预约？",
			Modalsbottomval:"",
			cardsModalcancel:()=>this.cardsModalcancel(),
			putappointmenttype:true,
			loadtype:false
		})
	}



	ysljoinmodalCancel=()=>{
		this.setState({
			yslJointhe:false
		})
	};
	ysljoinmodalCanceltwo=(key)=>{
		this.setState({
			yslJointhe:false
		})
	 this.props.getdatasindex(key)
	};

	OpenCoursefun=()=>{
		this.setState({
			OpenCourseTypes:true
		})
	}
	OpenCourseCancel=()=>{
		this.setState({
			OpenCourseTypes:false
		})
	}

	getappointment=()=>{
		let pathid=this.props.match.params.pathId;
		let url=`/paths/${pathid}/appointment.json`
		axios.post(url).then((response) => {

			if (response.status === 200) {

				if(response.data.status===0){
					this.setState({
						getappointmenttype:true
					})
					this.cardsModalcancel()
					// this.props.getlistdatas()
					this.props.showNotification(response.data.message)
				}else{
					this.cardsModalcancel()
					this.props.showNotification(response.data.message)
				}

			}
		}).catch((error) => {
			console.log(error)
			this.cardsModalcancel()
		})
	}

  postopenpaths=()=>{
		let pathid=this.props.match.params.pathId;

		let url ="/paths/"+pathid+"/apply_public.json";
		axios.post(url).then((result)=>{
			if(result.status===200){
				if(result.data.status===0){
					this.props.showNotification(result.data.message)
					this.props.getlistdatas();
					this.cardsModalcancel()
				}else if(result.data.status===1){
					this.props.showNotification(result.data.message)
					this.props.getlistdatas();
					this.cardsModalcancel()
				}
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	openpaths=()=>{
		this.setState({
			loadtype:true,
			Modalstype: true,
			openpathss:true,
			Modalstopval: "公开申请已提交，请等待管理员的审核",
			modalsMidval:"• 我们将在1-2个工作日内完成审核",
			Loadtype:true,
			modalstyles:"848282"
		})
	}

	postcancel_public=()=>{
		let pathid=this.props.match.params.pathId;
		let url ="/paths/"+pathid+"/cancel_public.json";
		axios.post(url).then((result)=>{
			if(result.status===200){
				if(result.data.status===0){
					this.cardsModalcancel()
					this.props.showNotification("撤销申请公开成功")
					this.props.getlistdatas();
				}
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	cancel_public=()=>{
		this.setState({
			cancel_publics:true,
			Modalstype: true,
			Modalstopval: "是否确认撤销申请公开？",
			modalsMidval:" ",
			ModalsBottomval:" ",
		})
	}

	postcancel_has_public=()=>{
		let pathid=this.props.match.params.pathId;
		let url ="/paths/"+pathid+"/cancel_has_public.json";
		axios.post(url).then((result)=>{
			if(result.status===200){
				if(result.data.status===0){
					this.cardsModalcancel()
					this.props.showNotification("撤消公开成功")
					this.props.getlistdatas();
				}
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	cancel_has_public=()=>{
		this.setState({
			cancel_has_publics:true,
			Modalstype: true,
			Modalstopval: "是否确认撤销公开？",
			modalsMidval:" ",
			ModalsBottomval:" ",
		})
	}

	render(){
    let{detailInfoList}=this.props;
    let{Modalstype,Modalstopval,cardsModalcancel,putappointmenttype,Modalsbottomval,cardsModalsavetype,loadtype,getappointmenttype,openpathss,cancel_publics,cancel_has_publics}=this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

		let menu = (
			<Menu>
				{this.props.courses===undefined||this.props.courses.length===0?"":this.props.courses.map((item,key)=>{
					return(
						<Menu.Item>
							<a rel="noopener noreferrer" onClick={()=>this.MenuItems(key+1)}>
								第{key+1}次开课
							</a>
						</Menu.Item>
						)
				})}
			</Menu>
		);



		let applypath=this.props.detailInfoList&&this.props.detailInfoList.participant_count!=undefined&&this.props.detailInfoList&&this.props.detailInfoList.allow_statistics===false;
    let coursestypes=this.props.courses!=undefined&&this.props.courses.length===0;
    let isadminallow_statistics=this.props.courses&&this.props.courses.length===0&&this.props.detailInfoList&&this.props.detailInfoList.allow_statistics===true;

		return(

			<div className={this.props.courses===undefined?"subhead":this.props.courses.length===0?applypath===true?"subhead mb100":"subhead":applypath===false?detailInfoList.name.length>40?"subhead mb100":"subhead mb70":this.state.MenuItemskey===this.props.courses.length?"subhead mb120":detailInfoList.name.length>40?"subhead mb100":"subhead mb80"}>


        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalsBottomval={Modalsbottomval}
          modalCancel={cardsModalcancel}
          modalSave={loadtype===true&&openpathss===false?()=>this.cardsModalcancel():cardsModalsavetype===true?()=>this.postcancelissuePath():openpathss===true?()=>this.postopenpaths():cancel_publics===true?()=>this.postcancel_public():cancel_has_publics===true?()=>this.postcancel_has_public():putappointmenttype===true?()=>this.getappointment():()=>this.cardsModalsave()}
          loadtype={loadtype}
					modalsMidval={this.state.modalsMidval}
					modalstyles={this.state.modalstyles}
        >
        </Modals>
			{this.state.yslJointhe===true?<Jointheclass   {...this.props} {...this.state} ysljoinmodalCancel={()=>this.ysljoinmodalCancel()} ysljoinmodalCanceltwo={()=>this.ysljoinmodalCanceltwo(this.state.MenuItemskey)}></Jointheclass>:""}
			{this.state.OpenCourseTypes===true?<OpenCourse  {...this.props} {...this.state} OpenCourseCancel={()=>this.OpenCourseCancel()}/>:""}
				<style>
					{

						`
						.subhead_content{
						    position: relative;
						}

						.userNavs{
								position: absolute;
								width: 1200px;
						}
						`
					}
				</style>
        {
          detailInfoList &&
					<div  className={this.props.courses===undefined?"subhead_content":this.props.courses.length===0?"subhead_content pt40":"subhead_content "}>
            <div className="font-28 color-white clearfix">
							{/*<Tooltip placement="bottom" title={detailInfoList.name.length>27?detailInfoList.name:""}>*/}

							{/*</Tooltip>*/}

							<style>
								{
									`
									.pathoranges{
    				  	     display: inline-block;
											width: 64px;
											background-color: #FF6800;
											background-size: 100% 100%;
											padding: 0px 4px;
											color: #fff;
											height: 28px;
											font-size: 14px;
											border-radius: 4px;
											position: relative;
											top: 5px;
											left: 15px;
									}
									.pathoranges div{
									    position: absolute;
    									top: -6px;
									}
									.xxtjbtn{

									    width: 103px;
											height: 38px;
											background: rgba(255,255,255,1);
											border-radius: 4px;
											border: 1px solid rgba(255,255,255,1);
											color: #970084 !important;
											font-size: 15px !important;
									    line-height: 36px !important;
									}
									.kkbths{
									width:103px;
									height:38px;
									border-radius:4px;
								  line-height: 36px !important;
									border:1px solid rgba(255,255,255,1);
									}
									.maxwinth600{
									  width:730px;
									}
									`
								}
							</style>

							<span className="fl lineh-40">
                 {detailInfoList.name}
                 {detailInfoList===undefined?"":detailInfoList.excellent === false ? "" :
									 <span className="pathoranges">
										 <div>开放课程</div>
									 </span>
                 }
               </span>

            </div>
            <div className="clearfix mt20">
              {
                detailInfoList &&
                <ul className="fl color-grey-eb pathInfo">
                  { detailInfoList.stages_count!=0 ? <li><span>章节</span><span className="ml5">{detailInfoList.stages_count}</span></li> : ""}
                  { detailInfoList.shixuns_count!=0 ? <li><span>实训</span><span className="ml5">{ detailInfoList.shixuns_count}</span></li> : ""}
                  { detailInfoList.challenge_choose_count!=0 ? <li><span>选择题任务</span><span>{detailInfoList.challenge_choose_count}</span></li> : ""}
                  { detailInfoList.challenges_count!=0 ? <li><span>实践任务</span><span>{detailInfoList.challenges_count}</span></li> : ""}
                  { detailInfoList.subject_score!=0 ? <li><span>经验值</span><span>{detailInfoList.subject_score}</span></li> : ""}
                  { detailInfoList.member_count!=0 ? <li><span>学习人数</span><span>{detailInfoList.member_count}</span></li> : ""}
                </ul>
              }
				    	<div className="fr pr maxwinth600">

								{detailInfoList===undefined?"":detailInfoList.allow_statistics===true?
									<Link to={"/paths/"+this.props.match.params.pathId+"/statistics"}  className="user_default_btn fr font-18 xxtjbtn">
									学习统计
									</Link>:""
									}

								{ detailInfoList.allow_send === true?
										<SendPanel {...this.props} {...this.state} widths={"80px"}></SendPanel>
								:""
								}

								{this.props.courses===undefined?"":detailInfoList.is_creator===true?<a className={"fr font-18 color-white kaike mr20 kkbths"} style={{'width':'65px'}} onClick={()=>this.OpenCoursefun()}>开课</a>:""}

								{ detailInfoList.allow_statistics===true&& detailInfoList.public_status===2?
									<a className="fr font-18 color-white kaike mr20 kkbths" onClick={this.cancel_has_public}>撤销公开</a>:""
								}

								{detailInfoList.allow_statistics===true&& detailInfoList.public_status===1?
									<a className="fr font-18 color-white kaike mr20 kkbths" onClick={this.cancel_public} style={{width:'135px'}}>撤销申请公开</a>:""
								}

								{ detailInfoList.publish_status===2&& detailInfoList.allow_statistics===true&& detailInfoList.public_status===0?
									<a className="fr font-18 color-white kaike mr20 kkbths" onClick={this.openpaths}>申请公开</a>:""
								}

								{
									detailInfoList.publish_status===2 && detailInfoList.allow_statistics===true&&detailInfoList.public_status===0?
										<a className="fr font-18 color-white kaike mr20 kkbths" onClick={this.cancelissuePath}>撤销发布</a>:""
								}


								{
									detailInfoList.publish_status===0&&detailInfoList.allow_add_member===true?
											<a className="fr font-18 color-white kaike mr20 kkbths"
												 style={{'width':'65px'}}
												 onClick={this.applyissuePath}>发布</a>:""
								}


								{detailInfoList===undefined?"":detailInfoList.allow_delete===true?<a
									className={"fr font-18 color-white kaike mr20 kkbths"}
									onClick={this.allow_deletepath}
									style={{'width':'65px'}}
								>删除</a>:""}

								{detailInfoList===undefined?"":detailInfoList.allow_statistics===true?
									<Link to={"/paths/"+this.props.match.params.pathId+"/edit"}
												style={{'width':'65px'}}
												className="fr font-18 color-white kaike mr20 kkbths" >
										编辑
									</Link>
									:""
								}
							</div>


            </div>

							{this.props.courses===undefined||isadminallow_statistics===true?"":<div className="userNavs mt20" style={applypath===false?{}:this.state.MenuItemskey===this.props.courses.length?{height:'135px'}:{}}>
								<style>
									{
										`
										.anticon-down{
											font-size:14px !important;
											transform:none !important;
										}
										.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover {
											background-color: rgba(240,240,240,1);
										}
										.alist{
											color:#000;
										}
									  .alist:hover{
											color:#000;
										}
										.aIcons{
										  color:#CDCDCD;
										}
										`
									}
								</style>
								{this.props.courses===undefined||this.props.courses.length===0?"":<li className={"fl pd4020 mt10"}>

										{this.state.courseslist.map((item,key)=>{
											if(item.course_identity<4){
												return(
													<Tooltip placement="bottom" title={"编辑课堂"} key={key}>
														<a href={`/courses/${item.course_id}/newgolds/settings`} target={"_blank"}>
															<i className="iconfont icon-bianji1 newbianji1"></i>
														</a>
													</Tooltip>
												)}})
										}


										<Dropdown
											overlay={menu}
											onVisibleChange={this.onVisibleChanges}
										>
											<a className={"alist"}>
												第<span className={"color-orange"}>  {this.state.MenuItemskey}  </span>次开课 <Icon className="aIcons" type={!this.state.onVisibleChangestype?"down":"up"} />
											</a>
										</Dropdown>
									</li>}
									<style>
										{
											`
										.pdt28{
										    padding-top: 28px;
										}
										.ml23{
										  margin-left:23px;
										}
										.pathtime{
										    color: #9B9B9B;
    										font-size: 12px;
										}
										.pathtimes{
											color: #05101A;
											font-size: 14px;
										}
										`
										}
									</style>
								{this.props.courses===undefined||this.props.courses.length===0?"":<li className={"ml20"}>
										{this.state.courseslist.map((item,key)=>{
											return(
												<div className={"ant-breadcrumb pdt28"} key={key}>
															<span>
											 <div className="ant-breadcrumb-link fl mr23">
												 <div className={"pathtime"}>
													 开课时间：
												 </div>
											   <div className={"pathtimes"}>
											      {item.start_date}
												 </div>
											 </div>
											 <div className="fl solidright"></div>
										</span>

													<span>
												 <div className="ant-breadcrumb-link fl mr23 ml23">
													 <div className={"pathtime"}>
														 结课时间：
													 </div>
													 <div className={"pathtimes"}>
														 {item.end_date}
													 </div>
												 </div>
												 <div className="fl solidright"></div>
											</span>

													<span>
												 <div className="ant-breadcrumb-link fl mr23 ml23">
													 <div className={"pathtime"}>
														 报名人数：
													 </div>
													 <div className={"pathtimes"}>
													  {item.student_count}   人
													 </div>
												 </div>
											</span>
												</div>
											)
										})
										}

									</li>}
								<style>
									{
										`
											.user-colorgrey-9b{color:#9B9B9B}
											.user-colorgrey-green{color:#7ED321}
											.background191{
												background: rgba(191,191,191,1) !important;
    										color: #fff;
											}
											.mr51{
											    margin-right: 51px;
											}
											.pathbtens{
											  width: 150px !important;
												height: 44px !important;
												line-height: 44px !important;
											}
											.pathdefault{
											    cursor: default !important;
											}
											.courseslistsa{
											  color:#fff !important;
											}
											.pathbtensbox{
											width: 215px !important;
											height: 46px !important;
											background: rgba(76,172,255,1);
											border-radius: 4px;
											line-height: 46px !important;
											}
											.lineHeight1{
											line-height: 1px;
											}
											.font153{
											    font-size: 14px;
													font-weight: 400;
													color: rgba(153,153,153,1);
													margin-left: 30px;
											}

											.absolutewidth{
											    position: absolute;
													top: 19px;
													right: 71px;
											}
											.relativewidth{
											    position: relative;
    											width: 100%;
											}
											.padding040{
    											padding: 0 43px;
											}
											.mt26{
											  margin-top:26px;
											}
											.mt10block{
											  margin-top: 10px;
                        display: inline-block;
											}
											`
									}
								</style>
								{this.props.courses===undefined||this.props.courses.length===0?"":<li className={"fr padding040"}>


										{/*
										height: 158px;
										}*/}
										{this.state.courseslist.map((item,key)=>{

											return(
												<div key={key}>
													{applypath===false?"":this.state.MenuItemskey===this.props.courses.length||coursestypes===true?
														this.props.detailInfoList&&this.props.detailInfoList.has_participate===false?
															getappointmenttype===true?<span className={coursestypes===true?"fr user_default_btn background191 font-18 pathbtensbox  mt5":"fr user_default_btn background191 font-18 pathbtensbox mt26"}>预约报名成功</span>:<a className={coursestypes===true?"fr user_default_btn task-btn-28BE6C font-18 pathbtensbox  mt5":"fr user_default_btn task-btn-28BE6C font-18 pathbtensbox mt26"}  onClick={()=>this.putappointment()}>期待开课并预约报名</a>:
															<span className={coursestypes===true?"fr user_default_btn background191 font-18 pathbtensbox  mt5":"fr user_default_btn background191 font-18 pathbtensbox mt26"}>预约报名成功</span>:""}

													{/*{item.course_status.status===0?<div className="mr51 shixun_detail pointer fl user-colorgrey-green pathdefault">即将开课</div>:""}*/}
													{item.course_status.status===1?<div className="mr51 shixun_detail pointer fl color-orange pathdefault mt10">{item.course_status.time}</div>:""}
													{item.course_status.status===2&&item.course_identity<6?<div className="mr20 shixun_detail pointer fl user-colorgrey-9b pathdefault mt10">已结束</div>:""}
													{/*<div className="fr user_default_btn background191 font-18 mt28 pathbtens pathdefault">已结束</div>*/}
													{item.course_status.status===0?
														item.course_identity<5?<a className="fr user_default_btn task-btn-orange font-18 mt28 pathbtens courseslistsa mr20" href={item.first_category_url} target="_blank">
															进入课堂
														</a>:item.course_identity<6?<div className="fr user_default_btn background191 font-18 mt28 pathbtens pathdefault mr20">报名成功</div>
															:<a className="fr user_default_btn task-btn-orange font-18 mt28 pathbtens mr20"  onClick={()=>this.JoinnowCourse(item.course_id)}>立即报名</a>:""}

													{item.course_status.status===1?
														item.course_identity<5?<a className="courseslistsa fr user_default_btn task-btn-orange font-18 mt28 pathbtens mr20" href={item.first_category_url} target="_blank">
															进入课堂
														</a>:item.course_identity<6?<a className="courseslistsa fr user_default_btn task-btn-orange font-18 mt28 pathbtens mr20" href={item.first_category_url} target="_blank">
															立即学习
														</a>:<a className="fr user_default_btn task-btn-orange font-18 mt28 pathbtens mr20"  onClick={()=>this.JoinnowCourse(item.course_id,item.course_status.status)}>立即加入</a>:""}

													{item.course_status.status===2?
														item.course_identity<6?<a className="fr user_default_btn task-btn-orange font-18 mt28 pathbtens courseslistsa mr20" href={item.first_category_url} target="_blank">
															进入课堂
														</a>:<div className="mr20 shixun_detail pointer fl user-colorgrey-9b pathdefault mt10">已结束</div>:""}

												</div>
											)})}


									</li>}



								{applypath===false?"":this.state.MenuItemskey===this.props.courses.length?<div className={"clear"}></div>:""}

								{applypath===false?"":this.props.courses.length===0?"":this.state.MenuItemskey===this.props.courses.length||coursestypes===true?<span className={coursestypes===true?"fr lineHeight1 relativewidth mt43":"fl lineHeight1 relativewidth"}>
									<span className={"fr mr30"}>当前预约报名人数：<span className={"color-red mr5"}>{getappointmenttype===true?this.props.detailInfoList&&this.props.detailInfoList.participant_count+1:this.props.detailInfoList&&this.props.detailInfoList.participant_count}</span>人</span>
										<span className={"font153 fr mr12"}>当预约报名人数达到   {this.props.detailInfoList&&this.props.detailInfoList.student_count}    人时即将开课</span>
										{/*{this.props.detailInfoList&&this.props.detailInfoList.has_participate===false?*/}
										{/*getappointmenttype===true?<span className={coursestypes===true?"fr user_default_btn background191 font-18 pathbtensbox absolutewidth mt5":"fr user_default_btn background191 font-18 pathbtensbox absolutewidth"}>预约报名成功</span>:<a className={coursestypes===true?"fr user_default_btn task-btn-28BE6C font-18 pathbtensbox absolutewidth mt5":"fr user_default_btn task-btn-28BE6C font-18 pathbtensbox absolutewidth"}  onClick={()=>this.putappointment()}>期待开课并预约报名</a>:*/}
										{/*<span className={coursestypes===true?"fr user_default_btn background191 font-18 pathbtensbox absolutewidth mt5":"fr user_default_btn background191 font-18 pathbtensbox absolutewidth"}>预约报名成功</span>}*/}
								</span>
									:""}

								{applypath===true&&this.props.courses.length===0?this.state.MenuItemskey===this.props.courses.length||coursestypes===true?<span className={coursestypes===true?"fl ml20 lineHeight0 relativewidth":"fl ml20 lineHeight0 relativewidth"}>
									<span className={"mt10block"}>当前预约报名人数：<span className={"color-red mr5"}>{getappointmenttype===true?this.props.detailInfoList&&this.props.detailInfoList.participant_count+1:this.props.detailInfoList&&this.props.detailInfoList.participant_count}</span>人</span>
									<span className={"font153 mt10block"}>当预约报名人数达到   {this.props.detailInfoList&&this.props.detailInfoList.student_count}    人时即将开课</span>
									{this.props.detailInfoList&&this.props.detailInfoList.has_participate===false?
										getappointmenttype===true?<span className={coursestypes===true?"fr user_default_btn background191 font-18 pathbtensbox absolutewidth mt5":"fr user_default_btn background191 font-18 pathbtensbox absolutewidth"}>预约报名成功</span>:<a className={coursestypes===true?"fr user_default_btn task-btn-28BE6C font-18 pathbtensbox absolutewidth mt5":"fr user_default_btn task-btn-28BE6C font-18 pathbtensbox absolutewidth"}  onClick={()=>this.putappointment()}>期待开课并预约报名</a>:
										<span className={coursestypes===true?"fr user_default_btn background191 font-18 pathbtensbox absolutewidth mt5":"fr user_default_btn background191 font-18 pathbtensbox absolutewidth"}>预约报名成功</span>}
									</span>:"":""}


						</div>}

          </div>
        }




      </div>
    )
  }
}
export default DetailTop;