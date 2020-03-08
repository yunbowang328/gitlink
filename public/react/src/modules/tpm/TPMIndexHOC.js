import React, { Component } from 'react';

import PropTypes from 'prop-types';

import NewHeader from './NewHeader'
import NewFooter from './NewFooter'
import SiderBar from './SiderBar'
import { getUrl, downloadFile } from 'educoder'
import axios from 'axios';
import { Spin } from 'antd';
import './TPMIndex.css';
import LoginDialog from '../login/LoginDialog';
import AccountProfile from '../user/AccountProfile';
import AccountPhoneemail from '../user/AccountPhoneemail';
import Trialapplication from "../login/Trialapplication";
// import "antd/dist/antd.css";
// import '../../css/educoder/edu-common.css'
// import '../../css/educoder/edu-all.css'
// import '../../css/educoder/edu-main.css'

const $ = window.$;
const versionNum = '0001';
// let _url_origin = getUrl()
let _url_origin='';
if(window.location.port === "3007"){
	_url_origin="https://test-newweb.educoder.net";
}

// let _url_origin=`https://www.educoder.net`;

if (!window['indexHOCLoaded']) {
  window.indexHOCLoaded = true;
  //解决首屏加载问题

  // $('head').append($('<link rel="stylesheet" type="text/css" />')
  //     .attr('href', `${_url_origin}/stylesheets/educoder/antd.min.css?1525440977`));
  $('head').append($('<link rel="stylesheet" type="text/css" />')
      .attr('href', `${_url_origin}/stylesheets/css/edu-common.css?3`));

  $('head').append($('<link rel="stylesheet" type="text/css" />')
      .attr('href', `${_url_origin}/stylesheets/educoder/edu-main.css?3`));

  // index.html有加载
	$('head').append($('<link rel="stylesheet" type="text/css" />')
		.attr('href', `${_url_origin}/stylesheets/educoder/edu-all.css?3`));


  // $('head').append($('<link rel="stylesheet" type="text/css" />')
  //       .attr('href', `${_url_origin}/stylesheets/educoder/css_min_all.css?1525440977`));
  // 加timeout 为了覆盖掉antd的样式
  // setTimeout(() => {
  //   $('head').append( $('<link rel="stylesheet" type="text/css" />')
  //     .attr('href', `${_url_origin}/stylesheets/css/edu-common.css?1525440977`) );

  //   $('head').append( $('<link rel="stylesheet" type="text/css" />')
  //     .attr('href', `${_url_origin}/stylesheets/educoder/edu-all.css?1525440977`) );
  //   $('head').append( $('<link rel="stylesheet" type="text/css" />')
  //     .attr('href', `${_url_origin}/stylesheets/educoder/edu-main.css?1525440977`) );
  // }, 1000);

  $("script").append('<script></script>')
    .attr('src', `${_url_origin}/javascripts/jquery-1.8.3-ui-1.9.2-ujs-2.0.3.js?_t=${versionNum}`);

}
  // `${_url_origin}/javascripts/jquery-1.8.3-ui-1.9.2-ujs-2.0.3.js?_t=${versionNum}`
// TODO css加载完成后再打开页面，行为和tpm其他页面一致
export function TPMIndexHOC(WrappedComponent) {
	// 这里如果extends WrappedComponent 会出现 WrappedComponent mount twice的问题
  	return class II extends React.Component {
	    constructor(props) {
	      super(props)
        window.$('#root').css('position', 'relative')

	      this.state = {
            tpmLoading: true,
            resLoading: true,
            Headertop:undefined,
            Footerdown:undefined,
            coursedata: {},

            isRender: false,
            AccountProfiletype: false,
				  	AccountPhoneemailtype:false,
            globalLoading: false,
					  dataquerys:{},
					  isloginCancel:undefined,
					mygetHelmetapi: null,
	      }
	    }

      // header里面需要有user
      initCommonState(user) {
        // 更新头像后，需要改变参数，不然会被图片缓存影响到  --> 后台已加 ?t=${new Date().getTime()
        const newUser = Object.assign({}, {...user}, { image_url: `${user.image_url}`});
        this.setState({
          user: newUser,
          current_user: newUser
        })
      }
      showShixun = () => {
        const { shixunId } = this.props.match.params
        const url = `/api/v1/shixuns/${shixunId}/show_shixun`

        this.setState({ tpmLoading: true })
        axios.get(url,
            {
              withCredentials: true
            }
          ).then((response) => {
            if (response.data && response.data.shixun) {
              this.initCommonState(response.data.current_user)
              response.data.tpmLoading = false;
              this.setState(response.data);
            }

          }).catch((error) => {
            console.log(error)
          })
      }
      aboutFocus = () => {
        const { creator, watched } = this.state
        /*http://localhost:3000/api/v1/users/155/watch?object_id=156&object_type=user*/

        const focusUrl = `/api/v1/users/${creator.owner_id}/${watched ? 'unwatch' : 'watch'}?object_id=${creator.owner_id}&object_type=user`

        axios.get(focusUrl,{
        })
        .then((response) => {
            const status = response.data.status;
            if(status == 1){
                const new_author_info = Object.assign({}, creator)
                this.setState({
                  watched: !watched
                })
            }
        }).catch((error) => {
            console.log(error)
        })
      }

      keyupListener = (e) => {
        if (e.key === "Escape") {
          this.setState({ globalLoading: false })
        }
      }
      componentWillUnmount() {
        window.removeEventListener('keyup', this.keyupListener)
      }

	    componentDidMount() {
	    	// console.log("TPMIndexHOC========");
	    	// console.log(this.props);
        window.addEventListener('keyup', this.keyupListener)

	        if(this.props.match.path==="/"){
              // document.title="创新源于实践";
            }else if(this.props.match.path==="/403"){
	        	 document.title="你没有权限访问";
            }else if(this.props.match.path==="/nopage"){
            document.title="没有找到该页面";
            }else if(this.props.match.path==="/shixuns"){
	        	 document.title="实训项目";
            }else if(this.props.match.path==="/paths"){
            document.title="实践课程";
            }else if(this.props.match.path==="/courses"){
            document.title="翻转课堂";
          }

				// if(this.props.match.path==="/"){
				// 	document.title="EduCoder-IT实践教学平台_信息技术类精品课程网_大学生MOOC平台";
				// }else if(this.props.match.path==="/403"){
				// 	document.title="你没有权限访问";
				// }else if(this.props.match.path==="/nopage"){
				// 	document.title="没有找到该页面";
				// }else if(this.props.match.path==="/shixuns"){
				// 	document.title="EduCoder-IT实践教学平台_信息技术类精品课程网_大学生MOOC平台";
				// }else if(this.props.match.path==="/paths"){
				// 	document.title="实践课程_项目实战开发_web前端开发实训_web后端开发实战_人工智能技术-EduCoder";
				// }else if(this.props.match.path==="/courses"){
				// 	document.title="实训项目_php后端开发_app前端开发_java_python实训_C语言入门课程-EduCoder";
				// }else if(this.props.match.path==="/competitions"){
				// 	document.title="在线竞赛_计算机应用大赛_编程大赛_大学生设计大赛_全国高校绿色计算大赛-EduCoder";
				// }else if(this.props.match.path==="/moop_cases"){
				// 	document.title="教学案例-EduCoder";
				// }else if(this.props.match.path==="/forums"){
				// 	document.title="交流问答-EduCoder";
				// }else if(this.props.match.path==="/forums"){
				// 	document.title="交流问答-EduCoder";
				// }

        $.ajaxSetup({
	        cache: true
	      });

        //帮助后台传参数
				const query = this.props.location.search;
				// const type = query.split('?chinaoocTimestamp=');
				// console.log("Eduinforms12345");
				// console.log(this.foo(query));
				// console.log(JSON.stringify(this.foo(query)));
				var dataqueryss={}
				try {
					var foqus=this.foo(query);
					if(JSON.stringify(foqus) ==="{}"){
						this.setState({
							dataquerys:{},
						});
					}else{
						this.setState({
							dataquerys:foqus,
						});
						dataqueryss=foqus;
					}
				}catch (e) {
					this.setState({
						dataquerys:{},
					})
				}
        this.fetchUsers(dataqueryss);

            let url=`/users/get_navigation_info.json`;
            axios.get(url, {

            }).then((response) => {
            	    // console.log("开始请求/get_navigation_info.json");
            	    // console.log(response);
                  if(response!=undefined){
                    if(response.status===200){
                      this.setState({
                        Headertop:response.data.top,
                        Footerdown:response.data.down
                      })
                    }
                  }
                });
       ///请求定制化的信息
       this.getAppdata();
      }
      /**
        课堂权限相关方法，暂时写这里了 ----------------------------------------START
        ADMIN = 0       # 超级管理员
        CREATOR = 1     # 课程创建者
        PROFESSOR = 2     # 课程老师
        ASSISTANT_PROFESSOR = 3  # 课程助教
        STUDENT = 4     # 学生
        NORMAL = 5      # 普通用户

        v2
        # 课程权限判断
        ADMIN = 0       # 超级管理员
        BUSINESS = 1    # 运营人员
        CREATOR = 2     # 课程创建者   课堂管理员
        PROFESSOR = 3     # 课程老师
        ASSISTANT_PROFESSOR = 4  # 课程助教
        STUDENT = 5     # 学生
        NORMAL = 6      # 普通用户
        Anonymous = 7      # 普未登录
      */
      //超管0
      isSuperAdmin = () => {
        // return false
        return this.state.coursedata&&this.state.coursedata.course_identity === 0
      }
      isCourseAdmin = () => {
        return this.state.coursedata&&this.state.coursedata.course_identity === 2
      }
			//超管、运维0-1
			isClassManagement = () => {
				return  this.state.coursedata&&this.state.coursedata.course_identity < 2
			}
			//超管、运维、课堂管理0-2
      isAdminOrCreator = () => {
        return  this.state.coursedata&&this.state.coursedata.course_identity < 3
      }
			//超管、运维、课堂管理、老师0-3
      isAdminOrTeacher = () => {
        return this.state.coursedata&&this.state.coursedata.course_identity < 4
      }
      // 超管、运维、课堂管理、老师、助教0-4
      isAdmin = () => {
        return this.state.coursedata&&this.state.coursedata.course_identity < 5
      }
      // 学生5
      isStudent = () => {
        return this.state.coursedata&&this.state.coursedata.course_identity === 5
      }
			// 超管、运维、课堂管理、老师、助教、学生0-5
      isAdminOrStudent = () => {
        return this.state.coursedata&&this.state.coursedata.course_identity <= 5
      }
			// 游客未登录/非课堂成员6>
      isNotMember = () => {
        return this.state.coursedata&&this.state.coursedata.course_identity >= 6
      }
      //课堂是否已结束
      isCourseEnd = () => {
        return this.state.current_user ? this.state.current_user.course_is_end : false
      }

      // setTrialapplication = ()=>{
      //     this.setState({
      //       isRenders:true
      //     })
      //
      // }

			//获取数据为空的时候
			gettablogourlnull = () => {
				this.setState({
					mygetHelmetapi: undefined
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
			//获取当前定制信息
			getAppdata = () => {
				try {
					var chromesettingArray = JSON.parse(localStorage.getItem('chromesetting'));
					var chromesettingresponseArray = JSON.parse(localStorage.getItem('chromesettingresponse'));
					// console.log("TPMLNdexHOC");
					// console.log(chromesettingArray);
					// console.log(chromesettingresponseArray);
						this.setState({
							mygetHelmetapi:chromesettingArray
						});
							if (chromesettingArray.tab_logo_url) {
								this.gettablogourldata(chromesettingresponseArray);
							} else {
								this.gettablogourlnull();
							}
				}catch (e) {
					console.log("hoc获取游览器配置失败 重新请求开始读取配置");
          this.getAppdatausr();
				}

			};
			getAppdatausr=()=>{
				let url = "/setting.json";
				axios.get(url).then((response) => {
					// console.log("app.js开始请求/setting.json");
					// console.log("获取当前定制信息");
					if (response) {
						if (response.data) {
							this.setState({
								mygetHelmetapi: response.data.setting
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

      fetchUser = () => {
        let url = `/users/get_user_info.json`
        let courseId;
        let query = this.props.location.pathname;
        const type = query.split('/');
        if (type[1] == 'courses' && type[2]) {
          courseId = parseInt(type[2])
          // url += `?course_id=${courseId}`
        }
				var datay={};
				if(JSON.stringify(this.state.dataquerys) ==="{}"){
					datay={
						course_id:isNaN(courseId)?undefined:courseId,
						school:1
					}
				}else{
					datay={
						course_id:isNaN(courseId)?undefined:courseId,
						school:1,
						chinaoocTimestamp:this.state.dataquerys.chinaoocTimestamp,
						websiteName:this.state.dataquerys.websiteName,
						chinaoocKey:this.state.dataquerys.chinaoocKey,
					}
				}
        axios.get(url,{params:
							datay
        },
            {
              // withCredentials: true
            }
          ).then((response) => {
            /*
              {
                  "username": "黄井泉",
                  "login": "Hjqreturn",
                  "user_id": 12,
                  "image_url": "avatar/User/12",
                  "admin": true,
                  "is_teacher": false,
                  "tidding_count": 0
              }
            */
            if(response=== undefined){
            	return
						}
            if (response.data) {
              this.initCommonState(response.data)
              this.setState({
                tpmLoading: false,
                coursedata: {
                  course_identity: response.data.course_identity >= 0 ? response.data.course_identity : undefined,
                  course_public: response.data.course_public,
                  name: response.data.course_name,
                  userid:response.data.user_id
                },

               })

            }

          }).catch((error) => {
            console.log(error)
          })
      };
			fetchUsers = (yslurlobject) => {
				let url = `/users/get_user_info.json`
				let courseId;
				let query = this.props.location.pathname;
				const type = query.split('/');
				if (type[1] == 'courses' && type[2]) {
					courseId = parseInt(type[2])
					// url += `?course_id=${courseId}`
				}
				var datay={};
				if(JSON.stringify(yslurlobject) ==="{}"){
					  datay={
							course_id:isNaN(courseId)?undefined:courseId,
							school:1
						}
				}else{
					datay={
						course_id:isNaN(courseId)?undefined:courseId,
						school:1,
						chinaoocTimestamp:yslurlobject.chinaoocTimestamp,
						websiteName:yslurlobject.websiteName,
						chinaoocKey:yslurlobject.chinaoocKey,
					}
				}
				axios.get(url,{params:
							datay
					},
					{
						// withCredentials: true
					}
				).then((response) => {
					/*
						{
								"username": "黄井泉",
								"login": "Hjqreturn",
								"user_id": 12,
								"image_url": "avatar/User/12",
								"admin": true,
								"is_teacher": false,
								"tidding_count": 0
						}
					*/
					if(response=== undefined){
						return
					}
					if (response.data) {
						this.initCommonState(response.data)
						this.setState({
							tpmLoading: false,
							coursedata: {
								course_identity: response.data.course_identity >= 0 ? response.data.course_identity : undefined,
								course_public: response.data.course_public,
								name: response.data.course_name,
								userid:response.data.user_id
							},

						})

					}

				}).catch((error) => {
					console.log(error)
				})
			};
			//截取url 数据的
			foo=(url)=> {
				var json = {};
				var regExp = /[\?\&](\w+)(=?)(\w*)/g;
				var arr;
				do {
					arr = regExp.exec(url);
					// console.log(arr); // arr = [完整的字符串, key, 等号或'', value或'']

					if (arr) {
						var key = arr[1];
						var value = arr[3];
						// arr[2] === ''时, value = undefined
						if (!arr[2])
							value = undefined;

						json[key] = value;
					}
				} while (arr);

				return json;
			};
      hideLoginDialog = () => {
        this.setState({
          isRender: false,
					isloginCancel:undefined
        })
      }
      showLoginDialog = () => {
        this.setState({
          isRender: true,
					isloginCancel:"iscancel"
        })
      }
			//验证登录是否成功方法
      checkIfLogin = () => {
        return this.state.current_user && this.state.current_user.login != ''
      }

      hideAccountProfile = () => {
        this.setState({
          AccountProfiletype: false
        })
      }
      showProfileCompleteDialog = () => {
        this.dialogObj = {}
        this.setState({
          AccountProfiletype: true
        })
      }
			showhideAccountPhoneemailDialog = () => {
				this.dialogObj = {}
				this.setState({
					AccountPhoneemailtype: true
				})
			}
      hideAccountPhoneemailtype=()=>{
      	this.setState({
					AccountPhoneemailtype:false
				})
			}
			//验证是否完善资料
      checkIfProfileCompleted = () => {
        return this.state.current_user && this.state.current_user.profile_completed
      }

			showaccountprofileDialog = () => {
				this.dialogObj = {
					content: '您需要去完成您的个人资料，才能使用此功能',
					okText: '立即完成',
					okHref: '/account/profile'
				}
				this.setState({
					AccountProfiletype: true,
				})
			}
      showProfessionalCertificationDialog = () => {
        this.dialogObj = {
          content: '您需要去完成您的职业认证，才能使用此功能',
          okText: '立即完成',
          okHref: '/account/certification'
        }
        this.setState({
          AccountProfiletype: true,
        })
      }
      checkIfProfessionalCertification = () => {
        return this.state.current_user && this.state.current_user.professional_certification
      }


			ShowOnlinePdf = (url) => {
				return  axios({
										method:'get',
										url:url,
										responseType: 'arraybuffer',
									}).then((result)=>{
										var binaryData = [];
										binaryData.push(result.data);
										this.url =window.URL.createObjectURL(new Blob(binaryData, {type:"application/pdf"}));
										window.open(this.url);
									})
			}
			DownloadFileA=(title,url)=>{
				let link = document.createElement('a');
				document.body.appendChild(link);
				link.href =url;
				link.download = title;
				//兼容火狐浏览器
				let evt = document.createEvent("MouseEvents");
				evt.initEvent("click", false, false);
				link.dispatchEvent(evt);
				document.body.removeChild(link);
			}

			DownloadOpenPdf=(type,url)=>{
				type===true?window.open(url):window.location.href=url;
			}
      slowDownload = (url, tip) => {
        this._gLoadingTip = tip || '正在生成文件，请稍后...';
        this.setState({ globalLoading: true })
        const fileUrl = url;
        downloadFile({
          url: fileUrl,
          successCallback: (url) => {
            this.setState({ globalLoading: false })
            console.log('successCallback')
          },
          failCallback: (responseHtml, url) => {
            this.setState({ globalLoading: false })
            console.log('failCallback')
          }
        })
      }
      yslslowCheckresults =(tip) =>{
				this._gLoadingTip = tip || '成绩计算中，请稍候...';
				this.setState({ globalLoading: true })
			}
			yslslowCheckresultsNo =() =>{
				this.setState({ globalLoading: false })
			}

			showGlobalLoading = (tip) => {
        this._gLoadingTip = tip || '加载中，请稍后...';
        this.setState({ globalLoading: true })
      }
      hideGlobalLoading = () => {
        this.setState({ globalLoading: false })
      }

			MdifHasAnchorJustScorll=()=>{
				//mdhash滚动
				let anchor = decodeURI(this.props.location.hash).replace('#', '');
				// 对应id的话, 滚动到相应位置
				if (!!anchor) {
					let anchorElement = document.getElementsByName(anchor);
					if (anchorElement) {
						if (anchorElement.length>0){
							anchorElement[anchorElement.length-1].scrollIntoView();
						}
					}
				}
			}

			//跳转道描点的地方
			scrollToAnchor = (anchorName) => {
				if (anchorName) {
					// 找到锚点
					let anchorElement = document.getElementById(anchorName);
					// 如果对应id的锚点存在，就跳转到锚点
					if (anchorElement) {
						anchorElement.scrollIntoView();
					}
				}
			}

	  	render() {
          let{Headertop,Footerdown, isRender, AccountProfiletype,AccountPhoneemailtype}=this.state;
          const common = {
            isSuperAdmin:this.isSuperAdmin,
            isAdminOrCreator:this.isAdminOrCreator,
						isClassManagement:this.isClassManagement,
						isCourseAdmin:this.isCourseAdmin,

            isAdmin: this.isAdmin,
            isAdminOrTeacher: this.isAdminOrTeacher,
            isStudent: this.isStudent,
            isAdminOrStudent: this.isAdminOrStudent,
            isNotMember: this.isNotMember,
            isCourseEnd: this.isCourseEnd,

            isUserid:this.state.coursedata&&this.state.coursedata.userid,
            fetchUser: this.fetchUser,

            showLoginDialog: this.showLoginDialog,
            checkIfLogin: this.checkIfLogin,
            showProfileCompleteDialog: this.showProfileCompleteDialog,
						showhideAccountPhoneemailDialog:this.showhideAccountPhoneemailDialog,
            checkIfProfileCompleted: this.checkIfProfileCompleted,
						showaccountprofileDialog:this.showaccountprofileDialog,
            checkIfProfessionalCertification: this.checkIfProfessionalCertification,
            showProfessionalCertificationDialog: this.showProfessionalCertificationDialog,

						ShowOnlinePdf:(url)=>this.ShowOnlinePdf(url),
						DownloadFileA:(title,url)=>this.DownloadFileA(title,url),
						DownloadOpenPdf:(type,url)=>this.DownloadOpenPdf(type,url),

            slowDownload: this.slowDownload,
            showGlobalLoading: this.showGlobalLoading,
            hideGlobalLoading: this.hideGlobalLoading,
						yslslowCheckresults:this.yslslowCheckresults,
						yslslowCheckresultsNo:this.yslslowCheckresultsNo,
						MdifHasAnchorJustScorll:this.MdifHasAnchorJustScorll,
						scrollToAnchor:this.scrollToAnchor

          };
          // console.log("this.props.mygetHelmetapi");
          // console.log(this.props.mygetHelmetapi);
				// console.log("WrappedComponent");
				// console.log(this.props);
				// console.log(this.props.match.path);
				var mypath= this.props&&this.props.match&&this.props.match.path;
		    return (
		    	<div className="indexHOC">
						{isRender===true ? <LoginDialog
              Modifyloginvalue={()=>this.hideLoginDialog()}
              {...this.props}
              {...this.state}
            /> : ""}
            {/* AccountProfile 也用作职业认证 */}
            {AccountProfiletype===true ? <AccountProfile
              hideAccountProfile={()=>this.hideAccountProfile()}
              {...this.props}
              {...this.state}
              {...this.dialogObj}
            />:""}
            {/*验证是否注册手机邮箱*/}
						{AccountPhoneemailtype===true?<AccountPhoneemail
							hideAccountProfile={()=>this.hideAccountPhoneemailtype()}
							{...this.props}
							{...this.state}
							{...this.dialogObj}
						/>:""}
						{
							mypath&&mypath==="/question"?
                  ""
								:
								<SiderBar
									{...this.props}
									{...this.state}
									Headertop={Headertop}/>
						}


            {/* 注释掉了1440 影响到了手机屏幕的展示 */}
						<style>{
							`
							.newContainers{
							  min-width: 1200px;
                max-width: unset;
                height: 100%;
                min-height: 100%;
								overflow: hidden;
							}
							.newHeaders{
							  // position: fixed;
								max-width: unset;
								background: #24292D !important;
								width: 100%;
								height: 60px !important;
								min-width: 1200px;
								z-index: 1000;
								-moz-box-shadow: 0px 0px 12px rgba(0,0,0,0.1);
								box-shadow: 0px 0px 12px rgba(0,0,0,0.1);
							}

              .globalSpin {
                max-height: 700px !important;
              }
              .indexHOC > .ant-spin-nested-loading {
                background: #000;
                height: 100%;
              }
              .indexHOC > .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
                top: 50% !important;
              }

              .globalSpin .ant-spin-text {
                text-shadow: none !important;
                color: #fff;
              }
              .globalSpin .ant-spin-dot-item {
                background-color: #fff;
              }
							`
						}</style>


						<NewHeader {...this.state} {...this.props}></NewHeader>
            <Spin spinning={this.state.globalLoading} delay={0} className="globalSpin"
              size="large"
              tip= {this._gLoadingTip || "加载中..."}
            >
						<div className="newContainer newContainers">
								<WrappedComponent initCommonState={(user)=>this.initCommonState(user)}
									{...this.props} {...this.state}
									showShixun={this.showShixun} aboutFocus={this.aboutFocus}
									{...common}
								>
							</WrappedComponent>

						</div>

            </Spin>

						<NewFooter
							{...this.state} {...this.props}
								Footerdown={Footerdown}
						/>

		        </div>
		    );
	  	}
	}
}
