import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, SnackbarHOC, getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Radio,
	Checkbox,
	Form,
	Input,
	Select,
	Cascader,
	Col, Row, InputNumber, DatePicker, AutoComplete, Button, Tag,Icon
} from "antd";
import './../questioncss/questioncom.css';
import Newknledpots from '../component/Newknledpots';
import Ldanxuan from './lntlligentpone';
const InputGroup = Input.Group;
const {Option} = Select;
//Itembankstop Comthetestpaperst 题库的
class Intelligentcomponents extends Component {
	constructor(props) {
		super(props);
		this.contentMdRef = React.createRef()
		this.state = {
			page: 1,
			Knowpoints: [],
			rbtx: undefined,
			rbkc: undefined,
			knowledgepoints: [],
			knowledgepoints2:[],
			options: [],
			NewknTypedel:false,
			boolred:false,
			rbly:"1"
		}
	}
	setboolred=(bool)=>{
		this.setState({
			boolred:bool
		})

	}
	//初始化
	componentDidMount() {
		try {
			this.props.getJudquestio(this);
		} catch (e) {

		}
		this.setState({
			options: this.props.disciplmy,

		})

	}

	componentDidUpdate(prevProps) {
		//编辑的时候
		if (prevProps.disciplmy !== this.props.disciplmy) {
			this.setState({
				options: this.props.disciplmy
			})
		}

	}



	handdisciplinesChange =(name,title)=>{
		this.setState({
			rbkc:[name.id,title.id]
		})
		this.props.form.setFieldsValue({
			rbkc: [name.id,title.id],
		});



	}
	handleSearch=(value)=>{


		if(value!=""){
			this.props.form.setFieldsValue({
				classroom:value,
				// course:value
			});
			// this.Searchvalue(value)
		}

	};
	handleChange=(e)=>{
		//console.log(e);

		if(e.target.value){
			if(e.target.value.length>60){
				this.setState({
					bordebool:true,
				})
			}else if(e.target.value.length===0){
				this.setState({
					bordebool:true,
				})
			}else{
				this.setState({
					bordebool:false,
				})
			}
		}else{
			this.setState({
				bordebool:true
			})

		}

	};

	handletag_disciplinesChange = (data) => {
		//是否选中的知识点
		try {
			var sju=data[data.length-1].name;
			this.setState({
				Knowpoints:data,
			})
			this.props.form.setFieldsValue({
				rbzsd: sju,
			});
		}catch (e) {

		}


	}
	onChange = (e) => {

	}
	Getdatas = () => {
		return this.handleSubmits();
	}
	handleSubmits = () => {
		var dxt=0;
		var dxtx=0;
		var pdt=0;
		var bct=0;
		try {
			dxt=this.$dxt.mygetinputnumber();
		}catch (e) {
			dxt=0;
		}

		try {
			dxtx=this.$ddxt.mygetinputnumber();
		}catch (e) {
			dxtx=0;
		}

		try {
			pdt=this.$pdt.mygetinputnumber();
		}catch (e) {
			pdt=0;
		}

		try {
			bct=this.$bct.mygetinputnumber();
		}catch (e) {
			bct=0;
		}




		var data = [];
		this.props.form.validateFields((err, values) => {
			data = [];
			if (!err) {
				data.push({
					rbnd: parseInt(values.rbnd)
				})
				data.push({
					rbzsd: this.state.Knowpoints
				})
				data.push({
					rbkc: values.rbkc
				})
				data.push({
					rbdxt: dxt
				})
				data.push({
					rbdxtx: dxtx
				})
				data.push({
					rbpdt: pdt
				})
				data.push({
					rbbct: bct
				})
				data.push({
					rbly: parseInt(values.rbly)
				})
			}
		});
		return data;
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				//////console.log("获取的form 数据");
				//////console.log(values);

			}


		});
	}
	handleFormLayoutChanges = (e) => {
		// //console.log("handleFormLayoutChanges");
		// //console.log(value);
		// debugger
		//来源
		this.props.form.setFieldsValue({
			rbly: e.target.value + "",
		});
		this.setState({
			rbly: e.target.value  + "",
		})

  try {
		this.props.getdatassssy(e.target.value);
	}catch (e) {

	}

	}
	handleFormLayoutChange = (e) => {
		// //console.log("handleFormLayoutChange");
		// //console.log(value);
		// debugger
		//难度塞选
		this.props.form.setFieldsValue({
			rbnd: e.target.value + "",
		});
		this.setState({
			rbnd: e.target.value + "",
		});
		try {
			this.props.getdatass(parseInt(e.target.value));
		}catch (e) {

		}
	}
	handleFormkechen = (value) => {
		//课程
		if(this.state.Knowpoints.length>4){
			this.props.showNotification(`知识点最多选择5个`);
			return
		}
		var valuename = undefined;
		this.props.form.setFieldsValue({
			rbzsd: value,
		});

		var arr = this.state.knowledgepoints;
		for (let data of arr) {
			if (data.id === value) {
				this.state.Knowpoints.push(data);
				valuename = data.name;
			}
		}

		const _result =[];
		this.state.knowledgepoints.filter(item => {
			if (this.state.Knowpoints.findIndex(t => t.id === item.id) === -1) {
				_result.push(item);
			}
		});


		this.setState({
			rbzsd: valuename,
			Knowpoints: this.state.Knowpoints,
			knowledgepoints2: _result,
		})

	  try {
			this.props.getdatassss(this.state.Knowpoints);
		}catch (e) {

		}

	}

	handleFormzhishidian = (value) => {
		//console.log("handleFormzhishidian 课程");
		//console.log(value);

		//课程
		this.props.form.setFieldsValue({
			rbkc: value,
		});
		this.setState({
			rbkc:value,
		})
		// //console.log("handleFormzhishidian");
		// //console.log(this.props.disciplinesdata);

		const didata = this.props.disciplinesdata;
		const knowledgepointsdata = [];

		for (var i = 0; i < didata.length; i++) {
			//方向
			if (value[0] === didata[i].id) {
				const fxdidata = didata[i].sub_disciplines;
				for (var j = 0; j < fxdidata.length; j++) {
					//课程
					if (value[1] === fxdidata[j].id) {
						const zsddata = fxdidata[j].tag_disciplines;
						for (var k = 0; k < zsddata.length; k++) {
							//知识点
							knowledgepointsdata.push(zsddata[k]);


						}

					}

				}
			}


		}

		this.setState({
			Knowpoints: [],
			knowledgepoints: knowledgepointsdata,
			knowledgepoints2:knowledgepointsdata,
		})

		this.props.form.setFieldsValue({
			rbzsd: undefined,
		});
		this.setState({
			rbzsd: undefined,
		})

		try {
			this.props.getdatasss(parseInt(value[1]));
		}catch (e) {

		}
	}

	handleFormtixing = (value) => {
		//题型
		////console.log("题型");
		////console.log(value);
		this.setState({
			rbtx: value + "",
		})
		this.props.form.setFieldsValue({
			rbtx: value + "",
		});
		this.props.setitem_type(value);
	}
	preventDefault = (e) => {
		e.preventDefault();
		//////console.log('Clicked! But prevent default.');
	}
	deletesobject = (item, index) => {

		var tmp = this.state.Knowpoints;
		for (var i = 0; i < tmp.length; i++) {
			if (i ===index) {
				tmp.splice(i,1);
			}
		}

		this.props.form.setFieldsValue({
			rbzsd: this.state.Knowpoints,
		});

		const _result =[];
		this.state.knowledgepoints.filter(item => {
			if (this.state.Knowpoints.findIndex(t => t.id === item.id) === -1) {
				_result.push(item);
			}
		});
		this.setState({
			Knowpoints: this.state.Knowpoints,
			knowledgepoints2:_result,
		})
		if (this.state.Knowpoints.length === 0) {
			this.setState({
				rbzsd: undefined,
			})
		} else if (this.state.Knowpoints.length > 0) {
			try {
				const myknowda = this.state.Knowpoints;
				this.setState({
					rbzsd: myknowda[this.state.Knowpoints.length - 1].name,
				})
			} catch (e) {

			}

		}
		//删除知识点
		try {
			this.props.getdatassss(this.state.Knowpoints);
		}catch (e) {

		}

	}

	NewknTypedeldel=(bool)=>{
		if(this.state.rbkc===undefined || this.state.rbkc===null || this.state.rbkc===""){
			this.props.showNotification(`请选择课程方向`);
			return;
		}
		this.setState({
			NewknTypedel:bool
		})

	}

	NewknTypedeltyoedel=(value)=>{
		var knowledgepointmys=	this.state.knowledgepoints;
		for(let myda of knowledgepointmys) {
			if(myda.name===value){
				this.props.showNotification(`重复的知识点`);
				this.setboolred(true);

				break;
			}
		}
		if(value===null||value===""){
			this.props.showNotification(`请输入知识点`);
			this.setboolred(true);

			return
		}

		if(value.length===0){
			this.props.showNotification(`请输入知识点`);
			this.setboolred(true);

			return
		}


		var data={
			name:value,
			sub_discipline_id:this.state.rbkc[1]
		}
		const url="/tag_disciplines.json";
		axios.post(url,data)
			.then((result) => {
				if (result.data.status === 0) {
					// this.props.showNotification(`新增知识点成功!`);
					var leydata={
						id: result.data.tag_discipline_id,
						name:value,
					}

					if(this.state.Knowpoints.length>=5){
						this.state.knowledgepoints.push(leydata);
						const _result =[];
						this.state.knowledgepoints.filter(item => {
							if (this.state.Knowpoints.findIndex(t => t.id === item.id) === -1) {
								_result.push(item);
							}
						});

						this.setState({
							Knowpoints: this.state.Knowpoints,
							knowledgepoints:	this.state.knowledgepoints,
							knowledgepoints2: _result,
						})
					}else{
						this.state.Knowpoints.push(leydata);
						this.state.knowledgepoints.push(leydata);
						const _result =[];
						this.state.knowledgepoints.filter(item => {
							if (this.state.Knowpoints.findIndex(t => t.id === item.id) === -1) {
								_result.push(item);
							}
						});
						this.setState({
							Knowpoints: this.state.Knowpoints,
							knowledgepoints:	this.state.knowledgepoints,
							knowledgepoints2: _result,
						})
					}
				}
			}).catch((error) => {
			////console.log(error);
		})
		//新增知识点
		try {
			this.getdatassss(this.state.Knowpoints);
		}catch (e) {

		}
		this.setState({
			NewknTypedel:false
		})
	}



	render() {
		let {page, options,NewknTypedel,knowledgepoints,knowledgepoints2,Knowpoints} = this.state;
		const {getFieldDecorator} = this.props.form;
		const optionss = this.state.searchlist && this.state.searchlist.map(d => <Option key={d.name} value={d.name}>{d.name}</Option>);


		return (

			<div className=" clearfix  educontent Contentquestionbankstyle w100s w1200fpx mt19">
				<style>
					{
						`
						.ant-form-item{
						 margin-bottom: 0px !important;
						
						
						}
						.ant-form-explain{
						padding-left:0px !important;
						margin-top: 3px !important;
						}
					.ant-select-selection{
					height: 33px !important;
					}
					.kechen .ant-input-group{
					  width:258px !important;
					} 
					
						.zsdd .ant-input-group{
					  width:258px !important;
					} 
					
					.sjmc .ant-input-group{
					  width:258px !important;
					} 
					
					.kssc .ant-input-group{
					  width:258px !important;
					} 
					
					.rbndclass .ant-input-group{
					  width:258px !important;
					} 
					.ant-input {
					height: 33px !important;
					}
					
					.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
    outline: 0px solid rgba(24, 144, 255, 0.06) !important;
}
           
						`
					}
				</style>
				<div className="h12"></div>
				{
					NewknTypedel?
						<Newknledpots {...this.state} {...this.props}
													boolred={this.state.boolred}
													setboolred={(bool)=>this.setboolred(bool)}
													NewknTypedeldel={(bool)=>this.NewknTypedeldel(bool)}
													NewknTypedeltyoedel={(value)=>this.NewknTypedeltyoedel(value)}
						></Newknledpots>
						:""
				}

				<Form onSubmit={this.handleSubmit}>
					<div className="kechen">
						<div className="sortinxdirection">
							<Form.Item
								label="课程"
							>
								{getFieldDecorator("rbkc"
									,
									{initialValue: this.state.rbkc,
										rules: [{required: true, message: '请选择课程'}],
									}
								)(
									<Cascader style={{width: '258px'}}  options={options} onChange={this.handleFormzhishidian}
														placeholder="请选择..."/>
								)}
							</Form.Item>
						</div>
					</div>
					<div className="zsdd">
						<Form.Item
							label="知识点"
						>
							{getFieldDecorator("rbzsd"
							)(
								<div className="sortinxdirection">
									<InputGroup compact>
										<Select style={{width: '258px'}} value={undefined} onChange={this.handleFormkechen}
														placeholder="请选择...">
											{knowledgepoints2 && knowledgepoints2.map((object, index) => {
												return (
													<Option key={object.id} value={object.id}>{object.name}</Option>
												)
											})}
										</Select>
									</InputGroup>



									<img className=" ml22 zjzsdian xiaoshou"  src={getImageUrl("images/educoder/zjzsd.png")} onClick={()=>this.NewknTypedeldel(true)}/>



								</div>
							)}
						</Form.Item>
					</div>
					{
						this.state.Knowpoints===undefined||this.state.Knowpoints===null?"":
							this.state.Knowpoints.length>0?
								<div className="sortinxdirection huanhan w100s mt15" style={{
									minHeight: "33px",
									lineHeight: "28px",
								}}>
									{this.state.Knowpoints === undefined ? "" : this.state.Knowpoints.map((object, index) => {
										return (
											<div key={index} className={index===0?"mytagss mb20":"mytagss"} style={{
												position: "relative",
											}}>
												<p className="w100s  stestcen lh32">{object.name}</p>

												<img className=" ml7 zjzsdian xiaoshou icondowncolorssy"  onClick={() => this.deletesobject(object, index)} src={getImageUrl("images/educoder/bzucha.png")}/>

											</div>
										)
									})}
								</div>
								:
								""
					}

					<style>
						{
							`
							.rbndclasss .ant-radio-button-wrapper{
							width:106px !important;
							height:33px !important;
							background:#EEEEEE;
							border-radius:2px;
							color:#333333; 
							text-align: center !important;
							border:0px !important;
							margin-right: 27px !important;
						  margin-top: 6px !important;

							}
							.rbndclasss .ant-radio-button-wrapper-checked {
						    width: 106px !important;
								height: 33px !important;
								background: #4CACFF !important;
					      border-radius:2px;
								text-align: center !important;
								border:0px !important;
								color: #ffffff !important;
								margin-right: 27px !important;
								    margin-top: 6px!important;

							}
							.rbndclasss .ant-radio-button-wrapper:not(:first-child)::before{
								border:0px !important;
									width:0px !important;
							}
							
							.rbndclasss .ant-radio-button-wrapper{
								border:0px !important;
							}
							.rbndclasss .ant-radio-group{
								border:0px !important;
							}
							.rbndclasss .ant-radio-group label{
								border:0px !important;
							}
							
							.rbndclasss .ant-radio-group span{
								border:0px !important;
							}
							
							ant-radio-button-wrapper:focus-within {
									outline: 0px solid #ffffff;
							}
							
							`
						}
					</style>
					<div className="rbndclasss">
						<Form.Item label="来源">
							{getFieldDecorator('rbly'
								,
								{initialValue: this.state.rbly,
								}
							)(
								<Radio.Group onChange={this.handleFormLayoutChanges}>
									<Radio.Button value="1">公共</Radio.Button>
									<Radio.Button value="0">我的</Radio.Button>
								</Radio.Group>,
							)}
						</Form.Item>
					</div>

					<p className="conditionsetting mt40">条件设置</p>
					<div className="hengxians mt13"></div>


					<style>
						{
							`
							.rbndclass .ant-radio-button-wrapper{
							width:106px !important;
							height:33px !important;
							background:#EEEEEE;
							border-radius:17px !important;
							color:#333333; 
							text-align: center !important;
							border:0px !important;
							margin-right: 27px !important;
							    margin-top: 6px !important;

							}
							.rbndclass .ant-radio-button-wrapper-checked {
						    width: 106px !important;
								height: 33px !important;
								background: #4CACFF !important;
								border-radius: 17px !important;
								text-align: center !important;
								border:0px !important;
								color: #ffffff !important;
								margin-right: 27px !important;
								    margin-top: 6px!important;

							}
							.rbndclass .ant-radio-button-wrapper:not(:first-child)::before{
								border:0px !important;
									width:0px !important;
							}
							
							.rbndclass .ant-radio-button-wrapper{
								border:0px !important;
							}
							.rbndclass .ant-radio-group{
								border:0px !important;
							}
							.rbndclass .ant-radio-group label{
								border:0px !important;
							}
							
							.rbndclass .ant-radio-group span{
								border:0px !important;
							}
							
							ant-radio-button-wrapper:focus-within {
									outline: 0px solid #ffffff;
							}
							
							`
						}
					</style>
					<div className="rbndclass">
						<Form.Item label="试卷难度">
							{getFieldDecorator('rbnd'
								,
								{initialValue: this.state.rbnd,
									rules: [{required: true, message: '请选择难度'}],
								}
							)(
								<Radio.Group onChange={this.handleFormLayoutChange}>
									<Radio.Button value="1">简单</Radio.Button>
									<Radio.Button value="2">适中</Radio.Button>
									<Radio.Button value="3">困难</Radio.Button>
								</Radio.Group>,
							)}
						</Form.Item>
					</div>


				</Form>
				{
					this.props.single_question_count===0&&this.props.multiple_question_count===0&&this.props.judgement_question_count===0&&
					this.props.program_question_count===0?
						""
						:
						<div>
							<p className={"conditionsettings mt40"}>题型及数量</p>
							<div className={"hengxians mt13"}></div>
							<Ldanxuan {...this.state} {...this.props} dxtx={"单选题："} mycount={this.props.single_question_count} getdatas={()=>this.props.getdatas()} ref={dom => {
								this.$dxt = dom;
							}}></Ldanxuan>
							<Ldanxuan {...this.state} {...this.props} dxtx={"多选题："}  mycount={this.props.multiple_question_count} getdatas={()=>this.props.getdatas()} ref={dom => {
								this.$ddxt = dom;
							}}></Ldanxuan>
							<Ldanxuan {...this.state} {...this.props} dxtx={"判断题："} mycount={this.props.judgement_question_count} getdatas={()=>this.props.getdatas()} ref={dom => {
								this.$pdt = dom;
							}}></Ldanxuan>
							<Ldanxuan {...this.state} {...this.props} dxtx={"编程题："} mycount={this.props.program_question_count} getdatas={()=>this.props.getdatas()} ref={dom => {
								this.$bct = dom;
							}}></Ldanxuan>
						</div>

				}


				<div className="h20"></div>
			</div>
		)

	}


}

const Intelligentcomponentss = Form.create({name: 'Intelligentcomponents'})(Intelligentcomponents);
export default Intelligentcomponentss;
