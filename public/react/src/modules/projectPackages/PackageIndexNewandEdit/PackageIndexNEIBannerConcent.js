import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { Input , Spin, Icon ,Button,Pagination,DatePicker} from 'antd';
import { handleDateString,getUrl,setmiyah} from 'educoder';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import MDEditors from '../MDEditors';
import PhoneModel from './PhoneModel';
import moment from 'moment';
import '../packageconcnet.css';
const { Search } = Input;
const $ = window.$;
let origin = getUrl();

//  load
if (!window.postUpMsg) {
	$.getScript(
		`${origin}/javascripts/attachments.js`,
		(data, textStatus, jqxhr) => {

		});
}


function checkPhone(phone){

	if(!(/^1[3456789]\d{9}$/.test(phone))){
		// alert("手机号码有误，请重填");
		return false;
	}
}

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function disabledDateTime() {
	return {
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
	};
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}


class PackageIndexNEIBannerConcent extends Component {
	constructor(props) {
		super(props)
		this.contentMdRef = React.createRef();
		this.state = {
			modalCancel:false,
			getverificationcodes:true,
			seconds:60,
			springtype:false,
			category:undefined,
			title:undefined,
			content:undefined,
			attachment_ids:undefined,
			deadline_at:undefined,
			min_price:undefined,
			max_price:undefined,
			contact_name:undefined,
			contact_phone:undefined,
			code:undefined,
			publish:false,
			categories:[]
		}
	}


	componentDidMount() {
		window.document.title = '众包创新'
		if(this.props.match.params.id!=undefined){

			 let url=`/project_packages/${this.props.match.params.id}.json`
			 axios.get((url)).then((response) => {

				 let data=response.data
					 this.setState({
						 category:data.category_id,
						 title:data.title,
						 content:data.content,
						 deadline_at:moment(data.deadline_at),
						 min_price:data.min_price,
						 max_price:data.max_price,
						 contact_name:data.contact_name==null||data.contact_name==undefined?this.props.current_user.real_name:data.contact_name,
						 phones:data.contact_phone,
						 attachments:data.attachments,

					 })
			 }).catch((error) => {
				 console.log(error);

			 })
		 }else{
			console.log(this.props.current_user&&this.props.current_user.real_name)
		}

		let Url = `/project_package_categories.json`;
		axios.get(Url).then((response) => {
			// console.log(response)
			if(response.data.status===-1){

			}else{
				this.setState({
					categories:response.data.categories
				})
			}

		}).catch((error) => {
			console.log(error)
		})

		this.setState({
			contact_name:this.props.current_user&&this.props.current_user.real_name
		})

		// this.contentMdRef.current.setValue("测试赋值")
	}

	componentDidUpdate = (prevProps) => {

		if(prevProps.current_user!=this.props.current_user){
			if(this.props.current_user!=undefined){
				this.setState({
					contact_name:this.props.current_user.real_name
				})
			}
		}

	}
	//获取验证码;
	getverificationcode =()=>{
		// 	if (this.state.logins&&this.state.logins.length === 0) {
		//  // 判断没有输入手机号
		// 		return
		// 	}
     if(this.state.getverificationcodes === undefined){
			 console.log("undefined");
			 return;
		 }
		if (this.state.getverificationcodes === true) {
			this.setState({
				getverificationcodes: undefined,
			})
			let timer = setInterval(() => {
				this.setState((preState) => ({
					seconds: preState.seconds - 1,
				}), () => {
					if (this.state.seconds == 0) {
						clearInterval(timer);
						this.setState({
							getverificationcodes: false,
							seconds: 60,
						})
					}
				});
			}, 1000)
			//其他的网络请求也可以
			this.SMSverification();
		} else {
			this.setState({
				getverificationcodes: undefined,
			})
			let timer = setInterval(() => {
				this.setState((preState) => ({
					seconds: preState.seconds - 1,
				}), () => {
					if (this.state.seconds == 0) {
						clearInterval(timer);
						this.setState({
							getverificationcodes: false,
							seconds: 60,

						})
					}
				});
			}, 1000)
			//其他的网络请求也可以
			this.SMSverification();
		}
	}
	//短信验证
	SMSverification = () => {
		let {contact_phone,code}=this.state;
		var url = `/accounts/get_verification_code.json`;
		axios.get((url), {
			params: {
				login: contact_phone,
				type: 5,
				smscode:setmiyah(contact_phone)
			}
		}).then((result) => {
			//验证有问题{"status":1,"message":"success"}
			// console.log(result);
			// this.openNotification("验证码已发送，请注意查收");

			if(result.data.status===1){
				this.openNotification("验证码已发送，请注意查收");
			}else if(result.data.status===-2){
				this.openNotification(result.data.message);
			}
		}).catch((error) => {
			console.log(error);

		})
	}


	onChangeTimePicker = (value, dateString) => {
		if(value===null){
			this.setState({
				deadline_at:""
			})
		}else{
			if(moment(handleDateString(dateString))===undefined||moment(handleDateString(dateString))===null||moment(handleDateString(dateString))===""){
				this.setState({
					deadline_attypes:true
				})
			}else{
				this.setState({
					deadline_attypes:false
				})
			}
			if(moment(handleDateString(dateString))<moment(new Date())){
				this.setState({
					deadline_attypexy:true
				})
			}else{
				this.setState({
					deadline_attypexy:false
				})
			}

			this.setState({
				deadline_at: moment(handleDateString(dateString))
			})
		}


	}

	setcheckoutcontent=()=>{
		const content = this.contentMdRef.current.getValue().trim();
		if(content===undefined||content===null||content===""){
		 this.setState({
			 contenttypes:true
		 })
		}else{
		 this.setState({
			 contenttypes:false
		 })
		}
	}


 setcheckout=(min_price,max_price)=>{
	 // if(min_price===undefined){
		//  this.setState({
		// 	 min_pricetype:true
		//  })
	 // }else{
		//  this.setState({
		// 	 min_pricetype:false
		//  })
	 // }


	 // if(parseInt(min_price)===undefined||parseInt(min_price)===null||parseInt(min_price)===""){
	 //
		//  this.setState({
		// 	 min_pricetype:true
		//  })
	 // }else{
		//  this.setState({
		// 	 min_pricetype:false
		//  })
	 // }

	 // if(parseInt(max_price)===undefined||parseInt(max_price)===null||parseInt(max_price)===""){
	 //
		//  this.setState({
		// 	 min_pricetype:true
		//  })
	 //
	 // }else{
		//  this.setState({
		// 	 min_pricetype:false
		//  })
	 // }

	 if(parseInt(min_price)<=0){
		 this.setState({
			 smallstype:true
		 })
	 }else{
		 this.setState({
			 smallstype:false
		 })
	 }

	 if(parseInt(max_price)<parseInt(min_price)){

		 this.setState({
			 minmaxtype:true
		 })
	 }else{
		 this.setState({
			 minmaxtype:false
		 })
	 }

 }



	setPublication=(type)=>{
		const content = this.contentMdRef.current.getValue().trim();
		// console.log(content)
		// console.log(this.state.deadline_at._i)
    this.setState({
			publish:type
		})
    let types=type;
		let {category,title,attachment_ids,deadline_at,min_price,max_price,contact_name,contact_phone,code,modalCancel}=this.state;

		if(category===undefined||category===null||category===""){
			this.setState({
				categorytypes:true
			})
			this.scrollToAnchor("publishtimestart");
			return
		}

		if(title===undefined||title===null||title===""){
			this.setState({
				titletypes:true
			})
			this.scrollToAnchor("publishtimestart");
			return
		}

		if(content===undefined||content===null||content===""){
			this.setState({
				contenttypes:true
			})
			this.scrollToAnchor("publishtimestart");
			return
		}

		if(deadline_at===undefined||deadline_at===null||deadline_at===""){
			this.setState({
				deadline_attypes:true
			})
			this.scrollToAnchor("publishtime");
			return
		}


		if(moment(deadline_at)<moment(new Date())){
			this.setState({
				deadline_attypexy:true
			})
			return
		}

		// if(min_price===undefined){
		// 	this.setState({
		// 		min_pricetype:true
		// 	})
		// }else{
		// 	this.setState({
		// 		min_pricetype:false
		// 	})
		// }

		// if(parseInt(min_price)===undefined||parseInt(min_price)===null||parseInt(min_price)===""){
		// 	this.setState({
		// 		min_pricetype:true
		// 	})
		// 	return
		// }

		// if(parseInt(max_price)===undefined||parseInt(max_price)===null||parseInt(max_price)===""){
		// 	this.setState({
		// 		min_pricetype:true
		// 	})
		// 	return
		// }

		if(parseInt(min_price)<=0){
			this.setState({
				smallstype:true
			})
			return
		}

		if(parseInt(max_price)<parseInt(min_price)){
			this.setState({
				minmaxtype:true
			})
			return
		}


		if(contact_name===undefined||contact_name===""||contact_name===null){
			this.setState({
				contact_nametype:true
			})
			return
		}

		// if(modalCancel===false){
		// 	if(this.props.current_user.phone===undefined||this.props.current_user.phone===null||this.props.current_user.phone===""){
		// 		this.setState({
		// 			current_userphonetype:true
		// 		})
		// 		return
		// 	}
		// }


		if(this.props.current_user&&this.props.current_user.phone===null||modalCancel===true){
			if(contact_phone===undefined||contact_phone===null||contact_phone===""){
				this.setState({
					contact_phonetype:true
				})
				return
			}

			if(checkPhone(contact_phone)===false){
				this.setState({
					contact_phonetypes:true
				})
				return
			}

			if(code===undefined||code===""||code===null){
				this.setState({
					codeypes:true
				})
				return
			}
		}

		this.setState({
			springtype:true
		})
   if(this.props.match.params.id===undefined){
		 const url = `/project_packages.json`;

		 axios.post(url, {
			   category_id: category,
				 title: title,
				 content: content,
				 attachment_ids: attachment_ids,
				 deadline_at:deadline_at._i,
				 min_price:parseInt(min_price),
				 max_price:parseInt(max_price),
				 contact_name: contact_name===null||contact_name===undefined?this.props.current_user.real_name:contact_name,
				 contact_phone: contact_phone===undefined?this.props.current_user&&this.props.current_user.phone:contact_phone,
				 code:code,
				 publish:types
			 }
		 ).then((response) => {
			 if(response.data.status===0){
				 if(type===true){
					 this.props.setPublicationfun(response.data.id)
				 }else{
					 window.location.href="/crowdsourcing/"+response.data.id
				 }
				 this.setState({
					 springtype:false
				 })
			 }else if(response.data.status===-1){
				 if(response.data.message==="无效的验证码"){
					 this.setState({
						 codeypesno:true,
						 springtype:false
					 })
				 }
			 }
			 this.setState({
				 springtype:false
			 })
		 }).catch((error) => {
			 console.log(error)
			 this.setState({
				 springtype:false
			 })
		 })


	 }else{

   //	edit

		 const url = `/project_packages/${this.props.match.params.id}.json`;

		 axios.put(url, {
			   category_id: category,
				 title: title,
				 content: content,
				 attachment_ids: attachment_ids,
				 deadline_at:deadline_at._i,
				 min_price:parseInt(min_price),
				 max_price:parseInt(max_price),
				 contact_name:  contact_name===null||contact_name===undefined?this.props.current_user.real_name:contact_name,
				 contact_phone: contact_phone===undefined?this.props.current_user&&this.props.current_user.phone:contact_phone,
				 code:code,
				 publish:types
			 }
		 ).then((response) => {
			 if(response.data.status===0){
				 if(type===true){
					 this.props.setPublicationfun(response.data.id)
				 }else{
					 window.location.href="/crowdsourcing/"+response.data.id
				 }
				 this.setState({
					 springtype:false
				 })
			 }else if(response.data.status===-1){
				 if(response.data.message==="无效的验证码"){
					 this.setState({
						 codeypesno:true,
						 springtype:false
					 })
				 }
			 }
			 this.setState({
				 springtype:false
			 })
		 }).catch((error) => {
			 console.log(error)
			 this.setState({
				 springtype:false
			 })
		 })


	 }



	}

	modalCancel=()=>{
		this.setState({
			modalCancel:false,
			contact_phone:undefined,
			code:undefined,
		})
	}

	editmodels=()=>{
		this.setState({
			modalCancel:true
		})
	}


	setcategory=(value)=>{
		if(value===undefined||value===null||value===""){
			this.setState({
				categorytypes:true
			})
		}else{
			this.setState({
				categorytypes:false
			})
		}
		this.setState({
			category:value
		})
	}

	settitlefun=(e)=>{

		if(e.target.value===undefined||e.target.value===null||e.target.value===""){
			this.setState({
				titletypes:true
			})
		}else{
			this.setState({
				titletypes:false
			})
		}

		this.setState({
			title:e.target.value
		})
	}


	onChangemin_prices=(e)=>{
		let{max_price}=this.state;
		this.setState({
			min_price:e.target.value
		})
		this.setcheckout(e.target.value,max_price)


	}
	onChangemax_prices=(e)=>{
		let{min_price}=this.state;
		this.setState({
			max_price:e.target.value
		})
		this.setcheckout(min_price,e.target.value)

	}

	onChangeContact_name=(e)=>{

		if(e.target.value===undefined||e.target.value===""||e.target.value===null){
			this.setState({
				contact_nametype:true
			})
		}else{
			this.setState({
				contact_nametype:false
			})
		}


		this.setState({
			contact_name:e.target.value
		})
	}

	onChangeContact_phone=(e)=>{
	 let {modalCancel}=this.state;
		// if(modalCancel===false){
		// 	if(this.props.current_user.phone===undefined||this.props.current_user.phone===null||this.props.current_user.phone===""){
		// 		this.setState({
		// 			current_userphonetype:true
		// 		})
		// 	}else{
		// 		this.setState({
		// 			current_userphonetype:false
		// 		})
		// 	}
		// }
		if(this.props.current_user&&this.props.current_user.phone===null||modalCancel===true){
			if(e.target.value===undefined||e.target.value===null||e.target.value===""){
				this.setState({
					contact_phonetype:true
				})
			}else{
				this.setState({
					contact_phonetype:false
				})
			}

			if(checkPhone(e.target.value)===false){
				this.setState({
					contact_phonetypes:true
				})
			}else{
				this.setState({
					contact_phonetypes:false
				})
			}
		}


		this.setState({
			contact_phone:e.target.value
		})
	}

	onChangeCode=(e)=>{
		if(e.target.value===undefined||e.target.value===""||e.target.value===null){
			this.setState({
				codeypes:true
			})
		}else{
			this.setState({
				codeypes:false
			})
		}
		this.setState({
			code:e.target.value
		})
	}

	//跳转道描点的地方
	scrollToAnchor = (anchorName) => {
		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if(anchorElement) { anchorElement.scrollIntoView(); }
		}
	}

	render() {
		let {modalCancel,seconds,getverificationcodes,attachments,
			category,title}=this.state;
		let categorylist=[
			{name:"前端开发",value:"front"},
			{name:"后端开发",value:"backend"},
			{name:"移动开发",value:"mobile"},
			{name:"数据库",value:"database"},
			{name:"云计算和大数据",value:"cloud_compute_and_big_data"},
			{name:"人工智能",value:"ai"},
			{name:"其他",value:"other"},
		]


		return (

		<div className="mb20 touchSelect">
			{/*<PhoneModel*/}
				{/*modalsType={modalCancel}*/}
				{/*modalCancel={this.modalCancel}*/}
			{/*/>*/}
			<Spin size="large" spinning={this.state.springtype} >
				<p className="clearfix" id={"publishtimestart"}>

					<div className={"stud-class-set pd30a0 edu-back-white pb20"}>
							<div className={"ant-row contentbox mdInForm mb20"}>
								<div className="ant-form-item-label mb20">
									<label htmlFor="coursesNew_description" className="ant-form-item-requireds font-16">请选择需求类型</label>
								</div>

								<p className="clearfix mb20 shaiContent" >
									<div className="fl pr shaiAllItem pagetype">
										{this.state.categories.map((item,key)=>{
											return(
												<li key={key} className={category===item.id?"shaiItem shixun_repertoire active borderccc":"shaiItem shixun_repertoire borderccc"} value={item.id} onClick={()=>this.setcategory(item.id)}>{item.name}</li>
											)
										})}
									</div>
								</p>

								{this.state.categorytypes===true?<div className={"color-red mb10"}>请选择类型</div>:""}

							<div className="ant-form-item-label mb15">
								<label htmlFor="coursesNew_description" className="ant-form-item-requireds font-16" >需求标题和详情</label>
							</div>

							<Input placeholder="请输入需求标题，示例：美食类APP开发，最大限制60个字符" maxLength="60" className="input-100-40s mt5 fafafas"
							 value={title} onInput={this.settitlefun}/>
								{this.state.titletypes===true?<div className={"color-red mt10"}>不能为空</div>:""}
							<MDEditors ref={this.contentMdRef} placeholder="请填写清晰完整的需求内容" mdID={'courseContentMD'} refreshTimeout={1500}
													watch={false}  className="courseMessageMD" initValue={this.state.content}  setcheckoutcontent={()=>this.setcheckoutcontent()}></MDEditors>
								{/* 请求status 422 */}
								{this.state.contenttypes===true?<div className={"color-red"}>不能为空</div>:""}
								{/*<div className="df uploadBtn">*/}
									{/*<a href="javascript:void(0);" className="fl" onClick={() => window.$('#_file').click()}*/}
										 {/*data-tip-down="请选择文件上传">*/}
										{/*/!*<i className="fa fa-upload mr5 color-blue"></i>*!/*/}
										{/*<span className="color-blue">上传附件</span>*/}
									{/*</a>*/}
									{/*<span style={{ fontSize: "14px"}}>(最多可添加 <span className={"color-orange06"}>5</span> 个图片/文件，每个大小不超过 <span className={"color-orange06"}>10MB</span>)</span>*/}
								{/*</div>*/}
								{/*{attachments&&attachments.map((item,key)=>{*/}
									{/*return(*/}
										{/*<div className={"newForm newFormbox mt10 "}>*/}
											{/*<i className="color-green iconfont icon-fujian mr5 fl font-14 mt4"></i>*/}
											{/*<a className="upload_filename color-grey readonly hidden fl mtf3 mr10 ml5" href={item.url}>{item.title}  &nbsp; &nbsp;{bytesToSize(item.filesize)}</a>*/}
										{/*</div>*/}
									{/*)})}*/}
								{/*<form className="newForm newFormbox mt10 ">*/}
									{/*<span id={`attachments_fields`} className="attachments_fields"*/}
												{/*xmlns="http://www.w3.org/1999/html">*/}
									{/*</span>*/}
											{/*<span className="add_attachment">*/}
										{/*<input className="file_selector"*/}
													 {/*data-are-you-sure="您确定要删除吗？"*/}
													 {/*data-delete-all-files="您确定要删除所有文件吗"*/}
													 {/*data-description-placeholder="可选的描述"*/}
													 {/*data-field-is-public="公开"*/}
													 {/*data-file-count="个文件已上传"*/}
													 {/*data-lebel-file-uploding="个文件正在上传"*/}
													 {/*data-max-concurrent-uploads="2"*/}
													 {/*data-max-file-size-message="该文件无法上传。超过文件大小限制 (10 MB)，建议上传到百度云等其他共享工具里，然后在txt文档里给出链接以及共享密码并上传"*/}
													 {/*data-max-file-size="10485760" data-upload-path="/uploads.js"*/}
													 {/*id="_file"*/}
													 {/*multiple="multiple" name="attachments[dummy][file]"*/}
													 {/*onChange={() => {*/}
														  {/*debugger;*/}
 													   {/*console.log(window.$('.file_selector')[0])*/}
														 {/*window.addInputFiles(window.$('.file_selector')[0])*/}
													 {/*}}*/}
													 {/*style={{'display': 'none'}}*/}
													 {/*type="file">*/}
										{/*</input>*/}
									{/*</span>*/}
								{/*</form>*/}


						</div>
					</div>

					<div className={"stud-class-set padding30 coursenavbox edu-back-white"} style={{borderTop: '1px solid #EAEAEA'}} id={"publishtime"}>
						<div className={"ant-row contentbox mdInForm "}>
							<div className="ant-form-item-label mb10">
								<label htmlFor="coursesNew_description" className="ant-form-item-requireds font-16">工期与预算</label>
							</div>
							<p className="clearfix mb20 shaiContent">
								<span className="shaiTitle fl mt5 ml10">竞标截止：</span>
								<DatePicker
									showToday={false}
									showTime={{ format: 'HH:mm' }}
									locale={locale}
									style={{"width": "260px"}}
									format="YYYY-MM-DD HH:mm"
									placeholder="请选择任务的竞标截止日期"
									className={"fafas"}
									disabledTime={disabledDateTime}
									disabledDate={disabledDate}
									dropdownClassName="hideDisable"
									value={this.state.deadline_at}
									onChange={this.onChangeTimePicker}
								/>

								{this.state.deadline_attypes===true?<div className={"color-red ml100"}>不能为空</div>:""}

								{this.state.deadline_attypexy===true?<div className={"color-red ml100"}>不能早于当前时间</div>:""}
							</p>
							<p className="clearfix mb20 shaiContent">
								<span className="shaiTitle fl mt5 ml10">支付费用：</span>
								<Input
									className={"fafas"}
									style={{"width": "260px"}}
									value={this.state.min_price}
									placeholder="支付多少费用（最低）"
									onInput={(e)=>this.onChangemin_prices(e)}
									suffix={
										<span >¥</span>
									}
								/>
								<span className={"ml10 mr10"}>～</span>
								<Input
								className={"fafas"}
								style={{"width": "260px"}}
								value={this.state.max_price}
								placeholder="支付多少费用（最高）"
								onInput={(e)=>this.onChangemax_prices(e)}
								suffix={
									<span>¥</span>
								}
								/><span className={"pagenoedits"}>不填，则表示可议价</span>
								  {this.state.min_pricetype===true?<div className={"color-red ml100"}>不能为空</div>:""}
								  {this.state.smallstype===true?<div className={"color-red ml100"}>不能小于零</div>:""}
									{this.state.minmaxtype===true?<div className={"color-red ml100"}>最高费用不能小于最低费用</div>:""}
							</p>
							<div className="ant-form-item-label mb10">
								<label htmlFor="coursesNew_description" className="ant-form-item-requireds font-16" >联系方式</label>
							</div>
							<p className="clearfix mb20 shaiContent">
								<span className="shaiTitle fl mt5 ml40">姓名：</span>
								<Input
									className={"fafafas"}
									style={{"width": "260px"}}
									value={this.state.contact_name===null||this.state.contact_name===undefined?this.props.current_user&&this.props.current_user.real_name:this.state.contact_name}
									placeholder="请输入姓名"
									onInput={(e)=>this.onChangeContact_name(e)}
								/>
								{this.state.contact_nametype===true?<div className={"color-red ml100"}>不能为空</div>:""}
							</p>

							{this.props.current_user&&this.props.current_user.phone!=null&&modalCancel===false?<p className="clearfix mb20 shaiContent">
								<span className="shaiTitle fl mt5 ml25">手机号：</span>
								<Input
									className={"fafafas fl"}
									style={{"width": "260px"}}
									value={this.state.phones===undefined?this.props.current_user&&this.props.current_user.phone:this.state.phones}
									placeholder="请输入手机号"
									disabled={true}
								/>
								<a className="fl ml20 mt10">
									<i className="iconfont icon-bianjidaibeijing font-20 color-blue" onClick={()=>this.editmodels()}></i>
								</a>
							</p>:""}
							{/*{this.state.current_userphonetype===true?<div className={"color-red ml100"}>不能为空</div>:""}*/}
							{this.props.current_user&&this.props.current_user.phone===null||modalCancel===true?<p className="clearfix mb20 shaiContent">
									<span className="shaiTitle mt5 fl">
							    <span className="shaiTitle fl mt5 ml25">
										{/*未注册才显示!*/}

										手机号：</span>
										<Input
											className={"fafafas fl"}
											style={{"width": "260px"}}
											value={this.state.contact_phone}
											placeholder="请输入手机号码"
											onInput={(e)=>this.onChangeContact_phone(e)}
										/>
										{this.state.contact_phonetype===true?<div className={"color-red ml100"}>不能为空</div>:""}
										{this.state.contact_phonetypes===true?<div className={"color-red ml100"}>请输入正确的手机号</div>:""}
									</span>

									<span className="shaiTitle mt5 ml17 fl">
										<span>
											<Search
												style={{ width: 300 }}
												value={this.state.code}
												className="fafas"
												placeholder="请输入验证码"
												enterButton={
											  getverificationcodes === undefined ? <span>重新发送 ({seconds}s)</span>: getverificationcodes === true ?<span  >获取验证码</span>	:<span  >重新发送</span>}
												onSearch={()=>this.getverificationcode()}
												onInput={(e)=>this.onChangeCode(e)}
											/>
											{this.state.codeypes===true?<div className={"color-red"}>验证码不能为空</div>:""}
											{this.state.codeypesno===true?<div className={"color-red"}>验证码不正确</div>:""}
										</span>
										<span>
											{/*<Button type="primary" className="defalutSubmitbtn ml10 defalutSubmitbtnmodels">重新发送（）</Button>*/}
										</span>
									</span>
									<a className="fl mt8 mt15">
										<span className="font-18 color-blue" onClick={()=>this.modalCancel()}>X</span>
									</a>
								</p>:""}


						</div>
					</div>
				</p>

				<div className="clearfix mt30 mb30">
					<Button type="primary" className="defalutSubmitbtn fl mr20 defalutSubmitbtns" onClick={()=>this.setPublication(true)}>申请发布</Button>
					<a className="defalutCancelbtns fl"  onClick={()=>this.setPublication(false)}>保存</ a>
				</div>
			</Spin>
			</div>

		)
	}
}

export default PackageIndexNEIBannerConcent;

// attachments:[
// 	{
// 		id: 206525,
// 		title: "412420b57ed8c141963d4c548bde551f",
// 		filesize: 18523,
// 		description: null,
// 		url: "/api/attachments/206525"
// 	}
// 	]

