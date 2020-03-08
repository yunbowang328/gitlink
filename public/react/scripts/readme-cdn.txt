目前是判断域名的方式动态访问对应的cdn资源
静态资源处理在build.js中，如下代码：
if (window.location.host == 'pre-newweb.educoder.net') {
    _host = 'https://testali-cdn.educoder.net/react/build/'
} else if (window.location.host == 'www.educoder.net') {
    _host = 'https://ali-cdn.educoder.net/react/build/'
}

只对预上线和正式版做了处理

动态的chunk资源处理在public-path.js中，如下代码：
if ( window.location.host == 'pre-newweb.educoder.net') {
    __webpack_public_path__ = 'https://testali-cdn.educoder.net/react/build/'
} else if ( window.location.host == 'www.educoder.net') {
    __webpack_public_path__ = 'https://ali-cdn.educoder.net/react/build/'
}