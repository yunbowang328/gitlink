import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import { getImageUrl, toPath, LinkAfterLogin } from 'educoder'

import match_adImg from '../../images/ad/match_ad.jpg'
const $ = window.$

class RightMyPublish extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  handleKeyPress = (event) => {
    if(event.type !== 'keypress' || event.key == 'Enter'){
      this.props.setSearchValue( this.props.searchValue, true);
      // $(window).trigger('setSearchValue', $('#shixun_search_input').val())
    }
  }
  handleInput = (event) => {
    this.props.setSearchValue(event.target.value);
  }

  render() {
    const { match, history, currentPage, my_memos_count, setSearchValue, searchValue } = this.props

    return (
      <React.Fragment>
        <div className="clearfix edu-back-white padding40-20 publishMemoSection">
          {/*<div className="searchFor h40 mt15 mb5 ml20">
            <div className="searchCon fl">
              <input type="text" className="searchinput" name="search" value="" placeholder="请输入帖子标题的关键字进行搜索">
              </input>
              <span className="search_close" onclick="colse_searchbox();" data-tip-down="清除">×</span>
            </div>
            <i className="fa fa-search mr5 fl color-dark-grey search_icon" 
              onClick="$('#search_memos').submit();" style={{margin:'8px'}} data-tip-down="搜索"></i>
          </div>*/}
          <div className="search-new">
            <input type="text" className="search-new-input fl" placeholder="搜索您想了解的话题" id="shixun_search_input"
                   onKeyPress={this.handleKeyPress} onChange={ this.handleInput } value={searchValue}
            >
            </input>
            <span className="search-span"></span>
            <img src={getImageUrl("images/educoder/icon/search.svg")} className="fl mt5"
                 onClick={ this.handleKeyPress }>

            </img>
          </div>
          <LinkAfterLogin {...this.props} to={'/forums/new'} className="sendMyQuestion edu-default-btn edu-blueback-btn edu-txt-center font-16 mb30">发布话题</LinkAfterLogin>
          {/*<p className="edu-txt-center font-16">
            <span>我的发布</span><br/>
            <Link to={`/forums/categories/my_published`} className="color-blue">{my_memos_count}</Link>
          </p>*/}
        </div>

        <div className="clearfix edu-back-white advertisement" >
          <a href="/competitions" target="_blank"><img src={match_adImg}></img></a>
        </div>
      </React.Fragment>
    );
  }
}

export default RightMyPublish;
