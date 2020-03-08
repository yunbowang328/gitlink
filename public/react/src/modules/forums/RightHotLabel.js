import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import { trigger } from 'educoder'

class RightHotLabel extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }

    renderTags() {
      const { hot_tags, selectedHotLabelIndex } = this.props;
      if (!hot_tags) {
        return ''
      }
      const result = hot_tags.map((item, index) => {
        let params = {}
        if (typeof item === 'string') {
          params.name = item;
        } else {
          params = item;
        }
        params.selectedHotLabelIndex = index;
        return (
          <a href="javascript:void(0)" onClick={() => trigger('hotTagClick', params)} key={index} 
            className={classNames({"selected": selectedHotLabelIndex === index})}>
          {item.name || item}
          </a> )
      })
      return result
    }
  	render() {
  		const { match, history, currentPage, selectedHotLabelIndex } = this.props

	    return (
	    	<div className="clearfix padding40-20 edu-back-white mt10">
              <p className="font-16">热门标签</p>
              <div className="mt30 HotLabelList clearfix" id="HotLabelList">
                  {this.renderTags()}
              </div>
            </div>
	    );
  	}
}

export default RightHotLabel;
