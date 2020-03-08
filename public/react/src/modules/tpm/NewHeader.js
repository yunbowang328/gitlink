import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import AccountProfile from"../user/AccountProfile";
import PropTypes from 'prop-types';
import Certifiedprofessional from "../../modules/modals/Certifiedprofessional"

// import searchImg from '../../../../images/educoder/icon/search.svg'

// /images/educoder/icon/search.svg

import { getImageUrl, toPath ,trigger,broadcastChannelPostMessage} from 'educoder'

import axios from 'axios';

import { Modal,Checkbox ,Radio,Input,message,notification,Popover} from 'antd';

import Addcourses from '../courses/coursesPublic/Addcourses';

import LoginDialog from '../login/LoginDialog';

import Trialapplication from '../login/Trialapplication';

import GotoQQgroup from '../../modal/GotoQQgroup'

import 'antd/lib/modal/style/index.css';

import 'antd/lib/checkbox/style/index.css';

import 'antd/lib/radio/style/index.css';

import 'antd/lib/input/style/index.css';

import './TPMIndex.css';



const $ = window.$
// TODO 这部分脚本从公共脚本中直接调用

const RadioGroup = Radio.Group;
const { Search } = Input;
let old_url;

/*
    _logined_header.html.erb
    _unlogin_header.html.erb
*/
window._header_componentHandler = null;
class NewHeader extends Component {
  constructor(props) {
    super(props)
    this.state={
      Addcoursestypes:false,
      tojoinitemtype:false,
      tojoinclasstitle:undefined,
      rolearr:["",""],
      Checkboxteacherchecked:false,
      Checkboxstudentchecked:false,
      Checkboxteachingchecked:false,
      Checkboxteachertype:false,
      Checkboxteachingtype:false,
      code_notice:false,
      checked_notice:false,
      RadioGroupvalue:undefined,
      submitapplications:false,
      isRender:false,
			showSearchOpentype:false,
      showTrial:false,
			setevaluatinghides:false,
      occupation:0,
      mydisplay:false,
			headtypesonClickbool:false,
			headtypess:"/",
			mygetHelmetapi2: null,
			goshowqqgtounp:false,
			visiblemyss:false,
    }
     // console.log("176")
    // console.log(props);
    // console.log("NewHeader1234567890");
    // console.log(this.props);
  }
	componentDidUpdate = (prevProps) => {
		// console.log("componentDidMount2");
		// console.log(this.state.mygetHelmetapi2);
		if(this.state.mygetHelmetapi2===undefined){
			this.getAppdata();
		}
	}
  componentDidMount() {
  	// console.log("componentDidMount1");
   this.getAppdata();
    window._header_componentHandler = this;

    //下拉框的显示隐藏
    var hoverTimeout;
    var hoveredPanel;
    $(".edu-menu-panel").hover(function(){
      if (hoverTimeout) { // 一次只显示一个panel
        if (hoveredPanel && hoveredPanel != this) {
          $(hoveredPanel).find(".edu-menu-list").hide()
        }
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      hoveredPanel = this;
      $(this).find(".edu-menu-list").show();
    },function(){
      var that  =this;
      // 延迟hide
      hoverTimeout = setTimeout(function() {
        $(that).find(".edu-menu-list").hide();
      }, 800)

    });

    //获取游览器地址
		try {
			window.sessionStorage.setItem("yslgeturls", JSON.stringify(window.location.href))
		} catch (e) {

		}
    // axios.interceptors.response.use((response) => {
    //   if (response != undefined)
    //   if (response && response.data.status === -1) {
    //     if (response.data.message === "该课堂要求成员完成实名认证") {
    //
    //     } else if (response.data.message === "该课堂要求成员完成职业认证") {
    //       console.log("该课堂要求成员完成职业认证");
    //         this.HideAddcoursestypess(2);
    //
    //
    //
    //       return
    //     } else if (response.data.message === "该课堂要求成员完成实名和职业认证") {
    //       console.log("该课堂要求成员完成实名和职业认证");
    //         this.HideAddcoursestypess(3);
    //       return
    //
    //     }
    //   }
    //   return response;
    // }, (error) => {
    //
    // });
  }

  componentDidUpdate = (prevProps) => {
    // if(prevProps.user!=this.props.user){
    //   // console.log("216")
    //   // console.log(prevProps.user);
    //   // console.log(this.props.user);
    //   if(this.props.user !== undefined){
    //     this.setState({
    //           user_phone_binded :this.props.user.user_phone_binded,
    //         })
    //   }
    //
    //
    // }
  }

  openNotification = (messge) => {
    notification.open({
      message: "提示",
      description:
      messge,
    });
  };

  componentWillReceiveProps(newProps, oldProps) {
    this.setState({
      user:newProps.user
    })
    if(newProps.Headertop!=undefined){
      old_url=newProps.Headertop.old_url
    }

  }
  getCookie=(key)=>{
    var arr,reg = RegExp('(^| )'+key+'=([^;]+)(;|$)');
    if (arr = document.cookie.match(reg))    //["username=liuwei;", "", "liuwei", ";"]
      return decodeURIComponent(arr[2]);
    else
      return null;
  }

  delCookie=(name)=>{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(cval!=null){
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
  }
  onLogout = () => {
    const url = `/accounts/logout.json`
    this.delCookie("autologin_trustie")
    axios.get(url, {
    })
      .then((response) => {
        if(response.data.status===1){
          this.setState({
            user:undefined
          })
          // let path="/";
          // this.props.history.push(path);
          // broadcastChannelPostMessage('refreshPage')
          window.location.href ="/login"
          message.success('退出成功');
        }
      });
  }

  tojoinclass=()=>{
    let{user} =this.state;
    if(user===undefined){
      this.setState({
        isRender:true
      })
      return
    }
    if(user&&user.login===""){
      this.setState({
        isRender:true
      })
      return;
    }

		if(user&&user.profile_completed===false){
			this.setState({
				AccountProfiletype:true
			})
			return;
		}

		this.setState({
      Addcoursestypes:true,
    })
  }

  tojoinitem=()=>{
			if(this.props.user&&this.props.user.email===undefined||this.props.user&&this.props.user.email===null||this.props.user&&this.props.user.email===""){
				this.openNotification("请先绑定邮箱，谢谢");
				return
			}
    let{user} =this.state;
    if(user===undefined){
      this.setState({
        isRender:true
      })
      return
    }
    if(user&&user.login===""){
      this.setState({
        isRender:true
      })
      return;
    }

		if(user&&user.profile_completed===false){
			this.setState({
				AccountProfiletype:true
			})
			return;
		}

		this.setState({
      tojoinitemtype:true
    })
  }


  submitstatevalue=(sum,value,data)=>{
    this.setState({
      Addcoursestypes:false,
      tojoinitemtype:false,
      tojoinclasstitle:undefined,
      rolearr:["",""],
      Checkboxteacherchecked:false,
      Checkboxstudentchecked:false,
      Checkboxteachingchecked:false,
      Checkboxteachertype:false,
      Checkboxteachingtype:false,
      code_notice:false,
      checked_notice:false,
      submitapplicationssum:sum,
      submitapplications:true,
      submitapplicationsvalue:value,
      submitapplicationsvaluedata:data,
      RadioGroupvalue:undefined
    })
  }

  onChangeRadioGroup = (e) => {
    this.setState({
      RadioGroupvalue: e.target.value,
    });
  }

  submitsubmitapplications=()=>{
    let {
      submitapplicationssum,
      submitapplicationsvaluedata
    }=this.state;
    this.setState({
      submitapplications:false,
      RadioGroupvalue:undefined
    })
    if(submitapplicationssum===0){
      if(submitapplicationsvaluedata!=undefined){
        window.location.href = "/courses/"+submitapplicationsvaluedata;
      }
    }else if(submitapplicationssum===1){
      if(submitapplicationsvaluedata!=undefined){
        window.location.href = "/projects/"+submitapplicationsvaluedata;
      }
    }
  }

  hidesubmitapplications=()=>{
    this.setState({
      Addcoursestypes:false,
      tojoinitemtype:false,
      tojoinclasstitle:undefined,
      rolearr:["",""],
      Checkboxteacherchecked:false,
      Checkboxstudentchecked:false,
      Checkboxteachingchecked:false,
      Checkboxteachertype:false,
      Checkboxteachingtype:false,
      code_notice:false,
      checked_notice:false,
      submitapplications:false,
      RadioGroupvalue:undefined
    })
  }
  educoderlogin=()=>{
    //登录账号
    this.setState({
      isRender:true
    })
    // var url = `/accounts/logout.json`;
    //
    // axios.get((url)).then((result) => {
    //    if(result!==undefined){
    //      // this.setState({
    //      //   isRender:true
    //      // })
    //      window.location.href = "/";
    //    }
    // }).catch((error) => {
    //    console.log(error);
    // })
  }
  educoderloginysl=()=>{
    //退出账号
    // this.setState({
    //   isRender:true
    // })
    // let newTPMsettings=this.props.user&&this.props.user.user_id+'newTPMsettings'
    // let shixunopenprocess=this.props.user&&this.props.user.user_id+'shixunopenprocess'
    // let openopenpublictype=this.props.user&&this.props.user.user_id+'openopenpublictype'
    var url = `/accounts/logout.json`;
    // let storage=window.localStorage;
    axios.get((url)).then((result) => {
      // storage.removeItem(newTPMsettings);
      // storage.removeItem(shixunopenprocess);
      // storage.removeItem( openopenpublictype);
      if(result!==undefined){
        // this.setState({
        //   isRender:true
        // })
				// broadcastChannelPostMessage('refreshPage')
        window.location.href = "/";
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  hideAddcoursestypes=()=>{
    this.setState({
      Addcoursestypes:false
    })
  };
  HideAddcoursestypess=(i)=>{
    console.log("调用了");
    this.setState({
      Addcoursestypes:false,
      mydisplay:true,
      occupation:i,
    })
  };
  ModalCancelsy=()=>{
    this.setState({
      mydisplay:false,
    })
  };


  hidetojoinclass=()=>{
    this.setState({
      tojoinclasstype:false,
      tojoinitemtype:false,
      tojoinclasstitle:undefined,
      rolearr:["",""],
      Checkboxteacherchecked:false,
      Checkboxstudentchecked:false,
      Checkboxteachingchecked:false,
      Checkboxteachertype:false,
      Checkboxteachingtype:false,
      code_notice:false,
      checked_notice:false,
      RadioGroupvalue:undefined
    })
  }

submittojoinclass=(value)=>{
  let {tojoinclasstitle,rolearr,RadioGroupvalue}=this.state;

  if(tojoinclasstitle===undefined){
    this.setState({
      code_notice:true
    })
    return
  }
  let newrolearr=rolearr;
  // if(value===1){
    if(tojoinclasstitle.length<6){
      this.setState({
        code_notice:true
      })
      return
    }
  // }else if(value===0){
  //   if(tojoinclasstitle.length<5){
  //     this.setState({
  //       code_notice:true
  //     })
  //     return
  //   }
  // }
  if(tojoinclasstitle===""||tojoinclasstitle===undefined){
    this.setState({
      code_notice:true
    })
    return
  }else{
    this.setState({
      code_notice:false
    })
  }

  let pamst=[];
  let num=0;
  for(var i = 0 ; i<newrolearr.length;i++){
    if(newrolearr[i]!=""){
      pamst.push(newrolearr[i])
    }else{
      num=num+1
    }
  }

  if(num===2&&value===0){
    this.setState({
      checked_notice:true
    })
    return
  }

  if(value===1&&RadioGroupvalue===undefined){
    this.setState({
      checked_notice:true
    })
    return
  }

  // if(value===0){
  //   let url="/courses/join_course_multi_role.json"
  //   const form = new FormData();
  //   form.append('invite_code', tojoinclasstitle);
  //   form.append('role', pamst);
  //   form.append('type', 1);
  //   axios.post(url,form,[true]
  //   ).then((response) => {
  //     if( response.data.state===0){
  //       this.submitstatevalue(0,"加入成功",response.data.course_id)
  //     }else if( response.data.state===1){
  //     }else if( response.data.state===2){
  //       this.submitstatevalue( 0,"课堂已过期!  请联系课堂管理员重启课堂。(在配置课堂处)")
  //     }else if( response.data.state===3){
  //       this.submitstatevalue( 0,"您已是课堂成员)",response.data.course_id)
  //     }else if( response.data.state===4){
  //       this.submitstatevalue( 0,"您输入的邀请码错误)")
  //     }else if( response.data.state===5){
  //       this.submitstatevalue( 0,"您还未登录")
  //     }else if( response.data.state===6){
  //       this.submitstatevalue( 0,"申请已提交，请等待审核")
  //     }else if( response.data.state===7){
  //       this.submitstatevalue( 0," 您已经发送过申请了，请耐心等待")
  //     }else if( response.data.state===8){
  //       this.submitstatevalue( 0,"您已经是该课堂的教师了",response.data.course_id)
  //     }else if( response.data.state==9){
  //       this.submitstatevalue( 0,"您已经是该课堂的教辅了",response.data.course_id)
  //     }else if( response.data.state==10){
  //       this.submitstatevalue(0,"您已经是该课堂的管理员了",response.data.course_id)
  //     }else if( response.data.state==11){
  //       this.submitstatevalue(0," 该课堂已归档，请联系老师")
  //     }else if( response.data.state==12){
  //       this.submitstatevalue(0,"您已经发送过申请了，请耐心等待师")
  //     }else if( response.data.state==13){
  //       this.submitstatevalue(0,"您申请已提交，请等待审核")
  //     }else if( response.data.state==14){
  //       this.submitstatevalue("此邀请码已停用，请与老师联系")
  //     }else if( response.data.state==15){
  //       this.submitstatevalue(0,"您已是课堂成员! 加入分班请在课堂具体分班页面进行")
  //     }else {
  //       this.submitstatevalue(0," 未知错误，请稍后再试")
  //     }
  //   })
	//
  // }

  if(value===1){
    let url="/project_applies.json"
    // const form = new FormData();
    // form.append('code', tojoinclasstitle);
    // form.append('role', RadioGroupvalue);
    // form.append('type', 1);
    axios.post(url,{
			code:tojoinclasstitle,
			role:RadioGroupvalue
			}
    ).then((response) => {
      if( response.data.status===1){
        this.submitstatevalue(1,"您输入的邀请码错误")
      }else if( response.data.status===2){
        this.submitstatevalue( 1,"您已经是该项目成员",response.data.project)
      }else if( response.data.status===3){
        this.submitstatevalue( 1,"请选择一个角色")
      }else if( response.data.status===4){
        this.submitstatevalue( 1,"您的申请已提交，请等待项目管理员审批")
      }else if( response.data.status===5){
        this.submitstatevalue( 1,"您已经申请加入该项目了，请耐心等待")
      }else if( response.data.status===6){
        this.submitstatevalue( 1,"您已成功加入项目",response.data.project)
      }else if( response.data.status===0){
      	if(RadioGroupvalue==="reporter"){
					this.openNotification("您加入项目成功!");
					window.location.href=`/projects/${response.data.project_id}`;
				}else{
					this.openNotification("您的申请已提交，请等待项目管理员审批!");
				}
			}
    })
  }
	this.hidetojoinclass()
}

  // trialapplications =()=>{
  //   console.log("点击了")
  //   this.setState({
  //     isRenders: true,
  //     showTrial:true,
  //   })
  // }

  // 关闭
  cancelModulationModels = () => {
    this.setState({isRenders: false})
  }

  inputjoinclassvalue=(e)=>{
    console.log(e.target.value.length);
    if(e.target.value.length>=7){
      this.openNotification("请输入6位项目邀请码!");
      return
    }
    this.setState({
      tojoinclasstitle:e.target.value
    })
  }

	showSearchOpen=(e)=>{
  	this.setState({
			showSearchOpentype:true
		})

	}

	hideshowSearchOpen=(e)=>{
  	let {setevaluatinghides}=this.state;
  	 if(setevaluatinghides===true){
			 this.setState({
				 showSearchOpentype:false,
				 setevaluatinghides:false
			 })

		 }
	}

	onKeywordSearchKeyDown = (value) => {
		let url=`/search?value=${value}`;
		this.props.history.push(url)
	}

	onKeywordSearchKeyDowns=()=>{
		this.setState(
			{
				setevaluatinghides:false
			}
		)
	}

	setevaluatinghides=()=>{
  	this.setState(
			{
				setevaluatinghides:true
			}
		)
	}
	//头部获取是否已经登录了
	getUser=(url,type)=>{

		if(type==="projects"){
			if(this.props.user&&this.props.user.email===undefined||this.props.user&&this.props.user.email===null||this.props.user&&this.props.user.email===""){
				this.openNotification("请先绑定邮箱，谢谢");
				return
			}
		}
    // console.log("点击了503")
    // console.log(url);
    let{user} =this.state;

    if(user===undefined){
       this.setState({
         isRender:true
       })
    return
    }

    if(user&&user.login===""){
      this.setState({
        isRender:true
      })
      return;
    }

    if(user&&user.profile_completed===false){
    	this.setState({
				AccountProfiletype:true
			})
			return;
		}


  if(type==="newshixuns"){
    if(this.props&&this.props.current_user&&this.props.current_user.is_shixun_marker===false){
      this.setgoshowqqgtounp(true);
      return;
    }
  }






    if(url !== undefined || url!==""){
      window.location.href = url;
    }


  }

  //修改登录方法
  Modifyloginvalue=()=>{
    this.setState({
      isRender:false,
    })
  }

  hideAccountProfile=()=>{
  	this.setState({
			AccountProfiletype:false
		})
	};
	headtypesonClick=(url,bool)=>{
		this.setState({
			headtypess:url,
			headtypesonClickbool:bool,
		})
	}
	//获取数据为空的时候
	gettablogourlnull = () => {
		this.setState({
			mygetHelmetapi2: undefined
		});
		document.title = "EduCoder";
		var link = document.createElement('link'),
			oldLink = document.getElementById('dynamic-favicon');
		link.id = 'dynamic-favicon';
		link.rel = 'shortcut icon';
		link.href = "/react/build/./favicon.ico";
		if (oldLink) {
			document.head.removeChild(oldLink);
		}
		document.head.appendChild(link);
	};

	//获取数据的时候
	gettablogourldata = (response) => {
		document.title = response.data.setting.name;
		var link = document.createElement('link'),
			oldLink = document.getElementById('dynamic-favicon');
		link.id = 'dynamic-favicon';
		link.rel = 'shortcut icon';
		link.href = '/' + response.data.setting.tab_logo_url;
		if (oldLink) {
			document.head.removeChild(oldLink);
		}
		document.head.appendChild(link);
	}


	handleVisibleChanges = (boll) => {
			this.setState({
				visiblemyss: boll,
			})

	}


	getAppdata=()=>{
		try {
			var chromesettingArray = JSON.parse(localStorage.getItem('chromesetting'));
			var chromesettingresponseArray = JSON.parse(localStorage.getItem('chromesettingresponse'));
			// console.log("NewHeaderNewHeaderNewHeader");
			// console.log(chromesettingArray);
			// console.log(chromesettingresponseArray);

				this.setState({
					mygetHelmetapi2:chromesettingArray
				});
					if (chromesettingArray.tab_logo_url) {
						this.gettablogourldata(chromesettingresponseArray);
					} else {
						this.gettablogourlnull();
					}
		}catch (e) {
			console.log("head获取游览器配置失败 重新请求开始读取配置");
         this.geturlsdata();
		}
	};

	geturlsdata=()=>{
		let url = "/setting.json";
		axios.get(url).then((response) => {
			// console.log("app.js开始请求/setting.json");
			// console.log("获取当前定制信息");
			if(response){
				if(response.data){
					this.setState({
						mygetHelmetapi2:response.data.setting
					});
					localStorage.setItem('chromesetting',JSON.stringify(response.data.setting));
					localStorage.setItem('chromesettingresponse',JSON.stringify(response));
					try {
						if (response.data.setting.tab_logo_url) {
							this.gettablogourldata(response);
						} else {
							this.gettablogourlnull();
						}
					} catch (e) {
						this.gettablogourlnull();
					}


				} else {

					this.gettablogourlnull();

				}

			} else {
				this.gettablogourlnull();

			}

		}).catch((error) => {
			this.gettablogourlnull();

		});
	}


    matchpaths=(url)=>{
      const {match} = this.props;
      if (url=== '/forums'&&match.path === '/forums') {
         return true
        } else if (url.startsWith('/shixuns')&&match.path.startsWith('/shixuns')) {
        return true
        }else if (url.startsWith('/paths')&&match.path.startsWith('/paths')) {
        return true
        } else if (url.startsWith('/courses')&&match.path.startsWith('/courses')) {
        return true
        }else if (url.startsWith('/competitions')&&match.path.startsWith('/competitions')) {
        return true
        }else if (url.startsWith('/crowdsourcing')&&match.path.startsWith('/crowdsourcing')) {
        return true
        }else if(url.startsWith('/moop_cases')&&match.path.startsWith('/moop_cases')){
        return true
        }else if(url.startsWith('/developer')&&match.path.startsWith('/developer')){
        return true
        }else {
        return false
        }
    }


    // 处理弹框
    setgoshowqqgtounp=(bool)=>{
		this.setState({
			goshowqqgtounp:bool
		})
		}
  render() {
    const isLogin = true;   // 这里不会出现未登录的情况，服务端在服务端路由时发现如果是未登录，则跳转到登录页了。
    const {match} = this.props;

    let {Addcoursestypes,
      tojoinitemtype,
      tojoinclasstitle,
      code_notice,
      checked_notice,
			AccountProfiletype,
      submitapplications,
      submitapplicationsvalue,
      user,
      isRender,
			showSearchOpentype,
			headtypesonClickbool,
			headtypess,
			mygetHelmetapi2,
			goshowqqgtounp,
    }=this.state;
    /*
        用户名称  用户头像url
    */
		let activeIndex = false;
		let activeForums = false;
		let activeShixuns = false;
		let activePaths = false;
		let coursestype=false;
		let activePackages=false;
		let activeMoopCases=false;
    let activeCompetitions=false;

		if (match.path === '/forums') {
			activeForums = true;
		} else if (match.path.startsWith('/shixuns')) {
			activeShixuns = true;
		}else if (match.path.startsWith('/paths')) {
			activePaths = true;
		} else if (match.path.startsWith('/courses')) {
			coursestype = true;
		}else if (match.path.startsWith('/crowdsourcing')) {
			activePackages = true;
		}else if(match.path.startsWith('/moop_cases')){
			activeMoopCases =  true;
		}else if(match.path.startsWith('/competitions')){
      activeCompetitions =  true;
    }else {
			activeIndex = true;
		}

    let headtypes='/';

		// console.log("mygetHelmetapi2");
		// console.log(mygetHelmetapi2);
	  if(mygetHelmetapi2) {
      if (mygetHelmetapi2.navbar) {
        if (mygetHelmetapi2.navbar.length > 0) {
          // console.log("mygetHelmetapi2.navbar.length>0====-=-=--=-=-=-=");
          //
          // console.log(match.path);
          if (match.path === '/') {
            if (headtypesonClickbool === false) {
              headtypes = undefined;
            } else {
              headtypes = headtypess;
            }
          } else {
            for (var i = 0; i < mygetHelmetapi2.navbar.length; i++) {
              if (match.path === mygetHelmetapi2.navbar[i].link) {
                headtypes = mygetHelmetapi2.navbar[i].link;
                break;
              }
            }
          }

        }
      }
    }

    // console.log(mygetHelmetapi2);
		// console.log("NewHeadermygetHelmetapi123123123123");

		let shixuntype=false;
		let pathstype=false;
		let coursestypes=false;
		if(this.props&&this.props.mygetHelmetapi!=null){
			let shixun="/shixuns";
			let paths="/paths";
			let courses="/courses";
			this.props.mygetHelmetapi.navbar.map((item,key)=>{
				var reg = RegExp(item.link);
				if(shixun.match(reg)){
					if(item.hidden===true){
						shixuntype=true
					}
				}
				if(paths.match(reg)){
					if(item.hidden===true){
						pathstype=true
					}
				}
				if(courses.match(reg)){
					if(item.hidden===true){
						coursestypes=true
					}
				}
			})
		}

		const contents = (
			<div  className="questiontypes"  style={{
				width:'93px',
				height:'80px',
			}}>
				<a href={'/question'}  ><p className="questiontype">试题库</p></a>
				<p className="questiontypeheng"></p>
				<a href={'/paperlibrary'}  ><p className="questiontype">试卷库</p></a>
				<p className="questiontypeheng"></p>
			</div>
		);
    return (

      <div className="newHeaders" id="nHeader"  >
				<style>{
					`
					 body .questionbanks .ant-popover-inner-content {
						 padding:0px !important;
					 }
					`
				}</style>

				{isRender===true?<LoginDialog
               Modifyloginvalue={()=>this.Modifyloginvalue()}
                  {...this.props}
                  {...this.state}
              />:""}

				{AccountProfiletype===true?<AccountProfile
					hideAccountProfile={()=>this.hideAccountProfile()}
					{...this.props}
					{...this.state}
				/>:""}

				{
					goshowqqgtounp===true?
						<GotoQQgroup {...this.state} {...this.props} setgoshowqqgtounp={(bool)=>this.setgoshowqqgtounp(bool)}></GotoQQgroup>
						:
						""
				}

				<a href={"/"} onClick={()=>this.headtypesonClick("/",false)} className={"fl mr30 ml25 mt10"}>
          {
						mygetHelmetapi2 === null ?
							""
							:
							mygetHelmetapi2===undefined||mygetHelmetapi2.nav_logo_url===null||mygetHelmetapi2.nav_logo_url===undefined?
								<img alt="高校智能化教学与实训平台" className="logoimg" style={{heigth:"40px"}} src={getImageUrl("images/educoder/headNavLogo.png?1526520218")}></img>
								:
								<img alt="高校智能化教学与实训平台" className="logoimg" style={{heigth:"40px"}} src={getImageUrl(mygetHelmetapi2.nav_logo_url)}></img>
          }
				</a>

				<style>
					{
						`
						.educontents{
							margin: 0px auto;
							box-sizing: border-box;

						}
						`
					}
				</style>
					{
						mygetHelmetapi2 === null ?
							"" :
							mygetHelmetapi2!==undefined&&mygetHelmetapi2.navbar!==null&&mygetHelmetapi2.navbar!==undefined&&mygetHelmetapi2.navbar.length>0?
								<div className="head-nav pr" id={"head-navpre1"}>
									<ul id="header-nav">
										{/*<li className={`${activeIndex === true ? 'active' : ''}`}><a href="/">首页</a></li>*/}
										{/*<li><a href={this.props.Headertop===undefined?"":this.props.Headertop.shixun_paths_url}>实训路径</a></li>*/}
										{
											mygetHelmetapi2.navbar && mygetHelmetapi2.navbar.map((item,key)=>{
												// console.log("headtypes");
												// console.log(headtypes);hidden
												var str=new RegExp("http");
												var strbool=false;
												//test方法返回值为(true或者false)
												if(item.link){
													if(str.test(item.link)===true){
														strbool=true
													}else{
														strbool=false
													}
												}
												// console.log(item.hidden);
												return(
													<li key={key} onClick={()=>this.headtypesonClick(item.link,true)} className={`${this.matchpaths(item.link)===true?'pr active':'pr'}`} style={item.hidden==false?{display: 'block'}:{display: 'none'}}>
														{
															strbool===true?
																<a href={item.link}>{item.name}</a>
																:
																<Link to={item.link}>{item.name}</Link>
														}
													</li>
												)
											})
										}
										<style>
											{
												`
												.queyppors {
                       top: 63px !important;
                        }

											 .questionbanks .ant-popover-inner-content {
											 padding:0px !important;
											 }
												`
											}
										</style>
										{/*<li className={`pr  questionbanks`}>*/}
										{/*	<Popover   placement="bottom"  content={contents} trigger="click" >*/}
										{/*		<div className=" sortinxdirection mr10">*/}
										{/*			<div style={{*/}
										{/*				color:"#fff"*/}
										{/*			}}>*/}
										{/*				题库*/}
										{/*			</div>*/}
										{/*		</div>*/}
										{/*	</Popover>*/}
										{/*</li>*/}

										<li
											style={{display: this.props.Headertop === undefined ? 'none' : this.props.Headertop.auth === null ? 'none' : 'block'}}
										><a href={this.props.Headertop === undefined ? "" : this.props.Headertop.auth}>工程认证</a></li>

										<li className="fl edu-menu-panel  careershover "
												style={{display: this.props.Headertop === undefined ?'none'  : this.props.Headertop.career_url.length > 0 ? 'block' : 'none'}}>
											<a>职业路径</a>
											<div
												style={{display: this.props.Headertop === undefined ?'none'  : this.props.Headertop.career_url.length > 0 ? 'block' : 'none'}}>
												<ul className="edu-menu-list edu-menu-listnew " style={{top:'60px'}}>
													{this.props.Headertop === undefined ? "" : this.props.Headertop.career_url.map((item, key) => {
														return(
															<li key={key}><i className="iconfont icon-java left careersiconfont"
																							 style={{color: '#000 important'}}
															></i><a style={{width: '83%'}}
																			href={item.url}>{item.name}</a></li>
														)
													})
													}
												</ul>
											</div>
										</li>
                    <li><Link to={`/projects`}>开源项目</Link></li>
                  </ul>
								</div>
								:
								<div className="head-nav pr" id={"head-navpre3"}>

									<ul id="header-nav">
										{/*<li className={`${activeIndex === true ? 'active' : ''}`}><a href="/">首页</a></li>*/}

										{/*<li><a href={this.props.Headertop===undefined?"":this.props.Headertop.shixun_paths_url}>实训路径</a></li>*/}
										<li className={`${activePaths === true ? 'pr active' : 'pr'}`}>
											<Link to={this.props.Headertop===undefined?"":'/paths'}>实践课程</Link>
										</li>

										{/*<li><a href={this.props.Headertop===undefined?"":'/courses'}>课堂</a></li>*/}
										<li className={`${coursestype === true ? 'pr active' : 'pr'}`}>
											{/*<a href={this.props.Headertop===undefined?"":this.props.Headertop.course_url}>课堂</a>*/}
											<Link to={this.props.Headertop===undefined?"":'/courses'}>翻转课堂</Link>
										</li>
										<li className={`${activeShixuns === true ? 'pr active' : 'pr'}`}>
											<Link to="/shixuns">实训项目</Link>
											{/*<img src={getImageUrl("images/educoder/hot-h.png")} className="nav-img">*/}
											{/*</img>*/}
										</li>

										<li className="fl edu-menu-panel  careershover "
												style={{display: this.props.Headertop === undefined ?'none'  : this.props.Headertop.career_url.length > 0 ? 'block' : 'none'}}>
											<a>职业路径</a>
											<div
												style={{display: this.props.Headertop === undefined ?'none'  : this.props.Headertop.career_url.length > 0 ? 'block' : 'none'}}>
												<ul className="edu-menu-list edu-menu-listnew " style={{top:'60px'}}>
													{this.props.Headertop === undefined ? "" : this.props.Headertop.career_url.map((item, key) => {
														return(
															<li key={key}><i className="iconfont icon-java left careersiconfont"
																							 style={{color: '#000 important'}}
															></i><a style={{width: '83%'}}
																			href={item.url}>{item.name}</a></li>
														)
													})
													}
												</ul>
											</div>
										</li>

										{/*<li className=""><a href={"/libraries"}>教学案例</a></li>*/}
										<li className={`${activeCompetitions === true ? 'pr active' : 'pr'}`}>
											<a href={this.props.Headertop===undefined?"":this.props.Headertop.competitions_url}>在线竞赛</a>
											{/*<img className="roundedRectangles"*/}
											{/*		 src={require('./roundedRectangle.png')}*/}
											{/*/>*/}
										</li>
										<li className={`${activeMoopCases === true ? 'pr active' : 'pr'}`}> <Link to={`/moop_cases`}>教学案例</Link></li>
										{/*<li className={`${activePackages === true ? 'pr active' : 'pr'}`}>*/}
										{/*<Link to={'/crowdsourcing'}>众包创新</Link>*/}
										{/*</li>*/}
										<li className={`${activeForums === true ? 'active' : ''}`}>	<Link to={this.props.Headertop===undefined?"":this.props.Headertop.topic_url}>交流问答</Link></li>
										<li
											style={{display: this.props.Headertop === undefined ? 'none'  : this.props.Headertop.auth===null? 'none' : 'block'}}
										><a href={this.props.Headertop===undefined?"":this.props.Headertop.auth}>工程认证</a></li>
									</ul>
								</div>
					}






				<style>
					{
						`
            .posi-searchs{
            opacity: 1;
            position: absolute;
            top: -2px;
            background: #fff;
            z-index:10000;
            right: 185px;
            }
								`
					}
				</style>
				<div className="posi-searchs"  >
					<div className="search-all clearfix">
						{/*<!--<a href="javascript:void(0)" className="search-clear fl" onclick="closeSearch();">×</a>-->*/}
						<div className="fl pr search-clear edu-menu-panel" style={{display: 'none'}}>
							<input type="hidden" id="search_type" value="1"></input>
							<span className="searchkey">实训</span>
							<i className="fa fa-angle-down ml5 font-16"></i>
							<ul id="searchkey" className="edu-menu-list edu-txt-center" style={{minWidth: '80px',right: '-10px',top: '50px'}}>
								<li><a>实训</a></li>
								<li><a>课堂</a></li>
								<li><a>用户</a></li>
							</ul>
						</div>
						{/*<input type="text" className="search-input fl" id="search-input" */}
						{/*onKeyDown={this.onKeywordSearchKeyDown} name="search_keyword" placeholder="搜索实训项目"/>*/}
						{/*搜索框*/}
						{showSearchOpentype===true?<div
							className={"HeaderSearch"}
							onBlur={(e)=>this.hideshowSearchOpen(e)}	onMouseLeave={()=>this.setevaluatinghides()}>
							<Search
								id={"HeaderSearchs"}
								placeholder="实践课程/翻转课堂/实训项目/交流问答"
								onInput={()=>this.onKeywordSearchKeyDowns()}
								onSearch={(value) => this.onKeywordSearchKeyDown(value)}
								// onPressEnter={this.onKeywordSearchKeyDown}
								style={{ width: 300,height:32}}
								autoFocus={true}
							/>
						</div>:""}

						{/*<a className="search-icon fl" id="header_keyword_search" onClick={this.onKeywordSearch}>*/}
						{/*/!*<i className="fa fa-search font-16 mt23 color-grey-6"></i>*!/*/}
						{/*<i className="iconfont icon-sousuo color-blue"></i>*/}

						{/*</a>*/}
						{/* TODO 需要服务端接口提供最近搜索
                            <div className="search-content none" style="width: 86%;left:  0px;">
                              <div className="search-title">最近搜索</div>
                                  <div><a href="javascript:void(0)" className="search_history">绿盟</a></div>
                                  <div><a href="javascript:void(0)" className="search_history">qwe</a></div>
                            </div>*/}
					</div>
				</div>

          {/*<span className="font-15 fr mt17">
			      	<%= link_to '登录', signin_path, :className => "mr5" %>
			      	<em className="vertical-line"></em>
			      	<%= link_to '注册', user_join_path, :className => "ml5" %>
			    </span>*/}
          { user===undefined?
            <span className="font-15 fr mt17 ml5 mr25">
                <a onClick={()=>this.educoderlogin()}  className="mr5 color-white">登录</a>
                <em className="vertical-line"></em>
                <a href={"/register"} className="mr5 color-white">注册</a>
            </span> :user.login===""?<span className="font-15 fr mt17 ml5 mr25">
                <a onClick={()=>this.educoderlogin()}  className="mr5 color-white">登录</a>
                <em className="vertical-line"></em>
                <a href={"/register"} className="mr5 color-white">注册</a>
            </span>:
            <div className="fr edu-menu-panel mr25" style={{height:'60px'}}>
              <a href={`/users/${this.props.current_user===undefined?"":this.props.current_user.login}/courses`} className="fl ml15">
                <img alt="头像" className="radius mt13" height="34" id="nh_user_logo" name="avatar_image"
                     src={getImageUrl(`images/`+user.image_url)} width="34">
                </img>
              </a>
              <ul className="edu-menu-list" style={{top:'60px'}}>
                {/*<span className="bor-bottom-greyE currentName task-hide">{user.username}</span>*/}
								<li><Link to={`/users/${this.props.current_user.login}/courses`}>我的个人主页</Link></li>
								{coursestypes===true?"":<li><Link to={`/users/${this.props.current_user===undefined?"":this.props.current_user.login}/courses`}>{this.props.user&&this.props.user.main_site===false?"我的课堂":"我的翻转课堂"}</Link></li>}
                {/* p 老师  l 学生 */}
								{shixuntype===true?"":<li><Link to={`/users/${this.props.current_user===undefined?"":this.props.current_user.login}/shixuns`}>我的实训项目</Link></li>}
								{pathstype===true?"":<li><Link to={`/users/${this.props.current_user===undefined?"":this.props.current_user.login}/paths`}>{this.props.user&&this.props.user.main_site===false?"我的课程":"我的实践课程"}</Link></li>}
								{this.props.user&&this.props.user.main_site===true?<li><Link to={`/users/${this.props.current_user===undefined?"":this.props.current_user.login}/projects`}>我的开发项目</Link></li>:""}
								{/*<li><Link to={`/users/${this.props.current_user===undefined?"":this.props.current_user.login}/package`}>我的众包</Link></li>*/}
								<li style={{display: this.props.Headertop === undefined ? 'none'  : this.props.Headertop.customer_management_url===null || this.props.Headertop.customer_management_url===""? 'none' : 'block'}}>
									<a href={this.props.Headertop === undefined ? ''  : this.props.Headertop.customer_management_url}>客户管理</a>
								</li>
                {
                  this.props.Headertop && this.props.Headertop.college_identifier &&
                  <li><a href={`/colleges/${this.props.Headertop.college_identifier}/statistics`}>学院统计</a></li>
                }
                {
                  this.props.Headertop && this.props.Headertop.laboratory_user &&
                  <li><a href={this.props.Headertop.laboratory_admin_url}>后台管理</a></li>
                }

                <li><a href={`/account/profile`}>账号管理</a></li>
                {/*<li><a onClick={()=>this.educoderlogin()} >登入测试接口</a></li>*/}
                {/*<li><a onClick={()=>this.trialapplications()} >试用申请</a> </li>*/}
                {/*<li><Link to={`/interest`}>兴趣页</Link></li>*/}

								<li className="bor-top-greyE">

									{/*<a onClick={()=>this.educoderlogin()} >登录</a>*/}
                  <a  onClick={()=>this.educoderloginysl()}>退出</a>

                </li>
              </ul>
            </div>
         }
          {/*href="https://www.educoder.net/login"*/}
         <div className="fr head-right">
            {/*{ loadHeader()}*/}
					 {showSearchOpentype===true?"":this.props.user&&this.props.user.main_site===true?<a id="search-open" className="fl mr30 headIcon" onClick={(e)=>this.showSearchOpen(e)}>
              {/*"/images/educoder/icon/search.svg"
                             <img src={getImageUrl(`images/educoder/icon/search.svg`)} /> */}

              <i className="iconfont icon-sousuo color-white"></i>
            </a>:""}

            {/*</div>*/}
            <div className="fl mr30 edu-menu-panel headIcon">


              <i className="iconfont icon-tianjiafangda color-white"></i>

              <div className="edu-menu-list"  style={{top: '60px',width:"240px"}}>
                <div className="overPart"></div>
                <ul className={coursestypes===true&&this.props.user&&this.props.user.main_site===false?"fl headwith100b edu-txt-center pr ul-leftline":"fl with50 edu-txt-center pr ul-leftline"}>
									{this.props.current_user&&this.props.current_user.user_identity==="学生"?"":coursestypes===false?
										<li><a  onClick={(url)=>this.getUser("/courses/new")}>{this.props.user&&this.props.user.main_site===false?"新建课堂":"新建翻转课堂"}</a></li>:""
									}
									{shixuntype===true?"":
										<li><a onClick={(url)=>this.getUser("/shixuns/new","newshixuns")}>新建实训项目</a></li>
									}
                  {this.props.user&&this.props.user.main_site===false?"":this.props.Headertop===undefined?"":<li><a onClick={(url)=>this.getUser("/paths/new")} >新建实践课程</a></li>}
                  {this.props.user&&this.props.user.main_site===true?"":this.props.Headertop===undefined?"":
                    pathstype===true?"":this.props.user&&this.props.user.admin===true||this.props.user&&this.props.user.is_teacher===true||this.props.user&&this.props.user.business===true?<li><a onClick={(url)=>this.getUser("/paths/new")} >新建实践课程</a></li>:""
                  }
									{this.props.user&&this.props.user.main_site===true?<li><a onClick={(url)=>this.getUser("/projects/new","projects")} target="_blank">新建开发项目</a></li>:""}
                </ul>
								{coursestypes===true&&this.props.user&&this.props.user.main_site===false?"":<ul className="fl with50 edu-txt-center">

                  {coursestypes===true?"":<li>
                    <a onClick={this.tojoinclass}>{this.props.user&&this.props.user.main_site===false?"加入课堂":"加入翻转课堂"}</a>
                  </li>}

                  {Addcoursestypes===true?<Addcourses
                   Addcoursestype={Addcoursestypes}
                   hideAddcoursestype={this.hideAddcoursestypes}
                   HideAddcoursestypess={(i)=>this.HideAddcoursestypess(i)}
                 />:""}
                  <Certifiedprofessional {...this.props} {...this.state}  ModalCancelsy={this.ModalCancelsy}/>


                  {/*  /courses/join_course_multi_role */}
									{this.props.user&&this.props.user.main_site===true?<li>
                  <a onClick={this.tojoinitem}>加入开发项目</a>
                  </li>:""}
									{tojoinitemtype===true?<Modal
                    keyboard={false}
                    title="加入项目"
                    visible={tojoinitemtype}
                    closable={false}
                    footer={null}
                  >
                    <div className="task_popup_con">
                      <div className="mr15">
                        <ul>
                          <li className="clearfix mb10">
                            <label className="panel-form-label fl">项目邀请码：</label>
                            <Input type="text" className="input-60-40 fl mt5" name="invite_code"
																	 style={{width: '275px'}}
                                   placeholder="请输入6位开发项目邀请码" value={tojoinclasstitle} onInput={this.inputjoinclassvalue}/>
                          </li>

                          <p id="none_invite_code_notice"
                             className="color-orange none f12"
                             style={{marginLeft: '90px',display:code_notice===true?'block':"none"}}>请输入6位项目邀请码</p>

                          <li className="clearfix ">

                            <label className="panel-form-label fl">身份：</label>
                            <RadioGroup className="mt10" onChange={this.onChangeRadioGroup}>
                              <Radio value={"manager"}>管理人员</Radio>
                              <Radio value={"developer"}>开发人员</Radio>
                              <Radio value={"reporter"}>报告人员</Radio>
                            </RadioGroup>

                          </li>

                          <p id="none_checked_notice" className="color-orange none f12"
                             style={{marginLeft: '90px',display:checked_notice===true?'block':"none"}}>请选择一个身份</p>

                          <li className="clearfix mt10 edu-txt-center">
                            <a className="task-btn mr10"
                               onClick={()=>this.hidetojoinclass(1)}>取消</a>
                            <a
                              className="task-btn task-btn-orange ml20"
                              onClick={()=>this.submittojoinclass(1)}>确定</a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </Modal>:""}
                </ul>}
              </div>
            </div>

					 {this.props.user&&this.props.user.main_site===true? <div className="fl mr30 edu-menu-panel headIcon">
              { user===undefined?"":user.login===""?"": <a
                href={`/messages/${user.login}/user_tidings`}
                style={{position:'relative'}}
              >
                <i className="iconfont icon-xiaoxilingdang color-white"></i>
                <span className="newslight" style={{display:this.props.Headertop===undefined?"none":this.props.Headertop.new_message===true?"block":"none"}}>
                              {/*{this.props.Headertop===undefined?"":this.props.Headertop.unread_message_count > 99 ? '99+'*/}
                  {/*: this.props.Headertop===undefined?"":this.props.Headertop.unread_message_count}*/}
                </span>
              </a>
              }

            </div>:""}

            <Modal
              keyboard={false}
              title="提示"
              visible={submitapplications}
              closable={false}
              footer={null}
            >
              <div className="task_popup_con  ml30">
                <div className="mr15">
                  <ul>
                    <div className="task-popup-content">
                      <p className="task-popup-text-center font-16">
                        {submitapplicationsvalue}
                      </p>
                    </div>
                    <li className="clearfix mt10 edu-txt-center">
                      <a className="task-btn mr10"
                         onClick={this.hidesubmitapplications}>取消</a>
                      <a
                        className="task-btn task-btn-orange ml20"
                        onClick={this.submitsubmitapplications}>确定</a>
                    </li>

                  </ul>
                </div>
              </div>
            </Modal>

          </div>

      </div>

    );
  }
}

export default NewHeader;

