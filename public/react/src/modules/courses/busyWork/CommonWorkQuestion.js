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
import '../css/Courses.css'
import WorkDetailPageHeader from './common/WorkDetailPageHeader'
import CommonReply from '../common/comments/CommonReply.js'
import TabRightComponents from './common/TabRightComponents'
const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype=true;
const $ = window.$;
const Search = Input.Search;
const RadioGroup = Radio.Group;

class CommonWorkQuestion extends Component{

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
    const url = `/homework_commons/${workId}.json`

    axios.get(url).then((result)=> {
      if (result.data.course_id) {

        this.setState({
          ...result.data
        }, () => {
        })
        this.props.initWorkDetailCommonState && this.props.initWorkDetailCommonState( Object.assign({...result.data}, {
          moduleName: '作业描述'
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

    let {course_name, homework_name, search, page, loadingstate, homework_status, description
      , homework_id, homework_user_id, attachments, group_info = {}
    } =this.state;

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let task_Id=this.props.match.params.task_Id;
    const isGroup = this.props.isGroup()

    return(
      <React.Fragment>

        {/* 内容区 */}
        <div className="padding40 memoContent new_li">
          <MarkdownToHtml content={description} selector="work_content" className="mb10"></MarkdownToHtml>

          { attachments && attachments.map((item) => {
            return ( <div className="color-grey">
              <a className="color-grey">
                <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
              </a>
              <a href={item.url} className="mr12" length="58">{item.title}</a>
              <span className="color-grey mt2 color-grey-6 font-12">{item.filesize}</span>
            </div> )
          }) }

          {isGroup && <div className="df mt10">
            <div style={{flex: '0 0 160px'}}>
              <div>分组要求： {group_info.min_num} ~ {group_info.max_num}人</div>
              <div>{group_info.base_on_project ? '基于项目实施' : '不基于项目'}：</div>
            </div>
            <div style={{color: '#9B9B9B'}}>
              <div>（学生提交作品时需要关联同组成员，组内成员作品共享）</div>
              <div>（{group_info.base_on_project ? '学生必须在本平台创建项目，项目管理员可以提交作品' : '无需在平台创建项目，任意小组成员均可以提交作品'}）</div>
              {/* <div>（各小组必须在educoder平台创建项目）</div> */}
            </div>
          </div>}

        </div>

        { homework_id && <CommonReply
          memo={{
            id: homework_id,
          }}
          course_id={courseId} {...this.props}
          apiRouteName={'homework_commons'}
          jour_type={'HomeworkCommon'}
        ></CommonReply> }
      </React.Fragment>

    )
  }
}

export default CommonWorkQuestion;
