import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Steps, Breadcrumb } from 'antd';
import axios from 'axios';

import './index.scss';

import CustomLoadable from "../../../CustomLoadable";
import Loadable from 'react-loadable';
import Loading from "../../../Loading";
const { Step } = Steps;
const steps = ["培养目标", "毕业要求", "培养目标VS毕业要求", "毕业要求VS通用标准", "学生", "课程体系", "课程体系VS毕业要求", "达成度评价结果"];
const stepTypes = ["training_objectives", "graduation_requirement", "requirement_vs_objective", "requirement_vs_standard", "students", "courses", "requirement_vs_courses", "reach_calculation_info"];
const EcStudentList=Loadable({
  loader: () => import('../subroute/ecStudentList/EcStudentList'),
  loading: Loading,
});
const Curriculum=Loadable({
  loader: () => import('../../../modules/ecs/curriculum/Curriculum'),
  loading: Loading,
});
const CurriculumSubpage=Loadable({
  loader: () => import('../../../modules/ecs/curriculum/CurriculumSubpage'),
  loading: Loading,
});

const TrainingObjective=Loadable({
  loader: () => import('./TrainingObjective/index'),
  loading: Loading,
});
const GraduationRequirement=Loadable({
  loader: () => import('./GraduationRequirement/index'),
  loading: Loading,
});
const CourseSupports=Loadable({
  loader: () => import('./CourseSupports/index'),
  loading: Loading,
});
const ReachCalculationInfo=Loadable({
  loader: () => import('./reachCalculationInfo/index'),
  loading: Loading,
});
const RequirementVsObjective=Loadable({
  loader: () => import('./RequirementVsObjective/index'),
  loading: Loading,
});
const RequirementVsStandard=Loadable({
  loader: () => import('./RequirementVsStandard/index'),
  loading: Loading,
});


class EcSetting extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      schoolId: null,
      majorId: props.match.params.majorId,
      yearId: props.match.params.yearId,
      year: null,

      stepIndex: 0,
    }
  }

  componentDidMount() {
    this.setupStep();
    this.getYearDetail();
  }

  getYearDetail = () => {
    let { majorId, yearId } = this.state;
    axios.get(`/ec_major_schools/${majorId}/ec_years/${yearId}.json`).then(res => {
      if(res){
        this.setState({ year: res.data, schoolId: res.data.school_id })
      }
    }).catch(e => console.log(e))
  }

  onStepChange = (stepIndex) => {
    let { majorId, yearId } = this.state;
    let type = stepTypes[stepIndex];

    this.setState({ stepIndex: stepIndex });
    // if(type==="courses"){
    //   this.props.history.push(`/ecs/major_schools/${majorId}/years/${yearId}/${type}/ec_course_support_setting/1`);
    // }else {
      this.props.history.push(`/ecs/major_schools/${majorId}/years/${yearId}/${type}`);
    // }
  }

  setupStep = () => {
    let type = this.props.match.params.type;

    let stepIndex = stepTypes.indexOf(type);
    this.setState({ stepIndex: stepIndex });
  }

  render() {
    let { year, schoolId, majorId, yearId } = this.state;
    let { stepIndex } = this.state;

    return (
      <div>
        <div className="ec-page">
          <div className="educontent ec-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item key="department">
                <Link to={`/ecs/department?school_id=${schoolId}`}>{ year && year.school_name }</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="major-school">
                <Link to={`/ecs/major_schools/${majorId}`}>{ year && year.major_name }</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="year">{year && year.year}届</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="educontent ec-steps">
            <Steps type="navigation"
                   size='small'
                   className="ec-steps-box"
                   current={stepIndex}
                   onChange={this.onStepChange}>

              {
                steps.map((title, index) => {
                  return (
                    <Step subTitle={title} status={index === stepIndex ? 'process' : 'wait'} key={index}/>
                  )
                })
              }
            </Steps>
          </div>

          {
            year && (
              <Switch>
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/training_objectives'
                       render={ (props) => (<TrainingObjective {...this.props} {...props} {...this.state} />) }></Route>
								<Route extra path='/ecs/major_schools/:majorId/years/:yearId/graduation_requirement'
											 render={ (props) => (<GraduationRequirement {...this.props} {...props} {...this.state} />) }></Route>
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/graduation_requirement'
											 render={ (props) => (<GraduationRequirement {...this.props} {...props} {...this.state} />) }></Route>

                {/* 毕业要求对培养目标的支撑 */}
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/requirement_vs_objective'
											 render={ (props) => (<RequirementVsObjective {...this.props} {...props} {...this.state} />) }></Route>
                {/* 毕业要求对通用标准的支撑 */}
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/requirement_vs_standard'
											 render={ (props) => (<RequirementVsStandard {...this.props} {...props} {...this.state} />) }></Route>
               
                {/*学生*/}
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/students'
                       render={ (props) => (<EcStudentList {...this.props} {...props} {...this.state} />) }></Route>
                {/*课程体系*/}
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses/subpage'
                       render={ (props) => (<Curriculum {...this.props} {...props} {...this.state} />) }></Route>
                {/*课程体系资源子页面Subpage*/}
                <Route extra path='/ecs/major_schools/:majorId/years/:yearId/courses'
                       render={ (props) => (<CurriculumSubpage {...this.props} {...props} {...this.state} />) }></Route>
                {/*课程体系VS毕业要求*/}
								<Route extra path='/ecs/major_schools/:major_school_id/years/:ec_year_id/requirement_vs_courses'
											 render={ (props) => (<CourseSupports {...this.props} {...props} {...this.state} />) }></Route>
								{/*达成度评价结果*/}
								<Route extra path='/ecs/major_schools/:major_school_id/years/:ec_year_id/reach_calculation_info'
											 render={ (props) => (<ReachCalculationInfo {...this.props} {...props} {...this.state} />) }></Route>

              </Switch>
            )
          }
        </div>
      </div>
    )
  }
}

export default EcSetting