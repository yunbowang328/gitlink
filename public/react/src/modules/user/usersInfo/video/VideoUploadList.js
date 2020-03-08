import React, { useState, useEffect, useReducer, useContext, memo } from 'react';
import {  Link, Prompt } from "react-router-dom";
import { getUrl2, isDev, CBreadcrumb, ActionBtn, ThemeContext } from 'educoder'
import axios from 'axios'

import VideoUpload from './VideoUpload'
import { Button, Spin } from 'antd'

import { getUploader } from './AliyunUploaderManager'
import { reducer, initialState } from './VideoReducer'
import { deleteVideoInCloud } from './VideoUtil'
import uploadIcon from './images/upload.png'
import uploadHoverIcon from './images/upload_hover.png'

let uploader
const files = []
const MAX_FILE_COUNT = 3
const MAX_FILE_SIZE = 500
let noUploads = true

function VideoUploadList (props) {
    
    // const [videos, setvideos] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const theme = useContext(ThemeContext)
    const [couldRouteNav, setCouldRouteNav] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setCouldRouteNav(false);
        // Chrome removed support for custom message in ver 51
        // https://stackoverflow.com/questions/38879742/is-it-possible-to-display-a-custom-message-in-the-beforeunload-popup
        window.addEventListener("beforeunload", beforeunload);
        // window.onbeforeunload = beforeunload
        return () => {
            uploader = null;
            // window.onbeforeunload = null;
            window.removeEventListener("beforeunload", beforeunload);
        }
    }, [])
    // TODO 闭包！
    noUploads = (!state.videos || state.videos.length == 0);
    function beforeunload(e) {
        if (noUploads) {
            return true;
        }
        var confirmationMessage = "确认要离开当前页面，当前数据不可恢复";

        (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
        return confirmationMessage;                                //Webkit, Safari, Chrome etc.
    }
    const _beforeunload = beforeunload // .bind(this, noUploads, state)

    const username = props.match.params.username || props.CourseUser;
    const { showNotification, history } = props;
    const uploaderOptions = {
            
    }
    function onUploadChange (e) {
        var file = e.target.files[0]
        if (!file) {
            // alert("请先选择需要上传的文件!")
            return
        }
        // avi、flv、f4v、m4v、mov、mp4、rmvb、swf、webm
        if (file.name 
            && file.name.indexOf('.avi') == -1 && file.name.indexOf('.flv') == -1 
            && file.name.indexOf('.f4v') == -1 && file.name.indexOf('.m4v') == -1 
            && file.name.indexOf('.mov') == -1 && file.name.indexOf('.mp4') == -1 
            && file.name.indexOf('.rmvb') == -1 && file.name.indexOf('.swf') == -1 
            && file.name.indexOf('.webm') == -1 
        ) {
            showNotification(`不支持的视频格式`)
            clearInput()
            return;
        }
        if (file.size >(parseInt(MAX_FILE_SIZE) * 1024 * 1024)) {
            // 超过500m TODO
            clearInput()
            showNotification(`视频大小超过${MAX_FILE_SIZE}M`)
            return;
        }
        let gotTheSameFileName = false;
        state.videos.some((item) => {
            if (item.name == file.name) {
                gotTheSameFileName = true;
                return true;
            }
        })
        if (gotTheSameFileName) {
            clearInput()
            showNotification(`你不能上传同一个视频文件名称，请重新选择。`)
            return;
        }

        var Title = file.name
        var userData = '{"Vod":{}}'
        
        if (!uploader) {
            
            getUploader(username, 
            {   
                // 重新创建  才会用最新的 dispatch
                create: !uploader,
                addFileSuccess: (uploadInfo) => {
                    setLoading(true);
                    const file = uploadInfo.file;
                    console.log('addFileSuccess', uploadInfo)
                    // const newvideos = [...videos, {
                    //     name: file.name,
                    //     size: file.size,
                    //     type: file.type,

                    //     fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
                    //     state: uploadInfo.state, //  "Uploading"  "Ready"
                    //     videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
                    //     loaded: 0
                    // }]
                    // setvideos(newvideos)

                    // files.push(file)
                    clearInput()
                    dispatch({type: 'addVideo', uploadInfo})
                },
                onUploadProgress: (uploadInfo, totalSize, progress) => {
                    setLoading(false);
                    console.log("upload",uploadInfo);
                    var progressPercent = Math.ceil(progress * 100)

                    // let _index = -1;
                    // videos.some((item, index) => {
                    //     // addFileSuccess的时候没有fileHash
                    //     // if (uploadInfo.fileHash == item.fileHash) {
                    //     if (uploadInfo.file.name == item.name) {
                    //         _index = index
                    //         return true;
                    //     }
                    // })

                    // TODO 这里不用reducer，会出现state被重置的问题

                    // if (_index == -1) {
                    //     const newvideos = [...videos, {
                    //         name: file.name,
                    //         size: file.size,
                    //         type: file.type,

                    //         fileHash: uploadInfo.fileHash, // "ba1bbc53fdecd9eaaae479fbd9518442"
                    //         state: uploadInfo.state, //  "Uploading"  "Ready"
                    //         videoId: uploadInfo.videoId, //   "719b82c875c34ac39f94feb145d25ad2"
                    //         loaded: progressPercent
                    //     }]
                    //     setvideos(newvideos)
                    //     return;
                    // }

                    // //           exercise_questions : update(prevState.exercise_questions, {[index]: { isNew: {$set: false}}})
                    // setvideos(update(videos, {[_index]: { loaded: {$set: progressPercent}}}))

                    dispatch({type: 'updateProgress', uploadInfo, progressPercent})
                },

                onUploadFailed: (uploadInfo) => {
                    console.log('onUploadFailed', uploadInfo)
                    props.showNotification('视频云服务出现异常，请重新上传。')
                },
                onUploadEnd: (uploadInfo) => {
                    console.log('onUploadEnd', uploadInfo)

                },

                onUploadSucceed: (uploadInfo) => {
                    console.log('onUploadSucceed', uploadInfo)

                },
                onUploadError: (uploadInfo) => {
                    
                },
                // 可能需要等lib加载完毕才能执行
                gotUploader: (_uploader) => {
                    // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
                    console.log(_uploader)
                    let result = _uploader.addFile(file, null, null, null, userData)
                    uploader = _uploader;

                    window.uploader = uploader;
                }
            }
            // )
            )
        } else {
            let result = uploader.addFile(file, null, null, null, userData)
        }
    }
    function clearInput() {
        const _input = document.getElementById('fileUpload')
        _input.value = ''
    }
    function doDelete(index, isSuccess) {
        uploader.deleteFile(index)
        if (isSuccess) {
            // uploader.deleteFile(index)
            // deleteVideoInCloud(username, state.videos[index].videoId)
        } else {
            // uploader.cancelFile(index)
        }
            
        clearInput()
        dispatch({type: 'removeVideo', index}) 
        // setvideos([...videos.splice(index, 1)])
    }
    //  uploader.deleteFile(index);
    function cancelUpload(index, isSuccess) {
        props.confirm({
            content: <div>
                <div>您确认要{isSuccess ? '删除' : '取消上传'}该视频吗？</div>
            </div>,
            onOk: () => {
                doDelete(index, isSuccess)
            }
        })
        
    }
    function onPublish() {
        // 下列这些参数只有是课堂里面上传视频才会有
        const { CourseId , CourseUser ,flag , successFunc } = props;
        if (state.videos.length == 0) {
            showNotification('请先上传视频')
            return;
        }
        const publishUrl = `/users/${ flag ? CourseUser : username }/videos/batch_publish.json`
        axios.post(publishUrl, {
            videos: state.videos.map(item => {
                return {
                    video_id: item.videoId,
                    // todo
                    title: item.title,
                    course_id:CourseId
                }
            })
        }).then((response) => {
           // to success page
            if(response){
                if (response.data.status == 0) {
                    dispatch({type: 'removeAll'})
                    if(flag){
                        successFunc(false)
                    }else{
                    history.push(`/users/${username}/videos/success`)
                    }
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    function onTitleChange(title, index) {
        dispatch({type: 'updateTitle', title, index})
    }
    // login
    const { flag , CourseId } = props;
    const urls = 
    flag ? 
    <Link to={`/users/${username}/videos/protocol?course=${CourseId}`} target="_blank" style={{color: theme.foreground_select}}>上传内容协议</Link>
    :
    <Link to={`/users/${username}/videos/protocol`} style={{color: theme.foreground_select}}>上传内容协议</Link>
    const protocolLine = <div>上传视频，即表示您已同意{urls}，不得上传未经他人授权的作品</div>
    
    return (
        <div className={flag?"edu-back-white pb100 videoUploadList":"educontent videoUploadList"} style={{ marginBottom: `${flag?"0px":"200px"}` }}>
            <Prompt
                when={state.videos.length }
                message='确认要离开当前页面，当前数据不可恢复'
            />
            <style>{`
                .videoUploadList .section {
                    background: #fff;
                    padding: 16px 20px;
                    padding-top: 0px;
                    position: relative;

                    padding-bottom: 36px;
                }
                .videoUploadList .cBreadcrumb {
                    margin-top: 16px;
                }
                .videoUploadList .uploadTip {
                    line-height: 18px;
                    margin-bottom: 16px;
                }
                .videoUploadList .title {
                    margin-bottom: 4px;
                }
                .videoUploadList .title .head {
                    display: inline-block;
                    margin-right: 8px;
                }
                .videoUploadList .title .titleDescription {
                    color: #555;
                }
                .videoUploadList .section .description {
                    padding-top: 10px;
                    margin-top: 20px;
                    margin-bottom: 30px;
                    

                    color: #777;
                }
                .videoUploadList .section .description.noUploads {
                  text-align: 'center';
                }
                .videoUploadList .publishBtn {
                    padding: 0 16px
                }
                .videoUploadList .publishRow .publishBtn {
                    padding: 6px 24px;
                    height: auto;
                    margin-bottom: 24px;
                }
                .videoUploadList .addVideoBtn {
                    position: absolute;
                    right: 30px;
                }
                .videoUploadList .publishRow {
                    text-align: center;
                    margin-top: 42px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .noUploads {
                    text-align: center;
                }
                    

                /* item */
                .videoUploadList .cancelUpload {
                    flex: 0 0 200px;
                    margin-left: 2px;
                }
                .videoUploadList .titleInput {
                    width: 480px;
                    margin-top: 16px;
                }
                .videoUploadList .videoUpload {
                    padding: 26px 0;
                    border-bottom: 1px dashed #DCDCDC;
                }
                .videoUploadList .videoUpload:last-child {
                    border-bottom: none;
                }
                
                .noUploads img {
                    width: 64px;
                    height: 48px;

                }
                .noUploads .uploadHoverIcon {
                    display: none;
                }
                .noUploads .imgWrap:hover .uploadHoverIcon {
                    display: inline;
                }
                .noUploads .imgWrap:hover .uploadIcon {
                    display: none;
                }
                .noUploads .imgWrap {
                    width: 72px;
                    height: 54px;
                    margin: 0 auto;
                    cursor: pointer;
                }
            `}</style>
            {
                !flag &&
                <React.Fragment>
                    <CBreadcrumb
                        className="mb26"
                        separator=" > "
                        items={[
                            { to: `/users/${username}/videos`, name:  '视频'},
                            { name: '上传'}
                        ]}
                    ></CBreadcrumb>

                    <div className="title">
                        <h2 className="head">上传视频</h2>
                        {/* <span className="titleDescription">单次最多支持{MAX_FILE_COUNT}个视频文件上传，不支持断点续传，单个视频文件最大{MAX_FILE_SIZE}M</span> */}
                    </div>
                </React.Fragment>
            }
            
            <div className="section">
                {/* noUploads */}
                {noUploads && <div className="noUploads" style={{paddingTop: '72px'}} >
                    <div className="imgWrap" onClick={() => document.getElementById('fileUpload').click()}>
                        <img className="uploadIcon" src={uploadIcon} ></img>
                        <img className="uploadHoverIcon" src={uploadHoverIcon} ></img>
                    </div>

                    
                    <div style={{
                        color: '#000000',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '20px'
                    }}>选择您要上传的视频</div>
                    {protocolLine}
                </div>}
                <Spin spinning={loading}>
                    <div>
                        {state.videos.map((item, vIndex) => {
                            return (
                                <VideoUpload {...props} {...item} className=""
                                    cancelUpload={cancelUpload}
                                    onTitleChange={onTitleChange}
                                    key={vIndex}
                                    index={vIndex}
                                ></VideoUpload>
                            )
                        })}
                    </div>
                </Spin>
                {state.videos && state.videos.length === MAX_FILE_COUNT && 
                <div className="uploadTip">
                    {/* <i className="iconfont icon-tishi" style={{color: '#FF6F6F', verticalAlign: 'text-bottom'}}></i> */}
                    <span>提示：单次最多支持3个视频文件上传</span> 
                </div>}

                {(!noUploads && state.videos.length < MAX_FILE_COUNT) && <ActionBtn className="publishBtn" onClick={() => document.getElementById('fileUpload').click()}
                >继续添加</ActionBtn>}

                <div className={`description ${noUploads ? 'noUploads' : ''}`}>
                    <div className="">视频大小：不支持断点续传，单个视频文件最大500M；单次最多支持3个视频文件上传 </div>
                    <div className="">视频规格：avi、flv、f4v、m4v、mov、mp4、rmvb、swf、webm </div>
                    <div className="">温馨提示：请勿上传违法视频。平台将为每一个视频分配一个地址，您可以通过引用该地址将视频使用在实训项目等模块</div>
                </div>

                {!noUploads && <React.Fragment>

                {/* {(state.videos.length < MAX_FILE_COUNT) && <Button type="primary" icon="plus-square"
                    onClick={() => { document.getElementById('fileUpload').click()}}
                    className="fr addVideoBtn"
                >
                    添加更多视频
                </Button>} */}
                
                <div style={{}} className="publishRow">
                    <ActionBtn className="publishBtn" onClick={() => onPublish()}
                    >立即发布</ActionBtn>

                    {protocolLine}
                </div>

                </React.Fragment>}
            </div>
            {/* windows video/* 不管用 TODO */}
            <input type="file" id="fileUpload" style={{display: 'none'}} onChange={onUploadChange}
                accept=".mkv, .flv, .f4v, .rmvb, .swf, video/mp4,video/x-m4v,video/flv,video/f4v,video/rmvb,video/swf,video/*"
            ></input>
        </div>
    )
}

export default VideoUploadList



/**

bucket: "outin-396971199eed11e991a100163e1c7426"
checkpoint: {file: File, name: "sv/2d0fd065-16c7a62fcc5/2d0fd065-16c7a62fcc5.mp4", fileSize: 491511493, partSize: 1048576, uploadId: "A8DB0663F44C44F58F3F7F45892ED08B", …}
endpoint: "https://oss-cn-shanghai.aliyuncs.com"
file: File {name: "[阳光电影-www.ygdy8.com]金秘书为何这样-02.mp4", lastModified: 1532441562000, lastModifiedDate: Tue Jul 24 2018 22:12:42 GMT+0800 (China Standard Time), webkitRelativePath: "", size: 491511493, …}
fileHash: "ba1bbc53fdecd9eaaae479fbd9518442"
isImage: false
loaded: 0.5927505330490405
object: "sv/2d0fd065-16c7a62fcc5/2d0fd065-16c7a62fcc5.mp4"
region: "cn-shanghai"
retry: false
ri: "F0FDC11A-9A92-4A50-882A-423C3EA499F3"
state: "Uploading"
userData: "eyJWb2QiOnt9fQ=="
videoId: "719b82c875c34ac39f94feb145d25ad2"

    file
    lastModified: 1532441562000
    lastModifiedDate: Tue Jul 24 2018 22:12:42 GMT+0800 (China Standard Time) {}
    name: "[阳光电影-www.ygdy8.com]金秘书为何这样-02.mp4"
    size: 491511493
    type: "video/mp4"
    webkitRelativePath: ""


 */