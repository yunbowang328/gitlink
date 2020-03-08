import React, {Component} from 'react';

import {
  Radio,
  Checkbox,
} from 'antd';

import axios from 'axios';

import './css/TPMsettings.css';

import Bottomsubmit from "../../modals/Bottomsubmit";

const RadioGroup = Radio.Group;


export default class Shixuninformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vnc: false,
      hide_code: false,
      code_edit_permission: false,
      code_hidden: false,
      forbid_copy: false,
      test_set_permission: true,
      task_pass: true,
      websshshow: false,
      multi_webssh: false,
      opensshRadio: null,
      loading: false
    }
  }


  componentDidMount() {
    if (this.props.data ) {
      if (this.props.data.shixun) {
        this.setState({
          vnc: this.props.data && this.props.data.shixun.vnc,
          code_hidden: this.props.data && this.props.data.shixun.code_hidden,
          forbid_copy: this.props.data && this.props.data.shixun.forbid_copy,
          hide_code: this.props.data && this.props.data.shixun.hide_code,
          task_pass: this.props.data && this.props.data.shixun.task_pass,
          test_set_permission: this.props.data && this.props.data.shixun.test_set_permission,
          code_edit_permission: this.props.data && this.props.data.shixun.code_edit_permission,
          websshshow: this.props.data && this.props.data.shixun.webssh === 0 ? false : true,
          multi_webssh: this.props.data && this.props.data.shixun.multi_webssh,
          opensshRadio: this.props.data && this.props.data.shixun.webssh === 0 ? null : this.props.data && this.props.data.shixun.webssh,
        })

        // if(this.props.data && this.props.data.shixun.status===0){
        //   this.setState({
        //     task_pass:true
        //   })
        // }

      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {
      if (this.props.data) {
        if (this.props.data.shixun) {
          this.setState({
            vnc: this.props.data && this.props.data.shixun.vnc,
            code_hidden: this.props.data && this.props.data.shixun.code_hidden,
            forbid_copy: this.props.data && this.props.data.shixun.forbid_copy,
            hide_code: this.props.data && this.props.data.shixun.hide_code,
            task_pass: this.props.data && this.props.data.shixun.task_pass,
            test_set_permission: this.props.data && this.props.data.shixun.test_set_permission,
            code_edit_permission: this.props.data && this.props.data.shixun.code_edit_permission,
            websshshow: this.props.data && this.props.data.shixun.webssh === 0 ? false : true,
            multi_webssh: this.props.data && this.props.data.shixun.multi_webssh,
            opensshRadio: this.props.data && this.props.data.shixun.webssh === 0 ? null : this.props.data && this.props.data.shixun.webssh,
          })

          // if(this.props.data && this.props.data.shixun.status===0){
          //   this.setState({
          //     task_pass:true
          //   })
          // }

        }
      }
    }
  }


  onSubmits = () => {
    this.setState({
      loading: true
    })
    let id = this.props.match.params.shixunId;
    let url = `/shixuns/${id}/update_learn_setting.json`;
    axios.post(url,
      {
        shixun: {
          code_hidden: this.state.code_hidden,
          forbid_copy: this.state.forbid_copy,
          hide_code: this.state.hide_code,
          multi_webssh: this.state.multi_webssh,
          task_pass: this.state.task_pass,
          test_set_permission: this.state.test_set_permission,
          vnc: this.state.vnc,
          webssh: this.state.websshshow === false ? 0 : this.state.opensshRadio,
          code_edit_permission:this.state.code_edit_permission
        },
      }
    ).then((response) => {
      if (response.data.status === -1) {

      } else {
        this.props.getdatas()
        this.props.showNotification("学习页面设置保存成功!")
        this.setState({
          loading: false
        })
      }
    }).catch((error) => {
      this.setState({
        loading: false
      })
    })
  }

  Checkvnc = () => {

    if (this.state.vnc === false) {
      this.setState({
        hide_code: false,
        code_edit_permission: false,
        code_hidden: false,
        forbid_copy: false,
        multi_webssh: false,
        websshshow: false,
      })
    }
    this.setState({
      vnc: !this.state.vnc
    })
  }

  Checkhide_code = () => {
    if (this.state.hide_code === false) {
      this.setState({
        code_edit_permission: false
      })
    }
    this.setState({
      hide_code: !this.state.hide_code
    })
  }

  Checkis_secret_repository = () => {
    this.setState({
      code_edit_permission: !this.state.code_edit_permission
    })
  }

  Checkcode_hidden = () => {
    this.setState({
      code_hidden: !this.state.code_hidden
    })
  }

  Checkforbid_copy = () => {
    this.setState({
      forbid_copy: !this.state.forbid_copy
    })
  }

  Checktask_pass = () => {
    this.setState({
      task_pass: !this.state.task_pass
    })
  }

  Checktest_set_permission = () => {
    this.setState({
      test_set_permission: !this.state.test_set_permission
    })
  }

  Checkwebsshshow = () => {
    if (this.state.websshshow === false) {
      this.setState({
        vnc: false,
        opensshRadio: 1
      })
    } else {
      this.setState({
        multi_webssh: false,
        opensshRadio: null,
        hide_code:false
      })
    }
    this.setState({
      websshshow: !this.state.websshshow
    })

  }

  Checkmulti_webssh = () => {
    this.setState({
      multi_webssh: !this.state.multi_webssh
    })
  }

  opensshRadio = (e) => {
    if (e.target.value === 1) {
      this.setState({
        multi_webssh: false
      })
    } else {
      // this.setState({
      //   multi_webssh: true
      // })
    }
    this.setState({
      opensshRadio: e.target.value
    });
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <div className="educontent mb200 edu-back-white padding10-20 pdb30 mb50">

          {this.state.websshshow === true ? "" : <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16" style={{minWidth: '45px'}}>开启图形化界面：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.vnc}
                onChange={this.Checkvnc}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则给学员的实践任务启动Ubuntu系统的图形化界面）</label>
            </span>
          </div>}

          {this.state.vnc === true ? "" : <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml64" style={{minWidth: '45px'}}>命令行：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.websshshow}
                onChange={this.Checkwebsshshow}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则给学员的实践任务提供命令行窗口）</label>
            </span>
          </div>}


          {this.state.vnc === true ? "" : this.state.websshshow === true ? <div>
               <span className="fl ml160">
                  <RadioGroup onChange={this.opensshRadio} value={this.state.opensshRadio}>
                    <Radio className="radioStyle font-14" value={1}><span>命令行练习窗口</span> <span
                      className="color-grey-9">（选中则给学员提供用于练习操作的命令行，命令行的操作不会对学生的实验环境造成影响）</span></Radio>
                    <Radio className="radioStyle font-14" value={2}><span>命令行评测窗口</span> <span
                      className="color-grey-9">（选中则给学员提供用于评测操作的命令行，命令行的操作可以对学生的实验环境产生影响）</span></Radio>
                  </RadioGroup>
               </span>

            {this.state.opensshRadio === 2 ? <span className="fl ml180">
                   <div className="clearfix mb20">
                        <span className="fl mt8 ml5">
                          <Checkbox
                            checked={this.state.multi_webssh}
                            onChange={this.Checkmulti_webssh}></Checkbox>
                          <label style={{top: '6px'}} className="color-grey-9 ml10">
                            <span className="color-grey-6 font-14" style={{minWidth: '45px'}}>多个命令行窗口：</span>
                            （选中则允许学员同时开启多个命令行窗口）</label>
                        </span>
                      </div>
               </span> : ""}
          </div> : ""}

          {this.state.vnc === true||this.state.websshshow === false ? "" : <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml17" style={{minWidth: '45px'}}>隐藏代码窗口：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.hide_code}
                onChange={this.Checkhide_code}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则学员页面不显示代码窗口）</label>
            </span>
          </div>}

          {this.state.vnc === true || this.state.hide_code === true ? "" : <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml33" style={{minWidth: '45px'}}>公开版本库：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.code_edit_permission}
                onChange={this.Checkis_secret_repository}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则允许学员修改版本库中的全部文件）</label>
            </span>
          </div>}

          {this.state.vnc === true ? "" : <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml17" style={{minWidth: '45px'}}>隐藏代码目录：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.code_hidden}
                onChange={this.Checkcode_hidden}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则学员页面不显示版本库目录）</label>
            </span>
          </div>}

          {this.state.vnc === true ? "" : <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml17" style={{minWidth: '45px'}}>禁用复制粘贴：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.forbid_copy}
                onChange={this.Checkforbid_copy}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则学员页面不允许使用复制和粘贴功能）</label>
            </span>
          </div>}

          <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml80" style={{minWidth: '45px'}}>跳关：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.task_pass}
                onChange={this.Checktask_pass}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则允许学员跳关学习实训关卡任务）</label>
            </span>
          </div>

          <div className="clearfix mb20">
            <span className="color-grey-6 mt5 fl font-16 ml32s" style={{minWidth: '45px'}}>测试集解锁：</span>
            <span className="fl mt8">
              <Checkbox
                checked={this.state.test_set_permission}
                onChange={this.Checktest_set_permission}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则允许学员允许学员通过金币解锁查看隐藏测试集的内容）</label>
            </span>
          </div>


        </div>

        {this.props.identity < 5 ?
          <Bottomsubmit {...this.props} {...this.state} url={`/shixuns/${this.props.match.params.shixunId}/challenges`}
                        onSubmits={this.onSubmits} loadings={this.state.loading}/> : ""}
      </div>
    );
  }
}


