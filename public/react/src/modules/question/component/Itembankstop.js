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
	Col, Row, InputNumber, DatePicker, AutoComplete, Button, Tag,Tooltip
} from "antd";
import './../questioncss/questioncom.css';
import Newknledpots from './Newknledpots'
const InputGroup = Input.Group;
const {Option} = Select;
const queryString = require('query-string');

const options = [
	{
		value: '方向',
		label: '方向',
		children: [
			{
				value: '课程',
				label: '课程',
			},
		],
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
			},
		],
	},
];
//Comthetestpaperst试卷的
class Itembankstop extends Component {
	constructor(props) {
		super(props);
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
			boolnews:false,

		}
	}

	setboolred=(bool)=>{
		this.setState({
			boolred:bool
		})

	}

	//初始化
	componentDidMount() {

		const params = this.props && this.props.match && this.props.match.params;
		if (JSON.stringify(params) === "{}") {
			// "新增"
		  this.setState({
				boolnews:false,
			})
		} else {
		   if(params){
		   	if(	params.id){
					this.setState({
						boolnews:true,
					})
				}
			 }
		}



		try {
			this.props.getcontentMdRef(this);
		} catch (e) {

		}
		this.setState({
			options: this.props.disciplmy,

		})
		//console.log("数据");
		//console.log(this.props);
		const parsed = queryString.parse(this.props.location.search);
		//console.log(parsed);
		try {
			if(JSON.stringify(parsed)==={}||JSON.stringify(parsed)==="{}"){

			}else {
				if(parsed.discipline_id){
					if(parsed.sub_discipline_id){
						this.setState({
							rbkc:[parseInt(parsed.discipline_id),parseInt(parsed.sub_discipline_id)]
						})
						this.props.form.setFieldsValue({
							rbkc: [parseInt(parsed.discipline_id),parseInt(parsed.sub_discipline_id)],
						});
						this.getdatasmyss(parseInt(parsed.discipline_id),parseInt(parsed.sub_discipline_id));

					}

				}

				if(parsed.item_type){
					this.setState({
						rbtx:parsed.item_type,
					})
					this.props.form.setFieldsValue({
						rbtx:parsed.item_type,
					});
					this.props.setitem_type(parsed.item_type);
				}

				if(parsed.difficulty){
					this.setState({
						rbnd:parsed.difficulty,
					})
					this.props.form.setFieldsValue({
						rbnd:parsed.difficulty,
					});
				}


			}

		}catch (e) {

		}
	}

	componentDidUpdate(prevProps) {
		// 把知识点放进塞选中 ，如果是编辑 已经选中就不放进去
		if (prevProps.disciplmy !== this.props.disciplmy) {
			this.setState({
				options: this.props.disciplmy
			})
		}
		if(prevProps.disciplinesdata!== this.props.disciplinesdata){
			//console.log("新增开始加载了")
			try {
				if(this.props.item_banksedit.discipline &&this.props.item_banksedit.sub_discipline){
					const didata = this.props.disciplinesdata;
					const knowledgepointsdata = [];
					for (var i = 0; i < didata.length; i++) {
						//方向
						if (this.props.item_banksedit.discipline.id === didata[i].id) {
							const fxdidata = didata[i].sub_disciplines;
							for (var j = 0; j < fxdidata.length; j++) {
								//课程
								if (this.props.item_banksedit.sub_discipline.id === fxdidata[j].id) {
									const zsddata = fxdidata[j].tag_disciplines;
									for (var k = 0; k < zsddata.length; k++) {
										//知识点
										knowledgepointsdata.push(zsddata[k]);
									}
								}
							}
						}
					}
					const _result =[];
					knowledgepointsdata.filter(item => {
						if (this.props.item_banksedit.tag_disciplines.findIndex(t => t.id === item.id) === -1) {
							_result.push(item);
						}
					});
					this.setState({
						knowledgepoints:knowledgepointsdata,
						knowledgepoints2: _result,
					})
				}


				try {
					const parsed = queryString.parse(this.props.location.search);
					if(JSON.stringify(parsed)==={}||JSON.stringify(parsed)==="{}"){

					}else {
						if(parsed.discipline_id){
							if(parsed.sub_discipline_id){
								this.setState({
									rbkc:[parseInt(parsed.discipline_id),parseInt(parsed.sub_discipline_id)]
								})
								this.props.form.setFieldsValue({
									rbkc: [parseInt(parsed.discipline_id),parseInt(parsed.sub_discipline_id)],
								});
								this.getdatasmyss(parseInt(parsed.discipline_id),parseInt(parsed.sub_discipline_id));
							}
						}
					}
				}catch (e) {
				}
			}catch (e) {
			}
		}
		//编辑的时候
		if (prevProps.item_banksedit !== this.props.item_banksedit) {
			if (this.props.item_banksedit.item_type) {
				this.handleFormtixing(this.props.item_banksedit.item_type);
			}
			if (this.props.item_banksedit.difficulty) {
				this.handleFormLayoutChangeysl(this.props.item_banksedit.difficulty);
			}
			if (this.props.item_banksedit.tag_disciplines) {
				this.handletag_disciplinesChange(this.props.item_banksedit.tag_disciplines);
			}
			try {
				//初始化课程
				this.handdisciplinesChange(this.props.item_banksedit.discipline,this.props.item_banksedit.sub_discipline);
			}catch (e) {

			}
			this.getdatasmys();
		}


	}
	getdatasmys=()=>{
		if(this.props.disciplinesdata){
			try {
				if(this.props.item_banksedit.discipline &&this.props.item_banksedit.sub_discipline){
					var didata = this.props.disciplinesdata;
					var knowledgepointsdata = [];
					for (var i = 0; i < didata.length; i++) {
						//方向
						if (this.props.item_banksedit.discipline.id === didata[i].id) {
							const fxdidata = didata[i].sub_disciplines;
							for (var j = 0; j < fxdidata.length; j++) {
								//课程
								if (this.props.item_banksedit.sub_discipline.id === fxdidata[j].id) {
									const zsddata = fxdidata[j].tag_disciplines;
									for (var k = 0; k < zsddata.length; k++) {
										//知识点
										knowledgepointsdata.push(zsddata[k]);
									}
								}
							}
						}
					}
					var _result =[];
					knowledgepointsdata.filter(item => {
						if (this.props.item_banksedit.tag_disciplines.findIndex(t => t.id === item.id) === -1) {
							_result.push(item);
						}
					});


					this.setState({
						knowledgepoints:knowledgepointsdata,
						knowledgepoints2: _result,
					})
				}else{
				}
			}catch (e) {

			}
		}
	}
	getdatasmyss=(id,ids)=>{
		if(this.props.disciplinesdata){
			try {
				if(id &&ids){
					var didata = this.props.disciplinesdata;
					var knowledgepointsdata = [];
					for (var i = 0; i < didata.length; i++) {
						//方向
						if (id === didata[i].id) {
							const fxdidata = didata[i].sub_disciplines;
							for (var j = 0; j < fxdidata.length; j++) {
								//课程
								if (ids === fxdidata[j].id) {
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
						knowledgepoints:knowledgepointsdata,
						knowledgepoints2: knowledgepointsdata,
					})
				}else{
				}
			}catch (e) {

			}
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
		var data = [];
		this.props.form.validateFields((err, values) => {
			data = []
			if (!err) {
				// //////console.log("获取的form 数据");
				// //////console.log(values);
				data.push({
					rbnd: parseInt(values.rbnd)
				})
				data.push({
					rbtx: values.rbtx
				})
				data.push({
					rbzsd: this.state.Knowpoints
				})
				data.push({
					rbkc: values.rbkc
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
	handleFormLayoutChangeysl = (value) => {
		//难度塞选
		//////console.log("难度塞选");
		//////console.log(value);
		this.props.form.setFieldsValue({
			rbnd: value+ "",
		});
		this.setState({
			rbnd: value + "",
		})

	}
	handleFormLayoutChange = (e) => {
		//难度塞选
		//////console.log("难度塞选");
		//////console.log(value);
		this.props.form.setFieldsValue({
			rbnd: e.target.value + "",
		});
		this.setState({
			rbnd: e.target.value + "",
		})

	}
	handleFormkechen = (value) => {
		//课程
		//////console.log("课程");
		//////console.log(value);
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
				// //console.log("guonue");
				// //console.log(item);
				_result.push(item);
			}
		});


		this.setState({
			rbzsd: valuename,
			Knowpoints: this.state.Knowpoints,
			knowledgepoints2: _result,
		})

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
		var konwbool=null;
		for(let myda of knowledgepointmys) {
		   if(myda.name===value){
				 konwbool="yes"
		   	break;
			 }
		}
		if(konwbool!=null){
			this.props.showNotification(`重复的知识点`);
			this.setboolred(true);
			return
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

		this.setState({
			NewknTypedel:false
		})
	}


	render() {
		let {page, options,NewknTypedel,knowledgepoints,knowledgepoints2,Knowpoints} = this.state;
		const {getFieldDecorator} = this.props.form;

		// //console.log("this.state.rbkc");
		// //console.log(this.state.rbkc);
		// //console.log(options);


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
					.ant-input-group{
					  width:270px !important;
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
					<div className="sortinxdirection">
				<Form.Item
					label="课程"
				>
					{getFieldDecorator("rbkc",
						{initialValue: this.state.rbkc,
							rules: [{required: true, message: '请选择课程'}],
						}
					)(

								<Cascader style={{width: '270px'}} options={options} onChange={this.handleFormzhishidian}
													placeholder="请选择..."/>

					)}
				</Form.Item>
					</div>
					<Form.Item
						label="知识点"
					>
						{getFieldDecorator("rbzsd"
						)(
							<div className="sortinxdirection">
									<Select style={{width: '270px'}} value={undefined} onChange={this.handleFormkechen}
													placeholder="请选择...">
										{knowledgepoints2 && knowledgepoints2.map((object, index) => {
											return (
												<Option key={object.id} value={object.id}>{object.name}</Option>
											)
										})}
									</Select>



								<img className=" ml22 zjzsdian xiaoshou"  src={getImageUrl("images/educoder/zjzsd.png")} onClick={()=>this.NewknTypedeldel(true)}/>



							</div>
						)}
					</Form.Item>
					{
						this.state.Knowpoints===undefined||this.state.Knowpoints===null?"":
							this.state.Knowpoints.length>0?
								<div className="sortinxdirection huanhan w100s mt15" style={{
									minHeight: "33px",
									lineHeight: "28px",
								}}>
									{this.state.Knowpoints === undefined ? "" : this.state.Knowpoints.map((object, index) => {
										return (
											<div key={index} className={index===0?"mytags mb20":"mytags"} style={{
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




					<Form.Item
						label="题型"
					>
						{getFieldDecorator("rbtx",
							{initialValue: this.state.rbtx,
								rules: [{required: true, message: '请选择题型'}],
							}
						)(
								<Select style={{width: '270px'}} disabled={this.state.boolnews} onChange={this.handleFormtixing}
												placeholder="请选择...">
									<Option value="PROGRAM">编程题</Option>
									<Option value="SINGLE">单选题</Option>
									<Option value="MULTIPLE">多选题</Option>
									<Option value="JUDGMENT">判断题</Option>
								</Select>
						)}
					</Form.Item>

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
						<Form.Item label="难度">
							{getFieldDecorator('rbnd',
								{initialValue: this.state.rbnd,
									rules: [{required: true, message: '请选择难度'}],
								}
							)(
								<Radio.Group  onChange={this.handleFormLayoutChange}>
									<Radio.Button value="1">简单</Radio.Button>
									<Radio.Button value="2">适中</Radio.Button>
									<Radio.Button value="3">困难</Radio.Button>
								</Radio.Group>,
							)}
						</Form.Item>
					</div>
				</Form>
				<div className="h20"></div>
			</div>
		)

	}


}

const Itembankstops = Form.create({name: 'Itembankstops'})(Itembankstop);
export default Itembankstops;
