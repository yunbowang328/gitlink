import React, { Component } from 'react';

import LeftView from './LeftView'

import axios from 'axios'

import update from 'immutability-helper'

import { commentHOC } from '../../comment/CommentsHOC'

import ImageLayer from '../layers/ImageLayer'

import { getUrl, EDU_TEACHER } from 'educoder'

import _ from 'lodash'

let path = getUrl("/editormd/lib/")

const $ = window.$;

class LeftViewContainer extends Component {

	constructor(props) {
		super(props)
		
		this.tabIndexChange = this.tabIndexChange.bind(this)

		this.handleDialogClose = this.handleDialogClose.bind(this)
		this.handleDialogReadAnswer = this.handleDialogReadAnswer.bind(this)
		// ------------------------------------
		// this.createNewComment = this.createNewComment.bind(this)
		// this.fetchCommentIfNotFetched = this.fetchCommentIfNotFetched.bind(this)
		// this.replyComment = this.replyComment.bind(this)
		// this.deleteComment = this.deleteComment.bind(this)
		// this.commentPraise = this.commentPraise.bind(this)
		// this.hiddenComment = this.hiddenComment.bind(this)
		// this.rewardCode = this.rewardCode.bind(this)
		this.showNewReply = this.showNewReply.bind(this)
		// ------------------------------------


		// this.onPaginationChange = this.onPaginationChange.bind(this)

		this.state = {
			tabIndex: 0,
			dialogOpen: false,
			gameAnswer: '',
			

			// 评论
			// comments: [],
			// comment_count_without_reply: 0,
			// // 默认pageSize为10
			// currentPage: 1,
			// loadingComments: true,
			// gotNewReply: false,


		}
	}
	// ----------------------------------------------------------------------------------------------评论 Start

	// ----------------------------------------------------------------------------------------------评论 Start

	showNewReply() {

		this.setState({
			tabIndex: 3,
		});
		this.props.showNewReply();
	}

	// ----------------------------------------------------------------------------------------------评论 End

	// ----------------------------------------------------------------------------------------------评论 End
	tabIndexChange(tabIndex, notDoFetch) {
		if (this.props.loading === true) {
			return;
		}

		if ( tabIndex === 2 && this.state.gameAnswer === '') {	// 参考答案
			// 多级答案后换了接口
			// 选择题(st === 1)还是走以前的接口
			if ((this.props.st === 0)) {
				this.fetchIfCouldGetAnswerWithoutGoldForMultiLevelAnswer()
			} else if (this.props.st === 1) {
				this.fetchIfCouldGetAnswerWithoutGoldForChoose();
			}
			return;
		}
		if ( tabIndex === 3 && !notDoFetch ) {	// 评论
			this.props.fetchCommentIfNotFetched()
		}
		// TODO 2 参考答案     3 评论
		this.setState({
			tabIndex
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props) || !_.isEqual(this.state, nextState)) {
		   	return true
		} else {
		   	return false
		}
	}
	componentWillReceiveProps(newProps, newContext) {
		if ( !this.props.loading && newProps.loading ) {
			this.setState({ tabIndex: 0 })
			window['__task_md'] && window['__task_md'].setMarkdown('...')
		}

		if ( newProps.challenge && newProps.challenge.id && 
				(!this.props || !this.props.challenge.id || (newProps.challenge.id != this.props.challenge.id)) ) {

			// 切换关卡，清空comments
			this.props.clearCommentsInState();
			// TODO 尝试使用react-route解决这个问题
			// tabIndex
			// window.location.pathname.indexOf('comments') !== -1 &&
			// 	setTimeout(()=>{debugger;$('#tab_nav_4')[0].click();}, 500)

			var $ = window.$;

			// TODO 多次load katex
			// TODO 从前一题切换到下一题，前一题的过关任务会闪现后再出现下一题的过关任务，考虑将loading的状态置后改动？

			// 任务切换重置state      
			this.setState({
				gameAnswer : '',
				lockedAnswers: [],
				unlockedAnswers: [],
			})
			
			window['__answerMarkdown'] && window.__answerMarkdown.setMarkdown('...')

			// 编辑器已存在
			if (window['__task_md'] && $('#game_show_content #tab_con_1 .CodeMirror').length) {
				// 400ms后，等loading状态消失，调用setMarkdown才有效
				setTimeout(()=>{
					// 注意，如果md没完全初始化，调用setMarkdown会报this.cm.setValue空指针错误
					window['__task_md'].cm && window['__task_md'].setMarkdown(newProps.challenge.task_pass)
				}, 400)
				
				
				this._initPropaedeuticsMarkdown(newProps);
				return;
			} else {
				// window.editormd.loadKaTeX( ()=> {
					this._initMarkdown(newProps)
		        // });
	        }
		}
		// 切换了实训
		if ( newProps.shixun && newProps.challenge.shixun && (!this.props || (newProps.shixun.id != this.props.shixun.id)) ) {
			this.setState({
				gameAnswer: '',
				comments: [],
				comment_count_without_reply: 0,
				currentPage: 1,
				tabIndex: 0,
			})
		}
		
	}

	_initPropaedeuticsMarkdown(newProps) {
		// challenge
		if (!newProps.shixun) {
			return;
		}

		

		// TODO BUG 从选择题切换下一题到编程题，propaedeutics显示不出来
		// 如果watch设置为false，改变浏览器高度，editormd内容会消失
		if (!this.knowledge_md && newProps.shixun.propaedeutics) {
            this.knowledge_md = window.editormd("game_ready_knowledge", {
                htmlDecode: "style,script,iframe",  // you can filter tags decode
                taskList: true,

                mode: 'markdown',
                path: path,
                toolbar: false,
                readOnly: true,
                watch : true,
                markdown: newProps.shixun.propaedeutics,

                tex: true,  // 数学公式
                flowChart: false,  // 默认不解析
                sequenceDiagram: false, // 默认不解析

                // onload : function(){
		        	// this.previewing();	// 注释了这个后，另一个md的onload previewing也不触发了
		    	// }
            });
            window.knowledge_md = this.knowledge_md
        } else {
        	newProps.shixun.propaedeutics && this.knowledge_md.setMarkdown(newProps.shixun.propaedeutics)
        }
	}
	_initMarkdown(newProps) {
        this.task_md = window.editormd("game_task_pass", {
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            taskList: true,

            mode: 'markdown',
            path: path,
            toolbar: false,
            readOnly: true,
            watch : true,
            markdown: newProps.challenge.task_pass,

            tex: true,  // 数学公式
            flowChart: false,  // 默认不解析
            sequenceDiagram: false, // 默认不解析

            onload : function(){
            	try {
		        	this.previewing();
		        } catch(e) {
		        	this.previewing();
		        	console.error(e)
		        }
		        // 改动了editormd源码，codemirror对象存在的话就不重新加载codemirror脚本，避免merge被覆盖掉
		        // window.editormd.loadScript("js/merge.js", function() {

		        // });
		    }
        });
        window.__task_md = this.task_md;
        // 过关任务 imagelayer的处理：
        $("#game_task_pass").delegate("img", "click", (event) => {
          	const imageSrc = event.target.src

	        this.setState({
	          showImage: true,
	          imageSrc,
	        })
        });
        // 初始化知识背景
        this._initPropaedeuticsMarkdown(newProps);
        
	}
	onImageLayerClose = () => {
      this.setState({
        showImage: false,
        imageSrc: '',
      })
    }
	componentDidMount() {

		this.newMessageIntervalRet = setInterval(()=> {
			const { shixun, myshixun } = this.props;
			if (shixun && shixun.id) {
				// TODO 用了HOC后，会多执行一次interval，而且props里没有HOC里的方法
				this.props.newMessage && this.props.newMessage()
			}
		}, 1000 * 60 * 1)
			
	}

	componentWillUnmount() {
		this.newMessageIntervalRet && clearInterval(this.newMessageIntervalRet)
		$("#game_left_contents #tab_con_4").undelegate()
	}

	handleDialogClose() {
		this.setState({
			dialogOpen: false
		})
	}
	
	/**
		 1、返回一个或多个都有contents答案，直接显示
		 2、返回一个没content的答案，弹出老对话框
		 3、返回多个答案，部分有contents，直接显示列表，用户进一步解锁的时候再弹新对话框
		 4、返回多个没有contents的答案，直接弹出新对话框
	 */
	fetchIfCouldGetAnswerWithoutGoldForMultiLevelAnswer() {
		var getAnswerUrl = `/tasks/${this.props.game.identifier}/get_answer_info.json`
		axios.get(getAnswerUrl, {
    		})
		  	.then((response) => {
					response.data = response.data.message || response.data;
					if (response.data) {
						if (response.data.length === 0) {
							// 未设置答案
							this.props.showSnackbar('本关卡未设置答案。')
							return;
						}
						let unlockedAnswers = []
						let lockedAnswers = []
						if (!response.data.length) {
							// 只有一个答案时记录singleAnswerId，解锁时用
							this.setState({
								dialogOpen: true,
								isMultiLevelAnswer: false,
								singleAnswerId: response.data.answer_id
							})
							return;
						}
						const newAnswers = response.data.map((item, index) => {
							return {
								id: item.answer_id,
								name: item.answer_name,
								score: item.answer_score,
								contents: item.answer_contents,
								view_time: item.view_time
							}
						})
				    	newAnswers.forEach((item, index) => {
							if (item.contents) {
								unlockedAnswers.push(item)
							} else {
								lockedAnswers.push(item)
							}
						})

						this.setState({
							tabIndex: 2,
							lockedAnswers,
							unlockedAnswers,
							dialogOpen: unlockedAnswers.length === 0,
							isMultiLevelAnswer: newAnswers.length > 1
						}, () => {
							// unlockedAnswers.forEach( (item, index) => {
							// 	if (window[`tpiMDAnswer${index}`]) {
							// 		window[`tpiMDAnswer${index}`].setMarkdown(item.contents)
							// 	} else {
							// 		window[`tpiMDAnswer${index}`] = this._initAnswerMarkdown(item.contents, `tpiMDAnswer${item.id}`)
							// 	}
							// })
						})
					}
		 	})
			.catch(function (error) {
				console.log(error);
			});
	}
	// 选择题查看答案
	fetchIfCouldGetAnswerWithoutGoldForChoose() {
		const url = `/tasks/${this.props.game.identifier}/get_choose_answer.json`
		axios.get(url, {
    			// withCredentials: true,
    		})
		  	.then((response) => {

			  	if (response.data.status == 0) {
					this.props.showSnackbar(response.data.message)
			  		return;
			  	}
			  	/*
					将扣除XXX点金币，是否确认查看答案     

					已经过职业认证的教师可以免金币查看答案哟
					继续查看 立即认证（新开页）
			  	*/

					// 答案测试 TODO
			    // if (false && response.data.view_answer === true) {
			    if (response.data.choose_answers) {
			    	this.showAnswer(response.data.choose_answers)
			    } else if (response.data.status == 1) {
			    	// 三个角色   普通用户、未认证教师、已认证教师，这里要区分普通用户和未认证教师用户
			    	this.setState({
			    		dialogOpen: true,
			    	})
			    }
		 	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});

		return;
		// 查看是否有权限直接查看，true可以直接查看，false需要扣金币查看
		// var getAnswerUrl = `/api/v1/games/${this.props.game.identifier}/answer`;
		var getAnswerUrl = `/tasks/${this.props.game.identifier}/answer.json`
		axios.get(getAnswerUrl, {
    			// withCredentials: true,
    		})
		  	.then((response) => {

			  	if (response.data.status == 0) {
						this.props.showSnackbar(response.data.message)
			  		return;
			  	}
			  	/*
					将扣除XXX点金币，是否确认查看答案     

					已经过职业认证的教师可以免金币查看答案哟
					继续查看 立即认证（新开页）
			  	*/


					// 答案测试 TODO
			    // if (false && response.data.view_answer === true) {
			    if (response.data.view_answer === true) {
			    	this.showAnswer(response.data.answer)
			    } else {
			    	// 三个角色   普通用户、未认证教师、已认证教师，这里要区分普通用户和未认证教师用户
			    	this.setState({
			    		dialogOpen: true,
			    	})
			    }

		 	})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	}
	showUnlockAnswerDialog = (anwser) => {
		this.setState({
			dialogOpen: true,
		})
	}
	showAnswer(gameAnswer) {
		this.setState({
	    	tabIndex: 2,
			dialogOpen: false,
			gameAnswer,
	    }, () => {
	    	if (this.props.st === 1) {
	    		return;
	    	}
	    	// 编程题才需要用markdown处理
	    	// TODO 选择题切到编程题后，编程题答案markdown没显示出来
	    	gameAnswer = gameAnswer || '暂未提供答案'
	    	if (!window['__answerMarkdown']) {
	    		this._initAnswerMarkdown(gameAnswer); 
			} else {
				window.__answerMarkdown.setMarkdown(gameAnswer)
			}
		
	    	// 不能setMarkdown的写法：初始化answer
    		// window.answerMarkdown = window.editormd.markdownToHTML("game_answer_show", {
		    //     htmlDecode      : "style,script,iframe",  // you can filter tags decode
		    //     taskList        : true,
		    //     tex             : false,  // 数学公式
		    //     flowChart       : true,  // 默认不解析
		    //     sequenceDiagram : true // 默认不解析
		    // });
			
	    })
	}
	_initAnswerMarkdown(gameAnswer, domId) {
		window.__answerMarkdown = window.editormd(domId || "game_answer_show", {
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            taskList: true,

            mode: 'markdown',
            path: path,
            toolbar: false,
            readOnly: true,
            watch : true,
            markdown: gameAnswer,

            tex: true,  // 数学公式
            flowChart: false,  // 默认不解析
            sequenceDiagram: false, // 默认不解析

            onload : function(){
	        	this.previewing();
	        	// 为了解决切换一次关卡后，再点击答案，看不到答案的问题
	        	this.setMarkdown(gameAnswer)
	    	}
        });
	}
	handleMultiLevelAnswer = (selectID) => {
		let paramSelectID = selectID
		if (!selectID) {
			paramSelectID = this.state.lockedAnswers[0].id
		}
		const url = `/tasks/${this.props.game.identifier}/unlock_answer.json?answer_id=${paramSelectID}`
		axios.get(url, {
		})
		.then((response) => {
			if (response.data.status != -1) {
				const lockedAnswers = this.state.lockedAnswers
				const challenge_score = this.props.challenge.score
				// 前端计算扣除金币数
				let goldToMinuse = 0
				if (this.state.isMultiLevelAnswer) {
					for (let i = 0; i < lockedAnswers.length; i++) {
						let answer = lockedAnswers[i];
						goldToMinuse = goldToMinuse + answer.score * challenge_score / 100;
						if (answer.id == paramSelectID) {
							break;
						}
					}
				} else {
					goldToMinuse = challenge_score
				}

				this.props.readGameAnswer({
					grade: this.props.grade - goldToMinuse
				})
				
				this.fetchIfCouldGetAnswerWithoutGoldForMultiLevelAnswer()
				this.setState({
					tabIndex: 2,
					dialogOpen: false,
				})
			} else {
				this.props.showSnackbar(response.data.message)
			}
			// TODO 改动 
			// lockedAnswers
			// unlockedAnswers
		
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	getChooseAnswer = () => {
		const url = `/tasks/${this.props.game.identifier}/unlock_choose_answer.json`
		axios.get(url, {
    			// withCredentials: true,
    		})
		  	.then((response) => {
			  	// {message: "您没有足够的金币", status: -1}

			  	if (response.data.status == 0) {
					this.props.showSnackbar(response.data.message)
			  		return;
			  	}

			    const gameAnswer = response.data.choose_answers;
			    // const final_score = response.data.final_score;
			    const grade = response.data.grade;

			    this.props.readGameAnswer({
			    	// final_score,
			    	grade: this.props.grade - this.props.challenge.score
			    })

			    this.showAnswer(gameAnswer)
			    
			})
		  	.catch(function (error) {
		    	console.log(error);
		  	});
	}
	handleDialogReadAnswer(selectID) {	
		if (this.props.st === 1) {
			// 选择题
			this.getChooseAnswer()
		} else {
			this.handleMultiLevelAnswer(selectID || this.state.singleAnswerId)
		}
	}
	createNewComment = (page) => {
		const flag = this.props.createNewComment(page)
		if (flag === true) {
			this.tabIndexChange(3, true)
		}
	}
//  /shixuns/mnf6b7z3/shixun_discuss?challenge_id=88
  	render() {
  		const { challenge } = this.props
			const { tabIndex } = this.state;
	    return (
	    	<React.Fragment>
            <ImageLayer {...this.state} onImageLayerClose={this.onImageLayerClose}></ImageLayer>

		      	<LeftView {...this.props} tabIndexChange={this.tabIndexChange} {...this.state} tabIndex={tabIndex}
		      		handleDialogReadAnswer={this.handleDialogReadAnswer} handleDialogClose={this.handleDialogClose}
					
		      		showNewReply={this.showNewReply}
							showUnlockAnswerDialog={this.showUnlockAnswerDialog}
		      		createNewComment={this.createNewComment}

		      	></LeftView>
	      	</React.Fragment>
	    );
  	}
}
/*
	createNewComment={this.createNewComment}
		      		fetchCommentIfNotFetched={this.fetchCommentIfNotFetched}
		      		replyComment={this.replyComment}
		      		deleteComment={this.deleteComment}
		      		commentPraise={this.commentPraise}
		      		hiddenComment={this.hiddenComment}
		      		rewardCode={this.rewardCode}
		      		showNewReply={this.showNewReply}
		      		onPaginationChange={this.onPaginationChange}

*/

export default commentHOC( LeftViewContainer );
