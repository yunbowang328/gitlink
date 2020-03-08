import React,{ Component } from "react";
import {Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import moment from 'moment';
import CoursesListType from '../coursesPublic/CoursesListType';
import { WordsBtn,formatDuring } from 'educoder';
import '../css/members.css';
import '../css/busyWork.css';

const polls_status={1:"未发布",2:"提交中",3:"已截止",4:"已结束"}


const dataformat="YYYY-MM-DD HH:mm";
class PollListItem extends Component{
  constructor(props){
    super(props);
  }
	toDetailPage=(url)=>{

		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		// if(this.props.checkIfProfileCompleted()===false){
		// 	this.setState({
		// 		AccountProfiletype:true
		// 	})
		// 	return
		// }
		// if(this.props.checkIfProfessionalCertification()===false){
		// 	this.props.showProfileCompleteDialog()
		// 	return
		// }

		this.props.history.push(url);
	}
  render(){
    let{item,checkBox,courseType,index}=this.props;
    let {coursesId}=this.props.match.params;
    
    const IsAdmin =this.props.isAdmin();
    const isStudent = this.props.isStudent();
    const isNotMember = this.props.isNotMember();
    const isAdminOrStudent = this.props.isAdminOrStudent();
    
    let t= item.end_time ? moment(item.end_time) - moment() : 0;
    let canNotLink = !isAdminOrStudent && item.lock_status == 0
    return(

      <div className="workList_Item polllisthover" style={{cursor : IsAdmin ? "pointer" : "default",padding:"30px" }}  onClick={() => window.$(`.pollitem${index} input`).click() }>
        {
          IsAdmin && 
          <span className={`pollitem${index} fl mr12`}>
            {checkBox}
          </span>
        }
        <div className="flex1 pr">
          <p className="clearfix mb30">
            { canNotLink ?
							<span className="fl font-16 font-bd mt2 color-grey-3 task-hide pointer" style={{"maxWidth":"600px"}} title={courseType.user_permission == 0?"私有属性，非课堂成员不能访问":item.polls_name}>{item.polls_name}</span>
								:
                <a onClick={()=>this.toDetailPage(`/courses/${coursesId}/polls/${item.id}/detail`)} className="fl font-16 font-bd mt2 color-grey-3 task-hide pointer" style={{"maxWidth":"600px"}} title={item.polls_name}>{item.polls_name}</a>
            }
            {
              item.lock_status === 0 ? 
              <Tooltip title={"私有属性,非课堂成员不能访问"}  placement="bottom">
                <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl"></i>
              </Tooltip>
              :""
            }
            <CoursesListType typelist={[polls_status[`${item.polls_status}`]]} typesylename={""}></CoursesListType>
            {
              isStudent && ((item.polls_status == 1 && (item.current_status ==0 ||item.current_status ==2)) || (item.polls_status==3 && item.current_status==2)) ? 
              <span className="edu-filter-btn edu-filter-btn-84B6EB ml15 fl typestyle">未提交</span>:""
            }
          </p>
          <p className="color-grey-9 clearfix">
            { item.author && <span className="mr20 fl mt3">{item.author}</span> }
            {
              item.polls_status !=1 &&
              <span className="fl mt3">
                <span className="mr20">{item.poll_answer} 已答</span>
                <span className="mr20">{item.poll_unanswer} 未答</span>
              </span>
            }
            {
              item.polls_status ==1 && item.publish_time ==null && item.created_at &&
              <span className="mr20 fl mt3">创建于{moment(item.created_at).fromNow()}</span>
            }
            {
              item.polls_status ==1 && item.publish_time !=null && 
              <span className="mr20 fl mt3">将发布于{moment(item.publish_time).format(dataformat)}</span>
            }
            {
              item.polls_status ==2 && item.publish_time !=null && 
              <Tooltip title="提交剩余时间">
                <span className="mr20 fl mt3">{"提交剩余时间："+formatDuring(t)}</span>
              </Tooltip>
            }


            {
              isStudent ? <WordsBtn style="blue" targets={item.current_status == 2||item.current_status == 0?undefined:'_blank'} className="fr font-16 ml20" to={`/courses/${coursesId}/polls/${item.id}/users/${this.props.current_user.login}`}>


                {
                  item.current_status == 0 && "继续答题"
                }
                {
                  item.current_status == 1 && "查看答题"
                }
                {
                  item.current_status == 2 && "开始答题"
                }
              </WordsBtn>:""
            }
            { isStudent ?canNotLink ?"": <WordsBtn style="blue"  className="font-16 fr "  onClick={()=>this.toDetailPage(`/courses/${coursesId}/polls/${item.id}/detail`)} >查看详情</WordsBtn>:""}

            {
              IsAdmin && 
              <ul className="fr">
                { canNotLink ?"": <WordsBtn style="blue"  className="font-16" onClick={()=>this.toDetailPage(`/courses/${coursesId}/polls/${item.id}/detail`)} >查看详情</WordsBtn>}
                <WordsBtn style="blue"  className="font-16 ml20" to={`/courses/${coursesId}/polls/${item.id}/${"edit"}`}>编辑</WordsBtn>
                <WordsBtn style="blue" className="ml20 font-16" to={`/courses/${coursesId}/polls/${item.id}/detail?tab=3`}>设置</WordsBtn>
              </ul>
            }
          </p>
        </div>
      </div>
    )
  }
}
export default PollListItem