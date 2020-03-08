import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Loading from '../../Loading';

import Loadable from 'react-loadable';

import { TPMIndexHOC } from '../tpm/TPMIndexHOC';

import { SnackbarHOC,getImageUrl } from 'educoder';

class http500 extends Component {
    render() {
        return (
            <div className="newMain clearfix">
                    <div className=" edu-txt-center mt60 mb60">
                        {/*mt100 mb100*/}
                        <img src={getImageUrl("images/warn/pic_404.jpg")} />
                            <p className="font-18 mt40">
                                您可以稍后尝试&nbsp;<a href="/"
                                                className="color-blue">返回首页</a>
                                ，或者&nbsp;
                                <a target="_blank"
                                   href="//shang.qq.com/wpa/qunwpa?idkey=2f2043d88c1bd61d182b98bf1e061c6185e23055bec832c07d8148fe11c5a6cd"
                                   className="color-blue">QQ反馈&gt;&gt;</a>
                            </p>
                    </div>
                    {/*<div style="clear:both;"></div>*/}
                    {/*<div id="ajax-indicator" style="display:none;"><span>载入中...</span></div>*/}
                    {/*<div id="ajax-modal" style="display:none;"></div>*/}
            </div>
        );
    }
}

export default SnackbarHOC() (TPMIndexHOC  ( http500 ));
