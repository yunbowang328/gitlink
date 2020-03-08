import React,{ Component } from "react";
import CoursesListType from '../../coursesPublic/CoursesListType';
import { WordsBtn } from 'educoder';
import {Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Modals from '../../../modals/Modals';
import Associationmodel from '../../coursesPublic/Associationmodel';
import AccessoryModal from "../../coursesPublic/AccessoryModal";


class GraduateTaskItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalname:"关联项目",
      visible:false
    }
  }

  componentDidMount() {
    // let url="/graduation_tasks/"+this.props.taskid+"/graduation_works/check_project.json";
    //  axios.get(url).then((result)=>{
    //    // console.log(result)
    //  }).catch((error)=>{
    //    console.log(error)
    //  })
    //
    // let is_relate=false
    //
    //   this.setState({
    //   isrelate:is_relate
    // })
  }

  cannelAssociation=()=>{

    this.setState({
      Modalstype:true,
      Modalstopval:"确定要取消该项目关联？",
      cardsModalcancel:this.cannerassocition,
      cardsModalsavetype:this.savetassociton
    })

  }
  cannerassocition=()=>{

    this.setState({
      Modalstype:false,
      Modalstopval:"",
      cardsModalcancel:"",
      cardsModalsavetype:"",
      loadtype:false
    })

  }
  savetassociton=()=>{
    this.cannerassocition();
    let taskid=this.props.taskid;
    let url = "/graduation_tasks/"+taskid+"/graduation_works/cancel_relate_project.json";
    axios.get(url).then((result)=>{

      if(result.data.status===0){
        // this.setState({
        //   Modalstype:true,
        //   Modalstopval:result.data.message,
        //   cardsModalsavetype:this.cannerassocition,
        //   loadtype:true
        // })
				this.props.funlist()
      }

    }).catch((error)=>{
      console.log(error)
    })

  }
  saveAssociationItems=()=>{

    let coursesId=this.props.coursesId;
    let taskid=this.props.taskid;
    let url="/courses/"+coursesId+"/graduation_tasks/relate_project.json";
    axios.post(url,{
      project_id:taskid
    }).then((result)=>{
      // console.log(result)
      if(result.data.status===0){
        this.setState({
          Modalstype:true,
          Modalstopval:result.data.message,
          cardsModalsavetype:this.cannerassocition,
          loadtype:true
        })
      }
    }).catch((error)=>{
      console.log(error)
    })

  }


  AssociationItems=()=>{
      this.setState({
        visible:true
      })
    // this.setState({
    //   Modalstype:true,
    //
    //   Modalstopval:"确定要关联该项目关联？",
    //   cardsModalcancel:this.cannerassocition,
    //   cardsModalsavetype:this.saveAssociationItems
    // })

  }

	addAccessory=()=>{
		this.setState({
			visibles:true
		})
	}

  Cancel=()=>{
    this.setState({
      visible:false
    })
  }
	Cancelvisible=()=>{
		this.setState({
			visibles:false
		})
	}

	setupdate=()=>{
		this.props.funlist
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
    let {
        Modalstype,
        Modalstopval,
        Modalsbottomval,
        cardsModalcancel,
        cardsModalsavetype,
        loadtype,
        modalname,
        visible
    } = this.state;

    const { checkBox,
      discussMessage,
      onItemClick,
      coursesId,
      categoryid,
      taskid,
      index,
      isAdmin
    } = this.props;

    return(
        <div className="graduateTopicList boardsList" style={{cursor : isAdmin ? "pointer" : "default" }} onClick={() => window.$(`.taskitem${index} input`).click() }>
          <Modals
            modalsType={Modalstype}
            modalsTopval={Modalstopval}
            modalsBottomval={Modalsbottomval}
            modalCancel={cardsModalcancel}
            modalSave={cardsModalsavetype}
            loadtype={loadtype}
           />

          {visible===true?<Associationmodel
             modalname={modalname}
             visible={visible}
             Cancel={this.Cancel}
             taskid={taskid}
             funlist={this.props.funlist}
           />:""}
					{this.state.visibles===true?<AccessoryModal
						{...this.props}
						modalname={"补交附件"}
						visible={this.state.visibles}
						Cancelname={"取消"}
						Savesname={"确认"}
						Cancel={this.Cancelvisible}
						categoryid={discussMessage.work_id}
						setupdate={this.setupdate}
					/>:""}
          <style>{`
            
            .graduateTopicList .ant-checkbox-input {
              margin-right: 15px;
            }
          `}</style>
          <span className={`taskitem${index} fl`} style={{"height":"59px"}}>
            { checkBox }
          </span>
          {/*
          style={{borderTop:data===undefined?"":data.course_identity<4?'1px solid #EBEBEB':'1px solid transparent'}}
            */}

					{
						this.props.isAdmin?"":<style>{`
            .boardsList .contentSection {
			         margin-left: 0px !important;
						}
          `}</style>}
          <div className="clearfix ds pr pt5 contentSection" >

						<style>{`
            .maxwidth580{
                max-width: 580px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
          `}</style>
            <h6>

              {
                this.props.isAdmin?<a onClick={()=>this.toDetailPage("/courses/"+coursesId+"/graduation_tasks/"+categoryid+"/detail/"+taskid+"/list")}
																			title={discussMessage.name}
                                      className="fl mt3 font-16 font-bd color-dark maxwidth580">{discussMessage.name}</a>:""
              }
              {
                this.props.isStudent? <a onClick={()=>this.toDetailPage("/courses/"+coursesId+"/graduation_tasks/"+categoryid+"/detail/"+taskid+"/list")}
																				 title={discussMessage.name}
                                           className="fl mt3 font-16 font-bd color-dark maxwidth580">{discussMessage.name}</a>:""
              }

              {
            this.props.isNotMember===true?this.props.discussMessage.private_icon===true?
               <span className="fl mt3 font-16 font-bd color-dark maxwidth580 pointer"  title={"私有属性，非课堂成员不能访问"}>{discussMessage.name}</span>
             :<a onClick={()=>this.toDetailPage("/courses/"+coursesId+"/graduation_tasks/"+categoryid+"/"+taskid+"/list")}
								 title={discussMessage.name}
								 className="fl mt3 font-16 font-bd color-dark maxwidth580">{discussMessage.name}</a>:""
              }


              {
               this.props.discussMessage.private_icon===true?
                  <Tooltip  title={"私有属性，非课堂成员不能访问"}  placement="bottom">
                    <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl mt4"></i>
                  </Tooltip>
                  :
                  <div></div>
              }

              <CoursesListType typelist={discussMessage.status} typesylename={""} />

              {/* { !!discussMessage.sticky && <span className="btn-cir btn-cir-red fl mt5 ml5">置顶</span> } */}
            </h6>
              
            <div className="cl"></div>
            <p className="color-grey mt16 fl">
              <span className="mr50">
                {/* <a href="/users/innov" className="panel-name-small hide fl mr15 mr30 color-grey3">{discussMessage.author.name}</a> */}
                { discussMessage.author && <span className="mr15 color-grey-3">{discussMessage.author}</span> }
								{discussMessage.commit_count===undefined?"":<span className="mr15 color-grey9 font-14">{discussMessage.commit_count} 已交</span>}
								{discussMessage.uncommit_count===undefined?"":<span className="mr15 color-grey9 font-14">{discussMessage.uncommit_count} 未交</span>}
                {/*<span className="mr15 color-grey9">{discussMessage.replies_count} 3 未评</span>*/}
                <Tooltip title={discussMessage.task_status===1?"提交剩余时间":discussMessage.task_status===2?"补交剩余时间":discussMessage.task_status===3?"交叉评阅剩余时间":""} placement="bottom">
                    <span className="mr15 color-grey9 font-14">{discussMessage.task_status===1&&discussMessage.status_time!=""&&discussMessage.status_time!=null?"提交剩余时间："+discussMessage.status_time:discussMessage.task_status===2&&discussMessage.status_time!=""&&discussMessage.status_time!=null?"补交剩余时间："+discussMessage.status_time:discussMessage.task_status===3&&discussMessage.status_time!=""&&discussMessage.status_time!=null?"交叉评阅剩余时间："+discussMessage.status_time:discussMessage.status_time}</span>
                </Tooltip>

                {/* { discussMessage.replies_count != 0 && <span className="mr15 color-grey9">{discussMessage.replies_count} 回复</span> }
                { discussMessage.praise_num != 0 && <span className="mr15 color-grey9">{discussMessage.praise_num} 点赞</span> }
                { discussMessage.visits != 0 && <span className="mr15 color-grey9">{discussMessage.visits} 浏览</span> } */}
                {/* <span className="mr15 color-light-grey-C">{moment(discussMessage.created_on).fromNow()} </span> */}
              </span>
            </p>

						<style>
							{
								`
								.mrf4{
								    margin-right: -4px;
								}
								`
							}
						</style>

            {this.props.isAdmin?

              <div className="mt13">

                  <WordsBtn  style="blue" to={"/courses/"+coursesId+"/graduation_tasks/"+categoryid+"/detail/"+taskid+"/setting"}   className="colorblue font-16  mrf4 fr">
                     <a className="btn colorblue">设置</a>
                  </WordsBtn>

                  <WordsBtn  style="blue"  to={"/courses/"+coursesId+"/graduation_tasks/"+taskid+"/edit"} className="colorblue font-16 mr20 fr">
                  <a className="btn colorblue" >编辑</a>
                  </WordsBtn>

                  <WordsBtn  style="blue" onClick={()=>this.toDetailPage("/courses/"+coursesId+"/graduation_tasks/"+categoryid+"/detail/"+taskid+"/list")}
                             className="btn colorblue colorblue font-16 mr20 fr">
                    查看详情
                  </WordsBtn>
              </div>

              :""}



            {this.props.isStudent?

                discussMessage&&discussMessage.work_status===null?"":discussMessage&&discussMessage.work_status.map((item,key)=>{

                    return(
                      <span key={key}>



                      {item==="提交作品"?

                        <WordsBtn  style="blue" className="colorblue font-16 ml20 fr mt12">
                          <a className="btn colorblue" href={"/courses/"+this.props.coursesId+"/graduation_tasks/"+this.props.categoryid+"/works"+"/"+this.props.taskid+"/new"}>提交作品</a>
                        </WordsBtn>

                        :""}

                        {item==="补交作品"?

                          <WordsBtn  style="blue" className="colorblue font-16 ml20 fr mt12">
                            <a className="btn colorblue" href={"/courses/"+this.props.coursesId+"/graduation_tasks/"+this.props.categoryid+"/works"+"/"+this.props.taskid+"/new"}>补交作品</a>
                          </WordsBtn>

                          :""}

                        {item==="修改作品"?

                          <WordsBtn style="blue" className="font-16 colorblue ml20 fr mt12">
                            <a className="btn colorblue" href={"/courses/"+this.props.coursesId+"/graduation_tasks/"+this.props.categoryid+"/works"+"/"+this.props.workid+"/edit"}>修改作品</a>
                          </WordsBtn>

                          :""}

                        {item==="查看作品"?

                          <WordsBtn style="blue" className="font-16 colorblue ml20 fr mt12">
                            <a className="btn colorblue" target="_blank" href={"/courses/"+this.props.coursesId+"/graduation_tasks/"+this.props.workid+"/appraise"}>查看作品</a>
                          </WordsBtn>

                          :""}

                        {item==="创建项目"?

                          <WordsBtn className="colorblue font-16 ml20 fr mt12">
                            <a className="btn colorblue" href={'/projects/new'} target="_blank">创建项目</a>
                           </WordsBtn>

                          :""}

                        {item==="关联项目"?

                          <WordsBtn onClick={this.AssociationItems} className="colorblue font-16 ml20 fr mt12">关联项目</WordsBtn>

                          :""}


                        {item==="取消关联"?

                          <WordsBtn onClick={this.cannelAssociation}  className="colorblue font-16 ml20 fr mt12">取消关联</WordsBtn>

                          :""}

                        {item==="补交附件"?

                          <WordsBtn className="colorblue font-16 ml20 fr mt12" onClick={this.addAccessory}>
														补交附件
                            {/*<a className="btn colorblue " href={"/courses/"+this.props.coursesId+"/graduation_tasks/"+discussMessage.work_id+"/appraise"}></a>*/}
                          </WordsBtn>

                          :""}
                      </span>
                    )
                  }):""}

                {this.props.isStudent?
                  <WordsBtn  style="blue" onClick={()=>this.toDetailPage("/courses/"+coursesId+"/graduation_tasks/"+categoryid+"/detail/"+taskid+"/list")}
                             className="colorblue font-16 ml20 fr mt12">
                    查看详情
                  </WordsBtn>:""}

          </div>
        </div>
      )
    }
}
export default GraduateTaskItem;