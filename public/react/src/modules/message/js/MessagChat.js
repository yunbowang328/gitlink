import React, { Component } from 'react';
import "../css/messagemy.css"
import {getImageUrl,markdownToHTML,htmlEncode} from 'educoder';
import { Modal,Input,Icon,Tooltip,Spin} from 'antd';
import axios from 'axios';
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import moment from 'moment';
import Rightdialogue from './Rightdialogue'
import Leftdialogue from './Leftdialogue'
//私信聊天页面
class MessagChat extends Component{
	constructor(props) {
		super(props);
		this.messageRef = React.createRef();
		this.state={
			isSpin:false,
			isSpins:false,
			limit:20,
			page:1,
			datay:[],
			limits:20,
			mess:false,
			myuserl:[],
			pages:1,
			mypagey:20,
			messages:[],
			objc:[],
			datanull:1,
		}
	}
	componentDidMount(){
		 this.getdata(1);

		 const query = this.props.location.search;
		 let target_ids = query.split('?target_ids=');
		 this.getChatList(1,this.state.limits,target_ids[1]);
		 // console.log("MessagChat111111");
	   // console.log(this.props.myysluser);
	   this.setState({
		 myyslusers:this.props.myysluser
	 })
		try {
			this.props.Mtab(3);
		}catch (e) {

		}
		// console.log("MessagChat111111");
		// console.log(this.props);
		// console.log(this.props.match.params.userid);
		this.scrollToBottom();
		this.props.triggerRef(this)
	}

	componentDidUpdate() {
		// this.scrollToBottom();
	}

	scrollToBottom() {
		const scrollHeight = this.messageList.scrollHeight;
		const height = this.messageList.clientHeight;
		const maxScrollTop = scrollHeight - height;
		this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}



	contentViewScrolltop=(e)=>{
		if(e.currentTarget.scrollTop===0){

			if(this.state.datanull===0){
				return
			}
			console.log("调用了方法1111111");
			let {pages}=this.state;
			let newpage=pages+1
			const query = this.props.location.search;
			let target_ids = query.split('?target_ids=');
			this.shuaxingetChatList(newpage,this.state.limits,target_ids[1],true);
			this.messageList.scrollTop=50;


		}
	}
	// 滑动刷新
	contentViewScrolledit=(e)=>{
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		//滑动到底判断
		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
			// console.log("滑动到底判断");
			let {page}=this.state;
			let newpage=page+1
			this.getdata(newpage);
			// let ls=newpage*20
			// this.setState({
			// 	limits:ls,
			// })
		}
		//滑动到顶部
		// console.log("滑动到顶部判断");
		// console.log(e.currentTarget.clientHeight);
		// console.log(e.currentTarget.scrollTop);
		// console.log(e.currentTarget.scrollHeight);
		// if(e.currentTarget.scrollHeight+e.currentTarget.scrollTop===e.currentTarget.clientHeight){
		// 	 console.log("滑动到顶部判断");
		//
		// 	// let ls=newpage*20
		// 	// this.setState({
		// 	// 	limits:ls,
		// 	// })
		// }

	};

	shuaxingetChatList=(page,listl,target_ids,bool)=>{
		this.setState({
			isSpin:true,
		});
		let url = `/users/${this.props.match.params.userid}/private_message_details.json`;
		axios.get((url),{params:{
				target_id:target_ids,
				page:	page,
				per_page:listl,
			}}).then((result) => {
			this.setState({
				isSpin: false,
			});
			if (result) {
				// if (result.data.status === 0) {
				if (result.data !== null) {
					if(result.data.messages.length===0){
            console.log("没有数据了");
            this.setState({
							datanull:0,
						})
						return
					}
					var laoshuju=this.state.messages;
					var datas = [];
					var datay = result.data.messages;
					datay = datay.reverse();
					datay=datay.concat(laoshuju);
					var obj = {};
					for (var i = 0; i < datay.length; i++) {
						if (i === 0) {
							var timetwoy=datay[i].send_time.slice(0,10);
							datay[i].send_day = timetwoy;
							obj = datay[i];
							datas.push(datay[i]);
						} else {
							try {
								var timeone=obj.send_time.slice(0,10);
								var timetwo=datay[i].send_time.slice(0,10);
								if (moment(timeone).isSame(timetwo)) {
									datay[i].send_day = "";
								} else {
									datay[i].send_day = timetwo;
									obj = datay[i];
								}
							}catch (e) {

							}
							datas.push(datay[i]);
						}
					}
					console.log("新数组+++++++++++++++++++++++++++++++++++++");
					console.log(datas)
					//颠倒数组
					this.setState({
						messages: datas,
						myuserl: result.data.target,
						pages:page,
					})
					// }

				}
			}

		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin:false,
			})
		})
	};
	getChatList=(page,listl,target_ids)=>{
		this.setState({
			isSpin:true,
		});
		let url = `/users/${this.props.match.params.userid}/private_message_details.json`;
		axios.get((url),{params:{
				target_id:target_ids,
				page:	page,
	    	per_page:listl,
			}}).then((result) => {
			if (result) {
				// if (result.data.status === 0) {
					if (result.data !== null) {
						var datas = [];
						var datay = result.data.messages;
						datay = datay.reverse();
						var obj = {};
						for (var i = 0; i < datay.length; i++) {
							if (i === 0) {
								var timetwoy=datay[i].send_time.slice(0,10);
								datay[i].send_day = timetwoy;
								obj = datay[i];
								datas.push(datay[i]);
							} else {
								try {
									var timeone=obj.send_time.slice(0,10);
									var timetwo=datay[i].send_time.slice(0,10);
									if (moment(timeone).isSame(timetwo)) {
										datay[i].send_day = "";
									} else {
										datay[i].send_day = timetwo;
										obj = datay[i];
									}
								}catch (e) {

								}
								datas.push(datay[i]);
							}
						}
						//颠倒数组
						this.setState({
							messages: datas,
							myuserl: result.data.target,
							pages:page,
						})
					// }
						this.scrollToBottom();

				}
			}
			this.setState({
				isSpin: false,
			});
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin:false,
			})
		})
	};
	getChatListtwo=(pages,listls,target_ids)=>{
		this.setState({
			isSpin:true,
		});
		let url = `/users/${this.props.match.params.userid}/private_message_details.json`;
		axios.get((url),{params:{
				target_id:target_ids,
				page:	pages,
				per_page:listls,
			}}).then((result) => {
			if (result) {
				// if (result.data.status === 0) {
				if (result) {
					// if (result.data.status === 0) {
					if (result.data !== null) {
						var datas = [];
						var datay = result.data.messages;
						datay = datay.reverse();
						var obj = {};
						for (var i = 0; i < datay.length; i++) {
							if (i === 0) {
								var timetwoy=datay[i].send_time.slice(0,10);
								datay[i].send_day = timetwoy;
								obj = datay[i];
								datas.push(datay[i]);
							} else {
								try {
									var timeone=obj.send_time.slice(0,10);
									var timetwo=datay[i].send_time.slice(0,10);
									if (moment(timeone).isSame(timetwo)) {
										datay[i].send_day = "";
									} else {
										datay[i].send_day = timetwo;
										obj = datay[i];
									}
								}catch (e) {
                  console.log("271271271271");
                  console.log(e);
								}
								datas.push(datay[i]);
							}
						}

						//颠倒数组
						this.setState({
							messages: datas,
							myuserl: result.data.target,
							pages:pages,
							datanull:1
						})
						this.scrollToBottom();
						// }

					}
				}
			}
			this.setState({
				isSpin: false,
			});
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin:false,
			});
			// this.getdatatwo(this.state.page);
		})
	};
	//获取数据地方
	getdata=(page)=>{

		let{limit}=this.state;
		let url = `/users/${this.props.match&&this.props.match.params.userid}/private_messages.json`;
		// let url = `/users/71519/private_messages.json`;
		axios.get((url),{params:{
				page:page,
				per_page:limit,
			}}).then((result) => {
			if (result) {
				// console.log(types);
				// console.log(result);
				// console.log("调用了消失的方法");
				// console.log("5454545454");
				// if(result.data.status===0) {


					if (result.data !== null) {
						if (result.data.private_messages !== null) {
							if (result.data.private_messages.length > 0) {
								for (var i = 0; i < result.data.private_messages.length; i++) {
									this.state.datay.push(result.data.private_messages[i]);
								}
							}
						}
					}
					this.setState({
						page: page,
						isSpins: false,
						datay: this.state.datay,
						data: result.data.private_messages === null ? undefined : result.data.private_messages === undefined ? undefined : result.data.private_messages === [] ? undefined : result.data.private_messages === "[]" ? undefined : result.data.private_messages.length === 0 ? undefined : result.data.private_messages,
					});
				}
				// console.log(this.state.datay);
			// }
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpins:false,
			})
		})
	};
	//获取数据地方
	getdatatwo=(page)=>{

		let{limits}=this.state;
		let url = `/users/${this.props.match&&this.props.match.params.userid}/private_messages.json`;
		// let url = `/users/71519/private_messages.json`;
		axios.get((url),{params:{
				page:page,
				per_page:limits,
			}}).then((result) => {
			if (result) {
				// if(result.data.status===0){
					this.setState({
						page:page,
						isSpins:false,
						datay:result.data.private_messages===null?undefined:result.data.private_messages===undefined?undefined:result.data.private_messages===[]?undefined:result.data.private_messages==="[]"?undefined:result.data.private_messages.length===0?undefined:result.data.private_messages,
					});
				// }

				// console.log(this.state.datay);
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpins:false,
			})
		})
	};
	// 跳转页面
	smyJump =(i)=>{
		// console.log("跳转页面");
		// console.log(i);
		this.props.Modifyur(i);
	};
	getdatas2=()=>{

	}
	// 点击了用户
	Clickedontheuser=(user)=>{
		// debugger
		// console.log("点击了用户");
		// console.log(user);
		// this.setState({
		// 	myyslusers:user,
		// 	mess:true,
		// })
		this.setState({
			myuserl:user,
		})

		this.props.history.replace(`/messages/${this.props.current_user.login}/message_detail?target_ids=${user.id}`);
		// this.getdatatwo(this.state.page);
		this.getChatListtwo(1,this.state.mypagey,user.id);

	}
  //回复
	setreplyfun=()=>{
		this.setState({
			isSpin:true,
		});
	  let  contents=this.messageRef.current.getValue().trim();
		const query = this.props.location.search;
		let target_ids = query.split('?target_ids=');
		contents=htmlEncode(contents)
		let url = `/users/${this.props.match.params.userid}/private_messages.json`;
		axios.post(url, {
				target_id: target_ids[1],
				content: contents
			})
			.then((response) => {
				this.setState({
					isSpin:false,
				});
				if(response===undefined){
					return
				}
				if(response.data.status===0){
				// console.log("回复成功");
			  // console.log(response);
				// var datas=[];
				// var dataso=this.state.messages;
				// var datays=response.data.private_message;
				// var obj={};
				// for (var i=0;i<dataso.length;i++){
				// 	if(i===0){
				// 		obj=dataso[i];
				// 		datas.push(dataso[i]);
				// 	}else{
				// 		if( moment(obj.send_day).isSame(dataso[i].send_day)){
				// 			dataso[i].send_day="";
				// 		}else {
				// 			obj=dataso[i];
				// 		}
				// 		datas.push(dataso[i]);
				// 	}
				// }
					this.getChatListtwo(1,this.state.mypagey,target_ids[1]);
				// 	try {
				// 		var time =dataso[dataso.length-1].send_time.slice(0,10);
        //     console.log(time);
				// 		var timetwo=datays.send_time.slice(0,10);
				// 		console.log(timetwo);
				// 		if( moment(time).isSame(timetwo)){
				// 			     datays.send_day="";
				// 		    	dataso.push(datays);
				// 					}else {
				// 		    	datays.send_day=timetwo;
				// 		    	dataso.push(datays);
				// 					}
				// 	}catch (e) {
        //    console.log("回去出现错误");
        //    console.log(e);
				// 	}
				//
				// //颠倒数组
				// this.setState({
				// 	messages: dataso,
				//
				// });
					this.scrollToBottom();
					this.messageRef.current.setValue('')
				}
			})
			.catch(function (error) {
				console.log(error);
				this.setState({
					isSpin:false,
				});
			});
	};
   //删除
	DELETEsetreplyfun=(user_id,id)=>{
		//user_id不用
		// console.log("311");
		this.setState({
			isSpin:true,
		});
		let url = `/users/${this.props.match.params.userid}/private_messages/${id}.json`;
		axios.delete(url)
			.then((response) => {
				if(response){
					if(response.data.status===0){
           if(this.state.messages.length>0){
           	for(var i=0;i<this.state.messages.length;i++){
           		if(parseInt(this.state.messages[i].id)===id){
								this.state.messages.splice(i,1);
							}
						}
						 // setTimeout(()=>{
							//
						 // }, 200);
           	this.setState({
							messages:this.state.messages,
							isSpin:false,
							// datanull:1
						})

						 // this.scrollToBottom()
					 }
					}
				}
			})
			.catch(function (error) {
				console.log(error);
				this.setState({
					isSpin:false,
				})
			});
	}









	render() {
		let{isSpins,datay,myyslusers,mess,limits,myuserl,messages,isSpin,datanull}=this.state;
		// console.log(mess);
		// console.log(myyslusers);
		// console.log("MessagChat");
		// console.log(this.state);
		// console.log("112");
		// console.log(limits);
		// console.log(myuserl);
		// console.log(messages);
		return (
			<div className="edu-back-white ml20">
				{/*私信对话框*/}
      <div className="df clearfix">
				{/*左边*/}
				<div className="flex1">
				<p className="clearfix pt30 pb30 edu-txt-center font-16 bor-bottom-greyE">
					<a onClick={()=>this.smyJump(2)}><i className="iconfont icon-zuojiantou font-14 fl ml25 color-grey-9"
																										 data-tip-down="返回到列表"></i></a>
					{myuserl!==undefined?myuserl.name:""}与你的私信
				</p>
					{/*聊天页面*/}
					<style>
						{
							`
							.dialogPanel{
							    padding: 0px 20px;
									height: 400px !important;
									overflow-y: auto;
							}
							`
						}
					</style>
					<div className="dialogPanel"
							 onScroll={this.contentViewScrolltop}
							 ref={(div) => {
						this.messageList = div;
					}}>
						<div >
							<Spin size="large" className="myw100baifenbi" spinning={isSpin}>
								{
									datanull===0?
										<p className="mt30 edu-txt-center"><span className="letter-time">没有信息了～～</span></p>
										:""
								}
							<div  id="yslysl"  >
								{
									messages===undefined?
										""
										:messages.map((item,key)=>{
											// console.log("-----------------================-=-==-==");
                      // console.log(item.sender_id);
                      // console.log(this.props.match.params.userid);
											return(
												<div key={key}>
													{
														item.send_day===undefined?"":item.send_day===null?"":item.send_day===""?"":
															<p className="mt30 edu-txt-center"><span className="letter-time">{item.send_day}</span></p>
													}
													{
														parseInt(item.sender_id)===parseInt(this.props.match.params.userid)?
															<Rightdialogue keys={key} objeysl={item} {...this.state} {...this.props} DELETEsetreplyfun={(user_id,id)=>this.DELETEsetreplyfun(user_id,id)}>
																 {/*自己的*/}


															</Rightdialogue>
															:<Leftdialogue keys={key} objeysl={item}  {...this.state} {...this.props} DELETEsetreplyfun={(user_id,id)=>this.DELETEsetreplyfun(user_id,id)}>
															   {/*他人的*/}


															</Leftdialogue>
													}

												</div>
											)
										})
								}

							</div>
						</Spin>
						</div>
					</div>

					{/*回复*/}
					<div className="bor-top-greyE padding20">
						<style>
							{`
							.rememberTip{
								display:none;
								}
							`}
						</style>
						<TPMMDEditor ref={this.messageRef}
												 placeholder={'请输入您的回复'}
												 watch={false}
												 initValue={''}
												 mdID={'courseMessageMD'}
												 className="courseMessageMD"
												 height={200}
						></TPMMDEditor>

						<div className={"msheight30"}>
							<span className="fl ml5 color-orange font-12">在问题反馈时，请同时发送问题发生页的网址链接，以便我们高效的为您服务</span>
							<a className="fr task-btn task-btn-orange" onClick={()=>this.setreplyfun()}>回复</a>
						</div>
					</div>




				</div>
				{/*右边*/}
       <div className="bor-left-greyE" style={{width:"290px"}}>
				 {/*右边头部*/}
				 <p className="pt30 pb30 pl30 edu-txt-left font-16 bor-bottom-greyE">私信列表</p>
				 <Spin size="large" className="myw100baifenbi" spinning={isSpins}>
					 <style>
						 {
						 	`
						 	.private-list{
						 	min-height: 680px !important;
							max-height: 680px !important;
							overflow-y: auto;
							overflow-x: hidden;
						 	}
						 	`
						 }
					 </style>
				 <div className="private-list"   onScroll={this.contentViewScrolledit}>
					 {/*列表数据*/}
					 {
						 datay===undefined?
						""
							 :datay.map((item,key)=>{
								 return(
									 <div className="private-part clearfix" key={key} onClick={(i)=>this.Clickedontheuser(item.target)}>
										 <div className="part-line df">
											 <img src={getImageUrl("images/"+item.target.image_url)} className="radius mr10 myimgw48 myimgh48"/>
											 <div className="flex1">
												 <p className="clearfix mb15 lineh-17">
												<span className="fl pr">
													<span className="task-hide privatePartName">{item.target.name}</span>
													{item.unread === true?
														<span className="newLetter"></span>
														:""}
												</span>
													 <span className="color-grey-c fr">{moment(item.send_time).fromNow()}</span>
												 </p>


												     <p className="color-grey-6 lineh-20 justify  break_word task-hide-2 markdown-body" style={{wordBreak:"break-word"}}	id="MakedownHTML"   dangerouslySetInnerHTML={{__html: markdownToHTML(item.content).replace(/▁/g, "▁▁▁")}} >
														 </p>
											 </div>

										 </div>
									 </div>
								 )
							 })}




				 </div>
				 </Spin>


			 </div>








			</div>
			</div>
		)
	}
}
export default MessagChat;


// onClick="delete_confirm_box('/users/innov/delete_message?mess_id=25137', '确定要删除该条记录吗？')"
//
// {/*左边*/}
