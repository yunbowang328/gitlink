import axios from 'axios'
const host = window.location.protocol + '//' + window.location.host
const wx = window.wx
function share(shareData) {
    try {
        wx.onMenuShareAppMessage(shareData);//分享给好友
        wx.onMenuShareTimeline(shareData);//分享到朋友圈
        wx.onMenuShareQQ(shareData);//分享给手机QQ
        wx.onMenuShareWeibo(shareData);//分享腾讯微博
        wx.onMenuShareQZone(shareData);//分享到QQ空间
    } catch(e) {
        console.log(e)
    }
}
const urlDoneMap = {}
function requestForSignatrue (callback) {
    const currentUrl = window.location.href.split('#')[0]

    if (window.wx) {
        if (urlDoneMap[currentUrl]) {
            callback && callback()
        } else {
            const wx = window.wx
            const url = '/wechats/js_sdk_signature.json'
            urlDoneMap[currentUrl] = true
            // window.encodeURIComponent()
            axios.post(url, {
                url: window.__testUrl || currentUrl,
            }).then((response) => {
                console.log('got res')
                const data = response.data;
                wx.config({
                    debug: false,
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr,
                    signature: data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',//
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ]
                });
                wx.ready(function () {
                    callback && callback()
                });
                wx.error(function (res) {
                    console.log('wx is error')
                    console.log(res)
                    //alert(res.errMsg);//错误提示
                });
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
/**
    实践课程	平台提供涵盖基础入门、案例实践和创新应用的完整实训项目体系，通过由浅入深的实训路径，帮助学生快速提升实战能力。
    实训项目	覆盖不同专业的IT实验和实训，每周更新，无需配置本机实验环境，随时随地开启企业级真实实训。
    翻转课堂	自动评测实训任务，支持技能统计，提供教学活动分析报告，减轻教师和助教的辅导压力，免去作业发布和批改的困扰，实时了解学生学习情况，全面提升教师施教效率和水平。
    单个课程和实训	获取课程/实训的简介	该课程或者实训展示的缩略图

 */
export function configShareForIndex (path) {  
    requestForSignatrue(() => {
        var shareData = {
            title: 'EduCoder - 首页',
            desc: 'Educoder是一个面向计算机类的互联网IT教育和实战平台，提供企业级工程实训，以实现工程化专业教学的自动化和智能化。高校和企业人员可以在此开展计算机实践性教学活动，将传统的知识传授和时兴的工程实战一体化。',
            link: host + (path || ''),
            imgUrl: window.__testImageUrl 
                || host + '/react/build/images/share_logo_icon.jpg'
        };
        share(shareData)
    })
}
export function configShareForPaths () {
    requestForSignatrue(() => {
        console.log('configShareForPaths', host)
        var shareData = {
            title: 'EduCoder - 实践课程',
            desc: '平台提供涵盖基础入门、案例实践和创新应用的完整实训项目体系，通过由浅入深的实训路径，帮助学生快速提升实战能力。',
            link: `${host}/paths`,
            imgUrl: window.__testImageUrl 
                || host + '/react/build/images/share_logo_icon.jpg'
        };
        share(shareData)
    })
}
export function configShareForShixuns () {
    requestForSignatrue(() => {
        console.log('configShareForShixuns', host)

        var shareData = {
            title: 'EduCoder - 实训项目',
            desc: '覆盖不同专业的IT实验和实训，每周更新，无需配置本机实验环境，随时随地开启企业级真实实训。',
            link: `${host}/shixuns`,
            imgUrl: window.__testImageUrl 
                || host + '/react/build/images/share_logo_icon.jpg'
        };
        share(shareData)
    })
}
export function configShareForCourses () {
    requestForSignatrue(() => {
        console.log('configShareForCourses', host)

        var shareData = {
            title: 'EduCoder - 翻转课堂',
            desc: '自动评测实训任务，支持技能统计，提供教学活动分析报告，减轻教师和助教的辅导压力，免去作业发布和批改的困扰，实时了解学生学习情况，全面提升教师施教效率和水平。',
            link: `${host}/courses`,
            imgUrl: window.__testImageUrl 
                || host + '/react/build/images/share_logo_icon.jpg'
        };
        share(shareData)
    })
}

// detail
export function configShareForCustom (title, desc, imgUrl, path) {
    requestForSignatrue(() => {
        console.log('configShareForCustom', host)
        const _url = window.location.href.split('#')[0];
        var shareData = {
            title: title,
            desc: desc,
            link: path ? `${host}/${path}` : _url,
            imgUrl: imgUrl || window.__testImageUrl 
                || host + '/react/build/images/share_logo_icon.jpg'
        };
        share(shareData)
    })
}
