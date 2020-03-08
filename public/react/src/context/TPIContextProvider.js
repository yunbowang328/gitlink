import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';

import update from 'immutability-helper'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Button from 'material-ui/Button';

import EvaluateSuccessEffectDisplay from './EvaluateSuccessEffectDisplay'

import _ from 'lodash'

/*
	若干js库
	http://inorganik.github.io/countUp.js/

*/
/*
	切下一关需要更新：
	LeftViewContainer state.gameAnswer
*/

import TPIContext from './TPIContext'
import { EDU_ADMIN, EDU_SHIXUN_MANAGER, EDU_SHIXUN_MEMBER, EDU_CERTIFICATION_TEACHER
    , EDU_GAME_MANAGER, EDU_TEACHER, EDU_NORMAL, EDU_BUSINESS, CNotificationHOC ,getRandomNumber} from 'educoder'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import MUIDialogStyleUtil from '../modules/page/component/MUIDialogStyleUtil'

const styles = MUIDialogStyleUtil.getTwoButtonStyle()

// 主题自定义
const theme = createMuiTheme({
  palette: {
    primary: {
    	main: '#4CACFF',
    	contrastText: 'rgba(255, 255, 255, 0.87)'
	},
    secondary: { main: '#4CACFF' }, // This is just green.A700 as hex.
  },
});

const testSetsExpandedArrayInitVal = [false, false, false, false, false,
									 false, false, false, false, false,
									 false, false, false, false, false,
									 false, false, false, false, false]
window.__fetchAllFlag = false;	//  是否调用过fetchAll   TODO 如何多次使用provider？

const $ = window.$
class TPIContextProvider extends Component {
	constructor(props) {
		super(props)
		this.onRunCodeTestFinish = this.onRunCodeTestFinish.bind(this)
		this.onRunChooseTestFinish = this.onRunChooseTestFinish.bind(this)
		this.testSetUnlock = this.testSetUnlock.bind(this)

		this.onTestSetHeaderClick = this.onTestSetHeaderClick.bind(this)

		this.onShowPrevStage = this.onShowPrevStage.bind(this)
		this.onShowNextStage = this.onShowNextStage.bind(this)

		this.readGameAnswer = this.readGameAnswer.bind(this)
		this.praisePlus = this.praisePlus.bind(this)

		this.onGamePassed = this.onGamePassed.bind(this)

		this.onPathChange = this.onPathChange.bind(this)

		this.showSnackbar = this.showSnackbar.bind(this)
		this.showDialog = this.showDialog.bind(this)

		this.onShowUpdateDialog = this.onShowUpdateDialog.bind(this)
		this.updateDialogClose = this.updateDialogClose.bind(this)

		// this.showEffectDisplay();

		this.state = {
			loading: true,	// 正在加载数据
			gDialogOpen: false,
			currentGamePassed: false,	// 当前game评测通过
			currentPassedGameGainGold: 0, 	// 当前通过的game获得的金币数
			currentPassedGameGainExperience: 0,	// 当前通过的game获得的经验数

			user: {},
			challenge: {},
			shixun_name: '',
			hide_code: false,

			showUpdateDialog: false,

			testSetsExpandedArray: testSetsExpandedArrayInitVal.slice(0),
		}
	}

	showEffectDisplay = (data) => {
		const dom = document.getElementById('picture_display');
		window.$(dom).show();
		ReactDOM.unmountComponentAtNode(dom)
  		ReactDOM.render(<EvaluateSuccessEffectDisplay type={"qrcode"} {...data} />, dom);
	}

	onShowUpdateDialog() {
		this.setState({showUpdateDialog: true})
	}
	// updateNowSuccess true 立即更新成功
	// TODO updateDialogClose方法名不对， 改为updateDialogCallback
	updateDialogClose(nextUpdateSuccess, updateNowSuccess) {
		const { myshixun } = this.state;
		if (nextUpdateSuccess) {
			myshixun.system_tip = true;
		}
		let { tpm_cases_modified, tpm_modified, tpm_script_modified } = this.state;
		if (updateNowSuccess) {
			tpm_cases_modified = false;
			tpm_modified = false;
			tpm_script_modified = false;
		}
		this.setState({
			myshixun,
			tpm_cases_modified,
			tpm_modified,
			tpm_script_modified,
			showUpdateDialog: false,
		})
	}

	componentWillUnmount() {
		this.costTimeInterval && window.clearInterval(this.costTimeInterval)
	}
	componentDidMount() {

		// TODO 登录状态的判断？
		// request
        // var shixunId = this.props.match.params.shixunId;
        var stageId = this.props.match.params.stageId;

		window.__fetchAllFlag = false;
		this.fetchAll(stageId);
		this.costTimeInterval = window.setInterval(()=> {
			const { game } = this.state;
			if (!game || game.status === 2) { // 已完成的任务不需要计时
				return;
			}
			if (game.cost_time || game.cost_time === 0) {
				// game.cost_time += 1;
				this.setState({
					game: update(game, {cost_time: { $set: (game.cost_time+1) }})
				})
			}
		}, 1000)

		// 页面离开时存下用户的任务耗时

		window.$(window).unload( ()=>{
            this._updateCostTime();
		});
	}
	// force 评测通过后，异步执行该方法，强制同步costTime到服务端
	_updateCostTime(async = false, force) {
		const { game, loading } = this.state;
		// TODO 还有一种情况，通关后cost_time计时停止，没法通过这个判断
        if (!force && (loading || !game || game.status === 2)) {
        	return; // 已完成的任务不需要处理
        }
		let testPath = ''
		if (window.location.port == 3007) {
			testPath = 'http://test-newweb.educoder.net'
		}
		// var url = `${testPath}/api/v1/games/${ game.identifier }/cost_time`
		var url = `${testPath}/api/tasks/${ game.identifier }/cost_time${getRandomNumber()}`
	    window.$.ajax({
	        type: 'get',
	        url: url,
	        async: async, //IMPORTANT, the call will be synchronous
	        data: {
            time: game.cost_time
	        }
	    }).done((data) => {
	        console.log('complete');
	    });
	}

	onGamePassed(passed) {
		const { game } = this.state
		// 随便给个分，以免重新评测时又出现评星组件（注意：目前game.star没有显示在界面上，如果有则不能这么做）
		// game.star = 6;
		this.setState({
			game: update(game, {star: { $set: 6 }}),
			currentGamePassed: !!passed
		})
	}
	onTestSetHeaderClick(index) {
		// let { testSetsExpandedArray } = this.state;
		let testSetsExpandedArray;
		// 一次只打开一个
		if (this.state.testSetsExpandedArray[index] === false) {
			testSetsExpandedArray = testSetsExpandedArrayInitVal.slice(0);
		} else {
			testSetsExpandedArray = this.state.testSetsExpandedArray.slice(0);
		}
		testSetsExpandedArray[index] = !testSetsExpandedArray[index];
		this.setState({
			testSetsExpandedArray,
		})
	}

	onShowPrevStage() {

	}
	onShowNextStage() {
		window.__fetchAllFlag = false;
		console.log('onShowNextStage.........')
		// this.fetchAll('vznhx7mctwfq')
	}

	componentWillReceiveProps(newProps, oldProps) {
		var newStageId = newProps.match.params.stageId;
		if (!this.props || newStageId !== this.props.match.params.stageId) {
			window.__fetchAllFlag = false;
			this.fetchAll(newStageId)
		}
	}


	// praise_tread/praise_plus?obj_id=569&obj_type=Challenge&horizontal=true&game_praise=true
	/*
		TODO 旧的接口在未登录时的返回值
		//获取登录页面地址
var signinPath = '/';
var htmlvalue = '<div class="task-popup" style="width:480px;"><div class="task-popup-title clearfix"><h3 class="fl color-grey3">提示</h3></div>'+
        '<div class="task-popup-content"><p class="task-popup-text-center font-16 mt10 mb10">您还没有登录，请登录后再执行此操作，谢谢！</p></div><div class="task-popup-right-sure clearfix">'+
        '<a href="javascript:void(0);" onclick="hideModal();" class="task-btn">取消</a><a href="' + signinPath + '" class="task-btn task-btn-orange ml15">登录</a></div></div>';
pop_box_new(htmlvalue, 480, 182);
	*/
	praisePlus() {
		const { challenge, game } = this.state;
		let praise = true;
		const url = `/tasks/${game.identifier}/plus_or_cancel_praise.json`
		// const url = `/praise_tread/praise_plus?obj_id=${challenge.id}&obj_type=Challenge&horizontal=${praise}&game_praise=true`
		axios.post(url)
		  .then((response) => {

			    if (response.data) {
			    	const { praise_count, praise } = response.data;
			    	// challenge.praise_count = praise_tread_count;
			    	// challenge.user_praise = praise;
			    	this.setState({ challenge: update(challenge,
			    		{
			    			praise_count: { $set: praise_count },
			    			user_praise:  { $set: praise },
			    		})
			    	})
			    }

		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	}

	onPathChange(index, callback) {
		let { challenge } = this.state;
		// challenge = Object.assign({}, challenge)
		// challenge.pathIndex = index;
		this.setState({
			challenge: update(challenge, {pathIndex: { $set: index }}),
		}, () => {
			callback && callback()
		})
		// TODO load new path content
	}

	updateChallengePath = (path) => {
		const challenge = this.state.challenge;
		if (challenge.path === path) {
			return;
		}
		const { myshixun } = this.state;
		// myshixun.system_tip = false;


		challenge.path = path;
		const newChallenge = this.handleChallengePath(challenge);
		this.setState({ challenge: newChallenge,
			myshixun: update(myshixun, {system_tip: { $set: false }}),
		})
	}

	handleChallengePath(challenge) {
		if (challenge.path && typeof challenge.path === "string") {		// 多path的处理
  			let path = challenge.path.split('；');
  			_.remove(path, (item)=> !item)
  			if (path.length > 1) {
	  			challenge.path = path;
	  			challenge.multiPath = true;
  			} else {
  				challenge.path = challenge.path.replace('；', '').trim()	// 多path 改为单path 出现了  aaa.java；的情况
  				challenge.multiPath = false;
  			}
  		}
  		challenge.pathIndex = 0;
  		return challenge;
	}

	newResData2OldResData(newResData) {
		newResData.latest_output = newResData.last_compile_output
		// newResData.power
		newResData.record = newResData.record_onsume_time

		// 老版用的hide_code
		newResData.hide_code = newResData.shixun.hide_code;

		newResData.image_url = newResData.user.image_url
		newResData.grade = newResData.user.grade
		newResData.user_url = newResData.user.user_url
		newResData.username = newResData.user.name

		newResData.output_sets = {}
		// newResData.output_sets.had_test_count = newResData.test_sets_count
		newResData.output_sets.test_sets = newResData.test_sets 	// JSON.stringify()
		newResData.output_sets.test_sets_count = newResData.test_sets_count
		// newResData.output_sets.had_passed_testsests_error_count = newResData.sets_error_count
		newResData.output_sets.had_passed_testsests_error_count = newResData.test_sets_count
				- newResData.sets_error_count
		//			allowed_hidden_testset
		//			sets_error_count
		//			test_sets_count
		//			test_sets
		// had_passed_testsests_error_count
		//			test_sets
		//			test_sets

		return newResData
	}
	// 将若干数据重新组织一下
	_handleResponseData(resData_arg) {
		const resData = this.newResData2OldResData(Object.assign({}, resData_arg))
	    let challenge = resData.challenge;
	    challenge.isHtml = false;
  		challenge.isWeb = false;
  		challenge.isAndroid = false;
  		challenge.showLanguagePictrue = false;
  		challenge.hasAnswer = resData.has_answer;

	    let output_sets = resData.output_sets;
		if (resData.st === 0) {		// 代码题
	    	challenge = this.handleChallengePath(challenge)

	  		const mirror_name = (resData.mirror_name && resData.mirror_name.join)
	  				? resData.mirror_name.join(';') : (resData.mirror_name || '');
	  		if (mirror_name.indexOf('Html') !== -1) {
	  			challenge.isHtml = true;
	  			challenge.showLanguagePictrue = true;
	  		} else if (mirror_name.indexOf('Web') !== -1 || mirror_name.indexOf('JFinal') !== -1) {
	  			challenge.isWeb = true;
	  		} else if (mirror_name.indexOf('Android') !== -1) {
	  			challenge.isAndroid = true;
	  		}

	  		if (output_sets && output_sets.test_sets && typeof output_sets.test_sets == 'string') {
	  			const test_sets_array = JSON.parse("[" + output_sets.test_sets + "]");
	  			output_sets.test_sets_array = test_sets_array;
	  		} else {
	  			output_sets.test_sets_array = output_sets.test_sets
	  		}

	    } else {		// 选择题
	    	// 选择题题干markdown初始化
	    	const $ = window.$
			window.setTimeout(()=>{
				var lens = $("#choiceRepositoryView textarea").length;

		        for(var i = 1; i <= lens; i++){
		            window.editormd.markdownToHTML("choose_subject_" + i, {
		                htmlDecode: "style,script,iframe",  // you can filter tags decode
		                taskList: true,
		                tex: true,  // 数学公式
		                // flowChart: true,  // 默认不解析
		                // sequenceDiagram: true // 默认不解析
		            });
		        }
	        }, 400)
	    }
	    challenge.user_praise = resData.user_praise;
	    challenge.praise_count = resData.praise_count;
	    challenge.showWebDisplayButton = false;
    	resData.challenge = challenge;

	    // 将一些属性写到game上
  		let game = resData.game;
  		game.prev_game = resData.prev_game;
  		game.next_game = resData.next_game;
		if (game.status == 2) {
			// 已通关
			game.isPassThrough = true
		}
  		resData.game = game;

  		const { tpm_cases_modified, tpm_modified, tpm_script_modified, myshixun } = resData;
  		if (myshixun.system_tip) {
			// system_tip为true的时候 不弹框提示用户更新
  			resData.showUpdateDialog = false
  		} else {
  			let needUpdateScript = (tpm_modified || tpm_script_modified) && challenge.st === 0;
  			resData.showUpdateDialog = needUpdateScript || tpm_cases_modified
  		}

		/**
		email: "721773699@qq.com"
		grade: 213996
		identity: 1
		image_url: "avatars/User/1"
		login: "innov"
		name: "Coder"
		user_url: "/users/innov"
		 */
	    let user = resData.user;
  		user.username = resData.user.name;
  		user.user_url = `/users/${resData.user.login}`;
  		// user.image_url = resData.image_url;
  		user.is_teacher = resData.is_teacher;
  		resData.user = user;
  		this._handleUserAuthor(resData)
  		// TODO  测试
  		// resData.power = 0;

		resData.shixun.vnc = !!resData.vnc_url
		resData.shixun.vnc_evaluate = resData.vnc_evaluate

	    this.setState({
    		...resData,
    		currentGamePassed: false,
    		loading: false,
    		testSetsExpandedArray: testSetsExpandedArrayInitVal.slice(0),
    	})

	    window.document.title = resData.shixun.name

	    window.__myshixun = resData.myshixun;		// tpi_html_show需要用到
	}
	_handleUserAuthor(resData) {
		// tpi tpm权限控制
		// const EDU_ADMIN = 1       // 超级管理员
		// const EDU_SHIXUN_MANAGER = 2 // 实训管理员
		// const EDU_SHIXUN_MEMBER = 3  // 实训成员
		// const EDU_CERTIFICATION_TEACHER = 4 // 平台认证的老师
		// const EDU_GAME_MANAGER = 5     // TPI的创建者
		// const EDU_TEACHER = 6 // 平台老师,但是未认证
		// const EDU_NORMAL = 7  // 普通用户


		/**
		    EDU_ADMIN = 1       # 超级管理员
			EDU_BUSINESS = 2    # 运营人员
			EDU_SHIXUN_MANAGER = 3 # 实训管理员
			EDU_SHIXUN_MEMBER = 4  # 实训成员
			EDU_CERTIFICATION_TEACHER = 5 # 平台认证的老师
			EDU_GAME_MANAGER = 6     # TPI的创建者
			EDU_TEACHER = 7 # 平台老师,但是未认证
			EDU_NORMAL = 8  # 普通用户
		*/

		// myshixun_manager power is_teacher
		resData.power = 0
		resData.myshixun_manager = false
		// resData.is_teacher = false

		if (resData.user.identity === EDU_ADMIN) {
			resData.power = 1
			resData.myshixun_manager = true
		} else if (resData.user.identity === EDU_BUSINESS) {
			resData.power = 1
			resData.myshixun_manager = true
		} else if (resData.user.identity === EDU_SHIXUN_MANAGER) {
			resData.power = 1
			resData.myshixun_manager = true
		} else if (resData.user.identity === EDU_SHIXUN_MEMBER) {
			resData.power = 1
			resData.myshixun_manager = true
		} else if (resData.user.identity === EDU_CERTIFICATION_TEACHER) {
			resData.power = 1
			// 已认证老师允许跳关
			resData.myshixun_manager = true
			// resData.is_teacher = true

		} else if (resData.user.identity === EDU_TEACHER) {
			// resData.is_teacher = true
		} else if (resData.user.identity === EDU_NORMAL) {

		}
		return resData
	}

	fetchAll(stageId, noTimeout) {

		if (window.__fetchAllFlag == true ) {
			console.log('TPIContextProvider call fetchAll repeatly!')
			return;
		}
		// 切换关卡的时候，同步costTime
		this._updateCostTime(true);

		if (!stageId) {
			// stageId = 'zl6kx8f7vfpo';
			// http://localhost:3000/myshixuns/so5w6iap97/stages/zl6kx8f7vfpo
		}

		// var url = `/api/v1/games/${stageId}`
		var url = `/tasks/${stageId}.json`
		// {"status":1,"message":"undefined method `authenticate!' for #<Grape::Endpoint:0xc8c91c0>"}
		window.__fetchAllFlag = true;


		this.setState({
	    	loading: true,
	    	currentGamePassed: false,  // 切换game时重置passed字段
	    })

		// test
		// var data = {"st":0,"discusses_count":0,"game_count":3,"record_onsume_time":0.36,"prev_game":null,"next_game":"7p9xwo2hklqv","praise_count":0,"user_praise":false,"time_limit":20,"tomcat_url":"http://47.96.157.89","is_teacher":false,"myshixun_manager":true,"game":{"id":2192828,"myshixun_id":580911,"user_id":57844,"created_at":"2019-09-03T15:50:49.000+08:00","updated_at":"2019-09-03T15:51:05.000+08:00","status":2,"final_score":0,"challenge_id":10010,"open_time":"2019-09-03T15:50:49.000+08:00","identifier":"hknvz4oaw825","answer_open":0,"end_time":"2019-09-03T15:51:04.000+08:00","retry_status":0,"resubmit_identifier":null,"test_sets_view":false,"picture_path":null,"accuracy":1.0,"modify_time":"2019-09-03T15:23:33.000+08:00","star":0,"cost_time":14,"evaluate_count":1,"answer_deduction":0},"challenge":{"id":10010,"shixun_id":3516,"subject":"1.1 列表操作","position":1,"task_pass":"[TOC]\n\n---\n\n####任务描述\n\n\n数据集a包含1-10共10个整数，请以a为输入数据，编写python程序，实现如下功能：\n①\t用2种方法输出a中所有奇数\n②\t输出大于3，小于7的偶数\n③\t用2种方法输出[1,2,3,…10,11,…20]\n④\t输出a的最大值、最小值。\n⑤\t用2种方法输出[10,9,…2,1]\n⑥\t输出[1,2,3,1,2,3,1,2,3,1,2,3]\n\n\n####相关知识\n\n\n请自行学习相关知识\n\n\n---\n开始你的任务吧，祝你成功！","score":100,"path":"1-1-stu.py","st":0,"web_route":null,"modify_time":"2019-09-03T15:23:33.000+08:00","exec_time":20,"praises_count":0},"shixun":{"id":3516,"name":"作业1——Python程序设计","user_id":77620,"gpid":null,"visits":23,"created_at":"2019-09-03T14:18:17.000+08:00","updated_at":"2019-09-03T15:58:16.000+08:00","status":0,"language":null,"authentication":false,"identifier":"6lzjig58","trainee":1,"major_id":null,"webssh":2,"homepage_show":false,"hidden":false,"fork_from":null,"can_copy":true,"modify_time":"2019-09-03T14:18:17.000+08:00","reset_time":"2019-09-03T14:18:17.000+08:00","publish_time":null,"closer_id":null,"end_time":null,"git_url":null,"vnc":null,"myshixuns_count":3,"challenges_count":3,"use_scope":0,"mirror_script_id":20,"image_text":null,"code_hidden":false,"task_pass":true,"exec_time":20,"test_set_permission":true,"sigle_training":false,"hide_code":false,"multi_webssh":false,"excute_time":null,"repo_name":"p09218567/6lzjig58","averge_star":5.0,"opening_time":null,"users_count":1,"forbid_copy":false,"pod_life":0},"myshixun":{"id":580911,"shixun_id":3516,"is_public":true,"user_id":57844,"gpid":null,"created_at":"2019-09-03T15:50:49.000+08:00","updated_at":"2019-09-03T15:59:04.000+08:00","status":0,"identifier":"k36hm4rwav","commit_id":"f25e1713882156480fc45ce0af57eff395a5037f","modify_time":"2019-09-03T14:18:17.000+08:00","reset_time":"2019-09-03T14:18:17.000+08:00","system_tip":false,"git_url":null,"onclick_time":"2019-09-03T15:50:49.000+08:00","repo_name":"p53276410/k36hm4rwav20190903155049"},"user":{"user_id":57844,"login":"p53276410","name":"文振乾","grade":24624,"identity":1,"image_url":"avatars/User/57844","school":"EduCoder团队"},"tpm_modified":true,"tpm_cases_modified":false,"mirror_name":["Python3.6"],"has_answer":false,"test_sets":[{"is_public":true,"result":true,"input":"","output":"result of a:\n[1, 3, 5, 7, 9]\n[1, 3, 5, 7, 9]\nresult of b:\n[2, 4, 6, 8, 10]\nresult of c:\n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\nresult of d:\nThe minimum is:1\nThe maxium is:10\nresult of e:\n[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]\n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nresult of f:\n[10, 9, 8, 10, 9, 8, 10, 9, 8, 10, 9, 8]\n","actual_output":"result of a:\r\n[1, 3, 5, 7, 9]\r\n[1, 3, 5, 7, 9]\r\nresult of b:\r\n[2, 4, 6, 8, 10]\r\nresult of c:\r\n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\r\n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]\r\nresult of d:\r\nThe minimum is:1\r\nThe maxium is:10\r\nresult of e:\r\n[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]\r\n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\r\nresult of f:\r\n[10, 9, 8, 10, 9, 8, 10, 9, 8, 10, 9, 8]\r\n","compile_success":1,"ts_time":0.05,"ts_mem":8.77}],"allowed_unlock":true,"last_compile_output":"compile successfully","test_sets_count":1,"sets_error_count":0}
		// data.test_sets[0].actual_output = data.test_sets[0].actual_output.replace(/\r\n/g, '\n')
		// data.test_sets[0].output = data.test_sets[0].output.replace(/\r\n/g, '\n')
		// console.log(JSON.stringify(data))
		// data.shixun.vnc = true
		// data.vnc_url= "http://47.96.157.89:41158/vnc_lite.html?password=headless"

		// this._handleResponseData(data)
		// return

		axios.get(url, {
				// https://stackoverflow.com/questions/48861290/the-value-of-the-access-control-allow-origin-header-in-the-response-must-not-b
    			// withCredentials: true,
    		})
		  .then((response) => {
			    // {"status":1,"message":"Unauthorized. \u7528\u6237\u8ba4\u8bc1\u5931\u8d25."}

				window.__fetchAllFlag = false;

			    if (response.data.status == 403) {
					window.location.href = "/403";
			    	return;
			    }
			    if (response.data.status == 404) {
					// 如果第一次发生404，则隔1s后再调用一次本接口；（因为ucloud主从同步可能有延迟）
					if (!noTimeout) {
						setTimeout(() => {
							this.fetchAll(stageId, true)
						}, 1000)
						return;
					}
			    	window.location.href = '/myshixuns/not_found'
			    	return;
			    }

			    this._handleResponseData(response.data)

		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});

	}

	readGameAnswer(resData) {
		// game.final_score = resData.final_score;
		if (resData.final_score) {
			var game = this.state.game;
			this.setState({
				game: update(game, {final_score: { $set: resData.final_score }}),
				grade: resData.grade
			})
		} else {
			this.setState({
				grade: resData.grade
			})
		}

	}
	closeTaskResultLayer() {
		this.setState({
			game: (this.state.game.status == 2 ? update(this.state.game, {
				isPassThrough: { $set: true },
			}) : this.state.game) ,
			currentGamePassed: false
		})
	}
	onRunChooseTestFinish(response) {
		const { test_sets, challenge_chooses_count, choose_correct_num, grade, experience, gold, had_submmit, next_game } = response;
		response.had_submmit = true; // 是否已提交
		const { game } = this.state;
		let currentGamePassed = false
		if (challenge_chooses_count === choose_correct_num) {
			game.status = 2;
			// game.isPassThrough = true
			game.next_game = next_game;

			currentGamePassed = true;


			this._updateCostTime(true, true);
		}
		this.setState({
			choose_test_cases: response,
			grade: grade,

			game,
			next_game,
			currentGamePassed: currentGamePassed,
			currentPassedGameGainGold: gold,
			currentPassedGameGainExperience: experience,
		})
	}
	initDisplayInterval = () => {
		const challenge = this.state.challenge
		if (this.showWebDisplayButtonTimeout) {
			window.clearTimeout(this.showWebDisplayButtonTimeout)
		}
		this.showWebDisplayButtonTimeout = window.setTimeout(() => {
			this.setState({ challenge: update(challenge,
				{
					showWebDisplayButton: { $set: false },
				})
			})
			this.showWebDisplayButtonTimeout = null
		}, 61 * 1000)

		let remain = 60
		if (this.displayInterval) {
			window.clearInterval(this.displayInterval)
		}
		this.displayInterval = window.setInterval(() => {
			const button = $('#showWebDisplayButton');
			if (button.length) {
				button.html(`查看效果(${remain})`)
				if (remain == 0) {
					button.html('查看效果')
				}
			}
			if (remain == 0) {
				window.clearInterval(this.displayInterval)
				this.displayInterval = null
				return;
			}

			remain -= 1;
		}, 1000)
	}
	language_display(data) {
		const { game, tomcat_url } = this.state;
		const challenge = Object.assign({}, this.state.challenge)
		if(challenge.isWeb && data.port != -1) {
            // var $result = $("#php_display");
            challenge.showWebDisplayButton = true;	// ActionView处是否出现查看效果按钮
			this.initDisplayInterval()

            const path = challenge.web_route || challenge.path
            const webDisplayUrl = `${tomcat_url}:${data.port}/${path}`
            challenge.webDisplayUrl = webDisplayUrl
            challenge.showLanguagePictrue = true;	// 评测通过弹出层是否出现查看效果按钮
        }
		// else if(challenge.isAndroid && data.picture != 0){
        // 	// https://www.educoder.net/shixuns/qrcode?game_id=218589&_=1525571882782
        //     $.ajax({
        //         url: `/shixuns/qrcode?game_id=${game.id}`,
        //         dataType: 'script'
        //     });
        //     challenge.showLanguagePictrue = true;
        // }
		else if(data.picture != 0){
        	// 对应服务端erb文件为  _picture_display.html.erb
            // $.ajax({
            //     url: "/users/picture_show?game_id="+data.picture,
            //     cache: false,
            //     dataType: 'script'
            // });

			/**
				{
					"type": "image",
					"orignal_picture": [],
					"user_picture": [],
					"answer_picture": []
				}
			 */
			const url = `/tasks/${game.identifier}/picture_display.json`
			axios.get(url)
		  		.then((response) => {
					// response.data.type qrcode_str
					this.showEffectDisplay(response.data)
				})

            challenge.showLanguagePictrue = true;
        }
        this.setState({
        	challenge
        })
	}
	onRunCodeTestFinish(response) {
		console.log('onRunCodeTestFinish', response)
		const { test_sets, test_sets_count, test_sets_hidden_count, test_sets_public_count
			, had_test_count, had_passed_testsests_error_count, had_passed_testsests_hidden_count
			, had_passed_testsests_public_count, final_score, gold, experience, latest_output, status
			, had_done, score, tag_count, power, record, next_game, grade, picture,
			sets_error_count, last_compile_output, record_consume_time} = response;

		const { game } = this.state;

		const currentGamePassed = this.props.game !== 2 && status === 2



		// 评测通过了，立即同步costTime
		currentGamePassed && this._updateCostTime(true, true);


		const output_sets = {
			"test_sets": test_sets,
			"test_sets_array": test_sets,
	        "had_test_count": had_test_count || test_sets_count,
	        "test_sets_count": test_sets_count,
	        // "had_passed_testsests_error_count": had_passed_testsests_error_count,
	        "had_passed_testsests_error_count": test_sets_count - sets_error_count,
	        "test_sets_hidden_count": test_sets_hidden_count,
	        "test_sets_public_count": test_sets_public_count,
	        "had_passed_testsests_hidden_count": had_passed_testsests_hidden_count,
	        "had_passed_testsests_public_count": had_passed_testsests_public_count
		};
		// if (output_sets && output_sets.test_sets) {
  		// 	const test_sets_array = JSON.parse("[" + output_sets.test_sets + "]");
  		// 	output_sets.test_sets_array = test_sets_array;
  		// }

		//   检查是否编译通过
		let compileSuccess = false;
		if (test_sets && test_sets.length) {
			test_sets.some((item) => {
				if (item.compile_success) {
					compileSuccess = true;
					return true;
				}
			})
		}

		compileSuccess && this.language_display(response);
		if (currentGamePassed) {
			game.status = 2;
			// game.isPassThrough = true
			game.next_game = next_game;
		} else {
			this.showDialog({
				contentText: <div>
					<div>评测未通过</div>
					<div>详情请参见“测试结果”</div>
				</div>,
				isSingleButton: true
			})
		}


		this.setState({
			testSetsExpandedArray: testSetsExpandedArrayInitVal.slice(0), // 重置测试集展开状态
			currentGamePassed,
			currentPassedGameGainGold: gold,
			currentPassedGameGainExperience: experience,

			output_sets,
			game,
			next_game,

			latest_output: last_compile_output,
			record: record_consume_time,
			grade,
			had_done,

		})
	}
	resetTestSetsExpandedArray = () => {
		this.setState({
			testSetsExpandedArray: testSetsExpandedArrayInitVal.slice(0), // 重置测试集展开状态
		})
	}

	testSetUnlock() {
		const { game, challenge } = this.state;
		const url = `/tasks/${game.identifier}/check_test_sets.json`
		axios.get(url, {
    			// withCredentials: true,
    		})
		  .then((response) => {
				// TODO status -2 重复操作，直接解锁
			    if (response.data.test_sets == -1) {
			    	console.error('testSetUnlock失败！')
			    	this.showSnackbar(response.data.message)
			    	return;
			    } else {
			    	// 被扣除的金币，是负数
			    	const deltaScore = -challenge.score * 5;
					// output_sets
					let { output_sets } = this.state;
					output_sets = Object.assign({}, output_sets);
					// const test_sets_array = JSON.parse("[" + response.data.test_sets + "]");
	  				output_sets.test_sets_array = response.data.test_sets;
			    	this.setState({
						output_sets: output_sets,
			    		grade: this.state.grade + deltaScore,
			    		game : update(game, {test_sets_view: { $set: true }}),
			    		testSetsExpandedArray: testSetsExpandedArrayInitVal.slice(0)
			    	})
			    	this.handleGdialogClose();
			    }

		  	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	}

	handleSnackbarClose() {
		this.setState({
			snackbarOpen: false,
			snackbarVertical: '',
			snackbarHorizontal: '',
		})
	}
	// 全局的snackbar this.props.showSnackbar调用即可
	showSnackbar(text, vertical, horizontal) {
		this.setState({
			snackbarOpen: true,
			snackbarText: text,
			snackbarVertical: vertical,
			snackbarHorizontal: horizontal,
		})
	}

	/*
        TODO 写成HOC组件，更好复用
		全局的Dialog this.props.showDialog调用即可
		@param contentText  dialog显示的提示文本
		@param callback 	确定按钮回调方法
		@param moreButtonsRender  除了“确定”、“取消”按钮外的其他按钮
		@param okButtonText  “确定”按钮显示文本，如 继续查看
	*/
	showDialog(params) {
		const { contentText, callback, moreButtonsRender, okButtonText, isSingleButton } = params;

		this.dialogOkCallback = callback;
		this.moreButtonsRender = moreButtonsRender
		this.okButtonText = okButtonText;
		this.isSingleButton = isSingleButton;
		this.setState({
			gDialogOpen: true,
			gDialogContentText: contentText
		})
	}
	onGdialogOkBtnClick() {

		this.dialogOkCallback && this.dialogOkCallback();
		// this.setState({
		// 	gDialogOpen: true
		// })
	}
	handleGdialogClose = () => {
		this.setState({
			gDialogOpen: false
		})
	}
	render() {
		const { classes } = this.props;
		return (
				<TPIContext.Provider
					value={{
						...this.props,
						...this.state,
						resetTestSetsExpandedArray: this.resetTestSetsExpandedArray,
						onRunCodeTestFinish: this.onRunCodeTestFinish,
						onRunChooseTestFinish: this.onRunChooseTestFinish,
						testSetUnlock: this.testSetUnlock,

						onTestSetHeaderClick: this.onTestSetHeaderClick,

						readGameAnswer: this.readGameAnswer,

						onShowPrevStage: this.onShowPrevStage,
						onShowNextStage: this.onShowNextStage,

						praisePlus: this.praisePlus,
						onGamePassed: this.onGamePassed,
						closeTaskResultLayer: () => this.closeTaskResultLayer(),

						onPathChange: this.onPathChange,
						updateChallengePath: this.updateChallengePath,

						showSnackbar: this.showSnackbar,
						showDialog: this.showDialog,
						handleGdialogClose: () => this.handleGdialogClose(),

						onShowUpdateDialog: this.onShowUpdateDialog,
						updateDialogClose: this.updateDialogClose,

						match: this.props.match
					}}
				>
					<Dialog
						id="tpi-dialog"
			          	open={this.state.gDialogOpen}
						disableEscapeKeyDown={true}
			          	onClose={() => this.handleGdialogClose()}
			        >
				       	<DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
			          	<DialogContent id="dialog-content">
				            <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
					        	{this.state.gDialogContentText}
				            </DialogContentText>
			          	</DialogContent>
						  {/* mb20 加了有样式问题 */}
			          	<DialogActions className={""} id="dialog-actions">
										{ this.isSingleButton ? <div className="task-popup-submit clearfix"
														style={{ textAlign: 'center', 'margin-bottom': '14px'}}>
													<a  className="task-btn task-btn-orange"
														onClick={this.handleGdialogClose}
													>知道啦</a>
												</div> :
										<React.Fragment>
											<Button onClick={() => this.handleGdialogClose()} color="primary"
													className={`${classes.button} ${classes.buttonGray} ${classes.borderRadiusNone}`}>
												关闭
											</Button>
											<Button variant="raised" className={`${classes.button} ${classes.borderRadiusNone}`}
													onClick={() => this.onGdialogOkBtnClick() } color="primary" autoFocus>
														{ this.okButtonText ? this.okButtonText : '确定' }
											</Button>
										</React.Fragment>	}
										{this.moreButtonsRender && this.moreButtonsRender()}
			          	</DialogActions>
			        </Dialog>

					<Snackbar
						className={"rootSnackbar"}
			          	open={this.state.snackbarOpen}
			          	autoHideDuration={3000}
			          	anchorOrigin={{ vertical: this.state.snackbarVertical || 'top'
			          			, horizontal: this.state.snackbarHorizontal || 'center' }}
			          	onClose={() => this.handleSnackbarClose()}
			          	transition={Fade}
			          	SnackbarContentProps={{
			            	'aria-describedby': 'message-id',
			          	}}
			          	resumeHideDuration={2000}
			        	message={<span id="message-id">{this.state.snackbarText}</span>}
			        />
					{this.props.children}
				</TPIContext.Provider>
		)
	}
}

export default  CNotificationHOC() (withStyles(styles) (TPIContextProvider));



