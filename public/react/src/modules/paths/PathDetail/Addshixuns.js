import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import {Modal,Input,Form,Radio} from 'antd';
class Addshixuns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shixunname:undefined,
			shixunzero:false,
			is_jupyter:"1"
		}
	}

	handleChange=(e)=>{
		this.setState({
			shixunname:e.target.value,
		})

		if(e.target.value.length>0){
			 this.setState({
				 shixunzero:false
			 })
		}
	}


	modalCancel=()=>{
		this.setState({
			shixunname:undefined,
		})
		this.props.modalCancel()
	}

	//判断是否为空
	getshixunname( str ){
		if ( str == "" ) return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}

	modalSave=()=>{
		let {shixunname}=this.state;
    if(this.getshixunname(shixunname)===true){
			this.setState({
				shixunzero:true
			})
			return
		}
		if(shixunname===undefined||shixunname.length===0){
			this.setState({
				shixunzero:true
			})
			return
		}

		let is_jupyter=this.state.is_jupyter==="1"?false:true
		this.props.Setaddshixuns(shixunname,is_jupyter);
		this.props.modalCancel();
	}
	GrouponChange = e => {
		this.setState({
			is_jupyter: e.target.value,
		});
	};

	render() {
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
		};
		console.log(this.props)
		return(
			<Modal
				className={this.props.className}
				keyboard={false}
				title="新建实训项目"
				visible={this.props.Addshixunstype===undefined?false:this.props.Addshixunstype}
				closable={false}
				footer={null}
				destroyOnClose={true}
				centered={true}
				width="530px"
			>
				{this.props.Addshixunstype===true?<style>
					{
						`
						 	body{
						 	     overflow: hidden !important;
						 	 }
						 	`
					}
				</style>:""}

					<div className="task-popup-content">
						<Form {...formItemLayout}>
							<Form.Item label="实训类型">
									<Radio.Group value={this.state.is_jupyter} onChange={this.GrouponChange}>
										<Radio value="1">普通实训</Radio>
										<Radio value="2">jupyter实训</Radio>
									</Radio.Group>
							</Form.Item>
						</Form>
						<p className="task-popup-text-center font-16">
								<span style={{ "line-height":"30px"}}>实训名称：</span>
									<span><Input style={{ width:"80%"}} className="yslzxueshisy " placeholder="请输入60字以内的实训名称" onChange={this.handleChange}  addonAfter={String(this.state.shixunname===undefined?0:this.state.shixunname.length)+"/60"}  maxLength={60} />
								</span>
						</p>
						{this.state.shixunzero===true?<p className={"color-red ml85"}>请输入实训名称</p>:""}
						<div className="clearfix mt30 edu-txt-center">
							<a  className="task-btn mr30 colorFFF" onClick={this.modalCancel}>取消</a>
							<a className="task-btn task-btn-orange" onClick={this.modalSave}>确定</a>
						</div>

					</div>

			</Modal>
		)
	}
}

export default Addshixuns;
