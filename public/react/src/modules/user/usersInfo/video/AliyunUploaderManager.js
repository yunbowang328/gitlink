import { getUrl2, isDev } from 'educoder'
import axios from 'axios'

let _url_origin = getUrl2()
let _path = isDev() ? 'public' : 'build'

let _testHost =  '' ;  // 'http://192.168.2.63:3001/api' ; // '' ; 
let login = 'innov'
// 工单注释
// https://workorder.console.aliyun.com/console.htm#/ticket/detail/?ticketId=FLASELR
// https://workorder.console.aliyun.com/console.htm#/ticket/detail/?ticketId=1FB4APN
// https://help.aliyun.com/document_detail/52204.html?spm=5176.2020520165.120.d52204.19a47029YWhro7#%E4%B8%8A%E4%BC%A0%E5%9C%B0%E5%9D%80%E5%92%8C%E5%87%AD%E8%AF%81%E6%96%B9%E5%BC%8F(%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8)
let uploader;
let $ = window.$
function loadLib(callback) {
    $.getScript(
        `${_url_origin}/react/${_path}/js/aliyun-upload/lib/es6-promise.min.js`,
        (data, textStatus, jqxhr) => {
            $.getScript(
                `${_url_origin}/react/${_path}/js/aliyun-upload/lib/aliyun-oss-sdk-5.3.1.min.js`,
            (data, textStatus, jqxhr) => {
                $.getScript(
                    `${_url_origin}/react/${_path}/js/aliyun-upload/aliyun-upload-sdk-1.5.0.min.js`,
                (data, textStatus, jqxhr) => {
                    callback && callback()
                });
            });
        });
}
function createUploader(options) {
    if (window.AliyunUpload && window.AliyunUpload.Vod) {
        doCreateUploader(options)
    } else {
        loadLib(() => {
            doCreateUploader(options)
        })
    }
}
function doCreateUploader (options) {
    uploader = new window.AliyunUpload.Vod({
        timeout: $('#timeout').val() || 60000,
        partSize: $('#partSize').val() || 1048576,
        parallel: $('#parallel').val() || 5,
        retryCount: $('#retryCount').val() || 3,
        retryDuration: $('#retryDuration').val() || 2,
        region: $('#region').val() || 'ap-southeast-1',
        userId: $('#userId').val() || 1829848226361863, // 1303984639806000,
        // 解决取消上传后无法继续上传同文件的问题
        // https://workorder.console.aliyun.com/console.htm#/ticket/detail/?ticketId=FLASELR
        enableUploadProgress: false,
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {

            console.log("addFileSuccess: " + uploadInfo.file.name)
            options.addFileSuccess && options.addFileSuccess(uploadInfo)
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

            const fileName = uploadInfo.file.name
            

            if (!uploadInfo.videoId) {
                
                var createUrl = `${_testHost}/users/${login}/video_auths.json`
                const _random = '' // Math.random().toString().substring(3, 6)+'-'
                axios.post(createUrl, {
                    title: _random+fileName,
                    file_name: _random+fileName
                }).then((response) => {
                    // if (response.data.status == )
                    if(response){
                        const data = response.data.data
                        var uploadAuth = data.UploadAuth
                        var uploadAddress = data.UploadAddress
                        var videoId = data.VideoId
                        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
    
                    }
                }).catch((error) => {
                    // 删除当前出错的，并执行下一个任务
                    uploader.deleteFile(uploader._curIndex)
                    uploader.nextUpload()
                    console.log(error)
                })
                

                $('#status').text('文件开始上传...')
                console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            } else {
                // 如果videoId有值，根据videoId刷新上传凭证
                var refreshUrl = `${_testHost}/users/${login}/video_auths.json`
                
                axios.put(refreshUrl, {
                    video_id: uploadInfo.videoId,
                    title: fileName,
                    file_name: fileName
                }).then((response) => {
                    if (response.data.status == -1) {
                        options.onUploadError && options.onUploadError(uploadInfo)
                        return;
                    }
                    const data = response.data.data
                    var uploadAuth = data.UploadAuth
                    var uploadAddress = data.UploadAddress
                    var videoId = data.VideoId
                    uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress)
                    // , videoId

                    
                }).catch((error) => {
                    uploader.deleteFile(uploader._curIndex)
                    uploader.nextUpload()
                    console.log(error)
                })
            }
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
            options.onUploadSucceed && options.onUploadSucceed(uploadInfo)

            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            $('#status').text('文件上传成功!')
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
            options.onUploadFailed && options.onUploadFailed(uploadInfo)

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
            options.onUploadProgress && options.onUploadProgress(uploadInfo, totalSize, progress)
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
            var refreshUrl = `${_testHost}/users/${login}/video_auths.json`
            

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
            options.onUploadEnd && options.onUploadEnd(uploadInfo)

            $('#status').text('文件上传完毕!')
            console.log("onUploadEnd: uploaded all the files")
        }
    })
    if (options.gotUploader) {
        options.gotUploader(uploader)
    }
}
export function getUploader (_login, options) {
    _login && (login = _login)
    if (!uploader || options.create == true) {
        createUploader(options)
    }
}