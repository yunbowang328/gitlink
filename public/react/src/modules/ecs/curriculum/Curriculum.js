import React, { Component } from 'react';

import {getRandomNumber} from 'educoder';

import 'antd/dist/antd.css';

import '../css/ecCourseSupports.css';

import '../css/ecCourseEvaluations.css';
import {
	Route,
	Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from "../../../Loading";
const $ = window.$;
const Curriculumtwo = Loadable({
	loader: () => import('./Curriculumtwo'),
	loading: Loading,
})
const EcCourseEvaluationsbottom =Loadable({
	loader: () => import('../subroute/ecCourseEvaluations/EcCourseEvaluationsbottom'),
	loading: Loading,
});
const EcCompletionCalculation =Loadable({
	loader: () => import('../subroute/ecCompletion_calculation/EcCompletionCalculation'),
	loading: Loading,
});
const EcCourseSupportSetting =Loadable({
	loader: () => import('../subroute/ecCourseSupportSetting/index'),
	loading: Loading,
});

class Curriculum extends Component {
	//课程体系
	constructor(props) {
		super(props)
		this.state= {
      classcalue:5,
			newec_course_idbottom:"",
			course_name:undefined,
			course_url:"a",
			ecmanager:true,
			titine:1,
		}
		}

	componentWillMount(){
		// window.document.title = '课程达成评价结果';
	}
	componentDidMount(){
		console.log("Curriculum");
		console.log(this.props);
	}
	sync_course_data=()=>{
		// this.setState({listSpin:true})
		// let ec_course_id=this.props.match.params.ec_course_id;
		// let Url ='/ec_course_achievement_methods/sync_course_data';
		// axios.post(Url, {
		// 		ec_course_id:ec_course_id
		// 	},
		// 	{
		// 		withCredentials: true
		// 	}
		// ).then((response) => {
		// 	if(response.data.status===0){
		// 		this.setState({
		// 			// titlemessage: response.data.message+"(支撑关系变更)",
		// 			Modallist: response.data.message,
		// 			Modallisttype:true,
		// 			listSpin:false
		// 		})
		// 		this.UpdateEvaluations();
		// 	}else if(response.data.status===-1){
		// 		this.setState({
		// 			// titlemessage: response.data.message+"(支撑关系变更)",
		// 			Modallist: response.data.message,
		// 			Modallisttype:true,
		// 			listSpin:false
		// 		})
		//
		// 	}
		// }).catch((error) => {
		// 	console.log(error)
		// })

	}
	bindRef = ref => {
		console.log(ref);
		// console.log("调用了子对象1");
		this.child = ref
	};
	newrightcalculatebuttonysl=(child)=>{
		// console.log("调用了子对象2");
		// console.log(child);
		child.newrightcalculatebutton();
	}
	onAclick=(i)=>{
		console.log("onAclick");
		console.log(i);
		if(i===1){
			this.props.history.push(this.props.match.url+"/ec_course_support_setting/1");
		}else if(i===2){
			this.props.history.push(this.props.match.url+"/ec_course_reach_setting/2");
		}else if(i===3){
			this.props.history.push(this.props.match.url+"/score_level/3");
		}else if(i===4){
			this.props.history.push(this.props.match.url+"/evaluation_methods/4");
		}else{
			this.props.history.push(this.props.match.url+"/competition_calculation_info/5");
		}
		this.setState({
			titine:i,
		})

	};
	Ontitine=(s)=>{
		console.log("CurriculumCurriculum");
		console.log(s);
		if(s==="ec_course_support_setting"){
			this.setState({
				titine:1,
			})
		}else if(s==="ec_course_reach_setting"){
			this.setState({
				titine:2,
			})
		}else if(s==="score_level"){
			this.setState({
				titine:3,
			})
		}else if(s==="evaluation_methods"){
			this.setState({
				titine:4,
			})
		}else if(s==="competition_calculation_info"){
			this.setState({
				titine:5,
			})
		}

	};
	associatedclass=()=>{

	};
	deleteassociatedclass=()=>{

	}
	render() {
		let {newec_course_idbottom,titine,classcalue,course_name,course_url,ecmanager,Spintype,calculatesetype,ec_course_id,course_total_scoreaverage,ec_course_targets_count,schooldata,ecComponentState,course_total_score,total_rate_data,ec_course_targets,graduation_list,target_list,target_score,evaluate_result,morelisttype,titlemessage,completiontype,completionlist,ismanager} = this.state;
    // console.log("Curriculum");
    // console.log(this.props);
		// console.log(titine);
		return (
			<div className="educontent">
			<div className="newMain clearfix">
				<div className="edu-back-white eacourse">

					<div className="clearfix padding20-30 bor-bottom-greyE">
						<a href={schooldata&&schooldata.course_setting_url} className="color-grey-9 TrainingLecturer">课程体系</a> >
						<a className="TrainingTheory major_name"> {schooldata&&schooldata.ec_course_name} 达成评价详情</a>
						{/* <a href="javascript:void(0)" className="fr white-btn edu-blueback-btn mt4">导出培养目标</a> */}
						<div className="color-grey-9 mr10">系统根据课程目标、课程考核方式与课程目标评价方法，一键计算评价课程目标的达成情况  <a className={"color-blue"} target="_blank" href={'/forums/3533'}>查看详情</a></div>
						{
							titine === 4 ?
								<span className="Importclassroomdatas" style={{top: '22px'}}>
                  <a className="white-btn edu-blueback-btn fr mb10 mr10 mt7" target="_blank"
									href={'/ec_courses/' + newec_course_idbottom + '/export_ec_course_targets?format=xls'}>导出评价方法</a>
                  </span>
						  :titine === 1 ?
								<span className="Importclassroomdatas" style={{top: '22px'}}>
                  <a className="white-btn edu-blueback-btn fr mb10 mr10 mt7"
									href={`/ec_courses/${this.props.match.params.ec_course_id}/export_ec_course_targets?format=xls`}
									>导出课程目标</a>
                  </span>
							:titine===2?
									<div className={"Importclassroomdatas"}>
                                <span className="" >
                                <a className="white-btn edu-blueback-btn fr mr10 mt7"    style={{top: '22px',display:ecmanager===false?"none":"block"}} target="_blank" href={'/ec_courses/'+ec_course_id+'/export_ec_course_targets?format=xls'}>导出考核方法</a>
                                </span>
										<a className="white-btn edu-blueline-btn fr mr10 mt7 mr20"
											 onClick={this.associatedclass}
											 style={{display: course_url === "" && ecmanager === true ? "block" : "none"}}
										>关联课堂</a>
										<a className="white-btn edu-blueline-btn fr mr10 mt7 mr20"
											 onClick={this.deleteassociatedclass}
											 style={{display:course_url!=""&&ecmanager===true?"block":"none"}}
										>取消关联</a>
									</div>
							:""
						}
					</div>

					<div className="padding20-30"style={titine===2||titine===3?{height:"100px"}:{height:"80px"}}
					>
						<a className="fl SystemParameters" style={titine===1?{display:schooldata&&schooldata.ec_course_support_setting_url===null?"none":"block",color:'#4CACFF'}:{display:schooldata&&schooldata.ec_course_support_setting_url===null?"none":"block",color:'#4D4D4D'}}
							  onClick={()=>this.onAclick(1)}>1.课程目标</a>
						<a className="fl SystemParameters ml40"
							 style={titine===2?{display:schooldata&&schooldata.ec_course_reach_setting_url===null?"none":"block",color:'#4CACFF'}:{display:schooldata&&schooldata.ec_course_reach_setting_url===null?"none":"block",color:'#4D4D4D'}}
							 onClick={()=>this.onAclick(2)}>2.课程考核方式与数据来源</a>
						<a className="fl SystemParameters4CACFF ml40 "
							 style={titine===3?{color:'#4CACFF'}:{display:"block",color:'#4D4D4D'}}
							 onClick={()=>this.onAclick(3)}>3.成绩等级设置</a>
						<a className="fl SystemParameters ml40"
							 style={titine===4?{display:schooldata&&schooldata.evaluation_methods_url===null?"none":"block",color:'#4CACFF'}:{display:schooldata&&schooldata.evaluation_methods_url===null?"none":"block",color:'#4D4D4D'}}
							 onClick={()=>this.onAclick(4)}
						>4.课程目标评价方法</a>
						<a className="fl SystemParameters ml40 "
							 style={titine===5?{display:schooldata&&schooldata.competition_calculation_info_url===null?"none":"block",color:'#4CACFF'}:{display:schooldata&&schooldata.competition_calculation_info_url===null?"none":"block",color:'#4D4D4D'}}
							 onClick={()=>this.onAclick(5)}
						>5.课程达成评价结果</a>
						{
							titine===5?
						  <span>
						  <span className={ismanager===false?"none":""} style={{top: "26px"}}>
							<a className="white-btn edu-blueback-btn fr mb10 mr10 mt9" target="_blank" href={`/ec_courses/${ec_course_id}/course_targets.xlsx${getRandomNumber()}`}>导出评价详情</a>
							</span>
						  <span className={ismanager===false?"none":"right newrightcalculatebuttons fr mb10 mr20 "}
							onClick={()=>this.newrightcalculatebuttonysl(this.child)}>计算</span>
							</span>
						 :titine===4?
								<span className="fr ml20 SystemParameters" style={{color: '#989898'}}>（各环节平均得分*占比）之和/（各环节总分*占比）之和</span>
						 :titine===3?
							<span className="fl SystemParametersysls" style={{display:course_name===null||course_name===undefined?"block":"none",
							padding: '0px 0px 0px 0px',textAlign: 'left',width: '100%',color:'#989898'}}>（将学生的成绩转换成对应的等级）</span>
							:titine===2?
							<span>
							<span className="fl" style={{display:course_name===null||course_name===undefined?"block":"none",padding: '0px 0px 0px 0px',textAlign: 'left',width: '100%',color: '#989898'}}>（请在完成配置后，使用各项成绩导入模板，将本学年所有参与的学生成绩数据导入系统）</span>
							<span className="Importclassroomdatass" style={{display:course_url===""||ecmanager===false?"none":"block",}}><a onClick={this.sync_course_data} className="white-btn edu-orangeback-btn  fr mt2 mr10" style={{width:'112px'}}>导入课堂数据</a></span>
							</span>
							:""
						}
					</div>
				</div>
				<Switch>
					{/*Curriculumtwo 测试用*/}
					{/*课程目标*/}
					<Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses/subpage/:type/1'
								 render={ (props) => (<EcCourseSupportSetting {...this.props} {...props} {...this.state} Ontitine={(i)=>this.Ontitine(i)} />) }></Route>
					{/*课程考核方式与数据来源*/}
					<Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses/subpage/:type/2'
								 render={ (props) => (<Curriculumtwo {...this.props} {...props} {...this.state} Ontitine={(i)=>this.Ontitine(i)}/>) }></Route>
					{/*成绩等级设置*/}
					<Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses/subpage/:type/3'
								 render={ (props) => (<Curriculumtwo {...this.props} {...props} {...this.state} Ontitine={(i)=>this.Ontitine(i)}/>) }></Route>
					{/*4课程目标评价方法*/ }
					<Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses/subpage/:type/4'
								 render={ (props) => (<EcCourseEvaluationsbottom {...this.props} {...props} {...this.state} Ontitine={(i)=>this.Ontitine(i)}/>) }></Route>
					{/*5课程达成评价结果*/}
					<Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses/subpage/:type/5'
								 render={ (props) => (<EcCompletionCalculation {...this.props} {...props} {...this.state} Ontitine={(i)=>this.Ontitine(i)} triggerRef={this.bindRef}/>) }></Route>
				</Switch>
			</div>
			</div>
		)
	}


}
export default Curriculum;