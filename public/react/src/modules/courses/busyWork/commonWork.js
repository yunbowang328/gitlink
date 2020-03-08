import React,{ Component } from "react";
import { Input,Checkbox,Menu,Pagination,Spin} from "antd";
import UseBank from './UseBank'
import '../css/members.css'
import '../css/busyWork.css'
import CommonWorkItem from './CommonWorkItem'
import PublishRightnow from './PublishRightnow'
import ConnectProject from './ConnectProject'
import { WordsBtn, on, off } from 'educoder'
import Modals from '../../modals/Modals'
import NoneData from "../coursesPublic/NoneData"
import Titlesearchsection from '../common/titleSearch/TitleSearchSection';
import { RouteHOC } from './common'
import axios from 'axios';
import _ from 'lodash'

// const Search = Input.Search;
// const map={1:"普通作业",2:"",3:"分组作业"}
// const COMMON_WORK = 1
// const COMMON_WORK = 2
class commonWork extends Component{
  constructor(props){
    super(props);
    this.state={
      modalsType:"",
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:"",
      mainList:undefined,
      selectedKeys: 'all',
      order:"",
      page:1,
      search:"",
      totalCount:0,
      checkAll:false,
      checkBoxValues:[],
      isSpin:false
    }
  }
  //输入搜索条件
  inputStudent=(e)=>{
    this.setState({
      search:e.target.value,
    })
  }
  //搜索查询
  searchStudent=()=>{
    let {page,search,order}=this.state;
    this.getList(1,search,order);
  }
  openConnectionProject = (work) => {
    this.refs['connectProject'].openConnectionProject(work)
  }

  // 新建
  createCommonWork=(type)=>{
    this.props.toNewPage(this.props.match.params) 
  }

  cancelDelClasses=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:false
    })
  }
  sureDelClasses(){

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.path != this.props.match.path) {
      this.clearSelection()
      this.setState({ selectedKeys: 'all', order: '' }, () => {
        this._getList()
      })
    }
  }
  
  _getList = () => {
    this.setState({
      isSpin:true
    })
    let {page,search,order}=this.state;
    this.getList(page,search,order);
  }
  componentDidMount(){
    this._getList()

    on('updateNavSuccess', this.updateNavSuccess)
  }
  componentWillUnmount() {
    off('updateNavSuccess', this.updateNavSuccess)
  }
  updateNavSuccess = () => {
    this._getList()
  }
  
  useBankSuccess = (checkBoxValues, newWorkIdArray) => {
    this.setState({
      page:1,
      checkBoxValues: newWorkIdArray
    }, () => {
      this.refs['publishModalRef'].open()
    })
    
    let {search, order}=this.state;
    this.getList(1, search, order);
  }

  getList=(page,search,order)=>{
    this.setState({
      isSpin:true
    })
    let id=this.props.match.params.coursesId;
    let workType = this.props.getModuleType()
    let url="/courses/"+id+"/homework_commons.json?type="+workType+"&page="+page;
    if(order!=""){
      url+="&order="+order;
    }
    if(search!=""){
      url+="&search="+search;
    }
    axios.get(encodeURI(url)).then((result)=>{
      if(result.status==200){
        this.setState({
          mainList:result.data,
          totalCount:result.data.task_count,
          isSpin:false,
          page:page,
          ...result.data
        })
      }
    }).catch((error)=>{
      this.setState({
        isSpin:false
      })
    })
  }
  //筛选条件
  selectedStatus=(e)=>{
    this.clearSelection()
    this.setState({
      order:e.key==="all"?"":e.key,
      selectedKeys: e.key,
      page:1,
      isSpin:true,
      checkBoxValues:[],
      checkAll:false
    })
    let {search}=this.state;
    this.getList(1,search,e.key==="all"?"":e.key);
  }

  onPageChange=(pageNumber)=>{
    this.setState({
      page:pageNumber,
			checkBoxValues:[]
    })
    let {search,order}=this.state;
    this.getList(pageNumber,search,order);
  }

  // 全选和反选
  changeAll=(e)=>{
    this.setState({
      checkAll: e.target.checked
    })

    const valueId=this.state.mainList.homeworks.map(item=>{
      return item.homework_id
    })
    if (e.target.checked) {
      const concated = this.state.checkBoxValues.concat(valueId);
      const sortedUniqed = _.uniq(concated)
      this.setState({
        checkBoxValues: sortedUniqed
      })
    } else {
      this.setState({
        checkBoxValues: _.difference(this.state.checkBoxValues, valueId)
      })
    }
  }

  onChangeSelect=(checkedValues)=>{
    this.setState({
      checkBoxValues: checkedValues,
      checkAll: checkedValues.length == this.state.mainList.homeworks.length
    })
  }

  onWorkDelete = () => {
    const { checkBoxValues } = this.state;
    const len = checkBoxValues.length;
    if (len == 0) {
      this.props.showNotification('请先选择要删除的作业')
      return;
    }
    this.props.confirm({
      // content: `确认要删除所选的${len}个作业吗？`,
      content: <div>
        <div>已提交作品将全部被删除，不可恢复</div>
        <div>是否确认删除?</div>
      </div>,
      onOk: () => {
        let coursesId=this.props.match.params.coursesId;
        const url = `/courses/${coursesId}/homework_commons/multi_destroy.json`
        axios.post(url, {
          homework_ids: checkBoxValues,
          all_check: 0,
          // group_ids
        }).then((response) => {
          if (response.data.status == 0) { 
            this.props.showNotification('删除成功')
            this.clearSelection()
            let {search,order}=this.state;
            this.getList(1,search,order);
            this.props.updataleftNavfun()
          }

        }).catch((error) => {
          console.log(error)
        })
      }
    })
    
  }
  clearSelection = () => {
    this.setState({ checkBoxValues: [], checkAll: false })
  }
  // 
  onSetPublic = () => {
    const { checkBoxValues } = this.state;
    const len = checkBoxValues.length;
    if (len == 0) {
      this.props.showNotification('请先选择要公开的作业')
      return;
    }
    this.props.confirm({
      content: <div>
        <div>设为公开后，非课堂成员也可以访问查看</div>
        <div>是否确认设为公开？</div>
      </div>,
      onOk: () => {
        let coursesId=this.props.match.params.coursesId;
        const url = `/courses/${coursesId}/homework_commons/set_public.json`
        axios.post(url, {
          homework_ids: checkBoxValues,
          all_check: 0
        }).then((response) => {
          if (response.data.status == 0) { 
            this.props.showNotification('设为公开操作成功')
            let {search,order, page}=this.state;
            this.getList(page,search,order);
          }

        }).catch((error) => {
          console.log(error)
        })
      }
    })
  }
  doWhenSuccess = () => {
    let {search,order, page}=this.state;
    this.getList(page,search,order);
    this.setState({
			checkBoxValues:[]
		})
  }
  onItemClick = (item) => {
    const checkBoxValues = this.state.checkBoxValues.slice(0);
    const index = checkBoxValues.indexOf(item.id);
    if (index != -1) {
      _.remove(checkBoxValues, (listItem)=> listItem === item.id)
    } else {
      checkBoxValues.push(item.id)
    }
    this.onChangeSelect(checkBoxValues)
  }
  addToBank = () => {
    const { checkBoxValues } = this.state;
    const len = checkBoxValues.length;
    if (len == 0) {
      this.props.showNotification('请先选择要加入题库的作业')
      return;
    }
    const coursesId = this.props.match.params.coursesId
    const url = `/courses/${coursesId}/homework_commons/add_to_homework_bank.json`
    axios.post(url, {
      homework_ids: checkBoxValues,
      all_check: 0
    }).then((response) => {
      if (response.data.status == 0) { 
        this.props.showNotification('加入成功')
        let {search,order}=this.state;
        this.getList(1,search,order);
      }

    }).catch((error) => {
      console.log(error)
    })
  }
  connectSuccess = () => {
    let {page,search,order}=this.state;
    this.getList(page,search,order);
  }

  cancelConnectionProject = (work) => {
    let workId=this.props.match.params.workId;
    let courseId=this.props.match.params.coursesId;

    const url = `/homework_commons/${work.homework_id}/student_works/cancel_relate_project.json`
    axios.get(url).then((response)=> {
      if (response.data.status == 0) {
        let {page,search,order}=this.state;
        this.getList(page,search,order);
        this.props.showNotification('取消关联成功')
      }
     }).catch((error)=>{
       console.log(error)
     })
  }

  
  render(){
    let {
      search,
      page,
      modalsType,
      modalsTopval,
      modalsBottomval,
      mainList,
      totalCount,
      checkAll,
      checkBoxValues,

      task_count,
      published_count,
      unpublished_count,
      main_category_name,
    }=this.state;
    const { coursedata } = this.props;
    if (!coursedata) {
      return ''
    }
    let workType = this.props.getModuleType()
    const moduleChineseName = this.props.getModuleName(true)
    const { course_public } = coursedata;

    const isGroup = this.props.isGroup()
    const isAdmin = this.props.isAdmin()

    // <CourseLayoutcomponent {...this.props}>
    // </CourseLayoutcomponent>
    return(
      
      <div>
        {/* <div className="edu-back-white">
          <p className="clearfix padding30 bor-bottom-greyE">
            <span className="font-18 fl color-dark-21">{moduleChineseName}</span>
            
          </p>
          <div className="clearfix pl30 pr30">
            <div className="fl mt6 task_menu_ul">
              <Menu mode="horizontal" defaultSelectedKeys="all" onClick={this.selectedStatus}>
                <Menu.Item key="all">全部</Menu.Item>
                {isAdmin && <Menu.Item key="0">未发布</Menu.Item>}
                <Menu.Item key="1">提交中</Menu.Item>
                <Menu.Item key="2">补交中</Menu.Item>
                <Menu.Item key="3">匿评中</Menu.Item>
                <Menu.Item key="4">申诉中</Menu.Item>
                <Menu.Item key="5">评阅中</Menu.Item>
              </Menu>
            </div>
            <div className="fr mt16 mb16 searchView">
              <Search 
              value={search}
              placeholder="请输入姓名进行搜索"
              onInput={this.inputStudent}
              onSearch={this.searchStudent}
              ></Search>
            </div>
          </div>
        </div> */}
        <ConnectProject ref="connectProject" {...this.props} connectSuccess={this.connectSuccess}></ConnectProject>


        <Titlesearchsection
            title={main_category_name}
            searchValue={ search }
            // searchtype={this.props.isAdmin||this.props.isStudent ?true:false}
            onInputSearchChange={this.inputStudent}
            onPressEnter={this.searchStudent}
            allowClearonChange={this.inputStudent}
            firstRowRight={
              <React.Fragment>
                { isAdmin && <WordsBtn style="blue" className="fr" onClick={()=>this.createCommonWork(1)}>新建</WordsBtn>}
                { isAdmin && <li className="fr">
                  <UseBank {...this.props} {...this.state} object_type={isGroup ? "group" : "normal"} useBankSuccess={this.useBankSuccess}></UseBank>
                </li> }
              </React.Fragment>
            }
            secondRowBotton={
              <div className="fl mt6 task_menu_ul">
                <Menu mode="horizontal" selectedKeys={this.state.selectedKeys} onClick={this.selectedStatus}>
                  <Menu.Item key="all">全部</Menu.Item>
                  {isAdmin && <Menu.Item key="0">未发布</Menu.Item>}
                  <Menu.Item key="1">提交中</Menu.Item>
                  <Menu.Item key="2">补交中</Menu.Item>
                  <Menu.Item key="3">匿评中</Menu.Item>
                  <Menu.Item key="4">申诉中</Menu.Item>
                  <Menu.Item key="5">已截止</Menu.Item>
                </Menu>
              </div>
            }
            secondRowLeft={
              <div style={{"display":"inline-block", "marginTop": "22px"}}>
                <span>共 {mainList&&mainList.all_count} 个{moduleChineseName}</span>
                <span style={{"marginLeft":"16px"}}>已发布：{published_count}个</span>
                {/* {this.props.isAdmin()?:""} */}
                <span style={{"marginLeft":"16px"}}>未发布：{unpublished_count}个</span>
              </div>
            }
            searchPlaceholder={"请输入名称进行搜索"}
            showSearchInput={true}
        ></Titlesearchsection>
        <PublishRightnow ref="publishModalRef" showActionButton={true} {...this.props} checkBoxValues={checkBoxValues} 
                showActionButton={false}
                isPublish={true}
						    islist={true}
						    isPublishtype={1}
								doWhenSuccess={this.doWhenSuccess} fromListPage={true}></PublishRightnow>
          {
            mainList && mainList.course_identity < 5 && mainList.homeworks.length>0 &&
          <div className="mt20 edu-back-white padding20-30">
            <div className="clearfix" >
              <Checkbox className="fl" onChange={this.changeAll}  checked={checkAll}>已选 {checkBoxValues.length} 个     （不支持跨页勾选）</Checkbox>
              <div className="studentList_operation_ul">
                <li className="li_line">
                  <a href="javascript:void(0)" className="color-grey-9"
                      onClick={this.onWorkDelete}>删除</a>
                </li>
                <li className="li_line">
                  <a href="javascript:void(0)" className="color-grey-9" onClick={() => this.refs['publishModalRef'].homeworkstart()}>{ "立即发布" }</a>
                </li>
                <li className="li_line">
                  <PublishRightnow showActionButton={true} {...this.props} checkBoxValues={checkBoxValues} 
                     isPublish={false} doWhenSuccess={this.doWhenSuccess} fromListPage={true}></PublishRightnow>
                </li>
                
                { !!course_public && <li className="li_line"><a href="javascript:void(0)" onClick={this.onSetPublic} className="color-grey-9">设为公开</a></li>}
								{this.props.user&&this.props.user.main_site===true?<li><a href="javascript:void(0)" className="color-grey-9"
                  onClick={this.addToBank}
                >加入题库</a></li>:""}
              </div>
              {/* 设为公开 */}
              <Modals
                modalsType={modalsType}
                modalsTopval={modalsTopval}
                modalsBottomval={modalsBottomval}
                modalCancel={this.cancelDelClasses}
                modalSave={this.sureDelClasses}
              >
              </Modals>
            </div>
          </div>
          }


        <Spin size="large" spinning={this.state.isSpin}>
          <Checkbox.Group style={{"width":"100%"}} onChange={this.onChangeSelect} value={checkBoxValues}>
            <CommonWorkItem mainList={mainList} {...this.props} workType={workType} onItemClick={this.onItemClick}
              openConnectionProject={this.openConnectionProject}
              cancelConnectionProject={this.cancelConnectionProject}
            ></CommonWorkItem>
          </Checkbox.Group>
        </Spin>

        {
          mainList && mainList.homeworks && mainList.homeworks.length==0 && <NoneData></NoneData>
        }

        {
          !!totalCount && totalCount > 15 &&
          <div className="edu-txt-center pt30 pb10 clearfix">            
            <Pagination current={page} showQuickJumper pageSize={15} total={totalCount} onChange={this.onPageChange}></Pagination>
          </div>
        }
      </div>
    )
  }
}
export default RouteHOC() (commonWork);