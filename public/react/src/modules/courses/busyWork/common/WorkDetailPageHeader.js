import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { WordsBtn, MarkdownToHtml } from 'educoder';
import axios from 'axios';
import Modals from '../../../modals/Modals';
import CoursesListType from '../../coursesPublic/CoursesListType';
import AccessoryModal from "../../coursesPublic/AccessoryModal";

import '../../css/Courses.css'
import CBreadcrumb from '../../common/CBreadcrumb'

const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype=true;
const $ = window.$;
const Search = Input.Search;
const RadioGroup = Radio.Group;

class WorkDetailPageHeader extends Component{

  constructor(props){
    super(props)
    this.state={
    }
  }

  componentDidMount() {
  }

  goback = () => {
    let workId=this.props.match.params.workId;

    if ( window.location.pathname.indexOf('appraise') == -1) {
      let category_id= this.props.category.category_id;
      this.props.toListPage(this.props.match.params, category_id)
    } else {
      this.props.toWorkListPage(this.props.match.params, workId)
      // this.props.match.params.category_id
    }
		// this.props.history.goBack()
  }
  // 补交附件
  Cancelvisible=()=>{
    this.setState({
      accessoryVisible:false
    })
  }
  addAccessory=()=>{
    this.setState({
      accessoryVisible:true
    })
  }
  setupdate = () => {
    this.props.getReviseAttachments && this.props.getReviseAttachments()
  }

  render(){
    const dateFormat = 'YYYY-MM-DD HH:mm';

    let {course_name, homework_name, search, page, loadingstate, homework_status, description, noTab
        , view_answer, author_name, category, work_id, current_user
    } =this.props;

    let courseId=this.props.match.params.coursesId;
    let category_id= category && category.category_id;
    let category_name= category && category.category_name;

    let workId=this.props.match.params.workId;
    const studentWorkId = this.props.match.params.studentWorkId

    const isGroup = this.props.isGroup()
    const moduleName = !isGroup? "普通作业":"分组作业";
    const moduleEngName = this.props.getModuleName()

    const childModuleName = this.props.moduleName
    return(
      <React.Fragment>
        <div>
          <div className="newMain clearfix worklist1 workDetailPageHeader">
            <div className={"educontent mt20"}>
              <style>{`
                .memoContent {
                  background: #fff;
                }
                .workDetailPageHeader .summaryname {
                  line-height:28px
                }
              `}</style>
              <CBreadcrumb items={[
                { to: current_user&&current_user.first_category_url, name: course_name},
                { to: `/courses/${courseId}/${moduleEngName}/${category_id}`, name: category_name },
                window.location.pathname.indexOf('appraise') == -1 ? { } : { to: `/courses/${courseId}/${moduleEngName}/${workId}/list`, name: '作业详情' },
                // 1.	与上一条联动，当匿评他人作品时，TA人作品的作者真实姓名切换为“匿名”
                window.location.pathname.indexOf('appraise') == -1 ? { name: '作业详情' } : { name: author_name },
                // window.location.pathname.indexOf('appraise') == -1 ? { } : { to: `/courses/${courseId}/${moduleEngName}/${workId}/list`, name: '作品列表' },
                // { name: childModuleName }
              ]}></CBreadcrumb>

              <div className="clearfix mt20 mb20" >
                <span className=" fl color-black summaryname">
                   {homework_name}
                  {/* <Link to={"/courses/"+courseId+"/graduation"+"/graduation_tasks/"}>{homework_name}</Link> */}
                </span>
                <CoursesListType
                  typelist={homework_status}
                  typesylename={"mt3"}
                />


                {category && <a className="color-grey-6 fr font-16 ml30 mr30 lineh-25" onClick={this.goback}>返回</a>}

                {this.props.update_atta &&
                <React.Fragment>
									{this.state.accessoryVisible===true? <AccessoryModal
                    {...this.props}
                    modalname={"补交附件"}
                    visible={this.state.accessoryVisible}
                    Cancelname={"取消"}
                    Savesname={"确认"}
                    Cancel={this.Cancelvisible}
                    setupdate={this.setupdate}
										seeworks={undefined}
                    reviseAttachmentUrl={`/student_works/${work_id || studentWorkId}/revise_attachment.json`}
                  />:""}
                  <a className={"fr color-blue font-16 "} href={"javascript:void(0)"}
                    onClick={this.addAccessory} style={{ 'marginTop': '-4px' }}
                  >补交附件</a>
                </React.Fragment>

                }
              </div>

              { noTab !== true && <div className="stud-class-set bor-bottom-greyE">
                <div className="mt10 clearfix edu-back-white poll_list pl5">
                  <Link
                        className={`${childModuleName == '作品列表' ? 'active' : '' } `}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/list`}>作品列表</Link>
                  <Link
                        className={`${childModuleName == '作业描述' ? 'active' : '' } `}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/question`}>作业描述</Link>
                  {view_answer == true && <Link
                        className={`${childModuleName == '参考答案' ? 'active' : '' } `}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/answer`}>参考答案</Link>}

                  <Link
                        className={`${childModuleName == '设置' ? 'active' : '' } `}
                        style={{paddingLeft:this.props.isAdmin()?'38px':'20px'}}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/setting`}>{this.props.isAdmin()?"设置":"得分规则"}</Link>


                  { this.props.tabRightComponents }

                </div>
              </div> }

              {/* 内容区 */}
              {this.props.children}
            </div>
          </div>
        </div>


      </React.Fragment>

    )
  }
}

export default WorkDetailPageHeader;
