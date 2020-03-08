import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import Pagination from 'rc-pagination';

import {getImageUrl, toPath} from 'educoder';

import { postPaginationHOC } from './PostPaginationHOC'

import PostItem from './PostItem'

import ForumsNavTab from './ForumsNavTab'

import { queryString, ThemeContext }  from 'educoder'

class MemoList extends Component {

  render() {
    const { match, history, currentPage, memo_count ,memo_list, renderMemoList, onPaginationChange } = this.props
    let theme = this.context;

    return (
      <React.Fragment>
        <div id="forum_list" className="forum_table">
          <style>{`
            .forum_table_item .item_name:hover {
              color: ${theme.foreground_select}
            }
          `}</style>
          <div className="mh650 edu-back-white">
            {!memo_list || memo_list.length === 0 ?
              <div className="edu-tab-con-box clearfix edu-txt-center">
                <img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
                <p className="edu-nodata-p mb30">暂时还没有相关数据哦！</p>
              </div>
              : renderMemoList()
            }
          </div>

        </div>
        { !!memo_count && memo_count > 15 &&
        <div style={{ width: '100%', background: '#FAFAFA'}}>
          <Pagination className={'ec-pagination'}
                      onChange={(pageNum, pageSize) => onPaginationChange(pageNum, pageSize)}
                      showQuickJumper current={currentPage} total={memo_count} pageSize={15}/>
        </div> }
      </React.Fragment>

    );
  }
}
MemoList.contextType = ThemeContext;

export default ( MemoList );
