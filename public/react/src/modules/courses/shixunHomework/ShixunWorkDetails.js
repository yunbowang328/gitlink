import React, {Component} from "react";
import {WordsBtn} from 'educoder';
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider,InputNumber, Tag,DatePicker,Radio,Tooltip,Spin} from "antd";
import {Link,Switch,Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import ShixunCustomsPass from "./Shixunworkdetails/ShixunCustomsPass";
import '../css/members.css';
import "../common/formCommon.css";
import '../css/Courses.css';
import './style.css';




class ShixunWorkDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:undefined,
			spinning:true
		}
	}

	componentDidMount() {
		this.setState({
			spinning:true
		})
		let homeworkid=this.props.match.params.homeworkid;
		let userid=this.props.match.params.userid;
		let url = "/homework_commons/"+homeworkid+"/code_review_detail.json";
		 axios.get(url,{
			params: {
				user_id:userid,
			}
		}).then((result) => {
			if (result.status === 200) {
				if (result.data.status === 403 || result.data.status === 401 || result.data.status === 407 || result.data.status === 408|| result.data.status === 409 || result.data.status === 500) {

				}else{
					this.setState({
						data:result.data,
						spinning:false
					})
				}

			}
		}).catch((error) => {
			console.log(error)
		})

		let query = this.props.location.pathname;
		const type = query.split('/');
		this.setState({
			shixuntypes:type[3]
		})
	}
  updatas=()=>{
		this.setState({
			spinning:true
		})
		let homeworkid=this.props.match.params.homeworkid;
		let userid=this.props.match.params.userid;
		let url = "/homework_commons/"+homeworkid+"/code_review_detail.json";
		axios.get(url,{
			params: {
				user_id:userid,
			}
		}).then((result) => {
			if (result.status === 200) {
				if (result.data.status === 403 || result.data.status === 401 || result.data.status === 407 || result.data.status === 408|| result.data.status === 409 || result.data.status === 500) {

				}else{
					this.setState({
						data:result.data,
						spinning:false
					})
				}

			}
		}).catch((error) => {
			console.log(error)
		})
	}
	goback=(sum)=>{
		// let{data}=this.state
		// if(sum===1){
		// 	window.location.href = "/courses/"+data.course_id+"/students";
		// }else{
		// 	window.history.go(-1)
		// }
		// this.props.history.goBack()
		// "/courses/1545/shixun_homeworks/15220/list?tab=2"
		this.props.history.replace(`/courses/${this.props.match.params.coursesId}/shixun_homeworks/${this.props.match.params.homeworkid}/list?tab=2`);
	}
	render() {
    let{data}=this.state;
		document.title=data&&data.course_name;
		return (
			<Spin size="large" spinning={this.state.spinning} style={{marginTop:"13%"}}>
				<div className="newMain clearfix ">
				{data===undefined? "":
				<div className={"educontent mb20"}>

					<div className="educontent">
						<p className="clearfix mt20">
							<a className="fl color-grey-9 btn colorgrey  hovercolorblue"
								 href={`/courses/${data&&data.course_id}/shixun_homeworks/${data&&data.homework_common_id}`}
								 >
								<a className={"color-grey-9"} >{data&&data.course_name}</a>
							</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
								<a   className="btn colorgrey fl hovercolorblue grey"
										 href={`/courses/${data&&data.course_id}/shixun_homeworks/${data&&data.homework_common_id}/list?tab=0`}
									// to={"/courses/"+data&&data.course_id+"/"+this.state.shixuntypes+"/"+data&&data.homework_common_id}
								>
									<span className={"color-grey-9"}>实训作业</span>
								</a>
							<span className="color-grey-9 fl ml3 mr3">&gt;</span>
							<WordsBtn className="fl">{data&&data.username}</WordsBtn>
						</p>
					</div>

					<div className="padding10-30 clearfix" style={{
						padding: '10px 2px'
					}}>
						<span className="fl font-18">{data&&data.homework_common_name}</span>
						<a className="fr color-grey-9 mt4"   onClick={this.goback}>返回</a>
					</div>

					<div className="padding10-30  edu-back-white clearfix" style={{
						padding: '10px 13px'
					}}>
						<span className="fl color-orange font-14">非编程类型任务，不参与查重</span>
						<span className="fr mt4">
							<span className={"color656565"}>被查作品：</span>
							<span className={"mr50"}><span className={"color-orange"}>{data&&data.username}</span></span>
							{data&&data.eff_score===null||data&&data.eff_score===undefined||data&&data.eff_score_full===null||data&&data.eff_score_full===undefined?"":<span className={"mr50"}>效率分：<span className={"color-orange"}>{data&&data.eff_score}</span>/{data&&data.eff_score_full}</span>}
							<span className={""}>最终成绩：<span className={"color-orange"}>{data&&data.final_score}</span>分</span>
						</span>
					</div>

					<div className="stud-class-set bor-bottom-greyE">
						<div className="clearfix edu-back-white poll_list">
							<ShixunCustomsPass
								{...this.props}
								{...this.state}
								updatas={()=>this.updatas()}
								data={data}
							/>
						</div>
					</div>
				</div>
			}
				</div>
		</Spin>
		)
	}
}

export default ShixunWorkDetails;




// {/*<div className="stud-class-set bor-bottom-greyE">*/}
// {/*<div className="clearfix edu-back-white poll_list">*/}
//
// {/*<div className="font-16 color-dark-21 shixunreporttitle ml20">总体评价</div>*/}
//
// {/*<ConclusionEvaluation*/}
// {/*data={data}*/}
// {/*/>*/}
//
// {/*</div>*/}
// {/*</div>*/}
//
// {/*<div className="stud-class-set">*/}
// {/*<div className="clearfix edu-back-white poll_list">*/}
//
// {/*<div className="font-16 color-dark-21 shixunreporttitle ml20">阶段成绩</div>*/}
//
// {/*<OfficialAcademicTranscript*/}
// {/*data={data}*/}
// {/*/>*/}
//
// {/*</div>*/}
// {/*</div>*/}
//
// {/*<div className="stud-class-set bor-bottom-greyE"*/}
// {/*style={{display:data&&data.work_description===null?"none":""}}*/}
// {/*>*/}
// {/*<div className="clearfix edu-back-white poll_list">*/}
// {/*<div className="font-16 color-dark-21 shixunreporttitle ml20">个人总结</div>*/}
// {/*<style>*/}
// {/*{`*/}
// {/*.personalsummary{*/}
// {/*height:115px;*/}
// {/*border:1px solid rgba(235,235,235,1);*/}
// {/*border-radius:2px;*/}
// {/*}*/}
// {/*.pad040{*/}
// {/*padding: 0px 40px 40px;*/}
// {/*}*/}
// {/*.pad40px{*/}
// {/*padding-bottom: 40px;*/}
// {/*}*/}
// {/*.codebox{*/}
// {/*height: 40px;*/}
// {/*line-height: 30px;*/}
// {/*}*/}
// {/*.codeboxright{*/}
// {/*color: #999999!important;*/}
// {/*font-size: 16px;*/}
// {/*}*/}
// {/*`}*/}
// {/*</style>*/}
// {/*<div className={"pad040"}>*/}
// {/*<div className={"personalsummary"}>*/}
// {/*{data&&data.work_description}*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</div>*/}
//
// {/*<div className="stud-class-set bor-bottom-greyE">*/}
// {/*<div className="clearfix edu-back-white poll_list">*/}
// {/*<div className="font-16 color-dark-21 shixunreporttitle ml20">图形统计</div>*/}
// {/*<Shixunechart*/}
// {/*data={data}*/}
// {/*/>*/}
// {/*</div>*/}
// {/*</div>*/}
//
// {/*<div className="stud-class-set bor-bottom-greyE">*/}
// {/*<div className="clearfix edu-back-white poll_list pad40px">*/}
// {/*<div className="font-16 color-dark-21 shixunreporttitle ml20">实训详情</div>*/}
// {/*<style>*/}
// {/*{`*/}
// {/*.poll_list a{*/}
// {/*padding:0px !important;*/}
// {/*}*/}
// {/*.backgroud4CACFF{*/}
// {/*background: #4CACFF;*/}
// {/*}*/}
// {/*`}*/}
// {/*</style>*/}
// {/*{*/}
// {/*data&&data.shixun_detail.map((item,key)=>{*/}
// {/*return(*/}
// {/*<div key={key} className={"mb20"}>*/}
// {/*<div className="font-16 color-dark-21 ml20 mr20">*/}
// {/*<p className="clearfix mb20">*/}
// {/*<span className="panel-inner-icon mr15 fl mt3 backgroud4CACFF">*/}
// {/*<i className="fa fa-code font-16 color_white"></i>*/}
// {/*</span>*/}
// {/*<span className="fl mt3 font-14">*/}
// {/*<span className="font-bd mr15">第{item.position}关</span>*/}
// {/*<Link to={/tasks/+item.game_identifier}>*/}
// {/*<span className={"font-14"}>{item.subject}</span>*/}
// {/*</Link>*/}
// {/*</span>*/}
// {/*</p>*/}
// {/*<Coursesshixundetails*/}
// {/*data={item.outputs}*/}
// {/*/>*/}
// {/*</div>*/}
//
// {/*{item.st===0?<div className="font-16 color-dark-21 ml20 mr20">*/}
// {/*<div className="bor-grey-e mt15">*/}
// {/*<p className="clearfix pt5 pb5 pl15 pr15 back-f6-grey codebox">*/}
// {/*<span className="fl">最近通过的代码</span>*/}
// {/*<span className="fr codeboxright">{item.path}</span>*/}
// {/*</p>*/}
//
// {/*<div className="test-code bor-top-greyE">*/}
// {/*<li className="clearfix" xmlns="http://www.w3.org/1999/html">*/}
// {/*<CodeMirror*/}
// {/*value={item.passed_code}*/}
// {/*options={{*/}
// {/*// mode: 'xml',*/}
// {/*theme: 'default',*/}
// {/*lineNumbers: true,*/}
// {/*// extraKeys: {"Ctrl-Q": "autocomplete"}, // 快捷键*/}
// {/*indentUnit: 4, //代码缩进为一个tab的距离*/}
// {/*matchBrackets: true,*/}
// {/*autoRefresh: true,*/}
// {/*smartIndent: true,//智能换行*/}
// {/*styleActiveLine: true,*/}
// {/*lint: true,*/}
// {/*readOnly: "nocursor"*/}
// {/*}}*/}
// {/*/>*/}
// {/*</li>*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</div>:""}*/}
// {/*</div>*/}
// {/*)*/}
// {/*})*/}
// {/*}*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</div>*/}
//
