import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal} from 'antd';
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
const InputGroup = Input.Group;
const {Option} = Select;
//智能组卷化弹框
class IntelligentModel extends Component {

	constructor(props) {
		super(props);
		this.state={
			iconLoading:false,
		}
	}

	handleSubmit=()=>{

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

	Confirmationofvolumeformation=()=>{

		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					iconLoading:true
				})
				const url=`/examination_intelligent_settings/${this.props.exam_id}/save_exam.json`;
				let data={
					name:values.classroom,
					duration:values.kssc
				}
				axios.post(url, data)
					.then((result) => {
						if (result.data.status == 0) {
							//console.log(result);
							this.props.history.push(`/paperlibrary`);

						}
						setTimeout(() => {
							this.setState({
								iconLoading:false
							})
						}, 1500)

					}).catch((error) => {
					setTimeout(() => {
						this.setState({
							iconLoading:false
						})
					}, 1500)
					})



			}

		});

	}


	render() {
		let {iconLoading}=this.state;
		const {getFieldDecorator} = this.props.form;
		const optionss = this.state.searchlist && this.state.searchlist.map(d => <Option key={d.name} value={d.name}>{d.name}</Option>);
		var addonAfterthree=this.props.form&&this.props.form.getFieldValue('classroom');
		var addonAfteronelens3=0;
		if(addonAfterthree){
			addonAfteronelens3=String(addonAfterthree).length;
		}

		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title=""
				centered={true}
				visible={this.props.Intelligentformation===undefined?false:this.props.Intelligentformation}
				width="560px"
			>
					<div className=" mt10">
						<Form onSubmit={this.handleSubmit}>
							<style>
								{
									`
										.ml19{
											margin-left:19px;
											}
										`
								}
							</style>
							<div className="stud-class-set    ">
								<style>{
									`
										.yslzxueshis .ant-input{
										border-right: none !important;
										height: 38px !important;
										width: 100% !important;
										}
										 .yslzxueshisy span .ant-input-group-addon{
											width: 65px !important;
											background-color: #fafafa!important;
										 }
										.yslzxueshisy .ant-input-group-addon{
											width: 65px !important;
											background-color: #fafafa!important;
										 }
										 
										.sjmc .ant-form-item{
										   display: flex;
                       flex-direction:row;
										}
										
										 .sjmc  .ant-form-item-control-wrapper{
										  width:80%;
										 }

										`
								}</style>
								<div className="sjmc">
									<Form.Item label="试卷名称:">
										{getFieldDecorator('classroom', {
											rules:  [{required: true, message: "不能为空"}],
										})(

											<AutoComplete
												onSearch={this.handleSearch}
												className={"fl construction yslzxueshis "}
												dataSource={optionss}
											>
												<Input className="yslzxueshisy " placeholder="请输入名称，最大限制60个字符" onInput={this.handleChange}  addonAfter={String(addonAfteronelens3)+"/60"}  maxLength={60} />
											</AutoComplete>
										)}
										<div id='isclassroom'></div>
									</Form.Item>
								</div>

							</div>
							<style>
								{
									`
							.kssc .ant-form-item-label{
							    line-height: 38px !important;
							}
							
							.kssc .ant-form-item{
										   display: flex;
                       flex-direction:row;
										}
							 .kssc .ant-form-item-label{
							        margin-left: 10px;
							    }
							`
								}
							</style>
							<div className="kssc">

								<Form.Item label="考试时长:">
									{getFieldDecorator('kssc')(<InputNumber
										min={0}
										step={0.1}
									></InputNumber>)}
									<span className="ant-form-text"> 分钟</span>
								</Form.Item>
							</div>


						</Form>
						<div className="sortinxdirection">提示：组卷完成后，在试卷库—<a className="tishiyuyans xiaoshou" href={"/paperlibrary"}>我的试卷库</a>查看！</div>

					</div>

					<div className="clearfix mt30 edu-txt-center">
						<a className="task-btn mr30 h34 w100 lh34" onClick={()=>this.props.Confirmationofvolumeformations()}>取消</a>
						<Button
							className="task-btn task-btn-orange h34 w100 lh34"
							type="primary"
							loading={this.state.iconLoading}
							onClick={()=>this.Confirmationofvolumeformation()}
						>
							确定
						</Button>

					</div>
			</Modal>
		)
	}
}

const IntelligentModels = Form.create({name: 'IntelligentModel'})(IntelligentModel);
export default IntelligentModels;
