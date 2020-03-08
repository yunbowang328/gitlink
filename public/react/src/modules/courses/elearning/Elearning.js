import React,{ Component } from "react";
import { Input,Checkbox,Table, Pagination, Modal,Menu, Tooltip,Spin,Button,Form,Icon,message,Progress,notification} from "antd";
import { WordsBtn,on, off, trigger,markdownToHTML,getImageUrl} from 'educoder';
import './myelearning.css'
import axios from 'axios';
import YslDetailCards from "./YslDetailCards.js";
import Jointheclass from '../../modals/Jointheclass';
import LoginDialog from "../../login/LoginDialog";
import NoneData from '../../../modules/courses/coursesPublic/NoneData'

//在线学习
class Elearning extends Component{
	constructor(props){
		super(props);

		this.state={
			description:"",  //简介
			isSpin:true,
			start_learning:undefined, //是否要开始学习   没开始学习 点击第一个是开始学习 就是学习下面的从第一个开始
			learned:0,  //学习进度
			last_shixun:"", //上次学习的实训
			stages:[], //实践课程的章节
			yslJointhe:false,
			shixunsreplace:false,
			hidestartshixunsreplacevalue:"",
			shixunsmessage:"",
			startshixunCombattype:false,
			isSpins:false,
			userlogin:"",
			isRender:false,
			subject_id:0,
			myupdataleftNavs:this.myupdataleftNav
		}
	}

	componentDidMount() {
		// 记得删除退出课堂
		// console.log("在线学习");
	  // console.log("获取到数据");
		// console.log(this.props);
		this.getdata();
	}

	getdata=()=>{
		console.log("更新了数据了");
		let url = `/courses/${this.props.match.params.coursesId}/online_learning.json`;
		// //
		axios.get(url).then((response) => {
			if(response){
				if(response.data){
					// console.log("获取到到数据");
					//  console.log(response);
					this.setState({
						description: response.data.description,
						start_learning:response.data.start_learning,
						learned:response.data.learned,
						last_shixun:response.data.last_shixun,
						stages:response.data.stages,
						subject_id:response.data.subject_id,

					});
				}
			}
			this.setState({
				isSpin:false,
			})
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin:false,
			})
		});
		try {
			if(this.props.current_user!==undefined){
				this.setState({
					userlogin :this.props.current_user.login,
				})
			}
		}catch (e) {
			console.log("12312312312")
			console.log(e);
		}
	}
	componentDidUpdate = (prevProps) => {
		 console.log("componentDidUpdate");
		// console.log(prevProps);
		// console.log(this.props);
		if(prevProps.current_user!=this.props.current_user){
			if(this.props.current_user!==undefined){
				// console.log(this.props.current_user.login);
				// console.log(prevProps.current_user.login);
				this.setState({
					userlogin :this.props.current_user.login,
				})
			}
		}

			if(prevProps.yslElearning===this.props.yslElearning) {
				if(prevProps.yslElearning===true && this.props.yslElearning===true){
					// console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
					// console.log(prevProps.yslElearning);
					// console.log(this.props.yslElearning);
					this.getdata();
				this.props.comyslElearning(false);
				}
			}

	}


	//开始学习
	Startlearning=()=>{
		let {userlogin} = this.state;
		console.log("userlogin");
		console.log(userlogin);
		if (userlogin === undefined) {
			this.setState({
				isRender: true
			})
			return
		}
		if (userlogin === "") {
			this.setState({
				isRender: true
			})
			return;
		}
		if(this.props.isNotMember()===true){
			this.setState({
				yslJointhe:true
			})
		}else {
			let {stages}=this.state;
       if(stages.length>0){
       	var stagesdatas=[];
       	 for(var i=0;i<stages.length;i++){
       	 	for(var ki=0;ki<stages[i].shixuns_list.length;ki++){
						if(stages[i].shixuns_list[ki].shixun_status !=="暂未公开"){
							var id=stages[i].shixuns_list[ki].identifier;
							console.log(id);
							stagesdatas.push(id);
						}
					}
       	 }
       	 console.log(stagesdatas[0]);
       	 if(stagesdatas.length>0){
					 this.kaishishixun(stagesdatas[0]);

				 }else {
					 notification.open({
						 message:"提示",
						 description: "实训暂未公开!"
					 });
				 }
				 console.log("这是"+i);
			 }
		}
	};
	kaishishixun=(id)=>{
		let url = "/shixuns/" + id + "/shixun_exec.json";
		axios.get(url).then((response) => {
			console.log("精品课堂开发学习");
			console.log(response);
			// console.log(JSON.stringify(response));
			if (response.data.status === -2) {
				this.setState({

					shixunsreplaces:true,
					hidestartshixunsreplacevalues:response.data.message+".json"
				})
			} else if (response.data.status === -1) {
				console.log(response)
			}else if(response.data.status===-3){
				this.setState({
					shixunsmessages:response.data.message,
					startshixunCombattypes:true,
				})
			} else {
				console.log("开始学习了");
				window.open("/tasks/" + response.data.game_identifier,'_blank');
				//这个是传过来  调用刷新
				this.Myreload();
				// window.location.href = path
				// let path="/tasks/"+response.data.game_identifier;
				// this.props.history.push(path);
			}
		}).catch((error) => {

		});
	}

	Startlearningtwo=()=>{
			this.setState({
				yslJointhe:true
			})
	};
	ysljoinmodalCancel=()=>{
		this.setState({
			yslJointhe:false
		})
	};
	ysljoinmodalCanceltwo=()=>{
		this.setState({
			yslJointhe:false
		})
		window.location.reload();
	};

	Myreload = ()=>{
		window.location.reload();
	};


	hidestartshixunsreplace=(url)=>{
		this.setState({
			isSpins:true,
		})
		axios.get(url).then((response) => {
			// debugger
			if(response.status===200){
				// let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
				// this.props.history.push(path);
				message.success('重置成功，正在进入实训！');
				this.startgameid(response.data.shixun_identifier);
				this.setState({
					shixunsreplaces:false,
					isSpins:false,
				})

				// message.success('重置成功，正在进入实训！');
				// this.startshixunCombat();
			}}
		).catch((error) => {
			this.setState({
				isSpins:false,
				shixunsreplaces:false,
			})
		});

	};

	startgameid=(id)=>{
		if(this.props.isNotMember()===true){
			//这个是外部传过来的
		 this.Startlearningtwo();
			return
		}
		let url = "/shixuns/" + id + "/shixun_exec.json";
		axios.get(url).then((response) => {

			if (response.data.status === -2) {
				this.setState({

					shixunsreplaces:true,
					hidestartshixunsreplacevalues:response.data.message+".json"
				})
			} else if (response.data.status === -1) {
				console.log(response)
			}else if(response.data.status===-3){
				this.setState({
					shixunsmessages:response.data.message,
					startshixunCombattypes:true,
				})
			} else {
				console.log("开始学习了");
				window.open("/tasks/" + response.data.game_identifier,'_blank');
				//这个是传过来  调用刷新
				this.Myreload();
				// window.location.href = path
				// let path="/tasks/"+response.data.game_identifier;
				// this.props.history.push(path);
			}
		}).catch((error) => {

		});

	};
	hidestartshixunCombattype=()=>{
		this.setState({
			startshixunCombattypes:false
		})
	};
	Modifyloginvalue=()=>{
		this.setState({
			isRender:false,
		})
	};
	Tojoinclass=()=> {
			this.setState({
				isRender: true
			})
	};

	myupdataleftNav=()=>{
		this.props.updataleftNavfun();
	}
	render(){
		console.log("Elearning++++++++");
		// console.log(this.props.Chapterupdate);
		let{description,whethertoedit,isSpin,start_learning,hidestartshixunsreplacevalues,learned,last_shixun,stages,isRender} =this.state;
    const  isNotMembers=this.props.isNotMember();//非课堂成员
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		return(
			<React.Fragment  >
				<div id={"zhudiv"}>
					{isRender===true?<LoginDialog
						Modifyloginvalue={()=>this.Modifyloginvalue()}
						{...this.props}
						{...this.state}
					/>:""}
					<Jointheclass   {...this.props}   {...this.state} ysljoinmodalCancel={()=>this.ysljoinmodalCancel()} ysljoinmodalCanceltwo={()=>this.ysljoinmodalCanceltwo()}></Jointheclass>
					<Modal
						keyboard={false}
						title="提示"
						visible={this.state.startshixunCombattypes}
						closable={false}
						footer={null}
					>
						<div className="task-popup-content">
							<p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{this.state.shixunsmessages}之后开放，谢谢！</p>
						</div>
						<div className="task-popup-submit clearfix">
							{/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
							<a className="task-btn task-btn-orange fr"
								 style={{marginRight:'51px'}}
								 onClick={this.hidestartshixunCombattype}>知道了</a>
						</div>
						{/*<p className="inviteTipbtn with100 fl">*/}
						{/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
						{/*</p>*/}
					</Modal>
					<Modal
						keyboard={false}
						title="提示"
						visible={this.state.shixunsreplaces}
						closable={false}
						footer={null}
					>
						<Spin indicator={antIcon} spinning={this.state.isSpins}>
							<div className="task-popup-content">
								<p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
							</div>
							<div className="task-popup-submit clearfix">
								<a className="task-btn task-btn-orange fr"
									 style={{marginRight:'51px'}}
									 onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalues)}>知道了</a>
							</div>
						</Spin>
					</Modal>
					<div className="edu-back-white">
						{
							this.props.isAdmin()===true?"":
								<div>
									{
										start_learning===undefined?"":start_learning===false?
											<div className="clearfix padding30 bor-bottom-greyE" style={{textAlign: "center"}}>
												<div style={{height: '40px',textAlign: "center"}}>
													<span className=" fl color-dark-21 " style={{height: '40px', textAlign: "center",fontSize:"19px"}}>还未开始学习</span>
															<Button    className="ant-btn defalutSubmitbtn   ant-btn-primary  colorblue font-16 fr" onClick={()=>this.Startlearning()}>
																<span>开始学习</span></Button>

												</div>

											</div>
											:
											<div className="clearfix padding30 bor-bottom-greyE" style={{textAlign: "center"}}>
												<div style={{height: '40px',textAlign: "left"}}>
													<span className=" color-dark-21 " style={{height: '40px', textAlign: "center",fontSize:"19px",color:"#05101A"}}>已学{learned}%</span>
												</div>
												<div style={{marginTop:"7px",width:"401px"}}>
													<Progress percent={learned} showInfo={false} />
												</div>
												<div style={{marginTop:"7px",textAlign: "left"}}>
													<span className="font-16">上次学习内容</span><span style={{color:"#4CADFF",marginLeft:"25px"}}>{last_shixun}</span>
												</div>


											</div>
									}
								</div>
						}

						 {/*简介*/}

								{/*<div className="clearfix pl30 pr30" style={{paddingBottom:"22px"}}>*/}
								{/*	<div style={{textAlign: "left",marginTop:"10px",paddingBottom: "10px"}}>*/}
								{/*		<span className=" color-dark-21 " style={{textAlign: "center",fontSize:"19px"}}>简介</span>*/}
								{/*	</div>*/}
								{/*	<div  className="edu-back-white new_li  editormd-html-preview " >*/}
								{/*		<p className="markdown-body fonttext "  dangerouslySetInnerHTML={{__html: markdownToHTML(description).replace(/▁/g,"▁▁▁")}}>*/}
								{/*		</p>*/}
								{/*	</div>*/}

								{/*</div>*/}

					</div>


					<Spin size="large" spinning={isSpin}  id={"cdiv"}>

						<div className=" clearfix" style={this.props.isAdmin()===true?{marginTop:"0px"}:{marginTop:"20px"}}>

									<div>
										{/*开始学习*/}
										<YslDetailCards {...this.state} {...this.props} Startlearningtwo={()=>this.Startlearningtwo()} Myreload={()=>this.Myreload()}  Tojoinclass={()=>this.Tojoinclass()} getPathCardsList={()=>this.getdata()} ></YslDetailCards>
									</div>


						</div>
					</Spin>

				</div>
			</React.Fragment>
		)
	}
}
const Elearningss = Form.create({ name: 'elearning' })(Elearning);
export default Elearningss;
