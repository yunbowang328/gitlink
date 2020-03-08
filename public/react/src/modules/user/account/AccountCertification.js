import React, { Component } from 'react';
// import { Button } from 'antd'
import { WordsBtn, getImageUrl } from 'educoder';
import RealNameCertificationModal from '../modal/RealNameCertificationModal'
import '../../courses/css/Courses.css'
import {CNotificationHOC} from '../../courses/common/CNotificationHOC'
import axios from 'axios';


class AccountCertification extends Component {
  constructor(props){
    super(props);
    this.state={
      certification:1
    }
  }

  checkBasicInfo = (index) => {
    if ( this.props.basicInfo.base_info_completed == true) {
      this.showRealNameCertificationModal(index)
    } else {
      this.props.confirm({
        okText: `立即完善`,
        content: `请先完善基本信息`,
        onOk: () => {
          this.props.history.push('/account/profile/edit')  
        }
      })
    }
    
  }



  // 撤销认证
  cancelCertification=(type)=>{
    this.props.confirm({
      okText: '确认',
      content: '是否确认撤销认证？',
      onOk: () => {
        this.cancelCertificationAction(type);
      }
    })
  }

  cancelCertificationAction=(type)=>{
    let login =this.props.current_user.login;
    var url =  `/users/accounts/${login}/${ type == 1 ? 'authentication_apply.json':'professional_auth_apply.json'}`;
    axios.delete(url).then((result)=>{
      if(result){
        this.props.showNotification("撤销成功！");
        try {
          this.props.getBasicInfo();
        } catch (e) {
        }
        try {
          this.props.Getdata();
        } catch (e) {

        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  showRealNameCertificationModal = (index) => {
    this.setState({
      certification:index,
    }, () => {
      if (index == 1) {
        this.realNameCertificationModal1.setVisible(true)
      } else if (index == 2) {
        this.realNameCertificationModal2.setVisible(true)
      }
    })
  }
    render() {
      let {certification}=this.state
      let {basicInfo} = this.props;
      return (
        <div>
          {this.state.certification===1?<RealNameCertificationModal  {...this.props}
              wrappedComponentRef={(form) => this.realNameCertificationModal1 = form} certification={certification}
          ></RealNameCertificationModal>:""}

					{this.state.certification===2?<RealNameCertificationModal  {...this.props}
          wrappedComponentRef={(form) => this.realNameCertificationModal2 = form} certification={certification}
      ></RealNameCertificationModal>:""}
          <div className="basicForm">
            <style>{`
                .basicForm .title {
                  font-size: 16px;
                  padding-left: 30px;
                  margin-bottom: 10px;
                }
              .flexTable {
                display: flex;
                flex-direction: column;
              }
              .flexRow {
                display: flex;
              }
                .flexRow .name {
                  margin-left: 46px;
                }
                .flexRow .description {
                  margin-left: 30px;
                  flex: 1;
                  color: #CDCDCD;
                }
                .flexRow .status {
                  color: #28AC7F;
                }
            `}</style>
            <div className="title">认证信息</div>
            <div className="flexTable">
              <div className="flexRow lineh-20 mb20">
                <div className="name">实名认证</div>
                <div className="description">实名认证可以增强你在平台的江湖地位，还可以获得500金币的奖励~ </div>
                <div className="status">
                  {
                    basicInfo && basicInfo.authentication =="uncertified" ?
                    <WordsBtn style="blue" className="borderBottom mr20" onClick={()=>this.checkBasicInfo(1)} >立即认证</WordsBtn>:
                    basicInfo && basicInfo.authentication =="applying" ? 
                      <span>
                        <WordsBtn style="grey" className="mr20" onClick={()=>this.cancelCertification(1)}>撤销认证</WordsBtn>
                        <span className="mr20 ml18" style={{color: '#FF6800'}}>待审核</span>
                      </span>
                      :
                      <span>
                        <WordsBtn style="grey" className="mr20 fl " onClick={()=>this.checkBasicInfo(1)}>重新认证</WordsBtn>
                        <span className="mr20 fl"><i className="iconfont icon-wancheng color-green font-16 mr3 fl"></i>已认证</span>
                      </span>
                  }
                </div>
              </div>

              <div className="flexRow lineh-20">
                <div className="name">职业认证</div>
                
                {basicInfo && (basicInfo.identity == "teacher" 
                  ? <div className="description">教师通过认证，可以克隆实训、免金币查看实训答案和隐藏测试集...  </div>
                  : <div className="description">通过认证，可以获得500金币的奖励~  </div>)}
                <div className="status">
                  {
                    basicInfo && basicInfo.professional_certification =="uncertified" ?
                    <WordsBtn style="blue" className="mr20 borderBottom" onClick={()=>this.checkBasicInfo(2)} >立即认证</WordsBtn>
                    :
                    basicInfo && basicInfo.professional_certification =="applying" ? 
                      <span>
                        <WordsBtn style="grey" className="mr20 " onClick={()=>this.cancelCertification(2)}>撤销认证</WordsBtn>
                        <span className="mr20 ml18" style={{color: '#FF6800'}}>待审核</span>
                      </span>
                    :
                    <span>
                      <WordsBtn style="grey" className="fl mr20" onClick={()=>this.checkBasicInfo(2)} >重新认证</WordsBtn>
                      <span className="mr20 fl"><i className="iconfont icon-wancheng color-green font-16 mr3 fl"></i>已认证</span>
                    </span>
                  }
                </div>
              </div>  
            </div>
          </div>
          <div style={{color: '#989898', marginLeft: '20px'}}>* 我们确保你所提供的信息均处于严格保密状态，不会泄露</div>
        </div>
      );
    }
}

export default AccountCertification;
