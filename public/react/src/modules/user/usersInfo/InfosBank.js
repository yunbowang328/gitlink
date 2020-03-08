import React, { Component } from 'react';
import {Pagination,Spin,Checkbox,Modal} from 'antd';
import moment from 'moment';
import axios from 'axios';
import NoneData from '../../courses/coursesPublic/NoneData'
import {getImageUrl} from 'educoder';
import "./usersInfo.css"
import Modals from '../../modals/Modals'

const dateFormat ="YYYY-MM-DD HH:mm"
class InfosBank extends Component{
  constructor(props){
    super(props);
    this.state={
      category:"common",
      type:"publicly",
      page:1,
      per_page:16,
      sort_by:"updated_at",
      CoursesId:undefined,

      totalCount:undefined,
      data:undefined,
      isSpin:false,

      dialogOpen:false,
      modalsTopval:undefined,
      modalsBottomval:undefined,
      modalSave:undefined
    }
  }

  componentDidMount=()=>{
    this.setState({
      isSpin:true
    })
    let{category,type,page,sort_by,CoursesId}=this.state;
    this.getCourses(category,type,page,sort_by,CoursesId);
  }

  getCourses=(category,type,page,sort_by,CoursesId)=>{
    let url=`/users/${this.props.match.params.username}/question_banks.json`;
    axios.get((url),{params:{
      category,
      type,
      page,
      sort_by,
      per_page:category && page ==1?17:16,
      course_list_id:CoursesId
    }}).then((result)=>{
      if(result){
        this.setState({
          totalCount:result.data.count,
          data:result.data,
          isSpin:false
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  //切换种类
  changeCategory=(cate)=>{
    this.setState({
      category:cate,
      page:1,
      isSpin:true
    })
    let{type,sort_by,CoursesId}=this.state;
    this.getCourses(cate,type,1,sort_by,CoursesId);
  }
  //切换状态
  changeType=(type)=>{
    this.setState({
      type:type,
      page:1,
      isSpin:true
    })
    let{category,sort_by,CoursesId}=this.state;
    this.getCourses(category,type,1,sort_by,CoursesId);
  }
  //切换页数
  changePage=(page)=>{
    this.setState({
      page,
      isSpin:true
    })
    let{category,type,sort_by,CoursesId}=this.state;
    this.getCourses(category,type,page,sort_by,CoursesId);
  }

  // 进入课堂
  turnToCourses=(url)=>{
    this.props.history.push(url);
  }

  // 切换排序方式
  changeOrder= (sort)=>{
    this.setState({
      sort_by:sort,
      isSpin:true
    })
    let{category,type,page,CoursesId}=this.state;
    this.getCourses(category,type,page,sort,CoursesId);
  }

  changeCourseListId =(CoursesId)=>{
    this.setState({
      CoursesId,
      isSpin:true
    })
    let{category,type,sort,page}=this.state;
    this.getCourses(category,type,page,sort,CoursesId);
  }

  //设为公开/删除
  setPublic=(index)=>{
    this.setState({
      dialogOpen:true,
      modalsTopval:index==1?"您确定要公开吗？":"确定要删除该题吗？",
      modalsBottomval:index==1?"公开后不能重设为私有":"",
      modalSave:()=>this.sureOperation(index)
    })
  }
  // 确定--设为公开/删除
  sureOperation=()=>{

  }

  //弹框隐藏
  handleDialogClose=()=>{
    this.setState({
      dialogOpen:false
    })
  }

  render(){
    let{
      category,
      type,
      page,
      data,
      totalCount,
      sort_by,
      isSpin,
      CoursesId,
      dialogOpen,
      modalsTopval,
      modalsBottomval,modalSave
    } = this.state;
    let isStudent = this.props.isStudent();
    let  is_current=this.props.is_current;
    return(
      <div className="educontent">
        <Modals
          modalsType={dialogOpen}
          modalsTopval={modalsTopval}
          modalsBottomval={modalsBottomval}
          modalCancel={this.handleDialogClose}
          modalSave={modalSave}
        ></Modals>
        <Spin size="large" spinning={isSpin}>
        <div className="white-panel edu-back-white pt20 pb20 clearfix ">
          <li className={type=="publicly" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeType("publicly")}>{is_current ? "我":"TA"}的题库</a></li>
          <li className={type=="personal" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeType("personal")}>公共题库</a></li>
        </div>
        <div className="edu-back-white padding10-30 bor-top-greyE">
          <ul className="clearfix secondNav">
            <li className={category=="common" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeCategory("common")}>普通作业</a></li>
            <li className={category=="group" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeCategory("group")}>分组作业</a></li>
            <li className={category=="exercise" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeCategory("exercise")}>试卷</a></li>
            <li className={category=="poll" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeCategory("poll")}>问卷</a></li>
          </ul>
          <div className="edu-txt-left mt10 bankTag">
          <ul className="inline" id="sourceTag">
            <li className={ CoursesId ? "" : "active" } onClick={()=>this.changeCourseListId()}>
              <a href="javascript:void(0)">全部</a>
            </li>
            {
              data && data.course_list && data.course_list.map((item,key)=>{
                return(
                  <li className={CoursesId==item.id?"active":""} key={key} onClick={()=>this.changeCourseListId(`${item.id}`)}>
                    <a href="javascript:void(0)">{item.name}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        </div>
        <p className="pl25 pr25 clearfix font-12 mb20 mt20">
          <span className="fl color-grey-9">共参与{totalCount}个题库</span>
          <div className="fr">
            <li className="drop_down">
              <span className="color-grey-9 font-12">{sort_by=="updated_at"?"时间最新":sort_by=="name"?"作业名称":"贡献者"}</span><i className="iconfont icon-xiajiantou font-12 ml2 color-grey-6"></i>
              <ul className="drop_down_normal">
                <li onClick={()=>this.changeOrder("updated_at")}>时间最新</li>
                <li onClick={()=>this.changeOrder("name")}>作业名称</li>
                <li onClick={()=>this.changeOrder("contributor")}>贡献者</li>
              </ul>
            </li>
          </div>
        </p>
        <div className="dataBank_list edu-back-white educontent">
          {
            !data || data.question_banks.length==0 && <NoneData></NoneData>
          }
          {
            data && data.question_banks && data.question_banks.map((item,key)=>{
              return(
                <div className="dataBank_Item clearfix" key={key}>
                  <div className="fl dataItemLeft">
                    <Checkbox value={item.id} key={item.id}></Checkbox>
                  </div>
                  <div className="fr dataItemRight bank_item">
                    <p className="mb10 clearfix">
                      <span className="dataTitle fl mr80">{item.name}</span>
                      <a href="javascript:void(0)" data-object="2599" className="bank_send fr">发送</a>
                      {
                        item.is_public ==false ?
                        <a href="javascript:void(0)" onClick={()=>this.setPublic(1)} className="bank_public color-blue_4C fr mr60">设为公开</a>:""
                      }
                    </p>
                    <p className="itembottom clearfix">
                      <span className="fl bottomspan color-grey-9">{item.quotes_count}次引用</span>
                      <span className="fl bottomspan color-grey-9">{item.solve_count}次答题</span>
                      <span className="fl bottomspan color-grey-9">{moment(item.updated_at).format('YYYY-MM-DD HH:mm')}</span>
                      <span className="fr"><a href="javascript:void(0)" className="bank_delete color-grey-9" onClick={()=>this.setPublic(2)}>删除</a></span>
                      <span className="bank_list_Tag">{item.course_list_name}</span>
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          totalCount > 15 && 
          <div className="mt30 mb50 edu-txt-center">
            <Pagination showQuickJumper total={totalCount} onChange={this.changePage} pageSize={16} current={page}/>
          </div>
        }
        </Spin>
      </div>
    )
  }
}
export default InfosBank;