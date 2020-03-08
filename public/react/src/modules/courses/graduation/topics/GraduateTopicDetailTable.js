import React,{ Component } from "react";

import '../../css/members.css'
import '../../css/busyWork.css'
import '../style.css'

import { WordsBtn } from 'educoder'
import NoneData from '../../coursesPublic/NoneData'
import Modals from "../../../modals/Modals"
import axios from 'axios'
import { Modal,Select,Input } from "antd";

const Option = Select.Option
class GraduateTopicDetailTable extends Component{
  constructor(props){
    super(props);
    this.state={
      modalsType:false,
      modalsTopval:'',
      operationId:undefined,
      agreeFlag:false,
      classesId:undefined,
      agreeCheck:false,
      visible:false,
      un_addClass:undefined,
      un_addClass_notice:"",
      un_choose_notice:""
    }
  }
  // 拒绝
  aboutTopic=(id)=>{
    this.setState({
      modalsType:true,
      modalsTopval:'是否确认拒绝学生选题？',
      operationId:id
    })    
  } 
  cancelAboutTopic=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:''
    })  
  }
  sureAboutTopic=()=>{
    let{operationId}=this.state
    let courseId=this.props.match.params.course_id;
    let graduation_topic_id=this.props.match.params.graduation_topic_id;
    let url =`/courses/${courseId}/graduation_topics/${graduation_topic_id}/refuse_student_topic.json?student_graduation_topic=`+operationId;
    axios.post(url).then((result)=>{
      if(result.data.status==0){
        this.props.showNotification(`${result.data.message}`);
        this.setState({
          modalsType:false,
          modalsTopval:''
        })
        //成功后调用列表接口，刷新
        this.props.getDetailList(this.props.page);
      }
    }).catch((error)=>{
      console.log(error);
    })
    this.setState({
      modalsType:false,
      modalsTopval:''
    })
  }

  //同意
  agreeTopic=(id)=>{
    this.setState({
      agreeFlag:true,
      operationId:id
    })
  }
  hideAgreeTopic=()=>{
    this.setState({
      agreeFlag:false,
      classesId:undefined
    })
  }
  sureAgreeTopic=(count)=>{
    let{tableData}=this.props;
    let{operationId,classesId}=this.state
    let courseId=this.props.match.params.course_id;

    if(classesId!=undefined){
      let name=tableData.group_list.filter(item=>item.group_id==classesId)[0].group_name;
      this.agreeChoose(courseId,operationId,classesId,name);
    }else{
      this.agreeChoose(courseId,operationId,classesId);
    }
  }

  agreeChoose=(courseId,operationId,classesId,courseName)=>{
    let graduation_topic_id=this.props.match.params.graduation_topic_id;
    let url =`/courses/${courseId}/graduation_topics/${graduation_topic_id}/accept_student_topic.json`;
    axios.post(url,{
      student_graduation_topic_id:operationId,
      group_id:classesId,
      course_group_name:courseName
    }).then((result)=>{
      if(result.data.status==0){
        this.props.showNotification(`${result.data.message}`);
        this.setState({
          agreeFlag:false,
          agreeCheck:true,
          visible:false
        })
        //成功后调用列表接口，刷新
        this.props.getDetailList(this.props.page);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  //切换分班
  changeClasses=(value)=>{
    this.setState({
      classesId:value
    })
  }

  //新增分班
  topicAddClasses=()=>{
    this.setState({
      visible:true,
      agreeFlag:false
    })
  }
  hideClasses=()=>{
    this.setState({
      visible:false,
      classesId:undefined
    })
  }

  //新建分班--输入分班
  inputClasses=(e)=>{
    this.setState({
      un_addClass:e.target.value
    })
  }

  // 新建分班---确定
  sureAddClass=()=>{
    let {un_addClass}=this.state;
    if(!un_addClass){
      this.setState({
        un_addClass_notice:"请输入分班名称"
      })
      return;
    }
    console.log(this.props)
    let{operationId}=this.state
    let courseId=this.props.match.params.course_id;
    this.agreeChoose(courseId,operationId,-1,un_addClass);
  }

  render(){
    let {page,tableData}=this.props
    let { modalsType,modalsTopval,agreeFlag,classesId,visible
      ,un_addClass_notice
      ,un_addClass,
      un_choose_notice
    } = this.state
    const isAdmin =this.props.isAdmin();
    const isStudent =this.props.isStudent();
    const isNotMember=this.props.isNotMember();
    console.log(un_addClass_notice)
    return(
      <div className="minH-560 edu-back-white">
      <div className="TopicDetailTable">
        <div className="topHead edu-txt-center">
          <span style={{"width":"5%"}}>序号</span>
          <span style={{"width":"12%"}}>姓名</span>
          {isNotMember ?"" :<span style={{"width":"13%"}}>学号</span>}
          <span style={{"width":"15%"}}>分班</span>
          <span style={{"width":"15%"}}>选题时间</span>
          <span style={{"width":"12%"}} className="fr">操作</span>
          {
            isAdmin && 
            <span style={{"width":"12%"}} className="fr">确认结果</span>
          }
          
        </div>
        {/* 拒绝弹框 */}
        <Modals
          modalsType={modalsType}
          modalsTopval={modalsTopval}
          modalsBottomval=""
          modalCancel={this.cancelAboutTopic}
          modalSave={this.sureAboutTopic}
        ></Modals>
        {/* 同意弹框 */}
        <Modal
          title="同意选题"
          visible={agreeFlag}
          closable={false}
          footer={null}
          destroyOnClose={true}
          centered={true}
          keyboard={false}
        >
          <div className="newupload_conbox">
            <p className="color-grey-9 mb15 edu-txt-center">确认同意学生的选题，将学生加入我的分班</p>
            { tableData.group_list && tableData.group_list.length===0?"":<div className="df">
              <span className="lineh-40 mr10">选择：</span>
              <div className="flex1">
                <Select placeholder="请选择分班" style={{"width":"100%"}} value={classesId} onChange={this.changeClasses}>
                  {
                    tableData.group_list && tableData.group_list.map((item,key)=>{
                      return(
                        <Option value={item.group_id} key={key}>{item.group_name}</Option>
                      )
                    })
                  }
                  <Option key="0"><a onClick={this.topicAddClasses} style={{display:"block"}}>添加分班</a></Option>
                </Select>
                <p style={{height:"20px",lineHeight:"20px"}}><span className="color-orange-tip">{un_choose_notice}</span></p>
              </div>
            </div>}
            <div className="mt20 clearfix edu-txt-center">
              <a onClick={this.hideAgreeTopic} className="pop_close task-btn mr30">取消</a>
              <a className="task-btn task-btn-orange" onClick={()=>this.sureAgreeTopic(tableData.group_list.length)}>确定</a>
            </div>
          </div>
        </Modal>
        <Modal
          visible={visible}
          title="新建分班"
          closable={false}
          footer={null}
          destroyOnClose={true}
          centered={true}
          keyboard={false}
        >
          <div className="newupload_conbox">
            <div className="df">
              <span className="lineh-40 mr10">分班：</span>
              <div className="flex1">
                <Input className="input-flex-40" value={un_addClass} onInput={this.inputClasses} placeholder="示例：分班(最佳4个字符)"></Input>
                <p style={{height:"20px",lineHeight:"20px"}}>
                  <span className="color-orange-tip">{un_addClass_notice}</span>
                </p>
              </div>
            </div>
            <div className="clearfix edu-txt-center">
              <a onClick={this.hideClasses} className="pop_close task-btn mr30">取消</a>
              <a className="task-btn task-btn-orange" onClick={this.sureAddClass}>确定</a>
            </div>
          </div>
        </Modal>
        <div className="bottomBody">
          {
            tableData.users_list && tableData.users_list.length > 0 && tableData.users_list.map((item,key)=>{
              return(
                <li className="color-grey-9 clearfix" key={key}>
                  <span style={{"width":"5%"}} className="color-grey-6">{parseInt(key+1)+(parseInt(page-1)*15)}</span>
                  <span style={{"width":"12%"}} className="color-grey-3">{item.student_name}</span>
                  {isNotMember ?"" :<span style={{"width":"13%"}}>{item.student_id}</span>}
                  <span style={{"width":"15%"}}>{item.class_group_name || "--"}</span>
                  <span style={{"width":"15%"}}>{item.selected_time}</span>
                  {
                    isAdmin && 
                    <span style={{"width":"12%"}} className="fr">
                      {
                        item.result == "待确认" ?
                        <span>
                          <a className="mr20 color-grey-B3" onClick={()=>this.aboutTopic(`${item.id}`)}>拒绝</a>
                          <a className="color-blue" onClick={()=>this.agreeTopic(`${item.id}`)}>同意</a>
                        </span>:
                        (
                          item.result === "已拒绝" ? <span className="color-grey-B3">--</span>
                          :
                          <a className="color-grey-B3" onClick={()=>this.aboutTopic(`${item.id}`)}>拒绝</a>
                        )
                      }                      
                    </span>
                  }
                  {
                    isStudent &&
                    <span style={{"width":"12%"}} className={item.result === "已拒绝"?"fr color-red":"fr"}>{item.result}</span>
                  }
                  {
                    isAdmin &&
                    <span style={{"width":"12%"}} className={item.result === "已拒绝"?"fr color-orange-tip":"fr"}>{item.result=== "待确认"?"--":item.result}</span>
                  }
                  {
                    isNotMember && <span style={{"width":"12%"}} className="fr color-grey-9">--</span>
                  }
                  
                </li>
              )
            })
          }
          {
            tableData.users_list && tableData.users_list.length == 0 && <NoneData></NoneData>
          }
        </div>
      </div>
      </div>
    )
  }
}
export default GraduateTopicDetailTable;