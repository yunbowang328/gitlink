import React, { Component } from 'react';
import {Input,Pagination,Tooltip} from 'antd';
import {TPMIndexHOC} from "../../../modules/tpm/TPMIndexHOC";
import { WordsBtn ,ActionBtn,SnackbarHOC,markdownToHTML,getImageUrl} from 'educoder';
import axios from 'axios';
import "../css/messagemy.css"
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Loading from '../../../Loading'
import Loadable from 'react-loadable';

// MessagSub 消息自路由
// MessagePrivate 私信
const MessagSub = Loadable({
	loader: () => import('./MessagSub'),
	loading: Loading,
})

const MessagePrivate = Loadable({
	loader: () => import('./MessagePrivate'),
	loading: Loading,
})

const MessagChat = Loadable({
	loader: () => import('./MessagChat'),
	loading: Loading,
})
class Messagerouting extends Component{
	constructor(props) {
		super(props);
		this.state={
			routing:1,
			unread_message_count:0,
			unread_tiding_count:0,
		}
	}

	componentDidMount(){
		// console.log("Messagerouting");
		//  console.log(this.props);
		 // let courstype=this.props.location.search;
		// // courstype=courstype.splice('/');
		// // courstype=courstype[3];
		// // console.log("45");
		// console.log(courstype);
		// console.log("Messagerouting46");
		// console.log(this.props.current_user);

	}

	componentDidUpdate(prevProps) {
		// console.log("11111111111");
		// console.log(prevProps);
		// console.log("22222222222");
		// console.log(this.props);
		// console.log("33333333333");
		 if(prevProps.current_user !== this.props.current_user){
		 	this.Messageprivatemessageunreadmessage(this.props.current_user.login);
			 // console.log("Messagerouting59");
			 // console.log(this.props.current_user);
		 }
	}
	//消息未读
	Messageprivatemessageunreadmessage=(user_id)=>{
		const url=`/users/${user_id}/unread_message_info.json`
		axios.get(url).then((result) => {
			if(result===undefined){
				return
			}
			// console.log("消息未读1");
			// console.log(result);
			this.setState({
				unread_message_count:result.data.unread_message_count,
				unread_tiding_count:result.data.unread_tiding_count,
			})
		}).catch((error) => {
			console.log(error)
		})
	};

	SwitchonClick=(value,child)=>{
   this.setState({
		 routing:value,
	 });
   this.Messageprivatemessageunreadmessage(this.props.current_user.login);
	 if(value===1){
		 this.props.history.replace(`/messages/${this.props.current_user.login}/user_tidings`);
		 this.homeworkendss1(child);
	 }
	 if(value===2){
		 this.props.history.replace(`/messages/${this.props.current_user.login}/private_messages`);
		 this.homeworkendss2(child);
	 }


	};



	Message2=(data)=>{
		// console.log("64");
		// console.log(data);
		this.setState({
			unread_message_count:parseInt(data.unread_message_count),
			unread_tiding_count:parseInt(data.unread_tiding_count),
		})
	};

	//跳转到链接
	Modifyur=(i,id)=>{
		// console.log("跳转到链接1");
		// console.log(i);
		// console.log(item);
		// console.log("跳转到链接2");
		if(i<3){
			this.setState({
				routing:i,
			});
			if(i===1){
				this.props.history.replace(`/messages/${this.props.current_user.login}/user_tidings`);
			}
			if(i===2){
				this.props.history.replace(`/messages/${this.props.current_user.login}/private_messages`);
			}

		}else {
			this.setState({
				routing:i,
			});
			console.log("22222222222");
			this.props.history.replace(`/messages/${this.props.current_user.login}/message_detail?target_ids=${id}`);
		}

	};
	myCome=(e)=>{
		window.location.href="/users/"+e.target.login;
	}

	myxiaoxisixintab=(i)=>{
		if(i===1){
			this.setState({
				routing:1,
			});
		}
		if(i===2){
			this.setState({
				routing:2,
			});

		}
		if(i===3){
			this.setState({
				routing:3,
			});
		}
	};
	bindRef = ref => { this.child = ref };
	homeworkendss1(child){
		// console.log(child);
		// // console.log(this.refs.childModel);
		// console.log(child);
		try {
			child.getdatas();
		}catch (e) {

		}

		//
	}
	homeworkendss2(child){
		// console.log(child);
		// // console.log(this.refs.childModel);
		// console.log(child);
		try {
			child.getdatas2();
		}catch (e) {

		}

		//
	}
	render() {
		let{routing,unread_message_count,unread_tiding_count} =this.state;
		// console.log(this.props);
		// console.log(routing);
		return (
			<div className="newMain clearfix">
      <div className="educontent mt20 mb80 clearfix">
				{/*左边*/}
				<div className="leftPanel">
           {/*头像*/}
           <div className="mb20 edu-back-white pt40 pb40 edu-txt-center">
           <a >
						 {
							 this.props.current_user!== undefined?
								 <img className="person radius myw120 myh120"   src={getImageUrl("images/"+this.props.current_user.image_url)}/>
								 :""
						 }

					 </a>
						 <p className="font-24 lineh-25 mt10" >{this.props.current_user&&this.props.current_user.username}</p>
						 <p className="color-grey-6 mt5" >{this.props.current_user&&this.props.current_user.user_identity}</p>
					 </div>
					  {/*路由跳转*/}
					  <ul className="edu-back-white">
              <li className={routing ===1?"nav pr active":"nav pr"}>
								<a onClick={(value,child)=>this.SwitchonClick(1,this.child)}>消息</a>
								{unread_tiding_count===0?"":unread_tiding_count>0?<span className="new-info">{unread_tiding_count}</span>:""}
							</li>
							<li className={routing ===2?"nav pr active":routing ===3?"nav pr active":"nav pr"}>
								<a onClick={(value,child)=>this.SwitchonClick(2,this.child)}>私信</a>
								{unread_message_count===0?"":unread_message_count>0?<span className="new-info">{unread_message_count}</span>:""}
							</li>
						</ul>
				</div>

				{/*右边*/}
				<div className="rightPanel">
         <div className="clearfix">
					 {/*/!*消息自路由*!/*/}
					 {/*{routing===1?<MessagSub {...this.state} {...this.props} Message2={()=>this.Message2()}></MessagSub> :""}*/}

					 {/*/!*私信*!/*/}
					 {/*{routing===2?<MessagePrivate {...this.state} {...this.props} Message2={()=>this.Message2()} Modifyur={(i,item)=>this.Modifyur(i,item)}></MessagePrivate> :""}*/}

					 {/*/!*私信聊天页面*!/*/}
					 {/*{routing===3?<MessagChat {...this.state} {...this.props}  Message2={()=>this.Message2()} Modifyur={(i)=>this.Modifyur(i)}></MessagChat>:""}*/}

					 <Switch>
						 {/*/!*消息自路由*!  name  是 /message/info/:userid/*/}
						 <Route path="/messages/:userid/user_tidings"
						 render={
						 (props) => (<MessagSub  triggerRef={this.bindRef} {...this.state} {...this.props} {...props} Message2={()=>this.Message2()} Mtab={(i)=>this.myxiaoxisixintab(i)}></MessagSub>)
						 }
						 ></Route>
						 {/*/!*私信*! name 是letter/*/}
						 <Route path="/messages/:userid/private_messages"
						 render={
						 (props) => (<MessagePrivate  triggerRef={this.bindRef} {...this.state} {...this.props} {...props} Message2={()=>this.Message2()} Modifyur={(i,item)=>this.Modifyur(i,item)} Mtab={(i)=>this.myxiaoxisixintab(i)}></MessagePrivate> )
						 }
						 ></Route>
						 {/*/!*私信聊天页面*! letters/*/}
						 <Route path="/messages/:userid/message_detail"
						 render={
						 (props) => (<MessagChat triggerRef={this.bindRef}  {...this.state} {...this.props} {...props}  Message2={()=>this.Message2()} Modifyur={(i)=>this.Modifyur(i)} Mtab={(i)=>this.myxiaoxisixintab(i)}></MessagChat>)
						 }
						 ></Route>


					 </Switch>

				 </div>
				</div>
			</div>

			</div>
		)
	}
}
export default SnackbarHOC() (TPMIndexHOC  ( Messagerouting ));