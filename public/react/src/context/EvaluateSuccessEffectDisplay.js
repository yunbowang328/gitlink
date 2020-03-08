import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Redirect } from 'react-router';

import PropTypes from 'prop-types';
import { Clappr } from 'educoder'
import axios from 'axios';
import EffectDisplayContent from './EffectDisplayContent'
class EvaluateSuccessEffectDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillReceiveProps(newProps, newContext) {

    }

    componentDidMount() {
        if (this.props.type == 'html') {
            const iframe = document.getElementById('_displayIframe')
            if (iframe && iframe.contentWindow && this.props.iframe_src) {
                iframe.contentWindow.open()
                iframe.contentWindow.document.write(this.props.iframe_src);
                iframe.contentWindow.document.close();
            } else {
                console.error('not mounted')
            }
        }
    }
    hidepicture = () => {
        const dom = document.getElementById('picture_display');
		ReactDOM.unmountComponentAtNode(dom)
        // window.$('#picture_display').hide();

        window.$('.data-tip-right').hide()
    }
    renderContent = () => {
// qrcode
        // const type = 'image' // 'qrcode'
        const { type, qrcode_str,
            answer_picture, orignal_picture, user_picture, contents,
            user_file, answer_file, orignal_file } = this.props;
        if (type == 'qrcode') {
            // 单张图片，比如安卓评测完显示qrcode 
            return (
                <div style={{ textAlign: 'center', paddingTop: '5%' }}>
                    <p style={{ color: '#333', fontSize: '24px' }}>请使用Android手机浏览器扫码查看效果（暂不支持微信、QQ与支付宝扫一扫）</p>
                    <p>
                        {/* <img src="data:image/png;base64,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&#10;+NIc7MmVogAAAABJRU5ErkJggg==&#10;">
                        </img> */}
                        <img src={`data:image/png;base64,${qrcode_str}`}>
                        </img>
                    </p>
                </div>
            )
        } 
        if (type == 'image') {
            return (
                <div className="task-popup-content">
                    <div className="clearfix">
                        {orignal_picture[0] && <p className="edu-txt-center fl with33 mr03precent font-18">原始图片</p>}
                        <p className="edu-txt-center fl font-18 with33 mr03precent">实际输出图片</p>
                        <p className="edu-txt-center fl font-18 with33 mr03precent">预期输出图片</p>
                    </div>
                    <div className="clearfix" id="picture-content">
                        {orignal_picture[0] && <div className="fl with33 mr03precent pt10 mb50">
                            {orignal_picture.map(item => {
                                return (
                                    <img alt="Icon" 
                                        src={ item.pic_url}/> )
                            })}
                            {/* {orignal_picture[0] && <img alt="Icon" 
                                src={ orignal_picture[0].pic_url}/>} */}
                        </div>}
                        <div className="fl with33 mr03precent pt10 mb50">
                            {user_picture.map(item => {
                                return (
                                    <img alt="Icon" 
                                        src={ item.pic_url}/> )
                            })}
                        </div> 
                        <div className="fl with33 mr03precent pt10 mb50">
                            {answer_picture.map(item => {
                                return (
                                    <img alt="Icon" 
                                        src={ item.pic_url}/> )
                            })}
                            {/* { answer_picture[0] && <img alt="Icon" 
                                src={ answer_picture[0].pic_url}/> } */}
                        </div>
                    </div>
                </div> 
            )
        }
        if (type == "txt") {
            return (
                <div className="task-popup-content clearfix">
                    <div className="with80" style={{margin: '0 auto'}}>
                        <p className="color-blue font-18 mb20 edu-txt-center">实际输出</p>
                        <textarea className="output-txt" readonly="" defaultValue={contents}></textarea>
                    </div>
                </div> 
            )
        } else if (type == "html") {
            return (
                <iframe id="_displayIframe"></iframe>
            )
        } else if (type == 'mp3') {
            return (
                <EffectDisplayContent
                    typeName="音频"
                    content1={ orignal_file[0] && orignal_file[0].file_url 
                        ? <Clappr source={orignal_file[0].file_url} id="1" className="clappr" type="mp3"></Clappr> : null }
                    content2={ user_file[0] && user_file[0].file_url 
                        ? <Clappr source={user_file[0].file_url} id="2" className="clappr" type="mp3"></Clappr> : null }
                    content3={ answer_file[0] && answer_file[0].file_url 
                        ? <Clappr source={answer_file[0].file_url} id="3" className="clappr" type="mp3"></Clappr> : null }
                ></EffectDisplayContent>
            )
        } else if (type == 'mp4') {
            return (
                <EffectDisplayContent
                    typeName="视频"
                    content1={ orignal_file[0] && orignal_file[0].file_url 
                        ? <Clappr source={orignal_file[0].file_url} id="1" className="clappr" type="mp4"></Clappr> : null }
                    content2={ user_file[0] && user_file[0].file_url 
                        ? <Clappr source={user_file[0].file_url} id="2" className="clappr" type="mp4"></Clappr> : null }
                    content3={ answer_file[0] && answer_file[0].file_url 
                        ? <Clappr source={answer_file[0].file_url} id="3" className="clappr" type="mp4"></Clappr> : null }
                ></EffectDisplayContent>
            )
        } 

        /* <div className="with49 fr">
            <p className="font-18 mb20 edu-txt-center">预期输出</p>
            <textarea className="output-txt"></textarea>
        </div> */

    }
    render() {
        const { tpmLoading } = this.props;
        return (
            <React.Fragment>
                <style>
                {`
                    .task-popup-content {
                        overflow-y: auto;
                        padding-bottom: 55px;
                        height: 100%;
                        box-sizing: border-box;
                    }

                    iframe#_displayIframe {
                        width: 100%;
                        height: 100%;
                    }
                `}
                </style>
                <div className="photo_display">
                    <div className="task-popup">
                        <div className="task-popup-title clearfix">
                            <h3 className="fl color-grey3 mt4">查看效果</h3>
                            <a href="javascript:void(0);" onClick={this.hidepicture} 
                                    data-tip-left="关闭查看效果" className="pop_close fr">
                                <i className="fa fa-times-circle font-18 link-color-grey mt5"></i>
                            </a>
                        </div>

                        { this.renderContent() }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EvaluateSuccessEffectDisplay;

// const qrcode_str = "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\nDsg/oT4AK5IwWw0AAAAASUVORK5CYII=\n"

const content = `
AUC值为:0.9786487367132528 
 你的得分为：782.9189893706023
  你的处理结果如下：
        id  type
155      9     0
273     13     1
1236    15     1
618     18     1
851     20     1
64      24     1
366     27     0
42      30     1
1468    31     1
1059    32     0
1311    33     1
217     34     1
486     44     1
796     46     1
505     48     1
661     52     1
1455    53     0
514     62     0
43      66     1
930     69     0
393     70     0
574     71     1
1175    74     1
99      80     1
441     81     1
71      85     1
971     89     1
361     91     1
449     94     1
517     96     0
...    ...   ...
1031  4901     1
1065  4902     0
153   4903     1
1141  4910     1
1028  4916     1
1021  4917     1
272   4918     1
809   4919     1
557   4921     0
1017  4922     1
313   4924     1
529   4926     1
1350  4929     1
891   4933     1
989   4940     1
1213  4941     1
821   4943     1
939   4955     1
1470  4962     1
1158  4963     1
38    4967     1
609   4969     1
425   4976     1
836   4982     1
1387  4989     1
927   4991     0
417   4996     1
428   4997     1
752   4999     1
1148  5000     1

[1500 rows x 2 columns]`