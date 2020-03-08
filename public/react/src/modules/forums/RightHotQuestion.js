import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

class RightHotQuestion extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }

    // 
    renderHotMemos() {
      const { hot_memos } = this.props;
      if (!hot_memos) {
        return ''
      }
      return hot_memos.map((item, index) => {
        return <div className="hotQuestionItem" key={index}>
                  <Link to={`/forums/${item.id}`} className="color-grey-6 task-hide mb5 questiontName"
                      title={ item.subject && item.subject.length > 15 ? item.subject : '' }
                  >
                    {item.subject}
                  </Link>
                  <p className="clearfix font-12 color-grey-9">
                    <span className="fl">{item.replies_count} 回答</span>
                    { !!item.tag && item.tag.length ? <span className="fr">来自 {item.tag.join('/')}</span> : ''}
                  </p>
                </div>
      })
    }
  	render() {
  		const { match, history, currentPage } = this.props

	    return (
            <div className="clearfix padding40-20 edu-back-white mt10">
                <p className="font-16">热门问题</p>
                <div className="mt10 hotQuestionList clearfix" id="hotQuestionList">
                    {this.renderHotMemos()}
                </div>
            </div>
	    );
  	}
}

export default RightHotQuestion;
