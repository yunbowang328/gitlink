import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import moment from 'moment'
import './MemoShixun.css'

class ShiXunPostItem extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {

        }
    }

    render() {
        const { memo } = this.props;
        let tagStr = ''
        if (memo.shixun_tag && memo.shixun_tag.length) {
            
            memo.shixun_tag.forEach( tag => {
                tagStr += ` ${tag}`
            })
        }
        return (
            <React.Fragment>
                <div className="sxReturnItem">
                    <div className="ItemLine clearfix df">
                        <a href={`/users/${memo.login}`} className="ItemLineHeadPhoto">
                            <img src={`/images/${memo.image_url}`} 
                            width="48px" height="48px" className="radius"/>
                        </a>
                        <div className="flex1 ml10 pr20">
                            <div className="clearfix" style={{ height: '32px' }}>
                                <p className="shixunReply task-hide font-16 fl">
                                    <Link to={`${memo.tpm_url}`} title={memo.subject} target="_blank">{memo.subject}</Link>
                                </p>
                                { memo.reward && 
                                <span className="color-orange ml20 fl" data-tip-down={`获得平台奖励金币：${memo.reward}`} 
                                    style={{ lineHeight: '20px' }}
                                >
                                    <i className="iconfont icon-gift font-16 mr5 fl"></i><span className="fl mt3">{memo.reward}</span>
                                </span>
                                }
                            </div>
                            <p className="clearfix mt5">
                                <span className="fl color-grey-9">{memo.username}</span>
                                {/* <span className="fl color-grey-9 ml40">{moment(memo.updated_at).fromNow()}</span> */}
                                { !!tagStr && <span className="fl color-grey-9 ml40">来自 {tagStr}</span>}
                                { !!memo.praises_count && <span className="fr color-grey-6 ml20 font-12">{memo.praises_count} 赞</span>}
                                { !!memo.replies_count && <span className="fr color-grey-6 font-12">{memo.replies_count} 回复</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            );
    }

}
export default ShiXunPostItem