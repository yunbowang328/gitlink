import React, { Component } from 'react';
import './ecTitle.css';

class EcTitleCourseEvaluations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schooldata:{},
            ecComponentState:"",
            ecpaths:""
        }
    }
    componentWillReceiveProps(nextProps){
        const {schooldata,ecComponentState,ecpath}=nextProps;
        this.setState({
            schooldata:schooldata,
            ecComponentState:ecComponentState,
            ecpaths:ecpath
        })
    }

    render() {
        let{schooldata,ecComponentState,ecpaths}=this.state;

        return (
            <div>
                <div className="mb10 mt10 eaSystemp">

                    <a href={schooldata.user_url}>{schooldata.user_name===undefined?"":schooldata.user_name+" > "}</a>
                    <a href={schooldata.school_url}>{schooldata.school_name===undefined?"":schooldata.school_name+"认证"}</a>
                    <a href={schooldata.major_url}>{schooldata.school_name===undefined?"":" >  "+schooldata.major_name+" > "}</a>
                    <span> {schooldata.school_name===undefined?"":schooldata.year+"届"}</span>

                </div>

                <ul className="clearfix mb0 traningNavs " id="traningNav" style={{display:ecpaths==='none'?"none":"flex"}}>
                    <li className={"ecimgs"}>
                        <a className={"ecTitle ecTitles"} >1</a>
                        <a className={"ecTitlefont"} href={schooldata.major_training}>培养目标</a>
                    </li>
                    <li className={"ecimgs"}>
                        <a className={"ecTitle ecTitles"} >2</a>
                        <a className={"ecTitlefont"} href={schooldata.graduation_requirement_url} >毕业要求</a>
                    </li>
                    <li className={"ecimgs"}>
                        <a className={"ecTitle ecTitles"} >3</a>
                        <a className={"ecTitlefont"} href={schooldata.requirement_vs_objective_url}>毕业要求 vs 培养目标</a>
                    </li>
                    <li className={"ecimgs"}>
                        <a className={"ecTitle ecTitles"} >4</a>
                        <a className={"ecTitlefont"} href={schooldata.requirement_vs_standard}>毕业要求 vs 通用标准</a>
                    </li>
                    <li className={ecpaths==="ecStudentList"?"ecimgs11":"ecimgs"} style={{width: ecpaths==="ecStudentList"?'126px':'83px'}}>
                        <a className={ ecpaths==="ecStudentList"?"ml18 ecTitleFFF ecTitles":"ecTitle"} >5</a>
                        <a  className={ ecpaths==="ecStudentList"?"ecTitlefontFFF":"ecTitlefont"} href={schooldata.students_url}>学生</a>
                    </li>
                    <li className={ecpaths==="ec_course_support_setting"||ecpaths==="show"?"ecimgs11":"ecimgs"}>
                        <a className={ ecpaths==="ec_course_support_setting"||ecpaths==="show"?"ml18 ecTitleFFF ecTitles":"ecTitle ecTitles"} >6</a>
                        <a  className={ ecpaths==="ec_course_support_setting"||ecpaths==="show"?"ecTitlefontFFF":"ecTitlefont"} href={schooldata.course_setting_url}>课程体系</a>
                    </li>
                    <li className={ecpaths==="requirement_vs_courses"?"ecimgs3":"ecimgs"}>
                        <a className={ ecpaths==="requirement_vs_courses"?"ecmarginleft ecTitleFFF ecTitles":"ecTitle ecTitles"} >7</a>
                        <a className={ ecpaths==="requirement_vs_courses"?"ecTitlefontFFF":"ecTitlefont"} href={schooldata.requirement_vs_courses}>课程体系 vs 毕业要求</a>
                    </li>
                    <li className={ecpaths==="reach_calculation_info"?"ecimgs2 info2":"ecimgs"}>
                        <a className={ ecpaths==="reach_calculation_info"?"ecTitleFFF ml18 ecTitles":"ecTitle ecTitles"} >8</a>
                        <a className={ ecpaths==="reach_calculation_info"?"ecTitlefontFFF":"ecTitlefont"} href={schooldata.reach_calculation_info_url}>达成度评价结果</a>
                    </li>
                    {/*<li className={ecComponentState==="ecCourseSupports"?"active edu-menu-panel":"edu-menu-panel"}>*/}
                    {/*<a>毕业要求</a>*/}
                    {/*<i className="iconfont icon-xiajiantou font-14 ml5" style={{display:ecComponentState==="ecCourseSupports"?"inline-block":"none"}}></i>*/}
                    {/*<ul className="edu-menu-list" style={{width:'200px',right:'unset',top:'34px'}}>*/}
                    {/*<li><a href={schooldata.major_training} >专业培养目标</a></li>*/}
                    {/*<li><a href={schooldata.graduation_requirement_url} >毕业要求指标点</a></li>*/}
                    {/*<li><a href={schooldata.requirement_vs_objective_url} >毕业要求vs培养目标</a></li>*/}
                    {/*<li><a href={schooldata.requirement_vs_standard} >毕业要求vs通用要求</a></li>*/}
                    {/*<li><a href={schooldata.requirement_vs_courses} >毕业要求vs课程体系</a></li>*/}
                    {/*</ul>*/}
                    {/*</li>*/}

                    {/*<li className={ecComponentState==="ecCourseEvaluations"?"active edu-menu-panel":"edu-menu-panel"}>*/}
                    {/*<a href={schooldata.course_setting_url}>课程配置</a>*/}
                    {/*</li>*/}

                    {/*<li className={ecComponentState==="ecCompletion"?"active edu-menu-panel":"edu-menu-panel"}>*/}
                    {/*<a>达成度计算</a>*/}
                    {/*<i className="iconfont icon-xiajiantou font-14 ml5" style={{display:ecComponentState==="ecCompletion"?"inline-block":"none"}}></i>*/}
                    {/*<ul className="edu-menu-list" style={{width:'200px',right:'unset',top:'34px'}}>*/}
                    {/*<li><a href={schooldata.completion_calculation_url}>课程达成计算</a></li>*/}
                    {/*<li><a href={schooldata.reach_calculation_info_url}>毕业要求指标点达成计算</a></li>*/}
                    {/*</ul>*/}
                    {/*</li>*/}
                    {/*<a className="fr color-grey-6 font-16" href={schooldata.go_back_url}>返回</a>*/}

                </ul>
            </div>
        )}
}

export default EcTitleCourseEvaluations;