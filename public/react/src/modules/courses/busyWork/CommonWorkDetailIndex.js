import React, { Component } from 'react';
import { getRandomNumber } from 'educoder';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../../Loading';
import { WordsBtn, MarkdownToHtml, trigger, queryString, getRandomcode } from 'educoder';
import axios from 'axios';
import CoursesListType from '../coursesPublic/CoursesListType';
import AccessoryModal from "../coursesPublic/AccessoryModal";
import PublishRightnow from './PublishRightnow'
import '../css/Courses.css'
import CBreadcrumb from '../common/CBreadcrumb'
import DownloadMessageysl from "../../modals/DownloadMessageysl";
import ConnectProject from './ConnectProject'
import { Spin } from 'antd'

//引入对应跳转的组件

//新建分组/普通作业
const NewWork = Loadable({
    loader: () => import('./NewWork'),
    loading:Loading,
})

const CommonWorkSetting = Loadable({
  loader: () => import('./CommonWorkSetting'),
  loading:Loading,
})
//普通作业列表
const CommonWorkList = Loadable({
  loader: () => import('./CommonWorkList'),
  loading:Loading,
})
const CommonWorkQuestion = Loadable({
  loader: () => import('./CommonWorkQuestion'),
  loading:Loading,
})
const CommonWorkAnswer = Loadable({
  loader: () => import('./CommonWorkAnswer'),
  loading:Loading,
})
const CommonWorkAppraise = Loadable({
  loader: () => import('./CommonWorkAppraise'),
  loading:Loading,
})

const CommonWorkPost = Loadable({
  loader: () => import('./CommonWorkPost'),
  loading:Loading,
})

const CommonWork = Loadable({
  loader: () => import('./commonWork'),
  loading:Loading,
})
class CommonWorkDetailIndex extends Component{
  constructor(props) {
    super(props)
    this.publishModal = React.createRef();
    this.endModal = React.createRef();
    this.state = {
      DownloadType:false,
      DownloadMessageval:undefined,
      donwloading:false,
    }
  }
  initWorkDetailCommonState = (data) => {
    this.setState({
        ...data
    })
  }
  goback = () => {
    let workId=this.props.match.params.workId;
		//
    if ( window.location.pathname.indexOf('appraise') == -1) {
      let category_id= this.state.category.category_id;
      this.props.toListPage(this.props.match.params, category_id)
    } else {
      this.props.toWorkListPage(this.props.match.params, workId)
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

  }
  doWhenSuccess = () => {
    trigger('commonwork_fetch_all')
  }

  /// 确认是否下载
  confirmysl(url){
    axios.get(url+ '&export=true').then((response) => {
      if(response===undefined){
        return
      }
      if(response.data.status&&response.data.status===-1){

      }else if(response.data.status&&response.data.status===-2){
        if(response.data.message === "100"){
          // 已超出文件导出的上限数量（100 ），建议：

          this.setState({
            DownloadType:true,
            DownloadMessageval:100
          })
        }else {
          //因附件资料超过500M
          this.setState({
            DownloadType:true,
            DownloadMessageval:500
          })
        }
      }else {
        this.props.slowDownload(getRandomcode(url))

        // this.props.showNotification(`正在下载中`);
        // this.setState({ donwloading: true })
        // downloadFile({
        //   url: url,
        //   successCallback: (url) => {
        //     this.setState({ donwloading: false })
        //     console.log('successCallback')
        //   },
        //   failCallback: (responseHtml, url) => {
        //     this.setState({ donwloading: false })
        //     console.log('failCallback')
        //   }
        // })
        // window.open("/api"+url, '_blank');
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  Downloadcal=()=>{
    this.setState({
      DownloadType:false,
      DownloadMessageval:undefined
    })
  }
  bindRef = ref => { this.child = ref };

  // 关联项目
  openConnectionProject = (work) => {
    this.refs['connectProject'].openConnectionProject(work)
  }
  connectSuccess = () => {
    this.child.fetchData && this.child.fetchData()
  }

  cancelConnectionProject = (work) => {
    let workId=this.props.match.params.workId;
    let courseId=this.props.match.params.coursesId;

    const url = `/homework_commons/${work.homework_id}/student_works/cancel_relate_project.json`
    axios.get(url).then((response)=> {
      if (response.data.status == 0) {
        this.child.fetchData && this.child.fetchData()

        this.props.showNotification('取消关联成功')
      }
     }).catch((error)=>{
       console.log(error)
     })
  }
  // 关联项目 END

  render() {
    let {course_name, homework_name, homework_status, noTab
        , view_answer, author_name, category, work_id

        , end_immediately, publish_immediately, work_statuses, accessoryVisible
    } =this.state;
    const { current_user } = this.props

    let courseId=this.props.match.params.coursesId;
    let category_id= category && category.category_id;
    let category_name= category && category.category_name;

    let workId=this.props.match.params.workId;
    const studentWorkId = this.props.match.params.studentWorkId

    const isGroup = this.props.isGroup()
    const moduleName = !isGroup? "普通作业":"分组作业";
    const moduleEngName = this.props.getModuleName()

    const childModuleName = this.state.moduleName
    const commonHandler = {
        initWorkDetailCommonState: this.initWorkDetailCommonState,
        triggerRef: this.bindRef
    }
    const isAdmin = this.props.isAdmin()


    let exportParams = {}
    const isListModule = childModuleName == '作品列表';
    // 是列表页
    let params = {}
    if (isListModule) {
      // TODO
      if(this.child && this.child._getRequestParams) {
        params = this.child._getRequestParams() !== undefined ? this.child._getRequestParams() : {};
      }
    }
    // console.log("普通作业176176176");
    // console.log(params);
    let exportUrl = `/homework_commons/${workId}/works_list.zip?${queryString.stringify(params)}`
    let exportResultUrl = `/homework_commons/${workId}/works_list.xlsx?${queryString.stringify(params)}`
    document.title=course_name === undefined ? "" : course_name;
    return (
        <div>
          <PublishRightnow ref={this.publishModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}
                isPublish={true} doWhenSuccess={this.doWhenSuccess} checkBeforePost={this.saveWorkSetting}
                onToPublishClick={this.onToPublishClick}
          ></PublishRightnow>
          <DownloadMessageysl
            {...this.props}
            value={this.state.DownloadMessageval}
            modalCancel={this.Downloadcal}
            modalsType={this.state.DownloadType}
          />
          <PublishRightnow ref={this.endModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}
                isPublish={false} doWhenSuccess={this.doWhenSuccess}></PublishRightnow>


          <div className="newMain clearfix worklist1">
            <div className={"educontent mt20"}>
              <style>{`
                .memoContent {
                  background: #fff;
                }
              `}</style>
              {current_user && <CBreadcrumb items={[
                { to: current_user&&current_user.first_category_url , name: course_name},
                { to: `/courses/${courseId}/${moduleEngName}/${category_id}`, name: category_name },
                window.location.pathname.indexOf('appraise') == -1 ? { } : { to: `/courses/${courseId}/${moduleEngName}/${workId}/list`, name: '作业详情' },
                // 1.	与上一条联动，当匿评他人作品时，TA人作品的作者真实姓名切换为“匿名”
                window.location.pathname.indexOf('appraise') == -1 ? { name: '作业详情' } : { name: author_name },
                // window.location.pathname.indexOf('appraise') == -1 ? { } : { to: `/courses/${courseId}/${moduleEngName}/${workId}/list`, name: '作品列表' },
                // { name: childModuleName }
              ]}></CBreadcrumb>}

              <div style={{ width:'100%',height:'52px'}} >
                <span className=" fl color-black summaryname" title={`${homework_name && homework_name.length > 36 ? homework_name : ''}`}
                    style={{height: 'auto'}}
                >
                   {homework_name}
                  {/* <Link to={"/courses/"+courseId+"/graduation"+"/graduation_tasks/"}>{homework_name}</Link> */}
                </span>
                <CoursesListType
                  typelist={homework_status}
                  typesylename={"mt12"}
                />


                {category && <a className="color-grey-6 fr font-16 ml30 mt5 mr20" onClick={this.goback} style={{ marginRight: '26px'}}>返回</a>}

                {this.state.update_atta &&
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

              { noTab !== true && <div className="stud-class-set bor-bottom-greyE floatSpinParent">
                <div className="mt10 clearfix edu-back-white poll_list pl5">
                  <Link
                        onClick={() => this.setState({moduleName: '作品列表'})}
                        className={`${isListModule ? 'active' : '' } `}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/list`}>作品列表</Link>
                  <Link
                        onClick={() => this.setState({moduleName: '作业描述'})}
                        className={`${childModuleName == '作业描述' ? 'active' : '' } `}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/question`}>作业描述</Link>
                  {view_answer == true && <Link
                        onClick={() => this.setState({moduleName: '参考答案'})}
                        className={`${childModuleName == '参考答案' ? 'active' : '' } `}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/answer`}>参考答案</Link>}
                  <Link
                        onClick={() => this.setState({moduleName: '设置'})}
                        className={`${childModuleName == '设置' ? 'active' : '' } `}
                        style={{paddingLeft:this.props.isAdmin()?'38px':'20px'}}
                        to={`/courses/${courseId}/${moduleEngName}/${workId}/setting`}>{this.props.isAdmin()?"设置":"得分规则"}</Link>


                  {/* { this.props.tabRightComponents }  */}
                  <React.Fragment>
                    <style>{`
                        .drop_down_menu li a {
                            padding: 0px;
                            font-size: 14px;
                        }
                        .drop_down_menu {
                            width: 121px;
                        }
                        .drop_down_menu li {
                            overflow: visible;
                            width: 121px;
                        }
                        .drop_down_menu, .drop_down_normal {
                            padding-top: 10px;
                            padding-bottom: 8px;
                        }

                        .floatSpinParent .ant-spin-nested-loading {
                          float: right;
                        }
                        `}</style>
                        {this.props.isAdmin()? <Spin spinning={this.state.donwloading} style={{  }}>
                        <li className="li_line drop_down fr color-blue font-16 mt20" style={{"padding":"0 20px"}}>
                        导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                        <ul className="drop_down_menu" style={{"right":"-34px","left":"unset","height":"auto"}}>
                            <li>

                              <a href={"javascript:void(0)"} className="color-dark"
                              	  onClick={() => this.confirmysl(exportResultUrl)}
                              >导出成绩</a>

                            </li>
                            <li>
                              <a href={"javascript:void(0)"} className="color-dark"
                              	  onClick={() => this.confirmysl(exportUrl)}
                              >导出作品附件</a>
                            </li>
                        </ul>
                        </li>
                        </Spin>:""}

                        {/* {isAdmin && <a className={"fr color-blue font-16"} href={exportUrl}>导出作品附件</a>}
                        {isAdmin && <a className={"fr color-blue font-16"} href={exportResultUrl}>导出成绩</a>} */}
                        {/*<a className={"fr color-blue font-16"}>导出</a>*/}
                        {end_immediately &&  <a className={"fr color-blue font-16"} onClick={() => { this.endModal.current.open() } }>立即截止</a>}
                        {publish_immediately && <a className={"fr color-blue font-16"} onClick={() => { this.publishModal.current.open() } } >立即发布</a>}

                        {/*<a className={"fr color-blue font-16"}>项目在线质量检测</a>*/}
                        {isAdmin && <a className={"fr color-blue font-16"} onClick={() => this.props.toEditPage(this.props.match.params, workId)}>编辑作业</a>}

                        { //
                        work_statuses && work_statuses.indexOf('关联项目') != -1 &&
                        <React.Fragment>
                          <ConnectProject ref="connectProject" {...this.props} connectSuccess={this.connectSuccess}></ConnectProject>
                          <WordsBtn style="blue" className={` font-16 fr`} onClick={() => this.openConnectionProject({ homework_id: workId })}>关联项目</WordsBtn>
                          <WordsBtn style="blue" className={` font-16 fr`} onClick={() => this.props.toCreateProject()}>创建项目</WordsBtn>
                        </React.Fragment>
                        }

                        { //
                        work_statuses && work_statuses.indexOf('取消关联') != -1 &&
                        <WordsBtn style="blue" className={` font-16 fr`} onClick={() => this.cancelConnectionProject( {homework_id: workId} )}>取消关联</WordsBtn>
                        }

                        {work_statuses && work_statuses.indexOf('提交作品') != -1 && <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                            onClick={() => { this.props.toWorkPostPage(this.props.match.params)}}
                        >提交作品</a>}

                        { work_statuses && work_statuses.indexOf('补交作品') != -1 &&
                        <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                            onClick={() => { this.props.toWorkPostPage(this.props.match.params)}}>
                        补交作品</a> }

                        {work_statuses && work_statuses.indexOf('修改作品') != -1 && <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                            onClick={() => { this.props.toWorkPostPage(this.props.match.params, null, true, work_id)}}
                        >修改作品</a>}
                        {work_statuses && work_statuses.indexOf('补交附件') != -1 &&
                        <React.Fragment>
                        <AccessoryModal
                            {...this.props}
                            modalname={"补交附件"}
                            visible={accessoryVisible}
                            Cancelname={"取消"}
                            Savesname={"确认"}
                            Cancel={this.Cancelvisible}
                            setupdate={this.setupdate}
                            reviseAttachmentUrl={`/student_works/${work_id}/revise_attachment.json`}
                        />
                        <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                            onClick={this.addAccessory}
                        >补交附件</a>
                        </React.Fragment>

                        }
                    </React.Fragment>

                </div>
            </div> }

                {/* 内容区 */}
                <Switch {...this.props}>

                    {/* --------------------------------------------------------------------- */}

                    {/* 作业设置 */}
                    {/* http://localhost:3007/courses/1309/homework/9300/setting */}
                    <Route exact path="/courses/:coursesId/common_homeworks/:workId/setting"
                        render={
                        (props) => (<CommonWorkSetting {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>

                    {/* 作品列表 */}
                    <Route exact path="/courses/:coursesId/common_homeworks/:workId/list"
                        render={
                        (props) => (<CommonWorkList ref="commonWorkList"  triggerRef={this.bindRef} {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>

                    {/* 作业问答 */}
                    <Route exact path="/courses/:coursesId/common_homeworks/:workId/question"
                        render={
                        (props) => (<CommonWorkQuestion {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>
                    <Route exact path="/courses/:coursesId/common_homeworks/:workId/answer"
                        render={
                        (props) => (<CommonWorkAnswer {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>


                    <Route exact path="/courses/:coursesId/group_homeworks/:workId/setting"
                        render={
                        (props) => (<CommonWorkSetting {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>

                    {/* 作品列表 */}
                    <Route exact path="/courses/:coursesId/group_homeworks/:workId/list"
                        render={
                        (props) => (<CommonWorkList triggerRef={this.bindRef} {...this.props} {...props} {...this.state}  {...commonHandler}/>)
                        }
                    ></Route>

                    {/* 作业问答 */}
                    <Route exact path="/courses/:coursesId/group_homeworks/:workId/question"
                        render={
                        (props) => (<CommonWorkQuestion {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>
                    <Route exact path="/courses/:coursesId/group_homeworks/:workId/answer"
                        render={
                        (props) => (<CommonWorkAnswer {...this.props} {...props} {...this.state} {...commonHandler}/>)
                        }
                    ></Route>
                </Switch>
            </div>
          </div>
        </div>

    )
  }
}

export default  ( CommonWorkDetailIndex) ;