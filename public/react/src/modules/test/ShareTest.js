/**

    <!-- 微信sdk https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115 -->
    <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
 */

if(window.wx) {
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          alert('got wx1')
            wx.updateAppMessageShareData({ 
                title: ' title', // 分享标题
                desc: 'hello world', // 分享描述
                link: 'https://www.educoder.net', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://test-newweb.educoder.net/images/educoder/headNavLogo.png', // 分享图标
                success: function () {
                  // 设置成功
                }
            })
        });
        
//         wx.onMenuShareAppMessage({
//             title:' title', // 分享标题
//             desc:'hello world', // 分享描述
//             link: 'https://www.educoder.net', //location.href, // 分享链接
//             imgUrl: 'https://pre-newweb.educoder.net/images/educoder/headNavLogo.png', // 分享图标
//             type: '', // 分享类型,music、video或link，不填默认为link
//             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//             success: function () { 
//                 // 用户确认分享后执行的回调函数
//             },
//             cancel: function () { 
//                 // 用户取消分享后执行的回调函数
//             }
//         });
      }