import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,Input} from "antd";
import axios from 'axios';

class ModalsRename extends Component{
	constructor(props){
		super(props);
		this.state={
			name:this.props.NavmodalValue
		}
	}

	saveNavmoda=()=>{
		let{url}=this.props;
		let{name}=this.state;

		axios.post(url,	{name:name}).then((result) => {
			if(result.data.status===0){
				this.props.showNotification(result.data.message);
				this.props.cannerNavmoda();
				this.props.coursupdata();
			}}
		)
	}

	setNavmodalValue=(e)=>{
		  console.log(e.target.value)
		 this.setState({
			 name:e.target.value
		 })
	}

	render(){
		return(
			<div>
				<Modal
					keyboard={false}
					title={this.props.Navmodalname}
					visible={this.props.Navmodalnametype===undefined?false:this.props.Navmodalnametype}
					closable={false}
					footer={null}
					destroyOnClose={true}
					centered={true}
					className={"Navmodal"}
				>
					<div className={"fl mt5"}>{this.props.Navname}名称：</div>
					<Input placeholder={"请输入名称，最大限制60个字符"}
					       className={"inputNav greyInput fl"}
					       maxLength="60"
					       style={{width:'450px'}}
					       value={this.state.name}
					       onInput={this.setNavmodalValue}
					/>
					<div className="clearfix mt70 edu-txt-center">
						<a  className="task-btn mr30" onClick={()=>this.props.cannerNavmoda()}>取消</a>
						<a className="task-btn task-btn-orange" onClick={()=>this.saveNavmoda()}>确定</a>
					</div>
				</Modal>
			</div>
		)
	}
}
export default ModalsRename;