import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

const $ = window.$;
const _origin = window.location.origin;

class CommentItemKEEditor extends Component {

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
		var id = comment.id
		var reply_message_el = `#reply_message_${id}`
		var reply_iconup_el = `#reply_iconup_${id}`
		if($(reply_message_el).html() == "") {
		    $(".reply_to_message").html("");
		    $(reply_message_el).html(`<div className=\"orig_reply_box borderBottomNone reply_to_message\" id=\"reply_to_message_${id}\">\n      <div class=\"homepagePostReplyPortrait mr15 imageFuzzy fl\" id=\"reply_image_${id}\"><a href=\"${user.user_url}\" target=\"_blank\" alt=\"用户头像\"><img alt=\"0?1442652658\" height=\"33\" src=\"${_origin}/images/${user.image_url}\" width=\"33\" /><\/a><\/div>\n      <div class=\"orig_textarea fl\" style=\"margin-bottom: 0px\">\n        <div nhname=\'new_message_${id}\'>\n              <form accept-charset=\"UTF-8\" action=\"/discusses?challenge_id=118&amp;dis_id=61&amp;dis_type=Shixun\" data-remote=\"true\" id=\"new_comment_form\" method=\"post\"><div style=\"margin:0;padding:0;display:inline\"><input name=\"utf8\" type=\"hidden\" value=\"&#x2713;\" /><input name=\"authenticity_token\" type=\"hidden\" value=\"HJTbMpfI8LKUpwghfkvgB2SaMmcIVyVdAezyKmzJ7FU=\" /><\/div>\n                  <input type=\"hidden\" id=\"dis_reply_id\" name=\"reply_id\" value=\"${id}\">\n                  <div nhname=\'toolbar_container_${id}\'><\/div>\n                  <textarea placeholder=\"有问题或有建议，请直接给我留言吧！\" id=\"comment_news_${id}\" style=\"display: none\" nhname=\'new_message_textarea_${id}\' name=\"content\"><\/textarea>\n                  <a id=\"new_message_submit_btn_${id}\" href=\"javascript:void(0)\" onclick=\"this.style.display=\'none\'\" class=\"mt10 task-btn task-btn-orange fr\">发送<\/a>\n                  <div class=\"cl\"><\/div>\n                  <p nhname=\'contentmsg_${id}\'><\/p>\n<\/form>        <\/div>\n        <div class=\"cl\"><\/div>\n      <\/div>\n  <div class=\"cl\"><\/div>\n<\/div>\n`);	//" ide语法识别
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
		// 自动focus
		setTimeout(()=>{
			var iframe =$(`#reply_to_message_${id}`).find('iframe')[0]
			iframe && iframe.contentDocument.body.focus()
		}, 200)
		
	}

  	render() {
  		const { match, history, item, user } = this.props
  		if (!item) {
  			return <div></div>
  		}

      	return (
      		<div>
              	<div className="cl"></div>
              	<div id={`reply_message_${item.id}`} className="reply_to_message"></div>
            </div>
      	);
  	}
}

export default ( CommentItemKEEditor );
