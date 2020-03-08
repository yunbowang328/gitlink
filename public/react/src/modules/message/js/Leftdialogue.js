import React, { Component } from 'react';
import {
	Spin,
	Pagination,
} from "antd";
import axios from 'axios';
import moment from 'moment';
import {getImageUrl,markdownToHTML,ImageLayer2} from 'educoder';
import "../css/messagemy.css"
import WriteaprivateletterModal from '../messagemodal/WriteaprivateletterModal';
//私信页面
class Leftdialogue extends Component{
	constructor(props) {
		super(props);
		this.state={
		};

	}

	componentDidMount(){
		console.log("Leftdialogue");
		console.log(this.props);
	};
	componentDidUpdate(prevProps) {
		// console.log("11111111111");
		// console.log(prevProps);
		// console.log("22222222222");
		// console.log(this.props);
		// console.log("33333333333");
		// if(prevProps.current_user !== this.props.current_user){
		// 	this.getdata(1);
		// }
	}
	mydelete=(user_id,id)=>{
		this.props.DELETEsetreplyfun(user_id,id);
	}
	myCome=(e)=>{
		window.location.href="/users/"+e.login;
	}

	render() {

		return (
			<div className="OtherSide clearfix" id="message_content_25148">
			<a  onMouseDown={()=>this.myCome(this.props.objeysl.sender)}>
				{
					this.props.objeysl&&this.props.objeysl.sender.image_url ?
						<img alt="头像" className="mr10 radius fl  myimgw48 myimgh48"
								 src={getImageUrl("images/" + this.props.objeysl.sender.image_url)} />:""
				}
			</a>
			<div className="fl pr OtherSide-info">
				<span className="trangle"></span>
				<ImageLayer2 parentSel={`#Leftdialogue${this.props.keys}`} parentSel={`#Leftdialogue${this.props.keys}`}>
				</ImageLayer2>
				<div className="sms break_word markdown-body" id={`Leftdialogue${this.props.keys}`} dangerouslySetInnerHTML={{__html: markdownToHTML(this.props.objeysl.content).replace(/▁/g, "▁▁▁")}}></div>
				<div className="edu-txt-right mt5">
					<a  className="color-grey-c" onClick={()=>this.mydelete(this.props.objeysl.sender.id,this.props.objeysl.id)} >删除</a>
				</div>
			</div>
			<span className="fl ml15 color-grey-c lineh-15 mt15">{moment(this.props.objeysl.send_time).hour()}:{moment(this.props.objeysl.send_time).minute()<10?"0"+moment(this.props.objeysl.send_time).minute():moment(this.props.objeysl.send_time).minute()}</span>
		</div>
		)
	}
}
export default Leftdialogue;
// onClick="delete_confirm_box('/users/innov/delete_message?mess_id=25148', '确定要删除该条记录吗？')"