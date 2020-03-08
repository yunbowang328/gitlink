import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { notification } from 'antd'
import update from 'immutability-helper'

import ImageLayer from '../page/layers/ImageLayer'

const $ = window.$
/* 需要的props:  
	shixun
		id
	myshixun 
		id
	challenge
		id
	user
		"image_url": user.image_url,
		"username": user.username,
	showSnackbar

	*/
/*
	这里提供props给WrappedComponent，用于封装特定的state和功能（评论列表）
	不要直接使用this.xxx调用WrappedComponent内的方法，尽量避免互相依赖，封装好后供不同场景使用（tpi、tpm）
*/
export function commentHOC(WrappedComponent) {
	// 这里如果extends WrappedComponent 会出现 WrappedComponent mount twice的问题
  return class II extends React.Component {
  	constructor(props) {
		super(props)
		
		// ------------------------------------
		this.createNewComment = this.createNewComment.bind(this)
		this.fetchCommentIfNotFetched = this.fetchCommentIfNotFetched.bind(this)
		this.replyComment = this.replyComment.bind(this)
		this.deleteComment = this.deleteComment.bind(this)
		this.commentPraise = this.commentPraise.bind(this)
		this.hiddenComment = this.hiddenComment.bind(this)
		this.rewardCode = this.rewardCode.bind(this)
		this.showNewReply = this.showNewReply.bind(this)
		this.newMessage = this.newMessage.bind(this)
		// ------------------------------------

		this.onPaginationChange = this.onPaginationChange.bind(this)

		this.state = {
			// 评论
			comments: [],
			comment_count_without_reply: 0,
			// 默认pageSize为10
			currentPage: 1,
			loadingComments: true,

			// 图片最大化
			showImage: false,
		  	imageSrc: '',
		}
	}

	// ----------------------------------------------------------------------------------------------评论 Start

	// ----------------------------------------------------------------------------------------------评论 Start
	onPaginationChange(page) {
		this.fetchComment(page)
		this.setState({
	        currentPage: page,
	    });
	}
	/*
	email: "1843820944@qq.com"
	grade: 2138
	image_url: "avatar/User/36497"
	login: "p24891375"
	name: "杨俊男"
	user_url: "/users/p24891375"
*/ 
	handleComments(comments, responseData) {
		comments.forEach(element => {
			if (element.children) {
				this.handleComments(element.children, responseData)
			}
			element.admin = responseData.all
			element.manager = element.manage

			element.username = element.author.name
			element.user_login = element.author.login
			element.image_url = element.author.image_url
			element.user_id = element.author.user_id
			
		});
	}
	responseDataParse(response) {
		const comments = response.data.comments
		this.handleComments(comments, response.data)
	}
	fetchComment(page = 1) {
		const { challenge, shixun, match } = this.props;
		// const url = `/api/v1/shixuns/${shixun.id}/shixun_discusses?page=${page-1}&container_type=Shixun`
		const url = 
			`/discusses.json?page=${page-1}&container_identifier=${shixun && shixun.identifier ?
				shixun.identifier : match.params.shixunId}&container_type=Shixun`
		
		this.setState({
			loadingComments: true,
		});

		// test
		// if (true) {
		if (false) {
	    	var data = {"children_list":[{"id":1165,"content":"\u7535\u8111\u6ca1\u6709pi\u554a","time":"4\u5929\u524d","position":2,"user_id":31542,"reward":null,"image_url":"avatars/User/b","username":"\u8d75\u94f6\u7fd4","user_login":"p81572036","shixun_id":61,"hidden":false,"manager":false,"praise_count":0,"user_praise":false,"admin":false,"children":null},{"id":1142,"content":"\u6700\u540e\u4e00\u9898\u4e09\u5929\u6253\u9c7c\uff0c\u4e24\u5929\u6652\u7f51\uff0c\u4e0d\u5e94\u8be5\u662f1.01*1.01*1.01*0.99*0.99\uff0c\u800c\u4e0d\u662f\u52a0\u5417\uff1f","time":"4\u5929\u524d","position":1,"user_id":33714,"reward":null,"image_url":"avatars/User/b","username":"\u843d\u5c18","user_login":"p52769048","shixun_id":61,"hidden":false,"manager":false,"praise_count":0,"user_praise":false,"admin":false,"children":[{"content":"\u672c\u5173\u5e76\u6ca1\u6709\u5199\u5230\u201c<span style=\"color:#333333;font-family:&quot;background-color:#FFFFFF;\">1.01*1.01*1.01*0.99*0.99</span>\u201d\uff0c\u4e0d\u77e5\u9053\u4f55\u6765\u6b64\u95ee\uff1f","time":"4\u5929\u524d","position":1,"reward":null,"image_url":"avatars/User/1","username":"Coder","user_id":1,"user_login":"innov","can_delete":false,"id":1144}]},{"id":1112,"content":"\u8fd9\u4e2a\u5b9e\u8bad\u5f88\u8d5e\uff01","time":"10\u5929\u524d","position":2,"user_id":12,"reward":null,"image_url":"avatars/User/12","username":"\u9ec4\u4e95\u6cc9","user_login":"Hjqreturn","shixun_id":61,"hidden":false,"manager":false,"praise_count":1,"user_praise":false,"admin":false,"children":null},{"id":1057,"content":"\u4e0d\u9519","time":"20\u5929\u524d","position":2,"user_id":30403,"reward":null,"image_url":"avatars/User/b","username":"Jimmy","user_login":"p69243850","shixun_id":61,"hidden":false,"manager":false,"praise_count":1,"user_praise":false,"admin":false,"children":null},{"id":975,"content":"q","time":"1\u4e2a\u6708\u524d","position":2,"user_id":30403,"reward":null,"image_url":"avatars/User/b","username":"Jimmy","user_login":"p69243850","shixun_id":61,"hidden":false,"manager":false,"praise_count":1,"user_praise":false,"admin":false,"children":[{"content":"\u4e0b\u6b21\u518d\u53d1\u65e0\u610f\u4e49\u7684\u5185\u5bb9\uff0c\u5c06\u88ab\u6263\u91d1\u5e01\u54e6","time":"1\u4e2a\u6708\u524d","position":2,"reward":null,"image_url":"avatars/User/1","username":"Coder","user_id":1,"user_login":"innov","can_delete":false,"id":980}]},{"id":974,"content":"k","time":"1\u4e2a\u6708\u524d","position":2,"user_id":30403,"reward":null,"image_url":"avatars/User/b","username":"Jimmy","user_login":"p69243850","shixun_id":61,"hidden":false,"manager":false,"praise_count":0,"user_praise":false,"admin":false,"children":[{"content":"\u4e0b\u6b21\u518d\u53d1\u65e0\u610f\u4e49\u7684\u5185\u5bb9\uff0c\u5c06\u88ab\u6263\u91d1\u5e01\u54e6","time":"1\u4e2a\u6708\u524d","position":2,"reward":null,"image_url":"avatars/User/1","username":"Coder","user_id":1,"user_login":"innov","can_delete":false,"id":981}]},{"id":859,"content":"\u5f88\u68d2\uff01\uff01\uff01","time":"1\u4e2a\u6708\u524d","position":4,"user_id":1,"reward":null,"image_url":"avatars/User/1","username":"Coder","user_login":"innov","shixun_id":61,"hidden":false,"manager":false,"praise_count":0,"user_praise":false,"admin":false,"children":null},{"id":802,"content":"\u4e0d\u9519\uff01","time":"2\u4e2a\u6708\u524d","position":1,"user_id":30403,"reward":null,"image_url":"avatars/User/b","username":"Jimmy","user_login":"p69243850","shixun_id":61,"hidden":false,"manager":false,"praise_count":1,"user_praise":false,"admin":false,"children":null},{"id":619,"content":"\u770b\u6765\u8001\u5e08\u5bf9\u9f50\u7528\u7684\u90fd\u662f\u7a7a\u683c","time":"5\u4e2a\u6708\u524d","position":3,"user_id":29145,"reward":null,"image_url":"avatars/User/b","username":"yang","user_login":"m02945638","shixun_id":61,"hidden":false,"manager":false,"praise_count":1,"user_praise":false,"admin":false,"children":null},{"id":553,"content":"<p>\r\n\t666\r\n</p>\r\n<p>\r\n\t<br />\r\n</p>","time":"6\u4e2a\u6708\u524d","position":4,"user_id":26838,"reward":null,"image_url":"avatars/User/b","username":"\u5189\u529b","user_login":"m54013296","shixun_id":61,"hidden":false,"manager":false,"praise_count":0,"user_praise":false,"admin":false,"children":null}],"disscuss_count":183}

			this.setState({
				comments: data.children_list,
				comment_count_without_reply: data.disscuss_count,

				currentPage: page,
				loadingComments: false,
			})
			return;
		}

		axios.get(url,
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	// test

		    	if (response.data) { 
		    		this.responseDataParse(response)
		    		this.setState({
						comments: response.data.comments,
						comment_count_without_reply: response.data.disscuss_count,

						currentPage: page,
						loadingComments: false,
					}, ()=>{
						// keditor代码美化
		    			window.prettyPrint()
					})
		    	}
		    	// console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}
	// 切换关卡时，清空state
	clearCommentsInState = () => {
		this.setState({ comments: [] })
	}
	fetchCommentIfNotFetched() {
		if (this.state.comments && this.state.comments.length) {
			return;
		}
		
		// http://localhost:3000/api/v1/shixuns/cz7yw3en/shixun_discusses?page=0	
		
		this.fetchComment();
	}
	// 新增父级评论
	createNewComment() {
		console.log('createNewComment...')

		const { challenge, shixun, showSnackbar } = this.props;
		let content = window._commentInput.html();
		if (!content || content.length === 0) {
			showSnackbar('必须填写内容！')
			return;
		}

		// const url = `/api/v1/discusses`
		const url = `/discusses.json`

		if(content != undefined){
            var beforeImage = content.split("<img");
            var afterImage = content.split("/>");
            if(beforeImage[0] == "" && afterImage[1] == ""){
                window.notice_box('不支持纯图片评论<br/>请在评论中增加文字信息');
                return;
            }
        }

		$("#new_message_submit_btn_" + this.props.challenge.shixun_id).hide();

        if (content) {	// 去掉尾部的回车换行
	        content = content.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');
	    }

		axios.post(url, {
					container_type: "Shixun",
				    container_id: shixun.id,
				    challenge_id: challenge.id,
				    content,
				    position: challenge.position
			    },
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	if (response.data.discuss) { 
		    		
					window._commentInput.html('');
					window._commentInput.afterBlur()
		   //  		this.setState({
					// 	runTesting: false,
					// })
		    		this.fetchComment()
		    	}
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
		return true;
	}
	_findCommentById(id, arg_comments) {
		let comments;
		if (!arg_comments) {
			comments = this.state.comments;
		} else {
			comments = arg_comments;
		}
		for(let i = 0; i < comments.length; i++) {
			if (id === comments[i].id) {
				return i;
			}
		}
	}
	replyComment(commentContent, id, editor) {
		// http://localhost:3000/api/v1/discusses/812/reply
		const { challenge, shixun, user, showSnackbar, match } = this.props;

		if (!commentContent || commentContent.length === 0) {
			showSnackbar('必须填写内容！')
			return;
		}
		// const url = `/api/v1/discusses/${id}/reply`
		const url = `/discusses/${id}/reply.json`
		if (commentContent) {
	        commentContent = commentContent.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');
	    }
	    if (!user.login && user.user_url) {
		    const loginAr = user.user_url.split('/')
		    user.login = loginAr[loginAr.length - 1]
	    }
		axios.post(url, {
				    content: commentContent,
					// TODO
					"container_id": match.params.shixunId,
					"container_type": "Shixun",
			    },
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	if (response.data.discuss) { 
		    		let newDiscuss = response.data.discuss;
		    		let { comments } = this.state;
		    		var commentIndex = this._findCommentById(id);
		    		let comment = comments[commentIndex]
						comment = Object.assign({}, comment)
		    		if (!comment.children ) {
		    			comment.children = []
		    		} else {
						comment.children = comment.children.slice(0);
					}
		    		// TODO userName iamge_url
		    		comment.children.push( {
		    			"can_delete": true,
	                    "content": commentContent,

	                    "image_url": user.image_url,
	                    "username": user.username,
	                    "user_login": user.login,
	                    "id": newDiscuss.id,
	                    "position": newDiscuss.position,
	                    "time": "1分钟前",
	                    "praise_count": newDiscuss.praise_count,
	                    
	                    "user_id": newDiscuss.user_id,
	                    
	                })

					comments = comments.slice(0)
	                comments[commentIndex] = comment

	                // ke
		            editor.html && editor.html('')
		            // md
		            if (editor.setValue) {
		              	editor.setValue('')
		              	const $ = window.$
		              	var view_selector = `.commentItemMDEditorView_${id}`
		              	$(view_selector).hide();
		            }  


		    		this.setState({
						// runTesting: false,
						comments: comments
					}, ()=>{
						// keditor代码美化
		    			editor.html && window.prettyPrint()
					})
		    	}
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}	
	hiddenComment(item, childCommentId) {
		const id = item.id
		const { challenge, shixun, user, showSnackbar, match } = this.props;
		// const url = `/api/v1/discusses/${id}/hidden`
		const url = `/discusses/${id}/hidden.json`

		const commentIndex = this._findCommentById(id);
		const { comments } = this.state;
		const comment = Object.assign({}, comments[commentIndex]);
		axios.post(url, {
				    hidden: !comment.hidden ? "1" : "0",
					container_identifier: match.params.shixunId || shixun.identifier
			    },
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	if (response.data.status === -1) { 
		    		showSnackbar(response.data.message)
		    		return;
		    	}
		    	if (response.data.status === 1) { 
		    		
		    		if (!childCommentId) {
							comment.hidden = !comment.hidden;
							const commentsCopy = this.state.comments.slice(0)
							commentsCopy[commentIndex] = comment
			    		this.setState({
			    			comments: commentsCopy
			    		})
		    		} else {	// TODO 目前子回复没hidden字段
		    			let childCommentIndex = this._findCommentById(childCommentId, comments[commentIndex].children);
		    			const childComment = comments[commentIndex].children[childCommentIndex]
		    			childComment.hidden = !childComment.hidden;
		    			this.setState({ comments })
		    		}
		    		
		    	}
		    	// {"message":"Couldn't find Discuss with id=911","status":-1}
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}
	deleteComment(parrentComment, childCommentId) {
		const { challenge, shixun } = this.props;
		let deleteCommentId = parrentComment.id
		if (childCommentId) {
			deleteCommentId = childCommentId;
		}
		// const url = `/api/v1/discusses/${deleteCommentId}`
		const url = `/discusses/${deleteCommentId}.json`

		axios.delete(url,
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	// TODO 删除成功或失败
		    	if (response.data && response.data.status === 1) { 
		    		const commentIndex = this._findCommentById(parrentComment.id);

		    		// https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
		    		if (!childCommentId) {
			    		this.setState((prevState) => ({
						    comments: update(prevState.comments, {$splice: [[commentIndex, 1]]})
						}))

			    		if (this.state.comments.length <= 5) {
			    			this.fetchComment()
			    		}
		    		} else {
		    			let comments = this.state.comments; 
						let newComments = Object.assign({}, comments)
		    			let childCommentIndex = this._findCommentById(childCommentId, newComments[commentIndex].children);
		    			newComments[commentIndex].children = update(newComments[commentIndex].children, {$splice: [[childCommentIndex, 1]]})
		    			this.setState({ newComments })
		    		}
		    	}
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}

	rewardCode(parrentComment, childComment, amount) {
		const { challenge, shixun, showSnackbar } = this.props;
		let handleComment = parrentComment
		if (childComment) {
			handleComment = childComment;
		}
		let handleCommentId = handleComment.id;
		// const url = `/api/v1/discusses/${handleCommentId}/reward_code`
		const url = `/discusses/${handleCommentId}/reward_code.json`

		axios.post(url, {
					// id: handleCommentId,

					// container_id: shixun.id,
					container_type: 'Discusses',
					score: amount,
					user_id: handleComment.user_id
				},
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	if (response.data && response.data.code) { 
		    		const commentIndex = this._findCommentById(parrentComment.id);
		    		let { comments } = this.state;
					const newComments = comments.slice(0)

		    		if (childComment) {
		    			const childCommentIndex = this._findCommentById(handleComment.id, parrentComment.children);
		    			const newChildComment = Object.assign({}, childComment);
		    			newChildComment.reward = response.data.code
						parrentComment = Object.assign({}, parrentComment)
						parrentComment.children = parrentComment.children.slice(0)
		    			parrentComment.children[childCommentIndex] = newChildComment

						newComments[commentIndex] = parrentComment;
						
			    		
		    		} else {
						const newComment = Object.assign({}, newComments[commentIndex]);
						newComment.reward = response.data.code;
						newComments[commentIndex] = newComment;
					}
					this.setState({
						comments: newComments
					})
		    	}
		    }).catch((error) => {
		    	console.log(error)
		    	showSnackbar('奖励失败，请联系系统管理员！')
		    })
	}

	// 评论点赞
	commentPraise(discussId) {
		const commentIndex = this._findCommentById(discussId);
		const { comments } = this.state;

		const { challenge } = this.props;
		// const url = `/api/v1/discusses/${discussId}/plus`
		const url = `/discusses/${discussId}/plus.json`
		axios.post(url, {
				    // id: discussId,
				    // container_id: challenge.id,
				    container_type: 'Discuss',	//Discuss
				    type: comments[commentIndex].user_praise === true ? 0 : 1,   //  "踩0；赞1"
			    },
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	if (response.data.praise_count === 0 || response.data.praise_count) { 
		    		const newComments = comments.slice(0)
					const comment = Object.assign({}, newComments[commentIndex])
					comment.user_praise = !comment.user_praise;
					comment.praise_count = response.data.praise_count;
					newComments[commentIndex] = comment;
		    		this.setState({
						comments: newComments
					})
		    	}
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}

	newMessage() {
		return; // newMessage 暂时不用了
		const { shixun, myshixun } = this.props;
		const url = `/api/v1/shixuns/${shixun.id}/new_message?container_type=Shixun&myshixun_id=${myshixun.id}`
		// this.setState({
		//     			gotNewReply: true
		//     		})
		axios.get(url,
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	const new_message = response.data.new_message;
		    	if (response.data.new_message) { 
		    		this.setState({
		    			gotNewReply: new_message
		    		})
		    	}
		    	// console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}

	showNewReply() {
		const { shixun, myshixun } = this.props;
		const commentId = 929 // TODO
		const url = `/api/v1/shixuns/${shixun.id}/anchor?container_type=Shixun&myshixun_id=${myshixun.id}&discuss_id=${commentId}`

		this.setState({
			loadingComments: true,
			gotNewReply: false,

		});
		axios.get(url,
			    {
			    	// withCredentials: true
			    }	    
		    ).then((response) => {
		    	const data = response.data;
		    	const new_message = data.new_message;

		    	this.setState({
					comments: data.children_list,
					comment_count_without_reply: data.disscuss_count,

					currentPage: data.page,
					loadingComments: false,

				}, () => {
					if (response.data.find_status) { // 没找到评论的话，默认会返回第一页的评论
						const comment_J = window.$(`#reply_content_${commentId}`);
						if (comment_J.length) {
							comment_J[0].scrollIntoView()
							comment_J.parents('.comment_item_cont').css('border', '1px solid #4CACFF')
						}
			    	}
				})		    	
		    	console.log(response)
		    }).catch((error) => {
		    	console.log(error)
		    })
	}

	// ----------------------------------------------------------------------------------------------评论 End

	// ----------------------------------------------------------------------------------------------评论 End

	componentDidMount() {	
		// commentsDelegateParent #game_left_contents #tab_con_4
		$(".commentsDelegateParent")
			.delegate(".J_Comment_Reply .comment_content img, .J_Comment_Reply .childrenCommentsView img","click", (event) => {
			
		  	const imageSrc = event.target.src
		  	// 非回复里的头像图片; 非emoticons
          	if (imageSrc.indexOf('/images/avatars/User') === -1 && 
              imageSrc.indexOf('kindeditor/plugins/emoticons') === -1 ) {  
		  		this.setState({
			  		showImage: true,
			  		imageSrc,
			  	})
		  	}
		});
	}
	onImageLayerClose = () => {
		this.setState({
			showImage: false,
		  	imageSrc: '',
		})
	}

		showNotification = (description, message = "提示", icon) => {
			const data = {
				message,
				description
			}
			if (icon) {
				data.icon = icon;
			}
			notification.open(data);
		}
    render() {
      return (
        <React.Fragment>
			<ImageLayer {...this.state} onImageLayerClose={this.onImageLayerClose}></ImageLayer>

	        <WrappedComponent {...this.props} {...this.state}
	        	createNewComment={this.createNewComment}
	      		fetchCommentIfNotFetched={this.fetchCommentIfNotFetched}
						clearCommentsInState={this.clearCommentsInState}
	      		replyComment={this.replyComment}
	      		deleteComment={this.deleteComment}
	      		commentPraise={this.commentPraise}
	      		hiddenComment={this.hiddenComment}
	      		rewardCode={this.rewardCode}
	      		onPaginationChange={this.onPaginationChange}
				    showNotification= { this.showNotification }
	      		newMessage={this.newMessage}
	      		showNewReply={this.showNewReply}
	        ></WrappedComponent>
        </React.Fragment>

      )
    }
  }
}
/*
	<div>
          <h2>
            HOC Debugger Component
          </h2>
          <p>
            Props
          </p>
          <pre>{stringify(this.props)}</pre>
          <p>
            State
          </p>
          <pre>{stringify(this.state)}</pre>
          {super.render()}
        </div>

*/