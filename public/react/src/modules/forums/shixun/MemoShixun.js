import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import Pagination from 'rc-pagination';

import ShiXunPostItem from './ShiXunPostItem'
import ForumsNavTab from '../ForumsNavTab'
import { CircularProgress } from 'material-ui/Progress';
import { on, off } from 'educoder'
import './MemoShixun.css'

// import queryString from 'query-string'
import { queryString, updatePageParams }  from 'educoder'
import MemoList from '../MemoList'
import axios from 'axios'

const $ = window.$;
class MemoShixun extends Component {
    constructor(props) {
      super(props)

      this.state = {
        currentPage: 1,
        loadingMemos: true
      }
    }

    onPaginationChange(pageNum, pageSize) {
      window.$("html,body").animate({"scrollTop":0})
      updatePageParams(pageNum, this.props)
      this.fetchShixunMemos(pageNum);
    }
   componentWillReceiveProps(newProps, newContext) {
      if (newProps.enterKeyFlag !== this.props.enterKeyFlag) {
        // const childPath = this.props.match.path.split('/:')[0]
        // // 加入一个浏览地址
        // const _search = this.props.location.search;
        // if (_search) {
        //   const parsed = queryString.parse(_search);
        //   if (parsed.page != 1) {
        //     parsed.page = 1;

        //     this.props.history.push(`${this.props.match.url}?${queryString.stringify(parsed)}`)
        //   }
        // }
        this.fetchShixunMemos(1, newProps.searchValue, newProps.selectedHotLabelIndex)  // 搜索框模糊搜索，重置为第一页
          
      }
    }

    fetchShixunMemos(arg_currentPage, arg_searchValue, arg_selectedHotLabelIndex) {
      /*
        page = params[:page].to_i
        offset = page * 15
        search = params[:search]
        tag = params[:tag_repertoire_id]
      */

      const _search = this.props.history.location.search;
      const parsed = queryString.parse(_search);

      let currentPage = parseInt( arg_currentPage ? arg_currentPage : (parsed.page || 1) )

      const paramsObject = {
          page: currentPage  // - 1   从1开始
      }
     
      let searchValue = arg_searchValue != undefined ? arg_searchValue : this.props.searchValue

      if (searchValue) {
        paramsObject.search = searchValue
      }
      let { selectedHotLabelIndex, hot_tags } = this.props;
      selectedHotLabelIndex = arg_selectedHotLabelIndex ? arg_selectedHotLabelIndex : selectedHotLabelIndex
      if (selectedHotLabelIndex !== -1 && hot_tags[selectedHotLabelIndex]) {
        paramsObject.tag_repertoire_id = hot_tags[selectedHotLabelIndex].id
      }

      const stringifid = queryString.stringify(paramsObject);
      const url = `/discusses/forum_discusses.json?${stringifid}`    // /${challenge.identifier}/star

      // 获取memo list
      this.setState({
        currentPage: currentPage ,
        loadingMemos: true
      })
      axios.get(url,{
          // withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          // const user = response.data.current_user;
          // user.tidding_count = response.data.tidding_count;
          // this.props.initCommonState(user)
          this.props.initForumState(response.data)

          // const { hot_tags } = response.data;
          // if (hot_tags && hot_tags.length) {
          //   this.tagNameIdMap = {}
          //   hot_tags.forEach( (item, index) => {
          //     this.tagNameIdMap[item.name] = item.id
          //   })
          // }

          this.setState({

            // p_forum_id: params.forum,
            // p_s_order: params.s_order,
            loadingMemos: false
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    componentDidMount() {
      this.fetchShixunMemos();

      on('hotTagClick', (event, tagName) => {
        this.props.setHotLabelIndex(tagName.selectedHotLabelIndex, () => {
          this.fetchShixunMemos(1, undefined)
        })


      })

      $(window).on('popstate',  (e) => {
          var state = e.originalEvent.state;
          console.log('popstate', state)
          if (state !== null) {

              let currentPage = this.state.currentPage;;
            //   // 浏览器地址改变了
            const search = this.props.history.location.search
            const parsed = queryString.parse(search);
            if (parsed.page != currentPage) {
                currentPage = parseInt( parsed.page || 1)
            //     this.setSearchValue('')
                this.fetchShixunMemos(currentPage)
                this.setState({
                  currentPage,
                })
            } 
          }
      });
    }
    componentWillUnmount() {
      off('hotTagClick')
      $(window).off('popstate')
    }

    renderMemoList() {

      const { memo_list, user } = this.props;
      if (!memo_list) {
        return ''
      }
      /*
        <PostItem key={item.id} user={user} index={index} {...this.props}
          setTop={(memo)=>this.setTop(memo)}
          setDown={(memo)=>this.setDown(memo)}
          memo={item}
        ></PostItem>
      */
      return memo_list.map( (item, index) => {
        return (
            <ShiXunPostItem key={item.id} user={user} index={index} {...this.props} memo={item}></ShiXunPostItem>
          )
      })
    }
    
  	render() {
  		const { match, history , memo_count ,memo_list, showSearchValue, searchValue
          , selectedHotLabelIndex, hot_tags } = this.props;
      const { currentPage, loadingMemos } = this.state;

      // 规则： 搜索框输入了值 或者 选择了热门标签的时候显示该提示
      const _showSearchValue = showSearchValue || selectedHotLabelIndex != -1
      let _searchValue;
      if (showSearchValue) {
        _searchValue = searchValue
      } else if (selectedHotLabelIndex != -1){
        _searchValue = hot_tags[selectedHotLabelIndex].name || hot_tags[selectedHotLabelIndex]
      }

      return (
        <div className="edu-back-white" id="forum_index_list"> {/* fl with100 */}
          <div className="clearfix">
            { _showSearchValue &&
            <div className="noMemosTip" style={{display: loadingMemos ? 'none' : 'block'}}>
              <span className="fr pr20" id="search_result">
                共找到&nbsp;
                <span className="color-orange03">{memo_count}</span>个"
                <span className="color-orange03">{_searchValue}</span>"相关的结果
              </span>
            </div> }

            <CircularProgress size={40} thickness={3} 
              style={{ marginLeft: 'auto', marginRight: 'auto', paddingTop: '20%'
                   , display: loadingMemos ? 'block': 'none' }}/>
            { !loadingMemos &&
            <React.Fragment>
            <ForumsNavTab {...this.props}></ForumsNavTab>
            <MemoList {...this.props} 
              renderMemoList={() => this.renderMemoList()}
              onPaginationChange={ (pageNum, pageSize) => this.onPaginationChange(pageNum, pageSize) }
              {...this.state}
            >
            </MemoList>
            </React.Fragment>
            }
          </div>
                  
        </div>

      );
  	}
}

export default MemoShixun;
