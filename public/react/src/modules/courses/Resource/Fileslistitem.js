import React,{ Component } from "react";
import { WordsBtn } from 'educoder';
import {Tooltip,message} from 'antd';
import {Link} from 'react-router-dom';
import {getImageUrl} from 'educoder';
import axios from 'axios'
import {getUrl} from 'educoder';
import moment from 'moment'
import CoursesListType from '../coursesPublic/CoursesListType';
import Showoldfiles from "../coursesPublic/Showoldfiles";
import Modals from '../../modals/Modals';

class Fileslistitem extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	settingList=()=>{
		let {discussMessage}=this.props

		this.setState({
			discussMessageid:discussMessage.id
		})
		this.props.Settingtypes(discussMessage.id)
	}

	showfiles=(list)=>{
		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		// if(this.props.checkIfProfileCompleted()===false){
		// 	this.setState({
		// 		AccountProfiletype:true
		// 	})
		// 	return
		// }
		// if(this.props.checkIfProfessionalCertification()===false){
		// 	this.props.showProfileCompleteDialog()
		// 	return
		// }

		if(list.is_history_file===false){
			// this.props.DownloadFileA(list.title,list.url)
			//window.location.href=list.url;
			window.open(list.url, '_blank');
		}else{
			let {discussMessage,coursesId}=this.props
			let file_id=discussMessage.id
			let url="/files/"+file_id+"/histories.json"
			axios.get(url,{
				params:{
					course_id:coursesId
				},
			}).then((result)=>{

				if(result.data.attachment_histories.length===0){
					// if(result.data.is_pdf===true){
					// 	this.props.ShowOnlinePdf(result.data.url)
					// 	//预览pdf
					// }else{
					//
					// }
					// this.props.DownloadFileA(result.data.title,result.data.url)
					window.open(list.url, '_blank');
				}else{
					this.setState({
						Showoldfiles:true,
						allfiles:result.data
					})
				}


			}).catch((error)=>{
				console.log(error)
			})
		}

	}

	closaoldfilesprops=()=>{
		this.setState({
			Showoldfiles:false,
		})
	}

	onDelete = (id) => {

		this.setState({
			Modalstype:true,
			Modalstopval:"是否确认删除?",
			ModalCancel:this.cancelmodel,
			ModalSave:()=>this.savedelete(id),
		})

	}

	cancelmodel=()=>{

		this.setState({
			Modalstype:false,
			Loadtype:false,
			Modalstopval:"",
			ModalCancel:"",
			ModalSave:"",
			checkBoxValues:[],
		})

	}

	savedelete=(id)=>{

		this.setState({
			Modalstype:false,
		})


		const cid = this.props.match.params.coursesId
		const url = `/files/bulk_delete.json`;
		axios.delete(url, { data: {
					course_id:cid,
					ids: [id],
				}})
			.then((response) => {
				if (response.data.status == 0) {
					//Modalstopval:response.data.message,

					this.props.updatafiledfun()
					this.setState({
						// Modalstype:true,
						// Modalstopval:"删除成功",
						ModalsBottomval:"",
						// ModalSave:this.cancelmodel,
						// Loadtype:true,
						checkBoxValues:[],
						checkAllValue:false
					})

					this.props.showNotification("删除成功");
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	eventStop = (event) =>{
		event.stopPropagation()
	}

	render(){

		const { checkBox,
			discussMessage,index
		} = this.props;

		return(
			<div className="graduateTopicList boardsList">

				{/*提示*/}
				{this.state.Modalstype&&this.state.Modalstype===true?<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					modalsBottomval={this.state.ModalsBottomval}
					loadtype={this.state.Loadtype}
				/>:""}
				<Showoldfiles
					{...this.props}
					visible={this.state.Showoldfiles}
					allfiles={this.state.allfiles}
					closaoldfilesprops={this.closaoldfilesprops}
				/>
				<style>{`
            .graduateTopicList .ant-checkbox-input {
              margin-right: 15px;
            }
            .graduateTopicList .ant-checkbox-wrapper {
              margin-top: 0px;
            }
          `}</style>


				<style>{`
            .boardsList .panel-list-img {
              width: 50px;
              height: 50px;
            }
          `}</style>
				{/*<a href={"/users/"+this.props.user.login} alt="用户"*/}
				{/*style={{"width": "50px", "height": "50px", "display": "block", margin: "0 10px"}}>*/}
				{/*<img*/}
				{/*alt="1?1529221779" className="panel-list-img mr15" height="50"*/}
				{/*src={getImageUrl("images/"+discussMessage.author.image_url)} width="50"*/}
				{/*></img>*/}
				{/*</a>*/}

				<style>{`
            .boardsList .contentSection{
              margin-left:0px;
            }
            .maxwidth580{
                max-width: 580px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
            .mt2{
             margin-top:2px;
            }
          `}</style>
				<div className="clearfix ds pr contentSection" style={{cursor : this.props.isAdmin ? "pointer" : "default"}} onClick={() => window.$(`.sourceitem${index} input`).click() }>
					<h6 onClick={(event)=>this.eventStop(event)}>
		        	<span className={`sourceitem${index} fl mr12 mt3`}>
								{checkBox}
							</span>
						{
							this.props.isAdmin ? <a
								// href={"/courses/" + coursesId + "/graduation/graduation_tasks/" + categoryid + "/" + taskid + "/list"}
								onClick={()=>this.showfiles(discussMessage)}
								title={discussMessage.title}
								className="fl mt3 font-16 font-bd color-dark maxwidth580">{discussMessage.title}</a> : ""
						}
						{
							this.props.isStudent?  <a
								onClick={()=>this.showfiles(discussMessage)}
								title={discussMessage.title}
								className="fl mt3 font-16 font-bd color-dark maxwidth580">{discussMessage.title}</a> :""
						}

						{
							this.props.isNotMember===true?
								discussMessage.is_lock === true ?
									<span className="fl mt3 font-16 font-bd color-dark maxwidth580 pointer"  title={"私有属性，非课堂成员不能访问"}>{discussMessage.title}</span>
									:<a
										onClick={()=>this.showfiles(discussMessage)}
										title={discussMessage.title}
										className="fl mt3 font-16 font-bd color-dark maxwidth580">{discussMessage.title}</a>:""
						}


						{
							discussMessage.is_lock === true ?
								<Tooltip  title={"私有属性，非课堂成员不能访问"}  placement="bottom">
									<i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl mt4"></i>
								</Tooltip>
								:""
						}
						{discussMessage.is_publish===false?<CoursesListType typelist={["未发布"]} typesylename={""}/>:""}

						{this.props.isAdmin?
							<span className={"fr mt2"} onClick={(event)=>this.eventStop(event)}>
                      <WordsBtn style="blue" className="colorblue font-16 ml20 fr">
                          <a className="btn colorblue fontweight400"
														 onClick={()=>this.settingList()}>设置</a>
                        </WordsBtn>
                      </span>:""}

						{this.props.isStudent===true&&this.props.current_user.login===discussMessage.author.login?
							<span className={"fr mt2"} onClick={(event)=>this.eventStop(event)}>

                      <WordsBtn style="blue" className="colorblue font-16 ml20  fr">
                        <a className="btn colorblue fontweight400"
													 onClick={()=>this.settingList()}>设置</a>
                      </WordsBtn>

										  <WordsBtn style="blue" className="colorblue font-16 ml20 fr">
                        <a className="btn colorblue fontweight400"
													 onClick={()=>this.onDelete(discussMessage.id)}>删除</a>
                      </WordsBtn>

                      </span>:""}
					</h6>
					<style>
						{
							`
                    .sttingbox{
                        position: absolute;
                        right: 0px;
                        top: 20px;
                    }
                    `
						}
					</style>



					<style>
						{
							`
                       .lightgreybox{
                          min-width: 260px;
                       }
                       .mrf2{
                       margin-top: -2px;
                       }
                      `
						}
					</style>
					{/*资源分班*/}
					{/*{discussMessage.course_groups.length===0?"":*/}
					{/*<p className="color-grey panel-lightgrey mt8 fl lightgreybox ml30" style={{width:'100%'}}>*/}
					{/*{discussMessage.course_groups.map((item,key)=>{*/}
					{/*return(*/}
					{/*<div className="mr50">*/}
					{/*<span className="mr15 color-dark">{item.course_group_name}</span>*/}
					{/*<span className="mr15 color-grey9 ">将发布于 { moment(item.course_group_publish_time).format('YYYY-MM-DD HH:mm')}</span>*/}
					{/*</div>*/}
					{/*)*/}
					{/*})}*/}

					{/*</p>}*/}

					<p className={this.props.isAdmin===true?"color-grey panel-lightgrey mt8 fl ml30":"color-grey panel-lightgrey mt8 fl ml13"} style={{width:'100%'}}>
                      <span className="mr50">
                        <span className="mr15 color-dark">{discussMessage.author.name}</span>
                        <span className="mr15 color-grey9">大小 {discussMessage.filesize}</span>
                        <span className="mr15 color-grey9">下载 {discussMessage.downloads_count}</span>
												{/*<span className="mr15 color-grey9">引用 {discussMessage.quotes}</span>*/}
												<span className="mr15 color-grey-c">
                            {/*{moment(discussMessage.publish_time).format('YYYY-MM-DD HH:mm:ss')}*/}
													{/*{moment(discussMessage.publish_time).fromNow()}*/}
													{ discussMessage.publish_time===null?"":
														discussMessage.is_publish===true?"":"发布于"}
													{ discussMessage.publish_time===null?"":discussMessage.is_publish===true?moment(discussMessage.publish_time).fromNow():moment(discussMessage.publish_time).format('YYYY-MM-DD HH:mm')}
                        </span>
                      </span>
						{discussMessage&&discussMessage.category_name===null?"":this.props.child===false?<div className="color-grey9 task-hide fr mr30" title={discussMessage&&discussMessage.category_name}
																																																	style={{"max-width":"268px"}}>所属目录：{discussMessage&&discussMessage.category_name}
						</div>:""}
					</p>



					<p className={this.props.isAdmin===true?"color-grey panel-lightgrey mt8 fl ml30":"color-grey panel-lightgrey mt8 fl ml13"} style={{width:'94%'}}>
						<style>
							{
								`
													 .isspans{
													     text-align: left;
																white-space: pre-wrap;
																word-break: break-all;
																overflow-wrap: break-word;
													 }
													`
							}
						</style>
						<span className="color-dark isspans">资源描述 :{discussMessage.description===null?"暂无描述":discussMessage.description}</span>
						{/*<span className="mr50">*/}
						{/*/!*<span className="mr15 color-dark"></span>*!/*/}
						{/*<span  className="mr15 color-dark">*/}

						{/*</span>*/}
						{/*/!*{this.props.isAdmin ?<span><i className="iconfont icon-bianjidaibeijing font-22 color-green"  onClick={()=>this.settingList()}></i></span>:""}*!/*/}
						{/*</span>*/}
					</p>


				</div>
			</div>
		)
	}
}
export default Fileslistitem;
