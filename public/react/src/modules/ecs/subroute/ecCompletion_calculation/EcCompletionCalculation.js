import React, { Component } from 'react';
import classNames from 'classnames'

import axios from 'axios';

// import { TPMIndexHOC } from '../../../tpm/TPMIndexHOC';

import { SnackbarHOC } from 'educoder'

import { message,Modal,Spin,Icon} from 'antd';

import 'antd/dist/antd.css';

import EcTitleCourseEvaluations from '../../ecTitle/ecTitle'

import '../../css/ecCourseSupports.css';

import '../../css/ecCourseEvaluations.css';

const $ = window.$;
class EcCompletionCalculation extends Component {
    constructor(props) {
        super(props)
        this.state={
            schooldata:{},
            ecComponentState:"ecCompletion",
            course_total_score:[],
            ec_course_targets:0,
            graduation_list:[],
            target_list:[],
            target_score:[],
            evaluate_result:"",
            ec_course_targets_count:0,
            new_target_ec_year_id:0,
            total_rate_data:undefined,
            calculatetype:false,
            ec_course_id:0,
            morelisttype:false,
            titlemessage:"提示",
            completiontype:false,
            completionlist:"",
            course_total_scoreaverage:0,
            calculatesetype:false,
            Spintype:false,
            ismanager:false,
				  	course_achievement:"--",
				    course_rate:"--",
				  	score_levels:[],
					  score_levelsdata:[],
            hife:"/ecs/major_schools/3/years/60/requirement_vs_courses",
        }
    }

    componentWillMount(){
        window.document.title = '课程达成评价结果';
    }

    componentDidMount(){
        console.log("componentDidMount");
        console.log("EcCompletionCalculation");

        // console.log(this.props);
        // let ec_course_id =this.props.match.params.ec_course_id;
        // this.UpdateClassData(true);

        // const url =`/ec_major_schools/get_navigation_data?ec_course_id=`+ec_course_id;
             const  ec_course_id=706;
			       const url =`/ec_courses/${ec_course_id}/evaluation.json`;
            axios.get(url)
            .then((response) => {
                if(response.status===200){
                    // if(response.data.allow_visit===false){
                    //     window.location.href="/403"
                    //  }

									this.setState({
										schooldata:response.data,
										ec_course_id:ec_course_id,
										// evaluate_result:response.data.evaluate_result,
										// course_total_score:response.data.course_total_score[response.data.course_total_score.length-1].total_rate,
										// total_rate_data:response.data.course_total_score[response.data.course_total_score.length-1].total_rate.length,
										graduation_list:response.data.graduation_subitem_evaluations,
										target_list:response.data.course_targets,
										// target_score:response.data.target_score,
										ec_course_targets_count:response.data.course_targets.length,
										course_achievement:response.data.course_achievement,
										course_rate:response.data.course_rate,
										score_levels:response.data.score_levels,
										// score_levelsdata:response.data.course_targets.score_levels,
										// morelisttype:newmorelisttype,
										// course_total_scoreaverage:course_total_scoreaverage,
										// ismanager:response.data.is_manager
									})
									// console.log("componentDidMount");
									// console.log(response.data.score_levels);
									// console.log(response.data.course_targets.score_levels);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.Ontitine("competition_calculation_info");
        try {
            this.props.triggerRef(this);
        }catch (e) {

        }
    }

    targetsget_navigation_data=(ec_year_id,ec_course_id)=>{
        const Url =`/ec_major_schools/get_navigation_data?ec_year_id=`+ec_year_id+"&ec_course_id="+ec_course_id;
        axios.get(Url, {
            withCredentials: true,
        })
            .then((response) => {
                if(response.status===200){
                    // if(response.data.allow_visit===false){
                    //     window.location.href="/403"
                    //  }
                    this.setState({
                        schooldata:response.data,
                        ec_course_id:ec_course_id
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    showmorelist=()=>{
        this.setState({
            morelisttype:false
        })
        this.UpdateClassData(false)
    }
    UpdateClassData=(key)=>{
        let {calculatetype} =this.state;
        // let ec_course_id =this.props.match.params.ec_course_id;
        this.setState({
            ec_course_id:ec_course_id
        })
		  	const  ec_course_id=706;
        const Arl =`/ec_courses/`+ec_course_id+`/calculation_info_data`;
        axios.get(Arl, {
            withCredentials: true,
        })
            .then((response) => {

                if(response.status===200){
                    // var list=[];
                    // if(key===true){
                    //     for(var i=0; i<response.data.course_total_score.length;i++){
                    //         if(i<10){
                    //             list.push(response.data.course_total_score[i])
                    //         }
                    //     }
                    // }else{
                    //     list=response.data.course_total_score
                    // }
                    // let newgraduation_list= response.data.graduation_list.reverse();
                    let newmorelisttype=false;
                    if(response.data.course_total_score>10){
                        newmorelisttype=true

                    }

                    let course_total_scoreaverage;
                    let newlist=response.data.course_total_score[response.data.course_total_score.length-1].total_rate;
                    for(var i=0; i<newlist.length;i++){
                            if(i===newlist.length-1){
                                course_total_scoreaverage=newlist[i].total_score
                            }
                    }

                    this.setState({
                        // evaluate_result:response.data.evaluate_result,
                        // course_total_score:response.data.course_total_score[response.data.course_total_score.length-1].total_rate,
                        // total_rate_data:response.data.course_total_score[response.data.course_total_score.length-1].total_rate.length,
                         graduation_list:response.data.graduation_subitem_evaluations,
                         target_list:response.data.course_targets,
                        // target_score:response.data.target_score,
                        ec_course_targets_count:response.data.course_targets.length,
										   	course_achievement:response.data.course_achievement,
											  course_rate:response.data.course_rate,
											  score_levels:response.data.score_levels,
										  	// score_levelsdata:,
                        // morelisttype:newmorelisttype,
                        // course_total_scoreaverage:course_total_scoreaverage,
                        // ismanager:response.data.is_manager
                    });
										// console.log("componentDidMount");
										// console.log(response.data.score_levels_map);
										// Object.getOwnPropertyNames(response.data.score_levels_map).forEach(function(val) {
										// 	console.log("正在循环");
										// 	console.log(val);
										// });
									// console.log(response.data.course_targets.score_levels);

                    // ec_course_targets:response.data.ec_course_targets,
                    this.targetsget_navigation_data(response.data.ec_year_id,ec_course_id)
                    if(calculatetype===true){
                        this.setState({
                            calculatetype:false,
                            completiontype:true,
                            completionlist:'刷新列表数据成功',
                            calculatesetype:true
                        })
                    }

                }
            })
            .catch(function (error) {
                console.log(error);
            });

        //
        // let newcourse_total_score=[
        //     {
        //         student_scores:{
        //             name: "黎子豪",
        //             student_number: "13408100113",
        //             target_info: [
        //                 {position: 1, score: 73.3},
        //                 {position: 2, score: 71.8},
        //                 {position: 3, score: 92.2},
        //                 {position: 4, score: 82.1},
        //                 {position: 5, score: 87.7}
        //             ],
        //             total_score: 81.4
        //         }
        //     },{
        //         total_rate:[
        //             {position: 1, score: 65.35, rate: 0.1},
        //             {position: 2, score: 68.81, rate: 0.1},
        //             {position: 3, score: 68.34, rate: 0.1},
        //             {position: 4, score: 78.09, rate: 0.35},
        //             {position: 5, score: 77, rate: 0.35},
        //             {total_score: 74.5},
        //         ]
        //     }
        // ]
        //
        // var list=[];
        // if(key===true){
        //     for(var i=0; i<newcourse_total_score.length;i++){
        //         if(i<10){
        //             list.push(newcourse_total_score[i])
        //         }
        //     }
        // }else{
        //     list=newcourse_total_score
        // }
        // let graduation_list=[
        //     {
        //         ec_graduation_name: "5-1",
        //         ec_subitem_content: "能够针对计算机系统的设计、开发、部署、运行和维护等方面的复杂工程问题，开发、选择与使用恰当的技术、资源、现代工程工具和信息技术工具，进行科学合理的预测与模拟，并充分认识到问题的复杂性与解决手段的局限性。",
        //         reach_real_target: 0.078,
        //         reach_target: 0.07,
        //         result: "达成",
        //         target_position: [0, 0, 0, 1, 0],
        //         weight: 0.1
        //     }
        // ]
        // let newgraduation_list= graduation_list.reverse();
        // this.setState({
        //     course_total_score:list,
        //     total_rate_data:newcourse_total_score[newcourse_total_score.length-1].total_rate.length,
        //     graduation_list:newgraduation_list,
        //     evaluate_result:false,
        //     target_list:[
        //         {
        //             content: "理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。",
        //             real_grade: 65.35,
        //             result: "达成",
        //             standard_grade: 65,
        //             weigths: 0.1
        //         }
        //     ],
        //     target_score:[
        //         {average_score: 65.35,
        //         ec_course_targets_count: 5,
        //         from50: [9, 20.45],
        //         from60: [13, 29.55],
        //         from70: [14, 31.82],
        //         from80: [3, 6.82],
        //         from90: [1, 2.27],
        //         from_down: [4, 0.09],
        //         graduation_list: [],
        //         low_score: 40,
        //         top_score: 93.4}
        //     ],
        //     ec_course_targets_count:5
        //
        // })
        // if(calculatetype===true){
        //     message.success('刷新列表数据成功！');
        //     this.setState({
        //         calculatetype:false,
        //         completiontype:true,
        //         completionlist:'刷新列表数据成功！'
        //     })
        // }





    }

    newrightcalculatebutton=()=>{
        console.log("调用了计算");
        this.setState({
            Spintype:true
        })
        // let {ec_course_id}=this.state;
        const  ec_course_id=706;
        // const Orl =`/ec_courses/`+ec_course_id+`/sync_data`;
        const Orl =`/ec_courses/${ec_course_id}/evaluation.json`;
        axios.get(Orl)
            .then((response) => {
                if(response){
                    if(response.data.status===1){
                        this.setState({
                            calculatetype:true,
                            completiontype:true,
                            completionlist:'计算成功',
                            calculatesetype:true,
                            Spintype:false
                        })
                        this.UpdateClassData(true);
                    }
                }

            })
            .catch(function (error) {
                    console.log(error)
            });
    }
    hidecompletion=()=>{
        this.setState({
            completiontype:false,
            completionlist:"",
            calculatesetype:false
        })
    }
    render() {
        let {Spintype,calculatesetype,ec_course_id,course_total_scoreaverage,score_levels,ec_course_targets_count,course_achievement,schooldata,course_rate,ecComponentState,course_total_score,total_rate_data,ec_course_targets,graduation_list,target_list,target_score,evaluate_result,morelisttype,titlemessage,completiontype,completionlist,ismanager} = this.state;

        let TargetresList = (length) => {
            let target_listres = [];
            for(let i = 0; i < length; i++) {
                // target_listres.push(<span className="column-1 operationleft color-666"  key={i}>目标{length-i}</span>)
                // target_listres.push(<span className="column-2 operationleft color-666"  key={i}>目标{i+1}</span>)
                target_listres.push(<span className="column-1  color-666"  key={i}>目标{i+1}</span>)
            }
            return target_listres
        }

        let TargetresLists = (length) => {
            let target_listress = [];
            for(let i = 0; i < length; i++) {
                // target_listres.push(<span className="column-1 operationleft color-666"  key={i}>目标{length-i}</span>)
                target_listress.push(<span className="column-2  operationleft color-666"  key={i}>目标{i+1}</span>)
                // target_listres.push(<span className="column-1 operationright color-666"  key={i}>目标{length-i}</span>)
            }
            return target_listress
        }

        let TargetresContentList = (data,value) => {
					let target_listres = [];
					if(data){
        	   	if(data.length>0){
        	   		 for(var i=0;i<data.length;i++){
								  console.log("TargetresContentList");
        	   		 	   if(data[i].id===value[0]){
											 target_listres.push(<span className={i===0?" column-1  color-green":" column-1  color-green"}  key={i}><i class="iconfont icon-gouxuan color-green font-16 mr5"></i></span>)
										 }	else{
											 target_listres.push(<span className={i===0?" column-1  color-666":"column-1  color-666"}  key={i}><i class="iconfont icon-guanbi font-14 mr5"></i></span>)

										 }
        	   		 }
							}
						 }
            // target_listres.reverse()
            return target_listres
        };



        let Total_rate_dataList = (value) => {

            let target_listres = [];
            if(value!=undefined){
                for(let i = 0; i < value.length; i++) {

                    if(i===value.length-1){
                        target_listres.push(<span className="column-1 operationright" key={i}>
                            {/*<div className="color-red">{value[i].total_score}</div>*/}
                            <div className="color-red">100%</div>
                        </span>)
                    }else{
                            target_listres.push(<span className={i===0?"  column-2 operationleft":"column-2 operationleft"} key={i}>
                    {/*<div>{value[i].score}</div>*/}
                    {/*<div className="color-redFF">占比{(value[i].rate*100).toFixed(2)}%</div>*/}
                    <div>
                        {(value[i].rate*100).toFixed(2)}%
                    </div>
                    </span>)
                        }

                }
                return target_listres
            }else{
                target_listres.push(<span className="column-1 operationright">
                {/*<div className="color-red">{value[i].total_score}</div>*/}
                    <div className="">--</div>
                </span>)
             return target_listres
            }
        }

        let newTotal_rate_dataList = (length,value) => {

            let target_listres = [];
            if(value!=undefined){
                for(let i = 0; i < value.length; i++) {

                    // if(i===0){
                    //     target_listres.push(<span className="column-2  color-05101A" key={i}>
                    //         <div>{value[i].score.toFixed(2)}</div>
                    // </span>)
                    // }else{
                    //     target_listres.push(<span className="column-2 color-05101A" key={i}>
                    //     <div>{value[i].score.toFixed(2)}</div>
                    // </span>)
                    // }

                    if(i<value.length-1){
                        target_listres.push(<span className="column-2  color-05101A" key={i}>
                             <div>{value[i].score.toFixed(2)}</div>
                        </span>)
                    }

                }
                return target_listres
            }
        };
        // console.log(ec_course_targets_count);
        // console.log("EcCompletionCalculation");
        return (
            <div className="newMain clearfix">
                <Modal
                    title={titlemessage}
                    visible={completiontype}
                    className={"ecmodeldelet"}
                    closable={false}
                    footer={null}
                >
                    <div className="task-popup-content">
                        <div className="task-popup-text-center font-14">{completionlist}</div>
                    </div>
                    {
                        calculatesetype===true?
                        <div className="task-popup-submit clearfix"
                        style={{width:'69px'}}
                        >
                            <a  className="task-btn task-btn-orange fr"
                                style={{fontWeight: '400'}}
                                onClick={this.hidecompletion}
                            >知道啦</a>
                        </div>
                        :
                        <div className="task-popup-submit clearfix">
                            <a onClick={this.hidecompletion} className="task-btn fl">取消</a>
                            <a  className="task-btn task-btn-orange fr"
                                onClick={this.hidecompletion}
                            >确定</a>
                        </div>
                    }



                </Modal>

                <div className="educontent">

                    {/*<EcTitleCourseEvaluations*/}
                    {/*    {...this.props}*/}
                    {/*    schooldata={schooldata}*/}
                    {/*    ecComponentState={'ecCompletion'}*/}
                    {/*    ecpath={"show"}*/}
                    {/*/>*/}

                    {/*<div className="edu-back-white eacourse">*/}
                    {/*    <div className="clearfix padding20-30 bor-bottom-greyE">*/}
                    {/*        <a href={schooldata.course_setting_url} className="color-grey-9 TrainingLecturer">课程体系</a> >*/}
                    {/*        <a className="TrainingTheory major_name"> {schooldata.ec_course_name} 达成评价详情</a>*/}
                    {/*        /!* <a href="javascript:void(0)" className="fr white-btn edu-blueback-btn mt4">导出培养目标</a> *!/*/}
                    {/*        <div className="color-grey-9 mr10">系统根据课程目标、课程考核方式与课程目标评价方法，一键计算评价课程目标的达成情况  <a className={"color-blue"} onClick={() => window.elasticLayer(3533)}>查看详情</a></div>*/}
                    {/*    </div>*/}
                    {/* <div className="padding20-30" id="training_objective_contents"*/}
                    {/*        style={{*/}
                    {/*            position: 'relative'*/}
                    {/*          }}*/}
                    {/* >*/}
                    {/*        <a className="fl SystemParameters" style={{display:schooldata.ec_course_support_setting_url===null?"none":"block"}}*/}
                    {/*           href={schooldata.ec_course_support_setting_url}>1.课程目标</a>*/}
                    {/*        <a className="fl SystemParameters ml40"*/}
                    {/*           style={{display:schooldata.ec_course_reach_setting_url===null?"none":"block"}}*/}
                    {/*           href={schooldata.ec_course_reach_setting_url}>2.课程考核方式与数据来源</a>*/}
                    {/*        <a className="fl SystemParameters4CACFF ml40 color4D4D4D"*/}
                    {/*          href={schooldata.score_level_setting_url}*/}
                    {/*        >3.成绩等级设置</a>*/}
                    {/*        <a className="fl SystemParameters ml40"*/}
                    {/*           style={{display:schooldata.evaluation_methods_url===null?"none":"block"}}*/}
                    {/*           href={schooldata.evaluation_methods_url}>4.课程目标评价方法</a>*/}
                    {/*        <a className="fl SystemParameters ml40"*/}
                    {/*           style={{display:schooldata.competition_calculation_info_url===null?"none":"block",color:'#4CACFF'}}*/}
                    {/*           href={schooldata.competition_calculation_info_url}>5.课程达成评价结果</a>*/}
                    {/*        /!* <span className="right ml20 SystemParameters">课程体系：*/}
                    {/*  {*/}
                    {/*    evaluate_result===false?<span className="Systemnum">未达成</span>:<span className="Systemnum color-green">达成</span>*/}
                    {/*  }*/}
                    {/*  </span> *!/*/}
                    {/*        <span className={ismanager===false?"none":"right newrightcalculatebutton"}  */}
                    {/*        style={{*/}
                    {/*            marginLeft: '26px',*/}
                    {/*            position: 'absolute',*/}
                    {/*            right: '157px'*/}
                    {/*        }}*/}
                    {/*        onClick={this.newrightcalculatebutton}>计算</span>*/}
                    {/*        <span className={ismanager===false?"none":"Importclassroomdata"} style={{top: "26px"}}>*/}
                    {/*             <a className="white-btn edu-blueback-btn fr mb10 mr10" target="_blank" href={"/ec_courses/"+ec_course_id+"/export_evaluation_result.xls"}>导出评价详情</a>*/}
                    {/*        </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
								  	{/*课程目标*/}
                    <div className="ListTableLine newSystem mb20" id="school_major_list">

                        <p className="clearfix padding10im" >
                            <span className="column-1 color-666">课程目标</span>
                            <span className="column-1 operationright color-666">达成结果</span>
                            <span className="column-1 operationright color-666">达成标准(分)</span>
                            <span className="column-1 operationright color-666">实际达成</span>
                            <span className="column-1 operationright color-666">权重</span>
                        </p>
                        
                        { Spintype===true?<Spin className="Spinlarge"  indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}/>:"" }

                            { target_list.length===0&&Spintype===false?
                            <li className={ "clearfix newtarget_scoreclass lipadding10im"}>
                                <span className="column-1 color-05101A">--</span>
                                <span className="column-575 color-05101A">--</span>
                                <span className={"column-1 operationright Systemnum"}>--</span>
                                <span className="column-1 operationright color-05101A">--</span>
                                <span className="column-1 operationright">--</span>
                                <span className="column-1 operationright">--</span>
                            </li>:""}
                        
                        
                            {Spintype===false?target_list.map((item,key)=>{

                                return(
                                    <li className={key+1===target_list.length?"clearfix newtarget_target lipadding10im":"clearfix newtarget_scoreclass lipadding10im"} key={key}>
                                        <span className="column-1 color-05101A">{key+1}</span>
                                        <span className="column-575 color-05101A">{item.content}</span>
                                        <span className={item.status==="not_achieved"?"column-1 operationright Systemnum":"column-1 operationright color-green"}>{item.status==="not_achieved"?"未达成":"已达成"}</span>
                                        <span className="column-1 operationright color-05101A ">{item.standard_grade}</span>
                                        <span className="column-1 operationright">{item.actually_grade}</span>
                                        <span className="column-1 operationright">{item.weight}</span>
                                    </li>
                                )

                            }):""
                        }

                   
                    </div>
									  {/*毕业要求指标点达成评价结果*/}
                    <div className="edu-back-white eacourse">

                        <div className="padding1030" id="training_objective_contents">
                            <span className="fl SystemParameters lineheight60" style={{height:'46px'}}>   毕业要求指标点达成评价结果</span>
                            <span className="right ml20 SystemParameters" style={{height:'46px'}}>注：<span className="color-green"><i class="iconfont icon-gouxuan color-green font-16 mr5"></i></span> 代表支持指标点；<i class="iconfont icon-guanbi font-14 mr5"></i>代表不支持指标点</span>
                        </div>

                    </div>

                    <div className="ListTableLine newSystem mb20 graduateRequirement " id="school_major_list">

                    {
                        graduation_list.length===0?
                        <p className="clearfix lipadding20im" style={{minWidth:'1200px'}}>
                        <span className="column-1 color-666 mr16">毕业要求</span>
                        <span className="nowrap329">{5}</span>

                        <span className="column-1 operationright color-666">达成结果</span>
                        <span className="column-1 operationright color-666">达成目标值</span>
                        <span className="column-1 operationright color-666">达成实际值</span>
                        <span className="column-1 operationright color-666">课程权重</span>
                        {TargetresList(5)}
                    </p>
                    :""
                    }

                   { Spintype===true?<Spin className="Spinlarge"  indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}/>:"" }

                    {
                        graduation_list.length===0&&Spintype===false?
                        <li className={'clearfix newtarget_scoreclass marlr19'}  style={{minWidth:'1137px'}}>
                        {/* <span className="column-1 color-05101A ec_graduation_name">{item.ec_graduation_name}</span> */}
                        <span className="column-1 color-05101A ec_graduation_name">{1}</span>
                        <span className="column-500 color-05101A">{"--"}</span>
                        <span className={"column-1 operationright Systemnum mrj15"}>{"--"}</span>
                        <span className="column-1 operationright color-05101A">{"--"}</span>
                        <span className="column-1 operationright">{"--"}</span>
                        <span className="column-1 operationright"> <a href={`/ecs/major_schools/${this.props.match.params.majorId}/years/${this.props.match.params.yearId}/requirement_vs_courses`} style={{color:'rgb(76, 172, 255)'}}>立即配置</a></span>
                        {TargetresContentList(5,[2,2,2,2,2])}
                    </li>
                    :""
                    }
											<style>
												{
													`
													.myliysls{
															 display: flex;
										         flex-direction:initial;
									        }

													`
												}
											</style>
                    {
                        Spintype===false?graduation_list.map((item,key)=>{

                            if(key===0){
                                return(
                                    <li key={key} className="clearfix lipadding20im myliysls" style={{minWidth: ec_course_targets_count > 5 ? (76*(ec_course_targets_count+4)+380+15):1200+"px"}}>
                                       <div  className="myliysls">
																			  <span className="column-1 color-666 mr16">毕业要求</span>
																		   </div>
																			 <span className="column-500 ">{item.ec_subitem_content}</span>
																			  <div className="myliysls" >
                                        {TargetresList(ec_course_targets_count)}
                                        </div>
																			  <div className="myliysls">
                                        <span className="column-1  color-666">课程权重</span>
                                        <span className="column-1  color-666">达成目标值</span>
                                        <span className="column-1  color-666">达成实际值</span>
                                        <span className="column-1  color-666">达成结果</span>
																				</div>
                                    </li>
                                )
                            }

                        }):""
                    }
											{/*mynewtarget_scoreclassysls*/}
											<style>
												{
													`
													.myliysls{
															 display: flex;
										         flex-direction:initial;
									        }

													`
												}
											</style>
                    <div className="">
											{
												Spintype===false?graduation_list.map((item,key)=>{

													return(

														<li key={key} className="clearfix lipadding20im myliysls" style={{minWidth: ec_course_targets_count > 5 ? (76*(ec_course_targets_count+4)+380+15):1200+"px"}}>
															<div className="myliysls ">
															<span className="column-1 color-05101A mr16" >{key+1}</span>
															</div>
															<span className="column-500 color-05101A" data-tip-down={item.content}>{item.content}</span>
															<div className="myliysls">
															{TargetresContentList(target_list,item.support_course_target_ids)}
															</div>
															<div className="myliysls">
															{item.weights===null||item.weights===undefined||item.weights==="0.00"||item.weights===0.00||item.weights===0?<span className="column-1 " ><a href={`/ecs/major_schools/${this.props.match.params.majorId}/years/${this.props.match.params.yearId}/requirement_vs_courses`} style={{color:'rgb(76, 172, 255)'}}>立即配置</a></span>:<span className="column-1 " style={{textAlign:"center"}}>{item.weights}</span>}
															<span className="column-1 " style={{textAlign:"center"}}>{item.actually_achievement===null?0:item.actually_achievement}</span>
															<span className="column-1  color-05101A" style={{textAlign:"center"}}>{item.objective_achievement===null?0:item.objective_achievement}</span>
															<span className={item.status==="not_achieved"?"column-1  Systemnum mrj15":"column-1  color-green mrj15"} style={{textAlign:"center"}}>{item.status==="not_achieved"?"未完成":"完成"}</span>
															</div>
															</li>


														// <li className={key+1===target_list.length?"clearfix newtarget_scoreclass marlr19":"clearfix newtarget_scoreclass marlr19"} key={key} style={{minWidth: ec_course_targets_count > 5 ? (76*(ec_course_targets_count+4)+380):1200+"px"}}>
														// 	{/* <span className="column-1 color-05101A ec_graduation_name">{item.ec_graduation_name}</span> */}
														// 	<span className="column-1 color-05101A ec_graduation_name " >{key+1}</span>
														// 	<span className="column-500 color-05101A" data-tip-down={item.content}>{item.content}</span>
														// 	<span className={item.status==="not_achieved"?"column-1 operationright Systemnum mrj15":"column-1 operationright color-green mrj15"} style={{textAlign:"left"}}>{item.status==="not_achieved"?"未完成":"完成"}</span>
														// 	<span className="column-1 operationright color-05101A" style={{textAlign:"left"}}>{item.objective_achievement===null?0:item.objective_achievement}</span>
														// 	<span className="column-1 operationright" style={{textAlign:"left"}}>{item.actually_achievement===null?0:item.actually_achievement}</span>
														// 	{item.weights===null||item.weights===0?<span className="column-1 operationright" ><a href={schooldata.requirement_vs_courses} style={{color:'rgb(76, 172, 255)'}}>立即配置</a></span>:<span className="column-1 operationright" style={{textAlign:"left"}}>{item.weights}</span>}
														// 	{TargetresContentList(ec_course_targets_count,item.target_position)}
														// </li>
													)

												}):""
											}


										</div>

                    </div>

								   	{/*课程总评成绩表*/}
                    <div className="edu-back-white eacourse">

                        <div className="padding1030" id="training_objective_contents">
                            <span className="fl SystemParameters lineheight60" style={{height:'46px'}}>课程总评成绩表</span>
                        </div>

                    </div>

                    <div className="ListTableLine newSystem mb20" id="school_major_list">

                        <p  className="clearfix padding10im" style={{width: total_rate_data > 5 ? (180 * total_rate_data+226+16) : 1200+"px"}}>
                            {/*<span className="column-1 color-666 mr16 width86">序号</span>*/}
                            <span className="column-1 color-666 mr16 width86">课程目标</span>
                            {/*<span className="column-1 color-666 mr16">姓名</span>*/}
                            {/*<span className="column-1 color-666 mr16">学号</span>*/}
                            {TargetresLists(total_rate_data-1)}
                            <span className="column-1 operationright color-666">总评成绩</span>
                        </p>
                        {/*style={{width: 113*(total_rate_data+4)>1136?113*(total_rate_data+4.5):1136+"px"}}*/}
                        {
                            // course_total_score.map((i,k)=>{

                            //     if(k===course_total_score.length-1){

                            //         return(
                            //             <li className={"clearfix newtarget_scoreclass lipadding10im margin64px"} key={k} style={{width: 113*(total_rate_data+4)>1200?(113*(total_rate_data+4.5))+63:1200+"px"}}>
                            //                 <span className="column-1 color-05101A mr16 width86">占比</span>
                                            // {/*colorTransparent*/}
                                            // {/*<span className="column-1 color-05101A ec_graduation_name mr16 colorTransparent"> 平均数 </span>*/}
                                            // {/*<span className="column-1 color-05101A ec_graduation_name mr16 colorTransparent  "> 平均数 </span>*/}
                                            // {/* {Total_rate_dataList(total_rate_data-1,i.total_rate)}
                            //             </li>
                            //         )

                            //     }

                            // }) */}
                        }
                          { Spintype===true?<Spin className="Spinlarge"  indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}/>:"" }
                       {
                            Spintype===false? <li className={"clearfix newtarget_scoreclass lipadding10im margin64px"} style={{width: total_rate_data > 5 ? (180 * total_rate_data+226+16) : 1200 + "px"}}>
                            <span className="column-1 color-05101A mr16 width86">占比</span>
                            {/*colorTransparent*/}
                            {/*<span className="column-1 color-05101A ec_graduation_name mr16 colorTransparent"> 平均数 </span>*/}
                            {/*<span className="column-1 color-05101A ec_graduation_name mr16 colorTransparent  "> 平均数 </span>*/}
                            {Total_rate_dataList(course_total_score)}
															{
																course_rate===undefined||course_rate===null||course_rate===""||course_rate==="0"||course_rate===0? <span className="column-1 operationright">--</span>:<span className="column-1 color-red operationright">{course_rate}</span>
															}
                            </li>:""
                       }
                        {/*style={{width: 113*(total_rate_data+4)>1136?113*(total_rate_data+4):1136+"px"}}*/}
                        {
                            // course_total_score.map((i,k)=>{

                            //     if(k!=course_total_score.length-1){

                            //         return(
                            //             <li className={"clearfix newtarget_scoreclass lipadding10im"} style={{width: 113*(total_rate_data+4)>1200?(113*(total_rate_data+4.5))+63:1200+"px"}}>
                            //                 {/*<span className="column-1 color-05101A mr16 width86">{k+1}</span>*/}
                            //                 <span className="column-1 color-05101A mr16 width86">平均分</span>
                            //                 {/*<span className="column-1 color-05101A ec_graduation_name mr16">{i.student_scores.name}</span>*/}
                            //                 {/*<span className="column-1 color999 ec_graduation_name mr16  ">{i.student_scores.student_number}</span>*/}
                            //                 {newTotal_rate_dataList(total_rate_data-1,i.student_scores.target_info)}
                            //                 <span className="column-1 color-red operationright">{i.student_scores.total_score.toFixed(2)}</span>
                            //             </li>
                            //         )

                            //     }

                            // })
                        }
                        {
                             Spintype===false?<li className={"clearfix newtarget_scoreclass lipadding10im bordereaeaea"} style={{width: 113*(total_rate_data+4)>1200?(113*(total_rate_data+4.5))+63:1200+"px"}}>
                             {/*<span className="column-1 color-05101A mr16 width86">{k+1}</span>*/}
                             <span className="column-1 color-05101A mr16 width86">平均分</span>
                             {/*<span className="column-1 color-05101A ec_graduation_name mr16">{i.student_scores.name}</span>*/}
                             {/*<span className="column-1 color999 ec_graduation_name mr16  ">{i.student_scores.student_number}</span>*/}
                             {newTotal_rate_dataList(course_total_score-1,course_total_score)}
                             {/* <span className="column-1 color-red operationright">{course_total_score.length===0?"":course_total_score[course_total_score-1].total_score}</span> */}
                             {
															 course_achievement===undefined||course_achievement===null||course_achievement===""||course_achievement==="0"||course_achievement===0? <span className="column-1 operationright">--</span>:<span className="column-1 color-red operationright">{course_achievement}</span>
                             }
                              </li>:""
                        }


                        <li class="clearfix newtarget_scoreclass" style={{width: 113*(total_rate_data+4)>1136?113*(total_rate_data+4):1136+"px",display:morelisttype===true?"block":"none"}}>
                            <a className={"ecmorelist"} onClick={()=>this.showmorelist()}>加载更多</a>
                        </li>
                    </div>



                    <div className="edu-back-white eacourse">

                        <div className="padding1030" id="training_objective_contents">
                            <span className="fl SystemParameters lineheight60" style={{height:'46px'}}>课程目标成绩分析</span>
                        </div>

                    </div>


                    <div className="ListTableLine newSystem mb20" id="school_major_list">

                        <p  className="clearfix padding10im">
                            <span className="column-1 color-666">课程目标</span>
                            <span className="column-1 color-666">平均分</span>
                            <span className="column-1 color-666">最高分数</span>
                            <span className="column-1 color-666">最低分数</span>
													{
														score_levels&&score_levels.map((i,k)=>{
															return(
																<span className="column-1 color-666">{i.description}</span>
															)
														})
													}
                        </p>

                        {
                            Spintype===false?target_list.map((i,k)=>{

                                return(
                                    <li className={"clearfix newtarget_scoreclass lipadding10im"} key={k}>
                                        <span className="column-1 color-05101A">{k+1}</span>
                                        <span className="column-1 color-05101A">{i.standard_grade}</span>
                                        <span className="column-1 colorFF6800">{i.maximum_score===null || i.maximum_score===undefined ||i.maximum_score===""?"--":i.maximum_score}</span>
                                        <span className="column-1 color-green">{i.minimum_score===null || i.minimum_score===undefined || i.minimum_score===""?"--":i.minimum_score}</span>
                                        {
                                            i.score_levels.map((j,l)=>{

                                                return(
                                                  <span key={l} className="column-1 color-05101A">
                                                        <div>{j.count}人</div>
                                                        <div className="color999">{j.rate===null||j.rate===undefined||j.rate===""||j.rate===0?0.00:j.rate}%</div>
                                                  </span>
                                                )
                                            }
                                            )
                                        }

                                        {/*}*/}
                                        {/*<span className="column-1 color-05101A">*/}
                                        {/*      <div>{i.from90[0]}人</div>*/}
                                        {/*      <div className="color999">{(i.from90[1]).toFixed(2)}%</div>*/}
                                        {/*</span>*/}
                                        {/*<span className="column-1 color-05101A">*/}
                                        {/*      <div>{i.from80[0]}人</div>*/}
                                        {/*      <div className="color999">{(i.from80[1]).toFixed(2)}%</div>*/}
                                        {/*</span>*/}
                                        {/*<span className="column-1 color-05101A">*/}
                                        {/*      <div>{i.from70[0]}人</div>*/}
                                        {/*      <div className="color999">{(i.from70[1]).toFixed(2)}%</div>*/}
                                        {/*</span>*/}
                                        {/*<span className="column-1 color-05101A">*/}
                                        {/*      <div>{i.from60[0]}人</div>*/}
                                        {/*      <div className="color999">{(i.from60[1]).toFixed(2)}%</div>*/}
                                        {/*</span>*/}
                                        {/*<span className="column-1 color-05101A">*/}
                                        {/*      <div>{i.from50[0]}人</div>*/}
                                        {/*      <div className="color999">{(i.from50[1]).toFixed(2)}%</div>*/}
                                        {/*</span>*/}
                                        {/*<span className="column-1 color-05101A">*/}
                                        {/*      <div>{i.from_down[0]}人</div>*/}
                                        {/*      <div className="color999">{(i.from_down[1]).toFixed(2)}%</div>*/}
                                        {/*</span>*/}

                                    </li>
                                )

                            }):""
                        }

                            { Spintype===true?<Spin className="Spinlarge"  indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}/>:"" }

                            {target_list.length===0&&Spintype===false?
                                    <li className={"clearfix newtarget_scoreclass lipadding10im"}>
                                        <span className="column-1 color-05101A">--</span>
                                        <span className="column-1 color-05101A">--</span>
                                        <span className="column-1 colorFF6800">--</span>
                                        <span className="column-1 color-green">--</span>
                                        <span className="column-1 color-05101A">
                                              <div>--人</div>
                                              <div className="color999">--%</div>
                                        </span>
                                        <span className="column-1 color-05101A">
                                              <div>--人</div>
                                              <div className="color999">--%</div>
                                        </span>
                                        <span className="column-1 color-05101A">
                                              <div>--人</div>
                                              <div className="color999">--%</div>
                                        </span>
                                        <span className="column-1 color-05101A">
                                              <div>--人</div>
                                              <div className="color999">--%</div>
                                        </span>
                                        <span className="column-1 color-05101A">
                                              <div>--人</div>
                                              <div className="color999">--%</div>
                                        </span>
                                        <span className="column-1 color-05101A">
                                              <div>--人</div>
                                              <div className="color999">--%</div>
                                        </span>
                                    </li>:""}
               
                    </div>

                </div>
            </div>
        );
    }
}

export default SnackbarHOC() (EcCompletionCalculation);

