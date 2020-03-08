import React, {Component} from "react";
import {WordsBtn,markdownToHTML,getRandomcode,queryString,downloadFile,getImageUrl} from 'educoder';
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider,InputNumber, Tag,DatePicker,Radio,Tooltip,Spin} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Modals from "../../modals/Modals";
import ConclusionEvaluation from './shixunreport/ConclusionEvaluation';
import OfficialAcademicTranscript from './shixunreport/OfficialAcademicTranscript';
import Coursesshixundetails from './shixunreport/Coursesshixundetails';
import Shixunechart from './shixunreport/Shixunechart';
import DownloadMessageysl from "../../modals/DownloadMessageysl"
import AppraiseModal from "../coursesPublic/AppraiseModal";
import ShowAppraiseList from './ShowAppraiseList';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/cmake/cmake';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import '../css/members.css';
import "../common/formCommon.css";
import '../css/Courses.css';
import './style.css';
import 'moment/locale/zh-cn';


class ShixunWorkReport extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:undefined,
			spinning:true,
			DownloadType:false,
			DownloadMessageval:undefined,
			isspinning:false,
			showAppraiseModaltype:false,
			work_comment_hidden:undefined,
			work_comment:undefined,
			has_commit: false,
		}

	}

	/// 确认是否下载
	confirmysl(url,child){
		this.setState({ isspinning: true })
		let params ={}
		if(child!=undefined){
			params =child._getRequestParams()!==undefined?child._getRequestParams():{};
		}

		const urll=url+`?${queryString.stringify(params)}`;
		axios.get(urll+ '&export=true').then((response) => {
			if(response===undefined){
				return
			}
			if(response.data.status&&response.data.status===-1){

			}else if(response.data.status&&response.data.status===-2){
				if(response.data.message === "100"){
					// 已超出文件导出的上限数量（100 ），建议：

					this.setState({
						DownloadType:true,
						DownloadMessageval:100
					})
				}else {
					//因附件资料超过500M
					this.setState({
						DownloadType:true,
						DownloadMessageval:500
					})
				}
			}else {
				// this.props.slowDownload(url)
				//
				// this.props.showNotification(`正在下载中`);
				window.open(getRandomcode("/api"+url+"?disposition=inline"), '_blank');
				this.setState({ isspinning: false })
			}
		}).catch((error) => {
			console.log(error)
			this.setState({ isspinning: false })
		});
	}
	Downloadcal=()=>{
		this.setState({
			DownloadType:false,
			DownloadMessageval:undefined
		})
	}

	componentDidMount() {
		let query = this.props.location.pathname;
		const type = query.split('/');
		this.setState({
			shixuntypes:type[3],
			spinning:true
		})
		this.getdatalist()
	}

	getdatalist=()=>{
		let homeworkid=this.props.match.params.homeworkid;
		let url = `/student_works/${homeworkid}/shixun_work_report.json`
		axios.get(url).then((result) => {
			if (result.data.status === 403 || result.data.status === 401 || result.data.status === 407 || result.data.status === 408|| result.data.status === 409 || result.data.status === 500) {

			}else{
				this.setState({
					data:result.data,
					work_comment_hidden:result.data.work_comment_hidden,
					work_comment:result.data.work_comment,
					spinning: false,
					has_commit: result.data.has_commit
				})
			}

		}).catch((error) => {
			console.log(error)
			this.setState({
				spinning:false
			})
		})

	}
	jumptopic=(anchorName)=>{
;		if (anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if(anchorElement) {
				anchorElement.scrollIntoView();
			}
		}
	}
	gotohome=()=>{
		let courseId=this.props.match.params.coursesId;
		if(courseId===undefined){
			this.props.history.push("/courses");
		}else{
			this.props.history.push(this.props.current_user.first_category_url);
		}
	}

	goback = () => {
		this.props.history.replace(`/courses/${this.props.match.params.coursesId}/shixun_homeworks/${this.state.data.homework_common_id}/list?tab=0`);
	}

	setupdalist=(challenge_score,overall_appraisal,work_score)=>{
   let {data}=this.state;
   let newdata=data;
		newdata.challenge_score=challenge_score;
		newdata.overall_appraisal=overall_appraisal;
		newdata.work_score=work_score;
		this.setState({
			data:newdata
		})
	}

	showAppraiseModal=(type,id,show,hidden)=>{
    let{data}=this.state;

		if(type==="child"){
		 data.stage_list.forEach((item,key)=>{
				if(item.challenge_id===id){
					item.challenge_comment=show;
				  item.challenge_comment_hidden=hidden;
				}
			})
			this.setState({
				showAppraiseModaltype:true,
				showAppraisetype:type,
				challenge_id:id,
				data:data
			})
		}else{
			this.setState({
				showAppraiseModaltype:true,
				showAppraisetype:type,
				challenge_id:undefined,
				work_comment:show,
				work_comment_hidden:hidden
			})
		}

	}

	hideAppraiseModal=()=>{
		this.setState({
			showAppraiseModaltype:false,
		})
	}
	showAppraiseModals=(show,hidden,id,comment_id)=>{

		let{data,showAppraisetype}=this.state;

		if(showAppraisetype==="child"){
			data.stage_list.forEach((item,key)=>{
				if(item.challenge_id===id){
					item.challenge_comment=show;
					item.challenge_comment_hidden=hidden;
					item.comment_id=comment_id
				}
			})
			this.setState({
				showAppraiseModaltype:false,
				data:data
			})
		}else{
			data.comment_id=comment_id;
			this.setState({
				showAppraiseModaltype:false,
				work_comment:show,
				work_comment_hidden:hidden,
				data:data
			})
		}

	}
	isdeleteModal=(comment_id,visible_comment,type)=>{
		let newcomment_id=comment_id;
		let newvisible_comment=visible_comment;
		let newtype=type;
		this.setState({
			modalsType: true,
			modalsTopval:"是否确认删除？",
			modalSave: ()=>this.isdeleteModals(newcomment_id,newvisible_comment,newtype),
			modalCancel:()=>this.hideisdeleteModals(),
		})
	}

	hideisdeleteModals=()=>{
		this.setState({
			modalsType:false,
			modalsTopval:"是否确认删除？",
			modalSave: "",
			modalCancel:"",
		})
	}


	hideisdeleteModal=(comment_id,visible_comment,type)=>{


		let{data,work_comment,work_comment_hidden}=this.state;

		if(type==="child"){
			data.stage_list.map((item,key)=>{
				console.log(item)
				if(item.comment_id!=null){
					if(item.comment_id===comment_id){
						item.challenge_comment=null;
						item.challenge_comment_hidden=null;
					}
				}
			})

			this.setState({
				modalsType:false,
				modalsTopval:"是否确认删除？",
				modalSave: "",
				modalCancel:"",
				data:data
			})

		}else{

				this.setState({
					modalsType:false,
					modalsTopval:"是否确认删除？",
					modalSave: "",
					modalCancel:"",
					work_comment:null,
					work_comment_hidden:null
				})


		}

	}

	isdeleteModals=(comment_id,visible_comment,type)=>{
     let newcomment_id=comment_id;
     let newvisible_comment=visible_comment;
     let newtype=type;
			if(comment_id!=null){
				let url =`/student_works/${this.props.match.params.homeworkid}/destroy_work_comment.json`
				axios.delete(url, { data: {
						comment_id:comment_id,
					}}).then((response) => {
						// const { status } = response.data;
						if(response.data.status===0){
							this.props.showNotification(response.data.message)
							this.hideisdeleteModal(newcomment_id,newvisible_comment,newtype)
						}else{
							this.props.showNotification(response.data.message)
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			}

	}
	render() {
		let {data, showAppraiseModaltype, work_comment_hidden, work_comment, has_commit} = this.state;

		let category_id=data===undefined?"":data.category===null?"":data.category.category_id;
		let homework_common_id=data===undefined?"":data.homework_common_id;
		let homeworkid=this.props.match.params.homeworkid;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

		// let showAppraiseModals=this.props&&this.props.isAdminOrTeacher()===true?work_comment===null||work_comment===undefined?false:true:work_comment===null||work_comment===undefined?false:true;
		let showAppraiseModals=work_comment===null||work_comment===undefined?false:true;
		document.title=data&&data.course_name;

		return (

				data===undefined?"":<Spin indicator={antIcon} spinning={this.state.spinning}>
					<Modals
						modalsType={this.state.modalsType}
						modalsTopval={this.state.modalsTopval}
						loadtype={this.state.loadtype}
						modalSave={this.state.modalSave}
						modalCancel={this.state.modalCancel}
					></Modals>



				{showAppraiseModaltype===true?<AppraiseModal
					{...this.props}
					{...this.state}
					visible={showAppraiseModaltype}
					Cancel={()=>this.hideAppraiseModal()}
					showCancel={(show,hidden,id,comment_id)=>this.showAppraiseModals(show,hidden,id,comment_id)}
					work_comment={this.state.work_comment}
					work_type={work_comment===null||work_comment===undefined?this.state.work_type:work_comment_hidden===true?1:0}
				 />:""}


			<div className="newMain clearfix ">
				<div className={"educontent mb20" }>
					<div className="educontent">
						<DownloadMessageysl
							{...this.props}
							value={this.state.DownloadMessageval}
							modalCancel={this.Downloadcal}
							modalsType={this.state.DownloadType}
						/>
						<p className="clearfix mt20">
							<a className="btn colorgrey fl hovercolorblue " onClick={()=>this.gotohome()}>
									<span className={"color-grey-9"}>	{data&&data.course_name}</span>
							</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<a className="btn colorgrey fl hovercolorblue " href={"/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+category_id}>
									<span className={"color-grey-9"}>{data===undefined?"":data.category===null?"":data.category.category_name}</span>
							</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<a href={"/courses/"+this.props.match.params.coursesId+"/"+this.state.shixuntypes+"/"+homework_common_id+"/list?tab=0"} className="fl color-grey-9">作业详情</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<WordsBtn className="fl">{data&&data.username}</WordsBtn>
						</p>
					</div>
					<div style={{ width:'100%',height:'75px'}} >
						<p className=" fl color-black mt25 summaryname">{data&&data.shixun_name}</p>
						{/*{this.props.isAdmin()?<a className=" fr font-14 ml30 mt10 mr20 color-grey-9 ">导出实训报告数据</a>:""}*/}
						<a onClick={this.goback} className="color-grey-6 fr font-14 ml20 mt15">返回</a>
						{this.props.isAdmin() ?<a
							className=" color-blue font-14 fr  ml20 mt15"
							onClick={()=>this.confirmysl(`/student_works/${homeworkid}/export_shixun_work_report.pdf`)}
						> <Spin size="small" spinning={this.state.isspinning}>导出实训报告</Spin></a>:
							parseInt(this.props&&this.props.user.user_id)===parseInt(data&&data.user_id)?<a
								className=" color-blue font-14 fr  ml20 mt15"
								onClick={()=>this.confirmysl(`/student_works/${homeworkid}/export_shixun_work_report.pdf`)}
							> <Spin size="small" spinning={this.state.isspinning}>导出实训报告</Spin></a>:""
						}
						{/*{this.props.isAdmin() ?work_comment_hidden===true? "":<a*/}
							{/*className=" color-blue font-14 fr  ml20 mt15"*/}
							{/*onClick={()=>this.showAppraiseModal(1)}*/}
						{/*>评阅</a> : ""}*/}
						{this.props.isAdmin() ?<a
							className=" color-blue font-14 fr  ml20 mt15"
							onClick={()=>this.showAppraiseModal("main",undefined,work_comment,work_comment_hidden)}
						>评阅</a>:""}
					</div>


					{/*{work_comment===null||work_comment===undefined?"评阅":"编辑评阅"}*/}
					<style>{
						`
						.shixunreporttitleboxtop {
								border-bottom: 2px solid #fafafa;
								text-align: justify;
								height: 62px;
    						line-height: 24px;
    						padding-left: 28px;
					  	}
				    .shixunreporttitleboxbom {
								text-align: justify;
    						line-height: 24px;
					  	}
					  	.ml39{
   							margin-left: 39px;
					  	}

					  	.back_font{
					  	    height: 18px;
									font-size: 18px;
									font-weight: 400;
									color: rgba(51,51,51,1);
									line-height: 18px;
									margin-bottom: 19px;
					  	}
					  	.passfont{
					  	    // display: inline-block;
    							margin-right: 72px;

					  	}
					  	.passfontmid{
					  	    // display: inline-block;
    							margin-right: 36px;

					  	}
					  	.passfontbom{
  	    					// display: inline-block;
    							margin-right: 58px;

					  	}
					  	.passfontbommid{
  	   						// display: inline-block;
    							margin-right: 93px;

					  	}
					  	.color999{
					  	   color: #999999;
					  	}
					  	.colorCF3B3B{
					  	   color:#CF3B3B;
					  	}
					  	.color333{
					  	  color:#333333;
					  	}
					  	.mt19{
					  	  margin-top:19px;
					  	}
					  	.passbox{
						   display: inline-block;
						   height: 50px;
					  	}
						`
					}</style>
					<div className="stud-class-set">
						<div className="clearfix edu-back-white poll_list">

							<div className="font-16 color-dark-21 shixunreporttitleboxtop pd20">总体评价</div>
							<div className="font-16 color-dark-21 shixunreporttitleboxbom pd20">
								<div style={{clear:"both",height:'100px'}}>

									<div className="fl edu-back-white ml10 ">
										<img alt="头像" className="radius" height="91" id="nh_user_logo" name="avatar_image"
												 src={ getImageUrl(`images/${data&&data.image_url}`)}
												 width="91"/>
									</div>

									<div className={"fl edu-back-white ml39 "}>
										   <p className={"back_font mt10"}>{data&&data.username}</p>

										   <p className={"mb16 mt10"}>
												 <span className={"passbox "}>
													  <div className={"passfont mb5"}><span className={"color999"}>当前完成关卡：</span>  <span className={"colorCF3B3B"}>{data&&data.complete_count}/{data&&data.challenges_count}</span></div>
												    <div className={"passfontbom"}><span className={"color999"}>经验值：</span>  <span  className={"color333"}>{data&&data.myself_experience}/{data&&data.total_experience}</span></div>
												 </span>

												 <span className={"passbox"}>
													  <div className={"passfontbommid mb5"}><span className={"color999"}>完成效率：</span> <span  className={data&&data.efficiency===null?"color999":"color333"}>{data&&data.efficiency===null?'--':data&&data.efficiency}</span></div>
												  	<div className={"passfontmid "}><span className={"color999"}>课堂最高完成效率：</span>  <span className={data&&data.max_efficiency===null?"color999":"color333"}>{data&&data.max_efficiency===null?'--':data&&data.max_efficiency}</span></div>
												 </span>

												 <span className={"passbox"}>
												   	<div><span className={"color999"}>通关时间：</span>  <span className={data&&data.passed_time===null?"color999":"color333"}>{data&&data.passed_time===null||data&&data.passed_time=== "--"?'--':moment(data&&data.passed_time).format('YYYY-MM-DD HH:mm')}</span></div>
												    {/*<div><span className={"color999"}>实战耗时：</span> <span className={data&&data.efficiency===null?"color999":"color333"}>{data&&data.time_consuming===null?'--':data&&data.time_consuming}</span></div>*/}
												 </span>
									   	 </p>

									</div>

								</div>
							</div>
              <ConclusionEvaluation
	              data={data}
              />

						</div>
					</div>

					<div className="stud-class-set mt19">
						<div className="clearfix edu-back-white poll_list">

							<div className="font-16 color-dark-21 shixunreporttitle ml20 pd20">阶段成绩</div>

							<OfficialAcademicTranscript
								{...this.props}
								data={data}
								jumptopic={this.jumptopic}
								getdatalist={()=>this.getdatalist()}
								setupdalist={(challenge_score,overall_appraisal,work_score)=>this.setupdalist(challenge_score,overall_appraisal,work_score)}
								showAppraiseModal={(type,id,show,hidden)=>this.showAppraiseModal(type,id,show,hidden)}
							/>

						</div>
					</div>


					<style>
						{`
								.personalsummary{
										border-radius:2px;
								}
								.pad040{
								    padding: 0px 40px 40px;
								}
								.pad40px{
										padding-bottom: 40px;
								}
								.codebox{
										height: 40px;
										line-height: 30px;
								 }
								 .codeboxright{
								    color: #999999!important;
								    font-size: 16px;
								 }
								 .pd30{
								     padding: 30px;
								 }
								`}
					</style>

					<div className="stud-class-set mt17"
						    style={{display:data&&data.work_description===null?"none":""}}
					>
						<div className="clearfix edu-back-white poll_list">
							<div className="font-16 color-dark-21 shixunreporttitleboxtop pd20 color333">
								个人总结
							</div>
							<div className="font-16 color-dark-21 shixunreporttitleboxbom pd30">
								<div style={{minHeight:'50px'}}>
									<div className={"personalsummary"}>
										<div className={"markdown-body"}
												 dangerouslySetInnerHTML={{__html: markdownToHTML(data===undefined?"":data.work_description).replace(/▁/g, "▁▁▁")}}
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>


          <ShowAppraiseList
						{...this.props}
						{...this.state}
						isdeleteModal={(comment_id,visible_comment,type)=>this.isdeleteModal(comment_id,visible_comment,type)}
						showAppraiseModal={(type,id,show,hidden)=>this.showAppraiseModal(type,id,show,hidden)}
					/>

					{
						has_commit === false ? "" :
							<div>
								<div className="stud-class-set bor-bottom-greyE mt17">
									<div className="clearfix edu-back-white poll_list">
										<div className="font-16 color-dark-21 shixunreporttitle ml20 pd20">图形统计</div>
										<Shixunechart
											data={data}
										/>
									</div>
								</div>

								<div className="stud-class-set bor-bottom-greyE">

									<div className="clearfix edu-back-white poll_list pad40px">
										<div className="font-16 color-dark-21 shixunreporttitle ml20 pd20">实训详情</div>
										<style>
											{`
	              .poll_list a{
	              padding:0px !important;
	              }
	              .backgroud4CACFF{
	                  background: #4CACFF;
	              }
	              `}
										</style>
										{
											data && data.shixun_detail === undefined ? "" : data.shixun_detail.map((item, key) => {
												return (
													<div id={"id" + item.position} key={key} className={"mb20"}>
														<div className="font-16 color-dark-21 ml20 mr20">
															<p className="clearfix mb20">
									        <span className="panel-inner-icon mr15 fl mt3 backgroud4CACFF">
									            <i className="fa fa-code font-16 color_white"></i>
									        </span>
																<span className="fl mt3 font-14">
														<span className="font-bd mr15">第{item.position}关</span>
														<Link to={/tasks/+item.game_identifier} >
															<span className={"font-14"}>{item.subject}</span>
														</Link>
													</span>
															</p>
															<Coursesshixundetails
																data={item.outputs}
															/>
														</div>

														{item.st === 0 ? item.passed_code === null ? "" :
															<div className="font-16 color-dark-21 ml20 mr20">
																<div className="bor-grey-e mt15">
																	<p className="clearfix pt5 pb5 pl15 pr15 back-f6-grey codebox">
																		<span className="fl">最近通过的代码</span>
																		<span className="fr codeboxright">{item.path}</span>
																	</p>

																	<div className="test-code bor-top-greyE">
																		<li className="clearfix">
																			<CodeMirror
																				value={item.passed_code}
																				options={{
																					// mode: 'xml',
																					theme: 'default',
																					lineNumbers: true,
																					// extraKeys: {"Ctrl-Q": "autocomplete"}, // 快捷键
																					indentUnit: 4, //代码缩进为一个tab的距离
																					matchBrackets: true,
																					autoRefresh: true,
																					smartIndent: true,//智能换行
																					styleActiveLine: true,
																					lint: true,
																					readOnly: "nocursor"
																				}}
																			/>
																		</li>
																	</div>
																</div>
															</div> : ""}
													</div>
												)
											})
										}
									</div>
								</div>
							</div>
					}


				</div>
			</div>
				</Spin>

		)
	}
}

export default ShixunWorkReport;


