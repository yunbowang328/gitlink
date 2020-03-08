import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

class ForumsNavTab extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }

    onNavClick(active) {
    	// TODO 为什么事件发不过去
    	// https://github.com/facebook/react/issues/3249#issuecomment-177750141
    	// window.$(window).trigger('setSearchValue', '', true);
    	this.props.setSearchValue('')
    	
        if (!active) {
        	this.props.initForumState({
	          	selectedHotLabelIndex: -1,
	        })
        }
    }
  	render() {
  		const { match, history, currentPage } = this.props

  		const techSharePath = `/forums/categories/5`
  		const guidePath = `/forums/categories/3`
			const guidePaths = `/forums/categories/16`
  		const hottestPath = `/forums/categories/all?order=hottest`  //  ?order=hottest
  		const newestPath = `/forums/categories/all?order=newest`   // ?order=newest

  		const shixunDiscussPath = `/forums/categories/shixun_discuss`
  		const locationPath = history.location.pathname + history.location.search
  		/*
				<ul>
                  <li className={classNames({'selected': locationPath.indexOf(techSharePath) === 0 })}>
                    <Link to={`${techSharePath}`} >techShare</Link>
                  </li>
                  <li className={classNames({'selected': locationPath.indexOf(guidePath) === 0 })}>
                    <Link to={`${guidePath}`}>guide</Link>
                  </li>
                </ul>
  		*/
	    return (
	    	<div className="discuss-tab pl20 bor-bottom-greyE clearfix pr edu-back-white">
	            <p className="_forum_tab clearfix">
		            {/*<a href="/forums" className="fl font-16 ptl5-10 block mr20 active">
		              	<span className="fl">技术分享</span>
		              	<span className="forum_filtrate_span2 forum_filtrate_span2_bg mt10 ml10 fl">219</span>
		            </a>*/}
		            <Link to={`${newestPath}`} className={classNames("fl font-16 padding5-20 block mr30 navItem"
		            	, {'active': locationPath.indexOf('order=newest') !== -1 })}
		            	onClick={()=>this.onNavClick(locationPath.indexOf('order=newest') !== -1)}
		            	>
		              	<span className="fl">最新回复</span>
		            </Link>
		            <Link to={`${hottestPath}`} className={classNames("fl font-16 padding5-20 block mr30 navItem"
		            	, {'active': locationPath.indexOf('order=hottest') !== -1 })}
		            	onClick={()=>this.onNavClick(locationPath.indexOf('order=hottest') !== -1)}
		            	>
		              	<span className="fl">热门话题</span>
		            </Link>
		            <Link to={`${shixunDiscussPath}`} className={classNames("fl font-16 padding5-20 block mr30 navItem"
		            	, {'active': locationPath.indexOf('shixun_discuss') !== -1 })}
		            	onClick={()=>this.onNavClick(locationPath.indexOf('shixun_discuss') !== -1)}
		            	>
		              	<span className="fl">实训回复</span>
		            </Link>
		            
		            <Link to={`${techSharePath}`} className={classNames("fl font-16 padding5-20 block mr30 navItem"
		            	, {'active': locationPath.indexOf(techSharePath) === 0 })}
		            	onClick={()=>this.onNavClick(locationPath.indexOf(techSharePath) === 0)}
		            	>
		              	<span className="fl">技术分享</span>
		            </Link>
		            <Link to={`${guidePath}`} className={classNames("fl font-16 padding5-20 block mr30 navItem"
		            	, {'active': locationPath.indexOf(guidePath) === 0 })}
		            	onClick={()=>this.onNavClick(locationPath.indexOf(guidePath) === 0)}
		            	>
		              	<span className="fl">操作指南</span>
		            </Link>
								<Link to={`${guidePaths}`} className={classNames("fl font-16 padding5-20 block mr30 navItem"
									, {'active': locationPath.indexOf(guidePaths) === 0 })}
											onClick={()=>this.onNavClick(locationPath.indexOf(guidePaths) === 0)}
								>
									<span className="fl">通知公告</span>
								</Link>
		            {/*<a href="/forums?type=discuss" className="fl font-16 ptl5-10 block mr20">
		              	<span className="fl">实训交流</span>
		              	<span className="forum_filtrate_span2  mt10 ml10 fl">1391</span>
		            </a>*/}
		        </p>
	        </div>
	    );
  	}
}

export default ForumsNavTab;
