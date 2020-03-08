import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { WordsBtn, MarkdownToHtml, on, off } from 'educoder';
import axios from 'axios';
import Modals from '../../modals/Modals';
import CoursesListType from '../coursesPublic/CoursesListType';
import HomeworkModal from "../coursesPublic/HomeworkModal";
import CheckAllGroup from '../common/button/CheckAllGroup'
import moment from 'moment';
import CheckCodeModal from '../coursesPublic/modal/CheckCodeModal'
import NoneData from '../coursesPublic/NoneData'

import '../css/Courses.css'
import WorkDetailPageHeader from './common/WorkDetailPageHeader'
import TabRightComponents from './common/TabRightComponents'

const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype=true;
const $ = window.$;
const Search = Input.Search;
const RadioGroup = Radio.Group;

class CommonWorkAnswer extends Component{

  constructor(props){
    super(props)
    this.state={
      course_name:"",
      homework_name:"",
      search: ''
    }
  }
  fetchData = () => {
    let workId=this.props.match.params.workId;
    const url = `/homework_commons/${workId}/reference_answer.json`

    axios.get(url).then((result)=> {
      if (result.data.course_id) {

        this.setState({
          ...result.data
        }, () => {
        })
        this.props.initWorkDetailCommonState && this.props.initWorkDetailCommonState( Object.assign({...result.data}, {
          moduleName: '参考答案'
        }))
      }

     }).catch((error)=>{
       console.log(error)
     })
  }
  componentDidMount() {
    this.fetchData()
    try {
      this.props.triggerRef(this);
    }catch (e) {

    }
    on('commonwork_fetch_all', this.fetchAllListener)
  }
  componentWillUnmount() {
    off('commonwork_fetch_all', this.fetchAllListener)
  }
  fetchAllListener = () => {
    this.fetchData()
  }


  render(){
    const dateFormat = 'YYYY-MM-DD HH:mm';

    let {course_name, homework_name, search, page, loadingstate, homework_status, reference_answer,
      attachments
    } =this.state;

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let workId=this.props.match.params.workId;

    const exportResultUrl = `/api/homework_commons/${workId}/works_list.xlsx`

    return(
      <React.Fragment
      >
        {/* 内容区 */}
        <div className="padding40 memoContent new_li">
          {reference_answer ? <MarkdownToHtml content={reference_answer || "还未设置答案。"}></MarkdownToHtml> :
            reference_answer === undefined ? '' : ((!attachments || attachments.length == 0) && <NoneData></NoneData>)}

          { attachments && attachments.map((item) => {
            return ( <div className="color-grey">
              <a className="color-grey">
                <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
              </a>
              <a href={item.url} className="mr12" length="58">{item.title}</a>
              <span className="color-grey mt2 color-grey-6 font-12">{item.filesize}</span>
            </div> )
          }) }

        </div>

      </React.Fragment>

    )
  }
}

export default CommonWorkAnswer;
