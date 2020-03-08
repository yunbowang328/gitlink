import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

class RecommendShixun extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }

    showRecommandShixun(){
        const { recommend_shixuns } = this.props;
        if (!recommend_shixuns) {
            return '';
        }
        const result = [];
        recommend_shixuns.forEach((shixun, index) => {
            const _shixun = shixun
            result.push(
            <div className="recomments clearfix df" key={index}>
                <a href={`/shixuns/${_shixun.identifier}/challenges`} style={{height:'76px'}} target="_blank">
                    
                    <img alt={`${_shixun.id}`} style={{maxHeight:'76px'}} src={`/${_shixun.image_url}`} width="100" >
                    </img>
                </a>
                <div className="ml10 flex1">
                    <a href={`/shixuns/${_shixun.identifier}/challenges`} target="_blank" title={_shixun.name && _shixun.name.length > 9 ? _shixun.name : ''}
                    className="color-grey-6 task-hide mb10 recomment-name" style={{maxWidth:'147px'}}>
                  {_shixun.name}
                    </a>
                    <p className="color-grey-9">{_shixun.myshixuns_count} 人学习</p>
                </div>
            </div>
            )
        })
        return result;
    }

  	render() {
  		const { match, history, currentPage } = this.props

  		// 参考 TPMShixunDiscuss.js 推荐实训， 页面路径：http://localhost:3007/shixuns/uznmbg54/shixun_discuss
	    return (
            <div className="padding10">
                <p className="mb20 font-16 clearfix" style={{ lineHeight: 2 }}>推荐实训</p>
                <div className="recommend-list">
                    {this.showRecommandShixun()}
                </div>
            </div>
	    );
  	}
}

export default RecommendShixun;
