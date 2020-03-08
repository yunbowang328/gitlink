import React, { useState, useEffect, useContext, memo } from 'react';
import { Progress, Input } from 'antd'
import { getUrl2, isDev, CBreadcrumb, ActionBtn, ThemeContext } from 'educoder'
import axios from 'axios'
import okIcon from './images/ok_border.png'

function VideoUpload (props) {
    const theme = useContext(ThemeContext);
    const { history } = props;
    
    const username = props.match.params.username
    function toList() {
        history.push(`/users/${username}/videos`)
    }
    function toUpload() {
        history.push(`/users/${username}/videos/upload`)

    }
    return (
        <div className={`videoPublishSuccess educontent`}>
            <CBreadcrumb
                className="mb26 mt16"
                separator=" > "
                items={[
                    { to: `/users/${username}/videos`, name:  '视频'},
                    { name: '上传'}
                ]}
            ></CBreadcrumb>

            <style>{`
                .videoPublishSuccess .section {
                    background: #fff;
                    padding: 72px 20px;
                    position: relative;

                    text-align: center;
                    color: ${theme.foreground_tip};
                }
                .videoPublishSuccess img.ok {
                    width: 64px;
                    margin: 16px;
                    margin-top: 0px;
                }
                .videoPublishSuccess .tip {
                    margin-top: 10px;
                    margin-bottom: 12px;
                }
                .videoPublishSuccess .toListBtn {
                    margin-right: 10px;
                }
                .videoPublishSuccess .toUploadBtn {
                    width: 112px;
                }
            `}</style>

            <div className="section">
                    <div>
                        <img className="ok" src={okIcon}></img>
                        {/* <i className="icon-wanchenggouxuan iconfont font-36" style={{color: theme.foreground_select}}></i> */}
                    </div>
                    <div className="font-16" style={{ 'line-height': '16px'}}>恭喜！</div>
                    <div className="font-16">提交成功</div>
                    <div className="tip">平台正在审核您的申请，审核结果将以平台消息的形式通知您</div>
                    <div>
                        <ActionBtn className="toListBtn" onClick={toList}>查看已上传视频</ActionBtn>
                        <ActionBtn className="toUploadBtn" onClick={toUpload}>继续上传</ActionBtn>
                    </div>
            </div>
        </div>
    )
}

export default VideoUpload
