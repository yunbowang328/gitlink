import React, {Component} from 'react';

import {
  Button,
  Tabs,
  Modal
} from 'antd';

import './css/TPMsettings.css';

import TopShixuninformation from './Shixuninformation';

import Configuration from './Configuration';

import LearningSettings from './LearningSettings';

import axios from 'axios';

const {TabPane} = Tabs;

// 处理整点 半点


export default class TPMsettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKeys:"1"
    }
  }


  componentDidMount() {
    this.getdatas("1")
  }

  getdatas = (key) => {

    let id = this.props.match.params.shixunId;
    let Url = `/shixuns/` + id + `/settings.json`;
    axios.get(Url).then((response) => {
      // alert(response.data.shixun.choice_standard_scripts)
      if (response.status === 200) {
        if(response.data){
            if (response.data.shixun&&response.data.shixun.scope_partment.length > 0) {
              this.setState({
                scopetype: true
              })
            }
        }
        this.setState({
          data: response.data
        })
      }

    });
    //
    // if(key==="3"&&this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter === true){
    //   window.location.href =`/shixuns/${this.props.match.params.shixunId}/challenges`;
    // }else{
    //   if(key){
    //     this.setState({
    //       activeKeys:key
    //     })
    //   }else{
    //     window.location.href =`/shixuns/${this.props.match.params.shixunId}/challenges`;
    //   }
    //
    // }

  }

  operateshixuns = (value) => {
    this.setState({
      operateshixunstype: true,
      delType: value
    })
  }

  hideoperateshixuns = () => {
    this.setState({
      operateshixunstype: false
    })
  }


  shixunsdel = () => {
    let id = this.props.match.params.shixunId;
    let cul = `/shixuns/` + id + `.json`;

    axios.delete(cul).then((response) => {
      if (response.data.status === 1) {
        this.props.showNotification("操作成功");
        this.setState({
          operateshixunstype: false,
        });

        window.location.href = "/shixuns";
        // this.props.history.replace( "/shixuns/");
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  shixunsclose = () => {
    let id = this.props.match.params.shixunId;
    let cul = `/shixuns/` + id + `/close.json`;
    axios.post(cul).then((response) => {
      if (response.data.status === 1) {
        this.props.showNotification("操作成功");
        this.setState({
          operateshixunstype: false,
        });

        window.location.href = "/shixuns/" + id + "/challenges";
        // this.props.history.replace( "/shixuns/" + id + "/challenges");
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  callback = (key) =>  {
    this.setState({
      activeKeys:key
    })
  }

  render() {

    let showtabs = this.props.shixunsDetails === undefined ? "" : this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter === true ? "" : "学习页面设置"

    // let a="isvnc";
    // let b="isVNC";
    // console.log(a.indexOf("vnc"))
    // console.log(b.indexOf("vnc"))

    // console.log( this.props.shixunsDetails === undefined ? "" : this.props.shixunsDetails.is_jupyter === false ? "学习页面设置" : "")
    return (

      <div id={"TPMsettings"}>
        <style>
          {
            `
              .ant-tabs-bar{
                  width: 1200px;
                  margin: 0 auto;
                  background: #fff;
                  border-bottom: 0px;
                  margin-top: 30px!important;
              }
              .ant-tabs-nav{
                margin-left:20px;
              }
              .ant-tabs-nav .ant-tabs-tab {
                font-size: 16px;
               }
              `
          }
        </style>

        <Tabs  activeKey={this.state.activeKeys}  onChange={this.callback} animated={false} tabBarExtraContent={
          <div className={"mb20 mr20"}>

            {
              this.props.identity < 5 && this.state.data && this.state.data.shixun.status == 0 ?
                <Button type="primary" ghost className={"Permanentban mr20"} onClick={() => this.operateshixuns(1)}>
                  删除实训
                </Button>
                : ""
            }
            {
              this.props.identity == 1 && this.state.data && this.state.data.shixun.status == 2 ?
                <Button type="primary" ghost className={"Permanentban mr20"} onClick={() => this.operateshixuns(1)}>
                  删除实训
                </Button> : ""
            }
            {
              this.props.identity === 1 && this.state.data && this.state.data.shixun.status == 2 ?
                <Button type="primary" ghost className={"Permanentban"} onClick={() => this.operateshixuns(2)}>
                  永久关闭
                </Button> : ""
            }
          </div>
        }>
          <TabPane tab="基本信息" key="1">
            <TopShixuninformation
              {...this.state}
              {...this.props}
              getdatas={(key) => this.getdatas(key)}
            />
          </TabPane>
          <TabPane tab="权限配置" key="2">
            <Configuration
              {...this.state}
              {...this.props}
              getdatas={(key) => this.getdatas(key)}
            />
          </TabPane>
          {this.props.shixunsDetails === undefined ? "" : this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter === false ?
            <TabPane tab={showtabs} key="3">
              <LearningSettings
                {...this.state}
                {...this.props}
                getdatas={(key) => this.getdatas(key)}
              />
            </TabPane>:"" }
        </Tabs>
        <Modal
          keyboard={false}
          title="提示"
          visible={this.state.operateshixunstype}
          closable={false}
          footer={null}
        >
          <div className="task-popup-content">
            {this.state.delType === 1 ? <p className="task-popup-text-center font-16 pb20">是否确认删除 ？</p> :
              <p className="task-popup-text-center font-16 pb20">关闭后,<br/>用户不能再开始挑战了是否确认关闭 ？</p>}
          </div>
          <div className="task-popup-submit clearfix">
            <a onClick={this.hideoperateshixuns} className="task-btn fl">取消</a>
            {this.state.delType === 1 ? <a className="task-btn task-btn-orange fr" onClick={this.shixunsdel}>确定</a> :
              <a className="task-btn task-btn-orange fr" onClick={this.shixunsclose}>确定</a>}
          </div>
        </Modal>
      </div>

    );
  }
}


