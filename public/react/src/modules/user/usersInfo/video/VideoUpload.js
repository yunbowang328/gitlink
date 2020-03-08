import React, { useState, useEffect, memo } from 'react';
import { Progress, Input } from 'antd'
import { getUrl2, isDev, CBreadcrumb, ActionBtn } from 'educoder'
import axios from 'axios'


const MAX_LENGTH = 30

/**
name: file.name,
size: file.size,
type: file.type,

fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
state: uploadInfo.state, //  "Uploading"
videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
loaded: 0

 */
function VideoUpload (props) {
    const { className, index, name, loaded, state, cancelUpload, onTitleChange, title } = props;
    // const [title, setTitle] = useState('')
    const username = props.match.params.username

    function titleChange (e) {
        onTitleChange(e.target.value, index)
    }
    return (
        <div className={`videoUpload ${className}`}>
            <div className="filename">{index+1}. {name}</div>
            <div className="progress df">
                <Progress percent={loaded} 
                    status={loaded == '100' ? "" : 'active'}
                />
                <div className="cancelUpload">
                    <ActionBtn className="" onClick={() => cancelUpload(index, loaded == '100' )}>{loaded == '100' ? "删除" : "取消上传"}</ActionBtn>
                </div>
            </div>
          <style>
            {
              `
                .titleInputysl .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
            }
          </style>
            <div className="courseForm" style={{display:"flex",alignItems:"center"}}>
                <span className="titleLabel mt15">标题：</span>
                <Input placeholder={`标题支持最多${MAX_LENGTH}个字符`} onInput={titleChange} maxLength={MAX_LENGTH} addonAfter={
                        <span className="color-grey-6 font-13">{String(title.length)}/{MAX_LENGTH}</span>
                    }
                    className="titleInput titleInputysl"
                ></Input>
            </div>
        </div>
    )
}

export default VideoUpload
