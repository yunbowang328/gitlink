import React, { Component } from 'react';
import {
	Spin,
	Pagination,
} from "antd";
import axios from 'axios';
import moment from 'moment';
import {getImageUrl,markdownToHTML} from 'educoder';
import "../css/messagemy.css"
import WriteaprivateletterModal from '../messagemodal/WriteaprivateletterModal';
import NoneData from '../../../modules/courses/coursesPublic/NoneData'
//私信页面
class MessagePrivate extends Component{
	constructor(props) {
		super(props);
		this.state={
			page:1,
			limit:10,
			count:0,
			data:undefined,
			isSpin:false,
			modalsType:false,
		};
		// console.log("MessagePrivate");
	 // console.log(this.props);
	}

	componentDidMount(){
       this.getdata(1);
		try {
			this.props.Mtab(2);
		}catch (e) {

		}
		this.props.triggerRef(this)
		// console.log("MessagePrivate");
		// console.log(this.props);
		// console.log(this.props.match.params.userid);
	};
	componentDidUpdate(prevProps) {
		// console.log("11111111111");
		// console.log(prevProps);
		// console.log("22222222222");
		// console.log(this.props);
		// console.log("33333333333");
		if(prevProps.current_user !== this.props.current_user){
			this.getdata(1);
		}
	}
 //获取数据地方
	getdata=(page)=>{
		this.setState({
			isSpin:true,
		});
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
				// if (result.data.status === 0) {

					this.setState({
						page: page,
						count: result.data.count,
						isSpin: false,
						data: result.data.private_messages === null ? undefined : result.data.private_messages === undefined ? undefined : result.data.private_messages === [] ? undefined : result.data.private_messages === "[]" ? undefined : result.data.private_messages.length === 0 ? undefined : result.data.private_messages,
					})
				// }
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin:false,
			})
		})
	};
	getdatas2=()=>{
		this.setState({
			isSpin:true,
		});
		let{limit,page}=this.state;
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
				// if (result.data.status === 0) {

				this.setState({
					page: page,
					count: result.data.count,
					isSpin: false,
					data: result.data.private_messages === null ? undefined : result.data.private_messages === undefined ? undefined : result.data.private_messages === [] ? undefined : result.data.private_messages === "[]" ? undefined : result.data.private_messages.length === 0 ? undefined : result.data.private_messages,
				})
				// }
			}
		}).catch((error) => {
			console.log(error);
			this.setState({
				isSpin:false,
			})
		})
	};

	paginationonChanges=(pageNumber)=>{
		this.setState({
			page: pageNumber,
		})
		this.getdata(pageNumber);
	};
	okmodalsType=()=>{
		this.setState({
			modalsType:true,
		})
	}
	cancelmodalsType=()=>{
		this.setState({
			modalsType:false,
		})
	};
	// 跳转页面
	smyJump =(i,id)=>{
		// console.log("跳转页面");
		// console.log(i);
		this.props.Modifyur(i,id);
	};
	myCome=(e)=>{
		window.location.href="/users/"+e.target.login;
	}
	render() {
		let{page,limit,typeysl,count,isSpin,data,modalsType}=this.state;
		// console.log(	this.props);
		// console.log("37");
		return (
			<div>
				{
					modalsType===true?
						<WriteaprivateletterModal {...this.state} {...this.props} modalsType={modalsType} cancelmodalsType={this.cancelmodalsType} smyJump={(is,item)=>this.smyJump(is,item)} ></WriteaprivateletterModal>
						:""
				}
			<div className="edu-back-white ml25">
      <p className="clearfix font-16 padding30-20 bor-bottom-greyE">
      <span className="fl">全部私信</span>
      <a  className="color-blue fr" onClick={()=>this.okmodalsType()}>写私信</a>
			</p>
			<Spin size="large" className="myw100baifenbi" spinning={isSpin}>

					{
						data===undefined?<NoneData></NoneData> :data.length===0?
							<NoneData></NoneData>
							:data.map((item,key)=>{
								return(
										<div className="private-item clearfix df" key={key} onClick={()=>this.smyJump(3,item.target.id)}>
											<a className="fl mr10 private_message_a" onMouseDown={()=>this.myCome(item)}>
												<img onMouseDown={()=>this.myCome(item)} src={getImageUrl("images/"+item.target.image_url)} className="radius myimgw48 myimgh48"/>
											</a>
											<div className="fl flex1">
												<p>
													<a onMouseDown={()=>this.myCome(item)} className="mr20 private_message_a">{item.target.name}</a>
													<span>与你的私信</span>
													<span className="color-grey-c mr20">[{item.message_count}{"条"}]</span>
													<span className="color-grey-c">{moment(item.send_time).fromNow()}</span>
												</p>
												<style>
													{
														`
														.markdown-body p img{
														width:200px;
														}
														`
													}
												</style>
												<div className="color-grey-6 break_word_firefox  markdown-body mt10" 	dangerouslySetInnerHTML={{__html: markdownToHTML(item.content).replace(/▁/g, "▁▁▁")}}	></div>

											</div>
											{item.unread === true ?<span className="new-point fr mt22"></span>:""}
										</div>
								)
							})}
				</Spin>


			</div>

        {/*页数*/}
				{ data===undefined?""
					:
					(count>10?
							<div style={{textAlign: "center"}} className="new_expand mt10">
								<div className="edu-txt-center mt30">
									<Pagination showQuickJumper current={page}
															onChange={this.paginationonChanges} pageSize={limit}
															total={count}></Pagination>
								</div>
							</div>
							:""
					)

				}
			</div>

		)
	}
}
export default MessagePrivate;
