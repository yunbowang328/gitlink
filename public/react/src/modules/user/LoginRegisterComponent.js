import React, {Component} from 'react';
import {setmiyah,broadcastChannelPostMessage} from 'educoder';
import {Tabs, Input, Checkbox, Button, notification,Menu} from 'antd';
import passopen from '../../../src/images/login/passopen.png';
import passoff from '../../../src/images/login/passoff.png';
import axios from 'axios';
import CheckInputysl1 from './CheckInputysl';
import CheckInputysl2 from './CheckInputysl';
import Notcompletedysl from './Notcompletedysl';
import './common.css'
import './commontwo.css'
const { TabPane } = Tabs;
const loginInputsyl = {
    "width":"434px",
    "height": "462px",
    "-webkit-box-shadow": "3px 10px 21px 0px rgba(76,76,76,0.15)",
    "box-shadow": "3px 10px 21px 0px rgba(76,76,76,0.15)",
    "border-radius": "6px",
    "background": "#fff"
}

//父组件EducoderLogin.js
class LoginRegisterComponent extends Component {
    constructor(props) {
        super(props)


        //
        // console.log("LoginRegisterComponent");
        // console.log("29");
        // console.log(props.loginstatus);
        if(props.loginstatus === true){
            // console.log(props.loginstatus);
            this.state = {
                tab:["0"],
                classpass: "text",
                // 登录
                passopens: passoff,
                seconds: 60,
                discodeBtn: false,
                clearInterval: false,
                autoLogin: true,
                classpassbool: false,
                // 注册
                readAgreement: false,
                getverificationcodes: true,
                dragOk: false,
                Agreetotheterms: true,
                login: "",
                password: "",
                logins: "",
                passwords: "",
                codes: "",
                Phonenumberisnotco: undefined,
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcosyzm:undefined,
                Phonenumberisnotcosymmm:undefined,
                Phonenumberisnotcosytdhk:undefined,
                Phonenumberisnotcosyfwtk:undefined,
                Phonenumberisnotcodmm:undefined,
                Phonenumberisnotcobool: false,
                Whethertoverify:false,
                pciphone:true,
                MyEduCoderModals:false,
                registered:undefined,
                Phonenumberisnotcodmms:undefined,
							  weixinlogin:false,
							  qqlogin:false
            }
        }
        if(props.loginstatus === false){
            // console.log(props.loginstatus);
            this.state = {
                tab:["1"],
                classpass: "text",
                // 登录
                passopens: passoff,
                seconds: 60,
                discodeBtn: false,
                clearInterval: false,
                autoLogin: true,
                classpassbool: false,
                // 注册
                readAgreement: false,
                getverificationcodes: true,
                dragOk: false,
                Agreetotheterms: true,
                login: "",
                password: "",
                logins: "",
                passwords: "",
                codes: "",
                Phonenumberisnotco: undefined,
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcosyzm:undefined,
                Phonenumberisnotcosymmm:undefined,
                Phonenumberisnotcosytdhk:undefined,
                Phonenumberisnotcosyfwtk:undefined,
                Phonenumberisnotcobool: false,
                Phonenumberisnotcodmm:undefined,
                Whethertoverify:false,
                pciphone:true,
                MyEduCoderModals:false,
                registered:undefined,
                Phonenumberisnotcodmms:undefined,
						  	weixinlogin:false,
					   		qqlogin:false
            }
        }
    }

    //判断是否是手机端
    IsPC=()=> {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;//这个意思是说自己的是pc 端
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
// 点击表单后，改变type
    changeType = () => {
        this.setState({classpass: 'password'});
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
    componentDidMount = () => {
			let flag = this.IsPC(); //true为PC端，false为手机端
			this.setState({
				isphone:flag
			})
        // console.log("componentDidUpdate");
        // console.log(this.props);
        let pcipns=this.IsPC();
        if (this.props.match.url === "/login") {

            // this.state = {
            //     tab:["0"],
            //
            // }
            this.setState({
                tab:["0"]
            })
        } else if (this.props.match.url === "/register") {

            // this.state = {
            //     tab:["1"],
            //
            // }
            this.setState({
                tab:["1"]
            })
        }
        this.setState({
            pciphone:pcipns,
        })


    }
    openNotification = (messge,type) => {
        // type  1 成功提示绿色 2提醒颜色黄色 3错误提示红色
        notification.open({
            message: "提示",
            description: messge,
            onClick: () => {

            },
        });
    }
    openNotifications = (btn) => {
        // type  1 成功提示绿色 2提醒颜色黄色 3错误提示红色
        notification.open({
            message: "提示",
            description: btn,
            onClick: () => {

            },
        });
    }


    StudyMakeMoney = () => { // 调用父组件方法

        // this.props.Setlogins(3);
        this.setState({
            login: "",
            password: "",
            logins: "",
            passwords: "",
            codes: "",
        });
        try {
            this.props.Setshowbool(3);
        }catch (e) {

        }
    }
    onTabChange = (activeKey) => {

    }
    // -------------------- LOGIN START
    //下次自动登入
    onAutoLoginChange = (e) => {
        this.setState({autoLogin: e.target.checked})
    }

    // -------------------- LOGIN END

    isCorrectname = (value, id) => {
        if (id === 1) {

            if (value.length === 0) {
                this.setState({
                    Phonenumberisnotco: undefined,
                    Phonenumberisnotcobool: false,
                })
                return;
            }
        } else if (id === 2) {
            if (value.length === 0) {
                this.setState({
                    Phonenumberisnotcos: undefined,
                    Phonenumberisnotcobool: false,
                })
                return;
            }
        }
        this.Emailphonenumberverification(value, id)

    }
    // -------------------- REGISTER START
    onReadAgreementChange = (e) => {
        this.setState({readAgreement: e.target.checked})
    }
    //是否验证通过
    dragOkCallback = () => {
        this.setState({
            Phonenumberisnotcosytdhk:undefined,
        })
        if (this.state.logins.length === 0) {
            this.setState({
                Phonenumberisnotcos:"账号不能为空",
                Phonenumberisnotcobool: true,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })


            return;
        }
        // var telephone = $("#telephoneAdd.tianjia_phone").val();
        var regph = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        // var email = $("#add_email.tianjia_email").val();
        var regemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        // [1]手机号开头必须是1    [3,4,5,6,7,8] 第二位是3-8中的一个 [0-9]{9} 后边9位可以是0-9的任意数字。
        var stringdata = undefined;
        if (!regph.test(this.state.logins)) {
            stringdata = "手机号格式不正确";
            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,
                dragOk:true,
            })

        } else {
            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,
                dragOk:true,
            });
            this.Emailphonenumberverification(this.state.logins, 2);
            return
        }

        if (!regemail.test(this.state.logins)) {
            if ((this.state.logins.indexOf("@") != -1) === true) {
                stringdata = "邮箱格式不正确";
            } else {
                stringdata = "手机号格式不正确";

            }
            this.setState({
                Phonenumberisnotcos: stringdata,
                Phonenumberisnotcobool: true,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            });


            return
        } else {

            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,
                dragOk:true,
            })
            this.Emailphonenumberverification(this.state.logins, 2);
            return
        }

        this.setState({
            Phonenumberisnotcosytdhk:undefined,
        })
        this.Emailphonenumberverification(this.state.logins, 2)

    }
    // -------------------- REGISTER END

    //是否同意
    onChange = (e) => {
        this.setState({
            Agreetotheterms: e.target.checked,
        })
    }

    //登入接口
    postLogin = () => {

        if (this.state.login === undefined || this.state.login == "") {
            this.setState({
                Phonenumberisnotco:"账号不能为空",
            })
            return
        } else if (this.state.password === undefined || this.state.password == "") {
            this.setState({
                Phonenumberisnotcodmm:"密码不能为空",
            })
            return
        }
        var url = "/accounts/login.json";
        axios.post(url, {
            login: this.state.login,
            password: this.state.password,
        }).then((response) => {
            debugger
            if (response === undefined) {
                return
            }

            if(response.data.status === -2){
                if(response.data.message==="该手机号尚未注册" || response.data.message==="该邮箱尚未注册"){
                    this.setState({
                        Phonenumberisnotco:response.data.message,
                    })
                    return;
                }
                else if(response.data.message==="错误的账号或密码"){
                    this.setState({
                        Phonenumberisnotcodmms:response.data.message,
                    })
                    return;
                }
                else if(response.data.message==="违反平台使用规范，账号已被锁定"){
                    this.setState({
                        Phonenumberisnotco:response.data.message,
                    })

                    return;
                } else if (response.data.message === "登录密码出错已达上限，账号已被锁定, 请10分钟后重新登录或找回密码") {
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
                    return;
                } else {
                    this.openNotification(response.data.message);
                    return;
                }


            }

            // if(response.data.profile_completed !== null || response.data.profile_completed === false){
            //     this.setMyEduCoderModals();
            //     return;
            // }

            if (response.status === 200) {
                if (response.data.status === 402) {
                    window.location.href = response.data.url;
                } else {
                    broadcastChannelPostMessage('refreshPage')
                    this.setState({
                        isRender: false
                    })
                    var weekArray = JSON.parse(window.sessionStorage.getItem('yslgeturls'));
                    if(weekArray===undefined){
                        weekArray="/";
                    }
                    if(weekArray===null){
                        weekArray="/";
                    }
                    if(weekArray==="null"){
                        weekArray="/";
                    }
                    window.location.href = weekArray;
                }
            }


        }).catch((error) => {

        })

    }
    //注册接口
    postregistered = () => {
        // if (this.state.logins === undefined || this.state.logins === "") {
        //     this.openNotification(`请输入登录手机号码或邮箱`,2);
        //
        //     return
        // } else if (this.state.dragOk === false) {
        //     this.openNotification(`请拖动滑块验证`,2);
        //     return
        // } else if (this.state.codes === undefined || this.state.codes == "") {
        //     this.openNotification(`请输入验证码`,2);
        //     return
        // } else if (this.state.passwords === undefined || this.state.passwords == "") {
        //     this.openNotification(`请输入密码`,2);
        //     return
        // } else if (this.state.Agreetotheterms === false) {
        //     this.openNotification(`请同意服务协议条款`,2);
        //     return;
        // }
        if (this.state.logins === undefined || this.state.logins === ""||this.state.logins.length===0) {
            this.setState({
                Phonenumberisnotcos:"账号不能为空",
                Phonenumberisnotcobool: true,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })
            return
        }
        if(this.state.pciphone===true){
            if (this.state.dragOk === false) {
                // this.openNotification(`请拖动滑块完成验证`,2);
                this.setState({
                    Phonenumberisnotcosytdhk:"请拖动滑块完成验证",
                    dragOk:false,
                    Whethertoverify:this.state.Whethertoverify===true?false:true,
                })
                return
            }
        }

        if (this.state.codes === undefined || this.state.codes == ""||this.state.codes.length===0) {
            // this.openNotification(`请输入验证码`,2);
            this.setState({
                Phonenumberisnotcosyzm:"验证码不能为空",
            })
            return
        } else if (this.state.passwords === undefined || this.state.passwords == "" ||this.state.passwords.length===0) {
            this.setState({
                Phonenumberisnotcosymmm:"密码不能为空",
            })
            return
        } else if (this.state.passwords !==undefined &&this.state.passwords.length>0&&this.state.passwords.length<8){
            this.setState({
                Phonenumberisnotcosymmm:"密码不能少于8位",
            })
            return
        } else if (this.state.passwords !==undefined &&this.state.passwords.length>0&&this.state.passwords.length>16){
            this.setState({
                Phonenumberisnotcosymmm:"密码不能超过16位",
            })
            return
        } else if (this.state.Agreetotheterms === false) {
            this.openNotification(`请同意服务协议条款`,2);
            return;
        }

        let url;
        if(this.props.weixinlogin){
            url= '/weapps/register.json';
        }else{
            url = "/accounts/register.json";
        }

        axios.post(url, {
            login: this.state.logins,
            password: this.state.passwords,
            code: this.state.codes,
        }).then((result) => {
            if(result){
                if(result.data.status===-2){
                    if(result.data.message==="验证码不正确"){
                        this.setState({
                            Phonenumberisnotcosyzm:"验证码不正确",
                        })

                        return;
                    }else if(result.data.message==="验证码已失效"){
                        this.setState({
                            Phonenumberisnotcosyzm:"验证码不正确",
                        })

                        return;
                    }else {
                        this.openNotification(result.data.message);
                        return;
                    }
                }else {
                    // this.setState({
                    //     logins: "",
                    //     dragOk: false,
                    //     codes: "",
                    //     passwords: "",
                    //     Agreetotheterms: "",
                    // })
                    this.setMyEduCoderModals();
                }
            }
        }).catch((error) => {

        })
    }

    //邮箱手机号验证
    Emailphonenumberverification = (value, id) => {
        var url = `/accounts/valid_email_and_phone.json`;
        axios.get((url), {
            params: {
                login: value,
                type: 1,
            }
        }).then((result) => {

            //验证有问题{"status":1,"message":"success"}
            // console.log(result);
            // this.setState({dragOk: true})

            if(result){
                if(result.data.status===-2){
                    if (id === 1) {
                        if(result.data.message==="该手机号码或邮箱已被注册"){
                            this.setState({
                                Phonenumberisnotco: undefined,
                                Phonenumberisnotcobool: false,
                                dragOk:true,
                            })
                        }else {
                            this.setState({
                                Phonenumberisnotco: result.data.message,
                                Phonenumberisnotcobool: true,
                                dragOk:false,
                                Whethertoverify:this.state.Whethertoverify===true?false:true,
                            })


                        }
                        return;
                    } else if (id === 2) {
                        this.setState({
                            Phonenumberisnotcos: result.data.message,
                            Phonenumberisnotcobool: true,
                            dragOk:false,
                            Whethertoverify:this.state.Whethertoverify===true?false:true,
                        })


                        return;
                    }
                }else {
                    if (id === 1) {
                        this.setState({
                            Phonenumberisnotco: undefined,
                            Phonenumberisnotcobool: false,
                            dragOk:true,
                        })
                        return;
                    } else if (id === 2) {
                        this.setState({
                            Phonenumberisnotcos: undefined,
                            Phonenumberisnotcobool: false,
                            dragOk:true,
                        })
                        return;
                    }
                }
            }

        }).catch((error) => {

        })
    };
    //短信验证
    SMSverification = () => {
        let logins=this.state.logins;
        var url = `/accounts/get_verification_code.json`;
        axios.get((url), {
            params: {
                login: this.state.logins,
                type: 1,
                smscode:setmiyah(logins)
            }
        }).then((result) => {
            //验证有问题{"status":1,"message":"success"}
            // console.log(result);
            if(result.data.status===1){
                this.openNotification("验证码已发送，请注意查收");
            }else if(result.data.status===-2){
                this.openNotification(result.data.message);
            }
        }).catch((error) => {


        })
    }
    //显示和不显示密码
    Showandhide = (e) => {

        if (this.state.classpassbool === true) {
            this.setState({
                passopens:passoff ,
                classpass: "text",
                classpassbool: false,
            })
        } else {
            this.setState({
                passopens: passopen ,
                classpass: "password",
                classpassbool: true,
            })
        }

    }

    //倒计时
    getverificationcode = () => {
        // console.log(this.state.Phonenumberisnotcobool);
        // console.log(this.state.dragOk);
        if(this.state.logins === undefined || this.state.logins.length===0){
            this.openNotification("请输入手机号或邮箱");
            return;
        }
        //这是判断是否手机正确
        if(this.state.Phonenumberisnotcobool === true){
            this.openNotification(this.state.Phonenumberisnotcos);
            this.setState({
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })
            return;
        }
        if(this.state.pciphone===true) {
            if (this.state.dragOk === false) {
                this.openNotification("请拖动滑块验证");
                return;
            }
        }

        if (this.state.getverificationcodes === true) {
            this.setState({
                getverificationcodes: undefined,
            })
            let timer = setInterval(() => {
                this.setState((preState) => ({
                    seconds: preState.seconds - 1,
                }), () => {
                    if (this.state.seconds == 0) {
                        clearInterval(timer);
                        this.setState({
                            getverificationcodes: false,
                            seconds: 60,
                        })
                    }
                });
            }, 1000)
            this.SMSverification();
        } else {
            this.setState({
                getverificationcodes: undefined,
            })
            let timer = setInterval(() => {
                this.setState((preState) => ({
                    seconds: preState.seconds - 1,
                }), () => {
                    if (this.state.seconds == 0) {
                        clearInterval(timer);
                        this.setState({
                            getverificationcodes: false,
                            seconds: 60,

                        })
                    }
                });
            }, 1000)
            this.SMSverification();
        }
    }
    //滑动验证手机号

    //获取登入
    loginInputonChange = (e) => {
        // console.log(e.target.value);
        var stirngt;
        if(e.target.value.length>0){
            var str=  e.target.value.replace(/\s*/g,"")
            stirngt=str;
        }else{
            stirngt=  e.target.value;
        }

        if (e.target.value.length === 0) {
            this.setState({
                Phonenumberisnotco: undefined,
                Phonenumberisnotcobool: false,
                Phonenumberisnotcodmms:undefined,
                login: stirngt,
            })
        }else{
            this.setState({
                login: stirngt,
                Phonenumberisnotco:undefined,
                Phonenumberisnotcodmms:undefined,
            })
        }

    }
    //失去焦点判断
    inputOnBlur = (e, id) => {
        this.Emailphonenumberverification(e.target.value, 1);
    }
    inputOnBlurzhuche = (e, id) => {
        if (e.target.value.length === 0) {
            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,
            })
            return;
        }
        // var telephone = $("#telephoneAdd.tianjia_phone").val();
        var regph = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        // var email = $("#add_email.tianjia_email").val();
        var regemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        // [1]手机号开头必须是1    [3,4,5,6,7,8] 第二位是3-8中的一个 [0-9]{9} 后边9位可以是0-9的任意数字。
        var stringdata = undefined;
        if (!regph.test(e.target.value)) {
            stringdata = "手机号格式不正确";
            this.setState({
                Phonenumberisnotcos: stringdata,
                Phonenumberisnotcobool: true,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })
        } else {
            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,

            })
            return
        }

        if (!regemail.test(e.target.value)) {
            if ((e.target.value.indexOf("@") != -1) === true) {
                stringdata = "邮箱格式不正确";
            } else {
                stringdata = "手机号格式不正确";

            }
            this.setState({
                Phonenumberisnotcos: stringdata,
                Phonenumberisnotcobool: true,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })
            return
        } else {
            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,

            })
            this.Emailphonenumberverification(e.target.value, id);
            return
        }
        this.Emailphonenumberverification(e.target.value, id);
    }
    //获取登入密码
    passwordonChange = (e) => {
        // console.log(e.target.value);
        var stirngt;
        if(e.target.value.length>0){
            var str=  e.target.value.replace(/\s*/g,"")
            stirngt=str;
        }else{
            stirngt=  e.target.value;
        }
        this.setState({
            password: stirngt,
            Phonenumberisnotcodmm:undefined,
            Phonenumberisnotcodmms:undefined,
        })
        // this.setState({
        //     password: e.target.value
        // })
    }
    //获取注册登入
    loginInputonChanges = (e) => {

        var stirngt;
        if(e.target.value.length>0){
            var str=  e.target.value.replace(/\s*/g,"")
            stirngt=str;
        }else{
            stirngt=  e.target.value;
        }
        if (e.target.value.length === 0) {
            this.setState({
                Phonenumberisnotcos: undefined,
                Phonenumberisnotcobool: false,
                logins: stirngt,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })
        }else{
            this.setState({
                logins: stirngt,
                Phonenumberisnotcos: undefined,
                dragOk:false,
                Whethertoverify:this.state.Whethertoverify===true?false:true,
            })
        }

    }
    //获取注册密码
    passwordonChanges = (e) => {
        // console.log(e.target.value);
        var stirngt;
        if(e.target.value.length>0){
            var str=  e.target.value.replace(/\s*/g,"")
            stirngt=str;
        }else{
            stirngt=  e.target.value;
        }
        this.setState({
            passwords: stirngt,
            Phonenumberisnotcosymmm:undefined,
        })
    }
    //获取code
    codesonChange = (e) => {
        this.setState({
            codes: e.target.value,
            Phonenumberisnotcosyzm:undefined,
        })
    }
    //切换tab
    changeTab=(e)=>{
        this.setState({
            tab:e.key
        })

        if(e.key === 0){
            this.setState({
                Phonenumberisnotcos:undefined
            })
        }else{
            this.setState({
                Phonenumberisnotco:undefined
            })

        }

        // this.props.history.push(`/courses/${this.props.match.params.coursesId}/exercises/${this.props.match.params.Id}/student_exercise_list?tab=`+e.key)

    }
    loginonkeyup =(e)=>{
        if(e.keyCode==32){

            return false;
        }
    };
    setNotcompleteds=()=>{
        this.setState({
            Notcompleteds:true,
            MyEduCoderModals:false,
            registered:undefined,

        })
    };
    setMyEduCoderModals=()=>{
        this.setState({
            MyEduCoderModals:true,
            registered:"注册成功"
        })
    };

	openweixinlogin=()=>{
		this.setState({
			weixinlogin:true
		})
	}
	hideweixinlogin=()=>{
		this.setState({
			weixinlogin:false,
			qqlogin:false,
        tab:["0"]
		})
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
    render() {
        const {
            // 登录
            autoLogin,
            classpass,
            passopens,
            seconds,
            getverificationcodes,
            Agreetotheterms,
            Phonenumberisnotco,
            Phonenumberisnotcos,
            codes,
            tab,
            dragOk,
            Whethertoverify,
            classpassbool,
            Phonenumberisnotcosytdhk,
            Phonenumberisnotcosyzm,
            Phonenumberisnotcosymmm,
            Phonenumberisnotcodmm,
            // 注册
            readAgreement,
            pciphone,
            Phonenumberisnotcodmms,
				  	weixinlogin
        } = this.state
        // height: 346px;
        if (this.state.seconds === 0) {
            // window.location.href='http://www.cnblogs.com/a-cat/';
        }


        return (

          <div className={this.props.weixinlogin?"weixinregister":"login_register_content login_register_contents"}
							 // style={  parseInt(tab[0])==0?{height: "366px"} :{height: "510px"}}
					>
              <style>
                  {
                      `
                        .login_register_contents, .login_register_contents .ant-tabs-tabpane {
                          display: flex;
                          justify-content: center;
                        }
                        `
                  }
              </style>

              <div>
								{weixinlogin===false&&this.props.weixinlogin===undefined?<Menu mode="horizontal" selectedKeys={tab} onClick={this.changeTab} className="mt20">
                      <Menu.Item key="0" className={tab===0?"active font-18":"font-18"}   > 登录</Menu.Item>
                      <Menu.Item key="1" className={tab===1?"active font-18 ":"font-18 "} style={{marginLeft:"10px"}}  >注册</Menu.Item>
                  </Menu>:""}

								{
										weixinlogin===false&&parseInt(tab[0])==0 &&
                      <div style={{width: '340px'}}>
                          <style>
                              {
                                  `
														.ant-input {
																		font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
																		-webkit-box-sizing: border-box;
																		box-sizing: border-box;
																		margin: 0;
																		padding: 0;
																		list-style: none;
																		position: relative;
																		display: inline-block;
																		padding: 4px 11px;
																		width: 100%;
																		height: 38px;
																		font-size: 14px;
																		line-height: 1.5;
																		color: rgba(0, 0, 0, 0.65);
																		background-color: #fff;
																		background-image: none;
																		border: 1px solid #d9d9d9;
																		border-radius: 4px;
																		-webkit-transition: all .3s;
																		-o-transition: all .3s;
																		transition: all .3s;
																}
														  .loginInputzhuche{
																	width: 100%;
																	background-color: #fff!important;
																	height: 45px !important;
																	padding: 5px;

																}

                                `
                              }
                          </style>

                          <Input placeholder="请输入登录手机号码或邮箱" value={this.state.login}
                                 onChange={this.loginInputonChange}
                                 name="username"
                                 className={Phonenumberisnotco && Phonenumberisnotco !== "" ?" color-grey-9 loginInputzhucheyslass bor-reds":" color-grey-9 loginInputzhuche"}
                                 onBlur={(e) => this.inputOnBlur(e, 1)}
                                 style={{marginTop: '30px', height: '38px'}}
                                 onPressEnter={() => this.postLogin()}
                          ></Input>

                          {
                              Phonenumberisnotco && Phonenumberisnotco != "" ?
                                <p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
                                    <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotco}</span>
                                </p>
                                : <div style={{height:"25px"}}></div>
                          }

                          <Input type="password" name="password" id="password" value={this.state.password}
                                 onChange={this.passwordonChange}
                                 onPressEnter={() => this.postLogin()}
                                 className={Phonenumberisnotcodmm && Phonenumberisnotcodmm !== "" ?" color-grey-9 loginInputzhucheyslass bor-reds":" color-grey-9 loginInputzhuche"}
                                 placeholder="密码"></Input>
                          {
                              Phonenumberisnotcodmm && Phonenumberisnotcodmm != "" ?
                                <p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
                                    <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotcodmm}</span>
                                </p>
                                : (Phonenumberisnotcodmms=== undefined?<div style={{height:"25px"}}></div>:"")
                          }
                          {
                              Phonenumberisnotcodmms && Phonenumberisnotcodmms != "" ?
                                <p className="color-red  mt5 mb5" style={{width: " 100%", height: "20px"}}>
                                    <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotcodmms}</span>
                                </p>
                                : ""
                          }

                          <div className="left_right  font-12 " style={{color: '#676767'}}>
                              <Checkbox onChange={this.onAutoLoginChange} checked={autoLogin}>下次自动登录</Checkbox>

                              <a onClick={()=>this.StudyMakeMoney()}
                                 className="mr3 color-grey-9 mt3 font-12">找回密码</a>
                          </div>

                          <Button className="login_btn font-16" type="primary" style={{height:"46px"}} onClick={() => this.postLogin()}
                                  size={"large"}>登录</Button>
												{this.props.mygetHelmetapi&&this.props.mygetHelmetapi.main_site===true?this.state.isphone===true?<p className="clearfix mb10 textcenter">

												<span className={"startlogin"}>————————  快速登录  ————————</span>
													<div className={"mt10"}>
														<a onClick={()=>this.openweixinlogin()}>
															<img src={require('./img/WeChat.png')}  alt="微信登录"/>
														</a>
														<a onClick={()=>this.openqqlogin()} className={"ml10"}>
															<img src={require('./img/qq.png')}  alt="qq登录"/>
														</a>
													</div>
												</p>:<p className="clearfix mb10 textcenter">
													<span className={"startlogin"}>————————  快速登录  ————————</span>
													<div className={"mt10"}>
														{/*<a onClick={()=>this.openweixinlogin()}>*/}
														{/*<img src={require('./WeChat.png')}  alt="微信登录"/>*/}
														{/*</a>*/}
														<a onClick={()=>this.openphoneqqlogin()}>
															<img src={require('./img/qq.png')}  alt="qq登录"/>
														</a>
													</div>
												</p>:""}
                      </div>
                  }



                  {
										weixinlogin===false&&parseInt(tab[0])==1 &&
                      <div style={{width: '340px'}}>
                          <Input  placeholder="请使用手机号/邮箱账号进行注册"
                                  className={Phonenumberisnotcos && Phonenumberisnotcos !== "" ?" color-grey-9 loginInputzhucheyslass bor-reds":" color-grey-9 loginInputzhuche"}
                                  value={this.state.logins}
                                  type="text" autoComplete="off"
                                  onChange={this.loginInputonChanges}
                            // onBlur={(e) => this.inputOnBlurzhuche(e, 2)}
                                  style={{marginTop: '30px' , height: '38px',color:'#999999',fontSize:"14px"}}></Input>
                          {
                              Phonenumberisnotcos && Phonenumberisnotcos !== "" ?
                                <p className="color-red  mt5 mb5  " style={{width: " 100%", height: "20px"}}>
                                    <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotcos}</span>
                                </p>
                                : <div style={{height:"25px"}}></div>

                          }
                          {this.state.MyEduCoderModals===true? <Notcompletedysl
                            modalsType={this.state.MyEduCoderModals}
                            registered={this.state.registered}
                            setNotcompleteds={()=>{this.setNotcompleteds()}}
                          />:""}

                          {
                              Whethertoverify===false&&pciphone===true?
                                <CheckInputysl1
                                  dragOkCallback={this.dragOkCallback}
                                >
                                </CheckInputysl1>
                                :
                                ""

                          }
                          {
                              Whethertoverify===true&&pciphone===true?
                                <CheckInputysl2
                                  dragOkCallback={this.dragOkCallback}
                                >
                                </CheckInputysl2>
                                :
                                ""
                          }

                          <div>
                              {
                                  pciphone===true?
                                    (
                                      Phonenumberisnotcosytdhk && Phonenumberisnotcosytdhk !== "" ?
                                        <p className="color-red  mt5 mb5  " style={{width: " 100%", height: "20px"}}>
                                            <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotcosytdhk}</span>
                                        </p>
                                        : <div style={{height:"25px"}}></div>

                                    )
                                    :""
                              }
                          </div>



                          <div className="yslbutondls">

                              <Input
                                className={Phonenumberisnotcosyzm && Phonenumberisnotcosyzm !== "" ?" mr5 font-14 color-grey-9 loginInputzhucheyslass bor-reds":" mr5 font-14 color-grey-9 loginInputzhuche"}
                                name="codes" type="text" autoComplete="off" readonly
                                onfocus="this.removeAttribute('readonly')" style={{
                                  width:'210px',
                                  height:'38px',
                              }} placeholder="请输入验证码"
                                onChange={this.codesonChange}
                                value={codes}
                              >
                              </Input>
                              {
                                  getverificationcodes === undefined ?
                                    <Button className=" ml5 font-14" disabled style={{"width": "120px","text-align":"center", "height": "45px",}}
                                            size={"large"}>重新发送{seconds}s</Button>
                                    : getverificationcodes === true ?
                                    <Button className=" ml5 font-14" type="primary" style={{"width": "120px","text-align":"center", "height": "45px",}}
                                            onClick={() => this.getverificationcode()} size={"large"}>获取验证码</Button>
                                    :
                                    <Button className=" ml5 font-14 " type="primary" style={{"width": "120px","text-align":"center", "height": "45px",}}
                                            onClick={() => this.getverificationcode()} size={"large"}>重新发送</Button>
                              }

                          </div>
                          <div>
                              {
                                  Phonenumberisnotcosyzm && Phonenumberisnotcosyzm !== "" ?
                                    <p className="color-red  mt5 mb5  " style={{width: " 100%", height: "20px"}}>
                                        <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotcosyzm}</span>
                                    </p>
                                    : <div style={{height:"25px"}}></div>

                              }
                          </div>



                          <style>
                              {
                                  `
                                    .ant-input-affix-wrapper .ant-input-suffix {
                                        right: 12px;
                                        height: 20px;
                                    }
                                    .mymimasysl {
																		border-right: none !important;
																		}
																		.ant-input-group-addon{
																		background-color: #fff;s
																		}
																		.ant-input-group .ant-input:hover {
                                    z-index: 0 !important;
                                    }
                                    `
                              }
                          </style>
                          <Input  placeholder="输入8~16位密码，区分大小写"
                                  type={classpassbool===false?"text":"password"}
                                  className={Phonenumberisnotcosymmm && Phonenumberisnotcosymmm !== "mymimasysl" ?"  font-14   color-grey-9 loginInputzhucheysl mymimasysl":"  font-14   color-grey-9 loginInputzhuche mymimasysl"}
                                  autoComplete="new-password"
                                  onClick={this.changeType}
                                  value={this.state.passwords} onChange={this.passwordonChanges}
                                  addonAfter={
                                      <img className={"mt5"} src={passopens} onClick={(key) => this.Showandhide(key)}>
                                      </img>
                                  }></Input>
                          {
                              Phonenumberisnotcosymmm && Phonenumberisnotcosymmm !== "" ?
                                <p className="color-red  mt5 mb5  " style={{width: " 100%", height: "20px"}}>
                                    <span className="fl" style={{textAlign:"left",width: " 100%"}}>{Phonenumberisnotcosymmm}</span>
                                </p>
                                : <div style={{height:"25px"}}></div>

                          }
												{this.props.mygetHelmetapi&&this.props.mygetHelmetapi.main_site===true?<Checkbox onChange={this.onChange}
                                    checked={Agreetotheterms}
                          ><span className="font-14 "  style={{
                              color: '#676767',
                          }}>我已阅读并同意
															<span>
																<a href={'https://forge.educoder.net/help?index=4'} target="_blank" className={"color-blue"}>《服务协议条款》</a>
															</span></span></Checkbox>:""}
                          <Button className=" font-16 mb20" type="primary" style={this.props.mygetHelmetapi&&this.props.mygetHelmetapi.main_site===true?{height:"46px", width: "100%",marginTop:"26px"}:{height:"46px", width: "100%"}} onClick={() => this.postregistered()}
                                  size={"large"}>{this.props.weixinlogin?"注册并绑定":"注册"}</Button>

												{this.props.mygetHelmetapi&&this.props.mygetHelmetapi.main_site===true?this.state.isphone===true?<p className="clearfix mb10 textcenter">

													<span className={"startlogin"}>————————  快速登录  ————————</span>
													<div className={"mt10"}>
														<a onClick={()=>this.openweixinlogin()}>
															<img src={require('./img/WeChat.png')}  alt="微信登录"/>
														</a>
														<a onClick={()=>this.openqqlogin()} className={"ml10"}>
															<img src={require('./img/qq.png')}  alt="qq登录"/>
														</a>
													</div>
												</p>:<p className="clearfix mb10 textcenter">
													<span className={"startlogin"}>————————  快速登录  ————————</span>
													<div className={"mt10"}>
														{/*<a onClick={()=>this.openweixinlogin()}>*/}
														{/*<img src={require('./WeChat.png')}  alt="微信登录"/>*/}
														{/*</a>*/}
														<a onClick={()=>this.openphoneqqlogin()}>
															<img src={require('./img/qq.png')}  alt="qq登录"/>
														</a>
													</div>
												</p>:""
												}
                      </div>
                  }




								{weixinlogin===true?<iframe
									className={"weixinheight390 mt20"}
									frameBorder="0"
									sandbox="allow-scripts allow-same-origin allow-top-navigation"
									scrolling="no"
									src={`https://open.weixin.qq.com/connect/qrconnect?appid=wx6b119e2d829c13fa&redirect_uri=https%3a%2f%2fwww.educoder.net%2fotherloginstart&response_type=code&scope=snsapi_login&state=null,${window.location.host}#wechat_redirect`}></iframe>:""}
								{weixinlogin===true?<p className="clearfix mb20 textcenter">
									<a className={"startlogin color-blue"} onClick={()=>this.hideweixinlogin()}>返回登录注册</a>
								</p>:""}
              </div>

          </div>
        );
    }
}

export default (LoginRegisterComponent);
