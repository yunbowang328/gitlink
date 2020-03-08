import React,{ Component } from "react";
import { Input,Checkbox,Table, Pagination, Modal,Menu, Tooltip,Spin,Button,Form,Row, Col } from "antd";
import { WordsBtn,on, off, trigger,markdownToHTML,getImageUrl} from 'educoder';
import './myysleduinforms.css'
import axios from 'axios';
import TPMMDEditor from "../../tpm/challengesnew/TPMMDEditor";
import moment from "../new/CoursesNew";
import Fileslistitem from "../Resource/Fileslistitem";
import Modals from "../../modals/Modals";
// 公告栏
class Bullsubdirectory extends Component{
	constructor(props){
		super(props);
		this.messageRef = React.createRef();

		this.state={
			description:null,
			isSpinysl:false,
			whethertoeditysl:false,
			addonAfter:0,
			eduintits:"",
			informs:[],
			Modalstype:false,
			Modalstopval:"是否确认删除?",
			ModalCancel:"",
			ModalSave:"",
      index:0,

		}
		//不能显示数据编辑的时候没有赋值
		//没加initialValue 输入不能赋值到from 上
	}

	componentDidMount() {
		// console.log("获取到数据");
		// console.log(this.props);
		let{id,myname,mydescription,index,item} =this.props
		this.props.form.setFieldsValue({
			id:id,
			eduintits:item.name,
			description:item.description,
		});
		// this.contentMdRef.current.setValue(mydescription);
		this.setState({
			id:id,
			eduintits:item.name,
			description:item.description,
			index:index
		})
		if(myname!=undefined){
			this.setState({
				addonAfter:myname.length
			})
		}

	}

	setModeltrue=()=>{
	 this.setState({
		 Modalstype:true,
		 Modalstopval:"是否确认删除?",
		 ModalCancel:this.cancelmodel,
		 ModalSave:this.saveonOpen,
	 })
	}

	 cancelmodel=()=>{
     //取消
		 this.setState({
			 Modalstype:false,
			 Modalstopval:"是否确认删除?",
			 ModalCancel:"",
			 ModalSave:"",
		 })
	 }

	 saveonOpen=()=>{
      //确认
		 // /
		 // 删除公告
		 var  id=this.props.match.params.coursesId
			 const url =`/courses/${id}/delete_informs.json`;
		 axios.delete(url, { data: {
				 inform_id: this.props.id
				 }})
			 .then((response) => {
			 	if(response){
			 		if(response.data){
			 			 if(response.data.status===0){
							 this.setState({
								 Modalstype:false,
								 Modalstopval:"是否确认删除?",
								 ModalCancel:"",
								 ModalSave:"",
							 })
							 this.props.showNotification(`删除成功`);
							 this.props.getinputdata();
						 }else{
							 this.props.showNotification(`删除失败`);
						 }
					}else{
						this.props.showNotification(`删除失败`);
					}
				}

			 })
			 .catch(function (error) {
				 console.log(error);
				 this.props.showNotification(`删除失败`);
			 });
		}


	bianji = (bians,i)=>{
		console.log("bianji");
		console.log(this.props.myname);
		console.log(this.props.mydescription);
		this.setState({
			whethertoeditysl:bians,
			eduintits:this.props.myname,
			description:this.props.mydescription,
			index:i
		});
		this.props.form.setFieldsValue({
			eduintits:this.props.myname,
			description:this.props.mydescription,
		});
		if(bians===true){
			this.props.getyslbooltrue();
		}else {
			this.props.getyslboolfalse();
		}
	};
	changeTopicName = (e) => {
		// console.log("调用了changeTopicName");
		let num = e.target.value.length;

		if(num>60){
			return;
		}
		this.setState({
			addonAfter: num < 0 ? 0 : num
		});
		if(num<=60){
			this.setState({
				eduintits: e.target.value
			})

			this.props.form.setFieldsValue({
				eduintits: e.target.value,
			});
		}


	}
	handleSubmit=(e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			debugger
			if (!err) {
				console.log(values.description);
				if(values.eduintits === undefined|| values.eduintits === "" || values.eduintits ===null){
					this.props.showNotification(`请输入标题`);
					return

				}
				if(values.description === undefined|| values.description === "" || values.description ===null){
					this.props.showNotification(`请输入内容`);
					return

				}
				var  id=this.props.match.params.coursesId
				var titname="";
				try {
					if(values.eduintits.length>0){
						if( values.eduintits.length>60){
							var str=values.eduintits;
							titname=str.substring(0,60);
						}else {
							titname=values.eduintits;
						}
					}else {
						titname=values.eduintits;
					}
				}catch (e) {
					titname=values.eduintits;
				}
				var  url = `/courses/${id}/update_informs.json`;
				axios.post(url,{
					inform_id:this.props.id,
					name:titname,
					description:values.description,
				}).then((result) => {
					if(result){
						if(result.data){
							if(result.data.status === 0){
								// this.props.form.setFieldsValue({
								// 	id:this.state.id,
								// 	eduintits:titname,
								// 	description:values.description,
								// });
								this.setState({
									whethertoeditysl:false,
									id:this.state.id,
									eduintits:titname,
									description:values.description,
								});
								this.props.getinputdata();
								this.props.getyslboolfalse();
								this.props.showNotification(result.data.message);
							}else {
								this.props.showNotification(result.data.message);

							}
						}

					}
				}).catch((error) => {
					console.log(error)
				})
			}else{
				console.log(err);
			}

		});
	}

	//上移
	Moveupward = (id) => {
		let url = `/courses/${this.props.match.params.coursesId}/inform_up.json`;
		axios.post(url, {
			inform_id: id
		}).then((response) => {
			if (response) {
				if (response.data) {
					if (response.data.status === 0) {
						this.props.showNotification(`上移成功`);
						this.props.getinputdata();
					} else {
						this.props.showNotification(`上移失败`);
					}
				} else {
					this.props.showNotification(`上移失败`);
				}
			} else {
				this.props.showNotification(`上移失败`);
			}
		}).catch((error) => {
			console.log(error)
		});
	}
	//下移
	Movedown = (id) => {
		let url = `/courses/${this.props.match.params.coursesId}/inform_down.json`;
		axios.post(url, {
			inform_id: id
		}).then((response) => {
			if (response) {
				if (response.data) {
					if (response.data.status === 0) {
						this.props.showNotification(`下移成功`);
						this.props.getinputdata();
					} else {
						this.props.showNotification(`下移失败`);
					}
				} else {
					this.props.showNotification(`下移失败`);
				}
			} else {
				this.props.showNotification(`下移失败`);
			}
		}).catch((error) => {
			console.log(error)
		});
	}






	render(){
		let{description,whethertoeditysl,addonAfter,eduintits,informs,isSpinysl,index} =this.state;
		let{myname,mydescription,id}=this.props;
		const {getFieldDecorator} = this.props.form;
		// console.log("Bullsubdirectory");
		// console.log(this.props.isAdmin());
    //  console.log(this.props);
    //  console.log(whethertoeditysl);
		// console.log(this.state.eduintits);
		// console.log(this.state.description);

		return(
			<React.Fragment  key={this.props.index} id={this.props.id}>
						<div  key={this.props.index} id={this.props.id}>
							{this.state.Modalstype&&this.state.Modalstype===true?<Modals
								modalsType={this.state.Modalstype}
								modalsTopval={this.state.Modalstopval}
								modalCancel={this.state.ModalCancel}
								modalSave={this.state.ModalSave}
							/>:""}
							<Spin size="large" spinning={isSpinysl}  >
								<div  className="edu-back-white " id={
									index
								}>
									{
										whethertoeditysl === false?
											<div id={this.props.index}>
												<div className="fudonyingxiangysls">
													<div className="fudonyingxiangysl">
														<div style={{marginRight:"60px"}}>
															<span className="ysltitbt">{myname}</span>
														</div>
														<div>
																	<span className="fr yslbianji" style={{marginRight:"17px"}}>
																	{
																		this.props.isAdmin() === true ?
																			(this.props.yslbool===false?
																					<Tooltip  placement="bottom" title={<div>
																						编辑
																					</div>}>
																						<i className="iconfont icon-bianji1 newbianji1" onClick={()=>this.bianji(true,this.props.index)}></i>
																					</Tooltip>
																					:
																					""
																			)
																			:""
																	}
																</span>
															<span className="fr yslbianji" style={{marginRight:"22px"}}>
																	{
																		this.props.isAdmin() === true ?
																			(this.props.yslbool===false?
																					<Tooltip  placement="bottom" title={<div>
																						删除
																					</div>}>
																						<i className="iconfont icon-shanchu newbianji1" style={{ color: "#4CACFF"}} onClick={()=>this.setModeltrue(true)}></i>
																					</Tooltip>
																					:
																					""
																			)
																			:""
																	}
																</span>
															{
																this.props.length - 1 === this.props.index ? "" :
																	this.props.isAdmin() === true ?
																		(this.props.yslbool === false ?
																				<a className="fr yslbianji mr30"
																					 style={{
																						 lineHeight: "31px",
																					 }}
																					 onClick={() => this.Movedown(this.props.id)}
																				><Tooltip
																					title="下移"><i
																					style={{color: "#4CACFF"}}
																					className=" font-18 iconfont icon-xiangxiayi"></i></Tooltip></a>
																				:
																				""
																		)
																		: ""
															}
															{
																this.props.index === 0 ? "" :
																	this.props.isAdmin() === true ?
																		(this.props.yslbool === false ?
																				<a className="fr yslbianji mr30"
																					 style={{
																						 lineHeight: "31px",
																					 }}
																					 onClick={() => this.Moveupward(this.props.id)}
																				><Tooltip
																					title="上移"><i
																					style={{color: "#4CACFF"}}
																					className=" font-18 iconfont icon-xiangshangyi"></i></Tooltip></a>
																				:
																				""
																		)
																		: ""
															}
														</div>
														<div className="yslclear"></div>
													</div>
													<div id="MakedownHTML"className="markdown-body fonttext yslmtopcg yslminHeigth markdownysltext"   dangerouslySetInnerHTML={{__html: markdownToHTML(mydescription).replace(/▁/g, "▁▁▁")}}/>
												</div>
												{parseInt(this.props&&this.props.informs.length)===parseInt(this.props&&this.props.index+1)?"":<div className="bor-bottom-greyE mr25 ml25"></div>}
											</div>
											:
											whethertoeditysl === true?
												<div  className="edu-back-white " key={this.props.index} id={this.props.id}>
													<Form layout='vertical' onSubmit={this.handleSubmit} key={this.props.index}>
														<style>
															{
																`.ant-form-item{
															    margin-bottom:0px !important;
															}
															.chooseDestwo .ant-form-item{
															    margin-bottom:0px !important;
															}
														
															.chooseDestwo .ant-form-item-control-wrapper .ant-form-item-control .ant-form-explain{
															padding-left: 25px !important;
															}
															.ant-form-vertical .ant-form-item {
															margin-bottom:0px !important;
															 }
															`

															}
														</style>
														<Form.Item
															style={{"borderBottom":'none'}}
															className="chooseDestwo "
															key={this.props.index}
														>
															{getFieldDecorator('eduintits', { initialValue: eduintits}, {
																rules: [{
																	required: true, message: '请在此输入标题,最多60个字符',
																}],
															})(
																<div className="ysleduinwh">
																	<div className="yslduinlefts">
																		<span className="yslduincolorred">*</span>
																	</div>
																	<div className="yslduinleft">
																		<style>{
																			`
																					.ant-input{
																				border-right: none !important;
																				height: 40px !important;
																				}
																		`
																		}</style>
																		<Input placeholder="请在此输入标题，最多60个字符" key={this.props.index} maxLength="60"
																					 style={{ textAlign: "left",width:"100%",}}
																					 onInput={this.changeTopicName}
																					 autoComplete="off"
																					 addonAfter={String(addonAfter)+"/60"}
																					 value={eduintits}
																					 className="searchViewAfter"></Input>
																	</div>

																</div>
															)}
														</Form.Item>


														<div  className="edu-back-white " key={this.props.index}>
															<div className={"yslmt16px"}>
																<style>
																	{
																		`
																.ant-form-item-children {
																		position: unset;
																}
																
																	.chooseDes .ant-form-item{
															    margin-bottom:0px !important;
															}
															.rememberTip{
																position:absolute;
																right:0px;
																bottom:-10px;
															}
															.chooseDes .ant-form-explain{
															position:absolute;
															bottom:-10px;
															left:0px;
														}
														.ant-form-vertical .ant-form-explain {
																margin-top: 0px !important;
																margin-bottom: 0px !important;
																padding-left: 0px !important;
														}
														.chooseDes .ant-form-item-with-help {
																	margin-bottom: 24px !important;
															}
															
															.courseMessageMD .ant-form-item-with-help {
																	margin-bottom: 24px !important;
															}
														.chooseDes .editormd-toolbar {
														 width: 100%; 
														 min-height: 37px; 
														 background: #fff; 
														 display: none; 
														 position: absolute !important; 
														 left: 0;
												     z-index: 10; 
														 border-bottom: 1px solid #ddd; 
														 
														}
														.yslmt16px .ant-form-item-with-help
														{
																margin-bottom: 24px !important;
														}
															`
																	}
																</style>
																<Form.Item
																	style={{"borderBottom":'none'}}
																	className="chooseDes "
																	key={this.props.index}
																>
																	{getFieldDecorator('description', { initialValue: description},{
																		rules: [{
																			required: true, message: '请在此输入内容,最多5000个字符',
																		}, {
																			len: 5000, message: '最大限制为5000个字符',
																		}],
																	})(
																		<TPMMDEditor ref={this.messageRef}
																								 key={this.props.index}
																								 placeholder={'请在此输入内容,最多5000个字符'}
																								 initValue={description}
																								 mdID={'courseMessageMD'}
																								 className="courseMessageMD "
																								 height={518}
																		></TPMMDEditor>


																	)}
																</Form.Item>

															</div>
														</div>

														<Form.Item>
															<div className="clearfix mt28  fr pb50 mr25">
																<a className="defalutCancelbtn fl mr20 " onClick={()=>this.bianji(false,this.props.index)}>取消</a>
																<Button   htmlType="submit"  className="ant-btn defalutSubmitbtn fl  ant-btn-primary">
																	<span>提 交</span></Button>
															</div>
														</Form.Item>
													</Form>
													<div className="bor-bottom-greyE mr25 ml25"></div>
												</div>
												:""
									}
								</div>
							</Spin>

						</div>
			</React.Fragment>
		)
	}
}
const Bullsubdirectorys = Form.create({ name: 'bullsubdirectorys' })(Bullsubdirectory);
export default Bullsubdirectorys;
