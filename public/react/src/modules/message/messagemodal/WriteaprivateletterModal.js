import React, { Component } from 'react';
import { Modal,Input,Icon,Tooltip,Spin} from 'antd';
import axios from 'axios';
// import '../../modules/user/common.css';
import {getImageUrl,htmlEncode} from 'educoder';
//完善个人资料
class WriteaprivateletterModal extends Component {

	constructor(props) {
		super(props)
		this.state ={
			modalsType:false,
			Pleaseselectthesender:false,
			Pleaseselectthesenders:false,
			inputvulue:"",
			inputvulues:"",
			floatingboxdisplay:false,
			users:[],
			Personalid:undefined,
			isSpin:false,
			Recentcontacts:false,
			floatingboxdisplays:false,

		}

	}
	componentDidMount() {
		//用户id
		//console.log(this.props.current_user.user_id);
		this.Recentcontacts();

	}
	//获取最近联系人
	Recentcontacts=()=>{
		this.setState({
			isSpin:true
		});
	const  url =`/users/${this.props.current_user.user_id}/recent_contacts.json`
	axios.get(url).then((result) => {
		if(result===undefined){
			return
		}
		//console.log(result);
		this.setState({
			users:result.data.users,
			Recentcontacts:false,
			floatingboxdisplay:false,
			isSpin:false
		})
	}).catch((error) => {
		//console.log(error)
		this.setState({
			isSpin:false
		})
	})
	};

	//发送私信
	SendprivatemessageAPI=(idvalue,contentvalue)=>{
		const  url =`/users/${this.props.current_user.user_id}/private_messages.json`
		contentvalue=htmlEncode(contentvalue)
		let data={
			target_id:idvalue,
			content:contentvalue,
		}
		axios.post(url, data).then((result) => {
			if(result===undefined){
				return
			}
			this.setState({
				floatingboxdisplays:false,
				Pleaseselectthesender:false,
			});
			this.props.smyJump(3,result.data.private_message.receiver_id);
			//console.log(result);
		}).catch((error) => {
			//console.log(error)
		})
	};

	//搜索私信人
	Retrieveprivatemessageusers=(value)=>{
		this.setState({
			isSpin:true
		})
		const  url =`/users_for_private_messages.json`
		axios.get((url),{params:{
				keyword:value,
			}}).then((result) => {
			if(result===undefined){
				return
			}
			this.setState({
				users:result.data.users,
				Recentcontacts:true,
				floatingboxdisplay:true,
				isSpin:false
			})
			//console.log(result);
		}).catch((error) => {
			//console.log(error)
			this.setState({
				isSpin:false
			})
		})
	};

	modalCancel=()=>{
		// var weekArray = JSON.parse(window.sessionStorage.getItem('yslgeturls'));
		// if(weekArray===undefined){
		// 	weekArray="/";
		// }
		// if(weekArray===null){
		// 	weekArray="/";
		// }
		// if(weekArray==="null"){
		// 	weekArray="/";
		// }
		// window.location.href = weekArray;
	}

	setDownload=()=>{
		// window.location.href ='/account/profile';
	};

	// 搜索
	search_message_person=()=>{
		//console.log("点击搜索按钮");
		if(this.state.inputvulue.length===0){
			this.Recentcontacts();
		}else {
			this.Retrieveprivatemessageusers(this.state.inputvulue);

		}
	};

	//取消事件
	HideModal=()=>{
		this.props.cancelmodalsType();
	};

	//确认事件
	OKModal=()=>{
   let{inputvulue,Personalid,inputvulues}=this.state;
   // console.log("发送私信了");
		// console.log(inputvulue);
		// console.log(Personalid);
		// console.log(inputvulues);
		if(inputvulue.length===0){
   	 this.setState({
			 Pleaseselectthesender:true
		 });
   	 return;

	 }
   if(inputvulues.length===0){
   	this.setState({
			floatingboxdisplays:true
		})
		 return;
	 }
   else {
   	if(Personalid===undefined){
			this.setState({
				Pleaseselectthesender:true
			});
   		return
		}


	  this.SendprivatemessageAPI(Personalid,inputvulues)

	 }
	};

	// 回车事件
	Myοnkeydοwn=()=>{
   //console.log("点击了回车事件");
   if(this.state.inputvulue.length===0){
		 this.Recentcontacts();
	 }else {
		 this.Retrieveprivatemessageusers(this.state.inputvulue);

	 }
	};

	//判断点击的键盘的keyCode是否为13，是就调用上面的搜索函数
	handleEnterKey = (e) => {
		//console.log("");
		if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
			this.Myοnkeydοwn()
		}
	};
	// 查找联系人输入模式
	setdatafunsval=(e)=>{
		if(e.target.value.length===0){
				this.setState({
					inputvulue:e.target.value,
					Pleaseselectthesender:false,
					floatingboxdisplay:true,
					Personalid:undefined
				});
			this.Recentcontacts();
		}else {
			this.setState({
				inputvulue:e.target.value,
				Pleaseselectthesender:false,
				floatingboxdisplay:true,
			});
		}

		//console.log(e.target.value);
	};
	// 输入内容
	setdatafunsvals=(e)=>{
		//console.log(e.target.value);
		this.setState({
			inputvulues:e.target.value,
			Pleaseselectthesenders:false,
			floatingboxdisplays:false,
			floatingboxdisplay:false,
		});
	}
	//失去焦点
	myonBlur=(e)=>{
		//console.log("失去焦点了");
		e.preventDefault();
	this.setState({
		// floatingboxdisplay:false,
	})
};
	//获取焦点
	myonFocus=(e)=>{
		//console.log("获取到焦点了");
		this.setState({
			floatingboxdisplay:true,
		})
	};

	//获取用户信息
	Getuserinformation=(item)=>{
		//console.log("获取到了用户信息");
		//console.log(item.id);
		this.setState({
			Personalid:item.id===undefined?undefined:item.id===null?undefined:item.id,
			inputvulue:item.name,
			floatingboxdisplay:false,
		})
	}


	render() {

		let{Pleaseselectthesender,inputvulue,inputvulues,floatingboxdisplay,users,floatingboxdisplays,Recentcontacts,isSpin}=this.state;
		//console.log(floatingboxdisplay);
		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title={"写私信"}
				centered={true}
				visible={this.props.modalsType}
				width="550px"
			>
				<div >
					<div className="mb20 pr">
						{/*搜索框*/}
						{/*<div className="search-new myw100baifenbi" >*/}
						{/*	<input type="text" className="search-new-input fl " value={inputvulue} onKeyPress={this.handleEnterKey} onBlur={this.myonBlur} onFocus={this.myonFocus} onChange={this.setdatafunsval} utoComplete="off"*/}
						{/*				 placeholder="发送给..." id="sendFor"/>*/}
						{/*	<span className="search-span"></span>*/}
						{/*	<img src={"/images/educoder/icon/search.svg"} className="fl mt5"*/}
						{/*			 onClick={()=>this.search_message_person()}/>*/}
						{/*</div>*/}
						<div className="myw100baifenbi">
							<Input
								className=""
								placeholder="发送给..."
								value={inputvulue}
								onKeyPress={this.handleEnterKey}
								onBlur={this.myonBlur}
								onFocus={this.myonFocus}
								onChange={this.setdatafunsval}
								suffix={
									<img src={getImageUrl("images/"+"educoder/icon/search.svg")}  onClick={()=>this.search_message_person()}/>
								}
							/>
						</div>
						{/*搜索框下面悬浮框*/}
						<div className="recently_person" style={floatingboxdisplay===false?{display: "none"}:{display: "block"}}>
							<Spin size="large" className="myw100baifenbi" spinning={isSpin}>
							<p className="padding10-20 color-grey-9 cdefault">{Recentcontacts===false?"最近联系人":"搜索结果"}</p>

							{
								users.map((item,key)=>{
									return(
										<p className="clearfix recently_item"  key={key}  onMouseDown={(c)=>this.Getuserinformation(item)}>
											<img alt="头像" className="radius fl mr10 myimgw48 myimgh48"  src={getImageUrl("images/"+item.image_url)}
											/>
											<span className="recently_name">{item.name}</span>
										</p>
									)
								})
							}
							</Spin>
							{/*<p className="clearfix recently_item">*/}
							{/*	<img alt="1?1558048024" className="radius fl mr10 myimgw48 myimgh48"  src={"/images/avatars/User/1?1558048024"}*/}
							{/*	/>*/}
							{/*		<span className="recently_name" data-user="1">实践教学</span>*/}
							{/*</p>*/}
							{/*<p className="clearfix recently_item">*/}
							{/*	<img alt="B?1532489442" className="radius fl mr10 myimgw48 myimgh48"  src={"/images/avatars/User/b?1532489442"}*/}
							{/*			 />*/}
							{/*		<span className="recently_name" data-user="20523">innov</span>*/}
							{/*</p>*/}

						</div>


					</div>
					{/*私信内容*/}
					<div className="writeLetter_Info">
						<textarea className="writeLetter_text greyInput"  value={inputvulues}		onChange={this.setdatafunsvals} name="content" id="writeLetter_text"
											maxLength="200"></textarea>
						<span className="longchar">200</span>
					</div>
				</div>
				{
					Pleaseselectthesender === true ?
						<p className="color-orange-tip  " style={{height: "25px"}}><span id="notice_send_person">请选择发送对象</span></p>
						:(floatingboxdisplays ===false?<p style={{height:"25px"}}></p>:"")
				}
				{
					floatingboxdisplays===true?
						<p className="color-orange-tip  " style={{height: "25px"}}><span id="notice_send_person">请输入发送内容</span></p>
						: ""
				}
				{/*确认事件*/}
				<p className="clearfix edu-txt-center">
					<a onClick={()=>this.HideModal()} className="pop_close task-btn mr30">取消</a>
					<a className="task-btn task-btn-orange" onClick={()=>this.OKModal()} id="submit_send_letter">确定</a>
				</p>
				{/*<div className="educouddiv">*/}
				{/*	<div className={"tabeltext-alignleft"}><p style={{fontSize: "16px"}}>完善您的资料，将获得更多的使用权限</p></div>*/}
				{/*	<div className="clearfix mt30 edu-txt-center">*/}
				{/*		<a className="task-btn mr30" onClick={()=>this.modalCancel()}>取消</a>*/}
				{/*		<a className="task-btn task-btn-orange" onClick={()=>this.setDownload()}>立即完善</a>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</Modal>
		)
	}
}

export default WriteaprivateletterModal;