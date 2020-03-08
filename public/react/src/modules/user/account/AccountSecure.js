import React, { Component } from 'react';

import { SnackbarHOC, setmiyah, WordsBtn } from 'educoder';
import { Form, Button, Input   } from 'antd'

import '../../courses/css/Courses.css'
import './common.css'

import axios from 'axios'

const PHONE = 'PHONE'
const EMAIL = 'EMAIL'
const PASSWORD = 'PASSWORD'

function regPhoneAndEmail(value){
  if(value.indexOf("@")>-1){
    // 加密邮箱
    let beforeStr=value.split("@")[0];
    let afterStr=value.split("@")[1];
    return beforeStr.substr(0,3)+"**"+beforeStr.substr(beforeStr.length-1,1)+"@"+afterStr;
  }else{
    // 加密手机号码
    return value.substr(0,3)+"****"+value.substr(7,4);
  }
}
class AccountSecure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: '',
      secondsFlag:false,
      seconds:60
    }
  }

  // 获取验证码倒计时
  remainTime=()=>{
    this.setState({
      seconds: 60
    })
    this.timer = setInterval(() => {
      let { seconds } =this.state;
      let s = parseInt(seconds)-1;
      if(s > -1){
        this.setState({
          seconds:s
        })
      }else{
        this.setState({
          secondsFlag:false
        })
        clearInterval(this.timer);
      }
    },1000)
  }

  // 获取验证码
  getCode=(index)=>{
    let url=`/accounts/get_verification_code.json`
    let login = '';
    let values=this.props.form.getFieldsValue();

    if(index == 3){
      //绑定手机号码
      login=values.phone;
      let reg=/^1\d{10}$/;
      if(reg.test(login)==false){
        this.props.showNotification(`请先输入正确的手机号码`);
        return;
      }
    }else if(index == 4){
      // 绑定邮箱
      login=values.email;
      let reg=/^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if(reg.test(login)==false){
        this.props.showNotification(`请先输入正确的邮箱地址`);
        return;
      }
    }
    let type = index;
    if(!login){ 
      this.props.showNotification(`请先输入${index==3?"手机号码":"邮箱地址"}`);
      return;
    }
    let smscode=setmiyah(login)
    axios.get((url),{params:{
      login,type,smscode
    }}).then((result)=>{
      if(result){
        // 倒计时
        if(result.data.status===1){
          this.props.showNotification("验证码已发送，请注意查收");
        }else if(result.data.status===-2){
          this.props.showNotification(result.data.message);
        }
        this.setState({
          secondsFlag:true
        })
        this.remainTime();
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
// 绑定手机
  onPhoneSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {login}=this.props.current_user;
        let reg=/^1\d{10}$/;
        if(reg.test(values.phone)){
          let url=`/users/accounts/${login}/phone_bind.json`
          axios.post((url),{
            phone:values.phone,
            code:values.phoneValidateCode
          }).then((result)=>{
            if(result){
              this.props.showNotification("手机号码绑定成功!");
              this.setState({
                updating:''
              })
              this.props.getBasicInfo();
            }
          }).catch((error)=>{
            console.log(error);
          })
        }else{
          this.props.showNotification("请输入有效的11位手机号码");
        }
      }
    })
  }

  // 绑定邮箱
  onEmailSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {login}=this.props.current_user;
        let reg=/^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if(reg.test(values.email)){
          let url=`/users/accounts/${login}/email_bind.json`
          axios.post((url),{
            email:values.email,
            code:values.emailValidateCode
          }).then((result)=>{
            if(result){
              this.props.showNotification("邮箱地址绑定成功!");
              this.setState({
                updating:''
              })
              this.props.getBasicInfo();
            }
          }).catch((error)=>{
            console.log(error);
          })
        }else{
          this.props.showNotification("请输入正确的邮箱地址");
        }
      }
    })
  }
  onPasswordSubmit = () => {
  	let {basicInfo}=this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	if(basicInfo&&basicInfo.has_password===true){
					if(values.p_old == values.p_new){
						this.props.showNotification("新密码不能与旧密码相同！");
						return;
					}
				}

        if(values.p_again != values.p_new){
          this.props.showNotification("两次输入的新密码必须一致！");
          return;
        }
        let {login}=this.props.current_user;
        let url=`/users/accounts/${login}/password.json`;
        let p_old=undefined;
				if(basicInfo&&basicInfo.has_password===true){
					p_old=values.p_old
				}
        axios.put((url),{
          old_password:p_old,
          password:values.p_new
        }).then((result)=>{
          if(result){
            this.props.showNotification("密码更新成功!");
            this.setState({
              updating:''
            })
            this.props.getBasicInfo();
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }

  //取消编辑
  hideUpdating=()=>{
    this.setState({
      updating:""
    })
  }

  // 修改密码-判断规则
  comfirmNewPassword=(rule,value,callback)=>{
    const { form } = this.props;
    if (value != form.getFieldsValue().p_new) {
      callback("两次输入的新密码必须一致！");
    }else {
      callback();
    }
  }

  InputNewPassword=(rule,value,callback)=>{
    const { form } = this.props;
    if (!value) {
      callback("请输入8-16位字符的新密码，区分大小写！");
    } else if (value.length<8 || value.length>16) {
      callback("请输入8-16位字符的新密码，区分大小写！");
    } else {
      callback();
    }
  }

  render() {
    let {basicInfo}=this.props;
    const { getFieldDecorator } = this.props.form;
    const { updating,seconds,secondsFlag } = this.state

		console.log(basicInfo&&basicInfo.has_password)
    return (
      <div>
        <div className="basicForm settingForm">
          <style>{`

            .flexRow {
              padding: 20px 0;
            }
              .flexRow .name {
                margin-left: 12px;
                color: #999999;

                text-align: center;
                flex: 0 0 100px;
              }
              .flexRow .description {
                margin-left: 10px;
                flex: 1;
                color: #CDCDCD;
              }
                .description span {
                  margin-right: 20px;
                  color: #05101A;
                }
              .flexRow .status {
                width: 100px;
                color: #28AC7F;
                text-align: right;
              }
            .flexTable .flexTable {
              border-bottom: 1px solid #EBEBEB;
            }
            

            .settingForm label{
              color: #999999;
              font-size: 14px !important ; 
              margin-left: 120px;
            }
            .settingForm input {
              width: 340px;
            }
            .settingForm input.validateInput  {
              width: 220px;
            }
            .settingForm .formItemInline button {
              width: 110px;
              margin-left: 10px;
            }

            .settingForm .ant-form-item-label {
              width: 204px;
            }
            .formItemInline .ant-form-explain{
              position:absolute;
              bottom:-17px;
              left:0px;
              width:100%;
            }
          `}</style>
          <div className="title">安全设置</div>
          <Form>
          <div className="flexTable">
            <div className="flexTable">
              <div className="flexRow">
                <div className="name">手机</div>
                <div className="description">
                  {
                    basicInfo && basicInfo.phone ?
                    <span>{  basicInfo.phone }</span>
                    :
                    <span style={{color: '#EA320E'}}>未绑定</span>
                  }
                  {basicInfo.phone ? '仅自己可见，可用手机号码登录EduCoder' : '绑定手机号码，将获得500金币的奖励哟～，手机号码仅自己可见~'}
                </div>
                {
                  updating != PHONE &&
                  <div className="status">
                    <WordsBtn style="blue" className="borderBottom" 
                        onClick={() => this.setState({updating: PHONE})}
                    >{basicInfo && basicInfo.phone ? "更换" : "立即绑定" }</WordsBtn>
                  </div>
                }
              </div>
              
              { updating == PHONE && 
              <React.Fragment>
              <Form.Item
                label="你的手机号"
                className="formItemInline hideRequireTag mb20"
              >
                {getFieldDecorator('phone', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true, 
                    message: `请输入要${basicInfo.phone ? '更换' : '绑定'}的手机号码`,
                  }],
                })(
                  <Input placeholder={`请输入要${basicInfo.phone ? '更换' : '绑定'}的手机号码`}></Input>
                )}
              </Form.Item>

              <Form.Item
                label="手机验证码"
                className="mb20 formItemInline hideRequireTag"
              >
                {getFieldDecorator('phoneValidateCode', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true, 
                    message: '请输入手机获取的验证码',
                  }],
                })(
                  <Input placeholder="请输入手机获取的验证码" className="validateInput"></Input>
                )}
                <Button type="primary" disabled={ secondsFlag } onClick={()=>this.getCode(3)}>
                { !secondsFlag ? "获取验证码":`重新发送${seconds}s`}
                </Button>
              </Form.Item>

              <div className="mb20" style={{ marginLeft: '204px' }}>
                <Button type="primary" onClick={this.onPhoneSubmit}>确定</Button>
                <Button type="primary grayBtn" style={{ marginLeft: '20px'}} onClick={this.hideUpdating}>取消</Button>
              </div>
              </React.Fragment> }
            </div>
            
            <div className="flexTable">
              <div className="flexRow">
                <div className="name">邮箱</div>
                <div className="description">
                  {
                    basicInfo && basicInfo.mail ?
                    <span>{ basicInfo.mail }</span>
                    :
                    <span style={{color: '#EA320E'}}>未绑定</span>
                  }
                  邮箱账号仅自己可见，可用于邮箱账号登录EduCoder 
                </div>
                {
                  updating != EMAIL &&
                  <div className="status">
                    <WordsBtn style="blue" className="borderBottom"
                      onClick={() => this.setState({updating: EMAIL})}
                    >{basicInfo && basicInfo.mail ?"更换":"立即绑定"}</WordsBtn>
                  </div>
                }
              </div>  
              
              { updating == EMAIL && 
              <React.Fragment>
              <Form.Item
                label="邮箱地址"
                className="formItemInline hideRequireTag mb20"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true, 
                    message: basicInfo && basicInfo.mail ?'请输入要更换的新邮箱地址':'请输入邮箱地址',
                  }],
                })(
                  <Input placeholder={`${basicInfo && basicInfo.mail ?'请输入要更换的新邮箱地址':'请输入邮箱地址'}`}></Input>
                )}
              </Form.Item>

              <Form.Item
                label="邮箱验证码"
                className="mb20 formItemInline hideRequireTag"
              >
                {getFieldDecorator('emailValidateCode', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true, 
                    message: '请输入邮箱收到的验证码',
                  }],
                })(
                  <Input placeholder="请输入邮箱收到的验证码" className="validateInput"></Input>
                )}
                <Button type="primary" disabled={ secondsFlag } onClick={()=>this.getCode(4)}>
                { !secondsFlag ? "获取验证码":`重新发送${seconds}s`}</Button>
              </Form.Item>

              <div className="mb20" style={{ marginLeft: '204px' }}>
                <Button type="primary" onClick={this.onEmailSubmit}>确定</Button>
                <Button type="primary grayBtn" style={{ marginLeft: '20px'}} onClick={this.hideUpdating}>取消</Button>
              </div>
              </React.Fragment>  }

            </div>


            <div className="flexTable">
              <div className="flexRow">
                <div className="name">密码</div>
                <div className="description">
                  <span>**********</span>
                  用于保护账户信息和登录安全 
                </div>
                { 
                  updating != PASSWORD &&
                  <div className="status">
                    <WordsBtn style="blue" className="borderBottom"
                        onClick={() => this.setState({updating: PASSWORD})}
                    >修改</WordsBtn>
                  </div>
                }
              </div> 
              
              { updating == PASSWORD && 
              <React.Fragment>
								{basicInfo&&basicInfo.has_password===true?<Form.Item
                label="旧密码"
                className="mb20 formItemInline hideRequireTag"
              >
                {getFieldDecorator('p_old', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true, 
                    message: '请设置8～16位密码，区分大小写',
                  }],
                })(
                  <Input type="password" placeholder="请设置8～16位密码，区分大小写" autoComplete="new-password"></Input>
                )}
              </Form.Item>:""}

              <Form.Item
                label="新密码"
                className="mb20 formItemInline hideRequireTag"
              >
                {getFieldDecorator('p_new', {
                  rules: [{
                    validator:this.InputNewPassword
                  }],
                })(
                  <Input type="password" placeholder="请输入8～16位的新密码，区分大小写" autoComplete="new-password"></Input>
                )}
              </Form.Item>

              <Form.Item
                label="再次输入"
                className="mb20 formItemInline hideRequireTag"
              >
                {getFieldDecorator('p_again', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true, 
                    message: '请再次输入新密码',
                  },{
                    validator:this.comfirmNewPassword
                  }],
                })(
                  <Input type="password" placeholder="请再次输入新密码" autoComplete="new-password"></Input>
                )}
              </Form.Item>

              <div className="mb20" style={{ marginLeft: '204px' }}>
                <Button type="primary" onClick={this.onPasswordSubmit}>确定</Button>
                <Button type="primary grayBtn" style={{ marginLeft: '20px'}} onClick={this.hideUpdating}>取消</Button>
              </div>
              </React.Fragment> }
            </div>

          </div>
          </Form>
        </div>
        <div style={{color: '#989898', marginLeft: '20px'}}>* 我们确保你所提供的信息均处于严格保密状态，不会泄露</div>
      </div>
    );
  }
}
const WrappedAccountSecure = Form.create({ name: 'AccountSecure' })(AccountSecure);

export default WrappedAccountSecure;
