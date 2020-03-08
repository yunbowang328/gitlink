import React,{ Component } from "react";
import { Input,Checkbox,Table, Pagination, Modal,Menu, Tooltip,Spin,Button,Form } from "antd";
import { WordsBtn,on, off, trigger,markdownToHTML,getImageUrl} from 'educoder';
import './myysleduinforms.css'
import axios from 'axios';
import TPMMDEditor from "../../tpm/challengesnew/TPMMDEditor";
import Bullsubdirectory from "./Bullsubdirectory";
import NoneData from '../../../modules/courses/coursesPublic/NoneData'

import moment from "../new/CoursesNew";
import Fileslistitem from "../Resource/Fileslistitem";
 // 公告栏
// var isOnComposition = false;
// const isChrome = !!window.chrome && !!window.chrome.webstore
class Eduinforms extends Component{
	constructor(props){
		super(props);
		this.messageRef = React.createRef();

		this.state={
			description:null,
			isSpin:true,
			whethertoedit:false,
			addonAfter:0,
			eduintits:"",
			informs:[],
			yslbool:false,
			dataquerys:{},
		}
	}

	componentDidMount() {
		// console.log("Eduinformss");
		// console.log("获取到数据");
    // console.log(this.props);
		const query = this.props.location.search;
		// const type = query.split('?chinaoocTimestamp=');
		// console.log("Eduinforms12345");
	  // console.log(this.foo(query));
		// console.log(JSON.stringify(this.foo(query)));
		var dataqueryss={}
		 try {
			 var foqus=this.foo(query);
		 	if(JSON.stringify(foqus) ==="{}"){
				this.setState({
					dataquerys:{},
				});
			}else {
				this.setState({
					dataquerys:foqus,
				});
				dataqueryss=foqus;
			}
		 }catch (e) {
			 this.setState({
				 dataquerys:{},
			 })
		 }
		this.getinputdatas(dataqueryss);
	}
 //截取数据
 foo=(url)=> {
		var json = {};
		var regExp = /[\?\&](\w+)(=?)(\w*)/g;
    var arr;
		do {
			arr = regExp.exec(url);
			// console.log(arr); // arr = [完整的字符串, key, 等号或'', value或'']

			if (arr) {
				var key = arr[1];
				var value = arr[3];
				// arr[2] === ''时, value = undefined
				if (!arr[2])
					value = undefined;

				json[key] = value;
			}
		} while (arr);

		return json;
	}
	getyslbooltrue(){
		console.log("调用了getyslbooltrue");
		this.setState({
			yslbool:true,
		});
	}

	getyslboolfalse(){
		console.log("调用了getyslboolfalse");
		this.setState({
			yslbool:false,
		});
	}
	getinputdata=()=>{
		this.setState({
			isSpin:true,
		})
		let url = `/courses/${this.props.match.params.coursesId}/informs.json`;
		//
		axios.get(url,
			{params:this.state.dataquerys}
			).then((response) => {
			if(response){
				if(response.data){
					this.setState({
						informs:response.data.informs,
						isSpin:false,
					})
				}else {
					this.setState({
						informs:[],
						isSpin:false,

					})

				}
			}else {
				this.setState({
					informs:[],
					isSpin:false,
				})

			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				informs:[],
				isSpin:false,
			})
		});
	}
	getinputdatas=(yslwebobject)=>{
		this.setState({
			isSpin:true,
		})
		let url = `/courses/${this.props.match.params.coursesId}/informs.json`;
		//
		axios.get(url,
			{params:yslwebobject}
		).then((response) => {
			if(response){
				if(response.data){
					this.setState({
						informs:response.data.informs,
						isSpin:false,
					})
				}else {
					this.setState({
						informs:[],
						isSpin:false,

					})

				}
			}else {
				this.setState({
					informs:[],
					isSpin:false,
				})

			}
		}).catch((error) => {
			console.log(error)
			this.setState({
				informs:[],
				isSpin:false,
			})
		});
	}

	componentDidUpdate = (prevProps) => {



	}
	bianji = (bians)=>{
		this.setState({
			whethertoedit:bians,
			description:"",
			eduintits:"",
			addonAfter:0,
		});
		this.props.form.setFieldsValue({
			description:"",
			eduintits:"",
		});
		if(bians===true){
			this.getyslbooltrue();

		}else {
			this.getyslboolfalse();
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
	};
	// handleComposition=(e)=>{
	// 	if (e.type === 'compositionend') {
	// 		// composition is end
	// 		isOnComposition = false
	//
	// 		if (!isOnComposition && isChrome) {
	// 			// fire onChange
	// 			console.log(!isOnComposition);
	// 			this.changeTopicName(e);
	// 		}
	// 	} else {
	// 		// in composition
	// 		isOnComposition = true
	// 	}
	// };
	// handleComposition = (e) => {
	// 	console.log(e.type + ": " + e.target.value);
	// 	if (e.type === 'compositionend') {
	// 		// composition is end
	// 		const value = e.target.value;
	// 		this.setState({ isOnComposition: false },()=>{
	// 			// this.handleFixedChange(value);
	// 		});
	// 	} else {
	// 		// in composition
	// 		this.setState({ isOnComposition: true });
	// 	}
	// }
	handleSubmit=(e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
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
				var  url = `/courses/${id}/new_informs.json`;
				axios.post(url,{
					name:titname,
					description:values.description,
				}).then((result) => {
				 if(result){
				 	if(result.data){
           if(result.data.status === 0){
            this.setState({
							whethertoedit:false,

						});
            this.getinputdata();
            this.getyslboolfalse();
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


	render(){
		let{description,whethertoedit,addonAfter,eduintits,informs,yslbool} =this.state;
		const {getFieldDecorator} = this.props.form;

		return(
			<React.Fragment  >
				<div id={"zhudiv"}>
					<div className="edu-back-white">
						<p className="clearfix padding30 bor-bottom-greyE yslmaxheigth80" >
							<p style={{height: '20px'}}>
								<span className="font-18 fl color-dark-21">公告栏</span>
								{
									this.props.isAdmin()===true?
										(this.state.yslbool===false?
											<li className="btn colorblue font-16 fr bluebkbk pointer"
													onClick={() => this.bianji(true)}>
												发布公告
											</li>
										:"")

										:""
								}

							</p>

						</p>
					</div>
					<Spin size="large" spinning={this.state.isSpin}  id={"cdiv"}>

								<div id={"cdiv1"}>
									{
										whethertoedit === false?""
											:
											<div  className="edu-back-white ">


												<Form layout='vertical' onSubmit={this.handleSubmit} >
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
													>
														{getFieldDecorator('eduintits', {
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
																	<Input placeholder="请在此输入标题，最多60个字符" maxLength={60}
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


													<div  className="edu-back-white ">
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
															>
																{getFieldDecorator('description', {
																	rules: [{
																		required: true, message: '请在此输入内容,最多5000个字符',
																	}, {
																		max: 5000, message: '最大限制为5000个字符',
																	}],
																})(
																	<TPMMDEditor ref={this.messageRef}
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
														<div className="clearfix mt28  fr pb50 mr25" >
															<a className="defalutCancelbtn fl mr20 " onClick={()=>this.bianji(false)}>取消</a>
															<Button   htmlType="submit"  className="ant-btn defalutSubmitbtn fl  ant-btn-primary">
																<span>提 交</span></Button>
														</div>
													</Form.Item>
												</Form>
												<div className="bor-bottom-greyE mr25 ml25"></div>
											</div>
									}
											<div>
												{
													informs === null || informs=== undefined ||informs.length === 0 ?
														this.state.yslbool===false?
															<NoneData></NoneData>
															:""
														:

														<div  className="edu-back-white ">
															{/*公告栏底部*/}
															{ informs&&informs.map((item, index) => {
																return (
																	<Bullsubdirectory {...this.state} {...this.props} key={index} index={index}
																										length={informs.length} yslbool={yslbool} id={item.id}
																										myname={item.name} mydescription={item.description}
																										item={item}
																										getyslbooltrue={()=>this.getyslbooltrue()}
																										getyslboolfalse={()=>this.getyslboolfalse()}
																										getinputdata={()=>this.getinputdata()} ></Bullsubdirectory>
																)
															})
															}
														</div>
												}
											</div>




								</div>




					</Spin>

				</div>
			</React.Fragment>
		)
	}
}
const Eduinformss = Form.create({ name: 'eduinforms' })(Eduinforms);
export default Eduinformss;
{/*<div key={index} className="bor-bottom-greyE" >*/}
{/*	{item.name===""?"":item.name===undefined?"":item.name===null?"":<div className="ysltitbt"><span >{item.name}</span></div>}*/}
{/*	<div id="MakedownHTML" key={index} className={"markdown-body fonttext yslmtopcg yslminHeigth markdownysltext"}   dangerouslySetInnerHTML={{__html: markdownToHTML(item.description).replace(/▁/g, "▁▁▁")}}/>*/}
{/*</div>*/}
