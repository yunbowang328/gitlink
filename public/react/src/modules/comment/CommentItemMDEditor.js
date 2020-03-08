import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'
import { getImageUrl, toPath, getUrl,getUploadActionUrl } from 'educoder';
import './CommentItemMDEditor.css'

const $ = window.$;
const _origin = window.location.origin;

class CommentItemMDEditor extends Component {

	componentDidUpdate(prevProps) {
		const { item, currentReplyComment } = this.props;
		if ( prevProps.showReplyEditorFlag != this.props.showReplyEditorFlag && 
			currentReplyComment && currentReplyComment.id == item.id ) {
			this.showOrHideEditor(currentReplyComment)
		}
	}
	// 如果未初始化，会先初始化
	showOrHideEditor = (comment) => {
		const { user } = this.props;
		console.log('initReply ', comment)

		const $ = window.$;
		var commentId = comment.id
		var reply_message_el = `#reply_message_${commentId}`

		const initMD_ID = `reply_message_editorMd_${commentId}`
		const view_selector = `.commentItemMDEditorView_${commentId}`
		const commitBtnSelector = `#commitBtn_${commentId}`
		if( $(`#${initMD_ID} textarea`).length === 1 ) { // 没有初始化
		    const placeholder = '我要回复...'
    		// const imageUrl = `/upload_with_markdown?container_id=${commentId}&container_type=Memo`;
      		const imageUrl = `${getUploadActionUrl()}`;

    		const otherOptions = {
    			watch: false,
    			htmlDecode: "style,script,iframe",  // you can filter tags decode
	            // taskList: true,

	            mode: 'markdown',
	            toolbar: true,
	            markdown: '',
	            readOnly: false,
				// preview: false,

	            tex: true,  // 数学公式
	            flowChart: false,  // 默认不解析
	            sequenceDiagram: false, // 默认不解析
	            dialogLockScreen: false,
    		}
			const commentMDEditor = window.create_editorMD_4comment(`${initMD_ID}`, '', 120, placeholder, imageUrl, () => {
				// onload callback
				commentMDEditor.cm.focus()
				
				window.initMDEditorDragResize(".editor__resize", commentMDEditor, {
					initHeight: 120 
				})

	      	}, otherOptions);
			commentMDEditor.state.preview = false;
			this.commentMDEditor = commentMDEditor;
			
			$('.commentItemMDEditorView').hide();
			$(view_selector).show();
			
		}else { // 初始化了，显示隐藏切换
			if ($(reply_message_el).is(':visible')) {
				$( view_selector ).hide()

			} else {
				$('.commentItemMDEditorView').hide();

				$(view_selector).show();

				window._currentChildcommentMDEditor && window._currentChildcommentMDEditor.resize()
				// 自动focus
				setTimeout(()=>{
					this.commentMDEditor && this.commentMDEditor.cm && this.commentMDEditor.cm.focus()
					this.commentMDEditor.resize()	// 解决切换显示、隐藏多次后出现的样式错乱的问题
				}, 200)
			}
		}
		window._currentChildcommentMDEditor = this.commentMDEditor;	// tpi resize 的时候需要做调用editor.resize

	}

	onCommit = () => {
 		window.$(document).trigger("onReply", { commentContent: this.commentMDEditor.getValue()
         	, id: this.props.item.id, editor: this.commentMDEditor } );
	}

  	render() {
  		const { match, history, item, user, buttonText } = this.props
  		if (!item) {
  			return <div></div>
  		}

      	return (
      		<div className={`commentItemMDEditorView commentItemMDEditorView_${item.id}`} style={{display:'none'}}>
              	<div className="homepagePostReplyPortrait mr15 fl imageFuzzy" id="reply_image_3097" 
              		style={{ marginTop: '2px',    marginRight: '-20px' }} >
	              	<a href={`${user.user_url}`} target="_blank" alt="用户头像">
					  	{/* 'https://testeduplus2.educoder.net/images/avatars/User/50571'|| */}
	              		<img alt="0?1442652658" height="33" src={`/images/${user.image_url}`} width="33"></img>
	              	</a>
              	</div>
		    	<div id={`reply_message_${item.id}`} className="reply_to_message commentItemMDEditor editormd-image-click-expand"
		    		style={{ paddingTop: '0px', paddingBottom: '0px', marginTop: '36px' }} 
		        >
	                <div id={`reply_message_editorMd_${item.id}`} className="editorMD" style={{ marginBottom: '0px'}}>
	                    <textarea style={{'display': 'none'}}>
	                    </textarea>
	              	</div>
	              	<div className="editor__resize" href="javascript:void(0);" style={{display: ''}}>调整高度</div>

					<div class="clearfix">
						<a id={`commitBtn_${item.id}`} href="javascript:void(0)" 
								onClick={this.onCommit} style={{ marginRight: '44px' }}
								className="commentsbtn task-btn task-btn-blue  fr " style={{display: ''}}>
							{ buttonText || '发送'}
						</a>
					</div>
		          	
		        </div>
	        </div>
      	);
  	}
}

export default ( CommentItemMDEditor );

// style={{ margin: '10px 44px', marginBottom: '0px'}}