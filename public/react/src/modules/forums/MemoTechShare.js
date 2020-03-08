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


class MemoTechShare extends Component {
    constructor(props) {
      super(props)

      this.handleLocationChange = this.handleLocationChange.bind(this);
      
      this.state = {
     
      }
    }

    onPaginationChange(pageNum, pageSize) {
      this.props.onPaginationChange(pageNum, pageSize)
    }

    componentDidMount() {
      // this.handleLocationChange(this.props.history.location);
      // this.unlisten = this.props.history.listen(this.handleLocationChange);
    }

    componentWillUnmount() {
      // this.unlisten();
    }
    componentDidUpdate(prevProps) {
        if(this.props.match.params.memoType !== prevProps.match.params.memoType) {
            // do something
            console.log(`memoType changed`)
            this.props.fetchMemos();
        }
    }

    componentWillReceiveProps(newProps, newContext) {
      if (newProps.match.url === this.props.match.url) {
        const oldParsed = queryString.parse(this.props.location.search);
        const newParsed = queryString.parse(newProps.location.search);
        if (!newParsed.page && oldParsed.page || 
            (oldParsed.order && newParsed.order && oldParsed.order != newParsed.order)) {
          this.props.fetchMemos();
        }
        // console.log('componentWillReceiveProps...')
      }
    }

    handleLocationChange(location) {
      console.log(`- - - location: '${location.pathname}'`);
      if (location.pathname) {
        if (location.pathname.indexOf('/forums/categories/all') != -1
          && this.props.location.search && this.props.location.search.indexOf('order=') != -1
          && location.search.indexOf('order=') != -1) {
          const oldParsed = queryString.parse(this.props.location.search);
          const newParsed = queryString.parse(location.search);
          if (oldParsed.order != newParsed.order) { // 只有在热门和最新间跳转时，才需要处理
            this.props.fetchMemos();
          }
        } 
      }
    }

    renderMemoList() {


      // const { memo_list, user } = this.props;
      // if (!memo_list) {
      //   return ''
      // }
      // return memo_list.map( (item, index) => {
        
      //   return (
      //       <PostItem key={item.id}  user={user} index={index} {...this.props}
      //         setTop={(memo)=>this.setTop(memo)}
      //         setDown={(memo)=>this.setDown(memo)} memo={item}
      //       ></PostItem>
      //     )
      // })
      return this.props.renderMemoList();
    }
    
  	render() {
  		const { match, history, currentPage, memo_count ,memo_list } = this.props

      return (
        <React.Fragment>
          <ForumsNavTab {...this.props}></ForumsNavTab>
          <MemoList {...this.props} renderMemoList={() => this.renderMemoList()}
            onPaginationChange={ (pageNum, pageSize) => this.props.onPaginationChange(pageNum, pageSize) }
          >
          </MemoList>
        </React.Fragment>
      );
  	}
}

export default postPaginationHOC() ( MemoTechShare );
