import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox, message,
  Row, Col, Select, Modal, Tooltip
} from 'antd';
import axios from 'axios'

import {getUrl, ActionBtn, markdownToHTML} from 'educoder';

import SingleDisplay from './new/SingleDisplay'
import JudgeDisplay from './new/JudgeDisplay'
import NullDisplay from './new/NullDisplay'
import MainDisplay from './new/MainDisplay'
import ShixunDisplay from './new/ShixunDisplay'
import './new/common.css'
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

const tagArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

class ExerciseDisplay extends Component{
  constructor(props){
    super(props);


    this.state = {
      exercise_questions: [],
      exercise_group_id:[],
      page:1,
      limit:10,
      searchtext:"",
      order: "end_at",
    }
  }
  _getRequestParams() {
    const { order, exercise_group_id,searchtext, page ,limit} = this.state
    return {
      page,
      search:searchtext,
      order,
      limit: limit,
      group_id:exercise_group_id,
    }
  }
  componentDidMount = () => {
    const Id = this.props.match.params.Id    
    if (Id) {
      const url = `/${this.props.urlPath || 'exercises'}/${Id}.json`
      axios.get(url)
        .then((response) => {
          if (response.data.exercise) {
            response.data.exercise.exercise_description = response.data.exercise.exercise_description || response.data.exercise.description
            response.data.exercise.exercise_name = response.data.exercise.exercise_name || response.data.exercise.name
            response.data.exercise.exercise_status = response.data.exercise.exercise_status == undefined ? 1 : response.data.exercise.exercise_status
            this.setState({...response.data})
            this.props.detailFetchCallback && this.props.detailFetchCallback(response);
          } else {
            this.props.detailFetchCallback && this.props.detailFetchCallback(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    try {
      this.props.triggerRef(this);
    }catch (e) {

    }
  }
  _getRequestParams() {
    const { order, exercise_group_id,searchtext, page ,limit} = this.state
    return {
      page,
      search:searchtext,
      order,
      limit: limit,
      group_id:exercise_group_id,
    }
  }
  render() {
    // let { question_title, question_score, question_type, question_choices, standard_answer,
    //     question_id, question_number, index, displayCount,
    //     multi_count
    //  } = this.props;
    const { exercise_questions,exercise,exercise_types} = this.state;

    // // const { getFieldDecorator } = this.props.form;

    // const isAdmin = this.props.isAdmin()
    // const courseId=this.props.match.params.coursesId;
    // const isEdit = this.isEdit
    // const qNumber = `question_${index}`;
    // let length = 5;
    // const qName = qNameArray[question_type]
    const commonHandler = {}

    return(
        <div className="edu-back-white">
          <div className={" padding20-30"}>
            <style>
              {
                `
                .center{
                  text-align: center;
                }
                .edu-back-white>.bor-bottom-greyE:last-child {
                  border-bottom: none !important;
                }
                `
              }
            </style>
            <div className={"font-18 center"}>{exercise&&exercise.exercise_name}</div>
            <div className={"font-14 color-grey-9"}>{exercise&&exercise.exercise_description}</div>
          </div>
					<div className={" padding20-30 newContainer"}>
						<p className="  clearfix">
							{
								exercise_types && exercise_types.q_singles > 0 &&
								<span className="color-grey-9 mr15">单选题 {exercise_types.q_singles} 题,共 {exercise_types && exercise_types.q_singles_scores} 分</span>
							}
							{
								exercise_types && exercise_types.q_doubles > 0 &&
								<span className="color-grey-9 mr15">多选题 {exercise_types.q_doubles} 题,共 {exercise_types && exercise_types.q_doubles_scores} 分</span>
							}
							{
								exercise_types && exercise_types.q_judges > 0 &&
								<span className="color-grey-9 mr15">判断题 {exercise_types.q_judges} 题,共 {exercise_types && exercise_types.q_judges_scores} 分</span>
							}
							{
								exercise_types && exercise_types.q_nulls > 0 &&
								<span className="color-grey-9 mr15">填空题 {exercise_types.q_nulls} 题,共 {exercise_types && exercise_types.q_nulls_scores} 分</span>
							}
							{
								exercise_types && exercise_types.q_mains > 0 &&
								<span className="color-grey-9 mr15">简答题 {exercise_types.q_mains} 题,共 {exercise_types && exercise_types.q_mains_scores} 分</span>
							}
							{
								exercise_types && exercise_types.q_shixuns > 0 &&
								<span className="color-grey-9 mr15">实训题 {exercise_types.q_shixuns} 题,共 {exercise_types && exercise_types.q_shixuns_scores} 分</span>
							}
							<span className="color-grey-3 fr">共<span className="color-orange-tip"> {exercise_types &&exercise_types.q_scores} </span>分</span>
							<span className="color-grey-3 fr">合计<span className="color-blue"> {exercise_types &&exercise_types.q_counts} </span>题：</span>
						</p>
					</div>
          { exercise_questions.map((item, index) => {
            if (item.question_type == 0 || item.question_type == 1) {
              
              
                return <SingleDisplay {...this.props} {...item} index={index} {...commonHandler}
                    displayCount={exercise_questions.length} showActionButton={false} key={index}
                ></SingleDisplay>
              
            } else if (item.question_type == 2) {
              
              
                return <JudgeDisplay 
                      showActionButton={false} key={index}
                      {...this.props} {...item} index={index} {...commonHandler} ></JudgeDisplay>
              
            } else if (item.question_type == 3) {
              
              
                return <NullDisplay 
                      showActionButton={false} key={index}
                      {...this.props} {...item} index={index} {...commonHandler} ></NullDisplay>
              
            } else if (item.question_type == 4) {
              
              
                return <MainDisplay 
                      showActionButton={false} key={index}
                      {...this.props} {...item} index={index} {...commonHandler} ></MainDisplay>
              
            } else if (item.question_type == 5) {
              
              
                return <ShixunDisplay Testpapersettinghomepage
                      showActionButton={false} key={index}
                      {...this.props} {...item} index={index} {...commonHandler} ></ShixunDisplay>
              
            }
            return <div></div>
          })}
        </div>
      )
    }
}
// RouteHOC()
export default (ExerciseDisplay);