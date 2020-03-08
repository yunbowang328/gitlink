import React,{ Component } from "react";
import { Input, Checkbox, Menu } from "antd";

import CourseLayoutComponent from '../../common/CourseLayoutComponent'
import TitleSearchSection from '../../common/titleSearch/TitleSearchSection'
import ColorCountText from '../../common/titleSearch/ColorCountText'

import { WordsBtn } from 'educoder'
import axios from 'axios'

import _ from 'lodash'

import GraduateTaskItem from './GraduateTaskItem'
import HomeworkModal from "../../coursesPublic/HomeworkModal";

import '../../css/members.css'
import '../style.css'
// 毕设任务 立即发布弹框 https://www.trustie.net/issues/19981
class TaskPublishModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalname:"立即发布",
      modaltype:1,
      visible: false,
      Topval:"本操作只对“未发布”的对象生效",
      Botvalleft:"暂不发布",
      Botval:"则通过后续手动设置，定时发布",
      starttime:"发布时间：2018-07-15 15:33",
      endtime:"截止时间：2018-08-15 15:33",
      Cancelname:"暂不发布",
      Savesname:"立即发布",
      Cancel:this.onCancel,
      Saves:this.homeworkstartend,
    }
  }
  publish = ()=> {
    this.publish1()
  }
  end = ()=> {
    this.end1()    
  }
  //立即发布
  publish1 =()=>{
    this.setState({
      modalname:"立即发布",
      modaltype:1,
      visible:true,
      Topval:"本操作只对“未发布”的对象生效",
      Botvalleft:"暂不发布",
      Botval:"则通过后续手动设置，定时发布",
      starttime:"发布时间：2018-07-15 15:33",
      endtime:"截止时间：2018-08-15 15:33",
      Cancelname:"暂不发布",
      Savesname:"立即发布",
      Cancel:this.onCancel,
      Saves:this.homeworkstartend,
    })
  }

  publish2=()=>{
    this.setState({
      modalname:"立即发布",
      modaltype:2,
      visible:true,
      Topval:"发布设置均可修改，",
      Topvalright:"点击修改",
      Botval:"此设置将对所有分班生效",
      Botvalleft:undefined,
      starttime:"发布时间：2018-07-15 15:33",
      endtime:"截止时间：2018-08-15 15:33",
      Cancelname:"取消",
      Savesname:"确定",
      Cancel:this.onCancel,
      Saves:undefined
    })
  }

  //立即截止
  end1=()=>{
    this.setState({
      modalname:"立即截止",
      modaltype:3,
      visible:true,
      Topval:"本操作只对“提交中”的对象生效",
      Botvalleft:"暂不截止",
      Botval:"则将根据已设置的截止时间，定时截止",
      Cancelname:"暂不截止",
      Savesname:"立即截止",
      Cancel:this.onCancel,
      Saves:this.homeworkends,
      starttime:undefined,
      endtime:undefined,
    })
  }
  end2=()=>{
    this.setState({
      modalname:"立即截止",
      modaltype:4,
      visible:true,
      Topval:"本操作只对“提交中”的对象生效",
      Botvalleft:"暂不截止",
      Botval:"则将根据已设置的截止时间，定时截止",
      Cancelname:"暂不截止",
      Savesname:"立即截止",
      Cancel:this.onCancel,
      Saves:undefined,
      starttime:undefined,
      endtime:undefined,
    })
  }
  setVisible = (visible) => {
    this.setState({ visible })
  }
  onCancel = () => {
    this.setState({ visible: false})
  }
  render(){

    let { modaltype, modalname, visible, Topval, Topvalright, Botvalleft, Botval, starttime, endtime, Cancelname, Savesname, Cancel, Saves } = this.state;
    return(
        <HomeworkModal
          modaltype={modaltype}
          modalname={modalname}
          visible={visible}
          Topval={Topval}
          Topvalright={Topvalright}
          Botvalleft={Botvalleft}
          Botval={Botval}
          starttime={starttime}
          endtime={endtime}
          Cancelname={Cancelname}
          Savesname={Savesname}
          Cancel={this.onCancel}
          Saves={Saves}
        />
      )
    }
}
export default TaskPublishModal;