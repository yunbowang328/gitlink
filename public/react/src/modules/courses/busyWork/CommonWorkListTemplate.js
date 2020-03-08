import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { WordsBtn } from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
import CoursesListType from '../coursesPublic/CoursesListType';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import moment from 'moment';
import '../css/Courses.css'
const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype=true;
const $ = window.$;
const Search = Input.Search;
const RadioGroup = Radio.Group;

function scrollTo(className) {
  $("html").animate({ scrollTop: $(`${className}`).offset().top - 400 })
}


function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
    // disabledSeconds: () => [55, 56],
  };
}
function handleDateString (dateString) {
  if (!dateString) return dateString;
  const ar = dateString.split(':')
  if (ar[1] != '00' && ar[1] != '30') {
    return [ar[0], '00'].join(':')
  }
  return dateString
}
// 类似页面 http://localhost:3007/courses/1309/graduation/graduation_tasks/48/76/setting
class CommonWorkSetting extends Component{

  constructor(props){
    super(props)
    this.state={
      course_name:"",
      homework_name:"",

    }
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD HH:mm';

    let {course_name, homework_name
    } =this.state;

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let task_Id=this.props.match.params.task_Id;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };


    return(
      <React.Fragment>
        { <div>

          <div className="newMain clearfix">
            <div className={"educontent mb20"}>

              <p className="clearfix mt10">
                <WordsBtn style="grey" className="fl">  <Link to={"/courses/"+courseId} className="color-grey-6">{course_name}</Link></WordsBtn>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <WordsBtn style="grey" className="fl"> <Link to={"/courses/"+courseId+"/graduation"} className="color-grey-6">毕设任务</Link></WordsBtn>
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                <span>任务详情</span>
              </p>

              <div style={{ width:'100%',height:'75px'}} >
                <p className=" fl color-black mt25 summaryname">
                  <Link to={"/courses/"+courseId+"/graduation"+"/graduation_tasks/"}>{homework_name}</Link>
                </p>
                <CoursesListType
                  typelist={["已开启补交"]}
                  typesylename={"mt22"}
                />
                <a className="color-grey-6 fr font-16 ml30 mt10 mr20" onClick={this.goback}>返回</a>
              </div>

              <div className="stud-class-set bor-bottom-greyE">
                <div className="mt10 clearfix edu-back-white poll_list pl20">
                  <Link
                        className="active"
                        to={"/courses/"+courseId+"/graduation/graduation_tasks/"+category_id+"/"+task_Id+"/list"}>作品列表</Link>
                  <Link to={"/courses/"+courseId+"/graduation/graduation_tasks/"+category_id+"/"+task_Id+"/questions"}>作业描述</Link>
                  <Link to={"/courses/"+courseId+"/graduation/graduation_tasks/"+category_id+"/"+task_Id+"/questions"}>参考答案</Link>
                  <Link
                        style={{paddingLeft:'38px'}}
                        to={"/courses/"+courseId+"/graduation/graduation_tasks/"+category_id+"/"+task_Id+"/setting"}>设置</Link>

                  <a className={"fr color-blue font-16"} onClick={() => { this.end()} }>立即截止</a>
                  <a className={"fr color-blue font-16"} onClick={() => { this.publish()} }>立即发布</a>

                  <a className={"fr color-blue font-16"} href={"/courses/"+courseId+"/graduation/graduation_tasks/"+task_Id+"/edit"}>编辑作业</a>

                </div>
              </div>


            </div>
            </div>
        </div>}


      </React.Fragment>

    )
  }
}

const CommonWorkSettingForm = Form.create({ name: 'commonworkSettingForm' })(CommonWorkSetting);
export default CommonWorkSettingForm;
