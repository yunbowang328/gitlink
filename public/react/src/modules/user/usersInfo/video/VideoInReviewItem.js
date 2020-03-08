import React, { useState, useEffect, useContext, memo } from 'react';
import { Progress, Input, Tooltip } from 'antd'
import { getUrl2, isDev, CBreadcrumb, ActionBtn, ThemeContext } from 'educoder'
import axios from 'axios'
import moment from 'moment'
import playIcon from './images/play.png'
import ClipboardJS from 'clipboard'

/**
cover_url: "http://video.educoder.net/f6ba49c3944b43ee98736898e31b7d88/snapshots/12da3f7df07c499b8f0fc6dc410094e9-00005.jpg"
created_at: "2019-08-12 13:48:26"
file_url: "http://video.educoder.net/sv/4c7eb4-16c845ee09c/4c7eb4-16c845ee09c.mp4"
id: 1
published_at: "2019-08-12 15:38:00"
title: "测试标题"
updated_at: "2019-08-12 17:17:09"
 */
let _clipboard = null;
const clipboardMap = {}
function VideoInReviewItem (props) {
    const theme = useContext(ThemeContext);
    const { history, file_url, cover_url, title, created_at, published_at, isReview, id
        , onEditVideo, onMaskClick, getCopyText, showNotification,vv,play_duration,operation , deleteVideo} = props;
    useEffect(()=> {
        if (!isReview) {
            _clipboard = new ClipboardJS(`.copybtn_item_${id}`);
            _clipboard.on('success', (e) => {
                showNotification('复制成功')
            });
            clipboardMap[id] = _clipboard
        }
        return () => {
            if (clipboardMap[id]) {
                clipboardMap[id].destroy();
                clipboardMap[id] = null;
            }
        }
    }, [])
    const username = props.match.params.username
    function toList() {
        history.push(`/users/${username}/videos`)
    }
    function toUpload() {
        history.push(`/users/${username}/videos/upload`)
    }
    return (
        <div className={`${isReview ? 'videoInReviewItem' : 'nItem'} videoItem`}>

            <img className="cover" src={cover_url || "http://video.educoder.net/e7d18970482a46d2a6f0e951b504256c/snapshots/491e113950d74f1dab276097dae287dd-00005.jpg"}
            ></img>
            {!isReview && <div className="mask" onClick={() => onMaskClick(props)}>

            </div>}
            {!isReview &&
            <div className="playWrap" onClick={() => onMaskClick(props)}>
                <img className="play mp23" src={playIcon}></img>
                {play_duration===0?"":<div className={"play_duration"}>累计学习时长：{play_duration} h</div>}
            </div>
            }
            <div className="square-main">
                <div className="title overflowHidden1"
                    title={title && title.length > 20 ? title : ''}
                >{title}</div>
                <div className="df buttonRow mb10">

                    <span className="time">{moment(published_at || created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <div className="df buttonRow">
                    {/* 2019-09-01 10:00:22 */}
                    <span className={"dianjilianicon"}>
                         {vv===0?"":<Tooltip title="播放次数" placement="bottom">
                             <i className={`icon-dianjiliang iconfont dianjilianicon`}></i>
                         </Tooltip> } {vv===0?"":vv}
                    </span>
                    { isReview != true && <div>
                        {
                            deleteVideo && 
                            <Tooltip title="删除" placement="bottom">
                                <i className="icon-shanchu iconfont" onClick={() => deleteVideo(props)}
                                    style={{    marginTop: '1px', display: 'inline-block'}}
                                ></i>
                            </Tooltip>
                        }
                        
                        {
                            operation &&
                            <Tooltip title="编辑" placement="bottom">
                                <i className="icon-bianji1 iconfont" onClick={() => onEditVideo(props)}
                                style={{    marginTop: '1px', display: 'inline-block'}}
                                ></i>
                            </Tooltip>
                        }
                        <Tooltip title="复制视频地址" placement="bottom">
                            <i className={`icon-fuzhi iconfont copybtn_item_${id}`} data-clipboard-text={getCopyText(file_url, cover_url)}></i>
                        </Tooltip>
                    </div> }
                </div>
            </div>
        </div>
    )
}

export default VideoInReviewItem
