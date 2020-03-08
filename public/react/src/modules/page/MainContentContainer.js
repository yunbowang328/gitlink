import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Button from 'material-ui/Button';

import MainContent from './MainContent'
import UpdateDrawer from './component/UpdateDrawer'

import axios from 'axios'

import _ from 'lodash'

const CancelToken = axios.CancelToken;

let locationPath = window.location.pathname;

let readingRepoTimes = 0;

function updateCodeMirror () {
	// （TODO 这里的处理方式比较蹩脚，css没搞定）总高度减去页签头高度
	window.$('#games_repository_contents .CodeMirror').height(window.$('#games_repository_contents').height() - 40)
	// 为了解决这个问题：一开始进入TPI，代码框的内容显示不全，需要点击一下代码框才会显示全
	$('#games_repository_valuation .CodeMirror .CodeMirror-scroll').scrollTop('2')
	// 选择题切换到编程题会出现codemirror没初始化成功的问题，加下refresh
	window.editor_CodeMirror && window.editor_CodeMirror.refresh()
}

// ============================ ============================ ============================ ============================
// 老版本的评测等待通知代码
// ============================ ============================ ============================ ============================
const $ = window.$;
let next_game = null;
	function getRandom(min, max){
	    var r = Math.random() * (max - min);
	    var re = Math.round(r + min);
	    re = Math.max(Math.min(re, max), min);

	    return re;
	}

	function tipContent(flag, num, mintes, second, first){
        console.log("第几次查询get_waiting_time:" + first);
        var random = getRandom(15, 120);
        var mintes =  parseInt((second - random) / 60);
        var html=tip_half(flag, num, mintes, second);
        $("#update_game_tip").html(html);
        if(first == 1){
            show_tip_content();
        }
    }
  // 显示右侧评测等待通知
    function show_tip_content(){
        var $tip = $(".tip-panel-animate");
        $(".update_back_main").show();
        $tip.addClass("animate-tip").show();
        setTimeout(function(){$tip.removeClass("animate-tip")}, 700);
    }
    //隐藏右侧评测等待通知
    function hide_tip_content(){
        var $tip = $(".tip-panel-animate");
        $tip.addClass("animate-tip-hide");
        $(".-task-title").hide();
        setTimeout(function(){
            $tip.hide().removeClass("animate-tip-hide animate-tip");
            check_hide();
        }, 700);
    }
    window.hide_tip_content = hide_tip_content;

    //判断是否所有的提示信息都已经隐藏
    function check_hide(){
        var dis = true;
        var $tipLeft = $(".tip-panel-animate-left");
        for(var i = 0; i < $tipLeft.length; i++){
            if($tipLeft.eq(i).css("display") == "block"){
                dis = false;
                return;
            }
        }
        if($(".tip-panel-animate").css("display") == "block"){
            dis = false;
        }
        if(dis){
            $(".update_back_main").hide();
            $('#info_tip_tab').removeClass('leftnav-active');//去除系统通知的选中状态
            $('#current_task_tab').addClass('leftnav-active');//选中当前任务
        }
    }

    /*评测等待通知*/
    function tip_half(flag, num, mintes, second){
        var htmlvalue="";
        htmlvalue+="<p class=\"ml15 mr15 mt3 color-grey3 font-16\">评测等待通知</p>";
        if(flag == 0){
            htmlvalue+="<p class=\"color-dark-grey\" style=\"line-height: 20px;margin:10px 15px\">目前有<span class=\"color-orange03\">" + num + "</span>人正在等待评测，还需等待约<span class=\"color-orange03\">" + (mintes > 0 ? mintes + "分钟" : second + "秒") + "</span>。您可以先完成“下一关”任务。</p>";
        }else{
            htmlvalue+="<p class=\"color-dark-grey\" style=\"line-height: 20px;margin:0px 15px\">目前有超过<span class=\"color-orange03\">" + num*10 + "</span>人正在等待评测，请您稍后再试。您可以先完成其他关卡</p>";
        }

        htmlvalue+="<div class=\"tip-operator-btn\">";
        if(flag == 0){
            htmlvalue+="<a href=\"javascript:void(0)\" class=\"fl color-orange03\" data-tip-top=\"留在本页等待评测结果\"  onclick=\"hide_tip_content()\">继续等待</a>";
            if (next_game) {
            	htmlvalue+="<a href=\"/tasks/" + next_game + "\" class=\"fl color-grey\" data-tip-top=\"稍后查看评测结果\"  onclick=\"hide_tip_content()\">下一关</a>";
            } else {
            	htmlvalue+="<a href=\"javascript:void(0)\" class=\"fl color-grey\" >已经是最后一关啦</a>"
            }
        }else{
            htmlvalue+="<a href=\"javascript:void(0)\" class=\"fl color-orange03\" data-tip-top=\"留在本页重新评测\"  onclick=\"hide_tip_content()\">知道啦</a>";
            if (next_game) {
	            htmlvalue+="<a href=\"/tasks/" + next_game + "\" class=\"fl color-grey\" data-tip-top=\"下一关\"  onclick=\"hide_tip_content()\">下一关</a>";
	        } else {
            	htmlvalue+="<a href=\"javascript:void(0)\" class=\"fl color-grey\" >已经是最后一关啦</a>"
            }
        }
        htmlvalue+="</div>";
        return htmlvalue;
    }

    /*更新通知*/
    function tip_half_update(){
        var htmlvalue="";

        htmlvalue+="<p class=\"mb5 ml15 mt8 mr15 color-grey3 font-14 mt8\" style=\"line-height: 20px\">本次更新设计以下几个步骤，预计需要花费几分钟时间，请耐心等待~</p>";
        htmlvalue+="<ol class=\"ml15\">";
        htmlvalue+="<li style=\"list-style-type: disc;margin-left: 20px;line-height: 20px\">更新版本库</li>";
        htmlvalue+="<li style=\"list-style-type: disc;margin-left: 20px;line-height: 20px\">同步评测机制</li></ol>";
        htmlvalue+="<div class=\"tip-operator-btn\">";
        htmlvalue+="<a href=\"javascript:void(0)\" class=\"fl color-orange03\" style=\"width:100%;text-align: center;border:none\" onclick=\"hide_tip_content()\">知道啦</a>";
        htmlvalue+="</div>";
        return htmlvalue;
    }
// ============================ ============================ ============================ ============================
// ============================ ============================ ============================ ============================

const UPDATED = 0;
const SAVING = 1;
const SAVED = 2;
const SAVE_FAILED = 3;

class MainContentContainer extends Component {

	constructor(props) {
		super(props)

		this.onRepositoryCodeUpdate = this.onRepositoryCodeUpdate.bind(this)
		this.onRunCodeTest = this.onRunCodeTest.bind(this)
		this.codemirrorDidMount = this.codemirrorDidMount.bind(this)
		this.fetchRepositoryCode = this.fetchRepositoryCode.bind(this)

		this.showResetCodeDialog = this.showResetCodeDialog.bind(this)
		this.showResetPassedCodeDialog = this.showResetPassedCodeDialog.bind(this)
		this.mainContent = React.createRef();

		this.oldRepositoryCode = '';

		this.state = {
            repositoryCode: '',

            open: false,			// 繁忙等级等提示用Dialog，考虑重构封装到根组件
            gameBuilding: false, // 评测中标志
            codeStatus: SAVED, //  0 已修改  1 保存中  2 已保存   3 保存失败

						codeLoading: true,		 			// code加载中
						readRepoTimeout: false,	// 加载代码轮训超时
            resetCodeDialogOpen: false,			// 考虑重构封装到根组件
						resetPassedCodeDialogOpen: false,	// 考虑重构封装到根组件

            isEditablePath: true
        }
	}
	mainContentfun = (Ref) => {
		this.mainContent = Ref;
	}
	// ------------------------------------------------
	// static childContextTypes = {
 //        muiTheme: PropTypes.object
 //    }

 //    getChildContext() {
 //        return {
 //            muiTheme: getMuiTheme()
 //        }
 //    }
    // ------------------------------------------------
    handleClose = () => {
	    this.setState({open: false});
	};

	shouldComponentUpdate(nextProps, nextState) {
		// _.isEqual(this.props, nextProps)
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props) || !_.isEqual(this.state, nextState)) {
		   	return true
		} else {
		   	return false
		}
	}

	componentWillReceiveProps(newProps, nContext) {
		// 编程题才需要拿代码
        if (newProps.game && newProps.st === 0) {
        	if (!this.props ||  !this.props.game
        			|| ( newProps.game.identifier !== this.props.game.identifier ) ) {
              setTimeout(this.fetchRepositoryCode( newProps), 1500);
	        } 
			// else if ( this.props.challenge.pathIndex != newProps.challenge.pathIndex
	        // 		&& newProps.challenge.pathIndex !== -1) {	// 切换到只读文件
	        	// pathIndex切换
            //   setTimeout(this.fetchRepositoryCode( newProps), 1500);
	        // }
	    }
        if (newProps.myshixun) {
        	var stageId = newProps.match.params.stageId;
        	var shixunId = newProps.myshixun.identifier;
			// locationPath = `/myshixuns/${shixunId}/stages/${stageId}`
			locationPath = `/api/v1/games/${newProps.game.identifier}`;
			next_game = newProps.next_game;
        }
    }

	componentDidUpdate(prevProps, prevState, snapshot) {
        const { game, challenge  } = this.props
        
		if (game && prevProps.game 
				&& prevProps.game.identifier !== game.identifier) {   
			// 切换关卡时，停止轮训
			this.oldGameIdentifier = prevProps.game.identifier;
			this.doFileUpdateRequestOnCodeMirrorBlur(prevProps)
		} 
		// else if (this.props.shixun && this.props.shixun.code_edit_permission && this.state.currentPath != prevState.currentPath) {
		// 	this.doFileUpdateRequestOnCodeMirrorBlur(prevProps)
		// } 
		else if (challenge && (challenge.pathIndex || prevProps.challenge.pathIndex) && challenge.pathIndex != prevProps.challenge.pathIndex) {
			this.doFileUpdateRequestOnCodeMirrorBlur(prevProps)
		} 
        
    }

    // arg_path 点击文件目录树时，传入的点击节点对应的path
	fetchRepositoryCode( props, arg_path, type, isRetry, retryAndRefresh) {
		if (retryAndRefresh) {
			this.retryAndRefresh = retryAndRefresh
		}
    	const { challenge, showSnackbar, game, shixun, myshixun, hide_code } = props ? props : this.props;
		if (shixun.vnc == true) {
			// vnc模式下不需要加载代码
			return true;
		}
		if (
			// true || 
			hide_code) {	// 隐藏code的实训
			this.setState({ codeLoading: false });
			return;
		}
		if (type && arg_path) {
			this.doFileUpdateRequestOnCodeMirrorBlur(this.props)
		}
		const stageId = game.identifier
		let path;
		let isEditablePath = false;
		if (arg_path) {
			path = arg_path;
			if (challenge.multiPath) {
				challenge.path.forEach(item => {
					if (path == item) {
						isEditablePath = true;
					}
				})
			} else if (path == challenge.path) {
				isEditablePath = true;
			}
		} else {
			isEditablePath = true;
			path = challenge.multiPath ? challenge.path[challenge.pathIndex] : challenge.path;
		}
		if (readingRepoTimes === 0) {
			this.setState({
				readRepoTimeout: false
			})
		}

		// http://localhost:3000/api/v1/games/zl6kx8f7vfpo/rep_content
		let status = type ? type : 0;	// type 1 目录树点击   默认 0： 正常代码加载
		// const fetchRepoCodeUrl = `/api/v1/games/${stageId}/rep_content?path=${path}&shixun_gpid=${shixun.gpid}&status=${status}&retry=${isRetry ? 1 : 0}`
		const fetchRepoCodeUrl = `/tasks/${game.identifier}/rep_content.json?path=${path}&status=${status}&retry=${isRetry ? 1 : 0}`
		// ?path=${path}&shixun_gpid=${shixun.gpid}&status=${status}&retry=${isRetry ? 1 : 0}

		if (this.state.codeLoading === true && this._cancel) {	// 多次请求，则cancel掉前面的请求
			// bug cancel掉第一次请求后，第二次请求也没法发出，先注释掉了
			// this._cancel();
			// this._cancel = null;
		}
		const that = this;
		this.setState({ gameBuilding: false, codeLoading: true });
    	axios.get(fetchRepoCodeUrl, {
			// path: path
			
    		// withCredentials: true,
    		// cancelToken: new CancelToken(function executor(c) {
			//     // An executor function receives a cancel function as a parameter
			//     that._cancel = c;
			// })
    	}).then((fetchRepositoryCodeResponse) => {
				// monaca 需要刷新，不然无法编辑
				// 加了dispose，应该不会重现了，暂时注释掉reload
				// if (this.retryAndRefresh && fetchRepositoryCodeResponse.data.content) {
				// 	this.retryAndRefresh = false;
				// 	window.location.reload()
				// 	return;
				// }
				// 空字符串还是正常切换
				if (fetchRepositoryCodeResponse.data.status == 0) {
					readingRepoTimes = readingRepoTimes + 1;
					if(readingRepoTimes > 9) {
						this.setState({
							readRepoTimeout: true,
							codeLoading: false
						})
						readingRepoTimes = 0;
						showSnackbar(`网络异常，请稍后重试。`);
						return
					}else{
						if (status === 0) {
							// 轮训后点击切换关卡的话，停止上一关的轮训
							if (game.identifier == this.oldGameIdentifier) {
								this.oldGameIdentifier = null;
								return;
							}
							setTimeout(() => {
								this.fetchRepositoryCode(props,arg_path,type)
							}, 1500);
						} 
					}

				}else if (fetchRepositoryCodeResponse.data && fetchRepositoryCodeResponse.data.status === -1) {
						this.setState({	codeLoading: false })
						console.error('`获取代码失败！')
						showSnackbar(`获取代码失败：${fetchRepositoryCodeResponse.data.message}`)

				}else if (fetchRepositoryCodeResponse.data.status === -3) {
					readingRepoTimes = readingRepoTimes + 1;
					if(readingRepoTimes > 9) {
						this.setState({
							readRepoTimeout: true
						})
						readingRepoTimes = 0;
						showSnackbar(`网络异常，请稍后重试。`);
						return
					}else{
						if (status === 0) {
							// 轮训后点击切换关卡的话，停止上一关的轮训
							if (game.identifier == this.oldGameIdentifier) {
								this.oldGameIdentifier = null;
								return;
							}
							// 重试调用的这个 this.props.fetchRepositoryCode(this.props, null, null, true)
							setTimeout(() => {
								this.fetchRepositoryCode(props, arg_path, type, 1)
							}, 1500);
						}
					}
				} else if (fetchRepositoryCodeResponse.data.status === -4) {
					// 异常 直接重试
					this.fetchRepositoryCode(props, null, null, true)
				} else{
					var editor_monaco = window.editor_monaco;

					if (path && path.endsWith('.py')) {
						editor_monaco.getModel().updateOptions({insertSpaces: true})
					} else {
						editor_monaco.getModel().updateOptions({insertSpaces: false})
					}
					this.setState({ isEditablePath, currentPath: path });
					this.oldRepositoryCode = ((fetchRepositoryCodeResponse.data.content === true || !fetchRepositoryCodeResponse.data.content)
						 ? '' : fetchRepositoryCodeResponse.data.content);

					this.updateRepositoryCode(this.oldRepositoryCode, updateCodeMirror)
				}

    	}).catch(error =>{
    		console.log(error)
			this.setState({ codeLoading: false });
			showSnackbar(`服务端异常，请联系管理员！`);
    	})
	}

	componentDidMount() {
		// if (this.binded == true) {
		// 	return;
		// } else {
		// 	this.binded = true
		// 	window.$(window).unload( ()=>{
		// 		alert(111)
		// 		var fileUpdatePromise = this.doFileUpdateRequest(true)
		// 	});
		// }

		window.addEventListener("beforeunload", this.beforeunload);
           
	}
	componentWillUnmount() {
		// window.$(window).off( "unload" )
		 window.removeEventListener("beforeunload", this.beforeunload);
	}
	beforeunload = () => {
		this.doFileUpdateRequestOnCodeMirrorBlur()
	}
	

	doFileUpdateRequestOnCodeMirrorBlur = (props) => {
		var fileUpdatePromise = this.doFileUpdateRequest(true, undefined, props)
        if (fileUpdatePromise) {
        	fileUpdatePromise.then((resData) => {
        		if (resData.status === -1) { // 保存文件出现异常
                    this.setState({
                        codeStatus: SAVE_FAILED
                    })
                    return;
                }
        		this.setState({
					codeStatus: SAVED
				})
        	}).catch((e) => {
        		console.log(e)
        		this.setState({
					codeStatus: SAVE_FAILED
				})
        	})
        }
	}
	componentWillUnmount() {
		this.autoSaveInterval && clearInterval(this.autoSaveInterval);
	}

	onEditorBlur = () => {
		if (this.autoSaveInterval) {
			clearInterval(this.autoSaveInterval);
			this.autoSaveInterval = null;
		}
		this.doFileUpdateRequestOnCodeMirrorBlur()
	}
	onEditorFocus = () => {
		if (this.autoSaveInterval) {
			return;
		}
		this.autoSaveInterval = setInterval( () => {
			// code变化时，，每30秒保存到数据库，没变化则不处理
			var autoSave = true
			var fileUpdatePromise = this.doFileUpdateRequest(true)
			if (fileUpdatePromise) {
				fileUpdatePromise.then((resData) => {
					// TODO 保存失败的处理
					this.setState({
						codeStatus: SAVED
					})
				}).catch((e) => {
					console.log(e)
				})
			}
		}, 30000);
	}

	codemirrorDidMount() {
		var editor_CodeMirror = window.editor_CodeMirror;
		var editor_monaco = window.editor_monaco;
	    // 失去焦点终止保存事件
	    // editor_CodeMirror && editor_CodeMirror.on('blur', this.onEditorBlur);
		// editor_monaco && editor_monaco.onDidBlurEditorText(this.onEditorBlur)

	    // 每60秒钟保存一次
	    editor_CodeMirror && editor_CodeMirror.on('focus', this.onEditorFocus);
		editor_monaco && editor_monaco.onDidFocusEditorText(this.onEditorFocus)


	}

	_refreshHtmlIframe(newCode) {
		// TODO 是否是html的code
		const isHtmlCode = this.props.challenge.isHtml;
		if (isHtmlCode) {
			// TODO 参考 _code_actions.html.erb   做link script标签替换
			// var $iframe = window.$('#htmlIframe');
			// $iframe.ready( () => {
			//     $iframe.contents().find("body").html(newCode || this.state.repositoryCode);
			// });
			window.tpi_html_show(newCode)
		}
	}

	updateRepositoryCode(newCode, callback) {
		this.setState({
			codeLoading: false,
			repositoryCode: newCode,
        }, () => { callback && callback() });
		this._refreshHtmlIframe(newCode)
	}

	onRepositoryCodeUpdate(newCode) {
		if (this.refreshHtmlTimeout) {
			clearTimeout(this.refreshHtmlTimeout)
		}
		// 每2s刷新一次
		this.setState({
    		codeStatus: UPDATED
        })
        this.refreshHtmlTimeout = setTimeout(()=>{
    //     	this.setState({
    //     		// codeStatus: UPDATED,
				// repositoryCode: newCode
	   //      });

        	this._refreshHtmlIframe(newCode)

        	this.refreshHtmlTimeout = null;
        }, 1500)

	}

	// forTest true  是评测时触发的file_update
	doFileUpdateRequest(checkIfCodeChanged, forTest, props) {
		const _props = props || this.props;
		const { codeStatus } = this.state;
		if (!forTest && codeStatus !== UPDATED) {	// 已修改状态才能保存
			return;
		}
		// TODO 连着2次请求服务端会报500
		// if (forTest == true) {
		// 	if (this.state.codeStatus != UPDATED) {
				
		// 		return;
		// 	}
		// }
		let codeContent = this.state.repositoryCode;
		if (window['editor_CodeMirror']) {
			codeContent = window.editor_CodeMirror.getValue();
		} else if (window.editor_monaco && window.editor_monaco.getModel()) { // (编程切选择题) 如果dispose了，model为空
			codeContent = window.editor_monaco.getValue()
		}
		if (checkIfCodeChanged === true && this.oldRepositoryCode == codeContent) {
			// console.log('code not changed');
			this.setState({
				codeStatus: SAVED
			})
			return null;
		}
		const { challenge, output_sets, onRunCodeTestFinish, myshixun } = _props
		// var url = `${locationPath}/file_update?path=${encodeURIComponent(challenge.path)}`
		var url = `/myshixuns/${myshixun.identifier}/update_file.json`

		this.setState({
			codeStatus: SAVING
		})
		this.oldRepositoryCode = codeContent;

		let argPath;
		if (this.props.shixun && this.props.shixun.code_edit_permission == true) {
			argPath = this.state.currentPath
		} else if (challenge.pathIndex === -1) {	// 当前是只读文件
			argPath = challenge.multiPath === true ? challenge.path[0] : challenge.path
		} else {
			argPath = challenge.multiPath === true ? challenge.path[challenge.pathIndex] : challenge.path
		}



		// 跨域请求时会多一个options请求
		// https://github.com/axios/axios/issues/475
		return axios.post(url, {
				    content: codeContent,
					// 评测的时候传1，其它情况不用传，主要是为了区分是用户自己提交还是自动提交
				    // type: forTest === true ? 1 : 0,
				    evaluate: forTest === true ? 1 : 0,
					game_id : this.props.game.id,
				    path: argPath
			    },
			    {
			    	// withCredentials: true
			    }

		    )
	}

	onRunChooseTest() {
		const { st, game, onRunChooseTestFinish, showSnackbar } = this.props;
		// 获取form表单值
		// console.log(this.mainContent.chooseQ.props.form.getFieldsValue())
		var value = this.mainContent.chooseQ.props.form.getFieldsValue();
			// this.refs.mainContent.refs.chooseQ.getForm().getFieldsValue();

		var valueArray = [];	// map转array
      	var unSelectOptionIndexArray = [] // 自己做未选提示
		for(var key in value) {
			if (!value[key] || (_.isArray(value[key]) && !value[key].join('')[0])) {
				unSelectOptionIndexArray.push(key)
				break;  // 为空处理
			}
			// TODO array判断
			valueArray[parseInt(key)] = _.isArray(value[key]) ? value[key].join('') : value[key] ;
		}
		if (unSelectOptionIndexArray.length) {
			var unSelectOptionIndex = unSelectOptionIndexArray[0]
			var _unSelectOptionDom = window.$('#games_repository_contents #choice' + unSelectOptionIndex )[0]
			_unSelectOptionDom.scrollIntoView()
			showSnackbar(`请先给第${parseInt(unSelectOptionIndex)+1}题选择一个答案。`)	//  , 'top', 'center'
			// 有未选择的题
			return;
		}

		// TODO 未选提示、props.onRunChooseTest
		console.log(unSelectOptionIndexArray)

		console.log('valueArray', valueArray)

		var url = `/api/v1/games/${game.identifier}/choose_build`
		this.setState({
			gameBuilding: true,
		})
		axios.post(url, {
				    answer: valueArray
			    },
			    {
			    	withCredentials: true,
			    	// headers: {
				    	// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				    // }
			    }
		    ).then((response) => {
		    	if (response.data.test_sets) { // 评测完成

		    		onRunChooseTestFinish(response.data);
		    		this.setState({
						gameBuilding: false,
					})
		    	}
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    	this.setState({
					gameBuilding: false,
				})
		    })
	}

	setGameBuildFalse() {
		this.setState({
    		gameBuilding: false
    	})
	}
	onPathChange = (index, isDropDown) => {
		this.props.onPathChange(index, () => {
			isDropDown && this.fetchRepositoryCode()
		})
	}
	onRunCodeTest() {
		// tipContent(0, 100, 30, 360, 1)
		// return; // for test

		const { st, challenge, output_sets, onRunCodeTestFinish, loading, showDialog, handleGdialogClose, onPathChange } = this.props
		const { isEditablePath } = this.state;
		if (isEditablePath === false) {
			showDialog({
				contentText: '需要先切回可编辑的文件才可评测，确认要现在切换吗？',
				callback: () => {
					this.onPathChange(0, true)
					handleGdialogClose();
				}
			})
			return;
		}
		if (loading === true) {
			return;	// 还在加载中
		}
		if (st === 1) {	// 选择题
			this.onRunChooseTest();
			return;
		}
		// ----------------------  以下是编程题处理  ----------------------

		console.log('onRunCodeTest  onRunCodeTest')

		// http://localhost:3000/myshixuns/so5w6iap97/stages/zl6kx8f7vfpo/file_update?path=src%2Fstep6%2FLinkedList.java


		// var url = `${locationPath}/file_update?path=${encodeURIComponent(challenge.path)}`

		// var timeOut = parseInt(<%= @myshixun.main_mirror.try(:time_limit) %>); // 超时参数

		this.setEvaluateMiddleStatusText('')

		this.setState({
    		gameBuilding: true
    	})
		this.doFileUpdateRequest(null, true)
		  	.then((fileUpdateResponse) => {
		    	console.log(fileUpdateResponse);
		    	if (fileUpdateResponse.data.status === -1) { // 保存文件出现异常
		    		this.setGameBuildFalse()
		    		this.setState({
						codeStatus: SAVE_FAILED
					})
		    		return;
		    	}
		    	this.setState({
					codeStatus: SAVED
				})
		    	this.gameBuild(fileUpdateResponse, 1)
		  	})
		  	.catch( (fileUpdateError) => {
		    	console.log(fileUpdateError);
		    	this.setGameBuildFalse()
		  	});
	}
	setEvaluateMiddleStatusText = (msg) => {
		window.$('#evaluateMiddleStatusText').html(msg)
	}
	// 之前的task_commit方法
	gameBuild(fileUpdateResponse, first) {
		const { st, challenge, output_sets, onRunCodeTestFinish, resetTestSetsExpandedArray, showSnackbar, time_limit, game } = this.props
		const { resubmit, content_modified, sec_key } = fileUpdateResponse.data;
		const timeOut = time_limit;
    	// http://localhost:3000/myshixuns/so5w6iap97/stages/zl6kx8f7vfpo/game_build?first=1&resubmit=GDBEX741_1993
    	// const game_build_url = `${locationPath}/game_build?first=${first}&resubmit=${resubmit}&content_modified=${content_modified}`
    	const game_build_url = `/tasks/${game.identifier}/game_build.json?first=${first}&resubmit=${resubmit}&content_modified=${content_modified}&sec_key=${sec_key}`

    	// var timeOut = parseInt(<%= @myshixun.main_mirror.try(:time_limit) %>); // 超时参数

			resetTestSetsExpandedArray();
    	axios.get(game_build_url, {
    		// withCredentials: true,
    	}).then((gameBuildResponse) => {
    		console.log(gameBuildResponse);
    		// D:\Code\trustieplus\app\views\games\_code_actions.html.erb

    		let { port, ableToCreate, waitNum, waitingTime, had_done } = gameBuildResponse.data;
    		// http://localhost:3000/myshixuns/so5w6iap97/stages/zl6kx8f7vfpo/game_status?resubmit=GDBEX741_1993&port=50241&time_out=false

			// TODO dead code 往下走
			
    		// if (ableToCreate == 1) {

				if (gameBuildResponse.data.status == -1) {
					return
				}
	    		let timeOutFlag = false;
	    		const intervalDuring = 1000;
	    		let requestTimes = 0;

	    		var gameStatusIntervalId = setInterval(()=>{
	    			// let game_status_url = `${locationPath}/game_status?port=${port}&resubmit=${resubmit||""}&time_out=${timeOutFlag}`
	    			let game_status_url = `/tasks/${game.identifier}/game_status.json?port=${port}&resubmit=${resubmit||""}&time_out=${timeOutFlag}&sec_key=${sec_key}`

		    		axios.get(game_status_url, {
		    			// withCredentials: true,
		    		}).then((gameStatusResponse) => {
		    			requestTimes++;
		    			const { status, running_code_message } = gameStatusResponse.data;

		    			if(!gameStatusResponse.data || !status && status !== 0) {
		    				if(requestTimes >= timeOut - 1){	 // 最后一次参数改为true
	                            timeOutFlag = true;
	                        }
							if (running_code_message) {
								this.setEvaluateMiddleStatusText(running_code_message)
							}
		    				return;
		    			}

		    			if (timeOutFlag === false && (status === 2 || status === 0)) {
		    				// 网络太慢或服务处理较慢的情况下，可能这里会执行第二次
		    				console.log('clearIntervalclearIntervalclearIntervalclearInterval status2 0')
		    				clearInterval(gameStatusIntervalId);
		    				onRunCodeTestFinish(gameStatusResponse.data)
		    				this.setGameBuildFalse()
		    				timeOutFlag = true; // 用这个处理重复的获取status为2或0的状态
		    			}
		    			// 超时处理
		    			if(timeOutFlag === true) {
		    				// clearInterval(gameStatusIntervalId);
		    				console.log('超时处理返回值')
		    				this._refreshHtmlIframe();
		    				this.setGameBuildFalse()
		    				return;
		    			}

		    			if(requestTimes >= timeOut - 1){	 // 最后一次参数改为true
                            timeOutFlag = true;
                        }


		    		}).catch((gameStatusError) => {
	    				console.log(gameStatusError);
		    		})

		    		if (timeOutFlag === true) {
		    			clearInterval(gameStatusIntervalId);
		    			this.setState({
		    				open: true,
							gameBuilding: false
		    			})
		    		}
		    	}, intervalDuring)

				window.gameStatusIntervalId = gameStatusIntervalId;
			// } else if(ableToCreate === 0) { // 排队等待，重新执行gameBuild
			// 	const mintes = parseInt((waitNum * 120) / 60); // 等待时间 = 等待人数 * (15(秒)---3分钟的随机数);
			// 	tipContent(ableToCreate, waitNum, mintes, waitNum * 180, first);
			// 	setTimeout(()=>{
			// 		this.gameBuild(fileUpdateResponse, first + 1)
			// 	}, 10000)
			// 	this.setGameBuildFalse()
    		// } else if(ableToCreate == -1) { // 排队人数过多，建议先玩下一关
    		// 	tipContent(ableToCreate, waitNum, 0, 0, first);
    		// 	this.setGameBuildFalse()
    		// } else {
    		// 	showSnackbar("实训云平台繁忙（繁忙等级：94），请稍后刷新并重试")
    		// 	this.setGameBuildFalse()
    		// }


    	}).catch((gameBuildError) => {
    		console.log(gameBuildError);
    		this.setGameBuildFalse()
    	})
	}
	handleResetCodeDialogClose() {
		this.setState({ resetCodeDialogOpen: false })
	}
	showResetCodeDialog() {
		this.setState({ resetCodeDialogOpen: true })
	}
	doResetCode() {
		const { game, challenge, showSnackbar } = this.props;
		this.handleResetCodeDialogClose();

		let path = challenge.path
		if (challenge.multiPath) {
			path = path[challenge.pathIndex]
		}
		// const url = `/api/v1/games/${game.identifier}/reset_original_code?path=${path}`;
		const url = `/tasks/${game.identifier}/reset_original_code.json?path=${path}`;
		this.setState({
			codeLoading: true
		})
		axios.get(url, {
    		// withCredentials: true,
    	}).then((res) => {
    		this.handleResetCodeDialogClose();
    		if (res.data.status === -1) {
    			console.error('代码重置失败！');
				this.setState({
					codeLoading: false
				})
    			showSnackbar(res.data.message || '加载初始的代码失败')
    			return;
    		}
   //  		this.setState({
			// 	codeLoading: false
			// })
    		this.updateRepositoryCode(res.data.content, updateCodeMirror)
    	}).catch(error =>{
    		this.setState({
				codeLoading: false
			})
    	})
	}

	handleResetPassedCodeDialogClose() {
		this.setState({ resetPassedCodeDialogOpen: false })
	}
	showResetPassedCodeDialog() {
		this.setState({ resetPassedCodeDialogOpen: true })
	}
	doResetPassedCode() {
		this.handleResetPassedCodeDialogClose();
		const { game, challenge, showSnackbar } = this.props;
		let path = challenge.path
		if (challenge.multiPath) {
			path = path[challenge.pathIndex]
		}
		// const url = `/api/v1/games/${game.identifier}/reset_passed_code?path=${path}`;
		const url = `/tasks/${game.identifier}/reset_passed_code.json?path=${path}`;
		this.setState({
			codeLoading: true
		})
		axios.get(url
		// , {
    		// withCredentials: true,
    	// }
		).then((res) => {
    		this.handleResetPassedCodeDialogClose();
    		if (res.data.status === -1) {
    			console.error('passed代码重置失败！')
				this.setState({
					codeLoading: false
				})
    			showSnackbar(res.data.message || '加载上次通过的代码失败')
    			return;
    		}
    		// 注意，最好是合并到一个setState, 这里分两次setState的话，触发了2次重新渲染
   //  		this.setState({
			// 	codeLoading: false
			// })
    		this.updateRepositoryCode(res.data.content, updateCodeMirror)
    	}).catch(error =>{
    		this.setState({
				codeLoading: false
			})
    	})
	}

  	render() {
  		const { challenge,  output_sets, time_limit, real_time_limit } = this.props;
  		// TODO 这里直接写死了，game_status在超时时也会返回这句话
  		let msg = (
		  	<div>
		  	{`代码评测超时！本关限定时间为：${real_time_limit}s，`}<br></br>
			  请检查代码是否存在死循环或其他耗时操作
			</div>)

	    return (
	    	<React.Fragment>
		        <Dialog
		          	open={this.state.open}
								disableEscapeKeyDown={true}
		          	onClose={this.handleClose}
		        >
			       	<DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
		          	<DialogContent>
			            <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
				        	{ msg }
			            </DialogContentText>
		          	</DialogContent>
		          	<DialogActions>
			            <Button onClick={this.handleClose} color="primary">
			            	关闭
			            </Button>
		          	</DialogActions>
		        </Dialog>

		        <Dialog
		          	open={this.state.resetCodeDialogOpen}
								disableEscapeKeyDown={true}
		          	onClose={() => this.handleResetCodeDialogClose()}
		        >
			       	<DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
		          	<DialogContent>
			            <div style={{textAlign: 'center'}}>
			            	你在本文件中修改的内容将丢失<br></br>是否确定重新加载初始代码？
			            </div>
		          	</DialogContent>
		          	<DialogActions>
			            <Button onClick={() => this.handleResetCodeDialogClose()} color="primary">
			            	关闭
			            </Button>
			            <Button variant="raised" onClick={() => this.doResetCode()} color="primary">
			            	确定
			            </Button>
		          	</DialogActions>
		        </Dialog>

		        <Dialog
						  	disableEscapeKeyDown={true}
		          	open={this.state.resetPassedCodeDialogOpen}
		          	onClose={() => this.handleResetPassedCodeDialogClose()}
		        >
			       	<DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
		          	<DialogContent>
			            <div style={{textAlign: 'center'}}>
			            	你在本关中修改的内容将丢失<br></br>是否确定重新加载上次通过的代码?
			            </div>
		          	</DialogContent>
		          	<DialogActions>
			            <Button onClick={() => this.handleResetPassedCodeDialogClose()} color="primary">
			            	关闭
			            </Button>
			            <Button variant="raised" onClick={() => this.doResetPassedCode()} color="primary">
			            	确定
			            </Button>
		          	</DialogActions>
		        </Dialog>

		        <UpdateDrawer {...this.props} fetchRepositoryCode={this.fetchRepositoryCode}></UpdateDrawer>
		        <MainContent ref="mainContent" mainContentfun={(ref)=>this.mainContentfun(ref)} {...this.props} output_sets={output_sets} {...this.state}
	      			onRepositoryCodeUpdate={this.onRepositoryCodeUpdate} onRunCodeTest={this.onRunCodeTest}
	      			codemirrorDidMount={this.codemirrorDidMount} fetchRepositoryCode={this.fetchRepositoryCode}
	      			showResetCodeDialog={this.showResetCodeDialog} showResetPassedCodeDialog={this.showResetPassedCodeDialog}
	      			doFileUpdateRequestOnCodeMirrorBlur={this.doFileUpdateRequestOnCodeMirrorBlur} 
					onPathChange={this.onPathChange}
					  ></MainContent>
	    	</React.Fragment>

	    );
  	}
}

export default MainContentContainer;
