import React, { Component } from 'react';

import moment from 'moment'

import EditableCourseSupportSetting from './EditableCourseSupportSetting'
import ShowTableCourseSupportSetting from './ShowTableCourseSupportSetting'

import { Form, Input, Icon, Button, Select } from 'antd';

// import EcTitleCourseEvaluations from '../ecTitle/ecTitle'

import { SnackbarHOC, getUrl } from 'educoder'
import axios from 'axios'
import 'antd/dist/antd.css';
// import '../css/ecCourseEvaluations.css'
import './style.scss'
import { ECModalHOC } from '../../common/ECModalHOC'
const { Option } = Select;

// TODO 公共方法 或 抽取到顶层组件
let _url_origin = getUrl()
const $ = window.$
// https://www.educoder.net/stylesheets/educoder/edu-all.css?1546618720
// if (!window['EcCourseSupportSettingLoaded']) {
//     $('head').append( $('<link rel="stylesheet" type="text/css" />')
//         .attr('href', `${_url_origin}/stylesheets/educoder/edu-all.css?1525440977`) );
//     window['EcCourseSupportSettingLoaded'] = true
// }



class EcCourseSupportSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
        editableMode: false,
        requirements: []
    }
  }
  updateCourseTargets = (course_targets) => {
    const ec_course_id = this.props.match.params.ec_course_id;

    const url = `/ec_courses/${ec_course_id}/crud_targets`

    // 后台数据存的weigths
    course_targets.forEach( (item,index) => {
        course_targets[index].weigths = item.target_weight
        delete course_targets[index].target_weight
    })
    axios.post(url, {
        "targets": course_targets
        }
    ).then((response) => {
        if (!response.data || response.data.status == -1) {
            this.props.showModal('提示', '接口异常或无数据')
            return ;
        }
        let map = this.getSubitemIdMap()
        course_targets.forEach( (item,index) => {
            course_targets[index].target_weight = item.weigths
            course_targets[index].index = map[item.subitem_id].index
            course_targets[index].subitem_contents = map[item.subitem_id].subitem_contents
            delete course_targets[index].weigths
        })
        // subitem_contents
        this.setState({ course_targets })
        this.setEditableMode(false)
    }).catch((error) => {
        console.log(error)
    })  

    
  }
  getSubitemIdMap = () => {
    if (!this.state.requirements) {
        return {}
    }
    let map = {}
    this.state.requirements.forEach( (item,index) => {
        map[item.subitem_id] = item
    })
    return map;
  }
  fetchRequirements = () => {
    const url = `/ec_years/${this.props.year.id}/graduation_subitems.json`  
    
    axios.get(url, {

        })
        .then((response) => {
            if (response.data && response.data.graduation_subitems) {
                const requirements = response.data.graduation_subitems.map((item, index) => {
                    return {
                        index: `${item.graduation_requirement_position}-${item.position}`,
                        subitem_contents: item.content,
                        subitem_id: item.id,
                    }
                })
                this.setState({ requirements })
            } else {
                this.props.showModal('提示', '接口异常或无数据')
                // 服务端返回的数据有误
            }

        })
        .catch(function (error) {
            console.log(error);
        });
  }
  fetchCourseTargets = () => {
     const ec_course_id = this.props.match.params.ec_course_id;
     //这里给了一个默认的参数。。。。。。。。。。。。。
    const course_id = 706
    const url = `/ec_courses/${course_id}/course_targets.json`
    // `/ec_courses/${ec_course_id}/ec_course_support_setting_data`

    axios.get(url, {
    
        })
        .then((response) => {
            if (response.data && response.data.course_targets) {
                if (response.data.course_targets.length === 0) {
                    response.data.course_targets = [
                        {"target_contents":"","target_weight":'',"position": 1,"standard_grade":75,"subitem_id":"","index":"","subitem_contents":""},
                        {"target_contents":"","target_weight":'',"position": 2,"standard_grade":75,"subitem_id":"","index":"","subitem_contents":""},
                        {"target_contents":"","target_weight":'',"position": 3,"standard_grade":75,"subitem_id":"","index":"","subitem_contents":""},
                    ]
                    this.setEditableMode(true)
                } else {
                    response.data.course_targets = response.data.course_targets.map((item, index) => {
                        const graduation_subitem = item.graduation_subitem
                        return {
                            index: `${graduation_subitem.position}-${graduation_subitem.graduation_requirement_position}`,
                            position: index + 1,
                            standard_grade: item.standard_grade,
                            subitem_contents: graduation_subitem.content,
                            subitem_id: graduation_subitem.id,
                            target_contents: item.content,
                            target_id: item.id,
                            target_weight: item.weight
                        }
                    })
                }
                this.setState({ ...response.data })
            } else {
                this.props.showModal('提示', '接口异常或无数据')
                // 服务端返回的数据有误
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    
    
    // test data 
    // this.setState({ ...fake_data })
    
  }
  getNavigationData=(ec_course_id)=>{
      return;
        // const jol =`/ec_major_schools/get_navigation_data?ec_year_id=`+ec_year_id+"&ec_course_id="+ec_course_id;
        const jol =`/ec_major_schools/get_navigation_data?ec_course_id=`+ec_course_id;
        axios.get(jol, {
            // withCredentials: true,
        })
            .then((response) => {
                if(response.status===200){
                    // if(response.data.allow_visit===false){
                    //     window.location.href="/403"
                    //  }
                    this.setState({
                        schooldata:response.data
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
  componentDidMount = () => {
    // console.log('componentDidMountEcCourseSupportSetting');
    // console.log(this.props);
    // console.log(this.props.match);
    // console.log(this.props.match.params);
    // console.log(this.props.match.params.ec_course_id);

    this.fetchCourseTargets();
    const ec_course_id = this.props.match.params.ec_course_id;

    this.getNavigationData(ec_course_id);
    this.props.Ontitine("ec_course_support_setting");
  }
  
  setEditableMode = (mode) => {
    if (mode) {
        this.fetchRequirements()
    }
    this.setState({ editableMode: mode })
  }
  
  render() {
    let { editableMode, schooldata, is_manager } = this.state;
    if (!schooldata) schooldata = {}
    const course_targets = this.state.course_targets;

    return (
        <React.Fragment>
       {/* <div className="newMain clearfix courseSupport">
         <div className="educontent mb50 mt60">
         </div>
       </div> */}

            {/* <EcTitleCourseEvaluations
                {...this.props}
                schooldata={schooldata}
                ecComponentState={'ecCompletion'}
                ecpath={"ec_course_support_setting"}
            ></EcTitleCourseEvaluations> */}

            {/* <p class="clearfix padding20-30 bor-bottom-greyE">
                <span class="fl font-18">
                    <a href="/ec_major_schools/1/academic_years/1/ec_course_setting" class="color-grey-9">课程体系</a>
                    <span class="color-grey-9"> &gt; </span>
                    {schooldata && ( schooldata.ec_course_name || '')}
                </span>
                <a href="/ec_courses/1/export_ec_course_targets.xls" class="white-btn edu-blueback-btn fr"
                    style={{ 'marginTop': '4px' }}
                >导出课程目标</a>
            </p> */}

            {/* <div className="edu-back-white eacourse">

                <p className="clearfix padding20-30 bor-bottom-greyE" id="SystemParametersP">
                    <a href={schooldata.course_setting_url} className="TrainingLecturer color-grey-9">课程体系 </a> >
                    <a className="TrainingTheory major_name"> {schooldata.ec_course_name}</a>
                            
                    <span className="Importclassroomdata" style={{top: '22px'}}>
                        <a className="white-btn edu-blueback-btn fr mb10 mr10"
                            href={`/ec_courses/${this.props.match.params.ec_course_id}/export_ec_course_targets?format=xls`}
                            >导出课程目标</a>
                    </span>
                </p>

                <div style={{padding: '20px 21px'}} id="SystemParameters" className={"SystemParameters"}>
                
                    <a className="fl SystemParameters color4CACFF" style={{display:schooldata.ec_course_support_setting_url===null?"none":"block",marginLeft: '8px' }}
                        href={schooldata.ec_course_support_setting_url}>1.课程目标</a>
                    <a className="fl SystemParameters4CACFF ml40 color4D4D4D"
                        style={{display:schooldata.ec_course_reach_setting_url===null?"none":"block"}}
                        href={schooldata.ec_course_reach_setting_url}>2.课程考核方式与数据来源</a>
                    <a className="fl SystemParameters4CACFF ml40 color4D4D4D"
                        href={schooldata.score_level_setting_url}
                        >3.成绩等级设置</a>
                    <a className="fl SystemParameters4CACFF ml40 color4D4D4D"
                        style={{display:schooldata.evaluation_methods_url===null?"none":"block"}}
                        href={schooldata.evaluation_methods_url}>4.课程目标评价方法</a>
                    <a className="fl SystemParameters ml40 color4D4D4D"
                        style={{display:schooldata.competition_calculation_info_url===null?"none":"block"}}
                        href={schooldata.competition_calculation_info_url}>5.课程达成评价结果</a>

                </div>
            </div> */}

          {/* && is_manager  */}
          <div>
          { course_targets&&course_targets.length>=0 ? (editableMode ? 
              <EditableCourseSupportSetting
                  setEditableMode={this.setEditableMode}
                  {...this.props}
                  {...this.state}
                  updateCourseTargets={this.updateCourseTargets}
                ></EditableCourseSupportSetting>
              : <ShowTableCourseSupportSetting
                  setEditableMode={this.setEditableMode}
                  {...this.props}
                  {...this.state}
                ></ShowTableCourseSupportSetting> ) : ''
          }
          </div>

          {/* <EditableCourseSupportSetting
            setEditableMode={this.setEditableMode}
          ></EditableCourseSupportSetting>
          <ShowTableCourseSupportSetting
            setEditableMode={this.setEditableMode}
          ></ShowTableCourseSupportSetting> */}
        </React.Fragment>
    );
  }
}

export default ECModalHOC() ( SnackbarHOC() (   ( EcCourseSupportSetting ) ) );
