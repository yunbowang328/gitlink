import React from "react";

import axios from 'axios';
import md5 from 'md5';
import { requestProxy } from "./indexEduplus2RequestProxy";
import { broadcastChannelOnmessage ,SetAppModel, isDev, queryString } from 'educoder';
import {  notification } from 'antd';
import cookie from 'react-cookies';
import './index.css';
const $ = window.$;
const opens ="79e33abd4b6588941ab7622aed1e67e8";
let timestamp;
let checkSubmitFlg = false;
let message501=false;

broadcastChannelOnmessage('refreshPage', () => {
    window.location.reload()
})

function locationurl(list){
  if (window.location.port === "3007") {

  } else {
      window.location.href=list
  }
}





// TODO 开发期多个身份切换
 let debugType =""
if (isDev) {
  const _search = window.location.search;
  let parsed = {};
  if (_search) {
    parsed = queryString.parse(_search);
  }
  debugType = window.location.search.indexOf('debug=t') != -1 ? 'teacher' :
    window.location.search.indexOf('debug=s') != -1 ? 'student' :
      window.location.search.indexOf('debug=a') != -1 ? 'admin' : parsed.debug || 'admin'
}
// 超管
// debugType="admin";
// 老师
//debugType="teacher";
// 学生
//debugType="student";





function clearAllCookie() {
  cookie.remove('_educoder_session', {path: '/'});
  cookie.remove('autologin_trustie', {path: '/'});
  setpostcookie()
}
clearAllCookie();
function setpostcookie() {

  const  str =window.location.pathname;
  // console.log(str.indexOf("/wxcode"))
  let newdomain=".educoder.net"
  if(str.indexOf("/wxcode") !== -1){
    console.log("123")
    cookie.remove('_educoder_session', {path: '/'});
    cookie.remove('autologin_trustie', {path: '/'});
    // console.log("开始重写cookis");
    const _params = window.location.search;
    // console.log("1111");
    if (_params) {
      // console.log("22222");
      let _search = _params.split('?')[1];
      let _educoder_sessions= _search.split('&')[0].split('=');
       cookie.save('_educoder_session',_educoder_sessions[1], { domain:'.educoder.net', path: '/'});
      let autologin_trusties=_search.split('&')[1].split('=');
        cookie.save('autologin_trustie',autologin_trusties[1], { domain:'.educoder.net', path: '/'});

    }
  }
}
setpostcookie();


 function railsgettimes(proxy) {

   clearAllCookie()

     if(timestamp&&checkSubmitFlg===false){
       $.ajax({url:proxy,async:false,success:function(data){
           if(data.status===0){
             timestamp=data.message;
             setpostcookie();
           }
         }})
       checkSubmitFlg=true
       window.setTimeout(()=>{
         checkSubmitFlg=false;
       }, 2000);
     }else if(checkSubmitFlg===false){
       $.ajax({url:proxy,async:false,success:function(data){
           if(data.status===0){
             timestamp=data.message;
             setpostcookie();
           }
         }})
       checkSubmitFlg=true
       window.setTimeout( ()=>{
         checkSubmitFlg=false;
       }, 2000);
     }

}





window._debugType = debugType;
export function initAxiosInterceptors(props) {
    initOnlineOfflineListener()

    // TODO 避免重复的请求 https://github.com/axios/axios#cancellation
    //      https://github.com/axios/axios/issues/1497

    // TODO 读取到package.json中的配置？
			var proxy = "http://localhost:3000"
			// proxy = "http://testbdweb.trustie.net"
			// proxy = "http://testbdweb.educoder.net"
			// proxy = "https://testeduplus2.educoder.net"
			//proxy="http://47.96.87.25:48080"
			// proxy="https://pre-newweb.educoder.net"
      // proxy="https://test-newweb.educoder.net"
      // proxy="https://test-jupyterweb.educoder.net"
      // proxy="https://test-newweb.educoder.net"
      // proxy="https://test-jupyterweb.educoder.net"
	     //proxy="http://192.168.2.63:3001"

			var //proxy = "http://localhost:3000"
               // proxy="http://123.59.135.93:56666"
            proxy="http://localhost:3000"

    // 在这里使用requestMap控制，避免用户通过双击等操作发出重复的请求；
    // 如果需要支持重复的请求，考虑config里面自定义一个allowRepeat参考来控制
    const requestMap = {};

    window.setfalseInRequestMap = function(keyName) {
        requestMap[keyName] = false;
    }

     //响应前的设置
    axios.interceptors.request.use(
        config => {
            setpostcookie()
            clearAllCookie()
            // config.headers['Content-Type']= 'no-cache'
            // if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            //     config.headers.Authorization = token;
            // }

            // ---------------------------------------------    測試3007连测试服的代码
            // if (url.indexOf('file_update') != -1 || url.indexOf('game_build') != -1 || url.indexOf('game_status') != -1) {
            //     proxy = 'https://testbdweb.trustie.net'
            // } else {
            //     proxy = 'http://localhost:3000'
            // }
            // ---------------------------------------------
					  // console.log("开始请求了");
					  // console.log(config.url);
					  // console.log(window.location.pathname);
					  //

					// try {
					// 	const  str =window.location.pathname;
					// 	if(str.indexOf("/wxcode") !== -1){
					// 		// console.log("开始重写cookis");
					// 		const _params = window.location.search;
					// 		// console.log("1111");
					// 		if (_params) {
					// 			// console.log("22222");
					// 			let _search = _params.split('?')[1];
					// 			var  _educoder_sessionmys="";
					// 			var  autologin_trusties="";
					// 			_search.split('&').forEach(item => {
					// 				const _arr = item.split('=');
					// 				if(_arr[0]==='_educoder_session'){
					// 					cookie.save('_educoder_session',_arr[1], { domain: '.educoder.net', path: '/'});
					// 					_educoder_sessionmys=_arr[1];
					// 				}else{
					// 					cookie.save('autologin_trustie',_arr[1], { domain: '.educoder.net', path: '/'});
					// 					autologin_trusties=_arr[1];
					// 				}
					// 			});
					// 			try {
					// 				const autlogins= `_educoder_session=${_educoder_sessionmys}; autologin_trustie=${autologin_trusties} `;
					// 				config.params = {'Cookie': autlogins}
					// 				config.headers['Cookie'] =autlogins;
          //          // console.log("设置了cookis");
					// 			}	catch (e) {
					//
					// 			}
					// 			try {
					// 				const autloginysls= `_educoder_session=${_educoder_sessionmys}; autologin_trustie=${autologin_trusties} `;
					// 				config.params = {'autloginysls': autloginysls}
					// 				config.headers['Cookie'] =autloginysls;
					// 				// console.log("设置了cookis");
					// 			}catch (e) {
					//
					// 			}
					// 		}
					// 	}
					// }catch (e) {
					//
					// }



            if (config.url.indexOf(proxy) != -1 || config.url.indexOf(':') != -1) {
                return config
            }
            requestProxy(config)

            let url = `/api${config.url}`;

            //qq登录去掉api
					  	 if(config.params&&config.params.redirect_uri!=undefined){
								if(config.params.redirect_uri.indexOf('otherloginqq')!=-1){
									url = `${config.url}`;
								}
							}
            if(`${config[0]}`!=`true`){
                let timestamp = Date.parse(new Date())/1000;
                if (window.location.port === "3007") {
                  // let timestamp=railsgettimes(proxy);
                 // console.log(timestamp)
                 // `https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp`
                  railsgettimes( `${proxy}/api/main/first_stamp.json`);
                  let newopens=md5(opens+timestamp)
                    config.url = `${proxy}${url}`;
                    if (config.url.indexOf('?') == -1) {
                        config.url = `${config.url}?debug=${debugType}&randomcode=${timestamp}&client_key=${newopens}`;
                    } else {
                        config.url = `${config.url}&debug=${debugType}&randomcode=${timestamp}&client_key=${newopens}`;
                    }
                } else {
                    // 加api前缀
                  // railsgettimes(`http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp`);

                  railsgettimes( `/api/main/first_stamp.json`);
                  let newopens=md5(opens+timestamp)
                  config.url = url;
                  if (config.url.indexOf('?') == -1) {
                    config.url = `${config.url}?randomcode=${timestamp}&client_key=${newopens}`;
                  } else {
                    config.url = `${config.url}&randomcode=${timestamp}&client_key=${newopens}`;
                  }
                }
              setpostcookie();
            }
            //
					// console.log(config);
					if (config.method === "post") {
						if (requestMap[config.url] === true) { // 避免重复的请求  导致页面f5刷新 也会被阻止  显示这个方法会影响到定制信息
							// console.log(config);
							// console.log(JSON.parse(config));
							// console.log(config.url);
							// console.log("被阻止了是重复请求=================================");
							return false;
						}
					}
            // 非file_update请求
            if (config.url.indexOf('update_file') === -1) {
                requestMap[config.url] = true;

                window.setTimeout("setfalseInRequestMap('"+config.url+"')", 900)
            }
            // setTimeout("setfalseInRequestMap(" + config.url + ")", 1200)
            return config;
        },
        err => {
            return Promise.reject(err);
        });

    axios.interceptors.response.use(function (response) {

        // console.log(".............")
        if(response===undefined){
           return
       }
       const config = response.config
        if (response.data.status === -1) {
        //     console.error('error:', response.data.message)
        //     throw new Error()

        // https://github.com/axios/axios/issues?utf8=%E2%9C%93&q=cancel+request+in+response+interceptors+
        // https://github.com/axios/axios/issues/583
            // message.info(response.data.message || '服务端返回status -1，请联系管理员。');
            // props.showSnackbar( response.data.message || '服务器异常，请联系管理员。' )
            if (window.location.pathname.startsWith('/tasks/')) {
                props.showSnackbar( response.data.message || '服务器异常，请联系管理员。' )
            } else {
                notification.open({
                    message:"提示",
                    description: response.data.message || '服务器异常，请联系管理员。',
                    style: {
                    zIndex: 99999999
                  },
                });
                // notification['error']({
                //   message:"提示",
                //   description: response.data.message || '服务器异常，请联系管理员。',
                // });
            }

            throw new axios.Cancel('Operation canceled by the user.');
        } else {
            // hash跳转
            // var hash = window.location.hash;
						// if (hash) {
						// 	hashTimeout && window.clearTimeout(hashTimeout)
						// 	hashTimeout = setTimeout(() => {
						// 		var element = document.querySelector(hash);
						// 		if (element) {
						// 			element.scrollIntoView();
						// 		}
						// 	}, 400)
						// }
        }
        // if(response.data.status === 401){
        //   console.log("401401401")
        // }
        if (response.data.status === 403||response.data.status === "403") {

           locationurl('/403');
        }

        if (response.data.status === 404) {
            locationurl('/nopage');
        }

        if (response.data.status === 500) {
            locationurl('/500');
        }

        if (response.data.status === 501) {
          if(message501===false){
            message501=true
            notification.open({
              message:"提示",
              description:response.data.message || '访问异常，请求不合理',
              style: {
                zIndex: 99999999
              }
            })
          }
          window.setTimeout(function () {
              message501=false
          }, 2000);
        }


        // if (response.data.status === 402) {
        //   console.log(response.data.status);
        //   console.log(response.data);
        //   // locationurl(402);
        // }

        //
				// if (response.data.status === 401) {
        //   console.log("161");
        //   console.log(config);
				// 	return config;
				// }
        // if (response.data.status === 407) {
        // 在app js 中解决   Trialapplication
        //     // </Trialapplication>
        // ///在appjs
        //     notification.open({
        //         message:"提示",
        //         description: "账号未认证",
        //     });
        //  throw new axios.Cancel('Operation canceled by the user.');
        // //
        // }

        requestMap[response.config.url] = false;
        setpostcookie();
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
// -----------------------------------------------------------------------------------

}


function initOnlineOfflineListener() {
    const $ = window.$
    $(window).bind("online", () => {
        notification.destroy()
        notification.success({
            duration: 2,
            message: '网络恢复正常',
            description:
            '网络恢复正常，感谢使用。',
        })
    });
    $(window).bind("offline", () => {
        notification.destroy()

        notification.warning({
            duration: null,
            message: '网络异常',
            description:
            '网络异常，请检测网络后重试。',
        })
    });
}
