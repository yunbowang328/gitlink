import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,Input,Radio} from "antd";
import { WordNumberTextarea,markdownToHTML } from 'educoder';
import axios from 'axios';
import './style.css';

class ShowAppraiseList extends Component{
	constructor(props){
		super(props);
		this.state={

		}
	}



	render(){
		let {data, work_comment,work_comment_hidden}=this.props;
		let work_commenttype=work_comment===undefined||work_comment===null||work_comment==="";
		let work_comment_hiddentype=work_comment_hidden===undefined||work_comment_hidden===null||work_comment_hidden==="";

		return(
			<div>
				<style>
					{
						`
							.appraisebox{
										width: 65px;
									height: 22px;
									background: rgba(76,172,255,1);
									border-radius: 2px;
									display: inline-block;
									margin-right: 20px;
									color: #fff;
									font-size: 14px;
									text-align: center;
									line-height: 22px;
							}

							.markdown-body{
    							padding-bottom: 10px;
							}
							.borderbom{
							    margin-bottom: 15px;
       						border-bottom: 2px solid #fafafa;
							}

						`
					}
				</style>
				{data===undefined?"":work_commenttype===true&&work_comment_hiddentype===true?"":
					<div className="stud-class-set mt17">
						<div className="clearfix edu-back-white poll_list">

							<div className="font-16 color-dark-21 shixunreporttitleboxtop pd20 color333">
								<span className={"appraisebox"}>总体评阅</span>评阅内容

								{this.props&&this.props.isAdmin()===true?<a className="color-blue font-14 fr ml20"
																																		 onClick={()=>this.props.isdeleteModal(data.comment_id,true,"main")}
								>删除</a>:""}

								{this.props&&this.props.isAdmin()===true?<a className="color-blue font-14 fr"
																																		 onClick={()=>this.props.showAppraiseModal("main",undefined,work_comment,work_comment_hidden)}
								>编辑</a>:""}

							</div>

							{this.props&&this.props.isAdmin()===true?
								<div className="font-16 color-dark-21 shixunreporttitleboxbom pd30bt">

									{work_commenttype===true?"":<div>
										<span className={"z000"}>学生可见<span className={"z666"}>（学生可查看老师的评阅内容）</span></span>
									</div>}

									{work_commenttype===true?"":<div className={work_comment_hiddentype===true?"":"borderbom"} style={{minHeight:'40px'}}>
										<div className={"personalsummary"}>
											<div className={"markdown-body"}
													 dangerouslySetInnerHTML={{__html: markdownToHTML(work_comment).replace(/▁/g, "▁▁▁")}}></div>
										</div>
									</div>}

									{work_comment_hiddentype===true?"":<div>
									<span className={"z000"}>学生不可见<span className={"z666"}>（仅对课堂老师可见）</span></span>
							  	</div>}

									{work_comment_hiddentype===true?"":<div  style={{minHeight:'40px'}}>
									<div className={"personalsummary"}>
										<div className={"markdown-body"}
												 dangerouslySetInnerHTML={{__html: markdownToHTML(work_comment_hidden).replace(/▁/g, "▁▁▁")}}></div>
									</div>
								</div>}


							</div>:<div className="font-16 color-dark-21 shixunreporttitleboxbom pd30">
								<div style={{minHeight:'40px'}}>
									<div className={"personalsummary"}>
										<div className={"markdown-body"}
												 dangerouslySetInnerHTML={{__html: markdownToHTML(work_comment).replace(/▁/g, "▁▁▁")}}></div>
									</div>
								</div>
							</div>}

						</div>
					</div>}





				{data===undefined?"":data.stage_list===undefined||data.stage_list===null?"":data.stage_list.map((item,key)=>{
					let challenge_comment_hidden=item.challenge_comment_hidden===undefined||item.challenge_comment_hidden===null||item.challenge_comment_hidden==="";
					let challenge_comment=item.challenge_comment===undefined||item.challenge_comment===null||item.challenge_comment==="";

					return(
						<div key={key}>
							{challenge_comment===false||challenge_comment_hidden==false?<div className="stud-class-set mt17" >
							<div className="clearfix edu-back-white poll_list">

								<div className="font-16 color-dark-21 shixunreporttitleboxtop pd20 color333">
									<span className={"appraisebox"}>第{key+1}关</span>{item.name}
									{this.props&&this.props.isAdmin()===true?<a className="color-blue font-14 fr ml20"
																																			 onClick={()=>this.props.isdeleteModal(item.comment_id,true,"child")}
									>删除</a>:""}

									{this.props&&this.props.isAdmin()===true?<a className="color-blue font-14 fr"
																																			 onClick={()=>this.props.showAppraiseModal("child",item.challenge_id,item.challenge_comment,item.challenge_comment_hidden)}
									>编辑</a>:""}
								</div>

								{this.props&&this.props.isAdmin()===true?
									<div className="font-16 color-dark-21 shixunreporttitleboxbom pd30bt">

										{challenge_comment===true?"":<div>
											<span className={"z000"}>学生可见<span className={"z666"}>（学生可查看老师的评阅内容）</span></span>
										</div>}

										{challenge_comment===true?"":<div className={challenge_comment_hidden===true?"":"borderbom"} style={{minHeight:'40px'}}>
											<div className={"personalsummary"}>
												<div className={"markdown-body"}
														 dangerouslySetInnerHTML={{__html: markdownToHTML(item.challenge_comment).replace(/▁/g, "▁▁▁")}}></div>
											</div>
										</div>}

										{challenge_comment_hidden===true?"":<div>
											<span className={"z000"}>学生不可见<span className={"z666"}>（仅对课堂老师可见）</span></span>
										</div>}
										{challenge_comment_hidden===true?"":<div style={{minHeight:'40px'}}>
											<div className={"personalsummary"}>
												<div className={"markdown-body"}
														 dangerouslySetInnerHTML={{__html: markdownToHTML(item.challenge_comment_hidden).replace(/▁/g, "▁▁▁")}}></div>
											</div>
										</div>}

									</div>:	<div className="font-16 color-dark-21 shixunreporttitleboxbom pd30">
										<div style={{minHeight:'40px'}}>
											<div className={"personalsummary"}>
												<div className={"markdown-body"}
														 dangerouslySetInnerHTML={{__html: markdownToHTML(item.challenge_comment).replace(/▁/g, "▁▁▁")}}></div>
											</div>
										</div>
									</div>}

							</div>
						</div>:""}

						</div>)
				})
				}


			</div>
		)
	}
}
export default ShowAppraiseList;

