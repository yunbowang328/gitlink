import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { getImageUrl, toPath, ThemeContext } from 'educoder';

import moment from 'moment';

import { Tooltip } from 'antd'


class PostItem extends Component {
    _toTenThousand(num) {
      if (num > 10000) {
        return ( (num - 500)/ 10000 ).toFixed(1) + '万'
      }
      return num
    }

  	render() {
  		const { match, history, currentPage, memo, user, setTop, setDown } = this.props
	    return (
            <div className="forum_table_line pl20">
                <div className="forum_table_item" id={`memo_detail_${memo.id}`}>
                    <a href={`/users/${memo.login}`} className="fr mr15">
                        <img alt="用户头像" className="bor-radius-all mt3" height="50" src={getImageUrl(`images/`+memo.image_url)} width="50" />
                    </a>
                    <div className="fl pr" style={{flex: 1}}>
                        <p className="font-16 clearfix" style={{ lineHeight: 2 }}>
                        {/* target="_blank" */}
                            <a href={`/forums/${memo.id}`} target="_blank" title={memo.subject && memo.subject.length > 46 ? memo.subject : ''}
                                className="clearfix task-hide item_name fl" style={{maxWidth: '600px'}} >
                                {memo.subject}
                            </a>

                          { memo.sticky && <span className="btn-top btn-cir-orange mt6 ml5 fl">置顶</span> }

                          { memo.reward &&
                          <Tooltip title={`获得平台奖励金币：${memo.reward}`}>
                            <span className=" ml10 fl color-orange03 fl" >
                              <i className="iconfont icon-gift font-16 mr5 fl"></i><span className="fl mt3 font-14">{memo.reward}</span>
                            </span>
                          </Tooltip>
                          }
                        </p>

                        <div className="clearfix mt5 color-grey-9">
                          <span className="fl">{memo.user_name}</span>
                          {/*最后回复：todo{memo.username}
                      memo.language && memo.language != 'other' && <span className="fl language-cir-orange mr10 mt3 ml6">{memo.language}</span>
                          */}
                          {/* <span className="fl ml50">{moment(memo.updated_at).fromNow()}</span> */}
                          {memo.tag && memo.tag.length ? <span className="fl ml50">来自 {memo.tag.join('/')}</span> : ''}

                          {/*<span className="fl language-cir-orange mr10 mt3">C++</span>*/}

                            <p className="font-12 fr mr8 color-grey-6" style={{ marginTop: '4px' }}>
                              {/* data-tip-down="回复数" <i className="fa fa-comments-o mr5"></i>{memo.replies_count}
                                  <i className="fa fa-thumbs-o-up mr5"></i>{memo.praise_count}*/}
                              {memo.replies_count ?
                                <span className="mr10 ml10 fl edu-txt-right" style={{cursor: 'default'}} >
                                  {memo.replies_count} 回复
                              </span> :''}

                              {memo.praise_count ?
                              <span className="mr10 ml10 fl edu-txt-right" style={{cursor: 'default'}} >
                                {memo.praise_count} 赞
                              </span> :''}

                              {memo.viewed_count ?
                              <span className="mr10 ml10 fl edu-txt-right" style={{cursor: 'default',minWidth:'55px'}}>
                                {this._toTenThousand(memo.viewed_count)} 浏览
                              </span> :''}

                            </p>
                        </div>
                      { user && (user.admin === true || user.login === memo.login) &&
                      <div className="edu-position-hidebox" style={{position: 'absolute', right: '18px',top:'0px'}}>
                        <a href="javascript:void(0);"><i className="fa fa-bars font-16"></i></a>
                        <ul className="edu-position-hide undis">
                          { user.admin === true &&
                            ( memo.sticky === true ?
                            <li><a href="javascript:void(0);" onClick={() => setDown(memo)}>取消置顶</a></li>
                            :
                            <li><a href="javascript:void(0);" onClick={() => setTop(memo)}>置&nbsp;&nbsp;顶</a></li> )
                          }
                          <li><Link to={`/forums/${memo.id}/edit`}>编&nbsp;&nbsp;辑</Link></li>
                          <li>
                            <a href="javascript:void(0)" onClick={() =>
                                window.delete_confirm_box_2_react(`onMemoDelete`, '您确定要删除吗？' , memo)}>

                              删&nbsp;&nbsp;除</a>
                          </li>
                        </ul>
                      </div>
                      }
                    </div>
                </div>
            </div>
	    );
  	}
}
PostItem.contextType = ThemeContext;

export default PostItem
