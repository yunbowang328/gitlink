import React, { Component } from 'react';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import { getImageUrl, toPath } from 'educoder';

import Input, { InputLabel } from 'material-ui/Input';

import { FormControl, FormHelperText } from 'material-ui/Form';

import CommentItemKEEditor from './CommentItemKEEditor';
import CommentItemMDEditor from './CommentItemMDEditor';

import './Comment.css'
import Modals from '../modals/Modals'
import {  InputNumber } from 'antd'

/*
	-------------------------- 样式相关
	class 改成 className
	style 需要传入json对象				style="margin:0px">  ->   style={{ margin:"0px" }}>
	margin-top -> marginTop
	onclick -> onClick         驼峰
	
	-------------------------- 模板语法相关
	页面都在前端组装、渲染
		rails模板的 if等逻辑改成js实现
		客户端需要能判断 User.current.manager_of_shixun?(comment.dis_id)
	
	-------------------------- 现有ui控件的使用方式
	方案1: 换成对应的react组件，然后再调用(控件简单时推荐)
	方案2: 在react环境中使用若干jquery插件(控件复杂，又无react环境下的替代方案时考虑使用)
	
	-------------------------- 
	需要服务端提供对应的rest api
	

*/

const _origin = window.location.origin;


/*
	tpi讨论、交流问答帖子详情讨论、课堂讨论的公用模块:
	https://www.educoder.net/tasks/n2ejvaowk6l9
	https://www.educoder.net/forums/2629
	注意不同模块使用时的参数的不同		usingAntdModal onlySuperAdminCouldHide isChildCommentPagination等等

	用到的props: 
		user   user_url image_url
		
		loadingComments--
		comment_count_without_reply	
		currentPage
		comments

		buttonText  发送按钮 显示文本

		showRewardButton 是否显示奖励按钮
		showHiddenButton 是否显示隐藏按钮

		onlySuperAdminCouldHide 只有超级管理员才显示隐藏、取消隐藏
		isChildCommentPagination  是否子回复分页
		loadMoreChildComments function 加载所有子回复

		usingAntdModal 是否使用antd的弹框
		
		接口
		deleteComment			删除
		onPaginationChange    翻页变化
		commentPraise			点赞
		hiddenComment			隐藏
		rewardCode				奖励

*/
class Comments extends Component {
	constructor(props) {
		super(props)

		this.handleDialogClose = this.handleDialogClose.bind(this)
		this.handleGoldRewardDialogClose = this.handleGoldRewardDialogClose.bind(this)

		this.state = {
			dialogOpen: false,
			goldRewardDialogOpen: false,
			goldRewardInput: '',

			showReplyEditorFlag: false,	// false->true or true->false时切换editor显示或隐藏
			currentReplyComment: null
		}
	}
	componentWillUnmount() {
		const $ = window.$;
		$(document).off("onReply");
	}
	componentDidMount() {
		setTimeout(()=>{
			const $ = window.$;
			// 绑定后会自动off？ 加timeout试试
			$(document).on("onReply", (e, args)=>{
				const { commentContent, id, editor } = args;

				this.props.replyComment(commentContent, id, editor)
			});
		}, 1000)
		
	}
	initReply(comment) {
		this.props.initReply && this.props.initReply(comment)
		// 如果配置的使用kindEditor
		if (window.__useKindEditor === true) {
			const { user } = this.props;
			console.log('initReply ', comment)

			const $ = window.$;
			var id = comment.id
			var reply_message_el = `#reply_message_${id}`
			var reply_iconup_el = `#reply_iconup_${id}`
			if($(reply_message_el).html() == "") {
			    $(".reply_to_message").html("");
			    $(reply_message_el).html(`<div className=\"orig_reply_box borderBottomNone reply_to_message\" id=\"reply_to_message_${id}\">\n      <div class=\"homepagePostReplyPortrait mr15 imageFuzzy fl\" id=\"reply_image_${id}\"><a href=\"${user.user_url}\" target=\"_blank\" alt=\"用户头像\"><img alt=\"0?1442652658\" height=\"33\" src=\"${_origin}/images/${user.image_url}\" width=\"33\" /><\/a><\/div>\n      <div class=\"orig_textarea fl\" style=\"margin-bottom: 0px\">\n        <div nhname=\'new_message_${id}\'>\n              <form accept-charset=\"UTF-8\" action=\"/discusses?challenge_id=118&amp;dis_id=61&amp;dis_type=Shixun\" data-remote=\"true\" id=\"new_comment_form\" method=\"post\"><div style=\"margin:0;padding:0;display:inline\"><input name=\"utf8\" type=\"hidden\" value=\"&#x2713;\" /><input name=\"authenticity_token\" type=\"hidden\" value=\"HJTbMpfI8LKUpwghfkvgB2SaMmcIVyVdAezyKmzJ7FU=\" /><\/div>\n                  <input type=\"hidden\" id=\"dis_reply_id\" name=\"reply_id\" value=\"${id}\">\n                  <div nhname=\'toolbar_container_${id}\'><\/div>\n                  <textarea placeholder=\"有问题或有建议，请直接给我留言吧！\" id=\"comment_news_${id}\" style=\"display: none\" nhname=\'new_message_textarea_${id}\' name=\"content\"><\/textarea>\n                  <a id=\"new_message_submit_btn_${id}\" href=\"javascript:void(0)\" onclick=\"this.style.display=\'none\'\" class=\"mt10 task-btn task-btn-orange fr\">${this.props.buttonText || '发送'}<\/a>\n                  <div class=\"cl\"><\/div>\n                  <p nhname=\'contentmsg_${id}\'><\/p>\n<\/form>        <\/div>\n        <div class=\"cl\"><\/div>\n      <\/div>\n  <div class=\"cl\"><\/div>\n<\/div>\n`);	//" ide语法识别
			    $(reply_iconup_el).show();
			    $(function(){
			        window.sd_create_editor_from_data(id ,null,"100%", "Discuss");
			    });
				
			}else {
				if ($(reply_message_el).is(':visible')) {
					$(reply_message_el).hide();
				} else {
					$(reply_message_el).show();
				}
			    // $(reply_message_el).html("");
			    
			    // $(reply_iconup_el).hide();
			}
		} else {			// MD
			this.setState({
				currentReplyComment: comment,
				showReplyEditorFlag: !this.state.showReplyEditorFlag
			})		
		}
	}
	// enableReplyTo
	// onClick={() => this.replyTo(item.user_id)}
	replyTo = (toUserId) => {

	}
	renderChildenComments(comment) {
		if (!comment.children || comment.children.length === 0) {
			return ''
		}
		const { user } = this.props;
		let childCommentsElement = comment.children.map((item, index) =>{
			let _content = this.parseCommentContent(item.content);

			return (
				<div key={index} className="childComment" >
				<div className="J_Comment_Info clearfix mt3">
					<div className="t_info fl">
						<a href={`${_origin}/users/${item.user_login}`} className="content-username hide fl">
							{item.username}
						</a>
						<span className="t_area fl">{item.time}</span>
						{/* { item.position ? <span className="fl color-light-green font-14 ml15">[第{item.position}关]</span> : ""} */}
						{	
							item.reward ?
							<Tooltip title={ `已奖励金币${item.reward}` } disableFocusListener={true}>
								<a href="javascript:void(0);" style={{ marginLeft: '20px', cursor: 'default'}}
									className={`rewarded color-grey-8 font-12 fl ${ item.admin === true ? '': 'normalUser'}`}
								>
									<i className="iconfont icon-gift mr5 color-orange fl" style={{display: 'inline'}}></i><span className="fl">{item.reward}</span>
								</a>
							</Tooltip> : ''
						}
					</div>

					<p className="fr  orig_reply lineh-20">
							<span id="hidden_discuss_btn_952">
							</span>

							{this.props.showRewardButton != false && comment.admin === true ? 
								<a href="javascript:void(0);" className="color-grey-8" onClick={() => this.showGoldRewardDialog(comment, item) }>
									<Tooltip title={ "给TA奖励金币" } disableFocusListener={true}>
										<i className="iconfont icon-jiangli fl"></i>
									</Tooltip>
								</a>
							:""}

							{/*子回复还没hidden字段*/}
							{false && comment.admin === true ? 
									<Tooltip title={ item.hidden ? "取消隐藏" : "隐藏评论" }>
									<a href="javascript:void(0);" className="color-grey-8" onClick={() => this.onCommentBtnClick(comment, item, item.hidden ? 'hiddenCancel' : 'hidden') }>
										<i className={`fa ${item.hidden ? 'fa-eye' : 'fa-eye-slash'} mr5`}></i>
									</a>
									</Tooltip>
							:""}

							{/* 新版user_id不准，获取方式不对 */}
							{ comment.admin === true || item.can_delete || item.user_id === user.user_id || item.user_login == user.login ? 
								<a href="javascript:void(0);" className="color-grey-8" id="delete_reply_118_952" onClick={() => this.onCommentBtnClick(comment, item, 'delete') }>
									<Tooltip title={ "删除" } disableFocusListener={true}>
										<i className="iconfont icon-shanchu mr5"></i>
									</Tooltip>
								</a>
              : ''}

                    {/*
                        <span className="ml5 mr5 color-grey-8">|</span>

                    	<span className="reply_praise_count_952">
                            <a href="/praise_tread/praise_plus?obj_id=952&amp;obj_type=Discuss&amp;type=reply&amp;user_activity_id=952" data-remote="true" className="fr mr5 color-grey-8" data-tip-down="点赞">
      							<i className="fa fa-thumbs-up mr5"></i>赞
    							
      							<span className="ml5 fr"></span>
								</a>

                    	</span>*/}
                  	</p>

					{/* currentUser.id == item.creator_user.id && (
						<p className="fr mr10 orig_repll">
							<span id={`hidden_discuss_btn_${item.id}`}>
								<a href="javascript:void(0);" className="color-grey-8" onClick={ this.onCommentBtnClick(comment, item, 'delete') } >
									<i className="far fa-trash-alt mr5"></i>删除
								</a>
                    			<span className="ml5 mr5 color-grey-8">|</span>
							</span>
						</p>
					)*/}
				</div>

					<div className="comment_content  clearfix" id={`reply_content_${item.id}`}>
						<div className="color-grey-3" id={`reply_content_${item.id}`}>
							<div className={"break_word_comments markdown-body"} dangerouslySetInnerHTML={{__html: _content}}></div>
							<div className="cl"></div>
						</div>
					</div>
				</div>

				)
		})
		return childCommentsElement
	}
	parseCommentContent = (oldContent) => {
		if (oldContent && oldContent.startsWith('<') && oldContent.endsWith('>')) {
		} else if (window.$('#md_div').length) {	// 有这个临时处理md内容的dom
			window.$('#md_div').html('')
			// markdown to html
			try {	
				var markdwonParser = window.editormd.markdownToHTML("md_div", {
						markdown: oldContent,
						emoji: true,
										htmlDecode: "style,script,iframe",  // you can filter tags decode
										taskList: true,
										tex: true,  // 默认不解析
										flowChart: true,  // 默认不解析
										sequenceDiagram: true // 默认不解析
						});
				oldContent = window.$('#md_div').html()
			} catch (e) {
				// TODO 可能公式parse时报错了
				console.error(e)
			}
		}
		return oldContent;
	}
	renderComments() {
		let { comments, currentUser, deleteComment, commentPraise, hiddenComment, user } = this.props;
		const { showReplyEditorFlag, currentReplyComment } = this.state;
		if (!comments || comments.length === 0) {
			return;
		}
		// "https://www.educoder.net/users/m02945638"
		let commentsElement = comments.map((item, index) => {
			let _content
		
			_content = this.parseCommentContent(item.content);
			
			return (
				<div className="comment_item_cont df clearfix" key={index}>
					<div className="J_Comment_Face fl">
						<a href={`${_origin}/users/${item.user_login}`} target="_blank">
							<img alt="用户头像" height="50" src={getImageUrl(`images/${item.image_url}`)} width="50"/>
						</a>
					</div>

					<div className="t_content fl">
						<div className="J_Comment_Reply">
							<div className="comment_orig_content" style={{ margin:"0px" }}>
								

								<div className="J_Comment_Info clearfix mt3">
									<div className="t_info fl">
										<a href={`${_origin}/users/${item.user_login}`} className="content-username hide fl">
											{item.username}
										</a>
										<span className="t_area fl">{item.time}</span>
										{ item.position && <span className="fl color-light-green font-14 ml15">[第{item.position}关]</span> }
										{ item.game_url ? 
											<Tooltip title={ `点击查看TA的代码页面` } disableFocusListener={true}>
												<a href={item.game_url} target="_blank" className="fl font-14 ml15"
														style={{ color: "#4CACFF", cursor: "pointer" }}
												>查看</a>
											</Tooltip> : ""}

										{	
											item.reward ?
											<Tooltip title={ `已奖励金币${item.reward}` } disableFocusListener={true}>
												<a href="javascript:void(0);" style={{ marginLeft: '20px', cursor: 'default'}}
														className={`rewarded color-grey-8 font-12 fl ${ item.admin === true ? '': 'normalUser'}`}
												>
													<i className="iconfont icon-gift mr5 color-orange fl"></i><span className="fl">{item.reward}</span>
												</a>
											</Tooltip> : ''
										}
									</div>

									{/* currentUser.id == item.creator_user.id && (
										<p className="fr mr10 orig_repll">
											<span id={`hidden_discuss_btn_${item.id}`}>
												<a href="javascript:void(0);" className="color-grey-8" onClick={ deleteComment.bind(this, item, index) } >
													<i className="far fa-trash-alt mr5"></i>删除
												</a>
	                                			<span className="ml5 mr5 color-grey-8">|</span>
											</span>
										</p>
									)*/}
								</div>

								<div className="comment_content  clearfix" id={`reply_content_${item.id}`}>
									<div className="color-grey-3" id={`reply_content_${item.id}`}>
										{/* 改成后端返回了的，都是要显示的，不管hidden的值是true还是false */}

										{/* { item.hidden && ((this.props.onlySuperAdminCouldHide && !item.isSuperAdmin) 
												|| !this.props.onlySuperAdminCouldHide && item.admin === false && (item.manager === false || item.manager == undefined))
											? <p className="color-orange font-16">违规评论已被屏蔽！</p>
											:  */}
											<div  className={"break_word_comments  markdown-body"} dangerouslySetInnerHTML={{__html: _content}}></div>
										{/* } */}
										<div className="cl"></div>
									</div>
								</div>
								<div className="childrenCommentsView">
									{(item && item.children && item.children.length) ? <div className="trangle"></div>: ''}
									{this.renderChildenComments(item)}
									{ item.isAllChildrenLoaded != true && item.children && this.props.isChildCommentPagination == true && item.child_message_count > 5? 
										<Tooltip title={ "点击查看更多回复" } disableFocusListener={true}>
											<div className="loadMoreChildComments" onClick={() => {this.props.loadMoreChildComments && this.props.loadMoreChildComments(item)}}>
												<i className="iconfont icon-xiajiantou"></i>
											</div>
										</Tooltip>
									: ''}
								</div>
								{/*mr10 */}
								<p className="fr orig_reply">
										<span id="hidden_discuss_btn_952">
										</span>

										{/* && !item.reward  */}
										{this.props.showRewardButton != false && item.admin === true ? 
											<a href="javascript:void(0);" className="color-grey-8 fl mt2" onClick={() => this.showGoldRewardDialog(item) }>
												<Tooltip title={ "给TA奖励金币" } disableFocusListener={true}>
													<i className="iconfont icon-jiangli mr5 fl"></i>
												</Tooltip>
											</a>
										:""}

										{ this.props.showHiddenButton == true 
											&& (this.props.onlySuperAdminCouldHide && item.isSuperAdmin || !this.props.onlySuperAdminCouldHide && item.admin === true) ? 
										<Tooltip title={ item.hidden ? "取消隐藏" : "隐藏评论" } disableFocusListener={true}>
										<a href="javascript:void(0);" className="color-grey-8 fl mt1" onClick={() => this.onCommentBtnClick(item, '', item.hidden ? 'hiddenCancel' : 'hidden') }>
											<i className={` ${item.hidden ? 'iconfont icon-yincangbiyan' : 'fa fa-eye'} mr5`}></i>
										</a>
										</Tooltip>
										:""}

	                                
	                                
										{ item.admin && ( !item.children || item.children.length === 0 )? 
	                    	<a href="javascript:void(0);" className="color-grey-8" onClick={() => this.onCommentBtnClick(item, '', 'delete') }>
													<Tooltip title={ "删除" } disableFocusListener={true}>
														<i className="iconfont icon-shanchu mr5"></i>
													</Tooltip>
												</a>	: '' }

	                                {/* <span className="ml5 mr5 color-grey-8">|</span>*/}
	                                
										{(this.props.showReply == undefined || this.props.showReply == true) && <a href={`javascript:void(0)`} className="color-grey-8"
												onClick={() => this.initReply(item) } >
											<Tooltip title={ "回复" }>
												<i className="iconfont icon-huifu1 mr5"></i>
											</Tooltip>
										</a>}
	                              	

										{/* <span className="ml5 mr5 color-grey-8">|</span>*/}
										<span className="reply_praise_count_952">
											<Tooltip title={ item.user_praise ? "取消点赞" : "点赞" }>
												<a href={`javascript:void(0)`} className={`fr mr5  ${item.user_praise ? 'color-orange03' : 'color-grey-8'}`} onClick={()=>commentPraise(item.id)}>
														<i className={ item.user_praise ? "iconfont icon-dianzan mr3" : "iconfont icon-dianzan-xian mr3" }></i>
													
														<span className="fr font-14" style={{ marginTop: '1px'}}>{item.praise_count?item.praise_count:''}</span>
												</a>
												</Tooltip>
										</span>
	              </p>
				  {/* __useKindEditor暂时没用到了，TODO 可以去掉 */}
								{ window.__useKindEditor ? <CommentItemKEEditor showReplyEditorFlag={showReplyEditorFlag} 
		                          	currentReplyComment={currentReplyComment}
		                          	item={item}
		                          	user={user}
		                          >
		                          </CommentItemKEEditor>
		                          :
		                          <CommentItemMDEditor showReplyEditorFlag={showReplyEditorFlag} 
		                          	currentReplyComment={currentReplyComment}
		                          	item={item}
		                          	user={user}
									buttonText={this.props.buttonText}
		                          >
		                          </CommentItemMDEditor>
		                      }
		                          {/* <div id={`reply_message_${item.id}`} className="reply_to_message"></div> */}
		                        
							</div>
						</div>
					</div>
				</div>
			)
		})
		/*
			/users/reply_to?reply_id=${item.id}&amp;type=Challenge&amp;user_activity_id=118
		*/
		/*	
			onclick="delete_confirm_box_2('<%= discuss_path(comment, :challenge_id => @game_challenge) %>', '确定要删除该条回复吗？')"
			delete按钮
			id=`delete_reply_<%=@game_challenge.id %>_<%=comment.id %>`

		*/
		return commentsElement;
	}

	onCommentBtnClick(comment, childComment, dialogType) {
		this.comment = comment;
		this.childComment = childComment;
		this.setState({dialogOpen: true, dialogType: dialogType})
	}
	handleDialogClose() {
		this.setState({
			dialogOpen: false
		})
	}
	onDialogOkBtnClick = () => {

		const { deleteComment, hiddenComment } = this.props;
		const { dialogType } = this.state;
		if (dialogType === 'delete') {
			deleteComment(this.comment, this.childComment ? this.childComment.id : '')
		} else if (dialogType === 'hidden' || dialogType === 'hiddenCancel' ) {
			hiddenComment(this.comment, this.childComment ? this.childComment.id : '')
		}

		this.setState({dialogOpen: false})
	}

	showGoldRewardDialog(comment, childComment) {
		if (comment.admin === true) {
			this.comment = comment;
			this.childComment = childComment;
			this.setState({goldRewardDialogOpen: true})
		}
	}
	handleGoldRewardDialogClose() {
		this.setState({
			goldRewardDialogOpen: false
		})
	}
	onGoldRewardDialogOkBtnClick() {
		console.log('onGoldRewardDialogOkBtnClick')
		const { goldRewardInput } = this.state;
		// || goldRewardInput.indexOf('-') !== -1
		if (!goldRewardInput || goldRewardInput === '0' ) {
			this.setState({ goldRewardInputError: true})
			return;
		} else {
			this.setState({goldRewardDialogOpen: false})
			this.props.rewardCode(this.comment, this.childComment, goldRewardInput)
		}
	}
	onGoldRewardInputChange(value) {
		// e.target.value
		const number = parseInt(value || 0, 10);
		if (Number.isNaN(number)) {
			return;
		}
		this.setState({ goldRewardInput: number, goldRewardInputError: false });
	}
	render() {
		const { deleteComment, onPaginationChange, comment_count_without_reply, currentPage, comments, usingAntdModal } = this.props;
		const { dialogOpen, goldRewardDialogOpen, dialogType, goldRewardInputError } = this.state;

		const goldRewardInputErrorObj = goldRewardInputError ? {'error': 'error'} : {}

		return (
			<div className="fit -scroll" style={{ 'overflow-x': 'hidden'}}>
				
						
						{ usingAntdModal ? <Modals
                modalsType={dialogOpen}
                modalsTopval={
									dialogType === 'delete' ? '确定要删除该条回复吗？'
										: dialogType === 'hidden' ? '确定要隐藏该条回复吗？' 
										: dialogType === 'hiddenCancel' ? '确定要取消隐藏该条回复吗？' : ''
								}
                modalsBottomval={""}
                modalCancel={this.handleDialogClose}
                modalSave={this.onDialogOkBtnClick}
						>
						</Modals> : 
						<Dialog
		          	open={dialogOpen}
								disableEscapeKeyDown={true}
		          	onClose={this.handleDialogClose}
		        >	
			       	<DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
		          	<DialogContent>
			            <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
			            	{
			            		dialogType === 'delete' ? '确定要删除该条回复吗？'
			            			: dialogType === 'hidden' ? '确定要隐藏该条回复吗？' 
			            				: dialogType === 'hiddenCancel' ? '确定要取消隐藏该条回复吗？' : ''
			            	}
			            </DialogContentText>
		          	</DialogContent>
		          	<DialogActions>
			            <Button onClick={this.handleDialogClose} color="primary">
			              取消
			            </Button>
			            <Button variant="raised" 	
			            	onClick={() => this.onDialogOkBtnClick() } color="primary" autoFocus>
			              确定
			            </Button>
		          	</DialogActions>
							</Dialog> 
						}

		        <Dialog
		          	open={goldRewardDialogOpen}
								disableEscapeKeyDown={true}
		          	onClose={this.handleGoldRewardDialogClose}
		        >	
			       	<DialogTitle id="alert-dialog-title">{"奖励设置"}</DialogTitle>
		          	<DialogContent>
			            
						<InputNumber placeholder="请输入奖励的金币数量" id="goldReward"  type="number" value={this.state.goldRewardInput} 
								onChange={(e) => this.onGoldRewardInputChange(e)} width={228} style={{ width: '228px'}} />

			            	{/* <FormControl { ...goldRewardInputErrorObj } aria-describedby="name-error-text">
					          	<InputLabel htmlFor="goldReward">请输入奖励的金币数量</InputLabel>
					          	<Input id="goldReward"  type="number" value={this.state.goldRewardInput} onChange={(e) => this.onGoldRewardInputChange(e)} />
					          	{ goldRewardInputError ? <FormHelperText id="name-error-text">奖励金币不能为空或负数</FormHelperText> : ''}
					        </FormControl> */}

				        {/*<DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>    </DialogContentText>*/}
		          	</DialogContent>
		          	<DialogActions>
			            <Button onClick={this.handleGoldRewardDialogClose} color="primary">
			              取消
			            </Button>
			            <Button variant="raised" 	
			            	onClick={() => this.onGoldRewardDialogOkBtnClick() } color="primary" autoFocus>
			              确定
			            </Button>
		          	</DialogActions>
		        </Dialog>


				<div className="-layout-v -fit">
					<div className="panel-comment_item" >

						{this.renderComments()}	

					</div>
					{ (comment_count_without_reply > 10 ) ? 
						<div className="paginationSection">
							<Pagination showQuickJumper onChange={onPaginationChange} current={currentPage} total={comment_count_without_reply} />
						</div>
						: '' }
					{ (comment_count_without_reply == 0) ? <div>

							<div className="edu-tab-con-box clearfix edu-txt-center">
								<img className="edu-nodata-img mb20"
										 src={getImageUrl("images/educoder/nodata.png")} />
								<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p>
							</div>
					</div>
						: '' }
				</div>
				
			</div>
		)
	}
}

export default Comments;