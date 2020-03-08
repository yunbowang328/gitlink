import React, { useState, useEffect, memo } from 'react';

import { getUrl2, isDev } from 'educoder'
import axios from 'axios'
const $ = window.$
let _url_origin = getUrl2()
let _path = isDev() ? 'public' : 'build'

let uploader

let _testHost = '' ; '192.168.2.63:3001/api'


const login = 'innov'

function createUploader () {
    uploader = new window.AliyunUpload.Vod({
        timeout: $('#timeout').val() || 60000,
        partSize: $('#partSize').val() || 1048576,
        parallel: $('#parallel').val() || 5,
        retryCount: $('#retryCount').val() || 3,
        retryDuration: $('#retryDuration').val() || 2,
        region: $('#region').val() || 'ap-southeast-1',
        userId: $('#userId').val() || 1829848226361863, //, // 1303984639806000,
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {
            console.log('addFileSuccess')
            $('#authUpload').attr('disabled', false)
            $('#resumeUpload').attr('disabled', false)
            $('#status').text('添加文件成功, 等待上传...')
            console.log("addFileSuccess: " + uploadInfo.file.name)

            $('#pauseUpload').attr('disabled', false)
            uploader.startUpload()
        },
        // 开始上传
        onUploadstarted: function (uploadInfo) {
        // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
        // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
        // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
        // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
        // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
        // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
            if (!uploadInfo.videoId) {
                // var createUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateUploadVideo?Title=testvod1&FileName=aa.mp4&BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&VideoId=5bfcc7864fc14b96972842172207c9e6'
                // $.get(createUrl, function (data) {
                //     var uploadAuth = data.UploadAuth
                //     var uploadAddress = data.UploadAddress
                //     var videoId = data.VideoId
                //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
                // }, 'json')
                
                var createUrl = `${_testHost}/users/${login}/video_auths.json?debug=true`
                
                axios.post(createUrl, {
                    title: 'testvod1',
                    file_name: 'aa.mp4'
                }).then((response) => {
                    // if (response.data.status == )
                    const data = response.data.data
                    var uploadAuth = data.UploadAuth
                    var uploadAddress = data.UploadAddress
                    var videoId = data.VideoId
                    uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
                }).catch((error) => {
                    console.log(error)
                })
                

                $('#status').text('文件开始上传...')
                console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            } else {
                // 如果videoId有值，根据videoId刷新上传凭证
                // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
                // var refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
                // $.get(refreshUrl, function (data) {
                //     var uploadAuth = data.UploadAuth
                //     var uploadAddress = data.UploadAddress
                //     var videoId = data.VideoId
                // uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
                // }, 'json')

                var refreshUrl = `${_testHost}/users/${login}/video_auths.json?debug=true`
                
                axios.put(refreshUrl, {
                    video_id: uploadInfo.videoId,
                }).then((response) => {
                    const data = response.data.data
                    var uploadAuth = data.UploadAuth
                    var uploadAddress = data.UploadAddress
                    var videoId = data.VideoId
                    uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            $('#status').text('文件上传成功!')
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
            $('#status').text('文件上传失败!')
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo, code, message) {
            console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
            $('#status').text('文件上传已暂停!')
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (uploadInfo, totalSize, progress) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
            var progressPercent = Math.ceil(progress * 100)
            $('#auth-progress').text(progressPercent)
            $('#status').text('文件上传中...')
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
            // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
            // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
            // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
            $('#status').text('文件上传超时!')

            // let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
            // $.get(refreshUrl, function (data) {
            //     var uploadAuth = data.UploadAuth
            //     uploader.resumeUploadWithAuth(uploadAuth)
            //     console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
            // }, 'json')

            var refreshUrl = `${_testHost}/users/${login}/video_auths.json?debug=true`
                
            axios.put(refreshUrl, {
                video_id: uploadInfo.videoId,
            }).then((response) => {
                const data = response.data.data
                var uploadAuth = data.UploadAuth
                uploader.resumeUploadWithAuth(uploadAuth)
            }).catch((error) => {
                console.log(error)
            })
        },
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo) {
            $('#status').text('文件上传完毕!')
            console.log("onUploadEnd: uploaded all the files")
        }
    })
    return uploader
}
function AliyunUploader(props) {
    
    useEffect(() => {
        if (window.AliyunUpload && window.AliyunUpload.Vod) {

        } else {
            $.getScript(
            `${_url_origin}/react/${_path}/js/aliyun-upload/lib/es6-promise.min.js`,
            (data, textStatus, jqxhr) => {
                $.getScript(
                    `${_url_origin}/react/${_path}/js/aliyun-upload/lib/aliyun-oss-sdk-5.3.1.min.js`,
                (data, textStatus, jqxhr) => {
                    $.getScript(
                        `${_url_origin}/react/${_path}/js/aliyun-upload/aliyun-upload-sdk-1.5.0.min.js`,
                    (data, textStatus, jqxhr) => {
                    
                    });
                });
            });
        }

        $('#fileUpload').on('change', function (e) {
            var file = e.target.files[0]
            if (!file) {
                alert("请先选择需要上传的文件!")
                return
            }
            var Title = file.name
            var userData = '{"Vod":{}}'
            if (uploader) {
                uploader.stopUpload()
                $('#auth-progress').text('0')
                $('#status').text("")
            }
            if (!uploader) {
                uploader = createUploader()
            }
            // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
            console.log(uploader)
            let result = uploader.addFile(file, null, null, null, userData)
            $('#authUpload').attr('disabled', false)
            // $('#pauseUpload').attr('disabled', true)
            // $('#resumeUpload').attr('disabled', true)
        })
        return () => {
            $('#fileUpload').off('change')
        }
    }, [])

    let { source, id, className, type } = props;
    
    function onStop() {
        $('#resumeUpload').attr('disabled', false)
        // $('#pauseUpload').attr('disabled', true)
        uploader.stopUpload()
    }
    function onResume() {
        // $('#resumeUpload').attr('disabled', true)
        // $('#pauseUpload').attr('disabled', false)
        uploader.startUpload()
    }
    return(
        <React.Fragment>
            <div>
                <input type="file" id="fileUpload"></input>
                <label class="status">上传状态: <span id="status"></span></label>
            </div>
            <div class="upload-type">
                上传方式一, 使用 UploadAuth 上传:
                {/* <button id="authUpload" disabled="true">开始上传</button>
                <button id="pauseUpload" disabled="true" onClick={onStop}>暂停</button>
                <button id="resumeUpload" disabled="true" onClick={onResume}>恢复上传</button> */}
                <button id="authUpload" >开始上传</button>
                <button id="pauseUpload"  onClick={onStop}>暂停</button>
                <button id="resumeUpload"  onClick={onResume}>恢复上传</button>
                <span class="progress">上传进度: <i id="auth-progress">0</i> %</span>
                <span></span>
            </div>

        </React.Fragment>
    )
  
}
export default AliyunUploader