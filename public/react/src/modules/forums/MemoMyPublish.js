import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import Pagination from 'rc-pagination';

import { postPaginationHOC } from './PostPaginationHOC'

import PostItem from './PostItem'

import ForumsNavTab from './ForumsNavTab'

// import queryString from 'query-string'
import { queryString }  from 'educoder'
import MemoList from './MemoList'


class MemoMyPublish extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
     
      }
    }

    onPaginationChange(pageNum, pageSize) {
      this.props.onPaginationChange(pageNum, pageSize)
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    componentWillReceiveProps(newProps, newContext) {

    }
    renderMemoList() {


      return this.props.renderMemoList();
    }
    
  	render() {
  		const { match, history, currentPage, memo_count, memo_list } = this.props

      return (
        <React.Fragment>
        <div className="discuss-tab bor-bottom-greyE clearfix pr boxsizing">
	        <p className="_forum_tab pl20 pr20 clearfix boxsizing" style={{fontSize:'18px', color:'rgba(5,16,26,1)'}}>
	        	我的发布
	        	<Link className="returnBtnA fr mr10" to={`/forums`}><span className="color-grey-9 font-16">返回</span></Link>
	        </p>
	    </div>
        <MemoList {...this.props} renderMemoList={() => this.renderMemoList()}
          onPaginationChange={ (pageNum, pageSize) => this.props.onPaginationChange(pageNum, pageSize) }
        >
        </MemoList>
        </React.Fragment>

      );
  	}
}

export default postPaginationHOC({ isMyPublish: true }) ( MemoMyPublish );
