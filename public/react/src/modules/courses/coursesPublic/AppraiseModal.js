import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,Input,Radio} from "antd";
import { WordNumberTextarea } from 'educoder';
import axios from 'axios';

class AppraiseModal extends Component{
	constructor(props){
		super(props);
		this.state={
			group_ids:[],
			fileList:[],
			Inputsval:undefined,
			textareavaltype:false,
			comment:undefined,
			hidden_comment:undefined
		}
	}

	componentDidMount() {
		let{data,work_comment,work_comment_hidden}=this.props;

		if(this.props.showAppraisetype==="child"){
				data.stage_list.map((item,key)=>{
					if(this.props.challenge_id===item.challenge_id){
						this.setState({
							comment:item.challenge_comment,
							hidden_comment:item.challenge_comment_hidden,
						})
					}
				})
		}else{
			this.setState({
				comment:work_comment,
				hidden_comment:work_comment_hidden,
			})
		}

	}

	comment=(e)=>{
		this.setState({
			comment:e.target.value
		})
	}

	hidden_comment=(e)=>{
		this.setState({
			hidden_comment:e.target.value
		})
	}
	Saves=()=>{
		let{comment,hidden_comment}=this.state;
    let commenttype=comment===undefined||comment===null||comment==="";
		let hidden_commenttype=hidden_comment===undefined||hidden_comment===null||hidden_comment==="";

		if(commenttype===true&&hidden_commenttype===true){
			this.setState({
				textareavaltype:true
			})
			return
		}

		//comment	是	text	可见的评阅内容
		// hidden_comment	是	text	不可见的评阅内容
		// challenge_id	否	int	关卡id（关卡评阅才需传关卡id）
   let challenge_id=this.props.showAppraisetype==="child"?this.props.challenge_id:undefined

		let url=`/student_works/${this.props.match.params.homeworkid}/shixun_work_comment.json`
		axios.post(url, {
			comment:comment,
			hidden_comment:hidden_comment,
			challenge_id:challenge_id
		}).then((response) => {
     if(response.data.status===0){
			 this.props.showCancel(comment,hidden_comment,challenge_id,response.data.comment_id)
			 this.props.showNotification(response.data.message)
		 }else{
			 this.props.showNotification(response.data.message)
		 }
		}).catch((error) => {
			console.log(error)
		});
	}

	render(){
		let {textareavaltype,comment,hidden_comment}=this.state;
		return(
			<div>

				<style>
					{
						`
								@media (max-width: 2000px) {
											.WordNumberTextarea{
											  height: 130px !important;
											}
									}

								 @media (max-width: 1350px) {
										.HomeworkModal{
 										  top:10px !important;
 										}
 											.WordNumberTextarea{
											  height: 80px !important;
											}
									}

	 								@media (max-width: 1250px) {
 										.HomeworkModal{
 										  top:0px !important;
 										}

 										.WordNumberTextarea{
											  height: 40px !important;
									  }
									}

									`
					}
				</style>
				<Modal
					keyboard={false}
					className={"HomeworkModal"}
					title={this.props.work_comment===null||this.props.work_comment===undefined?"评阅":"编辑评阅"}
					visible={this.props.visible}
					closable={false}
					footer={null}
					destroyOnClose={true}
				>

					<div className={"pd015"}>
						<style>
							{
								`
								.pd015{
								    padding: 0px 15px 15px 15px;
								}
								.font{
									font-size: 14px;
									font-weight: 400;
									color: rgba(5,16,26,1);
								}
								.newfont{
								    height: 16px;
										font-size: 16px;
										font-weight: 400;
										color: rgba(5,16,26,1);
										line-height: 16px;
										margin-bottom: 5px;
								}
								`
							}
						</style>
						<div className="clearfix">
							<p className={"font mt10 mb10 ml10"}>
								可见(学生可查看老师的评阅内容）
							</p>
							{/*<Radio.Group onChange={this.onChanges} value={this.state.valuetype}>*/}
								{/*<Radio value={0} style={radioStyle} className={"newfont"}>可见  (学生查看老师的评阅内容）</Radio>*/}
								{/*<Radio value={1} style={radioStyle} className={"newfont"}>不可见  (仅对课堂老师可见）</Radio>*/}
							{/*</Radio.Group>*/}
							<WordNumberTextarea
								placeholder={"请填写评阅内容"}
								onInput={(e)=>this.comment(e)}
								value={comment}
								maxlength={500}
							/>

							<p className={"font mt10 mb10 ml10"}>
								不可见(仅对课堂老师可见）
							</p>
							<WordNumberTextarea
								placeholder={"请填写评阅内容"}
								onInput={(e)=>this.hidden_comment(e)}
								value={hidden_comment}
								maxlength={500}
							/>

							<li style={{height:"20px",lineHeight:"20px"}} className={textareavaltype===true?"color-red mt20 mb10":"none"}><span>评阅内容至少有一个不为空</span></li>
						</div>

						<div className={textareavaltype===false?"mt20 clearfix edu-txt-center":"clearfix edu-txt-center"}>
							<a  className="task-btn color-white mr30" onClick={()=>this.props.Cancel()}>{this.props.Cancelname || '取消'}</a>
							<a className="task-btn task-btn-orange" onClick={this.Saves}>{this.props.Savesname || '确定'}</a>
						</div>
					</div>
				</Modal>
			</div>
		)
	}
}
export default AppraiseModal;