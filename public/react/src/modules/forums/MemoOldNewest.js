import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import Pagination from 'rc-pagination';

import { postPaginationHOC } from './PostPaginationHOC'

import PostItem from './PostItem'


import ForumsNavTab from './ForumsNavTab'

class MemoNewest extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }

    onPaginationChange(pageNum, pageSize) {
      
      this.props.onPaginationChange(pageNum, pageSize)
    }


    renderMemoList() {
      // const { memo_list, user } = this.props;
      // if (!memo_list) {
      //   return ''
      // }
      // return memo_list.map( (item, index) => {
      //   return (
      //     <PostItem key={item.id} memo={item} user={user} index={index} {...this.props}></PostItem>
      //     )
      // })
      return this.props.renderMemoList();
    }
  	render() {
  		const { match, history, currentPage, memo_count } = this.props

	    return (
	    	<React.Fragment>
				<ForumsNavTab {...this.props}></ForumsNavTab>
	    		<div id="forum_list" className="forum_table mh650">
		          	{this.renderMemoList()}

		          	{ !!memo_count && <Pagination onChange={(pageNum, pageSize) => this.onPaginationChange(pageNum, pageSize)} 
            showQuickJumper current={currentPage} total={memo_count} pageSize={15}/> }
	        	</div>
	        </React.Fragment>
	    );
  	}
}

export default postPaginationHOC( MemoNewest );
