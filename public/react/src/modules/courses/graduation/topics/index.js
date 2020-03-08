import React,{ Component } from "react";
import {Checkbox, Menu, Pagination,Spin} from "antd";

import Titlesearchsection from '../../common/titleSearch/TitleSearchSection'
import DownloadMessageysl from "../../../modals/DownloadMessageysl";

import { WordsBtn ,getRandomcode,getRandomNumber} from 'educoder'
import NoneData from '../../coursesPublic/NoneData'
import Modals from "../../../modals/Modals"
import axios from 'axios'

import _ from 'lodash'

import GraduateTopicItem from './GraduateTopicItem'
import ChooseGraduateTopicModal from './ChooseGraduateTopicModal'
import '../../css/members.css'
import '../../css/busyWork.css'
import '../style.css'


class Boards extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      checkAllValue: false,
      checkBoxValues: [],
      data:[],
      topicList: undefined,
      course_public:1,
      page:1,
      totalCount:undefined,
      status:"all",
      pageSize:15,
      modalsType:"",
      modalsTopval:"",
      modalsBottomval:"",
      topicId:undefined,
      index:undefined,
      flag:true,
      delType:false,
      delTopval:"",
      delLoadType:false,
      delOrPublic:1,
      isSpin:true,
      DownloadType:false,
      DownloadMessageval:undefined,
    }
  }
  fetchAll = (searchValue,page,status) => {
    this.setState({
      checkAllValue: false,
      isSpin:true
    })

    let {pageSize}=this.state;
    const cid = this.props.match.params.coursesId

    let url = `/courses/${cid}/graduation_topics.json?limit=${pageSize}`
    if(searchValue!=""){
      url+="&search="+searchValue
    }
    if(page!=""){
      url+="&page="+page
    }
    if(status!="" && status != "all"){
      url+="&status="+status;
    }
    url=encodeURI(url);//IE11传参为乱码（search）
    axios.get(url
    //   ,{
    //   params:{
    //     search:encodeURI(searchValue),
    //     page:page,
    //     status:status,
    //     limit:pageSize
    //   }
    // }
    ).then((response) => {
      if (response.status == 200 && response.status) {
        this.setState({
          data:response.data,
          topicList:response.data.graduation_topic,
          totalCount:response.data.graduation_topic_count,
          course_public:response.data.course_public,
          isSpin:false,
          page:page
        })
      }
    })
    .catch(function (error) {
      this.setState({
        isSpin:false
      })
    });
  }
  componentDidMount = () => {
    this.setState({
      isSpin:true
    })
    let{searchValue,page,status}=this.state
    this.fetchAll(searchValue,page,status);

  }



  //搜索
  onPressEnter = (value) => {
    this.setState({
      page:1,
      searchValue:value,
      checkBoxValues:[]
    })
    let {status}=this.state;
    this.fetchAll(value,1,status);
  }

  onInputSearchChange = (e) => {
    this.setState({
      searchValue:e.target.value,
    })
  }


  // 全选or反选
  onCheckAll = (e) => {
    this.setState({
      checkAllValue: e.target.checked
    })
    const values = this.state.topicList.map(item => {
      return item.id
    })
    if (e.target.checked) {
      const concated = this.state.checkBoxValues.concat(values);
      const uniq=_.uniq(concated)
      this.setState({
        checkBoxValues: uniq
      })
    } else {
      this.setState({
        checkBoxValues: _.difference(this.state.checkBoxValues, values)
      })
    }
  }

  onItemClick = (item) => {
    const checkBoxValues = this.state.checkBoxValues.slice(0);
    const index = checkBoxValues.indexOf(item.id);
    if (index != -1) {
      _.remove(checkBoxValues, (listItem)=> listItem === item.id)
    } else {
      checkBoxValues.push(item.id)
    }
    this.onCheckBoxChange(checkBoxValues)
  }

  onCheckBoxChange = (checkedValues) => {
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue: checkedValues.length == this.state.topicList.length
    })
  }

  // 分页
  onChangePage=(pageNum)=>{
    this.setState({
      page:pageNum,
			checkBoxValues:[]
    })
    let {status,searchValue}=this.state;
    this.fetchAll(searchValue,pageNum,status);
    console.log(this.state.checkBoxValues);
  }

  // 筛选
  onChangeStatus =(e)=>{
    this.setState({
      page:1,
      status:e.key,
      checkBoxValues:[],
      isSpin:true
    })
    let {searchValue}=this.state;
    this.fetchAll(searchValue,1,e.key==="all"?"":e.key);
  }

  // 选题or取消选题
  chooseTopic=(topicId,index,flag)=>{
    this.setState({
      modalsType:true,
      modalsTopval:flag ==true ? "是否确认取消选题？":"是否确认选题？",
      modalsBottomval:"",
      modalCancel:true,
      topicId:topicId,
      index:index,
      flag:flag
    })
  }
  cancelOperateTopic=()=>{
    this.setState({
      modalsType:false,
      modalsTopval:"",
      modalsBottomval:"",
      modalCancel:false
    })
  }
  sureOperateTopic=()=>{
    let{topicId,index,flag}=this.state;
    let courseid=this.props.match.params.coursesId

    let url="/courses/"+courseid+"/graduation_topics/"+topicId+"/"
    if(flag){
      url+="student_cancel_topic.json"
    }else{
      url+="student_select_topic.json"
    }
    axios.post((url)).then((result)=>{
      if(result.data.status == 0){
        this.props.showNotification(`${result.data.message}`);
        let {searchValue,page,status} =this.state
        this.fetchAll(searchValue,page,status);
        this.cancelOperateTopic();
      }
    }).catch(error=>{
      console.log(error);
    })
  }
// 删除
onDelete=(index)=>{
  let {checkBoxValues}=this.state;
  if(checkBoxValues.length>0){
    if(index<3){
      this.setState({
        delType:true,
        delTopval:index==1?"是否确认删除?":"是否设为公开?",
        delLoadType:false,
        delOrPublic:index
      })
    }else{
      // 加入题库
      let courseid=this.props.match.params.coursesId
      let url=`/courses/${courseid}/graduation_topics/add_to_bank.json`;
      axios.post((url),{
        topic_ids:checkBoxValues
      }).then((result)=>{
        if(result){
          this.props.showNotification(`题库更新成功`);
          let {searchValue,page,status} =this.state
          this.fetchAll(searchValue,page,status);
          this.setState({
            checkBoxValues:[],
            checkAllValue:false
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
    }

  }else{
    this.setState({
      // delType:true,
      // delTopval:"请先在列表中选择数据",
      // delLoadType:true,
      delOrPublic:index
    })
    this.props.showNotification("请先在列表中选择数据");
  }
}
cancelDelTopic=()=>{
  this.setState({
    delType:false,
    delTopval:"",
    delLoadType:false
  })
}
sureDelTopic=()=>{
  let {checkBoxValues,delOrPublic}=this.state;
  if(checkBoxValues.length>0){
    let courseid=this.props.match.params.coursesId;
    let url="";
    // 删除
    if(delOrPublic==1){
      url="/courses/"+courseid+"/graduation_topics/destroys.json";
      axios.delete((url), { data: {
        graduation_topic_ids: this.state.checkBoxValues
      }})
      .then((result)=>{
        if(result.data.status==0){
          this.props.showNotification(`${result.data.message}`);
          this.setState({
            delType:false,
            delTopval:"",
            checkBoxValues:[]
          })
          let {searchValue,status} =this.state;
          this.fetchAll(searchValue,1,status);
        }
      }).catch((error)=>{
        console.log(error);
      })
    }else if(delOrPublic==2){
      // 设为公开
      url="/courses/"+courseid+"/graduation_topics/set_public.json";
      axios.post((url), {
        graduation_topic_ids: this.state.checkBoxValues
      }).then((result)=>{
        if(result.data.status==0){
          this.props.showNotification(`${result.data.message}`);
          this.setState({
            delType:false,
            delTopval:"",
            checkBoxValues:[]
          })
          let {searchValue,status} =this.state;
          this.fetchAll(searchValue,1,status);
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }else{
    this.setState({
      delType:false,
      delTopval:"",
      delLoadType:false
    })
  }
}
// 新建
onBoardsNew=()=>{
  let courseId=this.props.match.params.coursesId
  this.props.history.push(`/courses/${courseId}/graduation_topics/new`)
}
  /// 确认是否下载
  confirmysl(url){
    axios.get(url + '&export=true').then((response) => {
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
        this.props.showNotification(`正在下载中`);
        window.open(getRandomcode("/api"+url), '_blank');
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

	// 题库选用成功后刷新页面
	useBankSuccess=(checkBoxValues,object_ids)=>{
		//debugger
		let {searchValue,page,status} =this.state
		this.fetchAll(searchValue,page,status);
	}
  render(){
    let {
      searchValue,
      topicList,
      data,
      course_public,
      checkBoxValues,
      checkAllValue,
      page,
      totalCount,
      pageSize,
      //选题和取消选题
      modalsType,
      modalsTopval,
      modalsBottomval,
      // 删除弹框
      delType,
      delTopval,
      delLoadType
    } = this.state;
    // let {course_identity}=this.props.coursedata
    const isAdmin =this.props.isAdmin();
    return(
      <React.Fragment >
        <ChooseGraduateTopicModal ref="chooseGraduateTopicModal"></ChooseGraduateTopicModal>
        <DownloadMessageysl
          {...this.props}
          value={this.state.DownloadMessageval}
          modalCancel={this.Downloadcal}
          modalsType={this.state.DownloadType}
        />
          <Titlesearchsection
            title="毕设选题"
            searchValue={ searchValue }
            onInputSearchChange={this.onInputSearchChange}
            allowClearonChange={this.onInputSearchChange}
            firstRowRight=
            { isAdmin ?
              (<React.Fragment>
                {/* 参考普通作业 - 题库选用 */}
                {/* <WordsBtn style="blue" className="mr30" onClick={()=>this.useFromBank()}>题库选用</WordsBtn> 正式版没有，先隐藏*/}
                < a  className={"fl color-blue mr30 font-16"} onClick={(url)=>this.confirmysl(`/courses/${this.props.match.params.coursesId}/graduation_topics/export.xlsx`)}>导出</a>
                {/*<p className="fl"><UseBank {...this.props} {...this.state} object_type={"gtopic"} useBankSuccess={this.useBankSuccess}></UseBank></p> 题库选用*/}
                <WordsBtn style="blue" className="font-16" onClick={()=>this.onBoardsNew()}>新建</WordsBtn>
              </React.Fragment>):""
            }
            secondRowLeft={
              <div className="fl mt6 task_menu_ul">
                <Menu mode="horizontal" defaultSelectedKeys="all" onClick={this.onChangeStatus}>
                  <Menu.Item key="all">全部</Menu.Item>
                  <Menu.Item key="0">待选中</Menu.Item>
                  <Menu.Item key="1">待确认</Menu.Item>
                  <Menu.Item key="2">已确认</Menu.Item>
                </Menu>
              </div>
            }
            onPressEnter={this.onPressEnter}
            searchPlaceholder={"请输入名称进行搜索"}
            showSearchInput={topicList&&topicList.length >= pageSize}
          ></Titlesearchsection>
        <Spin size="large" spinning={this.state.isSpin}>
          {
            topicList && topicList.length > 0 ?
            (
              <div>
                {
                  // 超级管理员、教师、助教
                  isAdmin ?
                  <div className="clearfix mt20 edu-back-white padding20-30">
                    <Checkbox className="fl" onChange={this.onCheckAll} checked={checkAllValue}>已选 {checkBoxValues.length} 个    （不支持跨页勾选）</Checkbox>
                    <div className="studentList_operation_ul">
                      <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={()=>this.onDelete(1)}>删除</a></li>
                      {
                        course_public && course_public==1 ? <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={()=>this.onDelete(2)}>设为公开</a></li>:""
                      }
                      {/*<li className="li_line"><a className="color-grey-9" onClick={()=>this.onDelete(3)}>加入题库</a></li>*/}
                      {/* <li className="li_line"><a href="javascript:void(0)" className="color-grey-9">加入题库</a></li> */}
                    </div>
                  </div>
                  :""
                }
                <Modals
                  modalsType={delType}
                  modalsTopval={delTopval}
                  modalsBottomval=""
                  modalCancel={this.cancelDelTopic}
                  modalSave={this.sureDelTopic}
                  loadtype={delLoadType}
                >
                </Modals>

                <div className="clearfix stu_table mt20">
                <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
                    { topicList.map((item, index) => {
                        return (
                          <div>
                            <GraduateTopicItem
                              {...this.props}
                              discussMessage={item}
                              data={data}
                              checkBox={<Checkbox value={item.id} key={item.id} onClick={() => this.onItemClick(item)} className="mr15"></Checkbox>}
                              onItemClick={this.onItemClick}
                              index={index}
                              chooseTopic={this.chooseTopic}
                            ></GraduateTopicItem>
                          </div>
                        )
                      })
                    }
                  </Checkbox.Group>
                </div>

                <Modals
                  modalsType={modalsType}
                  modalsTopval={modalsTopval}
                  modalsBottomval={modalsBottomval}
                  modalCancel={this.cancelOperateTopic}
                  modalSave={this.sureOperateTopic}
                >
                </Modals>
              </div>
						):(topicList && topicList.length===0?<NoneData></NoneData>:<div className="clearfix stu_table mt20"></div>)
          }
        </Spin>
          {
            totalCount && totalCount > pageSize ?
            <div className="padding30 edu-txt-center clearfix">
              <Pagination defaultCurrent={page} current={page} pageSize={pageSize} showQuickJumper onChange={this.onChangePage} total={totalCount}></Pagination>
            </div>
            :
            <div></div>
          }

        <div>
        </div>
      </React.Fragment>
      )
    }
}
export default Boards;