import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import { trigger } from 'educoder'

class MemoLabel extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }

    renderTags() {
      const { memo } = this.props;

      const arrays = memo.tag.map((item, index) => {
        return <a href="javascript:void(0)" key={index}>{item}</a>
      })
      return arrays
    }
  	render() {
  		const { match, history, currentPage, memo } = this.props

      if (!memo || !memo.tag || memo.tag.length === 0) {
          return ''
      }

	    return (
	    	<div className="clearfix padding30-20 edu-back-white mt10">
              <p className="font-16">话题标签</p>
              <div className="mt30 HotLabelList clearfix" id="HotLabelList">
                  {this.renderTags()}
              </div>
            </div>
	    );
  	}
}

export default MemoLabel;
