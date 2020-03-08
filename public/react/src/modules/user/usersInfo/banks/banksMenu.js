import React, { Component } from 'react';

import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { WordsBtn } from 'educoder'
import "../usersInfo.css"
import "../../../courses/css/Courses.css"
import "../../../courses/css/busyWork.css"
import SendTopics from '../../../modals/SendTopics';
import Modals from '../../../modals/Modals';
import axios from 'axios';
class BanksMenu extends Component{
  constructor(props){
    super(props);
    this.state={
      visible:false,
      tab:['0'],
    }
  }

  //发送至相关
  sendTopics=()=>{
    this.setState({
      visible:true
    })
  }
  componentDidMount() {
    // var thestring=this.props;
    // var yslarr=thestring.split("/");
    // console.log(yslarr);

    try {
      const query = this.props.location.search;
      const type = query.split('?tab=');
      if(type[1]===undefined){
        this.setState({
          tab:['0'],
        });
      }else{
        if(type[1]==="0"){
          this.setState({
            tab:['0'],
          });
        }else if(type[1]==="1"){
          this.setState({
            tab:['1'],
          });
        }
      }

    }catch (e) {
      this.setState({
        tab:['0'],
      });
    }

  }

  topicscancelmodel=()=>{
    this.setState({
      Modalstype:false,
      Loadtype:false,
      visible:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
      checkBoxValues:[],
      checkedtype:false
    })
  }

  //删除相关

  deletecheckBoxValues=(id,type)=>{

    this.setState({
      Modalstype:true,
      Modalstopval:"是否确认删除？",
      ModalCancel:this.topicscancelmodel,
      ModalSave:()=>this.topicssavedelete(id,type),
    })

  }

  topicssavedelete=(id,type)=>{
    // console.log("删除了");
    // console.log(id);
    // console.log(type);
    const url = `/question_banks/multi_delete.json`;
    axios.delete(url, { data: {
          object_id: [id],
          object_type:type
        }})
      .then((response) => {

        if(response){
          if(response.data){
            if(response.data.status===0){
              this.props.showNotification(response.data.message)
              window.location.href=`/users/${this.props.current_user.login}/topics/personal`;
            }else{
              this.props.showNotification(response.data.message)
            }
          }
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    this.topicscancelmodel()
  }
  changeTab=(e)=>{
    this.setState({
      tab:e.key
    })
    console.log(e.key);
    // if(e.key === 0){
    //
    // }else{
    //
    //
    // }
  }
  render(){
    let { banksMenu} = this.props;
    let {visible,tab}=this.state;
    // console.log("问卷预览");
    // console.log(visible);
    let user_id=this.props.current_user&&this.props.current_user.user_id;
    let user_type=this.props.current_user&&this.props.current_user.user_identity;
    let targetuserid=this.props.data&&this.props.data.id;
    // console.log("_____________________________");
    // console.log(this.props);
    // console.log("++++++++++++++++=");
    // console.log("banksMenubanksMenubanksMenubanksMenu");
    // console.log(banksMenu);
    return(
      <div className="clearfix bor-bottom-greyE edu-back-white" style={{padding:"0px 30px"}}>
        {this.state.Modalstype&&this.state.Modalstype===true?<Modals
          modalsType={this.state.Modalstype}
          modalsTopval={this.state.Modalstopval}
          modalCancel={this.state.ModalCancel}
          modalSave={this.state.ModalSave}
          modalsBottomval={this.state.ModalsBottomval}
          loadtype={this.state.Loadtype}
        />:""}
        {/*发送至弹窗*/}
        {
          visible&&visible===true?
            <SendTopics
              {...this.state}
              {...this.props}
              mysendall={true}
              visible={visible}
              category={banksMenu&&banksMenu.category}
              checkBoxValues={[banksMenu&&banksMenu.id]}
              topicscancelmodel={()=>this.topicscancelmodel()}
            />:""
        }
        {
          banksMenu &&
          <div className="task_menu_ul fl">
            <Menu mode="horizontal" selectedKeys={tab} onClick={this.changeTab}>
              {
                banksMenu.menuArray && banksMenu.menuArray.map((item,key)=>{
                  // console.log("BanksMenussss");
                  // console.log(this.props);
                  // console.log(this.props.content);
                  return(
                    <Menu.Item key={key}><Link to={`${item.to}`}>{item.content}</Link></Menu.Item>
                  )
                })
              }
            </Menu>
          </div>
        }

        {
          banksMenu===undefined?
          <span className="fr mt18">
          <WordsBtn onClick={()=>this.deletecheckBoxValues(banksMenu&&banksMenu.id,banksMenu&&banksMenu.category)}style="blue" className="ml20 font-16">删除</WordsBtn>
          <WordsBtn to={ banksMenu.tos ? banksMenu.tos:""} style="blue" className="ml20 font-16">编辑</WordsBtn>
          <WordsBtn onClick={()=>this.sendTopics()} style="blue" className="ml20 font-16">发送</WordsBtn>
          </span>
            :banksMenu.authorize===true?
          <span className="fr mt18">
          <WordsBtn onClick={()=>this.deletecheckBoxValues(banksMenu&&banksMenu.id,banksMenu&&banksMenu.category)}style="blue" className="ml20 font-16">删除</WordsBtn>
          <WordsBtn to={ banksMenu.tos ? banksMenu.tos:""} style="blue" className="ml20 font-16">编辑</WordsBtn>
          <WordsBtn onClick={()=>this.sendTopics()} style="blue" className="ml20 font-16">发送</WordsBtn>
          </span>
            :
            <span className="fr mt18">
            <WordsBtn onClick={()=>this.sendTopics()} style="blue" className="ml20 font-16">发送</WordsBtn>
            </span>
        }
      </div>
    )
  }
}
export default BanksMenu;