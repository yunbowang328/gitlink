import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Icon ,Button} from 'antd';

class PackageIndexNEISubmit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current:0
		}
	}
	componentDidMount() {
		window.document.title = '众包创新'
	}
	setageload=(sum)=>{
		if(sum===undefined){
			window.location.href="/crowdsourcing/new"
		}else{
			// this.props.history.push("/project_packages/"+sum)
			window.location.href="/crowdsourcing/"+sum
		}

	}
	render() {

		return (
			<div className="mb20">

				<p className="clearfix ">
					<div className={"stud-class-set padding200 coursenavbox edu-back-white"}>
					    <div className={"mb20"}><Icon type="check-circle" theme="filled" className={"fontcircle color-green"}/></div>
							<div className={"sumbtongs mb10"}>恭喜!</div>
							<div className={"sumbtongs mb10"}>提交成功</div>
							<div className={"terraces mb5"}>平台正在审核您的申请，审核结果将以平台消息的形式通知您</div>
							<div className="clearfix mt30 mb30 padding251">
								<a className="defalutCancelbtns fl" onClick={()=>this.setageload(this.props.id)}>查看发布需求</ a>
								<Button type="primary" className="defalutSubmitbtn fl ml40 defalutSubmitbtns" onClick={()=>this.setageload()}>继续发布</Button>
							</div>
					</div>
				</p>


			</div>
		)
	}
}

export default PackageIndexNEISubmit;

