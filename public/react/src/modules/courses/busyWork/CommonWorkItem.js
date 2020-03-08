import React,{ Component } from "react";
import { Input,Checkbox, Modal,Menu, Tooltip, Pagination } from "antd";

import '../css/members.css'
import '../css/busyWork.css'
import CoursesListType from '../coursesPublic/CoursesListType'
import { WordsBtn } from 'educoder'
import AccessoryModal2 from '../coursesPublic/AccessoryModal2'
import AccessoryModal from '../coursesPublic/AccessoryModal'
import axios from 'axios'
class CommonWorkItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      aModalVisible: false
    }
  }
  onItemClick = (item) => {

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

		const isStudent = this.props.isStudent()
    if (isStudent) {
      this.props.toWorkQuestionPage(this.props.match.params, item.homework_id)
    } else {
      this.props.toWorkListPage(this.props.match.params, item.homework_id)
    }
  }
  sendMoreAttachment = (item) => {
    this.handleItem = item;
    const url  = `/student_works/${item.work_id}/supply_attachments.json`
    axios.get(url, {
      })
    .then((response) => {
      if (response.data.revise_attachments) {
        // response.data.revise_attachments = [
        //   {
        //       "id": 8686,
        //       "title": "lasdl",
        //       "filesize": 12323,
        //       "description": "1原因3",
        //       "url": "/attachments/:id/download",
        //       "delete": true
        //    }
        // ] 
        // response.data.revise_reason = 'qweqweqweqe';
        
        // revise_reason revise_attachments 传给modal
        // attach to fileList
        const fileList = response.data.revise_attachments.map(item => {
          return {
            id: item.id,
            uid: item.id,
            name: item.title,
            url: item.url,
            status: 'done',

            description: item.description,
            delete: item.delete,
            filesize: item.filesize,
          }
        })

        this.setState({ aModalVisible: true, fileList, revise_reason: response.data.revise_reason })

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  toProductPage = (item) => {

  }
  // Cancelvisible = () => {
  //   this.setState({ aModalVisible: false })
  // }
  onAccessoryModalSaves = (newfileList, description) => {
    const url = `/student_works/${this.handleItem.work_id}/revise_attachment.json`
    axios.post(url, {
      "description": description,
      "attachment_ids": newfileList
    })
    .then((response) => {
      if (response.data.status == 0) {
        this.props.showNotification('提交成功')

      }
    })
    .catch(function (error) {
      console.log(error);
    });
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
  }

  render(){
    let { mainList,workType }=this.props;
    const { aModalVisible, fileList, revise_reason } = this.state
    let coursesId = this.props.match.params.coursesId;

    const isStudent = this.props.isStudent()
    const isAdmin = this.props.isAdmin()
    const isAdminOrStudent = this.props.isAdminOrStudent()
    return(
      <div className="workList">
      {/* <AccessoryModal2
        visible={aModalVisible}
        Cancel={this.Cancelvisible}
        Saves={this.onAccessoryModalSaves}
        fileList={fileList}
        description={revise_reason}
      ></AccessoryModal2> */}
        <style>
          {
            `
            .comnonwidth580{
              max-width: 580px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
             }
             a:hover{
                 color: #4cacff;
             }
            `
          }
        </style>
      {
        mainList && mainList.homeworks && mainList.homeworks.length>0 && mainList.homeworks.map((item,index)=>{
          let canNotLink = !isAdminOrStudent && item.private_icon == true
          return(
        <div className="mt20 edu-back-white padding02010" key={index} >
          <div className="clearfix">
            <div className="workList_Item">
              {
                mainList && isAdmin &&
                <span className="fl mr12"><Checkbox value={item.homework_id} key={item.homework_id}></Checkbox></span>
              }

              <div className="flex1" onClick={() => this.props.onItemClick(Object.assign({}, item, {id: item.homework_id})) }>
                <p className="clearfix mb20">
										{canNotLink?<span className={"fl font-16 font-bd mt2 comnonwidth580 pointer color-grey-name"}
												title={ canNotLink ? "私有属性，非课堂成员不能访问" : item.name}
										>
											{item.name}
										</span>:<a className={"fl font-16 font-bd mt2 comnonwidth580 pointer"}
												onClick={ canNotLink ? () => {} : () => this.onItemClick(item)}
												title={item.name}
										>{item.name}</a>}
              {/* 只有非课堂成员且作业是私有的情况下才会为true */}
                  {
                    item.private_icon===true ? 
                    (<Tooltip title={"私有属性，非课堂成员不能访问"} placement="bottom" >
                      <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl"></i>
                     </Tooltip>) : ""
                  }
                  
                  <span className="fl">
                    <CoursesListType typelist={item.status} />
                  </span>
                  {/* {
                    mainList && isAdmin &&
                    <li className="fr drop_down">
                      <i className="iconfont icon-caidan font-16 color-grey-c"></i>
                      <ul className="drop_down_normal" style={{ textAlign: 'center'}}>
                        <li onClick={ () => { this.props.toEditPage(this.props.match.params, item.homework_id) }}>
                          <a href={`javascript:void(0)`} >编辑</a>
                        </li>
                        <li onClick={ () => { this.props.toWorkSettingPage(this.props.match.params, item.homework_id) }}>
                          <a href={`javascript:void(0)`}
                          >设置</a>
                        </li>
                      </ul>
                    </li>
                    } */}
                </p>
                <p className="color-grey-9 clearfix">
									{ item.author && <span className="mr20 fl">{item.author}</span> }
									{item.commit_count===undefined?"":<span className="mr20 fl">{item.commit_count} 已交</span>}
									{item.uncommit_count===undefined?"":<span className="mr20 fl">{item.uncommit_count} 未交</span>}
                  {
                    item.status_time!="" && 

                      <span className="mr20 fl">{item.status_time}</span>

                  }
                  {/*<Tooltip placement="bottom" title={ item.status.indexOf('提交中') != -1 ? '提交剩余时间' :*/}
                  {/*  item.status.indexOf('补交中') != -1 ? '补交剩余时间' :*/}
                  {/*    item.status.indexOf('申诉中') != -1 ? '申诉剩余时间' :*/}
                  {/*      item.status.indexOf('匿评中') != -1 ? '匿评剩余时间' :*/}
                  {/*        item.status.indexOf('匿评申诉中') != -1 ? '匿评申诉剩余时间' : ''}>*/}
                  {/*</Tooltip>*/}
                  {isAdmin && <div className="fr">
                      <WordsBtn style="blue"  className={"fl font-16 ml28"}
                                onClick={ canNotLink ? () => {} : () => this.onItemClick(item)}
                      >查看详情</WordsBtn>
                      <WordsBtn style="blue" className="fl font-16 ml28" onClick={ () => { this.props.toEditPage(this.props.match.params, item.homework_id) }}>编辑</WordsBtn> 
                      <WordsBtn style="blue" className="fl font-16 ml28" onClick={ () => { this.props.toWorkSettingPage(this.props.match.params, item.homework_id) }}>设置</WordsBtn> 
                    </div>}

                  {
                    //  
                    isStudent &&
                    <li className="fr">
                      <WordsBtn style="blue"  className={"fl font-16"}
                                onClick={ canNotLink ? () => {} : () => this.onItemClick(item)}
                      >查看详情</WordsBtn>

                      { //
                      item.work_status && item.work_status.indexOf('关联项目') != -1 && 
                      <React.Fragment>
                        <WordsBtn style="blue" className={` font-16 fl ml28`} onClick={() => this.props.toCreateProject(item)}>创建项目</WordsBtn>
                        <WordsBtn style="blue" className={` font-16 fl ml28`} onClick={() => this.props.openConnectionProject(item)}>关联项目</WordsBtn>
                      </React.Fragment>
                      }
                      
                      { //
                      item.work_status && item.work_status.indexOf('取消关联') != -1 && 
                      <WordsBtn style="blue" className={` font-16 fl ml28`} onClick={() => this.props.cancelConnectionProject(item)}>取消关联</WordsBtn>
                      }
                      { //
                      item.work_status && item.work_status.indexOf('提交作品') != -1 && 
                      <WordsBtn style="blue" className="fl font-16 ml28" onClick={() => this.props.toWorkPostPage(this.props.match.params, item.homework_id)}>提交作品</WordsBtn> 
                      }
                      
                      
                      { 
                        // 
                        item.work_status && item.work_status.indexOf('补交作品') != -1 &&
                       <WordsBtn style="blue" className="fl font-16 ml28" onClick={() => this.props.toWorkPostPage(this.props.match.params, item.homework_id)}>补交作品</WordsBtn> }

                      { //
                      item.work_status && item.work_status.indexOf('修改作品') != -1 && 
                      <WordsBtn style="blue" className="fl font-16 ml28" onClick={() => this.props.toWorkPostPage(this.props.match.params, item.homework_id, true, item.work_id)}>修改作品</WordsBtn> 
                      }
                      { //
                      item.work_status && item.work_status.indexOf('补交附件') != -1 && 
                      <React.Fragment>
                        <AccessoryModal
                          {...this.props}
                          modalname={"补交附件"}
                          visible={this.state.accessoryVisible}
                          Cancelname={"取消"}
                          Savesname={"确认"}
                          Cancel={this.Cancelvisible}
                          setupdate={this.setupdate}
                          reviseAttachmentUrl={`/student_works/${item.work_id}/revise_attachment.json`}
													seeworks={`/courses/${this.props.match.params.coursesId}/common_homeworks/${item.homework_id}/${item.work_id}/appraise`}
                        />
                        <WordsBtn style="blue" className="fl font-16 ml28" onClick={() => this.addAccessory(item)}>补交附件</WordsBtn> 
                      </React.Fragment>

                        }
                      { 
                        // 
                        item.work_status && item.work_status.indexOf('查看作品') != -1 &&
                       <WordsBtn style="blue" className="fl font-16 ml28" onClick={() => this.props.toWorkDetailPage(this.props.match.params, item.homework_id, item.work_id)}>查看作品</WordsBtn> }


                    </li>
                  }
                </p>
              </div>
            </div>
          </div> 
        </div>
            )
          })
        }
    </div>
    )
  }
}
export default CommonWorkItem;