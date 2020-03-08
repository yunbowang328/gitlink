import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

const $ = window.$;

class MemoDetailKEEditor extends Component {

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.memo && (!prevProps.memo || this.props.memo.id != prevProps.memo.id)) {
			this.keEditor = window.sd_create_editor_from_data(this.props.memo.id, null, "100%", "Memo");
            window._kk = this.keEditor
		}
	}

	componentDidMount() {
		this.keEditor = window.sd_create_editor_from_data(this.props.memo.id, null, "100%", "Memo");
        window._kk = this.keEditor
	}


	showEditor() {
	 	$("html, body").animate({ scrollTop: $('#commentInput').offset().top - 100 }, 1000, () => {
        if (this.keEditor) {
          	const FF = !(window.mozInnerScreenX == null);
          	if (FF) {
            	this.keEditor.focus()
          	} else {
            	this.keEditor.edit.win.document.body.focus()
          	}
        }
      });
	}

  	render() {
  		const { match, history, memo } = this.props
  		if (!memo) {
  			return <div></div>
  		}

      	return (
	    	<div nhname={`new_message_${memo.id}`} className="" style={{ paddingTop: '20px', paddingBottom: '20px' }}
	                id="commentInput">
	            <form acceptCharset="UTF-8" action="/discusses?challenge_id=118&dis_id=61&dis_type=Shixun"
	                style={{ flexDirection: 'column', width: '94%', marginLeft: '3%'}}
	                className="df" data-remote="true" id="new_comment_form" method="post">
	                <div nhname={`toolbar_container_${memo.id}`}></div>
	                <textarea id={`comment_news_${memo.id}`}
	                    nhname={`new_message_textarea_${memo.id}`} name="content" className="none">
	                </textarea>
	          	</form>
	          	<a id={`new_message_submit_btn_${memo.id}`} href="javascript:void(0)"
	                    style={{display: 'none'}}  className="commentsbtn task-btn task-btn-blue  fr">
	                发送
	          	</a>
	        </div>
      	);
  	}
}

export default ( MemoDetailKEEditor );
