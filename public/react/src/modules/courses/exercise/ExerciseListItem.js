import React,{ Component } from "react";

import {Link} from 'react-router-dom';
import moment from 'moment';
import {Tooltip} from 'antd';
import Modals from '../../modals/Modals';
import CoursesListType from '../coursesPublic/CoursesListType';
import { formatDuring ,handleDateString} from 'educoder';

import '../css/members.css';
import '../css/busyWork.css';
import CourseLayoutcomponent from "./Exercise";

const dataformat="YYYY-MM-DD HH:mm";
const polls_status={1:"未发布",2:"提交中",3:"已截止",4:"已结束"}
class ExerciseListItem extends Component{
    constructor(props){
        super(props);
				this.state={
					Modalstype:false
				}
    }

    setgameexercise=(url)=>{

    	let{item}=this.props;
    	if(item.time>0){
        this.setState({
					Modalstype:true,
					ModalSave:()=>this.props.history.push(url),
					Modalstopval:`答题时长限制${item.time}分钟，从首次答题开始实行不间断计时方法`,
					modalsBottomval:'请确认是否有充足的答题时间？',
				});
			}else{
				this.setState({
					Modalstype:true,
					ModalSave:()=>this.props.history.push(url),
					Modalstopval:"是否确认开始答题？",
					modalsBottomval:' ',
				})
			}

		}

	  cancelmodel=()=>{
    	this.setState({
				Modalstype:false,
				ModalSave:' ',
				Modalstopval:' ',
				modalsBottomval:' ',
				Loadtype:false
			})
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
        let{item,checkBox,index}=this.props;
        let {coursesId,Id}=this.props.match.params
        const IsAdmin =this.props.isAdmin();
        const IsStudent =this.props.isStudent();

        // console.log(this.props.current_user.user_id)
        return(
            <div className="workList_Item" style={{cursor : IsAdmin ? "pointer" : "default",padding:"30px" }} onClick={() => window.$(`.exerciseitem${index} input`).click() }>
                {
                  IsAdmin &&
                  <span className={`exerciseitem${index} fl mr12`}>
										{checkBox}
									</span>
                }
							{/* 公用的提示弹框 */}
							{this.state.Modalstype===true?<Modals
								modalsType={this.state.Modalstype}
								modalsTopval={this.state.Modalstopval}
								modalsBottomval={this.state.modalsBottomval}
								loadtype={this.state.Loadtype}
								modalCancel={this.cancelmodel}
								modalSave={this.state.ModalSave}
								antIcon={this.state.Modalstypeloding}
							></Modals>:""}
							<style>
								{
									`
            .comnonwidth580{
              max-width: 580px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
             }
              .homepagePostSetting {
								position: absolute;
							}
            `
								}
							</style>
                <div className="flex1 pr">
                    <p className="clearfix mb20">

                        {/*<Link to={`/courses/${coursesId}/exercises/${item.id}/exercises/student_exercise_list?tab=0`} className="fl font-16 font-bd mt2 color-grey-3 task-hide" style={{"maxWidth":"600px"}}>{item.exercise_name}</Link>*/}
                        {
                            this.props.isAdmin()? <a  className="fl font-16 font-bd mt2 color-grey-3 task-hide comnonwidth580 pointer"
																											title={item.exercise_name}
                                                      onClick={()=>this.toDetailPage(`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=0`)}>{item.exercise_name}</a>:""
                        }

												{
													this.props.isStudent()?
														<a  className="fl font-16 font-bd mt2 color-grey-3 task-hide comnonwidth580 pointer" title={item.exercise_name}  onClick={()=>this.toDetailPage(`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=0`)}>{item.exercise_name}</a>:""
												}

                        {
                        this.props.isNotMember()? item.lock_status === 0 ?
                             <span className="fl mt3 font-16 font-bd color-dark comnonwidth580 pointer" title={"私有属性，非课堂成员不能访问"}>{item.exercise_name}</span>
														:	<a className="fl font-16 font-bd mt2 color-grey-3 task-hide comnonwidth580 pointer" title={item.exercise_name}  onClick={()=>this.toDetailPage(`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=0`)}>{item.exercise_name}</a>:""
                        }

                        {
                         item.lock_status === 0 ?
                                <Tooltip title={"私有属性，非课堂成员不能访问"} placement="bottom">
                                  <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl"></i>
                                </Tooltip>
                                :""
                        }

                        {/*<CoursesListType typelist={[polls_status[`${item.exercise_status}`]]} typesylename={""}></CoursesListType>*/}

                        <CoursesListType typelist={ item.exercise_tips } typesylename={""}></CoursesListType>
                        {/*未发布、提交中、补交中、已开启补交、未开启补交、评阅中、已结束*/}

                        {/*<li className="fr drop_down">*/}
                        {/*<i className="iconfont icon-caidan font-16 color-grey-c"></i>*/}
                        {/*<ul className="drop_down_normal">*/}
                        {/*<li>编辑</li>*/}
                        {/*<li>设置</li>*/}
                        {/*</ul>*/}
                        {/*</li>*/}
                    </p>
                  <p className="color-grey-9 clearfix">
                      { item.author && <span className="mr20 fl">{item.author}</span> }
                      {item.exercise_status===1?"":<span className="mr20 fl">{item.exercise_answer} 已答</span>}
                      {item.exercise_status===1?"":<span className="mr20 fl">{item.exercise_unanswer} 未答</span>}
                        {item.unreview_count===null||item.exercise_status===1?"":<span className="mr20 fl">{item.unreview_count} 未评数</span> }

                        {
                            item.exercise_status ===1? item.publish_time ===null?
                                <span className="mr20 fl"> 创建于{moment(item.created_at).fromNow()} </span>
                              :   <span className="mr20 fl"> 将发布于{
													     moment(item.publish_time).format('YYYY-MM-DD HH:mm')
                              } </span>:""
                        }

                        {
                         item.exercise_status ===2?
                            <Tooltip title="提交剩余时间" placement="bottom">
                              <span className="mr20 fl">{"提交剩余时间："+item.exercise_left_time}</span>
                            </Tooltip>:""
                        }
                        {
														item.exercise_left_time===null?"":item.exercise_status ===3?
                              <Tooltip title="截止剩余时间" placement="bottom">
                                <span className="mr20 fl">{"截止剩余时间："+item.exercise_left_time}</span>
                              </Tooltip>:""
                          }
                       {/*{*/}
                          {/*item.exercise_status ==2?"":*/}
                          {/*<span className="mr20 fl"> 发布于{moment(item.exercise_left_time).fromNow()} </span>*/}
                        {/*}*/}





										{ IsAdmin &&<div className="homepagePostSetting" style={{"right":"-17px","top":"46px","display":"block","width":"200px"}}>
											<a className="btn colorblue font-16 ml20" onClick={()=>this.toDetailPage(`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=0`)}>查看详情</a>
											<Link className="btn colorblue font-16 ml20" to={`/courses/${coursesId}/exercises/${item.id}/edit`}>编辑</Link>
											<Link  className="btn colorblue ml20 font-16" to={`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=3`}>设置</Link>
										</div> }

									</p>
                    {/*{*/}
                        {/*IsAdmin &&*/}
                        {/*<div className="homepagePostSetting" style={{"right":"0px","top":"-5px","position":"absolute","display":"block"}}>*/}
                            {/*<ul>*/}
                                {/*<li className="edu-position edu-position-hidebox">*/}
                                    {/*<i className="fa fa-bars color-grey-b"></i>*/}
                                    {/*<ul className="edu-position-hide undis">*/}
                                        {/*<li> <Link  className="" to={`/courses/${coursesId}/exercises/${item.id}/edit`}>编辑</Link></li>*/}
                                        {/*<li> <a  className="" href={`*/}
                                        {/*/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=3`*/}
                                        {/*}>设置</a></li>*/}
                                    {/*</ul>*/}
                                {/*</li>*/}
                            {/*</ul>*/}
                        {/*</div>*/}
                    {/*}*/}


                    {
                        IsStudent &&
                        <div className="homepagePostSetting" style={{"right":"0px","top":"46px","position":"absolute","display":"block"}}>
													<li className={"fl"}> <a  className="btn colorblue  font-16" onClick={()=>this.toDetailPage(`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=0`)}>查看详情</a></li>
                            {item.current_status ===0&&item.exercise_status>1? <li className={"fl ml20"}> <Link  className="btn colorblue  font-16" to={`/courses/${coursesId}/exercises/${item.id}/users/${this.props.current_user.login}`}>继续答题</Link></li>:
                            item.current_status ===1&&item.exercise_status>1? <li className={"fl ml20"}> <a className="btn colorblue  font-16" target="_blank" href={`/courses/${coursesId}/exercises/${item.id}/users/${this.props.current_user.login}`}>查看答题</a></li>:
                            item.current_status ===2&&item.exercise_status>1? <li className={"fl ml20"}s> <a className="btn colorblue font-16" onClick={()=>this.setgameexercise(`/courses/${coursesId}/exercises/${item.id}/users/${this.props.current_user.login}`)}>开始答题</a></li>:""}
                        </div>
                    }

									{
										this.props.isNotMember()? item.lock_status === 0 ?
											""
											: <div className="homepagePostSetting" style={{"right":"0px","top":"42px","position":"absolute","display":"block"}}>
												<li> <a  className="btn colorblue  font-16" onClick={()=>this.toDetailPage(`/courses/${coursesId}/exercises/${item.id}/student_exercise_list?tab=0`)}>查看详情</a></li>
											</div>:""
									}

                </div>
            </div>
        )
    }
}
export default ExerciseListItem