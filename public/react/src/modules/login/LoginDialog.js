import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {notification,Modal } from 'antd';

import axios from 'axios';

import './LoginDialog.css';
import { broadcastChannelPostMessage } from 'educoder'
import Notcompletedysl from "../user/Notcompletedysl";

const $ = window.$;
var wait = 60;
function time(btn){
  if (wait==0) {
      $(btn).addClass("btn_orange_bg");
      btn.removeAttribute("disabled");
      btn.innerHTML = "获取验证码";
      wait = 60;
      return;
  }else{
      $(btn).removeClass("btn_orange_bg");
      btn.setAttribute("disabled", "disabled");
      btn.innerHTML = wait + "s后重试";
      wait--;
  }
  setTimeout(function(){
      time(btn);
  },1000);
}
function get_login_verification_code(btn) {
  if($(btn).attr("disabled")) {
    return false;
  } else {
    if (/^1\d{10}$/.test($("#pass_name_input").val()) || /^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test($("#pass_name_input").val())){
        if(!window.IsPC() || $('#quick-drag .drag_text').html() == "验证通过") {
            $("#passlogin_error_notice").hide();
            btn.setAttribute("disabled", "disabled");
            var val = '';
            var type = 6;
            if(/^1\d{10}$/.test($("#pass_name_input").val())){
                type = 6;
            } else if(/^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test($("#pass_name_input").val())){
                type = 7;
            }
            $.get(
                '/account/get_verification_code',
                { value: $('#pass_name_input').val().trim(),
                    type: type},
                function (data) {
                    if (data.status == "2") {
                        if(type == 6){
                            $("#pass_name_input").next().find("p").html("该手机号尚未注册，你可以<a href=\"/user_join?name=" + $("#pass_name_input").val() + "\" class=\"color-blue decoration\">去注册</a>").show();
                        } else{
                            $("#pass_name_input").next().find("p").html("该邮箱尚未绑定，你可以登录后去绑定").show();
                        }
                    } else {
                        $("#pass_name_input").next().find("p").hide();
                        if(type == 6){
                            $("#send_code_notice").html(data.msg).show();
                        } else{
                            var uurl = window.gotoEmail(data.link);
                            $("#send_code_notice").html("<font>验证码已经发送到您的邮箱，去<a href='http://" + uurl + "' id='validate_mail' style='color: #459be5; text-decoration: underline;' target='_blank'>查收</a></font>").show();
                        }
                        time(btn);
                    }
                });
        } else{
            $("#passlogin_error_notice").show();
        }
    }
  }
}


class LoginDialog extends Component {
    constructor(props) {
      super(props)
      this.state = {
        open: true,
        login:0,
        speedy:1,
        regular:0,
        loginValue:'',
        passValue:'',
        isGoing:true,
        isGoingValue:1,
        disabled:true,
        bottonclass:'log-botton mt5',
        dialogBox:'dialogBox',
        shortcutValue:'',
        shortcutnum:1,
        disabledType:true,
        gaincode:'gain-code',
        authCodeType:true,
        authCodeclass:'log-botton mt5',
        isRender: false,
        MyEduCoderModals:false,
        Phonenumberisnotco:undefined,
        Phonenumberisnotcobool:false,
				weixinlogin:false,
				qqlogin:false
      };
    }
    enter=(num) =>{
      this.setState({login:num,speedy:1,dialogBox:'dialogBox'});
     }

     register=(num) =>{
      this.setState({login:1,speedy:num,dialogBox:'dialogBox2'});
     }
      inputOnBlur = (e, id) => {
        this.Emailphonenumberverification(e.target.value, 1);
      };
     // 输入页面
     loginChange = (e) =>{
       var stirngt="";
       if(e.target.value.length>0){
         var str=  e.target.value.replace(/\s*/g,"")
         stirngt=str;
       }else{
         stirngt=  e.target.value;
       }

       if (e.target.value.length === 0) {
         this.setState({
           loginValue: stirngt,
           Phonenumberisnotco:undefined,
         })
       }else{
         this.setState({
           loginValue: stirngt,
           Phonenumberisnotco:undefined,
         })
       }
      // let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      // let reg1 = /^1\d{10}$/;
      // let reg2=/^[a-zA-z]\w{3,14}$/;
      // //      let reg3=/^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      // let value=this.refs.loginPassText.value;
      // let valuenum= value.length;
      // if(valuenum>0){
      //     if(!reg.test(value)&&!reg1.test(value)&&!reg2.test(value)){
      //       this.setState({regular:1})
      //       return
      //   }else{
      //     // this.setState({loginValue:value});
      //     this.setState({regular:0});
      //       var stirngt;
      //       if(value.length>0){
      //         var str= value.replace(/\s*/g,"")
      //         stirngt=str;
      //       }else{
      //         stirngt=  value;
      //       }
      //       this.setState({
      //         loginValue:stirngt,
      //       });
      //   }
      // }else{
        // this.setState({loginValue:value});
        // var stirngt;
        // if(value.length>0){
        //   var str= value.replace(/\s*/g,"")
        //   stirngt=str;
        // }else{
        //   stirngt=  value;
        // }
        // this.setState({
        //   loginValue:stirngt,
        // });
      // }
     };
  //邮箱手机号验证
  Emailphonenumberverification = (value, id) => {
    var url = `/accounts/valid_email_and_phone.json`;
    axios.get((url), {
      params: {
        login: value,
        type: 1,
      }
    }).then((result) => {
      if(result){
        if(result.data.status===-2){
            if(result.data.message==="该手机号码或邮箱已被注册"){
              this.setState({
                Phonenumberisnotco: undefined,
                Phonenumberisnotcobool: false,
              })
            }else {
              this.setState({
                Phonenumberisnotco: result.data.message,
                Phonenumberisnotcobool: true,
              })
            }
            return;
        }else {
            this.setState({
              Phonenumberisnotco: undefined,
              Phonenumberisnotcobool: false,
            })
            return;
        }
      }
    }).catch((error) => {

    })
  };

     passwordChange = () =>{
      let value =this.refs.passwordText.value;

      let valuenum= value.length;
      this.setState({disabled:false})
      this.setState({bottonclass:'log-botton mt5 edu-back-blue'})
      if(valuenum==0){
        this.setState({bottonclass:'log-botton mt5'})
        this.setState({disabled:true})
      }
      this.setState({passValue:value})
     }

     handleInputChange =(event)=> {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({[name]:value})

      if(value===true){
        this.setState({isGoingValue:1})
      }else{
        this.setState({isGoingValue:0})
      }

    }

    // 快捷注册
    shortcutIdChange=()=>{
      let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      let reg1 = /^1\d{10}$/;
      let reg2=/^[a-zA-z]\w{3,14}$/;
      let value=this.refs.shortcutText.value;
      let valuenum= value.length;
      if(valuenum>0){
          if(!reg.test(value)&&!reg1.test(value)&&!reg2.test(value)){
            this.setState({shortcutnum:0})
            this.setState({disabledType:true})
            this.setState({gaincode : 'gain-code'})
            return
        }else{
          this.setState({gaincode : 'gain-code edu-back-blue'})
          this.setState({shortcutValue:value})
          this.setState({shortcutnum:1})
          this.setState({disabledType:false})
        }


      }else{
        this.setState({shortcutValue:value})

      }

    }
    authCodeChange=()=>{

      let value=this.refs.authCodeText.value;
      let valuenum= value.length;
        if(valuenum>3){
          this.setState({authCodeType:false})
          this.setState({authCodeclass:'log-botton mt5 edu-back-blue'})
        }else if(valuenum==0){
          this.setState({authCodeType:true})
          this.setState({authCodeclass:'log-botton mt5'})
        }
    }
    get_login_verification_code=()=>{
      get_login_verification_code($('#get_verification_code')[0])
    }
    dragWrapper=() =>{
      const $ = window.$
      $.fn.drag = function(options) {

        var x, drag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = 100
        //鼠标按下时候的x轴的位置
        handler.mousedown(function(e) {
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
            maxWidth = drag.width() - handler.width() - 2;  //能滑动的最大间距
        });
        $(document).mousemove(function(e) {
          var _x = e.pageX - x;// _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
          if (isMove) {

              if (_x > 0 && _x <= maxWidth) {
                  handler.css({'left': _x});
                  drag_bg.css({'width': _x});
              } else if (_x > maxWidth) {  //鼠标指针移动距离达到最大时清空事件
                  dragOk();
              }
          }
            }).mouseup(function(e) {
                isMove = false;
                var _x = e.pageX - x;
                if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                    handler.css({'left': 0});
                    drag_bg.css({'width': 0});
                }
            });

            //清空事件
            function dragOk() {
                handler.removeClass('handler_bg').addClass('handler_ok_bg');
                text.removeClass('slidetounlock').text('验证通过').css({'color':'#fff'});       //modify
            // drag.css({'color': '#fff !important'});

                handler.css({'left': maxWidth});                   // add
                drag_bg.css({'width': maxWidth});                  // add

                handler.unbind('mousedown');
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');

            }
      }

      setTimeout(()=>{
        $('#quick-drag').drag();
      }, 4000)
    }

    componentWillReceiveProps(nextProps) {

            this.setState({
                isRender:nextProps.isRender
            })
      // console.log(nextProps.isRender);

    }
		IsPC=()=>{
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}
    componentDidMount() {
		  	let flag = this.IsPC(); //true为PC端，false为手机端
				this.setState({
					isphone:flag
				})

        if(this.props.isRender!=undefined){
            this.setState({
                isRender:this.props.isRender
            })
        }

      // $(document).on("showLoginDialog", (e, args)=>{
      //   this.setState({
      //     isRender: true
      //   })
      // })

      this.dragWrapper();

        axios.interceptors.response.use((response) => {
          if(response!=undefined)
            if (response&&response.data.status === 401) {
							document.title = "提示";
                this.setState({
                    isRender: true
                })
            }
            return response;
        }, (error) => {
        //     // if (error.response && error.response.data.error === '401 Unauthorized') {
        //     //   this.back_url = window.location.href;
        //     //   this.setState({
        //     //     isRender: true
        //     //   })
        //     //   // TODO 这里如果样式变了会出现css不加载的情况
        //     //   const $ = window.$;
        //     //   const isCssLoaded = window.getComputedStyle($('.log_nav li.active')[0], null)
        //     //       .getPropertyValue('border-bottom')
        //     //     == "2px solid rgb(69, 155, 229)"
        //     //   if (!isCssLoaded) {
        //     //     const isPort3007 = window.location.port == 3007;
        //     //     let _url_origin = isPort3007 ? 'http://localhost:3000' : ''
        //     //
        //     //     $('head').append( $('<link rel="stylesheet" type="text/css" />')
        //     //         .attr('href', `${_url_origin}/stylesheets/educoder/edu-main.css`) );
        //     //     $('head').append( $('<link rel="stylesheet" type="text/css" />')
        //     //         .attr('href', `${_url_origin}/stylesheets/educoder/edu-all.css`) );
        //     //   }
        //     // }
        //     // return Promise.reject(error);
        });
    }
    handleDialogClose = () => {
     // if(this.props.match.path==='/'){
			//  this.setState({
			// 	 isRender: false
			//  })
			//  this.props.Modifyloginvalue();
		 // }else{
			//  if(this.props.isloginCancel===undefined){
			// 	 window.location.href="/";
			// 	 this.props.Modifyloginvalue();
			// 	 // this.setState({
			// 	 // 	isRender: false
			// 	 // })
			// 	 // this.props.Modifyloginvalue();
			//  }else{
			// 	 this.setState({
			// 		 isRender: false
			// 	 })
			// 	 this.props.Modifyloginvalue();
			//  }

			this.setState({
				isRender: false
			})
			this.props.Modifyloginvalue();


			// this.setState({
			// 	isRender: false
			// })
      // try {
      //   this.props.Modifyloginvalue();
      // }catch (e) {
			//
      // }
    }

    loginEDU=()=>{

      let {loginValue,passValue,regular,isGoingValue}=this.state;
      if(regular===1){
          return
      }
      let newloginValue=loginValue.replace(/(^\s*)|(\s*$)/g, "");
      let newpassValue=passValue.replace(/(^\s*)|(\s*$)/g, "");

      let url='/accounts/login.json'
        axios.post(url, {
            login:newloginValue,
            password:newpassValue,
            autologin:isGoingValue
            }
        ).then((response) => {
          debugger;
            if(response===undefined){
                return
            }

            if(response.status===200){
                if (response.data.status === 402) {
                    // window.location.href = response.data.url;
                }else if (response.data.status === -2) {
									if (response.data.message === "登录密码出错已达上限，账号已被锁定, 请10分钟后重新登录或找回密码") {
										const messge = (
											<div>
												<p>
													登录密码出错已达上限，账号已被锁定；
												</p>
												<p className="mt10">
													请10分钟后重新登录或<a href={'/changepassword'} style={{
													textDecoration: "underline",
													color: "#4CACFF",
												}}>找回密码</a>
												</p>
											</div>
										)
										this.openNotifications(messge);
									} else {
										notification.open({
											message: '提示',
											description: response.data.message,
                      duration: 5,
										});
									}
								}else{


                  broadcastChannelPostMessage('refreshPage')
                    this.setState({
                        isRender:false
                    })
								  	this.props.Modifyloginvalue();
                    window.location.reload();

                }
            }
          // try {
          //   this.props.Modifyloginvalue();
          // }catch (e) {
					//
          // }
        }).catch((error) => {
          console.log("356");
            console.log(error)
        })

    };
  setNotcompleteds=()=>{
    this.setState({
      Notcompleteds:true,
      MyEduCoderModals:false
    })
  };
  setMyEduCoderModals=()=>{
    this.setState({
      MyEduCoderModals:true
    })
  };
    onKeydowns=(e)=>{
        let {disabled}=this.state;
        if( disabled===false&& e.keyCode === 13){
            this.loginEDU()
            console.log(1)
        }
    };
  getloginurl=(url)=>{
    window.location.href = url;
  };
	openweixinlogin=()=>{
		this.setState({
			weixinlogin:true
		})
	}
	openNotifications = (btn) => {
		// type  1 成功提示绿色 2提醒颜色黄色 3错误提示红色
		notification.open({
			message: "提示",
			description: btn,
      duration: 5,
			onClick: () => {

			},
		});
	}
	openqqlogin=()=>{
		this.setState({
			qqlogin:true
		})
		//window.location.href=`https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101508858&redirect_uri=https%3a%2f%2f${window.location.host}%2otherloginqq&response_type=code`
		window.location.href=`https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101508858&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginqq&state=null,${window.location.host}&response_type=code`
		// window.location.href=`https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101508858&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginstart&tp=qq&response_type=code`
	}

	openphoneqqlogin=()=>{
		window.open(
			`https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101508858&daid=383&pt_skey_valid=0&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=101508858&response_type=code&scope=get_user_info&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginqq&state=null,${window.location.host}&response_type=code`
		)
	}

  getTContainer = () => {
    return document.body;
  }
	hideweixinlogin=()=>{
		this.setState({
			weixinlogin:false,
			qqlogin:false
		})
	}

    render() {
      let{qqlogin,login,isGoing,isGoingValue,disabled,bottonclass,Phonenumberisnotco,
        dialogBox, isRender,weixinlogin}=this.state;

        if (isRender === undefined) {
            isRender = false
        }

    	return (
			<Dialog open={true} id="DialogID"
              className="zindextest"
              style={{ display: isRender==false? 'none' : ''}}
              disableEscapeKeyDown={true}
              disableBackdropClick={true}
              onClose={() => this.handleDialogClose()}
            >
        <Notcompletedysl
          modalsType={this.state.MyEduCoderModals}
          setNotcompleteds={()=>{this.setNotcompleteds()}}
        />

				{/*{this.state.isphone===false||this.props.user&&this.props.user.main_site===false?<style>*/}
					{/*{*/}
						{/*`*/}
						  {/*#DialogID .dialogBox {*/}
									{/*width: 405px !important;*/}
							{/*}*/}
							{/*.dialogBox {*/}
									{/*height: 290px !important;*/}
							{/*}*/}
						{/*`*/}
					{/*}*/}
				{/*</style>:""}*/}
				<style>
					{
						`
						  #DialogID .dialogBox {
									width: 405px !important;
							}
							.dialogBox {
									height: 290px !important;
							}
						`
					}
				</style>
				{isRender===true?
            <div className={dialogBox}>
                  <div id="closeIcon" className={"logincloseIcon"} onClick={()=>{this.handleDialogClose()}}>
                      <i className="iconfont icon-shanchudiao"></i>
                  </div>

                  <div id="log_reg_content" >
										{weixinlogin===true?"": <ul className="log_nav clearfix">
                      <li className={login==0?'active':''} onClick={()=>{this.enter(0)}}>登录</li>
                      {/*<li className={speedy==0?'active':''}  onClick={()=>{this.register(0)}}>快捷登录</li>*/}
                    </ul>}


                      <div className="login-panel" id="login-panel-1" style={{display: login==0?'block':'none'}}>
												{weixinlogin===true?"":<form acceptCharset="UTF-8" action="/login" id="main_login_form" method="post">

                          <div style={{"display":"inline","padding":"0","margin":"0"}}>
                          <input name="utf8" type="hidden" value="✓"></input>
                          <input name="authenticity_token" type="hidden" value="NVLiIlHZfhVBQtO9djnWncJqqdikNQIIxEmOvzK9vNM="></input>
                          </div>

                          <input name="back_url" type="hidden" value={this.back_url}></input>
                          <input
														type="text"
														className="input-100-45 mt20"
														id="name_loggin_input"
														ref="loginPassText"
														onInput={this.loginChange}
														onBlur={(e) => this.inputOnBlur(e, 1)}
														onPressEnter={disabled === false ?
															this.loginEDU : () => {
															}
															// console.log(1)
														}
														value={this.state.loginValue}
														name="username"
														placeholder="请输入有效的手机号/邮箱号" ></input>

                          <div style={{height: '25px'}}><p className="color-orange edu-txt-left none" id="username_error_notice"
                            style={{display: Phonenumberisnotco===undefined?'none':'block'}}>{Phonenumberisnotco}</p></div>

                          <div>
                            <input type="password" id="password_loggin_input"
																	 name="password"
																	 ref="passwordText"
																	 onInput={this.passwordChange}
																	 onKeyDown={this.onKeydowns}
																	 className="input-100-45 mt5"
																	 onPressEnter={disabled === false ?
																		 this.loginEDU : () => {
																		 }
																		 // console.log(1)
																	 }
																	 placeholder="密码" >
                            </input>
                            <div style={{height: '25px'}}>
                              <p className="color-orange edu-txt-left none" id="password_error_notice">
                                请输入密码
                              </p>
                            </div>
                          </div>


                          {/*<button className={bottonclass} id="psd_login_btn"  onClick={this.loginEDU} disabled={disabled}>*/}

                          {/*</button>*/}

                            <div className={disabled===false?"bluebutton  edu-back-blue":"bluebutton"}
                                 onClick={disabled===false?
                                   this.loginEDU: () => {}
                                   // console.log(1)
                                 }
                            >
                             登录
                            </div>

                          <p className="clearfix mt20">

                            <span className="fl">
                              <input type="checkbox"
                              className="mr5 magic-checkbox"
                              checked={isGoing}
                              onChange={this.handleInputChange}
                              value={isGoingValue}
                              name="isGoing"
                              id="p_autolog"></input>
                              <label htmlFor="p_autolog" style={{top:'0px'}}>下次自动登录</label>
                            </span>

                            <span className="fr">
                              <a onClick={(url) => this.getloginurl("/changepassword")}
																 className="mr3 color-grey-9">找回密码</a><em className="vertical-line"></em>
                              <a onClick={(url)=>this.getloginurl("/register")} className="color-grey-9">注册</a>
                            </span>

                          </p>

													{this.props.user&&this.props.user.main_site===true?this.state.isphone===true?<p className="clearfix mt20">

													<span className={"startlogin"}>————————  快速登录  ————————</span>
													<div className={"mt10"}>
														<a onClick={()=>this.openweixinlogin()}>
															<img src={require('./WeChat.png')}  alt="微信登录"/>
														</a>
														<a onClick={()=>this.openqqlogin()} className={"ml10"}>
															<img src={require('./qq.png')}  alt="qq登录"/>
														</a>
													</div>
												</p>:<p className="clearfix mt20">

														<span className={"startlogin"}>————————  快速登录  ————————</span>
														<div className={"mt10"}>
															{/*<a onClick={()=>this.openweixinlogin()}>*/}
															{/*<img src={require('./WeChat.png')}  alt="微信登录"/>*/}
															{/*</a>*/}
															<a onClick={()=>this.openphoneqqlogin()} className={"ml10"}>
																<img src={require('./qq.png')}  alt="qq登录"/>
															</a>
														</div>
													</p>:""}



                        </form>}
												{weixinlogin===true?<iframe
													className={"weixinheight390"}
													frameBorder="0"
													sandbox="allow-scripts allow-same-origin allow-top-navigation"
													scrolling="no"
													src={`https://open.weixin.qq.com/connect/qrconnect?appid=wx6b119e2d829c13fa&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginstart&response_type=code&scope=snsapi_login&state=null,${window.location.host}#wechat_redirect`}></iframe>:""}


												{weixinlogin===true?<p className="clearfix ">
													<a className={"startlogin color-blue"} onClick={()=>this.hideweixinlogin()}>返回账号登录</a>
												</p>:""}
                      </div>

                      {/*快捷登录*/}



                  </div>
                </div>
					:""}
            </Dialog>

    	);
    }

}

export default LoginDialog ;

