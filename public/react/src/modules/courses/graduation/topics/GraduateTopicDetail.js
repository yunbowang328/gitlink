import React,{ Component } from "react";
import { Input, Checkbox, Menu, Pagination,Table } from "antd";

import '../../css/members.css'
import '../../css/busyWork.css'
import '../style.css'

import { WordsBtn } from 'educoder'
import NoneData from '../../coursesPublic/NoneData'
import axios from 'axios'
import DetailTable from './GraduateTopicDetailTable'
import DetailInfo from './GraduateTopicDetailInfo'
import CoursesListType from '../../coursesPublic/CoursesListType';



class GraduateTopicDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      tableData:[],
      tablePage:1,
      tablePageSize:15,
      tab:1
    }
  }

  componentDidMount(){
    let{tablePage}=this.state;
    this.getDetailList(tablePage);
  }
  // 获取详情列表
  getDetailList=(page)=>{
    let course_id=this.props.match.params.course_id;
    let graduation_topic_id=this.props.match.params.graduation_topic_id;

    let{tablePageSize}=this.state;
    let url=`/courses/${course_id}/graduation_topics/${graduation_topic_id}.json?page=`+page+`&limit=`+tablePageSize;

    axios.get(url).then((result)=>{
      if(result.status==200){
        this.setState({
          tableData:result.data
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  //详情列表翻页
  changeTablePag=(pageNumber)=>{
    this.setState({
      tablePage:pageNumber
    })
    this.getDetailList(pageNumber);
  }

  // 切换tab
  onChangeStatus=(e)=>{
    this.setState({
      tab:e.key
    })
  }

  actionTopic=()=>{
    let graduation_topic_id=this.props.match.params.graduation_topic_id;
    let course_id=this.props.match.params.course_id;
    let {tableData}=this.state;

    this.props.confirm({
      content: tableData.user_selected_topic==0?`是否确认取消选题?`:"是否确认选题?",
      onOk: () => {
        let url="/courses/"+course_id+"/graduation_topics/"+graduation_topic_id+"/"
        if(tableData.user_selected_topic==0){
          url+="student_cancel_topic.json"
        }else if(tableData.user_selected_topic==null || tableData.user_selected_topic==2){
          url+="student_select_topic.json"
        }
        axios.post((url)).then((result)=>{
          // console.log(result);
          if(result.data.status == 0){
            this.getDetailList();
            this.props.showNotification(`${result.data.message}`);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }
  
  render(){
    let {
      tableData,
      tablePage,
      tablePageSize,
      tab,
    }=this.state
    const { current_user } = this.props
    let {course_id,graduation_topic_id}=this.props.match.params;
    const isStudent =this.props.isStudent();
    const isAdmin =this.props.isAdmin();
		document.title=tableData && tableData.course_name;
    return(
      <div className="newMain">
        <div className="educontent mt10 mb50">
          <p className="clearfix mb15 lineh-20">
            <WordsBtn style="grey" className="fl" to={current_user&&current_user.first_category_url}>{tableData && tableData.course_name}</WordsBtn>
            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
            <WordsBtn style="grey" className="fl" to={`/courses/${tableData.course_id}/graduation_topics/${tableData.graduation_id}`}>{tableData.graduation_name}</WordsBtn>
            <span className="color-grey-9 fl ml3 mr3">&gt;</span>
            <span>选题详情</span>
          </p>
          <p className="clearfix mb20 lineh-25">
            <span className="color-grey-3 font-24 fl task-hide" style={{lineHeight:"25px",maxWidth:"900px"}}>{tableData && tableData.graduation_topic_name}</span>
            <span className="fl mt1" style={{height:"25px"}}><CoursesListType typelist={[`${tableData && tableData.status_name}`]} typesylename={""} /></span>
            <WordsBtn className="fr font-16 mt1" style="grey" to={`/courses/${tableData.course_id}/graduation_topics/${tableData.graduation_id}`}>返回</WordsBtn>
          </p>
          <div>
            <div className="clearfix edu-back-white bor-bottom-greyE" >
              <div className="fl mt6 task_menu_ul ml30">
                <Menu mode="horizontal" defaultSelectedKeys="1" onClick={this.onChangeStatus}>
                  <Menu.Item key="1">选题列表</Menu.Item>
                  <Menu.Item key="2">选题描述</Menu.Item>
                </Menu>
              </div>
              {/* null: 未选题 0：待确认 1：已同意 2：已拒绝 */}
              {
                isStudent && tableData.user_selected == false && (tableData.user_selected_topic==null || tableData.user_selected_topic==2) &&
                <WordsBtn className="fr font-16 mt22 mr30" style="blue" onClick={this.actionTopic}>选题</WordsBtn>
              }
              {
                isStudent && tableData.user_selected == true && tableData.user_selected_topic==0 &&
                <WordsBtn className="fr font-16 mt22 mr30" style="blue" onClick={this.actionTopic}>取消选题</WordsBtn>
              }
              {
                isAdmin && <WordsBtn className="fr font-16 mt22 mr30" to={`/courses/${course_id}/graduation_topics/${graduation_topic_id}/edit`} style="blue">编辑</WordsBtn>
              }
            </div>
            {
              tab && tab==1&&
              <div>
                <div className="minH-560 edu-back-white">
                  <DetailTable {...this.props} {...this.state} tableData={tableData} page={tablePage} getDetailList={this.getDetailList}></DetailTable>  
                </div>
                {
                  tableData && tableData.users_count>tablePageSize &&
                  <div className="edu-txt-center mt30 mb50">
                    <Pagination showQuickJumper pageSize={tablePageSize} current={tablePage} total={tableData.users_count} onChange={this.changeTablePage}></Pagination>
                  </div>
                }
              </div>
            }
            {
              tab && tab==2&&
              <DetailInfo {...this.props} {...this.state}></DetailInfo>
            }
          </div>
        </div>
      </div>
    )
  }
}
export default GraduateTopicDetail;