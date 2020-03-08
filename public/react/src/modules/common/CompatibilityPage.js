import React, { Component } from 'react';

import ieImg from './imgs/internet-explorer@2x.png'
import chromeImg from './imgs/google-chrome@2x.png'
import ffImg from './imgs/firefox_icon.png'

import bannerImg from './imgs/icon@2x.png'


import { TPMIndexHOC } from '..//tpm/TPMIndexHOC';

class CompatibilityPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
            
		}
	}

	onGoldRewardInputChange(event) {
		 this.setState({ goldRewardInput: event.target.value, goldRewardInputError: false });
	}

  	render() {
		const { goldRewardDialogOpen } = this.props;  		
		const { goldRewardInputError } = this.state;
        

	    return (
            <React.Fragment>
                <style>{`
                    .Header {
                        overflow: hidden;
                        background-color: #fff;
                        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.06);
                    }

                    .Header-inner {
                        width: 1008px;
                        margin: 0 auto;
                        padding: 0 16px;
                    }

                    .Header-logo {
                        width: 64px;
                        height: 30px;
                        margin: 15px 0;
                    }

                    .Header-logo img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }

                    .Compatibility {
                        margin-top: 60px;
                        background: #fff;
                        width: 1008px;
                        margin: 0 auto;
                        padding: 16px;
                        margin-bottom: 220px;
                    }

                    .Compatibility-icon {
                        width: 112px;
                        height: 83px;
                        margin: 64px auto;
                    }

                    .Compatibility-icon img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }

                    .Compatibility-tip {
                        font-size: 24px;
                        @mixin bold;
                        text-align: center;
                    }

                    .CompatibilityBrowsers {
                        overflow: hidden;
                        margin-top: 64px;
                    }

                    .CompatibilityBrowsers-item {
                        position: relative;
                        float: left;
                        width: 33%;
                        padding: 16px 0;
                    }

                    a.CompatibilityBrowsers-item {
                        text-decoration: none;
                        color: #3e7ac2;
                    }

                    .CompatibilityBrowsers-divider {
                        position: absolute;
                        right: 0;
                        top: 24px;
                        height: 64px;
                        border-right: 1px solid #ebeef5;
                    }

                    .CompatibilityBrowsers-icon {
                        width: 80px;
                        height: 80px;
                        margin: 0 auto;
                    }

                    .CompatibilityBrowsers-icon img {
                        display: block;
                    }

                    .CompatibilityBrowsers-ieIcon img {
                        width: 88px;
                        height: 81px;
                        margin-left: -8px;
                        margin-top: -1px;
                    }

                    .CompatibilityBrowsers-chromeIcon img {
                        width: 83px;
                        height: 83px;
                        margin: -1.5px;
                    }

                    .CompatibilityBrowsers-text {
                        margin-top: 32px;
                        text-align: center;
                    }
                `}</style>

                {/* <div className="Header">
                    <div className="Header-inner">
                        <div className="Header-logo">
                        <img src="https://testeduplus2.educoder.net/images/educoder/headNavLogo.png?1526520218" 
                        ></img>
                        </div>
                    </div>
                </div> */}
                <div className="Compatibility">
                    
                    <div className="Compatibility-icon">
                        <img src={ bannerImg } 
                        ></img>
                    </div>
                    <div className="Compatibility-tip">你正在使用的浏览器版本过低，将不能正常浏览和使用Educoder。</div>
                    <div className="CompatibilityBrowsers">
                       
                        {/* https://www.google.cn/intl/zh-CN/chrome/ */}
                        {/* <a href="http://www.google.com/chrome/" className="CompatibilityBrowsers-item">
                        
                            srcset="/compatibility/images/internet-explorer.png 1x, /compatibility/images/internet-explorer@2x.png 2x, /compatibility/images/internet-explorer@3x.png 3x"
                            srcset="/compatibility/images/google-chrome.png 1x, /compatibility/images/google-chrome@2x.png 2x, /compatibility/images/google-chrome@3x.png 3x"
                        */}
                        <a href="https://www.google.cn/intl/zh-CN/chrome/" className="CompatibilityBrowsers-item"
                            target="_blank">
                            <div className="CompatibilityBrowsers-icon CompatibilityBrowsers-chromeIcon">
                                <img src={ chromeImg } 
                                >
                                </img>
                            </div>
                            <div className="CompatibilityBrowsers-text">使用 Google Chrome 浏览器</div>
                            <div className="CompatibilityBrowsers-divider"></div>
                        </a>

                        <a href="http://www.firefox.com.cn/" className="CompatibilityBrowsers-item"
                            target="_blank">
                            <div className="CompatibilityBrowsers-icon CompatibilityBrowsers-ieIcon">
                                <img src={ ffImg } 

                                >
                                </img>
                            </div>
                            <div className="CompatibilityBrowsers-text">使用 Firefox 浏览器</div>
                            <div className="CompatibilityBrowsers-divider"></div>
                        </a>

                        <a href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx" className="CompatibilityBrowsers-item"
                            target="_blank">
                            <div className="CompatibilityBrowsers-icon CompatibilityBrowsers-ieIcon">
                                <img src={ ieImg } 

                                >
                                </img>
                            </div>
                            <div className="CompatibilityBrowsers-text">升级 IE 浏览器</div>
                        </a>
                    </div>
                </div>
            </React.Fragment>

	    );
  	}
}

export default TPMIndexHOC ( CompatibilityPage );
